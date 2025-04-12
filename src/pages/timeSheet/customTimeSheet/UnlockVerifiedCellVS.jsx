// import { generateClient } from "@aws-amplify/api";
// import { listTimeSheets } from "../../../graphql/queries";
// import { deleteTimeSheet } from "../../../graphql/mutations";

// export const UnlockVerifiedCellVS = async ({ finalResult }) => {
//   const client = generateClient();
//   const filteredResults = [];
//   let successCount = 0;
//   let deleteDuplicateData = "";
//   try {
//     for (const record of finalResult) {
//       let nextToken = null;

//       do {
//         let badgeNoOrFidNo =
//           record.fileType === "Offshore" ||
//           record.fileType === "BLNG" ||
//           record.fileType === "Offshore's ORMC"
//             ? "fidNo"
//             : "empBadgeNo";
//         const response = await client.graphql({
//           query: listTimeSheets,
//           variables: {
//             filter: {
//               and: [
//                 { fileType: { eq: record.fileType } },
//                 { date: { eq: record.date.trim() } },
//                 { [badgeNoOrFidNo]: { eq: record[badgeNoOrFidNo] } },
//                 { status: { eq: "Verified" } },
//               ],
//             },
//             limit: 800,
//             nextToken,
//           },
//         });

//         const responseData = response?.data?.listTimeSheets?.items || [];
//         nextToken = response?.data?.listTimeSheets?.nextToken;
//         // filteredResults = [...filteredResults, ...responseData];
//         console.log("responseData : ", responseData);
//         filteredResults.push(...responseData);
//         //   Delete matching records
//       } while (nextToken);
//     }

//     console.log("All SBW items deletion process completed.");
//     const chunkArray = (array, size) => {
//       const result = [];
//       for (let i = 0; i < array.length; i += size) {
//         result.push(array.slice(i, i + size));
//       }
//       return result;
//     };
//     const chunks = chunkArray(filteredResults, 1000);

//     for (const chunk of chunks) {
//       await Promise.all(
//         chunk.map(async (item) => {
//           try {
//             const deleteResponse = await client.graphql({
//               query: deleteTimeSheet,
//               variables: { input: { id: item.id } },
//             });
//             console.log(
//               "Deleted Item Response:",
//               deleteResponse?.data?.deleteTimeSheet
//             );
//             if (deleteResponse?.data?.deleteTimeSheet) {
//               successCount++;
//               if (successCount === filteredResults.length) {
//                 deleteDuplicateData = "DuplicateDataDeletedSuccessfully";
//               }
//             }
//           } catch (deleteError) {
//             console.error(
//               `Error deleting item with ID ${item.id}:`,
//               deleteError
//             );
//           }
//         })
//       );
//     }
//   } catch (fetchError) {
//     console.error("Error in fetchDataAndDelete:", fetchError);
//   }
//   console.log("🔍 filteredResults : ", filteredResults);

//   return { filteredResults, deleteDuplicateData };
// };

import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";
import { deleteTimeSheet } from "../../../graphql/mutations";

export const UnlockVerifiedCellVS = async ({ finalResult,  setLoadingMessForDelay }) => {
  const client = generateClient();
  const filteredResults = [];
  let successCount = 0;
  let deleteDuplicateData = "";

  setLoadingMessForDelay(true);
  // ✅ Chunk the records for parallel fetching
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const recordChunks = chunkArray(finalResult, 10); // You can adjust chunk size for concurrency

  try {
    for (const chunk of recordChunks) {
      const fetchPromises = chunk.map(async (record) => {
        let nextToken = null;

        let badgeNoOrFidNo =
          record.fileType === "Offshore" ||
          record.fileType === "BLNG" ||
          record.fileType === "Offshore's ORMC"
            ? "fidNo"
            : "empBadgeNo";

        do {
          const response = await client.graphql({
            query: listTimeSheets,
            variables: {
              limit: 1000,
              nextToken,
            },
          });

          const responseData = response?.data?.listTimeSheets?.items || [];

          // JS filtering here instead of GraphQL filter
          const match = responseData.filter(
            (item) =>
              item.fileType === record.fileType &&
              item.date.trim() === record.date.trim() &&
              item[badgeNoOrFidNo] === record[badgeNoOrFidNo] &&
              item.status === "Verified"
          );

          filteredResults.push(...match);
          nextToken = response?.data?.listTimeSheets?.nextToken;
        } while (nextToken);
      });

      await Promise.all(fetchPromises); // 🚀 Fetch all 10 in parallel
    }

    console.log("✅ All matching data fetched");

    // ✅ Delete in chunks
    const deleteChunks = chunkArray(filteredResults, 1000);
    for (const chunk of deleteChunks) {
      await Promise.all(
        chunk.map(async (item) => {
          try {
            const deleteResponse = await client.graphql({
              query: deleteTimeSheet,
              variables: { input: { id: item.id } },
            });

            if (deleteResponse?.data?.deleteTimeSheet) {
              successCount++;
              if (successCount === filteredResults.length) {
                deleteDuplicateData = "DuplicateDataDeletedSuccessfully";
              }
            }
          } catch (deleteError) {
            console.error(
              `Error deleting item with ID ${item.id}:`,
              deleteError
            );
          }
        })
      );
    }
  } catch (fetchError) {
    console.error("Error in fetchDataAndDelete:", fetchError);
  }

  console.log("🔍 filteredResults : ", filteredResults);
  return { filteredResults, deleteDuplicateData };
};
