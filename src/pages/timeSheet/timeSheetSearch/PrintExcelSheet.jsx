import img from "../../../assets/logo/logo-with-name.svg";
export const PrintExcelSheet = (
  downloadTable,
  location,
  formattedStartDate,
  formattedEndDate
) => {
  const table = document.getElementById(downloadTable);

  if (!table) {
    return;
  }

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

  iframeDoc.write(`
      body { font-family: Arial, sans-serif; margin: 20px; }
      .content { margin-bottom: 20px; }
      .logo { max-width: 300px; margin-bottom: 10px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 8px; text-align: left; border: 1px solid black; }
      th { background-color: #f2f2f2; }
    `);

  iframeDoc.write("</style>");
  iframeDoc.write("</head><body>");

  iframeDoc.write(`
      <div class="content">
        <img src=${img} class="logo" alt="Logo"> 
        <h2>TIMESHEET SUMMARY - ${location} DIVISION</h2>
        <h2>FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}</h2>
      </div>
    `);

  iframeDoc.body.appendChild(table.cloneNode(true));
  iframeDoc.write("</body></html>");
  iframeDoc.close();

  iframe.contentWindow.focus();
  iframe.contentWindow.print();

  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000);
};
