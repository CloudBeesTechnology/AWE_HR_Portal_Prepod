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
    insuranceClaimsData:[],
    workMenDetails:[],
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
        ];
        const limit = 10000;
        const responses = await Promise.all(
          queries.map(({ query }) =>
            client.graphql({ query, variables: { limit } }).catch((error) => {
              console.error("GraphQL Error:", error);
              return { data: { items: [] } }; // fallback for failed query
            })
          )
        );

        const newData = queries.reduce((acc, { key }, index) => {
          const items =
            responses[index]?.data?.[Object.keys(responses[index].data)[0]]
              ?.items || [];
          return { ...acc, [key]: items };
        }, {});

        setDataState((prevState) => ({ ...prevState, ...newData }));
      } catch (error) {
        console.error("Data Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataSupply.Provider value={dataState}>{children}</DataSupply.Provider>
  );
};

export default DataStoredContext;
