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
import { createWorkInfoSchema } from "../graphql/mutations";
const client = generateClient();
export default function WorkInfoSchemaCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    reasonOfTermination: "",
    destinationOfEntitlement: "",
    leavePassageEntitlement: "",
    dateOfEntitlement: "",
    durationPeriodEntitlement: "",
    annualLeaveEntitlement: "",
    effectiveDateRevision: "",
    sickLeaveEntitlement: "",
    jobCategory: "",
    otherJobCategory: "",
    upgradeDate: "",
    normalWorkingWeek: "",
    normalWorkingMonth: "",
    effectiveDateOfSickLeave: "",
    positionRevision: "",
    RevisionsalaryPackage: "",
    leavePassageEntitlementRevision: "",
    effectiveDateOfLeavePassage: "",
    revisionAnnualLeave: "",
    annualLeaveEffectDate: "",
    ContractEffectDate: "",
    contractOfEmployee: "",
    remarksWorkInfo: "",
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
  const [reasonOfTermination, setReasonOfTermination] = React.useState(
    initialValues.reasonOfTermination
  );
  const [destinationOfEntitlement, setDestinationOfEntitlement] =
    React.useState(initialValues.destinationOfEntitlement);
  const [leavePassageEntitlement, setLeavePassageEntitlement] = React.useState(
    initialValues.leavePassageEntitlement
  );
  const [dateOfEntitlement, setDateOfEntitlement] = React.useState(
    initialValues.dateOfEntitlement
  );
  const [durationPeriodEntitlement, setDurationPeriodEntitlement] =
    React.useState(initialValues.durationPeriodEntitlement);
  const [annualLeaveEntitlement, setAnnualLeaveEntitlement] = React.useState(
    initialValues.annualLeaveEntitlement
  );
  const [effectiveDateRevision, setEffectiveDateRevision] = React.useState(
    initialValues.effectiveDateRevision
  );
  const [sickLeaveEntitlement, setSickLeaveEntitlement] = React.useState(
    initialValues.sickLeaveEntitlement
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
  const [normalWorkingWeek, setNormalWorkingWeek] = React.useState(
    initialValues.normalWorkingWeek
  );
  const [normalWorkingMonth, setNormalWorkingMonth] = React.useState(
    initialValues.normalWorkingMonth
  );
  const [effectiveDateOfSickLeave, setEffectiveDateOfSickLeave] =
    React.useState(initialValues.effectiveDateOfSickLeave);
  const [positionRevision, setPositionRevision] = React.useState(
    initialValues.positionRevision
  );
  const [RevisionsalaryPackage, setRevisionsalaryPackage] = React.useState(
    initialValues.RevisionsalaryPackage
  );
  const [leavePassageEntitlementRevision, setLeavePassageEntitlementRevision] =
    React.useState(initialValues.leavePassageEntitlementRevision);
  const [effectiveDateOfLeavePassage, setEffectiveDateOfLeavePassage] =
    React.useState(initialValues.effectiveDateOfLeavePassage);
  const [revisionAnnualLeave, setRevisionAnnualLeave] = React.useState(
    initialValues.revisionAnnualLeave
  );
  const [annualLeaveEffectDate, setAnnualLeaveEffectDate] = React.useState(
    initialValues.annualLeaveEffectDate
  );
  const [ContractEffectDate, setContractEffectDate] = React.useState(
    initialValues.ContractEffectDate
  );
  const [contractOfEmployee, setContractOfEmployee] = React.useState(
    initialValues.contractOfEmployee
  );
  const [remarksWorkInfo, setRemarksWorkInfo] = React.useState(
    initialValues.remarksWorkInfo
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setDateOfJoin(initialValues.dateOfJoin);
    setDepartment(initialValues.department);
    setWorkPosition(initialValues.workPosition);
    setUpgradePosition(initialValues.upgradePosition);
    setJobDescription(initialValues.jobDescription);
    setSkillPool(initialValues.skillPool);
    setWorkStatus(initialValues.workStatus);
    setContractStartDate(initialValues.contractStartDate);
    setContractEndDate(initialValues.contractEndDate);
    setContractPeriodStatus(initialValues.contractPeriodStatus);
    setProbationaryStartDate(initialValues.probationaryStartDate);
    setProbationaryEndDate(initialValues.probationaryEndDate);
    setNormalWorkingHours(initialValues.normalWorkingHours);
    setSalaryType(initialValues.salaryType);
    setEmploymentWorkStatus(initialValues.employmentWorkStatus);
    setResignationDate(initialValues.resignationDate);
    setTerminationDate(initialValues.terminationDate);
    setTerminationNoticeProbation(initialValues.terminationNoticeProbation);
    setTerminationNoticeConfirmation(
      initialValues.terminationNoticeConfirmation
    );
    setResignationNoticeProbation(initialValues.resignationNoticeProbation);
    setResignationNoticeConfirmation(
      initialValues.resignationNoticeConfirmation
    );
    setReasonOfResignation(initialValues.reasonOfResignation);
    setReasonOfTermination(initialValues.reasonOfTermination);
    setDestinationOfEntitlement(initialValues.destinationOfEntitlement);
    setLeavePassageEntitlement(initialValues.leavePassageEntitlement);
    setDateOfEntitlement(initialValues.dateOfEntitlement);
    setDurationPeriodEntitlement(initialValues.durationPeriodEntitlement);
    setAnnualLeaveEntitlement(initialValues.annualLeaveEntitlement);
    setEffectiveDateRevision(initialValues.effectiveDateRevision);
    setSickLeaveEntitlement(initialValues.sickLeaveEntitlement);
    setJobCategory(initialValues.jobCategory);
    setOtherJobCategory(initialValues.otherJobCategory);
    setUpgradeDate(initialValues.upgradeDate);
    setNormalWorkingWeek(initialValues.normalWorkingWeek);
    setNormalWorkingMonth(initialValues.normalWorkingMonth);
    setEffectiveDateOfSickLeave(initialValues.effectiveDateOfSickLeave);
    setPositionRevision(initialValues.positionRevision);
    setRevisionsalaryPackage(initialValues.RevisionsalaryPackage);
    setLeavePassageEntitlementRevision(
      initialValues.leavePassageEntitlementRevision
    );
    setEffectiveDateOfLeavePassage(initialValues.effectiveDateOfLeavePassage);
    setRevisionAnnualLeave(initialValues.revisionAnnualLeave);
    setAnnualLeaveEffectDate(initialValues.annualLeaveEffectDate);
    setContractEffectDate(initialValues.ContractEffectDate);
    setContractOfEmployee(initialValues.contractOfEmployee);
    setRemarksWorkInfo(initialValues.remarksWorkInfo);
    setErrors({});
  };
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
    reasonOfTermination: [{ type: "Required" }],
    destinationOfEntitlement: [{ type: "Required" }],
    leavePassageEntitlement: [{ type: "Required" }],
    dateOfEntitlement: [{ type: "Required" }],
    durationPeriodEntitlement: [{ type: "Required" }],
    annualLeaveEntitlement: [{ type: "Required" }],
    effectiveDateRevision: [{ type: "Required" }],
    sickLeaveEntitlement: [{ type: "Required" }],
    jobCategory: [{ type: "Required" }],
    otherJobCategory: [],
    upgradeDate: [{ type: "Required" }],
    normalWorkingWeek: [{ type: "Required" }],
    normalWorkingMonth: [{ type: "Required" }],
    effectiveDateOfSickLeave: [{ type: "Required" }],
    positionRevision: [{ type: "Required" }],
    RevisionsalaryPackage: [{ type: "Required" }],
    leavePassageEntitlementRevision: [{ type: "Required" }],
    effectiveDateOfLeavePassage: [{ type: "Required" }],
    revisionAnnualLeave: [{ type: "Required" }],
    annualLeaveEffectDate: [{ type: "Required" }],
    ContractEffectDate: [{ type: "Required" }],
    contractOfEmployee: [{ type: "Required" }],
    remarksWorkInfo: [],
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
          reasonOfTermination,
          destinationOfEntitlement,
          leavePassageEntitlement,
          dateOfEntitlement,
          durationPeriodEntitlement,
          annualLeaveEntitlement,
          effectiveDateRevision,
          sickLeaveEntitlement,
          jobCategory,
          otherJobCategory,
          upgradeDate,
          normalWorkingWeek,
          normalWorkingMonth,
          effectiveDateOfSickLeave,
          positionRevision,
          RevisionsalaryPackage,
          leavePassageEntitlementRevision,
          effectiveDateOfLeavePassage,
          revisionAnnualLeave,
          annualLeaveEffectDate,
          ContractEffectDate,
          contractOfEmployee,
          remarksWorkInfo,
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
            query: createWorkInfoSchema.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "WorkInfoSchemaCreateForm")}
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
      <TextField
        label="Reason of termination"
        isRequired={true}
        isReadOnly={false}
        value={reasonOfTermination}
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
              reasonOfResignation,
              reasonOfTermination: value,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.reasonOfTermination ?? value;
          }
          if (errors.reasonOfTermination?.hasError) {
            runValidationTasks("reasonOfTermination", value);
          }
          setReasonOfTermination(value);
        }}
        onBlur={() =>
          runValidationTasks("reasonOfTermination", reasonOfTermination)
        }
        errorMessage={errors.reasonOfTermination?.errorMessage}
        hasError={errors.reasonOfTermination?.hasError}
        {...getOverrideProps(overrides, "reasonOfTermination")}
      ></TextField>
      <TextField
        label="Destination of entitlement"
        isRequired={true}
        isReadOnly={false}
        value={destinationOfEntitlement}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement: value,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.destinationOfEntitlement ?? value;
          }
          if (errors.destinationOfEntitlement?.hasError) {
            runValidationTasks("destinationOfEntitlement", value);
          }
          setDestinationOfEntitlement(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "destinationOfEntitlement",
            destinationOfEntitlement
          )
        }
        errorMessage={errors.destinationOfEntitlement?.errorMessage}
        hasError={errors.destinationOfEntitlement?.hasError}
        {...getOverrideProps(overrides, "destinationOfEntitlement")}
      ></TextField>
      <TextField
        label="Leave passage entitlement"
        isRequired={true}
        isReadOnly={false}
        value={leavePassageEntitlement}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement: value,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.leavePassageEntitlement ?? value;
          }
          if (errors.leavePassageEntitlement?.hasError) {
            runValidationTasks("leavePassageEntitlement", value);
          }
          setLeavePassageEntitlement(value);
        }}
        onBlur={() =>
          runValidationTasks("leavePassageEntitlement", leavePassageEntitlement)
        }
        errorMessage={errors.leavePassageEntitlement?.errorMessage}
        hasError={errors.leavePassageEntitlement?.hasError}
        {...getOverrideProps(overrides, "leavePassageEntitlement")}
      ></TextField>
      <TextField
        label="Date of entitlement"
        isRequired={true}
        isReadOnly={false}
        value={dateOfEntitlement}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement: value,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.dateOfEntitlement ?? value;
          }
          if (errors.dateOfEntitlement?.hasError) {
            runValidationTasks("dateOfEntitlement", value);
          }
          setDateOfEntitlement(value);
        }}
        onBlur={() =>
          runValidationTasks("dateOfEntitlement", dateOfEntitlement)
        }
        errorMessage={errors.dateOfEntitlement?.errorMessage}
        hasError={errors.dateOfEntitlement?.hasError}
        {...getOverrideProps(overrides, "dateOfEntitlement")}
      ></TextField>
      <TextField
        label="Duration period entitlement"
        isRequired={true}
        isReadOnly={false}
        value={durationPeriodEntitlement}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement: value,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.durationPeriodEntitlement ?? value;
          }
          if (errors.durationPeriodEntitlement?.hasError) {
            runValidationTasks("durationPeriodEntitlement", value);
          }
          setDurationPeriodEntitlement(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "durationPeriodEntitlement",
            durationPeriodEntitlement
          )
        }
        errorMessage={errors.durationPeriodEntitlement?.errorMessage}
        hasError={errors.durationPeriodEntitlement?.hasError}
        {...getOverrideProps(overrides, "durationPeriodEntitlement")}
      ></TextField>
      <TextField
        label="Annual leave entitlement"
        isRequired={true}
        isReadOnly={false}
        value={annualLeaveEntitlement}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement: value,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.annualLeaveEntitlement ?? value;
          }
          if (errors.annualLeaveEntitlement?.hasError) {
            runValidationTasks("annualLeaveEntitlement", value);
          }
          setAnnualLeaveEntitlement(value);
        }}
        onBlur={() =>
          runValidationTasks("annualLeaveEntitlement", annualLeaveEntitlement)
        }
        errorMessage={errors.annualLeaveEntitlement?.errorMessage}
        hasError={errors.annualLeaveEntitlement?.hasError}
        {...getOverrideProps(overrides, "annualLeaveEntitlement")}
      ></TextField>
      <TextField
        label="Effective date revision"
        isRequired={true}
        isReadOnly={false}
        value={effectiveDateRevision}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision: value,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.effectiveDateRevision ?? value;
          }
          if (errors.effectiveDateRevision?.hasError) {
            runValidationTasks("effectiveDateRevision", value);
          }
          setEffectiveDateRevision(value);
        }}
        onBlur={() =>
          runValidationTasks("effectiveDateRevision", effectiveDateRevision)
        }
        errorMessage={errors.effectiveDateRevision?.errorMessage}
        hasError={errors.effectiveDateRevision?.hasError}
        {...getOverrideProps(overrides, "effectiveDateRevision")}
      ></TextField>
      <TextField
        label="Sick leave entitlement"
        isRequired={true}
        isReadOnly={false}
        value={sickLeaveEntitlement}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement: value,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.sickLeaveEntitlement ?? value;
          }
          if (errors.sickLeaveEntitlement?.hasError) {
            runValidationTasks("sickLeaveEntitlement", value);
          }
          setSickLeaveEntitlement(value);
        }}
        onBlur={() =>
          runValidationTasks("sickLeaveEntitlement", sickLeaveEntitlement)
        }
        errorMessage={errors.sickLeaveEntitlement?.errorMessage}
        hasError={errors.sickLeaveEntitlement?.hasError}
        {...getOverrideProps(overrides, "sickLeaveEntitlement")}
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory: value,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory: value,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate: value,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek: value,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
        label="Normal working month"
        isRequired={true}
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
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth: value,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
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
        label="Effective date of sick leave"
        isRequired={true}
        isReadOnly={false}
        value={effectiveDateOfSickLeave}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave: value,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.effectiveDateOfSickLeave ?? value;
          }
          if (errors.effectiveDateOfSickLeave?.hasError) {
            runValidationTasks("effectiveDateOfSickLeave", value);
          }
          setEffectiveDateOfSickLeave(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "effectiveDateOfSickLeave",
            effectiveDateOfSickLeave
          )
        }
        errorMessage={errors.effectiveDateOfSickLeave?.errorMessage}
        hasError={errors.effectiveDateOfSickLeave?.hasError}
        {...getOverrideProps(overrides, "effectiveDateOfSickLeave")}
      ></TextField>
      <TextField
        label="Position revision"
        isRequired={true}
        isReadOnly={false}
        value={positionRevision}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision: value,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.positionRevision ?? value;
          }
          if (errors.positionRevision?.hasError) {
            runValidationTasks("positionRevision", value);
          }
          setPositionRevision(value);
        }}
        onBlur={() => runValidationTasks("positionRevision", positionRevision)}
        errorMessage={errors.positionRevision?.errorMessage}
        hasError={errors.positionRevision?.hasError}
        {...getOverrideProps(overrides, "positionRevision")}
      ></TextField>
      <TextField
        label="Revisionsalary package"
        isRequired={true}
        isReadOnly={false}
        value={RevisionsalaryPackage}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage: value,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.RevisionsalaryPackage ?? value;
          }
          if (errors.RevisionsalaryPackage?.hasError) {
            runValidationTasks("RevisionsalaryPackage", value);
          }
          setRevisionsalaryPackage(value);
        }}
        onBlur={() =>
          runValidationTasks("RevisionsalaryPackage", RevisionsalaryPackage)
        }
        errorMessage={errors.RevisionsalaryPackage?.errorMessage}
        hasError={errors.RevisionsalaryPackage?.hasError}
        {...getOverrideProps(overrides, "RevisionsalaryPackage")}
      ></TextField>
      <TextField
        label="Leave passage entitlement revision"
        isRequired={true}
        isReadOnly={false}
        value={leavePassageEntitlementRevision}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision: value,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.leavePassageEntitlementRevision ?? value;
          }
          if (errors.leavePassageEntitlementRevision?.hasError) {
            runValidationTasks("leavePassageEntitlementRevision", value);
          }
          setLeavePassageEntitlementRevision(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "leavePassageEntitlementRevision",
            leavePassageEntitlementRevision
          )
        }
        errorMessage={errors.leavePassageEntitlementRevision?.errorMessage}
        hasError={errors.leavePassageEntitlementRevision?.hasError}
        {...getOverrideProps(overrides, "leavePassageEntitlementRevision")}
      ></TextField>
      <TextField
        label="Effective date of leave passage"
        isRequired={true}
        isReadOnly={false}
        value={effectiveDateOfLeavePassage}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage: value,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.effectiveDateOfLeavePassage ?? value;
          }
          if (errors.effectiveDateOfLeavePassage?.hasError) {
            runValidationTasks("effectiveDateOfLeavePassage", value);
          }
          setEffectiveDateOfLeavePassage(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "effectiveDateOfLeavePassage",
            effectiveDateOfLeavePassage
          )
        }
        errorMessage={errors.effectiveDateOfLeavePassage?.errorMessage}
        hasError={errors.effectiveDateOfLeavePassage?.hasError}
        {...getOverrideProps(overrides, "effectiveDateOfLeavePassage")}
      ></TextField>
      <TextField
        label="Revision annual leave"
        isRequired={true}
        isReadOnly={false}
        value={revisionAnnualLeave}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave: value,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.revisionAnnualLeave ?? value;
          }
          if (errors.revisionAnnualLeave?.hasError) {
            runValidationTasks("revisionAnnualLeave", value);
          }
          setRevisionAnnualLeave(value);
        }}
        onBlur={() =>
          runValidationTasks("revisionAnnualLeave", revisionAnnualLeave)
        }
        errorMessage={errors.revisionAnnualLeave?.errorMessage}
        hasError={errors.revisionAnnualLeave?.hasError}
        {...getOverrideProps(overrides, "revisionAnnualLeave")}
      ></TextField>
      <TextField
        label="Annual leave effect date"
        isRequired={true}
        isReadOnly={false}
        value={annualLeaveEffectDate}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate: value,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.annualLeaveEffectDate ?? value;
          }
          if (errors.annualLeaveEffectDate?.hasError) {
            runValidationTasks("annualLeaveEffectDate", value);
          }
          setAnnualLeaveEffectDate(value);
        }}
        onBlur={() =>
          runValidationTasks("annualLeaveEffectDate", annualLeaveEffectDate)
        }
        errorMessage={errors.annualLeaveEffectDate?.errorMessage}
        hasError={errors.annualLeaveEffectDate?.hasError}
        {...getOverrideProps(overrides, "annualLeaveEffectDate")}
      ></TextField>
      <TextField
        label="Contract effect date"
        isRequired={true}
        isReadOnly={false}
        value={ContractEffectDate}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate: value,
              contractOfEmployee,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.ContractEffectDate ?? value;
          }
          if (errors.ContractEffectDate?.hasError) {
            runValidationTasks("ContractEffectDate", value);
          }
          setContractEffectDate(value);
        }}
        onBlur={() =>
          runValidationTasks("ContractEffectDate", ContractEffectDate)
        }
        errorMessage={errors.ContractEffectDate?.errorMessage}
        hasError={errors.ContractEffectDate?.hasError}
        {...getOverrideProps(overrides, "ContractEffectDate")}
      ></TextField>
      <TextField
        label="Contract of employee"
        isRequired={true}
        isReadOnly={false}
        value={contractOfEmployee}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee: value,
              remarksWorkInfo,
            };
            const result = onChange(modelFields);
            value = result?.contractOfEmployee ?? value;
          }
          if (errors.contractOfEmployee?.hasError) {
            runValidationTasks("contractOfEmployee", value);
          }
          setContractOfEmployee(value);
        }}
        onBlur={() =>
          runValidationTasks("contractOfEmployee", contractOfEmployee)
        }
        errorMessage={errors.contractOfEmployee?.errorMessage}
        hasError={errors.contractOfEmployee?.hasError}
        {...getOverrideProps(overrides, "contractOfEmployee")}
      ></TextField>
      <TextField
        label="Remarks work info"
        isRequired={false}
        isReadOnly={false}
        value={remarksWorkInfo}
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
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              leavePassageEntitlement,
              dateOfEntitlement,
              durationPeriodEntitlement,
              annualLeaveEntitlement,
              effectiveDateRevision,
              sickLeaveEntitlement,
              jobCategory,
              otherJobCategory,
              upgradeDate,
              normalWorkingWeek,
              normalWorkingMonth,
              effectiveDateOfSickLeave,
              positionRevision,
              RevisionsalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualLeaveEffectDate,
              ContractEffectDate,
              contractOfEmployee,
              remarksWorkInfo: value,
            };
            const result = onChange(modelFields);
            value = result?.remarksWorkInfo ?? value;
          }
          if (errors.remarksWorkInfo?.hasError) {
            runValidationTasks("remarksWorkInfo", value);
          }
          setRemarksWorkInfo(value);
        }}
        onBlur={() => runValidationTasks("remarksWorkInfo", remarksWorkInfo)}
        errorMessage={errors.remarksWorkInfo?.errorMessage}
        hasError={errors.remarksWorkInfo?.hasError}
        {...getOverrideProps(overrides, "remarksWorkInfo")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
