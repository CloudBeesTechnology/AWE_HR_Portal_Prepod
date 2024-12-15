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
  
    return data.map((item) => {
      return {
        name: item.name || "-",
        empBadgeNo: item.empBadgeNo || "-",
        gender: item.gender || "-",
        dob: item.dob || "-",
        doj: item.doj || "-",
        nationality: item.nationality || "-",
        position: item.position || "-",
        contactNo: item.contactNo || "-",
        bwnIcNo: item.bwnIcNo || "-",
        ppNo: item.ppNo || "-",
        ppExpiry: item.ppExpiry || "-",
        department: item.department || "-",
        contractStart: item.contractStart || "-",
        contractEnd: item.contractEnd || "-",
        preEmp: item.preEmp || "-",
      };
    });
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
