import { jsPDF } from "jspdf";
import "jspdf-autotable";
import tableLogo from "../../../assets/logo/aweLogo.png";
import checkboxicon from "../../../assets/timeSheet/viewSummaryIcons/checkmark.png";

const PDFGenerator = () => null;

// Main function that accepts data directly instead of DOM element
export const DownloadExcelPDFData = async (
  allExcelSheetData,
  dayCounts,
  startDate,
  formattedStartDate,
  formattedEndDate,
  location,
  calculateTotalWorkingHours,
  calculateTotalAbsence,
  getStartDate
) => {
  try {
    console.log(
      `[🔄] Processing dataset with ${
        allExcelSheetData?.length || 0
      } employees...`
    );

    // Prepare data for PDF generation (same logic as preparePrintRows)
    const rowsForPDF = preparePrintRows(
      allExcelSheetData,
      startDate,
      dayCounts,
      calculateTotalWorkingHours,
      calculateTotalAbsence,
      getStartDate
    );

    console.log("rowsForPDF : ", rowsForPDF);
    // Generate PDF with the prepared data
    await generateTimesheetPDFData(
      rowsForPDF,
      dayCounts,
      startDate,
      formattedStartDate,
      formattedEndDate,
      location
    );
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    throw error;
  }
};

// Function to prepare data for PDF generation (same as preparePrintRows)
// const preparePrintRows = (rows = [], startDate, dayCounts) => {
//   // These functions need to be imported or defined properly
//   // For now, I'll create simplified versions
//   console.log("rows : ", rows);
//   const calculateTotalWorkingHours = (employee, startDate, dayCounts) => {
//     let total = 0;
//     for (let i = 0; i < dayCounts; i++) {
//       const currentDay = new Date(startDate);
//       currentDay.setDate(startDate.getDate() + i);
//       const key = `${currentDay.getDate()}-${
//         currentDay.getMonth() + 1
//       }-${currentDay.getFullYear()}`;
//       const value = employee?.workingHrs?.[key];
//       if (value && value !== "") {
//         total += parseFloat(value) || 0;
//       }
//     }
//     return parseFloat(total.toFixed(2));
//   };

//   const calculateNormalDays = (employee, totalHours) => {
//     // Get the working hours per day
//     const workHrs =
//       Array.isArray(employee?.workHrs) && employee?.workHrs.length > 0
//         ? employee.workHrs[employee.workHrs.length - 1]
//         : employee?.workHrs || "0";
//     const NWHPD = parseFloat(workHrs) || 0;
//     return NWHPD ? Number(totalHours) / NWHPD : 0;
//   };

//   const calculateTotalAbsence = (employee, startDate, dayCounts) => {
//     let total = 0;
//     for (let i = 0; i < dayCounts; i++) {
//       const currentDay = new Date(startDate);
//       currentDay.setDate(startDate.getDate() + i);
//       const key = `${currentDay.getDate()}-${
//         currentDay.getMonth() + 1
//       }-${currentDay.getFullYear()}`;
//       const value = employee?.absentHrs?.[key];
//       if (value && value !== "") {
//         total += parseFloat(value) || 0;
//       }
//     }
//     return parseFloat(total.toFixed(2));
//   };

//   return (rows || []).map((employee, idx) => {
//     // 1) Total OT (same logic as in your render)
//     const addAllOT = Object.values(employee?.OVERTIMEHRS || {}).reduce(
//       (acc, ot) => acc + parseFloat(ot || 0),
//       0
//     );
//     const totalOT = parseFloat(addAllOT.toFixed(2));

//     // 2) Total Working Hours
//     const totalHours = calculateTotalWorkingHours(
//       employee,
//       startDate,
//       dayCounts
//     );

//     // 3) Normal Days
//     const NormalDays = calculateNormalDays(employee, totalHours);

//     // 4) PHD Calculation
//     const calculatedPHD = parseFloat(
//       (parseFloat(employee?.hollydayCounts?.PH || 0) * 8).toFixed(2)
//     );

//     // 5) Absent Hours Calculation
//     const roundedTotalAbsentiesHrs = calculateTotalAbsence(
//       employee,
//       startDate,
//       dayCounts
//     );

//     // 6) All Fields Verified Check
//     let allFieldsYes = true;
//     for (let i = 0; i < dayCounts; i++) {
//       const currentDay = new Date(startDate);
//       currentDay.setDate(startDate.getDate() + i);
//       const key = `${currentDay.getDate()}-${
//         currentDay.getMonth() + 1
//       }-${currentDay.getFullYear()}`;
//       if (!employee?.getVerify?.[key]) {
//         allFieldsYes = false;
//         break;
//       }
//     }

//     // 7) AL/CL Total
//     const totalOfALCL = parseFloat(
//       (
//         parseFloat(employee?.empLeaveCount?.AL || 0) +
//         parseFloat(employee?.empLeaveCount?.CL || 0)
//       ).toFixed(2)
//     );

//     // 8) Time Keeper Name
//     const timeKeeperName =
//       employee?.timeKeeper && Array.isArray(employee.timeKeeper)
//         ? [...new Set(employee.timeKeeper)].filter(Boolean)
//         : employee?.timeKeeper
//         ? [employee.timeKeeper]
//         : [];

//     const uniqueTimeKeeperName = timeKeeperName.join(", ");

//     // return augmented employee
//     return {
//       ...employee,
//       __totalOT: totalOT,
//       __totalHours: totalHours,
//       __NormalDays: NormalDays,
//       __calculatedPHD: calculatedPHD,
//       __roundedTotalAbsentiesHrs: roundedTotalAbsentiesHrs,
//       __allFieldsYes: allFieldsYes,
//       __totalOfALCL: totalOfALCL,
//       __uniqueTimeKeeperName: uniqueTimeKeeperName,
//       __uiIndex: idx,
//     };
//   });
// };

const preparePrintRows = (
  rows = [],
  startDate,
  dayCounts,
  calculateTotalWorkingHours,
  calculateTotalAbsence,
  getStartDate
) => {
  return (rows || []).map((employee, idx) => {
    // 1) Total OT (same logic as in your render)
    const addAllOT = Object.values(employee?.OVERTIMEHRS || {}).reduce(
      (acc, ot) => acc + parseFloat(ot || 0),
      0
    );
    const totalOT = addAllOT.toFixed(2);

    // 2) Total working hours (use your helper)
    const getTotalHours = calculateTotalWorkingHours(employee) || 0;
    const totalHours = Number(getTotalHours) || 0;

    // 3) Normal days (same as render, guard divide by zero)
    const getLastIndexOfNWhrs =
      Array.isArray(employee?.workHrs) && employee?.workHrs.length > 0
        ? employee?.workHrs[employee?.workHrs.length - 1]
        : employee?.workHrs || "0";

    const NWHPD = parseFloat(getLastIndexOfNWhrs) || 0;
    const NormalDays = NWHPD ? Number(totalHours) / NWHPD : 0;

    // 4) PH-D logic (same as in render)
    const getLastWorkHr = parseFloat(employee?.workHrs?.at(-1) || "0");
    const getLastWorkMonth = parseFloat(employee?.workMonth?.at(-1) || "0");
    const calculatedPHD =
      getLastWorkHr === 8 && getLastWorkMonth === 24
        ? parseFloat(employee.hollydayCounts?.PHD || 0) / 2
        : employee.hollydayCounts?.PHD || 0;

    // 5) Total Absence (use your helper)
    const totalAbsence = calculateTotalAbsence(employee, getLastIndexOfNWhrs);
    const roundedTotalAbsentiesHrs = Number(
      parseFloat(totalAbsence || 0).toFixed(2)
    );

    // 6) Verified check (build same checkVerifiedAll map)
    const checkVerifiedAll = Array.from({ length: dayCounts }, (_, i) => {
      const currentDay = new Date(getStartDate);
      currentDay.setDate(getStartDate.getDate() + i);
      const formattedDate = `${currentDay.getDate()}-${
        currentDay.getMonth() + 1
      }-${currentDay.getFullYear()}`;
      const isVerified = employee?.getVerify?.[formattedDate] || "";
      return { date: formattedDate, value: isVerified };
    }).reduce((acc, { date, value }) => {
      acc[date] = value;
      return acc;
    }, {});

    const allFieldsYes = Object.values(checkVerifiedAll).every(
      (v) => v === "Yes"
    );

    // 7) AL + CL
    const totalOfALCL =
      parseFloat(employee?.empLeaveCount?.AL || 0) +
        parseFloat(employee?.empLeaveCount?.CL || 0) || 0;

    // 8) Timekeeper unique name
    const timeKeeperName = [...new Set(employee?.timeKeeper || [])].filter(
      (n) => n !== null
    );
    const uniqueTimeKeeperName = timeKeeperName.join(", ");

    // return augmented employee
    return {
      ...employee,
      __totalOT: totalOT,
      __totalHours: totalHours,
      __NormalDays: NormalDays,
      __calculatedPHD: calculatedPHD,
      __roundedTotalAbsentiesHrs: roundedTotalAbsentiesHrs,
      __allFieldsYes: allFieldsYes,
      __totalOfALCL: totalOfALCL,
      __uniqueTimeKeeperName: uniqueTimeKeeperName,
      __uiIndex: idx,
    };
  });
};

// Function to generate PDF from data
const generateTimesheetPDFData = async (
  rows,
  dayCounts,
  startDate,
  formattedStartDate,
  formattedEndDate,
  location
) => {
  try {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a3",
    });

    // Detect large dataset and use chunked processing
    const isLargeDataset = rows.length > 20; // Lower threshold to trigger chunked processing earlier
    const chunkSize = 30; // Larger chunk size for better performance

    if (isLargeDataset) {
      await generateLargeTimesheetPDFData(
        doc,
        rows,
        dayCounts,
        startDate,
        formattedStartDate,
        formattedEndDate,
        location,
        chunkSize
      );
    } else {
      await generateStandardTimesheetPDFData(
        doc,
        rows,
        dayCounts,
        startDate,
        formattedStartDate,
        formattedEndDate,
        location
      );
    }
  } catch (error) {
    console.error("❌ Error generating PDF from data:", error);
    throw error;
  }
};

// Function for processing large datasets with chunked processing
const generateLargeTimesheetPDFData = async (
  doc,
  rows,
  dayCounts,
  startDate,
  formattedStartDate,
  formattedEndDate,
  location,
  chunkSize
) => {
  try {
    console.log(`[🔄] Processing large dataset with ${rows.length} rows...`);

    const headers = buildTableHeaders(dayCounts, startDate);
    const body = buildTableBody(rows, dayCounts, startDate);
    const grandTotals = calculateGrandTotalsFromRows(rows);
    const columnStyles = getColumnStyles(dayCounts);

    // Add header on first page and get the height
    const headerHeight = addPDFHeader(
      doc,
      location,
      formattedStartDate,
      formattedEndDate
    );

    doc.autoTable({
      tableWidth: "wrap",
      head: [headers],
      body: body,
      foot: [], // Footer is now included in the body
      showFoot: "never", // We handle footer in the body
      useCss: true,
      startY: headerHeight + 5, // Start below the header
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
      horizontalPageBreak: false, // Disable horizontal page break to keep all columns together
      didDrawPage: (data) => {
        // Add simplified header on subsequent pages (no logo or title)
        if (data.pageNumber > 1) {
          addSimpleHeader(doc, location, formattedStartDate, formattedEndDate);
        }
        // Add footer on every page
        addPageFooter(doc, data);
      },
      didDrawCell: (data) => handleImageCells(doc, data),
      // Add custom styling for specific row types
      didParseCell: (data) => {
        // Handle total rows - only "Total" and "Grand Total" rows
        // Note: We're now applying styles directly to the cells, so this is no longer needed
      },
    });

    doc.save(
      `TIMESHEET SUMMARY - ${location} DIVISION FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}.pdf`
    );
    console.log("[✅] Large PDF generated successfully.");
  } catch (error) {
    console.error("❌ Error generating large PDF:", error);
    throw error;
  }
};

// Function for processing standard datasets
const generateStandardTimesheetPDFData = async (
  doc,
  rows,
  dayCounts,
  startDate,
  formattedStartDate,
  formattedEndDate,
  location
) => {
  try {
    const headers = buildTableHeaders(dayCounts, startDate);
    const body = buildTableBody(rows, dayCounts, startDate);
    const grandTotals = calculateGrandTotalsFromRows(rows);
    const columnStyles = getColumnStyles(dayCounts);
    const footRow = createFooterRow(dayCounts, grandTotals);

    const currentY = addPDFHeader(
      doc,
      location,
      formattedStartDate,
      formattedEndDate
    );

    doc.autoTable({
      tableWidth: "wrap",
      head: [headers],
      body: body,
      foot: [], // Footer is now included in the body
      showFoot: "never", // We handle footer in the body
      useCss: true,
      startY: currentY,
      margin: { top: 5, right: 5, bottom: 10, left: 5 },
      styles: {
        fontSize: 7,
        cellPadding: 0.8,
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
      horizontalPageBreak: false, // Disable horizontal page break to keep all columns together
      didDrawPage: (data) => addPageFooter(doc, data),
      didDrawCell: (data) => handleImageCells(doc, data),
      // Add custom styling for specific row types
      didParseCell: (data) => {
        // Handle total rows - only "Total" and "Grand Total" rows
        // Note: We're now applying styles directly to the cells, so this is no longer needed
      },
    });

    doc.save(
      `TIMESHEET SUMMARY - ${location} DIVISION FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}.pdf`
    );
    console.log("[✅] PDF generated successfully.");
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    throw error;
  }
};

// Helper function to build table headers
const buildTableHeaders = (dayCounts, startDate) => {
  const headers = ["Employee Name", "PROJECT"];

  // Add day headers
  for (let i = 0; i < dayCounts; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
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

// Helper function to build table body
const buildTableBody = (rows, dayCounts, startDate) => {
  const escapeHtml = (str = "") =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

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

  rows.forEach((emp, idx) => {
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
    let workingCells = [];
    let otCells = [];
    let verifiedCells = [];

    for (let i = 0; i < dayCounts; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);
      const key = `${currentDay.getDate()}-${
        currentDay.getMonth() + 1
      }-${currentDay.getFullYear()}`;

      const workVal = emp?.workingHrs?.[key] ?? "";
      const otVal = emp?.OVERTIMEHRS?.[key] ?? "0";
      const isChecked = Boolean(emp?.getVerify?.[key]);

      workingCells.push(escapeHtml(String(workVal)));
      otCells.push(escapeHtml(String(otVal)));
      // For verified cells, we use a special marker that will be replaced with checkbox image
      // We use a non-breaking space character which is invisible but will trigger our image replacement
      verifiedCells.push(isChecked ? "\u00A0" : "");
    }

    // First row: Employee details and working hours (with rowspan for Employee Name, Project, Verified, and Updater)
    const firstRow = [];

    // Employee Name cell with rowspan (spans working hours and OT rows)
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

    // Project cell with rowspan (spans working hours and OT rows)
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

    // Day cells (verification ticks) - no quotes now
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
    // Instead of pushing individual empty cells, we push one cell with colSpan
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
    totalsRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Updater (empty since it's spanned in previous rows)

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
  // Instead of pushing individual empty cells, we push one cell with colSpan
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

// Helper function to calculate grand totals from rows
const calculateGrandTotalsFromRows = (rows) => {
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
  });

  return grandTotals;
};

// Helper function to get column styles
const getColumnStyles = (dayCounts) => {
  const totalColumns = 2 + dayCounts + 12; // Emp Name, Project, Days, Summary columns
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

// Helper function to create footer row
const createFooterRow = (dayCounts, grandTotals) => {
  const footRow = [];

  // Grand Total label with light grey color
  footRow.push({
    content: "Grand Total",
    styles: { fillColor: [216, 211, 211] },
  });

  // Empty cell for project with light grey color
  footRow.push({ content: "", styles: { fillColor: [216, 211, 211] } });

  // Empty day columns with colSpan
  footRow.push({
    content: "",
    colSpan: dayCounts,
    styles: { fillColor: [216, 211, 211] }, // Light grey color
  });

  // Grand summary totals
  footRow.push({
    content: grandTotals.totalHours.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // NH
  footRow.push({
    content: grandTotals.normalDays.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // ND
  footRow.push({
    content: grandTotals.PH,
    styles: { fillColor: [216, 211, 211] },
  }); // PH
  footRow.push({
    content: grandTotals.PHD,
    styles: { fillColor: [216, 211, 211] },
  }); // PH-D
  footRow.push({
    content: grandTotals.ALCL.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // AL/CL
  footRow.push({
    content: grandTotals.SL.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // SL
  footRow.push({
    content: grandTotals.OFF,
    styles: { fillColor: [216, 211, 211] },
  }); // OFF
  footRow.push({
    content: grandTotals.ABS.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // A
  footRow.push({
    content: grandTotals.UAL,
    styles: { fillColor: [216, 211, 211] },
  }); // UAL
  footRow.push({
    content: grandTotals.OT.toFixed(2),
    styles: { fillColor: [216, 211, 211] },
  }); // OT
  footRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Verified
  footRow.push({ content: "", styles: { fillColor: [216, 211, 211] } }); // Updater

  return footRow;
};

// Helper function to add PDF header
const addPDFHeader = (doc, location, formattedStartDate, formattedEndDate) => {
  const imgProps = doc.getImageProperties(tableLogo);
  const imgWidth = 40;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  doc.addImage(tableLogo, "PNG", 5, 10, imgWidth, imgHeight);

  const titleX = 5;
  const titleY = 10 + imgHeight + 5;
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
  return titleY + 10;
};

// Helper function to add simplified header for subsequent pages
const addSimpleHeader = (
  doc,
  location,
  formattedStartDate,
  formattedEndDate
) => {
  // For subsequent pages, we just return a minimal height
  // You can add page numbers or other minimal info here if needed
  return 10; // Minimal height for subsequent pages
};

// Helper function to add page footer
const addPageFooter = (doc, data, totalChunks = null, currentChunk = null) => {
  doc.setFontSize(8);
  doc.setTextColor(100);
  let pageText = `Page ${data.pageNumber}`;
  if (totalChunks && currentChunk)
    pageText += ` (Chunk ${currentChunk}/${totalChunks})`;

  doc.text(
    pageText,
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
};

// Helper function to handle image cells
const handleImageCells = (doc, data) => {
  // Handle tick marks for verified cells - draw checkbox image
  // Now we check for non-breaking space character which is invisible
  if (data.cell.raw === "\u00A0") {
    // Clear the text content
    data.cell.text = [];

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

    // Apply scaling factor to reduce image size (0.7 = 70%)
    const scale = 0.7;
    imgWidth = imgWidth * scale;
    imgHeight = imgHeight * scale;

    const x = data.cell.x + (cellWidth - imgWidth) / 2;
    const y = data.cell.y + (cellHeight - imgHeight) / 2;

    doc.addImage(checkboxicon, "PNG", x, y, imgWidth, imgHeight);
  }
};

export default PDFGenerator;
