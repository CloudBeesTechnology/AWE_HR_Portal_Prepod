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
      setError(null);

      let allEmpPersonalInfos = [];
      let allTicketRequests = [];
      let allEmpWorkInfos = [];

      let nextTokenEmpPersonalInfos = null;
      let nextTokenTicketRequests = null;
      let nextTokenEmpWorkInfos = null;

      try {
        do {
          const response = await client.graphql({
            query: listEmpPersonalInfos,
            variables: { nextToken: nextTokenEmpPersonalInfos, limit: 20000 },
          });

          allEmpPersonalInfos = [
            ...allEmpPersonalInfos,
            ...response.data.listEmpPersonalInfos.items,
          ];

          nextTokenEmpPersonalInfos = response.data.listEmpPersonalInfos.nextToken;
        } while (nextTokenEmpPersonalInfos);

        do {
          const response = await client.graphql({
            query: listTicketRequests,
            variables: { nextToken: nextTokenTicketRequests, limit: 20000 },
          });

          allTicketRequests = [
            ...allTicketRequests,
            ...response.data.listTicketRequests.items,
          ];

          nextTokenTicketRequests = response.data.listTicketRequests.nextToken;
        } while (nextTokenTicketRequests);

        do {
          const response = await client.graphql({
            query: listEmpWorkInfos,
            variables: { nextToken: nextTokenEmpWorkInfos, limit: 20000 },
          });

          allEmpWorkInfos = [
            ...allEmpWorkInfos,
            ...response.data.listEmpWorkInfos.items,
          ];

          nextTokenEmpWorkInfos = response.data.listEmpWorkInfos.nextToken;
        } while (nextTokenEmpWorkInfos);

        const empInfoMap = allEmpPersonalInfos.reduce((acc, emp) => {
          acc[emp.empID] = emp;
          return acc;
        }, {});

        const empWorkInfoMap = allEmpWorkInfos.reduce((acc, workInfo) => {
          acc[workInfo.empID] = workInfo;
          return acc;
        }, {});

        const merged = allTicketRequests.map((ticket) => ({
          ...ticket,
          employeeInfo: empInfoMap[ticket.empID] || {},
          workInfo: empWorkInfoMap[ticket.empID] || {},
        }));

        setTicketRequests(allTicketRequests);
        setTicketMerged(merged);

      } catch (err) {
        setError("Error fetching data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ticketMerged, ticketRequests, loading, error };
};
