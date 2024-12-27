
import { useState } from "react";
import { generateClient } from "@aws-amplify/api";

// Import the GraphQL mutation
import { createEmailNotifi } from "../graphql/mutations"; // Assuming mutation path

const client = generateClient();

export const useCreateNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const createNotification = async (input) => {
    setLoading(true);
    try {
      // Perform the GraphQL mutation request
      const result = await client.graphql({
        query: createEmailNotifi,
        variables: {
          input: {
            empID: input.empID, // Ensure this is defined in the schema
            leaveType: input.leaveType, // Ensure this is defined
            senderEmail: input.senderEmail, // Ensure this is defined
            receipentEmail: input.receipentEmail, // Ensure this is defined
            receipentEmpID: input.receipentEmpID, // Optional: ensure it's needed in the schema
            status: input.status, // Status like "Pending", "Approved", etc.
            message: input.message, // Notification message to send
            // Avoid adding createdAt and updatedAt unless the schema expects them
          },
          variables: { limit: 20000 },

        },
      });

      const createdNotification = result?.data?.createEmailNotifi;
      console.log("Created Email Notification:", createdNotification);
      setNotification(createdNotification);
    } catch (err) {
      setError(err);
      console.error("Error creating email notification:", err);
    } finally {
      setLoading(false);
    }
  };

  return { createNotification, loading, error, notification };
};
