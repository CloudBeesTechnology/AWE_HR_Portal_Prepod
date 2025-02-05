import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateEmpDepInsurance } from "../../graphql/mutations";

export const UpdateDepInsDataFun = () => {
  const client = generateClient();
  const UpdateDIData = useCallback(async ({ depValue }) => {
    if (!depValue) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      empID: depValue.empID,
      depInsurance: JSON.stringify(depValue.depInsurance),
      id: depValue.id,
    };
    // console.log(totalData,"updated");

    try {
      const storedData = await Promise.all([
        client.graphql({
          query: updateEmpDepInsurance,
          variables: {
            input: totalData,
          },
        }),
      ]);
      // console.log(storedData, "successfully Updated data");
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; // Rethrow error if needed
    }
  }, []);
  return { UpdateDIData };
};
