/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { EmployeeWorkInfo } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function EmployeeWorkInfoUpdateForm(props) {
  const {
    id: idProp,
    employeeWorkInfo: employeeWorkInfoModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    empID: "",
    dateOfJoin: "",
    department: "",
    workPosition: "",
    upgradePosition: "",
    jobDescription: "",
    skillPool: "",
    workStatus: "",
    contractStartDate: "",
    contractEndDate: "",
    contractPeriodStatus: "",
    ProbationaryStartDate: "",
    ProbationaryEndDate: "",
    normalWorkingHours: "",
    normalWorkingWeek: "",
    salaryType: "",
    normalWorkingMonth: "",
    employmentWorkStatus: "",
    jobCategory: "",
    otherJobCategory: "",
    upgradeDate: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [dateOfJoin, setDateOfJoin] = React.useState(initialValues.dateOfJoin);
  const [department, setDepartment] = React.useState(initialValues.department);
  const [workPosition, setWorkPosition] = React.useState(
    initialValues.workPosition
  );
  const [upgradePosition, setUpgradePosition] = React.useState(
    initialValues.upgradePosition
  );
  const [jobDescription, setJobDescription] = React.useState(
    initialValues.jobDescription
  );
  const [skillPool, setSkillPool] = React.useState(initialValues.skillPool);
  const [workStatus, setWorkStatus] = React.useState(initialValues.workStatus);
  const [contractStartDate, setContractStartDate] = React.useState(
    initialValues.contractStartDate
  );
  const [contractEndDate, setContractEndDate] = React.useState(
    initialValues.contractEndDate
  );
  const [contractPeriodStatus, setContractPeriodStatus] = React.useState(
    initialValues.contractPeriodStatus
  );
  const [ProbationaryStartDate, setProbationaryStartDate] = React.useState(
    initialValues.ProbationaryStartDate
  );
  const [ProbationaryEndDate, setProbationaryEndDate] = React.useState(
    initialValues.ProbationaryEndDate
  );
  const [normalWorkingHours, setNormalWorkingHours] = React.useState(
    initialValues.normalWorkingHours
  );
  const [normalWorkingWeek, setNormalWorkingWeek] = React.useState(
    initialValues.normalWorkingWeek
  );
  const [salaryType, setSalaryType] = React.useState(initialValues.salaryType);
  const [normalWorkingMonth, setNormalWorkingMonth] = React.useState(
    initialValues.normalWorkingMonth
  );
  const [employmentWorkStatus, setEmploymentWorkStatus] = React.useState(
    initialValues.employmentWorkStatus
  );
  const [jobCategory, setJobCategory] = React.useState(
    initialValues.jobCategory
  );
  const [otherJobCategory, setOtherJobCategory] = React.useState(
    initialValues.otherJobCategory
  );
  const [upgradeDate, setUpgradeDate] = React.useState(
    initialValues.upgradeDate
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = employeeWorkInfoRecord
      ? { ...initialValues, ...employeeWorkInfoRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setDateOfJoin(cleanValues.dateOfJoin);
    setDepartment(cleanValues.department);
    setWorkPosition(cleanValues.workPosition);
    setUpgradePosition(cleanValues.upgradePosition);
    setJobDescription(cleanValues.jobDescription);
    setSkillPool(cleanValues.skillPool);
    setWorkStatus(cleanValues.workStatus);
    setContractStartDate(cleanValues.contractStartDate);
    setContractEndDate(cleanValues.contractEndDate);
    setContractPeriodStatus(cleanValues.contractPeriodStatus);
    setProbationaryStartDate(cleanValues.ProbationaryStartDate);
    setProbationaryEndDate(cleanValues.ProbationaryEndDate);
    setNormalWorkingHours(cleanValues.normalWorkingHours);
    setNormalWorkingWeek(cleanValues.normalWorkingWeek);
    setSalaryType(cleanValues.salaryType);
    setNormalWorkingMonth(cleanValues.normalWorkingMonth);
    setEmploymentWorkStatus(cleanValues.employmentWorkStatus);
    setJobCategory(cleanValues.jobCategory);
    setOtherJobCategory(cleanValues.otherJobCategory);
    setUpgradeDate(cleanValues.upgradeDate);
    setErrors({});
  };
  const [employeeWorkInfoRecord, setEmployeeWorkInfoRecord] = React.useState(
    employeeWorkInfoModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(EmployeeWorkInfo, idProp)
        : employeeWorkInfoModelProp;
      setEmployeeWorkInfoRecord(record);
    };
    queryData();
  }, [idProp, employeeWorkInfoModelProp]);
  React.useEffect(resetStateValues, [employeeWorkInfoRecord]);
  const validations = {
    empID: [{ type: "Required" }],
    dateOfJoin: [{ type: "Required" }],
    department: [],
    workPosition: [],
    upgradePosition: [{ type: "Required" }],
    jobDescription: [{ type: "Required" }],
    skillPool: [{ type: "Required" }],
    workStatus: [{ type: "Required" }],
    contractStartDate: [{ type: "Required" }],
    contractEndDate: [{ type: "Required" }],
    contractPeriodStatus: [{ type: "Required" }],
    ProbationaryStartDate: [{ type: "Required" }],
    ProbationaryEndDate: [{ type: "Required" }],
    normalWorkingHours: [{ type: "Required" }],
    normalWorkingWeek: [{ type: "Required" }],
    salaryType: [{ type: "Required" }],
    normalWorkingMonth: [],
    employmentWorkStatus: [{ type: "Required" }],
    jobCategory: [{ type: "Required" }],
    otherJobCategory: [],
    upgradeDate: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          empID,
          dateOfJoin,
          department,
          workPosition,
          upgradePosition,
          jobDescription,
          skillPool,
          workStatus,
          contractStartDate,
          contractEndDate,
          contractPeriodStatus,
          ProbationaryStartDate,
          ProbationaryEndDate,
          normalWorkingHours,
          normalWorkingWeek,
          salaryType,
          normalWorkingMonth,
          employmentWorkStatus,
          jobCategory,
          otherJobCategory,
          upgradeDate,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            EmployeeWorkInfo.copyOf(employeeWorkInfoRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "EmployeeWorkInfoUpdateForm")}
      {...rest}
    >
      <TextField
        label="Emp id"
        isRequired={true}
        isReadOnly={false}
        value={empID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID: value,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.empID ?? value;
          }
          if (errors.empID?.hasError) {
            runValidationTasks("empID", value);
          }
          setEmpID(value);
        }}
        onBlur={() => runValidationTasks("empID", empID)}
        errorMessage={errors.empID?.errorMessage}
        hasError={errors.empID?.hasError}
        {...getOverrideProps(overrides, "empID")}
      ></TextField>
      <TextField
        label="Date of join"
        isRequired={true}
        isReadOnly={false}
        value={dateOfJoin}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin: value,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.dateOfJoin ?? value;
          }
          if (errors.dateOfJoin?.hasError) {
            runValidationTasks("dateOfJoin", value);
          }
          setDateOfJoin(value);
        }}
        onBlur={() => runValidationTasks("dateOfJoin", dateOfJoin)}
        errorMessage={errors.dateOfJoin?.errorMessage}
        hasError={errors.dateOfJoin?.hasError}
        {...getOverrideProps(overrides, "dateOfJoin")}
      ></TextField>
      <TextField
        label="Department"
        isRequired={false}
        isReadOnly={false}
        value={department}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department: value,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.department ?? value;
          }
          if (errors.department?.hasError) {
            runValidationTasks("department", value);
          }
          setDepartment(value);
        }}
        onBlur={() => runValidationTasks("department", department)}
        errorMessage={errors.department?.errorMessage}
        hasError={errors.department?.hasError}
        {...getOverrideProps(overrides, "department")}
      ></TextField>
      <TextField
        label="Work position"
        isRequired={false}
        isReadOnly={false}
        value={workPosition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition: value,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.workPosition ?? value;
          }
          if (errors.workPosition?.hasError) {
            runValidationTasks("workPosition", value);
          }
          setWorkPosition(value);
        }}
        onBlur={() => runValidationTasks("workPosition", workPosition)}
        errorMessage={errors.workPosition?.errorMessage}
        hasError={errors.workPosition?.hasError}
        {...getOverrideProps(overrides, "workPosition")}
      ></TextField>
      <TextField
        label="Upgrade position"
        isRequired={true}
        isReadOnly={false}
        value={upgradePosition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition: value,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.upgradePosition ?? value;
          }
          if (errors.upgradePosition?.hasError) {
            runValidationTasks("upgradePosition", value);
          }
          setUpgradePosition(value);
        }}
        onBlur={() => runValidationTasks("upgradePosition", upgradePosition)}
        errorMessage={errors.upgradePosition?.errorMessage}
        hasError={errors.upgradePosition?.hasError}
        {...getOverrideProps(overrides, "upgradePosition")}
      ></TextField>
      <TextField
        label="Job description"
        isRequired={true}
        isReadOnly={false}
        value={jobDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription: value,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.jobDescription ?? value;
          }
          if (errors.jobDescription?.hasError) {
            runValidationTasks("jobDescription", value);
          }
          setJobDescription(value);
        }}
        onBlur={() => runValidationTasks("jobDescription", jobDescription)}
        errorMessage={errors.jobDescription?.errorMessage}
        hasError={errors.jobDescription?.hasError}
        {...getOverrideProps(overrides, "jobDescription")}
      ></TextField>
      <TextField
        label="Skill pool"
        isRequired={true}
        isReadOnly={false}
        value={skillPool}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool: value,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.skillPool ?? value;
          }
          if (errors.skillPool?.hasError) {
            runValidationTasks("skillPool", value);
          }
          setSkillPool(value);
        }}
        onBlur={() => runValidationTasks("skillPool", skillPool)}
        errorMessage={errors.skillPool?.errorMessage}
        hasError={errors.skillPool?.hasError}
        {...getOverrideProps(overrides, "skillPool")}
      ></TextField>
      <TextField
        label="Work status"
        isRequired={true}
        isReadOnly={false}
        value={workStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus: value,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.workStatus ?? value;
          }
          if (errors.workStatus?.hasError) {
            runValidationTasks("workStatus", value);
          }
          setWorkStatus(value);
        }}
        onBlur={() => runValidationTasks("workStatus", workStatus)}
        errorMessage={errors.workStatus?.errorMessage}
        hasError={errors.workStatus?.hasError}
        {...getOverrideProps(overrides, "workStatus")}
      ></TextField>
      <TextField
        label="Contract start date"
        isRequired={true}
        isReadOnly={false}
        value={contractStartDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate: value,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.contractStartDate ?? value;
          }
          if (errors.contractStartDate?.hasError) {
            runValidationTasks("contractStartDate", value);
          }
          setContractStartDate(value);
        }}
        onBlur={() =>
          runValidationTasks("contractStartDate", contractStartDate)
        }
        errorMessage={errors.contractStartDate?.errorMessage}
        hasError={errors.contractStartDate?.hasError}
        {...getOverrideProps(overrides, "contractStartDate")}
      ></TextField>
      <TextField
        label="Contract end date"
        isRequired={true}
        isReadOnly={false}
        value={contractEndDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate: value,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.contractEndDate ?? value;
          }
          if (errors.contractEndDate?.hasError) {
            runValidationTasks("contractEndDate", value);
          }
          setContractEndDate(value);
        }}
        onBlur={() => runValidationTasks("contractEndDate", contractEndDate)}
        errorMessage={errors.contractEndDate?.errorMessage}
        hasError={errors.contractEndDate?.hasError}
        {...getOverrideProps(overrides, "contractEndDate")}
      ></TextField>
      <TextField
        label="Contract period status"
        isRequired={true}
        isReadOnly={false}
        value={contractPeriodStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus: value,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.contractPeriodStatus ?? value;
          }
          if (errors.contractPeriodStatus?.hasError) {
            runValidationTasks("contractPeriodStatus", value);
          }
          setContractPeriodStatus(value);
        }}
        onBlur={() =>
          runValidationTasks("contractPeriodStatus", contractPeriodStatus)
        }
        errorMessage={errors.contractPeriodStatus?.errorMessage}
        hasError={errors.contractPeriodStatus?.hasError}
        {...getOverrideProps(overrides, "contractPeriodStatus")}
      ></TextField>
      <TextField
        label="Probationary start date"
        isRequired={true}
        isReadOnly={false}
        value={ProbationaryStartDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate: value,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.ProbationaryStartDate ?? value;
          }
          if (errors.ProbationaryStartDate?.hasError) {
            runValidationTasks("ProbationaryStartDate", value);
          }
          setProbationaryStartDate(value);
        }}
        onBlur={() =>
          runValidationTasks("ProbationaryStartDate", ProbationaryStartDate)
        }
        errorMessage={errors.ProbationaryStartDate?.errorMessage}
        hasError={errors.ProbationaryStartDate?.hasError}
        {...getOverrideProps(overrides, "ProbationaryStartDate")}
      ></TextField>
      <TextField
        label="Probationary end date"
        isRequired={true}
        isReadOnly={false}
        value={ProbationaryEndDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate: value,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.ProbationaryEndDate ?? value;
          }
          if (errors.ProbationaryEndDate?.hasError) {
            runValidationTasks("ProbationaryEndDate", value);
          }
          setProbationaryEndDate(value);
        }}
        onBlur={() =>
          runValidationTasks("ProbationaryEndDate", ProbationaryEndDate)
        }
        errorMessage={errors.ProbationaryEndDate?.errorMessage}
        hasError={errors.ProbationaryEndDate?.hasError}
        {...getOverrideProps(overrides, "ProbationaryEndDate")}
      ></TextField>
      <TextField
        label="Normal working hours"
        isRequired={true}
        isReadOnly={false}
        value={normalWorkingHours}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours: value,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.normalWorkingHours ?? value;
          }
          if (errors.normalWorkingHours?.hasError) {
            runValidationTasks("normalWorkingHours", value);
          }
          setNormalWorkingHours(value);
        }}
        onBlur={() =>
          runValidationTasks("normalWorkingHours", normalWorkingHours)
        }
        errorMessage={errors.normalWorkingHours?.errorMessage}
        hasError={errors.normalWorkingHours?.hasError}
        {...getOverrideProps(overrides, "normalWorkingHours")}
      ></TextField>
      <TextField
        label="Normal working week"
        isRequired={true}
        isReadOnly={false}
        value={normalWorkingWeek}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek: value,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.normalWorkingWeek ?? value;
          }
          if (errors.normalWorkingWeek?.hasError) {
            runValidationTasks("normalWorkingWeek", value);
          }
          setNormalWorkingWeek(value);
        }}
        onBlur={() =>
          runValidationTasks("normalWorkingWeek", normalWorkingWeek)
        }
        errorMessage={errors.normalWorkingWeek?.errorMessage}
        hasError={errors.normalWorkingWeek?.hasError}
        {...getOverrideProps(overrides, "normalWorkingWeek")}
      ></TextField>
      <TextField
        label="Salary type"
        isRequired={true}
        isReadOnly={false}
        value={salaryType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType: value,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.salaryType ?? value;
          }
          if (errors.salaryType?.hasError) {
            runValidationTasks("salaryType", value);
          }
          setSalaryType(value);
        }}
        onBlur={() => runValidationTasks("salaryType", salaryType)}
        errorMessage={errors.salaryType?.errorMessage}
        hasError={errors.salaryType?.hasError}
        {...getOverrideProps(overrides, "salaryType")}
      ></TextField>
      <TextField
        label="Normal working month"
        isRequired={false}
        isReadOnly={false}
        value={normalWorkingMonth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth: value,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.normalWorkingMonth ?? value;
          }
          if (errors.normalWorkingMonth?.hasError) {
            runValidationTasks("normalWorkingMonth", value);
          }
          setNormalWorkingMonth(value);
        }}
        onBlur={() =>
          runValidationTasks("normalWorkingMonth", normalWorkingMonth)
        }
        errorMessage={errors.normalWorkingMonth?.errorMessage}
        hasError={errors.normalWorkingMonth?.hasError}
        {...getOverrideProps(overrides, "normalWorkingMonth")}
      ></TextField>
      <TextField
        label="Employment work status"
        isRequired={true}
        isReadOnly={false}
        value={employmentWorkStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus: value,
              jobCategory,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.employmentWorkStatus ?? value;
          }
          if (errors.employmentWorkStatus?.hasError) {
            runValidationTasks("employmentWorkStatus", value);
          }
          setEmploymentWorkStatus(value);
        }}
        onBlur={() =>
          runValidationTasks("employmentWorkStatus", employmentWorkStatus)
        }
        errorMessage={errors.employmentWorkStatus?.errorMessage}
        hasError={errors.employmentWorkStatus?.hasError}
        {...getOverrideProps(overrides, "employmentWorkStatus")}
      ></TextField>
      <TextField
        label="Job category"
        isRequired={true}
        isReadOnly={false}
        value={jobCategory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory: value,
              otherJobCategory,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.jobCategory ?? value;
          }
          if (errors.jobCategory?.hasError) {
            runValidationTasks("jobCategory", value);
          }
          setJobCategory(value);
        }}
        onBlur={() => runValidationTasks("jobCategory", jobCategory)}
        errorMessage={errors.jobCategory?.errorMessage}
        hasError={errors.jobCategory?.hasError}
        {...getOverrideProps(overrides, "jobCategory")}
      ></TextField>
      <TextField
        label="Other job category"
        isRequired={false}
        isReadOnly={false}
        value={otherJobCategory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory: value,
              upgradeDate,
            };
            const result = onChange(modelFields);
            value = result?.otherJobCategory ?? value;
          }
          if (errors.otherJobCategory?.hasError) {
            runValidationTasks("otherJobCategory", value);
          }
          setOtherJobCategory(value);
        }}
        onBlur={() => runValidationTasks("otherJobCategory", otherJobCategory)}
        errorMessage={errors.otherJobCategory?.errorMessage}
        hasError={errors.otherJobCategory?.hasError}
        {...getOverrideProps(overrides, "otherJobCategory")}
      ></TextField>
      <TextField
        label="Upgrade date"
        isRequired={true}
        isReadOnly={false}
        value={upgradeDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              dateOfJoin,
              department,
              workPosition,
              upgradePosition,
              jobDescription,
              skillPool,
              workStatus,
              contractStartDate,
              contractEndDate,
              contractPeriodStatus,
              ProbationaryStartDate,
              ProbationaryEndDate,
              normalWorkingHours,
              normalWorkingWeek,
              salaryType,
              normalWorkingMonth,
              employmentWorkStatus,
              jobCategory,
              otherJobCategory,
              upgradeDate: value,
            };
            const result = onChange(modelFields);
            value = result?.upgradeDate ?? value;
          }
          if (errors.upgradeDate?.hasError) {
            runValidationTasks("upgradeDate", value);
          }
          setUpgradeDate(value);
        }}
        onBlur={() => runValidationTasks("upgradeDate", upgradeDate)}
        errorMessage={errors.upgradeDate?.errorMessage}
        hasError={errors.upgradeDate?.hasError}
        {...getOverrideProps(overrides, "upgradeDate")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || employeeWorkInfoModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || employeeWorkInfoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
