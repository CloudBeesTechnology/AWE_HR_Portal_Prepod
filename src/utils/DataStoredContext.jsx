// export default DataStoredContext;
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
} from "../graphql/queries";

export const DataSupply = createContext({
  userData: [],
  empPIData: [],
  empLeaveStatusData: [],
  empPDData: [],
  IDData: [],
  workInfoData:[],
  terminateData:[],
  leaveDetailsData:[],
        SRData:[],
  educDetailsData: [],
  DNData: [],
  BJLData: [],
  PPValidsData: [],
  LMIData: [],
  EmpInsuranceData: [],
  depInsuranceData: [],
  NLAData: [],
  SawpDetails:[],
});

const client = generateClient();

const DataStoredContext = ({ children }) => {
  // user
  const [userData, setUserData] = useState([]);
  // Recurmient
  const [empPDData, setEmpPDData] = useState([]);
  const [educDetailsData, setEducDetailsData] = useState([]);
  // EMployee Info
  const [empPIData, setEmpPIData] = useState([]);
  const [IDData, setIDData] = useState([]);
  // Leave Management
  const [empLeaveStatusData, setEmpLeaveStatusData] = useState([]);
  //Work Info
  const [workInfoData, setWorkInfoData] = useState([]);
  const [terminateData, setTerminateData] = useState([]);
  const [leaveDetailsData, setLeaveDetailsData] = useState([]);
  const [SRData, setSRData] = useState([]);
  //WorkPass
  const [DNData, setDNData] = useState([]);
  const [BJLData, setBJLData] = useState([]);
  const [PPValidsData, setPPValidsData] = useState([]);
  // Medical Depend
  const [LMIData, setLMIData] = useState([]);
  // Emp Insurance
  const [EmpInsuranceData, setEmpInsuranceData] = useState([]);
  const [depInsuranceData, setDepInsuranceData] = useState([]);
  // Emp Non-Local
  const [NLAData, setNLAData] = useState([]);
  const [SawpDetails, setSawpDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          // user Table
          client
            .graphql({ query: listUsers })
            .catch(() => ({ data: { listUsers: { items: [] } } })),
          // Recriument Table
          client
            .graphql({ query: listPersonalDetails })
            .catch(() => ({ data: { listPersonalDetails: { items: [] } } })),
          client
            .graphql({ query: listEducationDetails })
            .catch(() => ({ data: { listEducationDetails: { items: [] } } })),
          // Leave Management Table
          client
            .graphql({ query: listLeaveStatuses })
            .catch(() => ({ data: { listLeaveStatuses: { items: [] } } })),
          // EmployeeInfo Table
          client
            .graphql({ query: listEmpPersonalInfos })
            .catch(() => ({ data: { listEmpPersonalInfos: { items: [] } } })),
          client
            .graphql({ query: listIDDetails })
            .catch(() => ({ data: { listIDDetails: { items: [] } } })),
          //work info Table
          client
            .graphql({ query: listEmpWorkInfos })
            .catch(() => ({ data: { listEmpWorkInfos: { items: [] } } })),
          client
            .graphql({ query: listTerminationInfos })
            .catch(() => ({ data: { listTerminationInfos: { items: [] } } })),
          client
            .graphql({ query: listEmpLeaveDetails })
            .catch(() => ({ data: { listEmpLeaveDetails: { items: [] } } })),
          client
            .graphql({ query: listServiceRecords })
            .catch(() => ({ data: { listServiceRecords: { items: [] } } })),

          // WorkPass Table
          client
            .graphql({ query: listDNDetails })
            .catch(() => ({ data: { listDNDetails: { items: [] } } })),
          client
            .graphql({ query: listBJLDetails })
            .catch(() => ({ data: { listBJLDetails: { items: [] } } })),
          client
            .graphql({ query: listPassportValids })
            .catch(() => ({ data: { listPassportValids: { items: [] } } })),
          // Medical Depend table
          client
            .graphql({ query: listLabourMedicalInfos })
            .catch(() => ({ data: { listLabourMedicalInfos: { items: [] } } })),
          // Employee Insurance Table
          client
            .graphql({ query: listEmpInsurances })
            .catch(() => ({ data: { listEmpInsurances: { items: [] } } })),
          client
            .graphql({ query: listEmpDepInsurances })
            .catch(() => ({ data: { listEmpDepInsurances: { items: [] } } })),
            client
            .graphql({ query: listSawpDetails })
            .catch(() => ({ data: { listSawpDetails: { items: [] } } })),
          // Employee Non-local Table
          client.graphql({ query: listEmployeeNonLocalAccos }).catch(() => ({
            data: { listEmployeeNonLocalAccos: { items: [] } },
          })),
        ]);

        const [
          // user
          usersResponse,
          // recriument
          PDResponse,
          EDResponse,
          // leave management
          empLeaveResponse,
          // employee info
          empPIResponse,
          IDResponse,
          // WorkInfo
          workInfoResponse,
          TerminateResponse,
          LeaveDetailsResponse,
          SRResponse,
          // WorkPass
          DNResponse,
          BJLResponse,
          PPValidsResponse,
          // Medical Depend
          LMIResponse,
          // Emp Insurance
          EmpInsuranceResponse,
          DepInsuranceResponse,
          //SWAP
          SwapResponse,
          // Emp Non-Local
          NLAResponse,
         
        ] = responses;

        // user
        const userItems = usersResponse?.data?.listUsers?.items || [];
        setUserData(userItems);
        // console.log("User Data:", userItems);

        // Recriument
        const PDItems = PDResponse?.data?.listPersonalDetails?.items || [];
        setEmpPDData(PDItems);
        // console.log("Employee Personal Data:", PDItems);

        const EDItems = EDResponse?.data?.listEducationDetails?.items || [];
        setEducDetailsData(EDItems);
        // console.log("Education Details Data:", EDItems);

        // employeeInfo
        const empPIItems =
          empPIResponse?.data?.listEmpPersonalInfos?.items || [];
        setEmpPIData(empPIItems);
        // console.log("Employee Personal Info Data:", empPIItems);

        const IDItems = IDResponse?.data?.listIDDetails?.items || [];
        setIDData(IDItems);
        // console.log("ID Details Data:", IDItems);

        // LeaveManagement
        const empLeaveStatusItems =
          empLeaveResponse?.data?.listLeaveStatuses?.items || [];
        setEmpLeaveStatusData(empLeaveStatusItems);
        // console.log("Leave Status Data 2.0:", empLeaveStatusItems);
        //Work Info
        const WorkInfoItems =
          workInfoResponse?.data?.listEmpWorkInfos?.items || [];
        setWorkInfoData(WorkInfoItems);
        const TerminateItems =
          TerminateResponse?.data?.listTerminationInfos?.items || [];
        setTerminateData(TerminateItems);
        // console.log("Terminate Details Data 3.0:", TerminateItems);
        const LeaveDetailsItems =
          LeaveDetailsResponse?.data?.listEmpLeaveDetails?.items || [];
        setLeaveDetailsData(LeaveDetailsItems);
        // console.log("LeaveDetails Data:", LeaveDetailsItems);

        const SRItems = SRResponse?.data?.listServiceRecords?.items || [];
        setSRData(SRItems);
        // console.log("SRM Details Data:", SRItems);
        // Work Pass
        const DNItems = DNResponse?.data?.listDNDetails?.items || [];
        setDNData(DNItems);
        // console.log("SDN Details Data:", SDNItems);

        const BJLItems = BJLResponse?.data?.listBJLDetails?.items || [];
        setBJLData(BJLItems);
        // console.log("BJL Details Data:", BJLItems);

        const PPValidsItems =
          PPValidsResponse?.data?.listPassportValids?.items || [];
        setPPValidsData(PPValidsItems);
        // console.log("Passport Validations Data:", PPValidsItems);

        // medical depdend
        const LMIItems = LMIResponse?.data?.listLabourMedicalInfos?.items || [];
        setLMIData(LMIItems);
        // console.log("Labour Medical Infos Data:", LMIItems);

        // Employee Insurance Table
        const EmpInsuranceItems =
          EmpInsuranceResponse?.data?.listEmpInsurances?.items || [];
        setEmpInsuranceData(EmpInsuranceItems);
        // console.log("Employee Insurance Data:", EmpInsuranceItems);

        const DepInsuranceItems =
          DepInsuranceResponse?.data?.listEmpDepInsurances?.items || [];
        setDepInsuranceData(DepInsuranceItems);
        // console.log("Dependent Insurance Data:", DepInsuranceItems);

        const SwapItems =
        SwapResponse?.data?.listSawpDetails?.items || [];
      setSawpDetails(SwapItems);
      // console.log("Swap Details Data:", SwapItems);

        // Employee Non-local Table
        const NLAItems =
          NLAResponse?.data?.listEmployeeNonLocalAccos?.items || [];
        setNLAData(NLAItems);
        // console.log("Non-Local Accommodations Data:", NLAItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataSupply.Provider
      value={{
        userData,
        empLeaveStatusData,
        educDetailsData,
        empPDData,
        empPIData,
        IDData,
        workInfoData,
        terminateData,
        leaveDetailsData,
        SRData,
        DNData,
        BJLData,
        PPValidsData,
        LMIData,
        EmpInsuranceData,
        depInsuranceData,
        NLAData,
        SawpDetails
      }}
    >
      {children}
    </DataSupply.Provider>
  );
};

export default DataStoredContext;