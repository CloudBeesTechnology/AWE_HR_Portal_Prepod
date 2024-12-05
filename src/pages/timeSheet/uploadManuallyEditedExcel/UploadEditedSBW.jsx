import * as XLSX from "xlsx";
export const UploadEditedSBW = (
  excelFile,
  setExcelData,
  setExcelFile,
  fileInputRef,
  setLoading
) => {
  if (excelFile !== null) {
    const workbook = XLSX.read(excelFile, { type: "buffer" });

    const worksheetNameLength = workbook.SheetNames;

    const allSheets = [];

    const tableBodyData = [];
    worksheetNameLength.forEach((sheetName) => {
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      allSheets.push({ sheetName, data: sheet });
    });

    const AddData = [];

    const getResult =
      allSheets &&
      allSheets.map((sheet) => {
        const data = sheet.data;

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

    // const removeTotalEmployees = updatedDataArray.filter(
    //   (val) => !val.NAME?.includes("TOTAL EMPLOYEES")
    // );
    const filteHighlightedData = updatedDataArray.filter(
      (item) => item.IN && item.OUT
    );

    setExcelData(filteHighlightedData);
    // For Re-corrected theader
    const transformData = (data) => {
      return data.map((innerArray) =>
        innerArray.map((item) => {
          // Dynamically create a new object with swapped keys and values
          return Object.entries(item).reduce((acc, [key, value]) => {
            acc[value] = key; // Set the value as key and key as value
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
};
