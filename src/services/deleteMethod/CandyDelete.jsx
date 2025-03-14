import { useState } from "react";
import {

  updatePersonalDetails,
} from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
export const CandyDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const client = generateClient();
  // Function to handle deletion of personal details
  const handleDeletePDDetails = async (id) => {
    setLoading(true);

    try {
      await client
        .graphql({
          query: updatePersonalDetails,
          variables: {
            input: { id: id, status: "Inactive" },
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log("Personal details deleted successfully");
    } catch (err) {
      setError(err);
      console.error("Error deleting personal details:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleDeletePDDetails,
 
  };
};
