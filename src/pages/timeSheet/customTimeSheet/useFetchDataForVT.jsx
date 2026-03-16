import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";

export const useFetchDataForVT = (
  titleName,
  cardName
  // setLoading,
  // loading,
  // setMessage
) => {
  const client = generateClient();
  const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
    useState(null);
  const [getPosition, setGetPosition] = useState(null);
  const [emptyTableMess, setEmptyTableMess] = useState(null);
  const [loading, setLoading] = useState(null);
  try {
    useEffect(() => {
      const Position = localStorage.getItem("userType");
      setGetPosition(Position);

      const fetchData = async () => {
        setLoading(null); // Start loading
        setEmptyTableMess(null); // Reset empty table only if starting fresh

        setConvertedStringToArrayObj(null);
        if (titleName && cardName) {
          try {
            let nextToken = null;
            let allData = [];
            let fetchedData = [];

            // Calculate date from 40 days ago
            const fortyDaysAgo = new Date();
            fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 40);
            const fortyDaysAgoISO = fortyDaysAgo.toISOString();

            // Date filter only
            const filter = {
              createdAt: { ge: fortyDaysAgoISO }
            };

            // Fetch data in a paginated manner with date filter
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

            // Apply cardName filter locally
            let filteredData = allData;
            
            if (cardName === "Manager") {
              filteredData = allData.filter(
                item => item.status === "Pending" && item.fileType === titleName
              );
            } else if (cardName === "viewTimeSheet") {
              filteredData = allData.filter(
                item => item.fileType === titleName
              );
            } else if (cardName === "viewSummary") {
              filteredData = allData.filter(
                item => item.status === "Approved" && item.fileType === titleName
              );
            } else if (cardName === "rejectedItems") {
              filteredData = allData.filter(
                item => item.status === "Rejected" && item.fileType === titleName
              );
            } else if (cardName === "Unsubmitted") {
              filteredData = allData.filter(
                item => item.status === "Unsubmitted" && item.fileType === titleName
              );
            } else {
              filteredData = allData.filter(
                item => item.status === "nothing" && item.fileType === titleName
              );
            }

            // if (filteredData.length === 0) {
            //   // setMessage?.("No data available");
            //   setLoading(null);
            //   setEmptyTableMess(null);
            // }

            if (filteredData.length > 0) {
              // setMessage?.("");
              setConvertedStringToArrayObj(filteredData);
              setLoading(null);
              setEmptyTableMess(null);
            } else if (filteredData.length === 0) {
              setConvertedStringToArrayObj(false);
              setLoading(false);
              setEmptyTableMess(false);
            }
          } catch (error) {
            console.log("Error : ", error);
          }
        } else {
          console.log("titleName or cardName is empty");
        }
      };

      // if ((Position === "Manager" && titleName) || Position !== "Manager") {
      fetchData();
      // }
    }, [titleName, cardName]);

    return {
      convertedStringToArrayObj,
      getPosition,
      setEmptyTableMess,
      emptyTableMess,
      setLoading,
      loading,
    };
  } catch (err) {
    setLoading?.(false);
  }
};