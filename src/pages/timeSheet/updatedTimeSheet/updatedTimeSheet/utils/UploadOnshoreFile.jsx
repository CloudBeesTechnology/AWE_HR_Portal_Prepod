import * as XLSX from "xlsx";
export const UploadOnshoreFile = (
  excelFile,
  setExcelData,
  setExcelFile,
  fileInputRef
) => {
  if (excelFile !== null) {
    const workbook = XLSX.read(excelFile, { type: "buffer" });

    const worksheetNameLength = workbook.SheetNames;

    const allSheets = [];
    const MultipleExcel = [];

    const tableBodyData = [];
    worksheetNameLength.forEach((sheetName) => {
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      allSheets.push({ sheetName, data: sheet });
    });

    console.log(allSheets);
    const AddData = [];

    allSheets.forEach((sheet) => {
      const data = sheet.data;
      console.log(data.length);

      // const findIndex =
      //   Array.isArray(AddData) &&
      //   data.findIndex((item) => {
      //     const sheet1 =
      //       item?.[
      //         "DAILY TIMESHEET OF AWE-SBW DEPT AS OF 21-Aug-2024"
      //       ]?.includes("TOTAL EMPLOYEES");

      //     const sheet2 =
      //       item?.[
      //         "DAILY TIMESHEET OF AWE-ORMC DEPT AS OF 21-Aug-2024"
      //       ]?.includes("TOTAL EMPLOYEES");

      //     const sheet3 =
      //       item?.["DAILY TIMESHEET OF OFF DEPT"]?.includes("Updated By:");

      //     return sheet1 || sheet2 || sheet3;
      //   });

      // if (findIndex > -1) {

      var headerSlicedData = data.slice(1, 2);
      console.log(headerSlicedData);
      var name = "";

      const changedHeader = headerSlicedData.map((columns) => {
        const foundKey = Object.entries(columns).map(([key, value]) => {
          return [{ key, value }];
        });
        return foundKey;
      });

      console.log(changedHeader);
      const result = changedHeader.flat().flat();

      var bodySlicedData = data.slice(2);

      console.log(bodySlicedData);
      // var specificBodySlicedData = data.slice(2, 5);
      // const isValid = specificBodySlicedData.every((m) => {
      //   return Object.entries(m).every(([key, value]) => {
      //     // Return false if any value is empty, undefined, or null
      //     return value !== "" || value !== undefined || value !== null;
      //   });
      // });

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

      console.log(tableBodyData);
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
    const updatedDataArray = tableBodyData.map((item) => {
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
    MultipleExcel.push(updatedDataArray);
    const finalData = MultipleExcel.flat();

    console.log(finalData);
    setExcelData(finalData);
  }

  fileInputRef.current.value = "";
  setExcelFile(null);
};
