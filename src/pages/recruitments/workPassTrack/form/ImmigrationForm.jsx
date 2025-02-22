import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocString } from "../../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { ImmigrationFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadImmi } from "../deleteUpload/DeleteUploadImmi";

export const ImmigrationForm = ({ candidate }) => {
  const { interviewSchedules } = useFetchCandy();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const { interviewDetails } = UpdateInterviewData();
  const [notification, setNotification] = useState(false);

  const [formData, setFormData] = useState({
    interview: {
      id: "",
      immbdno: "",
      docsubmitdate: "",
      visaapprovedate: "",
      visareferenceno: "",
      visaFile: "",
      status: "",
    },
  });
  const [isUploadingString, setIsUploadingString] = useState({
    visaFile: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    visaFile: null,
  });
  const [uploadedVisa, setUploadedVisa] = useState({
    visaFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ImmigrationFormSchema),
  });

  const VisaUpload = watch("visaFile");

  useEffect(() => {
    if (interviewSchedules.length > 0) {
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );

      if (interviewData) {
        setFormData({
          interview: {
            immbdno: interviewData.immbdno,
            docsubmitdate: interviewData.docsubmitdate,
            visaapprovedate: interviewData.visaapprovedate,
            visareferenceno: interviewData.visareferenceno,
            visaFile: interviewData.visaFile,
            status: interviewData.status,
            status: interviewData.IDDetails.status,
          },
        });

        if (interviewData.visaFile) {
          const fileName = extractFileName(interviewData.visaFile);
          setUploadedFileNames((prev) => ({
            ...prev,
            visaFile: fileName,
          }));
          // console.log("Uploaded file name set:", fileName);
        }
      } else {
        // console.log("No interviewData found for candidate:", candidate.tempID);
      }
    } else {
      // console.log("No interview schedules available.");
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
      await uploadDocString(selectedFile, type, setUploadedVisa, tempID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [type]: selectedFile.name,
      }));
    }
  };

  const deletedStringUpload = async (fileType, fileName) => {
    try {
      const tempID = candidate.tempID;
  
      if (!tempID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(fileType, fileName, tempID);
      const isDeletedArrayUploaded = await DeleteUploadImmi(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedVisa,
        setIsUploadingString
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

    if (!formData?.interview) {
      console.error("Error: formData.interview is undefined.");
      return;
    }

    if (!interviewScheduleId) {
      console.error("Error: No interview schedule found for this candidate.");
      return;
    }

    try {
      const response = await wpTrackingDetails({
        WPTrackingValue: {
          id: interviewScheduleId,
          immbdno: formData.interview.immbdno,
          docsubmitdate: formData.interview.docsubmitdate,
          visaapprovedate: formData.interview.visaapprovedate,
          visareferenceno: formData.interview.visareferenceno,
          visaFile: uploadedVisa.visaFile || formData.interview.visaFile,
        },
      });

      const interStatus = {
        id: interviewScheduleStatusId, 
        status: formData.interview.status,
      };
      setNotification(true);

      // console.log("Submitting interview details with status:", interStatus);

      await interviewDetails({ InterviewValue: interStatus });

      // console.log("Interview status updated:", interStatus);


      if (response.errors && response.errors.length > 0) {
        console.error("Response errors:", response.errors);
      }
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

  return (
    <>
      <form onSubmit={handleSubmitTwo} className="p-5">
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="docsubmitdate">Date of Submission</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="docsubmitdate"
              {...register("docsubmitdate")}
              value={formData.interview.docsubmitdate}
              onChange={(e) =>
                handleInputChange("docsubmitdate", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="immbdno">Immigration Reference Number</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="text"
              id="immbdno"
              {...register("immbdno")}
              value={formData.interview.immbdno}
              onChange={(e) => handleInputChange("immbdno", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="visaapprovedate">Date of Approval</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id=" visaapprovedate"
              {...register(" visaapprovedate")}
              value={formData.interview.visaapprovedate}
              onChange={(e) =>
                handleInputChange("visaapprovedate", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="visareferenceno">Visa Reference Number</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="text"
              id="visareferenceno"
              {...register("visareferenceno")}
              value={formData.interview.visareferenceno}
              onChange={(e) =>
                handleInputChange("visareferenceno", e.target.value)
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
                fileKey="visaFile"
                handleFileUpload={handleFileUpload}
                uploadedFileNames={uploadedFileNames}
                deletedStringUpload={deletedStringUpload}
                isUploadingString={isUploadingString}
                error={errors.visaFile}
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
    </>
  );
};
