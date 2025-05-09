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
  listGroupHandS,
  listTravelIns,
  listPersonalAccidents,
  listCandIToEMPS,
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
    groupHSData: [],
    travelInsData: [],
    personalAcciData: [],
    candyToEmp: [],
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
          { query: listGroupHandS, key: "groupHSData" },
          { query: listTravelIns, key: "travelInsData" }, 
          { query: listPersonalAccidents, key: "personalAcciData" },
          { query: listCandIToEMPS, key: "candyToEmp"}
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
