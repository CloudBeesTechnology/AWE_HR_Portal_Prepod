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
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getLocalMobilization } from "../graphql/queries";
import { updateLocalMobilization } from "../graphql/mutations";
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
export default function LocalMobilizationUpdateForm(props) {
  const {
    id: idProp,
    localMobilization: localMobilizationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    tempID: "",
    mobSignDate: "",
    mobFile: "",
    paafApproveDate: "",
    paafFile: "",
    loiIssueDate: "",
    loiAcceptDate: "",
    loiDeclineDate: "",
    declineReason: "",
    loiFile: "",
    cvecApproveDate: "",
    cvecFile: "",
    createdBy: [],
    updatedBy: [],
  };
  const [tempID, setTempID] = React.useState(initialValues.tempID);
  const [mobSignDate, setMobSignDate] = React.useState(
    initialValues.mobSignDate
  );
  const [mobFile, setMobFile] = React.useState(initialValues.mobFile);
  const [paafApproveDate, setPaafApproveDate] = React.useState(
    initialValues.paafApproveDate
  );
  const [paafFile, setPaafFile] = React.useState(initialValues.paafFile);
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
  const [cvecApproveDate, setCvecApproveDate] = React.useState(
    initialValues.cvecApproveDate
  );
  const [cvecFile, setCvecFile] = React.useState(initialValues.cvecFile);
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [updatedBy, setUpdatedBy] = React.useState(initialValues.updatedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = localMobilizationRecord
      ? { ...initialValues, ...localMobilizationRecord }
      : initialValues;
    setTempID(cleanValues.tempID);
    setMobSignDate(cleanValues.mobSignDate);
    setMobFile(cleanValues.mobFile);
    setPaafApproveDate(cleanValues.paafApproveDate);
    setPaafFile(cleanValues.paafFile);
    setLoiIssueDate(cleanValues.loiIssueDate);
    setLoiAcceptDate(cleanValues.loiAcceptDate);
    setLoiDeclineDate(cleanValues.loiDeclineDate);
    setDeclineReason(cleanValues.declineReason);
    setLoiFile(cleanValues.loiFile);
    setCvecApproveDate(cleanValues.cvecApproveDate);
    setCvecFile(cleanValues.cvecFile);
    setCreatedBy(cleanValues.createdBy ?? []);
    setCurrentCreatedByValue("");
    setUpdatedBy(cleanValues.updatedBy ?? []);
    setCurrentUpdatedByValue("");
    setErrors({});
  };
  const [localMobilizationRecord, setLocalMobilizationRecord] = React.useState(
    localMobilizationModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getLocalMobilization.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getLocalMobilization
        : localMobilizationModelProp;
      setLocalMobilizationRecord(record);
    };
    queryData();
  }, [idProp, localMobilizationModelProp]);
  React.useEffect(resetStateValues, [localMobilizationRecord]);
  const [currentCreatedByValue, setCurrentCreatedByValue] = React.useState("");
  const createdByRef = React.createRef();
  const [currentUpdatedByValue, setCurrentUpdatedByValue] = React.useState("");
  const updatedByRef = React.createRef();
  const validations = {
    tempID: [],
    mobSignDate: [],
    mobFile: [],
    paafApproveDate: [],
    paafFile: [],
    loiIssueDate: [],
    loiAcceptDate: [],
    loiDeclineDate: [],
    declineReason: [],
    loiFile: [],
    cvecApproveDate: [],
    cvecFile: [],
    createdBy: [{ type: "JSON" }],
    updatedBy: [{ type: "JSON" }],
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
          tempID: tempID ?? null,
          mobSignDate: mobSignDate ?? null,
          mobFile: mobFile ?? null,
          paafApproveDate: paafApproveDate ?? null,
          paafFile: paafFile ?? null,
          loiIssueDate: loiIssueDate ?? null,
          loiAcceptDate: loiAcceptDate ?? null,
          loiDeclineDate: loiDeclineDate ?? null,
          declineReason: declineReason ?? null,
          loiFile: loiFile ?? null,
          cvecApproveDate: cvecApproveDate ?? null,
          cvecFile: cvecFile ?? null,
          createdBy: createdBy ?? null,
          updatedBy: updatedBy ?? null,
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
            query: updateLocalMobilization.replaceAll("__typename", ""),
            variables: {
              input: {
                id: localMobilizationRecord.id,
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
      {...getOverrideProps(overrides, "LocalMobilizationUpdateForm")}
      {...rest}
    >
      <TextField
        label="Temp id"
        isRequired={false}
        isReadOnly={false}
        value={tempID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID: value,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.tempID ?? value;
          }
          if (errors.tempID?.hasError) {
            runValidationTasks("tempID", value);
          }
          setTempID(value);
        }}
        onBlur={() => runValidationTasks("tempID", tempID)}
        errorMessage={errors.tempID?.errorMessage}
        hasError={errors.tempID?.hasError}
        {...getOverrideProps(overrides, "tempID")}
      ></TextField>
      <TextField
        label="Mob sign date"
        isRequired={false}
        isReadOnly={false}
        value={mobSignDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate: value,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy,
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
        isRequired={false}
        isReadOnly={false}
        value={mobFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate,
              mobFile: value,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy,
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
      <TextField
        label="Paaf approve date"
        isRequired={false}
        isReadOnly={false}
        value={paafApproveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate: value,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.paafApproveDate ?? value;
          }
          if (errors.paafApproveDate?.hasError) {
            runValidationTasks("paafApproveDate", value);
          }
          setPaafApproveDate(value);
        }}
        onBlur={() => runValidationTasks("paafApproveDate", paafApproveDate)}
        errorMessage={errors.paafApproveDate?.errorMessage}
        hasError={errors.paafApproveDate?.hasError}
        {...getOverrideProps(overrides, "paafApproveDate")}
      ></TextField>
      <TextField
        label="Paaf file"
        isRequired={false}
        isReadOnly={false}
        value={paafFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile: value,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.paafFile ?? value;
          }
          if (errors.paafFile?.hasError) {
            runValidationTasks("paafFile", value);
          }
          setPaafFile(value);
        }}
        onBlur={() => runValidationTasks("paafFile", paafFile)}
        errorMessage={errors.paafFile?.errorMessage}
        hasError={errors.paafFile?.hasError}
        {...getOverrideProps(overrides, "paafFile")}
      ></TextField>
      <TextField
        label="Loi issue date"
        isRequired={false}
        isReadOnly={false}
        value={loiIssueDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate: value,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy,
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
        value={loiAcceptDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate: value,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy,
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
        value={loiDeclineDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate: value,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy,
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
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason: value,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy,
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
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile: value,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy,
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
      <TextField
        label="Cvec approve date"
        isRequired={false}
        isReadOnly={false}
        value={cvecApproveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate: value,
              cvecFile,
              createdBy,
              updatedBy,
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
        isRequired={false}
        isReadOnly={false}
        value={cvecFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile: value,
              createdBy,
              updatedBy,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy: values,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.createdBy ?? values;
          }
          setCreatedBy(values);
          setCurrentCreatedByValue("");
        }}
        currentFieldValue={currentCreatedByValue}
        label={"Created by"}
        items={createdBy}
        hasError={errors?.createdBy?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("createdBy", currentCreatedByValue)
        }
        errorMessage={errors?.createdBy?.errorMessage}
        setFieldValue={setCurrentCreatedByValue}
        inputFieldRef={createdByRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Created by"
          isRequired={false}
          isReadOnly={false}
          value={currentCreatedByValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.createdBy?.hasError) {
              runValidationTasks("createdBy", value);
            }
            setCurrentCreatedByValue(value);
          }}
          onBlur={() => runValidationTasks("createdBy", currentCreatedByValue)}
          errorMessage={errors.createdBy?.errorMessage}
          hasError={errors.createdBy?.hasError}
          ref={createdByRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "createdBy")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              tempID,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              createdBy,
              updatedBy: values,
            };
            const result = onChange(modelFields);
            values = result?.updatedBy ?? values;
          }
          setUpdatedBy(values);
          setCurrentUpdatedByValue("");
        }}
        currentFieldValue={currentUpdatedByValue}
        label={"Updated by"}
        items={updatedBy}
        hasError={errors?.updatedBy?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("updatedBy", currentUpdatedByValue)
        }
        errorMessage={errors?.updatedBy?.errorMessage}
        setFieldValue={setCurrentUpdatedByValue}
        inputFieldRef={updatedByRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Updated by"
          isRequired={false}
          isReadOnly={false}
          value={currentUpdatedByValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.updatedBy?.hasError) {
              runValidationTasks("updatedBy", value);
            }
            setCurrentUpdatedByValue(value);
          }}
          onBlur={() => runValidationTasks("updatedBy", currentUpdatedByValue)}
          errorMessage={errors.updatedBy?.errorMessage}
          hasError={errors.updatedBy?.hasError}
          ref={updatedByRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "updatedBy")}
        ></TextAreaField>
      </ArrayField>
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
          isDisabled={!(idProp || localMobilizationModelProp)}
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
              !(idProp || localMobilizationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
