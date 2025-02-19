import React, { useState, useEffect, useContext } from "react";
import AweLogo from "../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import { SpinLogo } from "../../utils/SpinLogo";
import { useCreateNotification } from "../../hooks/useCreateNotification";
import { DataSupply } from "../../utils/DataStoredContext";
import { sendEmail } from "../../services/EmailServices";
import { DateFormat } from "../../utils/DateFormat";
import { useTempID } from "../../utils/TempIDContext";

export const ViewForm = ({
  handleClickForToggle,
  leaveData,
  ticketData,
  source,
  userType,
  personalInfo,
}) => {
  const { empPIData } = useContext(DataSupply);
  const { gmPosition, gmMail, GMEmpID } = useTempID();
  const [remark, setRemark] = useState("");
  const [notification, setNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [path, setPath] = useState("");
  const { handleUpdateLeaveStatus, handleUpdateTicketRequest } =
    useLeaveManage();
  const { createNotification } = useCreateNotification();

  const managerName = empPIData.find((val) => {
    const findingManagerName = leaveData?.managerEmpID === val.empID;
    return findingManagerName;
  });
  const supervisorName = empPIData.find((val) => {
    const findingSupervisorName = leaveData?.supervisorEmpID === val.empID;
    return findingSupervisorName;
  });

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[#339933]"
      : status === "Pending"
      ? "text-[#E8A317]"
      : "text-[#E8A317]";
  };

  const getHrStatusClass = (status) => {
    return status === "Not Eligible"
      ? "text-[red]"
      : status === "Verified"
      ? "text-[#339933]"
      : status === "Pending"
      ? "text-[#E8A317]"
      : "text-[#E8A317]";
  };

  const getGmStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[#339933]"
      : status === "Pending"
      ? "text-[#E8A317]"
      : "text-[#E8A317]";
  };

  console.log("GM MAIL", gmMail);
  
  const isValidDateFormat = (date) => {
    const datePatternSlash = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
    const datePatternDash = /^\d{4}-\d{2}-\d{2}$/;
    return datePatternSlash.test(date) || datePatternDash.test(date);
  };

  const handleUpdateStatus = async (status) => {
    const updateData = {};
    const ticketUpdatedData = {};
    const userType = localStorage.getItem("userType");
    const currentDate = new Date().toISOString();

    if (userType === "Manager") {
      updateData.managerStatus = status;
      updateData.managerRemarks = remark;
      updateData.managerDate = currentDate;
    } else if (userType === "Supervisor") {
      updateData.supervisorStatus = status;
      updateData.supervisorRemarks = remark;
      updateData.supervisorDate = currentDate;
    }

    // function DateFormat(isoString) {
    //   const date = new Date(isoString);
    //   const day = String(date.getDate()).padStart(2, "0");
    //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    //   const year = date.getFullYear();
    //   return `${day}/${month}/${year}`;
    // }

    // Handle Leave status update
    if (source === "LM") {
      const leavePeriod =
        leaveData.empLeaveSelectedFrom && leaveData.empLeaveSelectedTo
          ? isValidDateFormat(leaveData.empLeaveSelectedFrom) &&
            isValidDateFormat(leaveData.empLeaveSelectedTo)
            ? `${DateFormat(leaveData.empLeaveSelectedFrom)} to ${DateFormat(
                leaveData.empLeaveSelectedTo
              )}`
            : `${leaveData.empLeaveSelectedFrom} to ${leaveData.empLeaveSelectedTo}`
          : leaveData.empLeaveStartDate && leaveData.empLeaveEndDate
          ? isValidDateFormat(leaveData.empLeaveStartDate) &&
            isValidDateFormat(leaveData.empLeaveEndDate)
            ? `${DateFormat(leaveData.empLeaveStartDate)} to ${DateFormat(
                leaveData.empLeaveEndDate
              )}`
            : `${leaveData.empLeaveStartDate} to ${leaveData.empLeaveEndDate}`
          : "N/A";

      handleUpdateLeaveStatus(leaveData.id, updateData)
        .then(() => {
          setNotificationText(
            `Leave ${status} by ${personalInfo.name} on ${DateFormat(
              currentDate
            )}`
          );

          if (
            userType === "Manager" &&
            (leaveData.supervisorEmpID == null ||
              leaveData.supervisorEmpID === "") &&
            (status === "Approved" || status === "Rejected")
          ) {
            // console.log("checking manager");
            const processEmailsAndNotifications = async () => {
              try {
                //____________________________________________________________ Employee got email_______________________________________________________________________________________
                await sendEmail(
                  `Leave Application ${status}`,
                  `<html>
                    <body>
                      <p>
                        Dear ${leaveData.empName || "Not mentioned"}, <br />
                        Your ${leaveData.empLeaveType} request for the period 
                        ${leavePeriod} has been ${status} by Manager, ${
                    managerName.name || "Not mentioned"
                  }.
                      </p>
                       <p>Click here <a href="https://employee.adininworks.co">employee.adininworks.co</a> to view the status.</p>
                    </body>
                  </html>`,
                  "leave_no-reply@adininworks.com",
                  leaveData.empOfficialEmail
                );
                // alert("Email sent successfully to Employee");

                //____________________________________________________________ HR got email_______________________________________________________________________________________
                await sendEmail(
                  `Leave Application ${status}`,
                  `<html>
                    <body>
                      <p> 
                        Your Employee Mr/Ms. ${
                          leaveData.empName || "Not mentioned"
                        }'s, ${
                    leaveData.empLeaveType
                  } request for the period ${leavePeriod} has been ${status} by Manager, ${
                    managerName.name || "Not mentioned"
                  }.
                      </p>
                      <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the updates.</p>
                    </body>
                  </html>`,
                  "leave_no-reply@adininworks.com",
                  "hr-notification@adininworks.com"
                );
                // alert("Email sent successfully to HR");
                //____________________________________________________________ Employee got notification_______________________________________________________________________________________
                await createNotification({
                  empID: leaveData.empID,
                  leaveType: leaveData.empLeaveType,
                  message: `Leave request for ${leaveData.empName} has been ${status} by Manager ${managerName.name}`,
                  senderEmail: "leave_no-reply@adininworks.com",
                  receipentEmail: leaveData.empOfficialEmail,
                  receipentEmpID: leaveData.empID,
                  status: "Unread",
                });
                //____________________________________________________________ HR got notification_______________________________________________________________________________________
                await createNotification({
                  empID: leaveData.empID,
                  leaveType: leaveData.empLeaveType,
                  message: `Leave request for ${leaveData.empName} has been ${status} by Manager ${managerName.name}`,
                  senderEmail: "leave_no-reply@adininworks.com",
                  receipentEmail: "hr-notification@adininworks.com",
                  status: "Unread",
                });
              } catch (err) {
                console.error("An error occurred:", err);
                // alert(`Error occurred: ${err.message}`);
              }
            };

            setTimeout(() => {
              processEmailsAndNotifications();
            }, 100);
          } else if (
            userType === "Supervisor" &&
            leaveData.supervisorEmpID &&
            leaveData?.managerStatus === "Pending" &&
            (status === "Approved" || status === "Rejected")
          ) {
            const FindingEmail = empPIData.filter((manage) => {
              const IdFinding =
                leaveData?.managerEmpID.toLowerCase() ===
                manage.empID.toLowerCase();

              return IdFinding;
            });
            const processEmailsAndNotifySup = async () => {
              try {
                if (status === "Approved") {
                  //____________________________________________________________ manager got email_______________________________________________________________________________________
                  await sendEmail(
                    `Leave Application ${status}`,
                    `<html>
                      <body>
                        <p>
                          Your Employee Mr/Ms. ${
                            leaveData.empName || "Not mentioned"
                          }'s, ${
                      leaveData.empLeaveType
                    } request for the period   ${leavePeriod}, 
                          which has been ${status} by Supervisor, ${
                      supervisorName.name || "Not mentioned"
                    }.
                        </p>
                        <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the status.</p>
                      </body>
                    </html>`,
                    "leave_no-reply@adininworks.com",
                    FindingEmail[0].officialEmail
                  );
                  // alert("Email sent successfully to Manager");
                  //____________________________________________________________ HR got email_______________________________________________________________________________________
                  await sendEmail(
                    `Leave Application ${status}`,
                    `<html>
                      <body>
                        <p> 
                          Your Employee Mr/Ms. ${
                            leaveData.empName || "Not mentioned"
                          }'s, ${
                      leaveData.empLeaveType
                    } request for the period ${leavePeriod} has been ${status} by Supervisor, ${
                      supervisorName.name || "Not mentioned"
                    }.
                        </p>
                        <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the updates.</p>
                      </body>
                    </html>`,
                    "leave_no-reply@adininworks.com",
                    "hr-notification@adininworks.com"
                  );
                  // alert("Email sent successfully to HR");
                  //____________________________________________________________ manager got notification_______________________________________________________________________________________
                  await createNotification({
                    empID: leaveData.empID,
                    leaveType: leaveData.empLeaveType,
                    message: `Leave request for ${leaveData.empName} has been ${status} by Supervisor ${supervisorName.name}`,
                    senderEmail: "leave_no-reply@adininworks.com",
                    receipentEmail: FindingEmail[0].officialEmail,
                    receipentEmpID: leaveData.managerEmpID,
                    status: "Unread",
                  });

                  //hr notify
                  //____________________________________________________________ HR got notification_______________________________________________________________________________________
                  await createNotification({
                    empID: leaveData.empID,
                    leaveType: leaveData.empLeaveType,
                    message: `Leave request for ${leaveData.empName} has been ${status} by Supervisor ${supervisorName.name}`,
                    senderEmail: "leave_no-reply@adininworks.com",
                    receipentEmail: "hr-notification@adininworks.com",
                    status: "Unread",
                  });
                }

                if (status === "Rejected") {
                  //_____________________________________________________________HR got email______________________________________________________________________________________________________
                  await sendEmail(
                    `Leave Application ${status}`,
                    `<html>
                      <body>
                        <p> 
                          Your Employee Mr/Ms. ${
                            leaveData.empName || "Not mentioned"
                          }'s, ${
                      leaveData.empLeaveType
                    } request for the period ${leavePeriod} has been ${status} by Supervisor, ${
                      supervisorName.name || "Not mentioned"
                    }.
                        </p>
                        <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the updates.</p>
                      </body>
                    </html>`,
                    "leave_no-reply@adininworks.com",
                    "hr-notification@adininworks.com"
                  );
                  // alert("Email sent successfully to HR");
                  //____________________________________________________________ Manager got email_______________________________________________________________________________________
                  await sendEmail(
                    `Leave Application ${status}`,
                    `<html>
                      <body>
                        <p>
                          Your Employee Mr/Ms. ${
                            leaveData.empName || "Not mentioned"
                          }'s, ${
                      leaveData.empLeaveType
                    } request for the period ${leavePeriod}, 
                          which has been ${status} by Supervisor, ${
                      supervisorName.name || "Not mentioned"
                    }.
                        </p>
                        <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the status.</p>
                      </body>
                    </html>`,
                    "leave_no-reply@adininworks.com",
                    FindingEmail[0].officialEmail
                  );
                  // alert("Email sent successfully to Manager");
                  //____________________________________________________________ Employee got email_______________________________________________________________________________________
                  await sendEmail(
                    `Leave Application ${status}`,
                    `<html>
                     <body>
                      <p> 
                        Dear ${
                          leaveData.empName || "Not mention"
                        }, <br /> Your ${
                      leaveData.empLeaveType
                    } request for the period ${leavePeriod} has been ${status} by Supervisor, ${
                      supervisorName.name || "Not mention"
                    }. 
                     </p>
                      <p>Click here <a href="https://employee.adininworks.co">employee.adininworks.co</a> to view the status.</p>
                     </body>
                     </html>`,
                    "leave_no-reply@adininworks.com",
                    leaveData.empOfficialEmail
                  );
                  // alert("Email sent successfully to Employee");
                  //____________________________________________________________ Manager got notification_______________________________________________________________________________________
                  await createNotification({
                    empID: leaveData.empID,
                    leaveType: leaveData.empLeaveType,
                    message: `Leave request for ${leaveData.empName} has been ${status} by Supervisor ${supervisorName.name}`,
                    senderEmail: "leave_no-reply@adininworks.com",
                    receipentEmail: FindingEmail[0].officialEmail,
                    receipentEmpID: leaveData.managerEmpID,
                    status: "Unread",
                  });
                  //____________________________________________________________ Employee got notification_______________________________________________________________________________________
                  await createNotification({
                    empID: leaveData.empID,
                    leaveType: leaveData.empLeaveType,
                    message: `Leave request for ${leaveData.empName} has been ${status} by Supervisor ${supervisorName.name}`,
                    senderEmail: "leave_no-reply@adininworks.com",
                    receipentEmail: leaveData.empOfficialEmail,
                    receipentEmpID: leaveData.empID,
                    status: "Unread",
                  });
                  //____________________________________________________________ HR got notification_______________________________________________________________________________________
                  await createNotification({
                    empID: leaveData.empID,
                    leaveType: leaveData.empLeaveType,
                    message: `Leave request for ${leaveData.empName} has been ${status} by Supervisor ${supervisorName.name}`,
                    senderEmail: "leave_no-reply@adininworks.com",
                    receipentEmail: "hr-notification@adininworks.com",
                    status: "Unread",
                  });
                }
              } catch (err) {
                // console.error("An error occurred:", err);
                // alert(`Error occurred: ${err.message}`);
              }
            };
            setTimeout(() => {
              processEmailsAndNotifySup();
            }, 100);

            // console.log("manager");
          } else if (
            userType === "Manager" &&
            leaveData.managerEmpID &&
            leaveData.supervisorStatus === "Approved" &&
            (status === "Approved" || status === "Rejected")
          ) {
            const FindingEmail = empPIData.filter((sup) => {
              const IdFinding =
                leaveData.supervisorEmpID.toLowerCase() ===
                sup.empID.toLowerCase();

              return IdFinding;
            });
            // console.log("2");
            const processEmailsAndNotifyManager = async () => {
              try {
                //supervisor got email
                //____________________________________________________________ Supervisor got email_______________________________________________________________________________________
                await sendEmail(
                  `Leave Application ${status}`,
                  `<html>
                   <body>
                     <p> 
                      Your Employee Mr/Ms. ${
                        leaveData.empName || "Not mentioned"
                      }'s ${
                    leaveData.empLeaveType
                  } request for the period ${leavePeriod} has been ${status} by Manager, ${
                    managerName.name || "Not mentioned"
                  }.
                    </p>
                 <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the updates.</p>
                 </body>
               </html>`,
                  "leave_no-reply@adininworks.com",
                  FindingEmail[0].officialEmail
                );
                // alert("Email sent successfully to Supervisor");
                //____________________________________________________________ Employee got email_______________________________________________________________________________________
                await sendEmail(
                  `Leave Application ${status}`,
                  `<html>
                    <body>
                     <p> 
                       Dear ${
                         leaveData.empName || "Not mention"
                       }, <br /> Your ${
                    leaveData.empLeaveType
                  } request for the period ${leavePeriod} has been ${status} by Manager, ${
                    managerName.name || "Not mention"
                  }. 
                    </p>
                    <p>Click here <a href="https://employee.adininworks.co">employee.adininworks.co</a> to view the status.</p>
                   </body>
                 </html>`,
                  "leave_no-reply@adininworks.com",
                  leaveData.empOfficialEmail
                );
                // alert("Email sent successfully to Employee");
                //____________________________________________________________ HR got email_______________________________________________________________________________________
                await sendEmail(
                  `Leave Application ${status}`,
                  `<html>
                     <body>
                       <p> 
                          Your Employee Mr/Ms. ${
                            leaveData.empName || "Not mentioned"
                          }'s ${
                    leaveData.empLeaveType
                  } request for the period ${leavePeriod} has been ${status} by Manager, ${
                    managerName.name || "Not mentioned"
                  }.
                       </p>
                       <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the updates.</p>
                     </body>
                 </html>`,
                  "leave_no-reply@adininworks.com",
                  "hr-notification@adininworks.com"
                );
                // alert("Email sent successfully to HR");
                // Create notification for Employeee
                //____________________________________________________________ Employee got notification_______________________________________________________________________________________
                await createNotification({
                  empID: leaveData.empID,
                  leaveType: leaveData.empLeaveType,
                  message: `Leave request for ${
                    leaveData.empName
                  } has been ${status} by Manager ${
                    managerName.name || "Not mentioned"
                  } .`,
                  senderEmail: "leave_no-reply@adininworks.com",
                  receipentEmail: leaveData.empOfficialEmail,
                  receipentEmpID: leaveData.empID,
                  status: "Unread",
                });
                //____________________________________________________________ Supervisor got notification_______________________________________________________________________________________
                await createNotification({
                  empID: leaveData.empID,
                  leaveType: leaveData.empLeaveType,
                  message: `Leave request for ${
                    leaveData.empName
                  } has been ${status} by Manager ${
                    managerName.name || "Not mentioned"
                  }.`,
                  senderEmail: "leave_no-reply@adininworks.com",
                  receipentEmail: FindingEmail[0].officialEmail,
                  receipentEmpID: leaveData.supervisorEmpID,
                  status: "Unread",
                });
                //____________________________________________________________ HR got notification_______________________________________________________________________________________
                await createNotification({
                  empID: leaveData.empID,
                  leaveType: leaveData.empLeaveType,
                  message: `Leave request for ${
                    leaveData.empName
                  } has been ${status} by Manager ${
                    managerName.name || "Not mentioned"
                  }.`,
                  senderEmail: "leave_no-reply@adininworks.com",
                  receipentEmail: "hr-notification@adininworks.com",
                  status: "Unread",
                });
              } catch (err) {
                console.error("An error occurred:", err);
                // alert(`Error occurred: ${err.message}`);
              }
            };

            setTimeout(() => {
              processEmailsAndNotifyManager();
            }, 200);
          }

          setTimeout(() => {
            setNotification(true);
            setPath("/leaveManagement");
          }, 500);
        })
        .catch((err) => console.log(err));
    } else if (source === "Tickets") {
      
      if (userType === "HR") {
        ticketUpdatedData.hrStatus = status;
        ticketUpdatedData.hrRemarks = remark;
        ticketUpdatedData.hrDate = currentDate;
      } else if (gmPosition === "GENERAL MANAGER") {
        ticketUpdatedData.gmStatus = status;
        ticketUpdatedData.gmRemarks = remark;
        ticketUpdatedData.gmDate = currentDate;
      }

      const formattedDatedeparture = ticketData.empDepartureDate || DateFormat(ticketData.departureDate);
      const formattedDatearrival = ticketData.empArrivalDate || DateFormat(ticketData.arrivalDate);

      handleUpdateTicketRequest(ticketData.id, ticketUpdatedData)
        .then(async () => {
          setNotificationText(
            `Ticket request ${status} by ${personalInfo.name} on ${DateFormat(
              currentDate
            )}`
          );
          const managerEmpID =
            ticketData.managerEmpID[ticketData.managerEmpID.length - 1];

          const findingManagerEmail = empPIData.find(
            (val) => val.empID === managerEmpID
          );

          if (userType === "HR") {
            //employee send email
            await sendEmail(
              `Ticket Request ${status}`,
              `Dear  ${
                ticketData.empName || "Not mention"
              } , Your ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${
                status === "Verified" ? "verified" : "marked as not eligible"
              } by HR ${
                personalInfo.name || "Not mention"
              }. <p>View at : <a href="https://employee.adininworks.co">employee.adininworks.co</a></p> `,
              "hr_no-reply@adininworks.com",
              ticketData.empOfficialEmail
            );

            //manager send email
            await sendEmail(
              `Ticket Request  ${
                status === "Verified" ? "verified" : "marked as not eligible"
              }`,
              `Your employee  ${
                ticketData.empName || "Not mention"
              } , Applied ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${
                status === "Verified" ? "verified" : "marked as not eligible"
              } by HR ${personalInfo.name || "Not mention"}. 
              <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the updates.</p>
              `,
              "hr_no-reply@adininworks.com",
              findingManagerEmail.officialEmail
            );

            //GM send email
            await sendEmail(
              `Ticket Request  ${
                status === "" ? "verified" : "marked as not eligible"
              }`,
              `Your employee  ${
                ticketData.empName || "Not mention"
              } , Applied ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${
                status === "Verified" ? "verified" : "marked as not eligible"
              } by HR ${personalInfo.name || "Not mention"}.
              <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the updates.</p>
               `,
              "hr_no-reply@adininworks.com",
              gmMail
            );

            // Create notification for the ticket status update employee
            // await createNotification({
            //   empID: ticketData.empID,
            //   leaveType: "Ticket Request",
            //   message: `Ticket request for ${ticketData.empName} has been ${
            //     status === "Verified" ? "verified" : "marked as not eligible"
            //   } by HR ${personalInfo.name}`,
            //   senderEmail: "hr_no-reply@adininworks.com",
            //   receipentEmail: ticketData.empOfficialEmail,
            //   receipentEmpID: ticketData.empID,
            //   status: "Unread",
            // });

            await createNotification({
              empID: ticketData.empID,
              leaveType: "Ticket Request",
              message: `Dear ${
                ticketData.empName || "Not mentioned"
              }, your ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${
                status === "Verified" ? "verified" : "marked as not eligible"
              } by HR ${personalInfo.name || "Not mentioned"}.`,
              senderEmail: "hr_no-reply@adininworks.com",
              receipentEmail: ticketData.empOfficialEmail,
              receipentEmpID: ticketData.empID,
              status: "Unread",
            });

            // Create notification for the ticket status update manager
            await createNotification({
              empID: ticketData.empID,
              leaveType: "Ticket Request",
              message: `Your employee ${
                ticketData.empName || "Not mentioned"
              }, your ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${
                status === "Verified" ? "verified" : "marked as not eligible"
              } by HR ${personalInfo.name}`,
              senderEmail: "hr_no-reply@adininworks.com",
              receipentEmail: findingManagerEmail.officialEmail,
              receipentEmpID: ticketData.managerEmpID,
              status: "Unread",
            });

            await createNotification({
              empID: ticketData.empID,
              leaveType: "Ticket Request",
              message: `Your employee ${
                ticketData.empName || "Not mentioned"
              }, your ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${
                status === "Verified" ? "verified" : "marked as not eligible"
              } by HR ${personalInfo.name}`,
              senderEmail: "hr_no-reply@adininworks.com",
              receipentEmail: gmMail,
              receipentEmpID: GMEmpID,
              status: "Unread",
            });
          } else if (gmPosition === "GENERAL MANAGER") {
            await sendEmail(
              `Ticket Request ${status}`,
              `Dear  ${
                ticketData.empName || "Not mention"
              } , Your ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${status} by GM ${
                personalInfo.name || "Not mention"
              }. <p>View at : <a href="https://employee.adininworks.co">employee.adininworks.co</a></p> `,
              "hr_no-reply@adininworks.com",
              ticketData.empOfficialEmail
            );

            //manager send email
            await sendEmail(
              `Ticket Request ${status}`,
              `Your employee  ${
                ticketData.empName || "Not mention"
              } , Applied ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been  ${status} by GM ${
                personalInfo.name || "Not mention"
              }.
                <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the updates.</p> 
              `,
              "hr_no-reply@adininworks.com",
              findingManagerEmail.officialEmail
            );

            await sendEmail(
              `Ticket Request ${status}`,
              `Your employee  ${
                ticketData.empName || "Not mention"
              } , Applied ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been  ${status} by GM ${
                personalInfo.name || "Not mention"
              }.
                <p>Click here <a href="https://hr.adininworks.co">hr.adininworks.co</a> to view the updates.</p> 
              `,
              "hr_no-reply@adininworks.com",
              "hr-notification@adininworks.com"
            );

            // Create notification for the ticket status update employee
            await createNotification({
              empID: ticketData.empID,
              leaveType: "Ticket Request",
              message: `Dear ${
                ticketData.empName || "Not mentioned"
              }, your ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${status} by General Manager ${
                personalInfo.name
              }`,
              senderEmail: "hr_no-reply@adininworks.com",
              receipentEmail: ticketData.empOfficialEmail,
              receipentEmpID: ticketData.empID,
              status: "Unread",
            });

            // Create notification for the ticket status update manager
            await createNotification({
              empID: ticketData.empID,
              leaveType: "Ticket Request",
              message: `Your employee ${
                ticketData.empName || "Not mentioned"
              }, your ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${status} by General Manager ${
                personalInfo.name
              }`,
              senderEmail: "hr_no-reply@adininworks.com",
              receipentEmail: findingManagerEmail.officialEmail,
              receipentEmpID: ticketData.empID,
              status: "Unread",
            });

            // create notification for HR
            await createNotification({
              empID: ticketData.empID,
              leaveType: "Ticket Request",
              message: `Your employee ${
                ticketData.empName || "Not mentioned"
              }, your ticket request for the period ${formattedDatedeparture} to ${formattedDatearrival} has been ${status} by General Manager ${
                personalInfo.name
              }`,
              senderEmail: "hr_no-reply@adininworks.com",
              receipentEmail: "hr-notification@adininworks.com",
              status: "Unread",
            });
          }

          setTimeout(() => {
            setNotification(true);
            setPath("/leaveManagement/requestTickets");
          }, 500);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleApprove = () => handleUpdateStatus("Approved");
  const handleReject = () => handleUpdateStatus("Rejected");
  const handleVerify = () => handleUpdateStatus("Verified");
  const handleNotEligible = () => handleUpdateStatus("Not Eligible");

  const renderButtons = () => {
    const { supervisorStatus, managerStatus, supervisorEmpID } = leaveData;
    const isPending = managerStatus === "Pending";
    const isApproved = supervisorStatus === "Approved";
    const isSupervisor = userType === "Supervisor";
    const isNotSuperAdminOrHR = userType !== "SuperAdmin" && userType !== "HR";

    // Case 1: Supervisor approved, Manager pending, Supervisor not SuperAdmin/HR
    if (
      isApproved &&
      supervisorStatus !== "Rejected" &&
      isPending &&
      isSupervisor &&
      isNotSuperAdminOrHR
    ) {
      return (
        <div className="center w-full">
          {/* <button
            className="border border-grey p-2 px-5 rounded text-dark_grey text_size_6"
            onClick={handleReject}
          >
            Reject
          </button> */}
        </div>
      );
    }

    // Case 2: Supervisor pending, Supervisor EmpID available, and User not SuperAdmin/HR
    if (
      supervisorStatus === "Pending" &&
      supervisorEmpID &&
      isNotSuperAdminOrHR
    ) {
      return (
        <div className="w-full flex justify-evenly">
          <button
            className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleApprove}
          >
            Approve
          </button>
        </div>
      );
    }

    // Case 3: Supervisor approved, Manager pending, User not SuperAdmin/HR
    if (isApproved && isPending && isNotSuperAdminOrHR) {
      return (
        <div className="w-full flex justify-evenly">
          <button
            className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleApprove}
          >
            Approve
          </button>
        </div>
      );
    }

    // Case 4: Supervisor EmpID missing, Manager pending, User not SuperAdmin/HR
    if (
      isPending &&
      (supervisorEmpID === "" || supervisorEmpID === null) &&
      isNotSuperAdminOrHR
    ) {
      return (
        <div className="w-full flex justify-evenly">
          <button
            className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
            onClick={handleApprove}
          >
            Approve
          </button>
        </div>
      );
    }

    // Case 5: Supervisor and Manager both approved, User not SuperAdmin/HR
    if (managerStatus === "Approved" && isApproved && isNotSuperAdminOrHR) {
      return null;
    }

    return null;
  };

  return (
    <main className="flex flex-col items-center justify-center bg-grey bg-opacity-75 inset-0 z-50 fixed">
      <div className="center min-h-screen overflow-y-auto">
        <header className="bg-white w-full max-w-[600px] rounded-lg relative p-5 ">
          <button
            onClick={handleClickForToggle}
            className="absolute top-5 right-6 border rounded-full p-1"
          >
            <VscClose size={20} />
          </button>

          <div className=" justify-items-center gap-4">
            <img src={AweLogo} alt="Logo" className="max-w-[180px] w-full" />
            <h2 className="text-xl mt-2 font-bold underline">
              {(source === "LM" && "Leave Application Form") ||
                (source === "Tickets" && "Ticket Request Form")}
            </h2>
          </div>

          {notification && (
            <SpinLogo
              text={notificationText}
              notification={notification}
              path={path}
            />
          )}

          {source === "LM" && (
            <section className="shadow-md w-[500px] p-5 bg-white">
              <div className="text_size_6 ">
                {[
                  { label: "Name", value: leaveData.empName || "" },
                  {
                    label: "Badge No",
                    value: leaveData.empBadgeNo,
                  },
                  {
                    label: "Job Title",
                    value:
                      Array.isArray(leaveData.position) &&
                      leaveData.position.length > 0
                        ? leaveData.position[leaveData.position.length - 1]
                        : "N/A",
                  },
                  {
                    label: "Department",
                    value:
                      Array.isArray(leaveData.department) &&
                      leaveData.department.length > 0
                        ? leaveData.department[leaveData.department.length - 1]
                        : "N/A",
                  },
                  { label: "Leave Type", value: leaveData.empLeaveType },
                  {
                    label: "Applied Dates",
                    value:
                      leaveData.empLeaveSelectedFrom &&
                      leaveData.empLeaveSelectedTo
                        ? isValidDateFormat(leaveData.empLeaveSelectedFrom) &&
                          isValidDateFormat(leaveData.empLeaveSelectedTo)
                          ? `${DateFormat(
                              leaveData.empLeaveSelectedFrom
                            )} to ${DateFormat(leaveData.empLeaveSelectedTo)}`
                          : `${leaveData.empLeaveSelectedFrom} to ${leaveData.empLeaveSelectedTo}`
                        : leaveData.empLeaveStartDate &&
                          leaveData.empLeaveEndDate
                        ? !isValidDateFormat(leaveData.empLeaveStartDate) &&
                          !isValidDateFormat(leaveData.empLeaveEndDate)
                          ? `${DateFormat(
                              leaveData.empLeaveStartDate
                            )} to ${DateFormat(leaveData.empLeaveEndDate)}`
                          : `${leaveData.empLeaveStartDate} to ${leaveData.empLeaveEndDate}`
                        : "N/A",
                  },

                  // Helper function to check if the date is in yyyy/m/d format

                  { label: "Total No of Days", value: leaveData.leaveDays },
                  // { label: "Leave Balance", value: leaveData.balance },
                  { label: "Reason", value: leaveData.reason },
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                    <strong className="w-full">{item.label}</strong>
                    <span className="w-full col-span-2">
                      : &nbsp;{item.value}
                    </span>
                  </div>
                ))}

                {leaveData.managerStatus === "Pending" &&
                  leaveData.supervisorStatus === "Pending" &&
                  userType !== "SuperAdmin" &&
                  userType !== "HR" && (
                    <div className="grid grid-cols-[150px_auto_1fr] gap-2 items-center pt-1">
                      <label className="font-semibold" htmlFor="remark">
                        Remark
                      </label>
                      <span className="text-center">:</span>
                      <input
                        id="remark"
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-lite_grey h-9 outline-none pl-2"
                      />
                    </div>
                  )}
                {leaveData.managerStatus === "Pending" &&
                  leaveData.supervisorStatus !== "Pending" &&
                  userType === "Manager" &&
                  userType !== "SuperAdmin" &&
                  userType !== "HR" && (
                    <div className="grid grid-cols-[150px_auto_1fr] gap-2 items-center pt-1">
                      <label className="font-semibold" htmlFor="remark">
                        Remark
                      </label>
                      <span className="text-center">:</span>
                      <input
                        id="remark"
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-lite_grey h-9 outline-none pl-2"
                      />
                    </div>
                  )}

                {/* Remarks Section */}
                {leaveData.remark && (
                  <div className="grid grid-cols-2 py-6">
                    <p>Comments:</p>
                    <p className="text-start text-[16px] font-medium border border-grey w-full break-words overflow-hidden h-[51px]">
                      {leaveData.empRemarks || "No remarks added"}
                    </p>
                  </div>
                )}
                {userType === "SuperAdmin" || userType === "HR" ? (
                  <div className="font-medium">
                    <table className="w-full border-collapse">
                      <thead className="bg-gradient-to-r from-[#f5ee6ad7] via-[#faf362] to-[#f5ee6ad7] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
                        <tr className="text-[#6a2b2b] font-bold text-center">
                          <th className=" p-1.5 rounded-tl-lg shadow-lg">
                            Role
                          </th>
                          <th className=" p-1.5 shadow-md">Status</th>
                          <th className=" p-1.5 rounded-tr-lg shadow-lg">
                            Remarks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveData.supervisorEmpID && (
                          <tr className="border-b border-lite_grey">
                            <td className="p-2 text-center font-semibold">
                              Supervisor
                            </td>
                            <td
                              className={`text-center font-bold p-2 ${getStatusClass(
                                leaveData.supervisorStatus
                              )}`}
                            >
                              {leaveData.supervisorStatus}
                            </td>
                            <td className="p-2 break-words max-w-[200px] text-center text-grey">
                              {leaveData.supervisorRemarks || "No remarks"}
                            </td>
                          </tr>
                        )}
                        {leaveData?.supervisorStatus !== "Rejected" && (
                          <tr className="border-b border-lite_grey">
                            <td className="p-2 text-center font-semibold">
                              Manager
                            </td>
                            <td
                              className={`text-center font-bold p-2 ${getStatusClass(
                                leaveData.managerStatus
                              )}`}
                            >
                              {leaveData.managerStatus}
                            </td>
                            <td className="p-2 break-words max-w-[200px] text-center text-grey">
                              {leaveData.managerRemarks || "No remarks"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : userType === "Supervisor" &&
                  leaveData.supervisorStatus !== "Pending" ? (
                  <table className="w-full mt-5 border-collapse">
                    <thead className="bg-gradient-to-r from-[#f5ee6ad7] via-[#faf362] to-[#f5ee6ad7] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
                      <tr className="text-[#6a2b2b] font-bold text-center">
                        <th className=" p-1.5 rounded-tl-lg shadow-lg">Role</th>
                        <th className=" p-1.5 shadow-md">Status</th>
                        <th className=" p-1.5 rounded-tr-lg shadow-lg">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Supervisor Row */}
                      <tr className="border-b border-lite_grey">
                        <td className="p-2 text-center font-semibold">
                          Supervisor
                        </td>
                        <td
                          className={`text-center font-bold p-2 ${getStatusClass(
                            leaveData.supervisorStatus
                          )}`}
                        >
                          {leaveData.supervisorStatus}
                        </td>
                        <td className="p-2 break-words max-w-[200px] text-center text-grey">
                          {leaveData.supervisorRemarks || "No remarks"}
                        </td>
                      </tr>

                      {/* Manager Row */}
                      {leaveData.supervisorStatus === "Approved" && (
                        <tr className="border-b border-lite_grey">
                          <td className="p-2 text-center font-semibold">
                            Manager
                          </td>
                          <td
                            className={`text-center font-bold p-2 ${getStatusClass(
                              leaveData.managerStatus
                            )}`}
                          >
                            {leaveData.managerStatus}
                          </td>
                          <td className="p-2 break-words max-w-[200px] text-center text-grey">
                            {leaveData.managerRemarks || "No remarks"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : (
                  userType === "Manager" &&
                  (leaveData.managerStatus !== "Pending" ||
                  leaveData.supervisorEmpID ? (
                    <table className="w-full mt-5 border-collapse">
                      <thead className="bg-gradient-to-r from-[#f5ee6ad7] via-[#faf362] to-[#f5ee6ad7] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
                        <tr className="text-[#6a2b2b] font-bold text-center">
                          <th className=" p-1.5 rounded-tl-lg shadow-lg">
                            Role
                          </th>
                          <th className=" p-1.5 shadow-md">Status</th>
                          <th className=" p-1.5 rounded-tr-lg shadow-lg">
                            Remarks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Supervisor Row */}
                        {leaveData.supervisorEmpID && (
                          <tr className="border-b border-lite_grey">
                            <td className="p-2 text-center font-semibold">
                              Supervisor
                            </td>
                            <td
                              className={`text-center font-bold p-2 ${getStatusClass(
                                leaveData.supervisorStatus
                              )}`}
                            >
                              {leaveData.supervisorStatus}
                            </td>
                            <td className="p-2 break-words max-w-[200px] text-center text-grey">
                              {leaveData.supervisorRemarks || "No remarks"}
                            </td>
                          </tr>
                        )}

                        {/* Manager Row */}
                        {leaveData.managerStatus !== "Pending" && (
                          <tr className="border-b border-lite_grey">
                            <td className="p-2 text-center font-semibold">
                              Manager
                            </td>
                            <td
                              className={`text-center font-bold p-2 ${getStatusClass(
                                leaveData.managerStatus
                              )}`}
                            >
                              {leaveData.managerStatus}
                            </td>
                            <td className="p-2 break-words max-w-[200px] text-center text-grey">
                              {leaveData.managerRemarks || "No remarks"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  ) : null)
                )}
              </div>
              {/* Action Buttons */}
              <div className="flex justify-between px-5 mt-6">
                {renderButtons()}
              </div>
            </section>
          )}

          {source === "Tickets" && (
            <section className="px-5 bg-white">
              <div className="text_size_6 mt-5">
                {[
                  { label: "Name", value: ticketData.empName },
                  {
                    label: "Badge Number",
                    value: ticketData.empBadgeNo || "N/A",
                  },

                  {
                    label: "Department",
                    value:
                      Array.isArray(ticketData.department) &&
                      ticketData.department.length > 0
                        ? ticketData.department[
                            ticketData.department.length - 1
                          ]
                        : "N/A",
                  },
                  {
                    label: "Position",
                    value:
                      Array.isArray(ticketData.position) &&
                      ticketData.position.length > 0
                        ? ticketData.position[ticketData.position.length - 1]
                        : "N/A",
                  },
                  {
                    label: "Date of Join",
                    value: DateFormat(ticketData.doj) || "N/A",
                  },
                  {
                    label: "Destination",
                    value: ticketData.destination,
                  },
                  { 
                    label: "Departure Date",
                    value: ticketData.empDepartureDate
                      ? isValidDateFormat(ticketData.empDepartureDate)
                        ? `${DateFormat(ticketData.empDepartureDate)}`
                        : `${ticketData.empDepartureDate}`
                      : ticketData.departureDate
                      ? `${DateFormat(ticketData.departureDate)}`
                      : "N/A",
                  },
                  {
                    label: "Arrival Date",
                    value: ticketData.empArrivalDate
                      ? isValidDateFormat(ticketData.empArrivalDate)
                        ? `${DateFormat(ticketData.empArrivalDate)}`
                        : `${ticketData.empArrivalDate}`
                      : ticketData.arrivalDate
                      ? `${DateFormat(ticketData.arrivalDate)}`
                      : "N/A",
                  },
                  {
                    label: "Employee Remarks",
                    value: ticketData.empRemarks || "N/A",
                  },
                ]
                  .filter(Boolean)
                  .map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 mb-3">
                      <strong className="w-full">{item.label}</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.value}
                      </span>
                    </div>
                  ))}

                {(userType === "SuperAdmin" ||
                  userType === "HR" ||
                  gmPosition === "GENERAL MANAGER"
                  ) && ticketData.hrStatus !== "Pending" && (
                  <table className="w-full mt-5 border-collapse">
                    <thead className="bg-gradient-to-r from-[#f5ee6ad7] via-[#faf362] to-[#f5ee6ad7] shadow-[0_4px_6px_rgba(255,250,150,0.5)]">
                      <tr className="text-[#6a2b2b] font-bold text-center">
                        <th className=" p-1.5 rounded-tl-lg shadow-lg">Role</th>
                        <th className=" p-1.5 shadow-md">Status</th>
                        <th className=" p-1.5 rounded-tr-lg shadow-lg">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* HR Row */}
                    
                        <tr className="border-b border-lite_grey">
                          <td className="p-2 text-center font-semibold">HR</td>
                          <td
                            className={`text-center font-bold p-2 ${getHrStatusClass(
                              ticketData.hrStatus
                            )}`}
                          >
                            {ticketData.hrStatus}
                          </td>
                          <td className="p-2 break-words max-w-[200px] text-center text-grey">
                            {ticketData.hrRemarks || "No remarks"}
                          </td>
                        </tr>
                

                      {/* GM Row */}
                      {(ticketData.gmStatus === "Approved" ||
                        ticketData.gmStatus === "Rejected") && (
                        <tr className="border-b border-lite_grey">
                          <td className="p-2 text-center font-semibold">GM</td>
                          <td
                            className={`text-center font-bold p-2 ${getGmStatusClass(
                              ticketData.gmStatus
                            )}`}
                          >
                            {ticketData.gmStatus}
                          </td>
                          <td className="p-2 break-words max-w-[200px] text-center text-grey">
                            {ticketData.gmRemarks || "No remarks"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {ticketData.hrStatus === "Pending" &&
                  userType !== "SuperAdmin" && (
                    <div className="grid grid-cols-[150px_auto_1fr] gap-2 items-center">
                      <label className="font-semibold" htmlFor="remark">
                        Remark
                      </label>
                      <span className="text-center">:</span>
                      <input
                        id="remark"
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-lite_grey h-9 outline-none pl-2"
                      />
                    </div>
                  )}

                {gmPosition === "GENERAL MANAGER" &&
                  ticketData.gmStatus === "Pending" &&
                  ticketData.hrStatus !== "Pending" &&
                  userType !== "SuperAdmin" && (
                    <div className="grid grid-cols-[150px_auto_1fr] gap-2 items-center mt-4">
                      <label className="font-semibold" htmlFor="remark">
                        Remark
                      </label>
                      <span className="text-center">:</span>
                      <input
                        id="remark"
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-lite_grey h-9 outline-none pl-2"
                      />
                    </div>
                  )}
              </div>
              <div className="flex justify-evenly mt-7 ">
                {ticketData.hrStatus === "Pending" && userType === "HR" && (
                  <>
                    <button
                      className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                      onClick={handleNotEligible}
                    >
                      Not Eligible
                    </button>
                    <button
                      className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                      onClick={handleVerify}
                    >
                      Verify
                    </button>
                  </>
                )}
              </div>
              <div className="flex justify-evenly mt-7 ">
                {ticketData.gmStatus === "Pending" &&
                  ticketData.hrStatus !== "Pending" &&
                  gmPosition === "GENERAL MANAGER" && (
                    <>
                      <button
                        className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                        onClick={handleReject}
                      >
                        Reject
                      </button>
                      <button
                        className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                        onClick={handleApprove}
                      >
                        Approve
                      </button>
                    </>
                  )}
              </div>
            </section>
          )}
        </header>
      </div>
    </main>
  );
};
