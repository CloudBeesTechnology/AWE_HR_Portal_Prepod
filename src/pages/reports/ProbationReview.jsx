// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const ProbationReview = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Employee Badge",
    "Date of Joined",
    "Department",
    "Work Position",
    "Probation Expiry Date",
    "Deadline to Return to HRD",
  ]);

  // Helper function to calculate the deadline by subtracting 7 days from probationEnd
  const calculateDeadline = (probationEndDate) => {
    const date = new Date(probationEndDate);
    date.setDate(date.getDate() - 7); // Subtract 7 days from probationEnd date
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  // Function to check if the probation expiry date is within the next 7 days
  const isExpiringWithinSevenDays = (probationEndDate) => {
    const today = new Date();
    const endDate = new Date(probationEndDate);
    const daysDifference = (endDate - today) / (1000 * 60 * 60 * 24);
    return daysDifference <= 7 && daysDifference >= 0; // Within the next 7 days
  };

  // Generate table body dynamically, filtering for items with probation expiry within 7 days
  const probationReviewMergedData = (data) => {
    return data
      .filter((item) => item.probationEnd && isExpiringWithinSevenDays(item.probationEnd)) // Filter by probationEnd within 7 days
      .map((item) => [
        item.name || "-",
        item.empBadgeNo || "-",
        item.doj || "-",
        item.department || "-",
        item.position || "-",
        item.probationEnd || "-",
        item.probationEnd ? calculateDeadline(item.probationEnd) : "-", // Calculate deadline
      ]);
  };

  useEffect(() => {
    setTableBody(probationReviewMergedData(allData));
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

// export const ProbationReview = ({ allData, typeOfReport, reportTitle }) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead, setTableHead] = useState([
//     "Name",
//     "Employee Badge",
//     "Date of Joined",
//     "Department",
//     "Work Position",
//     "Probation Expiry Date",
//     "Deadline to Return to HRD",
//   ]);

//   // Function to calculate 1 week before the probation end date
//   const calculateDeadline = (dateStr) => {
//     const probationEndDate = new Date(dateStr);
//     const oneWeekBefore = new Date(probationEndDate);
//     oneWeekBefore.setDate(probationEndDate.getDate() - 7); // Subtract 7 days

//     return oneWeekBefore.toLocaleDateString(); // Return only the last reminder date
//   };

//   // Generate table body dynamically from mergedData
//   const probationReviewMergedData = (data) => {
//     return data
//       .filter((item) => item.probationEnd) // Only include items with probationEnd
//       .map((item) => {
//         const deadline = calculateDeadline(item.probationEnd); // Get the deadline 7 days before probation end
//         return [
//           item.name || "-",
//           item.empBadgeNo || "-",
//           item.doj || "-",
//           item.department || "-",
//           item.position || "-",
//           item.probationEnd || "-",
//           deadline || "-", // Show only the last reminder date
//         ];
//       });
//   };

//   useEffect(() => {
//     setTableBody(probationReviewMergedData(allData));
//   }, [allData]);

//   return (
//     <div>
//       <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle} />
//     </div>
//   );
// };
// // import React, { useEffect, useState } from 'react'
// // import { FilterTable } from './FilterTable'

// // export const ProbationReview = ({allData,typeOfReport,reportTitle}) => {
// //   const [tableBody, setTableBody] = useState([]);
// //   const [tableHead, setTableHead] = useState([
// //        "Name",
// //     "Employee Badge",
// //     "Date of Joined",
// //     "Department",
// //     "workPosition",
// //     "Probation Expiry Date",
// //     "Deadline to return HRD",]);

// //   // Generate table body dynamically from mergedData
// //   const probationReviewMergedData = (data) => {
// //     return data
// //     .filter((item) => item.probationEnd) // Only include items with resignDate
// //     .map((item) => [  
// //       item.name || "-",
// //           item.empBadgeNo || "-",
// //           item.doj || "-",
// //           item.department || "-",
// //           item.position || "-",
// //           item.probationEnd || "-",  // Correct field reference
// //           item.deadlineToReturnHRD || "-", // Ensure correct field
// //     ]);
// //   };

// //   useEffect(()=>{
    
// //       setTableBody(probationReviewMergedData(allData))
// //     },[allData])
// // console.log(tableBody);

// //   return (
// //     <div>

// //       <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle}/>
// //     </div>
// //   )
// // }
