import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { EmpInsuranceschema } from "../../../services/EmployeeValidation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
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
  // console.log(searchResultData, "emplkh");
  const { EmpInsuranceData , workMenDetails } = useContext(DataSupply);
  // console.log(workMenDetails);
  
  const { SubmitMPData } = EmpInsDataFun();
  const { UpdateEIDataSubmit } = UpdateEmpInsDataFun();
  const [notification, setNotification] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState({ empInsUpload: [] });
  const [inputFields, setInputFields] = useState([{}]); // Tracks each file input field
  const [empInsUpload, setEmpInsUpload] = useState([]);
  const [showTitle, setShowTitle] = useState("");

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
  const otherNationValue = watch("otherNation");
  const empStatusTypeValue = watch("empStatusType");
  const formFields = [
    { label: "Employee Badge Number", key: "empBadgeNo", type: "text" },
    { label: "Employee Name", key: "name", type: "text" },
    { label: "Department", key: "department", type: "text" },
    { label: "Position", key: "position", type: "text" },
    { label: "Date of Joining", key: "doj", type: "date" },
    { label: "Gender", key: "gender", type: "select", options: GenderDD },
    { label: "Brunei I/C Number", key: "bwnIcNo", type: "text" },
    { label: "Passport Number for Non-Local", key: "ppNo", type: "text" },
    { label: "Date of Birth", key: "dob", type: "date" },
    {
      label: "Marital Status",
      key: "marital",
      type: "select",
      options: MaritalDD,
    },
    {
      label: "Nationality",
      key: "nationality",
      type: "select",
      options: NationalityDD,
    },
    { label: "Other Nationality", key: "otherNation", type: "text" },

    {
      label: "Group H&S Insurance",
      key: "groupIns",
      type: "select",
      options: [
        "Single",
        "Employee & spouse",
        "Employee & Child",
        "Employee & Family",
        "Decline",
        "Own",
      ],
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
  // const selectedNationality = watch("nationality");
  const handleAddFileClick = () => {
    setInputFields((prevFields) => [...prevFields, {}]); // Add new input field
    setEmpInsUpload((prevUpload) => [...prevUpload, []]);
  };

  // Handle removing a file input field
  const handleRemoveField = (index) => {
    setInputFields((prevFields) => prevFields.filter((_, i) => i !== index));
    setEmpInsUpload((prevUploads) => prevUploads.filter((_, i) => i !== index)); // Remove the corresponding file array
  };

  // const watchedEmpID=watch("empID")

  const handleFileChange = async (e, type, index) => {
    // if (!watchedEmpID) {
    //   alert("Please enter the Employee ID before uploading files.");
    //   window.location.href = "/insuranceAdd";
    //   return;
    // }
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file");
      return;
    }

    // Update the file in the correct index using the previous state
    setEmpInsUpload((prevUpload) => {
      const updatedFiles = [...prevUpload];
      updatedFiles[index] = { name: selectedFile.name, file: selectedFile };
      return updatedFiles;
    });

    try {
      const fileUrl = await uploadDocs(
        selectedFile,
        type,
        setUploadedDocs,
        index
      );
      if (fileUrl) {
        setEmpInsUpload((prevUpload) => {
          const updatedUrls = [...prevUpload];
          updatedUrls[index] = [fileUrl]; // Update with the URL instead of the file object
          return updatedUrls; // Return the updated state
        });
        // console.log("File uploaded successfully. URL:", fileUrl);
      }
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const getArrayDateValue = (value) => {
    return Array.isArray(value) ? value[value.length - 1] : value;
  };
  useEffect(() => {
    setValue("empID", searchResultData.empID);

    const keysToSet = [
      "empID",
      "empStatusType",
      "workmenCompNo",
    ];

    keysToSet.forEach((key) => {
      setValue(key, searchResultData[key]);
    });
    formFields.forEach((field) => {
      if (searchResultData[field.key] !== undefined) {
        setValue(field.key, searchResultData[field.key]);
      }
    });

    formFields.forEach((field) => {
      if (searchResultData[field.key] !== undefined) {
        setValue(field.key, getLastValue(searchResultData[field.key]));
      }
    });

    const arrayDateField = [ 
      "accidentIns",
    ];

    arrayDateField.forEach((field) => {
      setValue(field, getArrayDateValue(searchResultData[field]));
    });



    // console.log(searchResultData.empInsUpload);
    const url = searchResultData?.empInsUpload;

    if (url) {
      try {
        const parsedArray = JSON.parse(url);
        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
        // console.log(parsedFiles);
        setUploadedDocs((prev) => ({
          ...prev,
          empInsUpload: parsedFiles,
        }));
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    } else {
      console.warn(
        "searchResultData?.empInsUpload is undefined or not a valid JSON string."
      );
    }
  }, [searchResultData]);
  // console.log(uploadedDocs);


  useEffect(() => {
    if (empStatusTypeValue) {
      // Find the related workmenCompNo
      const selectedWorkMen = workMenDetails.find(
        (item) => item.empStatusType === empStatusTypeValue
      );
      if (selectedWorkMen) {
        setValue("workmenCompNo", selectedWorkMen.workmenCompNo);
      } else {
        setValue("workmenCompNo", ""); // Clear if no match
      }
    }
  }, [empStatusTypeValue, setValue, workMenDetails]);

  const onSubmit = async (data) => {
    // console.log(data, "data");

    const existingEmpInsurance = EmpInsuranceData.find(
      (match) => match.empID === data.empID
    );

    if (existingEmpInsurance) {
      const empInsValue = {
        ...data,
        id: existingEmpInsurance.id,
        empInsUpload: JSON.stringify(uploadedDocs.empInsUpload.flat()), // Flatten if necessary, otherwise keep as it is
      };
      // console.log("update", empInsValue);
      await UpdateEIDataSubmit({empInsValue});
      setShowTitle("Employee Insurance Info updated successfully");
      setNotification(true);
    } else {
      const empInsValue = {
        ...data,
        empInsUpload: JSON.stringify(uploadedDocs.empInsUpload.flat()), // Flatten if necessary, otherwise keep as it is
      };
      // console.log("create", empInsValue);
      await SubmitMPData({empInsValue});
      setShowTitle("Employee Insurance Info Saved successfully");
        setNotification(true);
    }
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
              <option value="">Select</option>
              {options.map((option) => (
                typeof option === "string" ? (
                  <option key={option} value={option}>{option}</option>
                ) : (
                  <option key={option.value} value={option.value}>{option.label}</option>
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
<div className="form-group ">
        <label className="mb-1 text_size_5">Workmen Compensation Insurance</label>
        <select
          {...register("empStatusType", { required: "This field is required" })}
          className="input-field"
        >
          <option value="">Select Status</option>
          {workMenDetails.map((item) => (
            <option key={item.id} value={item.empStatusType}>
              {item.empStatusType}
            </option>
          ))}
        </select>
      </div>

      {/* workmenCompNo Field */}
      <div className="form-group">
        <label className="mb-1 text_size_5">Policy Number</label>
        <input
          type="text"
          {...register("workmenCompNo", { required: "Policy Number is required" })}
          className="input-field"
          readOnly // Read-only since it's dynamically populated
        />
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
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
                    onChange={(e) => {
                      handleFileChange(e, "empInsUpload", index);
                    }}
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
              {empInsUpload[index]?.name || ""}
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
          path="/employee"
        />
      )}
    </form>
  );
};