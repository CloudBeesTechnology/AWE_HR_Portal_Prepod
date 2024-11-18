import React, { useEffect, useState } from 'react';
import AweLogo from '../../assets/logo/logo-with-name.svg';
import { VscClose } from "react-icons/vsc";
import { generateClient } from '@aws-amplify/api';
import { listEmpRequisitions } from '../../graphql/queries';
import { EmployReq } from './EmployReq';


export const RequisitionReviewForm = ({ isVisible, onClose, isMdView = false }) => {
  const [requestData, setRequestData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const client = generateClient();
    if (isVisible) {
      const fetchRequisitions = async () => {
        try {
          const response = await client.graphql({
            query: listEmpRequisitions,
          });

          const fetchedData = response?.data?.listEmpRequisitions?.items.map((item) => ({
            id: item.id,
            manager: item.manager,
            department: item.department,
            position: item.position,
            project: item.project,
            additional: item.additional || '',
            quantity: item.quantity,
            date: item.createdAt,
            status: item.status || 'Pending',
            remarks: item.remarks || '',
          }));

          setRequestData(fetchedData);
        } catch (err) {
          console.error("Error fetching requisition data:", err);
          setError('Error fetching requisition data');
        }
      };

      fetchRequisitions();
    }
  }, [isVisible]);

  const handleStatusChange = (status) => {
    setRequestData((prevData) =>
      prevData.map((item) =>
        item.id === selectedRequest.id ? { ...item, status } : item
      )
    );
    setSelectedRequest(null);
  };

  return (
    <div className={`fixed inset-0 ${isVisible ? 'flex' : 'hidden'} items-center justify-center z-[70]`}>
      <div className="bg-white w-full max-w-[700px] rounded-lg relative p-10 overflow-y-auto border">
        <button onClick={onClose} className="absolute top-5 right-6 border rounded-full p-1">
          <VscClose size={20} />
        </button>

        <div className="flex items-center gap-8 py-2 pb-5">
          <img src={AweLogo} alt="Logo" className="max-w-[180px] w-full" />
          <h2 className="text-xl font-bold underline">Employee Requisition Review</h2>
        </div>

        {error ? (
          <div className="text-[red]">{error}</div>
        ) : (
          <EmployReq
            requestData={requestData}
            onStatusChange={handleStatusChange}
            onRequestSelect={(request) => setSelectedRequest(request)}
          />
        )}

        {/* Modal for reviewing selected request */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-[600px] rounded-lg p-8 relative">
              <button onClick={() => setSelectedRequest(null)} className="absolute top-4 right-4">
                <VscClose size={20} />
              </button>
              <h3 className="text-xl font-bold mb-4">Review Requisition</h3>
              <div className="gap-4">
                {[ 
                  { label: 'Requested Manager', value: selectedRequest.manager },
                  { label: 'Department', value: selectedRequest.department },
                  { label: 'Position', value: selectedRequest.position },
                  { label: 'Project', value: selectedRequest.project },
                  { label: 'Quantity', value: selectedRequest.quantity },
                  { label: 'Additional', value: selectedRequest.additional || '' },
                  { label: 'Justification', value: selectedRequest.justification || '' },
                ].map((item, index) => (
                  <div key={index} className="flex mb-2">
                    <strong className="w-1/3">{item.label}:</strong>
                    <span className="w-2/3">{item.value}</span>
                  </div>
                ))}
              </div>
              {/* Conditionally render buttons for MD view */}
              {isMdView && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-red text-white px-4 py-2 rounded-lg mr-2"
                    onClick={() => handleStatusChange('Rejected')}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-green text-white px-4 py-2 rounded-lg"
                    onClick={() => handleStatusChange('Approved')}
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};






// import React, { useEffect } from 'react';
// import AweLogo from '../../assets/logo/logo-with-name.svg';
// import { VscClose } from "react-icons/vsc";


// export const RequisitionReviewForm = ({ isVisible, onClose, requestData, onStatusChange }) => {

//   return (
//     <div className="fixed inset-0 top-0 left-0 bg-grey bg-opacity-80 center z-[70] pt-12">
//       <div className="bg-white w-full max-w-[700px] rounded-lg relative p-10 overflow-y-auto border">

//        <button onClick={onClose} className="absolute top-5 right-6 border rounded-full p-1">
//           <VscClose size={20} />
//         </button>
//         <div className="flex items-center gap-8 py-2 pb-5">
//           <img src={AweLogo} alt="Logo" className="max-w-[180px] w-full" />
//           <h2 className="text-xl font-bold underline">Employee Requisition Review</h2>
//         </div>
//         <div className="gap-4">
//           {[
//             { label: 'Requested Manager', value: requestData.manager },
//             { label: 'Department', value: requestData.department },
//             { label: 'Project', value: requestData.project },
//             { label: 'Position', value: requestData.position },
//             { label: 'Quantity', value: requestData.quantity },
//             { label: 'Additional', value: '' },
//             { label: 'Replacement', value: '' },
//             { label: 'If Replacement, for whom', value: '' },
//             { label: 'Justification of Request', value: '' },
//             { label: 'State Qualification Desired', value: '' },
//             { label: 'Tentative Period for Mobilization', value: '' },
//           ].map((item, index) => (
//             <div key={index} className="grid grid-cols-3 gap-2 mb-2">
//               <strong className="w-full">{item.label}</strong>
//               <span className="w-full col-span-2">: &nbsp;{item.value}</span>
//             </div>
//           ))}
//         </div>
//         <div className="center">
//           <button
//             className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 mr-10 shadow-xl rounded-lg"
//             onClick={() => {
//               onStatusChange('Rejected');
//               onClose();
//             }}
//           >
//             Reject
//           </button>
//           <button
//             className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
//             onClick={() => {
//               onStatusChange('Approved');
//               onClose();
//             }}
//           >
//             Approve
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
