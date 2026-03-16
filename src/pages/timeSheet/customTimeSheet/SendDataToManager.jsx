import { generateClient } from "@aws-amplify/api";
import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listUsers,
} from "../../../graphql/queries";

const client = generateClient();

const fetchAllData = async (queryName) => {
  let allData = [];
  let nextToken = null;

  do {
    const response = await client.graphql({
      query: queryName,
      variables: { nextToken },
    });

    const items = response.data[Object.keys(response.data)[0]].items || [];
    allData = [...allData, ...items];
    nextToken = response.data[Object.keys(response.data)[0]].nextToken;
  } while (nextToken);

  return allData;
};

export const SendDataToManager = async (
  filterPending,
  setLoading,
  setMessage
) => {
  try {
    setLoading?.(true);
    setMessage?.("Please wait a few seconds...");

    const loginAuth = localStorage.getItem("userID")?.toUpperCase();

    const fetchData = async () => {
      const [empPersonalInfos, empWorkInfos, usersData] = await Promise.all([
        fetchAllData(listEmpPersonalInfos),
        fetchAllData(listEmpWorkInfos),
        fetchAllData(listUsers),
      ]);

      const mergedData = empPersonalInfos
        .map((candidate) => {
          const interviewDetails = empWorkInfos.find(
            (item) =>
              String(item.empID)?.toUpperCase()?.trim() ===
              String(candidate.empID)?.toUpperCase()?.trim()
          );

          const allUser = usersData.find(
            (item) =>
              String(item.empID)?.toUpperCase()?.trim() ===
              String(candidate.empID)?.toUpperCase()?.trim()
          );

          if (!interviewDetails && !allUser) {
            return null;
          }

          return {
            ...candidate,
            ...interviewDetails,
            ...allUser,
          };
        })
        .filter((item) => item !== null);

      const filteredData = mergedData.filter(
        (value) =>
          String(value.empID)?.toUpperCase()?.trim() ===
            String(loginAuth)?.toUpperCase()?.trim() &&
          value.selectType === "Manager"
      );

      return filteredData;
    };

    const getOneObject = await fetchData();

    const finalOutput = filterPending?.filter((pendingItem) => {
      return getOneObject.some((manager) => {
        return (
          String(pendingItem.assignTo)?.toUpperCase()?.trim() ===
          String(manager.empBadgeNo)?.toUpperCase()?.trim()
        );
      });
    });

    const filteredOutput = finalOutput.filter(
      (item) => item !== null && item !== undefined
    );

    setLoading?.(false);

    if (filteredOutput.length === 0) {
      setMessage?.("No data available");
    } else {
      setMessage?.("");
    }

    return filteredOutput;
  } catch (err) {
    console.error("ERROR:", err);
    setLoading?.(false);
    setMessage?.("An error occurred. Please try again.");
  }
};
