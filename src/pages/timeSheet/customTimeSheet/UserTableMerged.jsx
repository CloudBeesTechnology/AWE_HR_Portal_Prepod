import { generateClient } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
} from "../../../graphql/queries";
const client = generateClient();
export const useTableMerged = (excelData) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (excelData) {
      const fetchData = async () => {
        // setLoading(true);

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

        try {
          const [empPersonalInfos, empPersonalDocs] = await Promise.all([
            client.graphql({ query: listEmpPersonalInfos }),
            client.graphql({ query: listEmpWorkInfos }),
          ]);

          const candidates =
            empPersonalInfos?.data?.listEmpPersonalInfos?.items;
          const interviews = empPersonalDocs?.data?.listEmpWorkInfos?.items;

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

          const fetchWorkInfo = async () => {
            const finalData = fetchedData?.map((item) => {
              const workInfoItem = mergedData?.find(
                (info) => info.empBadgeNo == item.BADGE
              );
              return {
                ...item,
                NORMALWORKINGHRSPERDAY: workInfoItem
                  ? workInfoItem.workHrs[0]
                  : null,
              };
            });
            // console.log("useTableMergedData : ", finalData);
            setData(finalData);
          };
          fetchWorkInfo();
        } catch (err) {
          // console.error("Error fetching data:", err.message);
        }
      };
      fetchData();
    }
  }, [excelData]);
  return data;
};
