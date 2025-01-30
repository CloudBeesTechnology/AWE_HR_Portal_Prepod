import axios from "axios";
import React, { useContext } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { CRLeaveData } from "../../services/createMethod/CreateLeaveStatus";
// import { UpdateLeaveData } from "../../services/updateMethod/UpdateLeaveStatus";

export const LeaveStatus = () => {
  const { empLeaveStatusData } = useContext(DataSupply);
  const { CRLeaveDetails } = CRLeaveData();
  // const { LeaveUpDetails } = UpdateLeaveData();   


  console.log("Leave Data from Context",empLeaveStatusData);

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 2; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

  // Link 1:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2025Supervisor+Only+year+month+date+sup+man.csv"

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2025Supervisor+Only+year+month+date+sup+man.csv",
        {
          responseType: "arraybuffer", // Important to fetch as arraybuffer
        }
      );
      // Convert the response to an array buffer
      const data = new Uint8Array(response.data);
      console.log(data);

      // Parse the file using XLSX
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];

      // Convert sheet data to JSON format
      const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      const dateKeys = [
        "fromDate",
        "toDate",
        "supervisorDate",
        "managerDate",
        "empDate",
        "startDate",
        "endDate",
        "selectedFrom","selectedTo"
      ];
      const transformedData = sheetData.slice(1).map((row) => {
        let result = {};
        sheetData[0].forEach((key, index) => {
          let value = row[index];
          if (dateKeys.includes(key) && !isNaN(value)) {
            value = excelDateToJSDate(value).toISOString().split("T")[0];
          }

          result[key] = value !== undefined ? String(value) : value; // Convert to string
        });
        return result;
      });
      // console.log("All Data:", transformedData);
      for (const LeaveValue of transformedData) {
        if (LeaveValue.empID) {
          LeaveValue.empID = String(LeaveValue.empID);
          // console.log(LeaveValue.applyTo);
          
        }
        console.log("Leave value processed", LeaveValue);

        await CRLeaveDetails({ LeaveValue });
        
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-40">
      Leave Details 
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};


// import axios from "axios";
// import React, { useContext, useState } from "react";
// import * as XLSX from "xlsx";
// import { DataSupply } from "../../utils/DataStoredContext";
// import { CRLeaveData } from "../../services/createMethod/CreateLeaveStatus";
// // import { UpdateLeaveData } from "../../services/updateMethod/UpdateLeaveStatus";

// export const LeaveStatus = () => {
//   const { empLeaveStatusData } = useContext(DataSupply);
//   const { CRLeaveDetails } = CRLeaveData();
//   // const { LeaveUpDetails } = UpdateLeaveData();   

//   console.log("Leave Data from Context", empLeaveStatusData);

//   // State to handle loading indicator
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   // Convert Excel serial date to JS Date
//   const excelDateToJSDate = (serial) => {
//     if (isNaN(serial)) {
//       console.warn("Invalid Excel serial date value:", serial);
//       return null; // Handle invalid date case
//     }
//     const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Excel start date
//     const daysOffset = serial - 2; // Adjust for Excel date system
//     const jsDate = new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
//     console.log("Converted Excel serial to JS Date:", jsDate);
//     return jsDate;
//   };

//   const formatForGraphQL = (date, isAWSDate = false) => {
//     const jsDate = excelDateToJSDate(date);
//     if (!jsDate) {
//         console.error(`Invalid date: ${date}`);
//         return null; // Ensure invalid dates are caught
//     }

//     if (isAWSDate) {
//         const formattedDate = jsDate.toISOString().split('T')[0]; // Get only the date part (for AWSDate)
//         console.log(`Formatted AWSDate:`, formattedDate);
//         return formattedDate;
//     } else {
//         const formattedDateTime = jsDate.toISOString(); // Full datetime for AWSDateTime
//         console.log(`Formatted AWSDateTime:`, formattedDateTime);
//         return formattedDateTime;
//     }
// };


//   // Fetch the Excel file and process the data
//   const fetchExcelFile = async () => {
//     setLoading(true);
//     setErrorMessage(null);
//     try {
//       const response = await axios.get(
//         "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2024Supervisor.csv",
//         {
//           responseType: "arraybuffer",
//         }
//       );

//       const data = new Uint8Array(response.data);
//       console.log("Fetched Excel file data:", data);

//       const workbook = XLSX.read(data, { type: "array" });
//       const firstSheetName = workbook.SheetNames[0];
//       const firstSheet = workbook.Sheets[firstSheetName];

//       const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
//       console.log("Parsed Excel sheet data:", sheetData);

//       const dateKeys = ["fromDate", "toDate", "supervisorDate", "managerDate", "empDate", "startDate", "endDate"];

//       const transformedData = sheetData.slice(1).map((row) => {
//         let result = {};
//         sheetData[0].forEach((key, index) => {
//           let value = row[index];
//           if (dateKeys.includes(key) && !isNaN(value)) {
//             if (key === "fromDate" || key === "toDate" || key === "supervisorDate" || key === "managerDate") {
//               value = formatForGraphQL(value); // AWSDateTime
//             } else if (key === "startDate" || key === "endDate") {
//               value = formatForGraphQL(value, true); // AWSDate
//             }
//           }
//           result[key] = value !== undefined ? String(value) : value; // Convert to string
//         });
//         return result;
//       });

//       console.log("Transformed Data:", transformedData);

//       for (const LeaveValue of transformedData) {
//         console.log("GraphQL Payload to be sent:", LeaveValue);
//         try {
//           // await CRLeaveDetails({ LeaveValue });
//         } catch (error) {
//           console.error("Error during GraphQL request:", error);
//           setErrorMessage("An error occurred while sending the leave data. Please try again later.");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching Excel file:", error);
//       setErrorMessage("An error occurred while fetching the Excel file. Please try again later.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col gap-40">
//       <div>Leave Details</div>
//       {loading ? (
//         <div>Loading...</div>  // Replace this with a spinner if needed
//       ) : (
//         <button onClick={fetchExcelFile}>Click Here</button>
//       )}
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//     </div>
//   );
// };
