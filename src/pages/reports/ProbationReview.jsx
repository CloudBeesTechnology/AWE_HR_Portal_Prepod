import React, { useEffect, useState, useRef } from "react"; 
import { FilterTable } from "./FilterTable";
import logo from "../../assets/logo/logo-with-name.svg";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { ProbationForm } from "./ProbationForm"; // Import the ProbationForm
import { VscClose } from "react-icons/vsc";

export const ProbationReview = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead] = useState([
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
    const currentMonth = today.getMonth(); // Current month (0-indexed)
    const nextMonth = currentMonth + 1; // Next month
    
    // Set the first and last day of the next month for comparison
    const firstDayOfNextMonth = new Date(today.getFullYear(), nextMonth, 1);
    const lastDayOfNextMonth = new Date(today.getFullYear(), nextMonth + 1, 0);
  
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
        const probationEnd = new Date(lastDate);
        // Check if the probationEndDate is within the next month
        return probationEnd >= firstDayOfNextMonth && probationEnd <= lastDayOfNextMonth;
      })
      .map((item) => {
        const lastDate = item.probationEnd[item.probationEnd.length - 1];
        return {
          name: item.name || "-",
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          doj: item.doj || "-",
          department: item.department || "-",
          position: item.position || "-",
          probationEndDate: lastDate || "-", // Use the last value
          deadline: lastDate ? calculateDeadline(lastDate) : "-", // Calculate deadline for the last value
        };
      });
  };
  

  useEffect(() => {
    if (allData && Array.isArray(allData)) {
      const mergedData = probationReviewMergedData(allData);
      console.log('Merged Data:', mergedData); // Debugging merged data
      setTableBody(mergedData);
    } else {
      console.warn("Invalid or missing allData:", allData);
    }
  }, [allData]);
  // Function to handle viewing details
  const handleViewDetails = (personData) => {
    console.log("Person State:", personData);
    setSelectedPerson(personData); // Set selected person's data
  };
  console.log("Selected Person State:", selectedPerson);
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
            <section className="flex justify-between gap-10 items-center mb-5">
              <div className="w-full flex-1  center">
                <img className="max-w-[200px] " src={logo} alt="Logo" />
              </div>
              <button
                className=" text-[24px] rounded"
                onClick={closeModal}
              >
                <VscClose/>
              </button>
            </section>
                <h2 className="text-xl font-semibold underline text-center mb-5">Person Details</h2>
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
              <strong>Probation End Date:</strong> {selectedPerson.probationEndDate}
            </p>
            {/* <p className="flex justify-between mb-2">
              <strong>Contract End Date:</strong> {selectedPerson.contractEnd || '-' }
            </p> */}

            <div className="flex justify-evenly items-center p-3">
           

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
