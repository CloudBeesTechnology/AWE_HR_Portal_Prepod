import React, { useCallback, useEffect, useRef, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";

import { generateClient } from "@aws-amplify/api";
import { EditTimeSheet } from "./EditTimeSheet";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";

import { useTableMerged } from "./customTimeSheet/UserTableMerged";
import "../../../src/index.css";

import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
import { createTimeSheet, deleteTimeSheet } from "../../graphql/mutations";

import { PopupForAddRemark } from "./ModelForSuccessMess/PopupForAddRemark";
import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";
import { PopupForSFApproves } from "./ModelForSuccessMess/PopupForSFApproves";
import { useTempID } from "../../utils/TempIDContext";
import { DateFilter } from "./timeSheetSearch/DateFilter";
import { SpinLogo } from "../../utils/SpinLogo";
import { Pagination } from "./timeSheetSearch/Pagination";
import { AutoFetchForAssignManager } from "./customTimeSheet/AutoFetchForAssignManager";
import { TimeSheetsCRUDoperations } from "./customTimeSheet/TimeSheetsCRUDoperations";
import { listTimeSheets } from "../../graphql/queries";
import { useRowSelection } from "./customTimeSheet/useRowSelection";
import { useNavigate } from "react-router-dom";
import { useCreateNotification } from "../../hooks/useCreateNotification";
import { TimeSheetSpinner } from "./customTimeSheet/TimeSheetSpinner";
import { UnlockVerifiedCellVS } from "./customTimeSheet/UnlockVerifiedCellVS";
import { use } from "react";
import PopupForDuplicateFileAlert from "./ModelForSuccessMess/PopupForDuplicateFileAlert";
import { useTableMergedData } from "./customTimeSheet/useTableMergedData";
import PopupForCheckBadgeNo from "./ModelForSuccessMess/PopupForCheckBadgeNo";
const client = generateClient();

export const ViewHOsheet = ({
  setExcelData,
  excelData,
  returnedTHeader,
  Position,

  titleName,
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

  const [closePopup, setClosePopup] = useState(false);
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [editObject, setEditObject] = useState();
  const [toggleHandler, setToggleHandler] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [toggleAssignManager, setToggleAssignManager] = useState(false);

  const [userIdentification, setUserIdentification] = useState("");
  const [showStatusCol, setShowStatusCol] = useState(null);
  const [successMess, setSuccessMess] = useState(null);
  const [loadingMessForDelay, setLoadingMessForDelay] = useState(null);

  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItemsTwo, setCheckedItemsTwo] = useState({});
  const [editFormTitle, setEditFormTitle] = useState("");
  const [rejectTab, setRejectTab] = useState(false);
  const [changePopupMessage, setChangePopupMessage] = useState(null);
  const [popupMess, setPopupMess] = useState({});

  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [toggleForRemark, setToggleForRemark] = useState(null);
  const [allApprovedData, setAllApprovedData] = useState([]);
  const [allRejectedData, setAllRejectedData] = useState([]);
  const [passSelectedData, setPassSelectedData] = useState(null);
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [cancelAction, setCancelAction] = useState(false);
  const [storePreSubmitData, setStorePreSubmitData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  let visibleData;
  const [finalData, setFinalData] = useState([]);
  const [storingMess, setStoringMess] = useState(null);

  const { data: processedData } = useTableMerged(excelData);
  const { empAndWorkInfo } = useTableMergedData();

  const mergedData = AutoFetchForAssignManager();

  const { startDate, endDate, searchQuery, setSearchQuery } = useTempID();
  const { selectedRows, setSelectedRows, handleCheckboxChange, handleSubmit } =
    useRowSelection();
  const { createNotification } = useCreateNotification();
  useEffect(() => {
    if (submittedData && submittedData.length > 0) {
      setShowStatusCol(true);
      setCurrentStatus(true);

      setData(submittedData);
      setSecondaryData(submittedData);
    }
  }, [submittedData]);

  useEffect(() => {
    if (processedData && processedData.length > 0) {
      setData(processedData);
      setSecondaryData(processedData);
    }
  }, [processedData]);

  useEffect(() => {
    const getPosition = localStorage.getItem("userType");
    if (getPosition === "Manager") {
      setUserIdentification("Manager");
    } else if (getPosition !== "Manager") {
      setUserIdentification("TimeKeeper");
    }
  }, [wholeData]);

  const pendingData = (data) => {
    if (data && data?.length > 0) {
      setCurrentStatus(true);

      const result =
        data &&
        data?.map((val) => {
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
            REC: val.rec || 0,
            CTR: val.ctr || "",
            DEPT: val.empDept || "",
            EMPLOYEEID: val.empID || "",
            BADGE: val.empBadgeNo || "",
            NAME: val.empName || 0,
            DATE: val.date || "",
            ONAM: val.onAM || "",
            OFFAM: val.offAM || "",
            ONPM: val.onPM || 0,
            OFFPM: val.offPM || 0,
            IN: val?.inTime || 0,
            OUT: val.outTime || 0,
            TOTALINOUT: val.totalInOut || "",
            ALLDAYMINUTES: val.allDayHrs || "",
            NETMINUTES: val.netMins || "",
            TOTALHOURS: val.totalHrs || "",
            NORMALWORKINGHRSPERDAY: val?.normalWorkHrs || 0,
            WORKINGHOURS: val?.actualWorkHrs || 0,
            OT: val?.otTime || 0,
            TOTALACTUALHOURS: val.actualWorkHrs || "",
            jobLocaWhrs: parsedEmpWorkInfo.flat() || [],
            fileType: val.fileType,
            timeKeeper: val.assignBy,
            manager: val.assignTo,
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
      const convertKeys = (obj) => {
        return Object.keys(obj).reduce((acc, key) => {
          const newKey = key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
          acc[newKey] = obj[key];
          return acc;
        }, {});
      };

      const convertedData = returnedTHeader.map(convertKeys);

      const requiredKeys = [
        "REC",
        "CTR",
        "DEPT",
        "EMPLOYEEID",
        "BADGE",
        "NAME",
        // "DATE",
        // "ONAM",
        // "OFFAM",
        // "ONPM",
        // "OFFPM",
        // "IN",
        // "OUT",
        // "TOTALINOUT",
        // "ALLDAYMINUTES",
        // "NETMINUTES",
        // "TOTALHOURS",
        // "TOTALACTUALHOURS",
        // "REMARKS",
      ];

      const checkedKeys = () => {
        return new Promise((resolve) => {
          const keyCheckResult = convertedData.every((item) =>
            requiredKeys.every((key) =>
              Object.keys(item)
                .map((k) => k.toLowerCase())
                .includes(key.toLowerCase())
            )
          );
          resolve(keyCheckResult);
        });
      };

      // Usage
      const result = await checkedKeys();

      setClosePopup(true);
      setCurrentStatus(result);
      setShowStatusCol(result);
      // setLoading(false);
    };

    if (returnedTHeader && returnedTHeader.length > 0) {
      checkKeys();
    } else if (!returnedTHeader && showRejectedItemTable !== "Rejected") {
      const fetchData = async () => {
        setCurrentStatus(true);

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
          }
        } catch (err) {
        } finally {
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
      // setLoading(false);
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
        if (val.BADGE === getObject.BADGE && val.DATE === getObject.DATE) {
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
      if (
        val.EMPLOYEEID === getObject.EMPLOYEEID &&
        val.DATE === getObject.DATE
      ) {
        return getObject;
      } else {
        return val;
      }
    });
  };

  const editHOFunction = (getObject) => {
    const result = Array.isArray(data[0]?.data)
      ? editNestedData(data, getObject)
      : editFlatData(data, getObject);

    const updatedData = result?.map((item) => {
      if (Array.isArray(item?.jobLocaWhrs) && item?.jobLocaWhrs?.length > 0) {
        item.LOCATION = item?.jobLocaWhrs[0]?.LOCATION;
      } else {
        item.LOCATION = null;
      }
      return item;
    });
    setData(updatedData);
  };

  const handleAssignManager = async () => {
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

  const AllfieldData = useTableFieldData(titleName);

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
            rec: val.REC || "",
            ctr: val.CTR || "",
            empDept: val.DEPT || "",
            empID: val.EMPLOYEEID || "",
            empBadgeNo: val.BADGE || "",
            empName: val.NAME || "",
            date: val.DATE || "",
            onAM: val.ONAM || "",
            offAM: val.OFFAM || "",
            onPM: val.ONPM || "",
            offPM: val.OFFPM || "",
            inTime: val.IN || "",
            outTime: val.OUT || "",
            totalInOut: val.TOTALINOUT || "",
            allDayHrs: val.ALLDAYMINUTES || "",
            netMins: val.NETMINUTES || "",
            totalHrs: val.TOTALHOURS || "",
            normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
            actualWorkHrs: val?.WORKINGHOURS || 0,
            otTime: val?.OT || 0,
            actualWorkHrs: val.TOTALACTUALHOURS || "",
            empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
            fileType: "HO",
            status: "Pending",
            remarks: val.REMARKS || "",
            companyName: val?.LOCATION,
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

      const InitialBLNGUpdate =
        uniqueArray && uniqueArray.length > 0
          ? uniqueArray.map((val) => {
              return {
                id: val.id,
                // fileName: val.fileName,
                rec: val.REC || "",
                ctr: val.CTR || "",
                empDept: val.DEPT || "",
                empID: val.EMPLOYEEID || "",
                empBadgeNo: val.BADGE || "",
                empName: val.NAME || "",
                date: val.DATE || "",
                onAM: val.ONAM || "",
                offAM: val.OFFAM || "",
                onPM: val.ONPM || "",
                offPM: val.OFFPM || "",
                inTime: val.IN || "",
                outTime: val.OUT || "",
                totalInOut: val.TOTALINOUT || "",
                allDayHrs: val.ALLDAYMINUTES || "",
                netMins: val.NETMINUTES || "",
                totalHrs: val.TOTALHOURS || "",
                normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
                actualWorkHrs: val?.WORKINGHOURS || 0,
                otTime: val?.OT || 0,
                actualWorkHrs: val.TOTALACTUALHOURS || "",
                empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
                fileType: "HO",
                status: val.status,
                remarks: val.REMARKS || "",
              };
            })
          : [];

      let finalResult = InitialBLNGUpdate;

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
                rec: val.REC || "",
                ctr: val.CTR || "",
                empDept: val.DEPT || "",
                empID: val.EMPLOYEEID || "",
                empBadgeNo: val.BADGE || "",
                empName: val.NAME || "",
                date: val.DATE || "",
                onAM: val.ONAM || "",
                offAM: val.OFFAM || "",
                onPM: val.ONPM || "",
                offPM: val.OFFPM || "",
                inTime: val.IN || "",
                outTime: val.OUT || "",
                totalInOut: val.TOTALINOUT || "",
                allDayHrs: val.ALLDAYMINUTES || "",
                netMins: val.NETMINUTES || "",
                totalHrs: val.TOTALHOURS || "",
                normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
                actualWorkHrs: val?.WORKINGHOURS || 0,
                otTime: val?.OT || 0,
                actualWorkHrs: val.TOTALACTUALHOURS || "",
                empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
                fileType: "HO",
                status: "Pending",
                remarks: val.REMARKS || "",
                companyName: val?.LOCATION,
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
    if (changePopupMessage && changePopupMessage.length > 0) {
      setPopupMess({
        message:
          "Some data in the uploaded Excel sheet has already been submitted by the Time Keeper. You may proceed to submit only the remaining unmatched data.",
        buttonName: "Save",
      });
    } else if (changePopupMessage && changePopupMessage.length === 0) {
      setPopupMess({
        message:
          "All data in the uploaded Excel sheet has already been submitted by the Time Keeper.",
        buttonName: "OK",
      });
    }
  }, [changePopupMessage]);

  // Checking BadgeNo and NWHPD is exists in the submitteded data or not.
  const checkBadgeNoOrNWHPD = async (data, decision) => {
    if (decision === "Allowed") return false;
    let hasMissingField = false;
    let message = "";

    for (let emp of data) {
      const badge = emp?.empBadgeNo?.toString()?.trim();
      const workHrs = emp?.normalWorkHrs?.toString()?.trim();
      const date = emp?.date?.toString()?.trim();

      if (!badge || badge === "N/A" || badge === "0") {
        hasMissingField = true;
        message =
          "Some records are missing the Badge Number. Please update the Excel sheet accordingly.";
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
        message =
          "One or more records have missing 'Normal Working Hours Per Day'.";
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
      data.map((val) => {
        return {
          fileName: fileName,
          rec: val.REC || "",
          ctr: val.CTR || "",
          empDept: val.DEPT || "",
          empID: val.EMPLOYEEID || "",
          empBadgeNo: val.BADGE || "N/A",
          empName: val.NAME || "",
          date: val.DATE || "",
          onAM: val.ONAM || "",
          offAM: val.OFFAM || "",
          onPM: val.ONPM || "",
          offPM: val.OFFPM || "",
          inTime: val.IN || "",
          outTime: val.OUT || "",
          totalInOut: val.TOTALINOUT || "",
          allDayHrs: val.ALLDAYMINUTES || "",
          netMins: val.NETMINUTES || "",
          totalHrs: val.TOTALHOURS || "",
          normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || "0",
          actualWorkHrs: val?.WORKINGHOURS || 0,
          otTime: val?.OT || 0,
          actualWorkHrs: val.TOTALACTUALHOURS || "",
          empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
          fileType: "HO",
          status: "Unsubmitted",
          assignBy: uploaderID,
          remarks: val.REMARKS || "",
          companyName: val?.LOCATION || "",
        };
      });

    let identifier = "create";
    let finalResult = result;

    let resultOfBadgeNo = await checkBadgeNoOrNWHPD(finalResult, decision);

    if (resultOfBadgeNo) return;

    const { filteredResults, deleteDuplicateData } = await UnlockVerifiedCellVS(
      {
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
      }
    );
    setChangePopupMessage(filteredResults);

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
    // setSecondaryData(afterRemoved);
    // setAllApprovedData([]);
    // setAllRejectedData([]);
  }, [allApprovedData, allRejectedData, data]);

  const convertDateFormat = (inputDateStr) => {
    if (inputDateStr) {
      const [day, month, year] = inputDateStr?.split("/");

      // Convert string to numbers to remove any leading zeros
      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10);

      return `${monthNum}/${dayNum}/${year}`;
    }
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

      setData(filteredData);
    }
  }, [startDate, endDate, secondaryData, searchQuery]);

  useEffect(() => {
    try {
      if (!Array.isArray(empAndWorkInfo) || !Array.isArray(data)) return;
      // Create a map for quick lookup
      const empInfoMap = new Map();

      if (Array.isArray(empAndWorkInfo)) {
        empAndWorkInfo.forEach((item) => {
          empInfoMap?.set(String(item?.empBadgeNo).toUpperCase(), item);
        });
      }

      // Process visibleData
      const addedNWHPD =
        Array.isArray(data) &&
        data.map((val) => {
          const badgeKey = String(val?.BADGE).toUpperCase();
          const workInfoItem = empInfoMap?.get(badgeKey);

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

  const itemsPerPage = 100;
  const safeData = finalData || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // currentData.sort((a, b) => a.NAME.localeCompare(b.NAME));
  visibleData = currentData;

  return (
    <div>
      <div>
        {currentStatus === true ? (
          <div>
            <div className="flex justify-between w-full mr-7">
              <div>
                <DateFilter />
              </div>
              <div className="pt-5">
                <SearchBoxForTimeSheet
                  allEmpDetails={data}
                  searchResult={searchResult}
                  secondaryData={secondaryData}
                  Position={Position}
                  placeholder="Employee ID / Badge No / Name"
                />
              </div>
            </div>
            <div className="table-container">
              <table className="styled-table w-[100%]">
                <thead className="sticky-header">
                  <tr className="text_size_5 h-16">
                    <td className="px-4 flex-1 text_size_7">S No.</td>
                    {AllfieldData?.tableHeader
                      ?.filter((header) => header !== "REC#")
                      .map((header, index) => (
                        <td key={index} className="px-4 flex-1 text_size_7">
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
                  {visibleData && visibleData?.length > 0
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
                              {/* <td className="text-start px-4 flex-1">
                                {m?.REC}
                              </td> */}
                              <td className="text-center px-4 flex-1">
                                {m?.CTR}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.DEPT}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.EMPLOYEEID}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.BADGE || "N/A"}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.NAME}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {/* {convertToISODate(m?.DATE)} */}
                                {convertDateFormat(m?.DATE)}
                                {/* {m?.DATE} */}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.ONAM}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.OFFAM}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.ONPM}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.OFFPM}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.IN || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.OUT || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.TOTALINOUT || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.ALLDAYMINUTES || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.NETMINUTES || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.TOTALHOURS || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.NORMALWORKINGHRSPERDAY || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.TOTALACTUALHOURS || 0}
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
                                      className="h-4 w-4"
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
                                      className="h-4 w-4"
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
                                          removeExistingData(m, "Rejected");
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
                          : userIdentification !== "Manager" &&
                              renderRows(value);
                        // : setData(null);
                      })
                    : (
                        <tr>
                          <td
                            colSpan="100%"
                            className="px-6 py-6 text-center text-dark_ash text_size_5 bg-white  "
                          >
                            <p className="px-6 py-6">
                              Please wait few seconds.
                            </p>
                          </td>
                        </tr>
                      ) ?? (
                        <tr>
                          <td
                            colSpan="100%"
                            className="px-6 py-6 text-center text-dark_ash text_size_5 bg-white"
                          >
                            <p className="px-6 py-6">
                              Please wait few seconds.
                            </p>
                          </td>
                        </tr>
                      )}
                </tbody>
              </table>
            </div>
            <div
              className={`flex justify-between items-center my-5 mt-10  ${
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
                      if (selectedRows && selectedRows.length > 0) {
                        toggleFunctionForAssiMana();
                      } else if (excelData && excelData) {
                        storeInitialData();
                      }

                      // const fetchDataAndDelete = async () => {
                      //   try {
                      //     console.log("Fetching and Deleting SBW Data...");
                      //     // setIsDeleting(true); // Set loading state
                      //     let nextToken = null; // Initialize nextToken for pagination
                      //     do {
                      //       // Define the filter for fetching SBW data
                      //       const filter = {
                      //         and: [{ fileType: { eq: "HO" } }],
                      //       };
                      //       // Fetch the BLNG data using GraphQL with pagination
                      //       const response = await client.graphql({
                      //         query: listTimeSheets,
                      //         variables: {
                      //           filter: filter,
                      //           nextToken: nextToken,
                      //         }, // Pass nextToken for pagination
                      //       });
                      //       // Extract data and nextToken
                      //       const SBWdata =
                      //         response?.data?.listTimeSheets?.items || [];
                      //       nextToken =
                      //         response?.data?.listTimeSheets?.nextToken; // Update nextToken for the next fetch
                      //       console.log("Fetched SBW Data:", SBWdata);
                      //       // Delete each item in the current batch
                      //       await Promise.all(
                      //         SBWdata.map(async (item) => {
                      //           try {
                      //             const deleteResponse = await client.graphql({
                      //               query: deleteTimeSheet,
                      //               variables: { input: { id: item.id } },
                      //             });
                      //             console.log(
                      //               "Deleted Item Response:",
                      //               deleteResponse
                      //             );
                      //           } catch (deleteError) {
                      //             console.error(
                      //               `Error deleting item with ID ${item.id}:`,
                      //               deleteError
                      //             );
                      //           }
                      //         })
                      //       );
                      //       console.log("Batch deletion completed.");
                      //     } while (nextToken); // Continue fetching until no more data
                      //     console.log(
                      //       "All HO items deletion process completed."
                      //     );
                      //   } catch (fetchError) {
                      //     console.error(
                      //       "Error in fetchDataAndDelete:",
                      //       fetchError
                      //     );
                      //   } finally {
                      //     // setIsDeleting(false); // Reset loading state
                      //   }
                      // };

                      // fetchDataAndDelete();
                    } else if (userIdentification === "Manager") {
                      renameKeysFunctionAndSubmit();
                      removeCheckedItem();
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
        ) : currentStatus === false && closePopup === true ? (
          <PopupForMissMatchExcelSheet setClosePopup={setClosePopup} />
        ) : (
          ""
        )}
      </div>
      {toggleHandler === true && (
        <EditTimeSheet
          toggleFunction={toggleFunction}
          editObject={editObject}
          fieldObj={AllfieldData?.fieldObj || {}}
          fields={AllfieldData?.fields || []}
          tableHeader={AllfieldData?.tableHeader || []}
          editFunction={editHOFunction}
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
        className="border rounded text-dark_grey bg-primary px-2 py-1"
        onClick={() => {
          const fetchDataAndDelete = async () => {
            try {
              console.log("Fetching and Deleting SBW Data...");
              // setIsDeleting(true); // Set loading state
              let nextToken = null; // Initialize nextToken for pagination
              do {
                // Define the filter for fetching SBW data
                const filter = {
                  and: [{ fileType: { eq: "HO" } }],
                };
                // Fetch the BLNG data using GraphQL with pagination
                const response = await client.graphql({
                  query: listTimeSheets,
                  variables: {
                    filter: filter,
                    nextToken: nextToken,
                  }, // Pass nextToken for pagination
                });
                // Extract data and nextToken
                const SBWdata = response?.data?.listTimeSheets?.items || [];
                nextToken = response?.data?.listTimeSheets?.nextToken; // Update nextToken for the next fetch
                console.log("Fetched SBW Data:", SBWdata);
                // Delete each item in the current batch
                await Promise.all(
                  SBWdata.map(async (item) => {
                    try {
                      const deleteResponse = await client.graphql({
                        query: deleteTimeSheet,
                        variables: { input: { id: item.id } },
                      });
                      console.log("Deleted Item Response:", deleteResponse);
                    } catch (deleteError) {
                      console.error(
                        `Error deleting item with ID ${item.id}:`,
                        deleteError
                      );
                    }
                  })
                );
                console.log("Batch deletion completed.");
              } while (nextToken); // Continue fetching until no more data
              console.log("All HO items deletion process completed.");
            } catch (fetchError) {
              console.error("Error in fetchDataAndDelete:", fetchError);
            } finally {
              // setIsDeleting(false); // Reset loading state
            }
          };

          fetchDataAndDelete();
        }}
      >
        Delete
      </button> */}
    </div>
  );
};
