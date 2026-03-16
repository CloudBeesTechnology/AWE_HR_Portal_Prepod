// import { generateClient } from "@aws-amplify/api";
// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   listBastingPaints,
//   listContractForms,
//   listDNDetails,
//   listEmpInsurances,
//   listEmpLeaveDetails,
//   listEmpPersonalInfos,
//   listEmpWorkInfos,
//   listIDDetails,
//   listInterviewSchedules,
//   listKeyValueStores,
//   listLabourMedicalInfos,
//   listLocalMobilizations,
//   listPassportValids,
//   listProbForms,
//   listServiceRecords,
//   listTerminationInfos,
//   listTrainingCertificates,
//   listTrainingReqs,
//   listWeldingInfos,
//   listWPTrackings,
// } from "../../graphql/queries";

// const ReportsContext = createContext();
// const client = generateClient();

// export const ReportsProvider = ({ children }) => {
//   const [reportsData, setReportsData] = useState({
//     empPIData: [],
//     IDData: [],
//     workInfoData: [],
//     terminateData: [],
//     leaveDetailsData: [],
//     SRData: [],
//     DNData: [],
//     PPValidsData: [],
//     LMIData: [],
//     EmpInsuranceData: [],
//     IVSSDetails: [],
//     trainingCertifi: [],
//     AddEmpReq: [],
//     WeldeInfo: [],
//     BastingInfo: [],
//     ProbFData: [],
//     WPTrackings: [],
//     dropDownVal: [],
//     contractForms: [],
//     localMobiliz: [],
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const queries = [
//           { query: listEmpPersonalInfos, key: "empPIData" },
//           { query: listIDDetails, key: "IDData" },
//           { query: listEmpWorkInfos, key: "workInfoData" },
//           { query: listTerminationInfos, key: "terminateData" },
//           { query: listEmpLeaveDetails, key: "leaveDetailsData" },
//           { query: listServiceRecords, key: "SRData" },
//           { query: listDNDetails, key: "DNData" },
//           { query: listPassportValids, key: "PPValidsData" },
//           { query: listLabourMedicalInfos, key: "LMIData" },
//           { query: listEmpInsurances, key: "EmpInsuranceData" },
//           { query: listInterviewSchedules, key: "IVSSDetails" },
//           { query: listTrainingCertificates, key: "trainingCertifi" },
//           { query: listTrainingReqs, key: "AddEmpReq" },
//           { query: listWeldingInfos, key: "WeldeInfo" },
//           { query: listBastingPaints, key: "BastingInfo" },
//           { query: listProbForms, key: "ProbFData" },
//           { query: listWPTrackings, key: "WPTrackings" },
//           { query: listKeyValueStores, key: "dropDownVal" },
//           { query: listContractForms, key: "contractForms" },
//           { query: listLocalMobilizations, key: "localMobiliz" },
//         ];

//         const responses = await Promise.all(
//           queries?.map(async ({ query, key }) => {
//             let allItems = [];
//             let nextToken = null;

//             do {
//               const response = await client
//                 .graphql({
//                   query: query,
//                   variables: { limit: 100, nextToken },
//                 })
//                 .catch((error) => {
//                   return { data: { items: [] } };
//                 });

//               const items =
//                 response?.data?.[Object.keys(response.data)[0]]?.items || [];
//               allItems = [...allItems, ...items];

//               nextToken =
//                 response?.data?.[Object.keys(response.data)[0]]?.nextToken;
//             } while (nextToken);

//             return { key, items: allItems };
//           })
//         );

//         const newData = responses.reduce((acc, { key, items }) => {
//           return { ...acc, [key]: items };
//         }, {});

//         console.log("New Data:", newData);
//         setReportsData((prevState) => ({ ...prevState, ...newData }));
//       } catch (error) {
//         console.error("Data Fetch Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log("Reports Data:", reportsData);
//   return (
//     <ReportsContext.Provider value={{ ...reportsData, loading }}>
//       {children}
//     </ReportsContext.Provider>
//   );
// };

// // ✅ Custom hook
// export const useReportsData = () => useContext(ReportsContext);

import { generateClient } from "@aws-amplify/api";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import {
  listBastingPaints,
  listContractForms,
  listDNDetails,
  listEmpInsurances,
  listEmpLeaveDetails,
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listIDDetails,
  listInterviewSchedules,
  listKeyValueStores,
  listLabourMedicalInfos,
  listLocalMobilizations,
  listPassportValids,
  listProbForms,
  listServiceRecords,
  listTerminationInfos,
  listTrainingCertificates,
  listTrainingReqs,
  listWeldingInfos,
  listWPTrackings,
} from "../../graphql/queries";

const ReportsContext = createContext();
const client = generateClient();

// Cache to store fetched data
const dataCache = {
  data: null,
  timestamp: null,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes cache
};

export const ReportsProvider = ({ children }) => {
  const [reportsData, setReportsData] = useState({
    empPIData: [],
    IDData: [],
    workInfoData: [],
    terminateData: [],
    leaveDetailsData: [],
    SRData: [],
    DNData: [],
    PPValidsData: [],
    LMIData: [],
    EmpInsuranceData: [],
    IVSSDetails: [],
    trainingCertifi: [],
    AddEmpReq: [],
    WeldeInfo: [],
    BastingInfo: [],
    ProbFData: [],
    WPTrackings: [],
    dropDownVal: [],
    contractForms: [],
    localMobiliz: [],
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
        setReportsData(dataCache.data);
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
          { query: listTerminationInfos, key: "terminateData" },
          { query: listEmpLeaveDetails, key: "leaveDetailsData" },
          { query: listServiceRecords, key: "SRData" },
          { query: listDNDetails, key: "DNData" },
          { query: listPassportValids, key: "PPValidsData" },
          { query: listLabourMedicalInfos, key: "LMIData" },
          { query: listEmpInsurances, key: "EmpInsuranceData" },
          { query: listInterviewSchedules, key: "IVSSDetails" },
          { query: listTrainingCertificates, key: "trainingCertifi" },
          { query: listTrainingReqs, key: "AddEmpReq" },
          { query: listWeldingInfos, key: "WeldeInfo" },
          { query: listBastingPaints, key: "BastingInfo" },
          { query: listProbForms, key: "ProbFData" },
          { query: listWPTrackings, key: "WPTrackings" },
          { query: listKeyValueStores, key: "dropDownVal" },
          { query: listContractForms, key: "contractForms" },
          { query: listLocalMobilizations, key: "localMobiliz" },
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

        setReportsData((prevState) => ({ ...prevState, ...newData }));
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
    <ReportsContext.Provider value={{ ...reportsData, loading }}>
      {children}
    </ReportsContext.Provider>
  );
};

// ✅ Custom hook
export const useReportsData = () => useContext(ReportsContext);
