import React from "react";

import { useTempID } from "../../../utils/TempIDContext";
import { FaAngleDown } from "react-icons/fa";
import { SearchDisplayForTimeSheet } from "../timeSheetSearch/SearchDisplayForTS";
import { SearchBoxForTimeSheet } from "../../../utils/SearchBoxForTimeSheet";

export const ViewSummaryFilterData = ({
  LocationData,
  secondaryData,
  data,
  searchResult,
}) => {
  const { setStartDate, setEndDate, setSelectedLocation } = useTempID();
  const selectLocationFunc = async (data) => {
    if (data.location) {
      setSelectedLocation(data.location);
    }
  };


  return (
    <div className="flex  justify-between items-center w-full mb-5">
      <div className="flex justify-start gap-4 ">
        <div className="relative grid grid-cols-1 ">
          <label className="text_size_6">Start Date</label>

          <input
            type="date"
            className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="relative grid grid-cols-1 ">
          <label className="text_size_6">End Date</label>

          <input
            type="date"
            className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <div className="relative grid grid-cols-1 ">
          <SearchDisplayForTimeSheet
            newFormData={LocationData}
            searchResult={selectLocationFunc}
            placeholder="Search Location"
            rounded="rounded"
            searchIcon2={<FaAngleDown />}
          />
        </div>

        <SearchBoxForTimeSheet
          allEmpDetails={data}
          searchResult={searchResult}
          secondaryData={secondaryData}
          placeholder="SAP ID / BADGE"
          Position="viewSummary"
        />
      </div>
    </div>
  );
};
