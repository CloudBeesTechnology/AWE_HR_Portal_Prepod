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
  SwitchField,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getTrainingReq } from "../graphql/queries";
import { updateTrainingReq } from "../graphql/mutations";
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
export default function TrainingReqUpdateForm(props) {
  const {
    id: idProp,
    trainingReq: trainingReqModelProp,
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
    MRNo: "",
    medicalName: "",
    medicalExpiry: "",
    medicalAppointDate: "",
    medicalReport: [],
    traineeSD: "",
    traineeED: "",
    traineeStatus: "",
    traineeCourseFee: "",
    courseCode: [],
    courseName: [],
    company: [],
    mediRequired: false,
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [MRNo, setMRNo] = React.useState(initialValues.MRNo);
  const [medicalName, setMedicalName] = React.useState(
    initialValues.medicalName
  );
  const [medicalExpiry, setMedicalExpiry] = React.useState(
    initialValues.medicalExpiry
  );
  const [medicalAppointDate, setMedicalAppointDate] = React.useState(
    initialValues.medicalAppointDate
  );
  const [medicalReport, setMedicalReport] = React.useState(
    initialValues.medicalReport
  );
  const [traineeSD, setTraineeSD] = React.useState(initialValues.traineeSD);
  const [traineeED, setTraineeED] = React.useState(initialValues.traineeED);
  const [traineeStatus, setTraineeStatus] = React.useState(
    initialValues.traineeStatus
  );
  const [traineeCourseFee, setTraineeCourseFee] = React.useState(
    initialValues.traineeCourseFee
  );
  const [courseCode, setCourseCode] = React.useState(initialValues.courseCode);
  const [courseName, setCourseName] = React.useState(initialValues.courseName);
  const [company, setCompany] = React.useState(initialValues.company);
  const [mediRequired, setMediRequired] = React.useState(
    initialValues.mediRequired
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = trainingReqRecord
      ? { ...initialValues, ...trainingReqRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setMRNo(cleanValues.MRNo);
    setMedicalName(cleanValues.medicalName);
    setMedicalExpiry(cleanValues.medicalExpiry);
    setMedicalAppointDate(cleanValues.medicalAppointDate);
    setMedicalReport(cleanValues.medicalReport ?? []);
    setCurrentMedicalReportValue("");
    setTraineeSD(cleanValues.traineeSD);
    setTraineeED(cleanValues.traineeED);
    setTraineeStatus(cleanValues.traineeStatus);
    setTraineeCourseFee(cleanValues.traineeCourseFee);
    setCourseCode(cleanValues.courseCode ?? []);
    setCurrentCourseCodeValue("");
    setCourseName(cleanValues.courseName ?? []);
    setCurrentCourseNameValue("");
    setCompany(cleanValues.company ?? []);
    setCurrentCompanyValue("");
    setMediRequired(cleanValues.mediRequired);
    setErrors({});
  };
  const [trainingReqRecord, setTrainingReqRecord] =
    React.useState(trainingReqModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTrainingReq.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTrainingReq
        : trainingReqModelProp;
      setTrainingReqRecord(record);
    };
    queryData();
  }, [idProp, trainingReqModelProp]);
  React.useEffect(resetStateValues, [trainingReqRecord]);
  const [currentMedicalReportValue, setCurrentMedicalReportValue] =
    React.useState("");
  const medicalReportRef = React.createRef();
  const [currentCourseCodeValue, setCurrentCourseCodeValue] =
    React.useState("");
  const courseCodeRef = React.createRef();
  const [currentCourseNameValue, setCurrentCourseNameValue] =
    React.useState("");
  const courseNameRef = React.createRef();
  const [currentCompanyValue, setCurrentCompanyValue] = React.useState("");
  const companyRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    MRNo: [],
    medicalName: [],
    medicalExpiry: [],
    medicalAppointDate: [],
    medicalReport: [{ type: "JSON" }],
    traineeSD: [],
    traineeED: [],
    traineeStatus: [],
    traineeCourseFee: [],
    courseCode: [],
    courseName: [],
    company: [],
    mediRequired: [],
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
          MRNo: MRNo ?? null,
          medicalName: medicalName ?? null,
          medicalExpiry: medicalExpiry ?? null,
          medicalAppointDate: medicalAppointDate ?? null,
          medicalReport: medicalReport ?? null,
          traineeSD: traineeSD ?? null,
          traineeED: traineeED ?? null,
          traineeStatus: traineeStatus ?? null,
          traineeCourseFee: traineeCourseFee ?? null,
          courseCode: courseCode ?? null,
          courseName: courseName ?? null,
          company: company ?? null,
          mediRequired: mediRequired ?? null,
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
            query: updateTrainingReq.replaceAll("__typename", ""),
            variables: {
              input: {
                id: trainingReqRecord.id,
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
      {...getOverrideProps(overrides, "TrainingReqUpdateForm")}
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
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName,
              company,
              mediRequired,
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
        label="Mr no"
        isRequired={false}
        isReadOnly={false}
        value={MRNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo: value,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            value = result?.MRNo ?? value;
          }
          if (errors.MRNo?.hasError) {
            runValidationTasks("MRNo", value);
          }
          setMRNo(value);
        }}
        onBlur={() => runValidationTasks("MRNo", MRNo)}
        errorMessage={errors.MRNo?.errorMessage}
        hasError={errors.MRNo?.hasError}
        {...getOverrideProps(overrides, "MRNo")}
      ></TextField>
      <TextField
        label="Medical name"
        isRequired={false}
        isReadOnly={false}
        value={medicalName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName: value,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            value = result?.medicalName ?? value;
          }
          if (errors.medicalName?.hasError) {
            runValidationTasks("medicalName", value);
          }
          setMedicalName(value);
        }}
        onBlur={() => runValidationTasks("medicalName", medicalName)}
        errorMessage={errors.medicalName?.errorMessage}
        hasError={errors.medicalName?.hasError}
        {...getOverrideProps(overrides, "medicalName")}
      ></TextField>
      <TextField
        label="Medical expiry"
        isRequired={false}
        isReadOnly={false}
        value={medicalExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry: value,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            value = result?.medicalExpiry ?? value;
          }
          if (errors.medicalExpiry?.hasError) {
            runValidationTasks("medicalExpiry", value);
          }
          setMedicalExpiry(value);
        }}
        onBlur={() => runValidationTasks("medicalExpiry", medicalExpiry)}
        errorMessage={errors.medicalExpiry?.errorMessage}
        hasError={errors.medicalExpiry?.hasError}
        {...getOverrideProps(overrides, "medicalExpiry")}
      ></TextField>
      <TextField
        label="Medical appoint date"
        isRequired={false}
        isReadOnly={false}
        value={medicalAppointDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate: value,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            value = result?.medicalAppointDate ?? value;
          }
          if (errors.medicalAppointDate?.hasError) {
            runValidationTasks("medicalAppointDate", value);
          }
          setMedicalAppointDate(value);
        }}
        onBlur={() =>
          runValidationTasks("medicalAppointDate", medicalAppointDate)
        }
        errorMessage={errors.medicalAppointDate?.errorMessage}
        hasError={errors.medicalAppointDate?.hasError}
        {...getOverrideProps(overrides, "medicalAppointDate")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport: values,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            values = result?.medicalReport ?? values;
          }
          setMedicalReport(values);
          setCurrentMedicalReportValue("");
        }}
        currentFieldValue={currentMedicalReportValue}
        label={"Medical report"}
        items={medicalReport}
        hasError={errors?.medicalReport?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("medicalReport", currentMedicalReportValue)
        }
        errorMessage={errors?.medicalReport?.errorMessage}
        setFieldValue={setCurrentMedicalReportValue}
        inputFieldRef={medicalReportRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Medical report"
          isRequired={false}
          isReadOnly={false}
          value={currentMedicalReportValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.medicalReport?.hasError) {
              runValidationTasks("medicalReport", value);
            }
            setCurrentMedicalReportValue(value);
          }}
          onBlur={() =>
            runValidationTasks("medicalReport", currentMedicalReportValue)
          }
          errorMessage={errors.medicalReport?.errorMessage}
          hasError={errors.medicalReport?.hasError}
          ref={medicalReportRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "medicalReport")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Trainee sd"
        isRequired={false}
        isReadOnly={false}
        value={traineeSD}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD: value,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            value = result?.traineeSD ?? value;
          }
          if (errors.traineeSD?.hasError) {
            runValidationTasks("traineeSD", value);
          }
          setTraineeSD(value);
        }}
        onBlur={() => runValidationTasks("traineeSD", traineeSD)}
        errorMessage={errors.traineeSD?.errorMessage}
        hasError={errors.traineeSD?.hasError}
        {...getOverrideProps(overrides, "traineeSD")}
      ></TextField>
      <TextField
        label="Trainee ed"
        isRequired={false}
        isReadOnly={false}
        value={traineeED}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED: value,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            value = result?.traineeED ?? value;
          }
          if (errors.traineeED?.hasError) {
            runValidationTasks("traineeED", value);
          }
          setTraineeED(value);
        }}
        onBlur={() => runValidationTasks("traineeED", traineeED)}
        errorMessage={errors.traineeED?.errorMessage}
        hasError={errors.traineeED?.hasError}
        {...getOverrideProps(overrides, "traineeED")}
      ></TextField>
      <TextField
        label="Trainee status"
        isRequired={false}
        isReadOnly={false}
        value={traineeStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus: value,
              traineeCourseFee,
              courseCode,
              courseName,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            value = result?.traineeStatus ?? value;
          }
          if (errors.traineeStatus?.hasError) {
            runValidationTasks("traineeStatus", value);
          }
          setTraineeStatus(value);
        }}
        onBlur={() => runValidationTasks("traineeStatus", traineeStatus)}
        errorMessage={errors.traineeStatus?.errorMessage}
        hasError={errors.traineeStatus?.hasError}
        {...getOverrideProps(overrides, "traineeStatus")}
      ></TextField>
      <TextField
        label="Trainee course fee"
        isRequired={false}
        isReadOnly={false}
        value={traineeCourseFee}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee: value,
              courseCode,
              courseName,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            value = result?.traineeCourseFee ?? value;
          }
          if (errors.traineeCourseFee?.hasError) {
            runValidationTasks("traineeCourseFee", value);
          }
          setTraineeCourseFee(value);
        }}
        onBlur={() => runValidationTasks("traineeCourseFee", traineeCourseFee)}
        errorMessage={errors.traineeCourseFee?.errorMessage}
        hasError={errors.traineeCourseFee?.hasError}
        {...getOverrideProps(overrides, "traineeCourseFee")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode: values,
              courseName,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            values = result?.courseCode ?? values;
          }
          setCourseCode(values);
          setCurrentCourseCodeValue("");
        }}
        currentFieldValue={currentCourseCodeValue}
        label={"Course code"}
        items={courseCode}
        hasError={errors?.courseCode?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("courseCode", currentCourseCodeValue)
        }
        errorMessage={errors?.courseCode?.errorMessage}
        setFieldValue={setCurrentCourseCodeValue}
        inputFieldRef={courseCodeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Course code"
          isRequired={false}
          isReadOnly={false}
          value={currentCourseCodeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.courseCode?.hasError) {
              runValidationTasks("courseCode", value);
            }
            setCurrentCourseCodeValue(value);
          }}
          onBlur={() =>
            runValidationTasks("courseCode", currentCourseCodeValue)
          }
          errorMessage={errors.courseCode?.errorMessage}
          hasError={errors.courseCode?.hasError}
          ref={courseCodeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "courseCode")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName: values,
              company,
              mediRequired,
            };
            const result = onChange(modelFields);
            values = result?.courseName ?? values;
          }
          setCourseName(values);
          setCurrentCourseNameValue("");
        }}
        currentFieldValue={currentCourseNameValue}
        label={"Course name"}
        items={courseName}
        hasError={errors?.courseName?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("courseName", currentCourseNameValue)
        }
        errorMessage={errors?.courseName?.errorMessage}
        setFieldValue={setCurrentCourseNameValue}
        inputFieldRef={courseNameRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Course name"
          isRequired={false}
          isReadOnly={false}
          value={currentCourseNameValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.courseName?.hasError) {
              runValidationTasks("courseName", value);
            }
            setCurrentCourseNameValue(value);
          }}
          onBlur={() =>
            runValidationTasks("courseName", currentCourseNameValue)
          }
          errorMessage={errors.courseName?.errorMessage}
          hasError={errors.courseName?.hasError}
          ref={courseNameRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "courseName")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName,
              company: values,
              mediRequired,
            };
            const result = onChange(modelFields);
            values = result?.company ?? values;
          }
          setCompany(values);
          setCurrentCompanyValue("");
        }}
        currentFieldValue={currentCompanyValue}
        label={"Company"}
        items={company}
        hasError={errors?.company?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("company", currentCompanyValue)
        }
        errorMessage={errors?.company?.errorMessage}
        setFieldValue={setCurrentCompanyValue}
        inputFieldRef={companyRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Company"
          isRequired={false}
          isReadOnly={false}
          value={currentCompanyValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.company?.hasError) {
              runValidationTasks("company", value);
            }
            setCurrentCompanyValue(value);
          }}
          onBlur={() => runValidationTasks("company", currentCompanyValue)}
          errorMessage={errors.company?.errorMessage}
          hasError={errors.company?.hasError}
          ref={companyRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "company")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Medi required"
        defaultChecked={false}
        isDisabled={false}
        isChecked={mediRequired}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              empID,
              MRNo,
              medicalName,
              medicalExpiry,
              medicalAppointDate,
              medicalReport,
              traineeSD,
              traineeED,
              traineeStatus,
              traineeCourseFee,
              courseCode,
              courseName,
              company,
              mediRequired: value,
            };
            const result = onChange(modelFields);
            value = result?.mediRequired ?? value;
          }
          if (errors.mediRequired?.hasError) {
            runValidationTasks("mediRequired", value);
          }
          setMediRequired(value);
        }}
        onBlur={() => runValidationTasks("mediRequired", mediRequired)}
        errorMessage={errors.mediRequired?.errorMessage}
        hasError={errors.mediRequired?.hasError}
        {...getOverrideProps(overrides, "mediRequired")}
      ></SwitchField>
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
          isDisabled={!(idProp || trainingReqModelProp)}
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
              !(idProp || trainingReqModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
