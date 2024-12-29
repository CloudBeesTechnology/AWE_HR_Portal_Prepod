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
import { createWeldingInfo } from "../graphql/mutations";
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
export default function WeldingInfoCreateForm(props) {
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
    diameterRange: "",
    fillerMetal: "",
    thicknessRange: "",
    weldingStampNor: "",
    wpsNumber: "",
    weldingProcess: "",
    weldingPosition: "",
    WQExpiry: "",
    WQRemarks: "",
    weldingUpload: [],
    WQRNo: "",
    weldingCode: "",
    weldingMaterial: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [diameterRange, setDiameterRange] = React.useState(
    initialValues.diameterRange
  );
  const [fillerMetal, setFillerMetal] = React.useState(
    initialValues.fillerMetal
  );
  const [thicknessRange, setThicknessRange] = React.useState(
    initialValues.thicknessRange
  );
  const [weldingStampNor, setWeldingStampNor] = React.useState(
    initialValues.weldingStampNor
  );
  const [wpsNumber, setWpsNumber] = React.useState(initialValues.wpsNumber);
  const [weldingProcess, setWeldingProcess] = React.useState(
    initialValues.weldingProcess
  );
  const [weldingPosition, setWeldingPosition] = React.useState(
    initialValues.weldingPosition
  );
  const [WQExpiry, setWQExpiry] = React.useState(initialValues.WQExpiry);
  const [WQRemarks, setWQRemarks] = React.useState(initialValues.WQRemarks);
  const [weldingUpload, setWeldingUpload] = React.useState(
    initialValues.weldingUpload
  );
  const [WQRNo, setWQRNo] = React.useState(initialValues.WQRNo);
  const [weldingCode, setWeldingCode] = React.useState(
    initialValues.weldingCode
  );
  const [weldingMaterial, setWeldingMaterial] = React.useState(
    initialValues.weldingMaterial
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setDiameterRange(initialValues.diameterRange);
    setFillerMetal(initialValues.fillerMetal);
    setThicknessRange(initialValues.thicknessRange);
    setWeldingStampNor(initialValues.weldingStampNor);
    setWpsNumber(initialValues.wpsNumber);
    setWeldingProcess(initialValues.weldingProcess);
    setWeldingPosition(initialValues.weldingPosition);
    setWQExpiry(initialValues.WQExpiry);
    setWQRemarks(initialValues.WQRemarks);
    setWeldingUpload(initialValues.weldingUpload);
    setCurrentWeldingUploadValue("");
    setWQRNo(initialValues.WQRNo);
    setWeldingCode(initialValues.weldingCode);
    setWeldingMaterial(initialValues.weldingMaterial);
    setErrors({});
  };
  const [currentWeldingUploadValue, setCurrentWeldingUploadValue] =
    React.useState("");
  const weldingUploadRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    diameterRange: [],
    fillerMetal: [],
    thicknessRange: [],
    weldingStampNor: [],
    wpsNumber: [],
    weldingProcess: [],
    weldingPosition: [],
    WQExpiry: [],
    WQRemarks: [],
    weldingUpload: [{ type: "JSON" }],
    WQRNo: [],
    weldingCode: [],
    weldingMaterial: [],
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
          diameterRange,
          fillerMetal,
          thicknessRange,
          weldingStampNor,
          wpsNumber,
          weldingProcess,
          weldingPosition,
          WQExpiry,
          WQRemarks,
          weldingUpload,
          WQRNo,
          weldingCode,
          weldingMaterial,
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
            query: createWeldingInfo.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "WeldingInfoCreateForm")}
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
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial,
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
        label="Diameter range"
        isRequired={false}
        isReadOnly={false}
        value={diameterRange}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange: value,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.diameterRange ?? value;
          }
          if (errors.diameterRange?.hasError) {
            runValidationTasks("diameterRange", value);
          }
          setDiameterRange(value);
        }}
        onBlur={() => runValidationTasks("diameterRange", diameterRange)}
        errorMessage={errors.diameterRange?.errorMessage}
        hasError={errors.diameterRange?.hasError}
        {...getOverrideProps(overrides, "diameterRange")}
      ></TextField>
      <TextField
        label="Filler metal"
        isRequired={false}
        isReadOnly={false}
        value={fillerMetal}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal: value,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.fillerMetal ?? value;
          }
          if (errors.fillerMetal?.hasError) {
            runValidationTasks("fillerMetal", value);
          }
          setFillerMetal(value);
        }}
        onBlur={() => runValidationTasks("fillerMetal", fillerMetal)}
        errorMessage={errors.fillerMetal?.errorMessage}
        hasError={errors.fillerMetal?.hasError}
        {...getOverrideProps(overrides, "fillerMetal")}
      ></TextField>
      <TextField
        label="Thickness range"
        isRequired={false}
        isReadOnly={false}
        value={thicknessRange}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange: value,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.thicknessRange ?? value;
          }
          if (errors.thicknessRange?.hasError) {
            runValidationTasks("thicknessRange", value);
          }
          setThicknessRange(value);
        }}
        onBlur={() => runValidationTasks("thicknessRange", thicknessRange)}
        errorMessage={errors.thicknessRange?.errorMessage}
        hasError={errors.thicknessRange?.hasError}
        {...getOverrideProps(overrides, "thicknessRange")}
      ></TextField>
      <TextField
        label="Welding stamp nor"
        isRequired={false}
        isReadOnly={false}
        value={weldingStampNor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor: value,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.weldingStampNor ?? value;
          }
          if (errors.weldingStampNor?.hasError) {
            runValidationTasks("weldingStampNor", value);
          }
          setWeldingStampNor(value);
        }}
        onBlur={() => runValidationTasks("weldingStampNor", weldingStampNor)}
        errorMessage={errors.weldingStampNor?.errorMessage}
        hasError={errors.weldingStampNor?.hasError}
        {...getOverrideProps(overrides, "weldingStampNor")}
      ></TextField>
      <TextField
        label="Wps number"
        isRequired={false}
        isReadOnly={false}
        value={wpsNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber: value,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.wpsNumber ?? value;
          }
          if (errors.wpsNumber?.hasError) {
            runValidationTasks("wpsNumber", value);
          }
          setWpsNumber(value);
        }}
        onBlur={() => runValidationTasks("wpsNumber", wpsNumber)}
        errorMessage={errors.wpsNumber?.errorMessage}
        hasError={errors.wpsNumber?.hasError}
        {...getOverrideProps(overrides, "wpsNumber")}
      ></TextField>
      <TextField
        label="Welding process"
        isRequired={false}
        isReadOnly={false}
        value={weldingProcess}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess: value,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.weldingProcess ?? value;
          }
          if (errors.weldingProcess?.hasError) {
            runValidationTasks("weldingProcess", value);
          }
          setWeldingProcess(value);
        }}
        onBlur={() => runValidationTasks("weldingProcess", weldingProcess)}
        errorMessage={errors.weldingProcess?.errorMessage}
        hasError={errors.weldingProcess?.hasError}
        {...getOverrideProps(overrides, "weldingProcess")}
      ></TextField>
      <TextField
        label="Welding position"
        isRequired={false}
        isReadOnly={false}
        value={weldingPosition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition: value,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.weldingPosition ?? value;
          }
          if (errors.weldingPosition?.hasError) {
            runValidationTasks("weldingPosition", value);
          }
          setWeldingPosition(value);
        }}
        onBlur={() => runValidationTasks("weldingPosition", weldingPosition)}
        errorMessage={errors.weldingPosition?.errorMessage}
        hasError={errors.weldingPosition?.hasError}
        {...getOverrideProps(overrides, "weldingPosition")}
      ></TextField>
      <TextField
        label="Wq expiry"
        isRequired={false}
        isReadOnly={false}
        value={WQExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry: value,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.WQExpiry ?? value;
          }
          if (errors.WQExpiry?.hasError) {
            runValidationTasks("WQExpiry", value);
          }
          setWQExpiry(value);
        }}
        onBlur={() => runValidationTasks("WQExpiry", WQExpiry)}
        errorMessage={errors.WQExpiry?.errorMessage}
        hasError={errors.WQExpiry?.hasError}
        {...getOverrideProps(overrides, "WQExpiry")}
      ></TextField>
      <TextField
        label="Wq remarks"
        isRequired={false}
        isReadOnly={false}
        value={WQRemarks}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks: value,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.WQRemarks ?? value;
          }
          if (errors.WQRemarks?.hasError) {
            runValidationTasks("WQRemarks", value);
          }
          setWQRemarks(value);
        }}
        onBlur={() => runValidationTasks("WQRemarks", WQRemarks)}
        errorMessage={errors.WQRemarks?.errorMessage}
        hasError={errors.WQRemarks?.hasError}
        {...getOverrideProps(overrides, "WQRemarks")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload: values,
              WQRNo,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            values = result?.weldingUpload ?? values;
          }
          setWeldingUpload(values);
          setCurrentWeldingUploadValue("");
        }}
        currentFieldValue={currentWeldingUploadValue}
        label={"Welding upload"}
        items={weldingUpload}
        hasError={errors?.weldingUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("weldingUpload", currentWeldingUploadValue)
        }
        errorMessage={errors?.weldingUpload?.errorMessage}
        setFieldValue={setCurrentWeldingUploadValue}
        inputFieldRef={weldingUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Welding upload"
          isRequired={false}
          isReadOnly={false}
          value={currentWeldingUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.weldingUpload?.hasError) {
              runValidationTasks("weldingUpload", value);
            }
            setCurrentWeldingUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("weldingUpload", currentWeldingUploadValue)
          }
          errorMessage={errors.weldingUpload?.errorMessage}
          hasError={errors.weldingUpload?.hasError}
          ref={weldingUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "weldingUpload")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Wqr no"
        isRequired={false}
        isReadOnly={false}
        value={WQRNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo: value,
              weldingCode,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.WQRNo ?? value;
          }
          if (errors.WQRNo?.hasError) {
            runValidationTasks("WQRNo", value);
          }
          setWQRNo(value);
        }}
        onBlur={() => runValidationTasks("WQRNo", WQRNo)}
        errorMessage={errors.WQRNo?.errorMessage}
        hasError={errors.WQRNo?.hasError}
        {...getOverrideProps(overrides, "WQRNo")}
      ></TextField>
      <TextField
        label="Welding code"
        isRequired={false}
        isReadOnly={false}
        value={weldingCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode: value,
              weldingMaterial,
            };
            const result = onChange(modelFields);
            value = result?.weldingCode ?? value;
          }
          if (errors.weldingCode?.hasError) {
            runValidationTasks("weldingCode", value);
          }
          setWeldingCode(value);
        }}
        onBlur={() => runValidationTasks("weldingCode", weldingCode)}
        errorMessage={errors.weldingCode?.errorMessage}
        hasError={errors.weldingCode?.hasError}
        {...getOverrideProps(overrides, "weldingCode")}
      ></TextField>
      <TextField
        label="Welding material"
        isRequired={false}
        isReadOnly={false}
        value={weldingMaterial}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              diameterRange,
              fillerMetal,
              thicknessRange,
              weldingStampNor,
              wpsNumber,
              weldingProcess,
              weldingPosition,
              WQExpiry,
              WQRemarks,
              weldingUpload,
              WQRNo,
              weldingCode,
              weldingMaterial: value,
            };
            const result = onChange(modelFields);
            value = result?.weldingMaterial ?? value;
          }
          if (errors.weldingMaterial?.hasError) {
            runValidationTasks("weldingMaterial", value);
          }
          setWeldingMaterial(value);
        }}
        onBlur={() => runValidationTasks("weldingMaterial", weldingMaterial)}
        errorMessage={errors.weldingMaterial?.errorMessage}
        hasError={errors.weldingMaterial?.hasError}
        {...getOverrideProps(overrides, "weldingMaterial")}
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
