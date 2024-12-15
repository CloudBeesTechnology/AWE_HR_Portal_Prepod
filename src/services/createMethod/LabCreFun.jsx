import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createBJLDetails } from "../../graphql/mutations";

export const LabCreFun = () => {
  const client = generateClient();
  const LabourCreData = useCallback(async ({ creLabpaValue }) => {
    if (!creLabpaValue) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      
        lbrReceiptNo:[creLabpaValue.lbrReceiptNo],
        lbrDepoAmt:[creLabpaValue.lbrDepoAmt],
        lbrDepoSubmit:[creLabpaValue.lbrDepoSubmit],
        lbrDepoUpload:[creLabpaValue.lbrDepoUpload],
        empID:creLabpaValue.empID,
      
    };
    console.log(totalData);

    try {
      const storedData = await Promise.all([
        client.graphql({
          query: createBJLDetails,
          variables: {
            input: totalData,
          },
        }),
      ]);
      console.log(storedData, "successfully Save data");
      
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; // Rethrow error if needed
    }
  }, []);
  return { LabourCreData };
};
