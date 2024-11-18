import React, { useState } from "react";

import { FaAngleDown } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";
import { VTimeSheetTable } from "./VTimeSheetTable";
import { Link } from "react-router-dom";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { FilterForTimeSheet } from "./FilterForTimeSheet";
export const ViewTimeSheet = (
  {
    // searchAllEmployee,
    // arrayOfObjects,
    // emptySearch,
  }
) => {
  const [categoryFilter, setCategoryFilter] = useState("Select type");
  const [toggleClick, setToggleClick] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const arrayOfObjects = [
    {
      employeeId: 1,
      employeeName: "Bueno Jr, Danilo",
      "Sub ID": "261451",
      Loction: "Third Party Services",
      "Start Date": "16/7/2024",
      "End Date": "16/7/2024",
      "IN Time": "8.00",
      "Out Time": "4.00",
      "Total NT": "8.00",
      "Total OT": "4.00",
    },
    {
      employeeId: 2,
      employeeName: "Abdul Razak, Muhammad Muhaimin",
      "Sub ID": "261451",
      Loction: "Third Party Services",
      "Start Date": "16/7/2024",
      "End Date": "16/7/2024",
      "IN Time": "8.00",
      "Out Time": "4.00",
      "Total NT": "8.00",
      "Total OT": "4.00",
    },
    {
      employeeId: 3,
      employeeName: "Abdullah, Mohammad Norakmalluddin",
      "Sub ID": "261452",
      Loction: "Third Party Services",
      "Start Date": "16/7/2024",
      "End Date": "16/7/2024",
      "IN Time": "8.00",
      "Out Time": "4.00",
      "Total NT": "8.00",
      "Total OT": "4.00",
    },
    {
      employeeId: 4,
      employeeName: "Smith, John",
      "Sub ID": "261452",
      Loction: "Third Party Services",
      "Start Date": "16/7/2024",
      "End Date": "16/7/2024",
      "IN Time": "8.00",
      "Out Time": "4.00",
      "Total NT": "8.00",
      "Total OT": "4.00",
    },
    {
      employeeId: 5,
      employeeName: "Doe, Jane",
      "Sub ID": "261453",
      Loction: "Third Party Services",
      "Start Date": "16/7/2024",
      "End Date": "16/7/2024",
      "IN Time": "8.00",
      "Out Time": "4.00",
      "Total NT": "8.00",
      "Total OT": "4.00",
    },
  ];

  const [data, setData] = useState(arrayOfObjects);
  const searchResult = (result) => {
    setData(result);
    console.log(result);
  };
  return (
    <div className="border border-white">
      <div className="screen-size mt-9">
        <Link to="/timeSheet" className="text-[#0033ffe2]">
          Back
        </Link>
        <p className="text-xl font-medium py-6">View Time Sheet</p>
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start items-center gap-4 ">
            <div className="relative">
              <label htmlFor="" className="text_size_6">
                Start Date
              </label>
              <br />
              <input
                type="text"
                placeholder="Start Date"
                className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm "
              />
              <span className="absolute right-2 top-8">
                <SlCalender className="text-xl text-dark_grey" />
              </span>
            </div>
            <div className="relative">
              <label htmlFor="" className="text_size_6">
                End Date
              </label>
              <br />
              <input
                type="text"
                placeholder="End Date"
                className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm "
              />
              <span className="absolute right-2 top-8">
                <SlCalender className="text-xl text-dark_grey" />
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6  ">
            <div className="relative">
              <div className="relative ">
                <input
                  value={categoryFilter}
                  htmlFor="filter"
                  placeholder="Select type"
                  className="border border-[#D9D9D9] cursor-pointer rounded outline-none p-2 text-[#000000] text-sm "
                  onClick={() => {
                    setToggleClick(true);
                  }}
                  onChange={() => {}}
                />
                <span className="absolute right-2 top-2">
                  <FaAngleDown className="text-xl text-dark_grey" />
                </span>
              </div>
              {toggleClick && (
                <div
                  className="filter absolute border border-[#D9D9D9] mt-1 w-full text-[16px] p-1 bg-white"
                  onClick={() => {
                    setToggleClick(false);
                  }}
                >
                  <p
                    className="hover:bg-secondary hover:text-white p-1 cursor-pointer"
                    onClick={() => {
                      setCategoryFilter("Onshore");
                    }}
                  >
                    Onshore
                  </p>
                  <p
                    className="hover:bg-secondary hover:text-white p-1 cursor-pointer"
                    onClick={() => {
                      setCategoryFilter("Offshore");
                    }}
                  >
                    Offshore
                  </p>
                  <p
                    className="hover:bg-secondary hover:text-white p-1 cursor-pointer"
                    onClick={() => {
                      setCategoryFilter("BLNG");
                    }}
                  >
                    BLNG
                  </p>
                </div>
              )}
            </div>
            <SearchBoxForTimeSheet
              excelData={arrayOfObjects}
              searchResult={searchResult}
            />
            <FilterForTimeSheet />
          </div>
        </div>
        <VTimeSheetTable afterSearch={data} />
      </div>
    </div>
  );
};
