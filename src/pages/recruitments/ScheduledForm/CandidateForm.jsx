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
  const { mergedInterviewData, loading: interviewLoading } =
    useFetchInterview();
  const { interviewDetails } = UpdateInterviewData();
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const EMPID = localStorage.getItem("userID");
  const TODAY = new Date().toISOString().split("T")[0];

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
    setLoading(true);

    const selectedInterviewData = mergedInterviewData.find(
      (data) => data.tempID === candidate?.tempID
    );

    if (!selectedInterviewData) {
      setLoading(false);
      console.error("No interview data found for the selected candidate.");
      alert("No interview data found for the selected candidate.");
      return;
    }

    const interviewScheduleId = selectedInterviewData?.interviewSchedules?.id;

    if (!interviewScheduleId) {
      setLoading(false);
      alert("Interview schedule ID not found.");
      return;
    }

    const updatedByData = selectedInterviewData?.interviewSchedules;

    const previousUpdates = updatedByData?.updatedBy
      ? JSON.parse(updatedByData?.updatedBy)
      : [];

    const updatedBy = [...previousUpdates, { userID: EMPID, date: TODAY }];

    const orderedUpdatedBy = updatedBy?.map((entry) => ({
      userID: entry.userID,
      date: entry.date,
    }));

    try {
      await interviewDetails({
        InterviewValue: {
          id: interviewScheduleId,
          department: formData.interview.department,
          otherDepartment: formData.interview.otherDepartment,
          updatedBy: JSON.stringify(orderedUpdatedBy),
        },
      });

      setNotification(true);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting interview details:", error);
      alert("Failed to update interview details. Please try again.");
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

  return (
    <form onSubmit={handleSubmitCandy} className="p-4 relative">
      {/* Loading overlay for data fetching */}
      {interviewLoading && <LoadingOverlay />}
      <div className="mb-4 max-w-[400px]">
        <label className="block mb-2">
          Selected Position
          <input
            type="text"
            {...register("position")}
            className="w-full p-2 border rounded mt-1"
            value={formData.interview.position}
            onChange={(e) => handleInputChange("position", e.target.value)}
            disabled={interviewLoading}
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
            disabled={interviewLoading}
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
              disabled={interviewLoading}
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
          disabled={interviewLoading || loading}
        >
          {loading ? "Submitting..." : "Submit"}
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
