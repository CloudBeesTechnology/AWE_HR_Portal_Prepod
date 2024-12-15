import React, { useEffect, useState } from 'react'
import { FilterTable } from './FilterTable'

export const LbdKpi = ({allData,typeOfReport,reportTitle}) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
      "SKILL POOL",
      "Name",
      "Emp ID",
      "Badge No",
      "Gender",
      "Date of Birth",
      "Date of Joined",
      "Nationality",
      "Position",
      "Upgrade Position",
      "contactNo",
      "Brunei I/C No",
      "Brunei IC Expiry",
      "Malaysian IC Number",
      "Passport No",
      "IMMIGRATION REFERENCE NUMBER",
      "Pass Expiry",
      "EDUCATION LEVEL",
      "CV RECEIVED FROM",
 
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
  
    return data.map((item) => {
      return {
        skillPool: item.skillPool || "-",
        name: item.name || "-",
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        gender: item.gender || "-",
        dob: item.dob || "-",
        doj: item.doj || "-",
        nationality: item.nationality || "-",
        position: item.position || "-",
        upgradePosition:  Array.isArray(item.upgradePosition)
        ? item.upgradePosition[item.upgradePosition.length - 1] || "-"
        : "-",
        contactNo: item.contactNo || "-",
        bwnIcNo:item.bwnIcNo || "-",
        bwnIcExpiry: Array.isArray(item.bwnIcExpiry)
        ? item.bwnIcExpiry[item.bwnIcExpiry.length - 1] || "-"
        : "-",
        myIcNo:item.myIcNo || "-",
        ppNo: Array.isArray(item.ppNo)
        ? item.ppNo[item.ppNo.length - 1] || "-"
        : "-",
        immigRefNo: item.immigRefNo || "-",
        empPassExp: item.empPassExp || "-",
        educLevel: item.educLevel || "-",
        agent: item.agent || "-",
 
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
