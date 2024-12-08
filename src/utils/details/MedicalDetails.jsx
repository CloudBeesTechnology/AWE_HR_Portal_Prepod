// export default MedicalDetails;
import React, { useState } from "react";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa"; // Icons for close, print, and download
import { getUrl } from "@aws-amplify/storage";
import { Viewer, Worker} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const MedicalDetails = ({
  medicalInfo,
  uploadFitness,
  uploadBwn,
  uploadRegis,
  handlePrint,
  invoiceRef,
  dependPass,
  formatDate,
  mainRef,
}) => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [viewingDocument, setViewingDocument] = useState(null); // Track which document is being viewed
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [lastUploadUrl, setPPLastUP] = useState(""); // State to store the last uploaded file's URL

  // Helper function to fetch the cloud URL
  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });
      //  console.log("File URL:", result.url.href);  Use .href to extract the URL as a string
      setPPLastUP(result.url.href); // Store the URL as a string
      setViewingDocument(pathUrl); // Update the state to show the selected document
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };

  // Function to handle closing the viewer
  const handleCloseViewer = () => {
    setIsPdfOpen(false);
    setViewingDocument(null);
  };

  // Function to parse the uploaded document  r.}Y{44pFik2
  const parseDocuments = (docData) => {
    try {
      // Check if docData is already an object or array
      if (typeof docData === "string") {
        docData = JSON.parse(docData); // Parse only if it's a string
      }

      // Proceed if docData is an array
      if (Array.isArray(docData)) {
        return docData.map((doc) => {
          if (doc.upload) {
            doc.fileName = doc.upload.split("/").pop(); // Extract file name from path
          }
          return doc;
        });
      }

      // Return empty array if docData is not an array
      return [];
    } catch (error) {
      console.error("Error parsing document data:", error);
      return [];
    }
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


  // Parse the document data for uploads
  const parsedFitness = parseDocuments(uploadFitness);
  const parsedBwn = parseDocuments(uploadBwn);
  const parsedRegis = parseDocuments(uploadRegis);


  const onPageChange = (newPageNumber) => {
    if (newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageNumber(1); // Start from page 1
  };

  // Function to render documents
  const renderDocumentsUnderCategory = (documents, category) => {
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
                onClick={() => linkToStorageFile(document.upload)} // Set document to be viewed
                className=" text-dark_grey font-semibold text-sm"
              >
                View Document
              </button>
            </div>

            {/* PDF Viewer */}
            {viewingDocument === document.upload &&
              document.upload.endsWith(".pdf") && (
                <div className="mt-4">
                  <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
                    <div ref={invoiceRef}>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={lastUploadUrl || ""} />
                        {/* <Page pageNumber={pageNumber} className="mx-auto" /> */}
                      </Worker>
                    
                    </div>

                    {/* Close Button */}
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={handleCloseViewer}
                        className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                      >
                        <FaTimes />
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



  const renderDocumentCategory = (uploadArray, categoryName) => {
    const documents =
      uploadArray.length > 0 ? parseDocuments(uploadArray[0]) : [];

    // Check if documents is an array and has items
    const isValidDocumentsArray =
      Array.isArray(documents) && documents.length > 0;

    return (
      <div className="py-4">
        <h6 className="uppercase text_size_5 my-3">{categoryName}</h6>
        {isValidDocumentsArray ? (
          renderDocumentsUnderCategory(documents, categoryName)
        ) : (
          <p className="text-dark_grey font-semibold text-sm">
            No documents and images available
          </p>
        )}
      </div>
    );
  };

  // Updated rendering for personal details to handle arrays
  const renderPersonalDetails = () => {
    return (
      <div className="grid grid-cols-3 gap-y-4 items-center font-semibold text-sm">
        {Object.entries(medicalInfo).map(([key, value], index) => (

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
    <section ref={mainRef} className="py-8 bg-gray-50 rounded-lg">
      <h6 className="uppercase text_size_5 my-3 mb-6">Medical Info</h6>

      {/* Personal Info Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex-1">
          <div className="flex-1">{renderPersonalDetails()}</div>
        </div>
      </div>

      {/* Render Document Categories */}
      <div className="mt-8">
        {renderDocumentCategory(parsedFitness, "Overseas Medical Fitness")}
        {renderDocumentCategory(parsedRegis, "Registration")}
        {renderDocumentCategory(parsedBwn, "Brunei Medical Fitness")}
      </div>
      <section className="py-8 bg-gray-50 rounded-lg">
        <h6 className="uppercase text_size_5 my-3">Dependent Pass info:</h6>
        {dependData.length === 0 ? (
          <p>No dependent data available.</p>
        ) : (
          dependData.map((depend, index) => (
            <div
              key={index}
              className="depend-detail mb-6 p-4 border rounded-lg shadow-md bg-white"
            >
              {/* Dependent's Name */}
              <h3 className="uppercase text_size_5  my-3">
                {" "}
                Dependent {index + 1}
              </h3>

              {/* Passport Details */}
              <div className="grid grid-cols-3 gap-y-4 items-center font-semibold text-sm capitalize">
                <span className="text-dark_grey">Dependent Name</span>
                <span className="text-center text-gray-700">:</span>
                <span className="text-dark_grey">
                  {depend.dependName || "N/A"}
                </span>
                <span className="text-dark_grey">Passport Number</span>
                <span className="text-center text-gray-700">:</span>
                <span className="text-dark_grey">
                  {depend.dependPpNo || "N/A"}
                </span>

                <span className="text-dark_grey">Date of birth</span>
                <span className="text-center text-gray-700">:</span>
                <span className="text-dark_grey">
                  {formatDate(depend.dependPpE) || "N/A"}
                </span>

                {/* Relation and Labour Info */}

                <span className="text-dark_grey">Relation</span>
                <span className="text-center text-gray-700">:</span>
                <span className="text-dark_grey">
                  {depend.relation || "N/A"}
                </span>

                <span className="text-dark_grey">Labour Deposit By</span>
                <span className="text-center text-gray-700">:</span>
                <span className="text-dark_grey">
                  {depend.labourDPBy || "N/A"}
                </span>

                <span className="text-dark_grey">
                  Labour deposit received No
                </span>
                <span className="text-center text-gray-700">:</span>
                <span className="text-dark_grey">
                  {depend.labourDRNo || "N/A"}
                </span>

                <span className="text-dark_grey">Labour Deposit Amount</span>
                <span className="text-center text-gray-700">:</span>
                <span className="text-dark_grey">
                  {depend.labourDAmount || "N/A"}
                </span>
              </div>
              {/* Uploaded Documents (DP) */}
              <div className="uploads mt-6">
                <h4 className="uppercase text_size_5  my-3">Dependent pass:</h4>
                {depend.uploadDp && depend.uploadDp.length > 0 ? (
                  renderDocumentsUnderCategory(depend.uploadDp)
                ) : (
                  <p className="text-dark_grey font-semibold text-sm">
                    No documents and images available
                  </p>
                )}
              </div>

              {/* Uploaded Documents (DR) */}
              <div className="uploads mt-6">
                <h4 className="uppercase text_size_5  my-3">
                  Dependent passport:
                </h4>
                {depend.uploadDr && depend.uploadDr.length > 0 ? (
                  renderDocumentsUnderCategory(depend.uploadDr)
                ) : (
                  <p className="text-dark_grey font-semibold text-sm">
                    No documents and images available
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </section>
    </section>
  );
};

export default MedicalDetails;
