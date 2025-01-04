import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { SawpFormSchema } from "../../../../services/Validation";
import { useCreateWPTracking } from "../../../../services/createMethod/CreateWPTracking";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";

export const SawpForm = ({ candidate }) => {
  const { interviewSchedules } = useFetchCandy();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const { interviewDetails } = UpdateInterviewData();
  const { createWPTrackingHandler } = useCreateWPTracking();
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      tempID: "",
      sawpDate: "",
      sawpRecivedDate: "",
      sawpFile: "",
      status: "",
    },
  });

  console.log(interviewSchedules, "DATA");
  
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

  const SawpUpload = watch("sawpFile");

  useEffect(() => {
    if (interviewSchedules.length > 0) {
      // Find the interviewData for the candidate
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );

      if (interviewData) {
        // Set the form data
        setFormData({
          interview: {
            sawpDate: interviewData.sawpDate,
            sawpRecivedDate: interviewData.sawpRecivedDate,
            sawpFile: interviewData.sawpFile,
            status: interviewData.IDDetails.status,
          },
        });

        // Check if sawpFile exists and update the file names
        if (interviewData.sawpFile) {
          const fileName = extractFileName(interviewData.sawpFile);
          setUploadedFileNames((prev) => ({
            ...prev,
            sawpFile: fileName,
          }));
          // console.log("Uploaded file name set:", fileName);
        }
      } else {
        console.log("No interviewData found for candidate:", candidate.tempID);
      }
    } else {
      console.log("No interview schedules available.");
    }
  }, [interviewSchedules, candidate.tempID]);

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

  //create call
  // const onSubmit = async (data) => {
  //   data.preventDefault();
  //   // Ensure form fields are populated
  //   const requestData = {
  //     reqValue: {
  //       ...formData.interview,
  //       sawpFile: uploadedSawp.sawpFile ? uploadedSawp.sawpFile : formData.interview.sawpFile,
  //       sawpDate: formData.interview.sawpDate,
  //       sawpRecivedDate: formData.interview.sawpRecivedDate,
  //       tempID: candidate.tempID,
  //     },
  //   };

  //   try {
  //     await createWPTrackingHandler(requestData); // Call the createWPTrackingHandler with form data
  //     console.log(requestData, "Form submitted successfully!");
  //   } catch (error) {
  //     console.error("Error submitting form", error);
  //     // alert("Error submitting form");
  //   }
  // };

  // const handleSubmitTwo = async (data) => {
  //   data.preventDefault();
  
  //   const selectedInterviewData = interviewSchedules.find(
  //     (data) => data.tempID === candidate?.tempID
  //   );
  //   const selectedInterviewDataStatus = interviewSchedules.find(
  //     (data) => data.IDDetails.tempID === candidate?.tempID
  //   );
  
  //   const interviewScheduleId = selectedInterviewData?.id;
  //   const interviewScheduleStatusId = selectedInterviewDataStatus.IDDetails?.id;
  
  //   if (!formData?.interview) {
  //     console.error("Error: formData.interview is undefined.");
  //     return;
  //   }
  
  //   if (!formData?.interview?.status) {
  //     console.error("Missing interview status in formData.");
  //     return;
  //   }
  
  //   try {
  //     // Logging form data and candidate
  //     console.log("Form data being submitted:", formData);
  
  //     const response = await wpTrackingDetails({
  //       WPTrackingValue: {
  //         id: interviewScheduleId,
  //         sawpDate: formData.interview.sawpDate,
  //         sawpRecivedDate: formData.interview.sawpRecivedDate,
  //         sawpFile: uploadedSawp.sawpFile || formData.interview.sawpFile,
  //         tempID: candidate.tempID,
  //       },
  //     });
  //     console.log("Response from wpTrackingDetails:", response ? response.data : "No response data");

  //     const interStatus = {
  //       id: interviewScheduleStatusId,
  //       status: formData.interview.status,
  //     };
  
  //     const interviewResponse = await interviewDetails({ InterviewValue: interStatus });
  //     console.log("Response from interviewDetails:", interviewResponse ? interviewResponse.data : "No response data");
  
  //   } catch (err) {
  //     console.error("Error occurred during API call:", err?.response?.data || err);
  //   }
  // };

   const onSubmit = async (data) => {
    data.preventDefault();
    const existingInterviewData = interviewSchedules.find(
      (data) => data.tempID === candidate.tempID
    );

    const requestData = {
      reqValue: {
        ...formData.interview,
        sawpFile: uploadedSawp.sawpFile || formData.interview.sawpFile,
        sawpDate: formData.interview.sawpDate,
        sawpRecivedDate: formData.interview.sawpRecivedDate,
        tempID: candidate.tempID,
      },
    };

    try {
      if (existingInterviewData) {
        // If data exists, update the WPTracking
        await wpTrackingDetails({
          WPTrackingValue: {
            id: existingInterviewData.id,
            sawpDate: formData.interview.sawpDate,
            sawpRecivedDate: formData.interview.sawpRecivedDate,
            sawpFile: uploadedSawp.sawpFile || formData.interview.sawpFile,
            tempID: candidate.tempID,
          },
        });

        const interviewStatus = {
          id: existingInterviewData.IDDetails.id,
          status: formData.interview.status,
        };

        await interviewDetails({ InterviewValue: interviewStatus });
        console.log("Update call");
        
      } else {
        // If no existing interview data, create new WPTracking
        await createWPTrackingHandler(requestData);
        console.log("Create call", requestData);
        
      }

      setNotification(true);
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
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
    <>
      <form onSubmit={onSubmit} className="p-5">
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="sawpDate">Sawp Request Date</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="date"
              id="sawpDate"
              {...register("sawpDate")}
              value={formData.interview.sawpDate}
              onChange={(e) => handleInputChange("sawpDate", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="sawpRecivedDate">Sawp Recieved Date</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="date"
              id="sawpRecivedDate"
              {...register("sawpRecivedDate")}
              value={formData.interview.sawpRecivedDate}
              onChange={(e) =>
                handleInputChange("sawpRecivedDate", e.target.value)
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
                fileName={
                  uploadedFileNames.sawpFile || extractFileName(SawpUpload)
                }
                value={formData.interview.sawpFile}
              />
            </div>
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              className="w-full border p-2 rounded mt-1"
              id="status"
              {...register("status")}
              value={formData.interview.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              {/* <option value="">Select Status</option> */}
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
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
      {notification && (
        <SpinLogo
          text="Candidate details updated successfully"
          notification={notification}
          path="/recrutiles/workpasstracking"
        />
      )}
    </>
  );
};
