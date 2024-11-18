import React, { useEffect, useState } from "react";

export const TicketsTable = ({
  initialData,
  statusUpdate,
  handleClickForToggle,
  onViewClick,
  userType,
}) => {
  const [data, setData] = useState(initialData);

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

  
  return (
    <div className="leaveManagementTable max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto">
      <table className="w-[1150px]">
        <thead className="bg-black">
          <tr className="  bg-[#C5C5C5]  rounded-sm">
            {heading.map((header, index) => (
              <th key={index} className=" px-4 py-5 text-[15px] text-secondary">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
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
                    {item.employeeInfo.department || "Testing"}
                  </td>
                  <td className="border-b-2 border-[#CECECE]">
                    {item.employeeInfo.positon || "Testing"}
                  </td>
                  <td className="border-b-2 border-[#CECECE]">
                    {new Date(
                      item.ticketRequest.createdAt
                    ).toLocaleDateString()}
                  </td>
                  <td className="border-b-2 border-[#CECECE]">
                    {item.ticketRequest.departureDate}
                  </td>
                  <td className="border-b-2 border-[#CECECE]">
                    {item.ticketRequest.arrivalDate}
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
                        item.ticketRequest.hrStatus === "Rejected"
                          ? "text-[#C50000]"
                          : item.ticketRequest.hrStatus === "Approved"
                          ? "text-[#0CB100]"
                          : item.ticketRequest.hrStatus === "Pending"
                          ? "text-dark_grey"
                          : ""
                      }`}
                    >
                      {item.ticketRequest.hrStatus}
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
