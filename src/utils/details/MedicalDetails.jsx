// export default MedicalDetails;
import React, { useState } from "react";
import { Document, Page } from "react-pdf"; // For PDF viewing
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa"; // Icons for close, print, and download
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { getUrl } from "@aws-amplify/storage";

const MedicalDetails = ({
  medicalInfo,
  uploadFitness,
  uploadBwn,
  uploadRegis,
  handlePrint,
  invoiceRef,
  dependPass
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
      console.log("File URL:", result.url.href); // Use .href to extract the URL as a string
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

  // Handle document loading success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

 // Parse the document data for uploads
 const parsedFitness = parseDocuments(uploadFitness);
 const parsedBwn = parseDocuments(uploadBwn);
 const parsedRegis = parseDocuments(uploadRegis);
 

 console.log("dp", dependPass);

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
              <span className="text-gray-700">
                Uploaded on: {document.date}
              </span>
              <button
                onClick={() => linkToStorageFile(document.upload)} // Set document to be viewed
                className="text-blue-600 hover:text-blue-800"
              >
                View Document
              </button>
            </div>

            {/* PDF Viewer */}
            {viewingDocument === document.upload && document.upload.endsWith(".pdf") && (
              <div className="mt-4">
                <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
                  <Document
                    file={lastUploadUrl}
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
                      className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
                    >
                      Prev
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
            {viewingDocument === document.upload && !document.upload.endsWith(".pdf") && (
              <div ref={invoiceRef} className="relative mt-4">
                <img
                  src={lastUploadUrl}
                  alt="Document Preview"
                  className="w-full h-auto"
                />
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

  // Render the document categories for fitness, BW, and registration
  const renderDocumentCategory = (uploadArray, categoryName) => {
    const documents = uploadArray.length > 0 ? parseDocuments(uploadArray[0]) : [];
    return (
      <div className="py-4">
        <h6 className="uppercase text-xl font-semibold text-dark_grey">{categoryName}</h6>
        {documents.length > 0 ? (
           renderDocumentsUnderCategory(documents, categoryName)
        ) : (
          <p>No documents and images available</p>
        )}
      </div>
    );
  };

    // Updated rendering for personal details to handle arrays
    const renderPersonalDetails = () => {
      return (
        <div className="grid grid-cols-3 gap-y-4 items-center">
          {Object.entries(medicalInfo).map(([key, value], index) => (
            <React.Fragment key={index}>
              <span className="text-gray-800">{key}</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-gray-800">
                {Array.isArray(value) ? (
                  // Step 1: Rearrange the array, making the latest value the first element
                  value.length > 1 ? (
                    // Move the last element to the front and map through the array
                    value
                      .slice(-1) // Get the last element
                      .concat(value.slice(0, -1)) // Concatenate the rest of the array after the last element
                      .map((item, idx) => (
                        <span
                          key={idx}
                          className={`${
                            idx === 0 ? 'text-[#0CB100]' : '' // Highlight the last value
                          }`}
                        >
                          {item}
                          {idx < value.length - 1 && ', '} {/* Add a comma except for the last item */}
                        </span>
                      ))
                  ) : (
                    value
                  )
                ) : (
                  value || "N/A"
                )}
              </span>
            </React.Fragment>
          ))}
        </div>
      );
    };

  return (
    <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
      <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">Medical Details:</h6>

      {/* Personal Info Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex-1">
           <div className="flex-1">{renderPersonalDetails()}</div>
        </div>
      </div>

      {/* Render Document Categories */}
      <div className="mt-8">
        {renderDocumentCategory(parsedFitness, "Fitness Document")}
        {renderDocumentCategory(parsedBwn, "BW Document")}
        {renderDocumentCategory(parsedRegis, "Registration Document")}
       
      </div>
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
      {/* Print Button */}
    </section>
  );
};

export default MedicalDetails;
