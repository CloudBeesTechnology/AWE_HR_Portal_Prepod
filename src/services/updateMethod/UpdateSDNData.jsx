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
        id: DoeUpValue.id,
        empID: DoeUpValue.empID,
        doeEmpSubmit: DoeUpValue.doeEmpSubmit,
        doeEmpApproval: DoeUpValue.doeEmpApproval,
        doeEmpValid: DoeUpValue.doeEmpValid,
        doeEmpRefNo: DoeUpValue.doeEmpRefNo,
        doeEmpUpload: DoeUpValue.doeEmpUpload,
        updatedBy: DoeUpValue.updatedBy
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

  return { UpdateMPData };
};
