import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { IoSearch } from "react-icons/io5";
import { DateFormat } from "../../utils/DateFormat";

export const FilterTable = ({
  tableBody,
  tableHead,
  title,
  allData,
  handleViewDetails,
  handleDate,
  startDate, 
  endDate
}) => {

  const [searchQuery, setSearchQuery] = useState("");
 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; 

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
        .includes(query);

    // Date filtering logic for doj (Date of Joining)
   
    // If no date filtering, just apply search query
    return matchesQuery;
  });

  // Pagination Logic
  const totalPages = Math?.ceil(filteredTableBody?.length / itemsPerPage);
  const currentItems = filteredTableBody?.slice(
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
    const formatKey = (key) => {
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/_/g, " ")
        .toUpperCase();
    };
  
    const processedData = filteredTableBody.map((row) => {
      const processedRow = {};
      for (const [key, value] of Object.entries(row)) {
        const formattedKey = formatKey(key);
        processedRow[formattedKey] = Array.isArray(value) ? value.join(", ") : value;
      }
      return processedRow;
    });
  
    // Create a workbook and worksheet with a dynamic sheet name based on the title prop
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(title);  // Use the title as the sheet name
  
    // Add the title as the first row (merged cell spanning all columns)
    const headerRow = worksheet.addRow([title]);
    headerRow.font = { bold: true, size: 16 };
    headerRow.alignment = { horizontal: "center", vertical: "middle" };
    
    // Merge the cells for the title
    worksheet.mergeCells(1, 1, 1, Object.keys(processedData[0]).length);
  
    // Add a blank row after the title for spacing
    // worksheet.addRow([]);
  
    // Add the Start Date and End Date as rows
    const dateRow = [];
    if (startDate) {
      dateRow.push(`Start Date: ${DateFormat(startDate)}`);
    } else {
      dateRow.push('Start Date: Not Provided');
    }
  
    if (endDate) {
      dateRow.push(`End Date: ${DateFormat(endDate)}`);
    } else {
      dateRow.push('End Date: Not Provided');
    }
  
    worksheet.addRow(dateRow);
    worksheet.addRow([]); // Add another blank row for spacing
  
    // Add header row with formatted keys
    const tableHeader = Object.keys(processedData[0]).map(formatKey);
    worksheet.addRow(tableHeader);
  
    // Add data rows
    processedData.forEach((row) => {
      worksheet.addRow(Object.values(row));
    });
  

    const header = worksheet.getRow(4); // 3rd row (after title and date filter)
    header.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // Bold white font
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF808080" }, // Grey background
      };
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true }; // Center alignment with wrap text
    });

    
  
    // Apply styles for all data rows
    worksheet.eachRow((row, rowIndex) => {
      row.eachCell((cell) => {
        cell.alignment = { wrapText: true, vertical: "top" }; // Wrap text for all cells
      });
    });
  
    // Auto-size columns based on content length
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const value = cell.value ? cell.value.toString() : "";
        maxLength = Math.max(maxLength, value.length);
      });
      column.width = maxLength + 2; // Add padding for readability
    });
  
    // Generate and download the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, `${title}.xlsx`);  // Use the title as part of the file name
    });
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

        <div className="text-center flex flex-col flex-1 gap-4 items-end relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none rounded-lg px-4 py-2 shadow-md border border-[#C5C5C5] text-grey"
          />
          <div className=" absolute right-3 top-2 bg-white text-[24px]">
          <IoSearch/>

          </div>
        </div>
      </div>
      <div className="flex justify-between items-end w-full">
  
        {(title !== "Probation Form Update" && title !== "Contract Expiry Form Update") && (
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

        )}
     
      {/* Download Button */}
        <div className="text-center">
        <button
          onClick={downloadExcel}
          className="bg-[#FEF116] text-dark_grey w-[126px] p-3 rounded"
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
                    {title === "Probation Form Update" && (
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
                      {title === "Contract Expiry Form Update" && (
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
