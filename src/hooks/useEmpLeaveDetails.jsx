import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { listEmpLeaveDetails } from "../graphql/queries"; // Assuming you have the query for listEmpLeaveDetails

const client = generateClient(); 

export const useEmpLeaveDetails = () => {
  const [empLeaveDetails, setEmpLeaveDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const empLeaveData = await client.graphql({
          query: listEmpLeaveDetails, // Query to fetch employee leave details
        });

        const fetchedEmpLeaveDetails =
          empLeaveData?.data?.listEmpLeaveDetails?.items || [];

        // console.log("Fetched Employee Leave Details:", fetchedEmpLeaveDetails);
        setEmpLeaveDetails(fetchedEmpLeaveDetails);
      } catch (err) {
        setError(err);
        console.error("Error fetching employee leave details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log("Employee Leave Details:", empLeaveDetails);

  return { empLeaveDetails, loading, error };
};
