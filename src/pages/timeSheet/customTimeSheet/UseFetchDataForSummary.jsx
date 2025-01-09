// import { useState, useEffect, useRef } from "react";
// import { generateClient } from "@aws-amplify/api";
// import { listTimeSheets } from "../../../graphql/queries";

// export const UseFetchDataForSummary = (startDate, endDate, location) => {
//   // const hasFetched = useRef(false);
//   const [loading, setLoading] = useState(false);
//   const client = generateClient(); // GraphQL client
//   const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
//     useState(null);
//   const [getPosition, setGetPosition] = useState(null);
//   // Ref to track if data has been fetched

//   useEffect(() => {
//     // if (hasFetched.current) return; // Prevent refetching if data has been fetched before
//     const convertToISODate = (dateString) => {
//       const [year, month, day] = dateString.split("-");
//       // Remove leading zeros by converting to numbers and then back to strings
//       const formattedMonth = parseInt(month, 10); // Convert to number and back to string
//       const formattedDay = parseInt(day, 10);

//       return `${formattedMonth.toLocaleString()}/${formattedDay.toLocaleString()}/${year.toLocaleString()}`; // Format to 'M/D/YYYY'
//     };

//     const fetchData = async () => {
//       setLoading(true); // Start loading indicator

//       try {
//         if (startDate && endDate && location) {
//           const Position = localStorage.getItem("userType");
//           setGetPosition(Position); // Set position from localStorage

//           let nextToken = null; // Initialize pagination token
//           let allData = []; // Store all fetched data
//           const isoStartDate = convertToISODate(startDate); // e.g., 2024-01-10
//           const isoEndDate = convertToISODate(endDate);
//           // Fetch all pages using pagination
//           console.log(
//             "startDate : ",
//             isoStartDate,
//             "endDate : ",
//             isoEndDate,
//             "location : ",
//             location
//           );
//           do {
//             const filter = {
//               and: [
//                 // { date: { ge: isoStartDate } }, // Greater than or equal to start date
//                 // { date: { le: isoEndDate } }, // Less than or equal to end date
//                 // 12/4
//                 // { date: { ge: '10/1/2024' } }, // Greater than or equal to start date
//                 // { date: { le: '10/5/2024' } },

//                 { date: { ge: '1/12/2024' } }, // Greater than or equal to start date
//                 { date: { le: '30/12/2024' } },

//                 { companyName: { eq: location } },
//               ],
//             };

//             const response = await client.graphql({
//               query: listTimeSheets,
//               variables: {
//                 filter: filter,
//                 limit: 300, // Set limit to maximum (adjustable)
//                 nextToken,
//               },
//             });

//             // Extract data and nextToken
//             const fetchedData = response?.data?.listTimeSheets?.items || [];
//             nextToken = response?.data?.listTimeSheets?.nextToken;

//             // Append data while filtering null/undefined values
//             allData = [
//               ...allData,
//               ...fetchedData.filter(
//                 (item) => item !== null && item !== undefined
//               ),
//             ];
//           } while (nextToken); // Continue fetching until no more pages

//           // Update state with all fetched data
//           console.log("AllDATA : ", allData);
//           setConvertedStringToArrayObj(allData);
//           // hasFetched.current = true; // Mark data as fetched
//         }
//       } catch (error) {
//         console.log("ERROR : ", error);
//       } finally {
//         setLoading(false); // Stop loading indicator
//       }
//     };

//     fetchData();
//   }, [startDate, endDate, location]); // Dependency on startDate, endDate, and location

//   return {
//     convertedStringToArrayObj,
//     getPosition,
//     loading,
//   };
// };

import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";

export const UseFetchDataForSummary = (
  startDate,
  endDate,
  location,
  ProcessedDataFunc
) => {
  const [loading, setLoading] = useState(null); // Loading state
  const [emptyTableMess, setEmptyTableMess] = useState(null);
  const client = generateClient(); // GraphQL client
  const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
    useState(null); // Fetched data
  const [getPosition, setGetPosition] = useState(null); // Position state

  // Convert date string to 'M/D/YYYY' format
  const convertToISODate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const formattedMonth = parseInt(month, 10); // Remove leading zeros
    const formattedDay = parseInt(day, 10);
    return `${formattedMonth}/${formattedDay}/${year}`; // 'M/D/YYYY'
  };

  // Function to compare dates for filtering
  const isDateInRange = (date, start, end) => {
    const parsedDate = new Date(date);
    const parsedStart = new Date(start);
    const parsedEnd = new Date(end);
    console.log(
      parsedDate.toLocaleDateString(),
      " : ",
      parsedStart.toLocaleDateString(),
      " --- ",
      parsedDate.toLocaleDateString(),
      " : ",
      parsedEnd.toLocaleDateString()
    );
    return parsedDate >= parsedStart && parsedDate <= parsedEnd; // Check if within range
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false); // Start loading indicator
      setEmptyTableMess(false);
      ProcessedDataFunc(null);
      try {
        // Proceed only if all required parameters are available
        if (startDate && endDate && location) {
          const Position = localStorage.getItem("userType");
          setGetPosition(Position); // Set position from localStorage

          let nextToken = null; // Pagination token
          let allData = []; // Store all fetched data
          // const isoStartDate = convertToISODate(startDate); // e.g., '10/1/2024'
          // const isoEndDate = convertToISODate(endDate);

          // console.log(
          //   "startDate : ",
          //   isoStartDate,
          //   "endDate : ",
          //   isoEndDate,
          //   "location : ",
          //   location
          // );

          // Fetch all pages using pagination
          do {
            const filter = {
              and: [
                { status: { eq: "Approved" } },
                { companyName: { eq: location } },
              ],
            };

            const response = await client.graphql({
              query: listTimeSheets,
              variables: {
                filter: filter,
                limit: 500, // Fetch 300 records per call
                nextToken,
              },
            });

            // Extract data and nextToken
            const fetchedData = response?.data?.listTimeSheets?.items || [];
            nextToken = response?.data?.listTimeSheets?.nextToken;

            // Append data while filtering null/undefined values
            allData = [
              ...allData,
              ...fetchedData.filter(
                (item) => item !== null && item !== undefined
              ),
            ];
          } while (nextToken); // Continue fetching until no more pages

          console.log(allData);
          // const result=allData.filter((fil)=>fil.status==="Approved")
          // console.log(result)
          // Filter fetched data based on date range after fetching
          const filteredData = allData.filter((item) =>
            isDateInRange(item.date, startDate, endDate)
          );

          // Update state with filtered data
          console.log("Filtered DATA : ", filteredData);
          if (filteredData && filteredData.length > 0) {
            setLoading(true);
            setConvertedStringToArrayObj(filteredData); // Set filtered data
            setEmptyTableMess(false);
          } else {
            setEmptyTableMess(true);
          }
        }
      } catch (error) {
        console.log("ERROR : ", error);
      } finally {
        // setLoading(true); // Stop loading indicator
      }
    };

    fetchData();
  }, [startDate, endDate, location]); // Added startDate and endDate dependencies

  // Return fetched data and states
  return {
    convertedStringToArrayObj,
    getPosition,
    loading,
    emptyTableMess,
    setEmptyTableMess,
    setLoading,
  };
};
