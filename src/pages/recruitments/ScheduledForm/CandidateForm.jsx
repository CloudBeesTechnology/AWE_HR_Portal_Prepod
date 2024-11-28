import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updateInterviewScheduleSchema } from "../../../graphql/mutations";

export const CandidateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        id: Yup.string().required("ID is required"), // Ensure you pass the interview ID
        department: Yup.string().required("Department is required"),
      })
    ),
    defaultValues: {
      id: "", // This should be the ID of the schedule you're updating
      department: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedData = await client.graphql({
        query: updateInterviewScheduleSchema,
        variables: {
          input: {
            id: data.id, // Pass the ID of the interview schedule to update
            department: data.department, // Update only the department field
          },
        },
      });
      console.log("Update Successful:", updatedData);
      alert("Department updated successfully!");
    } catch (error) {
      console.error("Error updating department:", error);
      alert("Failed to update department.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Interview ID:
          <input
            type="text"
            {...register("id")}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter the interview schedule ID"
          />
          {errors.id && <p className="text-red-500">{errors.id.message}</p>}
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Department:
          <select
            {...register("department")}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Development">Development</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.department && (
            <p className="text-red-500">{errors.department.message}</p>
          )}
        </label>
      </div>
      <div className="center mt-10">
      <button
        type="submit"
         className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow">
        Submit
      </button>
      </div>
    </form>
  );
};

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { updateInterviewScheduleSchema } from './schemas'; // Import the schema

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
//             <p className="text-red-500">{errors.department.message}</p>
//           )}
//         </label>
//       </div>
//       <button
//         type="submit"
//         className="py-2 px-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
//       >
//         Update Department
//       </button>
//     </form>
//   );
// };


// // import React from 'react'

// // export const CandidateForm = () => {
// //   return (
// //     <div>CandidateForm</div>
// //   )
// // }
