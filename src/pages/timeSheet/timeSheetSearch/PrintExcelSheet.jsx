// 
import img from "../../../assets/logo/logo-with-name.svg";

export function PrintExcelSheet({
  rows = [],
  dayCounts = 0,
  startDate,
  formattedStartDate = "",
  formattedEndDate = "",
  location = "",
}) {
  const escapeHtml = (str = "") =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const buildDayHeaderTHs = () => {
    let ths = "";
    for (let i = 0; i < dayCounts; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      ths += `<th>${d.getDate()}</th>`;
    }
    return ths;
  };

  const buildRowsHtml = () => {
    return rows
      .map((emp) => {
        let workingCells = "";
        let otCells = "";
        let verifiedCells = "";

        for (let i = 0; i < dayCounts; i++) {
          const currentDay = new Date(startDate);
          currentDay.setDate(startDate.getDate() + i);
          const key = `${currentDay.getDate()}-${
            currentDay.getMonth() + 1
          }-${currentDay.getFullYear()}`;

          const workVal = emp?.workingHrs?.[key] ?? "";
          const otVal = emp?.OVERTIMEHRS?.[key] ?? "0";
          const isChecked = Boolean(emp?.getVerify?.[key]);

          workingCells += `<td class="${
            isChecked ? "verified" : ""
          } workHrs">${escapeHtml(String(workVal))}</td>`;
          otCells += `<td>${escapeHtml(String(otVal))}</td>`;
          verifiedCells += `<td>${isChecked ? "✔" : ""}</td>`;
        }

        const totalsRow = `
          <tr class="totals">
            <td class="total-label">Total</td>
            ${Array.from({ length: dayCounts + 1 })
              .map(() => `<td></td>`)
              .join("")}
            <td>${Number(emp.__totalHours || 0).toFixed(2)}</td>
            <td>${Number(emp.__NormalDays || 0).toFixed(2)}</td>
            <td>${emp?.hollydayCounts?.PH || 0}</td>
            <td>${emp.__calculatedPHD || 0}</td>
            <td>${emp.__totalOfALCL || 0}</td>
            <td>${emp?.empLeaveCount?.SL || 0}</td>
            <td>${emp?.hollydayCounts?.OFF || 0}</td>
            <td>${Number(emp.__roundedTotalAbsentiesHrs || 0).toFixed(2)}</td>
            <td>${emp?.empLeaveCount?.UAL || 0}</td>
            <td>${Number(emp.__totalOT || 0).toFixed(2)}</td>
            <td></td>
            <td></td>
          </tr>
        `;

        return `
          <tbody>
            <tr>
              <td rowspan="2" class="empName">
                ${escapeHtml(emp.name || "")}
                <br/>
                Badge# : ${escapeHtml(
                  emp.empBadgeNo || ""
                )} | SapID : ${escapeHtml(emp.sapNo || "")}
                <br/>
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
                <br/>
                SalaryType: ${escapeHtml(
                  (Array.isArray(emp?.salaryType) && emp?.salaryType.length > 0
                    ? emp.salaryType[emp.salaryType.length - 1]
                    : emp?.salaryType) || ""
                )}
              </td>

              <td rowspan="2">${escapeHtml(emp.jobcode || "")}</td>

              ${workingCells}

              <td rowspan="2">${Number(emp.__totalHours || 0).toFixed(2)}</td>
              <td rowspan="2">${Number(emp.__NormalDays || 0).toFixed(2)}</td>
              <td rowspan="2">${emp?.hollydayCounts?.PH || 0}</td>
              <td rowspan="2">${emp.__calculatedPHD || 0}</td>
              <td rowspan="2">${emp.__totalOfALCL || 0}</td>
              <td rowspan="2">${emp?.empLeaveCount?.SL || 0}</td>
              <td rowspan="2">${emp?.hollydayCounts?.OFF || 0}</td>
              <td rowspan="2">${Number(
                emp.__roundedTotalAbsentiesHrs || 0
              ).toFixed(2)}</td>
              <td rowspan="2">${emp?.empLeaveCount?.UAL || 0}</td>
              <td rowspan="2">${Number(emp.__totalOT || 0).toFixed(2)}</td>
              <td rowspan="2">${emp.__allFieldsYes ? "Yes" : ""}</td>
              <td rowspan="2">${escapeHtml(
                emp.__uniqueTimeKeeperName || ""
              )}</td>
            </tr>

            <tr>${otCells}</tr>

            <tr class="verified-row">
            <td></td>
            <td></td>
            ${verifiedCells}
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>

            ${totalsRow}
          </tbody>
        `;
      })
      .join("");
  };

  const printCSS = `
    body { font-family: Arial, Helvetica, sans-serif; margin: 10px; }
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 15px;
    }
    .logo {
      height: 60px;
      margin-bottom: 0px;
    }
    .content-text h2 {
      margin: 4px;
      font-size: 18px;
      font-weight: bold;
      text-align: left;
    }
    table { width: 100%; border-collapse: collapse; font-size: 18px; }
    th, td {
      border: 1px solid #000;
      padding: 10px;
      text-align: center;
      vertical-align: middle;
    }
    .workHrs {
      min-width: 30px;
      max-width: 30px;
      word-wrap: break-word;
      white-space: normal;
    }
    th {
      color: white;
    }
    thead th {
      background: #787878;
      height: 50px;
    }
    .totals { background: #d8d3d3; }
    .total-label { text-align: left; padding-left: 10px; }
    .verified-row td { height: 24px; }
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    @media print {
      thead { display: table-header-group; }
      tr { page-break-inside: avoid; }
    }
    .empName {
      min-width: 180px;
      max-width: 180px;
      word-wrap: break-word;
      white-space: normal;
      text-align: left;
    }
  `;

  const head = `
    <thead>
      <tr>
        <th rowspan="2">Employee Name</th>
        <th rowspan="2">PROJECT</th>
        ${buildDayHeaderTHs()}
        <th rowspan="2">NH</th>
        <th rowspan="2">ND</th>
        <th rowspan="2">PH</th>
        <th rowspan="2">PH-D</th>
        <th rowspan="2">AL/CL</th>
        <th rowspan="2">SL</th>
        <th rowspan="2">OFF</th>
        <th rowspan="2">A</th>
        <th rowspan="2">UAL</th>
        <th rowspan="2">OT</th>
        <th rowspan="2">Verified</th>
        <th rowspan="2">Updater</th>
      </tr>
    </thead>
  `;

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>View Summary Print</title>
        <style>${printCSS}</style>
      </head>
      <body>
        <div class="content">
          <img src="${img}" class="logo" alt="Logo"><br/>
          <div class="content-text">
            <h2>TIMESHEET SUMMARY - ${escapeHtml(location)} DIVISION</h2>
            <h2>FOR THE PERIOD ${escapeHtml(
              formattedStartDate
            )} TO ${escapeHtml(formattedEndDate)}</h2>
          </div>
        </div>
        <table>
          ${head}
          ${buildRowsHtml()}
        </table>
      </body>
    </html>
  `;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const frameDoc = iframe.contentWindow.document;
  frameDoc.open();
  frameDoc.write(html);
  frameDoc.close();

  // Save old title, set new one, print, then restore title
  const oldTitle = document.title;
  document.title = `TIMESHEET SUMMARY - ${location} DIVISION FOR THE PERIOD ${escapeHtml(
    formattedStartDate
  )} TO ${escapeHtml(formattedEndDate)}`;

  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    setTimeout(() => {
      document.title = oldTitle;
      document.body.removeChild(iframe);
    }, 500);
  }, 500);
}
