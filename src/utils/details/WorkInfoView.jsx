import React, { useState, useRef } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import { useReactToPrint } from "react-to-print";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa";
import { getUrl } from "@aws-amplify/storage";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const WorkInfoView = ({
  workInfo,
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
}) => {
  const [viewingDocument, setViewingDocument] = useState(null);
  const [lastUploadUrl, setPPLastUP] = useState("");
  const workInfoRef = useRef();

  // Helper function to fetch the cloud URL
  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });
      setPPLastUP(result.url.href);
      setViewingDocument(pathUrl);
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
            doc.fileName = doc.upload.split("/").pop();
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

  const handleClose = (e) => {
    e.preventDefault();
    setViewingDocument(null);
  };

  const closeModal = () => {
    setViewingDocument(null);
  };

  const handlePrint = useReactToPrint({
    content: () => workInfoRef.current,
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
                onClick={() => linkToStorageFile(document.upload)}
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
                    <div
                      ref={workInfoRef}
                      className="flex-grow overflow-y-auto"
                    >
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={lastUploadUrl || ""} />
                      </Worker>
                    </div>

                    <div className="absolute top-2 right-2">
                      <button
                        onClick={closeModal}
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
                  <div ref={invoiceRef}>
                    <img
                      src={lastUploadUrl}
                      alt="Document Preview"
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="absolute top-2 right-2">
                    <button
                      onClick={handleClose}
                      className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                    >
                      <FaTimes />
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
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
            <p className="text-dark_grey font-semibold text-sm">
              No documents available
            </p>
          </div>
        )}
      </div>
    );
  };
  const renderDetails = (details) => {
    const capitalizeWords = (str) => {
      if (typeof str !== "string" || str === "N/A") {
        return "N/A";
      }

      return str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };

    return (
      <div className="grid grid-cols-3 gap-y-4 items-center font-semibold text-sm">
        {Object.entries(details).map(([key, value], index) => (
          <React.Fragment key={index}>
            <span className="text-dark_grey">{key}</span>
            <span className="text-center text-gray-700">:</span>
            <span className="text-dark_grey">
              {Array.isArray(value)
                ? value.length > 0
                  ? value
                      .map((v, idx, arr) => {
                        if (v === null || v === undefined || v === "") {
                          return "N/A";
                        }
                        return v.toLowerCase() === arr[idx - 1]?.toLowerCase()
                          ? null
                          : v;
                      })
                      .filter((v, idx, arr) => v !== null)
                      .reduce((acc, item) => {
                        if (item === "N/A" && acc[acc.length - 1] !== "N/A") {
                          acc.push("N/A");
                        } else if (item !== "N/A") {
                          acc.push(item);
                        }
                        return acc;
                      }, [])
                      .reverse()
                      .map((item, idx, arr) => {
                        return (
                          <span key={idx}>
                            <span
                              className={`${
                                arr.length > 1 && idx === 0
                                  ? "rounded-md font-black italic"
                                  : ""
                              }`}
                            >
                              {capitalizeWords(item)}
                            </span>
                            {idx < arr.length - 1 && <span>,&nbsp;</span>}
                          </span>
                        );
                      })
                  : "N/A"
                : value === null || value === undefined || value === ""
                ? "N/A"
                : capitalizeWords(value)}
            </span>
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <section>
      <div ref={mainRef} className="py-8 px-10 bg-gray-50 rounded-lg">
        <h6 className="uppercase text_size_5 mb-6">Work Info Details:</h6>

        {/* Employee Details */}
        <div className="space-y-6">
          <h6 className="uppercase text_size_5 my-3">Employee Info</h6>

          <div className="space-y-6">
            {/* Render the section data */}
            <div className="flex-1">
              {renderDetails(workInfo.employeeDetails)}
            </div>
          </div>
        </div>

        {/* Leave Details */}
        <div className="mt-8">
          <h6 className="uppercase text_size_5 my-3">Employee Leave Info</h6>

          <div className="space-y-6">
            {/* Render the section data */}
            <div className="flex-1">{renderDetails(workInfo.LeaveDetails)}</div>
          </div>
        </div>

        <div className="mt-8">
          <h6 className="uppercase text_size_5 my-3">Employee Exit Info</h6>

          <div className="space-y-6">
            {/* Render the section data */}
            <div className="flex-1">
              {renderDetails(workInfo.TerminateDetails)}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h6 className="uppercase text_size_5  my-3">
            Employee Service Record
          </h6>

          <div className="space-y-6">
            {/* Render the section data */}
            <div className="flex-1">{renderDetails(workInfo.ServiceRoad)}</div>
          </div>
        </div>
      </div>
      <div className="mt-8 px-10">
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
      <div className="mt-8 px-10">
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
