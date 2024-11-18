import React, { useState } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Searchbox } from "../../utils/Searchbox";
import { RequisitionReviewForm } from '../recruitments/RequisitionReviewForm';
import { RemarksDialog } from "../recruitments/RemarksDialog";

export const EmployReq = ({ requestData, onStatusChange, onRequestSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRemarksRequest, setSelectedRemarksRequest] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequestData = requestData?.filter(
    (item) =>
      (item.manager?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item.department?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item.position?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item.project?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const closeRemarksDialog = () => {
    setSelectedRemarksRequest(null);
  };

  const saveRemarks = (remarks) => {
    onStatusChange(selectedRemarksRequest.id, remarks);
    setSelectedRemarksRequest(null);
  };

  const closeModal = () => {
    setSelectedRequest(null); // Reset selectedRequest when modal closes
  };

  return (
    <section className="screen-size h-screen w-full my-5">
      <div className="mb-8 flex justify-between items-center">
        <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
          Employee Requisition Review
        </button>
        <Searchbox
          value={searchTerm}
          searchHandler={setSearchTerm}
          searchIcon1={<IoSearch />}
          placeholder="name, position"
        />
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-[#939393] text-white rounded-lg">
            <tr>
              <th className="pl-4 py-4">Requested Manager</th>
              <th className="py-4">Department</th>
              <th className="py-4">Position</th>
              <th className="py-4">Project</th>
              <th className="py-4">Quantity</th>
              <th className="py-4">Received Date</th>
              <th className="py-4">Submitted Form</th>
              <th className="py-4">Status Update</th>
              <th className="py-4">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredRequestData?.length > 0 ? (
              filteredRequestData.map((item, index) => (
                <tr key={index} className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]">
                  <td className="pl-4 py-4">{item.manager}</td>
                  <td className="py-4">{item.department}</td>
                  <td className="py-4">{item.position}</td>
                  <td className="py-4">{item.project}</td>
                  <td className="py-4">{item.quantity}</td>
                  <td className="py-4">
                    {new Date(item.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-4">
                    <button onClick={() => setSelectedRequest(item)}>
                      View
                    </button>
                  </td>
                  <td className={`py-4 font-semibold ${item.status === "Approved" ? "text-[#25a041]" : item.status === "Rejected" ? "text-[#f75a11]" : "text-grey"}`}>
                    {item.status}
                  </td>
                  <td className="py-4 flex items-center gap-2">
                    <span>{item.remarks}</span>
                    <FaPencilAlt onClick={() => setSelectedRemarksRequest(item)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">No Requisitions Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedRequest && (
        <RequisitionReviewForm
          isVisible={!!selectedRequest}
          onClose={closeModal}
          requestData={selectedRequest}
          onStatusChange={onStatusChange}
        />
      )}

      <RemarksDialog
        isOpen={!!selectedRemarksRequest}
        onClose={closeRemarksDialog}
        onSave={saveRemarks}
        initialRemarks={selectedRemarksRequest?.remarks || ""}
      />
    </section>
  );
};







// import React, { useState, useEffect } from 'react';
// import { FaPencilAlt } from "react-icons/fa";
// import { IoSearch } from "react-icons/io5";
// import { Searchbox } from "../../utils/Searchbox";
// import { RequisitionReviewForm } from "./RequisitionReviewForm";
// import { RemarksDialog } from "../recruitments/RemarksDialog";

// export const EmployReq = () => {
//   const initialRequestData = [
//     {
//       manager: "S Prem Kumar",
//       department: "QA QC",
//       position: "Coordinator",
//       project: "Project A",
//       additional: "Yes",
//       quantity: "2",
//       date: "2024-09-15",
//       status: "Pending",
//       remarks: "",
//     },
//     {
//       manager: "V K Mathew",
//       department: "BLNG",
//       position: "Scaffolder",
//       project: "Project B",
//       additional: "No",
//       quantity: "5",
//       date: "2024-09-15",
//       status: "Pending",
//       remarks: "",
//     },
//   ];

//   const [requestData, setRequestData] = useState(initialRequestData);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [selectedRemarksRequest, setSelectedRemarksRequest] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     if (selectedRequest) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [selectedRequest]);

//   const filteredRequestData = requestData?.filter(
//     (item) =>
//       item.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.project.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleViewClick = (request) => {
//     setSelectedRequest(request);
//   };

//   const closeModal = () => {
//     setSelectedRequest(null);
//   };

//   const closeRemarksDialog = () => {
//     setSelectedRemarksRequest(null);
//   };

//   const updateStatus = (status) => {
//     setRequestData((prevData) =>
//       prevData.map((item) =>
//         item.manager === selectedRequest.manager && item.date === selectedRequest.date
//           ? { ...item, status }
//           : item
//       )
//     );
//   };

//   const saveRemarks = (remarks) => {
//     setRequestData((prevData) =>
//       prevData.map((item) =>
//         item === selectedRemarksRequest ? { ...item, remarks } : item
//       )
//     );
//     setSelectedRemarksRequest(null);
//   };

//   return (
//     <section className="screen-size h-screen w-full my-5">
//       <div className="mb-8 flex justify-between items-center">
//         <div className="flex-1">
//           <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
//             Employee Requisition Review
//           </button>
//         </div>
//         <div className="flex-1 flex justify-end">
//           <Searchbox
//             value={searchTerm}
//             searchHandler={(term) => setSearchTerm(term)}
//             searchIcon1={<IoSearch />}
//             placeholder="name, position"
//             border="rounded-full"
//             shadow="shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto rounded-lg">
//         <table className="w-full text-left">
//           <thead className="bg-[#939393] text-white rounded-lg">
//             <tr>
//               <th className="pl-4 py-4">Requested Manager</th>
//               <th className="py-4">Department</th>
//               <th className="py-4">Position</th>
//               <th className="py-4">Project</th>
//               <th className="py-4">Quantity</th>
//               <th className="py-4">Received Date</th>
//               <th className="py-4">Submitted Form</th>
//               <th className="py-4">Status Update</th>
//               <th className="py-4">Remarks</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white">
//             {filteredRequestData?.length > 0 ? (
//               filteredRequestData.map((item, index) => (
//                 <tr
//                   key={index}
//                   className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]"
//                 >
//                   <td className="pl-4 py-4">{item.manager}</td>
//                   <td className="py-4">{item.department}</td>
//                   <td className="py-4">{item.position}</td>
//                   <td className="py-4">{item.project}</td>
//                   <td className="py-4">{item.quantity}</td>
//                   <td className="py-4">
//                     {new Date(item.date).toLocaleDateString("en-GB")}
//                   </td>
//                   <td className="py-4">
//                     <a
//                       href="#"
//                       className="text-[#2779f5f7] font-semibold underline cursor-pointer"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleViewClick(item);
//                       }}
//                     >
//                       View
//                     </a>
//                   </td>
//                   <td
//                     className={`py-4 font-semibold ${
//                       item.status === "Approved"
//                         ? "text-[#25a041]"
//                         : item.status === "Rejected"
//                         ? "text-[#f75a11]"
//                         : "text-grey"
//                     }`}
//                   >
//                     {item.status}
//                   </td>
//                   <td className="py-4 flex items-center gap-2">
//                     <span>{item.remarks}</span>
//                     <FaPencilAlt
//                       className="cursor-pointer text-[#ff0000]"
//                       onClick={() => setSelectedRemarksRequest(item)}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center py-4">
//                   No Requisitions Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for showing requisition form */}
//       <div>
//       <RequisitionReviewForm
//         isVisible={!!selectedRequest} // Ensuring it's either true or false
//         onClose={closeModal}
//         requestData={selectedRequest || {}} // Provide default empty object
//         onStatusChange={updateStatus}
//        /></div>

//       {/* Modal for showing remarks dialog */}
//       <RemarksDialog
//         isOpen={selectedRemarksRequest !== null}
//         onClose={closeRemarksDialog}
//         onSave={saveRemarks}
//         initialRemarks={selectedRemarksRequest?.remarks || ""}
//       />
//     </section>
//   );
// };

