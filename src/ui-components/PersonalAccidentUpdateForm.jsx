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
import { getPersonalAccident } from "../graphql/queries";
import { updatePersonalAccident } from "../graphql/mutations";
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
export default function PersonalAccidentUpdateForm(props) {
  const {
    id: idProp,
    personalAccident: personalAccidentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    perAccExp: "",
    perAccNo: "",
    perAccUp: [],
  };
  const [perAccExp, setPerAccExp] = React.useState(initialValues.perAccExp);
  const [perAccNo, setPerAccNo] = React.useState(initialValues.perAccNo);
  const [perAccUp, setPerAccUp] = React.useState(initialValues.perAccUp);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = personalAccidentRecord
      ? { ...initialValues, ...personalAccidentRecord }
      : initialValues;
    setPerAccExp(cleanValues.perAccExp);
    setPerAccNo(cleanValues.perAccNo);
    setPerAccUp(cleanValues.perAccUp ?? []);
    setCurrentPerAccUpValue("");
    setErrors({});
  };
  const [personalAccidentRecord, setPersonalAccidentRecord] = React.useState(
    personalAccidentModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPersonalAccident.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPersonalAccident
        : personalAccidentModelProp;
      setPersonalAccidentRecord(record);
    };
    queryData();
  }, [idProp, personalAccidentModelProp]);
  React.useEffect(resetStateValues, [personalAccidentRecord]);
  const [currentPerAccUpValue, setCurrentPerAccUpValue] = React.useState("");
  const perAccUpRef = React.createRef();
  const validations = {
    perAccExp: [],
    perAccNo: [],
    perAccUp: [{ type: "JSON" }],
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
          perAccExp: perAccExp ?? null,
          perAccNo: perAccNo ?? null,
          perAccUp: perAccUp ?? null,
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
            query: updatePersonalAccident.replaceAll("__typename", ""),
            variables: {
              input: {
                id: personalAccidentRecord.id,
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
      {...getOverrideProps(overrides, "PersonalAccidentUpdateForm")}
      {...rest}
    >
      <TextField
        label="Per acc exp"
        isRequired={false}
        isReadOnly={false}
        value={perAccExp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              perAccExp: value,
              perAccNo,
              perAccUp,
            };
            const result = onChange(modelFields);
            value = result?.perAccExp ?? value;
          }
          if (errors.perAccExp?.hasError) {
            runValidationTasks("perAccExp", value);
          }
          setPerAccExp(value);
        }}
        onBlur={() => runValidationTasks("perAccExp", perAccExp)}
        errorMessage={errors.perAccExp?.errorMessage}
        hasError={errors.perAccExp?.hasError}
        {...getOverrideProps(overrides, "perAccExp")}
      ></TextField>
      <TextField
        label="Per acc no"
        isRequired={false}
        isReadOnly={false}
        value={perAccNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              perAccExp,
              perAccNo: value,
              perAccUp,
            };
            const result = onChange(modelFields);
            value = result?.perAccNo ?? value;
          }
          if (errors.perAccNo?.hasError) {
            runValidationTasks("perAccNo", value);
          }
          setPerAccNo(value);
        }}
        onBlur={() => runValidationTasks("perAccNo", perAccNo)}
        errorMessage={errors.perAccNo?.errorMessage}
        hasError={errors.perAccNo?.hasError}
        {...getOverrideProps(overrides, "perAccNo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              perAccExp,
              perAccNo,
              perAccUp: values,
            };
            const result = onChange(modelFields);
            values = result?.perAccUp ?? values;
          }
          setPerAccUp(values);
          setCurrentPerAccUpValue("");
        }}
        currentFieldValue={currentPerAccUpValue}
        label={"Per acc up"}
        items={perAccUp}
        hasError={errors?.perAccUp?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("perAccUp", currentPerAccUpValue)
        }
        errorMessage={errors?.perAccUp?.errorMessage}
        setFieldValue={setCurrentPerAccUpValue}
        inputFieldRef={perAccUpRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Per acc up"
          isRequired={false}
          isReadOnly={false}
          value={currentPerAccUpValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.perAccUp?.hasError) {
              runValidationTasks("perAccUp", value);
            }
            setCurrentPerAccUpValue(value);
          }}
          onBlur={() => runValidationTasks("perAccUp", currentPerAccUpValue)}
          errorMessage={errors.perAccUp?.errorMessage}
          hasError={errors.perAccUp?.hasError}
          ref={perAccUpRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "perAccUp")}
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
          isDisabled={!(idProp || personalAccidentModelProp)}
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
              !(idProp || personalAccidentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
