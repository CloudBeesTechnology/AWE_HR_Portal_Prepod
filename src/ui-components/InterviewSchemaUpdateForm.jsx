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
import { getInterviewSchema } from "../graphql/queries";
import { updateInterviewSchema } from "../graphql/mutations";
const client = generateClient();
export default function InterviewSchemaUpdateForm(props) {
  const {
    id: idProp,
    interviewSchema: interviewSchemaModelProp,
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
    interviewer: "",
    interviewType: "",
    message: "",
    tempID: "",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [time, setTime] = React.useState(initialValues.time);
  const [venue, setVenue] = React.useState(initialValues.venue);
  const [interviewer, setInterviewer] = React.useState(
    initialValues.interviewer
  );
  const [interviewType, setInterviewType] = React.useState(
    initialValues.interviewType
  );
  const [message, setMessage] = React.useState(initialValues.message);
  const [tempID, setTempID] = React.useState(initialValues.tempID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = interviewSchemaRecord
      ? { ...initialValues, ...interviewSchemaRecord }
      : initialValues;
    setDate(cleanValues.date);
    setTime(cleanValues.time);
    setVenue(cleanValues.venue);
    setInterviewer(cleanValues.interviewer);
    setInterviewType(cleanValues.interviewType);
    setMessage(cleanValues.message);
    setTempID(cleanValues.tempID);
    setErrors({});
  };
  const [interviewSchemaRecord, setInterviewSchemaRecord] = React.useState(
    interviewSchemaModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getInterviewSchema.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getInterviewSchema
        : interviewSchemaModelProp;
      setInterviewSchemaRecord(record);
    };
    queryData();
  }, [idProp, interviewSchemaModelProp]);
  React.useEffect(resetStateValues, [interviewSchemaRecord]);
  const validations = {
    date: [{ type: "Required" }],
    time: [{ type: "Required" }],
    venue: [{ type: "Required" }],
    interviewer: [{ type: "Required" }],
    interviewType: [{ type: "Required" }],
    message: [{ type: "Required" }],
    tempID: [{ type: "Required" }],
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
          interviewer,
          interviewType,
          message,
          tempID,
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
            query: updateInterviewSchema.replaceAll("__typename", ""),
            variables: {
              input: {
                id: interviewSchemaRecord.id,
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
      {...getOverrideProps(overrides, "InterviewSchemaUpdateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              time,
              venue,
              interviewer,
              interviewType,
              message,
              tempID,
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
              interviewer,
              interviewType,
              message,
              tempID,
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
              interviewer,
              interviewType,
              message,
              tempID,
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
              interviewer: value,
              interviewType,
              message,
              tempID,
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
              interviewer,
              interviewType: value,
              message,
              tempID,
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
        label="Message"
        isRequired={true}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              venue,
              interviewer,
              interviewType,
              message: value,
              tempID,
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
              interviewer,
              interviewType,
              message,
              tempID: value,
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
          isDisabled={!(idProp || interviewSchemaModelProp)}
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
              !(idProp || interviewSchemaModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
