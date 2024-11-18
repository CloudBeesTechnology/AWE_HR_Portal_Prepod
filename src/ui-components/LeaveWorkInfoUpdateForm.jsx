/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { LeaveWorkInfo } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function LeaveWorkInfoUpdateForm(props) {
  const {
    id: idProp,
    leaveWorkInfo: leaveWorkInfoModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    leavePassageEntitlement: "",
    annualLeaveEntitlement: "",
    annualLeaveEffectDate: "",
    sickLeaveEntitlement: "",
    effectiveDateOfSickLeave: "",
    positionRevision: "",
    revisionSalaryPackage: "",
    leavePassageEntitlementRevision: "",
    effectiveDateOfLeavePassage: "",
    revisionAnnualLeave: "",
    annualEntitlementeffectiveDate: "",
    contractEffectDate: "",
    contractOfEmployee: "",
    remarksWorkInfo: "",
    empID: "",
  };
  const [leavePassageEntitlement, setLeavePassageEntitlement] = React.useState(
    initialValues.leavePassageEntitlement
  );
  const [annualLeaveEntitlement, setAnnualLeaveEntitlement] = React.useState(
    initialValues.annualLeaveEntitlement
  );
  const [annualLeaveEffectDate, setAnnualLeaveEffectDate] = React.useState(
    initialValues.annualLeaveEffectDate
  );
  const [sickLeaveEntitlement, setSickLeaveEntitlement] = React.useState(
    initialValues.sickLeaveEntitlement
  );
  const [effectiveDateOfSickLeave, setEffectiveDateOfSickLeave] =
    React.useState(initialValues.effectiveDateOfSickLeave);
  const [positionRevision, setPositionRevision] = React.useState(
    initialValues.positionRevision
  );
  const [revisionSalaryPackage, setRevisionSalaryPackage] = React.useState(
    initialValues.revisionSalaryPackage
  );
  const [leavePassageEntitlementRevision, setLeavePassageEntitlementRevision] =
    React.useState(initialValues.leavePassageEntitlementRevision);
  const [effectiveDateOfLeavePassage, setEffectiveDateOfLeavePassage] =
    React.useState(initialValues.effectiveDateOfLeavePassage);
  const [revisionAnnualLeave, setRevisionAnnualLeave] = React.useState(
    initialValues.revisionAnnualLeave
  );
  const [annualEntitlementeffectiveDate, setAnnualEntitlementeffectiveDate] =
    React.useState(initialValues.annualEntitlementeffectiveDate);
  const [contractEffectDate, setContractEffectDate] = React.useState(
    initialValues.contractEffectDate
  );
  const [contractOfEmployee, setContractOfEmployee] = React.useState(
    initialValues.contractOfEmployee
  );
  const [remarksWorkInfo, setRemarksWorkInfo] = React.useState(
    initialValues.remarksWorkInfo
  );
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = leaveWorkInfoRecord
      ? { ...initialValues, ...leaveWorkInfoRecord }
      : initialValues;
    setLeavePassageEntitlement(cleanValues.leavePassageEntitlement);
    setAnnualLeaveEntitlement(cleanValues.annualLeaveEntitlement);
    setAnnualLeaveEffectDate(cleanValues.annualLeaveEffectDate);
    setSickLeaveEntitlement(cleanValues.sickLeaveEntitlement);
    setEffectiveDateOfSickLeave(cleanValues.effectiveDateOfSickLeave);
    setPositionRevision(cleanValues.positionRevision);
    setRevisionSalaryPackage(cleanValues.revisionSalaryPackage);
    setLeavePassageEntitlementRevision(
      cleanValues.leavePassageEntitlementRevision
    );
    setEffectiveDateOfLeavePassage(cleanValues.effectiveDateOfLeavePassage);
    setRevisionAnnualLeave(cleanValues.revisionAnnualLeave);
    setAnnualEntitlementeffectiveDate(
      cleanValues.annualEntitlementeffectiveDate
    );
    setContractEffectDate(cleanValues.contractEffectDate);
    setContractOfEmployee(cleanValues.contractOfEmployee);
    setRemarksWorkInfo(cleanValues.remarksWorkInfo);
    setEmpID(cleanValues.empID);
    setErrors({});
  };
  const [leaveWorkInfoRecord, setLeaveWorkInfoRecord] = React.useState(
    leaveWorkInfoModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(LeaveWorkInfo, idProp)
        : leaveWorkInfoModelProp;
      setLeaveWorkInfoRecord(record);
    };
    queryData();
  }, [idProp, leaveWorkInfoModelProp]);
  React.useEffect(resetStateValues, [leaveWorkInfoRecord]);
  const validations = {
    leavePassageEntitlement: [{ type: "Required" }],
    annualLeaveEntitlement: [{ type: "Required" }],
    annualLeaveEffectDate: [{ type: "Required" }],
    sickLeaveEntitlement: [{ type: "Required" }],
    effectiveDateOfSickLeave: [{ type: "Required" }],
    positionRevision: [{ type: "Required" }],
    revisionSalaryPackage: [{ type: "Required" }],
    leavePassageEntitlementRevision: [{ type: "Required" }],
    effectiveDateOfLeavePassage: [{ type: "Required" }],
    revisionAnnualLeave: [{ type: "Required" }],
    annualEntitlementeffectiveDate: [{ type: "Required" }],
    contractEffectDate: [{ type: "Required" }],
    contractOfEmployee: [{ type: "Required" }],
    remarksWorkInfo: [],
    empID: [{ type: "Required" }],
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
          leavePassageEntitlement,
          annualLeaveEntitlement,
          annualLeaveEffectDate,
          sickLeaveEntitlement,
          effectiveDateOfSickLeave,
          positionRevision,
          revisionSalaryPackage,
          leavePassageEntitlementRevision,
          effectiveDateOfLeavePassage,
          revisionAnnualLeave,
          annualEntitlementeffectiveDate,
          contractEffectDate,
          contractOfEmployee,
          remarksWorkInfo,
          empID,
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
            LeaveWorkInfo.copyOf(leaveWorkInfoRecord, (updated) => {
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
      {...getOverrideProps(overrides, "LeaveWorkInfoUpdateForm")}
      {...rest}
    >
      <TextField
        label="Leave passage entitlement"
        isRequired={true}
        isReadOnly={false}
        value={leavePassageEntitlement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              leavePassageEntitlement: value,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
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
        label="Annual leave entitlement"
        isRequired={true}
        isReadOnly={false}
        value={annualLeaveEntitlement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              leavePassageEntitlement,
              annualLeaveEntitlement: value,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
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
        label="Annual leave effect date"
        isRequired={true}
        isReadOnly={false}
        value={annualLeaveEffectDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate: value,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
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
        label="Sick leave entitlement"
        isRequired={true}
        isReadOnly={false}
        value={sickLeaveEntitlement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement: value,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
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
        label="Effective date of sick leave"
        isRequired={true}
        isReadOnly={false}
        value={effectiveDateOfSickLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave: value,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
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
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision: value,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
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
        label="Revision salary package"
        isRequired={true}
        isReadOnly={false}
        value={revisionSalaryPackage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage: value,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
            };
            const result = onChange(modelFields);
            value = result?.revisionSalaryPackage ?? value;
          }
          if (errors.revisionSalaryPackage?.hasError) {
            runValidationTasks("revisionSalaryPackage", value);
          }
          setRevisionSalaryPackage(value);
        }}
        onBlur={() =>
          runValidationTasks("revisionSalaryPackage", revisionSalaryPackage)
        }
        errorMessage={errors.revisionSalaryPackage?.errorMessage}
        hasError={errors.revisionSalaryPackage?.hasError}
        {...getOverrideProps(overrides, "revisionSalaryPackage")}
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
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision: value,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
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
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage: value,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
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
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave: value,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
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
        label="Annual entitlementeffective date"
        isRequired={true}
        isReadOnly={false}
        value={annualEntitlementeffectiveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate: value,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
            };
            const result = onChange(modelFields);
            value = result?.annualEntitlementeffectiveDate ?? value;
          }
          if (errors.annualEntitlementeffectiveDate?.hasError) {
            runValidationTasks("annualEntitlementeffectiveDate", value);
          }
          setAnnualEntitlementeffectiveDate(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "annualEntitlementeffectiveDate",
            annualEntitlementeffectiveDate
          )
        }
        errorMessage={errors.annualEntitlementeffectiveDate?.errorMessage}
        hasError={errors.annualEntitlementeffectiveDate?.hasError}
        {...getOverrideProps(overrides, "annualEntitlementeffectiveDate")}
      ></TextField>
      <TextField
        label="Contract effect date"
        isRequired={true}
        isReadOnly={false}
        value={contractEffectDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate: value,
              contractOfEmployee,
              remarksWorkInfo,
              empID,
            };
            const result = onChange(modelFields);
            value = result?.contractEffectDate ?? value;
          }
          if (errors.contractEffectDate?.hasError) {
            runValidationTasks("contractEffectDate", value);
          }
          setContractEffectDate(value);
        }}
        onBlur={() =>
          runValidationTasks("contractEffectDate", contractEffectDate)
        }
        errorMessage={errors.contractEffectDate?.errorMessage}
        hasError={errors.contractEffectDate?.hasError}
        {...getOverrideProps(overrides, "contractEffectDate")}
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
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee: value,
              remarksWorkInfo,
              empID,
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
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo: value,
              empID,
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
      <TextField
        label="Emp id"
        isRequired={true}
        isReadOnly={false}
        value={empID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              leavePassageEntitlement,
              annualLeaveEntitlement,
              annualLeaveEffectDate,
              sickLeaveEntitlement,
              effectiveDateOfSickLeave,
              positionRevision,
              revisionSalaryPackage,
              leavePassageEntitlementRevision,
              effectiveDateOfLeavePassage,
              revisionAnnualLeave,
              annualEntitlementeffectiveDate,
              contractEffectDate,
              contractOfEmployee,
              remarksWorkInfo,
              empID: value,
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
          isDisabled={!(idProp || leaveWorkInfoModelProp)}
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
              !(idProp || leaveWorkInfoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
