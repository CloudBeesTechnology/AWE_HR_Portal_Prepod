import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createEmployeeNonLocalAcco } from "../../graphql/mutations";

export const NLACreate = () => {
  const client = generateClient();
  const NLADatas = useCallback(async ({ NLACreValue  }) => {
    if (!NLACreValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        empID: NLACreValue.empID,
      accommodation: [NLACreValue.accommodation],
      accommodationAddress: [NLACreValue.accommodationAddress],
    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createEmployeeNonLocalAcco,
             variables: {
               input: totalData,
             },
           })
         ])
         console.log(storedData,"successfully stored data");

       } catch (error) {
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { NLADatas };
};
