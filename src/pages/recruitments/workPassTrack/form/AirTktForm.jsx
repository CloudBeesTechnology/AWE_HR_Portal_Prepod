import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocString } from "../../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { AirTktFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadAirTicket } from "../deleteUpload/DeleteUploadAirTicket";
import { useDeleteAccess } from "../../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../../utils/DeletePopup";
import { useCreateWPTracking } from "../../../../services/createMethod/CreateWPTracking";
import { DataSupply } from "../../../../utils/DataStoredContext";

export const AirTktForm = ({ candidate }) => {
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
      departuredate: "",
      arrivaldate: "",
      cityname: "",
      airfare: "",
      airticketfile: "",
      status: "",
    },
  });

  const [isUploadingString, setIsUploadingString] = useState({
    airTktFile: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    airTktFile: null,
  });
  const [uploadedAirTkt, setUploadedAirTkt] = useState({
    airTktFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(AirTktFormSchema),
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
            departuredate: interviewData.departuredate,
            arrivaldate: interviewData.arrivaldate,
            cityname: interviewData.cityname,
            airfare: interviewData.airfare,
            airticketfile:
              interviewData.airticketfile || uploadedAirTkt.airTktFile,
            status: interviewData.IDDetails.status,
          },
        });

        if (interviewData.airticketfile) {
          const fileName = extractFileName(interviewData.airticketfile);
          setUploadedFileNames((prev) => ({
            ...prev,
            airTktFile: fileName,
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
      await uploadDocString(selectedFile, type, setUploadedAirTkt, tempID);
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
      const isDeletedArrayUploaded = await DeleteUploadAirTicket(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedAirTkt,
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
      // console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const wrapUpload = (filePath) => {
    return filePath ? [{ upload: filePath, date: currentDate }] : null;
  };

  const handleSubmitTwo = async (data) => {
    data.preventDefault();

    const selectedInterviewData = interviewSchedules.find(
      (data) => data.tempID === candidate?.tempID
    );

    const selectedInterviewDataStatus = IVSSDetails.find(
      (data) => data.tempID === candidate?.tempID
    );

    const interviewScheduleId = selectedInterviewData?.id;
    const interviewScheduleStatusId = selectedInterviewDataStatus?.id;

    const wpUpdatedByData = selectedInterviewData;
    const intUpdatedByData = selectedInterviewDataStatus;

    const wpPreviousUpdates = wpUpdatedByData?.updatedBy
      ? JSON.parse(wpUpdatedByData?.updatedBy)
      : [];

    const wpUpdatedBy = [...wpPreviousUpdates, { userID: EMPID, date: TODAY }];

    const wpOrderedUpdatedBy = wpUpdatedBy?.map((entry) => ({
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

    if (!formData?.interview) {
      console.error("Error: formData.interview is undefined.");
      return;
    }

    if (!interviewScheduleId) {
      console.error("Error: No interview schedule found for this candidate.");
      return;
    }

    const wpTrackingData = {
      tempID: candidate.tempID,
      departuredate: formData.interview?.departuredate,
      arrivaldate: formData.interview?.arrivaldate,
      cityname: formData.interview?.cityname,
      airfare: formData.interview?.airfare,
      airticketfile: isUploadingString?.airTktFile
        ? JSON.stringify(wrapUpload(uploadedAirTkt?.airTktFile))
        : formData.interview?.airticketfile,
      createdBy: JSON.stringify([{ userID: EMPID, date: TODAY }]),
    };

    let response;

    try {
      if (interviewScheduleId) {
        response = await wpTrackingDetails({
          WPTrackingValue: {
            id: interviewScheduleId,
            departuredate: formData.interview?.departuredate,
            arrivaldate: formData.interview?.arrivaldate,
            cityname: formData.interview?.cityname,
            airfare: formData.interview?.airfare,
            airticketfile: isUploadingString?.airTktFile
              ? JSON.stringify(wrapUpload(uploadedAirTkt?.airTktFile))
              : formData.interview?.airticketfile,
            updatedBy: JSON.stringify(wpOrderedUpdatedBy),
          },
        });
      } else {
        await createWPTrackingHandler({
          reqValue: wpTrackingData,
        });
      }

      const interStatus = {
        id: interviewScheduleStatusId,
        status: formData.interview?.status,
        updatedBy: JSON.stringify(intOrderedUpdatedBy),
      };

      await interviewDetails({ InterviewValue: interStatus });

      setNotification(true);
      // if (response.errors && response.errors.length > 0) {
      //   console.error("Response errors:", response.errors);
      // }
    } catch (err) {
      console.error("Error submitting interview details:", err);
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
      <form onSubmit={handleSubmitTwo} className="p-5">
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="departuredate">Date of Departure</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="departuredate"
              {...register("departuredate")}
              value={formData.interview.departuredate}
              onChange={(e) =>
                handleInputChange("departuredate", e.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="arrivaldate">Date of Arrival</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="arrivaldate"
              {...register("arrivaldate")}
              value={formData.interview.arrivaldate}
              onChange={(e) => handleInputChange("arrivaldate", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cityname">City of Departure</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="text"
              id="cityname"
              {...register("cityname")}
              value={formData.interview.cityname}
              onChange={(e) => handleInputChange("cityname", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="airfare">AirFare</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="text"
              id="airfare"
              {...register("airfare")}
              value={formData.interview.airfare}
              onChange={(e) => handleInputChange("airfare", e.target.value)}
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
                fileKey="airTktFile"
                handleFileUpload={handleFileUpload}
                uploadedFileNames={uploadedFileNames}
                deletedStringUpload={deletedStringUpload}
                isUploadingString={isUploadingString}
                error={errors.airTktFile}
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
