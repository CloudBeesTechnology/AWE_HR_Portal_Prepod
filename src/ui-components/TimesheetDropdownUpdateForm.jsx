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
import { getTimesheetDropdown } from "../graphql/queries";
import { updateTimesheetDropdown } from "../graphql/mutations";
const client = generateClient();
export default function TimesheetDropdownUpdateForm(props) {
  const {
    id: idProp,
    timesheetDropdown: timesheetDropdownModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    dropdownType: "",
    value: "",
  };
  const [dropdownType, setDropdownType] = React.useState(
    initialValues.dropdownType
  );
  const [value, setValue] = React.useState(initialValues.value);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = timesheetDropdownRecord
      ? { ...initialValues, ...timesheetDropdownRecord }
      : initialValues;
    setDropdownType(cleanValues.dropdownType);
    setValue(cleanValues.value);
    setErrors({});
  };
  const [timesheetDropdownRecord, setTimesheetDropdownRecord] = React.useState(
    timesheetDropdownModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTimesheetDropdown.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTimesheetDropdown
        : timesheetDropdownModelProp;
      setTimesheetDropdownRecord(record);
    };
    queryData();
  }, [idProp, timesheetDropdownModelProp]);
  React.useEffect(resetStateValues, [timesheetDropdownRecord]);
  const validations = {
    dropdownType: [],
    value: [],
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
          dropdownType: dropdownType ?? null,
          value: value ?? null,
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
            query: updateTimesheetDropdown.replaceAll("__typename", ""),
            variables: {
              input: {
                id: timesheetDropdownRecord.id,
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
      {...getOverrideProps(overrides, "TimesheetDropdownUpdateForm")}
      {...rest}
    >
      <TextField
        label="Dropdown type"
        isRequired={false}
        isReadOnly={false}
        value={dropdownType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dropdownType: value,
              value,
            };
            const result = onChange(modelFields);
            value = result?.dropdownType ?? value;
          }
          if (errors.dropdownType?.hasError) {
            runValidationTasks("dropdownType", value);
          }
          setDropdownType(value);
        }}
        onBlur={() => runValidationTasks("dropdownType", dropdownType)}
        errorMessage={errors.dropdownType?.errorMessage}
        hasError={errors.dropdownType?.hasError}
        {...getOverrideProps(overrides, "dropdownType")}
      ></TextField>
      <TextField
        label="Value"
        isRequired={false}
        isReadOnly={false}
        value={value}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dropdownType,
              value: value,
            };
            const result = onChange(modelFields);
            value = result?.value ?? value;
          }
          if (errors.value?.hasError) {
            runValidationTasks("value", value);
          }
          setValue(value);
        }}
        onBlur={() => runValidationTasks("value", value)}
        errorMessage={errors.value?.errorMessage}
        hasError={errors.value?.hasError}
        {...getOverrideProps(overrides, "value")}
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
          isDisabled={!(idProp || timesheetDropdownModelProp)}
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
              !(idProp || timesheetDropdownModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
