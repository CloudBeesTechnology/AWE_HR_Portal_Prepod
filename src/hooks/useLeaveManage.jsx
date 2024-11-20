import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  listEmpPersonalInfos,
  listLeaveStatuses,
  listPersonalDetails,
  listTicketRequests,
  listUsers,
  listInterviewScheduleSchemas,
  listEmpWorkInfos,
} from "../graphql/queries";
import {
  deleteLeaveStatus,
  updateLeaveStatus,
  updateTicketRequest,
} from "../graphql/mutations";

const client = generateClient();

export const useLeaveManage = () => {
  const [personalDetails, setPersonalDetails] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [ticketMerged, setTicketMerged] = useState([]);
  const [ticketRequests, setTicketRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          leaveStatusesData,
          empPersonalInfosData,
          ticketRequestsData,
          PersonalDetailsData,
          userData,
          interviewScheduleSchemasData,
        ] = await Promise.all([
          client.graphql({ query: listLeaveStatuses }),
          client.graphql({ query: listEmpPersonalInfos }),
          client.graphql({ query: listTicketRequests }),
          client.graphql({ query: listPersonalDetails }),
          client.graphql({ query: listUsers }),
          client.graphql({ query: listInterviewScheduleSchemas }),
        ]);

        const fetchedLeaveStatuses =
          leaveStatusesData?.data?.listLeaveStatuses?.items || [];
        const fetchedEmpPersonalInfos =
          empPersonalInfosData?.data?.listEmpPersonalInfos?.items || [];
        const fetchedTicketRequests =
          ticketRequestsData?.data?.listTicketRequests?.items || [];
        const fetchedPersonalDetails =
          PersonalDetailsData?.data?.listPersonalDetails?.items || [];
        const fetchedUserData = userData?.data?.listUsers?.items || [];
        const fetchedInterviewScheduleSchemas =
          interviewScheduleSchemasData?.data?.listInterviewScheduleSchemas
            ?.items || [];

        setTicketRequests(fetchedTicketRequests);
        setPersonalDetails(fetchedPersonalDetails);

        // Create a mapping of employee personal info by empID
        const empInfoMap = fetchedEmpPersonalInfos.reduce((acc, emp) => {
          acc[emp.empID] = emp;
          return acc;
        }, {});

        const ticketReqMap = fetchedTicketRequests.reduce((acc, emp) => {
          acc[emp.empID] = emp;
          return acc;
        }, {});

        // Merge employee personal info into leave statuses
        const merged = fetchedLeaveStatuses.map((leaveStatus) => ({
          ...leaveStatus,
          employeeInfo: empInfoMap[leaveStatus.empID] || {}, // Add employee info
          ticketRequest: ticketReqMap[leaveStatus.empID] || {},
        }));

        setMergedData(merged);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [empPersonalInfosData, ticketRequestsData, empWorkInfosData] =
          await Promise.all([
            client.graphql({ query: listEmpPersonalInfos }),
            client.graphql({ query: listTicketRequests }),
            client.graphql({ query: listEmpWorkInfos }),
          ]);

        const fetchedEmpPersonalInfos =
          empPersonalInfosData?.data?.listEmpPersonalInfos?.items || [];
        const fetchedTicketRequests =
          ticketRequestsData?.data?.listTicketRequests?.items || [];
        const fetchedEmpWorkInfos =
          empWorkInfosData?.data?.listEmpWorkInfos?.items || [];

        setTicketRequests(fetchedTicketRequests);

        // Create a mapping of employee personal info by empID
        const empInfoMap = fetchedEmpPersonalInfos.reduce((acc, emp) => {
          acc[emp.empID] = emp;
          return acc;
        }, {});

        // Create a mapping of employee work info by empID
        const empWorkInfoMap = fetchedEmpWorkInfos.reduce((acc, workInfo) => {
          acc[workInfo.empID] = workInfo;
          return acc;
        }, {});

        // Merge employee personal info into ticket requests
        const merged = fetchedTicketRequests.map((ticket) => ({
          ...ticket,
          employeeInfo: empInfoMap[ticket.empID] || {}, // Add employee info
          workInfo: empWorkInfoMap[ticket.empID] || {},
        }));

        setTicketMerged(merged);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //merge ticket request and empPersonal,

  const handleDeleteLeaveStatus = async (id) => {
    setLoading(true);
    try {
      await client.graphql({
        query: deleteLeaveStatus,
        variables: {
          input: { id },
        },
      });
      setMergedData((prevData) =>
        prevData.filter((status) => status.id !== id)
      );
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
      const result = await client.graphql({
        query: updateLeaveStatus,
        variables: {
          input: { id, ...updatedData },
        },
      });

      const updatedLeaveStatus = result.data.updateLeaveStatus;

      // Update the local state to reflect the changes
      setMergedData((prevData) =>
        prevData.map((status) =>
          status.id === id ? updatedLeaveStatus : status
        )
      );
    } catch (err) {
      setError(err);
      console.error("Error updating leave status:", err);
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
      setMergedData((prevData) =>
        prevData.map((request) =>
          request.id === id ? updatedTicketRequest : request
        )
      );
    } catch (err) {
      setError(err);
      console.error("Error updating leave status:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    ticketMerged,
    mergedData,
    ticketRequests,
    loading,
    error,
    handleDeleteLeaveStatus,
    handleUpdateLeaveStatus,
    handleUpdateTicketRequest,
    personalDetails,
  };
};
