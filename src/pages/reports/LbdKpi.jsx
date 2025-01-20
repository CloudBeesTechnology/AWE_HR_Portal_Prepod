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
    "Date of Joined",
    "Nationality",
    "SKILL POOL",
    "Position",
    "Upgrade Position",
    "contactNo",
    "Brunei I/C No",
    "Brunei IC Expiry",
    "Malaysian IC Number",
    "Passport No",
    "IMMIGRATION REFERENCE NUMBER",
    "Pass Expiry",
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
    console.log(data);

    return data
    .filter((item) => item.doj)
    .map((item) => {
      return {
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        gender: item.gender || "-",
        dateOfBirth:formatDate(item.dob)  || "-",
        dateOfJoin: formatDate(item.doj)  || "-",
        nationality: item.nationality || "-",
        skillPool: item.skillPool || "-",
        position: item.position || "-",
        upgradePosition: Array.isArray(item.upgradePosition)
          ? formatDate(item.upgradePosition[item.upgradePosition.length - 1])
          : "-",
        contactNo: item.contactNo || "-",
        bruneiIcNo: item.bwnIcNo || "-",
        bruneiIcExpiry: Array.isArray(item.bwnIcExpiry)
          ? formatDate(item.bwnIcExpiry[item.bwnIcExpiry.length - 1])
          : "-",
          malaysianIcNo: item.myIcNo || "-",
          passportNo: Array.isArray(item.ppNo)
          ? formatDate(item.ppNo[item.ppNo.length - 1])
          : "-",
        immigRefNo: item.immigRefNo || "-",
        passExpiry: Array.isArray(item.empPassExp)
          ? formatDate(item.empPassExp[item.empPassExp.length - 1])
          : "-",
        educLevel: item.educLevel || "-",
        agent: item.agent || "-",
      };
    });
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
        dateOfBirth:formatDate(item.dob)  || "-",
        dateOfJoin: formatDate(item.doj) || "-",
        nationality: item.nationality || "-",
        skillPool: item.skillPool || "-",
        position: item.position || "-",
        upgradePosition: Array.isArray(item.upgradePosition)
          ? formatDate(item.upgradePosition[item.upgradePosition.length - 1])
          : "-",
        contactNo: item.contactNo || "-",
        bruneiIcNo: item.bwnIcNo || "-",
        bruneiIcExpiry: Array.isArray(item.bwnIcExpiry)
          ? formatDate(item.bwnIcExpiry[item.bwnIcExpiry.length - 1])
          : "-",
          malaysianIcNo: item.myIcNo || "-",
          passportNo: Array.isArray(item.ppNo)
          ? formatDate(item.ppNo[item.ppNo.length - 1])
          : "-",
        immigRefNo: item.immigRefNo || "-",
        passExpiry: Array.isArray(item.empPassExp)
          ? formatDate(item.empPassExp[item.empPassExp.length - 1])
          : "-",
        educLevel: item.educLevel || "-",
        agent: item.agent || "-",
      }));
  
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
