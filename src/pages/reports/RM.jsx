import React, { useEffect, useState } from 'react'
import { FilterTable } from './FilterTable'

export const RM = ({allData,typeOfReport,reportTitle}) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState(["Name",
      "Employee Badge",
      "Gender",
      "Date of Birth",
      "Date of Joined",
      "Nationality",
      "work Position",
      "contactNo",
      "Brunei I/C No",
      "Passport No",
      "Pass Expiry",
      "Department",
      "Contract Start Date",
      "Contract End Date",
      "Previous Company Name",]);


  // Generate table body dynamically from mergedData
  const generateTableBodyFromMergedData = (data) => {
    console.log(data);
    
    return data.map((item) => [
      item.name || "-",
      item.empBadgeNo || "-",
      item.gender || "-",
      item.dob || "-",
      item.doj || "-",
      item.nationality || "-",
      item.position || "-",
      item.contactNo || "-",
      item.bwnIcNo || "-",
      item.ppNo || "-",
      item.ppExpiry || "-",
      item.department || "-",
      item.contractStart || "-",
      item.contractEnd || "-",
      item.preEmp || "-",
    ]);
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
