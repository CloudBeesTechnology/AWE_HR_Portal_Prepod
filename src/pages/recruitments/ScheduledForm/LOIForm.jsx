import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { LocalMobilization } from "../../../services/createMethod/CreateLOI"; // Import the hook
import { uploadDocString } from "../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../utils/StatusDropdown";
import { SpinLogo } from "../../../utils/SpinLogo";
import { DataSupply } from "../../../utils/DataStoredContext";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadLOI } from "../deleteDocsRecruit/DeleteUploadLOI";
export const LOIForm = ({ candidate }) => {
  
  // Ensure candidate is passed as prop
  const { localMobilization, isLoading, error } =
    LocalMobilization();
  const { loiDetails } = UpdateLoiData();
  const { interviewDetails } = UpdateInterviewData();
  const { mergedInterviewData } = useFetchInterview();
  const [notification, setNotification] = useState(false);

    const [isUploadingString, setIsUploadingString] = useState({
      loiFile: false,
    });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    loiFile: null,
  });
  
  const [uploadedLOI, setUploadedLOI] = useState({
    loiFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    interview: {
      loiIssueDate: "",
      loiAcceptDate: "",
      loiDeclineDate: "",
      declineReason: "",
      loiFile: "",
      tempID: "",
      status: "",
    },
  });


  const LOIFile = watch("loiFile", "");
  
  const extractFileName = (url) => {
  if (typeof url === "string" && url) {
    const decodedUrl = decodeURIComponent(url); 
    const fileNameWithParams = decodedUrl.split("/").pop(); 
    return fileNameWithParams.split("?")[0].split(",")[0].split("#")[0]; 
  }
  return "";
};

   const updateUploadingString = (type, value) => {
     setIsUploadingString((prev) => ({
       ...prev,
       [type]: value,
     }));
     // console.log(value);
   };
 
   const handleFileUpload = async (e, type) => {
     const tempID= candidate.tempID;
     
     if (!tempID
) {
       alert("Please enter the Employee ID before uploading files.");
       window.location.href = "/employeeInfo";
       return;
     }
 
     let selectedFile = e.target.files[0];
 
     // Allowed file types
     const allowedTypes = [
       "application/pdf",
       "image/jpeg",
       "image/png",
       "image/jpg",
     ];
 
     if (!allowedTypes.includes(selectedFile.type)) {
       alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
       return;
     }
 
     setValue(type, selectedFile); 
 
     if (selectedFile) {
       updateUploadingString(type, true);
       await uploadDocString(selectedFile, type, setUploadedLOI, tempID);
       setUploadedFileNames((prev) => ({
         ...prev,
         [type]: selectedFile.name, 
       }));
     }
   };

 const deletedStringUpload = async (fileType, fileName) => {
    try {
      const tempID= candidate.tempID;

      const isDeleted = await handleDeleteFile(
        fileType,
        fileName,
        tempID

      );
      const isDeletedArrayUploaded = await DeleteUploadLOI(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedLOI,
        setIsUploadingString,
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      // console.log(`Deleted "${fileName}". Remaining files:`);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  // Handle form submission for updating an existing LOI
  const handleSubmitTwo = async (e) => {
    e.preventDefault();

    // Check if mergedInterviewData is available for the candidate
    const selectedInterviewData = mergedInterviewData.find(
      (data) => data.tempID === candidate?.tempID
    );

    const localMobilizationId = selectedInterviewData.localMobilization.id;
    const interviewScheduleId = selectedInterviewData.interviewSchedules.id;

    const formattedData = {
      id: localMobilizationId,
      loiIssueDate: formData.interview.loiIssueDate,
      loiAcceptDate: formData.interview.loiAcceptDate,
      loiDeclineDate: formData.interview.loiDeclineDate,
      declineReason: formData.interview.declineReason,
      loiFile: uploadedLOI.loiFile,
      tempID: candidate.tempID,
    };
    
    const interStatus = {
      id: interviewScheduleId, 
      department: formData.interview.department,
      otherDepartment: formData.interview.otherDepartment,
      status: formData.interview.status,
    };

    try {
      // Call the update LOI API function
      await loiDetails({ LoiValue: formattedData });
      await interviewDetails({ InterviewValue: interStatus });
      setNotification(true);
      // console.log("status", interStatus);
      // console.log("Data updated successfully...");
    } catch (error) {
      console.error("Error updating LOI:", error);
      alert("Failed to update LOI. Please try again.");
    }
  };

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData.find(
        (data) => data.tempID === candidate.tempID
      ); // Assuming we want to take the first item
      if (interviewData) {
        setFormData({
          interview: {
            loiIssueDate: interviewData.localMobilization.loiIssueDate,
            loiAcceptDate: interviewData.localMobilization.loiAcceptDate,
            loiDeclineDate: interviewData.localMobilization.loiDeclineDate,
            declineReason: interviewData.localMobilization.declineReason,
            loiFile: interviewData.localMobilization.loiFile,
            status: interviewData.interviewSchedules.status,
            tempID: interviewData.tempID,
          },
        });
        if (interviewData.localMobilization.loiFile) {
          setUploadedFileNames((prev) => ({
            ...prev,
            loiFile: extractFileName(interviewData.localMobilization.loiFile),
          }));
        }
      }
    }
  }, [mergedInterviewData, candidate.tempID]);
  // console.log(candidate);

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
    <form>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="loiIssueDate">Date of Issue</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="loiIssueDate"
            {...register("loiIssueDate", {
              required: "Date of Issue is required",
            })}
            value={formData.interview.loiIssueDate}
            onChange={(e) => handleInputChange("loiIssueDate", e.target.value)}
          />
          {errors.loiIssueDate && (
            <p className="text-[red] text-xs">{errors.loiIssueDate.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="loiAcceptDate">Date of Acceptance</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="loiAcceptDate"
            {...register("loiAcceptDate")}
            value={formData.interview.loiAcceptDate}
            onChange={(e) => handleInputChange("loiAcceptDate", e.target.value)}
          />
          {errors.loiAcceptDate && (
            <p className="text-[red] text-xs">{errors.loiAcceptDate.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="loiDeclineDate">Date of Decline</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="loiDeclineDate"
            {...register("loiDeclineDate")}
            value={formData.interview.loiDeclineDate}
            onChange={(e) =>
              handleInputChange("loiDeclineDate", e.target.value)
            }
          />
          {errors.loiDeclineDate && (
            <p className="text-[red] text-xs">
              {errors.loiDeclineDate.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="declineReason">Decline Reason</label>
          <textarea
            className="w-full border p-2 rounded mt-1 h-[44px]"
            id="declineReason"
            rows="2"
            {...register("declineReason")}
            value={formData.interview.declineReason}
            onChange={(e) => handleInputChange("declineReason", e.target.value)}
          ></textarea>
          {errors.declineReason && (
            <p className="text-[red] text-xs">{errors.declineReason.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            className="w-full border p-2 rounded mt-1 outline-none h-[44px]"
            id="status"
            {...register("status")}
            value={formData.interview.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            {statusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="">
            {/* LOI File Upload */}
            <div>
              <FileUploadField
                label="Upload File"
                // label="Induction Form"
                register={register} 
                fileKey="loiFile"
                handleFileUpload={handleFileUpload}
                uploadedFileNames={uploadedFileNames}
                deletedStringUpload={deletedStringUpload}
                isUploadingString={isUploadingString}
                error={errors.loiFile}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="center mt-5">
        <button
          type="submit"
          className="py-2 px-12 font-medium rounded shadow-lg bg-yellow hover:bg-yellow"
          disabled={isLoading}
          onClick={handleSubmitTwo}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
       
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
      {notification && (
        <SpinLogo
          text="LOI Updated Successfully"
          notification={notification}
          path="/recrutiles/status"
        />
      )}
    </form>
  );
};
