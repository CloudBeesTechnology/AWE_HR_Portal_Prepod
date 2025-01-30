import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";

export const useFetchData = (titleName, cardName) => {
  const [loading, setLoading] = useState(false);
  const client = generateClient(); // GraphQL client
  const [convertedStringToArrayObj, setConvertedStringToArrayObj] = useState(
    []
  );
  const [getPosition, setGetPosition] = useState(null);

  try {
    useEffect(() => {
      const Position = localStorage.getItem("userType");
      setGetPosition(Position);

      const fetchData = async () => {
        try {
          setLoading(true); // Start loading indicator

          let nextToken = null;
          let allData = [];
          let fetchedData = [];

          const filter = {
            and:
              cardName === "Manager"
                ? [
                    { status: { eq: "Pending" } },
                    { fileType: { eq: titleName } },
                  ]
                : cardName === "viewTimeSheet"
                ? [{ fileType: { eq: titleName } }]
                : cardName === "viewSummary"
                ? [
                    { status: { eq: "Approved" } },
                    { fileType: { eq: titleName } },
                  ]
                : cardName === "rejectedItems"
                ? [
                    { status: { eq: "Rejected" } },
                    { fileType: { eq: titleName } },
                  ]
                : cardName === "All"
                ? [{ status: { eq: "All" } }, { fileType: { eq: titleName } }]
                : [
                    { status: { eq: "nothing" } },
                    { fileType: { eq: titleName } },
                  ],
          };
          // Fetch data in a paginated manner
          do {
            const response = await client.graphql({
              query: listTimeSheets,
              variables: {
                filter: filter,
                limit: 800,
                nextToken,
              },
            });

            const result = response?.data?.listTimeSheets?.items || [];

            fetchedData = response?.data?.listTimeSheets?.items || [];

            nextToken = response?.data?.listTimeSheets?.nextToken; // Update nextToken for next page

            const validData = fetchedData.filter(
              (item) => item !== null && item !== undefined
            );

            allData = [...allData, ...fetchedData];
          } while (nextToken);

         

          setConvertedStringToArrayObj(allData);

          // Update state with all data
        } catch (error) {
          // console.error(`Error fetching data for ${titleName}:`, error);
        } finally {
          setLoading(false); // Stop loading indicator
        }
      };

      // Fetch only if titleName and Position are valid
      if ((Position === "Manager" && titleName) || Position !== "Manager") {
        fetchData();
      }
    }, [titleName, cardName]);

    return { convertedStringToArrayObj, getPosition, loading };
  } catch (err) {
    // console.log("ERROR : ", err);
  }
};
