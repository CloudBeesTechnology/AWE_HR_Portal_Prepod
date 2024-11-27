import React, { useContext, useState, useRef, useEffect } from "react";

import { ReviewForm } from "../pages/recruitments/ReviewForm";
import { LuFileEdit } from "react-icons/lu";

export const Table = ({
  columns,
  rowClickHandler,
  selectedRows,
  onRowSelect,
  showCheckboxes = true,
  currentPage,
  selectedTable,
  edited,
  showEditIcon,
  data,
}) => {
  const [localSelectedRows, setLocalSelectedRows] = useState(
    selectedRows || []
  );
  const [clickedRowSno, setClickedRowSno] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false); // To control form visibility
  const [selectCandidate, setSelectCandidate] = useState(null); // To store selected candidate
  const tableRef = useRef(null); // Step 1: Create ref for table element



  // Filter out rows where status is "Inactive"
  const filteredData = data.filter((row) => row.status !== "Inactive");

  const handleRowClick = (row, tableType, index) => {
    setClickedRowSno((prev) => ({
      ...prev,
      [tableType]: prev?.[tableType] === index ? null : index, // Reset if the same row is clicked
    }));

    // Open ReviewForm and set selected candidate
    setSelectCandidate(row); // Pass the row data (candidate) to the form
    setIsFormVisible(true); // Show the ReviewForm popup
  };

  const closeForm = () => {
    setIsFormVisible(false); // Close the ReviewForm popup
  };

  // Function to handle checkbox select/deselect
  const handleCheckboxChange = (rowSno) => {
    const updatedSelectedRows = localSelectedRows.includes(rowSno)
      ? localSelectedRows.filter((sno) => sno !== rowSno) // Remove if already selected
      : [...localSelectedRows, rowSno]; // Add if not selected

    setLocalSelectedRows(updatedSelectedRows);
    onRowSelect && onRowSelect(updatedSelectedRows); // Call parent handler if passed
  };

  // const handleSelectAllChange = (e) => {
  //   if (e.target.checked) {
  //     const allRowIndices = data.map((_, index) => index);
  //     setLocalSelectedRows(allRowIndices);
  //     onRowSelect && onRowSelect(allRowIndices);
  //   } else {
  //     setLocalSelectedRows([]);
  //     onRowSelect && onRowSelect([]);
  //   }
  // };

  // Handle selecting/deselecting all rows
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Select all row indices
      const allRowIndices = data.map((_, index) => index);
      setLocalSelectedRows(allRowIndices);
      if (onRowSelect) {
        onRowSelect(allRowIndices); // Update parent with selected rows
      }
    } else {
      setLocalSelectedRows([]); // Deselect all
      if (onRowSelect) {
        onRowSelect([]); // Update parent
      }
    }
  };

  const columnKeyMapping = {
    TempID: "tempID",
    Name: "name",
    Gender: "gender",
    Nationality: "nationality",
    Position: "position",
    Experience: "noExperience",
    Email: "email",
    Contact: "contactNo",
    Contract: "contractType",
    Type: "empType",
    Interviewer: "interviewer",
    "Interview Date": "date",
    Time: "time",
    Venue: "venue",
    Status: "status"
  };

  // Step 2: Handle clicks outside of the table
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        // Deselect the row if clicked outside the table
        setClickedRowSno({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!filteredData) return <div>Loading...</div>;
  // if (error) return <div className="text-center text-grey py-10" >Error loading data. Check your Internet connection.</div>;
  if (filteredData.length === 0)
    return (
      <div className="text-center text-grey py-10">No data available.</div>
    );

  // console.log("Donut", data);

  return (
    <div className="overflow-x-auto rounded-lg" ref={tableRef}>
      {" "}
      {/* Step 3: Attach ref */}
      <table className="w-full text-left">
        {/* Table Header */}
        <thead className="bg-[#939393] text-white">
          <tr>
            {showCheckboxes && (
              <th className="pl-4 py-4">
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  onClick={(e) => e.stopPropagation()} // Prevents row click
                  onChange={handleSelectAllChange} // Handle select all
                  checked={
                    localSelectedRows.length === filteredData.length && filteredData.length > 0
                  } // Select all if all are checked
                />
              </th>
            )}
            <th className="pl-4 py-4">S.No</th>
            {columns.map((column, index) => (
              <th key={index} className="pl-4 py-4">
                {column}
              </th>
            ))}
            {(currentPage === "status" ||
              currentPage === "workpasstracking" ) && <th></th>}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white cursor-pointer">
          {filteredData.map((value, index) => (
            <tr
              key={index}
              className={`shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] ${
                showCheckboxes
                  ? localSelectedRows.includes(index)
                    ? "bg-medium_blue"
                    : "" // For pages with checkboxes
                  : clickedRowSno[selectedTable] === index
                  ? "bg-medium_blue"
                  : "" // For status.jsx and workpasstracking.jsx
              }`}
              onClick={() => handleRowClick(value, selectedTable, index)}
            >
              {showCheckboxes && (
                <td className="pl-4 py-4">
                  <input
                    className="w-5 h-6"
                    type="checkbox"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents row click
                      edited(value);
                    }}
                    checked={localSelectedRows.includes(index)} // Check if row is selected
                    onChange={() => handleCheckboxChange(index)} // Handle row selection
                  />
                </td>
              )}
              {/* Display sequence number (S.No) */}
              <td className="pl-4 py-4">{index + 1}</td>

              {columns.map((column, i) => (
                <td key={i} className="pl-4 py-4">
                  {value[columnKeyMapping[column]] || "-"}
                </td>
              ))}

              {/* Always render the edit icon for status and workpasstracking pages */}
              {(currentPage === "status" ||
                currentPage === "workpasstracking") &&
                showEditIcon && (
                  <td className="px-4 py-4 text-[#835c1d]">
                    <LuFileEdit
                      className="text-2xl cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering row click
                        edited(value); // Call the edited function if provided
                      }}
                    />
                  </td>
                )}
            </tr>
          ))}
        </tbody>
      </table>
      {isFormVisible && selectCandidate && (
        <ReviewForm
          candidate={selectCandidate}
          onClose={closeForm}
          showDecisionButtons={currentPage === "status"} // Pass true for 'status' page
        />
      )}
    </div>
  );
};
