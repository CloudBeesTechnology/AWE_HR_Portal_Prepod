import React from "react";

import { useTempID } from "../../../utils/TempIDContext";

import { SearchDisplayForTimeSheet } from "../timeSheetSearch/SearchDisplayForTS";
import { SearchBoxForTimeSheet } from "../../../utils/SearchBoxForTimeSheet";
import { FiSearch } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import SelectOffshoreType from "../timeSheetSearch/SelectOffshoreType";

export const ViewSummaryFilterData = ({
  LocationData,
  secondaryData,
  data,
  searchResult,
  //   setEmptyTableMess
  resetTableFunc,
  empPIData,
  setRefreshTrigger,
}) => {
  const {
    setStartDate,
    startDate,
    setEndDate,
    endDate,
    setSelectedLocation,
    setOffshoreType,
    setSelectSapNoOrBadgeNo,
  } = useTempID();
  const selectLocationFunc = async (data) => {
    resetTableFunc();
    if (data.location) {
      setSelectedLocation(data.location);
    }
  };

  const selectSapNoOrBadgeNo = async (data) => {
    resetTableFunc();
    if (data) {
      setSelectSapNoOrBadgeNo(data);
    }
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;

    const dateParts = value.split("-");
    if (
      dateParts.length === 3 &&
      dateParts[0].length === 4 &&
      dateParts[1].length === 2 &&
      dateParts[2].length === 2 &&
      dateParts[0].startsWith("2")
    ) {
      const formattedDate = new Date(value); // Directly use the input value as a date
      if (!isNaN(formattedDate.getTime())) {
        const year = formattedDate.getFullYear();
        const month = (formattedDate.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        const day = formattedDate.getDate().toString().padStart(2, "0");
        const newDate = `${year}-${month}-${day}`;
        setStartDate(newDate);
      }
    }
  };

  const handleTypeSelect = (value) => {
    if (value) {
      setOffshoreType(value);
    }
  };

  return (
    <div className="flex  justify-between items-center w-full mb-5">
      <div className="flex justify-start gap-4 ">
        <div className="relative grid grid-cols-1 ">
          <label className="text_size_6">Start Date</label>

          <input
            type="date"
            className="border border-[#D9D9D9]  text_size_6 rounded outline-none p-2 text-[#252525] text-sm"
            onChange={handleStartDateChange}
          />
        </div>
        <div className="relative grid grid-cols-1 ">
          <label className="text_size_6">End Date</label>

          <input
            type="date"
            className="border border-[#D9D9D9]  text_size_6 rounded outline-none p-2 text-[#252525] text-sm"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <div className="relative grid grid-cols-1 ">
          <SearchDisplayForTimeSheet
            newFormData={LocationData}
            searchResult={selectLocationFunc}
            placeholder="Location"
            rounded="rounded"
            searchIcon2={<FiSearch />}
            identify="viewSummary"
            setSelectedLocation={setSelectedLocation}
            setRefreshTrigger={setRefreshTrigger}
          />
        </div>

        <SelectOffshoreType
          options={["All", "Direct", "Indirect"]}
          handleTypeSelect={handleTypeSelect}
        />
        {/* 
        <SearchBoxForTimeSheet
          allEmpDetails={data}
          searchResult={searchResult}
          secondaryData={secondaryData}
          placeholder="SAP ID / BADGE"
          Position="viewSummary"
          empPIData={empPIData}
        /> */}

        <SearchDisplayForTimeSheet
          newFormData={empPIData}
          searchResult={selectSapNoOrBadgeNo}
          placeholder="Sap No / Badge No / Name"
          rounded="rounded"
          searchIcon1={<IoSearch />}
          identify="VS_SapNo_BadgeNo"
          setRefreshTrigger={setRefreshTrigger}
        />
      </div>
    </div>
  );
};
