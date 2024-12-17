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
      if (location.pathname === "/leaveManage/historyLeave") {
        const isValid =
          item?.empStatus !== "Cancelled" && item.managerStatus === "Approved";

        return isValid;
      } else {
        const isValid = item?.empStatus !== "Cancelled";

        return isValid;
      }
    });
    console.log(filteredDataValue);

    setSecondartyData(filteredDataValue);
    setData(filteredDataValue);
  }, [
    ticketMerged,
    filterStatus,
    selectedDate,
    searchTerm,
    mergedData,
    location.pathname,
  ]);

  const getData = () => {
    let dataToReturn = [];
    if (
      location.pathname === "/leaveManage" ||
      location.pathname === "/leaveManage/historyLeave" ||
      location.pathname === "/leaveManage/leaveBalance"
    ) {
      dataToReturn = data;
    } else if (location.pathname === "/leaveManage/requestTickets") {
      dataToReturn = ticketMerged;
    }

    // Apply the empStatus filter to exclude "Cancelled" status
    return dataToReturn.filter((item) => item.empStatus !== "Cancelled");
  };

  const dateFD = (selectedDate) => {
    try {
      if (!selectedDate) {
        setSearchResults([]);
        setFilteredData(data);
        return;
      }

      const selectedDateObj = new Date(selectedDate);
      // Set time to midnight to compare dates only
      selectedDateObj.setHours(0, 0, 0, 0);
      
      const filtered = mergedData.filter((item) => {
        // Skip items without any dates
        if (!item.leaveStatusCreatedAt && !item.empLeaveStartDate && !item.empLeaveEndDate) {
          return false;
        }

        if (location.pathname === "/leaveManage") {
          const createdDate = new Date(item.leaveStatusCreatedAt);
          createdDate.setHours(0, 0, 0, 0);
          return createdDate.getTime() === selectedDateObj.getTime();
        }

        if (location.pathname === "/leaveManage/historyLeave") {
          const startDate = item.empLeaveStartDate ? new Date(item.empLeaveStartDate) : null;
          const endDate = item.empLeaveEndDate ? new Date(item.empLeaveEndDate) : null;

          if (startDate) startDate.setHours(0, 0, 0, 0);
          if (endDate) endDate.setHours(0, 0, 0, 0);

          return (
            (startDate && startDate.getTime() === selectedDateObj.getTime()) ||
            (endDate && endDate.getTime() === selectedDateObj.getTime())
          );
        }

        return false;
      });

      // If no results found for the selected date, set empty arrays
      if (filtered.length === 0) {
        setSearchResults([]);
        setFilteredData([]);
      } else {
        setSearchResults(filtered);
        setFilteredData(filtered);
      }
    } catch (error) {
      console.error("Error in date filtering:", error);
      // In case of error, show no results
      setSearchResults([]);
      setFilteredData([]);
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (!date) {
      // Reset to show all data when date is cleared
      setSearchResults([]);
      setFilteredData(data);
    } else {
      dateFD(date);
    }
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
      setCurrentPage(1);
      setData(result);
    } catch (error) {
      console.error("Error search data", error);
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

    const dataToPaginate = searchResults.length > 0 ? searchResults : data;

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
  }, [
    currentPage,
    rowsPerPage,
    data,
    searchResults,
    selectedDate,
    filterStatus,
  ]);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : data.length) /
      rowsPerPage
  );

  // console.log(selectedLeaveData); // Ensure at least one has data
  // console.log(selectedTicketData);
  // console.log(filteredData);

  // const check=filteredData.map((val)=>{
  //   return val.empID
  //     })
  //     console.log(check);

  return (
    <section className={`py-20 px-10`}>
      <div className="screen-size">
        <section className="flex flex-wrap justify-between items-center py-3">
          {(location.pathname === "/leaveManage" ||
            location.pathname === "/leaveManage/historyLeave") && (
            <div className="">
              <NavigateLM userType={userType} />
            </div>
          )}
          <div
            className={`flex flex-wrap gap-5 ${
              location.pathname === "/leaveManage/leaveBalance"
                ? "justify-end"
                : ""
            }`}
          >
            {location.pathname !== "/leaveManage/leaveBalance" &&
              location.pathname !== "/leaveManage/requestTickets" && (
                <Searchbox
                  allEmpDetails={secondartyData}
                  searchIcon2={<IoSearch />}
                  placeholder="Employee ID"
                  searchUserList={searchUserList}
                  border="rounded-md"
                />
              )}
            {location.pathname !== "/leaveManage/leaveBalance" &&
              location.pathname !== "/leaveManage/requestTickets" && (
                <div className="py-2  text_size_5 bg-white border rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
                  <input
                    type="date"
                    name="selectedDate"
                    className="text-grey outline-none"
                    value={selectedDate || ""}
                    onChange={handleDateChange}
                  />
                </div>
              )}

            {/* {location.pathname === "/leaveManage" &&
              userType === "SuperAdmin" && (
                <Filter AfterFilter={handleFilterChange} />
              )} */}
          </div>
        </section>
        <section className="center w-full">
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
          <div className="w-[60%] flex justify-start mt-4 px-10">
            {/* Conditionally render pagination only for tables other than LMTable and TicketsTable */}

            {location.pathname !== "/leaveManage/leaveBalance" &&
              location.pathname !== "/leaveManage/requestTickets" && (
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
