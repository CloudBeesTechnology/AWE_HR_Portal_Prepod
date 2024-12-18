import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { ImmigrationFormSchema } from "../../../../services/Validation";
import { UpdateLoiData } from "../../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../../hooks/useFetchInterview";

export const ImmigrationForm = () => {
  const { mergedInterviewData } = useFetchInterview();
  const { loiDetails } = UpdateLoiData();

  const [formData, setFormData] = useState({
    interview: {
      id: "",
      immbdNo: "IMMBD/1382",
      docSubmit: "",
      visaApproval: "",
      visaRefNo: "",
      visaFile: [],
    },
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

  const VisaUpload = watch("visaFile", "");

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
      setFormData({
        interview: {
          immbdNo: interviewData.localMobilization.immbdNo,
          docSubmit: interviewData.localMobilization.docSubmit,
          visaApproval: interviewData.localMobilization.visaApproval,
          visaRefNo: interviewData.localMobilization.visaRefNo,
          visaFile: interviewData.localMobilization.visaFile,
        },
      });
      if (interviewData.localMobilization.visaFile) {
        setUploadedFileNames((prev) => ({
          ...prev,
          visaFile: extractFileName(interviewData.localMobilization.visaFile),
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
      if (type === "visaFile") {
        await uploadDocs(file, "visaFile", setUploadedVisa, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          visaFile: file.name, // Store the file name for display
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
          immbdNo: formData.interview.immbdNo,
          docSubmit: formData.interview.docSubmit,
          visaApproval: formData.interview.visaApproval,
          visaRefNo: formData.interview.visaRefNo,
          visaFile: uploadedVisa.visaFile || formData.visaFile,
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
          <label htmlFor="docSubmit">Date of Submission</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="docSubmit"
            {...register("docSubmit")}
            value={formData.interview.docSubmit}
            onChange={(e) => handleInputChange("docSubmit", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="immbdNo">Immigration Reference Number</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="immbdNo"
            {...register("immbdNo")}
            value={formData.interview.immbdNo}
            onChange={(e) => handleInputChange("immbdNo", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="visaApproval">Date of Approval</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="visaApproval"
            {...register("visaApproval")}
            value={formData.interview.visaApproval}
            onChange={(e) => handleInputChange("visaApproval", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="visaRefNo">Visa Reference Number</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="visaRefNo"
            {...register("visaRefNo")}
            value={formData.interview.visaRefNo}
            onChange={(e) => handleInputChange("visaRefNo", e.target.value)}
          />
        </div>

        <div className="">
          <div className="flex items-center gap-5 mt-1">
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "visaFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.visaFile || extractFileName(VisaUpload)
              }
              value={formData.interview.visaFile}
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
