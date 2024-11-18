import React, { useContext, useEffect, useState } from "react";
import { GoUpload } from "react-icons/go";
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
  });

  const [notification, setNotification] = useState(false);
  const [showTitle,setShowTitle]=useState("")
  const [uploadedFileNames, setUploadedFileNames] = useState({
    doeEmpUpload: null,
  });
  const [uploadDoe, setUploadDoe] = useState({
    doeEmpUpload: [],
  });

  const watchInducDoeUpload = watch("doeEmpUpload", ""); 

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
        console.log(parsedFiles);
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
      await uploadDocs(selectedFile, label, setUploadDoe);
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
      console.log("Form Data:", data);
      console.log("uploadSawp state:", uploadDoe);

      const checkingEIDTable = DNData.find((match) => match.empID === data.empID);
      const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-CA') : null; // 'en-CA' gives yyyy-mm-dd format
   
    const doeEmpSubmit = formatDate(data.doeEmpSubmit);
    const doeEmpApproval = formatDate(data.doeEmpApproval);
    const doeEmpValid = formatDate(data.doeEmpValid);

      if (checkingEIDTable) {
        const DoeUpValue = {
          ...data,
          doeEmpSubmit,
          doeEmpApproval,
          doeEmpValid,
          doeEmpUpload: JSON.stringify(uploadDoe.doeEmpUpload),
          id: checkingEIDTable.id,
        };
console.log("Update Doe Data:",DoeUpValue);

        await UpdateMPData({ DoeUpValue });
        setShowTitle("Work Pass DOE Info Update Successfully")
        setNotification(true);
      } else {
        const DoeValue = {
          ...data,
          doeEmpSubmit,
          doeEmpApproval,
          doeEmpValid,
          doeEmpUpload: JSON.stringify(uploadDoe.doeEmpUpload),
        };
        console.log("Create Doe Data: ",DoeValue);
        
        await CrerDoeFunData({ DoeValue });
        setShowTitle("Work Pass Doe Info  Saved successfully")
        setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setNotification(true); // Optionally show an error notification
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
          onChangeFunc={(e) => handleFileChange(e, "doeEmpUpload")}
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
            path="/employee"
          />
        )}
    </form>
  );
};
