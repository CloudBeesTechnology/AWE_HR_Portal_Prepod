// import React, { useEffect, useState } from 'react';
// import { FilterTable } from './FilterTable';

// export const LDexpiry = ({ allData, typeOfReport, reportTitle }) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead] = useState([
//     "Name",
//     "Employee Badge",
//     "Nationality",
//     "Work Position",
//     "Department",
//     "LD Approved",
//     "LD Expiry",
//   ]);

//   const isWithinThreeMonths = (expiryDate) => {
//     if (!expiryDate) return false;

//     const today = new Date();
//     const expiry = new Date(expiryDate);

//     if (isNaN(expiry.getTime())) {
//       console.error("Invalid date format:", expiryDate);
//       return false;
//     }

//     const timeDiff = expiry.getTime() - today.getTime();
//     const daysDiff = timeDiff / (1000 * 3600 * 24);

//     return daysDiff <= 90 && daysDiff >= 0;
//   };

//   const probationReviewMergedData = (data) => {
//     const filteredData = data.filter((item) => 
//       isWithinThreeMonths(item.nlmsEmpValid)
//     );

//     console.log("Filtered Data:", filteredData); // Debug filtered data

//     return filteredData.map((item) => ({
//       name: item.name || "-",
//       empBadgeNo: item.empBadgeNo || "-",
//       nationality: item.nationality || "-",
//       position: item.position || "-",
//       department: item.department || "-",
//       nlmsEmpApproval: item.nlmsEmpApproval || "-",
//       nlmsEmpValid: item.nlmsEmpValid || "-",
//     }));
//   }

//   useEffect(() => {
//     if (allData && Array.isArray(allData)) {
//       setTableBody(probationReviewMergedData(allData));
//     } else {
//       console.warn("Invalid or missing allData:", allData);
//     }
//   }, []);

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
import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";

export const LDexpiry = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead] = useState([
    "Name",
    "Employee Badge",
    "Nationality",
    "Work Position",
    "Department",
    "LD Approved",
    "LD Expiry",
  ]);

  // Check if the last value of nlmsEmpValid is within three months
  const isWithinThreeMonths = (expiryDates) => {
    if (!Array.isArray(expiryDates) || expiryDates.length === 0) return false;

    const lastExpiryDateStr = expiryDates[expiryDates.length - 1];
    const today = new Date();
    const expiry = new Date(lastExpiryDateStr);

    if (isNaN(expiry.getTime())) {
      console.error("Invalid date format:", lastExpiryDateStr);
      return false;
    }

    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    return daysDiff <= 90 && daysDiff >= 0; // Within 3 months
  };

  // Filter and transform data
  const probationReviewMergedData = (data) => {
    const filteredData = data.filter((item) =>
      isWithinThreeMonths(item.nlmsEmpValid)
    );

    console.log("Filtered Data:", filteredData); // Debug filtered data

    return filteredData.map((item) => ({
      name: item.name || "-",
      empBadgeNo: item.empBadgeNo || "-",
      nationality: item.nationality || "-",
      position: item.position || "-",
      department: item.department || "-",
      nlmsEmpApproval: Array.isArray(item.nlmsEmpApproval)
      ? item.nlmsEmpApproval[item.nlmsEmpApproval.length - 1] || "-"
      : "-",
      nlmsEmpValid: Array.isArray(item.nlmsEmpValid)
        ? item.nlmsEmpValid[item.nlmsEmpValid.length - 1] || "-"
        : "-", 
    }));
  };

  useEffect(() => {
    if (allData && Array.isArray(allData)) {
      setTableBody(probationReviewMergedData(allData));
    } else {
      console.warn("Invalid or missing allData:", allData);
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
