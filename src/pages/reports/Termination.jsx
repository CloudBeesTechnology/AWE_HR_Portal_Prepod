import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const Termination = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Emp ID",
    "Badge No",
    "Nationality",
    "Department",
    "Work Position",
    "Date of Termination",
    "Reason of Termination",
  ]);

  // Generate table body dynamically from mergedData
  const resignationMergedData = (data) => {
    return data
      .filter((item) => item.termiDate) // Only include items with termiDate
      .map((item) => ({
        name: item.name || "-",
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        nationality: item.nationality || "-",
        position: item.position || "-",
        department: item.department || "-",
        termiDate: item.termiDate || "-", // Corrected to display termination date
        termiNotProb: item.termiNotProb || "-", // Corrected to display termination note (if any)
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























// import React, { useEffect, useState } from 'react'
// import { FilterTable } from './FilterTable'

// export const Termination = ({allData,typeOfReport,reportTitle}) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead, setTableHead] = useState([
//     "Name",
//     "Emp ID",
//     "Badge No",
//     "Nationality",
//     "Department",
//     "workPosition",
//     "Date of Termination",
//     "Reason of Termination",]);

//   // Generate table body dynamically from mergedData
//   const terminationMergedData = (data) => {
//     return data
    
//     .filter((item) => item.termiDate) // Only include items with resignDate
    
//     .map((item) => [        
//         item.name || "-",
//         item.empID || "-",
//         item.empBadgeNo || "-",
//         item.nationality || "-",
//         item.position || "-",
//         item.department || "-",
//         item.termiDate || "-",
//         item.termiNotProb || "-",,
//     ]);
//   };

//   useEffect(()=>{
    
//       setTableBody(terminationMergedData(allData))
//     },[allData])
// console.log(tableBody);

//   return (
//     <div>

//       <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle}/>
//     </div>
//   )
// }
