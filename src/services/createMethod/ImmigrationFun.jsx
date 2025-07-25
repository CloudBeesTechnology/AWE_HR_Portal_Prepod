import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createPassportValid } from "../../graphql/mutations";

export const ImmigrationFun = () => {
  const client = generateClient();
  const ImmigrationData = useCallback(async ({ ImmiValue  }) => {
    if (!ImmiValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      empID: ImmiValue.empID,
      ppLocation: ImmiValue.ppLocation,
      arrivStampUpload: ImmiValue.arrivStampUpload,
      immigEmpUpload: ImmiValue.immigEmpUpload,
      reEntryUpload: ImmiValue.reEntryUpload,
      arrivStampExp: ImmiValue.arrivStampExp,
      immigRefNo: ImmiValue.immigRefNo,
      ppSubmit: ImmiValue.ppSubmit,
      empPassExp: ImmiValue.empPassExp,
      empPassStatus: ImmiValue.empPassStatus,
      airTktStatus: ImmiValue.airTktStatus,
      reEntryVisa: ImmiValue.reEntryVisa,
      immigApproval: ImmiValue.immigApproval,
      reEntryVisaExp: ImmiValue.reEntryVisaExp,
      remarkImmig: ImmiValue.remarkImmig,
      createdBy: ImmiValue.createdBy
    };

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createPassportValid,
             variables: {
               input: totalData,
             },
           })
         ])
         console.log(storedData,"successfully stored data");

       } catch (error) {
         console.error("Error executing GraphQL requests:", error);
         throw error; 
       }
  }, []);
  return { ImmigrationData };
};
