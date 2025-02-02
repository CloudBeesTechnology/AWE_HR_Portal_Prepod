import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DoeEmpSchema } from "../../../services/EmployeeValidation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { UpdateDataFun } from "../../../services/updateMethod/UpdateSDNData";
import { FormField } from "../../../utils/FormField";
import { FileUploadNew } from "../medicalDep/FileUploadField";
import { DataSupply } from "../../../utils/DataStoredContext";
import { useOutletContext } from "react-router-dom";
import { CreateDoe } from "../../../services/createMethod/CreateDoe";
import { handleDeleteFile } from "../../../services/uploadDocsS3/DeleteDoeNlmsUp";

export const Doe = () => {  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { searchResultData } = useOutletContext();
  const { DNData } = useContext(DataSupply);
  const { CrerDoeFunData } = CreateDoe();
  const { UpdateMPData } = UpdateDataFun();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(DoeEmpSchema),
    doeEmpSubmit: [],
    doeEmpApproval: [],
    doeEmpValid: [],
  });

  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [uploadedFileNames, setUploadedFileNames] = useState({
    doeEmpUpload: null,
  });
  const [uploadDoe, setUploadDoe] = useState({
    doeEmpUpload: [],
  });

  const [id, setID] = useState({
    doeID: "",
  });

  // const [fieldTitle, setFieldTitle] = useState("doeEmpUpload");
  const empID = watch("empID");

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return "";
  };

  const getFileName = (input) => {
    if (typeof input === "object" && input.upload) {
      const filePath = input.upload;
      const decodedUrl = decodeURIComponent(filePath);
      return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
    }

    try {
      const urlObj = new URL(input);
      const filePath = urlObj.pathname;
      const decodedUrl = decodeURIComponent(filePath);
      return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
    } catch (e) {
      if (typeof input === "string") {
        const decodedUrl = decodeURIComponent(input);
        return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
      }
      return undefined;
    }
  };
  // console.log(id, "ID");

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const handleFileChange = async (e, label) => {
    const watchedEmpID = watch("empID");
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/employeeInfo";
      return;
    }

    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
    }

    // Fetch current files (including backend-stored ones)
    const currentFiles = watch(label) || []; // React Hook Form state

    // Count only newly uploaded files, ignoring backend-stored files
    let newUploads = []; // Declare it outside the if block to access later
    if (Array.isArray(currentFiles)) {
      newUploads = currentFiles.filter(file => file instanceof File);
    }
    
    if (newUploads.length > 0) {
      alert("You can only upload one new file. Please delete the existing file before uploading another.");
      return;
    }
    

    if (newUploads.length > 0) {
      alert(
        "You can only upload one new file. Please delete the existing file before uploading another."
      );
      return;
    }

    // Append the new file to the form state
    setValue(label, [...currentFiles, selectedFile]);

    try {
      await uploadDocs(selectedFile, label, setUploadDoe, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setValue("empID", searchResultData.empID);
    const fields = [
      "doeEmpSubmit",
      "doeEmpApproval",
      "doeEmpValid",
      "doeEmpRefNo",
    ];
    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );

    const doeRecord = DNData.find(
      (match) => match.empID === searchResultData.empID
    );
    if (doeRecord) {
      setID((prevData) => ({
        ...prevData,
        doeID: doeRecord.id, 
      }));
    }

    if (searchResultData && searchResultData.doeEmpUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.doeEmpUpload);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
        // console.log(parsedFiles);
        setValue("doeEmpUpload", parsedFiles);

        setUploadDoe((prev) => ({
          ...prev,
          doeEmpUpload: parsedFiles,
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          doeEmpUpload: parsedFiles.map((file) => getFileName(file.upload)), 
        }));
      } catch (error) {
        console.error(
          `Failed to parse ${searchResultData.doeEmpUpload}:`,
          error
        );
      }
    }
  }, [searchResultData, setValue]);

  const deleteFile = async (fileType, fileName) => {
    const deleteID = id.doeID; 

    try {
      await handleDeleteFile(
        fileType,
        fileName,
        empID,
        setUploadedFileNames,
        deleteID,
        setValue
      );

      const currentFiles = watch(fileType) || [];

      // Filter out the deleted file
      const updatedFiles = currentFiles.filter(
        (file) => file.name !== fileName
      );

      // Update form state with the new file list
      setValue(fileType, updatedFiles);

      // Update UI state
      setUploadDoe((prevState) => ({
        ...prevState,
        [fileType]: updatedFiles,
      }));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const checkingEIDTable = DNData.find(
        (match) => match.empID === data.empID
      );

      // Helper function to format dates
      const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-CA") : null; // 'en-CA' gives yyyy-mm-dd format

      // Format each date individually
      const doeEmpSubmit = formatDate(data.doeEmpSubmit);
      const doeEmpApproval = formatDate(data.doeEmpApproval);
      const doeEmpValid = formatDate(data.doeEmpValid);

      if (checkingEIDTable) {
        // If entry exists, update the dates, removing duplicates
        const updatedSubmissionDate = [
          ...new Set([
            ...(checkingEIDTable.doeEmpSubmit || []), // ensure it's an array before spreading
            doeEmpSubmit,
          ]),
        ];

        const updatedApprovalDate = [
          ...new Set([
            ...(checkingEIDTable.doeEmpApproval || []), // ensure it's an array before spreading
            doeEmpApproval,
          ]),
        ];

        const updatedValidDate = [
          ...new Set([
            ...(checkingEIDTable.doeEmpValid || []), // ensure it's an array before spreading
            doeEmpValid,
          ]),
        ];

        const DoeUpValue = {
          ...data,
          doeEmpSubmit: updatedSubmissionDate.map(formatDate),
          doeEmpApproval: updatedApprovalDate.map(formatDate), // Apply formatDate to each item
          doeEmpValid: updatedValidDate.map(formatDate), // Apply formatDate to each item
          doeEmpUpload: JSON.stringify(uploadDoe.doeEmpUpload), // Ensure this is properly set
          id: checkingEIDTable.id,
        };

        await UpdateMPData({ DoeUpValue });
        setShowTitle("DOE Info Updated Successfully");
        setNotification(true);
      } else {
        // If no entry exists, create new data
        const DoeValue = {
          ...data,
          doeEmpSubmit,
          doeEmpApproval,
          doeEmpValid,
          doeEmpUpload: JSON.stringify(uploadDoe.doeEmpUpload),
        };

        await CrerDoeFunData({ DoeValue });
        setShowTitle("DOE Info Created Successfully");
        setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-h-screen p-2 my-10 bg-[#F5F6F1CC]"
    >
      <div className="flex justify-end items-center">
        <div className="max-w-sm">
          <FormField
            label="Employee ID"
            register={register}
            name="empID"
            type="text"
            placeholder="Enter Employee ID"
            errors={errors}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 mt-10 gap-5 ">
        <FormField
          label="Date Of Submission"
          register={register}
          name="doeEmpSubmit"
          type="date"
          errors={errors}
        />
        <FormField
          label="Date Of Approval"
          register={register}
          name="doeEmpApproval"
          type="date"
          errors={errors}
        />
        <FormField
          label="Valid Until"
          register={register}
          name="doeEmpValid"
          type="date"
          errors={errors}
        />
        <FormField
          label="DOE Reference Number"
          register={register}
          name="doeEmpRefNo"
          type="text"
          errors={errors}
        />
        <FileUploadNew
          label="Upload File"
          onChangeFunc={(e) => handleFileChange(e, "doeEmpUpload")}
          register={register}
          name="doeEmpUpload"
          error={errors.doeEmpUpload}
          fileName={uploadedFileNames.doeEmpUpload || ""}
          uploadedFileNames={uploadedFileNames}
          deleteFile={deleteFile}
          field={{ title: "doeEmpUpload" }}
        />
      </div>
      <div className="flex justify-center items-center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/sawp/doe"
        />
      )}
    </form>
  );
};
