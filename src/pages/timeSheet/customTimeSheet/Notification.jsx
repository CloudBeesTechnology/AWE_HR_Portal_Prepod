// import React, { useEffect } from "react";
// import { sendEmail } from "../../../services/EmailServices";

// export const Notification = ({ getEmail, Position }) => {
//   const currentDate = new Date().toLocaleDateString();

//   function formatToDDMMYYYY(inputDate) {
//     const date = new Date(inputDate);

//     // Check if the date is valid
//     if (isNaN(date.getTime())) {
//       return "Invalid date";
//     }

//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();

//     return `${day}/${month}/${year}`;
//   }

//   const fromDate = formatToDDMMYYYY(getEmail.TimeSheetData.trade);
//   const untilDate = formatToDDMMYYYY(getEmail.TimeSheetData.tradeCode);
//   const todayDate = formatToDDMMYYYY(currentDate);

//   if (!getEmail) return;

//     try {
//       // Construct email subject and message based on type
//       let subject = "";
//       let message = "";
//       let fromAddress = "timesheet_no-reply@adininworks.com";
//       let toAddress =
//         Position === "Manager"
//           ? getEmail.TimeKeeperDetails.officialEmail
//           : getEmail.ManagerDetails.officialEmail;
//       const url = "https://hr.adininworks.co/login";
//       console.log(getEmail.TimeSheetData);
//       if (Position !== "Manager") {
//         subject = `${getEmail.TimeSheetData.fileType} Time Sheet Submitted for Approval`;
//         message = `
//               Dear ${getEmail.ManagerDetails.name},
      
//               The ${getEmail.TimeSheetData.fileType} timesheet for ${getEmail.TimeKeeperDetails.name} has been submitted and is awaiting your approval.
      
//               Details:
//               Employee Name: ${getEmail.TimeKeeperDetails.name}
             
//               Time Period: ${fromDate} to ${untilDate}
//               Date Submitted: ${todayDate}
  
//               To review and approve the timesheet, please click the link below:
//               ${url}
  
//               Best regards,
//               The Timesheet Management Team
//             `;
//         //   Best regards,
//         //   The [Your Company] Team
//       } else if (Position === "Manager") {
//         subject = `${getEmail.TimeSheetData.fileType} Time Sheet Approved`;
//         message = `
//               Dear ${getEmail.TimeKeeperDetails.name},
      
//               Your submitted ${getEmail.TimeSheetData.fileType} timesheet  for the period ${getEmail.TimeSheetData.trade} to ${getEmail.TimeSheetData.tradeCode} has been approved by ${getEmail.ManagerDetails.name}.
      
//               Details:
//               Employee Name: ${getEmail.ManagerDetails.name}
             
//               Approval Date: ${todayDate}
      
//               Thank you for your prompt submission.
//               Best regards,
//               The Timesheet Management Team
//             `;
//         //   Best regards,
//         // The [Your Company] Team
//       } else {
//         console.error("Invalid email type specified.");
//         return;
//       }
//       console.log("Working...")
//           sendEmail(subject, message, fromAddress, "sriramc2810@gmail.com");
        
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   }
 
import React, { useEffect, useRef } from "react";
import { sendEmail } from "../../../services/EmailServices";

export const Notification = ({ getEmail, Position }) => {
  const currentDate = new Date().toLocaleDateString();
  const hasSentEmail = useRef(false); // Ref to track email sending

  function formatToDDMMYYYY(inputDate) {
    if (!inputDate) return "Invalid date"; // Handle null or undefined input
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // useEffect(() => {
    if (!getEmail || hasSentEmail.current) return; // Exit if email already sent or no data

    // const sendNotificationEmail = async () => {
      try {
        let subject = "";
        let message = "";
        const fromAddress = "timesheet_no-reply@adininworks.com";
        const toAddress =
          Position === "Manager"
            ? getEmail.TimeKeeperDetails.officialEmail
            : getEmail.ManagerDetails.officialEmail;

        const url = "https://hr.adininworks.co/login";
        const fromDate = formatToDDMMYYYY(getEmail.TimeSheetData.trade);
        const untilDate = formatToDDMMYYYY(getEmail.TimeSheetData.tradeCode);
        const todayDate = formatToDDMMYYYY(currentDate);

        if (Position === "Manager") {
          subject = `${getEmail.TimeSheetData.fileType} Time Sheet Approved`;
          message = `
            Dear ${getEmail.TimeKeeperDetails.name},
            
            Your submitted ${getEmail.TimeSheetData.fileType} timesheet for the period ${fromDate} to ${untilDate} has been approved by ${getEmail.ManagerDetails.name}.
            
            Details:
            Employee Name: ${getEmail.ManagerDetails.name}
            Approval Date: ${todayDate}
            
            Thank you for your prompt submission.
            
            Best regards,
            The Timesheet Management Team
          `;
        } else {
          subject = `${getEmail.TimeSheetData.fileType} Time Sheet Submitted for Approval`;
          message = `
            Dear ${getEmail.ManagerDetails.name},
            
            The ${getEmail.TimeSheetData.fileType} timesheet for ${getEmail.TimeKeeperDetails.name} has been submitted and is awaiting your approval.
            
            Details:
            Employee Name: ${getEmail.TimeKeeperDetails.name}
            Time Period: ${fromDate} to ${untilDate}
            Date Submitted: ${todayDate}
            
            To review and approve the timesheet, please click the link below:
            ${url}
            
            Best regards,
            The Timesheet Management Team
          `;
        }

        console.log("Sending Email...");
        sendEmail(subject, message, fromAddress, "sriramc2810@gmail.com");
        console.log("Email sent successfully!");
        hasSentEmail.current = true; // Mark email as sent
      } catch (error) {
        console.error("Error sending email:", error);
      }
    // };
// return ()=>{
//   sendNotificationEmail();
// }
   
//   }, []); // Add dependencies to avoid stale values
};



 

