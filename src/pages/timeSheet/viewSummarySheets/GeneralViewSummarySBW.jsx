import { generateClient } from "@aws-amplify/api";
import React, { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import {
  listEmpLeaveDetails,
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listLeaveStatuses,
} from "../../../graphql/queries";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { SearchBoxForTimeSheet } from "../../../utils/SearchBoxForTimeSheet";
import { SearchDisplayForTimeSheet } from "../timeSheetSearch/SearchDisplayForTS";
import { useFetchData } from "../customTimeSheet/UseFetchData";
import {
  dummyHolidayList,
  LocationData,
} from "../customTimeSheet/JobcodeAndLocation";
import { dummyLeaveStatus } from "../customTimeSheet/JobcodeAndLocation";

import { Link } from "react-router-dom";
const client = generateClient();
export const GeneralViewSummarySBW = () => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { convertedStringToArrayObj, getPosition } = useFetchData(
    "SBW",
    "viewTimeSheet"
  );

  function calculateTotalWorkingHours(data) {
    let totalHours = 0;

    for (const key in data) {
      const value = data[key];

      // Match patterns like x(0.5)9.5
      const xPattern = /^x\((\d+(\.\d+)?)\)(\d+(\.\d+)?)$/;
      const xMatch = value?.match(xPattern);
      if (xMatch) {
        totalHours += parseFloat(xMatch[3]);
        continue;
      }

      // Match patterns like "10"
      const numberPattern = /^\d+(\.\d+)?$/;
      if (value?.match(numberPattern)) {
        totalHours += parseFloat(value);
        continue;
      }

      // Match patterns like HAL5, HCL5, etc.
      const halPattern = /^H[A-Z]*\d+$/;
      if (value?.match(halPattern)) {
        const hours = parseFloat(value?.replace(/[^0-9]/g, ""));

        totalHours += hours;
        continue;
      }
    }

    return totalHours;
  }

  const [getStartDate, setGetStartDate] = useState(new Date("2024-9-23"));
  const [getEndDate, setGetEndDate] = useState(new Date("2024-10-20"));
  try {
    const fetchAllData = async (queryName) => {
      let allData = [];
      let nextToken = null;

      // Loop until all pages are fetched
      do {
        const response = await client.graphql({
          query: queryName,
          variables: { nextToken },
        });

        const items = response.data[Object.keys(response.data)[0]].items; // Extract items
        allData = [...allData, ...items]; // Append fetched items
        nextToken = response.data[Object.keys(response.data)[0]].nextToken; // Update nextToken
      } while (nextToken); // Continue fetching until no more pages

      return allData;
    };
    useEffect(() => {
      const fetchData = async () => {
        const [empPersonalInfos, empWorkInfos, leaveStatuses] =
          await Promise.all([
            fetchAllData(listEmpPersonalInfos),
            fetchAllData(listEmpWorkInfos),
            fetchAllData(listLeaveStatuses),
          ]);

        const mergedData = empPersonalInfos
          .map((candidate) => {
            const sapNoRemoved = empWorkInfos?.map((item) => {
              const { sapNo, ...rest } = item; // Destructure to exclude `sapNo`
              return rest; // Return the modified object without `sapNo`
            });

            const interviewDetails = sapNoRemoved.find(
              (item) => item.empID === candidate.empID
            );

            if (!interviewDetails) {
              return null;
            }

            return {
              ...candidate,
              ...interviewDetails,
              // ...leaveDetail,
            };
          })
          .filter((item) => item !== null); // Remove null values

        convertedStringToArrayObj.forEach((sheet) => {
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
            // console.error(
            //   `Error processing empWorkInfo for id ${sheet.id}:`,
            //   err
            // );
            // console.log("ERROR : ", err);
            return (sheet.empWorkInfo = sheet.empWorkInfo);
          }
        });

        // const leaveStatusData = leaveStatus?.data?.listLeaveStatuses?.items;
        const leaveStatusData = leaveStatuses;

        const approvedLeaveStatus = dummyLeaveStatus.filter(
          (fil) => fil.managerStatus === "Approved"
        );

        // Grouping data based on empID
        const groupBySapNo = (data) => {
          const grouped = data.reduce((acc, item) => {
            const key = String(item.empBadgeNo);

            let existingGroup = acc.find((group) => group.empBadgeNo === key);

            if (!existingGroup) {
              existingGroup = { empBadgeNo: key, data: [] };
              acc.push(existingGroup);
            }

            existingGroup.data.push(item);
            return acc;
          }, []);

          return grouped;
        };
        const grouped = groupBySapNo(convertedStringToArrayObj);

        // console.log("grouped : ", grouped);

        const seperateDateMethod = (inputData) => {
          return inputData
            .map((entry) => {
              // Group by Month/Year

              const groupedByMonthYear = entry.data.reduce((acc, record) => {
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

              // Construct final output for each Month/Year group
              return Object.entries(groupedByMonthYear).map(
                ([monthYear, records]) => ({
                  empBadgeNo: entry.empBadgeNo,

                  data: records,
                })
              );
            })
            .flat();
        };
        const seperatedEmpByDate = seperateDateMethod(grouped);
        // console.log("seperatedEmpByDate : ", seperatedEmpByDate);

        function groupByEmpIdAndLocation(dataArray) {
          const groupedData = new Map();
          const ungroupedData = [];

          dataArray.forEach((emp) => {
            emp.data.forEach((dataEntry) => {
              // Check if empWorkInfo exists and is an array
              if (
                Array.isArray(dataEntry.empWorkInfo) &&
                dataEntry.empWorkInfo
              ) {
                // Process entries with valid empWorkInfo
                dataEntry.empWorkInfo.forEach((job) => {
                  const location = job?.LOCATION || "";
                  const jobcode = job?.JOBCODE || "";
                  const dateObj = new Date(dataEntry.date);
                  const monthYearKey = `${dateObj.getFullYear()}-${
                    dateObj.getMonth() + 1
                  }`;
                  const key = `${emp.empBadgeNo}-${location}-${jobcode}-${monthYearKey}`;

                  if (!groupedData.has(key)) {
                    groupedData.set(key, {
                      empBadgeNo: emp.empBadgeNo,
                      data: [],
                    });
                  }

                  // Add the current dataEntry to the group
                  const group = groupedData.get(key);
                  group.data.push({
                    ...dataEntry,
                    empWorkInfo: [job], // Include only the current job entry
                  });
                });
              } else {
                // Handle entries with no or invalid empWorkInfo
                ungroupedData.push({
                  empBadgeNo: emp.empBadgeNo,
                  data: [{ ...dataEntry, empWorkInfo: [] }],
                });
              }
            });
          });

          // Combine grouped data with ungrouped data
          return [...Array.from(groupedData.values()), ...ungroupedData];
        }
        const seperatedGroupedData =
          groupByEmpIdAndLocation(seperatedEmpByDate);

        const merged = mergedData.flatMap((val) => {
          // Filter all matching entries from approvedLeaveStatus
          const matches = approvedLeaveStatus.filter(
            (so) => val.empID === so.empID
          );

          if (matches.length > 0) {
            // Map over matches and merge each one with the current `val`
            return matches.map((match) => ({
              ...val,
              ...match,
            }));
          }

          // If no match is found, just return the original `val`
          return [val];
        });

        // seperatedGroupedData
        const filteredData = merged.filter((leave) => {
          return seperatedGroupedData.some((emp) => {
            // console.log(leave.empBadgeNo === emp.badge)
            if (leave.empBadgeNo === emp.empBadgeNo) {
              // console.log(leave.empBadgeNo, " | ", emp.badge);

              return emp.data.some((entry) => {
                const leaveDate = new Date(leave.toDate);
                const empDate = new Date(entry.date);

                return (
                  leaveDate.getFullYear() === empDate.getFullYear() &&
                  leaveDate.getMonth() === empDate.getMonth()
                );
              });
            }
            return false;
          });
        });

        console.log("filteredData : ", filteredData);

        const leaveCounts = filteredData.reduce((acc, entry) => {
          const { empBadgeNo, leaveType } = entry;

          // Ensure an entry exists for the sapNo
          if (!acc[empBadgeNo]) {
            acc[empBadgeNo] = {};
          }

          // Increment the count for the specific leaveType
          acc[empBadgeNo][leaveType] = (acc[empBadgeNo][leaveType] || 0) + 1;

          return acc;
        }, {});

        const leaveCount = Object.entries(leaveCounts).map(
          ([empBadgeNo, leaveTypes]) => ({
            empBadgeNo,
            leaveCounts: leaveTypes,
          })
        );

        const leaveTypeAbbreviation = {
          "Annual Leave": "AL",
          "Compassionate Leave": "CL",
          "Unpaid Authorise Leave": "UAL",
          "Sick Leave": "SL",
        };

        const isHalfDayLeave = (abbreviation) =>
          ["HAL", "HCL", "HUAL", "HSL"].some((prefix) =>
            abbreviation?.startsWith?.(prefix)
          );

        const transformData = (inputData) => {
          const result = {};

          inputData.forEach((entry) => {
            const { empID, empBadgeNo, leaveType, fromDate, toDate, days } =
              entry;

            if (!result[empID]) {
              result[empID] = {
                empBadgeNo: empBadgeNo,
                leaveCounts: {},
                dateDifferences: [],
              };
            }

            // Handle leaveCounts
            if (isHalfDayLeave(leaveTypeAbbreviation[leaveType])) {
              result[empID].leaveCounts[leaveType] =
                (result[empID].leaveCounts[leaveType] || 0) + 0.5;
            } else if (!(leaveType === "Compassionate Leave" && days === 0.5)) {
              result[empID].leaveCounts[leaveType] =
                (result[empID].leaveCounts[leaveType] || 0) + 1;
            }

            // Generate listDate and calculate days difference
            result[empID].dateDifferences.push({
              leaveType,
              fromDate,
              toDate,
              listDate: generateDateList(
                fromDate,
                toDate,
                leaveTypeAbbreviation[leaveType],
                days === 0.5 // Pass half-day indicator
              ),
              daysDifference: days,
            });
          });

          // Sum up all specific half-day leaves and update leaveCounts
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

        // Mock function to generate listDate
        const generateDateList = (
          fromDate,
          toDate,
          abbreviation,
          isHalfDay
        ) => {
          const start = new Date(fromDate);
          const end = new Date(toDate);
          const listDate = {};

          while (start <= end) {
            const dayStr = `${start.getDate()}-${
              start.getMonth() + 1
            }-${start.getFullYear()}`;
            listDate[dayStr] = isHalfDay ? `H${abbreviation}4` : abbreviation;
            start.setDate(start.getDate() + 1);
          }

          return listDate;
        };

        const leaveCount_ = transformData(filteredData);
        console.log("leaveCount_ : ", leaveCount_);
        console.log("seperatedGroupedData : ", seperatedGroupedData);
        //
        const holidayDates = dummyHolidayList.CompanyHolidays2025.flatMap(
          (holiday) => holiday.dates || [holiday.date]
        );

        const formattedHolidayDates = holidayDates.map((dateStr) => {
          const parts = dateStr.split(",")[1].trim(); // Extract "1st October 2024"
          const [day, month, year] = parts.split(" "); // Split into day, month, and year
          const dayNumber = day.replace(/\D/g, ""); // Remove non-numeric characters from the day
          const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1; // Convert month name to number
          return `${year}-${monthNumber}-${dayNumber}`; // Format as "MM/DD/YYYY"
        });
        console.log(formattedHolidayDates);
        // const getStartDate = new Date("2024-9-21");
        // const getEndDate = new Date("2024-10-20");

        // Calculate number of days in the range
        const dayCount =
          (getEndDate - getStartDate) / (1000 * 60 * 60 * 24) + 1; // Include both start and end dates
        const addLeaveTypeCount = seperatedGroupedData.map((val) => {
          const empLeaveCount = leaveCount_.find(
            (fi) => val.empBadgeNo === fi.empBadgeNo
          );
          const workInfoData = mergedData?.find(
            (fi) => val.empBadgeNo === fi.empBadgeNo
          );
          const getDate = val.data.find((f) => f);

          const res = getDate.empWorkInfo.map((val) => val?.LOCATION);
          const jobcode = getDate.empWorkInfo.map((val) => val?.JOBCODE);

          const workingHrs = Array.from({ length: dayCount }, (_, i) => {
            const currentDay = new Date(getStartDate);
            currentDay.setDate(getStartDate.getDate() + i); // Increment date
            return currentDay;
          }).reduce((acc, currentDay) => {
            // const dayStr = currentDay.getDate().toString();
            const monthKey = currentDay.getMonth() + 1; // Month index starts at 0, so add 1
            const dayStr = `${currentDay.getDate()}-${monthKey}-${currentDay.getFullYear()}`;

            // Format key as "MM-DD"
            const entry = val.data.find(
              ({ date }) => new Date(date).getDate() === currentDay.getDate()
            );

            // const dayOfWeek = currentDay.toLocaleDateString("en-US", {
            //   weekday: "long",
            // }); // Get the day name
            const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
              weekday: "long",
            }).format(currentDay);

            const checkEntry = entry?.empWorkInfo[0]?.WORKINGHRS;

            const isPublicHoliday = formattedHolidayDates.some(
              (formattedDate) => {
                const formattedDateObject = new Date(formattedDate);
                const formattedDay = `${formattedDateObject.getDate()}-${
                  formattedDateObject.getMonth() + 1
                }-${formattedDateObject.getFullYear()}`;
                return formattedDay === dayStr;
              }
            );

            // Check if the current day is in the leave list for the employee
            let leaveType = null;
            if (empLeaveCount) {
              empLeaveCount.dateDifferences.forEach((leave) => {
                if (leave.listDate.hasOwnProperty(dayStr)) {
                  leaveType = leave.listDate[dayStr]; // Get leave type (e.g., "UAL", "CL")
                }
              });
            }

            // Prioritize conditions
            if (checkEntry) {
              // If there are working hours, prioritize them
              const workingHrs = parseFloat(checkEntry);
              if (workingHrs < (entry?.normalWorkHrs || 0)) {
                const absence = (
                  (entry?.normalWorkHrs || 0) - workingHrs
                ).toFixed(1);
                acc[dayStr] = `x(${absence})${workingHrs}`; // Format as "absence(workingHrs)"
              } else {
                acc[dayStr] = workingHrs.toString();
              }
            } else if (isPublicHoliday) {
              acc[dayStr] = "PH";
            } else if (leaveType) {
              acc[dayStr] = leaveType; // Use leave type if available
            } else if (dayOfWeek === "Saturday") {
              const result = parseFloat(entry?.normalWorkHrs) / 2;
              // console.log(workInfoData?.salaryType);
              acc[dayStr] =
                !checkEntry &&
                workInfoData?.salaryType[
                  workInfoData?.salaryType.length - 1
                ] === "Monthly"
                  ? "PHD"
                  : !checkEntry &&
                    workInfoData?.salaryType[
                      workInfoData?.salaryType.length - 1
                    ] === "D"
                  ? "OFF"
                  : result === parseInt(checkEntry)
                  ? "HPHD"
                  : checkEntry; // Set 'OFF' if workingHrs is empty
            } else if (dayOfWeek === "Sunday") {
              // Sunday condition: Leave blank
              acc[dayStr] = "";
            } else {
              // Default condition: Mark as "A" (absent)
              acc[dayStr] = "A";
            }

            return acc;
          }, {});
          const keysToCount = ["OFF", "PH", "PHD", "A"];

          const countOccurrences = (data, keys) => {
            const values = Object.values(data);
            return keys?.reduce((counts, key) => {
              counts[key] = values?.filter((value) => value === key).length;
              return counts;
            }, {});
          };

          const holidaysAndAbsent = countOccurrences(workingHrs, keysToCount);

          const countLeaveTypes = () => {
            let newLeaveCount = {
              AL: 0,
              CL: 0,
              UAL: 0,
              SL: 0,
            };

            for (const date in workingHrs) {
              const value = workingHrs[date];

              // Check for specific leave types (AL, CL, UAL, SL)
              if (value?.startsWith("HAL")) {
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

          return empLeaveCount
            ? {
                ...val,
                workingHrs: workingHrs,
                // leaveCounts: empLeaveCount.leaveCounts,
                leaveCounts: leaveCounts,
                hollydayCounts: holidaysAndAbsent,
                newDate: getDate.date,
                location: res?.[0],
                jobcode: jobcode?.[0],
                // dateDifferences:empLeaveCount.dateDifferences,
              }
            : {
                ...val,
                hollydayCounts: holidaysAndAbsent,
                workingHrs: workingHrs,
                leaveCounts: {},
                newDate: getDate.date,
                location: res?.[0],
                jobcode: jobcode?.[0],
              };
        });

        // Example usage:
        console.log(addLeaveTypeCount);

        // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

        // function assignLeaveToWorkingHrs(leaveStatus_, addLeaveTypeCount) {
        //   // Iterate through each employee in addLeaveTypeCount
        //   addLeaveTypeCount.forEach((empData) => {
        //     // Find the matching employee in leaveStatus_
        //     const matchingLeaveData = leaveStatus_.find(
        //       (leave) => leave.empBadgeNo === empData.empBadgeNo
        //     );

        //     if (matchingLeaveData) {
        //       // Iterate through dateDifferences for the matching employee
        //       matchingLeaveData.dateDifferences.forEach((leave) => {
        //         // For each leaveType, get the corresponding listDate
        //         const listDate = leave.listDate;

        //         // Iterate through listDate keys and assign the values to workingHrs in addLeaveTypeCount
        //         Object.keys(listDate).forEach((day) => {
        //           if (
        //             empData.workingHrs[day] === "A" ||
        //             empData.workingHrs[day] !== "PH"
        //             //      ||
        //             //  !/^(x\(\d+\)\d+|\d+)$/.test(empData.workingHrs[day])
        //           ) {
        //             empData.workingHrs[day] = listDate[day];
        //           }
        //         });
        //       });
        //     }
        //   });
        //   return addLeaveTypeCount;
        // }

        // // Example usage
        // const updatedSeperatedData = await assignLeaveToWorkingHrs(
        //   leaveCount_,
        //   addLeaveTypeCount
        // );
        // console.log(updatedSeperatedData);
        const sameAddLeaveTypeCount = addLeaveTypeCount;
        // // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        const processWorkingHrs = async (addLeaveTypeCount) => {
          return await addLeaveTypeCount?.map((entry) => {
            // Process only if empBadgeNo matches
            sameAddLeaveTypeCount?.forEach((item) => {
              if (entry?.empBadgeNo === item?.empBadgeNo) {
                Object.keys(entry.workingHrs).forEach((key) => {
                  // Check if any other value for the same key across the data is not "A"
                  const hasValidValue = sameAddLeaveTypeCount?.some(
                    (item) =>
                      (item?.empBadgeNo === entry?.empBadgeNo &&
                        item.workingHrs[key] &&
                        item.workingHrs[key] !== "A") 
                  );

                  if (
                    // item.workingHrs[key] === "UAL" ||
                   ( item.workingHrs[key] === "A" ) &&
                    hasValidValue
                  ) {
                    entry.workingHrs[key] = "0";
                  }
                });
              }
            });
            return entry;
          });
        };

        const FinalData = await processWorkingHrs(addLeaveTypeCount);
        console.log("FinalData : ", FinalData);
        // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

        // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

        const transformedData = addLeaveTypeCount
          .map((item) => {
            const initialMatch = mergedData?.find(
              (datasetItem) => datasetItem.empBadgeNo === item.empBadgeNo
            );

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

            const empName = item?.data?.map((m) => m.empName);

            const empLeaveCount = item?.leaveCounts;
            const workingHrs = item?.workingHrs;
            const dateForSelectMY = item?.newDate;
            const location = item?.location;
            const hollydayCounts = item?.hollydayCounts;

            const overtimeHours = Array.from({ length: dayCount }, (_, i) => {
              const currentDay = new Date(getStartDate);
              currentDay.setDate(getStartDate.getDate() + i); // Increment date
              return currentDay;
            }).reduce((acc, currentDay) => {
              // Create the key in "day-month-year" format
              const dayStr = `${currentDay.getDate()}-${
                currentDay.getMonth() + 1
              }-${currentDay.getFullYear()}`;

              // Find matching data for the current day
              const entry = item?.data?.find(({ date }) => {
                const entryDate = new Date(date);
                return (
                  entryDate.getDate() === currentDay.getDate() &&
                  entryDate.getMonth() === currentDay.getMonth() &&
                  entryDate.getFullYear() === currentDay.getFullYear()
                );
              });

              // Initialize overtime hours from the entry
              const overtimeHours = entry?.empWorkInfo[0]?.OVERTIMEHRS
                ? parseInt(entry.empWorkInfo[0].OVERTIMEHRS)
                : null;

              // Add the overtime hours to the accumulator
              if (overtimeHours !== null || overtimeHours !== undefined) {
                acc[dayStr] = overtimeHours;
              } else {
                acc[dayStr] = 0; // Default to "A" if no overtime
              }

              return acc;
            }, {});

            const jobcode = item.data.map(
              ({ empWorkInfo }) => empWorkInfo[0]?.JOBCODE
            );

            return {
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
            };
          })
          .filter(Boolean);

        console.log(transformedData);
        setData(transformedData);
        setSecondaryData(transformedData);
      };

      fetchData();
    }, [convertedStringToArrayObj]);
  } catch (err) {
    console.log("ERROR : ", err);
  }

  try {
    useEffect(() => {
      if (!secondaryData || secondaryData.length === 0) return;

      let filteredData = [...secondaryData];

      // Filter by selectedLocation if it's not "All"
      if (selectedLocation && selectedLocation !== "All Location") {
        filteredData = filteredData.filter(
          (item) => item.location === selectedLocation
        );
      }

      if (!startDate) {
        // Reset to filtered data if startDate is empty
        setData(filteredData);
      } else {
        // Filter data based on startDate
        const inputDate = new Date(startDate);

        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.dateForSelectMY);
          return (
            itemDate.getMonth() === inputDate.getMonth() &&
            itemDate.getFullYear() === inputDate.getFullYear()
          );
        });

        setData(filteredData);
      }
    }, [startDate, secondaryData, selectedLocation]);
  } catch (err) {}
  const searchResult = async (searchedData) => {
    try {
      const result = await searchedData;
      setData(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const selectLocation = async (loca) => {
    try {
      const result = await loca;
      // console.log(loca.location);
      setSelectedLocation(result.location);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Calculate the number of days in the range (inclusive of both start and end dates)
  const dayCounts =
    Math.ceil((getEndDate - getStartDate) / (1000 * 60 * 60 * 24)) + 1;
  return (
    <div className="bg-[#fafaf6] h-screen">
      <div className="screen-size p-4">
        <header className="m-5 flex justify-between">
          <div className=" flex items-center">
            <Link to="/timeSheet" className="text-xl flex-1 text-grey">
              <FaArrowLeft />
            </Link>
          </div>
          <header className="flex justify-center text_size_2 py-5 text-dark_grey ">
            <p>View Time Sheet Summary</p>
          </header>
          <div></div>
        </header>
        <div className="flex  justify-between items-center w-full mb-5">
          <div className="flex justify-start gap-4 ">
            <div className="relative grid grid-cols-1 ">
              <label className="text_size_6">Start Date</label>
              {/* <br /> */}
              <input
                type="date"
                className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="relative grid grid-cols-1 ">
              <label className="text_size_6">End Date</label>
              {/* <br /> */}
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
                searchResult={selectLocation}
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
        <div className="overflow-auto max-h-[60vh] ">
          <table className="min-w-full text-sm bg-white ">
            <thead className="bg-[#949393] ">
              <tr className=" text-white">
                <th className="border px-2 py-1 border-dark_grey" rowSpan="2">
                  Employee Name
                </th>
                <th className="border px-2 py-1 border-dark_grey" rowSpan="2">
                  Project
                </th>
                {/* {Array.from({ length: 31 }, (_, i) => (
                  <th className="border px-2 py-1 border-dark_grey" key={i}>
                    {i + 1}
                  </th>
                ))} */}
                {Array.from({ length: dayCounts }, (_, i) => {
                  const currentDay = new Date(getStartDate);
                  currentDay.setDate(getStartDate.getDate() + i); // Increment the date
                  return (
                    <th
                      className="border px-2 py-1 border-dark_grey"
                      key={currentDay.toDateString()} // Unique key for each column
                    >
                      {currentDay.getDate()}
                    </th>
                  );
                })}
                <th className="border  px-2 py-1 border-dark_grey">NH</th>
                <th className="border  px-2 py-1 border-dark_grey">ND</th>
                <th className="border  px-2 py-1 border-dark_grey">PH</th>
                <th className="border  px-2 py-1 border-dark_grey">PH-D</th>
                <th className="border  px-2 py-1 border-dark_grey">AL/CL</th>
                <th className="border  px-2 py-1 border-dark_grey">SL</th>
                <th className="border  px-2 py-1 border-dark_grey">OFF</th>
                <th className="border  px-2 py-1 border-dark_grey">A</th>
                <th className="border  px-2 py-1 border-dark_grey">UAL</th>
                <th className="border  px-2 py-1 border-dark_grey">OT</th>
                <th className="border  px-2 py-1 border-dark_grey">Verified</th>
                <th className="border  px-2 py-1 border-dark_grey">Updater</th>
              </tr>
            </thead>

            <tbody>
              {data && data?.length > 0 ? (
                data.map((employee, index) => {
                  // const normalWorkHours = Object.values(
                  //   employee.NORMALWORKHRSPERDAY || {}
                  // );
                  // const totalHours = normalWorkHours.reduce(
                  //   (acc, hour) => acc + parseInt(hour || 0, 10),
                  //   0
                  // );
                  // const NormalDays = normalWorkHours.length;

                  const totalOT = Object.values(
                    employee?.OVERTIMEHRS || {}
                  ).reduce((acc, ot) => acc + parseInt(ot || 0), 0);

                  const getTotalHours =
                    calculateTotalWorkingHours(employee?.workingHrs) || 0;
                  const roundedNumberOfTotalHours = Number(
                    getTotalHours.toFixed(2)
                  );
                  const totalHours = roundedNumberOfTotalHours;

                  const getNormalDays =
                    totalHours / parseFloat(employee?.workHrs) || 0;
                  const roundedNumber = Number(getNormalDays.toFixed(2));
                  const NormalDays = roundedNumber;

                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td
                          className="border px-2 py-3 text-center"
                          rowSpan="2"
                        >
                          <span>{employee.name || ""}</span>
                          <br />
                          <span>
                            {`Badge# : ${employee.empBadgeNo || ""} | SapID : ${
                              employee.sapNo || ""
                            }`}
                          </span>
                          <br />
                          <span>{`Hours/Day : ${employee.workHrs || ""}`}</span>
                          <span>{`Days/Month : ${
                            employee.workMonth || ""
                          }`}</span>
                          <br />
                          <span>
                            {`SalaryType : ${employee.salaryType || ""}`}
                          </span>
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee.jobcode}
                        </td>

                        {Array.from({ length: dayCounts }, (_, i) => {
                          const currentDay = new Date(getStartDate); // Assume getStartDate is a valid Date object
                          currentDay.setDate(getStartDate.getDate() + i); // Increment the date

                          // Format the key as "day-month-year"
                          const currentDayKey = `${currentDay.getDate()}-${
                            currentDay.getMonth() + 1
                          }-${currentDay.getFullYear()}`;

                          return (
                            <td
                              className="border px-2 py-1 border-dark_grey"
                              key={currentDayKey} // Unique key for each column
                            >
                              {employee?.workingHrs?.[currentDayKey] || ""}{" "}
                            </td>
                          );
                        })}
                        <td className="border px-2 py-1" rowSpan="2">
                          {totalHours}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {NormalDays}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.hollydayCounts?.PH || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.hollydayCounts?.PHD || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {`${employee?.empLeaveCount?.AL || 0} /
                            ${employee?.empLeaveCount?.CL || 0} `}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee.empLeaveCount?.SL || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.hollydayCounts?.OFF || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.hollydayCounts?.A || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.empLeaveCount?.UAL || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {totalOT || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          yes
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          updater
                        </td>
                      </tr>
                      <tr>
                        {Array.from({ length: dayCounts }, (_, i) => {
                          const currentDay = new Date(getStartDate); // Assume getStartDate is a valid Date object
                          currentDay.setDate(getStartDate.getDate() + i); // Increment the date

                          // Format the key as "day-month-year"
                          const currentDayKey = `${currentDay.getDate()}-${
                            currentDay.getMonth() + 1
                          }-${currentDay.getFullYear()}`;

                          return (
                            <td
                              className="border px-2 py-1 border-dark_grey"
                              key={currentDayKey} // Unique key for each column
                            >
                              {employee?.OVERTIMEHRS?.[currentDayKey] || "0"}{" "}
                              {/* Use '0' if no value is found */}
                            </td>
                          );
                        })}
                        {/* ))} */}
                      </tr>
                      <tr>
                        <td className="border px-2 py-1" colSpan={1}>
                          Total
                        </td>

                        {Array.from({ length: dayCounts + 1 }, (_, i) => {
                          const currentDayIndex = i + 1;

                          return (
                            <td
                              className={`${i === 0 ? "border" : "border-b"}`}
                              key={currentDayIndex} // Unique key for each column
                            ></td>
                          );
                        })}
                        {/* ))} */}
                        <td className="border px-2 py-1">{totalHours}</td>
                        <td className="border px-2 py-1">{NormalDays}</td>

                        <td className="border px-2 py-1">
                          {employee?.hollydayCounts?.PH || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee?.hollydayCounts?.PHD || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {`${employee.empLeaveCount.AL || 0} /
                            ${employee.empLeaveCount.CL || 0}`}
                        </td>
                        <td className="border px-2 py-1">
                          {employee.empLeaveCount?.SL || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee?.hollydayCounts?.OFF || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee?.hollydayCounts?.A || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee?.empLeaveCount?.UAL || 0}
                        </td>
                        <td className="border px-2 py-1">{totalOT}</td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                      </tr>
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="50"
                    className="px-6 py-3 text-center text-dark_ash text_size_5"
                  >
                    <p className="px-6 py-6">No Table Data Available Here.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <footer className="flex justify-center py-10 space-x-10">
          <button
            className=" rounded text_size_5 text-dark_grey bg-primary px-3 py-2 w-[180px]"
            // onClick={exportToPDF}
          >
            Verify
          </button>
          <button
            className=" rounded text_size_5 text-dark_grey bg-primary px-3 py-2 w-[180px]"
            // onClick={exportToPDF}
          >
            Download
          </button>
        </footer>
      </div>
    </div>
  );
};
