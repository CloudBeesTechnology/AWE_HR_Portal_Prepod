import { generateClient } from "@aws-amplify/api";
import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listUsers,
} from "../../../graphql/queries";

const client = generateClient();

// Function to handle pagination and fetch all data
const fetchAllData = async (queryName) => {
  let allData = [];
  let nextToken = null;

  do {
    const response = await client.graphql({
      query: queryName,
      variables: { nextToken },
    });

    const items = response.data[Object.keys(response.data)[0]].items; // Extract items
    allData = [...allData, ...items]; // Append fetched items
    nextToken = response.data[Object.keys(response.data)[0]].nextToken; // Update nextToken
  } while (nextToken); // Continue fetching if more pages exist

  return allData;
};

export const FindSpecificTimeKeeper = async (filterPending) => {
  try {
    const loginAuth = localStorage.getItem("userID")?.toUpperCase();
    console.log(loginAuth);
    const fetchData = async () => {
      // Fetch all paginated data from GraphQL queries
      const [empPersonalInfos, usersData] = await Promise.all([
        fetchAllData(listEmpPersonalInfos),
        // fetchAllData(listEmpWorkInfos),
        fetchAllData(listUsers),
      ]);

      // Merge data based on empID
      const mergedData = empPersonalInfos
        .map((candidate) => {
        //   const interviewDetails = empWorkInfos.find(
        //     (item) => item.empID === candidate.empID
        //   );

          const allUser = usersData.find(
            (item) => item.empID === candidate.empID
          );

          // Return null if all details are undefined
          if ( !allUser) {
            return null;
          }

          return {
            ...candidate,
            // ...interviewDetails,
            ...allUser,
          };
        })
        .filter((item) => item !== null); // Remove null values

      // Filter data for the logged-in Manager
      const filteredData = mergedData.filter(
        (value) => value.empID === loginAuth && value.selectType !== "Manager"
      );

      return filteredData;
    };

    // Fetch merged data
    const getOneObject = await fetchData();
    console.log(getOneObject);
    console.log(filterPending);

    // Filter pending items based on manager assignments
    const finalOutput = filterPending?.filter((pendingItem) => {
      return getOneObject.some((manager) => {
        // const lastDepartment =
        //   manager.department[manager.department.length - 1]; // Get the latest department

        return (
          pendingItem.assignBy === manager.empID
          // pendingItem.mdepartment === lastDepartment
        );
      });
    });

    console.log(finalOutput);

    // Remove null and undefined values from the filtered output
    const filteredOutput = finalOutput.filter(
      (item) => item !== null && item !== undefined
    );

    console.log(filteredOutput);
    return filteredOutput;
  } catch (err) {
    console.log("ERROR : ", err);
  }
};
