import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api"
import { listUsers } from "../graphql/queries";

const client = generateClient(); 

export const useDeleteAccess = () => {
  const [formattedPermissions, setFormattedPermissions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const uploaderID = localStorage.getItem("userID")?.toUpperCase();

      async function fetchAllData(queryName) {
        let allData = [];
        let nextToken = null;
        const filter = {
          and: [
            {
              empID: { eq: uploaderID || null },
            },
          ],
        };

        do {
          const response = await client.graphql({
            query: queryName,
            variables: { filter, nextToken },
          });

          const items = response.data[Object.keys(response.data)[0]].items;
          allData = [...allData, ...items];
          nextToken = response.data[Object.keys(response.data)[0]].nextToken;
        } while (nextToken);

        return allData;
      }

      const empDetails = await fetchAllData(listUsers);
      const result = empDetails?.find((val) => val.empID === uploaderID);

      const parsePermissions = (permissionsArray) => {
        return permissionsArray.map((permissionStr) => {
          if (!permissionStr || permissionStr === "{}") return {};

          try {
            let formattedStr = permissionStr
              .replace(/(\w+)=/g, '"$1":') // Convert key=value to "key":value
              .replace(/\[([^\]]+)\]/g, (_, match) => {
                return `[${match
                  .split(", ")
                  .map((item) => `"${item}"`)
                  .join(", ")}]`; // Ensure array values are properly quoted
              })
              .replace(/"{/g, "{") // Remove accidental double quotes at object start
              .replace(/}"/g, "}"); // Remove accidental double quotes at object end

            // Debugging

            return JSON.parse(formattedStr); // Convert corrected string to object
          } catch (error) {
            console.error(
              "Parsing error:",
              error,
              "Original String:",
              permissionStr
            );
            return {};
          }
        });
      };

      const [parsedPermissions] = parsePermissions([result?.setPermissions[1]]);

      // console.log("{ viewAccess, deleteAccess } : ", parsedPermissions);
      setFormattedPermissions(parsedPermissions);
    };

    fetchData();
  }, []);

  return { formattedPermissions };
};
