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
import { createProbForm } from "../graphql/mutations";
const client = generateClient();
export default function ProbFormCreateForm(props) {
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
    adaptability: "",
    additionalInfo: "",
    attention: "",
    attitude: "",
    commitment: "",
    communication: "",
    deadline: "",
    department: "",
    diligent: "",
    doj: "",
    empBadgeNo: "",
    extendedProbationEndDate: "",
    extensionPeriod: "",
    gmApproved: false,
    gmDate: "",
    hrDate: "",
    hrName: "",
    initiative: "",
    managerApproved: false,
    managerDate: "",
    managerName: "",
    name: "",
    pace: "",
    position: "",
    probationEnd: "",
    quality: "",
    recommendation: "",
    responsibility: "",
    supervisorApproved: false,
    supervisorDate: "",
    supervisorName: "",
    teamwork: "",
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
  const [department, setDepartment] = React.useState(initialValues.department);
  const [diligent, setDiligent] = React.useState(initialValues.diligent);
  const [doj, setDoj] = React.useState(initialValues.doj);
  const [empBadgeNo, setEmpBadgeNo] = React.useState(initialValues.empBadgeNo);
  const [extendedProbationEndDate, setExtendedProbationEndDate] =
    React.useState(initialValues.extendedProbationEndDate);
  const [extensionPeriod, setExtensionPeriod] = React.useState(
    initialValues.extensionPeriod
  );
  const [gmApproved, setGmApproved] = React.useState(initialValues.gmApproved);
  const [gmDate, setGmDate] = React.useState(initialValues.gmDate);
  const [hrDate, setHrDate] = React.useState(initialValues.hrDate);
  const [hrName, setHrName] = React.useState(initialValues.hrName);
  const [initiative, setInitiative] = React.useState(initialValues.initiative);
  const [managerApproved, setManagerApproved] = React.useState(
    initialValues.managerApproved
  );
  const [managerDate, setManagerDate] = React.useState(
    initialValues.managerDate
  );
  const [managerName, setManagerName] = React.useState(
    initialValues.managerName
  );
  const [name, setName] = React.useState(initialValues.name);
  const [pace, setPace] = React.useState(initialValues.pace);
  const [position, setPosition] = React.useState(initialValues.position);
  const [probationEnd, setProbationEnd] = React.useState(
    initialValues.probationEnd
  );
  const [quality, setQuality] = React.useState(initialValues.quality);
  const [recommendation, setRecommendation] = React.useState(
    initialValues.recommendation
  );
  const [responsibility, setResponsibility] = React.useState(
    initialValues.responsibility
  );
  const [supervisorApproved, setSupervisorApproved] = React.useState(
    initialValues.supervisorApproved
  );
  const [supervisorDate, setSupervisorDate] = React.useState(
    initialValues.supervisorDate
  );
  const [supervisorName, setSupervisorName] = React.useState(
    initialValues.supervisorName
  );
  const [teamwork, setTeamwork] = React.useState(initialValues.teamwork);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setAdaptability(initialValues.adaptability);
    setAdditionalInfo(initialValues.additionalInfo);
    setAttention(initialValues.attention);
    setAttitude(initialValues.attitude);
    setCommitment(initialValues.commitment);
    setCommunication(initialValues.communication);
    setDeadline(initialValues.deadline);
    setDepartment(initialValues.department);
    setDiligent(initialValues.diligent);
    setDoj(initialValues.doj);
    setEmpBadgeNo(initialValues.empBadgeNo);
    setExtendedProbationEndDate(initialValues.extendedProbationEndDate);
    setExtensionPeriod(initialValues.extensionPeriod);
    setGmApproved(initialValues.gmApproved);
    setGmDate(initialValues.gmDate);
    setHrDate(initialValues.hrDate);
    setHrName(initialValues.hrName);
    setInitiative(initialValues.initiative);
    setManagerApproved(initialValues.managerApproved);
    setManagerDate(initialValues.managerDate);
    setManagerName(initialValues.managerName);
    setName(initialValues.name);
    setPace(initialValues.pace);
    setPosition(initialValues.position);
    setProbationEnd(initialValues.probationEnd);
    setQuality(initialValues.quality);
    setRecommendation(initialValues.recommendation);
    setResponsibility(initialValues.responsibility);
    setSupervisorApproved(initialValues.supervisorApproved);
    setSupervisorDate(initialValues.supervisorDate);
    setSupervisorName(initialValues.supervisorName);
    setTeamwork(initialValues.teamwork);
    setErrors({});
  };
  const validations = {
    empID: [{ type: "Required" }],
    adaptability: [],
    additionalInfo: [],
    attention: [],
    attitude: [],
    commitment: [],
    communication: [],
    deadline: [],
    department: [],
    diligent: [],
    doj: [],
    empBadgeNo: [],
    extendedProbationEndDate: [],
    extensionPeriod: [],
    gmApproved: [],
    gmDate: [],
    hrDate: [],
    hrName: [],
    initiative: [],
    managerApproved: [],
    managerDate: [],
    managerName: [],
    name: [],
    pace: [],
    position: [],
    probationEnd: [],
    quality: [],
    recommendation: [],
    responsibility: [],
    supervisorApproved: [],
    supervisorDate: [],
    supervisorName: [],
    teamwork: [],
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
          adaptability,
          additionalInfo,
          attention,
          attitude,
          commitment,
          communication,
          deadline,
          department,
          diligent,
          doj,
          empBadgeNo,
          extendedProbationEndDate,
          extensionPeriod,
          gmApproved,
          gmDate,
          hrDate,
          hrName,
          initiative,
          managerApproved,
          managerDate,
          managerName,
          name,
          pace,
          position,
          probationEnd,
          quality,
          recommendation,
          responsibility,
          supervisorApproved,
          supervisorDate,
          supervisorName,
          teamwork,
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
            query: createProbForm.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ProbFormCreateForm")}
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
        label="Department"
        isRequired={false}
        isReadOnly={false}
        value={department}
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
              department: value,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
            };
            const result = onChange(modelFields);
            value = result?.department ?? value;
          }
          if (errors.department?.hasError) {
            runValidationTasks("department", value);
          }
          setDepartment(value);
        }}
        onBlur={() => runValidationTasks("department", department)}
        errorMessage={errors.department?.errorMessage}
        hasError={errors.department?.hasError}
        {...getOverrideProps(overrides, "department")}
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
              department,
              diligent: value,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
        label="Doj"
        isRequired={false}
        isReadOnly={false}
        value={doj}
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
              department,
              diligent,
              doj: value,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
            };
            const result = onChange(modelFields);
            value = result?.doj ?? value;
          }
          if (errors.doj?.hasError) {
            runValidationTasks("doj", value);
          }
          setDoj(value);
        }}
        onBlur={() => runValidationTasks("doj", doj)}
        errorMessage={errors.doj?.errorMessage}
        hasError={errors.doj?.hasError}
        {...getOverrideProps(overrides, "doj")}
      ></TextField>
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
              adaptability,
              additionalInfo,
              attention,
              attitude,
              commitment,
              communication,
              deadline,
              department,
              diligent,
              doj,
              empBadgeNo: value,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
      <TextField
        label="Extended probation end date"
        isRequired={false}
        isReadOnly={false}
        value={extendedProbationEndDate}
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate: value,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
            };
            const result = onChange(modelFields);
            value = result?.extendedProbationEndDate ?? value;
          }
          if (errors.extendedProbationEndDate?.hasError) {
            runValidationTasks("extendedProbationEndDate", value);
          }
          setExtendedProbationEndDate(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "extendedProbationEndDate",
            extendedProbationEndDate
          )
        }
        errorMessage={errors.extendedProbationEndDate?.errorMessage}
        hasError={errors.extendedProbationEndDate?.hasError}
        {...getOverrideProps(overrides, "extendedProbationEndDate")}
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod: value,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
      <SwitchField
        label="Gm approved"
        defaultChecked={false}
        isDisabled={false}
        isChecked={gmApproved}
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved: value,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
      ></SwitchField>
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate: value,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate: value,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName: value,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative: value,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
      <SwitchField
        label="Manager approved"
        defaultChecked={false}
        isDisabled={false}
        isChecked={managerApproved}
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved: value,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
      ></SwitchField>
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate: value,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName: value,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name: value,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace: value,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
        label="Position"
        isRequired={false}
        isReadOnly={false}
        value={position}
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position: value,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
        label="Probation end"
        isRequired={false}
        isReadOnly={false}
        value={probationEnd}
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd: value,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
            };
            const result = onChange(modelFields);
            value = result?.probationEnd ?? value;
          }
          if (errors.probationEnd?.hasError) {
            runValidationTasks("probationEnd", value);
          }
          setProbationEnd(value);
        }}
        onBlur={() => runValidationTasks("probationEnd", probationEnd)}
        errorMessage={errors.probationEnd?.errorMessage}
        hasError={errors.probationEnd?.hasError}
        {...getOverrideProps(overrides, "probationEnd")}
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality: value,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation: value,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility: value,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork,
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
      <SwitchField
        label="Supervisor approved"
        defaultChecked={false}
        isDisabled={false}
        isChecked={supervisorApproved}
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved: value,
              supervisorDate,
              supervisorName,
              teamwork,
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
      ></SwitchField>
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate: value,
              supervisorName,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName: value,
              teamwork,
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
              department,
              diligent,
              doj,
              empBadgeNo,
              extendedProbationEndDate,
              extensionPeriod,
              gmApproved,
              gmDate,
              hrDate,
              hrName,
              initiative,
              managerApproved,
              managerDate,
              managerName,
              name,
              pace,
              position,
              probationEnd,
              quality,
              recommendation,
              responsibility,
              supervisorApproved,
              supervisorDate,
              supervisorName,
              teamwork: value,
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
