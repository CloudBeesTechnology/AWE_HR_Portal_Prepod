import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updateInterviewSchedule } from "../../../graphql/mutations";
import { DepartmentDD } from "../../../utils/DropDownMenus";
import { generateClient } from "@aws-amplify/api";
import { useContext, useEffect, useState } from "react";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { DataSupply } from "../../../utils/DataStoredContext";

const client = generateClient();

export const CandidateForm = () => {
  const { mergedInterviewData } = useFetchInterview();
  const { interviewDetails } = UpdateInterviewData();
  const { IVSSDetails } = useContext(DataSupply);
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
    handleSubmit,
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

  console.log("DATA 3.0", mergedInterviewData);

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
      setFormData({
        interview: {
          position: interviewData.personalDetails.position,
          department: interviewData.department,
          otherDepartment: interviewData.otherDepartment,
        },
      });
    }
  }, [mergedInterviewData]);

  // Function to handle changes for non-file fields
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

    try {
      await interviewDetails({
        InterviewValue: {
          id: IVSSDetails[0]?.id, // Make sure the ID is available
          interDate: formData.interview.date,
          interTime: formData.interview.time,
          venue: formData.interview.venue,
          interType: formData.interview.interviewType,
          bagdeNo: "", // Add any required field
          message: formData.interview.message,
          manager: formData.interview.interviewer,
          candidateStatus: "", // Add appropriate status
          status: "", // Add status if needed
          department: formData.interview.department, // Add department if necessary
          otherDepartment: formData.interview.otherDepartment, // Add other department if needed
        },
      });
      console.log("Data stored successfully...");
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
            value={formData.interview.position} // Use formData.interview.position
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
            value={formData.interview.department} // Ensuring correct department is selected
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

      {/* Render the manual input for "Other Department" if "Other" is selected */}
      {watch("department") === "Other" && (
        <div className="mb-4 max-w-[400px]">
          <label className="block mb-2">
            Other Department:
            <input
              type="text"
              {...register("otherDepartment")}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter the department name"
              value={formData.interview.otherDepartment} // Ensuring correct input is set
              onChange={(e) => handleInputChange("otherDepartment", e.target.value)}
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
          className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { updateInterviewSchedule } from './schemas'; // Import the schema

// export const UpdateDepartmentForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(updateInterviewScheduleSchema),
//     defaultValues: {
//       department: '',
//     },
//   });

//   const onSubmit = (data) => {
//     console.log('Updated Department:', data);
//     // Add logic to update the department (e.g., API call)
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="p-4">
//       <div className="mb-4">
//         <label className="block mb-2 font-medium">
//           Department:
//           <select
//             {...register('department')}
//             className="w-full p-2 border rounded mt-1"
//           >
//             <option value="">Select Department</option>
//             <option value="HR">HR</option>
//             <option value="Finance">Finance</option>
//             <option value="Development">Development</option>
//             <option value="Sales">Sales</option>
//           </select>
//           {errors.department && (
//             <p className="text-[red]">{errors.department.message}</p>
//           )}
//         </label>
//       </div>
//       <button
//         type="submit"
//         className="py-2 px-4 bg-b[lue] text-white rounded shadow hover:bg-blue-600"
//       >
//         Update Department
//       </button>
//     </form>
//   );
// };

// // import React from 'react'

// // export const CandpositionateForm = () => {
// //   return (
// //     <div>CandpositionateForm</div>
// //   )
// // }
