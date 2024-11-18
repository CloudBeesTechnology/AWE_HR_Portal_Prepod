/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { EmployeePersonalInfo } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function EmployeePersonalInfoUpdateForm(props) {
  const {
    id: idProp,
    employeePersonalInfo: employeePersonalInfoModelProp,
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
    name: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    nationality: "",
    otherNationality: "",
    religion: "",
    marital: "",
    race: "",
    bruneiIcNo: "",
    bruneiIcColour: "",
    bruneiIcExpiry: "",
    malaysianIcNumber: "",
    malaysianIcExpiry: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [name, setName] = React.useState(initialValues.name);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [dateOfBirth, setDateOfBirth] = React.useState(
    initialValues.dateOfBirth
  );
  const [email, setEmail] = React.useState(initialValues.email);
  const [nationality, setNationality] = React.useState(
    initialValues.nationality
  );
  const [otherNationality, setOtherNationality] = React.useState(
    initialValues.otherNationality
  );
  const [religion, setReligion] = React.useState(initialValues.religion);
  const [marital, setMarital] = React.useState(initialValues.marital);
  const [race, setRace] = React.useState(initialValues.race);
  const [bruneiIcNo, setBruneiIcNo] = React.useState(initialValues.bruneiIcNo);
  const [bruneiIcColour, setBruneiIcColour] = React.useState(
    initialValues.bruneiIcColour
  );
  const [bruneiIcExpiry, setBruneiIcExpiry] = React.useState(
    initialValues.bruneiIcExpiry
  );
  const [malaysianIcNumber, setMalaysianIcNumber] = React.useState(
    initialValues.malaysianIcNumber
  );
  const [malaysianIcExpiry, setMalaysianIcExpiry] = React.useState(
    initialValues.malaysianIcExpiry
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = employeePersonalInfoRecord
      ? { ...initialValues, ...employeePersonalInfoRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setName(cleanValues.name);
    setGender(cleanValues.gender);
    setDateOfBirth(cleanValues.dateOfBirth);
    setEmail(cleanValues.email);
    setNationality(cleanValues.nationality);
    setOtherNationality(cleanValues.otherNationality);
    setReligion(cleanValues.religion);
    setMarital(cleanValues.marital);
    setRace(cleanValues.race);
    setBruneiIcNo(cleanValues.bruneiIcNo);
    setBruneiIcColour(cleanValues.bruneiIcColour);
    setBruneiIcExpiry(cleanValues.bruneiIcExpiry);
    setMalaysianIcNumber(cleanValues.malaysianIcNumber);
    setMalaysianIcExpiry(cleanValues.malaysianIcExpiry);
    setErrors({});
  };
  const [employeePersonalInfoRecord, setEmployeePersonalInfoRecord] =
    React.useState(employeePersonalInfoModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(EmployeePersonalInfo, idProp)
        : employeePersonalInfoModelProp;
      setEmployeePersonalInfoRecord(record);
    };
    queryData();
  }, [idProp, employeePersonalInfoModelProp]);
  React.useEffect(resetStateValues, [employeePersonalInfoRecord]);
  const validations = {
    empID: [{ type: "Required" }],
    name: [{ type: "Required" }],
    gender: [{ type: "Required" }],
    dateOfBirth: [{ type: "Required" }],
    email: [{ type: "Required" }],
    nationality: [{ type: "Required" }],
    otherNationality: [],
    religion: [{ type: "Required" }],
    marital: [{ type: "Required" }],
    race: [{ type: "Required" }],
    bruneiIcNo: [],
    bruneiIcColour: [],
    bruneiIcExpiry: [],
    malaysianIcNumber: [],
    malaysianIcExpiry: [],
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
          name,
          gender,
          dateOfBirth,
          email,
          nationality,
          otherNationality,
          religion,
          marital,
          race,
          bruneiIcNo,
          bruneiIcColour,
          bruneiIcExpiry,
          malaysianIcNumber,
          malaysianIcExpiry,
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
            EmployeePersonalInfo.copyOf(
              employeePersonalInfoRecord,
              (updated) => {
                Object.assign(updated, modelFields);
              }
            )
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
      {...getOverrideProps(overrides, "EmployeePersonalInfoUpdateForm")}
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
              name,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
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
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name: value,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Gender"
        isRequired={true}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender: value,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      ></TextField>
      <TextField
        label="Date of birth"
        isRequired={true}
        isReadOnly={false}
        value={dateOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth: value,
              email,
              nationality,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.dateOfBirth ?? value;
          }
          if (errors.dateOfBirth?.hasError) {
            runValidationTasks("dateOfBirth", value);
          }
          setDateOfBirth(value);
        }}
        onBlur={() => runValidationTasks("dateOfBirth", dateOfBirth)}
        errorMessage={errors.dateOfBirth?.errorMessage}
        hasError={errors.dateOfBirth?.hasError}
        {...getOverrideProps(overrides, "dateOfBirth")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email: value,
              nationality,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Nationality"
        isRequired={true}
        isReadOnly={false}
        value={nationality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email,
              nationality: value,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.nationality ?? value;
          }
          if (errors.nationality?.hasError) {
            runValidationTasks("nationality", value);
          }
          setNationality(value);
        }}
        onBlur={() => runValidationTasks("nationality", nationality)}
        errorMessage={errors.nationality?.errorMessage}
        hasError={errors.nationality?.hasError}
        {...getOverrideProps(overrides, "nationality")}
      ></TextField>
      <TextField
        label="Other nationality"
        isRequired={false}
        isReadOnly={false}
        value={otherNationality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality: value,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.otherNationality ?? value;
          }
          if (errors.otherNationality?.hasError) {
            runValidationTasks("otherNationality", value);
          }
          setOtherNationality(value);
        }}
        onBlur={() => runValidationTasks("otherNationality", otherNationality)}
        errorMessage={errors.otherNationality?.errorMessage}
        hasError={errors.otherNationality?.hasError}
        {...getOverrideProps(overrides, "otherNationality")}
      ></TextField>
      <TextField
        label="Religion"
        isRequired={true}
        isReadOnly={false}
        value={religion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion: value,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.religion ?? value;
          }
          if (errors.religion?.hasError) {
            runValidationTasks("religion", value);
          }
          setReligion(value);
        }}
        onBlur={() => runValidationTasks("religion", religion)}
        errorMessage={errors.religion?.errorMessage}
        hasError={errors.religion?.hasError}
        {...getOverrideProps(overrides, "religion")}
      ></TextField>
      <TextField
        label="Marital"
        isRequired={true}
        isReadOnly={false}
        value={marital}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion,
              marital: value,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.marital ?? value;
          }
          if (errors.marital?.hasError) {
            runValidationTasks("marital", value);
          }
          setMarital(value);
        }}
        onBlur={() => runValidationTasks("marital", marital)}
        errorMessage={errors.marital?.errorMessage}
        hasError={errors.marital?.hasError}
        {...getOverrideProps(overrides, "marital")}
      ></TextField>
      <TextField
        label="Race"
        isRequired={true}
        isReadOnly={false}
        value={race}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion,
              marital,
              race: value,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.race ?? value;
          }
          if (errors.race?.hasError) {
            runValidationTasks("race", value);
          }
          setRace(value);
        }}
        onBlur={() => runValidationTasks("race", race)}
        errorMessage={errors.race?.errorMessage}
        hasError={errors.race?.hasError}
        {...getOverrideProps(overrides, "race")}
      ></TextField>
      <TextField
        label="Brunei ic no"
        isRequired={false}
        isReadOnly={false}
        value={bruneiIcNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo: value,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.bruneiIcNo ?? value;
          }
          if (errors.bruneiIcNo?.hasError) {
            runValidationTasks("bruneiIcNo", value);
          }
          setBruneiIcNo(value);
        }}
        onBlur={() => runValidationTasks("bruneiIcNo", bruneiIcNo)}
        errorMessage={errors.bruneiIcNo?.errorMessage}
        hasError={errors.bruneiIcNo?.hasError}
        {...getOverrideProps(overrides, "bruneiIcNo")}
      ></TextField>
      <TextField
        label="Brunei ic colour"
        isRequired={false}
        isReadOnly={false}
        value={bruneiIcColour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour: value,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.bruneiIcColour ?? value;
          }
          if (errors.bruneiIcColour?.hasError) {
            runValidationTasks("bruneiIcColour", value);
          }
          setBruneiIcColour(value);
        }}
        onBlur={() => runValidationTasks("bruneiIcColour", bruneiIcColour)}
        errorMessage={errors.bruneiIcColour?.errorMessage}
        hasError={errors.bruneiIcColour?.hasError}
        {...getOverrideProps(overrides, "bruneiIcColour")}
      ></TextField>
      <TextField
        label="Brunei ic expiry"
        isRequired={false}
        isReadOnly={false}
        value={bruneiIcExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry: value,
              malaysianIcNumber,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.bruneiIcExpiry ?? value;
          }
          if (errors.bruneiIcExpiry?.hasError) {
            runValidationTasks("bruneiIcExpiry", value);
          }
          setBruneiIcExpiry(value);
        }}
        onBlur={() => runValidationTasks("bruneiIcExpiry", bruneiIcExpiry)}
        errorMessage={errors.bruneiIcExpiry?.errorMessage}
        hasError={errors.bruneiIcExpiry?.hasError}
        {...getOverrideProps(overrides, "bruneiIcExpiry")}
      ></TextField>
      <TextField
        label="Malaysian ic number"
        isRequired={false}
        isReadOnly={false}
        value={malaysianIcNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber: value,
              malaysianIcExpiry,
            };
            const result = onChange(modelFields);
            value = result?.malaysianIcNumber ?? value;
          }
          if (errors.malaysianIcNumber?.hasError) {
            runValidationTasks("malaysianIcNumber", value);
          }
          setMalaysianIcNumber(value);
        }}
        onBlur={() =>
          runValidationTasks("malaysianIcNumber", malaysianIcNumber)
        }
        errorMessage={errors.malaysianIcNumber?.errorMessage}
        hasError={errors.malaysianIcNumber?.hasError}
        {...getOverrideProps(overrides, "malaysianIcNumber")}
      ></TextField>
      <TextField
        label="Malaysian ic expiry"
        isRequired={false}
        isReadOnly={false}
        value={malaysianIcExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              name,
              gender,
              dateOfBirth,
              email,
              nationality,
              otherNationality,
              religion,
              marital,
              race,
              bruneiIcNo,
              bruneiIcColour,
              bruneiIcExpiry,
              malaysianIcNumber,
              malaysianIcExpiry: value,
            };
            const result = onChange(modelFields);
            value = result?.malaysianIcExpiry ?? value;
          }
          if (errors.malaysianIcExpiry?.hasError) {
            runValidationTasks("malaysianIcExpiry", value);
          }
          setMalaysianIcExpiry(value);
        }}
        onBlur={() =>
          runValidationTasks("malaysianIcExpiry", malaysianIcExpiry)
        }
        errorMessage={errors.malaysianIcExpiry?.errorMessage}
        hasError={errors.malaysianIcExpiry?.hasError}
        {...getOverrideProps(overrides, "malaysianIcExpiry")}
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
          isDisabled={!(idProp || employeePersonalInfoModelProp)}
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
              !(idProp || employeePersonalInfoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
