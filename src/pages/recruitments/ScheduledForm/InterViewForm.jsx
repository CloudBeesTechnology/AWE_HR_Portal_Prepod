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

    const selectedInterviewData = IVSSDetails.find(
      (data) => data.tempID === candidate?.tempID
    );

    if (!selectedInterviewData) {
      // console.error("No interview data found for the selected candidate.");
      alert("No interview data found for the selected candidate.");
      return;
    }

    const interviewScheduleId = selectedInterviewData?.id;

    if (!interviewScheduleId) {
      // console.error("Interview schedule ID not found.");
      alert("Interview schedule ID not found.");
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
                value={formData.interview[input.field] || ""}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
              />
            ) : input.type === "textarea" ? (
              <textarea
                className="w-full border p-2 rounded mt-1 h-[42px]"
                value={formData.interview[input.field] || ""}
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
          className="py-2 px-12 font-medium rounded shadow-lg bg-yellow hover:bg-yellow"
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
