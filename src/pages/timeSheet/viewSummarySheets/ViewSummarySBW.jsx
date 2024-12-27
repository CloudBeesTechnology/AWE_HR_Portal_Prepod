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
import { LocationData } from "../customTimeSheet/JobcodeAndLocation";
import { dummyLeaveStatus } from "../customTimeSheet/JobcodeAndLocation";

import { Link } from "react-router-dom";
const client = generateClient();
export const ViewSummarySBW = () => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { convertedStringToArrayObj, getPosition } = useFetchData(
    "SBW",
    "viewTimeSheet"
  );

  useEffect(() => {
    const fetchData = async () => {
      const [empPersonalInfos, empPersonalDocs, leaveStatus, leaveDetails] =
        await Promise.all([
          client.graphql({ query: listEmpPersonalInfos }),
          client.graphql({ query: listEmpWorkInfos }),
          client.graphql({ query: listLeaveStatuses }),
        ]);
      const candidates = empPersonalInfos?.data?.listEmpPersonalInfos?.items;

      const interviews = empPersonalDocs?.data?.listEmpWorkInfos?.items;

      const sapNoRemoved = interviews.map((item) => {
        const { sapNo, ...rest } = item; // Destructure to exclude `sapNo`
        return rest; // Return the modified object without `sapNo`
      });

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

      const k = convertedStringToArrayObj.filter(
        (fil) => fil.empBadgeNo === "3907A"
      );
      console.log(k);

      const leaveStatusData = leaveStatus?.data?.listLeaveStatuses?.items;

      const approvedLeaveStatus = dummyLeaveStatus.filter(
        (fil) => fil.managerStatus === "Approved"
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
      console.log("grouped : ", grouped);

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
                empBadgeNo: entry.empBadgeNo,

                data: records,
              })
            );
          })
          .flat();
      };
      const seperatedEmpByDate = seperateDateMethod(grouped);
      console.log("seperatedEmpByDate : ", seperatedEmpByDate);

      const res = seperatedEmpByDate.filter(
        (fil) => fil.empBadgeNo === "3907A"
      );

      function groupByEmpIdAndLocation(dataArray) {
        const groupedData = new Map();
        const ungroupedData = [];

        dataArray.forEach((emp) => {
          emp.data.forEach((dataEntry) => {
            // Check if empWorkInfo exists and is an array
            if (Array.isArray(dataEntry.empWorkInfo) && dataEntry.empWorkInfo) {
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
      const seperatedGroupedData = groupByEmpIdAndLocation(seperatedEmpByDate);
      console.log(seperatedGroupedData);

      // const seperatedData = seperatedGroupedData.flatMap(item =>
      //     item.data.map(dataItem => ({
      //         empBadgeNo: item.empBadgeNo,
      //         data: [dataItem]
      //     }))
      // );

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
              // console.log(
              //   "empDate : ",
              //   empDate.getFullYear(),
              //   " | ",
              //   "leaveDate : ",
              //   leaveDate.getMonth()
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
      console.log("leaveCount_ : ", leaveCount_);
      console.log("seperatedGroupedData : ", seperatedGroupedData);
   
  

      const addLeaveTypeCount = seperatedGroupedData.map((val) => {
        const empLeaveCount = leaveCount_.find(
          (fi) => val.empBadgeNo === fi.empBadgeNo
        );

        const getDate = val.data.find((f) => f);

        const res = getDate.empWorkInfo.map((val) => val?.LOCATION);
        const jobcode = getDate.empWorkInfo.map((val) => val?.JOBCODE);

        const workingHrs = Array.from(
          { length: `${31}` },
          (_, i) => i + 1
        ).reduce((acc, day) => {
          const dayStr = day.toString();
          const entry = val.data.find(
            ({ date }) => new Date(date).getDate() === day
          );

          // Construct date based on current year, month, and day
          const date = new Date(
            entry?.date ||
              `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day}`
          );
          const dayOfWeek = date.toLocaleDateString("en-US", {
            weekday: "long",
          }); // Get day name
          const checkEntry = entry?.empWorkInfo[0]?.WORKINGHRS;

          // Handle day-specific conditions
          if (dayOfWeek === "Saturday") {
            // Saturday
            acc[dayStr] = !checkEntry ? "OFF" : checkEntry; // Set 'OFF' if workingHrs is empty
          } else if (dayOfWeek === "Sunday") {
            // Sunday
            acc[dayStr] = ""; // Leave blank for Sunday
          } else {
            // Other weekdays
            if (!checkEntry) {
              acc[dayStr] = "A"; // Mark 'A' for absence if no entry
            } else {
              const workingHrs = parseFloat(entry.empWorkInfo[0]?.WORKINGHRS);
              // if (workingHrs < entry?.normalWorkHrs === undefined ? 0 : entry?.normalWorkHrs)  {
              //   const absence = (entry?.normalWorkHrs === undefined ? 0 : entry?.normalWorkHrs - workingHrs).toFixed(1);
              if (workingHrs < entry?.normalWorkHrs) {
                const absence = (entry?.normalWorkHrs - workingHrs).toFixed(1);
                acc[dayStr] = `x(${absence})${workingHrs}`; // Format as "absence(workingHrs)"
              } else {
                acc[dayStr] = workingHrs.toString();
                console.log(workingHrs);
              }
            }
          }

          return acc;
        }, {});

        return empLeaveCount
          ? {
              ...val,
              workingHrs: workingHrs,
              leaveCounts: empLeaveCount.leaveCounts,
              newDate: getDate.date,
              location: res?.[0],
              jobcode: jobcode?.[0],
              // dateDifferences:empLeaveCount.dateDifferences,
            }
          : {
              ...val,
              workingHrs: workingHrs,
              leaveCounts: {},
              newDate: getDate.date,
              location: res?.[0],
              jobcode: jobcode?.[0],
            };
      });

      console.log(addLeaveTypeCount);

      // Iterate through each employee in leaveCount_
      // leaveCount_.forEach((leaveEmp) => {
      //   // Find the corresponding employee in addLeaveTypeCount
      //   const matchingEmp = addLeaveTypeCount.find(
      //     (emp) => emp.empBadgeNo === leaveEmp.empBadgeNo
      //   );
      //   console.log(matchingEmp)
      //   if (matchingEmp) {
      //     // Loop through each leave entry in dateDifferences
      //     leaveEmp.dateDifferences.forEach((leaveEntry) => {
      //       // Extract listDate and leaveType
      //       const listDate = leaveEntry.listDate;

      //       // Iterate through the listDate keys
      //       Object.keys(listDate).forEach((dateKey) => {
      //         // Check if the dateKey exists in workingHrs
      //         if (matchingEmp.workingHrs[dateKey] !== undefined) {
      //           // Update workingHrs with listDate value
      //           matchingEmp.workingHrs[dateKey] = listDate[dateKey];
      //         }
      //       });
      //     });
      //   }
      // });

      // console.log(leaveCount_);

      // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
      function assignLeaveToWorkingHrs(leaveStatus_, addLeaveTypeCount) {
        // Iterate through each employee in addLeaveTypeCount
        addLeaveTypeCount.forEach((empData) => {
          // Find the matching employee in leaveStatus_
          const matchingLeaveData = leaveStatus_.find(
            (leave) => leave.empBadgeNo === empData.empBadgeNo
          );

          if (matchingLeaveData) {
            // Iterate through dateDifferences for the matching employee
            matchingLeaveData.dateDifferences.forEach((leave) => {
              // For each leaveType, get the corresponding listDate
              const listDate = leave.listDate;

              // Iterate through listDate keys and assign the values to workingHrs in addLeaveTypeCount
              Object.keys(listDate).forEach((day) => {
                if (empData.workingHrs[day] !== undefined) {
                  // Assign the leave type (e.g., "AL", "CL") to the corresponding workingHrs key
                  empData.workingHrs[day] = listDate[day];
                }
              });
            });
          }
        });
        return addLeaveTypeCount;
      }

      // Example usage
      const updatedSeperatedData = await assignLeaveToWorkingHrs(
        leaveCount_,
        addLeaveTypeCount
      );
      console.log(updatedSeperatedData);

      // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
      const processWorkingHrs = async (addLeaveTypeCount) => {
        return await addLeaveTypeCount.map((entry) => {
          // Process only if empBadgeNo matches
          data.forEach((item) => {
            if (entry.empBadgeNo === item.empBadgeNo) {
              Object.keys(entry.workingHrs).forEach((key) => {
                // Check if any other value for the same key across the data is not "A"
                const hasValidValue = data.some(
                  (item) =>
                    item.empBadgeNo === entry.empBadgeNo &&
                    item.workingHrs[key] &&
                    item.workingHrs[key] !== "A"
                );

                if (entry.workingHrs[key] === "A" && hasValidValue) {
                  entry.workingHrs[key] = "0";
                }
              });
            }
          });
          return entry;
        });
      };

      const FinalData = await processWorkingHrs(addLeaveTypeCount);
      console.log("addLeaveTypeCount : ", addLeaveTypeCount);
      // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

      const transformedData = addLeaveTypeCount
        .map((item) => {
          const initialMatch = mergedData.find(
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

          const empName = item?.data?.map((m) => m.name);
          const empLeaveCount = item?.leaveCounts;
          const workingHrs = item?.workingHrs;
          const dateForSelectMY = item?.newDate;
          const location = item?.location;
          const overtimeHours = item?.data?.reduce(
            (acc, { date, empWorkInfo }) => {
              const day = new Date(date).getDate().toString();

              const overtime = empWorkInfo[0]?.OVERTIMEHRS;
              if (overtime) {
                acc[day] = parseInt(overtime);
              }
              return acc;
            },
            {}
          );

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
