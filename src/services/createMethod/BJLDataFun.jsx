import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createBJLDetails } from "../../graphql/mutations";

export const BJLDataFun = () => {
  const client = generateClient();
  const BGData = useCallback(async ({ BJLValue }) => {
    if (!BJLValue) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      empID: BJLValue.empID,
      bankSubmit: [BJLValue.bankSubmit],
      bankRece: [BJLValue.bankRece],
      bankRefNo: [BJLValue.bankRefNo],
      bankAmt: [BJLValue.bankAmt],
      bankValid: [BJLValue.bankValid],
      bankEndorse: [BJLValue.bankEndorse],
      bankEmpUpload: [BJLValue.bankEmpUpload],
      createdBy: BJLValue.createdBy
    };

    try {
      const storedData = await Promise.all([
        client.graphql({
          query: createBJLDetails,
          variables: {
            input: totalData,
          },
        }),
      ]);
      console.log(storedData, "successfully stored data");
      
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; 
    }
  }, []);
  return { BGData };
};
