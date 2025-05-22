import React, { useState, useEffect, useRef } from "react";
import { getUrl } from "@aws-amplify/storage";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa";
import { Viewer, Worker, Page } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import { useReactToPrint } from "react-to-print";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const InsuranceDetails = ({
  insuranceInfo,
  depInsurance,
  invoiceRef,
  formatDate,
  empInsUpload,
  mainRef,
  InsuranceClaim,
}) => {
  const [viewingDocument, setViewingDocument] = useState(null);
  const [dependInsurance, setDependInsurance] = useState([]);
  const [insClaim, setInsClaim] = useState([]);
  const [lastUploadUrl, setPPLastUP] = useState("");
  const insurance = useRef();

  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });

      setPPLastUP(result.url.href);
      setViewingDocument(pathUrl);
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };

  console.log("WK", insuranceInfo);

  useEffect(() => {
    if (Array.isArray(depInsurance) && depInsurance.length > 0) {
      if (typeof depInsurance[0] === "string") {
        try {
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

  useEffect(() => {
    if (Array.isArray(InsuranceClaim) && InsuranceClaim.length > 0) {
      if (typeof InsuranceClaim[0] === "string") {
        try {
          const parsedString = JSON.parse(InsuranceClaim[0]);
          setInsClaim(parsedString);
        } catch (error) {
          console.error("Error parsing depInsurance:", error);
        }
      } else {
        setInsClaim(InsuranceClaim);
      }
    }
  }, [InsuranceClaim]);

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
    content: () => insurance.current,
    onBeforePrint: () => console.log("Preparing to print PDF..."),
    onAfterPrint: () => console.log("Print complete"),
    pageStyle: `
          @page {    
            height:  714px;
            padding: 22px, 0px, 22px, 0px;    
          }
        `,
  });

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
                    <div ref={insurance} className="flex-grow overflow-y-auto">
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
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
            <p className="text-dark_grey font-semibold text-sm">
              No documents available
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderPersonalDetails = (details) => {
    const capitalizeWords = (str) => {
      if (!str || str === "N/A") {
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
        {Object.entries(insuranceInfo).map(([key, value], index) => (
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
    <section ref={mainRef} className="py-3 px-10">
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
                {depend?.depenInsType || "N/A"}
              </span>

              <span className="text-dark_grey">Dependent Name</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend?.depenName || "N/A"}
              </span>
              <span className="text-dark_grey">Relation</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend?.depenRelation || "N/A"}
              </span>

              <span className="text-dark_grey">Gender</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend?.depenGender || "N/A"}
              </span>

              <span className="text-dark_grey">Date of Birth</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend?.depenDob) || "N/A"}
              </span>

              <span className="text-dark_grey">Nationality</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend?.depenNation || "N/A"}
              </span>

              <span className="text-dark_grey">Other Nation</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend?.depenotherNation || "N/A"}
              </span>

              <span className="text-dark_grey">Birth Certificate No</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend?.depenBcNo || "N/A"}
              </span>

              <span className="text-dark_grey">Brunei I/C Number</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend?.depenIcNumber || "N/A"}
              </span>

              <span className="text-dark_grey">
                Passport Number for Non-Local
              </span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend?.depenPpNo || "N/A"}
              </span>

              {/* <span className="text-dark_grey">Passport Expiry Date</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">{depend.depenPpE || "N/A"}</span> */}

              <span className="text-dark_grey">
                Group Insurance Effective Date
              </span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend?.depenGroupInsEffect) || "N/A"}
              </span>
              <span className="text-dark_grey">Group Insurance End Date</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend?.depenGroupInsEnd) || "N/A"}
              </span>

              <span className="text-dark_grey">
                Travel Insurance Effective Date
              </span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend?.depenTravelInsEffect) || "N/A"}
              </span>
              <span className="text-dark_grey">Travel Insurance End Date</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend?.depenTravelInsEnd) || "N/A"}
              </span>

              <span className="text-dark_grey">
                Person Insurance Effective Date
              </span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend?.depenPersonInsEffect) || "N/A"}
              </span>

              <span className="text-dark_grey">Person Insurance End Date</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend?.depenPersonInsEnd) || "N/A"}
              </span>
            </div>

            {/* Uploaded Documents */}
            <div className="uploads mt-6">
              <h4 className="uppercase text_size_5  my-3">
                Uploaded Documents:
              </h4>
              {depend?.depenInfUpload && depend?.depenInfUpload?.length > 0 ? (
                renderDocumentsUnderCategory(JSON.parse(depend?.depenInfUpload))
              ) : (
                <p>No documents uploaded.</p>
              )}
            </div>

            {/* Status */}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8 mt-6">
        {insClaim.map((depend, index) => (
          <div
            key={index}
            className="depend-detail mb-6 p-4 border rounded-lg shadow-md bg-white mt-4"
          >
            {/* Dependent's Name */}
            <h3 className="uppercase text_size_5  my-3">
              Insurance claim {index + 1}
            </h3>

            {/* Passport Details */}
            <div className="grid grid-cols-3 gap-y-4 items-center font-semibold text-sm">
              <span className="text-dark_grey">Type of Insurance Claim</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.claimType || "N/A"}
              </span>

              <span className="text-dark_grey">Insurance Claim For</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.claimInfo || "N/A"}
              </span>

              <span className="text-dark_grey">Clainmant Name</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {depend.claimantName || "N/A"}
              </span>
              <span className="text-dark_grey">
                Date Reported to Insurance Company
              </span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend.dateReported) || "N/A"}
              </span>

              <span className="text-dark_grey">Date of Payment Received</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend.datePaid) || "N/A"}
              </span>

              <span className="text-dark_grey">Date Paid to Employee</span>
              <span className="text-center text-gray-700">:</span>
              <span className="text-dark_grey">
                {formatDate(depend.paymentReceived) || "N/A"}
              </span>
            </div>

            {/* Uploaded Documents */}
            <div className="uploads mt-6">
              <h4 className="uppercase text_size_5  my-3">
                Uploaded Documents:
              </h4>
              {depend.claimUpload && depend.claimUpload.length > 0 ? (
                renderDocumentsUnderCategory(JSON.parse(depend.claimUpload))
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
