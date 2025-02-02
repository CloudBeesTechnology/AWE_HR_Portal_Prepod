import * as XLSX from "xlsx";

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

      const getResult =
        allSheets &&
        allSheets.map((sheet) => {
          const data = sheet.data;

          var headerSlicedData = data.slice(0, 1);
          const changedHeader = headerSlicedData.map((columns) => {
            const foundKey = Object.entries(columns).map(([key, value]) => {
              return [{ key, value }];
            });
            return foundKey;
          });

          const result = changedHeader.flat().flat();

          var bodySlicedData = data.slice(1);

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
     

      // function excelSerialToDateTime(serial) {
      //   const excelEpoch = new Date(1899, 11, 30); // Correct Excel base date is 30-Dec-1899
      //   const milliseconds = Math.round(serial * 24 * 60 * 60 * 1000); // Fix precision errors
      //   const date = new Date(excelEpoch.getTime() + milliseconds); // Add ms to base date

      //   // Format date correctly without AM/PM
      //   const options = {
      //     year: "numeric",
      //     month: "2-digit",
      //     day: "2-digit",
      //     hour: "2-digit",
      //     minute: "2-digit",
      //     second: "2-digit",
      //     hour12: true, // Ensure 24-hour format
      //     // timeZone: "Asia/Brunei" // Ensure correct timezone
      //   };

      //   const formattedDate = date
      //     .toLocaleString("en-GB", options)
      //     .replace(",", ""); // Remove comma

      //   return formattedDate;
      // }


      const excelSerialToDate = (serial, type) => {
        if (type === "dateTime") {
          // const baseDate = new Date(1899, 11, 30);
          // const excelDateInMillis = serial * 24 * 60 * 60 * 1000;
          // return new Date(baseDate.getTime() + excelDateInMillis);

          const excelEpoch = new Date(1899, 11, 30); // Correct Excel base date is 30-Dec-1899
          const milliseconds = serial * 24 * 60 * 60 * 1000; // Convert days to ms
          return new Date(excelEpoch.getTime() + milliseconds); // Add ms to base date
          // Format date as "DD-MM-YYYY HH:MM:SS"
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
        } else if (type === "Daily" || type === "Daily Total") {
          try {
            const match = serial?.match(/(\d+)h\s*(\d+)m/);
            if (!match) return 0;

            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);

            return hours + minutes / 60;
          } catch (err) {}
        }
      };

      const formatDateTime = (date) => {
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          // timeZone: "Asia/Brunei", // Set the time zone to Brunei
        };

        const formattedDate = date
          .toLocaleString("en-GB", options)
          .replace(",", ""); // Remove comma

        return formattedDate;
      };

      const dateTimeFunction = tableBodyData.flat();
      // console.log(dateTimeFunction);

      // const updatedDataArray =
      //   dateTimeFunction &&
      //   dateTimeFunction.map((item) => {
      //     if (typeof item.LATESTENTRYTIME === "number") {
      //       // const entranceDate = excelSerialToDate(
      //       //   item.LATESTENTRYTIME,
      //       //   "dateTime"
      //       // );

      //       const latestEntryTime = excelSerialToDateTime(item.LATESTENTRYTIME);

      //       // item.LATESTENTRYTIME = formatDateTime(entranceDate);
      //       item.LATESTENTRYTIME = latestEntryTime;
      //     }

      //     return item
      //   });

      const excelData = [
        {
          BPCOMPANY: "ADININ WORKS & ENGINEERING SDN BHD",
          FID: 596,
          NAMEFLAST: "UNTING AK GENA",
          ENTRANCEDATE: 45632,
          EARLIESTENTRYTIME: 45632.2572106481,
          LATESTENTRYTIME: 45632.7302199074,
          DAYDIFFERENCE: 0,
          ENTRYTIME: 45632.2572106481,
          EXITTIME: 45632.4711689815,
          DAILY: "5h 8m",
          DAILYTOTAL: "11h 15m",
          NORMALWORKINGHRSPERDAY: "",
          WORKINGHOURS: "",
          OT: "",
          REMARKS: "",
        },
      ];
      
      // Function to convert Excel serial date to a formatted date-time string
      function excelSerialToDateTime(serial) {
        const excelEpoch = new Date(1899, 11, 30); // Excel base date
        const milliseconds = Math.round(serial * 24 * 60 * 60 * 1000); // Convert serial to ms
        const date = new Date(excelEpoch.getTime() + milliseconds); // Add to base date
      
        // Convert to required format (DD/MM/YYYY HH:MM:SS am/pm)
        const formattedDate = date.toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true, // 12-hour format with AM/PM
        });
      
        return formattedDate.replace(",", ""); // Remove extra comma
      }
      
      // Process and update the data array
      const updatedDataArray = excelData.map((item) => {
        if (typeof item.LATESTENTRYTIME === "number") {
          item.LATESTENTRYTIME = excelSerialToDateTime(item.LATESTENTRYTIME);
        }
        return item;
      });
      
      // Output result
      // console.log(updatedDataArray);

      
      // const updatedDataArray =
      //   dateTimeFunction &&
      //   dateTimeFunction.map((item) => {
      //     if (typeof item.EXITTIME === "number") {
      //       const entranceDate = excelSerialToDate(item.EXITTIME, "dateTime");

      //       item.EXITTIME = formatDateTime(entranceDate);
      //     }
      //     if (typeof item.ENTRYTIME === "number") {
      //       const entranceDate = excelSerialToDate(item.ENTRYTIME, "dateTime");

      //       item.ENTRYTIME = formatDateTime(entranceDate);
      //     }

      //     if (typeof item.EARLIESTENTRYTIME === "number") {
      //       const entranceDate = excelSerialToDate(
      //         item.EARLIESTENTRYTIME,
      //         "dateTime"
      //       );

      //       item.EARLIESTENTRYTIME = formatDateTime(entranceDate);
      //     }
      //     if (typeof item.LATESTENTRYTIME === "number") {
      //       const entranceDate = excelSerialToDate(
      //         item.LATESTENTRYTIME,
      //         "dateTime"
      //       );

      //       const latestEntryTime = excelSerialToDateTime(item.LATESTENTRYTIME);

      //       // item.LATESTENTRYTIME = formatDateTime(entranceDate);
      //       item.LATESTENTRYTIME = latestEntryTime;
      //     }
      //     if (typeof item.ENTRANCEDATE === "number") {
      //       const entranceDate = excelSerialToDate(item.ENTRANCEDATE, "date");
      //       const dateObject = new Date(entranceDate);

      //       item.ENTRANCEDATE = dateObject.toLocaleDateString();
      //     }
      //     if (typeof item.DAILYTOTAL === "number") {
      //       const entranceDate = excelSerialToDate(
      //         item.DAILYTOTAL,
      //         "Daily Total"
      //       );

      //       item.DAILYTOTAL = item.DAILYTOTAL;
      //     }
      //     if (typeof item.DAILY === "string") {
      //       const entranceDate = excelSerialToDate(item.DAILY, "Daily");

      //       item.DAILY = item.DAILYTOTAL;
      //     }

      //     return item;
      //   });
      // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
      // console.log(updatedDataArray);
      const transformedData = updatedDataArray.reduce((acc, curr) => {
        const {
          FID,
          NAMEFLAST,
          ENTRANCEDATE,
          ENTRYTIME,
          EXITTIME,
          EARLIESTENTRYTIME,
          LATESTENTRYTIME,
          DAILYTOTAL,
          DAILY,
          ...rest
        } = curr;

        // Retrieve the last entry in acc to carry forward FID and NAMEFLAST if missing
        const lastEntry = acc[acc.length - 1] || {};
        const currFID = FID || lastEntry.FID;
        const currName = NAMEFLAST || lastEntry.NAMEFLAST;
        const currEntraDUsed = ENTRANCEDATE || lastEntry.ENTRANCEDATE;

        // Find existing entry with the same FID, NAMEFLAST, and ENTRANCEDATE
        const existingEntry = acc.find(
          (item) =>
            item.FID === currFID &&
            item.NAMEFLAST === currName &&
            item.ENTRANCEDATE === currEntraDUsed
        );

        if (existingEntry) {
          // If found, push new times into the respective arrays
          existingEntry.ENTRYTIME.push(ENTRYTIME);
          existingEntry.EXITTIME.push(EXITTIME);

          existingEntry.EARLIESTENTRYTIME.push(EARLIESTENTRYTIME);
          existingEntry.LATESTENTRYTIME.push(LATESTENTRYTIME);

          // existingEntry.DAILY.push(
          //   DAILY
          // );
        } else {
          // Create a new entry if it doesn't exist
          acc.push({
            FID: currFID || "", // Carry forward or default to empty string
            NAMEFLAST: currName || "", // Carry forward or default to empty string
            ENTRANCEDATE: ENTRANCEDATE, // Keep date as is
            ENTRYTIME: [ENTRYTIME], // Initialize as array
            EXITTIME: [EXITTIME], // Initialize as array
            EARLIESTENTRYTIME: [EARLIESTENTRYTIME],
            LATESTENTRYTIME: [LATESTENTRYTIME],
            DAILYTOTAL: DAILYTOTAL,
            DAILY: DAILYTOTAL,
            ...rest, // Include other properties
          });
        }

        return acc;
      }, []);

      transformedData.forEach((entry) => {
        if (entry.FID && entry.ENTRANCEDATE) {
          if (entry.EXITTIME.length > 1) {
            entry.EXITTIME = [entry.EXITTIME[entry.EXITTIME.length - 1]]; // Keep only the last EXITTIME
          }
          if (entry.ENTRYTIME.length > 1) {
            entry.ENTRYTIME = [entry.ENTRYTIME[0]]; // Keep only the last EXITTIME
          }

          if (entry.LATESTENTRYTIME.length > 1) {
            entry.LATESTENTRYTIME = [
              entry.LATESTENTRYTIME[entry.LATESTENTRYTIME.length - 1],
            ]; // Keep only the last EXITTIME
          }
          if (entry.EARLIESTENTRYTIME.length > 1) {
            entry.EARLIESTENTRYTIME = [entry.EARLIESTENTRYTIME[0]]; // Keep only the last EXITTIME
          }
        }
      });

      setExcelData(transformedData);
      setLoading(false);

      return getResult.flat();
    }
    fileInputRef.current.value = "";
    setExcelFile(null);
  } catch (err) {
    // console.log(err);
  }
};
