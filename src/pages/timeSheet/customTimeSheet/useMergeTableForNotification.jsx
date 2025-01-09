import { useEffect, useState } from "react";
import { listEmpPersonalInfos } from "../../../graphql/queries";
import { generateClient } from "@aws-amplify/api";

const client = generateClient();

export const useMergeTableForNotification = (responseData) => {
  const [email, setEmail] = useState(null);
  console.log("Response Data:", responseData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empPersonalInfosResponse = await client.graphql({
          query: listEmpPersonalInfos,
          // limit:3000
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
          // if (getManager || getTimeKeeper) {
          setEmail({
            ManagerDetails: getManager || null,
            TimeKeeperDetails: getTimeKeeper || null,
            TimeSheetData: responseData && responseData,
          });
          // }
        }
      } catch (err) {
        console.error("Error fetching data from GraphQL:", err.message);
      }
    };

    fetchData();
  }, [responseData]);

  console.log("Email State:", email);
  return email;
};
