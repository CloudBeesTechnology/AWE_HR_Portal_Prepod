import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocString } from "../../../../services/uploadsDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { BankFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";
import { handleDeleteFile } from "../../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadBankG } from "../deleteUpload/DeleteUploadBankG";
import { useDeleteAccess } from "../../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../../utils/DeletePopup";
import { useCreateWPTracking } from "../../../../services/createMethod/CreateWPTracking";
import { DataSupply } from "../../../../utils/DataStoredContext";

export const BankForm = ({ candidate }) => {
  const { IVSSDetails } = useContext(DataSupply);
  const { formattedPermissions } = useDeleteAccess();
  const { interviewSchedules } = useFetchCandy();
  const { createWPTrackingHandler } = useCreateWPTracking();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const { interviewDetails } = UpdateInterviewData();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      bgsubmitdate: "",
      bgreceivedate: "",
      bgexpirydate: "",
      referenceno: "",
      bgamount: "",
      bgfile: "",
      status: "",
    },
  });

  const [isUploadingString, setIsUploadingString] = useState({
    bgFile: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    bgFile: null,
  });
  const [uploadedBank, setUploadedBank] = useState({
    bgFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(BankFormSchema),
  });

  const BankUpload = watch("bgFile", "");

  useEffect(() => {
    if (interviewSchedules.length > 0) {
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );

      if (interviewData) {
        setFormData({
          interview: {
            bgsubmitdate: interviewData.bgsubmitdate,
            bgreceivedate: interviewData.bgreceivedate,
            bgexpirydate: interviewData.bgexpirydate,
            referenceno: interviewData.referenceno,
            bgamount: interviewData.bgamount,
            bgfile: interviewData.bgfile || uploadedBank.bgFile,
            status: interviewData.IDDetails.status,
          },
        });

        if (interviewData.bgfile) {
          const fileName = extractFileName(interviewData.bgfile);
          setUploadedFileNames((prev) => ({
            ...prev,
            bgFile: fileName,
          }));
          //  console.log("Uploaded file name set:", fileName);
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
      await uploadDocString(selectedFile, type, setUploadedBank, tempID);
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
      const isDeletedArrayUploaded = await DeleteUploadBankG(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedBank,
        setIsUploadingString,
        setFormData
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
      // console.log(`Deleted "${fileName}". Remaining files:`);
      // console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const wrapUpload = (filePath) => {
    return filePath ? [{ upload: filePath, date: currentDate }] : null;
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
      bgsubmitdate: formData.interview.bgsubmitdate,
      bgreceivedate: formData.interview.bgreceivedate,
      bgexpirydate: formData.interview.bgexpirydate,
      referenceno: formData.interview.referenceno,
      bgamount: formData.interview.bgamount,
      bgfile: isUploadingString.bgFile
        ? JSON.stringify(wrapUpload(uploadedBank.bgFile))
        : formData.interview.bgfile,
    };

    let response;
    try {
      if (interviewScheduleId) {
        response = await wpTrackingDetails({
          WPTrackingValue: {
            id: interviewScheduleId,
            bgsubmitdate: formData.interview.bgsubmitdate,
            bgreceivedate: formData.interview.bgreceivedate,
            bgexpirydate: formData.interview.bgexpirydate,
            referenceno: formData.interview.referenceno,
            bgamount: formData.interview.bgamount,
            bgfile: isUploadingString.bgFile
              ? JSON.stringify(wrapUpload(uploadedBank.bgFile))
              : formData.interview.bgfile,
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

      // console.log("Submitting interview details with status:", interStatus);

      await interviewDetails({ InterviewValue: interStatus });

      // console.log("Interview status updated:", interStatus);

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
            <label htmlFor="bgsubmitdate">Date of Submission</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="date"
              id="bgsubmitdate"
              {...register("bgsubmitdate")}
              value={formData.interview.bgsubmitdate}
              onChange={(e) =>
                handleInputChange("bgsubmitdate", e.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="bgreceivedate">Date Received</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="date"
              id="bgreceivedate"
              {...register("bgreceivedate")}
              value={formData.interview.bgreceivedate}
              onChange={(e) =>
                handleInputChange("bgreceivedate", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="bgexpirydate">Valid Until</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="date"
              id="bgexpirydate"
              {...register("bgexpirydate")}
              value={formData.interview.bgexpirydate}
              onChange={(e) =>
                handleInputChange("bgexpirydate", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="bgamount">Bank Guarantee Amount</label>
            <input
              className="w-full border p-2 rounded mt-1 h-[44px]"
              type="text"
              id="bgamount"
              {...register("bgamount")}
              value={formData.interview.bgamount}
              onChange={(e) => handleInputChange("bgamount", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="referenceno">
              {" "}
              Bank Guarantee Reference Number
            </label>
            <input
              className="w-full border p-2 rounded mt-1 h-[44px]"
              type="text"
              id="referenceno"
              {...register("referenceno")}
              value={formData.interview.referenceno}
              onChange={(e) => handleInputChange("referenceno", e.target.value)}
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
                fileKey="bgFile"
                handleFileUpload={handleFileUpload}
                uploadedFileNames={uploadedFileNames}
                deletedStringUpload={deletedStringUpload}
                isUploadingString={isUploadingString}
                error={errors.bgFile}
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
