import React, { useState, useEffect, useContext } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { DataSupply } from "../../../utils/DataStoredContext";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { SpinLogo } from "../../../utils/SpinLogo";

export const InterviewForm = ({ candidate }) => {
  const { IVSSDetails } = useContext(DataSupply);
  const { interviewDetails } = UpdateInterviewData();

  // Initialize form state
  const [notification, setNotification] = useState(false);
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
  console.log(candidate)

  // Effect hook to auto-fetch and populate form data when IVSSDetails changes or candidate's tempID changes
  useEffect(() => {
    if (IVSSDetails.length > 0 && candidate?.tempID) {
      // Find the interview data for the selected candidate using the tempID
      const interviewData = IVSSDetails.find(
        (data) => data.tempID === candidate.tempID
      );

      if (interviewData) {
        // Update the formData with the interview data of the selected candidate
        setFormData({
          interview: {
            date: interviewData.interDate.split("T")[0], // Extract date from timestamp
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

  // Function to handle file input changes
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

    // Find the correct interview data using the tempID of the selected candidate
    const selectedInterviewData = IVSSDetails.find(
      (data) => data.tempID === candidate?.tempID
    );

    if (!selectedInterviewData) {
      console.error("No interview data found for the selected candidate.");
      alert("No interview data found for the selected candidate.");
      return;
    }

    // Now, get the interviewSchedules ID from the selected interview data
    const interviewScheduleId = selectedInterviewData?.id;

    if (!interviewScheduleId) {
      console.error("Interview schedule ID not found.");
      alert("Interview schedule ID not found.");
      return;
    }

    try {
      // Use the interviewScheduleId to update the interview details
      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleId, 
          interDate: formData.interview.date,
          interTime: formData.interview.time,
          venue: formData.interview.venue,
          interType: formData.interview.interviewType,
          message: formData.interview.message,
          manager: formData.interview.interviewer,
        },
      });
      console.log("Data stored successfully...");
      setNotification(true);
    } catch (error) {
      console.error("Error submitting interview details:", error);
      alert("Failed to update interview details. Please try again.");
    }
  };

  const interviewFields = [
    { field: "date", label: "Date", type: "date" },
    { field: "time", label: "Time", type: "time" },
    { field: "venue", label: "Venue", type: "text" },
    { field: "interviewType", label: "Interview Type", type: "text" },
    { field: "interviewer", label: "Interviewer", type: "text" },
    { field: "message", label: "Message", type: "textarea" },
  
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 grid grid-cols-2 gap-5">
        {interviewFields.map((input) => (
          <label key={input.field} className="block mb-4">
            {input.label}:
            {input.type !== "file" && input.type !== "textarea" ? (
              <input
                type={input.type}
                className="w-full border p-2 rounded mt-1"
                value={formData.interview[input.field]}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
              />
            ) : input.type === "textarea" ? (
              <textarea
                className="w-full border p-2 rounded mt-1"
                value={formData.interview[input.field]}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
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
        <button
          type="submit"
          className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow"
        >
          Submit
        </button>
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
