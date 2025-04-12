import * as XLSX from "xlsx";
export const UploadEditedHO = (
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

      const getResult =
        allSheets &&
        allSheets.map((sheet) => {
          const data = sheet.data;

          var headerSlicedData = data.slice(1, 2);

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

      function cleanKey(key) {
        if (typeof key !== "string") {
          return key;
        }
        return key.replace(/[^a-zA-Z0-9]/g, "");
      }

      const formattedData = tableBodyData.map((item) => {
        const cleanedItem = {};

        for (const key in item) {
          const cleanedKey = cleanKey(key);
          cleanedItem[cleanedKey] = item[key];
        }

        return cleanedItem;
      });

      function convertDateFormat(dateStr) {
        const parts = dateStr.split("/");

        if (parts.length !== 3) {
          throw new Error("Invalid date format. Expected DD/MM/YYYY");
        }

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
          // if (typeof item.DATE === "number") {
          //   const jsDate = convertDecimalToTime(item.DATE, "date");
          //   const dateObject = new Date(jsDate).toLocaleDateString();

          //   const formattedDate = convertDateFormat(dateObject);
          //   item.DATE = formattedDate;
          // }

          return item;
        });

      console.log("updatedDataArray : ", updatedDataArray);

      const forStringDate = (inputData) => {
        try {
          // Step 1: Assign missing DATEs based on BADGE
          const updatedData = inputData.reduce((acc, curr) => {
            // Clone the object to avoid mutation
            const currentItem = { ...curr };

            if (currentItem.IN && currentItem.OUT) {
              // Find previous match by BADGE
              const previous = [...acc]
                .reverse()
                .find((item) => item.BADGE === currentItem.BADGE && item.DATE);
              if (previous) {
                currentItem.DATE = previous.DATE;
              }
            }

            return [...acc, currentItem];
          }, []);

          // Helper to remove weekday (e.g., 5/6/2025(tue) → 5/6/2025)
          const getCleanedDate = (dateStr) => {
            return dateStr?.replace(/\(\w+\)/, "")?.trim();
          };

          const convertToDMY = (inputDateStr) => {
            const [month, day, year] = inputDateStr.split("/");

            // Convert string to numbers to remove any leading zeros
            const monthNum = parseInt(day, 10);
            const dayNum = parseInt(year, 10);
            console.log("Date : ", `${dayNum}/${monthNum}/${month}`);
            return `${monthNum}/${dayNum}/${month}`;
          };

          // Step 2: Clean and format each DATE in updatedData
          updatedData.forEach((obj) => {
            if (obj.DATE && typeof obj.DATE === "string") {
              const cleanedDate = getCleanedDate(obj.DATE);
              try {
                obj.DATE = convertToDMY(cleanedDate);
              } catch (error) {
                console.error("Date format error in:", cleanedDate);
              }
            }
          });

          return updatedData;
        } catch (err) {
          console.log("Error : ", err);
        }
      };
      const getDateFromPrevRow = forStringDate(updatedDataArray);
      console.log("getDateFromPrevRow : ", getDateFromPrevRow);

      const finalData =
        getDateFromPrevRow && getDateFromPrevRow.length > 0
          ? getDateFromPrevRow
          : updatedDataArray && updatedDataArray.length > 0
          ? updatedDataArray
          : [];

      function filterDataByDateFormat(data) {
        return data.filter((obj) => obj.IN && obj.OUT);
      }
      const filteredData = filterDataByDateFormat(finalData);

      setExcelData(filteredData);

      const transformData = (data) => {
        return data.map((innerArray) =>
          innerArray.map((item) => {
            return Object.entries(item).reduce((acc, [key, value]) => {
              acc[value] = key;
              return acc;
            }, {});
          })
        );
      };
      const transformedData = transformData(getResult);
      setLoading(false);
      const resultOfTheader = transformedData.flat();

      return resultOfTheader;
    }

    fileInputRef.current.value = "";
    setExcelFile(null);
  } catch (err) {
    console.log("ERROR : ", err);
  }
};
