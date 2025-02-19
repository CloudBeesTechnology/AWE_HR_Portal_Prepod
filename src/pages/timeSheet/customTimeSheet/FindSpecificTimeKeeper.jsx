import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos, listUsers } from "../../../graphql/queries";

const client = generateClient();

const fetchAllData = async (queryName) => {
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
};

export const FindSpecificTimeKeeper = async (
  filterPending,
  setLoading,
  setMessage
) => {
  try {
    setLoading?.(true);
    setMessage?.("Please wait a few seconds...");
    const loginAuth = localStorage.getItem("userID")?.toUpperCase();

    const fetchData = async () => {
      const [empPersonalInfos, usersData] = await Promise.all([
        fetchAllData(listEmpPersonalInfos),

        fetchAllData(listUsers),
      ]);

      const mergedData = empPersonalInfos
        .map((candidate) => {
          const allUser = usersData.find(
            (item) => item.empID === candidate.empID
          );

          if (!allUser) {
            return null;
          }

          return {
            ...candidate,

            ...allUser,
          };
        })
        .filter((item) => item !== null);

      const filteredData = mergedData.filter(
        (value) => value.empID === loginAuth && value.selectType !== "Manager"
      );

      return filteredData;
    };

    const getOneObject = await fetchData();

    const finalOutput = filterPending?.filter((pendingItem) => {
      return getOneObject.some((manager) => {
        return pendingItem.assignBy === manager.empID;
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
    setLoading?.(false);
    setMessage?.("An error occurred. Please try again.");
  }
};
