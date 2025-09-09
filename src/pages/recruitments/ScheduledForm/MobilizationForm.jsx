import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocString } from "../../../services/uploadsDocsS3/UploadDocs";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { LocalMobilization } from "../../../services/createMethod/CreateLOI";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../utils/StatusDropdown";
import { SpinLogo } from "../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadLOI } from "../deleteDocsRecruit/DeleteUploadLOI";
import { DeletePopup } from "../../../utils/DeletePopup";
import { DataSupply } from "../../../utils/DataStoredContext";

const MOBFormSchema = Yup.object().shape({
  mobSignDate: Yup.date().notRequired(),
  mobFile: Yup.mixed()
    .nullable()
    .required("File is required")
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});

export const MobilizationForm = ({ candidate, formattedPermissions }) => {
  const { localMobilization } = LocalMobilization();
  const { IVSSDetails } = useContext(DataSupply);
  const { loiDetails } = UpdateLoiData();
  const { mergedInterviewData, loading: interviewLoading } =
    useFetchInterview();
  const { interviewDetails } = UpdateInterviewData();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      mobSignDate: "",
      mobFile: "",
      status: "",
    },
  });

  const [isUploadingString, setIsUploadingString] = useState({
    mobFile: false,
  });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    mobFile: null,
  });
  const [uploadedMOB, setUploadedMOB] = useState({
    mobFile: null,
  });
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(MOBFormSchema),
  });

  const EMPID = localStorage.getItem("userID");
  const TODAY = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData.find(
        (data) => data.tempID === candidate.tempID
      );
      if (interviewData) {
        setFormData({
          interview: {
            mobSignDate: interviewData.localMobilization.mobSignDate,
            mobFile: interviewData.localMobilization.mobFile,
            status: interviewData.interviewSchedules.status,
          },
        });
        if (interviewData.localMobilization.mobFile) {
          setUploadedFileNames((prev) => ({
            ...prev,
            mobFile: extractFileName(interviewData.localMobilization.mobFile),
          }));
        }
      }
    }
  }, [mergedInterviewData, candidate.tempID]);

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
      await uploadDocString(selectedFile, type, setUploadedMOB, tempID);
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

      if (!tempID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(fileType, fileName, tempID);
      const isDeletedArrayUploaded = await DeleteUploadLOI(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedMOB,
        setIsUploadingString
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
    setLoading(true);

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

    const createData = {
      mobSignDate: formData.interview?.mobSignDate,
      mobFile: isUploadingString.mobFile
        ? JSON.stringify(wrapUpload(uploadedMOB?.mobFile))
        : formData.interview?.mobFile,
      tempID: candidate?.tempID,
      createdBy: JSON.stringify([{ userID: EMPID, date: TODAY }]),
    };

    try {
      if (localMobilizationId) {
        await loiDetails({
          LoiValue: {
            id: localMobilizationId,
            mobSignDate: formData.interview?.mobSignDate,
            mobFile: isUploadingString.mobFile
              ? JSON.stringify(wrapUpload(uploadedMOB?.mobFile))
              : formData.interview?.mobFile,
            updatedBy: JSON.stringify(loiOrderedUpdatedBy),
          },
        });
      } else {
        await localMobilization(createData);
      }

      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleStatusId,
          status: formData.interview?.status,
          updatedBy: JSON.stringify(intOrderedUpdatedBy),
          // status: selectedInterviewData.contractType === "Local" ? "mobilization" : "workpass",
        },
      });

      // console.log("Data stored successfully...");
      setNotification(true);
    } catch (error) {
      setLoading(false);
      // console.error("Error submitting interview details:", error);
      alert("Failed to update interview details. Please try again.");
    }
  };

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
    <form onSubmit={handleSubmitTwo} className="p-5 relative">
      {/* Loading overlay for data fetching */}
      {interviewLoading && <LoadingOverlay />}
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="mobSignDate">Date of Mobilize</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="mobSignDate"
            value={formData.interview.mobSignDate}
            onChange={(e) => handleInputChange("mobSignDate", e.target.value)}
            disabled={interviewLoading}
          />
        </div>

        <div className="">
          <div className="">
            <FileUploadField
              label="Upload File"
              register={register}
              fileKey="mobFile"
              handleFileUpload={handleFileUpload}
              uploadedFileNames={uploadedFileNames}
              deletedStringUpload={deletedStringUpload}
              isUploadingString={isUploadingString}
              error={errors.mobFile}
              formattedPermissions={formattedPermissions}
              requiredPermissions={requiredPermissions}
              access={access}
              check={isUploadingString.mobFile}
              disabled={interviewLoading}
            />
          </div>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            className="w-full border p-2 rounded mt-1 h-[44px]"
            id="status"
            // register={register}
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
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="submit"
          className="py-2 px-12 font-medium rounded shadow-lg bg-yellow hover:bg-yellow"
          disabled={interviewLoading || loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      {notification && (
        <SpinLogo
          text="Mobilization Updated Successfully"
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
