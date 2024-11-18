// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { CandidatesSchema } from "../../services/Validation";
// import { generateClient } from "aws-amplify/api";
// import { uploadData } from "aws-amplify/storage";
// import { GoUpload } from "react-icons/go"; // Ensure this import is correct
// import { useLocation } from "react-router-dom";
// import { createCandidateApplicationForm } from "../../graphql/mutations";
// import { getCurrentUser } from "@aws-amplify/auth";
// import { listCandidateApplicationForms } from "../../graphql/queries";

// const client = generateClient();

// export const OtherDetails = () => {
//   const location = useLocation();
//   const navigatingEducationData = location.state?.FormData;
//   // console.log("Received form data:", navigatingEducationData);
//   const [formData, setFormData] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const [updateResume, setUpdateResume] = useState("");
//   const [updateCertificate, setUpdateCertificate] = useState("");
//   const [updatePassport, setUpdatePassport] = useState("");
//   const [latestTempIDData, setLatesTempIDData] = useState("");
//   const {
//     register,
//     control,
//     watch,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(CandidatesSchema),
//     defaultValues: {
//       perInterviewStatus: "no",
//       perInterviewDescription: "",
//     },
//   });
//   const handleFileChange = async (e, type) => {
//     const file = e.target.files;
//     const uploadFiles = e.target.files[0];
//     setValue(type, file);

//     if (file) {
//       if (type === "uploadResume") {
//         await uploadResume(uploadFiles);
//         setValue(type, file); // Set the file value for validation
//       } else if (type === "uploadCertificate") {
//         await uploadCertificate(uploadFiles);
//         setValue(type, file); // Set the file value for validation
//       } else if (type === "uploadPassport") {
//         await uploadPassport(uploadFiles);
//         setValue(type, file); // Set the file value for validation
//       }
//     }
//   };

//   const uploadResume = async (file) => {
//     try {
//       // Check if the user is authenticated
//       const currentUser = await getCurrentUser();
//       console.log(currentUser);

//       if (currentUser) {
//         const result = await uploadData({
//           path: `uploadResume/${file.name}`,
//           data: file,
//         }).result;

//         const filePath = result.path;
//         const encodedFilePath = encodeURIComponent(filePath);
//         const fileUrl = `https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
//         console.log("Resume uploaded successfully. File URL:", fileUrl);
//         setUpdateResume(fileUrl);
//       }
//     } catch (error) {
//       if (error === "No current user") {
//         console.log("User is not authenticated. Please log in.");
//       } else {
//         console.log("Error uploading resume:", error);
//       }
//     }
//   };

//   const uploadCertificate = async (file) => {
//     try {
//       const result = await uploadData({
//         path: `uploadCertificate/${file.name}`,
//         data: file,
//       }).result;
//       const filePath = result.path;
//       const encodedFilePath = encodeURIComponent(filePath);
//       const fileUrl = `https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
//       console.log("Certificate uploaded successfully. File URL:", fileUrl);
//       setUpdateCertificate(fileUrl);
//     } catch (error) {
//       console.log("Error uploading certificate:", error);
//     }
//   };

//   const uploadPassport = async (file) => {
//     try {
//       const result = await uploadData({
//         path: `uploadPassport/${file.name}`,
//         data: file,
//       }).result;
//       const filePath = result.path;
//       const encodedFilePath = encodeURIComponent(filePath);
//       const fileUrl = `https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
//       console.log("Passport uploaded successfully. File URL:", fileUrl);
//       setUpdatePassport(fileUrl);
//     } catch (error) {
//       console.log("Error uploading passport:", error);
//     }
//   };

//   const getTotalCount = async () => {
//     try {
//       const result = await client.graphql({
//         query: listCandidateApplicationForms,
//       });
  
//       const items = result?.data?.listCandidateApplicationForms?.items || [];
//       const totalCount = items.length;
  
//       console.log("Total count of entries:", totalCount);
//       return totalCount; // Return the count of all entries
//     } catch (error) {
//       console.error("Error fetching total count:", error);
//       return 0; // Return 0 if there's an error
//     }
//   };
  
//   const generateNextTempID = (totalCount) => {
//     const nextNumber = totalCount + 1; // Increment based on the total count
//     const totalDigits = Math.max(3, String(nextNumber).length); // Default to at least 3 digits
//     const nextTempID = `TEMP${String(nextNumber).padStart(totalDigits, "0")}`  
//     console.log("Next tempID:", nextTempID); 
//     return nextTempID;
//   };
  
//   useEffect(() => {
//     const fetchNextTempID = async () => {
//       const totalCount = await getTotalCount();
  
//       // Generate the next tempID based on the total count
//       const nextTempID = generateNextTempID(totalCount);
//       console.log("Generated next tempID:", nextTempID);
//       setLatesTempIDData(nextTempID); // Set the generated ID
//     };
//     fetchNextTempID();
//   }, []);
  

//   const onSubmit = async (data) => {
//     // console.log(data);
//     // console.log(nextTempID);

//     try {
//       const updatedValue = {
//         ...data,
//         uploadCertificate: updateCertificate,
//         uploadPassport: updatePassport,
//         uploadResume: updateResume,
        
//       };
//       console.log(updatedValue);
//       const storedData = {
//         ...updatedValue,
//         ...navigatingEducationData,
//       };
//       // console.log(storedData);

//       const totalData = {
//         tempID: latestTempIDData,
//         profilePhoto: storedData.profilePhoto,
//         position: storedData.position,
//         agent: storedData.agent,
//         contractType: storedData.contractType,
//         employeeType: storedData.employeeType,
//         name: storedData.name,
//         chinese: storedData.chinese,
//         gender: storedData.gender,
//         dateOfBirth: storedData.dateOfBirth,
//         age: storedData.age,
//         email: storedData.email,
//         countryOfBirth: storedData.countryOfBirth,
//         nationality: storedData.nationality,
//         otherNationality: storedData.otherNationality,
//         marital: storedData.marital,
//         race: storedData.race,
//         otherRace: storedData.otherRace,
//         religion: storedData.religion,
//         otherReligion: storedData.otherReligion,

//         // personalDetails
//         icNo: storedData.icNo,
//         icExpiry: storedData.icExpiry,
//         icColour: storedData.icColour,
//         passportNo: storedData.passportNo,
//         alternateNo: storedData.alternateNo,
//         passportIssued: storedData.passportIssued,
//         passportExpiry: storedData.passportExpiry,
//         passportDestination: storedData.passportDestination,
//         contactNo: storedData.contactNo,
//         presentAddress: storedData.presentAddress,
//         permanentAddress: storedData.permanentAddress,
//         drivingLicense: storedData.drivingLicense,
//         language: storedData.language,
//         familyDetails: storedData.familyDetails,
//         educationDetails: storedData.educationDetails,
//         workExperience: storedData.workExperience,

//         // educationDetails
//         referees:
//           storedData.referees?.map((referee) => ({
//             name: referee.name,
//             address: referee.address,
//             phoneNumber: referee.phoneNumber,
//             profession: referee.profession,
//           })) || [],
//         relatives:
//           storedData.relatives?.map((relative) => ({
//             name: relative.name,
//             position: relative.position,
//             relationship: relative.relationship,
//           })) || [],
//         description: storedData.description || "",
//         emergencyContact:
//           storedData.emergencyContact?.map((contact) => ({
//             name: contact.name,
//             relationship: contact.relationship,
//             address: contact.address,
//             phoneNumber: contact.phoneNumber,
//             bloodGroup: contact.bloodGroup,
//           })) || [],
//         disease: storedData.disease || "",
//         liquor: storedData.liquor || "",
//         crime: storedData.crime || "",
//         diseaseDescription:
//           storedData.disease === "Yes"
//             ? storedData.diseaseDescription || ""
//             : "",
//         liquorDescription:
//           storedData.liquor === "Yes" ? storedData.liquorDescription || "" : "",
//         crimeDescription:
//           storedData.crime === "Yes" ? storedData.crimeDescription || "" : "",

//         // otherDetails
//         salaryException: storedData.salaryException || "",
//         noticePeriod: storedData.noticePeriod || "",
//         employeeStatement: storedData.employeeStatement || "",
//         experience: storedData.experience || "",

//         perInterviewStatus: storedData.perInterviewStatus || "",
//         perInterviewDescription:
//           storedData.perInterviewStatus === "yes"
//             ? storedData.perInterviewDescription || ""
//             : "",
//         supportInfo: storedData.supportInfo || "",
//         uploadResume: storedData.uploadResume,
//         uploadCertificate: storedData.uploadCertificate,
//         uploadPassport: storedData.uploadPassport,
//       };

//       console.log(totalData);

//       // Combine all form data
//       const result = await client
//         .graphql({
//           query: createCandidateApplicationForm,
//           variables: {
//             input: totalData,
//           },
//         })
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//           console.log("Successfully submitted All data :", result);

//     } catch (error) {
//       console.log(error);

//       console.error(
//         "Error submitting data to AWS:",
//         JSON.stringify(error, null, 2)
//       );
//     }
//   };
  

//   // const handleFileChange = async (e, type) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     if (type === "uploadResume") {
//   //       await uploadResume(file);
//   //     } else if (type === "uploadCertificate") {
//   //       await uploadCerficate(file);
//   //     } else if (type === "uploadPassport") {
//   //       await uploadPassport(file);
//   //     }
//   //   }
//   // };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
//       {/* Salary Expected */}
//      <div className=" grid grid-cols-2 gap-5">
//      <div className="mb-4">
//         <label className="text_size_6 mb-2">Number of Years Experience in Applied Position</label>
//         <input
//           type="text"
//           {...register("experience")}
//           className="mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//         />
//         {errors.experience && (
//           <p className="text-[red] text-xs mt-1">
//             {errors.experience.message}
//           </p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">Salary Expected</label>
//         <input
//           type="text"
//           {...register("salaryException")}
//           className="mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//         />
//       </div>
//      </div>

//       {/* Termination Notice */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">
//           Termination Notice for Present job (month/Date)
//         </label>
//         <input
//           type="text"
//           {...register("noticePeriod")}
//           className="mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//         />
//         {errors.noticePeriod && (
//           <p className="text-[red] text-xs mt-1">
//             {errors.noticePeriod.message}
//           </p>
//         )}
//       </div>

//       {/* Interviewed Before */}
//       {/* <div className="mb-4">
//         <label className="text_size_6">
//           Have you been interviewed for a position at this company before?
//         </label>
//         <div className="flex justify-between items-center mt-2 mb-4">
//           <div>
//             <Controller
//               name="perInterviewStatus"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <input
//                     type="radio"
//                     id="yes"
//                     {...field}
//                     value="yes"
//                     className="mr-2 p-3"
//                   />
//                   <label htmlFor="yes" className="mr-4 text_size_6">
//                     Yes
//                   </label>

//                   <input
//                     type="radio"
//                     id="no"
//                     {...field}
//                     value="no"
//                     className="mr-2 p-3"
//                     defaultChecked
//                   />
//                   <label htmlFor="no" className="text_size_6">
//                     No
//                   </label>
//                 </>
//               )}
//             />
//             {errors.perInterviewStatus && (
//               <p className="text-[red] text-xs mt-1">
//                 {errors.perInterviewStatus.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="w-[350px] text_size_7">
//               If yes, please give Details
//             </label>
//             <Controller
//               name="perInterviewDescription"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   disabled={watch("perInterviewStatus") !== "yes"}
//                   className={`mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full ${
//                     errors.perInterviewDescription ? "border-[red]" : ""
//                   }`}
//                 />
//               )}
//             />
//             {errors.perInterviewDescription && (
//               <p className="text-[red] text-xs mt-4">
//                 {errors.perInterviewDescription.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div> */}
//       <div className="mb-4">
//         <label className="text_size_6">
//           Have you been interviewed for a position at this company before?
//         </label>
//         <div className="flex justify-between items-center mt-2 mb-4">
//           <div>
//             <Controller
//               name="perInterviewStatus"
//               control={control}
//               defaultValue="no" // Provide a default value
//               render={({ field }) => (
//                 <>
//                   <input
//                     type="radio"
//                     id="yes"
//                     {...field}
//                     value="yes"
//                     className="mr-2 p-3"
//                   />
//                   <label htmlFor="yes" className="mr-4 text_size_6">
//                     Yes
//                   </label>

//                   <input
//                     type="radio"
//                     id="no"
//                     {...field}
//                     value="no"
//                     className="mr-2 p-3"
//                     defaultChecked // This ensures that "No" is checked by default
//                   />
//                   <label htmlFor="no" className="text_size_6">
//                     No
//                   </label>
//                 </>
//               )}
//             />
//             {errors.perInterviewStatus && (
//               <p className="text-[red] text-xs mt-1">
//                 {errors.perInterviewStatus.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="w-[350px] text_size_7">
//               If yes, please give Details
//             </label>
//             <Controller
//               name="perInterviewDescription"
//               control={control}
//               defaultValue="" // Provide an initial value to avoid uncontrolled behavior
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   disabled={watch("perInterviewStatus") !== "yes"}
//                   className={`mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full ${
//                     errors.perInterviewDescription ? "border-[red]" : ""
//                   }`}
//                 />
//               )}
//             />
//             {errors.perInterviewDescription && (
//               <p className="text-[red] text-xs mt-4">
//                 {errors.perInterviewDescription.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Support Information */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">
//           Any other information you wish to provide?
//         </label>
//         <textarea
//           {...register("supportInfo")}
//           className="resize-none mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           rows="4"
//         ></textarea>
//       </div>

//       {/* File Uploads */}
//       <div className="my-5">
//         <label className="text_size_6">Choose file</label>
//         <div className="flex items-center justify-between mt-3 mb-10">
//           {/* Resume Upload */}
//           <div>
//             <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
//               Upload Resume
//               <input
//                 type="file"
//                 onChange={(e) => handleFileChange(e, "uploadResume")}
//                 className="hidden"
//                 accept="application"
//               />
//               <span className="ml-2">
//                 <GoUpload />
//               </span>
//             </label>
//             {errors.uploadResume && (
//               <p className="text-[red] text-xs mt-1">
//                 {errors.uploadResume?.message}
//               </p>
//             )}
//           </div>

//           {/* Certificate Upload */}
//           <div>
//             <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
//               Qualification Certificate
//               <input
//                 type="file"
//                 onChange={(e) => handleFileChange(e, "uploadCertificate")}
//                 className="hidden"
//                 accept="application"
//               />
//               <span className="ml-2">
//                 <GoUpload />
//               </span>
//             </label>
//             {errors.uploadCertificate && (
//               <p className="text-[red] text-xs mt-1">
//                 {errors.uploadCertificate?.message}
//               </p>
//             )}
//           </div>

//           {/* Passport Upload */}
//           <div>
//             <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
//               Upload IC / Passport
//               <input
//                 type="file"
//                 onChange={(e) => handleFileChange(e, "uploadPassport")}
//                 className="hidden"
//                 accept="application"
//               />
//               <span className="ml-2">
//                 <GoUpload />
//               </span>
//             </label>
//             {errors.uploadPassport && (
//               <p className="text-[red] text-xs mt-1">
//                 {errors.uploadPassport.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="flex items-start mb-4">
//         <input
//           type="checkbox"
//           id="employeeStatement"
//           {...register("employeeStatement", {
//             required: "This field is required",
//           })}
//           className="w-5 h-5 border-medium_grey rounded"
//         />
//         <label htmlFor="employeeStatement" className="ml-2 text-gray-700">
//           I Hereby Declare that every statement made by me in this form is true
//           and correct and I understand and agree that any false declaration made
//           by me may be ground for termination of my contract of employment
//           without notice.
//         </label>
//       </div>
//       {errors.employeeStatement && (
//         <p className="text-[red] text-sm">{errors.employeeStatement.message}</p>
//       )}

//       <div className="text-center my-10">
//         <button type="submit" className="primary_btn">
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };
// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { CandidatesSchema } from "../../services/Validation";
// import { generateClient } from "aws-amplify/api";
// import { createCandidateApplicationForm } from '../../graphql/mutations'; // GraphQL mutation
// import { uploadData } from "aws-amplify/storage";

// const client = generateClient();

// export const OtherDetails = () => {
//     const [formData, setFormData] = useState({
//       uploadResume: '',
//       uploadCertificate: '',
//       uploadPassport: ''
//     });

//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//     };

//   const { register, control, watch, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(CandidatesSchema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       // Retrieve data from localStorage
//       const applicantDetails = JSON.parse(localStorage.getItem('applicantDetails')) || {};
//       const personalDetails = JSON.parse(localStorage.getItem('personalDetails')) || {};
//       conststoredData = JSON.parse(localStorage.getItem('educationDetails')) || {};
//       const otherDetails = data;

//       const totalData={
//         // profilePhoto: applicantDetails.profilePhoto,
//         position: applicantDetails.position,
//         contractType: applicantDetails.contractType,
//         employeeType: applicantDetails.employeeType,
//         name: applicantDetails.name,
//         chinese: applicantDetails.chinese,
//         gender: applicantDetails.gender,
//         dateOfBirth: applicantDetails.dateOfBirth,
//         age: applicantDetails.age,
//         email: applicantDetails.email,
//         countryOfBirth: applicantDetails.countryOfBirth,
//         nationality: applicantDetails.nationality,
//         otherNationality: applicantDetails.otherNationality,
//         marital: applicantDetails.marital,
//         race: applicantDetails.race,
//         otherRace: applicantDetails.otherRace,
//         religion: applicantDetails.religion,
//         otherReligion: applicantDetails.otherReligion,

//         // personalDetails
//         icNo: personalDetails.icNo,
//         icExpiry: personalDetails.icExpiry,
//         icColour: personalDetails.icColour,
//         passportNo: personalDetails.passportNo,
//         alternateNo: personalDetails.alternateNo,
//         passportIssued: personalDetails.passportIssued,
//         passportExpiry: personalDetails.passportExpiry,
//         passportDestination: personalDetails.passportDestination,
//         contactNo: personalDetails.contactNo,
//         presentAddress: personalDetails.presentAddress,
//         permanentAddress: personalDetails.permanentAddress,
//         drivingLicense: personalDetails.drivingLicense,
//         language: personalDetails.language,
//         familyDetails: personalDetails.familyDetails,
//         educationDetails: personalDetails.educationDetails,
//         workExperience: personalDetails.workExperience,

//         // educationDetails
//         referees: educationDetails.referees?.map(referee => ({
//           name: referee.name,
//           address: referee.address,
//           phoneNumber: referee.phoneNumber,
//           profession: referee.profession,
//         })) || [],
//         relatives: educationDetails.relatives?.map(relative => ({
//           name: relative.name,
//           position: relative.position,
//           relationship: relative.relationship,
//         })) || [],
//         description: educationDetails.description || "",
//         emergencyContact: educationDetails.emergencyContact?.map(contact => ({
//           name: contact.name,
//           relationship: contact.relationship,
//           address: contact.address,
//           phoneNumber: contact.phoneNumber,
//           bloodGroup: contact.bloodGroup,
//         })) || [],
//         disease: educationDetails.disease || "",
//         liquor: educationDetails.liquor || "",
//         crime: educationDetails.crime || "",
//         diseaseDescription: educationDetails.disease === "Yes" ? educationDetails.diseaseDescription || "" : "",
//         liquorDescription: educationDetails.liquor === "Yes" ? educationDetails.liquorDescription || "" : "",
//         crimeDescription: educationDetails.crime === "Yes" ? educationDetails.crimeDescription || "" : "",

//         // otherDetails
//         salaryException: otherDetails.salaryException || "",
//         noticePeriod: otherDetails.noticePeriod || "",
//         perInterviewStatus: otherDetails.perInterviewStatus || "",
//         perInterviewDescription: otherDetails.perInterviewStatus === "yes" ? otherDetails.perInterviewDescription || "" : "",
//         supportInfo: otherDetails.supportInfo || "",
//         uploadResume: formData.uploadResume,
//         uploadCertificate: formData.uploadCertificate,
//         uploadPassport: formData.uploadPassport,
//       }
//       console.log(totalData)
//       // Combine all form data
//       const result = await client.graphql({
//         query: createCandidateApplicationForm,
//         variables: {
//           input: {
//             // totalData
//             profilePhoto: applicantDetails.profilePhoto,
//             position: applicantDetails.position,
//             contractType: applicantDetails.contractType,
//             employeeType: applicantDetails.employeeType,
//             name: applicantDetails.name,
//             chinese: applicantDetails.chinese,
//             gender: applicantDetails.gender,
//             dateOfBirth: applicantDetails.dateOfBirth,
//             age: applicantDetails.age,
//             email: applicantDetails.email,
//             countryOfBirth: applicantDetails.countryOfBirth,
//             nationality: applicantDetails.nationality,
//             otherNationality: applicantDetails.otherNationality,
//             marital: applicantDetails.marital,
//             race: applicantDetails.race,
//             otherRace: applicantDetails.otherRace,
//             religion: applicantDetails.religion,
//             otherReligion: applicantDetails.otherReligion,

//             // personalDetails
//             icNo: personalDetails.icNo,
//             icExpiry: personalDetails.icExpiry,
//             icColour: personalDetails.icColour,
//             passportNo: personalDetails.passportNo,
//             alternateNo: personalDetails.alternateNo,
//             passportIssued: personalDetails.passportIssued,
//             passportExpiry: personalDetails.passportExpiry,
//             passportDestination: personalDetails.passportDestination,
//             contactNo: personalDetails.contactNo,
//             presentAddress: personalDetails.presentAddress,
//             permanentAddress: personalDetails.permanentAddress,
//             drivingLicense: personalDetails.drivingLicense,
//             language: personalDetails.language,
//             familyDetails: personalDetails.familyDetails,
//             educationDetails: personalDetails.educationDetails,
//             workExperience: personalDetails.workExperience,

//             // educationDetails
//             referees: educationDetails.referees?.map(referee => ({
//               name: referee.name,
//               address: referee.address,
//               phoneNumber: referee.phoneNumber,
//               profession: referee.profession,
//             })) || [],
//             relatives: educationDetails.relatives?.map(relative => ({
//               name: relative.name,
//               position: relative.position,
//               relationship: relative.relationship,
//             })) || [],
//             description: educationDetails.description || "",
//             emergencyContact: educationDetails.emergencyContact?.map(contact => ({
//               name: contact.name,
//               relationship: contact.relationship,
//               address: contact.address,
//               phoneNumber: contact.phoneNumber,
//               bloodGroup: contact.bloodGroup,
//             })) || [],
//             disease: educationDetails.disease || "",
//             liquor: educationDetails.liquor || "",
//             crime: educationDetails.crime || "",
//             diseaseDescription: educationDetails.disease === "Yes" ? educationDetails.diseaseDescription || "" : "",
//             liquorDescription: educationDetails.liquor === "Yes" ? educationDetails.liquorDescription || "" : "",
//             crimeDescription: educationDetails.crime === "Yes" ? educationDetails.crimeDescription || "" : "",

//             // otherDetails
//             salaryException: otherDetails.salaryException || "",
//             noticePeriod: otherDetails.noticePeriod || "",
//             perInterviewStatus: otherDetails.perInterviewStatus || "",
//             perInterviewDescription: otherDetails.perInterviewStatus === "yes" ? otherDetails.perInterviewDescription || "" : "",
//             supportInfo: otherDetails.supportInfo || "",
//           }
//         }
//       });

//       console.log('Successfully submitted:', result);

//       // Clear localStorage after successful submission
//       // localStorage.removeItem('applicantDetails');
//       // localStorage.removeItem('personalDetails');
//       // localStorage.removeItem('educationDetails');
//       // localStorage.removeItem('otherDetails');

//     } catch (error) {
//       console.error('Error submitting data to AWS:', JSON.stringify(error, null, 2));
//     }
//   };
//   const uploadResume = async (file) => {

//     try {
//       const result = await uploadData({
//         path:`uploadResume/${file.name}`,
//         data: file,
//       }).result;
//       const filePath = result.path;
//       const encodedFilePath = encodeURIComponent(filePath);

//       // Construct the full URL
//       const fileUrl = `https://awe-adinin-files-storage-1982502de-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
//       console.log("File uploaded successfully. File URL:", fileUrl);
//     } catch (error) {
//       console.log("Error uploading file:", error);
//     }
//   };
//   const uploadCerficate = async (file) => {

//     try {
//       const result = await uploadData({
//         path:`uploadCerficate/${file.name}`,
//         data: file,
//       }).result;
//       const filePath = result.path;
//       const encodedFilePath = encodeURIComponent(filePath);

//       // Construct the full URL
//       const fileUrl = `https://awe-adinin-files-storage-1982502de-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
//       console.log("File uploaded successfully. File URL:", fileUrl);
//     } catch (error) {
//       console.log("Error uploading file:", error);
//     }
//   };
//   const uploadPassport = async (file) => {

//     try {
//       const result = await uploadData({
//         path:`uploadPassport/${file.name}`,
//         data: file,
//       }).result;
//       const filePath = result.path;
//       const encodedFilePath = encodeURIComponent(filePath);

//       // Construct the full URL
//       const fileUrl = `https://awe-adinin-files-storage-1982502de-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
//       console.log("File uploaded successfully. File URL:", fileUrl);
//     } catch (error) {
//       console.log("Error uploading file:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
//       {/* Salary Expected */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">Salary Expected</label>
//         <input
//           type="text"
//           {...register('salaryException')}
//           className="mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//         />
//       </div>

//       {/* Termination Notice */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">Termination Notice for Present job (month/Date)</label>
//         <input
//           type="text"
//           {...register('noticePeriod')}
//           className="mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//         />
//         {errors.noticePeriod && <p className="text-[red] text-xs mt-1">{errors.noticePeriod.message}</p>}
//       </div>

//       {/* Interviewed Before */}
//       <div className="mb-4">
//         <label className="text_size_6">Have you been interviewed for a position at this company before?</label>
//         <div className="flex justify-between items-center mt-2 mb-4">
//           <div>
//             <Controller
//               name="perInterviewStatus"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <input
//                     type="radio"
//                     id="yes"
//                     {...field}
//                     value="yes"
//                     className="mr-2 p-3"
//                   />
//                   <label htmlFor="yes" className="mr-4 text_size_6">Yes</label>

//                   <input
//                     type="radio"
//                     id="no"
//                     {...field}
//                     value="no"
//                     className="mr-2 p-3"
//                     defaultChecked
//                   />
//                   <label htmlFor="no" className="text_size_6">No</label>
//                 </>
//               )}
//             />
//             {errors.perInterviewStatus && (
//               <p className="text-[red] text-xs mt-1">{errors.perInterviewStatus.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="w-[350px] text_size_7">If yes, please give Details</label>
//             <Controller
//               name="perInterviewDescription"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   disabled={watch('perInterviewStatus') !== 'yes'}
//                   className={`mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full ${
//                     errors.perInterviewDescription ? 'border-red-500' : ''
//                   }`}
//                 />
//               )}
//             />
//             {errors.perInterviewDescription && (
//               <p className="text-[red] text-xs mt-4">{errors.perInterviewDescription.message}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Support Information */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">Any other information you wish to provide?</label>
//         <textarea
//           {...register('supportInfo')}
//           className="resize-none mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           rows="4"
//         ></textarea>
//       </div>

//         {/* File Uploads */}
//        <div className="my-5">
//          <label className="text_size_6">Choose file</label>
//          <div className="flex items-center justify-between mt-3 mb-10">
//           {/* Resume Upload */}
//  <div>
//             <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
//               Upload Resume
//               <input
//                 type="file"
//                 onChange={(e) => handleFileChange(e, 'uploadResume')}
//                 className="hidden"
//                 accept=".pdf"
//               />
//               <span className="ml-2">
//                 <GoUpload />
//               </span>
//             </label>
//             {errors.uploadResume && (
//               <p className="text-[red] text-xs mt-1">{errors.uploadResume.message}</p>
//             )}
//           </div>

//            {/* Certificate Upload */}
//             <div>
//             <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
//               Qualification Certificate
//               <input
//                 type="file"
//                 onChange={(e) => handleFileChange(e, 'uploadCertificate')}
//                 className="hidden"
//                 accept=".jpg,.png"
//               />
//               <span className="ml-2">
//                 <GoUpload />
//               </span>
//             </label>
//             {errors.uploadCertificate && (
//               <p className="text-[red] text-xs mt-1">{errors.uploadCertificate.message}</p>
//             )}
//           </div>

//            {/* Passport Upload */}
//            <div>
//             <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
//               Upload IC / Passport
//               <input
//                 type="file"
//                 onChange={(e) => handleFileChange(e, 'uploadPassport')}
//                 className="hidden"
//                 accept=".jpg,.png"
//               />
//               <span className="ml-2">
//                 <GoUpload />
//               </span>
//             </label>
//             {errors.uploadPassport && (
//               <p className="text-[red] text-xs mt-1">{errors.uploadPassport.message}</p>
//             )}
//            </div>
//          </div>
//       </div>
//       <div className="text-center my-6">
//         <button
//           type="submit"
//           className="bg-dark_purple hover:bg-light_purple text-white py-2 px-6 rounded-md"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { CandidatesSchema } from "../../services/Validation";
// import { generateClient } from "aws-amplify/api";
// import { createCandidateApplicationForm } from '../../graphql/mutations'; // GraphQL mutation

// const client = generateClient();

// export const OtherDetails = () => {
//   const [formData, setFormData] = useState({
//     salaryException: '',
//     noticePeriod: '',
//     perInterviewStatus: '',
//     perInterviewDescription: '',
//     supportInfo: '',
//   });

//   // Initialize form values from localStorage
//   useEffect(() => {
//     const applicantDetails = JSON.parse(localStorage.getItem('applicantDetails')) || {};
//     const personalDetails = JSON.parse(localStorage.getItem('personalDetails')) || {};
//     const educationDetails = JSON.parse(localStorage.getItem('educationDetails')) || {};

//     setFormData({
//       profilePhoto: applicantDetails.profilePhoto || '',
//       position: applicantDetails.position || '',
//       contractType: applicantDetails.contractType || '',
//       employeeType: applicantDetails.employeeType || '',
//       name: applicantDetails.name || '',
//       chinese: applicantDetails.chinese || '',
//       gender: applicantDetails.gender || '',
//       dateOfBirth: applicantDetails.dateOfBirth || '',
//       age: applicantDetails.age || '',
//       email: applicantDetails.email || '',
//       countryOfBirth: applicantDetails.countryOfBirth || '',
//       nationality: applicantDetails.nationality || '',
//       otherNationality: applicantDetails.otherNationality || '',
//       marital: applicantDetails.marital || '',
//       race: applicantDetails.race || '',
//       otherRace: applicantDetails.otherRace || '',
//       religion: applicantDetails.religion || '',
//       otherReligion: applicantDetails.otherReligion || '',

//       // personalDetails
//       icNo: personalDetails.icNo || '',
//       icExpiry: personalDetails.icExpiry || '',
//       icColour: personalDetails.icColour || '',
//       passportNo: personalDetails.passportNo || '',
//       alternateNo: personalDetails.alternateNo || '',
//       passportIssued: personalDetails.passportIssued || '',
//       passportExpiry: personalDetails.passportExpiry || '',
//       passportDestination: personalDetails.passportDestination || '',
//       contactNo: personalDetails.contactNo || '',
//       presentAddress: personalDetails.presentAddress || '',
//       permanentAddress: personalDetails.permanentAddress || '',
//       drivingLicense: personalDetails.drivingLicense || '',
//       language: personalDetails.language || '',
//       familyDetails: personalDetails.familyDetails || '',
//       educationDetails: personalDetails.educationDetails || '',
//       workExperience: personalDetails.workExperience || '',

//       // educationDetails
//       referees: educationDetails.referees?.map(referee => ({
//         name: referee.name,
//         address: referee.address,
//         phoneNumber: referee.phoneNumber,
//         profession: referee.profession,
//       })) || [],
//       relatives: educationDetails.relatives?.map(relative => ({
//         name: relative.name,
//         position: relative.position,
//         relationship: relative.relationship,
//       })) || [],
//       description: educationDetails.description || "",
//       emergencyContact: educationDetails.emergencyContact?.map(contact => ({
//         name: contact.name,
//         relationship: contact.relationship,
//         address: contact.address,
//         phoneNumber: contact.phoneNumber,
//         bloodGroup: contact.bloodGroup,
//       })) || [],
//       disease: educationDetails.disease || "",
//       liquor: educationDetails.liquor || "",
//       crime: educationDetails.crime || "",
//       diseaseDescription: educationDetails.disease === "Yes" ? educationDetails.diseaseDescription || "" : "",
//       liquorDescription: educationDetails.liquor === "Yes" ? educationDetails.liquorDescription || "" : "",
//       crimeDescription: educationDetails.crime === "Yes" ? educationDetails.crimeDescription || "" : "",

//       // otherDetails
//       salaryException: '',
//       noticePeriod: '',
//       perInterviewStatus: '',
//       perInterviewDescription: '',
//       supportInfo: '',
//     });
//   }, []);

//   const { register, control, watch, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(CandidatesSchema),
//     defaultValues: formData,
//   });

//   const onSubmit = async (data) => {
//     try {
//       // Combine all form data
//       const totalData = {
//         ...formData,
//         ...data,
//       };

//       // Submit the combined data to AWS
//       const result = await client.graphql({
//         query: createCandidateApplicationForm,
//         variables: { input: totalData },
//       });

//       console.log('Successfully submitted:', result);

//       // Clear localStorage after successful submission
//       // localStorage.removeItem('applicantDetails');
//       // localStorage.removeItem('personalDetails');
//       // localStorage.removeItem('educationDetails');
//       // localStorage.removeItem('otherDetails');

//     } catch (error) {
//       console.error('Error submitting data to AWS:', JSON.stringify(error, null, 2));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
//       {/* Salary Expected */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">Salary Expected</label>
//         <input
//           type="text"
//           {...register('salaryException')}
//           className="mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//         />
//       </div>

//       {/* Termination Notice */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">Termination Notice for Present job (month/Date)</label>
//         <input
//           type="text"
//           {...register('noticePeriod')}
//           className="mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//         />
//         {errors.noticePeriod && <p className="text-[red] text-xs mt-1">{errors.noticePeriod.message}</p>}
//       </div>

//       {/* Interviewed Before */}
//       <div className="mb-4">
//         <label className="text_size_6">Have you been interviewed for a position at this company before?</label>
//         <div className="flex justify-between items-center mt-2 mb-4">
//           <div>
//             <Controller
//               name="perInterviewStatus"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   <input
//                     type="radio"
//                     id="yes"
//                     {...field}
//                     value="yes"
//                     className="mr-2 p-3"
//                   />
//                   <label htmlFor="yes" className="mr-4 text_size_6">Yes</label>

//                   <input
//                     type="radio"
//                     id="no"
//                     {...field}
//                     value="no"
//                     className="mr-2 p-3"
//                   />
//                   <label htmlFor="no" className="text_size_6">No</label>
//                 </>
//               )}
//             />
//             {errors.perInterviewStatus && (
//               <p className="text-[red] text-xs mt-1">{errors.perInterviewStatus.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="w-[350px] text_size_7">If yes, please give Details</label>
//             <Controller
//               name="perInterviewDescription"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   disabled={watch('perInterviewStatus') !== 'yes'}
//                   className={`mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full ${errors.perInterviewDescription ? 'border-red-500' : ''}`}
//                 />
//               )}
//             />
//             {errors.perInterviewDescription && (
//               <p className="text-[red] text-xs mt-4">{errors.perInterviewDescription.message}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Support Information */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">Any other information you wish to provide?</label>
//         <textarea
//           {...register('supportInfo')}
//           className="resize-none mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           rows="4"
//         ></textarea>
//       </div>
//       <div className="text-center my-6">
//         <button
//           type="submit"
//           className="primary_btn"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };













// import React, { useState, useEffect } from 'react';
// import AweLogo from '../../assets/logo/logo-with-name.svg';
// import { ScheduleInter } from '../user/Form/ScheduleInter';
// import axios from 'axios'; // Import axios to handle the API call

// export const ReviewForm = ({ candidate, onClose, showDecisionButtons }) => { // Pass showDecisionButtons as a prop
//   const [isScheduleOpen, setIsScheduleOpen] = useState(false);

//   // Function to handle opening the Schedule Interview modal
//   const handleScheduleInterview = () => {
//     setIsScheduleOpen(true);
//   };

//   // Function to handle closing the Schedule Interview modal
//   const closeScheduleInterview = () => {
//     setIsScheduleOpen(false);
//   };

//   const handleRejected = () => {
//     onClose(); 
//   };

//   const handleSelected = () => {
//     onClose(); 
//   };

//   useEffect(() => {
//     // Disable scrolling on the body when the popup is open
//     document.body.style.overflow = 'hidden';

//     return () => {
//       // Re-enable scrolling when the popup is closed
//       document.body.style.overflow = '';
//     };
//   }, []);

//   // Function to save the interview data
//   const handleSave = async (interviewData, path) => {
//     try {
//       const payload = {
//         ...interviewData,
//         ...candidate
//       };
//       console.log('Interview Data:', interviewData);  // Log interview data
//       console.log('Final Payload:', payload);  // Log final payload before sending to API
  
//       // Post the data to the API endpoint for interview-scheduled candidates
//       await axios.post('https://66e2301ac831c8811b575861.mockapi.io/api/v1/candidates/awe_InterviewData', payload);
  
//       // Only redirect after the API call has succeeded
//       console.log("Data successfully posted to API");  // Log after successful API call

//       // Only redirect after the API call has succeeded
//       window.location.href = path;
//     } catch (error) {
//       console.error('Failed to schedule interview:', error.response ? error.response.data : error.message);
//     }
//   };
  
//   useEffect(() => {
//     console.log(candidate);
//   }, [candidate]);
  
//   return (
//     <section>
//       {/* Main Review Form */}
//       <div className="fixed top-0 left-0 inset-0 bg-grey bg-opacity-80 center z-[60]">
//         <div className="bg-white w-full max-w-[700px] max-h-[90vh] p-6 rounded-lg relative overflow-y-auto">
//           {/* Close button */}
//           <button className="absolute top-2 right-4 w-8 h-8 border rounded-full text-xl" onClick={onClose}>
//             &times;
//           </button>

//           {/* Form Heading with Logo */}
//           <div className="flex items-center gap-20">
//             <img src={AweLogo} alt="Logo" className="max-w-[180px] w-full" />
//             <h2 className="text-xl font-bold underline">Employee Application Review</h2>
//           </div>

//           {/* Pre-filled Form Content */}
//           <div className="mt-6 relative">
//             <div className="flex justify-end absolute right-0 top-0 mt-4 mr-4">
//               <img
//                 src={candidate.image}
//                 alt={`${candidate.name}'s photo`}
//                 className="w-32 h-36 border-2 border-lite_grey shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]"
//               />
//             </div>

//             {/* Candidate Info */}
//             {[
//               { label: 'Applying For', value: candidate.position },
//               { label: 'Name', value: candidate.name },
//               { label: 'Gender', value: candidate.gender },
//               { label: 'Nationality', value: candidate.nationality },
//               { label: 'Position', value: candidate.position },          
//               { label: 'Experience', value: candidate.experience },
//               { label: 'Contract' , value:candidate.contract},
//               { label: 'Type', value:candidate.type},
//               { label: 'Email', value: candidate.email },
//               { label: 'Contact', value: candidate.contact },
//             ].map((item, index) => (
//               <div key={index} className="grid grid-cols-3 gap-4 mb-4">
//                 <strong className="w-full">{item.label}</strong>
//                 <span className="w-full col-span-2">: &nbsp;{item.value}</span>
//               </div>
//             ))}
//           </div>

//           {/* Bottom Buttons: Reject and Schedule Interview */}
//           <div className="flex justify-center mt-6 gap-5">
//             {!showDecisionButtons && (
//               <>
//                 <button
//                   className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
//                   onClick={onClose}
//                 >
//                   Reject
//                 </button>
//                 <button
//                   className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
//                   onClick={handleScheduleInterview} // Opens the schedule interview form
//                 >
//                   Schedule Interview
//                 </button>
//               </>
//             )}

//             {/* Conditionally render the Rejected and Selected buttons */}
//             {showDecisionButtons && (
//               <>
//                 <button
//                   className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
//                   onClick={handleRejected}
//                 >
//                   Rejected
//                 </button>
//                 <button
//                   className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
//                   onClick={handleSelected}
//                 >
//                   Selected
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Schedule Interview Modal */}
//       {isScheduleOpen && (
//         <div className="fixed top-0 left-0 inset-0 bg-black bg-opacity-50 w-full z-[70]">
          
//             <ScheduleInter
//             candidate={candidate}
//             onSave={handleSave} 
//             onClose={closeScheduleInterview}
//             />
          
            
//         </div>
//       )}
//     </section>
//   );
// };




// import React, { useState, useEffect } from 'react';
// import { BsCloudUpload } from 'react-icons/bs';
// import { TabConfig } from './TabConfig';

// export const StatusForm = ({ candidate, onClose, onSave }) => {
//   const [activeTab, setActiveTab] = useState('Interview'); // Default active tab is 'Interview'
//   const [formData, setFormData] = useState({
//     Interview: { date: '', time: '', venue: '', interviewType: '', interviewer: '', message: '' },
//     Candidate: { name: '', position: '', department: '' },
//     LOI: { loiIssueDate: '', loiAcceptDate: '', loiDeclineDate: '', declineReason: '',  loiFile: null },
//     CVEV: { cvecApproveDate: '', cvecFile: null },
//     PAAF: { paafApproveDate: '', paafFile: null },
//     Mobilization: { mobSignDate: '', mobFile: null },
//   });

//   useEffect(() => {
//     if (candidate) {
//       // Prefill formData with selected candidate data
//       setFormData({
//         Interview: {
//           date: candidate.date || '',
//           time: candidate.time || '',
//           venue: candidate.venue || '',
//           interviewType: candidate.interviewType || '',
//           interviewer: candidate.interviewer || '',
//           message: candidate.message || '',
//         },
//         Candidate: {
//           name: candidate.name || '',
//           position: candidate.position || '',
//           department: candidate.department || '',
//         },
//         LOI: {
//           loiIssueDate: candidate.loiIssueDate || '',
//           loiAcceptDate: candidate.loiAcceptDate || '',
//           loiDeclineDate: candidate.loiDeclineDate || '',
//           declineReason: candidate.declineReason || '',
//           loiFile: null,
//         },
//         CVEV: {
//           cvecApproveDate: candidate.cvecApproveDate || '',
//           cvecFile: null,
//         },
//         PAAF: {
//           paafApproveDate: candidate.paafApproveDate || '',
//           paafFile: null,
//         },
//         Mobilization: {
//           mobSignDate: candidate.mobSignDate || '',
//           mobFile: null,
//         },
//       });
//     }
//   }, [candidate]);

//   const handleInputChange = (tab, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [tab]: {
//         ...prev[tab],
//         [field]: value,
//       },
//     }));
//   };

//   const handleFileChange = (tab, field, file) => {
//     setFormData((prev) => ({
//       ...prev,
//       [tab]: {
//         ...prev[tab],
//         [field]: file,
//       },
//     }));
//   };

//   const handleSave = () => {
//     onSave({ ...candidate, ...formData.Interview });
//     onClose();  // Close the form after saving
//   };

//   const renderInputs = () => {
//     return TabConfig[activeTab].map((input) => (
//       <label key={input.field} className="block">
//         {input.label}:
//         {input.type !== 'file' ? (
//           <input
//             type={input.type}
//             className="w-full border p-2 rounded mt-1"
//             value={formData[activeTab][input.field]}
//             onChange={(e) => handleInputChange(activeTab, input.field, e.target.value)}
//           />
//         ) : (
//           <div className="flex items-center mt-1">
//             <input
//               type="file"
//               className="hidden"
//               id={input.field}
//               onChange={(e) => handleFileChange(activeTab, input.field, e.target.files[0])}
//             />
//             <label htmlFor={input.field} className="flex items-center cursor-pointer text-lite_grey">
//               <BsCloudUpload className="mr-2 text-lg text-[#ab1234]" />
//               {formData[activeTab][input.field] ? formData[activeTab][input.field].name : 'Upload PDF'}
//             </label>
//           </div>
//         )}
//       </label>
//     ));
//   };

//   return (
//     <div className="fixed inset-0 bg-grey bg-opacity-80 z-50 center">
//       <div className="bg-white p-8 rounded-lg w-full max-w-[650px] h-[70vh] overflow-hidden">
//         <h2 className="text-xl font-bold mb-4 p-1 rounded-md bg-[#f7f183ea]">
//           Temp Id: {candidate?.tempid} &nbsp;&nbsp;&nbsp;&nbsp; Name: {candidate?.name}
//         </h2>

//         <div className="flex space-x-4 mb-6">
//           {Object.keys(TabConfig).map((tab) => (
//             <button
//               key={tab}
//               className={`px-3 py-1 rounded-lg whitespace-nowrap ${activeTab === tab ? 'border-2 border-[#FEF116] bg-[#FFFEF4]' : 'bg-[#DDDDDD]'}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Scrollable content */}
//         <div className="grid grid-cols-2 gap-x-10 overflow-y-auto h-[40vh] pr-4">
//           {renderInputs()}
//         </div>

//         <div className="flex justify-between mt-4">
//           <button
//             onClick={onClose}
//             className="border-2 border-grey hover:bg-slate_grey hover:text-white px-4 py-2 rounded-xl"
//           >
//             Close
//           </button>

//           <button
//             onClick={handleSave}
//             className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };



// import React, { useState, useEffect, useRef } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { LuFilter } from "react-icons/lu";
// import axios from "axios";
// import { Table } from "../../utils/Table"; // Reusable table component
// import { StatusForm } from "../recruitments/StatusForm";

// export const Status = () => {
//   const [data, setData] = useState([]); // Data will be fetched from API
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cvTypeDropdownOpen, setCvTypeDropdownOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [selectedInterviewCandidate, setSelectedInterviewCandidate] = useState(null);
//   const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedFilters, setSelectedFilters] = useState("Interview Scheduled");
//   const [filterBoxTitle, setFilterBoxTitle] = useState("Interview Scheduled");
//   const filterBoxRef = useRef(null);

//   // Fetch data and filter candidates who have "Interview Scheduled" status
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://66e2301ac831c8811b575861.mockapi.io/api/v1/candidates/awe_InterviewData");
//         const allData = response.data.map((item) => ({
//           ...item,
//           status: "Interview Scheduled", // Assuming all candidates have this status
//         }));

//         // Initially show all candidates with "Interview Scheduled"
//         const interviewScheduledData = allData.filter((item) => item.status === "Interview Scheduled");

//         setData(allData);
//         setFilteredData(interviewScheduledData);
//         setLoading(false);
//       } catch (err) {
//         setError("Error fetching data.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);


//   const toggleFilterBox = (event) => {
//     event?.stopPropagation();
//     setIsFilterBoxOpen((prevState) => !prevState);
//   };

//   const handleOptionSelect = (option) => {
//     let updatedOptions = [...selectedOptions];

//     // Update the selected options
//     if (updatedOptions.includes(option)) {
//       updatedOptions = updatedOptions.filter((opt) => opt !== option);
//     } else {
//       updatedOptions.push(option);
//     }

//     setSelectedOptions(updatedOptions);

//     // Filter data based on selected options
//     if (updatedOptions.length === 0) {
//       // If no options are selected, show all data
//       setFilteredData(data);
//     } else {
//       // Otherwise, filter based on selected options
//       const filtered = data.filter((d) => {
//         return updatedOptions.some((opt) => {
//           if (opt === "LOCAL") {
//             return d.nationality === "Brunei" || d.nationality === "Brunei PR";
//           }
//           if (opt === "NON LOCAL") {
//             return d.nationality !== "Brunei" && d.nationality !== "Brunei PR";
//           }
//           if (opt === "LPA") {
//             return d.contract === "LPA";
//           }
//           if (opt === "SAWP") {
//             return d.contract === "SAWP";
//           }
//           if (opt === "ONSHORE") {
//             return d.type === "OnShore";
//           }
//           if (opt === "OFFSHORE") {
//             return d.type === "OffShore";
//           }
//           return true;
//         });
//       });

//       setFilteredData(filtered);
//     }
//   };

//   const handleFilterChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedFilters(selectedValue);
//     setFilterBoxTitle(selectedValue);

//     const newFilteredData = data.filter((item) => item.status === selectedValue);
//     setFilteredData(newFilteredData);
//     setIsFilterBoxOpen(false);
//   };

//   const handleEditClick = (candidate) => {
//     setSelectedInterviewCandidate(candidate);
//     setIsFormVisible(true); // Show the status form when edit icon is clicked
//   };

//   const closeForm = () => setIsFormVisible(false);

//   const columns = [
//     "TempId",
//     "Name",
//     "Nationality",
//     "Position",
//     "Date",
//     "Time",
//     "Venue",
//     "Interviewer",
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (filterBoxRef.current && !filterBoxRef.current.contains(event.target)) {
//         setIsFilterBoxOpen(false);
//       }
//       if (!event.target.closest(".cvTypeDropdown")) {
//         setCvTypeDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleFormSave = (updatedCandidate) => {
//     // Update the main data array with the updated candidate information
//     const updatedData = data.map((candidate) =>
//       candidate.tempid === updatedCandidate.tempid
//         ? { ...candidate, ...updatedCandidate }  // Replace the old candidate data with the updated data
//         : candidate
//     );
  
//     setData(updatedData);        // Update the full data
//     setFilteredData(updatedData); // Ensure filtered data is updated as well
//     setIsFormVisible(false);     // Close the form after saving
//   };
  
//   // useEffect(() => {
//   //   console.log(Candidate);
//   // }, [Candidate]);
  

//   return (
//     <section className="screen-size min-h-screen mb-4">
//       <div className="relative">
//         {/* CV Type Dropdown */}
//         <button
//           className={`font-semibold py-2 px-6 mb-6 rounded-lg flex items-center ${
//             selectedOptions.length > 0 ? "bg-[#faf362]" : "bg-[#8d8f9036]"
//           } cvTypeDropdown`}
//           onClick={() => setCvTypeDropdownOpen(!cvTypeDropdownOpen)}
//         >
//           {selectedOptions.length > 0
//             ? selectedOptions.join(" + ")
//             : "CV TYPE"}
//           {cvTypeDropdownOpen ? (
//             <FaChevronUp className="ml-10" />
//           ) : (
//             <FaChevronDown className="ml-10" />
//           )}
//         </button>

//         {cvTypeDropdownOpen && (
//           <div className="absolute bg-white border shadow-lg rounded-lg z-20 cvTypeDropdown">
//             {["LOCAL", "NON LOCAL", "LPA", "SAWP", "ONSHORE", "OFFSHORE"].map(
//               (option) => (
//                 <label key={option} className="block w-full text-left px-4 py-2">
//                   <input
//                     type="checkbox"
//                     className="mr-2"
//                     checked={selectedOptions.includes(option)}
//                     onChange={() => handleOptionSelect(option)}
//                   />
//                   {option}
//                 </label>
//               )
//             )}
//           </div>
//         )}

//         {/* Filter Button */}
//         <button
//           onClick={toggleFilterBox}
//           className={`absolute top-0 right-0 px-6 py-2 font-semibold rounded-lg flex items-center ${
//             selectedFilters.length ? "bg-[#faf362]" : "bg-[#8d8f9036]"
//           }`}
//         >
//           <LuFilter className="mr-5" />
//           <span>{filterBoxTitle}</span>
//         </button>

//         {isFilterBoxOpen && (
//           <div
//             ref={filterBoxRef}
//             className="absolute top-12 right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50 flex flex-col space-y-2"
//           >
//             {[
//               "Interview Scheduled",
//               "Selected Candidate",
//               "LOI Accepted",
//               "CVEV_OffShore",
//               "PAAF_OnShore",
//               "Mobilization",
//             ].map((status) => (
//               <label
//                 key={status}
//                 className={`flex items-center font-semibold  space-x-2 hover:font-bold hover:text-[#c7bd03] p-2 rounded-md ${
//                   selectedFilters === status ? 'text-[#faf362]' : 'text-lite_grey'
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   className="w-5 h-6"
//                   name="status"
//                   value={status}
//                   checked={selectedFilters === status}
//                   onChange={(e) => handleFilterChange(e)}
//                 />
//                 <span>{status}</span>
//               </label>
//             ))}

//             {/* Reset Button */}
//             <button
//               className="mt-4 px-1 py-2 border-2 border-yellow rounded-lg shadow-lg hover:bg-[#faf362]"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedFilters("Interview Scheduled");
//                 setFilteredData(data.filter((item) => item.status === "Interview Scheduled"));
//                 setFilterBoxTitle("Interview Scheduled");
//                 setIsFilterBoxOpen(false);
//               }}
//             >
//               Reset
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Table rendering */}
//       {!loading && !error ? (
//         filteredData.length > 0 ? (
//           <Table
//             columns={columns}
//             data={filteredData}
//             showCheckboxes={false}
//             selectedRows={selectedRows}
//             currentPage="status"
//             selectedTable="status"
//             edited={handleEditClick} // Edit click shows StatusForm
//             showEditIcon={true}
//           />
//         ) : (
//           <div className="text-center text-grey py-10">No data found</div>
//         )
//       ) : (
//         <div>{loading ? "Loading..." : error}</div>
//       )}

//       {/* StatusForm */}
//       {isFormVisible && selectedInterviewCandidate && (
//         <StatusForm
//           candidate={selectedInterviewCandidate}
//           onClose={closeForm}
//           onSave={handleFormSave}
//         />
//       )}

//     </section>
//   );
// };


{/* <div>
  <div className="grid grid-cols-3 gap-5 my-2 text_size_5">
    <label>Position Revision</label>
    <label>Effective Date</label>
    <label>Upload</label>
  </div>

    <div className="grid grid-cols-3 gap-4 items-center relative mb-8">
      
      <input
        type="text"
        {...register(`positionFields.positionRevision`)}
        placeholder="Enter Revised Position"
        className="input-field px-3 py-2 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />
      {errors.positionFields?.positionRevision && (
        <p className="text-[red] text-[13px] mt-1">
          {errors.positionFields.positionRevision.message}
        </p>
      )}

      <input
        type="date"
        {...register(`positionFields.${index}.positionRevisioneffectiveDate`)}
        className="input-field px-3 py-2 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />
      {errors.positionFields?.[index]?.positionRevisioneffectiveDate && (
        <p className="text-[red] text-[13px] mt-1">
          {errors.positionFields[index].positionRevisioneffectiveDate.message}
        </p>
      )}

      <label className="w-full max-w-[300px] mt-2 flex items-center px-3 py-[0.700rem] text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept=".pdf"
        />
        <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20">
          <GoUpload /> Position Record
        </span>
      </label>
    </div>
  </div> */}

  {/* <div>
  <div className="grid grid-cols-3 gap-5 my-2 text_size_5">
    <label>Salary Revision</label>
    <label>Effective Date</label>
    <label>Upload</label>
  </div>

  {salaryFields.map((field, index) => (
    <div key={field.id} className="grid grid-cols-3 gap-4 items-center relative mb-8">
      
      <input
        type="text"
        {...register(`salaryFields.${index}.revisionSalaryPackage`)}
        placeholder="Enter Revised Salary"
        className="input-field px-3 py-2 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />
      {errors.salaryFields?.[index]?.revisionSalaryPackage && (
        <p className="text-[red] text-[13px] mt-1">
          {errors.salaryFields[index].revisionSalaryPackage.message}
        </p>
      )}

      <input
        type="date"
        {...register(`salaryFields.${index}.revisionSalaryeffectiveDate`)}
        className="input-field px-3 py-2 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />
      {errors.salaryFields?.[index]?.revisionSalaryeffectiveDate && (
        <p className="text-[red] text-[13px] mt-1">
          {errors.salaryFields[index].revisionSalaryeffectiveDate.message}
        </p>
      )}

      <label className="w-full max-w-[300px] mt-2 flex items-center px-3 py-[0.700rem] text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onClick={() => appendSalary({
            revisionSalaryPackage: '',
            revisionSalaryeffectiveDate: '',
          })}
        />
        <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20">
          <GoUpload /> Salary Record
        </span>
      </label>

      {index === 0 && (
        <button
          type="button"
          onClick={() => appendSalary({ revisionSalaryPackage: '', revisionSalaryeffectiveDate: '' })}
          className="text-medium_grey text-[25px] absolute right-9 mt-2"
        >
          <FiPlusSquare />
        </button>
      )}
    </div>
  ))}
</div> */}

{/* <div>
  <div className="grid grid-cols-3 gap-5 my-2 text_size_5">
    <label>Leave Passage Revision</label>
    <label>Effective Date</label>
    <label>Upload</label>
  </div>

  {leavepassFields.map((field, index) => (
    <div key={field.id} className="grid grid-cols-3 gap-4 items-center relative mb-8">
      
      <input
        type="text"
        {...register(`leavepassFields.${index}.revisionLeavePassage`)}
        placeholder="Enter Revised Leave Passage"
        className="input-field px-3 py-2 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />
      {errors.leavepassFields?.[index]?.revisionLeavePassage && (
        <p className="text-[red] text-[13px] mt-1">
          {errors.leavepassFields[index].revisionLeavePassage.message}
        </p>
      )}

      <input
        type="date"
        {...register(`leavepassFields.${index}.revisionLeavePassageeffectiveDate`)}
        className="input-field px-3 py-2 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />
      {errors.leavepassFields?.[index]?.revisionLeavePassageeffectiveDate && (
        <p className="text-[red] text-[13px] mt-1">
          {errors.leavepassFields[index].revisionLeavePassageeffectiveDate.message}
        </p>
      )}

      <label className="w-full max-w-[300px] mt-2 flex items-center px-3 py-[0.700rem] text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onClick={() => appendLeavepass({
            revisionLeavePassage: '',
            revisionLeavePassageeffectiveDate: '',
          })}
        />
        <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20">
          <GoUpload /> Leave Passage Record
        </span>
      </label>

      {index === 0 && (
        <button
          type="button"
          onClick={() => appendLeavepass({ revisionLeavePassage: '', revisionLeavePassageeffectiveDate: '' })}
          className="text-medium_grey text-[25px] absolute right-9 mt-2"
        >
          <FiPlusSquare />
        </button>
      )}
    </div>
  ))}
</div> */}

{/* <div>
  <div className="grid grid-cols-3 gap-5 my-2 text_size_5">
    <label>Annual Leave Revision</label>
    <label>Effective Date</label>
    <label>Upload</label>
  </div>

  {annualFields.map((field, index) => (
    <div key={field.id} className="grid grid-cols-3 gap-4 items-center relative mb-8">
      
      <input
        type="text"
        {...register(`annualFields.${index}.revisionAnnualLeave`)}
        placeholder="Enter Revised Annual Leave"
        className="input-field px-3 py-2 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />
      {errors.annualFields?.[index]?.revisionAnnualLeave && (
        <p className="text-[red] text-[13px] mt-1">
          {errors.annualFields[index].revisionAnnualLeave.message}
        </p>
      )}

      <input
        type="date"
        {...register(`annualFields.${index}.revisionAnnualLeaveeffectiveDate`)}
        className="input-field px-3 py-2 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />
      {errors.annualFields?.[index]?.revisionAnnualLeaveeffectiveDate && (
        <p className="text-[red] text-[13px] mt-1">
          {errors.annualFields[index].revisionAnnualLeaveeffectiveDate.message}
        </p>
      )}

      <label className="w-full max-w-[300px] mt-2 flex items-center px-3 py-[0.700rem] text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onClick={() => appendAnnual({
            revisionAnnualLeave: '',
            revisionAnnualLeaveeffectiveDate: '',
          })}
        />
        <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20">
          <GoUpload /> Annual Leave Record
        </span>
      </label>

      {index === 0 && (
        <button
          type="button"
          onClick={() => appendAnnual({ revisionAnnualLeave: '', revisionAnnualLeaveeffectiveDate: '' })}
          className="text-medium_grey text-[25px] absolute right-9 mt-2"
        >
          <FiPlusSquare />
        </button>
      )}
    </div>
  ))}
</div> */}

{/* <div>
  <div className="grid grid-cols-3 gap-5 my-2 text_size_5">
    <label>Contract of Employee</label>
    <label>Effective Date</label>
    <label>Upload</label>
  </div>

  {contractFields.map((field, index) => (
    <div key={field.id} className="grid grid-cols-3 gap-4 items-center relative mb-8">
      
      <input
        type="text"
        {...register(`contractFields.${index}.contractOfEmployee`)}
        placeholder="Enter Contract Details"
        className="input-field px-3 py-2 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />
      {errors.contractFields?.[index]?.contractOfEmployee && (
        <p className="text-[red] text-[13px] mt-1">
          {errors.contractFields[index].contractOfEmployee.message}
        </p>
      )}

      <input
        type="date"
        {...register(`contractFields.${index}.contractEffectDate`)}
        className="input-field px-3 py-2 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />
      {errors.contractFields?.[index]?.contractEffectDate && (
        <p className="text-[red] text-[13px] mt-1">
          {errors.contractFields[index].contractEffectDate.message}
        </p>
      )}

      <label className="w-full max-w-[300px] mt-2 flex items-center px-3 py-[0.700rem] text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onClick={() => appendContract({
            contractOfEmployee: '',
            contractEffectDate: '',
          })}
        />
        <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20">
          <GoUpload /> Contract Record
        </span>
      </label>
   </div>
  ))}
</div> */}

  // const { fields: positionFields, append: appendPosition } = useFieldArray({
  //   control,
  //   name: "positionFields",
  // });
  // const { fields: salaryFields, append: appendSalary } = useFieldArray({
  //   control,
  //   name: "salaryFields",
  // });
  // const { fields: leavepassFields, append: appendLeavepass } = useFieldArray({
  //   control,
  //   name: "leavepassFields",
  // });
  // const { fields: annualFields, append: appendAnnual } = useFieldArray({
  //   control,
  //   name: "annualFields",
  // });
  // const { fields: contractFields, append: appendContract } = useFieldArray({
  //   control,
  //   name: "contractFields",
  // });







