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
        tbaPurchase:[creJitpaValue.tbaPurchase],
        jitpaAmt:[creJitpaValue.jitpaAmt],
        jpValid:[creJitpaValue.jpValid],
        jpEndorse:[creJitpaValue.jpEndorse],
        jpEmpUpload:[creJitpaValue.jpEmpUpload],
      empID:creJitpaValue.empID,
      
    };
    console.log(totalData);

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
      throw error; // Rethrow error if needed
    }
  }, []);
  return { JitpaCreData };
};
