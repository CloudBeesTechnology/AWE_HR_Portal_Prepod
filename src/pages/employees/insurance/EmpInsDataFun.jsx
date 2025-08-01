import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createEmpInsurance } from "../../../graphql/mutations";

export const EmpInsDataFun = () => {
  const client = generateClient();
  const SubmitMPData = useCallback(async ({ empInsValue }) => {
    if (!empInsValue ) {
      throw new Error("Missing required parameters");
    }
    
    const totalData = {
        empID:empInsValue.empID,
        // empBadgeNo:empInsValue.empBadgeNo,
        // name:empInsValue.name,
        // department:empInsValue.department,
        // position:empInsValue.position,
        // doj:empInsValue.doj,
        // gender:empInsValue.gender,
        // bwnIcNo:empInsValue.bwnIcNo,
        // ppNo:empInsValue.ppNo,
        // dob:empInsValue.dob,
        // marital:empInsValue.marital,
        // nationality:empInsValue.nationality,
        groupIns:[empInsValue.groupIns],
        groupInsEffectDate:[empInsValue.groupInsEffectDate],
        groupInsEndDate:[empInsValue.groupInsEndDate],
        empStatusType:empInsValue.empStatusType,
        workmenCompNo:empInsValue.workmenCompNo,
        travelIns:[empInsValue.travelIns],
        accidentIns:[empInsValue.accidentIns],
        empInsUpload:[empInsValue.empInsUpload],
        createdBy:empInsValue.createdBy,

    };
    // console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createEmpInsurance,
             variables: {
               input: totalData,
             },
           })
         ])
         console.log(storedData,"successfully stored data");

       } catch (error) {
        console.log(error);
        
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { SubmitMPData };
};
