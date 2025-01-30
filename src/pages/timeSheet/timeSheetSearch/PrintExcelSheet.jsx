import img from "../../../assets/logo/logo-with-name.svg";
export const PrintExcelSheet = (
  downloadTable,
  location,
  formattedStartDate,
  formattedEndDate
) => {
  // Get the table by its ID
  const table = document.getElementById(downloadTable);
  // console.log(downloadTable)
  if (!table) {
    // console.error("Table with the given ID not found");
    return;
  }

  // Create a hidden iframe
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";

  // Append the iframe to the document body
  document.body.appendChild(iframe);

  // Write content to the iframe
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write("<html><head><title>Print Table</title>");
  iframeDoc.write("<style>");

  // Add custom styles for the table, logo, and text content
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

  // Add logo and text content
  iframeDoc.write(`
      <div class="content">
        <img src=${img} class="logo" alt="Logo"> 
        <h2>TIMESHEET SUMMARY - ${location} DIVISION</h2>
        <h2>FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}</h2>
      </div>
    `);

  // Append the table content into the iframe's body
  iframeDoc.body.appendChild(table.cloneNode(true)); // Clone the table to avoid affecting the original
  iframeDoc.write("</body></html>");
  iframeDoc.close();

  // Trigger the print dialog in the iframe
  iframe.contentWindow.focus();
  iframe.contentWindow.print();

  // Remove the iframe after printing
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000);
};
