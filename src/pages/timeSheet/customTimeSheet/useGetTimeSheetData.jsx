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

      // Calculate date from 30 days ago
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 32);
      const thirtyDaysAgoISO = thirtyDaysAgo.toISOString();

      // Fetch all data with filter
      do {
        const response = await client.graphql({
          query: listTimeSheets,
          variables: {
            limit: 1000,
            nextToken,
            filter: {
              createdAt: {
                ge: thirtyDaysAgoISO // greater than or equal to 30 days ago
              }
            }
          },
        });

        const fetchedData = response?.data?.listTimeSheets?.items || [];
        nextToken = response?.data?.listTimeSheets?.nextToken;

        for (const item of fetchedData) {
          if (item) allData.push(item);
        }
      } while (nextToken);
console.log("allData : ",allData.length);
      setAllData(allData);
    };
    
    fetchAllData();
  }, []);

  return { allData };
};