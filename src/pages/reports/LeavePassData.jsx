import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";

export const LeavePassData = () => {
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
    "Contract Start Date",
    "Contract End Date",
    "LEAVE PASSAGE ENTITLEMENT",
    "LEAVE PASSAGE DESTINATION",
  ]);

  const formatDate = (date) => {
    if (Array.isArray(date)) {
      // If date is an array, format the last valid date
      const lastValidDate = date.filter((d) => !isNaN(new Date(d).getTime()));
      if (lastValidDate.length === 0) return "-";
      return formatDate(lastValidDate[lastValidDate.length - 1]);
    }

    if (!date) return "-";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const generateTableBodyFromMergedData = (data) => {
    return data
    .filter((item) => {
      // console.log(item.dateLeavePass);
      
      // Ensure dateLeavePass is a valid array with non-empty and valid date entries
      return (
        Array.isArray(item.dateLeavePass) &&
        item.dateLeavePass.length > 0 &&
        item.dateLeavePass.every((date) => date && !isNaN(new Date(date).getTime()))
      );
    })
    .filter((item) => {
      
      const dateLeavePass = item.dateLeavePass[item.dateLeavePass.length - 1];
      return dateLeavePass;
    }).filter((item) => {
      if (Array.isArray(item.workStatus) && item.workStatus.length > 0) {
          const lastWorkStatus = item.workStatus[item.workStatus.length - 1].toUpperCase();
          if (lastWorkStatus === "TERMINATION" || lastWorkStatus === "RESIGNATION") {
              return false; // Exclude items with TERMINATION or RESIGNATION
          }
      }
      return true;
  })
      .map((item) => ({
        empID:item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfJoin: formatDate(item.doj)|| "-",
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
        contractStart: formatDate(item.contractStart) || "-",
        contractEnd: formatDate(item.contractEnd) || "-",
        dateLeavePass: formatDate(item.dateLeavePass) || "-",
        destinateLeavePass: item.destinateLeavePass || "-",
        rawAld: new Date(item.dateLeavePass) || "-", // Raw date for sorting
      }))
      .sort((a, b) => a.rawAld - b.rawAld)
      .map(({ rawAld, ...rest }) => rest); // Remove rawDateOfJoin after sorting
  };

  useEffect(() => {
      setTableBody(generateTableBodyFromMergedData(allData));
  }, [allData]);

  const handleDate = (e, type) => {
    const value = e.target.value;

    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);

    const start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
    const end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;

    const filtered = allData.filter((data) => {
      if (!Array.isArray(data.workStatus) || data.workStatus.length === 0) {
        return false; // Return early if workStatus is undefined or an empty array
    }
    
    const lastWorkStatus = data.workStatus[data.workStatus.length - 1]; // Now it's safe
    
    if (lastWorkStatus?.toUpperCase() === "TERMINATION" || lastWorkStatus?.toUpperCase() === "RESIGNATION") {
        return false; // Exclude records with TERMINATION or RESIGNATION
    }
      const expiryArray = data.dateLeavePass || [];
      const expiryDate = expiryArray.length
        ? new Date(expiryArray[expiryArray.length - 1])
        : null;

      if (!expiryDate || isNaN(expiryDate.getTime())) return false;

      if (start && end) return expiryDate >= start && expiryDate <= end;
      if (start) return expiryDate >= start;
      if (end) return expiryDate <= end;

      return true;
    }).map((item) => ({
      empID:item.empID || "-",
      empBadgeNo: item.empBadgeNo || "-",
      name: item.name || "-",
      dateOfJoin: formatDate(item.doj)|| "-",
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
      contractStart: formatDate(item.contractStart)|| "-",
      contractEnd: formatDate(item.contractEnd)|| "-",
      dateLeavePass: formatDate(item.dateLeavePass)|| "-",
      destinateLeavePass: item.destinateLeavePass || "-",
      rawAld: new Date(item.dateLeavePass)|| "-", // Raw date for sorting
      }))
      .sort((a, b) => a.rawAld - b.rawAld)
      .map(({ rawAld, ...rest }) => rest); // Remove rawDateOfJoin after sorting
  
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