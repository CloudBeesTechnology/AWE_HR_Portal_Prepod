import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../utils/StatusDropdown";
import { SpinLogo } from "../../../utils/SpinLogo";

// Define validation schema using Yup
const MOBFormSchema = Yup.object().shape({
  mobSignDate: Yup.date().notRequired(),
  mobFile: Yup.mixed()
    .nullable()
    .required("File is required")
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});

export const MobilizationForm = ({ candidate }) => {
  const { loiDetails } = UpdateLoiData();
  const { mergedInterviewData } = useFetchInterview();
  const { interviewDetails } = UpdateInterviewData();
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      mobSignDate: "",
      mobFile: "",
      status: "",
    },
  });
  // const [uploadedFileName, setUploadedFileName] = useState(null);
  // const [uploadedMOB, setUploadedMOB] = useState(null);
  const [uploadedFileNames, setUploadedFileNames] = useState({
    mobFile: null,
  });
  const [uploadedMOB, setUploadedMOB] = useState({
    mobFile: null,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(MOBFormSchema),
  });

  const MOBUpload = watch("mobFile", "");

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData.find(
        (data) => data.tempID === candidate.tempID
      ); // Assuming we want to take the first item
      if (interviewData) {
        setFormData({
          interview: {
            mobSignDate: interviewData.localMobilization.mobSignDate,
            mobFile: interviewData.localMobilization.mobFile,
            status: interviewData.interviewSchedules.status,
          },
        });
        if (interviewData.localMobilization.mobFile) {
          setUploadedFileNames((prev) => ({
            ...prev,
            mobFile: extractFileName(interviewData.localMobilization.mobFile),
          }));
        }
      }
    }
  }, [mergedInterviewData, candidate.tempID]);

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
      if (type === "mobFile") {
        await uploadDocs(file, "mobFile", setUploadedMOB, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          mobFile: file.name, // Store the file name for display
        }));
      }
    }
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();

    // Check if mergedInterviewData is available for the candidate
    const selectedInterviewData = mergedInterviewData.find(
      (data) => data.tempID === candidate?.tempID
    );

    // Ensure the candidate and their localMobilization details exist
    if (!selectedInterviewData || !selectedInterviewData.localMobilization) {
      alert("Candidate or LOI data not found.");
      return;
    }

    const localMobilizationId = selectedInterviewData.localMobilization.id;
    const interviewScheduleId = selectedInterviewData.interviewSchedules.id;

    try {
      await loiDetails({
        LoiValue: {
          id: localMobilizationId,
          mobSignDate: formData.interview.mobSignDate,
          mobFile: uploadedMOB.mobFile || formData.mobfFile,
        },
      });
      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleId, // Dynamically use the correct id
          status: formData.interview.status,
          // status: selectedInterviewData.contractType === "Local" ? "mobilization" : "workpass",
        },
      });

      // console.log("Data stored successfully...");
      setNotification(true);
    } catch (error) {
      console.error("Error submitting interview details:", error);
      alert("Failed to update interview details. Please try again.");
    }
  };

  // Function to handle changes for non-file fields
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
    <form onSubmit={handleSubmitTwo} className="p-5">
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="mobSignDate">Date of Mobilize</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="mobSignDate"
        
            value={formData.interview.mobSignDate}
            onChange={(e) => handleInputChange("mobSignDate", e.target.value)}
          />
        </div>

        <div className="">
          {/* <label>Choose File</label> */}
          <div className="flex items-center gap-5 mt-1">
            {/* <label className="flex items-center px-3 py-2 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer"> */}

            <FileUploadField
              label="Upload File"
              onChangeFunc={(e) => handleFileChange(e, "mobFile")}
              className="hidden"
              accept="application/pdf"
              register={register}
              fileName={uploadedFileNames.mobFile || extractFileName(MOBUpload)}
              value={formData.interview.mobFile}
            />
          </div>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            className="w-full border p-2 rounded mt-1"
            id="status"
            // register={register}
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
      {notification && (
              <SpinLogo
                text="Mobilization Updated Successfully"
                notification={notification}
                path="/recrutiles/status"
              />
            )}
    </form>
  );
};
