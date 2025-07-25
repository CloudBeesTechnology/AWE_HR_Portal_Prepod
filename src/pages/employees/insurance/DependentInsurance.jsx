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
  const userType = localStorage.getItem("userID");

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

  const [isUploading, setIsUploading] = useState({ depInsurance: [] });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    depInsurance: [],
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    depInsurance: [],
  });

  const [tempFilesName, setTempFilesName] = useState({ depInsurance: [] });

  const [depInsurance, setDepInsurance] = useState(inputFields);
  const [showTitle, setShowTitle] = useState("");
  const isInitialMount = useRef(true);

  const requiredPermissions = ["Insurance"];

  const access = "Employee";

  const handleAddFileClick = () => {
    const newField = { id: Date.now() };
    setDepInsurance((prev) => [...prev, newField]);
    // console.log("handleAddFileClick : ", depInsurance);
  };

  const watchedEmpID = watch("empID");
  const getDepInsurance = watch("depInsurance");

  const handleRemoveFileClick = async (index) => {
    const newFields = getDepInsurance
      .filter((_, i) => i !== index) // Remove the item at the given index
      .map((item) => ({ ...item }));
    // console.log("newFields : ", newFields);
    setDepInsurance(newFields);
    setValue("depInsurance", newFields);
    setUploadedDocs((prevDocs) => {
      if (!prevDocs.depInsurance) return prevDocs;

      // Convert object to an array, remove index, and rebuild object
      const filteredArray = Object.entries(prevDocs.depInsurance)
        .filter(([key]) => Number(key) !== index)
        .map(([, value]) => value);

      const reindexedDocs = Object.fromEntries(
        filteredArray.map((item, newIndex) => [newIndex, item])
      );
      return { ...prevDocs, depInsurance: reindexedDocs };
    });
    setUploadedFileNames((prev) => {
      if (!prev.depInsurance) return prev;

      const updatedFiles = { ...prev.depInsurance };
      delete updatedFiles[index];

      const reindexedFiles = Object.values(updatedFiles).reduce(
        (acc, item, i) => {
          acc[i] = item;
          return acc;
        },
        {}
      );

      return { ...prev, depInsurance: reindexedFiles };
    });

    // Remove from tempFilesName
    setTempFilesName((prev) => {
      if (!prev.depInsurance) return prev;

      const filteredArray = Object.entries(prev.depInsurance)
        .filter(([key]) => Number(key) !== index)
        .map(([, value]) => value);

      const reindexedTempFiles = Object.fromEntries(
        filteredArray.map((item, newIndex) => [newIndex, item])
      );

      return { ...prev, depInsurance: reindexedTempFiles };
    });

    // trigger("depInsurance");
  };

  const insuClaimDD = dropDownVal[0]?.insuClaimDD.map((item) => ({
    value: item,
    label: item,
  }));

  const handleNationalityChange = (e) => {
    setSelectedNationality(e.target.value);
  };
  const updateUploadingState = (label, value, idx) => {
    setIsUploading((prev) => ({
      ...prev,
      [label]: {
        ...prev[label],
        [idx]: value, // Update only the specific index
      },
    }));
  };

  const handleFileChange = async (e, type, index) => {
    const watchedEmpID = watch("empID");
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/employeeInfo";
      return;
    }
    const selectedFile = e.target.files?.[0];
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

    const currentFiles = watch(type) || [];
    if (currentFiles.some((file) => file.name === selectedFile.name)) {
      alert("This file has already been uploaded.");
      return;
    }

    setValue(`depInsurance[${index}].depenInfUpload`, selectedFile);

    try {
      updateUploadingState(type, true, index);

      // Assuming the claimUploadDocs function uploads the file and returns the file path
      const uploadedFilePath = await claimUploadDocs(
        selectedFile,
        type,
        setUploadedDocs,
        watchedEmpID,
        index
      );
      setUploadedFileNames((prev) => ({
        ...prev,
        depInsurance: {
          ...prev.depInsurance,
          [index]: [
            ...(prev.depInsurance?.[index] || []), // Ensure existing files at this index persist
            { name: selectedFile.name }, // Store necessary details
          ],
        },
      }));
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(tempFilesName);
 
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

        // setDepInsurance([]);
        // setUploadedDocs([]);
        // setTempFilesName({});
        setValue("depInsurance", []);

        if (parsedData && parsedData.length > 0) {
          setDepInsurance(parsedData);
          // console.log("parsedData : ", parsedData);
          setValue("depInsurance", parsedData);

          parsedData.forEach((item, idx) => {
            // console.log(item);

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

                setTempFilesName((prev) => ({
                  ...prev,
                  depInsurance: {
                    ...prev.depInsurance,
                    [idx]: parsedFiles,
                  },
                }));
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
  // console.log(uploadedDocs,"uploadfilesnames");

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
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setTempFilesName,
        index
      );
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
  // console.log(uploadedFileNames,"dilesdf");

  const onSubmit = async (data) => {
    try {
      const checkingDITable = depInsuranceData.find(
        (match) => match.empID === data.empID
      );
      const today = new Date().toISOString().split("T")[0];
      if (checkingDITable) {
        const previous = checkingDITable.updatedBy ? JSON.parse(checkingDITable.updatedBy) : [];
        const updatedBy = JSON.stringify([...previous, { userID: userType, date: today }]);
        const depValue = {
          ...data,
          depInsurance: data?.depInsurance
            ?.filter((insurance, index) => {
              return Object.values(insurance).some((val) => {
                if (typeof val === "string") return val.trim() !== ""; // ✅ Non-empty strings
                if (Array.isArray(val)) return val.length > 0; // ✅ Non-empty arrays
                return val !== null && val !== undefined; // ✅ Non-null & valid values
              });
            })

            ?.map((insurance, index) => {
              return {
                ...insurance,
                depenInfUpload:
                  uploadedDocs?.depInsurance?.[index]?.length > 0
                    ? JSON.stringify(uploadedDocs?.depInsurance?.[index])
                    : [],
              };
            }),
          id: checkingDITable.id,
          updatedBy,
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
          createdBy: JSON.stringify([{ userID: userType, date: today }]),
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

  // console.log("tempFilesName", tempFilesName);
  // console.log("FilesName", uploadedFileNames);
  // console.log("uploadedDocs", uploadedDocs);

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
            .map((field, index) => (
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
                        if (
                          uploadedFileNames?.depInsurance?.[index]?.length > 0
                        ) {
                          alert(
                            "Please delete the previously uploaded file before uploading a new one."
                          );
                        }
                      }}
                      className="flex items-center px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer"
                    >
                      Upload
                      <input
                        type="file"
                        {...register(`depInsurance[${index}].depenInfUpload`)}
                        onChange={(e) =>
                          handleFileChange(e, "depInsurance", index)
                        }
                        accept="application/pdf"
                        className="hidden"
                        disabled={isUploading?.depInsurance?.[index]} // Disable when uploading
                      />
                      <GoUpload className="ml-1" />
                    </label>

                    <div className="flex flex-col">
                      {/* Loop through uploaded files if depInsurance is an array */}
                      {uploadedFileNames?.depInsurance?.[index] &&
                      Array.isArray(uploadedFileNames?.depInsurance?.[index]) &&
                      uploadedFileNames?.depInsurance?.[index].length > 0 ? (
                        <div className="flex items-center space-x-2">
                          <p className="text-secondary text-xs pt-1">
                            {uploadedFileNames?.depInsurance?.[index]
                              ?.map((file) => file.name)
                              .join(", ")}
                          </p>

                          <button
                            type="button"
                            className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                            onClick={() =>
                              deleteFile(
                                "depInsurance",
                                uploadedFileNames?.depInsurance?.[index]?.[0]
                                  ?.name,
                                index
                              )
                            }
                          >
                            <MdCancel />
                          </button>
                        </div>
                      ) : Array.isArray(
                          tempFilesName?.depInsurance?.[index]
                        ) ? (
                        tempFilesName?.depInsurance?.[index]
                          ?.slice() // Create a copy to avoid mutating the original array
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .map((file, fileIndex) => (
                            <div
                              key={fileIndex}
                              className="flex items-center space-x-2"
                            >
                              <p className="text-secondary text-xs pt-1">
                                {file.upload?.split("/").pop()}
                              </p>

                              {/* Show delete button if the file can be deleted */}
                              {formattedPermissions?.deleteAccess?.[
                                access
                              ]?.some((permission) =>
                                requiredPermissions.includes(permission)
                              ) && (
                                <button
                                  type="button"
                                  className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                                  onClick={() =>
                                    deleteFile(
                                      "depInsurance",
                                      file.upload?.split("/").pop(),
                                      index
                                    )
                                  }
                                >
                                  <MdCancel />
                                </button>
                              )}
                            </div>
                          ))
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
            ))}

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
