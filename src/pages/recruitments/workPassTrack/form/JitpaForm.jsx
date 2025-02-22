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

export const JitpaForm = ({ candidate }) => {
  const { interviewSchedules } = useFetchCandy();
  const { interviewDetails } = UpdateInterviewData();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const [notification, setNotification] = useState(false);
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

  const JitpaUpload = watch("jitpaFile", "");

  useEffect(() => {
    if (interviewSchedules.length > 0) {
      const interviewData = interviewSchedules.find(
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
      await uploadDocString(selectedFile, type, setUploadedJitpa, tempID);
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
      const isDeletedArrayUploaded = await DeleteUploadJitpa(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedJitpa,
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
          tbapurchasedate: formData.interview.tbapurchasedate,
          submitdateendorsement: formData.interview.submitdateendorsement,
          jitpaexpirydate: formData.interview.jitpaexpirydate,
          jitpaamount: formData.interview.jitpaamount,
          jitpafile: uploadedJitpa.jitpaFile || formData.interview.jitpafile,
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

      // console.log("Response from WPTrackingDetails:", response);

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
