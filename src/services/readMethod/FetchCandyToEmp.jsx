
import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { listWPTrackings } from "../../graphql/queries";
import { listInterviewSchedules } from "../../graphql/queries"; // Assuming this query exists

const client = generateClient();

export const useFetchCandy = () => {

  const [interviewSchedules, setInterviewSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch the data from both queries concurrently
        const [interviewSchedulesData, interviewScheduleData] = await Promise.all([
          client.graphql({ query: listWPTrackings ,variables:{limit:20000}}),
          client.graphql({ query: listInterviewSchedules ,variables:{limit:20000}}) // Fetch the second query
        ]);

        // Extract data or use empty array as fallback
        const fetchedInterviewSchedules = interviewSchedulesData?.data?.listWPTrackings?.items || [];
        const fetchedInterviewSchedule = interviewScheduleData?.data?.listInterviewSchedules?.items || [];

        // Merge the results
        // Assuming both are arrays, just concatenate them
        const mergedSchedules = [
          ...fetchedInterviewSchedules, 
          ...fetchedInterviewSchedule
        ];

        // Optionally, you can sort the merged result, if needed:
        // mergedSchedules.sort((a, b) => new Date(a.date) - new Date(b.date)); // Example of sorting by date

        // Set merged schedules to state
        setInterviewSchedules(mergedSchedules);
        
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
