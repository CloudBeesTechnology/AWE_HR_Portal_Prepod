import React, { useState, useEffect, useContext } from "react";
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
import { LocalMobilization } from "../../../services/createMethod/CreateLOI";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadCVEV } from "../deleteDocsRecruit/DeleteUploadCVEV";
import { DeletePopup } from "../../../utils/DeletePopup";
import { DataSupply } from "../../../utils/DataStoredContext";

const CVEVFormSchema = Yup.object().shape({
  cvecApproveDate: Yup.date().notRequired(),
  cvecFile: Yup.mixed()
    .nullable()
    .required("File is required")
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});

export const CVEVForm = ({ candidate, formattedPermissions }) => {
  const { localMobilization } = LocalMobilization();
  const { IVSSDetails } = useContext(DataSupply);
  const { mergedInterviewData } = useFetchInterview();
  const { loiDetails } = UpdateLoiData();
  const { interviewDetails } = UpdateInterviewData();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
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
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(CVEVFormSchema),
  });

  useEffect(() => {
    if (mergedInterviewData.length > 0 && candidate?.tempID) {
      const interviewData = mergedInterviewData.find(
        (data) => data.tempID === candidate.tempID
      );
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
  };

  const handleFileUpload = async (e, type) => {
    const tempID = candidate.tempID;

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
      await uploadDocString(selectedFile, type, setUploadedCVEC, tempID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [type]: selectedFile.name,
      }));
    }
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };

  const deletedStringUpload = async (fileType, fileName) => {
    try {
      const tempID = candidate.tempID;
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

      setdeleteTitle1(`${fileName}`);
      handleDeleteMsg();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const wrapUpload = (filePath) => {
    return filePath ? [{ upload: filePath, date: currentDate }] : null;
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();

    const selectedInterviewData = mergedInterviewData.find(
      (data) => data.tempID === candidate?.tempID
    );

    const selectedInterviewDataStatus = IVSSDetails.find(
      (data) => data.tempID === candidate?.tempID
    );

    const localMobilizationId = selectedInterviewData?.localMobilization?.id;
    const interviewScheduleStatusId = selectedInterviewDataStatus?.id;

    const createData = {
      cvecApproveDate: formData.interview.cvecApproveDate,
      cvecFile: isUploadingString.cvecFile
        ? JSON.stringify(wrapUpload(uploadedCVEC.cvecFile))
        : formData.interview.cvecFile,
      tempID: candidate.tempID,
    };

    try {
      if (localMobilizationId) {
        await loiDetails({
          LoiValue: {
            id: localMobilizationId,
            cvecApproveDate: formData.interview.cvecApproveDate,
            cvecFile: isUploadingString.cvecFile
              ? JSON.stringify(wrapUpload(uploadedCVEC.cvecFile))
              : formData.interview.cvecFile,
          },
        });
      } else {
        await localMobilization(createData);
      }

      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleStatusId,
          status: formData.interview.status,
        },
      });

      setNotification(true);
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

  const requiredPermissions = ["Status"];

  const access = "Recruitment";

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
            formattedPermissions={formattedPermissions}
            requiredPermissions={requiredPermissions}
            access={access}
            check={isUploadingString.cvecFile}
          />
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
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </form>
  );
};
