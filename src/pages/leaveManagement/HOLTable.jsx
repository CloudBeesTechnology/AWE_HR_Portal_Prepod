// import React from "react";

// export const HOLTable = ({ initialData, userType }) => {
//   const heading = [
//     "Employee ID",
//     "Leave Type",
//     "Start Date",
//     "End Date",
//     "Reason",
//     "Status",
//   ];

//   const getStatusClass = (status) => {
//     return status === "Rejected"
//       ? "text-[#C50000]"
//       : status === "Approved"
//       ? "text-[#0CB100]"
//       : status === "Pending"
//       ? "text-dark_grey"
//       : "text-gray-500";
//   };

//   return (
//     <div className="leaveManagementTable max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto">
//     <table className="w-[1150px]">
//       <thead className="bg-black">
//         <tr className="bg-[#C5C5C5] rounded-sm">
//           {heading.map((header, index) => (
//             <th key={index} className="px-4 py-5 text-[15px] text-secondary">
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>

//       <tbody>
//         {initialData &&
//           initialData.map((item, index) => {
//             return (
//               <tr
//                 key={index}
//                 className="text-center text-sm border-b-2 border-[#CECECE]"
//               >
//                 <td className="border-b-2 border-[#CECECE] py-3">
//                   {item.empID}
//                 </td>
//                 <td className="border-b-2 border-[#CECECE]">
//                   {item.leaveType}
//                 </td>
//                 <td className="border-b-2 border-[#CECECE]">{item.fromDate}</td>
//                 <td className="border-b-2 border-[#CECECE]">{item.toDate}</td>
//                 <td className="border-b-2 border-[#CECECE]">{item.reason}</td>
//                 {/* <td className={`border-b-2 border-[#CECECE]`}>
//                   {item.supervisorStatus === item.managerStatus
//                     ? `${item.supervisorStatus}` // or display both values if you need: `${item.supervisorStatus} / ${item.managerStatus}`
//                     : null}{" "}

//                 </td> */}
//                  <td
//                   className={`${getStatusClass(
//                     userType === "Manager"
//                       ? item.managerStatus
//                       : userType === "Supervisor"
//                       ? item.supervisorStatus
//                       : ""
//                   )}`}
//                 >
//                   {userType === "Manager"
//                     ? item.managerStatus || "not found"
//                     : userType === "Supervisor"
//                     ? item.supervisorStatus || "not found"
//                     : ""}
//                 </td>
//               </tr>
//             );
//           })}
//       </tbody>
//     </table>
//     </div>
//   );
// };
import React from "react";
import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";

export const HOLTable = ({
  initialData,
  userType,
  formatDate,
  personalInfo,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const heading = [
    "S.No",
    "Employee ID",
    "Name",
    "Leave Type",
    "Start Date",
    "End Date",
    "Reason",
    userType !== "SuperAdmin" && "Status",
  ];

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[#C50000]"
      : status === "Approved"
      ? "text-[#0CB100]"
      : status === "Pending"
      ? "text-dark_grey"
      : "text-gray-500";
  };

  // // Filter for approved and rejected statuses
  // const filteredData = initialData?.filter(item =>
  //   item.managerStatus === "Approved" || item.managerStatus === "Rejected"
  // );

  // Assuming 'supervisorName' and 'managerName' are available in the data
  const filteredData = initialData?.filter((item) => {
    const supervisorName = item.supervisorName; // Get supervisor's name from the data
    const managerName = item.managerName; // Get manager's name from the data
    // Check if personalInfo.name matches supervisor or manager's name
    const isAllowedUser =
      personalInfo.name === supervisorName ||
      personalInfo.name === managerName ||
      userType === "SuperAdmin" ||
      userType === "HR";

    // Only show approved or rejected statuses for allowed users
    return item.managerStatus === "Approved" && isAllowedUser;
  });

  useEffect(() => {
    const finalData = filteredData;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = finalData.slice(startIndex, startIndex + rowsPerPage);
    setData(paginatedData);
  }, [currentPage, rowsPerPage]);
  const filteredResults = filteredData;
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  return (
    <section>
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto">
        <table className="w-[1150px]">
          <thead className="bg-black">
            <tr className="bg-[#C5C5C5] rounded-sm">
              {heading.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-5 text-[15px] text-secondary"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center text-sm border-b-2 border-[#CECECE]"
                  >
                    <td className="border-b-2 border-[#CECECE] py-3">
                      {index + 1}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-3">
                      {item.empID}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-3">
                      {item.employeeInfo.name}
                    </td>
                    <td className="border-b-2 border-[#CECECE]">
                      {item.leaveType}
                    </td>
                    <td className="border-b-2 border-[#CECECE]">
                      {formatDate(item.fromDate)}
                    </td>
                    <td className="border-b-2 border-[#CECECE]">
                      {formatDate(item.toDate)}
                    </td>
                    <td className="border-b-2 border-[#CECECE]">
                      {item.reason}
                    </td>
                    <td
                      className={`${getStatusClass(
                        userType === "Manager"
                          ? item.managerStatus
                          : userType === "Supervisor"
                          ? item.supervisorStatus
                          : item.managerStatus
                      )}`}
                    >
                      {userType === "Manager"
                        ? item.managerStatus || "not found"
                        : userType === "Supervisor" || userType === "HR"
                        ? item.supervisorStatus || "not found"
                        : ""}
                    </td>
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
