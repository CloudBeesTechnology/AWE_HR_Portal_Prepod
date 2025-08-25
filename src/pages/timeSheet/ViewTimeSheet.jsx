// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { FaAngleDown } from "react-icons/fa";
// import { IoMdDownload } from "react-icons/io";
// import { Link } from "react-router-dom";
// import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
// import { FilterForTimeSheet } from "./FilterForTimeSheet";
// import { useFetchData } from "./customTimeSheet/UseFetchData";
// import { FaArrowLeft } from "react-icons/fa";
// import { ListTimeSheet } from "./ListTimeSheet";
// import { useTempID } from "../../utils/TempIDContext";
// import { ExportTableToExcel } from "./customTimeSheet/DownloadTableToExcel";
// import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
// import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";

// export const ViewTimeSheet = () => {
//   const prevCategoryRef = useRef(null);
//   const Position = localStorage.getItem("userType");
//   // const [categoryFilter, setCategoryFilter] = useState("Select Excel Sheet");
//   const [toggleClick, setToggleClick] = useState(false);

//   const [selectedCategory, setSelectedCategory] = useState("All Records");
//   const [data, setData] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [secondaryData, setSecondaryData] = useState(null);
//   const [allExcelSheetData, setAllExcelSheetData] = useState(null);
//   const [message, setMessage] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const {
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//     setSearchQuery,
//     showListTimeSheet,
//     setShowListTimeSheet,
//     timeSheetFileData,
//     setTimeSheetFileData,
//     categoryFilter,
//     setCategoryFilter,
//     categoryFilters,
//     setCategoryFilters,
//     tableData,
//     setTableData,
//   } = useTempID();

//   const { convertedStringToArrayObj } = useFetchData(
//     categoryFilter,
//     "viewTimeSheet",
//     setLoading,
//     loading,
//     setMessage
//   );

//   let visibleData;

//   useEffect(() => {
//     try {
//       async function groupByUpdatedAtAndStatus(data) {
//         const groupedData = {};

//         data.forEach((item) => {
//           const updatedAtDate = item.updatedAt.split("T")[0];
//           const status = item?.status; // Get status
//           const excelfileName = item?.fileName;

//           const key = `${updatedAtDate}_${status}_${excelfileName}`;

//           if (!groupedData[key]) {
//             groupedData[key] = {
//               fileName: item.fileName,
//               fileType: item.fileType,
//               date: updatedAtDate,
//               status: status,
//               updatedAt: [],
//             };
//           }

//           groupedData[key].updatedAt.push(item);
//         });

//         return Object.values(groupedData);
//       }

//       const identifyAssignData = async () => {
//         if (Position === "Manager" && categoryFilter !== "Select Excel Sheet") {
//           const ManagerData = await SendDataToManager(
//             convertedStringToArrayObj,
//             setLoading,
//             setMessage
//           );

//           const removeStatusAll = ManagerData.filter(
//             (fil) => fil.status !== "Unsubmitted"
//           );
//           var filterManagerData = removeStatusAll;
//         } else if (Position === "SuperAdmin") {
//           var filterManagerData = convertedStringToArrayObj;
//         } else {
//           var findTimeKeeper = await FindSpecificTimeKeeper(
//             convertedStringToArrayObj,
//             setLoading,
//             setMessage
//           );
//           const removeStatusAll = findTimeKeeper.filter(
//             (fil) => fil.status !== "Pending"
//           );

//           var filterManagerData = removeStatusAll;
//         }

//         const groupedData = await groupByUpdatedAtAndStatus(filterManagerData);

//         setAllExcelSheetData(groupedData);
//         setSecondaryData(groupedData);
//       };

//       if (categoryFilter === "Select Excel Sheet") {
//         setMessage("Select an Excel sheet from the dropdown to display data.");
//       } else if (!convertedStringToArrayObj) {
//         setMessage("Please wait a few seconds...");
//       } else if (
//         convertedStringToArrayObj &&
//         convertedStringToArrayObj.length > 0
//       ) {
//         identifyAssignData();
//       }
//     } catch (err) {}
//   }, [convertedStringToArrayObj, categoryFilter]);

//   useEffect(() => {
//     if (!secondaryData || secondaryData.length === 0) return;
//     setCurrentPage(1);
//     let filteredData = [...secondaryData];

//     if (selectedCategory !== "All Records") {
//       filteredData = filteredData.filter(
//         (item) => item.status === selectedCategory
//       );
//     }

//     if (startDate) {
//       const inputDate = new Date(startDate);
//       inputDate?.setHours(0, 0, 0, 0);

//       filteredData = filteredData.filter((item) => {
//         const itemDate = new Date(item.date);
//         itemDate?.setHours(0, 0, 0, 0);

//         return itemDate.getTime() === inputDate.getTime();
//       });
//     }

//     if (filteredData.length > 0) {
//       setAllExcelSheetData(filteredData);
//     } else {
//       setAllExcelSheetData([]);
//       setMessage("No matching results found.");
//     }
//   }, [secondaryData, startDate, selectedCategory]);

//   const handleFilterChange = (category) => {
//     // setAllExcelSheetData([]);
//     setSelectedCategory(category);
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const searchResult = (result) => {
//     setSearchQuery(result);
//   };

//   const handleForSelectTSheet = (category) => {
//     setCategoryFilter(category);
//   };

//   const newSearchFunction = useCallback((allData) => {
//     setData(allData?.updatedAt);
//   }, []);

//   const itemsPerPage = 10;
//   const safeData = allExcelSheetData || [];

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(safeData.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   visibleData = currentData;

//   return (
//     <div
//       className={`bg-[#fafaf6] ${
//         showListTimeSheet && "h-screen"
//       } border border-[#fafaf6] flex justify-center `}
//       onClick={() => {
//         if (toggleClick === true) {
//           setToggleClick(false);
//         }
//         if (isOpen === true) {
//           setIsOpen(false);
//         }
//       }}
//     >
//       <div
//         className={`${
//           showListTimeSheet ? "w-[1300px]" : "screen-size"
//         } mt-9 mx-9`}
//       >
//         <div className="flex items-center w-full">
//           <Link
//             to={`${showListTimeSheet ? "/timeSheet" : "/viewTimesheet"}`}
//             className="text-xl text-grey cursor-pointer w-1/15 flex items-center"
//             onClick={() => {
//               setStartDate("");
//               setEndDate("");
//               setShowListTimeSheet(true);
//               setTimeSheetFileData(null);
//               setCategoryFilters(null);
//               setTableData(null);
//               setSearchQuery(null);
//             }}
//           >
//             <FaArrowLeft />
//           </Link>

//           <header className="text_size_2 py-5 flex-grow text-dark_grey text-center">
//             <p>View Time Sheet</p>
//           </header>
//           {categoryFilters !== null && (
//             <div
//               className="flex space-x-3  items-center rounded px-3 py-2 bg-[#FEF116]"
//               onClick={() => {
//                 ExportTableToExcel(categoryFilters || "TimeSheet", tableData);
//               }}
//             >
//               <button className=" text_size_5 text-dark_grey">Download</button>
//               <IoMdDownload className="text-black cursor-pointer" />
//             </div>
//           )}
//         </div>

//         <div className="flex justify-between items-center w-full">
//           <div className="flex justify-start gap-4">
//             <div className="relative grid grid-cols-1">
//               <label className="text_size_6">
//                 {showListTimeSheet ? "Choose Date" : "Start Date"}
//               </label>
//               <input
//                 type="date"
//                 value={startDate || ""}
//                 className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </div>
//             {!showListTimeSheet && (
//               <div className="relative grid grid-cols-1">
//                 <label className="text_size_6">End Date</label>
//                 <input
//                   type="date"
//                   value={endDate || ""}
//                   className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end gap-4 mt-6">
//             <div
//               className={`${
//                 !showListTimeSheet ? "hidden" : "relative grid grid-cols-1"
//               }`}
//             >
//               <input
//                 value={categoryFilter}
//                 placeholder="Select type"
//                 className="border border-[#D9D9D9] cursor-pointer rounded outline-none p-2 text-[#1b1b1b] text_size_8"
//                 onClick={() => {
//                   setToggleClick(!toggleClick);
//                 }}
//                 readOnly
//               />
//               <span className="absolute right-2 top-2">
//                 <FaAngleDown className="text-xl text-dark_ash" />
//               </span>
//               {toggleClick && (
//                 <div
//                   className="absolute border top-10 border-[#D9D9D9] mt-1 w-full text-[15px] text-dark_grey p-1 bg-white z-50"
//                   onClick={() => {
//                     setToggleClick(!toggleClick);
//                   }}
//                 >
//                   {[
//                     "Offshore",
//                     "HO",
//                     "SBW",
//                     "ORMC",
//                     "Offshore's ORMC",
//                     "BLNG",
//                   ].map((category) => (
//                     <p
//                       key={category}
//                       className={`p-1 cursor-pointer ${
//                         prevCategoryRef.current === category
//                           ? "bg-secondary border text-white"
//                           : "hover:bg-grey hover:text-white"
//                       }`}
//                       onClick={() => {
//                         if (category !== prevCategoryRef.current) {
//                           // setLoading(true);
//                           handleForSelectTSheet(category);

//                           setAllExcelSheetData(null);
//                           setSecondaryData(null);

//                           prevCategoryRef.current = category;
//                         }
//                       }}
//                     >
//                       {category}
//                     </p>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {!showListTimeSheet && (
//               <SearchBoxForTimeSheet
//                 placeholder={`${
//                   timeSheetFileData?.fileType === "Offshore"
//                     ? "SAP ID"
//                     : timeSheetFileData?.fileType === "HO"
//                     ? "EMPLOYEE ID / BADGE NO"
//                     : timeSheetFileData?.fileType === "SBW"
//                     ? "BADGE NO"
//                     : timeSheetFileData?.fileType === "ORMC"
//                     ? "BADGE NO"
//                     : timeSheetFileData?.fileType === "Offshore's ORMC"
//                     ? "BADGE NO"
//                     : timeSheetFileData?.fileType === "BLNG"
//                     ? "FID"
//                     : "Search..."
//                 }`}
//                 searchResult={searchResult}
//                 allEmpDetails={data}
//                 secondaryData={timeSheetFileData?.updatedAt}
//                 Position="ViewTimeSheet"
//               />
//             )}
//             {showListTimeSheet && (
//               <FilterForTimeSheet
//                 handleFilterChange={handleFilterChange}
//                 toggleDropdown={toggleDropdown}
//                 isOpen={isOpen}
//                 setIsOpen={setIsOpen}
//               />
//             )}
//           </div>
//         </div>

//         {showListTimeSheet && (
//           <ListTimeSheet
//             visibleData={visibleData}
//             newSearchFunction={newSearchFunction}
//             loading={loading}
//             message={message}
//             totalPages={totalPages}
//             currentPage={currentPage}
//             paginate={paginate}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { FilterForTimeSheet } from "./FilterForTimeSheet";
import { FaArrowLeft } from "react-icons/fa";
import { ListTimeSheet } from "./ListTimeSheet";
import { useTempID } from "../../utils/TempIDContext";
import { ExportTableToExcel } from "./customTimeSheet/DownloadTableToExcel";
import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";
import { useFetchDataForVT } from "./customTimeSheet/useFetchDataForVT";
import usePermission from "../../hooks/usePermissionDashInside";
import { FiLoader } from "react-icons/fi";

export const ViewTimeSheet = () => {
  const prevCategoryRef = useRef(null);
  const Position = localStorage.getItem("userType");
  // const [categoryFilter, setCategoryFilter] = useState("Select Excel Sheet");
  const [toggleClick, setToggleClick] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All Records");
  const [data, setData] = useState(null);
  const [loadingMessForDelay, setLoadingMessForDelay] = useState(true);

  // const [loading, setLoading] = useState(false);
  const [secondaryData, setSecondaryData] = useState(null);
  const [allExcelSheetData, setAllExcelSheetData] = useState(null);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [grantedFileTypes, setGrantedFileTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setSearchQuery,
    showListTimeSheet,
    setShowListTimeSheet,
    timeSheetFileData,
    setTimeSheetFileData,
    categoryFilter,
    setCategoryFilter,
    categoryFilters,
    setCategoryFilters,
    tableData,
    setTableData,
  } = useTempID();

  const timeSheetPermissions = usePermission("userID", "TimeSheet");

  useEffect(() => {
    const fileTypes = [
      "Offshore",
      "HO",
      "SBW",
      "ORMC",
      "Offshore's ORMC",
      "BLNG",
    ];
    const getFileTypes = [];
    for (var list of timeSheetPermissions) {
      if (fileTypes?.includes(list)) {
        getFileTypes?.push(list);
      }
    }

    setGrantedFileTypes(getFileTypes);
    prevCategoryRef.current = getFileTypes[0];
    handleForSelectTSheet(getFileTypes[0]);
    if (getFileTypes?.length > 0) {
      setLoadingMessForDelay(false);
    }
  }, [timeSheetPermissions]);

  const {
    convertedStringToArrayObj,
    getPosition,
    setEmptyTableMess,
    emptyTableMess,
    setLoading,
    loading,
  } = useFetchDataForVT(
    categoryFilter,
    "viewTimeSheet"
    // setLoading,
    // loading,
    // setMessage
  );

  let visibleData;

  useEffect(() => {
    try {
      async function groupByUpdatedAtAndStatus(data) {
        const groupedData = {};

        data.forEach((item) => {
          const updatedAtDate = item.updatedAt.split("T")[0];
          const status = item?.status; // Get status
          const excelfileName = item?.fileName;

          const key = `${updatedAtDate}_${status}_${excelfileName}`;

          if (!groupedData[key]) {
            groupedData[key] = {
              fileName: item.fileName,
              fileType: item.fileType,
              date: updatedAtDate,
              status: status,
              updatedAt: [],
            };
          }

          groupedData[key].updatedAt.push(item);
        });

        return Object.values(groupedData);
      }

      const identifyAssignData = async () => {
        setEmptyTableMess(null);
        setLoading(null);
        const arrayOfObj =
          Array.isArray(convertedStringToArrayObj) &&
          convertedStringToArrayObj?.length > 0;
        let filterDataByPosition = [];
        if (
          Position === "Manager" &&
          categoryFilter !== "Select Excel Sheet" &&
          arrayOfObj
        ) {
          const ManagerData = await SendDataToManager(
            convertedStringToArrayObj
            // setLoading,
            // setMessage
          );

          const removeStatusAll = ManagerData.filter(
            (fil) => fil.status !== "Unsubmitted"
          );
          filterDataByPosition = removeStatusAll;
        } else if (Position === "SuperAdmin" && arrayOfObj) {
          filterDataByPosition = convertedStringToArrayObj;
        } else if (categoryFilter !== "Select Excel Sheet" && arrayOfObj) {
          filterDataByPosition = await FindSpecificTimeKeeper(
            convertedStringToArrayObj
            // setLoading,
            // setMessage
          );

          const removeStatusAll = filterDataByPosition.filter(
            (fil) => fil.status !== "Pending"
          );

          filterDataByPosition = removeStatusAll;
        }

        if (
          Array.isArray(filterDataByPosition) &&
          filterDataByPosition?.length > 0
        ) {
          setEmptyTableMess(true);
          setLoading(true);
        } else {
          setEmptyTableMess(false);
          setLoading(false);
        }

        const groupedData = await groupByUpdatedAtAndStatus(
          filterDataByPosition
        );

        setAllExcelSheetData(groupedData);
        setSecondaryData(groupedData);
      };

      // if (categoryFilter === "Select Excel Sheet") {
      //   setMessage("Select an Excel sheet from the dropdown to display data.");
      // } else if (!convertedStringToArrayObj) {
      //   setMessage("Please wait a few seconds...");
      // } else if (
      //   convertedStringToArrayObj &&
      //   convertedStringToArrayObj.length > 0
      // ) {
      //   identifyAssignData();
      // }
      // console.log("convertedStringToArrayObj : ", convertedStringToArrayObj);
      // console.log("setEmptyTableMess : ", emptyTableMess);
      // console.log("setLoading : ", loading);
      if (convertedStringToArrayObj && convertedStringToArrayObj.length > 0) {
        identifyAssignData();
      }
    } catch (err) {
      console.log("Error : ", err);
    }
  }, [convertedStringToArrayObj, categoryFilter]);

  useEffect(() => {
    if (!secondaryData || secondaryData.length === 0) return;
    setCurrentPage(1);
    let filteredData = [...secondaryData];

    if (selectedCategory !== "All Records") {
      filteredData = filteredData.filter(
        (item) => item.status === selectedCategory
      );
    }

    if (startDate && endDate) {
      const getStartDate = new Date(startDate);
      getStartDate?.setHours(0, 0, 0, 0);

      const getEndDate = new Date(endDate);
      getEndDate?.setHours(0, 0, 0, 0);

      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date);
        itemDate?.setHours(0, 0, 0, 0);

        return itemDate >= getStartDate && itemDate <= getEndDate;
      });
    }

    if (filteredData.length > 0) {
      setAllExcelSheetData(filteredData);
    } else {
      setAllExcelSheetData([]);
      setMessage("No matching results found.");
    }
  }, [secondaryData, startDate, endDate, selectedCategory]);

  const handleFilterChange = (category) => {
    // setAllExcelSheetData([]);
    setSelectedCategory(category);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const searchResult = (result) => {
    setSearchQuery(result);
  };

  const handleForSelectTSheet = (category) => {
    setCategoryFilter(category);
  };

  const newSearchFunction = useCallback((allData) => {
    setData(allData?.updatedAt);
    setStartDate("");
    setEndDate("");
  }, []);

  const itemsPerPage = 10;
  const safeData = allExcelSheetData || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  visibleData = currentData;

  if (loadingMessForDelay) {
    return (
      <div className="flex items-center justify-center h-[82vh] bg-transparent">
        <div className="flex justify-between gap-2">
          <div className="flex justify-between gap-2">
            <p className="text-sm font-semibold">Loading </p>
            <p>
              <FiLoader className="animate-spin mt-[4px]" size={15} />
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#fafaf6] ${
        showListTimeSheet && "h-screen"
      } border border-[#fafaf6] flex justify-center `}
      onClick={() => {
        if (toggleClick === true) {
          setToggleClick(false);
        }
        if (isOpen === true) {
          setIsOpen(false);
        }
      }}
    >
      <div
        className={`${
          showListTimeSheet ? "w-[1300px]" : "screen-size"
        } mt-9 mx-9`}
      >
        <div className="flex items-center w-full">
          <Link
            to={`${showListTimeSheet ? "/timeSheet" : "/viewTimesheet"}`}
            className="text-xl text-grey cursor-pointer w-1/15 flex items-center"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setShowListTimeSheet(true);
              setTimeSheetFileData(null);
              setCategoryFilters(null);
              setTableData(null);
              setSearchQuery(null);
            }}
          >
            <FaArrowLeft />
          </Link>

          <header className="text_size_2 py-5 flex-grow text-dark_grey text-center">
            <p>View Time Sheet</p>
          </header>
          {categoryFilters !== null && (
            <div
              className="flex space-x-3  items-center rounded px-3 py-2 bg-[#FEF116]"
              onClick={() => {
                ExportTableToExcel(categoryFilters || "TimeSheet", tableData);
              }}
            >
              <button className=" text_size_5 text-dark_grey">Download</button>
              <IoMdDownload className="text-black cursor-pointer" />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start gap-4">
            <div className="relative grid grid-cols-1">
              <label className="text_size_6">
                {/* {showListTimeSheet ? "Choose Date" : "Start Date"} */}
                Start Date
              </label>
              <input
                type="date"
                value={startDate || ""}
                className="border border-[#D9D9D9] rounded outline-none p-1.5 text_size_6 text-dark_grey"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {/* {!showListTimeSheet && ( */}
            <div className="relative grid grid-cols-1">
              <label className="text_size_6">End Date</label>
              <input
                type="date"
                value={endDate || ""}
                className="border border-[#D9D9D9] rounded outline-none p-1.5 text_size_6 text-dark_grey"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            {/* )} */}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <div
              className={`${
                !showListTimeSheet ? "hidden" : "relative grid grid-cols-1"
              } cursor-pointer`}
              onClick={() => {
                setToggleClick(!toggleClick);
              }}
            >
              <input
                value={categoryFilter || ""}
                placeholder="Select type"
                className="border border-[#D9D9D9] cursor-pointer rounded outline-none p-2 text-[#1b1b1b] text_size_8"
                readOnly
              />
              <span className="absolute right-2 top-2">
                <FaAngleDown className="text-xl text-dark_ash" />
              </span>
              {toggleClick && (
                <div
                  className="absolute border top-10 border-[#D9D9D9] mt-1 w-full text-[15px] text-dark_grey p-1 bg-white z-50"
                  onClick={() => {
                    setToggleClick(!toggleClick);
                  }}
                >
                  {grantedFileTypes?.map((category) => (
                    <p
                      key={category}
                      className={`p-1 cursor-pointer ${
                        prevCategoryRef.current === category
                          ? "bg-secondary border text-white"
                          : "hover:bg-grey hover:text-white"
                      }`}
                      onClick={() => {
                        if (category !== prevCategoryRef.current) {
                          // setLoading(true);
                          handleForSelectTSheet(category);

                          setAllExcelSheetData(null);
                          setSecondaryData(null);
                          setSelectedCategory("All Records");
                          prevCategoryRef.current = category;
                        }
                      }}
                    >
                      {category}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {!showListTimeSheet && (
              <SearchBoxForTimeSheet
                placeholder={`${
                  timeSheetFileData?.fileType === "Offshore"
                    ? "SAP ID"
                    : timeSheetFileData?.fileType === "HO"
                    ? "EMPLOYEE ID / BADGE NO"
                    : timeSheetFileData?.fileType === "SBW"
                    ? "BADGE NO"
                    : timeSheetFileData?.fileType === "ORMC"
                    ? "BADGE NO"
                    : timeSheetFileData?.fileType === "Offshore's ORMC"
                    ? "BADGE NO"
                    : timeSheetFileData?.fileType === "BLNG"
                    ? "FID"
                    : "Search..."
                }`}
                searchResult={searchResult}
                allEmpDetails={data}
                secondaryData={timeSheetFileData?.updatedAt}
                Position="ViewTimeSheet"
              />
            )}
            {showListTimeSheet && (
              <FilterForTimeSheet
                handleFilterChange={handleFilterChange}
                selectedCategory={selectedCategory}
                toggleDropdown={toggleDropdown}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
        </div>

        {showListTimeSheet && (
          <ListTimeSheet
            visibleData={visibleData}
            newSearchFunction={newSearchFunction}
            loading={loading}
            message={message}
            totalPages={totalPages}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            paginate={paginate}
            emptyTableMess={emptyTableMess}
            categoryFilter={categoryFilter}
            convertedStringToArrayObj={convertedStringToArrayObj}
          />
        )}
      </div>
    </div>
  );
};
