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
        updatedBy,
      } = DoeValue;

      const updatedData = {
        id,
        nlmsEmpSubmit,
        nlmsEmpSubmitRefNo,
        nlmsEmpApproval,
        nlmsRefNo,
        permitType,
        nlmsEmpValid,
        nlmsEmpUpload,
        updatedBy,
      };

      const response = await client.graphql({
        query: updateDNDetails,
        variables: { input: updatedData },
      });

      console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  }, []);

  return { uploadNlmsFun };
};
