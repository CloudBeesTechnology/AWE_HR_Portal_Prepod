import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
import { FormField } from "../../utils/FormField";
import { FileUploadField } from "../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../utils/SpinLogo";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { PersonalAcciSchema } from "../../services/EmployeeValidation";
import { generateClient } from "@aws-amplify/api";
import { createPersonalAccident } from "../../graphql/mutations";
import { listPersonalAccidents } from "../../graphql/queries";
import { FaTimes } from "react-icons/fa";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const PersonalAcci = () => {
  
  const client = generateClient();

  const [uploadedFileNames, setUploadedFileNames] = useState({
    perAccUp: null,
  });
  const [uploadPAU, setUploadPAU] = useState({
    perAccUp: [],
  });
  const [notification, setNotification] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Popup State
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [viewingDocument, setViewingDocument] = useState(null);
  const [lastUploadUrl, setLastUploadUrl] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleFileChange = async (e, label) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file");
      return;
    }

    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);

    try {
      await uploadDocs(selectedFile, label, setUploadPAU);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name, // Store just the file name
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      const PACreValue = {
        ...data,
        perAccUp: JSON.stringify(uploadPAU.perAccUp),
      };
      console.log(PACreValue);
      const response = await client.graphql({
        query: createPersonalAccident,
        variables: { input: PACreValue },
      });

      console.log("Successfully submitted data:", response);
      setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const response = await client.graphql({
          query: listPersonalAccidents,
        });
        setInsuranceData(response.data.listPersonalAccidents.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
        setError("insuranceData", { message: "Error fetching data" });
        setLoading(false);
      }
    };
    fetchInsuranceData();
  }, []);

  const openPopup = (fileUrl) => {
    setPopupImage(fileUrl); // Set the URL for the image or file
    setPopupVisible(true); // Show the popup
  };

  const handlePrint = () => {
    window.print();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-h-screen py-5 px-10 my-10 bg-[#F5F6F1CC]"
    >
      {/* Personal Accident Insurance Fields */}
      <h3 className="mb-5 text-lg font-bold">Personal Accident Insurance</h3>
      <div className="relative mb-5">
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Personal Accident Policy Number */}
          <FormField
            name="perAccNo"
            type="text"
            placeholder="Enter Personal Accident Policy Number"
            label="Policy Number"
            register={register}
            errors={errors}
          />

          {/* Personal Accident Expiry Date */}
          <FormField
            name="perAccExp"
            type="date"
            label="Expiry Date"
            register={register}
            errors={errors}
          />

          {/* File Upload */}
          <div className="mb-2 relative">
            <FileUploadField
              label="Upload File"
              onChangeFunc={(e) => handleFileChange(e, "perAccUp")}
              register={register}
              name="perAccUp"
              error={errors}
            />
            <div className="absolute">
              {uploadedFileNames.perAccUp && (
                <span className="text-sm text-grey">{uploadedFileNames.perAccUp}</span>
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

      {notification && (
        <SpinLogo
          text="Personal Accident Saved Successfully"
          notification={notification}
          path="/insuranceHr/personalAccii"
        />
      )}

      {/* View Insurance Info Section */}
      <div className="mt-20">
        <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
          View Insurance Info
        </p>
        {insuranceData.length > 0 ? (
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
                  <td className="pl-4 py-4">{data.perAccNo}</td>
                  <td className="py-4 px-4">
                    {formatDate(data?.perAccExp || "N/A")}
                  </td>
                  <td className="pl-4 py-4">
                    {data.perAccUp ? (
                      JSON.parse(data.perAccUp).map((file, idx) => (
                        <div key={idx}>
                          <a
                            href="#"
                            onClick={() =>
                              openPopup(`https://your-bucket.s3.amazonaws.com/${file.upload}`)
                            }
                            className="text-[blue] underline"
                          >
                            View
                          </a>
                        </div>
                      ))
                    ) : (
                      "No file uploaded"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-10">No insurance information available.</p>
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
              <Document
                file={popupImage}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
                <div className="text-center mt-2">
                  <button
                    onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                    disabled={pageNumber <= 1}
                  >
                    Previous
                  </button>
                  <span>
                    {pageNumber} / {numPages}
                  </span>
                  <button
                    onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
                    disabled={pageNumber >= numPages}
                  >
                    Next
                  </button>
                </div>
              </Document>
            ) : (
              <img src={popupImage} alt="popup view" className="w-full h-auto" />
            )}
          </div>
        </div>
      )}
    </form>
  );
};
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
// import { FormField } from "../../utils/FormField";
// import { FileUploadField } from "../employees/medicalDep/FileUploadField";
// import { SpinLogo } from "../../utils/SpinLogo";
// import { PersonalAcciSchema } from "../../services/EmployeeValidation";
// import { generateClient } from "@aws-amplify/api";
// import { createPersonalAccident } from "../../graphql/mutations";
// import { listPersonalAccidents } from "../../graphql/queries";
// import { FaTimes, FaDownload, FaPrint } from "react-icons/fa";
// import { Document, Page } from "react-pdf";

// export const PersonalAcci = () => {
//   const client = generateClient();

//   const [uploadedFileNames, setUploadedFileNames] = useState({
//     perAccUp: null,
//   });
//   const [uploadPAU, setUploadPAU] = useState({
//     perAccUp: [],
//   });
//   const [notification, setNotification] = useState(false);
//   const [insuranceData, setInsuranceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Popup State
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [popupImage, setPopupImage] = useState("");
//   const [viewingDocument, setViewingDocument] = useState(null);
//   const [lastUploadUrl, setLastUploadUrl] = useState("");
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(PersonalAcciSchema),
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();

//     return `${day}/${month}/${year}`;
//   };

//   const handleFileChange = async (e, label) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     const allowedTypes = ["application/pdf"];

//     if (!allowedTypes.includes(selectedFile.type)) {
//       alert("Upload must be a PDF file");
//       return;
//     }

//     const currentFiles = watch(label) || [];
//     setValue(label, [...currentFiles, selectedFile]);

//     try {
//       await uploadDocs(selectedFile, label, setUploadPAU);
//       setUploadedFileNames((prev) => ({
//         ...prev,
//         [label]: selectedFile.name, // Store just the file name
//       }));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const PACreValue = {
//         ...data,
//         perAccUp: JSON.stringify(uploadPAU.perAccUp),
//       };
//       console.log(PACreValue);
//       const response = await client.graphql({
//         query: createPersonalAccident,
//         variables: { input: PACreValue },
//       });

//       console.log("Successfully submitted data:", response);
//       setNotification(true);
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchInsuranceData = async () => {
//       try {
//         const response = await client.graphql({
//           query: listPersonalAccidents,
//         });
//         setInsuranceData(response.data.listPersonalAccidents.items);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching insurance data:", error);
//         setError("insuranceData", { message: "Error fetching data" });
//         setLoading(false);
//       }
//     };
//     fetchInsuranceData();
//   }, []);

//   const openPopup = (fileUrl) => {
//     setPopupImage(fileUrl); // Set the URL for the image or file
//     setPopupVisible(true); // Show the popup
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="mx-auto min-h-screen py-5 px-10 my-10 bg-[#F5F6F1CC]"
//     >
//       {/* Personal Accident Insurance Fields */}
//       <h3 className="mb-5 text-lg font-bold">Personal Accident Insurance</h3>
//       <div className="relative mb-5">
//         <div className="grid grid-cols-3 gap-4 items-center">
//           {/* Personal Accident Policy Number */}
//           <FormField
//             name="perAccNo"
//             type="text"
//             placeholder="Enter Personal Accident Policy Number"
//             label="Policy Number"
//             register={register}
//             errors={errors}
//           />

//           {/* Personal Accident Expiry Date */}
//           <FormField
//             name="perAccExp"
//             type="date"
//             label="Expiry Date"
//             register={register}
//             errors={errors}
//           />

//           {/* File Upload */}
//           <div className="mb-2 relative">
//             <FileUploadField
//               label="Upload File"
//               onChangeFunc={(e) => handleFileChange(e, "perAccUp")}
//               register={register}
//               name="perAccUp"
//               error={errors}
//             />
//             <div className="absolute">
//               {uploadedFileNames.perAccUp && (
//                 <span className="text-sm text-grey ">{uploadedFileNames.perAccUp}</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="center my-10">
//         <button type="submit" className="primary_btn">
//           Save
//         </button>
//       </div>

//       {notification && (
//         <SpinLogo
//           text="Insurance Info Saved Successfully"
//           notification={notification}
//           path="/insuranceHr/personalAccii"
//         />
//       )}

//       {/* View Insurance Info Section */}
//       <div className="mt-20">
//         <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
//           View Insurance Info
//         </p>
//         {insuranceData.length > 0 ? (
//           <table className="w-full text-center">
//             <thead className="bg-[#939393] text-white">
//               <tr>
//                 <th className="pl-4 py-4 rounded-tl-lg">Policy Number</th>
//                 <th className="pl-4 py-4">Expiry Date</th>
//                 <th className="pl-4 py-4 rounded-tr-lg">Uploaded File</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white cursor-pointer">
//               {insuranceData.map((data, index) => (
//                 <tr
//                   key={index}
//                   className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
//                 >
//                   <td className="pl-4 py-4">{data.perAccNo}</td>
//                   <td className="py-4 px-4">
//                     {formatDate(data?.perAccExp || "N/A")}
//                   </td>
//                   <td className="pl-4 py-4">
//                     {data.perAccUp ? (
//                       JSON.parse(data.perAccUp).map((file, idx) => (
//                         <div key={idx}>
//                           <a
//                             href="#"
//                             onClick={() =>
//                               openPopup(`https://your-bucket.s3.amazonaws.com/${file.upload}`)
//                             }
//                             className="text-[blue] underline"
//                           >
//                             View
//                           </a>
//                         </div>
//                       ))
//                     ) : (
//                       "No file uploaded"
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center mt-10">No insurance information available.</p>
//         )}
//       </div>

//       {/* Popup */}
//       {popupVisible && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
//             <button
//               onClick={() => setPopupVisible(false)}
//               className="absolute top-2 right-2 text-gray-500"
//             >
//               <FaTimes />
//             </button>
//             {popupImage.endsWith(".pdf") ? (
//               <div>
//                 <Document
//                   file={popupImage}
//                   onLoadSuccess={onDocumentLoadSuccess}
//                   className="w-full"
//                 >
//                   <Page pageNumber={pageNumber} />
//                 </Document>
//                 <div className="flex justify-between">
//                   <button
//                     disabled={pageNumber <= 1}
//                     onClick={() => setPageNumber(pageNumber - 1)}
//                     className="btn"
//                   >
//                     Prev
//                   </button>
//                   <button
//                     disabled={pageNumber === numPages}
//                     onClick={() => setPageNumber(pageNumber + 1)}
//                     className="btn"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <img
//                 src={popupImage}
//                 alt="Uploaded File"
//                 className="w-full max-w-md mx-auto"
//               />
//             )}
//             <div className="flex justify-between mt-2">
//               <a
//                 href={popupImage}
//                 download
//                 className="btn"
//               >
//                 <FaDownload /> Download
//               </a>
//               <button className="btn" onClick={handlePrint}>
//                 <FaPrint /> Print
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </form>
//   );
// };


// // import React, { useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
// // import { FormField } from "../../utils/FormField";
// // import { FileUploadField } from "../employees/medicalDep/FileUploadField";
// // import { SpinLogo } from "../../utils/SpinLogo";
// // import { PersonalAcciSchema } from "../../services/EmployeeValidation";
// // import { generateClient } from "@aws-amplify/api";
// // import { createPersonalAccident } from "../../graphql/mutations";
// // import { listPersonalAccidents } from "../../graphql/queries";

// // export const PersonalAcci = () => {
// //   const client = generateClient();

// //   const [uploadedFileNames, setUploadedFileNames] = useState({
// //     perAccUp: null,
// //   });
// //   const [uploadPAU, setUploadPAU] = useState({
// //     perAccUp: [],
// //   });
// //   const [notification, setNotification] = useState(false);
// //   const [insuranceData, setInsuranceData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Popup State
// //   const [popupVisible, setPopupVisible] = useState(false);
// //   const [popupImage, setPopupImage] = useState("");

// //   const {
// //     register,
// //     handleSubmit,
// //     control,
// //     watch,
// //     setValue,
// //     formState: { errors },
// //   } = useForm({
// //     resolver: yupResolver(PersonalAcciSchema),
// //   });

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     const day = date.getDate().toString().padStart(2, "0");
// //     const month = (date.getMonth() + 1).toString().padStart(2, "0");
// //     const year = date.getFullYear();

// //     return `${day}/${month}/${year}`;
// //   };

// //   const handleFileChange = async (e, label) => {
// //     const selectedFile = e.target.files[0];
// //     if (!selectedFile) return;

// //     const allowedTypes = ["application/pdf"];

// //     if (!allowedTypes.includes(selectedFile.type)) {
// //       alert("Upload must be a PDF file");
// //       return;
// //     }

// //     const currentFiles = watch(label) || [];
// //     setValue(label, [...currentFiles, selectedFile]);

// //     try {
// //       await uploadDocs(selectedFile, label, setUploadPAU);
// //       setUploadedFileNames((prev) => ({
// //         ...prev,
// //         [label]: selectedFile.name, // Store just the file name
// //       }));
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   const onSubmit = async (data) => {
// //     try {
// //       const PACreValue = {
// //         ...data,
// //         perAccUp: JSON.stringify(uploadPAU.perAccUp),
// //       };
// //       console.log(PACreValue);
// //       const response = await client.graphql({
// //         query: createPersonalAccident,
// //         variables: { input: PACreValue },
// //       });

// //       console.log("Successfully submitted data:", response);
// //       setNotification(true);
// //     } catch (error) {
// //       console.error("Error submitting data:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchInsuranceData = async () => {
// //       try {
// //         const response = await client.graphql({
// //           query: listPersonalAccidents,
// //         });
// //         setInsuranceData(response.data.listPersonalAccidents.items);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching insurance data:", error);
// //         setError("insuranceData", { message: "Error fetching data" });
// //         setLoading(false);
// //       }
// //     };
// //     fetchInsuranceData();
// //   }, []);

// //   const openPopup = (fileUrl) => {
// //     setPopupImage(fileUrl); // Set the URL for the image or file
// //     setPopupVisible(true); // Show the popup
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit(onSubmit)}
// //       className="mx-auto min-h-screen py-5 px-10 my-10 bg-[#F5F6F1CC]"
// //     >
// //       {/* Personal Accident Insurance Fields */}
// //       <h3 className="mb-5 text-lg font-bold">Personal Accident Insurance</h3>
// //       <div className="relative mb-5">
// //         <div className="grid grid-cols-3 gap-4 items-center">
// //           {/* Personal Accident Policy Number */}
// //           <FormField
// //             name="perAccNo"
// //             type="text"
// //             placeholder="Enter Personal Accident Policy Number"
// //             label="Policy Number"
// //             register={register}
// //             errors={errors}
// //           />

// //           {/* Personal Accident Expiry Date */}
// //           <FormField
// //             name="perAccExp"
// //             type="date"
// //             label="Expiry Date"
// //             register={register}
// //             errors={errors}
// //           />

// //           {/* File Upload */}
// //           <div className="mb-2 relative">
// //             <FileUploadField
// //               label="Upload File"
// //               onChangeFunc={(e) => handleFileChange(e, "perAccUp")}
// //               register={register}
// //               name="perAccUp"
// //               error={errors}
// //             />
// //             <div className="absolute">
// //               {uploadedFileNames.perAccUp && (
// //                 <span className="text-sm text-grey ">
// //                   {uploadedFileNames.perAccUp}
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {/* Submit Button */}
// //       <div className="center my-10">
// //         <button type="submit" className="primary_btn">
// //           Save
// //         </button>
// //       </div>
// //       {notification && (
// //         <SpinLogo
// //           text="Insurance Info Saved Successfully"
// //           notification={notification}
// //           path="/insuranceHr/personalAccii"
// //         />
// //       )}
// //       {/* View Insurance Info Section */}
// //       <div className="mt-20">
// //         <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
// //           View Insurance Info
// //         </p>
// //         {insuranceData.length > 0 ? (
// //           <table className="w-full text-center">
// //             <thead className="bg-[#939393] text-white">
// //               <tr>
// //                 <th className="pl-4 py-4 rounded-tl-lg">Policy Number</th>
// //                 <th className="pl-4 py-4">Expiry Date</th>
// //                 <th className="pl-4 py-4 rounded-tr-lg">Uploaded File</th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white cursor-pointer">
// //               {insuranceData.map((data, index) => (
// //                 <tr
// //                   key={index}
// //                   className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
// //                 >
// //                   <td className="pl-4 py-4">{data.perAccNo}</td>
// //                   <td className="py-4 px-4">
// //                     {formatDate(data?.perAccExp || "N/A")}
// //                   </td>
// //                   <td className="pl-4 py-4">
// //                     {data.perAccUp ? (
// //                       JSON.parse(data.perAccUp).map((file, idx) => (
// //                         <div key={idx}>
// //                           <a
// //                             href="#"
// //                             onClick={() =>
// //                               openPopup(
// //                                 `https://your-bucket.s3.amazonaws.com/${file.upload}`
// //                               )
// //                             }
// //                             className="text-[blue] underline"
// //                           >
// //                             View
// //                           </a>
// //                         </div>
// //                       ))
// //                     ) : (
// //                       "No file uploaded"
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           <p className="text-center mt-10">No insurance information available.</p>
// //         )}
// //       </div>

// //       {/* Popup */}
// //       {popupVisible && (
// //          {documents.map((document, index) => (
// //           <div
// //             key={index}
// //             className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
// //           >
// //             <div className="flex justify-between items-center">
// //               <span className="uppercase font-semibold text-sm">
// //                 Uploaded on: {formatDate(document.date)}
// //               </span>
// //               <button
// //                 onClick={() => linkToStorageFile(document.upload)} // Fetch the URL for the document
// //                 className="text-dark_grey font-semibold text-sm"
// //               >
// //                 View Document
// //               </button>
// //             </div>

// //             {/* Conditional rendering of PDF or image */}
// //             {viewingDocument === document.upload &&
// //               document.upload.endsWith(".pdf") && (
// //                 <div className="mt-4">
// //                   <div className="relative bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
// //                     <div ref={invoiceRef} className="flex justify-center">
// //                       <Document
// //                         file={lastUploadUrl} // Use the URL fetched for the document
// //                         onLoadSuccess={onDocumentLoadSuccess}
// //                         className="w-full"
// //                       >
// //                         <Page pageNumber={pageNumber} className=" mx-auto" />
// //                       </Document>
// //                     </div>

// //                     {/* Pagination Controls */}
// //                     <div className="mt-4 flex justify-between items-center">
// //                       <button
// //                         onClick={() => setPageNumber(pageNumber - 1)}
// //                         disabled={pageNumber <= 1}
// //                         className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
// //                       >
// //                         Previous
// //                       </button>
// //                       <span className="text-gray-700">
// //                         Page {pageNumber} of {numPages}
// //                       </span>
// //                       <button
// //                         onClick={() => setPageNumber(pageNumber + 1)}
// //                         disabled={pageNumber >= numPages}
// //                         className="bg-blue-600 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-800"
// //                       >
// //                         Next
// //                       </button>
// //                     </div>

// //                     {/* Close Button */}
// //                     <div className="absolute top-2 right-2">
// //                       <button
// //                         onClick={() => setViewingDocument(null)} // Close the viewer
// //                         className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
// //                       >
// //                         <FaTimes />
// //                       </button>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center justify-center gap-6 py-4">
// //                     <div className="mt-2 flex">
// //                       <button className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2">
// //                         <a href={lastUploadUrl} download>
// //                           Download
// //                         </a>
// //                         <FaDownload className="ml-2 mt-1" />
// //                       </button>
// //                     </div>
// //                     <div className="mt-2 flex">
// //                       <button
// //                         onClick={handlePrint}
// //                         className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
// //                       >
// //                         Print
// //                         <FaPrint className="ml-2 mt-1" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //             {/* Image Viewer */}
// //             {viewingDocument === document.upload &&
// //               !document.upload.endsWith(".pdf") && (
// //                 <div className="relative mt-4">
// //                   <div ref={invoiceRef}>
// //                     <img
// //                       src={lastUploadUrl} // Use the URL for the image
// //                       alt="Document Preview"
// //                       className="w-full h-auto"
// //                     />
// //                   </div>

// //                   <div className="absolute top-2 right-2">
// //                     <button
// //                       onClick={() => setViewingDocument(null)} // Close the viewer
// //                       className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
// //                     >
// //                       <FaTimes />
// //                     </button>
// //                   </div>

// //                   <div className="flex items-center justify-center gap-6 py-4">
// //                     <div className="mt-2 flex">
// //                       <button className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2">
// //                         <a href={lastUploadUrl} download>
// //                           Download
// //                         </a>
// //                         <FaDownload className="ml-2 mt-1" />
// //                       </button>
// //                     </div>
// //                     <div className="mt-2 flex">
// //                       <button
// //                         onClick={handlePrint}
// //                         className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
// //                       >
// //                         Print
// //                         <FaPrint className="ml-2 mt-1" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //           </div>
// //         ))}
// //       )}
// //     </form>
// //   );
// // };
// // import React, { useEffect, useState } from 'react';
// // import { useForm, useFieldArray } from "react-hook-form";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
// // import { FormField } from "../../utils/FormField";
// // import { FileUploadField } from "../employees/medicalDep/FileUploadField";
// // import { SpinLogo } from "../../utils/SpinLogo";
// // import { PersonalAcciSchema } from '../../services/EmployeeValidation';
// // import { generateClient } from "@aws-amplify/api";
// // import { createPersonalAccident } from "../../graphql/mutations";
// // import { listPersonalAccidents } from "../../graphql/queries";

// // export const PersonalAcci = () => {
// //   const client = generateClient();

// //   const [uploadedFileNames, setUploadedFileNames] = useState({
// //     perAccUp: null,
// //   });
// //   const [uploadPAU, setUploadPAU] = useState({
// //     perAccUp: [], 
// //   });
// //     const [notification, setNotification] = useState(false);
// //     const [insuranceData, setInsuranceData] = useState([]); 
// //     const [loading, setLoading] = useState(true); 
// //     const [error, setError] = useState(null); // To track error state


// //   const {
// //     register,
// //     handleSubmit,
// //     control,
// //     watch,
// //     setValue,
// //     formState: { errors },
// //   } = useForm({
// //     resolver: yupResolver(PersonalAcciSchema),
  
// // });


// // const formatDate = (dateString) => {
// //   const date = new Date(dateString);
// //   const day = date.getDate().toString().padStart(2, '0');  // Adds leading zero if day is single digit
// //   const month = (date.getMonth() + 1).toString().padStart(2, '0');  // getMonth() returns 0-11, so we add 1
// //   const year = date.getFullYear();
  
// //   return `${day}/${month}/${year}`;
// // };


// // const handleFileChange = async (e, label) => {
// //   const selectedFile = e.target.files[0];
// //   if (!selectedFile) return;

// //   const allowedTypes = [
// //     "application/pdf",
// //   ];


// //   if (!allowedTypes.includes(selectedFile.type)) {
// //     alert("Upload must be a PDF file ");
// //     return;
// //   }

// //   const currentFiles = watch(label) || [];
// //   setValue(label, [...currentFiles, selectedFile]);

// //   try {
// //     await uploadDocs(selectedFile, label, setUploadPAU);
// //     setUploadedFileNames((prev) => ({
// //       ...prev,
// //       [label]: selectedFile.name, // Store just the file name
// //     }));
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };


// // const onSubmit = async (data) => {
// //   try {
// //     const PACreValue = {
// //       ...data,
// //       perAccUp: JSON.stringify(uploadPAU.perAccUp)
// //     } 
// //     console.log(PACreValue);
// //     const response = await client.graphql({
// //       query: createPersonalAccident,
// //       variables: { input: PACreValue },
// //     });

// //     console.log("Successfully submitted data:", response);
// //     setNotification(true);
// //   } catch (error) {
// //     console.error("Error submitting data:", error);
// //   }
// // };

// // useEffect(() => {
// //   const fetchInsuranceData = async () => {
// //     try {
// //       const response = await client.graphql({
// //         query: listPersonalAccidents,
// //       });
// //       setInsuranceData(response.data.listPersonalAccidents.items);
// //       setLoading(false); 
// //     } catch (error) {
// //       console.error('Error fetching insurance data:', error);
// //       setError('insuranceData', { message: 'Error fetching data' }); // Set error using setError
// //       setLoading(false);
// //     }
// //   };  
// //   fetchInsuranceData();
// // }, []);

// //   return (
// // <form onSubmit={handleSubmit(onSubmit)} className="mx-auto min-h-screen py-5 px-10 my-10 bg-[#F5F6F1CC]">

// // {/* Personal Accident Insurance Fields */}
// // <h3 className="mb-5 text-lg font-bold">Personal Accident Insurance</h3>
// // <div className="relative mb-5">
// //     <div  className="grid grid-cols-3 gap-4 items-center">
    
// //       {/* Personal Accident Policy Number */}
// //       <FormField
// //         name="perAccNo"
// //         type="text"
// //         placeholder="Enter Personal Accident Policy Number"
// //         label="Policy Number"
// //         register={register}
// //         errors={errors}
// //       />

// //       {/* Personal Accident Expiry Date */}
// //       <FormField
// //         name="perAccExp"
// //         type="date"
// //         label="Expiry Date"
// //         register={register}
// //         errors={errors}
// //       />

// //       {/* File Upload */}
// //       <div className="mb-2 relative">
// //     <FileUploadField
// //       label="Upload File"
// //       onChangeFunc={(e) => handleFileChange(e, "perAccUp")}
// //       register={register}
// //       name="perAccUp"
// //       error={errors}
// //     />
// // <div className='absolute'>
// //     {uploadedFileNames.perAccUp && (
// //       <span className="text-sm text-grey ">
// //         {uploadedFileNames.perAccUp}
// //       </span>
// //     )}
// //     </div>
// //     </div>

// //   </div>
// // </div> 
// // {/* Submit Button */}
// // <div className="center my-10">
// //         <button type="submit" className="primary_btn">
// //           Save
// //         </button>
// //       </div>
// //       {notification && (
// //         <SpinLogo
// //           text="Insurance Info Saved Successfully"
// //           notification={notification}
// //           path="/insuranceHr/personalAccii"
// //         />
// //       )}
// //     {/* View Insurance Info Section */}
// //     <div className="mt-20">
// //     <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
// //           View Insurance Info
// //         </p>
// //         {insuranceData.length > 0 ? (
// //           <table className="w-full text-center">
// //             <thead className="bg-[#939393] text-white">
// //               <tr>
// //                 <th className="pl-4 py-4 rounded-tl-lg">Policy Number</th>
// //                 <th className="pl-4 py-4">Expiry Date</th>
// //                 <th className="pl-4 py-4 rounded-tr-lg">Uploaded File</th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white cursor-pointer">
// //               {insuranceData.map((data, index) => (
// //                 <tr
// //                   key={index}
// //                   className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
// //                 >
// //                   <td className="pl-4 py-4">{data.perAccNo}</td>
// //                   <td className="py-4 px-4">{formatDate(data?.perAccExp || "N/A")}</td>           
// //                   <td className="pl-4 py-4">
// //                     {data.perAccUp ? (
// //                       <a
// //                         href={data.perAccUp}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         className="text-[blue] underline"
// //                       >
// //                         View
// //                       </a>
// //                     ) : (
// //                       "No file uploaded"
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           <p className="text-center mt-10">No insurance information available.</p>
// //         )}
// //       </div>

// //     </form>
// //   );
// // };