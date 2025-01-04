import * as XLSX from "xlsx";
export const UploadORMCfile = (
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
      var checkTrueOrFalse = false;
      worksheetNameLength.map((sheetName) => {
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
          //   console.log(headerSlicedData);
          // console.log(headerSlicedData);
          const hasNameAndDate = headerSlicedData.some((obj) =>
            ["NAME", "DATE"].every((key) => key in obj)
          );
          // console.log(hasNameAndDate);
          checkTrueOrFalse = hasNameAndDate;
          // const changedHeader = headerSlicedData.map((columns) => {
          //   const foundKey = Object.entries(columns).map(([key, value]) => {
          //     return [{ key, value }];
          //   });
          //   return foundKey;
          // });

          //   console.log(changedHeader);
          // const result = changedHeader.flat().flat();

          var bodySlicedData = data.slice(0);
          tableBodyData.push(bodySlicedData);
          // bodySlicedData.forEach((bodyData) => {
          //   const row = {};

          //   Object.entries(bodyData).forEach(([key, value]) => {
          //     const headerKey = result.find((header) => header.key === key);

          //     if (headerKey) {
          //       row[headerKey.value] = value;
          //     }
          //   });

          //   tableBodyData.push(row);
          // });
          return headerSlicedData;
        });
      // console.log(checkTrueOrFalse);
      if (checkTrueOrFalse === true) {
        const convertDecimalToTime = (decimal, value) => {
          if (value === "time") {
            const totalHours = decimal * 24;
            const hours = Math.floor(totalHours);
            const totalMinutes = (totalHours - hours) * 60;
            const minutes = Math.floor(totalMinutes);
            const totalSeconds = (totalMinutes - minutes) * 60;
            const seconds = Math.round(totalSeconds);

            const formattedTime = `${hours
              .toString()
              .padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

            return formattedTime;
          } else if (value === "date") {
            const baseDate = new Date(1899, 11, 30);

            const daysToAdd = decimal;
            return new Date(
              baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
            );
          }
        };

        // console.log(tableBodyData);
        function cleanKey(key) {
          if (typeof key !== "string") {
            return key; // Return value if not a string (e.g., number, object)
          }
          return key.replace(/[^a-zA-Z0-9]/g, ""); // Removes all non-alphanumeric characters
        }
        const data = tableBodyData.flat();
        const formattedData = data.map((item) => {
          const cleanedItem = {};

          for (const key in item) {
            const cleanedKey = cleanKey(key); // Clean the key
            cleanedItem[cleanedKey] = item[key]; // Set the value using the cleaned key
          }
          // console.log(cleanedItem);
          return cleanedItem;
        });
        // const formattedData = tableBodyData.map((item) => {
        //   const cleanedItem = {};

        //   for (const key in item) {
        //     const cleanedKey = cleanKey(key); // Clean the key
        //     cleanedItem[cleanedKey] = item[key]; // Set the value using the cleaned key
        //   }

        //   return cleanedItem;
        // });

        const updatedDataArray =
          formattedData &&
          formattedData.map((item) => {
            if (typeof item.IN === "number") {
              item.IN = convertDecimalToTime(item.IN, "time");
            }
            if (typeof item.OUT === "number") {
              item.OUT = convertDecimalToTime(item.OUT, "time");
            }
            if (typeof item.DATE === "number") {
              const jsDate = convertDecimalToTime(item.DATE, "date");
              const dateObject = new Date(jsDate);
              item.DATE = dateObject.toLocaleDateString();
            }

            return item;
          });
        // console.log(updatedDataArray);
        // console.log(updatedDataArray);
        // const removeTotalEmployees = updatedDataArray.filter(
        //   (val) => !val.NAME?.includes("TOTAL EMPLOYEES")
        // );
        // const filteHighlightedData = updatedDataArray.filter((item) => {
        //   if (
        //     item.NAME &&
        //     item.ALLDAYMINHRS &&
        //     item.NETMINUTES >= 0 &&
        //     item.TOTALHOURS >= 0
        //   ) {
        //     return item;
        //   }
        // });

        // const getLastOccurrencePerFIDDate = (dataArray) => {
        //   const map = new Map();

        //   // Iterate over each object and store the last occurrence of each unique FID-date combination
        //   dataArray.forEach((obj) => {
        //     // Check if "ENTRANCEDATEUSED" exists in the object
        //     if (obj.hasOwnProperty("NAME")) {
        //       const key = `${obj.NAME}`; // Create a unique key based on FID and ENTRANCEDATEUSED
        //       map.set(key, obj); // Overwrite previous entries with the same FID and ENTRANCEDATEUSED
        //     }
        //   });

        //   // Convert the map values to an array of the last occurrences for each FID-date pair
        //   return Array.from(map.values());
        // };

        const filteHighlightedData = updatedDataArray.filter(
          (item) => item.IN && item.OUT
        );
        console.log("filteHighlightedData : ",filteHighlightedData)

        const getCleanedDate = (obj) => {
          const date = obj?.DATE?.trim() || '';
          // Remove "(Tue)" or similar day abbreviations
          return date.replace(/\(\w+\)/, '').trim();
      };
      
      // Check the first object's DATE, fallback to the second object if needed
      let dateValue = getCleanedDate(updatedDataArray[0]);
      if (!dateValue) {
          dateValue = getCleanedDate(updatedDataArray[1]);
      }
      
     
    
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
        // const lastOccurrenceObjects =
        //   getLastOccurrencePerFIDDate(updatedDataArray);
        const dateObject = new Date(dateValue).toLocaleDateString();
        const formattedDate = convertDateFormat(dateObject);
        console.log(formattedDate)
          // console.log(lastOccurrenceObjects)
          filteHighlightedData.forEach(obj => {
        
            obj.DATE = formattedDate;
        });

        // console.log(updatedDataArray);
        setExcelData(filteHighlightedData);
        setLoading(false);

        const theaderResult = getResult.flat();

        return theaderResult;
      } else {
        return checkTrueOrFalse;
      }
    }
    fileInputRef.current.value = "";
    setExcelFile(null);
  } catch (err) {
    console.log("ERROR", err);
  }
  //   headerSlicedData
};

