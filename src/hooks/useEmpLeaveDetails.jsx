import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listEmpLeaveDetails } from "../graphql/queries";

const client = generateClient();

export const useEmpLeaveDetails = () => {
  const [empLeaveDetails, setEmpLeaveDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextToken, setNextToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      let allEmpLeaveDetails = [];
      let currentNextToken = nextToken;

      try {
        do {
          const response = await client.graphql({
            query: listEmpLeaveDetails,
            variables: {
              nextToken: currentNextToken,
            },
          });

          allEmpLeaveDetails = [
            ...allEmpLeaveDetails,
            ...response.data.listEmpLeaveDetails.items,
          ];

          currentNextToken = response.data.listEmpLeaveDetails.nextToken;
        } while (currentNextToken);

        setEmpLeaveDetails(allEmpLeaveDetails);
      } catch (err) {
        setError(err);
        console.error("Error fetching employee leave details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nextToken]);

  useEffect(() => {
    if (empLeaveDetails.length > 0) {
      console.log("Fetched Employee Leave Details:", empLeaveDetails);
    }
  }, [empLeaveDetails]);

  return { empLeaveDetails, loading, error };
};
