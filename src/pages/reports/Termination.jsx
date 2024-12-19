import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const Termination = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
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
      .filter((item) => item.termiDate) // Only include items with termiDate
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        doj:item.doj || "-",
        nationality: item.nationality || "-",
        position: item.position || "-",
        department: item.department || "-",
        termiDate: formatDate(item.termiDate) || "-", // Corrected to display termination date
        reasonTerminate: item.reasonTerminate || "-", // Corrected to display termination note (if any)
      }));
  };
  

  useEffect(() => {
    setTableBody(resignationMergedData(allData));
  }, [allData]);

  return (
    <div>
      <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle} />
    </div>
  );
};
