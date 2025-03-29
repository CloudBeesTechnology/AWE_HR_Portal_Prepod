import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";

export const LbdKpi = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Gender",
    "Date of Birth",
    "Date of Join",
    "Nationality",
    "SKILL POOL",
    "department",
    "Other Department",
    "Position",
    "Other Position",
    "Upgrade Position",
    "contact No",
    "Brunei I/C No",
    // "Brunei IC Expiry",
    "Malaysian IC No",
    "Passport No",
    "IMMIGRATION REFERENCE NUMBER",
    "Pass Expiry",
    "Company Name of Previous Employment",
    "Previous Employment Period",
    "EDUCATION LEVEL",
    "CV RECEIVED FROM",
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

  // Generate table body dynamically from mergedData
  const generateTableBodyFromMergedData = (data) => {
    // console.log(data);

    return data
    .filter((item) =>
      {
        if (!item.doj) return false; // Exclude items without DOJ
        
        if (Array.isArray(item.workStatus) && item.workStatus.length > 0) {
            const lastWorkStatus = item.workStatus[item.workStatus.length - 1].toUpperCase();
            if (lastWorkStatus === "TERMINATION" || lastWorkStatus === "RESIGNATION") {
                return false; // Exclude items with TERMINATION or RESIGNATION
            }
        }
        return true;
    })
    .map((item) => ({
    
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        gender: item.gender || "-",
        dateOfBirth:formatDate(item.dob)  || "-",
        dateOfJoin: formatDate(item.doj)  || "-",
        nationality: item.nationality || "-",
        skillPool: item.skillPool || "-",
        department: Array.isArray(item.department)
        ? item.department[item.department.length - 1]
        : "-",
        otherDepartment:Array.isArray(item.otherDepartment)
        ? item.otherDepartment[item.otherDepartment.length - 1]
        : "-",
      position: Array.isArray(item.position)
        ? item.position[item.position.length - 1]
        : "-",
        otherPosition: Array.isArray(item.otherPosition)
          ? item.otherPosition[item.otherPosition.length - 1]
          : "-",
                upgradePosition: Array.isArray(item.upgradePosition)
          ? formatDate(item.upgradePosition[item.upgradePosition.length - 1])
          : "-",
        contactNo: item.contactNo || "-",
        bruneiIcNo: item.bwnIcNo || "-",
        // bruneiIcExpiry: Array.isArray(item.bwnIcExpiry)
        //   ? formatDate(item.bwnIcExpiry[item.bwnIcExpiry.length - 1])
        //   : "-",
          malaysianIcNo: item.myIcNo || "-",
          passportNo: Array.isArray(item.ppNo)
          ? formatDate(item.ppNo[item.ppNo.length - 1])
          : "-",
        immigRefNo: item.immigRefNo || "-",
        passExpiry: Array.isArray(item.empPassExp)
          ? formatDate(item.empPassExp[item.empPassExp.length - 1])
          : "-",
          preEmp: item.preEmp || "-",
      preEmpPeriod: item.preEmpPeriod || "-",
        educLevel: item.educLevel || "-",
        agent: item.agent || "-",
        rawDateOfJoin: new Date(item.doj), // Raw date for sorting
      }))
      .sort((a, b) => a.rawDateOfJoin - b.rawDateOfJoin)
      .map(({ rawDateOfJoin, ...rest }) => rest); // Remove rawDateOfJoin after sorting
  };

  useEffect(() => {
    setTableBody(generateTableBodyFromMergedData(allData));
  }, [allData]);
  // console.log(tableBody);
const handleDate = (e, type) => {
  const value = e.target.value;
    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);
  
    const start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
    const end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;
  
    const filtered = allData
      .filter((data) => {
        if (!Array.isArray(data.workStatus) || data.workStatus.length === 0) {
          return false; // Return early if workStatus is undefined or an empty array
      }
      
      const lastWorkStatus = data.workStatus[data.workStatus.length - 1]; // Now it's safe
      
      if (lastWorkStatus?.toUpperCase() === "TERMINATION" || lastWorkStatus?.toUpperCase() === "RESIGNATION") {
          return false; // Exclude records with TERMINATION or RESIGNATION
      }
        const doj = data.doj ? new Date(data.doj) : null;
  
        if (!doj || isNaN(doj.getTime())) return false;
  
        if (start && end) return doj >= start && doj <= end;
        if (start) return doj >= start;
        if (end) return doj <= end;
  
        return true;
      })
    .map((item) => ({
      empID: item.empID || "-",
      empBadgeNo: item.empBadgeNo || "-",
      name: item.name || "-",
      gender: item.gender || "-",
      dateOfBirth: formatDate(item.dob) || "-",
      dateOfJoin: formatDate(item.doj) || "-",
      nationality: item.nationality || "-",
      skillPool: item.skillPool || "-",
      department: Array.isArray(item.department)
      ? item.department[item.department.length - 1]
      : "-",
      otherDepartment:Array.isArray(item.otherDepartment)
      ? item.otherDepartment[item.otherDepartment.length - 1]
      : "-",
    position: Array.isArray(item.position)
      ? item.position[item.position.length - 1]
      : "-",
      otherPosition: Array.isArray(item.otherPosition)
          ? item.otherPosition[item.otherPosition.length - 1]
          : "-",
            upgradePosition: Array.isArray(item.upgradePosition)
        ? formatDate(item.upgradePosition[item.upgradePosition.length - 1])
        : "-",
      contactNo: item.contactNo || "-",
      bruneiIcNo: item.bwnIcNo || "-",
      malaysianIcNo: item.myIcNo || "-",
      passportNo: Array.isArray(item.ppNo)
        ? formatDate(item.ppNo[item.ppNo.length - 1])
        : "-",
      immigRefNo: item.immigRefNo || "-",
      passExpiry: Array.isArray(item.empPassExp)
        ? formatDate(item.empPassExp[item.empPassExp.length - 1])
        : "-",
      preEmp: item.preEmp || "-",
      preEmpPeriod: item.preEmpPeriod || "-",
      educLevel: item.educLevel || "-",
      agent: item.agent || "-",
      // rawDateOfJoin: new Date(item.doj), // Raw date for sorting
    }))
    // .sort((a, b) => a.rawDateOfJoin - b.rawDateOfJoin); // Sort by rawDateOfJoin in ascending order

  // Remove the rawDateOfJoin after sorting and update the filtered data
  setFilteredData(filtered);
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
      />
    </div>
  );
};
