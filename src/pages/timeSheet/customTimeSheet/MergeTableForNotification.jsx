import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../../../graphql/queries";
const client = generateClient();

export const MergeTableForNotification = async (responseData) => {
  console.log("Response Data:", responseData);

  try {
    const empPersonalInfosResponse = await client.graphql({
      query: listEmpPersonalInfos,
    });

    const candidates =
      empPersonalInfosResponse?.data?.listEmpPersonalInfos?.items;

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
  } catch (err) {
    console.error("Error fetching data from GraphQL:", err.message);
  }
  return null;
};
