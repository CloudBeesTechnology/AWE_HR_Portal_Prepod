// import { useState, useEffect } from "react";
// import { generateClient } from "@aws-amplify/api";
// import {
//   listBlngs,
//   listHeadOffices,
//   listOffshoreSheets,
//   listORMCSheets,
//   listSBWSheets,
// } from "../../../graphql/queries";

// export const useFetchData = (titleName) => {
//   const client = generateClient(); // Move client generation inside the hook
//   const [convertedStringToArrayObj, setConvertedStringToArrayObj] = useState(
//     []
//   );
//   const [getPosition, setGetPosition] = useState(null);

//   useEffect(() => {
//     const Position = localStorage.getItem("userType");
//     setGetPosition(Position);

//     const fetchBLNGData = async () => {
//       console.log("I am calling You");
//       if (Position !== "Manager" && titleName === "BLNG") {
//         // For BLNG
//         try {
//           // Fetch the data using GraphQL
//           const [fetchBLNGdata] = await Promise.all([
//             client.graphql({
//               query: listBlngs,
//             }),
//           ]);

//           console.log(fetchBLNGdata);
//           const BLNGdata = fetchBLNGdata?.data?.listBlngs?.items;
//           console.log("headOffice : ", BLNGdata);
//           if (BLNGdata && BLNGdata.length > 0) {
//             const result = BLNGdata.map((m) => {
//               if (Array.isArray(m.weeklySheet) && m.weeklySheet.length > 0) {
//                 const rawWeeklySheet = m.weeklySheet[0];
//                 const id = m.id;
//                 const Status = m.status;

//                 const cleanedData = rawWeeklySheet
//                   .replace(/^"|\s*'|\s*"$|\\'/g, "")
//                   .replace(/\\"/g, '"')
//                   .replace(/\\n/g, "")
//                   .replace(/\\\//g, "/");

//                 try {
//                   const arrayOfObjects = JSON.parse(cleanedData);
//                   const dataWithStatus = arrayOfObjects.map((obj) => ({
//                     ...obj,
//                     status: Status,
//                   }));
//                   return [{ id: id }, dataWithStatus];
//                 } catch (error) {
//                   console.error("Error parsing JSON:", error);
//                   return null;
//                 }
//               }
//               return null;
//             });

//             const filteredResult = result.filter((item) => item !== null);
//             setConvertedStringToArrayObj(filteredResult);
//           } else {
//             console.log("No data available");
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       } else if (Position !== "Manager" && titleName === "HO") {
//         //   For HO
//         try {
//           // Fetch the data using GraphQL
//           const [fetchHOdata] = await Promise.all([
//             client.graphql({
//               query: listHeadOffices,
//             }),
//           ]);

//           console.log(fetchHOdata);
//           const HOdata = fetchHOdata?.data?.listHeadOffices?.items;

//           if (HOdata && HOdata.length > 0) {
//             const result = HOdata.map((m) => {
//               if (Array.isArray(m.dailySheet) && m.dailySheet?.length > 0) {
//                 const rawWeeklySheet = m.dailySheet[0];
//                 const id = m.id;
//                 const Status = m.status;

//                 const cleanedData = rawWeeklySheet
//                   .replace(/^"|\s*'|\s*"$|\\'/g, "")
//                   .replace(/\\"/g, '"')
//                   .replace(/\\n/g, "")
//                   .replace(/\\\//g, "/");

//                 try {
//                   const arrayOfObjects = JSON.parse(cleanedData);
//                   const dataWithStatus = arrayOfObjects.map((obj) => ({
//                     ...obj,
//                     status: Status,
//                   }));
//                   return [{ id: id }, dataWithStatus];
//                 } catch (error) {
//                   console.error("Error parsing JSON:", error);
//                   return null;
//                 }
//               }
//               return null;
//             });

//             const filteredResult = result.filter((item) => item !== null);
//             setConvertedStringToArrayObj(filteredResult);
//           } else {
//             console.log("No data available");
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       } else if (Position !== "Manager" && titleName === "SBW") {
//         // For SBW
//         try {
//           // Fetch the data using GraphQL
//           const [fetchSBWdata] = await Promise.all([
//             client.graphql({
//               query: listSBWSheets,
//             }),
//           ]);

//           console.log(fetchSBWdata);
//           const SBWdata = fetchSBWdata?.data?.listSBWSheets?.items;

//           if (SBWdata && SBWdata.length > 0) {
//             const result = SBWdata.map((m) => {
//               if (Array.isArray(m.dailySheet) && m.dailySheet?.length > 0) {
//                 const rawWeeklySheet = m.dailySheet[0];
//                 const id = m.id;
//                 const Status = m.status;

//                 const cleanedData = rawWeeklySheet
//                   .replace(/^"|\s*'|\s*"$|\\'/g, "")
//                   .replace(/\\"/g, '"')
//                   .replace(/\\n/g, "")
//                   .replace(/\\\//g, "/");

//                 try {
//                   const arrayOfObjects = JSON.parse(cleanedData);
//                   const dataWithStatus = arrayOfObjects.map((obj) => ({
//                     ...obj,
//                     status: Status,
//                   }));
//                   return [{ id: id }, dataWithStatus];
//                 } catch (error) {
//                   console.error("Error parsing JSON:", error);
//                   return null;
//                 }
//               }
//               return null;
//             });

//             const filteredResult = result.filter((item) => item !== null);
//             setConvertedStringToArrayObj(filteredResult);
//           } else {
//             console.log("No data available");
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       } else if (Position !== "Manager" && titleName === "ORMC") {
//         // For SBW
//         try {
//           // Fetch the data using GraphQL
//           const [fetchORMCdata] = await Promise.all([
//             client.graphql({
//               query: listORMCSheets,
//             }),
//           ]);

//           console.log(fetchORMCdata);
//           const ORMCdata = fetchORMCdata?.data?.listORMCSheets?.items;

//           if (ORMCdata && ORMCdata.length > 0) {
//             const result = ORMCdata.map((m) => {
//               if (Array.isArray(m.dailySheet) && m.dailySheet?.length > 0) {
//                 const rawWeeklySheet = m.dailySheet[0];
//                 const id = m.id;
//                 const Status = m.status;

//                 const cleanedData = rawWeeklySheet
//                   .replace(/^"|\s*'|\s*"$|\\'/g, "")
//                   .replace(/\\"/g, '"')
//                   .replace(/\\n/g, "")
//                   .replace(/\\\//g, "/");

//                 try {
//                   const arrayOfObjects = JSON.parse(cleanedData);
//                   const dataWithStatus = arrayOfObjects.map((obj) => ({
//                     ...obj,
//                     status: Status,
//                   }));
//                   return [{ id: id }, dataWithStatus];
//                 } catch (error) {
//                   console.error("Error parsing JSON:", error);
//                   return null;
//                 }
//               }
//               return null;
//             });

//             const filteredResult = result.filter((item) => item !== null);
//             setConvertedStringToArrayObj(filteredResult);
//           } else {
//             console.log("No data available");
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       } else if (Position !== "Manager" && titleName === "Offshore") {
//         // For SBW
//         try {
//           // Fetch the data using GraphQL
//           const [fetchOffShoredata] = await Promise.all([
//             client.graphql({
//               query: listOffshoreSheets,
//             }),
//           ]);

//           console.log(fetchOffShoredata);
//           const OffshoreSheet =
//             fetchOffShoredata?.data?.listOffshoreSheets?.items;

//           if (OffshoreSheet && OffshoreSheet.length > 0) {
//             const result = OffshoreSheet.map((m) => {
//               if (Array.isArray(m.dailySheet) && m.dailySheet?.length > 0) {
//                 const rawWeeklySheet = m.dailySheet[0];
//                 const id = m.id;
//                 const Status = m.status;

//                 const cleanedData = rawWeeklySheet
//                   .replace(/^"|\s*'|\s*"$|\\'/g, "")
//                   .replace(/\\"/g, '"')
//                   .replace(/\\n/g, "")
//                   .replace(/\\\//g, "/");

//                 try {
//                   const arrayOfObjects = JSON.parse(cleanedData);
//                   const dataWithStatus = arrayOfObjects.map((obj) => ({
//                     ...obj,
//                     status: Status,
//                   }));
//                   return [{ id: id }, dataWithStatus];
//                 } catch (error) {
//                   console.error("Error parsing JSON:", error);
//                   return null;
//                 }
//               }
//               return null;
//             });

//             const filteredResult = result.filter((item) => item !== null);
//             setConvertedStringToArrayObj(filteredResult);
//           } else {
//             console.log("No data available");
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       }
//     };
//     fetchBLNGData();
//   }, [titleName]);

//   return { convertedStringToArrayObj, getPosition };
// };
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  listBlngs,
  listHeadOffices,
  listSBWSheets,
  listORMCSheets,
  listOffshoreSheets,
} from "../../../graphql/queries";
// import { useScrollableView } from "./UseScrollableView";

// export const useFetchData = (titleName) => {
//   const [loading, setLoading] = useState(null);
//   const client = generateClient(); // GraphQL client
//   const [convertedStringToArrayObj, setConvertedStringToArrayObj] = useState(
//     []
//   );
//   const [getPosition, setGetPosition] = useState(null);

//   useEffect(() => {
//     // setLoading(boolean);
//     const Position = localStorage.getItem("userType");
//     setGetPosition(Position);

//     const fetchData = async () => {
//       try {
//         let query;
//         let dataKey;

//         // Map titleName to appropriate query and data keys

//         switch (titleName) {
//           case "BLNG":
//             query = listBlngs;
//             dataKey = "listBlngs";
//             break;
//           case "HO":
//             query = listHeadOffices;
//             dataKey = "listHeadOffices";
//             break;
//           case "SBW":
//             query = listSBWSheets;
//             dataKey = "listSBWSheets";
//             break;
//           case "ORMC":
//             query = listORMCSheets;
//             dataKey = "listORMCSheets";
//             break;
//           case "Offshore":
//             query = listOffshoreSheets;
//             dataKey = "listOffshoreSheets";
//             break;
//           default:
//             console.log("Invalid titleName");
//             return;
//         }
//         let nextToken = null;
//         // Fetch data from GraphQL
//         const response = await client.graphql({
//           query: query,
//           variables: { limit: 100, nextToken },
//         });
//         const fetchedData = response?.data?.[dataKey]?.items || [];
//         console.log(fetchedData);
//         // Transform data if needed
//         const processedData = fetchedData.map((item) => {
//           const rawSheet = item.weeklySheet || item.dailySheet;
//           if (Array.isArray(rawSheet) && rawSheet.length > 0) {
//             const rawData = rawSheet[0];
//             const id = item.id;
//             const Status = item.status;

//             try {
//               const cleanedData = rawData
//                 .replace(/^"|\s*'|\s*"$|\\'/g, "")
//                 .replace(/\\"/g, '"')
//                 .replace(/\\n/g, "")
//                 .replace(/\\\//g, "/");
//               const arrayOfObjects = JSON.parse(cleanedData);
//               const dataWithStatus = arrayOfObjects.map((obj) => ({
//                 ...obj,
//                 status: Status,
//               }));
//               return [{ id: id }, dataWithStatus];
//             } catch (error) {
//               console.error("Error parsing JSON:", error);
//               return null;
//             }
//           }
//           return null;
//         });
//         const filteredDatas = processedData.map((item) => item);
//         console.log(processedData);
//         // Filter out invalid entries
//         const filteredData = processedData.filter((item) => item !== null);
//         console.log(filteredData);
//         setConvertedStringToArrayObj(filteredData);
//       } catch (error) {
//         console.error(`Error fetching data for ${titleName}:`, error);
//       }
//     };

//     // Fetch only if titleName and Position are valid
//     if ((Position === "Manager" && titleName) || Position !== "Manager") {
//       fetchData();
//     }
//     console.log(convertedStringToArrayObj);
//   }, [titleName]);

//   return { convertedStringToArrayObj, getPosition };
// };
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
export const useFetchData = (titleName) => {
  const [loading, setLoading] = useState(false);
  const client = generateClient(); // GraphQL client
  const [convertedStringToArrayObj, setConvertedStringToArrayObj] = useState(
    []
  );
  const [getPosition, setGetPosition] = useState(null);

  useEffect(() => {
    const Position = localStorage.getItem("userType");
    setGetPosition(Position);

    const fetchData = async () => {
      try {
        setLoading(true); // Start loading indicator
        let query;
        let dataKey;

        // Map titleName to appropriate query and data keys
        switch (titleName) {
          case "BLNG":
            query = listBlngs;
            dataKey = "listBlngs";
            break;
          case "HO":
            query = listHeadOffices;
            dataKey = "listHeadOffices";
            break;
          case "SBW":
            query = listSBWSheets;
            dataKey = "listSBWSheets";
            break;
          case "ORMC":
            query = listORMCSheets;
            dataKey = "listORMCSheets";
            break;
          case "Offshore":
            query = listOffshoreSheets;
            dataKey = "listOffshoreSheets";
            break;
          default:
            setLoading(false); // Stop loading on invalid titleName
            return;
        }

        let nextToken = null;
        let allData = [];

        // Fetch data in a paginated manner
        do {
          const response = await client.graphql({
            query: query,
            variables: { limit: 10, nextToken },
          });

          const fetchedData = response?.data?.[dataKey]?.items || [];

          nextToken = response?.data?.[dataKey]?.nextToken; // Update nextToken for next page

          // Process fetched data
          const processedData = fetchedData.map((item) => {
            const rawSheet = item.weeklySheet || item.dailySheet;
            if (Array.isArray(rawSheet) && rawSheet.length > 0) {
              const rawData = rawSheet[0];
              const id = item.id;
              const Status = item.status;

              try {
                const cleanedData = rawData
                  .replace(/^"|\s*'|\s*"$|\\'/g, "")
                  .replace(/\\"/g, '"')
                  .replace(/\\n/g, "")
                  .replace(/\\\//g, "/");
                const arrayOfObjects = JSON.parse(cleanedData);
                const dataWithStatus = arrayOfObjects.map((obj) => ({
                  ...obj,
                  status: Status,
                }));
                return [{ id: id }, dataWithStatus];
              } catch (error) {
                console.error("Error parsing JSON:", error);
                return null;
              }
            }
            return null;
          });

          // Append valid data to allData
          const validData = processedData.filter((item) => item !== null);
          allData = [...allData, ...validData];
        } while (nextToken);
        console.log("useFetchData : ", allData);
        setConvertedStringToArrayObj(allData); // Update state with all data
      } catch (error) {
        console.error(`Error fetching data for ${titleName}:`, error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    // Fetch only if titleName and Position are valid
    if ((Position === "Manager" && titleName) || Position !== "Manager") {
      fetchData();
    }
  }, [titleName]);
  // const { handleScroll, visibleData, setVisibleData } = useScrollableView(
  //   convertedStringToArrayObj,
  //   "Manager"
  // );

  return { convertedStringToArrayObj, getPosition, loading };
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// import { useState, useEffect } from "react";
// import { generateClient } from "@aws-amplify/api";
// import {
//   listBlngs,
//   listHeadOffices,
//   listSBWSheets,
//   listORMCSheets,
//   listOffshoreSheets,
// } from "../../../graphql/queries";

// export const useFetchData = (titleName) => {
//   const [loading, setLoading] = useState(false);
//   const [convertedStringToArrayObj, setConvertedStringToArrayObj] = useState(
//     []
//   );
//   const [getPosition, setGetPosition] = useState(null);

//   useEffect(() => {
//     const client = generateClient(); // GraphQL client
//     const Position = localStorage.getItem("userType");
//     setGetPosition(Position);

//     const fetchAllData = async (
//       query,
//       dataKey,
//       nextToken = null,
//       accumulatedData = []
//     ) => {
//       try {
//         // Fetch data for the current page
//         const response = await client.graphql({
//           query,
//           variables: { limit: 1, nextToken },
//         });

//         const currentItems = response?.data?.[dataKey]?.items || [];
//         const newNextToken = response?.data?.[dataKey]?.nextToken;

//         // Combine current page data with accumulated data
//         const combinedData = [...accumulatedData, ...currentItems];

//         if (newNextToken) {
//           // Continue fetching if nextToken exists
//           return fetchAllData(query, dataKey, newNextToken, combinedData);
//         } else {
//           // All data fetched
//           return combinedData;
//         }
//       } catch (error) {
//         console.error(`Error fetching data for ${dataKey}:`, error);
//         return accumulatedData; // Return the accumulated data even in case of errors
//       }
//     };

//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         let query;
//         let dataKey;

//         // Map titleName to appropriate query and data keys
//         switch (titleName) {
//           case "BLNG":
//             query = listBlngs;
//             dataKey = "listBlngs";
//             break;
//           case "HO":
//             query = listHeadOffices;
//             dataKey = "listHeadOffices";
//             break;
//           case "SBW":
//             query = listSBWSheets;
//             dataKey = "listSBWSheets";
//             break;
//           case "ORMC":
//             query = listORMCSheets;
//             dataKey = "listORMCSheets";
//             break;
//           case "Offshore":
//             query = listOffshoreSheets;
//             dataKey = "listOffshoreSheets";
//             break;
//           default:
//             console.log("Invalid titleName");
//             setLoading(false);
//             return;
//         }

//         // Fetch all data
//         const fetchedData = await fetchAllData(query, dataKey);

//         // Process fetched data
//         const processedData = fetchedData.map((item) => {
//           const rawSheet = item.weeklySheet || item.dailySheet;
//           if (Array.isArray(rawSheet) && rawSheet.length > 0) {
//             const rawData = rawSheet[0];
//             const id = item.id;
//             const status = item.status;

//             try {
//               const cleanedData = rawData
//                 .replace(/^"|\s*'|\s*"$|\\'/g, "")
//                 .replace(/\\"/g, '"')
//                 .replace(/\\n/g, "")
//                 .replace(/\\\//g, "/");
//               const arrayOfObjects = JSON.parse(cleanedData);
//               const dataWithStatus = arrayOfObjects.map((obj) => ({
//                 ...obj,
//                 status,
//               }));
//               return [{ id }, dataWithStatus];
//             } catch (error) {
//               console.error("Error parsing JSON:", error);
//               return null;
//             }
//           }
//           return null;
//         });

//         // Filter out invalid entries
//         const filteredData = processedData.filter((item) => item !== null);
//         console.log(filteredData);
//         setConvertedStringToArrayObj(filteredData);
//       } catch (error) {
//         console.error(`Error processing data for ${titleName}:`, error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Fetch only if titleName and Position are valid
//     if ((Position === "Manager" && titleName) || Position !== "Manager") {
//       fetchData();
//     }
//   }, [titleName]);

//   return { convertedStringToArrayObj, getPosition, loading };
// };
