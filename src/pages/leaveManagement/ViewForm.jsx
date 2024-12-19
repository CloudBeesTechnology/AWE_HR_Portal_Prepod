import React, { useState, useEffect, useContext } from "react";
import AweLogo from "../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import { SpinLogo } from "../../utils/SpinLogo";
import { useCreateNotification } from "../../hooks/useCreateNotification"; // Importing the custom hook
import { UpdateLeaveData } from "../../services/updateMethod/UpdateLeaveData";
import { DataSupply } from "../../utils/DataStoredContext";
import { sendEmail } from "../../services/EmailServices";

export const ViewForm = ({
  handleClickForToggle,
  leaveData,
  ticketData,
  source,
  userType,
  personalInfo,
  formatDate,
}) => {

console.log(ticketData);

  const { empPIData } = useContext(DataSupply);
  const [remark, setRemark] = useState("");
  const [userName, setUserName] = useState("");
  const [notification, setNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const navigate = useNavigate();
  const { handleUpdateLeaveStatus, handleUpdateTicketRequest } =
    useLeaveManage();
  const { createNotification } = useCreateNotification(); // Hook for creating notification
  const { leaveDetails } = UpdateLeaveData();

  const managerName = empPIData.find((val) => {
    const findingManagerName = leaveData?.managerEmpID === val.empID
    return findingManagerName
  });
  const supervisorName = empPIData.find((val) => {
    const findingSupervisorName = leaveData?.supervisorEmpID === val.empID
    return findingSupervisorName
  });


  const handleUpdateStatus = async (status) => {
    const updateData = {};
    const userType = localStorage.getItem("userType");
    const currentDate = new Date().toISOString();

    if (userType === "Manager") {
      updateData.managerStatus = status;
      updateData.managerRemarks = remark;
      updateData.managerDate = currentDate;
    } else if (userType === "Supervisor") {
      updateData.supervisorStatus = status;
      updateData.supervisorRemarks = remark;
      updateData.supervisorDate = currentDate;
    }
    function formatDate(isoString) {
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Handle Leave status update
    if (source === "LM") {
      const fromDate = leaveData.empLeaveStartDate;
      const toDate = leaveData.empLeaveEndDate;
      const formattedDateFrom = formatDate(fromDate);
      const formattedDateTo = formatDate(toDate);


      handleUpdateLeaveStatus(leaveData.id, updateData).then(()=>{
        
      setNotificationText(
        `Leave ${status} by ${personalInfo.name} on ${formatDate(currentDate)}`
      );

      if (
        userType === "Manager" &&
        leaveData.supervisorEmpID === null &&
        status === "Approved"
      ) {
        console.log("checking manager");

        sendEmail(
          `Leave Request ${status}`,
          `Dear ${leaveData.empName || "Not mention"}, Leave request for From Date : ${formattedDateFrom} To Date : ${formattedDateTo} has been Status: ${status} by Manager Name : ${
            managerName.name || "Not mention"
          }. View at : https://hr.adininworks.co `,
          "hr_no-reply@adininworks.com",
          leaveData.empOfficialEmail
        );

      } else if (
        userType === "Supervisor" &&
        leaveData?.supervisorEmpID &&
        leaveData?.managerStatus === "Pending" &&
        status === "Approved"
      ) {
        const FindingEmail = empPIData.filter((manage) => {
          const IdFinding =
            leaveData?.managerEmpID.toLowerCase() === manage.empID.toLowerCase();

          return IdFinding;
        });
        // console.log("manager");
 
        // manager got email
        sendEmail(
          `Leave Request ${status}`,
          `Employee ${leaveData.empName || "Not mention"} , 
           applied leave request for the period ${formattedDateFrom} to ${formattedDateTo} has been ${status} by Supervisor ${
            supervisorName.name || "Not mention"
          }. View at : https://hr.adininworks.co `,

          "hr_no-reply@adininworks.com",
          FindingEmail[0].officialEmail
        );


      } else if (
        userType === "Manager" &&
        leaveData.managerEmpID &&
        leaveData.supervisorStatus === "Approved" &&
        status === "Approved"
      ) {
        const FindingEmail = empPIData.filter((sup) => {
          const IdFinding =
            leaveData.supervisorEmpID.toLowerCase() === sup.empID.toLowerCase();

          return IdFinding;
        });
        // console.log("2");

        // //superviosr got email
        sendEmail(
          `Leave Request ${status}`,
          `Employee  ${
            leaveData.empName || "Not mention"
          } , applied leave request for the period ${formattedDateFrom} to ${formattedDateTo} has been ${status} by Manager ${
            managerName.name || "Not mention"
          }. View at : https://hr.adininworks.co `,
          "hr_no-reply@adininworks.com",
          FindingEmail[0].officialEmail
        );
        //Employee got email
        sendEmail(
          `Leave Request ${status}`,
          `Dear ${
            leaveData.empName || "Not mention"
          } , Your leave request for the period ${formattedDateFrom} to ${formattedDateTo} has been ${status} by Manager ${
            managerName.name || "Not mention"
          }  and Supervisor ${supervisorName.name || "Not mention"}. View at : https://hr.adininworks.co `,
          "hr_no-reply@adininworks.com",
          leaveData.empOfficialEmail
        );
      }

      // Create notification for the leave status update
      if (userType === "Manager") {
        createNotification({
          empID: leaveData.empID,
          leaveType: leaveData.leaveType,
          message: `Leave request for ${leaveData.empName} has been ${status} by ${personalInfo.name}`,
          senderEmail: "leave_no-reply@adininworks.com", // Sender email
          receipentEmail: leaveData.empOfficialEmail, // Using the employee's official email
          receipentEmpID: leaveData.empID,
          status: "Unread",
          createdAt: currentDate,
          updatedAt: currentDate,
        });
      }

      setNotification(true);
      setTimeout(() => {
        setNotification(false);
        handleClickForToggle(false);
        navigate("/leaveManage");
        // Redirect to the dashboard or another page
      }, 3000);

      }).catch((err)=>console.log(err)
      )

    } else if (source === "Tickets") {
      updateData.hrStatus = status; // Set the status for the ticket request
      updateData.hrRemarks = remark;
      updateData.hrDate = currentDate;
      const formattedDatedeparture = formatDate(ticketData.departureDate);
      const formattedDatearrival = formatDate(ticketData.arrivalDate);
      handleUpdateTicketRequest(ticketData.id, updateData).then(()=>{
        setNotificationText(
          `Ticket request ${status} by ${personalInfo.name} on ${formatDate(
            currentDate
          )}`
        );
  
        sendEmail(
          `Ticket Request ${status}`,
          `Dear  ${
            ticketData.empName || "Not mention"
          } , Your ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${status} by HR ${
            personalInfo.name || "Not mention"
          }. View at : https://hr.adininworks.co `,
          "hr_no-reply@adininworks.com",
  
          ticketData.empOfficialEmail
        );
  
        // Create notification for the ticket status update
        createNotification({
          empID: ticketData.empID,
          leaveType: "Ticket Request", // Assuming a default value as this is a ticket request
          message: `Ticket request for ${ticketData.empName} has been ${status} by ${personalInfo.name}`,
          senderEmail: "ticket_no-reply@adininworks.com", // Sender email
          receipentEmail: ticketData.empOfficialEmail, // Using the employee's official email
          receipentEmpID: ticketData.empID,
          status: "Unread",
          createdAt: currentDate,
          updatedAt: currentDate,
        });
  
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
          handleClickForToggle(false);
          navigate("/leaveManage/requestTickets");
          // Redirect to the dashboard or another page
        }, 3000);
        })
        .catch((err)=>console.log(err)
      )

    }
  };

  console.log(leaveData, "LD")

  const handleApprove = () => handleUpdateStatus("Approved");
  const handleReject = () => handleUpdateStatus("Rejected");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserName(userType);
  }, []);
  const renderButtons = () => {
    if (
      leaveData.supervisorStatus === "Approved" &&
      leaveData.managerStatus === "Pending" &&
      userType === "Supervisor" &&
      userType !== "SuperAdmin" &&
      userType !== "HR"
    ) {
      return (
        <div className="center w-full">
          <button
            className="border border-grey p-2 px-5 rounded text-dark_grey text_size_6"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      );
    }

    if (
      leaveData.supervisorStatus === "Pending" &&
      userType !== "SuperAdmin" &&
      userType !== "HR"
    ) {
      return (
        <>
          <button
            className="bg-[#FEF116] p-2 px-3 rounded text-dark_grey text_size_6"
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="border border-grey p-2 px-5 rounded text-dark_grey text_size_6"
            onClick={handleReject}
          >
            Reject
          </button>
        </>
      );
    }

    if (
      leaveData.supervisorStatus === "Approved" &&
      leaveData.supervisorStatus !== "Rejected" &&
      leaveData.managerStatus === "Pending" &&
      userType !== "SuperAdmin" &&
      userType !== "HR"
    ) {
      return (
        <>
          <button
            className="bg-[#FEF116] p-2 px-3 rounded text-dark_grey text_size_6"
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="border border-grey p-2 px-5 rounded text-dark_grey text_size_6"
            onClick={handleReject}
          >
            Reject
          </button>
        </>
      );
    }

    if (
      leaveData.managerStatus === "Pending" &&
      leaveData.supervisorStatus !== "Rejected" &&
      userType !== "SuperAdmin" &&
      userType !== "HR"
    ) {
      return (
        <>
          <button
            className="bg-[#FEF116] p-2 px-3 rounded text-dark_grey text_size_6"
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="border border-grey p-2 px-5 rounded text-dark_grey text_size_6"
            onClick={handleReject}
          >
            Reject
          </button>
        </>
      );
    }

    if (
      leaveData.managerStatus === "Approved" &&
      leaveData.supervisorStatus === "Approved" &&
      userType !== "SuperAdmin" &&
      userType !== "HR"
    ) {
      return null; // No buttons rendered in this case
    }

    return null; // Default case if none of the conditions match
  };
  return (
    <main className="flex flex-col items-center justify-center bg-grey bg-opacity-75 inset-0 z-50 fixed">
      <div className="center min-h-screen overflow-y-auto">
        <header className="bg-white w-full max-w-[600px] rounded-lg relative p-5 ">
          <button
            onClick={handleClickForToggle}
            className="absolute top-5 right-6 border rounded-full p-1"
          >
            <VscClose size={20} />
          </button>

          <div className=" justify-items-center gap-4">
            <img src={AweLogo} alt="Logo" className="max-w-[180px] w-full" />
            <h2 className="text-xl mt-2 font-bold underline">
              {(source === "LM" && "Leave Application Form") ||
                (source === "Tickets" && "Ticket Request Form")}
            </h2>
          </div>
          {notification && userType === "HR" && (
            <SpinLogo
              text={notificationText}
              notification={notification}
              path="/leaveManage/requestTickets"
            />
          )}
            {notification && userType === "Manager" || userType === "Supervisor" && (
            <SpinLogo
              text={notificationText}
              notification={notification}
              path="/leaveManage"
            />
          )}

          {source === "LM" && (
            <section className="shadow-md w-[500px] p-5 bg-white">
              <div className="text_size_6 ">
                {[
                  { label: "Name", value: leaveData.empName || "" },
                  {
                    label: "Badge No",
                    value: leaveData.empBadgeNo,
                  },
                  {
                    label: "Job Title",
                    value: leaveData.position || "N/A",
                  },
                  {
                    label: "Department",
                    value:  leaveData.department || "N/A",
                  },
                  { label: "Leave Type", value: leaveData.empLeaveType },
                  {
                    label: "Applied Dates",
                    value: ` ${formatDate(leaveData.  empLeaveStartDate)} to ${formatDate(
                      leaveData. empLeaveEndDate
                    )} `,
                  },
                  { label: "Total No of Days", value: leaveData.leaveDays},
                  // { label: "Leave Balance", value: leaveData.balance },
                  { label: "Reason", value: leaveData.reason },
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                    <strong className="w-full">{item.label}</strong>
                    <span className="w-full col-span-2">
                      : &nbsp;{item.value}
                    </span>
                  </div>
                ))}

                {/* Remarks Section */}
                {leaveData.remark && (
                  <div className="grid grid-cols-2 py-6">
                    <p>Comments:</p>
                    <p className="text-start text-[16px] font-medium border border-gray-400 w-full break-words overflow-hidden h-[51px]">
                      {leaveData.empRemarks || "No remarks added"}
                    </p>
                  </div>
                )}
                {userType === "SuperAdmin" ? (
                  <div className="mt-5 text-lg flex flex-col justify-between gap-2 font-semibold">
                    <div className="flex flex-col justify-between gap-2">
                      <p className="">
                        {`Supervisor: ${leaveData.supervisorStatus}`}
                      </p>
                      <p className=" w-full break-words overflow-hidden">{`Supervisor Remark:   ${
                        leaveData.supervisorRemarks || "no remarks"
                      }`}</p>
                      <p className="">{`Manager:   ${leaveData.managerStatus}`}</p>
                    </div>
                    <p className=" w-full break-words overflow-hidden">{` Manager Remark:   ${
                      leaveData.managerRemarks || "no remarks"
                    }`}</p>
                  </div>
                ) : userType === "Supervisor" ? (
                  <div className="mt-5 text-lg space-y-2 font-semibold ">
                    {leaveData.supervisorStatus === "Approved" && (
                      <p className=" w-full break-words overflow-hidden">{` Remark:   ${
                        leaveData.supervisorRemarks || "no remarks"
                      }`}</p>
                    )}
                    <p className="">{`Manager:   ${leaveData.managerStatus}`}</p>
                    {leaveData.managerStatus === "Approved" && (
                      <p className=" w-full break-words overflow-hidden">{`Mangaer Remarks:   ${
                        leaveData.managerRemarks || "no remark"
                      }`}</p>
                    )}
                  </div>
                ) : userType === "Manager" ? (
                  <div className="mt-5 text-lg space-y-2 font-semibold">
                    <p className="">
                      {`Supervisor: ${leaveData.supervisorStatus}`}
                      <p className=" w-full break-words overflow-hidden">{`Supervisor Remark:   ${
                        leaveData.supervisorRemarks || "no remarks"
                      }`}</p>
                      {leaveData.managerStatus === "Approved" && (
                        <p className=" w-full break-words overflow-hidden">{`Remark:   ${
                          leaveData.managerRemarks || "no remarks"
                        }`}</p>
                      )}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {/* Add Remark Input */}
                {leaveData.managerStatus === "Pending" &&
                  leaveData.supervisorStatus === "Pending" &&
                  userType !== "SuperAdmin" &&
                  userType !== "HR" && (
                    <div className="grid grid-rows-2 pt-1">
                      <label htmlFor="remark">Remark :</label>
                      <input
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-grey w-full h-9 outline-none pl-2"
                      />
                    </div>
                  )}
                {leaveData.managerStatus === "Pending" &&
                  leaveData.supervisorStatus !== "Pending" &&
                  userType === "Manager" &&
                  userType !== "SuperAdmin" &&
                  userType !== "HR" && (
                    <div className="grid grid-rows-2 pt-1">
                      <label htmlFor="remark">Remark :</label>
                      <input
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-grey w-full h-9 outline-none pl-2"
                      />
                    </div>
                  )}
              </div>
              {/* Action Buttons */}
              <div className="flex justify-between px-5 mt-6">
                {renderButtons()}
                {/* {leaveData.managerStatus === "Pending" &&
                (leaveData.supervisorStatus === "Pending" ||
                  leaveData.supervisorStatus === "Approved") &&
                userType !== "SuperAdmin" &&
                userType !== "HR" &&
                leaveData.managerStatus !== "Approved" && (
                  <>
                    <button
                      className="bg-[#FEF116] p-2 px-3 rounded text-dark_grey text_size_6"
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                    <button
                      className="border border-grey p-2 px-5 rounded text-dark_grey text_size_6"
                      onClick={handleReject}
                    >
                      Reject
                    </button>
                  </>
                )} */}
              </div>
            </section>
          )}

          {source === "Tickets" && (
            <section className="shadow-md w-[500px] px-5 bg-white">
              <div className="text_size_6">
                <div className="mb-5 ">
                  <p className="text-center text-[24px] font-semibold">
                    {ticketData.hrStatus === "Pending"
                      ? "Request Tickets"
                      : ticketData.hrStatus}
                  </p>
                </div>

                {[
                  { label: "Name", value: ticketData.empName },
                  {
                    label: "Badge Number",
                    value: ticketData.empBadgeNo || "N/A",
                  },

                  {
                    label: "Department",
                    value: ticketData.department || "N/A",
                  },
                  {
                    label: "Position",
                    value: ticketData.position || "N/A",
                  },
                  {
                    label: "Date of Join",
                    value: formatDate(ticketData.doj) || "N/A",
                  },
                  {
                    label: "Destination",
                    value: ticketData.destination,
                  },
                  {
                    label: "Departure Date",
                    value: formatDate(ticketData.departureDate),
                  },
                  {
                    label: "Arrival Date",
                    value: formatDate(ticketData.arrivalDate),
                  },
                  {
                    label: "Reason",
                    value: ticketData.remarks || "N/A",
                  },
                  ticketData.hrRemark && {
                    label: "Remark",
                    value: ticketData.hrRemark || "No remarks added",
                  },
                ]
                  .filter(Boolean)
                  .map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">{item.label}</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.value}
                      </span>
                    </div>
                  ))}

                {ticketData.hrStatus === "Pending" &&
                  userType !== "SuperAdmin" && (
                    <div className="grid grid-rows-2 pt-1">
                      <label htmlFor="remark">Remark :</label>
                      <input
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-grey w-full h-9 outline-none pl-2"
                      />
                    </div>
                  )}
              </div>

              <div className="flex justify-between p-5 ">
                {ticketData.hrStatus === "Pending" && userType === "HR" && (
                  <>
                    <button
                      className="bg-[#FEF116] p-2 px-3 rounded text-dark_grey text_size_6"
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                    <button
                      className="border border-grey p-2 px-5 rounded text-dark_grey text_size_6"
                      onClick={handleReject}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </section>
          )}
        </header>
      </div>
    </main>
  );
};
