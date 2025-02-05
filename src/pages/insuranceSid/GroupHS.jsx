import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "../../utils/FormField";
import { FileUploadField } from "../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../utils/SpinLogo";
import { GroupHSSchema } from "../../services/EmployeeValidation";
import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
import { generateClient } from "@aws-amplify/api";
import { createGroupHandS } from "../../graphql/mutations";
import { listGroupHandS } from "../../graphql/queries";
import { FaTimes, FaDownload, FaPrint } from "react-icons/fa";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { getUrl } from "@aws-amplify/storage";
import { useReactToPrint } from "react-to-print";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
export const GroupHS = () => {
  const client = generateClient();

  const [uploadedFileNames, setUploadedFileNames] = useState({
    groupHSUpload: null,
  });
  const [uploadGHsU, setUploadGHsU] = useState({
    groupHSUpload: [],
  });
  const [notification, setNotification] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [viewingDocument, setViewingDocument] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [lastUploadUrl, setPPLastUP] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, setError }, // Destructure setError here
  } = useForm({
    resolver: yupResolver(GroupHSSchema),
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Adds leading zero if day is single digit
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-11, so we add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const groupPrint = useRef();

  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });
      //   console.log("File URL:", result.url.href); // Use .href to extract the URL as a string
      setPPLastUP(result.url.href); // Store the URL as a string
      setViewingDocument(pathUrl); // Update the state to show the selected document
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };

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

  const handleFileChange = async (e, label) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["application/pdf"];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file ");
      return;
    }

    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);

    try {
      await uploadDocs(selectedFile, label, setUploadGHsU);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.log(err);
    }
  };


  const handlePrint = useReactToPrint({
    content: () => groupPrint.current,
    onBeforePrint: () => console.log("Preparing to print PDF..."),
    onAfterPrint: () => console.log("Print complete"),
    pageStyle: `
        @page {
            /* Adjust the margin as necessary */
          height:  714px;
          padding: 22px, 0px, 22px, 0px;     
        }
      `,
  });

  const openModal = (uploadUrl) => {
    setPPLastUP(uploadUrl);
    setViewingDocument(uploadUrl);
  };

  const closeModal = () => {
    setViewingDocument(null);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

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

            {viewingDocument === document.upload &&
              document.upload.endsWith(".pdf") && (
                <div className="py-6 fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50">
                  <div className="relative bg-white rounded-lg shadow-lg w-[40vw] max-h-full flex flex-col">
                    {/* PDF Viewer */}
                    <div ref={groupPrint} className="flex-grow overflow-y-auto">
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
                  <div>
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
  const renderDocumentCategory = (uploadArray, categoryName) => {
    const documents =
      uploadArray.length > 0 ? parseDocuments(uploadArray[0]) : [];

    // Check if documents is an array and has items
    const isValidDocumentsArray =
      Array.isArray(documents) && documents.length > 0;

    return (
      <div className="py-4 ">
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

  const onSubmit = async (data) => {
    try {
      const GHSreValue = {
        ...data,
        groupHSUpload: JSON.stringify(uploadGHsU.groupHSUpload),
      };
      // console.log(GHSreValue);

      const response = await client.graphql({
        query: createGroupHandS,
        variables: { input: GHSreValue },
      });

      // console.log("Successfully submitted data:", response);
      setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        let allInsuranceData = [];
        let nextToken = null;
  
        do {
          const response = await client.graphql({
            query: listGroupHandS,
            variables: {
              nextToken: nextToken,
            },
          });
  
          const items = response?.data?.listGroupHandS?.items || [];
  
          allInsuranceData = [...allInsuranceData, ...items];
  
          nextToken = response?.data?.listGroupHandS?.nextToken;
        } while (nextToken);
  
        const filteredData = allInsuranceData.filter((data) => {
          const expiryDate = new Date(data.groupHSExp);
          return expiryDate >= new Date();
        });
  
        setInsuranceData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
        setError("insuranceData", { message: "Error fetching data" });
        setLoading(false);
      }
    };
  
    fetchInsuranceData();
  }, []);

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto py-5 px-10 my-10 bg-[#F5F6F1CC]"
      >
        {/* Group H&S Insurance Fields */}
        <h3 className="mb-5 text-lg font-bold">Group H&S Insurance</h3>
        <div className="relative mb-5">
          <div className="grid grid-cols-3 gap-4 items-center">
            <FormField
              name="groupHSNo"
              type="text"
              placeholder="Enter H&S Policy Number"
              label="Policy Number"
              register={register}
              errors={errors}
            />
            <FormField
              name="groupHSExp"
              type="date"
              label="Expiry Date"
              register={register}
              errors={errors}
            />
            <div className="mb-2 relative">
              <FileUploadField
                label="Upload File"
                onChangeFunc={(e) => handleFileChange(e, "groupHSUpload")}
                register={register}
                name="groupHSUpload"
                error={errors}
              />
              <div className="absolute">
                {uploadedFileNames.groupHSUpload && (
                  <span className="text-sm text-grey ">
                    {uploadedFileNames.groupHSUpload}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="center my-10">
          <button type="submit" className="primary_btn">
            Save
          </button>
        </div>
      </form>

      {notification && (
        <SpinLogo
          text="Group H&S Saved Successfully"
          notification={notification}
          path="/insuranceHr/groupHS"
        />
      )}
      {/* View Insurance Info Section */}
      <div className="mt-10">
        <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
          View Insurance Info
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : insuranceData.length > 0 ? (
          <div className=" h-[400px] overflow-y-auto scrollBar">
            <table className="w-full text-center ">
              <thead className="bg-[#939393] text-white ">
                <tr>
                  <th className="pl-4 py-4 rounded-tl-lg">Policy Number</th>
                  <th className="pl-4 py-4">Expiry Date</th>
                  <th className="pl-4 py-4 rounded-tr-lg">Uploaded File</th>
                </tr>
              </thead>
              <tbody className="bg-white cursor-pointer  ">
                {insuranceData.map((data, index) => (
                  <tr
                    key={index}
                    className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue "
                  >
                    <td className="pl-4 py-4">{data.groupHSNo}</td>
                    <td className="py-4 px-4">
                      {formatDate(data?.groupHSExp || "N/A")}
                    </td>
                    <td className="pl-4 py-4">
                      {renderDocumentCategory(data.groupHSUpload, "PDF File")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-10">
            No insurance information available.
          </p>
        )}
      </div>
      {/* Popup */}
      {popupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
            <button
              onClick={() => setPopupVisible(false)}
              className="absolute top-2 right-2"
            >
              <FaTimes size={20} />
            </button>
            {popupImage.endsWith(".pdf") ? (
              <Worker
                workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
                file={popupImage}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
                <div className="text-center mt-2">
                  <button
                    onClick={() =>
                      setPageNumber((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={pageNumber <= 1}
                  >
                    Previous
                  </button>
                  <span>
                    {pageNumber} / {numPages}
                  </span>
                  <button
                    onClick={() =>
                      setPageNumber((prev) => Math.min(prev + 1, numPages))
                    }
                    disabled={pageNumber >= numPages}
                  >
                    Next
                  </button>
                </div>
              </Worker>
            ) : (
              <img
                src={popupImage}
                alt="popup view"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};
