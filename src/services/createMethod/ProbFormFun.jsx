
import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createProbForm } from "../../graphql/mutations";

export const ProbFormFun = () => {
  const client = generateClient();
  const ProbFormsData = useCallback(async ({ ProbValue }) => {
    if (!ProbValue) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        empID: ProbValue.empID,
        adaptability: ProbValue.adaptability,
        additionalInfo: ProbValue.additionalInfo,
        attention: ProbValue.attention,
        attitude: ProbValue.attitude,
        commitment: ProbValue.commitment,
        communication: ProbValue.communication,
        deadline: ProbValue.deadline,
        diligent: ProbValue.diligent,
        extendProbED: ProbValue.extendProbED,
        extensionPeriod: ProbValue.extensionPeriod,
        gmApproved: ProbValue.gmApproved,
        gmDate: ProbValue.gmDate,
        hrDate: ProbValue.hrDate,
        hrName: ProbValue.hrName,
        initiative: ProbValue.initiative,
        managerApproved: ProbValue.managerApproved,
        managerDate: ProbValue.managerDate,
        managerName: ProbValue.managerName,
        pace: ProbValue.pace,
        quality: ProbValue.quality,
        recommendation: ProbValue.recommendation,
        responsibility: ProbValue.responsibility,
        supervisorApproved: ProbValue.supervisorApproved,
        supervisorDate: ProbValue.supervisorDate,
        supervisorName: ProbValue.supervisorName,
        teamwork: ProbValue.teamwork, 
        communicationDetails: ProbValue.communicationDetails,
        qualityDetails: ProbValue.qualityDetails,
        paceDetails: ProbValue.paceDetails,
        initiativeDetails: ProbValue.initiativeDetails,
        attitudeDetails: ProbValue.attitudeDetails,
        adaptabilityDetails: ProbValue.adaptabilityDetails,
        teamworkDetails: ProbValue.teamworkDetails,
        responsibilityDetails: ProbValue.responsibilityDetails,
        diligentDetails: ProbValue.diligentDetails,
        commitmentDetails: ProbValue.commitmentDetails,
        probStatus:ProbValue.probStatus
    };
    console.log(totalData);

    try {
      const storedData = await Promise.all([
        client.graphql({
          query: createProbForm,
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
  return { ProbFormsData };
};
