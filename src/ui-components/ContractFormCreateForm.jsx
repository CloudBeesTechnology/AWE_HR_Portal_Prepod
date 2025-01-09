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
import { createContractForm } from "../graphql/mutations";
const client = generateClient();
export default function ContractFormCreateForm(props) {
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
    conAttn: "",
    depHead: "",
    hrManager: "",
    genManager: "",
    remarks: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [conAttn, setConAttn] = React.useState(initialValues.conAttn);
  const [depHead, setDepHead] = React.useState(initialValues.depHead);
  const [hrManager, setHrManager] = React.useState(initialValues.hrManager);
  const [genManager, setGenManager] = React.useState(initialValues.genManager);
  const [remarks, setRemarks] = React.useState(initialValues.remarks);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setConAttn(initialValues.conAttn);
    setDepHead(initialValues.depHead);
    setHrManager(initialValues.hrManager);
    setGenManager(initialValues.genManager);
    setRemarks(initialValues.remarks);
    setErrors({});
  };
  const validations = {
    empID: [{ type: "Required" }],
    conAttn: [],
    depHead: [],
    hrManager: [],
    genManager: [],
    remarks: [],
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
          conAttn,
          depHead,
          hrManager,
          genManager,
          remarks,
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
            query: createContractForm.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ContractFormCreateForm")}
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
