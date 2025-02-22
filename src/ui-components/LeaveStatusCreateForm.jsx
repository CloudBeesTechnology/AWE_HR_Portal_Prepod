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
import { createLeaveStatus } from "../graphql/mutations";
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
export default function LeaveStatusCreateForm(props) {
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
    fromDate: "",
    toDate: "",
    days: "",
    applyTo: [],
    reason: "",
    medicalCertificate: "",
    supervisorName: "",
    supervisorEmpID: "",
    supervisorStatus: "",
    supervisorDate: "",
    supervisorRemarks: "",
    managerName: "",
    managerEmpID: "",
    managerStatus: "",
    managerDate: "",
    managerRemarks: "",
    empStatus: "",
    empDate: "",
    empRemarks: "",
    selectedTo: "",
    selectedFrom: "",
    startDate: "",
    endDate: "",
    receivedDate: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [leaveType, setLeaveType] = React.useState(initialValues.leaveType);
  const [fromDate, setFromDate] = React.useState(initialValues.fromDate);
  const [toDate, setToDate] = React.useState(initialValues.toDate);
  const [days, setDays] = React.useState(initialValues.days);
  const [applyTo, setApplyTo] = React.useState(initialValues.applyTo);
  const [reason, setReason] = React.useState(initialValues.reason);
  const [medicalCertificate, setMedicalCertificate] = React.useState(
    initialValues.medicalCertificate
  );
  const [supervisorName, setSupervisorName] = React.useState(
    initialValues.supervisorName
  );
  const [supervisorEmpID, setSupervisorEmpID] = React.useState(
    initialValues.supervisorEmpID
  );
  const [supervisorStatus, setSupervisorStatus] = React.useState(
    initialValues.supervisorStatus
  );
  const [supervisorDate, setSupervisorDate] = React.useState(
    initialValues.supervisorDate
  );
  const [supervisorRemarks, setSupervisorRemarks] = React.useState(
    initialValues.supervisorRemarks
  );
  const [managerName, setManagerName] = React.useState(
    initialValues.managerName
  );
  const [managerEmpID, setManagerEmpID] = React.useState(
    initialValues.managerEmpID
  );
  const [managerStatus, setManagerStatus] = React.useState(
    initialValues.managerStatus
  );
  const [managerDate, setManagerDate] = React.useState(
    initialValues.managerDate
  );
  const [managerRemarks, setManagerRemarks] = React.useState(
    initialValues.managerRemarks
  );
  const [empStatus, setEmpStatus] = React.useState(initialValues.empStatus);
  const [empDate, setEmpDate] = React.useState(initialValues.empDate);
  const [empRemarks, setEmpRemarks] = React.useState(initialValues.empRemarks);
  const [selectedTo, setSelectedTo] = React.useState(initialValues.selectedTo);
  const [selectedFrom, setSelectedFrom] = React.useState(
    initialValues.selectedFrom
  );
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [endDate, setEndDate] = React.useState(initialValues.endDate);
  const [receivedDate, setReceivedDate] = React.useState(
    initialValues.receivedDate
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setLeaveType(initialValues.leaveType);
    setFromDate(initialValues.fromDate);
    setToDate(initialValues.toDate);
    setDays(initialValues.days);
    setApplyTo(initialValues.applyTo);
    setCurrentApplyToValue("");
    setReason(initialValues.reason);
    setMedicalCertificate(initialValues.medicalCertificate);
    setSupervisorName(initialValues.supervisorName);
    setSupervisorEmpID(initialValues.supervisorEmpID);
    setSupervisorStatus(initialValues.supervisorStatus);
    setSupervisorDate(initialValues.supervisorDate);
    setSupervisorRemarks(initialValues.supervisorRemarks);
    setManagerName(initialValues.managerName);
    setManagerEmpID(initialValues.managerEmpID);
    setManagerStatus(initialValues.managerStatus);
    setManagerDate(initialValues.managerDate);
    setManagerRemarks(initialValues.managerRemarks);
    setEmpStatus(initialValues.empStatus);
    setEmpDate(initialValues.empDate);
    setEmpRemarks(initialValues.empRemarks);
    setSelectedTo(initialValues.selectedTo);
    setSelectedFrom(initialValues.selectedFrom);
    setStartDate(initialValues.startDate);
    setEndDate(initialValues.endDate);
    setReceivedDate(initialValues.receivedDate);
    setErrors({});
  };
  const [currentApplyToValue, setCurrentApplyToValue] = React.useState("");
  const applyToRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    leaveType: [],
    fromDate: [],
    toDate: [],
    days: [],
    applyTo: [],
    reason: [],
    medicalCertificate: [],
    supervisorName: [],
    supervisorEmpID: [],
    supervisorStatus: [],
    supervisorDate: [],
    supervisorRemarks: [],
    managerName: [],
    managerEmpID: [],
    managerStatus: [],
    managerDate: [],
    managerRemarks: [],
    empStatus: [],
    empDate: [],
    empRemarks: [],
    selectedTo: [],
    selectedFrom: [],
    startDate: [],
    endDate: [],
    receivedDate: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          fromDate,
          toDate,
          days,
          applyTo,
          reason,
          medicalCertificate,
          supervisorName,
          supervisorEmpID,
          supervisorStatus,
          supervisorDate,
          supervisorRemarks,
          managerName,
          managerEmpID,
          managerStatus,
          managerDate,
          managerRemarks,
          empStatus,
          empDate,
          empRemarks,
          selectedTo,
          selectedFrom,
          startDate,
          endDate,
          receivedDate,
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
            query: createLeaveStatus.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "LeaveStatusCreateForm")}
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
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
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
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
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
        label="From date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={fromDate && convertToLocal(new Date(fromDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate: value,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.fromDate ?? value;
          }
          if (errors.fromDate?.hasError) {
            runValidationTasks("fromDate", value);
          }
          setFromDate(value);
        }}
        onBlur={() => runValidationTasks("fromDate", fromDate)}
        errorMessage={errors.fromDate?.errorMessage}
        hasError={errors.fromDate?.hasError}
        {...getOverrideProps(overrides, "fromDate")}
      ></TextField>
      <TextField
        label="To date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={toDate && convertToLocal(new Date(toDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate: value,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.toDate ?? value;
          }
          if (errors.toDate?.hasError) {
            runValidationTasks("toDate", value);
          }
          setToDate(value);
        }}
        onBlur={() => runValidationTasks("toDate", toDate)}
        errorMessage={errors.toDate?.errorMessage}
        hasError={errors.toDate?.hasError}
        {...getOverrideProps(overrides, "toDate")}
      ></TextField>
      <TextField
        label="Days"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={days}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days: value,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.days ?? value;
          }
          if (errors.days?.hasError) {
            runValidationTasks("days", value);
          }
          setDays(value);
        }}
        onBlur={() => runValidationTasks("days", days)}
        errorMessage={errors.days?.errorMessage}
        hasError={errors.days?.hasError}
        {...getOverrideProps(overrides, "days")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo: values,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            values = result?.applyTo ?? values;
          }
          setApplyTo(values);
          setCurrentApplyToValue("");
        }}
        currentFieldValue={currentApplyToValue}
        label={"Apply to"}
        items={applyTo}
        hasError={errors?.applyTo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("applyTo", currentApplyToValue)
        }
        errorMessage={errors?.applyTo?.errorMessage}
        setFieldValue={setCurrentApplyToValue}
        inputFieldRef={applyToRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Apply to"
          isRequired={false}
          isReadOnly={false}
          value={currentApplyToValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.applyTo?.hasError) {
              runValidationTasks("applyTo", value);
            }
            setCurrentApplyToValue(value);
          }}
          onBlur={() => runValidationTasks("applyTo", currentApplyToValue)}
          errorMessage={errors.applyTo?.errorMessage}
          hasError={errors.applyTo?.hasError}
          ref={applyToRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "applyTo")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Reason"
        isRequired={false}
        isReadOnly={false}
        value={reason}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason: value,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.reason ?? value;
          }
          if (errors.reason?.hasError) {
            runValidationTasks("reason", value);
          }
          setReason(value);
        }}
        onBlur={() => runValidationTasks("reason", reason)}
        errorMessage={errors.reason?.errorMessage}
        hasError={errors.reason?.hasError}
        {...getOverrideProps(overrides, "reason")}
      ></TextField>
      <TextField
        label="Medical certificate"
        isRequired={false}
        isReadOnly={false}
        value={medicalCertificate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate: value,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.medicalCertificate ?? value;
          }
          if (errors.medicalCertificate?.hasError) {
            runValidationTasks("medicalCertificate", value);
          }
          setMedicalCertificate(value);
        }}
        onBlur={() =>
          runValidationTasks("medicalCertificate", medicalCertificate)
        }
        errorMessage={errors.medicalCertificate?.errorMessage}
        hasError={errors.medicalCertificate?.hasError}
        {...getOverrideProps(overrides, "medicalCertificate")}
      ></TextField>
      <TextField
        label="Supervisor name"
        isRequired={false}
        isReadOnly={false}
        value={supervisorName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName: value,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.supervisorName ?? value;
          }
          if (errors.supervisorName?.hasError) {
            runValidationTasks("supervisorName", value);
          }
          setSupervisorName(value);
        }}
        onBlur={() => runValidationTasks("supervisorName", supervisorName)}
        errorMessage={errors.supervisorName?.errorMessage}
        hasError={errors.supervisorName?.hasError}
        {...getOverrideProps(overrides, "supervisorName")}
      ></TextField>
      <TextField
        label="Supervisor emp id"
        isRequired={false}
        isReadOnly={false}
        value={supervisorEmpID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID: value,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.supervisorEmpID ?? value;
          }
          if (errors.supervisorEmpID?.hasError) {
            runValidationTasks("supervisorEmpID", value);
          }
          setSupervisorEmpID(value);
        }}
        onBlur={() => runValidationTasks("supervisorEmpID", supervisorEmpID)}
        errorMessage={errors.supervisorEmpID?.errorMessage}
        hasError={errors.supervisorEmpID?.hasError}
        {...getOverrideProps(overrides, "supervisorEmpID")}
      ></TextField>
      <TextField
        label="Supervisor status"
        isRequired={false}
        isReadOnly={false}
        value={supervisorStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus: value,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.supervisorStatus ?? value;
          }
          if (errors.supervisorStatus?.hasError) {
            runValidationTasks("supervisorStatus", value);
          }
          setSupervisorStatus(value);
        }}
        onBlur={() => runValidationTasks("supervisorStatus", supervisorStatus)}
        errorMessage={errors.supervisorStatus?.errorMessage}
        hasError={errors.supervisorStatus?.hasError}
        {...getOverrideProps(overrides, "supervisorStatus")}
      ></TextField>
      <TextField
        label="Supervisor date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={supervisorDate && convertToLocal(new Date(supervisorDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate: value,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.supervisorDate ?? value;
          }
          if (errors.supervisorDate?.hasError) {
            runValidationTasks("supervisorDate", value);
          }
          setSupervisorDate(value);
        }}
        onBlur={() => runValidationTasks("supervisorDate", supervisorDate)}
        errorMessage={errors.supervisorDate?.errorMessage}
        hasError={errors.supervisorDate?.hasError}
        {...getOverrideProps(overrides, "supervisorDate")}
      ></TextField>
      <TextField
        label="Supervisor remarks"
        isRequired={false}
        isReadOnly={false}
        value={supervisorRemarks}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks: value,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.supervisorRemarks ?? value;
          }
          if (errors.supervisorRemarks?.hasError) {
            runValidationTasks("supervisorRemarks", value);
          }
          setSupervisorRemarks(value);
        }}
        onBlur={() =>
          runValidationTasks("supervisorRemarks", supervisorRemarks)
        }
        errorMessage={errors.supervisorRemarks?.errorMessage}
        hasError={errors.supervisorRemarks?.hasError}
        {...getOverrideProps(overrides, "supervisorRemarks")}
      ></TextField>
      <TextField
        label="Manager name"
        isRequired={false}
        isReadOnly={false}
        value={managerName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName: value,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.managerName ?? value;
          }
          if (errors.managerName?.hasError) {
            runValidationTasks("managerName", value);
          }
          setManagerName(value);
        }}
        onBlur={() => runValidationTasks("managerName", managerName)}
        errorMessage={errors.managerName?.errorMessage}
        hasError={errors.managerName?.hasError}
        {...getOverrideProps(overrides, "managerName")}
      ></TextField>
      <TextField
        label="Manager emp id"
        isRequired={false}
        isReadOnly={false}
        value={managerEmpID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID: value,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.managerEmpID ?? value;
          }
          if (errors.managerEmpID?.hasError) {
            runValidationTasks("managerEmpID", value);
          }
          setManagerEmpID(value);
        }}
        onBlur={() => runValidationTasks("managerEmpID", managerEmpID)}
        errorMessage={errors.managerEmpID?.errorMessage}
        hasError={errors.managerEmpID?.hasError}
        {...getOverrideProps(overrides, "managerEmpID")}
      ></TextField>
      <TextField
        label="Manager status"
        isRequired={false}
        isReadOnly={false}
        value={managerStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus: value,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.managerStatus ?? value;
          }
          if (errors.managerStatus?.hasError) {
            runValidationTasks("managerStatus", value);
          }
          setManagerStatus(value);
        }}
        onBlur={() => runValidationTasks("managerStatus", managerStatus)}
        errorMessage={errors.managerStatus?.errorMessage}
        hasError={errors.managerStatus?.hasError}
        {...getOverrideProps(overrides, "managerStatus")}
      ></TextField>
      <TextField
        label="Manager date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={managerDate && convertToLocal(new Date(managerDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate: value,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.managerDate ?? value;
          }
          if (errors.managerDate?.hasError) {
            runValidationTasks("managerDate", value);
          }
          setManagerDate(value);
        }}
        onBlur={() => runValidationTasks("managerDate", managerDate)}
        errorMessage={errors.managerDate?.errorMessage}
        hasError={errors.managerDate?.hasError}
        {...getOverrideProps(overrides, "managerDate")}
      ></TextField>
      <TextField
        label="Manager remarks"
        isRequired={false}
        isReadOnly={false}
        value={managerRemarks}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks: value,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.managerRemarks ?? value;
          }
          if (errors.managerRemarks?.hasError) {
            runValidationTasks("managerRemarks", value);
          }
          setManagerRemarks(value);
        }}
        onBlur={() => runValidationTasks("managerRemarks", managerRemarks)}
        errorMessage={errors.managerRemarks?.errorMessage}
        hasError={errors.managerRemarks?.hasError}
        {...getOverrideProps(overrides, "managerRemarks")}
      ></TextField>
      <TextField
        label="Emp status"
        isRequired={false}
        isReadOnly={false}
        value={empStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus: value,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.empStatus ?? value;
          }
          if (errors.empStatus?.hasError) {
            runValidationTasks("empStatus", value);
          }
          setEmpStatus(value);
        }}
        onBlur={() => runValidationTasks("empStatus", empStatus)}
        errorMessage={errors.empStatus?.errorMessage}
        hasError={errors.empStatus?.hasError}
        {...getOverrideProps(overrides, "empStatus")}
      ></TextField>
      <TextField
        label="Emp date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={empDate && convertToLocal(new Date(empDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate: value,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.empDate ?? value;
          }
          if (errors.empDate?.hasError) {
            runValidationTasks("empDate", value);
          }
          setEmpDate(value);
        }}
        onBlur={() => runValidationTasks("empDate", empDate)}
        errorMessage={errors.empDate?.errorMessage}
        hasError={errors.empDate?.hasError}
        {...getOverrideProps(overrides, "empDate")}
      ></TextField>
      <TextField
        label="Emp remarks"
        isRequired={false}
        isReadOnly={false}
        value={empRemarks}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks: value,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.empRemarks ?? value;
          }
          if (errors.empRemarks?.hasError) {
            runValidationTasks("empRemarks", value);
          }
          setEmpRemarks(value);
        }}
        onBlur={() => runValidationTasks("empRemarks", empRemarks)}
        errorMessage={errors.empRemarks?.errorMessage}
        hasError={errors.empRemarks?.hasError}
        {...getOverrideProps(overrides, "empRemarks")}
      ></TextField>
      <TextField
        label="Selected to"
        isRequired={false}
        isReadOnly={false}
        value={selectedTo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo: value,
              selectedFrom,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.selectedTo ?? value;
          }
          if (errors.selectedTo?.hasError) {
            runValidationTasks("selectedTo", value);
          }
          setSelectedTo(value);
        }}
        onBlur={() => runValidationTasks("selectedTo", selectedTo)}
        errorMessage={errors.selectedTo?.errorMessage}
        hasError={errors.selectedTo?.hasError}
        {...getOverrideProps(overrides, "selectedTo")}
      ></TextField>
      <TextField
        label="Selected from"
        isRequired={false}
        isReadOnly={false}
        value={selectedFrom}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom: value,
              startDate,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.selectedFrom ?? value;
          }
          if (errors.selectedFrom?.hasError) {
            runValidationTasks("selectedFrom", value);
          }
          setSelectedFrom(value);
        }}
        onBlur={() => runValidationTasks("selectedFrom", selectedFrom)}
        errorMessage={errors.selectedFrom?.errorMessage}
        hasError={errors.selectedFrom?.hasError}
        {...getOverrideProps(overrides, "selectedFrom")}
      ></TextField>
      <TextField
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={startDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate: value,
              endDate,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.startDate ?? value;
          }
          if (errors.startDate?.hasError) {
            runValidationTasks("startDate", value);
          }
          setStartDate(value);
        }}
        onBlur={() => runValidationTasks("startDate", startDate)}
        errorMessage={errors.startDate?.errorMessage}
        hasError={errors.startDate?.hasError}
        {...getOverrideProps(overrides, "startDate")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={endDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate: value,
              receivedDate,
            };
            const result = onChange(modelFields);
            value = result?.endDate ?? value;
          }
          if (errors.endDate?.hasError) {
            runValidationTasks("endDate", value);
          }
          setEndDate(value);
        }}
        onBlur={() => runValidationTasks("endDate", endDate)}
        errorMessage={errors.endDate?.errorMessage}
        hasError={errors.endDate?.hasError}
        {...getOverrideProps(overrides, "endDate")}
      ></TextField>
      <TextField
        label="Received date"
        isRequired={false}
        isReadOnly={false}
        value={receivedDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              leaveType,
              fromDate,
              toDate,
              days,
              applyTo,
              reason,
              medicalCertificate,
              supervisorName,
              supervisorEmpID,
              supervisorStatus,
              supervisorDate,
              supervisorRemarks,
              managerName,
              managerEmpID,
              managerStatus,
              managerDate,
              managerRemarks,
              empStatus,
              empDate,
              empRemarks,
              selectedTo,
              selectedFrom,
              startDate,
              endDate,
              receivedDate: value,
            };
            const result = onChange(modelFields);
            value = result?.receivedDate ?? value;
          }
          if (errors.receivedDate?.hasError) {
            runValidationTasks("receivedDate", value);
          }
          setReceivedDate(value);
        }}
        onBlur={() => runValidationTasks("receivedDate", receivedDate)}
        errorMessage={errors.receivedDate?.errorMessage}
        hasError={errors.receivedDate?.hasError}
        {...getOverrideProps(overrides, "receivedDate")}
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
