import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../../../graphql/queries";

const client = generateClient();

// Function to handle pagination and fetch all data
const fetchAllData = async (queryName) => {
  let allData = [];
  let nextToken = null;

  do {
    const response = await client.graphql({
      query: queryName,
      variables: { nextToken },
    });

    const items = response.data[Object.keys(response.data)[0]].items; // Extract items
    allData = [...allData, ...items]; // Append fetched items
    nextToken = response.data[Object.keys(response.data)[0]].nextToken; // Update nextToken
  } while (nextToken); // Continue fetching if more pages exist

  return allData;
};

export const MergeTableForNotification = async (responseData) => {


  try {
    // Fetch all records with pagination
    const candidates = await fetchAllData(listEmpPersonalInfos);

    if (candidates && responseData) {
      // Find manager details based on 'assignTo'
      const getManager = candidates.find(
        (candidate) => candidate.empBadgeNo === responseData.assignTo
      );

      // Find timekeeper details based on 'assignBy'
      const getTimeKeeper = candidates.find(
        (candidate) => candidate.empID === responseData.assignBy
      );

      // Prepare email information
      const emailInfo = {
        ManagerDetails: getManager || null,
        TimeKeeperDetails: getTimeKeeper || null,
        TimeSheetData: responseData,
      };

     
      return emailInfo;
    }
  } catch (err) {
    // console.error("Error fetching data from GraphQL:", err.message);
  }
  return null;
};
