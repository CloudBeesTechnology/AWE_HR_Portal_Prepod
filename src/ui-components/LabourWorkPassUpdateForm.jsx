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
import { LabourWorkPass } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
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
export default function LabourWorkPassUpdateForm(props) {
  const {
    id: idProp,
    labourWorkPass: labourWorkPassModelProp,
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
    workPermitType: "",
    arrivalStampingExpiry: "",
    employmentPassEndorsement: "",
    immigrationDeptDate: "",
    employmentPassExpiry: "",
    employmentPassStatus: "",
    labourUploadDoc: [],
    remarks: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [workPermitType, setWorkPermitType] = React.useState(
    initialValues.workPermitType
  );
  const [arrivalStampingExpiry, setArrivalStampingExpiry] = React.useState(
    initialValues.arrivalStampingExpiry
  );
  const [employmentPassEndorsement, setEmploymentPassEndorsement] =
    React.useState(initialValues.employmentPassEndorsement);
  const [immigrationDeptDate, setImmigrationDeptDate] = React.useState(
    initialValues.immigrationDeptDate
  );
  const [employmentPassExpiry, setEmploymentPassExpiry] = React.useState(
    initialValues.employmentPassExpiry
  );
  const [employmentPassStatus, setEmploymentPassStatus] = React.useState(
    initialValues.employmentPassStatus
  );
  const [labourUploadDoc, setLabourUploadDoc] = React.useState(
    initialValues.labourUploadDoc
  );
  const [remarks, setRemarks] = React.useState(initialValues.remarks);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = labourWorkPassRecord
      ? { ...initialValues, ...labourWorkPassRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setWorkPermitType(cleanValues.workPermitType);
    setArrivalStampingExpiry(cleanValues.arrivalStampingExpiry);
    setEmploymentPassEndorsement(cleanValues.employmentPassEndorsement);
    setImmigrationDeptDate(cleanValues.immigrationDeptDate);
    setEmploymentPassExpiry(cleanValues.employmentPassExpiry);
    setEmploymentPassStatus(cleanValues.employmentPassStatus);
    setLabourUploadDoc(cleanValues.labourUploadDoc ?? []);
    setCurrentLabourUploadDocValue("");
    setRemarks(cleanValues.remarks);
    setErrors({});
  };
  const [labourWorkPassRecord, setLabourWorkPassRecord] = React.useState(
    labourWorkPassModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(LabourWorkPass, idProp)
        : labourWorkPassModelProp;
      setLabourWorkPassRecord(record);
    };
    queryData();
  }, [idProp, labourWorkPassModelProp]);
  React.useEffect(resetStateValues, [labourWorkPassRecord]);
  const [currentLabourUploadDocValue, setCurrentLabourUploadDocValue] =
    React.useState("");
  const labourUploadDocRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    workPermitType: [{ type: "Required" }],
    arrivalStampingExpiry: [{ type: "Required" }],
    employmentPassEndorsement: [{ type: "Required" }],
    immigrationDeptDate: [{ type: "Required" }],
    employmentPassExpiry: [{ type: "Required" }],
    employmentPassStatus: [{ type: "Required" }],
    labourUploadDoc: [{ type: "Required" }],
    remarks: [],
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
          workPermitType,
          arrivalStampingExpiry,
          employmentPassEndorsement,
          immigrationDeptDate,
          employmentPassExpiry,
          employmentPassStatus,
          labourUploadDoc,
          remarks,
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
          await DataStore.save(
            LabourWorkPass.copyOf(labourWorkPassRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "LabourWorkPassUpdateForm")}
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
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsement,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              labourUploadDoc,
              remarks,
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
        label="Work permit type"
        isRequired={true}
        isReadOnly={false}
        value={workPermitType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType: value,
              arrivalStampingExpiry,
              employmentPassEndorsement,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              labourUploadDoc,
              remarks,
            };
            const result = onChange(modelFields);
            value = result?.workPermitType ?? value;
          }
          if (errors.workPermitType?.hasError) {
            runValidationTasks("workPermitType", value);
          }
          setWorkPermitType(value);
        }}
        onBlur={() => runValidationTasks("workPermitType", workPermitType)}
        errorMessage={errors.workPermitType?.errorMessage}
        hasError={errors.workPermitType?.hasError}
        {...getOverrideProps(overrides, "workPermitType")}
      ></TextField>
      <TextField
        label="Arrival stamping expiry"
        isRequired={true}
        isReadOnly={false}
        value={arrivalStampingExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry: value,
              employmentPassEndorsement,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              labourUploadDoc,
              remarks,
            };
            const result = onChange(modelFields);
            value = result?.arrivalStampingExpiry ?? value;
          }
          if (errors.arrivalStampingExpiry?.hasError) {
            runValidationTasks("arrivalStampingExpiry", value);
          }
          setArrivalStampingExpiry(value);
        }}
        onBlur={() =>
          runValidationTasks("arrivalStampingExpiry", arrivalStampingExpiry)
        }
        errorMessage={errors.arrivalStampingExpiry?.errorMessage}
        hasError={errors.arrivalStampingExpiry?.hasError}
        {...getOverrideProps(overrides, "arrivalStampingExpiry")}
      ></TextField>
      <TextField
        label="Employment pass endorsement"
        isRequired={true}
        isReadOnly={false}
        value={employmentPassEndorsement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsement: value,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              labourUploadDoc,
              remarks,
            };
            const result = onChange(modelFields);
            value = result?.employmentPassEndorsement ?? value;
          }
          if (errors.employmentPassEndorsement?.hasError) {
            runValidationTasks("employmentPassEndorsement", value);
          }
          setEmploymentPassEndorsement(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "employmentPassEndorsement",
            employmentPassEndorsement
          )
        }
        errorMessage={errors.employmentPassEndorsement?.errorMessage}
        hasError={errors.employmentPassEndorsement?.hasError}
        {...getOverrideProps(overrides, "employmentPassEndorsement")}
      ></TextField>
      <TextField
        label="Immigration dept date"
        isRequired={true}
        isReadOnly={false}
        value={immigrationDeptDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsement,
              immigrationDeptDate: value,
              employmentPassExpiry,
              employmentPassStatus,
              labourUploadDoc,
              remarks,
            };
            const result = onChange(modelFields);
            value = result?.immigrationDeptDate ?? value;
          }
          if (errors.immigrationDeptDate?.hasError) {
            runValidationTasks("immigrationDeptDate", value);
          }
          setImmigrationDeptDate(value);
        }}
        onBlur={() =>
          runValidationTasks("immigrationDeptDate", immigrationDeptDate)
        }
        errorMessage={errors.immigrationDeptDate?.errorMessage}
        hasError={errors.immigrationDeptDate?.hasError}
        {...getOverrideProps(overrides, "immigrationDeptDate")}
      ></TextField>
      <TextField
        label="Employment pass expiry"
        isRequired={true}
        isReadOnly={false}
        value={employmentPassExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsement,
              immigrationDeptDate,
              employmentPassExpiry: value,
              employmentPassStatus,
              labourUploadDoc,
              remarks,
            };
            const result = onChange(modelFields);
            value = result?.employmentPassExpiry ?? value;
          }
          if (errors.employmentPassExpiry?.hasError) {
            runValidationTasks("employmentPassExpiry", value);
          }
          setEmploymentPassExpiry(value);
        }}
        onBlur={() =>
          runValidationTasks("employmentPassExpiry", employmentPassExpiry)
        }
        errorMessage={errors.employmentPassExpiry?.errorMessage}
        hasError={errors.employmentPassExpiry?.hasError}
        {...getOverrideProps(overrides, "employmentPassExpiry")}
      ></TextField>
      <TextField
        label="Employment pass status"
        isRequired={true}
        isReadOnly={false}
        value={employmentPassStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsement,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus: value,
              labourUploadDoc,
              remarks,
            };
            const result = onChange(modelFields);
            value = result?.employmentPassStatus ?? value;
          }
          if (errors.employmentPassStatus?.hasError) {
            runValidationTasks("employmentPassStatus", value);
          }
          setEmploymentPassStatus(value);
        }}
        onBlur={() =>
          runValidationTasks("employmentPassStatus", employmentPassStatus)
        }
        errorMessage={errors.employmentPassStatus?.errorMessage}
        hasError={errors.employmentPassStatus?.hasError}
        {...getOverrideProps(overrides, "employmentPassStatus")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsement,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              labourUploadDoc: values,
              remarks,
            };
            const result = onChange(modelFields);
            values = result?.labourUploadDoc ?? values;
          }
          setLabourUploadDoc(values);
          setCurrentLabourUploadDocValue("");
        }}
        currentFieldValue={currentLabourUploadDocValue}
        label={"Labour upload doc"}
        items={labourUploadDoc}
        hasError={errors?.labourUploadDoc?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "labourUploadDoc",
            currentLabourUploadDocValue
          )
        }
        errorMessage={errors?.labourUploadDoc?.errorMessage}
        setFieldValue={setCurrentLabourUploadDocValue}
        inputFieldRef={labourUploadDocRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Labour upload doc"
          isRequired={true}
          isReadOnly={false}
          value={currentLabourUploadDocValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.labourUploadDoc?.hasError) {
              runValidationTasks("labourUploadDoc", value);
            }
            setCurrentLabourUploadDocValue(value);
          }}
          onBlur={() =>
            runValidationTasks("labourUploadDoc", currentLabourUploadDocValue)
          }
          errorMessage={errors.labourUploadDoc?.errorMessage}
          hasError={errors.labourUploadDoc?.hasError}
          ref={labourUploadDocRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "labourUploadDoc")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Remarks"
        isRequired={false}
        isReadOnly={false}
        value={remarks}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              workPermitType,
              arrivalStampingExpiry,
              employmentPassEndorsement,
              immigrationDeptDate,
              employmentPassExpiry,
              employmentPassStatus,
              labourUploadDoc,
              remarks: value,
            };
            const result = onChange(modelFields);
            value = result?.remarks ?? value;
          }
          if (errors.remarks?.hasError) {
            runValidationTasks("remarks", value);
          }
          setRemarks(value);
        }}
        onBlur={() => runValidationTasks("remarks", remarks)}
        errorMessage={errors.remarks?.errorMessage}
        hasError={errors.remarks?.hasError}
        {...getOverrideProps(overrides, "remarks")}
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
          isDisabled={!(idProp || labourWorkPassModelProp)}
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
              !(idProp || labourWorkPassModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
