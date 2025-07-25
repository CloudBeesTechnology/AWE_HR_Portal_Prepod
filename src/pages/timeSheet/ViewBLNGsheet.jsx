import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { EditTimeSheet } from "./EditTimeSheet";
import { generateClient } from "@aws-amplify/api";

import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listTimeSheets,
} from "../../graphql/queries";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";

import "../../../src/index.css";
import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
import {
  createTimeSheet,
  deleteTimeSheet,
  updateTimeSheet,
} from "../../graphql/mutations";

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

export const ViewBLNGsheet = ({
  excelData,
  returnedTHeader,
  convertedStringToArrayObj,
  titleName,
  setExcelData,
  Position,
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
  const [currentStatus, setCurrentStatus] = useState(null);

  const [editObject, setEditObject] = useState();
  const [toggleHandler, setToggleHandler] = useState(false);
  const [toggleAssignManager, setToggleAssignManager] = useState(false);
  const [userIdentification, setUserIdentification] = useState("");
  const [successMess, setSuccessMess] = useState(null);
  const [loadingMessForDelay, setLoadingMessForDelay] = useState(null);

  const [response, setResponse] = useState(null);
  const [showStatusCol, setShowStatusCol] = useState(null);
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");

  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [cancelAction, setCancelAction] = useState(false);
  const [storePreSubmitData, setStorePreSubmitData] = useState(null);

  const [rejectTab, setRejectTab] = useState(false);
  const [editFormTitle, setEditFormTitle] = useState("");
  const [storeLocation, setStoreLocation] = useState(["All"]);
  const [isOpen, setIsOpen] = useState(false);
  const [isApprovedChecked, setIsApprovedChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [changePopupMessage, setChangePopupMessage] = useState(null);
  const [popupMess, setPopupMess] = useState({});

  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [toggleForRemark, setToggleForRemark] = useState(null);
  const [allApprovedData, setAllApprovedData] = useState([]);
  const [allRejectedData, setAllRejectedData] = useState([]);
  const [passSelectedData, setPassSelectedData] = useState(null);
  const [approveMessage, setApproveMessage] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItemsTwo, setCheckedItemsTwo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  let visibleData;
  const [finalData, setFinalData] = useState([]);
  const mergedData = AutoFetchForAssignManager();
  const [storingMess, setStoringMess] = useState(null);

  const { startDate, endDate, searchQuery, setSearchQuery } = useTempID();
  const { selectedRows, setSelectedRows, handleCheckboxChange, handleSubmit } =
    useRowSelection();
  const { createNotification } = useCreateNotification();
  const { empAndWorkInfo } = useTableMergedData();
  useEffect(() => {
    try {
      if (excelData) {
        const fetchData = async () => {
          // setLoading is removed
          try {
            const dataPromise = new Promise((resolve, reject) => {
              if (excelData) {
                resolve(excelData);
              } else {
                setTimeout(() => {
                  reject("No data found after waiting.");
                }, 5000);
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

                const items =
                  response.data[Object.keys(response.data)[0]].items;
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
                        String(item?.empID).toUpperCase() ===
                        String(empInf?.empID).toUpperCase()
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
                      String(info?.sapNo).toUpperCase() ===
                      String(item?.FID).toUpperCase()
                  );

                  return {
                    ...item,
                    NORMALWORKINGHRSPERDAY: workInfoItem
                      ? workInfoItem?.workHrs[workInfoItem.workHrs.length - 1]
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
      }
    } catch (err) {}
  }, [excelData]);

  useEffect(() => {
    if (submittedData && submittedData.length > 0) {
      setShowStatusCol(true);
      setCurrentStatus(true);

      setData(submittedData);
      setSecondaryData(submittedData);
    }
  }, [submittedData]);

  useEffect(() => {
    const getPosition = localStorage.getItem("userType");
    if (getPosition === "Manager") {
      setUserIdentification("Manager");
    } else if (getPosition === "TimeKeeper") {
      setUserIdentification("TimeKeeper");
    }
  }, [convertedStringToArrayObj]);

  const pendingData = (data) => {
    if (data && data.length > 0) {
      setCurrentStatus(true);

      const CHUNK_SIZE = 1000;
      let index = 0;
      const result = [];

      const processChunk = () => {
        const chunk = data.slice(index, index + CHUNK_SIZE);
        const processedChunk = chunk.map((val) => {
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
            FID: val.fidNo || 0,
            NAMEFLAST: val.empName || "",
            ENTRANCEDATEUSED: val.date || "",
            ENTRANCEDATETIME: val.inTime?.replace(/[\[\]]/g, "") || "",
            EXITDATETIME: val.outTime?.replace(/[\[\]]/g, "") || "",
            AVGDAILYTOTALBYDAY: val.avgDailyTD || "",
            AHIGHLIGHTDAILYTOTALBYGROUP: val.totalHrs || "",
            ADININWORKSENGINEERINGSDNBHD: val.aweSDN || "",
            WORKINGHOURS: val.actualWorkHrs || 0,
            OT: val.otTime || 0,
            NORMALWORKINGHRSPERDAY: val?.normalWorkHrs || 0,
            jobLocaWhrs: parsedEmpWorkInfo.flat() || [],
            fileType: val.fileType,
            timeKeeper: val.assignBy,
            manager: val.assignTo,
            REMARKS: val.remarks || "",
            status: val.status || "",
          };
        });

        result.push(...processedChunk);
        index += CHUNK_SIZE;

        if (index < data.length) {
          setTimeout(processChunk, 0);
        } else {
          setData(result);
          setSecondaryData(result);
        }
      };

      processChunk();
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
      // const cleanData = returnedTHeader.map((item) => {
      //   const cleanedItem = {};
      //   for (const key in item) {
      //     cleanedItem[key] = cleanValue(item[key]);
      //   }

      //   return cleanedItem;
      // });
      const convertKeys = (obj) => {
        return Object.keys(obj).reduce((acc, key) => {
          const newKey = key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
          acc[newKey] = obj[key];
          return acc;
        }, {});
      };

      const convertedData = returnedTHeader.map(convertKeys);

      const requiredKeys = [
        "ADININWORKSENGINEERINGSDNBHD",
        "FID",
        "NameFLAST",
        "EntranceDateUsed",
        "EntranceDatetime",
        "ExitDatetime",
        "DayDifference",
        "AvgDailyTotalByDay",
        "AHighlightDailyTotalByGroup",
        // "WORKINGHOURS",
        // "OT",
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
      // const result = await new Promise((resolve) => {
      //   const keyCheckResult =
      //     cleanData &&
      //     cleanData.every((m) => {
      //       return requiredKeys.every((key) =>
      //         Object.values(m)
      //           .map((value) =>
      //             typeof value === "string" ? value.toUpperCase() : value
      //           )
      //           .includes(key.toUpperCase())
      //       );
      //     });
      //   resolve(keyCheckResult);
      // });

      setClosePopup(true);
      setShowStatusCol(result);
      setCurrentStatus(result);
    };

    if (returnedTHeader && returnedTHeader?.length > 0) {
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

            // const getLocation = Array.isArray(fetchedData) && [
            //   ...new Set(fetchedData.map((val) => val.companyName)),
            // ];

            const getLocation = Array.isArray(fetchedData) && [
              ...new Set(
                fetchedData.flatMap((val) => {
                  let workHrsData = JSON.parse(val.empWorkInfo);
                  return workHrsData.map((item) => item.LOCATION);
                })
              ),
            ];

            setStoreLocation([...storeLocation, ...getLocation]);
          }
        } catch (err) {
        } finally {
          // setLoading is removed ;
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
        if (
          val.FID === getObject.FID &&
          val.ENTRANCEDATEUSED === getObject.ENTRANCEDATEUSED
        ) {
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
        val.FID === getObject.FID &&
        val.ENTRANCEDATEUSED === getObject.ENTRANCEDATEUSED
      ) {
        return getObject;
      } else {
        return val;
      }
    });
  };

  const editBLNGFunction = (getObject) => {
    try {
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
        selectedRows.map((val, i) => {
          return {
            id: val.id,
            fidNo: val?.FID || 0,
            empName: val?.NAMEFLAST || "",
            date: val?.ENTRANCEDATEUSED || "",
            inTime: val?.ENTRANCEDATETIME || "",
            outTime: val?.EXITDATETIME || "",
            // day: val?.DAYDIFFERENCE || 0,
            avgDailyTD: val?.AVGDAILYTOTALBYDAY || "",
            totalHrs: val?.AHIGHLIGHTDAILYTOTALBYGROUP || "",
            aweSDN: val?.ADININWORKSENGINEERINGSDNBHD || "",
            normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
            actualWorkHrs: val?.WORKINGHOURS || 0,
            otTime: val?.OT || 0,
            empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
            fileType: "BLNG",
            status: "Pending",
            remarks: val?.REMARKS || "",
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
                fidNo: val?.FID || 0,
                empName: val?.NAMEFLAST || "",
                date: val?.ENTRANCEDATEUSED || "",
                inTime: val?.ENTRANCEDATETIME || "",
                outTime: val?.EXITDATETIME || "",
                // day: val?.DAYDIFFERENCE || 0,
                avgDailyTD: val?.AVGDAILYTOTALBYDAY || "",
                totalHrs: val?.AHIGHLIGHTDAILYTOTALBYGROUP || "",
                aweSDN: val?.ADININWORKSENGINEERINGSDNBHD || "",
                normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
                actualWorkHrs: val?.WORKINGHOURS || 0,
                otTime: val?.OT || 0,
                empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],

                fileType: "BLNG",
                status: val.status,
                remarks: val?.REMARKS || "",
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
                fidNo: val?.FID || 0,
                empName: val?.NAMEFLAST || "",
                date: val?.ENTRANCEDATEUSED || "",
                inTime: val?.ENTRANCEDATETIME || "",
                outTime: val?.EXITDATETIME || "",
                // day: val?.DAYDIFFERENCE || 0,
                avgDailyTD: val?.AVGDAILYTOTALBYDAY || "",
                totalHrs: val?.AHIGHLIGHTDAILYTOTALBYGROUP || "",
                aweSDN: val?.ADININWORKSENGINEERINGSDNBHD || "",
                normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
                actualWorkHrs: val?.WORKINGHOURS || 0,
                otTime: val?.OT || 0,
                empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],

                fileType: "BLNG",
                status: "Pending",
                companyName: val?.LOCATION,
                remarks: val?.REMARKS || "",
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

  const checkBadgeNoOrNWHPD = async (data, decision) => {
    if (decision === "Allowed") return false;
    let hasMissingField = false;
    let message = "";

    for (let emp of data) {
      const fid = emp?.fidNo?.toString()?.trim();
      const workHrs = emp?.normalWorkHrs?.toString()?.trim();
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
      data.length > 0 &&
      data.map((val) => {
        return {
          fileName: fileName,
          fidNo: val?.FID || "N/A",
          empName: val?.NAMEFLAST || "",
          date: val?.ENTRANCEDATEUSED || "",
          inTime: val?.ENTRANCEDATETIME || "",
          outTime: val?.EXITDATETIME || "",
          // day: val?.DAYDIFFERENCE || 0,
          avgDailyTD: val?.AVGDAILYTOTALBYDAY || "",
          totalHrs: val?.AHIGHLIGHTDAILYTOTALBYGROUP || "",
          aweSDN: val?.ADININWORKSENGINEERINGSDNBHD || "",
          normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || "0",
          actualWorkHrs: val?.WORKINGHOURS || 0,
          otTime: val?.OT || 0,
          empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
          assignBy: uploaderID,
          fileType: "BLNG",
          status: "Unsubmitted",
          remarks: val?.REMARKS || "",
          companyName: val?.LOCATION,
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
    // setAllApprovedData([]);
    // setAllRejectedData([]);
  }, [allApprovedData, allRejectedData, data]);

  // const convertToISODate = (dateString) => {
  //   try {
  //     const [year, month, day] = dateString?.split("/");
  //   const dayNum = parseInt(day, 10);
  //   const monthNum = parseInt(month, 10);
  //     return `${month}/${year}/${day}`;
  //   } catch (err) {
  //     console.log("Error : ", err);
  //   }
  // };

  // const convertDateFormat = (inputDateStr) => {
  //   const [day, month, year] = inputDateStr?.split("/");

  //   // Convert string to numbers to remove any leading zeros
  //   const dayNum = parseInt(day, 10);
  //   const monthNum = parseInt(month, 10);
  //   console.log("Date : ", `${monthNum}/${dayNum}/${year} `);
  //   return `${dayNum}/${monthNum}/${year}`;
  // };

  const convertToISODate = (dateString) => {
    try {
      const [year, month, day] = dateString?.split("/");

      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);
      return `${monthNum}/${yearNum}/${day}`;
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  const ENTRANCEDATETIME = (getDate) => {
    try {
      const inputDate = String(getDate);
      const date = new Date(inputDate);

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const time = inputDate?.split(" ")[1] + " " + inputDate?.split(" ")[2];

      return `${day}/${month}/${year} ${time}`;
    } catch (err) {
      console.log("Error : ", err);
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
          const itemDate = new Date(item.ENTRANCEDATEUSED);

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
          filteredData = filteredData.filter((val) => {
            const jobLocaWhrs = val?.jobLocaWhrs;

            return (
              Array.isArray(jobLocaWhrs) &&
              jobLocaWhrs.some((emp) => emp?.LOCATION === selectedOption)
            );
          });
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
  // useEffect(() => {
  //   if (!Array.isArray(empAndWorkInfo) || !Array.isArray(data)) return;
  //   // Create a map for quick lookup
  //   const empInfoMap = new Map();

  //   if (Array.isArray(empAndWorkInfo)) {
  //     console.log("empAndWorkInfo : ", empAndWorkInfo);
  //     empAndWorkInfo.forEach((item) => {
  //       empInfoMap.set(String(item?.sapNo).toUpperCase() || "0", item);
  //     });
  //   }
  //   console.log("empAndWorkInfo : ",empAndWorkInfo)
  //   console.log("empInfoMap : ", empInfoMap);
  //   console.log("data : ", data);
  //   // Process visibleData
  //   const addedNWHPD =
  //     Array.isArray(data) &&
  //     data.map((val) => {
  //       const badgeKey = String(val?.FID).toUpperCase();
  //       const workInfoItem = empInfoMap?.get(badgeKey);

  //       return {
  //         ...val,
  //         NORMALWORKINGHRSPERDAY:
  //           Array.isArray(workInfoItem.workHrs) && workInfoItem.workHrs
  //             ? workInfoItem.workHrs[workInfoItem.workHrs.length - 1]
  //             : "0",
  //       };
  //     });

  //   setFinalData(addedNWHPD);
  // }, [empAndWorkInfo, data]);

  useEffect(() => {
    try {
      if (!Array.isArray(empAndWorkInfo) || !Array.isArray(data)) return;

      // Create a map for quick lookup
      const empInfoMap = new Map();

      if (Array.isArray(empAndWorkInfo)) {
        empAndWorkInfo.forEach((item) => {
          const key = String(item?.sapNo).toUpperCase();
          empInfoMap.set(key, item);
        });
      }

      const addedNWHPD =
        Array.isArray(data) &&
        data.map((val) => {
          const badgeKey = String(val?.FID).toUpperCase();
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
  const itemsPerPage = 1000;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // currentData?.sort((a, b) => a.NAMEFLAST?.localeCompare(b.NAMEFLAST));
  visibleData = currentData;

  return (
    <div onClick={() => setIsOpen(false)}>
      <div>
        {currentStatus === true ? (
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
                  placeholder="FID / NAME"
                />
              </div>
            </div>
            <div className="table-container">
              <table className="styled-table ">
                <thead className="sticky-header w-[100%]">
                  <tr className="text_size_5 h-16">
                    <td className="px-4 text-center text_size_7">S No.</td>

                    {AllFieldData?.tableHeader.map((header, index) => (
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
                  {visibleData && visibleData?.length > 0 ? (
                    visibleData.map((value, index) => {
                      const renderRows = (rowData, ind) => {
                        const isStatusPending = rowData?.status === "Pending";
                        const serialNumber =
                          (currentPage - 1) * itemsPerPage + index + 1;
                        return (
                          <tr
                            key={
                              userIdentification === "Manager"
                                ? index + 1
                                : index + 1
                            }
                            className={`text-dark_grey h-[50px] text-sm rounded-sm shadow-md border-b-2 border-[#CECECE] bg-white hover:bg-[#f1f5f9] ${
                              excelData && excelData.length > 0
                                ? ""
                                : "cursor-pointer"
                            }`}
                            onClick={() => {
                              if (excelData && excelData.length > 0) {
                              } else {
                                toggleFunction();
                                editBLNG(rowData);
                                editFormTitleFunc();
                              }
                            }}
                          >
                            <td className="text-center px-4 flex-1">
                              {serialNumber}
                            </td>
                            <td className="text-start px-4 flex-1">
                              {rowData?.FID}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.NAMEFLAST}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {convertToISODate(rowData?.ENTRANCEDATEUSED)}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {ENTRANCEDATETIME(rowData?.ENTRANCEDATETIME)}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {ENTRANCEDATETIME(rowData?.EXITDATETIME)}
                            </td>

                            <td className="text-center px-4 flex-1">
                              {rowData?.AVGDAILYTOTALBYDAY}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.AHIGHLIGHTDAILYTOTALBYGROUP || ""}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.ADININWORKSENGINEERINGSDNBHD || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.NORMALWORKINGHRSPERDAY || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.WORKINGHOURS || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.OT || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.REMARKS}
                            </td>

                            {isStatusPending && (
                              <React.Fragment>
                                <td
                                  className={`text-center px-4 flex-1 ${
                                    rowData?.status === "Approved"
                                      ? "text-[#0CB100]"
                                      : "text_size_8"
                                  }`}
                                >
                                  {rowData?.status}
                                </td>
                                <td>
                                  <input
                                    className="h-4 w-4"
                                    type="checkbox"
                                    checked={checkedItems[rowData.id] || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setCheckedItems((prev) => ({
                                          ...prev,
                                          [rowData.id]: e.target.checked,
                                        }));
                                        setCheckedItemsTwo((prev) => ({
                                          ...prev,
                                          [rowData.id]: false,
                                        }));
                                        storeOnlySelectedItem(
                                          rowData,
                                          "Approved"
                                        );
                                        removeExistingData(rowData, "Rejected");
                                      } else {
                                        setCheckedItems((prev) => ({
                                          ...prev,
                                          [rowData.id]: false,
                                        }));
                                        removeExistingData(rowData, "Approved");
                                      }
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="h-4 w-4"
                                    type="checkbox"
                                    checked={
                                      checkedItemsTwo[rowData.id] || false
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setCheckedItemsTwo((prev) => ({
                                          ...prev,
                                          [rowData.id]: e.target.checked,
                                        }));

                                        setCheckedItems((prev) => ({
                                          ...prev,
                                          [rowData.id]: false,
                                        }));
                                        storeOnlySelectedItem(
                                          rowData,
                                          "Rejected"
                                        );
                                        toggleForRemarkFunc();
                                        removeExistingData(rowData, "Approved");
                                      } else {
                                        setCheckedItemsTwo((prev) => ({
                                          ...prev,
                                          [rowData.id]: false,
                                        }));
                                        removeExistingData(rowData, "Rejected");
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
                                    !selectedRows.some(
                                      (r) => r.id === rowData.id
                                    )
                                  }
                                  checked={selectedRows.some(
                                    (r) => r.id === rowData.id
                                  )}
                                  onChange={() => handleCheckboxChange(rowData)}
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
                  ) : (
                    <tr>
                      <td
                        colSpan="100%"
                        className="text-center text-dark_ash text_size_5 bg-white"
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
              <div className="flex-1 flex justify-center ">
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
          fieldObj={AllFieldData?.fieldObj || {}}
          fields={AllFieldData?.fields || []}
          tableHeader={AllFieldData?.tableHeader || []}
          editFunction={editBLNGFunction}
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
  onClick={async () => {
    try {
      console.log("Fetching and Deleting BLNG Data...");
      let nextToken = null;
      let deleteCount = 0;  // 🟢 Counter to track deletions

      do {
        const filter = {
          and: [{ fileType: { eq: "BLNG" } }],
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

        console.log(`Fetched ${SBWdata.length} BLNG items in this batch.`);

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

        console.log(`Batch deletion completed. Total deleted so far: ${deleteCount}`);

      } while (nextToken);

      console.log(`✅ All BLNG items deletion process completed. Total deleted: ${deleteCount}`);

    } catch (fetchError) {
      console.error("❌ Error in fetchDataAndDelete:", fetchError);
    }
  }}
>
  Delete BLNG Data
</button> */}
    </div>
  );
};
