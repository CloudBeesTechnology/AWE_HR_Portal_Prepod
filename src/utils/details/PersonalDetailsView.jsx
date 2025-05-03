// import React, { useState, useRef } from "react";
// import { FaTimes, FaPrint, FaDownload } from "react-icons/fa";
// import { getUrl } from "@aws-amplify/storage";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { pdfjs } from "react-pdf";
// import { useReactToPrint } from "react-to-print";
// import defaultAvatar from "../../assets/navabar/defaultAvatar.jpg";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

// const PersonalDetailsView = ({
//   personalDetails,
//   educationalDetails,
//   profilePhoto,
//   applicationUpload,
//   bwnUpload,
//   cvCertifyUpload,
//   loiUpload,
//   myIcUpload,
//   paafCvevUpload,
//   ppUpload,
//   supportDocUpload,
//   inducBriefUp,
//   invoiceRef,
//   formatDate,
//   mainRef,
// }) => {
//   const [viewingDocument, setViewingDocument] = useState(null);
//   const [lastUploadUrl, setPPLastUP] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const personal = useRef();

//   console.log("Personal", personalDetails);
//   console.log("Educ", educationalDetails);

//   // Helper function to fetch the cloud URL
//   const linkToStorageFile = async (pathUrl) => {
//     if (!pathUrl) {
//       console.error("No URL provided for the file.");
//       return;
//     }
//     try {
//       const result = await getUrl({ path: pathUrl });

//       setPPLastUP(result.url.href);
//       setViewingDocument(pathUrl);
//     } catch (error) {
//       console.error("Error fetching the file URL:", error);
//     }
//   };

//   const linkToImageFile = async (pathUrl) => {
//     if (!pathUrl) {
//       console.error("No URL provided for the file.");
//       return;
//     }

//     const result = await getUrl({
//       path: pathUrl,
//     });
//     return setImageUrl(result.url.toString());
//   };
//   linkToImageFile(profilePhoto);

//   // Function to parse the uploaded document
//   const parseDocuments = (docData) => {
//     try {
//       const parsedData = JSON.parse(docData);
//       if (Array.isArray(parsedData)) {
//         return parsedData.map((doc) => {
//           if (doc.upload) {
//             doc.fileName = doc.upload.split("/").pop();
//           }
//           return doc;
//         });
//       }
//       return [];
//     } catch (error) {
//       console.error("Error parsing document data:", error);
//       return [];
//     }
//   };

//   const closeModal = () => {
//     setViewingDocument(null);
//   };

//   const handlePrint = useReactToPrint({
//     content: () => personal.current,
//     onBeforePrint: () => console.log("Preparing to print PDF..."),
//     onAfterPrint: () => console.log("Print complete"),
//     pageStyle: `
//         @page {
//           height:  714px;
//           padding: 22px, 0px, 22px, 0px;
//         }
//       `,
//   });

//   // Function to render documents under a single category

//   const renderDocumentsUnderCategory = (documents) => {
//     return (
//       <>
//         {documents.map((document, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
//           >
//             <div className="flex justify-between items-center">
//               <span className="uppercase font-semibold text-sm">
//                 Uploaded on: {formatDate(document.date)}
//               </span>
//               <button
//                 onClick={() => linkToStorageFile(document.upload)}
//                 className="text-dark_grey font-semibold text-sm"
//               >
//                 View Document
//               </button>
//             </div>

//             {/* Conditional rendering of PDF or image */}
//             {viewingDocument === document.upload &&
//               document.upload.endsWith(".pdf") && (
//                 <div className="py-6 fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50">
//                   <div className="relative bg-white rounded-lg shadow-lg w-[40vw] max-h-full flex flex-col">
//                     {/* PDF Viewer */}
//                     <div ref={personal} className="flex-grow overflow-y-auto">
//                       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//                         <Viewer fileUrl={lastUploadUrl || ""} />
//                       </Worker>
//                     </div>

//                     <div className="absolute top-2 right-2">
//                       <button
//                         onClick={closeModal}
//                         className="text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
//                       >
//                         <FaTimes />
//                       </button>
//                     </div>

//                     <div className="flex items-center justify-center gap-6 py-4">
//                       <div className="mt-2 flex">
//                         <button className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2">
//                           <a href={lastUploadUrl} download>
//                             Download
//                           </a>
//                           <FaDownload className="ml-2 mt-1" />
//                         </button>
//                       </div>
//                       <div className="mt-2 flex">
//                         <button
//                           onClick={handlePrint}
//                           className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
//                         >
//                           Print
//                           <FaPrint className="ml-2 mt-1" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             {/* Image Viewer */}
//             {viewingDocument === document.upload &&
//               !document.upload.endsWith(".pdf") && (
//                 <div className="mt-4">
//                   <div className="relative invoice-content bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
//                     <div
//                       ref={invoiceRef}
//                       className="pdfViewerflex justify-center border h-auto"
//                     >
//                       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//                         <Viewer fileUrl={lastUploadUrl || ""} />
//                       </Worker>
//                     </div>

//                     {/* Close Button */}
//                     <div className="absolute top-2 right-2">
//                       <button
//                         onClick={() => setViewingDocument(null)}
//                         className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
//                       >
//                         <FaTimes />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-center gap-6 py-4">
//                     <div className="mt-2 flex">
//                       <button className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2">
//                         <a href={lastUploadUrl} download>
//                           Download
//                         </a>
//                         <FaDownload className="ml-2 mt-1" />
//                       </button>
//                     </div>
//                     <div className="mt-2 flex">
//                       <button
//                         onClick={handlePrint}
//                         className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
//                       >
//                         Print
//                         <FaPrint className="ml-2 mt-1" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//           </div>
//         ))}
//       </>
//     );
//   };

//   const renderDocumentCategory = (uploadArray, categoryName) => {
//     let documents = [];

//     if (uploadArray && uploadArray.length > 0) {
//       if (categoryName === "Induction Briefing") {
//         if (typeof uploadArray === "string") {
//           documents = [{ upload: uploadArray }];
//         } else {
//           documents = [{ upload: uploadArray[0] }];
//         }
//       } else {
//         documents = parseDocuments(uploadArray[0]);
//       }
//     }

//     return (
//       <div className="py-4">
//         <h6 className="uppercase text_size_5 my-3">{categoryName}</h6>
//         {documents.length > 0 ? (
//           renderDocumentsUnderCategory(documents)
//         ) : (
//           <p className="text-dark_grey font-semibold text-sm">
//             No documents available
//           </p>
//         )}
//       </div>
//     );
//   };

//   // Updated rendering for personal details to handle arrays
//   const renderDetails = (details) => {
//     const capitalizeWords = (str) => {
//       if (typeof str !== "string" || str === "N/A") {
//         return "N/A";
//       }

//       return str
//         .split(" ")
//         .map(
//           (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//         )
//         .join(" ");
//     };

//     return (
//       <div className="grid grid-cols-3 gap-y-4 items-center font-semibold text-sm">
//         {Object.entries(details).map(([key, value], index) => (
//           <React.Fragment key={index}>
//             <span className="text-dark_grey">{key}</span>
//             <span className="text-center text-gray-700">:</span>
//             <span className="text-dark_grey">
//               {
//                 Array.isArray(value)
//                   ? value.length > 0
//                     ? value
//                         .map((v, idx, arr) => {

//                           if (v === null || v === undefined || v === "") {
//                             return "N/A";
//                           }

//                           return v.toLowerCase() === arr[idx - 1]?.toLowerCase()
//                             ? null
//                             : v;
//                         })
//                         .filter((v, idx, arr) => v !== null)
//                         .reduce((acc, item) => {

//                           if (item === "N/A" && acc[acc.length - 1] !== "N/A") {
//                             acc.push("N/A");
//                           } else if (item !== "N/A") {
//                             acc.push(item);
//                           }
//                           return acc;
//                         }, [])
//                         .reverse()
//                         .map((item, idx, arr) => {

//                           return (
//                             <span key={idx}>
//                               <span
//                                 className={`${
//                                   arr.length > 1 && idx === 0
//                                     ? "rounded-md font-black italic"
//                                     : ""
//                                 }`}
//                               >
//                                 {capitalizeWords(item)}{" "}

//                               </span>
//                               {idx < arr.length - 1 && <span>,&nbsp;</span>}{" "}

//                             </span>
//                           );
//                         })
//                     : "N/A"
//                   : value === null || value === undefined || value === ""
//                   ? "N/A"
//                   : capitalizeWords(value)
//               }
//             </span>
//           </React.Fragment>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <section ref={mainRef} className="page py-8 px-10 bg-gray-50 rounded-lg">
//       <div>
//         <h6 className="uppercase text_size_5 my-3">Personal Details:</h6>
//         <div className="flex flex-col md:flex-row items-start justify-between gap-8">
//           {/* Personal details */}
//           <div className="flex-1">{renderDetails(personalDetails)}</div>
//           <div className="w-[138px] h-[177px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
//             <img
//               src={imageUrl || defaultAvatar}
//               alt="Profile"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>

//         {/* Educational details */}
//         <section className="py-8 bg-gray-50 rounded-lg">
//           <h6 className="uppercase text_size_5  my-3">Education Details:</h6>
//           <div className="flex flex-col md:flex-row items-start justify-between gap-8">
//             <div className="flex-1">{renderDetails(educationalDetails)}</div>
//             <div className="w-[138px] rounded-lg overflow-hidden "> </div>
//           </div>
//         </section>
//       </div>

//       {/* Document categories */}

//       <div className="mt-8">
//         <h6 className="uppercase text_size_5  my-3">Uploaded Documents:</h6>
//         {renderDocumentCategory(inducBriefUp, "Induction Briefing")}
//       </div>

//       <div className="mt-8">
//         <h6 className="uppercase text_size_5  my-3">Uploaded Documents:</h6>
//         {renderDocumentCategory([bwnUpload], "Brunei IC")}

//         {renderDocumentCategory([myIcUpload], "Malaysian IC")}

//         {renderDocumentCategory([ppUpload], "Passport Copy")}

//         {renderDocumentCategory([cvCertifyUpload], "CV & Certificates")}

//         {renderDocumentCategory([applicationUpload], "Application Form")}

//         {renderDocumentCategory([loiUpload], "LOI")}

//         {renderDocumentCategory([paafCvevUpload], "PAAF/CVEV Approval")}

//         {renderDocumentCategory([supportDocUpload], "Supporting Documents")}
//       </div>
//     </section>
//   );
// };

// export default PersonalDetailsView;
import React, { useState, useRef } from "react";
import { FaTimes, FaPrint, FaDownload } from "react-icons/fa";
import { getUrl } from "@aws-amplify/storage";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import { useReactToPrint } from "react-to-print";
import defaultAvatar from "../../assets/navabar/defaultAvatar.jpg";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PersonalDetailsView = ({
  personalDetails,
  educationalDetails,
  profilePhoto,
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
  const [viewingDocument, setViewingDocument] = useState(null);
  const [lastUploadUrl, setPPLastUP] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const personal = useRef();

  console.log("PersonalDeatils:", personalDetails);

  console.log("Education Details:", educationalDetails);

  // Helper function to fetch the cloud URL
  const linkToStorageFile = async (pathUrl) => {
    if (!pathUrl) {
      console.error("No URL provided for the file.");
      return;
    }
    try {
      const result = await getUrl({ path: pathUrl });
      setPPLastUP(result.url.href);
      setViewingDocument(pathUrl);
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };

  const linkToImageFile = async (pathUrl) => {
    if (!pathUrl) {
      console.error("No URL provided for the file.");
      return;
    }
    const result = await getUrl({ path: pathUrl });
    return setImageUrl(result.url.toString());
  };
  linkToImageFile(profilePhoto);

  // Function to parse the uploaded document
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

  const parseEducationDetails = (eduString) => {
    if (!eduString || eduString === "null" || eduString === "N/A") {
      return null; // Indicates non-JSON content
    }

    // Check if it's a simple string (not JSON)
    if (
      !eduString.trim().startsWith("[") &&
      !eduString.trim().startsWith("{")
    ) {
      return null;
    }

    try {
      // First try to parse directly
      let parsed;
      try {
        parsed = JSON.parse(eduString);
      } catch (firstError) {
        // If direct parse fails, try cleaning the string
        const cleanString = eduString
          .replace(/^\[+/, "[") // Remove extra opening brackets
          .replace(/\]+$/, "]") // Remove extra closing brackets
          .replace(/\\"/g, '"') // Unescape quotes
          .trim();

        parsed = JSON.parse(cleanString);
      }

      // Handle nested array case ([[{...}]])
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        Array.isArray(parsed[0])
      ) {
        return parsed[0];
      }

      // Handle single array case ([{...}])
      if (Array.isArray(parsed)) return parsed;

      // Handle single object case ({...})
      return [parsed];
    } catch (e) {
      console.error("Error parsing education details:", e);
      return null;
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
                    <div ref={personal} className="flex-grow overflow-y-auto">
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={lastUploadUrl || ""} />
                      </Worker>
                    </div>

                    <div className="absolute top-2 right-2">
                      <button
                        onClick={closeModal}
                        className="text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
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
                    <div
                      ref={invoiceRef}
                      className="pdfViewerflex justify-center border h-auto"
                    >
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={lastUploadUrl || ""} />
                      </Worker>
                    </div>

                    {/* Close Button */}
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => setViewingDocument(null)}
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
          </div>
        ))}
      </>
    );
  };

  const renderDocumentCategory = (uploadArray, categoryName) => {
    let documents = [];

    if (uploadArray && uploadArray.length > 0) {
      if (categoryName === "Induction Briefing") {
        if (typeof uploadArray === "string") {
          documents = [{ upload: uploadArray }];
        } else {
          documents = [{ upload: uploadArray[0] }];
        }
      } else {
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

  const renderDetails = (details) => {
    const formatValue = (value) => {
      if (typeof value === "number") return value.toString();

      if (value === null || value === undefined || value === "") return "N/A";

      if (Array.isArray(value)) {

        if (value.length === 0) return "N/A";
 
        if (value.length === 1) return value[0];

        return value.join(", ").trim();
      }

      // Handle string values
      if (typeof value === "string") {
        const cleaned = value.replace(/[\[\]"]/g, "").trim();
        return cleaned === "N/A" || cleaned === "" ? "N/A" : cleaned;
      }

      return value.toString();
    };

    const capitalizeWords = (str) => {
      const val = formatValue(str);
      if (val === "N/A") return "N/A";

      if (!isNaN(val)) return val;

      return val
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
            <span className="text-center">:</span>

            {key === "Education Details" ? (
              <span className="text-dark_grey col-span-1">
                {(() => {
    
                  if (!value || value === "null" || value === "N/A")
                    return "N/A";

                  if (
                    typeof value === "string" &&
                    !value.trim().startsWith("[") &&
                    !value.trim().startsWith("{")
                  ) {
                    return "N/A";
                  }

                  const educationData = parseEducationDetails(value);

                  if (!educationData || educationData.length === 0)
                    return "N/A";

                  return educationData.map((edu, idx) => {
  
                    const education = typeof edu === "object" ? edu : {};

                    return (
                      <div key={idx} className="mb-2 last:mb-0">
                        <div className="font-bold">Education {idx + 1}</div>
                        <div>• University: {education.university || "N/A"}</div>
                        <div>• Degree: {education.degree || "N/A"}</div>
                        <div>
                          • Period: {education.fromDate || "N/A"} to{" "}
                          {education.toDate || "N/A"}
                        </div>
                      </div>
                    );
                  });
                })()}
              </span>
            ) : (
              <span className="text-dark_grey">
                {value === null || value === undefined || value === ""
                  ? "N/A"
                  : capitalizeWords(value)}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  return (
    <section ref={mainRef} className="page py-8 px-10 bg-gray-50 rounded-lg">
      <div>
        <h6 className="uppercase text_size_5 my-3">Personal Details:</h6>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Personal details */}
          <div className="flex-1">{renderDetails(personalDetails)}</div>
          <div className="w-[138px] h-[177px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
            <img
              src={imageUrl || defaultAvatar}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Educational details */}
        <section className="py-8 bg-gray-50 rounded-lg">
          <h6 className="uppercase text_size_5 my-3">Education Details:</h6>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="flex-1">{renderDetails(educationalDetails)}</div>
            <div className="w-[138px] rounded-lg overflow-hidden"> </div>
          </div>
        </section>
      </div>

      {/* Document categories */}
      <div className="mt-8">
        <h6 className="uppercase text_size_5 my-3">Uploaded Documents:</h6>
        {renderDocumentCategory(inducBriefUp, "Induction Briefing")}
      </div>

      <div className="mt-8">
        <h6 className="uppercase text_size_5 my-3">Uploaded Documents:</h6>
        {renderDocumentCategory([bwnUpload], "Brunei IC")}
        {renderDocumentCategory([myIcUpload], "Malaysian IC")}
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
