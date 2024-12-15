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
import { leavePassDD, workInfoUploads } from "../../../utils/DropDownMenus";
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
  const { empPIData, terminateData, workInfoData, leaveDetailsData, SRData } =
    useContext(DataSupply);

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
    },
    resolver: yupResolver(WorkInfoSchema),
  });

  const [notification, setNotification] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const watchedEmpID = watch("empID");

  const [empName, setEmpName] = useState("");

  const [selection, setSelection] = useState({
    department: "",
    position: "",
    jobCat: "",
    // Add other fields here if needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelection((prevSelection) => ({
      ...prevSelection,
      [name]: value,
    }));
  };

  const watchFields = watch(
    WorkDataPass.terminationFields.map((field) => field.name)
  );

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

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const getArrayDateValue = (value) => {
    return Array.isArray(value) ? value[value.length - 1] : value;
  };

  const searchResult = (result) => {
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
      "remainingAnualLeave", "remainingCompasLeave", "remainingHosLeave", "remainingMateLeave", "remainingMrageLeave", "remainingPaternityLeave", "remainingSickLeave"

      

    ];

    keysToSet.forEach((key) => {
      setValue(key, result[key]);
    });
    const fields = [
    ];
    
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
      "hr",
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

    arrayDateField.forEach((field) => {
      setValue(field, getArrayDateValue(result[field]));
    });

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

    fields.forEach((field) => {
      const value = getLastValue(result[field]); // Pass the field name to the function
      setValue(field, [value]);
    });

    uploadFields.forEach((field) => {
      if (result[field]) {
        try {
          const rawArrayString = result[field][0]; // Access the first element of the array
      
          const trimmedString = rawArrayString.startsWith('"') && rawArrayString.endsWith('"')
            ? rawArrayString.slice(1, -1)
            : rawArrayString;
            
        
          const properJsonString = trimmedString.replace(/\\"/g, '"');

          const parsedArray = JSON.parse(properJsonString);

          if (!Array.isArray(parsedArray)) {
            throw new Error(`Parsed result is not an array for ${field}`);
          }

          // Parse each item in the array
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

    // // Update state for other fields visibility
    // setShowOtherFields({
    //   department: result.department === "Other",
    //   position: result.position === "Other",
    //   jobCat: result.jobCat === "Other",
    // });
  };

  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileName;
  };

  const onSubmit = async (data) => {
    console.log("Date upgrade", data);

    try {
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
      if (
        SRDataRecord &&
        leaveDetailsDataRecord &&
        workInfoDataRecord &&
        terminateDataRecord &&
        checkingPITable
      ) {
        const workInfoUpValue = {
          ...data,
          remainingAnualLeave: data?.annualLeave?.[0] || "0",  // Fixing the syntax
          remainingCompasLeave: data?.compasLeave || "0",
          remainingHosLeave: data?.hospLeave || "0",
          remainingMateLeave: data?.materLeave || "0",
          remainingMrageLeave: data?.mrageLeave || "0",
          remainingPaternityLeave: data?.paterLeave || "0",
          remainingSickLeave: data?.sickLeave || "0",
          unPaidAuthorize: "0",
          SRDataRecord: SRDataRecord,
          leaveDetailsDataRecord: {
            ...leaveDetailsDataRecord,
            remainingAnualLeave: data?.annualLeave?.[0] || "0",  // Fixing the syntax
            remainingCompasLeave: data?.compasLeave || "0",
            remainingHosLeave: data?.hospLeave || "0",
            remainingMateLeave: data?.materLeave || "0",
            remainingMrageLeave: data?.mrageLeave || "0",
            remainingPaternityLeave: data?.paterLeave || "0",
            remainingSickLeave: data?.sickLeave || "0",
            unPaidAuthorize: "0",
          },
          
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
        console.log("Update Value",workInfoUpValue);
        await WIUpdateData({ workInfoUpValue });
        setShowTitle("Employee Work Info Updated successfully");
        setNotification(true);

      } else {
        const workInfoValue = {
          ...data,        
            remainingAnualLeave: data?.annualLeave || "0", // Default to "0" if no value is provided
            remainingCompasLeave: data?.compasLeave || "0",
            remainingHosLeave: data?.hospLeave || "0",
            remainingMateLeave: data?.materLeave || "0",
            remainingMrageLeave: data?.mrageLeave || "0",
            remainingPaternityLeave: data?.paterLeave || "0",
            remainingSickLeave: data?.sickLeave || "0",
            unPaidAuthorize: "0",
        
          sapNo: checkingPITable.sapNo,
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
        // console.log("Create Value", workInfoValue)
        await SubmitWIData({ workInfoValue });
        setShowTitle("Employee Work Info saved successfully");
        setNotification(true);
      }
    } catch (err) {
      console.log(err);
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
        />

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
        <WIRowTwo register={register} errors={errors} watch={watch} />
        <WIRowThree register={register} errors={errors} watch={watch} />
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

            {WorkDataPass.leaveBasic.map((field, index) => (
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
            {WorkDataPass.leaveFieldsAnother.map((field, index) => (
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
            {WorkDataPass.serviceRecords.map((field, index) => {
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
          path="/employee"
        />
      )}
    </section>
  );
};
