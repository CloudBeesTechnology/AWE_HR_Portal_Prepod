const Email = () => {
  
    const sendEmail = async () => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: "Notification",
            text: "The request has been successfully processed.", // Use 'text' for plain text
            html: "<p>The request has been successfully processed.</p>", // Use 'html' for HTML content
            fromid: "hr_no-reply@adininworks.com",
            toaddress: "hariharanofficial2812@gmail.com",
          }),
        };
    
        try {
          const response = await fetch("https://j1wcrd0160.execute-api.ap-southeast-1.amazonaws.com/adinin-send-mail-stage/sendemail", requestOptions);
          const data = await response.text();
          console.log("Email sent successfully:", data);
        } catch (error) {
          console.log(error);
          console.error("Failed to send email:", error);
        }
      };

    return ( 
        <div>
            <button onClick={sendEmail}> Button </button>
        </div>
     );
}
 
export default Email;








// const handleUpdateStatus = async (status) => {
//     const updateData = {};
//     const userType = localStorage.getItem("userType");
//     const currentDate = new Date().toISOString();

//     console.log("updateData:", leaveData);

//     if (userType === "Manager") {
//       updateData.managerStatus = status;
//       updateData.managerRemarks = remark;
//       updateData.managerDate = currentDate;
//       updateData.managerName = personalInfo.name;
//     } else if (userType === "Supervisior") {
//       updateData.supervisorStatus = status;
//       updateData.supervisorRemarks = remark;
//       updateData.supervisorDate = currentDate;
//       updateData.supervisorName = personalInfo.name;
//     }

//     if (source === "LM") {
//       handleUpdateLeaveStatus(leaveData.id, updateData);
//       console.log(`
//         Status: Leave ${status} by ${personalInfo.name} (${userType} on ${currentDate})
//       `);
//       setNotificationText(
//         `Leave ${status} by ${personalInfo.name} on ${currentDate}`
//       );
//     } else if (source === "Tickets") {
//       updateData.hrStatus = status; // Set the status for the ticket request
//       updateData.hrRemarks = remark;
//       updateData.hrDate = currentDate;

//       handleUpdateTicketRequest(ticketData.id, updateData);
//       console.log(
//         `Ticket request ${status} by ${personalInfo.name} (${userType} on ${currentDate})`
//       );
//       setNotificationText(
//         `Ticket request ${status} by ${personalInfo.name} on ${currentDate}`
//       );

//       await sendEmail(status, currentDate);
//     }
//     // setNotification(true);

//     // Hide notification and redirect after 3 seconds
//     // setTimeout(() => {
//     //   setNotification(false);
//     //   navigate("/dashboard"); // Redirect to the dashboard or another page
//     // }, 3000);  

//       // const sendEmail = async () => {
//       //   const requestOptions = {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type": "application/json",  // Set proper content type for JSON data
//       //     },
//       //     body: JSON.stringify({
//       //       subject: ` Notification`,
//       //       message: "The request has been.",
//       //       fromid: "hr_no-reply@adininworks.com",
//       //       toaddress: "hariharanofficial2812@gmail.com",
//       //     }),
//       //   };
    
//       //   try {
//       //     const response = await fetch("https://j1wcrd0160.execute-api.ap-southeast-1.amazonaws.com/adinin-send-mail-stage/sendemail", requestOptions);
//       //     const data = await response.text();
//       //     console.log("Email sent successfully:", data);
//       //   } catch (error) {
//       //     console.error("Failed to send email:", error);
//       //   }
//       // };

//     const sendEmail = async (status, currentDate) => {
//       const requestOptions = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",  // Set proper content type for JSON data
//         },
//         body: JSON.stringify({
//           subject: `${status} Notification`,
//           message: `The request has been ${status} by ${personalInfo.name} on ${currentDate}.`,
//           fromid: "hr_no-reply@adininworks.com",
//           toaddress: "hariharanofficial2812@gmail.com",
//         }),
//       };
  
//       try {
//         const response = await fetch("https://j1wcrd0160.execute-api.ap-southeast-1.amazonaws.com/adinin-send-mail-stage/sendemail", requestOptions);
//         const data = await response.text();
//         console.log("Email sent successfully:", data);
//       } catch (error) {
//         console.error("Failed to send email:", error);
//       }
//     };
  

//     // const sendEmail = async () => {
          
//     //   const requestOptions = {
//     //     method: "POST",
//     //     // headers: {
//     //     //   'Access-Control-Allow-Origin': '*',
//     //     // },
        
//     //     body: {
//     //       "subject":"Subject of the email",
//     //       "message":"Body of the content goes here",
//     //       "fromid":"hr_no-reply@adininworks.com",
//     //       "toaddress":"moonlightx006@gmail.com"
//     //       }
//     //   };
    
//     //   try {
//     //     const response = await fetch("https://j1wcrd0160.execute-api.ap-southeast-1.amazonaws.com/adinin-send-mail-stage/sendemail", requestOptions);
//     //     const data = await response.text();
//     //     console.log("Email sent successfully:", data);
//     //   } catch (error) {
//     //     console.error("Failed to send email:", error);
//     //   }
//     // }
//   };

 

//   const handleApprove = () => 
//     handleUpdateStatus("Approved");

//   const handleReject = () => handleUpdateStatus("Rejected");

//   useEffect(() => {
//     const userType = localStorage.getItem("userType");
//     setUserName(userType);
//     console.log(`userType: '${userType}'`);
//   }, []);
