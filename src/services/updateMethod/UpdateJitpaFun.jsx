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
        updatedBy
      } = JitpaValue;

      const updatedData = {
        id, 
        tbaPurchase,
        jitpaAmt,
        jpValid,
        jpEndorse,
        jpEmpUpload,
        updatedBy
      };

      const response = await client.graphql({
        query: updateBJLDetails,
        variables: { input: updatedData, },
      });

      // console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; 
    }
  }, []);

  return { UpdateJitpaData };
};
