import React, { useState, useEffect } from 'react';
import { VscClose } from "react-icons/vsc";
import { SawpForm } from "./form/SawpForm";
import { DoeForm } from "./form/DoeForm";
import { NlmsForm } from "./form/NlmsForm";
import { BankForm } from "./form/BankForm";
import { JitpaForm } from './form/JitpaForm';
import { LabourDepForm } from "./form/LabourDepForm";
import { ImmigrationForm } from "./form/ImmigrationForm";
import { AirTktForm } from "./form/AirTktForm";
import { NonLocalMobilizForm } from "./form/NonLocalMobilizForm";


export const WorkpassForm = ({ candidate, onClose, onSave }) => {

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
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show ===0
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(0)}
          >
             SAWP
          </h1>
          <h2
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 1
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(1)}
          >
             DOE
          </h2>
          <h3
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show ===2
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(2)}
          >
             NLMS
          </h3>
          <h4
            className={` px-3 py-1 rounded-lg whitespace-nowrap  ${
              show ===3
                ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(3)}
          >
             Bank Guarantee
          </h4>

          <h5
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 4
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(4)}
          >
             JITPA
          </h5>
          <h6
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 5
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(5)}
          >
             Labour Deposit
          </h6>
          <h6
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 6
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(6)}
          >
             Immigration
          </h6>
          <h6
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 7
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(7)}
          >
             Air Ticket
          </h6>
          <h6
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 8
                 ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(8)}
          >
             Non Local Mobilization
          </h6>
        </article>
{show === 0 && <SawpForm candidate={candidate}/>}
{show === 1 && <DoeForm candidate={candidate}/>}
{show === 2 && <NlmsForm candidate={candidate}/>}
{show === 3 && <BankForm candidate={candidate}/>}
{show === 4 && <JitpaForm candidate={candidate}/>}
{show === 5 && <LabourDepForm candidate={candidate}/>}
{show === 6 && <ImmigrationForm candidate={candidate}/>}
{show === 7 && <AirTktForm candidate={candidate}/>}
{show === 8 && <NonLocalMobilizForm candidate={candidate}/>}

</div>
    </div>
  );
};







// export const WorkpassForm = ({ candidate, onClose, onSave }) => {
//   const [activeTab, setActiveTab] = useState('DOE'); // Default active tab
//   const [formData, setFormData] = useState({
//     SAWP: {supportletterReqDate:'', supportletterReceiveDate:'' ,letterfile: null},
//     DOE: { doesubmitdate: '', doeapprovedate: '', doeexpirydate: '', doereferenceno: '', doefile: null },
//     NLMS: { nlmssubmitdate: '', submissionrefrenceno: '', nlmsapprovedate: '', ldreferenceno: '', nlmsexpirydate: '', nlmsfile: null },
//     BankGuarantee: { bgsubmitdate: '', bgreceivedate: '', bgreferenceno: '', bgamount: '', bgexpirydate: '', bgfile: null },
//     JITPA: { tbapurchasedate: '', jitpaamount: '', jitpaexpirydate: '', receiptno: '', depositamount: '', submitdateendorsement: '', jitpafile: null },
//     Immigration: { immbdno: '', docsubmitdate: '', visaapprovedate: '', visareferenceno: '', visaFile: null },
//     AirTicket: { departuredate: '', arrivaldate: '', cityname: '', airfare: '', airticketfile: null },
//     Mobilization: { agentname:'', mobSignDate: '', mobFile: null },
//   });

//   // Handle tab switch
//   const handleTabSwitch = (tabName) => {
//     setActiveTab(tabName); // Switch to the new tab
//   };

//   // Handle form input changes
//   const handleInputChange = (tab, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [tab]: {
//         ...prev[tab],
//         [field]: value,
//       },
//     }));
//   };

//   // Handle file input changes
//   const handleFileChange = (tab, field, file) => {
//     setFormData((prev) => ({
//       ...prev,
//       [tab]: {
//         ...prev[tab],
//         [field]: file,
//       },
//     }));
//   };

//   // Handle save action
//   const handleSave = () => {
//     onSave(formData);
//     onClose(); // Close the form after saving
//   };

//   useEffect(() => {
//     // Disable scrolling on the body when the popup is open
//     document.body.style.overflow = 'hidden';

//     return () => {
//       // Re-enable scrolling when the popup is closed
//       document.body.style.overflow = '';
//     };
//   }, []);

//   // Render form inputs based on the active tab
//   const renderInputs = () => {
//     return WpTableConfig[activeTab].map((input) => (
//       <label key={input.field} className="block">
//         {input.label}:
//         {input.type !== 'file' ? (
//           <input
//             type={input.type}
//             className="w-full border p-2 rounded mt-1 "
//             value={formData[activeTab][input.field] || ''}
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
//       <div className="bg-white p-8 rounded-lg w-full max-w-[900px] h-[80vh] overflow-hidden">
//         <h2 className="text-xl font-bold mb-4 p-1 rounded-md bg-[#f7f183ea]">Temp Id: {candidate.tempid} &nbsp;&nbsp;&nbsp;&nbsp; Name: {candidate.name}</h2>

//         <div className="flex space-x-4 mb-6  ">
//           {Object.keys(WpTableConfig).map((tab) => (
//             <button
//               key={tab}
//               className={`px-3 py-1 rounded-lg whitespace-nowrap ${activeTab === tab ? 'border-2 border-[#FEF116] bg-[#FFFEF4]' : 'bg-[#DDDDDD]'}`}
//               onClick={() => handleTabSwitch(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Scrollable content */}
//         <div className="grid grid-cols-2 gap-x-10 overflow-y-auto h-[50vh] pr-4">
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
