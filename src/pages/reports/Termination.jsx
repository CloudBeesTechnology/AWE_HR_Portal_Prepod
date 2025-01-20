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
    "Employee Badge No",
    "Name",
    "Date of join",
    "Nationality",
    "Department",
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
    return data
      ?.filter((item) => item.termiDate) // Only include items with termiDate
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfJoin: formatDate(item.doj) || "-",
        nationality: item.nationality || "-",
        position: item.position || "-",
        department: item.department || "-",
        terminateDate: formatDate(item.termiDate) || "-", // Corrected to display termination date
        reasonTerminate: item.reasonTerminate || "-", // Corrected to display termination note (if any)
      }));
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
        empId: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfJoin: item.doj || "-",
        nationality: item.nationality || "-",
        position: item.position || "-",
        department: item.department || "-",
        terminateDate: formatDate(item.termiDate) || "-", // Corrected to display termination date
        reasonTerminate: item.reasonTerminate || "-", // Corrected to display termination note (if any)
      }));

    setFilteredData(filtered);
  };

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
