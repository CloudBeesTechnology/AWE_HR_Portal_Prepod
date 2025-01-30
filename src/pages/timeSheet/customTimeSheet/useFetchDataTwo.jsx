import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";

export const useFetchDataTwo = (titleName, cardName) => {
  const [loading, setLoading] = useState(false);
  const [finalData, setFinalData] = useState(null);
  const [getPosition, setGetPosition] = useState(null);

  const client = generateClient(); // GraphQL client

  useEffect(() => {
    const Position = localStorage.getItem("userType");
    setGetPosition(Position);

    // if (!titleName || !Position) {
    //   console.error("Missing titleName or Position");
    //   return; // Avoid fetch if necessary data is not available
    // }

    const fetchData = async () => {
      setLoading(true); // Start loading indicator
      let nextToken = null;
      let allData = [];

      // Generate the filter based on the cardName and titleName
      const filter = {
        and: [
          cardName === "Manager"
            ? { status: { eq: "Pending" } }
            : cardName === "viewTimeSheet"
            ? { fileType: { eq: titleName } }
            : cardName === "viewSummary"
            ? { status: { eq: "Approved" }, fileType: { eq: titleName } }
            : cardName === "rejectedItems"
            ? { status: { eq: "Rejected" }, fileType: { eq: titleName } }
            : cardName === "All"
            ? { status: { eq: "All" }, fileType: { eq: titleName } }
            : { status: { eq: "nothing" }, fileType: { eq: titleName } }, // return null if cardName doesn't match any known value
        ].filter(Boolean), // Remove any null values from the array
      };

   

      try {
        do {
          const response = await client.graphql({
            query: listTimeSheets,
            variables: {
              filter,
              limit: 800,
              nextToken,
            },
          });

          const fetchedData = response?.data?.listTimeSheets?.items || [];
          nextToken = response?.data?.listTimeSheets?.nextToken;

          const validData = fetchedData.filter(
            (item) => item !== null && item !== undefined
          );
          allData = [...allData, ...validData];
        } while (nextToken);

        // If no data is found, return null or an empty array based on your preference
        if (allData.length === 0) {
          setFinalData(null); // or []
        } else {
          setFinalData(allData); // Set fetched data
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
        setFinalData(null); // Set to null on error as well
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData(); // Call the fetch function
  }, [titleName, cardName]); // Dependency array to only trigger when titleName or cardName changes

  return { finalData };
};
