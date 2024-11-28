// // import React, { useEffect, useState } from "react";

// // export const LMTable = ({
// //   initialData,
// //   statusUpdate,
// //   handleClickForToggle,
// //   onViewClick,
// //   handleDelete,
// //   userType,
// // }) => {
// //   const [data, setData] = useState(initialData);

// //   useEffect(() => {
// //     setData(initialData);
// //   }, [initialData]);

// //   const heading = [
// //     "Employee ID",
// //     "Name",
// //     "Received Date",
// //     "Superior Name",
// //     "Approved Date",
// //     "ManagerName",
// //     "Approved Date",
// //     "Submitted Form",
// //     "Action",
// //     userType !== "SuperAdmin" && "Status",
// //   ];

// //   const editStatus = (allItem, status) => {
// //     statusUpdate(allItem, status);
// //   };

// //   console.log("userFrom LmTable:", userType);

// //   return (
// //     <div className="leaveManagementTable max-h-[calc(70vh-7rem)] overflow-x-auto">
// //       <table className="leaveManagementTable w-full">
// //         <thead className="bg-black sticky top-0">
// //           <tr className="bg-[#C5C5C5] rounded-sm">
// //             {heading.map((header, index) => (
// //               <th key={index} className="px-4 py-5 text-[15px] text-secondary">
// //                 {header}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data && data.length > 0 ? (
// //             data.map((item) => (
// //               <tr
// //                 key={item.id} // Use item.id for unique key
// //                 className="text-center text-sm border-b-2 border-[#CECECE]"
// //               >
// //                 <td className="border-b-2 border-[#CECECE] py-3">
// //                   {item.empID}
// //                 </td>
// //                 <td className="border-b-2 border-[#CECECE] text-start pl-4">
// //                   {item.employeeInfo.name || "Tony Stark"}
// //                 </td>
// //                 <td className="border-b-2 border-[#CECECE]">
// //                   {new Date(item.createdAt).toLocaleString()}
// //                 </td>

// //                 <td className="border-b-2 border-[#CECECE]">{item.applyTo}</td>
// //                 <td className="border-b-2 border-[#CECECE]">
// //                   {item.supervisorDate || "28/12/2024"}
// //                 </td>

// //                 <td className="border-b-2 border-[#CECECE]">
// //                   {item.managerName || "N/A"}
// //                 </td>
// //                 <td className="border-b-2 border-[#CECECE]">
// //                   {item.managerDate || "28/12/2024"}
// //                 </td>

// //                 <td className="border-b-2 border-[#CECECE] cursor-pointer">
// //                   <span
// //                     className="border-b-2 border-dark_grey"
// //                     onClick={() => {
// //                       handleClickForToggle();
// //                       onViewClick(item); // If you want to handle  handleDelete(item.id); // Call with item.id
// //                     }}
// //                   >
// //                     {item["submitted Form"] || "View"}
// //                   </span>
// //                 </td>
// //                 <td className="border-b-2 border-[#CECECE] cursor-pointer">
// //                   <span
// //                     className="border-b-2 border-dark_grey"
// //                     onClick={() => {
// //                       handleDelete(item.id); // Call with item.id
// //                     }}
// //                   >
// //                     {"Delete"}
// //                   </span>
// //                 </td>
// //                 <td>
// //                   {userType === "Manager"
// //                     ? item.managerStatus || "not found"
// //                     : userType === "Supervisor"
// //                     ? item.supervisorStatus || "not found"
// //                     : "not found"}
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan={heading.length} className="text-center py-4">
// //                 No data available
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };
// import React, { useEffect, useState } from "react";

// export const LMTable = ({
//   initialData,
//   statusUpdate,
//   handleClickForToggle,
//   onViewClick,
//   handleDelete,
//   userType,
// }) => {
//   const [data, setData] = useState(initialData);

//   useEffect(() => {
//     setData(initialData);
//   }, [initialData]);

//   const heading = [
//     "S. No",
//     "Employee ID",
//     "Name",
//     "Received Date",
//     userType !== "Supervisior" && userType !== "Manager" && "Supervisor Name",
//     userType !== "Manager" && "Approved Date",
//     userType !== "Manager" && userType !== "Supervisior" && "Manager Name",
//     userType !== "Supervisior" && "Approved Date",
//     "Submitted Form",
//     "Action",
//     userType !== "SuperAdmin" && "Status",
//   ].filter(Boolean); // Filter out any undefined headings

//   const editStatus = (allItem, status) => {
//     statusUpdate(allItem, status);
//   };

//   console.log("userFrom LmTable:", userType);

//   const getStatusClass = (status) => {
//     return status === "Rejected"
//       ? "text-[#C50000]"
//       : status === "Approved"
//       ? "text-[#0CB100]"
//       : status === "Pending"
//       ? "text-dark_grey"
//       : "text-gray-500";
//   };

//   const filteredData = data.filter((item) => item.empStatus !== "Cancelled");

//   // Filter data for manager userType
//   const finalData =
//     userType === "Manager"
//       ? filteredData.filter((item) => item.supervisorStatus === "Approved")
//       : filteredData;

//   return (
//     <div className="leaveManagementTable max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto">
//       <table className="w-[1150px]">
//         <thead className="bg-black sticky top-0">
//           <tr className="bg-[#C5C5C5] rounded-sm">
//             {heading.map((header, index) => (
//               <th key={index} className="px-4 py-5 text-[15px] text-secondary">
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {finalData && finalData.length > 0 ? (
//             finalData.map((item, index) => (
//               <tr
//                 key={item.id}
//                 className="text-center text-sm border-b-2 border-[#CECECE]"
//               >
//                 <td className="border-b-2 border-[#CECECE] py-3">
//                   {index + 1} {/* Serial number */}
//                 </td>

//                 <td className="border-b-2 border-[#CECECE] py-3">
//                   {item.empID}
//                 </td>
//                 <td className="border-b-2 border-[#CECECE] text-start pl-4">
//                   {item.employeeInfo.name || "Tony Stark"}
//                 </td>
//                 <td className="border-b-2 border-[#CECECE]">
//                   {new Date(item.createdAt).toLocaleDateString()}
//                 </td>
//                 {userType !== "Supervisior" && userType !== "Manager" && (
//                   <td className="border-b-2 border-[#CECECE]">
//                     {item.supervisorName || "Supervisor"}
//                   </td>
//                 )}
//                 {userType !== "Manager" && (
//                   <td className="border-b-2 border-[#CECECE]">
//                     {item.supervisorDate || "28/12/2024"}
//                   </td>
//                 )}

//                 {userType !== "Manager" && userType !== "Supervisior" && (
//                   <td className="border-b-2 border-[#CECECE]">
//                     {item.managerName || "Manager"}
//                   </td>
//                 )}

//                 {userType !== "Supervisior" && (
//                   <td className="border-b-2 border-[#CECECE]">
//                     {item.managerDate || "28/12/2024"}
//                   </td>
//                 )}

//                 <td className="border-b-2 border-[#CECECE] cursor-pointer">
//                   <span
//                     className="border-b-2 border-dark_grey"
//                     onClick={() => {
//                       handleClickForToggle();
//                       onViewClick(item);
//                     }}
//                   >
//                     {item["submitted Form"] || "View"}
//                   </span>
//                 </td>
//                 <td className="border-b-2 border-[#CECECE] cursor-pointer">
//                   <span
//                     className="border-b-2 border-dark_grey"
//                     onClick={() => {
//                       handleDelete(item.id);
//                     }}
//                   >
//                     {"Delete"}
//                   </span>
//                 </td>

//                 <td
//                   className={`${getStatusClass(
//                     userType === "Manager"
//                       ? item.managerStatus
//                       : userType === "Supervisior" || userType === "HR"
//                       ? item.supervisorStatus
//                       : ""
//                   )}`}
//                 >
//                   {userType === "Manager"
//                     ? item.managerStatus || "not found"
//                     : userType === "Supervisior" || userType === "HR"
//                     ? item.supervisorStatus || "not found"
//                     : ""}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={heading.length} className="text-center py-4">
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";

export const LMTable = ({
  initialData,
  statusUpdate,
  handleClickForToggle,
  onViewClick,
  handleDelete,
  userType,
  personalInfo,
  formatDate,
}) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const heading = [
    "S. No",
    "Employee ID",
    "Name",
    "Received Date",
    userType !== "Supervisor" && userType !== "Manager" && "Supervisor Name",
    userType !== "Manager" && "Approved Date",
    userType !== "Manager" && userType !== "Supervisior" && "Manager Name",
    userType !== "Supervisor" && "Approved Date",
    "Submitted Form",
    // "Action",
    userType !== "SuperAdmin" &&  userType !== "HR" && "Status",
  ].filter(Boolean);

  const editStatus = (itemId, status) => {
    // Call the statusUpdate function and update the local state
    statusUpdate(itemId, status).then((updatedItem) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    });
  };

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[#C50000]"
      : status === "Approved"
      ? "text-[#0CB100]"
      : status === "Pending"
      ? "text-dark_grey"
      : "text-gray-500";
  };

  const filteredData = data.filter((item) => item.empStatus !== "Cancelled");

  // Filter data for manager userType
  // const finalData =
  //   userType === "Manager"
  //     ? filteredData.filter((item) => item.supervisorStatus === "Approved")
  //     : filteredData;

  //     console.log(personalInfo.name, "Nmae name")
  //  Apply filtering logic based on personalInfo.name matching supervisorName or managerName
  const finalData =
  (userType !== "SuperAdmin" || userType !== "HR") &&
    userType === "Manager"
      ? filteredData.filter(
          (item) =>
            item.supervisorStatus === "Approved" &&
            (item.managerName === personalInfo.name ||
              item.supervisorName === personalInfo.name)
        )
      : userType === "Supervisor"
      ? filteredData.filter((item) => item.supervisorName === personalInfo.name)
      : filteredData;

  useEffect(() => {
    const filteredData = finalData;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setData(paginatedData);
  }, [currentPage, rowsPerPage]);
  const filteredResults = finalData;
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);
  const dataToDisplay = userType === "HR" || userType === "SuperAdmin" ? filteredData : finalData;
  return (
    <section className="flex flex-col">
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto">
        <table className="w-[1150px]">
          <thead className="bg-black sticky top-0">
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
            {finalData && finalData.length > 0 ? (
              finalData.map((item, index) => (
                <tr
                  key={item.id}
                  className="text-center text-sm border-b-2 border-[#CECECE]"
                >
                  <td className="border-b-2 border-[#CECECE] py-3">
                    {index + 1}
                  </td>
                  <td className="border-b-2 border-[#CECECE] py-3">
                    {item.empID}
                  </td>
                  <td className="border-b-2 border-[#CECECE] text-start pl-4">
                    {item.employeeInfo.name || "Tony Stark"}
                  </td>
                  <td className="border-b-2 border-[#CECECE]">
                    {formatDate(item.createdAt)}
                  </td>
                  {userType !== "Supervisor" && userType !== "Manager" && (
                    <td className="border-b-2 border-[#CECECE]">
                      {item.supervisorName || "N/A"}
                    </td>
                  )}
                  {userType !== "Manager" && (
                    <td className="border-b-2 border-[#CECECE]">
                      {formatDate(item.supervisorDate) || "N/A"}
                    </td>
                  )}
                  {userType !== "Manager" && userType !== "Supervisor" && (
                    <td className="border-b-2 border-[#CECECE]">
                      {item.managerName || "N/A"}
                    </td>
                  )}
                  {userType !== "Supervisor" && (
                    <td className="border-b-2 border-[#CECECE]">
                      {formatDate(item.managerDate) || "N/A"}
                    </td>
                  )}
                  <td className="border-b-2 border-[#CECECE] cursor-pointer">
                    <span
                      className="border-b-2 border-dark_grey"
                      onClick={() => {
                        handleClickForToggle();
                        onViewClick(item);
                      }}
                    >
                      {item["submitted Form"] || "View"}
                    </span>
                  </td>
                  {/* <td className="border-b-2 border-[#CECECE] cursor-pointer">
                  <span
                    className="border-b-2 border-dark_grey"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    {"Delete"}
                  </span>
                </td> */}
                  <td className={`${getStatusClass(item.managerStatus)}`}>
                    {(userType === "Supervisior" && item.supervisorStatus) ||
                      (userType === "Manager" && item.managerStatus)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={heading.length} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="ml-20 flex justify-center">
        <div className="w-[60%] flex justify-start mt-4  px-10">
          {(userType !== "SuperAdmin" && userType !== "HR") && (
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
//{userType === "Supervisior" && item.supervisorStatus || userType === "Manager" && item.managerStatus}
