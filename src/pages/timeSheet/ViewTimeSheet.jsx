import React, { useEffect, useMemo, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { VTimeSheetTable } from "./VTimeSheetTable";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { FilterForTimeSheet } from "./FilterForTimeSheet";
import { useFetchData } from "./customTimeSheet/UseFetchData";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";

import { FaArrowLeft } from "react-icons/fa";
import { listTimeSheets } from "../../graphql/queries";
import { generateClient } from "@aws-amplify/api";
import { UseScrollableView } from "./customTimeSheet/UseScrollableView";
const client = generateClient();

export const ViewTimeSheet = () => {
  const [categoryFilter, setCategoryFilter] = useState("BLNG");
  const [toggleClick, setToggleClick] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [secondaryData, setSecondaryData] = useState(null);
  const [allExcelSheetData, setAllExcelSheetData] = useState(null);

  const [finalSearchRes, setFinalSearchRes] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { convertedStringToArrayObj, getPosition } = useFetchData(
    categoryFilter,
    "viewTimeSheet"
  );

  const { handleScroll, visibleData, setVisibleData } = UseScrollableView(
    allExcelSheetData,
    "TimeKeeper"
  );
  console.log(visibleData);
  useEffect(() => {
    function groupByUpdatedAt(data) {
      const groupedData = {};

      data.forEach((item) => {
        // Extract the date part from updatedAt
        const updatedAtDate = item.updatedAt.split("T")[0]; // e.g., "2024-12-17"

        // If the group for this date doesn't exist, initialize it
        if (!groupedData[updatedAtDate]) {
          groupedData[updatedAtDate] = {
            fileName: item.fileName,
            fileType: item.fileType,
            date: updatedAtDate,
            status: item.status,
            updatedAt: [],
          };
        }

        // Add the current item to the updatedAt array of the group
        groupedData[updatedAtDate].updatedAt.push(item);
      });

      // Convert the grouped data object into an array
      return Object.values(groupedData);
    }

    const groupedData = groupByUpdatedAt(convertedStringToArrayObj);
    console.log(groupedData);
    console.log("convertedStringToArrayObj : ", convertedStringToArrayObj);
    setAllExcelSheetData(groupedData);
    setSecondaryData(groupedData);
  }, [convertedStringToArrayObj]);

  const AllFieldData = useTableFieldData(categoryFilter);

  // ####################################################
  // ####################################################
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const searchResult = (result) => {
    console.log(result);
    setSearchQuery(result);
  };

  const handleForSelectTSheet = (category) => {
    setCategoryFilter(category);
  };

  // All Excel Sheet Data
  const newSearchFunction = (allData) => {
    setData(allData.updatedAt);
  };

  useEffect(() => {
    if (!secondaryData || secondaryData.length === 0) return;
    let finalData = [...secondaryData];
    if (selectedCategory !== "All") {
      finalData = secondaryData.filter(
        (item) => item.status === selectedCategory
      );
    }
    if (!startDate) {
      setAllExcelSheetData(finalData);
    } else {
      const inputDate = new Date(startDate);

      finalData = secondaryData.filter((item) => {
        const itemDate = new Date(item.date);

        return itemDate.toLocaleDateString() === inputDate.toLocaleDateString();
      });
      if (!finalData[0]) {
        setVisibleData([]);
      } else {
        setAllExcelSheetData(finalData);
      }
      console.log(finalData);
    }
  }, [startDate, selectedCategory]);

  useEffect(() => {
    if (visibleData) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [visibleData]);
  return (
    // <section class="min-h-screen p-10 bg-[#F5F6F1]"><div class=" screen-size flex justify-between items-center flex-wrap gap-10 text-black"><div class=" shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)] rounded-3xl w-72 h-50 p-4 bg-white border-4 border-white cursor-pointer transition-all duration-50 hover:border-[#faf362] hover:border-4"><div class="bg-[#F58DC3] rounded-full my-8 w-24 h-24 center m-auto"><img class="w-13 h-16 object-cover" src="/src/assets/recruitment/recruitdash/local-cv.svg" alt="0 Icon not found"></div><h5 class="text-[18px] font-semibold text-center">Local CV</h5></div><div class=" shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)] rounded-3xl w-72 h-50 p-4 bg-white border-4 border-white cursor-pointer transition-all duration-50 hover:border-[#faf362] hover:border-4"><div class="bg-[#B1F094] rounded-full my-8 w-24 h-24 center m-auto"><img class="w-13 h-16 object-cover" src="/src/assets/recruitment/recruitdash/non-local-cv.svg" alt="1 Icon not found"></div><h5 class="text-[18px] font-semibold text-center">Non Local CV</h5></div><div class=" shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)] rounded-3xl w-72 h-50 p-4 bg-white border-4 border-white cursor-pointer transition-all duration-50 hover:border-[#faf362] hover:border-4"><div class="bg-[#BF91FF] rounded-full my-8 w-24 h-24 center m-auto"><img class="w-13 h-16 object-cover" src="/src/assets/recruitment/recruitdash/status.svg" alt="2 Icon not found"></div><h5 class="text-[18px] font-semibold text-center">Status</h5></div></div></section>
    <div
      className={`bg-[#fafaf6] h-screen border border-[#fafaf6] ${
        location.pathname === "/viewTimesheet" && "flex justify-center"
      } `}
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
          location.pathname === "/viewTimesheet" ? "w-[1000px]" : "screen-size"
        }  m-9`}
      >
        {/* <Link to="/timeSheet" className="text-[#0033ffe2]">
          Back
        </Link>
        <p className="text-xl font-medium py-6">View Time Sheet</p> */}
        <div className="m-5 flex justify-between">
          <div className="flex items-center">
            <Link
              to={`${
                location.pathname === "/viewTimesheet"
                  ? "/timeSheet"
                  : "/viewTimesheet"
              }`}
              className="text-xl flex-1 text-grey cursor-pointer"
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
            >
              <FaArrowLeft />
            </Link>
          </div>
          <header className="flex justify-center text_size_2 py-5 text-dark_grey ">
            <p>View Time Sheet</p>
          </header>
          <div></div>
        </div>
        {/* Original */}
        <div className="flex  justify-between items-center w-full">
          <div className="flex justify-start gap-4 ">
            <div className="relative grid grid-cols-1 ">
              <label className="text_size_6">Start Date</label>
              {/* <br /> */}
              <input
                type="date"
                value={startDate}
                className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {location.pathname !== "/viewTimesheet" && (
              <div className="relative grid grid-cols-1">
                <label className="text_size_6">End Date</label>
                {/* <br /> */}
                <input
                  type="date"
                  value={endDate}
                  className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4 mt-6">
            {location.pathname === "/viewTimesheet" && (
              <div className="relative grid grid-cols-1 ">
                <input
                  value={categoryFilter}
                  placeholder="Select type"
                  className="border border-[#D9D9D9] cursor-pointer rounded outline-none p-2 text-[#000000] text-sm"
                  onClick={() => {
                    setToggleClick(!toggleClick);
                  }}
                  readOnly
                />
                <span className="absolute right-2 top-2">
                  <FaAngleDown className="text-xl text-dark_grey" />
                </span>
                {toggleClick && (
                  <div
                    className="absolute border top-10 border-[#D9D9D9] mt-1 w-full text-[15px] text-dark_grey p-1 bg-white z-50"
                    onClick={() => {
                      setToggleClick(!toggleClick);
                    }}
                  >
                    {["Offshore", "HO", "SBW", "ORMC", "BLNG"].map(
                      (category) => (
                        <p
                          key={category}
                          className="hover:bg-secondary hover:text-white p-1 cursor-pointer"
                          onClick={() => {
                            // handleCategorySelect(category);
                            handleForSelectTSheet(category);
                            setLoading(true);
                          }}
                        >
                          {category}
                        </p>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
            {location.pathname !== "/viewTimesheet" && (
              <SearchBoxForTimeSheet
                placeholder={
                  categoryFilter === "BLNG"
                    ? "FID"
                    : categoryFilter === "Offshore"
                    ? "SUB ID"
                    : categoryFilter === "HO"
                    ? "Employee Id / Badge No"
                    : "Badge No."
                }
                searchResult={searchResult}
                allEmpDetails={data}
                secondaryData={data}
                Position="ViewTimeSheet"
              />
            )}
            {location.pathname === "/viewTimesheet" && (
              <FilterForTimeSheet
                handleFilterChange={handleFilterChange}
                toggleDropdown={toggleDropdown}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
        </div>
        {loading === true && (
          <div className="flex justify-center text_size_6">
            <p>Please wait few seconds...</p>
          </div>
        )}
        {/* {!visibleData &&(
          <div className="flex justify-center text_size_6">
            <p>No Table Data Available Here...</p>
          </div>
        )} */}

        <Outlet
          context={{
            allExcelSheetData,
            AllFieldData,
            categoryFilter,
            visibleData,
            handleScroll,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            newSearchFunction,
            finalSearchRes,
            searchQuery,
          }}
        />

        {/* {!loading && (
          <VTimeSheetTable
            AllFieldData={AllFieldData}
            categoryFilter={categoryFilter}
            data={visibleData}
            handleScroll={handleScroll}
          />
        )} */}
      </div>
    </div>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// import React, { useEffect, useMemo, useState } from "react";
// import { FaAngleDown } from "react-icons/fa";
// import { VTimeSheetTable } from "./VTimeSheetTable";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
// import { FilterForTimeSheet } from "./FilterForTimeSheet";
// import { useFetchData } from "./customTimeSheet/UseFetchData";
// import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
// import { useScrollableView } from "./customTimeSheet/useScrollableView";
// import { FaArrowLeft } from "react-icons/fa";
// import { listTimeSheets } from "../../graphql/queries";
// import { generateClient } from "@aws-amplify/api";
// const client = generateClient();

// export const ViewTimeSheet = () => {
//   const [newData, setNewData] = useState(null);
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [toggleClick, setToggleClick] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [data, setData] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [secondaryData, setSecondaryData] = useState(null);
//   const [allExcelSheetData, setAllExcelSheetData] = useState(null);
//   const [secondaryData, setSafeData] = useState(null);
//   const [finalSearchRes, setFinalSearchRes] = useState(null);
//   const location = useLocation();

//   const { handleScroll, visibleData, setVisibleData } = useScrollableView(
//     data,
//     "Manager"
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [listOfTimeSheet] = await Promise.all([
//           client.graphql({ query: listTimeSheets }),
//         ]);
//         const candidates = listOfTimeSheet?.data?.listTimeSheets?.items;

//         setAllExcelSheetData(candidates);
//         setSafeData(candidates);
//       } catch (err) {}
//     };
//     fetchData();
//   }, []);
//   const AllFieldData = useTableFieldData(categoryFilter);

//   // ####################################################
//   // ####################################################
//   const handleFilterChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const searchResult = (result) => {
//     setSearchQuery(result);
//     console.log(result);
//     // const k=  result.map((m)=>m.data);
//     //   console.log(k)
//     //   setSearchQuery(k);
//   };

//   const handleForSelectTSheet = (category) => {
//     setCategoryFilter(category);
//     if (category === "All Excel Sheet") {
//       setAllExcelSheetData(safeData);
//     } else {
//       const result = safeData.filter((fil) => fil.type === category);
//       setAllExcelSheetData(result);
//     }
//   };

//   const convertStringToObject = (fetchedData) => {
//     const processedData = fetchedData.map((item) => {
//       const rawSheet = item.dailySheet;
//       if (Array.isArray(rawSheet) && rawSheet.length > 0) {
//         const rawData = rawSheet[0];
//         const id = item.id;
//         const Status = item.status;

//         try {
//           const cleanedData = rawData
//             .replace(/^"|\s*'|\s*"$|\\'/g, "")
//             .replace(/\\"/g, '"')
//             .replace(/\\n/g, "")
//             .replace(/\\\//g, "/");
//           const arrayOfObjects = JSON.parse(cleanedData);
//           const dataWithStatus = arrayOfObjects.map((obj) => ({
//             ...obj,
//             status: Status,
//           }));
//           return [{ id: id }, dataWithStatus];
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//           return null;
//         }
//       }
//       return null;
//     });

//     const addProKey = processedData
//       .map((value) => ({
//         id: value[0]?.id,
//         data: value[1]?.filter(Boolean),
//       }))
//       .filter((item) => item.data?.length > 0);
//     setData(addProKey);
//     setSecondaryData(addProKey);
//   };
//   // All Excel Sheet Data
//   const newSearchFunction = (allData) => {
//     convertStringToObject([allData]);
//   };

//   useEffect(() => {
//     if (!safeData || safeData.length === 0) return;
//     let finalData = [...safeData];
//     if (selectedCategory !== "All") {
//       finalData = safeData.filter((item) => item.status === selectedCategory);
//     }
//     if (!startDate) {
//       setAllExcelSheetData(finalData);
//     } else {
//       const inputDate = new Date(startDate);

//       finalData = safeData.filter((item) => {
//         const itemDate = new Date(item.date);
//         console.log(itemDate.getDate(), " : ", inputDate.getDate());
//         return itemDate.toLocaleDateString() === inputDate.toLocaleDateString();
//       });

//       setAllExcelSheetData(finalData);
//     }
//   }, [startDate, selectedCategory]);
//   return (
//     // <section class="min-h-screen p-10 bg-[#F5F6F1]"><div class=" screen-size flex justify-between items-center flex-wrap gap-10 text-black"><div class=" shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)] rounded-3xl w-72 h-50 p-4 bg-white border-4 border-white cursor-pointer transition-all duration-50 hover:border-[#faf362] hover:border-4"><div class="bg-[#F58DC3] rounded-full my-8 w-24 h-24 center m-auto"><img class="w-13 h-16 object-cover" src="/src/assets/recruitment/recruitdash/local-cv.svg" alt="0 Icon not found"></div><h5 class="text-[18px] font-semibold text-center">Local CV</h5></div><div class=" shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)] rounded-3xl w-72 h-50 p-4 bg-white border-4 border-white cursor-pointer transition-all duration-50 hover:border-[#faf362] hover:border-4"><div class="bg-[#B1F094] rounded-full my-8 w-24 h-24 center m-auto"><img class="w-13 h-16 object-cover" src="/src/assets/recruitment/recruitdash/non-local-cv.svg" alt="1 Icon not found"></div><h5 class="text-[18px] font-semibold text-center">Non Local CV</h5></div><div class=" shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)] rounded-3xl w-72 h-50 p-4 bg-white border-4 border-white cursor-pointer transition-all duration-50 hover:border-[#faf362] hover:border-4"><div class="bg-[#BF91FF] rounded-full my-8 w-24 h-24 center m-auto"><img class="w-13 h-16 object-cover" src="/src/assets/recruitment/recruitdash/status.svg" alt="2 Icon not found"></div><h5 class="text-[18px] font-semibold text-center">Status</h5></div></div></section>
//     <div
//       className={`bg-[#fafaf6] h-screen border border-[#fafaf6] ${
//         location.pathname === "/viewTimesheet" && "flex justify-center"
//       } `}
//     >
//       <div
//         className={`${
//           location.pathname === "/viewTimesheet" ? "w-[1000px]" : "screen-size"
//         }  m-9`}
//       >
//         {/* <Link to="/timeSheet" className="text-[#0033ffe2]">
//           Back
//         </Link>
//         <p className="text-xl font-medium py-6">View Time Sheet</p> */}
//         <div className="m-5 flex justify-between">
//           <div className=" flex items-center">
//             <Link to="/timeSheet" className="text-xl flex-1 text-grey">
//               <FaArrowLeft />
//             </Link>
//           </div>
//           <header className="flex justify-center text_size_2 py-5 text-dark_grey ">
//             <p>View Time Sheet</p>
//           </header>
//           <div></div>
//         </div>
//         {/* Original */}
//         <div className="flex  justify-between items-center w-full">
//           <div className="flex justify-start gap-4 ">
//             <div className="relative grid grid-cols-1 ">
//               <label className="text_size_6">Start Date</label>
//               {/* <br /> */}
//               <input
//                 type="date"
//                 className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </div>
//             {location.pathname !== "/viewTimesheet" && (
//               <div className="relative grid grid-cols-1">
//                 <label className="text_size_6">End Date</label>
//                 {/* <br /> */}
//                 <input
//                   type="date"
//                   className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="flex justify-end gap-4 mt-6">
//             {location.pathname === "/viewTimesheet" && (
//               <div className="relative grid grid-cols-1 ">
//                 <input
//                   value={categoryFilter}
//                   placeholder="Select type"
//                   className="border border-[#D9D9D9] cursor-pointer rounded outline-none p-2 text-[#000000] text-sm"
//                   onClick={() => {
//                     setToggleClick(!toggleClick);
//                   }}
//                   readOnly
//                 />
//                 <span className="absolute right-2 top-2">
//                   <FaAngleDown className="text-xl text-dark_grey" />
//                 </span>
//                 {toggleClick && (
//                   <div
//                     className="absolute border top-10 border-[#D9D9D9] mt-1 w-full text-[15px] text-dark_grey p-1 bg-white z-50"
//                     onClick={() => {
//                       setToggleClick(false);
//                     }}
//                   >
//                     {[
//                       "All Excel Sheet",
//                       "Offshore",
//                       "HO",
//                       "SBW",
//                       "ORMC",
//                       "BLNG",
//                     ].map((category) => (
//                       <p
//                         key={category}
//                         className="hover:bg-secondary hover:text-white p-1 cursor-pointer"
//                         onClick={() => {
//                           // handleCategorySelect(category);
//                           handleForSelectTSheet(category);
//                           setLoading(!loading);
//                         }}
//                       >
//                         {category}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//             {location.pathname !== "/viewTimesheet" && (
//               <SearchBoxForTimeSheet
//                 placeholder={
//                   categoryFilter === "BLNG"
//                     ? "FID"
//                     : categoryFilter === "Offshore"
//                     ? "SUB ID"
//                     : categoryFilter === "HO"
//                     ? "Employee Id"
//                     : "BADGE NO"
//                 }
//                 searchResult={searchResult}
//                 allEmpDetails={data}
//                 secondaryData={secondaryData}
//                 Position="ViewTimeSheet"
//               />
//             )}
//             {location.pathname === "/viewTimesheet" && (
//               <FilterForTimeSheet handleFilterChange={handleFilterChange} />
//             )}
//           </div>
//         </div>
//         <Outlet
//           context={{
//             allExcelSheetData,
//             AllFieldData,
//             categoryFilter,
//             visibleData,
//             handleScroll,
//             startDate,
//             setStartDate,
//             endDate,
//             setEndDate,
//             newSearchFunction,
//             finalSearchRes,
//             searchQuery,
//           }}
//         />

//         {/* {!loading && (
//           <VTimeSheetTable
//             AllFieldData={AllFieldData}
//             categoryFilter={categoryFilter}
//             data={visibleData}
//             handleScroll={handleScroll}
//           />
//         )} */}
//       </div>
//     </div>
//   );
// };
