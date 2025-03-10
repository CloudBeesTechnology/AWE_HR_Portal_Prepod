import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const ExportTableToExcel = (reportTitle, tableData) => {
  
  try {
    if (reportTitle && tableData) {
      const selectThead = document.querySelectorAll("table thead tr");
      const theadData = Array.from(selectThead).map((row) => {
        const cells = row.querySelectorAll("td");
        return Array.from(cells).map((thData) => thData.innerText);
      });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(`${reportTitle}`);

     
      const headerRow = worksheet.addRow(theadData[0]);
      headerRow.height = 30;
      worksheet.columns = theadData[0].map((header) => ({
        header,
        width: header.length < 20 ? 20 : header.length, 
      }));
      const commonBorder = {
        style: "thin", 
        color: { argb: "FF000000" }, 
      };
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, size: 12, color: { argb: "f9f9f9" } }; 
        cell.fill = {
          type: "pattern",
          pattern: "solid",

          fgColor: { argb: "78716c" },
        };
        cell.alignment = { horizontal: "left" };
      });

      tableData.forEach((row) => {
        worksheet.addRow(row);
      });

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          row.eachCell((cell) => {
            cell.font = { size: 12, color: { argb: "FF000000" } }; 
            cell.alignment = { horizontal: "left" }; 
          });
        }
        row.border = {
          top: commonBorder,
          left: commonBorder,
          bottom: commonBorder,
          right: commonBorder,
        };
      });

    
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, `${reportTitle}.xlsx`);
      });
    }
  } catch (err) {
    
  }
};
