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
  const [toggleAssignManager, setToggleAssignManager] = useState(false);
  const [toggleForRemark, setToggleForRemark] = useState(null);

  const [showStatusCol, setShowStatusCol] = useState(null);
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [rejectTab, setRejectTab] = useState(false);

  const [allApprovedData, setAllApprovedData] = useState([]);
  const [allRejectedData, setAllRejectedData] = useState([]);
  const [passSelectedData, setPassSelectedData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  let visibleData;

  const mergedData = AutoFetchForAssignManager();
  const [storingMess, setStoringMess] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItemsTwo, setCheckedItemsTwo] = useState({});
  const [editFormTitle, setEditFormTitle] = useState("");

  const { startDate, endDate, searchQuery, setSearchQuery } = useTempID();
  const { selectedRows, setSelectedRows, handleCheckboxChange, handleSubmit } =
    useRowSelection();
  const { createNotification } = useCreateNotification();
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
                    String(item?.NO).toUpperCase()
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
            companyName: val.LOCATIONATTOP || "",
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

      let action = "updateStoredData";
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
                companyName: val.LOCATIONATTOP || "",
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
  const storeInitialData = async () => {
    const result =
      data &&
      data.length > 0 &&
      data.map((val) => {
        return {
          fileName: fileName,
          empName: val.NAME || "",
          fidNo: val.NO || "",
          companyName: val.LOCATIONATTOP || "",
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
          assignBy: uploaderID,
          fileType: "Offshore",
          status: "Unsubmitted",
        };
      });

    let action = "create";
    let finalResult = result;

    await TimeSheetsCRUDoperations({
      finalResult,
      toggleSFAMessage,
      setStoringMess,
      setData,
      Position,
      action,
    });
  };

  const toggleForRemarkFunc = () => {
    setToggleForRemark(!toggleForRemark);
  };

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

      setData(filteredData);
    }
  }, [startDate, endDate, secondaryData, searchQuery]);

  const safeData = data || [];
  const itemsPerPage = 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // currentData.sort((a, b) => a.NAME.localeCompare(b.NAME));
  visibleData = currentData;
  return (
    <div>
      {currentStatus ? (
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
                    if (selectedRows && selectedRows.length > 0) {
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
    </div>
  );
};
