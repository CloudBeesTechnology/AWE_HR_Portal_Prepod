import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { JitpaEmpSchema } from "../../../services/EmployeeValidation";
import { SpinLogo } from "../../../utils/SpinLogo";
import { FileUploadField } from "../medicalDep/FileUploadField";
import { FormField } from "../../../utils/FormField";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { UpdateJitpaFun } from "../../../services/updateMethod/UpdateJitpaFun";
import { FileUploadNew } from "../medicalDep/FileUploadField";
import { DataSupply } from "../../../utils/DataStoredContext";
import { useOutletContext } from "react-router-dom";
import { JitpaCreFun } from "../../../services/createMethod/JitpaCreFun";
// import { handleDeleteFile } from "../../../services/uploadDocsS3/DeleteBJLUp";

export const Jitpa = () => {
  const { searchResultData } = useOutletContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  const { BJLData } = useContext(DataSupply);
  const { UpdateJitpaData } = UpdateJitpaFun();
  const { JitpaCreData } = JitpaCreFun();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(JitpaEmpSchema),
    // tbaPurchase: [],
    // jpValid: [],
    // jpEndorse: [],
  });

  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  // const [jpPurchaseDta,setJpPurchaseDta]=useState("")
  // const [jpValidation,setJpValidation]=useState("")
  // const [jpEndorsement,setJpEndorsement]=useState("")

  const [uploadedFileNames, setUploadedFileNames] = useState({
    jpEmpUpload: null,
  });
  const [uploadjitpa, setUploadjitpa] = useState({
    jpEmpUpload: [],
  });

  // const [id, setID] = useState({
  //   jitpaID: "",
  // });

  const watchInducJitpaUpload = watch("jpEmpUpload", "");

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return "";
  };

  const getFileName = (input) => {
    // Check if input is an object and has the 'upload' property
    if (typeof input === "object" && input.upload) {
      const filePath = input.upload; // Extract the 'upload' path

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
      const urlObj = new URL(input); // Attempt to create a URL object
      const filePath = urlObj.pathname; // Extract path from URL

      // Decode the URL path
      const decodedUrl = decodeURIComponent(filePath);

      // Extract the file name from the path
      const fileNameWithExtension = decodedUrl.substring(
        decodedUrl.lastIndexOf("/") + 1
      );

      return fileNameWithExtension;
    } catch (e) {
      // Handle invalid URL (fall back to file path processing if URL fails)
      if (typeof input === "string") {
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
     
    ];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file");
      return;
    }

    // Fetch current files (including backend-stored ones)
    const currentFiles = watch(label) || []; // React Hook Form state

    // Count only newly uploaded files, ignoring backend-stored files
    let newUploads = []; // Declare it outside the if block to access later
    if (Array.isArray(currentFiles)) {
      newUploads = currentFiles.filter(file => file instanceof File);
    }
    
    if (newUploads.length > 0) {
      alert("You can only upload one new file");
      return;
    }
  

    // Append the new file to the form state
    setValue(label, [...currentFiles, selectedFile]);

    try {
      await uploadDocs(selectedFile, label, setUploadjitpa, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setValue("empID", searchResultData.empID);
    const fields = [
      "tbaPurchase",
      "jitpaAmt",
      "jpValid",
      "jpEndorse",
      "jpEmpUpload",
    ];
    fields.forEach((field) =>
      setValue(field, getLastValue(searchResultData[field]))
    );

    // const jitpaRecord = BJLData.find(
    //   (match) => match.empID === searchResultData.empID
    // );
    // if (jitpaRecord) {
    //   setID((prevData) => ({
    //     ...prevData,
    //     jitpaID: jitpaRecord.id,
    //   }));
    // }

    if (searchResultData && searchResultData.jpEmpUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.jpEmpUpload);

        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );
        setValue("jpEmpUpload", parsedFiles);

        setUploadjitpa((prev) => ({
          ...prev,
          jpEmpUpload: parsedFiles,
        }));

        setUploadedFileNames((prev) => ({
          ...prev,
          jpEmpUpload: parsedFiles.map((file) => getFileName(file.upload)),
        }));
      } catch (error) {
        console.error(
          `Failed to parse ${searchResultData.jpEmpUpload}:`,
          error
        );
      }
    }
  }, [searchResultData, setValue]);

  // const deleteFile = async (fileType, fileName) => {
  //   const deleteID = id.jitpaID;

  //   try {
  //     await handleDeleteFile(
  //       fileType,
  //       fileName,
  //       empID,
  //       setUploadedFileNames,
  //       deleteID,
  //       setValue
  //     );

  //     const currentFiles = watch(fileType) || [];

  //     // Filter out the deleted file
  //     const updatedFiles = currentFiles.filter(
  //       (file) => file.name !== fileName
  //     );

  //     // Update form state with the new file list
  //     setValue(fileType, updatedFiles);

  //     // Update UI state
  //     setUploadjitpa((prevState) => ({
  //       ...prevState,
  //       [fileType]: updatedFiles,
  //     }));
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //   }
  // };

  const empID = watch("empID");

  const onSubmit = async (data) => {
    // console.log(data);

    try {
      const matchedEmployee = BJLData.find(
        (match) => match.empID === data.empID
      );

      const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-CA") : null; // 'en-CA' gives yyyy-mm-dd format
      const tbaPurchase = formatDate(data.tbaPurchase);
      const jpValid = formatDate(data.jpValid);
      const jpEndorse = formatDate(data.jpEndorse);

      if (matchedEmployee) {
        const updatedSubmissionDate = [
          ...new Set([
            ...(matchedEmployee.tbaPurchase || []), // ensure it's an array before spreading
            tbaPurchase,
          ]),
        ];

        const updatedEndorseDate = [
          ...new Set([
            ...(matchedEmployee.jpEndorse || []), // ensure it's an array before spreading
            jpEndorse,
          ]),
        ];

        const updatedValidDate = [
          ...new Set([
            ...(matchedEmployee.jpValid || []), // ensure it's an array before spreading
            jpValid,
          ]),
        ];

        const JitpaValue = {
          ...data,
          jpValid: updatedValidDate.map(formatDate),
          tbaPurchase: updatedSubmissionDate.map(formatDate),
          jpEndorse: updatedEndorseDate.map(formatDate),
          jpEmpUpload: JSON.stringify(uploadjitpa.jpEmpUpload),
          id: matchedEmployee.id,
        };

        await UpdateJitpaData({ JitpaValue });
        setShowTitle("JITPA Info Stored Successfully");
        setNotification(true);
      } else {
        const creJitpaValue = {
          ...data,
          jpValid,
          tbaPurchase,
          jpEndorse,
          jpEmpUpload: JSON.stringify(uploadjitpa.jpEmpUpload),
        };
        // console.log(creJitpaValue);

        await JitpaCreData({ creJitpaValue });
        setShowTitle("JITPA Info Saved Successfully");
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
          label="Date Endorsement Of JITPA"
          register={register}
          name="jpEndorse"
          type="date"
          errors={errors}
        />
        <div>
          <FileUploadNew
            label="Upload File"
            onChangeFunc={(e) => handleFileChange(e, "jpEmpUpload", empID)}
            name="jpEmpUpload"
            register={register}
            error={errors.jpEmpUpload}
            fileName={
              uploadedFileNames.jpEmpUpload ||
              extractFileName(watchInducJitpaUpload)
            }
            uploadedFileNames={uploadedFileNames}
            // deleteFile={deleteFile}
            field={{ title: "jpEmpUpload" }}
          />
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
          path="/sawp/jitpa"
        />
      )}
    </form>
  );
};
