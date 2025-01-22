export const Notification = async ({ getEmail, Position, correctionMade }) => {
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
    const fromDate = formatToDDMMYYYY(getEmail?.TimeSheetData?.fromDate);
    const untilDate = formatToDDMMYYYY(getEmail?.TimeSheetData?.untilDate);
    const todayDate = formatToDDMMYYYY(currentDate);
    const status = getEmail?.TimeSheetData?.status;
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

    if (correctionMade && Position !== "Manager") {
      subject = `Corrected Time Sheet Submitted for Approval`;
      message = `
  <html>
    <body>
      <p>Dear ${getEmail?.ManagerDetails?.name},</p>
      <p>The corrected ${getEmail?.TimeSheetData?.fileType} timesheet for ${getEmail?.TimeKeeperDetails?.name} has been resubmitted and is now awaiting your review and approval.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Employee: ${getEmail?.TimeKeeperDetails?.name}</li>
        <li>Period: ${fromDate} - ${untilDate}</li>
        <li>Resubmission Date: ${todayDate}</li>
      </ul>
      <p>To review and approve the corrected timesheet, please click the link below:</p>
      <p><a href="${url}">${url}</a></p>
      <p>Best regards,<br>The Timesheet Management Team</p>
    </body>
  </html>
`;
    } else if (Position === "Manager") {
      subject = `${getEmail?.TimeSheetData?.fileType} Time Sheet ${
        status === "Approved"
          ? "Approved"
          : status === "Rejected"
          ? "Rejected"
          : ""
      }`;
      message = `
        <html>
          <body>
            <p>Dear ${getEmail?.TimeKeeperDetails?.name},</p>
            <p>Your submitted ${
              getEmail?.TimeSheetData?.fileType
            } timesheet for the period ${fromDate} to ${untilDate} has been ${status} by ${
        getEmail?.ManagerDetails?.name
      }.</p>
            <p><strong>Details:</strong></p>
            <ul>
              <li>Manager Name: ${getEmail?.ManagerDetails?.name}</li>
              <li>${
                status === "Approved" ? "Approval" : "Rejection"
              } Date: ${todayDate}</li>
            </ul>
            ${
              status === "Rejected"
                ? "<p>Please review the timesheet and make the necessary corrections.</p>"
                : ""
            }
            <p>Best regards,<br>The Timesheet Management Team</p>
          </body>
        </html>
      `;
    } else {
      subject = `${getEmail?.TimeSheetData?.fileType} Time Sheet Submitted for Approval`;
      message = `
        <html>
          <body>
            <p>Dear ${getEmail?.ManagerDetails?.name},</p>
            <p>The ${getEmail?.TimeSheetData?.fileType} timesheet for ${getEmail?.TimeKeeperDetails?.name} has been submitted and is awaiting your approval.</p>
            <p><strong>Details:</strong></p>
            <ul>
              <li>Employee Name: ${getEmail?.TimeKeeperDetails?.name}</li>
              <li>Time Period: From date ${fromDate} Until date ${untilDate}</li>
              <li>Date Submitted: ${todayDate}</li>
            </ul>
            <p>To review and approve the timesheet, please click the link below:</p>
            <p><a href="${url}">${url}</a></p>
            <p>Best regards,<br>The Timesheet Management Team</p>
          </body>
        </html>
      `;
    }

    hasSentEmail = true;
    // console.log(subject, message, fromAddress, toAddress);
    return {
      subject,
      message,
      fromAddress,
      toAddress,
      // toAddress: "sriramc2810@gmail.com",
    };
    // await sendEmail(subject, message, fromAddress, toAddress);
  } catch (error) {
    // console.error("Error sending email:", error);
  }
};
