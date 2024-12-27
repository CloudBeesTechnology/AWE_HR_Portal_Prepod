import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { listWPTrackings } from "../../graphql/queries";

const client = generateClient();

export const useFetchCandy = () => {

  const [interviewSchedules, setInterviewSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch the data from multiple sources concurrently
        const [interviewSchedulesData] = await Promise.all([
          client.graphql({ query: listWPTrackings }),
        ]);

        // Extract data or use empty array as fallback
        const fetchedInterviewSchedules = interviewSchedulesData?.data?.listWPTrackings?.items || [];
      
        // Set interview schedules to state
        setInterviewSchedules(fetchedInterviewSchedules);
        
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return { interviewSchedules, loading, error };
};
