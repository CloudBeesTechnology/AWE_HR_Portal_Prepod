import React, { useEffect, useState } from "react";
import AweLogo from "../../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { format } from "date-fns";
import { generateClient } from "@aws-amplify/api";
import { listEmpRequisitions } from "../../../graphql/queries";
import { UpdateEmpReqData } from "../../../services/updateMethod/UpdateEmpReqData";
import { SpinLogo } from "../../../utils/SpinLogo";
import { sendEmail } from "../../../services/EmailServices";
import { useTempID } from "../../../utils/TempIDContext";

const client = generateClient();

export const RequisitionReviewForm = ({
  isVisible,
  onClose,
  selectedRequest,
  onStatusChange,
}) => {
  const [requestData, setRequestData] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userType = localStorage.getItem("userType");
  const { hrManagerMail, gmPosition } = useTempID();

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
    status: "Pending",
  };

  const request = selectedRequest || defaultRequest;

console.log("HR M",hrManagerMail);
console.log("Gm", gmPosition);


  useEffect(() => {
    if (isVisible) {
      const fetchRequisitions = async () => {
        try {
          let allRequisitions = [];
          let nextToken = null;

          do {
            const response = await client.graphql({
              query: listEmpRequisitions,
              variables: {
                nextToken,
              },
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

            allRequisitions = [...allRequisitions, ...fetchedData];

            nextToken = response?.data?.listEmpRequisitions?.nextToken;
          } while (nextToken);

          setRequestData(allRequisitions);
          setError(null);
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
      setIsLoading(true);
      await UpdateEmpReqData({
        requestId: selectedRequest.id,
        newStatus: statusUpdate,
      });

      // Update status (e.g., make API call)
      if (onStatusChange) {
        onStatusChange({ id: selectedRequest.id, status: statusUpdate });
      }

      const { reqName, position, approverID } = request;

      if (approverID) {
        await sendEmail(
          `Employee Requisition Request ${statusUpdate}`,
          `<html>
    <body>
      <p>
       Dear ${reqName},<br/><br/>
        Your requisition request for the position of ${position} 
        has been <strong>${statusUpdate}</strong> by the General Manager.<br/><br/>
        Click here https://hr.adininworks.co to view the Status.
       </p>
       </body>
    </html>`,
          "hr_no-reply@adininworks.com",
          approverID
        );
      }

      if (hrManagerMail) {
        await sendEmail(
          `Requisition ${statusUpdate}`,
          `<html>
    <body>
      <p>
       Dear HR,<br/><br/>
        The requisition request for the position of ${position} 
        submitted by ${reqName} has been <strong>${statusUpdate}</strong> 
        by the General Manager.<br/><br/>
        Please proceed with the necessary actions.<br/><br/>
        Click here https://hr.adininworks.co to view the Status Update.
      </p>
    </body>
  </html>`,
          "hr_no-reply@adininworks.com",
          hrManagerMail
        );
      }

      // Stop loading after success
      setIsLoading(false);

      // Optionally, trigger a success notification
      setNotification(true);
      setShowTitle("Form Status Updated Successfully");
    } catch (err) {
      console.error("Error updating status or sending email:", err);

      // Stop loading on error
      setIsLoading(false);
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
      <div className="center min-h-screen overflow-y-auto ">
        <header className="bg-white w-full max-w-[600px] rounded-lg relative p-5">
          <div className="text-center p-2">
            <img
              src={AweLogo}
              alt="Logo"
              className="max-w-[250px] w-full mx-40 mb-3"
            />
            <h2 className="text-xl font-bold underline my-2">
              Employee Requisition Form
            </h2>
            <button
              onClick={onClose}
              className="absolute top-5 right-6 border rounded-full p-1"
            >
              <VscClose size={20} />
            </button>
          </div>

          <form className="px-5 bg-white shadow-xl">
            {/* Replace this part with the actual form fields */}
            {[
              { label: "Requested Manager", value: request.reqName },
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

            {gmPosition && (
              <>
                {request.status !== "Approved" &&
                request.status !== "Rejected" ? (
                  <div className="flex justify-evenly pb-5">
                    <button
                      className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                      onClick={() => handleStatusUpdate("Rejected")}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Reject"}
                    </button>
                    <button
                      className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                      onClick={() => handleStatusUpdate("Approved")}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Approve"}
                    </button>
                  </div>
                ) : (
                  <div className="mx-20 border center gap-3 rounded-lg bg-gradient-to-r from-[#f5ee6ad7] via-[#faf362] to-[#f5ee6ad7] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
                    <h3 className="text-lg text-[#6a2b2b] p-1.5 font-bold">
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

            {/* other components */}
            {notification && (
              <SpinLogo
                text={showTitle}
                notification={notification}
                path="/recrutiles/employreq"
              />
            )}
          </form>
        </header>
      </div>
    </div>
  );
};
