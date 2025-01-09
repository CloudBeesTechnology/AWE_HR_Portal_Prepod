import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
export const FilterTable = ({
  tableBody,
  tableHead,
  title,
  allData,
  handleViewDetails,
  handleDate,
}) => {
  // console.log(handleDate);

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; // Set the number of items per page

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredTableBody = tableBody?.filter((row) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      String(row.name || "")
        .toLowerCase()
        .includes(query) ||
      String(row.empID || "")
        .toLowerCase()
        .includes(query) ||
      String(row.empBadgeNo || "")
        .toLowerCase()
        .includes(query) ||
      String(row.department || "")
        .toLowerCase()
        .includes(query) ||
      String(row.position || "")
        .toLowerCase()
        .includes(query);

    // Date filtering logic for doj (Date of Joining)
    if (startDate && endDate) {
      const dojDate = parseDate(allData.doj); // Assuming this function returns a Date object
      if (!dojDate) return false; // skip the row if doj is invalid

      // Parse the start and end dates
      const start = parseDate(startDate);
      const end = parseDate(endDate);

      // Ensure valid date range
      if (!start || !end) return false; // skip the row if the date range is invalid

      // Include row only if doj falls within the range
      return matchesQuery && dojDate >= start && dojDate <= end;
    }

    // If no date filtering, just apply search query
    return matchesQuery;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTableBody.length / itemsPerPage);
  const currentItems = filteredTableBody.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const getDisplayedPages = () => {
    const pages = [];

    if (totalPages <= 4) {
      // If total pages are 4 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If currentPage is near the start or end, adjust to show 4 pages
      let start = Math.max(currentPage - 1, 1); // Ensure the starting page doesn't go below 1
      let end = start + 3; // Display 4 pages

      // If end exceeds totalPages, adjust the start
      if (end > totalPages) {
        end = totalPages;
        start = Math.max(end - 3, 1); // Ensure start doesn't go below 1
      }

      // Push pages from start to end into the pages array
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const downloadExcel = () => {
    // Function to format keys dynamically to Proper Case (e.g., "empBadgeNo" -> "Emp Badge No")
    const formatKey = (key) => {
      // Convert camelCase or snake_case to Proper Case
      return key
        .replace(/([A-Z])/g, ' $1')               // Insert space before capital letters
        .replace(/([a-z])([A-Z])/g, '$1 $2')       // Ensure we don't add extra spaces (for camel case)
        .replace(/_/g, ' ')                       // Replace underscores with spaces
        .toUpperCase();                           // Convert everything to uppercase
    };
  
    // Process the data to handle array values and dynamically rename keys
    const processedData = filteredTableBody.map((row) => {
      const processedRow = {};
  
      // Iterate over each column in the row and handle array values
      for (const [key, value] of Object.entries(row)) {
        // Format the key dynamically
        const formattedKey = formatKey(key);
  
        if (Array.isArray(value)) {
          // If the value is an array, join it into a string with a comma separator
          processedRow[formattedKey] = value.join(", ");
        } else {
          // Otherwise, keep the value as is
          processedRow[formattedKey] = value;
        }
      }
  
      return processedRow;
    });
  
    // Convert the processed data to an Excel worksheet
    const ws = XLSX.utils.json_to_sheet(processedData);
  
    // Default column size for the header (in pixels)
    const defaultHeaderWidth = 120; // Set a default width for headers
  
    // Get the maximum length of each column to auto-size
    const colWidths = [];
  
    // Calculate maximum length for each column in data (excluding header)
    processedData.forEach((row) => {
      Object.entries(row).forEach(([key, value], index) => {
        const length = value ? value.toString().length : 0; // Calculate string length
        if (!colWidths[index] || length > colWidths[index]) {
          colWidths[index] = length; // Update max length if necessary
        }
      });
    });
  
    // Set the column widths: default width for the header and auto-sized width for data
    const wscols = colWidths.map((width) => ({
      wpx: Math.max(width * 7, defaultHeaderWidth), // Use defaultHeaderWidth as minimum width
    }));
  
    // Set column widths for the header, ensuring default size is respected
    ws["!cols"] = wscols;
  
    // Log the worksheet content (similar to "downloaded content")
    console.log("Generated Excel Worksheet with Auto Column Widths:", ws);
  
    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    // Log the workbook structure before the file is written
    console.log("Generated Workbook:", wb);
  
    // Write the file and prompt download
    XLSX.writeFile(wb, "FilteredTable.xlsx");
  };
  
  return (
    <div className="w-full px-7">

      <div className="w-full flex items-center justify-between gap-5 ">
        <Link to="/reports" className="text-xl flex-1 text-grey ">
          <FaArrowLeft />
        </Link>

        <div className="flex-1">
          <h1 className="text-xl flex  font-bold center my-10 uppercase ">
            {title}
          </h1>
        </div>

        <div className="text-center flex flex-col flex-1 gap-4 items-end">
          <input
            type="text"
            placeholder="Search Result"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none rounded-lg px-4 py-2 shadow-md border border-[#C5C5C5]"
          />
        </div>
      </div>
      <div className="flex justify-between items-end w-full">
        {/*Date Filter*/}
       <div className="flex justify-center items-center gap-5">
         <div>
          <label htmlFor="start-date" className="block text-[16px] font-medium">
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            onChange={(e) => handleDate(e, "startDate")}
            className="outline-none text-grey border rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="block text-[16px] font-medium">
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            onChange={(e) => handleDate(e, "endDate")}
            className="outline-none text-grey border rounded-md p-2"
          />
        </div>
        </div>
      {/* Download Button */}
        <div className="text-center">
        <button
          onClick={downloadExcel}
          class="bg-[#FEF116] text-dark_grey w-[126px] p-3 rounded"
        >
          Download
        </button>
      </div>
      </div>
     
      {/* Table */}
      {currentItems?.length > 0 ? (
        <div>
          {/* <h1 className="text-xl font-bold center my-10 uppercase">{title}</h1> */}

          <div className="w-full overflow-x-auto overflow-y-auto h-[500px] scrollbar-hide shadow-lg my-5">
            <table className=" border-collapse w-full ">
              <thead className="w-full">
                <tr className="bg-[#C5C5C5] rounded-sm">
                  {tableHead.map((head, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-5 text-[15px] text-secondary w-full"
                    >
                      <span className="w-[120px] center uppercase">{head}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentItems.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="text-sm border-b-2 border-[#CECECE]"
                  >
                    {Object.entries(row).map(([key, col], colIndex) => {
                      const isExpired =
                        key === "expAndValid" && col === "EXPIRED";
                      return (
                        <td
                          key={colIndex}
                          className={`border-b-2 text-center border-[#CECECE] p-2 ${
                            isExpired ? "text-[red]" : ""
                          }`}
                        >
                          {Array.isArray(col)
                            ? `${col[col.length - 1]}`
                            : `${col}`}
                        </td>
                      );
                    })}
                    {title === "Probation Review" && (
                      <td
                        className="underline text-center border-[#CECECE] p-2 cursor-pointer text-[blue]"
                        onClick={() => handleViewDetails(row)}
                      >
                        View Details
                      </td>
                    )}
                    {title === "Recruitment & Mobilization" && (
                      <td
                        className="underline text-center border-[#CECECE] p-2 cursor-pointer text-[blue]"
                        onClick={() => handleViewDetails(row)}
                      >
                        View Details
                      </td>
                    )}
                      {title === "Contract Expiry Review" && (
                        <td
                          className="underline text-center border-[#CECECE] p-2 cursor-pointer text-[blue]"
                          onClick={() => handleViewDetails(row)}
                        >
                          View Details
                        </td>
                      )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">No Report List Available Here</div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center w-full my-5">
        <div className="flex justify-center gap-6 w-3/5 items-center">
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 my-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 border border-[#5A5858] text-sm text-dark_grey rounded-lg hover:bg-gray-200 px-5 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <FaArrowLeft className="text-[16px]" />
                <span>Previous</span>
              </button>

              {/* Pagination Buttons */}
              {getDisplayedPages().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 p-4 flex items-center justify-center text-sm font-medium rounded-full ${
                    currentPage === page
                      ? "bg-[indigo] shadow-md text-white"
                      : "bg-gray-200 text-dark_grey"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 border border-[#5A5858] text-sm text-dark_grey rounded-lg  px-5 py-2 "
              >
                <span>Next</span>
                <FaArrowRight className="text-[16px]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
