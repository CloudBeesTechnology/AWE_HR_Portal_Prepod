import React, { useEffect, useState } from 'react'
import { FilterTable } from './FilterTable'

export const PassportExpiry = ({allData,typeOfReport,reportTitle}) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
       "Name",
    "Employee Badge",
    "Date of Joined",
    "Department",
    "workPosition",
    "Probation Expiry Date",
    "Deadline to return HRD",]);

  // Generate table body dynamically from mergedData
  const probationReviewMergedData = (data) => {
    return data.map((item) => [
      item.name || "-",
          item.empBadgeNo || "-",
          item.doj || "-",
          item.department || "-",
          item.position || "-",
          item.probationEnd || "-",  // Correct field reference
          item.deadlineToReturnHRD || "-", // Ensure correct field
    ]);
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
