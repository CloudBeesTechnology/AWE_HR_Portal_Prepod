// // import React, { useState, useContext, useEffect } from "react";
// // import { Table } from "../../utils/Table";
// // import { MdDelete } from "react-icons/md";
// // import { FaEdit } from "react-icons/fa";
// // import { Searchbox } from "../../utils/Searchbox";
// // import { IoSearch } from "react-icons/io5";
// // import { useNavigate } from "react-router-dom";
// // import { DataSupply } from "../../utils/DataStoredContext";

// // export const ListofCandi = () => {
// //   const { empPDData, IVSSDetails} = useContext(DataSupply); // Fetching data from context
// //   const [selectedRow, setSelectedRow] = useState(null);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const navigate = useNavigate();
// //   const [editingData, setEditingData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const handleRowClick = (row) => {
// //     setSelectedRow(row.id);
// //   };

// //   const EditedData = (editdata) => {
// //     setEditingData(editdata);
// //   };

// //   // Handle delete button click
// //   const handleDeleteClick = () => {
// //     const remainingCandidates = allCandidates.filter(
// //       (candidate) => !selectedRows.includes(candidate.id)
// //     );
// //     setSelectedRows([]);
// //   };

// //   // Handle row selection when checkbox is clicked
// //   const handleRowSelect = (updatedSelectedRows) => {
// //     setSelectedRows(updatedSelectedRows);
// //   };

// //   // const allCandidates = empPDData?.filter(
// //   //   (candidate) => candidate.tempID !== true)
// //   //   .filter(
// //   //     candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //   //     candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //   //     candidate.nationality.toLowerCase().includes(searchTerm.toLowerCase())
// //   // );

// //   const allCandidates = empPDData
// //   ?.filter((candidate) => candidate.tempID !== true) // Exclude candidates with tempID true
// //   .filter(
// //     (candidate) =>
// //       candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       candidate.nationality.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   useEffect(() => {
// //     if (allCandidates.length > 0) {
// //       setLoading(false);
// //       setError(null);
// //     } else {
// //       setError("No data available.");
// //     }
// //   }, [allCandidates]);
// //   const columns = [
// //     "Name",
// //     "Gender",
// //     "Nationality",
// //     "Position",
// //     "Experience",
// //     "Email",
// //     "Contact",
// //   ];

// //   return (
// //     <section className="screen-size min-h-screen w-full my-5">
// //       <div className="mb-8 flex justify-between items-center">
// //         <div className="flex-1">
// //           <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
// //             List Of All Candidates
// //           </button>
// //         </div>

// //         <div className="flex-1 flex justify-end ">
// //           {/* Pass the search handler */}
// //           <Searchbox
// //             newFormData={allCandidates}
// //             searchHandler={setSearchTerm} // Updated to pass the state updater directly
// //             emptySearch={() => console.log("Search cleared!")} // Handle clearing search results
// //             searchIcon1={<IoSearch />}
// //             placeholder="Search"
// //             border="rounded-full"
// //             shadow="shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]"
// //           />
// //         </div>
// //       </div>

// //       {/* Buttons for Edit and Delete */}
// //       <div className="flex relative mb-8 ">
// //         <div
// //           className=" absolute top-1/2 right-14 transform -translate-y-1/2 text-2xl hover:text-3xl flex items-center cursor-pointer"
// //           onClick={() => {
// //             if (selectedRows.length === 1) {
// //               navigate("/addCandidates", {
// //                 state: { editingData: selectedRows[0] },
// //               });
// //             } else if (selectedRows.length > 1) {
// //               alert("Please select only one row to edit.");
// //             } else {
// //               alert("Please select a row before editing.");
// //             }
// //           }}
// //           disabled={selectedRows.length === 0}
// //         >
// //           <FaEdit className="mr-2" />
// //         </div>

// //         <div
// //           className="absolute top-1/2 right-0 transform -translate-y-1/2 text-3xl hover:text-4xl cursor-pointer text-[#f42232cc] flex items-center"
// //           onClick={handleDeleteClick}
// //         >
// //           <MdDelete className="mr-2" />
// //         </div>
// //       </div>

// //       {/* Table Component */}
// //       {loading ? (
// //         <div className="text-center py-10">Loading...</div>
// //       ) : error ? (
// //         <div className="text-center py-10">{` ${error}`}</div>
// //       ) : (
// //         <Table
// //           columns={columns}
// //           rowClickHandler={handleRowClick}
// //           data={allCandidates}
// //           selectedRows={selectedRows} // Pass selected rows to Table
// //           onRowSelect={handleRowSelect} // Add handler to update selected rows
// //           edited={EditedData}
// //         />
// //       )}
// //     </section>
// //   );
// // };
// import React, { useState, useContext, useEffect } from "react";
// import { Table } from "../../utils/Table";
// import { MdDelete } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
// import { Searchbox } from "../../utils/Searchbox";
// import { IoSearch } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { DataSupply } from "../../utils/DataStoredContext";

// export const ListofCandi = () => {
//   const { empPDData, IVSSDetails } = useContext(DataSupply); // Fetching data from context
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const [editingData, setEditingData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleRowClick = (row) => {
//     setSelectedRow(row.id);
//   };

//   const EditedData = (editdata) => {
//     setEditingData(editdata);
//   };

//   // Handle delete button click
//   const handleDeleteClick = () => {
//     const remainingCandidates = allCandidates.filter(
//       (candidate) => !selectedRows.includes(candidate.id)
//     );
//     setSelectedRows([]);
//   };

//   // Handle row selection when checkbox is clicked
//   const handleRowSelect = (updatedSelectedRows) => {
//     setSelectedRows(updatedSelectedRows);
//   };

//   // Extract tempID values from both empPDData and IVSSDetails
//   const empTempIDs = empPDData?.map(candidate => candidate.tempID);
//   const ivssTempIDs = IVSSDetails?.map(candidate => candidate.tempID);

//   // Get unique tempID values that exist in both datasets
//   const tempIDsToExclude = empTempIDs?.filter(tempID => ivssTempIDs?.includes(tempID));

//   // Filter candidates where tempID is not in the tempIDsToExclude list
//   const allCandidates = empPDData
//     ?.filter((candidate) => !tempIDsToExclude.includes(candidate.tempID)) // Exclude candidates whose tempID is in both datasets
//    .filter(
//   (candidate) =>
//     (candidate.name && candidate.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (candidate.position && candidate.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (candidate.nationality && candidate.nationality.toLowerCase().includes(searchTerm.toLowerCase()))
// )

//   useEffect(() => {
//     if (allCandidates && allCandidates.length > 0) {
//       setLoading(false);
//       setError(null);
//     } else {
//       setError("No data available.");
//     }
//   }, [allCandidates]);

//   const columns = [
//     "Name",
//     "Gender",
//     "Nationality",
//     "Position",
//     "Experience",
//     "Email",
//     "Contact",
//   ];

//   return (
//     <section className="screen-size min-h-screen w-full my-5">
//       <div className="mb-8 flex justify-between items-center">
//         <div className="flex-1">
//           <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
//             List Of All Candidates
//           </button>
//         </div>

//         <div className="flex-1 flex justify-end ">
//           <Searchbox
//             newFormData={allCandidates}
//             searchHandler={setSearchTerm} // Updated to pass the state updater directly
//             emptySearch={() => console.log("Search cleared!")} // Handle clearing search results
//             searchIcon1={<IoSearch />}
//             placeholder="Search"
//             border="rounded-full"
//             shadow="shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]"
//           />
//         </div>
//       </div>

//       {/* Buttons for Edit and Delete */}
//       <div className="flex relative mb-8 ">
//         <div
//           className=" absolute top-1/2 right-14 transform -translate-y-1/2 text-2xl hover:text-3xl flex items-center cursor-pointer"
//           onClick={() => {
//             if (selectedRows.length === 1) {
//               navigate("/addCandidates", {
//                 state: { editingData: selectedRows[0] },
//               });
//             } else if (selectedRows.length > 1) {
//               alert("Please select only one row to edit.");
//             } else {
//               alert("Please select a row before editing.");
//             }
//           }}
//           disabled={selectedRows.length === 0}
//         >
//           <FaEdit className="mr-2" />
//         </div>

//         <div
//           className="absolute top-1/2 right-0 transform -translate-y-1/2 text-3xl hover:text-4xl cursor-pointer text-[#f42232cc] flex items-center"
//           onClick={handleDeleteClick}
//         >
//           <MdDelete className="mr-2" />
//         </div>
//       </div>

//       {/* Table Component */}
//       {loading ? (
//         <div className="text-center py-10">Loading...</div>
//       ) : error ? (
//         <div className="text-center py-10">{` ${error}`}</div>
//       ) : (
//         <Table
//           columns={columns}
//           rowClickHandler={handleRowClick}
//           data={allCandidates}
//           selectedRows={selectedRows} // Pass selected rows to Table
//           onRowSelect={handleRowSelect} // Add handler to update selected rows
//           edited={EditedData}
//         />
//       )}
//     </section>
//   );
// };
import React, { useState, useContext, useEffect } from "react";
import { Table } from "../../utils/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Searchbox } from "../../utils/Searchbox";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";

export const ListofCandi = () => {
  const { empPDData, IVSSDetails } = useContext(DataSupply); // Fetching data from context
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]); // Store selected row IDs (not indices)
  const [candidate, setCandidate] = useState([]); // Store selected candidate data
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [editingData, setEditingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row.id); // Use id to track selected row
  };

  const EditedData = (editdata) => {
    setEditingData(editdata);
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    const remainingCandidates = allCandidates.filter(
      (candidate) => !selectedRows.includes(candidate.id) // Ensure you're using id to match
    );
    setSelectedRows([]);
  };

  // Handle row selection when checkbox is clicked
  const handleRowSelect = (updatedSelectedRows) => {
    setSelectedRows(updatedSelectedRows); // Update with selected row IDs

    console.log("Updated selected rows:", updatedSelectedRows);
    console.log("All candidates data:", allCandidates);

    // Map the selected row indices to actual tempIDs
    const selectedTempIDs = updatedSelectedRows.map(
      (rowIndex) => allCandidates[rowIndex]?.tempID
    );
    console.log("Selected TempIDs:", selectedTempIDs); // For debugging
  };

  // Extract tempID values from both empPDData and IVSSDetails
  const empTempIDs = empPDData?.map((candidate) => candidate.tempID);
  const ivssTempIDs = IVSSDetails?.map((candidate) => candidate.tempID);

  // Get unique tempID values that exist in both datasets
  const tempIDsToExclude = empTempIDs?.filter((tempID) =>
    ivssTempIDs?.includes(tempID)
  );

  // Filter candidates where tempID is not in the tempIDsToExclude list
  const allCandidates = empPDData
    ?.filter((candidate) => !tempIDsToExclude.includes(candidate.tempID)) // Exclude candidates whose tempID is in both datasets
    .filter(
      (candidate) =>
        (candidate.name &&
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (candidate.position &&
          candidate.position
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (candidate.nationality &&
          candidate.nationality
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    );

  useEffect(() => {
    if (allCandidates && allCandidates.length > 0) {
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
              const selectedTempID = allCandidates[selectedRows[0]]?.tempID; // Get the tempID
              navigate("/addCandidates", {
                state: { tempID: selectedTempID }, // Pass the tempID for editing
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
        <div className="text-center py-10">{`${error}`}</div>
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
