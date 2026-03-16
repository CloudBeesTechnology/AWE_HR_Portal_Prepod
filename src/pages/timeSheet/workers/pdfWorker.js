// // Web Worker for PDF generation
// /* eslint-disable no-restricted-globals */
// /* global importScripts */

// // Use public folder files for jspdf in web worker
// // Files in public folder are served statically
// importScripts("/workers/libs/jspdf.umd.min.js");
// importScripts("/workers/libs/jspdf.plugin.autotable.js");

// // Access jspdf from the global scope
// const { jsPDF } = self.jspdf;

// // Base64 encoded checkmark image to avoid Unicode issues and performance problems
// const CHECKMARK_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgEFg4aBjQ6EwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAO0lEQVQoz2NkYGD4z0ABwMjAQC7+9+/fK0ZGxvtA3H7u3Ll7586d+/fu3bsPDAwM94F4PRDfB2EAvzQS6cMW6ZoAAAAASUVORK5CYII=";

// // Helper functions
// const buildTableHeaders = (dayCounts, startDate) => {
//   const headers = ["Employee Name", "PROJECT"];

//   // Add day headers
//   for (let i = 0; i < dayCounts; i++) {
//     const d = new Date(startDate);
//     d.setDate(startDate.getDate() + i);
//     headers.push(d.getDate());
//   }

//   // Add summary headers
//   headers.push(
//     "NH",
//     "ND",
//     "PH",
//     "PH-D",
//     "AL/CL",
//     "SL",
//     "OFF",
//     "A",
//     "UAL",
//     "OT",
//     "Verified",
//     "Updater"
//   );

//   return headers;
// };

// const escapeHtml = (str = "") =>
//   String(str)
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");

// const buildTableBody = (rows, dayCounts, startDate) => {
//   // We'll build an array of rows, with each employee taking multiple rows
//   const tableRows = [];

//   // Grand totals for footer
//   let grandTotals = {
//     totalHours: 0,
//     normalDays: 0,
//     PH: 0,
//     PHD: 0,
//     ALCL: 0,
//     SL: 0,
//     OFF: 0,
//     ABS: 0,
//     UAL: 0,
//     OT: 0,
//   };

//   rows.forEach((emp, idx) => {
//     // Accumulate grand totals
//     grandTotals.totalHours += Number(emp.__totalHours || 0);
//     grandTotals.normalDays += Number(emp.__NormalDays || 0);
//     grandTotals.PH += Number(emp?.hollydayCounts?.PH || 0);
//     grandTotals.PHD += Number(emp.__calculatedPHD || 0);
//     grandTotals.ALCL += Number(emp.__totalOfALCL || 0);
//     grandTotals.SL += Number(emp?.empLeaveCount?.SL || 0);
//     grandTotals.OFF += Number(emp?.hollydayCounts?.OFF || 0);
//     grandTotals.ABS += Number(emp.__roundedTotalAbsentiesHrs || 0);
//     grandTotals.UAL += Number(emp?.empLeaveCount?.UAL || 0);
//     grandTotals.OT += Number(emp.__totalOT || 0);

//     // Build cells for working hours, OT, and verification
//     let workingCells = [];
//     let otCells = [];
//     let verifiedCells = [];

//     for (let i = 0; i < dayCounts; i++) {
//       const currentDay = new Date(startDate);
//       currentDay.setDate(startDate.getDate() + i);
//       const key = `${currentDay.getDate()}-${
//         currentDay.getMonth() + 1
//       }-${currentDay.getFullYear()}`;

//       const workVal = emp?.workingHrs?.[key] ?? "";
//       const otVal = emp?.OVERTIMEHRS?.[key] ?? "0";
//       const isChecked = Boolean(emp?.getVerify?.[key]);

//       workingCells.push(escapeHtml(String(workVal)));
//       otCells.push(escapeHtml(String(otVal)));
//       // For verified cells, we use a special marker that will be replaced with checkbox image
//       // Instead of whitespace, push a special token when checked.
//       // We'll draw the checkbox image for cells with 'IMG_CHECKMARK'
//       verifiedCells.push(isChecked ? "\u00A0" : "");
//     }

//     // First row: Employee details and working hours (with rowspan for Employee Name, Project, Verified, and Updater)
//     const firstRow = [];

//     // Employee Name cell with rowspan (spans working hours and OT rows)
//     const empNameContent = `${escapeHtml(emp.name || "")}
// Badge# : ${escapeHtml(emp.empBadgeNo || "")} | SapID : ${escapeHtml(
//       emp.sapNo || ""
//     )}
// Hours/Day: ${escapeHtml(
//       String(
//         Array.isArray(emp?.workHrs) && emp?.workHrs.length > 0
//           ? emp.workHrs[emp.workHrs.length - 1]
//           : emp?.workHrs || "0"
//       )
//     )}
// Days/Month: ${escapeHtml(
//       String(
//         Array.isArray(emp?.workMonth) && emp?.workMonth.length > 0
//           ? emp.workMonth[emp.workMonth.length - 1]
//           : emp?.workMonth || "0"
//       )
//     )}
// SalaryType: ${escapeHtml(
//       (Array.isArray(emp?.salaryType) && emp?.salaryType.length > 0
//         ? emp.salaryType[emp.salaryType.length - 1]
//         : emp?.salaryType) || ""
//     )}`;
//     firstRow.push({
//       content: empNameContent,
//       rowSpan: 2, // Span across working hours and OT rows only
//       styles: { valign: "middle" },
//     });

//     // Project cell with rowspan (spans working hours and OT rows)
//     firstRow.push({
//       content: escapeHtml(emp.jobcode || ""),
//       rowSpan: 2, // Span across working hours and OT rows only
//       styles: { valign: "middle" },
//     });

//     // Day cells (working hours)
//     workingCells.forEach((cell) => {
//       firstRow.push(cell);
//     });

//     // Summary cells
//     firstRow.push(Number(emp.__totalHours || 0).toFixed(2));
//     firstRow.push(Number(emp.__NormalDays || 0).toFixed(2));
//     firstRow.push(emp?.hollydayCounts?.PH || 0);
//     firstRow.push(emp.__calculatedPHD || 0);
//     firstRow.push(emp.__totalOfALCL || 0);
//     firstRow.push(emp?.empLeaveCount?.SL || 0);
//     firstRow.push(emp?.hollydayCounts?.OFF || 0);
//     firstRow.push(Number(emp.__roundedTotalAbsentiesHrs || 0).toFixed(2));
//     firstRow.push(emp?.empLeaveCount?.UAL || 0);
//     firstRow.push(Number(emp.__totalOT || 0).toFixed(2));
//     firstRow.push({
//       content: emp.__allFieldsYes ? "Yes" : "",
//       rowSpan: 2, // Span across working hours and OT rows only
//       styles: { valign: "middle" },
//     });
//     firstRow.push({
//       content: escapeHtml(emp.__uniqueTimeKeeperName || ""),
//       rowSpan: 2, // Span across working hours and OT rows only
//       styles: { valign: "middle" },
//     });

//     tableRows.push(firstRow);

//     // Second row: OT values (shares Employee Name, Project, Verified, and Updater columns via rowspan)
//     const secondRow = [];

//     // Day cells (OT values) - no Employee Name, Project, Verified, and Updater cells due to rowspan
//     otCells.forEach((cell) => {
//       secondRow.push(cell);
//     });

//     // Empty cells for summary columns (10 columns, excluding Verified and Updater which are spanned)
//     for (let i = 0; i < 10; i++) {
//       secondRow.push("");
//     }

//     tableRows.push(secondRow);

//     // Third row: Verification ticks (does NOT share Employee Name, Project, Verified, or Updater columns)
//     const thirdRow = [];

//     // Employee Name cell (separate cell, not shared)
//     thirdRow.push("");

//     // Project cell (separate cell, not shared)
//     thirdRow.push("");

//     // Day cells (verification ticks)
//     verifiedCells.forEach((cell) => {
//       thirdRow.push(cell);
//     });

//     // Empty cells for summary columns (10 columns, excluding Verified and Updater which are not shared)
//     for (let i = 0; i < 10; i++) {
//       thirdRow.push("");
//     }

//     // Verified cell (separate cell, not shared)
//     thirdRow.push("");

//     // Updater cell (separate cell, not shared)
//     thirdRow.push("");

//     tableRows.push(thirdRow);

//     // Fourth row: Totals for this employee (highlighted)
//     const totalsRow = [];

//     // Label cell with light grey color
//     totalsRow.push({
//       content: "Total",
//       styles: { fillColor: [216, 211, 211] },
//     });

//     // Empty cell for project with light grey color
//     totalsRow.push({ content: "", styles: { fillColor: [216, 211, 211] } });

//     // Empty cells for day columns with colSpan
//     totalsRow.push({
//       content: "",
//       colSpan: dayCounts,
//       styles: { fillColor: [216, 211, 211] }, // Light grey color
//     });

//     // Summary totals for this employee
//     totalsRow.push({
//       content: Number(emp.__totalHours || 0).toFixed(2),
//       styles: { fillColor: [216, 211, 211] },
//     }); // NH
//     totalsRow.push({
//       content: Number(emp.__NormalDays || 0).toFixed(2),
//       styles: { fillColor: [216, 211, 211] },
//     }); // ND
//     totalsRow.push({
//       content: emp?.hollydayCounts?.PH || 0,
//       styles: { fillColor: [216, 211, 211] },
//     }); // PH
//     totalsRow.push({
//       content: emp.__calculatedPHD || 0,
//       styles: { fillColor: [216, 211, 211] },
//     }); // PH-D
//     totalsRow.push({
//       content: emp.__totalOfALCL || 0,
//       styles: { fillColor: [216, 211, 211] },
//     }); // AL/CL
//     totalsRow.push({
//       content: emp?.empLeaveCount?.SL || 0,
//       styles: { fillColor: [216, 211, 211] },
//     }); // SL
//     totalsRow.push({
//       content: emp?.hollydayCounts?.OFF || 0,
//       styles: { fillColor: [216, 211, 211] },
//     }); // OFF
//     totalsRow.push({
//       content: Number(emp.__roundedTotalAbsentiesHrs || 0).toFixed(2),
//       styles: { fillColor: [216, 211, 211] },
//     }); // A
//     totalsRow.push({
//       content: emp?.empLeaveCount?.UAL || 0,
//       styles: { fillColor: [216, 211, 211] },
//     }); // UAL
//     totalsRow.push({
//       content: Number(emp.__totalOT || 0).toFixed(2),
//       styles: { fillColor: [216, 211, 211] },
//     }); // OT
//     totalsRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Verified
//     totalsRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Updater

//     tableRows.push(totalsRow);
//   });

//   // Add grand total row at the end (highlighted)
//   const grandTotalRow = [];

//   // Label cell with light grey color
//   grandTotalRow.push({
//     content: "Grand Total",
//     styles: { fillColor: [216, 211, 211] },
//   });

//   // Empty cell for project with light grey color
//   grandTotalRow.push({ content: "", styles: { fillColor: [216, 211, 211] } });

//   // Empty cells for day columns with colSpan
//   grandTotalRow.push({
//     content: "",
//     colSpan: dayCounts,
//     styles: { fillColor: [216, 211, 211] }, // Light grey color
//   });

//   // Grand summary totals
//   grandTotalRow.push({
//     content: grandTotals.totalHours.toFixed(2),
//     styles: { fillColor: [216, 211, 211] },
//   }); // NH
//   grandTotalRow.push({
//     content: grandTotals.normalDays.toFixed(2),
//     styles: { fillColor: [216, 211, 211] },
//   }); // ND
//   grandTotalRow.push({
//     content: grandTotals.PH,
//     styles: { fillColor: [216, 211, 211] },
//   }); // PH
//   grandTotalRow.push({
//     content: grandTotals.PHD,
//     styles: { fillColor: [216, 211, 211] },
//   }); // PH-D
//   grandTotalRow.push({
//     content: grandTotals.ALCL.toFixed(2),
//     styles: { fillColor: [216, 211, 211] },
//   }); // AL/CL
//   grandTotalRow.push({
//     content: grandTotals.SL.toFixed(2),
//     styles: { fillColor: [216, 211, 211] },
//   }); // SL
//   grandTotalRow.push({
//     content: grandTotals.OFF,
//     styles: { fillColor: [216, 211, 211] },
//   }); // OFF
//   grandTotalRow.push({
//     content: grandTotals.ABS.toFixed(2),
//     styles: { fillColor: [216, 211, 211] },
//   }); // A
//   grandTotalRow.push({
//     content: grandTotals.UAL,
//     styles: { fillColor: [216, 211, 211] },
//   }); // UAL
//   grandTotalRow.push({
//     content: grandTotals.OT.toFixed(2),
//     styles: { fillColor: [216, 211, 211] },
//   }); // OT
//   grandTotalRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Verified
//   grandTotalRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Updater

//   tableRows.push(grandTotalRow);

//   return tableRows;
// };

// const getColumnStyles = (dayCounts) => {
//   const columnStyles = {};

//   columnStyles[0] = { cellWidth: 23 }; // Employee Name (increased for rowspan content)
//   columnStyles[1] = { cellWidth: 13 }; // Project (increased for rowspan content)

//   // Day columns
//   for (let i = 2; i < 2 + dayCounts; i++) {
//     columnStyles[i] = { cellWidth: 7 };
//   }

//   // Summary columns
//   // NH, ND, PH, PH-D, AL/CL, SL, OFF, A, UAL, OT, Verified, Updater
//   const summaryStartIndex = 2 + dayCounts;
//   for (let i = 0; i < 10; i++) {
//     // First 10 summary columns
//     columnStyles[summaryStartIndex + i] = { cellWidth: 8 };
//   }

//   // Verified column
//   columnStyles[summaryStartIndex + 10] = { cellWidth: "auto" }; // Verified column

//   // Updater column
//   columnStyles[summaryStartIndex + 11] = {
//     cellWidth: 17,
//     overflow: "linebreak",
//   }; // Updater column (increased for rowspan content)

//   return columnStyles;
// };

// const addPDFHeader = (doc, location, formattedStartDate, formattedEndDate, tableLogoBase64) => {
//   if (tableLogoBase64) {
//     const imgProps = doc.getImageProperties(tableLogoBase64);
//     const imgWidth = 40;
//     const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
//     doc.addImage(tableLogoBase64, "PNG", 5, 10, imgWidth, imgHeight);
//   }

//   const titleX = 5;
//   const titleY = tableLogoBase64 ? 10 + 20 + 5 : 15;
//   doc.setFontSize(10);
//   doc.text(
//     `TIMESHEET SUMMARY - ${location.toUpperCase()} DIVISION`,
//     titleX,
//     titleY
//   );
//   doc.text(
//     `FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}`,
//     titleX,
//     titleY + 5
//   );
//   return titleY + 10;
// };

// // Main function to generate PDF
// const generatePDF = async (data) => {
//   try {
//     const {
//       rows,
//       dayCounts,
//       startDate,
//       formattedStartDate,
//       formattedEndDate,
//       location,
//       tableLogoBase64,
//       // Removed checkboxBase64 parameter to improve performance
//     } = data;

//     // Report progress
//     self.postMessage({
//       type: "progress",
//       progress: 30,
//       message: "Generating PDF...",
//     });

//     const doc = new jsPDF({
//       orientation: "landscape",
//       unit: "mm",
//       format: "a3",
//     });

//     const headers = buildTableHeaders(dayCounts, new Date(startDate));
//     const body = buildTableBody(rows, dayCounts, new Date(startDate));
//     const columnStyles = getColumnStyles(dayCounts);

//     // Add header
//     const headerHeight = addPDFHeader(
//       doc,
//       location,
//       formattedStartDate,
//       formattedEndDate,
//       tableLogoBase64
//     );

//     // Generate the PDF
//     doc.autoTable({
//       tableWidth: "wrap",
//       head: [headers],
//       body: body,
//       foot: [],
//       showFoot: "never",
//       useCss: true,
//       startY: headerHeight + 5,
//       margin: { top: 5, right: 5, bottom: 10, left: 5 },
//       styles: {
//         fontSize: 8,
//         cellPadding: 1,
//         overflow: "linebreak",
//         cellWidth: "wrap",
//         lineColor: [0, 0, 0],
//         lineWidth: 0.1,
//       },
//       columnStyles,
//       headStyles: {
//         fillColor: [120, 120, 120],
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//         halign: "center",
//       },
//       alternateRowStyles: { fillColor: [255, 255, 255] },
//       pageBreak: "auto",
//       horizontalPageBreak: false,
//       // didDrawCell is called for every cell after it's drawn — we'll draw the checkbox on top if token is present
//       didDrawCell: (hookData) => {
//         try {
//           const cell = hookData.cell;
//           // We only want to draw the image for day-level verified cells (which contain the token)
//           // cell.raw holds original content (if set) — some versions use cell.text; check both
//           const raw = cell.raw;
//           const text = String(cell.text || "");

//           console.log("1 IMG_CHECKMARK...");
//           // Check if this cell should have a checkbox
//           if (text === "\u00A0" || raw === "\u00A0") {
//             console.log("2 IMG_CHECKMARK...");
//             // compute image size (small)
//             const imgProps = doc.getImageProperties(CHECKMARK_BASE64);
//             const imgWidth = 4.5; // mm - adjust if you want bigger/smaller ticks
//             const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

//             // center the image inside the cell
//             const x = cell.x + (cell.width - imgWidth) / 2;
//             const y = cell.y + (cell.height - imgHeight) / 2;

//             // Draw image (PNG)
//             doc.addImage(CHECKMARK_BASE64, "PNG", x, y, imgWidth, imgHeight);
//           }
//         } catch (e) {
//           // swallow drawing errors so PDF generation continues
//           // optionally report error:
//           // console.warn('didDrawCell checkbox draw error', e);
//         }
//       },
//       didDrawPage: (data) => {
//         // Add footer on every page
//         doc.setFontSize(8);
//         doc.setTextColor(100);
//         doc.text(
//           `Page ${data.pageNumber}`,
//           doc.internal.pageSize.width - 15,
//           doc.internal.pageSize.height - 10,
//           { align: "right" }
//         );
//         doc.text(
//           `Generated on ${new Date().toLocaleDateString()}`,
//           15,
//           doc.internal.pageSize.height - 10,
//           { align: "left" }
//         );
//       },
//     });

//     // Report progress
//     self.postMessage({
//       type: "progress",
//       progress: 90,
//       message: "Preparing download...",
//     });

//     // Convert PDF to array buffer
//     const arrayBuffer = doc.output("arraybuffer");

//     // Send the array buffer back to main thread
//     self.postMessage({
//       type: "complete",
//       arrayBuffer: arrayBuffer,
//       filename: `TIMESHEET SUMMARY - ${location} DIVISION FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}.pdf`,
//     });
//   } catch (error) {
//     self.postMessage({ type: "error", error: error.message });
//   }
// };

// // Listen for messages from main thread
// self.addEventListener("message", async (event) => {
//   const { type, data } = event.data;

//   switch (type) {
//     case "GENERATE_PDF":
//       await generatePDF(data);
//       break;
//     default:
//       self.postMessage({ type: "error", error: "Unknown message type" });
//   }
// });
// /* eslint-enable no-restricted-globals */

// Web Worker for PDF generation
/* eslint-disable no-restricted-globals */
/* global importScripts */

// Use public folder files for jspdf in web worker
// Files in public folder are served statically
importScripts("/workers/libs/jspdf.umd.min.js");
importScripts("/workers/libs/jspdf.plugin.autotable.js");

// Access jspdf from the global scope
const { jsPDF } = self.jspdf;

// Base64 encoded checkmark image (small PNG)
const CHECKMARK_BASE64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgEFg4aBjQ6EwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAO0lEQVQoz2NkYGD4z0ABwMjAQC7+9+/fK0ZGxvtA3H7u3Ll7586d+/fu3bsPDAwM94F4PRDfB2EAvzQS6cMW6ZoAAAAASUVORK5CYII=";

// Token used in table cells to indicate a checked state (invisible marker)
const CHECK_TOKEN = "\u00A0";

// Font Awesome font for checkmarks
let FONT_AWESOME_BASE64 = null;

// Function to load font and convert to base64
function loadFontAsBase64(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = reject;
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}

// Load the font when the worker starts
(async function loadFontAwesome() {
  try {
    FONT_AWESOME_BASE64 = await loadFontAsBase64(
      "/fonts/fontawesome-webfont.ttf"
    );
  } catch (error) {
    // console.error('Failed to load Font Awesome:', error);
  }
})();

// Helper functions
const buildTableHeaders = (dayCounts, startDate) => {
  const headers = ["Employee Name", "PROJECT"];

  // Add day headers
  for (let i = 0; i < dayCounts; i++) {
    const d = new Date(startDate);
    // Advance d by i days relative to startDate
    d.setDate(new Date(startDate).getDate() + i);
    headers.push(d.getDate());
  }

  // Add summary headers
  headers.push(
    "NH",
    "ND",
    "PH",
    "PH-D",
    "AL/CL",
    "SL",
    "OFF",
    "A",
    "UAL",
    "OT",
    "Verified",
    "Updater"
  );

  return headers;
};

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildTableBody = (rows, dayCounts, startDate) => {
  // We'll build an array of rows, with each employee taking multiple rows
  const tableRows = [];

  // Grand totals for footer
  let grandTotals = {
    totalHours: 0,
    normalDays: 0,
    PH: 0,
    PHD: 0,
    ALCL: 0,
    SL: 0,
    OFF: 0,
    ABS: 0,
    UAL: 0,
    OT: 0,
  };

  rows.forEach((emp) => {
    // Accumulate grand totals
    grandTotals.totalHours += Number(emp.__totalHours || 0);
    grandTotals.normalDays += Number(emp.__NormalDays || 0);
    grandTotals.PH += Number(emp?.hollydayCounts?.PH || 0);
    grandTotals.PHD += Number(emp.__calculatedPHD || 0);
    grandTotals.ALCL += Number(emp.__totalOfALCL || 0);
    grandTotals.SL += Number(emp?.empLeaveCount?.SL || 0);
    grandTotals.OFF += Number(emp?.hollydayCounts?.OFF || 0);
    grandTotals.ABS += Number(emp.__roundedTotalAbsentiesHrs || 0);
    grandTotals.UAL += Number(emp?.empLeaveCount?.UAL || 0);
    grandTotals.OT += Number(emp.__totalOT || 0);

    // Build cells for working hours, OT, and verification
    const workingCells = [];
    const otCells = [];
    const verifiedCells = [];

    for (let i = 0; i < dayCounts; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(new Date(startDate).getDate() + i);
      const key = `${currentDay.getDate()}-${
        currentDay.getMonth() + 1
      }-${currentDay.getFullYear()}`;

      const workVal = emp?.workingHrs?.[key] ?? "";
      const otVal = emp?.OVERTIMEHRS?.[key] ?? "0";
      const isChecked = Boolean(emp?.getVerify?.[key]);

      workingCells.push(escapeHtml(String(workVal)));
      otCells.push(escapeHtml(String(otVal)));
      // Use CHECK_TOKEN for cells that should render the checkmark image
      verifiedCells.push(isChecked ? CHECK_TOKEN : "");
    }

    // First row: Employee details and working hours (with rowspan for Employee Name, Project, Verified, and Updater)
    const firstRow = [];

    // Employee Name cell with rowspan (spans working hours and OT rows only)
    const empNameContent = `${escapeHtml(emp.name || "")}
Badge# : ${escapeHtml(emp.empBadgeNo || "")} | SapID : ${escapeHtml(
      emp.sapNo || ""
    )}
Hours/Day: ${escapeHtml(
      String(
        Array.isArray(emp?.workHrs) && emp?.workHrs.length > 0
          ? emp.workHrs[emp.workHrs.length - 1]
          : emp?.workHrs || "0"
      )
    )}
Days/Month: ${escapeHtml(
      String(
        Array.isArray(emp?.workMonth) && emp?.workMonth.length > 0
          ? emp.workMonth[emp.workMonth.length - 1]
          : emp?.workMonth || "0"
      )
    )}
SalaryType: ${escapeHtml(
      (Array.isArray(emp?.salaryType) && emp?.salaryType.length > 0
        ? emp.salaryType[emp.salaryType.length - 1]
        : emp?.salaryType) || ""
    )}`;
    firstRow.push({
      content: empNameContent,
      rowSpan: 2, // Span across working hours and OT rows only
      styles: { valign: "middle" },
    });

    // Project cell with rowspan (spans working hours and OT rows only)
    firstRow.push({
      content: escapeHtml(emp.jobcode || ""),
      rowSpan: 2, // Span across working hours and OT rows only
      styles: { valign: "middle" },
    });

    // Day cells (working hours)
    workingCells.forEach((cell) => {
      firstRow.push(cell);
    });

    // Summary cells
    firstRow.push(Number(emp.__totalHours || 0).toFixed(2));
    firstRow.push(Number(emp.__NormalDays || 0).toFixed(2));
    firstRow.push(emp?.hollydayCounts?.PH || 0);
    firstRow.push(emp.__calculatedPHD || 0);
    firstRow.push(emp.__totalOfALCL || 0);
    firstRow.push(emp?.empLeaveCount?.SL || 0);
    firstRow.push(emp?.hollydayCounts?.OFF || 0);
    firstRow.push(Number(emp.__roundedTotalAbsentiesHrs || 0).toFixed(2));
    firstRow.push(emp?.empLeaveCount?.UAL || 0);
    firstRow.push(Number(emp.__totalOT || 0).toFixed(2));
    firstRow.push({
      content: emp.__allFieldsYes ? "Yes" : "",
      rowSpan: 2, // Span across working hours and OT rows only
      styles: { valign: "middle" },
    });
    firstRow.push({
      content: escapeHtml(emp.__uniqueTimeKeeperName || ""),
      rowSpan: 2, // Span across working hours and OT rows only
      styles: { valign: "middle" },
    });

    tableRows.push(firstRow);

    // Second row: OT values (shares Employee Name, Project, Verified, and Updater columns via rowspan)
    const secondRow = [];

    // Day cells (OT values) - no Employee Name, Project, Verified, and Updater cells due to rowspan
    otCells.forEach((cell) => {
      secondRow.push(cell);
    });

    // Empty cells for summary columns (10 columns, excluding Verified and Updater which are spanned)
    for (let i = 0; i < 10; i++) {
      secondRow.push("");
    }

    tableRows.push(secondRow);

    // Third row: Verification ticks (does NOT share Employee Name, Project, Verified, or Updater columns)
    const thirdRow = [];

    // Employee Name cell (separate cell, not shared)
    thirdRow.push("");

    // Project cell (separate cell, not shared)
    thirdRow.push("");

    // Day cells (verification ticks)
    verifiedCells.forEach((cell) => {
      thirdRow.push(cell);
    });

    // Empty cells for summary columns (10 columns, excluding Verified and Updater which are not shared)
    for (let i = 0; i < 10; i++) {
      thirdRow.push("");
    }

    // Verified cell (separate cell, not shared)
    thirdRow.push("");

    // Updater cell (separate cell, not shared)
    thirdRow.push("");

    tableRows.push(thirdRow);

    // Fourth row: Totals for this employee (highlighted)
    const totalsRow = [];

    // Label cell with light grey color
    totalsRow.push({
      content: "Total",
      styles: { fillColor: [216, 211, 211] },
    });

    // Empty cell for project with light grey color
    totalsRow.push({ content: "", styles: { fillColor: [216, 211, 211] } });

    // Empty cells for day columns with colSpan
    totalsRow.push({
      content: "",
      colSpan: dayCounts,
      styles: { fillColor: [216, 211, 211] }, // Light grey color
    });

    // Summary totals for this employee
    totalsRow.push({
      content: Number(emp.__totalHours || 0).toFixed(2),
      styles: { fillColor: [216, 211, 211] },
    }); // NH
    totalsRow.push({
      content: Number(emp.__NormalDays || 0).toFixed(2),
      styles: { fillColor: [216, 211, 211] },
    }); // ND
    totalsRow.push({
      content: emp?.hollydayCounts?.PH || 0,
      styles: { fillColor: [216, 211, 211] },
    }); // PH
    totalsRow.push({
      content: emp.__calculatedPHD || 0,
      styles: { fillColor: [216, 211, 211] },
    }); // PH-D
    totalsRow.push({
      content: emp.__totalOfALCL || 0,
      styles: { fillColor: [216, 211, 211] },
    }); // AL/CL
    totalsRow.push({
      content: emp?.empLeaveCount?.SL || 0,
      styles: { fillColor: [216, 211, 211] },
    }); // SL
    totalsRow.push({
      content: emp?.hollydayCounts?.OFF || 0,
      styles: { fillColor: [216, 211, 211] },
    }); // OFF
    totalsRow.push({
      content: Number(emp.__roundedTotalAbsentiesHrs || 0).toFixed(2),
      styles: { fillColor: [216, 211, 211] },
    }); // A
    totalsRow.push({
      content: emp?.empLeaveCount?.UAL || 0,
      styles: { fillColor: [216, 211, 211] },
    }); // UAL
    totalsRow.push({
      content: Number(emp.__totalOT || 0).toFixed(2),
      styles: { fillColor: [216, 211, 211] },
    }); // OT
    totalsRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Verified
    totalsRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Updater

    tableRows.push(totalsRow);
  });

  // Add grand total row at the end (highlighted)
  const grandTotalRow = [];

  // Label cell with light grey color
  grandTotalRow.push({
    content: "Grand Total",
    styles: { fillColor: [216, 211, 211] },
  });

  // Empty cell for project with light grey color
  grandTotalRow.push({ content: "", styles: { fillColor: [216, 211, 211] } });

  // Empty cells for day columns with colSpan
  grandTotalRow.push({
    content: "",
    colSpan: dayCounts,
    styles: { fillColor: [216, 211, 211] }, // Light grey color
  });

  // Grand summary totals
  grandTotalRow.push({
    content: grandTotals.totalHours.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // NH
  grandTotalRow.push({
    content: grandTotals.normalDays.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // ND
  grandTotalRow.push({
    content: grandTotals.PH,
    styles: { fillColor: [216, 211, 211] },
  }); // PH
  grandTotalRow.push({
    content: grandTotals.PHD,
    styles: { fillColor: [216, 211, 211] },
  }); // PH-D
  grandTotalRow.push({
    content: grandTotals.ALCL.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // AL/CL
  grandTotalRow.push({
    content: grandTotals.SL.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // SL
  grandTotalRow.push({
    content: grandTotals.OFF,
    styles: { fillColor: [216, 211, 211] },
  }); // OFF
  grandTotalRow.push({
    content: grandTotals.ABS.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // A
  grandTotalRow.push({
    content: grandTotals.UAL,
    styles: { fillColor: [216, 211, 211] },
  }); // UAL
  grandTotalRow.push({
    content: grandTotals.OT.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // OT
  grandTotalRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Verified
  grandTotalRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Updater

  tableRows.push(grandTotalRow);

  return tableRows;
};

const getColumnStyles = (dayCounts) => {
  const columnStyles = {};

  columnStyles[0] = { cellWidth: 23 }; // Employee Name (increased for rowspan content)
  columnStyles[1] = { cellWidth: 13 }; // Project (increased for rowspan content)

  // Day columns
  for (let i = 2; i < 2 + dayCounts; i++) {
    columnStyles[i] = { cellWidth: 7 };
  }

  // Summary columns
  // NH, ND, PH, PH-D, AL/CL, SL, OFF, A, UAL, OT, Verified, Updater
  const summaryStartIndex = 2 + dayCounts;
  for (let i = 0; i < 10; i++) {
    // First 10 summary columns
    columnStyles[summaryStartIndex + i] = { cellWidth: 8 };
  }

  // Verified column
  columnStyles[summaryStartIndex + 10] = { cellWidth: "auto" }; // Verified column

  // Updater column
  columnStyles[summaryStartIndex + 11] = {
    cellWidth: 17,
    overflow: "linebreak",
  }; // Updater column (increased for rowspan content)

  return columnStyles;
};

const addPDFHeader = (
  doc,
  location,
  formattedStartDate,
  formattedEndDate,
  tableLogoBase64
) => {
  if (tableLogoBase64) {
    const imgProps = doc.getImageProperties(tableLogoBase64);
    const imgWidth = 40;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    doc.addImage(tableLogoBase64, "PNG", 5, 10, imgWidth, imgHeight);
  }

  const titleX = 5;
  const titleY = tableLogoBase64 ? 10 + 15 : 15;
  doc.setFontSize(10);
  doc.text(
    `TIMESHEET SUMMARY - ${location.toUpperCase()} DIVISION`,
    titleX,
    titleY
  );
  doc.text(
    `FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}`,
    titleX,
    titleY + 5
  );
  return titleY + 7;
};

// Main function to generate PDF
const generatePDF = async (data) => {
  try {
    // Wait for the font to be loaded
    let attempts = 0;
    while (!FONT_AWESOME_BASE64 && attempts < 50) {
      // Wait up to 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }

    if (!FONT_AWESOME_BASE64) {
      // console.warn('Font Awesome not loaded, continuing without it');
    }
    const {
      rows,
      dayCounts,
      startDate,
      formattedStartDate,
      formattedEndDate,
      location,
      tableLogoBase64,
      // no checkboxBase64 expected — using CHECKMARK_BASE64 constant
    } = data;

    // Report progress
    self.postMessage({
      type: "progress",
      progress: 30,
      message: "Generating PDF...",
    });

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a3",
    });

    // Add Font Awesome font if loaded
    if (FONT_AWESOME_BASE64) {
      try {
        // Extract the base64 data from the data URL
        const base64Data = FONT_AWESOME_BASE64.split(",")[1];
        doc.addFileToVFS("fontawesome-webfont.ttf", base64Data);
        doc.addFont("fontawesome-webfont.ttf", "FontAwesome", "normal");
      } catch (fontError) {
        // console.error('Failed to add Font Awesome to PDF:', fontError);
      }
    }

    const headers = buildTableHeaders(dayCounts, new Date(startDate));
    const body = buildTableBody(rows, dayCounts, new Date(startDate));
    const columnStyles = getColumnStyles(dayCounts);

    // Add header
    const headerHeight = addPDFHeader(
      doc,
      location,
      formattedStartDate,
      formattedEndDate,
      tableLogoBase64
    );

    // Generate the PDF
    doc.autoTable({
      tableWidth: "wrap",
      head: [headers],
      body: body,
      foot: [],
      showFoot: "never",
      useCss: true,
      startY: headerHeight + 5,
      margin: { top: 5, right: 5, bottom: 10, left: 5 },
      styles: {
        fontSize: 8,
        cellPadding: 1,
        overflow: "linebreak",
        cellWidth: "wrap",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      columnStyles,
      headStyles: {
        fillColor: [120, 120, 120],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      pageBreak: "auto",
      horizontalPageBreak: false,
      // didDrawCell is called for every cell after it's drawn — we'll draw the checkbox on top if token is present
      didDrawCell: (hookData) => {
        try {
          const cell = hookData.cell;
          const raw = cell.raw;
          const text = String(cell.text || "");

          // Draw checkmark using Font Awesome font when the CHECK_TOKEN is present in the cell
          if (
            (raw === CHECK_TOKEN || text === CHECK_TOKEN) &&
            FONT_AWESOME_BASE64
          ) {
            // Save current font and style
            const originalFont = doc.getFont();
            const originalSize = doc.getFontSize();

            // Set Font Awesome font
            doc.setFont("FontAwesome");
            doc.setFontSize(8);

            // Unicode for Font Awesome checkmark is \uf00c
            const checkmark = "\uf00c";

            // Center the text in the cell
            const x = cell.x + cell.width / 2;
            const y = cell.y + cell.height / 2; // +2 for better vertical alignment

            // Draw the checkmark
            doc.text(checkmark, x, y, { align: "center", baseline: "middle" });

            // Restore original font and style
            //   doc.setFont(originalFont);
            //   doc.setFontSize(originalSize);
          }
        } catch (e) {
          // swallow drawing errors so PDF generation continues
          // console.log("ERROR : ", e);
        }
      },

      didDrawPage: (data) => {
        // Add footer on every page
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
    });

    // Report progress
    self.postMessage({
      type: "progress",
      progress: 90,
      message: "Preparing download...",
    });

    // Convert PDF to array buffer
    const arrayBuffer = doc.output("arraybuffer");

    // Send the array buffer back to main thread
    self.postMessage({
      type: "complete",
      arrayBuffer: arrayBuffer,
      filename: `TIMESHEET SUMMARY - ${location} DIVISION FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}.pdf`,
    });
  } catch (error) {
    self.postMessage({ type: "error", error: error.message });
  }
};

// Listen for messages from main thread
self.addEventListener("message", async (event) => {
  const { type, data } = event.data;

  switch (type) {
    case "GENERATE_PDF":
      await generatePDF(data);
      break;
    default:
      self.postMessage({ type: "error", error: "Unknown message type" });
  }
});
/* eslint-enable no-restricted-globals */
