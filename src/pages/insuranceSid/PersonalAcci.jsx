import React, { useEffect, useRef, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../services/uploadsDocsS3/UploadDocs";
import { FormField } from "../../utils/FormField";
import { FileUpload } from "../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../utils/SpinLogo";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { PersonalAcciSchema } from "../../services/EmployeeValidation";
import { generateClient } from "@aws-amplify/api";
import {
  createPersonalAccident,
  updatePersonalAccident,
} from "../../graphql/mutations";
import { listPersonalAccidents } from "../../graphql/queries";
import { FaDownload, FaPrint, FaTimes } from "react-icons/fa";
import { Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { getUrl } from "@aws-amplify/storage";
import { DeletePersonalAcciUp } from "./DeleteUpload/DeletePersonalAcciUp";
import { handleDeleteFile } from "../../services/uploadsDocsS3/DeleteDocs";
import { useReactToPrint } from "react-to-print";
import { DeletePopup } from "../../utils/DeletePopup";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { DataSupply } from "../../utils/DataStoredContext";
import { Link } from "react-router-dom";
import { InsSearch } from "./InsSearch";
import { useDeleteAccess } from "../../hooks/useDeleteAccess";
import { GoUpload } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const PersonalAcci = () => {
  const client = generateClient();

  const [isUploading, setIsUploading] = useState({
    perAccUp: false,
  });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    perAccUp: null,
  });
  const [uploadPAU, setUploadPAU] = useState({
    perAccUp: [],
  });
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [pageHeight, setPageHeight] = useState("auto");
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Popup State
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [viewingDocument, setViewingDocument] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [lastUploadUrl, setPPLastUP] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pdfHeight, setPdfHeight] = useState("");
  const [pdfWidth, setPdfWidth] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchResultData, setSearchResultData] = useState([]);
  const { formattedPermissions } = useDeleteAccess();
  const { personalAcciData } = useContext(DataSupply);
  const { empID, requiredPermissions, access } = useOutletContext();
  const userType = localStorage.getItem("userID");
  const [trackEmpID, setTrackEmpID] = useState(false);
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PersonalAcciSchema),
  });

  // console.log("J");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
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

  const updateUploadingState = (label, value) => {
    setIsUploading((prev) => ({
      ...prev,
      [label]: value,
    }));
    // console.log(value);
  };

  const handleFileChange = async (e, label) => {
    const perAccNo = watch("perAccNo");
    if (!perAccNo) {
      alert("Please enter the Policy Number before uploading files.");
      window.location.href = "/insuranceHr/personalAcci";
      return;
    }

    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
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
      await uploadDocs(selectedFile, label, setUploadPAU, perAccNo);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };
  const deleteFile = async (fileType, fileName, fileIndex) => {
    try {
      const perAccNo = watch("perAccNo");
      if (!perAccNo) {
        alert("Please provide the Policy Number before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(fileType, fileName, perAccNo);
      const isDeletedArrayUploaded = await DeletePersonalAcciUp(
        fileType,
        fileName,
        fileIndex,
        perAccNo,
        setUploadedFileNames,
        setUploadPAU,
        setIsUploading
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      setdeleteTitle1(`${fileName}`);
      handleDeleteMsg();
      // console.log(`Deleted "${fileName}". Remaining files:`);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        let allPersonalAccidents = [];
        let nextToken = null;

        do {
          const response = await client.graphql({
            query: listPersonalAccidents,
            variables: {
              nextToken: nextToken,
            },
          });

          const items = response?.data?.listPersonalAccidents?.items || [];

          allPersonalAccidents = [...allPersonalAccidents, ...items];

          nextToken = response?.data?.listPersonalAccidents?.nextToken;
        } while (nextToken);

        const filteredData = allPersonalAccidents.filter((data) => {
          const expiryDate = new Date(data.perAccExp);
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

  const searchResult = (result) => {
    // console.log("RW", result);
    setSearchResultData(result);
    if (result) {
      setTrackEmpID(true);
    }
  };

  const getFileName = (input) => {
    if (typeof input === "object" && input.upload) {
      const filePath = input.upload;
      const decodedUrl = decodeURIComponent(filePath);
      return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
    }

    try {
      const urlObj = new URL(input);
      const filePath = urlObj.pathname;
      const decodedUrl = decodeURIComponent(filePath);
      return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
    } catch (e) {
      if (typeof input === "string") {
        const decodedUrl = decodeURIComponent(input);
        return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
      }
      return undefined;
    }
  };

  useEffect(() => {
    setValue("id", searchResultData.id);
    setValue("perAccUp", searchResultData.perAccUp);
    setValue("perAccExp", searchResultData.perAccExp);
    setValue("perAccNo", searchResultData.perAccNo);

    const fields = ["perAccExp", "perAccUp", "perAccNo"];

    fields.forEach((field) => setValue(field, searchResultData[field]));

    if (searchResultData && searchResultData.perAccUp) {
      try {
        const parsedArray = JSON.parse(searchResultData.perAccUp[0]);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );

        setValue("perAccUp", parsedFiles);

        setUploadPAU((prev) => ({
          ...prev,
          perAccUp: parsedFiles,
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          perAccUp: parsedFiles.map((file) => getFileName(file.upload)),
        }));
      } catch (error) {
        console.error(`Failed to parse ${searchResultData.perAccUp}:`, error);
      }
    }
  }, [searchResultData, setValue]);

  const onSubmit = async (data) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const checkingDITable = personalAcciData.find(
        (match) => match.id === searchResultData.id
      );

      if (checkingDITable) {
        const previous = checkingDITable.updatedBy ? JSON.parse(checkingDITable.updatedBy) : [];
        const updatedBy = JSON.stringify([...previous, { userID: userType, date: today }]);
        const PAUpValue = {
          ...data,
          perAccUp: JSON.stringify(uploadPAU.perAccUp),
          updatedBy,
        };
        // console.log(PACreValue);

        const finalData = {
          id: PAUpValue.id,
          perAccUp: PAUpValue.perAccUp,
          perAccExp: PAUpValue.perAccExp,
          perAccNo: PAUpValue.perAccNo,
          updatedBy: PAUpValue.updatedBy,
        };

        const response = await client.graphql({
          query: updatePersonalAccident,
          variables: { input: finalData },
        });

        // console.log("Successfully submitted data:", response);
        setNotification(true);
      } else {
        const PACreValue = {
          ...data,
          perAccUp: JSON.stringify(uploadPAU.perAccUp),
          createdBy: JSON.stringify([{ userID: userType, date: today }]),
        };
        // console.log(PACreValue);
        const response = await client.graphql({
          query: createPersonalAccident,
          variables: { input: PACreValue },
        });

        // console.log("Successfully submitted data:", response);
        setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  //___________________________________-Printing section %% Pdf section___________________________________

  const closeModal = () => {
    setViewingDocument(null);
  };
  const handlePrint = useReactToPrint({
    content: () => groupPrint.current,

    pageStyle: `
    @page {
      size: auto;
      margin: 0mm;
    }
    body { 
      margin: 0;
      padding: 0;
    }
    .pdf-page {
      page-break-after: always;
    }
  `,
  });

  const renderDocumentsUnderCategory = (documents) => {
    return (
      <>
        {documents.map((document, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 mb-4 border border-gray-200"
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

            {viewingDocument === document.upload &&
              document.upload.endsWith(".pdf") && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                    {/* Modal header */}
                    <div className="flex justify-between items-center p-4 border-b">
                      <h3 className="text-lg font-semibold">PDF Viewer</h3>
                      <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes size={20} />
                      </button>
                    </div>

                    {/* PDF Viewer */}
                    <div
                      ref={groupPrint}
                      className="flex-grow overflow-y-auto pdf-page"
                    >
                      {lastUploadUrl ? (
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                          <Viewer
                            fileUrl={lastUploadUrl}
                            renderError={(error) => (
                              <div className="p-4 text-red-500">
                                Failed to load PDF: {error.message}
                                <div className="text-sm mt-2">
                                  URL: {lastUploadUrl}
                                </div>
                              </div>
                            )}
                          />
                        </Worker>
                      ) : (
                        <div className="p-4 text-center">
                          No PDF file available
                        </div>
                      )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-center p-4 border-t">
                      <div className="flex gap-4">
                        <button className="px-4 py-2 bg-primary  rounded flex items-center gap-2">
                          <FaDownload />
                          <a href={lastUploadUrl} download>
                            Download
                          </a>
                        </button>
                        <button
                          onClick={handlePrint}
                          className="px-4 py-2 bg-primary  rounded flex items-center gap-2"
                        >
                          <FaPrint />
                          Print
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {/* Image Viewer */}
            {viewingDocument === document.upload &&
              !document.upload.endsWith(".pdf") && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                    {/* Modal header */}
                    <div className="flex justify-between items-center p-4 border-b">
                      <h3 className="text-lg font-semibold">Image Viewer</h3>
                      <button
                        onClick={() => setViewingDocument(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes size={20} />
                      </button>
                    </div>

                    {/* Image Viewer */}
                    <div
                      ref={groupPrint}
                      className="flex-grow overflow-y-auto p-4"
                    >
                      <img
                        src={lastUploadUrl}
                        alt="Document Preview"
                        className="w-full h-auto rounded"
                      />
                    </div>

                    {/* Footer Controls */}
                    <div className="flex items-center justify-center p-4 border-t">
                      <div className="flex gap-4">
                        <button className="px-4 py-2 bg-primary rounded flex items-center gap-2">
                          <FaDownload />
                          <a href={lastUploadUrl} download>
                            Download
                          </a>
                        </button>
                        <button
                          onClick={handlePrint}
                          className="px-4 py-2 bg-primary rounded flex items-center gap-2"
                        >
                          <FaPrint />
                          Print
                        </button>
                      </div>
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

  //___________________________________-Printing section %% Pdf section___________________________________

  return (
    <section
      onClick={() => {
        setFilteredEmployees([]);
      }}
    >
      <div className="w-full flex items-center justify-between gap-5 px-10">
        <Link to="/dashboard" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <p className="flex-1 text-center mt-2 text_size_2 uppercase">
          Personal Accident Insurance
        </p>
        <div className="flex-1">
          <InsSearch
            searchResult={searchResult}
            newFormData={insuranceData}
            searchIcon2={<IoSearch />}
            placeholder="Policy Number"
            rounded="rounded-lg"
            empID={empID}
            filteredEmployees={filteredEmployees}
            setFilteredEmployees={setFilteredEmployees}
          />
        </div>{" "}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto py-5 px-10 my-10 bg-[#F5F6F1CC]"
      >
        {/* <h3 className="mb-5 text-lg font-bold">Personal Accident Insurance</h3> */}
        <div className="relative mb-5">
          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Personal Accident Policy Number */}
            <FormField
              name="perAccNo"
              type="text"
              placeholder="Enter Personal Accident Policy Number"
              label="Policy Number"
              register={register}
              errors={errors}
              trackEmpID={trackEmpID}
            />

            {/* Personal Accident Expiry Date */}
            <FormField
              name="perAccExp"
              type="date"
              label="Expiry Date"
              register={register}
              errors={errors}
            />

            <div className="mb-2 relative">
              <div className="flex flex-col">
                {/* <label className="text_size_5">perAccUp</label> */}

                {/* File Input Label */}
                <label
                  onClick={() => {
                    if (isUploading["perAccUp"]) {
                      alert(
                        "Please delete the previously uploaded file before uploading a new one."
                      );
                    }
                  }}
                  className={`mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer`}
                >
                  <input
                    type="file"
                    className="hidden"
                    {...register}
                    accept=".pdf, .jpg, .jpeg, .png"
                    onChange={(e) => handleFileChange(e, "perAccUp")}
                    disabled={isUploading["perAccUp"]}
                  />
                  <span className="ml-2  w-full font-normal flex justify-between items-center gap-10">
                    Upload
                    <GoUpload />
                  </span>
                </label>

                {/* Display Uploaded File Names */}
                {uploadedFileNames["perAccUp"] && (
                  <p className="text-grey text-sm my-1">
                    {Array.isArray(uploadedFileNames["perAccUp"]) ? (
                      uploadedFileNames["perAccUp"]
                        .slice()
                        .map((fileName, fileIndex) => (
                          <span
                            key={fileIndex}
                            className="mt-2 flex justify-between items-center"
                          >
                            {fileName}
                            {formattedPermissions?.deleteAccess?.[access]?.some(
                              (permission) =>
                                requiredPermissions.includes(permission)
                            ) && (
                              <button
                                type="button"
                                className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                                onClick={() =>
                                  deleteFile("perAccUp", fileName, fileIndex)
                                }
                              >
                                <MdCancel />
                              </button>
                            )}
                          </span>
                        ))
                    ) : (
                      <span className="mt-2 flex justify-between items-center">
                        {uploadedFileNames["perAccUp"]}
                        <button
                          type="button"
                          className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                          onClick={
                            () =>
                              deleteFile(
                                "perAccUp",
                                uploadedFileNames["perAccUp"],
                                0
                              ) // Pass index 0 if only one file
                          }
                        >
                          <MdCancel />
                        </button>
                      </span>
                    )}
                  </p>
                )}

                {/* Display Error Message */}
                {/* {error && <p className="text-[red] text-[12px] mt-1">{error.message}</p>} */}
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
          text="Personal Accident Saved Successfully"
          notification={notification}
          path="/insuranceHr/personalAcci"
        />
      )}

      {/* View Insurance Info Section */}
      <div className="mt-20">
        <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
          View Insurance Info
        </p>
        {insuranceData.length > 0 ? (
          <div className=" h-[400px] overflow-y-auto scrollBar">
            <table className="w-full text-center">
              <thead className="bg-[#939393] text-white sticky top-0">
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
                    <td className="pl-4 py-4">{data.perAccNo}</td>
                    <td className="py-4 px-4">
                      {formatDate(data?.perAccExp || "N/A")}
                    </td>
                    <td className="pl-4 py-4">
                      {renderDocumentCategory(data.perAccUp, "PDF File")}
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
     
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </section>
  );
};
