import React, { useState, useRef, useEffect } from "react";
import { ReviewForm } from "../pages/recruitments/ReviewForm";
import { RiFileEditLine } from "react-icons/ri";
import { Pagination } from "../pages/leaveManagement/Pagination";

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
  rowsPerPage = 30,
}) => {
  const [localSelectedRows, setLocalSelectedRows] = useState(selectedRows || []);
  const [clickedRowSno, setClickedRowSno] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectCandidate, setSelectCandidate] = useState(null);
  const [page, setPage] = useState(1);
  const tableRef = useRef(null);

  // Filter out rows where status is "Inactive"
  const filteredData = data.filter((row) => row.status !== "Inactive");

  const sortedData = filteredData.sort((a, b) => a.tempID - b.tempID);


  // Calculate total pages and paginated data
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = page * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Reset page to 1 when search results (filteredData) change
  useEffect(() => {
    setPage(1);
  }, [filteredData.length]);

  // Adjust page if total pages change
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      setLocalSelectedRows([]); // Deselect all rows when page changes
    }
  };

  // Handle row click
  const handleRowClick = (row, tableType, index) => {
    setClickedRowSno((prev) => ({
      ...prev,
      [tableType]: prev?.[tableType] === index ? null : index,
    }));
    setSelectCandidate(row);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  // Handle checkbox change (single row)
  const handleCheckboxChange = (rowIndex) => {
    const fullIndex = startIndex + rowIndex;
    const updatedSelectedRows = localSelectedRows.includes(fullIndex)
      ? localSelectedRows.filter((sno) => sno !== fullIndex)
      : [...localSelectedRows, fullIndex];

    setLocalSelectedRows(updatedSelectedRows);
    onRowSelect && onRowSelect(updatedSelectedRows);
  };

  // Handle "select all" checkbox change
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const allRowIndicesOnPage = paginatedData.map((_, index) => startIndex + index);
      setLocalSelectedRows(allRowIndicesOnPage);
      onRowSelect && onRowSelect(allRowIndicesOnPage);
    } else {
      setLocalSelectedRows([]);
      onRowSelect && onRowSelect([]);
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
    Date: "date",
    Time: "time",
    Venue: "venue",
    Status: "status",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setClickedRowSno({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!filteredData) return <div>Loading...</div>;
  if (filteredData.length === 0)
    return <div className="text-center text-grey py-10">No data available.</div>;

  return (
    <>
      <div className="recruitmentTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-xl" ref={tableRef}>
        <table className="w-full text-center">
          {/* Table Header */}
          <thead className="bg-[#939393] text-white sticky top-0">
            <tr>
              {showCheckboxes && (
                <th className="pl-4 py-4">
                  <input
                    className="w-6 h-6"
                    type="checkbox"
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleSelectAllChange}
                    checked={
                      localSelectedRows.length === paginatedData.length && paginatedData.length > 0
                    }
                  />
                </th>
              )}
              <th className="pl-4 py-4">S.No</th>
              {columns.map((column, index) => (
                <th key={index} className="pl-4 py-4">
                  {column}
                </th>
              ))}
              {(currentPage === "status" || currentPage === "workpasstracking") && <th></th>}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white cursor-pointer">
            {paginatedData.map((value, index) => (
              <tr
                key={index}
                className={`border-b-2 hover:bg-medium_blue bg-white border-[#C7BCBC] text-[15px] text-[#303030] ${
                  localSelectedRows.includes(startIndex + index) ? "bg-medium_blue" : ""
                }`}
                onClick={() => handleRowClick(value, selectedTable, index)}
              >
                {showCheckboxes && (
                  <td className="pl-4 py-4">
                    <input
                      className="w-5 h-6"
                      type="checkbox"
                      onClick={(e) => {
                        e.stopPropagation();
                        edited(value);
                      }}
                      checked={localSelectedRows.includes(startIndex + index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                )}
                <td className="pl-4 py-4">{startIndex + index + 1}</td>
                {columns.map((column, i) => (
                  <td key={i} className="pl-4 py-4">{value[columnKeyMapping[column]] || "-"}</td>
                ))}
                {(currentPage === "status" || currentPage === "workpasstracking") && showEditIcon && (
                  <td className="px-4 py-4 text-[#835c1d]">
                    <RiFileEditLine className="text-2xl cursor-pointer" onClick={(e) => { e.stopPropagation(); edited(value); }} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {isFormVisible && selectCandidate && (
          <ReviewForm candidate={selectCandidate} onClose={closeForm} showDecisionButtons={currentPage === "status"} />
        )}
      </div>

      {paginatedData.length > 0 && (
        <div className="flex justify-center mt-10">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </>
  );
};


// import React, { useState, useRef, useEffect } from "react";
// import { ReviewForm } from "../pages/recruitments/ReviewForm";
// import { RiFileEditLine } from "react-icons/ri";
// import { Pagination } from "../pages/leaveManagement/Pagination";

// export const Table = ({
//   columns,
//   rowClickHandler,
//   selectedRows,
//   onRowSelect,
//   showCheckboxes = true,
//   currentPage,
//   selectedTable,
//   edited,
//   showEditIcon,
//   data,
//   rowsPerPage = 30,
// }) => {
//   const [localSelectedRows, setLocalSelectedRows] = useState(selectedRows || []);
//   const [clickedRowSno, setClickedRowSno] = useState({});
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [selectCandidate, setSelectCandidate] = useState(null);
//   const tableRef = useRef(null);

//   const [page, setPage] = useState(1);

//   // Filter out rows where status is "Inactive"
//   const filteredData = data.filter((row) => row.status !== "Inactive");

//   // Sort the filteredData based on tempID
//   const sortedData = filteredData.sort((a, b) => {
//     const numA = parseInt(a.tempID.replace(/\D/g, ""), 10) || 0;
//     const numB = parseInt(b.tempID.replace(/\D/g, ""), 10) || 0;
//     return numA - numB;
//   });
//   // Calculate paginated data
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const startIndex = (page - 1) * rowsPerPage;
//   const endIndex = page * rowsPerPage;
//   const paginatedData = sortedData.slice(startIndex, endIndex);

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setPage(newPage);
//       setLocalSelectedRows([]); // Deselect all rows when page changes
//     }
//   };

//   // Handle row click
//   const handleRowClick = (row, tableType, index) => {
//     setClickedRowSno((prev) => ({
//       ...prev,
//       [tableType]: prev?.[tableType] === index ? null : index,
//     }));
//     setSelectCandidate(row);
//     setIsFormVisible(true);
//   };

//   const closeForm = () => {
//     setIsFormVisible(false);
//   };

//   // Handle checkbox change (single row)
//   const handleCheckboxChange = (rowIndex) => {
//     const fullIndex = startIndex + rowIndex; 

//     const updatedSelectedRows = localSelectedRows.includes(fullIndex)
//       ? localSelectedRows.filter((sno) => sno !== fullIndex)
//       : [...localSelectedRows, fullIndex];

//     setLocalSelectedRows(updatedSelectedRows);
//     onRowSelect && onRowSelect(updatedSelectedRows);
//   };

//   // Handle "select all" checkbox change
//   const handleSelectAllChange = (e) => {
//     if (e.target.checked) {
//       const allRowIndicesOnPage = paginatedData.map((_, index) => startIndex + index);
//       setLocalSelectedRows(allRowIndicesOnPage);
//       onRowSelect && onRowSelect(allRowIndicesOnPage);
//     } else {
//       setLocalSelectedRows([]);
//       onRowSelect && onRowSelect([]);
//     }
//   };

//   const columnKeyMapping = {
//     TempID: "tempID",
//     Name: "name",
//     Gender: "gender",
//     Nationality: "nationality",
//     Position: "position",
//     Experience: "noExperience",
//     Email: "email",
//     Contact: "contactNo",
//     Contract: "contractType",
//     Type: "empType",
//     Interviewer: "interviewer",
//     date: "date",
//     Time: "time",
//     Venue: "venue",
//     Status: "status",
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (tableRef.current && !tableRef.current.contains(event.target)) {
//         setClickedRowSno({});
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   if (!filteredData) return <div>Loading...</div>;
//   if (filteredData.length === 0)
//     return (
//       <div className="text-center text-grey py-10">No data available.</div>
//     );

//   return (
//     <>
//       <div
//         className="recruitmentTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-xl"
//         ref={tableRef}
//       >
//         <table className="w-full text-center">
//           {/* Table Header */}
//           <thead className="bg-[#939393] text-white sticky top-0">
//             <tr>
//               {showCheckboxes && (
//                 <th className="pl-4 py-4">
//                   <input
//                     className="w-6 h-6"
//                     type="checkbox"
//                     onClick={(e) => e.stopPropagation()}
//                     onChange={handleSelectAllChange}
//                     checked={
//                       localSelectedRows.length === paginatedData.length &&
//                       paginatedData.length > 0
//                     }
//                   />
//                 </th>
//               )}
//               <th className="pl-4 py-4">S.No</th>
//               {columns.map((column, index) => (
//                 <th key={index} className="pl-4 py-4">
//                   {column}
//                 </th>
//               ))}
//               {(currentPage === "status" ||
//                 currentPage === "workpasstracking") && <th></th>}
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody className="bg-white cursor-pointer">
//             {paginatedData.map((value, index) => (
//               <tr
//                 key={index}
//                 className={`border-b-2 hover:bg-medium_blue bg-white border-[#C7BCBC] text-[15px] text-[#303030] ${
//                   showCheckboxes
//                     ? localSelectedRows.includes(startIndex + index)
//                       ? "bg-medium_blue"
//                       : ""
//                     : clickedRowSno[selectedTable] === index
//                     ? "bg-medium_blue"
//                     : ""
//                 }`}
//                 onClick={() => handleRowClick(value, selectedTable, index)}
//               >
//                 {showCheckboxes && (
//                   <td className="pl-4 py-4">
//                     <input
//                       className="w-5 h-6"
//                       type="checkbox"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         edited(value);
//                       }}
//                       checked={localSelectedRows.includes(startIndex + index)}
//                       onChange={() => handleCheckboxChange(index)}
//                     />
//                   </td>
//                 )}
//                 <td className="pl-4 py-4">{startIndex + index + 1}</td>

//                 {columns.map((column, i) => (
//                   <td key={i} className="pl-4 py-4">
//                     {value[columnKeyMapping[column]] || "-"}
//                   </td>
//                 ))}

//                 {(currentPage === "status" ||
//                   currentPage === "workpasstracking") &&
//                   showEditIcon && (
//                     <td className="px-4 py-4 text-[#835c1d]">
//                       <RiFileEditLine
//                         className="text-2xl cursor-pointer"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           edited(value);
//                         }}
//                       />
//                     </td>
//                   )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {isFormVisible && selectCandidate && (
//           <ReviewForm
//             candidate={selectCandidate}
//             onClose={closeForm}
//             showDecisionButtons={currentPage === "status"}
//           />
//         )}
//       </div>
//       {paginatedData.length > 0 && (
//         <div className="ml-20 flex justify-center">
//           <div className="w-[60%] flex justify-start mt-10 px-10">
//             <Pagination
//               currentPage={page}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
