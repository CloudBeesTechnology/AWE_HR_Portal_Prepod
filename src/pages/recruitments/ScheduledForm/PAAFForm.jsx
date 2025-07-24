import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { uploadDocString } from "../../../services/uploadsDocsS3/UploadDocs";
import { UpdateLoiData } from "../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { LocalMobilization } from "../../../services/createMethod/CreateLOI";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../utils/StatusDropdown";
import { SpinLogo } from "../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadPAAF } from "../deleteDocsRecruit/DeleteUploadPAAF";
import { DeletePopup } from "../../../utils/DeletePopup";
import { DataSupply } from "../../../utils/DataStoredContext";

const PAAFFormSchema = Yup.object().shape({
  paafApproveDate: Yup.date().notRequired(),
  paafFile: Yup.mixed()
    .nullable()
    .required("File is required")
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});

export const PAAFForm = ({ candidate, formattedPermissions }) => {
  const { localMobilization } = LocalMobilization();
  const { IVSSDetails } = useContext(DataSupply);
  const { loiDetails } = UpdateLoiData();
  const { mergedInterviewData } = useFetchInterview();
  const { interviewDetails } = UpdateInterviewData();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      paafApproveDate: "",
      paafFile: "",
      status: "",
    },
  });
  const [isUploadingString, setIsUploadingString] = useState({
    paafFile: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    paafFile: null,
  });
  const [uploadedPAAF, setUploadedPAAF] = useState({
    paafFile: null,
  });
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(PAAFFormSchema),
  });

  const EMPID = localStorage.getItem("userID");
  const TODAY = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData.find(
        (data) => data.tempID === candidate.tempID
      );
      if (interviewData) {
        setFormData({
          interview: {
            paafApproveDate: interviewData.localMobilization.paafApproveDate,
            paafFile: interviewData.localMobilization.paafFile,
            status: interviewData.interviewSchedules.status,
          },
        });
        if (interviewData.localMobilization.paafFile) {
          setUploadedFileNames((prev) => ({
            ...prev,
            paafFile: extractFileName(interviewData.localMobilization.paafFile),
          }));
        }
      }
    }
  }, [mergedInterviewData, candidate.tempID]);

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
  };

  const handleFileUpload = async (e, type) => {
    const tempID = candidate.tempID;

    if (!tempID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/employeeInfo";
      return;
    }

    let selectedFile = e.target.files[0];

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
      await uploadDocString(selectedFile, type, setUploadedPAAF, tempID);
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

      if (!tempID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(fileType, fileName, tempID);
      const isDeletedArrayUploaded = await DeleteUploadPAAF(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedPAAF,
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

    const localMobilizationId = selectedInterviewData?.localMobilization.id;
    const interviewScheduleStatusId = selectedInterviewDataStatus?.id;

    const localUpdatedByData = selectedInterviewData?.localMobilization;
    const intUpdatedByData = selectedInterviewData?.interviewSchedules;

    const loiPreviousUpdates = localUpdatedByData?.updatedBy
      ? JSON.parse(localUpdatedByData?.updatedBy)
      : [];

    const loiUpdatedBy = [
      ...loiPreviousUpdates,
      { userID: EMPID, date: TODAY },
    ];

    const loiOrderedUpdatedBy = loiUpdatedBy.map((entry) => ({
      userID: entry.userID,
      date: entry.date,
    }));

    const intPreviousUpdates = intUpdatedByData?.updatedBy
      ? JSON.parse(intUpdatedByData?.updatedBy)
      : [];

    const intUpdatedBy = [
      ...intPreviousUpdates,
      { userID: EMPID, date: TODAY },
    ];

    const intOrderedUpdatedBy = intUpdatedBy.map((entry) => ({
      userID: entry.userID,
      date: entry.date,
    }));

    const createData = {
      paafApproveDate: formData.interview.paafApproveDate,
      paafFile: isUploadingString.paafFile
        ? JSON.stringify(wrapUpload(uploadedPAAF.paafFile))
        : formData.interview.paafFile,
      tempID: candidate.tempID,
      createdBy: JSON.stringify([{ userID: EMPID, date: TODAY }]),
    };

    try {
      if (localMobilizationId) {
        await loiDetails({
          LoiValue: {
            id: localMobilizationId,
            paafApproveDate: formData.interview.paafApproveDate,
            paafFile: isUploadingString.paafFile
              ? JSON.stringify(wrapUpload(uploadedPAAF.paafFile))
              : formData.interview.paafFile,
            updatedBy: JSON.stringify(loiOrderedUpdatedBy),
          },
        });
      } else {
        await localMobilization(createData);
      }

      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleStatusId,
          status: formData.interview.status,
          updatedBy: JSON.stringify(intOrderedUpdatedBy),
        },
      });

      setNotification(true);
    } catch (error) {
      // console.error("Error submitting interview details:", error);
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

  const requiredPermissions = ["Status"];

  const access = "Recruitment";

  return (
    <form onSubmit={handleSubmitTwo} className="p-5">
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="paafApproveDate">Approval Date</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="paafApproveDate"
            {...register("paafApproveDate")}
            value={formData.interview.paafApproveDate}
            onChange={(e) =>
              handleInputChange("paafApproveDate", e.target.value)
            }
          />
        </div>

        <div className="">
          <div className="">
            <FileUploadField
              label="Upload File"
              register={register}
              fileKey="paafFile"
              handleFileUpload={handleFileUpload}
              uploadedFileNames={uploadedFileNames}
              deletedStringUpload={deletedStringUpload}
              isUploadingString={isUploadingString}
              error={errors.paafFile}
              formattedPermissions={formattedPermissions}
              requiredPermissions={requiredPermissions}
              access={access}
              check={isUploadingString.paafFile}
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
          text="PAAF Updated Successfully"
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
