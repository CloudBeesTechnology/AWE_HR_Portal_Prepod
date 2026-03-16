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
import { usePreYearPublicHolidays } from "./customTimeSheet/usePrevYearPublicHolidays";
import { updateLeaveStatus } from "../../graphql/mutations";

const client = generateClient();
export const ViewSummary = () => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [toggleForEVSummary, setToggleForEVSummary] = useState(null);
  const [loadingMess, setLoadingMess] = useState(true);
  const [summaryObject, setSummaryObject] = useState(null);

  // const [mergedData, setMergedData] = useState([]);
  // const [leaveStatuses, setLeaveStatuses] = useState([]);
  // const [resultOfWHrsAbsCal, setResultOfWHrsAbsCal] = useState("");

  // const { empPIData } = useContext(DataSupply);
  const { empPIData, setFetchTableData } = useContext(DataSupply);

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
  const { prevYearHolidays } = usePreYearPublicHolidays();

  const { empAndWorkInfo: mergedData, leaveStatuses } = useTableMergedData();

  const correctPublicHoliday = {
    CompanyHolidays: [
      {
        name: "NEW YEAR'S DAY",
        date: "Thursday, 1st January 2026",
      },
      {
        name: "ISRA' MI'RAJ",
        date: "Saturday, 17th January 2026",
      },
      {
        name: "CHINESE NEW YEAR",
        date: "Tuesday, 17th February 2026",
      },
      {
        name: "1st DAY OF RAMADHAN",
        date: "Thursday, 19th February 2026",
      },
      {
        name: "42nd NATIONAL DAY NEGARA BRUNEI DARUSSLAM",
        date: "Monday, 23rd February 2026",
      },
      {
        name: "ANNIVERSARY OF THE REVELATION OF THE QURAN",
        date: "Saturday, 7th March 2026",
      },
      {
        name: "HARI RAYA AIDIL FITRI",
        dates: [
          "Saturday, 21st March 2026",
          "Monday, 23rd March 2026",
          "Tuesday, 24th March 2026",
        ],
        note: "(in lieu of Sunday, 22nd March 2026)",
      },
      {
        name: "HARI RAYA AIDIL ADHA",
        date: "Wednesday, 27th May 2026",
      },
      {
        name: "FIRST DAY OF HIJRAH 1448",
        date: "Wednesday, 17th June 2026",
      },
      {
        name: "HIS MAJESTY THE SULTAN'S 80th BIRTHDAY",
        date: "Wednesday, 15th July 2026",
      },
      {
        name: "MAULUD-PROPHET MUHAMMAD'S BIRTHDAY",
        date: "Tuesday, 25th August 2026",
      },
      {
        name: "CHRISTMAS DAY",
        date: "Friday, 25th December 2026",
      },
    ],
    notes: "*Dates subject to alteration",
  };
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const handleUpdateALBalance = async ({ updatedLatestALBalanace }) => {
    let successCount = 0;
    const chunks = chunkArray(updatedLatestALBalanace, 500);

    console.log("updatedLatestALBalanace : ", updatedLatestALBalanace);

    for (const chunk of chunks) {
      try {
        await Promise.all(
          chunk.map(async (lDetails) => {
            const { createdAt, updatedAt, __typename, ...rest } = lDetails;

            try {
              const response = await client.graphql({
                query: updateLeaveStatus,
                variables: {
                  input: rest,
                },
              });

              if (response?.data?.updateLeaveStatus) {
                successCount++;
              }
            } catch (error) {
              console.log("Error : ", error);
            }
          })
        );
      } catch (batchError) {
        console.log("batchError : ", batchError);
      }
    }

    console.log("successCount : ", successCount);
  };

  const handleLeaveCal = ({ leaveStatuses, mergedData }) => {
    const filterDate = new Date("2026-01-01");

    const filteredLeaveData = leaveStatuses.filter((item) => {
      return new Date(item.createdAt) > filterDate;
    });

    console.log("filteredLeaveData : ", filteredLeaveData);

    const filterdOnshoreLeaves = filteredLeaveData.filter((empInf) => {
      const interviewDetails = mergedData.find(
        (item) =>
          String(item?.empID)?.toUpperCase()?.trim() ===
          String(empInf?.empID)?.toUpperCase()?.trim()
      );

      const isOnshore =
        interviewDetails?.empType?.[interviewDetails.empType.length - 1];

      if (interviewDetails && isOnshore === "ONSHORE") {
        return empInf;
      }
    });

    const holidays = correctPublicHoliday.CompanyHolidays;

    const toYMD = (dateStr) => {
      // remove st, nd, rd, th
      const cleanDate = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
      const date = new Date(cleanDate);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    const publicHolidayDates = holidays.flatMap((item) =>
      item.dates ? item.dates.map(toYMD) : [toYMD(item.date)]
    );

    // Seperate Leave

    // "16/01/2026" → Date object
    const parseDMY = (dmy) => {
      const [day, month, year] = dmy.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    // Date → "YYYY-MM-DD"
    const formatYMD = (date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    };

    const getDateRange = (from, to) => {
      const start = parseDMY(from);
      const end = parseDMY(to);

      const dates = [];
      let current = new Date(start);

      while (current <= end) {
        dates.push(formatYMD(current));
        current.setDate(current.getDate() + 1);
      }

      return dates;
    };

    const finalResult = filterdOnshoreLeaves.map((val) => {
      const getSeperatedLeave = getDateRange(val.selectedFrom, val.selectedTo);

      const PHCount = getSeperatedLeave.filter((date) =>
        publicHolidayDates?.includes(date)
      ).length;

      const getDaysTaken = parseFloat(val?.days);
      return {
        ...val,
        updatedDaysTaken: getDaysTaken - PHCount,
      };
    });

    const filteredData2 = finalResult?.filter((val) => {
      if (val.empID === "8463") {
        return val;
      }
    });
    console.log("filteredData2 : ", filteredData2);

    const unMatchedDays = finalResult?.filter((val) => {
      if (val.days !== val.updatedDaysTaken) {
        return val;
      }
    });
    console.log("unMatchedDays : ", unMatchedDays);
    // handleUpdateALBalance({ updatedLatestALBalanace: finalResult });
  };
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
    setFetchTableData(["empPIData"]);
  }, []);

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
        prevYearHolidays={prevYearHolidays}
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

      <button
        className="bg-primary rounded px-2 py-1.5 text-black m-10"
        onClick={() => {
          handleLeaveCal({ leaveStatuses, mergedData });
        }}
      >
        Update Missed PH
      </button>
    </div>
  );
};
