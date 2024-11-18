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
import { getLabourDetails } from "../graphql/queries";
import { updateLabourDetails } from "../graphql/mutations";
const client = generateClient();
export default function LabourDetailsUpdateForm(props) {
  const {
    id: idProp,
    labourDetails: labourDetailsModelProp,
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
    workPermitType: "",
    arrivalStampingExpiry: "",
    employmentPassEndorsemen: "",
    immigrationDeptDate: "",
    employmentPassExpiry: "",
    employmentPassStatus: "",
    overseasMedicalDate: "",
    overseasMedicalExpiry: "",
    bruhimsRegistrationDate: "",
    bruhimsRegistrationNumber: "",
    bruneiMedicalAppointmentDate: "",
    bruneiMedicalExpiry: "",
    passportLocation: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [workPermitType, setWorkPermitType] = React.useState(
    initialValues.workPermitType
  );
  const [arrivalStampingExpiry, setArrivalStampingExpiry] = React.useState(
    initialValues.arrivalStampingExpiry
  );
  const [employmentPassEndorsemen, setEmploymentPassEndorsemen] =
    React.useState(initialValues.employmentPassEndorsemen);
  const [immigrationDeptDate, setImmigrationDeptDate] = React.useState(
    initialValues.immigrationDeptDate
  );
  const [employmentPassExpiry, setEmploymentPassExpiry] = React.useState(
    initialValues.employmentPassExpiry
  );
  const [employmentPassStatus, setEmploymentPassStatus] = React.useState(
    initialValues.employmentPassStatus
  );
  const [overseasMedicalDate, setOverseasMedicalDate] = React.useState(
    initialValues.overseasMedicalDate
  );
  const [overseasMedicalExpiry, setOverseasMedicalExpiry] = React.useState(
    initialValues.overseasMedicalExpiry
  );
  const [bruhimsRegistrationDate, setBruhimsRegistrationDate] = React.useState(
    initialValues.bruhimsRegistrationDate
  );
  const [bruhimsRegistrationNumber, setBruhimsRegistrationNumber] =
    React.useState(initialValues.bruhimsRegistrationNumber);
  const [bruneiMedicalAppointmentDate, setBruneiMedicalAppointmentDate] =
    React.useState(initialValues.bruneiMedicalAppointmentDate);
  const [bruneiMedicalExpiry, setBruneiMedicalExpiry] = React.useState(
    initialValues.bruneiMedicalExpiry
  );
  const [passportLocation, setPassportLocation] = React.useState(
    initialValues.passportLocation
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = labourDetailsRecord
      ? { ...initialValues, ...labourDetailsRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setWorkPermitType(cleanValues.workPermitType);
    setArrivalStampingExpiry(cleanValues.arrivalStampingExpiry);
    setEmploymentPassEndorsemen(cleanValues.employmentPassEndorsemen);
    setImmigrationDeptDate(cleanValues.immigrationDeptDate);
    setEmploymentPassExpiry(cleanValues.employmentPassExpiry);
    setEmploymentPassStatus(cleanValues.employmentPassStatus);
    setOverseasMedicalDate(cleanValues.overseasMedicalDate);
    setOverseasMedicalExpiry(cleanValues.overseasMedicalExpiry);
    setBruhimsRegistrationDate(cleanValues.bruhimsRegistrationDate);
    setBruhimsRegistrationNumber(cleanValues.bruhimsRegistrationNumber);
    setBruneiMedicalAppointmentDate(cleanValues.bruneiMedicalAppointmentDate);
    setBruneiMedicalExpiry(cleanValues.bruneiMedicalExpiry);
    setPassportLocation(cleanValues.passportLocation);
    setErrors({});
  };
  const [labourDetailsRecord, setLabourDetailsRecord] = React.useState(
    labourDetailsModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getLabourDetails.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getLabourDetails
        : labourDetailsModelProp;
      setLabourDetailsRecord(record);
    };
    queryData();
  }, [idProp, labourDetailsModelProp]);
  React.useEffect(resetStateValues, [labourDetailsRecord]);
  const validations = {
    empID: [{ type: "Required" }],
    workPermitType: [{ type: "Required" }],
    arrivalStampingExpiry: [{ type: "Required" }],
    employmentPassEndorsemen: [{ type: "Required" }],
    immigrationDeptDate: [{ type: "Required" }],
    employmentPassExpiry: [{ type: "Required" }],
    employmentPassStatus: [{ type: "Required" }],
    overseasMedicalDate: [{ type: "Required" }],
    overseasMedicalExpiry: [{ type: "Required" }],
    bruhimsRegistrationDate: [{ type: "Required" }],
    bruhimsRegistrationNumber: [{ type: "Required" }],
    bruneiMedicalAppointmentDate: [{ type: "Required" }],
    bruneiMedicalExpiry: [{ type: "Required" }],
    passportLocation: [{ type: "Required" }],
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
          workPermitType,
          arrivalStampingExpiry,
          employmentPassEndorsemen,
          immigrationDeptDate,
          employmentPassExpiry,
          employmentPassStatus,
          overseasMedicalDate,
          overseasMedicalExpiry,
          bruhimsRegistrationDate,
          bruhimsRegistrationNumber,
          bruneiMedicalAppointmentDate,
          bruneiMedicalExpiry,
          passportLocation,
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
            query: updateLabourDetails.replaceAll("__typename", ""),
            variables: {
              input: {
                id: labourDetailsRecord.id,
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
      {...getOverrideProps(overrides, "LabourDetailsUpdateForm")}
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
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
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
        label="Work permit type"
        isRequired={true}
        isReadOnly={false}
        value={workPermitType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType: value,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.workPermitType ?? value;
          }
          if (errors.workPermitType?.hasError) {
            runValidationTasks("workPermitType", value);
          }
          setWorkPermitType(value);
        }}
        onBlur={() => runValidationTasks("workPermitType", workPermitType)}
        errorMessage={errors.workPermitType?.errorMessage}
        hasError={errors.workPermitType?.hasError}
        {...getOverrideProps(overrides, "workPermitType")}
      ></TextField>
      <TextField
        label="Arrival stamping expiry"
        isRequired={true}
        isReadOnly={false}
        value={arrivalStampingExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry: value,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.arrivalStampingExpiry ?? value;
          }
          if (errors.arrivalStampingExpiry?.hasError) {
            runValidationTasks("arrivalStampingExpiry", value);
          }
          setArrivalStampingExpiry(value);
        }}
        onBlur={() =>
          runValidationTasks("arrivalStampingExpiry", arrivalStampingExpiry)
        }
        errorMessage={errors.arrivalStampingExpiry?.errorMessage}
        hasError={errors.arrivalStampingExpiry?.hasError}
        {...getOverrideProps(overrides, "arrivalStampingExpiry")}
      ></TextField>
      <TextField
        label="Employment pass endorsemen"
        isRequired={true}
        isReadOnly={false}
        value={employmentPassEndorsemen}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen: value,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.employmentPassEndorsemen ?? value;
          }
          if (errors.employmentPassEndorsemen?.hasError) {
            runValidationTasks("employmentPassEndorsemen", value);
          }
          setEmploymentPassEndorsemen(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "employmentPassEndorsemen",
            employmentPassEndorsemen
          )
        }
        errorMessage={errors.employmentPassEndorsemen?.errorMessage}
        hasError={errors.employmentPassEndorsemen?.hasError}
        {...getOverrideProps(overrides, "employmentPassEndorsemen")}
      ></TextField>
      <TextField
        label="Immigration dept date"
        isRequired={true}
        isReadOnly={false}
        value={immigrationDeptDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate: value,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.immigrationDeptDate ?? value;
          }
          if (errors.immigrationDeptDate?.hasError) {
            runValidationTasks("immigrationDeptDate", value);
          }
          setImmigrationDeptDate(value);
        }}
        onBlur={() =>
          runValidationTasks("immigrationDeptDate", immigrationDeptDate)
        }
        errorMessage={errors.immigrationDeptDate?.errorMessage}
        hasError={errors.immigrationDeptDate?.hasError}
        {...getOverrideProps(overrides, "immigrationDeptDate")}
      ></TextField>
      <TextField
        label="Employment pass expiry"
        isRequired={true}
        isReadOnly={false}
        value={employmentPassExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry: value,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.employmentPassExpiry ?? value;
          }
          if (errors.employmentPassExpiry?.hasError) {
            runValidationTasks("employmentPassExpiry", value);
          }
          setEmploymentPassExpiry(value);
        }}
        onBlur={() =>
          runValidationTasks("employmentPassExpiry", employmentPassExpiry)
        }
        errorMessage={errors.employmentPassExpiry?.errorMessage}
        hasError={errors.employmentPassExpiry?.hasError}
        {...getOverrideProps(overrides, "employmentPassExpiry")}
      ></TextField>
      <TextField
        label="Employment pass status"
        isRequired={true}
        isReadOnly={false}
        value={employmentPassStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus: value,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.employmentPassStatus ?? value;
          }
          if (errors.employmentPassStatus?.hasError) {
            runValidationTasks("employmentPassStatus", value);
          }
          setEmploymentPassStatus(value);
        }}
        onBlur={() =>
          runValidationTasks("employmentPassStatus", employmentPassStatus)
        }
        errorMessage={errors.employmentPassStatus?.errorMessage}
        hasError={errors.employmentPassStatus?.hasError}
        {...getOverrideProps(overrides, "employmentPassStatus")}
      ></TextField>
      <TextField
        label="Overseas medical date"
        isRequired={true}
        isReadOnly={false}
        value={overseasMedicalDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate: value,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.overseasMedicalDate ?? value;
          }
          if (errors.overseasMedicalDate?.hasError) {
            runValidationTasks("overseasMedicalDate", value);
          }
          setOverseasMedicalDate(value);
        }}
        onBlur={() =>
          runValidationTasks("overseasMedicalDate", overseasMedicalDate)
        }
        errorMessage={errors.overseasMedicalDate?.errorMessage}
        hasError={errors.overseasMedicalDate?.hasError}
        {...getOverrideProps(overrides, "overseasMedicalDate")}
      ></TextField>
      <TextField
        label="Overseas medical expiry"
        isRequired={true}
        isReadOnly={false}
        value={overseasMedicalExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry: value,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.overseasMedicalExpiry ?? value;
          }
          if (errors.overseasMedicalExpiry?.hasError) {
            runValidationTasks("overseasMedicalExpiry", value);
          }
          setOverseasMedicalExpiry(value);
        }}
        onBlur={() =>
          runValidationTasks("overseasMedicalExpiry", overseasMedicalExpiry)
        }
        errorMessage={errors.overseasMedicalExpiry?.errorMessage}
        hasError={errors.overseasMedicalExpiry?.hasError}
        {...getOverrideProps(overrides, "overseasMedicalExpiry")}
      ></TextField>
      <TextField
        label="Bruhims registration date"
        isRequired={true}
        isReadOnly={false}
        value={bruhimsRegistrationDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate: value,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.bruhimsRegistrationDate ?? value;
          }
          if (errors.bruhimsRegistrationDate?.hasError) {
            runValidationTasks("bruhimsRegistrationDate", value);
          }
          setBruhimsRegistrationDate(value);
        }}
        onBlur={() =>
          runValidationTasks("bruhimsRegistrationDate", bruhimsRegistrationDate)
        }
        errorMessage={errors.bruhimsRegistrationDate?.errorMessage}
        hasError={errors.bruhimsRegistrationDate?.hasError}
        {...getOverrideProps(overrides, "bruhimsRegistrationDate")}
      ></TextField>
      <TextField
        label="Bruhims registration number"
        isRequired={true}
        isReadOnly={false}
        value={bruhimsRegistrationNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber: value,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.bruhimsRegistrationNumber ?? value;
          }
          if (errors.bruhimsRegistrationNumber?.hasError) {
            runValidationTasks("bruhimsRegistrationNumber", value);
          }
          setBruhimsRegistrationNumber(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "bruhimsRegistrationNumber",
            bruhimsRegistrationNumber
          )
        }
        errorMessage={errors.bruhimsRegistrationNumber?.errorMessage}
        hasError={errors.bruhimsRegistrationNumber?.hasError}
        {...getOverrideProps(overrides, "bruhimsRegistrationNumber")}
      ></TextField>
      <TextField
        label="Brunei medical appointment date"
        isRequired={true}
        isReadOnly={false}
        value={bruneiMedicalAppointmentDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate: value,
              bruneiMedicalExpiry,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.bruneiMedicalAppointmentDate ?? value;
          }
          if (errors.bruneiMedicalAppointmentDate?.hasError) {
            runValidationTasks("bruneiMedicalAppointmentDate", value);
          }
          setBruneiMedicalAppointmentDate(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "bruneiMedicalAppointmentDate",
            bruneiMedicalAppointmentDate
          )
        }
        errorMessage={errors.bruneiMedicalAppointmentDate?.errorMessage}
        hasError={errors.bruneiMedicalAppointmentDate?.hasError}
        {...getOverrideProps(overrides, "bruneiMedicalAppointmentDate")}
      ></TextField>
      <TextField
        label="Brunei medical expiry"
        isRequired={true}
        isReadOnly={false}
        value={bruneiMedicalExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry: value,
              passportLocation,
            };
            const result = onChange(modelFields);
            value = result?.bruneiMedicalExpiry ?? value;
          }
          if (errors.bruneiMedicalExpiry?.hasError) {
            runValidationTasks("bruneiMedicalExpiry", value);
          }
          setBruneiMedicalExpiry(value);
        }}
        onBlur={() =>
          runValidationTasks("bruneiMedicalExpiry", bruneiMedicalExpiry)
        }
        errorMessage={errors.bruneiMedicalExpiry?.errorMessage}
        hasError={errors.bruneiMedicalExpiry?.hasError}
        {...getOverrideProps(overrides, "bruneiMedicalExpiry")}
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
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsemen,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              overseasMedicalDate,
              overseasMedicalExpiry,
              bruhimsRegistrationDate,
              bruhimsRegistrationNumber,
              bruneiMedicalAppointmentDate,
              bruneiMedicalExpiry,
              passportLocation: value,
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
          isDisabled={!(idProp || labourDetailsModelProp)}
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
              !(idProp || labourDetailsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
