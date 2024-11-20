import React, { useState, useEffect, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import { DataSupply } from "../../utils/DataStoredContext";
import { SpinLogo } from "../../utils/SpinLogo";


export const ViewForm = ({ handleClickForToggle, leaveData, ticketData, source, userType, personalInfo,formatDate }) => {
  const [remark, setRemark] = useState("");
  const [userName, setUserName] = useState("");
  const [notification, setNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const navigate = useNavigate();
  const { handleUpdateLeaveStatus, handleUpdateTicketRequest } = useLeaveManage();
  const {userData} = useContext(DataSupply);

  const handleUpdateStatus = (status) => {
    const updateData = {};
    const userType = localStorage.getItem("userType"); 
    const currentDate = new Date().toISOString();

    console.log("updateData:", leaveData);

    if (userType === "Manager") {
      updateData.managerStatus = status;
      updateData.managerRemarks = remark;
      updateData.managerDate = currentDate;
      updateData.managerName = personalInfo.name;
    } else if (userType === "Supervisior") {
      updateData.supervisorStatus = status;
      updateData.supervisorRemarks = remark;
      updateData.supervisorDate = currentDate;
      updateData.supervisorName = personalInfo.name;
    }

    if (source === "LM") {
      handleUpdateLeaveStatus(leaveData.id, updateData);
      console.log(
        `Status: Leave ${status} by ${personalInfo.name} (${userType} on ${currentDate})`
      );
      setNotificationText(`Leave ${status} by ${personalInfo.name} on ${currentDate}`);
    } else if (source === "Tickets") {
      updateData.hrStatus = status;  // Set the status for the ticket request
      updateData.hrRemarks = remark;
      updateData.hrDate = currentDate;

      handleUpdateTicketRequest(ticketData.id, updateData);
      console.log(`Ticket request ${status} by ${personalInfo.name} (${userType} on ${currentDate})`);
      setNotificationText(`Ticket request ${status} by ${personalInfo.name} on ${currentDate}`);
    }
    setNotification(true);

    // Hide notification and redirect after 3 seconds
    setTimeout(() => {
      setNotification(false);
      navigate("/dashboard"); // Redirect to the dashboard or another page
    }, 3000);
  };

  const handleApprove = () => handleUpdateStatus("Approved");
  const handleReject = () => handleUpdateStatus("Rejected");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserName(userType);
    console.log(`UserType: '${userType}'`);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-[#0CB100]";
      case "Rejected":
        return "bg-[#C50000]";
      case "Pending":
        return "bg-yellow-400";
      default:
        return "";
    }
  };
  console.log("userData",userData)

  return (
    <main className="flex flex-col items-center justify-center inset-0 z-50 fixed">
      <header className="w-[500px] mt-5 ">
        <div className="flex justify-between bg-[#C6C6C6] py-1">
          <p></p>
          <p className="text-dark_grey text-[24px] font-medium">View Form</p>
          <RxCross2
            className="text-2xl mt-2 mr-4 cursor-pointer"
            onClick={handleClickForToggle}
          />
        </div>
      </header>
      {notification && (
        <SpinLogo
          text={notificationText}
          notification={notification}
          path="/dashboard"
        />
      )}
      
      {source === "LM" && (
        <section className="shadow-md w-[500px] px-5 bg-white">
          <div className="p-5 text_size_6 ">
            <div className="py-2 mb-2">
              <p className={`text-center text-[24px] font-semibold`}>
                {`Manager  :${leaveData.managerStatus + `Supervisor   :${leaveData.supervisorStatus}`}`}
              </p>
            </div>
            <div className="grid grid-cols-2 ">
              <p>Name</p>
              <p>{leaveData.employeeInfo.name}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Job Title</p>
              <p>{leaveData.jobTitle || "N/A"}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Badge</p>
              <p>{leaveData.employeeInfo.empBadgeNo}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Dept/Dev</p>
              <p>{leaveData.deptDev || "N/A"}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Select Date</p>
              <p>{leaveData.selectDate || "N/A"}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Leave Type</p>
              <p>{leaveData.leaveType}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Apply to</p>
              <p>
                {formatDate(leaveData.fromDate)} to {formatDate(leaveData.toDate)}
              </p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>No of days</p>
              <p>{leaveData.days}</p>
            </div>
            {leaveData.remark && (
              <div className="grid grid-cols-2 py-6 ">
                <p>Comments:</p>
                <p className="text-start text-[16px] font-medium border border-gray-400 w-[186px] h-[51px] ">
                  {leaveData.remark || "No remarks added"}
                </p>
              </div>
            )}

            {(leaveData.managerStatus === "Pending" || leaveData.supervisorStatus === "Pending") && userType !== "SuperAdmin" && userType !== "HR" && (
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
          
          <div className="flex justify-between px-5 pb-10">
            {(leaveData.managerStatus === "Pending" || leaveData.supervisorStatus === "Pending") && userType !== "SuperAdmin" && userType !== "HR" && (
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
          <div className="p-5 text_size_6 ">
            <div className="py-2 mb-2">
              <p className={`text-center text-[24px] font-semibold`}>
                {ticketData.hrStatus === "Pending"
                  ? "Request Tickets"
                  : ticketData.hrStatus}
              </p>
            </div>
            <div className="grid grid-cols-2 ">
              <p>Name</p>
              <p>{ticketData.employeeInfo.name}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Batch Number</p>
              <p>{ticketData.employeeInfo.empBadgeNo || "Web Developer"}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Department</p>
              <p>{ticketData.workInfo.department || "N/a"}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Position</p>
              <p>{ticketData.workInfo.position || "N/A"}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Date Join</p>
              <p>{formatDate(ticketData.workInfo.doj) || "Testing"}</p> 
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Departure Date</p>
              <p>{formatDate(ticketData.departureDate)}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Arrival date</p>
              <p>{formatDate(ticketData.arrivalDate)}</p>
            </div>
            <div className="grid grid-cols-2 pt-1">
              <p>Reason</p>
              <p>{ticketData.remarks}</p>
            </div>
            {ticketData.hrRemark && (
              <div className="grid grid-cols-2 pt-1">
                <p>Remark</p>
                <p>{ticketData.hrRemark || "No remarks added"}</p>
              </div>
            )}

            {ticketData.hrStatus === "Pending" && userType !== "SuperAdmin" && (
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
                   
          <div className="flex justify-between px-5 pb-10">
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
    </main>
  );
};
