import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateInsClaim } from "../../graphql/mutations";

export const InsClaimUp = () => {
  const client = generateClient();
  const InsClaimUpData = useCallback(async ({ ICValuse }) => {
    if (!ICValuse) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      empID: ICValuse.empID,
      insuranceClaims: JSON.stringify(ICValuse.insuranceClaims),
      id: ICValuse.id,
    };
    // console.log(totalData,"updated");

    try {
      const storedData = await Promise.all([
        client.graphql({
          query: updateInsClaim,
          variables: {
            input: totalData,
          },
        }),
      ]);
      // console.log(storedData, "successfully Updated data");
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; // Rethrow error if needed
    }
  }, []);
  return { InsClaimUpData };
};
