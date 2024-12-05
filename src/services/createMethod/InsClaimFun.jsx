import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createInsClaim } from "../../graphql/mutations";

export const InsClaimFun = () => {
  const client = generateClient();
  const SubmitICData = useCallback(async ({ ICValuse  }) => {
    if (!ICValuse ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        empID:ICValuse.empID,
        insuranceClaims: JSON.stringify(ICValuse.insuranceClaims),
    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createInsClaim,
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
  return { SubmitICData };
};
