
import { generateClient } from "@aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { updateDNDetails } from "../../graphql/mutations";

export const UpdateNlmsData = () => {
  const client = generateClient();

  const uploadNlmsFun = useCallback(async ({ DoeValue }) => {
    if (!DoeValue) {
      throw new Error("Missing required parameters or empID");
    }
    try {
      const {
        nlmsEmpSubmit,
        nlmsEmpSubmitRefNo,
        nlmsEmpApproval,
        nlmsRefNo,
        permitType,
        nlmsEmpValid,
        nlmsEmpUpload,
        id,
      } = DoeValue;

      const updatedData = {
        id, // Use the existing ID
        nlmsEmpSubmit,
        nlmsEmpSubmitRefNo,
        nlmsEmpApproval,
        nlmsRefNo,
        permitType,
        nlmsEmpValid,
        nlmsEmpUpload,
      };

      const response = await client.graphql({
        query: updateDNDetails,
        variables: { input: updatedData },
      });

      // // Log the response to confirm the update
      console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { uploadNlmsFun };
};