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
    "Employee Badge",
    "Name",
    "Date of Joined",
    "Nationality",
    "Position",
    "Department",
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
      console.log(item.annualLeaveDate);
      
      // Ensure annualLeaveDate is a valid array with non-empty and valid date entries
      return (
        Array.isArray(item.annualLeaveDate) &&
        item.annualLeaveDate.length > 0 &&
        item.annualLeaveDate.every((date) => date && !isNaN(new Date(date).getTime()))
      );
    })
    .filter((item) => {
      const annualLeaveDate = item.annualLeaveDate[item.annualLeaveDate.length - 1];
      return annualLeaveDate;
    })
      .map((item) => ({
        empID:item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        doj: formatDate(item.doj),
        nationality: item.nationality || "-",
        position: item.position || "-",
        department: item.department || "-",
        contractStart: formatDate(item.contractStart),
        contractEnd: formatDate(item.contractEnd),
        annualLeaveDate: formatDate(item.annualLeaveDate),
        destinateLeavePass: item.destinateLeavePass || "-",
      }));
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
      const expiryArray = data.annualLeaveDate || [];
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
      doj: formatDate(item.doj),
      nationality: item.nationality || "-",
      position: item.position || "-",
      department: item.department || "-",
      contractStart: formatDate(item.contractStart),
      contractEnd: formatDate(item.contractEnd),
      annualLeaveDate: formatDate(item.annualLeaveDate),
      destinateLeavePass: item.destinateLeavePass || "-",
    }));

    setFilteredData(filtered);
  };
  return (
    <div>
      <FilterTable
         tableBody={filteredData.length ? filteredData : tableBody}
         tableHead={tableHead}
         title={title}
         handleDate={handleDate}
      />
    </div>
  );
};