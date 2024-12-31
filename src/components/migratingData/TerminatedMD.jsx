import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { WorkInfoFunc } from "../../services/createMethod/WorkInfoFunc";
import { UpdateWIData } from "../../services/updateMethod/UpdateWIData";

export const TerminatedMD = () => {
  const { terminateData } = useContext(DataSupply);
  const { SubmitWIData } = WorkInfoFunc();
  const { WIUpdateData } = UpdateWIData();

  console.log(terminateData);
  

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 1; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

  // Link 1:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/TerminationInfo+Prod/TerminationInfo.csv"

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/TerminationInfo+Prod/TerminationInfo.csv",
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
      const dateKeys = ["termiDate", "resignDate"];
      const transformedData = sheetData.slice(1).map((row) => {
        let result = {};
        sheetData[0].forEach((key, index) => {
          let value = row[index];
          if (dateKeys.includes(key)) {
            value = undefined; // Set the value to null for date keys
          }
          result[key] = value;

          //   if (dateKeys.includes(key) && !isNaN(value)) {
          //     value = excelDateToJSDate(value).toISOString().split("T")[0];
          //   }

          //   result[key] = value !== undefined ? String(value) : value; // Convert to string
        });
        return result;
      });
      // console.log("All Data:", transformedData);
      for (const workInfoValue of transformedData) {
        if (!workInfoValue.empID) {
          continue;
        }

        if (workInfoValue.empID) {
          workInfoValue.empID = String(workInfoValue.empID);
          //   workInfoValue.ppExpiry = [workInfoValue.ppExpiry];
          //   workInfoValue.bwnIcExpiry = [workInfoValue.bwnIcExpiry];
        }
        console.log(workInfoValue.empID);

        const checkingWorkInfoTable = terminateData.find(
          (match) =>
            match.empID === workInfoValue.empID
        //    ===
        //     workInfoValue.empID.trim().toLowerCase()
        );


        if (checkingWorkInfoTable) {
            console.log(workInfoValue, "update");
          const workInfoUpValue = {
            ...workInfoValue,
            workInfoDataRecord: checkingWorkInfoTable,
          };
            await WIUpdateData({ workInfoUpValue });
        } else {
            console.log(workInfoValue, "create");
            await SubmitWIData({ workInfoValue });
        }
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-40">
      TerminatedMD
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};
