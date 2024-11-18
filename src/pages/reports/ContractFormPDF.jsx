import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Ensure this is imported

export const ContractFormPDF = ({contentRef}) => {
  // const contentRef = useRef(); // Create a ref for the PDF content
console.log("dfkgnfdj");

  // const exportToPDF = () => {
  //   const doc = new jsPDF("landscape"); // Landscape orientation for wide tables

  //   // Extract th data
  //   const selectThead = document.querySelectorAll("table thead tr");
  //   const theadData = Array.from(selectThead).map((row) => {
  //     const cell = row.querySelectorAll("th"); // Changed 'td' to 'th' for headers
  //     return Array.from(cell).map((thData) => thData.innerText);
  //   });

  //   // Extract td data
  //   const rows = document.querySelectorAll("table tbody tr");
  //   const tableData = Array.from(rows).map((row) => {
  //     const cells = row.querySelectorAll("td"); // Correctly select 'td' for body cells
  //     return Array.from(cells).map((cell) => cell.querySelector('input') ? cell.querySelector('input').value : cell.innerText); // Get value of input or innerText
  //   });

  //   // Add the table to the PDF
  //   doc.autoTable({
  //     head: theadData,
  //     body: tableData,
  //     startY: 20, // Adjust the starting Y position
  //     styles: {
  //       cellWidth: "auto",
  //       overflow: "linebreak",
  //     },
  //   });

  //   // Download the PDF
  //   doc.save("table_data.pdf");
  // };

  return (
    <div className="container mx-auto p-8" ref={contentRef}>
      <div className="text-center text-lg font-bold uppercase mb-4">
        Contract Completion Form for the Month of January 2024
      </div>

      <div className="mb-16 mt-10">
        <label className="font-semibold">Attn:</label>
        <input
          type="text"
          className="ml-2 border-b-2 border-black focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black p-2">No.</th>
              <th className="border border-black p-2">Employee Name</th>
              <th className="border border-black p-2">Badge No.</th>
              <th className="border border-black p-2">Position</th>
              <th className="border border-black p-2">Department</th>
              <th className="border border-black p-2">Nationality</th>
              <th className="border border-black p-2">Date Of Join</th>
              <th className="border border-black p-2">Contract Start Date</th>
              <th className="border border-black p-2">Contract End Date</th>
              <th className="border border-black p-2">LD Expiry</th>
              <th className="border border-black p-2">Duration of Renewal Contract</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(15)].map((_, i) => (
              <tr key={i}>
                <td className="border border-black p-2">{i + 1}</td>
                <td className="border border-black p-2">
                  <input type="text" className="w-full border-none focus:outline-none" />
                </td>
                <td className="border border-black p-2">
                  <input type="text" className="w-full border-none focus:outline-none" />
                </td>
                <td className="border border-black p-2">
                  <input type="text" className="w-full border-none focus:outline-none" />
                </td>
                <td className="border border-black p-2">
                  <input type="text" className="w-full border-none focus:outline-none" />
                </td>
                <td className="border border-black p-2">
                  <input type="text" className="w-full border-none focus:outline-none" />
                </td>
                <td className="border border-black p-2">
                  <input type="date" className="w-full border-none focus:outline-none" />
                </td>
                <td className="border border-black p-2">
                  <input type="date" className="w-full border-none focus:outline-none" />
                </td>
                <td className="border border-black p-2">
                  <input type="date" className="w-full border-none focus:outline-none" />
                </td>
                <td className="border border-black p-2">
                  <input type="date" className="w-full border-none focus:outline-none" />
                </td>
                <td className="border border-black p-2">
                  <input type="text" className="w-full border-none focus:outline-none" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div className="mt-7">
        <p className="font-semibold">
          Notes: Deadline return to HRD after one week from the date received of
          Contract Completion Report
        </p>
      </div>

      {/* Footer */}
      <div className="mt-20 flex justify-between items-center">
        <div className="text-center">
          <p className="font-semibold mb-10">Recommended By:</p>
          <div className="border-t-2 border-black w-52 mx-auto"></div>
          <p className="mt-3">Department Head</p>
        </div>
        <div className="text-center">
          <p className="font-semibold mb-10">Acknowledged & Checked By:</p>
          <div className="border-t-2 border-black w-52 mx-auto"></div>
          <p className="mt-3">HRM</p>
        </div>
        <div className="text-center">
          <p className="font-semibold mb-10">Approved By:</p>
          <div className="border-t-2 border-black w-52 mx-auto"></div>
          <p className="mt-3">GM</p>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-8 text-center">
        <button
          // onClick={exportToPDF} // Updated to match the function name
          className="bg-yellow text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};
// import React, { useRef } from "react";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable"; // Ensure this is imported
// import html2canvas from "html2canvas";

// export const ContractFormPDF = () => {
//   const contentRef = useRef(); // Create a ref for the PDF content


// const exportToPDF = () => {
//     const doc = new jsPDF("landscape"); // Landscape orientation for wide tables
//     const rows = document.querySelectorAll("table tbody tr");
//     // const columns = ["ID", "Name", "Email", "Role"]; // Table column headers

//     // Extract th data
//     const selectThead = document.querySelectorAll("table thead tr");
//     const theadData = Array.from(selectThead).map((row) => {
//       const cell = row.querySelectorAll("td");
//       return Array.from(cell).map((thData) => thData.innerText);
//     });

//     // Extract td data
//     const tableData = Array.from(rows).map((row) => {
//       const cells = row.querySelectorAll("th");
//       return Array.from(cells).map((cell) => cell.innerText);
//     });

//     // Add the table to the PDF
//     doc.autoTable({
//       head: theadData,
//       body: tableData && tableData,
//       startY: 20, // Adjust the starting Y position
//       styles: {
//         cellWidth: "auto",
//         overflow: "linebreak",
//       },
//     });

//     // Download the PDF
//     doc.save("table_data.pdf");
//   };
//   return (
//     <div className="container mx-auto p-8" ref={contentRef}>
//       <div className="text-center text-lg font-bold uppercase mb-4">
//         Contract Completion Form for the Month of January 2024
//       </div>

//       <div className="mb-16 mt-10">
//         <label className="font-semibold">Attn:</label>
//         <input
//           type="text"
//           className="ml-2 border-b-2 border-black focus:outline-none"
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-black">
//           <thead>
//             <tr>
//               <th className="border border-black p-2">No.</th>
//               <th className="border border-black p-2">Employee Name</th>
//               <th className="border border-black p-2">Badge No.</th>
//               <th className="border border-black p-2">Position</th>
//               <th className="border border-black p-2">Department</th>
//               <th className="border border-black p-2">Nationality</th>
//               <th className="border border-black p-2">Date Of Join</th>
//               <th className="border border-black p-2">Contract Start Date</th>
//               <th className="border border-black p-2">Contract End Date</th>
//               <th className="border border-black p-2">LD Expiry</th>
//               <th className="border border-black p-2">Duration of Renewal Contract</th>
//             </tr>
//           </thead>
//           <tbody>
//             {[...Array(15)].map((_, i) => (
//               <tr key={i}>
//                 <td className="border border-black p-2">{i + 1}</td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="date" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="date" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="date" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="date" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>


//     {/* Notes */}
//            <div className="mt-7">
//          <p className="font-semibold">
//            Notes: Deadline return to HRD after one week from the date received of
//            Contract Completion Report
//          </p>
//        </div>


//       {/* Footer */}
//       <div className="mt-20 flex justify-between">
//         <div className="text-center">
//           <p className="font-semibold mb-10">Recommended By:</p>
//           <div className="border-t-2 border-black w-52 mx-auto"></div>
//           <p className="mt-3">Department Head</p>
//         </div>
//         <div className="text-center">
//           <p className="font-semibold mb-10">Acknowledged & Checked By:</p>
//           <div className="border-t-2 border-black w-52 mx-auto"></div>
//           <p className="mt-3">HRM</p>
//         </div>
//         <div className="text-center">
//           <p className="font-semibold mb-10">Approved By:</p>
//           <div className="border-t-2 border-black w-52 mx-auto"></div>
//           <p className="mt-3">GM</p>
//         </div>
//       </div>

//       {/* Download Button */}
//       <div className="mt-8 text-center">
//         <button
//           onClick={handleDownloadPDF}
//           className="bg-yellow text-white px-4 py-2 rounded"
//         >
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );
// };
// import React from "react";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable"; // Ensure this is imported

// export const ContractFormPDF = () => {
//   const handleDownloadPDF = () => {
//     const doc = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//       putOnlyUsedFonts: true,
//       floatPrecision: 16,
//     });

//     // Add title
//     doc.setFontSize(16);
//     doc.text("Contract Completion Form for the Month of January 2024", 105, 10, { align: "center" });

//     // Add the input fields and table
//     doc.setFontSize(12);
//     doc.text("Attn:", 10, 30);
//     doc.text("________________________", 30, 30); // Placeholder for the attention field

//     // Add table headers
//     const headers = [
//       "No.", "Employee Name", "Badge No.", "Position", "Department", 
//       "Nationality", "Date Of Join", "Contract Start Date", 
//       "Contract End Date", "LD Expiry", "Duration of Renewal Contract"
//     ];
    
//     const startY = 40;

//     // Create a dynamic array for table data
//     const tableData = [...Array(15)].map((_, i) => [
//       i + 1,
//       "", // Employee Name
//       "", // Badge No.
//       "", // Position
//       "", // Department
//       "", // Nationality
//       "", // Date Of Join
//       "", // Contract Start Date
//       "", // Contract End Date
//       "", // LD Expiry
//       ""  // Duration of Renewal Contract
//     ]);

//     doc.autoTable({
//       head: [headers],
//       body: tableData,
//       startY: startY,
//       theme: 'grid',
//       styles: {
//         cellPadding: 2,
//         fontSize: 10,
//       },
//       columnStyles: {
//         0: { cellWidth: 10 },
//         1: { cellWidth: 40 },
//         2: { cellWidth: 20 },
//         3: { cellWidth: 30 },
//         4: { cellWidth: 30 },
//         5: { cellWidth: 30 },
//         6: { cellWidth: 30 },
//         7: { cellWidth: 30 },
//         8: { cellWidth: 30 },
//         9: { cellWidth: 30 },
//         10: { cellWidth: 40 },
//       },
//     });

//     // Footer notes
//     const notesY = doc.autoTable.previous.finalY + 10; // Get the Y position of the last table
//     doc.text("Notes: Deadline return to HRD after one week from the date received of Contract Completion Report", 10, notesY);

//     // Check if there is enough space for the footer
//     const pageHeight = doc.internal.pageSize.height;
//     const footerY = notesY + 20; // Adding space for the footer

//     if (footerY > pageHeight) {
//       doc.addPage(); // Add a new page if there's not enough space
//     }

//     // Add Footer
//     const footerStartY = doc.internal.pageSize.height - 40; // Leave some space at the bottom
//     const footerLeftMargin = 20; // Adjust left margin for narrower footer
//     const footerRightMargin = 12; // Adjust right margin for narrower footer

//     doc.text("Recommended By:", footerLeftMargin, footerStartY);
//     doc.line(footerLeftMargin, footerStartY + 2, footerLeftMargin + (footerRightMargin - footerLeftMargin), footerStartY + 2); // Line for signature
//     doc.text("Department Head", footerLeftMargin, footerStartY + 10);

//     doc.text("Acknowledged & Checked By:", footerLeftMargin + 100, footerStartY);
//     doc.line(footerLeftMargin + 100, footerStartY + 2, footerLeftMargin + 180, footerStartY + 2); // Line for signature
//     doc.text("HRM", footerLeftMargin + 100, footerStartY + 10);

//     doc.text("Approved By:", footerLeftMargin, footerStartY + 20);
//     doc.line(footerLeftMargin, footerStartY + 22, footerLeftMargin + (footerRightMargin - footerLeftMargin), footerStartY + 22); // Line for signature
//     doc.text("GM", footerLeftMargin, footerStartY + 30);

//     // Save the PDF
//     doc.save("Contract_Completion_Form_January_2024.pdf");
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <div className="text-center text-lg font-bold uppercase mb-4">
//         Contract Completion Form for the Month of January 2024
//       </div>

//       <div className="mb-4">
//         <label className="font-semibold">Attn:</label>
//         <input
//           type="text"
//           className="ml-2 border-b-2 border-black focus:outline-none"
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-black">
//           <thead>
//             <tr>
//               <th className="border border-black p-2">No.</th>
//               <th className="border border-black p-2">Employee Name</th>
//               <th className="border border-black p-2">Badge No.</th>
//               <th className="border border-black p-2">Position</th>
//               <th className="border border-black p-2">Department</th>
//               <th className="border border-black p-2">Nationality</th>
//               <th className="border border-black p-2">Date Of Join</th>
//               <th className="border border-black p-2">Contract Start Date</th>
//               <th className="border border-black p-2">Contract End Date</th>
//               <th className="border border-black p-2">LD Expiry</th>
//               <th className="border border-black p-2">Duration of Renewal Contract</th>
//             </tr>
//           </thead>
//           <tbody>
//             {[...Array(15)].map((_, i) => (
//               <tr key={i}>
//                 <td className="border border-black p-2">{i + 1}</td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="date" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="date" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="date" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="date" className="w-full border-none focus:outline-none" />
//                 </td>
//                 <td className="border border-black p-2">
//                   <input type="text" className="w-full border-none focus:outline-none" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Notes */}
//       <div className="mt-7">
//         <p className="font-semibold">
//           Notes: Deadline return to HRD after one week from the date received of
//           Contract Completion Report
//         </p>
//       </div>

//       {/* Download Button */}
//       <div className="mt-8 text-center">
//         <button
//           onClick={handleDownloadPDF}
//           className="bg-yellow-500 text-white px-4 py-2 rounded"
//         >
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// // import React from "react";

// // export const ContractFormPDF = () => {
// //   return (
// //     <div className="container mx-auto p-8">
// //       <div className="text-center text-lg font-bold uppercase mb-4">
// //         Contract Completion Form for the Month of January 2024
// //       </div>

// //       <div className="mb-4">
// //         <label className="font-semibold">Attn:</label>
// //         <input
// //           type="text"
// //           className="ml-2 border-b-2 border-black focus:outline-none"
// //         />
// //       </div>

// //       {/* Table */}
// //       <div className="overflow-x-auto">
// //         <table className="min-w-full table-auto border-collapse border border-black">
// //           <thead>
// //             <tr>
// //               <th className="border border-black p-2 text-left">No.</th>
// //               <th className="border border-black p-2 text-left">Employee Name</th>
// //               <th className="border border-black p-2 text-left">Badge No.</th>
// //               <th className="border border-black p-2 text-left">Position</th>
// //               <th className="border border-black p-2 text-left">Department</th>
// //               <th className="border border-black p-2 text-left">Nationality</th>
// //               <th className="border border-black p-2 text-left">Date Of Join</th>
// //               <th className="border border-black p-2 text-left">Contract Start Date</th>
// //               <th className="border border-black p-2 text-left">Contract End Date</th>
// //               <th className="border border-black p-2 text-left">LD Expiry</th>
// //               <th className="border border-black p-2 text-left">Duration of Renewal Contract</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {[...Array(15)].map((_, i) => (
// //               <tr key={i}>
// //                 <td className="border border-black p-2">{i + 1}</td>
// //                 <td className="border border-black p-2">
// //                   <input type="text" className="w-full border-none focus:outline-none" />
// //                 </td>
// //                 <td className="border border-black p-2">
// //                   <input type="text" className="w-full border-none focus:outline-none" />
// //                 </td>
// //                 <td className="border border-black p-2">
// //                   <input type="text" className="w-full border-none focus:outline-none" />
// //                 </td>
// //                 <td className="border border-black p-2">
// //                   <input type="text" className="w-full border-none focus:outline-none" />
// //                 </td>
// //                 <td className="border border-black p-2">
// //                   <input type="text" className="w-full border-none focus:outline-none" />
// //                 </td>
// //                 <td className="border border-black p-2">
// //                   <input type="date" className="w-full border-none focus:outline-none" />
// //                 </td>
// //                 <td className="border border-black p-2">
// //                   <input type="date" className="w-full border-none focus:outline-none" />
// //                 </td>
// //                 <td className="border border-black p-2">
// //                   <input type="date" className="w-full border-none focus:outline-none" />
// //                 </td>
// //                 <td className="border border-black p-2">
// //                   <input type="date" className="w-full border-none focus:outline-none" />
// //                 </td>
// //                 <td className="border border-black p-2">
// //                   <input type="text" className="w-full border-none focus:outline-none" />
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Notes */}
// //       <div className="mt-7">
// //         <p className="font-semibold">
// //           Notes: Deadline return to HRD after one week from the date received of
// //           Contract Completion Report
// //         </p>
// //       </div>

// //       {/* Footer */}
// //       <div className="mt-20 flex justify-between">
// //         <div>
// //           <p className="text-center mb-12">Recommended By:</p>
// //           <div className="border-t-2 border-black w-52"></div>
// //           <p className="text-center mt-2">Department Head</p>
// //         </div>
// //         <div>
// //           <p className="text-center mb-12">Acknowledged & Checked By:</p>
// //           <div className="border-t-2 border-black w-52"></div>
// //           <p className="text-center mt-2">HRM</p>
// //         </div>
// //         <div>
// //           <p className="text-center mb-12">Approved By:</p>
// //           <div className="border-t-2 border-black w-52"></div>
// //           <p className="text-center mt-2">GM</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


