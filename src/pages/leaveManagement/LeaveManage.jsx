import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ViewForm } from "./ViewForm";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import { DateFormat } from "../../utils/DateFormat";
import useEmployeePersonalInfo from "../../hooks/useEmployeePersonalInfo";
import { DataSupply } from "../../utils/DataStoredContext";
import { FiLoader } from "react-icons/fi";

export const LeaveManage = () => {
  const [source, setSource] = useState(null);
  const [toggleClick, setToggleClick] = useState(false);
  const [selectedLeaveData, setSelectedLeaveData] = useState(null);
  const [selectedTicketData, setSelectedTicketData] = useState(null);
  const [userType, setUserType] = useState("");
  const [userID, setUserID] = useState("");

  const { storedData, isLoading } = useContext(DataSupply);

  const {
    mergedDataForProData,
    empInfoUnmatchedData,
    mergedData,
    handleDeleteLeaveStatus,
    handleUpdateLeaveStatus,
    ticketMerged,
    statusUpdate,
    loading,
  } = useLeaveManage({ storedData, isLoading });

  // console.log("All leave status",ticketMerged);

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
      setSelectedLeaveData(data);
      setSelectedTicketData(null);
    } else if (source === "Tickets") {
      // console.log(data);

      setSelectedTicketData(data);
      setSelectedLeaveData(null);
    }
    setToggleClick(true);
  };

  const handleUpdate = async (empID, newStatus, remark) => {
    try {
      await handleUpdateLeaveStatus(empID, { status: newStatus, remark });
      setSelectedLeaveData(null);
      setToggleClick(false);
      // console.log("Update successful for:", empID);
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  const requiredFields = [
    "empLeaveStatusData",
    "empPIData",
    "leaveDetailsData",
    "ticketData",
    "workInfoData",
  ];
  if (requiredFields.some((field) => !storedData?.[field]?.length)) {
    return (
      <div className="flex items-center justify-center h-[82vh] bg-transparent">
        <div className="flex justify-between gap-2">
          <div className="flex justify-between gap-2">
            <p className="text-sm font-semibold">Loading </p>
            <p>
              <FiLoader className="animate-spin mt-[4px]" size={15} />
            </p>
          </div>
        </div>
      </div>
    );
  }

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
              mergedDataForProData,
              empInfoUnmatchedData,
              loading,
            }}
          />
        </section>
      </div>
      {toggleClick && (selectedLeaveData || selectedTicketData) && (
        <ViewForm
          handleClickForToggle={handleClickForToggle}
          leaveData={selectedLeaveData}
          ticketData={selectedTicketData}
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
