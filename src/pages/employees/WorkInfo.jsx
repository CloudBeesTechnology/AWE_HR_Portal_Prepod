// import React, { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Link, useOutletContext } from "react-router-dom";
// import { WorkInfoSchema } from "../../services/EmployeeValidation";
// import { FaArrowLeft } from "react-icons/fa";
// import { SearchDisplay } from "../../utils/SearchDisplay";
// import { IoSearch } from "react-icons/io5";
// import { WorkInfoFunc } from "../../services/createMethod/WorkInfoFunc";
// import { WorkDataPass } from "../employees/WorkDataPass";
// import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
// import { FormField } from "../../utils/FormField";
// import { DataSupply } from "../../utils/DataStoredContext";
// import { DepartmentDD, JobCatDD, workInfoUploads } from "../../utils/DropDownMenus";
// import { UploadingFiles } from "../employees/medicalDep/FileUploadField";
// import { SpinLogo } from "../../utils/SpinLogo";
// import { UpdateWIData } from "../../services/updateMethod/UpdateWIData";

// export const WorkInfo = () => {
//   const { WIUpdateData } = UpdateWIData();
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   const { empPIData, terminateData, workInfoData, leaveDetailsData, SRData } = useContext(DataSupply);

//   const { SubmitWIData } = WorkInfoFunc();

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(WorkInfoSchema),
//   });

//   const [notification, setNotification] = useState(false);
//   const [userDetails, setUserDetails] = useState([]);
//   const [allEmpDetails, setAllEmpDetails] = useState([]);

//   const empID = watch("empID");
//   const [empName, setEmpName] = useState("");
//   const [sapNo, setSapNo] = useState("");


//    // Watch specific fields
//    const department = watch("department");
//    const position = watch("position");
//    const jobCat = watch("jobCat");

//   useEffect(() => {
//     console.log(empPIData, "empPIData");
//     empPIData.map((items) => {
//       if (empID === items.empID) {
//         setEmpName(items.name);
//         setSapNo(items.sapNo);
//       }
//     });
//   }, [empID, empPIData]);

//   const [uploadedFileNames, setUploadedFileNames] = useState({
//     uploadPR: null,
//     uploadSP: null,
//     uploadLP: null,
//     uploadAL: null,
//     uploadDep: null,
//   });

//   const [nameServiceUp, setNameServiceUp] = useState({
//     uploadPR: null,
//     uploadSP: null,
//     uploadLP: null,
//     uploadAL: null,
//     uploadDep: null,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const mergedData = empPIData
//           .map((emp) => {
//             const WIDetails = workInfoData.find((user) => user.empID === emp.empID);
//             const TDetails = terminateData.find((user) => user.empID === emp.empID);
//             const LDDetails = leaveDetailsData.find((user) => user.empID === emp.empID);
//             const SRDetails = SRData.find((user) => user.empID === emp.empID);

//             if (!WIDetails || !TDetails || !LDDetails || !SRDetails) return null;

//             return { ...emp, ...WIDetails, ...TDetails, ...LDDetails, ...SRDetails };
//           })
//           .filter(Boolean);

//         setUserDetails(mergedData);
//         setAllEmpDetails(mergedData);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, [empPIData, terminateData, workInfoData, leaveDetailsData, SRData]);

//   const handleFileChange = async (e, fieldName, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.type !== "application/pdf") {
//       alert("Upload must be a PDF file");
//       return;
//     }
//     setValue(fieldName, file);

//     try {
//       await uploadDocs(file, fieldName, setNameServiceUp);

//       setUploadedFileNames((prev) => ({
//         ...prev,
//         [fieldName]: file.name, // Store only the file name
//       }));
//     } catch (error) {
//       console.error("File upload error:", error);
//     }
//   };

//   const [uploadedDocs, setUploadedDocs] = useState([]);
//   const handleFileArray = async (e, label) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;
//     const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
//     if (!allowedTypes.includes(selectedFile.type)) {
//       alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
//       return;
//     }

//     setValue(label, selectedFile); // Set the file value for validation

//     try {
//       await uploadDocs(selectedFile, label, setUploadedDocs, empName);
//       setUploadedFileNames((prev) => ({ ...prev, [label]: selectedFile.name }));
//     } catch (error) {
//       console.error("File upload failed:", error);
//     }
//   };
//   const [showOtherFields, setShowOtherFields] = useState({
//     department: false,
//     position: false,
//     jobCat: false,
//   });

//   const handleSelectChange = (fieldName, value) => {
//     setShowOtherFields((prev) => ({
//       ...prev,
//       [fieldName]: value === "Other", 
//     }));
//   };
  

//   const getLastValue = (value) =>
//     Array.isArray(value) ? value[value.length - 1] : value;

//   const searchResult = (result) => {
//     console.log(result);

//     const keysToSet = [
//       "empID",
//       "doj",
//       "skillPool",
//       "probationStart",
//       "probationEnd",
//       "resignDate",
//       "termiDate",
//       "resignNotProb",
//       "otherResignNotProb",
//       "termiNotProb",
//       "otherTermiNotProb",
//       "resignNotConf",
//       "otherResignNotConf",
//       "termiNotConf",
//       "otherTermiNotConf",
//       "reasonResign",
//       "reasonTerminate",
//       "sickLeave",
//       "sickLeaveDate",
//       "mrageLeave",
//       "mrageLeaveDate",
//       "compasLeave",
//       "compasLeaveDate",
//       "workInfoUploads",
//       "sapNo",
//     ];

//     keysToSet.forEach((key) => {
//       setValue(key, result[key]);
//     });
//         const fields = [
//           "department",
//       "otherDepartment",
//       "position",
//       "otherPosition",
//       "jobCat",
//       "otherJobCat",
//           "jobDesc",
//           "relationship",
//           "hr",
//           "manager",
//           "supervisor",
//           "upgradePosition",
//           "upgradeDate",
//           "contractPeriod",
//           "contractStart",  
//           "paterLeaveDate",    
//       "contractEnd",
//       "workStatus",
//       "workHrs",
//       "workWeek",
//       "workMonth",
//       "salaryType",
//       "leavePass",
//       "dateLeavePass",
//       "destinateLeavePass",
//       "durLeavePass",
//       "annualLeave",
//       "annualLeaveDate",
//       "materLeave",
//       "materLeaveDate",
//       "paterLeave",
//       "positionRev",
//       "positionRevDate",          
//       "revSalary",
//       "revSalaryDate",
//       "revLeavePass",
//       "revLeaveDate",
//       "revAnnualLeave",
//       "revALD",
//       "depEmp",
//       "depEmpDate",
//       "remarkWI",
//       "uploadPR",
//       "uploadSP",
//       "uploadLP",
//       "uploadAL",
//       "uploadDep",

      
//     ];
//     fields.forEach((field) => setValue(field, getLastValue(result[field])));
//   };

//   // const onSubmit = async (data) => {
//   //   console.log(data);
    
//   //   try {
//   //     const checkingPITable = empPIData.find((match) => match.empID === data.empID);
//   //     // Consolidate data from multiple sources
//   //     const terminateDataRecord = terminateData.find((match) => match.empID === data.empID);
//   //     const workInfoDataRecord = workInfoData.find((match) => match.empID === data.empID);
//   //     const leaveDetailsDataRecord = leaveDetailsData.find((match) => match.empID === data.empID);
//   //     const SRDataRecord = SRData.find((match) => match.empID === data.empID);
  
//   //     // Check if all datasets have an entry for this empID
//   //     const checkingIDTable = terminateDataRecord && workInfoDataRecord && leaveDetailsDataRecord && SRDataRecord;
  
//   //     if (checkingIDTable && checkingPITable) {
//   //       const workInfoUpValue = {
//   //         ...data,
//   //         sapNo: sapNo,
//   //         workInfoUploads: uploadedDocs,
//   //         uploadPR: nameServiceUp.uploadPR,
//   //         uploadSP: nameServiceUp.uploadSP,
//   //         uploadLP: nameServiceUp.uploadLP,
//   //         uploadAL: nameServiceUp.uploadAL,
//   //         uploadDep: nameServiceUp.uploadDep,
//   //         // terminateData: terminateDataRecord,        // Add terminateData
//   //         // workInfoData: workInfoDataRecord,          // Add workInfoData
//   //         // leaveDetailsData: leaveDetailsDataRecord,  // Add leaveDetailsData
//   //         // SRData: SRDataRecord,                      // Add SRData
//   //         PITableID: checkingPITable.id,
//   //         IDTable: checkingIDTable.id,
//   //       };
//   //       console.log(workInfoUpValue);

//   //       await WIUpdateData({ workInfoUpValue });
//   //       // setShowTitle("Employee Personal Info updated successfully");
//   //       // setNotification(true);
//   //     } else {
//   //       const workInfoValue = {
//   //         ...data,
//   //         sapNo: sapNo,
//   //         workInfoUploads: uploadedDocs,
//   //         uploadPR: nameServiceUp.uploadPR,
//   //         uploadSP: nameServiceUp.uploadSP,
//   //         uploadLP: nameServiceUp.uploadLP,
//   //         uploadAL: nameServiceUp.uploadAL,
//   //         uploadDep: nameServiceUp.uploadDep,
//   //       };
//   //       console.log(workInfoValue);
        
//   //       await SubmitWIData({ workInfoValue });
//   //       // setShowTitle("Employee Personal Info saved successfully");
//   //       // setNotification(true);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
      
//   //     console.error("Error submitting data to AWS:", JSON.stringify(error, null, 2));
//   //   }
//   // };
//   const onSubmit = async (data) => {
//     console.log("Form data received in onSubmit:", data);

//     try {
//         const checkingPITable = empPIData.find((match) => match.empID === data.empID);
//         const terminateDataRecord = terminateData.find((match) => match.empID === data.empID);
//         const workInfoDataRecord = workInfoData.find((match) => match.empID === data.empID);
//         const leaveDetailsDataRecord = leaveDetailsData.find((match) => match.empID === data.empID);
//         const SRDataRecord = SRData.find((match) => match.empID === data.empID);

//         // Ensure all data sources exist
//         const checkingIDTable = terminateDataRecord && workInfoDataRecord && leaveDetailsDataRecord && SRDataRecord;

//         if (checkingIDTable && checkingPITable) {
//             // Update the existing entry
//             const workInfoUpValue = {
//                 ...data,
//                 sapNo: sapNo,
//                 workInfoUploads: uploadedDocs,
//                 uploadPR: nameServiceUp.uploadPR,
//                 uploadSP: nameServiceUp.uploadSP,
//                 uploadLP: nameServiceUp.uploadLP,
//                 uploadAL: nameServiceUp.uploadAL,
//                 uploadDep: nameServiceUp.uploadDep,
//                 PITableID: checkingPITable.id, // Link to personal info
//                 IDTable: checkingIDTable.id,  // Link to work info, etc.
//             };
//             console.log("Prepared workInfoUpValue for update:", workInfoUpValue);

//             await WIUpdateData({ workInfoUpValue });
//             console.log("Update completed successfully");
//         } else {
//             // Create new entry if the data is not found
//             const workInfoValue = {
//                 ...data,
//                 sapNo: sapNo,
//                 workInfoUploads: uploadedDocs,
//                 uploadPR: nameServiceUp.uploadPR,
//                 uploadSP: nameServiceUp.uploadSP,
//                 uploadLP: nameServiceUp.uploadLP,
//                 uploadAL: nameServiceUp.uploadAL,
//                 uploadDep: nameServiceUp.uploadDep,
//             };
//             console.log("Prepared workInfoValue for submission:", workInfoValue);

//             await SubmitWIData({ workInfoValue });
//             console.log("New entry created successfully");
//         }
//     } catch (error) {
//         console.error("Error submitting data:", error);
//     }
// };

  
//   return (
//     <section className="bg-[#F5F6F1CC] mx-auto p-10">
//       <div className="w-full flex items-center justify-between gap-5">
//         <Link to="/employee" className="text-xl flex-1 text-grey">
//           <FaArrowLeft />
//         </Link>
//         <p className="flex-1 text-center mt-2 text_size_2 uppercase">
//           Work Info
//         </p>
//         <div className="flex-1">
//           <SearchDisplay
//             searchResult={searchResult}
//             newFormData={allEmpDetails}
//             searchIcon2={<IoSearch />}
//             placeholder="Employee Id"
//             rounded="rounded-lg"
//           />
//         </div>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className=" mt-20 bg-[#F5F6F1CC]">
//       <div className="flex justify-end items-center mt-5">
//         <div>
//           <FormField
//             label="Employee ID"
//             type="text"
//             name="empID"
//             placeholder="Enter Employee ID"
//             errors={errors}
//             register={register}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-5 form-group mt-2">
//         <div>
//           <FormField
//             label="Department"
//             type="select"
//             name="department"
//             select="Select Department"
//             options={[...DepartmentDD]} // Ensure "Other" is in the options
//             errors={errors}
//             register={register}
//             onChange={(e) => {
//               handleSelectChange("department", e.target.value);  // Update visibility of "Other" input
//               register("department").onChange(e); // Ensures proper registration
//             }}
//           />
//         </div>

//         {/* Conditionally render the "Other Department" input field */}
//         {showOtherFields.department && department === "Other" && (
//           <div>
//             <FormField
//               label="Other Department"
//               type="text"
//               name="otherDepartment"
//               placeholder="Enter Department"
//               errors={errors}
//               register={register}
//             />
//           </div>
//         )}
//       </div>

//       {/* Position Field */}
//       <div className="grid grid-cols-2 gap-5 form-group mt-2">
//         <div>
//           <FormField
//             label="Position"
//             type="select"
//             name="position"
//             select="Select Position"
//             options={[
//               ...WorkDataPass.positions.map((position) => ({
//                 value: position,
//                 label: position,
//               })),
//               // { value: "Other", label: "Other" },
//             ]}
//             errors={errors}
//             register={register}
//             onChange={(e) => {
//               handleSelectChange("position", e.target.value);  // Update visibility of "Other" input
//               register("position").onChange(e); // Ensures proper registration
//             }}
//           />
//         </div>

//         {/* Conditionally render the "Other Position" input field */}
//         {showOtherFields.position && position === "Other" && (
//           <div>
//             <FormField
//               label="Other Position"
//               type="text"
//               name="otherPosition"
//               placeholder="Enter Position"
//               errors={errors}
//               register={register}
//             />
//           </div>
//         )}
//       </div>

//       {/* Job Category Field */}
//       <div className="grid grid-cols-2 gap-5 form-group mt-2">
//         <div>
//           <FormField
//             label="Job Category"
//             type="select"
//             name="jobCat"
//             select="Select Job Category"
//             options={[...JobCatDD]} // Ensure "Other" is in the options
//             errors={errors}
//             register={register}
//             onChange={(e) => {
//               handleSelectChange("jobCat", e.target.value);  // Update visibility of "Other" input
//               register("jobCat").onChange(e); // Ensures proper registration
//             }}
//           />
//         </div>

//         {/* Conditionally render the "Other Job Category" input field */}
//         {showOtherFields.jobCat && jobCat === "Other" && (
//           <div>
//             <FormField
//               label="Other Job Category"
//               type="text"
//               name="otherJobCat"
//               placeholder="Enter Job Category"
//               errors={errors}
//               register={register}
//             />
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-3 gap-5 form-group mt-5">
//         {WorkDataPass.workFields.map((field, index) => (
//           <div key={index} className="form-group">
//             <label className="mb-1 text_size_5">{field.label}</label>
//             {field.type === "select" ? (
//               <select
//                 {...register(field.name)}
//                 className="input-field select-custom"
//                 watch={watch(field.name)}
//               >
//                 {(field.options || []).map((option, i) => (
//                   <option key={i} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 type={field.type}
//                 {...register(field.name)}
//                 className="input-field"
//               />
//             )}
//             {errors[field.name] && (
//               <p className="text-[red] text-[13px] mt-1">
//                 {errors[field.name]?.message}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//       <hr className="text-lite_grey mb-5" />

//       <div className="form-group">
//         <p className="text_size_3 form-group text-medium_grey my-5">
//           Employee Leave Info
//         </p>
//         <div className="grid grid-cols-2 gap-5 form-group mt-5">
//           {WorkDataPass.leaveBasic.map((field, index) => (
//             <div key={index} className="form-group">
//               <label className="mb-1 text_size_5">{field.label}</label>
//               {field.type === "select" ? (
//                 <select
//                   {...register(field.name)}
//                   className="input-field select-custom"
//                 >
//                   {(field.options || []).map((option, i) => (
//                     <option key={i} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   type={field.type}
//                   {...register(field.name)}
//                   className="input-field"
//                 />
//               )}
//               {errors[field.name] && (
//                 <p className="text-[red] text-[13px] mt-1">
//                   {errors[field.name]?.message}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="grid grid-cols-4 gap-5 form-group mt-5">
//           {WorkDataPass.leaveFields.map((field, index) => (
//             <div key={index} className="form-group">
//               <label className="mb-1 text_size_5">{field.label}</label>
//               {field.type === "select" ? (
//                 <select
//                   {...register(field.name)}
//                   className="input-field select-custom"
//                 >
//                   {(field.options || []).map((option, i) => (
//                     <option key={i} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   type={field.type}
//                   {...register(field.name)}
//                   className="input-field"
//                 />
//               )}
//               {errors[field.name] && (
//                 <p className="text-[red] text-[13px] mt-1">
//                   {errors[field.name]?.message}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <hr className="text-lite_grey mb-5" />

//       <div className="form-group">
//         <p className="text_size_3 form-group text-medium_grey my-5">
//           Employee Exit Info
//         </p>
//         <div className="grid grid-cols-2 form-group gap-5">
//   {WorkDataPass.terminationFields.map((field, index) => (
//     <div key={index} className="form-group">
//       <label className="block text_size_5">{field.label}</label>
//       {field.type === "select" ? (
//         <>
//           <select
//             {...register(field.name)}
//             className="input-field select-custom"
//             onChange={(e) =>
//               handleSelectChange(field.name, e.target.value)
//             }
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
//                 {...register(`other${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`)}
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

//       </div>

//       <div className="grid grid-cols-5 gap-5 form-group mt-5">
//         {workInfoUploads.map((field, index) => (
//           <div key={index} className="form-group">
//             <h2 className="text_size_5">Upload</h2>
//             <label className="mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
//               <input
//                 type="file"
//                 className="hidden"
//                 accept=".pdf"
//                 // {...register(field.name)}
//                 onChange={(e) => handleFileArray(e, field.label)}
//               />
//               <span className="ml-2 text-grey font-normal flex justify-between items-center gap-10">
//                 {field.icon} {field.label}
//               </span>
//             </label>

//             {uploadedFileNames[field.label] && (
//               <p className="text-grey mt-1 text-[12px]">Uploaded: {uploadedFileNames[field.label]}</p>
//             )}
//           </div>
//         ))}
//       </div>
//       <hr className="text-lite_grey mb-5" />
      
//        <div className="form-group">
//         <p className="text_size_5 form-group text-medium_grey my-5">Employee Service Record</p>
//         <div className="grid grid-cols-3 gap-5">
//           {WorkDataPass.serviceRecords.map((field, index) => (
//             <UploadingFiles
//             key={index}
//             field={field}
//             register={register}
//             handleFileChange={handleFileChange}
//             uploadedFileNames={uploadedFileNames}
//             errors={errors}
//           />           
//           ))}
//         </div>

//         <div className="md:col-span-2 form-group">
//           <label className="mb-1 text_size_5">Remarks for Work Info</label>
//           <textarea
//             {...register("remarkWI")}
//             className="resize-none w-full p-2 mt-1 border bg-lite_skyBlue border-lite_grey rounded-md outline-none"
//             rows="4"
//           ></textarea>
//           {errors.remarkWI && (
//             <p className="text-[red] text-[13px] mt-1">
//               {errors.remarkWI.message}
//             </p>
//           )}
//         </div>
//         </div>
//         <div className="center my-10">
//         <button type="submit" className="primary_btn">
//           Save
//         </button>
//       </div>
//       </form>

      
//       {/* {notification && (
//         <SpinLogo
//           text="Employee Work Info Saved Successfully"
//           notification={notification}
//           path="/employee"
//         />
//       )} */}
//     </section>
//  );
// };


import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useOutletContext } from "react-router-dom";
import { WorkInfoSchema } from "../../services/EmployeeValidation";
import { FaArrowLeft } from "react-icons/fa";
import { SearchDisplay } from "../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { WorkInfoFunc } from "../../services/createMethod/WorkInfoFunc";
import { WorkDataPass } from "../employees/WorkDataPass";
import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
import { FormField } from "../../utils/FormField";
import { DataSupply } from "../../utils/DataStoredContext";
import { DepartmentDD, JobCatDD, workInfoUploads } from "../../utils/DropDownMenus";
import { UploadingFiles } from "../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../utils/SpinLogo";
import { UpdateWIData } from "../../services/updateMethod/UpdateWIData";

export const WorkInfo = () => {
  const { WIUpdateData } = UpdateWIData();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { empPIData,terminateData,workInfoData,leaveDetailsData,SRData} = useContext(DataSupply);

  const { SubmitWIData } = WorkInfoFunc();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(WorkInfoSchema),
  });

  const [notification, setNotification] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  
  const empID = watch("empID");
  const [empName, setEmpName] = useState("");
  const [sapNo, setSapNo] = useState("");


    // Watch specific fields
   const department = watch("department");
   const position = watch("position");
   const jobCat = watch("jobCat");

  useEffect(() => {
    console.log(empPIData, "empPIData");
    empPIData.map((items) => {
      if (empID === items.empID) {
        setEmpName(items.name);
        setSapNo(items.sapNo)
      }
    });
  }, [empID, empPIData]);
  const [uploadedFileNames, setUploadedFileNames] = useState({
    uploadPR: null,
    uploadSP: null,
    uploadLP: null,
    uploadAL: null,
    uploadDep: null,
  });
  const [nameServiceUp, setNameServiceUp] = useState({
    uploadPR: [],
    uploadSP: [],
    uploadLP: [],
    uploadAL: [],
    uploadDep: [],
  });
  const [showOtherFields, setShowOtherFields] = useState({
    department: false,
    position: false,
    jobCat: false,
  });

    const handleSelectChange = (fieldName, value) => {
    setShowOtherFields((prev) => ({
      ...prev,
      [fieldName]: value === "Other", 
    }));
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const mergedData = empPIData
  //         .map((emp) => {
  //           const WIDetails = workInfoData.find((user) => user.empID === emp.empID);
  //           const TDetails = terminateData.find((user) => user.empID === emp.empID);
  //           const LDDetails = leaveDetailsData.find((user) => user.empID === emp.empID);
  //           const SRDetails = SRData.find((user) => user.empID === emp.empID);
            
  //           if (!WIDetails && !TDetails && !LDDetails && !SRDetails) return null;

  //           return { ...emp, ...WIDetails, ...TDetails, ...LDDetails, ...SRDetails };
  //         })
  //         .filter(Boolean);

  //       setUserDetails(mergedData);
  //       setAllEmpDetails(mergedData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, [empPIData, terminateData, workInfoData, leaveDetailsData, SRData]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const WIDetails = workInfoData.find((user) => user.empID === emp.empID);
            const TDetails = terminateData.find((user) => user.empID === emp.empID);
            const LDDetails = leaveDetailsData.find((user) => user.empID === emp.empID);
            const SRDetails = SRData.find((user) => user.empID === emp.empID);
  
            if (!WIDetails && !TDetails && !LDDetails && !SRDetails) return null;
  
            return { ...emp, ...WIDetails, ...TDetails, ...LDDetails, ...SRDetails };
          })
          .filter(Boolean);
  
        setUserDetails(mergedData);
        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, [empPIData, terminateData, workInfoData, leaveDetailsData, SRData]);
  
  // Watch changes in department, position, and jobCat to dynamically show "Other" fields
  useEffect(() => {
    const currentDepartment = getLastValue(watch("department"));
    const currentPosition = getLastValue(watch("position"));
    const currentJobCat = getLastValue(watch("jobCat"));
  
    setShowOtherFields({
      department: currentDepartment === "Other",
      position: currentPosition === "Other",
      jobCat: currentJobCat === "Other",
    });
  }, [watch("department"), watch("position"), watch("jobCat")]);
  
  
  const handleFileChange = async (e, label) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
    }
    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);
    try {
      // Dynamically set field based on label
      await uploadDocs(selectedFile, label, setNameServiceUp);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.log(err);
    }
  };


  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const searchResult = (result) => {
    const keysToSet = [
      "empID",
      "doj",
      "skillPool",
      "probationStart",
      "probationEnd",
      "resignDate",
      "termiDate",
      "resignNotProb",
      "otherResignNotProb",
      "termiNotProb",
      "otherTermiNotProb",
      "resignNotConf",
      "otherResignNotConf",
      "termiNotConf",
      "otherTermiNotConf",
      "reasonResign",
      "reasonTerminate",
      "sickLeave",
      "sickLeaveDate",
      "mrageLeave",
      "mrageLeaveDate",
      "compasLeave",
      "compasLeaveDate",
      "workInfoUploads",
      "sapNo",
    ];
  
    keysToSet.forEach((key) => {
      setValue(key, result[key]);
    });
  
    const fields = [
      "department",
      "otherDepartment",
      "position",
      "otherPosition",
      "jobCat",
      "otherJobCat",
      "jobDesc",
      "relationship",
      "hr",
      "manager",
      "supervisor",
      "upgradePosition",
      "upgradeDate",
      "contractPeriod",
      "contractStart",
      "paterLeaveDate",
      "contractEnd",
      "workStatus",
      "workHrs",
      "workWeek",
      "workMonth",
      "salaryType",
      "leavePass",
      "dateLeavePass",
      "destinateLeavePass",
      "durLeavePass",
      "annualLeave",
      "annualLeaveDate",
      "materLeave",
      "materLeaveDate",
      "paterLeave",
      "positionRev",
      "positionRevDate",
      "revSalary",
      "revSalaryDate",
      "revLeavePass",
      "revLeaveDate",
      "revAnnualLeave",
      "revALD",
      "depEmp",
      "depEmpDate",
      "remarkWI",
      "uploadPR",
      "uploadSP",
      "uploadLP",
      "uploadAL",
      "uploadDep",
    ];
    fields.forEach((field) => setValue(field, getLastValue(result[field])));
  
    const uploadFields = [
      "bwnUpload",
      "applicationUpload",
      "cvCertifyUpload",
      "loiUpload",
      "myIcUpload",
      "paafCvevUpload",
      "ppUpload",
      "supportDocUpload",
    ];

    uploadFields.map((field) => {
      // console.log(field);

      console.log(result[field]);

      if (result && result[field]) {
        try {
          // Parse the field data if it exists
          const parsedArray = JSON.parse(result[field]);

          // Then, parse each element inside the array (if it's stringified as well)
          const parsedFiles = parsedArray.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          );
          console.log(parsedFiles);
          setValue(field, parsedFiles);

          setNameServiceUp((prev) => ({
            ...prev,
            [field]: parsedFiles, // Dynamically set based on field name
          }));

          setUploadedFileNames((prev) => ({
            ...prev,
            [field]:
              parsedFiles.length > 0
                ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
                : "",
          }));
        } catch (error) {
          console.error(`Failed to parse ${field}:`, error);
        }
      }
    });
    // Update `showOtherFields` state
    setShowOtherFields({
      department: result.department === "Other",
      position: result.position === "Other",
      jobCat: result.jobCat === "Other",
    });
  };

  function getFileName(url) {
    const urlObj = new URL(url);
    const filePath = urlObj.pathname;

    const decodedUrl = decodeURIComponent(filePath);

    // Extract the file name after the last '/' in the path
    const fileNameWithExtension = decodedUrl.substring(
      decodedUrl.lastIndexOf("/") + 1
    );

    return fileNameWithExtension;
  }

      const onSubmit = async (data) => {
            console.log("Form data received in onSubmit:", data);
        
            try {
                const checkingPITable = empPIData.find((match) => match.empID === data.empID);
                const terminateDataRecord = terminateData.find((match) => match.empID === data.empID);
                const workInfoDataRecord = workInfoData.find((match) => match.empID === data.empID);
                const leaveDetailsDataRecord = leaveDetailsData.find((match) => match.empID === data.empID);
                const SRDataRecord = SRData.find((match) => match.empID === data.empID);
        
                // Ensure all data sources exist
                const checkingIDTable = terminateDataRecord && workInfoDataRecord && leaveDetailsDataRecord && SRDataRecord;
        
                if (checkingIDTable && checkingPITable) {
                    // Update the existing entry
                    const workInfoUpValue = {
                        ...data,
                        sapNo: sapNo,
                        workInfoUploads: uploadedDocs,
                        uploadPR: nameServiceUp.uploadPR,
                        uploadSP: nameServiceUp.uploadSP,
                        uploadLP: nameServiceUp.uploadLP,
                        uploadAL: nameServiceUp.uploadAL,
                        uploadDep: nameServiceUp.uploadDep,
                        PITableID: checkingPITable.id, // Link to personal info
                        IDTable: checkingIDTable.id,  // Link to work info, etc.
                    };
                    console.log("Prepared workInfoUpValue for update:", workInfoUpValue);
        
                    await WIUpdateData({ workInfoUpValue });
                } else {
                    // Create new entry if the data is not found
                    const workInfoValue = {
                        ...data,
                        sapNo: sapNo,
                        workInfoUploads: uploadedDocs,
                        uploadPR: nameServiceUp.uploadPR,
                        uploadSP: nameServiceUp.uploadSP,
                        uploadLP: nameServiceUp.uploadLP,
                        uploadAL: nameServiceUp.uploadAL,
                        uploadDep: nameServiceUp.uploadDep,
                    };
                    console.log("Prepared workInfoValue for submission:", workInfoValue);
        
                    await SubmitWIData({ workInfoValue });
                }
            } catch (error) {
                console.error("Error submitting data:", error);
            }
        };
  //   const onSubmit = async (data) => {
    
  //   console.log("Form data:", data);
  //   // console.log("Uploaded files:", uploadWorkFiles);
  //   try {
  //     const workInfoValue = {
  //       ...data,
  //       sapNo:sapNo,
  //       workInfoUploads: uploadedDocs,
  //       uploadPR: nameServiceUp.uploadPR,
  //       uploadSP: nameServiceUp.uploadSP,
  //       uploadLP: nameServiceUp.uploadLP,
  //       uploadAL: nameServiceUp.uploadAL,
  //       uploadDep: nameServiceUp.uploadDep,
  //     };
  //     console.log(workInfoValue);
  //     await SubmitWIData({ workInfoValue });
  //     // setNotification(true);
  //   } catch (error) {
  //     console.error("Error submitting data to AWS:", error.message);
  //   }
  // };

  return (
    <section className="bg-[#F5F6F1CC] mx-auto p-10">
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/employee" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <p className="flex-1 text-center mt-2 text_size_2 uppercase">
          Work Info
        </p>
        <div className="flex-1">
          <SearchDisplay
            searchResult={searchResult}
            newFormData={allEmpDetails}
            searchIcon2={<IoSearch />}
            placeholder="Employee Id"
            rounded="rounded-lg"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" mt-20 bg-[#F5F6F1CC]">
      <div className="flex justify-end items-center mt-5">
        <div>
          <FormField
            label="Employee ID"
            type="text"
            name="empID"
            placeholder="Enter Employee ID"
            errors={errors}
            register={register}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 form-group mt-2">
        <div>
          <FormField
            label="Department"
            type="select"
            name="department"
            select="Select Department"
            options={[...DepartmentDD]} // Ensure "Other" is in the options
            errors={errors}
            register={register}
            onChange={(e) => {
              handleSelectChange("department", e.target.value);  // Update visibility of "Other" input
              register("department").onChange(e); // Ensures proper registration
            }}
          />
        </div>

        {/* Conditionally render the "Other Department" input field */}
        {showOtherFields.department && department === "Other" && (
          <div>
            <FormField
              label="Other Department"
              type="text"
              name="otherDepartment"
              placeholder="Enter Department"
              errors={errors}
              register={register}
            />
          </div>
        )}
      </div>

      {/* Position Field */}
      <div className="grid grid-cols-2 gap-5 form-group mt-2">
        <div>
          <FormField
            label="Position"
            type="select"
            name="position"
            select="Select Position"
            options={[
              ...WorkDataPass.positions.map((position) => ({
                value: position,
                label: position,
              })),
              // { value: "Other", label: "Other" },
            ]}
            errors={errors}
            register={register}
            onChange={(e) => {
              handleSelectChange("position", e.target.value);  // Update visibility of "Other" input
              register("position").onChange(e); // Ensures proper registration
            }}
          />
        </div>

        {/* Conditionally render the "Other Position" input field */}
        {showOtherFields.position && position === "Other" && (
          <div>
            <FormField
              label="Other Position"
              type="text"
              name="otherPosition"
              placeholder="Enter Position"
              errors={errors}
              register={register}
            />
          </div>
        )}
      </div>

      {/* Job Category Field */}
      <div className="grid grid-cols-2 gap-5 form-group mt-2">
        <div>
          <FormField
            label="Job Category"
            type="select"
            name="jobCat"
            select="Select Job Category"
            options={[...JobCatDD]} // Ensure "Other" is in the options
            errors={errors}
            register={register}
            onChange={(e) => {
              handleSelectChange("jobCat", e.target.value);  // Update visibility of "Other" input
              register("jobCat").onChange(e); // Ensures proper registration
            }}
          />
        </div>

        {/* Conditionally render the "Other Job Category" input field */}
        {showOtherFields.jobCat && jobCat === "Other" && (
          <div>
            <FormField
              label="Other Job Category"
              type="text"
              name="otherJobCat"
              placeholder="Enter Job Category"
              errors={errors}
              register={register}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-5 form-group mt-5">
        {WorkDataPass.workFields.map((field, index) => (
          <div key={index} className="form-group">
            <label className="mb-1 text_size_5">{field.label}</label>
            {field.type === "select" ? (
              <select
                {...register(field.name)}
                className="input-field select-custom"
                watch={watch(field.name)}
              >
                {(field.options || []).map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                {...register(field.name)}
                className="input-field"
              />
            )}
            {errors[field.name] && (
              <p className="text-[red] text-[13px] mt-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <hr className="text-lite_grey mb-5" />

      <div className="form-group">
        <p className="text_size_3 form-group text-medium_grey my-5">
          Employee Leave Info
        </p>
        <div className="grid grid-cols-2 gap-5 form-group mt-5">
          {WorkDataPass.leaveBasic.map((field, index) => (
            <div key={index} className="form-group">
              <label className="mb-1 text_size_5">{field.label}</label>
              {field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="input-field select-custom"
                >
                  {(field.options || []).map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  {...register(field.name)}
                  className="input-field"
                />
              )}
              {errors[field.name] && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-5 form-group mt-5">
          {WorkDataPass.leaveFields.map((field, index) => (
            <div key={index} className="form-group">
              <label className="mb-1 text_size_5">{field.label}</label>
              {field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="input-field select-custom"
                >
                  {(field.options || []).map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  {...register(field.name)}
                  className="input-field"
                />
              )}
              {errors[field.name] && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <hr className="text-lite_grey mb-5" />

      <div className="form-group">
        <p className="text_size_3 form-group text-medium_grey my-5">
          Employee Exit Info
        </p>
        <div className="grid grid-cols-2 form-group gap-5">
  {WorkDataPass.terminationFields.map((field, index) => (
    <div key={index} className="form-group">
      <label className="block text_size_5">{field.label}</label>
      {field.type === "select" ? (
        <>
          <select
            {...register(field.name)}
            className="input-field select-custom"
            onChange={(e) =>
              handleSelectChange(field.name, e.target.value)
            }
          >
            {field.options.map((option, i) => (
              <option
                key={i}
                value={option === "Select" ? "" : option.toLowerCase()}
              >
                {option}
              </option>
            ))}
          </select>
          {showOtherFields[field.name] && (
            <>
              <input
                type="text"
                placeholder="Please specify"
                {...register(`other${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`)}
                className="input-field"
              />
              <p className="text-[red] text-[13px] mt-1">
                {errors[`${field.name}_other`]?.message}
              </p>
            </>
          )}
        </>
      ) : (
        <input
          type={field.type}
          {...register(field.name)}
          className="input-field"
        />
      )}
      <p className="text-[red] text-[13px] mt-1">
        {errors[field.name]?.message}
      </p>
    </div>
  ))}
</div>

      </div>



      <div className="grid grid-cols-3 gap-5 form-group mt-5">
          {workInfoUploads.map((field, index) => (
            <Controller
              key={index}
              name={field.title}
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="form-group">
                  <h2 className="text_size_5">Upload {field.label}</h2>
                  <label className="mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,image/jpeg,image/png"
                      onChange={(e) => handleFileChange(e, field.title)} // Pass field label for dynamic handling
                    />
                    <span className="ml-2 text-grey font-normal flex justify-between items-center gap-10">
                      {field.icon}
                      {field.label}
                    </span>
                  </label>
                  <p className="text-xs mt-1 text-grey">
                    {uploadedFileNames?.[field.title] || ""}
                  </p>
                  {/* Display validation error if any */}
                  {errors[field.title] && (
                    <p className="text-red text-xs mt-1">
                      {errors[field.title].message}
                    </p>
                  )}
                </div>
              )}
            />
          ))}
        </div>
      <hr className="text-lite_grey mb-5" />
      
       <div className="form-group">
        <p className="text_size_5 form-group text-medium_grey my-5">Employee Service Record</p>
        <div className="grid grid-cols-3 gap-5">
          {WorkDataPass.serviceRecords.map((field, index) => (
            <UploadingFiles
            key={index}
            field={field}
            register={register}
            handleFileChange={handleFileChange}
            uploadedFileNames={uploadedFileNames}
            errors={errors}
          />           
          ))}
        </div>

        <div className="md:col-span-2 form-group">
          <label className="mb-1 text_size_5">Remarks for Work Info</label>
          <textarea
            {...register("remarkWI")}
            className="resize-none w-full p-2 mt-1 border bg-lite_skyBlue border-lite_grey rounded-md outline-none"
            rows="4"
          ></textarea>
          {errors.remarkWI && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.remarkWI.message}
            </p>
          )}
        </div>
        </div>
        <div className="center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>
      </form>

      
      {notification && (
        <SpinLogo
          text="Employee Work Info Saved Successfully"
          notification={notification}
          path="/employee"
        />
      )}
    </section>
  );
};
