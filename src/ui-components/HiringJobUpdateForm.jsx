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
import { getHiringJob } from "../graphql/queries";
import { updateHiringJob } from "../graphql/mutations";
const client = generateClient();
export default function HiringJobUpdateForm(props) {
  const {
    id: idProp,
    hiringJob: hiringJobModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    jobTitle: "",
    exper: "",
    location: "",
    quantityPerson: "",
    startDate: "",
    expiryDate: "",
    jobContent: "",
  };
  const [jobTitle, setJobTitle] = React.useState(initialValues.jobTitle);
  const [exper, setExper] = React.useState(initialValues.exper);
  const [location, setLocation] = React.useState(initialValues.location);
  const [quantityPerson, setQuantityPerson] = React.useState(
    initialValues.quantityPerson
  );
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [expiryDate, setExpiryDate] = React.useState(initialValues.expiryDate);
  const [jobContent, setJobContent] = React.useState(initialValues.jobContent);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = hiringJobRecord
      ? { ...initialValues, ...hiringJobRecord }
      : initialValues;
    setJobTitle(cleanValues.jobTitle);
    setExper(cleanValues.exper);
    setLocation(cleanValues.location);
    setQuantityPerson(cleanValues.quantityPerson);
    setStartDate(cleanValues.startDate);
    setExpiryDate(cleanValues.expiryDate);
    setJobContent(cleanValues.jobContent);
    setErrors({});
  };
  const [hiringJobRecord, setHiringJobRecord] =
    React.useState(hiringJobModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getHiringJob.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getHiringJob
        : hiringJobModelProp;
      setHiringJobRecord(record);
    };
    queryData();
  }, [idProp, hiringJobModelProp]);
  React.useEffect(resetStateValues, [hiringJobRecord]);
  const validations = {
    jobTitle: [],
    exper: [],
    location: [],
    quantityPerson: [],
    startDate: [],
    expiryDate: [],
    jobContent: [],
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
          jobTitle: jobTitle ?? null,
          exper: exper ?? null,
          location: location ?? null,
          quantityPerson: quantityPerson ?? null,
          startDate: startDate ?? null,
          expiryDate: expiryDate ?? null,
          jobContent: jobContent ?? null,
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
            query: updateHiringJob.replaceAll("__typename", ""),
            variables: {
              input: {
                id: hiringJobRecord.id,
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
      {...getOverrideProps(overrides, "HiringJobUpdateForm")}
      {...rest}
    >
      <TextField
        label="Job title"
        isRequired={false}
        isReadOnly={false}
        value={jobTitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTitle: value,
              exper,
              location,
              quantityPerson,
              startDate,
              expiryDate,
              jobContent,
            };
            const result = onChange(modelFields);
            value = result?.jobTitle ?? value;
          }
          if (errors.jobTitle?.hasError) {
            runValidationTasks("jobTitle", value);
          }
          setJobTitle(value);
        }}
        onBlur={() => runValidationTasks("jobTitle", jobTitle)}
        errorMessage={errors.jobTitle?.errorMessage}
        hasError={errors.jobTitle?.hasError}
        {...getOverrideProps(overrides, "jobTitle")}
      ></TextField>
      <TextField
        label="Exper"
        isRequired={false}
        isReadOnly={false}
        value={exper}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTitle,
              exper: value,
              location,
              quantityPerson,
              startDate,
              expiryDate,
              jobContent,
            };
            const result = onChange(modelFields);
            value = result?.exper ?? value;
          }
          if (errors.exper?.hasError) {
            runValidationTasks("exper", value);
          }
          setExper(value);
        }}
        onBlur={() => runValidationTasks("exper", exper)}
        errorMessage={errors.exper?.errorMessage}
        hasError={errors.exper?.hasError}
        {...getOverrideProps(overrides, "exper")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTitle,
              exper,
              location: value,
              quantityPerson,
              startDate,
              expiryDate,
              jobContent,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Quantity person"
        isRequired={false}
        isReadOnly={false}
        value={quantityPerson}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTitle,
              exper,
              location,
              quantityPerson: value,
              startDate,
              expiryDate,
              jobContent,
            };
            const result = onChange(modelFields);
            value = result?.quantityPerson ?? value;
          }
          if (errors.quantityPerson?.hasError) {
            runValidationTasks("quantityPerson", value);
          }
          setQuantityPerson(value);
        }}
        onBlur={() => runValidationTasks("quantityPerson", quantityPerson)}
        errorMessage={errors.quantityPerson?.errorMessage}
        hasError={errors.quantityPerson?.hasError}
        {...getOverrideProps(overrides, "quantityPerson")}
      ></TextField>
      <TextField
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        value={startDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTitle,
              exper,
              location,
              quantityPerson,
              startDate: value,
              expiryDate,
              jobContent,
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
        label="Expiry date"
        isRequired={false}
        isReadOnly={false}
        value={expiryDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTitle,
              exper,
              location,
              quantityPerson,
              startDate,
              expiryDate: value,
              jobContent,
            };
            const result = onChange(modelFields);
            value = result?.expiryDate ?? value;
          }
          if (errors.expiryDate?.hasError) {
            runValidationTasks("expiryDate", value);
          }
          setExpiryDate(value);
        }}
        onBlur={() => runValidationTasks("expiryDate", expiryDate)}
        errorMessage={errors.expiryDate?.errorMessage}
        hasError={errors.expiryDate?.hasError}
        {...getOverrideProps(overrides, "expiryDate")}
      ></TextField>
      <TextField
        label="Job content"
        isRequired={false}
        isReadOnly={false}
        value={jobContent}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTitle,
              exper,
              location,
              quantityPerson,
              startDate,
              expiryDate,
              jobContent: value,
            };
            const result = onChange(modelFields);
            value = result?.jobContent ?? value;
          }
          if (errors.jobContent?.hasError) {
            runValidationTasks("jobContent", value);
          }
          setJobContent(value);
        }}
        onBlur={() => runValidationTasks("jobContent", jobContent)}
        errorMessage={errors.jobContent?.errorMessage}
        hasError={errors.jobContent?.hasError}
        {...getOverrideProps(overrides, "jobContent")}
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
          isDisabled={!(idProp || hiringJobModelProp)}
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
              !(idProp || hiringJobModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
