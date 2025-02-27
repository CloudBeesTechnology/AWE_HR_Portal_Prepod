import axios from "axios";
import React, { useContext } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { CRLeaveData } from "../../services/createMethod/CreateLeaveStatus";
// import { UpdateLeaveData } from "../../services/updateMethod/UpdateLeaveStatus";

export const LeaveStatus = () => {
  const { CRLeaveDetails } = CRLeaveData();
  // const { LeaveUpDetails } = UpdateLeaveData();

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Excel start date
    const daysOffset = serial - 2; // Adjust for Excel's leap year bug
    const date = new Date(
      excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000
    );

    // Extract month and day normally
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1; // Months are 0-based in JS
    let year = date.getUTCFullYear();

    // **Swap day and month manually**
    [day, month] = [month, day];

    // Format to DD/MM/YYYY
    const formattedDate = `${String(day).padStart(2, "0")}/${String(
      month
    ).padStart(2, "0")}/${year}`;

    console.log("Fixed Formatted Date:", formattedDate);
    return formattedDate;
  };

  // Link 1:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2024Supervisor.csv"
  // Link 2:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2024.csv"
  // Link 3:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2025.csv"
  // Link 4:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2025Supervisor.csv"
  // Link 5:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus+Dev/LeaveStatusTesting+Prod.csv" date:22-02-2025 time:12:40
  // Link 6:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2025.csv" date:22-02-2025 time:5:52
  // Link 7:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2025Supervisor.csv" date:25-02-2025 time:4:00
  // Link 8:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatuS2024.csv" date:25-02-2025 time:4:16
  // Link 9:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2024Supervisor.csv" date:25-02-2025 time:4:27

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2024Supervisor.csv",
        {
          responseType: "arraybuffer", // Important to fetch as arraybuffer
        }
      );
      // Convert the response to an array buffer
      const data = new Uint8Array(response.data);

      // Parse the file using XLSX
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];

      // Convert sheet data to JSON format
      const sheetData = XLSX.utils.sheet_to_json(firstSheet, {
        header: 1,
        raw: false,
      });
      const dateKeys = [
        "fromDate",
        "toDate",
        "supervisorDate",
        "managerDate",
        "empDate",
        "startDate",
        "endDate",
        "receivedDate",
        "selectedFrom",
        "selectedTo",
      ];

      const transformedData = sheetData.slice(1).map((row) => {
        let result = {};
        sheetData[0].forEach((key, index) => {
          let value = row[index];

          // Ensure `empID` preserves leading zeros but doesn't always force 3 digits
          if (key === "empID") {
            value = typeof value === "number" ? value.toString() : value;
          }

          // Convert date fields correctly
          if (dateKeys.includes(key) && value) {
            // console.log("Processing date:", value);
            // Check if value is a valid date format (contains "/" or "-")
            let delimiter = value.includes("/")
              ? "/"
              : value.includes("-")
              ? "-"
              : null;

            if (!delimiter) {
              console.warn(`Skipping invalid date format: ${value}`);
              result[key] = value; // Keep the original value
              return;
            }

            let parts = value.split(delimiter);

            // Ensure the date has three parts: day, month, year
            if (parts.length !== 3) {
              console.warn(`Skipping invalid date: ${value}`);
              result[key] = value;
              return;
            }

            let [day, month, year] = parts;

            // Ensure year is numeric and has either 2 or 4 digits
            if (!/^\d+$/.test(year)) {
              console.warn(`Skipping invalid year: ${year} in ${value}`);
              result[key] = value;
              return;
            }

            let part3 = year.length === 2 ? "20" + year.padStart(2, "0") : year;

            const finalDate = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${part3}`;
            result[key] = finalDate;

            // console.log(`Formatted Date: ${finalDate}`);
          } else {
            result[key] = value; // Keep original value for non-date fields
          }
        });
        return result;
      });

      // console.log("All Data:", transformedData);
      for (const LeaveValue of transformedData) {
        if (!LeaveValue.empID) {
          continue;
        }
        if (LeaveValue.empID) {
          LeaveValue.empID = String(LeaveValue.empID);
          // console.log(LeaveValue.applyTo);
        }
        console.log("Leave value processed", LeaveValue);

        // await CRLeaveDetails({ LeaveValue });
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
// import React, { useContext } from "react";
// import * as XLSX from "xlsx";
// import { DataSupply } from "../../utils/DataStoredContext";
// import { CRLeaveData } from "../../services/createMethod/CreateLeaveStatus";
// // import { UpdateLeaveData } from "../../services/updateMethod/UpdateLeaveStatus";

// export const LeaveStatus = () => {
//   const { empLeaveStatusData } = useContext(DataSupply);
//   const { CRLeaveDetails } = CRLeaveData();
//   // const { LeaveUpDetails } = UpdateLeaveData();   


//   // console.log("Leave Data from Context",empLeaveStatusData);

//   const excelDateToJSDate = (serial) => {
//     const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
//     const daysOffset = serial - 2; // Excel considers 1 as Jan 1, 1900
//     return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
//   };

//   // Link 1:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2024Supervisor.csv"
//   // Link 2:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2024.csv"
//   // Link 3:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2025.csv"
//   // Link 4:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus/LeaveStatus2025Supervisor.csv"
//   // Link 5:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus+Dev/LeaveStatusTesting+Prod.csv" date:22-02-2025 time:12:40

//   const fetchExcelFile = async () => {
//     try {
//       // Fetch the Excel file from the URL
//       const response = await axios.get(
//         "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus+Dev/LeaveStatusTesting+Prod.csv",
//         {
//           responseType: "arraybuffer", // Important to fetch as arraybuffer
//         }
//       );
//       // Convert the response to an array buffer
//       const data = new Uint8Array(response.data);
//       console.log(data);

//       // Parse the file using XLSX
//       const workbook = XLSX.read(data, { type: "array" });
//       const firstSheetName = workbook.SheetNames[0];
//       const firstSheet = workbook.Sheets[firstSheetName];

//       // Convert sheet data to JSON format
//       const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
//       const dateKeys = [
//         "fromDate",
//         "toDate",
//         "supervisorDate",
//         "managerDate",
//         "empDate",
//         "receivedDate",
//         "startDate",
//         "endDate",
//         "selectedFrom","selectedTo"
//       ];
//       const transformedData = sheetData.slice(1).map((row) => {
//         let result = {};
//         sheetData[0].forEach((key, index) => {
//           let value = row[index];
//           if (dateKeys.includes(key) && !isNaN(value)) {
//             value = excelDateToJSDate(value).toISOString().split("T")[0];
//           }

//           result[key] = value !== undefined ? String(value) : value; // Convert to string
//         });
//         return result;
//       });
//       // console.log("All Data:", transformedData);
//       for (const LeaveValue of transformedData) {
//         if (LeaveValue.empID) {
//           LeaveValue.empID = String(LeaveValue.empID);
//           // console.log(LeaveValue.applyTo);
          
//         }
//         console.log("Leave value processed", LeaveValue);

//         // await CRLeaveDetails({ LeaveValue });
        
//       }
//     } catch (error) {
//       console.error("Error fetching Excel file:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-40">
//       Leave Details 
//       <button onClick={fetchExcelFile}>Click Here</button>
//     </div>
//   );
// };

