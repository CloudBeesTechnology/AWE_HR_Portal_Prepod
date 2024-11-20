import { useContext, useEffect, useRef, useState } from "react";
import { FormField } from "../../../utils/FormField";
import { FileUploadField } from "./FileUploadField";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { LuPlusSquare, LuMinusSquare } from "react-icons/lu";
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
       const parsedValue = typeof value === "string" ? JSON.parse(value) : value;
      replace(parsedValue); // Replace fields with parsed data
      setValue("dependPass", parsedValue); 
      // console.log(parsedValue,'dfghj');
      
      
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
      // Ensure the fields are replaced when value updates later
      const parsedValue = typeof value === "string" ? JSON.parse(value) : value;
      replace(parsedValue); // Replace fields with parsed data
      setValue("dependPass", parsedValue); 
      console.log(parsedValue,'dfghj');
      const uploadFields = ["uploadDp", "uploadDr"];

      uploadFields.forEach((field) => {
        if (parsedValue && Array.isArray(parsedValue)) {
          parsedValue.forEach((item, idx) => {
            const url = item?.[field];
      
            // Ensure `url` is an array and not null/undefined
            const parsedFiles = Array.isArray(url)
              ? url.map((fileItem) =>
                  typeof fileItem === "string" ? JSON.parse(fileItem) : fileItem
                )
              : [];
      
            // Update the `docsUploaded` state
            setDocsUploaded((prev) => {
              const updatedDepInsurance = Array.isArray(prev[field]) ? [...prev[field]] : [];
              updatedDepInsurance[idx] = parsedFiles;
      
              return {
                ...prev,
                [field]: updatedDepInsurance, // Dynamically set field name
              };
            });
      
            // Update the file names state dynamically
            setArrayFileNames((prev) => ({
              ...prev,
              [`${idx}_${field}`]:
                parsedFiles.length > 0
                  ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
                  : "", // Assign file name dynamically based on index and field
            }));
          });
        }
      });
      
    }
  }, [value, append, replace, setValue]);


function getFileName(url) {
  try {
    if (!url || typeof url !== "string") {
      throw new Error("Invalid URL");
    }

    const urlObj = new URL(url); // Construct URL object
    const filePath = urlObj.pathname;

    const decodedUrl = decodeURIComponent(filePath);

    // Extract the file name after the last '/' in the path
    const fileNameWithExtension = decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);

    return fileNameWithExtension;
  } catch (error) {
    // console.error("Error parsing URL:", error.message, url);
    return ""; // Return empty string if the URL is invalid
  }
}


  const handleFileChange = async (e, fieldName, index) => {
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
      await uploadDocs(file, fieldName, setDocsUploaded, index);

      setArrayFileNames((prev) => ({
        ...prev,
        [`${index}_${fieldName}`]: file.name,
      }));
    } catch (error) {
      // console.error("File upload error:", error);
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
          <LuPlusSquare className="text-xl" />
        </button>
      </div>
      {fields.map((field, index) => {
        // console.log(index);
        
        return(
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
                <LuMinusSquare />
              </button>
            )}
          </div>
        )
      })}
    </div>
  );
};
