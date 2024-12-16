import React, { useState, useEffect, useMemo } from "react";
import { Pagination } from "./Pagination";
import { data, useOutletContext } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { Searchbox } from "../../utils/Searchbox";
import { LeaveSummaryPopUp } from "./LeaveSummaryPopUp";

export const EmpLeaveBalance = () => {
  const { mergedData, formatDate, userType } = useOutletContext();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [leaveSummary, setLeaveSummary] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [secondartyData, setSecondartyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const heading = [
    "S.No",
    "Employee ID",
    "Employee Name",
    "Leave Type",
    "Leave Taken",
    "Leave Remaining",
    "Waiting for Approval",
    "Summary",
  ];

  useEffect(() => {
    const fetchedData = async () => {
      const result = mergedData.reduce((acc, val) => {
        if (
          val.managerStatus === "Approved" ||
          val.supervisorStatus === "Approved" ||
          val.managerStatus === "Pending" ||
          val.supervisorStatus === "Pending" ||
          val.managerStatus === "Rejected" ||
          val.supervisorStatus === "Rejected"
        ) {
          if (!acc[val.empID]) {
            acc[val.empID] = {
              compassionateLeave: {
                taken: 0,
                total: val.leaveDetails?.compasLeave || 0,
                waitingLeave: 0,
                remaining: 0,
              },
              annualLeave: {
                taken: 0,
                total: Array.isArray(val.leaveDetails?.annualLeave)
                  ? val.leaveDetails.annualLeave[
                      val.leaveDetails.annualLeave.length - 1
                    ]
                  : 0,
                waitingLeave: 0,
                remaining: 0,
              },
              marriageLeave: {
                taken: 0,
                total: val.leaveDetails?.mrageLeave || 0,
                waitingLeave: 0,
                remaining: 0,
              },
              hospitalisationLeave: {
                taken: 0,
                total: val.leaveDetails?.hospLeave || 0,
                waitingLeave: 0,
                remaining: 0,
              },
              maternityLeave: {
                taken: 0,
                total: val.leaveDetails?.materLeave || 0,
                waitingLeave: 0,
                remaining: 0,
              },
              sickLeave: {
                taken: 0,
                total: val.leaveDetails?.sickLeave || 0,
                waitingLeave: 0,
                remaining: 0,
              },
              unpaidLeave: {
                taken: 0,
                total: val.leaveDetails?.unPaidAuthorize || 0,
                waitingLeave: 0,
                remaining: 0,
              },
              paternityLeave: {
                taken: 0,
                total: val.leaveDetails?.paterLeave || 0,
                waitingLeave: 0,
                remaining: 0,
              },
              empId: val.empID,
              employeeName: val.employeeInfo.name,
            };
          }

          const leaveTypeKeyMap = {
            "Compassionate Leave": "compassionateLeave",
            "Annual Leave": "annualLeave",
            "Marriage Leave": "marriageLeave",
            "Hospitalisation Leave": "hospitalisationLeave",
            "Maternity Leave": "maternityLeave",
            "Sick Leave": "sickLeave",
            "Paternity Leave": "paternityLeave",
            "Unpaid Leave": "unpaidLeave",
          };

          const leaveKey = leaveTypeKeyMap[val.leaveType];
          if (leaveKey && val.days > 0) {
            if (
              val.managerStatus === "Approved" &&
              val.empStatus !== "Cancelled"
            ) {
              acc[val.empID][leaveKey].taken += val.days;
            } else if (
              val.managerStatus === "Pending" &&
              val.supervisorStatus !== "Rejected" &&
              val.empStatus !== "Cancelled"
            ) {
              acc[val.empID][leaveKey].waitingLeave += val.days;
            }
            acc[val.empID][leaveKey].remaining =
              acc[val.empID][leaveKey].total -
              (acc[val.empID][leaveKey].taken +
                acc[val.empID][leaveKey].waitingLeave);
          }
        }

        return acc;
      }, {});

      setLeaveSummary(result);
      setFilteredData(Object.entries(result));
    };

    fetchedData();
  }, [mergedData]);

  useEffect(() => {
    const filtered = Object.entries(leaveSummary).filter(
      ([empID, leaveData]) => {
        const employeeName = leaveData.employeeName.toLowerCase();
        const employeeId = leaveData.empId.toLowerCase();
        const query = searchQuery.toLowerCase();
        return employeeId.includes(query) || employeeName.includes(query);
      }
    );
    setFilteredData(filtered);
  }, [searchQuery, leaveSummary]);
  // Handle "view summary" click
  const handleViewSummary = (employee) => {
    // console.log(employee);
    setSelectedEmployee(employee);
    setShowPopup(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedEmployee(null);
  };
  let serialNo = 1;
  // console.log(leaveSummary);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;

    const dataToPaginate =
      searchResults.length > 0 ? searchResults : Object.entries(leaveSummary);

    // const sortedData = dataToPaginate.sort((a, b) => {
    //   const regex = /\d+$/;

    //   const numPartA = a.empID.match(regex)
    //     ? a.empID.match(regex)[0].padStart(5, "0")
    //     : "";
    //   const numPartB = b.empID.match(regex)
    //     ? b.empID.match(regex)[0].padStart(5, "0")
    //     : "";

    //   const prefixA = a.empID.replace(regex, "").toLowerCase();
    //   const prefixB = b.empID.replace(regex, "").toLowerCase();

    //   if (prefixA !== prefixB) {
    //     return prefixA.localeCompare(prefixB);
    //   }

    //   return numPartA.localeCompare(numPartB);
    // });

    const paginatedData = dataToPaginate.slice(
      startIndex,
      startIndex + rowsPerPage
    );

    // console.log(paginatedData);

    setFilteredData(paginatedData);
  }, [currentPage, rowsPerPage, leaveSummary, searchResults]);

  const totalPages = Math.ceil(
    (searchResults.length > 0
      ? searchResults.length
      : Object.entries(leaveSummary).length) / rowsPerPage
  );
  const startIndex = (currentPage - 1) * rowsPerPage;
  return (
    <section className="relative py-5">
      <div className="absolute right-0 -top-12 ">
        <div className="py-2 w-full text_size_5 bg-white border rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
          <input
            type="text"
            placeholder="Employee ID"
            className="outline-none w-full text-sm"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="text-dark_grey text-2xl mr-1">
            <IoSearch />
          </span>
        </div>
      </div>
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-y-auto rounded-xl">
        {filteredData.length > 0 ? (
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
              {filteredData.map(([empID, leaveData], parentIndex) => {
                let leaveRows = [];
                const displayParentIndex = startIndex + parentIndex + 1; // Adjust index based on pagination

                Object.entries(leaveData).forEach(
                  ([leaveType, data], subIndex) => {
                    if (leaveType !== "empId" && leaveType !== "employeeName") {
                      const leaveName = leaveType
                        .replace(/([A-Z])/g, " $1")
                        .trim();
                      const serialNumber = `${displayParentIndex}.${
                        subIndex + 1
                      }`;
                      leaveRows.push(
                        <tr
                          key={`${empID}-${leaveType}`}
                          className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                        >
                          <td className="py-5">{serialNumber}</td>
                          <td className="py-5">{leaveData.empId}</td>
                          <td className="py-5">{leaveData.employeeName}</td>
                          <td className="py-5">{leaveName}</td>
                          <td className="py-5">{data.taken || 0}</td>
                          <td className="py-5">
                            {data.remaining < 0 ? 0 : data.remaining || 0}
                          </td>
                          <td className="py-5">{data.waitingLeave || 0}</td>
                        </tr>
                      );
                    }
                  }
                );

                return (
                  <React.Fragment key={empID}>
                    {leaveRows}
                    <tr className="text-end w-full text-lg shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] ">
                      <td colSpan="8" className="p-5 w-full">
                        <button
                          onClick={() => handleViewSummary(leaveData)}
                          className="border-b-2 text-[blue]"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-6 py-20">
            <p>No leave data available for employees.</p>
          </div>
        )}
      </div>

      {/* Popup for Leave Summary (Updated with employee details) */}
      {showPopup && selectedEmployee && (
        <LeaveSummaryPopUp
          selectedEmployee={selectedEmployee}
          handleClosePopup={handleClosePopup}
        />
      )}
      <div className="center my-10">
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              if (newPage >= 1 && newPage <= totalPages) {
                setCurrentPage(newPage);
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};
