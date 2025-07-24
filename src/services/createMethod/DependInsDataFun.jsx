import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createEmpDepInsurance } from "../../graphql/mutations";

export const DependInsDataFun = () => {
  const client = generateClient();
  const SubmitMPData = useCallback(async ({ depValue  }) => {
    if (!depValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        empID:depValue.empID,
        depInsurance: JSON.stringify(depValue.depInsurance),
        createdBy: depValue.createdBy,

    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createEmpDepInsurance,
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
  return { SubmitMPData };
};
