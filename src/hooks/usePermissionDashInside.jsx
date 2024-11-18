import { useState, useEffect, useContext } from "react";
import { DataSupply } from "../utils/DataStoredContext";

const usePermission = (userIDKey, permissionKey) => {
  const [permissionData, setPermissionData] = useState([]);
  const { userData } = useContext(DataSupply);

  useEffect(() => {
    const userID = localStorage.getItem(userIDKey)?.toUpperCase();

    const result = userData.find((val) => val.empID === userID);

    if (result && Array.isArray(result.setPermissions)) {
      result.setPermissions.forEach((permissionString) => {
        const convertJson = convertToJSON(permissionString);

        if (convertJson && convertJson[permissionKey]) {
          setPermissionData(convertJson[permissionKey]);
        }
      });
    }
  }, [userIDKey, permissionKey, userData]);

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
