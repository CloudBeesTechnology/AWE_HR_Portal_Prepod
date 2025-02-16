import React, { useState, useEffect } from "react";
import AweLogo from "../../../../assets/logo/logo-with-name.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { NlmsFormSchema } from "../../../../services/Validation";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";

export const NlmsForm = ({ candidate }) => {
  const { interviewSchedules } = useFetchCandy();
  const { interviewDetails } = UpdateInterviewData();
  const { wpTrackingDetails, isLoading, error } = useUpdateWPTracking();
  const [notification, setNotification] = useState(false); 
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

  const NlmsUpload = watch("nlmsFile");

  useEffect(() => {
 
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
            nlmssubmitdate: interviewData.nlmssubmitdate,
            submissionrefrenceno: interviewData.submissionrefrenceno,
            nlmsapprovedate: interviewData.nlmsapprovedate,
            nlmsexpirydate: interviewData.nlmsexpirydate,
            ldreferenceno: interviewData.ldreferenceno,
            nlmsfile: interviewData.nlmsfile,
            status: interviewData.IDDetails.status,
          },
        });
        // console.log("Form data set:", {
        //   nlmssubmitdate: interviewData.nlmssubmitdate,
        // });

        // Check if sawpFile exists and update the file names
        if (interviewData.nlmsfile) {
          const fileName = extractFileName(interviewData.nlmsfile);
          setUploadedFileNames((prev) => ({
            ...prev,
            nlmsFile: fileName,
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
      console.log("File selected:", file.name);
      if (type === "nlmsFile") {
        await uploadDocs(file, "nlmsFile", setUploadedNlms, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          nlmsFile: file.name, // Store the file name for display
        }));
        console.log("Uploaded file name:", file.name);
      }
    }
  };

  const handleInputChange = (field, value) => {
    // console.log("Input changed:", field, value); // Log input change
    setFormData((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        [field]: value,
      },
    }));
  };

  // Handle form submission and use wpTrackingDetails for update
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

    console.log("Selected Interview Data:", selectedInterviewData);
    console.log("Interview Schedule ID:", interviewScheduleId);
    console.log("Form Data before submission:", formData);
    console.log("Uploaded Nlms File:", uploadedNlms.nlmsFile);

    if (!formData?.interview) {
      console.error("Error: formData.interview is undefined.");
      return;
    }

    try {
      const response = await wpTrackingDetails({
        WPTrackingValue: {
          id: interviewScheduleId,
          nlmssubmitdate: formData.interview.nlmssubmitdate,
          submissionrefrenceno: formData.interview.submissionrefrenceno,
          nlmsapprovedate: formData.interview.nlmsapprovedate,
          nlmsexpirydate: formData.interview.nlmsexpirydate,
          ldreferenceno: formData.interview.ldreferenceno,
          nlmsfile: uploadedNlms.nlmsFile
            ? uploadedNlms.nlmsFile
            : formData.interview.nlmsfile,
        },
      });

      const interStatus = {
        id: interviewScheduleStatusId, 
        status: formData.interview.status,
      };
      setNotification(true);

      console.log("Submitting interview details with status:", interStatus);

      await interviewDetails({ InterviewValue: interStatus });

      console.log("Interview status updated:", interStatus);

      // console.log("WPTracking response:", response);
    } catch (err) {
      console.error("Error submitting interview details:", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitTwo} className="p-5">
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="nlmssubmitdate">Date of Submission</label>
            <input
              className="w-full border p-2 rounded mt-1"
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
              className="w-full border p-2 rounded mt-1"
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
              className="w-full border p-2 rounded mt-1"
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
              className="w-full border p-2 rounded mt-1"
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
              className="w-full border p-2 rounded mt-1"
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
            <div className="flex items-center gap-5 mt-1">
              <FileUploadField
                label="Upload File"
                className="p-4"
                onChangeFunc={(e) => handleFileChange(e, "nlmsFile")}
                accept="application/pdf"
                register={register}
                fileName={
                  uploadedFileNames.nlmsFile || extractFileName(NlmsUpload)
                }
                value={formData.interview.nlmsfile}
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

        {isLoading && <div>Loading...</div>}
        {notification && <div>Data updated successfully!</div>}
        {error && <div>Error: {error.message}</div>}

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
