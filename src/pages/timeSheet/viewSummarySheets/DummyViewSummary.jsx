import { generateClient } from "@aws-amplify/api";
import React, { useEffect, useState } from "react";
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
import { LocationData } from "../../timeSheet/customTimeSheet/JobcodeAndLocation";
import { dummyLeaveStatus } from "../../timeSheet/customTimeSheet/JobcodeAndLocation";

import { Link } from "react-router-dom";
const client = generateClient();
export const DummyViewSummary = () => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { convertedStringToArrayObj, getPosition } = useFetchData("SBW");

  useEffect(() => {
    const fetchData = async () => {
      const [empPersonalInfos, empPersonalDocs, leaveStatus, leaveDetails] =
        await Promise.all([
          client.graphql({ query: listEmpPersonalInfos }),
          client.graphql({ query: listEmpWorkInfos }),
          client.graphql({ query: listLeaveStatuses }),
          client.graphql({ query: listEmpLeaveDetails }),
        ]);
      const candidates = empPersonalInfos?.data?.listEmpPersonalInfos?.items;

      const interviews = empPersonalDocs?.data?.listEmpWorkInfos?.items;

      const sapNoRemoved = interviews.map((item) => {
        const { sapNo, ...rest } = item; // Destructure to exclude `sapNo`
        return rest; // Return the modified object without `sapNo`
      });
      console.log(convertedStringToArrayObj)
      const processedData = convertedStringToArrayObj
        .map((value) => value[1])
        .filter((item) => item !== null && item !== undefined);

      const SBWsheet = processedData.flat();
      // console.log(SBWsheet);
      const leaveStatusData = leaveStatus?.data?.listLeaveStatuses?.items;
      // console.log("Mixed Data only : ",leaveStatusData)
      // const leaveStatusDetails = leaveDetails?.data?.listEmpLeaveDetails?.items;
      // console.log("LeaveStatusDetails : ",leaveStatusDetails);
      // const k = leaveStatusData.filter(
      //   (fil) =>
      //     fil.managerStatus === "Approved" &&
      //     fil.supervisorStatus === "Approved"
      // );
      // console.log("Approved Data only : ",k);
      const approvedLeaveStatus = dummyLeaveStatus.filter(
        (fil) =>
          fil.managerStatus === "Approved"
      );

      const mergedData = candidates
        .map((candidate) => {
          const interviewDetails = sapNoRemoved.find(
            (item) => item.empID === candidate.empID
          );

          const leaveStatusDetails = approvedLeaveStatus.find(
            (item) => item.empID === candidate.empID
          );

          if (!interviewDetails && !leaveStatusDetails) {
            return null;
          }

          return {
            ...candidate,
            ...interviewDetails,
            ...leaveStatusDetails,
            // ...offshore,
          };
        })
        .filter((item) => item !== null && item !== undefined);
      const res = mergedData.filter((fil, i) => fil.empBadgeNo === "3907A");
      // console.log(res)
      const groupBySapNo = (data) => {
        const grouped = data.reduce((acc, item) => {
          const key = String(item.badge);

          let existingGroup = acc.find((group) => group.badge === key);

          if (!existingGroup) {
            existingGroup = { badge: key, data: [] };
            acc.push(existingGroup);
          }

          existingGroup.data.push(item);
          return acc;
        }, []);

        return grouped;
      };
      const grouped = groupBySapNo(SBWsheet);

      console.log(grouped);
      const seperateDateMethod = (inputData) => {
        return inputData
          .map((entry) => {
            // Group by Month/Year

            const groupedByMonthYear = entry.data.reduce((acc, record) => {
              const date = new Date(record.date);
              const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

              if (!acc[monthYear]) {
                acc[monthYear] = [];
              }
              acc[monthYear].push(record);

              return acc;
            }, {});

            // Construct final output for each Month/Year group
            return Object.entries(groupedByMonthYear).map(
              ([monthYear, records]) => ({
                badge: entry.badge,

                data: records,
              })
            );
          })
          .flat();
      };
      const seperatedEmpByDate = seperateDateMethod(grouped);

      //   groupByEmpIdAndLocation
      function groupByEmpIdAndLocation(dataArray) {
        const groupedData = new Map();
        const ungroupedData = [];

        dataArray.forEach((emp) => {
          emp.data.forEach((dataEntry) => {
            // Handle entries with no `jobLocaWhrs` or a single unique LOCATION
            if (!dataEntry.jobLocaWhrs || dataEntry.jobLocaWhrs.length === 0) {
              ungroupedData.push({
                badge: emp.badge,
                data: [{ ...dataEntry, jobLocaWhrs: [] }],
              });
            } else {
              // Group entries with multiple LOCATIONS
              dataEntry.jobLocaWhrs.forEach((job) => {
                const location = job.LOCATION;
                const jobcode = job.JOBCODE;
                const dateObj = new Date(dataEntry.date);
                const monthYearKey = `${dateObj.getFullYear()}-${
                  dateObj.getMonth() + 1
                }`;
                const key = `${emp.badge}-${location}-${jobcode}-${monthYearKey}`;

                if (!groupedData.has(key)) {
                  groupedData.set(key, {
                    badge: emp.badge,
                    data: [],
                  });
                }

                // Add the current dataEntry to the group, ensuring `jobLocaWhrs` is specific to this LOCATION
                const group = groupedData.get(key);
                group.data.push({
                  ...dataEntry,
                  jobLocaWhrs: [job], // Only include the current job entry for this LOCATION
                });
              });
            }
          });
        });

        // Combine grouped data with ungrouped data
        return [...Array.from(groupedData.values()), ...ungroupedData];
      }
      const seperatedGroupedData = groupByEmpIdAndLocation(seperatedEmpByDate);
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

      //   const approvedLeaveStatuses = merged.filter(
      //     (fil) =>
      //       fil.managerStatus === "Approved" &&
      //       fil.supervisorStatus === "Approved"
      //   );
      console.log(seperatedGroupedData);

      const filteredData = merged.filter((leave) => {
        return seperatedGroupedData.some((emp) => {
          // console.log(leave.empBadgeNo === emp.badge)
          if (leave.empBadgeNo === emp.badge) {
            // console.log(leave.empBadgeNo, " | ", emp.badge);
            console.log(leave);
            return emp.data.some((entry) => {
              const leaveDate = new Date(leave.toDate);
              const empDate = new Date(entry.date);
              console.log(
                "empDate : ",
                empDate.getFullYear(),
                " | ",
                "leaveDate : ",
                leaveDate.getFullYear()
              );
              return (
                leaveDate.getFullYear() === empDate.getFullYear() &&
                leaveDate.getMonth() === empDate.getMonth()
              );
            });
          }
          return false;
        });
      });
      console.log(filteredData);

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

      console.log(leaveCount);
      // &&&&&&&&&&&&&&&&&&&&&&&&&&&&

      // const leaveCounts_ = filteredData.reduce((acc, entry) => {
      //   const { empBadgeNo, leaveType, fromDate, toDate } = entry;

      //   // Ensure an entry exists for the empBadgeNo
      //   if (!acc[empBadgeNo]) {
      //     acc[empBadgeNo] = { leaveTypes: {}, dateDifferences: [] };
      //   }

      //   // Increment the count for the specific leaveType
      //   acc[empBadgeNo].leaveTypes[leaveType] =
      //     (acc[empBadgeNo].leaveTypes[leaveType] || 0) + 1;

      //   // Calculate the difference between fromDate and toDate
      //   const from = new Date(fromDate);
      //   const to = new Date(toDate);
      //   const differenceInDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24));

      //   // Add the date difference to the array
      //   acc[empBadgeNo].dateDifferences.push({
      //     leaveType,
      //     fromDate,
      //     toDate,
      //     daysDifference: differenceInDays,
      //   });

      //   return acc;
      // }, {});

      // console.log("leaveCounts_ : ",leaveCounts_)
      // const leaveCount_ = Object.entries(leaveCounts_).map(([empBadgeNo, data]) => ({
      //   empBadgeNo,
      //   leaveCounts: data.leaveTypes,
      //   dateDifferences: data.dateDifferences,
      // }));

      // console.log(leaveCount_);
      // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
      // const generateDateList = (fromDate, toDate) => {
      //   const start = new Date(fromDate);
      //   const end = new Date(toDate);
      //   const list = {};
      //   let dayIndex = 1;

      //   while (start <= end) {
      //     list[dayIndex++] = start.toISOString().split('T')[0];
      //     start.setDate(start.getDate() + 1);
      //   }

      //   return list;
      // };

      // Transform function
      // const transformData = (inputData) => {
      //   const result = {};

      //   inputData.forEach((entry) => {
      //     const { empID, leaveType, fromDate, toDate, days } = entry;

      //     if (!result[empID]) {
      //       result[empID] = {
      //         empBadgeNo: empID,
      //         leaveCounts: {},
      //         dateDifferences: []
      //       };
      //     }

      //     // Increment leave count for the leave type
      //     result[empID].leaveCounts[leaveType] =
      //       (result[empID].leaveCounts[leaveType] || 0) + 1;

      //     // Add date difference details
      //     result[empID].dateDifferences.push({
      //       leaveType,
      //       fromDate,
      //       toDate,
      //       listDate: generateDateList(fromDate, toDate),
      //       daysDifference: days
      //     });
      //   });

      //   return Object.values(result);
      // };

      // // Transform the data
      // const leaveCount_ = transformData(filteredData);
      // console.log(leaveCount_)

      // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
      // Map leave types to abbreviations
      // const leaveTypeAbbreviation = {
      //   "Annual Leave": "AL",
      //   "Compassionate Leave": "CL",
      // };

      // const generateDateList = (fromDate, toDate, abbreviation) => {
      //   const start = new Date(fromDate);
      //   const end = new Date(toDate);
      //   const list = {};

      //   while (start <= end) {
      //     const day = start.getDate();
      //     list[day] = abbreviation; // Assign abbreviation based on leave type
      //     start.setDate(start.getDate() + 1);
      //   }

      //   return list;
      // };

      // // Transform function
      // const transformData = (inputData) => {
      //   const result = {};

      //   inputData.forEach((entry) => {
      //     const { empID, leaveType, fromDate, toDate, days } = entry;

      //     if (!result[empID]) {
      //       result[empID] = {
      //         empBadgeNo: empID,
      //         leaveCounts: {},
      //         dateDifferences: [],
      //       };
      //     }

      //     // Increment leave count for the leave type
      //     result[empID].leaveCounts[leaveType] =
      //       (result[empID].leaveCounts[leaveType] || 0) + 1;

      //     // Add date difference details
      //     result[empID].dateDifferences.push({
      //       leaveType,
      //       fromDate,
      //       toDate,
      //       listDate: generateDateList(fromDate, toDate, leaveTypeAbbreviation[leaveType]),
      //       daysDifference: days,
      //     });
      //   });

      //   return Object.values(result);
      // };

      // // Transform the data
      // const leaveCount_ = transformData(filteredData);
      // console.log(leaveCount_);

      // Map leave types to abbreviations
      const leaveTypeAbbreviation = {
        "Annual Leave": "AL",
        "Compassionate Leave": "CL",
        "Sick Leave": "SL",
        "Unpaid Authorise Leave": "UAL",
      };

      // Helper function to generate a list of dates
      const generateDateList = (
        fromDate,
        toDate,
        abbreviation,
        isHalfDay = false
      ) => {
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const list = {};

        while (start <= end) {
          const day = start.getDate();
          list[day] = isHalfDay ? `H${abbreviation}4` : abbreviation; // Handle half-day abbreviation
          start.setDate(start.getDate() + 1);
        }

        return list;
      };

      // Transform function
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

          // Update leaveCounts: exclude half-day leaves from counting
          if (!(leaveType === "Compassionate Leave" && days === 0.5)) {
            result[empID].leaveCounts[leaveType] =
              (result[empID].leaveCounts[leaveType] || 0) + 1;
          }

          // Add date difference details
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

        return Object.values(result);
      };

      // Transform the data
      const leaveCount_ = transformData(filteredData);
      console.log("leaveCount_ : ",leaveCount_);
      console.log("leaveCount : ", leaveCount);
      // ############################

      const addLeaveTypeCount = seperatedGroupedData.map((val) => {
        const empLeaveCount = leaveCount_.find(
          (fi) => val.badge === fi.empBadgeNo
        );
        const getDate = val.data.find((f) => f);
        // console.log(getDate);
        const res = getDate.jobLocaWhrs.map((val) => val.LOCATION);
        // const ress = getDate.jobLocaWhrs.map((val) => val);
        // console.log(ress);
        // const workingHrs = val.data.reduce((acc, { date, jobLocaWhrs }) => {
        //   const day = new Date(date).getDate().toString(); // Extract day as a string
        //   const workingHrsValue = jobLocaWhrs?.[0]?.WORKINGHRS; // Safely access WORKINGHRS
        //   acc[day] = workingHrsValue; // Assign the day as the key and WORKINGHRS as the value
        //   return acc;
        // }, {});
        console.log(empLeaveCount);
        const workingHrs = Array.from(
          { length: `${31}` },
          (_, i) => i + 1
        ).reduce((acc, day) => {
          const dayStr = day.toString();
          const entry = val.data.find(
            ({ date }) => new Date(date).getDate() === day
          );
          const date = new Date(
            entry?.date ||
              `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day}`
          );
        
          const dayOfWeek = date.getDay(); // 0 for Sunday, 6 for Saturday

          const checkEntry = entry?.jobLocaWhrs[0]?.WORKINGHRS;

          // Handle Saturday and Sunday conditions
          if (dayOfWeek === 5) {
            // Saturday
            acc[dayStr] = !checkEntry ? "OFF" : checkEntry; // If no working hours, set "OFF"
          } else if (dayOfWeek === 0) {
            // Sunday
            acc[dayStr] = ""; // Empty value for Sunday
          } else {
            // Handle other days
            if (!checkEntry) {
              acc[dayStr] = "A"; // Absence if no entry for the day
            } else {
              const workingHrs = parseFloat(entry.jobLocaWhrs[0]?.WORKINGHRS);
              if (workingHrs < 8) {
                const absence = (8 - workingHrs).toFixed(1); // Calculate absence dynamically
                acc[dayStr] = `x(${absence})${workingHrs}`; // Format as "absence(workingHrs)"
              } else {
                acc[dayStr] = workingHrs.toString(); // Use the WORKINGHRS value as-is
              }
            }
          }

          return acc;
        }, {});

        // const getDaysInMonth = (year, month) => {
        //   // Month is 0-indexed, so January = 0, February = 1, etc.
        //   return new Date(year, month + 1, 0).getDate();
        // };

        // const workingHrs_ = (val) => {
        //   const currentDate = new Date(val.data[0]?.date || new Date());
        //   const year = currentDate.getFullYear();
        //   const month = currentDate.getMonth();
        //   const daysInMonth = getDaysInMonth(year, month);

        //   return Array.from({ length: daysInMonth }, (_, i) => i + 1).reduce(
        //     (acc, day) => {
        //       const dayStr = day.toString();
        //       const entry = val.data.find(
        //         ({ date }) => new Date(date).getDate() === day
        //       );
        //       const date = new Date(
        //         entry?.date || `${year}-${month + 1}-${day}`
        //       );
        //       const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

        //       const checkEntry = entry?.jobLocaWhrs[0]?.WORKINGHRS;

        //       // Handle Saturday and Sunday dynamically
        //       if (dayOfWeek === 6) {
        //         // Saturday
        //         acc[dayStr] = !checkEntry ? "OFF" : checkEntry; // If no working hours, set "OFF"
        //       } else if (dayOfWeek === 0) {
        //         // Sunday
        //         acc[dayStr] = ""; // Empty value for Sunday
        //       } else {
        //         // Handle weekdays
        //         if (!checkEntry) {
        //           acc[dayStr] = "A"; // Absence if no entry for the day
        //         } else {
        //           const workingHrs = parseFloat(
        //             entry.jobLocaWhrs[0]?.WORKINGHRS
        //           );
        //           if (workingHrs < 8) {
        //             const absence = (8 - workingHrs).toFixed(1); // Calculate absence dynamically
        //             acc[dayStr] = `x(${absence})${workingHrs}`; // Format as "absence(workingHrs)"
        //           } else {
        //             acc[dayStr] = workingHrs.toString(); // Use the WORKINGHRS value as-is
        //           }
        //         }
        //       }

        //       return acc;
        //     },
        //     {}
        //   );
        // };

        // // Example Usage
        // const result = workingHrs_(val);
        // console.log(result);

        // console.log(workingHrs)

        return empLeaveCount
          ? {
              ...val,
              workingHrs: workingHrs,
              leaveCounts: empLeaveCount.leaveCounts,
              newDate: getDate.date,
              location: res[0],
            }
          : {
              ...val,
              workingHrs: workingHrs,
              leaveCounts: {},
              newDate: getDate.date,
              location: res[0],
            };
      });
      console.log(addLeaveTypeCount);

      const transformedData = addLeaveTypeCount
        .map((item) => {
          const initialMatch = mergedData.find(
            (datasetItem) => datasetItem.empBadgeNo === item.badge
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

          // const normalWorkHours = item.data.reduce(
          //   (acc, { date, normalWhrsPerDay }) => {
          //     const day = new Date(date).getDate().toString();

          //     acc[day] = normalWhrsPerDay;
          //     return acc;
          //   },
          //   {}
          // );

          //   const initialResult = {

          //     NORMALWORKHRSPERDAY: {},
          //     OVERTIMEHRS:{},
          //   };

          //   const result = item.data.reduce((acc, item) => {
          //     const day = new Date(item.date).getDate();

          //     acc.NORMALWORKHRSPERDAY[day] = item.normalWhrsPerDay;
          //     acc.OVERTIMEHRS[day] = item.OT;

          //     return acc;
          //   }, initialResult);

          //   // Fill missing days with 'A' for Absent
          //   for (let day = 1; day <= 31; day++) {
          //     if (!result.NORMALWORKHRSPERDAY[day]) {
          //       result.NORMALWORKHRSPERDAY[day] = "A";
          //     }
          //     if (!result.OVERTIMEHRS[day]) {
          //       result.OVERTIMEHRS[day] = "0";
          //     }
          //   }

          // console.log(result)

          const getEmpDateRange = item.data.find((first) => first.date);

          const empName = item.data.map((m) => m.name);
          const empLeaveCount = item.leaveCounts;
          const workingHrs = item.workingHrs;
          const dateForSelectMY = item.newDate;
          const location = item.location;
          const overtimeHours = item.data.reduce(
            (acc, { date, jobLocaWhrs }) => {
              const day = new Date(date).getDate().toString();

              const overtime = jobLocaWhrs[0]?.OVERTIMEHRS;
              if (overtime) {
                acc[day] = parseInt(overtime);
              }
              return acc;
            },
            {}
          );

          const jobcode = item.data.map(
            ({ jobLocaWhrs }) => jobLocaWhrs[0]?.JOBCODE
          );

          return {
            empName: empName,
            jobcode: jobcode[0] || "",
            dateForSelectMY: dateForSelectMY,
            ...selectedFields,
            // NORMALWORKHRSPERDAY: normalWorkHours,
            OVERTIMEHRS: overtimeHours,
            empLeaveCount: empLeaveCount,
            workingHrs: workingHrs,
            location: location,
          };
        })
        .filter(Boolean);
      // console.log(transformedData);
      setData(transformedData);
      setSecondaryData(transformedData);
    };
    fetchData();
  }, [convertedStringToArrayObj]);

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

  const exportToPDF = () => {
    const doc = new jsPDF("landscape");

    // Extract table headers
    const headers = [
      [
        "Employee Name",
        "Project",
        ...Array.from({ length: 31 }, (_, i) => i + 1), // Days of the month
        "NH",
        "ND",
        "PH",
        "PH-D",
        "AL/CL",
        "SL",
        "OFF",
        "A",
        "UAL",
        "OT",
        "Verified",
        "Updater",
      ],
    ];

    // Extract table rows
    const rows = data.map((employee) => {
      const normalWorkHours = Object.values(employee.NORMALWORKHRSPERDAY || {});
      const totalHours = normalWorkHours.reduce(
        (acc, hour) => acc + parseInt(hour || 0, 10),
        0
      );
      const normalDays = normalWorkHours.length;

      const totalOT = Object.values(employee.OVERTIMEHRS || {}).reduce(
        (acc, ot) => acc + parseInt(ot || 0),
        0
      );

      const row1 = [
        `${employee.empName[0] || ""}\nBadge#: ${
          employee.empBadgeNo || ""
        }\nSAP ID: ${employee.sapNo || ""}`,
        employee.jobcode,
        ...Array.from(
          { length: 31 },
          (_, i) => employee.NORMALWORKHRSPERDAY?.[i + 1] || ""
        ),
        totalHours,
        normalDays,
        0, // PH
        0, // PH-D
        employee.empLeaveCount["Annual Leave"] || 0,
        employee.empLeaveCount["Sick Leave"] || 0,
        employee.days || 0,
        0, // A
        0, // UAL
        totalOT,
        "Yes", // Verified
        "Updater", // Updater
      ];

      const row2 = [
        "", // Employee Name
        "", // Project
        ...Array.from(
          { length: 31 },
          (_, i) => employee.OVERTIMEHRS?.[i + 1] || ""
        ),
        "", // NH
        "", // ND
        "", // PH
        "", // PH-D
        "", // AL/CL
        "", // SL
        "", // OFF
        "", // A
        "", // UAL
        "", // OT
        "", // Verified
        "", // Updater
      ];

      return [row1, row2];
    });

    // Flatten the rows
    const flatRows = rows.flat();

    // Generate PDF
    doc.autoTable({
      head: headers,
      body: flatRows,
      startY: 20,
      styles: { fontSize: 7, cellWidth: "auto", overflow: "linebreak" },
      theme: "grid",
    });

    doc.save("table_data.pdf");
  };
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
                {Array.from({ length: 31 }, (_, i) => (
                  <th className="border px-2 py-1 border-dark_grey" key={i}>
                    {i + 1}
                  </th>
                ))}
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
                  const normalWorkHours = Object.values(
                    employee.NORMALWORKHRSPERDAY || {}
                  );
                  const totalHours = normalWorkHours.reduce(
                    (acc, hour) => acc + parseInt(hour || 0, 10),
                    0
                  );
                  const NormalDays = normalWorkHours.length;

                  const totalOT = Object.values(
                    employee.OVERTIMEHRS || {}
                  ).reduce((acc, ot) => acc + parseInt(ot || 0), 0);

                  // const empName = employee.data.map((val, index) => val.name);
                  // console.log(employee);

                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td
                          className="border px-2 py-3 text-center"
                          rowSpan="2"
                        >
                          <span>{employee.empName[0] || ""}</span>
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
                        {/* {employee.NORMALWORKHRSPERDAY.map((hour, i) => (
                    <td
                      key={`hour-${index}-${i}`}
                      className={`border px-2 py-1 ${
                        hour !== "" ? "bg-green-200" : ""
                      }`}
                    >
                      {hour}
                    </td>
                  )) || ""} */}
                        {/* {employee.NORMALWORKHRSPERDAY[10]} */}
                        {Array.from({ length: 31 }, (_, i) => (
                          <td className="border px-2 py-1" key={i}>
                            {employee.workingHrs?.[i + 1] || ""}
                          </td>
                        ))}

                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.nh || ""} */}
                          {totalHours}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.nd || ""} */}
                          {NormalDays}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.ph || ""} */}0
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.ph_d || ""} */}0
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.al_cl || ""} */}
                          {employee.empLeaveCount["Annual Leave"] ||
                            employee.empLeaveCount["Compassionate Leave"] ||
                            0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.sl || ""} */}{" "}
                          {employee.empLeaveCount["Sick Leave"] || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.off || ""} */} {employee.days || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.a || ""} */}0
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.ual || ""} */}0
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.ot_total || ""} */}
                          {totalOT || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.verified || ""} */}yes
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee.updater || ""} */}updater
                        </td>
                      </tr>
                      <tr>
                        {/* {employee.ot.map((ot, i) => ( */}
                        {/* <td className={`border px-2 py-1 `}>
                     {ot || ""}2
                    
                  </td> */}
                        {Array.from({ length: 31 }, (_, i) => (
                          <td className="border px-2 py-1" key={i}>
                            {/* Check if NORMALWORKHRSPERDAY has a key matching the index (i+1) */}
                            {employee.OVERTIMEHRS?.[i + 1] || 0}
                          </td>
                        ))}
                        {/* ))} */}
                      </tr>
                      <tr>
                        <td className="border px-2 py-1" colSpan={1}>
                          Total
                        </td>
                        {/* {employee.hoursPerDay.map((hour, i) => ( */}
                        {Array.from({ length: 32 }, (_, i) => (
                          <td
                            key={i}
                            className={`${i === 0 ? "border" : "border-b"}`}
                          ></td>
                        ))}
                        {/* ))} */}
                        <td className="border px-2 py-1">{totalHours}</td>
                        <td className="border px-2 py-1">{NormalDays}</td>

                        <td className="border px-2 py-1">
                          {/* {employee.ph || ""} */}0
                        </td>
                        <td className="border px-2 py-1">
                          {/* {employee.ph_d || ""} */}0
                        </td>
                        <td className="border px-2 py-1">
                          {/* {employee.al_cl || ""} */}
                          {employee.empLeaveCount["Annual Leave"] ||
                            employee.empLeaveCount["Compassionate Leave"] ||
                            0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee.empLeaveCount["Sick Leave"] || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {/* {employee.off || ""} */}
                          {employee.days || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {/* {employee.a || ""} */}0
                        </td>
                        <td className="border px-2 py-1">
                          {/* {employee.ual || ""} */}0
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
                    <p className="px-6 py-6">No Table Data Available Here</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <footer className="flex justify-center py-5">
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
