// useDeleteCandidates.js
import { useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { updatePersonalDetails } from "../../graphql/mutations";  // Import the mutation for updating status

const client = generateClient();

export const  HandleDeleteCandy= () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const deactivateCandidates = async (selectedRows, setSelectedRows) => {
    if (selectedRows.length === 0) {
      setError("No candidates selected for deactivation.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Loop through the selected rows and set their status to "Inactive"
      for (let i = 0; i < selectedRows.length; i++) {
        const candidateId = selectedRows[i];  // Assuming selectedRows contains candidate IDs or "sno"
        
        // Call the mutation to update candidate status to "Inactive"
        await client.graphql({
          query: updatePersonalDetails,
          variables: { 
            input: { 
              id: candidateId, 
              status: "Inactive"  // Update the status to "Inactive"
            } 
          },
        });
      }

      // After successful update, reset the selected rows
      setSelectedRows([]);
      setIsLoading(false);
      alert("Candidates deactivated successfully.");
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "An error occurred while deactivating the candidates.");
    }
  };

  return {
    isLoading,
    error,
    deactivateCandidates,  // renamed to deactivateCandidates for clarity
  };
};
