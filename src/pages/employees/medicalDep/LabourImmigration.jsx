import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
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
import { UpdateMedical } from "../../../services/updateMethod/UpdateMedicalInfo";
// import { handleDeleteFile } from "../../../services/uploadDocsS3/LabourImmiUpload";

const LabourImmigration = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { SubmitMPData } = MedicalPassFunc();
  const { updateMedicalSubmit } = UpdateMedical();
  const { empPIData, LMIData } = useContext(DataSupply);

  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [arrayUploadDocs, setArrayUploadDocs] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState({});
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [docsUploaded, setDocsUploaded] = useState({
    uploadFitness: [],
    uploadRegis: [],
    uploadBwn: [],
  });
  const [notification, setNotification] = useState(false);
  const [dependPassData, setDependPassData] = useState(null);
  const [showTitle, setShowTitle] = useState("");
  // const [id, setID] = useState({
  //   LabourImmiID:"",
  // });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      uploadFitness: [],
      uploadRegis: [],
      uploadBwn: [],
      dependPass: [],
    },
    resolver: yupResolver(LabourImmigrationSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const LMIDetails = LMIData
              ? LMIData.find((user) => user.empID === emp.empID)
              : {};

            return { ...emp, ...LMIDetails };
          })
          .filter(Boolean);

        setAllEmpDetails(mergedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [empPIData, LMIData]);

  const watchedEmpID = watch("empID");

  
  const handleFileChange = async (e, label) => {
    const watchedEmpID = watch("empID");
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/employeeInfo";
      return;
    }
  
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
  
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file");
      return;
    }
  
    // Fetch current files (including backend-stored ones)
    const currentFiles = watch(label) || []; // React Hook Form state
  
    // Count only newly uploaded files, ignoring backend-stored files
    const newUploads = currentFiles.filter(file => file instanceof File);
  
    if (newUploads.length > 0) {
      alert("You can only upload one new file.");
      return;
    }
  
    // Append the new file to the form state
    setValue(label, [...currentFiles, selectedFile]);
  
    try {
      await uploadDocs(selectedFile, label, setDocsUploaded, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // const deleteFile = async (fileType, fileName) => {
  //   const watchedEmpID = watch("empID");
  //   // const serviceID = id.serviceID;
  //   const LabourImmiID = id.LabourImmiID;

  //   try {
  //     await handleDeleteFile(
  //       fileType,
  //       fileName,
  //       watchedEmpID,
  //       setUploadedFileNames,
  //       setValue,
  //       trigger,
  //       LabourImmiID
  //     );
  //     const currentFiles = watch(fileType) || []; 
  //     // Filter out the deleted file
  //     const updatedFiles = currentFiles.filter(
  //       (file) => file.name !== fileName
  //     );
  //     // Update form state with the new file list
  //     setValue(fileType, updatedFiles);

  //     // Update UI state
  //     setDocsUploaded((prevState) => ({
  //       ...prevState,
  //       [fileType]: updatedFiles,
  //     }));
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //   }
  // };
  // const getLastValue = (value) => {
  //   return Array.isArray(value) ? value[value.length - 1] : value;
  // };
  const getLastValue = (value) => {
    if (Array.isArray(value)) {
      const lastValue = value[value.length - 1];
      // Remove square brackets if present
      return typeof lastValue === "string" &&
        lastValue.startsWith("[") &&
        lastValue.endsWith("]")
        ? lastValue.slice(1, -1)
        : lastValue;
    }
    return value;
  };

  const formatDateValue = (dateString) => {
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [part1, part2, year] = dateString.split("/");

      // Determine if the format is MM/dd/yyyy or dd/MM/yyyy
      const isMMDDYYYY = parseInt(part1, 10) > 12; // If the first part is greater than 12, it's a day
      const day = isMMDDYYYY ? part1 : part2;
      const month = isMMDDYYYY ? part2 : part1;

      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return dateString; // Return original string if it doesn't match
  };

  const convertDateFormat = (dateStr) => {
    const isValidDate = (dateParts) => {
      const [part1, part2, part3] = dateParts;
      return (
        !isNaN(part1) &&
        !isNaN(part2) &&
        !isNaN(part3) &&
        part1 > 0 &&
        part2 > 0 &&
        part3 > 0
      );
    };

    const dateParts = dateStr.split("/");

    if (dateParts.length !== 3) {
      throw new Error(`Invalid date format: ${dateStr}`);
    }

    let day, month, year;

    // Check if the input date string is in MM/DD/YYYY format
    if (dateParts[0] > 12) {
      [day, month, year] = dateParts;
    } else {
      [month, day, year] = dateParts;
    }

    // Validate date values
    if (!isValidDate([day, month, year])) {
      throw new Error(`Invalid date values: ${dateStr}`);
    }

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const searchResult = (result) => {
    // console.log(result);

    // const LabourImmiRecord = LMIData.find((match) => match.empID === result.empID);
   

    // if (LabourImmiRecord) {
    //   setID((prevData) => ({
    //     ...prevData,
    //     LabourImmiID: LabourImmiRecord.id, // Assuming this field exists.
    //   }))}

    const keysToSet = ["empID", "bruhimsRNo", "overMD", "overME", "bruhimsRD"];

    keysToSet.forEach((key) => {
      let value = result[key];

      if (value === null || value === undefined) {
        value = ""; // Set empty string for null or undefined values
      }

      if (key === "overMD" || key === "overME" || key === "bruhimsRD") {
        value = value ? convertDateFormat(value) : ""; // Format only if value exists
      }

      setValue(key, value); // Set the value (formatted or empty)
    });

    const fields = ["bruneiMAD", "bruneiME"];
    // fields.forEach((field) => setValue(field, getLastValue(result[field])));
    fields.forEach((field) => {
      const cleanedValue = getLastValue(result[field]);
      // console.log(cleanedValue);

      const formattedValue = formatDateValue(cleanedValue);
      // console.log(formattedValue);

      setValue(field, formattedValue);
    });

    if (result?.dependPass) {
      try {
        const parsedData = JSON.parse(result.dependPass);
        setDependPassData(parsedData);
      } catch (error) {
        // console.error("Failed to parse dependPass:", error);
      }
    }

    const uploadFields = ["uploadFitness", "uploadRegis", "uploadBwn"];

      uploadFields.forEach((field) => {
      if (result && result[field]) {
        try {
          // Parse the field data if it exists
          const parsedArray = JSON.parse(result[field]);

          // Then, parse each element inside the array (if it's stringified as well)
          const parsedFiles = parsedArray.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          );
          // console.log(parsedFiles);
          setValue(field, parsedFiles);

          setDocsUploaded((prev) => ({
            ...prev,
            [field]: parsedFiles, // Dynamically set based on field name
          }));

          setUploadedFileNames((prev) => ({
            ...prev,
            [field]: parsedFiles.map((file) => getFileName(file.upload))
          }));
        } catch (error) {
          console.error(`Failed to parse ${field}:`, error);
        }
      }
    });
  };
  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileName;
  };

  const onSubmit = async (data) => {
    // console.log(data);

    try {
      const checkingPITable = empPIData.find(
        (match) => match.empID === data.empID
      );
      const checkingLMIDTable = LMIData.find(
        (match) => match.empID === data.empID
      );
      // const formatDate = (date) =>
      //   date ? new Date(date).toLocaleDateString("en-CA") : null;

      const formatDate = (dateString) => {
        if (!dateString || isNaN(new Date(dateString).getTime())) {
          return; // Return an empty string or a custom message if invalid
        }
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const overMD = formatDate(data.overMD);
      const overME = formatDate(data.overME);
      const bruhimsRD = formatDate(data.bruhimsRD);
      const bruneiMAD = formatDate(data.bruneiMAD);
      const bruneiME = formatDate(data.bruneiME);

      if (checkingLMIDTable && checkingPITable) {
        const updateFieldArray = (existingArray, newValue) => {
          if (newValue === "") return existingArray;
          const updatedArray = [
            ...new Set([...(existingArray || []), newValue]),
          ];
          return updatedArray.length > 0 ? updatedArray : null;
        };

        const updatebruneiMAD = updateFieldArray(
          checkingLMIDTable?.bruneiMAD,
          bruneiMAD
        );
        const updatebruneiME = updateFieldArray(
          checkingLMIDTable?.bruneiME,
          bruneiME
        );

        const LabUpValue = {
          ...data,
          overMD: overMD,
          overME: overME,
          bruhimsRD: bruhimsRD,
          bruneiMAD: updatebruneiMAD,
          bruneiME: updatebruneiME,
          uploadFitness: JSON.stringify(docsUploaded.uploadFitness),
          uploadRegis: JSON.stringify(docsUploaded.uploadRegis),
          uploadBwn: JSON.stringify(docsUploaded.uploadBwn),
          dependPass: JSON.stringify(
            data.dependPass.map((val, index) => {
              const uploadDp =
                arrayUploadDocs?.uploadDp?.[index] || val.uploadDp;

              const uploadDr =
                arrayUploadDocs?.uploadDr?.[index] || val.uploadDr;
              return {
                ...val,
                uploadDp, // Assign the array for uploadDp
                uploadDr, // Assign the array for uploadDr
              };
            })
          ),
          LabTable: checkingLMIDTable.id,
        };
        // console.log("Update Method :", LabUpValue);

        await updateMedicalSubmit({ LabUpValue });
        setShowTitle("Medical and Dependent Info details updated successfully");
        setNotification(true);
      } else {
        const [updatebruneiMAD, updatebruneiME] = [[bruneiMAD], [bruneiME]].map(
          (arr) => [...new Set(arr)]
        );

        const labValue = {
          ...data,
          overMD: overMD,
          overME: overME,
          bruhimsRD: bruhimsRD,
          bruneiMAD: updatebruneiMAD,
          bruneiME: updatebruneiME,
          uploadFitness: JSON.stringify(docsUploaded.uploadFitness),
          uploadRegis: JSON.stringify(docsUploaded.uploadRegis),
          uploadBwn: JSON.stringify(docsUploaded.uploadBwn),
          dependPass: JSON.stringify(
            data.dependPass.map((val, index) => {
              const uploadDp =
                arrayUploadDocs?.uploadDp?.[index] || val.uploadDp;

              const uploadDr =
                arrayUploadDocs?.uploadDr?.[index] || val.uploadDr;
              return {
                ...val,
                uploadDp, // Assign the array for uploadDp
                uploadDr, // Assign the array for uploadDr
              };
            })
          ),
        };
        // console.log("Create Method :", labValue);
        await SubmitMPData({ labValue });
        setShowTitle("Medical and Dependent Info details saved successfully");
        setNotification(true);
      }
    } catch (error) {
      console.log(error);

      console.error(
        "Error submitting data to AWS:",
        JSON.stringify(error, null, 2)
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={() => {
        setFilteredEmployees([]);
      }}
      className="container mx-auto p-10 bg-[#F5F6F1CC]"
    >
      <div className="w-full flex items-center justify-between">
        <Link to="/employee" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <p className="flex-1 text-center mt-2 text_size_2 uppercase">
          Medical & Dependent Info
        </p>
        <div className="flex-1">
          <SearchDisplay
            searchIcon2={<IoSearch />}
            searchResult={searchResult}
            placeholder="Employee ID"
            rounded="rounded-lg"
            newFormData={allEmpDetails}
            filteredEmployees={filteredEmployees}
            setFilteredEmployees={setFilteredEmployees}
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex justify-end items-center pt-10 pb-2">
        <div>
          <FormField
            label="Employee ID"
            type="text"
            name="empID"
            placeholder="Enter Employee ID"
            errors={errors}
            register={register}
          />
        </div>
      </div>

      <div className="form-group">
        <p className="text_size_3 form-group text-medium_grey mb-5">
          Employee Medical Info
        </p>
        <div className=" grid grid-cols-3 gap-x-5 gap-y-5 mt-5 mb-5 ">
          {EmpDataPass.medicalFields.map((field, index) => (
            <UploadingFiles
              key={index}
              field={field}
              register={register}
              handleFileChange={handleFileChange}
              uploadedFileNames={uploadedFileNames}
              watchedEmpID={watchedEmpID}
              // deleteFile={deleteFile}
              errors={errors}
            />
          ))}
        </div>
      </div>

      <hr />

      <DependentPass
        register={register}
        uploadedFileNames={uploadedFileNames} 
        setUploadedFileNames={setUploadedFileNames}
        control={control}
        setValue={setValue}
        setArrayUploadDocs={setArrayUploadDocs}
        arrayUploadDocs={arrayUploadDocs}
        errors={errors}
        watch={watch}
        trigger={trigger}
        // id={id}
        value={dependPassData}
        watchedEmpID={watchedEmpID}
        // deleteFile={deleteFile}
        getValues={getValues}
      />

      <div className="center">
        <button type="submit" className="primary_btn">
          Submit
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/labourImmigration"
        />
      )}
    </form>
  );
};

export default LabourImmigration;
