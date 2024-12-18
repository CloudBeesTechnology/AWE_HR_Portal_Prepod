import React, { useEffect, useState } from 'react'
import { FilterTable } from './FilterTable'

export const LeavePassData = ({allData,typeOfReport,reportTitle}) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
      "Employee Badge",
      "Name",
      "Date of Joined",
      "Nationality",
      "Position",
      "Department",
      "Contract Start Date",
      "Contract End Date",
      "LEAVE PASSAGE ENTILEMENT",
      "LEAVE PASSAGE DESTINATION"
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
  const generateTableBodyFromMergedData = (data) => {
    console.log(data);
    return data
    .filter((item) => Array.isArray(item.annualLeaveDate) && item.annualLeaveDate.length > 0)
    .map((item) => ({
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
        doj: formatDate(item.doj) || "-",
        nationality: item.nationality || "-",
        position: item.position || "-",
        department: item.department || "-",
        contractStart: formatDate(item.contractStart) || "-",
        contractEnd: formatDate(item.contractEnd) || "-",
        annualLeaveDate: formatDate(item.annualLeaveDate[item.annualLeaveDate.length - 1]),
        destinateLeavePass: item.destinateLeavePass || "-",
    }));
};
  
  useEffect(()=>{
    
      setTableBody(generateTableBodyFromMergedData(allData))
    },[allData])
// console.log(tableBody);

  return (
    <div>

      <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle}/>
    </div>
  )
}
