import { useContext, useEffect, useState } from "react";
import { listEmailNotifis,listLeaveStatuses } from "../../graphql/queries";
import { updateEmailNotifi } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { Popup } from "./Popup";
import { useNotification } from "../../hooks/useNotification";
import { DataSupply } from "../../utils/DataStoredContext";
import { parse, format, isValid } from "date-fns";

export const Notifications = () => {
  const { empPIData,EmailNotifi ,IDData,DNData,LMIData,workInfoData,PPValidsData } = useContext(DataSupply);
    
  const [matchedData, setMatchedData] = useState(null);
  const [matchingNotifications, setMatchingNotifications] = useState([]);
  const [leaveOfNotifications, setLeaveOfNotifications] = useState([]);
  const [toggleForPopup, setToggleForPopup] = useState(false);
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [specificNotificationDetails, setSpecificNotificationDetails] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const client = generateClient();
  const {emailNotifications}=useNotification();
//console.log(emailNotifications);

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
    // console.log(storedUserID);
    const storedUserType = localStorage.getItem("userType"); // Retrieve userType from localStorage
    setUserType(storedUserType); // Set userType state
    // console.log(storedUserType);
  }, []);

useEffect(() => {

  if (userID && Array.isArray(empPIData)) {
    const matched = empPIData.find((item) => item.empID === userID);
    if (matched) {
      setMatchedData(matched.officialEmail);
      // console.log("Official Email:", matched.officialEmail);

      if (Array.isArray(EmailNotifi)) {
        const notifications = EmailNotifi.filter(
          (notification) => notification.receipentEmail === matched.officialEmail
        );
        const formattedNotifications = notifications.map((notification) => {
          const formattedDate = format(new Date(notification.createdAt), "dd MMM yyyy , hh:mm a");
          return {
            id: notification.id,
            empID: notification.empID,
            subject: notification.leaveType || "Notification",
            receipentEmail: notification.receipentEmail,
            senderEmail: notification.senderEmail,
            reason: notification.leaveStatus?.reason,
            message: notification.message,
            date: formattedDate,
            status: notification.status || "New",
            read: notification.status === "Readed",
          };
        });
        setMatchingNotifications(formattedNotifications);
        // console.log("Matching recipient Email:", formattedNotifications);
      }
    } else {
      // console.log("No match found for userID:", userID);
      setMatchingNotifications([]); // Clear notifications if no match
    }
  }

  const hrEmail = "hr_no-reply@adininworks.com";

  if (userType === "HR") {
    // Filter notifications based on HR email
    // const hrNotifications = EmailNotifi?.filter(
    //   (notification) => notification.receipentEmail === hrEmail
    // ) || []; // Defaults to empty array if EmailNotifi is null or undefined

    // if (hrNotifications.length > 0) {
    //   // console.log("HR Notifications:", hrNotifications);
    //   const formattedHRNotifications = hrNotifications.map((notification) => {
    //     const formattedDate = format(new Date(notification.createdAt), "dd MMM yyyy , hh:mm a");
    //     return {
    //       id: notification.id,
    //       empID: notification.empID,
    //       subject: notification.leaveType || "Notification",
    //       receipentEmail: notification.receipentEmail,
    //       senderEmail: notification.senderEmail,
    //       reason: notification.leaveStatus?.reason,
    //       message: notification.message,
    //       date: formattedDate,
    //       status: notification.status || "New",
    //       read: notification.status === "Readed",
    //     };
    //   });
    //   setMatchingNotifications((prev) => [...prev, ...formattedHRNotifications]);
    // } else {
    //   console.log("No notifications found for HR email:", hrEmail);
    // }

    if (Array.isArray(IDData)) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear()+1;
      const currentMonth = currentDate.getMonth(); // Months are 0-indexed in JavaScript
    
      const hrExpiryNotifications = IDData.filter((item) => {
        const expiryDate = Array.isArray(item.ppExpiry)
          ? new Date(item.ppExpiry[item.ppExpiry.length - 1]) // Use the last date in the ppExpiry array
          : new Date(item.ppExpiry); // Handle single expiry date
   
        return (
          expiryDate.getFullYear() === currentYear &&
          expiryDate.getMonth() === currentMonth
        );
      });
    
      if (hrExpiryNotifications.length > 0) {
        const formattedExpiryNotifications = hrExpiryNotifications.map((item) => {
          const formDate = format(new Date(item.createdAt), "dd MMM yyyy , hh:mm a");
          const expiryDate = Array.isArray(item.ppExpiry)
            ? item.ppExpiry[item.ppExpiry.length - 1]
            : item.ppExpiry;
    
          return {
            id: item.id,
            empID: item.empID,
            subject:"Passport Expiry",
            message: `Passport for EmpID: ${item.empID} is expiring soon: ${format(
              new Date(expiryDate),
              "dd MMM yyyy"
            )}. Please take action.`,
            date:formDate,
            dateExp: format(new Date(expiryDate), "dd MMM yyyy"),
          };
        });
    
        setMatchingNotifications((prev) => [...prev, ...formattedExpiryNotifications]);
        // console.log("HR Expiry Notifications:", formattedExpiryNotifications);
      } else {
        console.log("No passport expiry notifications found for HR in the current month.");
      }
    }

    if (Array.isArray(DNData)) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // 0-indexed (January is 0)
      const currentYear = currentDate.getFullYear();
    
      // Calculate the target month and year exactly 3 months from now
      const threeMonthsAhead = new Date(currentYear, currentMonth + 3);
      const targetMonth = threeMonthsAhead.getMonth();
      const targetYear = threeMonthsAhead.getFullYear();
    
      // Filter all data that matches the target month and year
      const allDataForTargetMonth = DNData.filter((item) => {
        const datesArray = Array.isArray(item.nlmsEmpValid)
          ? item.nlmsEmpValid
          : [item.nlmsEmpValid]; // Normalize to an array for uniform processing
    
        // Check if any date in nlmsEmpValid falls in the target month and year
        return datesArray.some((date) => {
          const parsedDate = new Date(date);
          return (
            !isNaN(parsedDate) && // Ensure the date is valid
            parsedDate.getFullYear() === targetYear &&
            parsedDate.getMonth() === targetMonth
          );
        });
      });
    
      // Format and display all data for the target month
      if (allDataForTargetMonth.length > 0) {
        const formattedData = allDataForTargetMonth.map((item) => {
          const formDate = format(new Date(item.createdAt), "dd MMM yyyy , hh:mm a");
          const lastExpiryDate = Array.isArray(item.nlmsEmpValid)
            ? item.nlmsEmpValid[item.nlmsEmpValid.length - 1] // Use the last date if it's an array
            : item.nlmsEmpValid; // Single date
    
          return {
            id: item.id,
            empID: item.empID,
            subject:"LD Expiry",
            message: `Relevant data for EmpID: ${item.empID} with expiry on ${format(
              new Date(lastExpiryDate),
              "dd MMM yyyy"
            )}.`,
            date:formDate,
            dateExp: format(new Date(lastExpiryDate),"dd MMM yyyy")
          };
        });
    
        // Display the formatted data
        // console.log("All Data for Target Month:", formattedData);
    
        // Optional: Update state or UI
        setMatchingNotifications((prev) => [...prev, ...formattedData]);
      } else {
        console.log("No data found for the target month.");
      }
    }
    
    if (Array.isArray(workInfoData)) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); 
      const currentYear = currentDate.getFullYear();
    
      const threeMonthsAhead = new Date(currentYear, currentMonth + 1); 
      const targetMonth = threeMonthsAhead.getMonth();
      const targetYear = threeMonthsAhead.getFullYear();
      // Filter all data that matches the target month and year
      const allDataForTargetMonth = workInfoData.filter((item) => {
        const datesArray = Array.isArray(item.probationEnd)
          ? item.probationEnd
          : [item.probationEnd]; // Normalize to an array for uniform processing
    
        // Check if any date in probationEnd falls in the target month and year
        return datesArray.some((date) => {
          const parsedDate = new Date(date);
          return (
            !isNaN(parsedDate) && // Ensure the date is valid
            parsedDate.getFullYear() === targetYear &&
            parsedDate.getMonth() === targetMonth
          );
        });
      });
    
      // Format and display all data for the target month
      if (allDataForTargetMonth.length > 0) {
        const formattedData = allDataForTargetMonth.map((item) => {
          const formDate = format(new Date(item.createdAt), "dd MMM yyyy , hh:mm a");
          const datesArray = Array.isArray(item.probationEnd)
            ? item.probationEnd
            : [item.probationEnd];
    
          // Get the last date from the array that falls in the target month
          const lastExpiryDate = datesArray
            .map((date) => new Date(date))
            .filter(
              (parsedDate) =>
                !isNaN(parsedDate) &&
                parsedDate.getFullYear() === targetYear &&
                parsedDate.getMonth() === targetMonth
            )
            .pop(); // Take the last valid date for the month
    
          return {
            id: item.id,
            empID: item.empID,
            subject: "Probation Expiry",
            message: `Relevant data for EmpID: ${item.empID} with expiry on ${format(
              lastExpiryDate,
              "dd MMM yyyy"
            )}.`,
            date:formDate,
            dateExp: format(lastExpiryDate, "dd MMM yyyy"),
          };
        });
    
        // Display the formatted data
        // console.log("All Data for Target Month:", formattedData);
    
        // Optional: Update state or UI
        setMatchingNotifications((prev) => [...prev, ...formattedData]);
      } else {
        console.log("No data found for the target month.");
      }
    }
    
    if (Array.isArray(workInfoData)) {
      const currentDate = new Date();
      const targetDate = new Date(currentDate); // Clone the current date
      targetDate.setMonth(targetDate.getMonth() + 2); // Add 2 months
    
      const targetMonth = targetDate.getMonth(); // Target month
      const targetYear = targetDate.getFullYear(); // Target year
    
      // Filter data that matches the target month and year based on the last value in the contractEnd array
      const allDataForTargetMonth = workInfoData.filter((item) => {
        if (!item.contractEnd || !Array.isArray(item.contractEnd)) return false; // Skip invalid or non-array contractEnd
    
        const lastDateStr = item.contractEnd[item.contractEnd.length - 1]; // Use the last value
        const parsedDate = new Date(lastDateStr);
    
        return (
          !isNaN(parsedDate) && // Ensure the date is valid
          parsedDate.getFullYear() === targetYear &&
          parsedDate.getMonth() === targetMonth
        );
      });
    
      // Format and display all data for the target month
      if (allDataForTargetMonth.length > 0) {
        const formattedData = allDataForTargetMonth.map((item) => {
          const formDate = format(new Date(item.createdAt), "dd MMM yyyy , hh:mm a");
          const lastExpiryDate = item.contractEnd[item.contractEnd.length - 1]; // Use only the last value
    
          return {
            id: item.id,
            empID: item.empID,
            subject: "Contract Expiry",
            message: `Relevant data for EmpID: ${item.empID} with expiry on ${format(
              new Date(lastExpiryDate),
              "dd MMM yyyy"
            )}.`,
            date:formDate,
            dateExp: format(new Date(lastExpiryDate), "dd MMM yyyy"),
          };
        });
    
        // Update state or UI
        setMatchingNotifications((prev) => [...prev, ...formattedData]);
      } else {
        console.log("No data found for the target month.");
      }
    } else {
      console.error("workInfoData is not an array.");
    }
    
    if (Array.isArray(PPValidsData)) {
      const currentDate = new Date();
      const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1); 
      const targetMonth = targetDate.getMonth();
      const targetYear = targetDate.getFullYear();
    
      // Filter data that matches the target month and year based on the last date in empPassExp
      const allDataForTargetMonth = PPValidsData.filter((item) => {
        if (!item.empPassExp) return false; // Skip items without empPassExp
    
        const datesArray = Array.isArray(item.empPassExp)
          ? item.empPassExp
          : [item.empPassExp]; // Normalize to an array
    
        const lastDate = new Date(datesArray[datesArray.length - 1]); // Get the last date
        return (
          !isNaN(lastDate) && // Ensure the date is valid
          lastDate.getFullYear() === targetYear &&
          lastDate.getMonth() === targetMonth
        );
      });
    
      // Format and display all data for the target month
      if (allDataForTargetMonth.length > 0) {
        const formattedData = allDataForTargetMonth.map((item) => {
          const formDate = format(new Date(item.createdAt), "dd MMM yyyy , hh:mm a");
          const lastExpiryDate = Array.isArray(item.empPassExp)
            ? item.empPassExp[item.empPassExp.length - 1] // Use the last date
            : item.empPassExp; // Single date
    
          return {
            id: item.id,
            empID: item.empID,
            date:formDate,
            subject: "Pass Expiry",
            message: `Relevant data for EmpID: ${item.empID} with expiry on ${format(
              new Date(lastExpiryDate),
              "dd MMM yyyy"
            )}.`,
            dateExp: format(new Date(lastExpiryDate), "dd MMM yyyy"),
          };
        });
    
        setMatchingNotifications((prev) => [...prev, ...formattedData]);
      } else {
        console.log("No data found for the target month.");
      }
    } else {
      console.error("PPValidsData is not an array.");
    }

    if (Array.isArray(LMIData)) {
  const currentDate = new Date();
  const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3); 
  const targetMonth = targetDate.getMonth();
  const targetYear = targetDate.getFullYear();

  const allDataForTargetMonth = LMIData.filter((item) => {
    if (!item.bruneiME) {
      console.warn(`Missing bruneiME for item:`, item);
      return false; 
    }

    const datesArray = Array.isArray(item.bruneiME) ? item.bruneiME : [item.bruneiME]; // Normalize to an array

    // Parse each date in the array and validate
    const parsedDates = datesArray.map((dateStr) => {
      const parsedDate = parse(dateStr, "dd/MM/yyyy", new Date()); // Adjust the format based on input
      if (!isValid(parsedDate)) {
        console.warn(`Invalid date format detected in bruneiME:`, dateStr);
        return null;
      }
      return parsedDate;
    }).filter(Boolean); // Remove invalid dates

    if (parsedDates.length === 0) {
      return false; // Skip if no valid dates are found
    }

    const lastDate = parsedDates[parsedDates.length - 1]; // Get the last valid date
    return lastDate.getFullYear() === targetYear && lastDate.getMonth() === targetMonth;
  });

  if (allDataForTargetMonth.length > 0) {
    const formattedData = allDataForTargetMonth.map((item) => {
      const formDate = format(new Date(item.createdAt), "dd MMM yyyy , hh:mm a");
      const lastExpiryDate = Array.isArray(item.bruneiME)
        ? item.bruneiME[item.bruneiME.length - 1] // Use the last date
        : item.bruneiME; // Single date

      const parsedDate = parse(lastExpiryDate, "dd/MM/yyyy", new Date());
      return {
        id: item.id,
        empID: item.empID,
        subject: "Brunei ME Expiry",
        message: `Relevant data for EmpID: ${item.empID} with expiry on ${format(
          parsedDate,
          "dd MMM yyyy"
        )}.`,
        date:formDate,
        dateExp: format(parsedDate, "dd MMM yyyy"),
      };
    });

    // console.log("Formatted Data for Notifications:", formattedData);
    setMatchingNotifications((prev) => [...prev, ...formattedData]);
  } else {
    console.log("No data found for the target month.");
  }
    } else {
    console.error("LMIData is not an array or is undefined.");
    }

  }
}, [userID, empPIData, EmailNotifi, userType, IDData, DNData,LMIData,workInfoData,PPValidsData]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const responseNotifications = await client.graphql({ query: listEmailNotifis });
        const notifications = responseNotifications?.data?.listEmailNotifis?.items || [];
        // Filter notifications based on logged-in user ID
        const filteredNotifications = notifications.filter((notification) => {
        const recipientEmpID = notification.receipentEmpID?.trim().toLowerCase() || "";
        const loggedInUserID = userID?.trim().toLowerCase() || "";
        return recipientEmpID === loggedInUserID && recipientEmpID !== "";
        });
        console.log(filteredNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchNotifications();
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
            {matchingNotifications.map((notification, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="p-7">{notification.date}</td>
                <td className="p-7 text_size_6 text-dark_grey gap-5">
                  {notification.subject} <br />
                  <span className="text-sm text-dark_ash">{notification.message}...</span>
                </td>
                <td className="text-center ">
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
                <td className="px-4 text-center">
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