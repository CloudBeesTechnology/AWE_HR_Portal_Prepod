import logo from "../assets/logo/logo-with-name.svg";
export const LeaveSummaryPrint = () => {
  const PrintExcelSheet = (downloadTable, selectedDate) => {
    const table = document.getElementById(downloadTable);

    if (!table) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";

    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write("<html><head><title>Print Table</title>");
    iframeDoc.write("<style>");

    // ✅ Style to match your layout
    iframeDoc.write(`
    body { font-family: Arial, sans-serif; margin: 20px; }

    .print-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
    }

    .logo {
      width: 200px;
      height: auto;
    }

    .header-text h2 {
      margin: 4px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      border: 1px solid black;
      padding: 6px;
      text-align: center;
    }
    
    td {
      border: 1px solid black;
      padding: 6px;
      vertical-align: top;
      text-align: center;
    }

    #leaveDetailSec {
      padding: 0px;
    }

    #LeaveNames {
    padding: 6px;
    text-align: start;
    }

    th {
      background-color: #fde28bb6;
    }
  `);

    iframeDoc.write("</style>");
    iframeDoc.write("</head><body>");

    // ✅ Add header: image + report text
    iframeDoc.write(`
    <div class="print-header">
      <img src="${logo}" class="logo" alt="Logo" />
      <div class="header-text">
      <h2>Leave Summary for (${selectedDate})</h2>
      </div>
    </div>
  `);

    // ✅ Clone the table (preserves layout)
    iframeDoc.body.appendChild(table.cloneNode(true));

    iframeDoc.write("</body></html>");
    iframeDoc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  return { PrintExcelSheet };
};
