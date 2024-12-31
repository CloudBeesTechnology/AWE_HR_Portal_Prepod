
import { generateClient } from "@aws-amplify/api";
import { useCallback} from "react";
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
      // console.log("Data successfully created:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, [client]);

  return { CrerDoeFunData };
};
