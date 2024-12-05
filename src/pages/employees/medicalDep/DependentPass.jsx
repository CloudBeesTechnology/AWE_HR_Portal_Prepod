import { useContext, useEffect, useRef, useState } from "react";
import { FormField } from "../../../utils/FormField";
import { FileUploadField } from "./FileUploadField";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { LabourTypeDD } from "../../../utils/DropDownMenus";
import { DataSupply } from "../../../utils/DataStoredContext";
import { useFieldArray } from "react-hook-form";

export const DependentPass = ({
  errors,
  register,
  setValue,
  setArrayUploadDocs,
  control,
  value,
  getValues,
  watch,
  setUploadedFileNames,
  UploadingFiles,
}) => {
  const isInitialMount = useRef(true);
  const [docsUploaded, setDocsUploaded] = useState({});
  const [arrayFileNames, setArrayFileNames] = useState({
    uploadDp: null,
    uploadDr: null,
  });

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

        replace(normalizedValue); // Replace fields with parsed data
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
      // Ensure uploadDp and uploadDr are arrays
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

      replace(normalizedValue); // Replace fields with parsed data
      setValue("dependPass", normalizedValue);

      const uploadFields = ["uploadDp", "uploadDr"];

      uploadFields.forEach((field) => {
        if (normalizedValue && Array.isArray(normalizedValue)) {
          normalizedValue.forEach((item, idx) => {
            const url = item?.[field];

            // Ensure `url` is an array and not null/undefined
            const parsedFiles = Array.isArray(url)
              ? url.map((fileItem) =>
                  typeof fileItem === "string" ? JSON.parse(fileItem) : fileItem
                )
              : [];

            // Update the `docsUploaded` state
            setDocsUploaded((prev) => {
              const updatedDepInsurance = Array.isArray(prev[field])
                ? [...prev[field]]
                : [];
              updatedDepInsurance[idx] = parsedFiles;

              return {
                ...prev,
                [field]: updatedDepInsurance, // Dynamically set field name
              };
            });

            // Check if `parsedFiles` is not empty before getting the file name
            const fileName =
              parsedFiles.length > 0 &&
              parsedFiles[parsedFiles.length - 1].upload
                ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
                : "";

            // Update the file names state dynamically
            setArrayFileNames((prev) => ({
              ...prev,
              [`${idx}_${field}`]: fileName, // Assign file name dynamically based on index and field
            }));

            // console.log(
            //   `File name for field ${field} at index ${idx}:`,
            //   fileName
            // );
          });
        }
      });
    }
  }, [value, append, replace, setValue]);

  const getFileName = (filePath) => {
    if (!filePath) {
      return ""; // Return an empty string if filePath is undefined or null
    }
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileName;
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

    // Add the new file to the array
    const updatedFiles = [...currentFiles, file];

    // Update the value in the form
    setValue(`dependPass[${index}].${fieldName}`, updatedFiles);

    // setValue(`dependPass[${index}].${fieldName}`, file);
    try {
      await uploadDocs(file, fieldName, setDocsUploaded, watchedEmpID, index);

      setArrayFileNames((prev) => ({
        ...prev,
        [`${index}_${fieldName}`]: file.name,
      }));
    } catch (error) {
      console.error("File upload error:", error);
    }
  };
  // console.log(docsUploaded);

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
        // console.log(index);

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
            <FileUploadField
              label="Upload Dependent Pass"
              onChangeFunc={(e) => handleFileChange(e, "uploadDp", index)}
              register={register(`dependPass[${index}].uploadDp`)}
              error={errors?.dependPass?.[index]?.uploadDp}
              fileName={arrayFileNames[`${index}_uploadDp`] || ""}
            />
            <FileUploadField
              label="Upload Dependent Passport"
              onChangeFunc={(e) => handleFileChange(e, "uploadDr", index)}
              register={register(`dependPass[${index}].uploadDr`)}
              error={errors?.dependPass?.[index]?.uploadDr}
              fileName={arrayFileNames[`${index}_uploadDr`] || ""}
            />

            {/* Remove button, hidden for the first entry */}
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
