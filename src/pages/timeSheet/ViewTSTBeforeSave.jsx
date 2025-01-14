import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";

// import {
//   createOffshoreSheet,
//   deleteOffshoreSheet,
//   updateOffshoreSheet,
// } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";

import { EditTimeSheet } from "./EditTimeSheet";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import "../../../src/index.css";

import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listOffshoreSheets,
  listTimeSheets,
} from "../../graphql/queries";
import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
import {
  createTimeSheet,
  deleteTimeSheet,
  updateTimeSheet,
} from "../../graphql/mutations";
import { UseScrollableView } from "./customTimeSheet/UseScrollableView";

import { Notification } from "./customTimeSheet/Notification";
import { sendEmail } from "../../services/EmailServices";
import { PopupForAddRemark } from "./ModelForSuccessMess/PopupForAddRemark";
import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";
import { PopupForSFApproves } from "./ModelForSuccessMess/PopupForSFApproves";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const client = generateClient();

export const ViewTSTBeforeSave = ({
  excelData,
  returnedTHeader,
  Position,
  convertedStringToArrayObj,
  titleName,
  setExcelData,
  fileName,
  showRejectedItemTable,
}) => {
  const uploaderID = localStorage.getItem("userID")?.toUpperCase();
  console.log(convertedStringToArrayObj);
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
  const [response, setResponse] = useState(null);
  const [showStatusCol, setShowStatusCol] = useState(null);

  const [allApprovedData, setAllApprovedData] = useState([]);
  const [allRejectedData, setAllRejectedData] = useState([]);
  const [passSelectedData, setPassSelectedData] = useState(null);

  const [emailInfo, setEmailInfo] = useState(null);
  const { handleScroll, visibleData, setVisibleData } = UseScrollableView(
    data,
    "TimeKeeper"
  );
  const [storingMess, setStoringMess] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItemsTwo, setCheckedItemsTwo] = useState({});
  const MergeTableForNotification = async (responseData) => {
    try {
      const empPersonalInfosResponse = await client.graphql({
        query: listEmpPersonalInfos,
      });

      const candidates =
        empPersonalInfosResponse?.data?.listEmpPersonalInfos?.items;

      if (candidates && responseData) {
        const getManager = candidates.find(
          (candidate) => candidate.empBadgeNo === responseData.assignTo
        );

        const getTimeKeeper = candidates.find(
          (candidate) => candidate.empID === responseData.assignBy
        );

        const emailInfo = {
          ManagerDetails: getManager || null,
          TimeKeeperDetails: getTimeKeeper || null,
          TimeSheetData: responseData,
        };

        setEmailInfo(emailInfo);
        return emailInfo;
      }
    } catch (err) {
      console.error("Error fetching data from GraphQL:", err.message);
    }
    return null;
  };

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
  //       } catch (err) {}
  //     };
  //     fetchData();
  //   }
  // }, [excelData]);

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
                  response.data[Object.keys(response.data)[0]].items; // Extract items
                allData = [...allData, ...items]; // Append fetched items
                nextToken =
                  response.data[Object.keys(response.data)[0]].nextToken; // Get nextToken
              } while (nextToken); // Continue if there's more data

              return allData;
            }

            const fetchWorkInfo = async () => {
              try {
                // Fetch all data with pagination
                const [employeeInfo, empWorkInfos] = await Promise.all([
                  fetchAllData(listEmpPersonalInfos),
                  fetchAllData(listEmpWorkInfos),
                ]);

                const empInfo = employeeInfo; // All employee personal info
                const workInfo = empWorkInfos; // All employee work info

                // Remove sapNo from work info
                const sapNoRemoved = workInfo.map(({ sapNo, ...rest }) => rest);

                const mergedDatas = empInfo
                  .map((empInf) => {
                    const interviewDetails = sapNoRemoved.find(
                      (item) => item?.empID === empInf?.empID
                    );

                    // Return null if all details are undefined
                    if (!interviewDetails) {
                      return null;
                    }

                    return {
                      ...empInf,
                      ...interviewDetails,
                    };
                  })
                  .filter((item) => item !== null);

                console.log(mergedDatas);

                // Merge fetchedData with workInfo based on FID
                const mergedData = fetchedData.map((item) => {
                  const workInfoItem = mergedDatas.find(
                    (info) => info?.sapNo == item?.NO
                  );

                  console.log(workInfoItem);
                  return {
                    ...item,
                    NORMALWORKINGHRSPERDAY: workInfoItem
                      ? workInfoItem.workHrs[workInfoItem.workHrs.length - 1]
                      : null,
                  };
                });

                console.log(mergedData);

                // Set merged data in state
                setData(mergedData);
                setSecondaryData(mergedData);
              } catch (error) {
                console.error("Error fetching work info:", error.message);
              }
            };

            fetchWorkInfo();
          } catch (err) {
          } finally {
            // setLoading is removed ;
          }
        };
        fetchData();
      }
    } catch (err) {
      console.log("Error : ", err);
    }
  }, [excelData]);
  useEffect(() => {
    const getPosition = localStorage.getItem("userType");
    if (getPosition === "Manager") {
      setUserIdentification("Manager");
    } else if (getPosition !== "Manager") {
      setUserIdentification("TimeKeeper");
    }
  }, []);

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
        } catch (error) {
          console.error("Error parsing empWorkInfo for ID:", val.id, error);
        }

        return {
          id: val.id,
          fileName: val.fileName,
          NAME: val.empName || "",
          NO: val.fidNo || "",
          LOCATION: val.companyName || "",
          DATE: val.date || "",
          TOTALHOURS: val.totalNT || 0,
          TOTALHOURS2: val.totalOT || 0,
          TOTALHOURS3: val.totalNTOT || 0,
          WORKINGHOURS: val.actualWorkHrs || 0,
          OT: val?.otTime || 0,
          NORMALWORKINGHRSPERDAY: val?.normalWorkHrs || 0,
          jobLocaWhrs: parsedEmpWorkInfo.flat() || [], // Use parsed empWorkInfo
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
      setData(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const cleanValue = (value) => {
    if (typeof value !== "string") {
      return value; // Return value if not a string (e.g., number, object)
    }
    return value.replace(/[^a-zA-Z0-9]/g, "");
    // Removes all non-alphanumeric characters
  };
  useEffect(() => {
    const checkKeys = async () => {
      const cleanData =
        returnedTHeader &&
        returnedTHeader.map((item) => {
          const cleanedItem = {};
          for (const key in item) {
            cleanedItem[key] = cleanValue(item[key]); // Clean the value, not the key
          }
          return cleanedItem;
        });

      const requiredKeys = ["NAME", "No", "Company", "TOTALHOURS"];

      const result = await new Promise((resolve) => {
        // Check if all required keys are in the object
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
      console.log(result);
      setShowStatusCol(result);
      setCurrentStatus(result); // Assuming setCurrentStatus is defined
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

  const toggleSFAMessage = useCallback(async (value, responseData) => {
    setSuccessMess(value);
    if (value === true && responseData) {
      setResponse(responseData);
    } else {
      setResponse(null);
    }
  }, []);
  // const toggleSFAMessage = async (value, responseData) => {

  // };

  const toggleFunctionForAssiMana = () => {
    setToggleAssignManager(!toggleAssignManager);
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
      console.log(result);
      const updatedData = result?.map((item) => {
        console.log(item);
        // Check if jobLocaWhrs is a non-null, non-empty array and assign LOCATION if valid
        if (Array.isArray(item?.jobLocaWhrs) && item?.jobLocaWhrs?.length > 0) {
          item.LOCATION = item?.jobLocaWhrs[0]?.LOCATION;
        } else {
          item.LOCATION = null; // Default to null or any other fallback value
        }
        return item;
      });

      setData(updatedData);
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
      const result =
        data &&
        data.map((val) => {
          return {
            fileName: fileName,
            empName: val.NAME || "",
            fidNo: val.NO || "",
            companyName: val.LOCATION || "",
            date: val.DATE || "",
            totalNT: val.TOTALHOURS || "",
            totalOT: val.TOTALHOURS2 || "",
            totalNTOT: val.TOTALHOURS3 || "",
            normalWorkHrs: val?.NORMALWORKINGHRSPERDAY || 0,
            actualWorkHrs: val.WORKINGHOURS || "",
            otTime: val.OT || "",
            remarks: val.REMARKS || "",
            empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
            companyName: val?.LOCATION,
            fileType: "Offshore",
            status: "Pending",
          };
        });

      const finalResult = result.map((val) => {
        return {
          ...val,
          assignTo: managerData.mbadgeNo,
          assignBy: uploaderID,
          trade: managerData.mfromDate,
          tradeCode: managerData.muntilDate,
        };
      });

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

                successFlag = true; // Set the flag to true
              }
              setVisibleData([]);
              setData(null);
            }
          } catch (error) {
            console.error("Error creating TimeSheet:", error);
            toggleSFAMessage(false);
          }
        }
      };

      sendTimeSheets(finalResult);
      // }
    } else if (userIdentification === "Manager") {
      // const UpdateRejectedItems =
      //   data &&
      //   data.map((value) => {
      //     return {
      //       id: value?.id || null,
      //       dailySheet: value?.data?.map((val) => {
      //         return {
      //           name: val.NAME || "",
      //           no: val.NO || "",
      //           location: val.LOCATION || "",
      //           date: val.DATE || "",
      //           ntTotalHrs: val.TOTALHOURS || "",
      //           otTotalHrs: val.TOTALHOURS2 || "",
      //           totalHrs: val.TOTALHOURS3 || "",
      //           normalWhrsPerDay: val?.NORMALWORKINGHRSPERDAY || 0,
      //           workHrs: val.WORKINGHOURS || "",
      //           OT: val.OT || "",
      //           remarks: val.REMARKS || "",
      //           jobLocaWhrs: val?.jobLocaWhrs || [],
      //           managerData: val?.managerData,
      //         };
      //       }),
      //     };
      //   });

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
                companyName: val.LOCATION || "",
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

            if (response.data.updateTimeSheet) {
              const responseData = response.data.updateTimeSheet;
              console.log(response.data.updateTimeSheet);
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
                    console.log(subject, message, fromAddress, toAddress);
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

      updateTimeSheetFunction(MultipleBLNGfile);

      // const result = MultipleBLNGfile.map(async (obj) => {
      //   const finalData = {
      //     id: obj.id,
      //     dailySheet: JSON.stringify(obj.dailySheet),
      //     status: "Approved",
      //   };

      //   if (finalData.dailySheet) {
      //     await client
      //       .graphql({
      //         query: updateTimeSheet,
      //         variables: {
      //           input: finalData,
      //         },
      //       })
      //       .then((res) => {
      //         if (res.data.updateTimeSheet) {
      //           // console.log(
      //           //   "res.data.updateOffshoreSheet : ",
      //           //   res.data.updateOffshoreSheet
      //           // );
      //           toggleSFAMessage(true);
      // setVisibleData([]);
      // setData(null);
      //         }
      //       })
      //       .catch((err) => {
      //         toggleSFAMessage(false);
      //       });
      //   }
      // });
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
                fidNo: val.NO || "",
                companyName: val.LOCATION || "",
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
              const responseData = response?.data?.updateTimeSheet;

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
              setVisibleData([]);
              setData(null);
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
    console.log(action);
    if (action === "Approved") {
      console.log(data);
      setAllApprovedData((prevApprovedData) => {
        // Replace old data if ID matches, otherwise keep existing data
        const updatedData = prevApprovedData.filter(
          (item) => item.id !== data.id
        );
        const updateStatus = { ...data, status: "Approved" };

        return [...updatedData, updateStatus]; // Add the new data
      });
    } else if (action === "Rejected") {
      setPassSelectedData(data);
      console.log(data);
      setAllRejectedData((prevRejectedData) => {
        // Replace old data if ID matches, otherwise keep existing data
        const updatedData = prevRejectedData.filter(
          (item) => item.id !== data.id
        );
        return [...updatedData, data]; // Add the new data
      });
      // Update the selected data
    }
  };
  const addRemarks = (data) => {
    console.log(data);
    const dataAlongWithRemark = allRejectedData.map((m) => {
      if (m.id === data.id) {
        console.log(data);
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

  console.log(allApprovedData, " : ", allRejectedData);

  const convertToISODate = (dateString) => {
    try {
      const [year, month, day] = dateString.split("/");

      return `${month}/${year}/${day}`; // 'M/D/YYYY'
    } catch {}
  };
  return (
    <div>
      {currentStatus ? (
        <div>
          <div className="flex justify-end w-full mr-7">
            <SearchBoxForTimeSheet
              allEmpDetails={data}
              searchResult={searchResult}
              secondaryData={secondaryData}
              Position={Position}
              placeholder="Sap No."
            />
          </div>

          <div className="table-container " onScroll={handleScroll}>
            {/* w-[1190px] */}
            <table className="styled-table w-[100%]">
              {/*  */}
              <thead className="sticky-header border">
                <tr className="text_size_5 ">
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
                </tr>
              </thead>

              <tbody>
                {visibleData && visibleData.length > 0
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
                                    className="h-4 w-4"
                                    type="checkbox"
                                    checked={checkedItems[m.id] || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                      console.log(m);

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
                                        // setCheckedItemsTwo({});
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
                        : userIdentification !== "Manager" && renderRows(value);
                      // : setData(null);
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
            className={`flex justify-center my-5 gap-5 py-3${
              visibleData && visibleData.length > 0 ? "" : "hidden"
            }`}
          >
            <button
              className={`rounded px-3 py-2 ${
                userIdentification === "Manager" ? "w-52" : "w-52"
              } bg-[#FEF116] text_size_5 text-dark_grey mb-10`}
              onClick={() => {
                if (userIdentification !== "Manager") {
                  toggleFunctionForAssiMana();
                  //  const fetchDataAndDelete = async () => {
                  //     try {
                  //       console.log("Fetching and Deleting SBW Data...");
                  //       // setIsDeleting(true); // Set loading state
                  //       let nextToken = null; // Initialize nextToken for pagination

                  //       do {
                  //         // Define the filter for fetching SBW data
                  //         const filter = {
                  //           and: [{ fileType: { eq: "Offshore" } }],
                  //         };

                  //         // Fetch the BLNG data using GraphQL with pagination
                  //         const response = await client.graphql({
                  //           query: listTimeSheets,
                  //           variables: { filter: filter, nextToken: nextToken }, // Pass nextToken for pagination
                  //         });

                  //         // Extract data and nextToken
                  //         const SBWdata =
                  //           response?.data?.listTimeSheets?.items || [];
                  //         nextToken = response?.data?.listTimeSheets?.nextToken; // Update nextToken for the next fetch

                  //         console.log("Fetched SBW Data:", SBWdata);

                  //         // Delete each item in the current batch
                  //         await Promise.all(
                  //           SBWdata.map(async (item) => {
                  //             try {
                  //               const deleteResponse = await client.graphql({
                  //                 query: deleteTimeSheet,
                  //                 variables: { input: { id: item.id } },
                  //               });
                  //               console.log(
                  //                 "Deleted Item Response:",
                  //                 deleteResponse
                  //               );
                  //             } catch (deleteError) {
                  //               console.error(
                  //                 `Error deleting item with ID ${item.id}:`,
                  //                 deleteError
                  //               );
                  //             }
                  //           })
                  //         );

                  //         console.log("Batch deletion completed.");
                  //       } while (nextToken); // Continue fetching until no more data

                  //       console.log(
                  //         "All SBW items deletion process completed."
                  //       );
                  //     } catch (fetchError) {
                  //       console.error(
                  //         "Error in fetchDataAndDelete:",
                  //         fetchError
                  //       );
                  //     } finally {
                  //       // setIsDeleting(false); // Reset loading state
                  //     }
                  //   };
                  //   fetchDataAndDelete();
                } else if (userIdentification === "Manager") {
                  renameKeysFunctionAndSubmit();
                  removeCheckedItem();

                  // setCheckedItems({});
                }
              }}
            >
              {userIdentification === "Manager"
                ? "Finalize and Submit"
                : "Assign Manager"}
            </button>
            {/* <button
              className={`rounded px-3 py-2 ${
                userIdentification === "Manager" ? "w-60" : "w-52"
              } bg-[#FEF116] text_size_5 text-dark_grey mb-10`}
            >
              Finalize and Submit
            </button> */}
            {/* <button
              className={`rounded px-3 py-2 ${
                userIdentification === "Manager" ? "w-60" : "w-52"
              } bg-[#FEF116] text_size_5 text-dark_grey mb-10`}
            >
              Reject Selected row
            </button> */}
          </div>
        </div>
      ) : (
        // : currentStatus === false ? (
        //   <PopupForMissMatchExcelSheet setClosePopup={setClosePopup} />
        // )
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
