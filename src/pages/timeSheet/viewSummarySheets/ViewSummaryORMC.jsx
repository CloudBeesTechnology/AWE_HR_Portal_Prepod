// import { generateClient } from "@aws-amplify/api";
// import React, { useEffect, useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { FaAngleDown } from "react-icons/fa";
// import {
//   listEmpPersonalInfos,
//   listEmpWorkInfos,
//   listLeaveStatuses,
// } from "../../../graphql/queries";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { SearchBoxForTimeSheet } from "../../../utils/SearchBoxForTimeSheet";
// import { SearchDisplayForTimeSheet } from "../timeSheetSearch/SearchDisplayForTS";
// import { useFetchData } from "../customTimeSheet/UseFetchData";
// import { LocationData } from "../../timeSheet/customTimeSheet/JobcodeAndLocation";
// import { dummyLeaveStatus } from "../../timeSheet/customTimeSheet/JobcodeAndLocation";

// import { Link } from "react-router-dom";
// const client = generateClient();
// export const ViewSummaryORMC = () => {
//   const [data, setData] = useState(null);
//   const [secondaryData, setSecondaryData] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const { convertedStringToArrayObj, getPosition } = useFetchData("ORMC");
// console.log(convertedStringToArrayObj)
//   useEffect(() => {
//     const fetchData = async () => {
//       const [empPersonalInfos, empPersonalDocs, leaveStatus] =
//         await Promise.all([
//           client.graphql({ query: listEmpPersonalInfos }),
//           client.graphql({ query: listEmpWorkInfos }),
//           client.graphql({ query: listLeaveStatuses }),
//         ]);
//       const candidates = empPersonalInfos?.data?.listEmpPersonalInfos?.items;

//       const interviews = empPersonalDocs?.data?.listEmpWorkInfos?.items;

//       const sapNoRemoved = interviews.map((item) => {
//         const { sapNo, ...rest } = item; // Destructure to exclude `sapNo`
//         return rest; // Return the modified object without `sapNo`
//       });
//       const processedData = convertedStringToArrayObj
//         .map((value) => value[1])
//         .filter((item) => item !== null && item !== undefined);

//       const ORMCsheet = processedData.flat();
//       console.log(ORMCsheet);
//       const leaveStatusData = leaveStatus?.data?.listLeaveStatuses?.items;

//       const approvedLeaveStatus = dummyLeaveStatus.filter(
//         (fil) =>
//           fil.managerStatus === "Approved" &&
//           fil.supervisorStatus === "Approved"
//       );

//       const mergedData = candidates
//         .map((candidate) => {
//           const interviewDetails = sapNoRemoved.find(
//             (item) => item.empID === candidate.empID
//           );

//           const leaveStatusDetails = approvedLeaveStatus.find(
//             (item) => item.empID === candidate.empID
//           );

//           if (!interviewDetails && !leaveStatusDetails) {
//             return null;
//           }

//           return {
//             ...candidate,
//             ...interviewDetails,
//             ...leaveStatusDetails,
//             // ...offshore,
//           };
//         })
//         .filter((item) => item !== null && item !== undefined);
//         const res=mergedData.filter((fil,i)=>fil.empBadgeNo==="3907A");
//         console.log(res)
//       const groupBySapNo = (data) => {
//         const grouped = data.reduce((acc, item) => {
//           const key = String(item.badge);
        
//           let existingGroup = acc.find((group) => group.badge === key);

//           if (!existingGroup) {
//             existingGroup = { badge: key, data: [] };
//             acc.push(existingGroup);
//           }

//           existingGroup.data.push(item);
//           return acc;
//         }, []);

//         return grouped;
//       };
//       const grouped = groupBySapNo(ORMCsheet);

//       console.log(grouped);
//       const seperateDateMethod = (inputData) => {
//         return inputData
//           .map((entry) => {
//             // Group by Month/Year
//             console.log(entry);
//             const groupedByMonthYear = entry.data.reduce((acc, record) => {
//               const date = new Date(record.date);
//               const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

//               if (!acc[monthYear]) {
//                 acc[monthYear] = [];
//               }
//               acc[monthYear].push(record);

//               return acc;
//             }, {});

//             // Construct final output for each Month/Year group
//             return Object.entries(groupedByMonthYear).map(
//               ([monthYear, records]) => ({
//                 badge: entry.badge,

//                 data: records,
//               })
//             );
//           })
//           .flat();
//       };
//       const seperatedEmpByDate = seperateDateMethod(grouped);
//       console.log(seperatedEmpByDate);

//       //   groupByEmpIdAndLocation
//       function groupByEmpIdAndLocation(dataArray) {
//         const groupedData = new Map();
//         const ungroupedData = [];

//         dataArray.forEach((emp) => {
//           emp.data.forEach((dataEntry) => {
//             // Handle entries with no `jobLocaWhrs` or a single unique LOCATION
//             if (!dataEntry.jobLocaWhrs || dataEntry.jobLocaWhrs.length === 0) {
//               ungroupedData.push({
//                 badge: emp.badge,
//                 data: [{ ...dataEntry, jobLocaWhrs: [] }],
//               });
//             } else {
//               // Group entries with multiple LOCATIONS
//               dataEntry.jobLocaWhrs.forEach((job) => {
//                 const location = job.LOCATION;
//                 const jobcode = job.JOBCODE;
//                 const dateObj = new Date(dataEntry.date);
//                 const monthYearKey = `${dateObj.getFullYear()}-${
//                   dateObj.getMonth() + 1
//                 }`;
//                 const key = `${emp.badge}-${location}-${jobcode}-${monthYearKey}`;

//                 if (!groupedData.has(key)) {
//                   groupedData.set(key, {
//                     badge: emp.badge,
//                     data: [],
//                   });
//                 }

//                 // Add the current dataEntry to the group, ensuring `jobLocaWhrs` is specific to this LOCATION
//                 const group = groupedData.get(key);
//                 group.data.push({
//                   ...dataEntry,
//                   jobLocaWhrs: [job], // Only include the current job entry for this LOCATION
//                 });
//               });
//             }
//           });
//         });

//         // Combine grouped data with ungrouped data
//         return [...Array.from(groupedData.values()), ...ungroupedData];
//       }
//       const seperatedGroupedData = groupByEmpIdAndLocation(seperatedEmpByDate);
//       console.log(seperatedGroupedData);

//       const merged = mergedData.flatMap((val) => {
//         // Filter all matching entries from approvedLeaveStatus
//         const matches = approvedLeaveStatus.filter(
//           (so) => val.empID === so.empID
//         );

//         if (matches.length > 0) {
//           // Map over matches and merge each one with the current `val`
//           return matches.map((match) => ({
//             ...val,
//             ...match,
//           }));
//         }

//         // If no match is found, just return the original `val`
//         return [val];
//       });
    
//     //   const approvedLeaveStatuses = merged.filter(
//     //     (fil) =>
//     //       fil.managerStatus === "Approved" &&
//     //       fil.supervisorStatus === "Approved"
//     //   );
// console.log(seperatedGroupedData)

// console.log(res)
//       const filteredData = merged.filter((leave) => {
//         return seperatedGroupedData.some((emp) => {
//             console.log(leave.empBadgeNo === emp.badge)
//           if (leave.empBadgeNo === emp.badge) {
//             console.log(leave.empBadgeNo, " | ", emp.badge);
//             console.log(leave)
//             return emp.data.some((entry) => {
//               const leaveDate = new Date(leave.toDate);
//               const empDate = new Date(entry.date);
//               console.log(
//                 "empDate : ",
//                 empDate.getFullYear(),
//                 " | ",
//                 "leaveDate : ",
//                 leaveDate.getFullYear()
//               );
//               return (
//                 leaveDate.getFullYear() === empDate.getFullYear() &&
//                 leaveDate.getMonth() === empDate.getMonth()
//               );
//             });
//           }
//           return false;
//         });
//       });
//       console.log(filteredData);

//       const leaveCounts = filteredData.reduce((acc, entry) => {
//         const { empBadgeNo, leaveType } = entry;

//         // Ensure an entry exists for the sapNo
//         if (!acc[empBadgeNo]) {
//           acc[empBadgeNo] = {};
//         }

//         // Increment the count for the specific leaveType
//         acc[empBadgeNo][leaveType] = (acc[empBadgeNo][leaveType] || 0) + 1;

//         return acc;
//       }, {});

//       const leaveCount = Object.entries(leaveCounts).map(
//         ([empBadgeNo, leaveTypes]) => ({
//           empBadgeNo,
//           leaveCounts: leaveTypes,
//         })
//       );

//       const addLeaveTypeCount = seperatedGroupedData.map((val) => {
//         const empLeaveCount = leaveCount.find((fi) => val.badge === fi.empBadgeNo);
//         const k = val.data.find((f) => f);

//         const res = k.jobLocaWhrs.map((val) => val.LOCATION);

//         return empLeaveCount
//           ? {
//               ...val,
//               leaveCounts: empLeaveCount.leaveCounts,
//               newDate: k.date,
//               location: res[0],
//             }
//           : { ...val, leaveCounts: {}, newDate: k.date, location: res[0] };
//       });
//       console.log(addLeaveTypeCount);
   

//       const transformedData = addLeaveTypeCount
//       .map((item) => {
//         const initialMatch = mergedData.find(
//           (datasetItem) => datasetItem.empBadgeNo === item.badge
//         );

//         const selectedFields = initialMatch
//           ? (({
//               empID,
//               name,
//               sapNo,
             
//               empBadgeNo,
//               workHrs,
//               workMonth,
//               salaryType,
//               days,
//             }) => ({
//               empID,
//               name,
//               sapNo,
//               empBadgeNo,
//               workHrs,
//               workMonth,
//               salaryType,
//               days,
//             }))(initialMatch)
//           : {};

//         const normalWorkHours = item.data.reduce(
//           (acc, { date, normalWhrsPerDay }) => {
//             const day = new Date(date).getDate().toString();

//             acc[day] = normalWhrsPerDay;
//             return acc;
//           },
//           {}
//         );
//         const getEmpDateRange = item.data.find((first) => first.date);

//         const empName = item.data.map((m) => m.name);
//         const empLeaveCount = item.leaveCounts;
//         const dateForSelectMY = item.newDate;
//         const location = item.location;
//         const overtimeHours = item.data.reduce(
//           (acc, { date, jobLocaWhrs }) => {
//             const day = new Date(date).getDate().toString();

//             const overtime = jobLocaWhrs[0]?.OVERTIMEHRS;
//             if (overtime) {
//               acc[day] = parseInt(overtime);
//             }
//             return acc;
//           },
//           {}
//         );

//         const jobcode = item.data.map(
//           ({ jobLocaWhrs }) => jobLocaWhrs[0]?.JOBCODE
//         );

//         return {
//           empName: empName,
//           jobcode: jobcode[0] || "",
//           dateForSelectMY: dateForSelectMY,
//           ...selectedFields,
//           NORMALWORKHRSPERDAY: normalWorkHours,
//           OVERTIMEHRS: overtimeHours,
//           empLeaveCount: empLeaveCount,
//           location: location,
//         };
//       })
//       .filter(Boolean);
   
//     setData(transformedData);
//     setSecondaryData(transformedData);
//     };
//     fetchData();
//   }, [convertedStringToArrayObj]);

//   useEffect(() => {
//     if (!secondaryData || secondaryData.length === 0) return;

//     let filteredData = [...secondaryData];

//     // Filter by selectedLocation if it's not "All"
//     if (selectedLocation && selectedLocation !== "All Location") {
//       filteredData = filteredData.filter(
//         (item) => item.location === selectedLocation
//       );
//     }

//     if (!startDate) {
//       // Reset to filtered data if startDate is empty
//       setData(filteredData);
//     } else {
//       // Filter data based on startDate
//       const inputDate = new Date(startDate);

//       filteredData = filteredData.filter((item) => {
//         const itemDate = new Date(item.dateForSelectMY);
//         return (
//           itemDate.getMonth() === inputDate.getMonth() &&
//           itemDate.getFullYear() === inputDate.getFullYear()
//         );
//       });

//       setData(filteredData);
//     }
//   }, [startDate, secondaryData, selectedLocation]);

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
//       // console.log(loca.location);
//       setSelectedLocation(result.location);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF("landscape");

//     // Extract table headers
//     const headers = [
//       [
//         "Employee Name",
//         "Project",
//         ...Array.from({ length: 31 }, (_, i) => i + 1), // Days of the month
//         "NH",
//         "ND",
//         "PH",
//         "PH-D",
//         "AL/CL",
//         "SL",
//         "OFF",
//         "A",
//         "UAL",
//         "OT",
//         "Verified",
//         "Updater",
//       ],
//     ];

//     // Extract table rows
//     const rows = data.map((employee) => {
//       const normalWorkHours = Object.values(employee.NORMALWORKHRSPERDAY || {});
//       const totalHours = normalWorkHours.reduce(
//         (acc, hour) => acc + parseInt(hour || 0, 10),
//         0
//       );
//       const normalDays = normalWorkHours.length;

//       const totalOT = Object.values(employee.OVERTIMEHRS || {}).reduce(
//         (acc, ot) => acc + parseInt(ot || 0),
//         0
//       );

//       const row1 = [
//         `${employee.empName[0] || ""}\nBadge#: ${
//           employee.empBadgeNo || ""
//         }\nSAP ID: ${employee.sapNo || ""}`,
//         employee.jobcode,
//         ...Array.from(
//           { length: 31 },
//           (_, i) => employee.NORMALWORKHRSPERDAY?.[i + 1] || ""
//         ),
//         totalHours,
//         normalDays,
//         0, // PH
//         0, // PH-D
//         employee.empLeaveCount["Annual Leave"] || 0,
//         employee.empLeaveCount["Sick Leave"] || 0,
//         employee.days || 0,
//         0, // A
//         0, // UAL
//         totalOT,
//         "Yes", // Verified
//         "Updater", // Updater
//       ];

//       const row2 = [
//         "", // Employee Name
//         "", // Project
//         ...Array.from(
//           { length: 31 },
//           (_, i) => employee.OVERTIMEHRS?.[i + 1] || ""
//         ),
//         "", // NH
//         "", // ND
//         "", // PH
//         "", // PH-D
//         "", // AL/CL
//         "", // SL
//         "", // OFF
//         "", // A
//         "", // UAL
//         "", // OT
//         "", // Verified
//         "", // Updater
//       ];

//       return [row1, row2];
//     });

//     // Flatten the rows
//     const flatRows = rows.flat();

//     // Generate PDF
//     doc.autoTable({
//       head: headers,
//       body: flatRows,
//       startY: 20,
//       styles: { fontSize: 7, cellWidth: "auto", overflow: "linebreak" },
//       theme: "grid",
//     });

//     doc.save("table_data.pdf");
//   };
//   return (
//     <div className="bg-[#fafaf6] h-screen">
//       <div className="screen-size p-4">
//         <header className="m-5 flex justify-between">
//           <div className=" flex items-center">
//             <Link to="/timeSheet" className="text-xl flex-1 text-grey">
//               <FaArrowLeft />
//             </Link>
//           </div>
//           <header className="flex justify-center text_size_2 py-5 text-dark_grey ">
//             <p>View Time Sheet Summary</p>
//           </header>
//           <div></div>
//         </header>
//         <div className="flex  justify-between items-center w-full mb-5">
//           <div className="flex justify-start gap-4 ">
//             <div className="relative grid grid-cols-1 ">
//               <label className="text_size_6">Start Date</label>
//               {/* <br /> */}
//               <input
//                 type="date"
//                 className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </div>
//             <div className="relative grid grid-cols-1 ">
//               <label className="text_size_6">End Date</label>
//               {/* <br /> */}
//               <input
//                 type="date"
//                 className="border border-[#D9D9D9] rounded outline-none p-2 text-[#000000] text-sm"
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="flex justify-end gap-4 mt-6">
//             <div className="relative grid grid-cols-1 ">
//               <SearchDisplayForTimeSheet
//                 newFormData={LocationData}
//                 searchResult={selectLocation}
//                 placeholder="Search Location"
//                 rounded="rounded"
//                 searchIcon2={<FaAngleDown />}
//               />
//             </div>

//             <SearchBoxForTimeSheet
//               allEmpDetails={data}
//               searchResult={searchResult}
//               secondaryData={secondaryData}
//               placeholder="SAP ID / BADGE"
//               Position="viewSummary"
//             />
//           </div>
//         </div>
//         <div className="overflow-auto max-h-[60vh] ">
//           <table className="min-w-full text-sm bg-white ">
//             <thead className="bg-[#949393] ">
//               <tr className=" text-white">
//                 <th className="border px-2 py-1 border-dark_grey" rowSpan="2">
//                   Employee Name
//                 </th>
//                 <th className="border px-2 py-1 border-dark_grey" rowSpan="2">
//                   Project
//                 </th>
//                 {Array.from({ length: 31 }, (_, i) => (
//                   <th className="border px-2 py-1 border-dark_grey" key={i}>
//                     {i + 1}
//                   </th>
//                 ))}
//                 <th className="border  px-2 py-1 border-dark_grey">NH</th>
//                 <th className="border  px-2 py-1 border-dark_grey">ND</th>
//                 <th className="border  px-2 py-1 border-dark_grey">PH</th>
//                 <th className="border  px-2 py-1 border-dark_grey">PH-D</th>
//                 <th className="border  px-2 py-1 border-dark_grey">AL/CL</th>
//                 <th className="border  px-2 py-1 border-dark_grey">SL</th>
//                 <th className="border  px-2 py-1 border-dark_grey">OFF</th>
//                 <th className="border  px-2 py-1 border-dark_grey">A</th>
//                 <th className="border  px-2 py-1 border-dark_grey">UAL</th>
//                 <th className="border  px-2 py-1 border-dark_grey">OT</th>
//                 <th className="border  px-2 py-1 border-dark_grey">Verified</th>
//                 <th className="border  px-2 py-1 border-dark_grey">Updater</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data && data?.length > 0 ? (
//                 data.map((employee, index) => {
//                   const normalWorkHours = Object.values(
//                     employee.NORMALWORKHRSPERDAY || {}
//                   );
//                   const totalHours = normalWorkHours.reduce(
//                     (acc, hour) => acc + parseInt(hour || 0, 10),
//                     0
//                   );
//                   const NormalDays = normalWorkHours.length;

//                   const totalOT = Object.values(
//                     employee.OVERTIMEHRS || {}
//                   ).reduce((acc, ot) => acc + parseInt(ot || 0), 0);

//                   // const empName = employee.data.map((val, index) => val.name);
//                   // console.log(employee);

//                   return (
//                     <React.Fragment key={index}>
//                       <tr>
//                         <td
//                           className="border px-2 py-3 text-center"
//                           rowSpan="2"
//                         >
//                           <span>{employee.empName[0] || ""}</span>
//                           <br />
//                           <span>
//                             {`Badge# : ${employee.empBadgeNo || ""} | SapID : ${
//                               employee.sapNo || ""
//                             }`}
//                           </span>
//                           <br />
//                           <span>{`Hours/Day : ${employee.workHrs || ""}`}</span>
//                           <span>{`Days/Month : ${
//                             employee.workMonth || ""
//                           }`}</span>
//                           <br />
//                           <span>
//                             {`SalaryType : ${employee.salaryType || ""}`}
//                           </span>
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {employee.jobcode}
//                         </td>
//                         {/* {employee.NORMALWORKHRSPERDAY.map((hour, i) => (
//                     <td
//                       key={`hour-${index}-${i}`}
//                       className={`border px-2 py-1 ${
//                         hour !== "" ? "bg-green-200" : ""
//                       }`}
//                     >
//                       {hour}
//                     </td>
//                   )) || ""} */}
//                         {/* {employee.NORMALWORKHRSPERDAY[10]} */}
//                         {Array.from({ length: 31 }, (_, i) => (
//                           <td className="border px-2 py-1" key={i}>
//                             {employee.NORMALWORKHRSPERDAY?.[i + 1] || ""}
//                           </td>
//                         ))}

//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.nh || ""} */}
//                           {totalHours}
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.nd || ""} */}
//                           {NormalDays}
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.ph || ""} */}0
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.ph_d || ""} */}0
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.al_cl || ""} */}
//                           {employee.empLeaveCount["Annual Leave"] ||
//                             employee.empLeaveCount["Compassionate Leave"] ||
//                             0}
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.sl || ""} */}{" "}
//                           {employee.empLeaveCount["Sick Leave"] || 0}
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.off || ""} */} {employee.days || 0}
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.a || ""} */}0
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.ual || ""} */}0
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.ot_total || ""} */}
//                           {totalOT || 0}
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.verified || ""} */}yes
//                         </td>
//                         <td className="border px-2 py-1" rowSpan="2">
//                           {/* {employee.updater || ""} */}updater
//                         </td>
//                       </tr>
//                       <tr>
//                         {/* {employee.ot.map((ot, i) => ( */}
//                         {/* <td className={`border px-2 py-1 `}>
//                      {ot || ""}2
                    
//                   </td> */}
//                         {Array.from({ length: 31 }, (_, i) => (
//                           <td className="border px-2 py-1" key={i}>
//                             {/* Check if NORMALWORKHRSPERDAY has a key matching the index (i+1) */}
//                             {employee.OVERTIMEHRS?.[i + 1] || ""}
//                           </td>
//                         ))}
//                         {/* ))} */}
//                       </tr>
//                       <tr>
//                         <td className="border px-2 py-1" colSpan={1}>
//                           Total
//                         </td>
//                         {/* {employee.hoursPerDay.map((hour, i) => ( */}
//                         {Array.from({ length: 32 }, (_, i) => (
//                           <td
//                             key={i}
//                             className={`${i === 0 ? "border" : "border-b"}`}
//                           ></td>
//                         ))}
//                         {/* ))} */}
//                         <td className="border px-2 py-1">{totalHours}</td>
//                         <td className="border px-2 py-1">{NormalDays}</td>

//                         <td className="border px-2 py-1">
//                           {/* {employee.ph || ""} */}0
//                         </td>
//                         <td className="border px-2 py-1">
//                           {/* {employee.ph_d || ""} */}0
//                         </td>
//                         <td className="border px-2 py-1">
//                           {/* {employee.al_cl || ""} */}
//                           {employee.empLeaveCount["Annual Leave"] ||
//                             employee.empLeaveCount["Compassionate Leave"] ||
//                             0}
//                         </td>
//                         <td className="border px-2 py-1">
//                           {employee.empLeaveCount["Sick Leave"] || 0}
//                         </td>
//                         <td className="border px-2 py-1">
//                           {/* {employee.off || ""} */}
//                           {employee.days || 0}
//                         </td>
//                         <td className="border px-2 py-1">
//                           {/* {employee.a || ""} */}0
//                         </td>
//                         <td className="border px-2 py-1">
//                           {/* {employee.ual || ""} */}0
//                         </td>
//                         <td className="border px-2 py-1">{totalOT}</td>
//                         <td className="border px-2 py-1"></td>
//                         <td className="border px-2 py-1"></td>
//                       </tr>
//                     </React.Fragment>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="50"
//                     className="px-6 py-3 text-center text-dark_ash text_size_5"
//                   >
//                     <p className="px-6 py-6">No Table Data Available Here</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         <footer className="flex justify-center py-5">
//           <button
//             className=" rounded text_size_5 text-dark_grey bg-primary px-3 py-2 w-[180px]"
//             // onClick={exportToPDF}
//           >
//             Download
//           </button>
//         </footer>
//       </div>
//     </div>
//   );
// };

import React from 'react'

export const ViewSummaryORMC = () => {
  return (
    <div>ViewSummaryORMC</div>
  )
}