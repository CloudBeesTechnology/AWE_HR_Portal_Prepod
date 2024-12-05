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
import { getEmpInsurance } from "../graphql/queries";
import { updateEmpInsurance } from "../graphql/mutations";
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
export default function EmpInsuranceUpdateForm(props) {
  const {
    id: idProp,
    empInsurance: empInsuranceModelProp,
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
    groupIns: [],
    groupInsEffectDate: [],
    groupInsEndDate: [],
    empStatusType: "",
    workmenCompNo: "",
    travelIns: [],
    accidentIns: [],
    empInsUpload: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [groupIns, setGroupIns] = React.useState(initialValues.groupIns);
  const [groupInsEffectDate, setGroupInsEffectDate] = React.useState(
    initialValues.groupInsEffectDate
  );
  const [groupInsEndDate, setGroupInsEndDate] = React.useState(
    initialValues.groupInsEndDate
  );
  const [empStatusType, setEmpStatusType] = React.useState(
    initialValues.empStatusType
  );
  const [workmenCompNo, setWorkmenCompNo] = React.useState(
    initialValues.workmenCompNo
  );
  const [travelIns, setTravelIns] = React.useState(initialValues.travelIns);
  const [accidentIns, setAccidentIns] = React.useState(
    initialValues.accidentIns
  );
  const [empInsUpload, setEmpInsUpload] = React.useState(
    initialValues.empInsUpload
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = empInsuranceRecord
      ? { ...initialValues, ...empInsuranceRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setGroupIns(cleanValues.groupIns ?? []);
    setCurrentGroupInsValue("");
    setGroupInsEffectDate(cleanValues.groupInsEffectDate ?? []);
    setCurrentGroupInsEffectDateValue("");
    setGroupInsEndDate(cleanValues.groupInsEndDate ?? []);
    setCurrentGroupInsEndDateValue("");
    setEmpStatusType(cleanValues.empStatusType);
    setWorkmenCompNo(cleanValues.workmenCompNo);
    setTravelIns(cleanValues.travelIns ?? []);
    setCurrentTravelInsValue("");
    setAccidentIns(cleanValues.accidentIns ?? []);
    setCurrentAccidentInsValue("");
    setEmpInsUpload(cleanValues.empInsUpload ?? []);
    setCurrentEmpInsUploadValue("");
    setErrors({});
  };
  const [empInsuranceRecord, setEmpInsuranceRecord] = React.useState(
    empInsuranceModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getEmpInsurance.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEmpInsurance
        : empInsuranceModelProp;
      setEmpInsuranceRecord(record);
    };
    queryData();
  }, [idProp, empInsuranceModelProp]);
  React.useEffect(resetStateValues, [empInsuranceRecord]);
  const [currentGroupInsValue, setCurrentGroupInsValue] = React.useState("");
  const groupInsRef = React.createRef();
  const [currentGroupInsEffectDateValue, setCurrentGroupInsEffectDateValue] =
    React.useState("");
  const groupInsEffectDateRef = React.createRef();
  const [currentGroupInsEndDateValue, setCurrentGroupInsEndDateValue] =
    React.useState("");
  const groupInsEndDateRef = React.createRef();
  const [currentTravelInsValue, setCurrentTravelInsValue] = React.useState("");
  const travelInsRef = React.createRef();
  const [currentAccidentInsValue, setCurrentAccidentInsValue] =
    React.useState("");
  const accidentInsRef = React.createRef();
  const [currentEmpInsUploadValue, setCurrentEmpInsUploadValue] =
    React.useState("");
  const empInsUploadRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    groupIns: [],
    groupInsEffectDate: [],
    groupInsEndDate: [],
    empStatusType: [],
    workmenCompNo: [],
    travelIns: [],
    accidentIns: [],
    empInsUpload: [{ type: "JSON" }],
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
          groupIns: groupIns ?? null,
          groupInsEffectDate: groupInsEffectDate ?? null,
          groupInsEndDate: groupInsEndDate ?? null,
          empStatusType: empStatusType ?? null,
          workmenCompNo: workmenCompNo ?? null,
          travelIns: travelIns ?? null,
          accidentIns: accidentIns ?? null,
          empInsUpload: empInsUpload ?? null,
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
            query: updateEmpInsurance.replaceAll("__typename", ""),
            variables: {
              input: {
                id: empInsuranceRecord.id,
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
      {...getOverrideProps(overrides, "EmpInsuranceUpdateForm")}
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
              groupIns,
              groupInsEffectDate,
              groupInsEndDate,
              empStatusType,
              workmenCompNo,
              travelIns,
              accidentIns,
              empInsUpload,
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
              groupIns: values,
              groupInsEffectDate,
              groupInsEndDate,
              empStatusType,
              workmenCompNo,
              travelIns,
              accidentIns,
              empInsUpload,
            };
            const result = onChange(modelFields);
            values = result?.groupIns ?? values;
          }
          setGroupIns(values);
          setCurrentGroupInsValue("");
        }}
        currentFieldValue={currentGroupInsValue}
        label={"Group ins"}
        items={groupIns}
        hasError={errors?.groupIns?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("groupIns", currentGroupInsValue)
        }
        errorMessage={errors?.groupIns?.errorMessage}
        setFieldValue={setCurrentGroupInsValue}
        inputFieldRef={groupInsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Group ins"
          isRequired={false}
          isReadOnly={false}
          value={currentGroupInsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.groupIns?.hasError) {
              runValidationTasks("groupIns", value);
            }
            setCurrentGroupInsValue(value);
          }}
          onBlur={() => runValidationTasks("groupIns", currentGroupInsValue)}
          errorMessage={errors.groupIns?.errorMessage}
          hasError={errors.groupIns?.hasError}
          ref={groupInsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "groupIns")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              groupIns,
              groupInsEffectDate: values,
              groupInsEndDate,
              empStatusType,
              workmenCompNo,
              travelIns,
              accidentIns,
              empInsUpload,
            };
            const result = onChange(modelFields);
            values = result?.groupInsEffectDate ?? values;
          }
          setGroupInsEffectDate(values);
          setCurrentGroupInsEffectDateValue("");
        }}
        currentFieldValue={currentGroupInsEffectDateValue}
        label={"Group ins effect date"}
        items={groupInsEffectDate}
        hasError={errors?.groupInsEffectDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "groupInsEffectDate",
            currentGroupInsEffectDateValue
          )
        }
        errorMessage={errors?.groupInsEffectDate?.errorMessage}
        setFieldValue={setCurrentGroupInsEffectDateValue}
        inputFieldRef={groupInsEffectDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Group ins effect date"
          isRequired={false}
          isReadOnly={false}
          value={currentGroupInsEffectDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.groupInsEffectDate?.hasError) {
              runValidationTasks("groupInsEffectDate", value);
            }
            setCurrentGroupInsEffectDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "groupInsEffectDate",
              currentGroupInsEffectDateValue
            )
          }
          errorMessage={errors.groupInsEffectDate?.errorMessage}
          hasError={errors.groupInsEffectDate?.hasError}
          ref={groupInsEffectDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "groupInsEffectDate")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              groupIns,
              groupInsEffectDate,
              groupInsEndDate: values,
              empStatusType,
              workmenCompNo,
              travelIns,
              accidentIns,
              empInsUpload,
            };
            const result = onChange(modelFields);
            values = result?.groupInsEndDate ?? values;
          }
          setGroupInsEndDate(values);
          setCurrentGroupInsEndDateValue("");
        }}
        currentFieldValue={currentGroupInsEndDateValue}
        label={"Group ins end date"}
        items={groupInsEndDate}
        hasError={errors?.groupInsEndDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "groupInsEndDate",
            currentGroupInsEndDateValue
          )
        }
        errorMessage={errors?.groupInsEndDate?.errorMessage}
        setFieldValue={setCurrentGroupInsEndDateValue}
        inputFieldRef={groupInsEndDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Group ins end date"
          isRequired={false}
          isReadOnly={false}
          value={currentGroupInsEndDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.groupInsEndDate?.hasError) {
              runValidationTasks("groupInsEndDate", value);
            }
            setCurrentGroupInsEndDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("groupInsEndDate", currentGroupInsEndDateValue)
          }
          errorMessage={errors.groupInsEndDate?.errorMessage}
          hasError={errors.groupInsEndDate?.hasError}
          ref={groupInsEndDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "groupInsEndDate")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Emp status type"
        isRequired={false}
        isReadOnly={false}
        value={empStatusType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              groupIns,
              groupInsEffectDate,
              groupInsEndDate,
              empStatusType: value,
              workmenCompNo,
              travelIns,
              accidentIns,
              empInsUpload,
            };
            const result = onChange(modelFields);
            value = result?.empStatusType ?? value;
          }
          if (errors.empStatusType?.hasError) {
            runValidationTasks("empStatusType", value);
          }
          setEmpStatusType(value);
        }}
        onBlur={() => runValidationTasks("empStatusType", empStatusType)}
        errorMessage={errors.empStatusType?.errorMessage}
        hasError={errors.empStatusType?.hasError}
        {...getOverrideProps(overrides, "empStatusType")}
      ></TextField>
      <TextField
        label="Workmen comp no"
        isRequired={false}
        isReadOnly={false}
        value={workmenCompNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              groupIns,
              groupInsEffectDate,
              groupInsEndDate,
              empStatusType,
              workmenCompNo: value,
              travelIns,
              accidentIns,
              empInsUpload,
            };
            const result = onChange(modelFields);
            value = result?.workmenCompNo ?? value;
          }
          if (errors.workmenCompNo?.hasError) {
            runValidationTasks("workmenCompNo", value);
          }
          setWorkmenCompNo(value);
        }}
        onBlur={() => runValidationTasks("workmenCompNo", workmenCompNo)}
        errorMessage={errors.workmenCompNo?.errorMessage}
        hasError={errors.workmenCompNo?.hasError}
        {...getOverrideProps(overrides, "workmenCompNo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              groupIns,
              groupInsEffectDate,
              groupInsEndDate,
              empStatusType,
              workmenCompNo,
              travelIns: values,
              accidentIns,
              empInsUpload,
            };
            const result = onChange(modelFields);
            values = result?.travelIns ?? values;
          }
          setTravelIns(values);
          setCurrentTravelInsValue("");
        }}
        currentFieldValue={currentTravelInsValue}
        label={"Travel ins"}
        items={travelIns}
        hasError={errors?.travelIns?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("travelIns", currentTravelInsValue)
        }
        errorMessage={errors?.travelIns?.errorMessage}
        setFieldValue={setCurrentTravelInsValue}
        inputFieldRef={travelInsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Travel ins"
          isRequired={false}
          isReadOnly={false}
          value={currentTravelInsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.travelIns?.hasError) {
              runValidationTasks("travelIns", value);
            }
            setCurrentTravelInsValue(value);
          }}
          onBlur={() => runValidationTasks("travelIns", currentTravelInsValue)}
          errorMessage={errors.travelIns?.errorMessage}
          hasError={errors.travelIns?.hasError}
          ref={travelInsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "travelIns")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              groupIns,
              groupInsEffectDate,
              groupInsEndDate,
              empStatusType,
              workmenCompNo,
              travelIns,
              accidentIns: values,
              empInsUpload,
            };
            const result = onChange(modelFields);
            values = result?.accidentIns ?? values;
          }
          setAccidentIns(values);
          setCurrentAccidentInsValue("");
        }}
        currentFieldValue={currentAccidentInsValue}
        label={"Accident ins"}
        items={accidentIns}
        hasError={errors?.accidentIns?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("accidentIns", currentAccidentInsValue)
        }
        errorMessage={errors?.accidentIns?.errorMessage}
        setFieldValue={setCurrentAccidentInsValue}
        inputFieldRef={accidentInsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Accident ins"
          isRequired={false}
          isReadOnly={false}
          value={currentAccidentInsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.accidentIns?.hasError) {
              runValidationTasks("accidentIns", value);
            }
            setCurrentAccidentInsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("accidentIns", currentAccidentInsValue)
          }
          errorMessage={errors.accidentIns?.errorMessage}
          hasError={errors.accidentIns?.hasError}
          ref={accidentInsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "accidentIns")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              groupIns,
              groupInsEffectDate,
              groupInsEndDate,
              empStatusType,
              workmenCompNo,
              travelIns,
              accidentIns,
              empInsUpload: values,
            };
            const result = onChange(modelFields);
            values = result?.empInsUpload ?? values;
          }
          setEmpInsUpload(values);
          setCurrentEmpInsUploadValue("");
        }}
        currentFieldValue={currentEmpInsUploadValue}
        label={"Emp ins upload"}
        items={empInsUpload}
        hasError={errors?.empInsUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("empInsUpload", currentEmpInsUploadValue)
        }
        errorMessage={errors?.empInsUpload?.errorMessage}
        setFieldValue={setCurrentEmpInsUploadValue}
        inputFieldRef={empInsUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Emp ins upload"
          isRequired={false}
          isReadOnly={false}
          value={currentEmpInsUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.empInsUpload?.hasError) {
              runValidationTasks("empInsUpload", value);
            }
            setCurrentEmpInsUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("empInsUpload", currentEmpInsUploadValue)
          }
          errorMessage={errors.empInsUpload?.errorMessage}
          hasError={errors.empInsUpload?.hasError}
          ref={empInsUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "empInsUpload")}
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
          isDisabled={!(idProp || empInsuranceModelProp)}
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
              !(idProp || empInsuranceModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
