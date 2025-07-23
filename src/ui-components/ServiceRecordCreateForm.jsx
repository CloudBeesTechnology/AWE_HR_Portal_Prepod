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
import { createServiceRecord } from "../graphql/mutations";
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
export default function ServiceRecordCreateForm(props) {
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
    depEmpDate: [],
    depEmp: [],
    positionRev: [],
    positionRevDate: [],
    revSalary: [],
    revSalaryDate: [],
    revLeavePass: [],
    revLeaveDate: [],
    revAnnualLeave: [],
    revALD: [],
    remarkWI: "",
    uploadPR: [],
    uploadSP: [],
    uploadLP: [],
    uploadAL: [],
    uploadDep: [],
    createdBy: [],
    updatedBy: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [depEmpDate, setDepEmpDate] = React.useState(initialValues.depEmpDate);
  const [depEmp, setDepEmp] = React.useState(initialValues.depEmp);
  const [positionRev, setPositionRev] = React.useState(
    initialValues.positionRev
  );
  const [positionRevDate, setPositionRevDate] = React.useState(
    initialValues.positionRevDate
  );
  const [revSalary, setRevSalary] = React.useState(initialValues.revSalary);
  const [revSalaryDate, setRevSalaryDate] = React.useState(
    initialValues.revSalaryDate
  );
  const [revLeavePass, setRevLeavePass] = React.useState(
    initialValues.revLeavePass
  );
  const [revLeaveDate, setRevLeaveDate] = React.useState(
    initialValues.revLeaveDate
  );
  const [revAnnualLeave, setRevAnnualLeave] = React.useState(
    initialValues.revAnnualLeave
  );
  const [revALD, setRevALD] = React.useState(initialValues.revALD);
  const [remarkWI, setRemarkWI] = React.useState(initialValues.remarkWI);
  const [uploadPR, setUploadPR] = React.useState(initialValues.uploadPR);
  const [uploadSP, setUploadSP] = React.useState(initialValues.uploadSP);
  const [uploadLP, setUploadLP] = React.useState(initialValues.uploadLP);
  const [uploadAL, setUploadAL] = React.useState(initialValues.uploadAL);
  const [uploadDep, setUploadDep] = React.useState(initialValues.uploadDep);
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [updatedBy, setUpdatedBy] = React.useState(initialValues.updatedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setDepEmpDate(initialValues.depEmpDate);
    setCurrentDepEmpDateValue("");
    setDepEmp(initialValues.depEmp);
    setCurrentDepEmpValue("");
    setPositionRev(initialValues.positionRev);
    setCurrentPositionRevValue("");
    setPositionRevDate(initialValues.positionRevDate);
    setCurrentPositionRevDateValue("");
    setRevSalary(initialValues.revSalary);
    setCurrentRevSalaryValue("");
    setRevSalaryDate(initialValues.revSalaryDate);
    setCurrentRevSalaryDateValue("");
    setRevLeavePass(initialValues.revLeavePass);
    setCurrentRevLeavePassValue("");
    setRevLeaveDate(initialValues.revLeaveDate);
    setCurrentRevLeaveDateValue("");
    setRevAnnualLeave(initialValues.revAnnualLeave);
    setCurrentRevAnnualLeaveValue("");
    setRevALD(initialValues.revALD);
    setCurrentRevALDValue("");
    setRemarkWI(initialValues.remarkWI);
    setUploadPR(initialValues.uploadPR);
    setCurrentUploadPRValue("");
    setUploadSP(initialValues.uploadSP);
    setCurrentUploadSPValue("");
    setUploadLP(initialValues.uploadLP);
    setCurrentUploadLPValue("");
    setUploadAL(initialValues.uploadAL);
    setCurrentUploadALValue("");
    setUploadDep(initialValues.uploadDep);
    setCurrentUploadDepValue("");
    setCreatedBy(initialValues.createdBy);
    setCurrentCreatedByValue("");
    setUpdatedBy(initialValues.updatedBy);
    setCurrentUpdatedByValue("");
    setErrors({});
  };
  const [currentDepEmpDateValue, setCurrentDepEmpDateValue] =
    React.useState("");
  const depEmpDateRef = React.createRef();
  const [currentDepEmpValue, setCurrentDepEmpValue] = React.useState("");
  const depEmpRef = React.createRef();
  const [currentPositionRevValue, setCurrentPositionRevValue] =
    React.useState("");
  const positionRevRef = React.createRef();
  const [currentPositionRevDateValue, setCurrentPositionRevDateValue] =
    React.useState("");
  const positionRevDateRef = React.createRef();
  const [currentRevSalaryValue, setCurrentRevSalaryValue] = React.useState("");
  const revSalaryRef = React.createRef();
  const [currentRevSalaryDateValue, setCurrentRevSalaryDateValue] =
    React.useState("");
  const revSalaryDateRef = React.createRef();
  const [currentRevLeavePassValue, setCurrentRevLeavePassValue] =
    React.useState("");
  const revLeavePassRef = React.createRef();
  const [currentRevLeaveDateValue, setCurrentRevLeaveDateValue] =
    React.useState("");
  const revLeaveDateRef = React.createRef();
  const [currentRevAnnualLeaveValue, setCurrentRevAnnualLeaveValue] =
    React.useState("");
  const revAnnualLeaveRef = React.createRef();
  const [currentRevALDValue, setCurrentRevALDValue] = React.useState("");
  const revALDRef = React.createRef();
  const [currentUploadPRValue, setCurrentUploadPRValue] = React.useState("");
  const uploadPRRef = React.createRef();
  const [currentUploadSPValue, setCurrentUploadSPValue] = React.useState("");
  const uploadSPRef = React.createRef();
  const [currentUploadLPValue, setCurrentUploadLPValue] = React.useState("");
  const uploadLPRef = React.createRef();
  const [currentUploadALValue, setCurrentUploadALValue] = React.useState("");
  const uploadALRef = React.createRef();
  const [currentUploadDepValue, setCurrentUploadDepValue] = React.useState("");
  const uploadDepRef = React.createRef();
  const [currentCreatedByValue, setCurrentCreatedByValue] = React.useState("");
  const createdByRef = React.createRef();
  const [currentUpdatedByValue, setCurrentUpdatedByValue] = React.useState("");
  const updatedByRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    depEmpDate: [],
    depEmp: [],
    positionRev: [],
    positionRevDate: [],
    revSalary: [],
    revSalaryDate: [],
    revLeavePass: [],
    revLeaveDate: [],
    revAnnualLeave: [],
    revALD: [],
    remarkWI: [],
    uploadPR: [{ type: "JSON" }],
    uploadSP: [{ type: "JSON" }],
    uploadLP: [{ type: "JSON" }],
    uploadAL: [{ type: "JSON" }],
    uploadDep: [{ type: "JSON" }],
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
          depEmpDate,
          depEmp,
          positionRev,
          positionRevDate,
          revSalary,
          revSalaryDate,
          revLeavePass,
          revLeaveDate,
          revAnnualLeave,
          revALD,
          remarkWI,
          uploadPR,
          uploadSP,
          uploadLP,
          uploadAL,
          uploadDep,
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
            query: createServiceRecord.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ServiceRecordCreateForm")}
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
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
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
              depEmpDate: values,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.depEmpDate ?? values;
          }
          setDepEmpDate(values);
          setCurrentDepEmpDateValue("");
        }}
        currentFieldValue={currentDepEmpDateValue}
        label={"Dep emp date"}
        items={depEmpDate}
        hasError={errors?.depEmpDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("depEmpDate", currentDepEmpDateValue)
        }
        errorMessage={errors?.depEmpDate?.errorMessage}
        setFieldValue={setCurrentDepEmpDateValue}
        inputFieldRef={depEmpDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Dep emp date"
          isRequired={false}
          isReadOnly={false}
          value={currentDepEmpDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.depEmpDate?.hasError) {
              runValidationTasks("depEmpDate", value);
            }
            setCurrentDepEmpDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("depEmpDate", currentDepEmpDateValue)
          }
          errorMessage={errors.depEmpDate?.errorMessage}
          hasError={errors.depEmpDate?.hasError}
          ref={depEmpDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "depEmpDate")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp: values,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.depEmp ?? values;
          }
          setDepEmp(values);
          setCurrentDepEmpValue("");
        }}
        currentFieldValue={currentDepEmpValue}
        label={"Dep emp"}
        items={depEmp}
        hasError={errors?.depEmp?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("depEmp", currentDepEmpValue)
        }
        errorMessage={errors?.depEmp?.errorMessage}
        setFieldValue={setCurrentDepEmpValue}
        inputFieldRef={depEmpRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Dep emp"
          isRequired={false}
          isReadOnly={false}
          value={currentDepEmpValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.depEmp?.hasError) {
              runValidationTasks("depEmp", value);
            }
            setCurrentDepEmpValue(value);
          }}
          onBlur={() => runValidationTasks("depEmp", currentDepEmpValue)}
          errorMessage={errors.depEmp?.errorMessage}
          hasError={errors.depEmp?.hasError}
          ref={depEmpRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "depEmp")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev: values,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.positionRev ?? values;
          }
          setPositionRev(values);
          setCurrentPositionRevValue("");
        }}
        currentFieldValue={currentPositionRevValue}
        label={"Position rev"}
        items={positionRev}
        hasError={errors?.positionRev?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("positionRev", currentPositionRevValue)
        }
        errorMessage={errors?.positionRev?.errorMessage}
        setFieldValue={setCurrentPositionRevValue}
        inputFieldRef={positionRevRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Position rev"
          isRequired={false}
          isReadOnly={false}
          value={currentPositionRevValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.positionRev?.hasError) {
              runValidationTasks("positionRev", value);
            }
            setCurrentPositionRevValue(value);
          }}
          onBlur={() =>
            runValidationTasks("positionRev", currentPositionRevValue)
          }
          errorMessage={errors.positionRev?.errorMessage}
          hasError={errors.positionRev?.hasError}
          ref={positionRevRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "positionRev")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate: values,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.positionRevDate ?? values;
          }
          setPositionRevDate(values);
          setCurrentPositionRevDateValue("");
        }}
        currentFieldValue={currentPositionRevDateValue}
        label={"Position rev date"}
        items={positionRevDate}
        hasError={errors?.positionRevDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "positionRevDate",
            currentPositionRevDateValue
          )
        }
        errorMessage={errors?.positionRevDate?.errorMessage}
        setFieldValue={setCurrentPositionRevDateValue}
        inputFieldRef={positionRevDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Position rev date"
          isRequired={false}
          isReadOnly={false}
          value={currentPositionRevDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.positionRevDate?.hasError) {
              runValidationTasks("positionRevDate", value);
            }
            setCurrentPositionRevDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("positionRevDate", currentPositionRevDateValue)
          }
          errorMessage={errors.positionRevDate?.errorMessage}
          hasError={errors.positionRevDate?.hasError}
          ref={positionRevDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "positionRevDate")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary: values,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.revSalary ?? values;
          }
          setRevSalary(values);
          setCurrentRevSalaryValue("");
        }}
        currentFieldValue={currentRevSalaryValue}
        label={"Rev salary"}
        items={revSalary}
        hasError={errors?.revSalary?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("revSalary", currentRevSalaryValue)
        }
        errorMessage={errors?.revSalary?.errorMessage}
        setFieldValue={setCurrentRevSalaryValue}
        inputFieldRef={revSalaryRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Rev salary"
          isRequired={false}
          isReadOnly={false}
          value={currentRevSalaryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.revSalary?.hasError) {
              runValidationTasks("revSalary", value);
            }
            setCurrentRevSalaryValue(value);
          }}
          onBlur={() => runValidationTasks("revSalary", currentRevSalaryValue)}
          errorMessage={errors.revSalary?.errorMessage}
          hasError={errors.revSalary?.hasError}
          ref={revSalaryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "revSalary")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate: values,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.revSalaryDate ?? values;
          }
          setRevSalaryDate(values);
          setCurrentRevSalaryDateValue("");
        }}
        currentFieldValue={currentRevSalaryDateValue}
        label={"Rev salary date"}
        items={revSalaryDate}
        hasError={errors?.revSalaryDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("revSalaryDate", currentRevSalaryDateValue)
        }
        errorMessage={errors?.revSalaryDate?.errorMessage}
        setFieldValue={setCurrentRevSalaryDateValue}
        inputFieldRef={revSalaryDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Rev salary date"
          isRequired={false}
          isReadOnly={false}
          value={currentRevSalaryDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.revSalaryDate?.hasError) {
              runValidationTasks("revSalaryDate", value);
            }
            setCurrentRevSalaryDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("revSalaryDate", currentRevSalaryDateValue)
          }
          errorMessage={errors.revSalaryDate?.errorMessage}
          hasError={errors.revSalaryDate?.hasError}
          ref={revSalaryDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "revSalaryDate")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass: values,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.revLeavePass ?? values;
          }
          setRevLeavePass(values);
          setCurrentRevLeavePassValue("");
        }}
        currentFieldValue={currentRevLeavePassValue}
        label={"Rev leave pass"}
        items={revLeavePass}
        hasError={errors?.revLeavePass?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("revLeavePass", currentRevLeavePassValue)
        }
        errorMessage={errors?.revLeavePass?.errorMessage}
        setFieldValue={setCurrentRevLeavePassValue}
        inputFieldRef={revLeavePassRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Rev leave pass"
          isRequired={false}
          isReadOnly={false}
          value={currentRevLeavePassValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.revLeavePass?.hasError) {
              runValidationTasks("revLeavePass", value);
            }
            setCurrentRevLeavePassValue(value);
          }}
          onBlur={() =>
            runValidationTasks("revLeavePass", currentRevLeavePassValue)
          }
          errorMessage={errors.revLeavePass?.errorMessage}
          hasError={errors.revLeavePass?.hasError}
          ref={revLeavePassRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "revLeavePass")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate: values,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.revLeaveDate ?? values;
          }
          setRevLeaveDate(values);
          setCurrentRevLeaveDateValue("");
        }}
        currentFieldValue={currentRevLeaveDateValue}
        label={"Rev leave date"}
        items={revLeaveDate}
        hasError={errors?.revLeaveDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("revLeaveDate", currentRevLeaveDateValue)
        }
        errorMessage={errors?.revLeaveDate?.errorMessage}
        setFieldValue={setCurrentRevLeaveDateValue}
        inputFieldRef={revLeaveDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Rev leave date"
          isRequired={false}
          isReadOnly={false}
          value={currentRevLeaveDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.revLeaveDate?.hasError) {
              runValidationTasks("revLeaveDate", value);
            }
            setCurrentRevLeaveDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("revLeaveDate", currentRevLeaveDateValue)
          }
          errorMessage={errors.revLeaveDate?.errorMessage}
          hasError={errors.revLeaveDate?.hasError}
          ref={revLeaveDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "revLeaveDate")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave: values,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.revAnnualLeave ?? values;
          }
          setRevAnnualLeave(values);
          setCurrentRevAnnualLeaveValue("");
        }}
        currentFieldValue={currentRevAnnualLeaveValue}
        label={"Rev annual leave"}
        items={revAnnualLeave}
        hasError={errors?.revAnnualLeave?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("revAnnualLeave", currentRevAnnualLeaveValue)
        }
        errorMessage={errors?.revAnnualLeave?.errorMessage}
        setFieldValue={setCurrentRevAnnualLeaveValue}
        inputFieldRef={revAnnualLeaveRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Rev annual leave"
          isRequired={false}
          isReadOnly={false}
          value={currentRevAnnualLeaveValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.revAnnualLeave?.hasError) {
              runValidationTasks("revAnnualLeave", value);
            }
            setCurrentRevAnnualLeaveValue(value);
          }}
          onBlur={() =>
            runValidationTasks("revAnnualLeave", currentRevAnnualLeaveValue)
          }
          errorMessage={errors.revAnnualLeave?.errorMessage}
          hasError={errors.revAnnualLeave?.hasError}
          ref={revAnnualLeaveRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "revAnnualLeave")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD: values,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.revALD ?? values;
          }
          setRevALD(values);
          setCurrentRevALDValue("");
        }}
        currentFieldValue={currentRevALDValue}
        label={"Rev ald"}
        items={revALD}
        hasError={errors?.revALD?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("revALD", currentRevALDValue)
        }
        errorMessage={errors?.revALD?.errorMessage}
        setFieldValue={setCurrentRevALDValue}
        inputFieldRef={revALDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Rev ald"
          isRequired={false}
          isReadOnly={false}
          value={currentRevALDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.revALD?.hasError) {
              runValidationTasks("revALD", value);
            }
            setCurrentRevALDValue(value);
          }}
          onBlur={() => runValidationTasks("revALD", currentRevALDValue)}
          errorMessage={errors.revALD?.errorMessage}
          hasError={errors.revALD?.hasError}
          ref={revALDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "revALD")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Remark wi"
        isRequired={false}
        isReadOnly={false}
        value={remarkWI}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI: value,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.remarkWI ?? value;
          }
          if (errors.remarkWI?.hasError) {
            runValidationTasks("remarkWI", value);
          }
          setRemarkWI(value);
        }}
        onBlur={() => runValidationTasks("remarkWI", remarkWI)}
        errorMessage={errors.remarkWI?.errorMessage}
        hasError={errors.remarkWI?.hasError}
        {...getOverrideProps(overrides, "remarkWI")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR: values,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.uploadPR ?? values;
          }
          setUploadPR(values);
          setCurrentUploadPRValue("");
        }}
        currentFieldValue={currentUploadPRValue}
        label={"Upload pr"}
        items={uploadPR}
        hasError={errors?.uploadPR?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("uploadPR", currentUploadPRValue)
        }
        errorMessage={errors?.uploadPR?.errorMessage}
        setFieldValue={setCurrentUploadPRValue}
        inputFieldRef={uploadPRRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Upload pr"
          isRequired={false}
          isReadOnly={false}
          value={currentUploadPRValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.uploadPR?.hasError) {
              runValidationTasks("uploadPR", value);
            }
            setCurrentUploadPRValue(value);
          }}
          onBlur={() => runValidationTasks("uploadPR", currentUploadPRValue)}
          errorMessage={errors.uploadPR?.errorMessage}
          hasError={errors.uploadPR?.hasError}
          ref={uploadPRRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "uploadPR")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP: values,
              uploadLP,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.uploadSP ?? values;
          }
          setUploadSP(values);
          setCurrentUploadSPValue("");
        }}
        currentFieldValue={currentUploadSPValue}
        label={"Upload sp"}
        items={uploadSP}
        hasError={errors?.uploadSP?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("uploadSP", currentUploadSPValue)
        }
        errorMessage={errors?.uploadSP?.errorMessage}
        setFieldValue={setCurrentUploadSPValue}
        inputFieldRef={uploadSPRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Upload sp"
          isRequired={false}
          isReadOnly={false}
          value={currentUploadSPValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.uploadSP?.hasError) {
              runValidationTasks("uploadSP", value);
            }
            setCurrentUploadSPValue(value);
          }}
          onBlur={() => runValidationTasks("uploadSP", currentUploadSPValue)}
          errorMessage={errors.uploadSP?.errorMessage}
          hasError={errors.uploadSP?.hasError}
          ref={uploadSPRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "uploadSP")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP: values,
              uploadAL,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.uploadLP ?? values;
          }
          setUploadLP(values);
          setCurrentUploadLPValue("");
        }}
        currentFieldValue={currentUploadLPValue}
        label={"Upload lp"}
        items={uploadLP}
        hasError={errors?.uploadLP?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("uploadLP", currentUploadLPValue)
        }
        errorMessage={errors?.uploadLP?.errorMessage}
        setFieldValue={setCurrentUploadLPValue}
        inputFieldRef={uploadLPRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Upload lp"
          isRequired={false}
          isReadOnly={false}
          value={currentUploadLPValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.uploadLP?.hasError) {
              runValidationTasks("uploadLP", value);
            }
            setCurrentUploadLPValue(value);
          }}
          onBlur={() => runValidationTasks("uploadLP", currentUploadLPValue)}
          errorMessage={errors.uploadLP?.errorMessage}
          hasError={errors.uploadLP?.hasError}
          ref={uploadLPRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "uploadLP")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL: values,
              uploadDep,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.uploadAL ?? values;
          }
          setUploadAL(values);
          setCurrentUploadALValue("");
        }}
        currentFieldValue={currentUploadALValue}
        label={"Upload al"}
        items={uploadAL}
        hasError={errors?.uploadAL?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("uploadAL", currentUploadALValue)
        }
        errorMessage={errors?.uploadAL?.errorMessage}
        setFieldValue={setCurrentUploadALValue}
        inputFieldRef={uploadALRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Upload al"
          isRequired={false}
          isReadOnly={false}
          value={currentUploadALValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.uploadAL?.hasError) {
              runValidationTasks("uploadAL", value);
            }
            setCurrentUploadALValue(value);
          }}
          onBlur={() => runValidationTasks("uploadAL", currentUploadALValue)}
          errorMessage={errors.uploadAL?.errorMessage}
          hasError={errors.uploadAL?.hasError}
          ref={uploadALRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "uploadAL")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep: values,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.uploadDep ?? values;
          }
          setUploadDep(values);
          setCurrentUploadDepValue("");
        }}
        currentFieldValue={currentUploadDepValue}
        label={"Upload dep"}
        items={uploadDep}
        hasError={errors?.uploadDep?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("uploadDep", currentUploadDepValue)
        }
        errorMessage={errors?.uploadDep?.errorMessage}
        setFieldValue={setCurrentUploadDepValue}
        inputFieldRef={uploadDepRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Upload dep"
          isRequired={false}
          isReadOnly={false}
          value={currentUploadDepValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.uploadDep?.hasError) {
              runValidationTasks("uploadDep", value);
            }
            setCurrentUploadDepValue(value);
          }}
          onBlur={() => runValidationTasks("uploadDep", currentUploadDepValue)}
          errorMessage={errors.uploadDep?.errorMessage}
          hasError={errors.uploadDep?.hasError}
          ref={uploadDepRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "uploadDep")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
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
              depEmpDate,
              depEmp,
              positionRev,
              positionRevDate,
              revSalary,
              revSalaryDate,
              revLeavePass,
              revLeaveDate,
              revAnnualLeave,
              revALD,
              remarkWI,
              uploadPR,
              uploadSP,
              uploadLP,
              uploadAL,
              uploadDep,
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
