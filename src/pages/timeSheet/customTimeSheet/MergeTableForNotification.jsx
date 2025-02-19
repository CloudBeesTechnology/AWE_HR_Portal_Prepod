import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../../../graphql/queries";

const client = generateClient();

const fetchAllData = async (queryName) => {
  let allData = [];
  let nextToken = null;

  do {
    const response = await client.graphql({
      query: queryName,
      variables: { nextToken },
    });

    const items = response.data[Object.keys(response.data)[0]].items;
    allData = [...allData, ...items];
    nextToken = response.data[Object.keys(response.data)[0]].nextToken;
  } while (nextToken);

  return allData;
};

export const MergeTableForNotification = async (responseData) => {
  try {
    const candidates = await fetchAllData(listEmpPersonalInfos);

    if (candidates && responseData) {
      const getManager = candidates.find(
        (candidate) => candidate.empBadgeNo === responseData.assignTo
      );

      const getTimeKeeper = candidates.find(
        (candidate) => candidate.empID === responseData.assignBy
      );

      const emailInfo = {
        ManagerDetails: getManager || null,
        TimeKeeperDetails: getTimeKeeper || null,
        TimeSheetData: responseData,
      };

      return emailInfo;
    }
  } catch (err) {}
  return null;
};
