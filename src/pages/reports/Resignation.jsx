import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const Resignation = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Date of join",
    "Nationality",
    "Department",
    "Position",
    "Date of Resignation",
    "Reason of Resignation",
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
      .filter((item) => item.resignDate) // Only include items with resignDate
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        doj:item.doj || "-",
        nationality: item.nationality || "-",
        department: item.department || "-",
        position: item.position || "-",
        resignDate: formatDate(item.resignDate) || "-",
        reasonResign: item.reasonResign || "-",
      }));
  };
  
    // return data
    //   .filter((item) => item.resignDate) // Only include items with resignDate
    //   .map((item) => [
    //     item.name || "-",
    //     item.empID || "-",
    //     item.empBadgeNo || "-",
    //     item.nationality || "-",
    //     item.department || "-",
    //     item.position || "-",
    //     item.resignDate || "-",
    //     item.resignNotProb || "-",
    //   ]);
  // };

  useEffect(() => {
    setTableBody(resignationMergedData(allData));
  }, [allData]);

  return (
    <div>
      <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle} />
    </div>
  );
};
