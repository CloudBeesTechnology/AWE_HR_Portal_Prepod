import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SawpEmpSchema } from "../../../services/EmployeeValidation";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { SawpDataFun } from "../../../services/createMethod/SawpDataFun";
import { FormField } from "../../../utils/FormField";
import { FileUploadField } from "../medicalDep/FileUploadField";
import { SawpUpdate } from "../../../services/updateMethod/SawpUpdate";
import { useOutletContext } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
import { SpinLogo } from "../../../utils/SpinLogo";

export const Sawp = () => {
  const { searchResultData } = useOutletContext();
  const { SubmitMPData } = SawpDataFun();
  const { SawpDetails } = useContext(DataSupply);
  const { SawpUpdateFun } = SawpUpdate();
  const [notification, setNotification] = useState(false);
  const [showTitle,setShowTitle]=useState("")
  const [uploadedFileNames, setUploadedFileNames] = useState({
    sawpEmpUpload: null,
  });
  const [uploadSawp, setUploadSawp] = useState({
    sawpEmpUpload: [], // Will store the uploaded file URL
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SawpEmpSchema),
  });

  
  const watchInducSwapUpload = watch("sawpEmpUpload", ""); // Watch the sawpEmpUpload field

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
    const fields = ["sawpEmpLtrReci", "sawpEmpLtrReq"];
    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );
    if (searchResultData && searchResultData.sawpEmpUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.sawpEmpUpload);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
        console.log(parsedFiles);
        setValue("sawpEmpUpload", parsedFiles);

        setUploadSawp((prev) => ({
          ...prev,
          sawpEmpUpload: parsedFiles, 
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          sawpEmpUpload:
            parsedFiles.length > 0
              ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
              : "",
        }));
      } catch (error) {
        console.error(`Failed to parse ${searchResultData.sawpEmpUpload}:`, error);
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
      await uploadDocs(selectedFile, label, setUploadSawp);
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
      console.log("uploadSawp state:", uploadSawp);

      const checkingEIDTable = SawpDetails.find(
        (match) => match.empID === data.empID
      );
      // Format dates
      const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-CA") : null;
      const sawpEmpLtrReq = formatDate(data.sawpEmpLtrReq);
      const sawpEmpLtrReci = formatDate(data.sawpEmpLtrReci);

      if (checkingEIDTable) {
        const SawpUpValue = {
          ...data,
          sawpEmpLtrReq,
          sawpEmpLtrReci,
          sawpEmpUpload: JSON.stringify(uploadSawp.sawpEmpUpload), // Use the uploaded URL
          id: checkingEIDTable.id,
        };
        console.log("Updating data:", SawpUpValue);
        await SawpUpdateFun({ SawpUpValue });
        setShowTitle("Work Pass SAWP Info Upload Successfully")
        setNotification(true);
      } else {
        const SawpValue = {
          ...data,
          sawpEmpLtrReq,
          sawpEmpLtrReci,
          sawpEmpUpload: JSON.stringify(uploadSawp.sawpEmpUpload), // Use the uploaded URL
        };
        console.log("Creating new data:", SawpValue);
        await SubmitMPData({ SawpValue });
        setShowTitle("Work Pass SAWP Info Saved Successfully")
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
      <div className="grid grid-cols-2 my-10 gap-5">
        <FormField
          label="Client Support Letter Requested Date"
          register={register}
          name="sawpEmpLtrReq"
          type="date"
          errors={errors}
        />
        <FormField
          label="Client Support Letter Received Date"
          register={register}
          name="sawpEmpLtrReci"
          type="date"
          errors={errors}
        />
      </div>
      <FileUploadField
        label="Upload File"
        onChangeFunc={(e) => handleFileChange(e, "sawpEmpUpload")}
        register={register}
        name="sawpEmpUpload"
        error={errors}
        fileName={
          uploadedFileNames.sawpEmpUpload ||
          extractFileName(watchInducSwapUpload)
        }
      />

      <div className="center">
        <button type="submit" className="mt-10 py-2 px-4 primary_btn">
          Submit
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
