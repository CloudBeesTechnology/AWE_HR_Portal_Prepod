import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../utils/StatusDropdown";

// Define validation schema using Yup
const CVEVFormSchema = Yup.object().shape({
  cvecApproveDate: Yup.date().notRequired(),
  cvecFile: Yup.mixed()
    .nullable()
    .required("File is required")
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});

export const CVEVForm = ({ candidate }) => {
  const { mergedInterviewData } = useFetchInterview();
  const { loiDetails } = UpdateLoiData();
  const { interviewDetails } = UpdateInterviewData();
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      cvecApproveDate: "",
      cvecFile: [],
      status: "",
    },
  });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    cvecFile: null,
  });
  const [uploadedCVEC, setUploadedCVEC] = useState({
    cvecFile: null,
  });
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(CVEVFormSchema),
  });

  const CVECUpload = watch("cvecFile", "");

  // console.log("DATA 3.0", mergedInterviewData);

  useEffect(() => {
    if (mergedInterviewData.length > 0 && candidate?.tempID) {
      const interviewData = mergedInterviewData.find(
        (data) => data.tempID === candidate.tempID
      ); // Use the candidate's tempID to filter the data
      if (interviewData) {
        setFormData({
          interview: {
            cvecApproveDate: interviewData.localMobilization.cvecApproveDate,
            cvecFile: interviewData.localMobilization.cvecFile,
            status: interviewData.interviewSchedules.status,
          },
        });
      }
      if (interviewData.localMobilization.cvecFile) {
        setUploadedFileNames((prev) => ({
          ...prev,
          cvecFile: extractFileName(interviewData.localMobilization.cvecFile),
        }));
      }
    }
  }, [mergedInterviewData, candidate?.tempID]);

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
      if (type === "cvecFile") {
        await uploadDocs(file, "cvecFile", setUploadedCVEC, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          cvecFile: file.name, // Store the file name for display
        }));
      }
    }
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();

    // Find the correct interview data using the tempID of the selected candidate
    const selectedInterviewData = mergedInterviewData.find(
      (data) => data.tempID === candidate?.tempID
    );

    if (!selectedInterviewData) {
      console.error("No interview data found for the selected candidate.");
      alert("No interview data found for the selected candidate.");
      return;
    }
    const localMobilizationId = selectedInterviewData?.localMobilization?.id;
    const interviewScheduleId = selectedInterviewData.interviewSchedules.id;

    if (!localMobilizationId) {
      console.error("Interview schedule ID not found.");
      alert("Interview schedule ID not found.");
      return;
    }

    try {
      await loiDetails({
        LoiValue: {
          id: localMobilizationId,
          cvecApproveDate: formData.interview.cvecApproveDate,
          cvecFile: uploadedCVEC.cvecFile || formData.cvecFile,
        },
      });

      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleId, // Dynamically use the correct id
          status: formData.interview.status,
        },
      });
      console.log("Data stored successfully...");
      // setNotification(true);
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
          <label htmlFor="cvecApproveDate">Approval Date</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="cvecApproveDate"
            {...register("cvecApproveDate")}
            value={formData.interview.cvecApproveDate}
            onChange={(e) =>
              handleInputChange("cvecApproveDate", e.target.value)
            }
          />
        </div>

        <div className="">
          {/* <label>Choose File</label> */}
          <div className="flex items-center gap-5 mt-1">
            {/* <label className="flex items-center px-3 py-2 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
              Upload CVEV */}
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "cvecFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.cvecFile || extractFileName(CVECUpload)
              }
              value={formData.interview.cvecFile}
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
  );
};
