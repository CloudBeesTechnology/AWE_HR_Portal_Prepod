import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";

export const PassportExpiry = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead, setTableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Date of Join",
    "Nationality",
    "Department",
    "Other Department",
    "Position",
    "Passport Expiry",
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

  const filterPassportExpiry = (data) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const nextYear = today.getFullYear() + 1;
  
    return data.filter((item) => {
      if (!Array.isArray(item.ppExpiry) || item.ppExpiry.length === 0) return false;
  
      const lastExpiryDate = new Date(item.ppExpiry[item.ppExpiry.length - 1]);
      if (isNaN(lastExpiryDate.getTime())) return false;
  
      const expiryMonth = lastExpiryDate.getMonth();
      const expiryYear = lastExpiryDate.getFullYear();
  
      return expiryMonth === currentMonth && expiryYear === nextYear;
    });
  };
  
  useEffect(() => {
    const data = filterPassportExpiry(allData)
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfJoin: formatDate(item.doj)  || "-",
        nationality: item.nationality || "-",
         department: Array.isArray(item.department)
          ? item.department[item.department.length - 1]
          : "-",
          otherDepartment:Array.isArray(item.otherDepartment)
          ? item.otherDepartment[item.otherDepartment.length - 1]
          : "-",
        position: Array.isArray(item.position)
          ? item.position[item.position.length - 1]
          : "-",
        ppExpiry: formatDate(item.ppExpiry[item.ppExpiry.length - 1]), // Format the expiry date
        rawExpiryDate: new Date(item.ppExpiry[item.ppExpiry.length - 1]) // Raw date for sorting
      }))
      .sort((a, b) => a.rawExpiryDate - b.rawExpiryDate) // Sort by rawExpiryDate in ascending order
      .map(({ rawExpiryDate, ...rest }) => rest); // Remove lastDate after sorting

    setTableBody(data);
  }, [allData]);
  
  const handleDate = (e, type) => {
    const value = e.target.value;
  
    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);
  
    const start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
    const end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;
  
    const filtered = allData
      .filter((data) => {
        const expiryArray = data.ppExpiry || [];
        const expiryDate = expiryArray.length
          ? new Date(expiryArray[expiryArray.length - 1])
          : null;
  
        if (!expiryDate || isNaN(expiryDate.getTime())) return false;
  
        if (start && end) return expiryDate >= start && expiryDate <= end;
        if (start) return expiryDate >= start;
        if (end) return expiryDate <= end;
  
        return true;
      })
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfJoin: formatDate(item.doj)  || "-",
        nationality: item.nationality || "-",
         department: Array.isArray(item.department)
          ? item.department[item.department.length - 1]
          : "-",
          otherDepartment:Array.isArray(item.otherDepartment)
          ? item.otherDepartment[item.otherDepartment.length - 1]
          : "-",
        position: Array.isArray(item.position)
          ? item.position[item.position.length - 1]
          : "-",
        ppExpiry: formatDate(item.ppExpiry[item.ppExpiry.length - 1]),
        rawExpiryDate: new Date(item.ppExpiry[item.ppExpiry.length - 1]) // Raw date for sorting
      }))
      .sort((a, b) => a.rawExpiryDate - b.rawExpiryDate) // Sort by rawExpiryDate in ascending order
      .map(({ rawExpiryDate, ...rest }) => rest); // Remove rawExpiryDate after sorting
  
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
