import React, { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { BankFormSchema } from '../../../../services/Validation';
import { UpdateLoiData } from "../../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../../hooks/useFetchInterview";

export const BankForm = () => {

    const { mergedInterviewData } = useFetchInterview();
    const { loiDetails } = UpdateLoiData();
    const [formData, setFormData] = useState({
    interview: {
      id: "",
      bgSubmit:'', 
      bgRece:'' ,
      bgValid:'',
      bgRefNo:'',
      bgAmount: '',
      bgFile: [],
    },
  });
    const [uploadedFileNames, setUploadedFileNames] = useState({
      bgFile: null,
    });
    const [uploadedBank, setUploadedBank] = useState({
      bgFile: null,
    });

      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
      } = useForm({
        resolver: yupResolver(BankFormSchema),
      });

      const BankUpload = watch("bgFile", "");

      useEffect(() => {
          if (mergedInterviewData.length > 0) {
            const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
            setFormData({
              interview: {
                bgSubmit: interviewData.localMobilization.bgSubmit,
                bgRece: interviewData.localMobilization. bgRece,
                bgValid: interviewData.localMobilization.bgValid,
                bgRefNo: interviewData.localMobilization.bgRefNo,
                bgAmount: interviewData.localMobilization.bgAmount,
                bgFile: interviewData.localMobilization.bgFile,
              },
            });
            if (interviewData.localMobilization.bgFile) {
              setUploadedFileNames((prev) => ({
                ...prev,
                bgFile: extractFileName(interviewData.localMobilization.bgFile),
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
            if (type === "bgFile") {
              await uploadDocs(file, "bgFile", setUploadedBank, "personName");
      
              setUploadedFileNames((prev) => ({
                ...prev,
                bgFile: file.name, // Store the file name for display
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
                bgSubmit: formData.interview.bgSubmit,
                bgRece: formData.interview. bgRece,
                bgValid: formData.interview.bgValid,
                bgRefNo: formData.interview.bgRefNo,
                bgAmount: formData.interview.bgAmount,
                bgFile: uploadedBank.bgFile || formData.bgFile,
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
          <label htmlFor="bgSubmit">Date of Submission</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="bgSubmit"
            {...register("bgSubmit")}
            value={formData.interview.bgSubmit}
            onChange={(e) =>
              handleInputChange("bgSubmit", e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="bgRece">Date Received</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="bgRece"
            {...register("bgRece")}
            value={formData.interview.bgRece}
            onChange={(e) =>
              handleInputChange("bgRece", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="bgValid">Valid Until</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="bgValid"
            {...register("bgValid")}
            value={formData.interview.bgValid}
            onChange={(e) =>
              handleInputChange("bgValid", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="bgAmount">Bank Guarantee Amount</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="bgAmount"
            {...register("bgAmount")}
            value={formData.interview.bgAmount}
            onChange={(e) =>
              handleInputChange("bgAmount", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="bgRefNo"> Bank Guarantee Reference Number</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="bgRefNo"
            {...register("bgRefNo")}
            value={formData.interview.bgRefNo}
            onChange={(e) =>
              handleInputChange("bgRefNo", e.target.value)
            }
          />
        </div>

        <div className="">
          <div className="flex items-center gap-5 mt-1">
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "bgFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.bgFile || extractFileName(BankUpload)
              }
              value={formData.interview.bgFile}
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