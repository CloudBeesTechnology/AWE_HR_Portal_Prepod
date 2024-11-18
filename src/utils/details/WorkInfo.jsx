import React from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { FaTimes } from "react-icons/fa";

const WorkInfo = ({
  workInfo,
  documentThree,
  isPdfOpen,
  viewingDocument,
  pageNumber,
  numPages,
  handleViewDocument,
  handleCloseViewer,
  onDocumentLoadSuccess,
  setPageNumber,
  uploadAL,
  uploadDep,
  uploadLP,
  uploadPR,
  uploadSP,
  handlePrint,
  invoiceRef
}) => {

        // Helper function to get the first element from the array if it's an array
  const getValidUrl = (url) => {
    if (Array.isArray(url)) {
      return url[0]; // Extract the first URL from the array
    }
    return url; // Return the URL directly if it's not an array
  };

  // Helper function to check if the value is "empty"
  const isEmpty = (value) => {
    if (Array.isArray(value)) {
      return value.length === 0 || value.every((item) => item === "");
    }
    return value === null || value === undefined || value === "";
  };

  // Helper function to get valid value or "N/A"
  const getValidValue = (value) => {
    return isEmpty(value) ? "N/A" : value;
  };
  
  return (
    <>
    <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
      <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
        Work Info Details:
      </h6>
      <div className="space-y-6">
        {/* Accommodation Details */}
        <div>
          <h6 className="text-lg font-semibold text-dark_grey mb-4">
            Employee Details:
          </h6>
          <div className="grid grid-cols-3 gap-y-4 items-center">
            {Object.entries(workInfo.employeeDetails).map(
              ([key, value], index) => (
                <React.Fragment key={index}>
                  <span className="text-gray-800">{key}</span>
                  <span className="text-gray-500 text-center">:</span>
                  <span className="text-gray-800">{getValidValue(value)}</span>
                </React.Fragment>
              )
            )}
          </div>
        </div>

        <div>
          <h6 className="text-lg font-semibold text-dark_grey mb-4">
            Leave Details:
          </h6>
          <div className="grid grid-cols-3 gap-y-4 items-center">
            {Object.entries(workInfo.LeaveDetails).map(
              ([key, value], index) => (
                <React.Fragment key={index}>
                  <span className="text-gray-800">{key}</span>
                  <span className="text-gray-500 text-center">:</span>
                  <span className="text-gray-800">{getValidValue(value)}</span>
                </React.Fragment>
              )
            )}
          </div>
        </div>
        <div>
          <h6 className="text-lg font-semibold text-dark_grey mb-4">
            Employee Exit Details Details:
          </h6>
          <div className="grid grid-cols-3 gap-y-4 items-center">
            {Object.entries(workInfo.TerminateDetails).map(
              ([key, value], index) => (
                <React.Fragment key={index}>
                  <span className="text-gray-800">{key}</span>
                  <span className="text-gray-500 text-center">:</span>
                  <span className="text-gray-800">{value || "N/A"}</span>
                </React.Fragment>
              )
            )}
          </div>
          <div className="mt-8">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
          Employee Documents:
        </h6>
        <div className="space-y-6">
          {Object.keys(documentThree).length > 0 ? (
            Object.entries(documentThree).map(([label, url], index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <h6 className="font-semibold text-lg text-gray-800 mb-4">
                  {label}
                </h6>
                <button
                  onClick={() => handleViewDocument(url)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Document
                </button>

                {/* PDF Viewer */}
                {isPdfOpen && viewingDocument === url && (
                  <div className="mt-4">
                    <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
                      <Document
                        file={getValidUrl(url)}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="w-full"
                      >
                        <Page
                          pageNumber={pageNumber}
                          className="border border-gray-300 mx-auto"
                        />
                      </Document>

                      <div className="mt-4 flex justify-between items-center">
                        <button
                          onClick={() =>
                            setPageNumber((prev) => Math.max(prev - 1, 1))
                          }
                          className="text-gray-600"
                        >
                          Previous
                        </button>
                        <span>
                          Page {pageNumber} of {numPages}
                        </span>
                        <button
                          onClick={() =>
                            setPageNumber((prev) =>
                              Math.min(prev + 1, numPages)
                            )
                          }
                          className="text-gray-600"
                        >
                          Next
                        </button>
                      </div>

                      <button
                        onClick={handleCloseViewer}
                        className="absolute top-2 right-2 text-2xl text-red-600 hover:text-red-800"
                      >
                        <FaTimes /> {/* Close icon */}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No documents available</p>
          )}
        </div>
      </div>
        </div>
        <div>
          <h6 className="text-lg font-semibold text-dark_grey mb-4">
            Employee Service Record Details:
          </h6>
          <div className="grid grid-cols-3 gap-y-4 items-center">
            {Object.entries(workInfo.ServiceRoad).map(([key, value], index) => (
              <React.Fragment key={index}>
                <span className="text-gray-800">{key}</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{getValidValue(value)}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="mt-8">
            <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
              Service Record Documents:
            </h6>
            <div className="space-y-6">
              {/* Render each PDF under Employee Service Record */}
              {[uploadAL, uploadDep, uploadLP, uploadPR, uploadSP].map(
                (doc, index) =>
                  doc && (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                    >
                      <h6 className="font-semibold text-lg text-gray-800 mb-4">
                        Service Record Document {index + 1}
                      </h6>
                      <button
                        onClick={() => handleViewDocument(doc)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Document
                      </button>

                      {/* PDF Viewer */}
                      {isPdfOpen && viewingDocument === doc && (
                        <div className="mt-4">
                          <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
                            <Document
                              file={getValidUrl(doc)}
                              onLoadSuccess={onDocumentLoadSuccess}
                              className="w-full"
                            >
                              <Page
                                pageNumber={pageNumber}
                                className="border border-gray-300 mx-auto"
                              />
                            </Document>

                            <div className="mt-4 flex justify-between items-center">
                              <button
                                onClick={() =>
                                  setPageNumber((prev) => Math.max(prev - 1, 1))
                                }
                                className="text-gray-600"
                              >
                                Previous
                              </button>
                              <span>
                                Page {pageNumber} of {numPages}
                              </span>
                              <button
                                onClick={() =>
                                  setPageNumber((prev) =>
                                    Math.min(prev + 1, numPages)
                                  )
                                }
                                className="text-gray-600"
                              >
                                Next
                              </button>
                            </div>

                            <button
                              onClick={handleCloseViewer}
                              className="absolute top-2 right-2 text-2xl text-red-600 hover:text-red-800"
                            >
                              <FaTimes /> {/* Close icon */}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>

        </div>
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
//Employee Service Record

export default WorkInfo;
