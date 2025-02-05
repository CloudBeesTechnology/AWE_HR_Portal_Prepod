
import { generateClient } from "@aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { updateEmpLeaveDetails } from "../../graphql/mutations";

export const UpdateLeaveData = () => {
  const client = generateClient();

  const leaveDetails = useCallback(async ({ LeaveValue }) => {
    if (!LeaveValue) {
      throw new Error("Missing required parameters or empID");
    }
    try {
      const {
        remainingAnualLeave,
        remainingCompasLeave,
        remainingHosLeave,
        remainingMateLeave,
        remainingMrageLeave,
        remainingPaternityLeave,
        remainingSickLeave,
        unPaidAuthorize,
        id,
      } = LeaveValue;

      const updatedData = {
        id, // Use the existing ID
        remainingAnualLeave,
        remainingCompasLeave,
        remainingHosLeave,
        remainingMateLeave,
        remainingMrageLeave,
        remainingPaternityLeave,
        remainingSickLeave,
        unPaidAuthorize,
      };

      const response = await client.graphql({
        query: updateEmpLeaveDetails,
        variables: { input: updatedData,},
      });

      // // Log the response to confirm the update
      // console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { leaveDetails };
};