import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateInterviewSchedule } from "../../graphql/mutations";

export const UpdateInterviewData = () => {
  const client = generateClient();

  const interviewDetails = useCallback(async ({ InterviewValue }) => {
    if (!InterviewValue) {
      throw new Error("Missing required parameters or empID");
    }

    try {
      const {
        id,
        interDate,
        interTime,
        venue,
        interType,
        bagdeNo,
        message,
        manager,
        candidateStatus,
        status,
        department,
        otherDepartment,
        updatedBy,
      } = InterviewValue;

      const updatedData = {
        id,
        interDate,
        interTime,
        venue,
        interType,
        bagdeNo,
        message,
        manager,
        candidateStatus,
        status,
        department,
        otherDepartment,
        updatedBy,
      };

      const response = await client.graphql({
        query: updateInterviewSchedule,
        variables: { input: updatedData },
      });

      console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; 
    }
  }, []);

  return { interviewDetails };
};
