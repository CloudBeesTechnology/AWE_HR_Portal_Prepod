import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NlmsEmpSchema } from "../../../services/EmployeeValidation";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { SpinLogo } from "../../../utils/SpinLogo";
import { FormField } from "../../../utils/FormField";
import { UpdateNlmsData } from "../../../services/updateMethod/UpdateNlmsData";
import { FileUploadNew } from "../medicalDep/FileUploadField";
import { DataSupply } from "../../../utils/DataStoredContext";
import { useOutletContext } from "react-router-dom";
import { handleDeleteFile } from "../../../services/uploadDocsS3/DeleteDoeNlmsUp";
import { WorkPermitDD } from "../../../utils/DropDownMenus";

export const Nlms = () => {
  const { searchResultData } = useOutletContext();

  const { DNData, dropDownVal } = useContext(DataSupply);
  const { uploadNlmsFun } = UpdateNlmsData();
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");

  const [uploadedFileNames, setUploadedFileNames] = useState({
    nlmsEmpUpload: null,
  });
  const [uploadNlms, setUploadNlms] = useState({
    nlmsEmpUpload: [],
  });

  const [id, setID] = useState({
    nlmsID: "",
  });

    const [fieldTitle, setFieldTitle] = useState("nlmsEmpUpload");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NlmsEmpSchema),
    nlmsEmpSubmit: [],
    nlmsEmpApproval: [],
    nlmsEmpValid: [],
  });
  const watchInducNlmsUpload = watch("nlmsEmpUpload", ""); 
  const empID = watch("empID");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const extractFileName = (input) => {
    // Return empty string if input is null or undefined
    if (input == null) {
      return "";
    }

    // Handle the case when input is an object and contains the 'upload' property
    if (typeof input === "object" && input.upload) {
      const filePath = input.upload; // Extract the 'upload' path
      return filePath.split("/").pop(); // Extract the file name from the path
    }

    // Handle the case when input is a valid URL string
    if (typeof input === "string" && input) {
      return input.split("/").pop(); // Extract the file name from URL
    }

    // Return an empty string if input is neither a valid string nor object
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

  // const getLastValue = (value) => Array.isArray(value) ? value[value.length - 1] : value;
  const getLastValue = (value, field) => {
    if (
      field === "nlmsEmpValid" ||
      field === "nlmsEmpApproval" ||
      field === "nlmsEmpValid"
    ) {
      // Return the entire value if it's contractType or empType
      return value;
    }
    // Otherwise, return the last value if it's an array, or the value itself
    return Array.isArray(value) ? value[value.length - 1] : value;
  };

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
      await uploadDocs(selectedFile, label, setUploadNlms, watchedEmpID);
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
      "nlmsEmpApproval",
      "nlmsEmpSubmit",
      "nlmsEmpSubmitRefNo",
      "nlmsEmpUpload",
      "nlmsEmpValid",
      "nlmsRefNo",
      "permitType",
    ];

    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );

    const nlmsRecord = DNData.find(
      (match) => match.empID === searchResultData.empID
    );
    if (nlmsRecord) {
      setID((prevData) => ({
        ...prevData,
        nlmsID: nlmsRecord.id,
      }));
    }

    if (searchResultData?.nlmsEmpUpload) {
      try {
        const parsedFiles = JSON.parse(searchResultData.nlmsEmpUpload).map(
          (item) => (typeof item === "string" ? JSON.parse(item) : item)
        );

        setValue("nlmsEmpUpload", parsedFiles);
        setUploadNlms({ nlmsEmpUpload: parsedFiles });
        setUploadedFileNames({
          nlmsEmpUpload: parsedFiles.map((file) => getFileName(file.upload)),
          
        });
      } catch (error) {
        console.error("Error parsing nlmsEmpUpload:", error);
      }
    }
  }, [searchResultData, setValue]);

  const deleteFile = async (fileType, fileName) => {
    const deleteID = id.nlmsID;

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
      setUploadNlms((prevState) => ({
        ...prevState,
        [fileType]: updatedFiles,
      }));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString("en-CA") : null;
  };

//   const workPermitDD = WorkPermitDD?.map((item) => ({
//     value: item,
//     label: item,
//   }));
// log

  const onSubmit = async (data) => {
    try {
      const nlmsEmpSubmit = formatDate(data.nlmsEmpSubmit);
      const nlmsEmpApproval = formatDate(data.nlmsEmpApproval);
      const nlmsEmpValid = formatDate(data.nlmsEmpValid);

      const matchedEmployee = DNData.find((val) => val.empID === data.empID);

      // If entry exists, update the dates, removing duplicates
      const updatedSubmissionDate = [
        ...new Set([
          ...(matchedEmployee.nlmsEmpSubmit || []), // ensure it's an array before spreading
          nlmsEmpSubmit,
        ]),
      ];

      const updatedApprovalDate = [
        ...new Set([
          ...(matchedEmployee.nlmsEmpApproval || []), // ensure it's an array before spreading
          nlmsEmpApproval,
        ]),
      ];

      const updatedValidDate = [
        ...new Set([
          ...(matchedEmployee.nlmsEmpValid || []), // ensure it's an array before spreading
          nlmsEmpValid,
        ]),
      ];

      const DoeValue = {
        ...data,
        nlmsEmpSubmit: updatedSubmissionDate.map(formatDate),
        nlmsEmpApproval: updatedApprovalDate.map(formatDate),
        nlmsEmpValid: updatedValidDate.map(formatDate),
        nlmsEmpUpload: JSON.stringify(uploadNlms.nlmsEmpUpload),
        id: matchedEmployee?.id || null,
      };

      await uploadNlmsFun({ DoeValue });
      setShowTitle("NLMS Info Stored Successfully");
      setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-h-screen p-2 my-10 bg-[#F5F6F1CC]"
    >
      {/* Employee ID Field */}
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

      {/* Other Fields */}
      <div className="grid grid-cols-2 mt-10 gap-5">
        <FormField
          label="Type of Work Permit Application"
          register={register}
          name="permitType"
          type="select"
          options={WorkPermitDD}
          errors={errors}
        />

        <FormField
          label="Date Of Submission"
          register={register}
          name="nlmsEmpSubmit"
          type="date"
          errors={errors}
        />
        <FormField
          label="Submission Reference Number"
          register={register}
          name="nlmsEmpSubmitRefNo"
          type="text"
          errors={errors}
        />
        <FormField
          label="Date Of Approval"
          register={register}
          name="nlmsEmpApproval"
          type="date"
          errors={errors}
        />
        <FormField
          label="LD Reference Number"
          register={register}
          name="nlmsRefNo"
          type="text"
          errors={errors}
        />
        <FormField
          label="Valid Until"
          register={register}
          name="nlmsEmpValid"
          type="date"
          errors={errors}
        />

        <FileUploadNew
          label="Upload File"
          onChangeFunc={(e) => handleFileChange(e, fieldTitle , empID)}
          register={register}
          name="nlmsEmpUpload"   
          error={errors.nlmsEmpUpload}
          fileName={uploadedFileNames.nlmsEmpUpload || ""}
          uploadedFileNames={uploadedFileNames}
          deleteFile={deleteFile}
          field={{ title: "nlmsEmpUpload" }}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center items-center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/sawp/nlms"
        />
      )}
    </form>
  );
};
