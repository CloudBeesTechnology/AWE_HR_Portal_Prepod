import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../services/uploadsDocsS3/UploadDocs";
import { FormField } from "../../utils/FormField";
import { FileUpload } from "../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../utils/SpinLogo";
import { TravellingSchema } from "../../services/EmployeeValidation";
import { generateClient } from "@aws-amplify/api";
import { createTravelIns } from "../../graphql/mutations";
import { listTravelIns } from "../../graphql/queries";
import { FaTimes, FaDownload, FaPrint } from "react-icons/fa";
import { Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { getUrl } from "@aws-amplify/storage";
import { DeleteTravellingUp } from "./DeleteUpload/DeleteTravellingUp";
import { handleDeleteFile } from "../../services/uploadsDocsS3/DeleteDocs";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useReactToPrint } from "react-to-print";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const Travelling = () => { 
  const client = generateClient();

  const [isUploading, setIsUploading] = useState({
    travelUp: false,
      });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    travelUp: null,
  });

  const [uploadTU, setUploadTU] = useState({
    travelUp: [],
  });

  const [notification, setNotification] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To track error state
  const travelPrint = useRef();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [viewingDocument, setViewingDocument] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [lastUploadUrl, setPPLastUP] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TravellingSchema),
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-11, so we add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

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

const updateUploadingState = (label, value) => {
      setIsUploading((prev) => ({
        ...prev,
        [label]: value,
      }));
      console.log(value);
    };
  
    const handleFileChange = async (e, label) => {
      const travelNo = watch("travelNo");
      if (!travelNo) {
          alert("Please enter the Policy Number before uploading files.");
          window.location.href = "/insuranceHr";
          return;
      }
  
      const selectedFile = e.target.files[0];
      if (!selectedFile) return;
  
      const allowedTypes = [
        "application/pdf",
       
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
          alert("Upload must be a PDF file.");
          return;
      }
  
      // Ensure no duplicate files are added
      const currentFiles = watch(label) || [];
      if (currentFiles.some((file) => file.name === selectedFile.name)) {
          alert("This file has already been uploaded.");
          return;
      }
  
      setValue(label, [...currentFiles, selectedFile]);
  
      try {
        updateUploadingState(label, true);
        await uploadDocs(selectedFile, label, setUploadTU, travelNo);
        setUploadedFileNames((prev) => ({
          ...prev,
          [label]: selectedFile.name,
        }));
      } catch (err) {
          console.error(err);
      }
    };
  
    const deleteFile = async (fileType, fileName) => {
      try {
        const travelNo = watch("travelNo");
        if (!travelNo) {
          alert("Please provide the Policy Number before deleting files.");
          return;
        }
  
        const isDeleted = await handleDeleteFile(
          fileType,
          fileName,
          travelNo
        );
        const isDeletedArrayUploaded = await DeleteTravellingUp(
          fileType,
          fileName,
          travelNo,
          setUploadedFileNames,
          setUploadTU,
          setIsUploading
        );
  
        if (!isDeleted || isDeletedArrayUploaded) {
          console.error(
            `Failed to delete file: ${fileName}, skipping UI update.`
          );
          return;
        }
        // console.log(`Deleted "${fileName}". Remaining files:`);
      } catch (error) {
        console.error("Error deleting file:", error);
        alert("Error processing the file deletion.");
      }
    };

  const openPopup = (fileUrl) => {
    setPopupImage(fileUrl); // Set the URL for the image or file
    setPopupVisible(true); // Show the popup
  };

  // const handlePrint = useReactToPrint({
  //     content: () => travelPrint.current,
  //     onBeforePrint: () => console.log("Preparing print..."),
  //     onAfterPrint: () => console.log("Print complete"),
  //     pageStyle: "print", // This ensures the print view uses a different CSS style
  //   });

  const handlePrint = useReactToPrint({
    content: () => travelPrint.current,
    onBeforePrint: () => console.log("Preparing to print PDF..."),
    onAfterPrint: () => console.log("Print complete"),
    pageStyle: `
      @page {
          /* Adjust the margin as necessary */
        height:  714px;
        padding-top: 87px  
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

            {/* Conditional rendering of PDF or image */}
            {viewingDocument === document.upload &&
              document.upload.endsWith(".pdf") && (
                <div className="py-6 fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50">
                  <div className="relative bg-white rounded-lg shadow-lg w-[40vw] max-h-full flex flex-col">
                    {/* PDF Viewer */}
                    <div ref={travelPrint} className="flex-grow overflow-y-auto">
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

  const onSubmit = async (data) => {
    try {
      const TravellCreValue = {
        ...data,
        travelUp: JSON.stringify(uploadTU.travelUp),
      };
      // console.log(TravellCreValue);

      const response = await client.graphql({
        query: createTravelIns,
        variables: { input: TravellCreValue },
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
        let allTravelIns = [];
        let nextToken = null;
  
        do {
          const response = await client.graphql({
            query: listTravelIns,
            variables: {
              nextToken: nextToken,
            },
          });
  
          const items = response?.data?.listTravelIns?.items || [];
  
          allTravelIns = [...allTravelIns, ...items];
  
          nextToken = response?.data?.listTravelIns?.nextToken;
        } while (nextToken);
  
        const filteredData = allTravelIns.filter((data) => {
          const expiryDate = new Date(data.travelExp);
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
        {/* Travelling Insurance Fields */}
        <h3 className="mb-5 text-lg font-bold">Travelling Insurance</h3>
        <div className="relative mb-10">
          <div className="grid grid-cols-3 gap-4 items-center">
            <FormField
              name="travelNo"
              type="text"
              placeholder="Enter Travelling Policy Number"
              label="Policy Number"
              register={register}
              errors={errors}
              className="mt-2 p-[12px] bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
            />

            {/* Travelling Expiry Date */}
            <FormField
              name="travelExp"
              type="date"
              label="Expiry Date"
              register={register}
              errors={errors}
              className="mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
            />

            {/* File Upload */}
            <div className="mb-2 relative">
              <FileUpload
                label="Upload File"
                onChangeFunc={(e) => handleFileChange(e, "travelUp")}
                handleFileChange={handleFileChange}
                uploadedFileNames={uploadedFileNames}
                isUploading={isUploading}
                deleteFile={deleteFile}
                register={register}
                name="travelUp"
                error={errors}
              />
              {/* <div className="absolute">
                {uploadedFileNames.travelUp && (
                  <span className="text-sm text-grey ">
                    {uploadedFileNames.travelUp}
                  </span>
                )}
              </div> */}
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
          text="Travelling Info Saved Successfully"
          notification={notification}
          path="/insuranceHr/travelling"
        />
      )}

      {/* View Insurance Info Section */}
      <div className="mt-20">
        <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
          View Insurance Info
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : insuranceData.length > 0 ? (
          <div className=" h-[400px] overflow-y-auto scrollBar">
            <table className="w-full text-center">
              <thead className="bg-[#939393] text-white">
                <tr>
                  <th className="pl-4 py-4 rounded-tl-lg">Policy Number</th>
                  <th className="pl-4 py-4">Expiry Date</th>
                  <th className="pl-4 py-4 rounded-tr-lg">Uploaded File</th>
                </tr>
              </thead>
              <tbody className="bg-white cursor-pointer">
                {insuranceData.map((data, index) => (
                  <tr
                    key={index}
                    className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                  >
                    <td className="pl-4 py-4">{data.travelNo}</td>
                    <td className="py-4 px-4">
                      {formatDate(data?.travelExp || "N/A")}
                    </td>
                    <td className="pl-4 py-4">
                      {renderDocumentCategory(data.travelUp, "PDF File")}
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
