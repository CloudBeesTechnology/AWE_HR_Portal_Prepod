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
import { createCandidateApplicationForm } from "../graphql/mutations";
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
export default function CandidateApplicationFormCreateForm(props) {
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
    profilePhoto: "",
    agent: "",
    position: "",
    contractType: "",
    employeeType: "",
    name: "",
    chinese: "",
    gender: "",
    age: "",
    email: "",
    countryOfBirth: "",
    nationality: "",
    otherNationality: "",
    marital: "",
    race: "",
    otherRace: "",
    religion: "",
    otherReligion: "",
    icNo: "",
    icExpiry: "",
    icColour: "",
    passportNo: "",
    alternateNo: "",
    passportIssued: "",
    passportExpiry: "",
    passportDestination: "",
    contactNo: "",
    presentAddress: "",
    permanentAddress: "",
    drivingLicense: "",
    language: "",
    familyDetails: [],
    educationDetails: [],
    workExperience: [],
    referees: [],
    relatives: [],
    description: "",
    emergencyContact: [],
    disease: "",
    liquor: "",
    crime: "",
    diseaseDescription: "",
    liquorDescription: "",
    crimeDescription: "",
    salaryException: "",
    noticePeriod: "",
    employeeStatement: "",
    perInterviewStatus: "",
    perInterviewDescription: "",
    supportInfo: "",
    uploadResume: "",
    uploadCertificate: "",
    uploadPassport: "",
    dateOfBirth: "",
    tempID: "",
    experience: "",
  };
  const [profilePhoto, setProfilePhoto] = React.useState(
    initialValues.profilePhoto
  );
  const [agent, setAgent] = React.useState(initialValues.agent);
  const [position, setPosition] = React.useState(initialValues.position);
  const [contractType, setContractType] = React.useState(
    initialValues.contractType
  );
  const [employeeType, setEmployeeType] = React.useState(
    initialValues.employeeType
  );
  const [name, setName] = React.useState(initialValues.name);
  const [chinese, setChinese] = React.useState(initialValues.chinese);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [age, setAge] = React.useState(initialValues.age);
  const [email, setEmail] = React.useState(initialValues.email);
  const [countryOfBirth, setCountryOfBirth] = React.useState(
    initialValues.countryOfBirth
  );
  const [nationality, setNationality] = React.useState(
    initialValues.nationality
  );
  const [otherNationality, setOtherNationality] = React.useState(
    initialValues.otherNationality
  );
  const [marital, setMarital] = React.useState(initialValues.marital);
  const [race, setRace] = React.useState(initialValues.race);
  const [otherRace, setOtherRace] = React.useState(initialValues.otherRace);
  const [religion, setReligion] = React.useState(initialValues.religion);
  const [otherReligion, setOtherReligion] = React.useState(
    initialValues.otherReligion
  );
  const [icNo, setIcNo] = React.useState(initialValues.icNo);
  const [icExpiry, setIcExpiry] = React.useState(initialValues.icExpiry);
  const [icColour, setIcColour] = React.useState(initialValues.icColour);
  const [passportNo, setPassportNo] = React.useState(initialValues.passportNo);
  const [alternateNo, setAlternateNo] = React.useState(
    initialValues.alternateNo
  );
  const [passportIssued, setPassportIssued] = React.useState(
    initialValues.passportIssued
  );
  const [passportExpiry, setPassportExpiry] = React.useState(
    initialValues.passportExpiry
  );
  const [passportDestination, setPassportDestination] = React.useState(
    initialValues.passportDestination
  );
  const [contactNo, setContactNo] = React.useState(initialValues.contactNo);
  const [presentAddress, setPresentAddress] = React.useState(
    initialValues.presentAddress
  );
  const [permanentAddress, setPermanentAddress] = React.useState(
    initialValues.permanentAddress
  );
  const [drivingLicense, setDrivingLicense] = React.useState(
    initialValues.drivingLicense
  );
  const [language, setLanguage] = React.useState(initialValues.language);
  const [familyDetails, setFamilyDetails] = React.useState(
    initialValues.familyDetails
  );
  const [educationDetails, setEducationDetails] = React.useState(
    initialValues.educationDetails
  );
  const [workExperience, setWorkExperience] = React.useState(
    initialValues.workExperience
  );
  const [referees, setReferees] = React.useState(initialValues.referees);
  const [relatives, setRelatives] = React.useState(initialValues.relatives);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [emergencyContact, setEmergencyContact] = React.useState(
    initialValues.emergencyContact
  );
  const [disease, setDisease] = React.useState(initialValues.disease);
  const [liquor, setLiquor] = React.useState(initialValues.liquor);
  const [crime, setCrime] = React.useState(initialValues.crime);
  const [diseaseDescription, setDiseaseDescription] = React.useState(
    initialValues.diseaseDescription
  );
  const [liquorDescription, setLiquorDescription] = React.useState(
    initialValues.liquorDescription
  );
  const [crimeDescription, setCrimeDescription] = React.useState(
    initialValues.crimeDescription
  );
  const [salaryException, setSalaryException] = React.useState(
    initialValues.salaryException
  );
  const [noticePeriod, setNoticePeriod] = React.useState(
    initialValues.noticePeriod
  );
  const [employeeStatement, setEmployeeStatement] = React.useState(
    initialValues.employeeStatement
  );
  const [perInterviewStatus, setPerInterviewStatus] = React.useState(
    initialValues.perInterviewStatus
  );
  const [perInterviewDescription, setPerInterviewDescription] = React.useState(
    initialValues.perInterviewDescription
  );
  const [supportInfo, setSupportInfo] = React.useState(
    initialValues.supportInfo
  );
  const [uploadResume, setUploadResume] = React.useState(
    initialValues.uploadResume
  );
  const [uploadCertificate, setUploadCertificate] = React.useState(
    initialValues.uploadCertificate
  );
  const [uploadPassport, setUploadPassport] = React.useState(
    initialValues.uploadPassport
  );
  const [dateOfBirth, setDateOfBirth] = React.useState(
    initialValues.dateOfBirth
  );
  const [tempID, setTempID] = React.useState(initialValues.tempID);
  const [experience, setExperience] = React.useState(initialValues.experience);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setProfilePhoto(initialValues.profilePhoto);
    setAgent(initialValues.agent);
    setPosition(initialValues.position);
    setContractType(initialValues.contractType);
    setEmployeeType(initialValues.employeeType);
    setName(initialValues.name);
    setChinese(initialValues.chinese);
    setGender(initialValues.gender);
    setAge(initialValues.age);
    setEmail(initialValues.email);
    setCountryOfBirth(initialValues.countryOfBirth);
    setNationality(initialValues.nationality);
    setOtherNationality(initialValues.otherNationality);
    setMarital(initialValues.marital);
    setRace(initialValues.race);
    setOtherRace(initialValues.otherRace);
    setReligion(initialValues.religion);
    setOtherReligion(initialValues.otherReligion);
    setIcNo(initialValues.icNo);
    setIcExpiry(initialValues.icExpiry);
    setIcColour(initialValues.icColour);
    setPassportNo(initialValues.passportNo);
    setAlternateNo(initialValues.alternateNo);
    setPassportIssued(initialValues.passportIssued);
    setPassportExpiry(initialValues.passportExpiry);
    setPassportDestination(initialValues.passportDestination);
    setContactNo(initialValues.contactNo);
    setPresentAddress(initialValues.presentAddress);
    setPermanentAddress(initialValues.permanentAddress);
    setDrivingLicense(initialValues.drivingLicense);
    setLanguage(initialValues.language);
    setFamilyDetails(initialValues.familyDetails);
    setCurrentFamilyDetailsValue("");
    setEducationDetails(initialValues.educationDetails);
    setCurrentEducationDetailsValue("");
    setWorkExperience(initialValues.workExperience);
    setCurrentWorkExperienceValue("");
    setReferees(initialValues.referees);
    setCurrentRefereesValue("");
    setRelatives(initialValues.relatives);
    setCurrentRelativesValue("");
    setDescription(initialValues.description);
    setEmergencyContact(initialValues.emergencyContact);
    setCurrentEmergencyContactValue("");
    setDisease(initialValues.disease);
    setLiquor(initialValues.liquor);
    setCrime(initialValues.crime);
    setDiseaseDescription(initialValues.diseaseDescription);
    setLiquorDescription(initialValues.liquorDescription);
    setCrimeDescription(initialValues.crimeDescription);
    setSalaryException(initialValues.salaryException);
    setNoticePeriod(initialValues.noticePeriod);
    setEmployeeStatement(initialValues.employeeStatement);
    setPerInterviewStatus(initialValues.perInterviewStatus);
    setPerInterviewDescription(initialValues.perInterviewDescription);
    setSupportInfo(initialValues.supportInfo);
    setUploadResume(initialValues.uploadResume);
    setUploadCertificate(initialValues.uploadCertificate);
    setUploadPassport(initialValues.uploadPassport);
    setDateOfBirth(initialValues.dateOfBirth);
    setTempID(initialValues.tempID);
    setExperience(initialValues.experience);
    setErrors({});
  };
  const [currentFamilyDetailsValue, setCurrentFamilyDetailsValue] =
    React.useState("");
  const familyDetailsRef = React.createRef();
  const [currentEducationDetailsValue, setCurrentEducationDetailsValue] =
    React.useState("");
  const educationDetailsRef = React.createRef();
  const [currentWorkExperienceValue, setCurrentWorkExperienceValue] =
    React.useState("");
  const workExperienceRef = React.createRef();
  const [currentRefereesValue, setCurrentRefereesValue] = React.useState("");
  const refereesRef = React.createRef();
  const [currentRelativesValue, setCurrentRelativesValue] = React.useState("");
  const relativesRef = React.createRef();
  const [currentEmergencyContactValue, setCurrentEmergencyContactValue] =
    React.useState("");
  const emergencyContactRef = React.createRef();
  const validations = {
    profilePhoto: [{ type: "Required" }],
    agent: [],
    position: [{ type: "Required" }],
    contractType: [{ type: "Required" }],
    employeeType: [{ type: "Required" }],
    name: [{ type: "Required" }],
    chinese: [],
    gender: [{ type: "Required" }],
    age: [{ type: "Required" }],
    email: [{ type: "Required" }],
    countryOfBirth: [{ type: "Required" }],
    nationality: [{ type: "Required" }],
    otherNationality: [],
    marital: [{ type: "Required" }],
    race: [{ type: "Required" }],
    otherRace: [],
    religion: [{ type: "Required" }],
    otherReligion: [],
    icNo: [],
    icExpiry: [],
    icColour: [],
    passportNo: [],
    alternateNo: [],
    passportIssued: [],
    passportExpiry: [],
    passportDestination: [],
    contactNo: [{ type: "Required" }],
    presentAddress: [{ type: "Required" }],
    permanentAddress: [{ type: "Required" }],
    drivingLicense: [],
    language: [{ type: "Required" }],
    familyDetails: [],
    educationDetails: [{ type: "Required" }],
    workExperience: [],
    referees: [],
    relatives: [],
    description: [],
    emergencyContact: [{ type: "Required" }],
    disease: [],
    liquor: [],
    crime: [],
    diseaseDescription: [],
    liquorDescription: [],
    crimeDescription: [],
    salaryException: [],
    noticePeriod: [{ type: "Required" }],
    employeeStatement: [{ type: "Required" }],
    perInterviewStatus: [{ type: "Required" }],
    perInterviewDescription: [],
    supportInfo: [],
    uploadResume: [{ type: "Required" }],
    uploadCertificate: [{ type: "Required" }],
    uploadPassport: [{ type: "Required" }],
    dateOfBirth: [{ type: "Required" }],
    tempID: [{ type: "Required" }],
    experience: [{ type: "Required" }],
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
          profilePhoto,
          agent,
          position,
          contractType,
          employeeType,
          name,
          chinese,
          gender,
          age,
          email,
          countryOfBirth,
          nationality,
          otherNationality,
          marital,
          race,
          otherRace,
          religion,
          otherReligion,
          icNo,
          icExpiry,
          icColour,
          passportNo,
          alternateNo,
          passportIssued,
          passportExpiry,
          passportDestination,
          contactNo,
          presentAddress,
          permanentAddress,
          drivingLicense,
          language,
          familyDetails,
          educationDetails,
          workExperience,
          referees,
          relatives,
          description,
          emergencyContact,
          disease,
          liquor,
          crime,
          diseaseDescription,
          liquorDescription,
          crimeDescription,
          salaryException,
          noticePeriod,
          employeeStatement,
          perInterviewStatus,
          perInterviewDescription,
          supportInfo,
          uploadResume,
          uploadCertificate,
          uploadPassport,
          dateOfBirth,
          tempID,
          experience,
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
            query: createCandidateApplicationForm.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "CandidateApplicationFormCreateForm")}
      {...rest}
    >
      <TextField
        label="Profile photo"
        isRequired={true}
        isReadOnly={false}
        value={profilePhoto}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto: value,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Agent"
        isRequired={false}
        isReadOnly={false}
        value={agent}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent: value,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Position"
        isRequired={true}
        isReadOnly={false}
        value={position}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position: value,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Contract type"
        isRequired={true}
        isReadOnly={false}
        value={contractType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType: value,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Employee type"
        isRequired={true}
        isReadOnly={false}
        value={employeeType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType: value,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.employeeType ?? value;
          }
          if (errors.employeeType?.hasError) {
            runValidationTasks("employeeType", value);
          }
          setEmployeeType(value);
        }}
        onBlur={() => runValidationTasks("employeeType", employeeType)}
        errorMessage={errors.employeeType?.errorMessage}
        hasError={errors.employeeType?.hasError}
        {...getOverrideProps(overrides, "employeeType")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name: value,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Chinese"
        isRequired={false}
        isReadOnly={false}
        value={chinese}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese: value,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Gender"
        isRequired={true}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender: value,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Age"
        isRequired={true}
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
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age: value,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email: value,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Country of birth"
        isRequired={true}
        isReadOnly={false}
        value={countryOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth: value,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.countryOfBirth ?? value;
          }
          if (errors.countryOfBirth?.hasError) {
            runValidationTasks("countryOfBirth", value);
          }
          setCountryOfBirth(value);
        }}
        onBlur={() => runValidationTasks("countryOfBirth", countryOfBirth)}
        errorMessage={errors.countryOfBirth?.errorMessage}
        hasError={errors.countryOfBirth?.hasError}
        {...getOverrideProps(overrides, "countryOfBirth")}
      ></TextField>
      <TextField
        label="Nationality"
        isRequired={true}
        isReadOnly={false}
        value={nationality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality: value,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Other nationality"
        isRequired={false}
        isReadOnly={false}
        value={otherNationality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality: value,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.otherNationality ?? value;
          }
          if (errors.otherNationality?.hasError) {
            runValidationTasks("otherNationality", value);
          }
          setOtherNationality(value);
        }}
        onBlur={() => runValidationTasks("otherNationality", otherNationality)}
        errorMessage={errors.otherNationality?.errorMessage}
        hasError={errors.otherNationality?.hasError}
        {...getOverrideProps(overrides, "otherNationality")}
      ></TextField>
      <TextField
        label="Marital"
        isRequired={true}
        isReadOnly={false}
        value={marital}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital: value,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Race"
        isRequired={true}
        isReadOnly={false}
        value={race}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race: value,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Other race"
        isRequired={false}
        isReadOnly={false}
        value={otherRace}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace: value,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Religion"
        isRequired={true}
        isReadOnly={false}
        value={religion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion: value,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Other religion"
        isRequired={false}
        isReadOnly={false}
        value={otherReligion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion: value,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Ic no"
        isRequired={false}
        isReadOnly={false}
        value={icNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo: value,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.icNo ?? value;
          }
          if (errors.icNo?.hasError) {
            runValidationTasks("icNo", value);
          }
          setIcNo(value);
        }}
        onBlur={() => runValidationTasks("icNo", icNo)}
        errorMessage={errors.icNo?.errorMessage}
        hasError={errors.icNo?.hasError}
        {...getOverrideProps(overrides, "icNo")}
      ></TextField>
      <TextField
        label="Ic expiry"
        isRequired={false}
        isReadOnly={false}
        value={icExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry: value,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.icExpiry ?? value;
          }
          if (errors.icExpiry?.hasError) {
            runValidationTasks("icExpiry", value);
          }
          setIcExpiry(value);
        }}
        onBlur={() => runValidationTasks("icExpiry", icExpiry)}
        errorMessage={errors.icExpiry?.errorMessage}
        hasError={errors.icExpiry?.hasError}
        {...getOverrideProps(overrides, "icExpiry")}
      ></TextField>
      <TextField
        label="Ic colour"
        isRequired={false}
        isReadOnly={false}
        value={icColour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour: value,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.icColour ?? value;
          }
          if (errors.icColour?.hasError) {
            runValidationTasks("icColour", value);
          }
          setIcColour(value);
        }}
        onBlur={() => runValidationTasks("icColour", icColour)}
        errorMessage={errors.icColour?.errorMessage}
        hasError={errors.icColour?.hasError}
        {...getOverrideProps(overrides, "icColour")}
      ></TextField>
      <TextField
        label="Passport no"
        isRequired={false}
        isReadOnly={false}
        value={passportNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo: value,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.passportNo ?? value;
          }
          if (errors.passportNo?.hasError) {
            runValidationTasks("passportNo", value);
          }
          setPassportNo(value);
        }}
        onBlur={() => runValidationTasks("passportNo", passportNo)}
        errorMessage={errors.passportNo?.errorMessage}
        hasError={errors.passportNo?.hasError}
        {...getOverrideProps(overrides, "passportNo")}
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
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo: value,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Passport issued"
        isRequired={false}
        isReadOnly={false}
        value={passportIssued}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued: value,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.passportIssued ?? value;
          }
          if (errors.passportIssued?.hasError) {
            runValidationTasks("passportIssued", value);
          }
          setPassportIssued(value);
        }}
        onBlur={() => runValidationTasks("passportIssued", passportIssued)}
        errorMessage={errors.passportIssued?.errorMessage}
        hasError={errors.passportIssued?.hasError}
        {...getOverrideProps(overrides, "passportIssued")}
      ></TextField>
      <TextField
        label="Passport expiry"
        isRequired={false}
        isReadOnly={false}
        value={passportExpiry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry: value,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.passportExpiry ?? value;
          }
          if (errors.passportExpiry?.hasError) {
            runValidationTasks("passportExpiry", value);
          }
          setPassportExpiry(value);
        }}
        onBlur={() => runValidationTasks("passportExpiry", passportExpiry)}
        errorMessage={errors.passportExpiry?.errorMessage}
        hasError={errors.passportExpiry?.hasError}
        {...getOverrideProps(overrides, "passportExpiry")}
      ></TextField>
      <TextField
        label="Passport destination"
        isRequired={false}
        isReadOnly={false}
        value={passportDestination}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination: value,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.passportDestination ?? value;
          }
          if (errors.passportDestination?.hasError) {
            runValidationTasks("passportDestination", value);
          }
          setPassportDestination(value);
        }}
        onBlur={() =>
          runValidationTasks("passportDestination", passportDestination)
        }
        errorMessage={errors.passportDestination?.errorMessage}
        hasError={errors.passportDestination?.hasError}
        {...getOverrideProps(overrides, "passportDestination")}
      ></TextField>
      <TextField
        label="Contact no"
        isRequired={true}
        isReadOnly={false}
        value={contactNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo: value,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Present address"
        isRequired={true}
        isReadOnly={false}
        value={presentAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress: value,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        isRequired={true}
        isReadOnly={false}
        value={permanentAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress: value,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        label="Driving license"
        isRequired={false}
        isReadOnly={false}
        value={drivingLicense}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense: value,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.drivingLicense ?? value;
          }
          if (errors.drivingLicense?.hasError) {
            runValidationTasks("drivingLicense", value);
          }
          setDrivingLicense(value);
        }}
        onBlur={() => runValidationTasks("drivingLicense", drivingLicense)}
        errorMessage={errors.drivingLicense?.errorMessage}
        hasError={errors.drivingLicense?.hasError}
        {...getOverrideProps(overrides, "drivingLicense")}
      ></TextField>
      <TextField
        label="Language"
        isRequired={true}
        isReadOnly={false}
        value={language}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language: value,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.language ?? value;
          }
          if (errors.language?.hasError) {
            runValidationTasks("language", value);
          }
          setLanguage(value);
        }}
        onBlur={() => runValidationTasks("language", language)}
        errorMessage={errors.language?.errorMessage}
        hasError={errors.language?.hasError}
        {...getOverrideProps(overrides, "language")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails: values,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        <TextField
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
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails: values,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            values = result?.educationDetails ?? values;
          }
          setEducationDetails(values);
          setCurrentEducationDetailsValue("");
        }}
        currentFieldValue={currentEducationDetailsValue}
        label={"Education details"}
        items={educationDetails}
        hasError={errors?.educationDetails?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "educationDetails",
            currentEducationDetailsValue
          )
        }
        errorMessage={errors?.educationDetails?.errorMessage}
        setFieldValue={setCurrentEducationDetailsValue}
        inputFieldRef={educationDetailsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Education details"
          isRequired={true}
          isReadOnly={false}
          value={currentEducationDetailsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.educationDetails?.hasError) {
              runValidationTasks("educationDetails", value);
            }
            setCurrentEducationDetailsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("educationDetails", currentEducationDetailsValue)
          }
          errorMessage={errors.educationDetails?.errorMessage}
          hasError={errors.educationDetails?.hasError}
          ref={educationDetailsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "educationDetails")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience: values,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
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
        <TextField
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
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees: values,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            values = result?.referees ?? values;
          }
          setReferees(values);
          setCurrentRefereesValue("");
        }}
        currentFieldValue={currentRefereesValue}
        label={"Referees"}
        items={referees}
        hasError={errors?.referees?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("referees", currentRefereesValue)
        }
        errorMessage={errors?.referees?.errorMessage}
        setFieldValue={setCurrentRefereesValue}
        inputFieldRef={refereesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Referees"
          isRequired={false}
          isReadOnly={false}
          value={currentRefereesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.referees?.hasError) {
              runValidationTasks("referees", value);
            }
            setCurrentRefereesValue(value);
          }}
          onBlur={() => runValidationTasks("referees", currentRefereesValue)}
          errorMessage={errors.referees?.errorMessage}
          hasError={errors.referees?.hasError}
          ref={refereesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "referees")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives: values,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            values = result?.relatives ?? values;
          }
          setRelatives(values);
          setCurrentRelativesValue("");
        }}
        currentFieldValue={currentRelativesValue}
        label={"Relatives"}
        items={relatives}
        hasError={errors?.relatives?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("relatives", currentRelativesValue)
        }
        errorMessage={errors?.relatives?.errorMessage}
        setFieldValue={setCurrentRelativesValue}
        inputFieldRef={relativesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Relatives"
          isRequired={false}
          isReadOnly={false}
          value={currentRelativesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.relatives?.hasError) {
              runValidationTasks("relatives", value);
            }
            setCurrentRelativesValue(value);
          }}
          onBlur={() => runValidationTasks("relatives", currentRelativesValue)}
          errorMessage={errors.relatives?.errorMessage}
          hasError={errors.relatives?.hasError}
          ref={relativesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "relatives")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description: value,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact: values,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            values = result?.emergencyContact ?? values;
          }
          setEmergencyContact(values);
          setCurrentEmergencyContactValue("");
        }}
        currentFieldValue={currentEmergencyContactValue}
        label={"Emergency contact"}
        items={emergencyContact}
        hasError={errors?.emergencyContact?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "emergencyContact",
            currentEmergencyContactValue
          )
        }
        errorMessage={errors?.emergencyContact?.errorMessage}
        setFieldValue={setCurrentEmergencyContactValue}
        inputFieldRef={emergencyContactRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Emergency contact"
          isRequired={true}
          isReadOnly={false}
          value={currentEmergencyContactValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.emergencyContact?.hasError) {
              runValidationTasks("emergencyContact", value);
            }
            setCurrentEmergencyContactValue(value);
          }}
          onBlur={() =>
            runValidationTasks("emergencyContact", currentEmergencyContactValue)
          }
          errorMessage={errors.emergencyContact?.errorMessage}
          hasError={errors.emergencyContact?.hasError}
          ref={emergencyContactRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "emergencyContact")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Disease"
        isRequired={false}
        isReadOnly={false}
        value={disease}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease: value,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.disease ?? value;
          }
          if (errors.disease?.hasError) {
            runValidationTasks("disease", value);
          }
          setDisease(value);
        }}
        onBlur={() => runValidationTasks("disease", disease)}
        errorMessage={errors.disease?.errorMessage}
        hasError={errors.disease?.hasError}
        {...getOverrideProps(overrides, "disease")}
      ></TextField>
      <TextField
        label="Liquor"
        isRequired={false}
        isReadOnly={false}
        value={liquor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor: value,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.liquor ?? value;
          }
          if (errors.liquor?.hasError) {
            runValidationTasks("liquor", value);
          }
          setLiquor(value);
        }}
        onBlur={() => runValidationTasks("liquor", liquor)}
        errorMessage={errors.liquor?.errorMessage}
        hasError={errors.liquor?.hasError}
        {...getOverrideProps(overrides, "liquor")}
      ></TextField>
      <TextField
        label="Crime"
        isRequired={false}
        isReadOnly={false}
        value={crime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime: value,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.crime ?? value;
          }
          if (errors.crime?.hasError) {
            runValidationTasks("crime", value);
          }
          setCrime(value);
        }}
        onBlur={() => runValidationTasks("crime", crime)}
        errorMessage={errors.crime?.errorMessage}
        hasError={errors.crime?.hasError}
        {...getOverrideProps(overrides, "crime")}
      ></TextField>
      <TextField
        label="Disease description"
        isRequired={false}
        isReadOnly={false}
        value={diseaseDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription: value,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.diseaseDescription ?? value;
          }
          if (errors.diseaseDescription?.hasError) {
            runValidationTasks("diseaseDescription", value);
          }
          setDiseaseDescription(value);
        }}
        onBlur={() =>
          runValidationTasks("diseaseDescription", diseaseDescription)
        }
        errorMessage={errors.diseaseDescription?.errorMessage}
        hasError={errors.diseaseDescription?.hasError}
        {...getOverrideProps(overrides, "diseaseDescription")}
      ></TextField>
      <TextField
        label="Liquor description"
        isRequired={false}
        isReadOnly={false}
        value={liquorDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription: value,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.liquorDescription ?? value;
          }
          if (errors.liquorDescription?.hasError) {
            runValidationTasks("liquorDescription", value);
          }
          setLiquorDescription(value);
        }}
        onBlur={() =>
          runValidationTasks("liquorDescription", liquorDescription)
        }
        errorMessage={errors.liquorDescription?.errorMessage}
        hasError={errors.liquorDescription?.hasError}
        {...getOverrideProps(overrides, "liquorDescription")}
      ></TextField>
      <TextField
        label="Crime description"
        isRequired={false}
        isReadOnly={false}
        value={crimeDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription: value,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.crimeDescription ?? value;
          }
          if (errors.crimeDescription?.hasError) {
            runValidationTasks("crimeDescription", value);
          }
          setCrimeDescription(value);
        }}
        onBlur={() => runValidationTasks("crimeDescription", crimeDescription)}
        errorMessage={errors.crimeDescription?.errorMessage}
        hasError={errors.crimeDescription?.hasError}
        {...getOverrideProps(overrides, "crimeDescription")}
      ></TextField>
      <TextField
        label="Salary exception"
        isRequired={false}
        isReadOnly={false}
        value={salaryException}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException: value,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.salaryException ?? value;
          }
          if (errors.salaryException?.hasError) {
            runValidationTasks("salaryException", value);
          }
          setSalaryException(value);
        }}
        onBlur={() => runValidationTasks("salaryException", salaryException)}
        errorMessage={errors.salaryException?.errorMessage}
        hasError={errors.salaryException?.hasError}
        {...getOverrideProps(overrides, "salaryException")}
      ></TextField>
      <TextField
        label="Notice period"
        isRequired={true}
        isReadOnly={false}
        value={noticePeriod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod: value,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.noticePeriod ?? value;
          }
          if (errors.noticePeriod?.hasError) {
            runValidationTasks("noticePeriod", value);
          }
          setNoticePeriod(value);
        }}
        onBlur={() => runValidationTasks("noticePeriod", noticePeriod)}
        errorMessage={errors.noticePeriod?.errorMessage}
        hasError={errors.noticePeriod?.hasError}
        {...getOverrideProps(overrides, "noticePeriod")}
      ></TextField>
      <TextField
        label="Employee statement"
        isRequired={true}
        isReadOnly={false}
        value={employeeStatement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement: value,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.employeeStatement ?? value;
          }
          if (errors.employeeStatement?.hasError) {
            runValidationTasks("employeeStatement", value);
          }
          setEmployeeStatement(value);
        }}
        onBlur={() =>
          runValidationTasks("employeeStatement", employeeStatement)
        }
        errorMessage={errors.employeeStatement?.errorMessage}
        hasError={errors.employeeStatement?.hasError}
        {...getOverrideProps(overrides, "employeeStatement")}
      ></TextField>
      <TextField
        label="Per interview status"
        isRequired={true}
        isReadOnly={false}
        value={perInterviewStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus: value,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.perInterviewStatus ?? value;
          }
          if (errors.perInterviewStatus?.hasError) {
            runValidationTasks("perInterviewStatus", value);
          }
          setPerInterviewStatus(value);
        }}
        onBlur={() =>
          runValidationTasks("perInterviewStatus", perInterviewStatus)
        }
        errorMessage={errors.perInterviewStatus?.errorMessage}
        hasError={errors.perInterviewStatus?.hasError}
        {...getOverrideProps(overrides, "perInterviewStatus")}
      ></TextField>
      <TextField
        label="Per interview description"
        isRequired={false}
        isReadOnly={false}
        value={perInterviewDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription: value,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.perInterviewDescription ?? value;
          }
          if (errors.perInterviewDescription?.hasError) {
            runValidationTasks("perInterviewDescription", value);
          }
          setPerInterviewDescription(value);
        }}
        onBlur={() =>
          runValidationTasks("perInterviewDescription", perInterviewDescription)
        }
        errorMessage={errors.perInterviewDescription?.errorMessage}
        hasError={errors.perInterviewDescription?.hasError}
        {...getOverrideProps(overrides, "perInterviewDescription")}
      ></TextField>
      <TextField
        label="Support info"
        isRequired={false}
        isReadOnly={false}
        value={supportInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo: value,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.supportInfo ?? value;
          }
          if (errors.supportInfo?.hasError) {
            runValidationTasks("supportInfo", value);
          }
          setSupportInfo(value);
        }}
        onBlur={() => runValidationTasks("supportInfo", supportInfo)}
        errorMessage={errors.supportInfo?.errorMessage}
        hasError={errors.supportInfo?.hasError}
        {...getOverrideProps(overrides, "supportInfo")}
      ></TextField>
      <TextField
        label="Upload resume"
        isRequired={true}
        isReadOnly={false}
        value={uploadResume}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume: value,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.uploadResume ?? value;
          }
          if (errors.uploadResume?.hasError) {
            runValidationTasks("uploadResume", value);
          }
          setUploadResume(value);
        }}
        onBlur={() => runValidationTasks("uploadResume", uploadResume)}
        errorMessage={errors.uploadResume?.errorMessage}
        hasError={errors.uploadResume?.hasError}
        {...getOverrideProps(overrides, "uploadResume")}
      ></TextField>
      <TextField
        label="Upload certificate"
        isRequired={true}
        isReadOnly={false}
        value={uploadCertificate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate: value,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.uploadCertificate ?? value;
          }
          if (errors.uploadCertificate?.hasError) {
            runValidationTasks("uploadCertificate", value);
          }
          setUploadCertificate(value);
        }}
        onBlur={() =>
          runValidationTasks("uploadCertificate", uploadCertificate)
        }
        errorMessage={errors.uploadCertificate?.errorMessage}
        hasError={errors.uploadCertificate?.hasError}
        {...getOverrideProps(overrides, "uploadCertificate")}
      ></TextField>
      <TextField
        label="Upload passport"
        isRequired={true}
        isReadOnly={false}
        value={uploadPassport}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport: value,
              dateOfBirth,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.uploadPassport ?? value;
          }
          if (errors.uploadPassport?.hasError) {
            runValidationTasks("uploadPassport", value);
          }
          setUploadPassport(value);
        }}
        onBlur={() => runValidationTasks("uploadPassport", uploadPassport)}
        errorMessage={errors.uploadPassport?.errorMessage}
        hasError={errors.uploadPassport?.hasError}
        {...getOverrideProps(overrides, "uploadPassport")}
      ></TextField>
      <TextField
        label="Date of birth"
        isRequired={true}
        isReadOnly={false}
        value={dateOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth: value,
              tempID,
              experience,
            };
            const result = onChange(modelFields);
            value = result?.dateOfBirth ?? value;
          }
          if (errors.dateOfBirth?.hasError) {
            runValidationTasks("dateOfBirth", value);
          }
          setDateOfBirth(value);
        }}
        onBlur={() => runValidationTasks("dateOfBirth", dateOfBirth)}
        errorMessage={errors.dateOfBirth?.errorMessage}
        hasError={errors.dateOfBirth?.hasError}
        {...getOverrideProps(overrides, "dateOfBirth")}
      ></TextField>
      <TextField
        label="Temp id"
        isRequired={true}
        isReadOnly={false}
        value={tempID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID: value,
              experience,
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
        label="Experience"
        isRequired={true}
        isReadOnly={false}
        value={experience}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profilePhoto,
              agent,
              position,
              contractType,
              employeeType,
              name,
              chinese,
              gender,
              age,
              email,
              countryOfBirth,
              nationality,
              otherNationality,
              marital,
              race,
              otherRace,
              religion,
              otherReligion,
              icNo,
              icExpiry,
              icColour,
              passportNo,
              alternateNo,
              passportIssued,
              passportExpiry,
              passportDestination,
              contactNo,
              presentAddress,
              permanentAddress,
              drivingLicense,
              language,
              familyDetails,
              educationDetails,
              workExperience,
              referees,
              relatives,
              description,
              emergencyContact,
              disease,
              liquor,
              crime,
              diseaseDescription,
              liquorDescription,
              crimeDescription,
              salaryException,
              noticePeriod,
              employeeStatement,
              perInterviewStatus,
              perInterviewDescription,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPassport,
              dateOfBirth,
              tempID,
              experience: value,
            };
            const result = onChange(modelFields);
            value = result?.experience ?? value;
          }
          if (errors.experience?.hasError) {
            runValidationTasks("experience", value);
          }
          setExperience(value);
        }}
        onBlur={() => runValidationTasks("experience", experience)}
        errorMessage={errors.experience?.errorMessage}
        hasError={errors.experience?.hasError}
        {...getOverrideProps(overrides, "experience")}
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
