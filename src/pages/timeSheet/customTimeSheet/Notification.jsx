export const Notification = async ({
  getEmail,
  Position,
  correctionMade,
  identify,
}) => {
  let hasSentEmail = false;

  const formatToDDMMYYYY = (inputDate) => {
    if (!inputDate) return "Invalid date";
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) return "Invalid date";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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

    // const fromAddress = `"Dear ${empName}" <timesheet_no-reply@adininworks.com>`;

    const fromAddress =
      identify === "HR"
        ? `"Dear HR" <timesheet_no-reply@adininworks.com>`
        : `"Dear ${empName}" <timesheet_no-reply@adininworks.com>`;

    const HRfromAddress = `<timesheet_no-reply@adininworks.com>`;
    const toAddress =
      Position === "Manager"
        ? getEmail?.TimeKeeperDetails?.officialEmail
        : getEmail?.ManagerDetails?.officialEmail;

    const url = "https://hr.adininworks.co/login";
    const hrEmailID = "hr-timesheet@adininworks.com";
    let subject = "";
    let message = "";

    if (identify === "General" && correctionMade && Position !== "Manager") {
      subject = `Corrected Time Sheet Submitted for Approval`;
      message = `
  <html>
    <body>
      <p>Dear ${getEmail?.ManagerDetails?.name},</p>
      <p>The corrected ${getEmail?.TimeSheetData?.fileType} timesheet for the period from ${fromDate} until ${untilDate} has been submitted by Timekeeper ${getEmail?.TimeKeeperDetails?.name}
      </p>
      
      <p>Click here <a href="${url}">${url}</a> to Review and update the Status.</p>
      
   
    </body>
  </html>
`;
    } else if (identify === "HR" && correctionMade && Position !== "Manager") {
      subject = `Corrected Time Sheet Submitted for Approval`;
      message = `
  <html>
    <body>
      <p>Dear HR,</p>
      <p>The corrected ${getEmail?.TimeSheetData?.fileType} timesheet for the period from ${fromDate} until ${untilDate} has been submitted by Timekeeper ${getEmail?.TimeKeeperDetails?.name}
      </p>
      
      <p>Click here <a href="${url}">${url}</a> to review the status.</p>
      
   
    </body>
  </html>
`;
    } else if (Position === "Manager" && identify === "General") {
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
            } timesheet for the period ${fromDate} to ${untilDate} has been ${status} by Manager : ${
        getEmail?.ManagerDetails?.name
      }.</p>   
            ${
              status === "Rejected"
                ? `<p>Click here <a href="${url}">${url}</a> to review and make the necessary corrections.</p>`
                : `<p>Click here <a href="${url}">${url}</a> to check the status.</p>`
            }       
          </body>
        </html>
      `;
    } else if (Position === "Manager" && identify === "HR") {
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
            <p>Dear HR,</p>
            <p>${
              getEmail?.TimeSheetData?.fileType
            } timesheet for the period ${fromDate} to ${untilDate} has been ${status} by Manager : ${
        getEmail?.ManagerDetails?.name
      }.</p>
           
             
            ${
              status === "Rejected"
                ? `<p>Click here <a href="${url}">${url}</a> to check the status.</p>`
                : `<p>Click here <a href="${url}">${url}</a> to check the status.</p>`
            }       
          </body>
        </html>
      `;
    } else if (Position !== "Manager" && identify === "General") {
      subject = `${getEmail?.TimeSheetData?.fileType} Time Sheet Submitted for Approval`;
      message = `
        <html>
          <body>
            <p>Dear ${getEmail?.ManagerDetails?.name},</p>
            <p>The ${getEmail?.TimeSheetData?.fileType} timesheet for the period from ${fromDate} until ${untilDate} has been submitted by Timekeeper 
           ${getEmail?.TimeKeeperDetails?.name}</p>
                   
            <p>Click here <a href="${url}">${url}</a> to review and update the status.</p>   
          </body>
        </html>
      `;
    } else if (Position !== "Manager" && identify === "HR") {
      subject = `${getEmail?.TimeSheetData?.fileType} Time Sheet Submitted for Approval`;
      message = `
        <html>
          <body>
            <p>Dear HR,</p>
            <p>The ${getEmail?.TimeSheetData?.fileType} timesheet for the period from ${fromDate} until ${untilDate} has been submitted by Timekeeper 
           ${getEmail?.TimeKeeperDetails?.name}</p>
                   
            <p>Click here <a href="${url}">${url}</a> to review the status.</p>   
          </body>
        </html>
      `;
    }

    hasSentEmail = true;

    const empID =
      Position === "Manager"
        ? getEmail?.TimeKeeperDetails?.empID
        : getEmail?.ManagerDetails?.empID;
    const timeKeeperEmpID = getEmail?.TimeKeeperDetails?.empID;
    const ManagerEmpID = getEmail?.TimeKeeperDetails?.empID;
    const managerName = getEmail?.ManagerDetails?.name;

    const fileType = getEmail?.TimeSheetData?.fileType;
    const timeKeeperName = getEmail?.TimeKeeperDetails?.name;

    const senderEmail = "timesheet_no-reply@adininworks.com";
    const sheetStatus =
      status === "Approved"
        ? "Approved"
        : status === "Rejected"
        ? "Rejected"
        : "";
    return {
      subject,
      message,
      fromAddress,
      toAddress,
      // toAddress: "sriramc2810@gmail.com",
      empID,
      timeKeeperEmpID,
      ManagerEmpID,
      managerName,
      fileType,
      timeKeeperName,
      fromDate,
      untilDate,
      senderEmail,
      sheetStatus,
    };
  } catch (error) {}
};
