import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Searchbox } from "../../utils/Searchbox";
import { RequisitionReviewForm } from '../recruitments/RequisitionReviewForm';
import { RemarksDialog } from "../recruitments/RemarksDialog";
import { format } from "date-fns";
import { listEmpRequisitions } from "../../graphql/queries";
import { generateClient } from "@aws-amplify/api";
import { updateEmpRequisition } from '../../graphql/mutations';

const client = generateClient();

export const EmployReq = ({ requestData, onStatusChange, onRequestSelect }) => {
  const [requisitionData, setRequisitionData] = useState([]);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRemarksRequest, setSelectedRemarksRequest] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch requisition data
  const fetchRequisitionData = async () => {
    try {
      const response = await client.graphql({ query: listEmpRequisitions });
      const fetchedData = response?.data?.listEmpRequisitions?.items || [];
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

  // Handle "View" link click
  const handleViewClick = (request) => {
    setSelectedRequest(request);
    setIsReviewFormVisible(true);
  };

  // Close the review form
  const handleReviewFormClose = () => {
    setSelectedRequest(null);
    setIsReviewFormVisible(false);
  };

 // Define updateStatus
const updateStatus = async (requestId, newStatus) => {
  try {
    await client.graphql({
      query: updateEmpRequisition,
      variables: {
        input: {
          id: requestId,
          status: newStatus, // Status to be updated ("Approved", "Rejected", etc.)
        },
      },
    });
    // Refresh the requisition data after updating the status
    fetchRequisitionData();
  } catch (err) {
    console.error("Error updating status:", err);
  }
};

  const closeRemarksDialog = () => {
    setSelectedRemarksRequest(null);
  };

  const saveRemarks = (remarks) => {
    onStatusChange(selectedRemarksRequest.id, remarks);
    setSelectedRemarksRequest(null);
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

      {error && <div className="text-[red] text-center mb-4">{error}</div>}

      {requisitionData.length > 0 ? (
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
              {requisitionData.map((item) => (
                <tr key={item.id} className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]">
                  <td className="pl-4 py-4">{item.reqName}</td>
                  <td className="py-4">{item.department}</td>
                  <td className="py-4">{item.position}</td>
                  <td className="py-4">{item.project}</td>
                  <td className="py-4">{item.quantity}</td>
                  <td className="py-4">{format(new Date(item.createdAt), "dd-MM-yyyy")}</td> 
                          

                  <td className="py-4">
                    <a
                      href="#"
                      className="text-[#2779f5f7] font-semibold underline cursor-pointer"
                      onClick={() => handleViewClick(item)}
                    >
                      View
                    </a>
                  </td>
                  {/* <td className={`py-4 font-semibold ${
                    item.status === "Approved" ? "text-[#25a041]" :
                    item.status === "Rejected" ? "text-[#f75a11]" :
                    "text-grey"
                  }`}> */}
                     <td className="py-4">{item.status ? item.status : "Pending"}</td>   
                  {/* </td> */}
                  <td className="py-4 flex items-center gap-2">
                    <span>{item.remarkReq}</span>
                    <FaPencilAlt onClick={() => setSelectedRemarksRequest(item)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4">No Requisitions Found</div>
      )}

      {isReviewFormVisible && selectedRequest && (
        <RequisitionReviewForm
  isVisible={isReviewFormVisible}
  onClose={handleReviewFormClose}
  isMdView={true}
  selectedRequest={selectedRequest}
  onStatusChange={updateStatus} // Pass the function here
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



