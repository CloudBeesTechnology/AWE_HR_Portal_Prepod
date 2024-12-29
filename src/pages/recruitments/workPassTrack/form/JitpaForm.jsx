import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { JitpaFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { statusOptions } from "../../../../utils/StatusDropdown";

export const JitpaForm = ({ candidate }) => {
  const { interviewSchedules } = useFetchCandy();
  const { wpTrackingDetails } = useUpdateWPTracking();

  const [formData, setFormData] = useState({
    interview: {
      id: "",
      tbapurchasedate: "",
      submitdateendorsement: "",
      jitpaexpirydate: "",
      jitpaamount: "",
      jitpafile: "",
      status: "",
    },
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    jitpaFile: null,
  });
  const [uploadedJitpa, setUploadedJitpa] = useState({
    jitpaFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(JitpaFormSchema),
  });

  const JitpaUpload = watch("jitpaFile", "");

  useEffect(() => {
    // Log to see if interviewSchedules has data
    //  console.log("interviewSchedules:", interviewSchedules);

    if (interviewSchedules.length > 0) {
      // Find the interviewData for the candidate
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );

      //  console.log("Found interviewData:", interviewData);

      if (interviewData) {
        // Set the form data
        setFormData({
          interview: {
            tbapurchasedate: interviewData.tbapurchasedate,
            submitdateendorsement: interviewData.submitdateendorsement,
            jitpaexpirydate: interviewData.jitpaexpirydate,
            jitpaamount: interviewData.jitpaamount,
            jitpafile: interviewData.jitpafile,
          },
        });

        // Check if sawpFile exists and update the file names
        if (interviewData.jitpafile) {
          const fileName = extractFileName(interviewData.jitpafile);
          setUploadedFileNames((prev) => ({
            ...prev,
            jitpaFile: fileName,
          }));
          console.log("Uploaded file name set:", fileName);
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
      if (type === "jitpaFile") {
        await uploadDocs(file, "jitpaFile", setUploadedJitpa, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          jitpaFile: file.name, // Store the file name for display
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

    if (!interviewScheduleId) {
      console.error("Error: No interview schedule found for this candidate.");
      return;
    }

    try {
      const response = await wpTrackingDetails({
        WPTrackingValue: {
          id: interviewScheduleId,
          tbapurchasedate: formData.interview.tbapurchasedate,
          submitdateendorsement: formData.interview.submitdateendorsement,
          jitpaexpirydate: formData.interview.jitpaexpirydate,
          jitpaamount: formData.interview.jitpaamount,
          jitpafile: uploadedJitpa.jitpaFile
            ? uploadedJitpa.jitpaFile
            : formData.interview.jitpafile,
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
          <label htmlFor="tbapurchasedate">Date of Purchase</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="tbapurchasedate"
            {...register("tbapurchasedate")}
            value={formData.interview.tbapurchasedate}
            onChange={(e) =>
              handleInputChange("tbapurchasedate", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="submitdateendorsement">Date of Endrosement</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="submitdateendorsement"
            {...register("submitdateendorsement")}
            value={formData.interview.submitdateendorsement}
            onChange={(e) =>
              handleInputChange("submitdateendorsement", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="jitpaexpirydate">Valid Until</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="jitpaexpirydate"
            {...register("jitpaexpirydate")}
            value={formData.interview.jitpaexpirydate}
            onChange={(e) =>
              handleInputChange("jitpaexpirydate", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="jitpaamount">JITPA Amount</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="jitpaamount"
            {...register("jitpaamount")}
            value={formData.interview.jitpaamount}
            onChange={(e) => handleInputChange("jitpaamount", e.target.value)}
          />
        </div>
        <div className="">
          <div className="flex items-center gap-5 mt-1">
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "jitpaFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.jitpaFile || extractFileName(JitpaUpload)
              }
              value={formData.interview.jitpafile}
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
