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
import { getTrainingCertificates } from "../graphql/queries";
import { updateTrainingCertificates } from "../graphql/mutations";
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
export default function TrainingCertificatesUpdateForm(props) {
  const {
    id: idProp,
    trainingCertificates: trainingCertificatesModelProp,
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
    courseCode: [],
    courseName: [],
    company: [],
    certifiExpiry: [],
    eCertifiDate: [],
    trainingUpCertifi: [],
    orgiCertifiDate: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [courseCode, setCourseCode] = React.useState(initialValues.courseCode);
  const [courseName, setCourseName] = React.useState(initialValues.courseName);
  const [company, setCompany] = React.useState(initialValues.company);
  const [certifiExpiry, setCertifiExpiry] = React.useState(
    initialValues.certifiExpiry
  );
  const [eCertifiDate, setECertifiDate] = React.useState(
    initialValues.eCertifiDate
  );
  const [trainingUpCertifi, setTrainingUpCertifi] = React.useState(
    initialValues.trainingUpCertifi
  );
  const [orgiCertifiDate, setOrgiCertifiDate] = React.useState(
    initialValues.orgiCertifiDate
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = trainingCertificatesRecord
      ? { ...initialValues, ...trainingCertificatesRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setCourseCode(cleanValues.courseCode ?? []);
    setCurrentCourseCodeValue("");
    setCourseName(cleanValues.courseName ?? []);
    setCurrentCourseNameValue("");
    setCompany(cleanValues.company ?? []);
    setCurrentCompanyValue("");
    setCertifiExpiry(cleanValues.certifiExpiry ?? []);
    setCurrentCertifiExpiryValue("");
    setECertifiDate(cleanValues.eCertifiDate ?? []);
    setCurrentECertifiDateValue("");
    setTrainingUpCertifi(cleanValues.trainingUpCertifi ?? []);
    setCurrentTrainingUpCertifiValue("");
    setOrgiCertifiDate(cleanValues.orgiCertifiDate ?? []);
    setCurrentOrgiCertifiDateValue("");
    setErrors({});
  };
  const [trainingCertificatesRecord, setTrainingCertificatesRecord] =
    React.useState(trainingCertificatesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTrainingCertificates.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTrainingCertificates
        : trainingCertificatesModelProp;
      setTrainingCertificatesRecord(record);
    };
    queryData();
  }, [idProp, trainingCertificatesModelProp]);
  React.useEffect(resetStateValues, [trainingCertificatesRecord]);
  const [currentCourseCodeValue, setCurrentCourseCodeValue] =
    React.useState("");
  const courseCodeRef = React.createRef();
  const [currentCourseNameValue, setCurrentCourseNameValue] =
    React.useState("");
  const courseNameRef = React.createRef();
  const [currentCompanyValue, setCurrentCompanyValue] = React.useState("");
  const companyRef = React.createRef();
  const [currentCertifiExpiryValue, setCurrentCertifiExpiryValue] =
    React.useState("");
  const certifiExpiryRef = React.createRef();
  const [currentECertifiDateValue, setCurrentECertifiDateValue] =
    React.useState("");
  const eCertifiDateRef = React.createRef();
  const [currentTrainingUpCertifiValue, setCurrentTrainingUpCertifiValue] =
    React.useState("");
  const trainingUpCertifiRef = React.createRef();
  const [currentOrgiCertifiDateValue, setCurrentOrgiCertifiDateValue] =
    React.useState("");
  const orgiCertifiDateRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    courseCode: [],
    courseName: [],
    company: [],
    certifiExpiry: [],
    eCertifiDate: [],
    trainingUpCertifi: [{ type: "JSON" }],
    orgiCertifiDate: [],
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
          courseCode: courseCode ?? null,
          courseName: courseName ?? null,
          company: company ?? null,
          certifiExpiry: certifiExpiry ?? null,
          eCertifiDate: eCertifiDate ?? null,
          trainingUpCertifi: trainingUpCertifi ?? null,
          orgiCertifiDate: orgiCertifiDate ?? null,
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
            query: updateTrainingCertificates.replaceAll("__typename", ""),
            variables: {
              input: {
                id: trainingCertificatesRecord.id,
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
      {...getOverrideProps(overrides, "TrainingCertificatesUpdateForm")}
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
              courseCode,
              courseName,
              company,
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate,
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
              empID,
              courseCode: values,
              courseName,
              company,
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate,
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
              courseCode,
              courseName: values,
              company,
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate,
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
              courseCode,
              courseName,
              company: values,
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              courseCode,
              courseName,
              company,
              certifiExpiry: values,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate,
            };
            const result = onChange(modelFields);
            values = result?.certifiExpiry ?? values;
          }
          setCertifiExpiry(values);
          setCurrentCertifiExpiryValue("");
        }}
        currentFieldValue={currentCertifiExpiryValue}
        label={"Certifi expiry"}
        items={certifiExpiry}
        hasError={errors?.certifiExpiry?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("certifiExpiry", currentCertifiExpiryValue)
        }
        errorMessage={errors?.certifiExpiry?.errorMessage}
        setFieldValue={setCurrentCertifiExpiryValue}
        inputFieldRef={certifiExpiryRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Certifi expiry"
          isRequired={false}
          isReadOnly={false}
          value={currentCertifiExpiryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.certifiExpiry?.hasError) {
              runValidationTasks("certifiExpiry", value);
            }
            setCurrentCertifiExpiryValue(value);
          }}
          onBlur={() =>
            runValidationTasks("certifiExpiry", currentCertifiExpiryValue)
          }
          errorMessage={errors.certifiExpiry?.errorMessage}
          hasError={errors.certifiExpiry?.hasError}
          ref={certifiExpiryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "certifiExpiry")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              courseCode,
              courseName,
              company,
              certifiExpiry,
              eCertifiDate: values,
              trainingUpCertifi,
              orgiCertifiDate,
            };
            const result = onChange(modelFields);
            values = result?.eCertifiDate ?? values;
          }
          setECertifiDate(values);
          setCurrentECertifiDateValue("");
        }}
        currentFieldValue={currentECertifiDateValue}
        label={"E certifi date"}
        items={eCertifiDate}
        hasError={errors?.eCertifiDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("eCertifiDate", currentECertifiDateValue)
        }
        errorMessage={errors?.eCertifiDate?.errorMessage}
        setFieldValue={setCurrentECertifiDateValue}
        inputFieldRef={eCertifiDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="E certifi date"
          isRequired={false}
          isReadOnly={false}
          value={currentECertifiDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.eCertifiDate?.hasError) {
              runValidationTasks("eCertifiDate", value);
            }
            setCurrentECertifiDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("eCertifiDate", currentECertifiDateValue)
          }
          errorMessage={errors.eCertifiDate?.errorMessage}
          hasError={errors.eCertifiDate?.hasError}
          ref={eCertifiDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "eCertifiDate")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              courseCode,
              courseName,
              company,
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi: values,
              orgiCertifiDate,
            };
            const result = onChange(modelFields);
            values = result?.trainingUpCertifi ?? values;
          }
          setTrainingUpCertifi(values);
          setCurrentTrainingUpCertifiValue("");
        }}
        currentFieldValue={currentTrainingUpCertifiValue}
        label={"Training up certifi"}
        items={trainingUpCertifi}
        hasError={errors?.trainingUpCertifi?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "trainingUpCertifi",
            currentTrainingUpCertifiValue
          )
        }
        errorMessage={errors?.trainingUpCertifi?.errorMessage}
        setFieldValue={setCurrentTrainingUpCertifiValue}
        inputFieldRef={trainingUpCertifiRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Training up certifi"
          isRequired={false}
          isReadOnly={false}
          value={currentTrainingUpCertifiValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.trainingUpCertifi?.hasError) {
              runValidationTasks("trainingUpCertifi", value);
            }
            setCurrentTrainingUpCertifiValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "trainingUpCertifi",
              currentTrainingUpCertifiValue
            )
          }
          errorMessage={errors.trainingUpCertifi?.errorMessage}
          hasError={errors.trainingUpCertifi?.hasError}
          ref={trainingUpCertifiRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "trainingUpCertifi")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              courseCode,
              courseName,
              company,
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate: values,
            };
            const result = onChange(modelFields);
            values = result?.orgiCertifiDate ?? values;
          }
          setOrgiCertifiDate(values);
          setCurrentOrgiCertifiDateValue("");
        }}
        currentFieldValue={currentOrgiCertifiDateValue}
        label={"Orgi certifi date"}
        items={orgiCertifiDate}
        hasError={errors?.orgiCertifiDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "orgiCertifiDate",
            currentOrgiCertifiDateValue
          )
        }
        errorMessage={errors?.orgiCertifiDate?.errorMessage}
        setFieldValue={setCurrentOrgiCertifiDateValue}
        inputFieldRef={orgiCertifiDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Orgi certifi date"
          isRequired={false}
          isReadOnly={false}
          value={currentOrgiCertifiDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.orgiCertifiDate?.hasError) {
              runValidationTasks("orgiCertifiDate", value);
            }
            setCurrentOrgiCertifiDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("orgiCertifiDate", currentOrgiCertifiDateValue)
          }
          errorMessage={errors.orgiCertifiDate?.errorMessage}
          hasError={errors.orgiCertifiDate?.hasError}
          ref={orgiCertifiDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "orgiCertifiDate")}
        ></TextField>
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
          isDisabled={!(idProp || trainingCertificatesModelProp)}
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
              !(idProp || trainingCertificatesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
