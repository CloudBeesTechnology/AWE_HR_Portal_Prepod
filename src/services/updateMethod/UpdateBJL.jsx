import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateBJLDetails } from "../../graphql/mutations";

export const UpdateBJL = () => {
  const client = generateClient();
  const UpdateBJLFun = useCallback(async ({ BJLUpValue }) => {
    if (!BJLUpValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        id:BJLUpValue.id,
        empID: BJLUpValue.empID,
      bankSubmit: BJLUpValue.bankSubmit,
      bankRece: BJLUpValue.bankRece,
      bankRefNo: [BJLUpValue.bankRefNo],
      bankAmt: [BJLUpValue.bankAmt],
      bankValid: BJLUpValue.bankValid,
      bankEndorse: BJLUpValue.bankEndorse,
      bankEmpUpload: [BJLUpValue.bankEmpUpload],

    };
  

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: updateBJLDetails,
             variables: {
               input: totalData,
             },
           })
         ])
        

       } catch (error) {
        console.log(error);
        
       
       }
  }, []);
  return { UpdateBJLFun };
};