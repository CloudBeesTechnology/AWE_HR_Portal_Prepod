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
import { getBastingPaint } from "../graphql/queries";
import { updateBastingPaint } from "../graphql/mutations";
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
export default function BastingPaintUpdateForm(props) {
  const {
    id: idProp,
    bastingPaint: bastingPaintModelProp,
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
    blastingRemarks: "",
    blastingEndDate: "",
    blastingStartDate: "",
    blastingBadgeNo: "",
    blastingQulifiExp: "",
    blastingUpload: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [blastingRemarks, setBlastingRemarks] = React.useState(
    initialValues.blastingRemarks
  );
  const [blastingEndDate, setBlastingEndDate] = React.useState(
    initialValues.blastingEndDate
  );
  const [blastingStartDate, setBlastingStartDate] = React.useState(
    initialValues.blastingStartDate
  );
  const [blastingBadgeNo, setBlastingBadgeNo] = React.useState(
    initialValues.blastingBadgeNo
  );
  const [blastingQulifiExp, setBlastingQulifiExp] = React.useState(
    initialValues.blastingQulifiExp
  );
  const [blastingUpload, setBlastingUpload] = React.useState(
    initialValues.blastingUpload
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = bastingPaintRecord
      ? { ...initialValues, ...bastingPaintRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setBlastingRemarks(cleanValues.blastingRemarks);
    setBlastingEndDate(cleanValues.blastingEndDate);
    setBlastingStartDate(cleanValues.blastingStartDate);
    setBlastingBadgeNo(cleanValues.blastingBadgeNo);
    setBlastingQulifiExp(cleanValues.blastingQulifiExp);
    setBlastingUpload(cleanValues.blastingUpload ?? []);
    setCurrentBlastingUploadValue("");
    setErrors({});
  };
  const [bastingPaintRecord, setBastingPaintRecord] = React.useState(
    bastingPaintModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getBastingPaint.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getBastingPaint
        : bastingPaintModelProp;
      setBastingPaintRecord(record);
    };
    queryData();
  }, [idProp, bastingPaintModelProp]);
  React.useEffect(resetStateValues, [bastingPaintRecord]);
  const [currentBlastingUploadValue, setCurrentBlastingUploadValue] =
    React.useState("");
  const blastingUploadRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    blastingRemarks: [],
    blastingEndDate: [],
    blastingStartDate: [],
    blastingBadgeNo: [],
    blastingQulifiExp: [],
    blastingUpload: [{ type: "JSON" }],
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
          blastingRemarks: blastingRemarks ?? null,
          blastingEndDate: blastingEndDate ?? null,
          blastingStartDate: blastingStartDate ?? null,
          blastingBadgeNo: blastingBadgeNo ?? null,
          blastingQulifiExp: blastingQulifiExp ?? null,
          blastingUpload: blastingUpload ?? null,
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
            query: updateBastingPaint.replaceAll("__typename", ""),
            variables: {
              input: {
                id: bastingPaintRecord.id,
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
      {...getOverrideProps(overrides, "BastingPaintUpdateForm")}
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
              blastingRemarks,
              blastingEndDate,
              blastingStartDate,
              blastingBadgeNo,
              blastingQulifiExp,
              blastingUpload,
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
        label="Blasting remarks"
        isRequired={false}
        isReadOnly={false}
        value={blastingRemarks}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              blastingRemarks: value,
              blastingEndDate,
              blastingStartDate,
              blastingBadgeNo,
              blastingQulifiExp,
              blastingUpload,
            };
            const result = onChange(modelFields);
            value = result?.blastingRemarks ?? value;
          }
          if (errors.blastingRemarks?.hasError) {
            runValidationTasks("blastingRemarks", value);
          }
          setBlastingRemarks(value);
        }}
        onBlur={() => runValidationTasks("blastingRemarks", blastingRemarks)}
        errorMessage={errors.blastingRemarks?.errorMessage}
        hasError={errors.blastingRemarks?.hasError}
        {...getOverrideProps(overrides, "blastingRemarks")}
      ></TextField>
      <TextField
        label="Blasting end date"
        isRequired={false}
        isReadOnly={false}
        value={blastingEndDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              blastingRemarks,
              blastingEndDate: value,
              blastingStartDate,
              blastingBadgeNo,
              blastingQulifiExp,
              blastingUpload,
            };
            const result = onChange(modelFields);
            value = result?.blastingEndDate ?? value;
          }
          if (errors.blastingEndDate?.hasError) {
            runValidationTasks("blastingEndDate", value);
          }
          setBlastingEndDate(value);
        }}
        onBlur={() => runValidationTasks("blastingEndDate", blastingEndDate)}
        errorMessage={errors.blastingEndDate?.errorMessage}
        hasError={errors.blastingEndDate?.hasError}
        {...getOverrideProps(overrides, "blastingEndDate")}
      ></TextField>
      <TextField
        label="Blasting start date"
        isRequired={false}
        isReadOnly={false}
        value={blastingStartDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              blastingRemarks,
              blastingEndDate,
              blastingStartDate: value,
              blastingBadgeNo,
              blastingQulifiExp,
              blastingUpload,
            };
            const result = onChange(modelFields);
            value = result?.blastingStartDate ?? value;
          }
          if (errors.blastingStartDate?.hasError) {
            runValidationTasks("blastingStartDate", value);
          }
          setBlastingStartDate(value);
        }}
        onBlur={() =>
          runValidationTasks("blastingStartDate", blastingStartDate)
        }
        errorMessage={errors.blastingStartDate?.errorMessage}
        hasError={errors.blastingStartDate?.hasError}
        {...getOverrideProps(overrides, "blastingStartDate")}
      ></TextField>
      <TextField
        label="Blasting badge no"
        isRequired={false}
        isReadOnly={false}
        value={blastingBadgeNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              blastingRemarks,
              blastingEndDate,
              blastingStartDate,
              blastingBadgeNo: value,
              blastingQulifiExp,
              blastingUpload,
            };
            const result = onChange(modelFields);
            value = result?.blastingBadgeNo ?? value;
          }
          if (errors.blastingBadgeNo?.hasError) {
            runValidationTasks("blastingBadgeNo", value);
          }
          setBlastingBadgeNo(value);
        }}
        onBlur={() => runValidationTasks("blastingBadgeNo", blastingBadgeNo)}
        errorMessage={errors.blastingBadgeNo?.errorMessage}
        hasError={errors.blastingBadgeNo?.hasError}
        {...getOverrideProps(overrides, "blastingBadgeNo")}
      ></TextField>
      <TextField
        label="Blasting qulifi exp"
        isRequired={false}
        isReadOnly={false}
        value={blastingQulifiExp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              blastingRemarks,
              blastingEndDate,
              blastingStartDate,
              blastingBadgeNo,
              blastingQulifiExp: value,
              blastingUpload,
            };
            const result = onChange(modelFields);
            value = result?.blastingQulifiExp ?? value;
          }
          if (errors.blastingQulifiExp?.hasError) {
            runValidationTasks("blastingQulifiExp", value);
          }
          setBlastingQulifiExp(value);
        }}
        onBlur={() =>
          runValidationTasks("blastingQulifiExp", blastingQulifiExp)
        }
        errorMessage={errors.blastingQulifiExp?.errorMessage}
        hasError={errors.blastingQulifiExp?.hasError}
        {...getOverrideProps(overrides, "blastingQulifiExp")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              blastingRemarks,
              blastingEndDate,
              blastingStartDate,
              blastingBadgeNo,
              blastingQulifiExp,
              blastingUpload: values,
            };
            const result = onChange(modelFields);
            values = result?.blastingUpload ?? values;
          }
          setBlastingUpload(values);
          setCurrentBlastingUploadValue("");
        }}
        currentFieldValue={currentBlastingUploadValue}
        label={"Blasting upload"}
        items={blastingUpload}
        hasError={errors?.blastingUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("blastingUpload", currentBlastingUploadValue)
        }
        errorMessage={errors?.blastingUpload?.errorMessage}
        setFieldValue={setCurrentBlastingUploadValue}
        inputFieldRef={blastingUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Blasting upload"
          isRequired={false}
          isReadOnly={false}
          value={currentBlastingUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.blastingUpload?.hasError) {
              runValidationTasks("blastingUpload", value);
            }
            setCurrentBlastingUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("blastingUpload", currentBlastingUploadValue)
          }
          errorMessage={errors.blastingUpload?.errorMessage}
          hasError={errors.blastingUpload?.hasError}
          ref={blastingUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "blastingUpload")}
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
          isDisabled={!(idProp || bastingPaintModelProp)}
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
              !(idProp || bastingPaintModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
