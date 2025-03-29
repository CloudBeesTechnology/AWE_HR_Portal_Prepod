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
import { getPersonalDetails } from "../graphql/queries";
import { updatePersonalDetails } from "../graphql/mutations";
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
export default function PersonalDetailsUpdateForm(props) {
  const {
    id: idProp,
    personalDetails: personalDetailsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    tempID: "",
    age: "",
    alternateNo: "",
    agent: "",
    bwnIcNo: "",
    bwnIcExpiry: "",
    bwnIcColour: "",
    contactNo: "",
    cob: "",
    contractType: "",
    chinese: "",
    dob: "",
    driveLic: "",
    email: "",
    empType: "",
    eduDetails: [],
    familyDetails: [],
    gender: "",
    lang: "",
    marital: "",
    name: "",
    nationality: "",
    otherNation: "",
    otherRace: "",
    otherReligion: "",
    ppNo: "",
    ppIssued: "",
    ppExpiry: "",
    ppDestinate: "",
    presentAddress: "",
    permanentAddress: "",
    profilePhoto: "",
    position: "",
    race: "",
    religion: "",
    status: "",
    workExperience: [],
    otherLang: "",
  };
  const [tempID, setTempID] = React.useState(initialValues.tempID);
  const [age, setAge] = React.useState(initialValues.age);
  const [alternateNo, setAlternateNo] = React.useState(
    initialValues.alternateNo
  );
  const [agent, setAgent] = React.useState(initialValues.agent);
  const [bwnIcNo, setBwnIcNo] = React.useState(initialValues.bwnIcNo);
  const [bwnIcExpiry, setBwnIcExpiry] = React.useState(
    initialValues.bwnIcExpiry
  );
  const [bwnIcColour, setBwnIcColour] = React.useState(
    initialValues.bwnIcColour
  );
  const [contactNo, setContactNo] = React.useState(initialValues.contactNo);
  const [cob, setCob] = React.useState(initialValues.cob);
  const [contractType, setContractType] = React.useState(
    initialValues.contractType
  );
  const [chinese, setChinese] = React.useState(initialValues.chinese);
  const [dob, setDob] = React.useState(initialValues.dob);
  const [driveLic, setDriveLic] = React.useState(initialValues.driveLic);
  const [email, setEmail] = React.useState(initialValues.email);
  const [empType, setEmpType] = React.useState(initialValues.empType);
  const [eduDetails, setEduDetails] = React.useState(initialValues.eduDetails);
  const [familyDetails, setFamilyDetails] = React.useState(
    initialValues.familyDetails
  );
  const [gender, setGender] = React.useState(initialValues.gender);
  const [lang, setLang] = React.useState(initialValues.lang);
  const [marital, setMarital] = React.useState(initialValues.marital);
  const [name, setName] = React.useState(initialValues.name);
  const [nationality, setNationality] = React.useState(
    initialValues.nationality
  );
  const [otherNation, setOtherNation] = React.useState(
    initialValues.otherNation
  );
  const [otherRace, setOtherRace] = React.useState(initialValues.otherRace);
  const [otherReligion, setOtherReligion] = React.useState(
    initialValues.otherReligion
  );
  const [ppNo, setPpNo] = React.useState(initialValues.ppNo);
  const [ppIssued, setPpIssued] = React.useState(initialValues.ppIssued);
  const [ppExpiry, setPpExpiry] = React.useState(initialValues.ppExpiry);
  const [ppDestinate, setPpDestinate] = React.useState(
    initialValues.ppDestinate
  );
  const [presentAddress, setPresentAddress] = React.useState(
    initialValues.presentAddress
  );
  const [permanentAddress, setPermanentAddress] = React.useState(
    initialValues.permanentAddress
  );
  const [profilePhoto, setProfilePhoto] = React.useState(
    initialValues.profilePhoto
  );
  const [position, setPosition] = React.useState(initialValues.position);
  const [race, setRace] = React.useState(initialValues.race);
  const [religion, setReligion] = React.useState(initialValues.religion);
  const [status, setStatus] = React.useState(initialValues.status);
  const [workExperience, setWorkExperience] = React.useState(
    initialValues.workExperience
  );
  const [otherLang, setOtherLang] = React.useState(initialValues.otherLang);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = personalDetailsRecord
      ? { ...initialValues, ...personalDetailsRecord }
      : initialValues;
    setTempID(cleanValues.tempID);
    setAge(cleanValues.age);
    setAlternateNo(cleanValues.alternateNo);
    setAgent(cleanValues.agent);
    setBwnIcNo(cleanValues.bwnIcNo);
    setBwnIcExpiry(cleanValues.bwnIcExpiry);
    setBwnIcColour(cleanValues.bwnIcColour);
    setContactNo(cleanValues.contactNo);
    setCob(cleanValues.cob);
    setContractType(cleanValues.contractType);
    setChinese(cleanValues.chinese);
    setDob(cleanValues.dob);
    setDriveLic(cleanValues.driveLic);
    setEmail(cleanValues.email);
    setEmpType(cleanValues.empType);
    setEduDetails(cleanValues.eduDetails ?? []);
    setCurrentEduDetailsValue("");
    setFamilyDetails(cleanValues.familyDetails ?? []);
    setCurrentFamilyDetailsValue("");
    setGender(cleanValues.gender);
    setLang(cleanValues.lang);
    setMarital(cleanValues.marital);
    setName(cleanValues.name);
    setNationality(cleanValues.nationality);
    setOtherNation(cleanValues.otherNation);
    setOtherRace(cleanValues.otherRace);
    setOtherReligion(cleanValues.otherReligion);
    setPpNo(cleanValues.ppNo);
    setPpIssued(cleanValues.ppIssued);
    setPpExpiry(cleanValues.ppExpiry);
    setPpDestinate(cleanValues.ppDestinate);
    setPresentAddress(cleanValues.presentAddress);
    setPermanentAddress(cleanValues.permanentAddress);
    setProfilePhoto(cleanValues.profilePhoto);
    setPosition(cleanValues.position);
    setRace(cleanValues.race);
    setReligion(cleanValues.religion);
    setStatus(cleanValues.status);
    setWorkExperience(cleanValues.workExperience ?? []);
    setCurrentWorkExperienceValue("");
    setOtherLang(cleanValues.otherLang);
    setErrors({});
  };
  const [personalDetailsRecord, setPersonalDetailsRecord] = React.useState(
    personalDetailsModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPersonalDetails.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPersonalDetails
        : personalDetailsModelProp;
      setPersonalDetailsRecord(record);
    };
    queryData();
  }, [idProp, personalDetailsModelProp]);
  React.useEffect(resetStateValues, [personalDetailsRecord]);
  const [currentEduDetailsValue, setCurrentEduDetailsValue] =
    React.useState("");
  const eduDetailsRef = React.createRef();
  const [currentFamilyDetailsValue, setCurrentFamilyDetailsValue] =
    React.useState("");
  const familyDetailsRef = React.createRef();
  const [currentWorkExperienceValue, setCurrentWorkExperienceValue] =
    React.useState("");
  const workExperienceRef = React.createRef();
  const validations = {
    tempID: [{ type: "Required" }],
    age: [],
    alternateNo: [],
    agent: [],
    bwnIcNo: [],
    bwnIcExpiry: [],
    bwnIcColour: [],
    contactNo: [],
    cob: [],
    contractType: [],
    chinese: [],
    dob: [],
    driveLic: [],
    email: [],
    empType: [],
    eduDetails: [{ type: "JSON" }],
    familyDetails: [{ type: "JSON" }],
    gender: [],
    lang: [],
    marital: [],
    name: [],
    nationality: [],
    otherNation: [],
    otherRace: [],
    otherReligion: [],
    ppNo: [],
    ppIssued: [],
    ppExpiry: [],
    ppDestinate: [],
    presentAddress: [],
    permanentAddress: [],
    profilePhoto: [],
    position: [],
    race: [],
    religion: [],
    status: [],
    workExperience: [{ type: "JSON" }],
    otherLang: [],
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
          tempID,
          age: age ?? null,
          alternateNo: alternateNo ?? null,
          agent: agent ?? null,
          bwnIcNo: bwnIcNo ?? null,
          bwnIcExpiry: bwnIcExpiry ?? null,
          bwnIcColour: bwnIcColour ?? null,
          contactNo: contactNo ?? null,
          cob: cob ?? null,
          contractType: contractType ?? null,
          chinese: chinese ?? null,
          dob: dob ?? null,
          driveLic: driveLic ?? null,
          email: email ?? null,
          empType: empType ?? null,
          eduDetails: eduDetails ?? null,
          familyDetails: familyDetails ?? null,
          gender: gender ?? null,
          lang: lang ?? null,
          marital: marital ?? null,
          name: name ?? null,
          nationality: nationality ?? null,
          otherNation: otherNation ?? null,
          otherRace: otherRace ?? null,
          otherReligion: otherReligion ?? null,
          ppNo: ppNo ?? null,
          ppIssued: ppIssued ?? null,
          ppExpiry: ppExpiry ?? null,
          ppDestinate: ppDestinate ?? null,
          presentAddress: presentAddress ?? null,
          permanentAddress: permanentAddress ?? null,
          profilePhoto: profilePhoto ?? null,
          position: position ?? null,
          race: race ?? null,
          religion: religion ?? null,
          status: status ?? null,
          workExperience: workExperience ?? null,
          otherLang: otherLang ?? null,
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
            query: updatePersonalDetails.replaceAll("__typename", ""),
            variables: {
              input: {
                id: personalDetailsRecord.id,
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
      {...getOverrideProps(overrides, "PersonalDetailsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Temp id"
        isRequired={true}
        isReadOnly={false}
        value={tempID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID: value,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.tempID ?? value;
          }
          if (errors.tempID?.hasError) {
            runValidationTasks("tempID", value);
          }
          setTempID(value);
        }}
        onBlur={() => runValidationTasks("tempID", tempID)}
        errorMessage={errors.tempID?.errorMessage}
        hasError={errors.tempID?.hasError}
        {...getOverrideProps(overrides, "tempID")}
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
              tempID,
              age: value,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
        label="Alternate no"
        isRequired={false}
        isReadOnly={false}
        value={alternateNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo: value,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
      <TextField
        label="Agent"
        isRequired={false}
        isReadOnly={false}
        value={agent}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent: value,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.agent ?? value;
          }
          if (errors.agent?.hasError) {
            runValidationTasks("agent", value);
          }
          setAgent(value);
        }}
        onBlur={() => runValidationTasks("agent", agent)}
        errorMessage={errors.agent?.errorMessage}
        hasError={errors.agent?.hasError}
        {...getOverrideProps(overrides, "agent")}
      ></TextField>
      <TextField
        label="Bwn ic no"
        isRequired={false}
        isReadOnly={false}
        value={bwnIcNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo: value,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.bwnIcNo ?? value;
          }
          if (errors.bwnIcNo?.hasError) {
            runValidationTasks("bwnIcNo", value);
          }
          setBwnIcNo(value);
        }}
        onBlur={() => runValidationTasks("bwnIcNo", bwnIcNo)}
        errorMessage={errors.bwnIcNo?.errorMessage}
        hasError={errors.bwnIcNo?.hasError}
        {...getOverrideProps(overrides, "bwnIcNo")}
      ></TextField>
      <TextField
        label="Bwn ic expiry"
        isRequired={false}
        isReadOnly={false}
        value={bwnIcExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry: value,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.bwnIcExpiry ?? value;
          }
          if (errors.bwnIcExpiry?.hasError) {
            runValidationTasks("bwnIcExpiry", value);
          }
          setBwnIcExpiry(value);
        }}
        onBlur={() => runValidationTasks("bwnIcExpiry", bwnIcExpiry)}
        errorMessage={errors.bwnIcExpiry?.errorMessage}
        hasError={errors.bwnIcExpiry?.hasError}
        {...getOverrideProps(overrides, "bwnIcExpiry")}
      ></TextField>
      <TextField
        label="Bwn ic colour"
        isRequired={false}
        isReadOnly={false}
        value={bwnIcColour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour: value,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.bwnIcColour ?? value;
          }
          if (errors.bwnIcColour?.hasError) {
            runValidationTasks("bwnIcColour", value);
          }
          setBwnIcColour(value);
        }}
        onBlur={() => runValidationTasks("bwnIcColour", bwnIcColour)}
        errorMessage={errors.bwnIcColour?.errorMessage}
        hasError={errors.bwnIcColour?.hasError}
        {...getOverrideProps(overrides, "bwnIcColour")}
      ></TextField>
      <TextField
        label="Contact no"
        isRequired={false}
        isReadOnly={false}
        value={contactNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo: value,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.contactNo ?? value;
          }
          if (errors.contactNo?.hasError) {
            runValidationTasks("contactNo", value);
          }
          setContactNo(value);
        }}
        onBlur={() => runValidationTasks("contactNo", contactNo)}
        errorMessage={errors.contactNo?.errorMessage}
        hasError={errors.contactNo?.hasError}
        {...getOverrideProps(overrides, "contactNo")}
      ></TextField>
      <TextField
        label="Cob"
        isRequired={false}
        isReadOnly={false}
        value={cob}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob: value,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
      <TextField
        label="Contract type"
        isRequired={false}
        isReadOnly={false}
        value={contractType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType: value,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.contractType ?? value;
          }
          if (errors.contractType?.hasError) {
            runValidationTasks("contractType", value);
          }
          setContractType(value);
        }}
        onBlur={() => runValidationTasks("contractType", contractType)}
        errorMessage={errors.contractType?.errorMessage}
        hasError={errors.contractType?.hasError}
        {...getOverrideProps(overrides, "contractType")}
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
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese: value,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob: value,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
        label="Drive lic"
        isRequired={false}
        isReadOnly={false}
        value={driveLic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic: value,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.driveLic ?? value;
          }
          if (errors.driveLic?.hasError) {
            runValidationTasks("driveLic", value);
          }
          setDriveLic(value);
        }}
        onBlur={() => runValidationTasks("driveLic", driveLic)}
        errorMessage={errors.driveLic?.errorMessage}
        hasError={errors.driveLic?.hasError}
        {...getOverrideProps(overrides, "driveLic")}
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
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email: value,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
      <TextField
        label="Emp type"
        isRequired={false}
        isReadOnly={false}
        value={empType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType: value,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.empType ?? value;
          }
          if (errors.empType?.hasError) {
            runValidationTasks("empType", value);
          }
          setEmpType(value);
        }}
        onBlur={() => runValidationTasks("empType", empType)}
        errorMessage={errors.empType?.errorMessage}
        hasError={errors.empType?.hasError}
        {...getOverrideProps(overrides, "empType")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails: values,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails: values,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender: value,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang: value,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital: value,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name: value,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
        label="Nationality"
        isRequired={false}
        isReadOnly={false}
        value={nationality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality: value,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.nationality ?? value;
          }
          if (errors.nationality?.hasError) {
            runValidationTasks("nationality", value);
          }
          setNationality(value);
        }}
        onBlur={() => runValidationTasks("nationality", nationality)}
        errorMessage={errors.nationality?.errorMessage}
        hasError={errors.nationality?.hasError}
        {...getOverrideProps(overrides, "nationality")}
      ></TextField>
      <TextField
        label="Other nation"
        isRequired={false}
        isReadOnly={false}
        value={otherNation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation: value,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.otherNation ?? value;
          }
          if (errors.otherNation?.hasError) {
            runValidationTasks("otherNation", value);
          }
          setOtherNation(value);
        }}
        onBlur={() => runValidationTasks("otherNation", otherNation)}
        errorMessage={errors.otherNation?.errorMessage}
        hasError={errors.otherNation?.hasError}
        {...getOverrideProps(overrides, "otherNation")}
      ></TextField>
      <TextField
        label="Other race"
        isRequired={false}
        isReadOnly={false}
        value={otherRace}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace: value,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.otherRace ?? value;
          }
          if (errors.otherRace?.hasError) {
            runValidationTasks("otherRace", value);
          }
          setOtherRace(value);
        }}
        onBlur={() => runValidationTasks("otherRace", otherRace)}
        errorMessage={errors.otherRace?.errorMessage}
        hasError={errors.otherRace?.hasError}
        {...getOverrideProps(overrides, "otherRace")}
      ></TextField>
      <TextField
        label="Other religion"
        isRequired={false}
        isReadOnly={false}
        value={otherReligion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion: value,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.otherReligion ?? value;
          }
          if (errors.otherReligion?.hasError) {
            runValidationTasks("otherReligion", value);
          }
          setOtherReligion(value);
        }}
        onBlur={() => runValidationTasks("otherReligion", otherReligion)}
        errorMessage={errors.otherReligion?.errorMessage}
        hasError={errors.otherReligion?.hasError}
        {...getOverrideProps(overrides, "otherReligion")}
      ></TextField>
      <TextField
        label="Pp no"
        isRequired={false}
        isReadOnly={false}
        value={ppNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo: value,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.ppNo ?? value;
          }
          if (errors.ppNo?.hasError) {
            runValidationTasks("ppNo", value);
          }
          setPpNo(value);
        }}
        onBlur={() => runValidationTasks("ppNo", ppNo)}
        errorMessage={errors.ppNo?.errorMessage}
        hasError={errors.ppNo?.hasError}
        {...getOverrideProps(overrides, "ppNo")}
      ></TextField>
      <TextField
        label="Pp issued"
        isRequired={false}
        isReadOnly={false}
        value={ppIssued}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued: value,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.ppIssued ?? value;
          }
          if (errors.ppIssued?.hasError) {
            runValidationTasks("ppIssued", value);
          }
          setPpIssued(value);
        }}
        onBlur={() => runValidationTasks("ppIssued", ppIssued)}
        errorMessage={errors.ppIssued?.errorMessage}
        hasError={errors.ppIssued?.hasError}
        {...getOverrideProps(overrides, "ppIssued")}
      ></TextField>
      <TextField
        label="Pp expiry"
        isRequired={false}
        isReadOnly={false}
        value={ppExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry: value,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.ppExpiry ?? value;
          }
          if (errors.ppExpiry?.hasError) {
            runValidationTasks("ppExpiry", value);
          }
          setPpExpiry(value);
        }}
        onBlur={() => runValidationTasks("ppExpiry", ppExpiry)}
        errorMessage={errors.ppExpiry?.errorMessage}
        hasError={errors.ppExpiry?.hasError}
        {...getOverrideProps(overrides, "ppExpiry")}
      ></TextField>
      <TextField
        label="Pp destinate"
        isRequired={false}
        isReadOnly={false}
        value={ppDestinate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate: value,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.ppDestinate ?? value;
          }
          if (errors.ppDestinate?.hasError) {
            runValidationTasks("ppDestinate", value);
          }
          setPpDestinate(value);
        }}
        onBlur={() => runValidationTasks("ppDestinate", ppDestinate)}
        errorMessage={errors.ppDestinate?.errorMessage}
        hasError={errors.ppDestinate?.hasError}
        {...getOverrideProps(overrides, "ppDestinate")}
      ></TextField>
      <TextField
        label="Present address"
        isRequired={false}
        isReadOnly={false}
        value={presentAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress: value,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.presentAddress ?? value;
          }
          if (errors.presentAddress?.hasError) {
            runValidationTasks("presentAddress", value);
          }
          setPresentAddress(value);
        }}
        onBlur={() => runValidationTasks("presentAddress", presentAddress)}
        errorMessage={errors.presentAddress?.errorMessage}
        hasError={errors.presentAddress?.hasError}
        {...getOverrideProps(overrides, "presentAddress")}
      ></TextField>
      <TextField
        label="Permanent address"
        isRequired={false}
        isReadOnly={false}
        value={permanentAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress: value,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.permanentAddress ?? value;
          }
          if (errors.permanentAddress?.hasError) {
            runValidationTasks("permanentAddress", value);
          }
          setPermanentAddress(value);
        }}
        onBlur={() => runValidationTasks("permanentAddress", permanentAddress)}
        errorMessage={errors.permanentAddress?.errorMessage}
        hasError={errors.permanentAddress?.hasError}
        {...getOverrideProps(overrides, "permanentAddress")}
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
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto: value,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang,
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
      <TextField
        label="Position"
        isRequired={false}
        isReadOnly={false}
        value={position}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position: value,
              race,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.position ?? value;
          }
          if (errors.position?.hasError) {
            runValidationTasks("position", value);
          }
          setPosition(value);
        }}
        onBlur={() => runValidationTasks("position", position)}
        errorMessage={errors.position?.errorMessage}
        hasError={errors.position?.hasError}
        {...getOverrideProps(overrides, "position")}
      ></TextField>
      <TextField
        label="Race"
        isRequired={false}
        isReadOnly={false}
        value={race}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race: value,
              religion,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.race ?? value;
          }
          if (errors.race?.hasError) {
            runValidationTasks("race", value);
          }
          setRace(value);
        }}
        onBlur={() => runValidationTasks("race", race)}
        errorMessage={errors.race?.errorMessage}
        hasError={errors.race?.hasError}
        {...getOverrideProps(overrides, "race")}
      ></TextField>
      <TextField
        label="Religion"
        isRequired={false}
        isReadOnly={false}
        value={religion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion: value,
              status,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.religion ?? value;
          }
          if (errors.religion?.hasError) {
            runValidationTasks("religion", value);
          }
          setReligion(value);
        }}
        onBlur={() => runValidationTasks("religion", religion)}
        errorMessage={errors.religion?.errorMessage}
        hasError={errors.religion?.hasError}
        {...getOverrideProps(overrides, "religion")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status: value,
              workExperience,
              otherLang,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience: values,
              otherLang,
            };
            const result = onChange(modelFields);
            values = result?.workExperience ?? values;
          }
          setWorkExperience(values);
          setCurrentWorkExperienceValue("");
        }}
        currentFieldValue={currentWorkExperienceValue}
        label={"Work experience"}
        items={workExperience}
        hasError={errors?.workExperience?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("workExperience", currentWorkExperienceValue)
        }
        errorMessage={errors?.workExperience?.errorMessage}
        setFieldValue={setCurrentWorkExperienceValue}
        inputFieldRef={workExperienceRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Work experience"
          isRequired={false}
          isReadOnly={false}
          value={currentWorkExperienceValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.workExperience?.hasError) {
              runValidationTasks("workExperience", value);
            }
            setCurrentWorkExperienceValue(value);
          }}
          onBlur={() =>
            runValidationTasks("workExperience", currentWorkExperienceValue)
          }
          errorMessage={errors.workExperience?.errorMessage}
          hasError={errors.workExperience?.hasError}
          ref={workExperienceRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "workExperience")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Other lang"
        isRequired={false}
        isReadOnly={false}
        value={otherLang}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              age,
              alternateNo,
              agent,
              bwnIcNo,
              bwnIcExpiry,
              bwnIcColour,
              contactNo,
              cob,
              contractType,
              chinese,
              dob,
              driveLic,
              email,
              empType,
              eduDetails,
              familyDetails,
              gender,
              lang,
              marital,
              name,
              nationality,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              ppIssued,
              ppExpiry,
              ppDestinate,
              presentAddress,
              permanentAddress,
              profilePhoto,
              position,
              race,
              religion,
              status,
              workExperience,
              otherLang: value,
            };
            const result = onChange(modelFields);
            value = result?.otherLang ?? value;
          }
          if (errors.otherLang?.hasError) {
            runValidationTasks("otherLang", value);
          }
          setOtherLang(value);
        }}
        onBlur={() => runValidationTasks("otherLang", otherLang)}
        errorMessage={errors.otherLang?.errorMessage}
        hasError={errors.otherLang?.hasError}
        {...getOverrideProps(overrides, "otherLang")}
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
          isDisabled={!(idProp || personalDetailsModelProp)}
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
              !(idProp || personalDetailsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
