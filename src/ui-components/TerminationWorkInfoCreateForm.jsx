/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { TerminationWorkInfo } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function TerminationWorkInfoCreateForm(props) {
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
    resignationDate: "",
    terminationDate: "",
    terminationNoticeProbation: "",
    terminationNoticeConfirmation: "",
    resignationNoticeProbation: "",
    resignationNoticeConfirmation: "",
    reasonOfResignation: "",
    reasonOfTermination: "",
    destinationOfEntitlement: "",
    durationPeriodEntitlement: "",
    dateOfEntitlement: "",
    empID: "",
  };
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
  const [durationPeriodEntitlement, setDurationPeriodEntitlement] =
    React.useState(initialValues.durationPeriodEntitlement);
  const [dateOfEntitlement, setDateOfEntitlement] = React.useState(
    initialValues.dateOfEntitlement
  );
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
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
    setDurationPeriodEntitlement(initialValues.durationPeriodEntitlement);
    setDateOfEntitlement(initialValues.dateOfEntitlement);
    setEmpID(initialValues.empID);
    setErrors({});
  };
  const validations = {
    resignationDate: [{ type: "Required" }],
    terminationDate: [{ type: "Required" }],
    terminationNoticeProbation: [{ type: "Required" }],
    terminationNoticeConfirmation: [{ type: "Required" }],
    resignationNoticeProbation: [{ type: "Required" }],
    resignationNoticeConfirmation: [{ type: "Required" }],
    reasonOfResignation: [{ type: "Required" }],
    reasonOfTermination: [{ type: "Required" }],
    destinationOfEntitlement: [{ type: "Required" }],
    durationPeriodEntitlement: [{ type: "Required" }],
    dateOfEntitlement: [{ type: "Required" }],
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
          resignationDate,
          terminationDate,
          terminationNoticeProbation,
          terminationNoticeConfirmation,
          resignationNoticeProbation,
          resignationNoticeConfirmation,
          reasonOfResignation,
          reasonOfTermination,
          destinationOfEntitlement,
          durationPeriodEntitlement,
          dateOfEntitlement,
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
          await DataStore.save(new TerminationWorkInfo(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "TerminationWorkInfoCreateForm")}
      {...rest}
    >
      <TextField
        label="Resignation date"
        isRequired={true}
        isReadOnly={false}
        value={resignationDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              resignationDate: value,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              durationPeriodEntitlement,
              dateOfEntitlement,
              empID,
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
              resignationDate,
              terminationDate: value,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              durationPeriodEntitlement,
              dateOfEntitlement,
              empID,
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
              resignationDate,
              terminationDate,
              terminationNoticeProbation: value,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              durationPeriodEntitlement,
              dateOfEntitlement,
              empID,
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
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation: value,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              durationPeriodEntitlement,
              dateOfEntitlement,
              empID,
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
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation: value,
              resignationNoticeConfirmation,
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              durationPeriodEntitlement,
              dateOfEntitlement,
              empID,
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
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation: value,
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              durationPeriodEntitlement,
              dateOfEntitlement,
              empID,
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
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation: value,
              reasonOfTermination,
              destinationOfEntitlement,
              durationPeriodEntitlement,
              dateOfEntitlement,
              empID,
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
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
              reasonOfTermination: value,
              destinationOfEntitlement,
              durationPeriodEntitlement,
              dateOfEntitlement,
              empID,
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
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement: value,
              durationPeriodEntitlement,
              dateOfEntitlement,
              empID,
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
        label="Duration period entitlement"
        isRequired={true}
        isReadOnly={false}
        value={durationPeriodEntitlement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              durationPeriodEntitlement: value,
              dateOfEntitlement,
              empID,
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
        label="Date of entitlement"
        isRequired={true}
        isReadOnly={false}
        value={dateOfEntitlement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              durationPeriodEntitlement,
              dateOfEntitlement: value,
              empID,
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
        label="Emp id"
        isRequired={true}
        isReadOnly={false}
        value={empID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              resignationDate,
              terminationDate,
              terminationNoticeProbation,
              terminationNoticeConfirmation,
              resignationNoticeProbation,
              resignationNoticeConfirmation,
              reasonOfResignation,
              reasonOfTermination,
              destinationOfEntitlement,
              durationPeriodEntitlement,
              dateOfEntitlement,
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
