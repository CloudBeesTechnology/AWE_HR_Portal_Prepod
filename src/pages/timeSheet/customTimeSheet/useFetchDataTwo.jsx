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

    const fetchData = async () => {
      setLoading(true);
      let nextToken = null;
      let allData = [];

      // Calculate date from 40 days ago
      const fortyDaysAgo = new Date();
      fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 32);
      const fortyDaysAgoISO = fortyDaysAgo.toISOString();

      // Create base filter based on cardName
      const baseFilter = [
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
          : { status: { eq: "nothing" }, fileType: { eq: titleName } },
      ].filter(Boolean);

      // Add date filter to the existing filter
      const filter = {
        and: [
          { createdAt: { ge: fortyDaysAgoISO } },
          ...baseFilter
        ]
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

        if (allData.length === 0) {
          setFinalData([]);
        } else {
          setFinalData(allData);
        }

        console.log(allData);
      } catch (error) {
        setFinalData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [titleName, cardName]);

  return { finalData };
};