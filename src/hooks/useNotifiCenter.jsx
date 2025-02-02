import { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { DataSupply } from "../utils/DataStoredContext";
import { generateClient } from "@aws-amplify/api";
import { updateEmailNotifi } from "../graphql/mutations";
import { useNotification } from "./useNotification";

export const useNotifiCenter = () => {
  const { empPIData, EmailNotifi } = useContext(DataSupply) || {}; // Safeguard against undefined context
  const [matchingNotifications, setMatchingNotifications] = useState([]);
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [unreadCount, setUnreadCount] = useState(0); // State for unread count
  const client = generateClient();

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const storedUserType = localStorage.getItem("userType");

    if (storedUserID) setUserID(storedUserID);
    if (storedUserType) setUserType(storedUserType);
  }, []);

  useEffect(() => {
    if (!empPIData || !EmailNotifi) {
      // console.log("empPIData or EmailNotifi is not available.");
      return;
    }

    // console.log("empPIData:", empPIData); 
    // console.log("EmailNotifi:", EmailNotifi);

    let notificationsList = [];

    if (userID && Array.isArray(empPIData)) {
      const matched = empPIData.find((item) => item.empID === userID);
      // console.log("Matched Employee Data:", matched);

      if (matched && matched.officialEmail && Array.isArray(EmailNotifi)) {
        const userNotifications = EmailNotifi.filter(
          (notification) => notification.receipentEmail === matched.officialEmail
        );

        // console.log("User Notifications:", userNotifications);

        notificationsList = userNotifications
          .filter((notification) => notification.leaveType === null)
          .map((notification) => ({
            ...notification,
            subject: notification.message?.split(" - ")[0] || notification.subject,
            date: format(new Date(notification.createdAt), "dd MMM yyyy , hh:mm a"),
            read: notification.status === "Readed",
          }));
      } else {
        console.log("No match found for officialEmail:", matched?.officialEmail);
      }
    }

    const hrEmails = ["hr_no-reply@adininworks.com", "hr-expiry@adininworks.com", "Hr-notification@adininworks.com"];

    if (userType === "HR") {
      const hrNotifications = EmailNotifi?.filter((notification) => hrEmails.includes(notification.receipentEmail)) || [];

      const formattedHRNotifications = hrNotifications
        .filter((notification) => notification.leaveType === null)
        .map((notification) => ({
          ...notification,
          subject: notification.message?.split(" - ")[0] || notification.subject,
          date: format(new Date(notification.createdAt), "dd MMM yyyy , hh:mm a"),
          read: notification.status === "Readed",
        }));

      notificationsList = [...notificationsList, ...formattedHRNotifications];
    }

    console.log("Final Matching Notifications:", notificationsList); 
    setMatchingNotifications(notificationsList);

    // Calculate unread count
    const count = notificationsList.filter((notification) => !notification.read).length;
    setUnreadCount(count);
    // console.log("Unread Count:", count);
    
  }, [userID, empPIData, EmailNotifi, userType]);

  const handleReadMore = async (notification, index) => {
    try {
      await client.graphql({
        query: updateEmailNotifi,
        variables: {
          input: {
            id: notification.id,
            status: "Readed",
            empID: notification.empID,
          },
        },
      });

      setMatchingNotifications((prevNotifications) =>
        prevNotifications.map((notif, notifIndex) =>
          notifIndex === index ? { ...notif, status: "Readed", read: true } : notif
        )
      );

      setUnreadCount((prevCount) => prevCount - 1);
      console.log("Updated Unread Count:", unreadCount);

    } catch (error) {
      console.error("Failed to update notification status:", error);
    }
  };

  return { matchingNotifications, handleReadMore, unreadCount };
};


// import { useState, useEffect, useContext } from "react";
// import { format } from "date-fns";
// import { DataSupply } from "../utils/DataStoredContext";
// import { generateClient } from "@aws-amplify/api";
// import { updateEmailNotifi } from "../graphql/mutations";
// import { useNotification } from "./useNotification";

// export const useNotifiCenter = () => {
//   const { empPIData, EmailNotifi } = useContext(DataSupply) || {}; // Safeguard against undefined context
//   const [matchingNotifications, setMatchingNotifications] = useState([]);
//   const [userID, setUserID] = useState("");
//   const [userType, setUserType] = useState("");
//   const [unreadCount, setUnreadCount] = useState(0); // State for unread count
//   const client = generateClient();
//   const { emailNotifications } = useNotification();

//   useEffect(() => {
//     const storedUserID = localStorage.getItem("userID");
//     const storedUserType = localStorage.getItem("userType");

//     if (storedUserID) setUserID(storedUserID);
//     if (storedUserType) setUserType(storedUserType);

//     console.log("useEffect - Loaded userID and userType from localStorage:", storedUserID, storedUserType);
//   }, []);

//   useEffect(() => {
//     if (!empPIData || !EmailNotifi) {
//       console.log("empPIData or EmailNotifi is not available.");
//       return;
//     }

//     let notificationsList = [];

//     if (userID && Array.isArray(empPIData)) {
//       const matched = empPIData.find((item) => item.empID === userID);
//       console.log("Matched Employee Data:", matched);

//       if (matched && matched.officialEmail && Array.isArray(EmailNotifi)) {
//         const userNotifications = EmailNotifi.filter(
//           (notification) => notification.receipentEmail === matched.officialEmail
//         );

//         notificationsList = userNotifications
//           .filter((notification) => notification.leaveType === null)
//           .map((notification) => ({
//             ...notification,
//             subject: notification.message?.split(" - ")[0] || notification.subject,
//             date: format(new Date(notification.createdAt), "dd MMM yyyy , hh:mm a"),
//             read: notification.status === "Readed",
//           }));
//       } else {
//         console.log("No match found for officialEmail or EmailNotifi is invalid:", matched?.officialEmail);
//       }
//     }

//     const hrEmails = ["hr_no-reply@adininworks.com", "hr-expiry@adininworks.com", "Hr-notification@adininworks.com"];

//     if (userType === "HR") {
//       console.log("UserType is HR, filtering HR-specific notifications.");
//       const hrNotifications = EmailNotifi?.filter((notification) => hrEmails.includes(notification.receipentEmail)) || [];

//       const formattedHRNotifications = hrNotifications
//         .filter((notification) => notification.leaveType === null)
//         .map((notification) => ({
//           ...notification,
//           subject: notification.message?.split(" - ")[0] || notification.subject,
//           date: format(new Date(notification.createdAt), "dd MMM yyyy , hh:mm a"),
//           read: notification.status === "Readed",
//         }));


//       notificationsList = [...notificationsList, ...formattedHRNotifications];
//     }

//     console.log("Final Matching Notifications:", notificationsList);
//     setMatchingNotifications(notificationsList);

//     // Calculate unread count
//     const count = notificationsList.filter((notification) => !notification.read).length;
//     setUnreadCount(count);
//     console.log(count);
    
//   }, [userID, empPIData, EmailNotifi, userType]);


//   const handleReadMore = async (notification, index) => {
//     console.log("handleReadMore - Notification clicked:", notification);

//     try {
//       console.log("Sending update request to mark notification as Readed.");
//       await client.graphql({
//         query: updateEmailNotifi,
//         variables: {
//           input: {
//             id: notification.id,
//             status: "Readed",
//             empID: notification.empID,
//           },
//         },
//       });

//       console.log("handleReadMore - Successfully updated notification status to 'Readed'");

//       setMatchingNotifications((prevNotifications) =>
//         prevNotifications.map((notif, notifIndex) =>
//           notifIndex === index ? { ...notif, status: "Readed", read: true } : notif
//         )
//       );

//       // Update unread count after marking as read
//       setUnreadCount((prevCount) => prevCount - 1);
//       // console.log(unreadCount);

//     } catch (error) {
//       console.error("handleReadMore - Failed to update notification status:", error);
//     }
//   };
// // console.log(unreadCount);

//   return { matchingNotifications, handleReadMore, unreadCount };
// };





// // hooks/useNotifiCenter.js
// import { useState, useEffect, useContext } from "react";
// import { format } from "date-fns";
// import { DataSupply } from "../utils/DataStoredContext";
// import { generateClient } from "@aws-amplify/api";
// import { updateEmailNotifi } from "../graphql/mutations";
// import { useNotification } from "./useNotification";

// export const useNotifiCenter = () => {
//   const { empPIData, EmailNotifi } = useContext(DataSupply) || {};  // Safeguard against undefined context
//   const [matchingNotifications, setMatchingNotifications] = useState([]);
//   const [userID, setUserID] = useState("");
//   const [userType, setUserType] = useState("");
//   const client = generateClient();
//   const { emailNotifications } = useNotification();

//   useEffect(() => {
//     const storedUserID = localStorage.getItem("userID");
//     setUserID(storedUserID);
//     const storedUserType = localStorage.getItem("userType");
//     setUserType(storedUserType);
//   }, []);

//   useEffect(() => {
//     if (!empPIData || !EmailNotifi) return; // Early return if data is not available

//     if (userID && Array.isArray(empPIData)) {
//       const matched = empPIData.find((item) => item.empID === userID);
//       if (matched && Array.isArray(EmailNotifi)) {
//         const notifications = EmailNotifi.filter(
//           (notification) => notification.receipentEmail === matched.officialEmail
//         );

//         const formattedNotifications = notifications
//           .filter((notification) => notification.leaveType === null)
//           .map((notification) => {
//             const extractedSubject = notification.message?.split(" - ")[0] || notification.subject;
//             return {
//               ...notification,
//               subject: extractedSubject,
//               date: format(new Date(notification.createdAt), "dd MMM yyyy , hh:mm a"),
//               read: notification.status === "Readed",
//             };
//           });

//         setMatchingNotifications(formattedNotifications);
//       }
//     }

//     const hrEmail = "hr_no-reply@adininworks.com" || "hr-expiry@adininworks.com" ||"Hr-notification@adininworks.com";
  
//     if (userType === "HR") {
//       const hrNotifications =
//         EmailNotifi?.filter((notification) => notification.receipentEmail === hrEmail) || [];
  
//       const formattedHRNotifications = hrNotifications
//         .filter((notification) => notification.leaveType === null)
//         .map((notification) => {
//           const extractedSubject = notification.message?.split(" - ")[0] || notification.subject;
//           return {
//             ...notification,
//             subject: extractedSubject,
//             date: format(new Date(notification.createdAt), "dd MMM yyyy , hh:mm a"),
//             read: notification.status === "Readed",
//           };
//         });

//       setMatchingNotifications((prev) => [...prev, ...formattedHRNotifications]);
//     }
//   }, [userID, empPIData, EmailNotifi, userType]);

//   const handleReadMore = async (notification, index) => {
//     try {
//       await client.graphql({
//         query: updateEmailNotifi,
//         variables: {
//           input: {
//             id: notification.id,
//             status: "Readed",
//             empID: notification.empID,
//           },
//         },
//       });

//       setMatchingNotifications((prevNotifications) =>
//         prevNotifications.map((notif, notifIndex) =>
//           notifIndex === index ? { ...notif, status: "Readed", read: true } : notif
//         )
//       );
//     } catch (error) {
//       console.error("Failed to update notification status:", error);
//     }
//   };

//   return { matchingNotifications, handleReadMore };
// };
