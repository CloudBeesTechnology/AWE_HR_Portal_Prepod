
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import tableLogo from "../../../assets/logo/aweLogo.png";
// import checkboxicon from "../../../assets/timeSheet/viewSummaryIcons/checkmark.png";

// export function DownloadVSpdf({
//   rows = [],
//   dayCounts = 0,
//   startDate,
//   formattedStartDate = "",
//   formattedEndDate = "",
//   location = "",
// }) {
//   const escapeHtml = (str = "") =>
//     String(str)
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#039;");

//   const cellStyle = `border:1px solid #000;padding:8px;text-align:center;vertical-align:middle;font-size:14px;`;
//   const headerStyle = `${cellStyle}background:#787878;color:#fff;font-weight:bold;`;
//   const empNameStyle = `${cellStyle}min-width:180px;max-width:180px;text-align:left;word-wrap:break-word;white-space:normal;`;
//   const totalsStyle = `${cellStyle}background:#d8d3d3;`;

//   const buildDayHeaderTHs = () => {
//     let ths = "";
//     for (let i = 0; i < dayCounts; i++) {
//       const d = new Date(startDate);
//       d.setDate(startDate.getDate() + i);
//       ths += `<th style="${headerStyle}">${d.getDate()}</th>`;
//     }
//     return ths;
//   };

//   const buildRowsHtml = () => {
//     return rows
//       .map((emp) => {
//         let workingCells = "";
//         let otCells = "";
//         let verifiedCells = "";

//         for (let i = 0; i < dayCounts; i++) {
//           const currentDay = new Date(startDate);
//           currentDay.setDate(startDate.getDate() + i);
//           const key = `${currentDay.getDate()}-${
//             currentDay.getMonth() + 1
//           }-${currentDay.getFullYear()}`;

//           const workVal = emp?.workingHrs?.[key] ?? "";
//           const otVal = emp?.OVERTIMEHRS?.[key] ?? "0";
//           const isChecked = Boolean(emp?.getVerify?.[key]);

//           workingCells += `<td style="${cellStyle}  min-width: 30px; max-width: 30px; word-wrap: break-word; white-space: normal;">${escapeHtml(
//             String(workVal)
//           )}</td>`;
//           otCells += `<td style="${cellStyle}
//           min-width: 50px;   
//           max-width: 50px;    
//           word-wrap: break-word;
//           white-space: normal;
//           ">${escapeHtml(String(otVal))}</td>`;
//           verifiedCells += `<td style="${cellStyle} 
//           min-width: 30px;   
//           max-width: 30px;    
//           word-wrap: break-word;
//           white-space: normal; ">
//           ${
//             isChecked
//               ? `<img src="${checkboxicon}" alt="" style="height: 12px; width:12px"
//              />`
//               : ""
//           }   
//           </td>`;
//         }

//         const totalsRow = `
//           <tr>
//             <td style="${totalsStyle}text-align:left;">Total</td>
//             ${Array.from({ length: dayCounts + 1 })
//               .map(() => `<td style="${totalsStyle}"></td>`)
//               .join("")}
//             <td style="${totalsStyle}">${Number(emp.__totalHours || 0).toFixed(
//           2
//         )}</td>
//             <td style="${totalsStyle}">${Number(emp.__NormalDays || 0).toFixed(
//           2
//         )}</td>
//             <td style="${totalsStyle}">${emp?.hollydayCounts?.PH || 0}</td>
//             <td style="${totalsStyle}">${emp.__calculatedPHD || 0}</td>
//             <td style="${totalsStyle}">${emp.__totalOfALCL || 0}</td>
//             <td style="${totalsStyle}">${emp?.empLeaveCount?.SL || 0}</td>
//             <td style="${totalsStyle}">${emp?.hollydayCounts?.OFF || 0}</td>
//             <td style="${totalsStyle}">${Number(
//           emp.__roundedTotalAbsentiesHrs || 0
//         ).toFixed(2)}</td>
//             <td style="${totalsStyle}">${emp?.empLeaveCount?.UAL || 0}</td>
//             <td style="${totalsStyle}">${Number(emp.__totalOT || 0).toFixed(
//           2
//         )}</td>
//             <td style="${totalsStyle}"></td>
//             <td style="${totalsStyle}"></td>
//           </tr>
//         `;

//         return `
//           <tbody>
//             <tr>
//               <td rowspan="2" style="${empNameStyle}
//               min-width: 180px;
//               max-width: 180px;
//               word-wrap: break-word;
//               white-space: normal;
//               text-align: left;">
//                 ${escapeHtml(emp.name || "")}<br/>
//                 Badge# : ${escapeHtml(
//                   emp.empBadgeNo || ""
//                 )} | SapID : ${escapeHtml(emp.sapNo || "")}<br/>
//                 Hours/Day: ${escapeHtml(
//                   String(
//                     emp?.workHrs?.[emp?.workHrs?.length - 1] ||
//                       emp?.workHrs ||
//                       "0"
//                   )
//                 )}  
//                 Days/Month: ${escapeHtml(
//                   String(
//                     emp?.workMonth?.[emp?.workMonth?.length - 1] ||
//                       emp?.workMonth ||
//                       "0"
//                   )
//                 )}<br/>
//                 SalaryType: ${escapeHtml(
//                   (Array.isArray(emp?.salaryType) && emp?.salaryType.length > 0
//                     ? emp.salaryType[emp.salaryType.length - 1]
//                     : emp?.salaryType) || ""
//                 )}
//               </td>
//               <td rowspan="2" style="${cellStyle}">${escapeHtml(
//           emp.jobcode || ""
//         )}</td>
//               ${workingCells}
//               <td rowspan="2" style="${cellStyle}">${Number(
//           emp.__totalHours || 0
//         ).toFixed(2)}</td>
//               <td rowspan="2" style="${cellStyle}">${Number(
//           emp.__NormalDays || 0
//         ).toFixed(2)}</td>
//               <td rowspan="2" style="${cellStyle}">${
//           emp?.hollydayCounts?.PH || 0
//         }</td>
//               <td rowspan="2" style="${cellStyle}">${
//           emp.__calculatedPHD || 0
//         }</td>
//               <td rowspan="2" style="${cellStyle}">${
//           emp.__totalOfALCL || 0
//         }</td>
//               <td rowspan="2" style="${cellStyle}">${
//           emp?.empLeaveCount?.SL || 0
//         }</td>
//               <td rowspan="2" style="${cellStyle}">${
//           emp?.hollydayCounts?.OFF || 0
//         }</td>
//               <td rowspan="2" style="${cellStyle}">${Number(
//           emp.__roundedTotalAbsentiesHrs || 0
//         ).toFixed(2)}</td>
//               <td rowspan="2" style="${cellStyle}">${
//           emp?.empLeaveCount?.UAL || 0
//         }</td>
//               <td rowspan="2" style="${cellStyle}">${Number(
//           emp.__totalOT || 0
//         ).toFixed(2)}</td>
//               <td rowspan="2" style="${cellStyle}">${
//           emp.__allFieldsYes ? "Yes" : ""
//         }</td>
//               <td rowspan="2" style="${cellStyle}">${escapeHtml(
//           emp.__uniqueTimeKeeperName || ""
//         )}</td>
//             </tr>
//             <tr>${otCells}</tr>
//             <tr>
//               <td style="${cellStyle}"></td>
//               <td style="${cellStyle}"></td>
//               ${verifiedCells}
//               ${Array.from({ length: 12 })
//                 .map(() => `<td style="${cellStyle}"></td>`)
//                 .join("")}
//             </tr>
//             ${totalsRow}
//           </tbody>
//         `;
//       })
//       .join("");
//   };

//   const head = `
//     <thead>
//       <tr>
//         <th rowspan="2" style="${headerStyle}">Employee Name</th>
//         <th rowspan="2" style="${headerStyle}">PROJECT</th>
//         ${buildDayHeaderTHs()}
//         <th rowspan="2" style="${headerStyle}">NH</th>
//         <th rowspan="2" style="${headerStyle}">ND</th>
//         <th rowspan="2" style="${headerStyle}">PH</th>
//         <th rowspan="2" style="${headerStyle}">PH-D</th>
//         <th rowspan="2" style="${headerStyle}">AL/CL</th>
//         <th rowspan="2" style="${headerStyle}">SL</th>
//         <th rowspan="2" style="${headerStyle}">OFF</th>
//         <th rowspan="2" style="${headerStyle}">A</th>
//         <th rowspan="2" style="${headerStyle}">UAL</th>
//         <th rowspan="2" style="${headerStyle}">OT</th>
//         <th rowspan="2" style="${headerStyle}">Verified</th>
//         <th rowspan="2" style="${headerStyle}">Updater</th>
//       </tr>
//     </thead>
//   `;

//   const htmlContent = `
//     <div style="display:flex;flex-direction:column;align-items:flex-start;margin-bottom:15px;">
//       <img src="${tableLogo}" style="height:60px;margin-bottom:5px;" alt="Logo"/>
//       <h2 style="margin:4px;font-size:18px;font-weight:bold;">TIMESHEET SUMMARY - ${escapeHtml(
//         location
//       )} DIVISION</h2>
//       <h2 style="margin:4px;font-size:18px;font-weight:bold;">FOR THE PERIOD ${escapeHtml(
//         formattedStartDate
//       )} TO ${escapeHtml(formattedEndDate)}</h2>
//         <table style="width:100%;border-collapse:collapse; margin-top:15px;">
//       ${head}
//       ${buildRowsHtml()}
//     </table>
//     </div>
  
//   `;

//   const iframe = document.createElement("iframe");
//   iframe.style.position = "absolute";
//   iframe.style.left = "-9999px";
//   document.body.appendChild(iframe);

//   const doc = iframe.contentWindow.document;
//   doc.open();
//   doc.write(`<!DOCTYPE html><html><body>${htmlContent}</body></html>`);
//   doc.close();

//   iframe.onload = () => {
//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "pt",
//       format: "a2",
//     });
//     pdf.html(iframe.contentDocument.body, {
//       callback: (pdfOut) => {
//         pdfOut.save(
//           `TIMESHEET SUMMARY - ${location} DIVISION FOR THE PERIOD ${escapeHtml(
//             formattedStartDate
//           )} TO ${escapeHtml(formattedEndDate)}.pdf`
//         );
//         document.body.removeChild(iframe);
//       },
//       margin: [20, 20, 20, 20],
//       autoPaging: "text",
//       html2canvas: { scale: 0.53 },
//     });
//   };
// }

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// // You need base64 images for jsPDF
// import tableLogo from "../../../assets/logo/aweLogo.png"; // replace with base64
// import checkboxicon from "../../../assets/timeSheet/viewSummaryIcons/checkmark.png"; // replace with base64

// export async function DownloadVSpdf({
//   rows = [],
//   dayCounts = 0,
//   startDate,
//   formattedStartDate = "",
//   formattedEndDate = "",
//   location = "",
// }) {
//   // Helper to format date key like your original code
//   const getKeyFromDate = (date) =>
//     `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

//   // Prepare headers array for autotable
//   const dayHeaders = [];
//   for (let i = 0; i < dayCounts; i++) {
//     const d = new Date(startDate);
//     d.setDate(startDate.getDate() + i);
//     dayHeaders.push(`${d.getDate()}`);
//   }

//   // Headers with fixed order and labels
//   const headers = [
//     { header: "Employee Name", dataKey: "empName" },
//     { header: "PROJECT", dataKey: "project" },
//     ...dayHeaders.map((day, i) => ({
//       header: day,
//       dataKey: `work_${i}`,
//     })),
//     { header: "NH", dataKey: "NH" },
//     { header: "ND", dataKey: "ND" },
//     { header: "PH", dataKey: "PH" },
//     { header: "PH-D", dataKey: "PH-D" },
//     { header: "AL/CL", dataKey: "ALCL" },
//     { header: "SL", dataKey: "SL" },
//     { header: "OFF", dataKey: "OFF" },
//     { header: "A", dataKey: "A" },
//     { header: "UAL", dataKey: "UAL" },
//     { header: "OT", dataKey: "OT" },
//     { header: "Verified", dataKey: "Verified" },
//     { header: "Updater", dataKey: "Updater" },
//   ];

//   // Build body rows, multiline text for empName as in your code
//   const body = rows.map((emp) => {
//     const empName = [
//       emp.name || "",
//       `Badge#: ${emp.empBadgeNo || ""} | SapID: ${emp.sapNo || ""}`,
//       `Hours/Day: ${
//         Array.isArray(emp.workHrs)
//           ? emp.workHrs[emp.workHrs.length - 1] || "0"
//           : emp.workHrs || "0"
//       }  Days/Month: ${
//         Array.isArray(emp.workMonth)
//           ? emp.workMonth[emp.workMonth.length - 1] || "0"
//           : emp.workMonth || "0"
//       }`,
//       `SalaryType: ${
//         Array.isArray(emp.salaryType) && emp.salaryType.length > 0
//           ? emp.salaryType[emp.salaryType.length - 1]
//           : emp.salaryType || ""
//       }`,
//     ].join("\n");

//     const row = {
//       empName,
//       project: emp.jobcode || "",
//     };

//     // Per day working hours
//     for (let i = 0; i < dayCounts; i++) {
//       const d = new Date(startDate);
//       d.setDate(startDate.getDate() + i);
//       const key = getKeyFromDate(d);
//       row[`work_${i}`] = emp?.workingHrs?.[key] ?? "";
//     }

//     // Summary columns
//     row["NH"] = Number(emp.__totalHours || 0).toFixed(2);
//     row["ND"] = Number(emp.__NormalDays || 0).toFixed(2);
//     row["PH"] = emp?.hollydayCounts?.PH || 0;
//     row["PH-D"] = emp.__calculatedPHD || 0;
//     row["ALCL"] = emp.__totalOfALCL || 0;
//     row["SL"] = emp?.empLeaveCount?.SL || 0;
//     row["OFF"] = emp?.hollydayCounts?.OFF || 0;
//     row["A"] = Number(emp.__roundedTotalAbsentiesHrs || 0).toFixed(2);
//     row["UAL"] = emp?.empLeaveCount?.UAL || 0;
//     row["OT"] = Number(emp.__totalOT || 0).toFixed(2);
//     row["Verified"] = emp.__allFieldsYes ? "Yes" : "";
//     row["Updater"] = emp.__uniqueTimeKeeperName || "";

//     return row;
//   });

//   const pdf = new jsPDF({
//     orientation: "landscape",
//     unit: "pt",
//     format: "a2",
//   });

//   // Add logo at top left
//   const imgProps = pdf.getImageProperties(tableLogo);
//   const logoWidth = 100;
//   const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
//   pdf.addImage(tableLogo, "PNG", 20, 15, logoWidth, logoHeight);

//   // Add titles with same style and margin
//   pdf.setFontSize(16);
//   pdf.setFont("helvetica", "bold");
//   pdf.text(`TIMESHEET SUMMARY - ${location} DIVISION`, 140, 40);
//   pdf.text(`FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}`, 140, 60);

//   // Column styles matching your CSS exactly
//   const columnStyles = {
//     empName: { cellWidth: 180, halign: "left", valign: "middle" },
//     project: { cellWidth: 80, halign: "center", valign: "middle" },
//   };
//   for (let i = 0; i < dayCounts; i++) {
//     columnStyles[`work_${i}`] = {
//       cellWidth: 30,
//       halign: "center",
//       valign: "middle",
//     };
//   }
//   [
//     "NH", "ND", "PH", "PH-D", "ALCL", "SL", "OFF", "A", "UAL", "OT", "Verified", "Updater",
//   ].forEach((key) => {
//     columnStyles[key] = {
//       cellWidth: 40,
//       halign: "center",
//       valign: "middle",
//     };
//   });

//   // AutoTable options matching your styles
//   pdf.autoTable({
//     startY: logoHeight + 70,
//     head: [headers.map((h) => (typeof h === "string" ? h : h.header))],
//     body: body.map((row) =>
//       headers.map((h) => (typeof h === "string" ? row[h] : row[h.dataKey] ?? ""))
//     ),
//     styles: {
//       fontSize: 14,
//       cellPadding: 8,
//       overflow: "linebreak",
//       valign: "middle",
//       halign: "center",
//       lineColor: [0, 0, 0],
//       lineWidth: 0.5,
//     },
//     columnStyles,
//     headStyles: {
//       fillColor: [120, 120, 120],
//       textColor: 255,
//       fontStyle: "bold",
//       halign: "center",
//       valign: "middle",
//     },
//     bodyStyles: {
//       minCellHeight: 20,
//     },
//     rowPageBreak: "avoid", // Prevent row splitting across pages
//   });

//   pdf.save(
//     `TIMESHEET SUMMARY - ${location} DIVISION FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}.pdf`
//   );
// }


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import jsPDF from "jspdf";
import "jspdf-autotable";
import tableLogo from "../../../assets/logo/aweLogo.png"; // base64 preferred
import checkboxicon from "../../../assets/timeSheet/viewSummaryIcons/checkmark.png"; // base64 preferred

export async function DownloadVSpdf({
  rows = [],
  dayCounts = 0,
  startDate,
  formattedStartDate = "",
  formattedEndDate = "",
  location = "",
}) {
  const getKeyFromDate = (date) =>
    `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  const dayHeaders = [];
  for (let i = 0; i < dayCounts; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    dayHeaders.push(`${d.getDate()}`);
  }

  const headers = [
    { header: "Employee Name", dataKey: "empName" },
    { header: "PROJECT", dataKey: "project" },
    ...dayHeaders.map((day, i) => ({ header: day, dataKey: `day_${i}` })),
    { header: "NH", dataKey: "NH" },
    { header: "ND", dataKey: "ND" },
    { header: "PH", dataKey: "PH" },
    { header: "PH-D", dataKey: "PH_D" },
    { header: "AL/CL", dataKey: "ALCL" },
    { header: "SL", dataKey: "SL" },
    { header: "OFF", dataKey: "OFF" },
    { header: "A", dataKey: "A" },
    { header: "UAL", dataKey: "UAL" },
    { header: "OT", dataKey: "OT" },
    { header: "Verified", dataKey: "Verified" },
    { header: "Updater", dataKey: "Updater" },
  ];

  const body = [];

  for (const emp of rows) {
    // Row 1: Employee info + workingHrs + summary cols
    const empName = [
      emp.name || "",
      `Badge#: ${emp.empBadgeNo || ""} | SapID: ${emp.sapNo || ""}`,
      `Hours/Day: ${
        Array.isArray(emp.workHrs)
          ? emp.workHrs[emp.workHrs.length - 1] || "0"
          : emp.workHrs || "0"
      }  Days/Month: ${
        Array.isArray(emp.workMonth)
          ? emp.workMonth[emp.workMonth.length - 1] || "0"
          : emp.workMonth || "0"
      }`,
      `SalaryType: ${
        Array.isArray(emp.salaryType) && emp.salaryType.length > 0
          ? emp.salaryType[emp.salaryType.length - 1]
          : emp.salaryType || ""
      }`,
    ].join("\n");

    const row1 = {
      empName,
      project: emp.jobcode || "",
      NH: Number(emp.__totalHours || 0).toFixed(2),
      ND: Number(emp.__NormalDays || 0).toFixed(2),
      PH: emp?.hollydayCounts?.PH || 0,
      PH_D: emp.__calculatedPHD || 0,
      ALCL: emp.__totalOfALCL || 0,
      SL: emp?.empLeaveCount?.SL || 0,
      OFF: emp?.hollydayCounts?.OFF || 0,
      A: Number(emp.__roundedTotalAbsentiesHrs || 0).toFixed(2),
      UAL: emp?.empLeaveCount?.UAL || 0,
      OT: Number(emp.__totalOT || 0).toFixed(2),
      Verified: emp.__allFieldsYes ? "Yes" : "",
      Updater: emp.__uniqueTimeKeeperName || "",
    };

    // Day working hours
    for (let i = 0; i < dayCounts; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const key = getKeyFromDate(d);
      row1[`day_${i}`] = emp?.workingHrs?.[key] ?? "";
    }
    body.push(row1);

    // Row 2: OT row for days only, empty for other cols
    const row2 = {
      empName: "", // empty, no rowspan possible but visually blank
      project: "",
      NH: "",
      ND: "",
      PH: "",
      PH_D: "",
      ALCL: "",
      SL: "",
      OFF: "",
      A: "",
      UAL: "",
      OT: "",
      Verified: "",
      Updater: "",
    };
    for (let i = 0; i < dayCounts; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const key = getKeyFromDate(d);
      row2[`day_${i}`] = emp?.OVERTIMEHRS?.[key] ?? "0";
    }
    body.push(row2);

    // Row 3: Verified checkboxes + totals row

    // Build verified cells text ("✓" for checked, blank if not)
    // autotable doesn't support images directly here without custom cell renderer
    // so use Unicode checkmark for visual
    const verifiedRow = {
      empName: "",
      project: "",
      NH: "",
      ND: "",
      PH: "",
      PH_D: "",
      ALCL: "",
      SL: "",
      OFF: "",
      A: "",
      UAL: "",
      OT: "",
      Verified: "",
      Updater: "",
    };
    for (let i = 0; i < dayCounts; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const key = getKeyFromDate(d);
      verifiedRow[`day_${i}`] = emp?.getVerify?.[key] ? "✓" : "";
    }
    body.push(verifiedRow);

    // The totals row (like your totalsRow in original code)
    const totalsRow = {
      empName: "Total",
      project: "",
      NH: "",
      ND: "",
      PH: "",
      PH_D: "",
      ALCL: "",
      SL: "",
      OFF: "",
      A: "",
      UAL: "",
      OT: "",
      Verified: "",
      Updater: "",
    };

    // totalsRow days empty + summary totals filled
    for (let i = 0; i < dayCounts; i++) {
      totalsRow[`day_${i}`] = "";
    }
    totalsRow.NH = Number(emp.__totalHours || 0).toFixed(2);
    totalsRow.ND = Number(emp.__NormalDays || 0).toFixed(2);
    totalsRow.PH = emp?.hollydayCounts?.PH || 0;
    totalsRow.PH_D = emp.__calculatedPHD || 0;
    totalsRow.ALCL = emp.__totalOfALCL || 0;
    totalsRow.SL = emp?.empLeaveCount?.SL || 0;
    totalsRow.OFF = emp?.hollydayCounts?.OFF || 0;
    totalsRow.A = Number(emp.__roundedTotalAbsentiesHrs || 0).toFixed(2);
    totalsRow.UAL = emp?.empLeaveCount?.UAL || 0;
    totalsRow.OT = Number(emp.__totalOT || 0).toFixed(2);
    body.push(totalsRow);
  }

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a2",
  });

  // Add logo
  const imgProps = pdf.getImageProperties(tableLogo);
  const logoWidth = 100;
  const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
  pdf.addImage(tableLogo, "PNG", 20, 15, logoWidth, logoHeight);

  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text(`TIMESHEET SUMMARY - ${location} DIVISION`, 140, 40);
  pdf.text(`FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}`, 140, 60);

  // Column styles same as before
  const columnStyles = {
    empName: { cellWidth: 180, halign: "left", valign: "middle" },
    project: { cellWidth: 80, halign: "center", valign: "middle" },
  };
  for (let i = 0; i < dayCounts; i++) {
    columnStyles[`day_${i}`] = { cellWidth: 30, halign: "center", valign: "middle" };
  }
  [
    "NH", "ND", "PH", "PH_D", "ALCL", "SL", "OFF", "A", "UAL", "OT", "Verified", "Updater",
  ].forEach((key) => {
    columnStyles[key] = { cellWidth: 40, halign: "center", valign: "middle" };
  });

  pdf.autoTable({
    startY: logoHeight + 70,
    head: [headers.map((h) => (typeof h === "string" ? h : h.header))],
    body: body.map((row) =>
      headers.map((h) => (typeof h === "string" ? row[h] : row[h.dataKey] ?? ""))
    ),
    styles: {
      fontSize: 14,
      cellPadding: 8,
      overflow: "linebreak",
      valign: "middle",
      halign: "center",
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
    },
    columnStyles,
    headStyles: {
      fillColor: [120, 120, 120],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
    },
    bodyStyles: {
      minCellHeight: 20,
    },
    rowPageBreak: "avoid",
  });

  pdf.save(
    `TIMESHEET SUMMARY - ${location} DIVISION FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}.pdf`
  );
}


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&



