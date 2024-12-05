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
import { createEmailNotifi } from "../graphql/mutations";
const client = generateClient();
export default function EmailNotifiCreateForm(props) {
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
    leaveType: "",
    senderEmail: "",
    receipentEmail: "",
    receipentEmpID: "",
    status: "",
    message: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [leaveType, setLeaveType] = React.useState(initialValues.leaveType);
  const [senderEmail, setSenderEmail] = React.useState(
    initialValues.senderEmail
  );
  const [receipentEmail, setReceipentEmail] = React.useState(
    initialValues.receipentEmail
  );
  const [receipentEmpID, setReceipentEmpID] = React.useState(
    initialValues.receipentEmpID
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [message, setMessage] = React.useState(initialValues.message);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setLeaveType(initialValues.leaveType);
    setSenderEmail(initialValues.senderEmail);
    setReceipentEmail(initialValues.receipentEmail);
    setReceipentEmpID(initialValues.receipentEmpID);
    setStatus(initialValues.status);
    setMessage(initialValues.message);
    setErrors({});
  };
  const validations = {
    empID: [{ type: "Required" }],
    leaveType: [],
    senderEmail: [],
    receipentEmail: [],
    receipentEmpID: [],
    status: [],
    message: [],
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
          leaveType,
          senderEmail,
          receipentEmail,
          receipentEmpID,
          status,
          message,
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
            query: createEmailNotifi.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "EmailNotifiCreateForm")}
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
              leaveType,
              senderEmail,
              receipentEmail,
              receipentEmpID,
              status,
              message,
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
        label="Leave type"
        isRequired={false}
        isReadOnly={false}
        value={leaveType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType: value,
              senderEmail,
              receipentEmail,
              receipentEmpID,
              status,
              message,
            };
            const result = onChange(modelFields);
            value = result?.leaveType ?? value;
          }
          if (errors.leaveType?.hasError) {
            runValidationTasks("leaveType", value);
          }
          setLeaveType(value);
        }}
        onBlur={() => runValidationTasks("leaveType", leaveType)}
        errorMessage={errors.leaveType?.errorMessage}
        hasError={errors.leaveType?.hasError}
        {...getOverrideProps(overrides, "leaveType")}
      ></TextField>
      <TextField
        label="Sender email"
        isRequired={false}
        isReadOnly={false}
        value={senderEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              senderEmail: value,
              receipentEmail,
              receipentEmpID,
              status,
              message,
            };
            const result = onChange(modelFields);
            value = result?.senderEmail ?? value;
          }
          if (errors.senderEmail?.hasError) {
            runValidationTasks("senderEmail", value);
          }
          setSenderEmail(value);
        }}
        onBlur={() => runValidationTasks("senderEmail", senderEmail)}
        errorMessage={errors.senderEmail?.errorMessage}
        hasError={errors.senderEmail?.hasError}
        {...getOverrideProps(overrides, "senderEmail")}
      ></TextField>
      <TextField
        label="Receipent email"
        isRequired={false}
        isReadOnly={false}
        value={receipentEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              senderEmail,
              receipentEmail: value,
              receipentEmpID,
              status,
              message,
            };
            const result = onChange(modelFields);
            value = result?.receipentEmail ?? value;
          }
          if (errors.receipentEmail?.hasError) {
            runValidationTasks("receipentEmail", value);
          }
          setReceipentEmail(value);
        }}
        onBlur={() => runValidationTasks("receipentEmail", receipentEmail)}
        errorMessage={errors.receipentEmail?.errorMessage}
        hasError={errors.receipentEmail?.hasError}
        {...getOverrideProps(overrides, "receipentEmail")}
      ></TextField>
      <TextField
        label="Receipent emp id"
        isRequired={false}
        isReadOnly={false}
        value={receipentEmpID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              senderEmail,
              receipentEmail,
              receipentEmpID: value,
              status,
              message,
            };
            const result = onChange(modelFields);
            value = result?.receipentEmpID ?? value;
          }
          if (errors.receipentEmpID?.hasError) {
            runValidationTasks("receipentEmpID", value);
          }
          setReceipentEmpID(value);
        }}
        onBlur={() => runValidationTasks("receipentEmpID", receipentEmpID)}
        errorMessage={errors.receipentEmpID?.errorMessage}
        hasError={errors.receipentEmpID?.hasError}
        {...getOverrideProps(overrides, "receipentEmpID")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              senderEmail,
              receipentEmail,
              receipentEmpID,
              status: value,
              message,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Message"
        isRequired={false}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              senderEmail,
              receipentEmail,
              receipentEmpID,
              status,
              message: value,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
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
