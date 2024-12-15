import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateWeldingInfo } from "../../graphql/mutations";

export const WeldingDataUp = () => {
  const client = generateClient();
  const WQDataFunUp = useCallback(async ({ WQDataUp }) => {
    if (!WQDataUp ) {
      throw new Error("Missing required parameters");
    }

    const totalData = {
        id:WQDataUp.id,
        empID: WQDataUp.empID,
  diameterRange: WQDataUp.diameterRange,
  fillerMetal: WQDataUp.fillerMetal,
  thicknessRange: WQDataUp.thicknessRange,
  weldingStampNor: WQDataUp.weldingStampNor,
  wpsNumber: WQDataUp.wpsNumber,
  weldingProcess: WQDataUp.weldingProcess,
  weldingPosition: WQDataUp.weldingPosition,
  WQExpiry: WQDataUp.WQExpiry,
  WQRemarks: WQDataUp.WQRemarks,
  weldingUpload: [JSON.stringify(WQDataUp.weldingUpload)],
  WQRNo: WQDataUp.WQRNo,
  weldingCode: WQDataUp.weldingCode,
  weldingMaterial: WQDataUp.weldingMaterial,
    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: updateWeldingInfo,
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
  return { WQDataFunUp };
};


