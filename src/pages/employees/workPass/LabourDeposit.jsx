import React, { useContext, useEffect, useRef, useState } from "react";
import { GoUpload } from "react-icons/go";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabourDepositSchema } from "../../../services/EmployeeValidation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadNew } from "../medicalDep/FileUploadField";
import { DataSupply } from "../../../utils/DataStoredContext";
import { UpdateLDFun } from "../../../services/updateMethod/UpdateLDFun";
import { FormField } from "../../../utils/FormField";
import { FileUploadField } from "../medicalDep/FileUploadField";
import { useOutletContext } from "react-router-dom";
import { LabCreFun } from "../../../services/createMethod/LabCreFun";
import { DeleteDocsLD } from "../../../services/uploadDocsDelete/DeleteDocsLD";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";

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
   const [isUploading, setIsUploading] = useState({
    lbrDepoUpload: false,
      });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    lbrDepoUpload: null,
  });
  const [uploadLD, setUploadLD] = useState({
    lbrDepoUpload: [],
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

   const updateUploadingState = (label, value) => {
       setIsUploading((prev) => ({
         ...prev,
         [label]: value,
       }));
       console.log(value);
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
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
          alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
          return;
      }
   
       // Ensure no duplicate files are added
       const currentFiles = watch(label) || [];
       if (currentFiles.some((file) => file.name === selectedFile.name)) {
           alert("This file has already been uploaded.");
           return;
       }
   
       // **Check if the file was previously deleted and prevent re-adding**
      //  if (deletedFiles[label]?.includes(selectedFile.name)) {
      //      alert("This file was previously deleted and cannot be re-added.");
      //      return;
      //  }
   
       setValue(label, [...currentFiles, selectedFile]);
   
       try {
         updateUploadingState(label, true);
         await uploadDocs(selectedFile, label, setUploadLD, watchedEmpID);
         setUploadedFileNames((prev) => ({
           ...prev,
           [label]: selectedFile.name,
         }));
       } catch (err) {
           console.error(err);
       }
     };
   
     const deleteFile = async (fileType, fileName) => {
       try {
         const watchedEmpID = watch("empID");
         if (!watchedEmpID) {
           alert("Please provide the Employee ID before deleting files.");
           return;
         }
   
         const isDeleted = await handleDeleteFile(
           fileType,
           fileName,
           watchedEmpID
         );
         const isDeletedArrayUploaded = await DeleteDocsLD(
           fileType,
           fileName,
           watchedEmpID,
           setUploadedFileNames,
           setUploadLD,
           setIsUploading
         );
   
         if (!isDeleted || isDeletedArrayUploaded) {
           console.error(
             `Failed to delete file: ${fileName}, skipping UI update.`
           );
           return;
         }
         // console.log(`Deleted "${fileName}". Remaining files:`);
       } catch (error) {
         console.error("Error deleting file:", error);
         alert("Error processing the file deletion.");
       }
     };

  useEffect(() => {
    setValue("empID", searchResultData.empID);
    const fields = ["lbrReceiptNo", "lbrDepoAmt", "lbrDepoSubmit","lbrDepoUpload"];
    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );

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
        setShowTitle("Labour Info Updated Successfully");
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
            handleFileChange={handleFileChange}
            isUploading={isUploading}
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
