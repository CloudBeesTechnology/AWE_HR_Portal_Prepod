import React from "react";
import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";

export const EmpLeaveBalance = ({ initialData, userType }) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const heading = [
    "Employee ID",
    "Employee Name",
    "No of Leave Taken",
    "No of Leave Remaining",
  ];

  useEffect(() => {
    const filteredData = data;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setData(paginatedData);
  }, [currentPage, rowsPerPage]);
  const filteredResults = data;
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  return (
    <section>    
    <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-y-auto">
    <table className="w-[1150px] ">
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
            return (
              <tr
                key={index}
                className="text-center text-sm border-b-2 border-[#CECECE]"
              >
                <td className="border-b-2 border-[#CECECE] py-3">
                  {item.empID}
                </td>
                <td className="border-b-2 border-[#CECECE]">
                  {item.employeeInfo.name}
                </td>
                <td className="border-b-2 border-[#CECECE]">
                  {item.days}
                </td>
                <td className="border-b-2 border-[#CECECE]">
                  {item["no of leave remaining"]}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
    </div>
    <div className="ml-20 flex justify-center">
    <div className="w-[60%] flex justify-start mt-4  px-10">
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
