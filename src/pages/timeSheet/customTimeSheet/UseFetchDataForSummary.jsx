import { useState, useEffect, useRef } from "react";
import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";

export const UseFetchDataForSummary = (startDate, endDate, location) => {
  // const hasFetched = useRef(false);
  const [loading, setLoading] = useState(false);
  const client = generateClient(); // GraphQL client
  const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
    useState(null);
  const [getPosition, setGetPosition] = useState(null);
  // Ref to track if data has been fetched

  useEffect(() => {
    // if (hasFetched.current) return; // Prevent refetching if data has been fetched before
    const convertToISODate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      // Remove leading zeros by converting to numbers and then back to strings
      const formattedMonth = parseInt(month, 10); // Convert to number and back to string
      const formattedDay = parseInt(day, 10);

      return `${formattedMonth.toLocaleString()}/${formattedDay.toLocaleString()}/${year.toLocaleString()}`; // Format to 'M/D/YYYY'
    };

    const fetchData = async () => {
      setLoading(true); // Start loading indicator

      try {
        if (startDate && endDate && location) {
          const Position = localStorage.getItem("userType");
          setGetPosition(Position); // Set position from localStorage

          let nextToken = null; // Initialize pagination token
          let allData = []; // Store all fetched data
          const isoStartDate = convertToISODate(startDate); // e.g., 2024-01-10
          const isoEndDate = convertToISODate(endDate);
          // Fetch all pages using pagination
          console.log(
            "startDate : ",
            isoStartDate,
            "endDate : ",
            isoEndDate,
            "location : ",
            location
          );
          do {
            const filter = {
              and: [
                // { date: { ge: isoStartDate } }, // Greater than or equal to start date
                // { date: { le: isoEndDate } }, // Less than or equal to end date
                // 12/4
                // { date: { ge: '10/1/2024' } }, // Greater than or equal to start date
                // { date: { le: '10/5/2024' } },

                { date: { ge: '1/12/2024' } }, // Greater than or equal to start date
                { date: { le: '30/12/2024' } },
               
                { companyName: { eq: location } },
              ],
            };

            const response = await client.graphql({
              query: listTimeSheets,
              variables: {
                filter: filter,
                limit: 300, // Set limit to maximum (adjustable)
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

          // Update state with all fetched data
          console.log("AllDATA : ", allData);
          setConvertedStringToArrayObj(allData);
          // hasFetched.current = true; // Mark data as fetched
        }
      } catch (error) {
        console.log("ERROR : ", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData();
  }, [startDate, endDate, location]); // Dependency on startDate, endDate, and location

  return {
    convertedStringToArrayObj,
    getPosition,
    loading,
  };
};





// import { useState, useEffect, useRef } from "react";
// import { generateClient } from "@aws-amplify/api";
// import { listTimeSheets } from "../../../graphql/queries";

// export const UseFetchDataForSummary = (location) => {
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
           
//             const response = await client.graphql({
//               query: listTimeSheets,
//               variables: {
               
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
//   }, [ location]); // Dependency on startDate, endDate, and location

//   return {
//     convertedStringToArrayObj,
//     getPosition,
//     loading,
//   };
// };
