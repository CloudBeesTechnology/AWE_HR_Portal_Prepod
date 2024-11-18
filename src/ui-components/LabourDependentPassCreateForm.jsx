/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { LabourDependentPass } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function LabourDependentPassCreateForm(props) {
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
    airTicketStatus: "",
    dependentName: "",
    dependentPassportNumber: "",
    dependentPassportExpiy: "",
    labourDepositPaidBy: "",
    labourDepositReceiptNumber: "",
    labourDepositAmount: "",
    passportLocation: "",
    reEntryVisaApplication: "",
    immigrationApprovalDate: "",
    reEntryVisaExpiry: "",
    relation: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [airTicketStatus, setAirTicketStatus] = React.useState(
    initialValues.airTicketStatus
  );
  const [dependentName, setDependentName] = React.useState(
    initialValues.dependentName
  );
  const [dependentPassportNumber, setDependentPassportNumber] = React.useState(
    initialValues.dependentPassportNumber
  );
  const [dependentPassportExpiy, setDependentPassportExpiy] = React.useState(
    initialValues.dependentPassportExpiy
  );
  const [labourDepositPaidBy, setLabourDepositPaidBy] = React.useState(
    initialValues.labourDepositPaidBy
  );
  const [labourDepositReceiptNumber, setLabourDepositReceiptNumber] =
    React.useState(initialValues.labourDepositReceiptNumber);
  const [labourDepositAmount, setLabourDepositAmount] = React.useState(
    initialValues.labourDepositAmount
  );
  const [passportLocation, setPassportLocation] = React.useState(
    initialValues.passportLocation
  );
  const [reEntryVisaApplication, setReEntryVisaApplication] = React.useState(
    initialValues.reEntryVisaApplication
  );
  const [immigrationApprovalDate, setImmigrationApprovalDate] = React.useState(
    initialValues.immigrationApprovalDate
  );
  const [reEntryVisaExpiry, setReEntryVisaExpiry] = React.useState(
    initialValues.reEntryVisaExpiry
  );
  const [relation, setRelation] = React.useState(initialValues.relation);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setAirTicketStatus(initialValues.airTicketStatus);
    setDependentName(initialValues.dependentName);
    setDependentPassportNumber(initialValues.dependentPassportNumber);
    setDependentPassportExpiy(initialValues.dependentPassportExpiy);
    setLabourDepositPaidBy(initialValues.labourDepositPaidBy);
    setLabourDepositReceiptNumber(initialValues.labourDepositReceiptNumber);
    setLabourDepositAmount(initialValues.labourDepositAmount);
    setPassportLocation(initialValues.passportLocation);
    setReEntryVisaApplication(initialValues.reEntryVisaApplication);
    setImmigrationApprovalDate(initialValues.immigrationApprovalDate);
    setReEntryVisaExpiry(initialValues.reEntryVisaExpiry);
    setRelation(initialValues.relation);
    setErrors({});
  };
  const validations = {
    empID: [{ type: "Required" }],
    airTicketStatus: [{ type: "Required" }],
    dependentName: [{ type: "Required" }],
    dependentPassportNumber: [{ type: "Required" }],
    dependentPassportExpiy: [{ type: "Required" }],
    labourDepositPaidBy: [{ type: "Required" }],
    labourDepositReceiptNumber: [{ type: "Required" }],
    labourDepositAmount: [{ type: "Required" }],
    passportLocation: [{ type: "Required" }],
    reEntryVisaApplication: [{ type: "Required" }],
    immigrationApprovalDate: [{ type: "Required" }],
    reEntryVisaExpiry: [{ type: "Required" }],
    relation: [{ type: "Required" }],
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
          airTicketStatus,
          dependentName,
          dependentPassportNumber,
          dependentPassportExpiy,
          labourDepositPaidBy,
          labourDepositReceiptNumber,
          labourDepositAmount,
          passportLocation,
          reEntryVisaApplication,
          immigrationApprovalDate,
          reEntryVisaExpiry,
          relation,
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
          await DataStore.save(new LabourDependentPass(modelFields));
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
      {...getOverrideProps(overrides, "LabourDependentPassCreateForm")}
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
              airTicketStatus,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation,
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
        label="Air ticket status"
        isRequired={true}
        isReadOnly={false}
        value={airTicketStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus: value,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.airTicketStatus ?? value;
          }
          if (errors.airTicketStatus?.hasError) {
            runValidationTasks("airTicketStatus", value);
          }
          setAirTicketStatus(value);
        }}
        onBlur={() => runValidationTasks("airTicketStatus", airTicketStatus)}
        errorMessage={errors.airTicketStatus?.errorMessage}
        hasError={errors.airTicketStatus?.hasError}
        {...getOverrideProps(overrides, "airTicketStatus")}
      ></TextField>
      <TextField
        label="Dependent name"
        isRequired={true}
        isReadOnly={false}
        value={dependentName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName: value,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.dependentName ?? value;
          }
          if (errors.dependentName?.hasError) {
            runValidationTasks("dependentName", value);
          }
          setDependentName(value);
        }}
        onBlur={() => runValidationTasks("dependentName", dependentName)}
        errorMessage={errors.dependentName?.errorMessage}
        hasError={errors.dependentName?.hasError}
        {...getOverrideProps(overrides, "dependentName")}
      ></TextField>
      <TextField
        label="Dependent passport number"
        isRequired={true}
        isReadOnly={false}
        value={dependentPassportNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName,
              dependentPassportNumber: value,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.dependentPassportNumber ?? value;
          }
          if (errors.dependentPassportNumber?.hasError) {
            runValidationTasks("dependentPassportNumber", value);
          }
          setDependentPassportNumber(value);
        }}
        onBlur={() =>
          runValidationTasks("dependentPassportNumber", dependentPassportNumber)
        }
        errorMessage={errors.dependentPassportNumber?.errorMessage}
        hasError={errors.dependentPassportNumber?.hasError}
        {...getOverrideProps(overrides, "dependentPassportNumber")}
      ></TextField>
      <TextField
        label="Dependent passport expiy"
        isRequired={true}
        isReadOnly={false}
        value={dependentPassportExpiy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy: value,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.dependentPassportExpiy ?? value;
          }
          if (errors.dependentPassportExpiy?.hasError) {
            runValidationTasks("dependentPassportExpiy", value);
          }
          setDependentPassportExpiy(value);
        }}
        onBlur={() =>
          runValidationTasks("dependentPassportExpiy", dependentPassportExpiy)
        }
        errorMessage={errors.dependentPassportExpiy?.errorMessage}
        hasError={errors.dependentPassportExpiy?.hasError}
        {...getOverrideProps(overrides, "dependentPassportExpiy")}
      ></TextField>
      <TextField
        label="Labour deposit paid by"
        isRequired={true}
        isReadOnly={false}
        value={labourDepositPaidBy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy: value,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.labourDepositPaidBy ?? value;
          }
          if (errors.labourDepositPaidBy?.hasError) {
            runValidationTasks("labourDepositPaidBy", value);
          }
          setLabourDepositPaidBy(value);
        }}
        onBlur={() =>
          runValidationTasks("labourDepositPaidBy", labourDepositPaidBy)
        }
        errorMessage={errors.labourDepositPaidBy?.errorMessage}
        hasError={errors.labourDepositPaidBy?.hasError}
        {...getOverrideProps(overrides, "labourDepositPaidBy")}
      ></TextField>
      <TextField
        label="Labour deposit receipt number"
        isRequired={true}
        isReadOnly={false}
        value={labourDepositReceiptNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber: value,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.labourDepositReceiptNumber ?? value;
          }
          if (errors.labourDepositReceiptNumber?.hasError) {
            runValidationTasks("labourDepositReceiptNumber", value);
          }
          setLabourDepositReceiptNumber(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "labourDepositReceiptNumber",
            labourDepositReceiptNumber
          )
        }
        errorMessage={errors.labourDepositReceiptNumber?.errorMessage}
        hasError={errors.labourDepositReceiptNumber?.hasError}
        {...getOverrideProps(overrides, "labourDepositReceiptNumber")}
      ></TextField>
      <TextField
        label="Labour deposit amount"
        isRequired={true}
        isReadOnly={false}
        value={labourDepositAmount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount: value,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.labourDepositAmount ?? value;
          }
          if (errors.labourDepositAmount?.hasError) {
            runValidationTasks("labourDepositAmount", value);
          }
          setLabourDepositAmount(value);
        }}
        onBlur={() =>
          runValidationTasks("labourDepositAmount", labourDepositAmount)
        }
        errorMessage={errors.labourDepositAmount?.errorMessage}
        hasError={errors.labourDepositAmount?.hasError}
        {...getOverrideProps(overrides, "labourDepositAmount")}
      ></TextField>
      <TextField
        label="Passport location"
        isRequired={true}
        isReadOnly={false}
        value={passportLocation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation: value,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.passportLocation ?? value;
          }
          if (errors.passportLocation?.hasError) {
            runValidationTasks("passportLocation", value);
          }
          setPassportLocation(value);
        }}
        onBlur={() => runValidationTasks("passportLocation", passportLocation)}
        errorMessage={errors.passportLocation?.errorMessage}
        hasError={errors.passportLocation?.hasError}
        {...getOverrideProps(overrides, "passportLocation")}
      ></TextField>
      <TextField
        label="Re entry visa application"
        isRequired={true}
        isReadOnly={false}
        value={reEntryVisaApplication}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication: value,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.reEntryVisaApplication ?? value;
          }
          if (errors.reEntryVisaApplication?.hasError) {
            runValidationTasks("reEntryVisaApplication", value);
          }
          setReEntryVisaApplication(value);
        }}
        onBlur={() =>
          runValidationTasks("reEntryVisaApplication", reEntryVisaApplication)
        }
        errorMessage={errors.reEntryVisaApplication?.errorMessage}
        hasError={errors.reEntryVisaApplication?.hasError}
        {...getOverrideProps(overrides, "reEntryVisaApplication")}
      ></TextField>
      <TextField
        label="Immigration approval date"
        isRequired={true}
        isReadOnly={false}
        value={immigrationApprovalDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate: value,
              reEntryVisaExpiry,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.immigrationApprovalDate ?? value;
          }
          if (errors.immigrationApprovalDate?.hasError) {
            runValidationTasks("immigrationApprovalDate", value);
          }
          setImmigrationApprovalDate(value);
        }}
        onBlur={() =>
          runValidationTasks("immigrationApprovalDate", immigrationApprovalDate)
        }
        errorMessage={errors.immigrationApprovalDate?.errorMessage}
        hasError={errors.immigrationApprovalDate?.hasError}
        {...getOverrideProps(overrides, "immigrationApprovalDate")}
      ></TextField>
      <TextField
        label="Re entry visa expiry"
        isRequired={true}
        isReadOnly={false}
        value={reEntryVisaExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry: value,
              relation,
            };
            const result = onChange(modelFields);
            value = result?.reEntryVisaExpiry ?? value;
          }
          if (errors.reEntryVisaExpiry?.hasError) {
            runValidationTasks("reEntryVisaExpiry", value);
          }
          setReEntryVisaExpiry(value);
        }}
        onBlur={() =>
          runValidationTasks("reEntryVisaExpiry", reEntryVisaExpiry)
        }
        errorMessage={errors.reEntryVisaExpiry?.errorMessage}
        hasError={errors.reEntryVisaExpiry?.hasError}
        {...getOverrideProps(overrides, "reEntryVisaExpiry")}
      ></TextField>
      <TextField
        label="Relation"
        isRequired={true}
        isReadOnly={false}
        value={relation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              airTicketStatus,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiy,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              passportLocation,
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              relation: value,
            };
            const result = onChange(modelFields);
            value = result?.relation ?? value;
          }
          if (errors.relation?.hasError) {
            runValidationTasks("relation", value);
          }
          setRelation(value);
        }}
        onBlur={() => runValidationTasks("relation", relation)}
        errorMessage={errors.relation?.errorMessage}
        hasError={errors.relation?.hasError}
        {...getOverrideProps(overrides, "relation")}
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
