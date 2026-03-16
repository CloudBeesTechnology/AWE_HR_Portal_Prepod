import { useState, useEffect, useContext } from "react";

import { DataSupply } from "../utils/DataStoredContext";

const usePermission = (userIDKey, permissionKey) => {
  const [permissionData, setPermissionData] = useState([]);

  const { userData, setFetchTableData } = useContext(DataSupply);

  useEffect(() => {
    setFetchTableData(["userData"]);
  }, []);

  useEffect(() => {
    const userID = localStorage.getItem(userIDKey)?.toUpperCase();

    const fetchEmpPIData = async () => {
      // let nextToken = null;
      // let allEmpData = [];

      try {
        // do {
        //   const dataEmp = await client.graphql({
        //     query: listUsers,
        //     variables: {
        //       filter: { empID: { eq: userID } },
        //       nextToken,
        //     },
        //   });

        //   const empStore = dataEmp?.data?.listUsers?.items || [];
        //   allEmpData = [...allEmpData, ...empStore];
        //   nextToken = dataEmp?.data?.listUsers?.nextToken;
        // } while (nextToken);

        // setEmpPIData(allEmpData);

        const result = userData.find((val) => val.empID === userID);

        // const result = allEmpData[0];

        if (result && Array.isArray(result.setPermissions)) {
          result.setPermissions.forEach((permissionString) => {
            const convertJson = convertToJSON(permissionString);

            if (convertJson && convertJson[permissionKey]) {
              setPermissionData(convertJson[permissionKey]);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    
      fetchEmpPIData();
  
  }, [userData, userIDKey, permissionKey]);

  return permissionData;
};

function convertToJSON(inputString) {
  if (!inputString) {
    return null;
  }

  let formattedString = inputString?.replace(/=/g, ":");
  formattedString = formattedString?.replace(/([a-zA-Z]+):/g, '"$1":');

  formattedString = formattedString?.replace(/\[([^\]]+)\]/g, (match, p1) => {
    let elements = p1.split(",").map((item) => `"${item.trim()}"`);
    return `[${elements.join(", ")}]`;
  });

  formattedString = `{${formattedString?.slice(1, -1)}}`;

  try {
    return JSON.parse(formattedString);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return null;
  }
}

export default usePermission;
