import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const ReportTable = ({
  
  reportTitle,
  
}) => {


  const exportTableToExcel = () => {
    // Extract table header (th) data
    const selectThead = document.querySelectorAll("table thead tr");
    const theadData = Array.from(selectThead).map((row) => {
      const cells = row.querySelectorAll("th");
      return Array.from(cells).map((thData) => thData.innerText);
    });

    // Extract table body (td) data
    const rows = document.querySelectorAll("table tbody tr");
    const tableData = Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      return Array.from(cells).map((cell) => cell.innerText);
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${reportTitle}`);
    console.log(worksheet.name);
    // Add header row
    const headerRow = worksheet.addRow(theadData[0]);

    worksheet.columns = theadData[0].map((header) => ({
      header,
      width: header.length < 20 ? 20 : header.length, // Dynamically adjust width based on header length
    }));
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, size: 12, color: { argb: "f9f9f9" } }; // Red font
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "787878" },
      };
      cell.alignment = { horizontal: "left" };
    });

    tableData.forEach((row) => {
      worksheet.addRow(row);
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        row.eachCell((cell) => {
          cell.font = { size: 12, color: { argb: "FF000000" } }; // Black font
          cell.alignment = { horizontal: "left" }; // Left alignment
        });
      }
    });

    // Export the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      console.log(blob);
      saveAs(blob, `${reportTitle}.xlsx`);
    });
  };

  // Handle download
  const handleDownloadCSV = () => {
    exportTableToExcel();
 };

  return (
    <section className="my-10 space-y-3 ">
      <footer>
        <div className="vertical-center p-5 pt-9 ">
          <button
            className=" bg-[#FEF116] text-dark_grey text_size_5 w-[126px] p-2 rounded"
            onClick={() => {
              // exportToPDF();
              handleDownloadCSV();
            }}
          >
            Download
          </button>
        </div>
      </footer>
    </section>
  );
};