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
import { getInsClaim } from "../graphql/queries";
import { updateInsClaim } from "../graphql/mutations";
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
export default function InsClaimUpdateForm(props) {
  const {
    id: idProp,
    insClaim: insClaimModelProp,
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
    insuranceClaims: [],
    createdBy: [],
    updatedBy: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [insuranceClaims, setInsuranceClaims] = React.useState(
    initialValues.insuranceClaims
  );
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [updatedBy, setUpdatedBy] = React.useState(initialValues.updatedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = insClaimRecord
      ? { ...initialValues, ...insClaimRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setInsuranceClaims(cleanValues.insuranceClaims ?? []);
    setCurrentInsuranceClaimsValue("");
    setCreatedBy(cleanValues.createdBy ?? []);
    setCurrentCreatedByValue("");
    setUpdatedBy(cleanValues.updatedBy ?? []);
    setCurrentUpdatedByValue("");
    setErrors({});
  };
  const [insClaimRecord, setInsClaimRecord] = React.useState(insClaimModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getInsClaim.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getInsClaim
        : insClaimModelProp;
      setInsClaimRecord(record);
    };
    queryData();
  }, [idProp, insClaimModelProp]);
  React.useEffect(resetStateValues, [insClaimRecord]);
  const [currentInsuranceClaimsValue, setCurrentInsuranceClaimsValue] =
    React.useState("");
  const insuranceClaimsRef = React.createRef();
  const [currentCreatedByValue, setCurrentCreatedByValue] = React.useState("");
  const createdByRef = React.createRef();
  const [currentUpdatedByValue, setCurrentUpdatedByValue] = React.useState("");
  const updatedByRef = React.createRef();
  const validations = {
    empID: [],
    insuranceClaims: [{ type: "JSON" }],
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
          empID: empID ?? null,
          insuranceClaims: insuranceClaims ?? null,
          createdBy: createdBy ?? null,
          updatedBy: updatedBy ?? null,
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
            query: updateInsClaim.replaceAll("__typename", ""),
            variables: {
              input: {
                id: insClaimRecord.id,
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
      {...getOverrideProps(overrides, "InsClaimUpdateForm")}
      {...rest}
    >
      <TextField
        label="Emp id"
        isRequired={false}
        isReadOnly={false}
        value={empID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID: value,
              insuranceClaims,
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
              insuranceClaims: values,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.insuranceClaims ?? values;
          }
          setInsuranceClaims(values);
          setCurrentInsuranceClaimsValue("");
        }}
        currentFieldValue={currentInsuranceClaimsValue}
        label={"Insurance claims"}
        items={insuranceClaims}
        hasError={errors?.insuranceClaims?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "insuranceClaims",
            currentInsuranceClaimsValue
          )
        }
        errorMessage={errors?.insuranceClaims?.errorMessage}
        setFieldValue={setCurrentInsuranceClaimsValue}
        inputFieldRef={insuranceClaimsRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Insurance claims"
          isRequired={false}
          isReadOnly={false}
          value={currentInsuranceClaimsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.insuranceClaims?.hasError) {
              runValidationTasks("insuranceClaims", value);
            }
            setCurrentInsuranceClaimsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("insuranceClaims", currentInsuranceClaimsValue)
          }
          errorMessage={errors.insuranceClaims?.errorMessage}
          hasError={errors.insuranceClaims?.hasError}
          ref={insuranceClaimsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "insuranceClaims")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              insuranceClaims,
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
              insuranceClaims,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || insClaimModelProp)}
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
              !(idProp || insClaimModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
