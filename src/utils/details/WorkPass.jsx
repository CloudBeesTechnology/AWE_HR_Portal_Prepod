// // import React from "react";

// // export const WorkPass = ({
// //   workPass,
// //   renderPdfLink,
// //   doeEmpUpload,
// //   lbrDepoUpload,
// //   sawpEmpUpload,
// //   nlmsEmpUpload,
// //   bankEmpUpload,
// //   jpEmpUpload,
// //   isPdfOpen,
// //   viewingDocument,
// //   pageNumber,
// //   numPages,
// //   handleViewDocument,
// //   handleCloseViewer,
// //   onDocumentLoadSuccess,
// //   setPageNumber,

// // }) => {
// //   return (
// //     <section className="py-8 bg-gray-50 rounded-lg">
// //       <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
// //         WorkPass:
// //       </h6>

// //       <div className="space-y-6">
// //         {/* Doe Section */}
// //         <div>
// //           <h6 className="text-lg font-semibold text-dark_grey mb-4">Doe</h6>
// //           <div className="grid grid-cols-3 gap-y-4 items-center">
// //             {Object.entries(workPass.doe).map(([key, value], index) => (
// //               <React.Fragment key={index}>
// //                 <span className="text-gray-800">{key}</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">{value || "N/A"}</span>
// //               </React.Fragment>
// //             ))}
// //           </div>
// //           <div className="mt-8">
// //         <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
// //         DOE EMPLOYEE UPLOAD:
// //         </h6>
// //         {doeEmpUpload ? (
// //           <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
// //             <h6 className="font-semibold text-lg text-gray-800 mb-4">
// //               DOE EMPLOYEE UPLOAD
// //             </h6>
// //             <button
// //               onClick={() => handleViewDocument(inducBriefUp)}
// //               className="text-blue-600 hover:text-blue-800"
// //             >
// //               View Document
// //             </button>

// //             {/* Show PDF viewer and download button if the Induction Brief document is selected */}
// //             {isPdfOpen && viewingDocument === doeEmpUpload && (
// //               <div className="mt-4">
// //                 <div className="relative">
// //                   {/* PDF Viewer using react-pdf */}
// //                   <Document
// //                     file={inducBriefUp}
// //                     onLoadSuccess={onDocumentLoadSuccess}
// //                     className="w-full"
// //                   >
// //                     <Page
// //                       pageNumber={pageNumber}
// //                       className="border border-gray-300"
// //                     />
// //                   </Document>

// //                   {/* Pagination Controls */}
// //                   <div className="mt-4 flex justify-between items-center">
// //                     <button
// //                       onClick={() => setPageNumber(pageNumber - 1)}
// //                       disabled={pageNumber <= 1}
// //                       className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
// //                     >
// //                       Prev
// //                     </button>
// //                     <span className="text-gray-700">
// //                       Page {pageNumber} of {numPages}
// //                     </span>
// //                     <button
// //                       onClick={() => setPageNumber(pageNumber + 1)}
// //                       disabled={pageNumber >= numPages}
// //                       className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
// //                     >
// //                       Next
// //                     </button>
// //                   </div>

// //                   {/* Close Button */}
// //                   <div className="absolute top-2 right-2">
// //                     <button
// //                       onClick={handleCloseViewer}
// //                       className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
// //                     >
// //                       Close
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Download Button */}
// //                 <div className="mt-2">
// //                   <a
// //                     href={inducBriefUp}
// //                     download
// //                     className="text-blue-600 hover:text-blue-800"
// //                   >
// //                     Download Document
// //                   </a>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         ) : (
// //           <p className="text-gray-500">No induction brief available.</p>
// //         )}
// //       </div>
// //         </div>

// //         {/*Labour Deposit Section */}
// //         <div>
// //           <h6 className="text-lg font-semibold text-dark_grey mb-4">
// //             Labour Deposit
// //           </h6>
// //           <div className="grid grid-cols-3 gap-y-4 items-center">
// //             {Object.entries(workPass.labourDeposit).map(
// //               ([key, value], index) => (
// //                 <React.Fragment key={index}>
// //                   <span className="text-gray-800">{key}</span>
// //                   <span className="text-gray-500 text-center">:</span>
// //                   <span className="text-gray-800">{value || "N/A"}</span>
// //                 </React.Fragment>
// //               )
// //             )}
// //           </div>
// //           <div className="space-y-4">
// //             {lbrDepoUpload}
// //           </div>
// //         </div>

// //         {/* SWAP Section */}
// //         <div>
// //           <h6 className="text-lg font-semibold text-dark_grey mb-4">SWAP</h6>
// //           <div className="grid grid-cols-3 gap-y-4 items-center">
// //             {Object.entries(workPass.swap).map(([key, value], index) => (
// //               <React.Fragment key={index}>
// //                 <span className="text-gray-800">{key}</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">{value || "N/A"}</span>
// //               </React.Fragment>
// //             ))}
// //           </div>
// //           <div className="space-y-4">
// //             {sawpEmpUpload}
// //           </div>
// //         </div>

// //         {/* National Section */}
// //         <div>
// //           <h6 className="text-lg font-semibold text-dark_grey mb-4">
// //             National
// //           </h6>
// //           <div className="grid grid-cols-3 gap-y-4 items-center">
// //             {Object.entries(workPass.national).map(([key, value], index) => (
// //               <React.Fragment key={index}>
// //                 <span className="text-gray-800">{key}</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">{value || "N/A"}</span>
// //               </React.Fragment>
// //             ))}
// //           </div>
// //           <div className="space-y-4">
// //             {nlmsEmpUpload}
// //           </div>
// //         </div>

// //         {/* Bank Section */}
// //         <div>
// //           <h6 className="text-lg font-semibold text-dark_grey mb-4">Bank</h6>
// //           <div className="grid grid-cols-3 gap-y-4 items-center">
// //             {Object.entries(workPass.bank).map(([key, value], index) => (
// //               <React.Fragment key={index}>
// //                 <span className="text-gray-800">{key}</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">{value || "N/A"}</span>
// //               </React.Fragment>
// //             ))}
// //           </div>
// //           <div className="space-y-4">
// //             {bankEmpUpload}
// //          </div>
// //         </div>

// //         {/* JITPA Section */}
// //         <div>
// //           <h6 className="text-lg font-semibold text-dark_grey mb-4">JITPA</h6>
// //           <div className="grid grid-cols-3 gap-y-4 items-center">
// //             {Object.entries(workPass.jitpa).map(([key, value], index) => (
// //               <React.Fragment key={index}>
// //                 <span className="text-gray-800">{key}</span>
// //                 <span className="text-gray-500 text-center">:</span>
// //                 <span className="text-gray-800">{value || "N/A"}</span>
// //               </React.Fragment>
// //             ))}
// //           </div>
// //           <div className="space-y-4">
// //             {jpEmpUpload}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };
// import React, { useState } from "react";
// import DocumentViewer from "./DocumentViewer"; // Import the DocumentViewer

// export const WorkPass = ({
//   workPass,
//   doeEmpUpload,
//   lbrDepoUpload,
//   sawpEmpUpload,
//   nlmsEmpUpload,
//   bankEmpUpload,
//   jpEmpUpload,
//   isPdfOpen,
//   viewingDocument,
//   pageNumber,
//   numPages,
//   handleViewDocument,
//   handleCloseViewer,
//   onDocumentLoadSuccess,
//   setPageNumber,
//   handlePrint,
//   invoiceRef,
// }) => {
//   // Array of sections to iterate over
  // const sections = [
  //   { name: "Doe", data: workPass.doe, upload: doeEmpUpload },
  //   {
  //     name: "Labour Deposit",
  //     data: workPass.labourDeposit,
  //     upload: lbrDepoUpload,
  //   },
  //   { name: "SAWP", data: workPass.swap, upload: sawpEmpUpload },
  //   { name: "National", data: workPass.national, upload: nlmsEmpUpload },
  //   { name: "Bank", data: workPass.bank, upload: bankEmpUpload },
  //   { name: "JITPA", data: workPass.jitpa, upload: jpEmpUpload },
  // ];

//   // Helper function to get the first element from the array if it's an array
//   const getValidUrl = (url) => {
//     if (Array.isArray(url)) {
//       return url[0]; // Extract the first URL from the array
//     }
//     return url; // Return the URL directly if it's not an array
//   };

//   return (
//     <>
      // <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
      //   <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
      //     WorkPass:
      //   </h6>

      //   <div className="space-y-6">
      //     {sections.map(({ name, data, upload }, index) => (
      //       <div key={index}>
      //         <h6 className="text-lg font-semibold text-dark_grey mb-4">
      //           {name}
      //         </h6>
      //         <div className="grid grid-cols-3 gap-y-4 items-center">
      //           {Object.entries(data).map(([key, value], index) => (
      //             <React.Fragment key={index}>
      //               <span className="text-gray-800">{key}</span>
      //               <span className="text-gray-500 text-center">:</span>
      //               <span className="text-gray-800">{value || "N/A"}</span>
      //             </React.Fragment>
      //           ))}
      //         </div>

      //         <div className="mt-8">
      //           <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
      //             {name.toUpperCase()} Employee Upload:
      //           </h6>

      //           {upload ? (
      //             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      //               <h6 className="font-semibold text-lg text-gray-800 mb-4">
      //                 {name} Employee Upload
      //               </h6>
      //               <button
      //                 onClick={() => handleViewDocument(upload)}
      //                 className="text-blue-600 hover:text-blue-800"
      //               >
      //                 View Document
      //               </button>

      //               {/* Use DocumentViewer for each section */}
      //               <DocumentViewer
      //                 documentFile={upload}
      //                 isPdfOpen={isPdfOpen}
      //                 viewingDocument={viewingDocument}
      //                 pageNumber={pageNumber}
      //                 numPages={numPages}
      //                 onDocumentLoadSuccess={onDocumentLoadSuccess}
      //                 setPageNumber={setPageNumber}
      //                 handleCloseViewer={handleCloseViewer}
      //               />
      //             </div>
      //           ) : (
      //             <p className="text-gray-500">No document available.</p>
      //           )}
      //         </div>
      //       </div>
      //     ))}
      //   </div>
      // </section>
//     </>
//   );
// };
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa"; // Import "X" icon from react-icons
import { useReactToPrint } from "react-to-print"; // For printing functionality

export const WorkPass = ({
  workPass,
  doeEmpUpload,
  lbrDepoUpload,
  sawpEmpUpload,
  nlmsEmpUpload,
  bankEmpUpload,
  jpEmpUpload,
  isPdfOpen,
  pageNumber,
  numPages,
  handleViewDocument,
  handleCloseViewer,
  onDocumentLoadSuccess,
  setPageNumber,
  handlePrint,
  invoiceRef,
}) => {
  const [viewingDocument, setViewingDocument] = useState(null); // State to store the currently viewed document URL

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

  const sections = [
    { name: "Doe", data: workPass.doe, upload: doeEmpUpload },
    {
      name: "Labour Deposit",
      data: workPass.labourDeposit,
      upload: lbrDepoUpload,
    },
    { name: "SAWP", data: workPass.swap, upload: sawpEmpUpload },
    { name: "National", data: workPass.national, upload: nlmsEmpUpload },
    { name: "Bank", data: workPass.bank, upload: bankEmpUpload },
    { name: "JITPA", data: workPass.jitpa, upload: jpEmpUpload },
  ];


  // Function to render documents under a single category
  const renderDocumentsUnderCategory = (documents) => {
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
                        onClick={() => setViewingDocument(null)}
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
                      onClick={() => setViewingDocument(null)}
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
    // Parse documents only if the uploadArray has valid data
    const documents =
      uploadArray && uploadArray.length > 0
        ? parseDocuments(uploadArray[0]) // Parse the first element if it exists
        : [];

    return (
      <div className="py-4">
        <h6 className="uppercase text-xl font-semibold text-dark_grey ">
          {categoryName}
        </h6>

        {/* If documents are available, render them, otherwise show the no documents message */}
        {documents.length > 0 ? (
          renderDocumentsUnderCategory(documents)
        ) : (
          <p>No documents and images available</p>
        )}
      </div>
    );
  };

  return (
    <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
      <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
        WorkPass Details:
      </h6>
      <div className="space-y-6">
          {sections.map(({ name, data, upload }, index) => (
            <div key={index}>
              <h6 className="text-lg font-semibold text-dark_grey mb-4">
                {name}
              </h6>
              <div className="grid grid-cols-3 gap-y-4 items-center">
                {Object.entries(data).map(([key, value], index) => (
                  <React.Fragment key={index}>
                    <span className="text-gray-800">{key}</span>
                    <span className="text-gray-500 text-center">:</span>
                    <span className="text-gray-800">{value || "N/A"}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      {/* Grouped Documents under Categories */}
      <div className="mt-8">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
          Uploaded Documents:
        </h6>

        {/* Render Documents for each category */}
        {renderDocumentCategory(doeEmpUpload, "Doe Employee Upload")}
        {renderDocumentCategory(lbrDepoUpload, "Labour Deposit Upload")}
        {renderDocumentCategory(sawpEmpUpload, "SAWP Employee Upload")}
        {renderDocumentCategory(nlmsEmpUpload, "National Upload")}
        {renderDocumentCategory(bankEmpUpload, "Bank Upload")}
        {renderDocumentCategory(jpEmpUpload, "JITPA Upload")}
      </div>
    </section>
  );
};


