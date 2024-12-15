import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../hooks/useFetchInterview";

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

export const PAAFForm = () => {
  const { loiDetails } = UpdateLoiData();
  const { mergedInterviewData } = useFetchInterview();
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      paafApproveDate: "",
      paafFile: "",
    },
  });
  // const [uploadedFileName, setUploadedFileName] = useState(null);
  // const [uploadedPAAF, setUploadedPAAF] = useState(null);
  const [uploadedFileNames, setUploadedFileNames] = useState({
    paafFile: null,
  });
  const [uploadedPAAF, setUploadedPAAF] = useState({
    paafFile: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(PAAFFormSchema),
  });

  const PAAFUpload = watch("paafFile", "");

  console.log("DATA 3.0", mergedInterviewData);

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
      setFormData({
        interview: {
          paafApproveDate: interviewData.localMobilization.paafApproveDate,
          paafFile: interviewData.localMobilization.paafFile,
        },
      });
      if (interviewData.localMobilization.paafFile) {
        setUploadedFileNames((prev) => ({
          ...prev,
          paafFile: extractFileName(interviewData.localMobilization.paafFile),
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
 
    const localMobilizationId = mergedInterviewData[0]?.localMobilization.id;

    try {
      await loiDetails({
        LoiValue: {
          id: localMobilizationId,
          paafApproveDate: formData.interview.paafApproveDate,
          paafFile: uploadedPAAF.paafFile || formData.paafFile,
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
                  uploadedFileNames.paafFile || extractFileName(PAAFUpload) || formData.interview.paafFile
                }
                value={formData.interview.paafFile}               
              />
              {/* <span className="ml-2">
                <GoUpload />
              </span> */}
            {/* </label> */}
            {/* {uploadedFileName ? (
              <p className="text-xs mt-1 text-grey">{uploadedFileName}</p>
            ) : (
              errors.paafFile && (
                <p className="text-[red] text-xs mt-1">
                  {errors.paafFile.message}
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
