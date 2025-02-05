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
    const fetchAllData = async () => {
      setLoading(true);

      let nextTokenIS = null;
      let nextTokenPD = null;
      let nextTokenLM = null;

      let allIS = [];
      let allPD = [];
      let allLM = [];

      try {
        // Fetch all pages of interview schedules
        do {
          const response = await client.graphql({
            query: listInterviewSchedules,
            variables: { nextToken: nextTokenIS },
          });
          const fetchedData = response?.data?.listInterviewSchedules;
          allIS = [...allIS, ...(fetchedData?.items || [])];
          nextTokenIS = fetchedData?.nextToken;
        } while (nextTokenIS);

        // Fetch all pages of personal details
        do {
          const response = await client.graphql({
            query: listPersonalDetails,
            variables: { nextToken: nextTokenPD },
          });
          const fetchedData = response?.data?.listPersonalDetails;
          allPD = [...allPD, ...(fetchedData?.items || [])];
          nextTokenPD = fetchedData?.nextToken;
        } while (nextTokenPD);

        // Fetch all pages of local mobilizations
        do {
          const response = await client.graphql({
            query: listLocalMobilizations,
            variables: { nextToken: nextTokenLM },
          });
          const fetchedData = response?.data?.listLocalMobilizations;
          allLM = [...allLM, ...(fetchedData?.items || [])];
          nextTokenLM = fetchedData?.nextToken;
        } while (nextTokenLM);

        // Set interview schedules to state
        setInterviewSchedules(allIS);

        // Create a mapping of personal details by tempID
        const interviewDetailsMap = allIS.reduce((acc, detail) => {
          acc[detail.tempID] = detail;
          return acc;
        }, {});

        // Create a mapping of local mobilizations by tempID
        const localMobilizationsMap = allLM.reduce((acc, mobilization) => {
          acc[mobilization.tempID] = mobilization;
          return acc;
        }, {});

        // Merge interview schedules with personal details and local mobilizations
        const merged = allPD.map((schedule) => ({
          ...schedule,
          interviewSchedules: interviewDetailsMap[schedule.tempID] || {}, // Add interview details
          localMobilization: localMobilizationsMap[schedule.tempID] || {}, // Add local mobilization info
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

    fetchAllData();
  }, []); // Runs only once when the component mounts

  return { mergedInterviewData, interviewSchedules, loading, error };
};
