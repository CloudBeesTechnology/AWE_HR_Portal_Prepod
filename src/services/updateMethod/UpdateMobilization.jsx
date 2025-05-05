import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateInterviewSchedule } from "../../graphql/mutations";

export const UpdateMobilization = () => {
  const client = generateClient();
  const submitMobilization = useCallback(async ({ mob }) => {
    if (!mob) {
      throw new Error("Missing required parameters");
    }
    // console.log(mob);

    try {
      const totalValue = {
        id: mob.interviewDetails_id,
        empID: mob.empID,
        status:"Employee"
      };

      console.log(totalValue);
      const result = await client.graphql({
        query: updateInterviewSchedule,
        variables: {
          input: totalValue,
        },
      });
      // console.log(result);
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; // Rethrow error if needed
    }
    // Handle API call or other logic here
  }, []);

  return { submitMobilization }; 
};
