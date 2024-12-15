// import React, { useState, useContext } from 'react';
// import { BsCloudUpload } from 'react-icons/bs';
// import { DataSupply } from "../../../utils/DataStoredContext";

// export const InterviewForm = () => {
//    const { IVSSDetails } = useContext(DataSupply);
//   const [formData, setFormData] = useState({
//     interview: {
//       date: '',
//       time: '',
//       venue: '',
//       interviewType: '',
//       interviewer: '',
//       message: '',
//       // resume: null, // Example file field
//     },
//   });

//   console.log("Interview data", IVSSDetails)

//   // Function to handle changes for non-file fields
//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       interview: {
//         ...prev.interview,
//         [field]: value,
//       },
//     }));
//   };

//   // Function to handle file input changes
//   const handleFileChange = (field, file) => {
//     setFormData((prev) => ({
//       ...prev,
//       interview: {
//         ...prev.interview,
//         [field]: file,
//       },
//     }));
//   };

//   const interviewFields = [
//     { field: 'date', label: 'Date', type: 'date' },
//     { field: 'time', label: 'Time', type: 'time' },
//     { field: 'venue', label: 'Venue', type: 'text' },
//     { field: 'interviewType', label: 'Interview Type', type: 'text' },
//     { field: 'interviewer', label: 'Interviewer', type: 'text' },
//     { field: 'message', label: 'Message', type: 'textarea' },
//     // { field: 'resume', label: 'Resume', type: 'file' },
//   ];

//   return (
//     <form>
//       <div className="p-4 grid grid-cols-2 gap-5">
//         {interviewFields.map((input) => (
//           <label key={input.field} className="block mb-4">
//             {input.label}:
//             {input.type !== 'file' && input.type !== 'textarea' ? (
//               <input
//                 type={input.type}
//                 className="w-full border p-2 rounded mt-1"
//                 value={formData.interview[input.field]}
//                 onChange={(e) => handleInputChange(input.field, e.target.value)}
//               />
//             ) : input.type === 'textarea' ? (
//               <textarea
//                 className="w-full border p-2 rounded mt-1"
//                 value={formData.interview[input.field]}
//                 onChange={(e) => handleInputChange(input.field, e.target.value)}
//               />
//             ) : (
//               <div className="flex items-center mt-1">
//                 <input
//                   type="file"
//                   className="hidden"
//                   id={input.field}
//                   onChange={(e) => handleFileChange(input.field, e.target.files[0])}
//                 />
//                 <label htmlFor={input.field} className="flex items-center cursor-pointer text-grey">
//                   <BsCloudUpload className="mr-2 text-lg text-[#ab1234]" />
//                   {formData.interview[input.field]?.name || 'Upload PDF'}
//                 </label>
//               </div>
//             )}
//           </label>
//         ))}
//       </div>
//       <div className="center">
//         <button type="submit"
//         className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow">
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// // import React from 'react'

// // export const InterViewForm = () => {
// //   return (
// //     <div>InterViewForm</div>
// //   )
// // }
// // Interview: { date: '', time: '', venue: '', interviewType: '', interviewer: '', message: '' }

// // <div [Interview].map((input) => (
// //         <label key={input.field} className="block">
// //           {input.label}:
// //           {input.type !== 'file' ? (
// //             <input
// //               type={input.type}
// //               className="w-full border p-2 rounded mt-1"
// //               value={formData[activeTab][input.field]}
// //               onChange={(e) => handleInputChange(activeTab, input.field, e.target.value)}
// //             />
// //           ) : (
// //             <div className="flex items-center mt-1">
// //               <input
// //                 type="file"
// //                 className="hidden"
// //                 id={input.field}
// //                 onChange={(e) => handleFileChange(activeTab, input.field, e.target.files[0])}
// //               />
// //               <label htmlFor={input.field} className="flex items-center cursor-pointer text-lite_grey">
// //                 <BsCloudUpload className="mr-2 text-lg text-[#ab1234]" />
// //                 {formData[activeTab][input.field] ? formData[activeTab][input.field].name : 'Upload PDF'}
// //               </label>
// //             </div>
// //           )}
// //         </label>
// //       ));

import React, { useState, useEffect, useContext } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { DataSupply } from "../../../utils/DataStoredContext";
import { UpdateInterviewData } from "../../../services/updateMethod/UpdateInterview";
import { SpinLogo } from "../../../utils/SpinLogo";

export const InterviewForm = () => {
  const { IVSSDetails } = useContext(DataSupply);
  const { interviewDetails } = UpdateInterviewData();

  // Initialize form state
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      date: "",
      time: "",
      venue: "",
      interviewType: "",
      interviewer: "",
      message: "",
    },
  });

  // Effect hook to auto-fetch and populate form data when IVSSDetails changes
  useEffect(() => {
    if (IVSSDetails.length > 0) {
      const interviewData = IVSSDetails[0]; // Assuming we want to take the first item
      setFormData({
        interview: {
          date: interviewData.interDate.split("T")[0], // Extract date from timestamp
          time: interviewData.interTime,
          venue: interviewData.venue,
          interviewType: interviewData.interType,
          interviewer: interviewData.manager,
          message: interviewData.message,
          // You can handle the resume or any other file upload here
        },
      });
    }
  }, [IVSSDetails]); // This effect runs every time IVSSDetails changes

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

  // Function to handle file input changes
  const handleFileChange = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        [field]: file,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await interviewDetails({
        InterviewValue: {
          id: IVSSDetails[0]?.id, // Make sure the ID is available
          interDate: formData.interview.date,
          interTime: formData.interview.time,
          venue: formData.interview.venue,
          interType: formData.interview.interviewType,
          message: formData.interview.message,
          manager: formData.interview.interviewer,

        },
      });
      console.log("Data stored successfully...");
      setNotification(true);
    } catch (error) {
      console.error("Error submitting interview details:", error);
      alert("Failed to update interview details. Please try again.");
    }
  };

  const interviewFields = [
    { field: "date", label: "Date", type: "date" },
    { field: "time", label: "Time", type: "time" },
    { field: "venue", label: "Venue", type: "text" },
    { field: "interviewType", label: "Interview Type", type: "text" },
    { field: "interviewer", label: "Interviewer", type: "text" },
    { field: "message", label: "Message", type: "textarea" },
    // { field: 'resume', label: 'Resume', type: 'file' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 grid grid-cols-2 gap-5">
        {interviewFields.map((input) => (
          <label key={input.field} className="block mb-4">
            {input.label}:
            {input.type !== "file" && input.type !== "textarea" ? (
              <input
                type={input.type}
                className="w-full border p-2 rounded mt-1"
                value={formData.interview[input.field]}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
              />
            ) : input.type === "textarea" ? (
              <textarea
                className="w-full border p-2 rounded mt-1"
                value={formData.interview[input.field]}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
              />
            ) : (
              <div className="flex items-center mt-1">
                <input
                  type="file"
                  className="hidden"
                  id={input.field}
                  onChange={(e) =>
                    handleFileChange(input.field, e.target.files[0])
                  }
                />
                <label
                  htmlFor={input.field}
                  className="flex items-center cursor-pointer text-grey"
                >
                  <BsCloudUpload className="mr-2 text-lg text-[#ab1234]" />
                  {formData.interview[input.field]?.name || "Upload PDF"}
                </label>
              </div>
            )}
          </label>
        ))}
      </div>
      <div className="center">
        <button
          type="submit"
          className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow"
        >
          Submit
        </button>
      </div>
      {notification && (
        <SpinLogo
          text="Candidate Selected Successfully"
          notification={notification}
          path="/recrutiles/status"
        />
      )}
    </form>
  );
};
