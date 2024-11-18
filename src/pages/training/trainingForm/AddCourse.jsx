import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CourceValidationSchema } from "../../../services/TrainingValidation";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { useState } from "react";
import { TrainingCertificatesForm } from "./TrainingCertificatesForm";
import { LuPlusSquare } from "react-icons/lu";

export const AddCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CourceValidationSchema),
  });

  const [show, setShow] = useState(true);
  const [courseNameFields, setCourseNameFields] = useState([""]);
  const [companyFields, setCompanyFields] = useState([""]);

  // Submit function to capture form data
  const onSubmit = (data) => {
    // Structure the data to send
    const dataToSend = {
      courseSelect: data.courceSelect,  // Capture the courseSelect field
      courseNameFields: data.courseNameFields,  // Capture the course name fields
      companyFields: data.companyFields,  // Capture the company fields
    };
    
    // Log or send the data to the backend
    console.log(dataToSend);
  };

  // Functions to add individual fields
  const addCourseNameField = () => setCourseNameFields([...courseNameFields, ""]);
  const addCompanyField = () => setCompanyFields([...companyFields, ""]);

  return (
    <section className="p-10 center flex-col gap-16 bg-[#F8F8F8]">
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/training" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <article className="flex-1 flex gap-5 text-dark_grey">
          <p
            className={`text-center mt-2 text_size_2 relative ${
              show
                ? "after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0"
                : ""
            }`}
            onClick={() => setShow(true)}
          >
            Add Course
          </p>
          <p
            className={`text-center mt-2 text_size_2 relative ${
              show
                ? ""
                : "after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0"
            }`}
            onClick={() => setShow(false)}
          >
            Training Certificates
          </p>
        </article>

        <div className="flex-1">
          <SearchDisplay
            searchIcon2={<IoSearch />}
            placeholder="Employee Id"
            rounded="rounded-lg"
          />
        </div>
      </div>

      {show && (
        <div className="screen-size center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* CourceSelect field */}
              <div className="mb-4 relative">
                <label className="font-semibold">Select Course:</label>
                <input
                  type="text"
                  {...register("courceSelect")}
                  className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                />
                {errors.courceSelect && (
                  <p className="text-[red] text-[13px] mt-1">
                    {errors.courceSelect.message}
                  </p>
                )}
              </div>

              {/* CourseName fields */}
              <div className="mb-4 relative">
                <label className="font-semibold">Course Name:</label>
                {courseNameFields.map((_, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      {...register(`courseNameFields[${index}]`)}
                      className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                    />
                    {errors.courseNameFields && errors.courseNameFields[index] && (
                      <p className="text-[red] text-[13px] mt-1">
                        {errors.courseNameFields[index].message}
                      </p>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCourseNameField}
                  className="absolute top-10 -right-7 text-medium_grey text-[18px]"
                >
                  <LuPlusSquare />
                </button>
              </div>

              {/* Company fields */}
              <div className="mb-4 relative">
                <label className="font-semibold">Training Company:</label>
                {companyFields.map((_, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      {...register(`companyFields[${index}]`)}
                      className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                    />
                    {errors.companyFields && errors.companyFields[index] && (
                      <p className="text-[red] text-[13px] mt-1">
                        {errors.companyFields[index].message}
                      </p>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCompanyField}
                  className="absolute top-10 -right-7 text-medium_grey text-[18px]"
                >
                  <LuPlusSquare />
                </button>
              </div>
              <div className="center py-2">
                <button type="submit" className="primary_btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!show && <TrainingCertificatesForm />}
    </section>
  );
};
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { CourceValidationSchema } from "../../../services/TrainingValidation";
// import { Link, useLocation } from "react-router-dom";
// import { IoSearch } from "react-icons/io5";
// import { FaArrowLeft } from "react-icons/fa";
// import { SearchDisplay } from "../../../utils/SearchDisplay";
// import { useState } from "react";
// import { TrainingCertificatesForm } from "./TrainingCertificatesForm";
// import { LuPlusSquare } from "react-icons/lu";

// export const AddCourse = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(CourceValidationSchema),
//   });

//   const [show, setShow] = useState(true);
//   const [courseNameFields, setCourseNameFields] = useState([""]);
//   const [companyFields, setCompanyFields] = useState([""]);

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   // Functions to add individual fields
//   // const addCourceSelectField = () =>
//   //   setCourceSelectFields([...courceSelectFields, ""]);
//   const addCourseNameField = () =>
//     setCourseNameFields([...courseNameFields, ""]);
//   const addCompanyField = () => setCompanyFields([...companyFields, ""]);

//   return (
//     <section className="p-10 center flex-col gap-16 bg-[#F8F8F8]">
//       <div className="w-full flex items-center justify-between gap-5">
//         <Link to="/training" className="text-xl flex-1 text-grey">
//           <FaArrowLeft />
//         </Link>
//         <article className="flex-1 flex gap-5 text-dark_grey">
//           <p
//             className={`text-center mt-2 text_size_2 relative ${
//               show
//                 ? "after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0"
//                 : ""
//             }`}
//             onClick={() => setShow(true)}
//           >
//             Add Course
//           </p>
//           <p
//             className={`text-center mt-2 text_size_2 relative ${
//               show
//                 ? ""
//                 : "after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0"
//             }`}
//             onClick={() => setShow(false)}
//           >
//             Training Certificates
//           </p>
//         </article>

//         <div className="flex-1">
//           <SearchDisplay
//             searchIcon2={<IoSearch />}
//             placeholder="Employee Id"
//             rounded="rounded-lg"
//           />
//         </div>
//       </div>

//       {show && (
//         <div className="screen-size center">
//           <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               {/* CourceSelect fields */}
//               <div className="mb-4 relative">
//                 <label className="font-semibold">Select Course:</label>
//                 <input  type="text"
//             {...register("courceSelect")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           /> {errors.courceSelect && (
//             <p className="text-[red] text-[13px] mt-1">
//               {errors.courceSelect.message}
//             </p>
//           )}
//                 {/* {courceSelectFields.map((_, index) => (
//                   <div key={index}>
//                     <input
//                       type="text"
//                       {...register(`courceSelectFields[${index}]`)}
//                       className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//                     />
//                     {errors.courceSelectFields &&
//                       errors.courceSelectFields[index] && (
//                         <p className="text-[red] text-[13px] mt-1">
//                           {errors.courceSelectFields[index].message}
//                         </p>
//                       )}
//                   </div>
//                 ))} */}
//                 {/* <button
//                   type="button"
//                   onClick={addCourceSelectField}
//                   className="absolute top-10 -right-7 text-medium_grey text-[18px]"
//                 >
//                   <LuPlusSquare />
//                 </button> */}
//               </div>

//               {/* CourseName fields */}
//               <div className="mb-4 relative">
//                 <label className="font-semibold">Course Name:</label>
//                 {courseNameFields.map((_, index) => (
//                   <div key={index}>
//                     <input
//                       type="text"
//                       {...register(`courseNameFields[${index}]`)}
//                       className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//                     />
//                     {errors.courseNameFields &&
//                       errors.courseNameFields[index] && (
//                         <p className="text-[red] text-[13px] mt-1">
//                           {errors.courseNameFields[index].message}
//                         </p>
//                       )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addCourseNameField}
//                   className="absolute top-10 -right-7 text-medium_grey text-[18px]"
//                 >
//                   <LuPlusSquare />
//                 </button>
//               </div>

//               {/* Company fields */}
//               <div className="mb-4 relative">
//                 <label className="font-semibold">Training Company:</label>
//                 {companyFields.map((_, index) => (
//                   <div key={index}>
//                     <input
//                       type="text"
//                       {...register(`companyFields[${index}]`)}
//                       className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//                     />
//                     {errors.companyFields && errors.companyFields[index] && (
//                       <p className="text-[red] text-[13px] mt-1">
//                         {errors.companyFields[index].message}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addCompanyField}
//                   className="absolute top-10 -right-7 text-medium_grey text-[18px]"
//                 >
//                   <LuPlusSquare />
//                 </button>
//               </div>
//               <div className="center py-2">
//                 <button type="submit" className="primary_btn">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {!show && <TrainingCertificatesForm />}
//     </section>
//   );
// };


// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { CourceValidationSchema } from "../../../services/TrainingValidation";
// import { Link, useLocation } from "react-router-dom";
// import { IoSearch } from "react-icons/io5";
// import { FaArrowLeft } from "react-icons/fa";
// import { SearchDisplay } from "../../../utils/SearchDisplay";
// import { useState } from "react";
// import { TrainingCertificatesForm } from "./TrainingCertificatesForm";

// export const AddCourse = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(CourceValidationSchema), // Integrate Yup validation
//   });
// const [show,setShow]=useState(true)

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <section className="  p-10 center flex-col gap-16 bg-[#F8F8F8]">
//       <div className="w-full flex items-center justify-between gap-5">
//         <Link to="/training" className="text-xl flex-1 text-grey">
//           <FaArrowLeft />
//         </Link>
//         <article className="flex-1 flex gap-5 text-dark_grey">
//           <p
//             className={` text-center mt-2 text_size_2 relative  ${
//               show
//                 ? "after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0"
//                 : ""
//             }`}
//             onClick={()=>setShow(true)}
//           >
//             Add Course
//           </p>
//           <p className={` text-center mt-2 text_size_2 relative  ${
//                show
//                 ? ""
//                 : "after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0"
//             }`} onClick={()=>setShow(false)}>Training Certificates</p>
//         </article>

//         <div className="flex-1">
//           <SearchDisplay
//             searchIcon2={<IoSearch />}
//             placeholder="Employee Id"
//             rounded="rounded-lg"
//           />
//         </div>
//       </div>

//      {show &&  <div className="screen-size center">
//       <div className="bg-white p-8 rounded-lg shadow-lg  max-w-lg w-full ">
//       <form onSubmit={handleSubmit(onSubmit)}>

// <div className="flex flex-col gap-4 mb-4">
//       <label htmlFor="courseSelect" className="font-semibold">Select Course:</label>
//       <input  type="text"
//             {...register("courceSelect")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           /> {errors.courceSelect && (
//             <p className="text-[red] text-[13px] mt-1">
//               {errors.courceSelect.message}
//             </p>
//           )}
//     </div>
//     <div className="mb-4">
//             <label className="text_size_5">Course Name</label>
//             <input  type="text"
//             {...register("courseName")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//             {errors.courseName && (
//               <p className="text-[red] text-[13px] mt-1">
//                 {errors.courseName.message}
//               </p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="text_size_5">Training Company</label>
//             <input  type="text"
//             {...register("company")}
//             className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           />
//             {errors.company && (
//               <p className="text-[red] text-[13px] mt-1">
//                 {errors.company.message}
//               </p>
//             )}
//           </div>

//           <div className="center py-2">
//             <button type="submit" className="primary_btn">
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//       </div>}
//       {!show && <TrainingCertificatesForm/>}
//     </section>
//   );
// };

// // const companies = [
// //   'Aker Solution',
// //   'ATDC Sdn Bhd',
// //   'AWE Training',
// //   'BSP',
// //   'BUREAU VERITAS',
// //   'Hill International Malaysia',
// //   'IGTC Sdn Bhd',
// //   'JOFFREN OMAR CO SDN BHD',
// //   'Leeden',
// //   'MAHKOTA MAJU SDN BHD',
// //   'MEGAMAS TRAINING CO SDN BHD',
// //   'Panaga Health',
// //   'Radiation Safety Solutions',
// //   'SMTC Sdn Bhd',
// //   'Sribima Maritime Training Centre Sdn Bhd',
// //   'SRS EMERGENCY & RESCUE SOLUTIONS SDN BHD',
// //   'Stress Prevention & Education Centre'
// // ];
// // Handle course selection change
// {/* <select
// id="courseSelect"
// value={selectedCourse}
// {...register("courceSelect")}
// onChange={handleCourseChange}
// className="input-field"

// >
// <option value="">Select Course</option>
// <option value="C01">C01</option>
// <option value="C09">C09</option>
// <option value="C11">C11</option>
// <option value="C17">C17</option>
// <option value="C18">C18</option>
// <option value="C19">C19</option>
// <option value="C24">C24</option>
// <option value="C26">C26</option>
// <option value="C33">C33</option>
// <option value="C34">C34</option>
// <option value="C43">C43</option>
// <option value="C47">C47</option>
// <option value="C53">C53</option>
// <option value="C54">C54</option>
// <option value="C66">C66</option>
// <option value="C73">C73</option>
// <option value="C85">C85</option>
// <option value="C87">C87</option>
// <option value="C92">C92</option>
// <option value="C93">C93</option>
// <option value="C98">C98</option>
// <option value="C99">C99</option>
// <option value="C122">C122</option>
// <option value="C126">C126</option>
// <option value="C134">C134</option>
// <option value="C137">C137</option>
// <option value="C139">C139</option>
// <option value="C142">C142</option>
// <option value="C144">C144</option>
// <option value="C145">C145</option>
// <option value="C146">C146</option>
// <option value="C147">C147</option>
// <option value="C149">C149</option>
// <option value="C150">C150</option>
// <option value="C152">C152</option>
// <option value="C155">C155</option>
// <option value="C156">C156</option>
// <option value="C158">C158</option>
// <option value="C159">C159</option>
// <option value="C160">C160</option>
// <option value="C161">C161</option>
// <option value="C162">C162</option>
// <option value="C164">C164</option>
// <option value="C165">C165</option>
// <option value="C166">C166</option>
// <option value="C167">C167</option>
// <option value="C169">C169</option>
// <option value="C172">C172</option>
// <option value="C170">C170</option>
// <option value="C173">C173</option>
// <option value="C174">C174</option>
// <option value="C175">C175</option>
// <option value="C176">C176</option>
// <option value="C178">C178</option>
// <option value="C179">C179</option>
// <option value="C181">C181</option>

// </select> */}

// // Dropdown data for each course
// // const dropdownData =
// // {
// //   C01: [
// //     'Abrasive Wheels Grinding',
// //     'Abrasive Wheels Cutting',
// //     'HS-1'
// //   ],
// //   C11: [
// //     'Breathing Apparatus & Confined Space',
// //     'FVG 18 + 19',
// //     'Breathing Apparatus Wearer',
// //     'Confined Space Entry',
// //     'General Rescue from Confined Space',
// //     'Breathing Apparatus Wearer Training',
// //     'Confined Space Entry Training',
// //     'FVG-18',
// //     'FVG-19'
// //   ],
// //   C134: [
// //     'Senior Management Site Visit Engagement Skills',
// //     'IMS-6'
// //   ],
// //   C137: [
// //     'Appointed Person in Charge',
// //     'Appointed Person in Charge Assessment',
// //     'Person in Charge Training',
// //     'BLNG Appointed Person in Charge',
// //     'Person in Charge Level 2 Assessment'
// //   ],
// //   C139: [
// //     'Manual Handling',
// //     'MH-7'
// //   ],
// //   C142: [
// //     'Mirage Flange Facing Machine'
// //   ],
// //   C146: [
// //     'Method Integrated Project System',
// //     'MIPS Introduction'
// //   ],
// //   C147: [
// //     'WACHS LC Split Frame Pipe Cutting Machine'
// //   ],
// //   C150: [
// //     'Articulating Crane Operator',
// //     'Crane Operator Level 2',
// //     'Overhead Crane Operator',
// //     'Articulating Crane Operator',
// //     'Overhead Bridge Crane Operator',
// //     'VOC 35T',
// //     'Verification of Competence'
// //   ],
// //   C152: [
// //     'Lift Planner',
// //     'Lift Planner Level 1',
// //     'Lift Planner Level 2',
// //     'Lift Planner Level 2 Competence Assessment'
// //   ],
// //   C155: [
// //     'International Minimum Industry Safety Training',
// //     'IMIST - Opito Approved',
// //     'IMIST - Opito Approved'
// //   ],
// //   C156: [
// //     'Introduction to Lifting & Hoisting Operations'
// //   ],
// //   C158: [
// //     'Basic Chemical Awareness',
// //     'OH-3'
// //   ],
// //   C159: [
// //     'Certified Equipment for Hazardous Area',
// //     'CEHA'
// //   ],
// //   C160: [
// //     'Occupational First Aid Course',
// //     'Senior First Aid',
// //     'St. John Ambulance Australia Approved',
// //     'Shell Global Control Framework Standard',
// //      'Occupational First Aid Refresher',
// //     'FARC-02'
// //   ],
// //   C161: [
// //     'Work Management Procedures Training',
// //     'WMP'
// //   ],
// //   C162: [
// //     'Offshore Crane Operator Level 1',
// //     'Offshore Crane Operator Level 2',
// //     'Offshore Crane Operator Level 3'
// //   ],
// //   C164: [
// //     'Banksman & Slinger Level 1',
// //     'Banksman Level 1',
// //     'Banksman & Slinger Level 1',
// //     'Competent Banksman & Slinger Level 2'
// //   ],
// //   C165: [
// //     'Banksman & Slinger Level 2',
// //     'Banksman Level 2'
// //   ],
// //   C167: [
// //     'Authorized Person in Charge Level 1',
// //     'Authorized Person Level 1',
// //     'Authorized Person Level 2',
// //     'Authorized Person Level 2 Assessment'
// //   ],
// //   C169: [
// //     'Shallow Water Compressed Air Emergency Breathing System',
// //     'CA-EBS',
// //     'Travel Safely By Boat - Opito Approved',
// //     'OFF-7'
// //   ],
// //   C17: [
// //     'Fire Warden'
// //   ],
// //   C170: [
// //     'Compressed Air Emergency Breathing System',
// //     'CA-EBS',
// //     'Forklift/Telehandler Operator'
// //   ],
// //   C172: [
// //     'General Rescue from Confined Space Entry',
// //     'Basic Confined Space Entry and Rescue'

// //   ],
// //   C173: [
// //     'Loose Lifting Equipment Inspection Training'
// //   ],
// //   C174: [
// //     'ISO 14001:2015 and ISO 45001:2018 Internal Auditor Course'
// //   ],
// //   C175: [
// //     'Working at Height for Workers'
// //   ],
// //   C176: [
// //     'Brunei Darussalam Workplace Safety and Health Order 2009'
// //   ],
// //   C178: [
// //     'Electrical Safety Rules',
// //     'Authorized Electrical Personnel'
// //   ],
// //   C179: [
// //     'PPE Inspection Course',
// //     'Working at Height Training',
// //     'SCA-9'
// //   ],
// //   C18: [
// //     'Senior First Aid Refresher',
// //     'St. John Ambulance Australia Approved',
// //     'Shell Global Control Framework Standard',
// //     'Occupational First Aid Refresher'
// //   ],
// //   C19: [
// //     'Forklift/Telehandler Operator',
// //     'Forklift Operator 3T & Below',
// //     'Forklift Operator Training 5T & Below',
// //     'Forklift Truck 3T & Below'
// //   ],
// //   C24: [
// //     'HSE Familiarisation for Senior Staff'
// //   ],
// //   C26: [
// //     'Incident Investigation and Reporting'
// //   ],
// //   C33: [
// //     'Managing Hazards at the Workplace'
// //   ],
// //   C34: [
// //     'Managing HSE'
// //   ],
// //   C43: [
// //     'CAP Level 1',
// //     'CAP Level 2 Assessment',
// //     'Rigging and Slinging Authorized Personnel',
// //     'CAP Level 2'
// //   ],
// //   C47: [
// //     'Rigger Level 1',
// //     'Rigger Level 2',
// //     'Rigger Level 2 Refresher'
// //   ],
// //   C53: [
// //     'Supervising HSE'
// //   ],
// //   C54: [
// //     'Rigger Level 1',
// //     'MH-51'
// //   ],
// //   C66: [
// //     'Defensive Driving Course',
// //     'RoSPA Accredited',
// //     'Defensive Driving Refresher'
// //   ],
// //   C85: [
// //     'A Fistful of Dollars'
// //   ],
// //   C87: [
// //     'Emergency Evacuation Procedure',
// //     'Accident Incident Reporting Procedure Workshop'
// //   ],
// //   C92: [
// //     'Health Awareness Campaign'
// //   ],
// //   C93: [
// //     'Scaffolding Awareness'
// //   ],
// //   C98: [
// //     'Orientation & Team Building',
// //     'Team Building at Holiday Lodge'
// //   ],
// //   C99: [
// //     'NEBOSH International General Certificate Controlling Workplace Hazards',
// //     'NEBOSH International General Certificate Health and Safety Practical Application',
// //     'NEBOSH HSE Introduction to Incident Investigation',
// //     'IN-2'
// //   ],
// //   C122: [
// //     'Customer Service',
// //     'AWE'
// //   ],
// //   C126: [
// //     'Documentation Management Project & Quality Systems'
// //   ],
// //   C144: [
// //     'Safe Erection and Dismantling of Basic Scaffolds',
// //     'Part C - Complex',
// //     'Part A',
// //     'Part A Refresher',
// //     'Part B',
// //     'Part B Refresher',
// //     'Part C Refresher',
// //     'Safe Inspection of Scaffolds Complex',
// //     'SCA-5'
// //   ],
// //   C145: [
// //     'Introduction to Safe Inspection of Scaffolds',
// //     'SIS'
// //   ],
// //   C149: [
// //     'Safe Erection and Dismantling of Scaffolds Complex',
// //     'One Day Assessment'
// //   ],
// //   C166: [
// //     'Fire Watcher'
// //   ],

// //   C181: [
// //     'Asbestos Training',
// //     'Basic Awareness on Transport Safety and Security of Radiation Sources for GRW'
// //   ]
// // };
