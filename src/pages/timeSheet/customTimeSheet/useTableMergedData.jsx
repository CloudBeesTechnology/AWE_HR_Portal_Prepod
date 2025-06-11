import { generateClient } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
} from "../../../graphql/queries";
const client = generateClient();
export const useTableMergedData = () => {
  const [empAndWorkInfo, setEmpAndWorkInfo] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
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
              nextToken =
                response.data[Object.keys(response.data)[0]].nextToken;
            } while (nextToken);

            return allData;
          }

          const fetchWorkInfo = async () => {
            try {
              const [employeeInfo, empWorkInfos] = await Promise.all([
                fetchAllData(listEmpPersonalInfos),
                fetchAllData(listEmpWorkInfos),
              ]);

              const empInfo = employeeInfo;
              const workInfo = empWorkInfos;

              const sapNoRemoved = workInfo.map(({ sapNo, ...rest }) => rest);

              const mergedDatas = empInfo
                .map((empInf) => {
                  const interviewDetails = sapNoRemoved.find(
                    (item) =>
                      String(item?.empID).toUpperCase() ===
                      String(empInf?.empID).toUpperCase()
                  );

                  if (!interviewDetails) {
                    return null;
                  }

                  return {
                    ...empInf,
                    ...interviewDetails,
                  };
                })
                .filter((item) => item !== null);

              setEmpAndWorkInfo(mergedDatas);
            } catch (error) {}
          };

          fetchWorkInfo();
        } catch (err) {
          console.log("Error : ", err);
        } finally {
        }
      };

      fetchData();
      // }
    } catch (err) {}
  }, []);
  return { empAndWorkInfo };
};
