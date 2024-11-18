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
import { createWorkInfoSchema2 } from "../graphql/mutations";
const client = generateClient();
export default function WorkInfoSchema2CreateForm(props) {
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
  };
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
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
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
    setErrors({});
  };
  const validations = {
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
            query: createWorkInfoSchema2.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "WorkInfoSchema2CreateForm")}
      {...rest}
    >
      <TextField
        label="Reason of termination"
        isRequired={true}
        isReadOnly={false}
        value={reasonOfTermination}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
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
