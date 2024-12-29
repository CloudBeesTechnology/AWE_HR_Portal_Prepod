import React, { useState, useRef } from "react";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa";
import { getUrl } from "@aws-amplify/storage";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import { useReactToPrint } from "react-to-print";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();


const PersonalDetailsView = ({
  personalDetails,
  educationalDetails,
  profilePhoto,
  pageNumber,
  numPages,
  setPageNumber,
  applicationUpload,
  bwnUpload,
  cvCertifyUpload,
  loiUpload,
  myIcUpload,
  paafCvevUpload,
  ppUpload,
  supportDocUpload,
  inducBriefUp,
  invoiceRef,
  formatDate,
  mainRef,
}) => {
  const [viewingDocument, setViewingDocument] = useState(null); // State to store the currently viewed document URL
  const [lastUploadUrl, setPPLastUP] = useState(""); // State to store the last uploaded file's URL
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const personal = useRef();

  // Helper function to fetch the cloud URL
  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });
      //   console.log("File URL:", result.url.href); // Use .href to extract the URL as a string
      setPPLastUP(result.url.href); // Store the URL as a string
      setViewingDocument(pathUrl); // Update the state to show the selected document
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the file URL:", error);
      setLoading(false);
    }
  };

  const linkToImageFile = async (pathUrl) => {
    const result = await getUrl({
      path: pathUrl,
    });
    return setImageUrl(result.url.toString());
  };
  linkToImageFile(profilePhoto);

  //write a function to get image

  // Function to parse the uploaded document
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

  const parseInducBriefUp = (docData) => {
    try {
      // Clean up the data (replace '=' with ':', remove extra commas, etc.)
      let cleanedData = docData.replace(/=/g, ":"); // Replace '=' with ':'

      // Ensure there are no trailing commas before closing '}' in the last item
      cleanedData = cleanedData.replace(/,\s*}/g, "}");

      // Now, parse the cleaned data into JSON
      const parsedData = JSON.parse(cleanedData);

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
      console.error("Error parsing inducBriefUp data:", error);
      return [];
    } 
  };

 
  const onPageChange = (newPageNumber) => {
    if (newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageNumber(1); // Start from page 1
  };
 
  const handleClose = (e) => {
    e.preventDefault(); // Prevent default action
    setViewingDocument(null); // Close the viewer
  };

  
  const closeModal = () => {
    setViewingDocument(null);
  };


    const handlePrint = useReactToPrint({
      content: () => personal.current,
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
                    <div ref={personal} className="flex-grow overflow-y-auto">
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
                <div className="mt-4">
                <div className="relative invoice-content bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
                  <div ref={invoiceRef} className="pdfViewerflex justify-center border h-auto">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                      <Viewer
                        fileUrl={lastUploadUrl || ""}
                      />
                    </Worker>
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
                      onClick={handlePrint} // Triggers the print
                      className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
                    >
                      Print
                      <FaPrint className="ml-2 mt-1" />
                    </button>
                  </div>
                </div>
              </div>
                // <div className="relative mt-4">
                //   <div ref={invoiceRef}>
                //     <img
                //       src={lastUploadUrl} // Use the URL for the image
                //       alt="Document Preview"
                //       className="w-full h-auto"
                //     />
                //   </div>

                //   <div className="absolute top-2 right-2">
                //     <button
                //       onClick={() => setViewingDocument(null)} // Close the viewer
                //       className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                //     >
                //       <FaTimes />
                //     </button>
                //   </div>

                //   <div className="flex items-center justify-center gap-6 py-4">
                //     <div className="mt-2 flex">
                //       <button className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2">
                //         <a href={lastUploadUrl} download>
                //           Download
                //         </a>
                //         <FaDownload className="ml-2 mt-1" />
                //       </button>
                //     </div>
                //     <div className="mt-2 flex">
                //       <button
                //         onClick={handlePrint}
                //         className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
                //       >
                //         Print
                //         <FaPrint className="ml-2 mt-1" />
                //       </button>
                //     </div>
                //   </div>
                // </div>
              )}
          </div>
        ))}
      </>
    );
  };

  const renderDocumentCategory = (uploadArray, categoryName) => {
    let documents = [];

    if (uploadArray && uploadArray.length > 0) {
      if (categoryName === "Induction Briefing") {
        // Check if uploadArray is a string
        if (typeof uploadArray === "string") {
          documents = [{ upload: uploadArray }];
        } else {
          // Assume it's an array and wrap the first element
          documents = [{ upload: uploadArray[0] }];
        }
      } else {
        // For other categories, parse the documents
        documents = parseDocuments(uploadArray[0]);
      }
    }

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

  // Updated rendering for personal details to handle arrays
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
    <section className="py-8 bg-gray-50 rounded-lg">
      <div ref={mainRef} >
      <h6 className="uppercase text_size_5 my-3">Personal Details:</h6>
      <div ref={mainRef}  className="flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Personal details */}
        <div className="flex-1">{renderDetails(personalDetails)}</div>
        <div className="w-[250px] h-[350px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
          <img
            src={imageUrl || "/path/to/default-photo.jpg"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Educational details */}
      <section className="py-8 bg-gray-50 rounded-lg">
        <h6 className="uppercase text_size_5  my-3">Education Details:</h6>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="flex-1">{renderDetails(educationalDetails)}</div>
          <div className="w-[250px] rounded-lg overflow-hidden "> </div>
        </div>
      </section>
      </div>

      {/* Document categories */}

      <div className="mt-8">
        <h6 className="uppercase text_size_5  my-3">Uploaded Documents:</h6>
        {renderDocumentCategory(inducBriefUp, "Induction Briefing")}
      </div>

      <div className="mt-8">
        <h6 className="uppercase text_size_5  my-3">Uploaded Documents:</h6>
        {renderDocumentCategory([myIcUpload], "Brunei IC")}

        {renderDocumentCategory([bwnUpload], "Malaysian IC")}

        {renderDocumentCategory([ppUpload], "Passport Copy")}

        {renderDocumentCategory([cvCertifyUpload], "CV & Certificates")}

        {renderDocumentCategory([applicationUpload], "Application Form")}

        {renderDocumentCategory([loiUpload], "LOI")}

        {renderDocumentCategory([paafCvevUpload], "PAAF/CVEV Approval")}

        {renderDocumentCategory([supportDocUpload], "Supporting Documents")}
      </div>
    </section>
  );
};

export default PersonalDetailsView;