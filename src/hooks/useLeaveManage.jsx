import { useEffect, useState, useCallback } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  listLeaveStatuses,
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listEmpLeaveDetails,
  listTicketRequests,
} from "../graphql/queries";
import {
  deleteLeaveStatus,
  updateLeaveStatus,
  updateTicketRequest,
  updateEmpLeaveDetails,
} from "../graphql/mutations";

const client = generateClient();

export const useLeaveManage = () => {
  const [data, setData] = useState({
    mergedData: [],
    ticketMerged: [],
    personalDetails: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {

      const limit = 3000;

      const [
        leaveStatusesData,
        empPersonalInfosData,
        workInfoData,
        empLeaveData,
        ticketRequestsData,
      ] = await Promise.all([
        client.graphql({ query: listLeaveStatuses, variables: { limit } }),
        client.graphql({ query: listEmpPersonalInfos, variables: { limit } }),
        client.graphql({ query: listEmpWorkInfos, variables: { limit } }),
        client.graphql({ query: listEmpLeaveDetails, variables: { limit } }),
        client.graphql({ query: listTicketRequests, variables: { limit } }),
      
      ]);

      // Extract items from responses
      const fetchedLeaveStatuses =
        leaveStatusesData?.data?.listLeaveStatuses?.items || [];
      const fetchedEmpPersonalInfos =
        empPersonalInfosData?.data?.listEmpPersonalInfos?.items || [];
      const fetchedWorkInfo = workInfoData?.data?.listEmpWorkInfos?.items || [];
      const fetchedLeaveDetails =
        empLeaveData?.data?.listEmpLeaveDetails?.items || [];
      const fetchedTicketRequests =
        ticketRequestsData?.data?.listTicketRequests?.items || [];


        
      // Create lookup maps
      const empInfoMap = fetchedEmpPersonalInfos.reduce((acc, item) => {
        acc[item.empID] = item;
        return acc;
      }, {});

      const workInfoMap = fetchedWorkInfo.reduce((acc, item) => {
        acc[item.empID] = item;
        return acc;
      }, {});

      const leaveDetailsMap = fetchedLeaveDetails.reduce((acc, item) => {
        acc[item.empID] = item;
        return acc;
      }, {});

      // Merge leave status data
      const mergedLeaveData = fetchedLeaveStatuses.map((leaveStatus) => {
        const empInfo = empInfoMap[leaveStatus.empID] || {};
        // console.log(empInfo, "EMP INFO");
        
        const workInfo = workInfoMap[leaveStatus.empID] || {};
        const leaveDetails = leaveDetailsMap[leaveStatus.empID] || {};
        // console.log(empInfoMap);

        return {
          id: leaveStatus.id,
          empID: leaveStatus.empID,
          empName: empInfo.name,
          empBadgeNo: empInfo.empBadgeNo,
          empOfficialEmail: empInfo.officialEmail,
          doj: workInfo.doj,
          leaveStatusCreatedAt: leaveStatus.createdAt,
          leaveDays: leaveStatus.days,
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
          empLeaveStartDate: leaveStatus.fromDate,
          empLeaveEndDate: leaveStatus.toDate,
          empLeaveUpdatedAt: leaveStatus.updatedAt,
          compassionateLeave: leaveDetails.compasLeave || 0,
          annualLeave: leaveDetails.annualLeave || 0,
          sickLeave: leaveDetails.sickLeave || 0,
          maternityLeave: leaveDetails.materLeave || 0,
          paternityLeave: leaveDetails.paterLeave || 0,
          hospitalLeave: leaveDetails.hospLeave || 0,
          marriageLeave: leaveDetails.mrageLeave || 0,
          empPervAnnualLeaveBal: leaveDetails.pervAnnualLeaveBal || 0,
          leaveDetailsCreatedAt:leaveDetails.createdAt,
          leaveDetailsUpdatedAt:leaveDetails.updatedAt
        };
      });

      // Merge ticket request data
      const mergedTicketData = fetchedTicketRequests.map((ticket) => {
        const empInfo = empInfoMap[ticket.empID] || {};
        const workInfo = workInfoMap[ticket.empID] || {};

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
          arrivalDate: ticket.arrivalDate,
          destination: ticket.destination,
          empStatus: ticket.empStatus,
          empDate: ticket.empDate,
          empRemarks: ticket.empRemarks,
          hrStatus: ticket.hrStatus,
          hrDate: ticket.hrDate,
          hrRemarks: ticket.hrRemarks,
          hrName: ticket.hrName,
          hrEmpID: ticket.hrEmpID,
          managerEmpID: workInfo.manager || "",
          createdAt: ticket.createdAt,
        };
      });

      setData({
        mergedData: mergedLeaveData,
        ticketMerged: mergedTicketData,
        personalDetails: fetchedEmpPersonalInfos,
      });
    } catch (err) {
      setError(err);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleDeleteLeaveStatus = async (id) => {
    setLoading(true);
    try {
      await client.graphql({
        query: deleteLeaveStatus,
        variables: {
          input: { id },
        },
      });
      setData((prevData) => ({
        ...prevData,
        mergedData: prevData.mergedData.filter((status) => status.id !== id),
      }));
    } catch (err) {
      setError(err);
      console.error("Error deleting leave status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLeaveStatus = async (id, updatedData) => {
    setLoading(true);
    try {
      // console.log(updatedData);

      const result = await client
        .graphql({
          query: updateLeaveStatus,
          variables: {
            input: { id, ...updatedData },
          },
        })
        .then((res) => {
          // console.log(result.data.updateLeaveStatus.items);
        })
        .catch((err) => {
          console.log(err);
        });

      const updatedLeaveStatus = result?.data?.updateLeaveStatus;

      // Update the local state to reflect the changes
      setData((prevData) => ({
        ...prevData,
        mergedData: prevData.mergedData.map((status) =>
          status.id === id ? updatedLeaveStatus : status
        ),
      }));
    } catch (err) {
      setError(err);
      console.error("Error updating leave status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmpLeaveDetails = async (empID, updatedData) => {
    setLoading(true);
    try {
      const result = await client.graphql({
        query: updateEmpLeaveDetails,
        variables: {
          input: { empID, ...updatedData },
        },
      });

      const updatedEmpLeaveDetails = result.data.updateEmpLeaveDetails;

      setData((prevData) => ({
        ...prevData,
        mergedData: prevData.mergedData.map((leaveDetails) =>
          leaveDetails.empID === empID ? updatedEmpLeaveDetails : leaveDetails
        ),
      }));
    } catch (err) {
      setError(err);
      console.error("Error updating employee leave details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTicketRequest = async (id, updatedData) => {
    setLoading(true);
    try {
      const result = await client.graphql({
        query: updateTicketRequest,
        variables: {
          input: { id, ...updatedData },
        },
      });

      const updatedTicketRequest = result.data.updateTicketRequest;

      // Update the local state to reflect the changes
      setData((prevData) => ({
        ...prevData,
        mergedData: prevData.mergedData.map((request) =>
          request.id === id ? updatedTicketRequest : request
        ),
      }));
    } catch (err) {
      setError(err);
      console.error("Error updating leave status:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...data,
    loading,
    error,
    handleDeleteLeaveStatus,
    handleUpdateLeaveStatus,
    handleUpdateTicketRequest,
    handleUpdateEmpLeaveDetails,
    refreshData: fetchAllData, // Expose refresh function if needed
  };
};
