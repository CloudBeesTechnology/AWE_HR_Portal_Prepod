import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../../../graphql/queries";

const client = generateClient();
export const GetViewSummaryUpdater = (getEmpID) => {
  async function fetchAllData(queryName) {
    let allData = [];
    let nextToken = null;

    do {
      const response = await client.graphql({
        query: queryName,
        variables: { nextToken },
      });

      const items = response.data[Object.keys(response.data)[0]].items; // Extract items
      allData = [...allData, ...items]; // Append fetched items
      nextToken = response.data[Object.keys(response.data)[0]].nextToken; // Get nextToken
    } while (nextToken); // Continue if there's more data

    return allData;
  }

  async function fetchEmployeeData() {
    try {
      // Fetch all data with pagination
      const [empPersonalInfos] = await Promise.all([
        fetchAllData(listEmpPersonalInfos),
      ]);

      const candidates = empPersonalInfos; // Data from listEmpPersonalInfos

      const getSummaryUpdaterName = candidates?.find(
        (fin) => fin.empID === getEmpID
      );

      return getSummaryUpdaterName;
    } catch (err) {
      // console.error("Error fetching data:", err.message);
    }
  }

  const returnEmpDetails = fetchEmployeeData();
  console.log(returnEmpDetails);

  return returnEmpDetails;
};
