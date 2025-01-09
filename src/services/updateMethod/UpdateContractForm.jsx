import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateContractForm } from "../../graphql/mutations";

export const UpdateContractData = () => {
  const client = generateClient();

  const contractDetails = useCallback(async ({ ContractValue }) => {
    if (!ContractValue) {
      throw new Error("Missing required parameters or empID");
    }

    try {
      const { conAttn, depHead, hrManager, genManager, remarks, id } = ContractValue;

      const updatedData = {
        conAttn,
        depHead,
        hrManager,
        genManager,
        remarks,
        id,
      };

      const response = await client.graphql({
        query: updateContractForm,
        variables: { input: updatedData, limit: 20000 },
      });
      console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; 
    }
  }, []);

  return { contractDetails };
};
