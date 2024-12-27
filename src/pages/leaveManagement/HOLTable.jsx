import React from "react";
import { useOutletContext } from "react-router-dom";

export const HOLTable = () => {
  const { data, formatDate, userType, currentPage, rowsPerPage, selectedDate } =
    useOutletContext();
  const startIndex = (currentPage - 1) * rowsPerPage;

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
      ? "text-[red]"
      : status === "Approved"
      ? "text-[green]"
      : status === "Pending"
      ? "text-dark_grey"
      : "text-[#E8A317]";
  };
  return (
    <section className="py-5 w-full">
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto rounded-xl">
        {data && data.length > 0 ? (
          <table className="w-full font-semibold text-sm">
            <thead className="bg-[#939393] sticky top-0 rounded-t-lg ">
              <tr className="">
                {heading.map((header, index) => (
                  <th key={index} className="px-4 py-5 text-[15px] text-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  const displayIndex = startIndex + index + 1; // Adjust index based on pagination

                  return (
                    <tr
                      key={index}
                      className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                    >
                      <td className="py-5">{displayIndex}</td>
                      <td className="py-5">{item.empID}</td>
                      <td className="py-5">{item.empName || "N/A"}</td>
                      <td className="py-5">{item.empLeaveType}</td>
                      <td className="py-5">{formatDate(item.empLeaveStartDate)}</td>
                      <td className="py-5">{formatDate(item.empLeaveEndDate)}</td>
                      <td className="py-5 w-[20%] break-words overflow-hidden">
                        {item.reason}
                      </td>
                      <td
                        className={`font-semibold ${getStatusClass(
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
        ) : (
          <div className="text-center mt-6 py-20">
            <p>
              {selectedDate 
                ? `No leave history found for ${new Date(selectedDate).toLocaleDateString("en-GB")}`
                : "History leave not available."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
