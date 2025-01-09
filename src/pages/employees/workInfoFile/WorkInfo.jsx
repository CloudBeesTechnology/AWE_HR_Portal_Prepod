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
import {
  DepartmentDD,
  JobCatDD,
  leavePassDD,
  workInfoUploads,
} from "../../../utils/DropDownMenus";
import { UploadingFiles } from "../../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../../utils/SpinLogo";
import { UpdateWIData } from "../../../services/updateMethod/UpdateWIData";
import { WIRowTwo } from "./WIRowTwo";
import { WIRowThree } from "./WIRowThree";
import { WIRowOne } from "./WIRowOne";

export const WorkInfo = () => {
  const { WIUpdateData } = UpdateWIData();
  const { SubmitWIData } = WorkInfoFunc();
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

  const [notification, setNotification] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const watchedEmpID = watch("empID");
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

  const handleFileChange = async (e, label) => {
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      return;
    }

    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file");
      return;
    }

    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);
    try {
      // Dynamically set field based on label
      await uploadDocs(selectedFile, label, setNameServiceUp, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // const getArrayDateValue = (value) => {
  //   if (Array.isArray(value) && value.length > 0) {
  //     return value[value.length - 1]?.toUpperCase();
  //   }
  //   return typeof value === "string" ? value.toUpperCase() : null;
  // };

  const getArrayDateValue = (value) => {
    const formatToTitleCase = (input) =>
      input
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    if (Array.isArray(value) && value.length > 0) {
      return formatToTitleCase(value[value.length - 1]?.trim());
    }

    if (typeof value === "string") {
      return formatToTitleCase(value.trim());
    }

    return null;
  };

  const searchResult = (result) => {
    // console.log(result);

    const keysToSet = [
      "empID",
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
          ? result[key].toString().trim()
          : "";

      const toTitleCase = (input) =>
        input
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

      let value = toTitleCase(rawValue);

      if (
        key === "termiNotProb" ||
        key === "termiNotConf" ||
        key === "resignNotProb" ||
        key === "resignNotConf"
      ) {
        value = value.toUpperCase();
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
            [field]:
              parsedFiles.length > 0
                ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
                : "",
          }));
        } catch (error) {
          console.error(`Failed to parse ${field}:`, error);
        }
      }
    });
  };

  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath?.split("/").pop(); // Get file name with extension
    const fileName = fileNameWithExtension?.split(".").slice(0, -1).join("."); // Remove extension
    return fileName;
  };
  const onSubmit = async (data) => {
    try {
      // console.log("Received data:", data);  // Log the received data from the form

      // Find existing records
      const checkingPITable =
        empPIData?.find((match) => match.empID === data.empID) || null;
      const terminateDataRecord =
        terminateData?.find((match) => match.empID === data.empID) || null;
      const workInfoDataRecord =
        workInfoData?.find((match) => match.empID === data.empID) || null;
      const leaveDetailsDataRecord =
        leaveDetailsData?.find((match) => match.empID === data.empID) || null;
      const SRDataRecord =
        SRData?.find((match) => match.empID === data.empID) || null;

      // Check each record and handle accordingly
      if (SRDataRecord) {
        // If SRDataRecord exists, update SR data
        const workInfoUpValue = {
          ...data,
          SRDataRecord: SRDataRecord,
          uploadPR: JSON.stringify(nameServiceUp.uploadPR),
          uploadSP: JSON.stringify(nameServiceUp.uploadSP),
          uploadLP: JSON.stringify(nameServiceUp.uploadLP),
          uploadAL: JSON.stringify(nameServiceUp.uploadAL),
          uploadDep: JSON.stringify(nameServiceUp.uploadDep),
        };
        // console.log("SR Data Update Value:", workInfoUpValue);
        await WIUpdateData({ workInfoUpValue });
        // console.log("SR Update request sent");
      } else {
        // If SRDataRecord doesn't exist, create a new SR record
        const workInfoValue = {
          ...data,
          uploadPR: JSON.stringify(nameServiceUp.uploadPR),
          uploadSP: JSON.stringify(nameServiceUp.uploadSP),
          uploadLP: JSON.stringify(nameServiceUp.uploadLP),
          uploadAL: JSON.stringify(nameServiceUp.uploadAL),
          uploadDep: JSON.stringify(nameServiceUp.uploadDep),
        };
        // console.log("Create SR Data Value:", workInfoValue);
        await SubmitWIData({ workInfoValue });
        // console.log("SR Create request sent");
      }

      if (leaveDetailsDataRecord) {
        // If leaveDetailsDataRecord exists, update leave details data
        const workInfoUpValue = {
          ...data,
          leaveDetailsDataRecord: leaveDetailsDataRecord,
        };
        // console.log("Leave Details Update Value:", workInfoUpValue);
        await WIUpdateData({ workInfoUpValue });
        // console.log("Leave Details Update request sent");
      } else {
        // If leaveDetailsDataRecord doesn't exist, create a new leave details record
        const workInfoValue = {
          ...data,
          empID: data.empID,
        };
        // console.log("Create Leave Details Value:", workInfoValue);
        await SubmitWIData({ workInfoValue });
        // console.log("Leave Details Create request sent");
      }

      if (workInfoDataRecord) {
        const workInfoUpValue = {
          ...data,
          sapNo: checkingPITable?.sapNo,
          workInfoDataRecord: workInfoDataRecord,
          terminateDataRecord: terminateDataRecord,
          WIContract: JSON.stringify(nameServiceUp.WIContract),
          WIProbation: JSON.stringify(nameServiceUp.WIProbation),
          WIResignation: JSON.stringify(nameServiceUp.WIResignation),
          WITermination: JSON.stringify(nameServiceUp.WITermination),
          WILeaveEntitle: JSON.stringify(nameServiceUp.WILeaveEntitle),
          uploadPR: JSON.stringify(nameServiceUp.uploadPR),
          uploadSP: JSON.stringify(nameServiceUp.uploadSP),
          uploadLP: JSON.stringify(nameServiceUp.uploadLP),
          uploadAL: JSON.stringify(nameServiceUp.uploadAL),
          uploadDep: JSON.stringify(nameServiceUp.uploadDep),
        };
        // console.log("Work Info Update Value:", workInfoUpValue);
        await WIUpdateData({ workInfoUpValue });
        // console.log("Work Info Update request sent");
      } else {
        // If workInfoDataRecord doesn't exist, create a new work info record
        const workInfoValue = {
          ...data,
          sapNo: checkingPITable?.sapNo,
          WIContract: JSON.stringify(nameServiceUp.WIContract),
          WIProbation: JSON.stringify(nameServiceUp.WIProbation),
          WIResignation: JSON.stringify(nameServiceUp.WIResignation),
          WITermination: JSON.stringify(nameServiceUp.WITermination),
          WILeaveEntitle: JSON.stringify(nameServiceUp.WILeaveEntitle),
          uploadPR: JSON.stringify(nameServiceUp.uploadPR),
          uploadSP: JSON.stringify(nameServiceUp.uploadSP),
          uploadLP: JSON.stringify(nameServiceUp.uploadLP),
          uploadAL: JSON.stringify(nameServiceUp.uploadAL),
          uploadDep: JSON.stringify(nameServiceUp.uploadDep),
        };
        // console.log("Create Work Info Value:", workInfoValue);
        await SubmitWIData({ workInfoValue });
        // console.log("Work Info Create request sent");
      }

      if (terminateDataRecord) {
        // If terminateDataRecord exists, update terminate data
        const workInfoUpValue = {
          ...data,
          terminateDataRecord: terminateDataRecord,
          WIContract: JSON.stringify(nameServiceUp.WIContract),
          WIProbation: JSON.stringify(nameServiceUp.WIProbation),
          WIResignation: JSON.stringify(nameServiceUp.WIResignation),
          WITermination: JSON.stringify(nameServiceUp.WITermination),
          WILeaveEntitle: JSON.stringify(nameServiceUp.WILeaveEntitle),
          // Add specific properties to the update request if necessary
        };
        // console.log("Terminate Update Value:", workInfoUpValue);
        await WIUpdateData({ workInfoUpValue });
        // console.log("Terminate Update request sent");
      } else {
        // If terminateDataRecord doesn't exist, create a new terminate record
        const workInfoValue = {
          ...data,
          empID: data.empID,
          WIContract: JSON.stringify(nameServiceUp.WIContract),
          WIProbation: JSON.stringify(nameServiceUp.WIProbation),
          WIResignation: JSON.stringify(nameServiceUp.WIResignation),
          WITermination: JSON.stringify(nameServiceUp.WITermination),
          WILeaveEntitle: JSON.stringify(nameServiceUp.WILeaveEntitle),
          // Include other fields as necessary
        };
        // console.log("Create Terminate Data Value:", workInfoValue);
        await SubmitWIData({ workInfoValue });
        // console.log("Terminate Create request sent");
      }

      // If you want to show a success notification or message
      setShowTitle("Employee Work Info Stored successfully");
      setNotification(true);
    } catch (err) {
      console.log("Error during submission:", err);
    }
  };
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
                  {(field.options || []).map((option, i) => {
                    const formattedOption = option
                      .trim()
                      .toLowerCase()
                      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter
                    return (
                      <option
                        key={i}
                        value={option.trim() === "Select" ? "" : option.trim()}
                      >
                        {formattedOption}
                      </option>
                    );
                  })}
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
                          {formattedOption}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    {...register(field.name)}
                    // defaultValue={field.value || ""}
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
                              {optionLabel}
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
                  <label className="mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="application/pdf"
                      onChange={(e) =>
                        handleFileChange(e, field.title, watchedEmpID)
                      } // Pass field label for dynamic handling
                    />
                    <span className="ml-2 text-grey font-normal flex justify-between items-center gap-10">
                      {field.icon}
                      {field.label}
                    </span>
                  </label>
                  <p className="text-xs mt-1 text-grey">
                    {uploadedFileNames?.[field.title] || ""}
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
                  errors={errors}
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
    </section>
  );
};