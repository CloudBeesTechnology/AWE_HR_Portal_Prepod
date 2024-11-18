// // // import React from "react";
// // // import { Document, Page } from "react-pdf";
// // // import "react-pdf/dist/esm/Page/TextLayer.css";
// // // import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// // // import { FaTimes } from "react-icons/fa"; // Import "X" icon from react-icons

// // // const PersonalDetails = ({
// // //   personalDetails,
// // //   profilePhoto,
// // //   // documents,
// // //   isPdfOpen,
// // //   viewingDocument,
// // //   pageNumber,
// // //   numPages,
// // //   handleViewDocument,
// // //   handleCloseViewer,
// // //   onDocumentLoadSuccess,
// // //   setPageNumber,
// // //   inducBriefUp,
// // //   applicationUpload,
// // //   bwnUpload,
// // //   cvCertifyUpload,
// // //   loiUpload,
// // //   myIcUpload,
// // //   paafCvevUpload,
// // //   ppUpload,
// // //   supportDocUpload,
// // // }) => {

// // //     // Helper function to get the first element from the array if it's an array
// // //   const getValidUrl = (url) => {
// // //     if (Array.isArray(url)) {
// // //       return url[0]; // Extract the first URL from the array
// // //     }
// // //     return url; // Return the URL directly if it's not an array
// // //   };

// // //   return (
// // //     <section className="py-8 bg-gray-50 rounded-lg">
// // //       <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
// // //         Personal Details:
// // //       </h6>
// // //       <div className="flex flex-col md:flex-row items-start justify-between gap-8">
// // //         {/* Personal details */}
// // //         <div className="flex-1">
// // //           <div className="grid grid-cols-3 gap-y-4 gap-x-2">
// // //             {Object.entries(personalDetails).map(([key, value], index) => (
// // //               <React.Fragment key={index}>
// // //                 <span className="text-gray-800">{key}</span>
// // //                 <span className="text-center text-gray-700">:</span>
// // //                 <span className="text-gray-800">{value || "N/A"}</span>
// // //               </React.Fragment>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Profile Image */}
// // //         <div className="w-[250px] h-[350px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
// // //           <img
// // //             src={profilePhoto || "/path/to/default-photo.jpg"}
// // //             alt="Profile"
// // //             className="object-cover w-full h-full"
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Employee Documents */}
// // //       <div className="mt-8">
// // //         <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
// // //           Employee Documents:
// // //         </h6>

// // //       </div>

// // //       {/* Induction Brief Document */}
// // //       <div className="mt-8">
// // //         <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
// // //           Induction Brief Document:
// // //         </h6>
// // //         {inducBriefUp ? (
// // //           <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
// // //             <h6 className="font-semibold text-lg text-gray-800 mb-4">
// // //               Induction Brief
// // //             </h6>
// // //             <button
// // //               onClick={() => handleViewDocument(inducBriefUp)}
// // //               className="text-blue-600 hover:text-blue-800"
// // //             >
// // //               View Document
// // //             </button>

// // //             {/* Show PDF viewer and download button if the Induction Brief document is selected */}
// // //             {isPdfOpen && viewingDocument === inducBriefUp && (
// // //               <div className="mt-4">
// // //                 <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
// // //                   {/* PDF Viewer using react-pdf */}
// // //                   <Document
// // //                     file={inducBriefUp}
// // //                     onLoadSuccess={onDocumentLoadSuccess}
// // //                     className="w-full"
// // //                   >
// // //                     <Page
// // //                       pageNumber={pageNumber}
// // //                       className="border border-gray-300 mx-auto"
// // //                     />
// // //                   </Document>

// // //                   {/* Pagination Controls */}
// // //                   <div className="mt-4 flex justify-between items-center">
// // //                     <button
// // //                       onClick={() => setPageNumber(pageNumber - 1)}
// // //                       disabled={pageNumber <= 1}
// // //                       className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
// // //                     >
// // //                       Prev
// // //                     </button>
// // //                     <span className="text-gray-700">
// // //                       Page {pageNumber} of {numPages}
// // //                     </span>
// // //                     <button
// // //                       onClick={() => setPageNumber(pageNumber + 1)}
// // //                       disabled={pageNumber >= numPages}
// // //                       className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
// // //                     >
// // //                       Next
// // //                     </button>
// // //                   </div>

// // //                   {/* Close Button */}
// // //                   <div className="absolute top-2 right-2">
// // //                     <button
// // //                       onClick={handleCloseViewer}
// // //                       className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
// // //                     >
// // //                       <FaTimes /> {/* Close icon */}
// // //                     </button>
// // //                   </div>
// // //                 </div>

// // //                 {/* Download Button */}
// // //                 <div className="mt-2">
// // //                   <a
// // //                     href={inducBriefUp}
// // //                     download
// // //                     className="text-blue-600 hover:text-blue-800"
// // //                   >
// // //                     Download Document
// // //                   </a>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         ) : (
// // //           <p className="text-gray-500">No induction brief available.</p>
// // //         )}
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // export default PersonalDetails;
// import React from "react";
// import { useState } from "react";
// import { Document, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import { FaTimes } from "react-icons/fa"; // Import "X" icon from react-icons

// const PersonalDetails = ({
//   personalDetails,
//   profilePhoto,
//   isPdfOpen,
//   pageNumber,
//   numPages,
//   handleViewDocument,
//   handleCloseViewer,
//   onDocumentLoadSuccess,
//   setPageNumber,
//   inducBriefUp,
//   applicationUpload,
//   bwnUpload,
//   cvCertifyUpload,
//   loiUpload,
//   myIcUpload,
//   paafCvevUpload,
//   ppUpload,
//   supportDocUpload,
// }) => {

//   const [viewingDocument, setViewingDocument] = useState(null)

//   // Helper function to parse and safely handle data
//   const parseDocuments = (docData) => {
//     try {
//       // Ensure it's a valid JSON string and parse it
//       const parsedData = JSON.parse(docData);
//       return Array.isArray(parsedData) ? parsedData : [];
//     } catch (error) {
//       console.error("Error parsing document data:", error);
//       return [];
//     }
//   };

//    // Function to handle closing the viewer
//    const handleCloseViewerFunction = () => {
//     setViewingDocument(null); // Close the viewer by setting the state to null
//   };

//     // Function to handle print
//     const handlePrint = () => {
//       if (viewingDocument) {
//         const printWindow = window.open("", "_blank");
//         if (viewingDocument.endsWith(".pdf")) {
//           // Print PDF
//           printWindow.document.write('<iframe width="100%" height="100%" src="' + viewingDocument + '"></iframe>');
//           printWindow.document.close();
//         } else {
//           // Print Image
//           printWindow.document.write('<img src="' + viewingDocument + '" style="width:100%;height:auto;" />');
//           printWindow.document.close();
//         }
//         printWindow.print();
//       }
//     };

//   // Render the documents under a single category
//   const renderDocumentsUnderCategory = (documents, documentName) => {
//     return (
//       <>
//         <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
//           {documentName}
//         </h6>
//         {documents.map((document, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
//             <div className="flex justify-between items-center">
//               <span className="text-gray-700">Uploaded on: {document.date}</span>
//               <button
//                 onClick={() => setViewingDocument(document.upload)} // Set the document URL when clicked
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 View Document
//               </button>
//             </div>

//             {/* Handle PDF or Image Render */}
//             {viewingDocument === document.upload && document.upload.endsWith(".pdf") && (
//               <div className="mt-4">
//                 <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
//                   {/* PDF Viewer using react-pdf */}
//                   <Document
//                     file={document.upload}
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     className="w-full"
//                   >
//                     <Page
//                       pageNumber={pageNumber}
//                       className="border border-gray-300 mx-auto"
//                     />
//                   </Document>

//                   {/* Pagination Controls */}
//                   <div className="mt-4 flex justify-between items-center">
//                     <button
//                       onClick={() => setPageNumber(pageNumber - 1)}
//                       disabled={pageNumber <= 1}
//                       className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
//                     >
//                       Prev
//                     </button>
//                     <span className="text-gray-700">
//                       Page {pageNumber} of {numPages}
//                     </span>
//                     <button
//                       onClick={() => setPageNumber(pageNumber + 1)}
//                       disabled={pageNumber >= numPages}
//                       className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
//                     >
//                       Next
//                     </button>
//                   </div>

//                   {/* Close Button */}
//                   <div className="absolute top-2 right-2">
//                     <button
//                        onClick={handleCloseViewerFunction}
//                       className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
//                     >
//                       <FaTimes /> {/* Close icon */}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Download Button */}
//                 <div className="mt-2">
//                   <a
//                     href={document.upload}
//                     download
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     Download Document
//                   </a>
//                 </div>
//                 <div className="mt-2">
//                   <button
//                     onClick={handlePrint}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     Print Document
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Image Viewer */}
//             {viewingDocument === document.upload && !document.upload.endsWith(".pdf") && (
//               <div className="mt-4">
//                 <img
//                   src={document.upload}
//                   alt="Document Preview"
//                   className="w-full h-auto"
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </>
//     );
//   };

//   return (
//     <section className="py-8 bg-gray-50 rounded-lg">
//       <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
//         Personal Details:
//       </h6>
//       <div className="flex flex-col md:flex-row items-start justify-between gap-8">
//         {/* Personal details */}
//         <div className="flex-1">
//           <div className="grid grid-cols-3 gap-y-4 gap-x-2">
//             {Object.entries(personalDetails).map(([key, value], index) => (
//               <React.Fragment key={index}>
//                 <span className="text-gray-800">{key}</span>
//                 <span className="text-center text-gray-700">:</span>
//                 <span className="text-gray-800">{value || "N/A"}</span>
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         {/* Profile Image */}
//         <div className="w-[250px] h-[350px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
//           <img
//             src={profilePhoto || "/path/to/default-photo.jpg"}
//             alt="Profile"
//             className="object-cover w-full h-full"
//           />
//         </div>
//       </div>

//       {/* Grouped Documents under Categories */}
//       <div className="mt-8">
//         <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
//           Uploaded Documents:
//         </h6>

//         {/* Render Documents for each category */}

//         {applicationUpload && applicationUpload.length > 0 && renderDocumentsUnderCategory(parseDocuments(applicationUpload[0]), "Application Document")}
//         {bwnUpload && bwnUpload.length > 0 && renderDocumentsUnderCategory(parseDocuments(bwnUpload[0]), "BWN Document")}
//         {cvCertifyUpload && cvCertifyUpload.length > 0 && renderDocumentsUnderCategory(parseDocuments(cvCertifyUpload[0]), "CV Certification Document")}
//         {loiUpload && loiUpload.length > 0 && renderDocumentsUnderCategory(parseDocuments(loiUpload[0]), "LOI Document")}
//         {myIcUpload && myIcUpload.length > 0 && renderDocumentsUnderCategory(parseDocuments(myIcUpload[0]), "My IC Document")}
//         {paafCvevUpload && paafCvevUpload.length > 0 && renderDocumentsUnderCategory(parseDocuments(paafCvevUpload[0]), "PAAF CVEV Document")}
//         {ppUpload && ppUpload.length > 0 && renderDocumentsUnderCategory(parseDocuments(ppUpload[0]), "PP Document")}
//         {supportDocUpload && supportDocUpload.length > 0 && renderDocumentsUnderCategory(parseDocuments(supportDocUpload[0]), "Support Document")}
//       </div>
//     </section>
//   );
// };

// export default PersonalDetails;
import React, { useState, useRef } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa"; // Import "X" icon from react-icons
import { useReactToPrint } from "react-to-print";

const PersonalDetails = ({
  personalDetails,
  profilePhoto,
  isPdfOpen,
  pageNumber,
  numPages,
  handleViewDocument,
  onDocumentLoadSuccess,
  setPageNumber,
  applicationUpload,
  bwnUpload,
  cvCertifyUpload,
  loiUpload,
  myIcUpload,
  paafCvevUpload,
  ppUpload,
  supportDocUpload,
}) => {
  const [viewingDocument, setViewingDocument] = useState(null); // State to store the currently viewed document URL
  const invoiceRef = useRef();
  // Helper function to parse and safely handle data
  const parseDocuments = (docData) => {
    try {
      // Ensure it's a valid JSON string and parse it
      const parsedData = JSON.parse(docData);
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

  // Function to handle print using react-to-print
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    onBeforePrint: () => console.log("Preparing print..."),
    onAfterPrint: () => console.log("Print complete"),
    pageStyle: "print", // This ensures the print view uses a different CSS style
  });

  // Render the documents under a single category
  const renderDocumentsUnderCategory = (documents, documentName) => {
    return (
      <>
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
          {documentName}
        </h6>
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

                    <div ref={invoiceRef}>
                      <Document
                        file={document.upload}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="w-full"
                      >
                        <Page pageNumber={pageNumber} className=" mx-auto" />
                      </Document>
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
                        onClick={handlePrint}
                        className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
                      >
                        Print
                      <span><FaPrint className="ml-2 mt-1"/></span>
                          
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
                        onClick={handlePrint}
                        className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
                      >
                        Print
                      <span><FaPrint className="ml-2 mt-1"/></span>
                          
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

  return (
    <>
      <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
          Personal Details:
        </h6>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Personal details */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
              {Object.entries(personalDetails).map(([key, value], index) => (
                <React.Fragment key={index}>
                  <span className="text-gray-800">{key}</span>
                  <span className="text-center text-gray-700">:</span>
                  <span className="text-gray-800">{value || "N/A"}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="w-[250px] h-[350px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
            <img
              src={profilePhoto || "/path/to/default-photo.jpg"}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Grouped Documents under Categories */}
        <div className="mt-8">
          <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
            Uploaded Documents:
          </h6>

          {/* Render Documents for each category */}
          {applicationUpload &&
            applicationUpload.length > 0 &&
            renderDocumentsUnderCategory(
              parseDocuments(applicationUpload[0]),
              "Application Document"
            )}
          {bwnUpload &&
            bwnUpload.length > 0 &&
            renderDocumentsUnderCategory(
              parseDocuments(bwnUpload[0]),
              "BWN Document"
            )}
          {cvCertifyUpload &&
            cvCertifyUpload.length > 0 &&
            renderDocumentsUnderCategory(
              parseDocuments(cvCertifyUpload[0]),
              "CV Certification Document"
            )}
          {loiUpload &&
            loiUpload.length > 0 &&
            renderDocumentsUnderCategory(
              parseDocuments(loiUpload[0]),
              "LOI Document"
            )}
          {myIcUpload &&
            myIcUpload.length > 0 &&
            renderDocumentsUnderCategory(
              parseDocuments(myIcUpload[0]),
              "My IC Document"
            )}
          {paafCvevUpload &&
            paafCvevUpload.length > 0 &&
            renderDocumentsUnderCategory(
              parseDocuments(paafCvevUpload[0]),
              "PAAF CVEV Document"
            )}
          {ppUpload &&
            ppUpload.length > 0 &&
            renderDocumentsUnderCategory(
              parseDocuments(ppUpload[0]),
              "PP Document"
            )}
          {supportDocUpload &&
            supportDocUpload.length > 0 &&
            renderDocumentsUnderCategory(
              parseDocuments(supportDocUpload[0]),
              "Support Documents"
            )}
        </div>
        <div className="py-12 mt-2 flex justify-center ">
          <button
            onClick={handlePrint}
            className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2"
          >
            Print
          </button>
        </div>
      </section>
    </>
  );
};

export default PersonalDetails;
