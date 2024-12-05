// import React, { useEffect, useState } from 'react';
// import { FilterTable } from './FilterTable';

// export const EmpPE = ({ allData, typeOfReport, reportTitle }) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead, setTableHead] = useState([
//     "Name",
//     "Emp ID",
//     "Employee Badge",
//     "Nationality",
//     "Date of Join",
//     "Work Position",
//     "Department",
//     "Pass Expiry",
//   ]);

//   const formatDate = (date, type) => {
//     console.log(date, type);
  
//     if (Array.isArray(date)) {
//       if (date.length === 0) return "-"; // Handle empty arrays
//       const lastDate = date[date.length - 1]; // Get the last element
//       return formatDate(lastDate, type); // Recursively format the last date
//     }
  
//     if (!date) return "-"; // Handle empty or invalid dates
//     const parsedDate = new Date(date);
//     if (isNaN(parsedDate.getTime())) return "-"; // Handle invalid date strings
  
//     const day = String(parsedDate.getDate()).padStart(2, "0");
//     const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//     const year = parsedDate.getFullYear();
  
//     return `${day}-${month}-${year}`;
//   };
//   // Function to filter and map data for employees with pass expiry within one month
//   const empPassMergedData = (data) => {
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Set the date to one month ago
    
//     return data
//       .filter((item) => {
//         const contractEndDates = item.empPassExp || []; // Ensure empPassExp is an array
//         const lastDate = contractEndDates[contractEndDates.length - 1]; // Get the last date
        
//         if (!lastDate) return false; // Exclude items with no empPassExp dates
        
//         const parsedDate = new Date(lastDate);
//         if (isNaN(parsedDate.getTime())) return false; // Exclude invalid dates
        
//         return parsedDate >= oneMonthAgo && parsedDate <= new Date(); // Check if within the last month
//       })
//       .map((item) => {
//         const contractEndDates = item.empPassExp || [];
//         const lastDate = contractEndDates[contractEndDates.length - 1];
  
//         return [
//           item.name || "-",
//           item.empID || "-",
//           item.empBadgeNo || "-",
//           item.nationality || "-",
//           formatDate(item.doj) || "-", // Format the Date of Joining
//           item.position || "-",
//           item.department || "-",
//           formatDate(lastDate) || "-", // Format the empPassExp date
//         ];
//       });
//   };
  

//   useEffect(() => {
//     if (allData && allData.length > 0) {
//       setTableBody(empPassMergedData(allData));
//     }
//   }, [allData]);

//   console.log("Filtered Table Data:", tableBody); // Debugging output

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
// // import React, { useEffect, useState } from 'react'
// // import { FilterTable } from './FilterTable'

// // export const EmpPE = ({allData,typeOfReport,reportTitle}) => {
// //   const [tableBody, setTableBody] = useState([]);
// //   const [tableHead, setTableHead] = useState([
// //     "Name",
// //       "Employee Badge",
// //       "Nationality",
// //       "Work Position",
// //       "Department",
// //       "Pass Expiry",]);

// //   // Helper function to check if the expiry is within one month or less from today
// //   const isWithinOneMonth = (expiryDate) => {
// //     if (!expiryDate) return false;

// //     const today = new Date();
// //     const expiry = new Date(expiryDate);

// //     const timeDiff = expiry.getTime() - today.getTime();
// //     const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

// //     return daysDiff <= 30 && daysDiff >= 0;
// //   };

// //   const empPassMergedData = (data) => {
// //     const filteredData = data.filter(item => isWithinOneMonth(item.empPassExpiry));

// //   //   // Map the filtered data to the table format
// //     return filteredData.map((item) => [
// //       item.name || "-",
// //       item.empBadgeNo || "-",
// //       item.nationality || "-",
// //       item.position || "-",
// //       item.department || "-",
// //       item.empPassExpiry || "-",
// //     ]);
// //   };

// //   useEffect(()=>{
    
// //       setTableBody(empPassMergedData(allData))
// //     },[allData])
// // console.log(tableBody);

// //   return (
// //     <div>

// // <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle}/>
// // </div>
// //   )
// // }


// //   // Helper function to check if the expiry is within one month or less from today
// //   // const isWithinOneMonth = (expiryDate) => {
// //   //   if (!expiryDate) return false;

// //   //   const today = new Date();
// //   //   const expiry = new Date(expiryDate);

// //   //   // Calculate the difference in months between today and the expiry date
// //   //   const timeDiff = expiry.getTime() - today.getTime();
// //   //   const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

// //   //   // Check if the expiry is within one month (30 days)
// //   //   return daysDiff <= 30 && daysDiff >= 0;
// //   // };

// //   // Generate table body dynamically from mergedData and filter for 1 month or less expiry
// //   // const empPassMergedData = (data) => {
// //   //   // Filter data to include only those with expiry dates within one month or less
// //   //   const filteredData = data.filter(item => isWithinOneMonth(item.employmentPassExpiry));

// //   //   // Map the filtered data to the table format
// //   //   return filteredData.map((item) => [
// //   //     item.name || "-",
// //   //     item.employeeBadgeNumber || "-",
// //   //     item.nationality || "-",
// //   //     item.workPosition || "-",
// //   //     item.department || "-",
// //   //     item.employmentPassExpiry || "-",
// //   //   ]);
// //   // };


import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const EmpPE = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Emp ID",
    "Employee Badge",
    "Nationality",
    "Date of Join",
    "Work Position",
    "Department",
    "Pass Expiry",
  ]);

  const formatDate = (date) => {
    if (!date) return "-";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-";
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const isOneMonthBefore = (expiryDate) => {
    if (!expiryDate) return false;

    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const expiry = new Date(expiryDate);

    // Check if expiry date is on or before one month ago
    return expiry <= oneMonthAgo;
  };

  const empPassMergedData = (data) => {
    return data
      .filter((item) => {
        // Ensure empPassExp is a valid array with non-empty and valid date entries
        return (
          Array.isArray(item.empPassExp) &&
          item.empPassExp.length > 0 &&
          item.empPassExp.every(
            (date) => date && !isNaN(new Date(date).getTime())
          )
        );
      })
      .filter((item) => {
        const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
        return isOneMonthBefore(lastPassExp);
      })
      .map((item) => {
        const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
        return [
          item.name || "-",
          item.empID || "-",
          item.empBadgeNo || "-",
          item.nationality || "-",
          formatDate(item.doj) || "-",
          item.position || "-",
          item.department || "-",
          formatDate(lastPassExp) || "-",
        ];
      });
  };

  useEffect(() => {
    if (allData && allData.length > 0) {
      setTableBody(empPassMergedData(allData));
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
