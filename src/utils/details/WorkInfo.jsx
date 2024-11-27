// // import React from "react";
// // import { Document, Page } from "react-pdf";
// // import "react-pdf/dist/esm/Page/TextLayer.css";
// // import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// // import { FaTimes } from "react-icons/fa";

// // const WorkInfo = ({
// //   workInfo,
// //   documentThree,
// //   isPdfOpen,
// //   viewingDocument,
// //   pageNumber,
// //   numPages,
// //   handleViewDocument,
// //   handleCloseViewer,
// //   onDocumentLoadSuccess,
// //   setPageNumber,
// //   //this is pdf section
// //   uploadAL,
// //   uploadDep,
// //   uploadLP,
// //   uploadPR,
// //   uploadSP,
// //   invoiceRef
// // }) => {

// //         // Helper function to get the first element from the array if it's an array
// //   const getValidUrl = (url) => {
// //     if (Array.isArray(url)) {
// //       return url[0]; // Extract the first URL from the array
// //     }
// //     return url; // Return the URL directly if it's not an array
// //   };

// //   // Helper function to check if the value is "empty"
// //   const isEmpty = (value) => {
// //     if (Array.isArray(value)) {
// //       return value.length === 0 || value.every((item) => item === "");
// //     }
// //     return value === null || value === undefined || value === "";
// //   };

// //   // Helper function to get valid value or "N/A"
// //   const getValidValue = (value) => {
// //     return isEmpty(value) ? "N/A" : value;
// //   };
  
// //   return (
// //     <>
// //     <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
// //       <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
// //         Work Info Details:
// //       </h6>
// //       <div className="space-y-6">
// //         {/* Accommodation Details */}
// //         <div>
// //           <h6 className="text-lg font-semibold text-dark_grey mb-4">
// //             Employee Details:
// //           </h6>
// //           <div className="grid grid-cols-3 gap-y-4 items-center">
// //             {Object.entries(workInfo.employeeDetails).map(
// //               ([key, value], index) => (
// //                 <React.Fragment key={index}>
// //                   <span className="text-gray-800">{key}</span>
// //                   <span className="text-gray-500 text-center">:</span>
// //                   <span className="text-gray-800">{getValidValue(value)}</span>
// //                 </React.Fragment>
// //               )
// //             )}
// //           </div>
// //         </div>

// //         <div>
// //           <h6 className="text-lg font-semibold text-dark_grey mb-4">
// //             Leave Details:
// //           </h6>
// //           <div className="grid grid-cols-3 gap-y-4 items-center">
// //             {Object.entries(workInfo.LeaveDetails).map(
// //               ([key, value], index) => (
// //                 <React.Fragment key={index}>
// //                   <span className="text-gray-800">{key}</span>
// //                   <span className="text-gray-500 text-center">:</span>
// //                   <span className="text-gray-800">{getValidValue(value)}</span>
// //                 </React.Fragment>
// //               )
// //             )}
// //           </div>
// //         </div>
// //         <div>
// //           <h6 className="text-lg font-semibold text-dark_grey mb-4">
// //             Employee Exit Details Details:
// //           </h6>
// //           <div className="grid grid-cols-3 gap-y-4 items-center">
// //             {Object.entries(workInfo.TerminateDetails).map(
// //               ([key, value], index) => (
// //                 <React.Fragment key={index}>
// //                   <span className="text-gray-800">{key}</span>
// //                   <span className="text-gray-500 text-center">:</span>
// //                   <span className="text-gray-800">{value || "N/A"}</span>
// //                 </React.Fragment>
// //               )
// //             )}
// //           </div>
// //           <div className="mt-8">
// //         <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
// //           Employee Documents:
// //         </h6>
// //         <div className="space-y-6">
// //           {Object.keys(documentThree).length > 0 ? (
// //             Object.entries(documentThree).map(([label, url], index) => (
// //               <div
// //                 key={index}
// //                 className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
// //               >
// //                 <h6 className="font-semibold text-lg text-gray-800 mb-4">
// //                   {label}
// //                 </h6>
// //                 <button
// //                   onClick={() => handleViewDocument(url)}
// //                   className="text-blue-600 hover:text-blue-800"
// //                 >
// //                   View Document
// //                 </button>

// //                 {/* PDF Viewer */}
// //                 {isPdfOpen && viewingDocument === url && (
// //                   <div className="mt-4">
// //                     <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
// //                       <Document
// //                         file={getValidUrl(url)}
// //                         onLoadSuccess={onDocumentLoadSuccess}
// //                         className="w-full"
// //                       >
// //                         <Page
// //                           pageNumber={pageNumber}
// //                           className="border border-gray-300 mx-auto"
// //                         />
// //                       </Document>

// //                       <div className="mt-4 flex justify-between items-center">
// //                         <button
// //                           onClick={() =>
// //                             setPageNumber((prev) => Math.max(prev - 1, 1))
// //                           }
// //                           className="text-gray-600"
// //                         >
// //                           Previous
// //                         </button>
// //                         <span>
// //                           Page {pageNumber} of {numPages}
// //                         </span>
// //                         <button
// //                           onClick={() =>
// //                             setPageNumber((prev) =>
// //                               Math.min(prev + 1, numPages)
// //                             )
// //                           }
// //                           className="text-gray-600"
// //                         >
// //                           Next
// //                         </button>
// //                       </div>

// //                       <button
// //                         onClick={handleCloseViewer}
// //                         className="absolute top-2 right-2 text-2xl text-red-600 hover:text-red-800"
// //                       >
// //                         <FaTimes /> {/* Close icon */}
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ))
// //           ) : (
// //             <p>No documents available</p>
// //           )}
// //         </div>
// //       </div>
// //         </div>
// //         <div>
// //           <h6 className="text-lg font-semibold text-dark_grey mb-4">
// //             Employee Service Record Details:
// //           </h6>
// //           <div className="grid grid-cols-3 gap-y-4 items-center">
// //             {Object.entries(workInfo.ServiceRoad).map(([key, value], index) => (
// //               <React.Fragment key={index}>
// //                 <span className="text-gray-800">{key}</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">{getValidValue(value)}</span>
// //               </React.Fragment>
// //             ))}
// //           </div>
// //           <div className="mt-8">
// //             <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
// //               Service Record Documents:
// //             </h6>
// //             <div className="space-y-6">
// //               {/* Render each PDF under Employee Service Record */}
// //               {[uploadAL, uploadDep, uploadLP, uploadPR, uploadSP].map(
// //                 (doc, index) =>
// //                   doc && (
// //                     <div
// //                       key={index}
// //                       className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
// //                     >
// //                       <h6 className="font-semibold text-lg text-gray-800 mb-4">
// //                         Service Record Document {index + 1}
// //                       </h6>
// //                       <button
// //                         onClick={() => handleViewDocument(doc)}
// //                         className="text-blue-600 hover:text-blue-800"
// //                       >
// //                         View Document
// //                       </button>

// //                       {/* PDF Viewer */}
// //                       {isPdfOpen && viewingDocument === doc && (
// //                         <div className="mt-4">
// //                           <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
// //                             <Document
// //                               file={getValidUrl(doc)}
// //                               onLoadSuccess={onDocumentLoadSuccess}
// //                               className="w-full"
// //                             >
// //                               <Page
// //                                 pageNumber={pageNumber}
// //                                 className="border border-gray-300 mx-auto"
// //                               />
// //                             </Document>

// //                             <div className="mt-4 flex justify-between items-center">
// //                               <button
// //                                 onClick={() =>
// //                                   setPageNumber((prev) => Math.max(prev - 1, 1))
// //                                 }
// //                                 className="text-gray-600"
// //                               >
// //                                 Previous
// //                               </button>
// //                               <span>
// //                                 Page {pageNumber} of {numPages}
// //                               </span>
// //                               <button
// //                                 onClick={() =>
// //                                   setPageNumber((prev) =>
// //                                     Math.min(prev + 1, numPages)
// //                                   )
// //                                 }
// //                                 className="text-gray-600"
// //                               >
// //                                 Next
// //                               </button>
// //                             </div>

// //                             <button
// //                               onClick={handleCloseViewer}
// //                               className="absolute top-2 right-2 text-2xl text-red-600 hover:text-red-800"
// //                             >
// //                               <FaTimes /> {/* Close icon */}
// //                             </button>
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   )
// //               )}
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   </>
// //   );
// // };
// // //Employee Service Record

// // export default WorkInfo;
// import React, { useState } from "react";
// import { Document, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import { FaTimes } from "react-icons/fa";

// const WorkInfo = ({
//   workInfo,
//   documentThree,
//   isPdfOpen,
//   viewingDocument,
//   pageNumber,
//   numPages,
//   handleViewDocument,
//   handleCloseViewer,
//   onDocumentLoadSuccess,
//   setPageNumber,

//   //this is for Employee Exit Documents
//   WIContract,
//   WILeaveEntitle,
//   WIProbation,
//   WIResignation,
//   WITermination,

//   //this is for  Service Record Documents:
//   uploadAL,
//   uploadDep,
//   uploadLP,
//   uploadPR,
//   uploadSP,
//   invoiceRef
// }) => {

//   // Helper function to get the first element from the array if it's an array
//   const getValidUrl = (url) => {
//     if (Array.isArray(url)) {
//       return url[0]; // Extract the first URL from the array
//     }
//     return url; // Return the URL directly if it's not an array
//   };

//   // Helper function to check if the value is "empty"
//   const isEmpty = (value) => {
//     if (Array.isArray(value)) {
//       return value.length === 0 || value.every((item) => item === "");
//     }
//     return value === null || value === undefined || value === "";
//   };

//   // Helper function to get valid value or "N/A"
//   const getValidValue = (value) => {
//     return isEmpty(value) ? "N/A" : value;
//   };

//   return (
//     <>
//       <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
//         <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
//           Work Info Details:
//         </h6>
//         <div className="space-y-6">
//           {/* Accommodation Details */}
//           <div>
//             <h6 className="text-lg font-semibold text-dark_grey mb-4">
//               Employee Details:
//             </h6>
//             <div className="grid grid-cols-3 gap-y-4 items-center">
//               {Object.entries(workInfo.employeeDetails).map(
//                 ([key, value], index) => (
//                   <React.Fragment key={index}>
//                     <span className="text-gray-800">{key}</span>
//                     <span className="text-gray-500 text-center">:</span>
//                     <span className="text-gray-800">{getValidValue(value)}</span>
//                   </React.Fragment>
//                 )
//               )}
//             </div>
//           </div>

//           <div>
//             <h6 className="text-lg font-semibold text-dark_grey mb-4">
//               Leave Details:
//             </h6>
//             <div className="grid grid-cols-3 gap-y-4 items-center">
//               {Object.entries(workInfo.LeaveDetails).map(
//                 ([key, value], index) => (
//                   <React.Fragment key={index}>
//                     <span className="text-gray-800">{key}</span>
//                     <span className="text-gray-500 text-center">:</span>
//                     <span className="text-gray-800">{getValidValue(value)}</span>
//                   </React.Fragment>
//                 )
//               )}
//             </div>
//           </div>

//           <div>
//             <h6 className="text-lg font-semibold text-dark_grey mb-4">
//               Employee Exit Details:
//             </h6>
//             <div className="grid grid-cols-3 gap-y-4 items-center">
//               {Object.entries(workInfo.TerminateDetails).map(
//                 ([key, value], index) => (
//                   <React.Fragment key={index}>
//                     <span className="text-gray-800">{key}</span>
//                     <span className="text-gray-500 text-center">:</span>
//                     <span className="text-gray-800">{value || "N/A"}</span>
//                   </React.Fragment>
//                 )
//               )}
//             </div>
//           </div>

//           {/* PDF Documents Section */}
//           <div className="mt-8">
//             <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
//               Employee Exit Documents:
//             </h6>
//             <div className="space-y-6">
//               {Object.keys(documentThree).length > 0 ? (
//                 Object.entries(documentThree).map(([label, url], index) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
//                   >
//                     <h6 className="font-semibold text-lg text-gray-800 mb-4">
//                       {label}
//                     </h6>
//                     <button
//                       onClick={() => handleViewDocument(url)}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       View Document
//                     </button>

//                     {/* PDF Viewer */}
//                     {isPdfOpen && viewingDocument === url && (
//                       <div className="mt-4">
//                         <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
//                           <Document
//                             file={getValidUrl(url)}
//                             onLoadSuccess={onDocumentLoadSuccess}
//                             onLoadError={(error) => console.error("Error loading PDF", error)}
//                             className="w-full"
//                           >
//                             <Page
//                               pageNumber={pageNumber}
//                               className="border border-gray-300 mx-auto"
//                             />
//                           </Document>

//                           <div className="mt-4 flex justify-between items-center">
//                             <button
//                               onClick={() =>
//                                 setPageNumber((prev) => Math.max(prev - 1, 1))
//                               }
//                               className="text-gray-600"
//                             >
//                               Previous
//                             </button>
//                             <span>
//                               Page {pageNumber} of {numPages}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 setPageNumber((prev) =>
//                                   Math.min(prev + 1, numPages)
//                                 )
//                               }
//                               className="text-gray-600"
//                             >
//                               Next
//                             </button>
//                           </div>

//                           <button
//                             onClick={handleCloseViewer}
//                             className="absolute top-2 right-2 text-2xl text-red-600 hover:text-red-800"
//                           >
//                             <FaTimes /> {/* Close icon */}
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p>No documents available</p>
//               )}
//             </div>
//           </div>

//           {/* Service Record Section */}
//           <div>
//             <h6 className="text-lg font-semibold text-dark_grey mb-4">
//               Employee Service Record Details:
//             </h6>
//             <div className="grid grid-cols-3 gap-y-4 items-center">
//               {Object.entries(workInfo.ServiceRoad).map(([key, value], index) => (
//                 <React.Fragment key={index}>
//                   <span className="text-gray-800">{key}</span>
//                   <span className="text-gray-500 text-center">:</span>
//                   <span className="text-gray-800">{getValidValue(value)}</span>
//                 </React.Fragment>
//               ))}
//             </div>

//             <div className="mt-8">
//               <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
//                 Service Record Documents:
//               </h6>
//               <div className="space-y-6">
//                 {[uploadAL, uploadDep, uploadLP, uploadPR, uploadSP].map(
//                   (doc, index) =>
//                     doc && (
//                       <div
//                         key={index}
//                         className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
//                       >
//                         <h6 className="font-semibold text-lg text-gray-800 mb-4">
//                           Service Record Document {index + 1}
//                         </h6>
//                         <button
//                           onClick={() => handleViewDocument(doc)}
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           View Document
//                         </button>

//                         {/* PDF Viewer */}
//                         {isPdfOpen && viewingDocument === doc && (
//                           <div className="mt-4">
//                             <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
//                               <Document
//                                 file={getValidUrl(doc)}
//                                 onLoadSuccess={onDocumentLoadSuccess}
//                                 onLoadError={(error) => console.error("Error loading PDF", error)}
//                                 className="w-full"
//                               >
//                                 <Page
//                                   pageNumber={pageNumber}
//                                   className="border border-gray-300 mx-auto"
//                                 />
//                               </Document>

//                               <div className="mt-4 flex justify-between items-center">
//                                 <button
//                                   onClick={() =>
//                                     setPageNumber((prev) => Math.max(prev - 1, 1))
//                                   }
//                                   className="text-gray-600"
//                                 >
//                                   Previous
//                                 </button>
//                                 <span>
//                                   Page {pageNumber} of {numPages}
//                                 </span>
//                                 <button
//                                   onClick={() =>
//                                     setPageNumber((prev) => Math.min(prev + 1, numPages))
//                                   }
//                                   className="text-gray-600"
//                                 >
//                                   Next
//                                 </button>
//                               </div>

//                               <button
//                                 onClick={handleCloseViewer}
//                                 className="absolute top-2 right-2 text-2xl text-red-600 hover:text-red-800"
//                               >
//                                 <FaTimes /> {/* Close icon */}
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default WorkInfo;
import React, { useState, useRef } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa"; // Import "X" icon from react-icons
import { useReactToPrint } from "react-to-print";

const WorkInfo = ({
  workInfo,
  isPdfOpen,
  pageNumber,
  numPages,
  handleViewDocument,
  onDocumentLoadSuccess,
  setPageNumber,
  WIContract,
  WILeaveEntitle,
  WIProbation,
  WIResignation,
  WITermination,
  uploadAL,
  uploadDep,
  uploadLP,
  uploadPR,
  uploadSP,
  invoiceRef,
}) => {
  const [viewingDocument, setViewingDocument] = useState(null); // State to store the currently viewed document URL

  // Helper function to parse and safely handle data
  const parseDocuments = (docData) => {
    try {
      const parsedData = JSON.parse(docData);  // Parse document data
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error("Error parsing document data:", error);
      return [];
    }
  };

  // Function to handle closing the viewer
  const handleCloseViewerFunction = () => {
    setViewingDocument(null); // Close the viewer by setting the state to null
  };

  // Function to render documents under a single category
  const renderDocumentsUnderCategory = (documents, documentName) => {
    return (
      <>
        {documents.map((document, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-700">
                Uploaded on: {document.date}
              </span>
              <button
                onClick={() => setViewingDocument(document.upload)} // Set the document URL when clicked
                className="text-blue-600 hover:text-blue-800"
              >
                View Document
              </button>
            </div>

            {/* Conditional rendering of PDF or image */}
            {viewingDocument === document.upload &&
              document.upload.endsWith(".pdf") && (
                <div className="mt-4">
                  <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
                    {/* PDF Viewer using react-pdf */}
                    <div ref={invoiceRef} className="flex justify-center">
                      <div>
                        <Document
                          file={document.upload}
                          onLoadSuccess={onDocumentLoadSuccess}
                          className="w-full"
                        >
                          <Page pageNumber={pageNumber} className=" mx-auto" />
                        </Document>
                      </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                        className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
                      >
                        Previous
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
                        onClick={handleCloseViewerFunction}
                        className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                      >
                        <FaTimes /> {/* Close icon */}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6 py-4">
                    <div className="mt-2 flex">
                      <button className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2">
                        <a href={document.upload} download>
                          Download
                        </a>
                        <FaDownload className="ml-2 mt-1" />
                      </button>
                    </div>
                    {/* Print Button */}
                    <div className="mt-2 flex">
                      <button
                        onClick={() => useReactToPrint()}
                        className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
                      >
                        Print
                        <FaPrint className="ml-2 mt-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            {/* Image Viewer */}
            {viewingDocument === document.upload &&
              !document.upload.endsWith(".pdf") && (
                <div ref={invoiceRef} className="relative mt-4">
                  <img
                    src={document.upload}
                    alt="Document Preview"
                    className="w-full h-auto"
                  />

                  <div className="absolute top-2 right-2">
                    <button
                      onClick={handleCloseViewerFunction}
                      className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                    >
                      <FaTimes /> {/* Close icon */}
                    </button>
                  </div>

                  {/* Print Button for Image */}
                  <div className="flex items-center justify-center gap-6 py-4">
                    <div className="mt-2 flex">
                      <button className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2">
                        <a href={document.upload} download>
                          Download
                        </a>
                        <FaDownload className="ml-2 mt-1" />
                      </button>
                    </div>
                    {/* Print Button */}
                    <div className="mt-2 flex">
                      <button
                        onClick={() => useReactToPrint()}
                        className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
                      >
                        Print
                        <FaPrint className="ml-2 mt-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        ))}
      </>
    );
  };

  // Function to render the document category with message if no documents
  const renderDocumentCategory = (uploadArray, categoryName) => {
    const documents =
      uploadArray && uploadArray.length > 0
        ? parseDocuments(uploadArray[0])
        : [];

    return (
      <div className="py-4">
        <h6 className="uppercase text-xl font-semibold text-dark_grey ">{categoryName}</h6>
        {documents.length > 0 ? (
          renderDocumentsUnderCategory(documents, categoryName)
        ) : (
          <p>No documents and images available</p>
        )}
      </div>
    );
  };

  return (
    <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
      <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">Work Info Details:</h6>

      {/* Employee Details */}
      <div className="space-y-6">
        <h6 className="text-xl font-semibold text-dark_grey">Employee Info</h6>
        <div className="grid grid-cols-3 gap-y-4 gap-x-2">
          {Object.entries(workInfo.employeeDetails).map(([key, value], index) => (
            <React.Fragment key={index}>
              <span className="text-gray-800">{key}</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-gray-800">{value || "N/A"}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Leave Details */}
      <div className="mt-8">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">Leave Details</h6>
        <div className="grid grid-cols-3 gap-y-4 gap-x-2">
          {Object.entries(workInfo.LeaveDetails).map(([key, value], index) => (
            <React.Fragment key={index}>
              <span className="text-gray-800">{key}</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-gray-800">{value || "N/A"}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">Service Road Details</h6>
        <div className="grid grid-cols-3 gap-y-4 gap-x-2">
          {Object.entries(workInfo.ServiceRoad).map(([key, value], index) => (
            <React.Fragment key={index}>
              <span className="text-gray-800">{key}</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-gray-800">{value || "N/A"}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Service Road Section */}
      <div className="mt-8">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">Service Road</h6>
        {renderDocumentCategory(uploadAL, "Annual Leave")}
        {renderDocumentCategory(uploadDep, "Departure Documents")}
        {renderDocumentCategory(uploadLP, "Leave Pass")}
        {renderDocumentCategory(uploadPR, "Probation Report")}
        {renderDocumentCategory(uploadSP, "Sick Pay")}
      </div>

      <div className="mt-8">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">Employee Exit Details</h6>
        <div className="grid grid-cols-3 gap-y-4 gap-x-2">
          {Object.entries(workInfo.TerminateDetails).map(([key, value], index) => (
            <React.Fragment key={index}>
              <span className="text-gray-800">{key}</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-gray-800">{value || "N/A"}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">Terminate Documents</h6>
        {renderDocumentCategory(WIContract, "Annual Leave")}
        {renderDocumentCategory(WILeaveEntitle, "Departure Documents")}
        {renderDocumentCategory(WIResignation, "Leave Pass")}
        {renderDocumentCategory(WITermination, "Probation Report")}
        {renderDocumentCategory(WIProbation, "Sick Pay")}
      </div>
    </section>
  );
};

export default WorkInfo;
