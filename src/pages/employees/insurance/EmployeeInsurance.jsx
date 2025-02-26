import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { EmpInsuranceschema } from "../../../services/EmployeeValidation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { EmpInsDataFun } from "./EmpInsDataFun";
import { useOutletContext } from "react-router-dom";
import { FormField } from "../../../utils/FormField";
import { UpdateEmpInsDataFun } from "../../../services/updateMethod/UpdateEmpInsurance";
import { DataSupply } from "../../../utils/DataStoredContext";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { MdCancel } from "react-icons/md";

export const EmployeeInsurance = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { searchResultData } = useOutletContext();
  const { EmpInsuranceData , workMenDetails,dropDownVal } = useContext(DataSupply);
  const { SubmitMPData } = EmpInsDataFun();
  const { UpdateEIDataSubmit } = UpdateEmpInsDataFun();
  const [notification, setNotification] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState({ empInsUpload: [] });
  const [inputFields, setInputFields] = useState([{}]); // Tracks each file input field
  const [empInsUpload, setEmpInsUpload] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const [isUploading, setIsUploading] = useState({ empInsUpload: false });

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
    label: item.split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "),
  }));
 
  const otherNationValue = watch("otherNation");
  const [empStatusTypeValue, setEmpStatusTypeValue] = useState("");
  const [filteredWorkmenCompNo, setFilteredWorkmenCompNo] = useState([]);
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
    {
      label: "Marital Status",
      key: "marital",
      type: "text",
    },
    {
      label: "Nationality",
      key: "nationality",
      type: "text",
    },
    { label: "Other Nationality", key: "otherNation", type: "text" },

    {
      label: "Group H&S Insurance",
      key: "groupIns",
      type: "select",
      options:insuHSDD,
    },
    {
      label: "Group H&S Insurance Enrollment Effective Date",
      key: "groupInsEffectDate",
      type: "date",
    },
    {
      label: "Group H&S Insurance Enrollment End Date",
      key: "groupInsEndDate",
      type: "date",
    },
    {
      label: "Travelling Insurance",
      key: "travelIns",
      type: "select",
      options: ["Yes", "No"],
    },
  ];

   const handleAddFileClick = () => {
     setInputFields((prevFields) => [...prevFields, {}]);
     setUploadedDocs((prevUploads) => ({
       ...prevUploads,
       empInsUpload: [...prevUploads.empInsUpload],
     }));
   };
 
   const handleRemoveField = (index) => {
    const watchedEmpID = watch("empID");
    // Remove the field from inputFields
    setInputFields((prevFields) => prevFields.filter((_, i) => i !== index));

    // Get the file path to be deleted
    const fileToDelete = uploadedDocs.empInsUpload[index];
    // console.log(fileToDelete,"11111111");
    
    if (!fileToDelete) {
        console.error("File not found at index:", index);
        return;
    }

    // Extract the file name from the path
    const fileNameToDelete = fileToDelete.upload.split("/").pop();
    const fileName=fileNameToDelete;
    // console.log(fileName, "2222222");
    setUploadedDocs((prevUploads) => ({
        ...prevUploads,
        empInsUpload: prevUploads.empInsUpload.filter((_, i) => i !== index),
    }));
    handleDeleteFile('empInsUpload', fileName, watchedEmpID);
};

const updateUploadingState = (label, value, idx) => {
  setIsUploading((prev) => ({
    ...prev,
    [idx]: value, 
  }));
  // console.log(idx, value);
};

const handleFileChange = async (e, type, index) => {
  const watchedEmpID = watch("empID");

  const selectedFile = e.target.files?.[0];
  if (!selectedFile) return;

  // Check if a file is selected
  if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
  }

  // Check if a file already exists for the given index
  if (uploadedDocs?.empInsUpload?.[index]?.upload) {
      alert(`Please Select Add Upload + button to upload another file`);
      e.target.value = ''; // Clear the input
      return;
  }

  const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
  ];

  // Check if the file type is allowed
  if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
  }

  try {
    updateUploadingState(type, true, index);

      const fileUrl = await uploadDocs(selectedFile, type, setUploadedDocs, watchedEmpID);
      if (fileUrl) {
          setUploadedDocs((prev) => {
              const updatedUploads = [...prev.empInsUpload];
              updatedUploads[index] = { date: new Date().toISOString().split('T')[0], upload: fileUrl }; // Add date and file URL
              return { ...prev, empInsUpload: updatedUploads };
          });

          setValue(`empInsUpload[${index}]`, fileUrl); // Update form state
      }
  } catch (err) {
      console.error("Error uploading file:", err);
      alert("An error occurred while uploading the file. Please try again.");
  }
};
  
// console.log(uploadedDocs,"1 ......");

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const getArrayDateValue = (value) => {
    return Array.isArray(value) ? value[value.length - 1] : value;
  };

  useEffect(() => {
    if (!searchResultData) return;

    // Set default values for specific fields
    setValue("empID", searchResultData.empID);
    const empStatusType = getLastValue(searchResultData.empStatusType);
    if (empStatusType) {
      setEmpStatusTypeValue(empStatusType);
      setValue("empStatusType", empStatusType);
    }

    // Set workmenCompNo value
    const workmenCompNo = getLastValue(searchResultData.workmenCompNo);
    if (workmenCompNo) {
      setValue("workmenCompNo", workmenCompNo);
    }

    formFields.forEach((field) => {
      if (searchResultData[field.key] !== undefined) {
        setValue(field.key, getLastValue(searchResultData[field.key]));
      }
    });

    const arrayDateField = ["accidentIns"];

    arrayDateField.forEach((field) => {
      setValue(field, getArrayDateValue(searchResultData[field]));
    });

    // Parse uploaded documents
    const url = searchResultData?.empInsUpload;

    if (url) {
      try {
        const parsedArray = JSON.parse(url);
        setUploadedDocs((prev) => ({ ...prev, empInsUpload: parsedArray }));
        setInputFields(parsedArray.map((file) => ({}))); // Initialize input fields
      }  catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    } 
  }, [searchResultData, setValue]);

  useEffect(() => {
    if (empStatusTypeValue) {
      const currentDate = new Date();
      const filteredWorkMen = workMenDetails
        .filter((item) => {
          const expiryDate = new Date(item.workmenCompExp);
          return (
            item.empStatusType?.toUpperCase() === empStatusTypeValue && expiryDate > currentDate
          );
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setFilteredWorkmenCompNo(filteredWorkMen);

      // If workmenCompNo is not already set, default to the first filtered item
      const currentWorkmenCompNo = watch("workmenCompNo");
      if (!currentWorkmenCompNo && filteredWorkMen.length > 0) {
        setValue("workmenCompNo", filteredWorkMen[0].workmenCompNo);
      }
    }
  }, [empStatusTypeValue, setValue, watch, workMenDetails]);

  const defaultOptions = ["OFFSHORE", "ONSHORE", "GENERAL"];

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
          ) : key === "otherNation" ? (  // Specifically check for 'otherNation'
            <input
              type={type}
              {...register(key)}
              className={`input-field ${className}`}
              value={otherNationValue || "N/A"}  // Display N/N if the field is empty
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
          onChange={(e) => setEmpStatusTypeValue(e.target.value)} // Update empStatusTypeValue on change
          value={empStatusTypeValue}
        >              <option value="">SELECT</option>

          {defaultOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* workmenCompNo Field */}
      <div className="form-group">
      <label className="mb-1 text_size_5">Workmen Compensation Policy Number</label>
      <select
        {...register("workmenCompNo")}
        className="input-field select-custom "
        value={watch("workmenCompNo") || ""}
        onChange={(e) => setValue("workmenCompNo", e.target.value)} // Ensure value is updated when changed
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
         
          <div>
         <button
          type="button"
          onClick={handleAddFileClick}
          className=" flex items-center text-[#5d5d5d] text-[20px] mt-10 gap-3 bg-white  p-2 rounded-md cursor-pointer"
        >
         <p >Add Upload</p> <FiPlusSquare className="mr-1" />
        </button>
         </div>
          <div className="grid grid-cols-3 gap-10 mt-7">
  {inputFields.map((field, index) => (
    <div key={index} className="form-group w-full relative">
      <label className="w-full flex items-center px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer"
      onClick={() => {
        if (uploadedDocs?.empInsUpload?.[index]?.upload
        ) {
          alert(
            "Please Select Add Upload + button to upload another file"
          );
        }
      }}
    >
        Upload
        <Controller
          name={`empInsUpload[${index}]`}
          control={control}
          render={({ field }) => (
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "empInsUpload", index)}
              className="hidden"
              // accept=".pdf"
              disabled={uploadedDocs?.empInsUpload?.[index]?.upload}
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
          : empInsUpload[index]?.name}
      </p>
        <button
          type="button"
          onClick={() => handleRemoveField(index)}
          className="absolute top-1/2 -right-8 transform -translate-y-1/2 flex items-center text-medium_grey text-[20px]"
        >          
          <MdCancel className="mr-1 text-[red]" />
        </button>
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