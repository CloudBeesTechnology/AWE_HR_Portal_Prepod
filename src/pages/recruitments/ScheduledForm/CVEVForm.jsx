import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocString } from "../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../utils/StatusDropdown";
import { SpinLogo } from "../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadCVEV } from "../deleteDocsRecruit/DeleteUploadCVEV";
// Define validation schema using Yup
const CVEVFormSchema = Yup.object().shape({
  cvecApproveDate: Yup.date().notRequired(),
  cvecFile: Yup.mixed()
    .nullable()
    .required("File is required")
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});

export const CVEVForm = ({ candidate }) => {
  const { mergedInterviewData } = useFetchInterview();
  const { loiDetails } = UpdateLoiData();
  const { interviewDetails } = UpdateInterviewData();
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      cvecApproveDate: "",
      cvecFile: [],
      status: "",
    },
  });
  const [isUploadingString, setIsUploadingString] = useState({
    cvecFile: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    cvecFile: null,
  });
  const [uploadedCVEC, setUploadedCVEC] = useState({
    cvecFile: null,
  });
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(CVEVFormSchema),
  });

  const CVECUpload = watch("cvecFile");

  // console.log("DATA 3.0", mergedInterviewData);

  useEffect(() => {
    if (mergedInterviewData.length > 0 && candidate?.tempID) {
      const interviewData = mergedInterviewData.find(
        (data) => data.tempID === candidate.tempID
      ); // Use the candidate's tempID to filter the data
      if (interviewData) {
        setFormData({
          interview: {
            cvecApproveDate: interviewData.localMobilization.cvecApproveDate,
            cvecFile: interviewData.localMobilization.cvecFile,
            status: interviewData.interviewSchedules.status,
          },
        });
      }
      if (interviewData.localMobilization.cvecFile) {
        setUploadedFileNames((prev) => ({
          ...prev,
          cvecFile: extractFileName(interviewData.localMobilization.cvecFile),
        }));
      }
    }
  }, [mergedInterviewData, candidate?.tempID]);

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      const decodedUrl = decodeURIComponent(url); // Decode URL if it has encoded characters
      const fileNameWithParams = decodedUrl.split("/").pop(); // Extract the last part after "/"
      return fileNameWithParams.split("?")[0].split(",")[0].split("#")[0]; // Remove query params, fragments, and other unnecessary parts
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
    const tempID = candidate.tempID;
    console.log(tempID);

    //      if (!tempID
    // ) {
    //        alert("Please enter the Employee ID before uploading files.");
    //        window.location.href = "/employeeInfo";
    //        return;
    //      }

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

    setValue(type, selectedFile); // Update form state with the selected file

    if (selectedFile) {
      updateUploadingString(type, true);
      await uploadDocString(selectedFile, type, setUploadedCVEC, tempID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [type]: selectedFile.name, // Dynamically store file name
      }));
    }
  };

  const deletedStringUpload = async (fileType, fileName) => {
    try {
      const tempID = candidate.tempID;
      console.log(tempID);

      //       if (!tempID
      // ) {
      //         alert("Please provide the Employee ID before deleting files.");
      //         return;
      //       }

      const isDeleted = await handleDeleteFile(fileType, fileName, tempID);
      const isDeletedArrayUploaded = await DeleteUploadCVEV(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedCVEC,
        setIsUploadingString
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

  const handleSubmitTwo = async (e) => {
    e.preventDefault();

    // Find the correct interview data using the tempID of the selected candidate
    const selectedInterviewData = mergedInterviewData.find(
      (data) => data.tempID === candidate?.tempID
    );

    if (!selectedInterviewData) {
      console.error("No interview data found for the selected candidate.");
      alert("No interview data found for the selected candidate.");
      return;
    }
    const localMobilizationId = selectedInterviewData?.localMobilization?.id;
    const interviewScheduleId = selectedInterviewData.interviewSchedules.id;

    if (!localMobilizationId) {
      console.error("Interview schedule ID not found.");
      alert("Interview schedule ID not found.");
      return;
    }

    try {
      await loiDetails({
        LoiValue: {
          id: localMobilizationId,
          cvecApproveDate: formData.interview.cvecApproveDate,
          cvecFile: uploadedCVEC.cvecFile,
        },
      });

      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleId, // Dynamically use the correct id
          status: formData.interview.status,
        },
      });
      // console.log("Data stored successfully...");
      setNotification(true);
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
          <label htmlFor="cvecApproveDate">Approval Date</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="cvecApproveDate"
            {...register("cvecApproveDate")}
            value={formData.interview.cvecApproveDate}
            onChange={(e) =>
              handleInputChange("cvecApproveDate", e.target.value)
            }
          />
        </div>

        <div className="">
          <div className="">
            <FileUploadField
              label="Upload File"
              register={register}
              fileKey="cvecFile"
              handleFileUpload={handleFileUpload}
              uploadedFileNames={uploadedFileNames}
              deletedStringUpload={deletedStringUpload}
              isUploadingString={isUploadingString}
              error={errors.cvecFile}
              className="p-4"
            />
          </div>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            className="w-full border p-2 rounded mt-1 h-[44px]"
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
          className="py-2 px-12 font-medium rounded shadow-lg bg-yellow hover:bg-yellow"
        >
          Submit
        </button>
      </div>
      {notification && (
        <SpinLogo
          text="CVEV Updated Successfully"
          notification={notification}
          path="/recrutiles/status"
        />
      )}
    </form>
  );
};
