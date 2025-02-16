import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../utils/StatusDropdown";
import { SpinLogo } from "../../../utils/SpinLogo";
// Define validation schema using Yup
const PAAFFormSchema = Yup.object().shape({
  paafApproveDate: Yup.date().notRequired(),
  paafFile: Yup.mixed()
    .nullable()
    .required("File is required")
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});

export const PAAFForm = ({ candidate }) => {
  const { loiDetails } = UpdateLoiData();
  const { mergedInterviewData } = useFetchInterview();
  const { interviewDetails } = UpdateInterviewData();
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      paafApproveDate: "",
      paafFile: "",
      status: "",
    },
  });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    paafFile: null,
  });
  const [uploadedPAAF, setUploadedPAAF] = useState({
    paafFile: null,
  });
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(PAAFFormSchema),
  });

  const PAAFUpload = watch("paafFile", "");

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData.find(
        (data) => data.tempID === candidate.tempID
      ); // Assuming we want to take the first item
      if (interviewData) {
        setFormData({
          interview: {
            paafApproveDate: interviewData.localMobilization.paafApproveDate,
            paafFile: interviewData.localMobilization.paafFile,
            status: interviewData.interviewSchedules.status,
          },
        });
        if (interviewData.localMobilization.paafFile) {
          setUploadedFileNames((prev) => ({
            ...prev,
            paafFile: extractFileName(interviewData.localMobilization.paafFile),
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
      if (type === "paafFile") {
        await uploadDocs(file, "paafFile", setUploadedPAAF, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          paafFile: file.name, // Store the file name for display
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
          paafApproveDate: formData.interview.paafApproveDate,
          paafFile: uploadedPAAF.paafFile || formData.paafFile,
        },
      });

      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleId, // Dynamically use the correct id
          status: formData.interview.status,
          // status: selectedInterviewData.empType === "Offshore" ? "CVEV" : "PAAF",
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
          <label htmlFor="paafApproveDate">Approval Date</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="paafApproveDate"
            {...register("paafApproveDate")}
            value={formData.interview.paafApproveDate}
            onChange={(e) =>
              handleInputChange("paafApproveDate", e.target.value)
            }
          />
        </div>

        <div className="">
          {/* <label>Choose File</label> */}
          <div className="flex items-center gap-5 mt-1">
            {/* <label className="flex items-center px-3 py-2 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer"> */}

            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "paafFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.paafFile || extractFileName(PAAFUpload)
              }
              value={formData.interview.paafFile}
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
      {notification && (
        <SpinLogo
          text="PAAF Updated Successfully"
          notification={notification}
          path="/recrutiles/status"
        />
      )}
    </form>
  );
};
