import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { NavigateLM } from "./NavigateLM";
import { Searchbox } from "../../utils/Searchbox";
import { IoSearch } from "react-icons/io5";
import { Pagination } from "./Pagination";
import { capitalizedLetter, DateFormat } from "../../utils/DateFormat";

export const HOLTable = () => {
  const { userType, mergedData, userID, loading } = useOutletContext();

  const [matchData, setMatchData] = useState([]);
  const [secondartyData, setSecondartyData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [errorState, setErrorState] = useState({
    searchError: false,
    dateError: false,
    noResults: false,
  });
  const startIndex = (currentPage - 1) * rowsPerPage;

  // console.log(mergedData);

  // useEffect(() => {
  //   // Step 1: Initial filtering based on user type
  //   let filteredData = mergedData
  //     .filter((items) => {
  //       if (
  //         userType === "Supervisor" &&
  //         items?.empStatus !== "Cancelled" &&
  //         items.managerStatus === "Approved"
  //       ) {
  //         return items.supervisorEmpID === userID;
  //       } else if (
  //         userType === "Manager" &&
  //         (items.supervisorStatus === "Approved" || !items.supervisorEmpID) &&
  //         items?.empStatus !== "Cancelled" &&
  //         items.managerStatus === "Approved"
  //       ) {
  //         return items.managerEmpID === userID;
  //       } else if (userType === "SuperAdmin" || userType === "HR") {
  //         return true;
  //       }
  //       return false;
  //     })
  //     .sort(
  //       (a, b) =>
  //         new Date(b.leaveStatusCreatedAt) - new Date(a.leaveStatusCreatedAt)
  //     );

  //   if (selectedDate) {
  //     filteredData = filteredData.filter((item) => {
 
  //       const selectedDateObj = new Date(selectedDate);
  //       const empLeaveEndDate =
  //         item.empLeaveSelectedTo || item.empLeaveEndDate
  //           ? new Date(item.empLeaveSelectedTo || item.empLeaveEndDate)
  //           : null;
  //       const empLeaveStartDate =
  //         item.empLeaveSelectedFrom || item.empLeaveStartDate
  //           ? new Date(item.empLeaveSelectedFrom || item.empLeaveStartDate)
  //           : null;

  //       const selectedDateFormatted = DateFormat(selectedDateObj);
  //       const empLeaveEndDateFormatted = DateFormat(
  //         empLeaveEndDate || item.empLeaveEndDate
  //       );
  //       const empLeaveStartDateFormatted = DateFormat(
  //         empLeaveStartDate || item.empLeaveStartDate
  //       );

  //       return (
  //         empLeaveEndDateFormatted === selectedDateFormatted ||
  //         empLeaveStartDateFormatted === selectedDateFormatted
  //       );
  //     });
  //   }
  //   // console.log(filteredData);

  //   setSecondartyData(filteredData);
  //   setMatchData(filteredData);
  // }, [mergedData, userType, userID, selectedDate]);

  useEffect(() => {
    // Step 1: Initial filtering based on user type
    let filteredData = mergedData
      .filter((items) => {
        if (
          userType === "Supervisor" &&
          items?.empStatus !== "Cancelled" &&
          items.managerStatus === "Approved"
        ) {
          return items.supervisorEmpID === userID;
        } else if (
          userType === "Manager" &&
          (items.supervisorStatus === "Approved" || !items.supervisorEmpID) &&
          items?.empStatus !== "Cancelled" &&
          items.managerStatus === "Approved"
        ) {
          return items.managerEmpID === userID;
        } else if (
          (userType === "SuperAdmin" || userType === "HR") &&
          items.managerStatus === "Approved" 
        ) {
          return true;
        }
        return false;
      })
      .sort(
        (a, b) =>
          new Date(b.leaveStatusCreatedAt) - new Date(a.leaveStatusCreatedAt)
      );
  
    // Step 2: Additional filtering based on selected date
    if (selectedDate) {
      filteredData = filteredData.filter((item) => {
        const selectedDateObj = new Date(selectedDate);
        const empLeaveEndDate =
          item.empLeaveSelectedTo || item.empLeaveEndDate
            ? new Date(item.empLeaveSelectedTo || item.empLeaveEndDate)
            : null;
        const empLeaveStartDate =
          item.empLeaveSelectedFrom || item.empLeaveStartDate
            ? new Date(item.empLeaveSelectedFrom || item.empLeaveStartDate)
            : null;
  
        const selectedDateFormatted = DateFormat(selectedDateObj);
        const empLeaveEndDateFormatted = DateFormat(
          empLeaveEndDate || item.empLeaveEndDate
        );
        const empLeaveStartDateFormatted = DateFormat(
          empLeaveStartDate || item.empLeaveStartDate
        );
  
        return (
          empLeaveEndDateFormatted === selectedDateFormatted ||
          empLeaveStartDateFormatted === selectedDateFormatted
        );
      });
    }
  
    setSecondartyData(filteredData);
    setMatchData(filteredData);
  }, [mergedData, userType, userID, selectedDate]);

  
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


  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setSearchResults([]);
    setCurrentPage(1);
    setErrorState({
      searchError: false,
      dateError: false,
      noResults: false,
    });
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    let finalData = secondartyData;

    // Apply search filter if exists
    if (searchResults.length > 0) {
      const searchIds = new Set(searchResults.map((item) => item.empID));
      finalData = finalData.filter((item) => searchIds.has(item.empID));
    }

    // Apply pagination
    const paginatedData = finalData.slice(startIndex, startIndex + rowsPerPage);
    setMatchData(paginatedData);
  }, [currentPage, rowsPerPage, secondartyData, searchResults]);
  const totalPages = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : secondartyData.length) /
      rowsPerPage
  );

  const isValidDateFormat = (date) => {
    const datePatternSlash = /^\d{4}\/\d{1,2}\/\d{1,2}$/; 
    const datePatternDash = /^\d{4}-\d{2}-\d{2}$/; 
    return datePatternSlash.test(date) || datePatternDash.test(date);
  };

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-sm font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5 w-full">
      <section className="flex flex-wrap justify-between items-center mb-5">
        <div className="">
          <NavigateLM userType={userType} />
        </div>

        <div className={"flex flex-wrap gap-2"}>
          <Searchbox
            allEmpDetails={secondartyData}
            searchIcon2={<IoSearch />}
            placeholder="Employee ID"
            searchUserList={setSearchResults}
            border="rounded-md"
          />

          <div className="py-2  text_size_5 bg-white border rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
            <input
              type="date"
              name="selectedDate"
              className="text-grey outline-none"
              value={selectedDate || ""}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </section>

      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto rounded-xl">
        {matchData && matchData.length > 0 ? (
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
              {matchData &&
                matchData.map((item, index) => {
                  const displayIndex = startIndex + index + 1; // Adjust index based on pagination

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
                      <td className="py-3">
                        {capitalizedLetter(item.empLeaveType)}
                      </td>
                      <td className="py-3">
                        {item.empLeaveSelectedFrom
                          ? isValidDateFormat(item.empLeaveSelectedFrom)
                            ? DateFormat(item.empLeaveSelectedFrom)
                            : item.empLeaveSelectedFrom
                          : item.empLeaveStartDate                
                            ? DateFormat(item.empLeaveStartDate)
                          : "N/A"}
                      </td>

                      <td className="py-3">
                        {item.empLeaveSelectedTo
                          ? isValidDateFormat(item.empLeaveSelectedTo)
                            ? DateFormat(item.empLeaveSelectedTo)
                            : item.empLeaveSelectedTo
                          : item.empLeaveEndDate
                            ? DateFormat(item.empLeaveEndDate)       
                          : "N/A"}
                      </td>

                      <td className="py-3 w-[20%] break-words overflow-hidden">
                        {capitalizedLetter(item.reason) || "N/A"}
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
                          ? item.managerStatus || "not found"
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
                ? `No leave history found for ${new Date(
                    selectedDate
                  ).toLocaleDateString("en-GB")}`
                : "No matching results found for your search."}
            </p>
          </div>
        )}
      </div>
      <div className="ml-20 flex justify-center">
        <div className="w-[60%] flex justify-start mt-10 px-10">
          {matchData && matchData.length > 0 && (
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
