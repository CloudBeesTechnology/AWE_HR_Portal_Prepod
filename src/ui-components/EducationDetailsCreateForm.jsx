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
import { createEducationDetails } from "../graphql/mutations";
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
export default function EducationDetailsCreateForm(props) {
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
    tempID: "",
    crime: "",
    crimeDesc: "",
    emgDetails: [],
    noExperience: "",
    empStatement: "",
    desc: "",
    disease: "",
    diseaseDesc: "",
    liquor: "",
    liquorDesc: "",
    noticePeriod: "",
    perIS: "",
    perIDesc: "",
    referees: [],
    relatives: [],
    salaryExpectation: "",
    supportInfo: "",
    uploadResume: "",
    uploadCertificate: "",
    uploadPp: "",
    uploadIc: "",
  };
  const [tempID, setTempID] = React.useState(initialValues.tempID);
  const [crime, setCrime] = React.useState(initialValues.crime);
  const [crimeDesc, setCrimeDesc] = React.useState(initialValues.crimeDesc);
  const [emgDetails, setEmgDetails] = React.useState(initialValues.emgDetails);
  const [noExperience, setNoExperience] = React.useState(
    initialValues.noExperience
  );
  const [empStatement, setEmpStatement] = React.useState(
    initialValues.empStatement
  );
  const [desc, setDesc] = React.useState(initialValues.desc);
  const [disease, setDisease] = React.useState(initialValues.disease);
  const [diseaseDesc, setDiseaseDesc] = React.useState(
    initialValues.diseaseDesc
  );
  const [liquor, setLiquor] = React.useState(initialValues.liquor);
  const [liquorDesc, setLiquorDesc] = React.useState(initialValues.liquorDesc);
  const [noticePeriod, setNoticePeriod] = React.useState(
    initialValues.noticePeriod
  );
  const [perIS, setPerIS] = React.useState(initialValues.perIS);
  const [perIDesc, setPerIDesc] = React.useState(initialValues.perIDesc);
  const [referees, setReferees] = React.useState(initialValues.referees);
  const [relatives, setRelatives] = React.useState(initialValues.relatives);
  const [salaryExpectation, setSalaryExpectation] = React.useState(
    initialValues.salaryExpectation
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
  const [uploadPp, setUploadPp] = React.useState(initialValues.uploadPp);
  const [uploadIc, setUploadIc] = React.useState(initialValues.uploadIc);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTempID(initialValues.tempID);
    setCrime(initialValues.crime);
    setCrimeDesc(initialValues.crimeDesc);
    setEmgDetails(initialValues.emgDetails);
    setCurrentEmgDetailsValue("");
    setNoExperience(initialValues.noExperience);
    setEmpStatement(initialValues.empStatement);
    setDesc(initialValues.desc);
    setDisease(initialValues.disease);
    setDiseaseDesc(initialValues.diseaseDesc);
    setLiquor(initialValues.liquor);
    setLiquorDesc(initialValues.liquorDesc);
    setNoticePeriod(initialValues.noticePeriod);
    setPerIS(initialValues.perIS);
    setPerIDesc(initialValues.perIDesc);
    setReferees(initialValues.referees);
    setCurrentRefereesValue("");
    setRelatives(initialValues.relatives);
    setCurrentRelativesValue("");
    setSalaryExpectation(initialValues.salaryExpectation);
    setSupportInfo(initialValues.supportInfo);
    setUploadResume(initialValues.uploadResume);
    setUploadCertificate(initialValues.uploadCertificate);
    setUploadPp(initialValues.uploadPp);
    setUploadIc(initialValues.uploadIc);
    setErrors({});
  };
  const [currentEmgDetailsValue, setCurrentEmgDetailsValue] =
    React.useState("");
  const emgDetailsRef = React.createRef();
  const [currentRefereesValue, setCurrentRefereesValue] = React.useState("");
  const refereesRef = React.createRef();
  const [currentRelativesValue, setCurrentRelativesValue] = React.useState("");
  const relativesRef = React.createRef();
  const validations = {
    tempID: [{ type: "Required" }],
    crime: [],
    crimeDesc: [],
    emgDetails: [{ type: "JSON" }],
    noExperience: [],
    empStatement: [],
    desc: [],
    disease: [],
    diseaseDesc: [],
    liquor: [],
    liquorDesc: [],
    noticePeriod: [],
    perIS: [],
    perIDesc: [],
    referees: [{ type: "JSON" }],
    relatives: [{ type: "JSON" }],
    salaryExpectation: [],
    supportInfo: [],
    uploadResume: [],
    uploadCertificate: [],
    uploadPp: [],
    uploadIc: [],
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
          crime,
          crimeDesc,
          emgDetails,
          noExperience,
          empStatement,
          desc,
          disease,
          diseaseDesc,
          liquor,
          liquorDesc,
          noticePeriod,
          perIS,
          perIDesc,
          referees,
          relatives,
          salaryExpectation,
          supportInfo,
          uploadResume,
          uploadCertificate,
          uploadPp,
          uploadIc,
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
            query: createEducationDetails.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "EducationDetailsCreateForm")}
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
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
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
        label="Crime"
        isRequired={false}
        isReadOnly={false}
        value={crime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime: value,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
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
        label="Crime desc"
        isRequired={false}
        isReadOnly={false}
        value={crimeDesc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc: value,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
            };
            const result = onChange(modelFields);
            value = result?.crimeDesc ?? value;
          }
          if (errors.crimeDesc?.hasError) {
            runValidationTasks("crimeDesc", value);
          }
          setCrimeDesc(value);
        }}
        onBlur={() => runValidationTasks("crimeDesc", crimeDesc)}
        errorMessage={errors.crimeDesc?.errorMessage}
        hasError={errors.crimeDesc?.hasError}
        {...getOverrideProps(overrides, "crimeDesc")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails: values,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
            };
            const result = onChange(modelFields);
            values = result?.emgDetails ?? values;
          }
          setEmgDetails(values);
          setCurrentEmgDetailsValue("");
        }}
        currentFieldValue={currentEmgDetailsValue}
        label={"Emg details"}
        items={emgDetails}
        hasError={errors?.emgDetails?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("emgDetails", currentEmgDetailsValue)
        }
        errorMessage={errors?.emgDetails?.errorMessage}
        setFieldValue={setCurrentEmgDetailsValue}
        inputFieldRef={emgDetailsRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Emg details"
          isRequired={false}
          isReadOnly={false}
          value={currentEmgDetailsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.emgDetails?.hasError) {
              runValidationTasks("emgDetails", value);
            }
            setCurrentEmgDetailsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("emgDetails", currentEmgDetailsValue)
          }
          errorMessage={errors.emgDetails?.errorMessage}
          hasError={errors.emgDetails?.hasError}
          ref={emgDetailsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "emgDetails")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="No experience"
        isRequired={false}
        isReadOnly={false}
        value={noExperience}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience: value,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
            };
            const result = onChange(modelFields);
            value = result?.noExperience ?? value;
          }
          if (errors.noExperience?.hasError) {
            runValidationTasks("noExperience", value);
          }
          setNoExperience(value);
        }}
        onBlur={() => runValidationTasks("noExperience", noExperience)}
        errorMessage={errors.noExperience?.errorMessage}
        hasError={errors.noExperience?.hasError}
        {...getOverrideProps(overrides, "noExperience")}
      ></TextField>
      <TextField
        label="Emp statement"
        isRequired={false}
        isReadOnly={false}
        value={empStatement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement: value,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
            };
            const result = onChange(modelFields);
            value = result?.empStatement ?? value;
          }
          if (errors.empStatement?.hasError) {
            runValidationTasks("empStatement", value);
          }
          setEmpStatement(value);
        }}
        onBlur={() => runValidationTasks("empStatement", empStatement)}
        errorMessage={errors.empStatement?.errorMessage}
        hasError={errors.empStatement?.hasError}
        {...getOverrideProps(overrides, "empStatement")}
      ></TextField>
      <TextField
        label="Desc"
        isRequired={false}
        isReadOnly={false}
        value={desc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc: value,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
            };
            const result = onChange(modelFields);
            value = result?.desc ?? value;
          }
          if (errors.desc?.hasError) {
            runValidationTasks("desc", value);
          }
          setDesc(value);
        }}
        onBlur={() => runValidationTasks("desc", desc)}
        errorMessage={errors.desc?.errorMessage}
        hasError={errors.desc?.hasError}
        {...getOverrideProps(overrides, "desc")}
      ></TextField>
      <TextField
        label="Disease"
        isRequired={false}
        isReadOnly={false}
        value={disease}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease: value,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
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
        label="Disease desc"
        isRequired={false}
        isReadOnly={false}
        value={diseaseDesc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc: value,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
            };
            const result = onChange(modelFields);
            value = result?.diseaseDesc ?? value;
          }
          if (errors.diseaseDesc?.hasError) {
            runValidationTasks("diseaseDesc", value);
          }
          setDiseaseDesc(value);
        }}
        onBlur={() => runValidationTasks("diseaseDesc", diseaseDesc)}
        errorMessage={errors.diseaseDesc?.errorMessage}
        hasError={errors.diseaseDesc?.hasError}
        {...getOverrideProps(overrides, "diseaseDesc")}
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
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor: value,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
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
        label="Liquor desc"
        isRequired={false}
        isReadOnly={false}
        value={liquorDesc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc: value,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
            };
            const result = onChange(modelFields);
            value = result?.liquorDesc ?? value;
          }
          if (errors.liquorDesc?.hasError) {
            runValidationTasks("liquorDesc", value);
          }
          setLiquorDesc(value);
        }}
        onBlur={() => runValidationTasks("liquorDesc", liquorDesc)}
        errorMessage={errors.liquorDesc?.errorMessage}
        hasError={errors.liquorDesc?.hasError}
        {...getOverrideProps(overrides, "liquorDesc")}
      ></TextField>
      <TextField
        label="Notice period"
        isRequired={false}
        isReadOnly={false}
        value={noticePeriod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod: value,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
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
        label="Per is"
        isRequired={false}
        isReadOnly={false}
        value={perIS}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS: value,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
            };
            const result = onChange(modelFields);
            value = result?.perIS ?? value;
          }
          if (errors.perIS?.hasError) {
            runValidationTasks("perIS", value);
          }
          setPerIS(value);
        }}
        onBlur={() => runValidationTasks("perIS", perIS)}
        errorMessage={errors.perIS?.errorMessage}
        hasError={errors.perIS?.hasError}
        {...getOverrideProps(overrides, "perIS")}
      ></TextField>
      <TextField
        label="Per i desc"
        isRequired={false}
        isReadOnly={false}
        value={perIDesc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc: value,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
            };
            const result = onChange(modelFields);
            value = result?.perIDesc ?? value;
          }
          if (errors.perIDesc?.hasError) {
            runValidationTasks("perIDesc", value);
          }
          setPerIDesc(value);
        }}
        onBlur={() => runValidationTasks("perIDesc", perIDesc)}
        errorMessage={errors.perIDesc?.errorMessage}
        hasError={errors.perIDesc?.hasError}
        {...getOverrideProps(overrides, "perIDesc")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees: values,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
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
        <TextAreaField
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
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives: values,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
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
        <TextAreaField
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
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Salary expectation"
        isRequired={false}
        isReadOnly={false}
        value={salaryExpectation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation: value,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
            };
            const result = onChange(modelFields);
            value = result?.salaryExpectation ?? value;
          }
          if (errors.salaryExpectation?.hasError) {
            runValidationTasks("salaryExpectation", value);
          }
          setSalaryExpectation(value);
        }}
        onBlur={() =>
          runValidationTasks("salaryExpectation", salaryExpectation)
        }
        errorMessage={errors.salaryExpectation?.errorMessage}
        hasError={errors.salaryExpectation?.hasError}
        {...getOverrideProps(overrides, "salaryExpectation")}
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
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo: value,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc,
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
        isRequired={false}
        isReadOnly={false}
        value={uploadResume}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume: value,
              uploadCertificate,
              uploadPp,
              uploadIc,
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
        isRequired={false}
        isReadOnly={false}
        value={uploadCertificate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate: value,
              uploadPp,
              uploadIc,
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
        label="Upload pp"
        isRequired={false}
        isReadOnly={false}
        value={uploadPp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp: value,
              uploadIc,
            };
            const result = onChange(modelFields);
            value = result?.uploadPp ?? value;
          }
          if (errors.uploadPp?.hasError) {
            runValidationTasks("uploadPp", value);
          }
          setUploadPp(value);
        }}
        onBlur={() => runValidationTasks("uploadPp", uploadPp)}
        errorMessage={errors.uploadPp?.errorMessage}
        hasError={errors.uploadPp?.hasError}
        {...getOverrideProps(overrides, "uploadPp")}
      ></TextField>
      <TextField
        label="Upload ic"
        isRequired={false}
        isReadOnly={false}
        value={uploadIc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              crime,
              crimeDesc,
              emgDetails,
              noExperience,
              empStatement,
              desc,
              disease,
              diseaseDesc,
              liquor,
              liquorDesc,
              noticePeriod,
              perIS,
              perIDesc,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              uploadResume,
              uploadCertificate,
              uploadPp,
              uploadIc: value,
            };
            const result = onChange(modelFields);
            value = result?.uploadIc ?? value;
          }
          if (errors.uploadIc?.hasError) {
            runValidationTasks("uploadIc", value);
          }
          setUploadIc(value);
        }}
        onBlur={() => runValidationTasks("uploadIc", uploadIc)}
        errorMessage={errors.uploadIc?.errorMessage}
        hasError={errors.uploadIc?.hasError}
        {...getOverrideProps(overrides, "uploadIc")}
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
