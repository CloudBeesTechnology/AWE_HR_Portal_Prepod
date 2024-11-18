import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

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

  const isWithinThreeMonths = (expiryDate) => {
    if (!expiryDate) return false;

    const today = new Date();
    const expiry = new Date(expiryDate);

    if (isNaN(expiry.getTime())) {
      console.error("Invalid date format:", expiryDate);
      return false;
    }

    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    return daysDiff <= 90 && daysDiff >= 0;
  };

  const probationReviewMergedData = (data) => {
    const filteredData = data.filter((item) => 
      isWithinThreeMonths(item.nlmsEmpValid)
    );

    console.log("Filtered Data:", filteredData); // Debug filtered data

    return filteredData.map((item) => [
      item.name || "-",
      item.empBadgeNo || "-",
      item.nationality || "-",
      item.position || "-",
      item.department || "-",
      item.nlmsEmpApproval || "-",
      item.nlmsEmpValid || "-",
    ]);
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

//     // Calculate the difference in days between today and the expiry date
//     const timeDiff = expiry.getTime() - today.getTime();
//     const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

//     // Check if the expiry is within three months (90 days)
//     return daysDiff <= 90 && daysDiff >= 0;
//   };

//   // Generate table body dynamically from mergedData and filter for 3 months or less expiry
//   const probationReviewMergedData = (data) => {
//     const filteredData = data.filter((item) =>
//       isWithinThreeMonths(item.nlmsEmpValid) // Filter data with expiration within 3 months
//     );

//     return filteredData.map((item) => [
//       item.name || "-",
//       item.empBadgeNo || "-",
//       item.nationality || "-",
//       item.position || "-",
//       item.department || "-",
//       item.doeEmpApproval || "-",
//       item.nlmsEmpValid || "-",
//     ]);
//   };

//   useEffect(() => {
//     setTableBody(probationReviewMergedData(allData)); // Set the table body data on component mount or when data changes
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