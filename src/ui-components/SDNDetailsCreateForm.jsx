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
import { createSDNDetails } from "../graphql/mutations";
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
export default function SDNDetailsCreateForm(props) {
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
    doeEmpSubmit: [],
    doeEmpApproval: [],
    doeEmpValid: [],
    doeEmpRefNo: [],
    doeEmpUpload: [],
    permitType: [],
    nlmsEmpSubmit: [],
    nlmsEmpSubmitRefNo: [],
    nlmsEmpApproval: [],
    nlmsRefNo: [],
    nlmsEmpValid: [],
    nlmsEmpUpload: [],
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
  const [doeEmpSubmit, setDoeEmpSubmit] = React.useState(
    initialValues.doeEmpSubmit
  );
  const [doeEmpApproval, setDoeEmpApproval] = React.useState(
    initialValues.doeEmpApproval
  );
  const [doeEmpValid, setDoeEmpValid] = React.useState(
    initialValues.doeEmpValid
  );
  const [doeEmpRefNo, setDoeEmpRefNo] = React.useState(
    initialValues.doeEmpRefNo
  );
  const [doeEmpUpload, setDoeEmpUpload] = React.useState(
    initialValues.doeEmpUpload
  );
  const [permitType, setPermitType] = React.useState(initialValues.permitType);
  const [nlmsEmpSubmit, setNlmsEmpSubmit] = React.useState(
    initialValues.nlmsEmpSubmit
  );
  const [nlmsEmpSubmitRefNo, setNlmsEmpSubmitRefNo] = React.useState(
    initialValues.nlmsEmpSubmitRefNo
  );
  const [nlmsEmpApproval, setNlmsEmpApproval] = React.useState(
    initialValues.nlmsEmpApproval
  );
  const [nlmsRefNo, setNlmsRefNo] = React.useState(initialValues.nlmsRefNo);
  const [nlmsEmpValid, setNlmsEmpValid] = React.useState(
    initialValues.nlmsEmpValid
  );
  const [nlmsEmpUpload, setNlmsEmpUpload] = React.useState(
    initialValues.nlmsEmpUpload
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setSawpEmpLtrReq(initialValues.sawpEmpLtrReq);
    setCurrentSawpEmpLtrReqValue("");
    setSawpEmpLtrReci(initialValues.sawpEmpLtrReci);
    setCurrentSawpEmpLtrReciValue("");
    setSawpEmpUpload(initialValues.sawpEmpUpload);
    setCurrentSawpEmpUploadValue("");
    setDoeEmpSubmit(initialValues.doeEmpSubmit);
    setCurrentDoeEmpSubmitValue("");
    setDoeEmpApproval(initialValues.doeEmpApproval);
    setCurrentDoeEmpApprovalValue("");
    setDoeEmpValid(initialValues.doeEmpValid);
    setCurrentDoeEmpValidValue("");
    setDoeEmpRefNo(initialValues.doeEmpRefNo);
    setCurrentDoeEmpRefNoValue("");
    setDoeEmpUpload(initialValues.doeEmpUpload);
    setCurrentDoeEmpUploadValue("");
    setPermitType(initialValues.permitType);
    setCurrentPermitTypeValue("");
    setNlmsEmpSubmit(initialValues.nlmsEmpSubmit);
    setCurrentNlmsEmpSubmitValue("");
    setNlmsEmpSubmitRefNo(initialValues.nlmsEmpSubmitRefNo);
    setCurrentNlmsEmpSubmitRefNoValue("");
    setNlmsEmpApproval(initialValues.nlmsEmpApproval);
    setCurrentNlmsEmpApprovalValue("");
    setNlmsRefNo(initialValues.nlmsRefNo);
    setCurrentNlmsRefNoValue("");
    setNlmsEmpValid(initialValues.nlmsEmpValid);
    setCurrentNlmsEmpValidValue("");
    setNlmsEmpUpload(initialValues.nlmsEmpUpload);
    setCurrentNlmsEmpUploadValue("");
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
  const [currentDoeEmpSubmitValue, setCurrentDoeEmpSubmitValue] =
    React.useState("");
  const doeEmpSubmitRef = React.createRef();
  const [currentDoeEmpApprovalValue, setCurrentDoeEmpApprovalValue] =
    React.useState("");
  const doeEmpApprovalRef = React.createRef();
  const [currentDoeEmpValidValue, setCurrentDoeEmpValidValue] =
    React.useState("");
  const doeEmpValidRef = React.createRef();
  const [currentDoeEmpRefNoValue, setCurrentDoeEmpRefNoValue] =
    React.useState("");
  const doeEmpRefNoRef = React.createRef();
  const [currentDoeEmpUploadValue, setCurrentDoeEmpUploadValue] =
    React.useState("");
  const doeEmpUploadRef = React.createRef();
  const [currentPermitTypeValue, setCurrentPermitTypeValue] =
    React.useState("");
  const permitTypeRef = React.createRef();
  const [currentNlmsEmpSubmitValue, setCurrentNlmsEmpSubmitValue] =
    React.useState("");
  const nlmsEmpSubmitRef = React.createRef();
  const [currentNlmsEmpSubmitRefNoValue, setCurrentNlmsEmpSubmitRefNoValue] =
    React.useState("");
  const nlmsEmpSubmitRefNoRef = React.createRef();
  const [currentNlmsEmpApprovalValue, setCurrentNlmsEmpApprovalValue] =
    React.useState("");
  const nlmsEmpApprovalRef = React.createRef();
  const [currentNlmsRefNoValue, setCurrentNlmsRefNoValue] = React.useState("");
  const nlmsRefNoRef = React.createRef();
  const [currentNlmsEmpValidValue, setCurrentNlmsEmpValidValue] =
    React.useState("");
  const nlmsEmpValidRef = React.createRef();
  const [currentNlmsEmpUploadValue, setCurrentNlmsEmpUploadValue] =
    React.useState("");
  const nlmsEmpUploadRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    sawpEmpLtrReq: [],
    sawpEmpLtrReci: [],
    sawpEmpUpload: [],
    doeEmpSubmit: [],
    doeEmpApproval: [],
    doeEmpValid: [],
    doeEmpRefNo: [],
    doeEmpUpload: [],
    permitType: [],
    nlmsEmpSubmit: [],
    nlmsEmpSubmitRefNo: [],
    nlmsEmpApproval: [],
    nlmsRefNo: [],
    nlmsEmpValid: [],
    nlmsEmpUpload: [],
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
          doeEmpSubmit,
          doeEmpApproval,
          doeEmpValid,
          doeEmpRefNo,
          doeEmpUpload,
          permitType,
          nlmsEmpSubmit,
          nlmsEmpSubmitRefNo,
          nlmsEmpApproval,
          nlmsRefNo,
          nlmsEmpValid,
          nlmsEmpUpload,
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
            query: createSDNDetails.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "SDNDetailsCreateForm")}
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
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
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
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
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
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
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
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              sawpEmpLtrReq,
              sawpEmpLtrReci,
              sawpEmpUpload,
              doeEmpSubmit: values,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.doeEmpSubmit ?? values;
          }
          setDoeEmpSubmit(values);
          setCurrentDoeEmpSubmitValue("");
        }}
        currentFieldValue={currentDoeEmpSubmitValue}
        label={"Doe emp submit"}
        items={doeEmpSubmit}
        hasError={errors?.doeEmpSubmit?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("doeEmpSubmit", currentDoeEmpSubmitValue)
        }
        errorMessage={errors?.doeEmpSubmit?.errorMessage}
        setFieldValue={setCurrentDoeEmpSubmitValue}
        inputFieldRef={doeEmpSubmitRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Doe emp submit"
          isRequired={false}
          isReadOnly={false}
          value={currentDoeEmpSubmitValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.doeEmpSubmit?.hasError) {
              runValidationTasks("doeEmpSubmit", value);
            }
            setCurrentDoeEmpSubmitValue(value);
          }}
          onBlur={() =>
            runValidationTasks("doeEmpSubmit", currentDoeEmpSubmitValue)
          }
          errorMessage={errors.doeEmpSubmit?.errorMessage}
          hasError={errors.doeEmpSubmit?.hasError}
          ref={doeEmpSubmitRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "doeEmpSubmit")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval: values,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.doeEmpApproval ?? values;
          }
          setDoeEmpApproval(values);
          setCurrentDoeEmpApprovalValue("");
        }}
        currentFieldValue={currentDoeEmpApprovalValue}
        label={"Doe emp approval"}
        items={doeEmpApproval}
        hasError={errors?.doeEmpApproval?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("doeEmpApproval", currentDoeEmpApprovalValue)
        }
        errorMessage={errors?.doeEmpApproval?.errorMessage}
        setFieldValue={setCurrentDoeEmpApprovalValue}
        inputFieldRef={doeEmpApprovalRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Doe emp approval"
          isRequired={false}
          isReadOnly={false}
          value={currentDoeEmpApprovalValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.doeEmpApproval?.hasError) {
              runValidationTasks("doeEmpApproval", value);
            }
            setCurrentDoeEmpApprovalValue(value);
          }}
          onBlur={() =>
            runValidationTasks("doeEmpApproval", currentDoeEmpApprovalValue)
          }
          errorMessage={errors.doeEmpApproval?.errorMessage}
          hasError={errors.doeEmpApproval?.hasError}
          ref={doeEmpApprovalRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "doeEmpApproval")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid: values,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.doeEmpValid ?? values;
          }
          setDoeEmpValid(values);
          setCurrentDoeEmpValidValue("");
        }}
        currentFieldValue={currentDoeEmpValidValue}
        label={"Doe emp valid"}
        items={doeEmpValid}
        hasError={errors?.doeEmpValid?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("doeEmpValid", currentDoeEmpValidValue)
        }
        errorMessage={errors?.doeEmpValid?.errorMessage}
        setFieldValue={setCurrentDoeEmpValidValue}
        inputFieldRef={doeEmpValidRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Doe emp valid"
          isRequired={false}
          isReadOnly={false}
          value={currentDoeEmpValidValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.doeEmpValid?.hasError) {
              runValidationTasks("doeEmpValid", value);
            }
            setCurrentDoeEmpValidValue(value);
          }}
          onBlur={() =>
            runValidationTasks("doeEmpValid", currentDoeEmpValidValue)
          }
          errorMessage={errors.doeEmpValid?.errorMessage}
          hasError={errors.doeEmpValid?.hasError}
          ref={doeEmpValidRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "doeEmpValid")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo: values,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.doeEmpRefNo ?? values;
          }
          setDoeEmpRefNo(values);
          setCurrentDoeEmpRefNoValue("");
        }}
        currentFieldValue={currentDoeEmpRefNoValue}
        label={"Doe emp ref no"}
        items={doeEmpRefNo}
        hasError={errors?.doeEmpRefNo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("doeEmpRefNo", currentDoeEmpRefNoValue)
        }
        errorMessage={errors?.doeEmpRefNo?.errorMessage}
        setFieldValue={setCurrentDoeEmpRefNoValue}
        inputFieldRef={doeEmpRefNoRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Doe emp ref no"
          isRequired={false}
          isReadOnly={false}
          value={currentDoeEmpRefNoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.doeEmpRefNo?.hasError) {
              runValidationTasks("doeEmpRefNo", value);
            }
            setCurrentDoeEmpRefNoValue(value);
          }}
          onBlur={() =>
            runValidationTasks("doeEmpRefNo", currentDoeEmpRefNoValue)
          }
          errorMessage={errors.doeEmpRefNo?.errorMessage}
          hasError={errors.doeEmpRefNo?.hasError}
          ref={doeEmpRefNoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "doeEmpRefNo")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload: values,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.doeEmpUpload ?? values;
          }
          setDoeEmpUpload(values);
          setCurrentDoeEmpUploadValue("");
        }}
        currentFieldValue={currentDoeEmpUploadValue}
        label={"Doe emp upload"}
        items={doeEmpUpload}
        hasError={errors?.doeEmpUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("doeEmpUpload", currentDoeEmpUploadValue)
        }
        errorMessage={errors?.doeEmpUpload?.errorMessage}
        setFieldValue={setCurrentDoeEmpUploadValue}
        inputFieldRef={doeEmpUploadRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Doe emp upload"
          isRequired={false}
          isReadOnly={false}
          value={currentDoeEmpUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.doeEmpUpload?.hasError) {
              runValidationTasks("doeEmpUpload", value);
            }
            setCurrentDoeEmpUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("doeEmpUpload", currentDoeEmpUploadValue)
          }
          errorMessage={errors.doeEmpUpload?.errorMessage}
          hasError={errors.doeEmpUpload?.hasError}
          ref={doeEmpUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "doeEmpUpload")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType: values,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.permitType ?? values;
          }
          setPermitType(values);
          setCurrentPermitTypeValue("");
        }}
        currentFieldValue={currentPermitTypeValue}
        label={"Permit type"}
        items={permitType}
        hasError={errors?.permitType?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("permitType", currentPermitTypeValue)
        }
        errorMessage={errors?.permitType?.errorMessage}
        setFieldValue={setCurrentPermitTypeValue}
        inputFieldRef={permitTypeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Permit type"
          isRequired={false}
          isReadOnly={false}
          value={currentPermitTypeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.permitType?.hasError) {
              runValidationTasks("permitType", value);
            }
            setCurrentPermitTypeValue(value);
          }}
          onBlur={() =>
            runValidationTasks("permitType", currentPermitTypeValue)
          }
          errorMessage={errors.permitType?.errorMessage}
          hasError={errors.permitType?.hasError}
          ref={permitTypeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "permitType")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit: values,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.nlmsEmpSubmit ?? values;
          }
          setNlmsEmpSubmit(values);
          setCurrentNlmsEmpSubmitValue("");
        }}
        currentFieldValue={currentNlmsEmpSubmitValue}
        label={"Nlms emp submit"}
        items={nlmsEmpSubmit}
        hasError={errors?.nlmsEmpSubmit?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("nlmsEmpSubmit", currentNlmsEmpSubmitValue)
        }
        errorMessage={errors?.nlmsEmpSubmit?.errorMessage}
        setFieldValue={setCurrentNlmsEmpSubmitValue}
        inputFieldRef={nlmsEmpSubmitRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Nlms emp submit"
          isRequired={false}
          isReadOnly={false}
          value={currentNlmsEmpSubmitValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.nlmsEmpSubmit?.hasError) {
              runValidationTasks("nlmsEmpSubmit", value);
            }
            setCurrentNlmsEmpSubmitValue(value);
          }}
          onBlur={() =>
            runValidationTasks("nlmsEmpSubmit", currentNlmsEmpSubmitValue)
          }
          errorMessage={errors.nlmsEmpSubmit?.errorMessage}
          hasError={errors.nlmsEmpSubmit?.hasError}
          ref={nlmsEmpSubmitRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "nlmsEmpSubmit")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo: values,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.nlmsEmpSubmitRefNo ?? values;
          }
          setNlmsEmpSubmitRefNo(values);
          setCurrentNlmsEmpSubmitRefNoValue("");
        }}
        currentFieldValue={currentNlmsEmpSubmitRefNoValue}
        label={"Nlms emp submit ref no"}
        items={nlmsEmpSubmitRefNo}
        hasError={errors?.nlmsEmpSubmitRefNo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "nlmsEmpSubmitRefNo",
            currentNlmsEmpSubmitRefNoValue
          )
        }
        errorMessage={errors?.nlmsEmpSubmitRefNo?.errorMessage}
        setFieldValue={setCurrentNlmsEmpSubmitRefNoValue}
        inputFieldRef={nlmsEmpSubmitRefNoRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Nlms emp submit ref no"
          isRequired={false}
          isReadOnly={false}
          value={currentNlmsEmpSubmitRefNoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.nlmsEmpSubmitRefNo?.hasError) {
              runValidationTasks("nlmsEmpSubmitRefNo", value);
            }
            setCurrentNlmsEmpSubmitRefNoValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "nlmsEmpSubmitRefNo",
              currentNlmsEmpSubmitRefNoValue
            )
          }
          errorMessage={errors.nlmsEmpSubmitRefNo?.errorMessage}
          hasError={errors.nlmsEmpSubmitRefNo?.hasError}
          ref={nlmsEmpSubmitRefNoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "nlmsEmpSubmitRefNo")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval: values,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.nlmsEmpApproval ?? values;
          }
          setNlmsEmpApproval(values);
          setCurrentNlmsEmpApprovalValue("");
        }}
        currentFieldValue={currentNlmsEmpApprovalValue}
        label={"Nlms emp approval"}
        items={nlmsEmpApproval}
        hasError={errors?.nlmsEmpApproval?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "nlmsEmpApproval",
            currentNlmsEmpApprovalValue
          )
        }
        errorMessage={errors?.nlmsEmpApproval?.errorMessage}
        setFieldValue={setCurrentNlmsEmpApprovalValue}
        inputFieldRef={nlmsEmpApprovalRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Nlms emp approval"
          isRequired={false}
          isReadOnly={false}
          value={currentNlmsEmpApprovalValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.nlmsEmpApproval?.hasError) {
              runValidationTasks("nlmsEmpApproval", value);
            }
            setCurrentNlmsEmpApprovalValue(value);
          }}
          onBlur={() =>
            runValidationTasks("nlmsEmpApproval", currentNlmsEmpApprovalValue)
          }
          errorMessage={errors.nlmsEmpApproval?.errorMessage}
          hasError={errors.nlmsEmpApproval?.hasError}
          ref={nlmsEmpApprovalRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "nlmsEmpApproval")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo: values,
              nlmsEmpValid,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.nlmsRefNo ?? values;
          }
          setNlmsRefNo(values);
          setCurrentNlmsRefNoValue("");
        }}
        currentFieldValue={currentNlmsRefNoValue}
        label={"Nlms ref no"}
        items={nlmsRefNo}
        hasError={errors?.nlmsRefNo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("nlmsRefNo", currentNlmsRefNoValue)
        }
        errorMessage={errors?.nlmsRefNo?.errorMessage}
        setFieldValue={setCurrentNlmsRefNoValue}
        inputFieldRef={nlmsRefNoRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Nlms ref no"
          isRequired={false}
          isReadOnly={false}
          value={currentNlmsRefNoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.nlmsRefNo?.hasError) {
              runValidationTasks("nlmsRefNo", value);
            }
            setCurrentNlmsRefNoValue(value);
          }}
          onBlur={() => runValidationTasks("nlmsRefNo", currentNlmsRefNoValue)}
          errorMessage={errors.nlmsRefNo?.errorMessage}
          hasError={errors.nlmsRefNo?.hasError}
          ref={nlmsRefNoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "nlmsRefNo")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid: values,
              nlmsEmpUpload,
            };
            const result = onChange(modelFields);
            values = result?.nlmsEmpValid ?? values;
          }
          setNlmsEmpValid(values);
          setCurrentNlmsEmpValidValue("");
        }}
        currentFieldValue={currentNlmsEmpValidValue}
        label={"Nlms emp valid"}
        items={nlmsEmpValid}
        hasError={errors?.nlmsEmpValid?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("nlmsEmpValid", currentNlmsEmpValidValue)
        }
        errorMessage={errors?.nlmsEmpValid?.errorMessage}
        setFieldValue={setCurrentNlmsEmpValidValue}
        inputFieldRef={nlmsEmpValidRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Nlms emp valid"
          isRequired={false}
          isReadOnly={false}
          value={currentNlmsEmpValidValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.nlmsEmpValid?.hasError) {
              runValidationTasks("nlmsEmpValid", value);
            }
            setCurrentNlmsEmpValidValue(value);
          }}
          onBlur={() =>
            runValidationTasks("nlmsEmpValid", currentNlmsEmpValidValue)
          }
          errorMessage={errors.nlmsEmpValid?.errorMessage}
          hasError={errors.nlmsEmpValid?.hasError}
          ref={nlmsEmpValidRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "nlmsEmpValid")}
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
              sawpEmpUpload,
              doeEmpSubmit,
              doeEmpApproval,
              doeEmpValid,
              doeEmpRefNo,
              doeEmpUpload,
              permitType,
              nlmsEmpSubmit,
              nlmsEmpSubmitRefNo,
              nlmsEmpApproval,
              nlmsRefNo,
              nlmsEmpValid,
              nlmsEmpUpload: values,
            };
            const result = onChange(modelFields);
            values = result?.nlmsEmpUpload ?? values;
          }
          setNlmsEmpUpload(values);
          setCurrentNlmsEmpUploadValue("");
        }}
        currentFieldValue={currentNlmsEmpUploadValue}
        label={"Nlms emp upload"}
        items={nlmsEmpUpload}
        hasError={errors?.nlmsEmpUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("nlmsEmpUpload", currentNlmsEmpUploadValue)
        }
        errorMessage={errors?.nlmsEmpUpload?.errorMessage}
        setFieldValue={setCurrentNlmsEmpUploadValue}
        inputFieldRef={nlmsEmpUploadRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Nlms emp upload"
          isRequired={false}
          isReadOnly={false}
          value={currentNlmsEmpUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.nlmsEmpUpload?.hasError) {
              runValidationTasks("nlmsEmpUpload", value);
            }
            setCurrentNlmsEmpUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("nlmsEmpUpload", currentNlmsEmpUploadValue)
          }
          errorMessage={errors.nlmsEmpUpload?.errorMessage}
          hasError={errors.nlmsEmpUpload?.hasError}
          ref={nlmsEmpUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "nlmsEmpUpload")}
        ></TextField>
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
