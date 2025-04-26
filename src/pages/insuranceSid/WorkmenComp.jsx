import React, { useEffect, useRef, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "../../utils/FormField";
import { uploadDocs } from "../../services/uploadsDocsS3/UploadDocs";
import { FileUpload } from "../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../utils/SpinLogo";
import { WorkmenCompSchema } from "../../services/EmployeeValidation";
import { generateClient } from "@aws-amplify/api";
import { createWorkMen, updateWorkMen } from "../../graphql/mutations";
import { listWorkMen } from "../../graphql/queries";
import { FaTimes, FaDownload, FaPrint } from "react-icons/fa";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { getUrl } from "@aws-amplify/storage";
import { DeleteWorkComp } from "./DeleteUpload/DeleteWorkComp";
import { handleDeleteFile } from "../../services/uploadsDocsS3/DeleteDocs";
import { DeletePopup } from "../../utils/DeletePopup";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { DataSupply } from "../../utils/DataStoredContext";
import { Link } from "react-router-dom";
import { InsSearch } from "./InsSearch";
import { useReactToPrint } from "react-to-print";
import { useDeleteAccess } from "../../hooks/useDeleteAccess";
import { GoUpload } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import * as pdfjsLib from "pdfjs-dist";
import "@react-pdf-viewer/core/lib/styles/index.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const WorkmenComp = () => {
  const client = generateClient();
  const [notification, setNotification] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [isUploading, setIsUploading] = useState({
    workmenComUp: false,
  });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    workmenComUp: null,
  });

  const [uploadWCU, setUploadWCU] = useState({
    workmenComUp: [],
  });

  // Popup State
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [viewingDocument, setViewingDocument] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [lastUploadUrl, setPPLastUP] = useState("");
  const [pdfHeight, setPdfHeight] = useState("");
  const [pdfWidth, setPdfWidth] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchResultData, setSearchResultData] = useState([]);
  const { formattedPermissions } = useDeleteAccess();
  const { workMenDetails } = useContext(DataSupply);
  const { empID, requiredPermissions, access } = useOutletContext();

  const workmenPrint = useRef();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(WorkmenCompSchema),
  });

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

      setPPLastUP(result.url.href);
      setViewingDocument(pathUrl);
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

  const updateUploadingState = (label, value) => {
    setIsUploading((prev) => ({
      ...prev,
      [label]: value,
    }));
    // console.log(value);
  };

  const handleFileChange = async (e, label) => {
    const workmenCompNo = watch("workmenCompNo");
    if (!workmenCompNo) {
      alert("Please enter the Policy Number before uploading files.");
      window.location.href = "/insuranceHr/workmenComp";
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
      await uploadDocs(selectedFile, label, setUploadWCU, workmenCompNo);
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
      const workmenCompNo = watch("workmenCompNo");
      if (!workmenCompNo) {
        alert("Please provide the Policy Number before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(
        fileType,
        fileName,
        workmenCompNo
      );
      const isDeletedArrayUploaded = await DeleteWorkComp(
        fileType,
        fileName,
        fileIndex,
        workmenCompNo,
        setUploadedFileNames,
        setUploadWCU,
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
        let allWorkMen = [];
        let nextToken = null;

        do {
          const response = await client.graphql({
            query: listWorkMen,
            variables: {
              nextToken: nextToken,
            },
          });

          const items = response?.data?.listWorkMen?.items || [];

          allWorkMen = [...allWorkMen, ...items];

          nextToken = response?.data?.listWorkMen?.nextToken;
        } while (nextToken);

        const filteredData = allWorkMen.filter((data) => {
          const expiryDate = new Date(data.workmenCompExp);
          return expiryDate >= new Date();
        });

        setInsuranceData(filteredData);
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching insurance data:", error);
        setError("insuranceData", { message: "Error fetching data" });
        setLoading(false);
      }
    };

    fetchInsuranceData();
  }, []);

  const searchResult = (result) => {
    setSearchResultData(result);
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
    if (searchResultData) {
      const formattedEmpStatusType = searchResultData.empStatusType
        ? searchResultData.empStatusType.toUpperCase()
        : "";
      setValue("id", searchResultData.id);
      setValue("empStatusType", formattedEmpStatusType);

      const fields = ["workmenComUp", "workmenCompExp", "workmenCompNo"];

      fields.forEach((field) => setValue(field, searchResultData[field]));

      if (searchResultData && searchResultData.workmenComUp) {
        try {
          const parsedArray = JSON.parse(searchResultData.workmenComUp[0]);

          const parsedFiles = parsedArray.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          );

          setValue("workmenComUp", parsedFiles);

          setUploadWCU((prev) => ({
            ...prev,
            workmenComUp: parsedFiles,
          }));

          setUploadedFileNames((prev) => ({
            ...prev,
            workmenComUp: parsedFiles.map((file) => getFileName(file.upload)),
          }));
        } catch (error) {
          console.error(
            `Failed to parse ${searchResultData.workmenComUp}:`,
            error
          );
        }
      }
    }
  }, [searchResultData, setValue]);

  // console.log(workMenDetails);

  // console.log(searchResultData);

  const onSubmit = async (data) => {
    try {
      const checkingDITable = workMenDetails.find(
        (match) => match.id === searchResultData.id
      );

      if (checkingDITable) {
        const WCUpValue = {
          ...data,
          workmenComUp: JSON.stringify(uploadWCU.workmenComUp),
        };
        console.log("Up Value", WCUpValue);

        const totalData = {
          id: WCUpValue.id,
          empStatusType: WCUpValue.empStatusType,
          workmenComUp: WCUpValue.workmenComUp,
          workmenCompExp: WCUpValue.workmenCompExp,
          workmenCompNo: WCUpValue.workmenCompNo,
        };

        const response = await client.graphql({
          query: updateWorkMen,
          variables: { input: totalData },
        });

        // console.log("Successfully updated data:", response);
        setNotification(true);
      } else {
        const WCCreValue = {
          ...data,
          workmenComUp: JSON.stringify(uploadWCU.workmenComUp),
        };
        // console.log(WCCreValue);

        const response = await client.graphql({
          query: createWorkMen,
          variables: { input: WCCreValue },
        });
        // console.log("Successfully submitted data:", response);
        setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  //----------------------------------printing section-------------------------------------------------------------------

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

  //-------------------------------printing section------------------------------------------------------------------------------

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
          Workmen Compensation Insurance
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
        {/* Workmen Compensation Insurance Fields */}
        {/* <h3 className="mb-5 text-lg font-bold">
          Workmen Compensation Insurance
        </h3> */}
        <div className="relative mb-5">
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Employee Type - Dropdown */}
            <FormField
              name="empStatusType"
              label="Employee Type"
              register={register}
              type="select"
              options={[
                { value: "OffShore", label: "OffShore" },
                { value: "OnShore", label: "OnShore" },
                { value: "General", label: "General" },
              ]}
              errors={errors}
            />

            {/* Workmen Comp Policy Number */}
            <FormField
              name="workmenCompNo"
              label="Policy Number"
              type="text"
              placeholder="Enter Workmen Comp Policy No"
              register={register}
              errors={errors}
            />

            {/* Workmen Comp Expiry Date */}
            <FormField
              name="workmenCompExp"
              label="Expiry Date"
              type="date"
              register={register}
              errors={errors}
              // className="mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
            />

            {/* File Upload Field */}
            <div className="mb-2 relative">
              <div className="flex flex-col">
                {/* <label className="text_size_5">workmenComUp</label> */}

                {/* File Input Label */}
                <label
                  onClick={() => {
                    if (isUploading["workmenComUp"]) {
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
                    onChange={(e) => handleFileChange(e, "workmenComUp")}
                    disabled={isUploading["workmenComUp"]}
                  />
                  <span className="ml-2 w-full font-normal flex justify-between items-center gap-10">
                    Upload
                    <GoUpload />
                  </span>
                </label>

                {/* Display Uploaded File Names */}
                {uploadedFileNames["workmenComUp"] && (
                  <p className="text-grey text-sm my-1">
                    {Array.isArray(uploadedFileNames["workmenComUp"]) ? (
                      uploadedFileNames["workmenComUp"]
                        .slice() // Create a shallow copy to avoid mutating the original array

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
                                onClick={
                                  () =>
                                    deleteFile(
                                      "workmenComUp",
                                      fileName,
                                      fileIndex
                                    ) // Pass fileIndex
                                }
                              >
                                <MdCancel />
                              </button>
                            )}
                          </span>
                        ))
                    ) : (
                      <span className="mt-2 flex justify-between items-center">
                        {uploadedFileNames["workmenComUp"]}
                        <button
                          type="button"
                          className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                          onClick={
                            () =>
                              deleteFile(
                                "workmenComUp",
                                uploadedFileNames["workmenComUp"],
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
          text="Workmen Compensation Saved Successfully"
          notification={notification}
          path="/insuranceHr/workmenComp"
        />
      )}
      {/* View Insurance Info Section */}
      <div className="mt-10">
        <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
          View Insurance Info
        </p>
        {insuranceData.length > 0 ? (
          <div className=" h-[400px] overflow-y-auto scrollBar">
            <table className="w-full text-center">
              <thead className="bg-[#939393] text-white sticky top-0">
                <tr>
                  <th className="pl-4 py-4 rounded-tl-lg">Employee Type</th>
                  <th className="pl-4 py-4">Policy Number</th>
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
                    <td className="pl-4 py-4">{data.empStatusType}</td>
                    <td className="pl-4 py-4">{data.workmenCompNo}</td>
                    <td className="py-4 px-4">
                      {formatDate(data?.workmenCompExp || "N/A")}
                    </td>
                    <td className="pl-4 py-4">
                      {renderDocumentCategory(data.workmenComUp, "PDF File")}
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
