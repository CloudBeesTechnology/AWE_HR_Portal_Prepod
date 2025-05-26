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
  }, []);

  useEffect(() => {
    //___________________________________Logged in GM POSITION__________________________________________________________________________________________
    if (workInfoData && userType === "Manager") {
      const generalManagerPosition = workInfoData.filter((item) =>
        item?.position?.includes("GENERAL MANAGER")
      );

      const gmPosition = generalManagerPosition.find(
        (item) => item.empID === userID
      );


      if (gmPosition && gmPosition?.position?.length > 0) {
        const lastPosition =
          gmPosition?.position[gmPosition?.position?.length - 1];

        if (userID === gmPosition.empID) {
          setGmPosition(lastPosition);
        }
      }
    }

    //___________________________________ Logged in GM POSITION__________________________________________________________________________________________

    //___________________________________GM Mail and empID_______________________________________________________________________________________________

    if (workInfoData && empPIData) {
      const generalManagerPositions = workInfoData?.filter((item) =>
        item?.position?.[item?.position?.length - 1]?.includes(
          "GENERAL MANAGER"
        )
      );
      setGmCount(generalManagerPositions.length);

      if (generalManagerPositions.length > 0) {
        const gmEmails = [];
        const gmEmpIDs = [];

        generalManagerPositions.forEach((gmPosition) => {
          const gmInfo = empPIData.find(
            (data) => data.empID === String(gmPosition.empID)
          );

          if (gmInfo) {
            gmEmails.push(gmInfo.officialEmail);
            gmEmpIDs.push(gmInfo.empID);
          }
        });

        setGmMail(gmEmails);
        setGMEmpID(gmEmpIDs);
      }
    }


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


    const HRMPosition = hrManagerPositions[0];

    if (HRMPosition && HRMPosition.position.length > 0) {
      const lastPosition =
        HRMPosition.position[HRMPosition.position.length - 1];

      if (userID === HRMPosition.empID) {
        setHRMPosition(lastPosition);
      }
    }

    setHrManagerCount(hrManagerPositions.length);

    //___________________________________logged in hrm POSITION__________________________________________________________________________________________

    //___________________________________ all hrm Mail__________________________________________________________________________________________
    if (workInfoData && empPIData) {
      const HRMPositions = workInfoData.filter(
        (item) => item?.position?.[item?.position?.length - 1] === "HR MANAGER"
      );

      setHrManagerCount(HRMPositions.length);

      if (HRMPositions.length > 0) {
        const hrManagerEmails = [];

        HRMPositions.forEach((HRMPosition) => {
          const HRMInfo = empPIData.find(
            (data) => data.empID === String(HRMPosition.empID)
          );

          if (HRMInfo) {
            hrManagerEmails.push(HRMInfo.officialEmail);
          }
        });

        setHrManagerMail(hrManagerEmails);
      }
    }

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
