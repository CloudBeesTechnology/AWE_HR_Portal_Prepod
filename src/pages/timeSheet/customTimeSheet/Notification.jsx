export const Notification = async ({ getEmail, Position }) => {
  // Replace useRef with a regular variable
  let hasSentEmail = false; // Track email sending

  const formatToDDMMYYYY = (inputDate) => {
    if (!inputDate) return "Invalid date"; // Handle null or undefined input
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Exit if email already sent or no data
  if (!getEmail || hasSentEmail) return;

  try {
    const currentDate = new Date();
    const fromDate = formatToDDMMYYYY(getEmail?.TimeSheetData?.trade);
    const untilDate = formatToDDMMYYYY(getEmail?.TimeSheetData?.tradeCode);
    const todayDate = formatToDDMMYYYY(currentDate);

    const empName =
      Position === "Manager"
        ? getEmail?.TimeKeeperDetails?.name
        : getEmail?.ManagerDetails?.name;
    const fromAddress = `"Dear ${empName}" <timesheet_no-reply@adininworks.com>`;
    const toAddress =
      Position === "Manager"
        ? getEmail?.TimeKeeperDetails?.officialEmail
        : getEmail?.ManagerDetails?.officialEmail;

    const url = "https://hr.adininworks.co/login";

    let subject = "";
    let message = "";

    if (Position === "Manager") {
      subject = `${getEmail?.TimeSheetData?.fileType} Time Sheet Approved`;
      message = `
            Dear ${getEmail?.TimeKeeperDetails?.name},
            
            Your submitted ${getEmail?.TimeSheetData?.fileType} timesheet for the period ${fromDate} to ${untilDate} has been approved by ${getEmail?.ManagerDetails?.name}.
            
            Details:
            Employee Name: ${getEmail?.ManagerDetails?.name}
            Approval Date: ${todayDate}

            Thank you for your prompt submission.
            
            Best regards,
            The Timesheet Management Team
          `;
    } else {
      subject = `${getEmail?.TimeSheetData?.fileType} Time Sheet Submitted for Approval`;
      message = `
            Dear ${getEmail?.ManagerDetails?.name},
            
            The ${getEmail?.TimeSheetData?.fileType} timesheet for ${getEmail?.TimeKeeperDetails?.name} has been submitted and is awaiting your approval.
            
            Details:
            Employee Name: ${getEmail?.TimeKeeperDetails?.name}
            Time Period: From date ${fromDate} Until date ${untilDate}
            Date Submitted: ${todayDate}
            
            To review and approve the timesheet, please click the link below:
            ${url}
            
            Best regards,
            The Timesheet Management Team
          `;
    }
    hasSentEmail = true;
    console.log(subject, message, fromAddress, toAddress);
    return {
      subject,
      message,
      fromAddress,
      // toAddress:""
      toAddress,
    };
    // await sendEmail(subject, message, fromAddress, toAddress);
    // Mark email as sent
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
