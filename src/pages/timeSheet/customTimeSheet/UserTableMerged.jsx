import { generateClient } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
} from "../../../graphql/queries";
const client = generateClient();
export const useTableMerged = (excelData) => {
  const getPosition = localStorage.getItem("userType");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (getPosition !== "Manager") {
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

          const dataPromise = new Promise((resolve, reject) => {
            if (excelData) {
              resolve(excelData);
            } else {
              setTimeout(() => {
                reject("No data found after waiting.");
              }, 5000);
            }
          });

          const fetchedData = await dataPromise;
          const fetchWorkInfo = async () => {
            const finalData = fetchedData?.map((item) => {
              const workInfoItem = mergedData?.find(
                (info) => info.empBadgeNo === item.BADGE
              );

              return {
                ...item,
                NORMALWORKINGHRSPERDAY: workInfoItem
                  ? workInfoItem.workHrs[workInfoItem.workHrs.length - 1]
                  : null,
              };
            });

           
            setData(finalData); // Assuming setData is your state setter
          };
          fetchWorkInfo();
        } catch (err) {
          // console.error("Error fetching data:", err.message);
        }
      }

      fetchEmployeeData();
    }
  }, []);
  return data;
};
