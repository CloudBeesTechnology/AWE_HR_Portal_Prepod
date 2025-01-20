

import { useTempID } from "../../utils/TempIDContext";
import {
  dummyHolidayList,
  dummyLeaveStatus,
  LocationData,
} from "./customTimeSheet/JobcodeAndLocation";
import { UpdateViewSummary } from "./customTimeSheet/UpdateViewSummary";
import { UseFetchDataForSummary } from "./customTimeSheet/UseFetchDataForSummary";
import { PopupForSFApproves } from "./ModelForSuccessMess/PopupForSFApproves";
import { ApplyVSFunction } from "./viewSummarySheets/ApplyVSFunction";
import { EditViewSummary } from "./viewSummarySheets/EditViewSummary";
import { ViewSummaryTable } from "./viewSummarySheets/ViewSummaryTable";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import { useCallback, useEffect, useState } from "react";

export const ViewSummary = () => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [toggleForEVSummary, setToggleForEVSummary] = useState(null);
  const [loadingMess, setLoadingMess] = useState(true);
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

  // console.log(startDate, endDate, selectedLocation);
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
  const assignWhrslocaly = async (responseData) => {
    // console.log(data);
    // console.log(responseData);

    responseData?.forEach((input) => {
      // Convert the date format from MM/DD/YYYY to D-M-YYYY
      const [month, day, year] = input.date.split("/");
      const formattedDate = `${parseInt(day)}-${parseInt(month)}-${year}`;

      // Find the corresponding object in existingData
      let existingObj = false;
      existingObj = data?.find(
        (obj) =>
          obj.empBadgeNo &&
          input.empBadgeNo &&
          String(obj.empBadgeNo) === String(input.empBadgeNo)
      );

      existingObj = data?.find(
        (obj) =>
          obj.sapNo && input.fidNo && String(obj.sapNo) === String(input.fidNo)
      );

      if (existingObj && Array.isArray(input.empWorkInfo)) {
        const parsedEmpWorkInfo = input.empWorkInfo.flatMap((info) =>
          typeof info === "string" ? JSON.parse(info) : info
        );

        parsedEmpWorkInfo.forEach((info) => {
          if (info.JOBCODE === existingObj.jobcode) {
            // Check if the date exists in getVerify and update its value
            if (existingObj.getVerify.hasOwnProperty(formattedDate)) {
              existingObj.getVerify[formattedDate] = input.verify;
              existingObj.assignUpdaterDateTime[formattedDate] =
                input.updatedAt;
              existingObj.mealAllow = Array.isArray(input.mealAllow)
                ? input.mealAllow[0]
                : input.mealAllow || "";
              // console.log()
            }
          }
        });
      }
    });
    setLoadingMess(true);
    // console.log(data); // It's more meaningful to log 'data' here to see the updates
  };
  const FinalEditedData = async (getObject) => {
    setLoadingMess(false);
    // console.log(getObject);
    const resData = await UpdateViewSummary(getObject);

    await assignWhrslocaly(resData);
    if (resData && resData.length > 0) {
      const {
        badgeNo,
        sapNo,
        jobcode,
        location,
        workingHrsKey,
        workingHrs,
        overtimeHrs,
      } = getObject;

      // Iterate through mainData array
      const result = data.map((obj) => {
        // Check if the workingHrsKey exists in the current object's workingHrs
        const empBadgeNoMatch =
          obj.empBadgeNo &&
          badgeNo &&
          String(obj.empBadgeNo) === String(badgeNo);

        const sapNoMatch =
          obj.sapNo && sapNo && String(obj.sapNo) === String(sapNo);

        if (
          (empBadgeNoMatch || sapNoMatch) &&
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
    }
  };

  // useEffect(() => {
  //   const assignUpdatedWhrs = () => {
  //     console.log(data);
  //     console.log(updatedResData);
  //   };
  //   if (updatedResData) {
  //     assignUpdatedWhrs();
  //   }
  // }, [updatedResData]);

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

        // updatedResData={updatedResData}
      />
      {toggleForEVSummary && (
        <EditViewSummary
          toggleEditViewSummaryFunc={toggleEditViewSummaryFunc}
          summaryObject={summaryObject}
          FinalEditedData={FinalEditedData}
        />
      )}

      {!loadingMess && (
        <PopupForSFApproves
          // toggleSFAMessage={toggleSFAMessage}
          icons={<IoCheckmarkCircleSharp />}
          iconColor="text-[#2BEE48]"
          textColor="text-[#05b01f]"
          title={"Updating..."}
          message={`Update request has been submitted, `}
          messageTwo={"This might take a few seconds..."}
          // btnText={"OK"}
        />
      )}
    </div>
  );
};
