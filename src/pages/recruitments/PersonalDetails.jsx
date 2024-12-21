// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { PersonalSchema } from "../../services/Validation";
// import { FaRegMinusSquare } from "react-icons/fa";
// import { CiSquarePlus } from "react-icons/ci";
// import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";

// import { DataSupply } from "../../utils/DataStoredContext";
// import { BwnIcColourDD, LanguageDD } from "../../utils/DropDownMenus";

// export const PersonalDetails = () => {
//   const { empPDData } = useContext(DataSupply);
//   const { tempID } = useOutletContext();
//   const location = useLocation();
//   const applicationData = location.state?.FormData;
//   // const savedData = localStorage.getItem("personalFormData") || {};

//   // console.log("Received form data:", applicationData);

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);

//  // Parse savedData from localStorage

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//     watch, // Added watch for debugging
//   } = useForm({
//     resolver: yupResolver(PersonalSchema(applicationData?.nationality)),
//     defaultValues: {
//       familyDetails: [{ name: "", relationship: "", occupation: "" }],
//       eduDetails: [{ university: "", fromDate: "", toDate: "", degree: "" }],
//       workExperience: [{ company: "", position: "", from: "", to: "" }],
//     },
//   });

//   useEffect(() => {
//     if (tempID) {
//       const savedData = JSON.parse(localStorage.getItem("personalFormData"));
      
  
//       if (savedData) {
//         console.log("Loaded Saved Data:", savedData);
  
//         // Loop through saved data and set each value
//         Object.keys(savedData).forEach((key) => {
//           // If the field is an array, set it using `setValue` directly for the array field
//           if (Array.isArray(savedData[key])) {
//             setValue(key, savedData[key]);
//           } else if (savedData[key]) {
//             setValue(key, savedData[key]);
//           }
//         });
//       }
//     }
//   }, [tempID, setValue]);
//   // const storedData = savedData;

//   // useEffect(() => {
//   //   console.log("Initializing form data population...");
//   //   if (tempID) {
//   //     console.log("TempID found:", tempID);

//   //     // Parse and set data from localStorage
//   //     if (storedData) {
       
//   //       console.log("Saved data found in localStorage:", storedData);

//   //       Object.keys(storedData).forEach((key) => {
//   //         if (storedData[key]) {
//   //           // Check for stringified JSON inside an array and parse it
//   //           if (
//   //             ["familyDetails", "eduDetails", "workExperience"].includes(key) &&
//   //             Array.isArray(storedData[key])
//   //           ) {
//   //             try {
//   //               const stringifiedValue = storedData[key][0]; // Get the string
//   //               const parsedValue = JSON.parse(stringifiedValue); // Parse into object/array
//   //               console.log(`Parsed value for key ${key}:`, parsedValue);
//   //               setValue(key, parsedValue); // Set parsed value
//   //             } catch (error) {
//   //               console.error(`Failed to parse savedData for key ${key}:`, error);
//   //             }
//   //           } else {
//   //             console.log(`Setting value for key: ${key}`, storedData[key]);
//   //             setValue(key, storedData[key]);
//   //           }
//   //         }
//   //       });
//   //     }

//   //     // Parse and set data from empPDData
//   //     if (empPDData && empPDData.length > 0) {
//   //       console.log("empPDData found:", empPDData);

//   //       const interviewData = empPDData.find((data) => data.tempID === tempID);
//   //       if (interviewData) {
//   //         console.log("Matching data for tempID found:", interviewData);

//   //         Object.keys(interviewData).forEach((key) => {
//   //           if (interviewData[key]) {
//   //             // Check for stringified JSON inside an array and parse it
//   //             if (
//   //               ["familyDetails", "eduDetails", "workExperience"].includes(key) &&
//   //               Array.isArray(interviewData[key])
//   //             ) {
//   //               try {
//   //                 const stringifiedValue = interviewData[key][0]; // Get the string
//   //                 const parsedValue = JSON.parse(stringifiedValue); // Parse into object/array
//   //                 console.log(`Parsed value for key ${key}:`, parsedValue);
//   //                 setValue(key, parsedValue); // Set parsed value
//   //               } catch (error) {
//   //                 console.error(`Failed to parse empPDData for key ${key}:`, error);
//   //               }
//   //             } else {
//   //               console.log(`Setting value for key: ${key}`, interviewData[key]);
//   //               setValue(key, interviewData[key]);
//   //             }
//   //           }
//   //         });
//   //       } else {
//   //         console.log("No matching data found for tempID in empPDData.");
//   //       }
//   //     } else {
//   //       console.log("empPDData is empty or undefined.");
//   //     }
//   //   } else {
//   //     console.log("No tempID provided.");
//   //   }
//   // }, [empPDData, tempID, setValue]);
  
//   const {
//     fields: familyFields,
//     append: appendFamily,
//     remove: removeFamily,
//   } = useFieldArray({
//     control,
//     name: "familyDetails",
//   });

//   const {
//     fields: educationFields,
//     append: appendEducation,
//     remove: removeEducation,
//   } = useFieldArray({
//     control,
//     name: "eduDetails",
//   });

//   const {
//     fields: employmentFields,
//     append: appendEmployment,
//     remove: removeEmployment,
//   } = useFieldArray({
//     control,
//     name: "workExperience",
//   });

//   const handleAddFamily = () => {
//     // Append a new empty field set with isNew flag to identify it as newly added
//     appendFamily({ isNew: true });
//   };
//   const handleAddEducation = () => {
//     // Append a new empty field set with isNew flag to identify it as newly added
//     appendEducation({ isNew: true });
//   };
//   const handleAddEmployment = () => {
//     // Append a new empty field set with isNew flag to identify it as newly added
//     appendEmployment({ isNew: true });
//   };

//   const navigate = useNavigate();

//   // const { handleNext } = useOutletContext();
//   const onSubmit = (data) => {
//     // const personalData = data;
//     // console.log(data);
//     const navigatingData = {
//       ...data,
//       ...applicationData,
//     };

//     console.log(navigatingData);
//     localStorage.setItem("personalFormData", JSON.stringify(navigatingData));

//     // setNavigateData(navigatingData);
//     // handleNext();
//     // console.log(navigatingData);
//     navigate("/addCandidates/educationDetails", {
//       state: { FormData: navigatingData },
//     });
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto py-6">
//       {/* h-screen overflow-y-auto scrollbar-hide */}
//       {/* Passport No and Contact No */}
//       <div className="grid grid-cols-2 gap-4 mb-4 text_size_6">
//         <div>
//           <label className="block mb-1">Contact Number</label>
//           <input
//             type="text"
//             {...register("contactNo")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//           {errors.contactNo && (
//             <p className="text-[red] text-[12px]">{errors.contactNo.message}</p>
//           )}
//         </div>
//         <div>
//           <label className="block mb-1">Alternate Number</label>
//           <input
//             type="text"
//             {...register("alternateNo")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd]  text-dark_grey outline-none rounded w-full"
//           />
//           {errors.alternateNo && (
//             <p className="text-[red] text-[12px]">
//               {errors.alternateNo.message}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Present Address and Permanent Address */}
//       <div className="grid grid-cols-2 gap-4 mb-4 text_size_6">
//         <div>
//           <label className="block mb-1">Present Address</label>
//           <input
//             type="text"
//             {...register("presentAddress")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//           {errors.presentAddress && (
//             <p className="text-[red] text-[12px]">
//               {errors.presentAddress.message}
//             </p>
//           )}
//         </div>
//         <div>
//           <label className="block mb-1">Permanent Address</label>
//           <input
//             type="text"
//             {...register("permanentAddress")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//           <p className="text-[red] text-[12px]">
//             {errors.permanentAddress?.message}
//           </p>
//         </div>
//       </div>

//       {/* Driving License Class and Language Proficiency */}
//       <div className="grid grid-cols-2 gap-4 mb-4 text_size_6">
//         <div>
//           <label className="block mb-1">Driving License Class</label>
//           <input
//             type="text"
//             {...register("driveLic")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Language Proficiency</label>
//           <select
//             {...register("lang")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           >
//             <option value=""></option>
//             {LanguageDD.map((option, index) => (
//               <option key={index} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           {errors.lang && (
//             <p className="text-[red] text-[12px]">{errors.lang.message}</p>
//           )}
//         </div>
//       </div>

//       {/* I/C No and I/C Colour */}
//       <div className="grid grid-cols-3 gap-4 mb-4 text_size_6">
//         <div>
//           <label className="block mb-1">Brunei I/C No</label>
//           <input
//             type="text"
//             {...register("bwnIcNo")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//           {errors.bwnIcNo && (
//             <p className="text-[red] text-[12px]">{errors.bwnIcNo.message}</p>
//           )}
//         </div>
//         <div>
//           <label className="block mb-1">Brunei I/C Colour</label>
//           <select
//             {...register("bwnIcColour")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           >
//             <option value=""></option>
//             {BwnIcColourDD.map((option, index) => (
//               <option key={index} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//             {/* <option value="Green">Green</option>
//             <option value="Yellow">Yellow</option>
//             <option value="Red">Red</option> */}
//           </select>
//           {errors.bwnIcColour && (
//             <p className="text-[red] text-[12px]">
//               {errors.bwnIcColour.message}
//             </p>
//           )}
//         </div>
//         <div>
//           <label className="block mb-1">Brunei I/C Expiry</label>
//           <input
//             type="date"
//             {...register("bwnIcExpiry")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//           {errors.bwnIcExpiry && (
//             <p className="text-[red] text-[12px]">
//               {errors.bwnIcExpiry.message}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-4 gap-4 mb-4 text_size_6">
//         <div>
//           <label className="block mb-1">Passport Number</label>
//           <input
//             type="text"
//             {...register("ppNo")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//           {errors.ppNo && (
//             <p className="text-[red] text-[12px] ">{errors.ppNo.message}</p>
//           )}
//         </div>
//         <div>
//           <label className="block mb-1">Passport issued date</label>
//           <input
//             type="date"
//             {...register("ppIssued")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//           {errors.ppIssued && (
//             <p className="text-[red] text-[12px]">{errors.ppIssued.message}</p>
//           )}
//         </div>
//         <div>
//           <label className="block mb-1">Passport Expiry</label>
//           <input
//             type="date"
//             {...register("ppExpiry")}
//             className="mt-2 text_size_9 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//           {errors.ppExpiry && (
//             <p className="text-[red] text-[12px]">{errors.ppExpiry.message}</p>
//           )}
//         </div>
//         <div>
//           <label className="block mb-1">Passport issued destination</label>
//           <input
//             type="text"
//             {...register("ppDestinate")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//           {errors.ppDestinate && (
//             <p className="text-[red] text-[12px]">
//               {errors.ppDestinate.message}
//             </p>
//           )}
//         </div>
//       </div>
//       {/* Family Details */}
//       <div className="mb-4 relative text_size_6">
//         <label className="block mb-1">
//           Particulars of Immediate Family (Spouse, Children, Parents, Brothers &
//           Sisters)
//         </label>
//         {familyFields.map((item, index) => (
//           <div key={item.id} className="grid grid-cols-3 gap-4 mb-4">
//             <div>
//               <label>Name</label>
//               <input
//                 {...register(`familyDetails.${index}.name`)}
//                 defaultValue={item.name} // Ensures default values are respected
//                 className="input-class"
//               />
//             </div>
//             <div>
//               <label>Relationship</label>
//               <input
//                 {...register(`familyDetails.${index}.relationship`)}
//                 defaultValue={item.relationship}
//                 className="input-class"
//               />
//             </div>
//             <div>
//               <label>Occupation</label>
//               <input
//                 {...register(`familyDetails.${index}.occupation`)}
//                 defaultValue={item.occupation}
//                 className="input-class"
//               />
//             </div>
//             <div>
//               <label>Age</label>
//               <input
//                 {...register(`familyDetails.${index}.age`)}
//                 defaultValue={item.occupation}
//                 className="input-class"
//               />
//             </div>
//             <button type="button" onClick={() => removeFamily(index)}>
//               <FaRegMinusSquare />
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddFamily}>
//           <CiSquarePlus /> Add Family Member
//         </button>

//         <button
//           type="button"
//           onClick={handleAddFamily}
//           // onClick={() => appendFamily({})}
//           className="absolute top-11 -right-7 text-medium_grey text-[18px]"
//         >
//           <CiSquarePlus />
//         </button>
//       </div>

//       {/* Education Details */}
//       <div className="mb-4 relative text_size_6">
//         <label className="block mb-1">Education Details</label>
//         {educationFields.map((education, index) => (
//           <div key={education.id} className="grid grid-cols-4 gap-4 mb-2">
//             <Controller
//               name={`eduDetails.${index}.university`}
//               control={control}
//               defaultValue={education.university || ""}
//               render={({ field }) => (
//                 <div className="flex flex-col">
//                   <textarea
//                     {...field}
//                     placeholder="School / University / Professional Institute"
//                     className="resize-none text_size_9 mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//                   />

//                   {errors.eduDetails?.[index]?.university && (
//                     <p className="text-[red] text-xs mt-1">
//                       {errors.eduDetails[index].university.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name={`eduDetails.${index}.fromDate`}
//               control={control}
//               defaultValue={education.fromDate || ""}
//               render={({ field }) => (
//                 <div className="flex flex-col">
//                   <textarea
//                     {...field}
//                     type="date"
//                     placeholder="From Date"
//                     className="resize-none mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//                   ></textarea>
//                   {errors.eduDetails?.[index]?.fromDate && (
//                     <p className="text-[red] text-xs mt-1">
//                       {errors.eduDetails[index].fromDate.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name={`eduDetails.${index}.toDate`}
//               control={control}
//               defaultValue={education.toDate || ""}
//               render={({ field }) => (
//                 <div className="flex flex-col">
//                   <textarea
//                     {...field}
//                     type="date"
//                     placeholder="To Date"
//                     className="resize-none mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//                   ></textarea>
//                   {errors.eduDetails?.[index]?.toDate && (
//                     <p className="text-[red] text-xs mt-1">
//                       {errors.eduDetails[index].toDate.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name={`eduDetails.${index}.degree`}
//               control={control}
//               defaultValue={education.degree || ""}
//               render={({ field }) => (
//                 <div className="flex flex-col">
//                   <textarea
//                     {...field}
//                     placeholder="Highest Standard / Passed / Certificate / Degree / Professional Qualification"
//                     className="resize-none mt-2 p-2.5  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded text_size_9"
//                   />
//                   {errors.eduDetails?.[index]?.degree && (
//                     <p className="text-[red] text-xs mt-1">
//                       {errors.eduDetails[index].degree.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             {education.isNew && (
//               <button
//                 type="button"
//                 onClick={() => removeEducation(index)} // Remove specific field set
//                 className="absolute top-15 -right-7 text-medium_grey text-[18px]"
//               >
//                 <FaRegMinusSquare /> {/* Minus icon */}
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddEducation}
//           // onClick={() => appendEducation({})}
//           className="absolute top-12 -right-7 text-medium_grey text-[18px]"
//         >
//           <CiSquarePlus />
//         </button>
//       </div>

//       {/* Employment Details */}
//       <div className="mb-4 relative text_size_6">
//         <label className="block mb-1">
//           Previous Employment Including Temporary Work
//         </label>
//         {employmentFields.map((employment, index) => (
//           <div key={employment.id} className="grid grid-cols-6 gap-4 mb-2">
//             <input
//               type="text"
//               {...register(`workExperience.${index}.name`)}
//               placeholder="Name and Address"
//               className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//             />
//             <input
//               type="text"
//               {...register(`workExperience.${index}.position`)}
//               placeholder="Position Held"
//               className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//             />
//             <input
//               type="date"
//               {...register(`workExperience.${index}.from`)}
//               placeholder="From"
//               className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//             />
//             <input
//               type="date"
//               {...register(`workExperience.${index}.to`)}
//               placeholder="To"
//               className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//             />
//             <input
//               type="text"
//               {...register(`workExperience.${index}.salary`)}
//               placeholder="Salary"
//               className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//             />
//             <input
//               type="text"
//               {...register(`workExperience.${index}.reasonForLeaving`)}
//               placeholder="Reason for Leaving"
//               className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//             />

//             {employment.isNew && (
//               <button
//                 type="button"
//                 onClick={() => removeEmployment(index)} // Remove specific field set
//                 className="absolute top-15 -right-7 text-medium_grey text-[18px]"
//               >
//                 <FaRegMinusSquare /> {/* Minus icon */}
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddEmployment}
//           // onClick={() => appendEmployment({})}
//           className="absolute top-11 -right-7 text-medium_grey text-[18px]"
//         >
//           <CiSquarePlus />
//         </button>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-center mt-12 gap-10">
//         <button type="submit" className="primary_btn">
//           Next
//         </button>
//       </div>
//     </form>
//   );
// };
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalSchema } from "../../services/Validation";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { BwnIcColourDD, LanguageDD } from "../../utils/DropDownMenus";



export const PersonalDetails = () => {
  const { tempID } = useOutletContext();
  const location = useLocation();
  const applicationData = location.state?.FormData;
  console.log(tempID)

  // console.log("Received form data:", applicationData);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PersonalSchema(applicationData?.nationality)),

    defaultValues: {
      familyDetails: [{ name: "", relationship: "", occupation: "" }],
       eduDetails: [{ university: "", fromDate: "", toDate: "", degree: "" }],
       workExperience: [{ company: "", position: "", from: "", to: "" }],
    },
  });
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("personalFormData"));
    if (savedData) {
      Object.keys(savedData).forEach((key) => setValue(key, savedData[key]));
    }
  }, [setValue]);
  const {
    fields: familyFields,
    append: appendFamily,
    remove: removeFamily,
  } = useFieldArray({
    control,
    name: "familyDetails",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "eduDetails",
  });

  const {
    fields: employmentFields,
    append: appendEmployment,
    remove: removeEmployment,
  } = useFieldArray({
    control,
    name: "workExperience",
  });

  const handleAddFamily = () => {
    // Append a new empty field set with isNew flag to identify it as newly added
    appendFamily({ isNew: true });
  };
  const handleAddEducation = () => {
    // Append a new empty field set with isNew flag to identify it as newly added
    appendEducation({ isNew: true });
  };
  const handleAddEmployment = () => {
    // Append a new empty field set with isNew flag to identify it as newly added
    appendEmployment({ isNew: true });
  };

  const navigate = useNavigate();
 

  const onSubmit = (data) => {
    // const personalData = data;
    // console.log(data);
    const navigatingData = {
      ...data,
      ...applicationData,
    };
    localStorage.setItem("personalFormData", JSON.stringify(navigatingData));

    // setNavigateData(navigatingData);
    // handleNext();
    // console.log(navigatingData);
    navigate("/addCandidates/educationDetails", {
      state: { FormData: navigatingData },
    });
  };

  useEffect(() => {
    if (tempID) {
      const savedData = JSON.parse(localStorage.getItem("personalFormData"));
      if (savedData) {
        console.log("Loaded Saved Data:", savedData);

        // Loop through saved data and set each value
        Object.keys(savedData).forEach((key) => {
          // If the field is an array, set it using `setValue` directly for the array field
          if (Array.isArray(savedData[key])) {
            setValue(key, savedData[key]);
          } else if (savedData[key]) {
            setValue(key, savedData[key]);
          }
        });
      }
    }
  }, [tempID, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto py-6">
      {/* h-screen overflow-y-auto scrollbar-hide */}
      {/* Passport No and Contact No */}
      <div className="grid grid-cols-2 gap-4 mb-4 text_size_6">
      <div>
          <label className="block mb-1">Contact Number</label>
          <input
            type="text"
            {...register("contactNo")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.contactNo && (
            <p className="text-[red] text-[12px]">{errors.contactNo.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Alternate Number</label>
          <input
            type="text"
            {...register("alternateNo")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd]  text-dark_grey outline-none rounded w-full"
          />
          {errors.alternateNo && (
            <p className="text-[red] text-[12px]">
              {errors.alternateNo.message}
            </p>
          )}
        </div>

      </div>

      {/* Present Address and Permanent Address */}
      <div className="grid grid-cols-2 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Present Address</label>
          <input
            type="text"
            {...register("presentAddress")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.presentAddress && (
            <p className="text-[red] text-[12px]">
              {errors.presentAddress.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Permanent Address</label>
          <input
            type="text"
            {...register("permanentAddress")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          <p className="text-[red] text-[12px]">
            {errors.permanentAddress?.message}
          </p>
        </div>
      </div>

      {/* Driving License Class and Language Proficiency */}
      <div className="grid grid-cols-2 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Driving License Class</label>
          <input
            type="text"
            {...register("driveLic")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Language Proficiency</label>
          <select
            {...register("lang")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          >
            <option value=""></option>
            {LanguageDD.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.lang && (
            <p className="text-[red] text-[12px]">{errors.lang.message}</p>
          )}
        </div>
      </div>

      {/* I/C No and I/C Colour */}
      <div className="grid grid-cols-3 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Brunei I/C No</label>
          <input
            type="text"
            {...register("bwnIcNo")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.bwnIcNo && (
            <p className="text-[red] text-[12px]">{errors.bwnIcNo.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Brunei I/C Colour</label>
          <select
            {...register("bwnIcColour")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          >
            <option value=""></option>
            {BwnIcColourDD.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
            {/* <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Red">Red</option> */}
          </select>
          {errors.bwnIcColour && (
            <p className="text-[red] text-[12px]">
              {errors.bwnIcColour.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Brunei I/C Expiry</label>
          <input
            type="date"
            {...register("bwnIcExpiry")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.bwnIcExpiry && (
            <p className="text-[red] text-[12px]">
              {errors.bwnIcExpiry.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Passport Number</label>
          <input
            type="text"
            {...register("ppNo")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.ppNo && (
            <p className="text-[red] text-[12px] ">{errors.ppNo.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport issued date</label>
          <input
            type="date"
            {...register("ppIssued")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.ppIssued && (
            <p className="text-[red] text-[12px]">{errors.ppIssued.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport Expiry</label>
          <input
            type="date"
            {...register("ppExpiry")}
            className="mt-2 text_size_9 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.ppExpiry && (
            <p className="text-[red] text-[12px]">{errors.ppExpiry.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport issued destination</label>
          <input
            type="text"
            {...register("ppDestinate")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.ppDestinate && (
            <p className="text-[red] text-[12px]">
              {errors.ppDestinate.message}
            </p>
          )}
        </div>
      </div>
      {/* Family Details */}
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">
          Particulars of Immediate Family (Spouse, Children, Parents, Brothers &
          Sisters)
        </label>
        {familyFields.map((family, index) => (
          <div key={family.id} className="grid grid-cols-5 gap-4 mb-2">
            <input
              type="text"
              {...register(`familyDetails.${index}.name`)}
              placeholder="Name"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.relationship`)}
              placeholder="Relationship"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.age`)}
              placeholder="Age"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.occupation`)}
              placeholder="Occupation"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.placeOfOccupation`)}
              placeholder="Place of Occupation"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            {family.isNew && (
              <button
                type="button"
                onClick={() => removeFamily(index)} // Remove specific field set
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> {/* Minus icon */}
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddFamily}
          // onClick={() => appendFamily({})}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>

      {/* Education Details */}
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">Education Details</label>
        {educationFields.map((education, index) => (
          <div key={education.id} className="grid grid-cols-4 gap-4 mb-2">
            <Controller
              name={`eduDetails.${index}.university`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    placeholder="School / University / Professional Institute"
                    className="resize-none text_size_9 mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />

                  {errors.eduDetails?.[index]?.university && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].university.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`eduDetails.${index}.fromDate`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    type="date"
                    placeholder="From Date"
                    className="resize-none mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  ></textarea>
                  {errors.eduDetails?.[index]?.fromDate && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].fromDate.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`eduDetails.${index}.toDate`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    type="date"
                    placeholder="To Date"
                    className="resize-none mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  ></textarea>
                  {errors.eduDetails?.[index]?.toDate && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].toDate.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`eduDetails.${index}.degree`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    placeholder="Highest Standard / Passed / Certificate / Degree / Professional Qualification"
                    className="resize-none mt-2 p-2.5  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded text_size_9"
                  />
                  {errors.eduDetails?.[index]?.degree && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].degree.message}
                    </p>
                  )}
                </div>
              )}
            />
            {education.isNew && (
              <button
                type="button"
                onClick={() => removeEducation(index)} // Remove specific field set
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> {/* Minus icon */}
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEducation}
          // onClick={() => appendEducation({})}
          className="absolute top-12 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>

      {/* Employment Details */}
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">
          Previous Employment Including Temporary Work
        </label>
        {employmentFields.map((employment, index) => (
          <div key={employment.id} className="grid grid-cols-6 gap-4 mb-2">
            <input
              type="text"
              {...register(`workExperience.${index}.name`)}
              placeholder="Name and Address"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.position`)}
              placeholder="Position Held"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="date"
              {...register(`workExperience.${index}.from`)}
              placeholder="From"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="date"
              {...register(`workExperience.${index}.to`)}
              placeholder="To"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.salary`)}
              placeholder="Salary"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.reasonForLeaving`)}
              placeholder="Reason for Leaving"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />

            {employment.isNew && (
              <button
                type="button"
                onClick={() => removeEmployment(index)} // Remove specific field set
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> {/* Minus icon */}
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEmployment}
          // onClick={() => appendEmployment({})}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-12 gap-10">
        <button type="submit" className="primary_btn">
          Next
        </button>
      </div>
    </form>
  );
};
