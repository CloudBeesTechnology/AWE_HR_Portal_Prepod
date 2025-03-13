import React, { useState, useEffect, useRef } from 'react';
import { VscClose } from "react-icons/vsc";
import { InterviewForm } from './ScheduledForm/InterViewForm';
import { CandidateForm } from './ScheduledForm/CandidateForm';
import { LOIForm } from './ScheduledForm/LOIForm';
import { CVEVForm } from './ScheduledForm/CVEVForm';
import { PAAFForm } from './ScheduledForm/PAAFForm';
import { MobilizationForm } from './ScheduledForm/MobilizationForm';
// getLocalMobilization

export const StatusForm = ({ candidate, onClose, onSave }) => {
  // const [activeTab, setActiveTab] = useState('Interview'); // Default active tab is 'Interview'
  const [show, setShow] = useState(0);
  return (
    <div className="fixed inset-0 bg-grey bg-opacity-80 z-50 center">
      <div className="bg-white p-10 rounded-lg w-full max-w-[700px] overflow-hidden relative">
    <button onClick={onClose} className=" absolute top-2 right-2 border rounded-full p-1">
          <VscClose size={20} />
    </button>
        <h2 className="text-xl font-bold mb-4 p-2 rounded-md bg-[#f7f183ea]">
          TempID: {candidate?.tempID} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name: {candidate?.name}
        </h2>

        <article className="flex-1 flex gap-5 text-black mt-5">
          <h1
            className={`px-3 py-1 rounded-lg whitespace-nowrap  ${
              show ===0
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(0)}
          >
             Interview
          </h1>
          <h2
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 1
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(1)}
          >
             Candidate
          </h2>
          <h3
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show ===2
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(2)}
          >
             LOI
          </h3>
          <h4
            className={` px-3 py-1 rounded-lg whitespace-nowrap  ${
              show ===3
                ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(3)}
          >
             CVEV
          </h4>

          <h5
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 4
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(4)}
          >
             PAAF
          </h5>
          <h6
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 5
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(5)}
          >
             Mobilization
          </h6>
        </article>
{show === 0 && <InterviewForm candidate = {candidate}/>}
{show === 1 && <CandidateForm candidate = {candidate}/>}
{show === 2 && <LOIForm candidate = {candidate}/>}
{show === 3 && <CVEVForm candidate = {candidate}/>}
{show === 4 && <PAAFForm candidate = {candidate}/>}
{candidate.contractType === "Local" && show === 5 && <MobilizationForm candidate={candidate} />}

{/* {candidate.contractType === "Local" &&
{show === 5 && <MobilizationForm candidate = {candidate}/>}
} */}


        {/* <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="border-2 border-grey hover:bg-slate_grey hover:text-white px-4 py-2 rounded-xl"
          >
            Close
          </button>

        </div> */}
      </div>
    </div>
  );
};



// import React, { useState, useEffect } from 'react';
// import { BsCloudUpload } from 'react-icons/bs';
// import { TabConfig } from './TabConfig';
// import { InterviewScheduleSchema, SelectedCandidateSchema,CvevSchema,PaafSchema,MobilizationSchema } from '../../services/Validation';
// import { yupResolver } from '@hookform/resolvers/yup';

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
//           TempID: {candidate?.tempID} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name: {candidate?.name}
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