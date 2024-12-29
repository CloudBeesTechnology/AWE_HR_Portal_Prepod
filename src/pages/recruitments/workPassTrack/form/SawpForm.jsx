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

export const SawpForm = ({ candidate }) => {
  // const { interviewSchedules } = useFetchCandy();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const { interviewDetails } = UpdateInterviewData();
  const { createWPTrackingHandler } = useCreateWPTracking();
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      tempID: "",
      sawpDate: "",
      sawpRecivedDate: "",
      sawpFile: "",
      supportletterReqDate: "",
      supportletterReceiveDate: "",
      letterfile: "",
      doerefno: "",
      doesubmitdate: "",
      doeapprovedate: "",
      doeexpirydate: "",
      doefile: "",
      nlmssubmitdate: "",
      submissionrefrenceno: "",
      nlmsapprovedate: "",
      ldreferenceno: "",
      nlmsexpirydate: "",
      nlmsfile: "",
      bgsubmitdate: "",
      bgreceivedate: "",
      referenceno: "",
      bgamount: "",
      bgexpirydate: "",
      bgfile: "",
      tbapurchasedate: "",
      jitpaamount: "",
      jitpaexpirydate: "",
      receiptno: "",
      depositamount: "",
      submitdateendorsement: "",
      jitpafile: "",
      immbdno: "",
      docsubmitdate: "",
      visaapprovedate: "",
      visareferenceno: "",
      visaFile: "",
      departuredate: "",
      arrivaldate: "",
      cityname: "",
      airfare: "",
      airticketfile: "",
      agentname: "",
      mobSignDate: "",
      mobFile: "",
      tempID: "",
      lbrDepoNum: "",
      lbrEndroseDate: "",
      lbrDepoAmount: "",
      lbrFile: "",
      status: "",
    },
  });
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
    if (candidate) {
      // Set the form data
      setFormData({
        interview: {
          sawpDate: candidate.WPTrackDetails_sawpDate,
          sawpRecivedDate: candidate.WPTrackDetails_sawpRecivedDate,
          sawpFile: candidate.WPTrackDetails_sawpFile,
        },
      });

      console.log({
        sawpDate: candidate.WPTrackDetails_sawpDate,
        sawpRecivedDate: candidate.WPTrackDetails_sawpRecivedDate,
        sawpFile: candidate.WPTrackDetails_sawpFile,
      });

      // Check if sawpFile exists and update the file names
      if (candidate.WPTrackDetails_sawpFile) {
        const fileName = extractFileName(candidate.WPTrackDetails_sawpFile);
        setUploadedFileNames((prev) => ({
          ...prev,
          sawpFile: fileName,
        }));
        // console.log("Uploaded file name set:", fileName);
      }
    } else {
      console.log("No interviewData found for candidate:", candidate.tempID);
    }
  }, [candidate]);

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
  const onSubmit = async (data) => {
    data.preventDefault();
    // Ensure form fields are populated
    const requestData = {
      reqValue: {
        ...formData.interview,
        sawpFile: uploadedSawp.sawpFile ? uploadedSawp.sawpFile : "",
        sawpDate: formData.interview.WPTrackDetails_sawpDate,
        sawpRecivedDate: formData.interview.WPTrackDetails_sawpRecivedDate,
        tempID: candidate.tempID,
      },
    };

    try {
      await createWPTrackingHandler(requestData); // Call the createWPTrackingHandler with form data
      console.log(requestData, "Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
      // alert("Error submitting form");
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
    <form onSubmit={onSubmit} className="p-5">
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="sawpDate">Sawp Request Date</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="sawpDate"
            {...register("sawpDate")}
            value={formData.interview.WPTrackDetails_sawpDate}
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
            value={formData.interview.WPTrackDetails_sawpRecivedDate}
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
              value={formData.interview.WPTrackDetails_sawpFile}
            />
          </div>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="status"
            {...register("status")}
            value={formData.interview.interviewDetails_status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          />
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
