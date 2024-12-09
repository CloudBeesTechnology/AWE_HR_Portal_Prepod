import React, { useState, useContext, useEffect } from "react";
import { Table } from "../../utils/Table";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Searchbox } from "../../utils/Searchbox";
import { useNavigate } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";

export const NonlocCandi = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows for edit/delete
  const [selectedRow, setSelectedRow] = useState(null); // Handle the review form
  const { empPDData } = useContext(DataSupply); // Fetching data from context
  const navigate = useNavigate();
  const [editingData, setEditingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle row click to open the review form
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const EditedData = (editdata) => {
    // console.log(editdata);
    setEditingData(editdata);
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    const remainingCandidates = otherCandidates.filter(
      (candidate) => !selectedRows.includes(candidate.id)
    );
    // Handle delete logic here (update state, API call, etc.)
    setSelectedRows([]); // Clear selection after delete
  };

  // Handle row selection from checkboxes
  const handleRowSelect = (updatedSelectedRows) => {
    setSelectedRows(updatedSelectedRows);
  };
  // console.log(empPDData);
  
  const otherCandidates = empPDData.filter((candidate) => {
    const isOtherNationality =
      candidate.nationality !== "Bruneian" &&
      candidate.nationality !== "Brunei PR";

    const matchesContract =
      !selectedOption ||
      (selectedOption === "LPA" &&
        candidate.contractType.toLowerCase() === "lpa") ||
      (selectedOption === "SAWP" &&
        candidate.contractType.toLowerCase() === "sawp");

    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.nationality.toLowerCase().includes(searchTerm.toLowerCase());

    // Return true if all conditions are met
    return isOtherNationality && matchesContract && matchesSearch;
  });

  useEffect(() => {
    if (otherCandidates.length > 0) {
      setLoading(false);

      setError(null);
    } else {
      setError("No data available.");
    }
  }, [otherCandidates]);
  // Handle dropdown option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option === "Show All" ? "" : option);
    setDropdownVisible(false);
  };

  const columns = [
    "Name",
    "Gender",
    "Nationality",
    "Position",
    "Experience",
    "Contract",
    "Type",
    "Email",
    "Contact",
  ];

  return (
    <section className="screen-size min-h-screen w-full my-5">
      <div className="mb-8 flex justify-between items-center">
        <div className="relative ">
          <button
            onClick={toggleDropdown}
            className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold flex items-center"
          >
            Non Local CV Candidates
            {dropdownVisible ? (
              <FaChevronUp className="ml-2" />
            ) : (
              <FaChevronDown className="ml-2" />
            )}
          </button>
          {dropdownVisible && (
            <div className="absolute mt-2 bg-white border-2 border-grey rounded-lg shadow-lg">
              <button
                onClick={() => handleOptionSelect("LPA")}
                className="block px-4 py-2 hover:bg-[#f8a595cc] rounded-lg text-left w-full"
              >
                LPA
              </button>
              <button
                onClick={() => handleOptionSelect("SAWP")}
                className="block px-4 py-2 hover:bg-[#f8a595cc] rounded-lg text-left w-full"
              >
                SAWP
              </button>
              <button
                onClick={() => handleOptionSelect("Show All")}
                className="block px-4 py-2 hover:bg-[#f8a595cc] rounded-lg text-left w-full"
              >
                Show All
              </button>
            </div>
          )}
        </div>

        <div className=" flex-1 flex justify-end ">
          <Searchbox
            newFormData={otherCandidates}
            searchHandler={setSearchTerm} // Updated to pass the state updater directly
            emptySearch={() => console.log("Search cleared!")} // Handle clearing search results
            searchIcon1={<IoSearch />}
            placeholder="Search"
            border="rounded-full"
            shadow="shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>

      <div className="flex relative mb-8 ">
        <div
          className=" absolute top-1/2 right-14 transform -translate-y-1/2 text-2xl hover:text-3xl flex items-center cursor-pointer"
          onClick={() => {
            if (selectedRows.length === 1) {
              // If exactly one row is selected, navigate to addCandidates page
              navigate("/addCandidates", {
                state: { editingData: selectedRows[0] },
              });
            } else if (selectedRows.length > 1) {
              // If more than one row is selected, show this alert
              alert("Please select only one row to edit.");
            } else {
              // If no rows are selected, show this alert
              alert("Please select a row before editing.");
            }
          }}
          disabled={selectedRows.length === 0} // Disable button if no row selected
        >
          <FaEdit className="mr-2" />
        </div>
        <div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-3xl hover:text-4xl cursor-pointer text-[#f42232cc] flex items-center"
          onClick={handleDeleteClick}
        >
          <MdDelete className="mr-2" />
        </div>
      </div>

      {selectedOption && (
        <div className="mb-3 text-[18px] w-20 py-1 text-center rounded-lg font-bold bg-medium_red">
          {selectedOption}
        </div>
      )}

      {/* Table Component */}
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center py-10">{error}</div>
      ) : (
        <Table
          columns={columns}
          rowClickHandler={handleRowClick}
          data={otherCandidates}
          selectedRows={selectedRows} // Pass selected rows to Table
          onRowSelect={handleRowSelect} // Add handler to update selected rows
          edited={EditedData}
        />
      )}
    </section>
  );
};
