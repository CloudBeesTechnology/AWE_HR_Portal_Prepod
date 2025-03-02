import React, { useContext, useEffect, useRef, useState } from "react";
import { GoUpload } from "react-icons/go";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BankEmpSchema } from "../../../services/EmployeeValidation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { FileUploadField } from "../medicalDep/FileUploadField";
import { FormField } from "../../../utils/FormField";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { BJLDataFun } from "../../../services/createMethod/BJLDataFun";
import { UpdateBJL } from "../../../services/updateMethod/UpdateBJL";
import { FileUploadNew } from "../medicalDep/FileUploadField";
import { DataSupply } from "../../../utils/DataStoredContext";
import { useOutletContext } from "react-router-dom";
import { DeleteBJLUp } from "../../../services/uploadDocsDelete/DeleteBJLUp";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { useDeleteAccess } from "../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../utils/DeletePopup";
export const BankGuarantee = () => {
  const { formattedPermissions } = useDeleteAccess();
  const { searchResultData } = useOutletContext();
  const { BGData } = BJLDataFun();
  const { BJLData } = useContext(DataSupply);
  const { UpdateBJLFun } = UpdateBJL();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(BankEmpSchema),
    bankSubmit: [],
    bankRece: [],
    bankValid: [],
    bankEndorse: [],
  });
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [isUploading, setIsUploading] = useState({
    bankEmpUpload: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    bankEmpUpload: null,
  });
  const [uploadBG, setUploadBG] = useState({
    bankEmpUpload: [],
  });

  const [id, setID] = useState({
    bankID: "",
  });

  const watchInducBgUpload = watch("bankEmpUpload", ""); // Watch the bankEmpUpload field
  const empID = watch("empID");

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

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file.");
      return;
    }

    // Ensure no duplicate files are added
    const currentFiles = watch(label) || [];
    if (currentFiles.some((file) => file.name === selectedFile.name)) {
      alert("This file has already been uploaded.");
      return;
    }

    setValue(label, [...currentFiles, selectedFile]);

    try {
      updateUploadingState(label, true);
      await uploadDocs(selectedFile, label, setUploadBG, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
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
      const isDeletedArrayUploaded = await DeleteBJLUp(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setUploadBG,
        setIsUploading
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      // console.log(`Deleted "${fileName}". Remaining files:`);
      setdeleteTitle1(
        `${fileName} Deleted Successfully`
      );
      handleDeleteMsg();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  useEffect(() => {
    setValue("empID", searchResultData.empID);
    const fields = [
      "bankSubmit",
      "bankRece",
      "bankRefNo",
      "bankAmt",
      "bankValid",
      "bankEndorse",
      "bankEmpUpload",
    ];
    // fields.forEach((field) =>
    //   setValue(field, getLastValue(searchResultData[field]))
    // );
    fields.forEach((field) => {
      const value = getLastValue(searchResultData[field], field); // Pass the field name to the function
      setValue(field, value);
    });

    if (searchResultData && searchResultData.bankEmpUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.bankEmpUpload);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
        // console.log(parsedFiles);
        setValue("bankEmpUpload", parsedFiles);

        setUploadBG((prev) => ({
          ...prev,
          bankEmpUpload: parsedFiles,
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          bankEmpUpload: parsedFiles.map((file) => getFileName(file.upload)),
        }));
      } catch (error) {
        console.error(
          `Failed to parse ${searchResultData.bankEmpUpload}:`,
          error
        );
      }
    }
  }, [searchResultData, setValue]);

  const onSubmit = async (data) => {
    try {
      const checkingEIDTable = BJLData.find(
        (match) => match.empID === data.empID
      );

      const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-CA") : null; // 'en-CA' gives yyyy-mm-dd format
      const bankEndorse = formatDate(data.bankEndorse);
      const bankSubmit = formatDate(data.bankSubmit);
      const bankRece = formatDate(data.bankRece);
      const bankValid = formatDate(data.bankValid);

      if (checkingEIDTable) {
        const updatedBankEnDate = [
          ...new Set([
            ...(checkingEIDTable.bankEndorse || []), // ensure it's an array before spreading
            bankEndorse,
          ]),
        ];

        const updatedReciDate = [
          ...new Set([
            ...checkingEIDTable.bankRece, // ensure it's an array before spreading
            bankRece,
          ]),
        ];

        const updatedValidDate = [
          ...new Set([
            ...checkingEIDTable.bankValid, // ensure it's an array before spreading
            bankValid,
          ]),
        ];

        const updatedSubmitDate = [
          ...new Set([
            ...checkingEIDTable.bankSubmit, // ensure it's an array before spreading
            bankSubmit,
          ]),
        ];

        const BJLUpValue = {
          ...data,
          bankEndorse: updatedBankEnDate.map(formatDate),
          bankRece: updatedReciDate.map(formatDate),
          bankSubmit: updatedSubmitDate.map(formatDate),
          bankValid: updatedValidDate.map(formatDate),
          bankEmpUpload: JSON.stringify(uploadBG.bankEmpUpload),
          id: checkingEIDTable.id,
        };
        // console.log("Updated bank Data:", BJLUpValue);
        await UpdateBJLFun({ BJLUpValue });
        setShowTitle("Bank Guarantee Info Updated Successfully");
        setNotification(true);
      } else {
        const BJLValue = {
          ...data,
          bankEndorse,
          bankRece,
          bankSubmit,
          bankValid,
          bankEmpUpload: JSON.stringify(uploadBG.bankEmpUpload),
        };
        // console.log(BJLValue);

        await BGData({ BJLValue });
        setShowTitle("Bank Guarantee Info Saved Successfully");
        setNotification(true);
      }
      // setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const requiredPermissions = [
    "Work Pass",
  ];

  const access = "Employee"

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
          label="Date Of Submission"
          register={register}
          name="bankSubmit"
          type="date"
          errors={errors}
        />
        <FormField
          label="Date Received"
          register={register}
          name="bankRece"
          type="date"
          errors={errors}
        />
        <FormField
          label="BG Reference Number"
          register={register}
          name="bankRefNo"
          type="text"
          errors={errors}
        />
        <FormField
          label="Bank Guarantee Amount"
          register={register}
          name="bankAmt"
          type="text"
          errors={errors}
        />
        <FormField
          label="Valid Until"
          register={register}
          name="bankValid"
          type="date"
          errors={errors}
        />
        <FormField
          label="Date Endorsement Of BG"
          register={register}
          name="bankEndorse"
          type="date"
          errors={errors}
        />
        <div>
          
          <FileUploadNew
            label="Upload File"
            onChangeFunc={(e) => handleFileChange(e, "bankEmpUpload")}
            register={register}
            name="bankEmpUpload"
            error={errors.bankEmpUpload}
            fileName={uploadedFileNames.bankEmpUpload || ""}
            handleFileChange={handleFileChange}
            uploadedFileNames={uploadedFileNames}
            isUploading={isUploading}
            deleteFile={deleteFile}
            field={{ title: "bankEmpUpload" }}
            formattedPermissions={formattedPermissions}
            requiredPermissions={requiredPermissions}
            access={access}
          />
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-center items-center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
        {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/sawp/bankGuarantee"
          />
        )}
      </div>
       {deletePopup && (
                          <DeletePopup
                            handleDeleteMsg={handleDeleteMsg}
                            title1={deleteTitle1}
                          />
                        )}
    </form>
  );
};
