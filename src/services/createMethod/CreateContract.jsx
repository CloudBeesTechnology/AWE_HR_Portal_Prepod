import { generateClient } from "@aws-amplify/api";
import { useState } from "react";
import { createContractForm } from "../../graphql/mutations";

const client = generateClient();

export const ContractForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [error, setError] = useState(null);

  const contractForm = async (formattedData) => {
    setIsLoading(true);
    setNotification(false);
    setError(null);

    try {
      const res = await client.graphql({
        query: createContractForm,
        variables: { input: formattedData },
      });
      console.log("API Response:", res);
      setNotification(true); // Assume success
    } catch (err) {
      console.error("Error during API call:", err);
      setError(err); // Set error state
    } finally {
      setIsLoading(false);
    }
  };

  return {
    contractForm,
    isLoading,
    notification,
    error,
  };
};
