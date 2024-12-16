import { useOutletContext } from "react-router-dom";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import { Searchbox } from "../../utils/Searchbox";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Pagination } from "./Pagination";
import { Filter } from "./Filter";

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
  const {
    handleDeleteLeaveStatus,
    handleUpdateLeaveStatus,
    ticketMerged,
    statusUpdate,
  } = useLeaveManage();

 
   // Filter the data based on filterStatus (All, Pending, Approved, Rejected)
   
  

  const dateFD = (selectedDate) => {
    try {
      if (!selectedDate) {
        setSearchResults([]);
        setFilteredData([]);
        return;
      }
      const selectedDateObj = new Date(selectedDate);
      const selectedDateLocal = selectedDateObj.toLocaleDateString("en-GB"); // 'DD/MM/YYYY' format

      const filtered = ticketMerged.filter((item) => {
        if (!item.createdAt && !item.departureDate && !item.arrivalDate) {
          return false;
        }

        let isCreatedAtMatch = false;
        let isDepartureDateMatch = false;
        let isArrivalDateMatch = false;

        const departureDate = item?.departureDate
          ? new Date(item?.departureDate).toLocaleDateString("en-GB")
          : null;
        isDepartureDateMatch = departureDate === selectedDateLocal;

        const arrivalDate = item?.arrivalDate
          ? new Date(item?.arrivalDate).toLocaleDateString("en-GB")
          : null;
        isArrivalDateMatch = arrivalDate === selectedDateLocal;

        const ticketCreatedAt = item?.createdAt
          ? new Date(item?.createdAt).toLocaleDateString("en-GB")
          : null;
        isCreatedAtMatch = ticketCreatedAt === selectedDateLocal;

        // Filter if any of the dates match
        const isMatch =
          isCreatedAtMatch || isDepartureDateMatch || isArrivalDateMatch;

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
  

  useEffect(() => {
    if (filterStatus !== "All") {
      const updatedData = ticketMerged.filter((item) => item.hrStatus === filterStatus);
      setFilteredData(updatedData);
    } else {
      setFilteredData(ticketMerged);
    }
  }, [filterStatus, ticketMerged]);
  

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
  }, [currentPage, rowsPerPage, data, searchResults, selectedDate]);

  const totalPages = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : data.length) /
      rowsPerPage
  );
  const handleFilterChange = (status) => {
    console.log("Filter changed to:", status); // Debug log
    setFilterStatus(status);
    setCurrentPage(1); // Reset to the first page on filter change
  };

  return (
    <section className="relative w-full">
      <div >
        <div className="flex absolute -top-11 right-0 justify-end gap-3">
          <div className="w-[40%]">
            <Searchbox
              allEmpDetails={secondartyData}
              searchIcon2={<IoSearch />}
              placeholder="Employee ID"
              searchUserList={searchUserList}
              border="rounded-md"
            />
          </div>
          <div className="text_size_5 bg-white border rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
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
                <Filter AfterFilter={handleFilterChange} />
              </div>
            )}
        </div>
      </div>
      <div className=" top-0 py-5 leaveManagementTable max-w-[100%] overflow-x-auto flex-grow rounded-xl">
        {filteredData && filteredData.length > 0 ? (
          <table className="w-[1150px] font-semibold text-sm">
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
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item, index) => {
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
                        {item?.employeeInfo.name}
                      </td>
                      <td className="border-b-2 border-[#CECECE] py-5">
                        {Array.isArray(item.workInfo?.department) &&
                        item.workInfo.department.length > 0
                          ? item.workInfo.department[
                              item.workInfo.department.length - 1
                            ]
                          : "N/A"}
                      </td>
                      <td className="border-b-2 border-[#CECECE] py-5">
                        {Array.isArray(item.workInfo?.position) &&
                        item.workInfo.position.length > 0
                          ? item.workInfo.position[
                              item.workInfo.position.length - 1
                            ]
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
                              ? "text-[#C50000]"
                              : item.hrStatus === "Approved"
                              ? "text-[#0CB100]"
                              : item.hrStatus === "Pending"
                              ? "text-dark_grey"
                              : ""
                          }`}
                        >
                          {item.hrStatus}
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={heading.length} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-6 py-20">
            <p>Ticket Request not available.</p>
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
