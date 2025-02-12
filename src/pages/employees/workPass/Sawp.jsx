import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SawpEmpSchema } from "../../../services/EmployeeValidation";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { SawpDataFun } from "../../../services/createMethod/SawpDataFun";
import { FormField } from "../../../utils/FormField";
import { FileUploadNew } from "../medicalDep/FileUploadField";
import { SawpUpdate } from "../../../services/updateMethod/SawpUpdate";
import { useOutletContext } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
import { SpinLogo } from "../../../utils/SpinLogo";
// import { handleDeleteFile } from "../../../services/uploadDocsS3/DeleteSawpUp";

export const Sawp = () => {
  const { searchResultData } = useOutletContext();
  const { SubmitMPData } = SawpDataFun();
  const { SawpDetails } = useContext(DataSupply);
  const { SawpUpdateFun } = SawpUpdate();
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [requestDate, setRequestDate] = useState([]);
  const [recivedDate, setRecivedDate] = useState([]);
  const [empId, setEmpID] = useState("");
  const [uploadedFileNames, setUploadedFileNames] = useState({
    sawpEmpUpload: null,
  });
  const [uploadSawp, setUploadSawp] = useState({
    sawpEmpUpload: [],
  });
  // const [id, setID] = useState({
  //   sawpID:"",
  // });
  const [fieldTitle, setFieldTitle] = useState("sawpEmpUpload");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SawpEmpSchema),
    defaultValues: {
      sawpEmpLtrReq: [],
      sawpEmpLtrReci: [],
    },
  });

  const contractTypes = watch("sawpEmpLtrReq");
  const contractTypes1 = watch("sawpEmpLtrReci");
  const empID = watch("empID");
  const watchInducSwapUpload = watch("sawpEmpUpload", "");

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop();
    }
    return "";
  };

  const getFileName = (input) => {
    if (typeof input === "object" && input.upload) {
      const filePath = input.upload;
      const decodedUrl = decodeURIComponent(filePath);
      return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
    }

    try {
      const urlObj = new URL(input);
      const filePath = urlObj.pathname;
      const decodedUrl = decodeURIComponent(filePath);
      return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
    } catch (e) {
      if (typeof input === "string") {
        const decodedUrl = decodeURIComponent(input);
        return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
      }
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
  
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
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
      alert("You can only upload one new file. Please delete the existing file before uploading another.");
      return;
    }
    
  
    // Append the new file to the form state
    setValue(label, [...currentFiles, selectedFile]);
  
    try {
      await uploadDocs(selectedFile, label, setUploadSawp, watchedEmpID);
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
    setValue("sawpEmpLtrReq", searchResultData.sawpEmpLtrReq || []);
    setRequestDate(searchResultData.sawpEmpLtrReq || []);
    setValue("sawpEmpLtrReci", searchResultData.sawpEmpLtrReci || []);
    setRecivedDate(searchResultData.sawpEmpLtrReci || []);

    const fields = ["sawpEmpLtrReci", "sawpEmpLtrReq","sawpEmpUpload"];
    fields.forEach((field) => {
      const value = getLastValue(searchResultData[field], field);
      setValue(field, value);
    });

    // const sawpRecord = SawpDetails.find((match) => match.empID === searchResultData.empID);
    // if (sawpRecord) {
    //   setID((prevData) => ({
    //     ...prevData,
    //     sawpID: sawpRecord.id, // Assuming this field exists.
    //   }))}

    if (searchResultData && searchResultData.sawpEmpUpload) {
      try {
        const parsedArray = JSON.parse(searchResultData.sawpEmpUpload);
        const parsedFiles = parsedArray.map((item) =>
          typeof item === "string" ? JSON.parse(item) : item
        );

        setValue("sawpEmpUpload", parsedFiles); // Set parsed files to the form

        setEmpID(searchResultData.empID);
        setUploadSawp((prev) => ({
          ...prev,
          sawpEmpUpload: parsedFiles,
        }));

        // Set all file names, not just the last one
        setUploadedFileNames((prev) => ({
          ...prev,
          sawpEmpUpload: parsedFiles.map((file) => getFileName(file.upload)), // Get names of all files
        }));
      } catch (error) {
        console.error(`Failed to parse ${searchResultData.sawpEmpUpload}:`, error);
      }
    }
  }, [searchResultData, setValue]);

  // console.log(searchResultData);
  

  // const deleteFile = async (fileType, fileName) => {
  //   const deleteID = id.sawpID; // Assuming this comes from your searchResultData object

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
  //     setUploadSawp((prevState) => ({
  //       ...prevState,
  //       [fileType]: updatedFiles,
  //     }));
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      const checkingEIDTable = SawpDetails
        ? SawpDetails.find((match) => match.empID === data.empID)
        : {};

      const formatDate = (date) => (date ? new Date(date).toLocaleDateString("en-CA") : null);
      const sawpEmpLtrReq = formatDate(data.sawpEmpLtrReq);
      const sawpEmpLtrReci = formatDate(data.sawpEmpLtrReci);

      if (checkingEIDTable) {
        const updatedReqDate = [
          ...new Set([...(checkingEIDTable.sawpEmpLtrReq || []), sawpEmpLtrReq]),
        ];

        const updatedReciDate = [
          ...new Set([...(checkingEIDTable.sawpEmpLtrReci || []), sawpEmpLtrReci]),
        ];

        const SawpUpValue = {
          ...data,
          sawpEmpLtrReq: updatedReqDate.map(formatDate),
          sawpEmpLtrReci: updatedReciDate.map(formatDate),
          sawpEmpUpload: JSON.stringify(uploadSawp.sawpEmpUpload),
          id: checkingEIDTable.id,
        };

        await SawpUpdateFun({ SawpUpValue });
        setShowTitle("SAWP Info Updated Successfully");
        setNotification(true);
      } else {
        const SawpValue = {
          ...data,
          sawpEmpLtrReq,
          sawpEmpLtrReci,
          sawpEmpUpload: JSON.stringify(uploadSawp.sawpEmpUpload),
        };

        await SubmitMPData({ SawpValue });
        setShowTitle("SAWP Info Created Successfully");
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
            watch={empID}
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
          control={control}
          watch={contractTypes}
        />
        <FormField
          label="Client Support Letter Received Date"
          register={register}
          name="sawpEmpLtrReci"
          type="date"
          errors={errors}
          control={control}
          watch={contractTypes1}
        />
      </div>

      <FileUploadNew
        label="Upload File"
        onChangeFunc={(e) => handleFileChange(e, "sawpEmpUpload")}
        register={register}
        name="sawpEmpUpload"
        error={errors.sawpEmpUpload}
        fileName={uploadedFileNames.sawpEmpUpload || ""}
        uploadedFileNames={uploadedFileNames}
        // deleteFile={deleteFile}
        field={{ title: "sawpEmpUpload" }}
      />

      <div className="center">
        <button type="submit" className="mt-10 py-2 px-4 primary_btn">
          Save
        </button>
      </div>

      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/sawp"
        />
      )}
    </form>
  );
};

