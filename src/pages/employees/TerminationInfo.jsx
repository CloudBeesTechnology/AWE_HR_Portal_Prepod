// import { useState } from "react";
// import { GoUpload } from "react-icons/go";
// import { uploadData } from "@aws-amplify/storage";


// export const TerminationInfo = ({ register, errors, setValue, control, watch }) => {
//   const [showInput, setShowInput] = useState(false);
//   const [inputValue, setInputValue] = useState("");

//   const [showOtherFields, setShowOtherFields] = useState({});
//   const [nameWorkFiles, setNameWorkFiles] = useState([]);
//   const [uploadworkFiles, setUploadWorkFiles] = useState([]);


//   const handleSelectChange = (fieldName, value) => {
//     setShowOtherFields((prev) => ({ ...prev, [fieldName]: value === "other" }));
//   };

//   const handleFileChange = async (e, label) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setNameWorkFiles((prev) => ({ ...prev, [label]: selectedFile.name }));  
//       setValue(label, selectedFile);  
//       await uploadAllDetails(selectedFile, label);
//     }
//   };

//   const uploadAllDetails = async (file, label) => {
//     try {
//       const result = await uploadData({
//         path: `uploadAllDetails/${file.name}`,
//         data: file,
//       }).result;
//       const filePath = result.path;
//       const encodedFilePath = encodeURIComponent(filePath);
//       const fileUrl = `https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;

//       console.log(`File uploaded successfully for ${label}. File URL:`, fileUrl);

//       setUploadWorkFiles((prevFiles) => [
//         ...prevFiles,
//         { label, fileUrl }, 
//       ]);
//     } catch (error) {
//       console.log("Error uploading file:", error);
//     }
//   };

//   const handleAddInput = () => {
//     setShowInput(true);
//   };

//   const terminationFields = [
//     { label: "Date of Resignation", name: "resignDate", type: "date" },
//     { label: "Date of Termination", name: "terminateDate", type: "date" },
//     {
//       label: "Resignation Notice during Probation",
//       name: "resignNotProb",
//       type: "select",
//       options: ["", "1 Week", "28 Working Days", "N/A", "Other"],
//     },
//     {
//       label: "Termination Notice during Probation",
//       name: "termiNotProb",
//       type: "select",
//       options: ["", "1 Week", "28 Working Days", "N/A", "Other"],
//     },
//     {
//       label: "Resignation Notice after Confirmation",
//       name: "resignNotConf",
//       type: "select",
//       options: ["", "1 Month", "3 Months", "N/A", "Other"],
//     },
//     {
//       label: "Termination Notice after Confirmation",
//       name: "termiNotConf",
//       type: "select",
//       options: ["", "1 Month", "3 Months", "N/A", "Other"],
//     },
//     { label: "Reason of Resignation", name: "reasonResign", type: "text" },
//     { label: "Reason of Termination", name: "reasonTerminate", type: "text" },
//     {
//       label: "Leave Passage Entitlement for Non-Local",
//       name: "leavePass",
//       type: "select",
//       options: [
//         "",
//         "Employee alone",
//         "Employee & Spouse",
//         "Employee, Spouse & Children (max 2 pax below age 18)",
//       ],
//     },
//     {
//       label: "Date of Leave Passage Entitlement",
//       name: "dateLeavePass",
//       type: "date",
//     },
//     {
//       label: "Duration Period of Leave Passage Entitlement",
//       name: "durLeavePass",
//       type: "text",
//     },
//     {
//       label: "Destination of Leave Passage Entitlement",
//       name: "destinateLeavePass",
//       type: "text",
//     },
//     { label: "Annual Leave Entitlement", name: "annualLeave", type: "text" },
//     { label: "Effective Date", name: "annualLeaveDate", type: "date" },
//     { label: "Sick Leave Entitlement", name: "sickLeave", type: "text" },
//     { label: "Effective Date", name: "sickLeaveDate", type: "date" },
//   ];

//   const workInfoUploads = [
//      { label: "Contract", name: "uploadCont", icon: <GoUpload /> },
//     { label: "Probation", name: "uploadProb", icon: <GoUpload /> },
//     { label: "Resignation", name: "uploadResign", icon: <GoUpload /> },
//     { label: "Termination", name: "uploadTerminate", icon: <GoUpload /> },
//     { label: "Leave Entitlement", name: "uploadLeave", icon: <GoUpload /> },
//   ];

//   const serviceRecords = [
//     { label: "Position Revision", name: "positionRev", type: "text" },
//     { label: "Effective Date", name: "positionRevDate", type: "date" },
//     { label: "Upload File", name: "uploadPR", type: "file" },
//     { label: "Salary Package Revision", name: "revSalary", type: "text" },
//     { label: "Effective Date", name: "revSalaryDate", type: "date" },
//     { label: "Upload File", name: "uploadSP", type: "file" },
//     { label: "Leave Passage Revision", name: "revLeavePass", type: "text" },
//     { label: "Effective Date", name: "revLeaveDate", type: "date" },
//     { label: "Upload File", name: "uploadLP", type: "file" },
//     { label: "Annual Leave Revison", name: "revAnnualLeave", type: "text" },
//     { label: "Effective date", name: "revALD", type: "date" },
//     { label: "Upload File", name: "uploadAL", type: "file" },
//     { label: "Change of Department", name: "depEmp", type: "text" },
//     { label: "Effective Date", name: "depEmpDate", type: "date" },
//     { label: "Upload File", name: "uploadDep", type: "file" },
//   ];

//   return (
//     <section >

// <div className="grid grid-cols-2 form-group gap-5">
//   {terminationFields.map((field, index) => (
//     <div key={index} className="form-group">
//       <label className="block text_size_5">{field.label}</label>
//       {field.type === "select" ? (
//         <>
//           <select
//             {...register(field.name)}
//             className="input-field select-custom"
//             onChange={(e) => handleSelectChange(field.name, e.target.value)}
//           >
//             {field.options.map((option, i) => (
//               <option
//                 key={i}
//                 value={option === "Select" ? "" : option.toLowerCase()}
//               >
//                 {option}
//               </option>
//             ))}
//           </select>
//           {showOtherFields[field.name] && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Please specify"
//                 {...register(`${field.name}_other`)}
//                 className="input-field"
//               />
//               <p className="text-[red] text-[13px] mt-1">
//                 {errors[`${field.name}_other`]?.message}
//               </p>
//             </>
//           )}
//         </>
//       ) : (
//         <input
//           type={field.type}
//           {...register(field.name)}
//           className="input-field"
//         />
//       )}
//       <p className="text-[red] text-[13px] mt-1">
//         {errors[field.name]?.message}
//       </p>
//     </div>
//   ))}
// </div>


//       <div className="grid grid-cols-5 gap-5 form-group mt-5">
//         {workInfoUploads.map((field, index) => (
//           <div key={index} className="form-group">
//             <h2 className="text_size_5">Upload</h2>
//             <label className="mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
//               <input
//                 type="file"
//                 className="hidden"
//                 accept=".pdf"
//                 {...register(field.name)}  // Registering each field for validation
//                 onChange={(e) => handleFileChange(e, field.label)}  // Handle file change for each field
//               />
//               <span className="ml-2 text-grey font-normal flex justify-between items-center gap-10">
//                 {field.icon}
//                 {field.label}
//               </span>
//             </label>

//             {nameWorkFiles[field.label] && (  // Display uploaded file name if available
//               <p className="text-grey mt-1 text-[12px]">
//                 Uploaded: {nameWorkFiles[field.label]}
//               </p>
//             )}

//             {errors[field.name] && (  // Displaying error if validation fails
//               <p className="text-[red] text-[13px] mt-1">{errors[field.name]?.message}</p>
//             )}
//           </div>
//         ))}
//       </div>
//       <hr />

//       <div className="form-group">
//         <p className="text_size_5 form-group text-medium_grey my-5">
//           Employee Service Record
//         </p>
//         <div className="grid grid-cols-3 gap-5">
//           {serviceRecords.map((field, index) => (
//             <div key={index} className="form-group">
//               <label className="block text_size_5">{field.label}</label>
//               {field.type === "text" || field.type === "date" ? (
//                 <input
//                   type={field.type}
//                   {...register(field.name)}
//                   className="input-field"
//                 />
//               ) : field.type === "file" ? (
//                 <label className="w-full max-w-[300px] mt-2 flex items-center px-3 py-[0.700rem] text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept=".pdf"
//                     {...register(field.name)}
//                   />
//                   <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20">
//                     <GoUpload /> PDF Only
//                   </span>
//                 </label>
//               ) : null}
//               {errors[field.name] && (
//                 <p className="text-[red] text-[13px] mt-1">
//                   {errors[field.name]?.message}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="md:col-span-2 form-group">
//           <label className="mb-1 text_size_5">Remarks for Work Info</label>
//           <textarea
//             {...register("remarksWorkInfo")}
//             className="resize-none w-full p-2 mt-1 border bg-lite_skyBlue border-lite_grey rounded-md outline-none"
//             rows="4"
//           ></textarea>
//           {errors.remarksWorkInfo && (
//             <p className="text-[red] text-[13px] mt-1">
//               {errors.remarksWorkInfo.message}
//             </p>
//           )}
//         </div>
//       </div>

//     </section>
//   );
// };
