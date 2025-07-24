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
import { getIDDetails } from "../graphql/queries";
import { updateIDDetails } from "../graphql/mutations";
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
export default function IDDetailsUpdateForm(props) {
  const {
    id: idProp,
    iDDetails: iDDetailsModelProp,
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
    applicationUpload: [],
    bwnIcNo: "",
    bwnIcColour: "",
    bwnIcExpiry: [],
    bwnUpload: [],
    cvCertifyUpload: [],
    driveLic: "",
    inducBrief: "",
    inducBriefUp: "",
    loiUpload: [],
    myIcNo: "",
    myIcUpload: [],
    nationality: "",
    nationalCat: "",
    otherNation: "",
    otherRace: "",
    otherReligion: "",
    ppNo: [],
    paafCvevUpload: [],
    ppIssued: [],
    ppExpiry: [],
    ppUpload: [],
    ppDestinate: [],
    preEmp: "",
    preEmpPeriod: "",
    race: "",
    religion: "",
    supportDocUpload: [],
    qcCertifyUpload: [],
    createdBy: [],
    updatedBy: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [applicationUpload, setApplicationUpload] = React.useState(
    initialValues.applicationUpload
  );
  const [bwnIcNo, setBwnIcNo] = React.useState(initialValues.bwnIcNo);
  const [bwnIcColour, setBwnIcColour] = React.useState(
    initialValues.bwnIcColour
  );
  const [bwnIcExpiry, setBwnIcExpiry] = React.useState(
    initialValues.bwnIcExpiry
  );
  const [bwnUpload, setBwnUpload] = React.useState(initialValues.bwnUpload);
  const [cvCertifyUpload, setCvCertifyUpload] = React.useState(
    initialValues.cvCertifyUpload
  );
  const [driveLic, setDriveLic] = React.useState(initialValues.driveLic);
  const [inducBrief, setInducBrief] = React.useState(initialValues.inducBrief);
  const [inducBriefUp, setInducBriefUp] = React.useState(
    initialValues.inducBriefUp
  );
  const [loiUpload, setLoiUpload] = React.useState(initialValues.loiUpload);
  const [myIcNo, setMyIcNo] = React.useState(initialValues.myIcNo);
  const [myIcUpload, setMyIcUpload] = React.useState(initialValues.myIcUpload);
  const [nationality, setNationality] = React.useState(
    initialValues.nationality
  );
  const [nationalCat, setNationalCat] = React.useState(
    initialValues.nationalCat
  );
  const [otherNation, setOtherNation] = React.useState(
    initialValues.otherNation
  );
  const [otherRace, setOtherRace] = React.useState(initialValues.otherRace);
  const [otherReligion, setOtherReligion] = React.useState(
    initialValues.otherReligion
  );
  const [ppNo, setPpNo] = React.useState(initialValues.ppNo);
  const [paafCvevUpload, setPaafCvevUpload] = React.useState(
    initialValues.paafCvevUpload
  );
  const [ppIssued, setPpIssued] = React.useState(initialValues.ppIssued);
  const [ppExpiry, setPpExpiry] = React.useState(initialValues.ppExpiry);
  const [ppUpload, setPpUpload] = React.useState(initialValues.ppUpload);
  const [ppDestinate, setPpDestinate] = React.useState(
    initialValues.ppDestinate
  );
  const [preEmp, setPreEmp] = React.useState(initialValues.preEmp);
  const [preEmpPeriod, setPreEmpPeriod] = React.useState(
    initialValues.preEmpPeriod
  );
  const [race, setRace] = React.useState(initialValues.race);
  const [religion, setReligion] = React.useState(initialValues.religion);
  const [supportDocUpload, setSupportDocUpload] = React.useState(
    initialValues.supportDocUpload
  );
  const [qcCertifyUpload, setQcCertifyUpload] = React.useState(
    initialValues.qcCertifyUpload
  );
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [updatedBy, setUpdatedBy] = React.useState(initialValues.updatedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = iDDetailsRecord
      ? { ...initialValues, ...iDDetailsRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setApplicationUpload(cleanValues.applicationUpload ?? []);
    setCurrentApplicationUploadValue("");
    setBwnIcNo(cleanValues.bwnIcNo);
    setBwnIcColour(cleanValues.bwnIcColour);
    setBwnIcExpiry(cleanValues.bwnIcExpiry ?? []);
    setCurrentBwnIcExpiryValue("");
    setBwnUpload(cleanValues.bwnUpload ?? []);
    setCurrentBwnUploadValue("");
    setCvCertifyUpload(cleanValues.cvCertifyUpload ?? []);
    setCurrentCvCertifyUploadValue("");
    setDriveLic(cleanValues.driveLic);
    setInducBrief(cleanValues.inducBrief);
    setInducBriefUp(cleanValues.inducBriefUp);
    setLoiUpload(cleanValues.loiUpload ?? []);
    setCurrentLoiUploadValue("");
    setMyIcNo(cleanValues.myIcNo);
    setMyIcUpload(cleanValues.myIcUpload ?? []);
    setCurrentMyIcUploadValue("");
    setNationality(cleanValues.nationality);
    setNationalCat(cleanValues.nationalCat);
    setOtherNation(cleanValues.otherNation);
    setOtherRace(cleanValues.otherRace);
    setOtherReligion(cleanValues.otherReligion);
    setPpNo(cleanValues.ppNo ?? []);
    setCurrentPpNoValue("");
    setPaafCvevUpload(cleanValues.paafCvevUpload ?? []);
    setCurrentPaafCvevUploadValue("");
    setPpIssued(cleanValues.ppIssued ?? []);
    setCurrentPpIssuedValue("");
    setPpExpiry(cleanValues.ppExpiry ?? []);
    setCurrentPpExpiryValue("");
    setPpUpload(cleanValues.ppUpload ?? []);
    setCurrentPpUploadValue("");
    setPpDestinate(cleanValues.ppDestinate ?? []);
    setCurrentPpDestinateValue("");
    setPreEmp(cleanValues.preEmp);
    setPreEmpPeriod(cleanValues.preEmpPeriod);
    setRace(cleanValues.race);
    setReligion(cleanValues.religion);
    setSupportDocUpload(cleanValues.supportDocUpload ?? []);
    setCurrentSupportDocUploadValue("");
    setQcCertifyUpload(cleanValues.qcCertifyUpload ?? []);
    setCurrentQcCertifyUploadValue("");
    setCreatedBy(cleanValues.createdBy ?? []);
    setCurrentCreatedByValue("");
    setUpdatedBy(cleanValues.updatedBy ?? []);
    setCurrentUpdatedByValue("");
    setErrors({});
  };
  const [iDDetailsRecord, setIDDetailsRecord] =
    React.useState(iDDetailsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getIDDetails.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getIDDetails
        : iDDetailsModelProp;
      setIDDetailsRecord(record);
    };
    queryData();
  }, [idProp, iDDetailsModelProp]);
  React.useEffect(resetStateValues, [iDDetailsRecord]);
  const [currentApplicationUploadValue, setCurrentApplicationUploadValue] =
    React.useState("");
  const applicationUploadRef = React.createRef();
  const [currentBwnIcExpiryValue, setCurrentBwnIcExpiryValue] =
    React.useState("");
  const bwnIcExpiryRef = React.createRef();
  const [currentBwnUploadValue, setCurrentBwnUploadValue] = React.useState("");
  const bwnUploadRef = React.createRef();
  const [currentCvCertifyUploadValue, setCurrentCvCertifyUploadValue] =
    React.useState("");
  const cvCertifyUploadRef = React.createRef();
  const [currentLoiUploadValue, setCurrentLoiUploadValue] = React.useState("");
  const loiUploadRef = React.createRef();
  const [currentMyIcUploadValue, setCurrentMyIcUploadValue] =
    React.useState("");
  const myIcUploadRef = React.createRef();
  const [currentPpNoValue, setCurrentPpNoValue] = React.useState("");
  const ppNoRef = React.createRef();
  const [currentPaafCvevUploadValue, setCurrentPaafCvevUploadValue] =
    React.useState("");
  const paafCvevUploadRef = React.createRef();
  const [currentPpIssuedValue, setCurrentPpIssuedValue] = React.useState("");
  const ppIssuedRef = React.createRef();
  const [currentPpExpiryValue, setCurrentPpExpiryValue] = React.useState("");
  const ppExpiryRef = React.createRef();
  const [currentPpUploadValue, setCurrentPpUploadValue] = React.useState("");
  const ppUploadRef = React.createRef();
  const [currentPpDestinateValue, setCurrentPpDestinateValue] =
    React.useState("");
  const ppDestinateRef = React.createRef();
  const [currentSupportDocUploadValue, setCurrentSupportDocUploadValue] =
    React.useState("");
  const supportDocUploadRef = React.createRef();
  const [currentQcCertifyUploadValue, setCurrentQcCertifyUploadValue] =
    React.useState("");
  const qcCertifyUploadRef = React.createRef();
  const [currentCreatedByValue, setCurrentCreatedByValue] = React.useState("");
  const createdByRef = React.createRef();
  const [currentUpdatedByValue, setCurrentUpdatedByValue] = React.useState("");
  const updatedByRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    applicationUpload: [{ type: "JSON" }],
    bwnIcNo: [],
    bwnIcColour: [],
    bwnIcExpiry: [],
    bwnUpload: [{ type: "JSON" }],
    cvCertifyUpload: [{ type: "JSON" }],
    driveLic: [],
    inducBrief: [],
    inducBriefUp: [],
    loiUpload: [{ type: "JSON" }],
    myIcNo: [],
    myIcUpload: [{ type: "JSON" }],
    nationality: [],
    nationalCat: [],
    otherNation: [],
    otherRace: [],
    otherReligion: [],
    ppNo: [],
    paafCvevUpload: [{ type: "JSON" }],
    ppIssued: [],
    ppExpiry: [],
    ppUpload: [{ type: "JSON" }],
    ppDestinate: [],
    preEmp: [],
    preEmpPeriod: [],
    race: [],
    religion: [],
    supportDocUpload: [{ type: "JSON" }],
    qcCertifyUpload: [{ type: "JSON" }],
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
          empID,
          applicationUpload: applicationUpload ?? null,
          bwnIcNo: bwnIcNo ?? null,
          bwnIcColour: bwnIcColour ?? null,
          bwnIcExpiry: bwnIcExpiry ?? null,
          bwnUpload: bwnUpload ?? null,
          cvCertifyUpload: cvCertifyUpload ?? null,
          driveLic: driveLic ?? null,
          inducBrief: inducBrief ?? null,
          inducBriefUp: inducBriefUp ?? null,
          loiUpload: loiUpload ?? null,
          myIcNo: myIcNo ?? null,
          myIcUpload: myIcUpload ?? null,
          nationality: nationality ?? null,
          nationalCat: nationalCat ?? null,
          otherNation: otherNation ?? null,
          otherRace: otherRace ?? null,
          otherReligion: otherReligion ?? null,
          ppNo: ppNo ?? null,
          paafCvevUpload: paafCvevUpload ?? null,
          ppIssued: ppIssued ?? null,
          ppExpiry: ppExpiry ?? null,
          ppUpload: ppUpload ?? null,
          ppDestinate: ppDestinate ?? null,
          preEmp: preEmp ?? null,
          preEmpPeriod: preEmpPeriod ?? null,
          race: race ?? null,
          religion: religion ?? null,
          supportDocUpload: supportDocUpload ?? null,
          qcCertifyUpload: qcCertifyUpload ?? null,
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
            query: updateIDDetails.replaceAll("__typename", ""),
            variables: {
              input: {
                id: iDDetailsRecord.id,
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
      {...getOverrideProps(overrides, "IDDetailsUpdateForm")}
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
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
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
              applicationUpload: values,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.applicationUpload ?? values;
          }
          setApplicationUpload(values);
          setCurrentApplicationUploadValue("");
        }}
        currentFieldValue={currentApplicationUploadValue}
        label={"Application upload"}
        items={applicationUpload}
        hasError={errors?.applicationUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "applicationUpload",
            currentApplicationUploadValue
          )
        }
        errorMessage={errors?.applicationUpload?.errorMessage}
        setFieldValue={setCurrentApplicationUploadValue}
        inputFieldRef={applicationUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Application upload"
          isRequired={false}
          isReadOnly={false}
          value={currentApplicationUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.applicationUpload?.hasError) {
              runValidationTasks("applicationUpload", value);
            }
            setCurrentApplicationUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "applicationUpload",
              currentApplicationUploadValue
            )
          }
          errorMessage={errors.applicationUpload?.errorMessage}
          hasError={errors.applicationUpload?.hasError}
          ref={applicationUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "applicationUpload")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Bwn ic no"
        isRequired={false}
        isReadOnly={false}
        value={bwnIcNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo: value,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
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
        label="Bwn ic colour"
        isRequired={false}
        isReadOnly={false}
        value={bwnIcColour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour: value,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry: values,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.bwnIcExpiry ?? values;
          }
          setBwnIcExpiry(values);
          setCurrentBwnIcExpiryValue("");
        }}
        currentFieldValue={currentBwnIcExpiryValue}
        label={"Bwn ic expiry"}
        items={bwnIcExpiry}
        hasError={errors?.bwnIcExpiry?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bwnIcExpiry", currentBwnIcExpiryValue)
        }
        errorMessage={errors?.bwnIcExpiry?.errorMessage}
        setFieldValue={setCurrentBwnIcExpiryValue}
        inputFieldRef={bwnIcExpiryRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bwn ic expiry"
          isRequired={false}
          isReadOnly={false}
          value={currentBwnIcExpiryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bwnIcExpiry?.hasError) {
              runValidationTasks("bwnIcExpiry", value);
            }
            setCurrentBwnIcExpiryValue(value);
          }}
          onBlur={() =>
            runValidationTasks("bwnIcExpiry", currentBwnIcExpiryValue)
          }
          errorMessage={errors.bwnIcExpiry?.errorMessage}
          hasError={errors.bwnIcExpiry?.hasError}
          ref={bwnIcExpiryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bwnIcExpiry")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload: values,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.bwnUpload ?? values;
          }
          setBwnUpload(values);
          setCurrentBwnUploadValue("");
        }}
        currentFieldValue={currentBwnUploadValue}
        label={"Bwn upload"}
        items={bwnUpload}
        hasError={errors?.bwnUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bwnUpload", currentBwnUploadValue)
        }
        errorMessage={errors?.bwnUpload?.errorMessage}
        setFieldValue={setCurrentBwnUploadValue}
        inputFieldRef={bwnUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Bwn upload"
          isRequired={false}
          isReadOnly={false}
          value={currentBwnUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bwnUpload?.hasError) {
              runValidationTasks("bwnUpload", value);
            }
            setCurrentBwnUploadValue(value);
          }}
          onBlur={() => runValidationTasks("bwnUpload", currentBwnUploadValue)}
          errorMessage={errors.bwnUpload?.errorMessage}
          hasError={errors.bwnUpload?.hasError}
          ref={bwnUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bwnUpload")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload: values,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.cvCertifyUpload ?? values;
          }
          setCvCertifyUpload(values);
          setCurrentCvCertifyUploadValue("");
        }}
        currentFieldValue={currentCvCertifyUploadValue}
        label={"Cv certify upload"}
        items={cvCertifyUpload}
        hasError={errors?.cvCertifyUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "cvCertifyUpload",
            currentCvCertifyUploadValue
          )
        }
        errorMessage={errors?.cvCertifyUpload?.errorMessage}
        setFieldValue={setCurrentCvCertifyUploadValue}
        inputFieldRef={cvCertifyUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Cv certify upload"
          isRequired={false}
          isReadOnly={false}
          value={currentCvCertifyUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.cvCertifyUpload?.hasError) {
              runValidationTasks("cvCertifyUpload", value);
            }
            setCurrentCvCertifyUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("cvCertifyUpload", currentCvCertifyUploadValue)
          }
          errorMessage={errors.cvCertifyUpload?.errorMessage}
          hasError={errors.cvCertifyUpload?.hasError}
          ref={cvCertifyUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "cvCertifyUpload")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Drive lic"
        isRequired={false}
        isReadOnly={false}
        value={driveLic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic: value,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
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
        label="Induc brief"
        isRequired={false}
        isReadOnly={false}
        value={inducBrief}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief: value,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.inducBrief ?? value;
          }
          if (errors.inducBrief?.hasError) {
            runValidationTasks("inducBrief", value);
          }
          setInducBrief(value);
        }}
        onBlur={() => runValidationTasks("inducBrief", inducBrief)}
        errorMessage={errors.inducBrief?.errorMessage}
        hasError={errors.inducBrief?.hasError}
        {...getOverrideProps(overrides, "inducBrief")}
      ></TextField>
      <TextField
        label="Induc brief up"
        isRequired={false}
        isReadOnly={false}
        value={inducBriefUp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp: value,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.inducBriefUp ?? value;
          }
          if (errors.inducBriefUp?.hasError) {
            runValidationTasks("inducBriefUp", value);
          }
          setInducBriefUp(value);
        }}
        onBlur={() => runValidationTasks("inducBriefUp", inducBriefUp)}
        errorMessage={errors.inducBriefUp?.errorMessage}
        hasError={errors.inducBriefUp?.hasError}
        {...getOverrideProps(overrides, "inducBriefUp")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload: values,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.loiUpload ?? values;
          }
          setLoiUpload(values);
          setCurrentLoiUploadValue("");
        }}
        currentFieldValue={currentLoiUploadValue}
        label={"Loi upload"}
        items={loiUpload}
        hasError={errors?.loiUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("loiUpload", currentLoiUploadValue)
        }
        errorMessage={errors?.loiUpload?.errorMessage}
        setFieldValue={setCurrentLoiUploadValue}
        inputFieldRef={loiUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Loi upload"
          isRequired={false}
          isReadOnly={false}
          value={currentLoiUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.loiUpload?.hasError) {
              runValidationTasks("loiUpload", value);
            }
            setCurrentLoiUploadValue(value);
          }}
          onBlur={() => runValidationTasks("loiUpload", currentLoiUploadValue)}
          errorMessage={errors.loiUpload?.errorMessage}
          hasError={errors.loiUpload?.hasError}
          ref={loiUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "loiUpload")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="My ic no"
        isRequired={false}
        isReadOnly={false}
        value={myIcNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo: value,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.myIcNo ?? value;
          }
          if (errors.myIcNo?.hasError) {
            runValidationTasks("myIcNo", value);
          }
          setMyIcNo(value);
        }}
        onBlur={() => runValidationTasks("myIcNo", myIcNo)}
        errorMessage={errors.myIcNo?.errorMessage}
        hasError={errors.myIcNo?.hasError}
        {...getOverrideProps(overrides, "myIcNo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload: values,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.myIcUpload ?? values;
          }
          setMyIcUpload(values);
          setCurrentMyIcUploadValue("");
        }}
        currentFieldValue={currentMyIcUploadValue}
        label={"My ic upload"}
        items={myIcUpload}
        hasError={errors?.myIcUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("myIcUpload", currentMyIcUploadValue)
        }
        errorMessage={errors?.myIcUpload?.errorMessage}
        setFieldValue={setCurrentMyIcUploadValue}
        inputFieldRef={myIcUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="My ic upload"
          isRequired={false}
          isReadOnly={false}
          value={currentMyIcUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.myIcUpload?.hasError) {
              runValidationTasks("myIcUpload", value);
            }
            setCurrentMyIcUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("myIcUpload", currentMyIcUploadValue)
          }
          errorMessage={errors.myIcUpload?.errorMessage}
          hasError={errors.myIcUpload?.hasError}
          ref={myIcUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "myIcUpload")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Nationality"
        isRequired={false}
        isReadOnly={false}
        value={nationality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality: value,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
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
        label="National cat"
        isRequired={false}
        isReadOnly={false}
        value={nationalCat}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat: value,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.nationalCat ?? value;
          }
          if (errors.nationalCat?.hasError) {
            runValidationTasks("nationalCat", value);
          }
          setNationalCat(value);
        }}
        onBlur={() => runValidationTasks("nationalCat", nationalCat)}
        errorMessage={errors.nationalCat?.errorMessage}
        hasError={errors.nationalCat?.hasError}
        {...getOverrideProps(overrides, "nationalCat")}
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
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation: value,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
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
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace: value,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
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
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion: value,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo: values,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.ppNo ?? values;
          }
          setPpNo(values);
          setCurrentPpNoValue("");
        }}
        currentFieldValue={currentPpNoValue}
        label={"Pp no"}
        items={ppNo}
        hasError={errors?.ppNo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ppNo", currentPpNoValue)
        }
        errorMessage={errors?.ppNo?.errorMessage}
        setFieldValue={setCurrentPpNoValue}
        inputFieldRef={ppNoRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pp no"
          isRequired={false}
          isReadOnly={false}
          value={currentPpNoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ppNo?.hasError) {
              runValidationTasks("ppNo", value);
            }
            setCurrentPpNoValue(value);
          }}
          onBlur={() => runValidationTasks("ppNo", currentPpNoValue)}
          errorMessage={errors.ppNo?.errorMessage}
          hasError={errors.ppNo?.hasError}
          ref={ppNoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ppNo")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload: values,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.paafCvevUpload ?? values;
          }
          setPaafCvevUpload(values);
          setCurrentPaafCvevUploadValue("");
        }}
        currentFieldValue={currentPaafCvevUploadValue}
        label={"Paaf cvev upload"}
        items={paafCvevUpload}
        hasError={errors?.paafCvevUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("paafCvevUpload", currentPaafCvevUploadValue)
        }
        errorMessage={errors?.paafCvevUpload?.errorMessage}
        setFieldValue={setCurrentPaafCvevUploadValue}
        inputFieldRef={paafCvevUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Paaf cvev upload"
          isRequired={false}
          isReadOnly={false}
          value={currentPaafCvevUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.paafCvevUpload?.hasError) {
              runValidationTasks("paafCvevUpload", value);
            }
            setCurrentPaafCvevUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("paafCvevUpload", currentPaafCvevUploadValue)
          }
          errorMessage={errors.paafCvevUpload?.errorMessage}
          hasError={errors.paafCvevUpload?.hasError}
          ref={paafCvevUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "paafCvevUpload")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued: values,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.ppIssued ?? values;
          }
          setPpIssued(values);
          setCurrentPpIssuedValue("");
        }}
        currentFieldValue={currentPpIssuedValue}
        label={"Pp issued"}
        items={ppIssued}
        hasError={errors?.ppIssued?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ppIssued", currentPpIssuedValue)
        }
        errorMessage={errors?.ppIssued?.errorMessage}
        setFieldValue={setCurrentPpIssuedValue}
        inputFieldRef={ppIssuedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pp issued"
          isRequired={false}
          isReadOnly={false}
          value={currentPpIssuedValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ppIssued?.hasError) {
              runValidationTasks("ppIssued", value);
            }
            setCurrentPpIssuedValue(value);
          }}
          onBlur={() => runValidationTasks("ppIssued", currentPpIssuedValue)}
          errorMessage={errors.ppIssued?.errorMessage}
          hasError={errors.ppIssued?.hasError}
          ref={ppIssuedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ppIssued")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry: values,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.ppExpiry ?? values;
          }
          setPpExpiry(values);
          setCurrentPpExpiryValue("");
        }}
        currentFieldValue={currentPpExpiryValue}
        label={"Pp expiry"}
        items={ppExpiry}
        hasError={errors?.ppExpiry?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ppExpiry", currentPpExpiryValue)
        }
        errorMessage={errors?.ppExpiry?.errorMessage}
        setFieldValue={setCurrentPpExpiryValue}
        inputFieldRef={ppExpiryRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pp expiry"
          isRequired={false}
          isReadOnly={false}
          value={currentPpExpiryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ppExpiry?.hasError) {
              runValidationTasks("ppExpiry", value);
            }
            setCurrentPpExpiryValue(value);
          }}
          onBlur={() => runValidationTasks("ppExpiry", currentPpExpiryValue)}
          errorMessage={errors.ppExpiry?.errorMessage}
          hasError={errors.ppExpiry?.hasError}
          ref={ppExpiryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ppExpiry")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload: values,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.ppUpload ?? values;
          }
          setPpUpload(values);
          setCurrentPpUploadValue("");
        }}
        currentFieldValue={currentPpUploadValue}
        label={"Pp upload"}
        items={ppUpload}
        hasError={errors?.ppUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ppUpload", currentPpUploadValue)
        }
        errorMessage={errors?.ppUpload?.errorMessage}
        setFieldValue={setCurrentPpUploadValue}
        inputFieldRef={ppUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Pp upload"
          isRequired={false}
          isReadOnly={false}
          value={currentPpUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ppUpload?.hasError) {
              runValidationTasks("ppUpload", value);
            }
            setCurrentPpUploadValue(value);
          }}
          onBlur={() => runValidationTasks("ppUpload", currentPpUploadValue)}
          errorMessage={errors.ppUpload?.errorMessage}
          hasError={errors.ppUpload?.hasError}
          ref={ppUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ppUpload")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate: values,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.ppDestinate ?? values;
          }
          setPpDestinate(values);
          setCurrentPpDestinateValue("");
        }}
        currentFieldValue={currentPpDestinateValue}
        label={"Pp destinate"}
        items={ppDestinate}
        hasError={errors?.ppDestinate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ppDestinate", currentPpDestinateValue)
        }
        errorMessage={errors?.ppDestinate?.errorMessage}
        setFieldValue={setCurrentPpDestinateValue}
        inputFieldRef={ppDestinateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pp destinate"
          isRequired={false}
          isReadOnly={false}
          value={currentPpDestinateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ppDestinate?.hasError) {
              runValidationTasks("ppDestinate", value);
            }
            setCurrentPpDestinateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("ppDestinate", currentPpDestinateValue)
          }
          errorMessage={errors.ppDestinate?.errorMessage}
          hasError={errors.ppDestinate?.hasError}
          ref={ppDestinateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ppDestinate")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Pre emp"
        isRequired={false}
        isReadOnly={false}
        value={preEmp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp: value,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.preEmp ?? value;
          }
          if (errors.preEmp?.hasError) {
            runValidationTasks("preEmp", value);
          }
          setPreEmp(value);
        }}
        onBlur={() => runValidationTasks("preEmp", preEmp)}
        errorMessage={errors.preEmp?.errorMessage}
        hasError={errors.preEmp?.hasError}
        {...getOverrideProps(overrides, "preEmp")}
      ></TextField>
      <TextField
        label="Pre emp period"
        isRequired={false}
        isReadOnly={false}
        value={preEmpPeriod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod: value,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.preEmpPeriod ?? value;
          }
          if (errors.preEmpPeriod?.hasError) {
            runValidationTasks("preEmpPeriod", value);
          }
          setPreEmpPeriod(value);
        }}
        onBlur={() => runValidationTasks("preEmpPeriod", preEmpPeriod)}
        errorMessage={errors.preEmpPeriod?.errorMessage}
        hasError={errors.preEmpPeriod?.hasError}
        {...getOverrideProps(overrides, "preEmpPeriod")}
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
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race: value,
              religion,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
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
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion: value,
              supportDocUpload,
              qcCertifyUpload,
              createdBy,
              updatedBy,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload: values,
              qcCertifyUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.supportDocUpload ?? values;
          }
          setSupportDocUpload(values);
          setCurrentSupportDocUploadValue("");
        }}
        currentFieldValue={currentSupportDocUploadValue}
        label={"Support doc upload"}
        items={supportDocUpload}
        hasError={errors?.supportDocUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "supportDocUpload",
            currentSupportDocUploadValue
          )
        }
        errorMessage={errors?.supportDocUpload?.errorMessage}
        setFieldValue={setCurrentSupportDocUploadValue}
        inputFieldRef={supportDocUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Support doc upload"
          isRequired={false}
          isReadOnly={false}
          value={currentSupportDocUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.supportDocUpload?.hasError) {
              runValidationTasks("supportDocUpload", value);
            }
            setCurrentSupportDocUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("supportDocUpload", currentSupportDocUploadValue)
          }
          errorMessage={errors.supportDocUpload?.errorMessage}
          hasError={errors.supportDocUpload?.hasError}
          ref={supportDocUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "supportDocUpload")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload: values,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.qcCertifyUpload ?? values;
          }
          setQcCertifyUpload(values);
          setCurrentQcCertifyUploadValue("");
        }}
        currentFieldValue={currentQcCertifyUploadValue}
        label={"Qc certify upload"}
        items={qcCertifyUpload}
        hasError={errors?.qcCertifyUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "qcCertifyUpload",
            currentQcCertifyUploadValue
          )
        }
        errorMessage={errors?.qcCertifyUpload?.errorMessage}
        setFieldValue={setCurrentQcCertifyUploadValue}
        inputFieldRef={qcCertifyUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Qc certify upload"
          isRequired={false}
          isReadOnly={false}
          value={currentQcCertifyUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.qcCertifyUpload?.hasError) {
              runValidationTasks("qcCertifyUpload", value);
            }
            setCurrentQcCertifyUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("qcCertifyUpload", currentQcCertifyUploadValue)
          }
          errorMessage={errors.qcCertifyUpload?.errorMessage}
          hasError={errors.qcCertifyUpload?.hasError}
          ref={qcCertifyUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "qcCertifyUpload")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
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
              applicationUpload,
              bwnIcNo,
              bwnIcColour,
              bwnIcExpiry,
              bwnUpload,
              cvCertifyUpload,
              driveLic,
              inducBrief,
              inducBriefUp,
              loiUpload,
              myIcNo,
              myIcUpload,
              nationality,
              nationalCat,
              otherNation,
              otherRace,
              otherReligion,
              ppNo,
              paafCvevUpload,
              ppIssued,
              ppExpiry,
              ppUpload,
              ppDestinate,
              preEmp,
              preEmpPeriod,
              race,
              religion,
              supportDocUpload,
              qcCertifyUpload,
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
          isDisabled={!(idProp || iDDetailsModelProp)}
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
              !(idProp || iDDetailsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
