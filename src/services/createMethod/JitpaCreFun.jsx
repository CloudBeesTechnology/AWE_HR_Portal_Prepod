import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createBJLDetails } from "../../graphql/mutations";

export const JitpaCreFun = () => {
  const client = generateClient();
  const JitpaCreData = useCallback(async ({ creJitpaValue }) => {
    if (!creJitpaValue) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      empID: creJitpaValue.empID,
      tbaPurchase: [creJitpaValue.tbaPurchase],
      jitpaAmt: [creJitpaValue.jitpaAmt],
      jpValid: [creJitpaValue.jpValid],
      jpEndorse: [creJitpaValue.jpEndorse],
      jpEmpUpload: [creJitpaValue.jpEmpUpload],
      createdBy: creJitpaValue.createdBy
    };

    try {
      const storedData = await Promise.all([
        client.graphql({
          query: createBJLDetails,
          variables: {
            input: totalData,
          },
        }),
      ]);
      console.log(storedData, "successfully stored data");
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; 
    }
  }, []);
  return { JitpaCreData };
};
