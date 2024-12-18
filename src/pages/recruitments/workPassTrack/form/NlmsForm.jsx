import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { NlmsFormSchema } from "../../../../services/Validation";
import { UpdateLoiData } from "../../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../../hooks/useFetchInterview";

export const NlmsForm = () => {
  const { mergedInterviewData } = useFetchInterview();
  const { loiDetails } = UpdateLoiData();
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      nlmsSubmit: "",
      nlmsSubmitRefNo: "",
      nlmsApproval: "",
      nlmsValid: "",
      ldRefNo: "",
      nlmsFile: [],
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

  const NlmsUpload = watch("nlmsFile", "");

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
      setFormData({
        interview: {
          nlmsSubmit: interviewData.localMobilization.nlmsSubmit,
          nlmsSubmitRefNo: interviewData.localMobilization.nlmsSubmitRefNo,
          nlmsApproval: interviewData.localMobilization.nlmsApproval,
          nlmsValid: interviewData.localMobilization.nlmsValid,
          ldRefNo: interviewData.localMobilization.ldRefNo,
          nlmsFile: interviewData.localMobilization.nlmsFile,
        },
      });
      if (interviewData.localMobilization.nlmsFile) {
        setUploadedFileNames((prev) => ({
          ...prev,
          nlmsFile: extractFileName(interviewData.localMobilization.nlmsFile),
        }));
      }
    }
  }, [mergedInterviewData]);

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
      if (type === "nlmsFile") {
        await uploadDocs(file, "nlmsFile", setUploadedNlms, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          nlmsFile: file.name, // Store the file name for display
        }));
      }
    }
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();

    const localMobilizationId = mergedInterviewData[0]?.localMobilization.id;

    try {
      await loiDetails({
        LoiValue: {
          id: localMobilizationId,
          nlmsSubmit: formData.interview.nlmsSubmit,
          nlmsSubmitRefNo: formData.interview.nlmsSubmitRefNo,
          nlmsApproval: formData.interview.nlmsApproval,
          nlmsValid: formData.interview.nlmsValid,
          ldRefNo: formData.interview.ldRefNo,
          nlmsFile: uploadedNlms.nlmsFile || formData.nlmsFile,
        },
      });
      console.log("Data stored successfully...");
      // setNotification(true);
    } catch (error) {
      console.error("Error submitting interview details:", error);
      alert("Failed to update interview details. Please try again.");
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
    <form onSubmit={handleSubmitTwo} className="p-5">
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="nlmsSubmit">Date of Submission</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="nlmsSubmit"
            {...register("nlmsSubmit")}
            value={formData.interview.nlmsSubmit}
            onChange={(e) =>
              handleInputChange("nlmsSubmit", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="nlmsSubmitRefNo">
            Submission Reference Number
          </label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="nlmsSubmitRefNo"
            {...register("nlmsSubmitRefNo")}
            value={formData.interview.nlmsSubmitRefNo}
            onChange={(e) =>
              handleInputChange("nlmsSubmitRefNo", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="nlmsApproval">Date of Approval</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="nlmsApproval"
            {...register("nlmsApproval")}
            value={formData.interview.nlmsApproval}
            onChange={(e) =>
              handleInputChange("nlmsApproval", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="nlmsValid">Valid Until</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="nlmsValid"
            {...register("nlmsValid")}
            value={formData.interview.nlmsValid}
            onChange={(e) =>
              handleInputChange("nlmsValid", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="ldRefNo">LD Reference Number</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="ldRefNo"
            {...register("ldRefNo")}
            value={formData.interview.ldRefNo}
            onChange={(e) => handleInputChange("ldRefNo", e.target.value)}
          />
        </div>

        <div className="">
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
              value={formData.interview.nlmsFile}
            />
          </div>
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
