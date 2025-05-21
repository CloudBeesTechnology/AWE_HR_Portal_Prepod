import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DepartmentDD } from "../../../utils/DropDownMenus";
import { useEffect, useState } from "react";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { SpinLogo } from "../../../utils/SpinLogo";

export const CandidateForm = ({ candidate }) => {
  const { mergedInterviewData } = useFetchInterview();
  const { interviewDetails } = UpdateInterviewData();
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      position: "",
      department: "",
      otherDepartment: "",
    },
  });

  const {
    register,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        position: Yup.string().required("Position is required"),
        department: Yup.string().required("Department is required"),
        otherDepartment: Yup.string().when("department", {
          is: "Other",
          then: Yup.string().required("Please specify the department"),
        }),
      })
    ),
    defaultValues: {
      position: "",
      department: "",
      otherDepartment: "",
    },
  });

  useEffect(() => {
    if (mergedInterviewData.length > 0 && candidate?.tempID) {
      const interviewData = mergedInterviewData.find(
        (data) => data.tempID === candidate.tempID
      );
      if (interviewData) {
        setFormData({
          interview: {
            position: interviewData.position,
            department: interviewData.interviewSchedules?.department,
            otherDepartment: interviewData.interviewSchedules?.otherDepartment,
          },
        });
      }
    }
  }, [mergedInterviewData, candidate?.tempID]);


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        [field]: value,
      },
    }));
  };

  const handleSubmitCandy = async (e) => {
    e.preventDefault();

    const selectedInterviewData = mergedInterviewData.find(
      (data) => data.tempID === candidate?.tempID
    );

    if (!selectedInterviewData) {
      console.error("No interview data found for the selected candidate.");
      alert("No interview data found for the selected candidate.");
      return;
    }

    const interviewScheduleId = selectedInterviewData?.interviewSchedules?.id;

    if (!interviewScheduleId) {
      alert("Interview schedule ID not found.");
      return;
    }

    try {
      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleId,
          department: formData.interview.department,
          otherDepartment: formData.interview.otherDepartment,
        },
      });

      setNotification(true);
    } catch (error) {
      console.error("Error submitting interview details:", error);
      alert("Failed to update interview details. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmitCandy} className="p-4">
      <div className="mb-4 max-w-[400px]">
        <label className="block mb-2">
          Selected Position
          <input
            type="text"
            {...register("position")}
            className="w-full p-2 border rounded mt-1"
            value={formData.interview.position}
            onChange={(e) => handleInputChange("position", e.target.value)}
          />
          {errors.position && (
            <p className="text-[red]">{errors.position.message}</p>
          )}
        </label>
      </div>

      <div className="mb-4 max-w-[400px]">
        <label className="block mb-2">
          Selected Department:
          <select
            {...register("department")}
            className="w-full p-2 border rounded mt-1"
            value={formData.interview.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
          >
            <option value=""></option>
            {DepartmentDD.map((dept, idx) => (
              <option key={idx} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-[red]">{errors.department.message}</p>
          )}
        </label>
      </div>

      {watch("department") === "Other" && (
        <div className="mb-4 max-w-[400px]">
          <label className="block mb-2">
            Other Department:
            <input
              type="text"
              {...register("otherDepartment")}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter the department name"
              value={formData.interview.otherDepartment}
              onChange={(e) =>
                handleInputChange("otherDepartment", e.target.value)
              }
            />
            {errors.otherDepartment && (
              <p className="text-[red]">{errors.otherDepartment.message}</p>
            )}
          </label>
        </div>
      )}

      <div className="center mt-10">
        <button
          type="submit"
          className="py-2 px-12 font-medium rounded shadow-lg bg-yellow hover:bg-yellow"
        >
          Submit
        </button>
      </div>
      {notification && (
        <SpinLogo
          text="Candidate Updated Successfully"
          notification={notification}
          path="/recrutiles/status"
        />
      )}
    </form>
  );
};
