import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../hooks/useFetchInterview";

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

export const CVEVForm = () => {
  const { mergedInterviewData } = useFetchInterview();
  const { loiDetails } = UpdateLoiData();
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      cvecApproveDate: "",
      cvecFile: [],
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
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(CVEVFormSchema),
  });

  const CVECUpload = watch("cvecFile", "");

  console.log("DATA 3.0", mergedInterviewData);

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
      setFormData({
        interview: {
          cvecApproveDate: interviewData.localMobilization.cvecApproveDate,
          cvecFile: interviewData.localMobilization.cvecFile,
        },
      });
      if (interviewData.localMobilization.cvecFile) {
        setUploadedFileNames((prev) => ({
          ...prev,
          cvecFile: extractFileName(interviewData.localMobilization.cvecFile),
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

    const localMobilizationId = mergedInterviewData[0]?.localMobilization.id;

    try {
      await loiDetails({
        LoiValue: {
          id: localMobilizationId,
          cvecApproveDate: formData.interview.cvecApproveDate,
          cvecFile: uploadedCVEC.cvecFile || formData.cvecFile,
        },
      });
      console.log("Data stored successfully...");
      // setNotification(true);
    } catch (error) {
      console.error("Error submitting interview details:", error);
      alert("Failed to update interview details. Please try again.");
    }
  };

  // useEffect(() => {
  //   if (mergedInterviewData.length > 0) {
  //     const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
  //     setFormData({
  //       interview: {
  //         loiIssueDate: interviewData.localMobilization.loiIssueDate,
  //         loiAcceptDate: interviewData.localMobilization.loiAcceptDate,
  //         loiDeclineDate: interviewData.localMobilization.loiDeclineDate,
  //         declineReason: interviewData.localMobilization.declineReason,
  //         loiFile: interviewData.localMobilization.loiFile,
  //       },
  //     });
  //   }
  // }, [mergedInterviewData]);

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
            {/* </label> */}
            {/* {uploadedFileNames.cvecFile ? (
              <p className="text-xs mt-1 text-grey">
                {uploadedFileNames.cvecFile}
              </p>
            ) : (
              errors.cvecFile && (
                <p className="text-[red] text-xs mt-1">
                  {errors.cvecFile.message}
                </p>
              )
            )} */}
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
