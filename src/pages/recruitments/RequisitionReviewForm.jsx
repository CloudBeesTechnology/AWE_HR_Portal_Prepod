import React, { useEffect, useState } from "react";
import AweLogo from "../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { format } from "date-fns";
import { generateClient } from "@aws-amplify/api";
import { listEmpRequisitions } from "../../graphql/queries";
import { updateEmpRequisition } from "../../graphql/mutations";

const client=generateClient()

export const RequisitionReviewForm = ({ isVisible, onClose, isMdView = false, selectedRequest }) => {
  const [requestData, setRequestData] = useState([]);
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
            reqName: item.reqName,
            department: item.department,
            position: item.position,
            project: item.project,
            quantity: item.quantity,
            reasonForReq: item.reasonForReq,
            justification: item.justification,
            replacementFor: item.replacementFor || "",
            qualification: item.qualification || "",
            tentativeDate: item.tentativeDate || "",
            status: item.status || "",
            remarkReq: item.remarkReq || "",
            date: item.createdAt,
          }));

          setRequestData(fetchedData);
        } catch (err) {
          console.error("Error fetching requisition data:", err);
          setError("Error fetching requisition data");
        }
      };

      fetchRequisitions();
    }
  }, [isVisible]);

  const handleStatusUpdate = async (statusUpdate) => {
    try {
      await client.graphql({
        query: updateEmpRequisition,
        variables: {
          input: {
            id: selectedRequest.id,
            status: statusUpdate, // New status (e.g., "Approved" or "Rejected")
          },
        },
      });
      onClose(); // Close the form after updating
      // fetchRequisitionData(); // Refresh the list to show updated status
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  // Ensure the modal is rendered correctly
  return (
    <div className={`fixed inset-0 ${isVisible ? "flex" : "hidden"} bg-grey bg-opacity-75 flex items-center justify-center z-50`}>
      <div className="bg-white w-full max-w-[700px] rounded-lg relative p-10 overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-6 border rounded-full p-1">
          <VscClose size={20} />
        </button>

        <div className="flex items-center gap-8 py-2 pb-5">
          <img src={AweLogo} alt="Logo" className="max-w-[180px] w-full" />
          <h2 className="text-xl font-bold underline">Employee Requisition Form</h2>
        </div>

        <div className="gap-4">
          {[
            { label: "Requested Manager", value: selectedRequest.reqName },
            { label: "Department", value: selectedRequest.department },
            { label: "Position", value: selectedRequest.position },
            { label: "Project", value: selectedRequest.project },
            { label: "Quantity", value: selectedRequest.quantity },
            { label: "Reason for Request", value: selectedRequest.reasonForReq },
            { label: "Justification", value: selectedRequest.justification },
            { label: "Replacement For", value: selectedRequest.replacementFor || "No" },
            { label: "Qualification", value: selectedRequest.qualification },
            { label: "Tentative Date", value: format(new Date(selectedRequest.tentativeDate), "dd-MM-yyyy")},
            { label: "Status", value: selectedRequest.status || "" },
            { label: "Remarks", value: selectedRequest.remarkReq || "" },
            { label: "Submitted Date", value: format(new Date(selectedRequest.createdAt), "dd-MM-yyyy")},
          ].map((item, index) => (
            <div key={index} className="flex mb-2">
              <strong className="w-1/3">{item.label}:</strong>
              <span className="w-2/3">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Conditional render for Approve/Reject buttons in MD view */}
        {isMdView && (
          <div className="flex justify-center gap-10 mt-4">
            <button
              className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
              onClick={() => handleStatusUpdate("Rejected")}
            >
              Reject
            </button>
            <button
              className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
              onClick={() => handleStatusUpdate("Approved")}
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
  
