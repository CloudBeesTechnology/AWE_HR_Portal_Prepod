import React, { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { NonLocalMOBFormSchema } from '../../../../services/Validation';
import { UpdateLoiData } from "../../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../../hooks/useFetchInterview";

export const NonLocalMobilizForm = () => {
  const { mergedInterviewData } = useFetchInterview();
  const { loiDetails } = UpdateLoiData();

  const [formData, setFormData] = useState({
    interview: {
      id: "",
      mobSignDate:'', 
      agent: '',
      remarkNLMob:'',
      mobFile: [],
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
          if (mergedInterviewData.length > 0) {
            const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
            setFormData({
              interview: {
                mobSignDate: interviewData.localMobilization.mobSignDate,
                agent: interviewData.localMobilization.agent,
                remarkNLMob: interviewData.localMobilization.remarkNLMob,
                mobFile: interviewData.localMobilization.mobFile,
              },
            });
            if (interviewData.localMobilization.mobFile) {
              setUploadedFileNames((prev) => ({
                ...prev,
                mobFile: extractFileName(interviewData.localMobilization.mobFile),
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
            if (type === "mobFile") {
              await uploadDocs(file, "mobFile", setUploadedMobiliz, "personName");
      
              setUploadedFileNames((prev) => ({
                ...prev,
                mobFile: file.name, // Store the file name for display
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
                mobSignDate: formData.interview.mobSignDate,
                agent: formData.interview.agent,
                remarkNLMob: formData.interview.remarkNLMob,
                mobFile: uploadedMobiliz.mobFile || formData.mobFile,
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
          <label htmlFor="mobSignDate">Date of Mobilization</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="mobSignDate"
            {...register("mobSignDate")}
            value={formData.interview.mobSignDate}
            onChange={(e) =>
              handleInputChange("mobSignDate", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="agentName">Agent Name</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="agentName"
            {...register("agentName")}
            value={formData.interview.agentName}
            onChange={(e) =>
              handleInputChange("agentName", e.target.value)
            }
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
            onChange={(e) =>
              handleInputChange("remarkNLMob", e.target.value)
            }
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