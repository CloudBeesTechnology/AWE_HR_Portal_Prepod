import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createEmpRequisition } from "../../graphql/mutations";

export const EmpReqDataFun = () => {
    const client = generateClient();
  const SubmitReqData = useCallback(async ({ EmpReqValue  }) => {
    if (!EmpReqValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        department:EmpReqValue.department,  
        project: EmpReqValue.project,
        position: EmpReqValue.position,
        quantity: EmpReqValue.quantity,
        reasonForReq: EmpReqValue.reasonForReq,
        justification: EmpReqValue.justification,
        replacementFor: EmpReqValue.replacementFor,
        qualification: EmpReqValue.qualification,
        tentativeDate: EmpReqValue.tentativeDate,
    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createEmpRequisition,
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
  return { SubmitReqData };
};

