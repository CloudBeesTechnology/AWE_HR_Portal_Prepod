// import * as XLSX from "xlsx";

// export const UploadOffshoreFile = (
//   excelFile,
//   setExcelData,
//   setExcelFile,
//   fileInputRef
// ) => {
//   if (excelFile !== null) {
//     const workbook = XLSX.read(excelFile, { type: "buffer" });

//     const worksheetNameLength = workbook.SheetNames;
//     console.log("WorkSheet Names :", worksheetNameLength);
//     const allSheets = [];

//     worksheetNameLength.forEach((sheetName) => {
//       const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
//       allSheets.push({ sheetName, data: sheet });
//     });
//     console.log(allSheets);

//     // step-3
//     var AfterFilterdData = [];
//     var dataWithDateAndLocation = [];

//     // procedure
//     const procedure = (data) => {
//       const dataWithDateLocation = data.map((sheet, index) => {
//         let date = null;
//         let location = null;

//         sheet.forEach((item) => {
//           if (item.date) {
//             date = item.date;
//           }
//           if (item.location) {
//             location = item.location;
//           }
//         });

//         const processedData = sheet
//           .filter((item) => !item.date && !item.location) // Exclude date and location objects to avoid duplicates
//           .map((item) => {
//             return {
//               ...item,
//               date: date || "",
//               location: location || "",
//             };
//           });

//         dataWithDateAndLocation.push(processedData);
//       });
//     };
//     // allSheets
//     allSheets.forEach((sheet) => {
//       let data = sheet.data;
//       console.log("Date : ", data[3]["CONTRACT No:"]);
//       console.log("Location : ", data[0].__EMPTY);

//       let totalIndex = data.findIndex(
//         (item) => item["CONTRACT No:"] === "TOTAL"
//       );
//       console.log(totalIndex);
//       if (totalIndex > -1) {
//         let slicedData = data.slice(8, totalIndex);

//         let filteredData = slicedData.filter(
//           (item) => item["CONTRACT No:"] && item["__EMPTY"] !== 0
//         );
//         console.log("Filtered Data : ", filteredData);

//         function excelDateToJSDate(serial) {
//           const baseDate = new Date(1899, 11, 30);

//           const daysToAdd = serial;
//           return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
//         }
//         var timeSheetDate = data[3]["CONTRACT No:"];
//         var location = data[0].__EMPTY;

//         let excelSerialDate = timeSheetDate;
//         let jsDate = excelDateToJSDate(excelSerialDate);

//         const date = jsDate.toLocaleDateString();
//         filteredData.push({ date: date }, { location: location });
//         AfterFilterdData.push(filteredData);
//       }
//     });
//     procedure(AfterFilterdData);
//     const finalData = dataWithDateAndLocation.flat();

//     setExcelData(finalData);
//   }

//   fileInputRef.current.value = "";
//   setExcelFile(null);
// };
