
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { FilterForTimeSheet } from "./FilterForTimeSheet";
import { useFetchData } from "./customTimeSheet/UseFetchData";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { FaArrowLeft } from "react-icons/fa";
import { generateClient } from "@aws-amplify/api";
import { UseScrollableView } from "./customTimeSheet/UseScrollableView";
import { ListTimeSheet } from "./ListTimeSheet";
import { useTempID } from "../../utils/TempIDContext";

const client = generateClient();

export const ViewTimeSheet = () => {
  const prevCategoryRef = useRef(null);

  const [categoryFilter, setCategoryFilter] = useState("BLNG");
  const [toggleClick, setToggleClick] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [secondaryData, setSecondaryData] = useState(null);
  const [allExcelSheetData, setAllExcelSheetData] = useState(null);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { convertedStringToArrayObj } = useFetchData(
    categoryFilter,
    "viewTimeSheet"
  );
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchQuery,
    setSearchQuery,
    showListTimeSheet,
    setShowListTimeSheet,
  } = useTempID();
  const { handleScroll, visibleData, setVisibleData } = UseScrollableView(
    allExcelSheetData,
    "TimeKeeper"
  );

  useEffect(() => {
    function groupByUpdatedAt(data) {
      const groupedData = {};

      data.forEach((item) => {
        const updatedAtDate = item.updatedAt.split("T")[0];
        const status = item.status.includes("Pending");

        if (!groupedData[updatedAtDate]) {
          groupedData[updatedAtDate] = {
            fileName: item.fileName,
            fileType: item.fileType,
            date: updatedAtDate,
            status: status === true ? "Pending" : "Approved",
            updatedAt: [],
          };
        }

        groupedData[updatedAtDate].updatedAt.push(item);
      });

      return Object.values(groupedData);
    }

    const groupedData = groupByUpdatedAt(convertedStringToArrayObj);
    setAllExcelSheetData(groupedData);
    setSecondaryData(groupedData);
  }, [convertedStringToArrayObj]);

  // const AllFieldData = useTableFieldData(categoryFilter);

  useEffect(() => {
    if (!secondaryData || secondaryData.length === 0) return;

    let filteredData = [...secondaryData];

    if (selectedCategory !== "All") {
      filteredData = filteredData.filter(
        (item) => item.status === selectedCategory
      );
    }

    if (startDate) {
      const inputDate = new Date(startDate).toLocaleDateString();

      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date).toLocaleDateString();
        return itemDate === inputDate;
      });
    }

    if (filteredData.length > 0) {
      setAllExcelSheetData(filteredData);
    } else {
      setVisibleData([]);
      setMessage("No matching results found.");
    }
  }, [secondaryData, startDate, selectedCategory]);

  useEffect(() => {
    if (visibleData) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [visibleData]);

  const handleFilterChange = (category) => {
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
    setData(allData.updatedAt);
  }, []);

  console.log(showListTimeSheet);
  return (
    <div
      className={`bg-[#fafaf6] ${showListTimeSheet && "h-screen"} border border-[#fafaf6] flex justify-center `}
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
        className={`${showListTimeSheet ? "w-[1300px]" : " screen-size"} m-9`}
      >
        <div className="flex items-center w-full">
          <Link
            to={`${showListTimeSheet ? "/timeSheet" :"/viewTimesheet"}`}
            className="text-xl text-grey cursor-pointer w-1/15 flex items-center"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setShowListTimeSheet(true)
            }}
          >
            <FaArrowLeft />
          </Link>

          <header className="text_size_2 py-5 flex-grow text-dark_grey text-center">
            <p>View Time Sheet</p>
          </header>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start gap-4">
            <div className="relative grid grid-cols-1">
              <label className="text_size_6">Start Date</label>
              <input
                type="date"
                value={startDate}
                className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {!showListTimeSheet && (
              <div className="relative grid grid-cols-1">
                <label className="text_size_6">End Date</label>
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
            <div
              className={`${
                !showListTimeSheet ? "hidden" : "relative grid grid-cols-1"
              }`}
            >
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
                  {["Offshore", "HO", "SBW", "ORMC", "BLNG"].map((category) => (
                    <p
                      key={category}
                      className={`p-1 cursor-pointer ${
                        prevCategoryRef.current === category
                          ? "bg-secondary border text-white"
                          : "hover:bg-grey hover:text-white"
                      }`}
                      onClick={() => {
                        if (category !== prevCategoryRef.current) {
                          setLoading(true);
                          handleForSelectTSheet(category);

                          setAllExcelSheetData(null);
                          setSecondaryData(null);
                          setVisibleData([]);

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
                placeholder="Search"
                searchResult={searchResult}
                allEmpDetails={data}
                secondaryData={data}
                Position="ViewTimeSheet"
              />
            )}
             {showListTimeSheet && (
            <FilterForTimeSheet
              handleFilterChange={handleFilterChange}
              toggleDropdown={toggleDropdown}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
             )}
          </div>
        </div>

        {/* {loading && (
          <div className="flex justify-center text_size_6">
            <p>Please wait a few seconds...</p>
          </div>
        )} */}
        {showListTimeSheet && (
          <ListTimeSheet
            visibleData={visibleData}
            newSearchFunction={newSearchFunction}
            message={message}
          />
        )}

        {/* <div>
          <VTimeSheetTable
            AllFieldData={AllFieldData}
            categoryFilter={categoryFilter}
            data={visibleData}
            handleScroll={handleScroll}
          />
        </div> */}
      </div>
    </div>
  );
};
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
