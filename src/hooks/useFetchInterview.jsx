import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  listInterviewSchedules,
  listPersonalDetails,
  listLocalMobilizations,
} from "../graphql/queries";

const client = generateClient();

export const useFetchInterview = () => {
  const [mergedInterviewData, setMergedInterviewData] = useState([]);
  const [interviewSchedules, setInterviewSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch the data from multiple sources concurrently
        const [interviewSchedulesData, personalDetailsData, localMobilizationsData] = await Promise.all([
          client.graphql({ query: listInterviewSchedules }),
          client.graphql({ query: listPersonalDetails }),
          client.graphql({ query: listLocalMobilizations }),
        ]);

        // Extract data or use empty array as fallback
        const fetchedInterviewSchedules = interviewSchedulesData?.data?.listInterviewSchedules?.items || [];
        const fetchedPersonalDetails = personalDetailsData?.data?.listPersonalDetails?.items || [];
        const fetchedLocalMobilizations = localMobilizationsData?.data?.listLocalMobilizations?.items || [];

        // Set interview schedules to state
        setInterviewSchedules(fetchedInterviewSchedules);

        // Create a mapping of personal details by empID
        const personalDetailsMap = fetchedPersonalDetails.reduce((acc, detail) => {
          acc[detail.empID] = detail;
          return acc;
        }, {});

        // Create a mapping of local mobilizations by empID
        const localMobilizationsMap = fetchedLocalMobilizations.reduce((acc, mobilization) => {
          acc[mobilization.empID] = mobilization;
          return acc;
        }, {});

        // Merge interview schedules with personal details and local mobilizations
        const merged = fetchedInterviewSchedules.map((schedule) => ({
          ...schedule,
          personalDetails: personalDetailsMap[schedule.empID] || {}, // Add personal details
          localMobilization: localMobilizationsMap[schedule.empID] || {}, // Add local mobilization info
        }));

        // Set the merged data to state
        setMergedInterviewData(merged);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return { mergedInterviewData, interviewSchedules, loading, error };
};
