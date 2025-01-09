import { generateClient } from "@aws-amplify/api";
import React, { useEffect } from "react";

import {
  listEmpLeaveDetails,
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listLeaveStatuses,
} from "../../../graphql/queries";

import "jspdf-autotable";

import { useTempID } from "../../../utils/TempIDContext";
import { GetViewSummaryUpdater } from "../customTimeSheet/GetViewSummaryUpdater";
const client = generateClient();
export const ApplyVSFunction = ({
  convertedStringToArrayObj,
  ProcessedDataFunc,
  dummyHolidayList,
  dummyLeaveStatus,
  dayCounts,
}) => {
  const { getStartDate, getEndDate } = useTempID();

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

        const approvedLeaveStatus = leaveStatusData.filter(
          (fil) => fil.managerStatus === "Approved"
        );

        // You can use this function to all Excel Sheet
        // Grouping data based on empID

        // const groupBySapNo = (data) => {
        //   const grouped = data.reduce((acc, item) => {
        //     const keyOfEmpBadgeNo = String(item.empBadgeNo);
        //     const keyOfFidNo = String(item.fidNo);
        //     let existingGroup = null;
        //     if (keyOfEmpBadgeNo) {
        //       existingGroup = acc.find(
        //         (group) => group.empBadgeNo === keyOfEmpBadgeNo
        //       );
        //     } else {
        //       existingGroup = acc.find((group) => group.fidNo === keyOfFidNo);
        //     }

        //     if (!existingGroup) {
        //       existingGroup = { empBadgeNo: keyOfEmpBadgeNo, data: [] };
        //       acc.push(existingGroup);
        //     }

        //     existingGroup.data.push(item);
        //     return acc;
        //   }, []);

        //   return grouped;
        // };
        // const grouped = groupBySapNo(convertedStringToArrayObj);
        const groupBySapNo = (data) => {
          return data?.reduce((acc, item) => {
            // Determine key based on empBadgeNo or fidNo
            const key = item.empBadgeNo
              ? `empBadgeNo-${item.empBadgeNo}`
              : `fidNo-${item.fidNo}`;

            // Initialize group if it doesn't exist
            if (!acc[key]) {
              acc[key] = {
                empBadgeNo: item.empBadgeNo || null, // Include empBadgeNo if available
                fidNo: item.fidNo || null, // Include fidNo if available
                data: [],
              };
            }

            // Push the current item into the group
            acc[key].data.push(item);

            return acc;
          }, {});
        };

        // Convert grouped object into an array
        const grouped = Object.values(
          groupBySapNo(convertedStringToArrayObj || [])
        );

        console.log("grouped : ", grouped);

        const seperateDateMethod = (inputData) => {
          return inputData
            .map((entry) => {
              // Group by Month/Year

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

              // Construct final output for each Month/Year group
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
                  const key = `${emp.empBadgeNo}-${emp.fidNo}-${location}-${jobcode}-${monthYearKey}`;

                  if (!groupedData.has(key)) {
                    groupedData.set(key, {
                      empBadgeNo: emp.empBadgeNo || null,
                      fidNo: emp.fidNo || null,
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
                  fidNo: emp.fidNo || null,
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
        console.log(seperatedGroupedData);
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
        console.log(merged);
        const filteredData = merged.filter((leave) => {
          return seperatedGroupedData.some((emp) => {
            // console.log(leave.empBadgeNo === emp.badge)
            const empBadgeNoMatch =
              leave.empBadgeNo &&
              emp.empBadgeNo &&
              String(leave.empBadgeNo) === String(emp.empBadgeNo);

            const sapNoMatch =
              leave.sapNo &&
              emp.fidNo &&
              String(leave.sapNo) === String(emp.fidNo);
            if (empBadgeNoMatch || sapNoMatch) {
              // console.log(leave.empBadgeNo, " | ", emp.badge);
              //   console.log(typeof leave.sapNo, " : ", typeof emp.fidNo);
              return emp.data.some((entry) => {
                const leaveDate = new Date(leave.toDate);
                const empDate = new Date(entry.date);

                // console.log(leaveDate.getMonth() ,":", empDate.getMonth());

                // console.log(
                //   "empDate : ",
                //   empDate.toLocaleDateString(),
                //   " | ",
                //   "leaveDate : ",
                //   leaveDate.toLocaleDateString()
                // );

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

        // const leaveCounts = filteredData.reduce((acc, entry) => {
        //   const { empBadgeNo, leaveType } = entry;

        //   // Ensure an entry exists for the sapNo
        //   if (!acc[empBadgeNo]) {
        //     acc[empBadgeNo] = {};
        //   }

        //   // Increment the count for the specific leaveType
        //   acc[empBadgeNo][leaveType] = (acc[empBadgeNo][leaveType] || 0) + 1;

        //   return acc;
        // }, {});

        // const leaveCount = Object.entries(leaveCounts).map(
        //   ([empBadgeNo, leaveTypes]) => ({
        //     empBadgeNo,
        //     leaveCounts: leaveTypes,
        //   })
        // );

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
            const {
              empID,
              empBadgeNo,
              fidNo,
              leaveType,
              fromDate,
              toDate,
              days,
            } = entry;

            if (!result[empID]) {
              result[empID] = {
                empBadgeNo: empBadgeNo,
                fidNo: fidNo,
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

        // const dayCounts = null;
        // useEffect(() => {
        //   if (getEndDate && getStartDate) {
        // const dayCount = dayCounts;
        const dayCount =
          (getEndDate - getStartDate) / (1000 * 60 * 60 * 24) + 1; // Include both start and end dates
        //   }
        // }, [getStartDate, getEndDate]);

        const addLeaveTypeCount = seperatedGroupedData.map((val) => {
          //   const empLeaveCount = leaveCount_.find(
          //     (fi) => val.empBadgeNo === fi.empBadgeNo
          //   );

          const empLeaveCount = leaveCount_.find((fi) => {
            if (
              val.empBadgeNo &&
              fi.empBadgeNo &&
              val.empBadgeNo === fi.empBadgeNo
            ) {
              return fi;
            } else if (val.fidNo && fi.sapNo && val.fidNo === fi.sapNo) {
              return fi;
            }
          });

          //   const workInfoData = mergedData?.find(
          //     (fi) => val.empBadgeNo === fi.empBadgeNo
          //   );

          const workInfoData = mergedData?.find((fi) => {
            if (
              val.empBadgeNo &&
              fi.empBadgeNo &&
              val.empBadgeNo === fi.empBadgeNo
            ) {
              return fi;
            } else if (val.fidNo && fi.sapNo && val.fidNo === fi.sapNo) {
              return fi;
            }
          });
          const getDate = val.data.find((f) => f);

          const res = getDate.empWorkInfo.map((val) => val?.LOCATION);
          const jobcode = getDate.empWorkInfo.map((val) => val?.JOBCODE);

          const workingHrs = Array.from({ length: dayCounts }, (_, i) => {
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

            const salaryType =
              workInfoData?.salaryType[
                workInfoData?.salaryType.length - 1
              ]?.toLowerCase(); // Convert to lowercase for case-insensitive matching

            // Define salary type categories
            const monthlyTypes = ["monthly", "month", "m"];
            const dailyTypes = ["daily", "day", "d"];

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
              console.log(workInfoData?.salaryType);

              // Extract salary type and normalize it to lowercase
              const salaryType =
                workInfoData?.salaryType[
                  workInfoData?.salaryType.length - 1
                ]?.toLowerCase(); // Convert to lowercase for case-insensitive matching

              // Define salary type categories
              const monthlyTypes = ["monthly", "month", "m"];
              const dailyTypes = ["daily", "day", "d"];

              // Evaluate conditions
              if (!checkEntry && monthlyTypes.includes(salaryType)) {
                acc[dayStr] = "PHD";
              } else if (!checkEntry && dailyTypes.includes(salaryType)) {
                acc[dayStr] = "OFF";
              } else if (result === parseInt(checkEntry)) {
                acc[dayStr] = "HPHD";
              } else {
                acc[dayStr] = checkEntry; // Default to checkEntry
              }
            } else if (dayOfWeek === "Sunday") {
              // Sunday condition: Leave blank
              acc[dayStr] = "";
            } else {
              // Default condition: Mark as "A" (absent)
              acc[dayStr] = "A";
            }

            return acc;
          }, {});
          //   const keysToCount = ["OFF", "PH", "PHD", "A"];

          //   const countOccurrences = (data, keys) => {
          //     const values = Object.values(data);
          //     return keys?.reduce((counts, key) => {
          //       counts[key] = values?.filter((value) => value === key).length;
          //       return counts;
          //     }, {});
          //   };

          //   const holidaysAndAbsent = countOccurrences(workingHrs, keysToCount);

          //   const countLeaveTypes = () => {
          //     let newLeaveCount = {
          //       AL: 0,
          //       CL: 0,
          //       UAL: 0,
          //       SL: 0,
          //     };

          //     for (const date in workingHrs) {
          //       const value = workingHrs[date];

          //       // Check for specific leave types (AL, CL, UAL, SL)
          //       if (value?.startsWith("HAL")) {
          //         newLeaveCount.AL += 0.5;
          //       } else if (value === "AL") {
          //         newLeaveCount.AL += 1;
          //       } else if (value?.startsWith("HCL")) {
          //         newLeaveCount.CL += 0.5;
          //       } else if (value === "CL") {
          //         newLeaveCount.CL += 1;
          //       } else if (value?.startsWith("HSL")) {
          //         newLeaveCount.SL += 0.5;
          //       } else if (value === "SL") {
          //         newLeaveCount.SL += 1;
          //       } else if (value?.startsWith("HUAL")) {
          //         newLeaveCount.UAL += 0.5;
          //       } else if (value === "UAL") {
          //         newLeaveCount.UAL += 1;
          //       }
          //     }
          //     return newLeaveCount;
          //   };
          //   const leaveCounts = countLeaveTypes();

          return empLeaveCount
            ? {
                ...val,
                workingHrs: workingHrs,
                leaveCounts: empLeaveCount.leaveCounts,
                // leaveCounts: leaveCounts,
                // hollydayCounts: holidaysAndAbsent,
                newDate: getDate.date,
                location: res?.[0],
                jobcode: jobcode?.[0],
                // dateDifferences:empLeaveCount.dateDifferences,
              }
            : {
                ...val,
                // hollydayCounts: holidaysAndAbsent,
                workingHrs: workingHrs,
                leaveCounts: {},
                newDate: getDate.date,
                location: res?.[0],
                jobcode: jobcode?.[0],
              };
        });

        // Example usage:
        console.log(addLeaveTypeCount);

        // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        // const sameAddLeaveTypeCount = addLeaveTypeCount;
        // // // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        // const processWorkingHrs = async (addLeaveTypeCount) => {
        //   return await addLeaveTypeCount?.map((entry) => {
        //     // Process only if empBadgeNo matches
        //     sameAddLeaveTypeCount?.forEach((item) => {
        //       if (entry?.empBadgeNo === item?.empBadgeNo) {
        //         Object.keys(entry.workingHrs).forEach((key) => {
        //           // Check if any other value for the same key across the data is not "A"
        //           const hasValidValue = sameAddLeaveTypeCount?.some(
        //             (item) =>
        //               (item?.empBadgeNo === entry?.empBadgeNo &&
        //                 item.workingHrs[key] &&
        //                 item.workingHrs[key] !== "A")
        //           );

        //           if (
        //             // item.workingHrs[key] === "UAL" ||
        //            ( item.workingHrs[key] === "A" ) &&
        //             hasValidValue
        //           ) {
        //             entry.workingHrs[key] = "0";
        //           }
        //         });
        //       }
        //     });
        //     return entry;
        //   });
        // };

        // const FinalData = await processWorkingHrs(addLeaveTypeCount);
        // console.log("FinalData : ", FinalData);
        // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
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
                // Compare only different objects

                // Check if empBadgeNo, date, and different jobcode match
                if (
                  data.empBadgeNo === compareData.empBadgeNo &&
                  //   data.date === compareData.date &&
                  data.jobcode !== compareData.jobcode
                ) {
                  // Iterate through workingHrs keys (dates)
                  Object.keys(data.workingHrs).forEach((dateKey) => {
                    const value = data.workingHrs[dateKey];
                    const compareValue = compareData.workingHrs[dateKey];

                    // Condition to check for the specific patterns
                    const regex = /^x\(\d+(\.\d+)?\)\d+(\.\d+)?$/; // Matches x(0.9)7.1 or similar

                    if (regex.test(value) && !regex.test(compareValue)) {
                      // Assign 0 to the compareData field if value matches the pattern and compareValue does not
                      compareData.workingHrs[dateKey] = "0";
                    } else if (!regex.test(value) && regex.test(compareValue)) {
                      // Assign 0 to the data field if compareValue matches the pattern and value does not
                      data.workingHrs[dateKey] = "0";
                    }
                  });
                }
              }
            });
            const holidaysAndAbsent = countOccurrences(
              data.workingHrs,
              keysToCount
            );

            const countLeaveTypes = () => {
              let newLeaveCount = {
                AL: 0,
                CL: 0,
                UAL: 0,
                SL: 0,
              };

              for (const date in data.workingHrs) {
                const value = data.workingHrs[date];

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

            data.hollydayCounts = holidaysAndAbsent;
            data.leaveCounts = leaveCounts;
          });

          return inputData;
        };

        // Example usage
        const updatedData = await updateFieldBasedOnConditions(
          addLeaveTypeCount
        );

        const getSummaryUpdaterName = async (updatedData) => {
          // Use Promise.all to handle the asynchronous operations
          const results = await Promise.all(
            updatedData.map(async (val) => {
              const getHisID = val.data.find((fin) => fin);

              if (getHisID && getHisID.assignBy) {
                const getHisName = await GetViewSummaryUpdater(
                  getHisID.assignBy
                );
                return { ...val, timeKeeper: getHisName?.name || null };
              }

              // Return the original object if no assignBy is found
              return { ...val, timeKeeper: null };
            })
          );

          // console.log(results);
          return results;
        };

        // Call the function with updatedData
        const UpdaterNameAdded = await getSummaryUpdaterName(updatedData);

        // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

        const transformedData = UpdaterNameAdded?.map((item) => {
          const initialMatch = mergedData?.find((datasetItem) => {
            // Ensure data types match and check for null/undefined
            const empBadgeNoMatch =
              datasetItem.empBadgeNo &&
              item.empBadgeNo &&
              String(datasetItem.empBadgeNo) === String(item.empBadgeNo);

            const sapNoMatch =
              datasetItem.sapNo &&
              item.fidNo &&
              String(datasetItem.sapNo) === String(item.fidNo);

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

          const empName = item?.data?.map((m) => m.empName);

          const empLeaveCount = item?.leaveCounts;
          const workingHrs = item?.workingHrs;
          const dateForSelectMY = item?.newDate;
          const location = item?.location;
          const hollydayCounts = item?.hollydayCounts;
          const timeKeeper = item?.timeKeeper;

          const overtimeHours = Array.from({ length: dayCounts }, (_, i) => {
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
              // console.log(
              //   entryDate.getDate(),
              //   " Day : ",
              //   currentDay.getDate(),
              //   "  Month : ",
              //   entryDate.getMonth(),
              //   " : ",
              //   currentDay.getMonth()
              // );

              return (
                //   entryDate === currentDay
                entryDate.getDate() === currentDay.getDate() &&
                entryDate.getMonth() === currentDay.getMonth() &&
                entryDate.getFullYear() === currentDay.getFullYear()
              );
            });
            console.log(entry);
            // Initialize overtime hours from the entry
            const overtimeHours = entry?.empWorkInfo[0]?.OVERTIMEHRS
              ? parseInt(entry?.empWorkInfo[0].OVERTIMEHRS)
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
            timeKeeper:timeKeeper,
          };
        }).filter(Boolean);
        console.log(transformedData);

        await ProcessedDataFunc(transformedData);
      };
      if (convertedStringToArrayObj && convertedStringToArrayObj.length > 0) {
        fetchData();
      } else {
        ProcessedDataFunc(null);
      }
    }, [convertedStringToArrayObj]);
  } catch (err) {
    console.log("ERROR : ", err);
  }

  //   &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //   try {
  //     useEffect(() => {
  //       if (!secondaryData || secondaryData.length === 0) return;

  //       let filteredData = [...secondaryData];

  //       // Filter by selectedLocation if it's not "All"
  //       if (selectedLocation && selectedLocation !== "All Location") {
  //         filteredData = filteredData.filter(
  //           (item) => item.location === selectedLocation
  //         );
  //       }

  //       if (!startDate) {
  //         // Reset to filtered data if startDate is empty
  //         setData(filteredData);
  //       } else {
  //         // Filter data based on startDate
  //         const inputDate = new Date(startDate);

  //         filteredData = filteredData.filter((item) => {
  //           const itemDate = new Date(item.dateForSelectMY);
  //           return (
  //             itemDate.getMonth() === inputDate.getMonth() &&
  //             itemDate.getFullYear() === inputDate.getFullYear()
  //           );
  //         });

  //         setData(filteredData);
  //       }
  //     }, [startDate, secondaryData, selectedLocation]);
  //   } catch (err) {}
  //   const searchResult = async (searchedData) => {
  //     try {
  //       const result = await searchedData;
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   const selectLocation = async (loca) => {
  //     try {
  //       const result = await loca;
  //       //   console.log(result);
  //       setSelectedLocation(result.location);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  // Calculate the number of days in the range (inclusive of both start and end dates)
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
};
