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
import { getContractForm } from "../graphql/queries";
import { updateContractForm } from "../graphql/mutations";
const client = generateClient();
export default function ContractFormUpdateForm(props) {
  const {
    id: idProp,
    contractForm: contractFormModelProp,
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
    conAttn: "",
    depHead: "",
    hrManager: "",
    genManager: "",
    remarks: "",
    contStatus: false,
    remarkHr: "",
    remarkGm: "",
    renewalContract: "",
    managerDate: "",
    hrmDate: "",
    gmDate: "",
    extendedStatus: "",
    oldCED: "",
    hrSign: "",
    hrDate: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [conAttn, setConAttn] = React.useState(initialValues.conAttn);
  const [depHead, setDepHead] = React.useState(initialValues.depHead);
  const [hrManager, setHrManager] = React.useState(initialValues.hrManager);
  const [genManager, setGenManager] = React.useState(initialValues.genManager);
  const [remarks, setRemarks] = React.useState(initialValues.remarks);
  const [contStatus, setContStatus] = React.useState(initialValues.contStatus);
  const [remarkHr, setRemarkHr] = React.useState(initialValues.remarkHr);
  const [remarkGm, setRemarkGm] = React.useState(initialValues.remarkGm);
  const [renewalContract, setRenewalContract] = React.useState(
    initialValues.renewalContract
  );
  const [managerDate, setManagerDate] = React.useState(
    initialValues.managerDate
  );
  const [hrmDate, setHrmDate] = React.useState(initialValues.hrmDate);
  const [gmDate, setGmDate] = React.useState(initialValues.gmDate);
  const [extendedStatus, setExtendedStatus] = React.useState(
    initialValues.extendedStatus
  );
  const [oldCED, setOldCED] = React.useState(initialValues.oldCED);
  const [hrSign, setHrSign] = React.useState(initialValues.hrSign);
  const [hrDate, setHrDate] = React.useState(initialValues.hrDate);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = contractFormRecord
      ? { ...initialValues, ...contractFormRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setConAttn(cleanValues.conAttn);
    setDepHead(cleanValues.depHead);
    setHrManager(cleanValues.hrManager);
    setGenManager(cleanValues.genManager);
    setRemarks(cleanValues.remarks);
    setContStatus(cleanValues.contStatus);
    setRemarkHr(cleanValues.remarkHr);
    setRemarkGm(cleanValues.remarkGm);
    setRenewalContract(cleanValues.renewalContract);
    setManagerDate(cleanValues.managerDate);
    setHrmDate(cleanValues.hrmDate);
    setGmDate(cleanValues.gmDate);
    setExtendedStatus(cleanValues.extendedStatus);
    setOldCED(cleanValues.oldCED);
    setHrSign(cleanValues.hrSign);
    setHrDate(cleanValues.hrDate);
    setErrors({});
  };
  const [contractFormRecord, setContractFormRecord] = React.useState(
    contractFormModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getContractForm.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getContractForm
        : contractFormModelProp;
      setContractFormRecord(record);
    };
    queryData();
  }, [idProp, contractFormModelProp]);
  React.useEffect(resetStateValues, [contractFormRecord]);
  const validations = {
    empID: [{ type: "Required" }],
    conAttn: [],
    depHead: [],
    hrManager: [],
    genManager: [],
    remarks: [],
    contStatus: [],
    remarkHr: [],
    remarkGm: [],
    renewalContract: [],
    managerDate: [],
    hrmDate: [],
    gmDate: [],
    extendedStatus: [],
    oldCED: [],
    hrSign: [],
    hrDate: [],
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
          conAttn: conAttn ?? null,
          depHead: depHead ?? null,
          hrManager: hrManager ?? null,
          genManager: genManager ?? null,
          remarks: remarks ?? null,
          contStatus: contStatus ?? null,
          remarkHr: remarkHr ?? null,
          remarkGm: remarkGm ?? null,
          renewalContract: renewalContract ?? null,
          managerDate: managerDate ?? null,
          hrmDate: hrmDate ?? null,
          gmDate: gmDate ?? null,
          extendedStatus: extendedStatus ?? null,
          oldCED: oldCED ?? null,
          hrSign: hrSign ?? null,
          hrDate: hrDate ?? null,
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
            query: updateContractForm.replaceAll("__typename", ""),
            variables: {
              input: {
                id: contractFormRecord.id,
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
      {...getOverrideProps(overrides, "ContractFormUpdateForm")}
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
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
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
        label="Con attn"
        isRequired={false}
        isReadOnly={false}
        value={conAttn}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn: value,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.conAttn ?? value;
          }
          if (errors.conAttn?.hasError) {
            runValidationTasks("conAttn", value);
          }
          setConAttn(value);
        }}
        onBlur={() => runValidationTasks("conAttn", conAttn)}
        errorMessage={errors.conAttn?.errorMessage}
        hasError={errors.conAttn?.hasError}
        {...getOverrideProps(overrides, "conAttn")}
      ></TextField>
      <TextField
        label="Dep head"
        isRequired={false}
        isReadOnly={false}
        value={depHead}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead: value,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.depHead ?? value;
          }
          if (errors.depHead?.hasError) {
            runValidationTasks("depHead", value);
          }
          setDepHead(value);
        }}
        onBlur={() => runValidationTasks("depHead", depHead)}
        errorMessage={errors.depHead?.errorMessage}
        hasError={errors.depHead?.hasError}
        {...getOverrideProps(overrides, "depHead")}
      ></TextField>
      <TextField
        label="Hr manager"
        isRequired={false}
        isReadOnly={false}
        value={hrManager}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager: value,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.hrManager ?? value;
          }
          if (errors.hrManager?.hasError) {
            runValidationTasks("hrManager", value);
          }
          setHrManager(value);
        }}
        onBlur={() => runValidationTasks("hrManager", hrManager)}
        errorMessage={errors.hrManager?.errorMessage}
        hasError={errors.hrManager?.hasError}
        {...getOverrideProps(overrides, "hrManager")}
      ></TextField>
      <TextField
        label="Gen manager"
        isRequired={false}
        isReadOnly={false}
        value={genManager}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager,
              genManager: value,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.genManager ?? value;
          }
          if (errors.genManager?.hasError) {
            runValidationTasks("genManager", value);
          }
          setGenManager(value);
        }}
        onBlur={() => runValidationTasks("genManager", genManager)}
        errorMessage={errors.genManager?.errorMessage}
        hasError={errors.genManager?.hasError}
        {...getOverrideProps(overrides, "genManager")}
      ></TextField>
      <TextField
        label="Remarks"
        isRequired={false}
        isReadOnly={false}
        value={remarks}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks: value,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.remarks ?? value;
          }
          if (errors.remarks?.hasError) {
            runValidationTasks("remarks", value);
          }
          setRemarks(value);
        }}
        onBlur={() => runValidationTasks("remarks", remarks)}
        errorMessage={errors.remarks?.errorMessage}
        hasError={errors.remarks?.hasError}
        {...getOverrideProps(overrides, "remarks")}
      ></TextField>
      <SwitchField
        label="Cont status"
        defaultChecked={false}
        isDisabled={false}
        isChecked={contStatus}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus: value,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.contStatus ?? value;
          }
          if (errors.contStatus?.hasError) {
            runValidationTasks("contStatus", value);
          }
          setContStatus(value);
        }}
        onBlur={() => runValidationTasks("contStatus", contStatus)}
        errorMessage={errors.contStatus?.errorMessage}
        hasError={errors.contStatus?.hasError}
        {...getOverrideProps(overrides, "contStatus")}
      ></SwitchField>
      <TextField
        label="Remark hr"
        isRequired={false}
        isReadOnly={false}
        value={remarkHr}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr: value,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.remarkHr ?? value;
          }
          if (errors.remarkHr?.hasError) {
            runValidationTasks("remarkHr", value);
          }
          setRemarkHr(value);
        }}
        onBlur={() => runValidationTasks("remarkHr", remarkHr)}
        errorMessage={errors.remarkHr?.errorMessage}
        hasError={errors.remarkHr?.hasError}
        {...getOverrideProps(overrides, "remarkHr")}
      ></TextField>
      <TextField
        label="Remark gm"
        isRequired={false}
        isReadOnly={false}
        value={remarkGm}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm: value,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.remarkGm ?? value;
          }
          if (errors.remarkGm?.hasError) {
            runValidationTasks("remarkGm", value);
          }
          setRemarkGm(value);
        }}
        onBlur={() => runValidationTasks("remarkGm", remarkGm)}
        errorMessage={errors.remarkGm?.errorMessage}
        hasError={errors.remarkGm?.hasError}
        {...getOverrideProps(overrides, "remarkGm")}
      ></TextField>
      <TextField
        label="Renewal contract"
        isRequired={false}
        isReadOnly={false}
        value={renewalContract}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract: value,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.renewalContract ?? value;
          }
          if (errors.renewalContract?.hasError) {
            runValidationTasks("renewalContract", value);
          }
          setRenewalContract(value);
        }}
        onBlur={() => runValidationTasks("renewalContract", renewalContract)}
        errorMessage={errors.renewalContract?.errorMessage}
        hasError={errors.renewalContract?.hasError}
        {...getOverrideProps(overrides, "renewalContract")}
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
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate: value,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
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
        label="Hrm date"
        isRequired={false}
        isReadOnly={false}
        value={hrmDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate: value,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.hrmDate ?? value;
          }
          if (errors.hrmDate?.hasError) {
            runValidationTasks("hrmDate", value);
          }
          setHrmDate(value);
        }}
        onBlur={() => runValidationTasks("hrmDate", hrmDate)}
        errorMessage={errors.hrmDate?.errorMessage}
        hasError={errors.hrmDate?.hasError}
        {...getOverrideProps(overrides, "hrmDate")}
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
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate: value,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate,
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
        label="Extended status"
        isRequired={false}
        isReadOnly={false}
        value={extendedStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus: value,
              oldCED,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.extendedStatus ?? value;
          }
          if (errors.extendedStatus?.hasError) {
            runValidationTasks("extendedStatus", value);
          }
          setExtendedStatus(value);
        }}
        onBlur={() => runValidationTasks("extendedStatus", extendedStatus)}
        errorMessage={errors.extendedStatus?.errorMessage}
        hasError={errors.extendedStatus?.hasError}
        {...getOverrideProps(overrides, "extendedStatus")}
      ></TextField>
      <TextField
        label="Old ced"
        isRequired={false}
        isReadOnly={false}
        value={oldCED}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED: value,
              hrSign,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.oldCED ?? value;
          }
          if (errors.oldCED?.hasError) {
            runValidationTasks("oldCED", value);
          }
          setOldCED(value);
        }}
        onBlur={() => runValidationTasks("oldCED", oldCED)}
        errorMessage={errors.oldCED?.errorMessage}
        hasError={errors.oldCED?.hasError}
        {...getOverrideProps(overrides, "oldCED")}
      ></TextField>
      <TextField
        label="Hr sign"
        isRequired={false}
        isReadOnly={false}
        value={hrSign}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign: value,
              hrDate,
            };
            const result = onChange(modelFields);
            value = result?.hrSign ?? value;
          }
          if (errors.hrSign?.hasError) {
            runValidationTasks("hrSign", value);
          }
          setHrSign(value);
        }}
        onBlur={() => runValidationTasks("hrSign", hrSign)}
        errorMessage={errors.hrSign?.errorMessage}
        hasError={errors.hrSign?.hasError}
        {...getOverrideProps(overrides, "hrSign")}
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
              conAttn,
              depHead,
              hrManager,
              genManager,
              remarks,
              contStatus,
              remarkHr,
              remarkGm,
              renewalContract,
              managerDate,
              hrmDate,
              gmDate,
              extendedStatus,
              oldCED,
              hrSign,
              hrDate: value,
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
          isDisabled={!(idProp || contractFormModelProp)}
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
              !(idProp || contractFormModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
