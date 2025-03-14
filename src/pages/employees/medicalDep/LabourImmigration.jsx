import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabourImmigrationSchema } from "../../../services/EmployeeValidation";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { EmpDataPass } from "../EmpDataPass";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { UploadingFiles } from "./FileUploadField";
import { FormField } from "../../../utils/FormField";
import { DependentPass } from "./DependentPass";
import { MedicalPassFunc } from "../../../services/createMethod/MedicalPassFunc";
import { SpinLogo } from "../../../utils/SpinLogo";
import { DataSupply } from "../../../utils/DataStoredContext";
import { UpdateMedical } from "../../../services/updateMethod/UpdateMedicalInfo";
import { LabourImmiUpload } from "../../../services/uploadDocsDelete/LabourImmiUpload";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { useDeleteAccess } from "../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../utils/DeletePopup";

const LabourImmigration = () => {
  const { formattedPermissions } = useDeleteAccess();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { SubmitMPData } = MedicalPassFunc();
  const { updateMedicalSubmit } = UpdateMedical();
  const { empPIData, LMIData } = useContext(DataSupply);

  // console.log("formattedPermissions : ", formattedPermissions);
  // const [deletePermission, setDeletePermission] = useState(null);

  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [arrayUploadDocs, setArrayUploadDocs] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState({});
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isUploading, setIsUploading] = useState({
    uploadFitness: false,
    uploadRegis: false,
    uploadBwn: false,
  });

  const [docsUploaded, setDocsUploaded] = useState({
    uploadFitness: [],
    uploadRegis: [],
    uploadBwn: [],
  });
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [dependPassData, setDependPassData] = useState(null);
  const [showTitle, setShowTitle] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    getValues,
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

  const updateUploadingState = (label, value) => {
    setIsUploading((prev) => ({
      ...prev,
      [label]: value,
    }));
    // console.log(value);
  };

  // console.log(uploadedFileNames);
  // console.log(arrayUploadDocs)

  const handleFileChange = async (e, label) => {
    const watchedEmpID = watch("empID");
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/employeeInfo";
      return;
    }

    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
    }

    // Ensure no duplicate files are added
    const currentFiles = watch(label) || [];
    if (currentFiles?.some((file) => file.name === selectedFile.name)) {
      alert("This file has already been uploaded.");
      return;
    }

    setValue(label, [...currentFiles, selectedFile]);
 
    try {
      updateUploadingState(label, true);
      await uploadDocs(selectedFile, label, setDocsUploaded, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };

  const deleteFile = async (fileType, fileName) => {
    try {
      const watchedEmpID = watch("empID");
      if (!watchedEmpID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(
        fileType,
        fileName,
        watchedEmpID
      );
      const isDeletedArrayUploaded = await LabourImmiUpload(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setDocsUploaded,
        setIsUploading
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      // console.log(`Deleted "${fileName}". Remaining files:`);
      setdeleteTitle1(`${fileName}`);
      handleDeleteMsg();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

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
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    }
    return dateString;
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

    const keysToSet = ["empID", "bruhimsRNo", "overMD", "overME", "bruhimsRD"];

    keysToSet.forEach((key) => {
      // console.log("key : ", key);
      if (result[key]) {
        let value = result[key];
        if (key === "overMD" || key === "overME" || key === "bruhimsRD") {
          value = convertDateFormat(value);
        }
        setValue(key, value);
      }
    });

    const fields = ["bruneiMAD", "bruneiME"];
    // fields.forEach((field) => setValue(field, getLastValue(result[field])));
    fields.forEach((field) => {
      const cleanedValue = getLastValue(result[field]);
      const formattedValue = formatDateValue(cleanedValue);
      setValue(field, formattedValue);
    });

    if (result?.dependPass) {
      try {
        const parsedData = JSON.parse(result.dependPass);
        setDependPassData(parsedData);
      } catch (error) {
        console.error("Failed to parse dependPass:", error);
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
            [field]: parsedFiles.map((file) => getFileName(file.upload)),
          }));
        } catch (error) {
          console.error(`Failed to parse ${field}:`, error);
        }
      }
    });
  };
  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    // const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileNameWithExtension;
  };
  // console.log(arrayUploadDocs, "94652196532");

  const onSubmit = async (data) => {
    // console.log(data.dependPass);
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
              const uploadDpArray = Array.isArray(arrayUploadDocs.uploadDp)
                ? arrayUploadDocs.uploadDp
                : Object.values(arrayUploadDocs.uploadDp || {});

              const uploadDrArray = Array.isArray(arrayUploadDocs.uploadDr)
                ? arrayUploadDocs.uploadDr
                : Object.values(arrayUploadDocs.uploadDr || {});

              // console.log("Index:", index);
              // console.log("uploadDpArray:", uploadDpArray);
              // console.log("uploadDrArray:", uploadDrArray);

              // Fetch correct index value
              const uploadDp =
                uploadDpArray[index] && uploadDpArray[index].length > 0
                  ? uploadDpArray[index]
                  : val.uploadDp || []; // Preserve existing value

              const uploadDr =
                uploadDrArray[index] && uploadDrArray[index].length > 0
                  ? uploadDrArray[index]
                  : val.uploadDr || [];
              // const uploadDp = flatDocs[index]?.upload || val.uploadDp;

              // console.log(uploadDp, "uploaddp");
              // console.log(uploadDr, "uploaddr");

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

  const requiredPermissions = ["Medical & Dependent Info"];

  const access = "Employee";

  console.log("Up", isUploading);
  
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
              deleteFile={deleteFile}
              isUploading={isUploading}
              errors={errors}
              formattedPermissions={formattedPermissions}
              requiredPermissions={requiredPermissions}
              access={access}
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
        isUploading={isUploading}
        value={dependPassData}
        watchedEmpID={watchedEmpID}
        deleteFile={deleteFile}
        getValues={getValues}
        formattedPermissions={formattedPermissions}
        requiredPermissions={requiredPermissions}
        access={access}
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
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </form>
  );
};

export default LabourImmigration;
