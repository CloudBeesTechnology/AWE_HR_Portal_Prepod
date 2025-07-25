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
import { getInterviewSchedule } from "../graphql/queries";
import { updateInterviewSchedule } from "../graphql/mutations";
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
export default function InterviewScheduleUpdateForm(props) {
  const {
    id: idProp,
    interviewSchedule: interviewScheduleModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    interDate: "",
    interTime: "",
    venue: "",
    interType: "",
    bagdeNo: "",
    message: "",
    tempID: "",
    manager: "",
    candidateStatus: "",
    department: "",
    otherDepartment: "",
    status: "",
    empID: "",
    createdBy: [],
    updatedBy: [],
  };
  const [interDate, setInterDate] = React.useState(initialValues.interDate);
  const [interTime, setInterTime] = React.useState(initialValues.interTime);
  const [venue, setVenue] = React.useState(initialValues.venue);
  const [interType, setInterType] = React.useState(initialValues.interType);
  const [bagdeNo, setBagdeNo] = React.useState(initialValues.bagdeNo);
  const [message, setMessage] = React.useState(initialValues.message);
  const [tempID, setTempID] = React.useState(initialValues.tempID);
  const [manager, setManager] = React.useState(initialValues.manager);
  const [candidateStatus, setCandidateStatus] = React.useState(
    initialValues.candidateStatus
  );
  const [department, setDepartment] = React.useState(initialValues.department);
  const [otherDepartment, setOtherDepartment] = React.useState(
    initialValues.otherDepartment
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [updatedBy, setUpdatedBy] = React.useState(initialValues.updatedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = interviewScheduleRecord
      ? { ...initialValues, ...interviewScheduleRecord }
      : initialValues;
    setInterDate(cleanValues.interDate);
    setInterTime(cleanValues.interTime);
    setVenue(cleanValues.venue);
    setInterType(cleanValues.interType);
    setBagdeNo(cleanValues.bagdeNo);
    setMessage(cleanValues.message);
    setTempID(cleanValues.tempID);
    setManager(cleanValues.manager);
    setCandidateStatus(cleanValues.candidateStatus);
    setDepartment(cleanValues.department);
    setOtherDepartment(cleanValues.otherDepartment);
    setStatus(cleanValues.status);
    setEmpID(cleanValues.empID);
    setCreatedBy(cleanValues.createdBy ?? []);
    setCurrentCreatedByValue("");
    setUpdatedBy(cleanValues.updatedBy ?? []);
    setCurrentUpdatedByValue("");
    setErrors({});
  };
  const [interviewScheduleRecord, setInterviewScheduleRecord] = React.useState(
    interviewScheduleModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getInterviewSchedule.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getInterviewSchedule
        : interviewScheduleModelProp;
      setInterviewScheduleRecord(record);
    };
    queryData();
  }, [idProp, interviewScheduleModelProp]);
  React.useEffect(resetStateValues, [interviewScheduleRecord]);
  const [currentCreatedByValue, setCurrentCreatedByValue] = React.useState("");
  const createdByRef = React.createRef();
  const [currentUpdatedByValue, setCurrentUpdatedByValue] = React.useState("");
  const updatedByRef = React.createRef();
  const validations = {
    interDate: [],
    interTime: [],
    venue: [],
    interType: [],
    bagdeNo: [],
    message: [],
    tempID: [],
    manager: [],
    candidateStatus: [],
    department: [],
    otherDepartment: [],
    status: [],
    empID: [],
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
          interDate: interDate ?? null,
          interTime: interTime ?? null,
          venue: venue ?? null,
          interType: interType ?? null,
          bagdeNo: bagdeNo ?? null,
          message: message ?? null,
          tempID: tempID ?? null,
          manager: manager ?? null,
          candidateStatus: candidateStatus ?? null,
          department: department ?? null,
          otherDepartment: otherDepartment ?? null,
          status: status ?? null,
          empID: empID ?? null,
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
            query: updateInterviewSchedule.replaceAll("__typename", ""),
            variables: {
              input: {
                id: interviewScheduleRecord.id,
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
      {...getOverrideProps(overrides, "InterviewScheduleUpdateForm")}
      {...rest}
    >
      <TextField
        label="Inter date"
        isRequired={false}
        isReadOnly={false}
        value={interDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate: value,
              interTime,
              venue,
              interType,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.interDate ?? value;
          }
          if (errors.interDate?.hasError) {
            runValidationTasks("interDate", value);
          }
          setInterDate(value);
        }}
        onBlur={() => runValidationTasks("interDate", interDate)}
        errorMessage={errors.interDate?.errorMessage}
        hasError={errors.interDate?.hasError}
        {...getOverrideProps(overrides, "interDate")}
      ></TextField>
      <TextField
        label="Inter time"
        isRequired={false}
        isReadOnly={false}
        value={interTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime: value,
              venue,
              interType,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.interTime ?? value;
          }
          if (errors.interTime?.hasError) {
            runValidationTasks("interTime", value);
          }
          setInterTime(value);
        }}
        onBlur={() => runValidationTasks("interTime", interTime)}
        errorMessage={errors.interTime?.errorMessage}
        hasError={errors.interTime?.hasError}
        {...getOverrideProps(overrides, "interTime")}
      ></TextField>
      <TextField
        label="Venue"
        isRequired={false}
        isReadOnly={false}
        value={venue}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime,
              venue: value,
              interType,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.venue ?? value;
          }
          if (errors.venue?.hasError) {
            runValidationTasks("venue", value);
          }
          setVenue(value);
        }}
        onBlur={() => runValidationTasks("venue", venue)}
        errorMessage={errors.venue?.errorMessage}
        hasError={errors.venue?.hasError}
        {...getOverrideProps(overrides, "venue")}
      ></TextField>
      <TextField
        label="Inter type"
        isRequired={false}
        isReadOnly={false}
        value={interType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime,
              venue,
              interType: value,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.interType ?? value;
          }
          if (errors.interType?.hasError) {
            runValidationTasks("interType", value);
          }
          setInterType(value);
        }}
        onBlur={() => runValidationTasks("interType", interType)}
        errorMessage={errors.interType?.errorMessage}
        hasError={errors.interType?.hasError}
        {...getOverrideProps(overrides, "interType")}
      ></TextField>
      <TextField
        label="Bagde no"
        isRequired={false}
        isReadOnly={false}
        value={bagdeNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo: value,
              message,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.bagdeNo ?? value;
          }
          if (errors.bagdeNo?.hasError) {
            runValidationTasks("bagdeNo", value);
          }
          setBagdeNo(value);
        }}
        onBlur={() => runValidationTasks("bagdeNo", bagdeNo)}
        errorMessage={errors.bagdeNo?.errorMessage}
        hasError={errors.bagdeNo?.hasError}
        {...getOverrideProps(overrides, "bagdeNo")}
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
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo,
              message: value,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID,
              createdBy,
              updatedBy,
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
      <TextField
        label="Temp id"
        isRequired={false}
        isReadOnly={false}
        value={tempID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo,
              message,
              tempID: value,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID,
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
        label="Manager"
        isRequired={false}
        isReadOnly={false}
        value={manager}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo,
              message,
              tempID,
              manager: value,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.manager ?? value;
          }
          if (errors.manager?.hasError) {
            runValidationTasks("manager", value);
          }
          setManager(value);
        }}
        onBlur={() => runValidationTasks("manager", manager)}
        errorMessage={errors.manager?.errorMessage}
        hasError={errors.manager?.hasError}
        {...getOverrideProps(overrides, "manager")}
      ></TextField>
      <TextField
        label="Candidate status"
        isRequired={false}
        isReadOnly={false}
        value={candidateStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus: value,
              department,
              otherDepartment,
              status,
              empID,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.candidateStatus ?? value;
          }
          if (errors.candidateStatus?.hasError) {
            runValidationTasks("candidateStatus", value);
          }
          setCandidateStatus(value);
        }}
        onBlur={() => runValidationTasks("candidateStatus", candidateStatus)}
        errorMessage={errors.candidateStatus?.errorMessage}
        hasError={errors.candidateStatus?.hasError}
        {...getOverrideProps(overrides, "candidateStatus")}
      ></TextField>
      <TextField
        label="Department"
        isRequired={false}
        isReadOnly={false}
        value={department}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus,
              department: value,
              otherDepartment,
              status,
              empID,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.department ?? value;
          }
          if (errors.department?.hasError) {
            runValidationTasks("department", value);
          }
          setDepartment(value);
        }}
        onBlur={() => runValidationTasks("department", department)}
        errorMessage={errors.department?.errorMessage}
        hasError={errors.department?.hasError}
        {...getOverrideProps(overrides, "department")}
      ></TextField>
      <TextField
        label="Other department"
        isRequired={false}
        isReadOnly={false}
        value={otherDepartment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment: value,
              status,
              empID,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.otherDepartment ?? value;
          }
          if (errors.otherDepartment?.hasError) {
            runValidationTasks("otherDepartment", value);
          }
          setOtherDepartment(value);
        }}
        onBlur={() => runValidationTasks("otherDepartment", otherDepartment)}
        errorMessage={errors.otherDepartment?.errorMessage}
        hasError={errors.otherDepartment?.hasError}
        {...getOverrideProps(overrides, "otherDepartment")}
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
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status: value,
              empID,
              createdBy,
              updatedBy,
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
        label="Emp id"
        isRequired={false}
        isReadOnly={false}
        value={empID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID: value,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID,
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
              interDate,
              interTime,
              venue,
              interType,
              bagdeNo,
              message,
              tempID,
              manager,
              candidateStatus,
              department,
              otherDepartment,
              status,
              empID,
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
          isDisabled={!(idProp || interviewScheduleModelProp)}
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
              !(idProp || interviewScheduleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
