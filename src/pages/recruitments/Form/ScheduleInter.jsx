import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InterviewScheduleSchema } from "../../../services/Validation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { SubmitInterviewSchedule } from "../../../services/createMethod/SubmitInterviewSchedule";
import { FormField } from "../../../utils/FormField";
import { LocalMobilization } from "../../../services/createMethod/CreateLOI";
import { sendEmail } from "../../../services/EmailServices";
import { DataSupply } from "../../../utils/DataStoredContext";
import { IoSearch } from "react-icons/io5";
import { SearchDisplay } from "../../../utils/SearchDisplay";

export const ScheduleInter = ({ candidate, onClose }) => {
  const [notification, setNotification] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    interview: {
      empID: "",
      manager: "",
      venue: "",
      interType: "",
      managerEmail: "",
      managerName: "",
      candyEmail: "",
      hrEmail: "Hr-notification@adininworks.com",
      candyName: "",
      candyPosition: "",
    },
  });

  const { empPIData } = useContext(DataSupply);
  const { localMobilization } = LocalMobilization();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(InterviewScheduleSchema),
  });

  const { createSchedule } = SubmitInterviewSchedule();

  const searchResult = (result) => {
    setFormData({
      interview: {
        empID: result?.empID,
        manager: result?.name,
        managerEmail: result?.officialEmail,
        managerName: result?.name,
        candyEmail: candidate?.email,
        hrEmail: "hr-recruitment@adininworks.com",
        candyName: candidate?.name,
        candyPosition: candidate?.position,
      },
    });
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

  const onSubmit = handleSubmit(async (data) => {
    const formattedData = {
      ...data,
      interDate: new Date(data.interDate),
      tempID: candidate.tempID,
      candidateStatus: "pending",
      status: "interviewscheduled",
    };

    const mobilizationData = {
      tempID: candidate.tempID,
    };

    try {
      setIsLoading(true);
      // // Ensure the schedule is created first
      await createSchedule(formattedData);
      await localMobilization(mobilizationData);
      // // Send emails sequentially
      await sendEmails(data);
      setIsLoading(false);
      setTimeout(() => {
        setNotification(true);
      }, 200);
    } catch (error) {
      console.log("Error scheduling interview:", error);
      setIsLoading(false);
    }
  });

  const sendEmails = async (data) => {
    const from = "hr_no-reply@adininworks.com";
    const ManagerSubject = "Interview Scheduled";
    const hrSubject = "Interview Scheduled";
    const candySubject = "Interview Scheduled";
    const MANAGER_NAME = formData.interview.managerName;
    const CANDY_NAME = formData.interview.candyName;

    // Date Formatting (DD/MM/YYYY)
    const formattedDate = new Date(data.interDate);
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const year = formattedDate.getFullYear();
    const formattedDateString = `${day}/${month}/${year}`;

    // Time Formatting to 12-hour format (hh:mm AM/PM)
    let hours = parseInt(data.interTime.split(":")[0], 10);
    const minutes = String(parseInt(data.interTime.split(":")[1], 10)).padStart(
      2,
      "0"
    );
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    const emailContent = `
    <html>
      <body>
        <p>Subject: Interview Notification</p>
        
        <p>Dear ${MANAGER_NAME},</p>
        
        <p>This is to notify you that an interview has been scheduled for ${
          formData.interview.candyName
        } the <strong> ${
      formData.interview.candyPosition
    } </strong> position.</p>      
        <p><strong>Date:</strong> ${formattedDateString}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Mode:</strong> ${data.interType || "Not specified"}</p>
        <p><strong>Venue:</strong> ${data.venue || "Not provided"}</p>
        
        <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the form.</p>
      </body>
    </html>
  `;

    const emailContentCandy = `
  <html>
    <body>
      <p>Subject: Interview Notification</p>
      
      <p>Dear ${formData.interview.candyName},</p>
      
      <p>This is to notify you that an interview has been scheduled for the <strong> ${
        formData.interview.candyPosition
      } </strong> position.</p>      
      <p><strong>Date:</strong> ${formattedDateString}</p>
      <p><strong>Time:</strong> ${formattedTime}</p>
      <p><strong>Mode:</strong> ${data.interType || "Not specified"}</p>
      <p><strong>Venue:</strong> ${data.venue || "Not provided"}</p>
    </body>
  </html>
`;

    try {
      if (formData) {
        // Send to Manager Email
        await sendEmail(
          ManagerSubject,
          emailContent,
          from,
          formData.interview.managerEmail
        );

        // Send to HR Email
        await sendEmail(
          hrSubject,
          emailContent,
          from,
          formData.interview.hrEmail
        );

        // Send to Candy
        await sendEmail(
          candySubject,
          emailContentCandy,
          from,
          formData.interview.candyEmail
        );
      }
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  return (
    <section className="min-h-screen bg-opacity-80 w-full center">
      <div
        onClick={() => {
          setFilteredEmployees([]);
        }}
        className="bg-white rounded-lg shadow-lg w-full max-w-[500px] overflow-y-auto"
      >
        <div className="text-xl relative text-dark_grey text-center font-semibold p-3 rounded-t-lg bg-yellow">
          <p>Schedule Interview</p>
          <button
            className="border absolute right-4 top-3 rounded-full px-2 center"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-5">
          <div className="flex flex-row justify-between space-x-8">
            <FormField
              name="interDate"
              type="date"
              label="Date"
              register={register}
              errors={errors}
            />
            <FormField
              name="interTime"
              type="time"
              label="Time"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <label className="text-dark_grey text-[16px] underline font-semibold block mb-2">
              Interview Type :
            </label>
            <div className="flex justify-start items-center gap-5 my-4">
              <input
                type="radio"
                id="Offline"
                {...register("interType")}
                value="Offline"
              />
              <label htmlFor="Offline">Offline</label>
              <input
                type="radio"
                id="Online"
                {...register("interType")}
                value="Online"
              />
              <label htmlFor="Online">Online</label>
            </div>
            {errors.interType && (
              <p className="text-[red] text-[13px] text-center mt-3">
                {errors.interType.message}
              </p>
            )}
          </div>
          <label className="text-dark_grey text-[16px] underline font-semibold block mb-2">
            Venue :
          </label>
          <FormField
            name="venue"
            type="text"
            placeholder="Enter Venue"
            className="input-field border mb-2"
            register={register}
            errors={errors}
            onChange={(e) => handleInputChange("venue", e.target.value)}
          />
          <div className="">
            <label className="text-dark_grey text-[16px] underline font-semibold block mb-2">
              Assign Interviewer :
            </label>
            <div className="flex-1 mt-2 mb-2">
              <SearchDisplay
                searchResult={searchResult}
                newFormData={empPIData}
                searchIcon2={<IoSearch />}
                placeholder="Search Employee Id"
                rounded="rounded-lg"
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="empID"
                type="text"
                label="Employee ID"
                placeholder="Enter EmpID"
                className="input-field border"
                register={register}
                errors={errors}
                value={formData.interview.empID || ""}
                onChange={(e) => handleInputChange("empID", e.target.value)}
              />
              <FormField
                name="manager"
                type="text"
                label="Manager Name"
                placeholder="Enter Manager Name"
                className="input-field border"
                register={register}
                errors={errors}
                value={formData.interview.manager || ""}
                onChange={(e) => handleInputChange("manager", e.target.value)}
              />
            </div>
          </div>
          <FormField
            name="message"
            type="textarea"
            label="Message"
            placeholder="Enter Message"
            className="input-field border"
            register={register}
            errors={errors}
          />
          <div className="text-center mt-1 center">
            <button
              className="border-2 border-[#F7EC3D] text-dark_grey font-medium hover:bg-yellow py-1 px-2 rounded w-32"
              onClick={() => onSubmit()}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Send"}
            </button>
          </div>
          {notification && (
            <SpinLogo
              text="Interview scheduled notification sent to HRD & Manager successfully"
              notification={notification}
              path="/recrutiles/listofcandi"
            />
          )}
        </div>
      </div>
    </section>
  );
};
