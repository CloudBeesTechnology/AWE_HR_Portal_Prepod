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
import { getTicketRequest } from "../graphql/queries";
import { updateTicketRequest } from "../graphql/mutations";
const client = generateClient();
export default function TicketRequestUpdateForm(props) {
  const {
    id: idProp,
    ticketRequest: ticketRequestModelProp,
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
    empStatus: "",
    empDate: "",
    empRemarks: "",
    departureDate: "",
    arrivalDate: "",
    destination: "",
    remarks: "",
    hrStatus: "",
    hrDate: "",
    hrRemarks: "",
    hrName: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [empStatus, setEmpStatus] = React.useState(initialValues.empStatus);
  const [empDate, setEmpDate] = React.useState(initialValues.empDate);
  const [empRemarks, setEmpRemarks] = React.useState(initialValues.empRemarks);
  const [departureDate, setDepartureDate] = React.useState(
    initialValues.departureDate
  );
  const [arrivalDate, setArrivalDate] = React.useState(
    initialValues.arrivalDate
  );
  const [destination, setDestination] = React.useState(
    initialValues.destination
  );
  const [remarks, setRemarks] = React.useState(initialValues.remarks);
  const [hrStatus, setHrStatus] = React.useState(initialValues.hrStatus);
  const [hrDate, setHrDate] = React.useState(initialValues.hrDate);
  const [hrRemarks, setHrRemarks] = React.useState(initialValues.hrRemarks);
  const [hrName, setHrName] = React.useState(initialValues.hrName);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = ticketRequestRecord
      ? { ...initialValues, ...ticketRequestRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setEmpStatus(cleanValues.empStatus);
    setEmpDate(cleanValues.empDate);
    setEmpRemarks(cleanValues.empRemarks);
    setDepartureDate(cleanValues.departureDate);
    setArrivalDate(cleanValues.arrivalDate);
    setDestination(cleanValues.destination);
    setRemarks(cleanValues.remarks);
    setHrStatus(cleanValues.hrStatus);
    setHrDate(cleanValues.hrDate);
    setHrRemarks(cleanValues.hrRemarks);
    setHrName(cleanValues.hrName);
    setErrors({});
  };
  const [ticketRequestRecord, setTicketRequestRecord] = React.useState(
    ticketRequestModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTicketRequest.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTicketRequest
        : ticketRequestModelProp;
      setTicketRequestRecord(record);
    };
    queryData();
  }, [idProp, ticketRequestModelProp]);
  React.useEffect(resetStateValues, [ticketRequestRecord]);
  const validations = {
    empID: [{ type: "Required" }],
    empStatus: [],
    empDate: [],
    empRemarks: [],
    departureDate: [{ type: "Required" }],
    arrivalDate: [{ type: "Required" }],
    destination: [],
    remarks: [],
    hrStatus: [],
    hrDate: [],
    hrRemarks: [],
    hrName: [],
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
          empStatus: empStatus ?? null,
          empDate: empDate ?? null,
          empRemarks: empRemarks ?? null,
          departureDate,
          arrivalDate,
          destination: destination ?? null,
          remarks: remarks ?? null,
          hrStatus: hrStatus ?? null,
          hrDate: hrDate ?? null,
          hrRemarks: hrRemarks ?? null,
          hrName: hrName ?? null,
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
            query: updateTicketRequest.replaceAll("__typename", ""),
            variables: {
              input: {
                id: ticketRequestRecord.id,
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
      {...getOverrideProps(overrides, "TicketRequestUpdateForm")}
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
              empStatus,
              empDate,
              empRemarks,
              departureDate,
              arrivalDate,
              destination,
              remarks,
              hrStatus,
              hrDate,
              hrRemarks,
              hrName,
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
        label="Emp status"
        isRequired={false}
        isReadOnly={false}
        value={empStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              empStatus: value,
              empDate,
              empRemarks,
              departureDate,
              arrivalDate,
              destination,
              remarks,
              hrStatus,
              hrDate,
              hrRemarks,
              hrName,
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
              empStatus,
              empDate: value,
              empRemarks,
              departureDate,
              arrivalDate,
              destination,
              remarks,
              hrStatus,
              hrDate,
              hrRemarks,
              hrName,
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
              empStatus,
              empDate,
              empRemarks: value,
              departureDate,
              arrivalDate,
              destination,
              remarks,
              hrStatus,
              hrDate,
              hrRemarks,
              hrName,
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
        label="Departure date"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={departureDate && convertToLocal(new Date(departureDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              empID,
              empStatus,
              empDate,
              empRemarks,
              departureDate: value,
              arrivalDate,
              destination,
              remarks,
              hrStatus,
              hrDate,
              hrRemarks,
              hrName,
            };
            const result = onChange(modelFields);
            value = result?.departureDate ?? value;
          }
          if (errors.departureDate?.hasError) {
            runValidationTasks("departureDate", value);
          }
          setDepartureDate(value);
        }}
        onBlur={() => runValidationTasks("departureDate", departureDate)}
        errorMessage={errors.departureDate?.errorMessage}
        hasError={errors.departureDate?.hasError}
        {...getOverrideProps(overrides, "departureDate")}
      ></TextField>
      <TextField
        label="Arrival date"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={arrivalDate && convertToLocal(new Date(arrivalDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              empID,
              empStatus,
              empDate,
              empRemarks,
              departureDate,
              arrivalDate: value,
              destination,
              remarks,
              hrStatus,
              hrDate,
              hrRemarks,
              hrName,
            };
            const result = onChange(modelFields);
            value = result?.arrivalDate ?? value;
          }
          if (errors.arrivalDate?.hasError) {
            runValidationTasks("arrivalDate", value);
          }
          setArrivalDate(value);
        }}
        onBlur={() => runValidationTasks("arrivalDate", arrivalDate)}
        errorMessage={errors.arrivalDate?.errorMessage}
        hasError={errors.arrivalDate?.hasError}
        {...getOverrideProps(overrides, "arrivalDate")}
      ></TextField>
      <TextField
        label="Destination"
        isRequired={false}
        isReadOnly={false}
        value={destination}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              empStatus,
              empDate,
              empRemarks,
              departureDate,
              arrivalDate,
              destination: value,
              remarks,
              hrStatus,
              hrDate,
              hrRemarks,
              hrName,
            };
            const result = onChange(modelFields);
            value = result?.destination ?? value;
          }
          if (errors.destination?.hasError) {
            runValidationTasks("destination", value);
          }
          setDestination(value);
        }}
        onBlur={() => runValidationTasks("destination", destination)}
        errorMessage={errors.destination?.errorMessage}
        hasError={errors.destination?.hasError}
        {...getOverrideProps(overrides, "destination")}
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
              empID,
              empStatus,
              empDate,
              empRemarks,
              departureDate,
              arrivalDate,
              destination,
              remarks: value,
              hrStatus,
              hrDate,
              hrRemarks,
              hrName,
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
        label="Hr status"
        isRequired={false}
        isReadOnly={false}
        value={hrStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              empStatus,
              empDate,
              empRemarks,
              departureDate,
              arrivalDate,
              destination,
              remarks,
              hrStatus: value,
              hrDate,
              hrRemarks,
              hrName,
            };
            const result = onChange(modelFields);
            value = result?.hrStatus ?? value;
          }
          if (errors.hrStatus?.hasError) {
            runValidationTasks("hrStatus", value);
          }
          setHrStatus(value);
        }}
        onBlur={() => runValidationTasks("hrStatus", hrStatus)}
        errorMessage={errors.hrStatus?.errorMessage}
        hasError={errors.hrStatus?.hasError}
        {...getOverrideProps(overrides, "hrStatus")}
      ></TextField>
      <TextField
        label="Hr date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={hrDate && convertToLocal(new Date(hrDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              empID,
              empStatus,
              empDate,
              empRemarks,
              departureDate,
              arrivalDate,
              destination,
              remarks,
              hrStatus,
              hrDate: value,
              hrRemarks,
              hrName,
            };
            const result = onChange(modelFields);
            value = result?.hrDate ?? value;
          }
          if (errors.hrDate?.hasError) {
            runValidationTasks("hrDate", value);
          }
          setHrDate(value);
        }}
        onBlur={() => runValidationTasks("hrDate", hrDate)}
        errorMessage={errors.hrDate?.errorMessage}
        hasError={errors.hrDate?.hasError}
        {...getOverrideProps(overrides, "hrDate")}
      ></TextField>
      <TextField
        label="Hr remarks"
        isRequired={false}
        isReadOnly={false}
        value={hrRemarks}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              empStatus,
              empDate,
              empRemarks,
              departureDate,
              arrivalDate,
              destination,
              remarks,
              hrStatus,
              hrDate,
              hrRemarks: value,
              hrName,
            };
            const result = onChange(modelFields);
            value = result?.hrRemarks ?? value;
          }
          if (errors.hrRemarks?.hasError) {
            runValidationTasks("hrRemarks", value);
          }
          setHrRemarks(value);
        }}
        onBlur={() => runValidationTasks("hrRemarks", hrRemarks)}
        errorMessage={errors.hrRemarks?.errorMessage}
        hasError={errors.hrRemarks?.hasError}
        {...getOverrideProps(overrides, "hrRemarks")}
      ></TextField>
      <TextField
        label="Hr name"
        isRequired={false}
        isReadOnly={false}
        value={hrName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              empStatus,
              empDate,
              empRemarks,
              departureDate,
              arrivalDate,
              destination,
              remarks,
              hrStatus,
              hrDate,
              hrRemarks,
              hrName: value,
            };
            const result = onChange(modelFields);
            value = result?.hrName ?? value;
          }
          if (errors.hrName?.hasError) {
            runValidationTasks("hrName", value);
          }
          setHrName(value);
        }}
        onBlur={() => runValidationTasks("hrName", hrName)}
        errorMessage={errors.hrName?.errorMessage}
        hasError={errors.hrName?.hasError}
        {...getOverrideProps(overrides, "hrName")}
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
          isDisabled={!(idProp || ticketRequestModelProp)}
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
              !(idProp || ticketRequestModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
