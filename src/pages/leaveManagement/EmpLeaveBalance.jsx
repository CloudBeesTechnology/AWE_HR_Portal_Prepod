import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Pagination } from "./Pagination";
import { data, useOutletContext } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { Searchbox } from "../../utils/Searchbox";
import { LeaveSummaryPopUp } from "./LeaveSummaryPopUp";
import { NavigateLM } from "./NavigateLM";
import { DateFormat } from "../../utils/DateFormat";

export const EmpLeaveBalance = () => {
  const { mergedData, userType } = useOutletContext();

  const [showPopup, setShowPopup] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [secondartyData, setSecondartyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [data, setData] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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
// console.log(mergedData);

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
                      className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                    >
                      <td className="py-3">{displayIndex}</td>
                      <td className="py-3">{item.empID}</td>
                      <td className="py-3">{item.empName || "N/A"}</td>
                      <td className="py-3">{item.empBadgeNo || "N/A"}</td>
                      <td className="py-3">{DateFormat(item.doj) || "N/A"}</td>
                      <td className="py-3">
                        {" "}
                        {Array.isArray(item.position)
                          ? item.position[item.position.length - 1] || "N/A"
                          : "N/A"}
                      </td>
                      <td className="py-3">
                        {" "}
                        {Array.isArray(item.department)
                          ? item.department[item.department.length - 1] || "N/A"
                          : "N/A"}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => handleViewSummary(item)}
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
