import { useEffect, useState } from "react";
import { useLocation, Link, Outlet, Navigate } from "react-router-dom";
import { ViewForm } from "./ViewForm";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import useEmployeePersonalInfo from "../../hooks/useEmployeePersonalInfo";
import { DateFormat } from "../../utils/DateFormat";


export const LeaveManage = () => {
  const [source, setSource] = useState(null);
  const [toggleClick, setToggleClick] = useState(false);
  const [selectedLeaveData, setSelectedLeaveData] = useState(null);
  const [selectedTicketData, setSelectedTicketData] = useState(null);
  const [userType, setUserType] = useState("");
  const [userID, setUserID] = useState("");

  const {
    mergedData,
    handleDeleteLeaveStatus,
    handleUpdateLeaveStatus,
    ticketMerged,
    statusUpdate,
    loading
  } = useLeaveManage();

  // console.log(mergedData);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  const { personalInfo } = useEmployeePersonalInfo(userID);
// console.log(mergedData);
 
  const handleClickForToggle = () => {
    setToggleClick(!toggleClick);
  };

  const handleViewClick = (data, source) => {
    setSource(source);
    if (source === "LM") {
      setSelectedLeaveData(data); // Leave Data
      setSelectedTicketData(null); // Clear ticket data
    } else if (source === "Tickets") {
      // console.log(data);

      setSelectedTicketData(data); // Ticket Data
      setSelectedLeaveData(null); // Clear leave data
    }
    setToggleClick(true);
  };

  const handleUpdate = async (empID, newStatus, remark) => {
    try {
      await handleUpdateLeaveStatus(empID, { status: newStatus, remark }); // Use the hook's update function
      setSelectedLeaveData(null);
      setToggleClick(false);
      // console.log("Update successful for:", empID);
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

// console.log(data);

  return (
    <section className="py-20 px-10">
      <div className="screen-size">
   
        <section className="center w-full ">
          <Outlet
            context={{
              handleClickForToggle,
              ticketMerged,    
              handleViewClick,
              handleDeleteLeaveStatus,
              personalInfo,    
              userType,
              userID,
              statusUpdate,
              mergedData,
              loading
            }}
          />
        </section>

     
      </div>
      {toggleClick && (selectedLeaveData || selectedTicketData) && (
        <ViewForm
          handleClickForToggle={handleClickForToggle}
          leaveData={selectedLeaveData} // If leave data is available
          ticketData={selectedTicketData} // If ticket data is available
          source={source}
          formatDate={DateFormat}
          onUpdate={handleUpdate}
          userType={userType}
          ticketRequest={ticketMerged}
          personalInfo={personalInfo}
        />
      )}
    </section>
  );
};
