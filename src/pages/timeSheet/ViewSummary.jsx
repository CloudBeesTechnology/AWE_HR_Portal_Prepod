import { useTempID } from "../../utils/TempIDContext";
import {
  dummyHolidayList,
  dummyLeaveStatus,
  LocationData,
} from "./customTimeSheet/JobcodeAndLocation";
import { UpdateViewSummary } from "./customTimeSheet/UpdateViewSummary";
import { UseFetchDataForSummary } from "./customTimeSheet/UseFetchDataForSummary";
import { ApplyVSFunction } from "./viewSummarySheets/ApplyVSFunction";
import { EditViewSummary } from "./viewSummarySheets/EditViewSummary";
import { ViewSummaryTable } from "./viewSummarySheets/ViewSummaryTable";

import { useCallback, useEffect, useState } from "react";
export const ViewSummary = () => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [toggleForEVSummary, setToggleForEVSummary] = useState(null);
  const [summaryObject, setSummaryObject] = useState(null);
  const {
    startDate,
    endDate,
    selectedLocation,
    getStartDate,
    setGetStartDate,
    getEndDate,
    setGetEndDate,
  } = useTempID();
  console.log(startDate, endDate, selectedLocation);
  const ProcessedDataFunc = async (data) => {
    setData(data);
    setSecondaryData(data);
  };
  const {
    convertedStringToArrayObj,
    loading,
    emptyTableMess,
    setEmptyTableMess,
    setLoading,
  } = UseFetchDataForSummary(
    startDate,
    endDate,
    selectedLocation,
    ProcessedDataFunc
  );

  useEffect(() => {
    if (startDate) {
      setGetStartDate(new Date(startDate.replace(/-/g, "/"))); // Handle date formatting
      setEmptyTableMess(false);
    }
    if (endDate) {
      setGetEndDate(new Date(endDate.replace(/-/g, "/"))); // Handle date formatting
      setEmptyTableMess(false);
    }
  }, [startDate, endDate]);

  const searchResult = useCallback((result) => {
    if (result) {
      setData(result);
    }
  }, []);

  const resetTableFunc = useCallback(() => {
    setEmptyTableMess(false);
    setLoading(false);
  }, []);

  const toggleEditViewSummaryFunc = () => {
    setToggleForEVSummary(!toggleForEVSummary);
  };

  const editViewSummaryObject = (object) => {
    if (object) {
      setSummaryObject(object);
    }
  };
  //   {
  //     "badgeNo": "",
  //     "empName": "",
  //     "sapNo": "",
  //     "location": "Offshore",
  //     "jobcode": "J9009M433",
  //     "NWHPD": "",
  //     "workingHrs": "8",
  //     "overtimeHrs": "2",
  //     "workingHrsKey": "1-7-2024"
  // }

  const FinalEditedData = (getObject) => {
    UpdateViewSummary(getObject);

    const { badgeNo, jobcode, location, workingHrsKey, workingHrs ,overtimeHrs} = getObject;

    // Iterate through mainData array
    const result = data.map((obj) => {
      // Check if the workingHrsKey exists in the current object's workingHrs

      if (
        obj.empBadgeNo === badgeNo &&
        obj.jobcode === jobcode &&
        obj.location === location &&
        obj.workingHrs.hasOwnProperty(workingHrsKey)
      ) {
        return {
          ...obj,
          workingHrs: {
            ...obj.workingHrs, // Keep existing keys
            [workingHrsKey]: workingHrs, // Update the matching key
          },
          OVERTIMEHRS: {
            ...obj.OVERTIMEHRS,
            [workingHrsKey]: overtimeHrs,
          },
        };
      }
      return obj; // Return the object unchanged if no match
    });

    setData(result);
    setSecondaryData(result);
  };

  // Call the function

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
        loading={loading}
        emptyTableMess={emptyTableMess}
        // setEmptyTableMess={setEmptyTableMess}
        resetTableFunc={resetTableFunc}
        toggleEditViewSummaryFunc={toggleEditViewSummaryFunc}
        editViewSummaryObject={editViewSummaryObject}
      />
      {toggleForEVSummary && (
        <EditViewSummary
          toggleEditViewSummaryFunc={toggleEditViewSummaryFunc}
          summaryObject={summaryObject}
          FinalEditedData={FinalEditedData}
        />
      )}
    </div>
  );
};
