
import { useEffect, useState } from "react";
import { listEmailNotifis } from "../../graphql/queries";
import { updateEmailNotifi } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { Popup } from "./Popup";
import { useNotification } from "../../hooks/useNotification";

export const Notifications = () => {
  const [listOfNotifications, setListOfNotifications] = useState([]);
  const [leaveOfNotifications, setLeaveOfNotifications] = useState([]);
  const [toggleForPopup, setToggleForPopup] = useState(false);
  const [userID, setUserID] = useState("");
  const [specificNotificationDetails, setSpecificNotificationDetails] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const client = generateClient();
const {emailNotifications}=useNotification();
console.log(emailNotifications);

  const toggleFunction = () => {
    setToggleForPopup(!toggleForPopup);
  };

  const sendToPopup = (notification, leaveData) => {
    setSpecificNotificationDetails(notification);
    setPopupData(leaveData);
  };

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await client.graphql({ query: listEmailNotifis });
        const notifications = response?.data?.listEmailNotifis?.items || [];

        const filteredNotifications = notifications.filter((notification) => {
          const recipientEmpID = notification.receipentEmpID?.trim().toLowerCase() || "";
          const loggedInUserID = userID?.trim().toLowerCase() || "";
          return recipientEmpID === loggedInUserID && recipientEmpID !== "";
        });

        const formattedNotifications = filteredNotifications.map((notification) => ({
          id: notification.id,
          empID: notification.empID,
          subject: notification.leaveType || "Notification",
          message: notification.message,
          date: new Date(notification.createdAt).toLocaleDateString(),
          status: notification.status || "New",
          read: notification.status === "Readed",
        }));

        setLeaveOfNotifications(formattedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (userID) {
      fetchNotifications();
    }
  }, [userID]);

  const handleReadMore = async (notification, index) => {
    try {
      console.log("handleReadMore called for notification:", notification);
  
      // Update the notification status in the backend
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
  
      console.log("Notification status updated in backend");
  
      // Update the notification status in local state
      setLeaveOfNotifications((prevNotifications) =>
        prevNotifications.map((notif, notifIndex) =>
          notifIndex === index
            ? { ...notif, status: "Readed", read: true }
            : notif
        )
      );
  
      console.log("Notification status updated in local state");
    } catch (error) {
      console.error("Failed to update notification status:", error);
    }
  };

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
            {leaveOfNotifications.map((notification, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="p-7">{notification.date}</td>
                <td className="p-7 text_size_6 text-dark_grey gap-5">
                  {notification.subject} <br />
                  <span className="text-sm text-dark_ash">{notification.message}...</span>
                </td>
                <td className="pr-14">
                  <span
                    className="border-b-2 py-1 cursor-pointer"
                    onClick={() => {
                      toggleFunction();
                      sendToPopup(notification);
                      handleReadMore(notification, index)
                    }}
                    // onClick={() => handleReadMore(notification, index)}
                  >
                    Read More
                  </span>
                </td>
                <td className="px-4">
                  {notification.read ? (
                    <div className="mt-3.5 w-[60px] label-read">
                      <span className="flex justify-center items-center text-grey">Readed</span>
                    </div>
                  ) : (
                    <div className="mt-3.5 w-[60px] border label-new bg-blue-500">
                      <span className="flex justify-center items-center text-white">New</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toggleForPopup && (
        <Popup
          toggleFunction={toggleFunction}
          specificNotificationDetails={specificNotificationDetails}
          popupData={popupData}
        />
      )}
    </section>
  );
};
// import { useContext, useEffect, useState } from "react";
// import { listEmailNotifis, listEmpPersonalInfos } from "../../graphql/queries";
// import { updateEmailNotifi } from "../../graphql/mutations";
// import { DataSupply } from "../../utils/DataStoredContext";
// import { generateClient } from "@aws-amplify/api";
// import { Popup } from "./Popup";
// import { useNotification } from "../../hooks/useNotification";
// export const Notifications = () => {
//   const [listOfNotifications, setListOfNotifications] = useState([]);
//   const [leaveOfNotifications, setLeaveOfNotifications] = useState([]);
//   const [toggleForPopup, setToggleForPopup] = useState(false);
//   const [userID, setUserID] = useState("");
//   const [specificNotificationDetails, setSpecificNotificationDetails] =
//     useState();
//   const [popupData, setPopupData] = useState();
//   const [mergedData, setMergeData] = useState([]);
//   const client = generateClient();

//   const { emailNotifications } = useNotification();
//   const { empPIData,LMIData,PPValidsData,terminateData,EmpInsuranceData,piData, IDData,workInfoData,DNData } = useContext(DataSupply);

//   console.log(emailNotifications);

//   const toggleFunction = () => {
//     setToggleForPopup(!toggleForPopup);
//   };
//   const sendToPopup = (object, leave) => {
//     setSpecificNotificationDetails(object);
//     setPopupData(leave);
//   };

//   useEffect(() => {
//     const userID = localStorage.getItem("userID");
//     setUserID(userID);
//     // console.log("Navbar: User ID from localStorage:", userID);
//   }, []);

//   useEffect(() => {
//     const userID = localStorage.getItem("userID");
//     setUserID(userID);
//     // console.log(userID, "userid");
//   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const emailNotifis = await client.graphql({ query: listEmailNotifis });
//         const leaveNotification = emailNotifis?.data?.listEmailNotifis?.items;

//         // Log the receipentEmpID for debugging
//         // console.log(
//         //   "Leave Notifications (receipentEmpID):",
//         //   leaveNotification.map((notification) => notification.receipentEmpID)
//         // );

//         // Filter leave notifications for the logged-in user, ensuring recipientEmpID is not null or empty
//         const filteredLeaveNotifications = leaveNotification.filter(
//           (notification) => {
//             // Normalize both IDs to lowercase for case-insensitive comparison
//             const recipientEmpID = notification.receipentEmpID
//               ? notification.receipentEmpID.trim().toLowerCase()
//               : "";
//             const loggedInUserID = userID ? userID.trim().toLowerCase() : "";

//             // Log for debugging
//             // console.log(`Comparing: ${recipientEmpID} === ${loggedInUserID}`);

//             // Return the notification if recipientEmpID matches loggedInUserID and is not null or empty
//             return recipientEmpID === loggedInUserID && recipientEmpID !== ""; // Ensures valid recipientEmpID
//           }
//         );

//         // Log the filtered leave notifications
//         // console.log(
//         //   "Filtered Leave Notifications:",
//         //   filteredLeaveNotifications
//         // );

//         // Set leave notifications in the table
//         const additionalNotifications = filteredLeaveNotifications.map(
//           (notification) => ({
//             empID: notification.empID,
//             name: notification.name, // Adjust according to your data structure
//             subject: notification.leaveType,
//             message: notification.message,
//             date: new Date(notification.createdAt).toLocaleDateString(),
//             type: "Leave Notification",
//           })
//         );

//         setLeaveOfNotifications(additionalNotifications);
//       } catch (err) {
//         console.error("Error fetching data:", err.message);
//       }
//     };

//     fetchData();
//   }, [userID]);

//   // ---------------------------------------
//   const calculateNotificationDate = (expiryDate, monthsBefore) => {
//     const date = new Date(expiryDate);
//     date.setMonth(date.getMonth() - monthsBefore); // Adjust by the given number of months
//     return date; // Return the Date object
//   };

//   const calculateNotificationYear = (expiryDate, yearsBefore) => {
//     const date = new Date(expiryDate);
//     date.setFullYear(date.getFullYear() - yearsBefore); // Adjust by the given number of years
//     return date; // Return the Date object
//   };

//   useEffect(() => {    
//     const mergedData = empPIData.map((piData) => {
//         const mergeFields = [
//             IDData,
//             workInfoData,
//             terminateData,
//             DNData,
//             PPValidsData,
//             LMIData,
//             EmpInsuranceData
//         ];
        
//         const additionalData = mergeFields.reduce((acc, field) => {
//             const match = field.find((item) => item.empID === piData.empID) || {};
//             return { ...acc, ...match };
//         }, {});
        
//         return { ...piData, ...additionalData };
//     });

//     setMergeData(mergedData);
//     console.log("Merged Data:", mergedData);
// }, [empPIData, IDData, workInfoData, terminateData, DNData, PPValidsData, LMIData,piData, EmpInsuranceData]);

// useEffect(() => {
//     const today = new Date();

//     const generateNotifications = (emp, type, expiryField, title, subject, bufferDays) => {
//         const expiryDate = new Date(emp[expiryField]);
//         if (!expiryDate) return null;

//         const notificationDate = calculateNotificationDate(expiryDate, bufferDays);
//         if (today >= notificationDate && today <= expiryDate) {
//             return {
//                 empID: emp.empID,
//                 empBatchNo: emp.empBatchNo,
//                 name: emp.name,
//                 position: emp.position,
//                 department: emp.department,
//                 type,
//                 expiryDate: emp[expiryField],
//                 date: today.toLocaleDateString(),
//                 subject,
//                 title,
//                 nationality: emp.nationality,
//             };
//         }
//         return null;
//     };
    
//     const notifications = mergedData.flatMap((emp) => {
//         return [
//             generateNotifications(emp, "Probation", "ProbationaryEndDate", "Monthly Probation Expiry", "Probation Expiry", 1),
//             generateNotifications(emp, "Contract", "contractEndDate", "Monthly Contract Expiry", "Contract Expiry", 2),
//             generateNotifications(emp, "Employment Pass", "employmentPassExpiry", "Monthly Employment Pass Expiry", "Employment Pass Expiry", 1),
//             generateNotifications(emp, "Passport", "passportExpiry", "Monthly Passport Expiry", "Passport Expiry", 1),
//             generateNotifications(emp, "Brunei Medical", "bruneiMedicalExpiry", "Monthly Employment Pass Expiry", "Employment Medical Expiry", 3),
//         ].filter(Boolean); // Filter out null values
//     });

//     setListOfNotifications(notifications);
//     console.log(notifications);
    
// }, [mergedData]);

//   return (
//     <section className="p-10 bg-[#F7F8F4] shadow-md rounded-lg">
//       <div className=" bg-white rounded-2xl">
//         <div className=" mb-4">
//           <h2 className="text-lg font-semibold  pt-5 pl-16 text-dark_grey">
//             Notification
//           </h2>
//           <p className="border-b-2 border-[#959595] mt-4"></p>
//         </div>

//         <table className="w-full text-sm">
//           <thead className="text-grey">
//             <tr className="uppercase bg-[#F1F1F1]">
//               {/* <th className="p-5 w-10">
//                 <input type="checkbox" />
//               </th> */}
//               <th className="p-7 text-left">Date</th>
//               <th className="p-7 text-left">Subject</th>
//               {/* <th className="p-7 text-left">Title</th> */}
//               <th className="p-7  text-left">Action</th>
//               <th className="p-7  text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaveOfNotifications &&
//               leaveOfNotifications.map((notification, index) => (
//                 <tr key={index} className="border-b last:border-b-0 ">
//                   <td className="p-7">{notification.date}</td>
//                   <td className="p-7 text_size_6 text-dark_grey gap-5">
//                     {notification.subject} <br />
//                     <span className="text-sm text-dark_ash">
//                       {notification.message}...
//                     </span>
//                   </td>
//                   <td className="pr-14 ">
//                     <span
//                       className="border-b-2 py-1 cursor-pointer"
//                       onClick={() => {
//                         toggleFunction();
//                         sendToPopup(notification);
//                       }}
//                     >
//                       Read More
//                     </span>
//                   </td>
//                   <td className="px-4">
//                     <div className=" mt-3.5 w-[60px] border label-new ">
//                       <span className="flex justify-center items-center">
//                         New
//                       </span>
//                     </div>
//                   </td>
//                   {/* {notification.isNew && (   
//               <td className=" mt-3.5 w-[60px] border label-new ">
//                    <span className="flex justify-center items-center"> New</span>
//               </td>
//               )} */}
//                 </tr>
//               ))}
//           </tbody>

//           <tbody>
//             {listOfNotifications &&
//               listOfNotifications.map((notification1, index) => (
//                 <tr key={index} className="border-b last:border-b-0">
//                   <td className="p-7">{notification1.date}</td>
//                   <td className="p-7 text_size_6 text-dark_grey gap-5">
//                     {notification1.subject} <br />
//                     <span className="text-sm text-dark_ash">
//                       Please take immediate action to renew your{" "}
//                       {notification1.subject}...
//                     </span>
//                   </td>
//                   <td className="pr-14">
//                     <span
//                       className="border-b-2 py-1 cursor-pointer"
//                       onClick={() => {
//                         toggleFunction();
//                         sendToPopup(notification1);
//                         // Mark notification as read
//                         const updatedNotifications = [...listOfNotifications];
//                         updatedNotifications[index].read = true;
//                         setListOfNotifications(updatedNotifications);
//                       }}
//                     >
//                       Read More
//                     </span>
//                   </td>
//                   <td className="px-4">
//                     {notification1.read ? (
//                       // Show "Read" label for read notifications
//                       <div className="mt-3.5 w-[60px]  label-read">
//                         <span className="flex justify-center items-center text-grey">
//                           Readed
//                         </span>
//                       </div>
//                     ) : (
//                       // Show "New" label for unread notifications
//                       <div className="mt-3.5 w-[60px] border label-new bg-blue-500">
//                         <span className="flex justify-center items-center text-white">
//                           New
//                         </span>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
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
// // import { useContext, useEffect, useState } from "react";
// // import { listEmailNotifis } from "../../graphql/queries";
// // import { generateClient } from "@aws-amplify/api";
// // import { DataSupply } from "../../utils/DataStoredContext";
// // import { Popup } from "./Popup";
// // import { useNotification } from "../../hooks/useNotification";
// // import { updateEmailNotifi } from "../../graphql/mutations";

// // export const Notifications = () => {
// //   const [listOfNotifications, setListOfNotifications] = useState([]);
// //   const [leaveOfNotifications, setLeaveOfNotifications] = useState([]);
// //   const [toggleForPopup, setToggleForPopup] = useState(false);
// //   const [userID, setUserID] = useState("");
// //   const [specificNotificationDetails, setSpecificNotificationDetails] = useState();
// //   const [popupData, setPopupData] = useState();
// //   const client = generateClient();
// //   const [mergedData, setMergeData] = useState([]);

// //   const { emailNotifications } = useNotification();
// //   const {
// //     empPIData,
// //     LMIData,
// //     PPValidsData,
// //     terminateData,
// //     EmpInsuranceData,
// //     piData,
// //     IDData,
// //     workInfoData,
// //     DNData,
// //   } = useContext(DataSupply);

// //   // Set userID on component mount
// //   useEffect(() => {
// //     const userID = localStorage.getItem("userID");
// //     setUserID(userID);
// //   }, []);

// //   // Fetch notifications
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const emailNotifis = await client.graphql({ query: listEmailNotifis });
// //         const leaveNotification = emailNotifis?.data?.listEmailNotifis?.items;

// //         if (!leaveNotification) {
// //           console.log("No notifications found.");
// //           return;
// //         }

// //         // Filter notifications based on userID
// //         const filteredLeaveNotifications = leaveNotification.filter((notification) => {
// //           const recipientEmpID = notification.receipentEmpID
// //             ? notification.receipentEmpID.trim().toLowerCase()
// //             : "";
// //           const loggedInUserID = userID ? userID.trim().toLowerCase() : "";

// //           return recipientEmpID === loggedInUserID && recipientEmpID !== "";
// //         });

// //         // Process and format leave notifications
// //         const leaveNotificationsFormatted = filteredLeaveNotifications.map((notification) => ({
// //           empID: notification.empID,
// //           name: notification.name,
// //           subject: notification.leaveType,
// //           message: notification.message,
// //           date: new Date(notification.createdAt).toLocaleDateString(),
// //           type: "Leave Notification",
// //         }));

// //         setLeaveOfNotifications(leaveNotificationsFormatted);
// //       } catch (err) {
// //         console.error("Error fetching data:", err.message);
// //       }
// //     };

// //     fetchData();
// //   }, [userID]);

// //   // Merge employee data
// //   useEffect(() => {
// //     const mergedData = empPIData.map((piData) => {
// //       const mergeFields = [
// //         IDData,
// //         workInfoData,
// //         terminateData,
// //         DNData,
// //         PPValidsData,
// //         LMIData,
// //         EmpInsuranceData,
// //       ];

// //       const additionalData = mergeFields.reduce((acc, field) => {
// //         const match = field.find((item) => item.empID === piData.empID) || {};
// //         return { ...acc, ...match };
// //       }, {});

// //       return { ...piData, ...additionalData };
// //     });

// //     setListOfNotifications(mergedData);
// //     console.log("Merged Data:", mergedData);
// //   }, [
// //     empPIData,
// //     IDData,
// //     workInfoData,
// //     terminateData,
// //     DNData,
// //     PPValidsData,
// //     LMIData,
// //     piData,
// //     EmpInsuranceData,
// //   ]);

// //   const toggleFunction = () => {
// //     setToggleForPopup(!toggleForPopup);
// //   };

// //   const sendToPopup = (object) => {
// //     setSpecificNotificationDetails(object);
// //     setPopupData(object);
// //   };

// //   const calculateNotificationDate = (expiryDate, monthsBefore) => {
// //     const date = new Date(expiryDate);
// //     date.setMonth(date.getMonth() - monthsBefore);
// //     return date;
// //   };

// //   const calculateNotificationYear = (expiryDate, yearsBefore) => {
// //     const date = new Date(expiryDate);
// //     date.setFullYear(date.getFullYear() - yearsBefore);
// //     return date;
// //   };

// //   // Generate notification logic
// //   useEffect(() => {
// //     const today = new Date();

// //     const generateNotifications = (emp, type, expiryField, title, subject, bufferDays) => {
// //       const expiryDate = new Date(emp[expiryField]);
// //       if (!expiryDate) return null;

// //       const notificationDate = calculateNotificationDate(expiryDate, bufferDays);
// //       if (today >= notificationDate && today <= expiryDate) {
// //         return {
// //           empID: emp.empID,
// //           empBatchNo: emp.empBatchNo,
// //           name: emp.name,
// //           position: emp.position,
// //           department: emp.department,
// //           type,
// //           expiryDate: emp[expiryField],
// //           date: today.toLocaleDateString(),
// //           subject,
// //           title,
// //           nationality: emp.nationality,
// //         };
// //       }
// //       return null;
// //     };
// //     const notifications = mergedData
// //     .map((emp) => {
// //       // Generate the notifications for the current employee
// //       const employeeNotifications = [
// //         generateNotifications(emp, "Probation", "ProbationaryEndDate", "Monthly Probation Expiry", "nationality", 1),
// //         generateNotifications(emp, "Contract", "contractEndDate", "nationality", "Contract Expiry", 2),
// //         generateNotifications(emp, "Employment Pass", "employmentPassExpiry", "Monthly Employment Pass Expiry", "Employment Pass Expiry", 1),
// //         generateNotifications(emp, "Passport", "passportExpiry", "Monthly Passport Expiry", "Passport Expiry", 1),
// //         generateNotifications(emp, "Brunei Medical", "bruneiMedicalExpiry", "Monthly Employment Pass Expiry", "Employment Medical Expiry", 3),
// //       ];
  
// //       // Filter out falsy values for this employee's notifications
// //       return employeeNotifications.filter(Boolean);
// //     })
// //     .reduce((acc, curr) => {
// //       // Flatten the array and accumulate the valid notifications
// //       return [...acc, ...curr];
// //     }, []); // Start with an empty array
  
// //   console.log(notifications);
// //   setListOfNotifications(notifications);
  
// //     console.log("Generated Notifications:", notifications);
// //   }, [mergedData]);


// //   const handleReadMore = async (notification, index) => {
// //     try {
// //       console.log("handleReadMore called for notification:", notification);
  
// //       // Update the notification status in the backend
// //       await client.graphql({
// //         query: updateEmailNotifi,
// //         variables: {
// //           input: {
// //             id: notification.id,
// //             status: "Readed",
// //             empID: notification.empID,
// //           },
// //         },
// //       });
  
// //       console.log("Notification status updated in backend");
  
// //       // Update the notification status in local state
// //       setLeaveOfNotifications((prevNotifications) =>
// //         prevNotifications.map((notif, notifIndex) =>
// //           notifIndex === index
// //             ? { ...notif, status: "Readed", read: true }
// //             : notif
// //         )
// //       );
  
// //       console.log("Notification status updated in local state");
// //     } catch (error) {
// //       console.error("Failed to update notification status:", error);
// //     }
// //   };

// //   return (
// //     <section className="p-10 bg-[#F7F8F4] shadow-md rounded-lg">
// //       <div className=" bg-white rounded-2xl">
// //         <div className=" mb-4">
// //           <h2 className="text-lg font-semibold pt-5 pl-16 text-dark_grey">Notification</h2>
// //           <p className="border-b-2 border-[#959595] mt-4"></p>
// //         </div>

// //         <table className="w-full text-sm">
// //           <thead className="text-grey">
// //             <tr className="uppercase bg-[#F1F1F1]">
// //               <th className="p-7 text-left">Date</th>
// //               <th className="p-7 text-left">Subject</th>
// //               <th className="p-7 text-left">Action</th>
// //               <th className="p-7 text-left">Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {leaveOfNotifications &&
// //               leaveOfNotifications.map((notification, index) => (
// //                 <tr key={index} className="border-b last:border-b-0">
// //                   <td className="p-7">{notification.date}</td>
// //                   <td className="p-7 text_size_6 text-dark_grey gap-5">
// //                     {notification.subject} <br />
// //                     <span className="text-sm text-dark_ash">
// //                       {notification.message}...
// //                     </span>
// //                   </td>
// //                   <td className="pr-14">
// //                     <span
// //                       className="border-b-2 py-1 cursor-pointer"
// //                       onClick={() => {
// //                         toggleFunction();
// //                         sendToPopup(notification);
// //                         handleReadMore(notification, index)

// //                       }}
// //                     >
// //                       Read More
// //                     </span>
// //                   </td>
// //                   <td className="px-4">
// //                     <div className="mt-3.5 w-[60px] border label-new">
// //                       <span className="flex justify-center items-center">New</span>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //           </tbody>

// //           <tbody>
// //             {listOfNotifications &&
// //                leaveOfNotifications.map((notification, index) => (
// //                 <tr key={index} className="border-b last:border-b-0">
// //                   <td className="p-7">{notification.date}</td>
// //                   <td className="p-7 text_size_6 text-dark_grey gap-5">
// //                     {notification.subject} <br />
// //                     <span className="text-sm text-dark_ash">{notification.message}...</span>
// //                   </td>
// //                   <td className="pr-14">
// //                     <span
// //                       className="border-b-2 py-1 cursor-pointer"
// //                       onClick={() => {
// //                         toggleFunction();
// //                         sendToPopup(notification);
// //                         handleReadMore(notification, index)
// //                       }}
// //                     >
// //                       Read More
// //                     </span>
// //                   </td>
// //                   <td className="px-4">
// //                     <div className="mt-3.5 w-[60px] border label-new">
// //                       <span className="flex justify-center items-center">New</span>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //           </tbody>
// //         </table>
// //       </div>
// //       {toggleForPopup && (
// //         <Popup
// //           toggleFunction={toggleFunction}
// //           specificNotificationDetails={specificNotificationDetails}
// //           popupData={popupData}
// //         />
// //       )}
// //     </section>
// //   );
// // };
