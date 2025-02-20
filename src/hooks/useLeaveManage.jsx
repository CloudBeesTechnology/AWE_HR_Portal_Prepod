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

    let allLeaveStatuses = [];
    let allEmpPersonalInfos = [];
    let allWorkInfo = [];
    let allEmpLeaveDetails = [];
    let allTicketRequests = [];

    let nextTokenLeaveStatuses = null;
    let nextTokenEmpPersonalInfos = null;
    let nextTokenWorkInfo = null;
    let nextTokenEmpLeaveDetails = null;
    let nextTokenTicketRequests = null;

    try {
      do {
        const response = await client.graphql({
          query: listLeaveStatuses,
          variables: { nextToken: nextTokenLeaveStatuses },
        });

        allLeaveStatuses = [
          ...allLeaveStatuses,
          ...response.data.listLeaveStatuses.items,
        ];

        // console.log("LeaveStatus", allLeaveStatuses);

        nextTokenLeaveStatuses = response.data.listLeaveStatuses.nextToken;
      } while (nextTokenLeaveStatuses);

      do {
        const response = await client.graphql({
          query: listEmpPersonalInfos,
          variables: { nextToken: nextTokenEmpPersonalInfos },
        });

        allEmpPersonalInfos = [
          ...allEmpPersonalInfos,
          ...response.data.listEmpPersonalInfos.items,
        ];

        // console.log("PersonalInfo", allEmpPersonalInfos);

        nextTokenEmpPersonalInfos =
          response.data.listEmpPersonalInfos.nextToken;
      } while (nextTokenEmpPersonalInfos);

      // Fetching work info
      do {
        const response = await client.graphql({
          query: listEmpWorkInfos,
          variables: { nextToken: nextTokenWorkInfo },
        });

        allWorkInfo = [...allWorkInfo, ...response.data.listEmpWorkInfos.items];

        // console.log("WorkInfo", allWorkInfo);

        nextTokenWorkInfo = response.data.listEmpWorkInfos.nextToken;
      } while (nextTokenWorkInfo);

      // Fetching employee leave details
      do {
        const response = await client.graphql({
          query: listEmpLeaveDetails,
          variables: { nextToken: nextTokenEmpLeaveDetails },
        });

        allEmpLeaveDetails = [
          ...allEmpLeaveDetails,
          ...response.data.listEmpLeaveDetails.items,
        ];

        // console.log("LeaveDetails", allEmpLeaveDetails);

        nextTokenEmpLeaveDetails = response.data.listEmpLeaveDetails.nextToken;
      } while (nextTokenEmpLeaveDetails);

      // Fetching ticket requests
      do {
        const response = await client.graphql({
          query: listTicketRequests,
          variables: { nextToken: nextTokenTicketRequests },
        });

        allTicketRequests = [
          ...allTicketRequests,
          ...response.data.listTicketRequests.items,
        ];

        // console.log("TicketRequest", allTicketRequests);

        nextTokenTicketRequests = response.data.listTicketRequests.nextToken;
      } while (nextTokenTicketRequests);

      // Create lookup maps
      const empInfoMap = allEmpPersonalInfos.reduce((acc, item) => {
        acc[item.empID] = item;
        return acc;
      }, {});

      const workInfoMap = allWorkInfo.reduce((acc, item) => {
        acc[item.empID] = item;
        return acc;
      }, {});

      const leaveDetailsMap = allEmpLeaveDetails.reduce((acc, item) => {
        acc[item.empID] = item;
        return acc;
      }, {});

      // Merge leave status data
      const mergedLeaveData = allLeaveStatuses.map((leaveStatus) => {
        const empInfo = empInfoMap[leaveStatus.empID] || {};
        const workInfo = workInfoMap[leaveStatus.empID] || {};
        const leaveDetails = leaveDetailsMap[leaveStatus.empID] || {};
        // console.log(empInfoMap);

        return {
          id: leaveStatus.id,
          empID: leaveStatus.empID,
          empName: empInfo.name,
          empBadgeNo: empInfo.empBadgeNo,
          gender: empInfo.gender,
          empOfficialEmail: empInfo.officialEmail,
          doj: workInfo.doj,
          leaveStatusCreatedAt: leaveStatus.createdAt,
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
          empLeaveStartDate: leaveStatus.fromDate,
          empLeaveSelectedFrom: leaveStatus.selectedFrom,
          empLeaveEndDate: leaveStatus.toDate,
          empLeaveSelectedTo: leaveStatus.selectedTo,
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
        };
      });

      // Merge ticket request data
      const mergedTicketData = allTicketRequests.map((ticket) => {
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
        mergedData: mergedLeaveData,
        ticketMerged: mergedTicketData,
        personalDetails: allEmpPersonalInfos,
      });

      // console.log(data);
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
    refreshData: fetchAllData,
  };
};
