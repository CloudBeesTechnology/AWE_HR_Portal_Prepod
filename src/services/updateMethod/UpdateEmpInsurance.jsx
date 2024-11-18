import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateEmpInsurance } from "../../graphql/mutations";

export const UpdateEmpInsDataFun = () => {
  const client = generateClient();
  const UpdateEIDataSubmit = useCallback(async ({ empInsValue }) => {
    if (!empInsValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        id:empInsValue.id,
        empID:empInsValue.empID,
        groupIns:[empInsValue.groupIns],
        groupInsEffectDate:[empInsValue.groupInsEffectDate],
        groupInsEndDate:[empInsValue.groupInsEndDate],
        workmenComp:[empInsValue.workmenComp],
        workmePolicyNo:[empInsValue.workmePolicyNo],
        travelIns:[empInsValue.travelIns],
        accidentIns:[empInsValue.accidentIns],
        empInsUpload:[empInsValue.empInsUpload],

    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: updateEmpInsurance,
             variables: {
               input: totalData,
             },
           })
         ])
         console.log(storedData,"successfully Updated data");

       } catch (error) {
        console.log(error);
        
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { UpdateEIDataSubmit };
};
