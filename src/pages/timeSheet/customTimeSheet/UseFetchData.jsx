import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";

export const useFetchData = (titleName,cardName) => {
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

          // Map titleName to appropriate query and data keys

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
                : [{ fileType: { eq: titleName } }],
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
            console.log(result)
            fetchedData = response?.data?.listTimeSheets?.items || [];

            nextToken = response?.data?.listTimeSheets?.nextToken; // Update nextToken for next page

            const validData = fetchedData.filter(
              (item) => item !== null && item !== undefined
            );
            // console.log(validData)
            allData = [...allData, ...fetchedData];
          } while (nextToken);

          setConvertedStringToArrayObj(allData); // Update state with all data
        } catch (error) {
          console.error(`Error fetching data for ${titleName}:`, error);
        } finally {
          setLoading(false); // Stop loading indicator
        }
      };

      // Fetch only if titleName and Position are valid
      if ((Position === "Manager" && titleName) || Position !== "Manager") {
        fetchData();
      }
    }, [titleName]);
    // const { handleScroll, visibleData, setVisibleData } = useScrollableView(
    //   convertedStringToArrayObj,
    //   "Manager"
    // );

    return { convertedStringToArrayObj, getPosition, loading };
  } catch (err) {
    console.log("ERROR : ", err);
  }
};

// import { useState, useEffect } from "react";
// import { generateClient } from "@aws-amplify/api";
// import {

//   listTimeSheets,
// } from "../../../graphql/queries";

// export const useFetchData = (titleName) => {
//   const [loading, setLoading] = useState(false);
//   const client = generateClient(); // GraphQL client
//   const [convertedStringToArrayObj, setConvertedStringToArrayObj] = useState(
//     []
//   );
//   const [getPosition, setGetPosition] = useState(null);

//   useEffect(() => {
//     const Position = localStorage.getItem("userType");
//     setGetPosition(Position);

//     const fetchData = async () => {
//       try {
//         setLoading(true); // Start loading indicator

//         // Map titleName to appropriate query and data keys

//         let nextToken = null;
//         let allData = [];
//         let fetchedData = [];
//         // Fetch data in a paginated manner
//         do {
//           const response = await client.graphql({
//             query: listTimeSheets,
//             variables: { limit: 10, nextToken },
//           });

//           const validTypes = ["BLNG", "Offshore", "HO", "SBW", "ORMC"];

//           if (validTypes.includes(titleName)) {
//             const result = response?.data?.listTimeSheets?.items || [];
//             fetchedData = result.filter((fil) => fil.type === titleName);
//             nextToken = response?.data?.listTimeSheets?.nextToken; // Update nextToken for next page
//           }
//           // Process fetched data
//           const processedData = fetchedData.map((item) => {
//             const rawSheet = item.dailySheet;
//             if (Array.isArray(rawSheet) && rawSheet.length > 0) {
//               const rawData = rawSheet[0];
//               const id = item.id;
//               const Status = item.status;

//               try {
//                 const cleanedData = rawData
//                   .replace(/^"|\s*'|\s*"$|\\'/g, "")
//                   .replace(/\\"/g, '"')
//                   .replace(/\\n/g, "")
//                   .replace(/\\\//g, "/");
//                 const arrayOfObjects = JSON.parse(cleanedData);
//                 const dataWithStatus = arrayOfObjects.map((obj) => ({
//                   ...obj,
//                   status: Status,
//                 }));
//                 return [{ id: id }, dataWithStatus];
//               } catch (error) {
//                 console.error("Error parsing JSON:", error);
//                 return null;
//               }
//             }
//             return null;
//           });

//           // Append valid data to allData
//           const validData = processedData.filter((item) => item !== null);
//           allData = [...allData, ...validData];
//         } while (nextToken);
//         console.log("useFetchData : ", allData);
//         setConvertedStringToArrayObj(allData); // Update state with all data
//       } catch (error) {
//         console.error(`Error fetching data for ${titleName}:`, error);
//       } finally {
//         setLoading(false); // Stop loading indicator
//       }
//     };

//     // Fetch only if titleName and Position are valid
//     if ((Position === "Manager" && titleName) || Position !== "Manager") {
//       fetchData();
//     }
//   }, [titleName]);
//   // const { handleScroll, visibleData, setVisibleData } = useScrollableView(
//   //   convertedStringToArrayObj,
//   //   "Manager"
//   // );

//   return { convertedStringToArrayObj, getPosition, loading };
// };
