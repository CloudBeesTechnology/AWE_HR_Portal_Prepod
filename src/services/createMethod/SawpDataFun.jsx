import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createSawpDetails } from "../../graphql/mutations";

export const SawpDataFun = () => {
  const client = generateClient();
  const SubmitMPData = useCallback(async ({ SawpValue  }) => {
    if (!SawpValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        empID: SawpValue.empID,
        sawpEmpLtrReq:[SawpValue.sawpEmpLtrReq],  
        sawpEmpLtrReci: [SawpValue.sawpEmpLtrReci],
        sawpEmpUpload: [SawpValue.sawpEmpUpload],
    };
    // console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createSawpDetails,
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
