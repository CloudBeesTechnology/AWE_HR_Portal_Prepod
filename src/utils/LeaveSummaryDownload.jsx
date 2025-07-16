import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import tableLogo from "../assets/logo/aweLogo.png"

export const LeaveSummaryDownload = () => {
  const DownloadExcelPDF = (elementID, selectedDate) => {
    const input = document.getElementById(elementID);

    if (!input) {
      console.warn("Invalid element ID passed for PDF generation.");
      return;
    }

    // Temporarily expand scroll container so canvas captures full width
    const scrollWrapper = input.closest(".overflow-x-auto");
    const originalWidth = scrollWrapper.style.width;
    scrollWrapper.style.width = "auto";

    html2canvas(input, {
      useCORS: true,
      scale: 2,
      backgroundColor: "#ffffff",
    })
      .then((canvas) => {
        // Restore original styles
        scrollWrapper.style.width = originalWidth;

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait", // wider tables work better in landscape
          unit: "mm",
          format: "a4",
        });

        // Dimensions
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const margin = 10;
        const contentWidth = pageWidth - margin * 2;

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const scaleRatio = contentWidth / imgWidth;
        const scaledHeight = imgHeight * scaleRatio;

        const logoWidth = 30;
        const logoHeight = 0;
  const logoUrl = tableLogo;
        // 1. Add Logo
        pdf.addImage(logoUrl, "SVG", margin, margin, logoWidth, logoHeight);

        // 2. Add Header Text
        pdf.setFontSize(8);
        pdf.text(
          `Leave Summary for (${selectedDate})`,
          margin,
          margin + 5 + 5
        );

        // 3. Add Table Image
        const yStart = margin + logoHeight + 15;
        pdf.addImage(
          imgData,
          "SVG",
          margin,
          yStart,
          contentWidth,
          scaledHeight
        );

        // 4. Save
        pdf.save(`Leave Summary for (${selectedDate}).pdf`);
      })
      .catch((error) => {
        console.error("Failed to generate PDF:", error);
      });
  };
  return { DownloadExcelPDF };
};
