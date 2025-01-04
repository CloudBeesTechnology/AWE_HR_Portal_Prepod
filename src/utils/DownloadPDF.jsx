// // src/utils/downloadPDF.js
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// /**
//  * Download a section of the page as a PDF
//  * @param {string} elementID - The ID of the DOM element to capture.
//  */
// export const downloadPDF = (elementID) => {
//   const input = document.getElementById(elementID);

//   if (!input) {
//     console.error(`Element with ID ${elementID} not found`);
//     return;
//   }

//   // Temporarily adjust the table container to ensure all content is visible
//   const container = input.parentElement;
//   const originalHeight = container.style.height;
//   container.style.height = 'auto'; // Ensure the container is tall enough to show all content

//   html2canvas(input, { useCORS: true, scale: 2 })
//     .then((canvas) => {
//       // Revert the height change
//       container.style.height = originalHeight;

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4',
//       });

//       // Calculate dimensions and scaling
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;
//       const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

//       // Calculate positioning
//       const x = (pdfWidth - imgWidth * scale) / 2;
//       const y = (pdfHeight - imgHeight * scale) / 2;

//       pdf.addImage(imgData, 'PNG', x, y, imgWidth * scale, imgHeight * scale);
//       pdf.save('products.pdf');
//     })
//     .catch((error) => {
//       console.error('Error generating PDF:', error); // Catch any errors
//     });
// };
// src/utils/downloadPDF.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Download a section of the page as a PDF
 * @param {string} elementID - The ID of the DOM element to capture.
 */
export const downloadPDF = (elementID) => {
  const input = document.getElementById(elementID);

  if (!input) {
    console.error(`Element with ID ${elementID} not found`);
    return;
  }

  // Temporarily adjust the table container to ensure all content is visible
  const container = input.parentElement;
  const originalHeight = container.style.height;
  container.style.height = 'auto'; // Ensure the container is tall enough to show all content

  html2canvas(input, { useCORS: true, scale: 2 })
    .then((canvas) => {
      // Revert the height change
      container.style.height = originalHeight;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Add margins (in mm)
      const marginTop = 10;
      const marginBottom = 10;
      const marginLeft = 10;
      const marginRight = 10;

      // Calculate dimensions and scaling
      const pdfWidth = pdf.internal.pageSize.getWidth() - marginLeft - marginRight;
      const pdfHeight = pdf.internal.pageSize.getHeight() - marginTop - marginBottom;
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      // Calculate positioning with margins
      const x = marginLeft + (pdfWidth - imgWidth * scale) / 2;
      const y = marginTop + (pdfHeight - imgHeight * scale) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth * scale, imgHeight * scale);
      pdf.save('products.pdf');
    })
    .catch((error) => {
      console.error('Error generating PDF:', error); // Catch any errors
    });
};
