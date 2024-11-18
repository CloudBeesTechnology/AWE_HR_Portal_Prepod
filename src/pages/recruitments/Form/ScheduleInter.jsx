import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InterviewScheduleSchema } from "../../../services/Validation";
import { generateClient } from "@aws-amplify/api";
import { createInterviewScheduleSchema } from "../../../graphql/mutations";
import { SpinLogo } from "../../../utils/SpinLogo";
import { SubmitInterviewSchedule } from "../../../services/createMethod/SubmitInterviewSchedule";

const client = generateClient();

export const ScheduleInter = ({ candidate, onClose, onSave }) => {
  const [notification, setNotification] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(InterviewScheduleSchema),
  });

  const { createSchedule, isLoading, error } = SubmitInterviewSchedule();

  const onSubmit = handleSubmit(async (data) => {
    const formattedData = {
      ...data,
      date: new Date(data.date).toISOString().split("T")[0], // Ensure the date is in the correct format
      tempID: candidate.tempID,  // Ensure the candidate's temporary ID is included
      candidateStatus: "pending",  // Default status is 'pending'
    };

    console.log("Formatted Data:", formattedData);
    await createSchedule(formattedData);
  });

  // // Handle form submission
  // const onSubmit = handleSubmit(async (data) => {
  //   // Format the data before sending it to the backend
  //   const formattedData = {
  //     ...data,
  //     date: new Date(data.date).toISOString().split("T")[0], // Ensure the date is in the correct format
  //     tempID: candidate.tempID,  // Ensure the candidate's temporary ID is included
  //     candidateStatus: "pending",  // Default status is 'pending'
  //   };
  
  //   // Log the formatted data to the console before sending it to the backend
  //   console.log("Formatted Data:", formattedData);
  
  //   // Make the API call to store the data
  //   try {
  //     const res = await client.graphql({
  //       query: createInterviewScheduleSchema,
  //       variables: { input: formattedData },
  //     });
  
  //     // Log the response from the backend to verify the data was stored correctly
  //     console.log("API Response:", res);
  
  //     // Assuming successful API call, set notification to true
  //     setNotification(true);
  
  //   } catch (err) {
  //     // Log any errors from the API call
  //     console.log("Error during API call:", err);
  //   }
  // });
  
  return (
    <section className="min-h-screen bg-opacity-80 w-full center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[400px] overflow-y-auto ">
        <div className="text-xl relative text-dark_grey text-center font-semibold p-3 rounded-t-lg bg-yellow">
          <p> Schedule Interview</p>
          <button
            className="border absolute right-4 top-3 rounded-full px-2 center"
            onClick={onClose}
          >
            {" "}
            &times;
          </button>
        </div>
        <div className="p-5">
          <div className="flex flex-row justify-between space-x-8">
            <div className="mt-2">
              <label className="text-dark_grey text-[14px] font-normal">
                Date
              </label>
              <input
                type="date"
                name="date"
                {...register("date")}
                className="w-full p-2 shadow-[0_1px_4px_1px_rgba(0,0,0,0.2)] rounded mt-1"
              />
              {errors.date && (
                <p className="text-[red] mt-1 text-[11px]">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div className="mt-2">
              <label className="text-dark_grey text-[14px] font-normal">
                Time
              </label>
              <input
                type="time"
                name="time"
                {...register("time")}
                className="w-full p-2 shadow-[0_1px_4px_1px_rgba(0,0,0,0.2)] rounded mt-1"
              />
              {errors.time && (
                <p className="text-[red] mt-1 text-[11px]">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-2">
            <label className="text-dark_grey text-[14px] font-normal">
              Interview Type
            </label>
            <div className="flex items-center mt-2 space-x-11 pl-4">
              <label className="flex items-center text-[14px] font-normal text-ash">
                <input
                  type="radio"
                  name="interviewType"
                  value="Offline"
                  {...register("interviewType")}
                  className="mr-2"
                />
                Offline
              </label>
              <label className="flex items-center text-[14px] font-normal text-ash">
                <input
                  type="radio"
                  name="interviewType"
                  value="Online"
                  {...register("interviewType")}
                  className="mr-2"
                />
                Online
              </label>
            </div>
            {errors.interviewType && (
              <p className="text-[red] text-[11px]">
                {errors.interviewType.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <label className="text-dark_grey text-[14px] font-normal">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              {...register("venue")}
              className="w-full p-2 shadow-[0_1px_4px_1px_rgba(0,0,0,0.2)] rounded mt-1 outline-none"
            />
            {errors.venue && (
              <p className="text-[red] mt-1 text-[11px]">
                {errors.venue.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <label className="text-dark_grey text-[14px] font-normal">
              Assign Manager
            </label>
            <input
              type="text"
              name="interviewer"
              {...register("interviewer")}
              className="w-full p-2 shadow-[0_1px_4px_1px_rgba(0,0,0,0.2)] rounded mt-1 outline-none"
            />
            {errors.interviewer && (
              <p className="text-[red] mt-1 text-[11px]">
                {errors.interviewer.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <label className="text-dark_grey text-[14px] font-normal">
              Message
            </label>
            <textarea
              name="message"
              {...register("message")}
              className="w-full p-2 resize-none shadow-[0_1px_4px_1px_rgba(0,0,0,0.2)] rounded mt-1 outline-none"
            ></textarea>
            {errors.message && (
              <p className="text-[red]  text-[11px]">
                {errors.message.message}
              </p>
            )}
          </div>
          <div className="text-center mt-1 center">
            <button
              className="border-2 border-[#F7EC3D] text-dark_grey font-medium hover:bg-yellow py-1 px-2 rounded w-32"
              onClick={() => {
                onSubmit();
              }}
            >
              Send
            </button>
          </div>
          {notification && (
            <SpinLogo
              text="Notification Successfully Sent to HRD"
              notification={notification}
              path="/recrutiles/listofcandi"
            />
          )}
        </div>
      </div>
    </section>
  );
};
