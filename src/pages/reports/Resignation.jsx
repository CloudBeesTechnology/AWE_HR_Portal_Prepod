import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const Resignation = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Emp ID",
    "Badge No",
    "Nationality",
    "Department",
    "Work Position",
    "Date of Resignation",
    "Reason of Resignation",
  ]);

  // Generate table body dynamically from mergedData
  const resignationMergedData = (data) => {
    return data
      .filter((item) => item.resignDate) // Only include items with resignDate
      .map((item) => ({
        name: item.name || "-",
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        nationality: item.nationality || "-",
        department: item.department || "-",
        position: item.position || "-",
        resignDate: item.resignDate || "-",
        resignNotProb: item.resignNotProb || "-",
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
