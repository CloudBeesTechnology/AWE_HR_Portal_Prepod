import { useContext, useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { useTempID } from "../../utils/TempIDContext";
import { DataSupply } from "../../utils/DataStoredContext";

export const ContractReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { allData, title } = location.state || {};
  const { contractForms, loading: dataLoading } = useContext(DataSupply); // Get loading state from context
  const [tableBody, setTableBody] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateFiltered, setIsDateFiltered] = useState(false);
  const { gmPosition, HRMPosition } = useTempID();
  const userID = localStorage.getItem("userID");
  const userType = localStorage.getItem("userType");
  const [historyData, setHistoryData] = useState([]);

  const tableHead = [
    "Emp ID",
    "Badge No",
    "Name",
    "Nationality",
    "Date of Join",
    "Department",
    "Other Department",
    "Position",
    "Other Position",
    "Contract Start Date",
    "Contract End Date",
    "LD Expiry",
    userType !== "SuperAdmin" && "Status",
  ].filter(Boolean);

  const formatDate = (date, type) => {
    if (Array.isArray(date)) {
      if (date.length === 0) return "-";
      const lastDate = date[date.length - 1];
      return formatDate(lastDate, type);
    }

    if (!date) return "-";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const contractExpiryMergedData = (data) => {
    console.log(data,"data");
  
    const today = new Date();
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const endOfTwoMonthsAfter = new Date(
      today.getFullYear(),
      today.getMonth() + 3,
      1
    );
    endOfTwoMonthsAfter.setMilliseconds(-1);

    const empIDsToIgnore = new Set(
      contractForms
        .filter((item) => item.extendedStatus === "noExtended")
        .map((item) => item.empID)
    );
    // Step 1: Keep only the latest contractForm per empID
    const latestFormsMap = new Map();
    contractForms
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((item) => {
        if (!latestFormsMap.has(item.empID)) {
          latestFormsMap.set(item.empID, item);
        }
      });

    // Step 2: Convert map back to array
    const latestContractForms = Array.from(latestFormsMap.values());


    const sortedData = data
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((item) => {
        if (empIDsToIgnore.has(item.empID)) return null;
        
        // Filter out terminated/resigned
        const workStatus = item.workStatus || [];
        const lastWorkStatus = workStatus[workStatus.length - 1];
        if (
          lastWorkStatus &&
          ["TERMINATION", "RESIGNATION"].includes(lastWorkStatus.toUpperCase())
        ) {
          return null;
        }
        
        const contractEndDates = item.contractEnd || [];
        if (contractEndDates.length === 0) return null;
        
        const lastDate = contractEndDates[contractEndDates.length - 1];
        //latestContractform data
        const latestItemForEmp = contractForms
        .filter((cf) => cf.empID === item.empID)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        
        if (
          !lastDate ||
          (latestItemForEmp?.depHead && latestItemForEmp.hrManager === "") ||
          (item.contStatus && item.extendedStatus === "noExtended") ||
          item.extendedStatus === "hrmView" ||
          item.extendedStatus === "gmView"
        ) {
          return null;
        }
        
        const contractEnd = new Date(lastDate);

        if (
          !(
            contractEnd >= startOfNextMonth &&
            contractEnd <= endOfTwoMonthsAfter
          )
        ) {
          return null;
        }

        // Extra fields
        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];
        const lastManager = item.manager?.[item.manager.length - 1] || null;

        // Access control
        if (HRMPosition === "HR MANAGER" || userType === "HR" ) {
          // allow
        } else if (userType === "Manager" && lastManager !== userID) {
          return null;
        } else if (userType === "HR" && HRMPosition !== "HR MANAGER") {
          return null;
        } else if (userType === "Supervisor") {
          return null;
        }
        // console.log(item, "items");
        const today = new Date();
        const positionRevDate =
          item.positionRevDate?.[item.positionRevDate.length - 1];
        const positionRev = item.positionRev?.[item.positionRev.length - 1];
        const upgradePosition =
          item.upgradePosition?.[item.upgradePosition.length - 1];
        const upgradeDate = item.upgradeDate?.[item.upgradeDate.length - 1];
        let finalPosition;

        // Convert to dates for comparison (ensure dates are valid before comparing)
        const revDateObj = positionRevDate ? new Date(positionRevDate) : null;
        const upgradeDateObj = upgradeDate ? new Date(upgradeDate) : null;
        if (revDateObj && upgradeDateObj) {
          // console.log("two");
          if (revDateObj.toDateString() === upgradeDateObj.toDateString()) {
            finalPosition = item.position?.[item.position.length - 1];
          } else if (revDateObj > upgradeDateObj) {
            // finalPosition = today >= revDateObj && positionRev;
            finalPosition =
              today >= revDateObj
                ? positionRev
                : today >= upgradeDateObj
                ? upgradePosition
                : item.position?.[item.position.length - 1];
          } else if (upgradeDateObj > revDateObj) {
            // finalPosition = today >= upgradeDateObj && upgradePosition;
            finalPosition =
              today >= upgradeDateObj
                ? upgradePosition
                : today >= revDateObj
                ? positionRev
                : item.position?.[item.position.length - 1];
          }
        } else if (revDateObj && !upgradeDateObj) {
          finalPosition = today >= revDateObj && positionRev;
        } else if (upgradeDateObj && !revDateObj) {
          finalPosition = today >= upgradeDateObj && upgradePosition;
        } else {
          finalPosition = item.position?.[item.position.length - 1];
        }
        // console.log(item.oldCED, "item.oldCED", item.empID);
        // console.log(item.oldCED ,formatDate(lastDate) ,"item.oldCED", item.empID);


        return {
          lastDate: new Date(lastDate),
          empID: item.empID,
          empBadgeNo: item.empBadgeNo,
          name: item.name,
          nationality: item.nationality,
          dateOfJoin: formatDate(item.doj),
          department: item.department?.[item.department.length - 1],
          otherDepartment:
            item.otherDepartment?.[item.otherDepartment.length - 1],
          position: finalPosition,
          // position: item.position?.[item.position.length - 1],
          otherPosition: item.otherPosition?.[item.otherPosition.length - 1],
          contractStartDate: formatDate(startDate),
          contractEndDate: formatDate(lastDate),
          oldCED:
            item.oldCED === formatDate(lastDate)
              ? item.oldCED
              : formatDate(lastDate),
          nlmsEmpApproval: item.nlmsEmpValid?.[item.nlmsEmpValid.length - 1]
            ? formatDate(item.nlmsEmpValid[item.nlmsEmpValid.length - 1])
            : null,
          ...(HRMPosition === "HR MANAGER"
            ? {
                status:
                  latestItemForEmp?.hrManager &&
                  latestItemForEmp.oldCED === formatDate(lastDate)
                    ? "Approved"
                    : "Pending",
              }
            : {}),
          ...(userType === "Manager" && {
            status:
              latestItemForEmp?.depHead &&
              latestItemForEmp?.oldCED === formatDate(lastDate)
                ? "Approved"
                : "Pending",
          }),
          ...(gmPosition === "GENERAL MANAGER" && {
            status:
              latestItemForEmp?.genManager &&
              latestItemForEmp.oldCED === formatDate(lastDate)
                ? "Approved"
                : "Pending",
          }),
          ...(userType === "HR" && {
            status:
              latestItemForEmp?.hrSign &&
              latestItemForEmp.oldCED === formatDate(lastDate)
                ? "Approved"
                : "Pending",
          }),
        };
      })
      .filter(Boolean) // removes nulls
      .filter((val) => val.status === "Pending")
      .sort((a, b) => a.lastDate - b.lastDate)
      .map(({ lastDate, ...rest }) => rest); // remove lastDate

    // Final mapped result without the date object
    return sortedData;
  };
  useEffect(() => {
    if (allData) {
      const mergedData = contractExpiryMergedData(
        allData,
        userType,
        gmPosition,
        userID,
        HRMPosition
      );
      setTableBody(mergedData);
    }
  }, [allData, userType, gmPosition, userID, HRMPosition]);

  const handleViewDetails = (personData) => {
    const employeeHistory = contractForms.filter(
      (val) => val.empID === personData.empID
    );
    setHistoryData(employeeHistory);
    setSelectedPerson(personData);
  };

  const closeModal = () => {
    setSelectedPerson(null);
  };
  const handleNavigate = (id) => {
    closeModal();
    if (selectedPerson) {
      navigate("/contractForms", {
        state: { employeeData: selectedPerson, matchedID: id ?? null },
      });
    }
  };
//   const handleDate = (e, type) => {
//     const value = e.target.value;

//     if (type === "startDate") setStartDate(value);
//     if (type === "endDate") setEndDate(value);

//     const start =
//       type === "startDate"
//         ? new Date(value)
//         : startDate
//         ? new Date(startDate)
//         : null;
//     const end =
//       type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;


//     const filtered = allData
//       .filter((item) => {
        
//         if (!Array.isArray(item.workStatus) || item.workStatus.length === 0) {
//           return false;
//         }
        
//         const lastWorkStatus = item.workStatus[item.workStatus.length - 1];
        
//         if (
//           lastWorkStatus?.toUpperCase() === "TERMINATION" ||
//           lastWorkStatus?.toUpperCase() === "RESIGNATION"
//         ) {
//           return false;
//         }
//         // console.log(item.workStatus,"workstatus");
        
//         if (!item.contStatus) {
//           const expiryArray = item.contractEnd || [];
//           const expiryDate = expiryArray.length
//           ? new Date(expiryArray[expiryArray.length - 1])
//           : null;
          
//           if (!expiryDate || isNaN(expiryDate.getTime())) return false;
          
//           if (start && end) return expiryDate >= start && expiryDate <= end;
//           if (start) return expiryDate >= start;
//           if (end) return expiryDate <= end;
          
//           return true;
//         }
//         return false;
//       })
//       .map((item) => {
//         if(item.empID === "8651") console.log(item,"item");
//         const contractEndDates = item.contractEnd || [];
//         const lastDate = contractEndDates[contractEndDates.length - 1];
//         const contractStartDates = item.contractStart || [];
//         const startDate = contractStartDates[contractStartDates.length - 1];

//         const today = new Date();
//         const positionRevDate =
//           item.positionRevDate?.[item.positionRevDate.length - 1];
//         const positionRev = item.positionRev?.[item.positionRev.length - 1];
//         const upgradePosition =
//           item.upgradePosition?.[item.upgradePosition.length - 1];
//         const upgradeDate = item.upgradeDate?.[item.upgradeDate.length - 1];
//         let finalPosition;

//         // Convert to dates for comparison (ensure dates are valid before comparing)
//         const revDateObj = positionRevDate ? new Date(positionRevDate) : null;
//         const upgradeDateObj = upgradeDate ? new Date(upgradeDate) : null;
//         if (revDateObj && upgradeDateObj) {
//           if (revDateObj.toDateString() === upgradeDateObj.toDateString()) {
//             finalPosition = item.position?.[item.position.length - 1];
//           } else if (revDateObj > upgradeDateObj) {
//             finalPosition =
//               today >= revDateObj
//                 ? positionRev
//                 : today >= upgradeDateObj
//                 ? upgradePosition
//                 : item.position?.[item.position.length - 1];
//           } else if (upgradeDateObj > revDateObj) {
//             finalPosition =
//               today >= upgradeDateObj
//                 ? upgradePosition
//                 : today >= revDateObj
//                 ? positionRev
//                 : item.position?.[item.position.length - 1];
//           }
//         } else if (revDateObj && !upgradeDateObj) {
//           finalPosition = today >= revDateObj && positionRev;
//         } else if (upgradeDateObj && !revDateObj) {
//           finalPosition = today >= upgradeDateObj && upgradePosition;
//         } else {
//           finalPosition = item.position?.[item.position.length - 1];
//         }

//         return {
//           lastDate: new Date(lastDate),
//           empID: item.empID,
//           empBadgeNo: item.empBadgeNo,
//           name: item.name,
//           nationality: item.nationality,
//           dateOfJoin: formatDate(item.doj),
//           department:
//             Array.isArray(item.department) &&
//             item.department[item.department.length - 1],
//           otherDepartment:
//             Array.isArray(item.otherDepartment) &&
//             item.otherDepartment[item.otherDepartment.length - 1],
//           position: finalPosition,
//           otherPosition:
//             Array.isArray(item.otherPosition) &&
//             item.otherPosition[item.otherPosition.length - 1],
//           contractStartDate: formatDate(startDate),
//           contractEndDate: formatDate(lastDate),
//           oldCED:
//             item.oldCED === formatDate(lastDate)
//               ? item.oldCED
//               : formatDate(lastDate),
//           nlmsEmpApproval: Array.isArray(item.nlmsEmpValid)
//             ? formatDate(item.nlmsEmpValid[item.nlmsEmpValid.length - 1])
//             : "-",
//           ...(HRMPosition === "HR MANAGER" || userType === "HR"
//             ? { status: item.hrManager ? "Approved" : "Pending" }
//             : {}),

//           ...(userType === "Manager" && {
//             status: item.depHead ? "Approved" : "Pending",
//           }),

//           ...(gmPosition === "GENERAL MANAGER" && {
//             status: item.genManager ? "Approved" : "Pending",
//           }),
//         };
//       })
//       .sort((a, b) => a.lastDate - b.lastDate)
//       .map(({ lastDate, ...rest }) => rest);

// console.log(filtered,"filtered");
//     // if (start || end) {
//     //   if (filtered.length === 0) {
//     //     setIsDateFiltered(true);
//     //   } else {
//     //     setIsDateFiltered(false);
//     //   }
//     // } else {
//     //   setIsDateFiltered(false);
//     // }

//     setFilteredData(filtered);
//   };
// const handleDate = (e, type) => {
//   const value = e.target.value;

//   // Update state
//   if (type === "startDate") setStartDate(value);
//   if (type === "endDate") setEndDate(value);

//   // Use latest input value or state
//   let start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
//   let end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;

//   // Normalize dates (ignore time)
//   if (start) start.setHours(0, 0, 0, 0);
//   if (end) end.setHours(23, 59, 59, 999);

//   const filtered = allData
//     .filter(item => {
//       // Ignore terminated or resigned employees
//       const lastWorkStatus = item.workStatus?.[item.workStatus.length - 1];
//       if (!lastWorkStatus || ["TERMINATION", "RESIGNATION"].includes(lastWorkStatus.toUpperCase())) return false;

//       // If contractEnd exists, filter by date
//       const expiryArray = item.contractEnd || [];
//       if (expiryArray.length === 0) return false;
//       // console.log(item.empID==="4820" ?? item,"item");
      
//       const expiryDate = new Date(expiryArray[expiryArray.length - 1]);
//       if (isNaN(expiryDate.getTime())) return false;
      
//       expiryDate.setHours(0, 0, 0, 0); // normalize
      
//       if (start && expiryDate < start) return false;
//       if (end && expiryDate > end) return false;

//       return true;
//     })
//     .map(item => {
      
//       const contractEndDates = item.contractEnd || [];
//       const lastDate = contractEndDates[contractEndDates.length - 1];
//       const contractStartDates = item.contractStart || [];
//       const startDateVal = contractStartDates[contractStartDates.length - 1];

//       const today = new Date();
//       const positionRevDate = item.positionRevDate?.[item.positionRevDate.length - 1];
//       const positionRev = item.positionRev?.[item.positionRev.length - 1];
//       const upgradePosition = item.upgradePosition?.[item.upgradePosition.length - 1];
//       const upgradeDate = item.upgradeDate?.[item.upgradeDate.length - 1];

//       let finalPosition;

//       const revDateObj = positionRevDate ? new Date(positionRevDate) : null;
//       const upgradeDateObj = upgradeDate ? new Date(upgradeDate) : null;

//       if (revDateObj && upgradeDateObj) {
//         if (revDateObj.toDateString() === upgradeDateObj.toDateString()) {
//           finalPosition = item.position?.[item.position.length - 1];
//         } else if (revDateObj > upgradeDateObj) {
//           finalPosition = today >= revDateObj ? positionRev : today >= upgradeDateObj ? upgradePosition : item.position?.[item.position.length - 1];
//         } else {
//           finalPosition = today >= upgradeDateObj ? upgradePosition : today >= revDateObj ? positionRev : item.position?.[item.position.length - 1];
//         }
//       } else if (revDateObj && !upgradeDateObj) {
//         finalPosition = today >= revDateObj ? positionRev : item.position?.[item.position.length - 1];
//       } else if (upgradeDateObj && !revDateObj) {
//         finalPosition = today >= upgradeDateObj ? upgradePosition : item.position?.[item.position.length - 1];
//       } else {
//         finalPosition = item.position?.[item.position.length - 1];
//       }

//       return {
//         lastDate: new Date(lastDate),
//         empID: item.empID,
//         empBadgeNo: item.empBadgeNo,
//         name: item.name,
//         nationality: item.nationality,
//         dateOfJoin: formatDate(item.doj),
//         department: Array.isArray(item.department) ? item.department[item.department.length - 1] : "-",
//         otherDepartment: Array.isArray(item.otherDepartment) ? item.otherDepartment[item.otherDepartment.length - 1] : "-",
//         position: finalPosition,
//         otherPosition: Array.isArray(item.otherPosition) ? item.otherPosition[item.otherPosition.length - 1] : "-",
//         contractStartDate: formatDate(startDateVal),
//         contractEndDate: formatDate(lastDate),
//         oldCED: item.oldCED === formatDate(lastDate) ? item.oldCED : formatDate(lastDate),
//         nlmsEmpApproval: Array.isArray(item.nlmsEmpValid) ? formatDate(item.nlmsEmpValid[item.nlmsEmpValid.length - 1]) : "-",
//         ...(HRMPosition === "HR MANAGER" || userType === "HR" ? { status: item.hrManager ? "Approved" : "Pending" } : {}),
//         ...(userType === "Manager" ? { status: item.depHead ? "Approved" : "Pending" } : {}),
//         ...(gmPosition === "GENERAL MANAGER" ? { status: item.genManager ? "Approved" : "Pending" } : {}),
//       };
//     })
//     .sort((a, b) => new Date(a.lastDate) - new Date(b.lastDate))
//     .map(({ lastDate, ...rest }) => rest);
// // console.log(filtered,"filtered");

//   // Set filtered state
//   if (start || end) {
//     setIsDateFiltered(filtered.length === 0);
//   } else {
//     setIsDateFiltered(false);
//   }

//   setFilteredData(filtered);
// };

const handleDate = (e, type) => {
  const value = e.target.value;

  // Update state
 if (type === "startDate") {
  setStartDate(value);
  sessionStorage.setItem("startDate", value);
}
if (type === "endDate") {
  setEndDate(value);
  sessionStorage.setItem("endDate", value);
}
  
  // Use latest input value or state
  let start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
  let end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;

  if (start) start.setHours(0, 0, 0, 0);
  if (end) end.setHours(23, 59, 59, 999);

  const empIDsToIgnore = new Set(
    contractForms
      .filter((item) => item.extendedStatus === "noExtended")
      .map((item) => item.empID)
  );

  const filtered = allData
  ?.filter((item) => {
      if (empIDsToIgnore.has(item.empID)) return false;

      const lastWorkStatus = item.workStatus?.at(-1);
      if (["TERMINATION", "RESIGNATION"].includes(lastWorkStatus?.toUpperCase())) return false;

      const contractEndDates = item.contractEnd || [];
      if (contractEndDates.length === 0) return false;

      const lastDate = new Date(contractEndDates.at(-1));
      if (isNaN(lastDate)) return false;

      // Skip based on extendedStatus conditions
      const latestItemForEmp = contractForms
        .filter((cf) => cf.empID === item.empID)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      if (
        (latestItemForEmp?.depHead && latestItemForEmp.hrManager === "") ||
        (item.contStatus && item.extendedStatus === "noExtended") ||
        item.extendedStatus === "hrmView" ||
        item.extendedStatus === "gmView"
      ) {
        return false;
      }

      // ✅ Date range filter
      if (start && lastDate < start) return false;
      if (end && lastDate > end) return false;

      // Access control
      const lastManager = item.manager?.at(-1);
      return true;
    })
   ?.map((item) => {
    
      // console.log(item,"item");
      const contractEndDates = item.contractEnd || [];
      const lastDate = contractEndDates.at(-1);
      const contractStartDates = item.contractStart || [];
      const startDateVal = contractStartDates.at(-1);

      // Position logic
      const today = new Date();
      const positionRevDate = item.positionRevDate?.at(-1);
      const positionRev = item.positionRev?.at(-1);
      const upgradePosition = item.upgradePosition?.at(-1);
      const upgradeDate = item.upgradeDate?.at(-1);

      let finalPosition;
      const revDateObj = positionRevDate ? new Date(positionRevDate) : null;
      const upgradeDateObj = upgradeDate ? new Date(upgradeDate) : null;

      if (revDateObj && upgradeDateObj) {
        if (revDateObj.toDateString() === upgradeDateObj.toDateString()) {
          finalPosition = item.position?.at(-1);
        } else if (revDateObj > upgradeDateObj) {
          finalPosition = today >= revDateObj ? positionRev : today >= upgradeDateObj ? upgradePosition : item.position?.at(-1);
        } else {
          finalPosition = today >= upgradeDateObj ? upgradePosition : today >= revDateObj ? positionRev : item.position?.at(-1);
        }
      } else if (revDateObj && !upgradeDateObj) {
        finalPosition = today >= revDateObj ? positionRev : item.position?.at(-1);
      } else if (upgradeDateObj && !revDateObj) {
        finalPosition = today >= upgradeDateObj ? upgradePosition : item.position?.at(-1);
      } else {
        finalPosition = item.position?.at(-1);
      }

      // Find latest contract form for status
      const latestItemForEmp = contractForms
        .filter((cf) => cf.empID === item.empID)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      // Determine approval status
      let status = "Pending";
      if (HRMPosition === "HR MANAGER" || userType === "HR") {
        status =
          latestItemForEmp?.hrManager && latestItemForEmp.oldCED === formatDate(lastDate)
            ? "Approved"
            : "Pending";
      } else if (userType === "Manager") {
        status =
          latestItemForEmp?.depHead && latestItemForEmp.oldCED === formatDate(lastDate)
            ? "Approved"
            : "Pending";
      } else if (gmPosition === "GENERAL MANAGER") {
        status =
          latestItemForEmp?.genManager && latestItemForEmp.oldCED === formatDate(lastDate)
            ? "Approved"
            : "Pending";
      }

      return {
        lastDate: new Date(lastDate),
        empID: item.empID,
        empBadgeNo: item.empBadgeNo,
        name: item.name,
        nationality: item.nationality,
        dateOfJoin: formatDate(item.doj),
        department: item.department?.at(-1),
        otherDepartment: item.otherDepartment?.at(-1),
        position: finalPosition,
        otherPosition: item.otherPosition?.at(-1),
        contractStartDate: formatDate(startDateVal),
        contractEndDate: formatDate(lastDate),
        oldCED: item.oldCED === formatDate(lastDate) ? item.oldCED : formatDate(lastDate),
        nlmsEmpApproval: formatDate(item.nlmsEmpValid?.at(-1)) || null,
        status,
      };

    })
    .filter((val) => val.status === "Pending")
    .sort((a, b) => new Date(a.lastDate) - new Date(b.lastDate))
    .map(({ lastDate, ...rest }) => rest);

  if (start || end) {

    setIsDateFiltered(filtered?.length === 0);

  } else {

    setIsDateFiltered(false);

  }

  setFilteredData(filtered);
};

useEffect(() => {

  const storedStart = sessionStorage.getItem("startDate");
  const storedEnd = sessionStorage.getItem("endDate");
  
  console.log(storedStart,"storedStart");

  if (storedStart) setStartDate(storedStart);

  if (storedEnd) setEndDate(storedEnd);

}, []);

useEffect(() => {
  if (location.pathname === "/report") {
    sessionStorage.removeItem("startDate");
    sessionStorage.removeItem("endDate");
    setStartDate("");
    setEndDate("");
  }
}, [location.pathname]);

  return (

    <div>

      <FilterTable
        tableBody={filteredData?.length ? filteredData : tableBody}
        tableHead={tableHead}
        title={title}
        startDate={startDate}
        endDate={endDate}
        handleDate={handleDate}
        handleViewDetails={handleViewDetails}
        isFiltered={isDateFiltered}
        loading={dataLoading} // Pass the loading prop
      />

      {selectedPerson && (
        <div className="fixed inset-0 center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-[600px] overflow-y-auto">
            <section className="flex justify-between gap-10 items-center mb-5">
              <div className="w-full flex-1 center">
                <img className="max-w-[200px]" src={logo} alt="Logo" />
              </div>
              <button className="text-[24px] rounded" onClick={closeModal}>
                <VscClose />
              </button>
            </section>
            <h2 className="text-xl font-semibold underline text-center mb-5">
              Person Details
            </h2>
            <p className="flex mb-2">
              <strong className="w-[30%]">Name</strong>{" "}
              <span className=" flex-1">: &nbsp;{selectedPerson.name}</span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Emp ID</strong>{" "}
              <span className=" flex-1">: &nbsp;{selectedPerson.empID}</span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Emp Badge No</strong>{" "}
              <span className=" flex-1">
                : &nbsp;{selectedPerson.empBadgeNo}
              </span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Nationality</strong>{" "}
              <span className=" flex-1">
                : &nbsp;{selectedPerson.nationality}
              </span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Date of Join</strong>{" "}
              <span className=" flex-1">
                : &nbsp;{selectedPerson.dateOfJoin}
              </span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Position:</strong>
              <span className=" flex-1">
                {" "}
                : &nbsp;
                {selectedPerson.position === "OTHER"
                  ? selectedPerson.otherPosition
                  : selectedPerson.position}
              </span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Department:</strong>{" "}
              <span className=" flex-1">
                {" "}
                : &nbsp;
                {selectedPerson.department === "OTHER"
                  ? selectedPerson.otherDepartment
                  : selectedPerson.department}
              </span>
            </p>
            {/* selectedPerson.genManager && */}
            <div className="flex justify-evenly items-center p-3 mt-10">
              <button className="primary_btn" onClick={() => handleNavigate()}>
                Go to Contract Form
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};
