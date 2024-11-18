import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const EmpPE = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Employee Badge",
    "Nationality",
    "Work Position",
    "Department",
    "Pass Expiry",
  ]);

  // Helper function to check if the expiry date is within one month or less from today
  const isWithinOneMonth = (expiryDate) => {
    if (!expiryDate) return false;

    const today = new Date();
    const expiry = new Date(expiryDate);

    // Calculate the time difference in days
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    return daysDiff <= 30 && daysDiff >= 0;
  };

  // Function to filter and map data for employees with pass expiry within one month
  const empPassMergedData = (data) => {
    return data
      .filter((item) => isWithinOneMonth(item.empPassExp))
      .map((item) => [
        item.name || "-",
        item.empBadgeNo || "-",
        item.nationality || "-",
        item.position || "-",
        item.department || "-",
        item.empPassExp || "-",
      ]);
  };

  useEffect(() => {
    if (allData && allData.length > 0) {
      setTableBody(empPassMergedData(allData));
    }
  }, [allData]);

  console.log("Filtered Table Data:", tableBody); // Debugging output

  return (
    <div>
      <FilterTable 
        tableBody={tableBody} 
        tableHead={tableHead} 
        typeOfReport={typeOfReport} 
        reportTitle={reportTitle} 
      />
    </div>
  );
};
// import React, { useEffect, useState } from 'react'
// import { FilterTable } from './FilterTable'

// export const EmpPE = ({allData,typeOfReport,reportTitle}) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead, setTableHead] = useState([
//     "Name",
//       "Employee Badge",
//       "Nationality",
//       "Work Position",
//       "Department",
//       "Pass Expiry",]);

//   // Helper function to check if the expiry is within one month or less from today
//   const isWithinOneMonth = (expiryDate) => {
//     if (!expiryDate) return false;

//     const today = new Date();
//     const expiry = new Date(expiryDate);

//     const timeDiff = expiry.getTime() - today.getTime();
//     const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

//     return daysDiff <= 30 && daysDiff >= 0;
//   };

//   const empPassMergedData = (data) => {
//     const filteredData = data.filter(item => isWithinOneMonth(item.empPassExpiry));

//   //   // Map the filtered data to the table format
//     return filteredData.map((item) => [
//       item.name || "-",
//       item.empBadgeNo || "-",
//       item.nationality || "-",
//       item.position || "-",
//       item.department || "-",
//       item.empPassExpiry || "-",
//     ]);
//   };

//   useEffect(()=>{
    
//       setTableBody(empPassMergedData(allData))
//     },[allData])
// console.log(tableBody);

//   return (
//     <div>

// <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle}/>
// </div>
//   )
// }


//   // Helper function to check if the expiry is within one month or less from today
//   // const isWithinOneMonth = (expiryDate) => {
//   //   if (!expiryDate) return false;

//   //   const today = new Date();
//   //   const expiry = new Date(expiryDate);

//   //   // Calculate the difference in months between today and the expiry date
//   //   const timeDiff = expiry.getTime() - today.getTime();
//   //   const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

//   //   // Check if the expiry is within one month (30 days)
//   //   return daysDiff <= 30 && daysDiff >= 0;
//   // };

//   // Generate table body dynamically from mergedData and filter for 1 month or less expiry
//   // const empPassMergedData = (data) => {
//   //   // Filter data to include only those with expiry dates within one month or less
//   //   const filteredData = data.filter(item => isWithinOneMonth(item.employmentPassExpiry));

//   //   // Map the filtered data to the table format
//   //   return filteredData.map((item) => [
//   //     item.name || "-",
//   //     item.employeeBadgeNumber || "-",
//   //     item.nationality || "-",
//   //     item.workPosition || "-",
//   //     item.department || "-",
//   //     item.employmentPassExpiry || "-",
//   //   ]);
//   // };