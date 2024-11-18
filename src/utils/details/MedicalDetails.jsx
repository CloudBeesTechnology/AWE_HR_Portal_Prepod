// // // import React from 'react';

// // // const MedicalDetails = ({ medicalInfo }) => {
// // //   console.log("depcy", medicalInfo.dependPass);

// // Check if dependPass exists and parse the data
// const parsedDependPass = medicalInfo.dependPass && Array.isArray(medicalInfo.dependPass)
//   ? medicalInfo.dependPass
//       .map(dependStr => {
//         // Check if each entry is a string and parse it
//         return typeof dependStr === 'string' ? JSON.parse(dependStr) : dependStr;
//       })
//       .flat()  // Flatten the array to remove the nested array layer
//   : [];

// console.log("Parsed DependPass after flattening:", parsedDependPass);  // Debugging

// // //   return (
// // //     <section className="py-8 bg-gray-50 rounded-lg">
// // //       <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
// // //         Medical Details:
// // //       </h6>
// // //       <div className="space-y-6">
// {/* Display other medical info */}
// <div className="grid grid-cols-3 gap-y-4 items-center">
//   {Object.entries(medicalInfo).map(([key, value], index) => {
//     // Skip dependPass as it's handled separately
//     if (key === "dependPass") return null;

//     return (
//       <React.Fragment key={index}>
//         <span className="text-gray-800">{key}</span>
//         <span className="text-gray-500 text-center">:</span>
//         <span className="text-gray-800">{value || "Null"}</span>
//       </React.Fragment>
//     );
//   })}
// </div>

// // //         {/* Check if dependPass is available and properly formatted */}
        // {parsedDependPass.length > 0 ? (
        //   parsedDependPass.map((depend, index) => (
        //     <div className="bg-white rounded-lg mb-4" key={index}>
        //       <h6 className="uppercase font-semibold text-lg text-gray-800 mb-4">
        //         DependPass Details {index + 1}:
        //       </h6>
        //       <div className="grid grid-cols-3 gap-y-2 items-center">
        //         <span className="text-gray-800">Labour DR No</span>
        //         <span className="text-gray-500 text-center">:</span>
        //         <span className="text-gray-800">{depend.labourDRNo || "N/A"}</span>

        //         <span className="text-gray-800 pr-2">Depend Name</span>
        //         <span className="text-gray-500 text-center">:</span>
        //         <span className="text-gray-800">{depend.dependName || "N/A"}</span>

        //         <span className="text-gray-800 pr-2">Labour D Amount</span>
        //         <span className="text-gray-500 text-center">:</span>
        //         <span className="text-gray-800">{depend.labourDAmount || "N/A"}</span>

        //         <span className="text-gray-800 pr-2">Depend PP No</span>
        //         <span className="text-gray-500 text-center">:</span>
        //         <span className="text-gray-800">{depend.dependPpNo || "N/A"}</span>

        //         <span className="text-gray-800 pr-2">Depend PP Expiry</span>
        //         <span className="text-gray-500 text-center">:</span>
        //         <span className="text-gray-800">{depend.dependPpE || "N/A"}</span>

        //         <span className="text-gray-800 pr-2">Labour DP By</span>
        //         <span className="text-gray-500 text-center">:</span>
        //         <span className="text-gray-800">{depend.labourDPBy || "N/A"}</span>

        //         <span className="text-gray-800 pr-2">Relation</span>
        //         <span className="text-gray-500 text-center">:</span>
        //         <span className="text-gray-800">{depend.relation || "N/A"}</span>
        //       </div>
        //     </div>
        //   ))
        // ) : (
        //   <p className="text-gray-500">No depend pass details available.</p>
        // )}
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default MedicalDetails;
// // import React, { useState } from "react";
// // import { Document, Page } from "react-pdf"; // For PDF viewing

// // const MedicalDetails = ({
// //   medicalInfo,
// //   uploadFitness,
// //   uploadBwn,
// //   uploadRegis,
// // }) => {
// //   const [isPdfOpen, setIsPdfOpen] = useState(false);
// //   const [viewingDocument, setViewingDocument] = useState(null);
// //   const [pageNumber, setPageNumber] = useState(1);
// //   const [numPages, setNumPages] = useState(1);

// //   // Check if dependPass exists and parse the data
// //   const parsedDependPass =
// //     medicalInfo.dependPass && Array.isArray(medicalInfo.dependPass)
// //       ? medicalInfo.dependPass
// //           .map((dependStr) => {
// //             return typeof dependStr === "string"
// //               ? JSON.parse(dependStr)
// //               : dependStr;
// //           })
// //           .flat() // Flatten the array to remove the nested array layer
// //       : [];

// //   const handleViewDocument = (url) => {
// //     setViewingDocument(url);
// //     setIsPdfOpen(true);
// //   };

// //   const handleCloseViewer = () => {
// //     setIsPdfOpen(false);
// //     setViewingDocument(null);
// //   };

// //   const onDocumentLoadSuccess = ({ numPages }) => {
// //     setNumPages(numPages);
// //   };

// //   return (
// //     <section className="py-8 bg-gray-50 rounded-lg">
// //       <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
// //         Medical Details:
// //       </h6>

// //       <div className="space-y-6">
// //         {/* Display other medical info */}
// //         <div className="grid grid-cols-3 gap-y-4 items-center">
// //           {Object.entries(medicalInfo).map(([key, value], index) => {
// //             // Skip dependPass as it's handled separately
// //             if (key === "dependPass") return null;

// //             return (
// //               <React.Fragment key={index}>
// //                 <span className="text-gray-800">{key}</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">{value || "Null"}</span>
// //               </React.Fragment>
// //             );
// //           })}
// //         </div>

// //         {/* Check if dependPass is available and properly formatted */}
// //         {parsedDependPass.length > 0 ? (
// //           parsedDependPass.map((depend, index) => (
// //             <div className="bg-white rounded-lg mb-4" key={index}>
// //               <h6 className="uppercase font-semibold text-lg text-gray-800 mb-4">
// //                 DependPass Details {index + 1}:
// //               </h6>
// //               <div className="grid grid-cols-3 gap-y-2 items-center">
// //                 <span className="text-gray-800">Labour DR No</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">
// //                   {depend.labourDRNo || "N/A"}
// //                 </span>

// //                 <span className="text-gray-800 pr-2">Depend Name</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">
// //                   {depend.dependName || "N/A"}
// //                 </span>

// //                 <span className="text-gray-800 pr-2">Labour D Amount</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">
// //                   {depend.labourDAmount || "N/A"}
// //                 </span>

// //                 <span className="text-gray-800 pr-2">Depend PP No</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">
// //                   {depend.dependPpNo || "N/A"}
// //                 </span>

// //                 <span className="text-gray-800 pr-2">Depend PP Expiry</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">
// //                   {depend.dependPpE || "N/A"}
// //                 </span>

// //                 <span className="text-gray-800 pr-2">Labour DP By</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">
// //                   {depend.labourDPBy || "N/A"}
// //                 </span>

// //                 <span className="text-gray-800 pr-2">Relation</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">
// //                   {depend.relation || "N/A"}
// //                 </span>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <p className="text-gray-500">No depend pass details available.</p>
// //         )}

// //         {/* Medical Document Upload Section */}
// //         <div>
// //           <h6 className="uppercase font-semibold text-lg text-gray-800 mb-4">
// //             Medical Document Uploads:
// //           </h6>

// //           {/* Fitness Document */}
// //           {uploadFitness && (
// //             <>
// //             <h1>Fitness Upload</h1>
// //               <button
// //                 onClick={() => handleViewDocument(uploadFitness)}
// //                 className="text-blue-600 hover:text-blue-800"
// //               >
// //                 View Fitness Document
// //               </button>
// //             </>
// //           )}

// //           {/* BW Document */}
// //           {uploadBwn && (
// //             <button
// //               onClick={() => handleViewDocument(uploadBwn)}
// //               className="text-blue-600 hover:text-blue-800 ml-4"
// //             >
// //               View BW Document
// //             </button>
// //           )}

// //           {/* Registration Document */}
// //           {uploadRegis && (
// //             <button
// //               onClick={() => handleViewDocument(uploadRegis)}
// //               className="text-blue-600 hover:text-blue-800 ml-4"
// //             >
// //               View Registration Document
// //             </button>
// //           )}
// //         </div>

// //         {/* PDF Viewer Modal */}
// //         {isPdfOpen && viewingDocument && (
// //           <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
// //             <div className="bg-white p-6 rounded-lg relative max-w-3xl w-full">
// //               <Document
// //                 file={viewingDocument}
// //                 onLoadSuccess={onDocumentLoadSuccess}
// //                 className="w-full"
// //               >
// //                 <Page
// //                   pageNumber={pageNumber}
// //                   className="border border-gray-300"
// //                 />
// //               </Document>
// //               <div className="mt-4 flex justify-between items-center">
// //                 <button
// //                   onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
// //                   className="text-gray-600"
// //                 >
// //                   Previous
// //                 </button>
// //                 <span>
// //                   Page {pageNumber} of {numPages}
// //                 </span>
// //                 <button
// //                   onClick={() =>
// //                     setPageNumber((prev) => Math.min(prev + 1, numPages))
// //                   }
// //                   className="text-gray-600"
// //                 >
// //                   Next
// //                 </button>
// //               </div>
// //               <button
// //                 onClick={handleCloseViewer}
// //                 className="absolute top-0 right-0 m-4 text-red-600"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default MedicalDetails;
// import React, { useState } from "react";
// import { Document, Page } from "react-pdf"; // For PDF viewing
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// const MedicalDetails = ({
//   medicalInfo,
//   uploadFitness,
//   uploadBwn,
//   uploadRegis,
//   documentsTwo
// }) => {
//   const [isPdfOpen, setIsPdfOpen] = useState(false); // Track if a PDF is open
//   const [viewingDocument, setViewingDocument] = useState(null); // Track which document is being viewed
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(1);

//   // Check if dependPass exists and parse the data
//   const parsedDependPass =
//     medicalInfo.dependPass && Array.isArray(medicalInfo.dependPass)
//       ? medicalInfo.dependPass
//           .map((dependStr) => {
//             return typeof dependStr === "string"
//               ? JSON.parse(dependStr)
//               : dependStr;
//           })
//           .flat() // Flatten the array to remove the nested array layer
//       : [];

//   const handleViewDocument = (docType) => {
//     setViewingDocument(docType); // Set the document to view
//     setIsPdfOpen(true); // Open the PDF viewer
//   };

//   const handleCloseViewer = () => {
//     setIsPdfOpen(false); // Close the PDF viewer
//     setViewingDocument(null); // Reset the document view state
//   };

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <section className="py-8 bg-gray-50 rounded-lg">
//       <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
//         Medical Details:
//       </h6>

//       <div className="space-y-6">
//         {/* Display other medical info */}
//         <div className="grid grid-cols-3 gap-y-4 items-center">
//           {Object.entries(medicalInfo).map(([key, value], index) => {
//             // Skip dependPass as it's handled separately
//             if (key === "dependPass") return null;

//             return (
//               <React.Fragment key={index}>
//                 <span className="text-gray-800">{key}</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-gray-800">{value || "Null"}</span>
//               </React.Fragment>
//             );
//           })}
//         </div>

//         {/* Check if dependPass is available and properly formatted */}
//         {parsedDependPass.length > 0 ? (
//           parsedDependPass.map((depend, index) => (
//             <div className="bg-white rounded-lg shadow-md mb-4 p-6 border border-gray-200" key={index}>
//               <h6 className="uppercase font-semibold text-lg text-gray-800 mb-4">
//                 DependPass Details {index + 1}:
//               </h6>
//               <div className="grid grid-cols-3 gap-y-2 items-center">
//                 <span className="text-gray-800">Labour DR No</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-gray-800">
//                   {depend.labourDRNo || "N/A"}
//                 </span>

//                 <span className="text-gray-800 pr-2">Depend Name</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-gray-800">
//                   {depend.dependName || "N/A"}
//                 </span>

//                 <span className="text-gray-800 pr-2">Labour D Amount</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-gray-800">
//                   {depend.labourDAmount || "N/A"}
//                 </span>

//                 <span className="text-gray-800 pr-2">Depend PP No</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-gray-800">
//                   {depend.dependPpNo || "N/A"}
//                 </span>

//                 <span className="text-gray-800 pr-2">Depend PP Expiry</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-gray-800">
//                   {depend.dependPpE || "N/A"}
//                 </span>

//                 <span className="text-gray-800 pr-2">Labour DP By</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-gray-800">
//                   {depend.labourDPBy || "N/A"}
//                 </span>

//                 <span className="text-gray-800 pr-2">Relation</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-gray-800">
//                   {depend.relation || "N/A"}
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No depend pass details available.</p>
//         )}

//         {/* Medical Document Upload Section */}
//         <div className="mt-8">
//           <h6 className="uppercase font-semibold text-lg text-gray-800 mb-4">
//             Medical Document Uploads:
//           </h6>

//           {/* Fitness Document */}
//           {uploadFitness && (
//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4">
//               <h6 className="font-semibold text-lg text-gray-800 mb-4">
//                 Fitness Document
//               </h6>
//               <button
//                 onClick={() => handleViewDocument("fitness")}
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 View Fitness Document
//               </button>

//               {/* PDF viewer and Pagination */}
//               {isPdfOpen && viewingDocument === "fitness" && (
//                 <div className="mt-4">
//                   <div className="relative">
//                     {/* PDF Viewer using react-pdf */}
//                     <Document
//                       file={uploadFitness}
//                       onLoadSuccess={onDocumentLoadSuccess}
//                       className="w-full"
//                     >
//                       <Page
//                         pageNumber={pageNumber}
//                         className="border border-gray-300"
//                       />
//                     </Document>

//                     {/* Pagination Controls */}
//                     <div className="mt-4 flex justify-between items-center">
//                       <button
//                         onClick={() => setPageNumber(pageNumber - 1)}
//                         disabled={pageNumber <= 1}
//                         className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
//                       >
//                         Prev
//                       </button>
//                       <span className="text-gray-700">
//                         Page {pageNumber} of {numPages}
//                       </span>
//                       <button
//                         onClick={() => setPageNumber(pageNumber + 1)}
//                         disabled={pageNumber >= numPages}
//                         className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
//                       >
//                         Next
//                       </button>
//                     </div>

//                     {/* Close Button */}
//                     <div className="absolute top-2 right-2">
//                       <button
//                         onClick={handleCloseViewer}
//                         className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>

//                   {/* Download Button */}
//                   <div className="mt-2">
//                     <a
//                       href={uploadFitness}
//                       download
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       Download Fitness Document
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* BW Document */}
//           {uploadBwn && (
//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4">
//               <h6 className="font-semibold text-lg text-gray-800 mb-4">
//                 BW Document
//               </h6>
//               <button
//                 onClick={() => handleViewDocument("bwn")}
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 View BW Document
//               </button>

//               {/* PDF viewer and Pagination */}
//               {isPdfOpen && viewingDocument === "bwn" && (
//                 <div className="mt-4">
//                   <div className="relative">
//                     {/* PDF Viewer using react-pdf */}
//                     <Document
//                       file={uploadBwn}
//                       onLoadSuccess={onDocumentLoadSuccess}
//                       className="w-full"
//                     >
//                       <Page
//                         pageNumber={pageNumber}
//                         className="border border-gray-300"
//                       />
//                     </Document>

//                     {/* Pagination Controls */}
//                     <div className="mt-4 flex justify-between items-center">
//                       <button
//                         onClick={() => setPageNumber(pageNumber - 1)}
//                         disabled={pageNumber <= 1}
//                         className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
//                       >
//                         Prev
//                       </button>
//                       <span className="text-gray-700">
//                         Page {pageNumber} of {numPages}
//                       </span>
//                       <button
//                         onClick={() => setPageNumber(pageNumber + 1)}
//                         disabled={pageNumber >= numPages}
//                         className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
//                       >
//                         Next
//                       </button>
//                     </div>

//                     {/* Close Button */}
//                     <div className="absolute top-2 right-2">
//                       <button
//                         onClick={handleCloseViewer}
//                         className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>

//                   {/* Download Button */}
//                   <div className="mt-2">
//                     <a
//                       href={uploadBwn}
//                       download
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       Download BW Document
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Registration Document */}
//           {uploadRegis && (
//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4">
//               <h6 className="font-semibold text-lg text-gray-800 mb-4">
//                 Registration Document
//               </h6>
//               <button
//                 onClick={() => handleViewDocument("regis")}
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 View Registration Document
//               </button>

//               {/* PDF viewer and Pagination */}
//               {isPdfOpen && viewingDocument === "regis" && (
//                 <div className="mt-4">
//                   <div className="relative">
//                     {/* PDF Viewer using react-pdf */}
//                     <Document
//                       file={uploadRegis}
//                       onLoadSuccess={onDocumentLoadSuccess}
//                       className="w-full"
//                     >
//                       <Page
//                         pageNumber={pageNumber}
//                         className="border border-gray-300"
//                       />
//                     </Document>

//                     {/* Pagination Controls */}
//                     <div className="mt-4 flex justify-between items-center">
//                       <button
//                         onClick={() => setPageNumber(pageNumber - 1)}
//                         disabled={pageNumber <= 1}
//                         className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
//                       >
//                         Prev
//                       </button>
//                       <span className="text-gray-700">
//                         Page {pageNumber} of {numPages}
//                       </span>
//                       <button
//                         onClick={() => setPageNumber(pageNumber + 1)}
//                         disabled={pageNumber >= numPages}
//                         className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
//                       >
//                         Next
//                       </button>
//                     </div>

//                     {/* Close Button */}
//                     <div className="absolute top-2 right-2">
//                       <button
//                         onClick={handleCloseViewer}
//                         className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>

//                   {/* Download Button */}
//                   <div className="mt-2">
//                     <a
//                       href={uploadRegis}
//                       download
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       Download Registration Document
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MedicalDetails;
import React, { useState } from "react";
import { Document, Page } from "react-pdf"; // For PDF viewing
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const MedicalDetails = ({
  medicalInfo,
  uploadFitness,
  uploadBwn,
  uploadRegis,
  handlePrint,
  invoiceRef
}) => {
  const [isPdfOpen, setIsPdfOpen] = useState(false); // Track if a PDF is open
  const [viewingDocument, setViewingDocument] = useState(null); // Track which document is being viewed
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(1);

  // Function to handle viewing a document
  const handleViewDocument = (docType) => {
    setViewingDocument(docType);
    setIsPdfOpen(true); // Open the PDF viewer
  };

  // Function to close the viewer
  const handleCloseViewer = () => {
    setIsPdfOpen(false);
    setViewingDocument(null);
  };

  // Function to handle document load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Helper function to get the first element from the array if it's an array
  const getValidUrl = (url) => {
    if (Array.isArray(url)) {
      return url[0]; // Extract the first URL from the array
    }
    return url; // Return the URL directly if it's not an array
  };

  // Check if dependPass exists and parse the data
  const parsedDependPass =
    medicalInfo.dependPass && Array.isArray(medicalInfo.dependPass)
      ? medicalInfo.dependPass
          .map((dependStr) => {
            // Check if each entry is a string and parse it
            return typeof dependStr === "string"
              ? JSON.parse(dependStr)
              : dependStr;
          })
          .flat() // Flatten the array to remove the nested array layer
      : [];

  console.log("Parsed DependPass after flattening:", parsedDependPass); // Debugging

  return (
    <>
    <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
      <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
        Medical Details:
      </h6>

      <div className="space-y-6">
        {/* Display other medical info */}
        <div className="grid grid-cols-3 gap-y-4 items-center">
          {Object.entries(medicalInfo).map(([key, value], index) => {
            // Skip dependPass as it's handled separately
            if (key === "dependPass") return null;

            return (
              <React.Fragment key={index}>
                <span className="text-gray-800">{key}</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{value || "Null"}</span>
              </React.Fragment>
            );
          })}
        </div>

        {/* Medical Document Upload Section */}
        <div className="mt-8">
          <h6 className="uppercase font-semibold text-lg text-gray-800 mb-4">
            Medical Document Uploads:
          </h6>

          {/* Fitness Document */}
          {uploadFitness && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4">
              <h6 className="font-semibold text-lg text-gray-800 mb-4">
                Fitness Document
              </h6>
              <button
                onClick={() => handleViewDocument("fitness")}
                className="text-blue-600 hover:text-blue-800"
              >
                View Fitness Document
              </button>

              {/* PDF viewer and Pagination */}
              {isPdfOpen && viewingDocument === "fitness" && (
                <div className="mt-4">
                  <div className="relative">
                    <Document
                      file={uploadFitness} // Ensure URL is valid
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="w-full"
                    >
                      <Page
                        pageNumber={pageNumber}
                        className="border border-gray-300"
                      />
                    </Document>

                    {/* Pagination Controls */}
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                        className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
                      >
                        Prev
                      </button>
                      <span className="text-gray-700">
                        Page {pageNumber} of {numPages}
                      </span>
                      <button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber >= numPages}
                        className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
                      >
                        Next
                      </button>
                    </div>

                    {/* Close Button */}
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={handleCloseViewer}
                        className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-2">
                    <a
                      href={uploadFitness}
                      download
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Download Fitness Document
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BW Document */}
          {uploadBwn && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4">
              <h6 className="font-semibold text-lg text-gray-800 mb-4">
                BW Document
              </h6>
              <button
                onClick={() => handleViewDocument("bwn")}
                className="text-blue-600 hover:text-blue-800"
              >
                View BW Document
              </button>

              {/* PDF viewer and Pagination */}
              {isPdfOpen && viewingDocument === "bwn" && (
                <div className="mt-4">
                  <div className="relative">
                    <Document
                      file={getValidUrl(uploadBwn)}  // Extract URL from array
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="w-full"
                    >
                      <Page
                        pageNumber={pageNumber}
                        className="border border-gray-300"
                      />
                    </Document>

                    {/* Pagination Controls */}
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                        className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
                      >
                        Prev
                      </button>
                      <span className="text-gray-700">
                        Page {pageNumber} of {numPages}
                      </span>
                      <button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber >= numPages}
                        className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
                      >
                        Next
                      </button>
                    </div>

                    {/* Close Button */}
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={handleCloseViewer}
                        className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-2">
                    <a
                      href={getValidUrl(uploadBwn)}
                      download
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Download BW Document
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Registration Document */}
          {uploadRegis && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4">
              <h6 className="font-semibold text-lg text-gray-800 mb-4">
                Registration Document
              </h6>
              <button
                onClick={() => handleViewDocument("regis")}
                className="text-blue-600 hover:text-blue-800"
              >
                View Registration Document
              </button>

              {/* PDF viewer and Pagination */}
              {isPdfOpen && viewingDocument === "regis" && (
                <div className="mt-4">
                  <div className="relative">
                    <Document
                      file={uploadRegis} // Ensure URL is valid
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="w-full"
                    >
                      <Page
                        pageNumber={pageNumber}
                        className="border border-gray-300"
                      />
                    </Document>

                    {/* Pagination Controls */}
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                        className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
                      >
                        Prev
                      </button>
                      <span className="text-gray-700">
                        Page {pageNumber} of {numPages}
                      </span>
                      <button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber >= numPages}
                        className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
                      >
                        Next
                      </button>
                    </div>

                    {/* Close Button */}
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={handleCloseViewer}
                        className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-2">
                    <a
                      href={uploadRegis}
                      download
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Download Registration Document
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {parsedDependPass.length > 0 ? (
          parsedDependPass.map((depend, index) => (
            <div className="bg-white rounded-lg mb-4" key={index}>
              <h6 className="uppercase font-semibold text-lg text-gray-800 mb-4">
                DependPass Details {index + 1}:
              </h6>
              <div className="grid grid-cols-3 gap-y-2 items-center">
                <span className="text-gray-800">Labour DR No</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{depend.labourDRNo || "N/A"}</span>

                <span className="text-gray-800 pr-2">Depend Name</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{depend.dependName || "N/A"}</span>

                <span className="text-gray-800 pr-2">Labour D Amount</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{depend.labourDAmount || "N/A"}</span>

                <span className="text-gray-800 pr-2">Depend PP No</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{depend.dependPpNo || "N/A"}</span>

                <span className="text-gray-800 pr-2">Depend PP Expiry</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{depend.dependPpE || "N/A"}</span>

                <span className="text-gray-800 pr-2">Labour DP By</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{depend.labourDPBy || "N/A"}</span>

                <span className="text-gray-800 pr-2">Relation</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{depend.relation || "N/A"}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No depend pass details available.</p>
        )}
      </div>
    </section>
    <div className="py-12 mt-2 flex justify-center">
        <button
          onClick={handlePrint}
          className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2"
        >
          Print
        </button>
      </div>
    </>
  );
};

export default MedicalDetails;
