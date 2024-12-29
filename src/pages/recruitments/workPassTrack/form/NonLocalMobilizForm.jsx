import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { NonLocalMOBFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { statusOptions } from "../../../../utils/StatusDropdown";

export const NonLocalMobilizForm = ({ candidate }) => {
  const { interviewSchedules } = useFetchCandy();
  const { wpTrackingDetails } = useUpdateWPTracking();

  const [formData, setFormData] = useState({
    interview: {
      id: "",
      mobSignDate: "",
      agentname: "",
      remarkNLMob: "",
      mobFile: "",
      status: "",
    },
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    mobFile: null,
  });
  const [uploadedMobiliz, setUploadedMobiliz] = useState({
    mobFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(NonLocalMOBFormSchema),
  });

  const MobilizUpload = watch("mobFile", "");

  useEffect(() => {
    if (interviewSchedules.length > 0) {
      // Find the interviewData for the candidate
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );

      if (interviewData) {
        // Set the form data
        setFormData({
          interview: {
            mobSignDate: interviewData.mobSignDate,
            agentname: interviewData.agentname,
            remarkNLMob: interviewData.remarkNLMob,
            mobFile: interviewData.mobFile,
            status: interviewData.status,
          },
        });

        // Check if sawpFile exists and update the file names
        if (interviewData.mobFile) {
          const fileName = extractFileName(interviewData.mobFile);
          setUploadedFileNames((prev) => ({
            ...prev,
            mobFile: fileName,
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
      if (type === "mobFile") {
        await uploadDocs(file, "mobFile", setUploadedMobiliz, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          mobFile: file.name, // Store the file name for display
        }));
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

  const handleSubmitTwo = async (data) => {
    data.preventDefault();

    const selectedInterviewData = interviewSchedules.find(
      (data) => data.tempID === candidate?.tempID
    );
    const interviewScheduleId = selectedInterviewData?.id;

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
          mobSignDate: formData.interview.mobSignDate,
          agentname: formData.interview.agentname,
          remarkNLMob: formData.interview.remarkNLMob,
          mobFile: uploadedMobiliz.mobFile
            ? uploadedMobiliz.mobFile
            : formData.interview.mobFile,
        },
      });

      // console.log("Response from WPTrackingDetails:", response);

      if (response.errors && response.errors.length > 0) {
        console.error("Response errors:", response.errors);
      }
    } catch (err) {
      console.error("Error submitting interview details:", err);
    }
  };

  return (
    <form onSubmit={handleSubmitTwo} className="p-5">
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="mobSignDate">Date of Mobilization</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="mobSignDate"
            {...register("mobSignDate")}
            value={formData.interview.mobSignDate}
            onChange={(e) => handleInputChange("mobSignDate", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="agentname">Agent Name</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="agentname"
            {...register("agentname")}
            value={formData.interview.agentname}
            onChange={(e) => handleInputChange("agentname", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="remarkNLMob">Recruitment Remarks</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="remarkNLMob"
            {...register("remarkNLMob")}
            value={formData.interview.remarkNLMob}
            onChange={(e) => handleInputChange("remarkNLMob", e.target.value)}
          />
        </div>

        <div className="">
          <div className="flex items-center gap-5 mt-1">
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "mobFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.mobFile || extractFileName(MobilizUpload)
              }
              value={formData.interview.mobFile}
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
