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
      setError(null);

      let allInterviewSchedules = [];
      let allPersonalDetails = [];
      let allLocalMobilizations = [];

      let nextTokenInterviewSchedules = null;
      let nextTokenPersonalDetails = null;
      let nextTokenLocalMobilizations = null;

      // console.log("Fetching data..."); 

      try {
        do {
          const response = await client.graphql({
            query: listInterviewSchedules,
            variables: {
              nextToken: nextTokenInterviewSchedules,
            },
          });

          if (response.data && response.data.listInterviewSchedules) {

          } else {
            // console.log("No interview schedules found in response.");
          }

          allInterviewSchedules = [
            ...allInterviewSchedules,
            ...response.data.listInterviewSchedules.items,
          ];

          nextTokenInterviewSchedules = response.data.listInterviewSchedules.nextToken;
        } while (nextTokenInterviewSchedules);

        // Fetching personal details
        do {

          const response = await client.graphql({
            query: listPersonalDetails,
            variables: {
              nextToken: nextTokenPersonalDetails,
            },
          });

          if (response.data && response.data.listPersonalDetails) {
  
          } else {
            // console.log("No personal details found in response.");
          }

          allPersonalDetails = [
            ...allPersonalDetails,
            ...response.data.listPersonalDetails.items,
          ];

          nextTokenPersonalDetails = response.data.listPersonalDetails.nextToken;
        } while (nextTokenPersonalDetails);

        // Fetching local mobilizations
        do {

          const response = await client.graphql({
            query: listLocalMobilizations,
            variables: {
              nextToken: nextTokenLocalMobilizations,
            },
          });

          if (response.data && response.data.listLocalMobilizations) {

          } else {
            // console.log("No local mobilizations found in response.");
          }

          allLocalMobilizations = [
            ...allLocalMobilizations,
            ...response.data.listLocalMobilizations.items,
          ];

          nextTokenLocalMobilizations = response.data.listLocalMobilizations.nextToken;
        } while (nextTokenLocalMobilizations);

        setInterviewSchedules(allInterviewSchedules);

        const interviewDetailsMap = allInterviewSchedules.reduce(
          (acc, detail) => {
            acc[detail.tempID] = detail;
            return acc;
          },
          {}
        );

        const localMobilizationsMap = allLocalMobilizations.reduce(
          (acc, mobilization) => {
            acc[mobilization.tempID] = mobilization;
            return acc;
          },
          {}
        );

        const merged = allPersonalDetails.map((schedule) => ({
          ...schedule,
          interviewSchedules: interviewDetailsMap[schedule.tempID] || {},
          localMobilization: localMobilizationsMap[schedule.tempID] || {},
        }));

        setMergedInterviewData(merged);
      } catch (err) {
        setError("Error fetching data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { mergedInterviewData, interviewSchedules, loading, error };
};
