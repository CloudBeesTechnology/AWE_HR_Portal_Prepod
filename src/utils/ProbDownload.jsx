import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Download a section of the page as a multi-page PDF (if necessary)
 * @param {string} elementID - The ID of the DOM element to capture.
 */

export const ProbDownload = (elementID) => {
  const input = document.getElementById(elementID);

  if (!input) {
    console.error(`Element with ID ${elementID} not found`);
    return;
  }

  const dateInputs = input.querySelectorAll('input[type="date"]');
  const originalDateValues = [];

  // Replace date inputs with formatted spans
  dateInputs.forEach((dateInput, index) => {
    const date = new Date(dateInput.value);
    const formattedDate = date.toLocaleDateString('en-GB'); // "dd/mm/yyyy"
    const formatted = formattedDate.replace(/\//g, "-"); // "dd-mm-yyyy"

    const span = document.createElement('span');
    span.textContent = formatted;
    span.style.font = window.getComputedStyle(dateInput).font;
    span.style.padding = window.getComputedStyle(dateInput).padding;

    originalDateValues.push({
      input: dateInput,
      value: dateInput.value,
      parent: dateInput.parentNode,
      sibling: dateInput.nextSibling,
      replacement: span,
    });

    dateInput.style.display = 'none';
    dateInput.parentNode.insertBefore(span, dateInput.nextSibling);
  });

  // Continue with canvas and PDF logic...
  const container = input.parentElement;
  const originalHeight = container.style.height;
  container.style.height = "auto";

  html2canvas(input, {
    useCORS: true,
    scale: 2,
    scrollY: -window.scrollY,
  }).then((canvas) => {
    container.style.height = originalHeight;

    // Restore original inputs
    originalDateValues.forEach(({ input, replacement }) => {
      input.style.display = '';
      replacement.remove();
    });

    // Create PDF (same logic you already have)
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const marginTop = 4;
    const marginBottom = 4;
    const marginLeft = 0;
    const marginRight = 0;

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - marginLeft - marginRight;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const availablePageHeight = pageHeight - marginTop - marginBottom;
    const pagePixelHeight = (canvas.width / imgWidth) * availablePageHeight;

    let position = 0;
    let pageCount = 0;

    while (position < canvas.height) {
      const canvasPage = document.createElement("canvas");
      const context = canvasPage.getContext("2d");

      canvasPage.width = canvas.width;
      canvasPage.height = Math.min(pagePixelHeight, canvas.height - position);

      context.drawImage(canvas, 0, position, canvas.width, canvasPage.height, 0, 0, canvas.width, canvasPage.height);

      const imgData = canvasPage.toDataURL("image/jpeg", 1.0);

      if (pageCount > 0) {
        pdf.addPage();
      }

      const imageHeightOnPDF = (canvasPage.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", marginLeft, marginTop, imgWidth, imageHeightOnPDF);

      position += pagePixelHeight;
      pageCount++;
    }

    pdf.save("ProbationForm.pdf");
  }).catch((error) => {
    console.error("Error generating PDF:", error);
  });
};