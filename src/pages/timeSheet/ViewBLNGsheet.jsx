import React, { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { EditTimeSheet } from "./EditTimeSheet";
import { generateClient } from "@aws-amplify/api";

import { listBlngs, listEmpPersonalInfos, listEmpWorkInfos } from "../../graphql/queries";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";

import "../../../src/index.css";
import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
import { createTimeSheet, updateTimeSheet } from "../../graphql/mutations";
import { UseScrollableView } from "./customTimeSheet/UseScrollableView";

import { Notification } from "./customTimeSheet/Notification";
import { MergeTableForNotification } from "./customTimeSheet/MergeTableForNotification";
import { sendEmail } from "../../services/EmailServices";
const client = generateClient();

export const ViewBLNGsheet = ({
  excelData,
  returnedTHeader,
  convertedStringToArrayObj,
  titleName,
  setExcelData,
  Position,
  fileName,
}) => {
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
  const [response, setResponse] = useState(null);
  const [showStatusCol, setShowStatusCol] = useState(null);

  const { handleScroll, visibleData, setVisibleData } = UseScrollableView(
    data,
    "TimeKeeper"
  );

  
  // useEffect(() => {
  //   if (excelData) {
  //     const fetchData = async () => {
  //       // setLoading is removed
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
  //         // setData(fetchedData);
  //         const fetchWorkInfo = async () => {
  //           // Fetch the BLNG data using GraphQL
  //           const [empWorkInfos] = await Promise.all([
  //             client.graphql({
  //               query: listEmpWorkInfos,
  //             }),
  //           ]);
  //           const workInfo = empWorkInfos?.data?.listEmpWorkInfos?.items;

  //           // Merge fetchedData with workInfo based on FID
  //           const mergedData = fetchedData.map((item) => {
  //             const workInfoItem = workInfo.find(
  //               (info) => info.sapNo == item.FID
  //             );

  //             return {
  //               ...item,
  //               NORMALWORKINGHRSPERDAY: workInfoItem
  //                 ? workInfoItem.workHrs[workInfoItem.workHrs.length - 1]
  //                 : null,
  //             };
  //           });
  //           console.log(mergedData);
  //           setData(mergedData); // Set merged data
  //           setSecondaryData(mergedData);
  //         };

  //         fetchWorkInfo();
  //       } catch (err) {
  //       } finally {
  //         // setLoading is removed ;
  //       }
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
            
                const items = response.data[Object.keys(response.data)[0]].items; // Extract items
                allData = [...allData, ...items]; // Append fetched items
                nextToken = response.data[Object.keys(response.data)[0]].nextToken; // Get nextToken
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
            
                console.log(fetchedData);
            
                // Merge fetchedData with workInfo based on FID
                const mergedData = fetchedData.map((item) => {
                  const workInfoItem = mergedDatas.find(
                    (info) => info?.sapNo == item?.FID
                  );
              
               
                  return {
                    ...item,
                    NORMALWORKINGHRSPERDAY: workInfoItem
                      ? workInfoItem?.workHrs[workInfoItem.workHrs.length - 1]
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
    } else if (getPosition === "TimeKeeper") {
      setUserIdentification("TimeKeeper");
    }
  }, [convertedStringToArrayObj]);

  const pendingData = (data) => {
    if (data && data.length > 0) {
      setCurrentStatus(true);

      const result =
        data &&
        data.map((val) => {
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
            fileName: fileName,
            FID: val.fidNo || 0,
            NAMEFLAST: val.empName || "",
            ENTRANCEDATEUSED: val.date || "",
            ENTRANCEDATETIME: val.inTime?.replace(/[\[\]]/g, "") || "",
            EXITDATETIME: val.outTime?.replace(/[\[\]]/g, "") || "",
            // DAYDIFFERENCE: val.day || 0,
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
      return value;
    }
    return value.replace(/[^a-zA-Z0-9]/g, "");
  };

  useEffect(() => {
    const checkKeys = async () => {
      // setLoading is removed
      const cleanData = returnedTHeader.map((item) => {
        const cleanedItem = {};
        for (const key in item) {
          cleanedItem[key] = cleanValue(item[key]);
        }

        return cleanedItem;
      });

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
      // console.log("Result: ", result);
      setClosePopup(true);
      setShowStatusCol(result);
      setCurrentStatus(result); // Assuming setCurrentStatus is defined
      // setLoading is removed ;
    };

    if (returnedTHeader && returnedTHeader.length > 0) {
      checkKeys();
    } else if (!returnedTHeader) {
      const fetchData = async () => {
        setCurrentStatus(true);
        // setLoading is removed
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
          // setLoading is removed ;
        }
      };

      // Call the fetchData function asynchronously
      fetchData();
    } else {
      setCurrentStatus(false);
      //  setLoading is removed ;
    }
  }, [returnedTHeader, convertedStringToArrayObj]);

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
    const result = Array.isArray(data[0]?.data)
      ? editNestedData(data, getObject)
      : editFlatData(data, getObject);

      const updatedData = result?.map((item) => {
        // Check if jobLocaWhrs is a non-null, non-empty array and assign LOCATION if valid
        if (Array.isArray(item.jobLocaWhrs) && item.jobLocaWhrs.length > 0) {
          item.LOCATION = item.jobLocaWhrs[0].LOCATION;
        } else {
          item.LOCATION = null; // Default to null or any other fallback value
        }
        return item;
      });
    setData(updatedData);
  };

  const AllFieldData = useTableFieldData(titleName);

  const renameKeysFunctionAndSubmit = async (managerData) => {
    if (userIdentification !== "Manager") {
      const result =
        data &&
        data.map((val, i) => {
          return {
            fileName: fileName,
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
          trade: managerData.mfromDate,
          tradeCode: managerData.muntilDate,
        };
      });

      const sendTimeSheets = async (timeSheetData) => {
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

      sendTimeSheets(finalResult);

      const batchSize = 1000;

      // }
    } else if (userIdentification === "Manager") {
      const MultipleBLNGfile =
        data &&
        data.map((val) => {
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
            status: "Approved",
            remarks: val?.REMARKS || "",
          };
        });

      const updateTimeSheetFuction = async (timeSheetData) => {
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
              setVisibleData([]);
              setData(null);
            }
          } catch (error) {
            console.error("Error creating TimeSheet:", error);
            toggleSFAMessage(false);
          }
        }
      };

      updateTimeSheetFuction(MultipleBLNGfile);
    }
  };

  return (
    <div>
      <div>
        {currentStatus === true ? (
          <div>
            <div className="flex justify-end w-full mr-7 ">
              <SearchBoxForTimeSheet
                allEmpDetails={data}
                searchResult={searchResult}
                secondaryData={secondaryData}
                Position={Position}
                placeholder="FID"
              />
            </div>
            <div
              // className="mt-9 overflow-x-auto overflow-y-scroll max-h-[500px]"
              className="table-container"
              onScroll={handleScroll}
            >
              <table
                className="styled-table "
                // className="table-auto text-center w-full  border-2 border-lite_grey"
              >
                <thead className="sticky-header">
                  <tr
                    // className="bg-lite_grey  text-dark_grey text_size_5"
                    className="text_size_5"
                  >
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
                    {showStatusCol === true ? (
                      ""
                    ) : (
                      <td className="px-4 text-center text_size_7">STATUS</td>
                    )}
                  </tr>
                </thead>
                {console.log(visibleData)}
                <tbody>
                  {visibleData && visibleData?.length > 0 ? (
                    visibleData.map((value, index) => {
                      const renderRows = (rowData, ind) => {
                        const isStatusPending = rowData?.status === "Pending";

                        return (
                          <tr
                            key={
                              userIdentification === "Manager"
                                ? index + 1
                                : index + 1
                            }
                            className="text-dark_grey h-[40px] text-sm rounded-sm shadow-md border-b-2 border-[#CECECE] bg-white "
                            onClick={() => {
                              toggleFunction();
                              editBLNG(rowData);
                            }}
                          >
                            <td className="text-center px-4 flex-1">
                              {userIdentification === "Manager"
                                ? index + 1
                                : index + 1}
                            </td>
                            <td className="text-start px-4 flex-1">
                              {rowData?.FID}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.NAMEFLAST}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.ENTRANCEDATEUSED}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.ENTRANCEDATETIME}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData?.EXITDATETIME}
                            </td>
                            {/* <td className="text-center px-4 flex-1">
                              {rowData?.DAYDIFFERENCE || 0}
                            </td> */}
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
                              <td
                                className={`text-center px-4 flex-1 ${
                                  rowData?.status === "Approved"
                                    ? "text-[#0CB100]"
                                    : "text_size_8"
                                }`}
                              >
                                {rowData?.status}
                              </td>
                            )}
                          </tr>
                        );
                      };
                      //value.data.map(renderRows)
                      return userIdentification === "Manager"
                        ? renderRows(value)
                        : userIdentification !== "Manager" && renderRows(value);
                      // : setData(null);
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="100%"
                        className="text-center text-dark_ash text_size_5 bg-white"
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
                  } else if (userIdentification === "Manager") {
                    renameKeysFunctionAndSubmit();
                  }
                }}
              >
                {userIdentification === "Manager"
                  ? "Approve"
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
          editFunction={editBLNGFunction}
          titleName={titleName}
          Position={Position}
        />
      )}
      <SuccessMessage
        successMess={successMess}
        toggleSFAMessage={toggleSFAMessage}
        setExcelData={setExcelData}
        userIdentification={userIdentification}
      />
      {toggleAssignManager === true && (
        <PopupForAssignManager
          toggleFunctionForAssiMana={toggleFunctionForAssiMana}
          renameKeysFunctionAndSubmit={renameKeysFunctionAndSubmit}
        />
      )}
    </div>
  );
};
