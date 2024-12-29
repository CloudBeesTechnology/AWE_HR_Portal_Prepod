import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { BankFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { statusOptions } from "../../../../utils/StatusDropdown";

export const BankForm = ({ candidate }) => {
  const { interviewSchedules } = useFetchCandy();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      bgsubmitdate: "",
      bgreceivedate: "",
      bgexpirydate: "",
      referenceno: "",
      bgamount: "",
      bgfile: "",
    },
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
    // Log to see if interviewSchedules has data
    //  console.log("interviewSchedules:", interviewSchedules);

    if (interviewSchedules.length > 0) {
      // Find the interviewData for the candidate
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );

      // Log the found interviewData
      //  console.log("Found interviewData:", interviewData);

      if (interviewData) {
        // Set the form data
        setFormData({
          interview: {
            bgsubmitdate: interviewData.bgsubmitdate,
            bgreceivedate: interviewData.bgreceivedate,
            bgexpirydate: interviewData.bgexpirydate,
            referenceno: interviewData.referenceno,
            bgamount: interviewData.bgamount,
            bgfile: interviewData.bgfile,
          },
        });

        // Check if sawpFile exists and update the file names
        if (interviewData.bgfile) {
          const fileName = extractFileName(interviewData.bgfile);
          setUploadedFileNames((prev) => ({
            ...prev,
            bgFile: fileName,
          }));
          //  console.log("Uploaded file name set:", fileName);
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
      if (type === "bgFile") {
        await uploadDocs(file, "bgFile", setUploadedBank, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          bgFile: file.name, // Store the file name for display
        }));
      }
    }
  };

  const handleSubmitTwo = async (data) => {
    data.preventDefault();

    const selectedInterviewData = interviewSchedules.find(
      (data) => data.tempID === candidate?.tempID
    );
    const interviewScheduleId = selectedInterviewData?.id;

    if (!formData?.interview) {
      console.error("Error: formData.interview is undefined.");
      return;
    }

    // console.log("Selected Interview Data:", selectedInterviewData);
    // console.log("Interview Schedule ID:", interviewScheduleId);
    // console.log("Form Data:", formData);

    if (!interviewScheduleId) {
      console.error("Error: No interview schedule found for this candidate.");
      return;
    }

    try {
      const response = await wpTrackingDetails({
        WPTrackingValue: {
          id: interviewScheduleId,
          bgsubmitdate: formData.interview.bgsubmitdate,
          bgreceivedate: formData.interview.bgreceivedate,
          bgexpirydate: formData.interview.bgexpirydate,
          referenceno: formData.interview.referenceno,
          bgamount: formData.interview.bgamount,
          bgfile: uploadedBank.bgFile
            ? uploadedBank.bgFile
            : formData.interview.bgfile,
        },
      });

      // console.log("Response from WPTrackingDetails:", response);

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

  return (
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
            onChange={(e) => handleInputChange("bgsubmitdate", e.target.value)}
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
            onChange={(e) => handleInputChange("bgreceivedate", e.target.value)}
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
            onChange={(e) => handleInputChange("bgexpirydate", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bgamount">Bank Guarantee Amount</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="bgamount"
            {...register("bgamount")}
            value={formData.interview.bgamount}
            onChange={(e) => handleInputChange("bgamount", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="referenceno"> Bank Guarantee Reference Number</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="referenceno"
            {...register("referenceno")}
            value={formData.interview.referenceno}
            onChange={(e) => handleInputChange("referenceno", e.target.value)}
          />
        </div>

        <div className="">
          <div className="flex items-center gap-5 mt-1">
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "bgFile")}
              accept="application/pdf"
              register={register}
              fileName={uploadedFileNames.bgFile || extractFileName(BankUpload)}
              value={formData.interview.bgfile}
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
  );
};
