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
      empID:TCValue.empID,
      certifiExpiry:[TCValue.certifiExpiry],
      eCertifiDate:[TCValue.eCertifiDate],
      trainingUpCertifi: [JSON.stringify(TCValue.trainingUpCertifi)],
      orgiCertifiDate:[TCValue.orgiCertifiDate],
      poNo: [TCValue.poNo],
      addDescretion: [TCValue.addDescretion]
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
        //  console.log(storedData,"successfully stored data");

       } catch (error) {
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { TCData };
};
