import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { DoeFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { useFetchInterview } from "../../../../hooks/useFetchInterview";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";

export const DoeForm = ({ candidate }) => {
  const { interviewSchedules } = useFetchCandy();
  const { interviewDetails } = UpdateInterviewData();
  const { wpTrackingDetails } = useUpdateWPTracking();
  // const { mergedInterviewData } = useFetchInterview();
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

  // console.log("CANDY TO EMP", interviewSchedules);

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
            doesubmitdate: interviewData.doesubmitdate,
            doerefno: interviewData.doerefno,
            doeapprovedate: interviewData.doeapprovedate,
            doeexpirydate: interviewData.doeexpirydate,
            doefile: interviewData.doefile,
            status: interviewData.IDDetails.status,
          },
        });
        console.log("Form data set:", {
          status: interviewData.IDDetails.status,
        });

        // Check if sawpFile exists and update the file names
        if (interviewData.doefile) {
          const fileName = extractFileName(interviewData.doefile);
          setUploadedFileNames((prev) => ({
            ...prev,
            doeFile: fileName,
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
      return url.split("/").pop(); // Extract the file name from URL
    }
    return "";
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    setValue(type, file); // Set file value for validation
    if (file) {
      if (type === "doeFile") {
        await uploadDocs(file, "doeFile", setUploadedDoe, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          doeFile: file.name, // Store the file name for display
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
          doefile: uploadedDoe.doeFile
            ? uploadedDoe.doeFile
            : formData.interview.doefile,
        },
      });
      console.log("WPTracking response:", response);

      const interStatus = {
        id: interviewScheduleStatusId,
        status: formData.interview.status,
      };
      setNotification(true);

      console.log("Submitting interview details with status:", interStatus);

      await interviewDetails({ InterviewValue: interStatus });

      console.log("Interview status updated:", interStatus); // Log the updated status
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

  return (
    <>
      <form className="p-5" onSubmit={handleSubmitTwo}>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="doesubmitdate">Date of Submission</label>
            <input
              className="w-full border p-2 rounded mt-1"
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
              className="w-full border p-2 rounded mt-1"
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
              className="w-full border p-2 rounded mt-1"
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
              className="w-full border p-2 rounded mt-1"
              type="text"
              id="doerefno"
              {...register("doerefno")}
              value={formData.interview.doerefno}
              onChange={(e) => handleInputChange("doerefno", e.target.value)}
            />
            {errors.doerefno && <span>{errors.doerefno.message}</span>}
          </div>

          <div className="">
            <div className="flex items-center gap-5 mt-1">
              <FileUploadField
                label="Upload File"
                className="p-4"
                onChangeFunc={(e) => handleFileChange(e, "doeFile")}
                accept="application/pdf"
                register={register}
                fileName={
                  uploadedFileNames.doeFile || extractFileName(DoeUpload)
                }
                value={formData.interview.doefile}
              />
              {errors.doeFile && <span>{errors.doeFile.message}</span>}
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
