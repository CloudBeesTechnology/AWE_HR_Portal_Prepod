import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const BlastingData = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Emp ID",
    "Badge No",
    "Nationality",
    "Department",
    "Blasting/Painting Badge Number",
    "Blasting/Painting Assessment Start Date",
    "Blasting/Painting Assessment End Date",
    "Blasting/Painting Qualification Expiry",
    "Remarks for Blasting/Painting Qualification",
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
      .filter((item) => item.blastingBadgeNo) // Only include items with termiDate
      .map((item) => ({
        name: item.name || "-",
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        nationality: item.nationality || "-",
        department: item.department || "-",
        blastingBadgeNo: item.blastingBadgeNo || "-",
        blastingStartDate: formatDate(item.blastingStartDate) || "-",
        blastingEndDate: formatDate(item.blastingEndDate) || "-",
        blastingQulifiExp: formatDate(item.blastingQulifiExp) || "-",
        blastingRemarks: item.blastingRemarks || "-",

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
