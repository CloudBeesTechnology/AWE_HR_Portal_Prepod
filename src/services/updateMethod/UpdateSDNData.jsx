import { generateClient } from "@aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { updateDNDetails } from "../../graphql/mutations";

export const UpdateDataFun = () => {
  const client = generateClient();

  const UpdateMPData = useCallback(async ({ DoeUpValue }) => {
    if (!DoeUpValue) {
      throw new Error("Missing required parameters or empID");
    }
    try {
      const updatedData = {
        id:DoeUpValue.id,
        empID:DoeUpValue.empID, // Use the existing ID
        doeEmpSubmit:DoeUpValue.doeEmpSubmit,
        doeEmpApproval:DoeUpValue.doeEmpApproval,
        doeEmpValid:DoeUpValue.doeEmpValid,
        doeEmpRefNo:DoeUpValue.doeEmpRefNo,
        doeEmpUpload:DoeUpValue.doeEmpUpload,
      };

      const response = await client.graphql({
        query: updateDNDetails,
        variables: { input: updatedData },
      });

   
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { UpdateMPData };
};
