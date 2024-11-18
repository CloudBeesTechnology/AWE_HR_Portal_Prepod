//its working update
import React, { useEffect, useState, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabourImmigrationSchema } from "../../../services/EmployeeValidation";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { EmpDataPass } from "../EmpDataPass";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { UploadingFiles } from "./FileUploadField";
import { FormField } from "../../../utils/FormField";
import { DependentPass } from "./DependentPass";
import { MedicalPassFunc } from "../../../services/createMethod/MedicalPassFunc";
import { SpinLogo } from "../../../utils/SpinLogo";
import { DataSupply } from "../../../utils/DataStoredContext";
import useMedicalUpdate from "../../../hooks/useMedicalUpdate";

export const LabourImmigration = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { SubmitMPData } = MedicalPassFunc();
  const { updateMedicalInfo, loading, error, updatedData } = useMedicalUpdate();
  const { empPIData, LMIData } = useContext(DataSupply);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [arrayUploadDocs, setArrayUploadDocs] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState({
    uploadFitness: null,
    uploadRegis: null,
    uploadBwn: null,
  });
  const [docsUploaded, setDocsUploaded] = useState({
    uploadFitness: null,
    uploadRegis: null,
    uploadBwn: null,
  });

  const [notification, setNotification] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dependPass: [
        {
          dependName: "",
          dependPpNo: "",
          dependPpE: "",
          relation: "",
          labourDPBy: "",
          labourDRNo: "",
          labourDAmount: "",
          uploadDp: "",
          uploadDr: "",
        },
      ],
    },
    resolver: yupResolver(LabourImmigrationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dependPass",
  });

  // Fetch and merge data for employee and medical info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = LMIData.map((emp) => {
          const LMDetails = empPIData.find((user) => user.empID === emp.empID);
          if (!LMDetails) return null;
          return { ...LMDetails, ...emp };
        }).filter(Boolean);

        setUserDetails(mergedData);
        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [empPIData, LMIData]);

  // Search result handler
  const searchResult = (result) => {
    const selectedEmployee = allEmpDetails.find((emp) => emp.empID === result.empID);
    if (selectedEmployee) {
      setSelectedEmployee(selectedEmployee);
      autoFillForm(selectedEmployee);
    }
  };
//working bri

const autoFillForm = (employeeData) => {
  // Iterate over the employeeData keys and set their values
  Object.keys(employeeData).forEach((key) => {
    if (Array.isArray(employeeData[key])) {
      setValue(key, employeeData[key][0] || "");
    } else {
      setValue(key, employeeData[key]);
    }
  });

  if (employeeData.dependPass) {
    try {
      let dependPassData = employeeData.dependPass;

      // If dependPass is an array of strings, check for stringified objects or arrays
      if (Array.isArray(dependPassData) && dependPassData.length > 0) {
        dependPassData = dependPassData.flatMap(depStr => {
          try {
            // Check if the string is a stringified array or a stringified object
            let parsedData = JSON.parse(depStr);

            // If it's an array of objects, flatten it
            if (Array.isArray(parsedData)) {
              return parsedData.map(dep => ({
                ...dep,
                uploadDp: dep.uploadDp || "",
                uploadDr: dep.uploadDr || "",
              }));
            }

            // If it's a single object (not an array), make it an array
            if (typeof parsedData === 'object') {
              return [{
                ...parsedData,
                uploadDp: parsedData.uploadDp || "",
                uploadDr: parsedData.uploadDr || "",
              }];
            }

            return []; // Return empty array if data is neither object nor array
          } catch (e) {
            console.error("Error parsing dependPass entry:", depStr, e);
            return []; // Fallback to empty array if parsing fails
          }
        });

        setValue("dependPass", dependPassData); // Set the value with the parsed and normalized data
      } else {
        console.warn("dependPass is not an array or is empty");
        setValue("dependPass", []); // Fallback to empty array if invalid
      }
    } catch (error) {
      console.error("Error handling dependPass data", error);
      setValue("dependPass", []); // Fallback to empty array on error
    }
  }
  setUploadedFileNames({
    uploadFitness: employeeData.uploadFitness,
    uploadRegis: employeeData.uploadRegis,
    uploadBwn: employeeData.uploadBwn,
   
  });
  setDocsUploaded({
    uploadFitness: employeeData.uploadFitness,
    uploadRegis: employeeData.uploadRegis,
    uploadBwn: employeeData.uploadBwn,
  });
};


  // Handle file change
  const handleFileChange = async (e, fieldName, index) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Upload must be a PDF file");
      return;
    }
    setValue(fieldName, file);

    try {
      await uploadDocs(file, fieldName, setDocsUploaded);
      setUploadedFileNames((prev) => ({
        ...prev,
        [fieldName]: file.name,
      }));
    } catch (error) {
      console.error("File upload error:", error);
    }
    
  };

  // Submit form
  const onSubmit = async (data) => {
    try {
      const bruneiMAD = Array.isArray(data.bruneiMAD) ? data.bruneiMAD[0] : data.bruneiMAD;
      const bruneiME = Array.isArray(data.bruneiME) ? data.bruneiME[0] : data.bruneiME;

      const dependPassData = data.dependPass.map((val, index) => {
        return {
          dependName: val.dependName,
          dependPpNo: val.dependPpNo,
          dependPpE: val.dependPpE,
          relation: val.relation,
          labourDPBy: val.labourDPBy,
          labourDRNo: val.labourDRNo,
          labourDAmount: val.labourDAmount,
          uploadDp: arrayUploadDocs[`uploadDp_${index}`] || val.uploadDp || null,
          uploadDr: arrayUploadDocs[`uploadDr_${index}`] || val.uploadDr || null,
        };
      });

      const labValue = {
        ...data,
        // id: selectedEmployee.id,
        bruneiMAD,
        bruneiME,
        uploadFitness: docsUploaded.uploadFitness,
        uploadRegis: docsUploaded.uploadRegis,
        uploadBwn: docsUploaded.uploadBwn,
        dependPassData: dependPassData,
      };

      // Create or Update logic
      if (selectedEmployee) {
        // Update existing employee data using `updateMedicalInfo`
        await updateMedicalInfo(selectedEmployee.id, labValue);
        setNotification(true);
        console.log(selectedEmployee, "Update")
      } else {
        // Create new employee data
        await SubmitMPData({ labValue });
        setNotification(true);
        console.log(selectedEmployee, "Create")
        
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  console.log(selectedEmployee, "Holo")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-10 bg-[#F5F6F1CC]">
      <div className="w-full flex items-center justify-between">
        <Link to="/employee" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <p className="flex-1 text-center mt-2 text_size_2 uppercase">Medical & Dependent Info</p>
        <div className="flex-1">
          <SearchDisplay
            icon={<IoSearch />}
            searchResult={searchResult}
            placeholder="Employee Id"
            rounded="rounded-lg"
            newFormData={allEmpDetails}
          />
        </div>
      </div>

      {/* Employee ID Field */}
      <div className="flex justify-end items-center pt-7 pb-2">
        <FormField
          label="Employee ID"
          type="text"
          name="empID"
          placeholder="Enter Employee ID"
          errors={errors}
          register={register}
        />
      </div>

      {/* Medical Info Section */}
      <div className="form-group">
        <p className="text_size_3 form-group text-medium_grey mb-5">Employee Medical Info</p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-2 mt-2 mb-5">
          {EmpDataPass.medicalFields.map((field, index) => (
            <UploadingFiles
              key={index}
              field={field}
              register={register}
              handleFileChange={handleFileChange}
              uploadedFileNames={uploadedFileNames}
              errors={errors}
            />
          ))}
        </div>
      </div>

      <hr />

      <DependentPass
        fields={fields}
        errors={errors}
        register={register}
        UploadingFiles={uploadedFileNames}
        append={append}
        remove={remove}
        setValue={setValue}
        setArrayUploadDocs={setArrayUploadDocs}
        arrayUploadDocs={arrayUploadDocs}
        empID={watch("empID")}
      />

      <div className="center">
        <button type="submit" className="primary_btn">Submit</button>
      </div>

      {/* {notification && (
        <SpinLogo
          text="Medical And Dependent Info details saved successfully"
          notification={notification}
          path="/labourImmigration"
        />
      )} */}
    </form>
  );
};

export default LabourImmigration;
