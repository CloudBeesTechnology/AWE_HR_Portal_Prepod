import React, { useContext, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { EmpInfoFunc } from "../../services/createMethod/EmpInfoFunc";
import { DataSupply } from "../../utils/DataStoredContext";
import { UpdateEmpInfo } from "../../services/updateMethod/UpdateEmpInfo";

export const EmpPersonalMD = () => {
  const [excelData, setExcelData] = useState(null);
  const { empPIData } = useContext(DataSupply);
  const { SubmitEIData } = EmpInfoFunc();
  const { UpdateEIValue } = UpdateEmpInfo();

console.log(empPIData);

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 1; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

  // Link 1: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/PersonalInfo+Prod/EmpPersonaInfo.csv",
  // Link 2: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/PersonalInfo+Prod/EmpPersonnelInfo.csv"
  // Link 3: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/PersonalInfo+Prod/EmPPersonalInfo.csv"
  // Link 4: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/PersonalInfo+Prod/EmppersonalInfo.csv"
  // Link 5: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/PersonalInfo+Prod/EmpPersonalInfO.csv"
  // Link 6: "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/PersonalInfo+Prod/EMPpersonalInfo.csv"

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/PersonalInfo+Prod/EmpPersonnelInfo.csv",
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
          if (key === "dob" && !isNaN(value)) {
            // Convert Excel serial date to a readable format
            value = excelDateToJSDate(value).toISOString().split("T")[0];
          }
          if (key === "familyDetails") {
            value = JSON.stringify(value);
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

        const checkingPITable = empPIData.find(
          (match) =>
            match?.empID?.toString().toLowerCase() ===
            empValue?.empID?.toString().toLowerCase()
        );

        if (checkingPITable) {
          console.log(empValue, "update");

          const collectValue = {
            ...empValue,
            PITableID: checkingPITable.id,
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
      EmpPersonalinfoMD
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};
