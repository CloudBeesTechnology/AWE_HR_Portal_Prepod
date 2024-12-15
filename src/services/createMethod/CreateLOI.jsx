// useCreateInterviewSchedule.js
import { useState } from 'react';
import { generateClient } from '@aws-amplify/api';
import { createLocalMobilization } from '../../graphql/mutations';

const client = generateClient();

export const LocalMobilization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [error, setError] = useState(null);

  const localMobilization = async (formattedData) => {
    setIsLoading(true);
    setNotification(false);
    setError(null);

    try {
      const res = await client.graphql({
        query: createLocalMobilization,
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
    localMobilization,
    isLoading,
    notification,
    error,
  };
};
