import { generateClient } from "@aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { updateEmailNotifi } from "../../graphql/mutations";

export const UpdateNlmsData = () => {
  const client = generateClient();

  const uploadNSFun = useCallback(async ({ DoeValue }) => {
    if (!DoeValue) {
      throw new Error("Missing required parameters or empID");
    }
    try {
      const { status, empID, id } = DoeValue;

      const updatedData = {
        id, // Use the existing ID
        status, // Update the status
        empID,
      };

      const response = await client.graphql({
        query: updateEmailNotifi,
        variables: { input: updatedData, limit:20000, },
      });

      // console.log("Data successfully updated:", response);
      return response;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { uploadNSFun };
};