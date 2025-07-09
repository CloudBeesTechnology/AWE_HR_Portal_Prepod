/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getProbForm } from "../graphql/queries";
import { updateProbForm } from "../graphql/mutations";
const client = generateClient();
export default function ProbFormUpdateForm(props) {
  const {
    id: idProp,
    probForm: probFormModelProp,
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
    adaptability: "",
    additionalInfo: "",
    attention: "",
    attitude: "",
    commitment: "",
    communication: "",
    deadline: "",
    diligent: "",
    extensionPeriod: "",
    gmDate: "",
    hrDate: "",
    hrName: "",
    initiative: "",
    managerDate: "",
    managerName: "",
    pace: "",
    quality: "",
    recommendation: "",
    responsibility: "",
    supervisorDate: "",
    supervisorName: "",
    teamwork: "",
    extendProbED: "",
    gmApproved: "",
    managerApproved: "",
    supervisorApproved: "",
    communicationDetails: "",
    qualityDetails: "",
    paceDetails: "",
    initiativeDetails: "",
    attitudeDetails: "",
    adaptabilityDetails: "",
    teamworkDetails: "",
    responsibilityDetails: "",
    diligentDetails: "",
    commitmentDetails: "",
    probStatus: false,
    gmName: "",
    extendDate: "",
    prevProbExDate: "",
    probExtendStatus: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [adaptability, setAdaptability] = React.useState(
    initialValues.adaptability
  );
  const [additionalInfo, setAdditionalInfo] = React.useState(
    initialValues.additionalInfo
  );
  const [attention, setAttention] = React.useState(initialValues.attention);
  const [attitude, setAttitude] = React.useState(initialValues.attitude);
  const [commitment, setCommitment] = React.useState(initialValues.commitment);
  const [communication, setCommunication] = React.useState(
    initialValues.communication
  );
  const [deadline, setDeadline] = React.useState(initialValues.deadline);
  const [diligent, setDiligent] = React.useState(initialValues.diligent);
  const [extensionPeriod, setExtensionPeriod] = React.useState(
    initialValues.extensionPeriod
  );
  const [gmDate, setGmDate] = React.useState(initialValues.gmDate);
  const [hrDate, setHrDate] = React.useState(initialValues.hrDate);
  const [hrName, setHrName] = React.useState(initialValues.hrName);
  const [initiative, setInitiative] = React.useState(initialValues.initiative);
  const [managerDate, setManagerDate] = React.useState(
    initialValues.managerDate
  );
  const [managerName, setManagerName] = React.useState(
    initialValues.managerName
  );
  const [pace, setPace] = React.useState(initialValues.pace);
  const [quality, setQuality] = React.useState(initialValues.quality);
  const [recommendation, setRecommendation] = React.useState(
    initialValues.recommendation
  );
  const [responsibility, setResponsibility] = React.useState(
    initialValues.responsibility
  );
  const [supervisorDate, setSupervisorDate] = React.useState(
    initialValues.supervisorDate
  );
  const [supervisorName, setSupervisorName] = React.useState(
    initialValues.supervisorName
  );
  const [teamwork, setTeamwork] = React.useState(initialValues.teamwork);
  const [extendProbED, setExtendProbED] = React.useState(
    initialValues.extendProbED
  );
  const [gmApproved, setGmApproved] = React.useState(initialValues.gmApproved);
  const [managerApproved, setManagerApproved] = React.useState(
    initialValues.managerApproved
  );
  const [supervisorApproved, setSupervisorApproved] = React.useState(
    initialValues.supervisorApproved
  );
  const [communicationDetails, setCommunicationDetails] = React.useState(
    initialValues.communicationDetails
  );
  const [qualityDetails, setQualityDetails] = React.useState(
    initialValues.qualityDetails
  );
  const [paceDetails, setPaceDetails] = React.useState(
    initialValues.paceDetails
  );
  const [initiativeDetails, setInitiativeDetails] = React.useState(
    initialValues.initiativeDetails
  );
  const [attitudeDetails, setAttitudeDetails] = React.useState(
    initialValues.attitudeDetails
  );
  const [adaptabilityDetails, setAdaptabilityDetails] = React.useState(
    initialValues.adaptabilityDetails
  );
  const [teamworkDetails, setTeamworkDetails] = React.useState(
    initialValues.teamworkDetails
  );
  const [responsibilityDetails, setResponsibilityDetails] = React.useState(
    initialValues.responsibilityDetails
  );
  const [diligentDetails, setDiligentDetails] = React.useState(
    initialValues.diligentDetails
  );
  const [commitmentDetails, setCommitmentDetails] = React.useState(
    initialValues.commitmentDetails
  );
  const [probStatus, setProbStatus] = React.useState(initialValues.probStatus);
  const [gmName, setGmName] = React.useState(initialValues.gmName);
  const [extendDate, setExtendDate] = React.useState(initialValues.extendDate);
  const [prevProbExDate, setPrevProbExDate] = React.useState(
    initialValues.prevProbExDate
  );
  const [probExtendStatus, setProbExtendStatus] = React.useState(
    initialValues.probExtendStatus
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = probFormRecord
      ? { ...initialValues, ...probFormRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setAdaptability(cleanValues.adaptability);
    setAdditionalInfo(cleanValues.additionalInfo);
    setAttention(cleanValues.attention);
    setAttitude(cleanValues.attitude);
    setCommitment(cleanValues.commitment);
    setCommunication(cleanValues.communication);
    setDeadline(cleanValues.deadline);
    setDiligent(cleanValues.diligent);
    setExtensionPeriod(cleanValues.extensionPeriod);
    setGmDate(cleanValues.gmDate);
    setHrDate(cleanValues.hrDate);
    setHrName(cleanValues.hrName);
    setInitiative(cleanValues.initiative);
    setManagerDate(cleanValues.managerDate);
    setManagerName(cleanValues.managerName);
    setPace(cleanValues.pace);
    setQuality(cleanValues.quality);
    setRecommendation(cleanValues.recommendation);
    setResponsibility(cleanValues.responsibility);
    setSupervisorDate(cleanValues.supervisorDate);
    setSupervisorName(cleanValues.supervisorName);
    setTeamwork(cleanValues.teamwork);
    setExtendProbED(cleanValues.extendProbED);
    setGmApproved(cleanValues.gmApproved);
    setManagerApproved(cleanValues.managerApproved);
    setSupervisorApproved(cleanValues.supervisorApproved);
    setCommunicationDetails(cleanValues.communicationDetails);
    setQualityDetails(cleanValues.qualityDetails);
    setPaceDetails(cleanValues.paceDetails);
    setInitiativeDetails(cleanValues.initiativeDetails);
    setAttitudeDetails(cleanValues.attitudeDetails);
    setAdaptabilityDetails(cleanValues.adaptabilityDetails);
    setTeamworkDetails(cleanValues.teamworkDetails);
    setResponsibilityDetails(cleanValues.responsibilityDetails);
    setDiligentDetails(cleanValues.diligentDetails);
    setCommitmentDetails(cleanValues.commitmentDetails);
    setProbStatus(cleanValues.probStatus);
    setGmName(cleanValues.gmName);
    setExtendDate(cleanValues.extendDate);
    setPrevProbExDate(cleanValues.prevProbExDate);
    setProbExtendStatus(cleanValues.probExtendStatus);
    setErrors({});
  };
  const [probFormRecord, setProbFormRecord] = React.useState(probFormModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getProbForm.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getProbForm
        : probFormModelProp;
      setProbFormRecord(record);
    };
    queryData();
  }, [idProp, probFormModelProp]);
  React.useEffect(resetStateValues, [probFormRecord]);
  const validations = {
    empID: [{ type: "Required" }],
    adaptability: [],
    additionalInfo: [],
    attention: [],
    attitude: [],
    commitment: [],
    communication: [],
    deadline: [],
    diligent: [],
    extensionPeriod: [],
    gmDate: [],
    hrDate: [],
    hrName: [],
    initiative: [],
    managerDate: [],
    managerName: [],
    pace: [],
    quality: [],
    recommendation: [],
    responsibility: [],
    supervisorDate: [],
    supervisorName: [],
    teamwork: [],
    extendProbED: [],
    gmApproved: [],
    managerApproved: [],
    supervisorApproved: [],
    communicationDetails: [],
    qualityDetails: [],
    paceDetails: [],
    initiativeDetails: [],
    attitudeDetails: [],
    adaptabilityDetails: [],
    teamworkDetails: [],
    responsibilityDetails: [],
    diligentDetails: [],
    commitmentDetails: [],
    probStatus: [],
    gmName: [],
    extendDate: [],
    prevProbExDate: [],
    probExtendStatus: [],
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
          adaptability: adaptability ?? null,
          additionalInfo: additionalInfo ?? null,
          attention: attention ?? null,
          attitude: attitude ?? null,
          commitment: commitment ?? null,
          communication: communication ?? null,
          deadline: deadline ?? null,
          diligent: diligent ?? null,
          extensionPeriod: extensionPeriod ?? null,
          gmDate: gmDate ?? null,
          hrDate: hrDate ?? null,
          hrName: hrName ?? null,
          initiative: initiative ?? null,
          managerDate: managerDate ?? null,
          managerName: managerName ?? null,
          pace: pace ?? null,
          quality: quality ?? null,
          recommendation: recommendation ?? null,
          responsibility: responsibility ?? null,
          supervisorDate: supervisorDate ?? null,
          supervisorName: supervisorName ?? null,
          teamwork: teamwork ?? null,
          extendProbED: extendProbED ?? null,
          gmApproved: gmApproved ?? null,
          managerApproved: managerApproved ?? null,
          supervisorApproved: supervisorApproved ?? null,
          communicationDetails: communicationDetails ?? null,
          qualityDetails: qualityDetails ?? null,
          paceDetails: paceDetails ?? null,
          initiativeDetails: initiativeDetails ?? null,
          attitudeDetails: attitudeDetails ?? null,
          adaptabilityDetails: adaptabilityDetails ?? null,
          teamworkDetails: teamworkDetails ?? null,
          responsibilityDetails: responsibilityDetails ?? null,
          diligentDetails: diligentDetails ?? null,
          commitmentDetails: commitmentDetails ?? null,
          probStatus: probStatus ?? null,
          gmName: gmName ?? null,
          extendDate: extendDate ?? null,
          prevProbExDate: prevProbExDate ?? null,
          probExtendStatus: probExtendStatus ?? null,
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
            query: updateProbForm.replaceAll("__typename", ""),
            variables: {
              input: {
                id: probFormRecord.id,
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
      {...getOverrideProps(overrides, "ProbFormUpdateForm")}
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
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
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
        label="Adaptability"
        isRequired={false}
        isReadOnly={false}
        value={adaptability}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability: value,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.adaptability ?? value;
          }
          if (errors.adaptability?.hasError) {
            runValidationTasks("adaptability", value);
          }
          setAdaptability(value);
        }}
        onBlur={() => runValidationTasks("adaptability", adaptability)}
        errorMessage={errors.adaptability?.errorMessage}
        hasError={errors.adaptability?.hasError}
        {...getOverrideProps(overrides, "adaptability")}
      ></TextField>
      <TextField
        label="Additional info"
        isRequired={false}
        isReadOnly={false}
        value={additionalInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo: value,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.additionalInfo ?? value;
          }
          if (errors.additionalInfo?.hasError) {
            runValidationTasks("additionalInfo", value);
          }
          setAdditionalInfo(value);
        }}
        onBlur={() => runValidationTasks("additionalInfo", additionalInfo)}
        errorMessage={errors.additionalInfo?.errorMessage}
        hasError={errors.additionalInfo?.hasError}
        {...getOverrideProps(overrides, "additionalInfo")}
      ></TextField>
      <TextField
        label="Attention"
        isRequired={false}
        isReadOnly={false}
        value={attention}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention: value,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.attention ?? value;
          }
          if (errors.attention?.hasError) {
            runValidationTasks("attention", value);
          }
          setAttention(value);
        }}
        onBlur={() => runValidationTasks("attention", attention)}
        errorMessage={errors.attention?.errorMessage}
        hasError={errors.attention?.hasError}
        {...getOverrideProps(overrides, "attention")}
      ></TextField>
      <TextField
        label="Attitude"
        isRequired={false}
        isReadOnly={false}
        value={attitude}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude: value,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.attitude ?? value;
          }
          if (errors.attitude?.hasError) {
            runValidationTasks("attitude", value);
          }
          setAttitude(value);
        }}
        onBlur={() => runValidationTasks("attitude", attitude)}
        errorMessage={errors.attitude?.errorMessage}
        hasError={errors.attitude?.hasError}
        {...getOverrideProps(overrides, "attitude")}
      ></TextField>
      <TextField
        label="Commitment"
        isRequired={false}
        isReadOnly={false}
        value={commitment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment: value,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.commitment ?? value;
          }
          if (errors.commitment?.hasError) {
            runValidationTasks("commitment", value);
          }
          setCommitment(value);
        }}
        onBlur={() => runValidationTasks("commitment", commitment)}
        errorMessage={errors.commitment?.errorMessage}
        hasError={errors.commitment?.hasError}
        {...getOverrideProps(overrides, "commitment")}
      ></TextField>
      <TextField
        label="Communication"
        isRequired={false}
        isReadOnly={false}
        value={communication}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication: value,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.communication ?? value;
          }
          if (errors.communication?.hasError) {
            runValidationTasks("communication", value);
          }
          setCommunication(value);
        }}
        onBlur={() => runValidationTasks("communication", communication)}
        errorMessage={errors.communication?.errorMessage}
        hasError={errors.communication?.hasError}
        {...getOverrideProps(overrides, "communication")}
      ></TextField>
      <TextField
        label="Deadline"
        isRequired={false}
        isReadOnly={false}
        value={deadline}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline: value,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.deadline ?? value;
          }
          if (errors.deadline?.hasError) {
            runValidationTasks("deadline", value);
          }
          setDeadline(value);
        }}
        onBlur={() => runValidationTasks("deadline", deadline)}
        errorMessage={errors.deadline?.errorMessage}
        hasError={errors.deadline?.hasError}
        {...getOverrideProps(overrides, "deadline")}
      ></TextField>
      <TextField
        label="Diligent"
        isRequired={false}
        isReadOnly={false}
        value={diligent}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent: value,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.diligent ?? value;
          }
          if (errors.diligent?.hasError) {
            runValidationTasks("diligent", value);
          }
          setDiligent(value);
        }}
        onBlur={() => runValidationTasks("diligent", diligent)}
        errorMessage={errors.diligent?.errorMessage}
        hasError={errors.diligent?.hasError}
        {...getOverrideProps(overrides, "diligent")}
      ></TextField>
      <TextField
        label="Extension period"
        isRequired={false}
        isReadOnly={false}
        value={extensionPeriod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod: value,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.extensionPeriod ?? value;
          }
          if (errors.extensionPeriod?.hasError) {
            runValidationTasks("extensionPeriod", value);
          }
          setExtensionPeriod(value);
        }}
        onBlur={() => runValidationTasks("extensionPeriod", extensionPeriod)}
        errorMessage={errors.extensionPeriod?.errorMessage}
        hasError={errors.extensionPeriod?.hasError}
        {...getOverrideProps(overrides, "extensionPeriod")}
      ></TextField>
      <TextField
        label="Gm date"
        isRequired={false}
        isReadOnly={false}
        value={gmDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate: value,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.gmDate ?? value;
          }
          if (errors.gmDate?.hasError) {
            runValidationTasks("gmDate", value);
          }
          setGmDate(value);
        }}
        onBlur={() => runValidationTasks("gmDate", gmDate)}
        errorMessage={errors.gmDate?.errorMessage}
        hasError={errors.gmDate?.hasError}
        {...getOverrideProps(overrides, "gmDate")}
      ></TextField>
      <TextField
        label="Hr date"
        isRequired={false}
        isReadOnly={false}
        value={hrDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate: value,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.hrDate ?? value;
          }
          if (errors.hrDate?.hasError) {
            runValidationTasks("hrDate", value);
          }
          setHrDate(value);
        }}
        onBlur={() => runValidationTasks("hrDate", hrDate)}
        errorMessage={errors.hrDate?.errorMessage}
        hasError={errors.hrDate?.hasError}
        {...getOverrideProps(overrides, "hrDate")}
      ></TextField>
      <TextField
        label="Hr name"
        isRequired={false}
        isReadOnly={false}
        value={hrName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName: value,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.hrName ?? value;
          }
          if (errors.hrName?.hasError) {
            runValidationTasks("hrName", value);
          }
          setHrName(value);
        }}
        onBlur={() => runValidationTasks("hrName", hrName)}
        errorMessage={errors.hrName?.errorMessage}
        hasError={errors.hrName?.hasError}
        {...getOverrideProps(overrides, "hrName")}
      ></TextField>
      <TextField
        label="Initiative"
        isRequired={false}
        isReadOnly={false}
        value={initiative}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative: value,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.initiative ?? value;
          }
          if (errors.initiative?.hasError) {
            runValidationTasks("initiative", value);
          }
          setInitiative(value);
        }}
        onBlur={() => runValidationTasks("initiative", initiative)}
        errorMessage={errors.initiative?.errorMessage}
        hasError={errors.initiative?.hasError}
        {...getOverrideProps(overrides, "initiative")}
      ></TextField>
      <TextField
        label="Manager date"
        isRequired={false}
        isReadOnly={false}
        value={managerDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate: value,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.managerDate ?? value;
          }
          if (errors.managerDate?.hasError) {
            runValidationTasks("managerDate", value);
          }
          setManagerDate(value);
        }}
        onBlur={() => runValidationTasks("managerDate", managerDate)}
        errorMessage={errors.managerDate?.errorMessage}
        hasError={errors.managerDate?.hasError}
        {...getOverrideProps(overrides, "managerDate")}
      ></TextField>
      <TextField
        label="Manager name"
        isRequired={false}
        isReadOnly={false}
        value={managerName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName: value,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.managerName ?? value;
          }
          if (errors.managerName?.hasError) {
            runValidationTasks("managerName", value);
          }
          setManagerName(value);
        }}
        onBlur={() => runValidationTasks("managerName", managerName)}
        errorMessage={errors.managerName?.errorMessage}
        hasError={errors.managerName?.hasError}
        {...getOverrideProps(overrides, "managerName")}
      ></TextField>
      <TextField
        label="Pace"
        isRequired={false}
        isReadOnly={false}
        value={pace}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace: value,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.pace ?? value;
          }
          if (errors.pace?.hasError) {
            runValidationTasks("pace", value);
          }
          setPace(value);
        }}
        onBlur={() => runValidationTasks("pace", pace)}
        errorMessage={errors.pace?.errorMessage}
        hasError={errors.pace?.hasError}
        {...getOverrideProps(overrides, "pace")}
      ></TextField>
      <TextField
        label="Quality"
        isRequired={false}
        isReadOnly={false}
        value={quality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality: value,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.quality ?? value;
          }
          if (errors.quality?.hasError) {
            runValidationTasks("quality", value);
          }
          setQuality(value);
        }}
        onBlur={() => runValidationTasks("quality", quality)}
        errorMessage={errors.quality?.errorMessage}
        hasError={errors.quality?.hasError}
        {...getOverrideProps(overrides, "quality")}
      ></TextField>
      <TextField
        label="Recommendation"
        isRequired={false}
        isReadOnly={false}
        value={recommendation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation: value,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.recommendation ?? value;
          }
          if (errors.recommendation?.hasError) {
            runValidationTasks("recommendation", value);
          }
          setRecommendation(value);
        }}
        onBlur={() => runValidationTasks("recommendation", recommendation)}
        errorMessage={errors.recommendation?.errorMessage}
        hasError={errors.recommendation?.hasError}
        {...getOverrideProps(overrides, "recommendation")}
      ></TextField>
      <TextField
        label="Responsibility"
        isRequired={false}
        isReadOnly={false}
        value={responsibility}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility: value,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.responsibility ?? value;
          }
          if (errors.responsibility?.hasError) {
            runValidationTasks("responsibility", value);
          }
          setResponsibility(value);
        }}
        onBlur={() => runValidationTasks("responsibility", responsibility)}
        errorMessage={errors.responsibility?.errorMessage}
        hasError={errors.responsibility?.hasError}
        {...getOverrideProps(overrides, "responsibility")}
      ></TextField>
      <TextField
        label="Supervisor date"
        isRequired={false}
        isReadOnly={false}
        value={supervisorDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate: value,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.supervisorDate ?? value;
          }
          if (errors.supervisorDate?.hasError) {
            runValidationTasks("supervisorDate", value);
          }
          setSupervisorDate(value);
        }}
        onBlur={() => runValidationTasks("supervisorDate", supervisorDate)}
        errorMessage={errors.supervisorDate?.errorMessage}
        hasError={errors.supervisorDate?.hasError}
        {...getOverrideProps(overrides, "supervisorDate")}
      ></TextField>
      <TextField
        label="Supervisor name"
        isRequired={false}
        isReadOnly={false}
        value={supervisorName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName: value,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.supervisorName ?? value;
          }
          if (errors.supervisorName?.hasError) {
            runValidationTasks("supervisorName", value);
          }
          setSupervisorName(value);
        }}
        onBlur={() => runValidationTasks("supervisorName", supervisorName)}
        errorMessage={errors.supervisorName?.errorMessage}
        hasError={errors.supervisorName?.hasError}
        {...getOverrideProps(overrides, "supervisorName")}
      ></TextField>
      <TextField
        label="Teamwork"
        isRequired={false}
        isReadOnly={false}
        value={teamwork}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork: value,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.teamwork ?? value;
          }
          if (errors.teamwork?.hasError) {
            runValidationTasks("teamwork", value);
          }
          setTeamwork(value);
        }}
        onBlur={() => runValidationTasks("teamwork", teamwork)}
        errorMessage={errors.teamwork?.errorMessage}
        hasError={errors.teamwork?.hasError}
        {...getOverrideProps(overrides, "teamwork")}
      ></TextField>
      <TextField
        label="Extend prob ed"
        isRequired={false}
        isReadOnly={false}
        value={extendProbED}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED: value,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.extendProbED ?? value;
          }
          if (errors.extendProbED?.hasError) {
            runValidationTasks("extendProbED", value);
          }
          setExtendProbED(value);
        }}
        onBlur={() => runValidationTasks("extendProbED", extendProbED)}
        errorMessage={errors.extendProbED?.errorMessage}
        hasError={errors.extendProbED?.hasError}
        {...getOverrideProps(overrides, "extendProbED")}
      ></TextField>
      <TextField
        label="Gm approved"
        isRequired={false}
        isReadOnly={false}
        value={gmApproved}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved: value,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.gmApproved ?? value;
          }
          if (errors.gmApproved?.hasError) {
            runValidationTasks("gmApproved", value);
          }
          setGmApproved(value);
        }}
        onBlur={() => runValidationTasks("gmApproved", gmApproved)}
        errorMessage={errors.gmApproved?.errorMessage}
        hasError={errors.gmApproved?.hasError}
        {...getOverrideProps(overrides, "gmApproved")}
      ></TextField>
      <TextField
        label="Manager approved"
        isRequired={false}
        isReadOnly={false}
        value={managerApproved}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved: value,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.managerApproved ?? value;
          }
          if (errors.managerApproved?.hasError) {
            runValidationTasks("managerApproved", value);
          }
          setManagerApproved(value);
        }}
        onBlur={() => runValidationTasks("managerApproved", managerApproved)}
        errorMessage={errors.managerApproved?.errorMessage}
        hasError={errors.managerApproved?.hasError}
        {...getOverrideProps(overrides, "managerApproved")}
      ></TextField>
      <TextField
        label="Supervisor approved"
        isRequired={false}
        isReadOnly={false}
        value={supervisorApproved}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved: value,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.supervisorApproved ?? value;
          }
          if (errors.supervisorApproved?.hasError) {
            runValidationTasks("supervisorApproved", value);
          }
          setSupervisorApproved(value);
        }}
        onBlur={() =>
          runValidationTasks("supervisorApproved", supervisorApproved)
        }
        errorMessage={errors.supervisorApproved?.errorMessage}
        hasError={errors.supervisorApproved?.hasError}
        {...getOverrideProps(overrides, "supervisorApproved")}
      ></TextField>
      <TextField
        label="Communication details"
        isRequired={false}
        isReadOnly={false}
        value={communicationDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails: value,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.communicationDetails ?? value;
          }
          if (errors.communicationDetails?.hasError) {
            runValidationTasks("communicationDetails", value);
          }
          setCommunicationDetails(value);
        }}
        onBlur={() =>
          runValidationTasks("communicationDetails", communicationDetails)
        }
        errorMessage={errors.communicationDetails?.errorMessage}
        hasError={errors.communicationDetails?.hasError}
        {...getOverrideProps(overrides, "communicationDetails")}
      ></TextField>
      <TextField
        label="Quality details"
        isRequired={false}
        isReadOnly={false}
        value={qualityDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails: value,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.qualityDetails ?? value;
          }
          if (errors.qualityDetails?.hasError) {
            runValidationTasks("qualityDetails", value);
          }
          setQualityDetails(value);
        }}
        onBlur={() => runValidationTasks("qualityDetails", qualityDetails)}
        errorMessage={errors.qualityDetails?.errorMessage}
        hasError={errors.qualityDetails?.hasError}
        {...getOverrideProps(overrides, "qualityDetails")}
      ></TextField>
      <TextField
        label="Pace details"
        isRequired={false}
        isReadOnly={false}
        value={paceDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails: value,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.paceDetails ?? value;
          }
          if (errors.paceDetails?.hasError) {
            runValidationTasks("paceDetails", value);
          }
          setPaceDetails(value);
        }}
        onBlur={() => runValidationTasks("paceDetails", paceDetails)}
        errorMessage={errors.paceDetails?.errorMessage}
        hasError={errors.paceDetails?.hasError}
        {...getOverrideProps(overrides, "paceDetails")}
      ></TextField>
      <TextField
        label="Initiative details"
        isRequired={false}
        isReadOnly={false}
        value={initiativeDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails: value,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.initiativeDetails ?? value;
          }
          if (errors.initiativeDetails?.hasError) {
            runValidationTasks("initiativeDetails", value);
          }
          setInitiativeDetails(value);
        }}
        onBlur={() =>
          runValidationTasks("initiativeDetails", initiativeDetails)
        }
        errorMessage={errors.initiativeDetails?.errorMessage}
        hasError={errors.initiativeDetails?.hasError}
        {...getOverrideProps(overrides, "initiativeDetails")}
      ></TextField>
      <TextField
        label="Attitude details"
        isRequired={false}
        isReadOnly={false}
        value={attitudeDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails: value,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.attitudeDetails ?? value;
          }
          if (errors.attitudeDetails?.hasError) {
            runValidationTasks("attitudeDetails", value);
          }
          setAttitudeDetails(value);
        }}
        onBlur={() => runValidationTasks("attitudeDetails", attitudeDetails)}
        errorMessage={errors.attitudeDetails?.errorMessage}
        hasError={errors.attitudeDetails?.hasError}
        {...getOverrideProps(overrides, "attitudeDetails")}
      ></TextField>
      <TextField
        label="Adaptability details"
        isRequired={false}
        isReadOnly={false}
        value={adaptabilityDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails: value,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.adaptabilityDetails ?? value;
          }
          if (errors.adaptabilityDetails?.hasError) {
            runValidationTasks("adaptabilityDetails", value);
          }
          setAdaptabilityDetails(value);
        }}
        onBlur={() =>
          runValidationTasks("adaptabilityDetails", adaptabilityDetails)
        }
        errorMessage={errors.adaptabilityDetails?.errorMessage}
        hasError={errors.adaptabilityDetails?.hasError}
        {...getOverrideProps(overrides, "adaptabilityDetails")}
      ></TextField>
      <TextField
        label="Teamwork details"
        isRequired={false}
        isReadOnly={false}
        value={teamworkDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails: value,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.teamworkDetails ?? value;
          }
          if (errors.teamworkDetails?.hasError) {
            runValidationTasks("teamworkDetails", value);
          }
          setTeamworkDetails(value);
        }}
        onBlur={() => runValidationTasks("teamworkDetails", teamworkDetails)}
        errorMessage={errors.teamworkDetails?.errorMessage}
        hasError={errors.teamworkDetails?.hasError}
        {...getOverrideProps(overrides, "teamworkDetails")}
      ></TextField>
      <TextField
        label="Responsibility details"
        isRequired={false}
        isReadOnly={false}
        value={responsibilityDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails: value,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.responsibilityDetails ?? value;
          }
          if (errors.responsibilityDetails?.hasError) {
            runValidationTasks("responsibilityDetails", value);
          }
          setResponsibilityDetails(value);
        }}
        onBlur={() =>
          runValidationTasks("responsibilityDetails", responsibilityDetails)
        }
        errorMessage={errors.responsibilityDetails?.errorMessage}
        hasError={errors.responsibilityDetails?.hasError}
        {...getOverrideProps(overrides, "responsibilityDetails")}
      ></TextField>
      <TextField
        label="Diligent details"
        isRequired={false}
        isReadOnly={false}
        value={diligentDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails: value,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.diligentDetails ?? value;
          }
          if (errors.diligentDetails?.hasError) {
            runValidationTasks("diligentDetails", value);
          }
          setDiligentDetails(value);
        }}
        onBlur={() => runValidationTasks("diligentDetails", diligentDetails)}
        errorMessage={errors.diligentDetails?.errorMessage}
        hasError={errors.diligentDetails?.hasError}
        {...getOverrideProps(overrides, "diligentDetails")}
      ></TextField>
      <TextField
        label="Commitment details"
        isRequired={false}
        isReadOnly={false}
        value={commitmentDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails: value,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.commitmentDetails ?? value;
          }
          if (errors.commitmentDetails?.hasError) {
            runValidationTasks("commitmentDetails", value);
          }
          setCommitmentDetails(value);
        }}
        onBlur={() =>
          runValidationTasks("commitmentDetails", commitmentDetails)
        }
        errorMessage={errors.commitmentDetails?.errorMessage}
        hasError={errors.commitmentDetails?.hasError}
        {...getOverrideProps(overrides, "commitmentDetails")}
      ></TextField>
      <SwitchField
        label="Prob status"
        defaultChecked={false}
        isDisabled={false}
        isChecked={probStatus}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus: value,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.probStatus ?? value;
          }
          if (errors.probStatus?.hasError) {
            runValidationTasks("probStatus", value);
          }
          setProbStatus(value);
        }}
        onBlur={() => runValidationTasks("probStatus", probStatus)}
        errorMessage={errors.probStatus?.errorMessage}
        hasError={errors.probStatus?.hasError}
        {...getOverrideProps(overrides, "probStatus")}
      ></SwitchField>
      <TextField
        label="Gm name"
        isRequired={false}
        isReadOnly={false}
        value={gmName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName: value,
              extendDate,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.gmName ?? value;
          }
          if (errors.gmName?.hasError) {
            runValidationTasks("gmName", value);
          }
          setGmName(value);
        }}
        onBlur={() => runValidationTasks("gmName", gmName)}
        errorMessage={errors.gmName?.errorMessage}
        hasError={errors.gmName?.hasError}
        {...getOverrideProps(overrides, "gmName")}
      ></TextField>
      <TextField
        label="Extend date"
        isRequired={false}
        isReadOnly={false}
        value={extendDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate: value,
              prevProbExDate,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.extendDate ?? value;
          }
          if (errors.extendDate?.hasError) {
            runValidationTasks("extendDate", value);
          }
          setExtendDate(value);
        }}
        onBlur={() => runValidationTasks("extendDate", extendDate)}
        errorMessage={errors.extendDate?.errorMessage}
        hasError={errors.extendDate?.hasError}
        {...getOverrideProps(overrides, "extendDate")}
      ></TextField>
      <TextField
        label="Prev prob ex date"
        isRequired={false}
        isReadOnly={false}
        value={prevProbExDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate: value,
              probExtendStatus,
            };
            const result = onChange(modelFields);
            value = result?.prevProbExDate ?? value;
          }
          if (errors.prevProbExDate?.hasError) {
            runValidationTasks("prevProbExDate", value);
          }
          setPrevProbExDate(value);
        }}
        onBlur={() => runValidationTasks("prevProbExDate", prevProbExDate)}
        errorMessage={errors.prevProbExDate?.errorMessage}
        hasError={errors.prevProbExDate?.hasError}
        {...getOverrideProps(overrides, "prevProbExDate")}
      ></TextField>
      <TextField
        label="Prob extend status"
        isRequired={false}
        isReadOnly={false}
        value={probExtendStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              diligent,
              extensionPeriod,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerDate,
              managerName,
              pace,
              quality,
              recommendation,
              responsibility,
              supervisorDate,
              supervisorName,
              teamwork,
              extendProbED,
              gmApproved,
              managerApproved,
              supervisorApproved,
              communicationDetails,
              qualityDetails,
              paceDetails,
              initiativeDetails,
              attitudeDetails,
              adaptabilityDetails,
              teamworkDetails,
              responsibilityDetails,
              diligentDetails,
              commitmentDetails,
              probStatus,
              gmName,
              extendDate,
              prevProbExDate,
              probExtendStatus: value,
            };
            const result = onChange(modelFields);
            value = result?.probExtendStatus ?? value;
          }
          if (errors.probExtendStatus?.hasError) {
            runValidationTasks("probExtendStatus", value);
          }
          setProbExtendStatus(value);
        }}
        onBlur={() => runValidationTasks("probExtendStatus", probExtendStatus)}
        errorMessage={errors.probExtendStatus?.errorMessage}
        hasError={errors.probExtendStatus?.hasError}
        {...getOverrideProps(overrides, "probExtendStatus")}
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
          isDisabled={!(idProp || probFormModelProp)}
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
              !(idProp || probFormModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
