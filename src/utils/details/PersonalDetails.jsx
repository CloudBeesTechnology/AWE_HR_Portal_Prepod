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
  handlePrint,
  invoiceRef,
}) => {
  const [viewingDocument, setViewingDocument] = useState(null); // State to store the currently viewed document URL
  // const invoiceRef = useRef();

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
                  <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg]">
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
          renderDocumentsUnderCategory(documents, categoryName)
        ) : (
          <p>No documents and images available</p>
        )}
      </div>
    );
  };

  return (
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
        {renderDocumentCategory(applicationUpload, "Application Document")}
        {renderDocumentCategory(bwnUpload, "BWN Document")}
        {renderDocumentCategory(cvCertifyUpload, "CV Certification Document")}
        {renderDocumentCategory(loiUpload, "LOI Document")}
        {renderDocumentCategory(myIcUpload, "My IC Document")}
        {renderDocumentCategory(paafCvevUpload, "PAAF CVEV Document")}
        {renderDocumentCategory(ppUpload, "PP Document")}
        {renderDocumentCategory(supportDocUpload, "Support Documents")}
      </div>
    </section>
  );
};

export default PersonalDetails;
