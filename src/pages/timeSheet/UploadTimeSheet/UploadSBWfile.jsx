import * as XLSX from "xlsx";
export const UploadSBWfile = (
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
      worksheetNameLength.forEach((sheetName) => {
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        allSheets.push({ sheetName, data: sheet });
      });

      const getResult =
        allSheets &&
        allSheets.map((sheet) => {
          const data = sheet.data;

          var headerSlicedData = data.slice(0, 1);
          const hasNameAndDate = headerSlicedData.some((obj) =>
            ["NAME", "DATE"].every((key) => key in obj)
          );
          checkTrueOrFalse = hasNameAndDate;

          var bodySlicedData = data.slice(0);

          tableBodyData.push(bodySlicedData);

          return headerSlicedData;
        });
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

        function cleanKey(key) {
          if (typeof key !== "string") {
            return key;
          }
          return key.replace(/[^a-zA-Z0-9]/g, "");
        }

        const data = tableBodyData.flat();
        const formattedData = data.map((item) => {
          const cleanedItem = {};

          for (const key in item) {
            const cleanedKey = cleanKey(key);
            cleanedItem[cleanedKey] = item[key];
          }

          return cleanedItem;
        });

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

        const getCleanedDate = (obj) => {
          const date = obj?.DATE?.trim() || "";

          return date.replace(/\(\w+\)/, "").trim();
        };

        let dateValue = getCleanedDate(updatedDataArray[0]);
        if (!dateValue) {
          dateValue = getCleanedDate(updatedDataArray[1]);
        }

        function convertDateFormat(dateStr) {
          const parts = dateStr.split("/");

          if (parts.length !== 3) {
            throw new Error("Invalid date format. Expected DD/MM/YYYY");
          }

          const [day, month, year] = parts;
          return `${day}/${month}/${year}`;
        }

        const filteHighlightedData = updatedDataArray.filter(
          (item) => item.IN && item.OUT
        );

        const dateObject = new Date(dateValue).toLocaleDateString();
        const formattedDate = convertDateFormat(dateObject);
        filteHighlightedData.forEach((obj) => {
          obj.DATE = formattedDate;
        });

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
  } catch (err) {}
};
