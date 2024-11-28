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
  const { EmpInsuranceData } = useContext(DataSupply);
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
      empInsUpload: [],
    },
    resolver: yupResolver(EmpInsuranceschema),
  });

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
        "Others",
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
      label: "Workmen Compensation Insurance",
      key: "workmenComp",
      type: "select",
      options: ["Offshore", "Onshore", "General"],
    },
    { label: "Policy Number", key: "workmePolicyNo", type: "text" },
    {
      label: "Travelling Insurance",
      key: "travelIns",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      label: "Personal Accident Insurance",
      key: "accidentIns",
      type: "select",
      options: ["Yes", "No"],
    },
  ];

  const handleAddFileClick = () => {
    setInputFields((prevFields) => [...prevFields, {}]); // Add new input field
    setEmpInsUpload((prevUpload) => [...prevUpload, []]);
  };

  // Handle removing a file input field
  const handleRemoveField = (index) => {
    setInputFields((prevFields) => prevFields.filter((_, i) => i !== index));
    setEmpInsUpload((prevUploads) => prevUploads.filter((_, i) => i !== index)); // Remove the corresponding file array
  };

  const handleFileChange = async (e, type, index) => {
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/insuranceAdd";
      return;
    }
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
      // Assuming uploadDocs uploads the file and returns the URL of the uploaded file
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
       
      }
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  useEffect(() => {
    setValue("empID", searchResultData.empID);
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


    const url = searchResultData?.empInsUpload;

    if (url) {
      try {
        const parsedArray = JSON.parse(url);
        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
 
        setUploadedDocs((prev) => ({
          ...prev,
          empInsUpload: parsedFiles,
        }));
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    } else {
      // console.warn(
      //   "searchResultData?.empInsUpload is undefined or not a valid JSON string."
      // );
    }
  }, [searchResultData]);

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
      // await UpdateEIDataSubmit(empInsValue);
      // setShowTitle("Employee Insurance Info updated successfully");
      // setNotification(true);
    } else {
      const empInsValue = {
        ...data,
        empInsUpload: JSON.stringify(uploadedDocs.empInsUpload.flat()), // Flatten if necessary, otherwise keep as it is
      };
      // console.log("create", empInsValue);
      // await SubmitMPData(empInsValue);
      // setShowTitle("Employee Insurance Info Saved successfully");
      //   setNotification(true);
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

      <div className="grid grid-cols-2 gap-5 w-full">
        {formFields.map(
          ({ label, key, type, options = [], className = "" }) => (
            <div className="form-group" key={key}>
              <label className="mb-1 text_size_5">{label}</label>
              {type === "select" ? (
                <>
                  <select
                    {...register(key)}
                    className={`input-field select-custom ${className}`}
                    watch={watch(key) || ""}
                  >
                    <option value=""></option>
                    {options.map((option) =>
                      typeof option === "string" ? (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ) : (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      )
                    )}
                  </select>
                </>
              ) : (
                <input
                  type={type}
                  {...register(key)}
                  className={`input-field ${className}`}
                  watch={watch(key) || ""}
                />
              )}
              {errors[key] && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors[key].message}
                </p>
              )}
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-3 gap-10">
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
              {/* <input
                type="file"
                {...register(`empInsUpload[${index}]`)}
                onChange={(e) => handleFileChange(e, "empInsUpload", index)}
                className="hidden"
                accept=".pdf"
              /> */}
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
