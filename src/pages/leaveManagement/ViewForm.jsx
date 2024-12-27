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
  // console.log(leaveData.empOfficialEmail);

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
    const findingManagerName = leaveData?.managerEmpID === val.empID;
    return findingManagerName;
  });
  const supervisorName = empPIData.find((val) => {
    const findingSupervisorName = leaveData?.supervisorEmpID === val.empID;
    return findingSupervisorName;
  });

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[#339933]"
      : status === "Pending"
      ? "text-[#E8A317]"
      : "text-[#E8A317]";
  };

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

      handleUpdateLeaveStatus(leaveData.id, updateData)
        .then(() => {
          setNotificationText(
            `Leave ${status} by ${personalInfo.name} on ${formatDate(
              currentDate
            )}`
          );

          if (
            userType === "Manager" &&
            (leaveData.supervisorEmpID == null ||
              leaveData.supervisorEmpID === "") &&
            (status === "Approved" || status === "Rejected")
          ) {
            console.log("checking manager");
            //employee got email
            sendEmail(
              `Leave Request ${status}`,
              `Dear ${
                leaveData.empName || "Not mention"
              }, Leave request for From Date : ${formattedDateFrom} To Date : ${formattedDateTo} has been Status: ${status} by Manager Name : ${
                managerName.name || "Not mention"
              }. View at : https://hr.adininworks.co `,
              "leave_no-reply@adininworks.com",
              leaveData.empOfficialEmail
            );

            //hr got email
            sendEmail(
              `Leave Request ${status}`,
              `Employee ${
                leaveData.empName || "Not mention"
              }, Leave request for From Date : ${formattedDateFrom} To Date : ${formattedDateTo} has been Status: ${status} by Manager Name : ${
                managerName.name || "Not mention"
              }. View at : https://hr.adininworks.co `,
              "leave_no-reply@adininworks.com",
              "hr_no-reply@adininworks.com"
            );

            //employee notify
            createNotification({
              empID: leaveData.empID,
              leaveType: leaveData.empLeaveType,
              message: `Leave request for ${leaveData.empName} has been ${status} by Manager ${managerName.name}`,
              senderEmail: "leave_no-reply@adininworks.com", // Sender email
              receipentEmail: leaveData.empOfficialEmail, // Using the employee's official email
              receipentEmpID: leaveData.empID,
              status: "Unread",
            });

            //hr notify
            createNotification({
              empID: leaveData.empID,
              leaveType: leaveData.empLeaveType,
              message: `Leave request for ${leaveData.empName} has been ${status} by Manager ${managerName.name}`,
              senderEmail: "leave_no-reply@adininworks.com", // Sender email
              receipentEmail: "hr_no-reply@adininworks.com", // Using the employee's official email
              status: "Unread",
            });
          } else if (
            userType === "Supervisor" &&
            leaveData.supervisorEmpID &&
            leaveData?.managerStatus === "Pending" &&
            (status === "Approved" || status === "Rejected")
          ) {
            const FindingEmail = empPIData.filter((manage) => {
              const IdFinding =
                leaveData?.managerEmpID.toLowerCase() ===
                manage.empID.toLowerCase();

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

              "leave_no-reply@adininworks.com",
              FindingEmail[0].officialEmail
            );

            //hr got email
            sendEmail(
              `Leave Request ${status}`,
              `Employee ${leaveData.empName || "Not mention"} , 
           applied leave request for the period ${formattedDateFrom} to ${formattedDateTo} has been ${status} by Supervisor ${
                supervisorName.name || "Not mention"
              }. View at : https://hr.adininworks.co `,

              "leave_no-reply@adininworks.com",

              "hr_no-reply@adininworks.com"
            );

            //manager notify
            createNotification({
              empID: leaveData.empID,
              leaveType: leaveData.empLeaveType,
              message: `Leave request for ${leaveData.empName} has been ${status} by Supervisor ${supervisorName.name}`,
              senderEmail: "leave_no-reply@adininworks.com", // Sender email
              receipentEmail: FindingEmail[0].officialEmail, // Using the employee's official email
              receipentEmpID: leaveData.managerEmpID,
              status: "Unread",
            });

            //hr notify
            createNotification({
              empID: leaveData.empID,
              leaveType: leaveData.empLeaveType,
              message: `Leave request for ${leaveData.empName} has been ${status} by Supervisor ${supervisorName.name}`,
              senderEmail: "leave_no-reply@adininworks.com", // Sender email
              receipentEmail: "hr_no-reply@adininworks.com", // Using the employee's official email
              status: "Unread",
            });

            if (status === "Rejected") {
              sendEmail(
                `Leave Request ${status}`,
                `Dear ${leaveData.empName || "Not mention"} , 
             leave request for the period ${formattedDateFrom} to ${formattedDateTo} has been ${status} by Supervisor ${
                  supervisorName.name || "Not mention"
                }. View at : https://hr.adininworks.co `,

                "leave_no-reply@adininworks.com",
                leaveData.empOfficialEmail
              );
              createNotification({
                empID: leaveData.empID,
                leaveType: leaveData.empLeaveType,
                message: `Leave request for ${leaveData.empName} has been ${status} by Supervisor ${supervisorName.name}`,
                senderEmail: "leave_no-reply@adininworks.com", // Sender email
                receipentEmail: leaveData.empOfficialEmail, // Using the employee's official email
                receipentEmpID: leaveData.empID,
                status: "Unread",
              });
            }
          } else if (
            userType === "Manager" &&
            leaveData.managerEmpID &&
            leaveData.supervisorStatus === "Approved" &&
            (status === "Approved" || status === "Rejected")
          ) {
            const FindingEmail = empPIData.filter((sup) => {
              const IdFinding =
                leaveData.supervisorEmpID.toLowerCase() ===
                sup.empID.toLowerCase();

              return IdFinding;
            });
            // console.log("2");

            //superviosr got email
            sendEmail(
              `Leave Request ${status}`,
              `Employee  ${
                leaveData.empName || "Not mention"
              } , applied leave request for the period ${formattedDateFrom} to ${formattedDateTo} has been ${status} by Manager ${
                managerName.name || "Not mention"
              }. View at : https://hr.adininworks.co `,
              "leave_no-reply@adininworks.com",
              FindingEmail[0].officialEmail
            );

            //Employee got email
            sendEmail(
              `Leave Request ${status}`,
              `Dear ${
                leaveData.empName || "Not mention"
              } , Your leave request for the period ${formattedDateFrom} to ${formattedDateTo} has been ${status} by Manager ${
                managerName.name || "Not mention"
              }  and Supervisor ${
                supervisorName.name || "Not mention"
              }. View at : https://hr.adininworks.co `,
              "leave_no-reply@adininworks.com",
              leaveData.empOfficialEmail
            );

            //hr send email
            sendEmail(
              `Leave Request ${status}`,
              `Employee ${
                leaveData.empName || "Not mention"
              } , Leave request for the period ${formattedDateFrom} to ${formattedDateTo} has been ${status} by Manager ${
                managerName.name || "Not mention"
              }  and Supervisor ${
                supervisorName.name || "Not mention"
              }. View at : https://hr.adininworks.co `,
              "leave_no-reply@adininworks.com",

              "hr_no-reply@adininworks.com"
            );

            // Create notification for Employeee
            createNotification({
              empID: leaveData.empID,
              leaveType: leaveData.empLeaveType,
              message: `Leave request for ${
                leaveData.empName
              } has been ${status} by Manager ${
                personalInfo.name || "Not mentioned"
              } and Supervisor ${supervisorName.name || "Not mention"}.`,
              senderEmail: "leave_no-reply@adininworks.com", // Sender email
              receipentEmail: leaveData.empOfficialEmail, // Using the employee's official email
              receipentEmpID: leaveData.empID,
              status: "Unread",
            });
            // Create notification for Supervisor
            createNotification({
              empID: leaveData.empID,
              leaveType: leaveData.empLeaveType,
              message: `Leave request for ${
                leaveData.empName
              } has been ${status} by Manager ${
                managerName.name || "Not mentioned"
              }.`,
              senderEmail: "leave_no-reply@adininworks.com", // Sender email
              receipentEmail: FindingEmail[0].officialEmail, // Using the supervisor official email
              receipentEmpID: leaveData.supervisorEmpID,
              status: "Unread",
            });
            // Create notification for HR
            createNotification({
              empID: leaveData.empID,
              leaveType: leaveData.empLeaveType,
              message: `Leave request for ${
                leaveData.empName
              } has been ${status} by Manager ${
                managerName.name || "Not mentioned"
              }.`,
              senderEmail: "leave_no-reply@adininworks.com", // Sender email
              receipentEmail: "hr_no-reply@adininworks.com", // Using the employee's official email
              status: "Unread",
            });
          }

          setNotification(true);
          setTimeout(() => {
            setNotification(false);
            handleClickForToggle(false);
            navigate("/leaveManage");
            // Redirect to the dashboard or another page
          }, 3000);
        })
        .catch((err) => console.log(err));
    } else if (source === "Tickets") {
      updateData.hrStatus = status; // Set the status for the ticket request
      updateData.hrRemarks = remark;
      updateData.hrDate = currentDate;
      const formattedDatedeparture = formatDate(ticketData.departureDate);
      const formattedDatearrival = formatDate(ticketData.arrivalDate);

      handleUpdateTicketRequest(ticketData.id, updateData)
        .then(() => {
          setNotificationText(
            `Ticket request ${status} by ${personalInfo.name} on ${formatDate(
              currentDate
            )}`
          );
          const managerEmpID =
            ticketData.managerEmpID[ticketData.managerEmpID.length - 1];

          const findingManagerEmail = empPIData.find(
            (val) => val.empID === managerEmpID
          );
          // console.log(findingManagerEmail.officialEmail);

          // //employee send email
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

          //manager send email
          sendEmail(
            `Ticket Request ${status}`,
            `Employee  ${
              ticketData.empName || "Not mention"
            } , Applied ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${status} by HR ${
              personalInfo.name || "Not mention"
            }. View at : https://hr.adininworks.co `,
            "hr_no-reply@adininworks.com",
            findingManagerEmail.officialEmail
          );

          // Create notification for the ticket status update employee
          createNotification({
            empID: ticketData.empID,
            leaveType: "Ticket Request", // Assuming a default value as this is a ticket request
            message: `Ticket request for ${ticketData.empName} has been ${status} by HR ${personalInfo.name}`,
            senderEmail: "ticket_no-reply@adininworks.com", // Sender email
            receipentEmail: ticketData.empOfficialEmail, // Using the employee's official email
            receipentEmpID: ticketData.empID,
            status: "Unread",
          });

          // Create notification for the ticket status update manager
          createNotification({
            empID: ticketData.empID,
            leaveType: "Ticket Request", // Assuming a default value as this is a ticket request
            message: `Ticket request for ${ticketData.empName} has been ${status} by HR ${personalInfo.name}`,
            senderEmail: "ticket_no-reply@adininworks.com", // Sender email
            receipentEmail: findingManagerEmail.officialEmail, // Using the employee's official email
            receipentEmpID: ticketData.empID,
            status: "Unread",
          });

          setNotification(true);
          setTimeout(() => {
            setNotification(false);
            handleClickForToggle(false);
            navigate("/leaveManage/requestTickets");
            // Redirect to the dashboard or another page
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  };

  // console.log(leaveData, "LD");

  const handleApprove = () => handleUpdateStatus("Approved");
  const handleReject = () => handleUpdateStatus("Rejected");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserName(userType);
  }, []);
  const renderButtons = () => {
    const { supervisorStatus, managerStatus, supervisorEmpID } = leaveData;
    const isPending = managerStatus === "Pending";
    const isApproved = supervisorStatus === "Approved";
    const isSupervisor = userType === "Supervisor";
    const isNotSuperAdminOrHR = userType !== "SuperAdmin" && userType !== "HR";

    // Case 1: Supervisor approved, Manager pending, Supervisor not SuperAdmin/HR
    if (
      isApproved &&
      supervisorStatus !== "Rejected" &&
      isPending &&
      isSupervisor &&
      isNotSuperAdminOrHR
    ) {
      return (
        <div className="flex justify-evenly items-center w-full">
          <button
            className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      );
    }

    // Case 2: Supervisor pending, Supervisor EmpID available, and User not SuperAdmin/HR
    if (
      supervisorStatus === "Pending" &&
      supervisorEmpID &&
      isNotSuperAdminOrHR
    ) {
      return (
        <>
          <button
            className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleApprove}
          >
            Approve
          </button>
        </>
      );
    }

    // Case 3: Supervisor approved, Manager pending, User not SuperAdmin/HR
    if (isApproved && isPending && isNotSuperAdminOrHR) {
      return (
        <>
          <button
            className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleApprove}
          >
            Approve
          </button>
        </>
      );
    }

    // Case 4: Supervisor EmpID missing, Manager pending, User not SuperAdmin/HR
    if (
      isPending &&
      (supervisorEmpID === " " || supervisorEmpID === null) &&
      isNotSuperAdminOrHR
    ) {
      return (
        <>
          <button
            className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleApprove}
          >
            Approve
          </button>
        </>
      );
    }

    // Case 5: Supervisor and Manager both approved, User not SuperAdmin/HR
    if (managerStatus === "Approved" && isApproved && isNotSuperAdminOrHR) {
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
          {notification &&
            (userType === "Manager" || userType === "Supervisor") && (
              <SpinLogo
                text={notificationText}
                notification={notification}
                path="/leaveManage"
              />
            )}

          {source === "LM" && (
            <section className="shadow-md w-[500px] p-5 bg-white">
              <div className="">
                {[
                  { label: "Name", value: leaveData.empName || "" },
                  {
                    label: "Badge No",
                    value: leaveData.empBadgeNo,
                  },
                  {
                    label: "Job Title",
                    value:
                      Array.isArray(leaveData.position) &&
                      leaveData.position.length > 0
                        ? leaveData.position[leaveData.position.length - 1]
                        : "N/A",
                  },
                  {
                    label: "Department",
                    value:
                      Array.isArray(leaveData.department) &&
                      leaveData.department.length > 0
                        ? leaveData.department[leaveData.department.length - 1]
                        : "N/A",
                  },
                  { label: "Leave Type", value: leaveData.empLeaveType },
                  {
                    label: "Applied Dates",
                    value: ` ${formatDate(
                      leaveData.empLeaveStartDate
                    )} to ${formatDate(leaveData.empLeaveEndDate)} `,
                  },
                  { label: "Total No of Days", value: leaveData.leaveDays },
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

                {/* Add Remark Input */}
                {leaveData.managerStatus === "Pending" &&
                  leaveData.supervisorStatus === "Pending" &&
                  userType !== "SuperAdmin" &&
                  userType !== "HR" && (
                    <div className="grid grid-cols-[150px_auto_1fr] gap-2 items-center pt-1">
                      <label className="font-semibold" htmlFor="remark">
                        Remark
                      </label>
                      <span className="text-center">:</span>
                      <input
                        id="remark"
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-lite_grey h-9 outline-none pl-2"
                      />
                    </div>
                  )}
                {leaveData.managerStatus === "Pending" &&
                  leaveData.supervisorStatus !== "Pending" &&
                  userType === "Manager" &&
                  userType !== "SuperAdmin" &&
                  userType !== "HR" && (
                    <div className="grid grid-cols-[150px_auto_1fr] gap-2 items-center pt-1">
                      <label className="font-semibold" htmlFor="remark">
                        Remark
                      </label>
                      <span className="text-center">:</span>
                      <input
                        id="remark"
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-lite_grey h-9 outline-none pl-2"
                      />
                    </div>
                  )}

                {/* Remarks Section */}
                {leaveData.remark && (
                  <div className="grid grid-cols-2 py-6">
                    <p>Comments:</p>
                    <p className="text-start text-[16px] font-medium border border-grey w-full break-words overflow-hidden h-[51px]">
                      {leaveData.empRemarks || "No remarks"}
                    </p>
                  </div>
                )}
                {userType === "SuperAdmin" || userType === "HR" ? (
                  <div className="font-medium p-4">
                    <table className="w-full border-collapse">
                      <thead className="bg-gradient-to-r from-[#f5ee6ad7] via-[#faf362] to-[#f5ee6ad7] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
                        <tr className="">
                          <th className="text-center p-1.5 text-[#615d5d] font-bold rounded-tl-lg shadow-lg">
                            Role
                          </th>
                          <th className="text-center p-1.5 text-[#615d5d] font-bold shadow-md">
                            Status
                          </th>
                          <th className="text-center p-1.5 text-[#615d5d] font-bold rounded-tr-lg shadow-lg">
                            Remarks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {leaveData.supervisorEmpID && (
                        <tr className="border-b border-lite_grey">
                          <td className="p-2 text-center font-semibold">
                            Supervisor
                          </td>
                          <td
                            className={`text-center font-bold p-2 ${getStatusClass(
                              leaveData.supervisorStatus
                            )}`}
                          >
                            {leaveData.supervisorStatus}
                          </td>
                          <td className="p-2 break-words text-center text-grey">
                            {leaveData.supervisorRemarks || "No remarks"}
                          </td>
                        </tr>
                        )}
                        <tr className="border-b border-lite_grey">
                          <td className="p-2 text-center font-semibold">
                            Manager
                          </td>
                          <td
                            className={`text-center font-bold p-2 ${getStatusClass(
                              leaveData.managerStatus
                            )}`}
                          >
                            {leaveData.managerStatus}
                          </td>
                          <td className="p-2 break-words text-center text-grey">
                            {leaveData.managerRemarks || "No remarks"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : userType === "Supervisor" && leaveData.supervisorStatus !== "Pending" ? (
                  <table className="w-full mt-5 border-collapse">
                    <thead className="bg-gradient-to-r from-[#f5ee6ad7] via-[#faf362] to-[#f5ee6ad7] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
                      <tr>
                        <th className="text-center p-1.5 text-[#615d5d] font-bold rounded-tl-lg shadow-md">
                          Role
                        </th>
                        <th className="text-center p-1.5 text-[#615d5d] font-bold shadow-md">
                          Status
                        </th>
                        <th className="text-center p-1.5 text-[#615d5d] font-bold rounded-tr-lg shadow-md">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Supervisor Row */}
                      <tr className="border-b border-lite_grey">
                        <td className="p-2 text-center font-semibold">
                          Supervisor
                        </td>
                        <td
                          className={`text-center font-bold p-2 ${getStatusClass(
                            leaveData.supervisorStatus
                          )}`}
                        >
                          {leaveData.supervisorStatus}
                        </td>
                        <td className="p-2 break-words text-center text-grey">
                          {leaveData.supervisorStatus === "Approved"
                            ? leaveData.supervisorRemarks || "No remarks"
                            : ""}
                        </td>
                      </tr>

                      {/* Manager Row */}
                      <tr className="border-b border-lite_grey">
                        <td className="p-2 text-center font-semibold">
                          Manager
                        </td>
                        <td
                          className={`text-center font-bold p-2 ${getStatusClass(
                            leaveData.managerStatus
                          )}`}
                        >
                          {leaveData.managerStatus}
                        </td>
                        <td className="p-2 break-words text-center text-grey">
                          {leaveData.managerStatus === "Approved"
                            ? leaveData.managerRemarks || "No remarks"
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : userType === "Manager" ? (
                  <table className="w-full mt-5 border-collapse">
                    <thead className="bg-gradient-to-r from-[#f5ee6ad7] via-[#faf362] to-[#f5ee6ad7] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
                      <tr>
                        <th className="text-center p-1.5 text-[#615d5d] font-bold rounded-tl-lg shadow-md">
                          Role
                        </th>
                        <th className="text-center p-1.5 text-[#615d5d] font-bold shadow-md">
                          Status
                        </th>
                        <th className="text-center p-1.5 text-[#615d5d] font-bold rounded-tr-lg shadow-md">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Supervisor Row */}
                      {leaveData.supervisorEmpID && (
                        <tr className="border-b border-lite_grey">
                          <td className="p-2 text-center font-semibold">
                            Supervisor
                          </td>
                          <td
                            className={`text-center font-bold p-2 ${getStatusClass(
                              leaveData.supervisorStatus
                            )}`}
                          >
                            {leaveData.supervisorStatus}
                          </td>
                          <td className="p-2 break-words text-center text-grey">
                            {leaveData.supervisorRemarks || "No remarks"}
                          </td>
                        </tr>
                      )}

                      {/* Manager Row */}
                      {leaveData.managerStatus === "Approved" && (
                        <tr className="border-b border-lite_grey">
                          <td className="p-2 text-center font-semibold">
                            Manager
                          </td>
                          <td
                            className={`text-center font-bold p-2 ${getStatusClass(
                              leaveData.managerStatus
                            )}`}
                          >
                            {leaveData.managerStatus}
                          </td>
                          <td className="p-2 break-words text-center text-grey">
                            {leaveData.managerRemarks || "No remarks"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : (
                  ""
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
            <section className="shadow-md w-[500px] p-5 bg-white">
              <div className="text_size_6">
                {[
                  { label: "Name", value: ticketData.empName },
                  {
                    label: "Badge Number",
                    value: ticketData.empBadgeNo || "N/A",
                  },

                  {
                    label: "Department",
                    value:
                      Array.isArray(ticketData.department) &&
                      ticketData.department.length > 0
                        ? ticketData.department[
                            ticketData.department.length - 1
                          ]
                        : "N/A",
                  },
                  {
                    label: "Position",
                    value:
                      Array.isArray(ticketData.position) &&
                      ticketData.position.length > 0
                        ? ticketData.position[ticketData.position.length - 1]
                        : "N/A",
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
                    label: "Employee Remarks",
                    value: ticketData.empRemarks || "N/A",
                  },
                  // ticketData.hrRemark && {
                  //   label: "Remark",
                  //   value: ticketData.hrRemark || "No remarks added",
                  // },
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

                {(userType === "SuperAdmin" ||
                  (userType === "HR" && ticketData.hrStatus !== "Pending")) && (
                  <table className="w-full mt-5 border-collapse">
                    <thead className="bg-gradient-to-r from-[#f5ee6ad7] via-[#faf362] to-[#f5ee6ad7] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
                      <tr>
                        <th className="text-center p-1.5 text-[#615d5d] font-bold rounded-tl-lg shadow-md">
                          Role
                        </th>
                        <th className="text-center p-1.5 text-[#615d5d] font-bold shadow-md">
                          Status
                        </th>
                        <th className="text-center p-1.5 text-[#615d5d] font-bold rounded-tr-lg shadow-md">
                          Remark
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* HR Row */}
                      <tr className="border-b border-lite_grey">
                        <td className="p-2 text-center font-semibold">HR</td>
                        <td
                          className={`text-center font-bold p-2 ${getStatusClass(
                            ticketData.hrStatus
                          )}`}
                        >
                          {ticketData.hrStatus}
                        </td>
                        <td className="p-2 break-words text-center text-grey">
                          {ticketData.hrRemarks || "No remarks"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {ticketData.hrStatus === "Pending" &&
                  userType !== "SuperAdmin" && (
                    <div className="grid grid-cols-[150px_auto_1fr] gap-2 items-center pt-1">
                      <label className="font-semibold" htmlFor="remark">
                        Remark
                      </label>
                      <span className="text-center">:</span>
                      <input
                        id="remark"
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-lite_grey h-9 outline-none pl-2"
                      />
                    </div>
                  )}
                {/* <div className="mb-5 center gap-2">
                  <p className="font-semibold">Ticket Request Status :</p>
                  <p className="font-bold">
                    {ticketData.hrStatus === "Pending"
                      ? "Pending"
                      : ticketData.hrStatus}
                  </p>
                </div> */}
              </div>

              <div className="flex justify-between p-5 ">
                {ticketData.hrStatus === "Pending" && userType === "HR" && (
                  <>
                    <button
                      className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                      onClick={handleReject}
                    >
                      Reject
                    </button>
                    <button
                      className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                      onClick={handleApprove}
                    >
                      Approve
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
