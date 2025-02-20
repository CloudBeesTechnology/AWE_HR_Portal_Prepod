import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";

export const UseFetchDataForSummary = (
  startDate,
  endDate,
  location,
  ProcessedDataFunc
) => {
  const [loading, setLoading] = useState(null);
  const [emptyTableMess, setEmptyTableMess] = useState(null);
  const client = generateClient();
  const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
    useState(null);
  const [getPosition, setGetPosition] = useState(null);

  const isDateInRange = (date, start, end) => {
    const parsedDate = new Date(date);
    const parsedStart = new Date(start);
    const parsedEnd = new Date(end);

    parsedDate.setHours(0, 0, 0, 0);
    parsedStart.setHours(0, 0, 0, 0);
    parsedEnd.setHours(0, 0, 0, 0);

    return parsedDate >= parsedStart && parsedDate <= parsedEnd;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      setEmptyTableMess(false);
      ProcessedDataFunc(null);
      try {
        if (startDate && endDate && location) {
          const Position = localStorage.getItem("userType");
          setGetPosition(Position);

          let nextToken = null;
          let allData = [];

          do {
            const filter = {
              and: [
                // { status: { eq: "Approved" } },
                {
                  or: [
                    { status: { eq: "Approved" } },
                    { status: { eq: "Verified" } },
                  ],
                },
                { companyName: { eq: location } },
              ],
            };

            const response = await client.graphql({
              query: listTimeSheets,
              variables: {
                filter: filter,
                limit: 100,
                nextToken,
              },
            });

            const fetchedData = response?.data?.listTimeSheets?.items || [];
            nextToken = response?.data?.listTimeSheets?.nextToken;

            allData = [
              ...allData,
              ...fetchedData.filter(
                (item) => item !== null && item !== undefined
              ),
            ];
          } while (nextToken);

          const filteredData = allData.filter((item) =>
            isDateInRange(item.date, startDate, endDate)
          );

          if (filteredData && filteredData.length > 0) {
            setLoading(true);
            setConvertedStringToArrayObj(filteredData);
            setEmptyTableMess(false);
          } else {
            setEmptyTableMess(true);
          }
        }
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [startDate, endDate, location]);

  return {
    convertedStringToArrayObj,
    getPosition,
    loading,
    emptyTableMess,
    setEmptyTableMess,
    setLoading,
  };
};
