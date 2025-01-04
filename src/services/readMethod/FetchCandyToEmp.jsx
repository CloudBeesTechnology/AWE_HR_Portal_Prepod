
import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { listWPTrackings, listInterviewSchedules } from "../../graphql/queries";

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
        const [interviewSchedulesData, interStatus] = await Promise.all([
          client.graphql({ query: listWPTrackings,variables:{limit:20000} }),
          client.graphql({ query: listInterviewSchedules,variables:{limit:20000} }),
        ]);

        // Extract data or use empty array as fallback
        const fetchedInterviewSchedules = interviewSchedulesData?.data?.listWPTrackings?.items || [];
        const fetchedInterStatus = interStatus?.data?.listInterviewSchedules?.items || [];
      
        // Set interview schedules to state
        setInterviewSchedules(fetchedInterviewSchedules);

        const interviewDetailsMap = fetchedInterviewSchedules.reduce((acc, detail) => {
          acc[detail.tempID] = detail;
          return acc;
        }, {});

        const statusDetailsMap = fetchedInterStatus.reduce((acc, detail) => {
          acc[detail.tempID] = detail;
          return acc;
        }, {});

         // Merge interview schedules with personal details and local mobilizations
         const merged = fetchedInterviewSchedules.map((schedule) => ({
          ...schedule,
          IDDetails: statusDetailsMap[schedule.tempID] || {}, // Add local mobilization info
        }));
    setInterviewSchedules(merged)
        
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
