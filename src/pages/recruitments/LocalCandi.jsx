import React, { useState, useContext, useEffect } from "react";
import { Table } from "../../utils/Table"; // Reusable Table component
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Searchbox } from "../../utils/Searchbox";
import { useNavigate } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";

export const Localcandi = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]); // To track selected rows for edit/delete
  const [selectedRow, setSelectedRow] = useState(null); // For handling the review form
  const { empPDData, IVSSDetails } = useContext(DataSupply); // Fetching data from context
  const navigate=useNavigate()
  const [editingData,setEditingData]=useState([])
  // Filter candidates with nationality 'Brunei'
  const bruneiCandidates = empPDData
    .filter(
      (candidate) =>
        candidate.nationality === "Bruneian" ||
        candidate.nationality === "Brunei PR"
    )
    .filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.nationality.toLowerCase().includes(searchTerm.toLowerCase())
    )

    .filter(
      (candidate) =>
        !IVSSDetails.some((detail) => detail.tempID === candidate.tempID)
    );

  useEffect(() => {
    if (bruneiCandidates.length > 0) {
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
    }
  }, [bruneiCandidates]);
  // Handle row click to open the review form
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const EditedData = (editdata) => {
    setEditingData(editdata);
  };
  // Handle delete button click
  const handleDeleteClick = () => {
    const remainingCandidates = bruneiCandidates.filter(
      (candidate) => !selectedRows.includes(candidate.sno)
    );
    // Handle delete logic here (update state, API call, etc.)
    setSelectedRows([]); // Clear selection after delete
  };

  // Handle row selection from checkboxes
  const handleRowSelect = (updatedSelectedRows) => {
    setSelectedRows(updatedSelectedRows);
  };

  const columns = [
    "Name",
    "Gender",
    "Nationality",
    "Position",
    "Experience",
    "Type",
    "Email",
    "Contact",
  ];

  return (
    <section className="screen-size min-h-screen w-full my-5">
      <div className="mb-8 flex justify-between items-center">
        <div className="flex-1">
          <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
            Local CV Candidates
          </button>
        </div>

        <div className=" flex-1 flex justify-end ">
          <Searchbox
            newFormData={bruneiCandidates}
            searchHandler={setSearchTerm} // Updated to pass the state updater directly
            emptySearch={() => console.log("Search cleared!")} // Handle clearing search results
            searchIcon1={<IoSearch />}
            placeholder="Search"
            border="rounded-full"
            shadow="shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>

      <div className="flex relative mb-8">
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

      {/* Table Component */}

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center py-10">No data available.</div>
      ) : (
        <Table
          columns={columns}
          rowClickHandler={handleRowClick}
          data={bruneiCandidates} // Pass the updated data with "sno" to the table
          selectedRows={selectedRows} // Pass selected rows to Table
          onRowSelect={handleRowSelect} // Add handler to update selected rows
          edited={EditedData}
        />
      )}
    </section>
  );
};
