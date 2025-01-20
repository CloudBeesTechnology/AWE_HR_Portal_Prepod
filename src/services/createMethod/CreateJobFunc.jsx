import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createHiringJob } from "../../graphql/mutations";

export const CreateJobFunc = () => {
  const client = generateClient();

  const SubmitJobData = useCallback(
    async ({ jobValue }) => {
      if (!jobValue || !jobValue.jobTitle) {
        throw new Error("Job title is required.");
      }

      try {
        const formatDate = (date) => {
          if (!date) return null;
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, "0");
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const year = d.getFullYear();
          return `${day}/${month}/${year}`;
        };

        const startDateValue = formatDate(jobValue.startDate);
        const expiryDateValue = formatDate(jobValue.expiryDate);
        const createHireData = {
          jobTitle: jobValue.jobTitle,
          exper: jobValue.experience,
          location: jobValue.location,
          quantityPerson: jobValue.quantity,
          startDate: startDateValue,
          expiryDate: expiryDateValue,
          jobContent: jobValue.jobDesc,
          uploadJobDetails:jobValue.uploadJobDetails
        };
// console.log(createHireData);

        const response = await client.graphql({
          query: createHiringJob,
          variables: { input: createHireData },
        });
      }
       catch (error) {
        console.error("Error updating data:", error);
        throw error; // Re-throw the error after logging
      }
    },
    [client]
  );

  return { SubmitJobData };
};
