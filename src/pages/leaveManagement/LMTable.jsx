import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { getUrl } from "@aws-amplify/storage";
import { useOutletContext } from "react-router-dom";
import { Filter } from "./Filter";
import { Searchbox } from "../../utils/Searchbox";
import { NavigateLM } from "./NavigateLM";
import { IoSearch } from "react-icons/io5";
import { capitalizedLetter, DateFormat } from "../../utils/DateFormat";
import { DataSupply } from "../../utils/DataStoredContext";
import { FiLoader } from "react-icons/fi";
export const LMTable = () => {
  const {
    handleClickForToggle,
    handleViewClick,
    userType,
    mergedData,
    userID,
    loading
  } = useOutletContext();

  const {empPIData}=useContext(DataSupply)

  const [lastUploadUrl, setPPLastUP] = useState(""); // State to store the last uploaded file's URL
  const [matchData, setMatchData] = useState([]);
  const [secondartyData, setSecondartyData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [errorState, setErrorState] = useState({
    searchError: false,
    dateError: false,
    noResults: false,
  });
  console.log(mergedData);

  useEffect(() => {
    // Step 1: Initial filtering based on user type
    let filteredData = mergedData
      .filter((items) => {
        if (userType === "Supervisor" && items?.empStatus !== "Cancelled") {
          return items.supervisorEmpID === userID;
        } else if (
          userType === "Manager" &&
          (items.supervisorStatus === "Approved" || !items.supervisorEmpID) &&
          items?.empStatus !== "Cancelled"
        ) {
          return items.managerEmpID === userID;
        } else if ((userType === "SuperAdmin" || userType === "HR") && items?.empStatus !== "Cancelled") {
          return true;
        }
        return false;
      })
      .sort(
        (a, b) =>
          new Date(b.leaveStatusCreatedAt) - new Date(a.leaveStatusCreatedAt)
      );

    // Step 2: Apply status filter
    if (filterStatus !== "All") {
      filteredData = filteredData.filter((item) => {
        const status =
          userType === "Manager"
            ? item.managerStatus
            : userType === "Supervisor"
            ? item.supervisorStatus
            : null;
        return status === filterStatus;
      });
    }

    // Step 3: Apply date filter with proper date comparison
    if (selectedDate) {
      filteredData = filteredData.filter((item) => {
        // Convert selectedDate to Date object
        const selectedDateObj = new Date(selectedDate);

        // Convert supervisor and manager dates to Date objects
        const supervisorDate = item.supervisorDate
          ? new Date(item.supervisorDate)
          : null;
        const managerDate = item.managerDate
          ? new Date(item.managerDate)
          : null;

        const selectedDateFormatted = DateFormat(selectedDateObj);
        const supervisorDateFormatted = DateFormat(supervisorDate);
        const managerDateFormatted = DateFormat(managerDate);

        // Compare formatted dates
        return (
          supervisorDateFormatted === selectedDateFormatted ||
          managerDateFormatted === selectedDateFormatted
        );
      });
    }

    setSecondartyData(filteredData);
    setMatchData(filteredData);
  }, [mergedData, userType, userID, filterStatus, selectedDate]);

  // console.log(matchData);

  // Logic to get the URL of the uploaded file
  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });
      setPPLastUP(result.url.href);
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;

  // Conditional table headers based on userType
  const heading = [
    "S. No",
    "Employee ID",
    "Name",
    "Received Date",
    userType !== "Supervisor" && userType !== "Manager" && "Supervisor Name",
    userType !== "Manager" && "Supervisor Approved Date",
    userType !== "Manager" && userType !== "Supervisor" && "Manager Name",
    userType !== "Supervisor" && "Manager Approved Date",
    "Documents",
    "Submitted Form",
    userType !== "SuperAdmin" && userType !== "HR" && "Status",
  ].filter(Boolean);

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[#339933]"
      : status === "Pending"
      ? "text-[#E8A317]"
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

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
    setErrorState({
      searchError: false,
      dateError: false,
      noResults: false,
    });
  };
  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;

    // Use the filtered data from secondaryData
    let finalData = secondartyData;

    // Apply search filter if exists
    if (searchResults.length > 0) {
      const searchIds = new Set(searchResults.map((item) => item.empID));
      finalData = finalData.filter((item) => searchIds.has(item.empID));
    }

    // Apply pagination
    const paginatedData = finalData.slice(startIndex, startIndex + rowsPerPage);
    setMatchData(paginatedData);

    if (searchResults === 0) {
      setErrorState({
        searchError: true,
      });
    }
  }, [currentPage, rowsPerPage, secondartyData, searchResults]);

  const totalPages = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : secondartyData.length) /
      rowsPerPage
  );

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
    <section className="flex flex-col w-full mt-4">
      <section className="flex flex-wrap justify-between items-center mb-5">
        <div className="">
          <NavigateLM userType={userType} />
        </div>

        <div className={"flex flex-wrap gap-2"}>
          <Searchbox
            allEmpDetails={secondartyData}
            searchIcon2={<IoSearch />}
            placeholder="Employee ID"
            searchUserList={setMatchData}
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

          {(userType === "Supervisor" || userType === "Manager") && (
            <Filter name={filterStatus} AfterFilter={handleFilterChange} />
          )}
        </div>
      </section>
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-xl ">
        {matchData && matchData.length > 0 ? (
          <table className="w-full font-semibold text-sm text-center">
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
              {matchData && matchData.length > 0 ? (
                matchData.map((item, index) => {
                  const displayIndex = startIndex + index + 1;
                  const managerName=empPIData.filter((val)=> val.empID === item.managerEmpID)
                  const supervisorName=empPIData.filter((val)=> val.empID === item.supervisorEmpID)
            
                  
                  return (
                    <tr
                      key={index}
                      className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                    >
                      <td className="py-3">{displayIndex}</td>
                      <td className="py-3">{item.empID}</td>
                      <td className="py-3">{capitalizedLetter(item.empName) || "N/A"}</td>
                      <td className="py-3">
                        {DateFormat(item.leaveStatusCreatedAt)}
                      </td>
                      {userType !== "Supervisor" && userType !== "Manager" && (
                        <td className="py-3">{capitalizedLetter(supervisorName[0]?.name) || "N/A"}</td>
                      )}
                      {userType !== "Manager" && (
                        <td className="py-3">
                          {DateFormat(item.supervisorDate) || "N/A"}
                        </td>
                      )}
                      {userType !== "Manager" && userType !== "Supervisor" && (
                        <td className="py-3">{capitalizedLetter(managerName[0]?.name) || "N/A"}</td>
                      )}
                      {userType !== "Supervisor" && (
                        <td className="py-3">
                          {DateFormat(item.managerDate) || "N/A"}
                        </td>
                      )}

                      <td className="py-3">
                        <a
                          href={lastUploadUrl}
                          onClick={(e) => {
                            if (!item.medicalCertificate) {
                              e.preventDefault();
                            } else {
                              linkToStorageFile(item.medicalCertificate);
                            }
                          }}
                          download
                          className={
                            item.medicalCertificate
                              ? "border-b-2 border-[orange] text-[orange]"
                              : ""
                          }
                        >
                          {item.medicalCertificate ? "Download" : "N/A"}
                        </a>
                      </td>

                      <td className="py-3 cursor-pointer">
                        <button
                          className="border-b-2 border-[blue] text-[blue]"
                          onClick={() => {
                            handleClickForToggle();
                            handleViewClick(item, "LM");
                            console.log(item);
                            
                          }}
                        >
                          {item["submitted Form"] || "View"}
                        </button>
                      </td>
                      <td
                        className={`font-semibold ${getStatusClass(
                          item.managerStatus
                        )}`}
                      >
                        {(userType === "Supervisor" && item.supervisorStatus) ||
                          (userType === "Manager" && item.managerStatus)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={heading.length} className="text-center py-4">
                    {errorState.searchError ? (
                      <p>No matching results found for your search</p>
                    ) : errorState.dateError ? (
                      <p>No records found for the selected date</p>
                    ) : (
                      <p>No data available </p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-6 py-20">
            <p>No matching results found for your search</p>
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