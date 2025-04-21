

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { TCDataFun } from "../../services/createMethod/TCDataFun";
import { TCDataUpdate } from "../../services/updateMethod/TCDataUpdate";

export const TrainingCertifyMD = () => {
  const { trainingCertifi } = useContext(DataSupply);
  const { TCData } = TCDataFun();
  const { TCDataFunUp } = TCDataUpdate();

console.log(trainingCertifi);

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1));
    const daysOffset = serial - 2;
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

// Link 1:https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/Training+Data/trainingCertifi%C2%A0HO.csv"
// Link 2:https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/Training+Data/trainingCertifi+Single%C2%A0OME.csv"
// Link 3:https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/Training+Data/trainingCertifi+Double+BLNG+and%C2%A0E%26I.csv"
// Link 4:https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/Training+Data/trainingCertifi+BLNG+and+E%26I+Single+Prod.csv"

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/Training+Data/trainingCertifi+BLNG+and+E%26I+Single+Prod.csv",
        {
          responseType: "arraybuffer", // Important to fetch as arraybuffer
        }
      );
      // Convert the response to an array buffer
      const data = new Uint8Array(response.data);
    //   console.log(data);

      // Parse the file using XLSX
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];

      // Convert sheet data to JSON format
      const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    
      const dateKeys = [
        "certifiExpiry","eCertifiDate","orgiCertifiDate"
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
      for (const TCValue of transformedData) {
        if (!TCValue.empID) {
          continue;
        }
        if (TCValue.empID) {
          TCValue.empID = String(TCValue.empID);
        }
        // console.log(TCValue);

        const checkingBJLTable = trainingCertifi.find(
          (match) => match.empID === TCValue.empID
        );

        if (checkingBJLTable) {
        //   console.log(TCValue, "update");
          const TCDataUp = {
            ...TCValue,
            id: checkingBJLTable.id,
          };
          // console.log(TCDataUp, "UPDATE");

          await TCDataFunUp({ TCDataUp });
        } else {
          // console.log(TCValue, "create");
          await TCData({ TCValue });
        }
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-40">
      TrainingCertifyMD
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};