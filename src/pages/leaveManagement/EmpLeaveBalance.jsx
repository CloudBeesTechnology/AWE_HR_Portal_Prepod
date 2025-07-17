import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Pagination } from "./Pagination";
import { data, useNavigate, useOutletContext } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { Searchbox } from "../../utils/Searchbox";
import { LeaveSummaryPopUp } from "./LeaveSummaryPopUp";
import { NavigateLM } from "./NavigateLM";
import { capitalizedLetter, DateFormat } from "../../utils/DateFormat";
import { FiLoader } from "react-icons/fi";

export const EmpLeaveBalance = () => {
  const { mergedData, userType, loading } = useOutletContext();
  const [showPopup, setShowPopup] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [secondartyData, setSecondartyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [data, setData] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [mergedLeaveData, setMergedLeaveData] = useState([]);

  let nav = useNavigate();
  const heading = [
    "S.No",
    "Employee ID",
    "Employee Name",
    "Employee BadgeNo",
    "Date of Join",
    "Position",
    "Department",
    "Summary",
  ];

  useEffect(() => {
    const formattedDate = (selectedDate) => {
      let leaveDateObj = null;

      if (selectedDate?.includes("/")) {
        // Format: DD/MM/YYYY
        const [day, month, year] = selectedDate.split("/").map(Number);
        leaveDateObj = new Date(year, month - 1, day);
      } else if (selectedDate?.includes("-")) {
        // Format: YYYY-MM-DD
        leaveDateObj = new Date(selectedDate);
      }
      leaveDateObj.setHours(0, 0, 0, 0);
      return leaveDateObj;
    };

    function seperateLeaves(data) {
      const hasOnlySlashOrDash = /[\/-]/;
      const seperatedLeaves = [];

      data.forEach((item) => {
        let fromDate = null;
        let toDate = null;

        if (
          String(item?.empLeaveSelectedFrom) &&
          String(item?.empLeaveSelectedTo) &&
          hasOnlySlashOrDash.test(item?.empLeaveSelectedFrom) &&
          hasOnlySlashOrDash.test(item?.empLeaveSelectedTo)
        ) {
          fromDate = formattedDate(item.empLeaveSelectedFrom);
          toDate = formattedDate(item.empLeaveSelectedTo);
        } else if (
          String(item?.empLeaveStartDate) &&
          String(item?.empLeaveEndDate) &&
          hasOnlySlashOrDash.test(item?.empLeaveStartDate) &&
          hasOnlySlashOrDash.test(item?.empLeaveEndDate)
        ) {
          fromDate = formattedDate(item.empLeaveStartDate);
          toDate = formattedDate(item.empLeaveEndDate);
        }

        if (!fromDate || !toDate) {
          console.log("⛔ Invalid item (missing valid dates):", item);
          return;
        }

        let currentDate = new Date(fromDate);
        currentDate.setHours(0, 0, 0, 0);
        const formatLocalDate = (dateObj) => {
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const day = String(dateObj.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };

        const formatLocalDateTime = (dateObj) => {
          const yyyy_mm_dd = formatLocalDate(dateObj);
          return `${yyyy_mm_dd}T00:00:00.000`;
        };

        // Count total leave days between two dates (inclusive)
        const dayCount =
          Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;

        const leaveTakenCount = dayCount > item?.days ? dayCount : item?.days;
        const totalLeave = parseFloat(dayCount);
        // const isHalfDay = totalLeave % 1 !== 0;
       
        for (let i = 0; i < dayCount; i++) {
          const leaveDate = new Date(currentDate);
          const formattedDate = formatLocalDate(leaveDate);
          const isoDateStr = formatLocalDateTime(leaveDate);

          let assignedDays = 1;

          // 🔁 If only 1 day and it's half-day
          if (dayCount === 1 && parseFloat(item?.days) === 0.5) {
            assignedDays = 0.5;

            // 🔁 If last day and total leave includes fraction
          }
          // else if (i === dayCount - 1 && parseFloat(item?.days) % 1 !== 0) {
          //   console.log("assignedDays : ", parseFloat(item?.days) % 1);
          //   assignedDays = parseFloat(item?.days) % 1;

          //   // 🔁 If i exceeds the number of actual leave days
          // }
          // else if (i >= Math.floor(parseFloat(item?.days))) {
          //   break;
          // }

          // if (i === dayCount - 1 && parseFloat(item?.days) === 0.5) {
          //   assignedDays = 0.5;
          // } else if (i === dayCount - 1 && parseFloat(item?.days) !== 0.5) {
          //   assignedDays = totalLeave - Math.floor(totalLeave);
          // } else if (i >= Math.floor(totalLeave)) {
          //   break; // prevent adding extra days if `days` < `dayCount`
          // }

          seperatedLeaves.push({
            ...item,
            empLeaveSelectedFrom: formattedDate,
            empLeaveSelectedTo: formattedDate,
            empLeaveStartDate: isoDateStr,
            empLeaveEndDate: isoDateStr,
            leaveTakenCount: assignedDays,
          });

          currentDate.setDate(currentDate.getDate() + 1);
        }
      });

      return seperatedLeaves;
    }

    // const filteredData = mergedData?.filter((fil) => {
    //   if (fil.empID === "7510" && fil?.leaveType === "Annual Leave") {
    //     return fil;
    //   }
    // });
    // // console.log("empLeaveBalance filteredData : ", filteredData);

    // const splittedLeaveData = seperateLeaves(filteredData);
    // console.log("splittedLeaveData : ",splittedLeaveData);

    const splittedLeaveData = seperateLeaves(mergedData);

    setMergedLeaveData(splittedLeaveData);
  }, [mergedData]);

  useEffect(() => {
    const userID = localStorage.getItem("userID");

    // Step 1: Create a map to track the most recent data by empID
    const recentDataMap = new Map();

    mergedData.forEach((val) => {
      const uniqueKey = val.empID;

      // Determine the most recent timestamp (created or updated)
      const mostRecentTimestamp = new Date(
        Math.max(
          new Date(val.leaveDetailsCreatedAt).getTime(),
          new Date(val.leaveDetailsUpdatedAt).getTime()
        )
      );

      // Compare the most recent timestamp, keeping the most recent entry
      if (
        !recentDataMap.has(uniqueKey) ||
        mostRecentTimestamp >
          new Date(
            Math.max(
              new Date(
                recentDataMap.get(uniqueKey).leaveDetailsCreatedAt
              ).getTime(),
              new Date(
                recentDataMap.get(uniqueKey).leaveDetailsUpdatedAt
              ).getTime()
            )
          )
      ) {
        recentDataMap.set(uniqueKey, val);
      }
    });

    // Step 2: Convert the map values to an array
    const uniqueData = Array.from(recentDataMap.values());

    // Step 3: Filter data based on userType and userID
    const result = uniqueData.filter((item) => {
      if (userType === "Manager") {
        return item.managerEmpID === userID;
      } else if (userType === "Supervisor") {
        return item.supervisorEmpID === userID;
      } else if (userType === "SuperAdmin" || userType === "HR") {
        return true; // Include all items for these user types
      }
      return false; // Default to exclude items if no condition is met
    });

    // console.log("Filtered Result:", result);

    // Step 4: Update state with filtered results

    setSecondartyData(result);
    setData(result);
  }, [mergedData, userType]);

  // Handle "view summary" click
  const handleViewSummary = (employee) => {
    setEmpDetails(employee);
    setShowPopup(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  // console.log(secondartyData);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;

    const dataToPaginate =
      searchResults.length > 0 ? searchResults : secondartyData;

    if (dataToPaginate.length === 0) {
      setFilteredData([]);
      return;
    }

    const sortedData = dataToPaginate.sort((a, b) => {
      const regex = /\d+$/;

      const numPartA = a.empID.match(regex)
        ? a.empID.match(regex)[0].padStart(5, "0")
        : "";
      const numPartB = b.empID.match(regex)
        ? b.empID.match(regex)[0].padStart(5, "0")
        : "";

      const prefixA = a.empID.replace(regex, "").toLowerCase();
      const prefixB = b.empID.replace(regex, "").toLowerCase();

      if (prefixA !== prefixB) {
        return prefixA.localeCompare(prefixB);
      }

      return numPartA.localeCompare(numPartB);
    });

    const paginatedData = sortedData.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setFilteredData(paginatedData);
  }, [currentPage, rowsPerPage, secondartyData, searchResults]);

  const totalPages = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : secondartyData.length) /
      rowsPerPage
  );
  const startIndex = (currentPage - 1) * rowsPerPage;
  const searchUserList = async (data) => {
    try {
      const result = await data;
      setSearchResults(result || []);
      setHasSearched(true);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error search data", error);
      setSearchResults([]);
      setHasSearched(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-transparent">
        <div className="flex justify-between gap-2">
          <p className="text-sm font-semibold">Loading </p>
          <p>
            <FiLoader className="animate-spin mt-[4px]" size={15} />
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full">
      <div className="flex flex-wrap justify-between items-center mb-5">
        <div className="">
          <NavigateLM userType={userType} />
        </div>
        <Searchbox
          allEmpDetails={secondartyData}
          searchIcon2={<IoSearch />}
          placeholder="Employee ID"
          searchUserList={searchUserList}
          border="rounded-md"
        />
      </div>

      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-xl">
        {hasSearched && searchResults.length === 0 ? (
          <div className="text-center mt-6 py-20">
            <p className="text-red-500 font-medium">
              No matching results found for your search.
            </p>
          </div>
        ) : filteredData.length > 0 ? (
          <table className="w-full font-semibold text-sm">
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
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item, index) => {
                  const displayIndex = startIndex + index + 1;
                  return (
                    <tr
                      key={index}
                      className="text-center text-sm border-b-2 bg-white border-[#C7BCBC] text-[#303030] hover:bg-medium_blue"
                    >
                      <td className="py-3">{displayIndex}</td>
                      <td className="py-3">{item.empID}</td>
                      <td className="py-3">
                        {capitalizedLetter(item.empName) || "N/A"}
                      </td>
                      <td className="py-3">{item.empBadgeNo || "N/A"}</td>
                      <td className="py-3">{DateFormat(item.doj) || "N/A"}</td>
                      <td className="py-3">
                        {" "}
                        {Array.isArray(item.position)
                          ? capitalizedLetter(
                              item.position[item.position.length - 1]
                            ) || "N/A"
                          : "N/A"}
                      </td>
                      <td className="py-3">
                        {" "}
                        {Array.isArray(item.department)
                          ? capitalizedLetter(
                              item.department[item.department.length - 1]
                            ) || "N/A"
                          : "N/A"}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => {
                            // handleViewSummary(item);
                            nav("/leaveManagement/leaveDetails", {
                              state: { mergedLeaveData, item },
                            });
                            // console.log(item);
                          }}
                          className="border-b-2 text-[blue]"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={heading.length} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-6 py-20">
            <p className="text-gray-600">
              No leave data available for employees.
            </p>
          </div>
        )}
      </div>
      {showPopup && (
        <LeaveSummaryPopUp
          handleClosePopup={handleClosePopup}
          mergedData={mergedData}
          formatDate={DateFormat}
          empDetails={empDetails}
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
