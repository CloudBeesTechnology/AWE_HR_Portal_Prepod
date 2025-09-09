import React, { useState, useEffect, useContext } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { DataSupply } from "../../../utils/DataStoredContext";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { SpinLogo } from "../../../utils/SpinLogo";

export const InterviewForm = ({ candidate }) => {
  const { IVSSDetails, loading } = useContext(DataSupply);
  const { interviewDetails } = UpdateInterviewData();

  // Initialize form state
  const [notification, setNotification] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      date: "",
      time: "",
      venue: "",
      interviewType: "",
      interviewer: "",
      message: "",
    },
  });

  const EMPID = localStorage.getItem("userID");
  const TODAY = new Date().toISOString().split("T")[0];

  const formatDate = (dateToString) => {
    if (!dateToString || isNaN(new Date(dateToString).getTime())) {
      return "";
    }

    const date = new Date(dateToString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    if (IVSSDetails.length > 0 && candidate?.tempID) {
      const interviewData = IVSSDetails.find(
        (data) => data.tempID === candidate.tempID
      );

      if (interviewData) {
        const interFormattedDate = formatDate(interviewData.interDate);
        setFormData({
          // interviewData.interDate?.split("T")[0]
          interview: {
            date: interFormattedDate,
            time: interviewData.interTime,
            venue: interviewData.venue,
            interviewType: interviewData.interType,
            interviewer: interviewData.manager,
            message: interviewData.message,
          },
        });
      }
    }
  }, [IVSSDetails, candidate?.tempID]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        [field]: value,
      },
    }));
  };

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        [field]: file,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const selectedInterviewData = IVSSDetails.find(
      (data) => data.tempID === candidate?.tempID
    );

    if (!selectedInterviewData) {
      // console.error("No interview data found for the selected candidate.");
      alert("No interview data found for the selected candidate.");
      setSubmitLoading(false);
      return;
    }

    const interviewScheduleId = selectedInterviewData?.id;

    if (!interviewScheduleId) {
      // console.error("Interview schedule ID not found.");
      alert("Interview schedule ID not found.");
      setSubmitLoading(false);
      return;
    }

    const updatedByData = selectedInterviewData;

    const previousUpdates = updatedByData?.updatedBy
      ? JSON.parse(updatedByData?.updatedBy)
      : [];

    const updatedBy = [...previousUpdates, { userID: EMPID, date: TODAY }];

    const orderedUpdatedBy = updatedBy?.map((entry) => ({
      userID: entry.userID,
      date: entry.date,
    }));

    try {
      // Use the interviewScheduleId to update the interview details
      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleId,
          interDate: formData.interview?.date,
          interTime: formData.interview?.time,
          venue: formData.interview?.venue,
          interType: formData.interview?.interviewType,
          message: formData.interview?.message,
          manager: formData.interview?.interviewer,
          updatedBy: JSON.stringify(orderedUpdatedBy),
        },
      });

      setNotification(true);
    } catch (error) {
      // console.error("Error submitting interview details:", error);
      alert("Failed to update interview details. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </div>
  );

  // Submit button with loading state
  const SubmitButton = () => (
    <button
      type="submit"
      disabled={submitLoading}
      className={`py-2 px-12 font-medium rounded shadow-lg bg-yellow hover:bg-yellow flex items-center justify-center ${
        submitLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {submitLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Submitting...
        </>
      ) : (
        "Submit"
      )}
    </button>
  );

  const interviewFields = [
    { field: "date", label: "Date", type: "date" },
    { field: "time", label: "Time", type: "time" },
    { field: "venue", label: "Venue", type: "text" },
    { field: "interviewType", label: "Interview Type", type: "text" },
    { field: "interviewer", label: "Interviewer", type: "text" },
    { field: "message", label: "Message", type: "textarea" },
  ];

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Loading overlay for data fetching */}
      {loading && <LoadingOverlay />}
      <div className="p-4 grid grid-cols-2 gap-5">
        {interviewFields.map((input) => (
          <label key={input.field} className="block mb-4">
            {input.label}:
            {input.type !== "file" && input.type !== "textarea" ? (
              <input
                type={input.type}
                className="w-full border p-2 rounded mt-1"
                value={formData.interview[input.field] || ""}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
                disabled={loading || submitLoading}
              />
            ) : input.type === "textarea" ? (
              <textarea
                className="w-full border p-2 rounded mt-1 h-[42px]"
                value={formData.interview[input.field] || ""}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
                disabled={loading || submitLoading}
              />
            ) : (
              <div className="flex items-center mt-1">
                <input
                  type="file"
                  className="hidden"
                  id={input.field}
                  onChange={(e) =>
                    handleFileChange(input.field, e.target.files[0])
                  }
                  disabled={loading || submitLoading}
                />
                <label
                  htmlFor={input.field}
                  className="flex items-center cursor-pointer text-grey"
                >
                  <BsCloudUpload className="mr-2 text-lg text-[#ab1234]" />
                  {formData.interview[input.field]?.name || "Upload PDF"}
                </label>
              </div>
            )}
          </label>
        ))}
      </div>
      <div className="center">
        <SubmitButton />
      </div>
      {notification && (
        <SpinLogo
          text="Candidate Selected Successfully"
          notification={notification}
          path="/recrutiles/status"
        />
      )}
    </form>
  );
};