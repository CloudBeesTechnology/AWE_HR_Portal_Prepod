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
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getSawpDetails } from "../graphql/queries";
import { updateSawpDetails } from "../graphql/mutations";
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
export default function SawpDetailsUpdateForm(props) {
  const {
    id: idProp,
    sawpDetails: sawpDetailsModelProp,
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
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = sawpDetailsRecord
      ? { ...initialValues, ...sawpDetailsRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setSawpEmpLtrReq(cleanValues.sawpEmpLtrReq ?? []);
    setCurrentSawpEmpLtrReqValue("");
    setSawpEmpLtrReci(cleanValues.sawpEmpLtrReci ?? []);
    setCurrentSawpEmpLtrReciValue("");
    setSawpEmpUpload(cleanValues.sawpEmpUpload ?? []);
    setCurrentSawpEmpUploadValue("");
    setErrors({});
  };
  const [sawpDetailsRecord, setSawpDetailsRecord] =
    React.useState(sawpDetailsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSawpDetails.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSawpDetails
        : sawpDetailsModelProp;
      setSawpDetailsRecord(record);
    };
    queryData();
  }, [idProp, sawpDetailsModelProp]);
  React.useEffect(resetStateValues, [sawpDetailsRecord]);
  const [currentSawpEmpLtrReqValue, setCurrentSawpEmpLtrReqValue] =
    React.useState("");
  const sawpEmpLtrReqRef = React.createRef();
  const [currentSawpEmpLtrReciValue, setCurrentSawpEmpLtrReciValue] =
    React.useState("");
  const sawpEmpLtrReciRef = React.createRef();
  const [currentSawpEmpUploadValue, setCurrentSawpEmpUploadValue] =
    React.useState("");
  const sawpEmpUploadRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    sawpEmpLtrReq: [],
    sawpEmpLtrReci: [],
    sawpEmpUpload: [],
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
          sawpEmpLtrReq: sawpEmpLtrReq ?? null,
          sawpEmpLtrReci: sawpEmpLtrReci ?? null,
          sawpEmpUpload: sawpEmpUpload ?? null,
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
            query: updateSawpDetails.replaceAll("__typename", ""),
            variables: {
              input: {
                id: sawpDetailsRecord.id,
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
      {...getOverrideProps(overrides, "SawpDetailsUpdateForm")}
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
        <TextField
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
        ></TextField>
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
          isDisabled={!(idProp || sawpDetailsModelProp)}
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
              !(idProp || sawpDetailsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
