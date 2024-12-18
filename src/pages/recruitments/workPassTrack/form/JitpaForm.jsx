import React, { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { JitpaFormSchema } from '../../../../services/Validation';
import { UpdateLoiData } from "../../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../../hooks/useFetchInterview";

export const JitpaForm = () => {
  
    const { mergedInterviewData } = useFetchInterview();
    const { loiDetails } = UpdateLoiData();
  
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      jpTbaPurchase:'', 
      jpEndorsement:'' ,
      jitpaValid:'',
      jpAmount: '',
      jitpaFile: [],
    },
  });
    const [uploadedFileNames, setUploadedFileNames] = useState({
      jitpaFile: null,
    });
    const [uploadedJitpa, setUploadedJitpa] = useState({
      jitpaFile: null,
    });

      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
      } = useForm({
        resolver: yupResolver(JitpaFormSchema),
      });

      const JitpaUpload = watch("jitpaFile", "");

           useEffect(() => {
                if (mergedInterviewData.length > 0) {
                  const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
                  setFormData({
                    interview: {
                      jpTbaPurchase: interviewData.localMobilization.jpTbaPurchase,
                      jpEndorsement: interviewData.localMobilization. jpEndorsement,
                      jitpaValid: interviewData.localMobilization.jitpaValid,
                      jpAmount: interviewData.localMobilization.jpAmount,
                      jitpaFile: interviewData.localMobilization.jitpaFile,
                    },
                  });
                  if (interviewData.localMobilization.jitpaFile) {
                    setUploadedFileNames((prev) => ({
                      ...prev,
                      jitpaFile: extractFileName(interviewData.localMobilization.jitpaFile),
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
                  if (type === "jitpaFile") {
                    await uploadDocs(file, "jitpaFile", setUploadedJitpa, "personName");
            
                    setUploadedFileNames((prev) => ({
                      ...prev,
                      jitpaFile: file.name, // Store the file name for display
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
                      jpTbaPurchase: formData.interview.jpTbaPurchase,
                       jpEndorsement: formData.interview. jpEndorsement,
                      jitpaValid: formData.interview.jitpaValid,
                      jpAmount: formData.interview.jpAmount,
                      jitpaFile: uploadedJitpa.jitpaFile || formData.jitpaFile,
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
          <label htmlFor="jpTbaPurchase">Date of Purchase</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="jpTbaPurchase"
            {...register("jpTbaPurchase")}
            value={formData.interview.jpTbaPurchase}
            onChange={(e) =>
              handleInputChange("jpTbaPurchase", e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="jpEndorsement">Date of Endrosement</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="jpEndorsement"
            {...register("jpEndorsement")}
            value={formData.interview.jpEndorsement}
            onChange={(e) =>
              handleInputChange("jpEndorsement", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="jitpaValid">Valid Until</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="jitpaValid"
            {...register("jitpaValid")}
            value={formData.interview.jitpaValid}
            onChange={(e) =>
              handleInputChange("jitpaValid", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="jpAmount">JITPA Amount</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="jpAmount"
            {...register("jpAmount")}
            value={formData.interview.jpAmount}
            onChange={(e) =>
              handleInputChange("jpAmount", e.target.value)
            }
          />
        </div>
        <div className="">
          <div className="flex items-center gap-5 mt-1">
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "jitpaFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.jitpaFile || extractFileName(JitpaUpload)
              }
              value={formData.interview.jitpaFile}
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