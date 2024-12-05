// useRejectCandidate.js
import { useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { updatePersonalDetails } from "../../graphql/mutations";  // Import the mutation

const client = generateClient();

export const HandleRejectCandidates = () => {
  const [isRejected, setIsRejected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to handle rejecting the candidate
  const rejectCandidate = async (candidateId, onClose) => {
    if (!candidateId) {
      setError("Candidate ID is missing");
      return;
    }

    setIsLoading(true);
    setError(null);

    const data = {
      id: candidateId,
      status: "Inactive", // Update status to "Inactive"
    };

    try {
      const response = await client.graphql({
        query: updatePersonalDetails,  // Mutation for updating candidate details
        variables: { input: data },
      });

      // Handle success
      console.log("Candidate status updated to 'Inactive' successfully", response);
      setIsRejected(true);
      onClose(); // Optionally close the modal after successful update
    } catch (err) {
      setError(err.message || "An error occurred while rejecting the candidate");
      console.error("Error updating candidate status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isRejected,
    isLoading,
    error,
    rejectCandidate,
  };
};
