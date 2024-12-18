import React, { useEffect, useState } from "react";
import AweLogo from "../../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { format } from "date-fns";
import { generateClient } from "@aws-amplify/api";
import { listEmpRequisitions } from "../../../graphql/queries";
import { UpdateEmpReqData } from "../../../services/updateMethod/UpdateEmpReqData";
import { SpinLogo } from "../../../utils/SpinLogo";

const client = generateClient();

export const RequisitionReviewForm = ({
  isVisible,
  onClose,
  isMdView = false,
  isHrView = false,
  selectedRequest,
  onStatusChange,
  // userType
}) => {
  const [requestData, setRequestData] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const userType = localStorage.getItem("userType");

  const defaultRequest = {
    reqName: "",
    department: "",
    position: "",
    project: "",
    quantity: "",
    reasonForReq: "",
    justification: "",
    replacementFor: "",
    qualification: "",
    tentativeDate: new Date(),
    // status: "Pending",
  };

  const request = selectedRequest || defaultRequest;

  useEffect(() => {
    if (isVisible) {
      const fetchRequisitions = async () => {
        try {
          const response = await client.graphql({
            query: listEmpRequisitions,
          });

          const fetchedData = response?.data?.listEmpRequisitions?.items.map(
            (item) => ({
              id: item.id,
              requestorID: item.requestorID,
              approverID: item.approverID,
              reqName: item.reqName,
              department: item.department,
              position: item.position,
              project: item.project,
              quantity: item.quantity,
              reasonForReq: item.reasonForReq,
              justification: item.justification,
              replacementFor: item.replacementFor || "N/A",
              qualification: item.qualification,
              tentativeDate: item.tentativeDate,
              status: item.status,
              remarkReq: item.remarkReq,
              date: item.createdAt,
            })
          );

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
      const response = await UpdateEmpReqData({
        requestId: selectedRequest.id,
        newStatus: statusUpdate,
      });

      setShowTitle("Form Status Updated Successfully");
      setNotification(true);

      // console.log("Status updated successfully:", response);

      if (onStatusChange) {
        onStatusChange({ id: selectedRequest.id, status: statusUpdate });
      }

      onClose();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[green]"
      : status === "Pending"
      ? "text-dark_grey"
      : "text-[#E8A317]";
  };

  return (
    <div
      className={`fixed inset-0 ${
        isVisible ? "flex" : "hidden"
      } bg-grey bg-opacity-75 flex items-center justify-center z-50`}
    >
      <div className="bg-white w-full max-w-[700px] rounded-lg relative p-10 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-6 border rounded-full p-1"
        >
          <VscClose size={20} />
        </button>

        <div className="flex items-center gap-8 py-2 pb-5">
          <img src={AweLogo} alt="Logo" className="max-w-[180px] w-full" />
          <h2 className="text-xl font-bold underline">
            Employee Requisition Form
          </h2>
        </div>

        <div className="gap-4">
          {[
            {
              label: "Requested Manager",
              value: request.reqName,
            },
            { label: "Department", value: request.department },
            { label: "Position", value: request.position },
            { label: "Project", value: request.project },
            { label: "Quantity", value: request.quantity },
            { label: "Reason for Request", value: request.reasonForReq },
            { label: "Justification", value: request.justification },
            {
              label: "Replacement For",
              value: request.replacementFor || "N/A",
            },
            { label: "Qualification", value: request.qualification },
            {
              label: "Tentative Date To Mobilize",
              value: format(new Date(request.tentativeDate), "dd-MM-yyyy"),
            },
          ].map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
              <strong className="w-full">{item.label}</strong>
              <span className="w-full col-span-2">: &nbsp;{item.value}</span>
            </div>
          ))}
        </div>

        {userType === "GM" && isMdView && (
          <>
            {request.status !== "Approved" && request.status !== "Rejected" ? (
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
            ) : (
              <div className="mt-6 center gap-3">
            <h3 className="text-lg font-bold">Requisition Status :</h3>
            <p
              className={`text-xl font-semibold ${getStatusClass(
                request.status
              )}`}
            >
              {request.status || "Pending"}
            </p>
          </div>
            )}
          </>
        )}

        {/* {userType === "GM" && isMdView && (
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
 
        )} */}

        {userType === "HR" && isHrView && (
          <div className="mt-6 center gap-3">
            <h3 className="text-lg font-bold">Requisition Status :</h3>
            <p
              className={`text-xl font-semibold ${getStatusClass(
                request.status
              )}`}
            >
              {request.status || "Pending"}
            </p>
          </div>
        )}

        {notification && (
          <SpinLogo
            text= "Requisition Form Status Saved Successfully"
            notification={notification}
            // path="/recrutiles/employreq"
          />
        )}
      </div>
    </div>
  );
};

