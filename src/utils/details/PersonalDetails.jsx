import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa";
import { getUrl } from "@aws-amplify/storage";

const PersonalDetails = ({
  personalDetails,
  educationalDetails,
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

  // Function to parse the uploaded document  r.}Y{44pFik2
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
                onClick={() => linkToStorageFile(document.upload)} // Fetch the URL for the document
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
                    <div ref={invoiceRef} className="flex justify-center">
                      <Document
                        file={lastUploadUrl} // Use the URL fetched for the document
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="w-full"
                      >
                        <Page pageNumber={pageNumber} className=" mx-auto" />
                      </Document>
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
                        onClick={() => setViewingDocument(null)} // Close the viewer
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
                <div ref={invoiceRef} className="relative mt-4">
                  <img
                    src={lastUploadUrl} // Use the URL for the image
                    alt="Document Preview"
                    className="w-full h-auto"
                  />

                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => setViewingDocument(null)} // Close the viewer
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
              )}
          </div>
        ))} 
      </>
    );
  };

  // Function to render document categories
  const renderDocumentCategory = (uploadArray, categoryName) => {
    const documents =
      uploadArray && uploadArray.length > 0
        ? parseDocuments(uploadArray[0])
        : [];

    return (
      <div className="py-4">
        <h6 className="uppercase text-xl font-semibold text-dark_grey ">{categoryName}</h6>
        {documents.length > 0 ? (
          renderDocumentsUnderCategory(documents)
        ) : (
          <p>No documents available</p>
        )}
      </div>
    );
  };

  // Updated rendering for personal details to handle arrays
  const renderPersonalDetails = () => {
    return (
      <div className="grid grid-cols-3 gap-y-4 items-center">
        {Object.entries(personalDetails).map(([key, value], index) => (
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
      <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
        Personal Details:
      </h6>
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Personal details */}
        <div className="flex-1">{renderPersonalDetails()}</div>
        <div className="w-[250px] h-[350px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
          <img
            src={profilePhoto || "/path/to/default-photo.jpg"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Educational details */}
      <section className="py-8 bg-gray-50 rounded-lg">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
          Education Details:
        </h6>
        <div className="flex flex-col items-start gap-8">
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
              {Object.entries(educationalDetails).map(([key, value], index) => (
                <React.Fragment key={index}>
                  <span className="text-gray-800">{key}</span>
                  <span className="text-center">:</span>
                  <span className="text-gray-800">{value || "N/A"}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Document categories */}
      <div className="mt-8">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
          Uploaded Documents:
        </h6>

        {renderDocumentCategory([applicationUpload], "Application Upload")}
        {renderDocumentCategory([bwnUpload], "BWN Upload")}
        {renderDocumentCategory([cvCertifyUpload], "CV Certified Upload")}
        {renderDocumentCategory([loiUpload], "LOI Upload")}
        {renderDocumentCategory([myIcUpload], "My IC Upload")}
        {renderDocumentCategory([paafCvevUpload], "PAAF CVEV Upload")}
        {renderDocumentCategory([ppUpload], "PP Upload")}
        {renderDocumentCategory([supportDocUpload], "Support Document Upload")}
      </div>
    </section>
  );
};

export default PersonalDetails;
