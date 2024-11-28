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
