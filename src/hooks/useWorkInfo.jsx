import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { listEmpWorkInfos } from "../graphql/queries"; // Assuming you have the query for listEmailNotifis

const client = generateClient();

export const useWorkInfo = () => {
  const [empWorkInfo, setEmpWorkInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const workInfoData = await client.graphql({
          query: listEmpWorkInfos, // Query to fetch email notifications
        });

        const fetchedEmpWorkInfo =
        workInfoData?.data?.listEmpWorkInfos?.items || [];

        // console.log("Fetched Email Notifications:", fetchedEmpWorkInfo);
        setEmpWorkInfo(fetchedEmpWorkInfo);
      } catch (err) {
        setError(err);
        console.error("Error fetching workinfo:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log("workInfo data",empWorkInfo)

  return { empWorkInfo, loading, error };
};
