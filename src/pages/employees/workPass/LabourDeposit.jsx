import React, { useContext, useEffect, useRef, useState } from 'react';
import { GoUpload } from 'react-icons/go';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LabourDepositSchema } from '../../../services/EmployeeValidation'; 
import { SpinLogo } from '../../../utils/SpinLogo';
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { DataSupply } from '../../../utils/DataStoredContext';
import { UpdateLDFun } from '../../../services/updateMethod/UpdateLDFun';
import { FormField } from '../../../utils/FormField';
import { FileUploadField } from '../medicalDep/FileUploadField';
import { useOutletContext } from 'react-router-dom';

export const LabourDeposit = () => {
  const { searchResultData } = useOutletContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { BJLData } = useContext(DataSupply);
  const { UpdateLDData } = UpdateLDFun();
  const { register, handleSubmit,watch, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(LabourDepositSchema),
  });
  
  const [notification, setNotification] = useState(false);
  const [showTitle,setShowTitle]=useState("")
  const [uploadedFileNames, setUploadedFileNames] = useState({
    lbrDepoUpload: null,
  });
  const [uploadLD, setUploadLD] = useState({
    lbrDepoUpload: [],
  });


  const watchInducLdUpload = watch("lbrDepoUpload", ""); 

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return ""; 
  };

  const getFileName = (url) => {
    const urlObj = new URL(url);
    const filePath = urlObj.pathname;
    const decodedUrl = decodeURIComponent(filePath);

    const fileNameWithExtension = decodedUrl.substring(
      decodedUrl.lastIndexOf("/") + 1
    );

    return fileNameWithExtension;
  };

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  useEffect(() => {
    setValue("empID", searchResultData.empID);
    const fields = ["lbrReceiptNo","lbrDepoAmt","lbrDepoSubmit",];
    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );
    if (searchResultData && searchResultData.lbrDepoUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.lbrDepoUpload);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
        console.log(parsedFiles);
        setValue("lbrDepoUpload", parsedFiles);

        setUploadLD((prev) => ({
          ...prev,
          lbrDepoUpload: parsedFiles, 
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          lbrDepoUpload:
            parsedFiles.length > 0
              ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
              : "",
        }));
      } catch (error) {
        console.error(`Failed to parse ${searchResultData.lbrDepoUpload}:`, error);
      }
    
    }
    
  }, [searchResultData, setValue]);

  const handleFileChange = async (e, label) => {
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

    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);

    try {
      await uploadDocs(selectedFile, label, setUploadLD);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name, // Store just the file name
      }));
    } catch (err) {
      console.log(err);
    }
  };
  const empID = watch("empID");


  const onSubmit = async (data) => {
    console.log("Form data:", data);

    try {
      let matchedEmployee = null;
      if (empID) {
        matchedEmployee = BJLData.find((val) => val.empID === empID);
        console.log(matchedEmployee);
      }
      const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-CA') : null; // 'en-CA' gives yyyy-mm-dd format
   
    const lbrDepoSubmit = formatDate(data.lbrDepoSubmit);

      const LDValue = {
        ...data,
        lbrDepoSubmit,
        lbrDepoUpload: JSON.stringify(uploadLD.lbrDepoUpload),
        id: matchedEmployee ? matchedEmployee.id : null,
      };
      console.log(LDValue);

      await UpdateLDData({ LDValue });
      setShowTitle("Work Pass Labour Deposit Data Stored Successfully")
      setNotification(true);    
    } catch (error) {
      console.error("Error submitting data:", error);
      console.log(error);

      if (error?.errors) {
        error.errors.forEach((err, index) => {
          console.error(`GraphQL Error ${index + 1}:`, err.message);
          if (err.extensions) {
            console.error("Error Extensions:", err.extensions);
          }
        });
      }
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto min-h-screen p-2 my-10 bg-[#F5F6F1CC]">
      {/* Employee ID Input */}
      <div className="flex justify-end items-center">
        <div className="max-w-sm">
          <FormField
            label="Employee ID"
            register={register}
            name="empID"
            type="text"
            placeholder="Enter Employee ID"
            errors={errors}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 mt-10 gap-5">


      <FormField
          label="Labour Deposit Receipt Number"
          register={register}
          name="lbrReceiptNo"
          type="text"
          errors={errors}
        />
      <FormField
          label="Deposit Amount"
          register={register}
          name="lbrDepoAmt"
          type="text"
          errors={errors}
        />
      <FormField
          label="Date Endorsement Of Labour Deposit"
          register={register}
          name="lbrDepoSubmit"
          type="date"
          errors={errors}
        />
     <div>
        <FileUploadField
          label="Upload File"
          onChangeFunc={(e) => handleFileChange(e, "lbrDepoUpload")}
          name="lbrDepoUpload"
          register={register}
          error={errors}
          fileName={
            uploadedFileNames.lbrDepoUpload ||
            extractFileName(watchInducLdUpload)
          }        />
      </div>
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
