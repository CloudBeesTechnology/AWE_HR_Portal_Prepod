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
import { getPaafSchema } from "../graphql/queries";
import { updatePaafSchema } from "../graphql/mutations";
const client = generateClient();
export default function PaafSchemaUpdateForm(props) {
  const {
    id: idProp,
    paafSchema: paafSchemaModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    paafApproveDate: "",
    paafFile: "",
  };
  const [paafApproveDate, setPaafApproveDate] = React.useState(
    initialValues.paafApproveDate
  );
  const [paafFile, setPaafFile] = React.useState(initialValues.paafFile);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = paafSchemaRecord
      ? { ...initialValues, ...paafSchemaRecord }
      : initialValues;
    setPaafApproveDate(cleanValues.paafApproveDate);
    setPaafFile(cleanValues.paafFile);
    setErrors({});
  };
  const [paafSchemaRecord, setPaafSchemaRecord] =
    React.useState(paafSchemaModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPaafSchema.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPaafSchema
        : paafSchemaModelProp;
      setPaafSchemaRecord(record);
    };
    queryData();
  }, [idProp, paafSchemaModelProp]);
  React.useEffect(resetStateValues, [paafSchemaRecord]);
  const validations = {
    paafApproveDate: [{ type: "Required" }],
    paafFile: [{ type: "Required" }],
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
          paafApproveDate,
          paafFile,
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
            query: updatePaafSchema.replaceAll("__typename", ""),
            variables: {
              input: {
                id: paafSchemaRecord.id,
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
      {...getOverrideProps(overrides, "PaafSchemaUpdateForm")}
      {...rest}
    >
      <TextField
        label="Paaf approve date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={paafApproveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              paafApproveDate: value,
              paafFile,
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
        isRequired={true}
        isReadOnly={false}
        value={paafFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              paafApproveDate,
              paafFile: value,
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
          isDisabled={!(idProp || paafSchemaModelProp)}
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
              !(idProp || paafSchemaModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
