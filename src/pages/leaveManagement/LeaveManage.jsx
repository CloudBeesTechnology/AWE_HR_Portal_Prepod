import { useEffect, useState } from "react";
import { useLocation, Link, Outlet, Navigate } from "react-router-dom";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";
import { IoSearch } from "react-icons/io5";
import { ViewForm } from "./ViewForm";
import { Searchbox } from "../../utils/Searchbox";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import useEmployeePersonalInfo from "../../hooks/useEmployeePersonalInfo";
import { NavigateLM } from "./NavigateLM";

export const LeaveManage = () => {
  const [data, setData] = useState([]);
  const [source, setSource] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleClick, setToggleClick] = useState(false);
  const [selectedLeaveData, setSelectedLeaveData] = useState(null);
  const [secondartyData, setSecondartyData] = useState([]);
  const [selectedTicketData, setSelectedTicketData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [userType, setUserType] = useState("");
  const [userID, setUserID] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Add this state at the top with other states
  const [errorState, setErrorState] = useState({
    noResults: false,
    searchError: false,
    dateError: false,
  });

  const location = useLocation();

  const {
    mergedData,
    handleDeleteLeaveStatus,
    handleUpdateLeaveStatus,
    ticketMerged,
    statusUpdate,
  } = useLeaveManage();

  // console.log(mergedData);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  const { personalInfo } = useEmployeePersonalInfo(userID);

  useEffect(() => {
    const filteredDataValue = mergedData.filter((item) => {
      if (location.pathname.replace(/\/$/, '') === "/leaveManage/historyLeave") {
        const isValid =
          item?.empStatus !== "Cancelled" && item.managerStatus === "Approved";

        return isValid;
      } else {
        const isValid = item?.empStatus !== "Cancelled";

        return isValid;
      }
    });

    setSecondartyData(filteredDataValue);
    setData(filteredDataValue);
  }, [filterStatus, searchTerm, mergedData, location.pathname]);

  useEffect(() => {
    let filteredResults = [...mergedData];

    // 1. First apply the status filter
    if (filterStatus !== "All") {
      filteredResults = filteredResults.filter((item) => {
        const status =
          userType === "Manager"
            ? item.managerStatus
            : userType === "Supervisor"
            ? item.supervisorStatus
            : null;

        return status === filterStatus;
      });

      // Apply user-specific filtering
      if (userType === "Manager") {
        filteredResults = filteredResults.filter((item) => {
          return (
            (item?.supervisorStatus === "Approved" &&
              item?.managerEmpID.toString().toLowerCase() === userID) ||
            item?.managerEmpID.toString().toLowerCase() === userID
          );
        });
      } else if (userType === "Supervisor") {
        filteredResults = filteredResults.filter((item) => {
          return item?.supervisorEmpID?.toString().toLowerCase() === userID;
        });
      }
    }

    // 2. Apply the date filter
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      selectedDateObj.setHours(0, 0, 0, 0); // Set to start of the day

      filteredResults = filteredResults.filter((item) => {
        // For leaveManage route
        if (location.pathname.replace(/\/$/, '') === "/leaveManage") {
          const createdDate = item.leaveStatusCreatedAt
            ? new Date(item.leaveStatusCreatedAt)
            : null;
          const supervisorDate = item.supervisorDate
            ? new Date(item.supervisorDate)
            : null;
          const managerDate = item.managerDate
            ? new Date(item.managerDate)
            : null;

          // Normalize the dates to remove time components
          [createdDate, supervisorDate, managerDate].forEach((date) => {
            if (date) date.setHours(0, 0, 0, 0);
          });

          return [createdDate, supervisorDate, managerDate].some(
            (date) => date && date.getTime() === selectedDateObj.getTime()
          );
        }

        // For leaveManage/historyLeave route
        if (location.pathname.replace(/\/$/, '') === "/leaveManage/historyLeave") {
          const startDate = item.empLeaveStartDate
            ? new Date(item.empLeaveStartDate)
            : null;
          const endDate = item.empLeaveEndDate
            ? new Date(item.empLeaveEndDate)
            : null;

          if (startDate) startDate.setHours(0, 0, 0, 0);
          if (endDate) endDate.setHours(0, 0, 0, 0);

          return (
            startDate &&
            endDate &&
            selectedDateObj >= startDate &&
            selectedDateObj <= endDate
          );
        }

        return false;
      });
    }

    // 3. Finally apply the search filter
    if (searchResults.length > 0) {
      const searchEmpIDs = searchResults.map((item) => item.empID);
      filteredResults = filteredResults.filter((item) =>
        searchEmpIDs.includes(item.empID)
      );
    }

    setData(filteredResults);
    setFilteredData([]); // Reset filtered data
    setCurrentPage(1); // Reset to first page when filters change

    // Update error states
    setErrorState({
      noResults: filteredResults.length === 0,
      searchError: searchResults.length > 0 && filteredResults.length === 0,
      dateError: selectedDate && filteredResults.length === 0,
    });
  }, [
    filterStatus,
    selectedDate,
    searchResults,
    mergedData,
    userType,
    userID,
    location.pathname,
  ]);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

  useEffect(() => {
    setSelectedDate(null);
    setSearchTerm("");
    setCurrentPage(1);
  }, [location.pathname]);

  const handleClickForToggle = () => {
    setToggleClick(!toggleClick);
  };

  const handleViewClick = (data, source) => {
    setSource(source);
    if (source === "LM") {
      setSelectedLeaveData(data); // Leave Data
      setSelectedTicketData(null); // Clear ticket data
    } else if (source === "Tickets") {
      console.log(data);

      setSelectedTicketData(data); // Ticket Data
      setSelectedLeaveData(null); // Clear leave data
    }
    setToggleClick(true);
  };

  const handleUpdate = async (empID, newStatus, remark) => {
    try {
      await handleUpdateLeaveStatus(empID, { status: newStatus, remark }); // Use the hook's update function
      setSelectedLeaveData(null);
      setToggleClick(false);
      // console.log("Update successful for:", empID);
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  const searchUserList = async (data) => {
    try {
      const result = await data;
      setSearchResults(result);
    } catch (error) {
      console.error("Error search data", error);
      setSearchResults([]);
    }
  };

  const formatDate = (dateToString) => {
    if (!dateToString || isNaN(new Date(dateToString).getTime())) {
      return "";
    }

    const date = new Date(dateToString);

    const day = date.getDate().toString().padStart(2, "0"); // Local day
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Local month
    const year = date.getFullYear(); // Local year

    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;

    const dataToPaginate =
      searchResults.length > 0 ? searchResults : secondartyData;

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

    setData(paginatedData);
  }, [currentPage, rowsPerPage, secondartyData, searchResults]);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : data.length) /
      rowsPerPage
  );

  // Apply filtering based on filterStatus and userType
  const filteredFinalData = filteredData.filter((item) => {
    const status =
      userType === "Manager"
        ? item.managerStatus
        : userType === "Supervisor"
        ? item.supervisorStatus
        : null;

    if (filterStatus === "All") {
      return true;
    }

    return status === filterStatus;
  });
  let finalDataFiltered;

  if (userType === "Manager") {
    finalDataFiltered = filteredFinalData.filter((item) => {
      const condition =
        (item?.supervisorStatus === "Approved" &&
          item?.managerEmpID.toString().toLowerCase() === userID) ||
        item?.managerEmpID.toString().toLowerCase() === userID;
      return condition;
    });
  } else if (userType === "Supervisor") {
    finalDataFiltered = filteredFinalData.filter((item) => {
      return item?.supervisorEmpID?.toString().toLowerCase() === userID;
    });
  } else {
    finalDataFiltered = filteredFinalData;
  }

  return (
    <section className="py-20 px-10">
      <div className="screen-size">
        {(location.pathname.replace(/\/$/, '') === "/leaveManage" ||
          location.pathname.replace(/\/$/, '') === "/leaveManage/historyLeave") &&
         !(location.pathname.replace(/\/$/, '') === "/leaveManage/leaveBalance" ||
            location.pathname.replace(/\/$/, '') === "/leaveManage/requestTickets") && (
            <section className="flex flex-wrap justify-between items-center mb-5">
              <div className="">
                <NavigateLM userType={userType} />
              </div>

              <div
                className={"flex flex-wrap gap-2"}
              >
                <Searchbox
                  allEmpDetails={secondartyData}
                  searchIcon2={<IoSearch />}
                  placeholder="Employee ID"
                  searchUserList={searchUserList}
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

                {location.pathname.replace(/\/$/, '') === "/leaveManage" &&
                  (userType === "Supervisor" || userType === "Manager") && (
                    <Filter
                      name={filterStatus}
                      AfterFilter={handleFilterChange}
                    />
                  )}
              </div>
            </section>
          )}
       
        <section className="center w-full ">
          <Outlet
            context={{
              handleClickForToggle,
              filteredData,
              ticketMerged,
              currentPage,
              rowsPerPage,
              handleViewClick,
              handleDeleteLeaveStatus,
              personalInfo,
              formatDate,
              data,
              userType,
              statusUpdate,
              mergedData,
              setCurrentPage,
              selectedDate,
            }}
          />
        </section>

        {/* Pagination section */}
        <div className="ml-20 flex justify-center">
          <div className="w-[60%] flex justify-start mt-10 px-10">
            {location.pathname.replace(/\/$/, '') !== "/leaveManage/leaveBalance" &&
              location.pathname.replace(/\/$/, '') !== "/leaveManage/requestTickets" && (
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
      </div>
      {toggleClick && (selectedLeaveData || selectedTicketData) && (
        <ViewForm
          handleClickForToggle={handleClickForToggle}
          leaveData={selectedLeaveData} // If leave data is available
          ticketData={selectedTicketData} // If ticket data is available
          source={source}
          formatDate={formatDate}
          onUpdate={handleUpdate}
          userType={userType}
          ticketRequest={ticketMerged}
          personalInfo={personalInfo}
        />
      )}
    </section>
  );
};
