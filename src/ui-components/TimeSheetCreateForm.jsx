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
import { createTimeSheet } from "../graphql/mutations";
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
export default function TimeSheetCreateForm(props) {
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
    date: "",
    status: "",
    fileName: "",
    fileType: "",
    assignTo: "",
    assignBy: "",
    empName: "",
    empBadgeNo: "",
    empID: "",
    empDept: "",
    inTime: "",
    outTime: "",
    totalInOut: "",
    allDayHrs: "",
    totalHrs: "",
    remarks: "",
    otTime: "",
    netMins: "",
    actualWorkHrs: "",
    normalWorkHrs: "",
    fidNo: "",
    companyName: "",
    trade: "",
    tradeCode: "",
    onAM: "",
    offAM: "",
    onPM: "",
    offPM: "",
    ctr: "",
    rec: "",
    avgDailyTD: "",
    highlightDayTG: "",
    aweSDN: "",
    totalNT: "",
    totalOT: "",
    totalNTOT: "",
    empWorkInfo: [],
    fromDate: "",
    untilDate: "",
    location: "",
    mealAllow: "",
    verify: "",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [status, setStatus] = React.useState(initialValues.status);
  const [fileName, setFileName] = React.useState(initialValues.fileName);
  const [fileType, setFileType] = React.useState(initialValues.fileType);
  const [assignTo, setAssignTo] = React.useState(initialValues.assignTo);
  const [assignBy, setAssignBy] = React.useState(initialValues.assignBy);
  const [empName, setEmpName] = React.useState(initialValues.empName);
  const [empBadgeNo, setEmpBadgeNo] = React.useState(initialValues.empBadgeNo);
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [empDept, setEmpDept] = React.useState(initialValues.empDept);
  const [inTime, setInTime] = React.useState(initialValues.inTime);
  const [outTime, setOutTime] = React.useState(initialValues.outTime);
  const [totalInOut, setTotalInOut] = React.useState(initialValues.totalInOut);
  const [allDayHrs, setAllDayHrs] = React.useState(initialValues.allDayHrs);
  const [totalHrs, setTotalHrs] = React.useState(initialValues.totalHrs);
  const [remarks, setRemarks] = React.useState(initialValues.remarks);
  const [otTime, setOtTime] = React.useState(initialValues.otTime);
  const [netMins, setNetMins] = React.useState(initialValues.netMins);
  const [actualWorkHrs, setActualWorkHrs] = React.useState(
    initialValues.actualWorkHrs
  );
  const [normalWorkHrs, setNormalWorkHrs] = React.useState(
    initialValues.normalWorkHrs
  );
  const [fidNo, setFidNo] = React.useState(initialValues.fidNo);
  const [companyName, setCompanyName] = React.useState(
    initialValues.companyName
  );
  const [trade, setTrade] = React.useState(initialValues.trade);
  const [tradeCode, setTradeCode] = React.useState(initialValues.tradeCode);
  const [onAM, setOnAM] = React.useState(initialValues.onAM);
  const [offAM, setOffAM] = React.useState(initialValues.offAM);
  const [onPM, setOnPM] = React.useState(initialValues.onPM);
  const [offPM, setOffPM] = React.useState(initialValues.offPM);
  const [ctr, setCtr] = React.useState(initialValues.ctr);
  const [rec, setRec] = React.useState(initialValues.rec);
  const [avgDailyTD, setAvgDailyTD] = React.useState(initialValues.avgDailyTD);
  const [highlightDayTG, setHighlightDayTG] = React.useState(
    initialValues.highlightDayTG
  );
  const [aweSDN, setAweSDN] = React.useState(initialValues.aweSDN);
  const [totalNT, setTotalNT] = React.useState(initialValues.totalNT);
  const [totalOT, setTotalOT] = React.useState(initialValues.totalOT);
  const [totalNTOT, setTotalNTOT] = React.useState(initialValues.totalNTOT);
  const [empWorkInfo, setEmpWorkInfo] = React.useState(
    initialValues.empWorkInfo
  );
  const [fromDate, setFromDate] = React.useState(initialValues.fromDate);
  const [untilDate, setUntilDate] = React.useState(initialValues.untilDate);
  const [location, setLocation] = React.useState(initialValues.location);
  const [mealAllow, setMealAllow] = React.useState(initialValues.mealAllow);
  const [verify, setVerify] = React.useState(initialValues.verify);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDate(initialValues.date);
    setStatus(initialValues.status);
    setFileName(initialValues.fileName);
    setFileType(initialValues.fileType);
    setAssignTo(initialValues.assignTo);
    setAssignBy(initialValues.assignBy);
    setEmpName(initialValues.empName);
    setEmpBadgeNo(initialValues.empBadgeNo);
    setEmpID(initialValues.empID);
    setEmpDept(initialValues.empDept);
    setInTime(initialValues.inTime);
    setOutTime(initialValues.outTime);
    setTotalInOut(initialValues.totalInOut);
    setAllDayHrs(initialValues.allDayHrs);
    setTotalHrs(initialValues.totalHrs);
    setRemarks(initialValues.remarks);
    setOtTime(initialValues.otTime);
    setNetMins(initialValues.netMins);
    setActualWorkHrs(initialValues.actualWorkHrs);
    setNormalWorkHrs(initialValues.normalWorkHrs);
    setFidNo(initialValues.fidNo);
    setCompanyName(initialValues.companyName);
    setTrade(initialValues.trade);
    setTradeCode(initialValues.tradeCode);
    setOnAM(initialValues.onAM);
    setOffAM(initialValues.offAM);
    setOnPM(initialValues.onPM);
    setOffPM(initialValues.offPM);
    setCtr(initialValues.ctr);
    setRec(initialValues.rec);
    setAvgDailyTD(initialValues.avgDailyTD);
    setHighlightDayTG(initialValues.highlightDayTG);
    setAweSDN(initialValues.aweSDN);
    setTotalNT(initialValues.totalNT);
    setTotalOT(initialValues.totalOT);
    setTotalNTOT(initialValues.totalNTOT);
    setEmpWorkInfo(initialValues.empWorkInfo);
    setCurrentEmpWorkInfoValue("");
    setFromDate(initialValues.fromDate);
    setUntilDate(initialValues.untilDate);
    setLocation(initialValues.location);
    setMealAllow(initialValues.mealAllow);
    setVerify(initialValues.verify);
    setErrors({});
  };
  const [currentEmpWorkInfoValue, setCurrentEmpWorkInfoValue] =
    React.useState("");
  const empWorkInfoRef = React.createRef();
  const validations = {
    date: [],
    status: [],
    fileName: [],
    fileType: [],
    assignTo: [],
    assignBy: [],
    empName: [],
    empBadgeNo: [],
    empID: [],
    empDept: [],
    inTime: [],
    outTime: [],
    totalInOut: [],
    allDayHrs: [],
    totalHrs: [],
    remarks: [],
    otTime: [],
    netMins: [],
    actualWorkHrs: [],
    normalWorkHrs: [],
    fidNo: [],
    companyName: [],
    trade: [],
    tradeCode: [],
    onAM: [],
    offAM: [],
    onPM: [],
    offPM: [],
    ctr: [],
    rec: [],
    avgDailyTD: [],
    highlightDayTG: [],
    aweSDN: [],
    totalNT: [],
    totalOT: [],
    totalNTOT: [],
    empWorkInfo: [{ type: "JSON" }],
    fromDate: [],
    untilDate: [],
    location: [],
    mealAllow: [],
    verify: [],
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
          date,
          status,
          fileName,
          fileType,
          assignTo,
          assignBy,
          empName,
          empBadgeNo,
          empID,
          empDept,
          inTime,
          outTime,
          totalInOut,
          allDayHrs,
          totalHrs,
          remarks,
          otTime,
          netMins,
          actualWorkHrs,
          normalWorkHrs,
          fidNo,
          companyName,
          trade,
          tradeCode,
          onAM,
          offAM,
          onPM,
          offPM,
          ctr,
          rec,
          avgDailyTD,
          highlightDayTG,
          aweSDN,
          totalNT,
          totalOT,
          totalNTOT,
          empWorkInfo,
          fromDate,
          untilDate,
          location,
          mealAllow,
          verify,
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
            query: createTimeSheet.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "TimeSheetCreateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status: value,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="File name"
        isRequired={false}
        isReadOnly={false}
        value={fileName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName: value,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.fileName ?? value;
          }
          if (errors.fileName?.hasError) {
            runValidationTasks("fileName", value);
          }
          setFileName(value);
        }}
        onBlur={() => runValidationTasks("fileName", fileName)}
        errorMessage={errors.fileName?.errorMessage}
        hasError={errors.fileName?.hasError}
        {...getOverrideProps(overrides, "fileName")}
      ></TextField>
      <TextField
        label="File type"
        isRequired={false}
        isReadOnly={false}
        value={fileType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType: value,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.fileType ?? value;
          }
          if (errors.fileType?.hasError) {
            runValidationTasks("fileType", value);
          }
          setFileType(value);
        }}
        onBlur={() => runValidationTasks("fileType", fileType)}
        errorMessage={errors.fileType?.errorMessage}
        hasError={errors.fileType?.hasError}
        {...getOverrideProps(overrides, "fileType")}
      ></TextField>
      <TextField
        label="Assign to"
        isRequired={false}
        isReadOnly={false}
        value={assignTo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo: value,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.assignTo ?? value;
          }
          if (errors.assignTo?.hasError) {
            runValidationTasks("assignTo", value);
          }
          setAssignTo(value);
        }}
        onBlur={() => runValidationTasks("assignTo", assignTo)}
        errorMessage={errors.assignTo?.errorMessage}
        hasError={errors.assignTo?.hasError}
        {...getOverrideProps(overrides, "assignTo")}
      ></TextField>
      <TextField
        label="Assign by"
        isRequired={false}
        isReadOnly={false}
        value={assignBy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy: value,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.assignBy ?? value;
          }
          if (errors.assignBy?.hasError) {
            runValidationTasks("assignBy", value);
          }
          setAssignBy(value);
        }}
        onBlur={() => runValidationTasks("assignBy", assignBy)}
        errorMessage={errors.assignBy?.errorMessage}
        hasError={errors.assignBy?.hasError}
        {...getOverrideProps(overrides, "assignBy")}
      ></TextField>
      <TextField
        label="Emp name"
        isRequired={false}
        isReadOnly={false}
        value={empName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName: value,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.empName ?? value;
          }
          if (errors.empName?.hasError) {
            runValidationTasks("empName", value);
          }
          setEmpName(value);
        }}
        onBlur={() => runValidationTasks("empName", empName)}
        errorMessage={errors.empName?.errorMessage}
        hasError={errors.empName?.hasError}
        {...getOverrideProps(overrides, "empName")}
      ></TextField>
      <TextField
        label="Emp badge no"
        isRequired={false}
        isReadOnly={false}
        value={empBadgeNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo: value,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.empBadgeNo ?? value;
          }
          if (errors.empBadgeNo?.hasError) {
            runValidationTasks("empBadgeNo", value);
          }
          setEmpBadgeNo(value);
        }}
        onBlur={() => runValidationTasks("empBadgeNo", empBadgeNo)}
        errorMessage={errors.empBadgeNo?.errorMessage}
        hasError={errors.empBadgeNo?.hasError}
        {...getOverrideProps(overrides, "empBadgeNo")}
      ></TextField>
      <TextField
        label="Emp id"
        isRequired={false}
        isReadOnly={false}
        value={empID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID: value,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
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
        label="Emp dept"
        isRequired={false}
        isReadOnly={false}
        value={empDept}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept: value,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.empDept ?? value;
          }
          if (errors.empDept?.hasError) {
            runValidationTasks("empDept", value);
          }
          setEmpDept(value);
        }}
        onBlur={() => runValidationTasks("empDept", empDept)}
        errorMessage={errors.empDept?.errorMessage}
        hasError={errors.empDept?.hasError}
        {...getOverrideProps(overrides, "empDept")}
      ></TextField>
      <TextField
        label="In time"
        isRequired={false}
        isReadOnly={false}
        value={inTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime: value,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.inTime ?? value;
          }
          if (errors.inTime?.hasError) {
            runValidationTasks("inTime", value);
          }
          setInTime(value);
        }}
        onBlur={() => runValidationTasks("inTime", inTime)}
        errorMessage={errors.inTime?.errorMessage}
        hasError={errors.inTime?.hasError}
        {...getOverrideProps(overrides, "inTime")}
      ></TextField>
      <TextField
        label="Out time"
        isRequired={false}
        isReadOnly={false}
        value={outTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime: value,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.outTime ?? value;
          }
          if (errors.outTime?.hasError) {
            runValidationTasks("outTime", value);
          }
          setOutTime(value);
        }}
        onBlur={() => runValidationTasks("outTime", outTime)}
        errorMessage={errors.outTime?.errorMessage}
        hasError={errors.outTime?.hasError}
        {...getOverrideProps(overrides, "outTime")}
      ></TextField>
      <TextField
        label="Total in out"
        isRequired={false}
        isReadOnly={false}
        value={totalInOut}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut: value,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.totalInOut ?? value;
          }
          if (errors.totalInOut?.hasError) {
            runValidationTasks("totalInOut", value);
          }
          setTotalInOut(value);
        }}
        onBlur={() => runValidationTasks("totalInOut", totalInOut)}
        errorMessage={errors.totalInOut?.errorMessage}
        hasError={errors.totalInOut?.hasError}
        {...getOverrideProps(overrides, "totalInOut")}
      ></TextField>
      <TextField
        label="All day hrs"
        isRequired={false}
        isReadOnly={false}
        value={allDayHrs}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs: value,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.allDayHrs ?? value;
          }
          if (errors.allDayHrs?.hasError) {
            runValidationTasks("allDayHrs", value);
          }
          setAllDayHrs(value);
        }}
        onBlur={() => runValidationTasks("allDayHrs", allDayHrs)}
        errorMessage={errors.allDayHrs?.errorMessage}
        hasError={errors.allDayHrs?.hasError}
        {...getOverrideProps(overrides, "allDayHrs")}
      ></TextField>
      <TextField
        label="Total hrs"
        isRequired={false}
        isReadOnly={false}
        value={totalHrs}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs: value,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.totalHrs ?? value;
          }
          if (errors.totalHrs?.hasError) {
            runValidationTasks("totalHrs", value);
          }
          setTotalHrs(value);
        }}
        onBlur={() => runValidationTasks("totalHrs", totalHrs)}
        errorMessage={errors.totalHrs?.errorMessage}
        hasError={errors.totalHrs?.hasError}
        {...getOverrideProps(overrides, "totalHrs")}
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
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks: value,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
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
      <TextField
        label="Ot time"
        isRequired={false}
        isReadOnly={false}
        value={otTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime: value,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.otTime ?? value;
          }
          if (errors.otTime?.hasError) {
            runValidationTasks("otTime", value);
          }
          setOtTime(value);
        }}
        onBlur={() => runValidationTasks("otTime", otTime)}
        errorMessage={errors.otTime?.errorMessage}
        hasError={errors.otTime?.hasError}
        {...getOverrideProps(overrides, "otTime")}
      ></TextField>
      <TextField
        label="Net mins"
        isRequired={false}
        isReadOnly={false}
        value={netMins}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins: value,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.netMins ?? value;
          }
          if (errors.netMins?.hasError) {
            runValidationTasks("netMins", value);
          }
          setNetMins(value);
        }}
        onBlur={() => runValidationTasks("netMins", netMins)}
        errorMessage={errors.netMins?.errorMessage}
        hasError={errors.netMins?.hasError}
        {...getOverrideProps(overrides, "netMins")}
      ></TextField>
      <TextField
        label="Actual work hrs"
        isRequired={false}
        isReadOnly={false}
        value={actualWorkHrs}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs: value,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.actualWorkHrs ?? value;
          }
          if (errors.actualWorkHrs?.hasError) {
            runValidationTasks("actualWorkHrs", value);
          }
          setActualWorkHrs(value);
        }}
        onBlur={() => runValidationTasks("actualWorkHrs", actualWorkHrs)}
        errorMessage={errors.actualWorkHrs?.errorMessage}
        hasError={errors.actualWorkHrs?.hasError}
        {...getOverrideProps(overrides, "actualWorkHrs")}
      ></TextField>
      <TextField
        label="Normal work hrs"
        isRequired={false}
        isReadOnly={false}
        value={normalWorkHrs}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs: value,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.normalWorkHrs ?? value;
          }
          if (errors.normalWorkHrs?.hasError) {
            runValidationTasks("normalWorkHrs", value);
          }
          setNormalWorkHrs(value);
        }}
        onBlur={() => runValidationTasks("normalWorkHrs", normalWorkHrs)}
        errorMessage={errors.normalWorkHrs?.errorMessage}
        hasError={errors.normalWorkHrs?.hasError}
        {...getOverrideProps(overrides, "normalWorkHrs")}
      ></TextField>
      <TextField
        label="Fid no"
        isRequired={false}
        isReadOnly={false}
        value={fidNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo: value,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.fidNo ?? value;
          }
          if (errors.fidNo?.hasError) {
            runValidationTasks("fidNo", value);
          }
          setFidNo(value);
        }}
        onBlur={() => runValidationTasks("fidNo", fidNo)}
        errorMessage={errors.fidNo?.errorMessage}
        hasError={errors.fidNo?.hasError}
        {...getOverrideProps(overrides, "fidNo")}
      ></TextField>
      <TextField
        label="Company name"
        isRequired={false}
        isReadOnly={false}
        value={companyName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName: value,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.companyName ?? value;
          }
          if (errors.companyName?.hasError) {
            runValidationTasks("companyName", value);
          }
          setCompanyName(value);
        }}
        onBlur={() => runValidationTasks("companyName", companyName)}
        errorMessage={errors.companyName?.errorMessage}
        hasError={errors.companyName?.hasError}
        {...getOverrideProps(overrides, "companyName")}
      ></TextField>
      <TextField
        label="Trade"
        isRequired={false}
        isReadOnly={false}
        value={trade}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade: value,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.trade ?? value;
          }
          if (errors.trade?.hasError) {
            runValidationTasks("trade", value);
          }
          setTrade(value);
        }}
        onBlur={() => runValidationTasks("trade", trade)}
        errorMessage={errors.trade?.errorMessage}
        hasError={errors.trade?.hasError}
        {...getOverrideProps(overrides, "trade")}
      ></TextField>
      <TextField
        label="Trade code"
        isRequired={false}
        isReadOnly={false}
        value={tradeCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode: value,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.tradeCode ?? value;
          }
          if (errors.tradeCode?.hasError) {
            runValidationTasks("tradeCode", value);
          }
          setTradeCode(value);
        }}
        onBlur={() => runValidationTasks("tradeCode", tradeCode)}
        errorMessage={errors.tradeCode?.errorMessage}
        hasError={errors.tradeCode?.hasError}
        {...getOverrideProps(overrides, "tradeCode")}
      ></TextField>
      <TextField
        label="On am"
        isRequired={false}
        isReadOnly={false}
        value={onAM}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM: value,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.onAM ?? value;
          }
          if (errors.onAM?.hasError) {
            runValidationTasks("onAM", value);
          }
          setOnAM(value);
        }}
        onBlur={() => runValidationTasks("onAM", onAM)}
        errorMessage={errors.onAM?.errorMessage}
        hasError={errors.onAM?.hasError}
        {...getOverrideProps(overrides, "onAM")}
      ></TextField>
      <TextField
        label="Off am"
        isRequired={false}
        isReadOnly={false}
        value={offAM}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM: value,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.offAM ?? value;
          }
          if (errors.offAM?.hasError) {
            runValidationTasks("offAM", value);
          }
          setOffAM(value);
        }}
        onBlur={() => runValidationTasks("offAM", offAM)}
        errorMessage={errors.offAM?.errorMessage}
        hasError={errors.offAM?.hasError}
        {...getOverrideProps(overrides, "offAM")}
      ></TextField>
      <TextField
        label="On pm"
        isRequired={false}
        isReadOnly={false}
        value={onPM}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM: value,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.onPM ?? value;
          }
          if (errors.onPM?.hasError) {
            runValidationTasks("onPM", value);
          }
          setOnPM(value);
        }}
        onBlur={() => runValidationTasks("onPM", onPM)}
        errorMessage={errors.onPM?.errorMessage}
        hasError={errors.onPM?.hasError}
        {...getOverrideProps(overrides, "onPM")}
      ></TextField>
      <TextField
        label="Off pm"
        isRequired={false}
        isReadOnly={false}
        value={offPM}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM: value,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.offPM ?? value;
          }
          if (errors.offPM?.hasError) {
            runValidationTasks("offPM", value);
          }
          setOffPM(value);
        }}
        onBlur={() => runValidationTasks("offPM", offPM)}
        errorMessage={errors.offPM?.errorMessage}
        hasError={errors.offPM?.hasError}
        {...getOverrideProps(overrides, "offPM")}
      ></TextField>
      <TextField
        label="Ctr"
        isRequired={false}
        isReadOnly={false}
        value={ctr}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr: value,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.ctr ?? value;
          }
          if (errors.ctr?.hasError) {
            runValidationTasks("ctr", value);
          }
          setCtr(value);
        }}
        onBlur={() => runValidationTasks("ctr", ctr)}
        errorMessage={errors.ctr?.errorMessage}
        hasError={errors.ctr?.hasError}
        {...getOverrideProps(overrides, "ctr")}
      ></TextField>
      <TextField
        label="Rec"
        isRequired={false}
        isReadOnly={false}
        value={rec}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec: value,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.rec ?? value;
          }
          if (errors.rec?.hasError) {
            runValidationTasks("rec", value);
          }
          setRec(value);
        }}
        onBlur={() => runValidationTasks("rec", rec)}
        errorMessage={errors.rec?.errorMessage}
        hasError={errors.rec?.hasError}
        {...getOverrideProps(overrides, "rec")}
      ></TextField>
      <TextField
        label="Avg daily td"
        isRequired={false}
        isReadOnly={false}
        value={avgDailyTD}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD: value,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.avgDailyTD ?? value;
          }
          if (errors.avgDailyTD?.hasError) {
            runValidationTasks("avgDailyTD", value);
          }
          setAvgDailyTD(value);
        }}
        onBlur={() => runValidationTasks("avgDailyTD", avgDailyTD)}
        errorMessage={errors.avgDailyTD?.errorMessage}
        hasError={errors.avgDailyTD?.hasError}
        {...getOverrideProps(overrides, "avgDailyTD")}
      ></TextField>
      <TextField
        label="Highlight day tg"
        isRequired={false}
        isReadOnly={false}
        value={highlightDayTG}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG: value,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.highlightDayTG ?? value;
          }
          if (errors.highlightDayTG?.hasError) {
            runValidationTasks("highlightDayTG", value);
          }
          setHighlightDayTG(value);
        }}
        onBlur={() => runValidationTasks("highlightDayTG", highlightDayTG)}
        errorMessage={errors.highlightDayTG?.errorMessage}
        hasError={errors.highlightDayTG?.hasError}
        {...getOverrideProps(overrides, "highlightDayTG")}
      ></TextField>
      <TextField
        label="Awe sdn"
        isRequired={false}
        isReadOnly={false}
        value={aweSDN}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN: value,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.aweSDN ?? value;
          }
          if (errors.aweSDN?.hasError) {
            runValidationTasks("aweSDN", value);
          }
          setAweSDN(value);
        }}
        onBlur={() => runValidationTasks("aweSDN", aweSDN)}
        errorMessage={errors.aweSDN?.errorMessage}
        hasError={errors.aweSDN?.hasError}
        {...getOverrideProps(overrides, "aweSDN")}
      ></TextField>
      <TextField
        label="Total nt"
        isRequired={false}
        isReadOnly={false}
        value={totalNT}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT: value,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.totalNT ?? value;
          }
          if (errors.totalNT?.hasError) {
            runValidationTasks("totalNT", value);
          }
          setTotalNT(value);
        }}
        onBlur={() => runValidationTasks("totalNT", totalNT)}
        errorMessage={errors.totalNT?.errorMessage}
        hasError={errors.totalNT?.hasError}
        {...getOverrideProps(overrides, "totalNT")}
      ></TextField>
      <TextField
        label="Total ot"
        isRequired={false}
        isReadOnly={false}
        value={totalOT}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT: value,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.totalOT ?? value;
          }
          if (errors.totalOT?.hasError) {
            runValidationTasks("totalOT", value);
          }
          setTotalOT(value);
        }}
        onBlur={() => runValidationTasks("totalOT", totalOT)}
        errorMessage={errors.totalOT?.errorMessage}
        hasError={errors.totalOT?.hasError}
        {...getOverrideProps(overrides, "totalOT")}
      ></TextField>
      <TextField
        label="Total ntot"
        isRequired={false}
        isReadOnly={false}
        value={totalNTOT}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT: value,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.totalNTOT ?? value;
          }
          if (errors.totalNTOT?.hasError) {
            runValidationTasks("totalNTOT", value);
          }
          setTotalNTOT(value);
        }}
        onBlur={() => runValidationTasks("totalNTOT", totalNTOT)}
        errorMessage={errors.totalNTOT?.errorMessage}
        hasError={errors.totalNTOT?.hasError}
        {...getOverrideProps(overrides, "totalNTOT")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo: values,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            values = result?.empWorkInfo ?? values;
          }
          setEmpWorkInfo(values);
          setCurrentEmpWorkInfoValue("");
        }}
        currentFieldValue={currentEmpWorkInfoValue}
        label={"Emp work info"}
        items={empWorkInfo}
        hasError={errors?.empWorkInfo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("empWorkInfo", currentEmpWorkInfoValue)
        }
        errorMessage={errors?.empWorkInfo?.errorMessage}
        setFieldValue={setCurrentEmpWorkInfoValue}
        inputFieldRef={empWorkInfoRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Emp work info"
          isRequired={false}
          isReadOnly={false}
          value={currentEmpWorkInfoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.empWorkInfo?.hasError) {
              runValidationTasks("empWorkInfo", value);
            }
            setCurrentEmpWorkInfoValue(value);
          }}
          onBlur={() =>
            runValidationTasks("empWorkInfo", currentEmpWorkInfoValue)
          }
          errorMessage={errors.empWorkInfo?.errorMessage}
          hasError={errors.empWorkInfo?.hasError}
          ref={empWorkInfoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "empWorkInfo")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="From date"
        isRequired={false}
        isReadOnly={false}
        value={fromDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate: value,
              untilDate,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.fromDate ?? value;
          }
          if (errors.fromDate?.hasError) {
            runValidationTasks("fromDate", value);
          }
          setFromDate(value);
        }}
        onBlur={() => runValidationTasks("fromDate", fromDate)}
        errorMessage={errors.fromDate?.errorMessage}
        hasError={errors.fromDate?.hasError}
        {...getOverrideProps(overrides, "fromDate")}
      ></TextField>
      <TextField
        label="Until date"
        isRequired={false}
        isReadOnly={false}
        value={untilDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate: value,
              location,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.untilDate ?? value;
          }
          if (errors.untilDate?.hasError) {
            runValidationTasks("untilDate", value);
          }
          setUntilDate(value);
        }}
        onBlur={() => runValidationTasks("untilDate", untilDate)}
        errorMessage={errors.untilDate?.errorMessage}
        hasError={errors.untilDate?.hasError}
        {...getOverrideProps(overrides, "untilDate")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location: value,
              mealAllow,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Meal allow"
        isRequired={false}
        isReadOnly={false}
        value={mealAllow}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow: value,
              verify,
            };
            const result = onChange(modelFields);
            value = result?.mealAllow ?? value;
          }
          if (errors.mealAllow?.hasError) {
            runValidationTasks("mealAllow", value);
          }
          setMealAllow(value);
        }}
        onBlur={() => runValidationTasks("mealAllow", mealAllow)}
        errorMessage={errors.mealAllow?.errorMessage}
        hasError={errors.mealAllow?.hasError}
        {...getOverrideProps(overrides, "mealAllow")}
      ></TextField>
      <TextField
        label="Verify"
        isRequired={false}
        isReadOnly={false}
        value={verify}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              status,
              fileName,
              fileType,
              assignTo,
              assignBy,
              empName,
              empBadgeNo,
              empID,
              empDept,
              inTime,
              outTime,
              totalInOut,
              allDayHrs,
              totalHrs,
              remarks,
              otTime,
              netMins,
              actualWorkHrs,
              normalWorkHrs,
              fidNo,
              companyName,
              trade,
              tradeCode,
              onAM,
              offAM,
              onPM,
              offPM,
              ctr,
              rec,
              avgDailyTD,
              highlightDayTG,
              aweSDN,
              totalNT,
              totalOT,
              totalNTOT,
              empWorkInfo,
              fromDate,
              untilDate,
              location,
              mealAllow,
              verify: value,
            };
            const result = onChange(modelFields);
            value = result?.verify ?? value;
          }
          if (errors.verify?.hasError) {
            runValidationTasks("verify", value);
          }
          setVerify(value);
        }}
        onBlur={() => runValidationTasks("verify", verify)}
        errorMessage={errors.verify?.errorMessage}
        hasError={errors.verify?.hasError}
        {...getOverrideProps(overrides, "verify")}
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
