import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { AddEmpFun } from "../../services/createMethod/AddEmpFun";
import { AddEmpReqUp } from "../../services/updateMethod/AddEmpReqUp";
export const TriningReqMD = () => {
  const { AddEmpReq } = useContext(DataSupply);

const { AddEmpData } = AddEmpFun();
  const { TrReqUp } = AddEmpReqUp();
// console.log(AddEmpReq);

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1));
    const daysOffset = serial - 2;
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

// Link 1:https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus+Dev/TrainingReq+1.csv"

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LeaveStatus+Dev/TrainingReq+1.csv",
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
        "traineeED","traineeSD","medicalAppointDate","medicalExpiry",""
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
      for (const AddEmpValue of transformedData) {
        if (AddEmpValue.empID) {
          AddEmpValue.empID = String(AddEmpValue.empID);
        }
        // console.log(AddEmpValue);

        const checkingBJLTable = AddEmpReq.find(
          (match) => match.empID === AddEmpValue.empID
        );

        if (checkingBJLTable) {
        //   console.log(AddEmpValue, "update");
          const TMRDataUp = {
            ...AddEmpValue,
            id: checkingBJLTable.id,
          };
        //   console.log(TMRDataUp, "UPDATE");

          await TrReqUp({ TMRDataUp });
        } else {
          console.log(AddEmpValue, "create");
        //   await AddEmpData({ AddEmpValue });
        }
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-40">
      Trining Req 
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};
