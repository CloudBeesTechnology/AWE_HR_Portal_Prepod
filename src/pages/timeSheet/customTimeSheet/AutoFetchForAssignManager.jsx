import { useEffect, useState } from "react";
import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
} from "../../../graphql/queries";
import { generateClient } from "@aws-amplify/api";

const client = generateClient();
export const AutoFetchForAssignManager = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
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
        const [empPersonalInfos, empWorkInfos] = await Promise.all([
          fetchAllData(listEmpPersonalInfos),
          fetchAllData(listEmpWorkInfos),
        ]);

        const candidates = empPersonalInfos;
        const interviews = empWorkInfos;

        const mergedData = candidates
          .map((candidate) => {
            const interviewDetails = interviews.find(
              (item) => item.empID === candidate.empID
            );

            if (!interviewDetails) {
              return null;
            }

            return {
              ...candidate,
              ...interviewDetails,
            };
          })
          .filter((item) => item !== null);

        setData(mergedData);
      } catch (err) {}
    }

    fetchEmployeeData();
  }, []);
  return data;
};
