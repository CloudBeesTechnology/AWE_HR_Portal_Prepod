import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { WorkInfoFunc } from "../../services/createMethod/WorkInfoFunc";
import { UpdateWIData } from "../../services/updateMethod/UpdateWIData";
import { NLACreate } from "../../services/createMethod/NLACreate";
import { NLAUpdate } from "../../services/updateMethod/NLAUpdate";
import { CreateDoe } from "../../services/createMethod/CreateDoe";
import { UpdateDataFun } from "../../services/updateMethod/UpdateSDNData";

export const DNDetailsMD = () => {
  const { DNData } = useContext(DataSupply);
  const { CrerDoeFunData } = CreateDoe();
  const { UpdateMPData } = UpdateDataFun();
console.log(DNData);

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 1; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

// Link 1:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/DNDetails+Prod/DNdetails.csv"
// Link 2:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/DNDetails+Prod/DNDetails.csv"

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/DNDetails+Prod/DNDetails.csv",
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
        "doeEmpValid","nlmsEmpValid","doeEmpSubmit","doeEmpApproval","nlmsEmpApproval","nlmsEmpSubmit"
        
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
      for (const DoeValue of transformedData) {
        if (DoeValue.empID) {
          DoeValue.empID = String(DoeValue.empID);
          //   DoeValue.ppExpiry = [DoeValue.ppExpiry];
          //   DoeValue.bwnIcExpiry = [DoeValue.bwnIcExpiry];
        }
        console.log(DoeValue);

        const checkingDoeUpValueTable = DNData.find(
          (match) => match.empID === DoeValue.empID
        );

        if (checkingDoeUpValueTable) {
          console.log(DoeValue, "update");
          const DoeUpValue = {
            ...DoeValue,
            id: checkingDoeUpValueTable.id,
          };
          await UpdateMPData({ DoeUpValue });
        } else {
          console.log(DoeValue, "create");
          await CrerDoeFunData({ DoeValue });
        }
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-40">
      DNDetailsMD
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};
