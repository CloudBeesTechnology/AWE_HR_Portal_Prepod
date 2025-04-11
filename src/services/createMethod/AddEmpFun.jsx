import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createTrainingReq } from "../../graphql/mutations";

export const AddEmpFun = () => {
  const client = generateClient();
  const AddEmpData = useCallback(async ({ AddEmpValue  }) => {
    if (!AddEmpValue ) {
      throw new Error("Missing required parameters");
    }

    const totalData = {
      empID:AddEmpValue.empID,
      traineeTrack:JSON.stringify(AddEmpValue.trainingTrack)
    };
    // console.log(totalData,"create");

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createTrainingReq,
             variables: {
               input: totalData,
             },
           })
         ])
        //  console.log(storedData,"successfully create data");

       } catch (error) {
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { AddEmpData };
};
