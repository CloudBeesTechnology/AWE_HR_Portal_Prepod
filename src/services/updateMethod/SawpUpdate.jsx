import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateSawpDetails } from "../../graphql/mutations";

export const SawpUpdate = () => {
  const client = generateClient();
  const SawpUpdateFun = useCallback(async ({ SawpUpValue }) => {
    if (!SawpUpValue) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      id: SawpUpValue.id,
      empID: SawpUpValue.empID,
      sawpEmpLtrReq: SawpUpValue.sawpEmpLtrReq,
      sawpEmpLtrReci: SawpUpValue.sawpEmpLtrReci,
      sawpEmpUpload: SawpUpValue.sawpEmpUpload,
      updatedBy: SawpUpValue.updatedBy,
    };

    try {
      const storedData = await Promise.all([
        client.graphql({
          query: updateSawpDetails,
          variables: {
            input: totalData,
          },
        }),
      ]);
      console.log(storedData, "successfully Updated data");
    } catch (error) {
      console.log(error);

      console.error("Error executing GraphQL requests:", error);
      throw error;
    }
  }, []);
  return { SawpUpdateFun };
};
