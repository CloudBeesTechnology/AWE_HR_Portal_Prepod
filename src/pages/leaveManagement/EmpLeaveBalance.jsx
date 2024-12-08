import React, { useState, useEffect } from "react";
import { Pagination } from "./Pagination";

export const EmpLeaveBalance = ({ initialData, userType, personalInfo }) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // For the selected employee
  const [showPopup, setShowPopup] = useState(false); // For the popup visibility

  const heading = [
    "S.No",
    "Employee ID",
    "Employee Name",
    "No of Leave Taken",
    "Leave Type",
    "No of Leave Remaining",
    "Summary"
  ];

  useEffect(() => {
    const filteredData = data;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    setData(paginatedData);
  }, [currentPage, rowsPerPage]);

  const filteredResults = data;
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

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

  // Function to get remaining leave for a specific leave type
  const getRemainingLeave = (leaveType, employeeLeaveDetails) => {
    switch (leaveType) {
      case "Annual Leave":
        return employeeLeaveDetails.remainingAnualLeave || "N/A";
      case "Hospitalisation Leave":
        return employeeLeaveDetails.remainingHosLeave || "N/A";
      case "Compassionate Leave":
        return employeeLeaveDetails.remainingCompasLeave || "N/A";
      case "Marriage Leave":
        return employeeLeaveDetails.remainingMrageLeave || "N/A";
      case "Paternity Leave":
        return employeeLeaveDetails.remainingPaternityLeave || "N/A";
      case "Sick Leave":
        return employeeLeaveDetails.remainingSickLeave || "N/A";
      case "Maternity Leave":
        return employeeLeaveDetails.remainingMateLeave || "N/A";
      default:
        return "N/A";
    }
  };

  return (
    <section>
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-y-auto rounded-xl">
        <table className="w-[1150px] font-semibold text-sm">
          <thead className="bg-[#939393] sticky top-0 rounded-t-lg">
            <tr>
              {heading.map((header, index) => (
                <th key={index} className="px-4 py-5 text-[15px] text-white">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {finalData &&
              finalData.map((item, index) => {
                const remainingLeave = getRemainingLeave(item.leaveType, item.leaveDetails);
                return (
                  <tr
                    key={index}
                    className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                  >
                    <td className="border-b-2 border-[#CECECE] py-3">{index + 1}</td>
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
                        className="border-b-2 text-[blue]"
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

      {/* Popup for Leave Summary (Updated with employee details) */}
      {showPopup && selectedEmployee && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-w-[1000px] overflow-y-auto max-h-[70%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="uppercase text-xl font-bold">Leave Summary for {selectedEmployee.employeeInfo.name}</h2>
              <button
                onClick={handleClosePopup}
                className="text-white uppercase px-4 py-2 text-xs font-bold rounded-full bg-grey"
              >
                Close
              </button>
            </div>
            <div className="space-y-4 font-semibold">
              {/* Employee Details */}
              <h2 className="uppercase"> Employee ID: {selectedEmployee.empID}</h2>
              <h2 className="uppercase"> Total Leave Balances: </h2>
              <table className="min-w-full bg-white text-sm font-semibold">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-sm">Leave Type</th>
                    <th className="border px-4 py-2 text-sm">Days Taken</th>
                    <th className="border px-4 py-2 text-sm">Remaining Leave</th>
                  </tr>
                </thead>
                <tbody>
                  {["Annual Leave", "Hospitalisation Leave", "Compassionate Leave", "Marriage Leave", "Paternity Leave", "Sick Leave", "Maternity Leave"].map((leaveType) => {
                    const remainingLeave = getRemainingLeave(leaveType, selectedEmployee.leaveDetails);
                    const leaveTaken = initialData
                      .filter(item => item.empID === selectedEmployee.empID && item.leaveType === leaveType)
                      .reduce((total, item) => total + item.days, 0);
                    return (
                      <tr key={leaveType} className="text-center">
                        <td className="border px-4 py-2">{leaveType}</td>
                        <td className="border px-4 py-2">{leaveTaken} days</td>
                        <td className="border px-4 py-2">{remainingLeave} days</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h2 className="uppercase">Leave Taken:</h2>
              {initialData
                .filter(item => item.empID === selectedEmployee.empID)
                .map((leaveRecord, index) => (
                  <p key={index} className="text-sm">
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
