import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { JitpaEmpSchema } from "../../../services/EmployeeValidation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { FileUploadField } from "../medicalDep/FileUploadField";
import { FormField } from "../../../utils/FormField";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { UpdateJitpaFun } from "../../../services/updateMethod/UpdateJitpaFun";
import { FileUploadNew } from "../medicalDep/FileUploadField";
import { DataSupply } from "../../../utils/DataStoredContext";
import { useOutletContext } from "react-router-dom";
import { JitpaCreFun } from "../../../services/createMethod/JitpaCreFun";
import { DeleteDocsJitpa } from "../../../services/uploadDocsDelete/DeleteDocsJitpa";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { useDeleteAccess } from "../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../utils/DeletePopup";
export const Jitpa = () => {
  const { formattedPermissions } = useDeleteAccess();
  const { searchResultData } = useOutletContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { BJLData } = useContext(DataSupply);
  const { UpdateJitpaData } = UpdateJitpaFun();
  const { JitpaCreData } = JitpaCreFun();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(JitpaEmpSchema),
  });
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [trackEmpID, setTrackEmpID] = useState(false);
  const [isUploading, setIsUploading] = useState({
    jpEmpUpload: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    jpEmpUpload: null,
  });
  const [uploadjitpa, setUploadjitpa] = useState({
    jpEmpUpload: [],
  });

  const watchInducJitpaUpload = watch("jpEmpUpload", "");

  const EMPID = localStorage.getItem("userID");
  const TODAY = new Date().toISOString().split("T")[0];

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop();
    }
    return "";
  };

  const getFileName = (input) => {
    // Check if input is an object and has the 'upload' property
    if (typeof input === "object" && input.upload) {
      const filePath = input.upload;

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
      const urlObj = new URL(input);
      const filePath = urlObj.pathname;

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
      await uploadDocs(selectedFile, label, setUploadjitpa, watchedEmpID);
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
      const isDeletedArrayUploaded = await DeleteDocsJitpa(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setUploadjitpa,
        setIsUploading
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      // console.log(`Deleted "${fileName}". Remaining files:`);
      setdeleteTitle1(`${fileName}`);
      handleDeleteMsg();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  useEffect(() => {
    if (searchResultData) {
      setTrackEmpID(true);
    }

    setValue("empID", searchResultData.empID);
    const fields = [
      "tbaPurchase",
      "jitpaAmt",
      "jpValid",
      "jpEndorse",
      "jpEmpUpload",
    ];
    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );

    if (searchResultData && searchResultData.jpEmpUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.jpEmpUpload);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
        setValue("jpEmpUpload", parsedFiles);

        setUploadjitpa((prev) => ({
          ...prev,
          jpEmpUpload: parsedFiles,
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          jpEmpUpload: parsedFiles.map((file) => getFileName(file.upload)),
        }));
      } catch (error) {
        console.error(
          `Failed to parse ${searchResultData.jpEmpUpload}:`,
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
        date ? new Date(date).toLocaleDateString("en-CA") : null; 
      const tbaPurchase = formatDate(data.tbaPurchase);
      const jpValid = formatDate(data.jpValid);
      const jpEndorse = formatDate(data.jpEndorse);

      if (matchedEmployee) {
        const updatedSubmissionDate = [
          ...new Set([
            ...(matchedEmployee.tbaPurchase || []), 
            tbaPurchase,
          ]),
        ];

        const updatedEndorseDate = [
          ...new Set([
            ...(matchedEmployee.jpEndorse || []), 
            jpEndorse,
          ]),
        ];

        const updatedValidDate = [
          ...new Set([
            ...(matchedEmployee.jpValid || []), 
            jpValid,
          ]),
        ];

        const previousUpdates = matchedEmployee?.updatedBy
          ? JSON.parse(matchedEmployee.updatedBy)
          : [];

        const updatedBy = [...previousUpdates, { userID: EMPID, date: TODAY }];

        const orderedUpdatedBy = updatedBy?.map((entry) => ({
          userID: entry.userID,
          date: entry.date,
        }));

        const JitpaValue = {
          ...data,
          id: matchedEmployee.id,
          jpValid: updatedValidDate.map(formatDate),
          tbaPurchase: updatedSubmissionDate.map(formatDate),
          jpEndorse: updatedEndorseDate.map(formatDate),
          jpEmpUpload: JSON.stringify(uploadjitpa.jpEmpUpload),
          updatedBy: JSON.stringify(orderedUpdatedBy),
        };

        await UpdateJitpaData({ JitpaValue });
        setShowTitle("JITPA Info Updated Successfully");
        setNotification(true);
      } else {
        const creJitpaValue = {
          ...data,
          jpValid,
          tbaPurchase,
          jpEndorse,
          jpEmpUpload: JSON.stringify(uploadjitpa.jpEmpUpload),
          createdBy: JSON.stringify([{ userID: EMPID, date: TODAY }]),
        };
        // console.log(creJitpaValue);

        await JitpaCreData({ creJitpaValue });
        setShowTitle("JITPA Info Saved Successfully");
        setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const requiredPermissions = ["Work Pass"];
  const access = "Employee";

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
            trackEmpID={trackEmpID}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 mt-10 gap-5">
        <FormField
          label="TBA Purchase Date"
          register={register}
          name="tbaPurchase"
          type="date"
          errors={errors}
        />
        <FormField
          label="JITPA Amount"
          register={register}
          name="jitpaAmt"
          type="text"
          errors={errors}
        />
        <FormField
          label="Valid Until"
          register={register}
          name="jpValid"
          type="date"
          errors={errors}
        />
        <FormField
          label="Date Endorsement Of JITPA"
          register={register}
          name="jpEndorse"
          type="date"
          errors={errors}
        />
        <div>
          <FileUploadNew
            label="Upload File"
            onChangeFunc={(e) => handleFileChange(e, "jpEmpUpload", empID)}
            name="jpEmpUpload"
            register={register}
            error={errors.jpEmpUpload}
            fileName={
              uploadedFileNames.jpEmpUpload ||
              extractFileName(watchInducJitpaUpload)
            }
            uploadedFileNames={uploadedFileNames}
            handleFileChange={handleFileChange}
            isUploading={isUploading}
            deleteFile={deleteFile}
            field={{ title: "jpEmpUpload" }}
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
      </div>
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/sawp/jitpa"
        />
      )}
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </form>
  );
};
