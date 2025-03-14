import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocString } from "../../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { DoeFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadDoe } from "../deleteUpload/DeleteUploadDoe";
import { useDeleteAccess } from "../../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../../utils/DeletePopup";
export const DoeForm = ({ candidate }) => {
  const { formattedPermissions } = useDeleteAccess();
  const { interviewSchedules } = useFetchCandy();
  const { interviewDetails } = UpdateInterviewData();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      doesubmitdate: "",
      doerefno: "",
      doeapprovedate: "",
      doeexpirydate: "",
      doefile: "",
      status: "",
    },
  });

  const [isUploadingString, setIsUploadingString] = useState({
    doeFile: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    doeFile: null,
  });

  const [uploadedDoe, setUploadedDoe] = useState({
    doeFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(DoeFormSchema),
  });

  const DoeUpload = watch("doeFile", "");

  useEffect(() => {
    if (interviewSchedules.length > 0) {
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );

      if (interviewData) {
        setFormData({
          interview: {
            doesubmitdate: interviewData.doesubmitdate,
            doerefno: interviewData.doerefno,
            doeapprovedate: interviewData.doeapprovedate,
            doeexpirydate: interviewData.doeexpirydate,
            doefile: interviewData.doefile || formData.interview.doefile,
            status: interviewData.IDDetails.status,
          },
        });

        if (interviewData.doefile) {
          const fileName = extractFileName(interviewData.doefile);
          setUploadedFileNames((prev) => ({
            ...prev,
            doeFile: fileName,
          }));
          // console.log("Uploaded file name set:", fileName);
        }
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
      await uploadDocString(selectedFile, type, setUploadedDoe, tempID);
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
      const isDeletedArrayUploaded = await DeleteUploadDoe(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedDoe,
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
      // console.log(`Deleted "${fileName}". Remaining files:`);
    } catch (error) {
      // console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const handleSubmitTwo = async (data) => {
    data.preventDefault();

    const selectedInterviewData = interviewSchedules.find(
      (data) => data.tempID === candidate?.tempID
    );

    const selectedInterviewDataStatus = interviewSchedules.find(
      (data) => data.IDDetails.tempID === candidate?.tempID
    );

    const interviewScheduleId = selectedInterviewData?.id;
    const interviewScheduleStatusId = selectedInterviewDataStatus.IDDetails?.id;
    console.log(selectedInterviewDataStatus);

    if (!formData?.interview) {
      console.error("Error: formData.interview is undefined.");
      return;
    }

    if (!formData?.interview?.status) {
      console.error("Missing interview status in formData.");
      return;
    }

    try {
      const response = await wpTrackingDetails({
        WPTrackingValue: {
          id: interviewScheduleId,
          doesubmitdate: formData.interview.doesubmitdate,
          doerefno: formData.interview.doerefno,
          doeapprovedate: formData.interview.doeapprovedate,
          doeexpirydate: formData.interview.doeexpirydate,
          doefile: uploadedDoe.doeFile,
        },
      });
      // console.log("WPTracking response:", response);

      const interStatus = {
        id: interviewScheduleStatusId,
        status: formData.interview.status,
      };
      setNotification(true);

      // console.log("Submitting interview details with status:", interStatus);

      await interviewDetails({ InterviewValue: interStatus });

      // console.log("Interview status updated:", interStatus);
    } catch (err) {
      if (err?.response?.data?.errors) {
        console.error("API Errors:", err.response.data.errors);
      } else {
        console.error("Unexpected error:", err);
      }
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
      <form className="p-5" onSubmit={handleSubmitTwo}>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="doesubmitdate">Date of Submission</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="doesubmitdate"
              {...register("doesubmitdate")}
              value={formData.interview.doesubmitdate}
              onChange={(e) =>
                handleInputChange("doesubmitdate", e.target.value)
              }
            />
            {errors.doesubmitdate && (
              <span>{errors.doesubmitdate.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="doeapprovedate">Date of Approval</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="doeapprovedate"
              {...register("doeapprovedate")}
              value={formData.interview.doeapprovedate}
              onChange={(e) =>
                handleInputChange("doeapprovedate", e.target.value)
              }
            />
            {errors.doeapprovedate && (
              <span>{errors.doeapprovedate.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="doeexpirydate">Valid Until</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="doeexpirydate"
              {...register("doeexpirydate")}
              value={formData.interview.doeexpirydate}
              onChange={(e) =>
                handleInputChange("doeexpirydate", e.target.value)
              }
            />
            {errors.doeexpirydate && (
              <span>{errors.doeexpirydate.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="doerefno">DOE Reference Number</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="text"
              id="doerefno"
              {...register("doerefno")}
              value={formData.interview.doerefno}
              onChange={(e) => handleInputChange("doerefno", e.target.value)}
            />
            {errors.doerefno && <span>{errors.doerefno.message}</span>}
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
                fileKey="doeFile"
                handleFileUpload={handleFileUpload}
                uploadedFileNames={uploadedFileNames}
                deletedStringUpload={deletedStringUpload}
                isUploadingString={isUploadingString}
                error={errors.doeFile}
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
