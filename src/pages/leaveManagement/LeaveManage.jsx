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
  const [noDataMessage, setNoDataMessage] = useState("");

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
// console.log(mergedData);

  useEffect(() => {
    // Start with the base filtered data from mergedData
    let filteredResults = mergedData.filter((item) => {
      if (location.pathname.replace(/\/$/, '') === "/leaveManage/historyLeave") {
        return item?.empStatus !== "Cancelled" && item.managerStatus === "Approved";
      }
      return item?.empStatus !== "Cancelled";
    });

    // Apply user type filtering
    filteredResults = filteredResults.filter((item) => {
      if (userType === "Manager") {
        
        return (
          item?.empStatus !== "Cancelled" &&
          item?.managerEmpID === userID &&
          ((item?.supervisorStatus === "Approved" && item?.supervisorEmpID) || 
           (item?.supervisorStatus === "Pending" && !item?.supervisorEmpID))
        );
        
      } else if (userType === "Supervisor") {
        return item?.supervisorEmpID === userID;
      } else if (userType === "SuperAdmin" || userType === "HR") {
        return true;
      }
      return false;
    });

    // Apply status filter if not "All"
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
    }
// console.log(filteredResults);

    // Store the base filtered results before applying date and search filters
    setSecondartyData(filteredResults);

    // Apply date filter if selected
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      selectedDateObj.setHours(0, 0, 0, 0);

      filteredResults = filteredResults.filter((item) => {
        if (location.pathname.replace(/\/$/, '') === "/leaveManage") {
          const dates = [
            new Date(item.leaveStatusCreatedAt),
            new Date(item.supervisorDate),
            new Date(item.managerDate)
          ].filter(date => !isNaN(date.getTime()));

          dates.forEach(date => date.setHours(0, 0, 0, 0));
          return dates.some(date => date.getTime() === selectedDateObj.getTime());
        }

        if (location.pathname.replace(/\/$/, '') === "/leaveManage/historyLeave") {
          const startDate = new Date(item.empLeaveStartDate);
          const endDate = new Date(item.empLeaveEndDate);

          if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            return selectedDateObj >= startDate && selectedDateObj <= endDate;
          }
        }
        return false;
      });
    }

    // Apply search filter if there are search results
    if (searchResults.length > 0) {
      const searchEmpIDs = new Set(searchResults.map(item => item.empID));
      filteredResults = filteredResults.filter(item => searchEmpIDs.has(item.empID));
    }

    setData(filteredResults);
    setCurrentPage(1);

    // Update error states
    setErrorState({
      noResults: filteredResults.length === 0,
      searchError: searchResults.length > 0 && filteredResults.length === 0,
      dateError: selectedDate && filteredResults.length === 0,
    });
  }, [mergedData, filterStatus, selectedDate, userType, userID, location.pathname]);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setSearchResults([]); // Reset search when date changes
  };

  useEffect(() => {
    setSelectedDate(null);
    setSearchTerm("");
    setFilterStatus("All")
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
      setSelectedDate(""); // Reset date when searching
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

// console.log(data);

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
              errorState,
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
