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
import { createLabourMedicalInfo } from "../graphql/mutations";
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
export default function LabourMedicalInfoCreateForm(props) {
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
    overMD: "",
    overME: "",
    bruhimsRD: "",
    bruhimsRNo: "",
    bruneiMAD: [],
    bruneiME: [],
    uploadFitness: [],
    uploadRegis: [],
    uploadBwn: [],
    dependPass: [],
    createdBy: [],
    updatedBy: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [overMD, setOverMD] = React.useState(initialValues.overMD);
  const [overME, setOverME] = React.useState(initialValues.overME);
  const [bruhimsRD, setBruhimsRD] = React.useState(initialValues.bruhimsRD);
  const [bruhimsRNo, setBruhimsRNo] = React.useState(initialValues.bruhimsRNo);
  const [bruneiMAD, setBruneiMAD] = React.useState(initialValues.bruneiMAD);
  const [bruneiME, setBruneiME] = React.useState(initialValues.bruneiME);
  const [uploadFitness, setUploadFitness] = React.useState(
    initialValues.uploadFitness
  );
  const [uploadRegis, setUploadRegis] = React.useState(
    initialValues.uploadRegis
  );
  const [uploadBwn, setUploadBwn] = React.useState(initialValues.uploadBwn);
  const [dependPass, setDependPass] = React.useState(initialValues.dependPass);
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [updatedBy, setUpdatedBy] = React.useState(initialValues.updatedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setOverMD(initialValues.overMD);
    setOverME(initialValues.overME);
    setBruhimsRD(initialValues.bruhimsRD);
    setBruhimsRNo(initialValues.bruhimsRNo);
    setBruneiMAD(initialValues.bruneiMAD);
    setCurrentBruneiMADValue("");
    setBruneiME(initialValues.bruneiME);
    setCurrentBruneiMEValue("");
    setUploadFitness(initialValues.uploadFitness);
    setCurrentUploadFitnessValue("");
    setUploadRegis(initialValues.uploadRegis);
    setCurrentUploadRegisValue("");
    setUploadBwn(initialValues.uploadBwn);
    setCurrentUploadBwnValue("");
    setDependPass(initialValues.dependPass);
    setCurrentDependPassValue("");
    setCreatedBy(initialValues.createdBy);
    setCurrentCreatedByValue("");
    setUpdatedBy(initialValues.updatedBy);
    setCurrentUpdatedByValue("");
    setErrors({});
  };
  const [currentBruneiMADValue, setCurrentBruneiMADValue] = React.useState("");
  const bruneiMADRef = React.createRef();
  const [currentBruneiMEValue, setCurrentBruneiMEValue] = React.useState("");
  const bruneiMERef = React.createRef();
  const [currentUploadFitnessValue, setCurrentUploadFitnessValue] =
    React.useState("");
  const uploadFitnessRef = React.createRef();
  const [currentUploadRegisValue, setCurrentUploadRegisValue] =
    React.useState("");
  const uploadRegisRef = React.createRef();
  const [currentUploadBwnValue, setCurrentUploadBwnValue] = React.useState("");
  const uploadBwnRef = React.createRef();
  const [currentDependPassValue, setCurrentDependPassValue] =
    React.useState("");
  const dependPassRef = React.createRef();
  const [currentCreatedByValue, setCurrentCreatedByValue] = React.useState("");
  const createdByRef = React.createRef();
  const [currentUpdatedByValue, setCurrentUpdatedByValue] = React.useState("");
  const updatedByRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    overMD: [],
    overME: [],
    bruhimsRD: [],
    bruhimsRNo: [],
    bruneiMAD: [],
    bruneiME: [],
    uploadFitness: [{ type: "JSON" }],
    uploadRegis: [{ type: "JSON" }],
    uploadBwn: [{ type: "JSON" }],
    dependPass: [{ type: "JSON" }],
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
          empID,
          overMD,
          overME,
          bruhimsRD,
          bruhimsRNo,
          bruneiMAD,
          bruneiME,
          uploadFitness,
          uploadRegis,
          uploadBwn,
          dependPass,
          createdBy,
          updatedBy,
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
            query: createLabourMedicalInfo.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "LabourMedicalInfoCreateForm")}
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
              overMD,
              overME,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD,
              bruneiME,
              uploadFitness,
              uploadRegis,
              uploadBwn,
              dependPass,
              createdBy,
              updatedBy,
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
        label="Over md"
        isRequired={false}
        isReadOnly={false}
        value={overMD}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              overMD: value,
              overME,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD,
              bruneiME,
              uploadFitness,
              uploadRegis,
              uploadBwn,
              dependPass,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.overMD ?? value;
          }
          if (errors.overMD?.hasError) {
            runValidationTasks("overMD", value);
          }
          setOverMD(value);
        }}
        onBlur={() => runValidationTasks("overMD", overMD)}
        errorMessage={errors.overMD?.errorMessage}
        hasError={errors.overMD?.hasError}
        {...getOverrideProps(overrides, "overMD")}
      ></TextField>
      <TextField
        label="Over me"
        isRequired={false}
        isReadOnly={false}
        value={overME}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              overMD,
              overME: value,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD,
              bruneiME,
              uploadFitness,
              uploadRegis,
              uploadBwn,
              dependPass,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.overME ?? value;
          }
          if (errors.overME?.hasError) {
            runValidationTasks("overME", value);
          }
          setOverME(value);
        }}
        onBlur={() => runValidationTasks("overME", overME)}
        errorMessage={errors.overME?.errorMessage}
        hasError={errors.overME?.hasError}
        {...getOverrideProps(overrides, "overME")}
      ></TextField>
      <TextField
        label="Bruhims rd"
        isRequired={false}
        isReadOnly={false}
        value={bruhimsRD}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              overMD,
              overME,
              bruhimsRD: value,
              bruhimsRNo,
              bruneiMAD,
              bruneiME,
              uploadFitness,
              uploadRegis,
              uploadBwn,
              dependPass,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.bruhimsRD ?? value;
          }
          if (errors.bruhimsRD?.hasError) {
            runValidationTasks("bruhimsRD", value);
          }
          setBruhimsRD(value);
        }}
        onBlur={() => runValidationTasks("bruhimsRD", bruhimsRD)}
        errorMessage={errors.bruhimsRD?.errorMessage}
        hasError={errors.bruhimsRD?.hasError}
        {...getOverrideProps(overrides, "bruhimsRD")}
      ></TextField>
      <TextField
        label="Bruhims r no"
        isRequired={false}
        isReadOnly={false}
        value={bruhimsRNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              overMD,
              overME,
              bruhimsRD,
              bruhimsRNo: value,
              bruneiMAD,
              bruneiME,
              uploadFitness,
              uploadRegis,
              uploadBwn,
              dependPass,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.bruhimsRNo ?? value;
          }
          if (errors.bruhimsRNo?.hasError) {
            runValidationTasks("bruhimsRNo", value);
          }
          setBruhimsRNo(value);
        }}
        onBlur={() => runValidationTasks("bruhimsRNo", bruhimsRNo)}
        errorMessage={errors.bruhimsRNo?.errorMessage}
        hasError={errors.bruhimsRNo?.hasError}
        {...getOverrideProps(overrides, "bruhimsRNo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              overMD,
              overME,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD: values,
              bruneiME,
              uploadFitness,
              uploadRegis,
              uploadBwn,
              dependPass,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.bruneiMAD ?? values;
          }
          setBruneiMAD(values);
          setCurrentBruneiMADValue("");
        }}
        currentFieldValue={currentBruneiMADValue}
        label={"Brunei mad"}
        items={bruneiMAD}
        hasError={errors?.bruneiMAD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bruneiMAD", currentBruneiMADValue)
        }
        errorMessage={errors?.bruneiMAD?.errorMessage}
        setFieldValue={setCurrentBruneiMADValue}
        inputFieldRef={bruneiMADRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Brunei mad"
          isRequired={false}
          isReadOnly={false}
          value={currentBruneiMADValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bruneiMAD?.hasError) {
              runValidationTasks("bruneiMAD", value);
            }
            setCurrentBruneiMADValue(value);
          }}
          onBlur={() => runValidationTasks("bruneiMAD", currentBruneiMADValue)}
          errorMessage={errors.bruneiMAD?.errorMessage}
          hasError={errors.bruneiMAD?.hasError}
          ref={bruneiMADRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bruneiMAD")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              overMD,
              overME,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD,
              bruneiME: values,
              uploadFitness,
              uploadRegis,
              uploadBwn,
              dependPass,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.bruneiME ?? values;
          }
          setBruneiME(values);
          setCurrentBruneiMEValue("");
        }}
        currentFieldValue={currentBruneiMEValue}
        label={"Brunei me"}
        items={bruneiME}
        hasError={errors?.bruneiME?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bruneiME", currentBruneiMEValue)
        }
        errorMessage={errors?.bruneiME?.errorMessage}
        setFieldValue={setCurrentBruneiMEValue}
        inputFieldRef={bruneiMERef}
        defaultFieldValue={""}
      >
        <TextField
          label="Brunei me"
          isRequired={false}
          isReadOnly={false}
          value={currentBruneiMEValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bruneiME?.hasError) {
              runValidationTasks("bruneiME", value);
            }
            setCurrentBruneiMEValue(value);
          }}
          onBlur={() => runValidationTasks("bruneiME", currentBruneiMEValue)}
          errorMessage={errors.bruneiME?.errorMessage}
          hasError={errors.bruneiME?.hasError}
          ref={bruneiMERef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bruneiME")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              overMD,
              overME,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD,
              bruneiME,
              uploadFitness: values,
              uploadRegis,
              uploadBwn,
              dependPass,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.uploadFitness ?? values;
          }
          setUploadFitness(values);
          setCurrentUploadFitnessValue("");
        }}
        currentFieldValue={currentUploadFitnessValue}
        label={"Upload fitness"}
        items={uploadFitness}
        hasError={errors?.uploadFitness?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("uploadFitness", currentUploadFitnessValue)
        }
        errorMessage={errors?.uploadFitness?.errorMessage}
        setFieldValue={setCurrentUploadFitnessValue}
        inputFieldRef={uploadFitnessRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Upload fitness"
          isRequired={false}
          isReadOnly={false}
          value={currentUploadFitnessValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.uploadFitness?.hasError) {
              runValidationTasks("uploadFitness", value);
            }
            setCurrentUploadFitnessValue(value);
          }}
          onBlur={() =>
            runValidationTasks("uploadFitness", currentUploadFitnessValue)
          }
          errorMessage={errors.uploadFitness?.errorMessage}
          hasError={errors.uploadFitness?.hasError}
          ref={uploadFitnessRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "uploadFitness")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              overMD,
              overME,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD,
              bruneiME,
              uploadFitness,
              uploadRegis: values,
              uploadBwn,
              dependPass,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.uploadRegis ?? values;
          }
          setUploadRegis(values);
          setCurrentUploadRegisValue("");
        }}
        currentFieldValue={currentUploadRegisValue}
        label={"Upload regis"}
        items={uploadRegis}
        hasError={errors?.uploadRegis?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("uploadRegis", currentUploadRegisValue)
        }
        errorMessage={errors?.uploadRegis?.errorMessage}
        setFieldValue={setCurrentUploadRegisValue}
        inputFieldRef={uploadRegisRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Upload regis"
          isRequired={false}
          isReadOnly={false}
          value={currentUploadRegisValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.uploadRegis?.hasError) {
              runValidationTasks("uploadRegis", value);
            }
            setCurrentUploadRegisValue(value);
          }}
          onBlur={() =>
            runValidationTasks("uploadRegis", currentUploadRegisValue)
          }
          errorMessage={errors.uploadRegis?.errorMessage}
          hasError={errors.uploadRegis?.hasError}
          ref={uploadRegisRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "uploadRegis")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              overMD,
              overME,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD,
              bruneiME,
              uploadFitness,
              uploadRegis,
              uploadBwn: values,
              dependPass,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.uploadBwn ?? values;
          }
          setUploadBwn(values);
          setCurrentUploadBwnValue("");
        }}
        currentFieldValue={currentUploadBwnValue}
        label={"Upload bwn"}
        items={uploadBwn}
        hasError={errors?.uploadBwn?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("uploadBwn", currentUploadBwnValue)
        }
        errorMessage={errors?.uploadBwn?.errorMessage}
        setFieldValue={setCurrentUploadBwnValue}
        inputFieldRef={uploadBwnRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Upload bwn"
          isRequired={false}
          isReadOnly={false}
          value={currentUploadBwnValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.uploadBwn?.hasError) {
              runValidationTasks("uploadBwn", value);
            }
            setCurrentUploadBwnValue(value);
          }}
          onBlur={() => runValidationTasks("uploadBwn", currentUploadBwnValue)}
          errorMessage={errors.uploadBwn?.errorMessage}
          hasError={errors.uploadBwn?.hasError}
          ref={uploadBwnRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "uploadBwn")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              overMD,
              overME,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD,
              bruneiME,
              uploadFitness,
              uploadRegis,
              uploadBwn,
              dependPass: values,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.dependPass ?? values;
          }
          setDependPass(values);
          setCurrentDependPassValue("");
        }}
        currentFieldValue={currentDependPassValue}
        label={"Depend pass"}
        items={dependPass}
        hasError={errors?.dependPass?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("dependPass", currentDependPassValue)
        }
        errorMessage={errors?.dependPass?.errorMessage}
        setFieldValue={setCurrentDependPassValue}
        inputFieldRef={dependPassRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Depend pass"
          isRequired={false}
          isReadOnly={false}
          value={currentDependPassValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.dependPass?.hasError) {
              runValidationTasks("dependPass", value);
            }
            setCurrentDependPassValue(value);
          }}
          onBlur={() =>
            runValidationTasks("dependPass", currentDependPassValue)
          }
          errorMessage={errors.dependPass?.errorMessage}
          hasError={errors.dependPass?.hasError}
          ref={dependPassRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "dependPass")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              overMD,
              overME,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD,
              bruneiME,
              uploadFitness,
              uploadRegis,
              uploadBwn,
              dependPass,
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
              empID,
              overMD,
              overME,
              bruhimsRD,
              bruhimsRNo,
              bruneiMAD,
              bruneiME,
              uploadFitness,
              uploadRegis,
              uploadBwn,
              dependPass,
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
