import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateBastingPaint } from "../../graphql/mutations";

export const BlastDataUp = () => {
  const client = generateClient();
  const BlastUp = useCallback(async ({ BlastUpValue }) => {
    if (!BlastUpValue ) {
      throw new Error("Missing required parameters");
    }

    const totalData = {
        id:BlastUpValue.id,
        empID:  BlastUpValue.empID,
        blastingRemarks:  BlastUpValue.blastingRemarks,
        blastingEndDate:  BlastUpValue.blastingEndDate,
        blastingStartDate:  BlastUpValue.blastingStartDate,
        blastingBadgeNo:  BlastUpValue.blastingBadgeNo,
        blastingQulifiExp:  BlastUpValue.blastingQulifiExp,
        blastingUpload: [JSON.stringify(BlastUpValue.blastingUpload)],
    };
    // console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: updateBastingPaint,
             variables: {
               input: totalData,
             },
           })
         ])
        //  console.log(storedData,"successfully Updated data");

       } catch (error) {
        console.log(error);
        
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { BlastUp };
};


