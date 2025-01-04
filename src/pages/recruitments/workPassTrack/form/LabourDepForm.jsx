import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { LabourDepFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";

export const LabourDepForm = ({ candidate }) => {
  const { interviewSchedules } = useFetchCandy();
  const { interviewDetails } = UpdateInterviewData();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const [notification, setNotification] = useState(false);
  
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      lbrDepoNum: "",
      lbrEndroseDate: "",
      lbrDepoAmount: "",
      lbrFile: "",
      status: "",
    },
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    lbrFile: null,
  });
  const [uploadedLabDep, setUploadedLabDep] = useState({
    lbrFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(LabourDepFormSchema),
  });

  const DepositUpload = watch("lbrFile");

  useEffect(() => {
    // Log to see if interviewSchedules has data
    // console.log("interviewSchedules:", interviewSchedules);

    if (interviewSchedules.length > 0) {
      // Find the interviewData for the candidate
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );

      // Log the found interviewData
      // console.log("Found interviewData:", interviewData);

      if (interviewData) {
        // Set the form data
        setFormData({
          interview: {
            lbrDepoNum: interviewData.lbrDepoNum,
            lbrEndroseDate: interviewData.lbrEndroseDate,
            lbrDepoAmount: interviewData.lbrDepoAmount,
            lbrFile: interviewData.lbrFile,
            status: interviewData.status,
            status: interviewData.IDDetails.status,
          },
        });

        // Check if sawpFile exists and update the file names
        if (interviewData.lbrFile) {
          const fileName = extractFileName(interviewData.lbrFile);
          setUploadedFileNames((prev) => ({
            ...prev,
            lbrFile: fileName,
          }));
          console.log("Uploaded file name set:", fileName);
        }
      } else {
        console.log("No interviewData found for candidate:", candidate.tempID);
      }
    } else {
      console.log("No interview schedules available.");
    }
  }, [interviewSchedules, candidate.tempID]);

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return "";
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    setValue(type, file); // Set file value for validation
    if (file) {
      if (type === "lbrFile") {
        await uploadDocs(file, "lbrFile", setUploadedLabDep, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          lbrFile: file.name, // Store the file name for display
        }));
      }
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
          lbrDepoNum: formData.interview.lbrDepoNum,
          lbrEndroseDate: formData.interview.lbrEndroseDate,
          lbrDepoAmount: formData.interview.lbrDepoAmount,
          lbrFile: uploadedLabDep.lbrFile
            ? uploadedLabDep.lbrFile
            : formData.interview.lbrFile,
        },
      });

      const interStatus = {
        id: interviewScheduleStatusId, // Dynamically use the correct id
        status: formData.interview.status,
      };
      setNotification(true);

      console.log("Submitting interview details with status:", interStatus);

      await interviewDetails({ InterviewValue: interStatus });

      console.log("Interview status updated:", interStatus);

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
            <label htmlFor="lbrDepoNum">Labour Deposit Receipt Number</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="text"
              id="lbrDepoNum"
              {...register("lbrDepoNum")}
              value={formData.interview.lbrDepoNum}
              onChange={(e) => handleInputChange("lbrDepoNum", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lbrEndroseDate">
              Date Endrosement Of Labour Deposit
            </label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="date"
              id="lbrEndroseDate"
              {...register("lbrEndroseDate")}
              value={formData.interview.lbrEndroseDate}
              onChange={(e) =>
                handleInputChange("lbrEndroseDate", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="lbrDepoAmount">Deposit Amount</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="text"
              id="lbrDepoAmount"
              {...register("lbrDepoAmount")}
              value={formData.interview.lbrDepoAmount}
              onChange={(e) =>
                handleInputChange("lbrDepoAmount", e.target.value)
              }
            />
          </div>
          <div className="">
            <div className="flex items-center gap-5 mt-1">
              <FileUploadField
                label="Upload File"
                className="p-4"
                onChangeFunc={(e) => handleFileChange(e, "lbrFile")}
                accept="application/pdf"
                register={register}
                fileName={
                  uploadedFileNames.lbrFile || extractFileName(DepositUpload)
                }
                value={formData.interview.lbrFile}
              />
            </div>
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              className="w-full border p-2 rounded mt-1"
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
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow"
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
