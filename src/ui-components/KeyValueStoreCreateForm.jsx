/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createKeyValueStore } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function KeyValueStoreCreateForm(props) {
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
    departmentDD: [],
    positionDD: [],
    jobCatDD: [],
    raceDD: [],
    religionDD: [],
    nationalityDD: [],
    countryORDD: [],
    educLevelDD: [],
    workStatusDD: [],
    relationshipDD: [],
    resignNotifProbDD: [],
    termiNotifProbDD: [],
    resignNotifConfDD: [],
    termiNotifConfDD: [],
    workPermitDD: "",
    insuHSDD: [],
    insuClaimDD: [],
  };
  const [departmentDD, setDepartmentDD] = React.useState(
    initialValues.departmentDD
  );
  const [positionDD, setPositionDD] = React.useState(initialValues.positionDD);
  const [jobCatDD, setJobCatDD] = React.useState(initialValues.jobCatDD);
  const [raceDD, setRaceDD] = React.useState(initialValues.raceDD);
  const [religionDD, setReligionDD] = React.useState(initialValues.religionDD);
  const [nationalityDD, setNationalityDD] = React.useState(
    initialValues.nationalityDD
  );
  const [countryORDD, setCountryORDD] = React.useState(
    initialValues.countryORDD
  );
  const [educLevelDD, setEducLevelDD] = React.useState(
    initialValues.educLevelDD
  );
  const [workStatusDD, setWorkStatusDD] = React.useState(
    initialValues.workStatusDD
  );
  const [relationshipDD, setRelationshipDD] = React.useState(
    initialValues.relationshipDD
  );
  const [resignNotifProbDD, setResignNotifProbDD] = React.useState(
    initialValues.resignNotifProbDD
  );
  const [termiNotifProbDD, setTermiNotifProbDD] = React.useState(
    initialValues.termiNotifProbDD
  );
  const [resignNotifConfDD, setResignNotifConfDD] = React.useState(
    initialValues.resignNotifConfDD
  );
  const [termiNotifConfDD, setTermiNotifConfDD] = React.useState(
    initialValues.termiNotifConfDD
  );
  const [workPermitDD, setWorkPermitDD] = React.useState(
    initialValues.workPermitDD
  );
  const [insuHSDD, setInsuHSDD] = React.useState(initialValues.insuHSDD);
  const [insuClaimDD, setInsuClaimDD] = React.useState(
    initialValues.insuClaimDD
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDepartmentDD(initialValues.departmentDD);
    setCurrentDepartmentDDValue("");
    setPositionDD(initialValues.positionDD);
    setCurrentPositionDDValue("");
    setJobCatDD(initialValues.jobCatDD);
    setCurrentJobCatDDValue("");
    setRaceDD(initialValues.raceDD);
    setCurrentRaceDDValue("");
    setReligionDD(initialValues.religionDD);
    setCurrentReligionDDValue("");
    setNationalityDD(initialValues.nationalityDD);
    setCurrentNationalityDDValue("");
    setCountryORDD(initialValues.countryORDD);
    setCurrentCountryORDDValue("");
    setEducLevelDD(initialValues.educLevelDD);
    setCurrentEducLevelDDValue("");
    setWorkStatusDD(initialValues.workStatusDD);
    setCurrentWorkStatusDDValue("");
    setRelationshipDD(initialValues.relationshipDD);
    setCurrentRelationshipDDValue("");
    setResignNotifProbDD(initialValues.resignNotifProbDD);
    setCurrentResignNotifProbDDValue("");
    setTermiNotifProbDD(initialValues.termiNotifProbDD);
    setCurrentTermiNotifProbDDValue("");
    setResignNotifConfDD(initialValues.resignNotifConfDD);
    setCurrentResignNotifConfDDValue("");
    setTermiNotifConfDD(initialValues.termiNotifConfDD);
    setCurrentTermiNotifConfDDValue("");
    setWorkPermitDD(initialValues.workPermitDD);
    setInsuHSDD(initialValues.insuHSDD);
    setCurrentInsuHSDDValue("");
    setInsuClaimDD(initialValues.insuClaimDD);
    setCurrentInsuClaimDDValue("");
    setErrors({});
  };
  const [currentDepartmentDDValue, setCurrentDepartmentDDValue] =
    React.useState("");
  const departmentDDRef = React.createRef();
  const [currentPositionDDValue, setCurrentPositionDDValue] =
    React.useState("");
  const positionDDRef = React.createRef();
  const [currentJobCatDDValue, setCurrentJobCatDDValue] = React.useState("");
  const jobCatDDRef = React.createRef();
  const [currentRaceDDValue, setCurrentRaceDDValue] = React.useState("");
  const raceDDRef = React.createRef();
  const [currentReligionDDValue, setCurrentReligionDDValue] =
    React.useState("");
  const religionDDRef = React.createRef();
  const [currentNationalityDDValue, setCurrentNationalityDDValue] =
    React.useState("");
  const nationalityDDRef = React.createRef();
  const [currentCountryORDDValue, setCurrentCountryORDDValue] =
    React.useState("");
  const countryORDDRef = React.createRef();
  const [currentEducLevelDDValue, setCurrentEducLevelDDValue] =
    React.useState("");
  const educLevelDDRef = React.createRef();
  const [currentWorkStatusDDValue, setCurrentWorkStatusDDValue] =
    React.useState("");
  const workStatusDDRef = React.createRef();
  const [currentRelationshipDDValue, setCurrentRelationshipDDValue] =
    React.useState("");
  const relationshipDDRef = React.createRef();
  const [currentResignNotifProbDDValue, setCurrentResignNotifProbDDValue] =
    React.useState("");
  const resignNotifProbDDRef = React.createRef();
  const [currentTermiNotifProbDDValue, setCurrentTermiNotifProbDDValue] =
    React.useState("");
  const termiNotifProbDDRef = React.createRef();
  const [currentResignNotifConfDDValue, setCurrentResignNotifConfDDValue] =
    React.useState("");
  const resignNotifConfDDRef = React.createRef();
  const [currentTermiNotifConfDDValue, setCurrentTermiNotifConfDDValue] =
    React.useState("");
  const termiNotifConfDDRef = React.createRef();
  const [currentInsuHSDDValue, setCurrentInsuHSDDValue] = React.useState("");
  const insuHSDDRef = React.createRef();
  const [currentInsuClaimDDValue, setCurrentInsuClaimDDValue] =
    React.useState("");
  const insuClaimDDRef = React.createRef();
  const validations = {
    departmentDD: [],
    positionDD: [],
    jobCatDD: [],
    raceDD: [],
    religionDD: [],
    nationalityDD: [],
    countryORDD: [],
    educLevelDD: [],
    workStatusDD: [],
    relationshipDD: [],
    resignNotifProbDD: [],
    termiNotifProbDD: [],
    resignNotifConfDD: [],
    termiNotifConfDD: [],
    workPermitDD: [],
    insuHSDD: [],
    insuClaimDD: [],
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
          departmentDD,
          positionDD,
          jobCatDD,
          raceDD,
          religionDD,
          nationalityDD,
          countryORDD,
          educLevelDD,
          workStatusDD,
          relationshipDD,
          resignNotifProbDD,
          termiNotifProbDD,
          resignNotifConfDD,
          termiNotifConfDD,
          workPermitDD,
          insuHSDD,
          insuClaimDD,
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
            query: createKeyValueStore.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "KeyValueStoreCreateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD: values,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.departmentDD ?? values;
          }
          setDepartmentDD(values);
          setCurrentDepartmentDDValue("");
        }}
        currentFieldValue={currentDepartmentDDValue}
        label={"Department dd"}
        items={departmentDD}
        hasError={errors?.departmentDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("departmentDD", currentDepartmentDDValue)
        }
        errorMessage={errors?.departmentDD?.errorMessage}
        setFieldValue={setCurrentDepartmentDDValue}
        inputFieldRef={departmentDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Department dd"
          isRequired={false}
          isReadOnly={false}
          value={currentDepartmentDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.departmentDD?.hasError) {
              runValidationTasks("departmentDD", value);
            }
            setCurrentDepartmentDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("departmentDD", currentDepartmentDDValue)
          }
          errorMessage={errors.departmentDD?.errorMessage}
          hasError={errors.departmentDD?.hasError}
          ref={departmentDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "departmentDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD: values,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.positionDD ?? values;
          }
          setPositionDD(values);
          setCurrentPositionDDValue("");
        }}
        currentFieldValue={currentPositionDDValue}
        label={"Position dd"}
        items={positionDD}
        hasError={errors?.positionDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("positionDD", currentPositionDDValue)
        }
        errorMessage={errors?.positionDD?.errorMessage}
        setFieldValue={setCurrentPositionDDValue}
        inputFieldRef={positionDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Position dd"
          isRequired={false}
          isReadOnly={false}
          value={currentPositionDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.positionDD?.hasError) {
              runValidationTasks("positionDD", value);
            }
            setCurrentPositionDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("positionDD", currentPositionDDValue)
          }
          errorMessage={errors.positionDD?.errorMessage}
          hasError={errors.positionDD?.hasError}
          ref={positionDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "positionDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD: values,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.jobCatDD ?? values;
          }
          setJobCatDD(values);
          setCurrentJobCatDDValue("");
        }}
        currentFieldValue={currentJobCatDDValue}
        label={"Job cat dd"}
        items={jobCatDD}
        hasError={errors?.jobCatDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("jobCatDD", currentJobCatDDValue)
        }
        errorMessage={errors?.jobCatDD?.errorMessage}
        setFieldValue={setCurrentJobCatDDValue}
        inputFieldRef={jobCatDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Job cat dd"
          isRequired={false}
          isReadOnly={false}
          value={currentJobCatDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.jobCatDD?.hasError) {
              runValidationTasks("jobCatDD", value);
            }
            setCurrentJobCatDDValue(value);
          }}
          onBlur={() => runValidationTasks("jobCatDD", currentJobCatDDValue)}
          errorMessage={errors.jobCatDD?.errorMessage}
          hasError={errors.jobCatDD?.hasError}
          ref={jobCatDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "jobCatDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD: values,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.raceDD ?? values;
          }
          setRaceDD(values);
          setCurrentRaceDDValue("");
        }}
        currentFieldValue={currentRaceDDValue}
        label={"Race dd"}
        items={raceDD}
        hasError={errors?.raceDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("raceDD", currentRaceDDValue)
        }
        errorMessage={errors?.raceDD?.errorMessage}
        setFieldValue={setCurrentRaceDDValue}
        inputFieldRef={raceDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Race dd"
          isRequired={false}
          isReadOnly={false}
          value={currentRaceDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.raceDD?.hasError) {
              runValidationTasks("raceDD", value);
            }
            setCurrentRaceDDValue(value);
          }}
          onBlur={() => runValidationTasks("raceDD", currentRaceDDValue)}
          errorMessage={errors.raceDD?.errorMessage}
          hasError={errors.raceDD?.hasError}
          ref={raceDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "raceDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD: values,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.religionDD ?? values;
          }
          setReligionDD(values);
          setCurrentReligionDDValue("");
        }}
        currentFieldValue={currentReligionDDValue}
        label={"Religion dd"}
        items={religionDD}
        hasError={errors?.religionDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("religionDD", currentReligionDDValue)
        }
        errorMessage={errors?.religionDD?.errorMessage}
        setFieldValue={setCurrentReligionDDValue}
        inputFieldRef={religionDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Religion dd"
          isRequired={false}
          isReadOnly={false}
          value={currentReligionDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.religionDD?.hasError) {
              runValidationTasks("religionDD", value);
            }
            setCurrentReligionDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("religionDD", currentReligionDDValue)
          }
          errorMessage={errors.religionDD?.errorMessage}
          hasError={errors.religionDD?.hasError}
          ref={religionDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "religionDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD: values,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.nationalityDD ?? values;
          }
          setNationalityDD(values);
          setCurrentNationalityDDValue("");
        }}
        currentFieldValue={currentNationalityDDValue}
        label={"Nationality dd"}
        items={nationalityDD}
        hasError={errors?.nationalityDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("nationalityDD", currentNationalityDDValue)
        }
        errorMessage={errors?.nationalityDD?.errorMessage}
        setFieldValue={setCurrentNationalityDDValue}
        inputFieldRef={nationalityDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Nationality dd"
          isRequired={false}
          isReadOnly={false}
          value={currentNationalityDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.nationalityDD?.hasError) {
              runValidationTasks("nationalityDD", value);
            }
            setCurrentNationalityDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("nationalityDD", currentNationalityDDValue)
          }
          errorMessage={errors.nationalityDD?.errorMessage}
          hasError={errors.nationalityDD?.hasError}
          ref={nationalityDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "nationalityDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD: values,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.countryORDD ?? values;
          }
          setCountryORDD(values);
          setCurrentCountryORDDValue("");
        }}
        currentFieldValue={currentCountryORDDValue}
        label={"Country ordd"}
        items={countryORDD}
        hasError={errors?.countryORDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("countryORDD", currentCountryORDDValue)
        }
        errorMessage={errors?.countryORDD?.errorMessage}
        setFieldValue={setCurrentCountryORDDValue}
        inputFieldRef={countryORDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Country ordd"
          isRequired={false}
          isReadOnly={false}
          value={currentCountryORDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.countryORDD?.hasError) {
              runValidationTasks("countryORDD", value);
            }
            setCurrentCountryORDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("countryORDD", currentCountryORDDValue)
          }
          errorMessage={errors.countryORDD?.errorMessage}
          hasError={errors.countryORDD?.hasError}
          ref={countryORDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "countryORDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD: values,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.educLevelDD ?? values;
          }
          setEducLevelDD(values);
          setCurrentEducLevelDDValue("");
        }}
        currentFieldValue={currentEducLevelDDValue}
        label={"Educ level dd"}
        items={educLevelDD}
        hasError={errors?.educLevelDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("educLevelDD", currentEducLevelDDValue)
        }
        errorMessage={errors?.educLevelDD?.errorMessage}
        setFieldValue={setCurrentEducLevelDDValue}
        inputFieldRef={educLevelDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Educ level dd"
          isRequired={false}
          isReadOnly={false}
          value={currentEducLevelDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.educLevelDD?.hasError) {
              runValidationTasks("educLevelDD", value);
            }
            setCurrentEducLevelDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("educLevelDD", currentEducLevelDDValue)
          }
          errorMessage={errors.educLevelDD?.errorMessage}
          hasError={errors.educLevelDD?.hasError}
          ref={educLevelDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "educLevelDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD: values,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.workStatusDD ?? values;
          }
          setWorkStatusDD(values);
          setCurrentWorkStatusDDValue("");
        }}
        currentFieldValue={currentWorkStatusDDValue}
        label={"Work status dd"}
        items={workStatusDD}
        hasError={errors?.workStatusDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("workStatusDD", currentWorkStatusDDValue)
        }
        errorMessage={errors?.workStatusDD?.errorMessage}
        setFieldValue={setCurrentWorkStatusDDValue}
        inputFieldRef={workStatusDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Work status dd"
          isRequired={false}
          isReadOnly={false}
          value={currentWorkStatusDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.workStatusDD?.hasError) {
              runValidationTasks("workStatusDD", value);
            }
            setCurrentWorkStatusDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("workStatusDD", currentWorkStatusDDValue)
          }
          errorMessage={errors.workStatusDD?.errorMessage}
          hasError={errors.workStatusDD?.hasError}
          ref={workStatusDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "workStatusDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD: values,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.relationshipDD ?? values;
          }
          setRelationshipDD(values);
          setCurrentRelationshipDDValue("");
        }}
        currentFieldValue={currentRelationshipDDValue}
        label={"Relationship dd"}
        items={relationshipDD}
        hasError={errors?.relationshipDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("relationshipDD", currentRelationshipDDValue)
        }
        errorMessage={errors?.relationshipDD?.errorMessage}
        setFieldValue={setCurrentRelationshipDDValue}
        inputFieldRef={relationshipDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Relationship dd"
          isRequired={false}
          isReadOnly={false}
          value={currentRelationshipDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.relationshipDD?.hasError) {
              runValidationTasks("relationshipDD", value);
            }
            setCurrentRelationshipDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("relationshipDD", currentRelationshipDDValue)
          }
          errorMessage={errors.relationshipDD?.errorMessage}
          hasError={errors.relationshipDD?.hasError}
          ref={relationshipDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "relationshipDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD: values,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.resignNotifProbDD ?? values;
          }
          setResignNotifProbDD(values);
          setCurrentResignNotifProbDDValue("");
        }}
        currentFieldValue={currentResignNotifProbDDValue}
        label={"Resign notif prob dd"}
        items={resignNotifProbDD}
        hasError={errors?.resignNotifProbDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "resignNotifProbDD",
            currentResignNotifProbDDValue
          )
        }
        errorMessage={errors?.resignNotifProbDD?.errorMessage}
        setFieldValue={setCurrentResignNotifProbDDValue}
        inputFieldRef={resignNotifProbDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Resign notif prob dd"
          isRequired={false}
          isReadOnly={false}
          value={currentResignNotifProbDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.resignNotifProbDD?.hasError) {
              runValidationTasks("resignNotifProbDD", value);
            }
            setCurrentResignNotifProbDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "resignNotifProbDD",
              currentResignNotifProbDDValue
            )
          }
          errorMessage={errors.resignNotifProbDD?.errorMessage}
          hasError={errors.resignNotifProbDD?.hasError}
          ref={resignNotifProbDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "resignNotifProbDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD: values,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.termiNotifProbDD ?? values;
          }
          setTermiNotifProbDD(values);
          setCurrentTermiNotifProbDDValue("");
        }}
        currentFieldValue={currentTermiNotifProbDDValue}
        label={"Termi notif prob dd"}
        items={termiNotifProbDD}
        hasError={errors?.termiNotifProbDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "termiNotifProbDD",
            currentTermiNotifProbDDValue
          )
        }
        errorMessage={errors?.termiNotifProbDD?.errorMessage}
        setFieldValue={setCurrentTermiNotifProbDDValue}
        inputFieldRef={termiNotifProbDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Termi notif prob dd"
          isRequired={false}
          isReadOnly={false}
          value={currentTermiNotifProbDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.termiNotifProbDD?.hasError) {
              runValidationTasks("termiNotifProbDD", value);
            }
            setCurrentTermiNotifProbDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("termiNotifProbDD", currentTermiNotifProbDDValue)
          }
          errorMessage={errors.termiNotifProbDD?.errorMessage}
          hasError={errors.termiNotifProbDD?.hasError}
          ref={termiNotifProbDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "termiNotifProbDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD: values,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.resignNotifConfDD ?? values;
          }
          setResignNotifConfDD(values);
          setCurrentResignNotifConfDDValue("");
        }}
        currentFieldValue={currentResignNotifConfDDValue}
        label={"Resign notif conf dd"}
        items={resignNotifConfDD}
        hasError={errors?.resignNotifConfDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "resignNotifConfDD",
            currentResignNotifConfDDValue
          )
        }
        errorMessage={errors?.resignNotifConfDD?.errorMessage}
        setFieldValue={setCurrentResignNotifConfDDValue}
        inputFieldRef={resignNotifConfDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Resign notif conf dd"
          isRequired={false}
          isReadOnly={false}
          value={currentResignNotifConfDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.resignNotifConfDD?.hasError) {
              runValidationTasks("resignNotifConfDD", value);
            }
            setCurrentResignNotifConfDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "resignNotifConfDD",
              currentResignNotifConfDDValue
            )
          }
          errorMessage={errors.resignNotifConfDD?.errorMessage}
          hasError={errors.resignNotifConfDD?.hasError}
          ref={resignNotifConfDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "resignNotifConfDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD: values,
              workPermitDD,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.termiNotifConfDD ?? values;
          }
          setTermiNotifConfDD(values);
          setCurrentTermiNotifConfDDValue("");
        }}
        currentFieldValue={currentTermiNotifConfDDValue}
        label={"Termi notif conf dd"}
        items={termiNotifConfDD}
        hasError={errors?.termiNotifConfDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "termiNotifConfDD",
            currentTermiNotifConfDDValue
          )
        }
        errorMessage={errors?.termiNotifConfDD?.errorMessage}
        setFieldValue={setCurrentTermiNotifConfDDValue}
        inputFieldRef={termiNotifConfDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Termi notif conf dd"
          isRequired={false}
          isReadOnly={false}
          value={currentTermiNotifConfDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.termiNotifConfDD?.hasError) {
              runValidationTasks("termiNotifConfDD", value);
            }
            setCurrentTermiNotifConfDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("termiNotifConfDD", currentTermiNotifConfDDValue)
          }
          errorMessage={errors.termiNotifConfDD?.errorMessage}
          hasError={errors.termiNotifConfDD?.hasError}
          ref={termiNotifConfDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "termiNotifConfDD")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Work permit dd"
        isRequired={false}
        isReadOnly={false}
        value={workPermitDD}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD: value,
              insuHSDD,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            value = result?.workPermitDD ?? value;
          }
          if (errors.workPermitDD?.hasError) {
            runValidationTasks("workPermitDD", value);
          }
          setWorkPermitDD(value);
        }}
        onBlur={() => runValidationTasks("workPermitDD", workPermitDD)}
        errorMessage={errors.workPermitDD?.errorMessage}
        hasError={errors.workPermitDD?.hasError}
        {...getOverrideProps(overrides, "workPermitDD")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD: values,
              insuClaimDD,
            };
            const result = onChange(modelFields);
            values = result?.insuHSDD ?? values;
          }
          setInsuHSDD(values);
          setCurrentInsuHSDDValue("");
        }}
        currentFieldValue={currentInsuHSDDValue}
        label={"Insu hsdd"}
        items={insuHSDD}
        hasError={errors?.insuHSDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("insuHSDD", currentInsuHSDDValue)
        }
        errorMessage={errors?.insuHSDD?.errorMessage}
        setFieldValue={setCurrentInsuHSDDValue}
        inputFieldRef={insuHSDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Insu hsdd"
          isRequired={false}
          isReadOnly={false}
          value={currentInsuHSDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.insuHSDD?.hasError) {
              runValidationTasks("insuHSDD", value);
            }
            setCurrentInsuHSDDValue(value);
          }}
          onBlur={() => runValidationTasks("insuHSDD", currentInsuHSDDValue)}
          errorMessage={errors.insuHSDD?.errorMessage}
          hasError={errors.insuHSDD?.hasError}
          ref={insuHSDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "insuHSDD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              departmentDD,
              positionDD,
              jobCatDD,
              raceDD,
              religionDD,
              nationalityDD,
              countryORDD,
              educLevelDD,
              workStatusDD,
              relationshipDD,
              resignNotifProbDD,
              termiNotifProbDD,
              resignNotifConfDD,
              termiNotifConfDD,
              workPermitDD,
              insuHSDD,
              insuClaimDD: values,
            };
            const result = onChange(modelFields);
            values = result?.insuClaimDD ?? values;
          }
          setInsuClaimDD(values);
          setCurrentInsuClaimDDValue("");
        }}
        currentFieldValue={currentInsuClaimDDValue}
        label={"Insu claim dd"}
        items={insuClaimDD}
        hasError={errors?.insuClaimDD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("insuClaimDD", currentInsuClaimDDValue)
        }
        errorMessage={errors?.insuClaimDD?.errorMessage}
        setFieldValue={setCurrentInsuClaimDDValue}
        inputFieldRef={insuClaimDDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Insu claim dd"
          isRequired={false}
          isReadOnly={false}
          value={currentInsuClaimDDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.insuClaimDD?.hasError) {
              runValidationTasks("insuClaimDD", value);
            }
            setCurrentInsuClaimDDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("insuClaimDD", currentInsuClaimDDValue)
          }
          errorMessage={errors.insuClaimDD?.errorMessage}
          hasError={errors.insuClaimDD?.hasError}
          ref={insuClaimDDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "insuClaimDD")}
        ></TextField>
      </ArrayField>
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
