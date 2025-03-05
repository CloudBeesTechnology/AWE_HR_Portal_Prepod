import React, { useContext, useEffect, useRef, useState } from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { DependentInsuranceSchema } from "../../../services/EmployeeValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  claimUploadDocs,
  uploadDocs,
  uploadDocString,
} from "../../../services/uploadsDocsS3/UploadDocs";
import { DependSecondFile } from "./DependSecondFile";
import { DependFirstFile } from "./DependFirstFile";
import { DependInsDataFun } from "../../../services/createMethod/DependInsDataFun";
import { SpinLogo } from "../../../utils/SpinLogo";
import { useOutletContext } from "react-router-dom";
import { UpdateDepInsDataFun } from "../../../services/updateMethod/UpdateDepInsurance";
import { DataSupply } from "../../../utils/DataStoredContext";
import { FormField } from "../../../utils/FormField";
import { FileUploadField, FileUploadNew } from "../medicalDep/FileUploadField";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { DeleteDocsDep } from "../../../services/uploadDocsDelete/DeleteDocsDep";
import { MdCancel } from "react-icons/md";
import { useDeleteAccess } from "../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../utils/DeletePopup";

export const DependentInsurance = () => {
  const { formattedPermissions } = useDeleteAccess();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { depInsuranceData, dropDownVal } = useContext(DataSupply);
  const { SubmitMPData } = DependInsDataFun();
  const { UpdateDIData } = UpdateDepInsDataFun();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const { depInsuData } = useOutletContext();

  const [selectedNationality, setSelectedNationality] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(DependentInsuranceSchema),
    defaultValues: {
      depInsurance: [{}],
    },
  });

  const [inputFields, setInputFields] = useState([{ id: Date.now() }]);

  const [isUploading, setIsUploading] = useState([]);
  const [secondaryUploadedFile, setSecondaryUploadedFile] = useState([
    //   {
    //   empInsUpload: [],
    // }
  ]);
  const [uploadedFileNames, setUploadedFileNames] = useState([
    //   {
    //   empInsUpload: [],
    // }
  ]);

  const [uploadedDocs, setUploadedDocs] = useState({
    depInsurance: [],
  });

  const [depInsurance, setDepInsurance] = useState(inputFields);
  const [showTitle, setShowTitle] = useState("");
  const isInitialMount = useRef(true);

  const requiredPermissions = ["Insurance"];

  const access = "Employee";

  const handleAddFileClick = () => {
    const newField = { id: Date.now() };
    setDepInsurance((prev) => [...prev, newField]);
   
  };

  const watchedEmpID = watch("empID");
  const getDepInsurance = watch("depInsurance");
  const handleRemoveFileClick = (index) => {
    // const newFields = depInsurance
    //   .filter((_, i) => i !== index)
    //   .map((val, inx) => val);
    // const newFields = depInsurance?.filter((_, i) => i !== index);
    // const newFields = depInsurance.filter((item, i) => {
    //   return i !== index;
    // });
    const newFields = getDepInsurance
      .filter((_, i) => i !== index) // Remove the item at the given index
      .map((item) => ({ ...item }));
    
    setDepInsurance(newFields);
    setValue("depInsurance", newFields);

  
    // setUploadedDocs((prevDocs) => {
    //   if (!prevDocs?.depInsurance || !(index in prevDocs.depInsurance))
    //     return prevDocs;

    //   // Step 1: Create a copy of depInsurance without the specific index
    //   const newDepInsurance = { ...prevDocs.depInsurance };
    //   delete newDepInsurance[index];

    //   // Step 2: Reindex the remaining items
    //   const reindexedDepInsurance = Object.values(newDepInsurance).reduce(
    //     (acc, item, newIndex) => {
    //       acc[newIndex] = item;
    //       return acc;
    //     },
    //     {}
    //   );

    //   // Step 3: Return updated state
    //   return { ...prevDocs, depInsurance: reindexedDepInsurance };
    // });

    setUploadedDocs((prevDocs) => {
      // if (!prevDocs?.depInsurance || !(index in prevDocs.depInsurance))
      //   return prevDocs;

      // Step 1: Create an array from the depInsurance object, filtering out the selected index
      const filteredArray = Object.entries(prevDocs?.depInsurance)
        .filter(([key]) => Number(key) !== index)
        .map(([, value]) => value); // Keep only values (arrays of file objects)

      // Step 2: Reconstruct the depInsurance object with new sequential keys
      const reindexedDepInsurance = filteredArray?.reduce(
        (acc, item, newIndex) => {
          acc[newIndex] = item;
          return acc;
        },
        {}
      );
    
      // Step 3: Return the updated state
      return { ...prevDocs, depInsurance: reindexedDepInsurance };
    });

    // setValue("depInsurance", (prev) => {
    //   if (!Array.isArray(prev)) return [];
    //   const filteredDepInsurance = prev.filter((_, i) => i !== index);

    //   return filteredDepInsurance;
    // });
    trigger("depInsurance");
    // setUploadedDocs(newUploadedDocs); // Update state

    // setUploadedDocs((prev) => {
    //   const updatedDocs = { ...prev };
    //   delete updatedDocs[index]; // Remove the specific index
    //   return updatedDocs;
    // });
    // const result = uploadedDocs?.filter((fil, i) => {
    //   return i !== index;
    // });
    // setUploadedDocs(result);
    // setUploadedFileNames((prev) => {
    //   const updatedFileNames = { ...prev };
    //   delete updatedFileNames[index]; // Remove the specific index
    //   return updatedFileNames;
    // });

    const fullPath = depInsurance[index]?.fileName;
    if (fullPath) {
      const fileName = fullPath.split("/").pop();
      
      handleDeleteFile("depInsurance", fileName, watchedEmpID);
    }

    const filterAndReindex = (prev, index) =>
      Array.isArray(prev)
        ? prev
            .filter((item) => item?.ind !== index)
            .map((val, inx) => ({ ...val, ind: inx }))
        : [];

    setIsUploading((prev) => filterAndReindex(prev, index));
    setUploadedFileNames((prev) => filterAndReindex(prev, index));
  };



  const insuClaimDD = dropDownVal[0]?.insuClaimDD.map((item) => ({
    value: item,
    label: item,
  }));

  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    return fileNameWithExtension;
  };

  const handleNationalityChange = (e) => {
    setSelectedNationality(e.target.value);
  };

  const updateUploadingState = (label, value, idx) => {
    setUploadedFileNames([]);

    setIsUploading((prev) => {
      const isFirstUpdate = prev.length === 0; // If `prev` is empty, it's the first update

      let uploadedFileFalse = [];
      if (isFirstUpdate) {
        uploadedFileFalse =
          secondaryUploadedFile?.map((val) => {
            const result = formattedPermissions?.deleteAccess?.[access]?.some(
              (permission) => requiredPermissions.includes(permission)
            );
            return {
              ...val,
              empInsUpload: result, // Set empInsUpload based on permission check
            };
          }) || [];
      }

      // Remove any existing entry with the same `ind` before adding a new one
      const updatedState = [
        ...prev.filter((item) => item.ind !== idx),
        { ind: idx, empInsUpload: value },
      ];

      return isFirstUpdate
        ? [...uploadedFileFalse, ...updatedState]
        : updatedState;
    });
    // console.log(value);
  };

  const handleFileChange = async (e, type, index) => {
    // console.log("Event target files:", e.target.files); // Check if files exist
    if (!watchedEmpID) {
      alert("Please provide the Employee ID before deleting files.");
      return;
    }
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // console.log("Uploaded docs:", uploadedDocs); // Check uploadedDocs structure

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

    // const currentFiles = watch(type) || [];
    // // console.log("Current files:", currentFiles); // Check currentFiles
    // if (currentFiles.some((file) => file.name === selectedFile.name)) {
    //   alert("This file has already been uploaded.");
    //   return;
    // }

    setValue(`depInsurance[${index}].depenInfUpload`, selectedFile);

    try {
      updateUploadingState(type, true, index);
      await claimUploadDocs(
        selectedFile,
        type,
        setUploadedDocs,
        watchedEmpID,
        index
      );

      // setUploadedFileNames((prev) => ({
      //   ...prev,
      //   [index]: selectedFile.name,
      // }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setValue("empID", depInsuData?.empID);

    const depInsuranceData = depInsuData?.depInsurance;

    if (depInsuranceData) {
      try {
        const parsedData = JSON.parse(depInsuranceData);

        if (!Array.isArray(parsedData)) {
          console.error("Invalid depInsurance data format:", depInsuranceData);
          return;
        }

        setDepInsurance([]);
        setUploadedDocs([]);
        setUploadedFileNames({});
        setValue("depInsurance", []);

        if (parsedData && parsedData.length > 0) {
          setDepInsurance(parsedData);
          
          setValue("depInsurance", parsedData);

          parsedData.forEach((item, idx) => {
            if (item?.depenInfUpload) {
              try {
                const url = item.depenInfUpload;
                if (Array.isArray(url) && url.length === 0) return; // Skip empty uploads

                const parsedArray =
                  typeof url === "string" ? JSON.parse(url) : url;

                if (!Array.isArray(parsedArray)) {
                  console.error("Invalid depenInfUpload format:", url);
                  return;
                }

                const parsedFiles = parsedArray
                  .map((file) => {
                    try {
                      return typeof file === "string" ? JSON.parse(file) : file;
                    } catch (nestedError) {
                      console.error(
                        "Error parsing nested depenInfUpload item:",
                        file
                      );
                      return null;
                    }
                  })
                  .filter(Boolean); // Remove null values

                setUploadedDocs((prev) => ({
                  ...prev,
                  depInsurance: {
                    ...prev.depInsurance,
                    [idx]: parsedFiles,
                  },
                }));
                // {
                //   console.log("parsedData : ", parsedData);
                // }
                const updatingState = parsedData.map((file, ind) => {
                  const result = formattedPermissions?.deleteAccess?.[
                    access
                  ]?.some((permission) =>
                    requiredPermissions.includes(permission)
                  );
                  // console.log("result : ", result);
                  return {
                    ind: ind,
                    empInsUpload: result,
                  };
                });
                // console.log("updatingState : ", updatingState);

                setUploadedFileNames([...updatingState]);
                setSecondaryUploadedFile([...updatingState]);
                // setUploadedFileNames((prev) => ({
                //   ...prev,
                //   [idx]:
                //     parsedFiles.length > 0
                //       ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
                //       : "",
                // }));
              } catch (innerError) {
                console.error(
                  "Error parsing depenInfUpload JSON:",
                  item.depenInfUpload
                );
              }
            }
          });
        }
      } catch (error) {
        console.error("Error parsing depInsurance data:", error);
      }
    }
  }, [depInsuData]);

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };

  const deleteFile = async (fileType, fileName, index) => {
    try {
      const watchedEmpID = watch("empID");
      if (!watchedEmpID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(
        fileType,
        fileName,
        watchedEmpID
      );
      const isDeletedArrayUploaded = await DeleteDocsDep(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setUploadedDocs,
        uploadedDocs,
        index,
        setIsUploading
      );

      // setIsUploading((prev) =>
      //   prev
      //     ?.filter((item) => item?.ind !== index)
      //     .map((val, inx) => ({ ...val, ind: inx }))
      // );

      // setUploadedFileNames((prevs) =>
      //   prevs
      //     ?.filter((fil) => fil?.ind !== index)
      //     .map((val, inx) => ({ ...val, ind: inx }))
      // );
      // console.log("setIsUploading : ", isUploading);
      const updateEmpInsUpload = (prev, index) =>
        Array.isArray(prev)
          ? prev
              .map((item) =>
                item?.ind === index ? { ...item, empInsUpload: false } : item
              )
              .map((val, inx) => ({ ...val, ind: inx }))
          : [];

      setIsUploading((prev) => updateEmpInsUpload(prev, index));
      setUploadedFileNames((prev) => updateEmpInsUpload(prev, index));
      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }

      setdeleteTitle1(`${fileName}`);
      handleDeleteMsg();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const onSubmit = async (data) => {
    try {
      const checkingDITable = depInsuranceData.find(
        (match) => match.empID === data.empID
      );

      // console.log("Table",checkingDITable);
    
      if (checkingDITable) {
        const depValue = {
          ...data,
          depInsurance: data?.depInsurance?.map((insurance, index) => {
            return {
              ...insurance,
              depenInfUpload:
                JSON.stringify(uploadedDocs?.depInsurance?.[index]) || [],
            };
          }),
          id: checkingDITable.id,
        };
        // console.log("depValue : ", depValue);
        await UpdateDIData({ depValue });
        setShowTitle("Dependent Insurance Info Updated successfully");
        setNotification(true);

        // console.log("Final Data to Submit:", depValue);
      } else {
        const depValue = {
          ...data,
          depInsurance: data?.depInsurance?.map((insurance, index) => {
            return {
              ...insurance,
              depenInfUpload:
                JSON.stringify(uploadedDocs?.depInsurance?.[index]) || [],
            };
          }),
        };
        // console.log(depValue, "create");
        await SubmitMPData({ depValue });
        setShowTitle("Dependent Insurance Info saved successfully");
        setNotification(true);
      }
    } catch (error) {
      console.error("Error in submitting data:", error);
    }
  };

  return (
    <div className="bg-[#F5F6F1CC] mx-auto p-2 py-10">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end items-center">
          <div className="max-w-sm">
            <label className="text_size_5">Employee ID</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter Employee ID"
              {...register("empID")}
            />
            {errors.empID && (
              <p className="text-[red] text-[12px]">{errors.empID.message}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddFileClick}
          className="absolute right-3 mt-10 text-medium_grey text-[25px]"
        >
          <FiPlusSquare className="mr-1" />
        </button>

        {depInsurance &&
          depInsurance.length > 0 &&
          depInsurance
            .filter((field) =>
              Object.values(field).some(
                (value) =>
                  value !== "" &&
                  value !== null &&
                  value !== undefined &&
                  !(Array.isArray(value) && value.length === 0)
              )
            )
            .map((field, index) => {
              console.log(uploadedFileNames[index], "sdefghj");
              return (
                <div key={index} className="flex flex-col gap-5 border-b pb-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      label="Type of Insurance Claim"
                      register={register}
                      name={`depInsurance[${index}].depenInsType`}
                      type="select"
                      options={insuClaimDD}
                      errors={errors.insuranceClaims?.[index]}
                    />
                    <div>
                      <label className="mb-1 text_size_5">
                        Dependent Information
                      </label>
                      <select
                        {...register(`depInsurance[${index}].depenInfo`)}
                        className="input-field select-custom"
                      >
                        <option value=""></option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Spouse&Child">Spouse & Child</option>
                      </select>
                      {errors.depInsurance?.[index]?.depenInfo && (
                        <p className="text-[red] text-xs mt-1">
                          {errors.depInsurance[index].depenInfo.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <DependFirstFile
                    register={register}
                    errors={errors}
                    index={index}
                  />
                  <DependSecondFile
                    register={register}
                    errors={errors}
                    index={index}
                    watch={watch}
                    selectedNationality={selectedNationality}
                    handleNationalityChange={handleNationalityChange}
                    dropDownVal={dropDownVal}
                  />

                  <div className="grid grid-cols-3 gap-10">
                    <div>
                      <label
                        onClick={() => {
                          if (uploadedDocs?.depInsurance?.[index]?.length > 0) {
                            alert(
                              "Please delete the previously uploaded file before uploading a new one."
                            );
                          }
                        }}
                        className="flex items-center px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer"
                      >
                        Upload
                        <input
                          // label="Upload File"
                          type="file"
                          {...register(`depInsurance[${index}].depenInfUpload`)}
                          onChange={(e) =>
                            handleFileChange(e, "depInsurance", index)
                          }
                          accept="application/pdf"
                          className="hidden"
                          disabled={
                            uploadedDocs?.depInsurance?.[index]?.length > 0
                          }
                        />
                        <GoUpload className="ml-1" />
                      </label>

                      {/* <p className="text-secondary text-xs pt-1">
    {uploadedFileDep[index]}
  </p> */}

                    {/* const [isUploading, setIsUploading] = useState({
    depInsurance: false,
  }); */}
                    {/* {console.log("IsUploading : ", isUploading)} */}
                    <div className="flex items-center">
                      <p className="text-secondary text-xs pt-1">
                        {uploadedDocs?.depInsurance?.[index]?.[0]?.upload
                          ?.split("/")
                          ?.pop()}
                      </p>
                      {/* {console.log("uploadedFileNames : ", uploadedFileNames)} */}
                     
                      {uploadedFileNames[index]?.empInsUpload === true &&
                      uploadedFileNames &&
                      uploadedFileNames.length > 0 &&
                      formattedPermissions?.deleteAccess?.[access]?.some(
                        (permission) => requiredPermissions.includes(permission)
                      ) ? (
                        <button
                          type="button"
                          className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                          onClick={() =>
                            deleteFile(
                              "depInsurance",
                              uploadedDocs?.depInsurance?.[index]?.[0]?.upload
                                ?.split("/")
                                ?.pop(),
                              index
                            )
                          }
                        >
                          <MdCancel />
                        </button>
                      ) : isUploading[index]?.empInsUpload === true &&
                        isUploading &&
                        isUploading.length > 0 ? (
                        <button
                          type="button"
                          className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                          onClick={() =>
                            deleteFile(
                              "depInsurance",
                              uploadedDocs?.depInsurance?.[index]?.[0]?.upload
                                ?.split("/")
                                ?.pop(),
                              index
                            )
                          }
                        >
                          <MdCancel />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>

                    {errors?.depenInfUpload && (
                      <p className="text-red text-sm">
                        {errors.depenInfUpload.message}
                      </p>
                    )}
                  </div>
                </div>

                  {/* Remove button for individual fields */}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFileClick(index)}
                      className="text-red-500 mt-2 text-medium_grey text-[25px]"
                    >
                      <FiMinusSquare />
                    </button>
                  )}
                </div>
              );
            })}

        <div className="md:col-span-2 flex justify-center mt-10">
          <button type="submit" className="primary_btn">
            Save
          </button>
        </div>

        {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/insuranceAdd/dependentInsurance"
          />
        )}
      </form>
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </div>
  );
};
