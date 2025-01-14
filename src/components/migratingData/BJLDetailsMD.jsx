
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { UpdateDataFun } from "../../services/updateMethod/UpdateSDNData";
import { BJLDataFun } from "../../services/createMethod/BJLDataFun";
import { UpdateBJL } from "../../services/updateMethod/UpdateBJL";

export const BJLDetailsMD = () => {
  const { BJLData } = useContext(DataSupply);
  const { BGData } = BJLDataFun();
  const { UpdateBJLFun } = UpdateBJL();
console.log(BJLData);

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 2; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

// Link 1:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/BJLDetails+Prod/BJLDetails.csv"
// Link 2:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/BJLDetails+Prod/BJLDetails+1.csv"

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/BJLDetails+Prod/BJLDetails+1.csv",
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
        "jpValid","bankValid","bankSubmit","bankRece","bankEndorse","jpEndorse","tbaPurchase","lbrDepoSubmit"
        
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
      for (const BJLValue of transformedData) {
        if (BJLValue.empID) {
          BJLValue.empID = String(BJLValue.empID);
        }
        console.log(BJLValue);

        const checkingBJLTable = BJLData.find(
          (match) => match.empID === BJLValue.empID
        );

        if (checkingBJLTable) {
          console.log(BJLValue, "update");
          const BJLUpValue = {
            ...BJLValue,
            id: checkingBJLTable.id,
          };
          await UpdateBJLFun({ BJLUpValue });
        } else {
          console.log(BJLValue, "create");
          await BGData({ BJLValue });
        }
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-40">
      BJLDetailsMD
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};
