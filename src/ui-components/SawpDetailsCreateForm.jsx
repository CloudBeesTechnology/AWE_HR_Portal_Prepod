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
import { createSawpDetails } from "../graphql/mutations";
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
export default function SawpDetailsCreateForm(props) {
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
    sawpEmpLtrReq: [],
    sawpEmpLtrReci: [],
    sawpEmpUpload: [],
    createdBy: [],
    updatedBy: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [sawpEmpLtrReq, setSawpEmpLtrReq] = React.useState(
    initialValues.sawpEmpLtrReq
  );
  const [sawpEmpLtrReci, setSawpEmpLtrReci] = React.useState(
    initialValues.sawpEmpLtrReci
  );
  const [sawpEmpUpload, setSawpEmpUpload] = React.useState(
    initialValues.sawpEmpUpload
  );
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [updatedBy, setUpdatedBy] = React.useState(initialValues.updatedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setSawpEmpLtrReq(initialValues.sawpEmpLtrReq);
    setCurrentSawpEmpLtrReqValue("");
    setSawpEmpLtrReci(initialValues.sawpEmpLtrReci);
    setCurrentSawpEmpLtrReciValue("");
    setSawpEmpUpload(initialValues.sawpEmpUpload);
    setCurrentSawpEmpUploadValue("");
    setCreatedBy(initialValues.createdBy);
    setCurrentCreatedByValue("");
    setUpdatedBy(initialValues.updatedBy);
    setCurrentUpdatedByValue("");
    setErrors({});
  };
  const [currentSawpEmpLtrReqValue, setCurrentSawpEmpLtrReqValue] =
    React.useState("");
  const sawpEmpLtrReqRef = React.createRef();
  const [currentSawpEmpLtrReciValue, setCurrentSawpEmpLtrReciValue] =
    React.useState("");
  const sawpEmpLtrReciRef = React.createRef();
  const [currentSawpEmpUploadValue, setCurrentSawpEmpUploadValue] =
    React.useState("");
  const sawpEmpUploadRef = React.createRef();
  const [currentCreatedByValue, setCurrentCreatedByValue] = React.useState("");
  const createdByRef = React.createRef();
  const [currentUpdatedByValue, setCurrentUpdatedByValue] = React.useState("");
  const updatedByRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    sawpEmpLtrReq: [],
    sawpEmpLtrReci: [],
    sawpEmpUpload: [{ type: "JSON" }],
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
          sawpEmpLtrReq,
          sawpEmpLtrReci,
          sawpEmpUpload,
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
            query: createSawpDetails.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "SawpDetailsCreateForm")}
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
              sawpEmpLtrReq,
              sawpEmpLtrReci,
              sawpEmpUpload,
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
              sawpEmpLtrReq: values,
              sawpEmpLtrReci,
              sawpEmpUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.sawpEmpLtrReq ?? values;
          }
          setSawpEmpLtrReq(values);
          setCurrentSawpEmpLtrReqValue("");
        }}
        currentFieldValue={currentSawpEmpLtrReqValue}
        label={"Sawp emp ltr req"}
        items={sawpEmpLtrReq}
        hasError={errors?.sawpEmpLtrReq?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("sawpEmpLtrReq", currentSawpEmpLtrReqValue)
        }
        errorMessage={errors?.sawpEmpLtrReq?.errorMessage}
        setFieldValue={setCurrentSawpEmpLtrReqValue}
        inputFieldRef={sawpEmpLtrReqRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Sawp emp ltr req"
          isRequired={false}
          isReadOnly={false}
          value={currentSawpEmpLtrReqValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.sawpEmpLtrReq?.hasError) {
              runValidationTasks("sawpEmpLtrReq", value);
            }
            setCurrentSawpEmpLtrReqValue(value);
          }}
          onBlur={() =>
            runValidationTasks("sawpEmpLtrReq", currentSawpEmpLtrReqValue)
          }
          errorMessage={errors.sawpEmpLtrReq?.errorMessage}
          hasError={errors.sawpEmpLtrReq?.hasError}
          ref={sawpEmpLtrReqRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sawpEmpLtrReq")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              sawpEmpLtrReq,
              sawpEmpLtrReci: values,
              sawpEmpUpload,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.sawpEmpLtrReci ?? values;
          }
          setSawpEmpLtrReci(values);
          setCurrentSawpEmpLtrReciValue("");
        }}
        currentFieldValue={currentSawpEmpLtrReciValue}
        label={"Sawp emp ltr reci"}
        items={sawpEmpLtrReci}
        hasError={errors?.sawpEmpLtrReci?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("sawpEmpLtrReci", currentSawpEmpLtrReciValue)
        }
        errorMessage={errors?.sawpEmpLtrReci?.errorMessage}
        setFieldValue={setCurrentSawpEmpLtrReciValue}
        inputFieldRef={sawpEmpLtrReciRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Sawp emp ltr reci"
          isRequired={false}
          isReadOnly={false}
          value={currentSawpEmpLtrReciValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.sawpEmpLtrReci?.hasError) {
              runValidationTasks("sawpEmpLtrReci", value);
            }
            setCurrentSawpEmpLtrReciValue(value);
          }}
          onBlur={() =>
            runValidationTasks("sawpEmpLtrReci", currentSawpEmpLtrReciValue)
          }
          errorMessage={errors.sawpEmpLtrReci?.errorMessage}
          hasError={errors.sawpEmpLtrReci?.hasError}
          ref={sawpEmpLtrReciRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sawpEmpLtrReci")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              sawpEmpLtrReq,
              sawpEmpLtrReci,
              sawpEmpUpload: values,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.sawpEmpUpload ?? values;
          }
          setSawpEmpUpload(values);
          setCurrentSawpEmpUploadValue("");
        }}
        currentFieldValue={currentSawpEmpUploadValue}
        label={"Sawp emp upload"}
        items={sawpEmpUpload}
        hasError={errors?.sawpEmpUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("sawpEmpUpload", currentSawpEmpUploadValue)
        }
        errorMessage={errors?.sawpEmpUpload?.errorMessage}
        setFieldValue={setCurrentSawpEmpUploadValue}
        inputFieldRef={sawpEmpUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Sawp emp upload"
          isRequired={false}
          isReadOnly={false}
          value={currentSawpEmpUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.sawpEmpUpload?.hasError) {
              runValidationTasks("sawpEmpUpload", value);
            }
            setCurrentSawpEmpUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("sawpEmpUpload", currentSawpEmpUploadValue)
          }
          errorMessage={errors.sawpEmpUpload?.errorMessage}
          hasError={errors.sawpEmpUpload?.hasError}
          ref={sawpEmpUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sawpEmpUpload")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              sawpEmpLtrReq,
              sawpEmpLtrReci,
              sawpEmpUpload,
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
              sawpEmpLtrReq,
              sawpEmpLtrReci,
              sawpEmpUpload,
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
