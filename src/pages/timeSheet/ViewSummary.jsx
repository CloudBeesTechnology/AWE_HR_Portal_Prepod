import { useTempID } from "../../utils/TempIDContext";
import {
  dummyHolidayList,
  dummyLeaveStatus,
} from "./customTimeSheet/JobcodeAndLocation";
import { generateClient } from "@aws-amplify/api";
import { UpdateViewSummary } from "./customTimeSheet/UpdateViewSummary";
import { UseFetchDataForSummary } from "./customTimeSheet/UseFetchDataForSummary";
import { PopupForSFApproves } from "./ModelForSuccessMess/PopupForSFApproves";
import { ApplyVSFunction } from "./viewSummarySheets/ApplyVSFunction";
import { EditViewSummary } from "./viewSummarySheets/EditViewSummary";
import { ViewSummaryTable } from "./viewSummarySheets/ViewSummaryTable";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GetHolidayList } from "./customTimeSheet/GetHolidayList";
import { HoursMinuAbsentCal } from "./customTimeSheet/HoursMinuAbsentCal";

import { useTableMergedData } from "./customTimeSheet/useTableMergedData";
import { useGetTimeSheetData } from "./customTimeSheet/useGetTimeSheetData";
import { DataSupply } from "../../utils/DataStoredContext";
import { useFetchDropdownValue } from "./customTimeSheet/useFetchDropdownValue";

export const ViewSummary = () => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [toggleForEVSummary, setToggleForEVSummary] = useState(null);
  const [loadingMess, setLoadingMess] = useState(true);
  const [summaryObject, setSummaryObject] = useState(null);

  // const [mergedData, setMergedData] = useState([]);
  // const [leaveStatuses, setLeaveStatuses] = useState([]);
  // const [resultOfWHrsAbsCal, setResultOfWHrsAbsCal] = useState("");

  const { empPIData } = useContext(DataSupply);

  const {
    startDate,
    endDate,
    selectedLocation,
    getStartDate,
    setGetStartDate,
    getEndDate,
    setGetEndDate,
    offshoreType,
    selectSapNoOrBadgeNo,
    setRefreshTrigger,
    refreshTrigger,
  } = useTempID();

  const { workHrsAbsentCal } = HoursMinuAbsentCal();

  const { listOfLocation } = useFetchDropdownValue();

  const publicHoliday = GetHolidayList();

  const { empAndWorkInfo: mergedData, leaveStatuses } = useTableMergedData();

  const ProcessedDataFunc = async (data) => {
    setData(data);
    setSecondaryData(data);

    // let count = 0;

    // data?.forEach((fil) => {
    //   fil.empWorkInfo?.forEach((item) => {
    //     count += Number(item.WORKINGHRS) || 0;
    //   });
    // });

    // console.log("count :", count);

    // const isWithinDateRange = (dateStr, start, end) => {
    //   if (!dateStr) return false;

    //   const date = new Date(dateStr);
    //   const startDate = new Date(start);
    //   const endDate = new Date(end);

    //   return date >= startDate && date <= endDate;
    // };

    // const testingResult = data?.filter((fil) => {
    //   return (
    //     fil.sapNo === "1776883" &&
    //     fil.jobcode === "BLNG" &&
    //     fil.location === "BLNG-PROJ" &&
    //     isWithinDateRange(fil.date, "10-21-2025", "11-20-2025")
    //   );
    // });

    // console.log("testingResult : ", testingResult);
  };

  const { allData } = useGetTimeSheetData();
  const {
    convertedStringToArrayObj,
    loading,
    emptyTableMess,
    setEmptyTableMess,
    setLoading,
    // finalFiltered,
  } = UseFetchDataForSummary(
    startDate,
    endDate,
    selectedLocation,
    ProcessedDataFunc,
    offshoreType,
    allData,
    selectSapNoOrBadgeNo,
    refreshTrigger
  );

  useEffect(() => {
    if (startDate) {
      setGetStartDate(new Date(startDate.replace(/-/g, "/")));
      // setEmptyTableMess(false);
    }
    if (endDate) {
      setGetEndDate(new Date(endDate.replace(/-/g, "/")));
      // setEmptyTableMess(false);
    }
  }, [startDate, endDate]);

  const searchResult = useCallback((result) => {
    if (result) {
      setData(result);
    }
  }, []);

  const resetTableFunc = useCallback(() => {
    // setEmptyTableMess(false);
    setLoading(false);
  }, []);

  const toggleEditViewSummaryFunc = () => {
    // console.log("value : ", value);
    // if (value === "0.00") {
    //   setResultOfWHrsAbsCal("");
    //   return;
    // }
    setToggleForEVSummary(!toggleForEVSummary);
  };

  const editViewSummaryObject = (object) => {
    if (object) {
      setSummaryObject(object);
    }
  };

  const FinalEditedData = async (getObject, employee) => {
    const {
      badgeNo,
      data: objectData,
      sapNo,
      jobcode,
      location,
      NWHPD,
      NWHPM,
      workingHrsKey,
      workingHrs,
      overtimeHrs,
    } = getObject;

    const getFormatedWorkHrs = await workHrsAbsentCal({
      NWHPD: NWHPD,
      NWHPM: NWHPM,
      workingHrsKey: workingHrsKey,
      workingHrs: workingHrs,
    });

    // setResultOfWHrsAbsCal(getFormatedWorkHrs);

    if (getFormatedWorkHrs === "0.00") return;

    setLoadingMess(false);

    const { finalResult } = await UpdateViewSummary(getObject);

    let ExcelfileType = ["BLNG", "Offshore", "Offshore's ORMC"];
    const getFirstData = data[0]?.firstFileType;
    const getResponse = finalResult?.response;
    const getType = finalResult?.type;
    const isJobcodeExists = getResponse?.tradeCode;

    // mm/dd/yyyy to yyyy-mm-dd
    const convertToDateFormat = (dateString) => {
      const [day, month, year] = dateString?.split(/[-/]/);
      const formattedMonth = String(parseInt(month, 10)).padStart(2, "0");
      const formattedDay = String(parseInt(day, 10)).padStart(2, "0");
      return `${formattedMonth}-${formattedDay}-${year}`;
    };

    //  Update Local Data
    const updateLocalData =
      Array.isArray(data) && data?.length > 0
        ? data?.map((val) => {
            let isSapNoMatch = false;
            let isEmpBadgeNoMatch = false;

            if (ExcelfileType?.includes(val.firstFileType)) {
              isSapNoMatch =
                getResponse?.fidNo &&
                val.sapNo &&
                String(getResponse?.fidNo)?.toUpperCase()?.trim() ===
                  String(val.sapNo)?.toUpperCase()?.trim();
            } else {
              isEmpBadgeNoMatch =
                getResponse?.empBadgeNo &&
                val.empBadgeNo &&
                String(getResponse?.empBadgeNo)?.toUpperCase()?.trim() ===
                  String(val.empBadgeNo)?.toUpperCase()?.trim();
            }

            const jobcodeCondition = isJobcodeExists
              ? String(getResponse?.tradeCode)?.toUpperCase()?.trim() ===
                String(val?.jobcode)?.toUpperCase()?.trim()
              : true;

            if ((isEmpBadgeNoMatch || isSapNoMatch) && jobcodeCondition) {
              const updatedFields = {
                getVerify: { ...val.getVerify, [workingHrsKey]: "Yes" },
                workingHrs: {
                  ...val.workingHrs,
                  [workingHrsKey]: getFormatedWorkHrs,
                },
                OVERTIMEHRS: {
                  ...val.OVERTIMEHRS,
                  [workingHrsKey]: overtimeHrs,
                },
              };
              if (getType === "create") {
                return {
                  ...val,
                  data: [...val?.data, getResponse],
                  ...updatedFields,
                };
              } else if (getType === "update") {
                const updateData = val?.data?.map((val) => {
                  // mm/dd/yyyy to dd-mm-yyyy
                  const formattedDate = convertToDateFormat(val?.date);
                  if (formattedDate === workingHrsKey) {
                    return getResponse;
                  } else {
                    return val;
                  }
                });
                return {
                  ...val,
                  data: updateData,
                  ...updatedFields,
                };
              }
            } else {
              return val;
            }
          })
        : [];

    setData(updateLocalData);
    setSecondaryData(updateLocalData);
    setLoadingMess(true);
  };

  const dayCounts =
    Math.ceil((getEndDate - getStartDate) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div>
      <ApplyVSFunction
        convertedStringToArrayObj={convertedStringToArrayObj}
        ProcessedDataFunc={ProcessedDataFunc}
        publicHoliday={publicHoliday}
        dummyLeaveStatus={dummyLeaveStatus}
        dayCounts={dayCounts}
        mergedData={mergedData}
        leaveStatuses={leaveStatuses}
        empPIData={empPIData}
      />

      <ViewSummaryTable
        dayCounts={dayCounts}
        data={data}
        LocationData={listOfLocation}
        secondaryData={secondaryData}
        searchResult={searchResult}
        loading={loading}
        emptyTableMess={emptyTableMess}
        // setEmptyTableMess={setEmptyTableMess}
        resetTableFunc={resetTableFunc}
        toggleEditViewSummaryFunc={toggleEditViewSummaryFunc}
        editViewSummaryObject={editViewSummaryObject}
        empPIData={empPIData}
        setRefreshTrigger={setRefreshTrigger}
        refreshTrigger={refreshTrigger}
        // resultOfWHrsAbsCal={resultOfWHrsAbsCal}

        // updatedResData={updatedResData}
      />
      {toggleForEVSummary && (
        <EditViewSummary
          toggleEditViewSummaryFunc={toggleEditViewSummaryFunc}
          summaryObject={summaryObject}
          FinalEditedData={FinalEditedData}
          // resultOfWHrsAbsCal={resultOfWHrsAbsCal}
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
