import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { WorkInfoFunc } from "../../services/createMethod/WorkInfoFunc";
import { UpdateWIData } from "../../services/updateMethod/UpdateWIData";
import { EmpInsDataFun } from "../../pages/employees/insurance/EmpInsDataFun";
import { UpdateEmpInsDataFun } from "../../services/updateMethod/UpdateEmpInsurance";

export const EmpInsuranceMD = () => {
  const { EmpInsuranceData } = useContext(DataSupply);
  const { SubmitMPData } = EmpInsDataFun();
  const { UpdateEIDataSubmit } = UpdateEmpInsDataFun();
console.log(EmpInsuranceData);


  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 2; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

  // Link 1: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmpInsurance+Prod/EmpInsurance.csv"

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmpInsurance+Prod/EmpInsurance.csv",
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
        "doj",
        "contractStart",
        "contractEnd",
        "probationEnd",
        "probationStart",
        "upgradeDate",
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
      for (const empInsValue of transformedData) {
        if (!empInsValue.empID) {
          continue;
        }
        if (empInsValue.empID) {
          empInsValue.empID = String(empInsValue.empID);
          //   empInsValue.ppExpiry = [empInsValue.ppExpiry];
          //   empInsValue.bwnIcExpiry = [empInsValue.bwnIcExpiry];
        }
        console.log(empInsValue);

        const checkingEmpInsuranceTable = EmpInsuranceData.find(
          (match) => match.empID === empInsValue.empID
        );

        if (checkingEmpInsuranceTable) {
          console.log(empInsValue, "update");
          const InsuranceUpValue = {
            ...empInsValue,
            id: checkingEmpInsuranceTable.id,
          };
          await UpdateEIDataSubmit({ empInsValue: InsuranceUpValue });
        } else {
          console.log(empInsValue, "create");
          await SubmitMPData({ empInsValue });
        }
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-40">
      EmpInsuranceMD
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};
