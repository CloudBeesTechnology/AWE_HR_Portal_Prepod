import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocString } from "../../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { JitpaFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadJitpa } from "../deleteUpload/DeleteUploadJitpa";
import { useDeleteAccess } from "../../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../../utils/DeletePopup";
import { useCreateWPTracking } from "../../../../services/createMethod/CreateWPTracking";
import { DataSupply } from "../../../../utils/DataStoredContext";

export const JitpaForm = ({ candidate }) => {
  const { IVSSDetails } = useContext(DataSupply);
  const { formattedPermissions } = useDeleteAccess();
  const { interviewSchedules, loading: interviewLoading } = useFetchCandy();
  const { interviewDetails } = UpdateInterviewData();
  const { createWPTrackingHandler } = useCreateWPTracking();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      tbapurchasedate: "",
      submitdateendorsement: "",
      jitpaexpirydate: "",
      jitpaamount: "",
      jitpafile: "",
      status: "",
    },
  });

  const [isUploadingString, setIsUploadingString] = useState({
    jitpaFile: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    jitpaFile: null,
  });
  const [uploadedJitpa, setUploadedJitpa] = useState({
    jitpaFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(JitpaFormSchema),
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
            tbapurchasedate: interviewData.tbapurchasedate,
            submitdateendorsement: interviewData.submitdateendorsement,
            jitpaexpirydate: interviewData.jitpaexpirydate,
            jitpaamount: interviewData.jitpaamount,
            jitpafile: interviewData.jitpafile,
            status: interviewData.IDDetails.status,
          },
        });

        if (interviewData.jitpafile) {
          const fileName = extractFileName(interviewData.jitpafile);
          setUploadedFileNames((prev) => ({
            ...prev,
            jitpaFile: fileName,
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
      const fileNameWithParams = decodedUrl?.split("/").pop();
      const cleanName = fileNameWithParams
        .split("?")[0]
        .split(",")[0]
        .split("#")[0]
        .replace(/"/g, "");
      return cleanName;
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
      await uploadDocString(selectedFile, type, setUploadedJitpa, tempID);
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
      const isDeletedArrayUploaded = await DeleteUploadJitpa(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedJitpa,
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

      // console.log(`Deleted "${fileName}". Remaining files:`);
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
    setSubmitLoading(true);

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

    const intOrderedUpdatedBy = intUpdatedBy?.map((entry) => ({
      userID: entry.userID,
      date: entry.date,
    }));

    if (!formData?.interview) {
      console.error("Error: formData.interview is undefined.");
      setSubmitLoading(false);
      return;
    }

    if (!interviewScheduleId) {
      console.error("Error: No interview schedule found for this candidate.");
      setSubmitLoading(false);
      return;
    }

    const wpTrackingData = {
      tempID: candidate.tempID,
      tbapurchasedate: formData.interview?.tbapurchasedate,
      submitdateendorsement: formData.interview?.submitdateendorsement,
      jitpaexpirydate: formData.interview?.jitpaexpirydate,
      jitpaamount: formData.interview?.jitpaamount,
      jitpafile: isUploadingString?.jitpaFile
        ? JSON.stringify(wrapUpload(uploadedJitpa?.jitpaFile))
        : formData.interview?.jitpafile,
      createdBy: JSON.stringify([{ userID: EMPID, date: TODAY }]),
    };

    let response;

    try {
      if (interviewScheduleId) {
        response = await wpTrackingDetails({
          WPTrackingValue: {
            id: interviewScheduleId,
            tbapurchasedate: formData.interview?.tbapurchasedate,
            submitdateendorsement: formData.interview?.submitdateendorsement,
            jitpaexpirydate: formData.interview?.jitpaexpirydate,
            jitpaamount: formData.interview?.jitpaamount,
            jitpafile: isUploadingString?.jitpaFile
              ? JSON.stringify(wrapUpload(uploadedJitpa?.jitpaFile))
              : formData.interview?.jitpafile,
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

      // console.log("Submitting interview details with status:", interStatus);

      await interviewDetails({ InterviewValue: interStatus });

      setNotification(true);
      // console.log("Interview status updated:", interStatus);

      // console.log("Response from WPTrackingDetails:", response);
    } catch (err) {
      console.error("Error submitting interview details:", err);
    } finally {
      setSubmitLoading(false);
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

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </div>
  );

  // Submit button with loading state
  const SubmitButton = () => (
    <button
      type="submit"
      disabled={submitLoading || interviewLoading}
      className={`py-2 px-12 font-medium rounded shadow-lg bg-yellow hover:bg-yellow flex items-center justify-center ${
        submitLoading || interviewLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {submitLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Submitting...
        </>
      ) : (
        "Submit"
      )}
    </button>
  );

  return (
    <>
      <form onSubmit={handleSubmitTwo} className="p-5 relative">
        {/* Loading overlay for data fetching */}
        {interviewLoading && <LoadingOverlay />}
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="tbapurchasedate">Date of Purchase</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="tbapurchasedate"
              {...register("tbapurchasedate")}
              value={formData.interview.tbapurchasedate}
              onChange={(e) =>
                handleInputChange("tbapurchasedate", e.target.value)
              }
              disabled={interviewLoading || submitLoading}
            />
          </div>
          <div>
            <label htmlFor="submitdateendorsement">Date of Endrosement</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="submitdateendorsement"
              {...register("submitdateendorsement")}
              value={formData.interview.submitdateendorsement}
              onChange={(e) =>
                handleInputChange("submitdateendorsement", e.target.value)
              }
              disabled={interviewLoading || submitLoading}
            />
          </div>
          <div>
            <label htmlFor="jitpaexpirydate">Valid Until</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="jitpaexpirydate"
              {...register("jitpaexpirydate")}
              value={formData.interview.jitpaexpirydate}
              onChange={(e) =>
                handleInputChange("jitpaexpirydate", e.target.value)
              }
              disabled={interviewLoading || submitLoading}
            />
          </div>
          <div>
            <label htmlFor="jitpaamount">JITPA Amount</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="text"
              id="jitpaamount"
              {...register("jitpaamount")}
              value={formData.interview.jitpaamount}
              onChange={(e) => handleInputChange("jitpaamount", e.target.value)}
              disabled={interviewLoading || submitLoading}
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
              disabled={interviewLoading || submitLoading}
            >
              {/* <option value="">Select Status</option> */}
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
                fileKey="jitpaFile"
                handleFileUpload={handleFileUpload}
                uploadedFileNames={uploadedFileNames}
                deletedStringUpload={deletedStringUpload}
                isUploadingString={isUploadingString}
                error={errors.jitpaFile}
                formattedPermissions={formattedPermissions}
                requiredPermissions={requiredPermissions}
                access={access}
                disabled={interviewLoading || submitLoading}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <SubmitButton />
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
