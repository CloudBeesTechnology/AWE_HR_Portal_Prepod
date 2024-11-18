import React, { useEffect, useState } from "react";
import { EmpRequisitionForm } from "./EmpRequisitionForm";
import { RequisitionReviewForm } from "./RequisitionReviewForm";
import { listEmpRequisitions } from "../../graphql/queries";
import { generateClient } from "@aws-amplify/api";

const client = generateClient();

export const ApplyEmployReq = () => {
  const [requisitionData, setRequisitionData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [error, setError] = useState(null);

  const fetchRequisitionData = async () => {
    try {
      const response = await client.graphql({ query: listEmpRequisitions })
  
      const fetchedData = response?.data?.listEmpRequisitions?.items || [];
      console.log("Fetched Requisition Data:", fetchedData); // Debug log
      setRequisitionData(fetchedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching requisition data:", err);
      setError("Failed to fetch requisition data");
      setRequisitionData([]);
    }
  };
  

  useEffect(() => {
    fetchRequisitionData();
  }, []);

  const handleFormSubmit = () => {
    setIsFormVisible(false);
    fetchRequisitionData();
  };

  const handleViewClick = (request) => {
    setSelectedRequest(request);
    setIsReviewFormVisible(true);
  };

  const handleReviewFormClose = () => {
    setSelectedRequest(null);
    setIsReviewFormVisible(false);
  };

  return (
    <section className="min-h-screen bg-[#F5F6F1]">
      <div className="screen-size">
        <div className="flex justify-between my-8">
          <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
            My Requisition List
          </button>
          <button
            className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold"
            onClick={() => setIsFormVisible(true)}
          >
            Apply New Requisition
          </button>
        </div>

        {error && <div className="text-[red]">{error}</div>}

        {requisitionData.length > 0 ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-left">
              <thead className="bg-[#939393] text-white rounded-lg">
                <tr>
                  <th className="pl-4 py-3">Requested By</th>
                  <th className="pl-4">Department</th>
                  <th className="py-4">Applied Position</th>
                  <th className="py-4">Project</th>
                  <th className="py-4">Quantity</th>
                  <th className="py-4">Submit Date</th>
                  <th className="py-4">Submitted Form</th>
                  <th className="py-4">Form Status</th>
                  <th className="py-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {requisitionData.map((item) => (
                  <tr key={item.id} className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]">
                    <td className="pl-4 py-4">{item.requestedBy}</td>
                    <td className="pl-4 py-4">{item.department}</td>
                    <td className="py-4">{item.position}</td>
                    <td className="py-4">{item.project}</td>
                    <td className="py-4">{item.quantity}</td>
                    <td className="py-4">
                      {new Date(item.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-4">
                      <a
                        href="#"
                        className="text-[#2779f5f7] font-semibold underline cursor-pointer"
                        onClick={() => handleViewClick(item)}
                      >
                        View
                      </a>
                    </td>
                    <td
                      className={`py-4 font-semibold ${
                        item.status === "Approved"
                          ? "text-[#25a041]"
                          : item.status === "Rejected"
                          ? "text-[red]"
                          : "text-grey"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="py-4">{item.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No requisition data available.</p>
        )}

        {isFormVisible && (
          <div className="fixed inset-0 bg-grey bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-xl">
              <EmpRequisitionForm onClose={handleFormSubmit} />
            </div>
          </div>
        )}

        {isReviewFormVisible && selectedRequest && (
          <RequisitionReviewForm
            isVisible={isReviewFormVisible}
            onClose={handleReviewFormClose}
          />
        )}
      </div>
    </section>
  );
};









// import React, { useState, useEffect } from "react";
// import { ApplyEmployReqDetails } from "./ApplyEmployReqDetails";
// import { EmpRequisitionForm } from "./EmpRequisitionForm";

// export const ApplyEmployReq = () => {
//   const initialRequestData = [
//     {
//       manager: "S Prem Kumar",
//       status: "Pending",
//       remarks: "",
//     },
//     // More data entries...
//   ];

//   const [selectedTile, setSelectedTile] = useState("");
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const handleViewClick = (request) => {
//     setSelectedRequest(request);
//   };

//   const handleTileClick = (title) => {
//     setSelectedTile(title);
//     setIsFormVisible(true); // Open form when a tile is clicked
//   };

//   const handleFormSubmit = () => {
//     setIsFormVisible(false); // Close form on submit
//   };

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

//   return (
//     <section className="min-h-screen bg-[#F5F6F1]">
//       <div className="screen-size">
//         <div className="flex justify-between my-8">
//           <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
//             My Requisition List
//           </button>
//           {ApplyEmployReqDetails.map((value, index) => (
//             <div key={index} onClick={() => handleTileClick(value.title)}>
//               <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
//                 Apply New Requisition
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="overflow-x-auto rounded-lg">
//           <table className="w-full text-left">
//             <thead className="bg-[#939393] text-white rounded-lg">
//               <tr>
//                 <th className="pl-4 py-3">Requested By</th>
//                 <th className="py-4">Department</th>
//                 <th className="py-4">Applied Position</th>
//                 <th className="py-4">Project</th>
//                 <th className="py-4">Quantity</th>
//                 <th className="py-4">Submit Date</th>
//                 <th className="py-4">Submitted Form</th>
//                 <th className="py-4">Form Status</th>
//                 <th className="py-4">Remarks</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {initialRequestData.map((item, index) => (
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
//                       className="text-[#2779f5f7] font-semibold  underline cursor-pointer"
//                       onClick={() => handleViewClick(item)}
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
//                   <td></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {isFormVisible && (
//           <div className="fixed inset-0 bg-grey bg-opacity-75 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-xl">
//               <EmpRequisitionForm onClose={handleFormSubmit} />
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

