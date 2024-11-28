// import React, { useCallback, useEffect, useMemo, useState } from "react";

// import { FaAngleDown } from "react-icons/fa";
// import { SlCalender } from "react-icons/sl";
// import { FiSearch } from "react-icons/fi";
// import { VTimeSheetTable } from "./VTimeSheetTable";
// import { Link } from "react-router-dom";
// import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
// import { FilterForTimeSheet } from "./FilterForTimeSheet";
// import { listBlngs } from "../../graphql/queries";
// import { generateClient } from "@aws-amplify/api";
// import { useFetchData } from "./customTimeSheet/UseFetchData";
// import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
// const client = generateClient();

// export const ViewTimeSheet = (
//   {
//     // searchAllEmployee,
//     // arrayOfObjects,
//     // emptySearch,
//   }
// ) => {
//   const [categoryFilter, setCategoryFilter] = useState("BLNG");
//   const [toggleClick, setToggleClick] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [data, setData] = useState(null);
//   const { convertedStringToArrayObj } = useFetchData(categoryFilter);
//   const AllFieldData = useTableFieldData(categoryFilter);

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const [tableHeaderName, setTableHeaderName] = useState(null);
//   const [loading, setLoading] = useState(null);
//   const [secondaryData, setSecondaryData] = useState(null);

//   useEffect(() => {
//     const returnedData = async () => {
//       setTableHeaderName(AllFieldData.tableHeader);
//     };

//     return () => {
//       returnedData();
//     };
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       console.log(convertedStringToArrayObj);
//       try {
//         const dataPromise = new Promise((resolve, reject) => {
//           if (convertedStringToArrayObj) {
//             resolve(convertedStringToArrayObj);
//           } else {
//             setTimeout(() => {
//               // reject("No data found after waiting.");
//             }, 5000);
//           }
//         });
//         const fetchedData = await dataPromise;
//         // console.log(fetchedData);
//         const filterTheData = fetchedData
//           ?.map((value) => ({
//             id: value[0]?.id,
//             data: value[1]?.filter((val) => val),
//           }))
//           .filter((item) => item.data && item.data.length > 0);

//         // console.log(filterPending);

//         setData(filterTheData);
//         setSecondaryData(filterTheData);
//       } catch (err) {
//         console.log("ERROR");
//       } finally {
//         setTimeout(() => {
//           setLoading(false);
//         }, 1000);
//       }
//     };

//     fetchData();
//   }, [convertedStringToArrayObj]);

//   // For Filter Pending, Approved, All
//   useEffect(() => {
//     if (secondaryData && secondaryData.length > 0) {
//       if (selectedCategory === "All") {
//         console.log("i am still here");
//         // Show all data
//         setData(secondaryData);
//       } else {
//         console.log("i am in P,A");
//         // Filter data based on the selected category
//         const result = secondaryData
//           ?.map((vals) => ({
//             id: vals?.id || null,
//             data:
//               vals?.data?.filter((val) => val.status === selectedCategory) ||
//               [],
//           }))
//           .filter((item) => item.data && item.data.length > 0);

//         setData(result);
//         setLoading(false);
//       }
//     }
//   }, [selectedCategory, secondaryData]);

//   useEffect(() => {
//     if (startDate && endDate && secondaryData && secondaryData.length > 0) {
//       const result = secondaryData
//         .map((vals) => ({
//           id: vals?.id || null,
//           data: vals?.data?.filter((val) => {
//             const itemDate = new Date(val.date || val.entDate)
//               .toLocaleDateString()
//               .toString();

//             const start = new Date(startDate).toLocaleDateString().toString();
//             const end = new Date(endDate).toLocaleDateString().toString();

//             return itemDate >= start && itemDate <= end;
//           }),
//         }))
//         .filter((item) => item.data && item.data.length > 0);
//       setData(result);

//       setLoading(false);
//     } else {
//       setData(secondaryData);
//       setLoading(false);
//     }
//   }, [secondaryData, startDate, endDate]);
//   const searchResult = (result) => {
//     setData(result);
//     setSecondaryData(result);
//   };

//   // For Filter
//   const handleFilterChange = (category) => {
//     setSelectedCategory(category);
//   };
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { VTimeSheetTable } from "./VTimeSheetTable";
import { Link } from "react-router-dom";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { FilterForTimeSheet } from "./FilterForTimeSheet";
import { useFetchData } from "./customTimeSheet/UseFetchData";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { useScrollableView } from "./customTimeSheet/UseScrollableView";

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

  const { convertedStringToArrayObj } = useFetchData(categoryFilter);
  const AllFieldData = useTableFieldData(categoryFilter);
  // const { handleScroll, visibleData } = useScrollableView(data, "Manager");
  // Fetch and set the initial data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       if (convertedStringToArrayObj) {
  //         const processedData = convertedStringToArrayObj
  //           .map((value) => ({
  //             id: value[0]?.id,
  //             data: value[1]?.filter((val) => val),
  //           }))
  //           .filter((item) => item.data && item.data.length > 0);

  //         setData(processedData);
  //         setSecondaryData(processedData);
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching data", err);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [categoryFilter, convertedStringToArrayObj, loading]);
  useEffect(() => {
    // if (!convertedStringToArrayObj) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const processedData = convertedStringToArrayObj
          .map((value) => ({
            id: value[0]?.id,
            data: value[1]?.filter(Boolean),
          }))
          .filter((item) => item.data?.length > 0);

        setData(processedData);
        setSecondaryData(processedData);
      } catch (error) {
        console.error("Error processing data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryFilter, convertedStringToArrayObj]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log(convertedStringToArrayObj);
  //     try {
  //       const dataPromise = new Promise((resolve, reject) => {
  //         if (convertedStringToArrayObj) {
  //           resolve(convertedStringToArrayObj);
  //         } else {
  //           setTimeout(() => {
  //             // reject("No data found after waiting.");
  //           }, 5000);
  //         }
  //       });
  //       const fetchedData = await dataPromise;
  //       // console.log(fetchedData);
  //       const filterTheData = fetchedData
  //         ?.map((value) => ({
  //           id: value[0]?.id,
  //           data: value[1]?.filter((val) => val),
  //         }))
  //         .filter((item) => item.data && item.data.length > 0);

  //       // console.log(filterPending);

  //       setData(filterTheData);
  //       setSecondaryData(filterTheData);
  //     } catch (err) {
  //       console.log("ERROR");
  //     } finally {
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     }
  //   };
  //   fetchData();
  // }, [categoryFilter, convertedStringToArrayObj]);
  // Unified filtering logic
  useEffect(() => {
    if (!secondaryData) return;
    // try {
    if (secondaryData && secondaryData.length > 0) {
      let filteredData = [...secondaryData];

      // Apply search query filter
      if (searchQuery) {
        filteredData = searchQuery.filter((fil) => fil);
      }

      // Apply category filter
      if (selectedCategory !== "All") {
        filteredData = filteredData.map((item) => ({
          id: item.id,
          data: item.data.filter((val) => val.status === selectedCategory),
        }));
      }

      // Apply date range filter
      if (startDate && endDate) {
        const start = new Date(startDate).toLocaleDateString().toString();
        const end = new Date(endDate).toLocaleDateString().toString();
        filteredData = filteredData.map((item) => ({
          id: item.id,
          data: item.data.filter((val) => {
            const itemDate = new Date(val.date || val.entDate)
              .toLocaleDateString()
              .toString();
            return itemDate >= start && itemDate <= end;
          }),
        }));
      }

      // Remove empty data sets
      filteredData = filteredData.filter((item) => item.data.length > 0);
      console.log(filteredData);
      setData(filteredData);
    }
    setLoading(false);
    console.log("Working");
    // } catch (err) {
    //   console.log("ERROR : ", err);
    // }
  }, [
    searchQuery,
    selectedCategory,
    startDate,
    endDate,
    secondaryData,
    loading,
  ]);

  // Event handlers
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const searchResult = (result) => {
    setSearchQuery(result);
    console.log(result);
  };

  const handleCategorySelect = (category) => {
    setCategoryFilter(category);
    setSearchQuery("");
    setSelectedCategory("All");
    setStartDate("");
    setEndDate("");
  };

  // return (
  //   <div className="border border-white">
  //     <div className="screen-size mt-9">
  //       <Link to="/timeSheet" className="text-[#0033ffe2]">
  //         Back
  //       </Link>
  //       <p className="text-xl font-medium py-6">View Time Sheet</p>
  //       <div className="flex justify-between items-center w-full">
  //         <div className="flex justify-start items-center gap-4 ">
  //           <div className="relative">
  //             <label htmlFor="" className="text_size_6">
  //               Start Date
  //             </label>
  //             <br />
  //             <input
  //               type="date"
  //               placeholder="Start Date"
  //               className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
  //               onChange={(e) => setStartDate(e.target.value)}
  //             />
  //             {/* <span className="absolute right-2 top-8">
  //               <SlCalender className="text-xl text-dark_grey" />
  //             </span> */}
  //           </div>

  //           <div className="relative">
  //             <label htmlFor="" className="text_size_6">
  //               End Date
  //             </label>
  //             <br />
  //             <input
  //               type="date"
  //               placeholder="End Date"
  //               className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm "
  //               onChange={(e) => setEndDate(e.target.value)}
  //             />
  //             {/* <span className="absolute right-2 top-8">
  //               <SlCalender className="text-xl text-dark_grey" />
  //             </span> */}
  //           </div>
  //         </div>
  //         <div className="flex justify-end gap-4 mt-6  ">
  //           <div className="relative">
  //             <div className="relative ">
  //               <input
  //                 value={categoryFilter}
  //                 htmlFor="filter"
  //                 placeholder="Select type"
  //                 className="border border-[#D9D9D9] cursor-pointer rounded outline-none p-2 text-[#000000] text-sm "
  //                 onClick={() => {
  //                   setToggleClick(!toggleClick);
  //                 }}
  //                 readOnly
  //               />
  //               <span className="absolute right-2 top-2">
  //                 <FaAngleDown className="text-xl text-dark_grey" />
  //               </span>
  //             </div>
  //             {toggleClick && (
  //               <div
  //                 className="filter absolute border border-[#D9D9D9] mt-1 w-full text-[15px] text-dark_grey p-1 bg-white z-50"
  //                 onClick={() => setToggleClick(false)}
  //               >
  //                 {["Offshore", "HO", "SBW", "ORMC", "BLNG"].map((category) => (
  //                   <p
  //                     key={category}
  //                     className="hover:bg-secondary hover:text-white p-1 cursor-pointer"
  //                     onClick={() => {
  //                       setCategoryFilter(category);
  //                       setLoading(true);
  //                     }}
  //                   >
  //                     {category}
  //                   </p>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //           <SearchBoxForTimeSheet
  //             // excelData={arrayOfObjects}
  //             placeholder={
  //               categoryFilter === "BLNG"
  //                 ? "FID"
  //                 : categoryFilter === "Offshore"
  //                 ? "SUB ID"
  //                 : categoryFilter === "HO"
  //                 ? "Employee Id"
  //                 : "BADGE NO"
  //             }
  //             searchResult={searchResult}
  //             allEmpDetails={data}
  //             secondaryData={secondaryData}
  //           />
  //           <FilterForTimeSheet handleFilterChange={handleFilterChange} />
  //         </div>
  //       </div>
  //       <article className="flex justify-center item-center text-dark_grey text_size_5">
  //         {loading === true && (
  //           <div className="mt-2">
  //             <p>Loading....</p>
  //           </div>
  //         )}
  //       </article>
  //       <VTimeSheetTable
  //         AllFieldData={AllFieldData}
  //         categoryFilter={categoryFilter}
  //         data={data}
  //         loading={loading}
  //       />
  //     </div>
  //   </div>
  // );
  return (
    // <section class="min-h-screen p-10 bg-[#F5F6F1]"><div class=" screen-size flex justify-between items-center flex-wrap gap-10 text-black"><div class=" shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)] rounded-3xl w-72 h-50 p-4 bg-white border-4 border-white cursor-pointer transition-all duration-50 hover:border-[#faf362] hover:border-4"><div class="bg-[#F58DC3] rounded-full my-8 w-24 h-24 center m-auto"><img class="w-13 h-16 object-cover" src="/src/assets/recruitment/recruitdash/local-cv.svg" alt="0 Icon not found"></div><h5 class="text-[18px] font-semibold text-center">Local CV</h5></div><div class=" shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)] rounded-3xl w-72 h-50 p-4 bg-white border-4 border-white cursor-pointer transition-all duration-50 hover:border-[#faf362] hover:border-4"><div class="bg-[#B1F094] rounded-full my-8 w-24 h-24 center m-auto"><img class="w-13 h-16 object-cover" src="/src/assets/recruitment/recruitdash/non-local-cv.svg" alt="1 Icon not found"></div><h5 class="text-[18px] font-semibold text-center">Non Local CV</h5></div><div class=" shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)] rounded-3xl w-72 h-50 p-4 bg-white border-4 border-white cursor-pointer transition-all duration-50 hover:border-[#faf362] hover:border-4"><div class="bg-[#BF91FF] rounded-full my-8 w-24 h-24 center m-auto"><img class="w-13 h-16 object-cover" src="/src/assets/recruitment/recruitdash/status.svg" alt="2 Icon not found"></div><h5 class="text-[18px] font-semibold text-center">Status</h5></div></div></section>
    <div className="bg-[#fafaf6] h-screen border border-[#fafaf6]">
      <div className="screen-size m-9 ">
        <Link to="/timeSheet" className="text-[#0033ffe2]">
          Back
        </Link>
        <p className="text-xl font-medium py-6">View Time Sheet</p>
        {/* Original */}
        <div className="flex  justify-between items-center w-full">
          <div className="flex justify-start gap-4 ">
            <div className="relative grid grid-cols-1 ">
              <label className="text_size_6">Start Date</label>
              {/* <br /> */}
              <input
                type="date"
                className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="relative grid grid-cols-1">
              <label className="text_size_6">End Date</label>
              {/* <br /> */}
              <input
                type="date"
                className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
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
                    setToggleClick(false);
                  }}
                >
                  {["Offshore", "HO", "SBW", "ORMC", "BLNG"].map((category) => (
                    <p
                      key={category}
                      className="hover:bg-secondary hover:text-white p-1 cursor-pointer"
                      onClick={() => {
                        handleCategorySelect(category);
                        setLoading(!loading);
                      }}
                    >
                      {category}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <SearchBoxForTimeSheet
              placeholder={
                categoryFilter === "BLNG"
                  ? "FID"
                  : categoryFilter === "Offshore"
                  ? "SUB ID"
                  : categoryFilter === "HO"
                  ? "Employee Id"
                  : "BADGE NO"
              }
              searchResult={searchResult}
              allEmpDetails={data}
              secondaryData={secondaryData}
              Position="ViewTimeSheet"
            />
            <FilterForTimeSheet handleFilterChange={handleFilterChange} />
          </div>
        </div>

        {!loading && (
          <VTimeSheetTable
            AllFieldData={AllFieldData}
            categoryFilter={categoryFilter}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
