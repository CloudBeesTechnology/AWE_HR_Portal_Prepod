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

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 1; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };
  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmployeeDetails/IDDetails.csv ",
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

      const transformedData = sheetData.slice(1).map((row) => {
        let result = {};
        sheetData[0].forEach((key, index) => {
          let value = row[index];
          if (key === "ppExpiry" && !isNaN(value)) {
            // Convert Excel serial date to a readable format
            value = excelDateToJSDate(value).toISOString().split("T")[0];
          }
          if (key === "bwnIcExpiry" && !isNaN(value)) {
            // Convert Excel serial date to a readable format
            value = excelDateToJSDate(value).toISOString().split("T")[0];
          }

          result[key] = value !== undefined ? String(value) : value; // Convert to string
        });
        return result;
      });
      // console.log("All Data:", transformedData);
      for (const empValue of transformedData) {
        if (empValue.empID) {
          empValue.empID = String(empValue.empID);
          empValue.ppExpiry = [empValue.ppExpiry];
          empValue.bwnIcExpiry = [empValue.bwnIcExpiry];
        }
        // console.log(empValue);

        const checkingIDTable = IDData.find(
          (match) => match.empID === empValue.empID
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

  
        // const cleanData = Object.fromEntries(
        //   Object.entries(IDValue).filter(([key, value]) =>
        //     allowedFields.includes(key) && value !== undefined
        //   )
        // );

        // console.log(allowedFields);
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
