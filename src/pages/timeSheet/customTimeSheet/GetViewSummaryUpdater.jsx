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

      const items = response.data[Object.keys(response.data)[0]].items;
      allData = [...allData, ...items];
      nextToken = response.data[Object.keys(response.data)[0]].nextToken;
    } while (nextToken);

    return allData;
  }

  async function fetchEmployeeData() {
    try {
      const [empPersonalInfos] = await Promise.all([
        fetchAllData(listEmpPersonalInfos),
      ]);

      const candidates = empPersonalInfos;

      const getSummaryUpdaterName = candidates?.find(
        (fin) =>
          String(fin.empID)?.toUpperCase()?.trim() ===
          String(getEmpID)?.toUpperCase()?.trim()
      );

      return getSummaryUpdaterName;
    } catch (err) {}
  }

  const returnEmpDetails = fetchEmployeeData();

  return returnEmpDetails;
};
