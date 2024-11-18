/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getWPTracking } from "../graphql/queries";
import { updateWPTracking } from "../graphql/mutations";
const client = generateClient();
export default function WPTrackingUpdateForm(props) {
  const {
    id: idProp,
    wPTracking: wPTrackingModelProp,
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
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = wPTrackingRecord
      ? { ...initialValues, ...wPTrackingRecord }
      : initialValues;
    setTempID(cleanValues.tempID);
    setSupportletterReqDate(cleanValues.supportletterReqDate);
    setSupportletterReceiveDate(cleanValues.supportletterReceiveDate);
    setLetterfile(cleanValues.letterfile);
    setDoesubmitdate(cleanValues.doesubmitdate);
    setDoeapprovedate(cleanValues.doeapprovedate);
    setDoeexpirydate(cleanValues.doeexpirydate);
    setDoefile(cleanValues.doefile);
    setNlmssubmitdate(cleanValues.nlmssubmitdate);
    setSubmissionrefrenceno(cleanValues.submissionrefrenceno);
    setNlmsapprovedate(cleanValues.nlmsapprovedate);
    setLdreferenceno(cleanValues.ldreferenceno);
    setNlmsexpirydate(cleanValues.nlmsexpirydate);
    setNlmsfile(cleanValues.nlmsfile);
    setBgsubmitdate(cleanValues.bgsubmitdate);
    setBgreceivedate(cleanValues.bgreceivedate);
    setReferenceno(cleanValues.referenceno);
    setBgamount(cleanValues.bgamount);
    setBgexpirydate(cleanValues.bgexpirydate);
    setBgfile(cleanValues.bgfile);
    setTbapurchasedate(cleanValues.tbapurchasedate);
    setJitpaamount(cleanValues.jitpaamount);
    setJitpaexpirydate(cleanValues.jitpaexpirydate);
    setReceiptno(cleanValues.receiptno);
    setDepositamount(cleanValues.depositamount);
    setSubmitdateendorsement(cleanValues.submitdateendorsement);
    setJitpafile(cleanValues.jitpafile);
    setImmbdno(cleanValues.immbdno);
    setDocsubmitdate(cleanValues.docsubmitdate);
    setVisaapprovedate(cleanValues.visaapprovedate);
    setVisareferenceno(cleanValues.visareferenceno);
    setVisaFile(cleanValues.visaFile);
    setDeparturedate(cleanValues.departuredate);
    setArrivaldate(cleanValues.arrivaldate);
    setCityname(cleanValues.cityname);
    setAirfare(cleanValues.airfare);
    setAirticketfile(cleanValues.airticketfile);
    setAgentname(cleanValues.agentname);
    setMobSignDate(cleanValues.mobSignDate);
    setMobFile(cleanValues.mobFile);
    setErrors({});
  };
  const [wPTrackingRecord, setWPTrackingRecord] =
    React.useState(wPTrackingModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getWPTracking.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getWPTracking
        : wPTrackingModelProp;
      setWPTrackingRecord(record);
    };
    queryData();
  }, [idProp, wPTrackingModelProp]);
  React.useEffect(resetStateValues, [wPTrackingRecord]);
  const validations = {
    tempID: [{ type: "Required" }],
    supportletterReqDate: [{ type: "Required" }],
    supportletterReceiveDate: [{ type: "Required" }],
    letterfile: [{ type: "Required" }],
    doesubmitdate: [{ type: "Required" }],
    doeapprovedate: [{ type: "Required" }],
    doeexpirydate: [{ type: "Required" }],
    doefile: [{ type: "Required" }],
    nlmssubmitdate: [{ type: "Required" }],
    submissionrefrenceno: [{ type: "Required" }],
    nlmsapprovedate: [{ type: "Required" }],
    ldreferenceno: [{ type: "Required" }],
    nlmsexpirydate: [{ type: "Required" }],
    nlmsfile: [{ type: "Required" }],
    bgsubmitdate: [{ type: "Required" }],
    bgreceivedate: [{ type: "Required" }],
    referenceno: [{ type: "Required" }],
    bgamount: [{ type: "Required" }],
    bgexpirydate: [{ type: "Required" }],
    bgfile: [{ type: "Required" }],
    tbapurchasedate: [{ type: "Required" }],
    jitpaamount: [{ type: "Required" }],
    jitpaexpirydate: [{ type: "Required" }],
    receiptno: [{ type: "Required" }],
    depositamount: [{ type: "Required" }],
    submitdateendorsement: [{ type: "Required" }],
    jitpafile: [{ type: "Required" }],
    immbdno: [{ type: "Required" }],
    docsubmitdate: [{ type: "Required" }],
    visaapprovedate: [{ type: "Required" }],
    visareferenceno: [{ type: "Required" }],
    visaFile: [{ type: "Required" }],
    departuredate: [{ type: "Required" }],
    arrivaldate: [{ type: "Required" }],
    cityname: [{ type: "Required" }],
    airfare: [{ type: "Required" }],
    airticketfile: [{ type: "Required" }],
    agentname: [{ type: "Required" }],
    mobSignDate: [{ type: "Required" }],
    mobFile: [{ type: "Required" }],
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
            query: updateWPTracking.replaceAll("__typename", ""),
            variables: {
              input: {
                id: wPTrackingRecord.id,
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
      {...getOverrideProps(overrides, "WPTrackingUpdateForm")}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
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
          isDisabled={!(idProp || wPTrackingModelProp)}
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
              !(idProp || wPTrackingModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
