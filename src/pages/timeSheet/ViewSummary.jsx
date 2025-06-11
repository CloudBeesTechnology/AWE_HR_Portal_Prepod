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

import { useCallback, useEffect, useRef, useState } from "react";
import { GetHolidayList } from "./customTimeSheet/GetHolidayList";
import { HoursMinuAbsentCal } from "./customTimeSheet/HoursMinuAbsentCal";

export const ViewSummary = () => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [toggleForEVSummary, setToggleForEVSummary] = useState(null);
  const [loadingMess, setLoadingMess] = useState(true);
  const [summaryObject, setSummaryObject] = useState(null);
  // const [resultOfWHrsAbsCal, setResultOfWHrsAbsCal] = useState("");

  const {
    startDate,
    endDate,
    selectedLocation,
    getStartDate,
    setGetStartDate,
    getEndDate,
    setGetEndDate,
    offshoreType,
  } = useTempID();

  const { workHrsAbsentCal } = HoursMinuAbsentCal();

  const publicHoliday = GetHolidayList();

  const ProcessedDataFunc = async (data) => {
    setData(data);
    setSecondaryData(data);
  };

  const updateGroupedData = async (updatedData, object) => {
    const getFormatedWorkHrs = await workHrsAbsentCal({
      NWHPD: object?.NWHPD,
      NWHPM: object?.NWHPM,
      workingHrsKey: object?.workingHrsKey,
      workingHrs: object?.workingHrs,
    });

    let ExcelfileType = ["BLNG", "Offshore", "Offshore's ORMC"];

    const updatedGrouped = data?.map((val) => {
      const today = new Date();
      // Update 'grouped' array where 'fidNo' or 'empBadgeNo' matches
      const updatedGroupedItems = val.grouped.map((group) => {
        if (
          (group.fidNo &&
            updatedData.fidNo &&
            String(group.fidNo) === String(updatedData.fidNo)) ||
          (group.empBadgeNo &&
            updatedData.empBadgeNo &&
            String(group.empBadgeNo) === String(updatedData.empBadgeNo))
        ) {
          return {
            ...group,
            data: group.data.map((obj) =>
              new Date(obj.date).toLocaleDateString() ===
              new Date(updatedData.date).toLocaleDateString()
                ? updatedData
                : obj
            ),
          };
        }
        return group;
      });

      function separateByJobCode(data) {
        let result = [];
        data.forEach((entry) => {
          entry.empWorkInfo.forEach((workInfo) => {
            let newEntry = { ...entry, empWorkInfo: [workInfo] };
            result.push(newEntry);
          });
        });
        return result;
      }

      const separatedData = separateByJobCode([updatedData]);
      let updatedDataArray = [...val.data]; // Preserve existing data
      let getJobcode = val.jobcode;

      const matchingEntries = separatedData.filter((entry) =>
        entry.empWorkInfo.some((info) => info.JOBCODE === getJobcode)
      );

      if (matchingEntries.length > 0) {
        updatedDataArray = [...updatedDataArray, ...matchingEntries]; // Add matching entries
      }

      let isSapNoMatch = false;
      let isEmpBadgeNoMatch = false;

      // Update working hrs
      if (ExcelfileType.includes(val?.firstFileType)) {
        isSapNoMatch =
          object?.sapNo &&
          val.sapNo &&
          String(object?.sapNo) === String(val.sapNo);
      } else {
        isEmpBadgeNoMatch =
          object?.badgeNo &&
          val.empBadgeNo &&
          String(object?.badgeNo) === String(val.empBadgeNo);
      }

      let updatedFields = {};

      if (
        (isEmpBadgeNoMatch || isSapNoMatch) &&
        object.jobcode === val.jobcode &&
        object.location === val.location
      ) {
        updatedFields = {
          getVerify: { ...val.getVerify, [object.workingHrsKey]: "Yes" },
          assignUpdaterDateTime: {
            ...val.assignUpdaterDateTime,
            [object.workingHrsKey]: today,
          },

          workingHrs: {
            ...val.workingHrs,
            // [object.workingHrsKey]: object.workingHrs,
            [object.workingHrsKey]: getFormatedWorkHrs,
          },
          OVERTIMEHRS: {
            ...val.OVERTIMEHRS,
            [object.workingHrsKey]: object.overtimeHrs,
          },
        };
      }

      return {
        ...val,
        grouped: updatedGroupedItems,
        data: updatedDataArray, // Assign updated data
        ...updatedFields,
      };
    });

    setData(updatedGrouped);
    setSecondaryData(updatedGrouped);
    setLoadingMess(true);
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
    ProcessedDataFunc,
    offshoreType
  );

  useEffect(() => {
    if (startDate) {
      setGetStartDate(new Date(startDate.replace(/-/g, "/")));
      setEmptyTableMess(false);
    }
    if (endDate) {
      setGetEndDate(new Date(endDate.replace(/-/g, "/")));
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

  const assignWhrslocaly = async (responseData, object) => {
    object?.data?.forEach((input) => {
      const [month, day, year] = input.date.split("/");
      const formattedDate = `${parseInt(day)}-${parseInt(month)}-${year}`;

      let ExcelfileType = ["BLNG", "Offshore", "Offshore's ORMC"];
      let existingObj = data?.filter((obj) => {
        let result = ExcelfileType.includes(obj?.firstFileType);
        return result === true ? obj.sapNo : obj.empBadgeNo;
      });
      if (existingObj) {
        existingObj.forEach((entry) => {
          entry.data.forEach((m) => {
            const [mMonth, mDay, mYear] = String(object.workingHrsKey).split(
              "-"
            );
            const formattedWorkingHrsKey = `${parseInt(mDay)}/${parseInt(
              mMonth
            )}/${mYear}`;
            let ExcelfileType = ["BLNG", "Offshore", "Offshore's ORMC"];
            let result = ExcelfileType.includes(object?.firstFileType);
            const matchedData =
              result === true
                ? entry?.sapNo &&
                  object?.sapNo &&
                  String(entry?.sapNo) === String(object?.sapNo)
                : entry?.empBadgeNo &&
                  object?.badgeNo &&
                  String(entry?.empBadgeNo) === String(object?.badgeNo);
            // new Date(m.date) === new Date(formattedWorkingHrsKey) &&
            // new Date(formattedWorkingHrsKey) === new Date(input.date)

            if (
              new Date(m.date).toLocaleDateString() ===
                new Date(formattedWorkingHrsKey).toLocaleDateString() &&
              new Date(formattedWorkingHrsKey).toLocaleDateString() ===
                new Date(input.date).toLocaleDateString() &&
              matchedData
            ) {
              if (Array.isArray(input.empWorkInfo)) {
                const parsedEmpWorkInfo = input.empWorkInfo.flatMap((info) =>
                  typeof info === "string" ? JSON.parse(info) : info
                );

                parsedEmpWorkInfo.forEach((info) => {
                  const existingEmpWorkInfo = m.empWorkInfo.find(
                    (workInfo) => workInfo.id === info.id
                  );

                  if (existingEmpWorkInfo) {
                    existingEmpWorkInfo.verify = "Yes";

                    entry.getVerify[object.workingHrsKey] = "Yes";
                    entry.assignUpdaterDateTime[object.workingHrsKey] =
                      input.updatedAt;
                  }
                });
              }
            }
          });
        });
      }
    });

    setLoadingMess(true);
  };

  const FinalEditedData = async (getObject) => {
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

    const { resData, object, newresData, resDataForJobcode } =
      await UpdateViewSummary(getObject, updateGroupedData);

    if (resData && resData.length > 0) {
      try {
        await assignWhrslocaly(resData, object);

        const objData = objectData.flatMap((ma) => ma.empWorkInfo || []);

        function getIndianRawTimeISO() {
          return new Date().toISOString();
        }

        const updatedBruneiDateTime = getIndianRawTimeISO();

        const result = data.map((obj) => {
          const isEmpBadgeNoMatch =
            obj.empBadgeNo &&
            badgeNo &&
            String(obj.empBadgeNo) === String(badgeNo);
          const isSapNoMatch =
            obj.sapNo && sapNo && String(obj.sapNo) === String(sapNo);

          let updatedObj = { ...obj };

          const isUpdated = obj.data.some((val) => {
            const pickObj = objData.find((fi) => fi.id);
            const getId = val.empWorkInfo.find((emp) => emp.id);

            if (!pickObj || !getId) return false;

            const [month, day, year] = val.date.split("/");
            const formattedDate = `${parseInt(day)}-${parseInt(month)}-${year}`;

            const isMatchingBadgeOrSap = isEmpBadgeNoMatch || isSapNoMatch;
            const isMatchingDate =
              new Date(formattedDate).toLocaleDateString() ===
              new Date(workingHrsKey).toLocaleDateString();
            const isMatchingId = getId.id === pickObj.id;
            const isWorkingHrsPresent =
              obj.workingHrs?.hasOwnProperty(workingHrsKey);

            if (
              isMatchingBadgeOrSap &&
              isMatchingDate &&
              isMatchingId &&
              isWorkingHrsPresent
            ) {
              updatedObj = {
                ...obj,
                workingHrs: {
                  ...obj.workingHrs,
                  [workingHrsKey]: getFormatedWorkHrs,
                },
                OVERTIMEHRS: {
                  ...obj.OVERTIMEHRS,
                  [workingHrsKey]: overtimeHrs,
                },
              };

              return true;
            }
            return false;
          });

          return isUpdated ? updatedObj : obj;
        });

        setData(result);
        setSecondaryData(result);
      } catch (err) {
        console.log("Error : ", err);
      } finally {
        setLoadingMess(true);
      }
    } else if (newresData && newresData.length > 0) {
      try {
        newresData.forEach((newItem) => {
          const empBadgeNo = newItem.empBadgeNo;
          const fidNo = newItem.fidNo;

          const empWorkInfo = JSON.parse(newItem.empWorkInfo[0]);
          const jobCode = empWorkInfo[0]?.JOBCODE;

          const matchedData = data.find(
            (item) =>
              (item.empBadgeNo &&
                empBadgeNo &&
                String(item.empBadgeNo) === String(empBadgeNo) &&
                item.jobcode === jobCode) ||
              (item.sapNo &&
                fidNo &&
                String(item.sapNo) === String(fidNo) &&
                item.jobcode === jobCode)
          );

          if (matchedData) {
            const [month, day, year] = newItem.date.split("/");
            const formattedDate = `${parseInt(day)}-${parseInt(month)}-${year}`;

            matchedData.data.push({ ...newItem, empWorkInfo: empWorkInfo });

            matchedData.getVerify[formattedDate] = "Yes";
            matchedData.assignUpdaterDateTime[formattedDate] =
              newItem.updatedAt;
          }
        });

        const result = data.map((obj) => {
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
                ...obj.workingHrs,
                [workingHrsKey]: getFormatedWorkHrs,
              },
              OVERTIMEHRS: {
                ...obj.OVERTIMEHRS,
                [workingHrsKey]: overtimeHrs,
              },
            };
          }
          setLoadingMess(true);
          return obj;
        });
        setData(result);
        setSecondaryData(result);
      } catch (err) {
        console.log("ERROR : ", err);
      } finally {
        setLoadingMess(true);
      }
    }
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
