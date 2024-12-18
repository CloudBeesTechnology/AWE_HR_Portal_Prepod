import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const ContractReview = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead] = useState([
    "Name",
    "Emp ID",
    "Employee Badge",
    "Nationality",
    "Date of Joined",
    "Department",
    "Work Position",
    "Contract Start Date",
    "Contract End Date",
    // "LD Expiry",
    "Duration of Renewal Contract",
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

  const calculateTotalMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "-";
    }
  
    return (
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth())
    );
  };
  
  const calculateBalanceMonths = (startDate, endDate) => {
    const today = new Date();
    const totalMonths = calculateTotalMonths(startDate, endDate);
    const completedMonths = calculateTotalMonths(startDate, today);
  
    if (typeof totalMonths === "string" || typeof completedMonths === "string") {
      return "-";
    }
  
    const balanceMonths = totalMonths - completedMonths;
    return (balanceMonths >= 0 && balanceMonths !== 0) ? `${balanceMonths} months` : "Few days more";
  };
  
  const contractExpiryMergedData = (data) => {
    const today = new Date();
  
    // Start date should be the first day of the next month (excluding current month)
    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    
    // End date should be the last day of the second month after today
    const endOfTwoMonthsAfter = new Date(today.getFullYear(), today.getMonth() + 3, 0);
  
    return data
      .filter((item) => {
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        if (!lastDate) return false;
  
        const contractEnd = new Date(lastDate);
  
        // Check if the contractEndDate is between the start of next month and the last day of two months after today
        return contractEnd >= startOfNextMonth && contractEnd <= endOfTwoMonthsAfter;
      })
      .map((item) => {
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];
  
        const balanceMonths = calculateBalanceMonths(startDate, lastDate);
  
        return {
          name: item.name || "-",
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          nationality: item.nationality || "-",
          doj: formatDate(item.doj) || "-",
          department: item.department || "-",
          position: item.position || "-",
          contractStartDate: formatDate(startDate) || "-",
          contractEndDate: formatDate(lastDate) || "-",
          // nlmsEmpValid: Array.isArray(item.nlmsEmpValid)
          //   ? formatDate(item.nlmsEmpValid[item.nlmsEmpValid.length - 1])
          //   : "-",
          balanceMonths: balanceMonths,
        };
      });
  };
  

  useEffect(() => {
    if (allData) {
      setTableBody(contractExpiryMergedData(allData));
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
// import React, { useEffect, useState } from 'react';
// import { FilterTable } from './FilterTable';

// export const ContractReview = ({ allData, typeOfReport, reportTitle }) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead] = useState([
//     "Name",
//     "Emp ID",
//     "Employee Badge",
//     "Nationality",
//     "Date of Joined",
//     "Department",
//     "Work Position",
//     "Contract Start Date",
//     "Contract End Date",
//     "LD Expiry",
//     "Duration of Renewal Contract",
//   ]);

//   const formatDate = (date, type) => {
//     // console.log(date, type);
  
//     // Handle array of dates
//     if (Array.isArray(date)) {
//       if (date.length === 0) return "-"; // Handle empty arrays
//       const lastDate = date[date.length - 1]; // Get the last element
//       return formatDate(lastDate, type); // Recursively format the last date
//     }
  
//     // Handle single date
//     if (!date) return "-"; // Handle empty or invalid dates
//     const parsedDate = new Date(date);
//     if (isNaN(parsedDate.getTime())) return "-"; // Handle invalid date strings
  
//     // Format date as dd-mm-yyyy
//     const day = String(parsedDate.getDate()).padStart(2, "0");
//     const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//     const year = parsedDate.getFullYear();
  
//     return `${day}-${month}-${year}`;
//   };
  
//   const calculateTotalMonths = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//       return "-"; // Return "-" if any date is invalid
//     }

//     return (
//       (end.getFullYear() - start.getFullYear()) * 12 +
//       (end.getMonth() - start.getMonth())
//     );
//   };

//   const calculateBalanceMonths = (startDate, endDate) => {
//     const today = new Date(); // Current date
//     const totalMonths = calculateTotalMonths(startDate, endDate);
//     const completedMonths = calculateTotalMonths(startDate, today);

//     if (typeof totalMonths === "string" || typeof completedMonths === "string") {
//       return "-"; // Return "-" if calculation is invalid
//     }

//     const balanceMonths = totalMonths - completedMonths;
//     return (balanceMonths >= 0 && balanceMonths !== 0) ? `${balanceMonths} months` : "Few days more"; // Return "-" if balance is negative
//   };

  
//   const contractExpiryMergedData = (data) => {
//     const today = new Date(); // Current date for comparison
  
//     return data
//       .filter((item) => {
//         const contractEndDates = item.contractEnd || []; // Ensure it's an array
//         const lastDate = contractEndDates[contractEndDates.length - 1]; // Get the last date
//         return lastDate && new Date(lastDate) >= today; // Include only valid dates
//       })
//       .map((item) => {
//         const contractEndDates = item.contractEnd || [];
//         const lastDate = contractEndDates[contractEndDates.length - 1]; // Get the last element safely
//         const contractStartDates = item.contractStart || [];
//         const startDate = contractStartDates[contractStartDates.length - 1]; // Get the last element safely
  
//         const balanceMonths = calculateBalanceMonths(startDate, lastDate);
  
//         // Return an object with keys for each field instead of an array
//         return {
//           name: item.name || "-",
//           empID: item.empID || "-",
//           empBadgeNo: item.empBadgeNo || "-",
//           nationality: item.nationality || "-",
//           doj: formatDate(item.doj) || "-", // Format Date of Joining
//           department: item.department || "-",
//           position: item.position || "-",
//           contractStartDate: formatDate(startDate) || "-", // Format Contract Start Date
//           contractEndDate: formatDate(lastDate) || "-", // Format Contract End Date
//           nlmsEmpValid: Array.isArray(item.nlmsEmpValid)
//         ? formatDate(item.nlmsEmpValid[item.nlmsEmpValid.length - 1])
//         : "-",
//           balanceMonths: balanceMonths, // Store the calculated balance months
//         };
//       });
//   };
  
//   useEffect(() => {
//     if (allData) {
//       setTableBody(contractExpiryMergedData(allData));
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
