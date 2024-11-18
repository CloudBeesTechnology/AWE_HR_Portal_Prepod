import { useContext, useEffect, useState } from "react";
import { FormField } from "../../../utils/FormField";
import { FileUploadField } from "./FileUploadField";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { LuPlusSquare, LuMinusSquare } from "react-icons/lu";
import { LabourTypeDD } from "../../../utils/DropDownMenus";
import { DataSupply } from "../../../utils/DataStoredContext";

export const DependentPass = ({
  fields,
  errors,
  register,
  append,
  remove,
  setValue,
  setArrayUploadDocs,
  empID,
}) => {
  const { empPIData } = useContext(DataSupply);
  const [docsUploaded, setDocsUploaded] = useState({});
  const [arrayFileNames, setArrayFileNames] = useState({});
  const [empName, setEmpName] = useState("");

  // Set employee name based on empID
  useEffect(() => {
    const employee = empPIData.find((item) => item.empID === empID);
    if (employee) setEmpName(employee.name);
  }, [empID, empPIData]);

  // Handle file changes and upload
  const handleFileChange = async (e, fieldName, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Upload must be a PDF file");
      return;
    }

    setValue(`dependPass[${index}].${fieldName}`, file);

    try {
      await uploadDocs(file, fieldName, setDocsUploaded, empName, index);
      setArrayFileNames((prev) => ({
        ...prev,
        [`${index}_${fieldName}`]: file.name,
      }));
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  // Update parent component with uploaded docs
  useEffect(() => {
    setArrayUploadDocs(docsUploaded);
  }, [docsUploaded, setArrayUploadDocs]);

  // Ensure there’s always at least one "parent" entry without isNew flag
  useEffect(() => {
    if (fields.length === 0) {
      append({
        dependName: "",
        dependPpNo: "",
        dependPpE: "",
        relation: "",
        labourDPBy: "",
        labourDRNo: "",
        labourDAmount: "",
        uploadDp: "",
        uploadDr: "",
        isNew: false, // Initial entry is not removable
      });
    }
  }, [fields.length, append]);

  // Handle adding a new dependent pass entry with isNew flag
  const handleAddDependent = () => {
    append({
      dependName: "",
      dependPpNo: "",
      dependPpE: "",
      relation: "",
      labourDPBy: "",
      labourDRNo: "",
      labourDAmount: "",
      uploadDp: "",
      uploadDr: "",
      isNew: true, // New entries can be removed
    });
  };

  return (
    <div className="form-group mt-5">
      <div className="flex justify-between mb-5 text-medium_grey">
        <label className="  text_size_3 ">Dependent Pass Info</label>
        <button
          type="button"
          className="px-3 py-1 rounded"
          onClick={handleAddDependent}
        >
          <LuPlusSquare className="text-xl" />
        </button>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-4 gap-4 relative">
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
          <FileUploadField
            label="Upload Dependent Passport"
            onChangeFunc={(e) => handleFileChange(e, "uploadDp", index)}
            register={register(`dependPass[${index}].uploadDp`)}
            error={errors?.dependPass?.[index]?.uploadDp}
            fileName={arrayFileNames[`${index}_uploadDp`] || "No file uploaded"}
          />
          <FileUploadField
            label="Upload Deposit Receipt"
            onChangeFunc={(e) => handleFileChange(e, "uploadDr", index)}
            register={register(`dependPass[${index}].uploadDr`)}
            error={errors?.dependPass?.[index]?.uploadDr}
            fileName={arrayFileNames[`${index}_uploadDr`] || "No file uploaded"}
          />

          {/* Conditionally render the remove button based on isNew flag */}
          {field.isNew && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-0 right-0 text-medium_grey text-[18px]"
            >
              <LuMinusSquare />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
// import { useContext, useEffect, useState } from "react";
// import { FormField } from "../../../utils/FormField";
// import { FileUploadField } from "./FileUploadField";
// import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
// import { LuPlusSquare, LuMinusSquare } from "react-icons/lu";
// import { LabourTypeDD } from "../../../utils/DropDownMenus";
// import { DataSupply } from "../../../utils/DataStoredContext";

// export const DependentPass = ({
//   fields,
//   errors,
//   register,
//   append,
//   remove,
//   setValue,
//   setArrayUploadDocs,
//   empID,
// }) => {
//   const { empPIData } = useContext(DataSupply);
//   const [docsUploaded, setDocsUploaded] = useState({});
//   const [arrayFileNames, setArrayFileNames] = useState({
//     uploadDp: null,
//     uploadDr: null,
//   });
//   const [empName, setEmpName] = useState("");

//   useEffect(() => {
//     empPIData.forEach((item) => {
//       if (empID === item.empID) {
//         setEmpName(item.name);
//       }
//     });
//   }, [empID, empPIData]);

//   const handleFileChange = async (e, fieldName, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       alert("Upload must be a PDF file");
//       return;
//     }
//     setValue(`dependPass[${index}].${fieldName}`, file);
//     try {
//       await uploadDocs(file, fieldName, setDocsUploaded, empName, index);

//       setArrayFileNames((prev) => ({
//         ...prev,
//         [`${index}_${fieldName}`]: file.name,
//       }));
//     } catch (error) {
//       console.error("File upload error:", error);
//     }
//   };

//   useEffect(() => {
//     setArrayUploadDocs(docsUploaded);
//   }, [docsUploaded, setArrayUploadDocs]);

//   return (
//     <div className="form-group mt-5">
//       <div className="flex justify-between mb-5 text-dark_grey">
//         <label className="text_size_3">Dependent Pass Info</label>
//         <button
//           type="button"
//           className="px-3 py-1 rounded"
//           onClick={() =>
//             append({
//               dependName: "",
//               dependPpNo: "",
//               dependPpE: "",
//               relation: "",
//               labourDPBy: "",
//               labourDRNo: "",
//               labourDAmount: "",
//               uploadDp: "",
//               uploadDr: "",
//             })
//           }
//         >
//           <LuPlusSquare className="text-xl" />
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
//             type="number"
//             name={`dependPass[${index}].labourDAmount`}
//             placeholder="Enter Deposit Amount"
//             errors={errors}
//             register={register}
//           />
//           <FileUploadField
//             label="Upload Dependent Pass"
//             onChangeFunc={(e) => handleFileChange(e, "uploadDp", index)}
//             register={register(`dependPass[${index}].uploadDp`)}
//             error={errors?.dependPass?.[index]?.uploadDp}
//             fileName={arrayFileNames[`${index}_uploadDp`] || ""}
//           />
//           <FileUploadField
//             label="Upload Dependent Passport"
//             onChangeFunc={(e) => handleFileChange(e, "uploadDr", index)}
//             register={register(`dependPass[${index}].uploadDr`)}
//             error={errors?.dependPass?.[index]?.uploadDr}
//             fileName={arrayFileNames[`${index}_uploadDr`] || ""}
//           />

//           {/* Remove button, hidden for the first entry */}
//           {index !== 0 && (
//             <button
//               type="button"
//               onClick={() => remove(index)}
//               className="absolute top-0 right-0 text-medium_grey text-[18px]"
//             >
//               <LuMinusSquare />
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };
