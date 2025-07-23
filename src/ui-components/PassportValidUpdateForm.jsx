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
import { getPassportValid } from "../graphql/queries";
import { updatePassportValid } from "../graphql/mutations";
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
export default function PassportValidUpdateForm(props) {
  const {
    id: idProp,
    passportValid: passportValidModelProp,
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
    ppLocation: [],
    arrivStampUpload: [],
    immigEmpUpload: [],
    reEntryUpload: [],
    arrivStampExp: [],
    immigRefNo: "",
    ppSubmit: [],
    empPassExp: [],
    empPassStatus: [],
    airTktStatus: [],
    reEntryVisa: [],
    immigApproval: [],
    reEntryVisaExp: [],
    remarkImmig: [],
    createdBy: [],
    updatedBy: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [ppLocation, setPpLocation] = React.useState(initialValues.ppLocation);
  const [arrivStampUpload, setArrivStampUpload] = React.useState(
    initialValues.arrivStampUpload
  );
  const [immigEmpUpload, setImmigEmpUpload] = React.useState(
    initialValues.immigEmpUpload
  );
  const [reEntryUpload, setReEntryUpload] = React.useState(
    initialValues.reEntryUpload
  );
  const [arrivStampExp, setArrivStampExp] = React.useState(
    initialValues.arrivStampExp
  );
  const [immigRefNo, setImmigRefNo] = React.useState(initialValues.immigRefNo);
  const [ppSubmit, setPpSubmit] = React.useState(initialValues.ppSubmit);
  const [empPassExp, setEmpPassExp] = React.useState(initialValues.empPassExp);
  const [empPassStatus, setEmpPassStatus] = React.useState(
    initialValues.empPassStatus
  );
  const [airTktStatus, setAirTktStatus] = React.useState(
    initialValues.airTktStatus
  );
  const [reEntryVisa, setReEntryVisa] = React.useState(
    initialValues.reEntryVisa
  );
  const [immigApproval, setImmigApproval] = React.useState(
    initialValues.immigApproval
  );
  const [reEntryVisaExp, setReEntryVisaExp] = React.useState(
    initialValues.reEntryVisaExp
  );
  const [remarkImmig, setRemarkImmig] = React.useState(
    initialValues.remarkImmig
  );
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [updatedBy, setUpdatedBy] = React.useState(initialValues.updatedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = passportValidRecord
      ? { ...initialValues, ...passportValidRecord }
      : initialValues;
    setEmpID(cleanValues.empID);
    setPpLocation(cleanValues.ppLocation ?? []);
    setCurrentPpLocationValue("");
    setArrivStampUpload(cleanValues.arrivStampUpload ?? []);
    setCurrentArrivStampUploadValue("");
    setImmigEmpUpload(cleanValues.immigEmpUpload ?? []);
    setCurrentImmigEmpUploadValue("");
    setReEntryUpload(cleanValues.reEntryUpload ?? []);
    setCurrentReEntryUploadValue("");
    setArrivStampExp(cleanValues.arrivStampExp ?? []);
    setCurrentArrivStampExpValue("");
    setImmigRefNo(cleanValues.immigRefNo);
    setPpSubmit(cleanValues.ppSubmit ?? []);
    setCurrentPpSubmitValue("");
    setEmpPassExp(cleanValues.empPassExp ?? []);
    setCurrentEmpPassExpValue("");
    setEmpPassStatus(cleanValues.empPassStatus ?? []);
    setCurrentEmpPassStatusValue("");
    setAirTktStatus(cleanValues.airTktStatus ?? []);
    setCurrentAirTktStatusValue("");
    setReEntryVisa(cleanValues.reEntryVisa ?? []);
    setCurrentReEntryVisaValue("");
    setImmigApproval(cleanValues.immigApproval ?? []);
    setCurrentImmigApprovalValue("");
    setReEntryVisaExp(cleanValues.reEntryVisaExp ?? []);
    setCurrentReEntryVisaExpValue("");
    setRemarkImmig(cleanValues.remarkImmig ?? []);
    setCurrentRemarkImmigValue("");
    setCreatedBy(cleanValues.createdBy ?? []);
    setCurrentCreatedByValue("");
    setUpdatedBy(cleanValues.updatedBy ?? []);
    setCurrentUpdatedByValue("");
    setErrors({});
  };
  const [passportValidRecord, setPassportValidRecord] = React.useState(
    passportValidModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPassportValid.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPassportValid
        : passportValidModelProp;
      setPassportValidRecord(record);
    };
    queryData();
  }, [idProp, passportValidModelProp]);
  React.useEffect(resetStateValues, [passportValidRecord]);
  const [currentPpLocationValue, setCurrentPpLocationValue] =
    React.useState("");
  const ppLocationRef = React.createRef();
  const [currentArrivStampUploadValue, setCurrentArrivStampUploadValue] =
    React.useState("");
  const arrivStampUploadRef = React.createRef();
  const [currentImmigEmpUploadValue, setCurrentImmigEmpUploadValue] =
    React.useState("");
  const immigEmpUploadRef = React.createRef();
  const [currentReEntryUploadValue, setCurrentReEntryUploadValue] =
    React.useState("");
  const reEntryUploadRef = React.createRef();
  const [currentArrivStampExpValue, setCurrentArrivStampExpValue] =
    React.useState("");
  const arrivStampExpRef = React.createRef();
  const [currentPpSubmitValue, setCurrentPpSubmitValue] = React.useState("");
  const ppSubmitRef = React.createRef();
  const [currentEmpPassExpValue, setCurrentEmpPassExpValue] =
    React.useState("");
  const empPassExpRef = React.createRef();
  const [currentEmpPassStatusValue, setCurrentEmpPassStatusValue] =
    React.useState("");
  const empPassStatusRef = React.createRef();
  const [currentAirTktStatusValue, setCurrentAirTktStatusValue] =
    React.useState("");
  const airTktStatusRef = React.createRef();
  const [currentReEntryVisaValue, setCurrentReEntryVisaValue] =
    React.useState("");
  const reEntryVisaRef = React.createRef();
  const [currentImmigApprovalValue, setCurrentImmigApprovalValue] =
    React.useState("");
  const immigApprovalRef = React.createRef();
  const [currentReEntryVisaExpValue, setCurrentReEntryVisaExpValue] =
    React.useState("");
  const reEntryVisaExpRef = React.createRef();
  const [currentRemarkImmigValue, setCurrentRemarkImmigValue] =
    React.useState("");
  const remarkImmigRef = React.createRef();
  const [currentCreatedByValue, setCurrentCreatedByValue] = React.useState("");
  const createdByRef = React.createRef();
  const [currentUpdatedByValue, setCurrentUpdatedByValue] = React.useState("");
  const updatedByRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    ppLocation: [],
    arrivStampUpload: [{ type: "JSON" }],
    immigEmpUpload: [{ type: "JSON" }],
    reEntryUpload: [{ type: "JSON" }],
    arrivStampExp: [],
    immigRefNo: [],
    ppSubmit: [],
    empPassExp: [],
    empPassStatus: [],
    airTktStatus: [],
    reEntryVisa: [],
    immigApproval: [],
    reEntryVisaExp: [],
    remarkImmig: [],
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
          ppLocation: ppLocation ?? null,
          arrivStampUpload: arrivStampUpload ?? null,
          immigEmpUpload: immigEmpUpload ?? null,
          reEntryUpload: reEntryUpload ?? null,
          arrivStampExp: arrivStampExp ?? null,
          immigRefNo: immigRefNo ?? null,
          ppSubmit: ppSubmit ?? null,
          empPassExp: empPassExp ?? null,
          empPassStatus: empPassStatus ?? null,
          airTktStatus: airTktStatus ?? null,
          reEntryVisa: reEntryVisa ?? null,
          immigApproval: immigApproval ?? null,
          reEntryVisaExp: reEntryVisaExp ?? null,
          remarkImmig: remarkImmig ?? null,
          createdBy: createdBy ?? null,
          updatedBy: updatedBy ?? null,
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
            query: updatePassportValid.replaceAll("__typename", ""),
            variables: {
              input: {
                id: passportValidRecord.id,
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
      {...getOverrideProps(overrides, "PassportValidUpdateForm")}
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
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
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
              ppLocation: values,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.ppLocation ?? values;
          }
          setPpLocation(values);
          setCurrentPpLocationValue("");
        }}
        currentFieldValue={currentPpLocationValue}
        label={"Pp location"}
        items={ppLocation}
        hasError={errors?.ppLocation?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ppLocation", currentPpLocationValue)
        }
        errorMessage={errors?.ppLocation?.errorMessage}
        setFieldValue={setCurrentPpLocationValue}
        inputFieldRef={ppLocationRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pp location"
          isRequired={false}
          isReadOnly={false}
          value={currentPpLocationValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ppLocation?.hasError) {
              runValidationTasks("ppLocation", value);
            }
            setCurrentPpLocationValue(value);
          }}
          onBlur={() =>
            runValidationTasks("ppLocation", currentPpLocationValue)
          }
          errorMessage={errors.ppLocation?.errorMessage}
          hasError={errors.ppLocation?.hasError}
          ref={ppLocationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ppLocation")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload: values,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.arrivStampUpload ?? values;
          }
          setArrivStampUpload(values);
          setCurrentArrivStampUploadValue("");
        }}
        currentFieldValue={currentArrivStampUploadValue}
        label={"Arriv stamp upload"}
        items={arrivStampUpload}
        hasError={errors?.arrivStampUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "arrivStampUpload",
            currentArrivStampUploadValue
          )
        }
        errorMessage={errors?.arrivStampUpload?.errorMessage}
        setFieldValue={setCurrentArrivStampUploadValue}
        inputFieldRef={arrivStampUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Arriv stamp upload"
          isRequired={false}
          isReadOnly={false}
          value={currentArrivStampUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.arrivStampUpload?.hasError) {
              runValidationTasks("arrivStampUpload", value);
            }
            setCurrentArrivStampUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("arrivStampUpload", currentArrivStampUploadValue)
          }
          errorMessage={errors.arrivStampUpload?.errorMessage}
          hasError={errors.arrivStampUpload?.hasError}
          ref={arrivStampUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "arrivStampUpload")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload: values,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.immigEmpUpload ?? values;
          }
          setImmigEmpUpload(values);
          setCurrentImmigEmpUploadValue("");
        }}
        currentFieldValue={currentImmigEmpUploadValue}
        label={"Immig emp upload"}
        items={immigEmpUpload}
        hasError={errors?.immigEmpUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("immigEmpUpload", currentImmigEmpUploadValue)
        }
        errorMessage={errors?.immigEmpUpload?.errorMessage}
        setFieldValue={setCurrentImmigEmpUploadValue}
        inputFieldRef={immigEmpUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Immig emp upload"
          isRequired={false}
          isReadOnly={false}
          value={currentImmigEmpUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.immigEmpUpload?.hasError) {
              runValidationTasks("immigEmpUpload", value);
            }
            setCurrentImmigEmpUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("immigEmpUpload", currentImmigEmpUploadValue)
          }
          errorMessage={errors.immigEmpUpload?.errorMessage}
          hasError={errors.immigEmpUpload?.hasError}
          ref={immigEmpUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "immigEmpUpload")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload: values,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.reEntryUpload ?? values;
          }
          setReEntryUpload(values);
          setCurrentReEntryUploadValue("");
        }}
        currentFieldValue={currentReEntryUploadValue}
        label={"Re entry upload"}
        items={reEntryUpload}
        hasError={errors?.reEntryUpload?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("reEntryUpload", currentReEntryUploadValue)
        }
        errorMessage={errors?.reEntryUpload?.errorMessage}
        setFieldValue={setCurrentReEntryUploadValue}
        inputFieldRef={reEntryUploadRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Re entry upload"
          isRequired={false}
          isReadOnly={false}
          value={currentReEntryUploadValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.reEntryUpload?.hasError) {
              runValidationTasks("reEntryUpload", value);
            }
            setCurrentReEntryUploadValue(value);
          }}
          onBlur={() =>
            runValidationTasks("reEntryUpload", currentReEntryUploadValue)
          }
          errorMessage={errors.reEntryUpload?.errorMessage}
          hasError={errors.reEntryUpload?.hasError}
          ref={reEntryUploadRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "reEntryUpload")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp: values,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.arrivStampExp ?? values;
          }
          setArrivStampExp(values);
          setCurrentArrivStampExpValue("");
        }}
        currentFieldValue={currentArrivStampExpValue}
        label={"Arriv stamp exp"}
        items={arrivStampExp}
        hasError={errors?.arrivStampExp?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("arrivStampExp", currentArrivStampExpValue)
        }
        errorMessage={errors?.arrivStampExp?.errorMessage}
        setFieldValue={setCurrentArrivStampExpValue}
        inputFieldRef={arrivStampExpRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Arriv stamp exp"
          isRequired={false}
          isReadOnly={false}
          value={currentArrivStampExpValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.arrivStampExp?.hasError) {
              runValidationTasks("arrivStampExp", value);
            }
            setCurrentArrivStampExpValue(value);
          }}
          onBlur={() =>
            runValidationTasks("arrivStampExp", currentArrivStampExpValue)
          }
          errorMessage={errors.arrivStampExp?.errorMessage}
          hasError={errors.arrivStampExp?.hasError}
          ref={arrivStampExpRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "arrivStampExp")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Immig ref no"
        isRequired={false}
        isReadOnly={false}
        value={immigRefNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo: value,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            value = result?.immigRefNo ?? value;
          }
          if (errors.immigRefNo?.hasError) {
            runValidationTasks("immigRefNo", value);
          }
          setImmigRefNo(value);
        }}
        onBlur={() => runValidationTasks("immigRefNo", immigRefNo)}
        errorMessage={errors.immigRefNo?.errorMessage}
        hasError={errors.immigRefNo?.hasError}
        {...getOverrideProps(overrides, "immigRefNo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit: values,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.ppSubmit ?? values;
          }
          setPpSubmit(values);
          setCurrentPpSubmitValue("");
        }}
        currentFieldValue={currentPpSubmitValue}
        label={"Pp submit"}
        items={ppSubmit}
        hasError={errors?.ppSubmit?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ppSubmit", currentPpSubmitValue)
        }
        errorMessage={errors?.ppSubmit?.errorMessage}
        setFieldValue={setCurrentPpSubmitValue}
        inputFieldRef={ppSubmitRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pp submit"
          isRequired={false}
          isReadOnly={false}
          value={currentPpSubmitValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ppSubmit?.hasError) {
              runValidationTasks("ppSubmit", value);
            }
            setCurrentPpSubmitValue(value);
          }}
          onBlur={() => runValidationTasks("ppSubmit", currentPpSubmitValue)}
          errorMessage={errors.ppSubmit?.errorMessage}
          hasError={errors.ppSubmit?.hasError}
          ref={ppSubmitRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ppSubmit")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp: values,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.empPassExp ?? values;
          }
          setEmpPassExp(values);
          setCurrentEmpPassExpValue("");
        }}
        currentFieldValue={currentEmpPassExpValue}
        label={"Emp pass exp"}
        items={empPassExp}
        hasError={errors?.empPassExp?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("empPassExp", currentEmpPassExpValue)
        }
        errorMessage={errors?.empPassExp?.errorMessage}
        setFieldValue={setCurrentEmpPassExpValue}
        inputFieldRef={empPassExpRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Emp pass exp"
          isRequired={false}
          isReadOnly={false}
          value={currentEmpPassExpValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.empPassExp?.hasError) {
              runValidationTasks("empPassExp", value);
            }
            setCurrentEmpPassExpValue(value);
          }}
          onBlur={() =>
            runValidationTasks("empPassExp", currentEmpPassExpValue)
          }
          errorMessage={errors.empPassExp?.errorMessage}
          hasError={errors.empPassExp?.hasError}
          ref={empPassExpRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "empPassExp")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus: values,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.empPassStatus ?? values;
          }
          setEmpPassStatus(values);
          setCurrentEmpPassStatusValue("");
        }}
        currentFieldValue={currentEmpPassStatusValue}
        label={"Emp pass status"}
        items={empPassStatus}
        hasError={errors?.empPassStatus?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("empPassStatus", currentEmpPassStatusValue)
        }
        errorMessage={errors?.empPassStatus?.errorMessage}
        setFieldValue={setCurrentEmpPassStatusValue}
        inputFieldRef={empPassStatusRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Emp pass status"
          isRequired={false}
          isReadOnly={false}
          value={currentEmpPassStatusValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.empPassStatus?.hasError) {
              runValidationTasks("empPassStatus", value);
            }
            setCurrentEmpPassStatusValue(value);
          }}
          onBlur={() =>
            runValidationTasks("empPassStatus", currentEmpPassStatusValue)
          }
          errorMessage={errors.empPassStatus?.errorMessage}
          hasError={errors.empPassStatus?.hasError}
          ref={empPassStatusRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "empPassStatus")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus: values,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.airTktStatus ?? values;
          }
          setAirTktStatus(values);
          setCurrentAirTktStatusValue("");
        }}
        currentFieldValue={currentAirTktStatusValue}
        label={"Air tkt status"}
        items={airTktStatus}
        hasError={errors?.airTktStatus?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("airTktStatus", currentAirTktStatusValue)
        }
        errorMessage={errors?.airTktStatus?.errorMessage}
        setFieldValue={setCurrentAirTktStatusValue}
        inputFieldRef={airTktStatusRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Air tkt status"
          isRequired={false}
          isReadOnly={false}
          value={currentAirTktStatusValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.airTktStatus?.hasError) {
              runValidationTasks("airTktStatus", value);
            }
            setCurrentAirTktStatusValue(value);
          }}
          onBlur={() =>
            runValidationTasks("airTktStatus", currentAirTktStatusValue)
          }
          errorMessage={errors.airTktStatus?.errorMessage}
          hasError={errors.airTktStatus?.hasError}
          ref={airTktStatusRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "airTktStatus")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa: values,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.reEntryVisa ?? values;
          }
          setReEntryVisa(values);
          setCurrentReEntryVisaValue("");
        }}
        currentFieldValue={currentReEntryVisaValue}
        label={"Re entry visa"}
        items={reEntryVisa}
        hasError={errors?.reEntryVisa?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("reEntryVisa", currentReEntryVisaValue)
        }
        errorMessage={errors?.reEntryVisa?.errorMessage}
        setFieldValue={setCurrentReEntryVisaValue}
        inputFieldRef={reEntryVisaRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Re entry visa"
          isRequired={false}
          isReadOnly={false}
          value={currentReEntryVisaValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.reEntryVisa?.hasError) {
              runValidationTasks("reEntryVisa", value);
            }
            setCurrentReEntryVisaValue(value);
          }}
          onBlur={() =>
            runValidationTasks("reEntryVisa", currentReEntryVisaValue)
          }
          errorMessage={errors.reEntryVisa?.errorMessage}
          hasError={errors.reEntryVisa?.hasError}
          ref={reEntryVisaRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "reEntryVisa")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval: values,
              reEntryVisaExp,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.immigApproval ?? values;
          }
          setImmigApproval(values);
          setCurrentImmigApprovalValue("");
        }}
        currentFieldValue={currentImmigApprovalValue}
        label={"Immig approval"}
        items={immigApproval}
        hasError={errors?.immigApproval?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("immigApproval", currentImmigApprovalValue)
        }
        errorMessage={errors?.immigApproval?.errorMessage}
        setFieldValue={setCurrentImmigApprovalValue}
        inputFieldRef={immigApprovalRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Immig approval"
          isRequired={false}
          isReadOnly={false}
          value={currentImmigApprovalValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.immigApproval?.hasError) {
              runValidationTasks("immigApproval", value);
            }
            setCurrentImmigApprovalValue(value);
          }}
          onBlur={() =>
            runValidationTasks("immigApproval", currentImmigApprovalValue)
          }
          errorMessage={errors.immigApproval?.errorMessage}
          hasError={errors.immigApproval?.hasError}
          ref={immigApprovalRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "immigApproval")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp: values,
              remarkImmig,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.reEntryVisaExp ?? values;
          }
          setReEntryVisaExp(values);
          setCurrentReEntryVisaExpValue("");
        }}
        currentFieldValue={currentReEntryVisaExpValue}
        label={"Re entry visa exp"}
        items={reEntryVisaExp}
        hasError={errors?.reEntryVisaExp?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("reEntryVisaExp", currentReEntryVisaExpValue)
        }
        errorMessage={errors?.reEntryVisaExp?.errorMessage}
        setFieldValue={setCurrentReEntryVisaExpValue}
        inputFieldRef={reEntryVisaExpRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Re entry visa exp"
          isRequired={false}
          isReadOnly={false}
          value={currentReEntryVisaExpValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.reEntryVisaExp?.hasError) {
              runValidationTasks("reEntryVisaExp", value);
            }
            setCurrentReEntryVisaExpValue(value);
          }}
          onBlur={() =>
            runValidationTasks("reEntryVisaExp", currentReEntryVisaExpValue)
          }
          errorMessage={errors.reEntryVisaExp?.errorMessage}
          hasError={errors.reEntryVisaExp?.hasError}
          ref={reEntryVisaExpRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "reEntryVisaExp")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig: values,
              createdBy,
              updatedBy,
            };
            const result = onChange(modelFields);
            values = result?.remarkImmig ?? values;
          }
          setRemarkImmig(values);
          setCurrentRemarkImmigValue("");
        }}
        currentFieldValue={currentRemarkImmigValue}
        label={"Remark immig"}
        items={remarkImmig}
        hasError={errors?.remarkImmig?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("remarkImmig", currentRemarkImmigValue)
        }
        errorMessage={errors?.remarkImmig?.errorMessage}
        setFieldValue={setCurrentRemarkImmigValue}
        inputFieldRef={remarkImmigRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Remark immig"
          isRequired={false}
          isReadOnly={false}
          value={currentRemarkImmigValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.remarkImmig?.hasError) {
              runValidationTasks("remarkImmig", value);
            }
            setCurrentRemarkImmigValue(value);
          }}
          onBlur={() =>
            runValidationTasks("remarkImmig", currentRemarkImmigValue)
          }
          errorMessage={errors.remarkImmig?.errorMessage}
          hasError={errors.remarkImmig?.hasError}
          ref={remarkImmigRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "remarkImmig")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
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
              ppLocation,
              arrivStampUpload,
              immigEmpUpload,
              reEntryUpload,
              arrivStampExp,
              immigRefNo,
              ppSubmit,
              empPassExp,
              empPassStatus,
              airTktStatus,
              reEntryVisa,
              immigApproval,
              reEntryVisaExp,
              remarkImmig,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || passportValidModelProp)}
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
              !(idProp || passportValidModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
