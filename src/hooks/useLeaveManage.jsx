import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  listEmpPersonalInfos,
  listLeaveStatuses,
  listPersonalDetails,
  listTicketRequests,
  listUsers,
  listInterviewSchedules,
  listEmpWorkInfos,
  listEmpLeaveDetails,
} from "../graphql/queries";
import {
  deleteLeaveStatus,
  updateLeaveStatus,
  updateTicketRequest,
  updateEmpLeaveDetails,
} from "../graphql/mutations";

const client = generateClient();
export const useLeaveManage = () => {
  // const [leaveStatuses, setLeaveStatuses] = useState([]);
  // const [empPersonalInfos, setEmpPersonalInfos] = useState([]);
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
          workInfoData,
          empLeaveData,
        ] = await Promise.all([
          client.graphql({ query: listLeaveStatuses }),
          client.graphql({ query: listEmpPersonalInfos }),
          client.graphql({ query: listTicketRequests }),
          client.graphql({ query: listEmpWorkInfos }),
          client.graphql({ query: listEmpLeaveDetails }),
        ]);

        const fetchedLeaveStatuses =
          leaveStatusesData?.data?.listLeaveStatuses?.items || [];
        const fetchedEmpPersonalInfos =
          empPersonalInfosData?.data?.listEmpPersonalInfos?.items || [];
        const fetchedTicketRequests =
          ticketRequestsData?.data?.listTicketRequests?.items || [];
        const fetchedWorkInfo =
          workInfoData?.data?.listEmpWorkInfos?.items || [];
        const fetchedLeaveDetails =
          empLeaveData?.data?.listEmpLeaveDetails?.items || [];

        // console.log("Fetched Leave Statuses:", fetchedLeaveStatuses);
        // console.log(
        //   "Fetched Employee Personal Infos:",
        //   fetchedEmpPersonalInfos
        // );
        // console.log("Fetched Tickets Request Details:", fetchedTicketRequests);
        // console.log("Fetched Personal Details:", fetchedPersonalDetails);
        // console.log("Fetched User Data:", fetchedUserData);
        // console.log("new", ticketRequestsData)
        // console.log("leave",fetchedLeaveDetails)

        // setTicketRequests(fetchedTicketRequests);
        // setPersonalDetails(fetchedPersonalDetails);

        // Create a mapping of employee personal info by empID
        const empInfoMap = fetchedEmpPersonalInfos.reduce((acc, emp) => {
          acc[emp.empID] = emp;
          return acc;
        }, {});

        const ticketReqMap = fetchedTicketRequests.reduce((acc, emp) => {
          acc[emp.empID] = emp;
          return acc;
        }, {});

        const workInfoReqMap = fetchedWorkInfo.reduce((acc, emp) => {
          acc[emp.empID] = emp;
          return acc;
        });

        const leaveDetails = fetchedLeaveDetails.reduce((acc, emp) => {
          acc[emp.empID] = emp;
          return acc;
        });
        fetchedLeaveStatuses.map((val)=>{
// console.log(val);

        })
        // Merge employee personal info into leave statuses
        const merged = fetchedLeaveStatuses.map((leaveStatus) => ({
        
          
          ...leaveStatus,
          employeeInfo: empInfoMap[leaveStatus.empID] || {}, // Add employee info
          ticketRequest: ticketReqMap[leaveStatus.empID] || {},
          workInfo: workInfoReqMap[leaveStatus.empID] || {},
          leaveDetails: leaveDetails[leaveStatus.empID] || {},
        }));

        // console.log("Merged Data:", merged);
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const [empPersonalInfosData, ticketRequestsData, empWorkInfosData] =
  //         await Promise.all([
  //           client.graphql({ query: listEmpPersonalInfos }),
  //           client.graphql({ query: listTicketRequests }),
  //           client.graphql({ query: listEmpWorkInfos }),
  //         ]);
          

  //       const fetchedEmpPersonalInfos =
  //         empPersonalInfosData?.data?.listEmpPersonalInfos?.items || [];
  //       const fetchedTicketRequests =
  //         ticketRequestsData?.data?.listTicketRequests?.items || [];
  //       const fetchedEmpWorkInfos =
  //         empWorkInfosData?.data?.listEmpWorkInfos?.items || [];

  //       // console.log("Fetched Employee Personal Infos:", fetchedEmpPersonalInfos);
  //       // console.log("Fetched Ticket Request Details:", fetchedTicketRequests);
  //       // console.log("Fetched Employee Work Infos:", fetchedEmpWorkInfos);

  //       setTicketRequests(fetchedTicketRequests);

  //       // Create a mapping of employee personal info by empID
  //       const empInfoMap = fetchedEmpPersonalInfos.reduce((acc, emp) => {
  //         acc[emp.empID] = emp;
  //         return acc;
  //       }, {});

  //       // Create a mapping of employee work info by empID
  //       const empWorkInfoMap = fetchedEmpWorkInfos.reduce((acc, workInfo) => {
  //         acc[workInfo.empID] = workInfo;
  //         return acc;
  //       }, {});

  //       // Merge employee personal info into ticket requests
  //       const merged = fetchedTicketRequests.map((ticket) => ({
  //         ...ticket,
  //         employeeInfo: empInfoMap[ticket.empID] || {}, // Add employee info
  //         workInfo: empWorkInfoMap[ticket.empID] || {},
  //       }));

  //       // console.log("Merged Data 4.0:", merged);
  //       setTicketMerged(merged);
  //     } catch (err) {
  //       setError(err);
  //       console.error("Error fetching data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);


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

      setMergedData((prevData) =>
        prevData.map((leaveDetails) =>
          leaveDetails.empID === empID ? updatedEmpLeaveDetails : leaveDetails
        )
      );
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
    handleUpdateEmpLeaveDetails,
    // ticketMerged,
    mergedData,
    // ticketRequests,
    loading,
    error,
    handleDeleteLeaveStatus,
    handleUpdateLeaveStatus,
    handleUpdateTicketRequest,
    personalDetails,
  };
};
