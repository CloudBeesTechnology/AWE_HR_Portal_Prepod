import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateLocalMobilization } from "../../graphql/mutations";

export const UpdateLoiData = () => {
  const client = generateClient();

  const loiDetails = useCallback(async ({ LoiValue }) => {
    if (!LoiValue) {
      throw new Error("Missing required parameters or empID");
    }

    try {
      const {
        mobSignDate,
        mobFile,
        paafApproveDate,
        paafFile,
        loiIssueDate,
        loiAcceptDate,
        loiDeclineDate,
        declineReason,
        loiFile,
        cvecApproveDate,
        cvecFile,
        id,
      } = LoiValue;

      const updatedData = {
        id,
        mobSignDate,
        mobFile,
        paafApproveDate,
        paafFile,
        loiIssueDate,
        loiAcceptDate,
        loiDeclineDate,
        declineReason,
        loiFile,
        cvecApproveDate,
        cvecFile,
      };

      const response = await client.graphql({
        query: updateLocalMobilization,
        variables: { input: updatedData },
      });

      // // Log the response to confirm the update
      console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { loiDetails };
};