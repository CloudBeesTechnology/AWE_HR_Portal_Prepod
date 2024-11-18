import React from "react";

export const EmpLeaveBalance = ({ initialData }) => {
  const heading = [
    "Employee ID",
    "Employee Name",
    "No of Leave Taken",
    "No of Leave Remaining",
  ];

  return (
    <div className="leaveManagementTable max-h-[calc(70vh-7rem)] max-w-[100%] overflow-y-auto">
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
  );
};
