import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { EmpInsuranceschema } from "../../../services/EmployeeValidation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import {
  GenderDD,
  MaritalDD,
  NationalityDD,
} from "../../../utils/DropDownMenus";
import { EmpInsDataFun } from "./EmpInsDataFun";
import { useOutletContext } from "react-router-dom";
import { FormField } from "../../../utils/FormField";
import { UpdateEmpInsDataFun } from "../../../services/updateMethod/UpdateEmpInsurance";
import { DataSupply } from "../../../utils/DataStoredContext";

export const EmployeeInsurance = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { searchResultData } = useOutletContext();
  const { EmpInsuranceData, workMenDetails, dropDownVal } = useContext(DataSupply);

  const { SubmitMPData } = EmpInsDataFun();
  const { UpdateEIDataSubmit } = UpdateEmpInsDataFun();
  const [notification, setNotification] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState({ empInsUpload: [] });
  const [inputFields, setInputFields] = useState([{}]); // Tracks each file input field
  const [empInsUpload, setEmpInsUpload] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const [empStatusTypeValue, setEmpStatusTypeValue] = useState("");
  const [filteredWorkmenCompNo, setFilteredWorkmenCompNo] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      empStatusType: "",
      workmenCompNo: "",
      empInsUpload: [],
    },
    resolver: yupResolver(EmpInsuranceschema),
  });

  const insuHSDD = dropDownVal[0]?.insuHSDD.map((item) => ({
    value: item,
    label: item.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
  }));

  const nationalityDD = dropDownVal[0]?.nationalityDD.map((item) => ({
    value: item,
    label: item.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
  }));

  const otherNationValue = watch("otherNation");

  const formFields = [
    { label: "Employee Badge Number", key: "empBadgeNo", type: "text" },
    { label: "Employee Name", key: "name", type: "text" },
    { label: "Department", key: "department", type: "text" },
    { label: "Position", key: "position", type: "text" },
    { label: "Date of Joining", key: "doj", type: "date" },
    { label: "Gender", key: "gender", type: "text" },
    { label: "Brunei I/C Number", key: "bwnIcNo", type: "text" },
    { label: "Passport Number for Non-Local", key: "ppNo", type: "text" },
    { label: "Date of Birth", key: "dob", type: "date" },
    { label: "Marital Status", key: "marital", type: "text" },
    { label: "Nationality", key: "nationality", type: "text" },
    { label: "Other Nationality", key: "otherNation", type: "text" },
    { label: "Group H&S Insurance", key: "groupIns", type: "select", options: insuHSDD },
    { label: "Group H&S Insurance Enrollment Effective Date", key: "groupInsEffectDate", type: "date" },
    { label: "Group H&S Insurance Enrollment End Date", key: "groupInsEndDate", type: "date" },
    { label: "Travelling Insurance", key: "travelIns", type: "select", options: ["Yes", "No"] },
  ];

  // Handle adding a new file input field
  const handleAddFileClick = () => {
    setInputFields((prevFields) => [...prevFields, {}]);
    setUploadedDocs((prevUploads) => ({
      ...prevUploads,
      empInsUpload: [...prevUploads.empInsUpload, {}],
    }));
  };

  // Handle removing a file input field
  const handleRemoveField = (index) => {
    setInputFields((prevFields) => prevFields.filter((_, i) => i !== index));
    setUploadedDocs((prevUploads) => ({
      ...prevUploads,
      empInsUpload: prevUploads.empInsUpload.filter((_, i) => i !== index),
    }));
  };

  // Handle file upload
  const handleFileChange = async (e, type, index) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file");
      return;
    }

    try {
      const fileUrl = await uploadDocs(selectedFile, type, setUploadedDocs, index);
      if (fileUrl) {
        setUploadedDocs((prev) => {
          const updatedUploads = [...prev.empInsUpload];
          updatedUploads[index] = { name: selectedFile.name, url: fileUrl };
          return { ...prev, empInsUpload: updatedUploads };
        });
        setValue(`empInsUpload[${index}]`, fileUrl); // Update form state
      }
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  console.log(uploadedDocs,"1 ....");
  
  // Parse fetched data and update state
  useEffect(() => {
    if (!searchResultData) return;

    // Set default values for specific fields
    setValue("empID", searchResultData.empID);
    setValue("empStatusType", searchResultData.empStatusType);
    setValue("workmenCompNo", searchResultData.workmenCompNo);

    // Set values for other fields
    formFields.forEach((field) => {
      if (searchResultData[field.key] !== undefined) {
        setValue(field.key, searchResultData[field.key]);
      }
    });

    // Parse uploaded documents
    const url = searchResultData?.empInsUpload;
    if (url) {
      try {
        const parsedArray = JSON.parse(url);
        setUploadedDocs((prev) => ({ ...prev, empInsUpload: parsedArray }));
        setInputFields(parsedArray.map((file) => ({}))); // Initialize input fields
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    }
  }, [searchResultData, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    const existingEmpInsurance = EmpInsuranceData.find(
      (match) => match.empID === data.empID
    );

    const empInsValue = {
      ...data,
      empInsUpload: JSON.stringify(uploadedDocs.empInsUpload), // Include uploaded files
    };

    if (existingEmpInsurance) {
      empInsValue.id = existingEmpInsurance.id;
      await UpdateEIDataSubmit({ empInsValue });
      setShowTitle("Employee Insurance Info updated successfully");
    } else {
      await SubmitMPData({ empInsValue });
      setShowTitle("Employee Insurance Info Saved successfully");
    }

    setNotification(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto p-2 my-10 bg-[#F5F6F1CC]"
    >
      <div className="flex justify-end items-center">
        <div className="max-w-sm">
          <FormField
            label="Employee ID"
            register={register}
            name="empID"
            type="text"
            watch={watch("empID") || ""}
            placeholder="Enter Employee ID"
            errors={errors}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 w-full ">
        {formFields.map(({ label, key, type, options = [], className = "" }) => (
          <div className="form-group" key={key}>
            <label className="mb-1 text_size_5">{label}</label>
            {type === "select" ? (
              <select {...register(key)} className={`input-field select-custom ${className}`}>
                <option value="">SELECT</option>
                {options.map((option) => (
                  typeof option === "string" ? (
                    <option key={option} value={option.toUpperCase()}>{option.toUpperCase()}</option>
                  ) : (
                    <option key={option.value} value={option.value.toUpperCase()}>{option.label.toUpperCase()}</option>
                  )
                ))}
              </select>
            ) : key === "otherNation" ? (
              <input
                type={type}
                {...register(key)}
                className={`input-field ${className}`}
                value={otherNationValue || "N/A"}
              />
            ) : (
              <input
                type={type}
                {...register(key)}
                className={`input-field ${className}`}
              />
            )}
            {errors[key] && <p className="text-[red] text-[13px] mt-1">{errors[key]?.message}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 mt-5">
        <div className="form-group">
          <label className="mb-1 text_size_5">Workmen Compensation Insurance</label>
          <select
            {...register("empStatusType")}
            className="input-field select-custom "
            onChange={(e) => setEmpStatusTypeValue(e.target.value)}
            value={empStatusTypeValue}
          >
            <option value="">SELECT</option>
            {["OFFSHORE", "ONSHORE", "GENERAL"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="mb-1 text_size_5">Workmen Compensation Policy Number</label>
          <select
            {...register("workmenCompNo")}
            className="input-field select-custom "
            value={watch("workmenCompNo") || ""}
            onChange={(e) => setValue("workmenCompNo", e.target.value)}
          >
            {filteredWorkmenCompNo.map((item) => (
              <option key={item.id} value={item.workmenCompNo}>
                {item.workmenCompNo}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-5 ">
        <div>
          <label className="block text_size_5">Personal Accident Insurance</label>
          <select
            className="input-field select-custom"
            {...register("accidentIns")}
          >
            <option value="">Select</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-12">
        {inputFields.map((field, index) => (
          <div key={index} className="form-group w-full relative">
            <label className="w-full flex items-center px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
              Upload
              <Controller
                name={`empInsUpload[${index}]`}
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "empInsUpload", index)}
                    className="hidden"
                    accept=".pdf"
                  />
                )}
              />
              <span className="ml-2">
                <GoUpload />
              </span>
            </label>
            <p className="text-grey mt-1 text-xs">
              {uploadedDocs.empInsUpload[index]?.upload
                ? uploadedDocs.empInsUpload[index].upload.split("/").pop()
                : "No file chosen"}
            </p>

            {index === 0 && (
              <button
                type="button"
                onClick={handleAddFileClick}
                className="absolute top-1/2 -right-8 transform -translate-y-1/2 flex items-center text-medium_grey text-[20px]"
              >
                <FiPlusSquare className="mr-1" />
              </button>
            )}

            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveField(index)}
                className="absolute top-1/2 -right-8 transform -translate-y-1/2 flex items-center text-medium_grey text-[20px]"
              >
                <FiMinusSquare className="mr-1" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>

      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/insuranceAdd"
        />
      )}
    </form>
  );
};
// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { LuPlusSquare, LuMinusSquare } from "react-icons/lu";
// import { FormField } from "../../../utils/FormField";
// import { FileUploadField } from "../medicalDep/FileUploadField";
// import { GoUpload } from "react-icons/go";
// import { InsuranceInfoSchema } from "../../../services/EmployeeValidation";
// import { SpinLogo } from "../../../utils/SpinLogo";

// export const InsuranceInfo = () => {

//   const [notification, setNotification] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(InsuranceInfoSchema),
//     defaultValues: {
//       groupHSDetails: [{ groupHSNo: "", groupHSExp: "", isNew: false, groupHSUpload: null }], 
//       workmenCompDetails: [{ empStatusType: "", workmenCompNo: "", workmenCompExp: "", isNew: false, workmenCompUpload: null }],
//       travellingDetails: [{ travellingNo: "", travellingExp: "", isNew: false, travellingUpload: null }],
//       personalAccidentDetails: [{ personalAccNo: "", personalAccExp: "", isNew: false, personalAccUpload: null }],
//     },
//   });

//   const { fields: groupHSFields, append: appendGroupHS, remove: removeGroupHS } = useFieldArray({
//     control,
//     name: "groupHSDetails",
//   });

//   const { fields: workmenCompFields, append: appendWorkmenComp, remove: removeWorkmenComp } = useFieldArray({
//     control,
//     name: "workmenCompDetails",
//   });

//   const { fields: travellingFields, append: appendTravelling, remove: removeTravelling } = useFieldArray({
//     control,
//     name: "travellingDetails",
//   });

//   const { fields: personalAccidentFields, append: appendPersonalAccident, remove: removePersonalAccident } = useFieldArray({
//     control,
//     name: "personalAccidentDetails",
//   });

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     setValue("insInfUpload", file);

//     if (file) {
//       try {
//         await upload(file);
//       } catch (error) {
//         console.log("Error uploading file:", error);
//       }
//     }
//   };

//   const onSubmit = (data) => {
//     console.log("Form Data", data);
//     setNotification(true);

//   };

//   return (
//   <form onSubmit={handleSubmit(onSubmit)} className="mx-auto min-h-screen py-5 px-10 my-10 bg-[#F5F6F1CC]">

// <h3 className="mb-5 text-lg font-bold">Group H&S Insurance</h3>
// <div className="relative mb-5">
// <div className="grid grid-cols-3 gap-5 text-grey text_size_5">
//   <label>Policy Number</label>
//   <label>Expiry Date</label>
//   <label>Upload</label>
// </div>

// {groupHSFields.map((field, index) => (
//   <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
//     <FormField
//       name={`groupHSDetails.${index}.groupHSNo`}
//       type="text"
//       placeholder="Enter H&S Policy Number"
//       label=""
//       register={register}
//       errors={errors}
//     />
//     <FormField
//       name={`groupHSDetails.${index}.groupHSExp`}
//       type="date"
//       label=""
//       register={register}
//       errors={errors}
//       />
// <div className='mb-2'>
// <FileUploadField
//   onChangeFunc={(e) => handleFileChange(e, `groupHSDetails.${index}.groupHSUpload`)}
//   name={`groupHSDetails.${index}.groupHSUpload`}  
//   className="mt-2"
//   error={errors?.groupHSDetails?.[index]?.groupHSUpload?.message}
// />
// </div>
//     {index === 0 ? (
//       <button
//         type="button"
//         onClick={() =>
//           appendGroupHS({ groupHSNo: "", groupHSExp: "", groupHSUpload: null })
//         }
//         className="text-medium_grey text-[25px] absolute -right-9"
//       >
//         <LuPlusSquare />
//       </button>
//     ) : (
//       <button
//         type="button"
//         onClick={() => removeGroupHS(index)}
//         className="text-medium_grey text-[25px] absolute -right-9"
//       >
//         <LuMinusSquare />
//       </button>
//     )}
//   </div>
// ))}
// </div>

// <h3 className="mb-5 text-lg font-bold">Workmen Compensation Insurance</h3>
// <div className="relative mb-5">

//   <div className="grid grid-cols-4 gap-5 text-grey text_size_5">
//     <label>Employee Type</label>
//     <label>Policy Number</label>
//     <label>Expiry Date</label>
//     <label>Upload</label>
//   </div>
  
//   {workmenCompFields.map((field, index) => (
//     <div key={field.id} className="grid grid-cols-4 gap-4 items-center">
      
//       <FormField
//         name={`workmenCompDetails.${index}.empStatusType`}
//         register={register}
//         type="select"
//         options={[
//           { value: 'OffShore', label: 'OffShore' },
//           { value: 'OnShore', label: 'OnShore' },
//           { value: 'General', label: 'General' },
//         ]}
//         errors={errors}
//       />

//       <FormField
//         name={`workmenCompDetails.${index}.workmenCompNo`}
//         type="text"
//         placeholder="Enter Workmen Comp Policy No"
//         register={register}
//         errors={errors}
//       />

//       <FormField
//         name={`workmenCompDetails.${index}.workmenCompExp`}
//         type="date"
//         register={register}
//         errors={errors}
//       />

//       <div className='mb-2'>
//       <FileUploadField
//         name={`workmenCompDetails.${index}.workmenCompUpload`}
//         onChangeFunc={(e) => handleFileChange(e, `workmenCompDetails.${index}.workmenCompUpload`)}
//         label=""
//         error={errors[`workmenCompDetails.${index}.workmenCompUpload`]}
//      /></div>
//       {index === 0 ? (
//         <button
//           type="button"
//           onClick={() =>
//             appendWorkmenComp({
//               empStatusType: "",
//               workmenCompNo: "",
//               workmenCompExp: "",
//               workmenCompUpload: null })
//           }
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuPlusSquare />
//         </button>
//       ) : (
//         <button
//           type="button"
//           onClick={() => removeWorkmenComp(index)}
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuMinusSquare />
//         </button>
//       )}

//     </div>
//   ))}
// </div>



// <h3 className="mb-5 text-lg font-bold">Travelling Insurance</h3>
// <div className="relative mb-10">

//   <div className="grid grid-cols-3 gap-5 text-grey text_size_5">
//     <label>Policy Number</label>
//     <label>Expiry Date</label>
//     <label>Upload</label>
//   </div>

//   {travellingFields.map((field, index) => (
//     <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
      
//       <FormField
//         name={`travellingDetails.${index}.travellingNo`}
//         type="text"
//         placeholder="Enter Travelling Policy Number"
//         label=""
//         register={register}
//         errors={errors}
//         className="mt-2 p-[12px] bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
//       />

//       <FormField
//         name={`travellingDetails.${index}.travellingExp`}
//         type="date"
//         label=""
//         register={register}
//         errors={errors}
//         className="mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
//       />

//       <div className='mb-2'>
//       <FileUploadField
//         name={`travellingDetails.${index}.travellingUpload`}
//         onChangeFunc={(e) => handleFileChange(e, `travellingDetails.${index}.travellingUpload`)}
//         error={errors[`travellingDetails.${index}.travellingUpload`]}
//         className="w-full mt-2 flex items-center px-3 py-4 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer"
//       /> </div>


//       {index === 0 ? (
//         <button
//           type="button"
//           onClick={() =>
//             appendTravelling({
//               travellingNo: "",
//               travellingExp: "",
//               travellingUpload: null})
//           }
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuPlusSquare />
//         </button>
//       ) : (
//         <button
//           type="button"
//           onClick={() => removeTravelling(index)}
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuMinusSquare />
//         </button>
//       )}

//     </div>
//   ))}
// </div>


// <h3 className="mb-3 mt-6 text-lg font-bold">Personal Accident Insurance</h3>
// <div className="relative mb-10">

//   <div className="grid grid-cols-3 gap-5 text-grey text_size_5">
//     <label>Policy Number</label>
//     <label>Expiry Date</label>
//     <label>Upload</label>
//   </div>

//   {personalAccidentFields.map((field, index) => (
//     <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
      
//       <FormField
//         name={`personalAccidentDetails.${index}.personalAccNo`}
//         type="text"
//         placeholder="Enter Personal Accident Policy Number"
//         label=""
//         register={register}
//         errors={errors}
//       />

//       <FormField
//         name={`personalAccidentDetails.${index}.personalAccExp`}
//         type="date"
//         label=""
//         register={register}
//         errors={errors}
//       />

//       <div className='mb-2'>
//       <FileUploadField
//         name={`personalAccidentDetails.${index}.personalAccUpload`}
//         onChangeFunc={(e) => handleFileChange(e, `personalAccidentDetails.${index}.personalAccUpload`)}
//         error={errors[`personalAccidentDetails.${index}.personalAccUpload`]}
//       /></div>
//       {index === 0 ? (
//         <button
//           type="button"
//           onClick={() =>
//             appendPersonalAccident({
//               personalAccNo: "",
//               personalAccExp: "",
//               personalAccUpload: null,
//               isNew: false,
//             })
//           }
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuPlusSquare />
//         </button>
//       ) : (
//         <button
//           type="button"
//           onClick={() => removePersonalAccident(index)}
//           className="text-medium_grey text-[25px] absolute -right-9"
//         >
//           <LuMinusSquare />
//         </button>
//       )}

//     </div>
//   ))}
// </div>
//       <div className="center my-10">
//         <button type="submit" className="primary_btn">
//           Save
//         </button>
//       </div>
//       {notification && (
//         <SpinLogo
//           text="Insurance Info Saved Successfully"
//           notification={notification}
//           path="/recrutiles/candidate"
//         />
//       )}
//     </form>
//   );
// };



