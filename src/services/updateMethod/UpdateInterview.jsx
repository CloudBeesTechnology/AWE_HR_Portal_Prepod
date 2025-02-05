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
        id,
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
      };

      const response = await client.graphql({
        query: updateInterviewSchedule,
        variables: { input: updatedData , },
      });

      // // Log the response to confirm the update
      // console.log("Data successfully updated:", response);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { interviewDetails };
};
