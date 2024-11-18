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
import { createMobilizationSchema } from "../graphql/mutations";
const client = generateClient();
export default function MobilizationSchemaCreateForm(props) {
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
    mobSignDate: "",
    mobFile: "",
  };
  const [mobSignDate, setMobSignDate] = React.useState(
    initialValues.mobSignDate
  );
  const [mobFile, setMobFile] = React.useState(initialValues.mobFile);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMobSignDate(initialValues.mobSignDate);
    setMobFile(initialValues.mobFile);
    setErrors({});
  };
  const validations = {
    mobSignDate: [{ type: "Required" }],
    mobFile: [{ type: "Required" }],
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
          mobSignDate,
          mobFile,
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
            query: createMobilizationSchema.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "MobilizationSchemaCreateForm")}
      {...rest}
    >
      <TextField
        label="Mob sign date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={mobSignDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mobSignDate: value,
              mobFile,
            };
            const result = onChange(modelFields);
            value = result?.mobSignDate ?? value;
          }
          if (errors.mobSignDate?.hasError) {
            runValidationTasks("mobSignDate", value);
          }
          setMobSignDate(value);
        }}
        onBlur={() => runValidationTasks("mobSignDate", mobSignDate)}
        errorMessage={errors.mobSignDate?.errorMessage}
        hasError={errors.mobSignDate?.hasError}
        {...getOverrideProps(overrides, "mobSignDate")}
      ></TextField>
      <TextField
        label="Mob file"
        isRequired={true}
        isReadOnly={false}
        value={mobFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mobSignDate,
              mobFile: value,
            };
            const result = onChange(modelFields);
            value = result?.mobFile ?? value;
          }
          if (errors.mobFile?.hasError) {
            runValidationTasks("mobFile", value);
          }
          setMobFile(value);
        }}
        onBlur={() => runValidationTasks("mobFile", mobFile)}
        errorMessage={errors.mobFile?.errorMessage}
        hasError={errors.mobFile?.hasError}
        {...getOverrideProps(overrides, "mobFile")}
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
