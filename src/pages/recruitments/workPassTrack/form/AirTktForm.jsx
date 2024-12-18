import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { AirTktFormSchema } from "../../../../services/Validation";
import { UpdateLoiData } from "../../../../services/updateMethod/UpdateLoi";
import { useFetchInterview } from "../../../../hooks/useFetchInterview";

export const AirTktForm = () => {
  const { mergedInterviewData } = useFetchInterview();
  const { loiDetails } = UpdateLoiData();

  const [formData, setFormData] = useState({
    interview: {
      id: "",
      departure: "",
      arrival: "",
      cityName: "",
      airFare: "",
      airTktFile: [],
    },
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    airTktFile: null,
  });
  const [uploadedAirTkt, setUploadedAirTkt] = useState({
    airTktFile: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(AirTktFormSchema),
  });

  const AirTktUpload = watch("airTktFile", "");
  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
      setFormData({
        interview: {
          departure: interviewData.localMobilization.departure,
          arrival: interviewData.localMobilization.arrival,
          cityName: interviewData.localMobilization.cityName,
          airFare: interviewData.localMobilization.airFare,
          airTktFile: interviewData.localMobilization.airTktFile,
        },
      });
      if (interviewData.localMobilization.airTktFile) {
        setUploadedFileNames((prev) => ({
          ...prev,
          airTktFile: extractFileName(interviewData.localMobilization.airTktFile),
        }));
      }
    }
  }, [mergedInterviewData]);

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
      if (type === "airTktFile") {
        await uploadDocs(file, "airTktFile", setUploadedAirTkt, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          airTktFile: file.name, // Store the file name for display
        }));
      }
    }
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();

    const localMobilizationId = mergedInterviewData[0]?.localMobilization.id;

    try {
      await loiDetails({
        LoiValue: {
          id: localMobilizationId,
          departure: formData.interview.departure,
          arrival: formData.interview.arrival,
          cityName: formData.interview.cityName,
          airFare: formData.interview.airFare,
          airTktFile: uploadedAirTkt.airTktFile || formData.airTktFile,
        },
      });
      console.log("Data stored successfully...");
      // setNotification(true);
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

  return (
    <form onSubmit={handleSubmitTwo} className="p-5">
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="departure">Date of Departure</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="departure"
            {...register("departure")}
            value={formData.interview.departure}
            onChange={(e) => handleInputChange("departure", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="arrival">Date of Arrival</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="arrival"
            {...register("arrival")}
            value={formData.interview.arrival}
            onChange={(e) => handleInputChange("arrival", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cityName">City of Departure</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="cityName"
            {...register("cityName")}
            value={formData.interview.cityName}
            onChange={(e) => handleInputChange("cityName", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="airFare">AirFare</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            id="airFare"
            {...register("airFare")}
            value={formData.interview.airFare}
            onChange={(e) => handleInputChange("airFare", e.target.value)}
          />
        </div>

        <div className="">
          <div className="flex items-center gap-5 mt-1">
            <FileUploadField
              label="Upload File"
              className="p-4"
              onChangeFunc={(e) => handleFileChange(e, "airTktFile")}
              accept="application/pdf"
              register={register}
              fileName={
                uploadedFileNames.airTktFile || extractFileName(AirTktUpload)
              }
              value={formData.interview.airTktFile}
            />
          </div>
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
