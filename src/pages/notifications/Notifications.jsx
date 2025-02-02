import { Popup } from "./Popup";
import { useNotifiCenter } from "../../hooks/useNotifiCenter";
import { useState } from "react";

export const Notifications = () => {
  const { matchingNotifications, handleReadMore } = useNotifiCenter(); // Use hook to fetch notifications
  // console.log(matchingNotifications, "Not");
  
  const [toggleForPopup, setToggleForPopup] = useState(false);
  const [specificNotificationDetails, setSpecificNotificationDetails] = useState(null);

  if (matchingNotifications.length === 0) {
    return (
      <section className="p-10 bg-[#F7F8F4] shadow-md min-h-screen rounded-lg">
        <div className="bg-white rounded-2xl min-h-screen">
          <div className="mb-4">
            <h2 className="text-lg font-semibold pt-5 pl-16 text-dark_grey">Notification</h2>
            <p className="border-b-2 border-[#959595] mt-4"></p>
          </div>
          <div className="text-center p-7 mt-20">
            <span>No Notifications Found</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-10 bg-[#F7F8F4] shadow-md rounded-lg">
      <div className="bg-white rounded-2xl">
        <div className="mb-4">
          <h2 className="text-lg font-semibold pt-5 pl-16 text-dark_grey">Notification</h2>
          <p className="border-b-2 border-[#959595] mt-4"></p>
        </div>

        <table className="w-full text-sm">
          <thead className="text-grey">
            <tr className="uppercase bg-[#F1F1F1]">
              <th className="p-7 text-left">Date</th>
              <th className="p-7 text-left">Subject</th>
              <th className="p-7 text-left">Action</th>
              <th className="p-7 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {matchingNotifications.map((notification, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="p-7 w-[150px]">{notification.date}</td>
                <td className="p-7 text_size_6 text-dark_grey flex flex-col gap-y-3">
                  {notification.subject} <br />
                  <span className="text-sm text-dark_ash">{notification.message}...</span>
                </td>
                <td className="text-center">
                  <span
                    className="border-b-2 py-1 cursor-pointer"
                    onClick={() => {
                      setToggleForPopup(true);
                      setSpecificNotificationDetails(notification);
                      handleReadMore(notification, index);
                    }}
                  >
                    Read More
                  </span>
                </td>
                <td className="px-4 text-center">
                  {notification.read ? (
                    <div className="mt-3.5 w-[60px] label-read">
                      <span className="flex justify-center items-center text-grey">Seen</span>
                    </div>
                  ) : (
                    <div className="mt-3.5 w-[60px] border label-new">
                      <span className="flex justify-center items-center text-white">New</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toggleForPopup && specificNotificationDetails && (
        <Popup
          toggleFunction={() => setToggleForPopup(false)}
          specificNotificationDetails={specificNotificationDetails}
        />
      )}
    </section>
  );

};


// import { useContext, useEffect, useState } from "react";
// import { listEmailNotifis, listLeaveStatuses } from "../../graphql/queries";
// import { updateEmailNotifi } from "../../graphql/mutations";
// import { generateClient } from "@aws-amplify/api";
// import { Popup } from "./Popup";
// import { useNotification } from "../../hooks/useNotification";
// import { DataSupply } from "../../utils/DataStoredContext";
// import { format } from "date-fns";

// export const Notifications = () => {
//   const { empPIData, EmailNotifi } = useContext(DataSupply);
//   const [matchingNotifications, setMatchingNotifications] = useState([]);
//   const [toggleForPopup, setToggleForPopup] = useState(false);
//   const [userID, setUserID] = useState("");
//   const [userType, setUserType] = useState("");
//   const [specificNotificationDetails, setSpecificNotificationDetails] = useState(null);
//   const client = generateClient();
//   const { emailNotifications } = useNotification();

//   useEffect(() => {
//     const storedUserID = localStorage.getItem("userID");
//     setUserID(storedUserID);
//     const storedUserType = localStorage.getItem("userType");
//     setUserType(storedUserType);
//   }, []);

//   useEffect(() => {
//     if (userID && Array.isArray(empPIData)) {
//       const matched = empPIData.find((item) => item.empID === userID);
//       if (matched && Array.isArray(EmailNotifi)) {
//         const notifications = EmailNotifi.filter(
//           (notification) => notification.receipentEmail === matched.officialEmail
//         );

//         const formattedNotifications = notifications
//           .filter((notification) => notification.leaveType === null)
//           .map((notification) => {
//             // Extract the first part of the message as the subject
//             const extractedSubject = notification.message?.split(" - ")[0] || notification.subject;
//             // const extractedMessage = notification.message?.split(".")[0] || notification.message;

//             return {
//               ...notification,
//               subject: extractedSubject, // Use extracted subject
//               // message: extractedMessage,
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
  
//       // Filter HR notifications where leaveType is null
//       const formattedHRNotifications = hrNotifications
//         .filter((notification) => notification.leaveType === null)
//         .map((notification) => {
//           // Extract the first part of the message as the subject
//           const extractedSubject = notification.message?.split(" - ")[0] || notification.subject;
//           // const extractedMessage = notification.message?.split(".")[0] || notification.message;

//           return {
//             ...notification,
//             subject: extractedSubject, // Use extracted subject
//             // message: extractedMessage,
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

//   if (matchingNotifications.length === 0) {
//     return (
//       <section className="p-10 bg-[#F7F8F4] shadow-md min-h-screen rounded-lg">
//         <div className="bg-white rounded-2xl min-h-screen">
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold pt-5 pl-16 text-dark_grey">Notification</h2>
//             <p className="border-b-2 border-[#959595] mt-4"></p>
//           </div>
//           <div className="text-center p-7 mt-20">
//             <span>No Notifications Found</span>
//           </div>
//         </div>
//       </section>
//     );
//   }
//   return (
//     <section className="p-10 bg-[#F7F8F4] shadow-md rounded-lg">
//       <div className="bg-white rounded-2xl">
//         <div className="mb-4">
//           <h2 className="text-lg font-semibold pt-5 pl-16 text-dark_grey">Notification</h2>
//           <p className="border-b-2 border-[#959595] mt-4"></p>
//         </div>

//         <table className="w-full text-sm">
//           <thead className="text-grey">
//             <tr className="uppercase bg-[#F1F1F1]">
//               <th className="p-7 text-left">Date</th>
//               <th className="p-7 text-left">Subject</th>
//               <th className="p-7 text-left">Action</th>
//               <th className="p-7 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {matchingNotifications.map((notification, index) => (
//               <tr key={index} className="border-b last:border-b-0">
//                 <td className="p-7 w-[150px]">{notification.date}</td>
//                 <td className="p-7 text_size_6 text-dark_grey flex flex-col gap-y-3">
//                   {notification.subject} <br />
//                   <span className="text-sm text-dark_ash">{notification.message}...</span>
//                 </td>
//                 <td className="text-center">
//                   <span
//                     className="border-b-2 py-1 cursor-pointer"
//                     onClick={() => {
//                       setToggleForPopup(true);
//                       setSpecificNotificationDetails(notification);
//                       handleReadMore(notification, index);
//                     }}
//                   >
//                     Read More
//                   </span>
//                 </td>
//                 <td className="px-4 text-center">
//                   {notification.read ? (
//                     <div className="mt-3.5 w-[60px] label-read">
//                       <span className="flex justify-center items-center text-grey">Readed</span>
//                     </div>
//                   ) : (
//                     <div className="mt-3.5 w-[60px] border label-new">
//                       <span className="flex justify-center items-center text-white">New</span>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {toggleForPopup && specificNotificationDetails && (
//         <Popup
//           toggleFunction={() => setToggleForPopup(false)}
//           specificNotificationDetails={specificNotificationDetails}
//         />
//       )}
//     </section>
//   );
// };



// import { useContext, useEffect, useState } from "react";
// import { listEmailNotifis,listLeaveStatuses } from "../../graphql/queries";
// import { updateEmailNotifi } from "../../graphql/mutations";
// import { generateClient } from "@aws-amplify/api";
// import { Popup } from "./Popup";
// import { useNotification } from "../../hooks/useNotification";
// import { DataSupply } from "../../utils/DataStoredContext";
// import { parse, format, isValid } from "date-fns";

// export const Notificationsss = () => {
//   const { empPIData,EmailNotifi ,IDData,DNData,LMIData,workInfoData,PPValidsData } = useContext(DataSupply);
//     console.log(EmailNotifi);
    
//   const [matchedData, setMatchedData] = useState(null);
//   const [matchingNotifications, setMatchingNotifications] = useState([]);
//   const [leaveOfNotifications, setLeaveOfNotifications] = useState([]);
//   const [toggleForPopup, setToggleForPopup] = useState(false);
//   const [userID, setUserID] = useState("");
//   const [userType, setUserType] = useState("");
//   const [specificNotificationDetails, setSpecificNotificationDetails] = useState(null);
//   const [popupData, setPopupData] = useState(null);
//   const client = generateClient();
//   const {emailNotifications}=useNotification();
// //console.log(emailNotifications);

//   const toggleFunction = () => {
//     setToggleForPopup(!toggleForPopup);
//   };

//   const sendToPopup = (notification, leaveData) => {
//     setSpecificNotificationDetails(notification);
//     setPopupData(leaveData);
//   };

//   useEffect(() => {
//     const storedUserID = localStorage.getItem("userID");
//     setUserID(storedUserID);
//     // console.log(storedUserID);
//     const storedUserType = localStorage.getItem("userType"); // Retrieve userType from localStorage
//     setUserType(storedUserType); // Set userType state
//     // console.log(storedUserType);
//   }, []);

//   useEffect(() => {
//     if (userID && Array.isArray(empPIData)) {
//       const matched = empPIData.find((item) => item.empID === userID);
//       if (matched) {
//         setMatchedData(matched.officialEmail);
  
//         if (Array.isArray(EmailNotifi)) {
//           const notifications = EmailNotifi.filter(
//             (notification) => notification.receipentEmail === matched.officialEmail
//           );
  
//           // Filter notifications where leaveType is null
//           const formattedNotifications = notifications
//             .filter((notification) => notification.leaveType === null)
//             .map((notification) => {
//               const formattedDate = format(new Date(notification.createdAt), "dd MMM yyyy , hh:mm a");
//               return {
//                 id: notification.id,
//                 empID: notification.empID,
//                 subject: notification.leaveType || "Notification",
//                 receipentEmail: notification.receipentEmail,
//                 senderEmail: notification.senderEmail,
//                 reason: notification.leaveStatus?.reason,
//                 message: notification.message,
//                 date: formattedDate,
//                 status: notification.status || "New",
//                 read: notification.status === "Readed",
//               };
//             });
  
//           setMatchingNotifications(formattedNotifications);
//         }
//       } else {
//         setMatchingNotifications([]); // Clear notifications if no match
//       }
//     }
  
//     const hrEmail = "hr_no-reply@adininworks.com" || "hr-expiry@adininworks.com" ||"Hr-notification@adininworks.com";
  
//     if (userType === "HR") {
//       const hrNotifications =
//         EmailNotifi?.filter((notification) => notification.receipentEmail === hrEmail) || [];
  
//       // Filter HR notifications where leaveType is null
//       const formattedHRNotifications = hrNotifications
//         .filter((notification) => notification.leaveType === null)
//         .map((notification) => {
//           const formattedDate = format(new Date(notification.createdAt), "dd MMM yyyy , hh:mm a");
//           return {
//             id: notification.id,
//             empID: notification.empID,
//             subject: notification.leaveType || "Notification",
//             receipentEmail: notification.receipentEmail,
//             senderEmail: notification.senderEmail,
//             reason: notification.leaveStatus?.reason,
//             message: notification.message,
//             date: formattedDate,
//             status: notification.status || "New",
//             read: notification.status === "Readed",
//           };
//         });
  
//       setMatchingNotifications((prev) => [...prev, ...formattedHRNotifications]);
//     }
//   }, [userID, empPIData, EmailNotifi, userType, IDData, DNData, LMIData, workInfoData, PPValidsData]);
  
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const responseNotifications = await client.graphql({ query: listEmailNotifis });
//         const notifications = responseNotifications?.data?.listEmailNotifis?.items || [];
//         // Filter notifications based on logged-in user ID
//         const filteredNotifications = notifications.filter((notification) => {
//         const recipientEmpID = notification.receipentEmpID?.trim().toLowerCase() || "";
//         const loggedInUserID = userID?.trim().toLowerCase() || "";
//         return recipientEmpID === loggedInUserID && recipientEmpID !== "";
//         });
//         console.log(filteredNotifications);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };
  
//     fetchNotifications();
//   }, [userID]);
  
//   const handleReadMore = async (notification, index) => {
//     try {
//       console.log("handleReadMore called for notification:", notification);
  
//       // Update the notification status in the backend
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
  
//       console.log("Notification status updated in backend");
  
//       // Update the notification status in local state
//       setLeaveOfNotifications((prevNotifications) =>
//         prevNotifications.map((notif, notifIndex) =>
//           notifIndex === index
//             ? { ...notif, status: "Readed", read: true }
//             : notif
//         )
//       );
  
//       console.log("Notification status updated in local state");
//     } catch (error) {
//       console.error("Failed to update notification status:", error);
//     }
//   };

//   return (
//     <section className="p-10 bg-[#F7F8F4] shadow-md rounded-lg">
//       <div className="bg-white rounded-2xl">
//         <div className="mb-4">
//           <h2 className="text-lg font-semibold pt-5 pl-16 text-dark_grey">Notification</h2>
//           <p className="border-b-2 border-[#959595] mt-4"></p>
//         </div>

//         <table className="w-full text-sm">
//           <thead className="text-grey">
//             <tr className="uppercase bg-[#F1F1F1]">
//               <th className="p-7 text-left">Date</th>
//               <th className="p-7 text-left">Subject</th>
//               <th className="p-7 text-left">Action</th>
//               <th className="p-7 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {matchingNotifications.map((notification, index) => (
//               <tr key={index} className="border-b last:border-b-0">
//                 <td className="p-7">{notification.date}</td>
//                 <td className="p-7 text_size_6 text-dark_grey gap-5">
//                   {notification.subject} <br />
//                   <span className="text-sm text-dark_ash">{notification.message}...</span>
//                 </td>
//                 <td className="text-center ">
//                   <span
//                     className="border-b-2 py-1 cursor-pointer"
//                     onClick={() => {
//                       toggleFunction();
//                       sendToPopup(notification);
//                       handleReadMore(notification, index)
//                     }}
//                     // onClick={() => handleReadMore(notification, index)}
//                   >
//                     Read More
//                   </span>
//                 </td>
//                 <td className="px-4 text-center">
//                   {notification.read ? (
//                     <div className="mt-3.5 w-[60px] label-read">
//                       <span className="flex justify-center items-center text-grey">Readed</span>
//                     </div>
//                   ) : (
//                     <div className="mt-3.5 w-[60px] border label-new bg-blue-500">
//                       <span className="flex justify-center items-center text-white">New</span>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div> 
//       {toggleForPopup && (
//         <Popup
//           toggleFunction={toggleFunction}
//           specificNotificationDetails={specificNotificationDetails}
//           popupData={popupData}
//         />
//       )}
//     </section>
//   );
// };
