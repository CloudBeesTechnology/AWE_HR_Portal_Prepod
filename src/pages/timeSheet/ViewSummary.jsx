import { useTempID } from "../../utils/TempIDContext";
import {
  dummyHolidayList,
  dummyLeaveStatus,
  LocationData,
} from "./customTimeSheet/JobcodeAndLocation";
import { UseFetchDataForSummary } from "./customTimeSheet/UseFetchDataForSummary";
import { ApplyVSFunction } from "./viewSummarySheets/ApplyVSFunction";
import { ViewSummaryTable } from "./viewSummarySheets/ViewSummaryTable";

import { useCallback, useEffect, useState } from "react";
export const ViewSummary = () => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);

  const {
    startDate,
    endDate,
    selectedLocation,
    getStartDate,
    setGetStartDate,
    getEndDate,
    setGetEndDate,
  } = useTempID();

  const { convertedStringToArrayObj } = UseFetchDataForSummary(
    startDate,
    endDate,
    selectedLocation
  );

  useEffect(() => {
    if (startDate) {
      setGetStartDate(new Date(startDate.replace(/-/g, "/"))); // Handle date formatting
    }
    if (endDate) {
      setGetEndDate(new Date(endDate.replace(/-/g, "/"))); // Handle date formatting
    }
  }, [startDate, endDate]);

  const ProcessedDataFunc = async (data) => {
    setData(data);
    setSecondaryData(data);
  };

  const searchResult = useCallback((result) => {
    if (result) {
      setData(result);
    }
  }, []);
  const dayCounts =
    Math.ceil((getEndDate - getStartDate) / (1000 * 60 * 60 * 24)) + 1;
  return (
    <div>
      <ApplyVSFunction
        convertedStringToArrayObj={convertedStringToArrayObj}
        ProcessedDataFunc={ProcessedDataFunc}
        dummyHolidayList={dummyHolidayList}
        dummyLeaveStatus={dummyLeaveStatus}
        dayCounts={dayCounts}
      />

      <ViewSummaryTable
        dayCounts={dayCounts}
        data={data}
        LocationData={LocationData}
        secondaryData={secondaryData}
        searchResult={searchResult}
      />
    </div>
  );
};
