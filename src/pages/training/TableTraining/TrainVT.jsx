import { useEffect, useState, useCallback } from "react";
import { Pagination } from "../../../pages/leaveManagement/Pagination";
import { Searchbox } from "../../../utils/Searchbox";
import { IoSearch } from "react-icons/io5";
import AddEmpPopup from "./AddEmpPopup";


export const TrainVT = ({ mergering, columns, popupAll }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState(mergering);

  // Keep filteredData in sync with mergering on load or when mergering changes
  useEffect(() => {
    setFilteredData(mergering);
  }, [mergering]);

  const handleSearchResults = useCallback((results) => {
    setFilteredData(results);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginated = filteredData.slice(startIndex, startIndex + rowsPerPage);
    setPaginatedData(paginated);
  }, [filteredData, currentPage, rowsPerPage]);
  const handleViewClick = (details) => {
    setSelectedDetails(details);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedDetails(null);
  };

  // console.log("MG", mergering);

  return (
    <section>
      <div className="relative flex justify-end items-end mt-14">
        <Searchbox
          placeholder="Search by empID, name, badge no, etc."
          allEmpDetails={mergering}
          searchUserList={handleSearchResults}
          searchIcon2={<IoSearch />}
          // border="rounded-lg shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]"
        />

      </div>

      <div className="overflow-x-auto mt-16 w-full rounded-md">
        <div className="w-full px-4 max-h-[calc(90vh-7rem)] overflow-y-auto ">
          <table className="w-full rounded-xl table-auto">
            <thead className="bg-[#939393] text-center sticky top-0">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="py-4 px-2 text-white">
                    {column.header}
                  </th>
                ))}
                <th className="py-4 px-4 text-white">View</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center text-sm font-semibold text-dark_grey ">
              {paginatedData.length > 0 ? (
                paginatedData.map((candidate, index) => (
                  <tr key={index} className="shadow cursor-pointer">
                    {columns.map((column, idx) => (
                      <td
                        key={idx}
                        className="py-4 px-4 break-words overflow-hidden flex-1"
                      >
                        {candidate[column?.key] || "N/A"}
                      </td>
                    ))}
                    <td
                      className="py-4 px-4 text-dark_skyBlue underline cursor-pointer"
                      onClick={() => handleViewClick(candidate)}
                    >
                      View
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="py-4 text-center">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isPopupOpen && selectedDetails && (
          <AddEmpPopup
            details={selectedDetails}
            popupAll={popupAll}
            onClose={closePopup}
          />
        )}
      </div>

      <div className="flex justify-center">
        <div className="flex justify-between mt-12 px-10">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / rowsPerPage)}
            onPageChange={(newPage) => {
              if (
                newPage >= 1 &&
                newPage <= Math.ceil(filteredData.length / rowsPerPage)
              ) {
                setCurrentPage(newPage);
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};
