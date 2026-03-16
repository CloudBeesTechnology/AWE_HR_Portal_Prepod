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

            // if (allData.length === 0) {
            //   // setMessage?.("No data available");
            //   setLoading(null);
            //   setEmptyTableMess(null);
            // }

            if (allData.length > 0) {
              // setMessage?.("");
              setConvertedStringToArrayObj(allData);
              setLoading(null);
              setEmptyTableMess(null);
            } else if (allData.length === 0) {
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
