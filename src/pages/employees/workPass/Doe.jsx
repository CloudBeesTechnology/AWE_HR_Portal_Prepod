import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DoeEmpSchema } from "../../../services/EmployeeValidation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { UpdateDataFun } from "../../../services/updateMethod/UpdateSDNData";
import { FormField } from "../../../utils/FormField";
import { FileUploadField } from "../medicalDep/FileUploadField";
import { DataSupply } from "../../../utils/DataStoredContext";
import { useOutletContext } from "react-router-dom";
import { CreateDoe } from "../../../services/createMethod/CreateDoe";

export const Doe = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { searchResultData } = useOutletContext();
  const { DNData } = useContext(DataSupply);
  const { CrerDoeFunData } = CreateDoe();
  const { UpdateMPData } = UpdateDataFun();

 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(DoeEmpSchema),
    doeEmpSubmit: [],
    doeEmpApproval: [],
    doeEmpValid:[],  
  });
 
  const [dateOfSubmission, setDateOfSubmission] = useState([]);
  const [dateOfApproval, setDateOfApproval] = useState([]);
  const [validUntil, setValidUntil] = useState([]);
  const [notification, setNotification] = useState(false);
  const [showTitle,setShowTitle]=useState("")
  const [uploadedFileNames, setUploadedFileNames] = useState({
    doeEmpUpload: null,
  });
  const [uploadDoe, setUploadDoe] = useState({
    doeEmpUpload: [],
  });

  const watchInducDoeUpload = watch("doeEmpUpload", ""); 
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
    setValue("empID", searchResultData.empID);
    const fields = ["doeEmpSubmit","doeEmpApproval","doeEmpValid","doeEmpRefNo"];
    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );
    if (searchResultData && searchResultData.doeEmpUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.doeEmpUpload);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
        // console.log(parsedFiles);
        setValue("doeEmpUpload", parsedFiles);

        setUploadDoe((prev) => ({
          ...prev,
          doeEmpUpload: parsedFiles, 
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          doeEmpUpload:
            parsedFiles.length > 0
              ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
              : "",
        }));
      } catch (error) {
        console.error(`Failed to parse ${searchResultData.doeEmpUpload}:`, error);
      }
    
    }
    
  }, [searchResultData, setValue]);

  const handleFileChange = async (e, label, empID) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
    ];

        // Check for empID before proceeding with the upload
  if (!empID) {
    alert("Employee ID is required to upload files.");
    window.location.reload()
    return;
  }

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file");
      return;
    }

    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);

    try {
      await uploadDocs(selectedFile, label, setUploadDoe, empID);
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
    const checkingEIDTable = DNData.find((match) => match.empID === data.empID);
    
    // Helper function to format dates
    const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-CA') : null; // 'en-CA' gives yyyy-mm-dd format
    
    // Format each date individually
    const doeEmpSubmit = formatDate(data.doeEmpSubmit);
    const doeEmpApproval = formatDate(data.doeEmpApproval);
    const doeEmpValid = formatDate(data.doeEmpValid);

    if (checkingEIDTable) {
      // If entry exists, update the dates, removing duplicates
      const updatedSubmissionDate = [
        ...new Set([
          ...(checkingEIDTable.doeEmpSubmit || []), // ensure it's an array before spreading
          doeEmpSubmit
        ]),
      ];

      const updatedApprovalDate = [
        ...new Set([
          ...(checkingEIDTable.doeEmpApproval || []), // ensure it's an array before spreading
          doeEmpApproval
        ]),
      ];

      const updatedValidDate = [
        ...new Set([
          ...(checkingEIDTable.doeEmpValid || []), // ensure it's an array before spreading
          doeEmpValid
        ]),
      ];

      const DoeUpValue = {
        ...data,
        doeEmpSubmit: updatedSubmissionDate.map(formatDate), 
        doeEmpApproval: updatedApprovalDate.map(formatDate), // Apply formatDate to each item
        doeEmpValid: updatedValidDate.map(formatDate), // Apply formatDate to each item
        doeEmpUpload: JSON.stringify(uploadDoe.doeEmpUpload), // Ensure this is properly set
        id: checkingEIDTable.id,
      };


      await UpdateMPData({ DoeUpValue });
      setShowTitle("DOE Info Updated Successfully");
      setNotification(true);
    } else {
      // If no entry exists, create new data
      const DoeValue = {
        ...data,
        doeEmpSubmit,
        doeEmpApproval,    
        doeEmpValid,
        doeEmpUpload: JSON.stringify(uploadDoe.doeEmpUpload),
      };

      await CrerDoeFunData({ DoeValue });
      setShowTitle("DOE Info Created Successfully");
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

      <div className="grid grid-cols-2 mt-10 gap-5 ">
        <FormField
          label="Date Of Submission"
          register={register}
          name="doeEmpSubmit"
          type="date"
          errors={errors}
        />
        <FormField
          label="Date Of Approval"
          register={register}
          name="doeEmpApproval"
          type="date"
          errors={errors}
        />
        <FormField
          label="Valid Until"
          register={register}
          name="doeEmpValid"
          type="date"
          errors={errors}
        />
        <FormField
          label="DOE Reference Number"
          register={register}
          name="doeEmpRefNo"
          type="text"
          errors={errors}
        />
        <FileUploadField
          label="Upload File"
          onChangeFunc={(e) => handleFileChange(e, "doeEmpUpload", empID)}
          name="doeEmpUpload"
          register={register}
          error={errors}
          fileName={
            uploadedFileNames.doeEmpUpload ||
            extractFileName(watchInducDoeUpload)
          }
        />
      </div>
      <div className="flex justify-center items-center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>
      {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/sawp/doe"
          />
        )}
    </form>
  );
};
