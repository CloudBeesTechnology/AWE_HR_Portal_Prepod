import { useEffect, useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";
import { IoSearch } from "react-icons/io5";
import { ViewForm } from "./ViewForm";
import { Searchbox } from "../../utils/Searchbox";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import useEmployeePersonalInfo from "../../hooks/useEmployeePersonalInfo";

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

  //   const check=filteredData.map((val)=>{
  // return val.empID
  //   })
  //   console.log(check);
  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  const { personalInfo } = useEmployeePersonalInfo(userID);

  useEffect(() => {
    // const filtered = applyFilters();
    // console.log(filtered);

    const filteredDataValue = mergedData.filter((item) => {
      if (location.pathname === "/leaveManage/requestTickets") {
        const isValid =
          item?.empStatus !== "Cancelled" &&
          Object.keys(item?.ticketRequest || {}).length > 0;

        return isValid;
      } else if (location.pathname === "/leaveManage/historyLeave") {
        const isValid =
          item?.empStatus !== "Cancelled" && item.managerStatus === "Approved";

        return isValid;
      } else {
        const isValid = item?.empStatus !== "Cancelled";

        return isValid;
      }
    });
    // console.log(filteredDataValue);

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

  // const applyFilters = () => {
  //   let filteredData = getData();

  //   // Apply status filter
  //   if (filterStatus !== "All") {
  //     filteredData = filteredData.filter((item) => {
  //       const supervisorCondition =
  //         userType === "Supervisor" && item.supervisorStatus === filterStatus;
  //       const managerCondition =
  //         userType === "Manager" && item.managerStatus === filterStatus;

  //       const condition = supervisorCondition || managerCondition;
  //       console.log(`Employee ${item.empID} passes condition: ${condition}`);
  //       return condition;
  //     });
  //   }

  //   // Apply search term filter
  //   if (searchTerm) {
  //     filteredData = filteredData.filter(
  //       (item) =>
  //         item.empID
  //           .toString()
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         item.employeeInfo.empBadgeNo
  //           .toString()
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         item.employeeInfo.name
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   // console.log("Filtered Data after applying filters:", filteredData);
  //   return filteredData;
  // };
  const dateFD = (selectedDate) => {
    try {
      const selectedDateObj = new Date(selectedDate);
      const selectedDateLocal = selectedDateObj.toLocaleDateString("en-GB"); // 'DD/MM/YYYY' format

      const filtered = mergedData.filter((item) => {
        if (!item.createdAt && !item.fromDate && !item.toDate) {
          return false;
        }

        let isCreatedAtMatch = false;
        let isFromDateMatch = false;
        let isToDateMatch = false;
        let isDepartureDateMatch = false;
        let isArrivalDateMatch = false;

        if (location.pathname === "/leaveManage") {
          const createdDate = item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-GB") // Convert createdAt to local date
            : null;
          isCreatedAtMatch = createdDate === selectedDateLocal;
        }

        if (location.pathname === "/leaveManage/historyLeave") {
          const fromDate = item.fromDate
            ? new Date(item.fromDate).toLocaleDateString("en-GB") // Convert fromDate to local date
            : null;
          isFromDateMatch = fromDate === selectedDateLocal;

          const toDate = item.toDate
            ? new Date(item.toDate).toLocaleDateString("en-GB") // Convert toDate to local date
            : null;
          isToDateMatch = toDate === selectedDateLocal;
        }

        if (location.pathname === "/leaveManage/requestTickets") {
          const departureDate = item.ticketRequest?.departureDate
            ? new Date(item.ticketRequest.departureDate).toLocaleDateString(
                "en-GB"
              )
            : null;
          isDepartureDateMatch = departureDate === selectedDateLocal;

          const arrivalDate = item.ticketRequest?.arrivalDate
            ? new Date(item.ticketRequest.arrivalDate).toLocaleDateString(
                "en-GB"
              )
            : null;
          isArrivalDateMatch = arrivalDate === selectedDateLocal;

          const ticketCreatedAt = item.ticketRequest?.createdAt
            ? new Date(item.ticketRequest.createdAt).toLocaleDateString("en-GB")
            : null;
          isCreatedAtMatch = ticketCreatedAt === selectedDateLocal;
        }

        // Filter if any of the dates match
        const isMatch =
          isCreatedAtMatch ||
          isFromDateMatch ||
          isToDateMatch ||
          isDepartureDateMatch ||
          isArrivalDateMatch;

        return isMatch;
      });

      setSearchResults(filtered);
      setFilteredData(filtered);
    } catch (error) {
      console.error("Error in applyFilters:", error);
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    dateFD(date);
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
    // console.log(data);

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
  // console.log(toggleClick);

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
        <section className="flex justify-between items-center py-3">
          <p className="text_size_5">
            <Link
              to="/leaveManage"
              className={`pr-2 relative after:absolute after:-bottom-1 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
                location.pathname === "/leaveManage" ? "after:bg-primary" : ""
              }`}
            >
              Request Leave
            </Link>{" "}
            <Link
              to="/leaveManage/historyLeave"
              className={`px-2 relative after:absolute after:-bottom-2 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
                location.pathname === "/leaveManage/historyLeave"
                  ? "after:bg-primary"
                  : ""
              }`}
            >
              History of leave
            </Link>{" "}
            <Link
              to="/leaveManage/leaveBalance"
              className={`px-2 relative after:absolute after:-bottom-2 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
                location.pathname === "/leaveManage/leaveBalance"
                  ? "after:bg-primary"
                  : ""
              }`}
            >
              Employee Leave Balance
            </Link>{" "}
            {(userType === "HR" || userType === "SuperAdmin") && (
              <>
                {" "}
                <Link
                  to="/leaveManage/requestTickets"
                  className={`px-2 relative after:absolute after:-bottom-2 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
                    location.pathname === "/leaveManage/requestTickets"
                      ? "after:bg-primary"
                      : ""
                  }`}
                >
                  Request Tickets
                </Link>
              </>
            )}
          </p>
          <div
            className={`flex gap-5 w-[500px] ${
              location.pathname === "/leaveManage/leaveBalance"
                ? "justify-end"
                : ""
            }`}
          >
            {location.pathname !== "/leaveManage/leaveBalance" && (
              <Searchbox
                allEmpDetails={secondartyData}
                searchIcon2={<IoSearch />}
                placeholder="Employee ID"
                searchUserList={searchUserList}
                border="rounded-md"
              />
            )}
            {location.pathname !== "/leaveManage/leaveBalance" && (
              <div className="py-2  text_size_5 bg-white border rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
                <input
                  type="date"
                  name="selectedDate"
                  className="text-grey"
                  value={selectedDate || ""}
                  onChange={handleDateChange}
                />

                {/* {location.pathname === "/leaveManage/requestTickets" &&
                  userType !== "HR" &&
                  userType !== "SuperAdmin" && (
                    <Filter AfterFilter={handleFilterChange} />
                  )} */}
              </div>
            )}
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
            }}
          />
        </section>

        {/* Pagination section */}
        <div className="ml-20 flex justify-center">
          <div className="w-[60%] flex justify-start mt-4 px-10">
            {/* Conditionally render pagination only for tables other than LMTable and TicketsTable */}

            {location.pathname !== "/leaveManage/leaveBalance" &&
              filteredData.length > 0 && (
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
