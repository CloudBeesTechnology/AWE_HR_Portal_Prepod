import React, { createContext, useContext, useState, useEffect } from "react";
import { DataSupply } from "./DataStoredContext";

const TempIDContext = createContext();

export const useTempID = () => {
  return useContext(TempIDContext);
};

export const TempIDProvider = ({ children }) => {
  const [tempID, setTempID] = useState(null);
  const [timeSheetFileData, setTimeSheetFileData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [showListTimeSheet, setShowListTimeSheet] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("Select Excel Sheet");
  const [categoryFilters, setCategoryFilters] = useState(null);
  const [tableData, setTableData] = useState(null);
  // For View Summary
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [getStartDate, setGetStartDate] = useState(new Date());
  const [getEndDate, setGetEndDate] = useState(new Date());

  const [gmMail, setGmMail] = useState();
  const [hrManagerMail, setHrManagerMail] = useState();
  const [gmCount, setGmCount] = useState(0);
  const [hrManagerCount, setHrManagerCount] = useState(0);
  const [userType, setUserType] = useState("");
  const [userID, setUserID] = useState("");
  const [gmPosition, setGmPosition] = useState("");
  const [GMEmpID, setGMEmpID] = useState("")
  const { workInfoData, empPIData } = useContext(DataSupply);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    const userType = localStorage.getItem("userType");
    setUserType(userType);
    // console.log(userType);
  }, []);

  useEffect(() => {
    if (workInfoData && userType === "Manager") {
      const generalManagerPosition = workInfoData.filter((item) =>
        item.position.includes("GENERAL MANAGER")
      );
    
      // console.log("General Manager Positions:", generalManagerPosition); 
      
      const gmPosition = generalManagerPosition[0]; 
      // console.log("gmPosition:", gmPosition); // Log gmPosition after filtering

      if (gmPosition && gmPosition.position.length > 0) {
        const lastPosition =
          gmPosition.position[gmPosition.position.length - 1];
        // console.log("Last Position:", lastPosition);

        if (userID === gmPosition.empID) {
          setGmPosition(lastPosition);
          // console.log("Gm Position Set:", lastPosition);
        }
      }
    }

    // console.log("Final gmPosition Outside:", gmPosition);

    // console.log("gm 4", gmPosition);
    if (workInfoData && empPIData) {
      const generalManagerPositions = workInfoData.filter((item) =>
        item.position.includes("GENERAL MANAGER")
      );
      setGmCount(generalManagerPositions.length);

      if (generalManagerPositions.length > 0) {
        const gmInfo = empPIData.find(
          (data) => data.empID === String(generalManagerPositions[0].empID)
        );

        if (gmInfo) {
          // console.log("GM Info:", gmInfo);
          setGmMail(gmInfo.officialEmail);
          setGMEmpID(gmInfo.empID);
        } else {
          // console.log("GM Info not found.");
        }
      }

      const hrManagerPositions = workInfoData.filter((item) =>
        item.position.includes("HR MANAGER")
      );
      setHrManagerCount(hrManagerPositions.length);

      if (hrManagerPositions.length > 0) {
        const hrManagerInfo = empPIData.find(
          (data) => data.empID === String(hrManagerPositions[0].empID)
        );

        if (hrManagerInfo) {
          // console.log("HR Manager Info:", hrManagerInfo);
          setHrManagerMail(hrManagerInfo.officialEmail);
        } else {
          // console.log("HR Manager Info not found.");
        }
      }
    }
  }, [workInfoData, empPIData]);

  return (
    <TempIDContext.Provider
      value={{
        gmMail,
        gmPosition,
        GMEmpID,
        hrManagerMail,
        gmCount,
        hrManagerCount,
        tempID,
        setTempID,
        timeSheetFileData,
        setTimeSheetFileData,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchQuery,
        setSearchQuery,
        showListTimeSheet,
        setShowListTimeSheet,
        selectedLocation,
        setSelectedLocation,
        getStartDate,
        setGetStartDate,
        getEndDate,
        setGetEndDate,
        categoryFilter,
        setCategoryFilter,
        setCategoryFilters,
        categoryFilters,
        setTableData,
        tableData,
      }}
    >
      {children}
    </TempIDContext.Provider>
  );
};
