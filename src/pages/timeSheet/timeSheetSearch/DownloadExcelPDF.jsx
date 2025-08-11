import { jsPDF } from "jspdf";
import "jspdf-autotable";
import tableLogo from "../../../assets/logo/aweLogo.png"; // your PNG image import
import checkboxicon from "../../../assets/timeSheet/viewSummaryIcons/checkmark.png";

const PDFGenerator = () => null;

export const generateTimesheetPDF = (tableId, location, startDate, endDate) => {
  try {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a3",
    });

    console.log("tableId : ", tableId);
    // Add PNG image at top-left
    const imgProps = doc.getImageProperties(tableLogo);
    const imgWidth = 40; // mm, adjust as needed
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    doc.addImage(tableLogo, "PNG", 5, 10, imgWidth, imgHeight);

    // Title below image, left-aligned
    const titleX = 5;
    const titleY = 10 + imgHeight + 5;
    doc.setFontSize(10);
    doc.text(
      `TIMESHEET SUMMARY - ${location.toUpperCase()} DIVISION`,
      titleX,
      titleY
    );
    doc.setFontSize(10);
    doc.text(
      `FOR THE PERIOD ${startDate} TO ${endDate}`,
      titleX,
      titleY + 5
    );

    // Clone the table from DOM
    const table = document.getElementById(tableId).cloneNode(true);
    if (!table) throw new Error("Table not found!");

    // Replace checked checkboxes with marker text "CHECKED_IMG"
    table.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      const replacement = document.createTextNode(
        input.checked ? "CHECKED_IMG" : ""
      );
      input.parentNode.replaceChild(replacement, input);
    });

    // Parse table headers
    const headers = [];
    const theadRows = table.querySelectorAll("thead tr");
    theadRows.forEach((tr) => {
      const row = [];
      tr.querySelectorAll("th").forEach((th) => {
        const colSpan = parseInt(th.getAttribute("colspan") || 1);
        const rowSpan = parseInt(th.getAttribute("rowspan") || 1);
        row.push({
          content: th.innerText.trim(),
          colSpan,
          rowSpan,
          styles: {
            fillColor: [148, 147, 147],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center",
            valign: "middle",
          },
        });
      });
      headers.push(row);
    });

    // Parse table body with image cell flag
    const body = [];
    const tbodyRows = table.querySelectorAll("tbody tr");
    tbodyRows.forEach((tr) => {
      const row = [];
      tr.querySelectorAll("td").forEach((td) => {
        const colSpan = parseInt(td.getAttribute("colspan") || 1);
        const rowSpan = parseInt(td.getAttribute("rowspan") || 1);
        const rawContent = td.innerText.trim();

        if (rawContent === "CHECKED_IMG") {
          // Empty content + flag to draw image later
          row.push({
            content: "",
            colSpan,
            rowSpan,
            isImageCell: true,
            styles: {
              cellPadding: 1,
              fontSize: 6.5,
              halign: td.style.textAlign || "left",
              valign: "middle",
            },
          });
        } else {
          row.push({
            content: rawContent,
            colSpan,
            rowSpan,
            styles: {
              cellPadding: 1,
              fontSize: 6.5,
              halign: td.style.textAlign || "left",
              valign: "middle",
            },
          });
        }
      });
      body.push(row);
    });

    // Column styles
    const totalColumns = headers[headers.length - 1]?.length || 0;
    const columnStyles = {};
    columnStyles[0] = { cellWidth: 30 }; // Employee Name
    columnStyles[1] = { cellWidth: 15 }; // Project
    const dayStartIndex = 2;
    let dayEndIndex = totalColumns - 10;
    for (let i = dayStartIndex; i <= dayEndIndex; i++) {
      columnStyles[i] = { cellWidth: 8 };
    }

    // Generate PDF table
    doc.autoTable({
      head: headers,
      body: body,
      useCss: true,
      startY: titleY + 10,
      margin: { top: 5, right: 5, bottom: 10, left: 5 },
      styles: {
        fontSize: 6.5,
        cellPadding: 1,
        overflow: "linebreak",
        cellWidth: "wrap",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      columnStyles,
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      pageBreak: "auto",
      horizontalPageBreak: true,

      // Footer for each page
      didDrawPage: (data) => {
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text(
          `Page ${data.pageNumber}`,
          doc.internal.pageSize.width - 15,
          doc.internal.pageSize.height - 10,
          { align: "right" }
        );
        doc.text(
          `Generated on ${new Date().toLocaleDateString()}`,
          15,
          doc.internal.pageSize.height - 10,
          { align: "left" }
        );
      },

      // Draw image in cells flagged with isImageCell
      // didDrawCell: (data) => {
      //   if (data.cell.raw.isImageCell) {
      //     data.cell.text = []; // remove any text

      //     const cellWidth = data.cell.width;
      //     const cellHeight = data.cell.height;
      //     const padding = 1;

      //     const imgProps = doc.getImageProperties(checkboxicon);
      //     const ratio = imgProps.width / imgProps.height;

      //     let imgWidth = cellWidth - 2 * padding;
      //     let imgHeight = imgWidth / ratio;

      //     if (imgHeight > cellHeight - 2 * padding) {
      //       imgHeight = cellHeight - 2 * padding;
      //       imgWidth = imgHeight * ratio;
      //     }

      //     const x = data.cell.x + (cellWidth - imgWidth) / 2;
      //     const y = data.cell.y + (cellHeight - imgHeight) / 2;

      //     doc.addImage(checkboxicon, "PNG", x, y, imgWidth, imgHeight);
      //   }
      // },

      didDrawCell: (data) => {
        if (data.cell.raw.isImageCell) {
          data.cell.text = []; // clear text

          const cellWidth = data.cell.width;
          const cellHeight = data.cell.height;
          const padding = 1;

          const imgProps = doc.getImageProperties(checkboxicon);
          const ratio = imgProps.width / imgProps.height;

          // Calculate max size available inside cell minus padding
          let imgWidth = cellWidth - 2 * padding;
          let imgHeight = imgWidth / ratio;

          if (imgHeight > cellHeight - 2 * padding) {
            imgHeight = cellHeight - 2 * padding;
            imgWidth = imgHeight * ratio;
          }

          // Apply scaling factor to reduce image size (0.5 = 50%)
          const scale = 0.7;
          imgWidth = imgWidth * scale;
          imgHeight = imgHeight * scale;

          const x = data.cell.x + (cellWidth - imgWidth) / 2;
          const y = data.cell.y + (cellHeight - imgHeight) / 2;

          doc.addImage(checkboxicon, "PNG", x, y, imgWidth, imgHeight);
        }
      },
    });

    // Save the PDF
    doc.save(
      `TIMESHEET SUMMARY - ${location} DIVISION FOR THE PERIOD ${startDate} TO ${endDate}.pdf`
    );
    console.log("[✅] PDF generated successfully.");
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    alert("Failed to generate PDF. Check console.");
  }
};

// External helper
export const DownloadExcelPDF = (tableId, location, startDate, endDate) => {
  generateTimesheetPDF(tableId, location, startDate, endDate);
};

export default PDFGenerator;
