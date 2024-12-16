// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { LocalMobilization } from "../../../services/createMethod/CreateLOI"; // Import the hook
// import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
// import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
// import { useFetchInterview } from "../../../hooks/useFetchInterview";
// import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";

// export const LOIForm = (candidate) => {
//   const { localMobilization, isLoading, notification, error } = LocalMobilization(); // Use the custom hook
//     const {loiDetails} = UpdateLoiData();
//   const { mergedInterviewData } = useFetchInterview();
//   const [uploadedFileNames, setUploadedFileNames] = useState({
//     loiFile: null,
//   });
//   const [uploadedLOI, setUploadedLOI] = useState({
//     loiFile: null,
//   });

//   const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
//     const [formData, setFormData] = useState({
//       interview: {
//         loiIssueDate: "",
//         loiAcceptDate: "",
//         loiDeclineDate: "",
//         declineReason: "",
//         tempID: "",

//       },
//     });

//   const LOIFile = watch("loiFile", "");

//   const extractFileName = (url) => {
//     if (typeof url === "string" && url) {
//       return url.split("/").pop(); // Extract the file name from URL
//     }
//     return "";
//   };

//     const handleFileChange = async (e, type) => {

//       const file = e.target.files[0];
//       setValue(type, file); // Set file value for validation
//       if (file) {
//         if (type === "loiFile") {
//           await uploadDocs(file, "loiFile", setUploadedLOI, "personName");

//           setUploadedFileNames((prev) => ({
//             ...prev,
//             loiFile: file.name, // Store the file name for display
//           }));
//         }
//       }
//     };

//   // Handle form submission
//   const onSubmit = async (data) => {

//     const selectedInterviewData = mergedInterviewData.find(
//       (data) => data.tempID === candidate?.tempID
//     );

//     const formattedData = {
//       loiIssueDate: data.loiIssueDate,
//       loiAcceptDate: data.loiAcceptDate,
//       loiDeclineDate: data.loiDeclineDate,
//       declineReason: data.declineReason,
//       loiFile: uploadedLOI.loiFile, // Add the uploaded file's URL or reference
//       tempID: candidate.tempID,
//     };

//     // Call the createLOI function from the custom hook
//     try {
//       await localMobilization(formattedData);
//     } catch (err) {
//       console.error("LOI creation failed:", err);
//     }
//   };

//   const handleSubmitTwo = async (e) => {
//     e.preventDefault();

//     const localMobilizationId = mergedInterviewData[0]?.localMobilization.id;

//     try {
//       await loiDetails({
//         LoiValue: {
//           id: localMobilizationId,
//           loiIssueDate: formData.interview.loiIssueDate,
//           loiAcceptDate: formData.interview.loiAcceptDate,
//           loiDeclineDate: formData.interview.loiDeclineDate,
//           declineReason: formData.interview.declineReason,
//           loiFile: uploadedLOI.loiFile,
//           tempID: candidate.tempID,
//         },
//       });
//       console.log("Data stored successfully...");
//       // setNotification(true);
//     } catch (error) {
//       console.error("Error submitting interview details:", error);
//       alert("Failed to update interview details. Please try again.");
//     }
//   };
// console.log(candidate)

//   useEffect(() => {
//     if (mergedInterviewData.length > 0) {
//       const interviewData = mergedInterviewData.find((data) => data.tempID === candidate.tempID); // Assuming we want to take the first item
//       setFormData({
//         interview: {
//           loiIssueDate: interviewData.localMobilization.loiIssueDate,
//           loiAcceptDate: interviewData.localMobilization.loiAcceptDate,
//           loiDeclineDate: interviewData.localMobilization.loiDeclineDate,
//           declineReason: interviewData.localMobilization.declineReason,
//           loiFile: interviewData.localMobilization.loiFile,
//           tempID: interviewData.tempID
//         },
//       });
//       if (interviewData.localMobilization.loiFile) {
//         setUploadedFileNames((prev) => ({
//           ...prev,
//           loiFile: extractFileName(interviewData.localMobilization.loiFile),
//         }));
//       }
//     }
//   }, [mergedInterviewData, candidate.tempID]);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       interview: {
//         ...prev.interview,
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <form>
//       <div className="grid grid-cols-2 gap-5 mt-5">
//         <div>
//           <label htmlFor="loiIssueDate">Date of Issue</label>
//           <input
//             className="w-full border p-2 rounded mt-1"
//             type="date"
//             id="loiIssueDate"
//             {...register("loiIssueDate", { required: "Date of Issue is required" })}
//             value={formData.interview.loiIssueDate}
//             onChange={(e) => handleInputChange("loiIssueDate", e.target.value)}
//           />
//           {errors.loiIssueDate && (
//             <p className="text-[red] text-xs">{errors.loiIssueDate.message}</p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="loiAcceptDate">Date of Acceptance</label>
//           <input
//             className="w-full border p-2 rounded mt-1"
//             type="date"
//             id="loiAcceptDate"
//             {...register("loiAcceptDate")}
//             value={formData.interview.loiAcceptDate}
//             onChange={(e) => handleInputChange("loiAcceptDate", e.target.value)}

//           />
//           {errors.loiAcceptDate && (
//             <p className="text-[red] text-xs">{errors.loiAcceptDate.message}</p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="loiDeclineDate">Date of Decline</label>
//           <input
//             className="w-full border p-2 rounded mt-1"
//             type="date"
//             id="loiDeclineDate"
//             {...register("loiDeclineDate")}
//             value={formData.interview.loiDeclineDate}
//             onChange={(e) => handleInputChange("loiDeclineDate", e.target.value)}
//           />
//           {errors.loiDeclineDate && (
//             <p className="text-[red] text-xs">{errors.loiDeclineDate.message}</p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="declineReason">Decline Reason</label>
//           <textarea
//             className="w-full border p-2 rounded mt-1"
//             id="declineReason"
//             rows="2"
//             {...register("declineReason")}
//             value={formData.interview.declineReason}
//             onChange={(e) => handleInputChange("declineReason", e.target.value)}
//           ></textarea>
//           {errors.declineReason && (
//             <p className="text-[red] text-xs">{errors.declineReason.message}</p>
//           )}
//         </div>
//         <div className="">
//           <label className="text_size_6">Choose file</label>
//           <div className="flex items-center justify-between mt-3 mb-5 gap-5">
//             {/* LOI File Upload */}
//             <div>
//               {/* <label className="flex items-center px-3 py-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
//                 Upload LOI */}
//                 <FileUploadField

//                    label="Upload File"
//                    onChangeFunc={(e) => handleFileChange(e, "loiFile")}
//                   {...register("loiFile")}
//                   accept="application/pdf"
//                   onChange={handleFileChange}
//                   className="hidden"
//                   fileName={uploadedFileNames.loiFile || extractFileName(LOIFile)}
//                   value={formData.interview.loiFile}

//                   // accept="application/pdf"
//                 />
//                 {/* <span className="ml-2">
//                   <GoUpload />
//                 </span>
//               </label> */}
//               {/* Display uploaded file name */}

//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="center mt-5">
//         <button
//           type="submit"
//           className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow"
//           disabled={isLoading}
//           onClick={onSubmit}
//         >
//           {isLoading ? "Submitting..." : "Submit"}
//         </button>

//         <button
//           type="submit"
//           className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow"
//           disabled={isLoading}
//           onClick={handleSubmitTwo}
//         >

//           {isLoading ? "Updating..." : "Update"}
//         </button>

//         {/* Success notification */}
//         {notification && <p className="text-green-500">LOI created successfully!</p>}

//         {/* Error notification */}
//         {error && <p className="text-red-500">{error.message}</p>}
//       </div>
//     </form>
//   );
// };
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LocalMobilization } from "../../../services/createMethod/CreateLOI"; // Import the hook
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";

export const LOIForm = ({ candidate }) => {
  // Ensure candidate is passed as prop
  const { localMobilization, isLoading, notification, error } =
    LocalMobilization(); // Use the custom hook
  const { loiDetails } = UpdateLoiData();
  const { mergedInterviewData } = useFetchInterview();
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
    },
  });

  const LOIFile = watch("loiFile", "");

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
      if (type === "loiFile") {
        await uploadDocs(file, "loiFile", setUploadedLOI, "personName");
        setUploadedFileNames((prev) => ({
          ...prev,
          loiFile: file.name, // Store the file name for display
        }));
      }
    }
  };

  // Handle form submission for creating a new LOI
  const onSubmit = async (data) => {
    const selectedInterviewData = mergedInterviewData.find(
      (data) => data.tempID === candidate?.tempID
    );

    const formattedData = {
      loiIssueDate: data.loiIssueDate,
      loiAcceptDate: data.loiAcceptDate,
      loiDeclineDate: data.loiDeclineDate,
      declineReason: data.declineReason,
      loiFile: uploadedLOI.loiFile,
      tempID: candidate.tempID,
    };

    // Call the createLOI function from the custom hook
    try {
      await localMobilization(formattedData);
    } catch (err) {
      console.error("LOI creation failed:", err);
    }
  };

  // Handle form submission for updating an existing LOI
  const handleSubmitTwo = async (e) => {
    e.preventDefault();

    // Check if mergedInterviewData is available for the candidate
    const selectedInterviewData = mergedInterviewData.find(
      (data) => data.tempID === candidate?.tempID
    );

    // Ensure the candidate and their localMobilization details exist
    if (!selectedInterviewData || !selectedInterviewData.localMobilization) {
      alert("Candidate or LOI data not found.");
      return;
    }

    const localMobilizationId = selectedInterviewData.localMobilization.id;

    const formattedData = {
      id: localMobilizationId,
      loiIssueDate: formData.interview.loiIssueDate,
      loiAcceptDate: formData.interview.loiAcceptDate,
      loiDeclineDate: formData.interview.loiDeclineDate,
      declineReason: formData.interview.declineReason,
      loiFile: uploadedLOI.loiFile || formData.interview.loiFile, // Use the uploaded file if available
      tempID: candidate.tempID,
    };

    try {
      // Call the update LOI API function
      await loiDetails({ LoiValue: formattedData });
      console.log("Data updated successfully...");
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
            className="w-full border p-2 rounded mt-1"
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
          <div className="flex items-center justify-between mt-3 mb-5 gap-5">
            {/* LOI File Upload */}
            <div>
              <FileUploadField
                label="Upload File"
                onChangeFunc={(e) => handleFileChange(e, "loiFile")}
                {...register("loiFile")}
                accept="application/pdf"
                className="hidden"
                fileName={uploadedFileNames.loiFile || extractFileName(LOIFile)}
                value={formData.interview.loiFile}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="center mt-5">
        <button
          type="submit"
          className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow"
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        <button
          type="submit"
          className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow"
          disabled={isLoading}
          onClick={handleSubmitTwo} // Handles updating the existing LOI
        >
          {isLoading ? "Updating..." : "Update"}
        </button>

        {/* Success notification */}
        {notification && (
          <p className="text-green-500">LOI created successfully!</p>
        )}

        {/* Error notification */}
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </form>
  );
};
