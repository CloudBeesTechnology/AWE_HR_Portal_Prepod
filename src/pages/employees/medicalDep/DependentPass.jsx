import React, { useEffect, useRef, useState } from "react";
import { FormField } from "../../../utils/FormField";
import { FileUploadFieldArr } from "./FileUploadField";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { LabourTypeDD } from "../../../utils/DropDownMenus";
import { useFieldArray } from "react-hook-form";
// import { handleDeleteFile } from "../../../services/uploadDocsS3/LabourImmiUpload";

export const DependentPass = ({
  errors,
  register,
  setValue,
  setArrayUploadDocs,
  control,
  value,
  getValues,
  watch,
  id,
  trigger,
  deleteFile,
}) => {
  const isInitialMount = useRef(true);
  const [docsUploaded, setDocsUploaded] = useState({});
  const [arrayFileNames, setArrayFileNames] = useState({});

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "dependPass",
  });

  const getFileName = (filePath) => {
    if (!filePath) return "";

    if (typeof filePath === "object" && filePath.name) {
      return filePath.name;
    }

    if (typeof filePath === "string") {
      return filePath.split("/").pop();
    }

    return "";
  };

  useEffect(() => {
    if (isInitialMount.current) {
      if (value && value.length > 0) {
        const parsedValue = typeof value === "string" ? JSON.parse(value) : value;
        const normalizedValue = parsedValue.map((item) => ({
          ...item,
          uploadDp: Array.isArray(item.uploadDp) ? item.uploadDp : [item.uploadDp],
          uploadDr: Array.isArray(item.uploadDr) ? item.uploadDr : [item.uploadDr],
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
        uploadDp: Array.isArray(item.uploadDp) ? item.uploadDp : [item.uploadDp],
        uploadDr: Array.isArray(item.uploadDr) ? item.uploadDr : [item.uploadDr],
      }));

      replace(normalizedValue);
      setValue("dependPass", normalizedValue);

      const uploadFields = ["uploadDp", "uploadDr"];

      uploadFields.forEach((field) => {
        if (normalizedValue && Array.isArray(normalizedValue)) {
          normalizedValue.forEach((item, idx) => {
            const url = item?.[field];
            const parsedFiles = Array.isArray(url) ? url : [url];

            setDocsUploaded((prev) => ({
              ...prev,
              [`${idx}_${field}`]: parsedFiles,
            }));

            const fileName = parsedFiles.length > 0 ? getFileName(parsedFiles[parsedFiles.length - 1]) : "";

            setArrayFileNames((prev) => ({
              ...prev,
              [`${idx}_${field}`]: fileName,
            }));
          });
        }
      });
    }
  }, [value, append, replace, setValue]);

  const handleFileChange = async (e, fieldName, index) => {
    const watchedEmpID = watch("empID");
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
      setArrayFileNames((prev) => ({
        ...prev,
        [`${index}_${fieldName}`]: file.name,
      }));
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  // const handleDeleteFile = async (fileType, fileName, index) => {
  //   const watchedEmpID = watch("empID");
  //   const { serviceID, terminateID } = id;

  //   try {
  //     await deleteFile(fileType, fileName, watchedEmpID, setArrayFileNames, setValue, trigger, terminateID, serviceID);

  //     const currentFiles = getValues(`dependPass[${index}].${fileType}`) || [];
  //     const updatedFiles = currentFiles.filter((file) => file.name !== fileName);

  //     setValue(`dependPass[${index}].${fileType}`, updatedFiles);
  //     setDocsUploaded((prev) => ({
  //       ...prev,
  //       [`${index}_${fileType}`]: updatedFiles,
  //     }));
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //   }
  // };

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
        <button type="button" className="px-3 py-1 rounded" onClick={handleAddDependPass}>
          <CiSquarePlus className="text-xl" />
        </button>
      </div>
      {fields.map((field, index) => (
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
            type="text"
            name={`dependPass[${index}].labourDAmount`}
            placeholder="Enter Deposit Amount"
            errors={errors}
            register={register}
          />
          <FileUploadFieldArr
            label="Upload Dependent Pass"
            onChangeFunc={(e) => handleFileChange(e, "uploadDp", index)}
            register={register(`dependPass[${index}].uploadDp`)}
            error={errors?.dependPass?.[index]?.uploadDp}
            arrayFileNames={arrayFileNames}
            // deleteFile={(fieldTitle, fileName) =>
            //   handleDeleteFile(fieldTitle, fileName, index)
            // }
            field={{ title: `${index}_uploadDp` }}
          />
          <FileUploadFieldArr
            label="Upload Dependent Passport"
            onChangeFunc={(e) => handleFileChange(e, "uploadDr", index)}
            register={register(`dependPass[${index}].uploadDr`)}
            error={errors?.dependPass?.[index]?.uploadDr}
            arrayFileNames={arrayFileNames}
            // deleteFile={(fieldTitle, fileName) =>
            //   handleDeleteFile(fieldTitle, fileName, index)
            // }
            field={{ title: `${index}_uploadDr` }}
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
      ))}
    </div>
  );
};



// import React, { useEffect, useRef, useState } from "react";
// import { FormField } from "../../../utils/FormField";
// import { FileUploadFieldArr } from "./FileUploadFieldArr";
// import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
// import { FaRegMinusSquare } from "react-icons/fa";
// import { CiSquarePlus } from "react-icons/ci";
// import { LabourTypeDD } from "../../../utils/DropDownMenus";
// import { useFieldArray } from "react-hook-form";
// import { handleDeleteFile } from "../../../services/uploadDocsS3/LabourImmiUpload";

// export const DependentPass = ({
//   errors,
//   register,
//   setValue,
//   setArrayUploadDocs,
//   control,
//   value,
//   getValues,
//   watch,
//   // setArrayFileNames,
//   // arrayFileNames,
//   id,
//   trigger,
//   deleteFile,
// }) => {
//   const isInitialMount = useRef(true);
//   const [docsUploaded, setDocsUploaded] = useState({});
//   const [arrayFileNames, setArrayFileNames] = useState({});

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
//         console.log(normalizedValue,"fffffffffffffffff");
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

//             const fileName = parsedFiles.length > 0 ? getFileName(parsedFiles[parsedFiles.length - 1]) : "";

//             setArrayFileNames((prev) => ({
//               ...prev,
//               [`${idx}_${field}`]: fileName,
//             }));
//           });
//         }
//       });
//     }
//   }, [value, append, replace, setValue]);

//   const handleFileChange = async (e, fieldName, index) => {
//     const watchedEmpID = watch("empID");
//     if (!watchedEmpID) {
//       alert("Please enter the Employee ID before uploading files.");
//       window.location.href = "/labourImmigration";
//       return;
//     }

//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       alert("Upload must be a PDF file");
//       return;
//     }

//     const currentFiles = getValues(`dependPass[${index}].${fieldName}`) || [];
//     const updatedFiles = [...currentFiles, file];

//     setValue(`dependPass[${index}].${fieldName}`, updatedFiles);

//     try {
//       await uploadDocs(file, fieldName, setDocsUploaded, watchedEmpID, index);
//       setArrayFileNames((prev) => ({
//         ...prev,
//         [`${index}_${fieldName}`]: file.name,
//       }));
//     } catch (error) {
//       console.error("File upload error:", error);
//     }
//   };

//   const handleDeleteFile = async (fileType, fileName, index) => {
//     const watchedEmpID = watch("empID");
//     const { serviceID, terminateID } = id;
//     console.log(arrayFileNames);

//     try {
//       await deleteFile(fileType, fileName, watchedEmpID, setArrayFileNames, setValue, trigger, terminateID, serviceID);

//       const currentFiles = getValues(`dependPass[${index}].${fileType}`) || [];
//       const updatedFiles = currentFiles.filter((file) => file.name !== fileName);

//       setValue(`dependPass[${index}].${fileType}`, updatedFiles);
//       setDocsUploaded((prev) => ({
//         ...prev,
//         [`${index}_${fileType}`]: updatedFiles,
//       }));
//     } catch (error) {
//       console.error("Error deleting file:", error);
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
//          <FileUploadFieldArr
//   label="Upload Dependent Pass"
//   onChangeFunc={(e) => handleFileChange(e, "uploadDp", index)}
//   register={register(`dependPass[${index}].uploadDp`)}
//   error={errors?.dependPass?.[index]?.uploadDp}
//   arrayFileNames={arrayFileNames}
//   deleteFile={(fieldTitle, fileName) =>
//     handleDeleteFile(fieldTitle, fileName, index)
//   }
//   field={{ title: `dependPass[${index}].uploadDp` }}
// />
// <FileUploadFieldArr
//   label="Upload Dependent Passport"
//   onChangeFunc={(e) => handleFileChange(e, "uploadDr", index)}
//   register={register(`dependPass[${index}].uploadDr`)}
//   error={errors?.dependPass?.[index]?.uploadDr}
//   arrayFileNames={arrayFileNames}
//   deleteFile={(fieldTitle, fileName) =>
//     handleDeleteFile(fieldTitle, fileName, index)
//   }
//   field={{ title: `dependPass[${index}].uploadDr` }}
// />
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
