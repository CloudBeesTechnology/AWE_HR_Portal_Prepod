import { useContext, useEffect, useRef, useState } from "react";
import { FormField } from "../../../utils/FormField";
import { FileUploadFieldNew } from "./FileUploadField";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { LabourTypeDD } from "../../../utils/DropDownMenus";
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
        const parsedValue =
          typeof value === "string" ? JSON.parse(value) : value;
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
              ? url
                  .map((fileItem) => {
                    if (
                      fileItem &&
                      typeof fileItem === "object" &&
                      fileItem.upload
                    ) {
                      return typeof fileItem === "string"
                        ? JSON.parse(fileItem)
                        : fileItem;
                    }
                    return null;
                  })
                  .filter(Boolean)
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

  const updateUploadingState = (fieldName, value) => {
    setIsUploading((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    // console.log(`Uploading state for ${fieldName}:`, value);
  };

  // const handleFileChange = async (e, fieldName, index) => {
  //   if (!watchedEmpID) {
  //     alert("Please enter the Employee ID before uploading files.");
  //     window.location.href = "/labourImmigration";
  //     return;
  //   }
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   if (docsUploaded.fieldName[index]?.length > 0) {
  //     alert("Only one file is allowed per index. Please delete the existing file before uploading a new one.");
  //     e.target.value = ''; // Clear the input
  //     return;
  //   }

  //   const allowedTypes = [
  //     "application/pdf",
  //     "image/jpeg",
  //     "image/png",
  //     "image/jpg",
  //   ];

  //   if (!allowedTypes.includes(file.type)) {
  //     alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
  //     return;
  //   }

  //   const currentFiles = getValues(`dependPass[${index}].${fieldName}`) || [];
  //   const updatedFiles = [...currentFiles, file];

  //   setValue(`dependPass[${index}].${fieldName}`, updatedFiles);

  //   try {
  //     updateUploadingState(fieldName, true);
  //     await uploadDocs(file, fieldName, setDocsUploaded, watchedEmpID, index);
  //     // console.log("file : ", file, "fieldName : ", fieldName);

  //     setUploadedFileNames((prev) => ({
  //       ...prev,
  //       [`${index}_${fieldName}`]: [
  //         file.name,
  //       ],
  //     }));

  //   } catch (error) {
  //     console.error("File upload error:", error);
  //   }
  // };

  const handleFileChange = async (e, fieldName, index) => {
    const watchedEmpID = watch("empID"); // Watch Employee ID
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/labourImmigration";
      return;
    }
  
    const file = e.target.files?.[0];
    if (!file) return;

    if (docsUploaded?.fieldName?.[index]?.length > 0) {
      alert("Only one file is allowed per index. Please delete the existing file before uploading a new one.");
      e.target.value = ''; // Clear the input
      return;
    }
  
    // File type restriction (PDF only, similar to Method 1)
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Upload must be a PDF file.");
      alert("Upload must be a PDF file.");
      return;
    }
  
    // Ensure no duplicate files are added (checking against already uploaded files)
  
    // Ensure no duplicate files are added (checking against already uploaded files)
    const currentFiles = getValues(`dependPass[${index}].${fieldName}`) || [];
    if (currentFiles.some((uploadedFile) => uploadedFile.name === file.name)) {
      alert("This file has already been uploaded.");
      return;
    }
  
    // Update the form state with the uploaded file
    if (currentFiles.some((uploadedFile) => uploadedFile.name === file.name)) {
      alert("This file has already been uploaded.");
      return;
    }
  
    // Update the form state with the uploaded file
    const updatedFiles = [...currentFiles, file];
    setValue(`dependPass[${index}].${fieldName}`, updatedFiles);
  
  
    try {
      updateUploadingState(fieldName, true);
      await uploadDocs(file, fieldName, setDocsUploaded, watchedEmpID, index);
  
      // Set uploaded file names for display
  
      // Set uploaded file names for display
      setUploadedFileNames((prev) => ({
        ...prev,
        [`${index}_${fieldName}`]: [file.name],
        [`${index}_${fieldName}`]: [file.name],
      }));
  
  
    } catch (error) {
      console.error("File upload error:", error);
    }
  };
  
 
  const deleteFile = async (fileType, fileName, index, field) => {
    try {
      const watchedEmpID = watch("empID");
      if (!watchedEmpID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(
        fileType,
        fileName,
        watchedEmpID
      );
      const isDeletedArrayUploaded = await DeleteDocsDependPass(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setDocsUploaded,
        setIsUploading,
        field
      );

      if (isDeleted || isDeletedArrayUploaded) {
        const currentFiles =
          getValues(`dependPass[${index}].${fileType}`) || [];
        const updatedFiles = currentFiles.filter((file) => {
          const filePath = file?.upload || file?.name;
          return getFileName(filePath) !== fileName;
        });

        setValue(`dependPass[${index}].${fileType}`, updatedFiles);

        setUploadedFileNames((prev) => ({
          ...prev,       
          [`${index}_${fileType}`]: updatedFiles.map((file) =>{
           return getFileName(file?.upload || file?.name)
          }
          ),          
        }));

        setDocsUploaded((prev) => {
          const updatedDocs = { ...prev };
          if (Array.isArray(updatedDocs[fileType])) {
            updatedDocs[fileType][index] = updatedFiles;
          }
          return updatedDocs;
        });

        // console.log("File deleted successfully:", fileName);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

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

  const handleRemoveDependPass = async (index) => {
    const dependPass = getValues("dependPass");
    const removedItem = dependPass[index];
    const watchedEmpID = watch("empID"); // Get the Employee ID
  
    if (!watchedEmpID) {
      alert("Please provide the Employee ID before deleting files.");
      return;
    }
  
    // Delete uploaded files if any
    if (removedItem.uploadDp && removedItem.uploadDp.length > 0) {
      for (const file of removedItem.uploadDp) {
        const fileName = getFileName(file.upload || file.name);
        console.log(fileName);
        
        await handleDeleteFile("uploadDp", fileName, watchedEmpID); // Delete from S3 or server
        await deleteFile("uploadDp", fileName, index, removedItem); // Update local state
      }
    }
  
    if (removedItem.uploadDr && removedItem.uploadDr.length > 0) {
      for (const file of removedItem.uploadDr) {
        const fileName = getFileName(file.upload || file.name);
        console.log(fileName);
        
        await handleDeleteFile("uploadDr", fileName, watchedEmpID); // Delete from S3 or server
        await deleteFile("uploadDr", fileName, index, removedItem); // Update local state
      }
    }
  
    // Remove the item from the form
    remove(index);
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
              deleteFile={(fileName) =>
                deleteFile("uploadDp", fileName, index, field)
              }
              docsUploaded={docsUploaded}
              uploadedFileNames={uploadedFileNames}
              fileName={uploadedFileNames[`${index}_uploadDp`] || ""}
              fileType="uploadDp"
              isUploading={isUploading}
              index={index}
              disabled={docsUploaded["uploadDp"]?.[index]?.length > 0} 
            />
            <FileUploadFieldNew
              label="Upload Dependent Passport"
              onChangeFunc={(e) => handleFileChange(e, "uploadDr", index)}
              register={register(`dependPass[${index}].uploadDr`)}
              error={errors?.dependPass?.[index]?.uploadDr}
              deleteFile={(fileName) => deleteFile("uploadDr", fileName, index)}
              fileName={uploadedFileNames[`${index}_uploadDr`] || ""}
              docsUploaded={docsUploaded}
              fileType="uploadDr"
              isUploading={isUploading}
              index={index}
              disabled={docsUploaded["uploadDr"]?.[index]?.length > 0} 

            />
            {index !== 0 && (
              <button
                type="button"
                onClick={() => handleRemoveDependPass(index)}
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

