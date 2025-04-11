import { useEffect, useState, useMemo } from "react";
import { Pagination } from "../../../pages/leaveManagement/Pagination";
import searchIcon from "../../../assets/recruitment/search.svg";
import AddCertifyPopUp from "./AddCertifyPopUp";
export const CertifyTable = ({ mergering, columns, popupAll }) => {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [paginatedData, setPaginatedData] = useState([]);
  // Memoize filteredData to avoid unnecessary recalculations on each render
  const filteredData = useMemo(() => {
    return mergering.filter((candidate) => {
      const empID = candidate.empID ? candidate.empID.toLowerCase() : "";
      const name = candidate.name ? candidate.name.toLowerCase() : "";
      const query = searchQuery.toLowerCase();
      return empID.includes(query) || name.includes(query);
    });
  }, [mergering, searchQuery]);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section >
      <div className="relative flex justify-end items-end mt-14">
        <input
          type="text"
          placeholder="Search by empID or name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="py-2 px-4 mr-5 rounded-lg shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)] outline-none"
        />
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
          <img src={searchIcon} alt="Search Icon" className="w-4 h-4" />
        </div>
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
                      <td key={idx} className="py-4 px-4 break-words overflow-hidden flex-1">
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
          <AddCertifyPopUp
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
