import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa"; // Import "X" icon from react-icons
import { getUrl } from "@aws-amplify/storage";

export const WorkPassView = ({
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
  const [lastUploadUrl, setLastUploadUrl] = useState(""); // To store the last uploaded file URL for handling

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
    { name: "Doe", data: workPass.doe,},
    {
      name: "Labour Deposit",
      data: workPass.labourDeposit
    },
    { name: "SAWP", data: workPass.swap},
    { name: "National", data: workPass.national},
    { name: "Bank", data: workPass.bank},
    { name: "JITPA", data: workPass.jitpa},
  ];

  // Function to handle document view change and retrieve URL from cloud storage
  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });
      setLastUploadUrl(result.url.href); // Store the URL
      setViewingDocument(pathUrl); // Update the state to display the document
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };

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
                onClick={() => linkToStorageFile(document.upload)} // Set the document URL when clicked
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
                          file={lastUploadUrl}
                          onLoadSuccess={onDocumentLoadSuccess}
                          className="w-full"
                        >
                          <Page pageNumber={pageNumber} className="mx-auto" />
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
                        <a href={lastUploadUrl} download>
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
                    src={lastUploadUrl}
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
                        <a href={lastUploadUrl} download>
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

  // Function to render the section data with a check for missing values
  // const renderSectionData = (data) => {
  //   return (
  //     <div className="grid grid-cols-3 gap-y-4 items-center">
  //       {Object.entries(data).map(([key, value], index) => (
  //         <React.Fragment key={index}>
  //           <span className="text-gray-800">{key}</span>
  //           <span className="text-gray-500 text-center">:</span>
  //           <span className="text-gray-800">
  //             {/* Check if the value is an array, like dates, or if it's missing */}
  //             {Array.isArray(value) ? (
  //               value.length > 0 ? (
  //                 value.map((date, i) => (
  //                   <div key={i} className="text-gray-600">
  //                     {date}
  //                   </div>
  //                 ))
  //               ) : (
  //                 <span className="text-gray-500">N/A</span>
  //               )
  //             ) : value ? (
  //               value // Display the value if it's not an array
  //             ) : (
  //               <span className="text-gray-500">N/A</span>
  //             )}
  //           </span>
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   );
  // };
  const renderSectionData = (data) => {
    return (
      <div className="grid grid-cols-3 gap-y-4 items-center">
        {Object.entries(data).map(([key, value], index) => (
          <React.Fragment key={index}>
            <span className="text-gray-800">{key}</span>
            <span className="text-gray-500 text-center">:</span>
            <span className="text-gray-800">
              {/* Check if the value is an array */}
              {Array.isArray(value) ? (
                value.length > 0 ? (
                  // Step 1: Rearrange the array to put the latest value first
                  value
                    .slice(-1) // Get the last element
                    .concat(value.slice(0, -1)) // Concatenate the rest of the array
                    .map((date, i) => (
                      <div
                        key={i}
                        className={`text-gray-600 ${
                          i === 0 ? 'font-bold text-green-600' : ''
                        }`}
                      >
                        {date}
                        {i < value.length - 1 && ', '}
                      </div>
                    ))
                ) : (
                  <span className="text-gray-500">N/A</span>
                )
              ) : value ? (
                // Display the value if it's not an array
                value
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </span>
          </React.Fragment>
        ))}
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
            {/* Render the section data */}
            <div classname="flex-1">{renderSectionData(data)}</div> 
            
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
