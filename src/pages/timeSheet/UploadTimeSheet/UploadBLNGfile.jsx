import * as XLSX from "xlsx";
import { generateClient } from "@aws-amplify/api";
import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
} from "../../../graphql/queries";
const client = generateClient();
export const UploadBLNGfile = (
  excelFile,
  setExcelData,
  setExcelFile,
  fileInputRef,
  setLoading
) => {
  try {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, {
        type: "buffer",
        cellStyles: true,
      });
      const worksheetNameLength = workbook.SheetNames;
      const allSheets = [];

      const tableBodyData = [];
      const tableDatawithSpace = [];

      worksheetNameLength.forEach((sheetName) => {
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        allSheets.push({ sheetName, data: sheet });
      });

      // console.log(allSheets);
      const getResult =
        allSheets &&
        allSheets.map((sheet) => {
          const data = sheet.data;
          // console.log(data);
          var headerSlicedData = data.slice(0, 1);
          const changedHeader = headerSlicedData.map((columns) => {
            const foundKey = Object.entries(columns).map(([key, value]) => {
              return [{ key, value }];
            });
            return foundKey;
          });
          const result = changedHeader.flat().flat();
          var bodySlicedData = data.slice(1);
          // console.log(bodySlicedData);
          bodySlicedData.forEach((bodyData) => {
            const row = {};

            Object.entries(bodyData).forEach(([key, value]) => {
              const headerKey = result.find((header) => header.key === key);

              if (headerKey) {
                row[headerKey.value] = value;
              }
            });

            tableDatawithSpace.push(row);
          });

          return headerSlicedData;
        });

      // remove space, symbol
      function cleanKey(key) {
        if (typeof key !== "string") {
          return key; // Return value if not a string (e.g., number, object)
        }
        return key.replace(/[^a-zA-Z0-9]/g, ""); // Removes all non-alphanumeric characters
      }

      const formattedData = tableDatawithSpace.map((item) => {
        const cleanedItem = {};

        for (const key in item) {
          const cleanedKey = cleanKey(key).toUpperCase(); // Clean the key
          cleanedItem[cleanedKey] = item[key]; // Set the value using the cleaned key
        }
        const NewKeyValueAdded = {
          ...cleanedItem,
          NORMALWORKINGHRSPERDAY: "",
          WORKINGHOURS: "",
          OT: "",
          REMARKS: "",
        };

        return NewKeyValueAdded;
      });

      tableBodyData.push(formattedData);

      const excelSerialToDate = (serial, type) => {
        if (type === "dateTime") {
          const baseDate = new Date(1899, 11, 30);
          const excelDateInMillis = serial * 24 * 60 * 60 * 1000;
          return new Date(baseDate.getTime() + excelDateInMillis);
        } else if (type === "date") {
          const baseDate = new Date(1899, 11, 30);
          const daysToAdd = serial;
          return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
        } else if (type === "time") {
          const totalHours = serial * 24;
          const hours = Math.floor(totalHours);
          const totalMinutes = (totalHours - hours) * 60;
          const minutes = Math.floor(totalMinutes);
          const totalSeconds = (totalMinutes - minutes) * 60;
          const seconds = Math.round(totalSeconds);

          const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

          return formattedTime;
        } else if (type === "Avg. Daily Total By Day") {
          const totalMinutes = Math.round(serial * 24 * 60);
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;

          const formattedHours = String(hours).padStart(2, "0");
          const formattedMinutes = String(minutes).padStart(2, "0");

          return `${formattedHours}:${formattedMinutes}`;
        }
      };

      const formatDateTime = (date) => {
        return date.toLocaleString("en-US", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });
      };
      const dateTimeFunction = tableBodyData.flat();
      const updatedDataArray =
        dateTimeFunction &&
        dateTimeFunction.map((item) => {
          if (typeof item.EXITDATETIME === "number") {
            const entranceDate = excelSerialToDate(
              item.EXITDATETIME,
              "dateTime"
            );

            item.EXITDATETIME = formatDateTime(entranceDate);
          }
          if (typeof item.ENTRANCEDATETIME === "number") {
            const entranceDate = excelSerialToDate(
              item.ENTRANCEDATETIME,
              "dateTime"
            );

            item.ENTRANCEDATETIME = formatDateTime(entranceDate);
          }
          if (typeof item.ENTRANCEDATEUSED === "number") {
            const entranceDate = excelSerialToDate(
              item.ENTRANCEDATEUSED,
              "date"
            );
            const dateObject = new Date(entranceDate);
            item.ENTRANCEDATEUSED = dateObject.toLocaleDateString();
          }
          if (typeof item.AVGDAILYTOTALBYDAY === "number") {
            const entranceDate = excelSerialToDate(
              item.AVGDAILYTOTALBYDAY,
              "Avg. Daily Total By Day"
            );

            item.AVGDAILYTOTALBYDAY = entranceDate;
          }
          if (typeof item.ADININWORKSENGINEERINGSDNBHD === "number") {
            const entranceDate = excelSerialToDate(
              item.ADININWORKSENGINEERINGSDNBHD,
              "Avg. Daily Total By Day"
            );

            item.ADININWORKSENGINEERINGSDNBHD = entranceDate;
          }

          return item;
        });
      // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

      const transformedData = updatedDataArray.reduce((acc, curr) => {
        const {
          FID,
          NAMEFLAST,
          ENTRANCEDATEUSED,
          ENTRANCEDATETIME,
          EXITDATETIME,
          AVGDAILYTOTALBYDAY,
          ADININWORKSENGINEERINGSDNBHD,
          ...rest
        } = curr;

        // Retrieve the last entry in acc to carry forward FID and NAMEFLAST if missing
        const lastEntry = acc[acc.length - 1] || {};
        const currFID = FID || lastEntry.FID;
        const currName = NAMEFLAST || lastEntry.NAMEFLAST;
        const currEntraDUsed = ENTRANCEDATEUSED || lastEntry.ENTRANCEDATEUSED;

        // Find existing entry with the same FID, NAMEFLAST, and ENTRANCEDATEUSED
        const existingEntry = acc.find(
          (item) =>
            item.FID === currFID &&
            item.NAMEFLAST === currName &&
            item.ENTRANCEDATEUSED === currEntraDUsed
        );

        if (existingEntry) {
          // If found, push new times into the respective arrays
          existingEntry.ENTRANCEDATETIME.push(ENTRANCEDATETIME);
          existingEntry.EXITDATETIME.push(EXITDATETIME);
          // existingEntry.ADININWORKSENGINEERINGSDNBHD.push(
          //   ADININWORKSENGINEERINGSDNBHD
          // );
        } else {
          // Create a new entry if it doesn't exist
          acc.push({
            FID: currFID || "", // Carry forward or default to empty string
            NAMEFLAST: currName || "", // Carry forward or default to empty string
            ENTRANCEDATEUSED: ENTRANCEDATEUSED, // Keep date as is
            ENTRANCEDATETIME: [ENTRANCEDATETIME], // Initialize as array
            EXITDATETIME: [EXITDATETIME], // Initialize as array
            AVGDAILYTOTALBYDAY:AVGDAILYTOTALBYDAY,
            ADININWORKSENGINEERINGSDNBHD: AVGDAILYTOTALBYDAY,
            ...rest, // Include other properties
          });
          console.log("Working...");
        }

        return acc;
      }, []);
      console.log("transformedData : ", transformedData);

      transformedData.forEach((entry) => {
        if (entry.FID && entry.ENTRANCEDATEUSED) {
          if (entry.EXITDATETIME.length > 1) {
            entry.EXITDATETIME = [
              entry.EXITDATETIME[entry.EXITDATETIME.length - 1],
            ]; // Keep only the last EXITDATETIME
          }
          if (entry.ENTRANCEDATETIME.length > 1) {
            entry.ENTRANCEDATETIME = [entry.ENTRANCEDATETIME[0]]; // Keep only the last EXITDATETIME
          }
        }
      });

      setExcelData(transformedData);
      setLoading(false);

      return getResult.flat();
    }
    fileInputRef.current.value = "";
    setExcelFile(null);
  } catch (err) {}
};
