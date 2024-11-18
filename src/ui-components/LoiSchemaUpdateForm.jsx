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
import { getLoiSchema } from "../graphql/queries";
import { updateLoiSchema } from "../graphql/mutations";
const client = generateClient();
export default function LoiSchemaUpdateForm(props) {
  const {
    id: idProp,
    loiSchema: loiSchemaModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    loiIssueDate: "",
    loiAcceptDate: "",
    loiDeclineDate: "",
    declineReason: "",
    loiFile: "",
  };
  const [loiIssueDate, setLoiIssueDate] = React.useState(
    initialValues.loiIssueDate
  );
  const [loiAcceptDate, setLoiAcceptDate] = React.useState(
    initialValues.loiAcceptDate
  );
  const [loiDeclineDate, setLoiDeclineDate] = React.useState(
    initialValues.loiDeclineDate
  );
  const [declineReason, setDeclineReason] = React.useState(
    initialValues.declineReason
  );
  const [loiFile, setLoiFile] = React.useState(initialValues.loiFile);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = loiSchemaRecord
      ? { ...initialValues, ...loiSchemaRecord }
      : initialValues;
    setLoiIssueDate(cleanValues.loiIssueDate);
    setLoiAcceptDate(cleanValues.loiAcceptDate);
    setLoiDeclineDate(cleanValues.loiDeclineDate);
    setDeclineReason(cleanValues.declineReason);
    setLoiFile(cleanValues.loiFile);
    setErrors({});
  };
  const [loiSchemaRecord, setLoiSchemaRecord] =
    React.useState(loiSchemaModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getLoiSchema.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getLoiSchema
        : loiSchemaModelProp;
      setLoiSchemaRecord(record);
    };
    queryData();
  }, [idProp, loiSchemaModelProp]);
  React.useEffect(resetStateValues, [loiSchemaRecord]);
  const validations = {
    loiIssueDate: [{ type: "Required" }],
    loiAcceptDate: [],
    loiDeclineDate: [],
    declineReason: [],
    loiFile: [],
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
          loiIssueDate,
          loiAcceptDate: loiAcceptDate ?? null,
          loiDeclineDate: loiDeclineDate ?? null,
          declineReason: declineReason ?? null,
          loiFile: loiFile ?? null,
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
            query: updateLoiSchema.replaceAll("__typename", ""),
            variables: {
              input: {
                id: loiSchemaRecord.id,
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
      {...getOverrideProps(overrides, "LoiSchemaUpdateForm")}
      {...rest}
    >
      <TextField
        label="Loi issue date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={loiIssueDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              loiIssueDate: value,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
            };
            const result = onChange(modelFields);
            value = result?.loiIssueDate ?? value;
          }
          if (errors.loiIssueDate?.hasError) {
            runValidationTasks("loiIssueDate", value);
          }
          setLoiIssueDate(value);
        }}
        onBlur={() => runValidationTasks("loiIssueDate", loiIssueDate)}
        errorMessage={errors.loiIssueDate?.errorMessage}
        hasError={errors.loiIssueDate?.hasError}
        {...getOverrideProps(overrides, "loiIssueDate")}
      ></TextField>
      <TextField
        label="Loi accept date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={loiAcceptDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              loiIssueDate,
              loiAcceptDate: value,
              loiDeclineDate,
              declineReason,
              loiFile,
            };
            const result = onChange(modelFields);
            value = result?.loiAcceptDate ?? value;
          }
          if (errors.loiAcceptDate?.hasError) {
            runValidationTasks("loiAcceptDate", value);
          }
          setLoiAcceptDate(value);
        }}
        onBlur={() => runValidationTasks("loiAcceptDate", loiAcceptDate)}
        errorMessage={errors.loiAcceptDate?.errorMessage}
        hasError={errors.loiAcceptDate?.hasError}
        {...getOverrideProps(overrides, "loiAcceptDate")}
      ></TextField>
      <TextField
        label="Loi decline date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={loiDeclineDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate: value,
              declineReason,
              loiFile,
            };
            const result = onChange(modelFields);
            value = result?.loiDeclineDate ?? value;
          }
          if (errors.loiDeclineDate?.hasError) {
            runValidationTasks("loiDeclineDate", value);
          }
          setLoiDeclineDate(value);
        }}
        onBlur={() => runValidationTasks("loiDeclineDate", loiDeclineDate)}
        errorMessage={errors.loiDeclineDate?.errorMessage}
        hasError={errors.loiDeclineDate?.hasError}
        {...getOverrideProps(overrides, "loiDeclineDate")}
      ></TextField>
      <TextField
        label="Decline reason"
        isRequired={false}
        isReadOnly={false}
        value={declineReason}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason: value,
              loiFile,
            };
            const result = onChange(modelFields);
            value = result?.declineReason ?? value;
          }
          if (errors.declineReason?.hasError) {
            runValidationTasks("declineReason", value);
          }
          setDeclineReason(value);
        }}
        onBlur={() => runValidationTasks("declineReason", declineReason)}
        errorMessage={errors.declineReason?.errorMessage}
        hasError={errors.declineReason?.hasError}
        {...getOverrideProps(overrides, "declineReason")}
      ></TextField>
      <TextField
        label="Loi file"
        isRequired={false}
        isReadOnly={false}
        value={loiFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile: value,
            };
            const result = onChange(modelFields);
            value = result?.loiFile ?? value;
          }
          if (errors.loiFile?.hasError) {
            runValidationTasks("loiFile", value);
          }
          setLoiFile(value);
        }}
        onBlur={() => runValidationTasks("loiFile", loiFile)}
        errorMessage={errors.loiFile?.errorMessage}
        hasError={errors.loiFile?.hasError}
        {...getOverrideProps(overrides, "loiFile")}
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
          isDisabled={!(idProp || loiSchemaModelProp)}
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
              !(idProp || loiSchemaModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
