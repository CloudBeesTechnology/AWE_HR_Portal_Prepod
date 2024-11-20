import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";

export const TicketsTable = ({
  initialData,
  statusUpdate,
  handleClickForToggle,
  onViewClick,
  userType,
  formatDate,
  personalInfo,
}) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  const heading = [
    "S.No",
    "Name",
    "Batch Number",
    "Department",
    "Position",
    "Date Join",
    "Departure date",
    "Arrival date",
    "Submitted form",
    userType !== "SuperAdmin" && "Status",
  ];

  const hr = "hr";

  const editStatus = (allItem, status) => {
    statusUpdate(allItem, status);
  };


  const finalData = data
  .filter((item) => item.empStatus !== "Cancelled") // Keep items that aren't cancelled
  .filter((item) => {
    // If the user is HR, filter by HR name
    if (userType === "HR") {
      return item.hrName === personalInfo.name;
    }
    // If not HR, don't filter by hrName
    return true;
  });

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

  return (
    <section className="">
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto flex-grow">
        <table className="w-[1150px]">
          <thead className="bg-black">
            <tr className="  bg-[#C5C5C5]  rounded-sm">
              {heading.map((header, index) => (
                <th
                  key={index}
                  className=" px-4 py-5 text-[15px] text-secondary"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {finalData &&
              finalData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center text-sm border-b-2 border-[#CECECE]"
                  >
                    <td className="border-b-2 border-[#CECECE] py-3">
                      {index + 1}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-3">
                      {item.employeeInfo.name}
                    </td>
                    <td className="border-b-2 border-[#CECECE] pl-4">
                      {item.employeeInfo.empBadgeNo}
                    </td>
                    <td className="border-b-2 border-[#CECECE]">
                      {item.workInfo.department || "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE]">
                      {item.workInfo.position || "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE]">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="border-b-2 border-[#CECECE]">
                      {formatDate(item.departureDate)}
                    </td>
                    <td className="border-b-2 border-[#CECECE]">
                      {formatDate(item.arrivalDate)}
                    </td>

                    <td className="border-b-2 border-[#CECECE] cursor-pointer">
                      <span
                        className="border-b-2 border-dark_grey "
                        onClick={() => {
                          handleClickForToggle();
                          onViewClick(item);
                        }}
                      >
                        {"View"}
                      </span>
                    </td>
                    {userType !== "SuperAdmin" && (
                      <td
                        className={`border-b-2 border-[#CECECE] ${
                          item.hrStatus === "Rejected"
                            ? "text-[#C50000]"
                            : item.hrStatus === "Approved"
                            ? "text-[#0CB100]"
                            : item.hrStatus === "Pending"
                            ? "text-dark_grey"
                            : ""
                        }`}
                      >
                        {item.hrStatus}
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="ml-20 flex justify-center">
        <div className="w-[60%] flex justify-start mt-4  px-10">
          {userType !== "SuperAdmin" && (
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
