import { generateClient } from "@aws-amplify/api";
import { createContext, useEffect, useState } from "react";
import {
  listBJLDetails,
  listEducationDetails,
  listEmpDepInsurances,
  listEmpInsurances,
  listEmpLeaveDetails,
  listEmployeeNonLocalAccos,
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listIDDetails,
  listLabourMedicalInfos,
  listLeaveStatuses,
  listPassportValids,
  listPersonalDetails,
  listDNDetails,
  listServiceRecords,
  listTerminationInfos,
  listUsers,
  listSawpDetails,
  listAddCourses,
  listInterviewSchedules,
  listInsClaims,
  listWorkMen,
  listTrainingCertificates,
  listTrainingReqs,
  listWeldingInfos,
  listBastingPaints,
  listHiringJobs,
  listTicketRequests,
  listProbForms,
  listEmailNotifis,
  listWPTrackings,
  listKeyValueStores,
  listContractForms,
  listLocalMobilizations,
  listTravelIns,
} from "../graphql/queries";

export const DataSupply = createContext();

const client = generateClient();

const DataStoredContext = ({ children }) => {
  const [dataState, setDataState] = useState({
    userData: [],
    empPIData: [],
    empLeaveStatusData: [],
    empPDData: [],
    IDData: [],
    workInfoData: [],
    terminateData: [],
    leaveDetailsData: [],
    SRData: [],
    educDetailsData: [],
    DNData: [],
    BJLData: [],
    PPValidsData: [],
    LMIData: [],
    EmpInsuranceData: [],
    depInsuranceData: [],
    NLAData: [],
    SawpDetails: [],
    IVSSDetails: [],
    AddCourseDetails: [],
    insuranceClaimsData: [],
    workMenDetails: [],
    trainingCertifi: [],
    AddEmpReq: [],
    WeldeInfo: [],
    BastingInfo: [],
    hiringData: [],
    ticketData: [],
    ProbFData: [],
    EmailNotifi: [],
    WPTrackings: [],
    dropDownVal: [],
    contractForms: [],
    localMobiliz: [],
    travelInsData:[]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queries = [
          { query: listUsers, key: "userData" },
          { query: listPersonalDetails, key: "empPDData" },
          { query: listEducationDetails, key: "educDetailsData" },
          { query: listLeaveStatuses, key: "empLeaveStatusData" },
          { query: listEmpPersonalInfos, key: "empPIData" },
          { query: listIDDetails, key: "IDData" },
          { query: listEmpWorkInfos, key: "workInfoData" },
          { query: listTerminationInfos, key: "terminateData" },
          { query: listEmpLeaveDetails, key: "leaveDetailsData" },
          { query: listServiceRecords, key: "SRData" },
          { query: listDNDetails, key: "DNData" },
          { query: listBJLDetails, key: "BJLData" },
          { query: listPassportValids, key: "PPValidsData" },
          { query: listLabourMedicalInfos, key: "LMIData" },
          { query: listEmpInsurances, key: "EmpInsuranceData" },
          { query: listEmpDepInsurances, key: "depInsuranceData" },
          { query: listSawpDetails, key: "SawpDetails" },
          { query: listInterviewSchedules, key: "IVSSDetails" },
          { query: listEmployeeNonLocalAccos, key: "NLAData" },
          { query: listAddCourses, key: "AddCourseDetails" },
          { query: listInsClaims, key: "insuranceClaimsData" },
          { query: listWorkMen, key: "workMenDetails" },
          { query: listTrainingCertificates, key: "trainingCertifi" },
          { query: listTrainingReqs, key: "AddEmpReq" },
          { query: listWeldingInfos, key: "WeldeInfo" },
          { query: listBastingPaints, key: "BastingInfo" },
          { query: listHiringJobs, key: "hiringData" },
          { query: listTicketRequests, key: "ticketData" },
          { query: listProbForms, key: "ProbFData" },
          { query: listEmailNotifis, key: "EmailNotifi" },
          { query: listWPTrackings, key: "WPTrackings" },
          { query: listKeyValueStores, key: "dropDownVal" },
          { query: listContractForms, key: "contractForms" },
          { query: listLocalMobilizations, key: "localMobiliz" },
          { query: listTravelIns, key: "travelInsData" },
        ];
        const responses = await Promise.all(
          queries.map(async ({ query, key }) => {
            let allItems = [];
            let nextToken = null;

            do {
              const response = await client
                .graphql({
                  query: query,
                  variables: { limit: 100, nextToken },
                })
                .catch((error) => {
                  // console.error(`GraphQL Error in ${key}:`, error);
                  return { data: { items: [] } }; // Return empty array if query fails
                });

              // Extract the fetched items
              const items =
                response?.data?.[Object.keys(response.data)[0]]?.items || [];
              allItems = [...allItems, ...items];

              // Update nextToken for next iteration
              nextToken =
                response?.data?.[Object.keys(response.data)[0]]?.nextToken;
            } while (nextToken); // Continue fetching until nextToken is null

            return { key, items: allItems };
          })
        );
        // console.log(responses);

        const newData = responses.reduce((acc, { key, items }) => {
          return { ...acc, [key]: items };
        }, {});

        setDataState((prevState) => ({ ...prevState, ...newData }));
        // const limit = 20000;
        // const responses = await Promise.all(
        //   queries.map(({ query }) =>
        //     client.graphql({ query, variables: { limit } }).catch((error) => {
        //       console.error("GraphQL Error:", error);
        //       return { data: { items: [] } }; // fallback for failed query
        //     })
        //   )
        // );

        // const newData = queries.reduce((acc, { key }, index) => {
        //   const items =
        //     responses[index]?.data?.[Object.keys(responses[index].data)[0]]
        //       ?.items || [];
        //   return { ...acc, [key]: items };
        // }, {});
        // // console.log(newData);

        // setDataState((prevState) => ({ ...prevState, ...newData }));
      } catch (error) {
        console.error("Data Fetch Error:", error);
      }
    };

    // const employeeDatas=async()=>{
    //   do {
    //     const response = await client.graphql({
    //       query: listEmpPersonalInfos,
    //       variables: {
    //         limit: 100, // Fetch in batches (max AppSync limit is usually 100)
    //         nextToken: nextToken,
    //       },
    //     });

    //     // Append fetched employees
    //     allEmployees = [...allEmployees, ...response.data.listEmpPersonalInfos.items];

    //     // Update nextToken for next iteration
    //     nextToken = response.data.listEmpPersonalInfos.nextToken;
    //   } while (nextToken); // Continue until nextToken is null

    //   console.log(allEmployees, "All Employees Data");
    //   return allEmployees;
    // }
    // employeeDatas()
    fetchData();
  }, []);
  // console.log(dataState);

  return (
    <DataSupply.Provider value={dataState}>{children}</DataSupply.Provider>
  );
};

export default DataStoredContext;
