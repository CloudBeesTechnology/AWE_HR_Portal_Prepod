
import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";

export const EmploymentMedical = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead] = useState([
   "Name",
    "Employee Badge",
    "Nationality",
    "Work Position",
    "Department",
    "Medical Expiry",
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


    const isInNextMonth = (expiryDate) => {
      if (!expiryDate) return false;
  
      const expiry = new Date(expiryDate);
      const today = new Date();
  
      // Calculate the start and end of the next month
      const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1); // First day of next month
      const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() - 4, 0);  // Last day of next month
  
      // Check if expiry date falls in the next month
      return expiry >= startOfNextMonth && expiry <= endOfNextMonth;
    };
    const medicalReviewMergedData = (data) => {
      return data
        .filter((item) => {
          // Log the bruneiME array for each item to see its contents
          console.log("bruneiME array for item:", item.name, item.bruneiME);
    
          // Ensure bruneiME is a valid array with non-empty and valid date entries
          return (
            Array.isArray(item.bruneiME) &&
            item.bruneiME.length > 0 &&
            item.bruneiME.every((date) => date && !isNaN(new Date(date).getTime()))
          );
        })
        .filter((item) => {
          const lastPassExp = item.bruneiME[item.bruneiME.length - 1];
          
          // Log the last expiration date for debugging
          console.log("Last Pass Expiration Date:", lastPassExp);
          
          return isInNextMonth(lastPassExp);
        })
        .map((item) => {
          const lastPassExp = item.bruneiME[item.bruneiME.length - 1];
          
          // Log the formatted last expiration date
          console.log("Formatted Expiration Date:", formatDate(lastPassExp));
          
          return {
            name: item.name || "-",
            empBadgeNo: item.empBadgeNo || "-",
            nationality: item.nationality || "-",
            position: item.position || "-",
            department: item.department || "-",
            bruneiME: formatDate(lastPassExp) || "-",
          };
        });
    };
  
    useEffect(() => {
      if (allData ) {
        setTableBody(medicalReviewMergedData(allData));
      }
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

// import React, { useEffect, useState } from "react";
// import { FilterTable } from "./FilterTable";

// export const EmploymentMedical = ({ allData, typeOfReport, reportTitle }) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead, setTableHead] = useState([
//     "Name",
//     "Employee Badge",
//     "Nationality",
//     "Work Position",
//     "Department",
//     "Medical Expiry",
//   ]);

//   const employeeMedicalMergedData = (data) => {
//     const filteredData = data?.filter((item) => item.bruneiME) || []; // Keep only items with a valid bruneiME

//     return filteredData
//       .map((item) => {
//         const filteringDate = new Date(item.bruneiME[item.bruneiME.length - 1]);
//         const currentDate = new Date();
//         const currentMonth = currentDate.getMonth(); // Get the current month (0-11)
//         const currentYear = currentDate.getFullYear(); // Get the current year

//         // Calculate the expiry date range (3 months ahead)
//         const expiryMonth = currentMonth + 3;
//         const expiryYear = expiryMonth >= 12 ? currentYear + 1 : currentYear; // If expiryMonth is greater than December, it's next year
//         const expiryMonthAdjusted = expiryMonth % 12;
//         const startDate = new Date(expiryYear, expiryMonthAdjusted, 3); // Start of the expiry range (e.g., 1st Feb)
//         const endDate = new Date(expiryYear, expiryMonthAdjusted + 3, 0);
//         if (filteringDate >= startDate && filteringDate <= endDate) {
//           console.log(filteringDate);
//         }
//         // Check if the expiry date is within the last three months
//         // if (expiryDate) {
//         //   return {
//         //     name: item.name || "-",
//         //     empBadgeNo: item.empBadgeNo || "-",
//         //     nationality: item.nationality || "-",
//         //     position: item.position || "-",
//         //     department: item.department || "-",
//         //     bruneiME: item.bruneiME || "-",
//         //   };
//         // }
//         return null; // Exclude items outside the last three months
//       })
//       .filter((item) => item !== null); // Remove null values
//   };

//   useEffect(() => {
//     setTableBody(employeeMedicalMergedData(allData));
//   }, [allData]);

//   // console.log(tableBody);

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




// import React, { useEffect, useState } from 'react';
// import { FilterTable } from './FilterTable';

// export const EmploymentMedical = ({ allData, typeOfReport, reportTitle }) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead, setTableHead] = useState([
//     "Name",
//     "Employee Badge",
//     "Nationality",
//     "Work Position",
//     "Department",
//     "Medical Expiry",
//   ]);

//   const employeeMedicalMergedData = (data) => {


//     const filteredData = data?.filter(item => item.bruneiME) || []; // Keep only items with a valid bruneiME

//     return filteredData.map((item) => {
//       const expiryDate = new Date(item.bruneiME);
//       // Check if the expiry date is within the last three months
//       if (expiryDate ) {
//         return {
//           name: item.name || "-",
//           empBadgeNo: item.empBadgeNo || "-",
//           nationality: item.nationality || "-",
//           position: item.position || "-",
//           department: item.department || "-",
//           bruneiME: item.bruneiME || "-",
//         };
//       }
//       return null; // Exclude items outside the last three months
//     }).filter(item => item !== null); // Remove null values
//   };

//   useEffect(() => {
//     setTableBody(employeeMedicalMergedData(allData));
//   }, [allData]);

//   console.log(tableBody);

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