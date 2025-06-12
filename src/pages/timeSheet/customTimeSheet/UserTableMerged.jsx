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
                (item) =>
                  String(item.empID).toUpperCase() ===
                  String(candidate.empID).toUpperCase()
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
                (info) =>
                  String(info.empBadgeNo).toUpperCase() ===
                  String(item.BADGE).toUpperCase()
              );

              return {
                ...item,
                NORMALWORKINGHRSPERDAY: workInfoItem
                  ? workInfoItem.workHrs[workInfoItem.workHrs.length - 1]
                  : null,
              };
            });

            setData(finalData);
          };
          fetchWorkInfo();
        } catch (err) {}
      }

      fetchEmployeeData();
    }
  }, [excelData]);
  return { data };
};
