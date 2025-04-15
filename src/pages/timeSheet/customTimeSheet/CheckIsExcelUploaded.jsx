// import { generateClient } from "@aws-amplify/api";
// import { listTimeSheets } from "../../../graphql/queries";

// export const CheckIsExcelUploaded = async ({
//   fileNameForSuccessful,
//   title,
// }) => {
//   var isExcelExitsOrNot = null;
//   const client = generateClient();

//   const fetchData = async () => {
//     let nextToken = null;

//     try {
//       do {
//         const response = await client.graphql({
//           query: listTimeSheets,
//           variables: {
//             filter: {
//               and: [
//                 { fileName: { eq: fileNameForSuccessful } },
//                 { fileType: { eq: title } },
//               ],
//             },
//             limit: 800, // Adjust as needed
//             nextToken,
//           },
//         });

//         const items = response?.data?.listTimeSheets?.items || [];
//         nextToken = response?.data?.listTimeSheets?.nextToken;

//         const validItem = items.find(
//           (item) => item !== null && item !== undefined
//         );
//         console.log(validItem);
//         if (validItem) {
//           isExcelExitsOrNot = validItem;
//           return;
//         }
//       } while (nextToken);

//       // If nothing found after going through all pages
//       isExcelExitsOrNot = "Not Matched";
//     } catch (error) {
//       isExcelExitsOrNot = "Not Matched";
//       console.error("Error fetching timesheet by fileName:", error);
//     }
//   };

//   if (fileNameForSuccessful) {
//     await fetchData();
//   }
//   console.log("isExcelExitsOrNot : ", isExcelExitsOrNot);
//   return { isExcelExitsOrNot };
// };

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";

export const CheckIsExcelUploaded = async ({
  fileNameForSuccessful,
  title,
}) => {
  let isExcelExitsOrNot = null;
  const client = generateClient();

  const fetchData = async () => {
    let nextToken = null;

    try {
      do {
        const response = await client.graphql({
          query: listTimeSheets,
          variables: {
            limit: 800, // Fetching without any GraphQL-level filtering
            nextToken,
          },
        });

        const items = response?.data?.listTimeSheets?.items || [];
        nextToken = response?.data?.listTimeSheets?.nextToken;

        const filteredItems = items.filter(
          (item) =>
            item &&
            item.fileName === fileNameForSuccessful &&
            item.fileType === title
        );

        const validItem = filteredItems.find(
          (item) => item !== null && item !== undefined
        );

        console.log(validItem);
        if (validItem) {
          isExcelExitsOrNot = validItem;
          return;
        }
      } while (nextToken);

      // If no match found after going through all pages
      isExcelExitsOrNot = "Not Matched";
    } catch (error) {
      isExcelExitsOrNot = "Not Matched";
      console.error("Error fetching timesheet:", error);
    }
  };

  if (fileNameForSuccessful) {
    await fetchData();
  }

  console.log("isExcelExitsOrNot:", isExcelExitsOrNot);
  return { isExcelExitsOrNot };
};
