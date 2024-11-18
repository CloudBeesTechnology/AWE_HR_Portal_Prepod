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
import { getEmployeeInfo } from "../graphql/queries";
import { updateEmployeeInfo } from "../graphql/mutations";
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
export default function EmployeeInfoUpdateForm(props) {
  const {
    id: idProp,
    employeeInfo: employeeInfoModelProp,
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
    employeeBadgeNumber: "",
    sapNumber: "",
    countryOfOrigin: "",
    educationLevel: "",
    academicTechnicalQualification: "",
    nextOfKin: [],
    inductionBriefing: "",
    previousEmployment: "",
    previousEmploymentPeriod: "",
    nationalCategory: "",
    malaysianIcNumber: "",
    address: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [employeeBadgeNumber, setEmployeeBadgeNumber] = React.useState(
    initialValues.employeeBadgeNumber
  );
  const [sapNumber, setSapNumber] = React.useState(initialValues.sapNumber);
  const [countryOfOrigin, setCountryOfOrigin] = React.useState(
    initialValues.countryOfOrigin
  );
  const [educationLevel, setEducationLevel] = React.useState(
    initialValues.educationLevel
  );
  const [academicTechnicalQualification, setAcademicTechnicalQualification] =
    React.useState(initialValues.academicTechnicalQualification);
  const [nextOfKin, setNextOfKin] = React.useState(initialValues.nextOfKin);
  const [inductionBriefing, setInductionBriefing] = React.useState(
    initialValues.inductionBriefing
  );
  const [previousEmployment, setPreviousEmployment] = React.useState(
    initialValues.previousEmployment
  );
  const [previousEmploymentPeriod, setPreviousEmploymentPeriod] =
    React.useState(initialValues.previousEmploymentPeriod);
  const [nationalCategory, setNationalCategory] = React.useState(
    initialValues.nationalCategory
  );
  const [malaysianIcNumber, setMalaysianIcNumber] = React.useState(
    initialValues.malaysianIcNumber
  );
  const [address, setAddress] = React.useState(initialValues.address);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = employeeInfoRecord
      ? { ...initialValues, ...employeeInfoRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setEmployeeBadgeNumber(cleanValues.employeeBadgeNumber);
    setSapNumber(cleanValues.sapNumber);
    setCountryOfOrigin(cleanValues.countryOfOrigin);
    setEducationLevel(cleanValues.educationLevel);
    setAcademicTechnicalQualification(
      cleanValues.academicTechnicalQualification
    );
    setNextOfKin(cleanValues.nextOfKin ?? []);
    setCurrentNextOfKinValue("");
    setInductionBriefing(cleanValues.inductionBriefing);
    setPreviousEmployment(cleanValues.previousEmployment);
    setPreviousEmploymentPeriod(cleanValues.previousEmploymentPeriod);
    setNationalCategory(cleanValues.nationalCategory);
    setMalaysianIcNumber(cleanValues.malaysianIcNumber);
    setAddress(cleanValues.address);
    setErrors({});
  };
  const [employeeInfoRecord, setEmployeeInfoRecord] = React.useState(
    employeeInfoModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getEmployeeInfo.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEmployeeInfo
        : employeeInfoModelProp;
      setEmployeeInfoRecord(record);
    };
    queryData();
  }, [idProp, employeeInfoModelProp]);
  React.useEffect(resetStateValues, [employeeInfoRecord]);
  const [currentNextOfKinValue, setCurrentNextOfKinValue] = React.useState("");
  const nextOfKinRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    employeeBadgeNumber: [{ type: "Required" }],
    sapNumber: [{ type: "Required" }],
    countryOfOrigin: [{ type: "Required" }],
    educationLevel: [{ type: "Required" }],
    academicTechnicalQualification: [{ type: "Required" }],
    nextOfKin: [{ type: "Required" }],
    inductionBriefing: [{ type: "Required" }],
    previousEmployment: [{ type: "Required" }],
    previousEmploymentPeriod: [{ type: "Required" }],
    nationalCategory: [{ type: "Required" }],
    malaysianIcNumber: [],
    address: [{ type: "Required" }],
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
          employeeBadgeNumber,
          sapNumber,
          countryOfOrigin,
          educationLevel,
          academicTechnicalQualification,
          nextOfKin,
          inductionBriefing,
          previousEmployment,
          previousEmploymentPeriod,
          nationalCategory,
          malaysianIcNumber: malaysianIcNumber ?? null,
          address,
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
            query: updateEmployeeInfo.replaceAll("__typename", ""),
            variables: {
              input: {
                id: employeeInfoRecord.id,
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
      {...getOverrideProps(overrides, "EmployeeInfoUpdateForm")}
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
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber,
              address,
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
        label="Employee badge number"
        isRequired={true}
        isReadOnly={false}
        value={employeeBadgeNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber: value,
              sapNumber,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber,
              address,
            };
            const result = onChange(modelFields);
            value = result?.employeeBadgeNumber ?? value;
          }
          if (errors.employeeBadgeNumber?.hasError) {
            runValidationTasks("employeeBadgeNumber", value);
          }
          setEmployeeBadgeNumber(value);
        }}
        onBlur={() =>
          runValidationTasks("employeeBadgeNumber", employeeBadgeNumber)
        }
        errorMessage={errors.employeeBadgeNumber?.errorMessage}
        hasError={errors.employeeBadgeNumber?.hasError}
        {...getOverrideProps(overrides, "employeeBadgeNumber")}
      ></TextField>
      <TextField
        label="Sap number"
        isRequired={true}
        isReadOnly={false}
        value={sapNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber: value,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber,
              address,
            };
            const result = onChange(modelFields);
            value = result?.sapNumber ?? value;
          }
          if (errors.sapNumber?.hasError) {
            runValidationTasks("sapNumber", value);
          }
          setSapNumber(value);
        }}
        onBlur={() => runValidationTasks("sapNumber", sapNumber)}
        errorMessage={errors.sapNumber?.errorMessage}
        hasError={errors.sapNumber?.hasError}
        {...getOverrideProps(overrides, "sapNumber")}
      ></TextField>
      <TextField
        label="Country of origin"
        isRequired={true}
        isReadOnly={false}
        value={countryOfOrigin}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin: value,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber,
              address,
            };
            const result = onChange(modelFields);
            value = result?.countryOfOrigin ?? value;
          }
          if (errors.countryOfOrigin?.hasError) {
            runValidationTasks("countryOfOrigin", value);
          }
          setCountryOfOrigin(value);
        }}
        onBlur={() => runValidationTasks("countryOfOrigin", countryOfOrigin)}
        errorMessage={errors.countryOfOrigin?.errorMessage}
        hasError={errors.countryOfOrigin?.hasError}
        {...getOverrideProps(overrides, "countryOfOrigin")}
      ></TextField>
      <TextField
        label="Education level"
        isRequired={true}
        isReadOnly={false}
        value={educationLevel}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin,
              educationLevel: value,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber,
              address,
            };
            const result = onChange(modelFields);
            value = result?.educationLevel ?? value;
          }
          if (errors.educationLevel?.hasError) {
            runValidationTasks("educationLevel", value);
          }
          setEducationLevel(value);
        }}
        onBlur={() => runValidationTasks("educationLevel", educationLevel)}
        errorMessage={errors.educationLevel?.errorMessage}
        hasError={errors.educationLevel?.hasError}
        {...getOverrideProps(overrides, "educationLevel")}
      ></TextField>
      <TextField
        label="Academic technical qualification"
        isRequired={true}
        isReadOnly={false}
        value={academicTechnicalQualification}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification: value,
              nextOfKin,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber,
              address,
            };
            const result = onChange(modelFields);
            value = result?.academicTechnicalQualification ?? value;
          }
          if (errors.academicTechnicalQualification?.hasError) {
            runValidationTasks("academicTechnicalQualification", value);
          }
          setAcademicTechnicalQualification(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "academicTechnicalQualification",
            academicTechnicalQualification
          )
        }
        errorMessage={errors.academicTechnicalQualification?.errorMessage}
        hasError={errors.academicTechnicalQualification?.hasError}
        {...getOverrideProps(overrides, "academicTechnicalQualification")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin: values,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber,
              address,
            };
            const result = onChange(modelFields);
            values = result?.nextOfKin ?? values;
          }
          setNextOfKin(values);
          setCurrentNextOfKinValue("");
        }}
        currentFieldValue={currentNextOfKinValue}
        label={"Next of kin"}
        items={nextOfKin}
        hasError={errors?.nextOfKin?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("nextOfKin", currentNextOfKinValue)
        }
        errorMessage={errors?.nextOfKin?.errorMessage}
        setFieldValue={setCurrentNextOfKinValue}
        inputFieldRef={nextOfKinRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Next of kin"
          isRequired={true}
          isReadOnly={false}
          value={currentNextOfKinValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.nextOfKin?.hasError) {
              runValidationTasks("nextOfKin", value);
            }
            setCurrentNextOfKinValue(value);
          }}
          onBlur={() => runValidationTasks("nextOfKin", currentNextOfKinValue)}
          errorMessage={errors.nextOfKin?.errorMessage}
          hasError={errors.nextOfKin?.hasError}
          ref={nextOfKinRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "nextOfKin")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Induction briefing"
        isRequired={true}
        isReadOnly={false}
        value={inductionBriefing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing: value,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber,
              address,
            };
            const result = onChange(modelFields);
            value = result?.inductionBriefing ?? value;
          }
          if (errors.inductionBriefing?.hasError) {
            runValidationTasks("inductionBriefing", value);
          }
          setInductionBriefing(value);
        }}
        onBlur={() =>
          runValidationTasks("inductionBriefing", inductionBriefing)
        }
        errorMessage={errors.inductionBriefing?.errorMessage}
        hasError={errors.inductionBriefing?.hasError}
        {...getOverrideProps(overrides, "inductionBriefing")}
      ></TextField>
      <TextField
        label="Previous employment"
        isRequired={true}
        isReadOnly={false}
        value={previousEmployment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing,
              previousEmployment: value,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber,
              address,
            };
            const result = onChange(modelFields);
            value = result?.previousEmployment ?? value;
          }
          if (errors.previousEmployment?.hasError) {
            runValidationTasks("previousEmployment", value);
          }
          setPreviousEmployment(value);
        }}
        onBlur={() =>
          runValidationTasks("previousEmployment", previousEmployment)
        }
        errorMessage={errors.previousEmployment?.errorMessage}
        hasError={errors.previousEmployment?.hasError}
        {...getOverrideProps(overrides, "previousEmployment")}
      ></TextField>
      <TextField
        label="Previous employment period"
        isRequired={true}
        isReadOnly={false}
        value={previousEmploymentPeriod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod: value,
              nationalCategory,
              malaysianIcNumber,
              address,
            };
            const result = onChange(modelFields);
            value = result?.previousEmploymentPeriod ?? value;
          }
          if (errors.previousEmploymentPeriod?.hasError) {
            runValidationTasks("previousEmploymentPeriod", value);
          }
          setPreviousEmploymentPeriod(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "previousEmploymentPeriod",
            previousEmploymentPeriod
          )
        }
        errorMessage={errors.previousEmploymentPeriod?.errorMessage}
        hasError={errors.previousEmploymentPeriod?.hasError}
        {...getOverrideProps(overrides, "previousEmploymentPeriod")}
      ></TextField>
      <TextField
        label="National category"
        isRequired={true}
        isReadOnly={false}
        value={nationalCategory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory: value,
              malaysianIcNumber,
              address,
            };
            const result = onChange(modelFields);
            value = result?.nationalCategory ?? value;
          }
          if (errors.nationalCategory?.hasError) {
            runValidationTasks("nationalCategory", value);
          }
          setNationalCategory(value);
        }}
        onBlur={() => runValidationTasks("nationalCategory", nationalCategory)}
        errorMessage={errors.nationalCategory?.errorMessage}
        hasError={errors.nationalCategory?.hasError}
        {...getOverrideProps(overrides, "nationalCategory")}
      ></TextField>
      <TextField
        label="Malaysian ic number"
        isRequired={false}
        isReadOnly={false}
        value={malaysianIcNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber: value,
              address,
            };
            const result = onChange(modelFields);
            value = result?.malaysianIcNumber ?? value;
          }
          if (errors.malaysianIcNumber?.hasError) {
            runValidationTasks("malaysianIcNumber", value);
          }
          setMalaysianIcNumber(value);
        }}
        onBlur={() =>
          runValidationTasks("malaysianIcNumber", malaysianIcNumber)
        }
        errorMessage={errors.malaysianIcNumber?.errorMessage}
        hasError={errors.malaysianIcNumber?.hasError}
        {...getOverrideProps(overrides, "malaysianIcNumber")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={true}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              employeeBadgeNumber,
              sapNumber,
              countryOfOrigin,
              educationLevel,
              academicTechnicalQualification,
              nextOfKin,
              inductionBriefing,
              previousEmployment,
              previousEmploymentPeriod,
              nationalCategory,
              malaysianIcNumber,
              address: value,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
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
          isDisabled={!(idProp || employeeInfoModelProp)}
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
              !(idProp || employeeInfoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
