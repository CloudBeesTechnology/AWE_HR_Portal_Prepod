import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createTerminationInfo } from "../../graphql/mutations";

export const CreateTerminate = () => {
  const client = generateClient();

  const TerminateDataValue = useCallback(async ({ TerminateValue }) => {
    if (!TerminateValue) {
      throw new Error("Missing required parameters");
    }

    const {
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
      createdBy,
    } = TerminateValue;

    const totalData = {
      empID,
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
      WIContract: JSON.stringify(WIContract),
      WIProbation: JSON.stringify(WIProbation),
      WIResignation: JSON.stringify(WIResignation),
      WITermination: JSON.stringify(WITermination),
      WILeaveEntitle: JSON.stringify(WILeaveEntitle),
      createdBy: createdBy,
    };

    try {
      const response = await Promise.all([
        client.graphql({
          query: createTerminationInfo,
          variables: {
            input: totalData,
          },
        }),
      ]);
      // console.log("res", response);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return { TerminateDataValue };
};
