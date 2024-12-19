import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InterviewScheduleSchema } from "../../../services/Validation";
import { generateClient } from "@aws-amplify/api";
import { SpinLogo } from "../../../utils/SpinLogo";
import { SubmitInterviewSchedule } from "../../../services/createMethod/SubmitInterviewSchedule";
import { FormField } from "../../../utils/FormField";
import { LocalMobilization } from "../../../services/createMethod/CreateLOI";

// const client = generateClient();

export const ScheduleInter = ({ candidate, onClose }) => {
  const [notification, setNotification] = useState(false);
    const { localMobilization } =
      LocalMobilization(); // Use the custom hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(InterviewScheduleSchema),
  });

  const { createSchedule } = SubmitInterviewSchedule();

  const onSubmit = handleSubmit(async (data) => {
    const formattedData = {
      ...data,
      interDate: new Date(data.interDate),
      tempID: candidate.tempID,
      candidateStatus: "pending",
    }; 

    const mobilizationData = {
      tempID: candidate.tempID,
      // Include other required fields for localMobilization
    };
  

    console.log("Formatted Data:", formattedData);
    console.log("Mobilization Data:", mobilizationData);

    // setNotification(true);
    await createSchedule(formattedData);
    await localMobilization(mobilizationData)
  });

  return (
    <section className="min-h-screen bg-opacity-80 w-full center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[500px] overflow-y-auto ">
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
          <div className="mt-2">
            <label className="text-dark_grey text-[16px] underline font-semibold">
              Interview Type
            </label>
            <div className="flex items-center mt-2 space-x-11 pl-4">
              <label className="flex items-center text-[14px] font-normal text-ash">
                <input
                  type="radio"
                  name="interType"
                  value="Offline"
                  {...register("interType")}
                  className="mr-2"
                />
                Offline
              </label>
              <label className="flex items-center text-[14px] font-normal text-ash">
                <input
                  type="radio"
                  name="interType"
                  value="Online"
                  {...register("interType")}
                  className="mr-2"
                />
                Online
              </label>
            </div>
            {errors.interType && (
              <p className="text-[red] text-[11px]">
                {errors.interType.message}
              </p>
            )}
          </div>
          <FormField
            name="venue"
            type="text"
            label="Venue"
            placeholder="Enter Venue"
            register={register}
            errors={errors}
          />
          <div className="mt-4">
            <label className="text-dark_grey text-[16px] underline font-semibold block mb-2">
              Assign Interviewer :
            </label>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="bagdeNo"
                type="text"
                label="Badge No"
                placeholder="Enter Badge Number"
                register={register}
                errors={errors}
              />
              <FormField
                name="manager"
                type="text"
                label="Manager Name"
                placeholder="Enter Manager Name"
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <FormField
            name="message"
            type="textarea"
            label="Message"
            placeholder="Enter Message"
            register={register}
            errors={errors}
          />
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
