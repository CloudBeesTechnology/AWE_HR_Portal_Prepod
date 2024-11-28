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
    

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: updateEmpInsurance,
             variables: {
               input: totalData,
             },
           })
         ])
        

       } catch (error) {
        console.log(error);
        
         
       }
  }, []);
  return { UpdateEIDataSubmit };
};
