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

        const items = response.data[Object.keys(response.data)[0]].items; // Extract items
        allData = [...allData, ...items]; // Append fetched items
        nextToken = response.data[Object.keys(response.data)[0]].nextToken; // Get nextToken
      } while (nextToken); // Continue if there's more data

      return allData;
    }

    async function fetchEmployeeData() {
      try {
        // Fetch all data with pagination
        const [empPersonalInfos, empWorkInfos] = await Promise.all([
          fetchAllData(listEmpPersonalInfos),
          fetchAllData(listEmpWorkInfos),
        ]);

        const candidates = empPersonalInfos; // Data from listEmpPersonalInfos
        const interviews = empWorkInfos; // Data from listEmpWorkInfos

        const mergedData = candidates
          .map((candidate) => {
            const interviewDetails = interviews.find(
              (item) => item.empID === candidate.empID
            );

            // Return null if all details are undefined
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
      } catch (err) {
        // console.error("Error fetching data:", err.message);
      }
    }

    fetchEmployeeData();
  }, []);
  return data;
};

