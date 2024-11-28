import React, { useState } from 'react';
import { BsCloudUpload } from 'react-icons/bs';

export const InterviewForm = () => {
  const [formData, setFormData] = useState({
    interview: {
      date: '',
      time: '',
      venue: '',
      interviewType: '',
      interviewer: '',
      message: '',
      // resume: null, // Example file field
    },
  });

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

  const interviewFields = [
    { field: 'date', label: 'Date', type: 'date' },
    { field: 'time', label: 'Time', type: 'time' },
    { field: 'venue', label: 'Venue', type: 'text' },
    { field: 'interviewType', label: 'Interview Type', type: 'text' },
    { field: 'interviewer', label: 'Interviewer', type: 'text' },
    { field: 'message', label: 'Message', type: 'textarea' },
    // { field: 'resume', label: 'Resume', type: 'file' },
  ];

  return (
    <form>
      <div className="p-4 grid grid-cols-2 gap-5">
        {interviewFields.map((input) => (
          <label key={input.field} className="block mb-4">
            {input.label}:
            {input.type !== 'file' && input.type !== 'textarea' ? (
              <input
                type={input.type}
                className="w-full border p-2 rounded mt-1"
                value={formData.interview[input.field]}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
              />
            ) : input.type === 'textarea' ? (
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
                  onChange={(e) => handleFileChange(input.field, e.target.files[0])}
                />
                <label htmlFor={input.field} className="flex items-center cursor-pointer text-gray-500">
                  <BsCloudUpload className="mr-2 text-lg text-[#ab1234]" />
                  {formData.interview[input.field]?.name || 'Upload PDF'}
                </label>
              </div>
            )}
          </label>
        ))}
      </div>
      <div className="center">
        <button type="submit" 
        className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow">
          Submit
        </button>
      </div>
    </form>
  );
};


// import React from 'react'

// export const InterViewForm = () => {
//   return (
//     <div>InterViewForm</div>
//   )
// }
// Interview: { date: '', time: '', venue: '', interviewType: '', interviewer: '', message: '' }


// <div [Interview].map((input) => (
//         <label key={input.field} className="block">
//           {input.label}:
//           {input.type !== 'file' ? (
//             <input
//               type={input.type}
//               className="w-full border p-2 rounded mt-1"
//               value={formData[activeTab][input.field]}
//               onChange={(e) => handleInputChange(activeTab, input.field, e.target.value)}
//             />
//           ) : (
//             <div className="flex items-center mt-1">
//               <input
//                 type="file"
//                 className="hidden"
//                 id={input.field}
//                 onChange={(e) => handleFileChange(activeTab, input.field, e.target.files[0])}
//               />
//               <label htmlFor={input.field} className="flex items-center cursor-pointer text-lite_grey">
//                 <BsCloudUpload className="mr-2 text-lg text-[#ab1234]" />
//                 {formData[activeTab][input.field] ? formData[activeTab][input.field].name : 'Upload PDF'}
//               </label>
//             </div>
//           )}
//         </label>
//       ));