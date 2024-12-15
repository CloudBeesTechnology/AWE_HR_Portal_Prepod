import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createBastingPaint } from "../../graphql/mutations";

export const BlastDataFun = () => {
  const client = generateClient();
  const BlastData = useCallback(async ({ BlastValue  }) => {
    if (!BlastValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
  empID:  BlastValue.empID,
  blastingRemarks:  BlastValue.blastingRemarks,
  blastingEndDate:  BlastValue.blastingEndDate,
  blastingStartDate:  BlastValue.blastingStartDate,
  blastingBadgeNo:  BlastValue.blastingBadgeNo,
  blastingQulifiExp:  BlastValue.blastingQulifiExp,
  blastingUpload: [JSON.stringify(BlastValue.blastingUpload)],
 
    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createBastingPaint,
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
  return { BlastData };
};

