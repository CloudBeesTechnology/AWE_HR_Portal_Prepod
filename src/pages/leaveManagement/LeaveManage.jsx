import { useEffect, useState } from "react";
import { LMTable } from "./LMTable";
import { HOLTable } from "./HOLTable";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";
import { IoSearch } from "react-icons/io5";
import { FilterMonthAndYear } from "./FilterMonthAndYear";
import { ViewForm } from "./ViewForm";
import { EmpLeaveBalance } from "./EmpLeaveBalance";
import { Searchbox } from "../../utils/Searchbox";
import { TicketsTable } from "./TicketsTable";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import useEmployeePersonalInfo from "../../hooks/useEmployeePersonalInfo";

export const LeaveManage = () => {
  const [data, setData] = useState([]);
  const [source, setSource] = useState(null);
  const [count, setCount] = useState(0);
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(35);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleClick, setToggleClick] = useState(false);
  const [selectedLeaveData, setSelectedLeaveData] = useState(null);
  const [selectedTicketData, setSelectedTicketData] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [userType, setUserType] = useState("");
  const [userID, setUserID] = useState("");
  const [fakeUserType, setFakeUsertype] = useState("Hr");
  const {
    mergedData,
    loading,
    error,
    handleDeleteLeaveStatus,
    handleUpdateLeaveStatus,
    fetchedTicketRequests,
    ticketMerged,
  } = useLeaveManage();

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
  }, []);

  // Use the custom hook
  const { personalInfo } = useEmployeePersonalInfo(userID);

  useEffect(() => {
    // Set initial data when mergedData changes
    setData(applyFilters());
  }, [mergedData]);

  const getData = () => {
    if (count === 0) return mergedData;
    if (count === 1) return mergedData;
    if (count === 2) return mergedData;
    if (count === 3) return ticketMerged;
  };

  const applyFilters = () => {
    let filteredData = getData();

    if (filterStatus !== "All") {
      filteredData = filteredData.filter(
        (item) => item.status === filterStatus
      );
    }
    if (selectedDate) {
      const selectedDateObject = new Date(selectedDate);
      filteredData = filteredData.filter((item) => {
        const itemDate =
          count === 0 ? new Date(item.createdAt) : new Date(item["start Date"]);
        return (
          itemDate.getFullYear() === selectedDateObject.getFullYear() &&
          itemDate.getMonth() === selectedDateObject.getMonth() &&
          itemDate.getDate() === selectedDateObject.getDate()
        );
      });
    }
    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        item.empID.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredData;
  };

  useEffect(() => {
    const filteredData = applyFilters();
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setData(paginatedData);
  }, [currentPage, filterStatus, selectedDate, rowsPerPage, searchTerm, count]);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };


  const handleClickForToggle = () => {
    setToggleClick(!toggleClick);
  };


  const filteredResults = applyFilters();
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  const handleViewClick = (data, source) => {
    setSource(source);
    if (source === "LM") {
      setSelectedLeaveData(data); // Leave Data
      setSelectedTicketData(null); // Clear ticket data
    } else if (source === "Tickets") {
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
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  const searchUserList = async (data) => {
    try {
      const result = await data;
      setData(result);
    } catch (error) {
      console.error("Error search data", error);
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  const formatDate = (dateString) => {
    // Check if the dateString is empty or invalid before processing
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return ''; // Return an empty string or a custom message if invalid
    }
  
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Adds leading zero if day is single digit
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-11, so we add 1
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  
  return (
    <section className={`py-20 px-10`}>
      <div className="screen-size">
        <section className="flex justify-between items-center py-3">
          <p className="text_size_5">
            <span
              className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                count === 0 && "after:bg-primary"
              }`}
              onClick={() => {
                setCount(0);
                setCurrentPage(1);
              }}
            >
              Request Leave
            </span>{" "}
            /{" "}
            <span
              className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                count === 1 && "after:bg-primary"
              }`}
              onClick={() => {
                setCount(1);
                setCurrentPage(1);
              }}
            >
              History of leave
            </span>{" "}
            /{" "}
            <span
              className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                count === 2 && "after:bg-primary"
              }`}
              onClick={() => {
                setCount(2);
                setCurrentPage(1);
              }}
            >
              Employee Leave Balance
            </span>{" "}
            {(userType === "HR" || userType === "SuperAdmin") && (
              <>
                /{" "}
                <span
                  className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                    count === 3 && "after:bg-primary"
                  }`}
                  onClick={() => {
                    setCount(3);
                    setCurrentPage(1);
                  }}
                >
                  Request Tickets
                </span>
              </>
            )}
          </p>
          <div
            className={`flex gap-5 w-[600px] ${
              count === 2 ? "justify-end" : ""
            }`}
          >
            <Searchbox
              allEmpDetails={mergedData}
              searchIcon2={<IoSearch />}
              placeholder="Employee ID"
              searchUserList={searchUserList}
              border="rounded-md"
            />
            {count !== 2 && (
              <>
                <FilterMonthAndYear
                  onDateChange={(day, month, year) => {
                    setSelectedDate(`${year}-${month}-${day}`);
                    setCurrentPage(1);
                  }}
                />
                <Filter AfterFilter={handleFilterChange} />
              </>
            )}
          </div>
        </section>
        <section className="center w-full">
          {count === 0 && (
            <>
              {filteredResults.length > 0 ? (
                <LMTable
                  handleClickForToggle={handleClickForToggle}
                  initialData={data}
                  userType={userType}
                  onViewClick={(leaveData) => handleViewClick(leaveData, "LM")}
                  handleDelete={handleDeleteLeaveStatus}
                  personalInfo={personalInfo}
                  formatDate={formatDate}
                />
              ) : (
                <p className="mt-12 text-center text-gray-500">
                  No results found in the history of leave.
                </p>
              )}
            </>
          )}
          {count === 1 && (
            <>
              {filteredResults.length > 0 ? (
                <HOLTable
                  initialData={data}
                  userType={userType}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  formatDate={formatDate}
                  personalInfo={personalInfo}
                />
              ) : (
                <p className="mt-12 text-center text-gray-500">
                  No results found in the history of leave.
                </p>
              )}
            </>
          )}
          {count === 2 && (
            <>
              {filteredResults.length > 0 ? (
                <EmpLeaveBalance
                  initialData={data}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  formatDate={formatDate}
                  userType={userType}
                />
              ) : (
                <p className="mt-12 text-center text-gray-500">
                  No results found in employee leave balance.
                </p>
              )}
            </>
          )}

          {count === 3 && (
            <>
              {filteredResults.length > 0 ? (
                <TicketsTable
                  handleClickForToggle={handleClickForToggle}
                  initialData={ticketMerged}
                  userType={userType}
                  formatDate={formatDate}
                  personalInfo={personalInfo}
                  onViewClick={(ticketData) =>
                    handleViewClick(ticketData, "Tickets")
                  }
                />
              ) : (
                <p className="mt-12 text-center text-gray-500">
                  No results found in ticket request.
                </p>
              )}
            </>
          )}
        </section>

        {/* Pagination section */}
        <div className="ml-20 flex justify-center">
          <div className="w-[60%] flex justify-start mt-4 px-10">
            {/* Conditionally render pagination only for tables other than LMTable and TicketsTable */}
            {(userType === "SuperAdmin" || userType !== "Supervisior" && userType !== "Manager" && count !== 3) && filteredResults.length > 0  && (
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
