import { useEffect, useState } from "react";
import { LMTable } from "./LMTable";
import { HOLTable } from "./HOLTable";
import { LMDetails } from "./LMDetails";
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
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleClick, setToggleClick] = useState(false);
  const [selectedLeaveData, setSelectedLeaveData] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [userType, setUserType] = useState("");
  const [userID, setUserID] = useState("")
  const [fakeUserType, setFakeUsertype] = useState("Hr");
  const {
    mergedData,
    loading,
    error,
    handleDeleteLeaveStatus,
    handleUpdateLeaveStatus,
    fetchedTicketRequests,
  } = useLeaveManage();

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    console.log("Navbar: User ID from localStorage:", userID);
  }, []);

  // Use the custom hook
  const { personalInfo } = useEmployeePersonalInfo(userID);

  console.log("Mergeddata", mergedData);

  useEffect(() => {
    // Set initial data when mergedData changes
    setData(applyFilters());
  }, [mergedData]);

  const getData = () => {
    if (count === 0) return mergedData;
    if (count === 1) return mergedData;
    if (count === 2) return mergedData;
    if (count === 3) return mergedData;
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

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleClickForToggle = () => {
    setToggleClick(!toggleClick);
  };

  const handleLimitChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const emptySearch = () => {
    setSearchTerm("");
    setData(applyFilters());
  };

  const filteredResults = applyFilters();
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  const handleViewClick = (leaveData, source) => {
    setSelectedLeaveData(leaveData);
    setSource(source);
    setToggleClick(true);
    console.log("data", data);
  };

  // const handleUpdate = (empID, newStatus, remark) => {
  //   setData((prevData) =>
  //     prevData.map((item) =>
  //       item.empID === empID
  //         ? { ...item, status: newStatus, remark: remark }
  //         : item
  //     )
  //   );
  //   setSelectedLeaveData(null);
  //   setToggleClick(false);
  // };

  

  const handleUpdate = async (empID, newStatus, remark) => {
    try {
      await handleUpdateLeaveStatus(empID, { status: newStatus, remark }); // Use the hook's update function
      setSelectedLeaveData(null);
      setToggleClick(false);
      console.log("Update successful for:", empID);
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
    console.log("UserID from localStorage:", userType);
  }, []);

  console.log(personalInfo, "kol")

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
                console.log(count);
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
                  console.log(count);
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
              // emptySearch={emptySearch}
              searchUserList={searchUserList}
              // onSearchChange={handleSearchChange}
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
                  initialData={fetchedTicketRequests}
                  userType={userType}

                  onViewClick={(leaveData) =>
                    handleViewClick(leaveData, "Tickets")
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

        <div className="ml-20 flex justify-center">
          <div className="w-[60%] flex justify-start mt-4  px-10">
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
      </div>
      {toggleClick && selectedLeaveData && (
        <ViewForm
          handleClickForToggle={handleClickForToggle}
          leaveData={selectedLeaveData}
          source={source}
          onUpdate={handleUpdate}
          userType={userType}
          ticketRequest={fetchedTicketRequests}
          personalInfo={personalInfo}
        />
      )}
    </section>
  );
};
