import React, { useContext, useEffect, useRef, useState } from 'react';
import { GoUpload } from 'react-icons/go';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { JitpaEmpSchema } from '../../../services/EmployeeValidation'; 
import { SpinLogo } from '../../../utils/SpinLogo';
import { FileUploadField } from '../medicalDep/FileUploadField';
import { FormField } from '../../../utils/FormField';
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { UpdateJitpaFun } from '../../../services/updateMethod/UpdateJitpaFun';
import { DataSupply } from '../../../utils/DataStoredContext';
import { useOutletContext } from 'react-router-dom';

export const Jitpa = () => {
  const { searchResultData } = useOutletContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { BJLData } = useContext(DataSupply);
  const { UpdateJitpaData } = UpdateJitpaFun();
  const { register, handleSubmit, watch,formState: { errors }, setValue } = useForm({
    resolver: yupResolver(JitpaEmpSchema),
    tbaPurchase: [],
    jpValid: [],
    jpEndorse: [],
  });
  
  const [notification, setNotification] = useState(false);
  const [showTitle,setShowTitle]=useState("")
  const [jpPurchaseDta,setJpPurchaseDta]=useState("")
  const [jpValidation,setJpValidation]=useState("")
  const [jpEndorsement,setJpEndorsement]=useState("")

  const [uploadedFileNames, setUploadedFileNames] = useState({
    jpEmpUpload: null,
  });
  const [uploadjitpa, setUploadjitpa] = useState({
    jpEmpUpload: [],
  });

  const watchInducJitpaUpload = watch("jpEmpUpload", ""); 
  

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return ""; 
  };

  const jpPurDate = () => setJpPurchaseDta([...tbaPurchase, ""]);
  const jpValids = () => setJpValidation([...jpValid, ""]);
  const jpEndorsements = () => setJpEndorsement([...jpEndorse, ""]);

  const getFileName = (input) => {
    // Check if input is an object and has the 'upload' property
    if (typeof input === 'object' && input.upload) {
      const filePath = input.upload;  // Extract the 'upload' path
  
      // Decode the URL path
      const decodedUrl = decodeURIComponent(filePath);
  
      // Extract the file name from the path
      const fileNameWithExtension = decodedUrl.substring(
        decodedUrl.lastIndexOf("/") + 1
      );
  
      return fileNameWithExtension;
    }
  
    // If input is a string (URL), use the URL constructor
    try {
      const urlObj = new URL(input);  // Attempt to create a URL object
      const filePath = urlObj.pathname;  // Extract path from URL
  
      // Decode the URL path
      const decodedUrl = decodeURIComponent(filePath);
  
      // Extract the file name from the path
      const fileNameWithExtension = decodedUrl.substring(
        decodedUrl.lastIndexOf("/") + 1
      );
  
      return fileNameWithExtension;
    } catch (e) {
      // Handle invalid URL (fall back to file path processing if URL fails)
      if (typeof input === 'string') {
        const decodedUrl = decodeURIComponent(input);
        const fileNameWithExtension = decodedUrl.substring(
          decodedUrl.lastIndexOf("/") + 1
        );
        return fileNameWithExtension;
      }
  
      // If it's neither an object nor a valid URL string, return undefined or handle as needed
      return undefined;
    }
  };
  

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  useEffect(() => {
    setValue("empID", searchResultData.empID);
    const fields = ["tbaPurchase",
      "jitpaAmt",
      "jpValid",
      "jpEndorse",
      "jpEmpUpload"];
    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );
    if (searchResultData && searchResultData.jpEmpUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.jpEmpUpload);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
        console.log(parsedFiles);
        setValue("jpEmpUpload", parsedFiles);

        setUploadjitpa((prev) => ({
          ...prev,
          jpEmpUpload: parsedFiles, 
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          jpEmpUpload:
            parsedFiles.length > 0
              ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
              : "",
        }));
      } catch (error) {
        console.error(`Failed to parse ${searchResultData.jpEmpUpload}:`, error);
      }
    
    }
    
  }, [searchResultData, setValue]);

  const handleFileChange = async (e, label, empID) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!empID) {
      alert("Employee ID is required to upload files.");
      window.location.reload();
      return;
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
    }

    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);

    try {
      await uploadDocs(selectedFile, label, setUploadjitpa, empID);
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


    const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-CA') : null;
    const tbaPurchase = formatDate(data.tbaPurchase);
    const jpValid = formatDate(data.jpValid);
    const jpEndorse = formatDate(data.jpEndorse);

    try {
      let matchedEmployee = null;
      if (empID) {

        matchedEmployee = BJLData.find((val) => val.empID === empID);
  

        const updatedSubmissionDate = [
          ...new Set([
            ...(matchedEmployee.tbaPurchase || []), // ensure it's an array before spreading
            tbaPurchase
          ]),
        ];
  
        const updatedEndorseDate = [
          ...new Set([
            ...(matchedEmployee.jpEndorse || []), // ensure it's an array before spreading
              jpEndorse
          ]),
        ];
  
        const updatedValidDate = [
          ...new Set([
            ...(matchedEmployee.jpValid || []), // ensure it's an array before spreading
             jpValid
          ]),
        ];
   


      const JitpaValue = {
        ...data,
        jpValid:updatedValidDate.map(formatDate),
      tbaPurchase:updatedSubmissionDate.map(formatDate),
      jpEndorse:updatedEndorseDate.map(formatDate),
      jpEmpUpload: JSON.stringify(uploadjitpa.jpEmpUpload),
        id: matchedEmployee ? matchedEmployee.id : null,
      };

      
     

      await UpdateJitpaData({ JitpaValue });
      setShowTitle("Work Pass JITPA Info Data Stored Successfully")
        setNotification(true);
    } else {
      console.log("error")
    }
    } catch (error) {
      console.error("Error submitting data:", error);
   

     
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
          label="TBA Purchase Date"
          register={register}
          name="tbaPurchase"
          type="date"
          errors={errors}
        />
      <FormField
          label="JITPA Amount"
          register={register}
          name="jitpaAmt"
          type="text"
          errors={errors}
        />
      <FormField
          label="Valid Until"
          register={register}
          name="jpValid"
          type="date"
          errors={errors}
        />
      <FormField
          label="Date Endorsement Of Jitpa"
          register={register}
          name="jpEndorse"
          type="date"
          errors={errors}
        />
     <div>
        <FileUploadField
          label="Upload File"
          onChangeFunc={(e) => handleFileChange(e, "jpEmpUpload", empID)}
          name="jpEmpUpload"
          register={register}
          error={errors}
          fileName={
            uploadedFileNames.jpEmpUpload ||
            extractFileName(watchInducJitpaUpload)
          }        />
      </div>
        </div>


      {/* Submit Button */}
      <div className="flex justify-center items-center my-10">
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
