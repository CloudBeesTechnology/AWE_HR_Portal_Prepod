import React, { useEffect, useState } from 'react'
import { FilterTable } from './FilterTable'

export const EmploymentMedical = ({allData,typeOfReport,reportTitle}) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Employee Badge",
    "Nationality",
    "Work Position",
    "Department",
    "Medical Expiry",]);

 // Helper function to check if the medical expiry is within three months or less from today
 const isWithinThreeMonths = (expiryDate) => {
  if (!expiryDate) return false;

  const today = new Date();
  const expiry = new Date(expiryDate);

  const timeDiff = expiry.getTime() - today.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

  return daysDiff <= 90 && daysDiff >= 0;
};

const employeeMedicalMergedData = (data) => {
  const filteredData = data.filter((item) =>
    isWithinThreeMonths(item.bruneiME)
  );
  return filteredData.map((item) => {
    return {
      name: item.name || "-",
      empBadgeNo: item.empBadgeNo || "-",
      nationality: item.nationality || "-",
      position: item.position || "-",
      department: item.department || "-",
      bruneiME: item.bruneiME || "-",
    };
  });
}  

  useEffect(()=>{
    
      setTableBody(employeeMedicalMergedData(allData))
    },[allData])
console.log(tableBody);

  return (
    <div>

      <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle}/>
    </div>
  )
}
