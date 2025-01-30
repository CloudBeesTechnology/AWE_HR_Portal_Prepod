import React, { useCallback, useEffect, useState } from "react";
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
const client = generateClient();

export const ViewHOsheet = ({
  setExcelData,
  excelData,
  returnedTHeader,
  Position,
  convertedStringToArrayObj,
  titleName,
  fileName,
  showRejectedItemTable,
  submittedData,
}) => {
  const uploaderID = localStorage.getItem("userID")?.toUpperCase();

  const [closePopup, setClosePopup] = useState(false);
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [editObject, setEditObject] = useState();
  const [toggleHandler, setToggleHandler] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [toggleAssignManager, setToggleAssignManager] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [userIdentification, setUserIdentification] = useState("");
  const [showStatusCol, setShowStatusCol] = useState(null);
  const [successMess, setSuccessMess] = useState(null);
  const [response, setResponse] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItemsTwo, setCheckedItemsTwo] = useState({});
  const [rejectTab, setRejectTab] = useState(false);

  const [toggleForRemark, setToggleForRemark] = useState(null);
  const [allApprovedData, setAllApprovedData] = useState([]);
  const [allRejectedData, setAllRejectedData] = useState([]);
  const [passSelectedData, setPassSelectedData] = useState(null);
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  let visibleData;

  const [storingMess, setStoringMess] = useState(null);
  // if (Position !== "Manager") {
  const processedData = useTableMerged(excelData);

  const mergedData = AutoFetchForAssignManager();
  // }
  const { startDate, endDate, searchQuery, setSearchQuery } = useTempID();
  const { selectedRows, setSelectedRows, handleCheckboxChange, handleSubmit } =
    useRowSelection();

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
  }, [convertedStringToArrayObj]);

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
          } catch (error) {
            // console.error("Error parsing empWorkInfo for ID:", val.id, error);
          }
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
      return value; // Return value if not a string (e.g., number, object)
    }
    return value.replace(/[^a-zA-Z0-9]/g, ""); // Removes all non-alphanumeric characters
  };

  useEffect(() => {
    const checkKeys = async () => {
      const cleanData = returnedTHeader.map((item) => {
        const cleanedItem = {};
        for (const key in item) {
          cleanedItem[key] = cleanValue(item[key]); // Clean the value, not the key
        }

        return cleanedItem;
      });

      const requiredKeys = [
        "REC",
        "CTR",
        "DEPT",
        "EMPLOYEEID",
        "BADGE",
        "NAME",
        "DATE",
        "ONAM",
        "OFFAM",
        "ONPM",
        "OFFPM",
        "IN",
        "OUT",
        "TOTALINOUT",
        "ALLDAYMINUTES",
        "NETMINUTES",
        "TOTALHOURS",
        // "TOTALACTUALHOURS",
        "REMARKS",
      ];

      const result = await new Promise((resolve) => {
        const keyCheckResult =
          cleanData &&
          cleanData.every((m) => {
            return requiredKeys.every(
              (key) =>
                Object.values(m)
                  .map((value) =>
                    typeof value === "string" ? value.toUpperCase() : value
                  ) // Convert string values to uppercase
                  .includes(key.toUpperCase()) // Compare with key in uppercase
            );
          });
        resolve(keyCheckResult);
      });
      setClosePopup(true);
      setShowStatusCol(result);
      setCurrentStatus(result); // Assuming setCurrentStatus is defined
      // setLoading(false);
    };

    if (returnedTHeader && returnedTHeader.length > 0) {
      checkKeys();
    } else if (!returnedTHeader && showRejectedItemTable !== "Rejected") {
      const fetchData = async () => {
        setCurrentStatus(true);
        // setLoading(true);
        try {
          const dataPromise = new Promise((resolve, reject) => {
            if (convertedStringToArrayObj) {
              resolve(convertedStringToArrayObj);
            } else {
              setTimeout(() => {
                reject("No data found after waiting.");
              }, 5000);
            }
          });

          const fetchedData = await dataPromise;

          if (userIdentification === "Manager") {
            const finalData = await SendDataToManager(fetchedData);

            pendingData(finalData);
          }
        } catch (err) {
        } finally {
          // setLoading(false);
        }
      };

      // Call the fetchData function asynchronously
      fetchData();
    } else if (!returnedTHeader && showRejectedItemTable === "Rejected") {
      const fetchData = async () => {
        setCurrentStatus(true);
        setRejectTab(true);
        // setLoading(true);
        try {
          const dataPromise = new Promise((resolve, reject) => {
            if (convertedStringToArrayObj) {
              resolve(convertedStringToArrayObj);
            } else {
              setTimeout(() => {
                reject("No data found after waiting.");
              }, 5000);
            }
          });

          const fetchedData = await dataPromise;

          if (userIdentification !== "Manager") {
            const finalData = await FindSpecificTimeKeeper(fetchedData);
            pendingData(finalData);
          }
        } catch (err) {
        } finally {
          // setLoading(false);
        }
      };

      // Call the fetchData function asynchronously
      fetchData();
    } else {
      setCurrentStatus(false);
      // setLoading(false);
    }
  }, [
    returnedTHeader,
    convertedStringToArrayObj,
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
        if (val.EMPLOYEEID === object.EMPLOYEEID && val.DATE === object.DATE) {
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
      // Check if jobLocaWhrs is a non-null, non-empty array and assign LOCATION if valid
      if (Array.isArray(item?.jobLocaWhrs) && item?.jobLocaWhrs?.length > 0) {
        item.LOCATION = item?.jobLocaWhrs[0]?.LOCATION;
      } else {
        item.LOCATION = null; // Default to null or any other fallback value
      }
      return item;
    });
    setData(updatedData);
  };

  const handleAssignManager = () => {
    const remainingData = data?.filter(
      (row) => !selectedRows.some((selected) => selected.id === row.id)
    );
    setData(remainingData);
    setSecondaryData(remainingData);
    setSelectedRows([]);
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

      let action = "updateStoredData";
      await TimeSheetsCRUDoperations({
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
      let action = "update";
      await TimeSheetsCRUDoperations({
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
      });
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

      let finalResult = updatedRejectedItems;
      let action = "ResubmitRejectedItems";
      await TimeSheetsCRUDoperations({
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
      });
    }
  };

  const storeInitialData = async () => {
    const result =
      data &&
      data.map((val) => {
        return {
          fileName: fileName,
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
          status: "All",
          assignBy: uploaderID,
          remarks: val.REMARKS || "",
          companyName: val?.LOCATION || "",
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
        // Replace old data if ID matches, otherwise keep existing data
        const updatedData = prevApprovedData.filter(
          (item) => item.id !== data.id
        );
        const updateStatus = { ...data, status: "Approved" };

        return [...updatedData, updateStatus]; // Add the new data
      });
    } else if (action === "Rejected") {
      setAllRejectedData((prevRejectedData) => {
        // Replace old data if ID matches, otherwise keep existing data
        const updatedData = prevRejectedData.filter(
          (item) => item.id !== data.id
        );
        return [...updatedData, data]; // Add the new data
      });
      setPassSelectedData(data); // Update the selected data
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
    setAllApprovedData([]);
    setAllRejectedData([]);
  }, [allApprovedData, allRejectedData, data]);

  const convertToISODate = (dateString) => {
    try {
      const [year, month, day] = dateString.split("/");

      return `${month}/${year}/${day}`; // 'M/D/YYYY'
    } catch (err) {
      // console.log(err, " : ERROR");
    }
  };

  useEffect(() => {
    if (secondaryData && secondaryData.length > 0) {
      // Fixed typo
      setCurrentPage(1);
      let filteredData = [...secondaryData];
      if (searchQuery) {
        filteredData = searchQuery;

        // setVisibleData(filteredData);
      }
      if (startDate && endDate) {
        const start = new Date(startDate); // Start date as "MM/DD/YYYY"
        const end = new Date(endDate); // End date as "MM/DD/YYYY"

        // Filter the data array
        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.DATE); // Convert item.DATE to a Date object

          itemDate?.setHours(0, 0, 0, 0);
          start?.setHours(0, 0, 0, 0);
          end?.setHours(0, 0, 0, 0);
          return itemDate >= start && itemDate <= end;
        });
      }
      // Example usage
      // const startDate = "12/23/2024"; // Start date in "MM/DD/YYYY"
      // const endDate = "12/25/2024"; // End date in "MM/DD/YYYY"

      setData(filteredData);
      // setVisibleData(filteredData.length > 0 ? filteredData : []);
    }
  }, [startDate, endDate, secondaryData, searchQuery]);

  const itemsPerPage = 100;
  const safeData = data || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                  placeholder="Badge No."
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
                              className="text-dark_grey h-[50px] text-sm rounded-sm shadow-md border-b-2 border-[#CECECE] bg-white hover:bg-[#f1f5f9] cursor-pointer"
                              onClick={() => {
                                toggleFunction();
                                editBLNG(m);
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
                                {m?.BADGE}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.NAME}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {convertToISODate(m?.DATE)}
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
                                            [m.id]: e.target.checked, // Toggle the checked state for this specific ID
                                          }));
                                          storeOnlySelectedItem(m, "Approved");
                                        } else {
                                          removeExistingData(m, "Approved");
                                          setCheckedItems((prev) => ({
                                            ...prev,
                                            [m.id]: false, // Toggle the checked state for this specific ID
                                          }));
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
                                            [m.id]: e.target.checked, // Toggle the checked state for this specific ID
                                          }));

                                          storeOnlySelectedItem(m, "Rejected");
                                          toggleForRemarkFunc();
                                        } else {
                                          removeExistingData(m, "Rejected");
                                          setCheckedItemsTwo((prev) => ({
                                            ...prev,
                                            [m.id]: false, // Toggle the checked state for this specific ID
                                          }));
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
                      //       "All SBW items deletion process completed."
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
        <SpinLogo
          text={showTitle}
          notification={notification}
          // path="/timesheetSBW"
        />
      )}
    </div>
  );
};
