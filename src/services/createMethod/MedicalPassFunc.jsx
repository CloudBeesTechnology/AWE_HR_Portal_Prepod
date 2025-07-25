import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createLabourMedicalInfo } from "../../graphql/mutations";

export const MedicalPassFunc = () => {
  const client = generateClient();
  const SubmitMPData = useCallback(async ({ labValue  }) => {
    if (!labValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      empID: labValue.empID,
      overMD: labValue.overMD,
      overME: labValue.overME,
      bruhimsRD: labValue.bruhimsRD,
      bruhimsRNo: labValue.bruhimsRNo,
      bruneiMAD: labValue.bruneiMAD,
      bruneiME: labValue.bruneiME,
      dependPass: JSON.stringify(labValue.dependPass),
      uploadFitness: labValue.uploadFitness,
      uploadRegis: labValue.uploadRegis,
      uploadBwn: labValue.uploadBwn,
      createdBy: labValue.createdBy,
    };
    // console.log(totalData,"totalData");

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createLabourMedicalInfo,
             variables: {
               input: totalData,
             },
           })
         ])
        //  console.log(storedData,"successfully stored data");

       } catch (error) {
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { SubmitMPData };
};
