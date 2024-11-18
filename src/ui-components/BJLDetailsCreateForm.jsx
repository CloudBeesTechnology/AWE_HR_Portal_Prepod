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
import { createBJLDetails } from "../graphql/mutations";
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
export default function BJLDetailsCreateForm(props) {
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
    bankSubmit: [],
    bankRece: [],
    bankRefNo: [],
    bankAmt: [],
    bankValid: [],
    bankEndorse: [],
    bankEmpUpload: [],
    tbaPurchase: [],
    jitpaAmt: [],
    jpValid: [],
    jpEndorse: [],
    jpEmpUpload: [],
    lbrReceiptNo: [],
    lbrDepoAmt: [],
    lbrDepoSubmit: [],
    lbrDepoUpload: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [bankSubmit, setBankSubmit] = React.useState(initialValues.bankSubmit);
  const [bankRece, setBankRece] = React.useState(initialValues.bankRece);
  const [bankRefNo, setBankRefNo] = React.useState(initialValues.bankRefNo);
  const [bankAmt, setBankAmt] = React.useState(initialValues.bankAmt);
  const [bankValid, setBankValid] = React.useState(initialValues.bankValid);
  const [bankEndorse, setBankEndorse] = React.useState(
    initialValues.bankEndorse
  );
  const [bankEmpUpload, setBankEmpUpload] = React.useState(
    initialValues.bankEmpUpload
  );
  const [tbaPurchase, setTbaPurchase] = React.useState(
    initialValues.tbaPurchase
  );
  const [jitpaAmt, setJitpaAmt] = React.useState(initialValues.jitpaAmt);
  const [jpValid, setJpValid] = React.useState(initialValues.jpValid);
  const [jpEndorse, setJpEndorse] = React.useState(initialValues.jpEndorse);
  const [jpEmpUpload, setJpEmpUpload] = React.useState(
    initialValues.jpEmpUpload
  );
  const [lbrReceiptNo, setLbrReceiptNo] = React.useState(
    initialValues.lbrReceiptNo
  );
  const [lbrDepoAmt, setLbrDepoAmt] = React.useState(initialValues.lbrDepoAmt);
  const [lbrDepoSubmit, setLbrDepoSubmit] = React.useState(
    initialValues.lbrDepoSubmit
  );
  const [lbrDepoUpload, setLbrDepoUpload] = React.useState(
    initialValues.lbrDepoUpload
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setBankSubmit(initialValues.bankSubmit);
    setCurrentBankSubmitValue("");
    setBankRece(initialValues.bankRece);
    setCurrentBankReceValue("");
    setBankRefNo(initialValues.bankRefNo);
    setCurrentBankRefNoValue("");
    setBankAmt(initialValues.bankAmt);
    setCurrentBankAmtValue("");
    setBankValid(initialValues.bankValid);
    setCurrentBankValidValue("");
    setBankEndorse(initialValues.bankEndorse);
    setCurrentBankEndorseValue("");
    setBankEmpUpload(initialValues.bankEmpUpload);
    setCurrentBankEmpUploadValue("");
    setTbaPurchase(initialValues.tbaPurchase);
    setCurrentTbaPurchaseValue("");
    setJitpaAmt(initialValues.jitpaAmt);
    setCurrentJitpaAmtValue("");
    setJpValid(initialValues.jpValid);
    setCurrentJpValidValue("");
    setJpEndorse(initialValues.jpEndorse);
    setCurrentJpEndorseValue("");
    setJpEmpUpload(initialValues.jpEmpUpload);
    setCurrentJpEmpUploadValue("");
    setLbrReceiptNo(initialValues.lbrReceiptNo);
    setCurrentLbrReceiptNoValue("");
    setLbrDepoAmt(initialValues.lbrDepoAmt);
    setCurrentLbrDepoAmtValue("");
    setLbrDepoSubmit(initialValues.lbrDepoSubmit);
    setCurrentLbrDepoSubmitValue("");
    setLbrDepoUpload(initialValues.lbrDepoUpload);
    setCurrentLbrDepoUploadValue("");
    setErrors({});
  };
  const [currentBankSubmitValue, setCurrentBankSubmitValue] =
    React.useState("");
  const bankSubmitRef = React.createRef();
  const [currentBankReceValue, setCurrentBankReceValue] = React.useState("");
  const bankReceRef = React.createRef();
  const [currentBankRefNoValue, setCurrentBankRefNoValue] = React.useState("");
  const bankRefNoRef = React.createRef();
  const [currentBankAmtValue, setCurrentBankAmtValue] = React.useState("");
  const bankAmtRef = React.createRef();
  const [currentBankValidValue, setCurrentBankValidValue] = React.useState("");
  const bankValidRef = React.createRef();
  const [currentBankEndorseValue, setCurrentBankEndorseValue] =
    React.useState("");
  const bankEndorseRef = React.createRef();
  const [currentBankEmpUploadValue, setCurrentBankEmpUploadValue] =
    React.useState("");
  const bankEmpUploadRef = React.createRef();
  const [currentTbaPurchaseValue, setCurrentTbaPurchaseValue] =
    React.useState("");
  const tbaPurchaseRef = React.createRef();
  const [currentJitpaAmtValue, setCurrentJitpaAmtValue] = React.useState("");
  const jitpaAmtRef = React.createRef();
  const [currentJpValidValue, setCurrentJpValidValue] = React.useState("");
  const jpValidRef = React.createRef();
  const [currentJpEndorseValue, setCurrentJpEndorseValue] = React.useState("");
  const jpEndorseRef = React.createRef();
  const [currentJpEmpUploadValue, setCurrentJpEmpUploadValue] =
    React.useState("");
  const jpEmpUploadRef = React.createRef();
  const [currentLbrReceiptNoValue, setCurrentLbrReceiptNoValue] =
    React.useState("");
  const lbrReceiptNoRef = React.createRef();
  const [currentLbrDepoAmtValue, setCurrentLbrDepoAmtValue] =
    React.useState("");
  const lbrDepoAmtRef = React.createRef();
  const [currentLbrDepoSubmitValue, setCurrentLbrDepoSubmitValue] =
    React.useState("");
  const lbrDepoSubmitRef = React.createRef();
  const [currentLbrDepoUploadValue, setCurrentLbrDepoUploadValue] =
    React.useState("");
  const lbrDepoUploadRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    bankSubmit: [],
    bankRece: [],
    bankRefNo: [],
    bankAmt: [],
    bankValid: [],
    bankEndorse: [],
    bankEmpUpload: [],
    tbaPurchase: [],
    jitpaAmt: [],
    jpValid: [],
    jpEndorse: [],
    jpEmpUpload: [],
    lbrReceiptNo: [],
    lbrDepoAmt: [],
    lbrDepoSubmit: [],
    lbrDepoUpload: [],
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
          bankSubmit,
          bankRece,
          bankRefNo,
          bankAmt,
          bankValid,
          bankEndorse,
          bankEmpUpload,
          tbaPurchase,
          jitpaAmt,
          jpValid,
          jpEndorse,
          jpEmpUpload,
          lbrReceiptNo,
          lbrDepoAmt,
          lbrDepoSubmit,
          lbrDepoUpload,
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
            query: createBJLDetails.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "BJLDetailsCreateForm")}
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
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
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
              bankSubmit: values,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.bankSubmit ?? values;
          }
          setBankSubmit(values);
          setCurrentBankSubmitValue("");
        }}
        currentFieldValue={currentBankSubmitValue}
        label={"Bank submit"}
        items={bankSubmit}
        hasError={errors?.bankSubmit?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bankSubmit", currentBankSubmitValue)
        }
        errorMessage={errors?.bankSubmit?.errorMessage}
        setFieldValue={setCurrentBankSubmitValue}
        inputFieldRef={bankSubmitRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bank submit"
          isRequired={false}
          isReadOnly={false}
          value={currentBankSubmitValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bankSubmit?.hasError) {
              runValidationTasks("bankSubmit", value);
            }
            setCurrentBankSubmitValue(value);
          }}
          onBlur={() =>
            runValidationTasks("bankSubmit", currentBankSubmitValue)
          }
          errorMessage={errors.bankSubmit?.errorMessage}
          hasError={errors.bankSubmit?.hasError}
          ref={bankSubmitRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bankSubmit")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece: values,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.bankRece ?? values;
          }
          setBankRece(values);
          setCurrentBankReceValue("");
        }}
        currentFieldValue={currentBankReceValue}
        label={"Bank rece"}
        items={bankRece}
        hasError={errors?.bankRece?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bankRece", currentBankReceValue)
        }
        errorMessage={errors?.bankRece?.errorMessage}
        setFieldValue={setCurrentBankReceValue}
        inputFieldRef={bankReceRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bank rece"
          isRequired={false}
          isReadOnly={false}
          value={currentBankReceValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bankRece?.hasError) {
              runValidationTasks("bankRece", value);
            }
            setCurrentBankReceValue(value);
          }}
          onBlur={() => runValidationTasks("bankRece", currentBankReceValue)}
          errorMessage={errors.bankRece?.errorMessage}
          hasError={errors.bankRece?.hasError}
          ref={bankReceRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bankRece")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo: values,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.bankRefNo ?? values;
          }
          setBankRefNo(values);
          setCurrentBankRefNoValue("");
        }}
        currentFieldValue={currentBankRefNoValue}
        label={"Bank ref no"}
        items={bankRefNo}
        hasError={errors?.bankRefNo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bankRefNo", currentBankRefNoValue)
        }
        errorMessage={errors?.bankRefNo?.errorMessage}
        setFieldValue={setCurrentBankRefNoValue}
        inputFieldRef={bankRefNoRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bank ref no"
          isRequired={false}
          isReadOnly={false}
          value={currentBankRefNoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bankRefNo?.hasError) {
              runValidationTasks("bankRefNo", value);
            }
            setCurrentBankRefNoValue(value);
          }}
          onBlur={() => runValidationTasks("bankRefNo", currentBankRefNoValue)}
          errorMessage={errors.bankRefNo?.errorMessage}
          hasError={errors.bankRefNo?.hasError}
          ref={bankRefNoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bankRefNo")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt: values,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.bankAmt ?? values;
          }
          setBankAmt(values);
          setCurrentBankAmtValue("");
        }}
        currentFieldValue={currentBankAmtValue}
        label={"Bank amt"}
        items={bankAmt}
        hasError={errors?.bankAmt?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bankAmt", currentBankAmtValue)
        }
        errorMessage={errors?.bankAmt?.errorMessage}
        setFieldValue={setCurrentBankAmtValue}
        inputFieldRef={bankAmtRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bank amt"
          isRequired={false}
          isReadOnly={false}
          value={currentBankAmtValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bankAmt?.hasError) {
              runValidationTasks("bankAmt", value);
            }
            setCurrentBankAmtValue(value);
          }}
          onBlur={() => runValidationTasks("bankAmt", currentBankAmtValue)}
          errorMessage={errors.bankAmt?.errorMessage}
          hasError={errors.bankAmt?.hasError}
          ref={bankAmtRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bankAmt")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid: values,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.bankValid ?? values;
          }
          setBankValid(values);
          setCurrentBankValidValue("");
        }}
        currentFieldValue={currentBankValidValue}
        label={"Bank valid"}
        items={bankValid}
        hasError={errors?.bankValid?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bankValid", currentBankValidValue)
        }
        errorMessage={errors?.bankValid?.errorMessage}
        setFieldValue={setCurrentBankValidValue}
        inputFieldRef={bankValidRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bank valid"
          isRequired={false}
          isReadOnly={false}
          value={currentBankValidValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bankValid?.hasError) {
              runValidationTasks("bankValid", value);
            }
            setCurrentBankValidValue(value);
          }}
          onBlur={() => runValidationTasks("bankValid", currentBankValidValue)}
          errorMessage={errors.bankValid?.errorMessage}
          hasError={errors.bankValid?.hasError}
          ref={bankValidRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bankValid")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse: values,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.bankEndorse ?? values;
          }
          setBankEndorse(values);
          setCurrentBankEndorseValue("");
        }}
        currentFieldValue={currentBankEndorseValue}
        label={"Bank endorse"}
        items={bankEndorse}
        hasError={errors?.bankEndorse?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bankEndorse", currentBankEndorseValue)
        }
        errorMessage={errors?.bankEndorse?.errorMessage}
        setFieldValue={setCurrentBankEndorseValue}
        inputFieldRef={bankEndorseRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bank endorse"
          isRequired={false}
          isReadOnly={false}
          value={currentBankEndorseValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bankEndorse?.hasError) {
              runValidationTasks("bankEndorse", value);
            }
            setCurrentBankEndorseValue(value);
          }}
          onBlur={() =>
            runValidationTasks("bankEndorse", currentBankEndorseValue)
          }
          errorMessage={errors.bankEndorse?.errorMessage}
          hasError={errors.bankEndorse?.hasError}
          ref={bankEndorseRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bankEndorse")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload: values,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.bankEmpUpload ?? values;
          }
          setBankEmpUpload(values);
          setCurrentBankEmpUploadValue("");
        }}
        currentFieldValue={currentBankEmpUploadValue}
        label={"Bank emp upload"}
        items={bankEmpUpload}
        hasError={errors?.bankEmpUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bankEmpUpload", currentBankEmpUploadValue)
        }
        errorMessage={errors?.bankEmpUpload?.errorMessage}
        setFieldValue={setCurrentBankEmpUploadValue}
        inputFieldRef={bankEmpUploadRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bank emp upload"
          isRequired={false}
          isReadOnly={false}
          value={currentBankEmpUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bankEmpUpload?.hasError) {
              runValidationTasks("bankEmpUpload", value);
            }
            setCurrentBankEmpUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("bankEmpUpload", currentBankEmpUploadValue)
          }
          errorMessage={errors.bankEmpUpload?.errorMessage}
          hasError={errors.bankEmpUpload?.hasError}
          ref={bankEmpUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bankEmpUpload")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase: values,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.tbaPurchase ?? values;
          }
          setTbaPurchase(values);
          setCurrentTbaPurchaseValue("");
        }}
        currentFieldValue={currentTbaPurchaseValue}
        label={"Tba purchase"}
        items={tbaPurchase}
        hasError={errors?.tbaPurchase?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("tbaPurchase", currentTbaPurchaseValue)
        }
        errorMessage={errors?.tbaPurchase?.errorMessage}
        setFieldValue={setCurrentTbaPurchaseValue}
        inputFieldRef={tbaPurchaseRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Tba purchase"
          isRequired={false}
          isReadOnly={false}
          value={currentTbaPurchaseValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tbaPurchase?.hasError) {
              runValidationTasks("tbaPurchase", value);
            }
            setCurrentTbaPurchaseValue(value);
          }}
          onBlur={() =>
            runValidationTasks("tbaPurchase", currentTbaPurchaseValue)
          }
          errorMessage={errors.tbaPurchase?.errorMessage}
          hasError={errors.tbaPurchase?.hasError}
          ref={tbaPurchaseRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "tbaPurchase")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt: values,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.jitpaAmt ?? values;
          }
          setJitpaAmt(values);
          setCurrentJitpaAmtValue("");
        }}
        currentFieldValue={currentJitpaAmtValue}
        label={"Jitpa amt"}
        items={jitpaAmt}
        hasError={errors?.jitpaAmt?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("jitpaAmt", currentJitpaAmtValue)
        }
        errorMessage={errors?.jitpaAmt?.errorMessage}
        setFieldValue={setCurrentJitpaAmtValue}
        inputFieldRef={jitpaAmtRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Jitpa amt"
          isRequired={false}
          isReadOnly={false}
          value={currentJitpaAmtValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.jitpaAmt?.hasError) {
              runValidationTasks("jitpaAmt", value);
            }
            setCurrentJitpaAmtValue(value);
          }}
          onBlur={() => runValidationTasks("jitpaAmt", currentJitpaAmtValue)}
          errorMessage={errors.jitpaAmt?.errorMessage}
          hasError={errors.jitpaAmt?.hasError}
          ref={jitpaAmtRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "jitpaAmt")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid: values,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.jpValid ?? values;
          }
          setJpValid(values);
          setCurrentJpValidValue("");
        }}
        currentFieldValue={currentJpValidValue}
        label={"Jp valid"}
        items={jpValid}
        hasError={errors?.jpValid?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("jpValid", currentJpValidValue)
        }
        errorMessage={errors?.jpValid?.errorMessage}
        setFieldValue={setCurrentJpValidValue}
        inputFieldRef={jpValidRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Jp valid"
          isRequired={false}
          isReadOnly={false}
          value={currentJpValidValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.jpValid?.hasError) {
              runValidationTasks("jpValid", value);
            }
            setCurrentJpValidValue(value);
          }}
          onBlur={() => runValidationTasks("jpValid", currentJpValidValue)}
          errorMessage={errors.jpValid?.errorMessage}
          hasError={errors.jpValid?.hasError}
          ref={jpValidRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "jpValid")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse: values,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.jpEndorse ?? values;
          }
          setJpEndorse(values);
          setCurrentJpEndorseValue("");
        }}
        currentFieldValue={currentJpEndorseValue}
        label={"Jp endorse"}
        items={jpEndorse}
        hasError={errors?.jpEndorse?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("jpEndorse", currentJpEndorseValue)
        }
        errorMessage={errors?.jpEndorse?.errorMessage}
        setFieldValue={setCurrentJpEndorseValue}
        inputFieldRef={jpEndorseRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Jp endorse"
          isRequired={false}
          isReadOnly={false}
          value={currentJpEndorseValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.jpEndorse?.hasError) {
              runValidationTasks("jpEndorse", value);
            }
            setCurrentJpEndorseValue(value);
          }}
          onBlur={() => runValidationTasks("jpEndorse", currentJpEndorseValue)}
          errorMessage={errors.jpEndorse?.errorMessage}
          hasError={errors.jpEndorse?.hasError}
          ref={jpEndorseRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "jpEndorse")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload: values,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.jpEmpUpload ?? values;
          }
          setJpEmpUpload(values);
          setCurrentJpEmpUploadValue("");
        }}
        currentFieldValue={currentJpEmpUploadValue}
        label={"Jp emp upload"}
        items={jpEmpUpload}
        hasError={errors?.jpEmpUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("jpEmpUpload", currentJpEmpUploadValue)
        }
        errorMessage={errors?.jpEmpUpload?.errorMessage}
        setFieldValue={setCurrentJpEmpUploadValue}
        inputFieldRef={jpEmpUploadRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Jp emp upload"
          isRequired={false}
          isReadOnly={false}
          value={currentJpEmpUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.jpEmpUpload?.hasError) {
              runValidationTasks("jpEmpUpload", value);
            }
            setCurrentJpEmpUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("jpEmpUpload", currentJpEmpUploadValue)
          }
          errorMessage={errors.jpEmpUpload?.errorMessage}
          hasError={errors.jpEmpUpload?.hasError}
          ref={jpEmpUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "jpEmpUpload")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo: values,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.lbrReceiptNo ?? values;
          }
          setLbrReceiptNo(values);
          setCurrentLbrReceiptNoValue("");
        }}
        currentFieldValue={currentLbrReceiptNoValue}
        label={"Lbr receipt no"}
        items={lbrReceiptNo}
        hasError={errors?.lbrReceiptNo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("lbrReceiptNo", currentLbrReceiptNoValue)
        }
        errorMessage={errors?.lbrReceiptNo?.errorMessage}
        setFieldValue={setCurrentLbrReceiptNoValue}
        inputFieldRef={lbrReceiptNoRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Lbr receipt no"
          isRequired={false}
          isReadOnly={false}
          value={currentLbrReceiptNoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lbrReceiptNo?.hasError) {
              runValidationTasks("lbrReceiptNo", value);
            }
            setCurrentLbrReceiptNoValue(value);
          }}
          onBlur={() =>
            runValidationTasks("lbrReceiptNo", currentLbrReceiptNoValue)
          }
          errorMessage={errors.lbrReceiptNo?.errorMessage}
          hasError={errors.lbrReceiptNo?.hasError}
          ref={lbrReceiptNoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "lbrReceiptNo")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt: values,
              lbrDepoSubmit,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.lbrDepoAmt ?? values;
          }
          setLbrDepoAmt(values);
          setCurrentLbrDepoAmtValue("");
        }}
        currentFieldValue={currentLbrDepoAmtValue}
        label={"Lbr depo amt"}
        items={lbrDepoAmt}
        hasError={errors?.lbrDepoAmt?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("lbrDepoAmt", currentLbrDepoAmtValue)
        }
        errorMessage={errors?.lbrDepoAmt?.errorMessage}
        setFieldValue={setCurrentLbrDepoAmtValue}
        inputFieldRef={lbrDepoAmtRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Lbr depo amt"
          isRequired={false}
          isReadOnly={false}
          value={currentLbrDepoAmtValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lbrDepoAmt?.hasError) {
              runValidationTasks("lbrDepoAmt", value);
            }
            setCurrentLbrDepoAmtValue(value);
          }}
          onBlur={() =>
            runValidationTasks("lbrDepoAmt", currentLbrDepoAmtValue)
          }
          errorMessage={errors.lbrDepoAmt?.errorMessage}
          hasError={errors.lbrDepoAmt?.hasError}
          ref={lbrDepoAmtRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "lbrDepoAmt")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit: values,
              lbrDepoUpload,
            };
            const result = onChange(modelFields);
            values = result?.lbrDepoSubmit ?? values;
          }
          setLbrDepoSubmit(values);
          setCurrentLbrDepoSubmitValue("");
        }}
        currentFieldValue={currentLbrDepoSubmitValue}
        label={"Lbr depo submit"}
        items={lbrDepoSubmit}
        hasError={errors?.lbrDepoSubmit?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("lbrDepoSubmit", currentLbrDepoSubmitValue)
        }
        errorMessage={errors?.lbrDepoSubmit?.errorMessage}
        setFieldValue={setCurrentLbrDepoSubmitValue}
        inputFieldRef={lbrDepoSubmitRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Lbr depo submit"
          isRequired={false}
          isReadOnly={false}
          value={currentLbrDepoSubmitValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lbrDepoSubmit?.hasError) {
              runValidationTasks("lbrDepoSubmit", value);
            }
            setCurrentLbrDepoSubmitValue(value);
          }}
          onBlur={() =>
            runValidationTasks("lbrDepoSubmit", currentLbrDepoSubmitValue)
          }
          errorMessage={errors.lbrDepoSubmit?.errorMessage}
          hasError={errors.lbrDepoSubmit?.hasError}
          ref={lbrDepoSubmitRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "lbrDepoSubmit")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              bankSubmit,
              bankRece,
              bankRefNo,
              bankAmt,
              bankValid,
              bankEndorse,
              bankEmpUpload,
              tbaPurchase,
              jitpaAmt,
              jpValid,
              jpEndorse,
              jpEmpUpload,
              lbrReceiptNo,
              lbrDepoAmt,
              lbrDepoSubmit,
              lbrDepoUpload: values,
            };
            const result = onChange(modelFields);
            values = result?.lbrDepoUpload ?? values;
          }
          setLbrDepoUpload(values);
          setCurrentLbrDepoUploadValue("");
        }}
        currentFieldValue={currentLbrDepoUploadValue}
        label={"Lbr depo upload"}
        items={lbrDepoUpload}
        hasError={errors?.lbrDepoUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("lbrDepoUpload", currentLbrDepoUploadValue)
        }
        errorMessage={errors?.lbrDepoUpload?.errorMessage}
        setFieldValue={setCurrentLbrDepoUploadValue}
        inputFieldRef={lbrDepoUploadRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Lbr depo upload"
          isRequired={false}
          isReadOnly={false}
          value={currentLbrDepoUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lbrDepoUpload?.hasError) {
              runValidationTasks("lbrDepoUpload", value);
            }
            setCurrentLbrDepoUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("lbrDepoUpload", currentLbrDepoUploadValue)
          }
          errorMessage={errors.lbrDepoUpload?.errorMessage}
          hasError={errors.lbrDepoUpload?.hasError}
          ref={lbrDepoUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "lbrDepoUpload")}
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
