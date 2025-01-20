import React from 'react';
import { Document, Page } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const DocumentViewer = ({
  documentFile,
  isPdfOpen,
  viewingDocument,
  pageNumber,
  numPages,
  onDocumentLoadSuccess,
  setPageNumber,
  handleCloseViewer
}) => {

     // Helper function to get the first element from the array if it's an array
  const getValidUrl = (url) => {
    if (Array.isArray(url)) {
      return url[0]; // Extract the first URL from the array
    }
    return url; // Return the URL directly if it's not an array
  };
  

  if (!documentFile) return <p className="text-gray-500">No document available.</p>;

  return (
    isPdfOpen && viewingDocument === documentFile && (
      <div className="mt-4">
        <div className="relative">
          {/* PDF Viewer using react-pdf */}
          <Document file={getValidUrl(documentFile)} onLoadSuccess={onDocumentLoadSuccess} className="w-full">
            <Page pageNumber={pageNumber} className="border border-gray-300" />
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
            <span className="text-gray-700">Page {pageNumber} of {numPages}</span>
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
          <a href={documentFile}  className="text-blue-600 hover:text-blue-800">
            Download Document
          </a>
        </div>
      </div>
    )
  );
};

export default DocumentViewer;
