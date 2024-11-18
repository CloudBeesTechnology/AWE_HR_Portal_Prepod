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
import { createCvevSchema } from "../graphql/mutations";
const client = generateClient();
export default function CvevSchemaCreateForm(props) {
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
    cvecApproveDate: "",
    cvecFile: "",
  };
  const [cvecApproveDate, setCvecApproveDate] = React.useState(
    initialValues.cvecApproveDate
  );
  const [cvecFile, setCvecFile] = React.useState(initialValues.cvecFile);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCvecApproveDate(initialValues.cvecApproveDate);
    setCvecFile(initialValues.cvecFile);
    setErrors({});
  };
  const validations = {
    cvecApproveDate: [{ type: "Required" }],
    cvecFile: [{ type: "Required" }],
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
          cvecApproveDate,
          cvecFile,
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
            query: createCvevSchema.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "CvevSchemaCreateForm")}
      {...rest}
    >
      <TextField
        label="Cvec approve date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={cvecApproveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cvecApproveDate: value,
              cvecFile,
            };
            const result = onChange(modelFields);
            value = result?.cvecApproveDate ?? value;
          }
          if (errors.cvecApproveDate?.hasError) {
            runValidationTasks("cvecApproveDate", value);
          }
          setCvecApproveDate(value);
        }}
        onBlur={() => runValidationTasks("cvecApproveDate", cvecApproveDate)}
        errorMessage={errors.cvecApproveDate?.errorMessage}
        hasError={errors.cvecApproveDate?.hasError}
        {...getOverrideProps(overrides, "cvecApproveDate")}
      ></TextField>
      <TextField
        label="Cvec file"
        isRequired={true}
        isReadOnly={false}
        value={cvecFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cvecApproveDate,
              cvecFile: value,
            };
            const result = onChange(modelFields);
            value = result?.cvecFile ?? value;
          }
          if (errors.cvecFile?.hasError) {
            runValidationTasks("cvecFile", value);
          }
          setCvecFile(value);
        }}
        onBlur={() => runValidationTasks("cvecFile", cvecFile)}
        errorMessage={errors.cvecFile?.errorMessage}
        hasError={errors.cvecFile?.hasError}
        {...getOverrideProps(overrides, "cvecFile")}
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
