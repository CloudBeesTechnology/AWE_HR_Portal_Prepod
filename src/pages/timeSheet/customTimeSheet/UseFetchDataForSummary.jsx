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

  // Function to compare dates for filtering
  const isDateInRange = (date, start, end) => {
    const parsedDate = new Date(date);
    const parsedStart = new Date(start);
    const parsedEnd = new Date(end);

    parsedDate.setHours(0, 0, 0, 0);
    parsedStart.setHours(0, 0, 0, 0);
    parsedEnd.setHours(0, 0, 0, 0);
   
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
                limit: 100, // Fetch 300 records per call
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

          const filteredData = allData.filter((item) =>
            isDateInRange(item.date, startDate, endDate)
          );

          // console.log("Filtered DATA : ", filteredData);
          if (filteredData && filteredData.length > 0) {
            setLoading(true);
            setConvertedStringToArrayObj(filteredData); // Set filtered data
            setEmptyTableMess(false);
          } else {
            setEmptyTableMess(true);
          }
        }
      } catch (error) {
        // console.log("ERROR : ", error);
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
