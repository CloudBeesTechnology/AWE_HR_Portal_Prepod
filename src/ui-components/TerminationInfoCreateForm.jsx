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
import { createTerminationInfo } from "../graphql/mutations";
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
export default function TerminationInfoCreateForm(props) {
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
    resignDate: "",
    resignNotProb: "",
    otherResignNotProb: "",
    resignNotConf: "",
    otherResignNotConf: "",
    reasonResign: "",
    reasonTerminate: "",
    termiDate: "",
    termiNotProb: "",
    otherTermiNotProb: "",
    termiNotConf: "",
    otherTermiNotConf: "",
    WIContract: [],
    WIProbation: [],
    WIResignation: [],
    WITermination: [],
    WILeaveEntitle: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [resignDate, setResignDate] = React.useState(initialValues.resignDate);
  const [resignNotProb, setResignNotProb] = React.useState(
    initialValues.resignNotProb
  );
  const [otherResignNotProb, setOtherResignNotProb] = React.useState(
    initialValues.otherResignNotProb
  );
  const [resignNotConf, setResignNotConf] = React.useState(
    initialValues.resignNotConf
  );
  const [otherResignNotConf, setOtherResignNotConf] = React.useState(
    initialValues.otherResignNotConf
  );
  const [reasonResign, setReasonResign] = React.useState(
    initialValues.reasonResign
  );
  const [reasonTerminate, setReasonTerminate] = React.useState(
    initialValues.reasonTerminate
  );
  const [termiDate, setTermiDate] = React.useState(initialValues.termiDate);
  const [termiNotProb, setTermiNotProb] = React.useState(
    initialValues.termiNotProb
  );
  const [otherTermiNotProb, setOtherTermiNotProb] = React.useState(
    initialValues.otherTermiNotProb
  );
  const [termiNotConf, setTermiNotConf] = React.useState(
    initialValues.termiNotConf
  );
  const [otherTermiNotConf, setOtherTermiNotConf] = React.useState(
    initialValues.otherTermiNotConf
  );
  const [WIContract, setWIContract] = React.useState(initialValues.WIContract);
  const [WIProbation, setWIProbation] = React.useState(
    initialValues.WIProbation
  );
  const [WIResignation, setWIResignation] = React.useState(
    initialValues.WIResignation
  );
  const [WITermination, setWITermination] = React.useState(
    initialValues.WITermination
  );
  const [WILeaveEntitle, setWILeaveEntitle] = React.useState(
    initialValues.WILeaveEntitle
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setResignDate(initialValues.resignDate);
    setResignNotProb(initialValues.resignNotProb);
    setOtherResignNotProb(initialValues.otherResignNotProb);
    setResignNotConf(initialValues.resignNotConf);
    setOtherResignNotConf(initialValues.otherResignNotConf);
    setReasonResign(initialValues.reasonResign);
    setReasonTerminate(initialValues.reasonTerminate);
    setTermiDate(initialValues.termiDate);
    setTermiNotProb(initialValues.termiNotProb);
    setOtherTermiNotProb(initialValues.otherTermiNotProb);
    setTermiNotConf(initialValues.termiNotConf);
    setOtherTermiNotConf(initialValues.otherTermiNotConf);
    setWIContract(initialValues.WIContract);
    setCurrentWIContractValue("");
    setWIProbation(initialValues.WIProbation);
    setCurrentWIProbationValue("");
    setWIResignation(initialValues.WIResignation);
    setCurrentWIResignationValue("");
    setWITermination(initialValues.WITermination);
    setCurrentWITerminationValue("");
    setWILeaveEntitle(initialValues.WILeaveEntitle);
    setCurrentWILeaveEntitleValue("");
    setErrors({});
  };
  const [currentWIContractValue, setCurrentWIContractValue] =
    React.useState("");
  const WIContractRef = React.createRef();
  const [currentWIProbationValue, setCurrentWIProbationValue] =
    React.useState("");
  const WIProbationRef = React.createRef();
  const [currentWIResignationValue, setCurrentWIResignationValue] =
    React.useState("");
  const WIResignationRef = React.createRef();
  const [currentWITerminationValue, setCurrentWITerminationValue] =
    React.useState("");
  const WITerminationRef = React.createRef();
  const [currentWILeaveEntitleValue, setCurrentWILeaveEntitleValue] =
    React.useState("");
  const WILeaveEntitleRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    resignDate: [],
    resignNotProb: [],
    otherResignNotProb: [],
    resignNotConf: [],
    otherResignNotConf: [],
    reasonResign: [],
    reasonTerminate: [],
    termiDate: [],
    termiNotProb: [],
    otherTermiNotProb: [],
    termiNotConf: [],
    otherTermiNotConf: [],
    WIContract: [{ type: "JSON" }],
    WIProbation: [{ type: "JSON" }],
    WIResignation: [{ type: "JSON" }],
    WITermination: [{ type: "JSON" }],
    WILeaveEntitle: [{ type: "JSON" }],
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
          resignDate,
          resignNotProb,
          otherResignNotProb,
          resignNotConf,
          otherResignNotConf,
          reasonResign,
          reasonTerminate,
          termiDate,
          termiNotProb,
          otherTermiNotProb,
          termiNotConf,
          otherTermiNotConf,
          WIContract,
          WIProbation,
          WIResignation,
          WITermination,
          WILeaveEntitle,
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
            query: createTerminationInfo.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "TerminationInfoCreateForm")}
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
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
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
        label="Resign date"
        isRequired={false}
        isReadOnly={false}
        value={resignDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate: value,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.resignDate ?? value;
          }
          if (errors.resignDate?.hasError) {
            runValidationTasks("resignDate", value);
          }
          setResignDate(value);
        }}
        onBlur={() => runValidationTasks("resignDate", resignDate)}
        errorMessage={errors.resignDate?.errorMessage}
        hasError={errors.resignDate?.hasError}
        {...getOverrideProps(overrides, "resignDate")}
      ></TextField>
      <TextField
        label="Resign not prob"
        isRequired={false}
        isReadOnly={false}
        value={resignNotProb}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb: value,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.resignNotProb ?? value;
          }
          if (errors.resignNotProb?.hasError) {
            runValidationTasks("resignNotProb", value);
          }
          setResignNotProb(value);
        }}
        onBlur={() => runValidationTasks("resignNotProb", resignNotProb)}
        errorMessage={errors.resignNotProb?.errorMessage}
        hasError={errors.resignNotProb?.hasError}
        {...getOverrideProps(overrides, "resignNotProb")}
      ></TextField>
      <TextField
        label="Other resign not prob"
        isRequired={false}
        isReadOnly={false}
        value={otherResignNotProb}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb: value,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.otherResignNotProb ?? value;
          }
          if (errors.otherResignNotProb?.hasError) {
            runValidationTasks("otherResignNotProb", value);
          }
          setOtherResignNotProb(value);
        }}
        onBlur={() =>
          runValidationTasks("otherResignNotProb", otherResignNotProb)
        }
        errorMessage={errors.otherResignNotProb?.errorMessage}
        hasError={errors.otherResignNotProb?.hasError}
        {...getOverrideProps(overrides, "otherResignNotProb")}
      ></TextField>
      <TextField
        label="Resign not conf"
        isRequired={false}
        isReadOnly={false}
        value={resignNotConf}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf: value,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.resignNotConf ?? value;
          }
          if (errors.resignNotConf?.hasError) {
            runValidationTasks("resignNotConf", value);
          }
          setResignNotConf(value);
        }}
        onBlur={() => runValidationTasks("resignNotConf", resignNotConf)}
        errorMessage={errors.resignNotConf?.errorMessage}
        hasError={errors.resignNotConf?.hasError}
        {...getOverrideProps(overrides, "resignNotConf")}
      ></TextField>
      <TextField
        label="Other resign not conf"
        isRequired={false}
        isReadOnly={false}
        value={otherResignNotConf}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf: value,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.otherResignNotConf ?? value;
          }
          if (errors.otherResignNotConf?.hasError) {
            runValidationTasks("otherResignNotConf", value);
          }
          setOtherResignNotConf(value);
        }}
        onBlur={() =>
          runValidationTasks("otherResignNotConf", otherResignNotConf)
        }
        errorMessage={errors.otherResignNotConf?.errorMessage}
        hasError={errors.otherResignNotConf?.hasError}
        {...getOverrideProps(overrides, "otherResignNotConf")}
      ></TextField>
      <TextField
        label="Reason resign"
        isRequired={false}
        isReadOnly={false}
        value={reasonResign}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign: value,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.reasonResign ?? value;
          }
          if (errors.reasonResign?.hasError) {
            runValidationTasks("reasonResign", value);
          }
          setReasonResign(value);
        }}
        onBlur={() => runValidationTasks("reasonResign", reasonResign)}
        errorMessage={errors.reasonResign?.errorMessage}
        hasError={errors.reasonResign?.hasError}
        {...getOverrideProps(overrides, "reasonResign")}
      ></TextField>
      <TextField
        label="Reason terminate"
        isRequired={false}
        isReadOnly={false}
        value={reasonTerminate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate: value,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.reasonTerminate ?? value;
          }
          if (errors.reasonTerminate?.hasError) {
            runValidationTasks("reasonTerminate", value);
          }
          setReasonTerminate(value);
        }}
        onBlur={() => runValidationTasks("reasonTerminate", reasonTerminate)}
        errorMessage={errors.reasonTerminate?.errorMessage}
        hasError={errors.reasonTerminate?.hasError}
        {...getOverrideProps(overrides, "reasonTerminate")}
      ></TextField>
      <TextField
        label="Termi date"
        isRequired={false}
        isReadOnly={false}
        value={termiDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate: value,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.termiDate ?? value;
          }
          if (errors.termiDate?.hasError) {
            runValidationTasks("termiDate", value);
          }
          setTermiDate(value);
        }}
        onBlur={() => runValidationTasks("termiDate", termiDate)}
        errorMessage={errors.termiDate?.errorMessage}
        hasError={errors.termiDate?.hasError}
        {...getOverrideProps(overrides, "termiDate")}
      ></TextField>
      <TextField
        label="Termi not prob"
        isRequired={false}
        isReadOnly={false}
        value={termiNotProb}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb: value,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.termiNotProb ?? value;
          }
          if (errors.termiNotProb?.hasError) {
            runValidationTasks("termiNotProb", value);
          }
          setTermiNotProb(value);
        }}
        onBlur={() => runValidationTasks("termiNotProb", termiNotProb)}
        errorMessage={errors.termiNotProb?.errorMessage}
        hasError={errors.termiNotProb?.hasError}
        {...getOverrideProps(overrides, "termiNotProb")}
      ></TextField>
      <TextField
        label="Other termi not prob"
        isRequired={false}
        isReadOnly={false}
        value={otherTermiNotProb}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb: value,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.otherTermiNotProb ?? value;
          }
          if (errors.otherTermiNotProb?.hasError) {
            runValidationTasks("otherTermiNotProb", value);
          }
          setOtherTermiNotProb(value);
        }}
        onBlur={() =>
          runValidationTasks("otherTermiNotProb", otherTermiNotProb)
        }
        errorMessage={errors.otherTermiNotProb?.errorMessage}
        hasError={errors.otherTermiNotProb?.hasError}
        {...getOverrideProps(overrides, "otherTermiNotProb")}
      ></TextField>
      <TextField
        label="Termi not conf"
        isRequired={false}
        isReadOnly={false}
        value={termiNotConf}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf: value,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.termiNotConf ?? value;
          }
          if (errors.termiNotConf?.hasError) {
            runValidationTasks("termiNotConf", value);
          }
          setTermiNotConf(value);
        }}
        onBlur={() => runValidationTasks("termiNotConf", termiNotConf)}
        errorMessage={errors.termiNotConf?.errorMessage}
        hasError={errors.termiNotConf?.hasError}
        {...getOverrideProps(overrides, "termiNotConf")}
      ></TextField>
      <TextField
        label="Other termi not conf"
        isRequired={false}
        isReadOnly={false}
        value={otherTermiNotConf}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf: value,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            value = result?.otherTermiNotConf ?? value;
          }
          if (errors.otherTermiNotConf?.hasError) {
            runValidationTasks("otherTermiNotConf", value);
          }
          setOtherTermiNotConf(value);
        }}
        onBlur={() =>
          runValidationTasks("otherTermiNotConf", otherTermiNotConf)
        }
        errorMessage={errors.otherTermiNotConf?.errorMessage}
        hasError={errors.otherTermiNotConf?.hasError}
        {...getOverrideProps(overrides, "otherTermiNotConf")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract: values,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            values = result?.WIContract ?? values;
          }
          setWIContract(values);
          setCurrentWIContractValue("");
        }}
        currentFieldValue={currentWIContractValue}
        label={"Wi contract"}
        items={WIContract}
        hasError={errors?.WIContract?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("WIContract", currentWIContractValue)
        }
        errorMessage={errors?.WIContract?.errorMessage}
        setFieldValue={setCurrentWIContractValue}
        inputFieldRef={WIContractRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Wi contract"
          isRequired={false}
          isReadOnly={false}
          value={currentWIContractValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.WIContract?.hasError) {
              runValidationTasks("WIContract", value);
            }
            setCurrentWIContractValue(value);
          }}
          onBlur={() =>
            runValidationTasks("WIContract", currentWIContractValue)
          }
          errorMessage={errors.WIContract?.errorMessage}
          hasError={errors.WIContract?.hasError}
          ref={WIContractRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "WIContract")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation: values,
              WIResignation,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            values = result?.WIProbation ?? values;
          }
          setWIProbation(values);
          setCurrentWIProbationValue("");
        }}
        currentFieldValue={currentWIProbationValue}
        label={"Wi probation"}
        items={WIProbation}
        hasError={errors?.WIProbation?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("WIProbation", currentWIProbationValue)
        }
        errorMessage={errors?.WIProbation?.errorMessage}
        setFieldValue={setCurrentWIProbationValue}
        inputFieldRef={WIProbationRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Wi probation"
          isRequired={false}
          isReadOnly={false}
          value={currentWIProbationValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.WIProbation?.hasError) {
              runValidationTasks("WIProbation", value);
            }
            setCurrentWIProbationValue(value);
          }}
          onBlur={() =>
            runValidationTasks("WIProbation", currentWIProbationValue)
          }
          errorMessage={errors.WIProbation?.errorMessage}
          hasError={errors.WIProbation?.hasError}
          ref={WIProbationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "WIProbation")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation: values,
              WITermination,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            values = result?.WIResignation ?? values;
          }
          setWIResignation(values);
          setCurrentWIResignationValue("");
        }}
        currentFieldValue={currentWIResignationValue}
        label={"Wi resignation"}
        items={WIResignation}
        hasError={errors?.WIResignation?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("WIResignation", currentWIResignationValue)
        }
        errorMessage={errors?.WIResignation?.errorMessage}
        setFieldValue={setCurrentWIResignationValue}
        inputFieldRef={WIResignationRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Wi resignation"
          isRequired={false}
          isReadOnly={false}
          value={currentWIResignationValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.WIResignation?.hasError) {
              runValidationTasks("WIResignation", value);
            }
            setCurrentWIResignationValue(value);
          }}
          onBlur={() =>
            runValidationTasks("WIResignation", currentWIResignationValue)
          }
          errorMessage={errors.WIResignation?.errorMessage}
          hasError={errors.WIResignation?.hasError}
          ref={WIResignationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "WIResignation")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination: values,
              WILeaveEntitle,
            };
            const result = onChange(modelFields);
            values = result?.WITermination ?? values;
          }
          setWITermination(values);
          setCurrentWITerminationValue("");
        }}
        currentFieldValue={currentWITerminationValue}
        label={"Wi termination"}
        items={WITermination}
        hasError={errors?.WITermination?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("WITermination", currentWITerminationValue)
        }
        errorMessage={errors?.WITermination?.errorMessage}
        setFieldValue={setCurrentWITerminationValue}
        inputFieldRef={WITerminationRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Wi termination"
          isRequired={false}
          isReadOnly={false}
          value={currentWITerminationValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.WITermination?.hasError) {
              runValidationTasks("WITermination", value);
            }
            setCurrentWITerminationValue(value);
          }}
          onBlur={() =>
            runValidationTasks("WITermination", currentWITerminationValue)
          }
          errorMessage={errors.WITermination?.errorMessage}
          hasError={errors.WITermination?.hasError}
          ref={WITerminationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "WITermination")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              resignDate,
              resignNotProb,
              otherResignNotProb,
              resignNotConf,
              otherResignNotConf,
              reasonResign,
              reasonTerminate,
              termiDate,
              termiNotProb,
              otherTermiNotProb,
              termiNotConf,
              otherTermiNotConf,
              WIContract,
              WIProbation,
              WIResignation,
              WITermination,
              WILeaveEntitle: values,
            };
            const result = onChange(modelFields);
            values = result?.WILeaveEntitle ?? values;
          }
          setWILeaveEntitle(values);
          setCurrentWILeaveEntitleValue("");
        }}
        currentFieldValue={currentWILeaveEntitleValue}
        label={"Wi leave entitle"}
        items={WILeaveEntitle}
        hasError={errors?.WILeaveEntitle?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("WILeaveEntitle", currentWILeaveEntitleValue)
        }
        errorMessage={errors?.WILeaveEntitle?.errorMessage}
        setFieldValue={setCurrentWILeaveEntitleValue}
        inputFieldRef={WILeaveEntitleRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Wi leave entitle"
          isRequired={false}
          isReadOnly={false}
          value={currentWILeaveEntitleValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.WILeaveEntitle?.hasError) {
              runValidationTasks("WILeaveEntitle", value);
            }
            setCurrentWILeaveEntitleValue(value);
          }}
          onBlur={() =>
            runValidationTasks("WILeaveEntitle", currentWILeaveEntitleValue)
          }
          errorMessage={errors.WILeaveEntitle?.errorMessage}
          hasError={errors.WILeaveEntitle?.hasError}
          ref={WILeaveEntitleRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "WILeaveEntitle")}
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
