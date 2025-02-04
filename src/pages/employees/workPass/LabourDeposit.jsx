import React, { useContext, useEffect, useRef, useState } from "react";
import { GoUpload } from "react-icons/go";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabourDepositSchema } from "../../../services/EmployeeValidation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { FileUploadNew } from "../medicalDep/FileUploadField";
import { DataSupply } from "../../../utils/DataStoredContext";
import { UpdateLDFun } from "../../../services/updateMethod/UpdateLDFun";
import { FormField } from "../../../utils/FormField";
import { FileUploadField } from "../medicalDep/FileUploadField";
import { useOutletContext } from "react-router-dom";
import { LabCreFun } from "../../../services/createMethod/LabCreFun";
import { handleDeleteFile } from "../../../services/uploadDocsS3/DeleteBJLUp";

export const LabourDeposit = () => {
  const { searchResultData } = useOutletContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { BJLData } = useContext(DataSupply);
  const { UpdateLDData } = UpdateLDFun();
  const { LabourCreData } = LabCreFun();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(LabourDepositSchema),
  });

  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [labourDate, setLabourDate] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState({
    lbrDepoUpload: null,
  });
  const [uploadLD, setUploadLD] = useState({
    lbrDepoUpload: [],
  });

  const [id, setID] = useState({
    lbrID: "",
  });

  const watchInducLdUpload = watch("lbrDepoUpload", "");

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return "";
  };

  const getFileName = (input) => {
    // Check if input is an object and has the 'upload' property
    if (typeof input === "object" && input.upload) {
      const filePath = input.upload; // Extract the 'upload' path

      // Decode the URL path
      const decodedUrl = decodeURIComponent(filePath);

      // Extract the file name from the path
      const fileNameWithExtension = decodedUrl.substring(
        decodedUrl.lastIndexOf("/") + 1
      );

      return fileNameWithExtension;
    }

    // If input is a string (URL), use the URL constructor
    try {
      const urlObj = new URL(input); // Attempt to create a URL object
      const filePath = urlObj.pathname; // Extract path from URL

      // Decode the URL path
      const decodedUrl = decodeURIComponent(filePath);

      // Extract the file name from the path
      const fileNameWithExtension = decodedUrl.substring(
        decodedUrl.lastIndexOf("/") + 1
      );

      return fileNameWithExtension;
    } catch (e) {
      // Handle invalid URL (fall back to file path processing if URL fails)
      if (typeof input === "string") {
        const decodedUrl = decodeURIComponent(input);
        const fileNameWithExtension = decodedUrl.substring(
          decodedUrl.lastIndexOf("/") + 1
        );
        return fileNameWithExtension;
      }

      // If it's neither an object nor a valid URL string, return undefined or handle as needed
      return undefined;
    }
  };

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
      "application/pdf"
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file");
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
      await uploadDocs(selectedFile, label, setUploadLD, watchedEmpID);
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
    const fields = ["lbrReceiptNo", "lbrDepoAmt", "lbrDepoSubmit", "lbrDepoUpload"];
    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );

    const lbrRecord = BJLData.find(
      (match) => match.empID === searchResultData.empID
    );
    if (lbrRecord) {
      setID((prevData) => ({
        ...prevData,
        lbrID: lbrRecord.id,
      }));
    }
    if (searchResultData && searchResultData.lbrDepoUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.lbrDepoUpload);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );

        setValue("lbrDepoUpload", parsedFiles);

        setUploadLD((prev) => ({
          ...prev,
          lbrDepoUpload: parsedFiles,
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          lbrDepoUpload: parsedFiles.map((file) => getFileName(file.upload))
        }));
      } catch (error) {
        console.error(
          `Failed to parse ${searchResultData.lbrDepoUpload}:`,
          error
        );
      }
    }
  }, [searchResultData, setValue]);

  const deleteFile = async (fileType, fileName) => {
    const deleteID = id.lbrID;

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
      setUploadLD((prevState) => ({
        ...prevState,
        [fileType]: updatedFiles,
      }));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const empID = watch("empID");

  const onSubmit = async (data) => {
    // console.log(data);

    try {
      const matchedEmployee = BJLData.find(
        (match) => match.empID === data.empID
      );

      const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-CA") : null; // 'en-CA' gives yyyy-mm-dd format
      const lbrDepoSubmit = formatDate(data.lbrDepoSubmit);

      if (matchedEmployee) {
        const updatedlbrDate = [
          ...new Set([
            ...(matchedEmployee.lbrDepoSubmit || []), // ensure it's an array before spreading
            lbrDepoSubmit,
          ]),
        ];

        const LDValue = {
          ...data,
          lbrDepoSubmit: updatedlbrDate.map(formatDate),
          lbrDepoUpload: JSON.stringify(uploadLD.lbrDepoUpload),
          id: matchedEmployee.id,
        };

        await UpdateLDData({ LDValue });
        setShowTitle("Labour Info Stored Successfully");
        setNotification(true);
      } else {
        const creLabpaValue = {
          ...data,
          lbrDepoSubmit,
          lbrDepoUpload: JSON.stringify(uploadLD.lbrDepoUpload),
        };
        // console.log(creLabpaValue);

        await LabourCreData({ creLabpaValue });
        setShowTitle("Labour Info Saved Successfully");
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
      {/* Employee ID Input */}
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

      <div className="grid grid-cols-2 mt-10 gap-5">
        <FormField
          label="Labour Deposit Receipt Number"
          register={register}
          name="lbrReceiptNo"
          type="text"
          errors={errors}
        />
        <FormField
          label="Deposit Amount"
          register={register}
          name="lbrDepoAmt"
          type="text"
          errors={errors}
        />
        <FormField
          label="Date Endorsement Of Labour Deposit"
          register={register}
          name="lbrDepoSubmit"
          type="date"
          errors={errors}
        />
        <div>
          <FileUploadNew
            label="Upload File"
            onChangeFunc={(e) => handleFileChange(e, "lbrDepoUpload", empID)}
            name="lbrDepoUpload"
            register={register}
            error={errors.lbrDepoUpload}
            fileName={
              uploadedFileNames.lbrDepoUpload ||
              extractFileName(watchInducLdUpload)
            }
            uploadedFileNames={uploadedFileNames}
            deleteFile={deleteFile}
            field={{ title: "lbrDepoUpload" }}
          />
        </div>
      </div>

      <div className="center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/sawp/labourDeposit"
        />
      )}
    </form>
  );
};
