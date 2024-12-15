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

  // Format date to DD-MM-YYYY
  const formatDate = (date) => {
    if (!date) return "-";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-";
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Check if the date is strictly in the next month
  const isInNextMonth = (expiryDate) => {
    if (!expiryDate) return false;

    const expiry = new Date(expiryDate);
    const today = new Date();

    // Calculate the start and end of the next month
    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1); // First day of next month
    const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);  // Last day of next month

    // Check if expiry date falls in the next month
    return expiry >= startOfNextMonth && expiry <= endOfNextMonth;
  };

  // Filter and map the employee pass data
  const empPassMergedData = (data) => {
    return data
      .filter((item) => {
        // Ensure empPassExp is a valid array with non-empty and valid date entries
        return (
          Array.isArray(item.empPassExp) &&
          item.empPassExp.length > 0 &&
          item.empPassExp.every((date) => date && !isNaN(new Date(date).getTime()))
        );
      })
      .filter((item) => {
        const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
        return isInNextMonth(lastPassExp);
      })
      .map((item) => {
        const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
        return {
          name: item.name || "-",
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          nationality: item.nationality || "-",
          doj: formatDate(item.doj) || "-",
          position: item.position || "-",
          department: item.department || "-",
          empPassExp: formatDate(lastPassExp) || "-",
        };
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

// // import React, { useEffect, useState } from 'react';
// // import { FilterTable } from './FilterTable';

// // export const EmpPE = ({ allData, typeOfReport, reportTitle }) => {
// //   const [tableBody, setTableBody] = useState([]);
// //   const [tableHead, setTableHead] = useState([
// //     "Name",
// //     "Emp ID",
// //     "Employee Badge",
// //     "Nationality",
// //     "Date of Join",
// //     "Work Position",
// //     "Department",
// //     "Pass Expiry",
// //   ]);

// //   const formatDate = (date) => {
// //     if (!date) return "-";
// //     const parsedDate = new Date(date);
// //     if (isNaN(parsedDate.getTime())) return "-";
// //     const day = String(parsedDate.getDate()).padStart(2, "0");
// //     const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
// //     const year = parsedDate.getFullYear();
// //     return `${day}-${month}-${year}`;
// //   };

// //   const isOneMonthBefore = (expiryDate) => {
// //     if (!expiryDate) return false;

// //     const today = new Date();
// //     const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
// //     const expiry = new Date(expiryDate);

// //     // Check if expiry date is on or before one month ago
// //     return expiry <= oneMonthAgo;
// //   };

// //   const empPassMergedData = (data) => {
// //     return data
// //       .filter((item) => {
// //         // Ensure empPassExp is a valid array with non-empty and valid date entries
// //         return (
// //           Array.isArray(item.empPassExp) &&
// //           item.empPassExp.length > 0 &&
// //           item.empPassExp.every(
// //             (date) => date && !isNaN(new Date(date).getTime())
// //           )
// //         );
// //       })
// //       .filter((item) => {
// //         const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
// //         return isOneMonthBefore(lastPassExp);
// //       })
// //       .map((item) => {
// //         const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
// //         return {
// //           name: item.name || "-",
// //           empID: item.empID || "-",
// //           empBadgeNo: item.empBadgeNo || "-",
// //           nationality: item.nationality || "-",
// //           doj: formatDate(item.doj) || "-",
// //           position: item.position || "-",
// //           department: item.department || "-",
// //           empPassExp: formatDate(lastPassExp) || "-",
// //         };
// //       });
// //   };
  
// //   useEffect(() => {
// //     if (allData && allData.length > 0) {
// //       setTableBody(empPassMergedData(allData));
// //     }
// //   }, [allData]);

// //   return (
// //     <div>
// //       <FilterTable
// //         tableBody={tableBody}
// //         tableHead={tableHead}
// //         typeOfReport={typeOfReport}
// //         reportTitle={reportTitle}
// //       />
// //     </div>
// //   );
// // };
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

//   // Format date to DD-MM-YYYY
//   const formatDate = (date) => {
//     if (!date) return "-";
//     const parsedDate = new Date(date);
//     if (isNaN(parsedDate.getTime())) return "-";
//     const day = String(parsedDate.getDate()).padStart(2, "0");
//     const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
//     const year = parsedDate.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   // Check if the date is within the current month or one month after
//   const isInCurrentOrNextMonth = (expiryDate) => {
//     if (!expiryDate) return false;

//     const expiry = new Date(expiryDate);
//     const today = new Date();
//     const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the current month
//     const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0); // End of the next month

//     return expiry >= currentMonth && expiry <= nextMonth;
//   };

//   // Filter and map the employee pass data
//   const empPassMergedData = (data) => {
//     return data
//       .filter((item) => {
//         // Ensure empPassExp is a valid array with non-empty and valid date entries
//         return (
//           Array.isArray(item.empPassExp) &&
//           item.empPassExp.length > 0 &&
//           item.empPassExp.every((date) => date && !isNaN(new Date(date).getTime()))
//         );
//       })
//       .filter((item) => {
//         const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
//         return isInCurrentOrNextMonth(lastPassExp);
//       })
//       .map((item) => {
//         const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
//         return {
//           name: item.name || "-",
//           empID: item.empID || "-",
//           empBadgeNo: item.empBadgeNo || "-",
//           nationality: item.nationality || "-",
//           doj: formatDate(item.doj) || "-",
//           position: item.position || "-",
//           department: item.department || "-",
//           empPassExp: formatDate(lastPassExp) || "-",
//         };
//       });
//   };

//   useEffect(() => {
//     if (allData && allData.length > 0) {
//       setTableBody(empPassMergedData(allData));
//     }
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
