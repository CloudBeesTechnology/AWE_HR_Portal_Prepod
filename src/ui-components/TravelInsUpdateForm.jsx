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
import { getTravelIns } from "../graphql/queries";
import { updateTravelIns } from "../graphql/mutations";
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
export default function TravelInsUpdateForm(props) {
  const {
    id: idProp,
    travelIns: travelInsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    travelExp: "",
    travelNo: "",
    travelUp: [],
  };
  const [travelExp, setTravelExp] = React.useState(initialValues.travelExp);
  const [travelNo, setTravelNo] = React.useState(initialValues.travelNo);
  const [travelUp, setTravelUp] = React.useState(initialValues.travelUp);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = travelInsRecord
      ? { ...initialValues, ...travelInsRecord }
      : initialValues;
    setTravelExp(cleanValues.travelExp);
    setTravelNo(cleanValues.travelNo);
    setTravelUp(cleanValues.travelUp ?? []);
    setCurrentTravelUpValue("");
    setErrors({});
  };
  const [travelInsRecord, setTravelInsRecord] =
    React.useState(travelInsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTravelIns.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTravelIns
        : travelInsModelProp;
      setTravelInsRecord(record);
    };
    queryData();
  }, [idProp, travelInsModelProp]);
  React.useEffect(resetStateValues, [travelInsRecord]);
  const [currentTravelUpValue, setCurrentTravelUpValue] = React.useState("");
  const travelUpRef = React.createRef();
  const validations = {
    travelExp: [],
    travelNo: [],
    travelUp: [{ type: "JSON" }],
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
          travelExp: travelExp ?? null,
          travelNo: travelNo ?? null,
          travelUp: travelUp ?? null,
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
            query: updateTravelIns.replaceAll("__typename", ""),
            variables: {
              input: {
                id: travelInsRecord.id,
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
      {...getOverrideProps(overrides, "TravelInsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Travel exp"
        isRequired={false}
        isReadOnly={false}
        value={travelExp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              travelExp: value,
              travelNo,
              travelUp,
            };
            const result = onChange(modelFields);
            value = result?.travelExp ?? value;
          }
          if (errors.travelExp?.hasError) {
            runValidationTasks("travelExp", value);
          }
          setTravelExp(value);
        }}
        onBlur={() => runValidationTasks("travelExp", travelExp)}
        errorMessage={errors.travelExp?.errorMessage}
        hasError={errors.travelExp?.hasError}
        {...getOverrideProps(overrides, "travelExp")}
      ></TextField>
      <TextField
        label="Travel no"
        isRequired={false}
        isReadOnly={false}
        value={travelNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              travelExp,
              travelNo: value,
              travelUp,
            };
            const result = onChange(modelFields);
            value = result?.travelNo ?? value;
          }
          if (errors.travelNo?.hasError) {
            runValidationTasks("travelNo", value);
          }
          setTravelNo(value);
        }}
        onBlur={() => runValidationTasks("travelNo", travelNo)}
        errorMessage={errors.travelNo?.errorMessage}
        hasError={errors.travelNo?.hasError}
        {...getOverrideProps(overrides, "travelNo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              travelExp,
              travelNo,
              travelUp: values,
            };
            const result = onChange(modelFields);
            values = result?.travelUp ?? values;
          }
          setTravelUp(values);
          setCurrentTravelUpValue("");
        }}
        currentFieldValue={currentTravelUpValue}
        label={"Travel up"}
        items={travelUp}
        hasError={errors?.travelUp?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("travelUp", currentTravelUpValue)
        }
        errorMessage={errors?.travelUp?.errorMessage}
        setFieldValue={setCurrentTravelUpValue}
        inputFieldRef={travelUpRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Travel up"
          isRequired={false}
          isReadOnly={false}
          value={currentTravelUpValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.travelUp?.hasError) {
              runValidationTasks("travelUp", value);
            }
            setCurrentTravelUpValue(value);
          }}
          onBlur={() => runValidationTasks("travelUp", currentTravelUpValue)}
          errorMessage={errors.travelUp?.errorMessage}
          hasError={errors.travelUp?.hasError}
          ref={travelUpRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "travelUp")}
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
          isDisabled={!(idProp || travelInsModelProp)}
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
              !(idProp || travelInsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}