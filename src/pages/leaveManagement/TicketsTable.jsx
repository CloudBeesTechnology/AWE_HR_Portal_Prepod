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
  const { handleViewClick, handleClickForToggle, userType } = useOutletContext();
  const [searchResults, setSearchResults] = useState([]);
  const [secondartyData, setSecondartyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const { gmPosition, HRMPosition } = useTempID();
  const { ticketMerged, loading } = useLeaveManage();

  const [filters, setFilters] = useState({
    date: "",
    search: [],
    status: "All",
  });

  const [errorState, setErrorState] = useState({
    noResults: false,
    searchError: false,
    dateError: false,
  });

  const GM = "GENERAL MANAGER";
  const HRM = "HR MANAGER";

  // 🔁 Replaced filtering useEffect here:
  useEffect(() => {
    console.log("🔁 Filters triggered with ticketMerged and filters");

    let filteredResults = [...ticketMerged];
    let hasDateFilter = false;
    let hasSearchFilter = false;
    let dateMatches = false;
    let searchMatches = false;

    // ✅ 1. Filter by status (HRM or GM logic)
    if (filters.status !== "All") {
      filteredResults = filteredResults.filter((item) => {
        return (
          (HRMPosition === HRM && item.hrStatus === filters.status) ||
          (gmPosition === GM && item.gmStatus === filters.status)
        );
      });
    }

    // ✅ 2. Date filter
    if (filters.date) {
      hasDateFilter = true;
      const selectedDateLocal = new Date(filters.date);
      selectedDateLocal.setHours(0, 0, 0, 0);

      filteredResults = filteredResults.filter((item) => {
        const datesToCheck = [
          item?.departureDate && new Date(item.departureDate),
          item?.arrivalDate && new Date(item.arrivalDate),
          item?.createdAt && new Date(item.createdAt),
        ].filter(Boolean);

        datesToCheck.forEach((d) => d.setHours(0, 0, 0, 0));

        const matches = datesToCheck.some(
          (date) => date.getTime() === selectedDateLocal.getTime()
        );
        if (matches) dateMatches = true;
        return matches;
      });
    }

    // ✅ 3. Search filter
    if (filters.search.length > 0) {
      hasSearchFilter = true;
      filteredResults = filteredResults.filter((item) => {
        const matches = filters.search.some((s) => s.empID === item.empID);
        if (matches) searchMatches = true;
        return matches;
      });
    }

    // ✅ 4. GM-specific logic
    if (gmPosition === GM) {
      filteredResults = filteredResults.filter(
        (item) => item.hrStatus === "Verified"
      );
    }

    // ✅ 5. Final sort
    filteredResults.sort((a, b) => {
      if (a.hrStatus === "Pending" && b.hrStatus !== "Pending") return -1;
      if (a.hrStatus !== "Pending" && b.hrStatus === "Pending") return 1;
      if (a.gmStatus === "Pending" && b.gmStatus !== "Pending") return -1;
      if (a.gmStatus !== "Pending" && b.gmStatus === "Pending") return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // ✅ 6. Update error state
    setErrorState({
      noResults: filteredResults.length === 0,
      searchError: hasSearchFilter && !searchMatches,
      dateError: hasDateFilter && !dateMatches,
    });

    // ✅ 7. Save filtered result for pagination
    setFilteredData(filteredResults);
    setSecondartyData(filteredResults);
    setCurrentPage(1); // reset page if filter changes
  }, [filters, ticketMerged]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;

    const filterPending = filteredData.sort((a, b) => {
      if (a.hrStatus === "Pending" && b.hrStatus !== "Pending") return -1;
      if (a.hrStatus !== "Pending" && b.hrStatus === "Pending") return 1;
      if (a.gmStatus === "Pending" && b.gmStatus !== "Pending") return -1;
      if (a.gmStatus !== "Pending" && b.gmStatus === "Pending") return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    setData(paginatedData);
  }, [currentPage, rowsPerPage, filteredData]);

  useEffect(() => {
    const sortedData = data.sort((a, b) => {
      if (a.hrStatus === "Pending" && b.hrStatus !== "Pending") return -1;
      if (a.hrStatus !== "Pending" && b.hrStatus === "Pending") return 1;
      if (a.gmStatus === "Pending" && b.gmStatus !== "Pending") return -1;
      if (a.gmStatus !== "Pending" && b.gmStatus === "Pending") return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

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

  const searchUserList = async (searchData) => {
    try {
      const result = await searchData;
      setSearchResults(result);

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
      setData([]);
      setFilteredData([]);
      setErrorState((prev) => ({
        ...prev,
        searchError: true,
        noResults: true,
      }));
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setFilters((prev) => ({ ...prev, date }));
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setFilters((prev) => ({ ...prev, status }));
  };

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

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const heading = [
    "S.No",
    "Emp ID",
    "Name",
    "Department",
    "Position",
    "Received Date",
    "Departure date",
    "Arrival date",
    "Submitted form",
    userType !== "SuperAdmin" && "Status",
  ];

  return (
    <section className="w-full">
      <div className="flex justify-between flex-wrap mb-5">
        <div><NavigateLM userType={userType} /></div>
        <div className="flex  flex-wrap items-center gap-2">
          <Searchbox
            allEmpDetails={secondartyData}
            searchIcon2={<IoSearch />}
            placeholder="Employee ID"
            searchUserList={searchUserList}
            border="rounded-md"
          />
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
            <Filter
              name={filterStatus}
              AfterFilter={handleFilterChange}
              userType={userType}
              gmPosition={gmPosition}
            />
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
                  <th key={index} className="py-5 text-[15px] text-white">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const displayIndex = startIndex + index + 1;
                return (
                  <tr key={index} className="text-center text-sm border-b-2 bg-white border-[#C7BCBC] text-[#303030] hover:bg-medium_blue">
                    <td className="border-b-2 border-[#CECECE] py-5">{displayIndex}</td>
                    <td className="border-b-2 border-[#CECECE] py-5">{item?.empID}</td>
                    <td className="border-b-2 border-[#CECECE] py-5">{capitalizedLetter(item?.empName) || "N/A"}</td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {Array.isArray(item.department) ? capitalizedLetter(item.department[item.department.length - 1]) || "N/A" : "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">
                      {Array.isArray(item.position) ? capitalizedLetter(item.position[item.position.length - 1]) || "N/A" : "N/A"}
                    </td>
                    <td className="border-b-2 border-[#CECECE] py-5">{DateFormat(item.createdAt)}</td>
                    <td className="border-b-2 border-[#CECECE] py-5">{item.empDepartureDate || DateFormat(item.departureDate) || "N/A"}</td>
                    <td className="border-b-2 border-[#CECECE] py-5">{item.empArrivalDate || DateFormat(item.arrivalDate) || "N/A"}</td>
                    <td className="border-b-2 border-[#CECECE] cursor-pointer py-5">
                      <span className="border-b-2 text-[blue]" onClick={() => { handleClickForToggle(); handleViewClick(item, "Tickets"); }}>
                        View
                      </span>
                    </td>
                    {userType !== "SuperAdmin" && !gmPosition && (
                      <td className={`border-b-2 border-[#CECECE] py-5 ${
                        item.hrStatus === "Not Eligible"
                          ? "text-[red]"
                          : item.hrStatus === "Verified"
                          ? "text-[#339933]"
                          : item.hrStatus === "Pending"
                          ? "text-[#E8A317]"
                          : ""
                      }`}>
                        {item.hrStatus}
                      </td>
                    )}
                    {userType !== "SuperAdmin" && gmPosition === "GENERAL MANAGER" && (
                      <td className={`border-b-2 border-[#CECECE] py-5 ${
                        item.gmStatus === "Rejected"
                          ? "text-[red]"
                          : item.gmStatus === "Approved"
                          ? "text-[#339933]"
                          : item.gmStatus === "Pending"
                          ? "text-[#E8A317]"
                          : ""
                      }`}>
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
    </section>
  );
};
