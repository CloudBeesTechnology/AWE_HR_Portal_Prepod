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
      const { lbrReceiptNo, lbrDepoAmt, lbrDepoSubmit, lbrDepoUpload, id, updatedBy } =
        LDValue;

      const updatedData = {
        id,
        lbrReceiptNo,
        lbrDepoAmt,
        lbrDepoSubmit,
        lbrDepoUpload,
        updatedBy,
      };

      const response = await client.graphql({
        query: updateBJLDetails,
        variables: { input: updatedData },
      });

      console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  }, []);

  return { UpdateLDData };
};
