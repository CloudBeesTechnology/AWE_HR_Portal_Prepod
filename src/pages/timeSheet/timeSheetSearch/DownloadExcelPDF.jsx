import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import tableLogo from "../../../assets/logo/aweLogo.png";

/**
 * Download a section of the page as a PDF
 * @param {string} elementID - The ID of the DOM element to capture.
 */
export const DownloadExcelPDF = (
  elementID,
  location,
  formattedStartDate,
  formattedEndDate,
  
) => {
  const input = document.getElementById(elementID);

  if (!input) {
    return;
  }

  const container = input.parentElement;
  const originalHeight = container.style.height;
  container.style.height = "auto";

  html2canvas(input, { useCORS: true, scale: 2 })
    .then((canvas) => {
      container.style.height = originalHeight;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const marginTop = 5;
      const marginBottom = 0;
      const marginLeft = 5;
      const marginRight = 5;

      const logoUrl = tableLogo;
      pdf.addImage(logoUrl, "SVG", marginLeft, marginTop, 30, 5);

      pdf.setFontSize(4);

      pdf.setFontSize(4);

      pdf.text(
        `TIMESHEET SUMMARY - ${location} DIVISION`,
        marginLeft,
        marginTop + 8
      );
      pdf.text(
        `FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}`,
        marginLeft,
        marginTop + 10
      );

      const pdfWidth =
        pdf.internal.pageSize.getWidth() - marginLeft - marginRight;
      const pdfHeight =
        pdf.internal.pageSize.getHeight() - marginTop - marginBottom;
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const x = marginLeft + (pdfWidth - imgWidth * scale) / 2;
      const y = marginTop + 10 + 3;

      pdf.addImage(imgData, "SVG", x, y, imgWidth * scale, imgHeight * scale);

      pdf.save(
        `TIMESHEET SUMMARY - ${location} DIVISION FOR THE PERIOD ${formattedStartDate} TO ${formattedEndDate}.pdf`
      );
     
    })
    .catch((error) => {});
};
