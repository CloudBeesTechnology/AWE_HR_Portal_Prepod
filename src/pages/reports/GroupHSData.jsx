import React, { useEffect, useState } from 'react'
import { FilterTable } from './FilterTable'

export const GroupHSData = ({allData,typeOfReport,reportTitle}) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
       "Name",
    "Employee Badge",
    "Nationality",
    "Department",
    "Position",
    "Group H&S Insurance",
    "Group H&S Insurance Enrollment Effective Date",
    "Group H&S Insurance Enrollment End Date",
  ]);

  const formatDate = (date) => {
    if (!date) return "-";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-";
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };
  // Generate table body dynamically from mergedData
  const probationReviewMergedData = (data) => {
    return data
    .filter((item) => item.groupInsEndDate) // Only include items with termiDate
    .map((item) => ({
        name: item.name || "-",
        empBadgeNo: item.empBadgeNo || "-",
        nationality: item.nationality || "-",
        department: item.department || "-",
        position: item.position || "-",
        groupIns: item.groupIns || "-",
        groupInsEffectDate: Array.isArray(item.groupInsEffectDate)
        ? formatDate(item.groupInsEffectDate[item.groupInsEffectDate.length - 1])
        : "-", 
        groupInsEndDate:  Array.isArray(item.groupInsEndDate)
        ? formatDate(item.groupInsEndDate[item.groupInsEndDate.length - 1])
        : "-", 
    }));
};

  useEffect(()=>{
    
      setTableBody(probationReviewMergedData(allData))
    },[allData])
console.log(tableBody);

  return (
    <div>

      <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle}/>
    </div>
  )
}
