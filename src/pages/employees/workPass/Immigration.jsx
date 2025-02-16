import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ImmigEmpSchema } from '../../../services/EmployeeValidation'; 
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { SpinLogo } from '../../../utils/SpinLogo';
import { FileUploadNew } from '../medicalDep/FileUploadField';
import { FormField } from '../../../utils/FormField';
import { ImmigrationFun } from '../../../services/createMethod/ImmigrationFun';
import { useOutletContext } from 'react-router-dom';
import { DataSupply } from '../../../utils/DataStoredContext';
import { useContext } from 'react';
import { UpdateImmigra } from '../../../services/updateMethod/UpdateImmigra';
// import { handleDeleteFile } from "../../../services/uploadDocsS3/DeleteImmiUpload";

export const Immigration = () => {
  const { searchResultData } = useOutletContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { ImmigrationData } = ImmigrationFun();
  const { PPValidsData } = useContext(DataSupply);
  const { UpdateImmigraData } = UpdateImmigra();

  const { register, handleSubmit , watch, trigger, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(ImmigEmpSchema),
    arrivStampExp: [],
    empPassExp: [],
    immigApproval: [],
    ppSubmit: [],
    reEntryVisaExp: [],
  });
  
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle]=useState("")

  const [uploadedFileNames, setUploadedFileNames] = useState({
    arrivStampUpload: null,
    immigEmpUpload: null,
    reEntryUpload: null,
  });
  const [uploadedImmigrate, setUploadedImmigrate] = useState({
    arrivStampUpload: [],
    immigEmpUpload: [],
    reEntryUpload: [],
  });
  // const [id, setID] = useState({immigrationID:"",});

  const watchInducImmUpAS = watch("arrivStampUpload", ""); // Watch the arrivStampUpload field
  const watchInducImmUpIE = watch("immigEmpUpload", ""); // Watch the arrivStampUpload field
  const watchInducImmUpRE = watch("reEntryUpload", ""); // Watch the arrivStampUpload field
  const empID = watch("empID");

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return ""; 
  };



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

    if (!searchResultData) return;

  // const immiRecord = PPValidsData.find((match) => match.empID === searchResultData.empID);
  
  // if (immiRecord) {
  //   setID((prevData) => ({
  //     ...prevData,
  //     immigrationID: immiRecord.id, // Ensure this field exists in SRData.
  //   }));
  // }

    setValue("empID", searchResultData.empID);
    const field = [ "ppLocation","arrivStampUpload","immigEmpUpload","reEntryUpload","arrivStampExp",
      "immigRefNo","ppSubmit","empPassExp","empPassStatus","airTktStatus","reEntryVisa","immigApproval",
      "reEntryVisaExp","remarkImmig"];
    field.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );
  
    const parseUploadField = (field) => {
      if (searchResultData && searchResultData[field]) {
        try {
          const parsedArray = JSON.parse(searchResultData[field]);
  
          const parsedFiles = parsedArray.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          );
          setValue(field, parsedFiles);
  
          setUploadedImmigrate((prev) => ({
            ...prev,
            [field]: parsedFiles,
          }));
  
          setUploadedFileNames((prev) => ({
            ...prev,
            [field]:
            parsedFiles.map((file) => getFileName(file.upload)), // Get names of all files
       
          }));
        } catch (error) {
          console.error(`Failed to parse ${searchResultData[field]}:`, error);
        }
      }
    };
  
    parseUploadField("arrivStampUpload");
    parseUploadField("immigEmpUpload");
    parseUploadField("reEntryUpload");
  }, [searchResultData, setValue]);
  
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
  
    // Ensure the file was not previously deleted
    // if (deletedFiles[label]?.includes(selectedFile.name)) {
    //   alert("This file was previously deleted and cannot be re-added.");
    //   return;
    // }
  
    // Append the new file to the form state
    setValue(label, [...currentFiles, selectedFile]);
  
    try {
      await uploadDocs(selectedFile, label, setUploadedImmigrate, watchedEmpID);
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
  //   const immigrationID = id.immigrationID;

  //   try {
  //     await handleDeleteFile(
  //       fileType,
  //       fileName,
  //       watchedEmpID,
  //       setUploadedFileNames,
  //       setValue,
  //       trigger,
  //       immigrationID
  //     );
  //     const currentFiles = watch(fileType) || []; 
  //     // Filter out the deleted file
  //     const updatedFiles = currentFiles.filter(
  //       (file) => file.name !== fileName
  //     );
  //     // Update form state with the new file list
  //     setValue(fileType, updatedFiles);

  //     // Update UI state
  //     setUploadedImmigrate((prevState) => ({
  //       ...prevState,
  //       [fileType]: updatedFiles,
  //     }));
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //   }
  // };

  const onSubmit = async (data) => {    
    try {
      const checkingEIDTable = PPValidsData.find((match) => match.empID === data.empID);
      
    const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-CA') : null; // 'en-CA' gives yyyy-mm-dd format
    
    const arrivStampExp = formatDate(data.arrivStampExp);
    const ppSubmit = formatDate(data.ppSubmit);
    const empPassExp = formatDate(data.empPassExp);
    const immigApproval = formatDate(data.immigApproval);
    const reEntryVisaExp = formatDate(data.reEntryVisaExp);


      if (checkingEIDTable) {

        const updatedArrivedDate = [
          ...new Set([
            ...(checkingEIDTable.arrivStampExp || []), // ensure it's an array before spreading
            arrivStampExp
          ]),
        ];

        const updatedPassportSubmit = [
          ...new Set([
            ...(checkingEIDTable.ppSubmit || []),
            ppSubmit
          ])
        ];

        const updatedPassportExpiry = [
          ...new Set([
            ...(checkingEIDTable.empPassExp || []),
            empPassExp

          ])
        ]

        const updatedImmigration = [
          ...new Set([
            ...(checkingEIDTable.immigApproval || []),
            immigApproval
          ])
        ]

        const updatedReEntry = [
          ...new Set([
            ...(checkingEIDTable.reEntryVisaExp || []),
            reEntryVisaExp
          ])
        ]

        const UpImmiValue = {
          ...data,
          immigRefNo:"IMMBD/1382",
          arrivStampExp: updatedArrivedDate.map(formatDate),
          ppSubmit: updatedPassportSubmit.map(formatDate),
          empPassExp: updatedPassportExpiry.map(formatDate),
          immigApproval: updatedImmigration.map(formatDate),
          reEntryVisaExp: updatedReEntry.map(formatDate),
          arrivStampUpload: JSON.stringify(uploadedImmigrate.arrivStampUpload), // Use the uploaded URL
          immigEmpUpload: JSON.stringify(uploadedImmigrate.immigEmpUpload), 
          reEntryUpload: JSON.stringify(uploadedImmigrate.reEntryUpload), 
          id: checkingEIDTable.id,
        };
      
        await UpdateImmigraData({ UpImmiValue });
        setShowTitle("Immigration Info Updated successfully")
        setNotification(true);
      } else {
        const ImmiValue = {
          ...data,
          immigRefNo:"IMMBD/1382",
          arrivStampExp,
          ppSubmit,
          empPassExp,
          immigApproval,
          reEntryVisaExp,
          arrivStampUpload: JSON.stringify(uploadedImmigrate.arrivStampUpload), // Use the uploaded URL
          immigEmpUpload: JSON.stringify(uploadedImmigrate.immigEmpUpload), 
          reEntryUpload: JSON.stringify(uploadedImmigrate.reEntryUpload),
        };
        
        await ImmigrationData({ ImmiValue }); 
        setShowTitle("Immigration Info Saved Successfully")
        setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      
    }
  };

  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-h-screen p-2 my-10 bg-[#F5F6F1CC]"
    >
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

   

      <div className="grid grid-cols-3 mt-10 gap-5">

      <div className="  ">
        <label className="mb-1 text_size_6">Original Passport Location</label>
        <select
          {...register("ppLocation")}
          className="input-field select-custom"
        >
          <option value=""></option>
          <option value="HRD">HRD</option>
          <option value="Immigration">Immigration</option>
          <option value="Employee">Employee</option>
          <option value="Vacation">Vacation</option>
        </select>
        {errors.ppLocation && <p className="text-[red] text-[13px] mt-1">{errors.ppLocation.message}</p>}
      </div>

      <FormField
          label="Date Of Arrival Stamping Expiry"
          register={register}
          name="arrivStampExp"
          type="date"
          errors={errors}
        />
        <FileUploadNew
          label="Upload File"
          onChangeFunc={(e) => handleFileChange(e, "arrivStampUpload")}
          name="arrivStampUpload"
          register={register}
          error={errors}
          fileName={
            uploadedFileNames.arrivStampUpload || "" 
            // extractFileName(watchInducImmUpAS)
          }  
          uploadedFileNames={uploadedFileNames}
          // deleteFile={deleteFile}

          field={{ title: "arrivStampUpload" }}
       
          />
      </div> 

      <hr className='text-lite_grey mt-7'/>

      <div className="grid grid-cols-2 mt-10 gap-5">


      <FormField
          label="Immigration Reference Number"
          register={register}
          name="immigRefNo"
          value="IMMBD/1382"
          type="text"
          errors={errors}
        />
      <FormField
          label="Passport Submit Date To Immigration Dept"
          register={register}
          name="ppSubmit"
          type="date"
          errors={errors}
        />
      <FormField
          label="Employment Pass Expiry"
          register={register}
          name="empPassExp"
          type="date"
          errors={errors}
        />
      <FormField
          label="Employment Pass Status"
          register={register}
          name="empPassStatus"
          type="text"
          errors={errors}
        />     
        <FileUploadNew
          label="Upload File"
          onChangeFunc={(e) => handleFileChange(e, "immigEmpUpload")}
          register={register}
          name="immigEmpUpload"
          error={errors}
          fileName={
            uploadedFileNames.immigEmpUpload ||
""          } 
          uploadedFileNames={uploadedFileNames}
          // deleteFile={deleteFile}
          field={{ title: "immigEmpUpload" }}
       
          />

      </div> 
<hr className='text-lite_grey mt-5'/>
 <div className="grid grid-cols-2 mt-10 gap-5 ">
 <div className="form-group">
          <label className='mb-1 text_size_6 '>Air Ticket Status</label>
          <select 
          {...register("airTktStatus")} 
          className="input-field select-custom">
            <option value=""></option>
            <option value="Company">Company</option>
            <option value="Own">Own</option>
          </select>
          {errors. airTktStatus && <p className="text-[red] text-[13px] mt-1">{errors. airTktStatus.message}</p>}
        </div>
     <div className="form-group">
          <label className='mb-1 text_size_6'>Re-entry Visa Application</label>
          <select 
          {...register("reEntryVisa")}
           className="input-field select-custom">
            <option value=""></option>
            <option value="Single">Single</option>
            <option value="Multiple">Multiple</option>
          </select>
          {errors.reEntryVisa && <p className="text-[red] text-[13px] mt-1">{errors.reEntryVisa.message}</p>}
        </div>


        <FormField
          label="Date Approved by Immigration Dept"
          register={register}
          name="immigApproval"
          type="date"
          errors={errors}
        />
      <FormField
          label="Re-Entry Visa Expiry"
          register={register}
          name="reEntryVisaExp"
          type="date"
          errors={errors}
        />
        
        <FileUploadNew
          label="Upload File"
          onChangeFunc={(e) => handleFileChange(e, "reEntryUpload")}
          register={register}
          name="reEntryUpload"
          error={errors}
          fileName={
            uploadedFileNames.reEntryUpload ||
""          }  
          uploadedFileNames={uploadedFileNames}
          // deleteFile={deleteFile} 
          field={{ title: "reEntryUpload" }}
          />
       
      
        </div>

        <div className="mt-5">
          <label className='mb-1 text_size_6'>Remarks for Immigration</label>
          <textarea 
          {...register("remarkImmig")} 
          className="resize-none w-full  p-2 mt-1 border bg-lite_skyBlue border-lite_grey rounded-md outline-none"  rows="4"></textarea>
          {errors.remarkImmig && <p className="text-[red] text-[13px] mt-1">{errors.remarkImmig.message}</p>}
        </div>


      {/* Submit Button */}
      <div className="center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>    
      {/* Notifications */}
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/sawp/immigration"
        />
      )}
    </form>
  );
};