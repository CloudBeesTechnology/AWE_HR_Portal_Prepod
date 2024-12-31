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
        variables: { input: updatedData, limit:20000, },
      });

      // // Log the response to confirm the update
      console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { UpdateMPData };
};

// import { generateClient } from "@aws-amplify/api";
// import { useCallback } from "react";
// import { updateSDNDetails } from "../../graphql/mutations";

// export const UpdateDataFun = () => {
//   const client = generateClient();

//   const UpdateMPData = useCallback(async ({ SawpValue, version }) => {
//     if (!SawpValue || !SawpValue.empID) {
//       throw new Error("Missing required parameters or empID");
//     }

//     try {
//       const updatedData = {
//         id: "3b11cae4-52f4-4409-8a77-391f7138f83",
//         doeEmpSubmit: SawpValue.doeEmpSubmit,
//         doeEmpApproval: SawpValue.doeEmpApproval,
//         doeEmpValid: SawpValue.doeEmpValid,
//         doeEmpRefNo: SawpValue.doeEmpRefNo,
//         doeEmpUpload: SawpValue.doeEmpUpload,
//         permitType: SawpValue.permitType,
//         nlmsEmpSubmit: SawpValue.nlmsEmpSubmit,
//         nlmsEmpSubmitRefNo: SawpValue.nlmsEmpSubmitRefNo,
//         nlmsEmpApproval: SawpValue.nlmsEmpApproval,
//         nlmsRefNo: SawpValue.nlmsRefNo,
//         nlmsEmpValid: SawpValue.nlmsEmpValid,
//         nlmsEmpUpload: SawpValue.nlmsEmpUpload,
//         _version: version, // Include version to handle OCC
//       };

//       const response = await client.graphql({
//         query: updateSDNDetails,
//         variables: { input: updatedData },
//       });

//       console.log("Data successfully updated:", response);
//     } catch (error) {
//       console.error("Error updating data:", error);
//       throw error;
//     }
//   }, []);

//   return { UpdateMPData };
// };
