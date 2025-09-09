import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { LocalMobilization } from "../../../services/createMethod/CreateLOI"; // Import the hook
import { uploadDocString } from "../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../utils/StatusDropdown";
import { SpinLogo } from "../../../utils/SpinLogo";
import { DataSupply } from "../../../utils/DataStoredContext";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadLOI } from "../deleteDocsRecruit/DeleteUploadLOI";
import { DeletePopup } from "../../../utils/DeletePopup";
export const LOIForm = ({ candidate, formattedPermissions }) => {
  const { localMobilization, isLoading, error } = LocalMobilization();
  const { IVSSDetails } = useContext(DataSupply);
  const { loiDetails } = UpdateLoiData();
  const { interviewDetails } = UpdateInterviewData();
  const { mergedInterviewData, loading: interviewLoading } = useFetchInterview();
  const [notification, setNotification] = useState(false);
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [isUploadingString, setIsUploadingString] = useState({
    loiFile: false,
  });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    loiFile: null,
  });

  const [uploadedLOI, setUploadedLOI] = useState({
    loiFile: null,
  });
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    interview: {
      loiIssueDate: "",
      loiAcceptDate: "",
      loiDeclineDate: "",
      declineReason: "",
      loiFile: "",
      tempID: "",
      status: "",
    },
  });

  const EMPID = localStorage.getItem("userID");
  const TODAY = new Date().toISOString().split("T")[0];

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      const decodedUrl = decodeURIComponent(url);
      const fileNameWithParams = decodedUrl.split("/").pop();
      return fileNameWithParams.split("?")[0].split(",")[0].split("#")[0];
    }
    return "";
  };

  const updateUploadingString = (type, value) => {
    setIsUploadingString((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleFileUpload = async (e, type) => {
    const tempID = candidate.tempID;

    if (!tempID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/employeeInfo";
      return;
    }

    let selectedFile = e.target.files[0];

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

    setValue(type, selectedFile);

    if (selectedFile) {
      updateUploadingString(type, true);
      await uploadDocString(selectedFile, type, setUploadedLOI, tempID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [type]: selectedFile.name,
      }));
    }
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };

  const deletedStringUpload = async (fileType, fileName) => {
    try {
      const tempID = candidate.tempID;

      const isDeleted = await handleDeleteFile(fileType, fileName, tempID);
      const isDeletedArrayUploaded = await DeleteUploadLOI(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedLOI,
        setIsUploadingString,
        setFormData
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }

      setdeleteTitle1(`${fileName}`);
      handleDeleteMsg();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const wrapUpload = (filePath) => {
    return filePath ? [{ upload: filePath, date: currentDate }] : null;
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();

    const selectedInterviewData = mergedInterviewData.find(
      (data) => data.tempID === candidate?.tempID
    );

    const selectedInterviewDataStatus = IVSSDetails.find(
      (data) => data.tempID === candidate?.tempID
    );

    const localMobilizationId = selectedInterviewData?.localMobilization.id;
    const interviewScheduleStatusId = selectedInterviewDataStatus?.id;

    const localUpdatedByData = selectedInterviewData?.localMobilization;
    const intUpdatedByData = selectedInterviewData?.interviewSchedules;

    const loiPreviousUpdates = localUpdatedByData?.updatedBy
      ? JSON.parse(localUpdatedByData?.updatedBy)
      : [];

    const loiUpdatedBy = [
      ...loiPreviousUpdates,
      { userID: EMPID, date: TODAY },
    ];

    const loiOrderedUpdatedBy = loiUpdatedBy?.map((entry) => ({
      userID: entry.userID,
      date: entry.date,
    }));

    const intPreviousUpdates = intUpdatedByData?.updatedBy
      ? JSON.parse(intUpdatedByData?.updatedBy)
      : [];

    const intUpdatedBy = [
      ...intPreviousUpdates,
      { userID: EMPID, date: TODAY },
    ];

    const intOrderedUpdatedBy = intUpdatedBy?.map((entry) => ({
      userID: entry.userID,
      date: entry.date,
    }));

    const formattedData = {
      id: localMobilizationId,
      loiIssueDate: formData.interview?.loiIssueDate,
      loiAcceptDate: formData.interview?.loiAcceptDate,
      loiDeclineDate: formData.interview?.loiDeclineDate,
      declineReason: formData.interview?.declineReason,
      loiFile: isUploadingString?.loiFile
        ? JSON.stringify(wrapUpload(uploadedLOI.loiFile))
        : formData.interview?.loiFile,
      tempID: candidate?.tempID,
      createdBy: JSON.stringify([{ userID: EMPID, date: TODAY }]),
    };

    const createData = {
      loiIssueDate: formData.interview?.loiIssueDate,
      loiAcceptDate: formData.interview?.loiAcceptDate,
      loiDeclineDate: formData.interview?.loiDeclineDate,
      declineReason: formData.interview?.declineReason,
      loiFile: isUploadingString?.loiFile
        ? JSON.stringify(wrapUpload(uploadedLOI?.loiFile))
        : formData.interview?.loiFile,
      tempID: candidate?.tempID,
      createdBy: JSON.stringify([{ userID: EMPID, date: TODAY }]),
    };

    const interStatus = {
      id: interviewScheduleStatusId,
      status: formData.interview?.status,
      updatedBy: JSON.stringify(intOrderedUpdatedBy),
    };

    try {
      if (localMobilizationId) {
        // console.log("Update", interStatus);
        // If interview data exists, update the LOI and interview status
        await loiDetails({ LoiValue: formattedData });
        await interviewDetails({ InterviewValue: interStatus });
        setNotification(true);
      } else {
        // console.log("Create", createData);
        // If interview data doesn't exist, create new LOI and interview status
        await localMobilization(createData);
        await interviewDetails({ InterviewValue: interStatus });
        setNotification(true);
      }
    } catch (error) {
      console.error("Error updating LOI:", error);
      alert("Failed to update LOI. Please try again.");
    }
  };

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData.find(
        (data) => data.tempID === candidate.tempID
      );
      if (interviewData) {
        setFormData({
          interview: {
            loiIssueDate: interviewData.localMobilization.loiIssueDate,
            loiAcceptDate: interviewData.localMobilization.loiAcceptDate,
            loiDeclineDate: interviewData.localMobilization.loiDeclineDate,
            declineReason: interviewData.localMobilization.declineReason,
            loiFile: interviewData.localMobilization.loiFile,
            status: interviewData.interviewSchedules.status,
            tempID: interviewData.tempID,
          },
        });
        if (interviewData.localMobilization.loiFile) {
          setUploadedFileNames((prev) => ({
            ...prev,
            loiFile: extractFileName(interviewData.localMobilization.loiFile),
          }));
        }
      }
    }
  }, [mergedInterviewData, candidate.tempID]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        [field]: value,
      },
    }));
  };

  const requiredPermissions = ["Status"];

  const access = "Recruitment";
  
  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </div>
  );

  return (
    <form className="relative">
      {/* Loading overlay for data fetching */}
      {interviewLoading && <LoadingOverlay />}
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="loiIssueDate">Date of Issue</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="loiIssueDate"
            {...register("loiIssueDate", {
              required: "Date of Issue is required",
            })}
            value={formData.interview.loiIssueDate}
            onChange={(e) => handleInputChange("loiIssueDate", e.target.value)}
            disabled={interviewLoading}
          />
          {errors.loiIssueDate && (
            <p className="text-[red] text-xs">{errors.loiIssueDate.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="loiAcceptDate">Date of Acceptance</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="loiAcceptDate"
            {...register("loiAcceptDate")}
            value={formData.interview.loiAcceptDate}
            onChange={(e) => handleInputChange("loiAcceptDate", e.target.value)}
            disabled={interviewLoading}
          />
          {errors.loiAcceptDate && (
            <p className="text-[red] text-xs">{errors.loiAcceptDate.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="loiDeclineDate">Date of Decline</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="loiDeclineDate"
            {...register("loiDeclineDate")}
            value={formData.interview.loiDeclineDate}
            onChange={(e) =>
              handleInputChange("loiDeclineDate", e.target.value)
            }
            disabled={interviewLoading}
          />
          {errors.loiDeclineDate && (
            <p className="text-[red] text-xs">
              {errors.loiDeclineDate.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="declineReason">Decline Reason</label>
          <textarea
            className="w-full border p-2 rounded mt-1 h-[44px]"
            id="declineReason"
            rows="2"
            {...register("declineReason")}
            value={formData.interview.declineReason}
            onChange={(e) => handleInputChange("declineReason", e.target.value)}
            disabled={interviewLoading}
          ></textarea>
          {errors.declineReason && (
            <p className="text-[red] text-xs">{errors.declineReason.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            className="w-full border p-2 rounded mt-1 outline-none h-[44px]"
            id="status"
            {...register("status")}
            value={formData.interview.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            disabled={interviewLoading}
          >
            {statusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="">
            {/* LOI File Upload */}
            <div>
              <FileUploadField
                label="Upload File"
                // label="Induction Form"
                register={register}
                fileKey="loiFile"
                handleFileUpload={handleFileUpload}
                uploadedFileNames={uploadedFileNames}
                deletedStringUpload={deletedStringUpload}
                isUploadingString={isUploadingString}
                error={errors.loiFile}
                formattedPermissions={formattedPermissions}
                requiredPermissions={requiredPermissions}
                access={access}
                check={isUploadingString.loiFile}
                disabled={interviewLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="center mt-5">
        <button
          type="submit"
          className="py-2 px-12 font-medium rounded shadow-lg bg-yellow hover:bg-yellow"
          disabled={isLoading || interviewLoading}
          onClick={handleSubmitTwo}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {error && <p className="text-red-500">{error.message}</p>}
      </div>
      {notification && (
        <SpinLogo
          text="LOI Updated Successfully"
          notification={notification}
          path="/recrutiles/status"
        />
      )}
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </form>
  );
};