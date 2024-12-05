// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { LuPlusSquare, LuMinusSquare } from "react-icons/lu";
// import { FormField } from "../../../utils/FormField";
// import { FileUploadField } from "../medicalDep/FileUploadField";
// import { GoUpload } from "react-icons/go";
// import { InsuranceInfoSchema } from "../../../services/EmployeeValidation";
// import { SpinLogo } from "../../../utils/SpinLogo";

// export const InsuranceInfo = () => {

//   const [notification, setNotification] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(InsuranceInfoSchema),
//     defaultValues: {
//       groupHSDetails: [{ groupHSNo: "", groupHSExp: "", isNew: false, groupHSUpload: null }], 
//       workmenCompDetails: [{ empStatusType: "", workmenCompNo: "", workmenCompExp: "", isNew: false, workmenCompUpload: null }],
//       travellingDetails: [{ travellingNo: "", travellingExp: "", isNew: false, travellingUpload: null }],
//       personalAccidentDetails: [{ personalAccNo: "", personalAccExp: "", isNew: false, personalAccUpload: null }],
//     },
//   });

//   const { fields: groupHSFields, append: appendGroupHS, remove: removeGroupHS } = useFieldArray({
//     control,
//     name: "groupHSDetails",
//   });

//   const { fields: workmenCompFields, append: appendWorkmenComp, remove: removeWorkmenComp } = useFieldArray({
//     control,
//     name: "workmenCompDetails",
//   });

//   const { fields: travellingFields, append: appendTravelling, remove: removeTravelling } = useFieldArray({
//     control,
//     name: "travellingDetails",
//   });

//   const { fields: personalAccidentFields, append: appendPersonalAccident, remove: removePersonalAccident } = useFieldArray({
//     control,
//     name: "personalAccidentDetails",
//   });

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     setValue("insInfUpload", file);

//     if (file) {
//       try {
//         await upload(file);
//       } catch (error) {
//         console.log("Error uploading file:", error);
//       }
//     }
//   };

//   const onSubmit = (data) => {
//     console.log("Form Data", data);
//     setNotification(true);

//   };

//   return (
//   <form onSubmit={handleSubmit(onSubmit)} className="mx-auto min-h-screen py-5 px-10 my-10 bg-[#F5F6F1CC]">

// <h3 className="mb-5 text-lg font-bold">Group H&S Insurance</h3>
// <div className="relative mb-5">
// <div className="grid grid-cols-3 gap-5 text-grey text_size_5">
//   <label>Policy Number</label>
//   <label>Expiry Date</label>
//   <label>Upload</label>
// </div>

// {groupHSFields.map((field, index) => (
//   <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
//     <FormField
//       name={`groupHSDetails.${index}.groupHSNo`}
//       type="text"
//       placeholder="Enter H&S Policy Number"
//       label=""
//       register={register}
//       errors={errors}
//     />
//     <FormField
//       name={`groupHSDetails.${index}.groupHSExp`}
//       type="date"
//       label=""
//       register={register}
//       errors={errors}
//       />
// <div className='mb-2'>
// <FileUploadField
//   onChangeFunc={(e) => handleFileChange(e, `groupHSDetails.${index}.groupHSUpload`)}
//   name={`groupHSDetails.${index}.groupHSUpload`}  
//   className="mt-2"
//   error={errors?.groupHSDetails?.[index]?.groupHSUpload?.message}
// />
// </div>
//     {index === 0 ? (
//       <button
//         type="button"
//         onClick={() =>
//           appendGroupHS({ groupHSNo: "", groupHSExp: "", groupHSUpload: null })
//         }
//         className="text-medium_grey text-[25px] absolute -right-9"
//       >
//         <LuPlusSquare />
//       </button>
//     ) : (
//       <button
//         type="button"
//         onClick={() => removeGroupHS(index)}
//         className="text-medium_grey text-[25px] absolute -right-9"
//       >
//         <LuMinusSquare />
//       </button>
//     )}
//   </div>
// ))}
// </div>

// <h3 className="mb-5 text-lg font-bold">Workmen Compensation Insurance</h3>
// <div className="relative mb-5">

//   <div className="grid grid-cols-4 gap-5 text-grey text_size_5">
//     <label>Employee Type</label>
//     <label>Policy Number</label>
//     <label>Expiry Date</label>
//     <label>Upload</label>
//   </div>
  
//   {workmenCompFields.map((field, index) => (
//     <div key={field.id} className="grid grid-cols-4 gap-4 items-center">
      
//       <FormField
//         name={`workmenCompDetails.${index}.empStatusType`}
//         register={register}
//         type="select"
//         options={[
//           { value: 'OffShore', label: 'OffShore' },
//           { value: 'OnShore', label: 'OnShore' },
//           { value: 'General', label: 'General' },
//         ]}
//         errors={errors}
//       />

//       <FormField
//         name={`workmenCompDetails.${index}.workmenCompNo`}
//         type="text"
//         placeholder="Enter Workmen Comp Policy No"
//         register={register}
//         errors={errors}
//       />

//       <FormField
//         name={`workmenCompDetails.${index}.workmenCompExp`}
//         type="date"
//         register={register}
//         errors={errors}
//       />

//       <div className='mb-2'>
//       <FileUploadField
//         name={`workmenCompDetails.${index}.workmenCompUpload`}
//         onChangeFunc={(e) => handleFileChange(e, `workmenCompDetails.${index}.workmenCompUpload`)}
//         label=""
//         error={errors[`workmenCompDetails.${index}.workmenCompUpload`]}
//      /></div>
//       {index === 0 ? (
//         <button
//           type="button"
//           onClick={() =>
//             appendWorkmenComp({
//               empStatusType: "",
//               workmenCompNo: "",
//               workmenCompExp: "",
//               workmenCompUpload: null })
//           }
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuPlusSquare />
//         </button>
//       ) : (
//         <button
//           type="button"
//           onClick={() => removeWorkmenComp(index)}
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuMinusSquare />
//         </button>
//       )}

//     </div>
//   ))}
// </div>



// <h3 className="mb-5 text-lg font-bold">Travelling Insurance</h3>
// <div className="relative mb-10">

//   <div className="grid grid-cols-3 gap-5 text-grey text_size_5">
//     <label>Policy Number</label>
//     <label>Expiry Date</label>
//     <label>Upload</label>
//   </div>

//   {travellingFields.map((field, index) => (
//     <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
      
//       <FormField
//         name={`travellingDetails.${index}.travellingNo`}
//         type="text"
//         placeholder="Enter Travelling Policy Number"
//         label=""
//         register={register}
//         errors={errors}
//         className="mt-2 p-[12px] bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
//       />

//       <FormField
//         name={`travellingDetails.${index}.travellingExp`}
//         type="date"
//         label=""
//         register={register}
//         errors={errors}
//         className="mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
//       />

//       <div className='mb-2'>
//       <FileUploadField
//         name={`travellingDetails.${index}.travellingUpload`}
//         onChangeFunc={(e) => handleFileChange(e, `travellingDetails.${index}.travellingUpload`)}
//         error={errors[`travellingDetails.${index}.travellingUpload`]}
//         className="w-full mt-2 flex items-center px-3 py-4 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer"
//       /> </div>


//       {index === 0 ? (
//         <button
//           type="button"
//           onClick={() =>
//             appendTravelling({
//               travellingNo: "",
//               travellingExp: "",
//               travellingUpload: null})
//           }
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuPlusSquare />
//         </button>
//       ) : (
//         <button
//           type="button"
//           onClick={() => removeTravelling(index)}
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuMinusSquare />
//         </button>
//       )}

//     </div>
//   ))}
// </div>


// <h3 className="mb-3 mt-6 text-lg font-bold">Personal Accident Insurance</h3>
// <div className="relative mb-10">

//   <div className="grid grid-cols-3 gap-5 text-grey text_size_5">
//     <label>Policy Number</label>
//     <label>Expiry Date</label>
//     <label>Upload</label>
//   </div>

//   {personalAccidentFields.map((field, index) => (
//     <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
      
//       <FormField
//         name={`personalAccidentDetails.${index}.personalAccNo`}
//         type="text"
//         placeholder="Enter Personal Accident Policy Number"
//         label=""
//         register={register}
//         errors={errors}
//       />

//       <FormField
//         name={`personalAccidentDetails.${index}.personalAccExp`}
//         type="date"
//         label=""
//         register={register}
//         errors={errors}
//       />

//       <div className='mb-2'>
//       <FileUploadField
//         name={`personalAccidentDetails.${index}.personalAccUpload`}
//         onChangeFunc={(e) => handleFileChange(e, `personalAccidentDetails.${index}.personalAccUpload`)}
//         error={errors[`personalAccidentDetails.${index}.personalAccUpload`]}
//       /></div>
//       {index === 0 ? (
//         <button
//           type="button"
//           onClick={() =>
//             appendPersonalAccident({
//               personalAccNo: "",
//               personalAccExp: "",
//               personalAccUpload: null,
//               isNew: false,
//             })
//           }
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuPlusSquare />
//         </button>
//       ) : (
//         <button
//           type="button"
//           onClick={() => removePersonalAccident(index)}
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuMinusSquare />
//         </button>
//       )}

//     </div>
//   ))}
// </div>
//       <div className="center my-10">
//         <button type="submit" className="primary_btn">
//           Save
//         </button>
//       </div>
//       {notification && (
//         <SpinLogo
//           text="Insurance Info Saved Successfully"
//           notification={notification}
//           path="/recrutiles/candidate"
//         />
//       )}
//     </form>
//   );
// };



