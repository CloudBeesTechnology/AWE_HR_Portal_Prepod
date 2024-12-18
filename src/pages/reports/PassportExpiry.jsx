
import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";

export const PassportExpiry = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Employee Badge",
    "Nationality",
    "Department",
    "Position",
    "Passport Expiry",
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


  // Function to filter data for the current month (1 year after today)
  const filterPassportExpiry = (data) => {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-indexed (0 = January, 11 = December)
    const nextYear = today.getFullYear() + 1; // Next year

    return data.filter((item) => {
      if (!Array.isArray(item.ppExpiry) || item.ppExpiry.length === 0) {
        return false; // Skip if ppExpiry is not an array or is empty
      }

      // Get the last value from the ppExpiry array
      const lastExpiryDateStr = item.ppExpiry[item.ppExpiry.length - 1];
      const lastExpiryDate = new Date(lastExpiryDateStr);

      if (isNaN(lastExpiryDate)) {
        console.warn(`Invalid date format in ppExpiry: ${lastExpiryDateStr}`);
        return false; // Skip invalid dates
      }

      const expiryMonth = lastExpiryDate.getMonth(); // 0-indexed month
      const expiryYear = lastExpiryDate.getFullYear();

      // Match current month & next year
      return expiryMonth === currentMonth && expiryYear === nextYear;
    });
  };

  useEffect(() => {
    const filteredData = filterPassportExpiry(allData).map((item) => ({
      name: item.name || "-",
      empBadgeNo: item.empBadgeNo || "-",
      nationality: item.nationality || "-",
      department: item.department || "-",
      position: item.position || "-",
      ppExpiry:  Array.isArray(item.ppExpiry)
      ? formatDate(item.ppExpiry[item.ppExpiry.length - 1])
      : "-",
    }));

    setTableBody(filteredData);
  }, [allData]);

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

// export const PassportExpiry = ({allData,typeOfReport,reportTitle}) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead, setTableHead] = useState([
//        "Name",
//     "Employee Badge",
//     "Nationality",
//     "Department",
//     "Position",
//     "Passport Expiry",
//     // "Deadline to return HRD",
//   ]);

//   // Generate table body dynamically from mergedData
//   const probationReviewMergedData = (data) => {
//     return data.map((item) => {
//       return {
//         name: item.name || "-",
//         empBadgeNo: item.empBadgeNo || "-",
//         nationality: item.nationality || "-",
//         department: item.department || "-",
//         position: item.position || "-",
//         ppExpiry: item.ppExpiry || "-",  
//         // deadlineToReturnHRD: item.deadlineToReturnHRD || "-", // Ensure correct field
//       };
//     });
//   };
  

//   useEffect(()=>{
    
//       setTableBody(probationReviewMergedData(allData))
//     },[allData])
// console.log(tableBody);

//   return (
//     <div>

//       <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle}/>
//     </div>
//   )
// }


// import React, { useEffect, useState } from "react";
// import { FilterTable } from "./FilterTable";

// export const PassportExpiry = ({ allData, typeOfReport, reportTitle }) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead, setTableHead] = useState([
//     "Name",
//     "Employee Badge",
//     "Nationality",
//     "Department",
//     "Position",
//     "Passport Expiry",
//   ]);

//   // Function to filter data for the current month (1 year after today)
//   const filterPassportExpiry = (data) => {
//     const today = new Date();
//     const currentMonth = today.getMonth(); // 0-indexed (0 = January, 11 = December)
//     const nextYear = today.getFullYear() + 1; // Next year

//     return data.filter((item) => {
//       if (!item.ppExpiry) return false; // Skip if no expiry date

//       // Parse `ppExpiry` as a date
//       const ppExpiryDate = new Date(item.ppExpiry);

//       if (isNaN(ppExpiryDate)) {
//         console.warn(`Invalid date format for ppExpiry: ${item.ppExpiry}`);
//         return false; // Skip invalid dates
//       }

//       const expiryMonth = ppExpiryDate.getMonth(); // 0-indexed month
//       const expiryYear = ppExpiryDate.getFullYear();

//       // Match current month & next year
//       return expiryMonth === currentMonth && expiryYear === nextYear;
//     });
//   };

//   useEffect(() => {
//     const filteredData = filterPassportExpiry(allData).map((item) => ({
//       name: item.name || "-",
//       empBadgeNo: item.empBadgeNo || "-",
//       nationality: item.nationality || "-",
//       department: item.department || "-",
//       position: item.position || "-",
//       ppExpiry: item.ppExpiry || "-",
//     }));

//     setTableBody(filteredData);
//   }, [allData]);

//   return (
//     <div>
//       <FilterTable
//         tableBody={tableBody}
//         tableHead={tableHead}
//         typeOfReport={typeOfReport}
//         reportTitle={reportTitle}
//       />
//     </div>
//   );
// };