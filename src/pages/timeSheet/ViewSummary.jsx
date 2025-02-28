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
import { GetHolidayList } from "./customTimeSheet/GetHolidayList";

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

  const publicHoliday = GetHolidayList();

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
    setToggleForEVSummary(!toggleForEVSummary);
  };

  const editViewSummaryObject = (object) => {
    if (object) {
      setSummaryObject(object);
    }
  };

  const assignWhrslocaly = async (responseData, object) => {
    const empMap = new Map();

    // Populate the map for quick lookups
    data?.forEach((entry) => {
      const key = entry.empBadgeNo || entry.sapNo;
      if (key) {
        empMap.set(String(key), entry);
      }
    });

    object?.data?.forEach((input) => {
      const [month, day, year] = input.date.split("/");
      const formattedDate = `${parseInt(day)}-${parseInt(month)}-${year}`;

      const key = input.empBadgeNo || input.fidNo;
      const existingEntry = empMap.get(String(key));

      if (existingEntry) {
        existingEntry.data.forEach((m) => {
          const [mMonth, mDay, mYear] = String(object.workingHrsKey).split("-");
          const formattedWorkingHrsKey = `${parseInt(mDay)}/${parseInt(
            mMonth
          )}/${mYear}`;

          if (
            m.date === formattedWorkingHrsKey &&
            formattedWorkingHrsKey === input.date
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
                  existingEntry.getVerify[object.workingHrsKey] = "Yes";
                  existingEntry.assignUpdaterDateTime[object.workingHrsKey] =
                    input.updatedAt;
                }
              });
            }
          }
        });
      }
    });

    setLoadingMess(true);
  };

  const FinalEditedData = async (getObject) => {
    setLoadingMess(false);

    const { resData, object, newresData } = await UpdateViewSummary(getObject);

    const {
      badgeNo,
      data: objectData,
      sapNo,
      jobcode,
      location,
      workingHrsKey,
      workingHrs,
      overtimeHrs,
    } = getObject;

    if (resData && resData.length > 0) {
      try {
        await assignWhrslocaly(resData, object);

        const objData = objectData.flatMap((ma) => {
          return ma.empWorkInfo.find((info) => {
            return info.id;
          });
        });
        function getIndianRawTimeISO() {
          return new Date().toISOString();
        }
        const UpdatedBruneDateTime = getIndianRawTimeISO();
        const result = data.map((obj) => {
          const empBadgeNoMatch =
            obj.empBadgeNo &&
            badgeNo &&
            String(obj.empBadgeNo) === String(badgeNo);

          const sapNoMatch =
            obj.sapNo && sapNo && String(obj.sapNo) === String(sapNo);

          let updatedObj = { ...obj };
          // obj.getVerify[formattedDate] = "Yes",
          const isUpdated = obj.data.some((val) => {
            const pickObj = objData.find((fi) => fi.id);
            const getId = val.empWorkInfo.find((emp) => emp.id);

            const [month, day, year] = val.date.split("/");
            const formattedDate = `${parseInt(day)}-${parseInt(month)}-${year}`;

            if (
              (empBadgeNoMatch || sapNoMatch) &&
              formattedDate === workingHrsKey &&
              getId.id === pickObj.id &&
              obj.workingHrs.hasOwnProperty(workingHrsKey)
            ) {
              updatedObj = {
                ...obj,
                workingHrs: {
                  ...obj.workingHrs,
                  [workingHrsKey]: workingHrs,
                },
                OVERTIMEHRS: {
                  ...obj.OVERTIMEHRS,
                  [workingHrsKey]: overtimeHrs,
                },
                getVerify: {
                  ...obj.getVerify,
                  [workingHrsKey]: "Yes",
                },

                assignUpdaterDateTime: {
                  ...obj.assignUpdaterDateTime,
                  [workingHrsKey]: UpdatedBruneDateTime,
                },

                data: obj.data.map((item) => {
                  return {
                    ...item,
                    empWorkInfo: item.empWorkInfo.map((emp) =>
                      emp.id === pickObj.id ? { ...emp, verify: "Yes" } : emp
                    ),
                  };
                }),
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
                [workingHrsKey]: workingHrs,
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
