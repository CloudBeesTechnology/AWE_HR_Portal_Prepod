// import { useEffect, useState, useCallback } from "react";
// import { generateClient } from "@aws-amplify/api";
// import {
//   listLeaveStatuses,
//   listEmpPersonalInfos,
//   listEmpWorkInfos,
//   listEmpLeaveDetails,
//   listTicketRequests,
// } from "../graphql/queries";
// import {
//   deleteLeaveStatus,
//   updateLeaveStatus,
//   updateTicketRequest,
//   updateEmpLeaveDetails,
// } from "../graphql/mutations";

// const client = generateClient();

// export const useLeaveManage = () => {
//   const [data, setData] = useState({
//     mergedData: [],
//     ticketMerged: [],
//     personalDetails: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAllData = useCallback(async () => {
//     setLoading(true);

//     let allLeaveStatuses = [];
//     let allEmpPersonalInfos = [];
//     let allWorkInfo = [];
//     let allEmpLeaveDetails = [];
//     let allTicketRequests = [];

//     let nextTokenLeaveStatuses = null;
//     let nextTokenEmpPersonalInfos = null;
//     let nextTokenWorkInfo = null;
//     let nextTokenEmpLeaveDetails = null;
//     let nextTokenTicketRequests = null;

//     try {
//       do {
//         const response = await client.graphql({
//           query: listLeaveStatuses,
//           variables: { nextToken: nextTokenLeaveStatuses },
//         });

//         allLeaveStatuses = [
//           ...allLeaveStatuses,
//           ...response.data.listLeaveStatuses.items,
//         ];

//         // console.log("LeaveStatus", allLeaveStatuses);

//         nextTokenLeaveStatuses = response.data.listLeaveStatuses.nextToken;
//       } while (nextTokenLeaveStatuses);

//       do {
//         const response = await client.graphql({
//           query: listEmpPersonalInfos,
//           variables: { nextToken: nextTokenEmpPersonalInfos },
//         });

//         allEmpPersonalInfos = [
//           ...allEmpPersonalInfos,
//           ...response.data.listEmpPersonalInfos.items,
//         ];

//         // console.log("PersonalInfo", allEmpPersonalInfos);

//         nextTokenEmpPersonalInfos =
//           response.data.listEmpPersonalInfos.nextToken;
//       } while (nextTokenEmpPersonalInfos);

//       // Fetching work info
//       do {
//         const response = await client.graphql({
//           query: listEmpWorkInfos,
//           variables: { nextToken: nextTokenWorkInfo },
//         });

//         allWorkInfo = [...allWorkInfo, ...response.data.listEmpWorkInfos.items];

//         // console.log("WorkInfo", allWorkInfo);

//         nextTokenWorkInfo = response.data.listEmpWorkInfos.nextToken;
//       } while (nextTokenWorkInfo);

//       // Fetching employee leave details
//       do {
//         const response = await client.graphql({
//           query: listEmpLeaveDetails,
//           variables: { nextToken: nextTokenEmpLeaveDetails },
//         });

//         allEmpLeaveDetails = [
//           ...allEmpLeaveDetails,
//           ...response.data.listEmpLeaveDetails.items,
//         ];

//         nextTokenEmpLeaveDetails = response.data.listEmpLeaveDetails.nextToken;
//       } while (nextTokenEmpLeaveDetails);

//       // Fetching ticket requests
//       do {
//         const response = await client.graphql({
//           query: listTicketRequests,
//           variables: { nextToken: nextTokenTicketRequests },
//         });

//         allTicketRequests = [
//           ...allTicketRequests,
//           ...response.data.listTicketRequests.items,
//         ];

//         // console.log("TicketRequest", allTicketRequests);

//         nextTokenTicketRequests = response.data.listTicketRequests.nextToken;
//       } while (nextTokenTicketRequests);

//       // Create lookup maps
//       const empInfoMap = allEmpPersonalInfos.reduce((acc, item) => {
//         acc[item.empID] = item;
//         return acc;
//       }, {});

//       const workInfoMap = allWorkInfo.reduce((acc, item) => {
//         acc[item.empID] = item;
//         return acc;
//       }, {});

//       const leaveDetailsMap = allEmpLeaveDetails.reduce((acc, item) => {
//         acc[item.empID] = item;
//         return acc;
//       }, {});
//       // Merge leave status data
//       const mergedLeaveData = allLeaveStatuses.map((leaveStatus) => {
//         const empInfo = empInfoMap[leaveStatus.empID] || {};
//         const workInfo = workInfoMap[leaveStatus.empID] || {};

//         const leaveDetails = leaveDetailsMap[leaveStatus.empID] || {};

// return {
//   ...leaveStatus,
//   ...leaveDetails,
//   // ...workInfo,
//   id: leaveStatus.id,
//   empID: leaveStatus.empID,
//   empName: empInfo.name,
//   empBadgeNo: empInfo.empBadgeNo,
//   gender: empInfo.gender,
//   empOfficialEmail: empInfo.officialEmail,
//   doj: workInfo.doj,
//   leaveStatusCreatedAt: leaveStatus.createdAt,
//   leaveStatusReceivedDate: leaveStatus.receivedDate,
//   leaveDays: leaveStatus.days,
//   // leaveType: leaveStatus.leaveType,
//   supervisorName: leaveStatus.supervisorName,
//   supervisorEmpID: leaveStatus.supervisorEmpID,
//   supervisorStatus: leaveStatus.supervisorStatus,
//   supervisorDate: leaveStatus.supervisorDate,
//   supervisorRemarks: leaveStatus.supervisorRemarks,
//   managerName: leaveStatus.managerName,
//   managerEmpID: leaveStatus.managerEmpID,
//   managerStatus: leaveStatus.managerStatus,
//   managerDate: leaveStatus.managerDate,
//   managerRemarks: leaveStatus.managerRemarks,
//   empStatus: leaveStatus.empStatus,
//   reason: leaveStatus.reason,
//   medicalCertificate: leaveStatus.medicalCertificate,
//   empLeaveType: leaveStatus.leaveType,
//   position: workInfo.position || "",
//   department: workInfo.department || "",
//   workHrs: workInfo?.workHrs || [],
//   workMonth: workInfo?.workMonth || [],
//   workWeek: workInfo?.workWeek || [],

//   empLeaveStartDate: leaveStatus?.fromDate,
//   empLeaveEndDate: leaveStatus?.toDate,

//   empLeaveSelectedFrom: leaveStatus?.selectedFrom,
//   empLeaveSelectedTo: leaveStatus?.selectedTo,

//   empLeaveUpdatedAt: leaveStatus.updatedAt,
//   compassionateLeave: leaveDetails.compasLeave || 0,
//   annualLeave: leaveDetails.annualLeave || 0,
//   sickLeave: leaveDetails.sickLeave || 0,
//   maternityLeave: leaveDetails.materLeave || 0,
//   paternityLeave: leaveDetails.paterLeave || 0,
//   hospitalLeave: leaveDetails.hospLeave || 0,
//   marriageLeave: leaveDetails.mrageLeave || 0,
//   empPervAnnualLeaveBal: leaveDetails.pervAnnualLeaveBal || 0,
//   leaveDetailsCreatedAt: leaveDetails.createdAt,
//   leaveDetailsUpdatedAt: leaveDetails.updatedAt,
//   empsickLeaveTaken: leaveDetails.sickLeaveTaken,

//   empSickLeaveDate: leaveDetails.sickLeaveDate,

//   empAnnualLeaveDate: leaveDetails?.annualLeaveDate,
// };
//       });

//       // Merge ticket request data
//       const mergedTicketData = allTicketRequests.map((ticket) => {
//         const empInfo = empInfoMap[ticket.empID] || {};
//         const workInfo = workInfoMap[ticket.empID] || {};

// return {
//   id: ticket.id,
//   empID: ticket.empID,
//   empName: empInfo.name,
//   position: workInfo.position || "",
//   department: workInfo.department || "",
//   doj: workInfo.doj,
//   empBadgeNo: empInfo.empBadgeNo,
//   empOfficialEmail: empInfo.officialEmail,
//   departureDate: ticket.departureDate,
//   empDepartureDate: ticket.from,
//   arrivalDate: ticket.arrivalDate,
//   empArrivalDate: ticket.to,
//   destination: ticket.destination,
//   empStatus: ticket.empStatus,
//   empDate: ticket.empDate,
//   empRemarks: ticket.empRemarks,
//   hrStatus: ticket.hrStatus,
//   hrDate: ticket.hrDate,
//   hrRemarks: ticket.hrRemarks,
//   hrName: ticket.hrName,
//   hrEmpID: ticket.hrEmpID,
//   gmStatus: ticket.gmStatus,
//   gmDate: ticket.gmDate,
//   gmRemarks: ticket.gmRemarks,
//   gmEmpID: ticket.gmEmpID,
//   managerEmpID: workInfo.manager || "",
//   createdAt: ticket.createdAt,
// };
//       });

//       setData({
//         mergedData: mergedLeaveData,
//         ticketMerged: mergedTicketData,
//         personalDetails: allEmpPersonalInfos,
//       });

//       // console.log(data);
//     } catch (err) {
//       setError(err);
//       console.error("Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllData();
//   }, [fetchAllData]);

// const handleDeleteLeaveStatus = async (id) => {
//   setLoading(true);
//   try {
//     await client.graphql({
//       query: deleteLeaveStatus,
//       variables: {
//         input: { id },
//       },
//     });
//     setData((prevData) => ({
//       ...prevData,
//       mergedData: prevData.mergedData.filter((status) => status.id !== id),
//     }));
//   } catch (err) {
//     setError(err);
//     console.error("Error deleting leave status:", err);
//   } finally {
//     setLoading(false);
//   }
// };

// const handleUpdateLeaveStatus = async (id, updatedData) => {
//   setLoading(true);
//   try {
//     // console.log(updatedData);

//     const result = await client
//       .graphql({
//         query: updateLeaveStatus,
//         variables: {
//           input: { id, ...updatedData },
//         },
//       })
//       .then((res) => {
//         // console.log(result.data.updateLeaveStatus.items);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     const updatedLeaveStatus = result?.data?.updateLeaveStatus;

//     // Update the local state to reflect the changes
//     setData((prevData) => ({
//       ...prevData,
//       mergedData: prevData.mergedData.map((status) =>
//         status.id === id ? updatedLeaveStatus : status
//       ),
//     }));
//   } catch (err) {
//     setError(err);
//     console.error("Error updating leave status:", err);
//   } finally {
//     setLoading(false);
//   }
// };

// const handleUpdateEmpLeaveDetails = async (empID, updatedData) => {
//   setLoading(true);
//   try {
//     const result = await client.graphql({
//       query: updateEmpLeaveDetails,
//       variables: {
//         input: { empID, ...updatedData },
//       },
//     });

//     const updatedEmpLeaveDetails = result.data.updateEmpLeaveDetails;

//     setData((prevData) => ({
//       ...prevData,
//       mergedData: prevData.mergedData.map((leaveDetails) =>
//         leaveDetails.empID === empID ? updatedEmpLeaveDetails : leaveDetails
//       ),
//     }));
//   } catch (err) {
//     setError(err);
//     console.error("Error updating employee leave details:", err);
//   } finally {
//     setLoading(false);
//   }
// };

// const handleUpdateTicketRequest = async (id, updatedData) => {
//   setLoading(true);
//   try {
//     const result = await client.graphql({
//       query: updateTicketRequest,
//       variables: {
//         input: { id, ...updatedData },
//       },
//     });

//     const updatedTicketRequest = result.data.updateTicketRequest;

//     // Update the local state to reflect the changes
//     setData((prevData) => ({
//       ...prevData,
//       mergedData: prevData.mergedData.map((request) =>
//         request.id === id ? updatedTicketRequest : request
//       ),
//     }));
//   } catch (err) {
//     setError(err);
//     console.error("Error updating ticket request:", err);
//   } finally {
//     setLoading(false);
//   }
// };

//   return {
//     ...data,
//     loading,
//     error,
//     handleDeleteLeaveStatus,
//     handleUpdateLeaveStatus,
//     handleUpdateTicketRequest,
//     handleUpdateEmpLeaveDetails,
//     refreshData: fetchAllData,
//   };
// };

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// import { useCallback, useContext, useEffect, useState } from "react";
// import { DataSupply } from "../utils/DataStoredContext";
// import {
//   deleteLeaveStatus,
//   updateEmpLeaveDetails,
//   updateLeaveStatus,
//   updateTicketRequest,
// } from "../graphql/mutations";
// import { generateClient } from "@aws-amplify/api";
// const client = generateClient();
// export const useLeaveManage = () => {
//   const {
//     empLeaveStatusData,
//     empPIData,
//     workInfoData,
//     leaveDetailsData,
//     ticketData,
//     setFetchTableData,
//     loading: isLoadingData,
//   } = useContext(DataSupply);

//   const [data, setData] = useState({
//     mergedData: [],
//     ticketMerged: [],
//     personalDetails: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Trigger data fetching for required tables
//   useEffect(() => {
//     setFetchTableData([
//       "empLeaveStatusData",
//       "empPIData",
//       "workInfoData",
//       "leaveDetailsData",
//       "ticketData",
//     ]);
//   }, []);

//   // Process and merge data when it changes
//   useEffect(() => {
//     if (!loading) {
//       try {
//         setLoading(loading);
//         // Create lookup maps for efficient data joining
//         const empInfoMap = empPIData.reduce((acc, item) => {
//           acc[item.empID] = item;
//           return acc;
//         }, {});

//         const workInfoMap = workInfoData.reduce((acc, item) => {
//           acc[item.empID] = item;
//           return acc;
//         }, {});

//         const leaveDetailsMap =
//           Array.isArray(leaveDetailsData) && leaveDetailsData?.length > 0
//             ? leaveDetailsData.reduce((acc, item) => {
//                 acc[item.empID] = item;
//                 return acc;
//               }, {})
//             : [];

//         // Merge leave status data
//         const mergedLeaveData = empLeaveStatusData.map((leaveStatus) => {
//           const empInfo = empInfoMap[leaveStatus.empID] || {};
//           const workInfo = workInfoMap[leaveStatus.empID] || {};
//           const leaveDetails = leaveDetailsMap[leaveStatus.empID] || {};

//           return {
//             ...leaveStatus,
//             ...leaveDetails,
//             id: leaveStatus.id,
//             empID: leaveStatus.empID,
//             empName: empInfo.name,
//             empBadgeNo: empInfo.empBadgeNo,
//             gender: empInfo.gender,
//             empOfficialEmail: empInfo.officialEmail,
//             doj: workInfo.doj,
//             leaveStatusCreatedAt: leaveStatus.createdAt,
//             leaveStatusReceivedDate: leaveStatus.receivedDate,
//             leaveDays: leaveStatus.days,
//             supervisorName: leaveStatus.supervisorName,
//             supervisorEmpID: leaveStatus.supervisorEmpID,
//             supervisorStatus: leaveStatus.supervisorStatus,
//             supervisorDate: leaveStatus.supervisorDate,
//             supervisorRemarks: leaveStatus.supervisorRemarks,
//             managerName: leaveStatus.managerName,
//             managerEmpID: leaveStatus.managerEmpID,
//             managerStatus: leaveStatus.managerStatus,
//             managerDate: leaveStatus.managerDate,
//             managerRemarks: leaveStatus.managerRemarks,
//             empStatus: leaveStatus.empStatus,
//             reason: leaveStatus.reason,
//             medicalCertificate: leaveStatus.medicalCertificate,
//             empLeaveType: leaveStatus.leaveType,
//             position: workInfo.position || "",
//             department: workInfo.department || "",
//             workHrs: workInfo?.workHrs || [],
//             workMonth: workInfo?.workMonth || [],
//             workWeek: workInfo?.workWeek || [],
//             empLeaveStartDate: leaveStatus?.fromDate,
//             empLeaveEndDate: leaveStatus?.toDate,
//             empLeaveSelectedFrom: leaveStatus?.selectedFrom,
//             empLeaveSelectedTo: leaveStatus?.selectedTo,
//             empLeaveUpdatedAt: leaveStatus.updatedAt,
//             compassionateLeave: leaveDetails.compasLeave || 0,
//             annualLeave: leaveDetails.annualLeave || 0,
//             sickLeave: leaveDetails.sickLeave || 0,
//             maternityLeave: leaveDetails.materLeave || 0,
//             paternityLeave: leaveDetails.paterLeave || 0,
//             hospitalLeave: leaveDetails.hospLeave || 0,
//             marriageLeave: leaveDetails.mrageLeave || 0,
//             empPervAnnualLeaveBal: leaveDetails.pervAnnualLeaveBal || 0,
//             leaveDetailsCreatedAt: leaveDetails.createdAt,
//             leaveDetailsUpdatedAt: leaveDetails.updatedAt,
//             empsickLeaveTaken: leaveDetails.sickLeaveTaken,
//             empSickLeaveDate: leaveDetails.sickLeaveDate,
//             empAnnualLeaveDate: leaveDetails?.annualLeaveDate,
//           };
//         });

//         // Merge ticket request data
//         const mergedTicketData = ticketData.map((ticket) => {
//           const empInfo = empInfoMap[ticket.empID] || {};
//           const workInfo = workInfoMap[ticket.empID] || {};

//           return {
//             id: ticket.id,
//             empID: ticket.empID,
//             empName: empInfo.name,
//             position: workInfo.position || "",
//             department: workInfo.department || "",
//             doj: workInfo.doj,
//             empBadgeNo: empInfo.empBadgeNo,
//             empOfficialEmail: empInfo.officialEmail,
//             departureDate: ticket.departureDate,
//             empDepartureDate: ticket.from,
//             arrivalDate: ticket.arrivalDate,
//             empArrivalDate: ticket.to,
//             destination: ticket.destination,
//             empStatus: ticket.empStatus,
//             empDate: ticket.empDate,
//             empRemarks: ticket.empRemarks,
//             hrStatus: ticket.hrStatus,
//             hrDate: ticket.hrDate,
//             hrRemarks: ticket.hrRemarks,
//             hrName: ticket.hrName,
//             hrEmpID: ticket.hrEmpID,
//             gmStatus: ticket.gmStatus,
//             gmDate: ticket.gmDate,
//             gmRemarks: ticket.gmRemarks,
//             gmEmpID: ticket.gmEmpID,
//             managerEmpID: workInfo.manager || "",
//             createdAt: ticket.createdAt,
//           };
//         });

//         setData({
//           mergedData: mergedLeaveData,
//           ticketMerged: mergedTicketData,
//           personalDetails: empPIData,
//         });
//       } catch (err) {
//         setError(err);
//         console.error("Error processing data:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//   }, [
//     empLeaveStatusData,
//     empPIData,
//     workInfoData,
//     leaveDetailsData,
//     ticketData,
//     isLoadingData,
//   ]);

//   // Refresh data by re-triggering fetch
//   const refreshData = useCallback(() => {
//     setFetchTableData([
//       "empLeaveStatusData",
//       "empPIData",
//       "workInfoData",
//       "leaveDetailsData",
//       "ticketData",
//     ]);
//   }, []);

//   // These functions would need to be updated to use DataStore mutations
//   // For now, keeping the original interface but marking as deprecated
//   const handleDeleteLeaveStatus = async (id) => {
//     setLoading(true);
//     try {
//       await client.graphql({
//         query: deleteLeaveStatus,
//         variables: {
//           input: { id },
//         },
//       });
//       setData((prevData) => ({
//         ...prevData,
//         mergedData: prevData.mergedData.filter((status) => status.id !== id),
//       }));
//     } catch (err) {
//       setError(err);
//       console.error("Error deleting leave status:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateLeaveStatus = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       // console.log(updatedData);

//       const result = await client
//         .graphql({
//           query: updateLeaveStatus,
//           variables: {
//             input: { id, ...updatedData },
//           },
//         })
//         .then((res) => {
//           // console.log(result.data.updateLeaveStatus.items);
//         })
//         .catch((err) => {
//           console.log(err);
//         });

//       const updatedLeaveStatus = result?.data?.updateLeaveStatus;

//       // Update the local state to reflect the changes
//       setData((prevData) => ({
//         ...prevData,
//         mergedData: prevData.mergedData.map((status) =>
//           status.id === id ? updatedLeaveStatus : status
//         ),
//       }));
//     } catch (err) {
//       setError(err);
//       console.error("Error updating leave status:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateEmpLeaveDetails = async (empID, updatedData) => {
//     setLoading(true);
//     try {
//       const result = await client.graphql({
//         query: updateEmpLeaveDetails,
//         variables: {
//           input: { empID, ...updatedData },
//         },
//       });

//       const updatedEmpLeaveDetails = result.data.updateEmpLeaveDetails;

//       setData((prevData) => ({
//         ...prevData,
//         mergedData: prevData.mergedData.map((leaveDetails) =>
//           leaveDetails.empID === empID ? updatedEmpLeaveDetails : leaveDetails
//         ),
//       }));
//     } catch (err) {
//       setError(err);
//       console.error("Error updating employee leave details:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateTicketRequest = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       const result = await client.graphql({
//         query: updateTicketRequest,
//         variables: {
//           input: { id, ...updatedData },
//         },
//       });

//       const updatedTicketRequest = result.data.updateTicketRequest;

//       // Update the local state to reflect the changes
//       setData((prevData) => ({
//         ...prevData,
//         mergedData: prevData.mergedData.map((request) =>
//           request.id === id ? updatedTicketRequest : request
//         ),
//       }));
//     } catch (err) {
//       setError(err);
//       console.error("Error updating ticket request:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     ...data,
//     loading,
//     error,
//     handleDeleteLeaveStatus,
//     handleUpdateLeaveStatus,
//     handleUpdateTicketRequest,
//     handleUpdateEmpLeaveDetails,
//     refreshData,
//   };
// };

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import { useEffect, useState, useCallback } from "react";
import { generateClient } from "@aws-amplify/api";

import {
  deleteLeaveStatus,
  updateLeaveStatus,
  updateTicketRequest,
  updateEmpLeaveDetails,
} from "../graphql/mutations";

const client = generateClient();

export const useLeaveManage = ({ storedData, isLoading }) => {
  const [data, setData] = useState({
    empInfoUnmatchedData: [],
    mergedDataForProData: [],
    mergedData: [],
    ticketMerged: [],
    personalDetails: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    empPIData: allEmpPersonalInfos,
    workInfoData: allWorkInfo,
    empLeaveStatusData: allLeaveStatuses,
    leaveDetailsData: allEmpLeaveDetails,
    ticketData: allTicketRequests,
  } = storedData;

  const fetchAllData = useCallback(async () => {
    setLoading(isLoading);
    setError(null);

    try {
      const empInfoMap = new Map(allEmpPersonalInfos.map((e) => [e.empID, e]));

      const workInfoMap = new Map(allWorkInfo.map((w) => [w.empID, w]));

      const leaveDetailsMap = new Map(
        allEmpLeaveDetails.map((l) => [l.empID, l])
      );

      const mergedLeaveData = allLeaveStatuses.map((leaveStatus) => {
        const empInfo = empInfoMap.get(leaveStatus.empID) || {};
        const workInfo = workInfoMap.get(leaveStatus.empID) || {};
        const leaveDetails = leaveDetailsMap.get(leaveStatus.empID) || {};

        return {
          ...leaveStatus,
          ...leaveDetails,
          // ...workInfo,
          id: leaveStatus.id,
          empID: leaveStatus.empID,
          empName: empInfo.name,
          empBadgeNo: empInfo.empBadgeNo,
          gender: empInfo.gender,
          empOfficialEmail: empInfo.officialEmail,
          doj: workInfo.doj,
          leaveStatusCreatedAt: leaveStatus.createdAt,
          leaveStatusReceivedDate: leaveStatus.receivedDate,
          leaveDays: leaveStatus.days,
          // leaveType: leaveStatus.leaveType,
          supervisorName: leaveStatus.supervisorName,
          supervisorEmpID: leaveStatus.supervisorEmpID,
          supervisorStatus: leaveStatus.supervisorStatus,
          supervisorDate: leaveStatus.supervisorDate,
          supervisorRemarks: leaveStatus.supervisorRemarks,
          managerName: leaveStatus.managerName,
          managerEmpID: leaveStatus.managerEmpID,
          managerStatus: leaveStatus.managerStatus,
          managerDate: leaveStatus.managerDate,
          managerRemarks: leaveStatus.managerRemarks,
          empStatus: leaveStatus.empStatus,
          reason: leaveStatus.reason,
          medicalCertificate: leaveStatus.medicalCertificate,
          empLeaveType: leaveStatus.leaveType,
          position: workInfo.position || "",
          department: workInfo.department || "",
          workHrs: workInfo?.workHrs || [],
          workMonth: workInfo?.workMonth || [],
          workWeek: workInfo?.workWeek || [],

          empLeaveStartDate: leaveStatus?.fromDate,
          empLeaveEndDate: leaveStatus?.toDate,

          empLeaveSelectedFrom: leaveStatus?.selectedFrom,
          empLeaveSelectedTo: leaveStatus?.selectedTo,

          empLeaveUpdatedAt: leaveStatus.updatedAt,
          compassionateLeave: leaveDetails.compasLeave || 0,
          annualLeave: leaveDetails.annualLeave || 0,
          sickLeave: leaveDetails.sickLeave || 0,
          maternityLeave: leaveDetails.materLeave || 0,
          paternityLeave: leaveDetails.paterLeave || 0,
          hospitalLeave: leaveDetails.hospLeave || 0,
          marriageLeave: leaveDetails.mrageLeave || 0,
          empPervAnnualLeaveBal: leaveDetails.pervAnnualLeaveBal || 0,
          leaveDetailsCreatedAt: leaveDetails.createdAt,
          leaveDetailsUpdatedAt: leaveDetails.updatedAt,
          empsickLeaveTaken: leaveDetails.sickLeaveTaken,

          empSickLeaveDate: leaveDetails.sickLeaveDate,

          empAnnualLeaveDate: leaveDetails?.annualLeaveDate,
        };
      });

      /**
       * ✅ MERGE TICKET DATA
       */
      const mergedTicketData = allTicketRequests.map((ticket) => {
        const empInfo = empInfoMap.get(ticket.empID) || {};
        const workInfo = workInfoMap.get(ticket.empID) || {};

        return {
          id: ticket.id,
          empID: ticket.empID,
          empName: empInfo.name,
          position: workInfo.position || "",
          department: workInfo.department || "",
          doj: workInfo.doj,
          empBadgeNo: empInfo.empBadgeNo,
          empOfficialEmail: empInfo.officialEmail,
          departureDate: ticket.departureDate,
          empDepartureDate: ticket.from,
          arrivalDate: ticket.arrivalDate,
          empArrivalDate: ticket.to,
          destination: ticket.destination,
          empStatus: ticket.empStatus,
          empDate: ticket.empDate,
          empRemarks: ticket.empRemarks,
          hrStatus: ticket.hrStatus,
          hrDate: ticket.hrDate,
          hrRemarks: ticket.hrRemarks,
          hrName: ticket.hrName,
          hrEmpID: ticket.hrEmpID,
          gmStatus: ticket.gmStatus,
          gmDate: ticket.gmDate,
          gmRemarks: ticket.gmRemarks,
          gmEmpID: ticket.gmEmpID,
          managerEmpID: workInfo.manager || "",
          createdAt: ticket.createdAt,
        };
      });

      setData({
        empInfoUnmatchedData: empInfoUnmatchedData,
        mergedDataForProData: mergedLeaveData,
        mergedData: mergedLeaveDataList,
        ticketMerged: mergedTicketData,
        personalDetails: allEmpPersonalInfos,
      });
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setTimeout(() => {
        setLoading(isLoading);
      }, 2000);
    }
  }, [storedData]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  /**
   * ================= MUTATIONS =================
   */

  const handleDeleteLeaveStatus = async (id) => {
    setLoading(true);
    try {
      await client.graphql({
        query: deleteLeaveStatus,
        variables: { input: { id } },
      });

      setData((prev) => ({
        ...prev,
        mergedData: prev.mergedData.filter((item) => item.id !== id),
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLeaveStatus = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await client.graphql({
        query: updateLeaveStatus,
        variables: { input: { id, ...updatedData } },
      });

      const updated = res.data.updateLeaveStatus;

      setData((prev) => ({
        ...prev,
        mergedData: prev.mergedData.map((item) =>
          item.id === id ? { ...item, ...updated } : item
        ),
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmpLeaveDetails = async (empID, updatedData) => {
    setLoading(true);
    try {
      const res = await client.graphql({
        query: updateEmpLeaveDetails,
        variables: { input: { empID, ...updatedData } },
      });

      const updated = res.data.updateEmpLeaveDetails;

      setData((prev) => ({
        ...prev,
        mergedData: prev.mergedData.map((item) =>
          item.empID === empID ? { ...item, ...updated } : item
        ),
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTicketRequest = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await client.graphql({
        query: updateTicketRequest,
        variables: { input: { id, ...updatedData } },
      });

      const updated = res.data.updateTicketRequest;

      setData((prev) => ({
        ...prev,
        ticketMerged: prev.ticketMerged.map((item) =>
          item.id === id ? { ...item, ...updated } : item
        ),
      }));
    } finally {
      setLoading(false);
    }
  };

  return {
    ...data,
    loading,
    error,
    refreshData: fetchAllData,
    handleDeleteLeaveStatus,
    handleUpdateLeaveStatus,
    handleUpdateEmpLeaveDetails,
    handleUpdateTicketRequest,
  };
};
