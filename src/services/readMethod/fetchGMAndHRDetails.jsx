import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos, listEmpWorkInfos } from "../../graphql/queries";

const client = generateClient();

export const fetchGMAndHRDetails = async () => {
  try {
    // Fetch personal and work info in parallel
    const [personalInfoData, workInfoData] = await Promise.all([
      client.graphql({
        query: listEmpPersonalInfos,
        variables: { limit: 20000 },
      }),
      client.graphql({ query: listEmpWorkInfos, variables: { limit: 20000 } }),
    ]);

    console.log("Fetched Personal Info Data:", personalInfoData);
    console.log("Fetched Work Info Data:", workInfoData);

    const personalInfoItems =
      personalInfoData?.data?.listEmpPersonalInfos?.items || [];
    const workInfoItems = workInfoData?.data?.listEmpWorkInfos?.items || [];

    console.log("Personal Info Items:", personalInfoItems);
    console.log("Work Info Items:", workInfoItems);

    if (!personalInfoItems.length) {
      console.warn("Personal info dataset is empty.");
    }
    if (!workInfoItems.length) {
      console.warn("Work info dataset is empty.");
    }

    // Create a map of empID to personal info
    const personalInfoMap = personalInfoItems.reduce((acc, item) => {
      if (item?.empID) {
        acc[item.empID] = item;
      }
      return acc;
    }, {});

    console.log("Personal Info Map (empID -> Personal Info):", personalInfoMap);

    const mergedData = workInfoItems.map((workInfo) => {
      const personalInfo = personalInfoMap[workInfo.empID] || {};
      return {
        empID: workInfo.empID,
        position: workInfo.position,
        officialEmail: personalInfo.officialEmail || null,
      };
    });

    console.log("Merged Data (empID, position, officialEmail):", mergedData);

    // Find General Manager and HR Manager details
    const generalManager = mergedData.find(
      (item) => item.position === "General Manager"
    );
    const humanResourceManager = mergedData.find(
      (item) => item.position === "Human Resource Manager"
    );

    console.log("General Manager Details:", generalManager);
    console.log("Human Resource Manager Details:", humanResourceManager);

    if (!generalManager) {
      console.error("No employee found for position: General Manager");
    }
    if (!humanResourceManager) {
      console.error("No employee found for position: Human Resource Manager");
    }

    return {
      generalManagerEmail: generalManager?.officialEmail || null,
      humanResourceManagerEmail: humanResourceManager?.officialEmail || null,
    };
  } catch (error) {
    console.error("Error fetching GM and HR details:", error.message || error);
    throw new Error(
      "Failed to fetch GM and HR details. Please try again later."
    );
  }
};
