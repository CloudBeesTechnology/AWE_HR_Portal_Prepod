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
            : { status: { eq: "nothing" }, fileType: { eq: titleName } },
        ].filter(Boolean),
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
          setFinalData(null);
        } else {
          setFinalData(allData);
        }
      } catch (error) {
        setFinalData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [titleName, cardName]);

  return { finalData };
};
