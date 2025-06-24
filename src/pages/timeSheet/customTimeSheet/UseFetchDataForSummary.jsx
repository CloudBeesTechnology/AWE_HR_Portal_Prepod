// import { useState, useEffect } from "react";
// import { generateClient } from "@aws-amplify/api";
// import { listTimeSheets } from "../../../graphql/queries";

// export const UseFetchDataForSummary = (
//   startDate,
//   endDate,
//   location,
//   ProcessedDataFunc,
//   offshoreType
// ) => {
//   const [loading, setLoading] = useState(null);
//   const [emptyTableMess, setEmptyTableMess] = useState(null);
//   const client = generateClient();
//   const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
//     useState(null);
//   const [getPosition, setGetPosition] = useState(null);

//   // Date range filter
//   const isDateInRange = (dateStr, start, end) => {
//     const date = new Date(dateStr).setHours(0, 0, 0, 0);
//     const sDate = new Date(start).setHours(0, 0, 0, 0);
//     const eDate = new Date(end).setHours(0, 0, 0, 0);
//     return date >= sDate && date <= eDate;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(false);
//       setEmptyTableMess(false);
//       ProcessedDataFunc(null);
//       setConvertedStringToArrayObj(null);

//       try {
//         if (startDate && endDate && location) {
//           const Position = localStorage.getItem("userType");
//           setGetPosition(Position);

//           let nextToken = null;
//           let allData = [];

//           // Fetch all data without filters
//           do {
//             const response = await client.graphql({
//               query: listTimeSheets,
//               variables: {
//                 limit: 1000,
//                 nextToken,
//               },
//             });

//             const fetchedData = response?.data?.listTimeSheets?.items || [];
//             nextToken = response?.data?.listTimeSheets?.nextToken;

//             for (const item of fetchedData) {
//               if (item) allData.push(item);
//             }
//           } while (nextToken);

//           // Chunk processing for optimized filtering
//           const CHUNK_SIZE = 1000;
//           let filteredData = [];
//           for (let i = 0; i < allData.length; i += CHUNK_SIZE) {
//             const chunk = allData.slice(i, i + CHUNK_SIZE);
//             for (const item of chunk) {
//               if (
//                 item?.status &&
//                 (item.status === "Approved" || item.status === "Verified") &&
//                 // item?.companyName === location &&
//                 item?.date &&
//                 isDateInRange(item.date, startDate, endDate)
//               ) {
//                 filteredData.push(item);
//               }
//             }
//           }

//           async function filterTimesheetByLocation(data, targetLocation) {
//             return data
//               .map((entry) => {
//                 if (entry?.fileType === "HO") {
//                   // Parse empWorkInfo JSON string
//                   const parsedWorkInfo = JSON.parse(entry.empWorkInfo[0]);

//                   // Filter by matching LOCATION
//                   const filteredWorkInfo = parsedWorkInfo.filter(
//                     (info) => info.LOCATION === targetLocation
//                   );

//                   // If no matching LOCATION, return null (we'll filter this out later)
//                   if (filteredWorkInfo.length === 0) return null;

//                   // Update companyName and assign filtered work info
//                   return {
//                     ...entry,
//                     companyName: targetLocation,
//                     empWorkInfo: [JSON.stringify(filteredWorkInfo)],
//                   };
//                 } else {
//                   // For non-HO entries, keep only if companyName matches
//                   if (entry.companyName === targetLocation) {
//                     return entry;
//                   }
//                   return null;
//                 }
//               })
//               .filter(Boolean); // Remove null entries
//           }

//           filteredData = await filterTimesheetByLocation(
//             filteredData,
//             location
//           );

//           if (offshoreType === "Direct" || offshoreType === "Indirect") {
//             // filteredData = filteredData.filter((fil) =>
//             //   fil.fileName.toUpperCase().includes(offshoreType.toUpperCase())
//             // );

//             filteredData = filteredData.filter((fil) => {
//               return fil.fileName
//                 .toUpperCase()
//                 .split(/[ .,\\-_]+/)
//                 .includes(offshoreType.toUpperCase());
//             });
//           }

//           if (filteredData.length > 0) {
//             setConvertedStringToArrayObj(filteredData);
//             setLoading(true);
//             setEmptyTableMess(false);
//           } else {
//             setEmptyTableMess(true);
//           }
//         } else {
//           console.log(
//             "startDate && endDate && location these are not have the data"
//           );
//         }
//       } catch (error) {
//         console.error("Data fetch error:", error);
//       }
//     };

//     fetchData();
//   }, [startDate, endDate, location, offshoreType]);

//   return {
//     convertedStringToArrayObj,
//     getPosition,
//     loading,
//     emptyTableMess,
//     setEmptyTableMess,
//     setLoading,
//   };
// };

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// import { useState, useEffect } from "react";
// import { generateClient } from "@aws-amplify/api";
// import { listTimeSheets } from "../../../graphql/queries";

// export const UseFetchDataForSummary = (
//   startDate,
//   endDate,
//   location,
//   ProcessedDataFunc,
//   offshoreType,
//   allData
// ) => {
//   const [loading, setLoading] = useState(null);
//   const [emptyTableMess, setEmptyTableMess] = useState(null);
//   const client = generateClient();
//   const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
//     useState(null);
//   const [getPosition, setGetPosition] = useState(null);

//   // Date range filter
//   const isDateInRange = (dateStr, start, end) => {
//     const date = new Date(dateStr).setHours(0, 0, 0, 0);
//     const sDate = new Date(start).setHours(0, 0, 0, 0);
//     const eDate = new Date(end).setHours(0, 0, 0, 0);
//     return date >= sDate && date <= eDate;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(false);
//       setEmptyTableMess(false);
//       ProcessedDataFunc(null);
//       setConvertedStringToArrayObj(null);

//       console.log("location : ", location);
//       console.log("startDate : ", startDate);
//       console.log("endDate : ", endDate);
//       console.log("allData : ", allData);
//       console.log("offshoreType : ", offshoreType);

//       let hasData = Array.isArray(allData) && allData?.length > 0;
//       try {
//         if (startDate && endDate && location && hasData) {
//           const Position = localStorage.getItem("userType");
//           setGetPosition(Position);
//           console.log("Working : ", "yes working");
//           // let nextToken = null;
//           // let allData = [];

//           // // Fetch all data without filters
//           // do {
//           //   const response = await client.graphql({
//           //     query: listTimeSheets,
//           //     variables: {
//           //       limit: 1000,
//           //       nextToken,
//           //     },
//           //   });

//           //   const fetchedData = response?.data?.listTimeSheets?.items || [];
//           //   nextToken = response?.data?.listTimeSheets?.nextToken;

//           //   for (const item of fetchedData) {
//           //     if (item) allData.push(item);
//           //   }
//           // } while (nextToken);

//           // Chunk processing for optimized filtering
//           const CHUNK_SIZE = 1000;
//           let filteredData = [];
//           for (let i = 0; i < allData.length; i += CHUNK_SIZE) {
//             const chunk = allData.slice(i, i + CHUNK_SIZE);
//             for (const item of chunk) {
//               if (
//                 item?.status &&
//                 (item.status === "Approved" || item.status === "Verified") &&
//                 // item?.companyName === location &&
//                 item?.date &&
//                 isDateInRange(item.date, startDate, endDate)
//               ) {
//                 filteredData.push(item);
//               }
//             }
//           }

//           async function filterTimesheetByLocation(data, targetLocation) {
//             return Array.isArray(data) && data.length > 0
//               ? data
//                   .map((entry) => {
//                     if (entry?.fileType === "HO") {
//                       // Parse empWorkInfo JSON string
//                       const parsedWorkInfo = JSON.parse(entry.empWorkInfo[0]);

//                       // Filter by matching LOCATION
//                       const filteredWorkInfo = parsedWorkInfo.filter(
//                         (info) => info.LOCATION === targetLocation
//                       );

//                       // If no matching LOCATION, return null (we'll filter this out later)
//                       if (filteredWorkInfo.length === 0) return null;

//                       // Update companyName and assign filtered work info
//                       return {
//                         ...entry,
//                         companyName: targetLocation,
//                         empWorkInfo: [JSON.stringify(filteredWorkInfo)],
//                       };
//                     } else {
//                       // For non-HO entries, keep only if companyName matches
//                       if (entry.companyName === targetLocation) {
//                         return entry;
//                       }
//                       return null;
//                     }
//                   })
//                   .filter(Boolean)
//               : []; // Remove null entries
//           }
//           console.log("filteredData : ", filteredData);
//           filteredData = await filterTimesheetByLocation(
//             filteredData,
//             location
//           );

//           if (offshoreType === "Direct" || offshoreType === "Indirect") {
//             // filteredData = filteredData.filter((fil) =>
//             //   fil.fileName.toUpperCase().includes(offshoreType.toUpperCase())
//             // );

//             filteredData = filteredData.filter((fil) => {
//               return fil.fileName
//                 .toUpperCase()
//                 .split(/[ .,\\-_]+/)
//                 .includes(offshoreType.toUpperCase());
//             });
//           }

//           if (Array.isArray(filteredData) && filteredData.length > 0) {
//             setConvertedStringToArrayObj(filteredData);
//             setLoading(true);
//             setEmptyTableMess(false);
//           } else {
//             setEmptyTableMess(true);
//           }
//         } else {
//           console.log(
//             "startDate && endDate && location these are not have the data"
//           );
//         }
//       } catch (error) {
//         console.error("Data fetch error:", error);
//       }
//     };

//     fetchData();
//   }, [startDate, endDate, location, offshoreType, allData]);

//   return {
//     convertedStringToArrayObj,
//     getPosition,
//     loading,
//     emptyTableMess,
//     setEmptyTableMess,
//     setLoading,
//   };
// };

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// import { useState, useEffect } from "react";

// export const UseFetchDataForSummary = (
//   startDate,
//   endDate,
//   location,
//   ProcessedDataFunc,
//   offshoreType,
//   allData
// ) => {
//   const [loading, setLoading] = useState(null);
//   const [emptyTableMess, setEmptyTableMess] = useState(false);
//   const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
//     useState(null);
//   const [getPosition, setGetPosition] = useState(null);

//   // ✅ Date range filter
//   const isDateInRange = (dateStr, start, end) => {
//     const date = new Date(dateStr).setHours(0, 0, 0, 0);
//     const sDate = new Date(start).setHours(0, 0, 0, 0);
//     const eDate = new Date(end).setHours(0, 0, 0, 0);
//     return date >= sDate && date <= eDate;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(false);
//       setEmptyTableMess(false);
//       ProcessedDataFunc(null);
//       setConvertedStringToArrayObj(null);

//       const hasData = Array.isArray(allData) && allData.length > 0;

//       // if (!startDate || !endDate || !location || !hasData) {
//       //   console.log("Missing required data.");
//       //   setLoading(false);
//       //   setEmptyTableMess(true);
//       //   return;
//       // }

//       try {
//         if (startDate && endDate && location && hasData) {
//           const Position = localStorage.getItem("userType");
//           setGetPosition(Position);

//           // ---- 1️⃣ Filter by Status & Date Range ----
//           const CHUNK_SIZE = 1000;

//           let statusFiltered = [];
//           for (let i = 0; i < allData.length; i += CHUNK_SIZE) {
//             const chunk = allData.slice(i, i + CHUNK_SIZE);
//             for (const item of chunk) {
//               if (
//                 item?.status &&
//                 (item.status === "Approved" || item.status === "Verified") &&
//                 // item?.companyName === location &&
//                 item?.date &&
//                 isDateInRange(item.date, startDate, endDate)
//               ) {
//                 statusFiltered.push(item);
//               }
//             }
//             // statusFiltered.push(
//             //   ...chunk.filter(
//             //     (item) =>
//             //       item?.status &&
//             //       (item.status === "Approved" || item.status === "Verified") &&
//             //       item?.date &&
//             //       isDateInRange(item.date, startDate, endDate)
//             //   )
//             // );
//           }

//           // ---- 2️⃣ Filter by Location ----
//           const locationFiltered = statusFiltered
//             .flatMap((entry) => {
//               if (entry?.fileType === "HO") {
//                 const parsedWorkInfo = JSON.parse(
//                   entry.empWorkInfo?.[0] || "[]"
//                 );
//                 const filteredWorkInfo = parsedWorkInfo.filter(
//                   (info) => info.LOCATION === location
//                 );
//                 if (filteredWorkInfo.length === 0) return [];
//                 return [
//                   {
//                     ...entry,
//                     companyName: location,
//                     empWorkInfo: [JSON.stringify(filteredWorkInfo)],
//                   },
//                 ];
//               } else {
//                 return entry.companyName === location
//                   ? [{ ...entry }] // 🟢 clone to avoid reference issues
//                   : [];
//               }
//             })
//             .filter(Boolean);

//           // ---- 3️⃣ Filter by Offshore Type ----
//           const finalFiltered =
//             offshoreType === "Direct" || offshoreType === "Indirect"
//               ? locationFiltered.filter((fil) =>
//                   fil.fileName
//                     .toUpperCase()
//                     .split(/[ .,\\-_]+/)
//                     .includes(offshoreType.toUpperCase())
//                 )
//               : locationFiltered;

//           // ---- 4️⃣ Final Results ----
//           if (finalFiltered.length > 0) {
//             setConvertedStringToArrayObj(finalFiltered);
//             setLoading(true);
//             setEmptyTableMess(false);
//           }
//           if (finalFiltered.length === 0) {
//             console.log("ELSE PART");
//             setEmptyTableMess(true);
//             setLoading(false);
//           }
//         } else {
//           console.log(
//             "startDate && endDate && location these are not have the data"
//           );
//         }
//       } catch (error) {
//         console.error("Data fetch error:", error);
//       }
//     };
//     fetchData();
//   }, [startDate, endDate, location, offshoreType, allData]);
//   console.log("emptyTableMess : ", emptyTableMess);
//   return {
//     convertedStringToArrayObj,
//     getPosition,
//     loading,
//     emptyTableMess,
//     setEmptyTableMess,
//     setLoading,
//   };
// };

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import { useState, useEffect } from "react";

export const UseFetchDataForSummary = (
  startDate,
  endDate,
  location,
  ProcessedDataFunc,
  offshoreType,
  allData
) => {
  const [loading, setLoading] = useState(null);
  const [emptyTableMess, setEmptyTableMess] = useState(null);
  const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
    useState(null);
  const [getPosition, setGetPosition] = useState(null);

  // ✅ Date range filter
  const isDateInRange = (dateStr, start, end) => {
    const date = new Date(dateStr).setHours(0, 0, 0, 0);
    const sDate = new Date(start).setHours(0, 0, 0, 0);
    const eDate = new Date(end).setHours(0, 0, 0, 0);
    return date >= sDate && date <= eDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false); // Start loading
      setEmptyTableMess(false); // Reset empty table only if starting fresh
      ProcessedDataFunc(null);
      setConvertedStringToArrayObj(null);

      const hasData = Array.isArray(allData) && allData.length > 0;

      // if (!startDate || !endDate || !location || !hasData) {
      //   console.log("Missing required data.");
      //   setLoading(false);
      //   setEmptyTableMess(true);
      //   return;
      // }

      try {
        if (startDate && endDate && location && hasData) {
          const Position = localStorage.getItem("userType");
          setGetPosition(Position);

          // ---- 1️⃣ Filter by Status & Date Range ----
          const CHUNK_SIZE = 1000;

          let statusFiltered = [];
          for (let i = 0; i < allData.length; i += CHUNK_SIZE) {
            const chunk = allData.slice(i, i + CHUNK_SIZE);
            for (const item of chunk) {
              if (
                item?.status &&
                (item.status === "Approved" || item.status === "Verified") &&
                // item?.companyName === location &&
                item?.date &&
                isDateInRange(item.date, startDate, endDate)
              ) {
                statusFiltered.push(item);
              }
            }
            // statusFiltered.push(
            //   ...chunk.filter(
            //     (item) =>
            //       item?.status &&
            //       (item.status === "Approved" || item.status === "Verified") &&
            //       item?.date &&
            //       isDateInRange(item.date, startDate, endDate)
            //   )
            // );
          }

          // ---- 2️⃣ Filter by Location ----
          const locationFiltered = statusFiltered
            .flatMap((entry) => {
              if (entry?.fileType === "HO") {
                const parsedWorkInfo = JSON.parse(
                  entry.empWorkInfo?.[0] || "[]"
                );
                const filteredWorkInfo = parsedWorkInfo.filter(
                  (info) => info.LOCATION === location
                );
                if (filteredWorkInfo.length === 0) return [];
                return [
                  {
                    ...entry,
                    companyName: location,
                    empWorkInfo: [JSON.stringify(filteredWorkInfo)],
                  },
                ];
              } else {
                return entry.companyName === location
                  ? [{ ...entry }] // 🟢 clone to avoid reference issues
                  : [];
              }
            })
            .filter(Boolean);

          // ---- 3️⃣ Filter by Offshore Type ----
          const finalFiltered =
            offshoreType === "Direct" || offshoreType === "Indirect"
              ? locationFiltered.filter((fil) =>
                  fil.fileName
                    .toUpperCase()
                    .split(/[ .,\\-_]+/)
                    .includes(offshoreType.toUpperCase())
                )
              : locationFiltered;

          // ---- 4️⃣ Final Results ----
          if (finalFiltered.length === 0) {
            setEmptyTableMess(true);
          }
          if (finalFiltered.length > 0) {
            setConvertedStringToArrayObj(finalFiltered);
            setLoading(true);
            setEmptyTableMess(false);
          }
        } else {
          console.log(
            "startDate && endDate && location these are not have the data"
          );
        }
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };
    fetchData();
  }, [startDate, endDate, location, offshoreType, allData]);

  return {
    convertedStringToArrayObj,
    getPosition,
    loading,
    emptyTableMess,
    setEmptyTableMess,
    setLoading,
  };
};
