import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  listBlngs,
  listHeadOffices,
  listORMCSheets,
  listSBWSheets,
} from "../../../graphql/queries";

export const useFetchData = (titleName) => {
  const client = generateClient(); // Move client generation inside the hook
  const [convertedStringToArrayObj, setConvertedStringToArrayObj] = useState(
    []
  );
  const [getPosition, setGetPosition] = useState(null);

  useEffect(() => {
    const Position = localStorage.getItem("userType");
    setGetPosition(Position);

    const fetchBLNGData = async () => {
      console.log("I am calling You");
      if (Position === "Manager" && titleName === "BLNG") {
        // For BLNG
        try {
          // Fetch the data using GraphQL
          const [fetchBLNGdata] = await Promise.all([
            client.graphql({
              query: listBlngs,
            }),
          ]);

          console.log(fetchBLNGdata);
          const BLNGdata = fetchBLNGdata?.data?.listBlngs?.items;
          console.log("headOffice : ", BLNGdata);
          if (BLNGdata && BLNGdata.length > 0) {
            const result = BLNGdata.map((m) => {
              if (Array.isArray(m.weeklySheet) && m.weeklySheet.length > 0) {
                const rawWeeklySheet = m.weeklySheet[0];
                const id = m.id;
                const Status = m.status;

                const cleanedData = rawWeeklySheet
                  .replace(/^"|\s*'|\s*"$|\\'/g, "")
                  .replace(/\\"/g, '"')
                  .replace(/\\n/g, "")
                  .replace(/\\\//g, "/");

                try {
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

            const filteredResult = result.filter((item) => item !== null);
            setConvertedStringToArrayObj(filteredResult);
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else if (Position === "Manager" && titleName === "HO") {
        //   For HO
        try {
          // Fetch the data using GraphQL
          const [fetchHOdata] = await Promise.all([
            client.graphql({
              query: listHeadOffices,
            }),
          ]);

          console.log(fetchHOdata);
          const HOdata = fetchHOdata?.data?.listHeadOffices?.items;

          if (HOdata && HOdata.length > 0) {
            const result = HOdata.map((m) => {
              if (Array.isArray(m.dailySheet) && m.dailySheet?.length > 0) {
                const rawWeeklySheet = m.dailySheet[0];
                const id = m.id;
                const Status = m.status;

                const cleanedData = rawWeeklySheet
                  .replace(/^"|\s*'|\s*"$|\\'/g, "")
                  .replace(/\\"/g, '"')
                  .replace(/\\n/g, "")
                  .replace(/\\\//g, "/");

                try {
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

            const filteredResult = result.filter((item) => item !== null);
            setConvertedStringToArrayObj(filteredResult);
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else if (Position === "Manager" && titleName === "SBW") {
        // For SBW
        try {
          // Fetch the data using GraphQL
          const [fetchSBWdata] = await Promise.all([
            client.graphql({
              query: listSBWSheets,
            }),
          ]);

          console.log(fetchSBWdata);
          const SBWdata = fetchSBWdata?.data?.listSBWSheets?.items;

          if (SBWdata && SBWdata.length > 0) {
            const result = SBWdata.map((m) => {
              if (Array.isArray(m.dailySheet) && m.dailySheet?.length > 0) {
                const rawWeeklySheet = m.dailySheet[0];
                const id = m.id;
                const Status = m.status;

                const cleanedData = rawWeeklySheet
                  .replace(/^"|\s*'|\s*"$|\\'/g, "")
                  .replace(/\\"/g, '"')
                  .replace(/\\n/g, "")
                  .replace(/\\\//g, "/");

                try {
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

            const filteredResult = result.filter((item) => item !== null);
            setConvertedStringToArrayObj(filteredResult);
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else if (Position === "Manager" && titleName === "ORMC") {
        // For SBW
        try {
          // Fetch the data using GraphQL
          const [fetchORMCdata] = await Promise.all([
            client.graphql({
              query: listORMCSheets,
            }),
          ]);

          console.log(fetchORMCdata);
          const ORMCdata = fetchORMCdata?.data?.listORMCSheets?.items;

          if (ORMCdata && ORMCdata.length > 0) {
            const result = ORMCdata.map((m) => {
              if (Array.isArray(m.dailySheet) && m.dailySheet?.length > 0) {
                const rawWeeklySheet = m.dailySheet[0];
                const id = m.id;
                const Status = m.status;

                const cleanedData = rawWeeklySheet
                  .replace(/^"|\s*'|\s*"$|\\'/g, "")
                  .replace(/\\"/g, '"')
                  .replace(/\\n/g, "")
                  .replace(/\\\//g, "/");

                try {
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

            const filteredResult = result.filter((item) => item !== null);
            setConvertedStringToArrayObj(filteredResult);
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchBLNGData();
  }, [titleName]);

  return { convertedStringToArrayObj, getPosition };
};

// import { useState, useEffect } from "react";
// import { generateClient } from "@aws-amplify/api";
// import { listBlngs, listHeadOffices } from "../../../graphql/queries";

// export const useFetchData = (titleName) => {
//   const client = generateClient();
//   const [convertedStringToArrayObj, setConvertedStringToArrayObj] = useState(
//     []
//   );
//   const [getPosition, setGetPosition] = useState(null);

//   useEffect(() => {
//     const Position = localStorage.getItem("userType");
//     setGetPosition(Position);

//     // Helper function to fetch and process data
//     const fetchData = async (query, sheetKey) => {
//       try {
//         const { data } = await client.graphql({ query });
//         console.log(data);
//         const items = data?.[Object.keys(data)[1]]?.items;
//         console.log(items);
//         // listHeadOffices, "dailySheet"
//         // const BLNGdata = data?.data?.dailySheet?.items;
//         // console.log(BLNGdata);
//         if (items && items.length > 0) {
//           const processedData = items.map((item) => {
//             if (Array.isArray(item[sheetKey]) && item[sheetKey].length > 0) {
//               const rawSheetData = item[sheetKey][0];
//               const id = item.id;
//               const status = item.status;

//               const cleanedData = rawSheetData
//                 .replace(/^"|\s*'|\s*"$|\\'/g, "")
//                 .replace(/\\"/g, '"')
//                 .replace(/\\n/g, "")
//                 .replace(/\\\//g, "/");

//               try {
//                 const arrayOfObjects = JSON.parse(cleanedData);
//                 return [
//                   { id },
//                   arrayOfObjects.map((obj) => ({ ...obj, status })),
//                 ];
//               } catch (error) {
//                 console.error("Error parsing JSON:", error);
//                 return null;
//               }
//             }
//             return null;
//           });

//           return processedData.filter((item) => item !== null);
//         } else {
//           console.log("No data available");
//           return [];
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         return [];
//       }
//     };

//     const fetchBLNGData = async () => {
//       if (Position === "Manager") {
//         if (titleName === "BLNG") {
//           const result = await fetchData(listBlngs, "weeklySheet");
//           setConvertedStringToArrayObj(result);
//         } else if (titleName === "HO") {
//           const result = await fetchData(listHeadOffices, "dailySheet");
//           setConvertedStringToArrayObj(result);
//         }
//       }
//     };

//     fetchBLNGData();
//   }, [titleName]);

//   return { convertedStringToArrayObj, getPosition };
// };
