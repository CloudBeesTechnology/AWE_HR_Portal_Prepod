import React, { useState, useContext, useEffect } from "react";
import { Table } from "../../utils/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Searchbox } from "../../utils/Searchbox";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";


export const ListofCandi = () => {
  const { empPDData} = useContext(DataSupply); // Fetching data from context
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [editingData, setEditingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row.id);
  };

  const EditedData = (editdata) => {
    setEditingData(editdata);
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    const remainingCandidates = allCandidates.filter(
      (candidate) => !selectedRows.includes(candidate.id)
    );
    setSelectedRows([]);
  };

  // Handle row selection when checkbox is clicked
  const handleRowSelect = (updatedSelectedRows) => {
    setSelectedRows(updatedSelectedRows);
  };

  const allCandidates = empPDData?.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    if (allCandidates.length > 0) {
      setLoading(false);
      setError(null);
    } else {
      setError("No data available.");
    }
  }, [allCandidates]);
  const columns = [
    "Name",
    "Gender",
    "Nationality",
    "Position",
    "Experience",
    "Email",
    "Contact",
  ];

  return (
    <section className="screen-size min-h-screen w-full my-5">
      <div className="mb-8 flex justify-between items-center">
        <div className="flex-1">
          <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
            List Of All Candidates
          </button>
        </div>

        <div className="flex-1 flex justify-end ">
          {/* Pass the search handler */}
          <Searchbox
            newFormData={allCandidates}
            searchHandler={setSearchTerm} // Updated to pass the state updater directly
            emptySearch={() => console.log("Search cleared!")} // Handle clearing search results
            searchIcon1={<IoSearch />}
            placeholder="Search"
            border="rounded-full"
            shadow="shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>

      {/* Buttons for Edit and Delete */}
      <div className="flex relative mb-8 ">
        <div
          className=" absolute top-1/2 right-14 transform -translate-y-1/2 text-2xl hover:text-3xl flex items-center cursor-pointer"
          onClick={() => {
            if (selectedRows.length === 1) {
              navigate("/addCandidates", {
                state: { editingData: selectedRows[0] },
              });
            } else if (selectedRows.length > 1) {
              alert("Please select only one row to edit.");
            } else {
              alert("Please select a row before editing.");
            }
          }}
          disabled={selectedRows.length === 0}
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
        <div className="text-center py-10">{` ${error}`}</div>
      ) : (
        <Table
          columns={columns}
          rowClickHandler={handleRowClick}
          data={allCandidates}
          selectedRows={selectedRows} // Pass selected rows to Table
          onRowSelect={handleRowSelect} // Add handler to update selected rows
          edited={EditedData}
        />
      )}
    </section>
  );
};
