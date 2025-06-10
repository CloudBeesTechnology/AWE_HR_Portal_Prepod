import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Download a section of the page as a PDF
 * @param {string} elementID - The ID of the DOM element to capture.
 */
export const downloadPDF = (
  elementID,
) => {
  const input = document.getElementById(elementID);

  if (!input) {
    console.error(`Element with ID ${elementID} not found`);
    return;
  }

  // Temporarily adjust the table container to ensure all content is visible
  const container = input.parentElement;
  const originalHeight = container.style.height;
  container.style.height = "auto";

  html2canvas(input, {
    useCORS: true,
    scale: 1.5, // Lower scale reduces size (default is 1, 2 gives better quality)
  })
    .then((canvas) => {
      // Revert the height
      container.style.height = originalHeight;

      const imgData = canvas.toDataURL("image/jpeg", 0.8); // Use JPEG with quality
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [279.4, 431.8], // Tabloid size in mm
      });

      // Margins
      const marginTop = 10;
      const marginLeft = 10;
      const marginRight = 10;
      const marginBottom = 10;

      // Calculate dimensions
      const pdfWidth =
        pdf.internal.pageSize.getWidth() - marginLeft - marginRight;
      const pdfHeight =
        pdf.internal.pageSize.getHeight() - marginTop - marginBottom;
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const x = marginLeft + (pdfWidth - imgWidth * scale) / 2;
      const y = marginTop; 

      pdf.addImage(imgData, "JPEG", x, y, imgWidth * scale, imgHeight * scale);

      pdf.save("ContractForm.pdf");
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
};
