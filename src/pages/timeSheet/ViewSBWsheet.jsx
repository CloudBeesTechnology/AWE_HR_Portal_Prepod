import React, { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
// import {
//   createSBWSheet,
//   deleteSBWSheet,
//   updateSBWSheet,
// } from "../../graphql/mutations";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { generateClient } from "@aws-amplify/api";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";
import { EditTimeSheet } from "./EditTimeSheet";
import "../../../src/index.css";

import { useTableMerged } from "./customTimeSheet/UserTableMerged";
import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
// import { listSBWSheets } from "../../graphql/queries";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
import {
  createTimeSheet,
  deleteTimeSheet,
  updateTimeSheet,
} from "../../graphql/mutations";

import { UseScrollableView } from "./customTimeSheet/UseScrollableView";
import { MergeTableForNotification } from "./customTimeSheet/MergeTableForNotification";
import { Notification } from "./customTimeSheet/Notification";
import { sendEmail } from "../../services/EmailServices";
import { listEmpWorkInfos, listTimeSheets } from "../../graphql/queries";
import { PopupForAddRemark } from "./ModelForSuccessMess/PopupForAddRemark";
import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";
import { PopupForSFApproves } from "./ModelForSuccessMess/PopupForSFApproves";
const client = generateClient();
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

  const [toggleForRemark, setToggleForRemark] = useState(null);
  const [allApprovedData, setAllApprovedData] = useState([]);
  const [allRejectedData, setAllRejectedData] = useState([]);
  const [passSelectedData, setPassSelectedData] = useState(null);

  const { handleScroll, visibleData, setVisibleData } = UseScrollableView(
    data,
    "TimeSheet"
  );
  const [storingMess, setStoringMess] = useState(null);
  const processedData = useTableMerged(excelData);

  useEffect(() => {
    if (processedData && processedData.length > 0) {
      setData(processedData);
      setSecondaryData(processedData);
    }
  }, [processedData]);

  const searchResult = async (searchedData) => {
    try {
      const result = await searchedData;
      setData(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    const fetchWorkInfo = async () => {
      // Fetch the BLNG data using GraphQL
      const [empWorkInfos] = await Promise.all([
        client.graphql({
          query: listTimeSheets,
        }),
      ]);
      const workInfo = empWorkInfos?.data?.listTimeSheets?.items;
      const k = workInfo.filter((fil) => fil.fileType === "SBW");
      console.log(k);
    };
    fetchWorkInfo();
  }, []);
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // useEffect(() => {
  //   if (excelData) {
  //     const fetchData = async () => {
  //       // setLoading(true);
  //       try {
  //         const dataPromise = new Promise((resolve, reject) => {
  //           if (excelData) {
  //             resolve(excelData);
  //           } else {
  //             setTimeout(() => {
  //               reject("No data found after waiting.");
  //             }, 5000);
  //           }
  //         });

  //         const fetchedData = await dataPromise;

  //         // setForUpdateBlng(fetchedData);
  //         setData(fetchedData);
  //         setSecondaryData(fetchedData);
  //       } catch (err) {}
  //     };
  //     fetchData();
  //   }
  // }, [excelData]);
  // const cleanValue = (value) => {
  //   if (typeof value !== "string") {
  //     return value; // Return value if not a string (e.g., number, object)
  //   }
  //   return value.replace(/[^a-zA-Z0-9]/g, ""); // Removes all non-alphanumeric characters
  // };
  // console.log("returnedTHeader : ", returnedTHeader);
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
      console.log(result);
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
          // const filterPending = fetchedData.filter(
          //   (val) => val.status !== "Approved"
          // );

          // const filterPending = fetchedData
          //   .map((value) => {
          //     return {
          //       id: value[0]?.id,
          //       data: value[1]?.filter((val) => {
          //         if (val.status !== "Approved") {
          //           return val;
          //         }
          //       }),
          //     };
          //   })
          //   .filter((item) => item.data && item.data.length > 0);

          // console.log(filterPending);
          // const filteredData = fetchedData.filter(
          //   (fil) => fil.status !== "Approved"
          // );
          if (userIdentification === "Manager") {
            const finalData = await SendDataToManager(fetchedData);
            console.log(finalData);
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
      console.log(updatedData);
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
          trade: managerData.mfromDate,
          tradeCode: managerData.muntilDate,
        };
      });
      console.log(finalResult);
      const sendTimeSheets = async (timeSheetData) => {
        let successCount = 0;
        let successFlag = false;

        for (const timeSheet of timeSheetData) {
          try {
            const response = await client.graphql({
              query: createTimeSheet,
              variables: { input: timeSheet },
            });

            if (response?.data?.createTimeSheet) {
              console.log(
                "TimeSheet created successfully:",
                response.data.createTimeSheet
              );
              const responseData = response.data.createTimeSheet;
              successCount++;

              if (successCount === data.length) {
                setStoringMess(false);
                setVisibleData([]);
                setData(null);
              }

              if (!successFlag) {
                toggleSFAMessage(true, responseData); // Only toggle success message once
                setStoringMess(true);

                const result = await MergeTableForNotification(responseData);
                console.log(result);

                if (result) {
                  // Call the Notification function
                  const emailDetails = await Notification({
                    getEmail: result, // Fix: Pass 'getEmail' instead of 'result'
                    Position,
                  });

                  if (emailDetails) {
                    // Log email details
                    const { subject, message, fromAddress, toAddress } =
                      emailDetails;

                    await sendEmail(subject, message, fromAddress, toAddress);
                  } else {
                    console.error("Notification returned undefined!");
                  }
                } else {
                  console.error(
                    "MergeTableForNotification returned undefined!"
                  );
                }
                setVisibleData([]);
                setData(null);
                successFlag = true; // Set the flag to true
              }
            }
          } catch (error) {
            console.error("Error creating TimeSheet:", error);
            toggleSFAMessage(false);
          }
        }
      };

      sendTimeSheets(finalResult);
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

      const updateTimeSheetFunction = async (timeSheetData) => {
        let successFlag = false;
        for (const timeSheet of timeSheetData) {
          try {
            const response = await client.graphql({
              query: updateTimeSheet,
              variables: {
                input: timeSheet, // Send each object individually
              },
            });

            if (response?.data?.updateTimeSheet) {
              console.log(
                "TimeSheet Updated successfully:",
                response.data.updateTimeSheet
              );
              const responseData = response.data.updateTimeSheet;
              if (!successFlag) {
                toggleSFAMessage(true, responseData); // Only toggle success message once

                const result = await MergeTableForNotification(responseData);

                if (result) {
                  // Call the Notification function
                  const emailDetails = await Notification({
                    getEmail: result, // Fix: Pass 'getEmail' instead of 'result'
                    Position,
                  });

                  if (emailDetails) {
                    // Log email details
                    const { subject, message, fromAddress, toAddress } =
                      emailDetails;

                    await sendEmail(subject, message, fromAddress, toAddress);
                  } else {
                    console.error("Notification returned undefined!");
                  }
                } else {
                  console.error(
                    "MergeTableForNotification returned undefined!"
                  );
                }

                successFlag = true; // Set the flag to true
              }
            }
          } catch (error) {
            console.error("Error creating TimeSheet:", error);
            toggleSFAMessage(false);
          }
        }
      };

      updateTimeSheetFunction(InitialBLNGUpdate);
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
              };
            })
          : [];

      const updateTimeSheetFunction = async (timeSheetData) => {
        let successFlag = false;
        for (const timeSheet of timeSheetData) {
          try {
            const response = await client.graphql({
              query: updateTimeSheet,
              variables: {
                input: timeSheet, // Send each object individually
              },
            });

            if (response?.data?.updateTimeSheet) {
              console.log(
                "TimeSheet created successfully:",
                response.data.updateTimeSheet
              );
              const responseData = response.data.updateTimeSheet;

              if (!successFlag) {
                toggleSFAMessage(true, responseData); // Only toggle success message once

                const result = await MergeTableForNotification(responseData);

                if (result) {
                  // Call the Notification function
                  const emailDetails = await Notification({
                    getEmail: result, // Fix: Pass 'getEmail' instead of 'result'
                    Position,
                  });

                  if (emailDetails) {
                    // Log email details
                    const { subject, message, fromAddress, toAddress } =
                      emailDetails;

                    await sendEmail(subject, message, fromAddress, toAddress);
                  } else {
                    console.error("Notification returned undefined!");
                  }
                } else {
                  console.error(
                    "MergeTableForNotification returned undefined!"
                  );
                }
                setVisibleData([]);
                setData(null);
                successFlag = true; // Set the flag to true
              }
            }
          } catch (err) {}
        }
      };

      updateTimeSheetFunction(updatedRejectedItems);
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

    // Filter out items that have matching sapNo in mergedData
    const afterRemoved = data?.filter(
      (val) => !mergedData.some((fil) => val.id === fil.id)
    );

    // Update the state with the filtered data
    setData(afterRemoved);
    setAllApprovedData([]);
    setAllRejectedData([]);
  }, [allApprovedData, allRejectedData, data]);
  const convertToISODate = (dateString) => {
    try {
      const [year, month, day] = dateString.split("/");

      return `${month}/${year}/${day}`; // 'M/D/YYYY'
    } catch {}
  };

  return (
    <div>
      <div>
        {currentStatus === true ? (
          <div>
            <div className="flex justify-end w-full mr-7">
              <SearchBoxForTimeSheet
                allEmpDetails={data}
                searchResult={searchResult}
                secondaryData={secondaryData}
                Position={Position}
                placeholder="Badge No."
              />
            </div>
            <div className="table-container" onScroll={handleScroll}>
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
                          return (
                            <tr
                              key={index + 1}
                              className="text-dark_grey h-[40px] text-sm rounded-sm shadow-md border-b-2 border-[#CECECE] bg-white"
                              onClick={() => {
                                toggleFunction();
                                editBLNG(m);
                              }}
                            >
                              <td className="text-center px-4 flex-1">
                                {index + 1}
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
              className={`flex justify-center my-5 ${
                visibleData && visibleData.length > 0 ? "" : "hidden"
              }`}
            >
              <button
                className={`rounded px-3 py-2 ${
                  userIdentification === "Manager" ? "w-40" : "w-52"
                } bg-[#FEF116] text_size_5 text-dark_grey mb-10`}
                onClick={() => {
                  if (userIdentification !== "Manager") {
                    toggleFunctionForAssiMana();

                    // const fetchDataAndDelete = async () => {
                    //   try {
                    //     console.log("Fetching and Deleting SBW Data...");
                    //     // setIsDeleting(true); // Set loading state
                    //     let nextToken = null; // Initialize nextToken for pagination

                    //     do {
                    //       // Define the filter for fetching SBW data
                    //       const filter = {
                    //         and: [{ fileType: { eq: "SBW" } }],
                    //       };

                    //       // Fetch the BLNG data using GraphQL with pagination
                    //       const response = await client.graphql({
                    //         query: listTimeSheets,
                    //         variables: { filter: filter, nextToken: nextToken }, // Pass nextToken for pagination
                    //       });

                    //       // Extract data and nextToken
                    //       const SBWdata =
                    //         response?.data?.listTimeSheets?.items || [];
                    //       nextToken = response?.data?.listTimeSheets?.nextToken; // Update nextToken for the next fetch

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
                  }
                }}
              >
                {userIdentification === "Manager"
                  ? "Finalize and Submit"
                  : "Assign Manager"}
              </button>
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
          messageTwo={"this might take a few seconds..."}
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
        />
      )}

      {toggleForRemark === true && (
        <PopupForAddRemark
          toggleForRemarkFunc={toggleForRemarkFunc}
          addRemarks={addRemarks}
          passSelectedData={passSelectedData}
        />
      )}
    </div>
  );
};
