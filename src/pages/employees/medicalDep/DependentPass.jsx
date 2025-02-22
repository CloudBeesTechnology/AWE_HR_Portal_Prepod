import { useContext, useEffect, useRef, useState } from "react";
import { FormField } from "../../../utils/FormField";
import { FileUploadFieldNew } from "./FileUploadField";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { LabourTypeDD, uploadFields } from "../../../utils/DropDownMenus";
import { DataSupply } from "../../../utils/DataStoredContext";
import { useFieldArray } from "react-hook-form";
import { DeleteDocsDependPass } from "../../../services/uploadDocsDelete/DeleteDocsDependPass";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";

export const DependentPass = ({
  errors,
  register,
  setValue,
  setArrayUploadDocs,
  control,
  value,
  getValues,
  watch,
  UploadingFiles,
}) => {
  const isInitialMount = useRef(true);
  const [docsUploaded, setDocsUploaded] = useState({});
  const [isUploading, setIsUploading] = useState({
    uploadDp: false,
    uploadDr: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({});

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "dependPass",
  });

  useEffect(() => {
    if (isInitialMount.current) {
      if (value && value.length > 0) {
        const parsedValue = typeof value === "string" ? JSON.parse(value) : value;
        const normalizedValue = parsedValue.map((item) => ({
          ...item,
          uploadDp: Array.isArray(item.uploadDp)
            ? item.uploadDp
            : [
                typeof item.uploadDp === "string"
                  ? JSON.parse(item.uploadDp)
                  : item.uploadDp,
              ],
          uploadDr: Array.isArray(item.uploadDr)
            ? item.uploadDr
            : [
                typeof item.uploadDr === "string"
                  ? JSON.parse(item.uploadDr)
                  : item.uploadDr,
              ],
        }));

        replace(normalizedValue);
        setValue("dependPass", normalizedValue);
      } else {
        append({
          dependName: "",
          dependPpNo: "",
          dependPpE: "",
          relation: "",
          labourDPBy: "",
          labourDRNo: "",
          labourDAmount: "",
          uploadDp: [],
          uploadDr: [],
          isNew: false,
        });
      }
      isInitialMount.current = false;
    } else if (value && value.length > 0) {
      const parsedValue = typeof value === "string" ? JSON.parse(value) : value;
      const normalizedValue = parsedValue.map((item) => ({
        ...item,
        uploadDp: Array.isArray(item.uploadDp)
          ? item.uploadDp
          : [
              typeof item.uploadDp === "string"
                ? JSON.parse(item.uploadDp)
                : item.uploadDp,
            ],
        uploadDr: Array.isArray(item.uploadDr)
          ? item.uploadDr
          : [
              typeof item.uploadDr === "string"
                ? JSON.parse(item.uploadDr)
                : item.uploadDr,
            ],
      }));

      replace(normalizedValue);
      setValue("dependPass", normalizedValue);

      const uploadFields = ["uploadDp", "uploadDr"];

      uploadFields.forEach((field) => {
        if (normalizedValue && Array.isArray(normalizedValue)) {
          normalizedValue.forEach((item, idx) => {
            const url = item?.[field];

            const parsedFiles = Array.isArray(url)
              ? url.map((fileItem) => {
                  if (fileItem && typeof fileItem === "object" && fileItem.upload) {
                    return typeof fileItem === "string" ? JSON.parse(fileItem) : fileItem;
                  }
                  return null;
                }).filter(Boolean)
              : [];

            setDocsUploaded((prev) => {
              const updatedDepInsurance = Array.isArray(prev[field])
                ? [...prev[field]]
                : [];
              updatedDepInsurance[idx] = parsedFiles;

              return {
                ...prev,
                [field]: updatedDepInsurance,
              };
            });

            const fileNames = parsedFiles.map((file) =>
              file && file.upload ? getFileName(file.upload) : ""
            );

            setUploadedFileNames((prev) => ({
              ...prev,
              [`${idx}_${field}`]: fileNames,
            }));
          });
        }
      });
    }
  }, [value, append, replace, setValue]);

  const getFileName = (filePath) => {
    if (!filePath) {
      return "";
    }
    const fileNameWithExtension = filePath.split("/").pop();
    return fileNameWithExtension;
  };

  const watchedEmpID = watch("empID");

  const handleFileChange = async (e, fieldName, index) => {
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/labourImmigration";
      return;
    }
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Upload must be a PDF file");
      return;
    }
    const currentFiles = getValues(`dependPass[${index}].${fieldName}`) || [];
    const updatedFiles = [...currentFiles, file];

    setValue(`dependPass[${index}].${fieldName}`, updatedFiles);

    try {
      await uploadDocs(file, fieldName, setDocsUploaded, watchedEmpID, index);

      setUploadedFileNames((prev) => ({
        ...prev,
        [`${index}_${fieldName}`]: [...(prev[`${index}_${fieldName}`] || []), file.name],
      }));
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const deleteFile = async (fileType, fileName, index) => {
    try {
      const watchedEmpID = watch("empID");
      if (!watchedEmpID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }
  
      // Delete the file from the server
      const isDeleted = await handleDeleteFile(fileType, fileName, watchedEmpID);
      const isDeletedArrayUploaded = await DeleteDocsDependPass(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setDocsUploaded,
        setIsUploading
      );
  
      if (isDeleted || isDeletedArrayUploaded) {
        // Update the form state using setValue
        const currentFiles = getValues(`dependPass[${index}].${fileType}`) || [];
        const updatedFiles = currentFiles.filter((file) => {
          // Ensure we're comparing the correct file name
          const filePath = file?.upload || file?.name;
          return getFileName(filePath) !== fileName;
        });
  
        setValue(`dependPass[${index}].${fileType}`, updatedFiles);
  
        // Update the local state (uploadedFileNames and docsUploaded)
        setUploadedFileNames((prev) => ({
          ...prev,
          [`${index}_${fileType}`]: updatedFiles.map((file) => getFileName(file?.upload || file?.name)),
        }));
  
        setDocsUploaded((prev) => {
          const updatedDocs = { ...prev };
          if (Array.isArray(updatedDocs[fileType])) {
            updatedDocs[fileType][index] = updatedFiles;
          }
          return updatedDocs;
        });
  
        console.log("File deleted successfully:", fileName);
      } else {
        console.error("Failed to delete file from the server:", fileName);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };
console.log(docsUploaded);

  useEffect(() => {
    setArrayUploadDocs(docsUploaded);
  }, [docsUploaded, setArrayUploadDocs]);

  const handleAddDependPass = () => {
    append({
      dependName: "",
      dependPpNo: "",
      dependPpE: "",
      relation: "",
      labourDPBy: "",
      labourDRNo: "",
      labourDAmount: "",
      uploadDp: [],
      uploadDr: [],
    });
  };

  return (
    <div className="form-group mt-5">
      <div className="flex justify-between mb-5 text-dark_grey">
        <label className="text_size_3">Dependent Pass Info</label>
        <button
          type="button"
          className="px-3 py-1 rounded"
          onClick={handleAddDependPass}
        >
          <CiSquarePlus className="text-xl" />
        </button>
      </div>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="grid grid-cols-4 gap-4 mb-2 relative">
            <FormField
              label="Dependent Name"
              type="text"
              name={`dependPass[${index}].dependName`}
              placeholder="Enter Name"
              errors={errors}
              register={register}
            />
            <FormField
              label="Passport Number"
              type="text"
              name={`dependPass[${index}].dependPpNo`}
              placeholder="Enter Passport Number"
              errors={errors}
              register={register}
            />
            <FormField
              label="Date of Birth"
              type="date"
              name={`dependPass[${index}].dependPpE`}
              placeholder="Enter Date of Birth"
              errors={errors}
              register={register}
            />
            <FormField
              label="Relation"
              type="text"
              name={`dependPass[${index}].relation`}
              placeholder="Enter Relation"
              errors={errors}
              register={register}
            />
            <FormField
              label="Labour Deposit By"
              type="select"
              name={`dependPass[${index}].labourDPBy`}
              options={LabourTypeDD}
              errors={errors}
              register={register}
            />
            <FormField
              label="Labour Deposit Received Number"
              type="text"
              name={`dependPass[${index}].labourDRNo`}
              placeholder="Enter Deposit Number"
              errors={errors}
              register={register}
            />
            <FormField
              label="Labour Deposit Amount"
              type="number"
              inputmode="numeric"
              name={`dependPass[${index}].labourDAmount`}
              placeholder="Enter Deposit Amount"
              errors={errors}
              register={register}
            />
            <FileUploadFieldNew
              label="Upload Dependent Pass"
              onChangeFunc={(e) => handleFileChange(e, "uploadDp", index)}
              register={register(`dependPass[${index}].uploadDp`)}
              error={errors?.dependPass?.[index]?.uploadDp}
              deleteFile={(fileName) => deleteFile("uploadDp", fileName, index)}
              uploadedFileNames={uploadedFileNames}
              fileName={uploadedFileNames[`${index}_uploadDp`] || ""}
              fileType="uploadDp"
            />
            <FileUploadFieldNew
              label="Upload Dependent Passport"
              onChangeFunc={(e) => handleFileChange(e, "uploadDr", index)}
              register={register(`dependPass[${index}].uploadDr`)}
              error={errors?.dependPass?.[index]?.uploadDr}
              deleteFile={(fileName) => deleteFile("uploadDr", fileName, index)}
              fileName={uploadedFileNames[`${index}_uploadDr`] || ""}
              fileType="uploadDr"
            />
            {index !== 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-0 right-0 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};


// import React, { useEffect, useRef, useState } from "react";
// import { FormField } from "../../../utils/FormField";
// import { FileUploadFieldArr } from "./FileUploadField";
// import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
// import { FaRegMinusSquare } from "react-icons/fa";
// import { CiSquarePlus } from "react-icons/ci";
// import { LabourTypeDD } from "../../../utils/DropDownMenus";
// import { useFieldArray } from "react-hook-form";
// import { DeleteDocsDependPass } from "../../../services/uploadDocsDelete/DeleteDocsDependPass";
// import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";

// export const DependentPass = ({
//   errors,
//   register,
//   setValue,
//   setArrayUploadDocs,
//   control,
//   value,
//   getValues,
//   watch,
//   id,
//   trigger,
//   setUploadedFileNames,
// }) => {
//   const isInitialMount = useRef(true);
//   const [docsUploaded, setDocsUploaded] = useState({});
//   const [uploadedFileNames, setUploadedFileNames] = useState({});
//   const [isUploading, setIsUploading] = useState({});

//   const { fields, append, remove, replace } = useFieldArray({
//     control,
//     name: "dependPass",
//   });

//   const getFileName = (filePath) => {
//     if (!filePath) return "";

//     if (typeof filePath === "object" && filePath.name) {
//       return filePath.name;
//     }

//     if (typeof filePath === "string") {
//       return filePath.split("/").pop();
//     }

//     return "";
//   };

//   useEffect(() => {
//     if (isInitialMount.current) {
//       if (value && value.length > 0) {
//         const parsedValue = typeof value === "string" ? JSON.parse(value) : value;
//         const normalizedValue = parsedValue.map((item) => ({
//           ...item,
//           uploadDp: Array.isArray(item.uploadDp) ? item.uploadDp : [item.uploadDp],
//           uploadDr: Array.isArray(item.uploadDr) ? item.uploadDr : [item.uploadDr],
//         }));

//         replace(normalizedValue);
//         setValue("dependPass", normalizedValue);
//       } else {
//         append({
//           dependName: "",
//           dependPpNo: "",
//           dependPpE: "",
//           relation: "",
//           labourDPBy: "",
//           labourDRNo: "",
//           labourDAmount: "",
//           uploadDp: [],
//           uploadDr: [],
//           isNew: false,
//         });
//       }
//       isInitialMount.current = false;
//     } else if (value && value.length > 0) {
//       const parsedValue = typeof value === "string" ? JSON.parse(value) : value;
//       const normalizedValue = parsedValue.map((item) => ({
//         ...item,
//         uploadDp: Array.isArray(item.uploadDp) ? item.uploadDp : [item.uploadDp],
//         uploadDr: Array.isArray(item.uploadDr) ? item.uploadDr : [item.uploadDr],
//       }));

//       replace(normalizedValue);
//       setValue("dependPass", normalizedValue);

//       const uploadFields = ["uploadDp", "uploadDr"];

//       uploadFields.forEach((field) => {
//         if (normalizedValue && Array.isArray(normalizedValue)) {
//           normalizedValue.forEach((item, idx) => {
//             const url = item?.[field];
//             const parsedFiles = Array.isArray(url) ? url : [url];

//             setDocsUploaded((prev) => ({
//               ...prev,
//               [`${idx}_${field}`]: parsedFiles,
//             }));

//             const fileName = parsedFiles.length > 0 ? getFileName(parsedFiles[parsedFiles.length]) : "";

//             setUploadedFileNames((prev) => ({
//               ...prev,
//               [`${idx}_${field}`]: fileName,
//             }));
//           });
//         }
//       });
//     }
//   }, [value, append, replace, setValue]);

//   const updateUploadingState = (label, value) => {
//     setIsUploading((prev) => ({
//       ...prev,
//       [label]: value,
//     }));
//     console.log(value);
//   };

//   const handleFileChange = async (e, label, index) => {
//     const watchedEmpID = watch("empID");
//     if (!watchedEmpID) {
//       alert("Please enter the Employee ID before uploading files.");
//       window.location.href = "/employeeInfo";
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
//     const currentFiles = watch(`dependPass[${index}].${label}`) || [];
//     if (currentFiles.some((file) => file.name === selectedFile.name)) {
//       alert("This file has already been uploaded.");
//       return;
//     }

//     setValue(`dependPass[${index}].${label}`, [...currentFiles, selectedFile]);

//     try {
//       updateUploadingState(label, true);
//       await uploadDocs(selectedFile, label, setDocsUploaded, watchedEmpID);

//       const newFileName = selectedFile.name;

//       // ✅ Fix uploadedFileNames state update
//       setUploadedFileNames((prev) => ({
//         ...prev,
//         [`${index}_${label}`]: newFileName, // Use correct key format
//       }));

//       setUploadedFileNames((prev) => ({
//         ...prev,
//         [`${index}_${label}`]: newFileName,
//       }));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteFile = async (fieldTitle, fileName, index) => {
//     try {
//       const watchedEmpID = watch("empID");
//       if (!watchedEmpID) {
//         alert("Please provide the Employee ID before deleting files.");
//         return;
//       }

//       const isDeleted = await handleDeleteFile(fieldTitle, fileName, watchedEmpID);
//       const isDeletedArrayUploaded = await DeleteDocsDependPass(
//         fieldTitle,
//         fileName,
//         watchedEmpID,
//         setUploadedFileNames,
//         setDocsUploaded,
//         setIsUploading
//       );

//       if (!isDeleted || isDeletedArrayUploaded) {
//         console.error(`Failed to delete file: ${fileName}, skipping UI update.`);
//         return;
//       }

//       // Update uploadedFileNames state
//       setUploadedFileNames((prev) => {
//         const updatedFileNames = { ...prev };
//         const key = `${index}_${fieldTitle}`;
//         if (updatedFileNames[key]) {
//           updatedFileNames[key] = updatedFileNames[key].filter((name) => name !== fileName);
//         }
//         return updatedFileNames;
//       });
//     } catch (error) {
//       console.error("Error deleting file:", error);
//       alert("Error processing the file deletion.");
//     }
//   };

//   useEffect(() => {
//     setArrayUploadDocs(docsUploaded);
//   }, [docsUploaded, setArrayUploadDocs]);

//   const handleAddDependPass = () => {
//     append({
//       dependName: "",
//       dependPpNo: "",
//       dependPpE: "",
//       relation: "",
//       labourDPBy: "",
//       labourDRNo: "",
//       labourDAmount: "",
//       uploadDp: [],
//       uploadDr: [],
//     });
//   };

//   return (
//     <div className="form-group mt-5">
//       <div className="flex justify-between mb-5 text-dark_grey">
//         <label className="text_size_3">Dependent Pass Info</label>
//         <button type="button" className="px-3 py-1 rounded" onClick={handleAddDependPass}>
//           <CiSquarePlus className="text-xl" />
//         </button>
//       </div>
//       {fields.map((field, index) => (
//         <div key={field.id} className="grid grid-cols-4 gap-4 mb-2 relative">
//           <FormField
//             label="Dependent Name"
//             type="text"
//             name={`dependPass[${index}].dependName`}
//             placeholder="Enter Name"
//             errors={errors}
//             register={register}
//           />
//           <FormField
//             label="Passport Number"
//             type="text"
//             name={`dependPass[${index}].dependPpNo`}
//             placeholder="Enter Passport Number"
//             errors={errors}
//             register={register}
//           />
//           <FormField
//             label="Date of Birth"
//             type="date"
//             name={`dependPass[${index}].dependPpE`}
//             placeholder="Enter Date of Birth"
//             errors={errors}
//             register={register}
//           />
//           <FormField
//             label="Relation"
//             type="text"
//             name={`dependPass[${index}].relation`}
//             placeholder="Enter Relation"
//             errors={errors}
//             register={register}
//           />
//           <FormField
//             label="Labour Deposit By"
//             type="select"
//             name={`dependPass[${index}].labourDPBy`}
//             options={LabourTypeDD}
//             errors={errors}
//             register={register}
//           />
//           <FormField
//             label="Labour Deposit Received Number"
//             type="text"
//             name={`dependPass[${index}].labourDRNo`}
//             placeholder="Enter Deposit Number"
//             errors={errors}
//             register={register}
//           />
//           <FormField
//             label="Labour Deposit Amount"
//             type="text"
//             name={`dependPass[${index}].labourDAmount`}
//             placeholder="Enter Deposit Amount"
//             errors={errors}
//             register={register}
//           />
//           <FileUploadFieldArr
//             label="Upload Dependent Pass"
//             onChangeFunc={(e) => handleFileChange(e, "uploadDp", index)}
//             register={register(`dependPass[${index}].uploadDp`)}
//             error={errors?.dependPass?.[index]?.uploadDp}
//             uploadedFileNames={uploadedFileNames}
//             deleteFile={(fieldTitle, fileName) => deleteFile(fieldTitle, fileName, index)}
//             field={{ title: `${index}uploadDp` }}
//           />
//           <FileUploadFieldArr
//             label="Upload Dependent Passport"
//             onChangeFunc={(e) => handleFileChange(e, "uploadDr", index)}
//             register={register(`dependPass[${index}].uploadDr`)}
//             error={errors?.dependPass?.[index]?.uploadDr}
//             uploadedFileNames={uploadedFileNames}
//             deleteFile={(fieldTitle, fileName) => deleteFile(fieldTitle, fileName, index)}
//             field={{ title: `uploadDr` }}
//           />
//           {index !== 0 && (
//             <button
//               type="button"
//               onClick={() => remove(index)}
//               className="absolute top-0 right-0 text-medium_grey text-[18px]"
//             >
//               <FaRegMinusSquare />
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };