// // // const DependPassDetails = ({ dependPass }) => {
// // //   console.log('Raw dependPass:', dependPass);

// // //   let dependData = [];

// // //   // Check if dependPass is an array and not empty
// // //   if (Array.isArray(dependPass) && dependPass.length > 0) {
// // //     // Log the raw data at index 0
// // //     console.log('dependPass[0]:', dependPass[0]);

// // //     // Check if the data at dependPass[0] is a stringified JSON array
// // //     if (typeof dependPass[0] === 'string') {
// // //       try {
// // //         // First, parse the string to remove escape characters
// // //         const parsedString = JSON.parse(dependPass[0]);

// // //         // Now parse the resulting string as JSON
// // //         dependData = JSON.parse(parsedString);

// // //         console.log('Parsed dependData:', dependData);
// // //       } catch (error) {
// // //         console.error('Error parsing dependPass:', error);
// // //       }
// // //     } else {
// // //       // If it's already an array, assign directly
// // //       dependData = dependPass[0];
// // //     }
// // //   } else {
// // //     console.error('dependPass is not a valid array or is empty:', dependPass);
// // //   }

// // //   console.log('Final dependData:', dependData);

// // //   if (!Array.isArray(dependData)) {
// // //     return <p>There was an error processing the dependent data.</p>;
// // //   }

// // //   return (
// // //     <div>
// // //       <h2>Dependents' Passport Details</h2>
// // //       {dependData.length === 0 ? (
// // //         <p>No dependent data available.</p>
// // //       ) : (
// // //         dependData.map((depend, index) => (
// // //           <div key={index} className="depend-detail">
// // //             <h3>{depend.dependName}</h3>
// // //             <p><strong>Passport No:</strong> {depend.dependPpNo}</p>
// // //             <p><strong>Passport Expiry:</strong> {depend.dependPpE}</p>
// // //             <p><strong>Relation:</strong> {depend.relation}</p>
// // //             <p><strong>Labour DP By:</strong> {depend.labourDPBy}</p>
// // //             <p><strong>Labour DR No:</strong> {depend.labourDRNo}</p>
// // //             <p><strong>Labour DA Amount:</strong> {depend.labourDAmount}</p>

// // //             <div className="uploads">
// // //               <h4>Uploaded Documents (DP):</h4>
// // //               {depend.uploadDp && depend.uploadDp.map((upload, idx) => (
// // //                 <div key={idx}>
// // //                   <a href={upload.upload} target="_blank" rel="noopener noreferrer">
// // //                     {`Document ${idx + 1} (Uploaded on ${upload.date})`}
// // //                   </a>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             <div className="uploads">
// // //               <h4>Uploaded Documents (DR):</h4>
// // //               {depend.uploadDr && depend.uploadDr.map((upload, idx) => (
// // //                 <div key={idx}>
// // //                   <a href={upload.upload} target="_blank" rel="noopener noreferrer">
// // //                     {`Document ${idx + 1} (Uploaded on ${upload.date})`}
// // //                   </a>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             <p><strong>Status:</strong> {depend.isNew ? 'New' : 'Old'}</p>
// // //           </div>
// // //         ))
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DependPassDetails;


// // import { Document, Page } from "react-pdf";
// // import "react-pdf/dist/esm/Page/TextLayer.css";
// // import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// // const DependPassDetails = ({ dependPass }) => {
// //   console.log('Raw dependPass:', dependPass);

// //   let dependData = [];

// //   // Check if dependPass is an array and not empty
// //   if (Array.isArray(dependPass) && dependPass.length > 0) {
// //     // Log the raw data at index 0
// //     console.log('dependPass[0]:', dependPass[0]);

// //     // Check if the data at dependPass[0] is a stringified JSON array
// //     if (typeof dependPass[0] === 'string') {
// //       try {
// //         // First, parse the string to remove escape characters
// //         const parsedString = JSON.parse(dependPass[0]);

// //         // Now parse the resulting string as JSON
// //         dependData = JSON.parse(parsedString);

// //         console.log('Parsed dependData:', dependData);
// //       } catch (error) {
// //         console.error('Error parsing dependPass:', error);
// //       }
// //     } else {
// //       // If it's already an array, assign directly
// //       dependData = dependPass[0];
// //     }
// //   } else {
// //     console.error('dependPass is not a valid array or is empty:', dependPass);
// //   }

// //   console.log('Final dependData:', dependData);

// //   if (!Array.isArray(dependData)) {
// //     return <p>There was an error processing the dependent data.</p>;
// //   }

// //   return (
// //     <div>
// //       <h2>Dependents' Passport Details</h2>
// //       {dependData.length === 0 ? (
// //         <p>No dependent data available.</p>
// //       ) : (
// //         dependData.map((depend, index) => (
// //           <div key={index} className="depend-detail">
// //             <h3>{depend.dependName}</h3>
// //             <p><strong>Passport No:</strong> {depend.dependPpNo}</p>
// //             <p><strong>Passport Expiry:</strong> {depend.dependPpE}</p>
// //             <p><strong>Relation:</strong> {depend.relation}</p>
// //             <p><strong>Labour DP By:</strong> {depend.labourDPBy}</p>
// //             <p><strong>Labour DR No:</strong> {depend.labourDRNo}</p>
// //             <p><strong>Labour DA Amount:</strong> {depend.labourDAmount}</p>

// //             <div className="uploads">
// //               <h4>Uploaded Documents (DP):</h4>
// //               {depend.uploadDp && depend.uploadDp.map((upload, idx) => (
// //                 <div key={idx}>
// //                   {upload.upload.endsWith('.pdf') ? (
// //                     <div>
// //                       <p>{`Document ${idx + 1} (Uploaded on ${upload.date})`}</p>
// //                       <Document file={upload.upload}>
// //                         <Page pageNumber={1} />
// //                       </Document>
// //                     </div>
// //                   ) : (
// //                     <div>
// //                       <a href={upload.upload} target="_blank" rel="noopener noreferrer">
// //                         {`Document ${idx + 1} (Uploaded on ${upload.date})`}
// //                       </a>
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="uploads">
// //               <h4>Uploaded Documents (DR):</h4>
// //               {depend.uploadDr && depend.uploadDr.map((upload, idx) => (
// //                 <div key={idx}>
// //                   {upload.upload.endsWith('.pdf') ? (
// //                     <div>
// //                       <p>{`Document ${idx + 1} (Uploaded on ${upload.date})`}</p>
// //                       <Document file={upload.upload}>
// //                         <Page pageNumber={1} />
// //                       </Document>
// //                     </div>
// //                   ) : (
// //                     <div>
// //                       <a href={upload.upload} target="_blank" rel="noopener noreferrer">
// //                         {`Document ${idx + 1} (Uploaded on ${upload.date})`}
// //                       </a>
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>

// //             <p><strong>Status:</strong> {depend.isNew ? 'New' : 'Old'}</p>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // };

// // export default DependPassDetails;
// import { Document, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import { useState } from "react";

// const DependPassDetails = ({ dependPass }) => {
//   console.log('Raw dependPass:', dependPass);

//   let dependData = [];

//   // Check if dependPass is an array and not empty
//   if (Array.isArray(dependPass) && dependPass.length > 0) {
//     console.log('dependPass[0]:', dependPass[0]);

//     if (typeof dependPass[0] === 'string') {
//       try {
//         const parsedString = JSON.parse(dependPass[0]);
//         dependData = JSON.parse(parsedString);
//         console.log('Parsed dependData:', dependData);
//       } catch (error) {
//         console.error('Error parsing dependPass:', error);
//       }
//     } else {
//       dependData = dependPass[0];
//     }
//   } else {
//     console.error('dependPass is not a valid array or is empty:', dependPass);
//   }

//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pdfDocument, setPdfDocument] = useState(null);

//   const handlePdfClick = (upload) => {
//     setModalOpen(true);
//     setPdfDocument(upload.upload);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//     setPdfDocument(null);
//   };

//   const handleDownload = (upload) => {
//     const link = document.createElement('a');
//     link.href = upload.upload;
//     link.download = upload.upload.split('/').pop();
//     link.click();
//   };

//   const changePage = (direction) => {
//     if (direction === "next" && currentPage < 5) {
//       setCurrentPage(prevPage => prevPage + 1);
//     } else if (direction === "prev" && currentPage > 1) {
//       setCurrentPage(prevPage => prevPage - 1);
//     }
//   };

//   if (!Array.isArray(dependData)) {
//     return <p>There was an error processing the dependent data.</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">Dependents' Passport Details</h2>
//       {dependData.length === 0 ? (
//         <p>No dependent data available.</p>
//       ) : (
//         dependData.map((depend, index) => (
//           <div key={index} className="mb-8 p-4 border rounded-lg shadow-md bg-white">
//             <h3 className="text-xl font-semibold">{depend.dependName}</h3>
//             <p><strong>Passport No:</strong> {depend.dependPpNo}</p>
//             <p><strong>Passport Expiry:</strong> {depend.dependPpE}</p>
//             <p><strong>Relation:</strong> {depend.relation}</p>
//             <p><strong>Labour DP By:</strong> {depend.labourDPBy}</p>
//             <p><strong>Labour DR No:</strong> {depend.labourDRNo}</p>
//             <p><strong>Labour DA Amount:</strong> {depend.labourDAmount}</p>

//             <div className="uploads mt-4">
//               <h4 className="text-lg font-semibold mb-2">Uploaded Documents (DP):</h4>
//               {depend.uploadDp && depend.uploadDp.map((upload, idx) => (
//                 <div key={idx} className="upload-item mb-4">
//                   {upload.upload.endsWith('.pdf') ? (
//                     <div>
//                       <p>{`Document ${idx + 1} (Uploaded on ${upload.date})`}</p>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
//                         onClick={() => handlePdfClick(upload)}
//                       >
//                         View Document
//                       </button>
//                       <button
//                         className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                         onClick={() => handleDownload(upload)}
//                       >
//                         Download Document
//                       </button>
//                     </div>
//                   ) : (
//                     <div>
//                       <a href={upload.upload} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                         {`Document ${idx + 1} (Uploaded on ${upload.date})`}
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="uploads mt-4">
//               <h4 className="text-lg font-semibold mb-2">Uploaded Documents (DR):</h4>
//               {depend.uploadDr && depend.uploadDr.map((upload, idx) => (
//                 <div key={idx} className="upload-item mb-4">
//                   {upload.upload.endsWith('.pdf') ? (
//                     <div>
//                       <p>{`Document ${idx + 1} (Uploaded on ${upload.date})`}</p>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
//                         onClick={() => handlePdfClick(upload)}
//                       >
//                         View Document
//                       </button>
//                       <button
//                         className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                         onClick={() => handleDownload(upload)}
//                       >
//                         Download Document
//                       </button>
//                     </div>
//                   ) : (
//                     <div>
//                       <a href={upload.upload} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                         {`Document ${idx + 1} (Uploaded on ${upload.date})`}
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <p><strong>Status:</strong> {depend.isNew ? 'New' : 'Old'}</p>
//           </div>
//         ))
//       )}

//       {/* Modal for PDF Display */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg relative w-4/5 max-w-3xl">
//             <button
//               className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-md"
//               onClick={handleModalClose}
//             >
//               Close
//             </button>
//             <div className="pdf-container">
//               <Document file={pdfDocument}>
//                 <Page pageNumber={currentPage} />
//               </Document>
//               <div className="pagination mt-4 flex justify-center items-center space-x-4">
//                 <button
//                   onClick={() => changePage('prev')}
//                   disabled={currentPage <= 1}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:bg-gray-300"
//                 >
//                   Prev
//                 </button>
//                 <span className="text-lg">Page {currentPage}</span>
//                 <button
//                   onClick={() => changePage('next')}
//                   disabled={currentPage >= 5}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:bg-gray-300"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DependPassDetails;
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const DependPassDetails = ({ dependPass }) => {
  const [viewingDocument, setViewingDocument] = useState(null); // Document URL or file being viewed
  const [pageNumber, setPageNumber] = useState(1); // For paginated PDF documents
  const [numPages, setNumPages] = useState(null); // Total pages in the document

  // Function to handle document loading success (for pagination)
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1); // Reset to first page when a new document is loaded
  };

  const handleDocumentClick = (document) => {
    // Toggle visibility of the document
    setViewingDocument(viewingDocument === document.upload ? null : document.upload);
  };

  let dependData = [];

  // Check if dependPass is an array and not empty
  if (Array.isArray(dependPass) && dependPass.length > 0) {
    // Check if the data at dependPass[0] is a stringified JSON array
    if (typeof dependPass[0] === "string") {
      try {
        // Parse the string to remove escape characters
        const parsedString = JSON.parse(dependPass[0]);
        // Now parse the resulting string as JSON
        dependData = JSON.parse(parsedString);
      } catch (error) {
        console.error("Error parsing dependPass:", error);
      }
    } else {
      dependData = dependPass[0];
    }
  }

  if (!Array.isArray(dependData)) {
    return <p>There was an error processing the dependent data.</p>;
  }

  const renderDocumentsUnderCategory = (documents) => {
    return (
      <>
        {documents.map((document, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Uploaded on: {document.date}</span>
              <button
                onClick={() => handleDocumentClick(document)} // Trigger the viewing document logic
                className="text-blue-600 hover:text-blue-800"
              >
                {viewingDocument === document.upload ? "Close Document" : "View Document"}
              </button>
            </div>

            {/* Render the document viewer */}
            {viewingDocument === document.upload && (
              <div className="mt-4">
                {/* Close Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setViewingDocument(null)} // Close the viewer
                    className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-800"
                  >
                    &times; {/* Close icon */}
                  </button>
                </div>

                {/* PDF or Image Viewer */}
                {viewingDocument.endsWith(".pdf") ? (
                  <div className="relative">
                    <Document
                      file={viewingDocument}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="w-full"
                    >
                      <Page pageNumber={pageNumber} className="mx-auto" />
                    </Document>

                    {/* Pagination Controls */}
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-800"
                      >
                        Previous
                      </button>
                      <span className="text-gray-700">
                        Page {pageNumber} of {numPages}
                      </span>
                      <button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber >= numPages}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-800"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <img
                    src={viewingDocument}
                    alt="Document Preview"
                    className="w-full h-auto"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <section className="py-8 bg-gray-50 rounded-lg">
      <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
        Dependents' Passport Details:
      </h6>
      {dependData.length === 0 ? (
        <p>No dependent data available.</p>
      ) : (
        dependData.map((depend, index) => (
          <div key={index} className="depend-detail mb-6 p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-2xl font-semibold text-gray-800">{depend.dependName}</h3>
            <p><strong>Passport No:</strong> {depend.dependPpNo}</p>
            <p><strong>Passport Expiry:</strong> {depend.dependPpE}</p>
            <p><strong>Relation:</strong> {depend.relation}</p>
            <p><strong>Labour DP By:</strong> {depend.labourDPBy}</p>
            <p><strong>Labour DR No:</strong> {depend.labourDRNo}</p>
            <p><strong>Labour DA Amount:</strong> {depend.labourDAmount}</p>

            {/* Uploaded Documents (DP) */}
            <div className="uploads">
              <h4 className="text-xl font-semibold text-gray-800 mt-4">Uploaded Documents (DP):</h4>
              {depend.uploadDp && depend.uploadDp.length > 0 ? (
                renderDocumentsUnderCategory(depend.uploadDp)
              ) : (
                <p>No documents uploaded for DP.</p>
              )}
            </div>

            {/* Uploaded Documents (DR) */}
            <div className="uploads mt-6">
              <h4 className="text-xl font-semibold text-gray-800">Uploaded Documents (DR):</h4>
              {depend.uploadDr && depend.uploadDr.length > 0 ? (
                renderDocumentsUnderCategory(depend.uploadDr)
              ) : (
                <p>No documents uploaded for DR.</p>
              )}
            </div>

            <p><strong>Status:</strong> {depend.isNew ? 'New' : 'Old'}</p>
          </div>
        ))
      )}
    </section>
  );
};

export default DependPassDetails;
