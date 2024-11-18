/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getWorkInfoSchema1 } from "../graphql/queries";
import { updateWorkInfoSchema1 } from "../graphql/mutations";
const client = generateClient();
export default function WorkInfoSchema1UpdateForm(props) {
  const {
    id: idProp,
    workInfoSchema1: workInfoSchema1ModelProp,
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
    probationaryStartDate: "",
    probationaryEndDate: "",
    normalWorkingHours: "",
    salaryType: "",
    employmentWorkStatus: "",
    resignationDate: "",
    terminationDate: "",
    terminationNoticeProbation: "",
    terminationNoticeConfirmation: "",
    resignationNoticeProbation: "",
    resignationNoticeConfirmation: "",
    reasonOfResignation: "",
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
  const [probationaryStartDate, setProbationaryStartDate] = React.useState(
    initialValues.probationaryStartDate
  );
  const [probationaryEndDate, setProbationaryEndDate] = React.useState(
    initialValues.probationaryEndDate
  );
  const [normalWorkingHours, setNormalWorkingHours] = React.useState(
    initialValues.normalWorkingHours
  );
  const [salaryType, setSalaryType] = React.useState(initialValues.salaryType);
  const [employmentWorkStatus, setEmploymentWorkStatus] = React.useState(
    initialValues.employmentWorkStatus
  );
  const [resignationDate, setResignationDate] = React.useState(
    initialValues.resignationDate
  );
  const [terminationDate, setTerminationDate] = React.useState(
    initialValues.terminationDate
  );
  const [terminationNoticeProbation, setTerminationNoticeProbation] =
    React.useState(initialValues.terminationNoticeProbation);
  const [terminationNoticeConfirmation, setTerminationNoticeConfirmation] =
    React.useState(initialValues.terminationNoticeConfirmation);
  const [resignationNoticeProbation, setResignationNoticeProbation] =
    React.useState(initialValues.resignationNoticeProbation);
  const [resignationNoticeConfirmation, setResignationNoticeConfirmation] =
    React.useState(initialValues.resignationNoticeConfirmation);
  const [reasonOfResignation, setReasonOfResignation] = React.useState(
    initialValues.reasonOfResignation
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = workInfoSchema1Record
      ? { ...initialValues, ...workInfoSchema1Record }
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
    setProbationaryStartDate(cleanValues.probationaryStartDate);
    setProbationaryEndDate(cleanValues.probationaryEndDate);
    setNormalWorkingHours(cleanValues.normalWorkingHours);
    setSalaryType(cleanValues.salaryType);
    setEmploymentWorkStatus(cleanValues.employmentWorkStatus);
    setResignationDate(cleanValues.resignationDate);
    setTerminationDate(cleanValues.terminationDate);
    setTerminationNoticeProbation(cleanValues.terminationNoticeProbation);
    setTerminationNoticeConfirmation(cleanValues.terminationNoticeConfirmation);
    setResignationNoticeProbation(cleanValues.resignationNoticeProbation);
    setResignationNoticeConfirmation(cleanValues.resignationNoticeConfirmation);
    setReasonOfResignation(cleanValues.reasonOfResignation);
    setErrors({});
  };
  const [workInfoSchema1Record, setWorkInfoSchema1Record] = React.useState(
    workInfoSchema1ModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getWorkInfoSchema1.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getWorkInfoSchema1
        : workInfoSchema1ModelProp;
      setWorkInfoSchema1Record(record);
    };
    queryData();
  }, [idProp, workInfoSchema1ModelProp]);
  React.useEffect(resetStateValues, [workInfoSchema1Record]);
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
    probationaryStartDate: [{ type: "Required" }],
    probationaryEndDate: [{ type: "Required" }],
    normalWorkingHours: [{ type: "Required" }],
    salaryType: [{ type: "Required" }],
    employmentWorkStatus: [{ type: "Required" }],
    resignationDate: [{ type: "Required" }],
    terminationDate: [{ type: "Required" }],
    terminationNoticeProbation: [{ type: "Required" }],
    terminationNoticeConfirmation: [{ type: "Required" }],
    resignationNoticeProbation: [{ type: "Required" }],
    resignationNoticeConfirmation: [{ type: "Required" }],
    reasonOfResignation: [{ type: "Required" }],
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
          department: department ?? null,
          workPosition: workPosition ?? null,
          upgradePosition,
          jobDescription,
          skillPool,
          workStatus,
          contractStartDate,
          contractEndDate,
          contractPeriodStatus,
          probationaryStartDate,
          probationaryEndDate,
          normalWorkingHours,
          salaryType,
          employmentWorkStatus,
          resignationDate,
          terminationDate,
          terminationNoticeProbation,
          terminationNoticeConfirmation,
          resignationNoticeProbation,
          resignationNoticeConfirmation,
          reasonOfResignation,
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
          await client.graphql({
            query: updateWorkInfoSchema1.replaceAll("__typename", ""),
            variables: {
              input: {
                id: workInfoSchema1Record.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "WorkInfoSchema1UpdateForm")}
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
        value={probationaryStartDate}
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
              probationaryStartDate: value,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
            };
            const result = onChange(modelFields);
            value = result?.probationaryStartDate ?? value;
          }
          if (errors.probationaryStartDate?.hasError) {
            runValidationTasks("probationaryStartDate", value);
          }
          setProbationaryStartDate(value);
        }}
        onBlur={() =>
          runValidationTasks("probationaryStartDate", probationaryStartDate)
        }
        errorMessage={errors.probationaryStartDate?.errorMessage}
        hasError={errors.probationaryStartDate?.hasError}
        {...getOverrideProps(overrides, "probationaryStartDate")}
      ></TextField>
      <TextField
        label="Probationary end date"
        isRequired={true}
        isReadOnly={false}
        value={probationaryEndDate}
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
              probationaryStartDate,
              probationaryEndDate: value,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
            };
            const result = onChange(modelFields);
            value = result?.probationaryEndDate ?? value;
          }
          if (errors.probationaryEndDate?.hasError) {
            runValidationTasks("probationaryEndDate", value);
          }
          setProbationaryEndDate(value);
        }}
        onBlur={() =>
          runValidationTasks("probationaryEndDate", probationaryEndDate)
        }
        errorMessage={errors.probationaryEndDate?.errorMessage}
        hasError={errors.probationaryEndDate?.hasError}
        {...getOverrideProps(overrides, "probationaryEndDate")}
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours: value,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType: value,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus: value,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
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
        label="Resignation date"
        isRequired={true}
        isReadOnly={false}
        value={resignationDate}
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate: value,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
            };
            const result = onChange(modelFields);
            value = result?.resignationDate ?? value;
          }
          if (errors.resignationDate?.hasError) {
            runValidationTasks("resignationDate", value);
          }
          setResignationDate(value);
        }}
        onBlur={() => runValidationTasks("resignationDate", resignationDate)}
        errorMessage={errors.resignationDate?.errorMessage}
        hasError={errors.resignationDate?.hasError}
        {...getOverrideProps(overrides, "resignationDate")}
      ></TextField>
      <TextField
        label="Termination date"
        isRequired={true}
        isReadOnly={false}
        value={terminationDate}
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate: value,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
            };
            const result = onChange(modelFields);
            value = result?.terminationDate ?? value;
          }
          if (errors.terminationDate?.hasError) {
            runValidationTasks("terminationDate", value);
          }
          setTerminationDate(value);
        }}
        onBlur={() => runValidationTasks("terminationDate", terminationDate)}
        errorMessage={errors.terminationDate?.errorMessage}
        hasError={errors.terminationDate?.hasError}
        {...getOverrideProps(overrides, "terminationDate")}
      ></TextField>
      <TextField
        label="Termination notice probation"
        isRequired={true}
        isReadOnly={false}
        value={terminationNoticeProbation}
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation: value,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
            };
            const result = onChange(modelFields);
            value = result?.terminationNoticeProbation ?? value;
          }
          if (errors.terminationNoticeProbation?.hasError) {
            runValidationTasks("terminationNoticeProbation", value);
          }
          setTerminationNoticeProbation(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "terminationNoticeProbation",
            terminationNoticeProbation
          )
        }
        errorMessage={errors.terminationNoticeProbation?.errorMessage}
        hasError={errors.terminationNoticeProbation?.hasError}
        {...getOverrideProps(overrides, "terminationNoticeProbation")}
      ></TextField>
      <TextField
        label="Termination notice confirmation"
        isRequired={true}
        isReadOnly={false}
        value={terminationNoticeConfirmation}
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation: value,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
            };
            const result = onChange(modelFields);
            value = result?.terminationNoticeConfirmation ?? value;
          }
          if (errors.terminationNoticeConfirmation?.hasError) {
            runValidationTasks("terminationNoticeConfirmation", value);
          }
          setTerminationNoticeConfirmation(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "terminationNoticeConfirmation",
            terminationNoticeConfirmation
          )
        }
        errorMessage={errors.terminationNoticeConfirmation?.errorMessage}
        hasError={errors.terminationNoticeConfirmation?.hasError}
        {...getOverrideProps(overrides, "terminationNoticeConfirmation")}
      ></TextField>
      <TextField
        label="Resignation notice probation"
        isRequired={true}
        isReadOnly={false}
        value={resignationNoticeProbation}
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation: value,
              resignationNoticeConfirmation,
              reasonOfResignation,
            };
            const result = onChange(modelFields);
            value = result?.resignationNoticeProbation ?? value;
          }
          if (errors.resignationNoticeProbation?.hasError) {
            runValidationTasks("resignationNoticeProbation", value);
          }
          setResignationNoticeProbation(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "resignationNoticeProbation",
            resignationNoticeProbation
          )
        }
        errorMessage={errors.resignationNoticeProbation?.errorMessage}
        hasError={errors.resignationNoticeProbation?.hasError}
        {...getOverrideProps(overrides, "resignationNoticeProbation")}
      ></TextField>
      <TextField
        label="Resignation notice confirmation"
        isRequired={true}
        isReadOnly={false}
        value={resignationNoticeConfirmation}
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation: value,
              reasonOfResignation,
            };
            const result = onChange(modelFields);
            value = result?.resignationNoticeConfirmation ?? value;
          }
          if (errors.resignationNoticeConfirmation?.hasError) {
            runValidationTasks("resignationNoticeConfirmation", value);
          }
          setResignationNoticeConfirmation(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "resignationNoticeConfirmation",
            resignationNoticeConfirmation
          )
        }
        errorMessage={errors.resignationNoticeConfirmation?.errorMessage}
        hasError={errors.resignationNoticeConfirmation?.hasError}
        {...getOverrideProps(overrides, "resignationNoticeConfirmation")}
      ></TextField>
      <TextField
        label="Reason of resignation"
        isRequired={true}
        isReadOnly={false}
        value={reasonOfResignation}
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
              probationaryStartDate,
              probationaryEndDate,
              normalWorkingHours,
              salaryType,
              employmentWorkStatus,
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation: value,
            };
            const result = onChange(modelFields);
            value = result?.reasonOfResignation ?? value;
          }
          if (errors.reasonOfResignation?.hasError) {
            runValidationTasks("reasonOfResignation", value);
          }
          setReasonOfResignation(value);
        }}
        onBlur={() =>
          runValidationTasks("reasonOfResignation", reasonOfResignation)
        }
        errorMessage={errors.reasonOfResignation?.errorMessage}
        hasError={errors.reasonOfResignation?.hasError}
        {...getOverrideProps(overrides, "reasonOfResignation")}
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
          isDisabled={!(idProp || workInfoSchema1ModelProp)}
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
              !(idProp || workInfoSchema1ModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
