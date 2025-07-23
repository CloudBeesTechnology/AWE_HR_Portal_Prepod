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
import { createEmpWorkInfo } from "../graphql/mutations";
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
export default function EmpWorkInfoCreateForm(props) {
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
    contractStart: [],
    contractEnd: [],
    contractPeriod: [],
    doj: "",
    department: [],
    hr: [],
    jobCat: [],
    jobDesc: [],
    manager: [],
    otherJobCat: [],
    otherDepartment: [],
    otherPosition: [],
    probationStart: [],
    probationEnd: [],
    probDuration: [],
    position: [],
    relationship: [],
    supervisor: [],
    skillPool: "",
    salaryType: [],
    sapNo: "",
    upgradeDate: [],
    upgradePosition: [],
    workStatus: [],
    workHrs: [],
    workWeek: [],
    workMonth: [],
    createdBy: [],
    updatedBy: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [contractStart, setContractStart] = React.useState(
    initialValues.contractStart
  );
  const [contractEnd, setContractEnd] = React.useState(
    initialValues.contractEnd
  );
  const [contractPeriod, setContractPeriod] = React.useState(
    initialValues.contractPeriod
  );
  const [doj, setDoj] = React.useState(initialValues.doj);
  const [department, setDepartment] = React.useState(initialValues.department);
  const [hr, setHr] = React.useState(initialValues.hr);
  const [jobCat, setJobCat] = React.useState(initialValues.jobCat);
  const [jobDesc, setJobDesc] = React.useState(initialValues.jobDesc);
  const [manager, setManager] = React.useState(initialValues.manager);
  const [otherJobCat, setOtherJobCat] = React.useState(
    initialValues.otherJobCat
  );
  const [otherDepartment, setOtherDepartment] = React.useState(
    initialValues.otherDepartment
  );
  const [otherPosition, setOtherPosition] = React.useState(
    initialValues.otherPosition
  );
  const [probationStart, setProbationStart] = React.useState(
    initialValues.probationStart
  );
  const [probationEnd, setProbationEnd] = React.useState(
    initialValues.probationEnd
  );
  const [probDuration, setProbDuration] = React.useState(
    initialValues.probDuration
  );
  const [position, setPosition] = React.useState(initialValues.position);
  const [relationship, setRelationship] = React.useState(
    initialValues.relationship
  );
  const [supervisor, setSupervisor] = React.useState(initialValues.supervisor);
  const [skillPool, setSkillPool] = React.useState(initialValues.skillPool);
  const [salaryType, setSalaryType] = React.useState(initialValues.salaryType);
  const [sapNo, setSapNo] = React.useState(initialValues.sapNo);
  const [upgradeDate, setUpgradeDate] = React.useState(
    initialValues.upgradeDate
  );
  const [upgradePosition, setUpgradePosition] = React.useState(
    initialValues.upgradePosition
  );
  const [workStatus, setWorkStatus] = React.useState(initialValues.workStatus);
  const [workHrs, setWorkHrs] = React.useState(initialValues.workHrs);
  const [workWeek, setWorkWeek] = React.useState(initialValues.workWeek);
  const [workMonth, setWorkMonth] = React.useState(initialValues.workMonth);
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [updatedBy, setUpdatedBy] = React.useState(initialValues.updatedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setContractStart(initialValues.contractStart);
    setCurrentContractStartValue("");
    setContractEnd(initialValues.contractEnd);
    setCurrentContractEndValue("");
    setContractPeriod(initialValues.contractPeriod);
    setCurrentContractPeriodValue("");
    setDoj(initialValues.doj);
    setDepartment(initialValues.department);
    setCurrentDepartmentValue("");
    setHr(initialValues.hr);
    setCurrentHrValue("");
    setJobCat(initialValues.jobCat);
    setCurrentJobCatValue("");
    setJobDesc(initialValues.jobDesc);
    setCurrentJobDescValue("");
    setManager(initialValues.manager);
    setCurrentManagerValue("");
    setOtherJobCat(initialValues.otherJobCat);
    setCurrentOtherJobCatValue("");
    setOtherDepartment(initialValues.otherDepartment);
    setCurrentOtherDepartmentValue("");
    setOtherPosition(initialValues.otherPosition);
    setCurrentOtherPositionValue("");
    setProbationStart(initialValues.probationStart);
    setCurrentProbationStartValue("");
    setProbationEnd(initialValues.probationEnd);
    setCurrentProbationEndValue("");
    setProbDuration(initialValues.probDuration);
    setCurrentProbDurationValue("");
    setPosition(initialValues.position);
    setCurrentPositionValue("");
    setRelationship(initialValues.relationship);
    setCurrentRelationshipValue("");
    setSupervisor(initialValues.supervisor);
    setCurrentSupervisorValue("");
    setSkillPool(initialValues.skillPool);
    setSalaryType(initialValues.salaryType);
    setCurrentSalaryTypeValue("");
    setSapNo(initialValues.sapNo);
    setUpgradeDate(initialValues.upgradeDate);
    setCurrentUpgradeDateValue("");
    setUpgradePosition(initialValues.upgradePosition);
    setCurrentUpgradePositionValue("");
    setWorkStatus(initialValues.workStatus);
    setCurrentWorkStatusValue("");
    setWorkHrs(initialValues.workHrs);
    setCurrentWorkHrsValue("");
    setWorkWeek(initialValues.workWeek);
    setCurrentWorkWeekValue("");
    setWorkMonth(initialValues.workMonth);
    setCurrentWorkMonthValue("");
    setCreatedBy(initialValues.createdBy);
    setCurrentCreatedByValue("");
    setUpdatedBy(initialValues.updatedBy);
    setCurrentUpdatedByValue("");
    setErrors({});
  };
  const [currentContractStartValue, setCurrentContractStartValue] =
    React.useState("");
  const contractStartRef = React.createRef();
  const [currentContractEndValue, setCurrentContractEndValue] =
    React.useState("");
  const contractEndRef = React.createRef();
  const [currentContractPeriodValue, setCurrentContractPeriodValue] =
    React.useState("");
  const contractPeriodRef = React.createRef();
  const [currentDepartmentValue, setCurrentDepartmentValue] =
    React.useState("");
  const departmentRef = React.createRef();
  const [currentHrValue, setCurrentHrValue] = React.useState("");
  const hrRef = React.createRef();
  const [currentJobCatValue, setCurrentJobCatValue] = React.useState("");
  const jobCatRef = React.createRef();
  const [currentJobDescValue, setCurrentJobDescValue] = React.useState("");
  const jobDescRef = React.createRef();
  const [currentManagerValue, setCurrentManagerValue] = React.useState("");
  const managerRef = React.createRef();
  const [currentOtherJobCatValue, setCurrentOtherJobCatValue] =
    React.useState("");
  const otherJobCatRef = React.createRef();
  const [currentOtherDepartmentValue, setCurrentOtherDepartmentValue] =
    React.useState("");
  const otherDepartmentRef = React.createRef();
  const [currentOtherPositionValue, setCurrentOtherPositionValue] =
    React.useState("");
  const otherPositionRef = React.createRef();
  const [currentProbationStartValue, setCurrentProbationStartValue] =
    React.useState("");
  const probationStartRef = React.createRef();
  const [currentProbationEndValue, setCurrentProbationEndValue] =
    React.useState("");
  const probationEndRef = React.createRef();
  const [currentProbDurationValue, setCurrentProbDurationValue] =
    React.useState("");
  const probDurationRef = React.createRef();
  const [currentPositionValue, setCurrentPositionValue] = React.useState("");
  const positionRef = React.createRef();
  const [currentRelationshipValue, setCurrentRelationshipValue] =
    React.useState("");
  const relationshipRef = React.createRef();
  const [currentSupervisorValue, setCurrentSupervisorValue] =
    React.useState("");
  const supervisorRef = React.createRef();
  const [currentSalaryTypeValue, setCurrentSalaryTypeValue] =
    React.useState("");
  const salaryTypeRef = React.createRef();
  const [currentUpgradeDateValue, setCurrentUpgradeDateValue] =
    React.useState("");
  const upgradeDateRef = React.createRef();
  const [currentUpgradePositionValue, setCurrentUpgradePositionValue] =
    React.useState("");
  const upgradePositionRef = React.createRef();
  const [currentWorkStatusValue, setCurrentWorkStatusValue] =
    React.useState("");
  const workStatusRef = React.createRef();
  const [currentWorkHrsValue, setCurrentWorkHrsValue] = React.useState("");
  const workHrsRef = React.createRef();
  const [currentWorkWeekValue, setCurrentWorkWeekValue] = React.useState("");
  const workWeekRef = React.createRef();
  const [currentWorkMonthValue, setCurrentWorkMonthValue] = React.useState("");
  const workMonthRef = React.createRef();
  const [currentCreatedByValue, setCurrentCreatedByValue] = React.useState("");
  const createdByRef = React.createRef();
  const [currentUpdatedByValue, setCurrentUpdatedByValue] = React.useState("");
  const updatedByRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    contractStart: [],
    contractEnd: [],
    contractPeriod: [],
    doj: [],
    department: [],
    hr: [],
    jobCat: [],
    jobDesc: [],
    manager: [],
    otherJobCat: [],
    otherDepartment: [],
    otherPosition: [],
    probationStart: [],
    probationEnd: [],
    probDuration: [],
    position: [],
    relationship: [],
    supervisor: [],
    skillPool: [],
    salaryType: [],
    sapNo: [],
    upgradeDate: [],
    upgradePosition: [],
    workStatus: [],
    workHrs: [],
    workWeek: [],
    workMonth: [],
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
          empID,
          contractStart,
          contractEnd,
          contractPeriod,
          doj,
          department,
          hr,
          jobCat,
          jobDesc,
          manager,
          otherJobCat,
          otherDepartment,
          otherPosition,
          probationStart,
          probationEnd,
          probDuration,
          position,
          relationship,
          supervisor,
          skillPool,
          salaryType,
          sapNo,
          upgradeDate,
          upgradePosition,
          workStatus,
          workHrs,
          workWeek,
          workMonth,
          createdBy,
          updatedBy,
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
            query: createEmpWorkInfo.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "EmpWorkInfoCreateForm")}
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
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
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
              empID,
              contractStart: values,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.contractStart ?? values;
          }
          setContractStart(values);
          setCurrentContractStartValue("");
        }}
        currentFieldValue={currentContractStartValue}
        label={"Contract start"}
        items={contractStart}
        hasError={errors?.contractStart?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("contractStart", currentContractStartValue)
        }
        errorMessage={errors?.contractStart?.errorMessage}
        setFieldValue={setCurrentContractStartValue}
        inputFieldRef={contractStartRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Contract start"
          isRequired={false}
          isReadOnly={false}
          value={currentContractStartValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.contractStart?.hasError) {
              runValidationTasks("contractStart", value);
            }
            setCurrentContractStartValue(value);
          }}
          onBlur={() =>
            runValidationTasks("contractStart", currentContractStartValue)
          }
          errorMessage={errors.contractStart?.errorMessage}
          hasError={errors.contractStart?.hasError}
          ref={contractStartRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "contractStart")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd: values,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.contractEnd ?? values;
          }
          setContractEnd(values);
          setCurrentContractEndValue("");
        }}
        currentFieldValue={currentContractEndValue}
        label={"Contract end"}
        items={contractEnd}
        hasError={errors?.contractEnd?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("contractEnd", currentContractEndValue)
        }
        errorMessage={errors?.contractEnd?.errorMessage}
        setFieldValue={setCurrentContractEndValue}
        inputFieldRef={contractEndRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Contract end"
          isRequired={false}
          isReadOnly={false}
          value={currentContractEndValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.contractEnd?.hasError) {
              runValidationTasks("contractEnd", value);
            }
            setCurrentContractEndValue(value);
          }}
          onBlur={() =>
            runValidationTasks("contractEnd", currentContractEndValue)
          }
          errorMessage={errors.contractEnd?.errorMessage}
          hasError={errors.contractEnd?.hasError}
          ref={contractEndRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "contractEnd")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod: values,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.contractPeriod ?? values;
          }
          setContractPeriod(values);
          setCurrentContractPeriodValue("");
        }}
        currentFieldValue={currentContractPeriodValue}
        label={"Contract period"}
        items={contractPeriod}
        hasError={errors?.contractPeriod?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("contractPeriod", currentContractPeriodValue)
        }
        errorMessage={errors?.contractPeriod?.errorMessage}
        setFieldValue={setCurrentContractPeriodValue}
        inputFieldRef={contractPeriodRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Contract period"
          isRequired={false}
          isReadOnly={false}
          value={currentContractPeriodValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.contractPeriod?.hasError) {
              runValidationTasks("contractPeriod", value);
            }
            setCurrentContractPeriodValue(value);
          }}
          onBlur={() =>
            runValidationTasks("contractPeriod", currentContractPeriodValue)
          }
          errorMessage={errors.contractPeriod?.errorMessage}
          hasError={errors.contractPeriod?.hasError}
          ref={contractPeriodRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "contractPeriod")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Doj"
        isRequired={false}
        isReadOnly={false}
        value={doj}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj: value,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.doj ?? value;
          }
          if (errors.doj?.hasError) {
            runValidationTasks("doj", value);
          }
          setDoj(value);
        }}
        onBlur={() => runValidationTasks("doj", doj)}
        errorMessage={errors.doj?.errorMessage}
        hasError={errors.doj?.hasError}
        {...getOverrideProps(overrides, "doj")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department: values,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.department ?? values;
          }
          setDepartment(values);
          setCurrentDepartmentValue("");
        }}
        currentFieldValue={currentDepartmentValue}
        label={"Department"}
        items={department}
        hasError={errors?.department?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("department", currentDepartmentValue)
        }
        errorMessage={errors?.department?.errorMessage}
        setFieldValue={setCurrentDepartmentValue}
        inputFieldRef={departmentRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Department"
          isRequired={false}
          isReadOnly={false}
          value={currentDepartmentValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.department?.hasError) {
              runValidationTasks("department", value);
            }
            setCurrentDepartmentValue(value);
          }}
          onBlur={() =>
            runValidationTasks("department", currentDepartmentValue)
          }
          errorMessage={errors.department?.errorMessage}
          hasError={errors.department?.hasError}
          ref={departmentRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "department")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr: values,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.hr ?? values;
          }
          setHr(values);
          setCurrentHrValue("");
        }}
        currentFieldValue={currentHrValue}
        label={"Hr"}
        items={hr}
        hasError={errors?.hr?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("hr", currentHrValue)
        }
        errorMessage={errors?.hr?.errorMessage}
        setFieldValue={setCurrentHrValue}
        inputFieldRef={hrRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Hr"
          isRequired={false}
          isReadOnly={false}
          value={currentHrValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.hr?.hasError) {
              runValidationTasks("hr", value);
            }
            setCurrentHrValue(value);
          }}
          onBlur={() => runValidationTasks("hr", currentHrValue)}
          errorMessage={errors.hr?.errorMessage}
          hasError={errors.hr?.hasError}
          ref={hrRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "hr")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat: values,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.jobCat ?? values;
          }
          setJobCat(values);
          setCurrentJobCatValue("");
        }}
        currentFieldValue={currentJobCatValue}
        label={"Job cat"}
        items={jobCat}
        hasError={errors?.jobCat?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("jobCat", currentJobCatValue)
        }
        errorMessage={errors?.jobCat?.errorMessage}
        setFieldValue={setCurrentJobCatValue}
        inputFieldRef={jobCatRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Job cat"
          isRequired={false}
          isReadOnly={false}
          value={currentJobCatValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.jobCat?.hasError) {
              runValidationTasks("jobCat", value);
            }
            setCurrentJobCatValue(value);
          }}
          onBlur={() => runValidationTasks("jobCat", currentJobCatValue)}
          errorMessage={errors.jobCat?.errorMessage}
          hasError={errors.jobCat?.hasError}
          ref={jobCatRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "jobCat")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc: values,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.jobDesc ?? values;
          }
          setJobDesc(values);
          setCurrentJobDescValue("");
        }}
        currentFieldValue={currentJobDescValue}
        label={"Job desc"}
        items={jobDesc}
        hasError={errors?.jobDesc?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("jobDesc", currentJobDescValue)
        }
        errorMessage={errors?.jobDesc?.errorMessage}
        setFieldValue={setCurrentJobDescValue}
        inputFieldRef={jobDescRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Job desc"
          isRequired={false}
          isReadOnly={false}
          value={currentJobDescValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.jobDesc?.hasError) {
              runValidationTasks("jobDesc", value);
            }
            setCurrentJobDescValue(value);
          }}
          onBlur={() => runValidationTasks("jobDesc", currentJobDescValue)}
          errorMessage={errors.jobDesc?.errorMessage}
          hasError={errors.jobDesc?.hasError}
          ref={jobDescRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "jobDesc")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager: values,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.manager ?? values;
          }
          setManager(values);
          setCurrentManagerValue("");
        }}
        currentFieldValue={currentManagerValue}
        label={"Manager"}
        items={manager}
        hasError={errors?.manager?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("manager", currentManagerValue)
        }
        errorMessage={errors?.manager?.errorMessage}
        setFieldValue={setCurrentManagerValue}
        inputFieldRef={managerRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Manager"
          isRequired={false}
          isReadOnly={false}
          value={currentManagerValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.manager?.hasError) {
              runValidationTasks("manager", value);
            }
            setCurrentManagerValue(value);
          }}
          onBlur={() => runValidationTasks("manager", currentManagerValue)}
          errorMessage={errors.manager?.errorMessage}
          hasError={errors.manager?.hasError}
          ref={managerRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "manager")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat: values,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.otherJobCat ?? values;
          }
          setOtherJobCat(values);
          setCurrentOtherJobCatValue("");
        }}
        currentFieldValue={currentOtherJobCatValue}
        label={"Other job cat"}
        items={otherJobCat}
        hasError={errors?.otherJobCat?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("otherJobCat", currentOtherJobCatValue)
        }
        errorMessage={errors?.otherJobCat?.errorMessage}
        setFieldValue={setCurrentOtherJobCatValue}
        inputFieldRef={otherJobCatRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Other job cat"
          isRequired={false}
          isReadOnly={false}
          value={currentOtherJobCatValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.otherJobCat?.hasError) {
              runValidationTasks("otherJobCat", value);
            }
            setCurrentOtherJobCatValue(value);
          }}
          onBlur={() =>
            runValidationTasks("otherJobCat", currentOtherJobCatValue)
          }
          errorMessage={errors.otherJobCat?.errorMessage}
          hasError={errors.otherJobCat?.hasError}
          ref={otherJobCatRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "otherJobCat")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment: values,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.otherDepartment ?? values;
          }
          setOtherDepartment(values);
          setCurrentOtherDepartmentValue("");
        }}
        currentFieldValue={currentOtherDepartmentValue}
        label={"Other department"}
        items={otherDepartment}
        hasError={errors?.otherDepartment?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "otherDepartment",
            currentOtherDepartmentValue
          )
        }
        errorMessage={errors?.otherDepartment?.errorMessage}
        setFieldValue={setCurrentOtherDepartmentValue}
        inputFieldRef={otherDepartmentRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Other department"
          isRequired={false}
          isReadOnly={false}
          value={currentOtherDepartmentValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.otherDepartment?.hasError) {
              runValidationTasks("otherDepartment", value);
            }
            setCurrentOtherDepartmentValue(value);
          }}
          onBlur={() =>
            runValidationTasks("otherDepartment", currentOtherDepartmentValue)
          }
          errorMessage={errors.otherDepartment?.errorMessage}
          hasError={errors.otherDepartment?.hasError}
          ref={otherDepartmentRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "otherDepartment")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition: values,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.otherPosition ?? values;
          }
          setOtherPosition(values);
          setCurrentOtherPositionValue("");
        }}
        currentFieldValue={currentOtherPositionValue}
        label={"Other position"}
        items={otherPosition}
        hasError={errors?.otherPosition?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("otherPosition", currentOtherPositionValue)
        }
        errorMessage={errors?.otherPosition?.errorMessage}
        setFieldValue={setCurrentOtherPositionValue}
        inputFieldRef={otherPositionRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Other position"
          isRequired={false}
          isReadOnly={false}
          value={currentOtherPositionValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.otherPosition?.hasError) {
              runValidationTasks("otherPosition", value);
            }
            setCurrentOtherPositionValue(value);
          }}
          onBlur={() =>
            runValidationTasks("otherPosition", currentOtherPositionValue)
          }
          errorMessage={errors.otherPosition?.errorMessage}
          hasError={errors.otherPosition?.hasError}
          ref={otherPositionRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "otherPosition")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart: values,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.probationStart ?? values;
          }
          setProbationStart(values);
          setCurrentProbationStartValue("");
        }}
        currentFieldValue={currentProbationStartValue}
        label={"Probation start"}
        items={probationStart}
        hasError={errors?.probationStart?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("probationStart", currentProbationStartValue)
        }
        errorMessage={errors?.probationStart?.errorMessage}
        setFieldValue={setCurrentProbationStartValue}
        inputFieldRef={probationStartRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Probation start"
          isRequired={false}
          isReadOnly={false}
          value={currentProbationStartValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.probationStart?.hasError) {
              runValidationTasks("probationStart", value);
            }
            setCurrentProbationStartValue(value);
          }}
          onBlur={() =>
            runValidationTasks("probationStart", currentProbationStartValue)
          }
          errorMessage={errors.probationStart?.errorMessage}
          hasError={errors.probationStart?.hasError}
          ref={probationStartRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "probationStart")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd: values,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.probationEnd ?? values;
          }
          setProbationEnd(values);
          setCurrentProbationEndValue("");
        }}
        currentFieldValue={currentProbationEndValue}
        label={"Probation end"}
        items={probationEnd}
        hasError={errors?.probationEnd?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("probationEnd", currentProbationEndValue)
        }
        errorMessage={errors?.probationEnd?.errorMessage}
        setFieldValue={setCurrentProbationEndValue}
        inputFieldRef={probationEndRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Probation end"
          isRequired={false}
          isReadOnly={false}
          value={currentProbationEndValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.probationEnd?.hasError) {
              runValidationTasks("probationEnd", value);
            }
            setCurrentProbationEndValue(value);
          }}
          onBlur={() =>
            runValidationTasks("probationEnd", currentProbationEndValue)
          }
          errorMessage={errors.probationEnd?.errorMessage}
          hasError={errors.probationEnd?.hasError}
          ref={probationEndRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "probationEnd")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration: values,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.probDuration ?? values;
          }
          setProbDuration(values);
          setCurrentProbDurationValue("");
        }}
        currentFieldValue={currentProbDurationValue}
        label={"Prob duration"}
        items={probDuration}
        hasError={errors?.probDuration?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("probDuration", currentProbDurationValue)
        }
        errorMessage={errors?.probDuration?.errorMessage}
        setFieldValue={setCurrentProbDurationValue}
        inputFieldRef={probDurationRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Prob duration"
          isRequired={false}
          isReadOnly={false}
          value={currentProbDurationValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.probDuration?.hasError) {
              runValidationTasks("probDuration", value);
            }
            setCurrentProbDurationValue(value);
          }}
          onBlur={() =>
            runValidationTasks("probDuration", currentProbDurationValue)
          }
          errorMessage={errors.probDuration?.errorMessage}
          hasError={errors.probDuration?.hasError}
          ref={probDurationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "probDuration")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position: values,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.position ?? values;
          }
          setPosition(values);
          setCurrentPositionValue("");
        }}
        currentFieldValue={currentPositionValue}
        label={"Position"}
        items={position}
        hasError={errors?.position?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("position", currentPositionValue)
        }
        errorMessage={errors?.position?.errorMessage}
        setFieldValue={setCurrentPositionValue}
        inputFieldRef={positionRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Position"
          isRequired={false}
          isReadOnly={false}
          value={currentPositionValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.position?.hasError) {
              runValidationTasks("position", value);
            }
            setCurrentPositionValue(value);
          }}
          onBlur={() => runValidationTasks("position", currentPositionValue)}
          errorMessage={errors.position?.errorMessage}
          hasError={errors.position?.hasError}
          ref={positionRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "position")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship: values,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.relationship ?? values;
          }
          setRelationship(values);
          setCurrentRelationshipValue("");
        }}
        currentFieldValue={currentRelationshipValue}
        label={"Relationship"}
        items={relationship}
        hasError={errors?.relationship?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("relationship", currentRelationshipValue)
        }
        errorMessage={errors?.relationship?.errorMessage}
        setFieldValue={setCurrentRelationshipValue}
        inputFieldRef={relationshipRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Relationship"
          isRequired={false}
          isReadOnly={false}
          value={currentRelationshipValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.relationship?.hasError) {
              runValidationTasks("relationship", value);
            }
            setCurrentRelationshipValue(value);
          }}
          onBlur={() =>
            runValidationTasks("relationship", currentRelationshipValue)
          }
          errorMessage={errors.relationship?.errorMessage}
          hasError={errors.relationship?.hasError}
          ref={relationshipRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "relationship")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor: values,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.supervisor ?? values;
          }
          setSupervisor(values);
          setCurrentSupervisorValue("");
        }}
        currentFieldValue={currentSupervisorValue}
        label={"Supervisor"}
        items={supervisor}
        hasError={errors?.supervisor?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("supervisor", currentSupervisorValue)
        }
        errorMessage={errors?.supervisor?.errorMessage}
        setFieldValue={setCurrentSupervisorValue}
        inputFieldRef={supervisorRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Supervisor"
          isRequired={false}
          isReadOnly={false}
          value={currentSupervisorValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.supervisor?.hasError) {
              runValidationTasks("supervisor", value);
            }
            setCurrentSupervisorValue(value);
          }}
          onBlur={() =>
            runValidationTasks("supervisor", currentSupervisorValue)
          }
          errorMessage={errors.supervisor?.errorMessage}
          hasError={errors.supervisor?.hasError}
          ref={supervisorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "supervisor")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Skill pool"
        isRequired={false}
        isReadOnly={false}
        value={skillPool}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool: value,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.skillPool ?? value;
          }
          if (errors.skillPool?.hasError) {
            runValidationTasks("skillPool", value);
          }
          setSkillPool(value);
        }}
        onBlur={() => runValidationTasks("skillPool", skillPool)}
        errorMessage={errors.skillPool?.errorMessage}
        hasError={errors.skillPool?.hasError}
        {...getOverrideProps(overrides, "skillPool")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType: values,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.salaryType ?? values;
          }
          setSalaryType(values);
          setCurrentSalaryTypeValue("");
        }}
        currentFieldValue={currentSalaryTypeValue}
        label={"Salary type"}
        items={salaryType}
        hasError={errors?.salaryType?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("salaryType", currentSalaryTypeValue)
        }
        errorMessage={errors?.salaryType?.errorMessage}
        setFieldValue={setCurrentSalaryTypeValue}
        inputFieldRef={salaryTypeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Salary type"
          isRequired={false}
          isReadOnly={false}
          value={currentSalaryTypeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.salaryType?.hasError) {
              runValidationTasks("salaryType", value);
            }
            setCurrentSalaryTypeValue(value);
          }}
          onBlur={() =>
            runValidationTasks("salaryType", currentSalaryTypeValue)
          }
          errorMessage={errors.salaryType?.errorMessage}
          hasError={errors.salaryType?.hasError}
          ref={salaryTypeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "salaryType")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Sap no"
        isRequired={false}
        isReadOnly={false}
        value={sapNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo: value,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.sapNo ?? value;
          }
          if (errors.sapNo?.hasError) {
            runValidationTasks("sapNo", value);
          }
          setSapNo(value);
        }}
        onBlur={() => runValidationTasks("sapNo", sapNo)}
        errorMessage={errors.sapNo?.errorMessage}
        hasError={errors.sapNo?.hasError}
        {...getOverrideProps(overrides, "sapNo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate: values,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.upgradeDate ?? values;
          }
          setUpgradeDate(values);
          setCurrentUpgradeDateValue("");
        }}
        currentFieldValue={currentUpgradeDateValue}
        label={"Upgrade date"}
        items={upgradeDate}
        hasError={errors?.upgradeDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("upgradeDate", currentUpgradeDateValue)
        }
        errorMessage={errors?.upgradeDate?.errorMessage}
        setFieldValue={setCurrentUpgradeDateValue}
        inputFieldRef={upgradeDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Upgrade date"
          isRequired={false}
          isReadOnly={false}
          value={currentUpgradeDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.upgradeDate?.hasError) {
              runValidationTasks("upgradeDate", value);
            }
            setCurrentUpgradeDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("upgradeDate", currentUpgradeDateValue)
          }
          errorMessage={errors.upgradeDate?.errorMessage}
          hasError={errors.upgradeDate?.hasError}
          ref={upgradeDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "upgradeDate")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition: values,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.upgradePosition ?? values;
          }
          setUpgradePosition(values);
          setCurrentUpgradePositionValue("");
        }}
        currentFieldValue={currentUpgradePositionValue}
        label={"Upgrade position"}
        items={upgradePosition}
        hasError={errors?.upgradePosition?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "upgradePosition",
            currentUpgradePositionValue
          )
        }
        errorMessage={errors?.upgradePosition?.errorMessage}
        setFieldValue={setCurrentUpgradePositionValue}
        inputFieldRef={upgradePositionRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Upgrade position"
          isRequired={false}
          isReadOnly={false}
          value={currentUpgradePositionValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.upgradePosition?.hasError) {
              runValidationTasks("upgradePosition", value);
            }
            setCurrentUpgradePositionValue(value);
          }}
          onBlur={() =>
            runValidationTasks("upgradePosition", currentUpgradePositionValue)
          }
          errorMessage={errors.upgradePosition?.errorMessage}
          hasError={errors.upgradePosition?.hasError}
          ref={upgradePositionRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "upgradePosition")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus: values,
              workHrs,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.workStatus ?? values;
          }
          setWorkStatus(values);
          setCurrentWorkStatusValue("");
        }}
        currentFieldValue={currentWorkStatusValue}
        label={"Work status"}
        items={workStatus}
        hasError={errors?.workStatus?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("workStatus", currentWorkStatusValue)
        }
        errorMessage={errors?.workStatus?.errorMessage}
        setFieldValue={setCurrentWorkStatusValue}
        inputFieldRef={workStatusRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Work status"
          isRequired={false}
          isReadOnly={false}
          value={currentWorkStatusValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.workStatus?.hasError) {
              runValidationTasks("workStatus", value);
            }
            setCurrentWorkStatusValue(value);
          }}
          onBlur={() =>
            runValidationTasks("workStatus", currentWorkStatusValue)
          }
          errorMessage={errors.workStatus?.errorMessage}
          hasError={errors.workStatus?.hasError}
          ref={workStatusRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "workStatus")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs: values,
              workWeek,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.workHrs ?? values;
          }
          setWorkHrs(values);
          setCurrentWorkHrsValue("");
        }}
        currentFieldValue={currentWorkHrsValue}
        label={"Work hrs"}
        items={workHrs}
        hasError={errors?.workHrs?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("workHrs", currentWorkHrsValue)
        }
        errorMessage={errors?.workHrs?.errorMessage}
        setFieldValue={setCurrentWorkHrsValue}
        inputFieldRef={workHrsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Work hrs"
          isRequired={false}
          isReadOnly={false}
          value={currentWorkHrsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.workHrs?.hasError) {
              runValidationTasks("workHrs", value);
            }
            setCurrentWorkHrsValue(value);
          }}
          onBlur={() => runValidationTasks("workHrs", currentWorkHrsValue)}
          errorMessage={errors.workHrs?.errorMessage}
          hasError={errors.workHrs?.hasError}
          ref={workHrsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "workHrs")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek: values,
              workMonth,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.workWeek ?? values;
          }
          setWorkWeek(values);
          setCurrentWorkWeekValue("");
        }}
        currentFieldValue={currentWorkWeekValue}
        label={"Work week"}
        items={workWeek}
        hasError={errors?.workWeek?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("workWeek", currentWorkWeekValue)
        }
        errorMessage={errors?.workWeek?.errorMessage}
        setFieldValue={setCurrentWorkWeekValue}
        inputFieldRef={workWeekRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Work week"
          isRequired={false}
          isReadOnly={false}
          value={currentWorkWeekValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.workWeek?.hasError) {
              runValidationTasks("workWeek", value);
            }
            setCurrentWorkWeekValue(value);
          }}
          onBlur={() => runValidationTasks("workWeek", currentWorkWeekValue)}
          errorMessage={errors.workWeek?.errorMessage}
          hasError={errors.workWeek?.hasError}
          ref={workWeekRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "workWeek")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth: values,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.workMonth ?? values;
          }
          setWorkMonth(values);
          setCurrentWorkMonthValue("");
        }}
        currentFieldValue={currentWorkMonthValue}
        label={"Work month"}
        items={workMonth}
        hasError={errors?.workMonth?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("workMonth", currentWorkMonthValue)
        }
        errorMessage={errors?.workMonth?.errorMessage}
        setFieldValue={setCurrentWorkMonthValue}
        inputFieldRef={workMonthRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Work month"
          isRequired={false}
          isReadOnly={false}
          value={currentWorkMonthValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.workMonth?.hasError) {
              runValidationTasks("workMonth", value);
            }
            setCurrentWorkMonthValue(value);
          }}
          onBlur={() => runValidationTasks("workMonth", currentWorkMonthValue)}
          errorMessage={errors.workMonth?.errorMessage}
          hasError={errors.workMonth?.hasError}
          ref={workMonthRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "workMonth")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
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
              empID,
              contractStart,
              contractEnd,
              contractPeriod,
              doj,
              department,
              hr,
              jobCat,
              jobDesc,
              manager,
              otherJobCat,
              otherDepartment,
              otherPosition,
              probationStart,
              probationEnd,
              probDuration,
              position,
              relationship,
              supervisor,
              skillPool,
              salaryType,
              sapNo,
              upgradeDate,
              upgradePosition,
              workStatus,
              workHrs,
              workWeek,
              workMonth,
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
