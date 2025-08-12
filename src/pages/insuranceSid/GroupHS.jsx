import { useEffect, useState, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "../../utils/FormField";
import { SpinLogo } from "../../utils/SpinLogo";
import { GroupHSSchema } from "../../services/EmployeeValidation";
import { uploadDocs } from "../../services/uploadsDocsS3/UploadDocs";
import { generateClient } from "@aws-amplify/api";
import { createGroupHandS, updateGroupHandS } from "../../graphql/mutations";
import { listGroupHandS } from "../../graphql/queries";
import { FaTimes, FaDownload, FaPrint, FaEdit } from "react-icons/fa";
import { pdfjs } from "react-pdf";
import { getUrl } from "@aws-amplify/storage";
import { useReactToPrint } from "react-to-print";
import { DeleteGroupUp } from "./DeleteUpload/DeleteGroupUp";
import { handleDeleteFile } from "../../services/uploadsDocsS3/DeleteDocs";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { DeletePopup } from "../../utils/DeletePopup";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { DataSupply } from "../../utils/DataStoredContext";
import { Link } from "react-router-dom";
import { InsSearch } from "./InsSearch";
import { useDeleteAccess } from "../../hooks/useDeleteAccess";
import { GoUpload } from "react-icons/go";
import { MdCancel } from "react-icons/md";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
export const GroupHS = () => {
  const { empPIData, groupHSData } = useContext(DataSupply);
  const client = generateClient();
  const [isUploading, setIsUploading] = useState({
    groupHSUpload: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    groupHSUpload: null,
  });
  const [uploadGHsU, setUploadGHsU] = useState({
    groupHSUpload: [],
  });
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingDocument, setViewingDocument] = useState(null);
  const [lastUploadUrl, setPPLastUP] = useState("");
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchResultData, setSearchResultData] = useState([]);
  const [empID, setEmpID] = useState("");
  const { formattedPermissions } = useDeleteAccess();
  const userType = localStorage.getItem("userID");
  const [trackEmpID, setTrackEmpID] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, setError },
  } = useForm({
    resolver: yupResolver(GroupHSSchema),
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
    const groupHSNo = watch("groupHSNo");
    if (!groupHSNo) {
      alert("Please enter the Policy Number before uploading files.");
      window.location.href = "/insuranceHr/groupHS";
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
      await uploadDocs(selectedFile, label, setUploadGHsU, groupHSNo);
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
    // console.log(fileType, fileName);

    try {
      const groupHSNo = watch("groupHSNo");
      if (!groupHSNo) {
        alert("Please provide the Policy Number before deleting files.");
        return;
      }

      const isDeletedArrayUploaded = await DeleteGroupUp(
        fileType,
        fileName,
        fileIndex,
        groupHSNo,
        setUploadedFileNames,
        setUploadGHsU,
        setIsUploading
      );

      const isDeleted = await handleDeleteFile(fileType, fileName, groupHSNo);

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
    const userID = localStorage.getItem("userID");
    setEmpID(userID);
    // console.log("Navbar: User ID from localStorage:", userID);
  }, []);

  const onSubmit = async (data) => {
    // console.log("data121", data);
    try {
      
      const today = new Date().toISOString().split("T")[0];
      const checkingDITable = groupHSData?.find(
        (match) => match?.id === searchResultData?.id
      );

      // console.log(checkingDITable);

      if (checkingDITable) {
        const previous = checkingDITable.updatedBy ? JSON.parse(checkingDITable.updatedBy) : [];
        const updatedBy = JSON.stringify([...previous, { userID: userType, date: today }]);
        // Update case: Prepare the update data and perform the update
        const updatedGHSValue = {
          ...data,
          id: checkingDITable.id,
          groupHSUpload: JSON.stringify(uploadGHsU.groupHSUpload),
          updatedBy,
        };
        // console.log("update value logs:", updatedGHSValue);

        const totalData = {
          id: updatedGHSValue.id,
          groupHSExp: updatedGHSValue.groupHSExp,
          groupHSNo: updatedGHSValue.groupHSNo,
          groupHSUpload: updatedGHSValue.groupHSUpload,
          updatedBy: updatedGHSValue.updatedBy,
        };
        const response = await client.graphql({
          query: updateGroupHandS,
          variables: { input: totalData },
        });

        setNotification(true);
      } else {
        // Create case: Prepare the new data and perform the create
        const GHSreValue = {
          groupHSNo: data.groupHSNo,
          groupHSExp: data.groupHSExp,
          groupHSUpload: JSON.stringify(uploadGHsU.groupHSUpload),
          createdBy: JSON.stringify([{ userID: userType, date: today }]),
        };

        const response = await client.graphql({
          query: createGroupHandS,
          variables: { input: GHSreValue },
        });

        // console.log("Successfully submitted data:", GHSreValue);
        setNotification(true);
      }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const groupHSDetails = groupHSData
              ? groupHSData?.find((user) => user.empID === emp.empID)
              : {};
            return {
              ...emp,
              ...groupHSDetails,
            };
          })
          .filter(Boolean);

        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [empPIData, groupHSData]);

  const searchResult = (result) => {
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
    setValue("groupHSNo", searchResultData.groupHSNo);
    setValue("groupHSExp", searchResultData.groupHSExp);

    const fields = [
      "createdAt",
      "updatedAt",
      "groupHSExp",
      "groupHSNo",
      "groupHSUpload",
    ];

    fields.forEach((field) => setValue(field, searchResultData[field]));

    if (searchResultData && searchResultData.groupHSUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.groupHSUpload[0]);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );

        setValue("groupHSUpload", parsedFiles);

        setUploadGHsU((prev) => ({
          ...prev,
          groupHSUpload: parsedFiles,
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          groupHSUpload: parsedFiles.map((file) => getFileName(file.upload)),
        }));
      } catch (error) {
        console.error(
          `Failed to parse ${searchResultData.groupHSUpload}:`,
          error
        );
      }
    }
  }, [searchResultData, setValue]);

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

  const requiredPermissions = ["Insurance"];

  const access = "Insurance";

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
          Group H&S Insurance
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
        {/* Group H&S Insurance Fields */}
        {/* <h3 className="mb-5 text-lg font-bold">Group H&S Insurance</h3> */}
        <div className="relative mb-5">
          <div className="grid grid-cols-2 gap-4 items-center">
            <FormField
              name="groupHSNo"
              type="text"
              placeholder="Enter H&S Policy Number"
              label="Policy Number"
              register={register}
              errors={errors}
              trackEmpID={trackEmpID}
            />
            <FormField
              name="groupHSExp"
              type="date"
              label="Expiry Date"
              register={register}
              errors={errors}
            />
            <div className="mb-2 relative">
              <div className="flex flex-col">
                {/* <label className="text_size_5">groupHSUpload</label> */}

                {/* File Input Label */}
                <label
                  onClick={() => {
                    if (isUploading["groupHSUpload"]) {
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
                    onChange={(e) => handleFileChange(e, "groupHSUpload")}
                    disabled={isUploading["groupHSUpload"]}
                  />
                  <span className="ml-2  w-full font-normal flex justify-between items-center gap-10">
                    Upload
                    <GoUpload />
                  </span>
                </label>

                {/* Display Uploaded File Names */}
                {uploadedFileNames["groupHSUpload"] && (
                  <p className="text-grey text-sm my-1">
                    {Array.isArray(uploadedFileNames["groupHSUpload"]) ? (
                      uploadedFileNames["groupHSUpload"]
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
                                  deleteFile(
                                    "groupHSUpload",
                                    fileName,
                                    fileIndex
                                  )
                                }
                              >
                                <MdCancel />
                              </button>
                            )}
                          </span>
                        ))
                    ) : (
                      <span className="mt-2 flex justify-between items-center">
                        {uploadedFileNames["groupHSUpload"]}
                        <button
                          type="button"
                          className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                          onClick={
                            () =>
                              deleteFile(
                                "groupHSUpload",
                                uploadedFileNames["groupHSUpload"],
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
              <thead className="bg-[#939393] text-white sticky top-0">
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

      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </section>
  );
};

// New Ui  Design Code

// import { useEffect, useState, useRef, useContext } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { FormField } from "../../utils/FormField";
// import { SpinLogo } from "../../utils/SpinLogo";
// import { GroupHSSchema } from "../../services/EmployeeValidation";
// import { uploadDocs } from "../../services/uploadsDocsS3/UploadDocs";
// import { generateClient } from "@aws-amplify/api";
// import { createGroupHandS, updateGroupHandS } from "../../graphql/mutations";
// import { listGroupHandS } from "../../graphql/queries";
// import { pdfjs } from "react-pdf";
// import { getUrl } from "@aws-amplify/storage";
// import { DeleteGroupUp } from "./DeleteUpload/DeleteGroupUp";
// import { handleDeleteFile } from "../../services/uploadsDocsS3/DeleteDocs";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { DeletePopup } from "../../utils/DeletePopup";
// import { IoSearch } from "react-icons/io5";
// import { FaArrowLeft, FaFilePdf, FaFileImage } from "react-icons/fa";
// import { DataSupply } from "../../utils/DataStoredContext";
// import { Link } from "react-router-dom";
// import { InsSearch } from "./InsSearch";
// import { useDeleteAccess } from "../../hooks/useDeleteAccess";
// import { GoUpload } from "react-icons/go";
// import { MdCancel } from "react-icons/md";
// import { Pagination } from "../leaveManagement/Pagination";
// import { PdfViewerModal } from "./components/PdfViewerModal";
// import { ImageViewerModal } from "./components/ImageViewerModal";
// import AweLogo from "../../assets/logo/logo-with-name.svg";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();
// export const GroupHS = () => {
//   const { empPIData, groupHSData } = useContext(DataSupply);
//   const client = generateClient();
//   const [isUploading, setIsUploading] = useState({
//     groupHSUpload: false,
//   });
//   const [uploadedFileNames, setUploadedFileNames] = useState({
//     groupHSUpload: null,
//   });
//   const [uploadGHsU, setUploadGHsU] = useState({
//     groupHSUpload: [],
//   });
//   const [deletePopup, setdeletePopup] = useState(false);
//   const [deleteTitle1, setdeleteTitle1] = useState("");
//   const [notification, setNotification] = useState(false);
//   const [insuranceData, setInsuranceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewingDocument, setViewingDocument] = useState(null);
//   const [lastUploadUrl, setPPLastUP] = useState("");
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [searchResultData, setSearchResultData] = useState([]);
//   const [empID, setEmpID] = useState("");
//   const { formattedPermissions } = useDeleteAccess();
//   const userType = localStorage.getItem("userID");
//   const [trackEmpID, setTrackEmpID] = useState(false);
//   const [fetchError, setFetchError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, setError },
//   } = useForm({
//     resolver: yupResolver(GroupHSSchema),
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();

//     return `${day}/${month}/${year}`;
//   };

//   const groupPrint = useRef();

//   const linkToStorageFile = async (pathUrl) => {
//     try {
//       const result = await getUrl({ path: pathUrl });
//       setPPLastUP(result.url.href);
//       setViewingDocument(pathUrl);
//     } catch (error) {
//       console.error("Error fetching the file URL:", error);
//     }
//   };

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

//   const updateUploadingState = (label, value) => {
//     setIsUploading((prev) => ({
//       ...prev,
//       [label]: value,
//     }));
//     // console.log(value);
//   };

//   const handleFileChange = async (e, label) => {
//     const groupHSNo = watch("groupHSNo");
//     if (!groupHSNo) {
//       alert("Please enter the Policy Number before uploading files.");
//       window.location.href = "/insuranceHr/groupHS";
//       return;
//     }

//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     const allowedTypes = [
//       "application/pdf",
//       "image/jpeg",
//       "image/png",
//       "image/jpg",
//     ];
//     if (!allowedTypes.includes(selectedFile.type)) {
//       alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
//       return;
//     }

//     // Ensure no duplicate files are added
//     const currentFiles = watch(label) || [];
//     if (currentFiles.some((file) => file.name === selectedFile.name)) {
//       alert("This file has already been uploaded.");
//       return;
//     }

//     setValue(label, [...currentFiles, selectedFile]);

//     try {
//       updateUploadingState(label, true);
//       await uploadDocs(selectedFile, label, setUploadGHsU, groupHSNo);
//       setUploadedFileNames((prev) => ({
//         ...prev,
//         [label]: selectedFile.name,
//       }));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDeleteMsg = () => {
//     setdeletePopup(!deletePopup);
//   };

//   const deleteFile = async (fileType, fileName, fileIndex) => {
//     // console.log(fileType, fileName);
//     try {
//       const groupHSNo = watch("groupHSNo");
//       if (!groupHSNo) {
//         alert("Please provide the Policy Number before deleting files.");
//         return;
//       }
//       const isDeletedArrayUploaded = await DeleteGroupUp(
//         fileType,
//         fileName,
//         fileIndex,
//         groupHSNo,
//         setUploadedFileNames,
//         setUploadGHsU,
//         setIsUploading
//       );

//       const isDeleted = await handleDeleteFile(fileType, fileName, groupHSNo);

//       if (!isDeleted || isDeletedArrayUploaded) {
//         console.error(
//           `Failed to delete file: ${fileName}, skipping UI update.`
//         );
//         return;
//       }

//       setdeleteTitle1(`${fileName}`);
//       handleDeleteMsg();
//     } catch (error) {
//       console.error("Error deleting file:", error);
//       alert("Error processing the file deletion.");
//     }
//   };

//   useEffect(() => {
//     const userID = localStorage.getItem("userID");
//     setEmpID(userID);
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const today = new Date().toISOString().split("T")[0];
//       const checkingDITable = groupHSData?.find(
//         (match) => match?.id === searchResultData?.id
//       );

//       if (checkingDITable) {
//         const previous = checkingDITable.updatedBy
//           ? JSON.parse(checkingDITable.updatedBy)
//           : [];
//         const updatedBy = JSON.stringify([
//           ...previous,
//           { userID: userType, date: today },
//         ]);
//         const updatedGHSValue = {
//           ...data,
//           id: checkingDITable.id,
//           groupHSUpload: JSON.stringify(uploadGHsU.groupHSUpload),
//           updatedBy,
//         };
//         // console.log("update value logs:", updatedGHSValue);
//         const totalData = {
//           id: updatedGHSValue.id,
//           groupHSExp: updatedGHSValue.groupHSExp,
//           groupHSNo: updatedGHSValue.groupHSNo,
//           groupHSUpload: updatedGHSValue.groupHSUpload,
//           updatedBy: updatedGHSValue.updatedBy,
//         };
//         const response = await client.graphql({
//           query: updateGroupHandS,
//           variables: { input: totalData },
//         });

//         setNotification(true);
//       } else {
//         const GHSreValue = {
//           groupHSNo: data.groupHSNo,
//           groupHSExp: data.groupHSExp,
//           groupHSUpload: JSON.stringify(uploadGHsU.groupHSUpload),
//           createdBy: JSON.stringify([{ userID: userType, date: today }]),
//         };

//         const response = await client.graphql({
//           query: createGroupHandS,
//           variables: { input: GHSreValue },
//         });

//         // console.log("Successfully submitted data:", GHSreValue);
//         setNotification(true);
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchInsuranceData = async () => {
//       try {
//         let allInsuranceData = [];
//         let nextToken = null;

//         do {
//           const response = await client.graphql({
//             query: listGroupHandS,
//             variables: {
//               nextToken: nextToken,
//             },
//           });

//           const items = response?.data?.listGroupHandS?.items || [];

//           allInsuranceData = [...allInsuranceData, ...items];

//           nextToken = response?.data?.listGroupHandS?.nextToken;
//         } while (nextToken);

//         const filteredData = allInsuranceData.filter((data) => {
//           const expiryDate = new Date(data.groupHSExp);
//           return expiryDate >= new Date();
//         });

//         setInsuranceData(filteredData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching insurance data:", error);
//         setFetchError("insuranceData", { message: "Error fetching data" });
//         setLoading(false);
//       }
//     };

//     fetchInsuranceData();
//   }, []);

//   useEffect(() => {
//     if (showModal) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [showModal]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const mergedData = empPIData
//           .map((emp) => {
//             const groupHSDetails = groupHSData
//               ? groupHSData?.find((user) => user.empID === emp.empID)
//               : {};
//             return {
//               ...emp,
//               ...groupHSDetails,
//             };
//           })
//           .filter(Boolean);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, [empPIData, groupHSData]);

//   const searchResult = (result) => {
//     setSearchResultData(result);
//     if (result) {
//       setTrackEmpID(true);
//     }
//   };

//   const getFileName = (input) => {
//     if (typeof input === "object" && input.upload) {
//       const filePath = input.upload;
//       const decodedUrl = decodeURIComponent(filePath);
//       return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
//     }

//     try {
//       const urlObj = new URL(input);
//       const filePath = urlObj.pathname;
//       const decodedUrl = decodeURIComponent(filePath);
//       return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
//     } catch (e) {
//       if (typeof input === "string") {
//         const decodedUrl = decodeURIComponent(input);
//         return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
//       }
//       return undefined;
//     }
//   };

//   useEffect(() => {
//     setValue("id", searchResultData.id);
//     setValue("groupHSNo", searchResultData.groupHSNo);
//     setValue("groupHSExp", searchResultData.groupHSExp);

//     const fields = [
//       "createdAt",
//       "updatedAt",
//       "groupHSExp",
//       "groupHSNo",
//       "groupHSUpload",
//     ];

//     fields.forEach((field) => setValue(field, searchResultData[field]));

//     if (searchResultData && searchResultData.groupHSUpload) {
//       try {
//         const parsedArray = JSON.parse(searchResultData.groupHSUpload[0]);

//         const parsedFiles = parsedArray.map((item) =>
//           typeof item === "string" ? JSON.parse(item) : item
//         );

//         setValue("groupHSUpload", parsedFiles);

//         setUploadGHsU((prev) => ({
//           ...prev,
//           groupHSUpload: parsedFiles,
//         }));

//         setUploadedFileNames((prev) => ({
//           ...prev,
//           groupHSUpload: parsedFiles.map((file) => getFileName(file.upload)),
//         }));
//       } catch (error) {
//         console.error(
//           `Failed to parse ${searchResultData.groupHSUpload}:`,
//           error
//         );
//       }
//     }
//   }, [searchResultData, setValue]);

//   const itemsPerPage = 5;

//   const paginatedData = insuranceData
//     .filter((item) =>
//       item.groupHSNo?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const totalPages = Math.ceil(insuranceData.length / itemsPerPage);

//   //----------------------------------printing section-------------------------------------------------------------------

//   const closeModal = () => {
//     setViewingDocument(null);
//   };

//   const renderDocumentsUnderCategory = (documents) => {
//     return (
//       <div className="space-y-2">
//         {documents.map((document, index) => {
//           const isPdf = document.upload.endsWith(".pdf");
//           const fileName = document.upload.split("/").pop();

//           return (
//             <div
//               key={index}
//               className="px-4 max-w-[220px] bg-lite_skyBlue rounded-lg hover:shadow-sm transition-shadow border border-lite_grey"
              
//             >
//               <div className="flex items-center gap-3" >
//                 <span className="text-lg text-black">
//                   {isPdf ? <FaFilePdf /> : <FaFileImage />}
//                 </span>
//                 <div className="flex flex-col">
//                   <p
//                     className="text-sm font-medium truncate max-w-[160px]"
//                     title={fileName}
//                   >
//                     {fileName}
//                   </p>
//                   <span className="text-xs text-gray-500">
//                     Uploaded on: {formatDate(document.date)}
//                   </span>
//                 </div>
//               </div>
//               {/* <button
//                 onClick={() => linkToStorageFile(document.upload)}
//                 className="text-sm font-semibold text-primary hover:underline"
//               >
//                 View
//               </button> */}

//               {viewingDocument === document.upload && isPdf && (
//                 <PdfViewerModal
//                   lastUploadUrl={lastUploadUrl}
//                   closeModal={closeModal}
//                 />
//               )}

//               {viewingDocument === document.upload && !isPdf && (
//                 <ImageViewerModal
//                   lastUploadUrl={lastUploadUrl}
//                   closeModal={() => setViewingDocument(null)}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const renderDocumentCategory = (uploadArray, categoryName) => {
//     const documents =
//       uploadArray.length > 0 ? parseDocuments(uploadArray[0]) : [];

//     // Check if documents is an array and has items
//     const isValidDocumentsArray =
//       Array.isArray(documents) && documents.length > 0;

//     return (
//       <div className="py-4 ">
//         <h6 className="uppercase text_size_5 my-3">{categoryName}</h6>
//         {isValidDocumentsArray ? (
//           renderDocumentsUnderCategory(documents, categoryName)
//         ) : (
//           <p className="text-dark_grey font-semibold text-sm">
//             No documents and images available
//           </p>
//         )}
//       </div>
//     );
//   };

//   //-------------------------------printing section------------------------------------------------------------------------------

//   const requiredPermissions = ["Insurance"];

//   const access = "Insurance";

//   return (
//     <section className="relative" onClick={() => setFilteredEmployees([])}>
//       {/* Header */}

//       <div className="w-full flex items-center justify-between gap-5 px-10">
//         <Link to="/dashboard" className="text-xl flex-1 text-grey">
//           <FaArrowLeft />
//         </Link>
//         <div className="text-dark_grey underline uppercase w-full center gap-4 px-10 py-4">
//           <h2 className="text-lg font-medium">Group H&S Insurance</h2>
//         </div>
//       </div>

//       <div className="px-10 py-4">
//         {/* Top Bar */}
//         <div className="flex items-center justify-end px-6 py-4">
//           <div className="flex items-center gap-4 w-full sm:w-auto">
//             <div className="relative w-full sm:w-auto">
//               <input
//                 type="text"
//                 placeholder="Search Policy Number..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-3 py-[10px] border border-lite_grey rounded-md text-sm focus:outline-none w-full sm:w-auto"
//               />
//               <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-grey pointer-events-none">
//                 <IoSearch />
//               </span>
//             </div>

//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-primary px-4 py-2 rounded-lg shadow-md hover:bg-primary_hover transition-colors"
//             >
//               + Add
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Table */}
//           <div className="max-h-[400px] min-h-[400px] overflow-y-auto scrollBar">
//             <table className="w-full text-sm text-dark_grey text-left">
//               <thead className="bg-tableHeadCol sticky top-0 z-0">
//                 <tr className="text-sm font-medium uppercase">
//                   <th className="pl-6 py-4">S.No</th>
//                   <th className="py-4">Policy Number</th>
//                   <th className="py-4">Expiry Date</th>
//                   <th className="pr-6 py-4">Uploaded File</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="4" className="text-center py-36">
//                       <div className="flex items-center justify-center gap-2">
//                         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary border-opacity-50"></div>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : fetchError ? (
//                   <tr>
//                     <td colSpan="3" className="text-center py-10">
//                       <div className="flex flex-col items-center justify-center gap-2 text-red-500">
//                         <span className="text-4xl">⚠️</span>
//                         <p className="text-sm font-medium">
//                           Failed to load insurance data
//                         </p>
//                         <p className="text-xs text-red-400 italic">
//                           {fetchError}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : insuranceData?.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center py-10">
//                       <div className="flex flex-col items-center justify-center gap-2 text-dark_grey">
//                         {/* <IoSearch className="text-4xl opacity-30" /> */}
//                         <p className="text-sm font-medium">No data available</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedData?.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center py-10">
//                       <div className="flex flex-col items-center justify-center gap-2 text-dark_grey">
//                         <IoSearch className="text-4xl opacity-30" />
//                         <p className="text-sm font-medium">
//                           No matching policy found
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedData.map((data, index) => (
//                     <tr
//                       key={index}
//                       className="min-h-[60px] border-b border-lite_grey hover:bg-gray-50"
//                     >
//                       <td className="pl-6 py-2">
//                         {(currentPage - 1) * itemsPerPage + index + 1}
//                       </td>
//                       <td className="py-2">{data.groupHSNo}</td>
//                       <td className="py-2">
//                         {formatDate(data.groupHSExp || "N/A")}
//                       </td>
//                       <td className="pr-6 py-2 w-[350px] max-w-[400px]">
//                         {renderDocumentCategory(data.groupHSUpload)}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {paginatedData.length > 0 && (
//             <div className="mt-6 py-4 center border-t border-lite_grey">
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={(page) => setCurrentPage(page)}
//               />
//             </div>
//           )}

//           {/* Modal */}
//           {showModal && !notification && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
//               <div className="bg-white w-full max-w-md min-h-[70vh] max-h-[70vh] overflow-hidden p-6 rounded-lg relative shadow-lg flex flex-col">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
//                 >
//                   &times;
//                 </button>

//                 <div className="flex flex-col items-center mb-4">
//                   <img
//                     src={AweLogo}
//                     alt="Logo"
//                     className="max-w-[240px] w-full mb-2"
//                   />
//                   <h2 className="font-lg text-base text-dark_grey leading-[100%] uppercase underline mt-4">
//                     Add Group H&S Insurance
//                   </h2>
//                 </div>

//                 <form
//                   onSubmit={handleSubmit(onSubmit)}
//                   className="flex flex-col flex-1 overflow-hidden"
//                 >
//                   <div className="flex-1 overflow-y-auto pr-2 space-y-4">
//                     <InsSearch
//                       searchResult={searchResult}
//                       newFormData={insuranceData}
//                       searchIcon2={<IoSearch />}
//                       placeholder="Policy Number"
//                       rounded="rounded-lg"
//                       empID={empID}
//                       filteredEmployees={filteredEmployees}
//                       setFilteredEmployees={setFilteredEmployees}
//                     />
//                     <FormField
//                       name="groupHSNo"
//                       type="text"
//                       placeholder="Enter Policy Number"
//                       label="Policy Number"
//                       register={register}
//                       errors={errors}
//                       trackEmpID={trackEmpID}
//                     />
//                     <FormField
//                       name="groupHSExp"
//                       type="date"
//                       label="Expiry Date"
//                       register={register}
//                       errors={errors}
//                     />
//                     <div className="mb-2 relative">
//                       <div className="flex flex-col">
//                         {/* <label className="text_size_5">groupHSUpload</label> */}

//                         {/* File Input Label */}
//                         <label
//                           onClick={() => {
//                             if (isUploading["groupHSUpload"]) {
//                               alert(
//                                 "Please delete the previously uploaded file before uploading a new one."
//                               );
//                             }
//                           }}
//                           className={`mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer`}
//                         >
//                           <input
//                             type="file"
//                             className="hidden"
//                             {...register}
//                             accept=".pdf, .jpg, .jpeg, .png"
//                             onChange={(e) =>
//                               handleFileChange(e, "groupHSUpload")
//                             }
//                             disabled={isUploading["groupHSUpload"]}
//                           />
//                           <span className="ml-2  w-full font-normal flex justify-between items-center gap-10">
//                             Upload
//                             <GoUpload />
//                           </span>
//                         </label>

//                         {/* Display Uploaded File Names */}
//                         {uploadedFileNames["groupHSUpload"] && (
//                           <p className="text-grey text-sm my-1">
//                             {Array.isArray(
//                               uploadedFileNames["groupHSUpload"]
//                             ) ? (
//                               uploadedFileNames["groupHSUpload"]
//                                 .slice()
//                                 .map((fileName, fileIndex) => (
//                                   <span
//                                     key={fileIndex}
//                                     className="mt-2 flex justify-between items-center"
//                                   >
//                                     {fileName}
//                                     {formattedPermissions?.deleteAccess?.[
//                                       access
//                                     ]?.some((permission) =>
//                                       requiredPermissions.includes(permission)
//                                     ) && (
//                                       <button
//                                         type="button"
//                                         className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
//                                         onClick={() =>
//                                           deleteFile(
//                                             "groupHSUpload",
//                                             fileName,
//                                             fileIndex
//                                           )
//                                         }
//                                       >
//                                         <MdCancel />
//                                       </button>
//                                     )}
//                                   </span>
//                                 ))
//                             ) : (
//                               <span className="mt-2 flex justify-between items-center">
//                                 {uploadedFileNames["groupHSUpload"]}
//                                 <button
//                                   type="button"
//                                   className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
//                                   onClick={
//                                     () =>
//                                       deleteFile(
//                                         "groupHSUpload",
//                                         uploadedFileNames["groupHSUpload"],
//                                         0
//                                       ) // Pass index 0 if only one file
//                                   }
//                                 >
//                                   <MdCancel />
//                                 </button>
//                               </span>
//                             )}
//                           </p>
//                         )}

//                         {/* Display Error Message */}
//                         {/* {error && <p className="text-[red] text-[12px] mt-1">{error.message}</p>} */}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="pt-4 mt-4 border-t border-lite_grey flex justify-center">
//                     <button type="submit" className="primary_btn">
//                       Save
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}

//           {notification && (
//             <SpinLogo
//               text="Group H&S Saved Successfully"
//               notification={notification}
//               path="/insuranceHr/groupHS"
//             />
//           )}
//         </div>
//       </div>
//       {deletePopup && (
//         <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
//       )}
//     </section>
//   );
// };
