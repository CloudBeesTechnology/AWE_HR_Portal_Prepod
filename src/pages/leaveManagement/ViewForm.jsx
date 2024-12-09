import React, { useState, useEffect, useContext } from "react";
import AweLogo from "../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import { SpinLogo } from "../../utils/SpinLogo";
import { useCreateNotification } from "../../hooks/useCreateNotification"; // Importing the custom hook
import {UpdateLeaveData} from "../../services/updateMethod/UpdateLeaveData"
import { useEmpLeaveDetails } from "../../hooks/useEmpLeaveDetails";

export const ViewForm = ({
  handleClickForToggle,
  leaveData,
  ticketData,
  source,
  userType,
  personalInfo,
  formatDate,
  
}) => {
  const [remark, setRemark] = useState("");
  const [userName, setUserName] = useState("");
  const [notification, setNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const navigate = useNavigate();
  const { handleUpdateLeaveStatus, handleUpdateTicketRequest } = useLeaveManage();
  const { createNotification } = useCreateNotification(); // Hook for creating notification
  const { leaveDetails } = UpdateLeaveData();
  const {empLeaveDetails} = useEmpLeaveDetails()


  // console.log("Leave Leave",empLeaveDetails)

  const handleUpdateStatus = async (status) => {
    const updateData = {};
    const userType = localStorage.getItem("userType");
    const currentDate = new Date().toISOString();

    if (userType === "Manager") {
      updateData.managerStatus = status;
      updateData.managerRemarks = remark;
      updateData.managerDate = currentDate;
      updateData.managerName = personalInfo.name;
    } else if (userType === "Supervisor") {
      updateData.supervisorStatus = status;
      updateData.supervisorRemarks = remark;
      updateData.supervisorDate = currentDate;
      updateData.supervisorName = personalInfo.name;
    }

    // Handle Leave status update
    if (source === "LM") {
      handleUpdateLeaveStatus(leaveData.id, updateData);
      console.log(`
        Status: Leave ${status} by ${
        personalInfo.name
      } (${userType} on ${formatDate(currentDate)})
      `);
      setNotificationText(
        `Leave ${status} by ${personalInfo.name} on ${formatDate(currentDate)}`
      );

      sendEmail(
        `Leave Request ${status}`,
        `Leave request for ${leaveData.employeeInfo.name} has been ${status} by ${personalInfo.name}`,
        leaveData.employeeInfo.officialEmail
      );

      // Create notification for the leave status update
      if (userType === "Manager") {
        createNotification({
          empID: leaveData.employeeInfo.empID,
          leaveType: leaveData.leaveType,
          message: `Leave request for ${leaveData.employeeInfo.name} has been ${status} by ${personalInfo.name}`,
          senderEmail: "leave_no-reply@adininworks.com", // Sender email
          receipentEmail: leaveData.employeeInfo.officialEmail, // Using the employee's official email
          receipentEmpID: leaveData.employeeInfo.empID,
          status: status,
          createdAt: currentDate,
          updatedAt: currentDate,
        });
      }

      if (source === "LM") {
        if (userType === "Manager") {
          // Calculate remaining leave based on leave type
          let remainingLeaveUpdate = {};
      
          // Subtract leave days from the corresponding leave type total
          if (leaveData.leaveType === "Hospitalisation Leave") {
            remainingLeaveUpdate.remainingHosLeave = leaveData.leaveDetails.remainingHosLeave - leaveData.days;
          } else if (leaveData.leaveType === "Annual Leave") {
            remainingLeaveUpdate.remainingAnualLeave = leaveData.leaveDetails.remainingAnualLeave - leaveData.days;
          } else if (leaveData.leaveType === "Sick Leave") {
            remainingLeaveUpdate.remainingSickLeave = leaveData.leaveDetails.remainingSickLeave - leaveData.days;
          } else if (leaveData.leaveType === "Marriage Leave") {
            remainingLeaveUpdate.remainingMrageLeave = leaveData.leaveDetails.remainingMrageLeave - leaveData.days;
          } else if (leaveData.leaveType === "Compassionate Leave") {
            remainingLeaveUpdate.remainingCompasLeave = leaveData.leaveDetails.remainingCompasLeave - leaveData.days;
          } else if (leaveData.leaveType === "Paternity Leave") {
            remainingLeaveUpdate.remainingPaternityLeave = leaveData.leaveDetails.remainingPaternityLeave - leaveData.days;
          } else if (leaveData.leaveType === "Maternity Leave") {
            remainingLeaveUpdate.remainingMateLeave = leaveData.leaveDetails.remainingMateLeave - leaveData.days;
          } else if (leaveData.leaveType === "Compensate Leave") {
            // Setting compensate leave to 0 based on given condition
            remainingLeaveUpdate.remainingCompasLeave = 0;
          }
      
          // Update remaining leave details
          console.log('Remaining Leave Update:', remainingLeaveUpdate);
          
          const LeaveValue = {
            id: leaveData.leaveDetails.id,
            ...remainingLeaveUpdate
          }
      
          // Call the function to update the leave data
          await leaveDetails({ LeaveValue });
          console.log(LeaveValue, "LeaveRecords");
        }
      }
    

    //   if (source === "LM") {
    //     if (userType === "Manager") {
    //       // Calculate remaining leave based on leave type
    //       let remainingLeaveUpdate = {};
    
    //       if (leaveData.leaveType === "Hospitalisation Leave") {
    //         remainingLeaveUpdate.remainingHosLeave = leaveData.leaveDetails.hospLeave - leaveData.days;
    //       } else if (leaveData.leaveType === "Annual Leave") {
    //         remainingLeaveUpdate.remainingAnualLeave = leaveData.leaveDetails.annualLeave - leaveData.days;
    //       } else if (leaveData.leaveType === "Sick Leave") {
    //         remainingLeaveUpdate.remainingSickLeave = leaveData.leaveDetails.sickLeave - leaveData.days;
    //       } else if (leaveData.leaveType === "Marriage Leave") {
    //         remainingLeaveUpdate.remainingMrageLeave = leaveData.leaveDetails.mrageLeave - leaveData.days;
    //       } else if (leaveData.leaveType === "Compassionate Leave") {
    //         remainingLeaveUpdate.remainingCompasLeave = leaveData.leaveDetails.compasLeave - leaveData.days;
    //       } else if (leaveData.leaveType === "Paternity Leave") {
    //         remainingLeaveUpdate.remainingPaternityLeave = leaveData.leaveDetails.paterLeave - leaveData.days;
    //       } else if (leaveData.leaveType === "Maternity Leave") {
    //         remainingLeaveUpdate.remainingMateLeave = leaveData.leaveDetails.materLeave - leaveData.days;
    //       } else if (leaveData.leaveType === "Compensate Leave") {
    //         remainingLeaveUpdate.remainingCompasLeave = 0; // Setting it to 0 based on the given condition
    //       }
    
    //       // Update remaining leave details
    //       console.log('Remaining Leave Update:', remainingLeaveUpdate);
    //       const LeaveValue = {
    //         id:leaveData.leaveDetails.id,
    //          ...remainingLeaveUpdate,

    //       }
    //       await leaveDetails({LeaveValue});
    //       console.log(LeaveValue, "LeaveRecords")
    //   }
    // }
      
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
        handleClickForToggle(false);
        navigate("/leaveManage")
        // Redirect to the dashboard or another page
      }, 3000);
      
    } else if (source === "Tickets") {
      updateData.hrStatus = status; // Set the status for the ticket request
      updateData.hrRemarks = remark;
      updateData.hrDate = currentDate;

      handleUpdateTicketRequest(ticketData.id, updateData);
      console.log(
        `Ticket request ${status} by ${
          personalInfo.name
        } (${userType} on ${formatDate(currentDate)})`
      );
      setNotificationText(
        `Ticket request ${status} by ${personalInfo.name} on ${formatDate(
          currentDate
        )}`
      );

      sendEmail(
        `Ticket Request ${status}`,
        `Ticket request for ${ticketData.employeeInfo.name} has been ${status} by ${personalInfo.name}`,
        ticketData.employeeInfo.officialEmail
      );

      // Create notification for the ticket status update
      createNotification({
        empID: ticketData.employeeInfo.empID,
        leaveType: "Ticket Request", // Assuming a default value as this is a ticket request
        message: `Ticket request for ${ticketData.employeeInfo.name} has been ${status} by ${personalInfo.name}`,
        senderEmail: "ticket_no-reply@adininworks.com", // Sender email
        receipentEmail: ticketData.employeeInfo.officialEmail, // Using the employee's official email
        receipentEmpID: ticketData.employeeInfo.empID,
        status: status,
        createdAt: currentDate,
        updatedAt: currentDate,
      });

      setNotification(true);
      setTimeout(() => {
        setNotification(false);
        handleClickForToggle(false)
        navigate("/leaveManage")
        // Redirect to the dashboard or another page
      }, 3000);
    }
  };

  const sendEmail = async (subject, message, toaddress) => {
    try {
      const response = await fetch(
        "https://j1wcrd0160.execute-api.ap-southeast-1.amazonaws.com/adinin-send-mail-stage/sendemail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
          },
          body: JSON.stringify({
            subject,
            message,
            fromid: "hr_no-reply@adininworks.com",
            toaddress,
          }),

          //  mode: 'no-cors'
        }
      );
      console.log(response, "Response");

      try {
        const data = await response.json();
        console.log("Email Response:", data);
        if (data.message === "Email sent successfully") {
          console.log("Email sent successfully");
        }
      } catch (e) {
        console.log("log", e);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleApprove = () => handleUpdateStatus("Approved");
  const handleReject = () => handleUpdateStatus("Rejected");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserName(userType);
  }, []);

  // const getStatusClass = (status) => {
  //   switch (status) {
  //     case "Approved":
  //       return "bg-[#0CB100]";
  //     case "Rejected":
  //       return "bg-[#C50000]";
  //     case "Pending":
  //       return "bg-yellow-400";
  //     default:
  //       return "bg-transparent";
  //   }
  // };

  return (
    <main className="flex flex-col items-center justify-center bg-grey bg-opacity-75 inset-0 z-50 fixed">
      <header className="bg-white w-full max-w-[600px] rounded-lg relative p-10 overflow-y-auto">
        <button
          onClick={handleClickForToggle}
          className="absolute top-5 right-6 border rounded-full p-1"
        >
          <VscClose size={20} />
        </button>

        <div className=" justify-items-center gap-4">
          <img src={AweLogo} alt="Logo" className="max-w-[180px] w-full" />
          <h2 className="text-xl mt-2 font-bold underline">
            {source === "LM" && "Leave Application Form" || source === "Tickets" && "Ticket Request Form"}
          </h2>
        </div>
        {notification && (
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
                { label: "Name", value: leaveData.employeeInfo.name },
                { label: "Badge No", value: leaveData.employeeInfo.empBadgeNo },
                {
                  label: "Job Title", 
                  value: Array.isArray(leaveData.workInfo.position) ? leaveData.workInfo.position[leaveData.workInfo.position.length - 1] : leaveData.workInfo.position || "N/A"
                },
                {
                  label: "Department", 
                  value: Array.isArray(leaveData.workInfo.department) ? leaveData.workInfo.department[leaveData.workInfo.department.length - 1] : leaveData.workInfo.department || "N/A"
                },
                { label: "Leave Type", value: leaveData.leaveType },
                {
                  label: "Applied Dates",
                  value: ` ${formatDate(leaveData.fromDate)} to ${formatDate(
                    leaveData.toDate
                  )} `,
                },
                { label: "Total No of Days", value: leaveData.days },
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
                  <p className="text-start text-[16px] font-medium border border-gray-400 w-[186px] h-[51px]">
                    {leaveData.remark || "No remarks added"}
                  </p>
                </div>
              )}
              <div className="mt-5 text-xl flex justify-between gap-10 font-semibold">
                <p className="">
                  {`Supervisor: ${leaveData.supervisorStatus}`}
                </p>
                <p className="">{`Manager:   ${leaveData.managerStatus}`}</p>
              </div>
              {/* Add Remark Input */}
              {(leaveData.managerStatus === "Pending" ||
                leaveData.supervisorStatus === "Pending") &&
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
              {(leaveData.managerStatus === "Pending"||
                leaveData.supervisorStatus === "Pending") &&
                userType !== "SuperAdmin" &&
                userType !== "HR" && (
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

        {source === "Tickets" && (
          <section className="shadow-md w-[500px] px-5 bg-white">
            <div className="text_size_6">
              <div className="mb-5 ">
                {/* <p className="text-center text-[24px] font-semibold">
                  {ticketData.hrStatus === "Pending"
                    ? "Request Tickets"
                    : ticketData.hrStatus}
                </p> */}
              </div>

              {[
                { label: "Name", value: ticketData.employeeInfo.name },
                {
                  label: "Badge Number",
                  value: ticketData.employeeInfo.empBadgeNo || "N/A",
                },
                {
                  label: "Department",
                  value: Array.isArray(ticketData.workInfo.department) 
                    ? ticketData.workInfo.department[ticketData.workInfo.department.length - 1] 
                    : ticketData.workInfo.department || "N/A",
                },
                {
                  label: "Position",
                  value: Array.isArray(ticketData.workInfo.position) 
                    ? ticketData.workInfo.position[ticketData.workInfo.position.length - 1] 
                    : ticketData.workInfo.position || "N/A",
                },
                {
                  label: "Date of Join",
                  value: formatDate(ticketData.workInfo.doj) || "N/A",
                },
                {
                  label: "Departure Date",
                  value: formatDate(ticketData.departureDate),
                },
                {
                  label: "Arrival Date",
                  value: formatDate(ticketData.arrivalDate),
                },
                { label: "Reason", value: ticketData.remarks || "N/A" },
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

            <div className="flex justify-between px-5 mt-12">
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
    </main>
  );
};
