import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";
import { usePrevious } from "@react-pdf-viewer/core";

export const NewRecruit = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isDateFiltered, setIsDateFiltered] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Date of Birth",
    "Gender",
    "Date of Join",
    "Nationality",
    "Department",
    "Other Department",
    "Position",
    "Other Position",
    "contactNo",
    "Brunei I/C No",
    "Passport No",
    "Pass Expiry",
    "Contract Start Date",
    "Contract End Date",
    "IMMIGRATION REFERENCE NUMBER",
    "EDUCATION LEVEL",
    "Previous Company Name",
  ]);

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

  const isDateInCurrentMonth = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return false;

    const today = new Date();
    return (
      parsedDate.getFullYear() === today.getFullYear() &&
      parsedDate.getMonth() === today.getMonth()
    );
  };

  const generateTableBodyFromMergedData = (data) => {
    return data
      .filter((item) => isDateInCurrentMonth(item.doj)) // Filter only current month dates
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfBirth: formatDate(item.dob) || "-",
        gender: item.gender || "-",
        dateOfJoin: formatDate(item.doj) || "-",
        nationality: item.nationality || "-",
        department: Array.isArray(item.department)
          ? item.department[item.department.length - 1]
          : "-",
        otherDepartment: Array.isArray(item.otherDepartment)
          ? item.otherDepartment[item.otherDepartment.length - 1]
          : "-",
        position: Array.isArray(item.position)
          ? item.position[item.position.length - 1]
          : "-",
        otherPosition: Array.isArray(item.otherPosition)
          ? item.otherPosition[item.otherPosition.length - 1]
          : "-",
        contactNo: item.contactNo || "-",
        bruneiIcNo: item.bwnIcNo || "-",
        passportNo: item.ppNo || "-",
        passporExpiry: Array.isArray(item.ppExpiry)
          ? formatDate(item.ppExpiry[item.ppExpiry.length - 1])
          : "-",
        contractStart: Array.isArray(item.contractStart)
          ? formatDate(item.contractStart[item.contractStart.length - 1])
          : "-",
        contractEnd: Array.isArray(item.contractEnd)
          ? formatDate(item.contractEnd[item.contractEnd.length - 1])
          : "-",
        immigRefNo: item.immigRefNo || "-",
        educLevel: item.educLevel || "-",
        previousEmployee: item.preEmp || "-",
        rawDateOfJoin: new Date(item.doj), // Raw date for sorting
      }))
      .sort((a, b) => a.rawDateOfJoin - b.rawDateOfJoin)
      .map(({ rawDateOfJoin, ...rest }) => rest); // Remove rawDateOfJoin after sorting
  };

  useEffect(() => {
    setTableBody(generateTableBodyFromMergedData(allData));
  }, [allData]);

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
//       .filter((data) => {
//         if (!Array.isArray(data.workStatus) || data.workStatus.length === 0) {
//           return false; // Return early if workStatus is undefined or an empty array
//         }
// console.log(data,"data");

//         const lastWorkStatus = data.workStatus[data.workStatus.length - 1]; // Now it's safe

//         if (
//           lastWorkStatus?.toUpperCase() === "TERMINATION" ||
//           lastWorkStatus?.toUpperCase() === "RESIGNATION"
//         ) {
//           return false; // Exclude records with TERMINATION or RESIGNATION
//         }

//         const doj = data.doj ? new Date(data.doj) : null;

//         if (!doj || isNaN(doj.getTime())) return false;

//         if (start && end) return doj >= start && doj <= end;
//         if (start) return doj >= start;
//         if (end) return doj <= end;

//         return true;
//       })
//       .map((item) => ({
//         empID: item.empID || "-",
//         empBadgeNo: item.empBadgeNo || "-",
//         name: item.name || "-",
//         dateOfBirth: formatDate(item.dob) || "-",
//         gender: item.gender || "-",
//         dateOfJoin: formatDate(item.doj) || "-",
//         nationality: item.nationality || "-",
//         department: Array.isArray(item.department)
//           ? item.department[item.department.length - 1]
//           : "-",
//         otherDepartment: Array.isArray(item.otherDepartment)
//           ? item.otherDepartment[item.otherDepartment.length - 1]
//           : "-",
//         position: Array.isArray(item.position)
//           ? item.position[item.position.length - 1]
//           : "-",
//         otherPosition: Array.isArray(item.otherPosition)
//           ? item.otherPosition[item.otherPosition.length - 1]
//           : "-",
//         contactNo: item.contactNo || "-",
//         bruneiIcNo: item.bwnIcNo || "-",
//         passportNo: item.ppNo || "-",
//         passporExpiry: Array.isArray(item.ppExpiry)
//           ? formatDate(item.ppExpiry[item.ppExpiry.length - 1])
//           : "-",
//         contractStart: Array.isArray(item.contractStart)
//           ? formatDate(item.contractStart[item.contractStart.length - 1])
//           : "-",
//         contractEnd: Array.isArray(item.contractEnd)
//           ? formatDate(item.contractEnd[item.contractEnd.length - 1])
//           : "-",
//         immigRefNo: item.immigRefNo || "-",
//         educLevel: item.educLevel || "-",
//         previousEmployee: item.preEmp || "-",
//         // rawDateOfJoin: new Date(item.doj), // Raw date for sorting
//       }));
//     if (start || end) {
//       if (filtered.length === 0) {
//         setIsDateFiltered(true); // No data found
//       } else {
//         setIsDateFiltered(false); // Data exists
//       }
//     } else {
//       setIsDateFiltered(false); // No date filters applied
//     }
//     setFilteredData(filtered);
//   };

const handleDate = (e, type) => {
  const value = e.target.value;
  if (type === "startDate") setStartDate(value);
  if (type === "endDate") setEndDate(value);

  const start =
    type === "startDate"
      ? new Date(value)
      : startDate
      ? new Date(startDate)
      : null;
  const end =
    type === "endDate"
      ? new Date(value)
      : endDate
      ? new Date(endDate)
      : null;

  const today = new Date();

  // ✅ Helper: normalize contract type
  const getContractType = (type) => {
    const raw =
      Array.isArray(type) && type.length > 0
        ? type[type.length - 1]
        : type;
    return (raw || "").toString().trim().toUpperCase();
  };

  // ✅ Step 1: Filter each contract type excluding terminated/resigned employees
  const filterByContractType = (data, type) =>
    data.filter((item) => {
      const contractType = getContractType(item.contractType);
      if (contractType !== type.toUpperCase()) return false;

      const termDateStr = (item?.termiDate ?? "").trim();
      const resignDateStr = (item?.resignDate ?? "").trim();

      const termDate = termDateStr ? new Date(termDateStr) : null;
      const resignDate = resignDateStr ? new Date(resignDateStr) : null;

      // ❌ Ignore terminated/resigned today or earlier
      if ((termDate && termDate <= today) || (resignDate && resignDate <= today))
        return false;

      return true;
    });

  const lpaFiltered = filterByContractType(allData, "LPA");
  const sawpFiltered = filterByContractType(allData, "SAWP");
  const localFiltered = filterByContractType(allData, "LOCAL");

  // ✅ Step 2: Combine filtered active employees
  const filteredActive = [...lpaFiltered, ...sawpFiltered, ...localFiltered];
console.log(lpaFiltered.length,"lap");
console.log(sawpFiltered.length,"sawp");
console.log(localFiltered.length,"local");
console.log(filteredActive.length,"length");

  // ✅ Step 3: Apply DOJ filtering
  const dojFiltered = filteredActive.filter((data) => {
    const doj = data.doj ? new Date(data.doj) : null;
    if (!doj || isNaN(doj.getTime())) return false;

    if (start && end) return doj >= start && doj <= end;
    if (start) return doj >= start;
    if (end) return doj <= end;
    return true;
  });

// 🧾 Step 4: Compare filteredActive vs dojFiltered to find missing employees
const activeIds = filteredActive.map(e => e.empID?.toString().trim());
const dojIds = dojFiltered.map(e => e.empID?.toString().trim());

// Find IDs present in filteredActive but missing in dojFiltered
const missingEmpIds = activeIds.filter(id => !dojIds.includes(id));

console.log("🚨 Missing from DOJ filter:", missingEmpIds);
console.log("🟡 Missing count:", missingEmpIds.length);

// Optional: show full data for those missing employees
const missingRecords = filteredActive.filter(e => missingEmpIds.includes(e.empID?.toString().trim()));
console.table(
  missingRecords.map(e => ({
    empID: e.empID,
    name: e.empName,
    doj: e.doj,
    contractType: e.contractType,
    termiDate: e.termiDate,
    resignDate: e.resignDate,
  }))
);







  // ✅ Step 4: Map final data
  const filtered = dojFiltered.map((item) => ({
    empID: item.empID || "-",
    empBadgeNo: item.empBadgeNo || "-",
    name: item.name || "-",
    dateOfBirth: formatDate(item.dob) || "-",
    gender: item.gender || "-",
    dateOfJoin: formatDate(item.doj) || "-",
    nationality: item.nationality || "-",
    department: Array.isArray(item.department)
      ? item.department[item.department.length - 1]
      : "-",
    otherDepartment: Array.isArray(item.otherDepartment)
      ? item.otherDepartment[item.otherDepartment.length - 1]
      : "-",
    position: Array.isArray(item.position)
      ? item.position[item.position.length - 1]
      : "-",
    otherPosition: Array.isArray(item.otherPosition)
      ? item.otherPosition[item.otherPosition.length - 1]
      : "-",
    contactNo: item.contactNo || "-",
    bruneiIcNo: item.bwnIcNo || "-",
    passportNo: item.ppNo || "-",
    passporExpiry: Array.isArray(item.ppExpiry)
      ? formatDate(item.ppExpiry[item.ppExpiry.length - 1])
      : "-",
    contractStart: Array.isArray(item.contractStart)
      ? formatDate(item.contractStart[item.contractStart.length - 1])
      : "-",
    contractEnd: Array.isArray(item.contractEnd)
      ? formatDate(item.contractEnd[item.contractEnd.length - 1])
      : "-",
    immigRefNo: item.immigRefNo || "-",
    educLevel: item.educLevel || "-",
    previousEmployee: item.preEmp || "-",
    contractType: getContractType(item.contractType),
  }));

  // ✅ Step 5: Update state and logs
  if (start || end) {
    setIsDateFiltered(filtered.length === 0);
  } else {
    setIsDateFiltered(false);
  }

  setFilteredData(filtered);

  console.log("✅ Filtered LPA:", lpaFiltered.length);
  console.log("✅ Filtered SAWP:", sawpFiltered.length);
  console.log("✅ Filtered LOCAL:", localFiltered.length);
  console.log("✅ Final DOJ filtered total:", filtered.length);
};






  return (
    <div>
      <FilterTable
        tableBody={filteredData.length ? filteredData : tableBody}
        tableHead={tableHead}
        title={title}
        startDate={startDate}
        endDate={endDate}
        handleDate={handleDate}
        isFiltered={isDateFiltered}
      />
    </div>
  );
};
