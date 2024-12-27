
import React, { useState } from "react";

export const FilterTable = ({
  tableBody,
  tableHead,
  typeOfReport,
  reportTitle,
  allData,
  handleViewDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

 // Helper function to parse date strings (DD-MM-YYYY)
const parseDate = (dateStr) => {
  if (!dateStr) return null; // return null if dateStr is falsy (undefined, empty string, etc.)
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
};

// Filter tableBody based on searchQuery and doj date range
const filteredTableBody = tableBody?.filter((row) => {
  const query = searchQuery.toLowerCase();
  const matchesQuery =
    String(row.name || "").toLowerCase().includes(query) ||
    String(row.empID || "").toLowerCase().includes(query) ||
    String(row.empBadgeNo || "").toLowerCase().includes(query) ||
    String(row.department || "").toLowerCase().includes(query) ||
    String(row.position || "").toLowerCase().includes(query);

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


  return (
    <div>
      {/* Search and Date Filters */}
      <div className="text-center flex flex-col gap-4 items-end">
        <input
          type="text"
          placeholder="Search Result"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="outline-none rounded-lg px-4 py-2 flex-1 shadow-md border border-[#C5C5C5]"
        />
      </div>

      {/* Table */}
      {filteredTableBody?.length > 0 ? (
        <div>
          <h1 className="text-xl font-bold center my-10 uppercase">{typeOfReport}</h1>

          <div className="w-full overflow-x-auto overflow-y-auto h-[500px] scrollbar-hide shadow-lg">
            <table className="mt-5 border-collapse w-full">
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
                {filteredTableBody.map((row, rowIndex) => (
                  <tr key={rowIndex} className="text-sm border-b-2 border-[#CECECE]">
                    {Object.entries(row).map(([key, col], colIndex) => {
                      const isExpired = key === "expAndValid" && col === "EXPIRED";

                      return (
                        <td
                          key={colIndex}
                          className={`border-b-2 text-center border-[#CECECE] p-2 ${
                            isExpired ? "text-[red]" : ""
                          }`}
                        >
                          {Array.isArray(col) ? `${col[col.length - 1]}` : `${col}`}
                        </td>
                      );
                    })}
                    {typeOfReport === "Probation Review" && (
                      <td
                        className="underline text-center border-[#CECECE] p-2 cursor-pointer text-[blue]"
                        onClick={() => handleViewDetails(row)}
                      >
                        View Details
                      </td>
                    )}
                    {typeOfReport === "Recruitment & Mobilization" && (
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
    </div>
  );
};
