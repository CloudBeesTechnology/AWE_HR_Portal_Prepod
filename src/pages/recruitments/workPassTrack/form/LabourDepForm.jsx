import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocString } from "../../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { LabourDepFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadLabourDep } from "../deleteUpload/DeleteUploadLabourDep";
import { useDeleteAccess } from "../../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../../utils/DeletePopup";
import { useCreateWPTracking } from "../../../../services/createMethod/CreateWPTracking";
import { DataSupply } from "../../../../utils/DataStoredContext";

export const LabourDepForm = ({ candidate }) => {
  const { IVSSDetails } = useContext(DataSupply);
  const { formattedPermissions } = useDeleteAccess();
  const { interviewSchedules } = useFetchCandy();
  const { interviewDetails } = UpdateInterviewData();
  const { createWPTrackingHandler } = useCreateWPTracking();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);

  const [formData, setFormData] = useState({
    interview: {
      id: "",
      lbrDepoNum: "",
      lbrEndroseDate: "",
      lbrDepoAmount: "",
      lbrFile: "",
      status: "",
    },
  });
  const [isUploadingString, setIsUploadingString] = useState({
    lbrFile: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    lbrFile: null,
  });
  const [uploadedLabDep, setUploadedLabDep] = useState({
    lbrFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(LabourDepFormSchema),
  });

  const DepositUpload = watch("lbrFile");

  useEffect(() => {
    if (interviewSchedules.length > 0) {
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );
      if (interviewData) {
        setFormData({
          interview: {
            lbrDepoNum: interviewData.lbrDepoNum,
            lbrEndroseDate: interviewData.lbrEndroseDate,
            lbrDepoAmount: interviewData.lbrDepoAmount,
            lbrFile: interviewData.lbrFile,
            status: interviewData.status,
            status: interviewData.IDDetails.status,
          },
        });

        if (interviewData.lbrFile) {
          const fileName = extractFileName(interviewData.lbrFile);
          setUploadedFileNames((prev) => ({
            ...prev,
            lbrFile: fileName,
          }));
          // console.log("Uploaded file name set:", fileName);
        }
      }
    }
  }, [interviewSchedules, candidate.tempID]);

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
      await uploadDocString(selectedFile, type, setUploadedLabDep, tempID);
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
      const isDeletedArrayUploaded = await DeleteUploadLabourDep(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedLabDep,
        setIsUploadingString
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      // console.log(`Deleted "${fileName}". Remaining files:`);
      setdeleteTitle1(`${fileName}`);
      handleDeleteMsg();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const handleSubmitTwo = async (data) => {
    data.preventDefault();

    const selectedInterviewData = interviewSchedules.find(
      (data) => data.tempID === candidate?.tempID
    );

    const selectedInterviewDataStatus = IVSSDetails.find(
      (data) => data.tempID === candidate?.tempID
    );

    const interviewScheduleId = selectedInterviewData?.id;
    const interviewScheduleStatusId = selectedInterviewDataStatus?.id;

    if (!formData?.interview) {
      console.error("Error: formData.interview is undefined.");
      return;
    }

    if (!interviewScheduleId) {
      console.error("Error: No interview schedule found for this candidate.");
      return;
    }

    const wpTrackingData = {
      tempID: candidate.tempID,
      lbrDepoNum: formData.interview.lbrDepoNum,
      lbrEndroseDate: formData.interview.lbrEndroseDate,
      lbrDepoAmount: formData.interview.lbrDepoAmount,
      lbrFile: uploadedLabDep.lbrFile,
    };

    let response;

    try {
      if (interviewScheduleId) {
        response = await wpTrackingDetails({
          WPTrackingValue: {
            id: interviewScheduleId,
            lbrDepoNum: formData.interview.lbrDepoNum,
            lbrEndroseDate: formData.interview.lbrEndroseDate,
            lbrDepoAmount: formData.interview.lbrDepoAmount,
            lbrFile: uploadedLabDep.lbrFile,
          },
        });
      } else {
        await createWPTrackingHandler({
          reqValue: wpTrackingData,
        });
      }

      const interStatus = {
        id: interviewScheduleStatusId,
        status: formData.interview.status,
      };
      setNotification(true);

      await interviewDetails({ InterviewValue: interStatus });

      if (response.errors && response.errors.length > 0) {
        console.error("Response errors:", response.errors);
      }
    } catch (err) {
      console.error("Error submitting interview details:", err);
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

  const requiredPermissions = ["WorkPass Tracking"];

  const access = "Recruitment";

  return (
    <>
      <form onSubmit={handleSubmitTwo} className="p-5">
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="lbrDepoNum">Labour Deposit Receipt Number</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="text"
              id="lbrDepoNum"
              {...register("lbrDepoNum")}
              value={formData.interview.lbrDepoNum}
              onChange={(e) => handleInputChange("lbrDepoNum", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lbrEndroseDate">
              Date Endrosement Of Labour Deposit
            </label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="date"
              id="lbrEndroseDate"
              {...register("lbrEndroseDate")}
              value={formData.interview.lbrEndroseDate}
              onChange={(e) =>
                handleInputChange("lbrEndroseDate", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="lbrDepoAmount">Deposit Amount</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[46px]"
              type="text"
              id="lbrDepoAmount"
              {...register("lbrDepoAmount")}
              value={formData.interview.lbrDepoAmount}
              onChange={(e) =>
                handleInputChange("lbrDepoAmount", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              className="w-full border p-2 rounded mt-1 h-[46px]"
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
          <div className="">
            <div className="">
              <FileUploadField
                label="Upload File"
                register={register}
                fileKey="lbrFile"
                handleFileUpload={handleFileUpload}
                uploadedFileNames={uploadedFileNames}
                deletedStringUpload={deletedStringUpload}
                isUploadingString={isUploadingString}
                error={errors.lbrFile}
                formattedPermissions={formattedPermissions}
                requiredPermissions={requiredPermissions}
                access={access}
              />
            </div>
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
      </form>
      {notification && (
        <SpinLogo
          text="Candidate details updated successfully"
          notification={notification}
          path="/recrutiles/workpasstracking"
        />
      )}
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </>
  );
};
