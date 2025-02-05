import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { listEmailNotifis } from "../graphql/queries";

const client = generateClient();

export const useNotification = () => {
  const [emailNotifications, setEmailNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let allEmailNotifications = [];
      let nextToken = null;

      try {
        do {
          const response = await client.graphql({
            query: listEmailNotifis,
            variables: {
              nextToken,
            },
          });

          allEmailNotifications = [
            ...allEmailNotifications,
            ...response.data.listEmailNotifis.items,
          ];

          nextToken = response.data.listEmailNotifis.nextToken;
        } while (nextToken);      

        setEmailNotifications(allEmailNotifications);
      } catch (err) {
        setError("Error fetching email notifications.");
        console.error("Error fetching email notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { emailNotifications, loading, error };
};
