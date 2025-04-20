import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createTrainingCertificates } from "../../graphql/mutations";

export const TCDataFun = () => {
  const client = generateClient();
  const TCData = useCallback(async ({ TCValue  }) => {
    if (!TCValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      empID: TCValue.empID,
      trainingProof: [JSON.stringify(TCValue.trainingProof)],
      // trainingProof: JSON.stringify(TCValue.trainingProof),
    };
    // console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createTrainingCertificates,
             variables: {
               input: totalData,
             },
           })
         ])
         console.log(storedData,"successfully create data");

       } catch (error) {
         console.error("Error executing GraphQL requests:", error);
         throw error; 
       }
  }, []);
  return { TCData };
};
