// // import React from "react";
// // import { useState, useEffect } from "react";
// // import { Pagination } from "./Pagination";
// // export const EmpLeaveBalance = ({ initialData, userType }) => {
// //   const [data, setData] = useState(initialData);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [rowsPerPage, setRowsPerPage] = useState(15);

// //   const heading = [
// //     "Employee ID",
// //     "Employee Name",
// //     "No of Leave Taken",
// //     "Leave Type",
// //     "No of Leave Remaining",
// //   ];

// //   useEffect(() => {
// //     const filteredData = data;
// //     const startIndex = (currentPage - 1) * rowsPerPage;
// //     const paginatedData = filteredData.slice(
// //       startIndex,
// //       startIndex + rowsPerPage
// //     );
// //     setData(paginatedData);
// //   }, [currentPage, rowsPerPage]);

// //   const filteredResults = data;
// //   const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

// //   return (
// //     <section>
// //       <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-y-auto">
// //         <table className="w-[1150px]">
// //           <thead className="bg-black">
// //             <tr className="bg-[#C5C5C5] rounded-sm">
// //               {heading.map((header, index) => (
// //                 <th
// //                   key={index}
// //                   className="px-4 py-5 text-[15px] text-secondary"
// //                 >
// //                   {header}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {initialData &&
// //               initialData.map((item, index) => {
// //                 // Calculate the remaining leave based on approval status
// //                 let remainingLeave = 0;

// //                 // Only calculate if the managerStatus is "approved"
// //                 if (item.managerStatus === "Approved") {
// //                   switch (item.leaveType) {
// //                     case "Hospitalisation Leave":
// //                       remainingLeave = item.leaveDetails.hospLeave - item.days;
// //                       break;
// //                     case "Annual Leave":
// //                       remainingLeave = item.leaveDetails.annualLeave - item.days;
// //                       break;
// //                     case "Sick Leave":
// //                       remainingLeave = item.leaveDetails.sickLeave - item.days;
// //                       break;
// //                     case "Marriage Leave":
// //                       remainingLeave = item.leaveDetails.mrageLeave - item.days;
// //                       break;
// //                     case "Compassionate Leave":
// //                       remainingLeave = item.leaveDetails.compasLeave - item.days;
// //                       break;
// //                     case "Maternity Leave":
// //                       remainingLeave = item.leaveDetails.materLeave - item.days;
// //                       break;
// //                     case "Paternity Leave":
// //                       remainingLeave = item.leaveDetails.paterLeave - item.days;
// //                       break;
// //                     case "Compensate Leave":
// //                       remainingLeave = 0; 
// //                       break;
// //                     default:
// //                       remainingLeave = 0;
// //                       break;
// //                   }
// //                 } else {
                  
// //                   switch (item.leaveType) {
// //                     case "Hospitalisation Leave":
// //                       remainingLeave = item.leaveDetails.hospLeave;
// //                       break;
// //                     case "Annual Leave":
// //                       remainingLeave = item.leaveDetails.annualLeave;
// //                       break;
// //                     case "Sick Leave":
// //                       remainingLeave = item.leaveDetails.sickLeave;
// //                       break;
// //                     case "Marriage Leave":
// //                       remainingLeave = item.leaveDetails.mrageLeave;
// //                       break;
// //                     case "Compassionate Leave":
// //                       remainingLeave = item.leaveDetails.compasLeave;
// //                       break;
// //                     case "Maternity Leave":
// //                       remainingLeave = item.leaveDetails.materLeave;
// //                       break;
// //                     case "Paternity Leave":
// //                       remainingLeave = item.leaveDetails.paterLeave;
// //                       break;
// //                     case "Compensate Leave":
// //                       remainingLeave = 0;
// //                       break;
// //                     default:
// //                       remainingLeave = 0;
// //                       break;
// //                   }
// //                 }

// //                 return (
// //                   <tr
// //                     key={index}
// //                     className="text-center text-sm border-b-2 border-[#CECECE]"
// //                   >
// //                     <td className="border-b-2 border-[#CECECE] py-3">
// //                       {item.empID}
// //                     </td>
// //                     <td className="border-b-2 border-[#CECECE] py-3">
// //                       {item.employeeInfo.name}
// //                     </td>

// //                     <td className="border-b-2 border-[#CECECE]">{item.days}</td>
// //                     <td className="border-b-2 border-[#CECECE]">{item.leaveType}</td>
// //                     <td className="border-b-2 border-[#CECECE]">
// //                       {remainingLeave || "N/A"}
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //           </tbody>
// //         </table>
// //       </div>
// //       <div className="ml-20 flex justify-center">
// //         <div className="w-[60%] flex justify-start mt-4  px-10">
// //           {userType !== "SuperAdmin" && userType !== "HR" && (
// //             <Pagination
// //               currentPage={currentPage}
// //               totalPages={totalPages}
// //               onPageChange={(newPage) => {
// //                 if (newPage >= 1 && newPage <= totalPages) {
// //                   setCurrentPage(newPage);
// //                 }
// //               }}
// //             />
// //           )}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// import React, { useState, useEffect } from "react";
// import { Pagination } from "./Pagination";

// export const EmpLeaveBalance = ({ initialData, userType, personalInfo }) => {
//   const [data, setData] = useState(initialData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(15);

//   const heading = [
//     "Employee ID",
//     "Employee Name",
//     "No of Leave Taken",
//     "Leave Type",
//     "No of Leave Remaining",
//     "Summary"
//   ];

//   // Default leave balances for each leave type
//   const defaultLeaveBalances = {
//     "Hospitalisation Leave": 60,
//     "Annual Leave": 14,
//     "Sick Leave": 14,
//     "Marriage Leave": 3,
//     "Compassionate Leave": 5,
//     "Maternity Leave": 5,
//     "Paternity Leave": 7,
//     "Compensate Leave": 0,
//   };

//   useEffect(() => {
//     const filteredData = data;
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     const paginatedData = filteredData.slice(
//       startIndex,
//       startIndex + rowsPerPage
//     );
//     setData(paginatedData);
//   }, [currentPage, rowsPerPage]);

//   const filteredResults = data;
//   const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

//   // Function to calculate remaining leave for each employee
//   const calculateRemainingLeave = (empID, leaveType, daysTaken) => {
//     // Start with the default total for that leave type
//     let remainingLeave = defaultLeaveBalances[leaveType] || 0;

//     // For the given employee, find all their leave records for that leave type
//     const employeeLeaves = initialData.filter(
//       (item) => item.empID === empID && item.leaveType === leaveType
//     );

//     // Subtract the days taken for each leave record of the same type
//     employeeLeaves.forEach((leave) => {
//       if (leave.managerStatus === "Approved") {
//         remainingLeave -= leave.days;
//       }
//     });

//     return remainingLeave;
//   };

//   const filteredData = data.filter((item) => item.empStatus !== "Cancelled");

//   const finalData =
//     (userType !== "SuperAdmin" || userType !== "HR") && userType === "Manager"
//       ? filteredData.filter(
//           (item) =>
//             item.supervisorStatus === "Approved" &&
//             (item.managerName === personalInfo.name ||
//               item.supervisorName === personalInfo.name)
//         )
//       : userType === "Supervisor"
//       ? filteredData.filter((item) => item.supervisorName === personalInfo.name)
//       : filteredData;

//   return (
//     <section>
//       <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-y-auto">
//         <table className="w-[1150px]">
//           <thead className="bg-black">
//             <tr className="bg-[#C5C5C5] rounded-sm">
//               {heading.map((header, index) => (
//                 <th key={index} className="px-4 py-5 text-[15px] text-secondary">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {finalData &&
//               finalData.map((item, index) => {
//                 // Get the remaining leave for each employee based on leave type and days
//                 const remainingLeave = calculateRemainingLeave(
//                   item.empID,
//                   item.leaveType,
//                   item.days
//                 );

//                 return (
//                   <tr
//                     key={index}
//                     className="text-center text-sm border-b-2 border-[#CECECE]"
//                   >
//                     <td className="border-b-2 border-[#CECECE] py-3">
//                       {item.empID}
//                     </td>
//                     <td className="border-b-2 border-[#CECECE] py-3">
//                       {item.employeeInfo.name}
//                     </td>

//                     <td className="border-b-2 border-[#CECECE]">{item.days}</td>
//                     <td className="border-b-2 border-[#CECECE]">{item.leaveType}</td>
//                     <td className="border-b-2 border-[#CECECE]">
//                       {remainingLeave || "N/A"}
//                     </td>
//                     <td>view summary</td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>
//       <div className="ml-20 flex justify-center">
//         <div className="w-[60%] flex justify-start mt-4 px-10">
//           {userType !== "SuperAdmin" && userType !== "HR" && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={(newPage) => {
//                 if (newPage >= 1 && newPage <= totalPages) {
//                   setCurrentPage(newPage);
//                 }
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };
import React, { useState, useEffect } from "react";
import { Pagination } from "./Pagination";

export const EmpLeaveBalance = ({ initialData, userType, personalInfo }) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // For the selected employee
  const [showPopup, setShowPopup] = useState(false); // For the popup visibility

  const heading = [
    "Employee ID",
    "Employee Name",
    "No of Leave Taken",
    "Leave Type",
    "No of Leave Remaining",
    "Summary"
  ];

  // Default leave balances for each leave type
  const defaultLeaveBalances = {
    "Hospitalisation Leave": 60,
    "Annual Leave": 14,
    "Sick Leave": 14,
    "Marriage Leave": 3,
    "Compassionate Leave": 5,
    "Maternity Leave": 5,
    "Paternity Leave": 7,
    "Compensate Leave": 0,
  };

  useEffect(() => {
    const filteredData = data;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    setData(paginatedData);
  }, [currentPage, rowsPerPage]);

  const filteredResults = data;
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  // Calculate remaining leave for each leave type for an employee
  const calculateRemainingLeave = (empID, leaveType) => {
    let remainingLeave = defaultLeaveBalances[leaveType] || 0;
    const employeeLeaves = initialData.filter(
      (item) => item.empID === empID && item.leaveType === leaveType
    );
    employeeLeaves.forEach((leave) => {
      if (leave.managerStatus === "Approved") {
        remainingLeave -= leave.days;
      }
    });
    return remainingLeave;
  };

  // Handle "view summary" click
  const handleViewSummary = (employee) => {
    setSelectedEmployee(employee);
    setShowPopup(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedEmployee(null);
  };

  const finalData =
    (userType !== "SuperAdmin" || userType !== "HR") && userType === "Manager"
      ? filteredResults.filter(
          (item) =>
            item.supervisorStatus === "Approved" &&
            (item.managerName === personalInfo.name ||
              item.supervisorName === personalInfo.name)
        )
      : userType === "Supervisor"
      ? filteredResults.filter((item) => item.supervisorName === personalInfo.name)
      : filteredResults;

  return (
    <section>
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-y-auto">
        <table className="w-[1150px]">
          <thead className="bg-black">
            <tr className="bg-[#C5C5C5] rounded-sm">
              {heading.map((header, index) => (
                <th key={index} className="px-4 py-5 text-[15px] text-secondary">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {finalData &&
              finalData.map((item, index) => {
                const remainingLeave = calculateRemainingLeave(item.empID, item.leaveType);
                return (
                  <tr
                    key={index}
                    className="text-center text-sm border-b-2 border-[#CECECE]"
                  >
                    <td className="border-b-2 border-[#CECECE] py-3">{item.empID}</td>
                    <td className="border-b-2 border-[#CECECE] py-3">{item.employeeInfo.name}</td>
                    <td className="border-b-2 border-[#CECECE]">{item.days}</td>
                    <td className="border-b-2 border-[#CECECE]">{item.leaveType}</td>
                    <td className="border-b-2 border-[#CECECE]">
                      {remainingLeave || "N/A"}
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewSummary(item)}
                        className="text-blue-500"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="ml-20 flex justify-center">
        <div className="w-[60%] flex justify-start mt-4 px-10">
          {userType !== "SuperAdmin" && userType !== "HR" && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                  setCurrentPage(newPage);
                }
              }}
            />
          )}
        </div>
      </div>

      {/* Popup for Leave Summary */}
      {showPopup && selectedEmployee && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-w-[800px] overflow-y-auto max-h-[70%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Leave Summary for {selectedEmployee.employeeInfo.name}</h2>
              <button
                onClick={handleClosePopup}
                className="bg-red-500  px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>Employee ID:</strong> {selectedEmployee.empID}</p>
              <p><strong>Total Leave Balances:</strong></p>
              {Object.keys(defaultLeaveBalances).map((leaveType) => {
                const remainingLeave = calculateRemainingLeave(selectedEmployee.empID, leaveType);
                return (
                  <div key={leaveType} className="flex justify-between">
                    <p>{leaveType}:</p>
                    <p>Total: {defaultLeaveBalances[leaveType]} days | Remaining: {remainingLeave} days</p>
                  </div>
                );
              })}
              <p><strong>Leave Taken:</strong></p>
              {initialData
                .filter(item => item.empID === selectedEmployee.empID)
                .map((leaveRecord, index) => (
                  <p key={index}>
                    {leaveRecord.leaveType} - {leaveRecord.days} days taken
                  </p>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
