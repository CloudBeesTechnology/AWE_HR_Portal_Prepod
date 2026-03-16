import { generateClient } from "@aws-amplify/api";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  listAddCourses,
  listBastingPaints,
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listIDDetails,
  listTrainingCertificates,
  listTrainingReqs,
  listWeldingInfos,
} from "../../graphql/queries";

const TrainingContext = createContext();
const client = generateClient();

// Cache to store fetched data
const dataCache = {
  data: null,
  timestamp: null,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes cache
};

export const TrainingProvider = ({ children }) => {
  const [trainingData, setTrainingData] = useState({
    empPIData: [],
    IDData: [],
    workInfoData: [],
    AddCourseDetails: [],
    trainingCertifi: [],
    AddEmpReq: [],
    WeldeInfo: [],
    BastingInfo: [],
  });
  const [loading, setLoading] = useState(true);
  const isFetching = useRef(false); // Prevent concurrent fetches

  useEffect(() => {
    const fetchData = async () => {
      // Check if we have valid cached data
      const now = Date.now();
      if (
        dataCache.data &&
        dataCache.timestamp &&
        now - dataCache.timestamp < dataCache.CACHE_DURATION
      ) {
        // Use cached data
        setTrainingData(dataCache.data);
        setLoading(false);
        return;
      }

      // Prevent multiple simultaneous fetches
      if (isFetching.current) {
        // Wait for the ongoing fetch to complete
        return;
      }

      isFetching.current = true;
      setLoading(true);

      try {
        const queries = [
          { query: listEmpPersonalInfos, key: "empPIData" },
          { query: listIDDetails, key: "IDData" },
          { query: listEmpWorkInfos, key: "workInfoData" },
          { query: listAddCourses, key: "AddCourseDetails" },
          { query: listTrainingCertificates, key: "trainingCertifi" },
          { query: listTrainingReqs, key: "AddEmpReq" },
          { query: listWeldingInfos, key: "WeldeInfo" },
          { query: listBastingPaints, key: "BastingInfo" },
        ];

        const responses = await Promise.all(
          queries?.map(async ({ query, key }) => {
            let allItems = [];
            let nextToken = null;

            do {
              const response = await client
                .graphql({
                  query: query,
                  variables: { limit: 100, nextToken },
                })
                .catch((error) => {
                  return { data: { items: [] } };
                });

              const items =
                response?.data?.[Object.keys(response.data)[0]]?.items || [];
              allItems = [...allItems, ...items];

              nextToken =
                response?.data?.[Object.keys(response.data)[0]]?.nextToken;
            } while (nextToken);

            return { key, items: allItems };
          })
        );

        const newData = responses.reduce((acc, { key, items }) => {
          return { ...acc, [key]: items };
        }, {});

        // Cache the data
        dataCache.data = newData;
        dataCache.timestamp = now;

        setTrainingData((prevState) => ({ ...prevState, ...newData }));
      } catch (error) {
        console.error("Data Fetch Error:", error);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    };

    fetchData();

    // Cleanup function to reset fetching state if component unmounts during fetch
    return () => {
      isFetching.current = false;
    };
  }, []);

  return (
    <TrainingContext.Provider value={{ ...trainingData, loading }}>
      {children}
    </TrainingContext.Provider>
  );
};

// ✅ Custom hook
export const useTrainingData = () => useContext(TrainingContext);
