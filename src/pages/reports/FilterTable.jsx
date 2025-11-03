import React, { useContext, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { IoSearch } from "react-icons/io5";
import { DateFormat } from "../../utils/DateFormat";
import { DataSupply } from "../../utils/DataStoredContext";

export const FilterTable = ({
  tableBody,
  tableHead,
  title,
  handleViewDetails,
  handleDate,
  startDate,
  endDate,
  loading,
  userType
}) => {
  const navigate = useNavigate();
  const { dropDownVal } = useContext(DataSupply);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
console.log(tableBody.length,"filtertable");

  // Render skeleton loader when loading is true
  if (loading) {
    // Determine number of columns based on tableHead or use default
    const columnCount = (tableHead && tableHead.length > 0) ? tableHead.length : 5;

    return (
      <div className="w-full px-7 bg-[#F5F6F1CC] animate-pulse">
        {/* Header skeleton */}
        <div className="w-full flex items-center justify-between gap-5 py-4">
          <div className="">
            <div className="h-8 bg-BColor rounded w-[200px] mx-auto"></div>
          </div>

          <div className="">
            <div className="h-8 bg-BColor rounded w-[200px] mx-auto"></div>
          </div>

          <div className="">
            <div className="h-8 bg-BColor rounded w-[200px] mx-auto"></div>
          </div>
        </div>

        {/* Filters skeleton */}


        {/* Table skeleton */}
        <div className="w-full overflow-x-auto overflow-y-auto h-[500px] shadow-lg mb-5">
          <table className="border-collapse w-full">
            <thead className="w-full sticky top-0">
              <tr className="bg-[#939393] rounded-sm">
                <th className="px-6 py-5 text-[15px]">
                  <div className="h-4 bg-BColor rounded w-3/4 mx-auto"></div>
                </th>
                {Array.from({ length: columnCount }).map((_, idx) => (
                  <th key={idx} className="px-6 py-5 text-[15px] w-full">
                    <div className="h-4 bg-BColor rounded w-3/4"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="text-sm border-b-2 border-[#CECECE] min-[40px]">
                  <td className="font-semibold border-b-2 text-center uppercase border-[#CECECE] p-2">
                    <div className="h-4 bg-BColor rounded w-1/2 mx-auto"></div>
                  </td>
                  {Array.from({ length: columnCount }).map((_, colIndex) => (
                    <td key={colIndex} className="h-[60px] font-semibold border-b-2 text-center uppercase border-[#CECECE] p-2">
                      <div className="h-4 bg-BColor rounded w-3/4 mx-auto"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center w-full my-5">
          <div className="flex justify-center gap-6 w-3/5 items-center">
            <div className="flex justify-center gap-4 my-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="w-8 h-8 bg-BColor rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const departmentOptions = dropDownVal[0]?.departmentDD?.map((item) => ({
    value: item
      ?.split(" ")
      .map((word) => word.charAt(0)?.toUpperCase() + word?.slice(1))
      .join(" "),
    label: item
      ?.split(" ")
      .map((word) => word.charAt(0)?.toUpperCase() + word?.slice(1))
      .join(" "),
  }));

  // Step 1: Filter by department
  let filteredTableBody = selectedDepartment
    ? tableBody?.filter(
      (row) =>
        row?.department?.toUpperCase() === selectedDepartment?.toUpperCase()
    )
    : tableBody;

  // Step 2: Apply search filter on department-filtered data
  filteredTableBody = filteredTableBody?.filter((row) => {
    const query = searchQuery?.toLowerCase();
    return (
      String(row.name || "")
        ?.toLowerCase()
        ?.includes(query) ||
      String(row.empID || "")
        ?.toLowerCase()
        ?.includes(query) ||
      String(row.empBadgeNo || "")
        ?.toLowerCase()
        ?.includes(query)
    );
  });

  filteredTableBody = filteredTableBody?.filter((row) => {
    const workStatus = row?.workStatus?.toUpperCase();
    return workStatus !== "TERMINATION" && workStatus !== "RESIGNATION";
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
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(currentPage - 1, 1);
      let end = start + 3;

      if (end > totalPages) {
        end = totalPages;
        start = Math.max(end - 3, 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  // Reset currentPage to 1 when search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Reset currentPage to 1 when department changes
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1);
  };


  // const downloadExcel = () => {
  //   const formatKey = (key) => {
  //     return key
  //       .replace(/([A-Z])/g, " $1")
  //       .replace(/([a-z])([A-Z])/g, "$1 $2")
  //       .replace(/_/g, " ")
  //       .toUpperCase();
  //   };
  //   const excludeKeys = [
  //     "headStatus",
  //     "hrmStatus",
  //     "gmStatus",
  //     "matchedID",
  //     "oldCSD",
  //     "oldCED",
  //     "skillPool",
  //     "probID",
  //     "probCreatedAt",
  //     "probExtendStatus",
  //     "prevProbExDate",
  //   ];
  //   const processedData = filteredTableBody.map((row) => {
  //     const processedRow = {};
  //     for (const [key, value] of Object.entries(row)) {
  //       if (excludeKeys.includes(key)) continue;
  //       const formattedKey = formatKey(key);
  //       if (key === "contractEndDate") {
  //         processedRow[formattedKey] = row.oldCED || "N/A"; // ✅ Use oldCED here
  //       }  else if (key === "contractStartDate") {
  //         processedRow[formattedKey] = row.oldCSD || "N/A"; // ✅ Use oldCSD here
  //       } else {
  //         processedRow[formattedKey] = Array.isArray(value)
  //           ? value.length > 0
  //             ? value.join(", ")
  //             : "N/A"
  //           : (value ?? "") !== ""
  //             ? value
  //             : "N/A";
  //       }
  //     }
  //     return processedRow;
  //   });
  //   // Create a workbook and worksheet with a dynamic sheet name based on the title prop
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet(title);
    
  //   // Add the title as the first row (merged cell spanning all columns)
  //   const headerRow = worksheet.addRow([title]);
  //   headerRow.font = { bold: true, size: 16 };
  //   headerRow.alignment = { horizontal: "center", vertical: "middle" };
    
  //   worksheet.mergeCells(1, 1, 1, Object.keys(processedData[0]).length);
    
  //   const dateRow = [];
  //   if (startDate) {
  //     dateRow.push(`Start Date: ${DateFormat(startDate)}`);
  //   } else {
  //     dateRow.push("Start Date: Not Provided");
  //   }
    
  //   if (endDate) {
  //     dateRow.push(`End Date: ${DateFormat(endDate)}`);
  //   } else {
  //     dateRow.push("End Date: Not Provided");
  //   }
    
  //   console.log(processedData.length,"dsfghjk");
  //   console.log(dateRow.length,"dateRow");
  //   worksheet.addRow(dateRow);
  //   worksheet.addRow([]);

  //   // Add header row with formatted keys
  //   const tableHeader = Object.keys(processedData[0]).map(formatKey);
  //   worksheet.addRow(tableHeader);

  //   // Add data rows
  //   processedData.forEach((row) => {
  //     worksheet.addRow(Object.values(row));
  //   });

  //   const header = worksheet.getRow(4);
  //   header.eachCell((cell) => {
  //     cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
  //     cell.fill = {
  //       type: "pattern",
  //       pattern: "solid",
  //       fgColor: { argb: "FF808080" },
  //     };
  //     cell.alignment = {
  //       horizontal: "center",
  //       vertical: "middle",
  //       wrapText: true,
  //     };
  //   });

  //   // Apply styles for all data rows
  //   worksheet.eachRow((row, rowIndex) => {
  //     row.eachCell((cell) => {
  //       cell.alignment = { wrapText: true, vertical: "top" };
  //     });
  //   });

  //   // Auto-size columns based on content length
  //   worksheet.columns.forEach((column) => {
  //     let maxLength = 0;
  //     column.eachCell({ includeEmpty: true }, (cell) => {
  //       const value = cell.value ? cell.value.toString() : "";
  //       maxLength = Math.max(maxLength, value.length);
  //     });
  //     column.width = maxLength + 2;
  //   });

  //   // Generate and download the Excel file
  //   workbook.xlsx.writeBuffer().then((buffer) => {
  //     const blob = new Blob([buffer], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     });
  //     saveAs(blob, `${title}.xlsx`);
  //   });
  // };
const downloadExcel = () => {
  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .toUpperCase();
  };

  const excludeKeys = [
    "headStatus", "hrmStatus", "gmStatus", "matchedID", "oldCSD", "oldCED",
    "skillPool", "probID", "probCreatedAt", "probExtendStatus", "prevProbExDate",
  ];

  // ✅ Prepare data
  const processedData = filteredTableBody.map((row) => {
    const processedRow = {};
    for (const [key, value] of Object.entries(row)) {
      if (excludeKeys.includes(key)) continue;
      const formattedKey = formatKey(key);
      if (key === "contractEndDate") {
        processedRow[formattedKey] = row.oldCED || "N/A";
      } else if (key === "contractStartDate") {
        processedRow[formattedKey] = row.oldCSD || "N/A";
      } else {
        processedRow[formattedKey] = Array.isArray(value)
          ? value.length > 0
            ? value.join(", ")
            : "N/A"
          : (value ?? "") !== ""
            ? value
            : "N/A";
      }
    }
    return processedRow;
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(title);

  // ✅ Title row (Row 1)
  const headerRow = worksheet.addRow([title]);
  headerRow.font = { bold: true, size: 16 };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };
  worksheet.mergeCells(1, 1, 1, Object.keys(processedData[0]).length);

  // ✅ Date row (Row 2)
  const dateRow = [];
  dateRow.push(startDate ? `Start Date: ${DateFormat(startDate)}` : "Start Date: Not Provided");
  dateRow.push(endDate ? `End Date: ${DateFormat(endDate)}` : "End Date: Not Provided");
  worksheet.addRow(dateRow);

  // ✅ Empty spacer (Row 3)
  worksheet.addRow([]);

  // ✅ Header row (Row 4)
  const tableHeader = Object.keys(processedData[0]).map(formatKey);
  const headerExcelRow = worksheet.addRow(tableHeader);
  headerExcelRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF808080" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });

  // ✅ Data rows start right after header (Row 5 onwards)
  processedData.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });

  // ✅ Auto-size columns
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const value = cell.value ? cell.value.toString() : "";
      maxLength = Math.max(maxLength, value.length);
    });
    column.width = maxLength + 2;
  });

  // ✅ Wrap text for all cells
  worksheet.eachRow((row, rowIndex) => {
    row.eachCell((cell) => {
      cell.alignment = { wrapText: true, vertical: "top" };
    });
  });

  // ✅ Export
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${title}.xlsx`);
  });
};

  const isClickableRow = [
    "Probation Review",
    "Probation Form Update",
    "Recruitment & Mobilization",
    "Contract Expiry Review",
    "Contract Expiry Form Update",
  ].includes(title);

  return (
    <div className="w-full px-7 bg-[#F5F6F1CC]">
      <div className="w-full flex items-center justify-between gap-5 ">
        <button
          onClick={() => {
            // Preserve dates in localStorage when navigating back
            if (startDate) {
              localStorage.setItem("contractReview_startDate", startDate);
            } else {
              localStorage.removeItem("contractReview_startDate");
            }

            if (endDate) {
              localStorage.setItem("contractReview_endDate", endDate);
            } else {
              localStorage.removeItem("contractReview_endDate");
            }

            navigate("/reports");
          }}
          className="text-xl flex-1 text-grey"
        >
          <FaArrowLeft />
        </button>

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
            onChange={handleSearchChange}
            className="outline-none rounded-lg px-4 py-2 shadow-md border border-[#C5C5C5] text-grey"
          />
          <div className=" absolute right-3 top-2 bg-white text-[24px]">
            <IoSearch />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end w-full">
        {title !== "Probation Form Update" &&
          title !== "Contract Expiry Form Update" && (
            <div className="flex justify-center items-center gap-5">
              <div>
                <label
                  htmlFor="start-date"
                  className="block text-[16px] font-medium"
                >
                  Start date
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate || ""}
                  onChange={(e) => handleDate(e, "startDate")}
                  className="outline-none text-grey border rounded-md p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="end-date"
                  className="block text-[16px] font-medium"
                >
                  End date
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate || ""}
                  onChange={(e) => handleDate(e, "endDate")}
                  className="outline-none text-grey border rounded-md p-2"
                />
              </div>

              {/* <div>
                <label
                  htmlFor="test-date"
                  className="block text-[16px] font-medium"
                >
                  Today
                </label>
                <input
                  id="test-date"
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="outline-none text-grey border rounded-md p-2"
                />
              </div> */}
            </div>
          )}

        <div className="">
          <label className="block text-[16px] font-medium">Department</label>

          <select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="outline-none rounded-lg p- shadow-md border border-[#8a8888] text-grey select-custom w-[200px]"
          >
            <option value="">All Departments</option>
            {departmentOptions?.map((dept, index) => (
              <option key={index} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>

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
          <div className="w-full overflow-x-auto overflow-y-auto h-[500px] shadow-lg my-5">
            <table className=" border-collapse w-full">
              <thead className="w-full sticky top-0">
                <tr className="bg-[#939393] rounded-sm">
                  <th className="px-6 py-5 text-[15px] text-white">
                    <span className="center uppercase">S.No</span>
                  </th>
                  {tableHead.map((head, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-5 text-[15px] text-white w-full"
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
                    className={`text-sm border-b-2 border-[#CECECE] min-[40px] ${isClickableRow ? "hover:bg-gray-100 cursor-pointer" : ""
                      }`}
                    onClick={() => isClickableRow && handleViewDetails(row)}
                  >
                    <td className="font-semibold border-b-2 text-center uppercase border-[#CECECE] p-2">
                      {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                    </td>

                    {Object.entries(row)
                      .filter(([key]) => {
                        // Exclude unwanted fields
                        if (
                          [
                            "probExtendStatus",
                            "prevProbExDate",
                            "probCreatedAt",
                            "empInfoId",
                            "probID",
                            "workInfoId",
                            "headStatus",
                            "hrmStatus",
                            "gmStatus",
                            "contractStartDate",
                            "contractEndDate",
                            "matchedID",
                            "skillPool"
                          ].includes(key)
                        ) {
                          return false;
                        }

                        // If SuperAdmin, also exclude "status"
                        if (userType === "SuperAdmin" && key === "status") {
                          return false;
                        }

                        return true;
                      })
                      .map(([key, col], colIndex) => {
                        const isExpired = key === "expAndValid" && col === "EXPIRED";
                        const displayValue =
                          col == null
                            ? "N/A"
                            : Array.isArray(col)
                              ? `${col[col.length - 1]}`
                              : `${col}`;

                        return (
                          <td
                            key={colIndex}
                            className={`h-[60px] font-semibold border-b-2 text-center uppercase border-[#CECECE] p-2 ${isExpired ? "text-[red]" : ""
                              } ${key === "status"
                                ? col?.toLowerCase() === "approved"
                                  ? "text-[#339933]"
                                  : col?.toLowerCase() === "reject"
                                    ? "text-[red]"
                                    : col?.toLowerCase() === "pending"
                                      ? "text-[#E8A317]"
                                      : col?.toLowerCase() === "extended"
                                        ? "text-[#339933]"
                                        : col?.toLowerCase() === "not extended"
                                          ? "text-[#E8A317]"
                                          : ""
                                : ""
                              }`}
                          >
                            {displayValue}
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : filteredTableBody?.length === 0 && (startDate || endDate) ? (
        <div className="text-center mt-10">
          No data available on this date range
        </div>
      ) : (
        <div className="text-center mt-10">No Report List Available Here</div>
      )}
      <div className="flex justify-center w-full my-5">
        <div className="flex justify-center gap-6 w-3/5 items-center">
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 my-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 border border-[#5A5858] text-sm text-dark_grey rounded-lg hover:bg-gray-200 px-5 py-2 disabled:bg-BColor disabled:cursor-not-allowed transition-colors duration-200"
              >
                <FaArrowLeft className="text-[16px]" />
                <span>Previous</span>
              </button>
              {getDisplayedPages().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 p-4 flex items-center justify-center text-sm font-medium rounded-full ${currentPage === page
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