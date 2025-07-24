import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocString } from "../../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { NlmsFormSchema } from "../../../../services/Validation";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadNlms } from "../deleteUpload/DeleteUploadNlms";
import { useDeleteAccess } from "../../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../../utils/DeletePopup";
import { DataSupply } from "../../../../utils/DataStoredContext";
import { useCreateWPTracking } from "../../../../services/createMethod/CreateWPTracking";

export const NlmsForm = ({ candidate }) => {
  const { IVSSDetails } = useContext(DataSupply);
  const { formattedPermissions } = useDeleteAccess();
  const { interviewSchedules } = useFetchCandy();
  const { interviewDetails } = UpdateInterviewData();
  const { createWPTrackingHandler } = useCreateWPTracking();
  const { wpTrackingDetails, isLoading, error } = useUpdateWPTracking();
  const [notification, setNotification] = useState(false);
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      nlmssubmitdate: "",
      submissionrefrenceno: "",
      nlmsapprovedate: "",
      nlmsexpirydate: "",
      ldreferenceno: "",
      nlmsfile: "",
      status: "",
    },
  });

  const [isUploadingString, setIsUploadingString] = useState({
    nlmsFile: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    nlmsFile: null,
  });
  const [uploadedNlms, setUploadedNlms] = useState({
    nlmsFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(NlmsFormSchema),
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
            nlmssubmitdate: interviewData.nlmssubmitdate,
            submissionrefrenceno: interviewData.submissionrefrenceno,
            nlmsapprovedate: interviewData.nlmsapprovedate,
            nlmsexpirydate: interviewData.nlmsexpirydate,
            ldreferenceno: interviewData.ldreferenceno,
            nlmsfile: interviewData.nlmsfile,
            status: interviewData.IDDetails.status,
          },
        });

        if (interviewData.nlmsfile) {
          const fileName = extractFileName(interviewData.nlmsfile);
          setUploadedFileNames((prev) => ({
            ...prev,
            nlmsFile: fileName,
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
      await uploadDocString(selectedFile, type, setUploadedNlms, tempID);
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
      const isDeletedArrayUploaded = await DeleteUploadNlms(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedNlms,
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        [field]: value,
      },
    }));
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

    if (!formData?.interview) {
      console.error("Error: formData.interview is undefined.");
      return;
    }

    const wpTrackingData = {
      tempID: candidate.tempID,
      nlmssubmitdate: formData.interview.nlmssubmitdate,
      submissionrefrenceno: formData.interview.submissionrefrenceno,
      nlmsapprovedate: formData.interview.nlmsapprovedate,
      nlmsexpirydate: formData.interview.nlmsexpirydate,
      ldreferenceno: formData.interview.ldreferenceno,
      nlmsfile: isUploadingString.nlmsFile
        ? JSON.stringify(wrapUpload(uploadedNlms.nlmsFile))
        : formData.interview.nlmsfile,
      createdBy: JSON.stringify([{ userID: EMPID, date: TODAY }]),
    };

    try {
      if (interviewScheduleId) {
        const response = await wpTrackingDetails({
          WPTrackingValue: {
            id: interviewScheduleId,
            nlmssubmitdate: formData.interview.nlmssubmitdate,
            submissionrefrenceno: formData.interview.submissionrefrenceno,
            nlmsapprovedate: formData.interview.nlmsapprovedate,
            nlmsexpirydate: formData.interview.nlmsexpirydate,
            ldreferenceno: formData.interview.ldreferenceno,
            nlmsfile: isUploadingString.nlmsFile
              ? JSON.stringify(wrapUpload(uploadedNlms.nlmsFile))
              : formData.interview.nlmsfile,
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
        status: formData.interview.status,
        updatedBy: JSON.stringify(intOrderedUpdatedBy),
      };

      await interviewDetails({ InterviewValue: interStatus });

      setNotification(true);
    } catch (err) {
      console.error("Error submitting interview details:", err);
    }
  };

  const requiredPermissions = ["WorkPass Tracking"];

  const access = "Recruitment";

  return (
    <>
      <form onSubmit={handleSubmitTwo} className="p-5">
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="nlmssubmitdate">Date of Submission</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="nlmssubmitdate"
              {...register("nlmssubmitdate")}
              value={formData.interview.nlmssubmitdate}
              onChange={(e) =>
                handleInputChange("nlmssubmitdate", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="submissionrefrenceno">
              Submission Reference Number
            </label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="text"
              id="submissionrefrenceno"
              {...register("submissionrefrenceno")}
              value={formData.interview.submissionrefrenceno}
              onChange={(e) =>
                handleInputChange("submissionrefrenceno", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="nlmsapprovedate">Date of Approval</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="nlmsapprovedate"
              {...register("nlmsapprovedate")}
              value={formData.interview.nlmsapprovedate}
              onChange={(e) =>
                handleInputChange("nlmsapprovedate", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="nlmsexpirydate">Valid Until</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="nlmsexpirydate"
              {...register("nlmsexpirydate")}
              value={formData.interview.nlmsexpirydate}
              onChange={(e) =>
                handleInputChange("nlmsexpirydate", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="ldreferenceno">LD Reference Number</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="text"
              id="ldreferenceno"
              {...register("ldreferenceno")}
              value={formData.interview.ldreferenceno}
              onChange={(e) =>
                handleInputChange("ldreferenceno", e.target.value)
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

          <div>
            <div className="">
              <FileUploadField
                label="Upload File"
                register={register}
                fileKey="nlmsFile"
                handleFileUpload={handleFileUpload}
                uploadedFileNames={uploadedFileNames}
                deletedStringUpload={deletedStringUpload}
                isUploadingString={isUploadingString}
                error={errors.nlmsFile}
                formattedPermissions={formattedPermissions}
                requiredPermissions={requiredPermissions}
                access={access}
              />
            </div>
          </div>
        </div>

        {isLoading && <div>Loading...</div>}
        {notification && <div>Data updated successfully!</div>}
        {error && <div>Error: {error.message}</div>}

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
