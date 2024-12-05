export const sendEmail = async (subject, message,fromaddress, toaddress) => {
    try {
      const response = await fetch(
        "https://j1wcrd0160.execute-api.ap-southeast-1.amazonaws.com/adinin-send-mail-stage/sendemail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "http://127.0.0.1:5173",

          },
          body: JSON.stringify({
            subject,
            message,
            fromid: fromaddress,
            toaddress,
          }),

          //  mode: 'no-cors'
        }
      );
      console.log(response, "Response");


      try {
        const data = await response.json();
        console.log("Email Response:", data);
        if (data.message === "Email sent successfully") {
          console.log("Email sent successfully");
        }

      }  catch (e) {
        console.log("log", e);
      }
      
 
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };