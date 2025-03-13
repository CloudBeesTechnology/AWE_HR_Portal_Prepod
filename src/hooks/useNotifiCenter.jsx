import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import { format } from "date-fns";
import { DataSupply } from "../utils/DataStoredContext";
import { generateClient } from "@aws-amplify/api";
import { updateEmailNotifi } from "../graphql/mutations";
import { listEmailNotifis, listEmpPersonalInfos } from "../graphql/queries";

// Create Context
const NotifiCenterContext = createContext();

export const NotifiCenterProvider = ({ children }) => {
  const [matchingNotifications, setMatchingNotifications] = useState([]);
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [empPIData, setEmpPIData] = useState([]);
  const [emailNotifi, setEmailNotifi] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const client = generateClient();

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const storedUserType = localStorage.getItem("userType");

    if (storedUserID) setUserID(storedUserID);
    if (storedUserType) setUserType(storedUserType);

    const fetchEmpPIData = async () => {
      let nextToken = null;
      let allEmpData = [];

      try {
        do {
          const dataEmp = await client.graphql({
            query: listEmpPersonalInfos,
            variables: { nextToken },
          });

          const empStore = dataEmp?.data?.listEmpPersonalInfos?.items || [];
          allEmpData = [...allEmpData, ...empStore];
          nextToken = dataEmp?.data?.listEmpPersonalInfos?.nextToken;
        } while (nextToken);

        setEmpPIData(allEmpData);
      } catch (error) {
        // console.error("Error fetching employee data:", error);
      }
    };
    const fetchEmailNotify = async () => {
      let nextToken = null;
      let emailNotify = [];

      try {
        do {
          const dataEmp = await client.graphql({
            query: listEmailNotifis,
            variables: { nextToken },
          });

          const empStore = dataEmp?.data?.listEmailNotifis?.items || [];
          emailNotify = [...emailNotify, ...empStore];
          nextToken = dataEmp?.data?.listEmailNotifis?.nextToken;
        } while (nextToken);

        setEmailNotifi(emailNotify);
      } catch (error) {
        // console.error("Error fetching employee data:", error);
      }
    };
    if (storedUserID) {
      fetchEmailNotify();
      fetchEmpPIData();
    }
  }, []);

  useEffect(() => {
    if (!empPIData.length || !emailNotifi) {
      return;
    }

    let notificationsList = [];
    if (userID) {
      const matched = empPIData.find(
        (item) => item.empID.toString() === userID.toString().toUpperCase()
      );

      if (matched?.officialEmail) {
        const userNotifications = emailNotifi.filter(
          (notification) =>
            notification.receipentEmail === matched.officialEmail
        );
        // console.log(userNotifications);

        notificationsList = userNotifications
          .filter(
            (notification) =>
              !notification?.leaveType?.toLowerCase().includes("leave") &&
            !notification?.leaveType?.toLowerCase().includes("unpaid authorize")
                      )
          .map((notification) => ({
            ...notification,
            subject:
              notification.message?.split(" - ")[0] || notification.subject,
            date: format(
              new Date(notification.createdAt),
              "dd MMM yyyy, hh:mm a"
            ),
          }));
      }
    }

    if (userType === "HR") {
      const hrEmails = [
        "hr_no-reply@adininworks.com",
        "hr-expiry@adininworks.com",
        "hr-training@adininworks.com",
        "Hr-notification@adininworks.com",
        // "veda.thiyagarajane@gmail.com",
      ];
      const hrNotifications =
        emailNotifi?.filter((notification) =>
          hrEmails.includes(notification.receipentEmail)
        ) || [];

      const formattedHRNotifications = hrNotifications
        .filter((notification) => !notification?.leaveType?.toLowerCase().includes("leave") &&
        !notification?.leaveType?.toLowerCase().includes("unpaid authorize")
        )
        .map((notification) => ({
          ...notification,
          subject:
            notification.message?.split(" - ")[0] || notification.subject,
          date: format(
            new Date(notification.createdAt),
            "dd MMM yyyy, hh:mm a"
          ),
          // read: storedReadNotifications.includes(notification.id) || notification.status === "Read",
        }));

      notificationsList = [...notificationsList, ...formattedHRNotifications];
    }
    const countingStatus = notificationsList.filter(
      (val) => val?.status !== "Read"
    ).length;

    setUnreadCount(countingStatus);
    setMatchingNotifications(notificationsList);
  }, [userID, empPIData, emailNotifi, userType]);
  // console.log(unreadCount);

  const handleReadMore = async (notification, index) => {
    try {
      await client.graphql({
        query: updateEmailNotifi,
        variables: {
          input: {
            id: notification.id,
            status: "Read",
            empID: notification.empID,
          },
        },
      });

      setMatchingNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notification.id ? { ...notif, status: "Read" } : notif
        )
      );
      setUnreadCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      // setUnreadCount((prevCount) => Math.max(prevCount - 1, 0));
    } catch (error) {
      console.error(
        "handleReadMore - Failed to update notification status:",
        error
      );
    }
  };

  return (
    <NotifiCenterContext.Provider
      value={{ matchingNotifications, unreadCount, handleReadMore }}
    >
      {children}
    </NotifiCenterContext.Provider>
  );
};

export const useNotifiCenter = () => {
  return useContext(NotifiCenterContext);
};
