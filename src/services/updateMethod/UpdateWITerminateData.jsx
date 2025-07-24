import { useCallback } from "react";
import { generateClient } from "@aws-amplify/api";
import { updateTerminationInfo } from "../../graphql/mutations";

// Update Work Info Data function
export const UpdateWITerminateData = () => {
  // Initialize AWS Amplify client
  const client = generateClient();

  const WIUpdateTerminateData = useCallback(async ({ TerminateUpValue }) => {
    // Check if required data is provided
    if (!TerminateUpValue) {
      throw new Error("Missing required parameters");
    }

    const {
      empID,
      terminateDataRecord,
      resignDate,
      resignNotProb,
      otherResignNotProb,
      resignNotConf,
      otherResignNotConf,
      reasonResign,
      reasonTerminate,
      termiDate,
      termiNotProb,
      otherTermiNotProb,
      termiNotConf,
      otherTermiNotConf,
      WIContract,
      WIProbation,
      WIResignation,
      WITermination,
      WILeaveEntitle,
      updatedBy
    } = TerminateUpValue;

    // console.log(contractEndValue);

    if (terminateDataRecord) {
      const totalData2 = {
        id: terminateDataRecord.id,
        empID,
        resignDate,
        termiDate,
        resignNotProb,
        otherResignNotProb,
        termiNotProb,
        otherTermiNotProb,
        resignNotConf,
        otherResignNotConf,
        termiNotConf,
        otherTermiNotConf,
        reasonResign,
        reasonTerminate,
        WIContract,
        WIProbation,
        WIResignation,
        WITermination,
        WILeaveEntitle,
        updatedBy: updatedBy,
      };

      // console.log(totalData2, "ertdfghjkhbtxrfgh");

      try {
        const Terminate = await client.graphql({
          query: updateTerminationInfo,
          variables: { input: totalData2 },
        });
        console.log(Terminate);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  // Return the update function so it can be used in the component
  return { WIUpdateTerminateData };
};
