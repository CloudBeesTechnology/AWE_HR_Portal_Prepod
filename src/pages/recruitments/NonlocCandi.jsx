import React, { useState, useContext, useEffect } from "react";
import { Table } from "../../utils/Table";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";
import { SearchNonLocalCandy } from "./Search/SearchNonLocal";
import { SearchLocalCandy } from "./Search/SearchLocalCandy";
import { useTempID } from "../../utils/TempIDContext";
import { useDeleteAccess } from "../../hooks/useDeleteAccess";
import { DeletePopup } from "../../utils/DeletePopup";
import { CandyDelete } from "../../services/deleteMethod/CandyDelete";

export const NonlocCandi = () => {
  const { formattedPermissions } = useDeleteAccess();
  const { handleDeletePDDetails } = CandyDelete();
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editingData, setEditingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setTempID } = useTempID();
  const { empPDData, IVSSDetails, educDetailsData } = useContext(DataSupply);
  const navigate = useNavigate();

  useEffect(() => {
    const bruneiCandidates = empPDData
      .filter(
        (candidate) =>
          candidate.nationality !== "Bruneian" &&
          candidate.nationality !== "Brunei PR"
      )
      .filter(
        (candidate) =>
          !IVSSDetails.some((detail) => detail.tempID === candidate.tempID) &&
          candidate.status !== "Inactive"
      );
    setFilteredData(bruneiCandidates);
    setLoading(false);
  }, [empPDData, IVSSDetails, searchTerm]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const EditedData = (editdata) => {
    setEditingData(editdata);
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };

  const handleDeleteClick = async () => {
    const selectedRowData = selectedRows.map((index) => filteredData[index]);
    const deletingData = await selectedRowData.forEach(async (val, index) => {
      await handleDeletePDDetails(val.id);
      // console.log(ED);
    });
    setdeleteTitle1(`${selectedRowData.length} candidates.`);
    await handleDeleteMsg();
    setSelectedRows([]);
  };

  const handleRowSelect = (updatedSelectedRows) => {
    setSelectedRows(updatedSelectedRows);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option === "Show All" ? "" : option);
    setDropdownVisible(false);
  };

  const columns = [
    "Name",
    "Gender",
    "Nationality",
    "TempID",
    "Position",
    "Contract",
    "Type",
    "Email",
    "Contact",
  ];

  const getTemp = () => {
    if (selectedRows.length === 1) {
      const selectedTempID = filteredData[selectedRows[0]]?.tempID;
      setTempID(selectedTempID);
    }
  };

  const requiredPermissions = ["Non Local CV"];

  const access = "Recruitment";

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
          <SearchNonLocalCandy
            type="text"
            allEmpDetails={empPDData}
            searchUserList={setFilteredData}
            searchIcon2={<IoSearch />}
            placeholder="Search"
            border="rounded-full"
            shadow="shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex mb-3 gap-3 justify-end">
        <div
          className="text-2xl hover:text-3xl flex items-center cursor-pointer"
          onClick={() => {
            if (selectedRows.length === 1) {
              getTemp();
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
        {formattedPermissions?.deleteAccess?.[access]?.some((permission) =>
          requiredPermissions.includes(permission)
        ) && (
          <div
            className="text-3xl hover:text-4xl cursor-pointer text-[#f42232cc] flex items-center"
            onClick={handleDeleteClick}
          >
            <MdDelete className="mr-2" />
          </div>
        )}
      </div>

      {selectedOption && (
        <div className="mb-3 text-[18px] w-20 py-1 text-center rounded-lg font-bold bg-medium_red">
          {selectedOption}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center py-10">{error}</div>
      ) : (
        <Table
          columns={columns}
          rowClickHandler={handleRowClick}
          data={filteredData}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          edited={EditedData}
        />
      )}

      {deletePopup && (
        <DeletePopup
          handleDeleteMsg={handleDeleteMsg}
          title1={deleteTitle1}
          path="/recrutiles/nonloccandi"
        />
      )}
    </section>
  );
};
