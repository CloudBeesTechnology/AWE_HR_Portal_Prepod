import { generateClient } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { listTimeSheets } from "../../../graphql/queries";

export const useGetTimeSheetData = () => {
  const client = generateClient();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const fetchAllData = async () => {
      let nextToken = null;
      let allData = [];

      // Fetch all data without filters
      do {
        const response = await client.graphql({
          query: listTimeSheets,
          variables: {
            limit: 1000,
            nextToken,
          },
        });

        const fetchedData = response?.data?.listTimeSheets?.items || [];
        nextToken = response?.data?.listTimeSheets?.nextToken;

        for (const item of fetchedData) {
          if (item) allData.push(item);
        }
      } while (nextToken);

      setAllData(allData);
    };
    fetchAllData();
  }, []);

  return { allData };
};
