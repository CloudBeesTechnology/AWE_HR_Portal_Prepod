import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { EmpInfoFunc } from "../../services/createMethod/EmpInfoFunc";
import { DataSupply } from "../../utils/DataStoredContext";
import { UpdateEmpInfo } from "../../services/updateMethod/UpdateEmpInfo";

export const IDDetailsMD = () => {
  const { IDData } = useContext(DataSupply);
  const { SubmitEIData } = EmpInfoFunc();
  const { UpdateEIValue } = UpdateEmpInfo();

  console.log(IDData);

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 2; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

  // Link 1: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/IDDetails+Prod/IDDetails.csv"
  // Link 2: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/IDDetails+Prod/IDdetails+2.csv"
  // Link 3: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/IDDetails+Prod/IdDetails+3.csv"
  // Link 4: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/IDDetails+Prod/IDDetails+Update.csv"
  // Link 5: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/IDDetails+Prod/IdDetails+4.csv"
  // Link 6: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/IDDetails+Prod/IdDetails+5.csv"
  // Link 7: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/IDDetails+Prod/IDdetails+6.csv"
  // Link 8: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/IDDetails+Prod/IDDetails+7.csv"

  const fetchExcelFile = async () => {
    try {
      // IDData.map(async (val) => {
      //   // Process the object to remove null values and handle arrays
      //   const cleanedVal = Object.fromEntries(
      //     Object.entries(val).map(([key, value]) => {
      //       if (Array.isArray(value)) {
      //         // Replace arrays with only [null] or empty values with []
      //         return [key, value.every((item) => item === null) ? [] : value];
      //       }
      //       // Remove null fields, retain non-null values
      //       return [key, value !== null ? value : undefined];
      //     }).filter(([key, value]) => value !== undefined) // Remove undefined entries
      //   );

      //   // Check if the cleaned object matches an existing entry
      //   const checkingIDTable = IDData.find(
      //     (match) => match?.empID === cleanedVal?.empID
      //   );

      //   console.log(cleanedVal); // Log the cleaned object

      //   if (checkingIDTable) {
      //     console.log(cleanedVal, "update");
      //     const collectValue = {
      //       ...cleanedVal,
      //       IDTable: checkingIDTable.id,
      //     };
      //     // Perform the update operation
      //     await UpdateEIValue({ collectValue });
      //   } else {
      //     console.log(cleanedVal, "create");
      //     // Perform the create operation
      //     await SubmitEIData({ cleanedVal });
      //   }
      // });

      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/IDDetails+Prod/IDdetails+6.csv",
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
      const dateKeys = ["ppExpiry", "bwnIcExpiry", "ppIssued"];
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
      for (const empValue of transformedData) {
        if (!empValue.empID) {
          continue;
        }

        if (empValue.empID) {
          empValue.empID = String(empValue.empID);
      
        }
        console.log(empValue);

        const checkingIDTable = IDData.find(
          (match) => match?.empID === empValue?.empID
        );

        if (checkingIDTable) {
          console.log(empValue, "update");
          const collectValue = {
            ...empValue,
            IDTable: checkingIDTable.id,
          };
          await UpdateEIValue({ collectValue });
        } else {
          console.log(empValue, "create");
          await SubmitEIData({ empValue });
        }
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-40">
      IDDetailsMD
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};
