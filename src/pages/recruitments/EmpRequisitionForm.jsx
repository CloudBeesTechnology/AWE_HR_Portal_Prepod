import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmpRequisitionSchema } from '../../services/Validation';
import AweLogo from '../../assets/logo/logo-with-name.svg';
import { VscClose } from "react-icons/vsc";
import { SpinLogo } from '../../utils/SpinLogo';
import { FormField } from "../../utils/FormField";
import { EmpReqDataFun } from '../../services/createMethod/EmpReqDataFun';

export const EmpRequisitionForm = ({ isVisible, onClose }) => {

  const { SubmitReqData } = EmpReqDataFun();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(EmpRequisitionSchema),
  });
  const [notification, setNotification] = useState(false);

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const EmpReqValue = {
        ...data,
        department: data.department,
        project: data.project,
        position: data.position,
        quantity: data.quantity,
        reasonForReq: data.reasonForReq,
        justification: data.justification,
        replacementFor: data.replacementFor,
        qualification: data.qualification,
        tentativeDate: data.tentativeDate,

      };

      await SubmitReqData({ EmpReqValue });
      setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      console.log(error);

      if (error?.errors) {
        error.errors.forEach((err, index) => {
          console.error(`GraphQL Error ${index + 1}:`, err.message);
          if (err.extensions) {
            console.error("Error Extensions:", err.extensions);
          }
        });
      }
    }
  };

  return (
    <div className="bg-white w-full max-w-[900px] rounded-lg relative">
      {/* Close icon */}
      <div className="flex gap-8 p-4">
        <img src={AweLogo} alt="Logo" className="max-w-[150px] w-full" />
        <h2 className="text-lg font-semibold">Apply for Employee Requisition</h2>
        <button onClick={onClose} className="absolute -top-4 -right-4 border rounded-full p-1">
          <VscClose size={20} />
        </button>
      </div>
      <div className="max-h-[450px] overflow-y-auto px-4">
        {/* Scrollable Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department */}
            <FormField
              label="Department"
              name="department"
              type="text"
              register={register}
              errors={errors}
            />

            {/* Project */}
            <FormField
              label="Project"
              name="project"
              type="text"
              register={register}
              errors={errors}
            />

            {/* Position */}
            <FormField
              label="Position"
              name="position"
              type="text"
              register={register}
              errors={errors}
            />

            {/* Quantity */}
            <FormField
              label="Quantity"
              name="quantity"
              type="text"
              register={register}
              errors={errors}
            />

            {/* Reason for Request */}
            <FormField
              label="Reason for Request"
              name="reasonForReq"
              type="select"
              register={register}
              errors={errors}
              options={[
                { value: 'Additional', label: 'Additional' },
                { value: 'Replacement', label: 'Replacement' },
              ]}
            />

            {/* Justification of Request */}
            <FormField
              label="Justification of Request"
              name="justification"
              type="text"
              register={register}
              errors={errors}
            />

            {/* If Replacement, for whom */}
            <FormField
              label="If Replacement, for whom"
              name="replacementFor"
              type="text"
              register={register}
              errors={errors}
            />

            {/* State Qualification Desired */}
            <FormField
              label="State Qualification Desired"
              name="qualification"
              type="text"
              register={register}
              errors={errors}
            />

            {/* Tentative Date to Mobilize */}
            <FormField
              label="Tentative Date to Mobilize"
              name="tentativeDate"
              type="date"
              register={register}
              errors={errors}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-4 pt-4">
            <button type="submit" className="primary_btn">
              Submit
            </button>
          </div>
          
          {/* Notification */}
          {notification && (
            <SpinLogo
              text="Your Requisition Submitted Successfully"
              notification={notification}
              path="/recrutiles/applymployreq"
            />
          )}
        </form>
      </div>
    </div>
  );
};

















// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useNavigate } from 'react-router-dom';
// import { EmpRequisitionSchema } from '../../services/Validation';
// import AweLogo from '../../assets/logo/logo-with-name.svg';
// import { VscClose } from "react-icons/vsc";


// export const EmpRequisitionForm = ({ onClose }) => {
//   const navigate = useNavigate();
  
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors } 
//   } = useForm({
//     resolver: yupResolver(EmpRequisitionSchema),
//   });

//   // Handle form submission
//   const onSubmit = (data) => {
//     console.log(data);
//     navigate("/recrutiles/employreq"); // Redirect after saving form
//   };

//   return (
//     <div className="bg-white w-full max-w-[900px] rounded-lg relative overflow-y-autoauto">
//       {/* Close icon */}
//       <div className="flex gap-8 p-4">
//         <img src={AweLogo} alt="Logo" className="max-w-[150px] w-full" />
//         <h2 className="text-lg font-semibold">Apply for Employee Requisition</h2>
//       <button onClick={onClose} className="absolute -top-4 -right-4  border rounded-full p-1">
//       <VscClose size={20} />
//       </button>
//       </div>
//       <div className="max-h-[500px] overflow-y-auto px-4"> {/* Scrollable Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="pb-5">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Department */}
//             <div>
//               <label className="block mb-1">Department</label>
//               <input
//                 type="text"
//                 {...register('department')}
//                 className="input-field"
//               />
//               {errors.department && <p className="text-[red] text-[13px]">{errors.department.message}</p>}
//             </div>
//             {/* Project */}
//             <div>
//               <label className="block mb-1">Project</label>
//               <input
//                 type="text"
//                 {...register('project')}
//                 className="input-field"
//               />
//               {errors.project && <p className="text-[red] text-[13px]">{errors.project.message}</p>}
//             </div>
//             {/* Position */}
//             <div>
//               <label className="block mb-1">Position</label>
//               <input
//                 type="text"
//                 {...register('position')}
//                 className="input-field"
//               />
//               {errors.position && <p className="text-[red] text-[13px]">{errors.position.message}</p>}
//             </div>
//             {/* Quantity */}
//             <div>
//               <label className="block mb-1">Quantity</label>
//               <input
//                 type="text"
//                 {...register('quantity')}
//                 className="input-field"
//               />
//               {errors.quantity && <p className="text-[red] text-[13px]">{errors.quantity.message}</p>}
//             </div>
//             {/* Reason for Request */}
//             <div>
//               <label className="block mb-1">Reason for Request</label>
//               <select
//                 {...register('reasonForRequest')}
//                 className="input-field select-custom"
//               >
//                 <option></option>
//                 <option value="Additional">Additional</option>
//                 <option value="Replacement">Replacement</option>
//               </select>
//               {errors.reasonForRequest && <p className="text-[red] text-[13px]">{errors.reasonForRequest.message}</p>}
//             </div>
//             {/* Justification of Request */}
//             <div>
//               <label className="block mb-1">Justification of Request</label>
//               <input
//                 type="text"
//                 {...register('justification')}
//                 className="input-field"
//               />
//               {errors.justification && <p className="text-[red] text-[13px]">{errors.justification.message}</p>}
//             </div>
//             {/* If Replacement, for whom */}
//             <div>
//               <label className="block mb-1">If Replacement, for whom</label>
//               <input
//                 type="text"
//                 {...register('replacementFor')}
//                 className="input-field"
//               />
//               {errors.replacementFor && <p className="text-[red] text-[13px]">{errors.replacementFor.message}</p>}
//             </div>
//             {/* State Qualification Desired */}
//             <div>
//               <label className="block mb-1">State Qualification Desired</label>
//               <input
//                 type="text"
//                 {...register('qualification')}
//                 className="input-field"
//               />
//               {errors.qualification && <p className="text-[red] text-[13px]">{errors.qualification.message}</p>}
//             </div>
//             {/* Tentative Date to Mobilize */}
//             <div>
//               <label className="block mb-1">Tentative Date to Mobilize</label>
//               <input
//                 type="date"
//                 {...register('tentativeDate')}
//                 className="input-field"
//               />
//               {errors.tentativeDate && <p className="text-[red] text-[13px]">{errors.tentativeDate.message}</p>}
//             </div>
//           </div>
//           {/* Action Buttons */}
//           <div className="flex justify-center items-center gap-4 pt-4">
//             <button type="submit" className="primary_btn">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


