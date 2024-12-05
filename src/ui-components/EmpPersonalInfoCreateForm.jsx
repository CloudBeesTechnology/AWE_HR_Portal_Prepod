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
import { createEmpPersonalInfo } from "../graphql/mutations";
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
export default function EmpPersonalInfoCreateForm(props) {
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
    age: "",
    aTQualify: "",
    alternateNo: "",
    agent: [],
    bankName: "",
    bankAccNo: "",
    contactNo: [],
    cob: "",
    contractType: [],
    ctryOfOrigin: "",
    chinese: "",
    dob: "",
    educLevel: "",
    email: "",
    eduDetails: [],
    empBadgeNo: "",
    empType: [],
    familyDetails: [],
    gender: "",
    lang: "",
    marital: "",
    name: "",
    officialEmail: "",
    oCOfOrigin: "",
    profilePhoto: "",
    permanentAddress: [],
    position: [],
    sapNo: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [age, setAge] = React.useState(initialValues.age);
  const [aTQualify, setATQualify] = React.useState(initialValues.aTQualify);
  const [alternateNo, setAlternateNo] = React.useState(
    initialValues.alternateNo
  );
  const [agent, setAgent] = React.useState(initialValues.agent);
  const [bankName, setBankName] = React.useState(initialValues.bankName);
  const [bankAccNo, setBankAccNo] = React.useState(initialValues.bankAccNo);
  const [contactNo, setContactNo] = React.useState(initialValues.contactNo);
  const [cob, setCob] = React.useState(initialValues.cob);
  const [contractType, setContractType] = React.useState(
    initialValues.contractType
  );
  const [ctryOfOrigin, setCtryOfOrigin] = React.useState(
    initialValues.ctryOfOrigin
  );
  const [chinese, setChinese] = React.useState(initialValues.chinese);
  const [dob, setDob] = React.useState(initialValues.dob);
  const [educLevel, setEducLevel] = React.useState(initialValues.educLevel);
  const [email, setEmail] = React.useState(initialValues.email);
  const [eduDetails, setEduDetails] = React.useState(initialValues.eduDetails);
  const [empBadgeNo, setEmpBadgeNo] = React.useState(initialValues.empBadgeNo);
  const [empType, setEmpType] = React.useState(initialValues.empType);
  const [familyDetails, setFamilyDetails] = React.useState(
    initialValues.familyDetails
  );
  const [gender, setGender] = React.useState(initialValues.gender);
  const [lang, setLang] = React.useState(initialValues.lang);
  const [marital, setMarital] = React.useState(initialValues.marital);
  const [name, setName] = React.useState(initialValues.name);
  const [officialEmail, setOfficialEmail] = React.useState(
    initialValues.officialEmail
  );
  const [oCOfOrigin, setOCOfOrigin] = React.useState(initialValues.oCOfOrigin);
  const [profilePhoto, setProfilePhoto] = React.useState(
    initialValues.profilePhoto
  );
  const [permanentAddress, setPermanentAddress] = React.useState(
    initialValues.permanentAddress
  );
  const [position, setPosition] = React.useState(initialValues.position);
  const [sapNo, setSapNo] = React.useState(initialValues.sapNo);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setAge(initialValues.age);
    setATQualify(initialValues.aTQualify);
    setAlternateNo(initialValues.alternateNo);
    setAgent(initialValues.agent);
    setCurrentAgentValue("");
    setBankName(initialValues.bankName);
    setBankAccNo(initialValues.bankAccNo);
    setContactNo(initialValues.contactNo);
    setCurrentContactNoValue("");
    setCob(initialValues.cob);
    setContractType(initialValues.contractType);
    setCurrentContractTypeValue("");
    setCtryOfOrigin(initialValues.ctryOfOrigin);
    setChinese(initialValues.chinese);
    setDob(initialValues.dob);
    setEducLevel(initialValues.educLevel);
    setEmail(initialValues.email);
    setEduDetails(initialValues.eduDetails);
    setCurrentEduDetailsValue("");
    setEmpBadgeNo(initialValues.empBadgeNo);
    setEmpType(initialValues.empType);
    setCurrentEmpTypeValue("");
    setFamilyDetails(initialValues.familyDetails);
    setCurrentFamilyDetailsValue("");
    setGender(initialValues.gender);
    setLang(initialValues.lang);
    setMarital(initialValues.marital);
    setName(initialValues.name);
    setOfficialEmail(initialValues.officialEmail);
    setOCOfOrigin(initialValues.oCOfOrigin);
    setProfilePhoto(initialValues.profilePhoto);
    setPermanentAddress(initialValues.permanentAddress);
    setCurrentPermanentAddressValue("");
    setPosition(initialValues.position);
    setCurrentPositionValue("");
    setSapNo(initialValues.sapNo);
    setErrors({});
  };
  const [currentAgentValue, setCurrentAgentValue] = React.useState("");
  const agentRef = React.createRef();
  const [currentContactNoValue, setCurrentContactNoValue] = React.useState("");
  const contactNoRef = React.createRef();
  const [currentContractTypeValue, setCurrentContractTypeValue] =
    React.useState("");
  const contractTypeRef = React.createRef();
  const [currentEduDetailsValue, setCurrentEduDetailsValue] =
    React.useState("");
  const eduDetailsRef = React.createRef();
  const [currentEmpTypeValue, setCurrentEmpTypeValue] = React.useState("");
  const empTypeRef = React.createRef();
  const [currentFamilyDetailsValue, setCurrentFamilyDetailsValue] =
    React.useState("");
  const familyDetailsRef = React.createRef();
  const [currentPermanentAddressValue, setCurrentPermanentAddressValue] =
    React.useState("");
  const permanentAddressRef = React.createRef();
  const [currentPositionValue, setCurrentPositionValue] = React.useState("");
  const positionRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    age: [],
    aTQualify: [],
    alternateNo: [],
    agent: [],
    bankName: [],
    bankAccNo: [],
    contactNo: [],
    cob: [],
    contractType: [],
    ctryOfOrigin: [],
    chinese: [],
    dob: [],
    educLevel: [],
    email: [],
    eduDetails: [{ type: "JSON" }],
    empBadgeNo: [],
    empType: [],
    familyDetails: [{ type: "JSON" }],
    gender: [],
    lang: [],
    marital: [],
    name: [],
    officialEmail: [],
    oCOfOrigin: [],
    profilePhoto: [],
    permanentAddress: [],
    position: [],
    sapNo: [],
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
          age,
          aTQualify,
          alternateNo,
          agent,
          bankName,
          bankAccNo,
          contactNo,
          cob,
          contractType,
          ctryOfOrigin,
          chinese,
          dob,
          educLevel,
          email,
          eduDetails,
          empBadgeNo,
          empType,
          familyDetails,
          gender,
          lang,
          marital,
          name,
          officialEmail,
          oCOfOrigin,
          profilePhoto,
          permanentAddress,
          position,
          sapNo,
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
            query: createEmpPersonalInfo.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "EmpPersonalInfoCreateForm")}
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
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
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
        label="Age"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              empID,
              age: value,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.age ?? value;
          }
          if (errors.age?.hasError) {
            runValidationTasks("age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("age", age)}
        errorMessage={errors.age?.errorMessage}
        hasError={errors.age?.hasError}
        {...getOverrideProps(overrides, "age")}
      ></TextField>
      <TextField
        label="A t qualify"
        isRequired={false}
        isReadOnly={false}
        value={aTQualify}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify: value,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.aTQualify ?? value;
          }
          if (errors.aTQualify?.hasError) {
            runValidationTasks("aTQualify", value);
          }
          setATQualify(value);
        }}
        onBlur={() => runValidationTasks("aTQualify", aTQualify)}
        errorMessage={errors.aTQualify?.errorMessage}
        hasError={errors.aTQualify?.hasError}
        {...getOverrideProps(overrides, "aTQualify")}
      ></TextField>
      <TextField
        label="Alternate no"
        isRequired={false}
        isReadOnly={false}
        value={alternateNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo: value,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.alternateNo ?? value;
          }
          if (errors.alternateNo?.hasError) {
            runValidationTasks("alternateNo", value);
          }
          setAlternateNo(value);
        }}
        onBlur={() => runValidationTasks("alternateNo", alternateNo)}
        errorMessage={errors.alternateNo?.errorMessage}
        hasError={errors.alternateNo?.hasError}
        {...getOverrideProps(overrides, "alternateNo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent: values,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            values = result?.agent ?? values;
          }
          setAgent(values);
          setCurrentAgentValue("");
        }}
        currentFieldValue={currentAgentValue}
        label={"Agent"}
        items={agent}
        hasError={errors?.agent?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("agent", currentAgentValue)
        }
        errorMessage={errors?.agent?.errorMessage}
        setFieldValue={setCurrentAgentValue}
        inputFieldRef={agentRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Agent"
          isRequired={false}
          isReadOnly={false}
          value={currentAgentValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.agent?.hasError) {
              runValidationTasks("agent", value);
            }
            setCurrentAgentValue(value);
          }}
          onBlur={() => runValidationTasks("agent", currentAgentValue)}
          errorMessage={errors.agent?.errorMessage}
          hasError={errors.agent?.hasError}
          ref={agentRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "agent")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Bank name"
        isRequired={false}
        isReadOnly={false}
        value={bankName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName: value,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.bankName ?? value;
          }
          if (errors.bankName?.hasError) {
            runValidationTasks("bankName", value);
          }
          setBankName(value);
        }}
        onBlur={() => runValidationTasks("bankName", bankName)}
        errorMessage={errors.bankName?.errorMessage}
        hasError={errors.bankName?.hasError}
        {...getOverrideProps(overrides, "bankName")}
      ></TextField>
      <TextField
        label="Bank acc no"
        isRequired={false}
        isReadOnly={false}
        value={bankAccNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo: value,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.bankAccNo ?? value;
          }
          if (errors.bankAccNo?.hasError) {
            runValidationTasks("bankAccNo", value);
          }
          setBankAccNo(value);
        }}
        onBlur={() => runValidationTasks("bankAccNo", bankAccNo)}
        errorMessage={errors.bankAccNo?.errorMessage}
        hasError={errors.bankAccNo?.hasError}
        {...getOverrideProps(overrides, "bankAccNo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo: values,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            values = result?.contactNo ?? values;
          }
          setContactNo(values);
          setCurrentContactNoValue("");
        }}
        currentFieldValue={currentContactNoValue}
        label={"Contact no"}
        items={contactNo}
        hasError={errors?.contactNo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("contactNo", currentContactNoValue)
        }
        errorMessage={errors?.contactNo?.errorMessage}
        setFieldValue={setCurrentContactNoValue}
        inputFieldRef={contactNoRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Contact no"
          isRequired={false}
          isReadOnly={false}
          value={currentContactNoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.contactNo?.hasError) {
              runValidationTasks("contactNo", value);
            }
            setCurrentContactNoValue(value);
          }}
          onBlur={() => runValidationTasks("contactNo", currentContactNoValue)}
          errorMessage={errors.contactNo?.errorMessage}
          hasError={errors.contactNo?.hasError}
          ref={contactNoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "contactNo")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Cob"
        isRequired={false}
        isReadOnly={false}
        value={cob}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob: value,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.cob ?? value;
          }
          if (errors.cob?.hasError) {
            runValidationTasks("cob", value);
          }
          setCob(value);
        }}
        onBlur={() => runValidationTasks("cob", cob)}
        errorMessage={errors.cob?.errorMessage}
        hasError={errors.cob?.hasError}
        {...getOverrideProps(overrides, "cob")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType: values,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            values = result?.contractType ?? values;
          }
          setContractType(values);
          setCurrentContractTypeValue("");
        }}
        currentFieldValue={currentContractTypeValue}
        label={"Contract type"}
        items={contractType}
        hasError={errors?.contractType?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("contractType", currentContractTypeValue)
        }
        errorMessage={errors?.contractType?.errorMessage}
        setFieldValue={setCurrentContractTypeValue}
        inputFieldRef={contractTypeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Contract type"
          isRequired={false}
          isReadOnly={false}
          value={currentContractTypeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.contractType?.hasError) {
              runValidationTasks("contractType", value);
            }
            setCurrentContractTypeValue(value);
          }}
          onBlur={() =>
            runValidationTasks("contractType", currentContractTypeValue)
          }
          errorMessage={errors.contractType?.errorMessage}
          hasError={errors.contractType?.hasError}
          ref={contractTypeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "contractType")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Ctry of origin"
        isRequired={false}
        isReadOnly={false}
        value={ctryOfOrigin}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin: value,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.ctryOfOrigin ?? value;
          }
          if (errors.ctryOfOrigin?.hasError) {
            runValidationTasks("ctryOfOrigin", value);
          }
          setCtryOfOrigin(value);
        }}
        onBlur={() => runValidationTasks("ctryOfOrigin", ctryOfOrigin)}
        errorMessage={errors.ctryOfOrigin?.errorMessage}
        hasError={errors.ctryOfOrigin?.hasError}
        {...getOverrideProps(overrides, "ctryOfOrigin")}
      ></TextField>
      <TextField
        label="Chinese"
        isRequired={false}
        isReadOnly={false}
        value={chinese}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese: value,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.chinese ?? value;
          }
          if (errors.chinese?.hasError) {
            runValidationTasks("chinese", value);
          }
          setChinese(value);
        }}
        onBlur={() => runValidationTasks("chinese", chinese)}
        errorMessage={errors.chinese?.errorMessage}
        hasError={errors.chinese?.hasError}
        {...getOverrideProps(overrides, "chinese")}
      ></TextField>
      <TextField
        label="Dob"
        isRequired={false}
        isReadOnly={false}
        value={dob}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob: value,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.dob ?? value;
          }
          if (errors.dob?.hasError) {
            runValidationTasks("dob", value);
          }
          setDob(value);
        }}
        onBlur={() => runValidationTasks("dob", dob)}
        errorMessage={errors.dob?.errorMessage}
        hasError={errors.dob?.hasError}
        {...getOverrideProps(overrides, "dob")}
      ></TextField>
      <TextField
        label="Educ level"
        isRequired={false}
        isReadOnly={false}
        value={educLevel}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel: value,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.educLevel ?? value;
          }
          if (errors.educLevel?.hasError) {
            runValidationTasks("educLevel", value);
          }
          setEducLevel(value);
        }}
        onBlur={() => runValidationTasks("educLevel", educLevel)}
        errorMessage={errors.educLevel?.errorMessage}
        hasError={errors.educLevel?.hasError}
        {...getOverrideProps(overrides, "educLevel")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email: value,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails: values,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            values = result?.eduDetails ?? values;
          }
          setEduDetails(values);
          setCurrentEduDetailsValue("");
        }}
        currentFieldValue={currentEduDetailsValue}
        label={"Edu details"}
        items={eduDetails}
        hasError={errors?.eduDetails?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("eduDetails", currentEduDetailsValue)
        }
        errorMessage={errors?.eduDetails?.errorMessage}
        setFieldValue={setCurrentEduDetailsValue}
        inputFieldRef={eduDetailsRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Edu details"
          isRequired={false}
          isReadOnly={false}
          value={currentEduDetailsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.eduDetails?.hasError) {
              runValidationTasks("eduDetails", value);
            }
            setCurrentEduDetailsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("eduDetails", currentEduDetailsValue)
          }
          errorMessage={errors.eduDetails?.errorMessage}
          hasError={errors.eduDetails?.hasError}
          ref={eduDetailsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "eduDetails")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Emp badge no"
        isRequired={false}
        isReadOnly={false}
        value={empBadgeNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo: value,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.empBadgeNo ?? value;
          }
          if (errors.empBadgeNo?.hasError) {
            runValidationTasks("empBadgeNo", value);
          }
          setEmpBadgeNo(value);
        }}
        onBlur={() => runValidationTasks("empBadgeNo", empBadgeNo)}
        errorMessage={errors.empBadgeNo?.errorMessage}
        hasError={errors.empBadgeNo?.hasError}
        {...getOverrideProps(overrides, "empBadgeNo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType: values,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            values = result?.empType ?? values;
          }
          setEmpType(values);
          setCurrentEmpTypeValue("");
        }}
        currentFieldValue={currentEmpTypeValue}
        label={"Emp type"}
        items={empType}
        hasError={errors?.empType?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("empType", currentEmpTypeValue)
        }
        errorMessage={errors?.empType?.errorMessage}
        setFieldValue={setCurrentEmpTypeValue}
        inputFieldRef={empTypeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Emp type"
          isRequired={false}
          isReadOnly={false}
          value={currentEmpTypeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.empType?.hasError) {
              runValidationTasks("empType", value);
            }
            setCurrentEmpTypeValue(value);
          }}
          onBlur={() => runValidationTasks("empType", currentEmpTypeValue)}
          errorMessage={errors.empType?.errorMessage}
          hasError={errors.empType?.hasError}
          ref={empTypeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "empType")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails: values,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            values = result?.familyDetails ?? values;
          }
          setFamilyDetails(values);
          setCurrentFamilyDetailsValue("");
        }}
        currentFieldValue={currentFamilyDetailsValue}
        label={"Family details"}
        items={familyDetails}
        hasError={errors?.familyDetails?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("familyDetails", currentFamilyDetailsValue)
        }
        errorMessage={errors?.familyDetails?.errorMessage}
        setFieldValue={setCurrentFamilyDetailsValue}
        inputFieldRef={familyDetailsRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Family details"
          isRequired={false}
          isReadOnly={false}
          value={currentFamilyDetailsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.familyDetails?.hasError) {
              runValidationTasks("familyDetails", value);
            }
            setCurrentFamilyDetailsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("familyDetails", currentFamilyDetailsValue)
          }
          errorMessage={errors.familyDetails?.errorMessage}
          hasError={errors.familyDetails?.hasError}
          ref={familyDetailsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "familyDetails")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Gender"
        isRequired={false}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender: value,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      ></TextField>
      <TextField
        label="Lang"
        isRequired={false}
        isReadOnly={false}
        value={lang}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang: value,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.lang ?? value;
          }
          if (errors.lang?.hasError) {
            runValidationTasks("lang", value);
          }
          setLang(value);
        }}
        onBlur={() => runValidationTasks("lang", lang)}
        errorMessage={errors.lang?.errorMessage}
        hasError={errors.lang?.hasError}
        {...getOverrideProps(overrides, "lang")}
      ></TextField>
      <TextField
        label="Marital"
        isRequired={false}
        isReadOnly={false}
        value={marital}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital: value,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.marital ?? value;
          }
          if (errors.marital?.hasError) {
            runValidationTasks("marital", value);
          }
          setMarital(value);
        }}
        onBlur={() => runValidationTasks("marital", marital)}
        errorMessage={errors.marital?.errorMessage}
        hasError={errors.marital?.hasError}
        {...getOverrideProps(overrides, "marital")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name: value,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Official email"
        isRequired={false}
        isReadOnly={false}
        value={officialEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail: value,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.officialEmail ?? value;
          }
          if (errors.officialEmail?.hasError) {
            runValidationTasks("officialEmail", value);
          }
          setOfficialEmail(value);
        }}
        onBlur={() => runValidationTasks("officialEmail", officialEmail)}
        errorMessage={errors.officialEmail?.errorMessage}
        hasError={errors.officialEmail?.hasError}
        {...getOverrideProps(overrides, "officialEmail")}
      ></TextField>
      <TextField
        label="O c of origin"
        isRequired={false}
        isReadOnly={false}
        value={oCOfOrigin}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin: value,
              profilePhoto,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.oCOfOrigin ?? value;
          }
          if (errors.oCOfOrigin?.hasError) {
            runValidationTasks("oCOfOrigin", value);
          }
          setOCOfOrigin(value);
        }}
        onBlur={() => runValidationTasks("oCOfOrigin", oCOfOrigin)}
        errorMessage={errors.oCOfOrigin?.errorMessage}
        hasError={errors.oCOfOrigin?.hasError}
        {...getOverrideProps(overrides, "oCOfOrigin")}
      ></TextField>
      <TextField
        label="Profile photo"
        isRequired={false}
        isReadOnly={false}
        value={profilePhoto}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto: value,
              permanentAddress,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            value = result?.profilePhoto ?? value;
          }
          if (errors.profilePhoto?.hasError) {
            runValidationTasks("profilePhoto", value);
          }
          setProfilePhoto(value);
        }}
        onBlur={() => runValidationTasks("profilePhoto", profilePhoto)}
        errorMessage={errors.profilePhoto?.errorMessage}
        hasError={errors.profilePhoto?.hasError}
        {...getOverrideProps(overrides, "profilePhoto")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress: values,
              position,
              sapNo,
            };
            const result = onChange(modelFields);
            values = result?.permanentAddress ?? values;
          }
          setPermanentAddress(values);
          setCurrentPermanentAddressValue("");
        }}
        currentFieldValue={currentPermanentAddressValue}
        label={"Permanent address"}
        items={permanentAddress}
        hasError={errors?.permanentAddress?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "permanentAddress",
            currentPermanentAddressValue
          )
        }
        errorMessage={errors?.permanentAddress?.errorMessage}
        setFieldValue={setCurrentPermanentAddressValue}
        inputFieldRef={permanentAddressRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Permanent address"
          isRequired={false}
          isReadOnly={false}
          value={currentPermanentAddressValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.permanentAddress?.hasError) {
              runValidationTasks("permanentAddress", value);
            }
            setCurrentPermanentAddressValue(value);
          }}
          onBlur={() =>
            runValidationTasks("permanentAddress", currentPermanentAddressValue)
          }
          errorMessage={errors.permanentAddress?.errorMessage}
          hasError={errors.permanentAddress?.hasError}
          ref={permanentAddressRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "permanentAddress")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position: values,
              sapNo,
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
              age,
              aTQualify,
              alternateNo,
              agent,
              bankName,
              bankAccNo,
              contactNo,
              cob,
              contractType,
              ctryOfOrigin,
              chinese,
              dob,
              educLevel,
              email,
              eduDetails,
              empBadgeNo,
              empType,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              officialEmail,
              oCOfOrigin,
              profilePhoto,
              permanentAddress,
              position,
              sapNo: value,
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
