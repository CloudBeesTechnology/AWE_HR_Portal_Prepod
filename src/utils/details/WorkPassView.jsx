import React, { useState, useRef } from "react";
// import { Document, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa"; // Import "X" icon from react-icons
import { getUrl } from "@aws-amplify/storage";
import { Viewer, Worker, Page } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import { useReactToPrint } from "react-to-print";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

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
  invoiceRef,
  formatDate,
  arrivStampUpload,
  immigEmpUpload,
  reEntryUpload,
  mainRef,
}) => {
  const [viewingDocument, setViewingDocument] = useState(null); // State to store the currently viewed document URL
  const [lastUploadUrl, setLastUploadUrl] = useState(""); // To store the last uploaded file URL for handling
  const [loading, setLoading] = useState(false);
  const workPassRef = useRef();

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
    { name: "SAWP", data: workPass.swap },
    { name: "Doe", data: workPass.doe },
    { name: "NLMS", data: workPass.national },
    { name: "Bank Guarantee", data: workPass.bank },
    { name: "JITPA", data: workPass.jitpa },
    {
      name: "Labour Deposit",
      data: workPass.labourDeposit,
    },
    { name: "Immigration", data: workPass.immigration },
  ];

  // Function to handle document view change and retrieve URL from cloud storage
  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });
      setLastUploadUrl(result.url.href); // Store the URL
      setViewingDocument(pathUrl); // Update the state to display the document
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the file URL:", error);
      setLoading(false);
    }
  };

  const handleClose = (e) => {
    e.preventDefault(); // Prevent default action
    setViewingDocument(null); // Close the viewer
  };

  const closeModal = () => {
    setViewingDocument(null);
  };

  const handlePrint = useReactToPrint({
    content: () => workPassRef.current,
    onBeforePrint: () => console.log("Preparing to print PDF..."),
    onAfterPrint: () => console.log("Print complete"),
    pageStyle: `
          @page {    
            height:  714px;
            padding: 22px, 0px, 22px, 0px;    
          }
        `,
  });

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
                <div className="py-6 fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50">
                  <div className="relative bg-white rounded-lg shadow-lg w-[40vw] max-h-full flex flex-col">
                    {/* PDF Viewer */}
                    <div ref={workPassRef} className="flex-grow overflow-y-auto">
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={lastUploadUrl || ""} />
                      </Worker>
                    </div>

                    <div className="absolute top-2 right-2">
                      <button
                        onClick={closeModal} // Close the modal
                        className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                      >
                        <FaTimes />
                      </button>
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
                </div>
              )}

            {/* Image Viewer */}
            {viewingDocument === document.upload &&
              !document.upload.endsWith(".pdf") && (
                <div className="relative mt-4">
                  <div ref={workPassRef}>
                    <img
                      src={lastUploadUrl}
                      alt="Document Preview"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={handleCloseViewer}
                      className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/* Download and Print Buttons */}
                  <div className="flex items-center justify-center gap-6 py-4">
                    <div className="mt-2 flex">
                      <button className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2">
                        <a href={lastUploadUrl} download>
                          Download
                        </a>
                        <FaDownload className="ml-2 mt-1" />
                      </button>
                    </div>
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
        <h6 className="uppercase text_size_5 my-3">{categoryName}</h6>
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
        <h6 className="uppercase text_size_5 mb-6">WorkPass Details:</h6>
        <div className="space-y-6">
          {sections.map(({ name, data, upload }, index) => (
            <div key={index}>
              <h6 className="uppercase text_size_5 my-3">{name}</h6>
              {/* Render the section data */}
              <div classname="">{renderDetails(data)}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Grouped Documents under Categories */}
      <div className="mt-8">
        <h6 className="uppercase text_size_5  my-3">Uploaded Documents:</h6>
        {/* Render Documents for each category */}
        {renderDocumentCategory(sawpEmpUpload, "SAWP")}
        {renderDocumentCategory(doeEmpUpload, "DOE")}
        {renderDocumentCategory(nlmsEmpUpload, "NLMS")}
        {renderDocumentCategory(bankEmpUpload, "Bank Guarantee")}
        {renderDocumentCategory(jpEmpUpload, "JITPA")}
        {renderDocumentCategory(lbrDepoUpload, "Labour Deposit Upload")}
        {renderDocumentCategory(arrivStampUpload, "Immigration Arrival")}
        {renderDocumentCategory(immigEmpUpload, "Immigration Approval")}
        {renderDocumentCategory(reEntryUpload, "Immigration Re-Entry Visa")}
      </div>
    </section>
  );
};
