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
import { createWPTracking } from "../graphql/mutations";
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
export default function WPTrackingCreateForm(props) {
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
    supportletterReqDate: "",
    supportletterReceiveDate: "",
    letterfile: "",
    doesubmitdate: "",
    doeapprovedate: "",
    doeexpirydate: "",
    doefile: "",
    nlmssubmitdate: "",
    submissionrefrenceno: "",
    nlmsapprovedate: "",
    ldreferenceno: "",
    nlmsexpirydate: "",
    nlmsfile: "",
    bgsubmitdate: "",
    bgreceivedate: "",
    referenceno: "",
    bgamount: "",
    bgexpirydate: "",
    bgfile: "",
    tbapurchasedate: "",
    jitpaamount: "",
    jitpaexpirydate: "",
    receiptno: "",
    depositamount: "",
    submitdateendorsement: "",
    jitpafile: "",
    immbdno: "",
    docsubmitdate: "",
    visaapprovedate: "",
    visareferenceno: "",
    visaFile: "",
    departuredate: "",
    arrivaldate: "",
    cityname: "",
    airfare: "",
    airticketfile: "",
    agentname: "",
    mobSignDate: "",
    mobFile: "",
    doerefno: "",
    sawpDate: "",
    sawpRecivedDate: "",
    sawpFile: "",
    lbrDepoNum: "",
    lbrEndroseDate: "",
    lbrDepoAmount: "",
    lbrFile: "",
    remarkNLMob: "",
    createdBy: [],
    updatedBy: [],
  };
  const [tempID, setTempID] = React.useState(initialValues.tempID);
  const [supportletterReqDate, setSupportletterReqDate] = React.useState(
    initialValues.supportletterReqDate
  );
  const [supportletterReceiveDate, setSupportletterReceiveDate] =
    React.useState(initialValues.supportletterReceiveDate);
  const [letterfile, setLetterfile] = React.useState(initialValues.letterfile);
  const [doesubmitdate, setDoesubmitdate] = React.useState(
    initialValues.doesubmitdate
  );
  const [doeapprovedate, setDoeapprovedate] = React.useState(
    initialValues.doeapprovedate
  );
  const [doeexpirydate, setDoeexpirydate] = React.useState(
    initialValues.doeexpirydate
  );
  const [doefile, setDoefile] = React.useState(initialValues.doefile);
  const [nlmssubmitdate, setNlmssubmitdate] = React.useState(
    initialValues.nlmssubmitdate
  );
  const [submissionrefrenceno, setSubmissionrefrenceno] = React.useState(
    initialValues.submissionrefrenceno
  );
  const [nlmsapprovedate, setNlmsapprovedate] = React.useState(
    initialValues.nlmsapprovedate
  );
  const [ldreferenceno, setLdreferenceno] = React.useState(
    initialValues.ldreferenceno
  );
  const [nlmsexpirydate, setNlmsexpirydate] = React.useState(
    initialValues.nlmsexpirydate
  );
  const [nlmsfile, setNlmsfile] = React.useState(initialValues.nlmsfile);
  const [bgsubmitdate, setBgsubmitdate] = React.useState(
    initialValues.bgsubmitdate
  );
  const [bgreceivedate, setBgreceivedate] = React.useState(
    initialValues.bgreceivedate
  );
  const [referenceno, setReferenceno] = React.useState(
    initialValues.referenceno
  );
  const [bgamount, setBgamount] = React.useState(initialValues.bgamount);
  const [bgexpirydate, setBgexpirydate] = React.useState(
    initialValues.bgexpirydate
  );
  const [bgfile, setBgfile] = React.useState(initialValues.bgfile);
  const [tbapurchasedate, setTbapurchasedate] = React.useState(
    initialValues.tbapurchasedate
  );
  const [jitpaamount, setJitpaamount] = React.useState(
    initialValues.jitpaamount
  );
  const [jitpaexpirydate, setJitpaexpirydate] = React.useState(
    initialValues.jitpaexpirydate
  );
  const [receiptno, setReceiptno] = React.useState(initialValues.receiptno);
  const [depositamount, setDepositamount] = React.useState(
    initialValues.depositamount
  );
  const [submitdateendorsement, setSubmitdateendorsement] = React.useState(
    initialValues.submitdateendorsement
  );
  const [jitpafile, setJitpafile] = React.useState(initialValues.jitpafile);
  const [immbdno, setImmbdno] = React.useState(initialValues.immbdno);
  const [docsubmitdate, setDocsubmitdate] = React.useState(
    initialValues.docsubmitdate
  );
  const [visaapprovedate, setVisaapprovedate] = React.useState(
    initialValues.visaapprovedate
  );
  const [visareferenceno, setVisareferenceno] = React.useState(
    initialValues.visareferenceno
  );
  const [visaFile, setVisaFile] = React.useState(initialValues.visaFile);
  const [departuredate, setDeparturedate] = React.useState(
    initialValues.departuredate
  );
  const [arrivaldate, setArrivaldate] = React.useState(
    initialValues.arrivaldate
  );
  const [cityname, setCityname] = React.useState(initialValues.cityname);
  const [airfare, setAirfare] = React.useState(initialValues.airfare);
  const [airticketfile, setAirticketfile] = React.useState(
    initialValues.airticketfile
  );
  const [agentname, setAgentname] = React.useState(initialValues.agentname);
  const [mobSignDate, setMobSignDate] = React.useState(
    initialValues.mobSignDate
  );
  const [mobFile, setMobFile] = React.useState(initialValues.mobFile);
  const [doerefno, setDoerefno] = React.useState(initialValues.doerefno);
  const [sawpDate, setSawpDate] = React.useState(initialValues.sawpDate);
  const [sawpRecivedDate, setSawpRecivedDate] = React.useState(
    initialValues.sawpRecivedDate
  );
  const [sawpFile, setSawpFile] = React.useState(initialValues.sawpFile);
  const [lbrDepoNum, setLbrDepoNum] = React.useState(initialValues.lbrDepoNum);
  const [lbrEndroseDate, setLbrEndroseDate] = React.useState(
    initialValues.lbrEndroseDate
  );
  const [lbrDepoAmount, setLbrDepoAmount] = React.useState(
    initialValues.lbrDepoAmount
  );
  const [lbrFile, setLbrFile] = React.useState(initialValues.lbrFile);
  const [remarkNLMob, setRemarkNLMob] = React.useState(
    initialValues.remarkNLMob
  );
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [updatedBy, setUpdatedBy] = React.useState(initialValues.updatedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTempID(initialValues.tempID);
    setSupportletterReqDate(initialValues.supportletterReqDate);
    setSupportletterReceiveDate(initialValues.supportletterReceiveDate);
    setLetterfile(initialValues.letterfile);
    setDoesubmitdate(initialValues.doesubmitdate);
    setDoeapprovedate(initialValues.doeapprovedate);
    setDoeexpirydate(initialValues.doeexpirydate);
    setDoefile(initialValues.doefile);
    setNlmssubmitdate(initialValues.nlmssubmitdate);
    setSubmissionrefrenceno(initialValues.submissionrefrenceno);
    setNlmsapprovedate(initialValues.nlmsapprovedate);
    setLdreferenceno(initialValues.ldreferenceno);
    setNlmsexpirydate(initialValues.nlmsexpirydate);
    setNlmsfile(initialValues.nlmsfile);
    setBgsubmitdate(initialValues.bgsubmitdate);
    setBgreceivedate(initialValues.bgreceivedate);
    setReferenceno(initialValues.referenceno);
    setBgamount(initialValues.bgamount);
    setBgexpirydate(initialValues.bgexpirydate);
    setBgfile(initialValues.bgfile);
    setTbapurchasedate(initialValues.tbapurchasedate);
    setJitpaamount(initialValues.jitpaamount);
    setJitpaexpirydate(initialValues.jitpaexpirydate);
    setReceiptno(initialValues.receiptno);
    setDepositamount(initialValues.depositamount);
    setSubmitdateendorsement(initialValues.submitdateendorsement);
    setJitpafile(initialValues.jitpafile);
    setImmbdno(initialValues.immbdno);
    setDocsubmitdate(initialValues.docsubmitdate);
    setVisaapprovedate(initialValues.visaapprovedate);
    setVisareferenceno(initialValues.visareferenceno);
    setVisaFile(initialValues.visaFile);
    setDeparturedate(initialValues.departuredate);
    setArrivaldate(initialValues.arrivaldate);
    setCityname(initialValues.cityname);
    setAirfare(initialValues.airfare);
    setAirticketfile(initialValues.airticketfile);
    setAgentname(initialValues.agentname);
    setMobSignDate(initialValues.mobSignDate);
    setMobFile(initialValues.mobFile);
    setDoerefno(initialValues.doerefno);
    setSawpDate(initialValues.sawpDate);
    setSawpRecivedDate(initialValues.sawpRecivedDate);
    setSawpFile(initialValues.sawpFile);
    setLbrDepoNum(initialValues.lbrDepoNum);
    setLbrEndroseDate(initialValues.lbrEndroseDate);
    setLbrDepoAmount(initialValues.lbrDepoAmount);
    setLbrFile(initialValues.lbrFile);
    setRemarkNLMob(initialValues.remarkNLMob);
    setCreatedBy(initialValues.createdBy);
    setCurrentCreatedByValue("");
    setUpdatedBy(initialValues.updatedBy);
    setCurrentUpdatedByValue("");
    setErrors({});
  };
  const [currentCreatedByValue, setCurrentCreatedByValue] = React.useState("");
  const createdByRef = React.createRef();
  const [currentUpdatedByValue, setCurrentUpdatedByValue] = React.useState("");
  const updatedByRef = React.createRef();
  const validations = {
    tempID: [{ type: "Required" }],
    supportletterReqDate: [],
    supportletterReceiveDate: [],
    letterfile: [],
    doesubmitdate: [],
    doeapprovedate: [],
    doeexpirydate: [],
    doefile: [],
    nlmssubmitdate: [],
    submissionrefrenceno: [],
    nlmsapprovedate: [],
    ldreferenceno: [],
    nlmsexpirydate: [],
    nlmsfile: [],
    bgsubmitdate: [],
    bgreceivedate: [],
    referenceno: [],
    bgamount: [],
    bgexpirydate: [],
    bgfile: [],
    tbapurchasedate: [],
    jitpaamount: [],
    jitpaexpirydate: [],
    receiptno: [],
    depositamount: [],
    submitdateendorsement: [],
    jitpafile: [],
    immbdno: [],
    docsubmitdate: [],
    visaapprovedate: [],
    visareferenceno: [],
    visaFile: [],
    departuredate: [],
    arrivaldate: [],
    cityname: [],
    airfare: [],
    airticketfile: [],
    agentname: [],
    mobSignDate: [],
    mobFile: [],
    doerefno: [],
    sawpDate: [],
    sawpRecivedDate: [],
    sawpFile: [],
    lbrDepoNum: [],
    lbrEndroseDate: [],
    lbrDepoAmount: [],
    lbrFile: [],
    remarkNLMob: [],
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
          tempID,
          supportletterReqDate,
          supportletterReceiveDate,
          letterfile,
          doesubmitdate,
          doeapprovedate,
          doeexpirydate,
          doefile,
          nlmssubmitdate,
          submissionrefrenceno,
          nlmsapprovedate,
          ldreferenceno,
          nlmsexpirydate,
          nlmsfile,
          bgsubmitdate,
          bgreceivedate,
          referenceno,
          bgamount,
          bgexpirydate,
          bgfile,
          tbapurchasedate,
          jitpaamount,
          jitpaexpirydate,
          receiptno,
          depositamount,
          submitdateendorsement,
          jitpafile,
          immbdno,
          docsubmitdate,
          visaapprovedate,
          visareferenceno,
          visaFile,
          departuredate,
          arrivaldate,
          cityname,
          airfare,
          airticketfile,
          agentname,
          mobSignDate,
          mobFile,
          doerefno,
          sawpDate,
          sawpRecivedDate,
          sawpFile,
          lbrDepoNum,
          lbrEndroseDate,
          lbrDepoAmount,
          lbrFile,
          remarkNLMob,
          createdBy,
          updatedBy,
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
            query: createWPTracking.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "WPTrackingCreateForm")}
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
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
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
        label="Supportletter req date"
        isRequired={false}
        isReadOnly={false}
        value={supportletterReqDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate: value,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.supportletterReqDate ?? value;
          }
          if (errors.supportletterReqDate?.hasError) {
            runValidationTasks("supportletterReqDate", value);
          }
          setSupportletterReqDate(value);
        }}
        onBlur={() =>
          runValidationTasks("supportletterReqDate", supportletterReqDate)
        }
        errorMessage={errors.supportletterReqDate?.errorMessage}
        hasError={errors.supportletterReqDate?.hasError}
        {...getOverrideProps(overrides, "supportletterReqDate")}
      ></TextField>
      <TextField
        label="Supportletter receive date"
        isRequired={false}
        isReadOnly={false}
        value={supportletterReceiveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate: value,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.supportletterReceiveDate ?? value;
          }
          if (errors.supportletterReceiveDate?.hasError) {
            runValidationTasks("supportletterReceiveDate", value);
          }
          setSupportletterReceiveDate(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "supportletterReceiveDate",
            supportletterReceiveDate
          )
        }
        errorMessage={errors.supportletterReceiveDate?.errorMessage}
        hasError={errors.supportletterReceiveDate?.hasError}
        {...getOverrideProps(overrides, "supportletterReceiveDate")}
      ></TextField>
      <TextField
        label="Letterfile"
        isRequired={false}
        isReadOnly={false}
        value={letterfile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile: value,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.letterfile ?? value;
          }
          if (errors.letterfile?.hasError) {
            runValidationTasks("letterfile", value);
          }
          setLetterfile(value);
        }}
        onBlur={() => runValidationTasks("letterfile", letterfile)}
        errorMessage={errors.letterfile?.errorMessage}
        hasError={errors.letterfile?.hasError}
        {...getOverrideProps(overrides, "letterfile")}
      ></TextField>
      <TextField
        label="Doesubmitdate"
        isRequired={false}
        isReadOnly={false}
        value={doesubmitdate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate: value,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.doesubmitdate ?? value;
          }
          if (errors.doesubmitdate?.hasError) {
            runValidationTasks("doesubmitdate", value);
          }
          setDoesubmitdate(value);
        }}
        onBlur={() => runValidationTasks("doesubmitdate", doesubmitdate)}
        errorMessage={errors.doesubmitdate?.errorMessage}
        hasError={errors.doesubmitdate?.hasError}
        {...getOverrideProps(overrides, "doesubmitdate")}
      ></TextField>
      <TextField
        label="Doeapprovedate"
        isRequired={false}
        isReadOnly={false}
        value={doeapprovedate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate: value,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.doeapprovedate ?? value;
          }
          if (errors.doeapprovedate?.hasError) {
            runValidationTasks("doeapprovedate", value);
          }
          setDoeapprovedate(value);
        }}
        onBlur={() => runValidationTasks("doeapprovedate", doeapprovedate)}
        errorMessage={errors.doeapprovedate?.errorMessage}
        hasError={errors.doeapprovedate?.hasError}
        {...getOverrideProps(overrides, "doeapprovedate")}
      ></TextField>
      <TextField
        label="Doeexpirydate"
        isRequired={false}
        isReadOnly={false}
        value={doeexpirydate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate: value,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.doeexpirydate ?? value;
          }
          if (errors.doeexpirydate?.hasError) {
            runValidationTasks("doeexpirydate", value);
          }
          setDoeexpirydate(value);
        }}
        onBlur={() => runValidationTasks("doeexpirydate", doeexpirydate)}
        errorMessage={errors.doeexpirydate?.errorMessage}
        hasError={errors.doeexpirydate?.hasError}
        {...getOverrideProps(overrides, "doeexpirydate")}
      ></TextField>
      <TextField
        label="Doefile"
        isRequired={false}
        isReadOnly={false}
        value={doefile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile: value,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.doefile ?? value;
          }
          if (errors.doefile?.hasError) {
            runValidationTasks("doefile", value);
          }
          setDoefile(value);
        }}
        onBlur={() => runValidationTasks("doefile", doefile)}
        errorMessage={errors.doefile?.errorMessage}
        hasError={errors.doefile?.hasError}
        {...getOverrideProps(overrides, "doefile")}
      ></TextField>
      <TextField
        label="Nlmssubmitdate"
        isRequired={false}
        isReadOnly={false}
        value={nlmssubmitdate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate: value,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.nlmssubmitdate ?? value;
          }
          if (errors.nlmssubmitdate?.hasError) {
            runValidationTasks("nlmssubmitdate", value);
          }
          setNlmssubmitdate(value);
        }}
        onBlur={() => runValidationTasks("nlmssubmitdate", nlmssubmitdate)}
        errorMessage={errors.nlmssubmitdate?.errorMessage}
        hasError={errors.nlmssubmitdate?.hasError}
        {...getOverrideProps(overrides, "nlmssubmitdate")}
      ></TextField>
      <TextField
        label="Submissionrefrenceno"
        isRequired={false}
        isReadOnly={false}
        value={submissionrefrenceno}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno: value,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.submissionrefrenceno ?? value;
          }
          if (errors.submissionrefrenceno?.hasError) {
            runValidationTasks("submissionrefrenceno", value);
          }
          setSubmissionrefrenceno(value);
        }}
        onBlur={() =>
          runValidationTasks("submissionrefrenceno", submissionrefrenceno)
        }
        errorMessage={errors.submissionrefrenceno?.errorMessage}
        hasError={errors.submissionrefrenceno?.hasError}
        {...getOverrideProps(overrides, "submissionrefrenceno")}
      ></TextField>
      <TextField
        label="Nlmsapprovedate"
        isRequired={false}
        isReadOnly={false}
        value={nlmsapprovedate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate: value,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.nlmsapprovedate ?? value;
          }
          if (errors.nlmsapprovedate?.hasError) {
            runValidationTasks("nlmsapprovedate", value);
          }
          setNlmsapprovedate(value);
        }}
        onBlur={() => runValidationTasks("nlmsapprovedate", nlmsapprovedate)}
        errorMessage={errors.nlmsapprovedate?.errorMessage}
        hasError={errors.nlmsapprovedate?.hasError}
        {...getOverrideProps(overrides, "nlmsapprovedate")}
      ></TextField>
      <TextField
        label="Ldreferenceno"
        isRequired={false}
        isReadOnly={false}
        value={ldreferenceno}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno: value,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.ldreferenceno ?? value;
          }
          if (errors.ldreferenceno?.hasError) {
            runValidationTasks("ldreferenceno", value);
          }
          setLdreferenceno(value);
        }}
        onBlur={() => runValidationTasks("ldreferenceno", ldreferenceno)}
        errorMessage={errors.ldreferenceno?.errorMessage}
        hasError={errors.ldreferenceno?.hasError}
        {...getOverrideProps(overrides, "ldreferenceno")}
      ></TextField>
      <TextField
        label="Nlmsexpirydate"
        isRequired={false}
        isReadOnly={false}
        value={nlmsexpirydate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate: value,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.nlmsexpirydate ?? value;
          }
          if (errors.nlmsexpirydate?.hasError) {
            runValidationTasks("nlmsexpirydate", value);
          }
          setNlmsexpirydate(value);
        }}
        onBlur={() => runValidationTasks("nlmsexpirydate", nlmsexpirydate)}
        errorMessage={errors.nlmsexpirydate?.errorMessage}
        hasError={errors.nlmsexpirydate?.hasError}
        {...getOverrideProps(overrides, "nlmsexpirydate")}
      ></TextField>
      <TextField
        label="Nlmsfile"
        isRequired={false}
        isReadOnly={false}
        value={nlmsfile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile: value,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.nlmsfile ?? value;
          }
          if (errors.nlmsfile?.hasError) {
            runValidationTasks("nlmsfile", value);
          }
          setNlmsfile(value);
        }}
        onBlur={() => runValidationTasks("nlmsfile", nlmsfile)}
        errorMessage={errors.nlmsfile?.errorMessage}
        hasError={errors.nlmsfile?.hasError}
        {...getOverrideProps(overrides, "nlmsfile")}
      ></TextField>
      <TextField
        label="Bgsubmitdate"
        isRequired={false}
        isReadOnly={false}
        value={bgsubmitdate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate: value,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.bgsubmitdate ?? value;
          }
          if (errors.bgsubmitdate?.hasError) {
            runValidationTasks("bgsubmitdate", value);
          }
          setBgsubmitdate(value);
        }}
        onBlur={() => runValidationTasks("bgsubmitdate", bgsubmitdate)}
        errorMessage={errors.bgsubmitdate?.errorMessage}
        hasError={errors.bgsubmitdate?.hasError}
        {...getOverrideProps(overrides, "bgsubmitdate")}
      ></TextField>
      <TextField
        label="Bgreceivedate"
        isRequired={false}
        isReadOnly={false}
        value={bgreceivedate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate: value,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.bgreceivedate ?? value;
          }
          if (errors.bgreceivedate?.hasError) {
            runValidationTasks("bgreceivedate", value);
          }
          setBgreceivedate(value);
        }}
        onBlur={() => runValidationTasks("bgreceivedate", bgreceivedate)}
        errorMessage={errors.bgreceivedate?.errorMessage}
        hasError={errors.bgreceivedate?.hasError}
        {...getOverrideProps(overrides, "bgreceivedate")}
      ></TextField>
      <TextField
        label="Referenceno"
        isRequired={false}
        isReadOnly={false}
        value={referenceno}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno: value,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.referenceno ?? value;
          }
          if (errors.referenceno?.hasError) {
            runValidationTasks("referenceno", value);
          }
          setReferenceno(value);
        }}
        onBlur={() => runValidationTasks("referenceno", referenceno)}
        errorMessage={errors.referenceno?.errorMessage}
        hasError={errors.referenceno?.hasError}
        {...getOverrideProps(overrides, "referenceno")}
      ></TextField>
      <TextField
        label="Bgamount"
        isRequired={false}
        isReadOnly={false}
        value={bgamount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount: value,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.bgamount ?? value;
          }
          if (errors.bgamount?.hasError) {
            runValidationTasks("bgamount", value);
          }
          setBgamount(value);
        }}
        onBlur={() => runValidationTasks("bgamount", bgamount)}
        errorMessage={errors.bgamount?.errorMessage}
        hasError={errors.bgamount?.hasError}
        {...getOverrideProps(overrides, "bgamount")}
      ></TextField>
      <TextField
        label="Bgexpirydate"
        isRequired={false}
        isReadOnly={false}
        value={bgexpirydate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate: value,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.bgexpirydate ?? value;
          }
          if (errors.bgexpirydate?.hasError) {
            runValidationTasks("bgexpirydate", value);
          }
          setBgexpirydate(value);
        }}
        onBlur={() => runValidationTasks("bgexpirydate", bgexpirydate)}
        errorMessage={errors.bgexpirydate?.errorMessage}
        hasError={errors.bgexpirydate?.hasError}
        {...getOverrideProps(overrides, "bgexpirydate")}
      ></TextField>
      <TextField
        label="Bgfile"
        isRequired={false}
        isReadOnly={false}
        value={bgfile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile: value,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.bgfile ?? value;
          }
          if (errors.bgfile?.hasError) {
            runValidationTasks("bgfile", value);
          }
          setBgfile(value);
        }}
        onBlur={() => runValidationTasks("bgfile", bgfile)}
        errorMessage={errors.bgfile?.errorMessage}
        hasError={errors.bgfile?.hasError}
        {...getOverrideProps(overrides, "bgfile")}
      ></TextField>
      <TextField
        label="Tbapurchasedate"
        isRequired={false}
        isReadOnly={false}
        value={tbapurchasedate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate: value,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.tbapurchasedate ?? value;
          }
          if (errors.tbapurchasedate?.hasError) {
            runValidationTasks("tbapurchasedate", value);
          }
          setTbapurchasedate(value);
        }}
        onBlur={() => runValidationTasks("tbapurchasedate", tbapurchasedate)}
        errorMessage={errors.tbapurchasedate?.errorMessage}
        hasError={errors.tbapurchasedate?.hasError}
        {...getOverrideProps(overrides, "tbapurchasedate")}
      ></TextField>
      <TextField
        label="Jitpaamount"
        isRequired={false}
        isReadOnly={false}
        value={jitpaamount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount: value,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.jitpaamount ?? value;
          }
          if (errors.jitpaamount?.hasError) {
            runValidationTasks("jitpaamount", value);
          }
          setJitpaamount(value);
        }}
        onBlur={() => runValidationTasks("jitpaamount", jitpaamount)}
        errorMessage={errors.jitpaamount?.errorMessage}
        hasError={errors.jitpaamount?.hasError}
        {...getOverrideProps(overrides, "jitpaamount")}
      ></TextField>
      <TextField
        label="Jitpaexpirydate"
        isRequired={false}
        isReadOnly={false}
        value={jitpaexpirydate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate: value,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.jitpaexpirydate ?? value;
          }
          if (errors.jitpaexpirydate?.hasError) {
            runValidationTasks("jitpaexpirydate", value);
          }
          setJitpaexpirydate(value);
        }}
        onBlur={() => runValidationTasks("jitpaexpirydate", jitpaexpirydate)}
        errorMessage={errors.jitpaexpirydate?.errorMessage}
        hasError={errors.jitpaexpirydate?.hasError}
        {...getOverrideProps(overrides, "jitpaexpirydate")}
      ></TextField>
      <TextField
        label="Receiptno"
        isRequired={false}
        isReadOnly={false}
        value={receiptno}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno: value,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.receiptno ?? value;
          }
          if (errors.receiptno?.hasError) {
            runValidationTasks("receiptno", value);
          }
          setReceiptno(value);
        }}
        onBlur={() => runValidationTasks("receiptno", receiptno)}
        errorMessage={errors.receiptno?.errorMessage}
        hasError={errors.receiptno?.hasError}
        {...getOverrideProps(overrides, "receiptno")}
      ></TextField>
      <TextField
        label="Depositamount"
        isRequired={false}
        isReadOnly={false}
        value={depositamount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount: value,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.depositamount ?? value;
          }
          if (errors.depositamount?.hasError) {
            runValidationTasks("depositamount", value);
          }
          setDepositamount(value);
        }}
        onBlur={() => runValidationTasks("depositamount", depositamount)}
        errorMessage={errors.depositamount?.errorMessage}
        hasError={errors.depositamount?.hasError}
        {...getOverrideProps(overrides, "depositamount")}
      ></TextField>
      <TextField
        label="Submitdateendorsement"
        isRequired={false}
        isReadOnly={false}
        value={submitdateendorsement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement: value,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.submitdateendorsement ?? value;
          }
          if (errors.submitdateendorsement?.hasError) {
            runValidationTasks("submitdateendorsement", value);
          }
          setSubmitdateendorsement(value);
        }}
        onBlur={() =>
          runValidationTasks("submitdateendorsement", submitdateendorsement)
        }
        errorMessage={errors.submitdateendorsement?.errorMessage}
        hasError={errors.submitdateendorsement?.hasError}
        {...getOverrideProps(overrides, "submitdateendorsement")}
      ></TextField>
      <TextField
        label="Jitpafile"
        isRequired={false}
        isReadOnly={false}
        value={jitpafile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile: value,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.jitpafile ?? value;
          }
          if (errors.jitpafile?.hasError) {
            runValidationTasks("jitpafile", value);
          }
          setJitpafile(value);
        }}
        onBlur={() => runValidationTasks("jitpafile", jitpafile)}
        errorMessage={errors.jitpafile?.errorMessage}
        hasError={errors.jitpafile?.hasError}
        {...getOverrideProps(overrides, "jitpafile")}
      ></TextField>
      <TextField
        label="Immbdno"
        isRequired={false}
        isReadOnly={false}
        value={immbdno}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno: value,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.immbdno ?? value;
          }
          if (errors.immbdno?.hasError) {
            runValidationTasks("immbdno", value);
          }
          setImmbdno(value);
        }}
        onBlur={() => runValidationTasks("immbdno", immbdno)}
        errorMessage={errors.immbdno?.errorMessage}
        hasError={errors.immbdno?.hasError}
        {...getOverrideProps(overrides, "immbdno")}
      ></TextField>
      <TextField
        label="Docsubmitdate"
        isRequired={false}
        isReadOnly={false}
        value={docsubmitdate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate: value,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.docsubmitdate ?? value;
          }
          if (errors.docsubmitdate?.hasError) {
            runValidationTasks("docsubmitdate", value);
          }
          setDocsubmitdate(value);
        }}
        onBlur={() => runValidationTasks("docsubmitdate", docsubmitdate)}
        errorMessage={errors.docsubmitdate?.errorMessage}
        hasError={errors.docsubmitdate?.hasError}
        {...getOverrideProps(overrides, "docsubmitdate")}
      ></TextField>
      <TextField
        label="Visaapprovedate"
        isRequired={false}
        isReadOnly={false}
        value={visaapprovedate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate: value,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.visaapprovedate ?? value;
          }
          if (errors.visaapprovedate?.hasError) {
            runValidationTasks("visaapprovedate", value);
          }
          setVisaapprovedate(value);
        }}
        onBlur={() => runValidationTasks("visaapprovedate", visaapprovedate)}
        errorMessage={errors.visaapprovedate?.errorMessage}
        hasError={errors.visaapprovedate?.hasError}
        {...getOverrideProps(overrides, "visaapprovedate")}
      ></TextField>
      <TextField
        label="Visareferenceno"
        isRequired={false}
        isReadOnly={false}
        value={visareferenceno}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno: value,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.visareferenceno ?? value;
          }
          if (errors.visareferenceno?.hasError) {
            runValidationTasks("visareferenceno", value);
          }
          setVisareferenceno(value);
        }}
        onBlur={() => runValidationTasks("visareferenceno", visareferenceno)}
        errorMessage={errors.visareferenceno?.errorMessage}
        hasError={errors.visareferenceno?.hasError}
        {...getOverrideProps(overrides, "visareferenceno")}
      ></TextField>
      <TextField
        label="Visa file"
        isRequired={false}
        isReadOnly={false}
        value={visaFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile: value,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.visaFile ?? value;
          }
          if (errors.visaFile?.hasError) {
            runValidationTasks("visaFile", value);
          }
          setVisaFile(value);
        }}
        onBlur={() => runValidationTasks("visaFile", visaFile)}
        errorMessage={errors.visaFile?.errorMessage}
        hasError={errors.visaFile?.hasError}
        {...getOverrideProps(overrides, "visaFile")}
      ></TextField>
      <TextField
        label="Departuredate"
        isRequired={false}
        isReadOnly={false}
        value={departuredate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate: value,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.departuredate ?? value;
          }
          if (errors.departuredate?.hasError) {
            runValidationTasks("departuredate", value);
          }
          setDeparturedate(value);
        }}
        onBlur={() => runValidationTasks("departuredate", departuredate)}
        errorMessage={errors.departuredate?.errorMessage}
        hasError={errors.departuredate?.hasError}
        {...getOverrideProps(overrides, "departuredate")}
      ></TextField>
      <TextField
        label="Arrivaldate"
        isRequired={false}
        isReadOnly={false}
        value={arrivaldate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate: value,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.arrivaldate ?? value;
          }
          if (errors.arrivaldate?.hasError) {
            runValidationTasks("arrivaldate", value);
          }
          setArrivaldate(value);
        }}
        onBlur={() => runValidationTasks("arrivaldate", arrivaldate)}
        errorMessage={errors.arrivaldate?.errorMessage}
        hasError={errors.arrivaldate?.hasError}
        {...getOverrideProps(overrides, "arrivaldate")}
      ></TextField>
      <TextField
        label="Cityname"
        isRequired={false}
        isReadOnly={false}
        value={cityname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname: value,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.cityname ?? value;
          }
          if (errors.cityname?.hasError) {
            runValidationTasks("cityname", value);
          }
          setCityname(value);
        }}
        onBlur={() => runValidationTasks("cityname", cityname)}
        errorMessage={errors.cityname?.errorMessage}
        hasError={errors.cityname?.hasError}
        {...getOverrideProps(overrides, "cityname")}
      ></TextField>
      <TextField
        label="Airfare"
        isRequired={false}
        isReadOnly={false}
        value={airfare}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare: value,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.airfare ?? value;
          }
          if (errors.airfare?.hasError) {
            runValidationTasks("airfare", value);
          }
          setAirfare(value);
        }}
        onBlur={() => runValidationTasks("airfare", airfare)}
        errorMessage={errors.airfare?.errorMessage}
        hasError={errors.airfare?.hasError}
        {...getOverrideProps(overrides, "airfare")}
      ></TextField>
      <TextField
        label="Airticketfile"
        isRequired={false}
        isReadOnly={false}
        value={airticketfile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile: value,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.airticketfile ?? value;
          }
          if (errors.airticketfile?.hasError) {
            runValidationTasks("airticketfile", value);
          }
          setAirticketfile(value);
        }}
        onBlur={() => runValidationTasks("airticketfile", airticketfile)}
        errorMessage={errors.airticketfile?.errorMessage}
        hasError={errors.airticketfile?.hasError}
        {...getOverrideProps(overrides, "airticketfile")}
      ></TextField>
      <TextField
        label="Agentname"
        isRequired={false}
        isReadOnly={false}
        value={agentname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname: value,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.agentname ?? value;
          }
          if (errors.agentname?.hasError) {
            runValidationTasks("agentname", value);
          }
          setAgentname(value);
        }}
        onBlur={() => runValidationTasks("agentname", agentname)}
        errorMessage={errors.agentname?.errorMessage}
        hasError={errors.agentname?.hasError}
        {...getOverrideProps(overrides, "agentname")}
      ></TextField>
      <TextField
        label="Mob sign date"
        isRequired={false}
        isReadOnly={false}
        value={mobSignDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate: value,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
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
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile: value,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
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
        label="Doerefno"
        isRequired={false}
        isReadOnly={false}
        value={doerefno}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno: value,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.doerefno ?? value;
          }
          if (errors.doerefno?.hasError) {
            runValidationTasks("doerefno", value);
          }
          setDoerefno(value);
        }}
        onBlur={() => runValidationTasks("doerefno", doerefno)}
        errorMessage={errors.doerefno?.errorMessage}
        hasError={errors.doerefno?.hasError}
        {...getOverrideProps(overrides, "doerefno")}
      ></TextField>
      <TextField
        label="Sawp date"
        isRequired={false}
        isReadOnly={false}
        value={sawpDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate: value,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.sawpDate ?? value;
          }
          if (errors.sawpDate?.hasError) {
            runValidationTasks("sawpDate", value);
          }
          setSawpDate(value);
        }}
        onBlur={() => runValidationTasks("sawpDate", sawpDate)}
        errorMessage={errors.sawpDate?.errorMessage}
        hasError={errors.sawpDate?.hasError}
        {...getOverrideProps(overrides, "sawpDate")}
      ></TextField>
      <TextField
        label="Sawp recived date"
        isRequired={false}
        isReadOnly={false}
        value={sawpRecivedDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate: value,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.sawpRecivedDate ?? value;
          }
          if (errors.sawpRecivedDate?.hasError) {
            runValidationTasks("sawpRecivedDate", value);
          }
          setSawpRecivedDate(value);
        }}
        onBlur={() => runValidationTasks("sawpRecivedDate", sawpRecivedDate)}
        errorMessage={errors.sawpRecivedDate?.errorMessage}
        hasError={errors.sawpRecivedDate?.hasError}
        {...getOverrideProps(overrides, "sawpRecivedDate")}
      ></TextField>
      <TextField
        label="Sawp file"
        isRequired={false}
        isReadOnly={false}
        value={sawpFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile: value,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.sawpFile ?? value;
          }
          if (errors.sawpFile?.hasError) {
            runValidationTasks("sawpFile", value);
          }
          setSawpFile(value);
        }}
        onBlur={() => runValidationTasks("sawpFile", sawpFile)}
        errorMessage={errors.sawpFile?.errorMessage}
        hasError={errors.sawpFile?.hasError}
        {...getOverrideProps(overrides, "sawpFile")}
      ></TextField>
      <TextField
        label="Lbr depo num"
        isRequired={false}
        isReadOnly={false}
        value={lbrDepoNum}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum: value,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.lbrDepoNum ?? value;
          }
          if (errors.lbrDepoNum?.hasError) {
            runValidationTasks("lbrDepoNum", value);
          }
          setLbrDepoNum(value);
        }}
        onBlur={() => runValidationTasks("lbrDepoNum", lbrDepoNum)}
        errorMessage={errors.lbrDepoNum?.errorMessage}
        hasError={errors.lbrDepoNum?.hasError}
        {...getOverrideProps(overrides, "lbrDepoNum")}
      ></TextField>
      <TextField
        label="Lbr endrose date"
        isRequired={false}
        isReadOnly={false}
        value={lbrEndroseDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate: value,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.lbrEndroseDate ?? value;
          }
          if (errors.lbrEndroseDate?.hasError) {
            runValidationTasks("lbrEndroseDate", value);
          }
          setLbrEndroseDate(value);
        }}
        onBlur={() => runValidationTasks("lbrEndroseDate", lbrEndroseDate)}
        errorMessage={errors.lbrEndroseDate?.errorMessage}
        hasError={errors.lbrEndroseDate?.hasError}
        {...getOverrideProps(overrides, "lbrEndroseDate")}
      ></TextField>
      <TextField
        label="Lbr depo amount"
        isRequired={false}
        isReadOnly={false}
        value={lbrDepoAmount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount: value,
              lbrFile,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.lbrDepoAmount ?? value;
          }
          if (errors.lbrDepoAmount?.hasError) {
            runValidationTasks("lbrDepoAmount", value);
          }
          setLbrDepoAmount(value);
        }}
        onBlur={() => runValidationTasks("lbrDepoAmount", lbrDepoAmount)}
        errorMessage={errors.lbrDepoAmount?.errorMessage}
        hasError={errors.lbrDepoAmount?.hasError}
        {...getOverrideProps(overrides, "lbrDepoAmount")}
      ></TextField>
      <TextField
        label="Lbr file"
        isRequired={false}
        isReadOnly={false}
        value={lbrFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile: value,
              remarkNLMob,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.lbrFile ?? value;
          }
          if (errors.lbrFile?.hasError) {
            runValidationTasks("lbrFile", value);
          }
          setLbrFile(value);
        }}
        onBlur={() => runValidationTasks("lbrFile", lbrFile)}
        errorMessage={errors.lbrFile?.errorMessage}
        hasError={errors.lbrFile?.hasError}
        {...getOverrideProps(overrides, "lbrFile")}
      ></TextField>
      <TextField
        label="Remark nl mob"
        isRequired={false}
        isReadOnly={false}
        value={remarkNLMob}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob: value,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.remarkNLMob ?? value;
          }
          if (errors.remarkNLMob?.hasError) {
            runValidationTasks("remarkNLMob", value);
          }
          setRemarkNLMob(value);
        }}
        onBlur={() => runValidationTasks("remarkNLMob", remarkNLMob)}
        errorMessage={errors.remarkNLMob?.errorMessage}
        hasError={errors.remarkNLMob?.hasError}
        {...getOverrideProps(overrides, "remarkNLMob")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
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
              tempID,
              supportletterReqDate,
              supportletterReceiveDate,
              letterfile,
              doesubmitdate,
              doeapprovedate,
              doeexpirydate,
              doefile,
              nlmssubmitdate,
              submissionrefrenceno,
              nlmsapprovedate,
              ldreferenceno,
              nlmsexpirydate,
              nlmsfile,
              bgsubmitdate,
              bgreceivedate,
              referenceno,
              bgamount,
              bgexpirydate,
              bgfile,
              tbapurchasedate,
              jitpaamount,
              jitpaexpirydate,
              receiptno,
              depositamount,
              submitdateendorsement,
              jitpafile,
              immbdno,
              docsubmitdate,
              visaapprovedate,
              visareferenceno,
              visaFile,
              departuredate,
              arrivaldate,
              cityname,
              airfare,
              airticketfile,
              agentname,
              mobSignDate,
              mobFile,
              doerefno,
              sawpDate,
              sawpRecivedDate,
              sawpFile,
              lbrDepoNum,
              lbrEndroseDate,
              lbrDepoAmount,
              lbrFile,
              remarkNLMob,
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
