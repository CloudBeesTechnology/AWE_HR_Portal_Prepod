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
      let allWPTrack = [];
      let allInterviewSchedules = [];
      let nextTokenWPTrack = null;
      let nextTokenInterview = null;

      try {
        // Fetch WPTrackings in a loop to handle pagination
        do {
          const res = await client.graphql({
            query: listWPTrackings,
            variables: { nextToken: nextTokenWPTrack },
          });

          const fetchedWPTrack = res?.data?.listWPTrackings?.items || [];
          allWPTrack = [...allWPTrack, ...fetchedWPTrack];
          nextTokenWPTrack = res?.data?.listWPTrackings?.nextToken;
        } while (nextTokenWPTrack);

        // Fetch Interview Schedules in a loop to handle pagination
        do {
          const res = await client.graphql({
            query: listInterviewSchedules,
            variables: { nextToken: nextTokenInterview },
          });

          const fetchedInterviewSchedules =
            res?.data?.listInterviewSchedules?.items || [];
          allInterviewSchedules = [
            ...allInterviewSchedules,
            ...fetchedInterviewSchedules,
          ];
          nextTokenInterview = res?.data?.listInterviewSchedules?.nextToken;
        } while (nextTokenInterview);

        // Create mapping objects for easy merging
        const interviewDetailsMap = allWPTrack.reduce((acc, detail) => {
          acc[detail.tempID] = detail;
          return acc;
        }, {});

        const statusDetailsMap = allInterviewSchedules.reduce((acc, detail) => {
          acc[detail.tempID] = detail;
          return acc;
        }, {});

        // Merge data
        const mergedData = allWPTrack.map((schedule) => ({
          ...schedule,
          IDDetails: statusDetailsMap[schedule.tempID] || {}, // Add interview status info
        }));

        setInterviewSchedules(mergedData);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Runs only once when the component mounts

  return { interviewSchedules, loading, error };
};
