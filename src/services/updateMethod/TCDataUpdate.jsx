import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateTrainingCertificates } from "../../graphql/mutations";

export const TCDataUpdate = () => {
  const client = generateClient();
  const TCDataFunUp = useCallback(async ({ TCDataUp }) => {
    if (!TCDataUp ) {
      throw new Error("Missing required parameters");
    }

    const totalData = {
        id:TCDataUp.id,
        empID:TCDataUp.empID,
      certifiExpiry:[TCDataUp.certifiExpiry],
      eCertifiDate:[TCDataUp.eCertifiDate],
      trainingUpCertifi: [JSON.stringify(TCDataUp.trainingUpCertifi)],
      orgiCertifiDate:[TCDataUp.orgiCertifiDate],
      poNo: [TCDataUp.poNo],
      addDescretion: [TCDataUp.addDescretion],
      tcRemarks:TCDataUp.tcRemarks
    };
    // console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: updateTrainingCertificates,
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
  return { TCDataFunUp };
};

