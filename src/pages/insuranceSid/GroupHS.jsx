import { useEffect, useState, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "../../utils/FormField";
import { FileUpload } from "../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../utils/SpinLogo";
import { GroupHSSchema } from "../../services/EmployeeValidation";
import { uploadDocs } from "../../services/uploadsDocsS3/UploadDocs";
import { generateClient } from "@aws-amplify/api";
import { createGroupHandS, updateGroupHandS } from "../../graphql/mutations";
import { listGroupHandS } from "../../graphql/queries";
import { FaTimes, FaDownload, FaPrint, FaEdit } from "react-icons/fa";
import { Document, Page } from "react-pdf";
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
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [viewingDocument, setViewingDocument] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [lastUploadUrl, setPPLastUP] = useState("");
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchResultData, setSearchResultData] = useState([]);
  const [empID, setEmpID] = useState("");
  const { formattedPermissions } = useDeleteAccess();

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
      const checkingDITable = groupHSData?.find(
        (match) => match?.id === searchResultData?.id
      );

      console.log(checkingDITable);

      if (checkingDITable) {
        // Update case: Prepare the update data and perform the update
        const updatedGHSValue = {
          ...data,
          id: checkingDITable.id,
          groupHSUpload: JSON.stringify(uploadGHsU.groupHSUpload),
        };
        // console.log("update value logs:", updatedGHSValue);

        const totalData = {
          id: updatedGHSValue.id,
          groupHSExp: updatedGHSValue.groupHSExp,
          groupHSNo: updatedGHSValue.groupHSNo,
          groupHSUpload: updatedGHSValue.groupHSUpload,
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
                <div className="py-6 fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50">
                  <div className="relative bg-white rounded-lg shadow-lg w-[40vw] max-h-full flex flex-col">
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

                    {/* Close button */}
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => setViewingDocument(null)}
                        className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    {/* Footer buttons */}
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
      {/* Popup */}
     

      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </section>
  );
};
