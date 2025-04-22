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

  // Date range filter
  const isDateInRange = (dateStr, start, end) => {
    const date = new Date(dateStr).setHours(0, 0, 0, 0);
    const sDate = new Date(start).setHours(0, 0, 0, 0);
    const eDate = new Date(end).setHours(0, 0, 0, 0);
    return date >= sDate && date <= eDate;
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

          // Fetch all data without filters
          do {
            const response = await client.graphql({
              query: listTimeSheets,
              variables: {
                limit: 1000,
                nextToken,
              },
            });

            const fetchedData = response?.data?.listTimeSheets?.items || [];
            nextToken = response?.data?.listTimeSheets?.nextToken;

            for (const item of fetchedData) {
              if (item) allData.push(item);
            }
          } while (nextToken);

          // Chunk processing for optimized filtering
          const CHUNK_SIZE = 1000;
          const filteredData = [];
          for (let i = 0; i < allData.length; i += CHUNK_SIZE) {
            const chunk = allData.slice(i, i + CHUNK_SIZE);
            for (const item of chunk) {
              if (
                item?.status &&
                (item.status === "Approved" || item.status === "Verified") &&
                item?.companyName === location &&
                item?.date &&
                isDateInRange(item.date, startDate, endDate)
              ) {
                filteredData.push(item);
              }
            }
          }

          if (filteredData.length > 0) {
            setConvertedStringToArrayObj(filteredData);
            setLoading(true);
            setEmptyTableMess(false);
          } else {
            setEmptyTableMess(true);
          }
        }
      } catch (error) {
        console.error("Data fetch error:", error);
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
