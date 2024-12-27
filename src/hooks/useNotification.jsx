import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { listEmailNotifis } from "../graphql/queries"; // Assuming you have the query for listEmailNotifis

const client = generateClient();

export const useNotification = () => {
  const [emailNotifications, setEmailNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const emailNotifData = await client.graphql({
          query: listEmailNotifis,           variables: { limit: 20000 },
          // Query to fetch email notifications
        });


        const fetchedEmailNotifications =
          emailNotifData?.data?.listEmailNotifis?.items || [];

        // console.log("Fetched Email Notifications:", fetchedEmailNotifications);
        setEmailNotifications(fetchedEmailNotifications);
      } catch (err) {
        setError(err);
        console.error("Error fetching email notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log("notification",emailNotifications)

  return { emailNotifications, loading, error };
};
