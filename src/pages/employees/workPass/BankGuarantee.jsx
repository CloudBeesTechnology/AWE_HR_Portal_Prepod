import React, { useContext, useEffect, useRef, useState } from 'react';
import { GoUpload } from 'react-icons/go';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { BankEmpSchema } from '../../../services/EmployeeValidation'; 
import { SpinLogo } from '../../../utils/SpinLogo';
import { FileUploadField } from '../medicalDep/FileUploadField';
import { FormField } from '../../../utils/FormField';
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { BJLDataFun } from '../../../services/createMethod/BJLDataFun';
import { UpdateBJL } from '../../../services/updateMethod/UpdateBJL';
import { DataSupply } from '../../../utils/DataStoredContext';
import { useOutletContext } from 'react-router-dom';

export const BankGuarantee = () => {
  const { searchResultData } = useOutletContext();
  const { BGData } = BJLDataFun();
  const { BJLData } = useContext(DataSupply);
  const { UpdateBJLFun } = UpdateBJL();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { register, handleSubmit,watch, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(BankEmpSchema),
  });
  
  const [notification, setNotification] = useState(false);
  const [showTitle,setShowTitle]=useState("")
  const [uploadedFileNames, setUploadedFileNames] = useState({
    bankEmpUpload: null,
  });
  const [uploadBG, setUploadBG] = useState({
    bankEmpUpload: [],
  });

  
  const watchInducBgUpload = watch("bankEmpUpload", ""); // Watch the bankEmpUpload field

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
    const fields = ["bankSubmit","bankRece","bankRefNo","bankAmt","bankValid","bankEndorse","bankEmpUpload"];
    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );
    if (searchResultData && searchResultData.bankEmpUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.bankEmpUpload);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
        console.log(parsedFiles);
        setValue("bankEmpUpload", parsedFiles);

        setUploadBG((prev) => ({
          ...prev,
          bankEmpUpload: parsedFiles, 
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          bankEmpUpload:
            parsedFiles.length > 0
              ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
              : "",
        }));
      } catch (error) {
        console.error(`Failed to parse ${searchResultData.bankEmpUpload}:`, error);
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
      await uploadDocs(selectedFile, label, setUploadBG);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name, // Store just the file name
      }));
    } catch (err) {
      console.log(err);
    }
  };


  const onSubmit = async (data) => {    
    try {
      const checkingEIDTable = BJLData.find((match) => match.empID === data.empID);
      
    const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-CA') : null; // 'en-CA' gives yyyy-mm-dd format
    const bankEndorse= formatDate(data.bankEndorse);
    const bankSubmit= formatDate(data.bankSubmit);
    const bankRece= formatDate(data.bankRece);    
    const bankValid= formatDate(data.bankValid);
 
      if (checkingEIDTable) {
        const BJLUpValue = {
          ...data,
          bankEndorse,
          bankRece,
          bankSubmit,
          bankValid,
          bankEmpUpload: JSON.stringify(uploadBG.bankEmpUpload),
          id: checkingEIDTable.id,
        };
        console.log(BJLUpValue);
        await UpdateBJLFun({ BJLUpValue });
        setShowTitle("Work Pass Bank Guarantee Info Update Successfully")
      setNotification(true);
      } else {
        const BJLValue = {
          ...data,
          bankEndorse,
          bankRece,
          bankSubmit,
          bankValid,
          bankEmpUpload: JSON.stringify(uploadBG.bankEmpUpload),
 
        };
        console.log(BJLValue);
        
        await BGData({ BJLValue });
        setShowTitle("Work Pass Bank Guarantee Info Saved Successfully")
        setNotification(true);
      }
      setNotification(true);
    } catch (error) {
      console.log(error);
      
      console.error("Error submitting data:", error);
      setNotification(true); // Optionally show an error notification
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
          label="Date Of Submission"
          register={register}
          name="bankSubmit"
          type="date"
          errors={errors}
        />
      <FormField
          label="Date Received"
          register={register}
          name="bankRece"
          type="date"
          errors={errors}
        />
      <FormField
          label="BG Reference Number"
          register={register}
          name="bankRefNo"
          type="text"
          errors={errors}
        />
      <FormField
          label="Bank Guarantee Amount"
          register={register}
          name="bankAmt"
          type="text"
          errors={errors}
        />
      <FormField
          label="Valid Until"
          register={register}
          name="bankValid"
          type="date"
          errors={errors}
        />
      <FormField
          label="Date Endorsement Of BG"
          register={register}
          name="bankEndorse"
          type="date"
          errors={errors}
        />
<div>
        <FileUploadField
          label="Upload File"
          onChangeFunc={(e) => handleFileChange(e, "bankEmpUpload")}
          register={register}
          error={errors}
          fileName={
            uploadedFileNames.bankEmpUpload ||
            extractFileName(watchInducBgUpload)
          }
        />
      </div>
        </div>
      {/* Submit Button */}
      <div className="flex justify-center items-center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
        {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/employee"
          />
        )}
      </div>
    </form>
  );
};
