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
import { getCandIToEMP } from "../graphql/queries";
import { updateCandIToEMP } from "../graphql/mutations";
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
export default function CandIToEMPUpdateForm(props) {
  const {
    id: idProp,
    candIToEMP: candIToEMPModelProp,
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
    perIS: "",
    perID: "",
    referees: [],
    relatives: [],
    salaryExpectation: "",
    supportInfo: "",
    workExperience: [],
    mobSignDate: "",
    mobFile: "",
    paafApproveDate: "",
    paafFile: "",
    loiIssueDate: "",
    loiAcceptDate: "",
    loiDeclineDate: "",
    declineReason: "",
    loiFile: "",
    cvecApproveDate: "",
    cvecFile: "",
    uploadCertificate: [],
    pcNoticePeriod: "",
    venue: "",
    managerBadgeNo: "",
    message: "",
    interType: "",
    interTime: "",
    interDate: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
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
  const [perIS, setPerIS] = React.useState(initialValues.perIS);
  const [perID, setPerID] = React.useState(initialValues.perID);
  const [referees, setReferees] = React.useState(initialValues.referees);
  const [relatives, setRelatives] = React.useState(initialValues.relatives);
  const [salaryExpectation, setSalaryExpectation] = React.useState(
    initialValues.salaryExpectation
  );
  const [supportInfo, setSupportInfo] = React.useState(
    initialValues.supportInfo
  );
  const [workExperience, setWorkExperience] = React.useState(
    initialValues.workExperience
  );
  const [mobSignDate, setMobSignDate] = React.useState(
    initialValues.mobSignDate
  );
  const [mobFile, setMobFile] = React.useState(initialValues.mobFile);
  const [paafApproveDate, setPaafApproveDate] = React.useState(
    initialValues.paafApproveDate
  );
  const [paafFile, setPaafFile] = React.useState(initialValues.paafFile);
  const [loiIssueDate, setLoiIssueDate] = React.useState(
    initialValues.loiIssueDate
  );
  const [loiAcceptDate, setLoiAcceptDate] = React.useState(
    initialValues.loiAcceptDate
  );
  const [loiDeclineDate, setLoiDeclineDate] = React.useState(
    initialValues.loiDeclineDate
  );
  const [declineReason, setDeclineReason] = React.useState(
    initialValues.declineReason
  );
  const [loiFile, setLoiFile] = React.useState(initialValues.loiFile);
  const [cvecApproveDate, setCvecApproveDate] = React.useState(
    initialValues.cvecApproveDate
  );
  const [cvecFile, setCvecFile] = React.useState(initialValues.cvecFile);
  const [uploadCertificate, setUploadCertificate] = React.useState(
    initialValues.uploadCertificate
  );
  const [pcNoticePeriod, setPcNoticePeriod] = React.useState(
    initialValues.pcNoticePeriod
  );
  const [venue, setVenue] = React.useState(initialValues.venue);
  const [managerBadgeNo, setManagerBadgeNo] = React.useState(
    initialValues.managerBadgeNo
  );
  const [message, setMessage] = React.useState(initialValues.message);
  const [interType, setInterType] = React.useState(initialValues.interType);
  const [interTime, setInterTime] = React.useState(initialValues.interTime);
  const [interDate, setInterDate] = React.useState(initialValues.interDate);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = candIToEMPRecord
      ? { ...initialValues, ...candIToEMPRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setCrime(cleanValues.crime);
    setCrimeDesc(cleanValues.crimeDesc);
    setEmgDetails(cleanValues.emgDetails ?? []);
    setCurrentEmgDetailsValue("");
    setNoExperience(cleanValues.noExperience);
    setEmpStatement(cleanValues.empStatement);
    setDesc(cleanValues.desc);
    setDisease(cleanValues.disease);
    setDiseaseDesc(cleanValues.diseaseDesc);
    setLiquor(cleanValues.liquor);
    setLiquorDesc(cleanValues.liquorDesc);
    setPerIS(cleanValues.perIS);
    setPerID(cleanValues.perID);
    setReferees(cleanValues.referees ?? []);
    setCurrentRefereesValue("");
    setRelatives(cleanValues.relatives ?? []);
    setCurrentRelativesValue("");
    setSalaryExpectation(cleanValues.salaryExpectation);
    setSupportInfo(cleanValues.supportInfo);
    setWorkExperience(cleanValues.workExperience ?? []);
    setCurrentWorkExperienceValue("");
    setMobSignDate(cleanValues.mobSignDate);
    setMobFile(cleanValues.mobFile);
    setPaafApproveDate(cleanValues.paafApproveDate);
    setPaafFile(cleanValues.paafFile);
    setLoiIssueDate(cleanValues.loiIssueDate);
    setLoiAcceptDate(cleanValues.loiAcceptDate);
    setLoiDeclineDate(cleanValues.loiDeclineDate);
    setDeclineReason(cleanValues.declineReason);
    setLoiFile(cleanValues.loiFile);
    setCvecApproveDate(cleanValues.cvecApproveDate);
    setCvecFile(cleanValues.cvecFile);
    setUploadCertificate(cleanValues.uploadCertificate ?? []);
    setCurrentUploadCertificateValue("");
    setPcNoticePeriod(cleanValues.pcNoticePeriod);
    setVenue(cleanValues.venue);
    setManagerBadgeNo(cleanValues.managerBadgeNo);
    setMessage(cleanValues.message);
    setInterType(cleanValues.interType);
    setInterTime(cleanValues.interTime);
    setInterDate(cleanValues.interDate);
    setErrors({});
  };
  const [candIToEMPRecord, setCandIToEMPRecord] =
    React.useState(candIToEMPModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getCandIToEMP.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCandIToEMP
        : candIToEMPModelProp;
      setCandIToEMPRecord(record);
    };
    queryData();
  }, [idProp, candIToEMPModelProp]);
  React.useEffect(resetStateValues, [candIToEMPRecord]);
  const [currentEmgDetailsValue, setCurrentEmgDetailsValue] =
    React.useState("");
  const emgDetailsRef = React.createRef();
  const [currentRefereesValue, setCurrentRefereesValue] = React.useState("");
  const refereesRef = React.createRef();
  const [currentRelativesValue, setCurrentRelativesValue] = React.useState("");
  const relativesRef = React.createRef();
  const [currentWorkExperienceValue, setCurrentWorkExperienceValue] =
    React.useState("");
  const workExperienceRef = React.createRef();
  const [currentUploadCertificateValue, setCurrentUploadCertificateValue] =
    React.useState("");
  const uploadCertificateRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    crime: [],
    crimeDesc: [],
    emgDetails: [{ type: "Required" }, { type: "JSON" }],
    noExperience: [],
    empStatement: [],
    desc: [],
    disease: [],
    diseaseDesc: [],
    liquor: [],
    liquorDesc: [],
    perIS: [],
    perID: [],
    referees: [{ type: "JSON" }],
    relatives: [{ type: "JSON" }],
    salaryExpectation: [],
    supportInfo: [],
    workExperience: [{ type: "JSON" }],
    mobSignDate: [],
    mobFile: [],
    paafApproveDate: [],
    paafFile: [],
    loiIssueDate: [],
    loiAcceptDate: [],
    loiDeclineDate: [],
    declineReason: [],
    loiFile: [],
    cvecApproveDate: [],
    cvecFile: [],
    uploadCertificate: [{ type: "JSON" }],
    pcNoticePeriod: [],
    venue: [],
    managerBadgeNo: [],
    message: [],
    interType: [],
    interTime: [],
    interDate: [],
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
          crime: crime ?? null,
          crimeDesc: crimeDesc ?? null,
          emgDetails,
          noExperience: noExperience ?? null,
          empStatement: empStatement ?? null,
          desc: desc ?? null,
          disease: disease ?? null,
          diseaseDesc: diseaseDesc ?? null,
          liquor: liquor ?? null,
          liquorDesc: liquorDesc ?? null,
          perIS: perIS ?? null,
          perID: perID ?? null,
          referees: referees ?? null,
          relatives: relatives ?? null,
          salaryExpectation: salaryExpectation ?? null,
          supportInfo: supportInfo ?? null,
          workExperience: workExperience ?? null,
          mobSignDate: mobSignDate ?? null,
          mobFile: mobFile ?? null,
          paafApproveDate: paafApproveDate ?? null,
          paafFile: paafFile ?? null,
          loiIssueDate: loiIssueDate ?? null,
          loiAcceptDate: loiAcceptDate ?? null,
          loiDeclineDate: loiDeclineDate ?? null,
          declineReason: declineReason ?? null,
          loiFile: loiFile ?? null,
          cvecApproveDate: cvecApproveDate ?? null,
          cvecFile: cvecFile ?? null,
          uploadCertificate: uploadCertificate ?? null,
          pcNoticePeriod: pcNoticePeriod ?? null,
          venue: venue ?? null,
          managerBadgeNo: managerBadgeNo ?? null,
          message: message ?? null,
          interType: interType ?? null,
          interTime: interTime ?? null,
          interDate: interDate ?? null,
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
            query: updateCandIToEMP.replaceAll("__typename", ""),
            variables: {
              input: {
                id: candIToEMPRecord.id,
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
      {...getOverrideProps(overrides, "CandIToEMPUpdateForm")}
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
        label="Crime"
        isRequired={false}
        isReadOnly={false}
        value={crime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
          isRequired={true}
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
        label="Per is"
        isRequired={false}
        isReadOnly={false}
        value={perIS}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS: value,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
        label="Per id"
        isRequired={false}
        isReadOnly={false}
        value={perID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID: value,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.perID ?? value;
          }
          if (errors.perID?.hasError) {
            runValidationTasks("perID", value);
          }
          setPerID(value);
        }}
        onBlur={() => runValidationTasks("perID", perID)}
        errorMessage={errors.perID?.errorMessage}
        hasError={errors.perID?.hasError}
        {...getOverrideProps(overrides, "perID")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees: values,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives: values,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation: value,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo: value,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience: values,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
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
        label="Mob sign date"
        isRequired={false}
        isReadOnly={false}
        value={mobSignDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate: value,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.mobSignDate ?? value;
          }
          if (errors.mobSignDate?.hasError) {
            runValidationTasks("mobSignDate", value);
          }
          setMobSignDate(value);
        }}
        onBlur={() => runValidationTasks("mobSignDate", mobSignDate)}
        errorMessage={errors.mobSignDate?.errorMessage}
        hasError={errors.mobSignDate?.hasError}
        {...getOverrideProps(overrides, "mobSignDate")}
      ></TextField>
      <TextField
        label="Mob file"
        isRequired={false}
        isReadOnly={false}
        value={mobFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile: value,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.mobFile ?? value;
          }
          if (errors.mobFile?.hasError) {
            runValidationTasks("mobFile", value);
          }
          setMobFile(value);
        }}
        onBlur={() => runValidationTasks("mobFile", mobFile)}
        errorMessage={errors.mobFile?.errorMessage}
        hasError={errors.mobFile?.hasError}
        {...getOverrideProps(overrides, "mobFile")}
      ></TextField>
      <TextField
        label="Paaf approve date"
        isRequired={false}
        isReadOnly={false}
        value={paafApproveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate: value,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.paafApproveDate ?? value;
          }
          if (errors.paafApproveDate?.hasError) {
            runValidationTasks("paafApproveDate", value);
          }
          setPaafApproveDate(value);
        }}
        onBlur={() => runValidationTasks("paafApproveDate", paafApproveDate)}
        errorMessage={errors.paafApproveDate?.errorMessage}
        hasError={errors.paafApproveDate?.hasError}
        {...getOverrideProps(overrides, "paafApproveDate")}
      ></TextField>
      <TextField
        label="Paaf file"
        isRequired={false}
        isReadOnly={false}
        value={paafFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile: value,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.paafFile ?? value;
          }
          if (errors.paafFile?.hasError) {
            runValidationTasks("paafFile", value);
          }
          setPaafFile(value);
        }}
        onBlur={() => runValidationTasks("paafFile", paafFile)}
        errorMessage={errors.paafFile?.errorMessage}
        hasError={errors.paafFile?.hasError}
        {...getOverrideProps(overrides, "paafFile")}
      ></TextField>
      <TextField
        label="Loi issue date"
        isRequired={false}
        isReadOnly={false}
        value={loiIssueDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate: value,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.loiIssueDate ?? value;
          }
          if (errors.loiIssueDate?.hasError) {
            runValidationTasks("loiIssueDate", value);
          }
          setLoiIssueDate(value);
        }}
        onBlur={() => runValidationTasks("loiIssueDate", loiIssueDate)}
        errorMessage={errors.loiIssueDate?.errorMessage}
        hasError={errors.loiIssueDate?.hasError}
        {...getOverrideProps(overrides, "loiIssueDate")}
      ></TextField>
      <TextField
        label="Loi accept date"
        isRequired={false}
        isReadOnly={false}
        value={loiAcceptDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate: value,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.loiAcceptDate ?? value;
          }
          if (errors.loiAcceptDate?.hasError) {
            runValidationTasks("loiAcceptDate", value);
          }
          setLoiAcceptDate(value);
        }}
        onBlur={() => runValidationTasks("loiAcceptDate", loiAcceptDate)}
        errorMessage={errors.loiAcceptDate?.errorMessage}
        hasError={errors.loiAcceptDate?.hasError}
        {...getOverrideProps(overrides, "loiAcceptDate")}
      ></TextField>
      <TextField
        label="Loi decline date"
        isRequired={false}
        isReadOnly={false}
        value={loiDeclineDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate: value,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.loiDeclineDate ?? value;
          }
          if (errors.loiDeclineDate?.hasError) {
            runValidationTasks("loiDeclineDate", value);
          }
          setLoiDeclineDate(value);
        }}
        onBlur={() => runValidationTasks("loiDeclineDate", loiDeclineDate)}
        errorMessage={errors.loiDeclineDate?.errorMessage}
        hasError={errors.loiDeclineDate?.hasError}
        {...getOverrideProps(overrides, "loiDeclineDate")}
      ></TextField>
      <TextField
        label="Decline reason"
        isRequired={false}
        isReadOnly={false}
        value={declineReason}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason: value,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.declineReason ?? value;
          }
          if (errors.declineReason?.hasError) {
            runValidationTasks("declineReason", value);
          }
          setDeclineReason(value);
        }}
        onBlur={() => runValidationTasks("declineReason", declineReason)}
        errorMessage={errors.declineReason?.errorMessage}
        hasError={errors.declineReason?.hasError}
        {...getOverrideProps(overrides, "declineReason")}
      ></TextField>
      <TextField
        label="Loi file"
        isRequired={false}
        isReadOnly={false}
        value={loiFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile: value,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.loiFile ?? value;
          }
          if (errors.loiFile?.hasError) {
            runValidationTasks("loiFile", value);
          }
          setLoiFile(value);
        }}
        onBlur={() => runValidationTasks("loiFile", loiFile)}
        errorMessage={errors.loiFile?.errorMessage}
        hasError={errors.loiFile?.hasError}
        {...getOverrideProps(overrides, "loiFile")}
      ></TextField>
      <TextField
        label="Cvec approve date"
        isRequired={false}
        isReadOnly={false}
        value={cvecApproveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate: value,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.cvecApproveDate ?? value;
          }
          if (errors.cvecApproveDate?.hasError) {
            runValidationTasks("cvecApproveDate", value);
          }
          setCvecApproveDate(value);
        }}
        onBlur={() => runValidationTasks("cvecApproveDate", cvecApproveDate)}
        errorMessage={errors.cvecApproveDate?.errorMessage}
        hasError={errors.cvecApproveDate?.hasError}
        {...getOverrideProps(overrides, "cvecApproveDate")}
      ></TextField>
      <TextField
        label="Cvec file"
        isRequired={false}
        isReadOnly={false}
        value={cvecFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile: value,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.cvecFile ?? value;
          }
          if (errors.cvecFile?.hasError) {
            runValidationTasks("cvecFile", value);
          }
          setCvecFile(value);
        }}
        onBlur={() => runValidationTasks("cvecFile", cvecFile)}
        errorMessage={errors.cvecFile?.errorMessage}
        hasError={errors.cvecFile?.hasError}
        {...getOverrideProps(overrides, "cvecFile")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate: values,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            values = result?.uploadCertificate ?? values;
          }
          setUploadCertificate(values);
          setCurrentUploadCertificateValue("");
        }}
        currentFieldValue={currentUploadCertificateValue}
        label={"Upload certificate"}
        items={uploadCertificate}
        hasError={errors?.uploadCertificate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "uploadCertificate",
            currentUploadCertificateValue
          )
        }
        errorMessage={errors?.uploadCertificate?.errorMessage}
        setFieldValue={setCurrentUploadCertificateValue}
        inputFieldRef={uploadCertificateRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Upload certificate"
          isRequired={false}
          isReadOnly={false}
          value={currentUploadCertificateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.uploadCertificate?.hasError) {
              runValidationTasks("uploadCertificate", value);
            }
            setCurrentUploadCertificateValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "uploadCertificate",
              currentUploadCertificateValue
            )
          }
          errorMessage={errors.uploadCertificate?.errorMessage}
          hasError={errors.uploadCertificate?.hasError}
          ref={uploadCertificateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "uploadCertificate")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Pc notice period"
        isRequired={false}
        isReadOnly={false}
        value={pcNoticePeriod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod: value,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.pcNoticePeriod ?? value;
          }
          if (errors.pcNoticePeriod?.hasError) {
            runValidationTasks("pcNoticePeriod", value);
          }
          setPcNoticePeriod(value);
        }}
        onBlur={() => runValidationTasks("pcNoticePeriod", pcNoticePeriod)}
        errorMessage={errors.pcNoticePeriod?.errorMessage}
        hasError={errors.pcNoticePeriod?.hasError}
        {...getOverrideProps(overrides, "pcNoticePeriod")}
      ></TextField>
      <TextField
        label="Venue"
        isRequired={false}
        isReadOnly={false}
        value={venue}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue: value,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.venue ?? value;
          }
          if (errors.venue?.hasError) {
            runValidationTasks("venue", value);
          }
          setVenue(value);
        }}
        onBlur={() => runValidationTasks("venue", venue)}
        errorMessage={errors.venue?.errorMessage}
        hasError={errors.venue?.hasError}
        {...getOverrideProps(overrides, "venue")}
      ></TextField>
      <TextField
        label="Manager badge no"
        isRequired={false}
        isReadOnly={false}
        value={managerBadgeNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo: value,
              message,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.managerBadgeNo ?? value;
          }
          if (errors.managerBadgeNo?.hasError) {
            runValidationTasks("managerBadgeNo", value);
          }
          setManagerBadgeNo(value);
        }}
        onBlur={() => runValidationTasks("managerBadgeNo", managerBadgeNo)}
        errorMessage={errors.managerBadgeNo?.errorMessage}
        hasError={errors.managerBadgeNo?.hasError}
        {...getOverrideProps(overrides, "managerBadgeNo")}
      ></TextField>
      <TextField
        label="Message"
        isRequired={false}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message: value,
              interType,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
      ></TextField>
      <TextField
        label="Inter type"
        isRequired={false}
        isReadOnly={false}
        value={interType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType: value,
              interTime,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.interType ?? value;
          }
          if (errors.interType?.hasError) {
            runValidationTasks("interType", value);
          }
          setInterType(value);
        }}
        onBlur={() => runValidationTasks("interType", interType)}
        errorMessage={errors.interType?.errorMessage}
        hasError={errors.interType?.hasError}
        {...getOverrideProps(overrides, "interType")}
      ></TextField>
      <TextField
        label="Inter time"
        isRequired={false}
        isReadOnly={false}
        value={interTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime: value,
              interDate,
            };
            const result = onChange(modelFields);
            value = result?.interTime ?? value;
          }
          if (errors.interTime?.hasError) {
            runValidationTasks("interTime", value);
          }
          setInterTime(value);
        }}
        onBlur={() => runValidationTasks("interTime", interTime)}
        errorMessage={errors.interTime?.errorMessage}
        hasError={errors.interTime?.hasError}
        {...getOverrideProps(overrides, "interTime")}
      ></TextField>
      <TextField
        label="Inter date"
        isRequired={false}
        isReadOnly={false}
        value={interDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
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
              perIS,
              perID,
              referees,
              relatives,
              salaryExpectation,
              supportInfo,
              workExperience,
              mobSignDate,
              mobFile,
              paafApproveDate,
              paafFile,
              loiIssueDate,
              loiAcceptDate,
              loiDeclineDate,
              declineReason,
              loiFile,
              cvecApproveDate,
              cvecFile,
              uploadCertificate,
              pcNoticePeriod,
              venue,
              managerBadgeNo,
              message,
              interType,
              interTime,
              interDate: value,
            };
            const result = onChange(modelFields);
            value = result?.interDate ?? value;
          }
          if (errors.interDate?.hasError) {
            runValidationTasks("interDate", value);
          }
          setInterDate(value);
        }}
        onBlur={() => runValidationTasks("interDate", interDate)}
        errorMessage={errors.interDate?.errorMessage}
        hasError={errors.interDate?.hasError}
        {...getOverrideProps(overrides, "interDate")}
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
          isDisabled={!(idProp || candIToEMPModelProp)}
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
              !(idProp || candIToEMPModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
