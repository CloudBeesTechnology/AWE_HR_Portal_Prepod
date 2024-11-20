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
import { UpdateMedical } from "../../../services/updateMethod/UpdateMedicalInfo";

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
  const [docsUploaded, setDocsUploaded] = useState({
    uploadFitness: [],
    uploadRegis: [],
    uploadBwn: [],
  });
  const [notification, setNotification] = useState(false);
  const [dependPassData, setDependPassData] = useState(null);
  const [showTitle, setShowTitle] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
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
        // console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [empPIData, LMIData]);

  const handleFileChange = async (e, label) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file ");
      return;
    }
    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);
    try {
      // Dynamically set field based on label
      await uploadDocs(selectedFile, label, setDocsUploaded);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const searchResult = (result) => {
    

    const keysToSet = ["empID", "overMD", "overME", "bruhimsRD", "bruhimsRNo"];

    keysToSet.forEach((key) => {
      if (result[key]) setValue(key, result[key]);
    });

    const fields = ["bruneiMAD", "bruneiME"];
    fields.forEach((field) => setValue(field, getLastValue(result[field])));

    if (result?.dependPass) {
      try {
        const parsedData = JSON.parse(result.dependPass);
        
        
        setDependPassData(parsedData);
      } catch (error) {
        // console.error("Failed to parse dependPass:", error);
      }
    }

    const uploadFields = ["uploadFitness", "uploadRegis", "uploadBwn"];

    uploadFields.map((field) => {
      if (result && result[field]) {
        try {
          // Parse the field data if it exists
          const parsedArray = JSON.parse(result[field]);

          // Then, parse each element inside the array (if it's stringified as well)
          const parsedFiles = parsedArray.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          );
          
          setValue(field, parsedFiles);

          setDocsUploaded((prev) => ({
            ...prev,
            [field]: parsedFiles, // Dynamically set based on field name
          }));

          setUploadedFileNames((prev) => ({
            ...prev,
            [field]:
              parsedFiles.length > 0
                ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
                : "",
          }));
        } catch (error) {
          // console.error(`Failed to parse ${field}:`, error);
        }
      }
    });
  };
  function getFileName(url) {
    const urlObj = new URL(url);
    const filePath = urlObj.pathname;

    const decodedUrl = decodeURIComponent(filePath);

    // Extract the file name after the last '/' in the path
    const fileNameWithExtension = decodedUrl.substring(
      decodedUrl.lastIndexOf("/") + 1
    );

    return fileNameWithExtension;
  }

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const checkingPITable = empPIData.find(
        (match) => match.empID === data.empID
      );
      const checkingIDTable = LMIData.find(
        (match) => match.empID === data.empID
      );
      if (checkingIDTable && checkingPITable) {
        const LabUpValue = {
          ...data,
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
          LabTable: checkingIDTable.id,
        };
        // console.log("Update Method :", LabUpValue);

        await updateMedicalSubmit({ LabUpValue });
        setShowTitle("Medical and Dependent Info details updated successfully");
        setNotification(true);
      } else {
        const labValue = {
          ...data,
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
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex justify-end items-center pt-7 pb-2">
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
        register={register}
        UploadingFiles={uploadedFileNames}
        setUploadedFileNames={setUploadedFileNames}
        control={control}
        setValue={setValue}
        setArrayUploadDocs={setArrayUploadDocs}
        arrayUploadDocs={arrayUploadDocs}
        errors={errors}
        watch={watch}
        value={dependPassData}
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
