import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";

import { generateClient } from "@aws-amplify/api";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";

import { EditTimeSheet } from "./EditTimeSheet";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import "../../../src/index.css";

import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listTimeSheets,
} from "../../graphql/queries";
import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";

import { PopupForAddRemark } from "./ModelForSuccessMess/PopupForAddRemark";
import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";
import { PopupForSFApproves } from "./ModelForSuccessMess/PopupForSFApproves";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { DateFilter } from "./timeSheetSearch/DateFilter";
import { useTempID } from "../../utils/TempIDContext";
import { SpinLogo } from "../../utils/SpinLogo";
import { Pagination } from "./timeSheetSearch/Pagination";
import { AutoFetchForAssignManager } from "./customTimeSheet/AutoFetchForAssignManager";

import { TimeSheetsCRUDoperations } from "./customTimeSheet/TimeSheetsCRUDoperations";
import { deleteTimeSheet } from "../../graphql/mutations";
import { useRowSelection } from "./customTimeSheet/useRowSelection";
import { useNavigate } from "react-router-dom";
import { useCreateNotification } from "../../hooks/useCreateNotification";
import { TimeSheetSpinner } from "./customTimeSheet/TimeSheetSpinner";
import { UnlockVerifiedCellVS } from "./customTimeSheet/UnlockVerifiedCellVS";
import PopupForDuplicateFileAlert from "./ModelForSuccessMess/PopupForDuplicateFileAlert";

import { useTableMergedData } from "./customTimeSheet/useTableMergedData";
import PopupForCheckBadgeNo from "./ModelForSuccessMess/PopupForCheckBadgeNo";
import LocationFilter from "./timeSheetSearch/locationFilter";

const client = generateClient();

export const ViewTSTBeforeSave = ({
  excelData,
  returnedTHeader,
  Position,
  // convertedStringToArrayObj,
  titleName,
  setExcelData,
  fileName,
  showRejectedItemTable,

  submittedData,
  wholeData,
  ManagerData,
}) => {
  const cancelActionRef = useRef(false);
  const showDuplicateAlertRef = useRef(false);

  const nav = useNavigate();
  const uploaderID = localStorage.getItem("userID")?.toUpperCase();

  // State to trigger re-render for Notification component
  const [closePopup, setClosePopup] = useState(false);
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [editObject, setEditObject] = useState();
  const [toggleHandler, setToggleHandler] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userIdentification, setUserIdentification] = useState("");
  const [successMess, setSuccessMess] = useState(null);
  const [loadingMessForDelay, setLoadingMessForDelay] = useState(null);

  const [toggleAssignManager, setToggleAssignManager] = useState(false);
  const [toggleForRemark, setToggleForRemark] = useState(null);
  const [changePopupMessage, setChangePopupMessage] = useState(null);
  const [duplicateRecord, setDuplicateRecord] = useState([]);
  const [popupMess, setPopupMess] = useState({});

  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [showStatusCol, setShowStatusCol] = useState(null);
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [cancelAction, setCancelAction] = useState(false);
  const [storePreSubmitData, setStorePreSubmitData] = useState(null);
  const [rejectTab, setRejectTab] = useState(false);

  const [allApprovedData, setAllApprovedData] = useState([]);
  const [allRejectedData, setAllRejectedData] = useState([]);
  const [passSelectedData, setPassSelectedData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [finalData, setFinalData] = useState([]);
  let visibleData;

  const mergedData = AutoFetchForAssignManager();
  const [storingMess, setStoringMess] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItemsTwo, setCheckedItemsTwo] = useState({});
  const [editFormTitle, setEditFormTitle] = useState("");
  const [storeLocation, setStoreLocation] = useState(["All"]);
  const [isOpen, setIsOpen] = useState(false);
  const [isApprovedChecked, setIsApprovedChecked] = useState(false);

  // const [empAndWorkInfo, setEmpAndWorkInfo] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const { startDate, endDate, searchQuery, setSearchQuery } = useTempID();
  const { selectedRows, setSelectedRows, handleCheckboxChange, handleSubmit } =
    useRowSelection();
  const { createNotification } = useCreateNotification();
  const { empAndWorkInfo } = useTableMergedData();
  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const dataPromise = new Promise((resolve, reject) => {
            if (excelData) {
              resolve(excelData);
            } else {
              setTimeout(() => {
                reject("No data found after waiting.");
              }, 2000);
            }
          });

          const fetchedData = await dataPromise;

          async function fetchAllData(queryName) {
            let allData = [];
            let nextToken = null;

            do {
              const response = await client.graphql({
                query: queryName,
                variables: { nextToken },
              });

              const items = response.data[Object.keys(response.data)[0]].items;
              allData = [...allData, ...items];
              nextToken =
                response.data[Object.keys(response.data)[0]].nextToken;
            } while (nextToken);

            return allData;
          }

          const fetchWorkInfo = async () => {
            try {
              const [employeeInfo, empWorkInfos] = await Promise.all([
                fetchAllData(listEmpPersonalInfos),
                fetchAllData(listEmpWorkInfos),
              ]);

              const empInfo = employeeInfo;
              const workInfo = empWorkInfos;

              const sapNoRemoved = workInfo.map(({ sapNo, ...rest }) => rest);

              const mergedDatas = empInfo
                .map((empInf) => {
                  const interviewDetails = sapNoRemoved.find(
                    (item) =>
                      String(item?.empID)?.toUpperCase()?.trim() ===
                      String(empInf?.empID)?.toUpperCase()?.trim()
                  );

                  if (!interviewDetails) {
                    return null;
                  }

                  return {
                    ...empInf,
                    ...interviewDetails,
                  };
                })
                .filter((item) => item !== null);

              const mergedData = fetchedData.map((item) => {
                const workInfoItem = mergedDatas.find(
                  (info) =>
                    String(info?.sapNo)?.toUpperCase()?.trim() ===
                    String(item?.NO)?.toUpperCase()?.trim()
                );

                return {
                  ...item,
                  NORMALWORKINGHRSPERDAY: workInfoItem
                    ? workInfoItem?.workHrs[workInfoItem?.workHrs.length - 1]
                    : null,
                };
              });

              setData(mergedData);
              setSecondaryData(mergedData);
            } catch (error) {}
          };

          fetchWorkInfo();
        } catch (err) {
        } finally {
        }
      };

      fetchData();
      // }
    } catch (err) {}
  }, [excelData]);

  function autoEditFunction(data) {
    return data.map((item) => ({
      ...item,
      companyName: item?.LOCATION,
      WORKINGHOURS: item.TOTALHOURS ?? "0",
      OT: item.TOTALHOURS2 ?? "0",
      jobLocaWhrs: [
        {
          JOBCODE: "",
          LOCATION: item.LOCATION,
          OVERTIMEHRS: item.TOTALHOURS2 ?? "0",
          WORKINGHRS: item.TOTALHOURS ?? "0", // ensure it's a number
          id: 1,
        },
      ],
    }));
  }

  useEffect(() => {
    if (submittedData && submittedData.length > 0) {
      setShowStatusCol(true);
      setCurrentStatus(true);

      const autoEditedData = autoEditFunction(submittedData);
      setSelectedRows(autoEditedData);
      setData(autoEditedData);
      setSecondaryData(autoEditedData);
    }
  }, [submittedData]);

  useEffect(() => {
    const getPosition = localStorage.getItem("userType");
    if (getPosition === "Manager") {
      setUserIdentification("Manager");
    } else if (getPosition !== "Manager") {
      setUserIdentification("TimeKeeper");
    }
  }, [wholeData]);

  const pendingData = (data) => {
    if (data && data.length > 0) {
      setCurrentStatus(true);

      const result = data?.map((val) => {
        let parsedEmpWorkInfo = [];
        try {
          if (Array.isArray(val.empWorkInfo)) {
            parsedEmpWorkInfo = val.empWorkInfo.map((info) =>
              typeof info === "string" ? JSON.parse(info) : info
            );
          }
        } catch (error) {}

        return {
          id: val.id,
          fileName: val.fileName,
          NAME: val.empName || "",
          NO: val.fidNo || "",
          LOCATION: val.location || "",
          TRADE: val.trade || "",
          DATE: val.date || "",
          TOTALHOURS: val.totalNT || 0,
          TOTALHOURS2: val.totalOT || 0,
          TOTALHOURS3: val.totalNTOT || 0,
          WORKINGHOURS: val.actualWorkHrs || 0,
          OT: val?.otTime || 0,
          NORMALWORKINGHRSPERDAY: val?.normalWorkHrs || 0,
          jobLocaWhrs: parsedEmpWorkInfo.flat() || [],
          fileType: val.fileType || "",
          timeKeeper: val.assignBy || "",
          manager: val.assignTo || "",
          REMARKS: val.remarks || "",
          status: val.status || "",
        };
      });

      setData(result);
      setSecondaryData(result);
    }
  };
  const searchResult = async (searchedData) => {
    try {
      const result = await searchedData;
      // setData(result);
      setSearchQuery(result);
    } catch (error) {}
  };

  const cleanValue = (value) => {
    if (typeof value !== "string") {
      return value;
    }
    return value.replace(/[^a-zA-Z0-9]/g, "");
  };
  useEffect(() => {
    const checkKeys = async () => {
      const cleanData =
        returnedTHeader &&
        returnedTHeader.map((item) => {
          const cleanedItem = {};
          for (const key in item) {
            cleanedItem[key] = cleanValue(item[key]);
          }
          return cleanedItem;
        });

      const requiredKeys = ["NAME", "No", "Company", "TOTALHOURS"];

      const result = await new Promise((resolve) => {
        const keyCheckResult =
          cleanData &&
          cleanData.every((m) => {
            return requiredKeys.every((key) =>
              Object.values(m)
                .map((value) =>
                  typeof value === "string" ? value.toUpperCase() : value
                )
                .includes(key.toUpperCase())
            );
          });
        resolve(keyCheckResult);
      });
      setClosePopup(true);

      setShowStatusCol(result);
      setCurrentStatus(result);
      setLoading(false);
    };

    if (returnedTHeader && returnedTHeader?.length > 0) {
      checkKeys();
    } else if (!returnedTHeader && showRejectedItemTable !== "Rejected") {
      const fetchData = async () => {
        setCurrentStatus(true);
        // setLoading(true);
        try {
          const dataPromise = new Promise((resolve, reject) => {
            if (ManagerData && ManagerData.length > 0) {
              resolve(ManagerData);
            } else {
              setTimeout(() => {
                reject("No data found after waiting.");
              }, 5000);
            }
          });

          const fetchedData = await dataPromise;

          if (userIdentification === "Manager") {
            const finalData = await SendDataToManager(fetchedData);

            pendingData(fetchedData);

            const getLocation = Array.isArray(fetchedData) && [
              ...new Set(fetchedData.map((val) => val.location)),
            ];

            setStoreLocation([...storeLocation, ...getLocation]);
          }
        } catch (err) {
        } finally {
          // setLoading(false);
        }
      };

      fetchData();
    } else if (!returnedTHeader && showRejectedItemTable === "Rejected") {
      const fetchData = async () => {
        setCurrentStatus(true);
        setRejectTab(true);
        // setLoading(true);
        try {
          const dataPromise = new Promise((resolve, reject) => {
            if (wholeData && wholeData.length > 0) {
              resolve(wholeData);
            } else {
              setTimeout(() => {
                reject("No data found after waiting.");
              }, 5000);
            }
          });

          const fetchedData = await dataPromise;

          if (userIdentification !== "Manager") {
            const finalData = await FindSpecificTimeKeeper(fetchedData);

            pendingData(fetchedData);
          }
        } catch (err) {
        } finally {
          // setLoading(false);
        }
      };

      fetchData();
    } else {
      setCurrentStatus(false);
      setLoading(false);
    }
  }, [
    returnedTHeader,
    ManagerData,
    wholeData,
    userIdentification,
    showRejectedItemTable,
  ]);

  const editBLNG = (data) => {
    setEditObject(data);
  };

  const toggleFunction = () => {
    setToggleHandler(!toggleHandler);
  };

  const toggleSFAMessage = useCallback(async (value, responseData) => {
    setSuccessMess(value);
  }, []);

  const toggleFunctionForAssiMana = () => {
    setToggleAssignManager(!toggleAssignManager);
  };
  const editFormTitleFunc = () => {
    if (Position === "Manager") {
      setEditFormTitle("View Form");
    } else {
      setEditFormTitle("Edit Form");
    }
  };
  const editNestedData = (data, getObject) => {
    return data.map((m) => ({
      id: m.id,
      data: m.data.map((val) => {
        if (val.NO === getObject.NO) {
          return getObject;
        } else {
          return val;
        }
      }),
    }));
  };

  const addEditedRemarks = (object) => {
    const addedRemarkForReject =
      data &&
      data.length > 0 &&
      data.map((val) => {
        if (val.id === object.id) {
          return { ...val, REMARKS: object.REMARKS };
        } else {
          return val;
        }
      });

    setData(addedRemarkForReject);
  };

  const editFlatData = (data, getObject) => {
    return data.map((val) => {
      if (val.NO === getObject.NO) {
        return getObject;
      } else {
        return val;
      }
    });
  };

  const editOffShoreFunction = (getObject) => {
    try {
      const result = Array.isArray(data[0]?.data)
        ? editNestedData(data, getObject)
        : editFlatData(data, getObject);

      const updatedData = result?.map((item) => {
        if (Array.isArray(item?.jobLocaWhrs) && item?.jobLocaWhrs?.length > 0) {
          item.LOCATIONATTOP = item?.jobLocaWhrs[0]?.LOCATION;
        } else {
          item.LOCATIONATTOP = null;
        }
        return item;
      });

      setData(updatedData);
    } catch (err) {}
  };
  const handleAssignManager = () => {
    const remainingData = data?.filter(
      (row) => !selectedRows.some((selected) => selected.id === row.id)
    );
    setData(remainingData);
    setSecondaryData(remainingData);
    setSelectedRows([]);
    if (remainingData && remainingData.length === 0) {
      window.location.reload();
    }
  };

  const handleManagerReload = async () => {
    let mergedData = [...allApprovedData, ...allRejectedData];
    const remainingData = data?.filter(
      (row) => !mergedData.some((selected) => selected.id === row.id)
    );
    setData(remainingData);
    setSecondaryData(remainingData);

    if (remainingData && remainingData.length === 0) {
      nav("/timeSheet");
      window.location.reload();
    }
  };
  const AllFieldData = useTableFieldData(titleName);

  const renameKeysFunctionAndSubmit = async (managerData) => {
    if (
      userIdentification !== "Manager" &&
      showRejectedItemTable !== "Rejected" &&
      selectedRows &&
      selectedRows.length > 0
    ) {
      const result =
        selectedRows &&
        selectedRows.length > 0 &&
        selectedRows.map((val) => {
          return {
            id: val.id,
            empName: val.NAME || "",
            fidNo: val.NO || "",
            companyName: val.LOCATIONATTOP
              ? val.LOCATIONATTOP
              : val.LOCATION || "",
            location: val.LOCATION || "",
            trade: val.TRADE || "",
            date: val.DATE || "",
            totalNT: val.TOTALHOURS || "",
            totalOT: val.TOTALHOURS2 || "",
            totalNTOT: val.TOTALHOURS3 || "",
            normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
            actualWorkHrs: val.WORKINGHOURS || "",
            otTime: val.OT || "",
            remarks: val.REMARKS || "",
            empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],

            fileType: "Offshore",
            status: "Pending",
          };
        });

      const finalResult = result.map((val) => {
        return {
          ...val,
          assignTo: managerData.mbadgeNo,
          assignBy: uploaderID,
          fromDate: managerData.mfromDate,
          untilDate: managerData.muntilDate,
        };
      });

      // console.log("finalResult : ", finalResult);
      // let tempVar = null;
      // finalResult?.map((val) => {
      //   if (
      //     parseFloat(val?.actualWorkHrs) > parseFloat(val?.normalWorkHrs) &&
      //     !tempVar
      //   ) {
      //     tempVar = true;
      //   }
      // });

      // if (tempVar === true) {
      //   alert(
      //     `Working hours cannot be greater than 'Normal Working Hrs Per Day`
      //   );
      //   return;
      // }
      let identifier = "updateStoredData";
      const { filteredResults, deleteDuplicateData } =
        await UnlockVerifiedCellVS({
          finalResult,
          setLoadingMessForDelay,
          identifier,
        });

      if (
        (filteredResults && filteredResults.length > 0) ||
        (filteredResults && filteredResults.length === 0) ||
        deleteDuplicateData === "DuplicateDataDeletedSuccessfully"
      ) {
        setLoadingMessForDelay(false);
        let action = "updateStoredData";
        let finalResult = filteredResults;
        const notifiyCenterData = await TimeSheetsCRUDoperations({
          setNotification,
          setShowTitle,
          finalResult,
          toggleSFAMessage,
          setStoringMess,
          Position,
          action,
          handleAssignManager,
          selectedRows,
        });

        if (notifiyCenterData) {
          const {
            subject,
            message,
            fromAddress,
            toAddress,
            empID,
            timeKeeperEmpID,
            ManagerEmpID,
            managerName,
            fileType,
            timeKeeperName,
            fromDate,
            untilDate,
            senderEmail,
          } = notifiyCenterData;
          await createNotification({
            empID: empID,
            leaveType: `${fileType} excel sheet submitted for Approval`,
            message: `The ${fileType} timesheet for the period from ${fromDate} until ${untilDate} has been submitted by Timekeeper : 
          ${timeKeeperName}`,
            senderEmail: senderEmail,
            receipentEmail: toAddress,
            receipentEmpID: empID,
            status: "Unread",
          });
        }
      }
    } else if (userIdentification === "Manager") {
      const MergedData = [...allApprovedData, ...allRejectedData];

      const uniqueArray = MergedData?.filter(
        (item, index, self) =>
          index === self.findIndex((obj) => obj.id === item.id)
      );

      const MultipleBLNGfile =
        uniqueArray && uniqueArray.length > 0
          ? uniqueArray.map((val) => {
              return {
                id: val.id,
                // fileName: val.fileName,
                empName: val.NAME || "",
                fidNo: val.NO || "",
                location: val.LOCATION || "",
                trade: val.TRADE || "",
                date: val.DATE || "",
                totalNT: val.TOTALHOURS || "",
                totalOT: val.TOTALHOURS2 || "",
                totalNTOT: val.TOTALHOURS3 || "",
                normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
                actualWorkHrs: val.WORKINGHOURS || "",
                otTime: val.OT || "",
                remarks: val.REMARKS || "",
                empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
                fileType: "Offshore",
                status: val.status,
              };
            })
          : [];

      let finalResult = MultipleBLNGfile;
      let storeApproveRej = [];
      let action = "update";
      const notifiyCenterData = await TimeSheetsCRUDoperations({
        finalResult,
        toggleSFAMessage,
        setStoringMess,
        setData,
        Position,
        action,
        setShowTitle,
        setNotification,
        setAllApprovedData,
        setAllRejectedData,
        // handleManagerReload,
        storeApproveRej,
      });

      if (notifiyCenterData && notifiyCenterData.length > 0) {
        notifiyCenterData.forEach(
          async ({
            subject,
            message,
            fromAddress,
            toAddress,
            empID,
            timeKeeperEmpID,
            ManagerEmpID,
            managerName,
            fileType,
            timeKeeperName,
            fromDate,
            untilDate,
            senderEmail,
            sheetStatus,
          }) => {
            await createNotification({
              empID: empID,
              leaveType: `${fileType} Time Sheet ${sheetStatus}`,
              message: `The ${fileType} timesheet for the period ${fromDate} to ${untilDate} has been ${sheetStatus} by Manager : ${managerName}.`,
              senderEmail: senderEmail,
              receipentEmail: toAddress,
              receipentEmpID: empID,
              status: "Unread",
            });
          }
        );

        storeApproveRej = [];
        setIsApprovedChecked(false);
        unCheckAllData();
        await handleManagerReload();
      }
    } else if (
      userIdentification !== "Manager" &&
      showRejectedItemTable === "Rejected" &&
      selectedRows &&
      selectedRows.length > 0
    ) {
      const updatedRejectedItems =
        selectedRows && selectedRows.length > 0
          ? selectedRows.map((val) => {
              return {
                id: val.id,
                // fileName: val.fileName,
                empName: val.NAME || "",
                fidNo: val.NO || "",
                location: val.LOCATION || "",
                companyName: val.LOCATIONATTOP
                  ? val.LOCATIONATTOP
                  : val.LOCATION || "",
                trade: val.TRADE || "",
                date: val.DATE || "",
                totalNT: val.TOTALHOURS || "",
                totalOT: val.TOTALHOURS2 || "",
                totalNTOT: val.TOTALHOURS3 || "",
                normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
                actualWorkHrs: val.WORKINGHOURS || "",
                otTime: val.OT || "",
                remarks: val.REMARKS || "",
                empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
                fileType: "Offshore",
                status: "Pending",
              };
            })
          : [];

      const finalResult = updatedRejectedItems.map((val) => {
        return {
          ...val,
          assignTo: managerData.mbadgeNo,
          assignBy: uploaderID,
          fromDate: managerData.mfromDate,
          untilDate: managerData.muntilDate,
        };
      });
      let action = "ResubmitRejectedItems";

      const notifiyCenterData = await TimeSheetsCRUDoperations({
        setNotification,
        setShowTitle,
        finalResult,
        toggleSFAMessage,
        setStoringMess,
        Position,
        action,
        handleAssignManager,
        selectedRows,
      });
      if (notifiyCenterData) {
        const {
          subject,
          message,
          fromAddress,
          toAddress,
          empID,
          timeKeeperEmpID,
          ManagerEmpID,
          managerName,
          fileType,
          timeKeeperName,
          fromDate,
          untilDate,
          senderEmail,
        } = notifiyCenterData;

        await createNotification({
          empID: empID,
          leaveType: `Corrected ${fileType} Time Sheet Submitted for Approval`,
          message: `The ${fileType} timesheet for the period from ${fromDate} until ${untilDate} has been submitted by Timekeeper
          ${timeKeeperName}`,
          senderEmail: senderEmail,
          receipentEmail: toAddress,
          receipentEmpID: empID,
          status: "Unread",
        });
      }
    }
  };

  useEffect(() => {
    if (
      changePopupMessage &&
      changePopupMessage.length > 0 &&
      duplicateRecord &&
      duplicateRecord?.length > 0
    ) {
      const getFidNo = Array.isArray(duplicateRecord)
        ? duplicateRecord[0]?.fidNo
        : [];
      setPopupMess({
        message: `Some data in the uploaded Excel sheet (SAP ID: ${getFidNo}) has already been submitted by the Time Keeper. You may proceed to submit only the remaining unmatched data.`,
        buttonName: "Save",
      });
    } else if (changePopupMessage && changePopupMessage.length === 0) {
      setPopupMess({
        message:
          "All data in the uploaded Excel sheet has already been submitted by the Time Keeper.",
        buttonName: "OK",
      });
    }
  }, [changePopupMessage, duplicateRecord]);

  const checkBadgeNoOrNWHPD = async (data, decision) => {
    if (decision === "Allowed") return false;
    let hasMissingField = false;
    let message = "";

    for (let emp of data) {
      const fid = emp.fidNo?.toString()?.trim();
      const workHrs = emp.normalWorkHrs?.toString()?.trim();
      const date = emp?.date?.toString()?.trim();

      if (!fid || fid === "N/A" || fid === "0") {
        hasMissingField = true;
        message =
          "Some records are missing the FID or SAP NO. Please update the Excel sheet accordingly.";
        // return true;
        break;
      }

      if (!date || date === "N/A" || date === "0") {
        hasMissingField = true;
        message =
          "Some records are missing the 'DATE'. Please update the Excel sheet accordingly.";
        // return true;
        break;
      }

      if (!workHrs || workHrs === "0" || workHrs === "N/A") {
        hasMissingField = true;
        message = `Normal working hours per day are missing for employee (SAP No: ${fid}). Please verify the employee's SAP No in the 'Employee Info' table.`;
        // return true;
        break;
      }
    }

    if (hasMissingField) {
      setAlertMessage(message);
      setShowConfirm(true);
      return true;
    } else {
      console.log("All required fields are filled. Proceeding...");
      // storeInitialData();
      return false;
      // Proceed with your action here
    }
  };

  const handleDecision = (decision) => {
    setShowConfirm(false);
    // if (decision === "Allowed") {
    storeInitialData(decision);
    // }
  };

  const storeInitialData = async (decision) => {
    if (decision === "Denied") return;
    const result =
      data &&
      data.length > 0 &&
      data.map((val) => {
        return {
          fileName: fileName,
          empName: val.NAME || "",
          fidNo: val.NO || "N/A",
          companyName: val.LOCATIONATTOP
            ? val.LOCATIONATTOP
            : val.LOCATION || "",
          location: val.LOCATION || "",
          trade: val.TRADE || "",
          date: val.DATE || "",
          totalNT: val.TOTALHOURS || "",
          totalOT: val.TOTALHOURS2 || "",
          totalNTOT: val.TOTALHOURS3 || "",
          normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || "0",
          actualWorkHrs: val.WORKINGHOURS || "",
          otTime: val.OT || "",
          remarks: val.REMARKS || "",
          empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
          assignBy: uploaderID,
          fileType: "Offshore",
          status: "Unsubmitted",
        };
      });

    let identifier = "create";
    let finalResult = result;
    let resultOfBadgeNo = await checkBadgeNoOrNWHPD(finalResult, decision);

    if (resultOfBadgeNo) return;
    const { filteredResults, deleteDuplicateData, duplicateData } =
      await UnlockVerifiedCellVS({
        finalResult,
        setLoadingMessForDelay,
        identifier,
        setShowDuplicateAlert: (val) => {
          showDuplicateAlertRef.current = val;
          setShowDuplicateAlert(val); // for UI
        },
        setCancelAction: (val) => {
          cancelActionRef.current = val;
          setCancelAction(val); // for UI
        },
      });
    setChangePopupMessage(filteredResults);
    setDuplicateRecord(duplicateData);

    if (filteredResults.length === finalResult.length) setCancelAction(false);

    if (
      (filteredResults && filteredResults.length > 0) ||
      (filteredResults && filteredResults.length === 0) ||
      deleteDuplicateData === "DuplicateDataDeletedSuccessfully"
    ) {
      let finalResult = filteredResults;

      let action = "create";
      setStorePreSubmitData({
        finalResult,
        toggleSFAMessage,
        setStoringMess,
        setData,
        Position,
        action,
      });
    } else {
      setLoadingMessForDelay(false);
    }
  };

  const saveNonMatchesData = async ({ storePreSubmitData }) => {
    const {
      finalResult,
      toggleSFAMessage,
      setStoringMess,
      setData,
      Position,
      action,
    } = storePreSubmitData;

    if (Array.isArray(finalResult) && finalResult.length === 0) return;

    await TimeSheetsCRUDoperations({
      finalResult,
      toggleSFAMessage,
      setStoringMess,
      setData,
      Position,
      action,
    });
    setLoadingMessForDelay(false);
    setStorePreSubmitData(null);
  };

  const toggleForRemarkFunc = () => {
    setToggleForRemark(!toggleForRemark);
  };

  useEffect(() => {
    if (showDuplicateAlert || cancelAction) return;

    if (
      Array.isArray(storePreSubmitData?.finalResult) &&
      storePreSubmitData?.finalResult.length > 0
    ) {
      saveNonMatchesData({
        storePreSubmitData,
      });
    }
  }, [showDuplicateAlert, cancelAction, storePreSubmitData]);

  const storeOnlySelectedItem = (data, action) => {
    if (action === "Approved") {
      setAllApprovedData((prevApprovedData) => {
        const updatedData = prevApprovedData.filter(
          (item) => item.id !== data.id
        );
        const updateStatus = { ...data, status: "Approved" };

        return [...updatedData, updateStatus];
      });
    } else if (action === "Rejected") {
      setPassSelectedData(data);
      setAllRejectedData((prevRejectedData) => {
        const updatedData = prevRejectedData.filter(
          (item) => item.id !== data.id
        );
        return [...updatedData, data];
      });
    }
  };

  const addRemarks = (data) => {
    const dataAlongWithRemark = allRejectedData.map((m) => {
      if (m.id === data.id) {
        return { ...data, REMARKS: data.REMARKS };
      } else {
        return m;
      }
    });

    setAllRejectedData(dataAlongWithRemark);
  };

  const removeExistingData = (data, action) => {
    if (action === "Approved") {
      const afterRemoved = allApprovedData.filter((fil) => fil.id !== data.id);
      setAllApprovedData(afterRemoved);
    } else if (action === "Rejected") {
      const afterRemoved = allRejectedData.filter((fil) => fil.id !== data.id);
      setAllRejectedData(afterRemoved);
    }
  };

  const removeCheckedItem = useCallback(() => {
    const mergedData = [...allApprovedData, ...allRejectedData];

    const afterRemoved = data?.filter(
      (val) => !mergedData.some((fil) => val.id === fil.id)
    );

    setData(afterRemoved);
    // setAllApprovedData([]);
    // setAllRejectedData([]);
  }, [allApprovedData, allRejectedData, data]);

  const convertToISODate = (dateString) => {
    try {
      const [year, month, day] = dateString.split("/");

      return `${month}/${year}/${day}`;
    } catch {}
  };

  useEffect(() => {
    if (secondaryData && secondaryData.length > 0) {
      setCurrentPage(1);
      let filteredData = [...secondaryData];
      if (searchQuery) {
        filteredData = searchQuery;
      }
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.DATE);

          itemDate?.setHours(0, 0, 0, 0);
          start?.setHours(0, 0, 0, 0);
          end?.setHours(0, 0, 0, 0);
          return itemDate >= start && itemDate <= end;
        });
      }
      if (selectedOption) {
        if (selectedOption === "All") {
          filteredData = filteredData;
        } else {
          filteredData = filteredData.filter(
            (item) => item.LOCATION === selectedOption
          );
        }
      }

      setData(filteredData);
    }
  }, [startDate, endDate, secondaryData, searchQuery, selectedOption]);

  const autoApproveFunction = useCallback(() => {
    if (!data || !Array.isArray(data)) return;

    // Create approved data
    const approveSelectedData = data.map((val) => ({
      ...val,
      status: "Approved",
    }));

    // Update approved data state
    setAllApprovedData(approveSelectedData);

    // Update checked items for all approved items
    const updatedCheckedItems = data.reduce((acc, val) => {
      acc[val.id] = true;
      return acc;
    }, {});
    setCheckedItems((prev) => ({
      ...prev,
      ...updatedCheckedItems,
    }));
  }, [data, setAllApprovedData, setCheckedItems]);

  const unCheckAllData = useCallback(() => {
    if (!data || !Array.isArray(data)) return;
    setAllApprovedData([]);
    const updatedCheckedItems = data.reduce((acc, val) => {
      acc[val.id] = false;
      return acc;
    }, {});
    setCheckedItems((prev) => ({
      ...prev,
      ...updatedCheckedItems,
    }));
  }, [data, setAllApprovedData, setCheckedItems]);

  useEffect(() => {
    try {
      if (!Array.isArray(empAndWorkInfo) || !Array.isArray(data)) return;

      // Create a map for quick lookup
      const empInfoMap = new Map();

      if (Array.isArray(empAndWorkInfo)) {
        empAndWorkInfo.forEach((item) => {
          const key = String(item?.sapNo)?.toUpperCase()?.trim();
          empInfoMap.set(key, item);
        });
      }

      const addedNWHPD =
        Array.isArray(data) &&
        data.map((val) => {
          const badgeKey = String(val?.NO)?.toUpperCase()?.trim();
          const workInfoItem = empInfoMap.get(badgeKey);

          const lastWorkHour =
            workInfoItem?.workHrs && Array.isArray(workInfoItem?.workHrs)
              ? workInfoItem?.workHrs[workInfoItem?.workHrs?.length - 1]
              : "0";

          return {
            ...val,
            NORMALWORKINGHRSPERDAY: lastWorkHour,
          };
        });

      setFinalData(addedNWHPD);
    } catch (err) {
      console.log("ERROR : ", err);
      const addedNWHPD =
        Array.isArray(data) &&
        data.map((val) => {
          return {
            ...val,
            NORMALWORKINGHRSPERDAY: "0",
          };
        });
      setFinalData(addedNWHPD);
    }
  }, [empAndWorkInfo, data]);

  const handleSelectItem = (option) => {
    setSelectedOption(option);
  };

  const safeData = finalData || [];
  const itemsPerPage = 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // currentData.sort((a, b) => a.NAME.localeCompare(b.NAME));
  visibleData = currentData;
  return (
    <div onClick={() => setIsOpen(false)}>
      {currentStatus ? (
        <div>
          <div className="flex justify-between w-full mr-7">
            <div>
              <DateFilter />
            </div>

            <div className="flex justify-between items-center gap-5 pt-5">
              {Array.isArray(ManagerData) &&
              ManagerData.length > 0 &&
              Array.isArray(visibleData) &&
              visibleData.length > 0 ? (
                <div className="flex justify-between items-center gap-3">
                  <p className="text_size_5 text-dark_grey">Approve All</p>
                  <input
                    type="checkbox"
                    id="exampleCheckbox"
                    className="h-4 w-4 cursor-pointer"
                    checked={isApprovedChecked}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setIsApprovedChecked(isChecked);
                      if (isChecked) {
                        autoApproveFunction();
                      } else {
                        unCheckAllData();
                      }
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              {/* Dropdown */}
              {/* <select
                className="border rounded p-2 w-full text-gray-700"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Select Category</option>
                {["Offshore", "Day Tripping", "Third Party Services"].map(
                  (cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  )
                )}
              </select> */}

              {Array.isArray(storeLocation) &&
              storeLocation?.length > 0 &&
              Array.isArray(ManagerData) &&
              ManagerData?.length > 0 ? (
                <LocationFilter
                  handleSelectItem={handleSelectItem}
                  storeLocation={storeLocation}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                />
              ) : null}

              <SearchBoxForTimeSheet
                allEmpDetails={data}
                searchResult={searchResult}
                secondaryData={secondaryData}
                Position={Position}
                placeholder="Sap No / Name"
              />
            </div>
          </div>

          <div className="table-container ">
            {/* w-[1190px] */}
            <table className="styled-table w-[100%]">
              {/*  */}
              <thead className="sticky-header border ">
                <tr className="text_size_5 h-16">
                  <td className="px-5 flex-1 text_size_7">S No.</td>
                  {AllFieldData?.tableHeader.map((header, index) => (
                    <td key={index} className="px-5 flex-1 text_size_7">
                      {header}
                    </td>
                  )) ?? (
                    <tr>
                      <td colSpan="100%" className="text-center">
                        No headers available
                      </td>
                    </tr>
                  )}

                  {!showStatusCol && (
                    <>
                      <td
                        className={`${
                          showRejectedItemTable === "Rejected"
                            ? "hidden"
                            : "px-5 flex-1 text_size_7"
                        }`}
                      >
                        STATUS
                      </td>
                      <td
                        className={`${
                          showRejectedItemTable === "Rejected"
                            ? "hidden"
                            : "px-5 flex-1 text_size_7"
                        }`}
                      >
                        APPROVE
                      </td>
                      <td
                        className={`${
                          showRejectedItemTable === "Rejected"
                            ? "hidden"
                            : "px-5 flex-1 text_size_7"
                        }`}
                      >
                        REJECT
                      </td>
                    </>
                  )}
                  {(submittedData && submittedData.length > 0) ||
                  (rejectTab && rejectTab) ? (
                    <td>Edited</td>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>

              <tbody>
                {visibleData && visibleData.length > 0
                  ? visibleData.map((value, index) => {
                      const renderRows = (m, ind) => {
                        const isStatusPending = m?.status === "Pending";
                        const serialNumber =
                          (currentPage - 1) * itemsPerPage + index + 1;
                        return (
                          <tr
                            key={index + 1}
                            className={`text-dark_grey h-[50px] text-sm rounded-sm shadow-md border-b-2 border-[#CECECE] bg-white hover:bg-[#f1f5f9] ${
                              excelData && excelData.length > 0
                                ? ""
                                : "cursor-pointer"
                            }`}
                            onClick={() => {
                              if (excelData && excelData.length > 0) {
                              } else {
                                toggleFunction();
                                editBLNG(m);
                                editFormTitleFunc();
                              }
                            }}
                          >
                            <td className="text-center px-4 flex-1">
                              {serialNumber}
                            </td>
                            <td className="text-start px-4 flex-1">
                              {m?.NAME}
                            </td>
                            <td className="text-start px-4 flex-1">
                              {m?.TRADE}
                            </td>
                            <td className="text-center px-4 flex-1">{m?.NO}</td>
                            <td className="text-start px-4 flex-1">
                              {m?.LOCATION}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {convertToISODate(m?.DATE)}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m?.TOTALHOURS || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m?.TOTALHOURS2 || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m?.TOTALHOURS3 || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m?.NORMALWORKINGHRSPERDAY || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m?.WORKINGHOURS || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m?.OT || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m?.REMARKS}
                            </td>

                            {isStatusPending && (
                              <React.Fragment>
                                <td
                                  className={`text-center px-4 flex-1 ${
                                    m?.status === "Approved"
                                      ? "text-[#0CB100]"
                                      : "text_size_8"
                                  }`}
                                >
                                  {m?.status}
                                </td>
                                <td>
                                  <input
                                    className="h-4 w-4 cursor-pointer"
                                    type="checkbox"
                                    checked={checkedItems[m.id] || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setCheckedItems((prev) => ({
                                          ...prev,
                                          [m.id]: e.target.checked,
                                        }));

                                        setCheckedItemsTwo((prev) => ({
                                          ...prev,
                                          [m.id]: false,
                                        }));
                                        storeOnlySelectedItem(m, "Approved");
                                        removeExistingData(m, "Rejected");
                                      } else {
                                        setCheckedItems((prev) => ({
                                          ...prev,
                                          [m.id]: false,
                                        }));
                                        removeExistingData(m, "Approved");
                                      }
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="h-4 w-4 cursor-pointer"
                                    type="checkbox"
                                    checked={checkedItemsTwo[m.id] || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setCheckedItemsTwo((prev) => ({
                                          ...prev,
                                          [m.id]: e.target.checked,
                                        }));

                                        setCheckedItems((prev) => ({
                                          ...prev,
                                          [m.id]: false,
                                        }));
                                        storeOnlySelectedItem(m, "Rejected");
                                        toggleForRemarkFunc();
                                        removeExistingData(m, "Approved");
                                      } else {
                                        setCheckedItemsTwo((prev) => ({
                                          ...prev,
                                          [m.id]: false,
                                        }));
                                        removeExistingData(m, "Rejected");
                                      }
                                    }}
                                  />
                                </td>
                              </React.Fragment>
                            )}

                            {(submittedData && submittedData.length > 0) ||
                            (rejectTab && rejectTab) ? (
                              <td
                                className="cursor-pointer px-4 py-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input
                                  type="checkbox"
                                  disabled={
                                    !selectedRows.some((r) => r.id === m.id)
                                  }
                                  checked={selectedRows.some(
                                    (r) => r.id === m.id
                                  )}
                                  onChange={() => handleCheckboxChange(m)}
                                />
                              </td>
                            ) : (
                              ""
                            )}
                          </tr>
                        );
                      };

                      return userIdentification === "Manager"
                        ? renderRows(value)
                        : userIdentification !== "Manager" && renderRows(value);
                    })
                  : (
                      <tr>
                        <td
                          colSpan="100%"
                          className="px-6 py-6 text-center text-dark_ash text_size_5 bg-white"
                        >
                          <p className="px-6 py-6">Please wait few seconds.</p>
                        </td>
                      </tr>
                    ) ?? (
                      <tr>
                        <td
                          colSpan="100%"
                          className="px-6 py-6 text-center text-dark_ash text_size_5 bg-white"
                        >
                          <p className="px-6 py-6">Please wait few seconds.</p>
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>
          <div
            className={`flex justify-between items-center my-5 mt-10 ${
              visibleData && visibleData.length > 0 ? "" : "hidden"
            }`}
          >
            <div className="flex-1"></div>
            <div className="flex-1 flex justify-center">
              <button
                className={`rounded px-3 py-2.5 w-52 bg-[#FEF116] text_size_5 text-dark_grey ${
                  selectedRows && selectedRows.length > 0
                    ? "bg-[#FEF116]"
                    : (allApprovedData && allApprovedData.length > 0) ||
                      (allRejectedData && allRejectedData.length > 0)
                    ? "bg-[#FEF116]"
                    : excelData
                    ? "bg-[#FEF116]"
                    : "bg-[#eee542] cursor-not-allowed"
                }`}
                disabled={
                  userIdentification !== "Manager"
                    ? !(selectedRows?.length > 0 || excelData)
                    : !(
                        allApprovedData?.length > 0 ||
                        allRejectedData?.length > 0
                      )
                }
                onClick={() => {
                  if (userIdentification !== "Manager") {
                    if (
                      Array.isArray(selectedRows) &&
                      selectedRows?.length > 0
                    ) {
                      let tempVar = null;

                      if (Array.isArray(finalData) && finalData.length > 0) {
                        finalData?.forEach((val) => {
                          if (
                            parseFloat(val?.WORKINGHOURS) >
                              parseFloat(val?.NORMALWORKINGHRSPERDAY) &&
                            !tempVar
                          ) {
                            tempVar = true;
                          }
                        });
                      }

                      if (tempVar === true) {
                        alert(
                          `Working hours cannot be greater than 'Normal Working Hrs Per Day`
                        );
                        return;
                      }
                      toggleFunctionForAssiMana();
                    } else if (excelData && excelData) {
                      storeInitialData();
                    }
                  } else if (userIdentification === "Manager") {
                    removeCheckedItem();
                    renameKeysFunctionAndSubmit();

                    // setCheckedItems({});
                  }
                }}
              >
                {userIdentification === "Manager"
                  ? "Finalize and Submit"
                  : submittedData && submittedData.length > 0
                  ? "Assign Manager"
                  : showRejectedItemTable === "Rejected"
                  ? "Assign Manager"
                  : "Submit"}
              </button>
            </div>
            <div className="flex-1">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {currentStatus === false && closePopup === true && (
        <PopupForMissMatchExcelSheet setClosePopup={setClosePopup} />
      )}
      {toggleHandler === true && (
        <EditTimeSheet
          toggleFunction={toggleFunction}
          editObject={editObject}
          fieldObj={AllFieldData?.fieldObj || {}}
          fields={AllFieldData?.fields || []}
          tableHeader={AllFieldData?.tableHeader || []}
          editFunction={editOffShoreFunction}
          titleName={titleName}
          Position={Position}
          handleSubmit={handleSubmit}
          editFormTitle={editFormTitle}
          empAndWorkInfo={empAndWorkInfo}
        />
      )}
      {storingMess === true ? (
        <PopupForSFApproves
          toggleSFAMessage={toggleSFAMessage}
          icons={<IoCheckmarkCircleSharp />}
          iconColor="text-[#2BEE48]"
          textColor="text-[#05b01f]"
          title={"Processing..."}
          message={`Data is being saved, `}
          messageTwo={"This might take a few seconds..."}
          // btnText={"OK"}
        />
      ) : storingMess === false ? (
        <SuccessMessage
          successMess={successMess}
          toggleSFAMessage={toggleSFAMessage}
          setExcelData={setExcelData}
          userIdentification={userIdentification}
        />
      ) : (
        ""
      )}

      {toggleAssignManager === true && (
        <PopupForAssignManager
          toggleFunctionForAssiMana={toggleFunctionForAssiMana}
          renameKeysFunctionAndSubmit={renameKeysFunctionAndSubmit}
          mergedData={mergedData}
        />
      )}

      {toggleForRemark === true && (
        <PopupForAddRemark
          toggleForRemarkFunc={toggleForRemarkFunc}
          addRemarks={addRemarks}
          passSelectedData={passSelectedData}
          addEditedRemarks={addEditedRemarks}
        />
      )}

      {notification && (
        <TimeSheetSpinner
          text={showTitle}
          // notification={notification}
          // path="/timesheetSBW"
        />
      )}

      {loadingMessForDelay && (
        <TimeSheetSpinner
          text={"Please wait a few seconds..."}
          // notification={notification}
          // path="/timesheetSBW"
        />
      )}

      {showDuplicateAlert && popupMess ? (
        <PopupForDuplicateFileAlert
          onClose={() => {
            showDuplicateAlertRef.current = false;
            setShowDuplicateAlert(false);
          }}
          setCancelAction={(val) => {
            cancelActionRef.current = val;
            setCancelAction(val);
            setCurrentStatus(null);
          }}
          fileNameForSuccessful={fileName}
          title={"Duplicate Detection"}
          message={popupMess.message}
          buttonName={popupMess.buttonName}
          popupIdentification="duplicateRecords"
          onClearData={() => {
            setCurrentStatus(null);
            setData(null);
            setExcelData(null);
          }}
        />
      ) : (
        ""
      )}

      {showConfirm && (
        <PopupForCheckBadgeNo
          handleDecision={handleDecision}
          alertMessage={alertMessage}
        />
      )}

      {/* <button
        className="text_size_5 text-dark_grey px-3 py-2 rounded bg-yellow"
        onClick={async () => {
          try {
            console.log("Fetching and Deleting BLNG Data...");
            let nextToken = null;
            let deleteCount = 0; // 🟢 Counter to track deletions

            do {
              const filter = {
                and: [{ fileType: { eq: "Offshore" } }],
              };

              const response = await client.graphql({
                query: listTimeSheets,
                variables: {
                  filter: filter,
                  nextToken: nextToken,
                  limit: 1000, // optional: ensure limit is large enough
                },
              });

              const SBWdata = response?.data?.listTimeSheets?.items || [];
              nextToken = response?.data?.listTimeSheets?.nextToken;

              console.log(
                `Fetched ${SBWdata.length} BLNG items in this batch.`
              );

              await Promise.all(
                SBWdata.map(async (item) => {
                  try {
                    const deleteResponse = await client.graphql({
                      query: deleteTimeSheet,
                      variables: { input: { id: item.id } },
                    });
                    deleteCount++; // ✅ Increment counter
                    console.log(`Deleted item ID: ${item.id}`);
                  } catch (deleteError) {
                    console.error(
                      `Error deleting item with ID ${item.id}:`,
                      deleteError
                    );
                  }
                })
              );

              console.log(
                `Batch deletion completed. Total deleted so far: ${deleteCount}`
              );
            } while (nextToken);

            console.log(
              `✅ All BLNG items deletion process completed. Total deleted: ${deleteCount}`
            );
          } catch (fetchError) {
            console.error("❌ Error in fetchDataAndDelete:", fetchError);
          }
        }}
      >
        Delete Offshore Data
      </button> */}
    </div>
  );
};
