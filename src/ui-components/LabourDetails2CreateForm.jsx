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
import { createLabourDetails2 } from "../graphql/mutations";
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
export default function LabourDetails2CreateForm(props) {
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
    reEntryVisaApplication: "",
    immigrationApprovalDate: "",
    reEntryVisaExpiry: "",
    airTicketStatus: "",
    remarks: "",
    dependentName: "",
    dependentPassportNumber: "",
    dependentPassportExpiry: "",
    relation: "",
    labourDepositPaidBy: "",
    labourDepositReceiptNumber: "",
    labourDepositAmount: "",
    labourUploadDoc: [],
  };
  const [reEntryVisaApplication, setReEntryVisaApplication] = React.useState(
    initialValues.reEntryVisaApplication
  );
  const [immigrationApprovalDate, setImmigrationApprovalDate] = React.useState(
    initialValues.immigrationApprovalDate
  );
  const [reEntryVisaExpiry, setReEntryVisaExpiry] = React.useState(
    initialValues.reEntryVisaExpiry
  );
  const [airTicketStatus, setAirTicketStatus] = React.useState(
    initialValues.airTicketStatus
  );
  const [remarks, setRemarks] = React.useState(initialValues.remarks);
  const [dependentName, setDependentName] = React.useState(
    initialValues.dependentName
  );
  const [dependentPassportNumber, setDependentPassportNumber] = React.useState(
    initialValues.dependentPassportNumber
  );
  const [dependentPassportExpiry, setDependentPassportExpiry] = React.useState(
    initialValues.dependentPassportExpiry
  );
  const [relation, setRelation] = React.useState(initialValues.relation);
  const [labourDepositPaidBy, setLabourDepositPaidBy] = React.useState(
    initialValues.labourDepositPaidBy
  );
  const [labourDepositReceiptNumber, setLabourDepositReceiptNumber] =
    React.useState(initialValues.labourDepositReceiptNumber);
  const [labourDepositAmount, setLabourDepositAmount] = React.useState(
    initialValues.labourDepositAmount
  );
  const [labourUploadDoc, setLabourUploadDoc] = React.useState(
    initialValues.labourUploadDoc
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setReEntryVisaApplication(initialValues.reEntryVisaApplication);
    setImmigrationApprovalDate(initialValues.immigrationApprovalDate);
    setReEntryVisaExpiry(initialValues.reEntryVisaExpiry);
    setAirTicketStatus(initialValues.airTicketStatus);
    setRemarks(initialValues.remarks);
    setDependentName(initialValues.dependentName);
    setDependentPassportNumber(initialValues.dependentPassportNumber);
    setDependentPassportExpiry(initialValues.dependentPassportExpiry);
    setRelation(initialValues.relation);
    setLabourDepositPaidBy(initialValues.labourDepositPaidBy);
    setLabourDepositReceiptNumber(initialValues.labourDepositReceiptNumber);
    setLabourDepositAmount(initialValues.labourDepositAmount);
    setLabourUploadDoc(initialValues.labourUploadDoc);
    setCurrentLabourUploadDocValue("");
    setErrors({});
  };
  const [currentLabourUploadDocValue, setCurrentLabourUploadDocValue] =
    React.useState("");
  const labourUploadDocRef = React.createRef();
  const validations = {
    reEntryVisaApplication: [{ type: "Required" }],
    immigrationApprovalDate: [{ type: "Required" }],
    reEntryVisaExpiry: [{ type: "Required" }],
    airTicketStatus: [{ type: "Required" }],
    remarks: [],
    dependentName: [{ type: "Required" }],
    dependentPassportNumber: [{ type: "Required" }],
    dependentPassportExpiry: [{ type: "Required" }],
    relation: [{ type: "Required" }],
    labourDepositPaidBy: [{ type: "Required" }],
    labourDepositReceiptNumber: [{ type: "Required" }],
    labourDepositAmount: [{ type: "Required" }],
    labourUploadDoc: [{ type: "Required" }],
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
          reEntryVisaApplication,
          immigrationApprovalDate,
          reEntryVisaExpiry,
          airTicketStatus,
          remarks,
          dependentName,
          dependentPassportNumber,
          dependentPassportExpiry,
          relation,
          labourDepositPaidBy,
          labourDepositReceiptNumber,
          labourDepositAmount,
          labourUploadDoc,
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
            query: createLabourDetails2.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "LabourDetails2CreateForm")}
      {...rest}
    >
      <TextField
        label="Re entry visa application"
        isRequired={true}
        isReadOnly={false}
        value={reEntryVisaApplication}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication: value,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.reEntryVisaApplication ?? value;
          }
          if (errors.reEntryVisaApplication?.hasError) {
            runValidationTasks("reEntryVisaApplication", value);
          }
          setReEntryVisaApplication(value);
        }}
        onBlur={() =>
          runValidationTasks("reEntryVisaApplication", reEntryVisaApplication)
        }
        errorMessage={errors.reEntryVisaApplication?.errorMessage}
        hasError={errors.reEntryVisaApplication?.hasError}
        {...getOverrideProps(overrides, "reEntryVisaApplication")}
      ></TextField>
      <TextField
        label="Immigration approval date"
        isRequired={true}
        isReadOnly={false}
        value={immigrationApprovalDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate: value,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.immigrationApprovalDate ?? value;
          }
          if (errors.immigrationApprovalDate?.hasError) {
            runValidationTasks("immigrationApprovalDate", value);
          }
          setImmigrationApprovalDate(value);
        }}
        onBlur={() =>
          runValidationTasks("immigrationApprovalDate", immigrationApprovalDate)
        }
        errorMessage={errors.immigrationApprovalDate?.errorMessage}
        hasError={errors.immigrationApprovalDate?.hasError}
        {...getOverrideProps(overrides, "immigrationApprovalDate")}
      ></TextField>
      <TextField
        label="Re entry visa expiry"
        isRequired={true}
        isReadOnly={false}
        value={reEntryVisaExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry: value,
              airTicketStatus,
              remarks,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.reEntryVisaExpiry ?? value;
          }
          if (errors.reEntryVisaExpiry?.hasError) {
            runValidationTasks("reEntryVisaExpiry", value);
          }
          setReEntryVisaExpiry(value);
        }}
        onBlur={() =>
          runValidationTasks("reEntryVisaExpiry", reEntryVisaExpiry)
        }
        errorMessage={errors.reEntryVisaExpiry?.errorMessage}
        hasError={errors.reEntryVisaExpiry?.hasError}
        {...getOverrideProps(overrides, "reEntryVisaExpiry")}
      ></TextField>
      <TextField
        label="Air ticket status"
        isRequired={true}
        isReadOnly={false}
        value={airTicketStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus: value,
              remarks,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.airTicketStatus ?? value;
          }
          if (errors.airTicketStatus?.hasError) {
            runValidationTasks("airTicketStatus", value);
          }
          setAirTicketStatus(value);
        }}
        onBlur={() => runValidationTasks("airTicketStatus", airTicketStatus)}
        errorMessage={errors.airTicketStatus?.errorMessage}
        hasError={errors.airTicketStatus?.hasError}
        {...getOverrideProps(overrides, "airTicketStatus")}
      ></TextField>
      <TextField
        label="Remarks"
        isRequired={false}
        isReadOnly={false}
        value={remarks}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks: value,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc,
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
      <TextField
        label="Dependent name"
        isRequired={true}
        isReadOnly={false}
        value={dependentName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks,
              dependentName: value,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.dependentName ?? value;
          }
          if (errors.dependentName?.hasError) {
            runValidationTasks("dependentName", value);
          }
          setDependentName(value);
        }}
        onBlur={() => runValidationTasks("dependentName", dependentName)}
        errorMessage={errors.dependentName?.errorMessage}
        hasError={errors.dependentName?.hasError}
        {...getOverrideProps(overrides, "dependentName")}
      ></TextField>
      <TextField
        label="Dependent passport number"
        isRequired={true}
        isReadOnly={false}
        value={dependentPassportNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks,
              dependentName,
              dependentPassportNumber: value,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.dependentPassportNumber ?? value;
          }
          if (errors.dependentPassportNumber?.hasError) {
            runValidationTasks("dependentPassportNumber", value);
          }
          setDependentPassportNumber(value);
        }}
        onBlur={() =>
          runValidationTasks("dependentPassportNumber", dependentPassportNumber)
        }
        errorMessage={errors.dependentPassportNumber?.errorMessage}
        hasError={errors.dependentPassportNumber?.hasError}
        {...getOverrideProps(overrides, "dependentPassportNumber")}
      ></TextField>
      <TextField
        label="Dependent passport expiry"
        isRequired={true}
        isReadOnly={false}
        value={dependentPassportExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry: value,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.dependentPassportExpiry ?? value;
          }
          if (errors.dependentPassportExpiry?.hasError) {
            runValidationTasks("dependentPassportExpiry", value);
          }
          setDependentPassportExpiry(value);
        }}
        onBlur={() =>
          runValidationTasks("dependentPassportExpiry", dependentPassportExpiry)
        }
        errorMessage={errors.dependentPassportExpiry?.errorMessage}
        hasError={errors.dependentPassportExpiry?.hasError}
        {...getOverrideProps(overrides, "dependentPassportExpiry")}
      ></TextField>
      <TextField
        label="Relation"
        isRequired={true}
        isReadOnly={false}
        value={relation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation: value,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.relation ?? value;
          }
          if (errors.relation?.hasError) {
            runValidationTasks("relation", value);
          }
          setRelation(value);
        }}
        onBlur={() => runValidationTasks("relation", relation)}
        errorMessage={errors.relation?.errorMessage}
        hasError={errors.relation?.hasError}
        {...getOverrideProps(overrides, "relation")}
      ></TextField>
      <TextField
        label="Labour deposit paid by"
        isRequired={true}
        isReadOnly={false}
        value={labourDepositPaidBy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy: value,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.labourDepositPaidBy ?? value;
          }
          if (errors.labourDepositPaidBy?.hasError) {
            runValidationTasks("labourDepositPaidBy", value);
          }
          setLabourDepositPaidBy(value);
        }}
        onBlur={() =>
          runValidationTasks("labourDepositPaidBy", labourDepositPaidBy)
        }
        errorMessage={errors.labourDepositPaidBy?.errorMessage}
        hasError={errors.labourDepositPaidBy?.hasError}
        {...getOverrideProps(overrides, "labourDepositPaidBy")}
      ></TextField>
      <TextField
        label="Labour deposit receipt number"
        isRequired={true}
        isReadOnly={false}
        value={labourDepositReceiptNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber: value,
              labourDepositAmount,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.labourDepositReceiptNumber ?? value;
          }
          if (errors.labourDepositReceiptNumber?.hasError) {
            runValidationTasks("labourDepositReceiptNumber", value);
          }
          setLabourDepositReceiptNumber(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "labourDepositReceiptNumber",
            labourDepositReceiptNumber
          )
        }
        errorMessage={errors.labourDepositReceiptNumber?.errorMessage}
        hasError={errors.labourDepositReceiptNumber?.hasError}
        {...getOverrideProps(overrides, "labourDepositReceiptNumber")}
      ></TextField>
      <TextField
        label="Labour deposit amount"
        isRequired={true}
        isReadOnly={false}
        value={labourDepositAmount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount: value,
              labourUploadDoc,
            };
            const result = onChange(modelFields);
            value = result?.labourDepositAmount ?? value;
          }
          if (errors.labourDepositAmount?.hasError) {
            runValidationTasks("labourDepositAmount", value);
          }
          setLabourDepositAmount(value);
        }}
        onBlur={() =>
          runValidationTasks("labourDepositAmount", labourDepositAmount)
        }
        errorMessage={errors.labourDepositAmount?.errorMessage}
        hasError={errors.labourDepositAmount?.hasError}
        {...getOverrideProps(overrides, "labourDepositAmount")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              reEntryVisaApplication,
              immigrationApprovalDate,
              reEntryVisaExpiry,
              airTicketStatus,
              remarks,
              dependentName,
              dependentPassportNumber,
              dependentPassportExpiry,
              relation,
              labourDepositPaidBy,
              labourDepositReceiptNumber,
              labourDepositAmount,
              labourUploadDoc: values,
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
