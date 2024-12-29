import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { WorkInfoFunc } from "../../services/createMethod/WorkInfoFunc";
import { UpdateWIData } from "../../services/updateMethod/UpdateWIData";
import { NLACreate } from "../../services/createMethod/NLACreate";
import { NLAUpdate } from "../../services/updateMethod/NLAUpdate";

export const NonLocalAccMD = () => {
  const { NLAData } = useContext(DataSupply);
  const { NLADatas } = NLACreate();
  const { NLAUpdateFun } = NLAUpdate();

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 1; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };
  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmployeeDetails/Non-Local+Accommodation+in+Brunei+-+as+at+23DEC2024/EmployeeNonLocalAcco.csv",
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

          result[key] = value !== undefined ? String(value) : value; // Convert to string
        });
        return result;
      });
      // console.log("All Data:", transformedData);
      for (const NLACreValue of transformedData) {
        if (NLACreValue.empID) {
          NLACreValue.empID = String(NLACreValue.empID);
          //   NLACreValue.ppExpiry = [NLACreValue.ppExpiry];
          //   NLACreValue.bwnIcExpiry = [NLACreValue.bwnIcExpiry];
        }
        console.log(NLACreValue);

        const checkingNLADataTable = NLAData.find(
          (match) => match.empID === NLACreValue.empID
        );

        if (checkingNLADataTable) {
          console.log(NLACreValue, "update");
          const NLAValue = {
            ...NLACreValue,
            IDTable: checkingNLADataTable.id,
          };
          await NLAUpdateFun({ NLAValue });
        } else {
          console.log(NLACreValue, "create");
          await NLADatas({ NLACreValue });
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
      NonLocalAccMD
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};
