import React, { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { SawpFormSchema } from "../../../../services/Validation"
import { UpdateLoiData } from "../../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../../hooks/useFetchInterview";

export const SawpForm = () => {
  const { mergedInterviewData } = useFetchInterview();
  const { loiDetails } = UpdateLoiData();
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      sawpLtrReq:'', 
      sawpLtrRece:'' ,
      sawpFile: [],
    },
  });
    const [uploadedFileNames, setUploadedFileNames] = useState({
      sawpFile: null,
    });
    const [uploadedSawp, setUploadedSawp] = useState({
      sawpFile: null,
    });

      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
      } = useForm({
        resolver: yupResolver(SawpFormSchema),
      });

      const SawpUpload = watch("sawpFile", "");
      useEffect(() => {
          if (mergedInterviewData.length > 0) {
            const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
            setFormData({
              interview: {
                sawpLtrReq: interviewData.localMobilization.sawpLtrReq,
                sawpLtrRece: interviewData.localMobilization.sawpLtrRece,
                sawpFile: interviewData.localMobilization.sawpFile,
              },
            });
            if (interviewData.localMobilization.sawpFile) {
              setUploadedFileNames((prev) => ({
                ...prev,
                sawpFile: extractFileName(interviewData.localMobilization.sawpFile),
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
              if (type === "sawpFile") {
                await uploadDocs(file, "sawpFile", setUploadedSawp, "personName");
        
                setUploadedFileNames((prev) => ({
                  ...prev,
                  sawpFile: file.name, // Store the file name for display
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
                  sawpLtrReq: formData.interview.sawpLtrReq,
                  sawpLtrRece: formData.interview.sawpLtrRece,
                  sawpFile: uploadedSawp.sawpFile || formData.sawpFile,
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
          <label htmlFor="sawpLtrReq">Sawp Request Date</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="sawpLtrReq"
            {...register("sawpLtrReq")}
            value={formData.interview.sawpLtrReq}
            onChange={(e) =>
              handleInputChange("sawpLtrReq", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="sawpLtrRece">Sawp Received Date</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="sawpLtrRece"
            {...register("sawpLtrRece")}
            value={formData.interview.sawpLtrRece}
            onChange={(e) =>
              handleInputChange("sawpLtrRece", e.target.value)
            }
          />
        </div>

        <div className="">
          <div className="flex items-center gap-5 mt-1">
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "sawpFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.sawpFile || extractFileName(SawpUpload)
              }
              value={formData.interview.sawpFile}
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