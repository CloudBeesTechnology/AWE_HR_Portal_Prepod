/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { ApplicantDetails } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function ApplicantDetailsCreateForm(props) {
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
    profilePhoto: "",
    agent: "",
    position: "",
    contractType: "",
    name: "",
    chinese: "",
    gender: "",
    age: "",
    email: "",
    countryOfBirth: "",
    nationality: "",
    otherNationality: "",
    marital: "",
    race: "",
    otherRace: "",
    religion: "",
    otherReligion: "",
  };
  const [profilePhoto, setProfilePhoto] = React.useState(
    initialValues.profilePhoto
  );
  const [agent, setAgent] = React.useState(initialValues.agent);
  const [position, setPosition] = React.useState(initialValues.position);
  const [contractType, setContractType] = React.useState(
    initialValues.contractType
  );
  const [name, setName] = React.useState(initialValues.name);
  const [chinese, setChinese] = React.useState(initialValues.chinese);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [age, setAge] = React.useState(initialValues.age);
  const [email, setEmail] = React.useState(initialValues.email);
  const [countryOfBirth, setCountryOfBirth] = React.useState(
    initialValues.countryOfBirth
  );
  const [nationality, setNationality] = React.useState(
    initialValues.nationality
  );
  const [otherNationality, setOtherNationality] = React.useState(
    initialValues.otherNationality
  );
  const [marital, setMarital] = React.useState(initialValues.marital);
  const [race, setRace] = React.useState(initialValues.race);
  const [otherRace, setOtherRace] = React.useState(initialValues.otherRace);
  const [religion, setReligion] = React.useState(initialValues.religion);
  const [otherReligion, setOtherReligion] = React.useState(
    initialValues.otherReligion
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setProfilePhoto(initialValues.profilePhoto);
    setAgent(initialValues.agent);
    setPosition(initialValues.position);
    setContractType(initialValues.contractType);
    setName(initialValues.name);
    setChinese(initialValues.chinese);
    setGender(initialValues.gender);
    setAge(initialValues.age);
    setEmail(initialValues.email);
    setCountryOfBirth(initialValues.countryOfBirth);
    setNationality(initialValues.nationality);
    setOtherNationality(initialValues.otherNationality);
    setMarital(initialValues.marital);
    setRace(initialValues.race);
    setOtherRace(initialValues.otherRace);
    setReligion(initialValues.religion);
    setOtherReligion(initialValues.otherReligion);
    setErrors({});
  };
  const validations = {
    profilePhoto: [{ type: "Required" }],
    agent: [],
    position: [{ type: "Required" }],
    contractType: [{ type: "Required" }],
    name: [{ type: "Required" }],
    chinese: [],
    gender: [{ type: "Required" }],
    age: [{ type: "Required" }],
    email: [{ type: "Required" }],
    countryOfBirth: [{ type: "Required" }],
    nationality: [{ type: "Required" }],
    otherNationality: [],
    marital: [{ type: "Required" }],
    race: [{ type: "Required" }],
    otherRace: [],
    religion: [{ type: "Required" }],
    otherReligion: [],
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
          profilePhoto,
          agent,
          position,
          contractType,
          name,
          chinese,
          gender,
          age,
          email,
          countryOfBirth,
          nationality,
          otherNationality,
          marital,
          race,
          otherRace,
          religion,
          otherReligion,
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
          await DataStore.save(new ApplicantDetails(modelFields));
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
      {...getOverrideProps(overrides, "ApplicantDetailsCreateForm")}
      {...rest}
    >
      <TextField
        label="Profile photo"
        isRequired={true}
        isReadOnly={false}
        value={profilePhoto}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto: value,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
            };
            const result = onChange(modelFields);
            value = result?.profilePhoto ?? value;
          }
          if (errors.profilePhoto?.hasError) {
            runValidationTasks("profilePhoto", value);
          }
          setProfilePhoto(value);
        }}
        onBlur={() => runValidationTasks("profilePhoto", profilePhoto)}
        errorMessage={errors.profilePhoto?.errorMessage}
        hasError={errors.profilePhoto?.hasError}
        {...getOverrideProps(overrides, "profilePhoto")}
      ></TextField>
      <TextField
        label="Agent"
        isRequired={false}
        isReadOnly={false}
        value={agent}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent: value,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
            };
            const result = onChange(modelFields);
            value = result?.agent ?? value;
          }
          if (errors.agent?.hasError) {
            runValidationTasks("agent", value);
          }
          setAgent(value);
        }}
        onBlur={() => runValidationTasks("agent", agent)}
        errorMessage={errors.agent?.errorMessage}
        hasError={errors.agent?.hasError}
        {...getOverrideProps(overrides, "agent")}
      ></TextField>
      <TextField
        label="Position"
        isRequired={true}
        isReadOnly={false}
        value={position}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position: value,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
            };
            const result = onChange(modelFields);
            value = result?.position ?? value;
          }
          if (errors.position?.hasError) {
            runValidationTasks("position", value);
          }
          setPosition(value);
        }}
        onBlur={() => runValidationTasks("position", position)}
        errorMessage={errors.position?.errorMessage}
        hasError={errors.position?.hasError}
        {...getOverrideProps(overrides, "position")}
      ></TextField>
      <TextField
        label="Contract type"
        isRequired={true}
        isReadOnly={false}
        value={contractType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType: value,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
            };
            const result = onChange(modelFields);
            value = result?.contractType ?? value;
          }
          if (errors.contractType?.hasError) {
            runValidationTasks("contractType", value);
          }
          setContractType(value);
        }}
        onBlur={() => runValidationTasks("contractType", contractType)}
        errorMessage={errors.contractType?.errorMessage}
        hasError={errors.contractType?.hasError}
        {...getOverrideProps(overrides, "contractType")}
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
              profilePhoto,
              agent,
              position,
              contractType,
              name: value,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
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
        label="Chinese"
        isRequired={false}
        isReadOnly={false}
        value={chinese}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese: value,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
            };
            const result = onChange(modelFields);
            value = result?.chinese ?? value;
          }
          if (errors.chinese?.hasError) {
            runValidationTasks("chinese", value);
          }
          setChinese(value);
        }}
        onBlur={() => runValidationTasks("chinese", chinese)}
        errorMessage={errors.chinese?.errorMessage}
        hasError={errors.chinese?.hasError}
        {...getOverrideProps(overrides, "chinese")}
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
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender: value,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
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
        label="Age"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age: value,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
            };
            const result = onChange(modelFields);
            value = result?.age ?? value;
          }
          if (errors.age?.hasError) {
            runValidationTasks("age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("age", age)}
        errorMessage={errors.age?.errorMessage}
        hasError={errors.age?.hasError}
        {...getOverrideProps(overrides, "age")}
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
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email: value,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
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
        label="Country of birth"
        isRequired={true}
        isReadOnly={false}
        value={countryOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth: value,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
            };
            const result = onChange(modelFields);
            value = result?.countryOfBirth ?? value;
          }
          if (errors.countryOfBirth?.hasError) {
            runValidationTasks("countryOfBirth", value);
          }
          setCountryOfBirth(value);
        }}
        onBlur={() => runValidationTasks("countryOfBirth", countryOfBirth)}
        errorMessage={errors.countryOfBirth?.errorMessage}
        hasError={errors.countryOfBirth?.hasError}
        {...getOverrideProps(overrides, "countryOfBirth")}
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
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality: value,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
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
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality: value,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
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
        label="Marital"
        isRequired={true}
        isReadOnly={false}
        value={marital}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital: value,
              race,
              otherRace,
              religion,
              otherReligion,
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
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race: value,
              otherRace,
              religion,
              otherReligion,
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
        label="Other race"
        isRequired={false}
        isReadOnly={false}
        value={otherRace}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace: value,
              religion,
              otherReligion,
            };
            const result = onChange(modelFields);
            value = result?.otherRace ?? value;
          }
          if (errors.otherRace?.hasError) {
            runValidationTasks("otherRace", value);
          }
          setOtherRace(value);
        }}
        onBlur={() => runValidationTasks("otherRace", otherRace)}
        errorMessage={errors.otherRace?.errorMessage}
        hasError={errors.otherRace?.hasError}
        {...getOverrideProps(overrides, "otherRace")}
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
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion: value,
              otherReligion,
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
        label="Other religion"
        isRequired={false}
        isReadOnly={false}
        value={otherReligion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion: value,
            };
            const result = onChange(modelFields);
            value = result?.otherReligion ?? value;
          }
          if (errors.otherReligion?.hasError) {
            runValidationTasks("otherReligion", value);
          }
          setOtherReligion(value);
        }}
        onBlur={() => runValidationTasks("otherReligion", otherReligion)}
        errorMessage={errors.otherReligion?.errorMessage}
        hasError={errors.otherReligion?.hasError}
        {...getOverrideProps(overrides, "otherReligion")}
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
