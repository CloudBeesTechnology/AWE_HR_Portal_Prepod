// // // // import React from "react";
// // // // import { useState, useEffect } from "react";
// // // // import { Pagination } from "./Pagination";

// // // // export const EmpLeaveBalance = ({ initialData, userType }) => {
// // // //   const [data, setData] = useState(initialData);
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [rowsPerPage, setRowsPerPage] = useState(15);

// // // //   const heading = [
// // // //     "Employee ID",
// // // //     "Employee Name",
// // // //     "No of Leave Taken",
// // // //     "Leave Type",
// // // //     "No of Leave Remaining",
// // // //   ];

// // // //   useEffect(() => {
// // // //     const filteredData = data;
// // // //     const startIndex = (currentPage - 1) * rowsPerPage;
// // // //     const paginatedData = filteredData.slice(
// // // //       startIndex,
// // // //       startIndex + rowsPerPage
// // // //     );
// // // //     setData(paginatedData);
// // // //   }, [currentPage, rowsPerPage]);
// // // //   const filteredResults = data;
// // // //   const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

// // // //   return (
// // // //     <section>
// // // //       <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-y-auto">
// // // //         <table className="w-[1150px] ">
// // // //           <thead className="bg-black">
// // // //             <tr className="bg-[#C5C5C5] rounded-sm">
// // // //               {heading.map((header, index) => (
// // // //                 <th
// // // //                   key={index}
// // // //                   className="px-4 py-5 text-[15px] text-secondary"
// // // //                 >
// // // //                   {header}
// // // //                 </th>
// // // //               ))}
// // // //             </tr>
// // // //           </thead>

// // // //           <tbody>
// // // //             {initialData &&
// // // //               initialData.map((item, index) => {
// // // //                 return (
// // // //                   <tr
// // // //                     key={index}
// // // //                     className="text-center text-sm border-b-2 border-[#CECECE]"
// // // //                   >
// // // //                     <td className="border-b-2 border-[#CECECE] py-3">
// // // //                       {item.empID}
// // // //                     </td>
// // // //                     <td className="border-b-2 border-[#CECECE] py-3">
// // // //                       {item.employeeInfo.name}
// // // //                     </td>
                   
// // // //                     <td className="border-b-2 border-[#CECECE]">{item.days}</td>
// // // //                     <td className="border-b-2 border-[#CECECE]">{item.leaveType}</td>
// // // //                     <td className="border-b-2 border-[#CECECE]">
// // // //                        {item.leaveType === "Hospitalisation Leave" && item.leaveDetails.hospLeave ||
// // // //                        item.leaveType === "Annual Leave" && item.leaveDetails.annualLeave || 
// // // //                        item.leaveType === "Sick Leave" && item.leaveDetails.sickLeave ||
// // // //                        item.leaveType === "Marriage Leave" && item.leaveDetails.mrageLeave ||
// // // //                        item.leaveType === "Compassionate Leave" && item.leaveDetails.compasLeave ||
// // // //                        item.leaveType === "Maternity Leave" && item.leaveDetails.materLeave ||
// // // //                        item.leaveType === "Compensate Leave" && "0" ||
// // // //                        item.leaveType === "Paternity Leave" && item.leaveDetails.paterLeave
// // // //                        }
// // // //                     </td>
// // // //                   </tr>
// // // //                 );
// // // //               })}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //       <div className="ml-20 flex justify-center">
// // // //         <div className="w-[60%] flex justify-start mt-4  px-10">
// // // //           {userType !== "SuperAdmin" && userType !== "HR" && (
// // // //             <Pagination
// // // //               currentPage={currentPage}
// // // //               totalPages={totalPages}
// // // //               onPageChange={(newPage) => {
// // // //                 if (newPage >= 1 && newPage <= totalPages) {
// // // //                   setCurrentPage(newPage);
// // // //                 }
// // // //               }}
// // // //             />
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // import React from "react";
// // // import { useState, useEffect } from "react";
// // // import { Pagination } from "./Pagination";
// // // export const EmpLeaveBalance = ({ initialData, userType }) => {
// // //   const [data, setData] = useState(initialData);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [rowsPerPage, setRowsPerPage] = useState(15);

// // //   const heading = [
// // //     "Employee ID",
// // //     "Employee Name",
// // //     "No of Leave Taken",
// // //     "Leave Type",
// // //     "No of Leave Remaining",
// // //   ];

// // //   useEffect(() => {
// // //     const filteredData = data;
// // //     const startIndex = (currentPage - 1) * rowsPerPage;
// // //     const paginatedData = filteredData.slice(
// // //       startIndex,
// // //       startIndex + rowsPerPage
// // //     );
// // //     setData(paginatedData);
// // //   }, [currentPage, rowsPerPage]);

// // //   const filteredResults = data;
// // //   const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

// // //   return (
// // //     <section>
// // //       <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-y-auto">
// // //         <table className="w-[1150px]">
// // //           <thead className="bg-black">
// // //             <tr className="bg-[#C5C5C5] rounded-sm">
// // //               {heading.map((header, index) => (
// // //                 <th
// // //                   key={index}
// // //                   className="px-4 py-5 text-[15px] text-secondary"
// // //                 >
// // //                   {header}
// // //                 </th>
// // //               ))}
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {initialData &&
// // //               initialData.map((item, index) => {
// // //                 // Calculate the remaining leave based on approval status
// // //                 let remainingLeave = 0;

// // //                 // Only calculate if the managerStatus is "approved"
// // //                 if (item.managerStatus === "Approved") {
// // //                   switch (item.leaveType) {
// // //                     case "Hospitalisation Leave":
// // //                       remainingLeave = item.leaveDetails.hospLeave - item.days;
// // //                       break;
// // //                     case "Annual Leave":
// // //                       remainingLeave = item.leaveDetails.annualLeave - item.days;
// // //                       break;
// // //                     case "Sick Leave":
// // //                       remainingLeave = item.leaveDetails.sickLeave - item.days;
// // //                       break;
// // //                     case "Marriage Leave":
// // //                       remainingLeave = item.leaveDetails.mrageLeave - item.days;
// // //                       break;
// // //                     case "Compassionate Leave":
// // //                       remainingLeave = item.leaveDetails.compasLeave - item.days;
// // //                       break;
// // //                     case "Maternity Leave":
// // //                       remainingLeave = item.leaveDetails.materLeave - item.days;
// // //                       break;
// // //                     case "Paternity Leave":
// // //                       remainingLeave = item.leaveDetails.paterLeave - item.days;
// // //                       break;
// // //                     case "Compensate Leave":
// // //                       remainingLeave = 0; // Compensate Leave is 0, as per the previous logic
// // //                       break;
// // //                     default:
// // //                       remainingLeave = 0;
// // //                       break;
// // //                   }
// // //                 } else {
// // //                   // If not approved, display the original remaining leave
// // //                   switch (item.leaveType) {
// // //                     case "Hospitalisation Leave":
// // //                       remainingLeave = item.leaveDetails.hospLeave;
// // //                       break;
// // //                     case "Annual Leave":
// // //                       remainingLeave = item.leaveDetails.annualLeave;
// // //                       break;
// // //                     case "Sick Leave":
// // //                       remainingLeave = item.leaveDetails.sickLeave;
// // //                       break;
// // //                     case "Marriage Leave":
// // //                       remainingLeave = item.leaveDetails.mrageLeave;
// // //                       break;
// // //                     case "Compassionate Leave":
// // //                       remainingLeave = item.leaveDetails.compasLeave;
// // //                       break;
// // //                     case "Maternity Leave":
// // //                       remainingLeave = item.leaveDetails.materLeave;
// // //                       break;
// // //                     case "Paternity Leave":
// // //                       remainingLeave = item.leaveDetails.paterLeave;
// // //                       break;
// // //                     case "Compensate Leave":
// // //                       remainingLeave = 0;
// // //                       break;
// // //                     default:
// // //                       remainingLeave = 0;
// // //                       break;
// // //                   }
// // //                 }

// // //                 return (
// // //                   <tr
// // //                     key={index}
// // //                     className="text-center text-sm border-b-2 border-[#CECECE]"
// // //                   >
// // //                     <td className="border-b-2 border-[#CECECE] py-3">
// // //                       {item.empID}
// // //                     </td>
// // //                     <td className="border-b-2 border-[#CECECE] py-3">
// // //                       {item.employeeInfo.name}
// // //                     </td>

// // //                     <td className="border-b-2 border-[#CECECE]">{item.days}</td>
// // //                     <td className="border-b-2 border-[#CECECE]">{item.leaveType}</td>
// // //                     <td className="border-b-2 border-[#CECECE]">
// // //                       {remainingLeave || "N/A"}
// // //                     </td>
// // //                   </tr>
// // //                 );
// // //               })}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //       <div className="ml-20 flex justify-center">
// // //         <div className="w-[60%] flex justify-start mt-4  px-10">
// // //           {userType !== "SuperAdmin" && userType !== "HR" && (
// // //             <Pagination
// // //               currentPage={currentPage}
// // //               totalPages={totalPages}
// // //               onPageChange={(newPage) => {
// // //                 if (newPage >= 1 && newPage <= totalPages) {
// // //                   setCurrentPage(newPage);
// // //                 }
// // //               }}
// // //             />
// // //           )}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };
// // import React, { useState, useEffect } from "react";
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

// //   // This function will calculate the remaining leave based on previously taken leave
// //   const calculateRemainingLeave = (item) => {
// //     let remainingLeave = 0;

// //     switch (item.leaveType) {
// //       case "Hospitalisation Leave":
// //         remainingLeave = item.leaveDetails.hospLeave - item.days;
// //         break;
// //       case "Annual Leave":
// //         remainingLeave = item.leaveDetails.annualLeave - item.days;
// //         break;
// //       case "Sick Leave":
// //         remainingLeave = item.leaveDetails.sickLeave - item.days;
// //         break;
// //       case "Marriage Leave":
// //         remainingLeave = item.leaveDetails.mrageLeave - item.days;
// //         break;
// //       case "Compassionate Leave":
// //         remainingLeave = item.leaveDetails.compasLeave - item.days;
// //         break;
// //       case "Maternity Leave":
// //         remainingLeave = item.leaveDetails.materLeave - item.days;
// //         break;
// //       case "Paternity Leave":
// //         remainingLeave = item.leaveDetails.paterLeave - item.days;
// //         break;
// //       case "Compensate Leave":
// //         remainingLeave = 0; // Compensate Leave is 0, as per previous logic
// //         break;
// //       default:
// //         remainingLeave = 0;
// //         break;
// //     }

// //     return remainingLeave;
// //   };

// //   // Update remaining leave when the current page or rowsPerPage changes
// //   useEffect(() => {
// //     const filteredData = data;
// //     const startIndex = (currentPage - 1) * rowsPerPage;
// //     const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
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
// //                 <th key={index} className="px-4 py-5 text-[15px] text-secondary">
// //                   {header}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {initialData &&
// //               initialData.map((item, index) => {
// //                 let remainingLeave = calculateRemainingLeave(item);

// //                 // Track the employee taking leave and log the details
// //                 if (item.managerStatus === "Approved") {
// //                   console.log(`${item.employeeInfo.name} (Employee ID: ${item.empID}) has taken ${item.days} days of ${item.leaveType} leave. Remaining leave: ${remainingLeave}`);
// //                 }

// //                 return (
// //                   <tr key={index} className="text-center text-sm border-b-2 border-[#CECECE]">
// //                     <td className="border-b-2 border-[#CECECE] py-3">{item.empID}</td>
// //                     <td className="border-b-2 border-[#CECECE] py-3">{item.employeeInfo.name}</td>
// //                     <td className="border-b-2 border-[#CECECE]">{item.days}</td>
// //                     <td className="border-b-2 border-[#CECECE]">{item.leaveType}</td>
// //                     <td className="border-b-2 border-[#CECECE]">{remainingLeave || "N/A"}</td>
// //                   </tr>
// //                 );
// //               })}
// //           </tbody>
// //         </table>
// //       </div>
// //       <div className="ml-20 flex justify-center">
// //         <div className="w-[60%] flex justify-start mt-4 px-10">
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

// export const EmpLeaveBalance = ({ initialData, userType }) => {
//   const [data, setData] = useState(initialData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(15);

//   const heading = [
//     "Employee ID",
//     "Employee Name",
//     "No of Leave Taken",
//     "Leave Type",
//     "No of Leave Remaining",
//   ];

//   // Helper function to calculate remaining leave dynamically
//   const calculateRemainingLeave = (empID, leaveType) => {
//     let remainingLeave = 0;
    
//     // Find the employee's initial leave balance based on leaveType
//     const employee = initialData.find((emp) => emp.empID === empID);
//     if (employee) {
//       const leaveDetails = employee.leaveDetails;

//       // Get initial leave balance for the leave type
//       switch (leaveType) {
//         case "Hospitalisation Leave":
//           remainingLeave = leaveDetails.hospLeave;
//           break;
//         case "Annual Leave":
//           remainingLeave = leaveDetails.annualLeave;
//           break;
//         case "Sick Leave":
//           remainingLeave = leaveDetails.sickLeave;
//           break;
//         case "Marriage Leave":
//           remainingLeave = leaveDetails.mrageLeave;
//           break;
//         case "Compassionate Leave":
//           remainingLeave = leaveDetails.compasLeave;
//           break;
//         case "Maternity Leave":
//           remainingLeave = leaveDetails.materLeave;
//           break;
//         case "Paternity Leave":
//           remainingLeave = leaveDetails.paterLeave;
//           break;
//         case "Compensate Leave":
//           remainingLeave = 0;
//           break;
//         default:
//           remainingLeave = 0;
//           break;
//       }

//       // Safely access leaveRecords, ensuring it is defined
//       const leaveRecords = employee.leaveRecords || [];

//       // Subtract the leave taken from the remaining leave
//       const totalLeaveTaken = leaveRecords
//         .filter(
//           (record) => record.leaveType === leaveType && record.managerStatus === "Approved"
//         )
//         .reduce((total, record) => total + record.days, 0);

//       remainingLeave -= totalLeaveTaken; // Subtract the total leave taken from the initial leave balance
//     }
//     return remainingLeave;
//   };

//   // Updates when currentPage or rowsPerPage changes
//   useEffect(() => {
//     const filteredData = data;
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
//     setData(paginatedData);
//   }, [currentPage, rowsPerPage]);

//   const filteredResults = data;
//   const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

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
//             {initialData &&
//               initialData.map((item, index) => {
//                 const remainingLeave = calculateRemainingLeave(item.empID, item.leaveType);

//                 // Track the employee taking leave and log the details
//                 if (item.managerStatus === "Approved") {
//                   console.log(`${item.employeeInfo.name} (Employee ID: ${item.empID}) has taken ${item.days} days of ${item.leaveType} leave. Remaining leave: ${remainingLeave}`);
//                 }

//                 return (
//                   <tr key={index} className="text-center text-sm border-b-2 border-[#CECECE]">
//                     <td className="border-b-2 border-[#CECECE] py-3">{item.empID}</td>
//                     <td className="border-b-2 border-[#CECECE] py-3">{item.employeeInfo.name}</td>
//                     <td className="border-b-2 border-[#CECECE]">{item.days}</td>
//                     <td className="border-b-2 border-[#CECECE]">{item.leaveType}</td>
//                     <td className="border-b-2 border-[#CECECE]">{remainingLeave || "N/A"}</td>
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
//

import React, { useState, useEffect } from "react";
import { Pagination } from "./Pagination";

export const EmpLeaveBalance = ({ initialData, userType }) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const heading = [
    "Employee ID",
    "Employee Name",
    "No of Leave Taken",
    "Leave Type",
    "No of Leave Remaining",
  ];

  // Helper function to calculate remaining leave dynamically
  const calculateRemainingLeave = (empID, leaveType) => {
    let remainingLeave = 0;

    // Find the employee's initial leave balance based on leaveType
    const employee = initialData.find((emp) => emp.empID === empID);
    if (employee) {
      const leaveDetails = employee.leaveDetails;

      // Get initial leave balance for the leave type
      switch (leaveType) {
        case "Hospitalisation Leave":
          remainingLeave = leaveDetails.hospLeave;
          break;
        case "Annual Leave":
          remainingLeave = leaveDetails.annualLeave;
          break;
        case "Sick Leave":
          remainingLeave = leaveDetails.sickLeave;
          break;
        case "Marriage Leave":
          remainingLeave = leaveDetails.mrageLeave;
          break;
        case "Compassionate Leave":
          remainingLeave = leaveDetails.compasLeave;
          break;
        case "Maternity Leave":
          remainingLeave = leaveDetails.materLeave;
          break;
        case "Paternity Leave":
          remainingLeave = leaveDetails.paterLeave;
          break;
        case "Compensate Leave":
          remainingLeave = 0;
          break;
        default:
          remainingLeave = 0;
          break;
      }

      // Loop through the employee's leave records and update the remaining leave
      const leaveRecords = employee.leaveRecords || [];

      leaveRecords
        .filter((record) => record.leaveType === leaveType && record.managerStatus === "Approved")
        .forEach((record) => {
          remainingLeave -= record.days; // Subtract the days taken from the initial leave balance
        });
    }
    return remainingLeave;
  };

  // Updates when currentPage or rowsPerPage changes
  useEffect(() => {
    const filteredData = data;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    setData(paginatedData);
  }, [currentPage, rowsPerPage]);

  const filteredResults = data;
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

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
            {initialData &&
              initialData.map((item, index) => {
                const remainingLeave = calculateRemainingLeave(item.empID, item.leaveType);

                // Track the employee taking leave and log the details
                if (item.managerStatus === "Approved") {
                  console.log(`${item.employeeInfo.name} (Employee ID: ${item.empID}) has taken ${item.days} days of ${item.leaveType} leave. Remaining leave: ${remainingLeave}`);
                }

                return (
                  <tr key={index} className="text-center text-sm border-b-2 border-[#CECECE]">
                    <td className="border-b-2 border-[#CECECE] py-3">{item.empID}</td>
                    <td className="border-b-2 border-[#CECECE] py-3">{item.employeeInfo.name}</td>
                    <td className="border-b-2 border-[#CECECE]">{item.days}</td>
                    <td className="border-b-2 border-[#CECECE]">{item.leaveType}</td>
                    <td className="border-b-2 border-[#CECECE]">{remainingLeave || "N/A"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
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
    </section>
  );
};
