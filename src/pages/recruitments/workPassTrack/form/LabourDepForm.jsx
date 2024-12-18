import React, { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { LabourDepFormSchema } from '../../../../services/Validation';
import { UpdateLoiData } from "../../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../../hooks/useFetchInterview";

export const LabourDepForm = () => {
  
    const { mergedInterviewData } = useFetchInterview();
    const { loiDetails } = UpdateLoiData();
    const [formData, setFormData] = useState({
    interview: {
      id: "",
      labDepReceiptNo:'', 
      labDepAmount:'' ,
      labEndrose:'',
      labDepFile: [],
    },
  });
    const [uploadedFileNames, setUploadedFileNames] = useState({
      labDepFile: null,
    });
    const [uploadedLabDep, setUploadedLabDep] = useState({
      labDepFile: null,
    });

      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
      } = useForm({
        resolver: yupResolver(LabourDepFormSchema),
      });

      const DepositUpload = watch("labDepFile", "");
      useEffect(() => {
                if (mergedInterviewData.length > 0) {
                  const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
                  setFormData({
                    interview: {
                      labDepReceiptNo: interviewData.localMobilization.labDepReceiptNo,
                      labDepAmount: interviewData.localMobilization.labDepAmount,
                      labEndrose: interviewData.localMobilization.labEndrose,
                      labDepFile: interviewData.localMobilization.labDepFile,
                    },
                  });
                  if (interviewData.localMobilization.labDepFile) {
                    setUploadedFileNames((prev) => ({
                      ...prev,
                      labDepFile: extractFileName(interviewData.localMobilization.labDepFile),
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
                  if (type === "labDepFile") {
                    await uploadDocs(file, "labDepFile", setUploadedLabDep, "personName");
            
                    setUploadedFileNames((prev) => ({
                      ...prev,
                      labDepFile: file.name, // Store the file name for display
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
                      labDepReceiptNo: formData.interview.labDepReceiptNo,
                      labDepAmount: formData.interview.labDepAmount,
                      labEndrose: formData.interview.labEndrose,
                      labDepFile: uploadedLabDep.labDepFile || formData.labDepFile,
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
<form onSubmit={handleSubmitTwo}  className="p-5">
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="labDepReceiptNo">Labour Deposit Receipt Number</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="labDepReceiptNo"
            {...register("labDepReceiptNo")}
            value={formData.interview.labDepReceiptNo}
            onChange={(e) =>
              handleInputChange("labDepReceiptNo", e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="labEndrose">Date Endrosement Of Labour Deposit</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="labEndrose"
            {...register("labEndrose")}
            value={formData.interview.labEndrose}
            onChange={(e) =>
              handleInputChange("labEndrose", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="labDepAmount">Deposit Amount</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="labDepAmount"
            {...register("labDepAmount")}
            value={formData.interview.labDepAmount}
            onChange={(e) =>
              handleInputChange("labDepAmount", e.target.value)
            }
          />
        </div>
        <div className="">
          <div className="flex items-center gap-5 mt-1">
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "labDepFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.labDepFile || extractFileName(DepositUpload)
              }
              value={formData.interview.labDepFile}
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