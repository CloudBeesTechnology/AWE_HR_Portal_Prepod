import React, { useState, useContext, useEffect } from "react";
import { Table } from "../../utils/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";
import { useTempID } from "../../utils/TempIDContext";
import { SearchListOfCandy } from "./Search/SearchListOfCandy";
import { DeletePopup } from "../../utils/DeletePopup";
import { useDeleteAccess } from "../../hooks/useDeleteAccess";
import { CandyDelete } from "../../services/deleteMethod/CandyDelete";

export const ListofCandi = () => {
  const { empPDData, IVSSDetails } = useContext(DataSupply);
  const [selectedRow, setSelectedRow] = useState(null);
  const { setTempID } = useTempID();
  const { handleDeletePDDetails } = CandyDelete();
  const { formattedPermissions } = useDeleteAccess();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [editingData, setEditingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const empTempIDs = empPDData?.map((candidate) => candidate.tempID);
  const ivssTempIDs = IVSSDetails?.map((candidate) => candidate.tempID);

  const tempIDsToExclude = empTempIDs?.filter((tempID) =>
    ivssTempIDs?.includes(tempID)
  );

  useEffect(() => {
    const allCandidates = empPDData?.filter(
      (candidate) => !tempIDsToExclude.includes(candidate.tempID) && candidate.status !=="Inactive"
    );

    console.log(allCandidates);
    

    setFilteredData(allCandidates);
    setLoading(false);
  }, [empPDData, IVSSDetails, searchTerm]);

  const handleRowClick = (row) => {
    setSelectedRow(row.id);
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
    const selectedTempIDs = updatedSelectedRows.map(
      (rowIndex) => filteredData[rowIndex]?.tempID
      
    );
  };

  const columns = [
    "Name",
    "Gender",
    "Nationality",
    "TempID",
    "Position",
    "Email",
    "Contact",
  ];

  const getTemp = () => {
    if (selectedRows.length === 1) {
      const selectedTempID = filteredData[selectedRows[0]]?.tempID;
      setCandidate(selectedTempID);
      setTempID(selectedTempID);
    }
  };
  console.log(filteredData,"kk6");
  
  const requiredPermissions = ["Candidate"];

  const access = "Recruitment";
  return (
    <section className="screen-size min-h-screen w-full my-5">
      <div className="mb-8 flex justify-between items-center">
        <div className="flex-1">
          <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
            List Of All Candidates
          </button>
        </div>

        <div className="flex-1 flex justify-end ">
          <SearchListOfCandy
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

      {/* Buttons for Edit and Delete */}
      <div className="flex mb-3 gap-3 justify-end">
        <div
          className="text-2xl hover:text-3xl flex items-center cursor-pointer"
          onClick={() => {
            if (selectedRows.length === 1) {
              getTemp();
              navigate("/addCandidates", {});
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

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center py-10">{`${error}`}</div>
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
          path="/recrutiles/listofcandi"
        />
      )}
    </section>
  );
};
