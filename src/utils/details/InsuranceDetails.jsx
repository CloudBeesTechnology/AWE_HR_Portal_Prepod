import React, { useState, useEffect } from "react";
import { getUrl } from "@aws-amplify/storage";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa";
import { Viewer, Worker, Page } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const InsuranceDetails = ({
  insuranceInfo,
  depInsurance,
  invoiceRef,
  handlePrint,
  formatDate,
  empInsUpload,
  mainRef,
}) => {
  const [viewingDocument, setViewingDocument] = useState(null); // Document URL or file being viewed
  const [pageNumber, setPageNumber] = useState(1); // For paginated PDF documents
  const [numPages, setNumPages] = useState(null); // Total pages in the document
  const [dependInsurance, setDependInsurance] = useState([]);
  const [lastUploadUrl, setPPLastUP] = useState(""); // State to store the last uploaded file's URL

  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });
      // console.log("File URL:", result.url.href); // Use .href to extract the URL as a string
      setPPLastUP(result.url.href); // Store the URL as a string
      setViewingDocument(pathUrl); // Update the state to show the selected document
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };

  // Function to handle document loading success (for pagination)
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1); // Reset to first page when a new document is loaded
  };

  const handleDocumentClick = (document) => {
    // Toggle visibility of the document
    setViewingDocument(
      viewingDocument === lastUploadUrl() ? null : document.upload
    );
  };

  useEffect(() => {
    // Check if depInsurance is an array and not empty
    if (Array.isArray(depInsurance) && depInsurance.length > 0) {
      // Check if the data at depInsurance[0] is a stringified JSON array
      if (typeof depInsurance[0] === "string") {
        try {
          // Parse the string to remove escape characters if needed
          const parsedString = JSON.parse(depInsurance[0]);
          setDependInsurance(parsedString);
        } catch (error) {
          console.error("Error parsing depInsurance:", error);
        }
      } else {
        setDependInsurance(depInsurance);
      }
    }
  }, [depInsurance]);

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

  const renderDocumentsUnderCategory = (documents) => {
    if (!Array.isArray(documents)) {
      return (
        <p className="text-dark_grey font-semibold text-sm">
          No documents available.
        </p>
      );
    }
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
                    <div ref={invoiceRef} className="flex justify-center">
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={lastUploadUrl || ""} />
                        {/* <Page pageNumber={pageNumber} className="mx-auto" /> */}
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

  if (!Array.isArray(dependInsurance) || dependInsurance.length === 0) {
    return <p>There was an error processing the dependent insurance data.</p>;
  }

  const renderDocumentCategory = (uploadArray, categoryName) => {
    const documents =
      uploadArray && uploadArray.length > 0
        ? parseDocuments(uploadArray[0])
        : [];

    return (
      <div className="py-4">
        <h6 className="uppercase text-xl font-semibold text-dark_grey ">
          {categoryName}
        </h6>
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
  const renderPersonalDetails = () => {
    return (
      <div className="grid grid-cols-3 gap-y-4 items-center font-semibold text-sm">
        {Object.entries(insuranceInfo).map(([key, value], index) => (

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
    <section ref={mainRef} className="py-3">
      <h6 className="uppercase text_size_5 my-3">Insurance Details:</h6>
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex-1">
          <div className="flex-1">{renderPersonalDetails()}</div>
        </div>
      </div>
      <div className="mt-8">
        <h6 className="uppercase text_size_5  my-3">Uploaded Documents:</h6>
        {renderDocumentCategory(empInsUpload, "Employee Insurance Details")}
      </div>

      <div className="flex flex-col gap-8 mt-6">
        {dependInsurance.map((depend, index) => (
          <div
            key={index}
            className="depend-detail mb-6 p-4 border rounded-lg shadow-md bg-white mt-4"
          >
            {/* Dependent's Name */}
            <h3 className="uppercase text_size_5  my-3">
              Dependent {index + 1}
            </h3>

            {/* Passport Details */}
            <div className="grid grid-cols-3 gap-y-4 items-center font-semibold text-sm">
              <span className="text-dark_grey">Insurance Type</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.depenInsType || "N/A"}
              </span>

              <span className="text-dark_grey">Dependent Name</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.depenName || "N/A"}
              </span>
              <span className="text-dark_grey">Relation</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.depenRelation || "N/A"}
              </span>

              <span className="text-dark_grey">Gender</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.depenGender || "N/A"}
              </span>

              <span className="text-dark_grey">Date of Birth</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend.depenDob) || "N/A"}
              </span>

              <span className="text-dark_grey">Nationality</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.depenNation || "N/A"}
              </span>

              <span className="text-dark_grey">Other Nation</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.depenotherNation || "N/A"}
              </span>

              <span className="text-dark_grey">Birth Certificate No</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.depenBcNo || "N/A"}
              </span>

              <span className="text-dark_grey">Brunei I/C Number</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.depenIcNumber || "N/A"}
              </span>

              <span className="text-dark_grey">
                Passport Number for Non-Local
              </span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.depenPpNo || "N/A"}
              </span>

              {/* <span className="text-dark_grey">Passport Expiry Date</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">{depend.depenPpE || "N/A"}</span> */}

              <span className="text-dark_grey">
                Group Insurance Effective Date
              </span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend.depenGroupInsEffect) || "N/A"}
              </span>
              <span className="text-dark_grey">Group Insurance End Date</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend.depenGroupInsEnd) || "N/A"}
              </span>

              <span className="text-dark_grey">
                Travel Insurance Effective Date
              </span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend.depenTravelInsEffect) || "N/A"}
              </span>
              <span className="text-dark_grey">Travel Insurance End Date</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend.depenTravelInsEnd) || "N/A"}
              </span>

              <span className="text-dark_grey">
                Person Insurance Effective Date
              </span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend.depenPersonInsEffect) || "N/A"}
              </span>

              <span className="text-dark_grey">Person Insurance End Date</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend.depenPersonInsEnd) || "N/A"}
              </span>
            </div>

            {/* Uploaded Documents */}
            <div className="uploads mt-6">
              <h4 className="uppercase text_size_5  my-3">
                Uploaded Documents:
              </h4>
              {depend.depenInfUpload && depend.depenInfUpload.length > 0 ? (
                renderDocumentsUnderCategory(JSON.parse(depend.depenInfUpload))
              ) : (
                <p>No documents uploaded.</p>
              )}
            </div>

            {/* Status */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default InsuranceDetails;
