import { useContext, useEffect, useRef, useState } from "react";
import { FormField } from "../../../utils/FormField";
import { FileUploadFieldNew } from "./FileUploadField";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { LabourTypeDD } from "../../../utils/DropDownMenus";
import { useFieldArray } from "react-hook-form";
import { DeleteDocsDependPass } from "../../../services/uploadDocsDelete/DeleteDocsDependPass";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { DeletePopup } from "../../../utils/DeletePopup";

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
  formattedPermissions,
  requiredPermissions,
  access,
}) => {
  const isInitialMount = useRef(true);
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [docsUploaded, setDocsUploaded] = useState({});
  const [isUploading, setIsUploading] = useState({});
  const [uploadedFileNames, setUploadedFileNames] = useState({});
  const [fileNames, setFileNames] = useState({});

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
            // setFileNames((prev) => ({
            //   ...prev,
            //   [`${idx}_${field}`]: parsedFiles.map((file) =>
            //     file && file.upload ? getFileName(file.upload) : ""
            //   ),
            // }));
            const fileNames = parsedFiles.map((file) =>
              file && file.upload ? getFileName(file.upload) : ""
            );

            setFileNames((prev) => ({
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

  const updateUploadingState = (fieldName, value, index) => {
    setIsUploading((prev) => ({
      ...prev,
      [`${index}_${fieldName}`]: value,
    }));
    // console.log(`Uploading state for ${fieldName}:`, value);
  };
  // console.log(isUploading);

  const handleFileChange = async (e, fieldName, index) => {
    const watchedEmpID = watch("empID"); // Watch Employee ID
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/labourImmigration";
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;

    // if (docsUploaded?.fieldName?.[index]?.length > 0) {
    //   alert(
    //     "Only one file is allowed per index. Please delete the existing file before uploading a new one."
    //   );
    //   e.target.value = ""; // Clear the input
    //   return;
    // }

    // File type restriction (PDF only, similar to Method 1)
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
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
      updateUploadingState(fieldName, true, index);
      await uploadDocs(file, fieldName, setDocsUploaded, watchedEmpID, index);

      // Set uploaded file names for display

      // Set uploaded file names for display
      setUploadedFileNames((prev) => ({
        ...prev,
        [`${index}_${fieldName}`]: [file.name],
      }));
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
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
        setFileNames,
        setDocsUploaded,
        setIsUploading,
        field,
        index
      );

      if (isDeleted || isDeletedArrayUploaded) {
        const currentFiles =
          getValues(`dependPass[${index}].${fileType}`) || [];
        const updatedFiles = currentFiles.filter((file) => {
          const filePath = file?.upload || file?.name;
          return getFileName(filePath) !== fileName;
        });

        setValue(`dependPass[${index}].${fileType}`, updatedFiles);

        // console.log("File deleted successfully:", fileName);
        setdeleteTitle1(`${fileName}`);
        handleDeleteMsg();
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };
// console.log(fileNames,"filenames");

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
    console.log(index);

    const dependPass = getValues("dependPass");

    const removedItem = dependPass[index];
    const watchedEmpID = watch("empID"); // Get the Employee ID

    if (!watchedEmpID) {
      alert("Please provide the Employee ID before deleting files.");
      return;
    }

    if (removedItem?.uploadDp?.length > 0) {
      for (let i = 0; i < removedItem.uploadDp.length; i++) {
        const file = removedItem.uploadDp[i];
        const fileName = getFileName(file.upload || file.name);
        console.log(`Deleting uploadDp file: ${fileName} at index ${index}`);
        await handleDeleteFile("uploadDp", fileName, watchedEmpID); // Delete from S3
      }
    }

    if (removedItem?.uploadDr?.length > 0) {
      for (let i = 0; i < removedItem.uploadDr.length; i++) {
        const file = removedItem.uploadDr[i];
        const fileName = getFileName(file.upload || file.name);
        console.log(`Deleting uploadDr file: ${fileName} at index ${index}`);
        await handleDeleteFile("uploadDr", fileName, watchedEmpID); // Delete from S3
      }
    }

    const updatedDependPass = dependPass.filter((_, i) => i !== index);
    setValue("dependPass", [...updatedDependPass]);
    setUploadedFileNames((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${index}_`)) {
          delete updated[key];
        }
      });

      // **Rebuild keys to shift indexes down**
      const newUploadedFileNames = {};
      Object.keys(updated).forEach((key) => {
        const [oldIndex, type] = key.split("_");
        const newIndex =
          parseInt(oldIndex) > index
            ? parseInt(oldIndex) - 1
            : parseInt(oldIndex);
        newUploadedFileNames[`${newIndex}_${type}`] = updated[key];
      });

      console.log("Updated uploadedFileNames:", newUploadedFileNames);
      return newUploadedFileNames; // Return new object to trigger re-render
    });
    setFileNames((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${index}_`)) {
          delete updated[key]; // Remove specific index from fileNames
        }
      });

      // **Rebuild keys to shift indexes down**
      const newFileNames = {};
      Object.keys(updated).forEach((key) => {
        const [oldIndex, type] = key.split("_");
        const newIndex =
          parseInt(oldIndex) > index
            ? parseInt(oldIndex) - 1
            : parseInt(oldIndex);
        newFileNames[`${newIndex}_${type}`] = updated[key];
      });

      console.log("Updated fileNames:", newFileNames);
      return newFileNames; // Return a new object to trigger re-render
    });
    setDocsUploaded((prev) => {
      const updated = { ...prev };
    
      // **1️⃣ Remove specific index from each document category**
      ["uploadDp", "uploadDr"].forEach((category) => {
        if (Array.isArray(updated[category])) {
          updated[category] = updated[category].map((arr, idx) =>
            idx === index ? [] : arr // Clear only the selected index
          );
        }
      });
    
      console.log("Updated state:", updated);
      return updated; // ✅ Preserves other indexes correctly
    });
    
    // // Delete uploaded files if any
    // if (removedItem.uploadDp && removedItem.uploadDp.length > 0) {
    //   for (const file of removedItem.uploadDp) {
    //     const fileName = getFileName(file.upload || file.name);
    //     // console.log(fileName);
    //     await handleDeleteFile("uploadDp", fileName, watchedEmpID); // Delete from S3 or server
    //   }
    // }

    // if (removedItem.uploadDr && removedItem.uploadDr.length > 0) {
    //   for (const file of removedItem.uploadDr) {
    //     const fileName = getFileName(file.upload || file.name);
    //     // console.log(fileName);
    //     await handleDeleteFile("uploadDr", fileName, watchedEmpID); // Delete from S3 or server
    //   }
    // }

    console.log("Updated dependPass:", updatedDependPass);
    // // Remove the item from the form
    // console.log("Before removal:", getValues("dependPass"));
    // remove(index);
    // console.log("After removal:", getValues("dependPass"));
  };
  // console.log(fileNames, "filePath");
  // console.log(docsUploaded, "uploaddocs");

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
              filePath={fileNames[`${index}_uploadDp`] || ""}
              fileType="uploadDp"
              isUploading={isUploading?.[`${index}_uploadDp`]}
              index={index}
              formattedPermissions={formattedPermissions}
              requiredPermissions={requiredPermissions}
              access={access}
            />

            <FileUploadFieldNew
              label="Upload Dependent Passport"
              onChangeFunc={(e) => handleFileChange(e, "uploadDr", index)}
              register={register(`dependPass[${index}].uploadDr`)}
              error={errors?.dependPass?.[index]?.uploadDr}
              deleteFile={(fileName) => deleteFile("uploadDr", fileName, index)}
              fileName={uploadedFileNames[`${index}_uploadDr`] || ""}
              filePath={fileNames[`${index}_uploadDr`] || ""}
              docsUploaded={docsUploaded}
              fileType="uploadDr"
              isUploading={isUploading?.[`${index}_uploadDr`]}
              index={index}
              formattedPermissions={formattedPermissions}
              requiredPermissions={requiredPermissions}
              access={access}
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
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </div>
  );
};
