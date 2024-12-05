import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updateInterviewSchedule } from "../../../graphql/mutations";
import { DepartmentDD } from "../../../utils/DropDownMenus";
import { generateClient } from "@aws-amplify/api";

const client=generateClient()

export const CandidateForm = () => {
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

  const departmentValue = watch("department"); // Monitor the value of the department dropdown

  const onSubmit = async (data) => {
    try {
      const updatedData = await client.graphql({
        query: updateInterviewSchedule,
        variables: {
          input: {
            position: data.position,
            department:
              data.department === "Other" ? data.otherDepartment : data.department,
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
      <div className="mb-4 max-w-[400px]">
        <label className="block mb-2">
          Selected Position
          <input
            type="text"
            {...register("position")}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.position && <p className="text-[red]">{errors.position.message}</p>}
        </label>
      </div>

      <div className="mb-4 max-w-[400px]">
        <label className="block mb-2">
         Selected Department:
          <select
            {...register("department")}
            className="w-full p-2 border rounded mt-1"
          >
            <option value=""></option>
            {DepartmentDD.map((dept,idx) => (
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
