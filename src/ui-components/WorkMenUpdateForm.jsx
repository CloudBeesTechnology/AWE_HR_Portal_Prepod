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
import { getWorkMen } from "../graphql/queries";
import { updateWorkMen } from "../graphql/mutations";
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
export default function WorkMenUpdateForm(props) {
  const {
    id: idProp,
    workMen: workMenModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    empStatusType: "",
    workmenCompExp: "",
    workmenCompNo: "",
    workmenComUp: [],
  };
  const [empStatusType, setEmpStatusType] = React.useState(
    initialValues.empStatusType
  );
  const [workmenCompExp, setWorkmenCompExp] = React.useState(
    initialValues.workmenCompExp
  );
  const [workmenCompNo, setWorkmenCompNo] = React.useState(
    initialValues.workmenCompNo
  );
  const [workmenComUp, setWorkmenComUp] = React.useState(
    initialValues.workmenComUp
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = workMenRecord
      ? { ...initialValues, ...workMenRecord }
      : initialValues;
    setEmpStatusType(cleanValues.empStatusType);
    setWorkmenCompExp(cleanValues.workmenCompExp);
    setWorkmenCompNo(cleanValues.workmenCompNo);
    setWorkmenComUp(cleanValues.workmenComUp ?? []);
    setCurrentWorkmenComUpValue("");
    setErrors({});
  };
  const [workMenRecord, setWorkMenRecord] = React.useState(workMenModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getWorkMen.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getWorkMen
        : workMenModelProp;
      setWorkMenRecord(record);
    };
    queryData();
  }, [idProp, workMenModelProp]);
  React.useEffect(resetStateValues, [workMenRecord]);
  const [currentWorkmenComUpValue, setCurrentWorkmenComUpValue] =
    React.useState("");
  const workmenComUpRef = React.createRef();
  const validations = {
    empStatusType: [],
    workmenCompExp: [],
    workmenCompNo: [],
    workmenComUp: [{ type: "JSON" }],
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
          empStatusType: empStatusType ?? null,
          workmenCompExp: workmenCompExp ?? null,
          workmenCompNo: workmenCompNo ?? null,
          workmenComUp: workmenComUp ?? null,
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
            query: updateWorkMen.replaceAll("__typename", ""),
            variables: {
              input: {
                id: workMenRecord.id,
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
      {...getOverrideProps(overrides, "WorkMenUpdateForm")}
      {...rest}
    >
      <TextField
        label="Emp status type"
        isRequired={false}
        isReadOnly={false}
        value={empStatusType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empStatusType: value,
              workmenCompExp,
              workmenCompNo,
              workmenComUp,
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
        label="Workmen comp exp"
        isRequired={false}
        isReadOnly={false}
        value={workmenCompExp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empStatusType,
              workmenCompExp: value,
              workmenCompNo,
              workmenComUp,
            };
            const result = onChange(modelFields);
            value = result?.workmenCompExp ?? value;
          }
          if (errors.workmenCompExp?.hasError) {
            runValidationTasks("workmenCompExp", value);
          }
          setWorkmenCompExp(value);
        }}
        onBlur={() => runValidationTasks("workmenCompExp", workmenCompExp)}
        errorMessage={errors.workmenCompExp?.errorMessage}
        hasError={errors.workmenCompExp?.hasError}
        {...getOverrideProps(overrides, "workmenCompExp")}
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
              empStatusType,
              workmenCompExp,
              workmenCompNo: value,
              workmenComUp,
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
              empStatusType,
              workmenCompExp,
              workmenCompNo,
              workmenComUp: values,
            };
            const result = onChange(modelFields);
            values = result?.workmenComUp ?? values;
          }
          setWorkmenComUp(values);
          setCurrentWorkmenComUpValue("");
        }}
        currentFieldValue={currentWorkmenComUpValue}
        label={"Workmen com up"}
        items={workmenComUp}
        hasError={errors?.workmenComUp?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("workmenComUp", currentWorkmenComUpValue)
        }
        errorMessage={errors?.workmenComUp?.errorMessage}
        setFieldValue={setCurrentWorkmenComUpValue}
        inputFieldRef={workmenComUpRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Workmen com up"
          isRequired={false}
          isReadOnly={false}
          value={currentWorkmenComUpValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.workmenComUp?.hasError) {
              runValidationTasks("workmenComUp", value);
            }
            setCurrentWorkmenComUpValue(value);
          }}
          onBlur={() =>
            runValidationTasks("workmenComUp", currentWorkmenComUpValue)
          }
          errorMessage={errors.workmenComUp?.errorMessage}
          hasError={errors.workmenComUp?.hasError}
          ref={workmenComUpRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "workmenComUp")}
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
          isDisabled={!(idProp || workMenModelProp)}
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
              !(idProp || workMenModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
