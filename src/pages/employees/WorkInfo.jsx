import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useOutletContext } from "react-router-dom";
import { WorkInfoSchema } from "../../services/EmployeeValidation";
import { FaArrowLeft } from "react-icons/fa";
import { SearchDisplay } from "../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { WorkInfoFunc } from "../../services/createMethod/WorkInfoFunc";
import { WorkDataPass } from "../employees/WorkDataPass";
import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
import { FormField } from "../../utils/FormField";
import { DataSupply } from "../../utils/DataStoredContext";
import {
  DepartmentDD,
  JobCatDD,
  workInfoUploads,
} from "../../utils/DropDownMenus";
import { UploadingFiles } from "../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../utils/SpinLogo";
import { UpdateWIData } from "../../services/updateMethod/UpdateWIData";

export const WorkInfo = () => {
  const { WIUpdateData } = UpdateWIData();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { empPIData, terminateData, workInfoData, leaveDetailsData, SRData } =
    useContext(DataSupply);

  const { SubmitWIData } = WorkInfoFunc();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
    uploadAL: [], 
    uploadPR: [],
    uploadSP: [],
    uploadLP: [],
    uploadDep: [],
    WIProbation: [],
    WIResignation: [],
    WITermination: [],
    WILeaveEntitle: [],
    WIContract: [],
    },
    resolver: yupResolver(WorkInfoSchema),
  });

  const [notification, setNotification] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [showTitle, setShowTitle] = useState("");

  const empID = watch("empID");
  const [empName, setEmpName] = useState("");
  const [sapNo, setSapNo] = useState("");

  // Watch specific fields
  const department = watch("department");
  const position = watch("position");
  const jobCat = watch("jobCat");
  const watchFields = watch(
    WorkDataPass.terminationFields.map((field) => field.name)
  );
  useEffect(() => {
    empPIData.map((items) => {
      if (empID === items.empID) {
        setEmpName(items.name);
        setSapNo(items.sapNo);
      }
    });
  }, [empID, empPIData]);
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
  const [showOtherFields, setShowOtherFields] = useState({
    department: false,
    position: false,
    jobCat: false,
 
  });

  const handleSelectChange = (fieldName, value) => {
    setShowOtherFields((prev) => ({
      ...prev,
      [fieldName]: value === "Other",
    }));
  };
  
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

  // Watch changes in department, position, and jobCat to dynamically show "Other" fields
  useEffect(() => {
    const currentDepartment = getLastValue(watch("department"));
    const currentPosition = getLastValue(watch("position"));
    const currentJobCat = getLastValue(watch("jobCat"));

    setShowOtherFields({
      department: currentDepartment === "Other",
      position: currentPosition === "Other",
      jobCat: currentJobCat === "Other",
    });
  }, [watch("department"), watch("position"), watch("jobCat")]);

  const handleFileChange = async (e, label) => {
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
      await uploadDocs(selectedFile, label, setNameServiceUp);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const searchResult = (result) => {
    const keysToSet = [
      "empID",
      "doj",
      "skillPool",
      "probationStart",
      "probationEnd",
      "probDuration",
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
      "sickLeave",
      "sickLeaveDate",
      "mrageLeave",
      "mrageLeaveDate",
      "compasLeave",
      "compasLeaveDate",
      "sapNo",
    ];

    keysToSet.forEach((key) => {
      setValue(key, result[key]);
    });

    const fields = [
      "department",
      "otherDepartment",
      "position",
      "otherPosition",
      "jobCat",
      "otherJobCat",
      "jobDesc",
      "relationship",
      "hr",
      "manager",
      "supervisor",
      "upgradePosition",
      "upgradeDate",
      "contractPeriod",
      "contractStart",
      "paterLeaveDate",
      "contractEnd",
      "workStatus",
      "workHrs",
      "workWeek",
      "workMonth",
      "salaryType",
      "leavePass",
      "dateLeavePass",
      "destinateLeavePass",
      "durLeavePass",
      "annualLeave",
      "annualLeaveDate",
      "materLeave",
      "materLeaveDate",
      "paterLeave",
      "positionRev",
      "positionRevDate",
      "revSalary",
      "revSalaryDate",
      "revLeavePass",
      "revLeaveDate",
      "revAnnualLeave",
      "revALD",
      "depEmp",
      "depEmpDate",
      "remarkWI",
    ];
    fields.forEach((field) => setValue(field, getLastValue(result[field])));

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

    uploadFields.map((field) => {

      if (result && result[field]) {
        try {
          // Parse the field data if it exists
          const parsedArray = JSON.parse(result[field]);

          // Then, parse each element inside the array (if it's stringified as well)
          const parsedFiles = parsedArray.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          );
          setValue(field, parsedFiles);

          setNameServiceUp((prev) => ({
            ...prev,
            [field]: parsedFiles, // Dynamically set based on field name
          }));

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
    // Update `showOtherFields` state
    setShowOtherFields({
      department: result.department === "Other",
      position: result.position === "Other",
      jobCat: result.jobCat === "Other",
    });
  };

  function getFileName(url) {
    const urlObj = new URL(url);
    const filePath = urlObj.pathname;

    const decodedUrl = decodeURIComponent(filePath);

    // Extract the file name after the last '/' in the path
    const fileNameWithExtension = decodedUrl.substring(
      decodedUrl.lastIndexOf("/") + 1
    );

    return fileNameWithExtension;
  }

  const onSubmit = async (data) => {
    console.log("Form data received in onSubmit:", data);

    try {
      const checkingPITable = empPIData
        ? empPIData.find((match) => match.empID === data.empID)
        : {};
      const terminateDataRecord = terminateData
        ? terminateData.find((match) => match.empID === data.empID)
        : {};
      const workInfoDataRecord = workInfoData
        ? workInfoData.find((match) => match.empID === data.empID)
        : {};
      const leaveDetailsDataRecord = leaveDetailsData
        ? leaveDetailsData.find((match) => match.empID === data.empID)
        : {};
      const SRDataRecord = SRData
        ? SRData.find((match) => match.empID === data.empID)
        : {};

      if (
        SRDataRecord &&
        leaveDetailsDataRecord &&
        workInfoDataRecord &&
        terminateDataRecord &&
        checkingPITable
      ) {
        // Update the existing entry
        const workInfoUpValue = {
          ...data,
          sapNo: sapNo,
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
          SRDRTable: SRDataRecord.id,
          LDRTable: leaveDetailsDataRecord.id,
          WIDTable: workInfoDataRecord.id,
          TDRTable: terminateDataRecord.id,
        };
        // console.log("Prepared workInfoUpValue for update:", workInfoUpValue);

        await WIUpdateData({ workInfoUpValue });
        setShowTitle("Employee Work Info Updated successfully");
        setNotification(true);
      } else {
        // Create new entry if the data is not found
        const workInfoValue = {
          ...data,
          sapNo: sapNo,
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
        // console.log("Prepared workInfoValue for submission:", workInfoValue);
        await SubmitWIData({ workInfoValue });
        setShowTitle("Employee Work Info saved successfully");
        setNotification(true);
      }
    } catch (error) {
      console.log(error);
      console.error("Error submitting data:", error);
    }
  };

  return (
    <section className="bg-[#F5F6F1CC] mx-auto p-10">
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
        <div className="grid grid-cols-2 gap-5 form-group mt-2">
          <div>
            <FormField
              label="Department"
              type="select"
              name="department"
              select="Select Department"
              options={[...DepartmentDD]} // Ensure "Other" is in the options
              errors={errors}
              register={register}
              onChange={(e) => {
                handleSelectChange("department", e.target.value); // Update visibility of "Other" input
                register("department").onChange(e); // Ensures proper registration
              }}
            />
          </div>

          {/* Conditionally render the "Other Department" input field */}
          {showOtherFields.department && department === "Other" && (
            <div>
              <FormField
                label="Other Department"
                type="text"
                name="otherDepartment"
                placeholder="Enter Department"
                errors={errors}
                register={register}
              />
            </div>
          )}
        </div>

        {/* Position Field */}
        <div className="grid grid-cols-2 gap-5 form-group mt-2">
          <div>
            <FormField
              label="Position"
              type="select"
              name="position"
              select="Select Position"
              options={[
                ...WorkDataPass.positions.map((position) => ({
                  value: position,
                  label: position,
                })),
                // { value: "Other", label: "Other" },
              ]}
              errors={errors}
              register={register}
              onChange={(e) => {
                handleSelectChange("position", e.target.value); // Update visibility of "Other" input
                register("position").onChange(e); // Ensures proper registration
              }}
            />
          </div>

          {/* Conditionally render the "Other Position" input field */}
          {showOtherFields.position && position === "Other" && (
            <div>
              <FormField
                label="Other Position"
                type="text"
                name="otherPosition"
                placeholder="Enter Position"
                errors={errors}
                register={register}
              />
            </div>
          )}
        </div>

        {/* Job Category Field */}
        <div className="grid grid-cols-2 gap-5 form-group mt-2">
          <div>
            <FormField
              label="Job Category"
              type="select"
              name="jobCat"
              select="Select Job Category"
              options={[...JobCatDD]} // Ensure "Other" is in the options
              errors={errors}
              register={register}
              onChange={(e) => {
                handleSelectChange("jobCat", e.target.value); // Update visibility of "Other" input
                register("jobCat").onChange(e); // Ensures proper registration
              }}
            />
          </div>

          {/* Conditionally render the "Other Job Category" input field */}
          {showOtherFields.jobCat && jobCat === "Other" && (
            <div>
              <FormField
                label="Other Job Category"
                type="text"
                name="otherJobCat"
                placeholder="Enter Job Category"
                errors={errors}
                register={register}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-5 form-group mt-5">
          {WorkDataPass.workFields.map((field, index) => (
            <div key={index} className="form-group">
              <label className="mb-1 text_size_5">{field.label}</label>
              {field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="input-field select-custom"
                  watch={watch(field.name)}
                >
                  {(field.options || []).map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  {...register(field.name)}
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
        <hr className="text-lite_grey mb-5" />

        <div className="form-group">
          <p className="text_size_3 form-group text-medium_grey my-5">
            Employee Leave Info
          </p>
          <div className="grid grid-cols-2 gap-5 form-group mt-5">
            {WorkDataPass.leaveBasic.map((field, index) => (
              <div key={index} className="form-group">
                <label className="mb-1 text_size_5">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    {...register(field.name)}
                    className="input-field select-custom"
                  >
                    {(field.options || []).map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    {...register(field.name)}
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
          <div className="grid grid-cols-4 gap-5 form-group mt-5">
            {WorkDataPass.leaveFields.map((field, index) => (
              <div key={index} className="form-group">
                <label className="mb-1 text_size_5">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    {...register(field.name)}
                    className="input-field select-custom"
                  >
                    {(field.options || []).map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    {...register(field.name)}
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
            {WorkDataPass.terminationFields.map((field, index) => {
              const selectedValue = watchFields[index]; // Get the watched value for the current field
              const isOtherSelected = selectedValue === "other";

              return (
                <div key={index} className="form-group">
                  <label className="block text_size_5">{field.label}</label>
                  {field.type === "select" ? (
                    <>
                      <select
                        {...register(field.name)}
                        className="input-field select-custom"
                      >
                        {field.options.map((option, i) => (
                          <option
                            key={i}
                            value={
                              option === "Select" ? "" : option.toLowerCase()
                            }
                          >
                            {option}
                          </option>
                        ))}
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
                      accept=".pdf,image/jpeg,image/png"
                      onChange={(e) => handleFileChange(e, field.title)} // Pass field label for dynamic handling
                    />
                    <span className="ml-2 text-grey font-normal flex justify-between items-center gap-10">
                      {field.icon}
                      {field.label}
                    </span>
                  </label>
                  <p className="text-xs mt-1 text-grey">
                    {uploadedFileNames?.[field.title] || ""}
                  </p>
                  {/* Display validation error if any */}
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
          <div className="grid grid-cols-3 gap-5">
            {WorkDataPass.serviceRecords.map((field, index) => (
              <UploadingFiles
                key={index}
                field={field}
                register={register}
                handleFileChange={handleFileChange}
                uploadedFileNames={uploadedFileNames}
                errors={errors}
              />
            ))}
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
            path="/employee"
          />
        )}
    </section>
  );
};
