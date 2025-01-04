import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../../../employees/medicalDep/FileUploadField";
import { AirTktFormSchema } from "../../../../services/Validation";
import { useFetchCandy } from "../../../../services/readMethod/FetchCandyToEmp";
import { useUpdateWPTracking } from "../../../../services/updateMethod/UpdateWPTracking";
import { UpdateInterviewData } from "../../../../services/updateMethod/UpdateInterview";
import { statusOptions } from "../../../../utils/StatusDropdown";
import { SpinLogo } from "../../../../utils/SpinLogo";

export const AirTktForm = ({ candidate }) => {
  const { interviewSchedules } = useFetchCandy();
  const { wpTrackingDetails } = useUpdateWPTracking();
  const { interviewDetails } = UpdateInterviewData();

  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      departuredate: "",
      arrivaldate: "",
      cityname: "",
      airfare: "",
      airticketfile: "",
      status: "",
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
  console.log(interviewSchedules);

  useEffect(() => {
    if (interviewSchedules.length > 0) {
      // Find the interviewData for the candidate
      const interviewData = interviewSchedules.find(
        (data) => data.tempID === candidate.tempID
      );

      if (interviewData) {
        // Set the form data
        setFormData({
          interview: {
            departuredate: interviewData.departuredate,
            arrivaldate: interviewData.arrivaldate,
            cityname: interviewData.cityname,
            airfare: interviewData.airfare,
            airticketfile: interviewData.airticketfile,
            status: interviewData.IDDetails.status,
          },
        });

        // Check if sawpFile exists and update the file names
        if (interviewData.airticketfile) {
          const fileName = extractFileName(interviewData.airticketfile);
          setUploadedFileNames((prev) => ({
            ...prev,
            airTktFile: fileName,
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
      if (type === "airTktFile") {
        await uploadDocs(file, "airTktFile", setUploadedAirTkt, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          airTktFile: file.name, // Store the file name for display
        }));
      }
    }
  };

  const handleSubmitTwo = async (data) => {
    data.preventDefault();

    const selectedInterviewData = interviewSchedules.find(
      (data) => data.tempID === candidate?.tempID
    );

    const selectedInterviewDataStatus = interviewSchedules.find(
      (data) => data.IDDetails.tempID === candidate?.tempID
    );

    const interviewScheduleId = selectedInterviewData?.id;
    const interviewScheduleStatusId = selectedInterviewDataStatus.IDDetails?.id;

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
          departuredate: formData.interview.departuredate,
          arrivaldate: formData.interview.arrivaldate,
          cityname: formData.interview.cityname,
          airfare: formData.interview.airfare,
          airticketfile: uploadedAirTkt.airTktFile
            ? uploadedAirTkt.airTktFile
            : formData.interview.airticketfile,
        },
      });

      const interStatus = {
        id: interviewScheduleStatusId, // Dynamically use the correct id
        status: formData.interview.status,
      };
      setNotification(true);

      console.log("Submitting interview details with status:", interStatus);

      await interviewDetails({ InterviewValue: interStatus });

      console.log("Interview status updated:", interStatus);

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
    <>
      <form onSubmit={handleSubmitTwo} className="p-5">
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="departuredate">Date of Departure</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="date"
              id="departuredate"
              {...register("departuredate")}
              value={formData.interview.departuredate}
              onChange={(e) =>
                handleInputChange("departuredate", e.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="arrivaldate">Date of Arrival</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="date"
              id="arrivaldate"
              {...register("arrivaldate")}
              value={formData.interview.arrivaldate}
              onChange={(e) => handleInputChange("arrivaldate", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cityname">City of Departure</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="text"
              id="cityname"
              {...register("cityname")}
              value={formData.interview.cityname}
              onChange={(e) => handleInputChange("cityname", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="airfare">AirFare</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="text"
              id="airfare"
              {...register("airfare")}
              value={formData.interview.airfare}
              onChange={(e) => handleInputChange("airfare", e.target.value)}
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
                value={formData.interview.airfare}
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
      {notification && (
        <SpinLogo
          text="Candidate details updated successfully"
          notification={notification}
          path="/recrutiles/workpasstracking"
        />
      )}
    </>
  );
};
