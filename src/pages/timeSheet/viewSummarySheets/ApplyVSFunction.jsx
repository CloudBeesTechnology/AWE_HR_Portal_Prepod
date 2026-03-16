// import { generateClient } from "@aws-amplify/api";
import { useEffect } from "react";

// import {
//   listEmpLeaveDetails,
//   listEmpPersonalInfos,
//   listEmpWorkInfos,
//   listLeaveStatuses,
// } from "../../../graphql/queries";

import "jspdf-autotable";

import { useTempID } from "../../../utils/TempIDContext";
import { GetViewSummaryUpdater } from "../customTimeSheet/GetViewSummaryUpdater";
import { useHandleDateFormat } from "../customTimeSheet/useHandleDateFormat";

// const client = generateClient();

export const ApplyVSFunction = ({
  convertedStringToArrayObj,
  ProcessedDataFunc,
  publicHoliday,
  prevYearHolidays,
  dummyLeaveStatus,
  dayCounts,
  mergedData,
  leaveStatuses,
  empPIData,
  companyHolidayList,
}) => {
  const { getStartDate, getEndDate } = useTempID();
  const { handleDateFormat } = useHandleDateFormat({ leaveStatuses });
  const identifyFileType = convertedStringToArrayObj?.[0]?.fileType;

  try {
    // const fetchAllData = async (queryName) => {
    //   let allData = [];
    //   let nextToken = null;

    //   do {
    //     const response = await client.graphql({
    //       query: queryName,
    //       variables: { nextToken },
    //     });

    //     const items = response.data[Object.keys(response.data)[0]].items;
    //     allData = [...allData, ...items];
    //     nextToken = response.data[Object.keys(response.data)[0]].nextToken;
    //   } while (nextToken);

    //   return allData;
    // };

    useEffect(() => {
      const fetchData = async () => {
        // const [empPersonalInfos, empWorkInfos, leaveStatuses] =
        //   await Promise.all([
        //     fetchAllData(listEmpPersonalInfos),
        //     fetchAllData(listEmpWorkInfos),
        //     fetchAllData(listLeaveStatuses),
        //   ]);

        // const mergedData = empPersonalInfos
        //   .map((candidate) => {
        //     const sapNoRemoved = empWorkInfos?.map((item) => {
        //       const { sapNo, ...rest } = item;
        //       return rest;
        //     });

        //     const interviewDetails = sapNoRemoved.find(
        //       (item) => item.empID === candidate.empID
        //     );

        //     if (!interviewDetails) {
        //       return null;
        //     }

        //     return {
        //       ...candidate,
        //       ...interviewDetails,
        //       // ...leaveDetail,
        //     };
        //   })
        //   .filter((item) => item !== null);

        convertedStringToArrayObj?.forEach((sheet) => {
          try {
            if (
              Array.isArray(sheet.empWorkInfo) &&
              sheet.empWorkInfo.length > 0
            ) {
              sheet.empWorkInfo = sheet.empWorkInfo
                .map((info) => {
                  try {
                    return JSON.parse(info);
                  } catch {
                    return null;
                  }
                })
                .map((info) => info)[0];

              // .filter((fil) => fil !== null && fil !== undefined);
            } else {
              return (sheet.empWorkInfo = sheet.empWorkInfo);
            }
          } catch (err) {
            return (sheet.empWorkInfo = sheet.empWorkInfo);
          }
        });

        const leaveStatusData = handleDateFormat();
        // const leaveStatusData = leaveStatuses;

        // const leaveStatusData = dummyLeaveStatus;

        const approvedLeaveStatus = leaveStatusData?.filter(
          (fil) =>
            fil.managerStatus === "Approved" && fil.empStatus !== "Cancelled"
        );

        const groupBySapNo = (data) => {
          return data?.reduce((acc, item) => {
            const key = item.empBadgeNo
              ? `empBadgeNo-${item.empBadgeNo}`
              : `fidNo-${item.fidNo}`;

            if (!acc[key]) {
              acc[key] = {
                empBadgeNo: item.empBadgeNo || null,
                fidNo: item.fidNo || null,
                data: [],
              };
            }

            acc[key].data.push(item);

            return acc;
          }, {});
        };

        const grouped = Object.values(
          groupBySapNo(convertedStringToArrayObj || [])
        );

        const seperateDateMethod = (inputData) => {
          return inputData
            .map((entry) => {
              const groupedByMonthYear = entry?.data?.reduce((acc, record) => {
                const date = new Date(record.date);

                const monthYear = `${
                  date.getMonth() + 1
                }/${date.getFullYear()}`;

                if (!acc[monthYear]) {
                  acc[monthYear] = [];
                }
                acc[monthYear].push(record);

                return acc;
              }, {});

              return Object.entries(groupedByMonthYear).map(
                ([monthYear, records]) => ({
                  empBadgeNo: entry.empBadgeNo || null,
                  fidNo: entry.fidNo || null,
                  data: records || null,
                })
              );
            })
            .flat();
        };
        const seperatedEmpByDate = seperateDateMethod(grouped);

        function groupByEmpIdAndLocation(dataArray) {
          const groupedData = new Map();
          const ungroupedData = [];

          dataArray.forEach((emp) => {
            emp.data.forEach((dataEntry) => {
              if (
                Array.isArray(dataEntry.empWorkInfo) &&
                dataEntry.empWorkInfo
              ) {
                dataEntry.empWorkInfo.forEach((job) => {
                  const location = job?.LOCATION || "";
                  const jobcode = job?.JOBCODE || "";
                  const dateObj = new Date(dataEntry.date);
                  const monthYearKey = `${dateObj.getFullYear()}-${
                    dateObj.getMonth() + 1
                  }`;
                  const YearKey = `${dateObj.getFullYear()}`;

                  // const key = `${emp.empBadgeNo}-${emp.fidNo}-${location}-${jobcode}-${monthYearKey}`;
                  const key = `${emp.empBadgeNo}-${emp.fidNo}-${location}-${jobcode}`;

                  if (!groupedData.has(key)) {
                    groupedData.set(key, {
                      empBadgeNo: emp.empBadgeNo || null,
                      fidNo: emp.fidNo || null,
                      data: [],
                    });
                  }

                  const group = groupedData.get(key);
                  group.data.push({
                    ...dataEntry,
                    empWorkInfo: [job],
                  });
                });
              } else {
                ungroupedData.push({
                  empBadgeNo: emp.empBadgeNo || null,
                  fidNo: emp.fidNo || null,
                  data: [{ ...dataEntry, empWorkInfo: [] }],
                });
              }
            });
          });

          return [...Array.from(groupedData.values()), ...ungroupedData];
        }
        const seperatedGroupedData =
          groupByEmpIdAndLocation(seperatedEmpByDate);

        // seperatedGroupedData.forEach((item) => {
        //   if (Array.isArray(item.data)) {
        //     item.data.forEach((dataEntry) => {
        //       if (Array.isArray(dataEntry.empWorkInfo)) {
        //         dataEntry.empWorkInfo.forEach((workInfo) => {
        //           if (!workInfo.WORKINGHRS) {
        //             workInfo.WORKINGHRS = "A";
        //           }
        //         });
        //       }
        //     });
        //   }
        // });

        const merged = mergedData.flatMap((val) => {
          const matches = approvedLeaveStatus.filter(
            (so) =>
              String(val.empID)?.toUpperCase()?.trim() ===
              String(so.empID)?.toUpperCase()?.trim()
          );

          if (matches.length > 0) {
            return matches.map((match) => ({
              ...val,
              ...match,
            }));
          }

          return [val];
        });

        const filteredData = merged.filter((leave) => {
          return seperatedGroupedData.some((emp) => {
            const empBadgeNoMatch =
              leave.empBadgeNo &&
              emp.empBadgeNo &&
              String(leave.empBadgeNo)?.toUpperCase()?.trim() ===
                String(emp.empBadgeNo)?.toUpperCase()?.trim();

            const sapNoMatch =
              leave.sapNo &&
              emp.fidNo &&
              String(leave.sapNo)?.toUpperCase()?.trim() ===
                String(emp.fidNo)?.toUpperCase()?.trim();

            if (empBadgeNoMatch || sapNoMatch) {
              // return emp.data.some((entry) => {
              // const leaveDate = new Date(leave.toDate);
              // const empDate = new Date(entry.date);

              return leave;

              // leaveDate.getFullYear() === empDate.getFullYear()
              //  &&
              // leaveDate.getMonth() === empDate.getMonth()
              // });
            }
            return false;
          });
        });

        //         Annual Leave
        // Sick Leave
        // Hospitalisation Leave
        // Compassionate Leave
        // Marriage Leave
        // Compensate Leave
        // Paternity Leave      [Male]
        // Maternity Leave     [Female]
        // Unpaid Authorize - Sick
        // Unpaid Authorize - Annual
        // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        // Compassionate Leave - CL
        // . Marriage Leave - CL
        // . Hospitalization Leave -SL
        // . Maternity Leave - CL
        // . Paternity Leave - CL
        // . Unpaid Unauthorised Sick Leave - UAL

        const leaveTypeAbbreviation = {
          "Annual Leave": "AL",
          "Compensate Leave": "CL",
          "Unpaid Authorize - Annual": "UAL",
          "Sick Leave": "SL",
          "Hospitalisation Leave": "SL",
          "Compassionate Leave": "CL",
          "Marriage Leave": "CL",
          "Paternity Leave": "CL",
          "Maternity Leave": "CL",
          "Unpaid Authorize - Sick": "UAL",
          "Unpaid Unauthorised Sick Leave": "UAL",
        };

        const isHalfDayLeave = (abbreviation) =>
          ["HAL", "HCL", "HUAL", "HSL", "HCL"].some((prefix) =>
            abbreviation?.startsWith?.(prefix)
          );

        const transformData = (inputData) => {
          const result = {};

          inputData.forEach((entry) => {
            const {
              empID,
              empBadgeNo,
              sapNo,
              leaveType,
              fromDate,
              toDate,
              days,
              workHrs,
            } = entry;

            if (!result[empID]) {
              result[empID] = {
                empBadgeNo: empBadgeNo,
                fidNo: sapNo,
                leaveCounts: {},
                dateDifferences: [],
              };
            }

            if (isHalfDayLeave(leaveTypeAbbreviation[leaveType])) {
              result[empID].leaveCounts[leaveType] =
                (result[empID].leaveCounts[leaveType] || 0) + 0.5;
            } else if (!(leaveType === "Compensate Leave" && days === 0.5)) {
              result[empID].leaveCounts[leaveType] =
                (result[empID].leaveCounts[leaveType] || 0) + 1;
            }

            result[empID].dateDifferences.push({
              leaveType,
              fromDate,
              toDate,
              listDate: generateDateList(
                fromDate,
                toDate,
                workHrs,
                leaveTypeAbbreviation[leaveType],
                days === 0.5
              ),
              daysDifference: days,
            });
          });

          Object.values(result).forEach((emp) => {
            emp.dateDifferences.forEach(({ listDate }) => {
              Object.values(listDate).forEach((value) => {
                if (isHalfDayLeave(value)) {
                  const leaveTypeKey = Object.keys(leaveTypeAbbreviation).find(
                    (key) => value.includes(leaveTypeAbbreviation[key])
                  );
                  emp.leaveCounts[leaveTypeKey] =
                    (emp.leaveCounts[leaveTypeKey] || 0) + 0.5;
                }
              });
            });
          });

          return Object.values(result);
        };

        // const generateDateList = (
        //   fromDate,
        //   toDate,
        //   workHrs,
        //   abbreviation,
        //   isHalfDay
        // ) => {
        //   const start = new Date(fromDate);
        //   const end = new Date(toDate);
        //   let existHalfDay = [];
        //   const listDate = {};
        //   const NWHPD =
        //     Array.isArray(workHrs) && workHrs?.length > 0
        //       ? workHrs[workHrs?.length - 1]
        //       : workHrs || 0;
        //   const devidedNWHPD = parseFloat(NWHPD) / 2;

        //   while (start <= end) {
        //     const dayStr = `${start.getDate()}-${
        //       start.getMonth() + 1
        //     }-${start.getFullYear()}`;
        //     if (isHalfDay) {
        //       existHalfDay?.push({
        //         dayStr: `H${abbreviation}${devidedNWHPD}`,
        //       });
        //     }
        //     if (isHalfDay) {
        //       const keysArray = existHalfDay?.map((obj) => Object.keys(obj)[0]);
        //       existHalfDay.forEach((obj) => {
        //         Object.keys(obj).forEach((key) => {
        //           // console.log("Key:", key, "Value:", obj[key]);

        //           listDate[dayStr] = keysArray?.includes(key)
        //             ? `${obj[key]} / H${abbreviation}${devidedNWHPD}`
        //             : `H${abbreviation}${devidedNWHPD}`;
        //         });
        //       });
        //     } else {
        //       listDate[dayStr] = abbreviation;
        //     }

        //     // listDate[dayStr] = isHalfDay
        //     //   ? `H${abbreviation}${devidedNWHPD}`
        //     //   : abbreviation;
        //     start.setDate(start.getDate() + 1);
        //   }

        //   return listDate;
        // };

        const existHalfDayMap = new Map();
        const generateDateList = (
          fromDate,
          toDate,
          workHrs,
          abbreviation,
          isHalfDay
        ) => {
          const start = new Date(fromDate);
          const end = new Date(toDate);

          // store final result
          const listDate = {};

          // determine NWHPD value (last value of array or single value or 0)
          const NWHPD =
            Array.isArray(workHrs) && workHrs.length > 0
              ? workHrs[workHrs.length - 1]
              : workHrs || 0;

          const devidedNWHPD = parseFloat(NWHPD) / 2;

          // map for tracking half-day entries per day (fast lookup & combine)

          while (start <= end) {
            const dayStr = `${start.getDate()}-${
              start.getMonth() + 1
            }-${start.getFullYear()}`;

            if (isHalfDay) {
              const halfVal = `H${abbreviation}${devidedNWHPD}`;

              if (existHalfDayMap.has(dayStr)) {
                // combine if an entry already exists for that date
                const prev = existHalfDayMap.get(dayStr);
                const combined = `${prev} / ${halfVal}`;
                existHalfDayMap.set(dayStr, combined);
                listDate[dayStr] = combined;
              } else {
                // first half-day for this date
                existHalfDayMap.set(dayStr, halfVal);
                listDate[dayStr] = halfVal;
              }
            } else {
              listDate[dayStr] = abbreviation;
            }

            // advance date (mutates start)
            start.setDate(start.getDate() + 1);
          }

          return listDate;
        };

        const leaveCount_ = transformData(filteredData);

        // const holidayDates = []
        const holidayDates = companyHolidayList?.flatMap(
          (holiday) => holiday.dates || [holiday.date]
        );

        const formattedHolidayDates = holidayDates?.map((dateStr) => {
          const parts = dateStr.split(",")[1].trim();
          const [day, month, year] = parts.split(" ");
          const dayNumber = day.replace(/\D/g, "");
          const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;
          return `${year}-${monthNumber}-${dayNumber}`;
        });

        const dayCount =
          (getEndDate - getStartDate) / (1000 * 60 * 60 * 24) + 1;

        const addLeaveTypeCount = seperatedGroupedData.map((val) => {
          const empLeaveCount = leaveCount_.find((fi) => {
            if (
              val.empBadgeNo &&
              fi.empBadgeNo &&
              String(val.empBadgeNo)?.toUpperCase()?.trim() ===
                String(fi.empBadgeNo)?.toUpperCase()?.trim()
            ) {
              return fi;
            } else if (
              val.fidNo &&
              fi.fidNo &&
              String(val.fidNo)?.toUpperCase()?.trim() ===
                String(fi.fidNo)?.toUpperCase()?.trim()
            ) {
              return fi;
            }
          });

          const workInfoData = mergedData?.find((fi) => {
            if (
              val.empBadgeNo &&
              fi.empBadgeNo &&
              String(val.empBadgeNo)?.toUpperCase()?.trim() ===
                String(fi.empBadgeNo)?.toUpperCase()?.trim()
            ) {
              return fi;
            } else if (
              val.fidNo &&
              fi.sapNo &&
              String(val.fidNo)?.toUpperCase()?.trim() ===
                String(fi.sapNo)?.toUpperCase()?.trim()
            ) {
              return fi;
            }
          });
          const getDate = val.data.find((f) => f);
          const id = getDate.id;

          const res = getDate.empWorkInfo.map((val) => val?.LOCATION);
          const jobcode = getDate.empWorkInfo.map((val) => val?.JOBCODE);

          const workingHrs = Array.from({ length: dayCounts }, (_, i) => {
            const currentDay = new Date(getStartDate);
            currentDay.setDate(getStartDate.getDate() + i);
            return currentDay;
          }).reduce((acc, currentDay) => {
            const monthKey = currentDay.getMonth() + 1;
            const dayStr = `${currentDay.getDate()}-${monthKey}-${currentDay.getFullYear()}`;

            const entry = val?.data.find(({ date }) => {
              const entryDate = new Date(date);
              return (
                entryDate.getDate() === currentDay.getDate() &&
                entryDate.getMonth() === currentDay.getMonth() &&
                entryDate.getFullYear() === currentDay.getFullYear()
              );
            });

            const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
              weekday: "long",
            }).format(currentDay);

            const normalWorkHrsPerMonth =
              Array.isArray(workInfoData?.workMonth) &&
              workInfoData?.workMonth?.length > 0
                ? workInfoData?.workMonth[workInfoData?.workMonth?.length - 1]
                : 0;

            const normalWorkHrsPerDay =
              Array.isArray(workInfoData?.workHrs) &&
              workInfoData?.workHrs?.length > 0
                ? workInfoData?.workHrs[workInfoData?.workHrs?.length - 1]
                : 0;

            const checkEntry = entry?.empWorkInfo[0]?.WORKINGHRS;

            const isPublicHoliday = formattedHolidayDates?.some(
              (formattedDate) => {
                const formattedDateObject = new Date(formattedDate);
                const formattedDay = `${formattedDateObject?.getDate()}-${
                  formattedDateObject?.getMonth() + 1
                }-${formattedDateObject?.getFullYear()}`;
                return formattedDay === dayStr;
              }
            );

            const formattedDate = (date) => {
              const [day, month, year] = date.split("-");
              return `${year}-${month.padStart(2, "0")}-${day.padStart(
                2,
                "0"
              )}`;
            };

            let leaveType = null;
            if (empLeaveCount) {
              empLeaveCount.dateDifferences.forEach((leave) => {
                if (leave.listDate.hasOwnProperty(dayStr)) {
                  // Only process this dayStr
                  let leaves = leave.listDate[dayStr];
                  let getFormattedDate = formattedDate(dayStr);
                  let parsedDate = new Date(getFormattedDate);

                  const dayOfMonth = new Intl.DateTimeFormat("en-BN", {
                    weekday: "long",
                  }).format(parsedDate);

                  if (
                    dayOfMonth === "Saturday" &&
                    parseFloat(normalWorkHrsPerDay) === 8 &&
                    parseFloat(normalWorkHrsPerMonth) === 24
                  ) {
                    let getHalfNWHPD = parseFloat(normalWorkHrsPerDay) / 2;

                    if (!leaves?.startsWith("H")) {
                      leaveType = `H${leaves}${getHalfNWHPD}`;
                    } else {
                      leaveType = leaves;
                    }
                  } else {
                    leaveType = leaves;
                  }
                }
              });
            }

            const recognizeFileType = ["Offshore", "Offshore's ORMC"]?.includes(
              identifyFileType
            );

            function convertNumToHours(input) {
              let hours = 0;
              let hundredMinutes = 0;
              let divideBy = 2;

              if (input?.includes(":")) {
                [hours, hundredMinutes] = input?.split(":")?.map(Number);
              } else if (input?.includes(".")) {
                [hours, hundredMinutes] = input?.split(".")?.map(Number);
              } else {
                hours = parseInt(input, 10);
                hundredMinutes = 0;
              }

              // Convert HH:100 to total hundred-minutes
              let totalHundredMinutes = hours * 100 + hundredMinutes;

              // Divide
              totalHundredMinutes = Math.round(totalHundredMinutes / divideBy);

              // Convert back to HH:100
              const finalHours = Math.floor(totalHundredMinutes / 100);
              const finalMinutes = totalHundredMinutes % 100;

              return `${finalHours}:${finalMinutes
                .toString()
                .padStart(2, "0")}`;
            }

            function toMinutes(decimalHour) {
              let hours = Math.floor(decimalHour);
              let minutes = Math.round((decimalHour - hours) * 100); // use 100 because .30 means 30 minutes
              return hours * 60 + minutes;
            }

            // const workHrsAbsentCal = (workingHrs) => {
            //   let formattedWorkHrs = toMinutes(workingHrs);
            //   let formattedNWHPD = toMinutes(entry?.normalWorkHrs);

            //   let diffMinutes = formattedNWHPD - formattedWorkHrs;

            //   let resultHours = Math.floor(diffMinutes / 60);
            //   let resultMinutes = diffMinutes % 60;

            //   return `${String(resultHours).padStart(2, "0")}.${String(
            //     resultMinutes
            //   ).padStart(2, "0")}`;
            // };

            function normalizeHH100(value) {
              let hours = Math.floor(value);
              let hundredMinutes = Math.round((value - hours) * 100);

              if (hundredMinutes >= 100) {
                hours += Math.floor(hundredMinutes / 100);
                hundredMinutes = hundredMinutes % 100;
              }

              return parseFloat(
                `${hours}.${hundredMinutes.toString().padStart(2, "0")}`
              );
            }

            function workHrsAbsentCal(workingHrs, empType) {
              // Normalize both working hours and normal working hours first
              let formattedNWHPD;
              if (empType === "staffLevelEmp")
                formattedNWHPD = entry?.normalWorkHrs / 2;

              if (empType === "normalEmp")
                formattedNWHPD = entry?.normalWorkHrs;

              const formattedWorkHrs = normalizeHH100(workingHrs);
              const normalizedNormalHrs = normalizeHH100(formattedNWHPD);

              let diff = normalizedNormalHrs - formattedWorkHrs;

              return normalizeHH100(diff);
            }

            if (checkEntry) {
              // const result = parseFloat(entry?.normalWorkHrs) / 2;
              const result = convertNumToHours(entry?.normalWorkHrs);

              if (isNaN(checkEntry) || !checkEntry) {
                acc[dayStr] = checkEntry;
              } else if (
                dayOfWeek === "Saturday" &&
                parseFloat(entry?.normalWorkHrs) === 8 &&
                parseFloat(normalWorkHrsPerMonth) === 24
              ) {
                const workingHrs = parseFloat(checkEntry);
                let empType = "staffLevelEmp";
                const formattedAbsentHrs = workHrsAbsentCal(
                  workingHrs,
                  empType
                );
                const absence = parseFloat(formattedAbsentHrs).toFixed(2);
                const presentHrs = parseFloat(workingHrs).toFixed(2);

                acc[dayStr] =
                  absence === "0.00"
                    ? presentHrs
                    : `x(${absence})${presentHrs}`;
              } else if (
                dayOfWeek === "Saturday" &&
                parseFloat(result.split(":")[0]) === parseFloat(checkEntry) &&
                parseFloat(entry?.normalWorkHrs) !== 8 &&
                parseFloat(normalWorkHrsPerMonth) !== 24
              ) {
                const salaryType =
                  workInfoData?.salaryType[
                    workInfoData?.salaryType.length - 1
                  ]?.toLowerCase();

                const monthlyTypes = [
                  "monthly",
                  "month",
                  "m",
                  "MONTHLY",
                  "Monthly",
                  "MONTH",
                ];

                if (monthlyTypes.includes(salaryType)) {
                  // acc[dayStr] = "HPHD";

                  const workingHrs = parseFloat(checkEntry);
                  let empType = "normalEmp";
                  const formattedAbsentHrs = workHrsAbsentCal(
                    workingHrs,
                    empType
                  );
                  const absence = parseFloat(formattedAbsentHrs).toFixed(2);
                  const presentHrs = parseFloat(workingHrs).toFixed(2);
                  acc[dayStr] =
                    absence === "0.00"
                      ? presentHrs
                      : `x(${absence})${presentHrs}`;
                }
              } else {
                const workingHrs = parseFloat(checkEntry);

                if (workingHrs <= (entry?.normalWorkHrs || 0)) {
                  let empType = "normalEmp";
                  const formattedAbsentHrs = workHrsAbsentCal(
                    workingHrs,
                    empType
                  );
                  const absence = parseFloat(formattedAbsentHrs).toFixed(2);
                  const presentHrs = parseFloat(workingHrs).toFixed(2);
                  acc[dayStr] =
                    absence === "0.00"
                      ? presentHrs
                      : `x(${absence})${presentHrs}`;
                } else {
                  acc[dayStr] = workingHrs.toString();
                }
              }
            } else if (isPublicHoliday) {
              if (recognizeFileType === true) {
                if (leaveType) {
                  acc[dayStr] = leaveType;
                } else {
                  acc[dayStr] = "A";
                }
              } else if (recognizeFileType === false) {
                acc[dayStr] = "PH";
              }
            } else if (leaveType) {
              if (recognizeFileType === true) {
                acc[dayStr] = leaveType;
              } else if (recognizeFileType === false) {
                if (dayOfWeek === "Sunday") {
                  acc[dayStr] = "";
                } else {
                  acc[dayStr] = leaveType;
                }
              }
            } else if (dayOfWeek === "Saturday") {
              // const result = parseFloat(entry?.normalWorkHrs) / 2;

              const salaryType =
                workInfoData?.salaryType[
                  workInfoData?.salaryType.length - 1
                ]?.toLowerCase();

              const monthlyTypes = ["monthly", "month", "m"];
              const dailyTypes = ["daily", "day", "d"];

              if (!checkEntry && monthlyTypes.includes(salaryType)) {
                // acc[dayStr] = "PHD";
                acc[dayStr] = "A";
              } else if (!checkEntry && dailyTypes.includes(salaryType)) {
                // acc[dayStr] = "OFF";
                acc[dayStr] = "A";
              } else {
                acc[dayStr] = checkEntry;
              }
            } else if (dayOfWeek === "Sunday") {
              if (recognizeFileType === true) {
                acc[dayStr] = "A";
              } else if (recognizeFileType === false) {
                acc[dayStr] = "";
              }
            } else {
              acc[dayStr] = "A";
            }

            return acc;
          }, {});

          return empLeaveCount
            ? {
                ...val,
                id: id,
                workingHrs: workingHrs,
                leaveCounts: empLeaveCount.leaveCounts,
                NWHPD: workInfoData?.workHrs,
                NWHPM: workInfoData?.workMonth,
                newDate: getDate.date,
                location: res?.[0],
                jobcode: jobcode?.[0],
              }
            : {
                ...val,
                id: id,

                workingHrs: workingHrs,
                leaveCounts: {},
                NWHPD: workInfoData?.workMonth,
                NWHPM: workInfoData?.workHrs,
                newDate: getDate.date,
                location: res?.[0],
                jobcode: jobcode?.[0],
              };
        });

        const updateFieldBasedOnConditions = async (inputData) => {
          const keysToCount = ["OFF", "PH", "PHD", "A"];

          const countOccurrences = (data, keys) => {
            const values = Object.values(data);
            return keys?.reduce((counts, key) => {
              counts[key] = values?.filter((value) => value === key).length;
              return counts;
            }, {});
          };

          inputData.forEach((data, index) => {
            inputData.forEach((compareData, compareIndex) => {
              if (index !== compareIndex) {
                const isSameBadgeNo =
                  data.empBadgeNo &&
                  compareData.empBadgeNo &&
                  String(data.empBadgeNo)?.toUpperCase()?.trim() ===
                    String(compareData.empBadgeNo)?.toUpperCase()?.trim();

                const isSameFidWithDifferentJobcode =
                  data.fidNo &&
                  compareData.fidNo &&
                  String(data.fidNo)?.toUpperCase()?.trim() ===
                    String(compareData.fidNo)?.toUpperCase()?.trim();

                if (
                  (isSameBadgeNo || isSameFidWithDifferentJobcode) &&
                  data.jobcode !== compareData.jobcode
                ) {
                  Object.keys(data.workingHrs).forEach((dateKey) => {
                    const value = data.workingHrs[dateKey];
                    const compareValue = compareData.workingHrs[dateKey];

                    const regex = /^x\(\d+(\.\d+)?\)\d+(\.\d+)?$/;

                    if (regex.test(value) && !regex.test(compareValue)) {
                      compareData.workingHrs[dateKey] = "";
                    } else if (!regex.test(value) && regex.test(compareValue)) {
                      data.workingHrs[dateKey] = "";
                    }
                  });
                }
              }
            });

            const holidaysAndAbsent = countOccurrences(
              data.workingHrs,
              keysToCount
            );

            holidaysAndAbsent["PHD"] +=
              Object.values(data.workingHrs).filter((value) => value === "HPHD")
                .length * 0.5;

            const countLeaveTypes = () => {
              let newLeaveCount = {
                AL: 0,
                CL: 0,
                UAL: 0,
                SL: 0,
              };

              for (const date in data.workingHrs) {
                const value = data.workingHrs[date];

                if (value?.includes("/")) {
                  const [first, second] = value
                    ?.split("/")
                    ?.map((v) => v?.trim());

                  // FIRST HALF-DAY
                  if (first.startsWith("HAL")) newLeaveCount.AL += 0.5;
                  if (first.startsWith("HCL")) newLeaveCount.CL += 0.5;
                  if (first.startsWith("HSL")) newLeaveCount.SL += 0.5;
                  if (first.startsWith("HUAL")) newLeaveCount.UAL += 0.5;

                  // SECOND HALF-DAY
                  if (second.startsWith("HAL")) newLeaveCount.AL += 0.5;
                  if (second.startsWith("HCL")) newLeaveCount.CL += 0.5;
                  if (second.startsWith("HSL")) newLeaveCount.SL += 0.5;
                  if (second.startsWith("HUAL")) newLeaveCount.UAL += 0.5;
                } else if (value?.startsWith("HAL")) {
                  newLeaveCount.AL += 0.5;
                } else if (value === "AL") {
                  newLeaveCount.AL += 1;
                } else if (value?.startsWith("HCL")) {
                  newLeaveCount.CL += 0.5;
                } else if (value === "CL") {
                  newLeaveCount.CL += 1;
                } else if (value?.startsWith("HSL")) {
                  newLeaveCount.SL += 0.5;
                } else if (value === "SL") {
                  newLeaveCount.SL += 1;
                } else if (value?.startsWith("HUAL")) {
                  newLeaveCount.UAL += 0.5;
                } else if (value === "UAL") {
                  newLeaveCount.UAL += 1;
                }
              }
              return newLeaveCount;
            };

            const leaveCounts = countLeaveTypes();

            data.hollydayCounts = holidaysAndAbsent;
            data.leaveCounts = leaveCounts;
          });

          return inputData;
        };

        const updatedData = await updateFieldBasedOnConditions(
          addLeaveTypeCount
        );

        const isDateInRange = (date, start, end) => {
          const parsedDate = new Date(date);
          const parsedStart = new Date(start);
          const parsedEnd = new Date(end);

          parsedDate.setHours(0, 0, 0, 0);
          parsedStart.setHours(0, 0, 0, 0);
          parsedEnd.setHours(0, 0, 0, 0);

          return parsedDate >= parsedStart && parsedDate <= parsedEnd;
        };
        // getStartDate, getEndDate
        const getSummaryUpdaterName = async (updatedData) => {
          const filteredData = updatedData
            ?.map((item) => ({
              ...item,
              data: item.data.filter((fin) =>
                isDateInRange(fin.date, getStartDate, getEndDate)
              ), // Filtered by date
            }))
            .filter((item) => item.data.length > 0); // Remove empty objects after filtering

          const results = await Promise.all(
            filteredData.map(async (val) => {
              const timeKeeperNames = await Promise.all(
                val.data.map(async (fin) => {
                  const getHisName = await GetViewSummaryUpdater(
                    empPIData,
                    fin?.assignBy
                  );
                  return getHisName?.name || null;
                })
              );

              return { ...val, timeKeeper: timeKeeperNames }; // Assign timeKeeperNames after filtering
            })
          );

          return results; // Return filtered results with all names
        };

        const UpdaterNameAdded = await getSummaryUpdaterName(updatedData);

        const transformedData = UpdaterNameAdded?.map((item) => {
          const initialMatch = mergedData?.find((datasetItem) => {
            const empBadgeNoMatch =
              datasetItem.empBadgeNo &&
              item.empBadgeNo &&
              String(datasetItem.empBadgeNo)?.toUpperCase()?.trim() ===
                String(item.empBadgeNo)?.toUpperCase()?.trim();

            const sapNoMatch =
              datasetItem.sapNo &&
              item.fidNo &&
              String(datasetItem.sapNo)?.toUpperCase()?.trim() ===
                String(item.fidNo)?.toUpperCase()?.trim();

            return empBadgeNoMatch || sapNoMatch;
          });

          const selectedFields = initialMatch
            ? (({
                empID,
                name,
                sapNo,
                empBadgeNo,
                workHrs,
                workMonth,
                salaryType,
                days,
              }) => ({
                empID,
                name,
                sapNo,
                empBadgeNo,
                workHrs,
                workMonth,
                salaryType,
                days,
              }))(initialMatch)
            : {};

          const getEmpDateRange = item.data.find((first) => first.date);

          const id = item?.id;
          const empName = item?.data?.map((m) => m.empName);

          const firstFileType = item?.data?.[0]?.fileType;
          const data = item?.data;
          const empLeaveCount = item?.leaveCounts;
          const workingHrs = item?.workingHrs;
          const dateForSelectMY = item?.newDate;
          const location = item?.location;
          const hollydayCounts = item?.hollydayCounts;
          const timeKeeper = item?.timeKeeper;

          const overtimeHours = Array.from({ length: dayCounts }, (_, i) => {
            const currentDay = new Date(getStartDate);
            currentDay.setDate(getStartDate.getDate() + i);
            return currentDay;
          }).reduce((acc, currentDay) => {
            const dayStr = `${currentDay.getDate()}-${
              currentDay.getMonth() + 1
            }-${currentDay.getFullYear()}`;

            const entry = item?.data?.find(({ date }) => {
              const entryDate = new Date(date);

              return (
                //   entryDate === currentDay
                entryDate.getDate() === currentDay.getDate() &&
                entryDate.getMonth() === currentDay.getMonth() &&
                entryDate.getFullYear() === currentDay.getFullYear()
              );
            });

            const overtimeHours = entry?.empWorkInfo[0]?.OVERTIMEHRS
              ? parseFloat(entry?.empWorkInfo[0].OVERTIMEHRS)
              : null;

            const getVerification = entry?.getVerify;
            if (getVerification !== null && getVerification !== undefined) {
              acc[dayStr] = getVerification;
            }

            if (overtimeHours !== null || overtimeHours !== undefined) {
              acc[dayStr] = overtimeHours;
            } else {
              acc[dayStr] = 0;
            }

            return acc;
          }, {});

          const processEntries = (
            item,
            dayCounts,
            getStartDate,
            extractValue
          ) => {
            return Array.from({ length: dayCounts }, (_, i) => {
              const currentDay = new Date(getStartDate);
              currentDay.setDate(getStartDate.getDate() + i);
              return currentDay;
            }).reduce((acc, currentDay) => {
              const dayStr = `${currentDay.getDate()}-${
                currentDay.getMonth() + 1
              }-${currentDay.getFullYear()}`;

              const entry = item?.data?.find(({ date }) => {
                const entryDate = new Date(date);
                return (
                  entryDate.getDate() === currentDay.getDate() &&
                  entryDate.getMonth() === currentDay.getMonth() &&
                  entryDate.getFullYear() === currentDay.getFullYear()
                );
              });

              acc[dayStr] = extractValue(entry, currentDay);

              return acc;
            }, {});
          };

          const getVerify = processEntries(
            item,
            dayCounts,
            getStartDate,
            (entry) => {
              // return entry?.verify ?? null;
              return entry?.empWorkInfo?.[0]?.verify ?? null;
            }
          );

          // Function to get 'updatedAt' if 'verify' is "Yes", otherwise null
          const assignUpdaterDateTime = processEntries(
            item,
            dayCounts,
            getStartDate,
            (entry) => {
              // return entry?.verify === "Yes" ? entry.updatedAt : null;
              return entry?.empWorkInfo?.[0]?.verify === "Yes"
                ? entry.updatedAt
                : null;
            }
          );

          const jobcode = item?.data?.map(
            ({ empWorkInfo }) => empWorkInfo[0]?.JOBCODE
          );

          return {
            id: id,
            data: data,
            grouped: grouped,
            empName: empName,
            jobcode: jobcode[0] || "",
            dateForSelectMY: dateForSelectMY,
            ...selectedFields,
            // NORMALWORKHRSPERDAY: normalWorkHours,
            OVERTIMEHRS: overtimeHours,
            empLeaveCount: empLeaveCount,
            hollydayCounts: hollydayCounts,
            workingHrs: workingHrs,
            location: location,
            timeKeeper: timeKeeper,
            getVerify: getVerify,
            firstFileType: firstFileType,
            assignUpdaterDateTime: assignUpdaterDateTime,
          };
        }).filter(Boolean);

        await ProcessedDataFunc(transformedData);
      };
      if (convertedStringToArrayObj && convertedStringToArrayObj.length > 0) {
        fetchData();
      } else {
        ProcessedDataFunc(null);
      }
    }, [convertedStringToArrayObj]);
  } catch (err) {}
};
