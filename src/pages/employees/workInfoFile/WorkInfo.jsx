import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useOutletContext } from "react-router-dom";
import { WorkInfoSchema } from "../../../services/EmployeeValidation";
import { FaArrowLeft } from "react-icons/fa";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { WorkInfoFunc } from "../../../services/createMethod/WorkInfoFunc";
import { WorkDataPass } from "../../employees/WorkDataPass";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { FormField } from "../../../utils/FormField";
import { DataSupply } from "../../../utils/DataStoredContext";
import {leavePassDD,workInfoUploads} from "../../../utils/DropDownMenus";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { MdCancel } from "react-icons/md";
import { UploadingFiles } from "../../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../../utils/SpinLogo";
import { UpdateWIData } from "../../../services/updateMethod/UpdateWIData";
import { UpdateWISRData } from "../../../services/updateMethod/UpdateWISRData";
import { UpdateWILeaveData } from "../../../services/updateMethod/UpdateWILeaveData";
import { UpdateWITerminateData } from "../../../services/updateMethod/UpdateWITerminateData";
import { WIRowTwo } from "./WIRowTwo";
import { WIRowThree } from "./WIRowThree";
import { WIRowOne } from "./WIRowOne";
import { CreateLeaveData } from "../../../services/createMethod/CreateLeaveData";
import { CreateTerminate } from "../../../services/createMethod/CreateTerminate";
import { CreateSRData } from "../../../services/createMethod/CreateSRData";
import { DeleteDocsWI } from "../../../services/uploadDocsDelete/DeleteDocsWI";
import { useDeleteAccess } from "../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../utils/DeletePopup";

export const WorkInfo = () => {
  const { formattedPermissions } = useDeleteAccess();
  const { WIUpdateData } = UpdateWIData();
  const { WIUpdateSRData } = UpdateWISRData();
  const { WIUpdateLeaveData } = UpdateWILeaveData();
  const { WIUpdateTerminateData } = UpdateWITerminateData();
  const { SubmitWIData } = WorkInfoFunc();
  const { SRDataValue } = CreateSRData();
  const { LeaveDataValue } = CreateLeaveData();
  const { TerminateDataValue } = CreateTerminate();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const {
    empPIData,
    terminateData,
    workInfoData,
    leaveDetailsData,
    SRData,
    dropDownVal,
  } = useContext(DataSupply);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      uploadAL: [],
      uploadPR: [],
      uploadSP: [],
      uploadLP: [],
      uploadDep: [],
    },
    resolver: yupResolver(WorkInfoSchema),
  });
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const watchedEmpID = watch("empID");
  const [trackEmpID, setTrackEmpID] = useState(false);
  const userType = localStorage.getItem("userID");
  const [updateFlag, setUpdateFlag] = useState(false);
  const {
    terminationFields,
    leaveFieldsAnother,
    workFields,
    leaveBasic,
    serviceRecords,
  } = WorkDataPass();
  const [empName, setEmpName] = useState("");

  const [selection, setSelection] = useState({
    department: "",
    position: "",
    jobCat: "",
    otherDeparment: "",
    // Add other fields here if needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelection((prevSelection) => ({
      ...prevSelection,
      [name]: value,
    }));
  };

  // const watchFields = watch(
  //   WorkDataPass.terminationFields.map((field) => field.name)
  // );
  const watchFields = watch(terminationFields.map((field) => field.name));
  useEffect(() => {
    empPIData.map((items) => {
      if (watchedEmpID === items.empID) {
        setEmpName(items.name);
      }
    });
  }, [empPIData]);

  const [isUploading, setIsUploading] = useState({
    uploadPR: false,
    uploadSP: false,
    uploadLP: false,
    uploadAL: false,
    uploadDep: false,
    WIProbation: false,
    WIResignation: false,
    WITermination: false,
    WILeaveEntitle: false,
    WIContract: false,
  });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    uploadPR: null,
    uploadSP: null,
    uploadLP: null,
    uploadAL: null,
    uploadDep: null,
    WIProbation: null,
    WIResignation: null,
    WITermination: null,
    WILeaveEntitle: null,
    WIContract: null,
  });
  const [nameServiceUp, setNameServiceUp] = useState({
    uploadPR: [],
    uploadSP: [],
    uploadLP: [],
    uploadAL: [],
    uploadDep: [],
    WIProbation: [],
    WIResignation: [],
    WITermination: [],
    WILeaveEntitle: [],
    WIContract: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const WIDetails = workInfoData
              ? workInfoData.find((user) => user.empID === emp.empID)
              : {};
            const TDetails = terminateData
              ? terminateData.find((user) => user.empID === emp.empID)
              : {};
            const LDDetails = leaveDetailsData
              ? leaveDetailsData.find((user) => user.empID === emp.empID)
              : {};
            const SRDetails = SRData
              ? SRData.find((user) => user.empID === emp.empID)
              : {};

            return {
              ...emp,
              ...WIDetails,
              ...TDetails,
              ...LDDetails,
              ...SRDetails,
            };
          })
          .filter(Boolean);

        setUserDetails(mergedData);
        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [empPIData, terminateData, workInfoData, leaveDetailsData, SRData]);

  const updateUploadingState = (label, value) => {
    setIsUploading((prev) => ({
      ...prev,
      [label]: value,
    }));
    // console.log(value);
  };

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
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
        alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
        return;
    }

    // Ensure no duplicate files are added
    const currentFiles = watch(label) || [];
    if (currentFiles?.some((file) => file.name === selectedFile.name)) {
        alert("This file has already been uploaded.");
        return;
    }

    // **Check if the file was previously deleted and prevent re-adding**
    // if (deletedFiles[label]?.includes(selectedFile.name)) {
    //     alert("This file was previously deleted and cannot be re-added.");
    //     return;
    // }

    setValue(label, [...currentFiles, selectedFile]);

    try {
      updateUploadingState(label, true);
      await uploadDocs(selectedFile, label, setNameServiceUp, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
        console.error(err);
    }
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };

  const deleteFile = async (fileType, fileName) => {
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
      const isDeletedArrayUploaded = await DeleteDocsWI(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setNameServiceUp,
        setIsUploading
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      setdeleteTitle1(
        `${fileName}`
      );
      handleDeleteMsg();
      // console.log(`Deleted "${fileName}". Remaining files:`);
      setdeleteTitle1(
        `${fileName}`
      );
      handleDeleteMsg();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const getArrayDateValue = (value) => {
    const formatToTitleCase = (input) =>
      input
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    if (Array.isArray(value) && value.length > 0) {
      return value[value.length - 1]?.trim().toUpperCase();
    }
    return typeof value === "string" ? value.trim().toUpperCase() : null;
  };
 

  const searchResult = (result) => {
    if (result){
      setTrackEmpID(true)
    }

    const fieldValue = ["empID"];

fieldValue.forEach((val) => {
  const data = result[val];

  // Ensure the data is a string before setting the value
  setValue(val, typeof data === "string" ? data : "");
});
    

    const keysToSet = [
      // "empID",
      "doj",
      "hospLeave",
      "skillPool",
      "resignDate",
      "termiDate",
      "resignNotProb",
      "otherResignNotProb",
      "termiNotProb",
      "otherTermiNotProb",
      "resignNotConf",
      "otherResignNotConf",
      "termiNotConf",
      "otherTermiNotConf",
      "reasonResign",
      "reasonTerminate",
      "materLeave",
      "paterLeave",
      "sickLeave",
      "sickLeaveDate",
      "mrageLeave",
      "compasLeave",
      "remarkWI",
      "sapNo",
      "pervAnnualLeaveBal",
      "remainingAnualLeave",
      "remainingCompasLeave",
      "remainingHosLeave",
      "remainingMateLeave",
      "remainingMrageLeave",
      "remainingPaternityLeave",
      "remainingSickLeave",
    ];
    keysToSet.forEach((key) => {
      let rawValue =
        result[key] !== undefined && result[key] !== null
          ? result[key].toString().trim().toUpperCase()
          : "";
      
      const toTitleCase = (input) =>
        input
          // .toLowerCase()
          // .split(" ")
          // .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          // .join(" ");

      let value = toTitleCase(rawValue);

      if (
        key === "termiNotProb" ||
        key === "termiNotConf" ||
        key === "resignNotProb" ||
        key === "resignNotConf"
      ) {
        value = value;
      }

      setValue(key, value);
    });

    const arrayDateField = [
      "dateLeavePass",
      "depEmp",
      "positionRev",
      "revSalary",
      "revLeavePass",
      "revAnnualLeave",
      "durLeavePass",
      "destinateLeavePass",
      "annualLeave",
      "leavePass",
      "salaryType",
      "manager",
      "supervisor",
      "workStatus",
      "workHrs",
      "workWeek",
      "workMonth",
      "upgradePosition",
      "contractPeriod",
      "probDuration",
      "department",
      "otherDepartment",
      "position",
      "otherPosition",
      "jobCat",
      "otherJobCat",
      "jobDesc",
      "relationship",
      "upgradeDate",
      "revALD",
      "contractStart",
      "contractEnd",
      "probationStart",
      "probationEnd",
      "revLeaveDate",
      "revSalaryDate",
      "depEmpDate",
      "annualLeaveDate",
      "positionRevDate",
    ];

    // Set values for date fields and handle salaryType condition
    arrayDateField.forEach((field) => {
      const valueToSet = result[field];

      setValue(field, getArrayDateValue(valueToSet)); // Use getArrayDateValue for all fields
    });
    // console.log("key",arrayDateField);
// console.log("res",result);

    setValue("hr", "Hr-notification@adininworks.com");

    const uploadFields = [
      "WIProbation",
      "WIResignation",
      "WITermination",
      "WILeaveEntitle",
      "WIContract",
      "uploadPR",
      "uploadSP",
      "uploadLP",
      "uploadAL",
      "uploadDep",
    ];

    // Handle file uploads
     uploadFields.forEach((field) => {
      if (result[field]) {
        try {
          const rawArrayString = result[field][0]; // Access the first element of the array
          const trimmedString =
            rawArrayString.startsWith('"') && rawArrayString.endsWith('"')
              ? rawArrayString.slice(1, -1)
              : rawArrayString;

          const properJsonString = trimmedString.replace(/\\"/g, '"');
          const parsedArray = JSON.parse(properJsonString);

          if (!Array.isArray(parsedArray)) {
            throw new Error(`Parsed result is not an array for ${field}`);
          }
          const parsedFiles = parsedArray.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          );

          setValue(field, parsedFiles);
          setNameServiceUp((prev) => ({ ...prev, [field]: parsedFiles }));
          setUploadedFileNames((prev) => ({
            ...prev,
            [field]: parsedFiles.map((file) => getFileName(file.upload)), // Show all file names
          }));
        } catch (error) {
          console.error(`Failed to parse ${field}:`, error);
        }
      }
    });
  };

  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop();
    return fileNameWithExtension;
  };

  const onSubmit = async (data) => {
    try {
      const checkingPITable = empPIData?.find((match) => match.empID === data.empID) || null;
      const terminateDataRecord = terminateData?.find((match) => match.empID === data.empID) || null;
      const workInfoDataRecord = workInfoData?.find((match) => match.empID === data.empID) || null;
      const leaveDetailsDataRecord = leaveDetailsData?.find((match) => match.empID === data.empID) || null;
      const SRDataRecord = SRData?.find((match) => match.empID === data.empID) || null;
  
      const today = new Date().toISOString().split("T")[0];
  
      // ===== SR Data =====
      if (SRDataRecord) {
        const previous = SRDataRecord.updatedBy ? JSON.parse(SRDataRecord.updatedBy) : [];
        const updatedBy = JSON.stringify([...previous, { userID: userType, date: today }]);
        const SRUpValue = {
          ...data,
          SRDataRecord:SRDataRecord,
          uploadPR: JSON.stringify(nameServiceUp.uploadPR),
          uploadSP: JSON.stringify(nameServiceUp.uploadSP),
          uploadLP: JSON.stringify(nameServiceUp.uploadLP),
          uploadAL: JSON.stringify(nameServiceUp.uploadAL),
          uploadDep: JSON.stringify(nameServiceUp.uploadDep),
          updatedBy,
        };
        await WIUpdateSRData({ SRUpValue });
      } else {
        const createdBy = JSON.stringify([{ userID: userType, date: today }]);
        const SRValue = {
          ...data,
          empID: data.empID,
          uploadPR: JSON.stringify(nameServiceUp.uploadPR),
          uploadSP: JSON.stringify(nameServiceUp.uploadSP),
          uploadLP: JSON.stringify(nameServiceUp.uploadLP),
          uploadAL: JSON.stringify(nameServiceUp.uploadAL),
          uploadDep: JSON.stringify(nameServiceUp.uploadDep),
          createdBy,
        };
        await SRDataValue({ SRValue });
      }
  
      // ===== Leave Details =====
      if (leaveDetailsDataRecord) {
        const previous = leaveDetailsDataRecord.updatedBy ? JSON.parse(leaveDetailsDataRecord.updatedBy) : [];
        const updatedBy = JSON.stringify([...previous, { userID: userType, date: today }]);
        const LeaveUpValue = {
          ...data,
          leaveDetailsDataRecord: leaveDetailsDataRecord,
          updatedBy,
        };
        await WIUpdateLeaveData({ LeaveUpValue });
      } else {
        const createdBy = JSON.stringify([{ userID: userType, date: today }]);
        const LeaveValue = {
          ...data,
          remainAnnualLeave: "0",
          empID: data.empID,
          createdBy,
        };
        await LeaveDataValue({ LeaveValue });
      }
  
      // ===== Work Info =====
      if (workInfoDataRecord) {
        const previous = workInfoDataRecord.updatedBy ? JSON.parse(workInfoDataRecord.updatedBy) : [];
        const updatedBy = JSON.stringify([...previous, { userID: userType, date: today }]);
        const workInfoUpValue = {
          ...data,
          sapNo: checkingPITable?.sapNo,
          workInfoDataRecord:workInfoDataRecord,
          updatedBy,
        };
        await WIUpdateData({ workInfoUpValue });
      } else {
        const createdBy = JSON.stringify([{ userID: userType, date: today }]);
        const workInfoValue = {
          ...data,
          sapNo: checkingPITable?.sapNo,
          createdBy,
        };
        await SubmitWIData({ workInfoValue });
      }
  
      // ===== Terminate Data =====
      if (terminateDataRecord) {
        const previous = terminateDataRecord.updatedBy ? JSON.parse(terminateDataRecord.updatedBy) : [];
        const updatedBy = JSON.stringify([...previous, { userID: userType, date: today }]);
        const TerminateUpValue = {
          ...data,
          terminateDataRecord:terminateDataRecord,
          WIContract: JSON.stringify(nameServiceUp.WIContract),
          WIProbation: JSON.stringify(nameServiceUp.WIProbation),
          WIResignation: JSON.stringify(nameServiceUp.WIResignation),
          WITermination: JSON.stringify(nameServiceUp.WITermination),
          WILeaveEntitle: JSON.stringify(nameServiceUp.WILeaveEntitle),
          updatedBy,
        };
        await WIUpdateTerminateData({ TerminateUpValue });
      } else {
        const createdBy = JSON.stringify([{ userID: userType, date: today }]);
        const TerminateValue = {
          ...data,
          empID: data.empID,
          WIContract: JSON.stringify(nameServiceUp.WIContract),
          WIProbation: JSON.stringify(nameServiceUp.WIProbation),
          WIResignation: JSON.stringify(nameServiceUp.WIResignation),
          WITermination: JSON.stringify(nameServiceUp.WITermination),
          WILeaveEntitle: JSON.stringify(nameServiceUp.WILeaveEntitle),
          createdBy,
        };
        await TerminateDataValue({ TerminateValue });
      }
      setShowTitle("Employee Work Info Stored successfully");
      setNotification(true);
    } catch (err) {
      console.log("Error during submission:", err);
    }
  };

  const requiredPermissions = [
    "Work Info",
  ];

  const access = "Employee"

  return (
    <section
      className="bg-[#F5F6F1CC] mx-auto p-10"
      onClick={() => {
        setFilteredEmployees([]);
      }}
    >
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/employee" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <p className="flex-1 text-center mt-2 text_size_2 uppercase">
          Work Info
        </p>
        <div className="flex-1">
          <SearchDisplay
            searchResult={searchResult}
            newFormData={allEmpDetails}
            searchIcon2={<IoSearch />}
            placeholder="Employee Id"
            rounded="rounded-lg"
            filteredEmployees={filteredEmployees}
            setFilteredEmployees={setFilteredEmployees}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" mt-20 bg-[#F5F6F1CC]">
        <div className="flex justify-end items-center mt-5">
          <div>
            <FormField
              label="Employee ID"
              type="text"
              name="empID"
              placeholder="Enter Employee ID"
              errors={errors}
              register={register}
              trackEmpID={trackEmpID}
            />
          </div>
        </div>

        <WIRowOne
          register={register}
          errors={errors}
          watch={watch}
          onChange={handleChange}
          selection={selection}
          getValues={getValues}
          setValue={setValue}
          dropDownVal={dropDownVal}
        />

<div className="grid grid-cols-3 gap-5 form-group mt-5">
          {workFields.map((field, index) => (
            <div key={index} className="form-group">
              <label className="mb-1 text_size_5">{field.label}</label>
              {field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="input-field select-custom"
                  defaultValue={field.value || ""}
                  watch={watch(field.name)}
                  readOnly={field.readOnly || false}
                >
                  {(field.options || []).map((option, i) => (
                    <option
                      key={i}
                      value={
                        option.trim() === "Select"
                          ? ""
                          : option.trim().toUpperCase()
                      }
                    >
                      {option.trim().toUpperCase()}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  {...register(field.name)}
                  className="input-field"
                  defaultValue={field.value || ""}
                  readOnly={field.readOnly || false}
                />
              )}
              {errors[field.name] && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <WIRowTwo
          register={register}
          errors={errors}
          watch={watch}
          dropDownVal={dropDownVal}
        />
        <WIRowThree
          register={register}
          errors={errors}
          watch={watch}
          dropDownVal={dropDownVal}
        />
        <hr className="text-lite_grey mb-5" />

        <div className="form-group">
          <p className="text_size_3 form-group text-medium_grey my-5">
            Employee Leave Info
          </p>
          <div className="grid grid-cols-2 gap-5 form-group mt-5">
            <FormField
              label="Leave Passage Entitlement for Non-Local"
              register={register}
              name="leavePass"
              type="select"
              options={leavePassDD}
              errors={errors}
            />
            {leaveBasic.map((field, index) => (
              <FormField
                key={index}
                label={field.label}
                register={register}
                name={field.name}
                type={field.type}
                errors={errors}
              />
            ))}
          </div>

          <div className="grid grid-cols-4 gap-5 form-group mt-5">
            {leaveFieldsAnother.map((field, index) => (
              <div key={index} className="form-group">
                <label className="mb-1 text_size_5">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    {...register(field.name)}
                    // defaultValue={field.value || ""}
                    className="input-field select-custom"
                  >
                    {(field.options || []).map((option, i) => {
                      const formattedOption = option
                        .trim()
                        .toLowerCase()
                        .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter
                      return (
                        <option
                          key={i}
                          value={
                            option.trim() === "Select" ? "" : option.trim()
                          }
                        >
                          {formattedOption.toUpperCase()}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    {...register(field.name)}
                    defaultValue={field.value || ""}
                    className="input-field"
                  />
                )}
                {errors[field.name] && (
                  <p className="text-[red] text-[13px] mt-1">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <hr className="text-lite_grey mb-5" />

        <div className="form-group">
          <p className="text_size_3 form-group text-medium_grey my-5">
            Employee Exit Info
          </p>
          <div className="grid grid-cols-2 form-group gap-5">
            {terminationFields.map((field, index) => {
              const selectedValue = watchFields[index]; // Get the watched value for the current field
              const isOtherSelected = selectedValue === "OTHER";

              return (
                <div key={index} className="form-group">
                  <label className="block text_size_5">{field.label}</label>
                  {field.type === "select" ? (
                    <>
                      <select
                        {...register(field?.name)}
                        className="input-field select-custom"
                      >
                        <option value="">Select</option>
                        {field?.options?.map((option, i) => {
                          const optionValue =
                            typeof option === "object"
                              ? option.value?.trim()
                              : String(option).trim();
                          const optionLabel =
                            typeof option === "object"
                              ? option.label?.trim()
                              : String(option).trim();

                          return (
                            <option
                              key={i}
                              value={
                                optionValue === "Select"
                                  ? ""
                                  : String(optionValue).toUpperCase()
                              }
                            >
                              {optionLabel.toUpperCase()}
                            </option>
                          );
                        })}
                      </select>

                      {isOtherSelected && (
                        <>
                          <input
                            type="text"
                            placeholder="Please specify"
                            {...register(
                              `other${
                                field.name.charAt(0).toUpperCase() +
                                field.name.slice(1)
                              }`,
                              {
                                required:
                                  "This field is required when 'Other' is selected",
                              }
                            )}
                            className="input-field"
                          />
                          <p className="text-[red] text-[13px] mt-1">
                            {
                              errors[
                                `other${
                                  field.name.charAt(0).toUpperCase() +
                                  field.name.slice(1)
                                }`
                              ]?.message
                            }
                          </p>
                        </>
                      )}
                    </>
                  ) : (
                    <input
                      type={field.type}
                      {...register(field.name)}
                      className="input-field"
                    />
                  )}
                  <p className="text-[red] text-[13px] mt-1">
                    {errors[field.name]?.message}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 form-group mt-5">
          {workInfoUploads.map((field, index) => (
            <Controller
              key={index}
              name={field.title}
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="form-group">
                  <h2 className="text_size_5">Upload {field.label}</h2>
                  <label
                    onClick={() => {
                      if (isUploading[field.title]) {
                        alert(
                          "Please delete the previously uploaded file before uploading a new one."
                        );
                      }
                    }}
                    className="mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer"
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,image/jpeg,image/png"
                      onChange={(e) => handleFileChange(e, field.title)} // Pass field title for dynamic handling
                      disabled={isUploading[field.title]}
                    />
                    <span className="ml-2 text-grey w-full font-normal flex justify-between items-center gap-10">
                      {field.label}
                      {field.icon}
                    </span>
                  </label>

                  <p className="text-xs mt-1 text-grey px-1">
                    {uploadedFileNames?.[field.title] ? (
                      Array.isArray(uploadedFileNames[field.title]) ? (
                        uploadedFileNames[field.title]
                          .slice() // Create a shallow copy to avoid mutating the original array
                          .reverse()
                          .map((fileName, fileIndex) => (
                            <span
                              key={fileIndex}
                              className="mt-2 flex justify-between items-center"
                            >
                              {fileName}
                              {formattedPermissions?.deleteAccess?.Employee?.includes(
                              "Work Info") && (
                              <button
                                type="button"
                                className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                                onClick={() =>
                                  deleteFile(field.title, fileName)
                                }
                              >
                                <MdCancel />
                              </button>
                              )}
                            </span>
                          ))
                      ) : (
                        <span className="mt-2 flex justify-between items-center">
                          {uploadedFileNames[field.title]}
                          <button
                            type="button"
                            className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                            onClick={() =>
                              deleteFile(
                                field.title,
                                uploadedFileNames[field.title]
                              )
                            }
                          >
                            <MdCancel />
                          </button>
                        </span>
                      )
                    ) : (
                      <span></span>
                    )}
                  </p>

                  {errors[field.title] && (
                    <p className="text-red text-xs mt-1">
                      {errors[field.title].message}
                    </p>
                  )}
                </div>
              )}
            />
          ))}
        </div>
        <hr className="text-lite_grey mb-5" />

        <div className="form-group">
          <p className="text_size_5 form-group text-medium_grey my-5">
            Employee Service Record
          </p>

          <div className="grid grid-cols-3 gap-5 ">
            {serviceRecords.map((field, index) => {
              return field.type === "file" ? (
                <UploadingFiles
                  key={index}
                  field={field}
                  register={register}
                  handleFileChange={handleFileChange}
                  uploadedFileNames={uploadedFileNames}
                  watchedEmpID={watchedEmpID}
                  deleteFile={deleteFile}
                  isUploading={isUploading}
                  errors={errors}
                  formattedPermissions={formattedPermissions}
                  requiredPermissions={requiredPermissions}
                  access={access}
                  check={isUploading}
                />
              ) : (
                <div key={index}>
                  <FormField
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    register={register}
                    errors={errors}
                  />
                </div>
              );
            })}
          </div>

          <div className="md:col-span-2 form-group">
            <label className="mb-1 text_size_5">Remarks for Work Info</label>
            <textarea
              {...register("remarkWI")}
              className="resize-none w-full p-2 mt-1 border bg-lite_skyBlue border-lite_grey rounded-md outline-none"
              rows="4"
            ></textarea>
            {errors.remarkWI && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.remarkWI.message}
              </p>
            )}
          </div>
        </div>
        <div className="center my-10">
          <button type="submit" className="primary_btn">
            Save
          </button>
        </div>
      </form>
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/workInfo"
        />
      )}
       {deletePopup && (
                          <DeletePopup
                            handleDeleteMsg={handleDeleteMsg}
                            title1={deleteTitle1}
                          />
                        )}
    </section>
  );
};
