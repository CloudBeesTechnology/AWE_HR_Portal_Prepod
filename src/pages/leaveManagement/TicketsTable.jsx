import { useOutletContext } from "react-router-dom";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import { Searchbox } from "../../utils/Searchbox";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Pagination } from "./Pagination";
import { Filter } from "./Filter";
import { NavigateLM } from "./NavigateLM";

export const TicketsTable = () => {
  const { handleViewClick, handleClickForToggle, userType } =
    useOutletContext();

  const [searchResults, setSearchResults] = useState([]);
  const [secondartyData, setSecondartyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const { ticketMerged } = useLeaveManage();

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

  // Modify useEffect to handle all filters together
  useEffect(() => {
    // If no filters are active, show all data
    if (
      !filters.date &&
      filters.search.length === 0 &&
      filters.status === "All"
    ) {
      setData(ticketMerged);
      setErrorState({
        noResults: false,
        searchError: false,
        dateError: false,
      });
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
        (item) => item.hrStatus === filters.status
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

    setData(filteredResults);
    setFilteredData([]);
    setCurrentPage(1);

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
    setErrorState(errorState); // Add this state if not already present
  }, [filters, ticketMerged]);

  // Separate useEffect for pagination to avoid race conditions
  useEffect(() => {
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
  }, [currentPage, rowsPerPage, data]);

  // Console log for debugging
  // useEffect(() => {}, [filteredData, data]);

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
        setData([]); // Clear the data to show no results
        setFilteredData([]); // Clear filtered data
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

  useEffect(() => {
    setSecondartyData(ticketMerged);
    setData(ticketMerged);
  }, [ticketMerged]);

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
          {userType === "HR" && (
            <div>
              <Filter name={filterStatus} AfterFilter={handleFilterChange} />
            </div>
          )}
        </div>
      </div>
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-xl ">
        {errorState.noResults ? (
          <div className="text-center mt-6 py-20">
            <p>No matching results found for your search.</p>
          </div>
        ) : filteredData && filteredData.length > 0 ? (
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
              {filteredData.map((item, index) => {
                const displayIndex = startIndex + index + 1; // Adjust index based on pagination
                // console.log(item.empID);

                return (
                  <tr
                    key={index}
                    className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                  >
                    <td className="border-b-2  border-[#CECECE] py-5">
                      {displayIndex}
                    </td>
                    <td className="border-b-2  border-[#CECECE] py-5">
                      {item?.empID}
                    </td>
                    <td className="border-b-2  border-[#CECECE] py-5">
                      {item?.empName || "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {Array.isArray(item.department)
                        ? item.department[item.department.length - 1] || "N/A"
                        : "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {Array.isArray(item.position)
                        ? item.position[item.position.length - 1] || "N/A"
                        : "N/A"}
                    </td>

                    <td className="border-b-2  border-[#CECECE] py-5">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="border-b-2  border-[#CECECE] py-5">
                      {formatDate(item.departureDate)}
                    </td>
                    <td className="border-b-2  border-[#CECECE] py-5">
                      {formatDate(item.arrivalDate)}
                    </td>

                    <td className="border-b-2  border-[#CECECE] cursor-pointer py-5">
                      <span
                        className="border-b-2 text-[blue] "
                        onClick={() => {
                          handleClickForToggle();
                          handleViewClick(item, "Tickets");
                        }}
                      >
                        {"View"}
                      </span>
                    </td>
                    {userType !== "SuperAdmin" && (
                      <td
                        className={`border-b-2 border-[#CECECE] py-5 ${
                          item.hrStatus === "Rejected"
                            ? "text-[red]"
                            : item.hrStatus === "Approved"
                            ? "text-[#339933]"
                            : item.hrStatus === "Pending"
                            ? "text-[#E8A317]"
                            : ""
                        }`}
                      >
                        {item.hrStatus}
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
