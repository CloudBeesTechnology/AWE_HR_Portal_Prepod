import { useOutletContext } from "react-router-dom";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import { Searchbox } from "../../utils/Searchbox";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Pagination } from "./Pagination";
import { Filter } from "./Filter";
import { NavigateLM } from "./NavigateLM";
import { capitalizedLetter, DateFormat } from "../../utils/DateFormat";
import { FiLoader } from "react-icons/fi";
import { useTempID } from "../../utils/TempIDContext";

export const TicketsTable = () => {
  const { handleViewClick, handleClickForToggle, userType } =
    useOutletContext();

  const [searchResults, setSearchResults] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [secondartyData, setSecondartyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const { gmPosition } = useTempID();
  const { ticketMerged, loading } = useLeaveManage();

  // Add new state to track all filters
  const [filters, setFilters] = useState({
    date: "",
    search: [],
    status: "All",
  });

  // Add this state at the top with other states
  const [errorState, setErrorState] = useState({
    noResults: false,
    searchError: false,
    dateError: false,
  });

  const GM = "GENERAL MANAGER";
  const HR = "HR";

  useEffect(() => {
    // If no filters are active, show all data
    // setLoading(true);
    if (
      !filters.date &&
      filters.search.length === 0 &&
      filters.status === "All"
    ) {
      const sortedData = [...ticketMerged].sort((a, b) => {
        if (a.hrStatus === "Pending" && b.hrStatus !== "Pending" || a.gmStatus === "Pending" && b.gmStatus !== "Pending") {
          return -1; 
        }
        if (a.hrStatus !== "Pending" && b.hrStatus === "Pending" || a.gmStatus !== "Pending" && b.gmStatus === "Pending") {
          return 1; 
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      if (gmPosition === "GENERAL MANAGER") {
        const filterGMData = sortedData.filter(
          (item) => item.hrStatus === "Verified" && item.hrStatus !== "Pending"
        );
     
        setData(filterGMData);
        setErrorState({
          noResults: false,
          searchError: false,
          dateError: false,
        });
        
      } else {
        setData(sortedData);
        setErrorState({
          noResults: false,
          searchError: false,
          dateError: false,
        });
  
      }
      return;
    }

    let filteredResults = [...ticketMerged];
    let hasDateFilter = false;
    let hasSearchFilter = false;
    let dateMatches = false;
    let searchMatches = false;

    // Apply status filter
    if (filters.status !== "All") {
      filteredResults = filteredResults.filter(
        (item) =>
          (userType === HR && item.hrStatus === filters.status) ||
          (gmPosition === GM && item.gmStatus === filters.status)
      );
    }

    // Apply date filter if selected
    if (filters.date) {
      hasDateFilter = true;
      const selectedDateLocal = new Date(filters.date);
      selectedDateLocal.setHours(0, 0, 0, 0);

      filteredResults = filteredResults.filter((item) => {
        const departureDate = item?.departureDate
          ? new Date(item.departureDate)
          : null;
        const arrivalDate = item?.arrivalDate
          ? new Date(item.arrivalDate)
          : null;
        const createdDate = item?.createdAt ? new Date(item.createdAt) : null;

        if (departureDate) departureDate.setHours(0, 0, 0, 0);
        if (arrivalDate) arrivalDate.setHours(0, 0, 0, 0);
        if (createdDate) createdDate.setHours(0, 0, 0, 0);

        const matches = [departureDate, arrivalDate, createdDate].some(
          (date) => date && date.getTime() === selectedDateLocal.getTime()
        );
        if (matches) dateMatches = true;
        return matches;
      });
    }

    // Apply search filter if there are search results
    if (filters.search.length > 0) {
      hasSearchFilter = true;
      filteredResults = filteredResults.filter((item) => {
        const matches = filters.search.some(
          (searchItem) => searchItem.empID === item.empID
        );
        if (matches) searchMatches = true;
        return matches;
      });
    }

    const sortedFilteredData = filteredResults.sort((a, b) => {

      if (a.hrStatus === "Pending" && b.hrStatus !== "Pending" || a.gmStatus === "Pending" && b.gmStatus !== "Pending") {
        return -1; 
      }
      if (a.hrStatus !== "Pending" && b.hrStatus === "Pending" || a.gmStatus !== "Pending" && b.gmStatus === "Pending") {
        return 1; 
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    if (gmPosition === "GENERAL MANAGER") {
      const filterGMData = sortedFilteredData.filter(
        (item) => item.hrStatus === "Verified" && item.hrStatus !== "Pending"
      );

      setData(filterGMData);
      setFilteredData([]);
      setCurrentPage(1);

    } else {
      setData(sortedFilteredData);
      setFilteredData([]);
      setCurrentPage(1);

    }
   

    // Update the error message state or flag if needed
    const noResults = filteredResults.length === 0;
    const searchError = !searchMatches;
    const dateError = hasDateFilter && !dateMatches;

    // You can use these flags to customize your error message in the render section
    const errorState = {
      noResults,
      searchError,
      dateError,
    };
    setErrorState(errorState);
    // setLoading(false);
  }, [filters, ticketMerged]);

  // Separate useEffect for pagination to avoid race conditions
  useEffect(() => {
    // setLoading(true);
    if (!data.length) {
      setFilteredData([]);
      return;
    }

    const startIndex = (currentPage - 1) * rowsPerPage;
    const sortedData = [...data].sort((a, b) => {
      const regex = /\d+$/;
      const numPartA = a.empID.match(regex)
        ? a.empID.match(regex)[0].padStart(5, "0")
        : "";
      const numPartB = b.empID.match(regex)
        ? b.empID.match(regex)[0].padStart(5, "0")
        : "";

      const prefixA = a.empID.replace(regex, "").toLowerCase();
      const prefixB = b.empID.replace(regex, "").toLowerCase();

      return prefixA !== prefixB
        ? prefixA.localeCompare(prefixB)
        : numPartA.localeCompare(numPartB);
    });

    const paginatedData = sortedData.slice(
      startIndex,
      startIndex + rowsPerPage
    );

    setFilteredData(paginatedData);
    // setLoading(false);
  }, [currentPage, rowsPerPage, data]);

  // Update handlers to use new filters state
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setFilters((prev) => ({ ...prev, date }));
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setFilters((prev) => ({ ...prev, status }));
  };

  const searchUserList = async (searchData) => {
    try {
      const result = await searchData;
      setSearchResults(result);

      // If search result is empty, show no results message immediately
      if (result.length === 0) {
        setData([]);
        setFilteredData([]);
        setErrorState((prev) => ({
          ...prev,
          searchError: true,
          noResults: true,
        }));
      } else {
        setFilters((prev) => ({ ...prev, search: result }));
        setErrorState((prev) => ({
          ...prev,
          searchError: false,
          noResults: false,
        }));
      }
    } catch (error) {
      console.error("Error search data", error);
      setData([]);
      setFilteredData([]);
      setErrorState((prev) => ({
        ...prev,
        searchError: true,
        noResults: true,
      }));
    }
  };

  // Update total pages calculation
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const heading = [
    "S.No",
    "Emp ID",
    "Name",
    "Department",
    "Position",
    "Date Join", 
    "Departure date",
    "Arrival date",
    "Submitted form",
    userType !== "SuperAdmin" && "Status",
  ];

  // console.log(ticketMerged);

  useEffect(() => {

    const sortedData = ticketMerged.sort((a, b) => {
      if (a.hrStatus === "Pending" && b.hrStatus !== "Pending" || a.gmStatus === "Pending" && b.gmStatus !== "Pending") {
        return -1; 
      }
      if (a.hrStatus !== "Pending" && b.hrStatus === "Pending" || a.gmStatus !== "Pending" && b.gmStatus === "Pending") {
        return 1; 
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  
    // Filter data based on GM position
    if (gmPosition === "GENERAL MANAGER") {
      const filterGMData = sortedData.filter(
        (item) => item.hrStatus === "Verified" && item.hrStatus !== "Pending"
      );
      setSecondartyData(filterGMData);
      setData(filterGMData);
    } else {
      setSecondartyData(sortedData);
      setData(sortedData);
    }
  }, [ticketMerged, gmPosition]);
  

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
    <section className="w-full">
      <div className="flex justify-between flex-wrap mb-5">
        <div>
          <NavigateLM userType={userType} />
        </div>
        <div className="flex  flex-wrap items-center gap-2">
          <div>
            <Searchbox
              allEmpDetails={secondartyData}
              searchIcon2={<IoSearch />}
              placeholder="Employee ID"
              searchUserList={searchUserList}
              border="rounded-md"
            />
          </div>

          <div className="text_size_5 bg-white border py-2 rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
            <input
              type="date"
              name="selectedDate"
              className="text-grey outline-none"
              value={selectedDate || ""}
              onChange={handleDateChange}
            />
          </div>
          {(gmPosition === "GENERAL MANAGER" || userType === "HR") && (
            <div>
              <Filter
                name={filterStatus}
                AfterFilter={handleFilterChange}
                userType={userType}
                gmPosition={gmPosition}
              />
            </div>
          )}
        </div>
      </div>
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-xl ">
        {errorState.noResults ? (
          <div className="text-center mt-6 py-20">
            <p>No matching results found for your search.</p>
          </div>
        ) : data && data.length > 0 ? (
          <table className="w-full font-semibold text-sm">
            <thead className="bg-[#939393] sticky top-0 rounded-t-lg">
              <tr className="px-6">
                {heading.map((header, index) => (
                  <th key={index} className="py-5 text-[15px] text-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const displayIndex = startIndex + index + 1;
                return (
                  <tr
                    key={index}
                    className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                  >
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {displayIndex}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {item?.empID}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {capitalizedLetter(item?.empName) || "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {Array.isArray(item.department)
                        ? capitalizedLetter(
                            item.department[item.department.length - 1]
                          ) || "N/A"
                        : "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {Array.isArray(item.position)
                        ? capitalizedLetter(
                            item.position[item.position.length - 1]
                          ) || "N/A"
                        : "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {DateFormat(item.createdAt)}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {item.empDepartureDate ||
                        DateFormat(item.departureDate) ||
                        "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {item.empArrivalDate ||
                        DateFormat(item.arrivalDate) ||
                        "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE] cursor-pointer py-5">
                      <span
                        className="border-b-2 text-[blue] "
                        onClick={() => {
                          handleClickForToggle();
                          handleViewClick(item, "Tickets");
                          console.log("Ticket", item);
                        }}
                      >
                        {"View"}
                      </span>
                    </td>
                    {userType !== "SuperAdmin" && !gmPosition && (
                      <td
                        className={`border-b-2 border-[#CECECE] py-5 ${
                          item.hrStatus === "Not Eligible"
                            ? "text-[red]"
                            : item.hrStatus === "Verified"
                            ? "text-[#339933]"
                            : item.hrStatus === "Pending"
                            ? "text-[#E8A317]"
                            : ""
                        }`}
                      >
                        {item.hrStatus}
                      </td>
                    )}
                    {userType !== "SuperAdmin" &&
                      gmPosition === "GENERAL MANAGER" && (
                        <td
                          className={`border-b-2 border-[#CECECE] py-5 ${
                            item.gmStatus === "Rejected"
                              ? "text-[red]"
                              : item.gmStatus === "Approved"
                              ? "text-[#339933]"
                              : item.gmStatus === "Pending"
                              ? "text-[#E8A317]"
                              : ""
                          }`}
                        >
                          {item.gmStatus || "Pending"}
                        </td>
                      )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-6 py-20">
            <p>
              {filters.status !== "All"
                ? `No tickets found with status "${filters.status}".`
                : errorState.dateError
                ? "No tickets found for the selected date."
                : "No tickets available."}
            </p>
          </div>
        )}
      </div>

      <div className="center pt-10">
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
