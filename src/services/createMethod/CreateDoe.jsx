
import { generateClient } from "@aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { createDNDetails } from "../../graphql/mutations";

export const CreateDoe = () => {
  const client = generateClient();

  const CrerDoeFunData = useCallback(async ({ DoeValue }) => {
    if (!DoeValue) {
      throw new Error("Missing required parameters or empID");
    }
    try {
      const updatedData = {
        empID:DoeValue.empID, // Use the existing ID
        doeEmpSubmit:DoeValue.doeEmpSubmit,
        doeEmpApproval:DoeValue.doeEmpApproval,
        doeEmpValid:DoeValue.doeEmpValid,
        doeEmpRefNo:DoeValue.doeEmpRefNo,
        doeEmpUpload:DoeValue.doeEmpUpload,
      };

      const response = await client.graphql({
        query: createDNDetails,
        variables: { input: updatedData },
      });

      // // Log the response to confirm the update
      // console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { CrerDoeFunData };
};

// import { generateClient } from "@aws-amplify/api";
// import { useCallback } from "react";
// import { updateSDNDetails } from "../../graphql/mutations";

// export const CreateDoe = () => {
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
