// // import React, { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';
// import { FilterTable } from './FilterTable';

// export const ProbationReview = ({ allData, typeOfReport, reportTitle }) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead, setTableHead] = useState([
//     "Name",
//     "Emp ID",
//     "Employee Badge",
//     "Date of Joined",
//     "Department",
//     "Work Position",
//     "Probation Expiry Date",
//     "Deadline to Return to HRD",
//   ]);

//   // Helper function to calculate the deadline by subtracting 7 days from probationEnd
//   const calculateDeadline = (probationEndDate) => {
//     const date = new Date(probationEndDate);
//     date.setDate(date.getDate() - 7); // Subtract 7 days from probationEnd date
//     return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
//   };

//   // Generate table body dynamically using the last value of probationEnd
//   const probationReviewMergedData = (data) => {
//     return data
//       .filter((item) => 
//         Array.isArray(item.probationEnd) && item.probationEnd.length > 0 // Check if probationEnd is a valid array
//       )
//       .map((item) => {
//         const lastDate = item.probationEnd[item.probationEnd.length - 1]; // Get the last value
//         return [
//           item.name || "-",
//           item.empID || "-",
//           item.empBadgeNo || "-",
//           item.doj || "-",
//           item.department || "-",
//           item.position || "-",
//           lastDate || "-", // Use the last value
//           lastDate ? calculateDeadline(lastDate) : "-", // Calculate deadline for the last value
//         ];
//       });
//   };

//   useEffect(() => {
//     setTableBody(probationReviewMergedData(allData));
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



import React, { useEffect, useState, useRef } from "react"; 
import { FilterTable } from "./FilterTable";
import logo from "../../assets/logo/logo-with-name.svg";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { ProbationForm } from "./ProbationForm"; // Import the ProbationForm

export const ProbationReview = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Emp ID",
    "Employee Badge",
    "Date of Join",
    "Department",
    "Work Position",
    "Probation Expiry Date",
    "Deadline to Return to HRD",
    "Probation Form"
  ]);

  const [selectedPerson, setSelectedPerson] = useState(null); // State for the selected person
  const navigate = useNavigate(); // Hook for navigation

  const calculateDeadline = (probationEndDate) => {
    const date = new Date(probationEndDate);
    date.setDate(date.getDate() - 7); // Subtract 7 days from probationEnd date
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const probationReviewMergedData = (data) => {
    const today = new Date(); // Get the current date
    return data
      .filter((item) => {
        // Ensure probationEnd is a valid array with non-empty and valid date entries
        return (
          Array.isArray(item.probationEnd) &&
          item.probationEnd.length > 0 &&
          item.probationEnd.every(
            (date) => date !== "" && date !== null && !isNaN(new Date(date).getTime())
          )
        );
      })
      .filter((item) => {
        const lastDate = item.probationEnd[item.probationEnd.length - 1];
        return new Date(lastDate) >= today;
      })
      .map((item) => {
        const lastDate = item.probationEnd[item.probationEnd.length - 1];
        return [
          item.name || "-",
          item.empID || "-",
          item.empBadgeNo || "-",
          item.doj || "-",
          item.department || "-",
          item.position || "-",
          lastDate || "-", // Use the last value
          lastDate ? calculateDeadline(lastDate) : "-", // Calculate deadline for the last value
        ];
      });
  };
  

  // useEffect(() => {
  //   setTableBody(probationReviewMergedData(allData)); // Update the table body when allData changes
  // }, [allData]);

  useEffect(() => {
    const mergedData = probationReviewMergedData(allData); // Get the merged data based on allData
    setTableBody(mergedData); // Update the table body with the new data
  
    // Log the data to the console for debugging purposes
    console.log("Updated table body data:", mergedData);
  }, [allData]);
  // Function to handle viewing details
  const handleViewDetails = (personData) => {
    setSelectedPerson(personData); // Set selected person's data
  };

  const closeModal = () => {
    setSelectedPerson(null); // Close modal
  };

  // Function to navigate to the ProbationForm route
  const handleDownload = () => {
    closeModal(); // Close modal
    if (selectedPerson) {
      // Navigate to the form at '/probForm', passing selectedPerson data via route state
      navigate('/probForm', { state: { employeeData: selectedPerson } });
    }
  };

  return (
    <div>
      <FilterTable
        tableBody={tableBody}
        tableHead={tableHead}
        typeOfReport={typeOfReport}
        reportTitle={reportTitle}
        allData={allData}
        handleViewDetails={handleViewDetails} // Pass the function to FilterTable
      />

      {/* Modal for showing person's details */}
      {selectedPerson && (
        <div className="fixed inset-0 center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <section className="flex justify-start gap-10 items-center mb-5">
              <div className="max-w-[150px] w-full">
                <img className="w-full" src={logo} alt="Logo" />
              </div>
              <div>
                <h2 className="text-xl font-semibold border-b-2">Person Details</h2>
              </div>
            </section>
            <p className="flex justify-between mb-2">
              <strong>Name:</strong> {selectedPerson.name}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Emp ID:</strong> {selectedPerson.empID}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Emp Badge No:</strong> {selectedPerson.empBadgeNo}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Position:</strong> {selectedPerson.position}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Department:</strong> {selectedPerson.department}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Date Of Join:</strong> {selectedPerson.doj}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Probation End Date:</strong> {selectedPerson.probationEnd}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Contract End Date:</strong> {selectedPerson.contractEnd || '-' }
            </p>

            <div className="flex justify-evenly items-center p-3">
              <button
                className="mt-4 bg-blue text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>

              {/* Download Button */}
              <button
                className="mt-4 bg-green text-white px-4 py-2 rounded"
                onClick={handleDownload} // Handle the download action by navigating to the form
              >
                Go to Probation Form
              </button>
            </div>
          </div>
        </div>
      )}
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
