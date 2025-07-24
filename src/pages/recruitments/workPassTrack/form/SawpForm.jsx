import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocString } from "../../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { SawpFormSchema } from "../../../../services/Validation";
import { useCreateWPTracking } from "../../../../services/createMethod/CreateWPTracking";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadSawp } from "../deleteUpload/DeleteUploadSawp";
import { useDeleteAccess } from "../../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../../utils/DeletePopup";
import { DataSupply } from "../../../../utils/DataStoredContext";

export const SawpForm = ({ candidate }) => {
  const { IVSSDetails } = useContext(DataSupply);
  const { formattedPermissions } = useDeleteAccess();
  const { interviewSchedules } = useFetchCandy();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const { interviewDetails } = UpdateInterviewData();
  const { createWPTrackingHandler } = useCreateWPTracking();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      tempID: "",
      sawpDate: "",
      sawpRecivedDate: "",
      sawpFile: "",
      status: "",
    },
  });

  // console.log(interviewSchedules, "DATA");
  const [isUploadingString, setIsUploadingString] = useState({
    sawpFile: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    sawpFile: null,
  });
  const [uploadedSawp, setUploadedSawp] = useState({
    sawpFile: null,
  });

  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(SawpFormSchema),
  });

  const EMPID = localStorage.getItem("userID");
  const TODAY = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (interviewSchedules.length > 0) {
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );

      const interviewStatus = IVSSDetails.find(
        (data) => data.tempID === candidate.tempID
      );

      if (interviewData) {
        setFormData({
          interview: {
            sawpDate: interviewData.sawpDate,
            sawpRecivedDate: interviewData.sawpRecivedDate,
            sawpFile: interviewData.sawpFile,
            status: interviewData.IDDetails.status,
          },
        });

        // Check if sawpFile exists and update the file names
        if (interviewData.sawpFile) {
          const fileName = extractFileName(interviewData.sawpFile);
          setUploadedFileNames((prev) => ({
            ...prev,
            sawpFile: fileName,
          }));
          // console.log("Uploaded file name set:", fileName);
        }
      } else {
        setFormData({
          interview: {
            status: interviewStatus.status,
          },
        });
      }
    }
  }, [interviewSchedules, candidate.tempID]);

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
    // console.log(value);
  };

  const handleFileUpload = async (e, type) => {
    const tempID = candidate.tempID;

    if (!tempID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/employeeInfo";
      return;
    }

    let selectedFile = e.target.files[0];

    // Allowed file types
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
      await uploadDocString(selectedFile, type, setUploadedSawp, tempID);
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
      // console.log(tempID);

      if (!tempID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(fileType, fileName, tempID);
      const isDeletedArrayUploaded = await DeleteUploadSawp(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedSawp,
        setIsUploadingString,
        setFormData
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

  const currentDate = new Date().toISOString().split("T")[0];

  const wrapUpload = (filePath) => {
    return filePath ? [{ upload: filePath, date: currentDate }] : null;
  };

  const onSubmit = async (data) => {
    data.preventDefault();
    const existingInterviewData = interviewSchedules.find(
      (data) => data.tempID === candidate.tempID
    );

    const selectedInterviewDataStatus = IVSSDetails.find(
      (data) => data.tempID === candidate?.tempID
    );

    const interviewScheduleStatusId = selectedInterviewDataStatus?.id;

    const wpUpdatedByData = existingInterviewData;
    const intUpdatedByData = selectedInterviewDataStatus;

    const wpPreviousUpdates = wpUpdatedByData?.updatedBy
      ? JSON.parse(wpUpdatedByData?.updatedBy)
      : [];

    const wpUpdatedBy = [...wpPreviousUpdates, { userID: EMPID, date: TODAY }];

    const wpOrderedUpdatedBy = wpUpdatedBy.map((entry) => ({
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

    const intOrderedUpdatedBy = intUpdatedBy.map((entry) => ({
      userID: entry.userID,
      date: entry.date,
    }));

    const requestData = {
      reqValue: {
        ...formData.interview,
        sawpFile: isUploadingString.sawpFile
          ? JSON.stringify(wrapUpload(uploadedSawp.sawpFile))
          : formData.interview.sawpFile,
        tempID: candidate.tempID,
        sawpDate: formData.interview.sawpDate,
        sawpRecivedDate: formData.interview.sawpRecivedDate,
        tempID: candidate.tempID,
        createdBy: JSON.stringify([{ userID: EMPID, date: TODAY }]),
      },
    };

    try {
      if (existingInterviewData) {
        await wpTrackingDetails({
          WPTrackingValue: {
            id: existingInterviewData.id,
            sawpDate: formData.interview.sawpDate,
            sawpRecivedDate: formData.interview.sawpRecivedDate,
            sawpFile: isUploadingString.sawpFile
              ? JSON.stringify(wrapUpload(uploadedSawp.sawpFile))
              : formData.interview.sawpFile,
            tempID: candidate.tempID,
            updatedBy: JSON.stringify(wpOrderedUpdatedBy),
          },
        });

        // console.log("Update call");
      } else {
        await createWPTrackingHandler(requestData);
        // console.log("Create call", requestData);
      }

      const interviewStatus = {
        id: interviewScheduleStatusId,
        status: formData.interview.status,
        updatedBy: JSON.stringify(intOrderedUpdatedBy),
      };

      await interviewDetails({ InterviewValue: interviewStatus });

      setNotification(true);
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
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

  const requiredPermissions = ["WorkPass Tracking"];

  const access = "Recruitment";

  return (
    <>
      <form onSubmit={onSubmit} className="p-5">
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="sawpDate">SAWP Request Date</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="sawpDate"
              {...register("sawpDate")}
              value={formData.interview.sawpDate}
              onChange={(e) => handleInputChange("sawpDate", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="sawpRecivedDate">SAWP Recieved Date</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="sawpRecivedDate"
              {...register("sawpRecivedDate")}
              value={formData.interview.sawpRecivedDate}
              onChange={(e) =>
                handleInputChange("sawpRecivedDate", e.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="status">Status</label>
            <select
              className="w-full border p-2 rounded mt-1 h-[46px]"
              id="status"
              {...register("status")}
              value={formData.interview.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <div className="">
              <FileUploadField
                label="Upload File"
                register={register}
                fileKey="sawpFile"
                handleFileUpload={handleFileUpload}
                uploadedFileNames={uploadedFileNames}
                deletedStringUpload={deletedStringUpload}
                isUploadingString={isUploadingString}
                error={errors.sawpFile}
                formattedPermissions={formattedPermissions}
                requiredPermissions={requiredPermissions}
                access={access}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className="py-2 px-12 font-medium rounded shadow-lg bg-yellow hover:bg-yellow"
          >
            Submit
          </button>
        </div>
      </form>
      {notification && (
        <SpinLogo
          text="Candidate details updated successfully"
          notification={notification}
          path="/recrutiles/workpasstracking"
        />
      )}
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </>
  );
};
