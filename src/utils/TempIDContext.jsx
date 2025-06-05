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
  const [HRMPosition, setHRMPosition] = useState("");
  const [gmCount, setGmCount] = useState(0);
  const [hrManagerCount, setHrManagerCount] = useState(0);
  const [userType, setUserType] = useState("");
  const [userID, setUserID] = useState("");
  const [gmPosition, setGmPosition] = useState("");
  const [GMEmpID, setGMEmpID] = useState("");
  const [supervisorCheck, setSupervisorCheck] = useState(true);
  const [offshoreType, setOffshoreType] = useState("");
  const [PDInfo, setPDInfo] = useState(null);

  const { workInfoData, empPIData } = useContext(DataSupply);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    const userType = localStorage.getItem("userType");
    setUserType(userType);
    // console.log(userType);
  }, []);

  useEffect(() => {
    //___________________________________Logged in GM POSITION__________________________________________________________________________________________
    if (workInfoData && userType === "Manager") {
      const generalManagerPosition = workInfoData.filter((item) =>
        item?.position?.includes("GENERAL MANAGER")
      );

      // console.log("General Manager Positions:", generalManagerPosition);

      const gmPosition = generalManagerPosition.find(
        (item) => item.empID === userID
      );

      // const gmPosition = generalManagerPosition[0];
      // console.log("gmPosition:", gmPosition);

      if (gmPosition && gmPosition?.position?.length > 0) {
        const lastPosition =
          gmPosition?.position[gmPosition?.position?.length - 1];
        // console.log("Last Position:", lastPosition);

        if (userID === gmPosition.empID) {
          setGmPosition(lastPosition);
          // console.log("Gm Position Set:", lastPosition);
        }
      }
    }
    // console.log("Final gmPosition Outside:", gmPosition);

    //___________________________________ Logged in GM POSITION__________________________________________________________________________________________

    //___________________________________GM Mail and empID_______________________________________________________________________________________________

    if (workInfoData && empPIData) {
      // Filter out all General Managers from workInfoData
      const generalManagerPositions = workInfoData?.filter((item) =>
        item?.position?.[item?.position?.length - 1]?.includes(
          "GENERAL MANAGER"
        )
      );
      setGmCount(generalManagerPositions.length);

      if (generalManagerPositions.length > 0) {
        // Create an array to store the General Manager emails
        const gmEmails = [];
        const gmEmpIDs = [];

        // Loop through all generalManagerPositions and find corresponding employee info
        generalManagerPositions.forEach((gmPosition) => {
          const gmInfo = empPIData.find(
            (data) => data.empID === String(gmPosition.empID)
          );

          if (gmInfo) {
            // console.log("GM Info:", gmInfo);
            // Add the official email and empID to the arrays
            gmEmails.push(gmInfo.officialEmail);
            gmEmpIDs.push(gmInfo.empID);
          }
        });

        // Set all GM emails and GM empIDs
        setGmMail(gmEmails);
        setGMEmpID(gmEmpIDs);
      }
    }

    // console.log(gmMail);
    // console.log(GMEmpID);

    //___________________________________GM Mail and empID__________________________________________________________________________________________

    //___________________________________Logged in hrm POSITION__________________________________________________________________________________________
    const hrManagerPositions = workInfoData.filter((item) => {
      if (
        item.empID === userID &&
        Array.isArray(item.position) &&
        item.position.length > 0 &&
        item.position[item.position.length - 1] === "HR MANAGER"
      ) {
        return item.position;
      }
    });

    // console.log(hrManagerPositions);

    const HRMPosition = hrManagerPositions[0];

    if (HRMPosition && HRMPosition.position.length > 0) {
      const lastPosition =
        HRMPosition.position[HRMPosition.position.length - 1];
      // console.log("Last Position:", lastPosition);

      if (userID === HRMPosition.empID) {
        setHRMPosition(lastPosition);
        // console.log("HRM Position Set:", lastPosition);
      }
    }

    setHrManagerCount(hrManagerPositions.length);

    //___________________________________logged in hrm POSITION__________________________________________________________________________________________

    //___________________________________ all hrm Mail__________________________________________________________________________________________
    if (workInfoData && empPIData) {
      // Filter out all HR Managers from workInfoData
      const HRMPositions = workInfoData.filter(
        (item) => item?.position?.[item?.position?.length - 1] === "HR MANAGER"
      );

      // console.log("HRMPositions:", HRMPositions);
      setHrManagerCount(HRMPositions.length);

      if (HRMPositions.length > 0) {
        // Create an array to store the HR Manager emails
        const hrManagerEmails = [];

        // Loop through all HRMPositions and find corresponding employee info
        HRMPositions.forEach((HRMPosition) => {
          const HRMInfo = empPIData.find(
            (data) => data.empID === String(HRMPosition.empID)
          );

          if (HRMInfo) {
            // console.log("HRM Info:", HRMInfo);
            // Add the official email to the array
            hrManagerEmails.push(HRMInfo.officialEmail);
          }
        });

        // Set all HR Manager emails
        setHrManagerMail(hrManagerEmails);
      }
    }

    // console.log(hrManagerMail);
    //___________________________________ all hrm mail__________________________________________________________________________________________
  }, [workInfoData, empPIData]);

  return (
    <TempIDContext.Provider
      value={{
        PDInfo,
        setPDInfo,
        supervisorCheck,
        setSupervisorCheck,
        HRMPosition,
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
        setOffshoreType,
        offshoreType,
      }}
    >
      {children}
    </TempIDContext.Provider>
  );
};
