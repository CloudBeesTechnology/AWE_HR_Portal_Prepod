import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";

export const Termination = () => {
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
    "Date of join",
    "Nationality",
    "Department",
    "Other Department",
    "Position",
    "Date of Termination",
    "Reason of Termination",
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
  const resignationMergedData = (data) => {
    const sortedData = data
      ?.filter((item) => item.termiDate) // Only include items with termiDate
      .map((item) => {
        const termiDate = new Date(item.termiDate); // Parse termiDate for sorting
        return {
          termiDate, // Keep raw date for sorting
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          dateOfJoin: formatDate(item.doj) || "-",
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
          terminateDate: formatDate(item.termiDate) || "-", // Display termination date
          reasonTerminate: item.reasonTerminate || "-", // Display termination note (if any)
        };
      })
      .sort((a, b) => a.termiDate - b.termiDate) // Sort by termiDate in ascending order
      .map(({ termiDate, ...rest }) => rest); // Remove termiDate after sorting
  
    return sortedData; // Return the sorted and formatted data
  };
  

  useEffect(() => {
    setTableBody(resignationMergedData(allData));
  }, [allData]);

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
      type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;

      const filtered = allData
      .filter((data) => {
        const termiDate = data.termiDate ? new Date(data.termiDate) : null;
    
        if (!termiDate || isNaN(termiDate.getTime())) return false;
    
        if (start && end) return termiDate >= start && termiDate <= end;
        if (start) return termiDate >= start;
        if (end) return termiDate <= end;
    
        return true;
      })
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfJoin: formatDate(item.doj) || "-", // Ensures date is formatted
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
        terminateDate: formatDate(item.termiDate) || "-", // Display formatted termination date
        reasonTerminate: item.reasonTerminate || "-", // Display termination reason
        rawTermiDate: new Date(item.termiDate), // Add raw date for sorting
      }))
      .sort((a, b) => a.rawTermiDate - b.rawTermiDate) // Sort by raw termiDate
      .map(({ rawTermiDate, ...rest }) => rest); // Remove raw date after sorting
    
    setFilteredData(filtered);
    }    

  return (
    <div>
      <FilterTable
        tableBody={filteredData.length ? filteredData : tableBody}
        // tableBody={tableBody}
        tableHead={tableHead}
        startDate={startDate}
        endDate={endDate}
        title={title}
        handleDate={handleDate}
      />
    </div>
  );
};
