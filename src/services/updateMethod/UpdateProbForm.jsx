import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateProbForm } from "../../graphql/mutations";

export const UpdateProbForm = () => {
  const client = generateClient();
  const UpdateProb = useCallback(async ({ PbFDataUp }) => {
    if (!PbFDataUp ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        id:PbFDataUp.id,
        empID: PbFDataUp.empID,
        adaptability: PbFDataUp.adaptability,
        additionalInfo: PbFDataUp.additionalInfo,
        attention: PbFDataUp.attention,
        attitude: PbFDataUp.attitude,
        commitment: PbFDataUp.commitment,
        communication: PbFDataUp.communication,
        deadline: PbFDataUp.deadline,
        extendDate: PbFDataUp.extendDate,
        diligent: PbFDataUp.diligent,
        extendProbED: PbFDataUp.extendProbED,
        extensionPeriod: PbFDataUp.extensionPeriod,
        gmName: PbFDataUp.gmName,
        gmApproved: PbFDataUp.gmApproved,
        gmDate: PbFDataUp.gmDate,
        hrDate: PbFDataUp.hrDate,
        hrName: PbFDataUp.hrName,
        initiative: PbFDataUp.initiative,
        managerApproved: PbFDataUp.managerApproved,
        managerDate: PbFDataUp.managerDate,
        managerName: PbFDataUp.managerName,
        pace: PbFDataUp.pace,
        quality: PbFDataUp.quality,
        recommendation: PbFDataUp.recommendation,
        responsibility: PbFDataUp.responsibility,
        supervisorApproved: PbFDataUp.supervisorApproved,
        supervisorDate: PbFDataUp.supervisorDate,
        supervisorName: PbFDataUp.supervisorName,
        teamwork: PbFDataUp.teamwork, 
        communicationDetails: PbFDataUp.communicationDetails,
        qualityDetails: PbFDataUp.qualityDetails,
        paceDetails: PbFDataUp.paceDetails,
        initiativeDetails: PbFDataUp.initiativeDetails,
        attitudeDetails: PbFDataUp.attitudeDetails,
        adaptabilityDetails: PbFDataUp.adaptabilityDetails,
        teamworkDetails: PbFDataUp.teamworkDetails,
        responsibilityDetails: PbFDataUp.responsibilityDetails,
        diligentDetails: PbFDataUp.diligentDetails,
        commitmentDetails: PbFDataUp.commitmentDetails,
        probStatus:PbFDataUp.probStatus

    };
    // console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: updateProbForm,
             variables: {
               input: totalData, 
             },
           })
         ])
        //  console.log(storedData,"successfully Updated data");

       } catch (error) {
        console.log(error);
        
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { UpdateProb };
};