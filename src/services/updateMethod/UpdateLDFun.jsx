import { generateClient } from "@aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { updateBJLDetails } from "../../graphql/mutations";

export const UpdateLDFun = () => {
  const client = generateClient();

  const UpdateLDData = useCallback(async ({ LDValue }) => {
    if (!LDValue) {
      throw new Error("Missing required parameters or empID");
    }
    try {
      const {
        lbrReceiptNo,
      lbrDepoAmt,
      lbrDepoSubmit,
      lbrDepoUpload,
        id,
      } = LDValue;

      const updatedData = {
        id, // Use the existing ID
        lbrReceiptNo,
      lbrDepoAmt,
      lbrDepoSubmit,
      lbrDepoUpload,
      };

      const response = await client.graphql({
        query: updateBJLDetails,
        variables: { input: updatedData , limit:20000,},
      });

      // // Log the response to confirm the update
      // console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { UpdateLDData };
};
