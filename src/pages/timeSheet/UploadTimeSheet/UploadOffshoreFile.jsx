import * as XLSX from "xlsx";

export const UploadOffshoreFile = (
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

    worksheetNameLength.forEach((sheetName) => {
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      allSheets.push({ sheetName, data: sheet });
    });

    const mapKeys = (row, header) => {
      const mappedObj = {};
      const valueOccurrences = {};

      Object.keys(header).forEach((key) => {
        const newKey = header[key];

        if (valueOccurrences[newKey]) {
          valueOccurrences[newKey] += 1;
          mappedObj[`${newKey}_${valueOccurrences[newKey]}`] = row[key] || null;
        } else {
          valueOccurrences[newKey] = 1;
          mappedObj[newKey] = row[key] || null;
        }
      });

      return mappedObj;
    };

    const tbodyHeader = [];

  
    const processedSheets =
      allSheets &&
      allSheets.map((sheet) => {
        const sheetName = sheet.sheetName;

        const location = sheet.data[0];
        const header = sheet.data[2];
        const rows = sheet.data.slice(3, 4).map((row) => mapKeys(row, header));

        const pickTbodyHeader = sheet.data[7];

        const pickTbodySubTotalHeader = sheet.data[2];

        const removeKeys = [
          "138000",
          "CONTRACT No:",
          "DAILY TIME SHEET ",
          "__EMPTY",
          "__EMPTY_4",
        ];
        const trimmedRemoveKeys = removeKeys.map((key) => key.trim());

        const filteredData = Object.fromEntries(
          Object.entries(pickTbodySubTotalHeader).filter(([key, value]) => {
            return !trimmedRemoveKeys.includes(key.trim());
          })
        );

        const combinedTbodyHeader = {
          ...pickTbodyHeader,
          ...filteredData,
        };

        tbodyHeader.push(combinedTbodyHeader);

        const tbodyRows = sheet.data
          .slice(8)
          .map((row) => mapKeys(row, combinedTbodyHeader));

        return {
          sheetName,
          rows,
          tbodyRows,
          location,
        };
      });

    const finalFilterdData = [];

    processedSheets &&
      processedSheets.map((sheet, index) => {
        const date = sheet.rows;
        const location = sheet.location.__EMPTY;
        const tbodyData = sheet.tbodyRows;

        const MergeDateLocation = tbodyData.map((val, index) => {
          return {
            ...val,
            date: date.map((m) => m.DATE),
            location: location,
          };
        });

        let totalIndex = MergeDateLocation.findIndex(
          (item) => item.NAME === "TOTAL"
        );

        if (totalIndex > -1) {
          let slicedData = MergeDateLocation.slice(0, totalIndex);

          let filteredData = slicedData.filter((item) => item.NAME !== null);

          const filterdData = filteredData.flat();

          finalFilterdData.push(...filterdData);
        }
      });
    function excelDateToJSDate(serial) {
      const baseDate = new Date(1899, 11, 30);

      const daysToAdd = serial;
      return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    }

    // function convertDateFormat(dateStr) {
    //   const parts = dateStr.split("/");

    //   if (parts.length !== 3) {
    //     throw new Error("Invalid date format. Expected DD/MM/YYYY");
    //   }

    //   const [day, month, year] = parts;
    //   return `${day}/${month}/${year}`;
    // }

    const convertDateFormat = (inputDateStr) => {
      const [month, day, year] = inputDateStr?.split("/");

      // Convert string to numbers to remove any leading zeros
      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10);
     
      return `${monthNum}/${dayNum}/${year}`;
    };

    const result =
      finalFilterdData &&
      finalFilterdData.map((getDate) => {
        const dates = getDate.date.flat();
        let jsDate = excelDateToJSDate(dates);
        const dateObject = jsDate.toLocaleDateString();

        const formattedDate = convertDateFormat(dateObject);

        return {
          ...getDate,
          date: formattedDate,
        };
      });

    function cleanKey(key) {
      if (typeof key !== "string") {
        return key;
      }
      return key.replace(/[^a-zA-Z0-9]/g, "");
    }

    const formattedData = result.map((item) => {
      const cleanedItem = {};

      for (const key in item) {
        const cleanedKey = cleanKey(key).toUpperCase();
        cleanedItem[cleanedKey] = item[key];
      }

      return cleanedItem;
    });

    setExcelData(formattedData);
    setLoading(false);
    return tbodyHeader;
  }

  fileInputRef.current.value = "";
  setExcelFile(null);
};
