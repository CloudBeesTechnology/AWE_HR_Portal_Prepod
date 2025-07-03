import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateTrainingReq } from "../../graphql/mutations";

export const AddEmpReqUp = () => {
  const client = generateClient();
  const TrReqUp = useCallback(async ({ TMRDataUp }) => {
    if (!TMRDataUp) {
      throw new Error("Missing required parameters");
    }
     
    
    const totalData = {
      id: TMRDataUp.id,
      empID: TMRDataUp.empID,
      // traineeTrack:TMRDataUp.traineeTrack
      traineeTrack: JSON.stringify(TMRDataUp.trainingTrack),
    };
    // console.log(totalData, "update method");

    try {
      const storedData = await Promise.all([
        client.graphql({
          query: updateTrainingReq,
          variables: {
            input: totalData,
          },
        }),
      ]);
      console.log(storedData, "successfully update data");
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; // Rethrow error if needed
    }
  }, []);
  return { TrReqUp };
};
