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
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createEmpLeaveDetails } from "../graphql/mutations";
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
export default function EmpLeaveDetailsCreateForm(props) {
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
    annualLeave: [],
    annualLeaveDate: [],
    compasLeave: "",
    compasLeaveDate: "",
    destinateLeavePass: [],
    durLeavePass: [],
    dateLeavePass: [],
    leavePass: [],
    materLeave: [],
    materLeaveDate: [],
    mrageLeave: "",
    mrageLeaveDate: "",
    paterLeave: [],
    paterLeaveDate: [],
    sickLeave: "",
    sickLeaveDate: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [annualLeave, setAnnualLeave] = React.useState(
    initialValues.annualLeave
  );
  const [annualLeaveDate, setAnnualLeaveDate] = React.useState(
    initialValues.annualLeaveDate
  );
  const [compasLeave, setCompasLeave] = React.useState(
    initialValues.compasLeave
  );
  const [compasLeaveDate, setCompasLeaveDate] = React.useState(
    initialValues.compasLeaveDate
  );
  const [destinateLeavePass, setDestinateLeavePass] = React.useState(
    initialValues.destinateLeavePass
  );
  const [durLeavePass, setDurLeavePass] = React.useState(
    initialValues.durLeavePass
  );
  const [dateLeavePass, setDateLeavePass] = React.useState(
    initialValues.dateLeavePass
  );
  const [leavePass, setLeavePass] = React.useState(initialValues.leavePass);
  const [materLeave, setMaterLeave] = React.useState(initialValues.materLeave);
  const [materLeaveDate, setMaterLeaveDate] = React.useState(
    initialValues.materLeaveDate
  );
  const [mrageLeave, setMrageLeave] = React.useState(initialValues.mrageLeave);
  const [mrageLeaveDate, setMrageLeaveDate] = React.useState(
    initialValues.mrageLeaveDate
  );
  const [paterLeave, setPaterLeave] = React.useState(initialValues.paterLeave);
  const [paterLeaveDate, setPaterLeaveDate] = React.useState(
    initialValues.paterLeaveDate
  );
  const [sickLeave, setSickLeave] = React.useState(initialValues.sickLeave);
  const [sickLeaveDate, setSickLeaveDate] = React.useState(
    initialValues.sickLeaveDate
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setAnnualLeave(initialValues.annualLeave);
    setCurrentAnnualLeaveValue("");
    setAnnualLeaveDate(initialValues.annualLeaveDate);
    setCurrentAnnualLeaveDateValue("");
    setCompasLeave(initialValues.compasLeave);
    setCompasLeaveDate(initialValues.compasLeaveDate);
    setDestinateLeavePass(initialValues.destinateLeavePass);
    setCurrentDestinateLeavePassValue("");
    setDurLeavePass(initialValues.durLeavePass);
    setCurrentDurLeavePassValue("");
    setDateLeavePass(initialValues.dateLeavePass);
    setCurrentDateLeavePassValue("");
    setLeavePass(initialValues.leavePass);
    setCurrentLeavePassValue("");
    setMaterLeave(initialValues.materLeave);
    setCurrentMaterLeaveValue("");
    setMaterLeaveDate(initialValues.materLeaveDate);
    setCurrentMaterLeaveDateValue("");
    setMrageLeave(initialValues.mrageLeave);
    setMrageLeaveDate(initialValues.mrageLeaveDate);
    setPaterLeave(initialValues.paterLeave);
    setCurrentPaterLeaveValue("");
    setPaterLeaveDate(initialValues.paterLeaveDate);
    setCurrentPaterLeaveDateValue("");
    setSickLeave(initialValues.sickLeave);
    setSickLeaveDate(initialValues.sickLeaveDate);
    setErrors({});
  };
  const [currentAnnualLeaveValue, setCurrentAnnualLeaveValue] =
    React.useState("");
  const annualLeaveRef = React.createRef();
  const [currentAnnualLeaveDateValue, setCurrentAnnualLeaveDateValue] =
    React.useState("");
  const annualLeaveDateRef = React.createRef();
  const [currentDestinateLeavePassValue, setCurrentDestinateLeavePassValue] =
    React.useState("");
  const destinateLeavePassRef = React.createRef();
  const [currentDurLeavePassValue, setCurrentDurLeavePassValue] =
    React.useState("");
  const durLeavePassRef = React.createRef();
  const [currentDateLeavePassValue, setCurrentDateLeavePassValue] =
    React.useState("");
  const dateLeavePassRef = React.createRef();
  const [currentLeavePassValue, setCurrentLeavePassValue] = React.useState("");
  const leavePassRef = React.createRef();
  const [currentMaterLeaveValue, setCurrentMaterLeaveValue] =
    React.useState("");
  const materLeaveRef = React.createRef();
  const [currentMaterLeaveDateValue, setCurrentMaterLeaveDateValue] =
    React.useState("");
  const materLeaveDateRef = React.createRef();
  const [currentPaterLeaveValue, setCurrentPaterLeaveValue] =
    React.useState("");
  const paterLeaveRef = React.createRef();
  const [currentPaterLeaveDateValue, setCurrentPaterLeaveDateValue] =
    React.useState("");
  const paterLeaveDateRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    annualLeave: [],
    annualLeaveDate: [],
    compasLeave: [],
    compasLeaveDate: [],
    destinateLeavePass: [],
    durLeavePass: [],
    dateLeavePass: [],
    leavePass: [],
    materLeave: [],
    materLeaveDate: [],
    mrageLeave: [],
    mrageLeaveDate: [],
    paterLeave: [],
    paterLeaveDate: [],
    sickLeave: [],
    sickLeaveDate: [],
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
          annualLeave,
          annualLeaveDate,
          compasLeave,
          compasLeaveDate,
          destinateLeavePass,
          durLeavePass,
          dateLeavePass,
          leavePass,
          materLeave,
          materLeaveDate,
          mrageLeave,
          mrageLeaveDate,
          paterLeave,
          paterLeaveDate,
          sickLeave,
          sickLeaveDate,
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
            query: createEmpLeaveDetails.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "EmpLeaveDetailsCreateForm")}
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
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
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
              annualLeave: values,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            values = result?.annualLeave ?? values;
          }
          setAnnualLeave(values);
          setCurrentAnnualLeaveValue("");
        }}
        currentFieldValue={currentAnnualLeaveValue}
        label={"Annual leave"}
        items={annualLeave}
        hasError={errors?.annualLeave?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("annualLeave", currentAnnualLeaveValue)
        }
        errorMessage={errors?.annualLeave?.errorMessage}
        setFieldValue={setCurrentAnnualLeaveValue}
        inputFieldRef={annualLeaveRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Annual leave"
          isRequired={false}
          isReadOnly={false}
          value={currentAnnualLeaveValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.annualLeave?.hasError) {
              runValidationTasks("annualLeave", value);
            }
            setCurrentAnnualLeaveValue(value);
          }}
          onBlur={() =>
            runValidationTasks("annualLeave", currentAnnualLeaveValue)
          }
          errorMessage={errors.annualLeave?.errorMessage}
          hasError={errors.annualLeave?.hasError}
          ref={annualLeaveRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "annualLeave")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate: values,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            values = result?.annualLeaveDate ?? values;
          }
          setAnnualLeaveDate(values);
          setCurrentAnnualLeaveDateValue("");
        }}
        currentFieldValue={currentAnnualLeaveDateValue}
        label={"Annual leave date"}
        items={annualLeaveDate}
        hasError={errors?.annualLeaveDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "annualLeaveDate",
            currentAnnualLeaveDateValue
          )
        }
        errorMessage={errors?.annualLeaveDate?.errorMessage}
        setFieldValue={setCurrentAnnualLeaveDateValue}
        inputFieldRef={annualLeaveDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Annual leave date"
          isRequired={false}
          isReadOnly={false}
          value={currentAnnualLeaveDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.annualLeaveDate?.hasError) {
              runValidationTasks("annualLeaveDate", value);
            }
            setCurrentAnnualLeaveDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("annualLeaveDate", currentAnnualLeaveDateValue)
          }
          errorMessage={errors.annualLeaveDate?.errorMessage}
          hasError={errors.annualLeaveDate?.hasError}
          ref={annualLeaveDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "annualLeaveDate")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Compas leave"
        isRequired={false}
        isReadOnly={false}
        value={compasLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave: value,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            value = result?.compasLeave ?? value;
          }
          if (errors.compasLeave?.hasError) {
            runValidationTasks("compasLeave", value);
          }
          setCompasLeave(value);
        }}
        onBlur={() => runValidationTasks("compasLeave", compasLeave)}
        errorMessage={errors.compasLeave?.errorMessage}
        hasError={errors.compasLeave?.hasError}
        {...getOverrideProps(overrides, "compasLeave")}
      ></TextField>
      <TextField
        label="Compas leave date"
        isRequired={false}
        isReadOnly={false}
        value={compasLeaveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate: value,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            value = result?.compasLeaveDate ?? value;
          }
          if (errors.compasLeaveDate?.hasError) {
            runValidationTasks("compasLeaveDate", value);
          }
          setCompasLeaveDate(value);
        }}
        onBlur={() => runValidationTasks("compasLeaveDate", compasLeaveDate)}
        errorMessage={errors.compasLeaveDate?.errorMessage}
        hasError={errors.compasLeaveDate?.hasError}
        {...getOverrideProps(overrides, "compasLeaveDate")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass: values,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            values = result?.destinateLeavePass ?? values;
          }
          setDestinateLeavePass(values);
          setCurrentDestinateLeavePassValue("");
        }}
        currentFieldValue={currentDestinateLeavePassValue}
        label={"Destinate leave pass"}
        items={destinateLeavePass}
        hasError={errors?.destinateLeavePass?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "destinateLeavePass",
            currentDestinateLeavePassValue
          )
        }
        errorMessage={errors?.destinateLeavePass?.errorMessage}
        setFieldValue={setCurrentDestinateLeavePassValue}
        inputFieldRef={destinateLeavePassRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Destinate leave pass"
          isRequired={false}
          isReadOnly={false}
          value={currentDestinateLeavePassValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.destinateLeavePass?.hasError) {
              runValidationTasks("destinateLeavePass", value);
            }
            setCurrentDestinateLeavePassValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "destinateLeavePass",
              currentDestinateLeavePassValue
            )
          }
          errorMessage={errors.destinateLeavePass?.errorMessage}
          hasError={errors.destinateLeavePass?.hasError}
          ref={destinateLeavePassRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "destinateLeavePass")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass: values,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            values = result?.durLeavePass ?? values;
          }
          setDurLeavePass(values);
          setCurrentDurLeavePassValue("");
        }}
        currentFieldValue={currentDurLeavePassValue}
        label={"Dur leave pass"}
        items={durLeavePass}
        hasError={errors?.durLeavePass?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("durLeavePass", currentDurLeavePassValue)
        }
        errorMessage={errors?.durLeavePass?.errorMessage}
        setFieldValue={setCurrentDurLeavePassValue}
        inputFieldRef={durLeavePassRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Dur leave pass"
          isRequired={false}
          isReadOnly={false}
          value={currentDurLeavePassValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.durLeavePass?.hasError) {
              runValidationTasks("durLeavePass", value);
            }
            setCurrentDurLeavePassValue(value);
          }}
          onBlur={() =>
            runValidationTasks("durLeavePass", currentDurLeavePassValue)
          }
          errorMessage={errors.durLeavePass?.errorMessage}
          hasError={errors.durLeavePass?.hasError}
          ref={durLeavePassRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "durLeavePass")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass: values,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            values = result?.dateLeavePass ?? values;
          }
          setDateLeavePass(values);
          setCurrentDateLeavePassValue("");
        }}
        currentFieldValue={currentDateLeavePassValue}
        label={"Date leave pass"}
        items={dateLeavePass}
        hasError={errors?.dateLeavePass?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("dateLeavePass", currentDateLeavePassValue)
        }
        errorMessage={errors?.dateLeavePass?.errorMessage}
        setFieldValue={setCurrentDateLeavePassValue}
        inputFieldRef={dateLeavePassRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Date leave pass"
          isRequired={false}
          isReadOnly={false}
          value={currentDateLeavePassValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.dateLeavePass?.hasError) {
              runValidationTasks("dateLeavePass", value);
            }
            setCurrentDateLeavePassValue(value);
          }}
          onBlur={() =>
            runValidationTasks("dateLeavePass", currentDateLeavePassValue)
          }
          errorMessage={errors.dateLeavePass?.errorMessage}
          hasError={errors.dateLeavePass?.hasError}
          ref={dateLeavePassRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "dateLeavePass")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass: values,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            values = result?.leavePass ?? values;
          }
          setLeavePass(values);
          setCurrentLeavePassValue("");
        }}
        currentFieldValue={currentLeavePassValue}
        label={"Leave pass"}
        items={leavePass}
        hasError={errors?.leavePass?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("leavePass", currentLeavePassValue)
        }
        errorMessage={errors?.leavePass?.errorMessage}
        setFieldValue={setCurrentLeavePassValue}
        inputFieldRef={leavePassRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Leave pass"
          isRequired={false}
          isReadOnly={false}
          value={currentLeavePassValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.leavePass?.hasError) {
              runValidationTasks("leavePass", value);
            }
            setCurrentLeavePassValue(value);
          }}
          onBlur={() => runValidationTasks("leavePass", currentLeavePassValue)}
          errorMessage={errors.leavePass?.errorMessage}
          hasError={errors.leavePass?.hasError}
          ref={leavePassRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "leavePass")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave: values,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            values = result?.materLeave ?? values;
          }
          setMaterLeave(values);
          setCurrentMaterLeaveValue("");
        }}
        currentFieldValue={currentMaterLeaveValue}
        label={"Mater leave"}
        items={materLeave}
        hasError={errors?.materLeave?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("materLeave", currentMaterLeaveValue)
        }
        errorMessage={errors?.materLeave?.errorMessage}
        setFieldValue={setCurrentMaterLeaveValue}
        inputFieldRef={materLeaveRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Mater leave"
          isRequired={false}
          isReadOnly={false}
          value={currentMaterLeaveValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.materLeave?.hasError) {
              runValidationTasks("materLeave", value);
            }
            setCurrentMaterLeaveValue(value);
          }}
          onBlur={() =>
            runValidationTasks("materLeave", currentMaterLeaveValue)
          }
          errorMessage={errors.materLeave?.errorMessage}
          hasError={errors.materLeave?.hasError}
          ref={materLeaveRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "materLeave")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate: values,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            values = result?.materLeaveDate ?? values;
          }
          setMaterLeaveDate(values);
          setCurrentMaterLeaveDateValue("");
        }}
        currentFieldValue={currentMaterLeaveDateValue}
        label={"Mater leave date"}
        items={materLeaveDate}
        hasError={errors?.materLeaveDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("materLeaveDate", currentMaterLeaveDateValue)
        }
        errorMessage={errors?.materLeaveDate?.errorMessage}
        setFieldValue={setCurrentMaterLeaveDateValue}
        inputFieldRef={materLeaveDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Mater leave date"
          isRequired={false}
          isReadOnly={false}
          value={currentMaterLeaveDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.materLeaveDate?.hasError) {
              runValidationTasks("materLeaveDate", value);
            }
            setCurrentMaterLeaveDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("materLeaveDate", currentMaterLeaveDateValue)
          }
          errorMessage={errors.materLeaveDate?.errorMessage}
          hasError={errors.materLeaveDate?.hasError}
          ref={materLeaveDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "materLeaveDate")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Mrage leave"
        isRequired={false}
        isReadOnly={false}
        value={mrageLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave: value,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            value = result?.mrageLeave ?? value;
          }
          if (errors.mrageLeave?.hasError) {
            runValidationTasks("mrageLeave", value);
          }
          setMrageLeave(value);
        }}
        onBlur={() => runValidationTasks("mrageLeave", mrageLeave)}
        errorMessage={errors.mrageLeave?.errorMessage}
        hasError={errors.mrageLeave?.hasError}
        {...getOverrideProps(overrides, "mrageLeave")}
      ></TextField>
      <TextField
        label="Mrage leave date"
        isRequired={false}
        isReadOnly={false}
        value={mrageLeaveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate: value,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            value = result?.mrageLeaveDate ?? value;
          }
          if (errors.mrageLeaveDate?.hasError) {
            runValidationTasks("mrageLeaveDate", value);
          }
          setMrageLeaveDate(value);
        }}
        onBlur={() => runValidationTasks("mrageLeaveDate", mrageLeaveDate)}
        errorMessage={errors.mrageLeaveDate?.errorMessage}
        hasError={errors.mrageLeaveDate?.hasError}
        {...getOverrideProps(overrides, "mrageLeaveDate")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave: values,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            values = result?.paterLeave ?? values;
          }
          setPaterLeave(values);
          setCurrentPaterLeaveValue("");
        }}
        currentFieldValue={currentPaterLeaveValue}
        label={"Pater leave"}
        items={paterLeave}
        hasError={errors?.paterLeave?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("paterLeave", currentPaterLeaveValue)
        }
        errorMessage={errors?.paterLeave?.errorMessage}
        setFieldValue={setCurrentPaterLeaveValue}
        inputFieldRef={paterLeaveRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pater leave"
          isRequired={false}
          isReadOnly={false}
          value={currentPaterLeaveValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.paterLeave?.hasError) {
              runValidationTasks("paterLeave", value);
            }
            setCurrentPaterLeaveValue(value);
          }}
          onBlur={() =>
            runValidationTasks("paterLeave", currentPaterLeaveValue)
          }
          errorMessage={errors.paterLeave?.errorMessage}
          hasError={errors.paterLeave?.hasError}
          ref={paterLeaveRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "paterLeave")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate: values,
              sickLeave,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            values = result?.paterLeaveDate ?? values;
          }
          setPaterLeaveDate(values);
          setCurrentPaterLeaveDateValue("");
        }}
        currentFieldValue={currentPaterLeaveDateValue}
        label={"Pater leave date"}
        items={paterLeaveDate}
        hasError={errors?.paterLeaveDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("paterLeaveDate", currentPaterLeaveDateValue)
        }
        errorMessage={errors?.paterLeaveDate?.errorMessage}
        setFieldValue={setCurrentPaterLeaveDateValue}
        inputFieldRef={paterLeaveDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pater leave date"
          isRequired={false}
          isReadOnly={false}
          value={currentPaterLeaveDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.paterLeaveDate?.hasError) {
              runValidationTasks("paterLeaveDate", value);
            }
            setCurrentPaterLeaveDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("paterLeaveDate", currentPaterLeaveDateValue)
          }
          errorMessage={errors.paterLeaveDate?.errorMessage}
          hasError={errors.paterLeaveDate?.hasError}
          ref={paterLeaveDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "paterLeaveDate")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Sick leave"
        isRequired={false}
        isReadOnly={false}
        value={sickLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave: value,
              sickLeaveDate,
            };
            const result = onChange(modelFields);
            value = result?.sickLeave ?? value;
          }
          if (errors.sickLeave?.hasError) {
            runValidationTasks("sickLeave", value);
          }
          setSickLeave(value);
        }}
        onBlur={() => runValidationTasks("sickLeave", sickLeave)}
        errorMessage={errors.sickLeave?.errorMessage}
        hasError={errors.sickLeave?.hasError}
        {...getOverrideProps(overrides, "sickLeave")}
      ></TextField>
      <TextField
        label="Sick leave date"
        isRequired={false}
        isReadOnly={false}
        value={sickLeaveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              compasLeaveDate,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              materLeaveDate,
              mrageLeave,
              mrageLeaveDate,
              paterLeave,
              paterLeaveDate,
              sickLeave,
              sickLeaveDate: value,
            };
            const result = onChange(modelFields);
            value = result?.sickLeaveDate ?? value;
          }
          if (errors.sickLeaveDate?.hasError) {
            runValidationTasks("sickLeaveDate", value);
          }
          setSickLeaveDate(value);
        }}
        onBlur={() => runValidationTasks("sickLeaveDate", sickLeaveDate)}
        errorMessage={errors.sickLeaveDate?.errorMessage}
        hasError={errors.sickLeaveDate?.hasError}
        {...getOverrideProps(overrides, "sickLeaveDate")}
      ></TextField>
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
