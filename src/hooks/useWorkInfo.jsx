import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { listEmpWorkInfos } from "../graphql/queries";

const client = generateClient();

export const useWorkInfo = () => {
  const [empWorkInfo, setEmpWorkInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let allEmpWorkInfos = [];
      let nextToken = null;

      try {
        do {
          const workInfoData = await client.graphql({
            query: listEmpWorkInfos,
            variables: {
              nextToken,
            },
          });

          const fetchedEmpWorkInfo = workInfoData?.data?.listEmpWorkInfos?.items || [];
          allEmpWorkInfos = [...allEmpWorkInfos, ...fetchedEmpWorkInfo];

          
          nextToken = workInfoData?.data?.listEmpWorkInfos?.nextToken;

        } while (nextToken);

        setEmpWorkInfo(allEmpWorkInfos);

      } catch (err) {
        setError(err);
        console.error("Error fetching work info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { empWorkInfo, loading, error };
};
