import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  listEmpPersonalInfos,
  listTicketRequests,
  listEmpWorkInfos,  
} from "../graphql/queries";

const client = generateClient();

export const useLeaveManageTwo = () => {
  const [mergedData, setMergedData] = useState([]);
  const [ticketMerged, setTicketMerged] = useState([]);
  const [ticketRequests, setTicketRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch the data from multiple sources concurrently
        const [empPersonalInfosData, ticketRequestsData, empWorkInfosData] = await Promise.all([
          client.graphql({ query: listEmpPersonalInfos }),
          client.graphql({ query: listTicketRequests }),
          client.graphql({ query: listEmpWorkInfos })
        ]);
  
        // Extract data or use empty array as fallback
        const fetchedEmpPersonalInfos = empPersonalInfosData?.data?.listEmpPersonalInfos?.items || [];
        const fetchedTicketRequests = ticketRequestsData?.data?.listTicketRequests?.items || [];
        const fetchedEmpWorkInfos = empWorkInfosData?.data?.listEmpWorkInfos?.items || [];
  
        // console.log("Fetched Employee Personal Infos:", fetchedEmpPersonalInfos);
        // console.log("Fetched Ticket Request Details:", fetchedTicketRequests);
        // console.log("Fetched Employee Work Infos:", fetchedEmpWorkInfos);
  
        // Set ticket requests to state
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
  
        // Merge employee personal info and work info into ticket requests
        const merged = fetchedTicketRequests.map((ticket) => ({
          ...ticket,
          employeeInfo: empInfoMap[ticket.empID] || {}, // Add employee personal info
          workInfo: empWorkInfoMap[ticket.empID] || {}, // Add employee work info
        }));
  
        // console.log("Merged Data with Work Info 6.0:", merged);
  
        // Set the merged data to state
        setTicketMerged(merged);
  
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array means this effect runs only once when the component mounts
  

  // useEffect(() => {
  //   console.log("28267780", ticketMerged);
  // }, [ticketMerged]);


  return {ticketMerged, ticketRequests, loading, error};
};
