import { useState } from "react";
import { generateClient } from "@aws-amplify/api";

// Import the GraphQL mutation
import { updateEmpLeaveDetails } from "../graphql/mutations"; // Ensure the path is correct

const client = generateClient();

export const useUpdateLeaveDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedLeaveDetails, setUpdatedLeaveDetails] = useState(null);

  const updateLeaveDetails = async (id, updatedData) => {
    setLoading(true);
    try {
      // Perform the GraphQL mutation request
      const result = await client.graphql({
        query: updateEmpLeaveDetails,
        variables: {
          input: {
            id, // The leave record ID to update
            ...updatedData, // The data to update (e.g., leave type, dates, status)
          },
        },
      });

      const updatedLeave = result?.data?.updateEmpLeaveDetails;
      // console.log("Updated Leave Details:", updatedLeave);
      setUpdatedLeaveDetails(updatedLeave);
    } catch (err) {
      setError(err);
      console.error("Error updating leave details:", err);
    } finally {
      setLoading(false);
    }
  };

  return { updateLeaveDetails, loading, error, updatedLeaveDetails };
};
