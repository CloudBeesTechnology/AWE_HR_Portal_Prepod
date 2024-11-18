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
import { getInterviewScheduleSchema } from "../graphql/queries";
import { updateInterviewScheduleSchema } from "../graphql/mutations";
const client = generateClient();
export default function InterviewScheduleSchemaUpdateForm(props) {
  const {
    id: idProp,
    interviewScheduleSchema: interviewScheduleSchemaModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: "",
    time: "",
    venue: "",
    interviewType: "",
    interviewer: "",
    message: "",
    tempID: "",
    candidateStatus: "",
    department: "",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [time, setTime] = React.useState(initialValues.time);
  const [venue, setVenue] = React.useState(initialValues.venue);
  const [interviewType, setInterviewType] = React.useState(
    initialValues.interviewType
  );
  const [interviewer, setInterviewer] = React.useState(
    initialValues.interviewer
  );
  const [message, setMessage] = React.useState(initialValues.message);
  const [tempID, setTempID] = React.useState(initialValues.tempID);
  const [candidateStatus, setCandidateStatus] = React.useState(
    initialValues.candidateStatus
  );
  const [department, setDepartment] = React.useState(initialValues.department);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = interviewScheduleSchemaRecord
      ? { ...initialValues, ...interviewScheduleSchemaRecord }
      : initialValues;
    setDate(cleanValues.date);
    setTime(cleanValues.time);
    setVenue(cleanValues.venue);
    setInterviewType(cleanValues.interviewType);
    setInterviewer(cleanValues.interviewer);
    setMessage(cleanValues.message);
    setTempID(cleanValues.tempID);
    setCandidateStatus(cleanValues.candidateStatus);
    setDepartment(cleanValues.department);
    setErrors({});
  };
  const [interviewScheduleSchemaRecord, setInterviewScheduleSchemaRecord] =
    React.useState(interviewScheduleSchemaModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getInterviewScheduleSchema.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getInterviewScheduleSchema
        : interviewScheduleSchemaModelProp;
      setInterviewScheduleSchemaRecord(record);
    };
    queryData();
  }, [idProp, interviewScheduleSchemaModelProp]);
  React.useEffect(resetStateValues, [interviewScheduleSchemaRecord]);
  const validations = {
    date: [{ type: "Required" }],
    time: [{ type: "Required" }],
    venue: [{ type: "Required" }],
    interviewType: [{ type: "Required" }],
    interviewer: [{ type: "Required" }],
    message: [],
    tempID: [{ type: "Required" }],
    candidateStatus: [],
    department: [],
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
          date,
          time,
          venue,
          interviewType,
          interviewer,
          message: message ?? null,
          tempID,
          candidateStatus: candidateStatus ?? null,
          department: department ?? null,
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
            query: updateInterviewScheduleSchema.replaceAll("__typename", ""),
            variables: {
              input: {
                id: interviewScheduleSchemaRecord.id,
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
      {...getOverrideProps(overrides, "InterviewScheduleSchemaUpdateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              time,
              venue,
              interviewType,
              interviewer,
              message,
              tempID,
              candidateStatus,
              department,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Time"
        isRequired={true}
        isReadOnly={false}
        value={time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time: value,
              venue,
              interviewType,
              interviewer,
              message,
              tempID,
              candidateStatus,
              department,
            };
            const result = onChange(modelFields);
            value = result?.time ?? value;
          }
          if (errors.time?.hasError) {
            runValidationTasks("time", value);
          }
          setTime(value);
        }}
        onBlur={() => runValidationTasks("time", time)}
        errorMessage={errors.time?.errorMessage}
        hasError={errors.time?.hasError}
        {...getOverrideProps(overrides, "time")}
      ></TextField>
      <TextField
        label="Venue"
        isRequired={true}
        isReadOnly={false}
        value={venue}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              venue: value,
              interviewType,
              interviewer,
              message,
              tempID,
              candidateStatus,
              department,
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
        label="Interview type"
        isRequired={true}
        isReadOnly={false}
        value={interviewType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              venue,
              interviewType: value,
              interviewer,
              message,
              tempID,
              candidateStatus,
              department,
            };
            const result = onChange(modelFields);
            value = result?.interviewType ?? value;
          }
          if (errors.interviewType?.hasError) {
            runValidationTasks("interviewType", value);
          }
          setInterviewType(value);
        }}
        onBlur={() => runValidationTasks("interviewType", interviewType)}
        errorMessage={errors.interviewType?.errorMessage}
        hasError={errors.interviewType?.hasError}
        {...getOverrideProps(overrides, "interviewType")}
      ></TextField>
      <TextField
        label="Interviewer"
        isRequired={true}
        isReadOnly={false}
        value={interviewer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              venue,
              interviewType,
              interviewer: value,
              message,
              tempID,
              candidateStatus,
              department,
            };
            const result = onChange(modelFields);
            value = result?.interviewer ?? value;
          }
          if (errors.interviewer?.hasError) {
            runValidationTasks("interviewer", value);
          }
          setInterviewer(value);
        }}
        onBlur={() => runValidationTasks("interviewer", interviewer)}
        errorMessage={errors.interviewer?.errorMessage}
        hasError={errors.interviewer?.hasError}
        {...getOverrideProps(overrides, "interviewer")}
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
              date,
              time,
              venue,
              interviewType,
              interviewer,
              message: value,
              tempID,
              candidateStatus,
              department,
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
        isRequired={true}
        isReadOnly={false}
        value={tempID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              venue,
              interviewType,
              interviewer,
              message,
              tempID: value,
              candidateStatus,
              department,
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
        label="Candidate status"
        isRequired={false}
        isReadOnly={false}
        value={candidateStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              venue,
              interviewType,
              interviewer,
              message,
              tempID,
              candidateStatus: value,
              department,
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
              date,
              time,
              venue,
              interviewType,
              interviewer,
              message,
              tempID,
              candidateStatus,
              department: value,
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
          isDisabled={!(idProp || interviewScheduleSchemaModelProp)}
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
              !(idProp || interviewScheduleSchemaModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
