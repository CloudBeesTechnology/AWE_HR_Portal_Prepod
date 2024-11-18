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
import { getEmployeeNonLocalAcco } from "../graphql/queries";
import { updateEmployeeNonLocalAcco } from "../graphql/mutations";
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
export default function EmployeeNonLocalAccoUpdateForm(props) {
  const {
    id: idProp,
    employeeNonLocalAcco: employeeNonLocalAccoModelProp,
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
    accommodation: [],
    accommodationAddress: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [accommodation, setAccommodation] = React.useState(
    initialValues.accommodation
  );
  const [accommodationAddress, setAccommodationAddress] = React.useState(
    initialValues.accommodationAddress
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = employeeNonLocalAccoRecord
      ? { ...initialValues, ...employeeNonLocalAccoRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setAccommodation(cleanValues.accommodation ?? []);
    setCurrentAccommodationValue("");
    setAccommodationAddress(cleanValues.accommodationAddress ?? []);
    setCurrentAccommodationAddressValue("");
    setErrors({});
  };
  const [employeeNonLocalAccoRecord, setEmployeeNonLocalAccoRecord] =
    React.useState(employeeNonLocalAccoModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getEmployeeNonLocalAcco.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEmployeeNonLocalAcco
        : employeeNonLocalAccoModelProp;
      setEmployeeNonLocalAccoRecord(record);
    };
    queryData();
  }, [idProp, employeeNonLocalAccoModelProp]);
  React.useEffect(resetStateValues, [employeeNonLocalAccoRecord]);
  const [currentAccommodationValue, setCurrentAccommodationValue] =
    React.useState("");
  const accommodationRef = React.createRef();
  const [
    currentAccommodationAddressValue,
    setCurrentAccommodationAddressValue,
  ] = React.useState("");
  const accommodationAddressRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    accommodation: [{ type: "Required" }],
    accommodationAddress: [{ type: "Required" }],
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
          accommodation,
          accommodationAddress,
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
            query: updateEmployeeNonLocalAcco.replaceAll("__typename", ""),
            variables: {
              input: {
                id: employeeNonLocalAccoRecord.id,
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
      {...getOverrideProps(overrides, "EmployeeNonLocalAccoUpdateForm")}
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
              accommodation,
              accommodationAddress,
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
              accommodation: values,
              accommodationAddress,
            };
            const result = onChange(modelFields);
            values = result?.accommodation ?? values;
          }
          setAccommodation(values);
          setCurrentAccommodationValue("");
        }}
        currentFieldValue={currentAccommodationValue}
        label={"Accommodation"}
        items={accommodation}
        hasError={errors?.accommodation?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("accommodation", currentAccommodationValue)
        }
        errorMessage={errors?.accommodation?.errorMessage}
        setFieldValue={setCurrentAccommodationValue}
        inputFieldRef={accommodationRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Accommodation"
          isRequired={true}
          isReadOnly={false}
          value={currentAccommodationValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.accommodation?.hasError) {
              runValidationTasks("accommodation", value);
            }
            setCurrentAccommodationValue(value);
          }}
          onBlur={() =>
            runValidationTasks("accommodation", currentAccommodationValue)
          }
          errorMessage={errors.accommodation?.errorMessage}
          hasError={errors.accommodation?.hasError}
          ref={accommodationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "accommodation")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              accommodation,
              accommodationAddress: values,
            };
            const result = onChange(modelFields);
            values = result?.accommodationAddress ?? values;
          }
          setAccommodationAddress(values);
          setCurrentAccommodationAddressValue("");
        }}
        currentFieldValue={currentAccommodationAddressValue}
        label={"Accommodation address"}
        items={accommodationAddress}
        hasError={errors?.accommodationAddress?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "accommodationAddress",
            currentAccommodationAddressValue
          )
        }
        errorMessage={errors?.accommodationAddress?.errorMessage}
        setFieldValue={setCurrentAccommodationAddressValue}
        inputFieldRef={accommodationAddressRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Accommodation address"
          isRequired={true}
          isReadOnly={false}
          value={currentAccommodationAddressValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.accommodationAddress?.hasError) {
              runValidationTasks("accommodationAddress", value);
            }
            setCurrentAccommodationAddressValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "accommodationAddress",
              currentAccommodationAddressValue
            )
          }
          errorMessage={errors.accommodationAddress?.errorMessage}
          hasError={errors.accommodationAddress?.hasError}
          ref={accommodationAddressRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "accommodationAddress")}
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
          isDisabled={!(idProp || employeeNonLocalAccoModelProp)}
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
              !(idProp || employeeNonLocalAccoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
