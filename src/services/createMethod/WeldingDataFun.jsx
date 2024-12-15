import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createWeldingInfo } from "../../graphql/mutations";

export const WeldingDataFun = () => {
  const client = generateClient();
  const WQData = useCallback(async ({ WQValue  }) => {
    if (!WQValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
  empID: WQValue.empID,
  diameterRange: WQValue.diameterRange,
  fillerMetal: WQValue.fillerMetal,
  thicknessRange: WQValue.thicknessRange,
  weldingStampNor: WQValue.weldingStampNor,
  wpsNumber: WQValue.wpsNumber,
  weldingProcess: WQValue.weldingProcess,
  weldingPosition: WQValue.weldingPosition,
  WQExpiry: WQValue.WQExpiry,
  WQRemarks: WQValue.WQRemarks,
  weldingUpload: [JSON.stringify(WQValue.weldingUpload)],
  WQRNo: WQValue.WQRNo,
  weldingCode: WQValue.weldingCode,
  weldingMaterial: WQValue.weldingMaterial,
    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createWeldingInfo,
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
  return { WQData };
};
