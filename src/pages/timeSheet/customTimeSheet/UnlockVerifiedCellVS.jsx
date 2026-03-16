import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";
import { deleteTimeSheet } from "../../../graphql/mutations";

export const UnlockVerifiedCellVS = async ({
  finalResult,
  setLoadingMessForDelay,
  identifier,
  setShowDuplicateAlert,
  setCancelAction,
}) => {
  const client = generateClient();
  let allData = [];
  let notMatchedResult = [];
  let matchedResult = [];
  let filteredResult = [];
  let successCount = 0;
  let deleteDuplicateData = "";
  let alreadyShown = false;
  setLoadingMessForDelay?.(true);

  // Step 1️⃣: Fetch all data at once (with pagination)
  try {
    let nextToken = null;
    do {
      const response = await client.graphql({
        query: listTimeSheets,
        variables: { limit: 800, nextToken },
      });

      const responseData = response?.data?.listTimeSheets?.items || [];
      allData = [...allData, ...responseData];
      nextToken = response?.data?.listTimeSheets?.nextToken;
    } while (nextToken);
  } catch (error) {
    console.error("❌ Error while fetching all records:", error);
    setLoadingMessForDelay?.(false);
    return { filteredResults: [], deleteDuplicateData: "" };
  }

  function formatDate(dateString) {
    const [month, day, year] = dateString.split(/[-/]/)?.map((p) => p.trim());
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    return `${formattedMonth}/${formattedDay}/${year}`;
  }
  // Step 2️⃣: Build a Map for O(1) lookup
  const timeSheetMap = new Map();
  const idMap = new Map();

  for (const item of allData) {
    const badgeNoOrFidNo =
      item.fileType === "Offshore" ||
      item.fileType === "BLNG" ||
      item.fileType === "Offshore's ORMC"
        ? item.fidNo
        : item.empBadgeNo;

    const location = String(item?.companyName)?.toUpperCase()?.trim();
    const jobcode = String(item?.tradeCode)?.toUpperCase()?.trim();

    if (identifier === "updateStoredData") {
      const formattedDate = formatDate(item?.date?.trim());
      const key = `${item.fileType}|${formattedDate}|${badgeNoOrFidNo}|${location}|${jobcode}`;
      timeSheetMap.set(key, item);
    }
    const idMapKey = `${item.id}|${item?.status}`;
    idMap.set(idMapKey, item);
  }

  for (const record of finalResult) {
    const badgeNoOrFidNo =
      record.fileType === "Offshore" ||
      record.fileType === "BLNG" ||
      record.fileType === "Offshore's ORMC"
        ? record.fidNo
        : record.empBadgeNo;

    const location = String(record?.companyName)?.toUpperCase()?.trim();
    const jobcode = String(record?.tradeCode)?.toUpperCase()?.trim();
    const formattedDate = formatDate(record?.date?.trim());
    const key = `${record.fileType}|${formattedDate}|${badgeNoOrFidNo}|${location}|${jobcode}`;
    if (
      identifier === "updateStoredData" &&
      record.status !== "Verified" &&
      record.status !== "Rejected"
    ) {
      if (timeSheetMap.has(key)) {
        matchedResult.push(record);
      }
    } else if (identifier === "create") {
      notMatchedResult.push(record);
    }
  }

  if (matchedResult && matchedResult?.length === 0) {
    // Step 3️⃣: Match finalResult records against the map
    for (const record of finalResult) {
      const badgeNoOrFidNo =
        record.fileType === "Offshore" ||
        record.fileType === "BLNG" ||
        record.fileType === "Offshore's ORMC"
          ? record.fidNo
          : record.empBadgeNo;

      const location = String(record?.companyName)?.toUpperCase()?.trim();
      const jobcode = String(record?.tradeCode)?.toUpperCase()?.trim();
      const formattedDate = formatDate(record?.date?.trim());
      const key = `${record.fileType}|${formattedDate}|${badgeNoOrFidNo}|${location}|${jobcode}`;

      if (identifier === "updateStoredData" && timeSheetMap.has(key)) {
        const getData = timeSheetMap.get(key);

        if (getData && getData.status === "Verified") {
          filteredResult.push(getData);
        }
      }

      if (!timeSheetMap.has(key) && identifier === "updateStoredData") {
        const { id, ...rest } = record;
        notMatchedResult.push(rest);
      }

      const idMapKey = `${record.id}|${"Unsubmitted"}`;
      if (identifier === "updateStoredData" && idMap.has(idMapKey)) {
        const getUnSubData = idMap.get(idMapKey);
        filteredResult.push(getUnSubData);
      }
    }
  }

  // Step 4️⃣: Delete matched records in chunks
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const deleteChunks = chunkArray(filteredResult, 500); // Reduce size if needed

  for (const chunk of deleteChunks) {
    await Promise.allSettled(
      chunk.map(async (item) => {
        try {
          const deleteResponse = await client.graphql({
            query: deleteTimeSheet,
            variables: { input: { id: item.id } },
          });

          if (deleteResponse?.data?.deleteTimeSheet) {
            successCount++;

            if (successCount === filteredResult.length) {
              deleteDuplicateData = "DuplicateDataDeletedSuccessfully";
            }
          }
        } catch (error) {
          console.error(`❌ Error deleting item with ID ${item.id}:`, error);
        }
      })
    );
  }

  setLoadingMessForDelay?.(false);

  return {
    filteredResults: notMatchedResult,
    deleteDuplicateData,
    duplicateData: matchedResult,
  };
};
