import React, { useEffect, useState } from "react";
import AweLogo from "../../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { format } from "date-fns";
import { generateClient } from "@aws-amplify/api";
import { listEmpRequisitions } from "../../../graphql/queries";
import { UpdateEmpReqData } from "../../../services/updateMethod/UpdateEmpReqData";
import { SpinLogo } from "../../../utils/SpinLogo";
import { sendEmail } from "../../../services/EmailServices";

const client = generateClient();

export const RequisitionReviewForm = ({
  isVisible,
  onClose,
  isGmView = false,
  selectedRequest,
  onStatusChange,
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
  
      setNotification(true);
      setShowTitle("Form Status Updated Successfully");
  
      console.log("Status updated successfully:", response);
  
      if (onStatusChange) {
        onStatusChange({ id: selectedRequest.id, status: statusUpdate });
      }
  
      const { reqName, position, project, requestorEmail, humanResourceManagerEmail } = request;
  
      // Email to requestor
      if (requestorEmail) {
        await sendEmail(
          `Your Requisition Request Has Been ${request.status}`,
          `Dear ${reqName}, 
  
          Your requisition request for the position of ${position} under the project ${project} has been ${request.status} by the General Manager.
  
          View the details at: https://hr.adininworks.co`,
          "hr_no-reply@adininworks.com",
          requestorEmail
        );
      } else {
        console.error("Requestor email not found.");
      }
  
      // Email to HR
      if (humanResourceManagerEmail) {
        await sendEmail(
          `Requisition ${request.status}`,
          `Dear HR Team,
  
          The requisition request for the position of ${position} under the project ${project}, submitted by ${reqName}, has been ${request.status} by the General Manager.
  
          Please proceed with the necessary actions.
  
          View the details at: https://hr.adininworks.co
  
          Regards, 
          GM`,
          "hr_no-reply@adininworks.com",
          humanResourceManagerEmail
        );
      } else {
        console.error("HR email not found.");
      }
  
      setTimeout(() => onClose(), 4000);
    } catch (err) {
      console.error("Error updating status", err);
    }
  };
  

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[#339933]"
      : status === "Pending"
      ? "text-[#ff8b3d]"
      : "text-[#ff8b3d]";
  };

  return (
    <div
      className={`fixed inset-0 ${
        isVisible ? "flex" : "hidden"
      } bg-grey bg-opacity-75 flex items-center justify-center z-50`}
    >
      <div className="bg-white w-full max-w-[600px] rounded-lg relative ">
        <div className="text-center p-2">
          <img
            src={AweLogo}
            alt="Logo"
            className="max-w-[250px] w-full mx-40 mb-3"
          />
          <h2 className="text-xl font-bold underline my-6">
            Employee Requisition Form
          </h2>
          <button
            onClick={onClose}
            className="absolute top-5 right-6 border rounded-full p-1"
          >
            <VscClose size={20} />
          </button>
        </div>

        <form className="max-h-[500px] overflow-y-auto px-10">
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

          {userType === "GM" && isGmView && (
            <>
              {request.status !== "Approved" &&
              request.status !== "Rejected" ? (
                <div className="flex justify-center gap-10 mb-10">
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
                <div className="mx-10 mb-5 center gap-3 rounded-lg bg-gradient-to-r from-[#f5ee6ad7] via-[#faf362] to-[#f5ee6ad7] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
                  <h3 className="text-lg text-[#615d5d] p-1.5 font-bold">
                    Requisition Status :
                  </h3>
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

          {/* {userType === "GM" && isGmView && (
              <div className="flex justify-center gap-10 mb-10">
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

          {!(userType === "GM" && isGmView) && (
            <div className="mx-10 mb-5 center gap-3 rounded-lg [background:linear-gradient(to_right,_#f5ee6ad7,_#faf362,_#ffe89d,_#f5ee6ad7)] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
              <h3 className="text-lg text-[#615d5d] p-1.5 font-bold">
                Requisition Status :
              </h3>
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
              text={showTitle}
              notification={notification}
              path="/recrutiles/employreq"
            />
          )}
        </form>
      </div>
    </div>
  );
};
