import React, { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { DoeFormSchema } from '../../../../services/Validation';
import { UpdateLoiData } from "../../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../../hooks/useFetchInterview";


export const DoeForm = () => {

  const { mergedInterviewData } = useFetchInterview();
  const { loiDetails } = UpdateLoiData();
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      doeSubmit:'', 
      doeApproval:'' ,
      doeValid:'',
      doeRefNo:'',
      doeFile: [],
    },
  });
    const [uploadedFileNames, setUploadedFileNames] = useState({
      doeFile: null,
    });
    const [uploadedDoe, setUploadedDoe] = useState({
      doeFile: null,
    });

      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
      } = useForm({
        resolver: yupResolver(DoeFormSchema),
      });

      const DoeUpload = watch("doeFile", "");
      useEffect(() => {
          if (mergedInterviewData.length > 0) {
            const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
            setFormData({
              interview: {
                doeSubmit: interviewData.localMobilization.doeSubmit,
                doeApproval: interviewData.localMobilization.doeApproval,
                doeValid: interviewData.localMobilization.doeValid,
                doeRefNo: interviewData.localMobilization.doeRefNo,
                doeFile: interviewData.localMobilization.doeFile,
              },
            });
            if (interviewData.localMobilization.doeFile) {
              setUploadedFileNames((prev) => ({
                ...prev,
                doeFile: extractFileName(interviewData.localMobilization.doeFile),
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
            if (type === "doeFile") {
              await uploadDocs(file, "doeFile", setUploadedDoe, "personName");
      
              setUploadedFileNames((prev) => ({
                ...prev,
                doeFile: file.name, // Store the file name for display
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
                doeSubmit: formData.interview.doeSubmit,
                doeApproval: formData.interview.doeApproval,
                doeValid: formData.interview.doeValid,
                doeRefNo: formData.interview.doeRefNo,
                doeFile: uploadedDoe.doeFile || formData.doeFile,
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
          <label htmlFor="doeSubmit">Date of Submission</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="doeSubmit"
            {...register("doeSubmit")}
            value={formData.interview.doeSubmit}
            onChange={(e) =>
              handleInputChange("doeSubmit", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="doeApproval">Date of Approval</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="doeApproval"
            {...register("doeApproval")}
            value={formData.interview.doeApproval}
            onChange={(e) =>
              handleInputChange("doeApproval", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="doeValid">Valid Until</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="doeValid"
            {...register("doeValid")}
            value={formData.interview.doeValid}
            onChange={(e) =>
              handleInputChange("doeValid", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="doeRefNo">DOE Reference Number</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="doeRefNo"
            {...register("doeRefNo")}
            value={formData.interview.doeRefNo}
            onChange={(e) =>
              handleInputChange("doeRefNo", e.target.value)
            }
          />
        </div>

        <div className="">
          <div className="flex items-center gap-5 mt-1">
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "doeFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.doeFile || extractFileName(DoeUpload)
              }
              value={formData.interview.doeFile}
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