import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { MedicalPassFunc } from "../../services/createMethod/MedicalPassFunc";
import { UpdateMedical } from "../../services/updateMethod/UpdateMedicalInfo";

export const LabourMedicalInfoMD = () => {
  const { LMIData } = useContext(DataSupply);
  const { SubmitMPData } = MedicalPassFunc();
  const { updateMedicalSubmit } = UpdateMedical();
  console.log(LMIData);

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 2; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

  // Link 1:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LabourMedicalInfo+Prod/LabourMedicalInfo.csv"
  // Link 2:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LabourMedicalInfo+Prod/LabourMedicalInfo+1.csv"
  // Link 3:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LabourMedicalInfo+Prod/LabourMedicalInfo+2.csv"

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/LabourMedicalInfo+Prod/LabourMedicalInfo+2.csv",
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
      const dateKeys = ["bruneiME"];
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
      for (const labValue of transformedData) {
        if (!labValue.empID) {
          continue;
        }
        if (labValue.empID) {
          labValue.empID = String(labValue.empID);
        }
        console.log(labValue);

        const checkingLMITable = LMIData.find(
          (match) => match.empID === labValue.empID
        );

        if (checkingLMITable) {
          console.log(labValue, "update");
          const LabUpValue = {
            ...labValue,
            LabTable: checkingLMITable.id,
          };
          await updateMedicalSubmit({ LabUpValue });
        } else {
          console.log(labValue, "create");
          await SubmitMPData({ labValue });
        }
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-40">
      LabourMedicalInfoMD
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};
