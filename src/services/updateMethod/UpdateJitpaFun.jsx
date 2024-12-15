import { generateClient } from "@aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { updateBJLDetails } from "../../graphql/mutations";

export const UpdateJitpaFun = () => {
  const client = generateClient();

  const UpdateJitpaData = useCallback(async ({ JitpaValue }) => {
    if (!JitpaValue) {
      throw new Error("Missing required parameters or empID");
    }
    try {
      const {
        tbaPurchase,
        jitpaAmt,
        jpValid,
        jpEndorse,
        jpEmpUpload,
        id,
      } = JitpaValue;

      const updatedData = {
        id, // Use the existing ID
        tbaPurchase,
        jitpaAmt,
        jpValid,
        jpEndorse,
        jpEmpUpload,
      };

      const response = await client.graphql({
        query: updateBJLDetails,
        variables: { input: updatedData },
      });

      // // Log the response to confirm the update
      console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { UpdateJitpaData };
};
