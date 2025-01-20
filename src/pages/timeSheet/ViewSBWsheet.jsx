import React, { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";
import { EditTimeSheet } from "./EditTimeSheet";
import "../../../src/index.css";

import { useTableMerged } from "./customTimeSheet/UserTableMerged";
import { SendDataToManager } from "./customTimeSheet/SendDataToManager";

import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
import { AutoFetchForAssignManager } from "./customTimeSheet/AutoFetchForAssignManager";
import { PopupForAddRemark } from "./ModelForSuccessMess/PopupForAddRemark";
import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";
import { PopupForSFApproves } from "./ModelForSuccessMess/PopupForSFApproves";
import { useTempID } from "../../utils/TempIDContext";
import { DateFilter } from "./timeSheetSearch/DateFilter";
import { SpinLogo } from "../../utils/SpinLogo";
import { Pagination } from "./timeSheetSearch/Pagination";
import { TimeSheetsCRUDoperations } from "./customTimeSheet/TimeSheetsCRUDoperations";

export const ViewSBWsheet = ({
  excelData,
  returnedTHeader,
  titleName,
  setExcelData,
  convertedStringToArrayObj,
  Position,
  fileName,
  showRejectedItemTable,
}) => {
  const uploaderID = localStorage.getItem("userID")?.toUpperCase();

  const [closePopup, setClosePopup] = useState(false);
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [editObject, setEditObject] = useState();
  const [toggleAssignManager, setToggleAssignManager] = useState(false);
  const [toggleHandler, setToggleHandler] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItemsTwo, setCheckedItemsTwo] = useState({});

  const [loading, setLoading] = useState(true);
  const [userIdentification, setUserIdentification] = useState("");
  const [response, setResponse] = useState(null);
  const [showStatusCol, setShowStatusCol] = useState(null);
  const [successMess, setSuccessMess] = useState(null);
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");

  const [toggleForRemark, setToggleForRemark] = useState(null);
  const [allApprovedData, setAllApprovedData] = useState([]);
  const [allRejectedData, setAllRejectedData] = useState([]);
  const [passSelectedData, setPassSelectedData] = useState(null);

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let visibleData;

  const { startDate, endDate, searchQuery, setSearchQuery } = useTempID();
  const [storingMess, setStoringMess] = useState(null);
  const processedData = useTableMerged(excelData);

  const mergedData = AutoFetchForAssignManager();

  useEffect(() => {
    if (processedData && processedData.length > 0) {
      setData(processedData);
      setSecondaryData(processedData);
    }
  }, [processedData]);

  const searchResult = async (searchedData) => {
    try {
      const result = await searchedData;
      // setData(result);
      setSearchQuery(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // useEffect(() => {
  //   const fetchWorkInfo = async () => {
  //     // Fetch the BLNG data using GraphQL
  //     const [empWorkInfos] = await Promise.all([
  //       client.graphql({
  //         query: listTimeSheets,
  //       }),
  //     ]);
  //     const workInfo = empWorkInfos?.data?.listTimeSheets?.items;
  //     const k = workInfo.filter((fil) => fil.fileType === "SBW");
  //     console.log(k);
  //   };
  //   fetchWorkInfo();
  // }, []);

  useEffect(() => {
    const getPosition = localStorage.getItem("userType");
    if (getPosition === "Manager") {
      setUserIdentification("Manager");
    } else if (getPosition !== "Manager") {
      setUserIdentification("TimeKeeper");
    }
  }, [convertedStringToArrayObj]);
  const pendingData = (data) => {
    if (data && data.length > 0) {
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
            console.error("Error parsing empWorkInfo for ID:", val.id, error);
          }
          return {
            id: val.id,
            fileName: val.fileName,
            NAME: val.empName || 0,
            DEPTDIV: val.empDept || "",
            BADGE: val.empBadgeNo || "",
            DATE: val.date || "",
            IN: val.inTime || "",
            OUT: val.outTime || 0,
            TOTALINOUT: val.totalInOut || "",
            ALLDAYMINHRS: val.allDayHrs || "",
            NETMINUTES: val.netMins || "",
            TOTALHOURS: val.totalHrs || 0,
            NORMALWORKINGHRSPERDAY: val?.normalWorkHrs || 0,
            WORKINGHOURS: val.actualWorkHrs || 0,
            OT: val?.otTime || 0,
            jobLocaWhrs: parsedEmpWorkInfo.flat() || [],
            fileType: val.fileType || "",
            timeKeeper: val.assignBy || "",
            manager: val.assignTo || "",
            REMARKS: val.remarks || "",
            status: val.status || "",
          };
        });
      // console.log(result);
      setData(result);
      setSecondaryData(result);
    }
  };

  useEffect(() => {
    const checkKeys = async () => {
      const convertKeys = (obj) => {
        return Object.keys(obj).reduce((acc, key) => {
          // Remove spaces and special characters, and convert to lowercase
          const newKey = key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
          acc[newKey] = obj[key];
          return acc;
        }, {});
      };

      // Convert keys for each object in the array `k`
      const k = [
        {
          alldayminhrs: "14:37:50",
          badge: "3907A",
          deptdiv: "HRD",
          in: "14:37:50",
          out: "14:37:50",
        },
      ];
      const convertedData = returnedTHeader.map(convertKeys);

      const requiredKeys = ["deptdiv", "name", "badge"];

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
      setCurrentStatus(result); // Assuming setCurrentStatus is defined
      setShowStatusCol(result);
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
            // console.log(finalData);
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
      setLoading(false);
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
  const toggleSFAMessage = async (value, responseData) => {
    setSuccessMess(value);

    if (value === true && responseData) {
      setResponse(responseData);
    }
  };

  const toggleFunctionForAssiMana = () => {
    setToggleAssignManager(!toggleAssignManager);
  };

  const editNestedData = (data, getObject) => {
    return data.map((m) => ({
      id: m.id,
      data: m.data.map((val) => {
        if (
          val.DEPTDIV === getObject.DEPTDIV &&
          val.BADGE === getObject.BADGE
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
        if (val.DEPTDIV === object.DEPTDIV && val.BADGE === object.BADGE) {
          return { ...val, REMARKS: object.REMARKS };
        } else {
          return val;
        }
      });

    setData(addedRemarkForReject);
  };

  const editFlatData = (data, getObject) => {
    return data.map((val) => {
      if (val.DEPTDIV === getObject.DEPTDIV && val.BADGE === getObject.BADGE) {
        return getObject;
      } else {
        return val;
      }
    });
  };

  const editSBWFunction = (getObject) => {
    try {
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
      // console.log(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  const AllFieldData = useTableFieldData(titleName);
  const renameKeysFunctionAndSubmit = async (managerData) => {
    if (
      userIdentification !== "Manager" &&
      showRejectedItemTable !== "Rejected"
    ) {
      const processedData = await Promise.all(
        data.map(async (val) => {
          return {
            fileName: fileName,
            empName: val.NAME || "",
            empDept: val.DEPTDIV || "",
            empBadgeNo: val.BADGE || "",
            date: val.DATE || "",
            inTime: val.IN || "",
            outTime: val.OUT || "",
            totalInOut: val.TOTALINOUT || "",
            allDayHrs: val.ALLDAYMINHRS || "",
            netMins: val.NETMINUTES || "",
            totalHrs: val.TOTALHOURS || "",
            normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
            actualWorkHrs: val.WORKINGHOURS || "",
            otTime: val.OT || "",
            companyName: val?.LOCATION,
            remarks: val.REMARKS || "",
            empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
            fileType: "SBW",
            status: "Pending",
          };
        })
      );

      const result = await processedData;

      const finalResult = result.map((val) => {
        return {
          ...val,
          assignTo: managerData.mbadgeNo,
          assignBy: uploaderID,
          fromDate: managerData.mfromDate,
          untilDate: managerData.muntilDate,
        };
      });

      let action = "create";
      await TimeSheetsCRUDoperations({
        finalResult,
        toggleSFAMessage,
        setStoringMess,
        setData,
        Position,
        action,
      });
    } else if (userIdentification === "Manager") {
      setNotification(false);
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
                empName: val.NAME || "",
                empDept: val.DEPTDIV || "",
                empBadgeNo: val.BADGE || "",
                date: val.DATE || "",
                inTime: val.IN || "",
                outTime: val.OUT || "",
                totalInOut: val.TOTALINOUT || "",
                allDayHrs: val.ALLDAYMINHRS || "",
                netMins: val.NETMINUTES || "",
                totalHrs: val.TOTALHOURS || "",
                normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
                actualWorkHrs: val.WORKINGHOURS || "",
                otTime: val.OT || "",
                remarks: val.REMARKS || "",
                empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
                fileType: "SBW",
                status: val.status,
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
      showRejectedItemTable === "Rejected"
    ) {
      const updatedRejectedItems =
        data && data.length > 0
          ? data.map((val) => {
              return {
                id: val.id,
                // fileName: val.fileName,
                empName: val.NAME || "",
                empDept: val.DEPTDIV || "",
                empBadgeNo: val.BADGE || "",
                date: val.DATE || "",
                inTime: val.IN || "",
                outTime: val.OUT || "",
                totalInOut: val.TOTALINOUT || "",
                allDayHrs: val.ALLDAYMINHRS || "",
                netMins: val.NETMINUTES || "",
                totalHrs: val.TOTALHOURS || "",
                normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
                actualWorkHrs: val.WORKINGHOURS || "",
                otTime: val.OT || "",
                remarks: val.REMARKS || "",
                empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
                fileType: "SBW",
                status: "Pending",
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
  // console.log(allApprovedData, " : ", allRejectedData);
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
    // Combine approved and rejected data
    const mergedData = [...allApprovedData, ...allRejectedData];

    // console.log(mergedData);
    // Filter out items that have matching sapNo in mergedData
    const afterRemoved = data?.filter(
      (val) => !mergedData.some((fil) => val.id === fil.id)
    );

    // Update the state with the filtered data
    setData(afterRemoved);
    setAllApprovedData([]);
    setAllRejectedData([]);
  }, []);
  // }, [allApprovedData, allRejectedData, data]);
  const convertToISODate = (dateString) => {
    try {
      const [year, month, day] = dateString.split("/");

      return `${month}/${year}/${day}`; // 'M/D/YYYY'
    } catch {}
  };

  useEffect(() => {
    if (secondaryData && secondaryData.length > 0) {
      // Fixed typo
      setCurrentPage(1);
      let newFilteredData = [...(secondaryData || [])];
      if (searchQuery) {
        newFilteredData = searchQuery;
      }
      if (startDate && endDate) {
        const start = new Date(startDate); // Start date as "MM/DD/YYYY"
        const end = new Date(endDate); // End date as "MM/DD/YYYY"

        // Filter the data array
        newFilteredData = newFilteredData.filter((item) => {
          const itemDate = new Date(item.DATE); // Convert item.DATE to a Date object

          itemDate?.setHours(0, 0, 0, 0);
          start?.setHours(0, 0, 0, 0);
          end?.setHours(0, 0, 0, 0);
          return itemDate >= start && itemDate <= end;
        });
      }

      setFilteredData(newFilteredData);
    }
  }, [startDate, endDate, secondaryData, searchQuery]);
  const itemsPerPage = 10;
  const safeData = filteredData.length > 0 ? filteredData : data || [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // console.log(currentData);
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
                    <td className="px-4 text-center text_size_7">S No.</td>

                    {AllFieldData?.tableHeader.map((header, index) => (
                      <td key={index} className="px-4 flex-1 text_size_7">
                        {header}
                      </td>
                    )) ?? (
                      <tr>
                        <td colSpan="100%" className="text-center text_size_7">
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
                              <td className="text-start px-4 flex-1">
                                {m?.NAME}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.DEPTDIV}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m?.BADGE}
                              </td>
                              {/* <td className="text-center px-4 flex-1">{m?.DEPT}</td> */}
                              <td className="text-center px-4 flex-1">
                                {convertToISODate(m?.DATE)}
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
                                {m?.ALLDAYMINHRS || 0}
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
                            className="px-6 py-6 text-center text-dark_ash text_size_5 bg-white"
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
              className={`flex justify-between items-center my-5 mt-10 ${
                visibleData && visibleData.length > 0 ? "" : "hidden"
              }`}
            >
              <div className="flex-1"></div>
              <div className="flex-1 flex justify-center">
                <button
                  className="rounded px-3 py-2.5 w-52 bg-[#FEF116] text_size_5 text-dark_grey"
                  onClick={() => {
                    if (userIdentification !== "Manager") {
                      toggleFunctionForAssiMana();

                      // Uncomment and modify this block if you want to use the fetchDataAndDelete function.
                      /*
          const fetchDataAndDelete = async () => {
            try {
              console.log("Fetching and Deleting SBW Data...");
              let nextToken = null;

              do {
                const filter = {
                  and: [{ fileType: { eq: "SBW" } }],
                };

                const response = await client.graphql({
                  query: listTimeSheets,
                  variables: { filter: filter, nextToken: nextToken },
                });

                const SBWdata = response?.data?.listTimeSheets?.items || [];
                nextToken = response?.data?.listTimeSheets?.nextToken;

                console.log("Fetched SBW Data:", SBWdata);

                await Promise.all(
                  SBWdata.map(async (item) => {
                    try {
                      const deleteResponse = await client.graphql({
                        query: deleteTimeSheet,
                        variables: { input: { id: item.id } },
                      });
                      console.log("Deleted Item Response:", deleteResponse);
                    } catch (deleteError) {
                      console.error(`Error deleting item with ID ${item.id}:`, deleteError);
                    }
                  })
                );

                console.log("Batch deletion completed.");
              } while (nextToken);

              console.log("All SBW items deletion process completed.");
            } catch (fetchError) {
              console.error("Error in fetchDataAndDelete:", fetchError);
            }
          };
          fetchDataAndDelete();
          */
                    } else if (userIdentification === "Manager") {
                      renameKeysFunctionAndSubmit();
                      removeCheckedItem();
                    }
                  }}
                >
                  {userIdentification === "Manager"
                    ? "Finalize and Submit"
                    : "Assign Manager"}
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
          editFunction={editSBWFunction}
          titleName={titleName}
          Position={Position}
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
