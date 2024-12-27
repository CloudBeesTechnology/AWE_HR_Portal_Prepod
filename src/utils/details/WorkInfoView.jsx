import React, { useState, useRef } from "react";
import { Viewer, Worker, Page } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa"; // Import "X" icon from react-icons
import { getUrl } from "@aws-amplify/storage";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const WorkInfoView = ({
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
  formatDate,
  mainRef,
  handlePrint,
}) => {
  const [viewingDocument, setViewingDocument] = useState(null); // State to store the currently viewed document URL
  const [lastUploadUrl, setPPLastUP] = useState("");
  // Helper function to fetch the cloud URL
  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });
      //  console.log("File URL:", result.url.href); // Use .href to extract the URL as a string
      setPPLastUP(result.url.href); // Store the URL as a string
      setViewingDocument(pathUrl); // Update the state to show the selected document
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };

  // Helper function to parse and safely handle data
  const parseDocuments = (docData) => {
    try {
      const parsedData = JSON.parse(docData);
      if (Array.isArray(parsedData)) {
        return parsedData.map((doc) => {
          if (doc.upload) {
            doc.fileName = doc.upload.split("/").pop(); // Extract file name from path
          }
          return doc;
        });
      }
      return [];
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
              <span className="uppercase font-semibold text-sm">
                Uploaded on: {formatDate(document.date)}
              </span>
              <button
                onClick={() => linkToStorageFile(document.upload)} // Fetch the URL for the document
                className="text-dark_grey font-semibold text-sm"
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
                    <div className="flex justify-center">
                      <div ref={invoiceRef}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                          <Viewer fileUrl={lastUploadUrl || ""} />
                          {/* <Page pageNumber={pageNumber} className="mx-auto" /> */}
                        </Worker>
                        {/* <Document
                          file={lastUploadUrl}
                          onLoadSuccess={onDocumentLoadSuccess}
                          className="w-full"
                        >
                          <Page pageNumber={pageNumber} className=" mx-auto" />
                        </Document> */}
                      </div>
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
                <div className="relative mt-4">
                  <div ref={invoiceRef}>
                    <img
                      src={lastUploadUrl} // Use the URL for the image
                      alt="Document Preview"
                      className="w-full h-auto"
                    />
                  </div>

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
    const documents =
      uploadArray && uploadArray.length > 0
        ? parseDocuments(uploadArray[0])
        : [];

    return (
      <div className="py-4">
        <h6 className="uppercase text_size_5 my-3 ">{categoryName}</h6>
        {documents.length > 0 ? (
          renderDocumentsUnderCategory(documents)
        ) : (
          <p className="text-dark_grey font-semibold text-sm">
            No documents available
          </p>
        )}
      </div>
    );
  };

  const renderDetails = (details) => {
    return (
      <div className="grid grid-cols-3 gap-y-4 items-center font-semibold text-sm">
        {Object.entries(details).map(([key, value], index) => (
          <React.Fragment key={index}>
            <span className="text-dark_grey">{key}</span>
            <span className="text-center text-gray-700">:</span>
            <span className="text-dark_grey">
              {
                Array.isArray(value)
                  ? value.some((v) => v !== null) // Check if the array has any non-null values
                    ? value
                        .filter((v) => v !== null) // Remove null values from the array
                        .slice(-1) // Get the last element
                        .concat(value.slice(0, -1))
                        .map((item, idx, arr) => (
                          <span key={idx}>
                            <span
                              className={`${
                                arr.length > 1 && idx === 0
                                  ? "rounded-md text-primary"
                                  : "" // Only highlight the latest value if there are multiple values
                              }`}
                            >
                              {item}
                            </span>
                            {idx < value.length - 1 && <span>,&nbsp;</span>}
                            {/* Add a comma except for the last item */}
                          </span>
                        ))
                    : "N/A" // Show "N/A" if the array only contains null or is empty
                  : value !== null && value !== undefined && value !== ""
                  ? value
                  : "N/A" // Show "N/A" for null or undefined non-array values
              }
            </span>
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <section>
    <div ref={mainRef} className="py-8 bg-gray-50 rounded-lg">
      <h6 className="uppercase text_size_5 mb-6">Work Info Details:</h6>

      {/* Employee Details */}
      <div className="space-y-6">
        <h6 className="uppercase text_size_5 my-3">Employee Info</h6>

        <div className="space-y-6">
          {/* Render the section data */}
          <div classname="flex-1">
            {renderDetails(workInfo.employeeDetails)}
          </div>
        </div>
      </div>

      {/* Leave Details */}
      <div className="mt-8">
        <h6 className="uppercase text_size_5 my-3">Employee Leave Info</h6>

        <div className="space-y-6">
          {/* Render the section data */}
          <div classname="flex-1">{renderDetails(workInfo.LeaveDetails)}</div>
        </div>
      </div>

      <div className="mt-8">
        <h6 className="uppercase text_size_5 my-3">Employee Exit Info</h6>

        <div className="space-y-6">
          {/* Render the section data */}
          <div classname="flex-1">
            {renderDetails(workInfo.TerminateDetails)}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h6 className="uppercase text_size_5  my-3">Employee Service Record</h6>

        <div className="space-y-6">
          {/* Render the section data */}
          <div classname="flex-1">{renderDetails(workInfo.ServiceRoad)}</div>
        </div>
      </div>

     
    </div>
    <div className="mt-8">
        <h6 className="uppercase text_size_5  my-3">
          Employee Exit Info Documents
        </h6>
        {renderDocumentCategory(WIContract, "Contract")}
        {renderDocumentCategory(WILeaveEntitle, "Probation")}
        {renderDocumentCategory(WIResignation, "Resignation")}
        {renderDocumentCategory(WITermination, "Termination")}
        {renderDocumentCategory(WIProbation, "Leave Entitlement")}
      </div>
     {/* Service Road Section */}
     <div className="mt-8">
        <h6 className="uppercase text_size_5 my-3">Service Record Documents</h6>
        {renderDocumentCategory(uploadPR, "Position Revision")}
        {renderDocumentCategory(uploadSP, "Salary Package Revision")}
        {renderDocumentCategory(uploadLP, "Leave Passage Revision")}
        {renderDocumentCategory(uploadAL, "Annual Revision")}
        {renderDocumentCategory(uploadDep, "Change of Department")}
      </div>
    </section>
  );
};

export default WorkInfoView;
