import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";

export const useFetchData = (
  titleName,
  cardName,
  setLoading,
  loading,
  setMessage
) => {
  const client = generateClient();
  const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
    useState(null);
  const [getPosition, setGetPosition] = useState(null);

  try {
    useEffect(() => {
      const Position = localStorage.getItem("userType");
      setGetPosition(Position);

      const fetchData = async () => {
        try {
          setLoading?.(true);
          setMessage?.("Please wait a few seconds...");

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
                : cardName === "Unsubmitted"
                ? [
                    { status: { eq: "Unsubmitted" } },
                    { fileType: { eq: titleName } },
                  ]
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

            nextToken = response?.data?.listTimeSheets?.nextToken;

            const validData = fetchedData.filter(
              (item) => item !== null && item !== undefined
            );

            allData = [...allData, ...fetchedData];
          } while (nextToken);
         
          setConvertedStringToArrayObj(allData);

          if (allData.length === 0) {
            setMessage?.("No data available");
          } else {
            setMessage?.("");
          }
        } catch (error) {
        } finally {
          setLoading?.(false);
        }
      };

      if ((Position === "Manager" && titleName) || Position !== "Manager") {
        fetchData();
      }
    }, [titleName, cardName]);

    return { convertedStringToArrayObj, getPosition, loading };
  } catch (err) {
    setLoading?.(false);

    setMessage("An error occurred. Please try again.");
  }
};
