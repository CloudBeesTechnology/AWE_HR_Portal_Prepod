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
import { getEmailNotifi } from "../graphql/queries";
import { updateEmailNotifi } from "../graphql/mutations";
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
export default function EmailNotifiUpdateForm(props) {
  const {
    id: idProp,
    emailNotifi: emailNotifiModelProp,
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
    receipentEmail: [],
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
  const [status, setStatus] = React.useState(initialValues.status);
  const [message, setMessage] = React.useState(initialValues.message);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = emailNotifiRecord
      ? { ...initialValues, ...emailNotifiRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setLeaveType(cleanValues.leaveType);
    setSenderEmail(cleanValues.senderEmail);
    setReceipentEmail(cleanValues.receipentEmail ?? []);
    setCurrentReceipentEmailValue("");
    setStatus(cleanValues.status);
    setMessage(cleanValues.message);
    setErrors({});
  };
  const [emailNotifiRecord, setEmailNotifiRecord] =
    React.useState(emailNotifiModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getEmailNotifi.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEmailNotifi
        : emailNotifiModelProp;
      setEmailNotifiRecord(record);
    };
    queryData();
  }, [idProp, emailNotifiModelProp]);
  React.useEffect(resetStateValues, [emailNotifiRecord]);
  const [currentReceipentEmailValue, setCurrentReceipentEmailValue] =
    React.useState("");
  const receipentEmailRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    leaveType: [],
    senderEmail: [{ type: "Required" }],
    receipentEmail: [{ type: "Required" }],
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
          leaveType: leaveType ?? null,
          senderEmail,
          receipentEmail,
          status: status ?? null,
          message: message ?? null,
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
            query: updateEmailNotifi.replaceAll("__typename", ""),
            variables: {
              input: {
                id: emailNotifiRecord.id,
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
      {...getOverrideProps(overrides, "EmailNotifiUpdateForm")}
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
        isRequired={true}
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              senderEmail,
              receipentEmail: values,
              status,
              message,
            };
            const result = onChange(modelFields);
            values = result?.receipentEmail ?? values;
          }
          setReceipentEmail(values);
          setCurrentReceipentEmailValue("");
        }}
        currentFieldValue={currentReceipentEmailValue}
        label={"Receipent email"}
        items={receipentEmail}
        hasError={errors?.receipentEmail?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("receipentEmail", currentReceipentEmailValue)
        }
        errorMessage={errors?.receipentEmail?.errorMessage}
        setFieldValue={setCurrentReceipentEmailValue}
        inputFieldRef={receipentEmailRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Receipent email"
          isRequired={true}
          isReadOnly={false}
          value={currentReceipentEmailValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.receipentEmail?.hasError) {
              runValidationTasks("receipentEmail", value);
            }
            setCurrentReceipentEmailValue(value);
          }}
          onBlur={() =>
            runValidationTasks("receipentEmail", currentReceipentEmailValue)
          }
          errorMessage={errors.receipentEmail?.errorMessage}
          hasError={errors.receipentEmail?.hasError}
          ref={receipentEmailRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "receipentEmail")}
        ></TextField>
      </ArrayField>
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || emailNotifiModelProp)}
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
              !(idProp || emailNotifiModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
