import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";

export const CheckIsExcelUploaded = async ({
  fileNameForSuccessful,
  title,
}) => {
  let isExcelExitsOrNot = null;
  let addData = [];
  const client = generateClient();

  const fetchData = async () => {
    let nextToken = null;

    // Calculate date from 40 days ago
    const fortyDaysAgo = new Date();
    fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 32);
    const fortyDaysAgoISO = fortyDaysAgo.toISOString();

    try {
      do {
        const response = await client.graphql({
          query: listTimeSheets,
          variables: {
            limit: 800,
            nextToken,
            filter: {
              createdAt: {
                ge: fortyDaysAgoISO
              }
            }
          },
        });

        const items = response?.data?.listTimeSheets?.items || [];
        nextToken = response?.data?.listTimeSheets?.nextToken;
        addData = [...addData, ...items];
      } while (nextToken);

      const addDataMap = new Map();
      for (const item of addData) {
        const key = `${item.fileName}|${item.fileType}`;
        addDataMap.set(key, item);
      }

      const keyToCheck = `${fileNameForSuccessful}|${title}`;
      if (addDataMap.has(keyToCheck)) {
        isExcelExitsOrNot = "fileNameAlreadyExistsInDB";
      } else {
        isExcelExitsOrNot = "Not Matched";
      }
    } catch (error) {
      isExcelExitsOrNot = "Not Matched";
      console.error("Error fetching timesheet:", error);
    }
  };

  if (fileNameForSuccessful) {
    await fetchData();
  }

  return { isExcelExitsOrNot };
};