import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  listEmpPersonalInfos,
  listTicketRequests,  
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
        const [empPersonalInfosData, ticketRequestsData] = await Promise.all([
          client.graphql({ query: listEmpPersonalInfos }),
          client.graphql({ query: listTicketRequests }),
        ]);
  
        const fetchedEmpPersonalInfos =
          empPersonalInfosData?.data?.listEmpPersonalInfos?.items || [];
        const fetchedTicketRequests =
          ticketRequestsData?.data?.listTicketRequests?.items || [];
  
        console.log("Fetched Employee Personal Infos:", fetchedEmpPersonalInfos);
        console.log("Fetched Ticket Request Details:", fetchedTicketRequests);
  
        setTicketRequests(fetchedTicketRequests);
  
        // Create a mapping of employee personal info by empID
        const empInfoMap = fetchedEmpPersonalInfos.reduce((acc, emp) => {
          acc[emp.empID] = emp;
          return acc;
        }, {});
  
        // Merge employee personal info into ticket requests
        const merged = fetchedTicketRequests.map((ticket) => ({
          ...ticket,
          employeeInfo: empInfoMap[ticket.empID] || {}, // Add employee info
        }));
  
        console.log("Merged Data 2.0:", merged);
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

  useEffect(() => {
    console.log("28267780", ticketMerged);
  }, [ticketMerged]);


  return {ticketMerged, ticketRequests, loading, error};
};
