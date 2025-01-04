import * as XLSX from "xlsx";
export const UploadHOfile = (
  excelFile,
  setExcelData,
  setExcelFile,
  fileInputRef,
  setLoading
) => {
  try {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });

      const worksheetNameLength = workbook.SheetNames;

      const allSheets = [];

      const tableBodyData = [];
      worksheetNameLength.forEach((sheetName) => {
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        allSheets.push({ sheetName, data: sheet });
      });

      // console.log(allSheets);
      const AddData = [];

      const getResult =
        allSheets &&
        allSheets.map((sheet) => {
          const data = sheet.data;
          // console.log(data);

          var headerSlicedData = data.slice(1, 2);

          var name = "";

          const changedHeader = headerSlicedData.map((columns) => {
            const foundKey = Object.entries(columns).map(([key, value]) => {
              return [{ key, value }];
            });
            return foundKey;
          });

          const result = changedHeader.flat().flat();

          var bodySlicedData = data.slice(2);

          bodySlicedData.forEach((bodyData) => {
            const row = {};

            Object.entries(bodyData).forEach(([key, value]) => {
              const headerKey = result.find((header) => header.key === key);

              if (headerKey) {
                row[headerKey.value] = value;
              }
            });

            tableBodyData.push(row);
          });
          return headerSlicedData;
        });

      const convertDecimalToTime = (decimal, value) => {
        if (value === "time") {
          const totalHours = decimal * 24;
          const hours = Math.floor(totalHours);
          const totalMinutes = (totalHours - hours) * 60;
          const minutes = Math.floor(totalMinutes);
          const totalSeconds = (totalMinutes - minutes) * 60;
          const seconds = Math.round(totalSeconds);

          const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

          return formattedTime;
        } else if (value === "date") {
          const baseDate = new Date(1899, 11, 30);

          const daysToAdd = decimal;
          return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
        }
      };

      // console.log(tableBodyData);
      function cleanKey(key) {
        if (typeof key !== "string") {
          return key; // Return value if not a string (e.g., number, object)
        }
        return key.replace(/[^a-zA-Z0-9]/g, ""); // Removes all non-alphanumeric characters
      }

      const formattedData = tableBodyData.map((item) => {
        const cleanedItem = {};

        for (const key in item) {
          const cleanedKey = cleanKey(key); // Clean the key
          cleanedItem[cleanedKey] = item[key]; // Set the value using the cleaned key
        }

        return cleanedItem;
      });

      // // const filteHighlightedData = finalData.filter(
      // //   (item) => item.NAME && item.IN && item.OUT
      // // );
      // // console.log(filteHighlightedData);

      // const filterHighlightedData =
      //   finalData &&
      //   finalData.map((m) => {
      //     if ("NAME" in m && "IN" in m && "OUT" in m) {
      //       return { ...m, data: true };
      //     } else {
      //       return { ...m, data: false };
      //     }
      //   });

      function convertDateFormat(dateStr) {
        // Split the input string by '/'
        const parts = dateStr.split("/");

        // Validate the input format
        if (parts.length !== 3) {
          throw new Error("Invalid date format. Expected DD/MM/YYYY");
        }

        // Rearrange the parts to MM/DD/YYYY
        const [day, month, year] = parts;
        return `${day}/${month}/${year}`;
      }

      

      const updatedDataArray =
        formattedData &&
        formattedData.map((item) => {
          if (typeof item.ONAM === "number") {
            item.ONAM = convertDecimalToTime(item.ONAM, "time");
          }
          if (typeof item.OFFAM === "number") {
            item.OFFAM = convertDecimalToTime(item.OFFAM, "time");
          }
          if (typeof item.ONPM === "number") {
            item.ONPM = convertDecimalToTime(item.ONPM, "time");
          }
          if (typeof item.OFFPM === "number") {
            item.OFFPM = convertDecimalToTime(item.OFFPM, "time");
          }
          if (typeof item.IN === "number") {
            item.IN = convertDecimalToTime(item.IN, "time");
          }
          if (typeof item.OUT === "number") {
            item.OUT = convertDecimalToTime(item.OUT, "time");
          }
          if (typeof item.DATE === "number") {
            const jsDate = convertDecimalToTime(item.DATE, "date");
            const dateObject = new Date(jsDate).toLocaleDateString();

            const formattedDate = convertDateFormat(dateObject);
            item.DATE = formattedDate;
            
          }

          return item;
        });

      try {
      } catch {}
      function filterDataByDateFormat(data) {
        return data.filter((obj) => obj.IN && obj.OUT);
      }

      const filteredData = filterDataByDateFormat(updatedDataArray);

      setExcelData(filteredData);
      setLoading(false);
      return getResult.flat();
    }

    fileInputRef.current.value = "";
    setExcelFile(null);
  } catch (err) {
    console.log(err);
  }
};
