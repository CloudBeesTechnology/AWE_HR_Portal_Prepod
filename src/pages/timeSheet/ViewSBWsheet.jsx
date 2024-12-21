import { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
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
import { createTimeSheet, deleteTimeSheet, updateTimeSheet } from "../../graphql/mutations";
import { listTimeSheets } from "../../graphql/queries";
import { UseScrollableView } from "./customTimeSheet/UseScrollableView";
import { useMergeTableForNotification } from "./customTimeSheet/useMergeTableForNotification";
import { Notification } from "./customTimeSheet/Notification";
const client = generateClient();
export const ViewSBWsheet = ({
  excelData,
  returnedTHeader,
  titleName,
  setExcelData,
  convertedStringToArrayObj,
  Position,
  fileName,
}) => {
  const uploaderID = localStorage.getItem("userID")?.toUpperCase();
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [editObject, setEditObject] = useState();
  const [toggleAssignManager, setToggleAssignManager] = useState(false);
  const [toggleHandler, setToggleHandler] = useState(false);

  const [loading, setLoading] = useState(true);
  const [userIdentification, setUserIdentification] = useState("");
  const [response, setResponse] = useState(null);
  const [showStatusCol, setShowStatusCol] = useState(null);
  const [successMess, setSuccessMess] = useState(null);

  const { handleScroll, visibleData, setVisibleData } = UseScrollableView(
    data,
    "TimeKeeper"
  );

  const getEmail = useMergeTableForNotification(response);

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

  console.log(convertedStringToArrayObj);
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
    } else if (getPosition === "TimeKeeper") {
      setUserIdentification("TimeKeeper");
    }

    // console.log(getPosition);
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

      setCurrentStatus(result); // Assuming setCurrentStatus is defined
      setShowStatusCol(result);
      // setLoading(false);
    };

    if (returnedTHeader && returnedTHeader.length > 0) {
      checkKeys();
    } else if (!returnedTHeader) {
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
      console.log("Success Message : ", responseData);
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
    const result = Array.isArray(data[0]?.data)
      ? editNestedData(data, getObject)
      : editFlatData(data, getObject);

    setData(result);
  };

  const AllFieldData = useTableFieldData(titleName);
  const renameKeysFunctionAndSubmit = async (managerData) => {
    if (userIdentification !== "Manager") {
      const result =
        data &&
        data.map((val) => {
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
            remarks: val.REMARKS || "",
            empWorkInfo: [JSON.stringify(val?.jobLocaWhrs)] || [],
            fileType: "SBW",
            status: "Pending",
          };
        });

        const finalResult = result.map((val) => {
          return {
            ...val,
            assignTo: managerData.mbadgeNo,
            assignBy: uploaderID,
            // trade: managerData.mfromDate,
            // tradeCode: managerData.muntilDate,
          };
        });
        
        const sendTimeSheets = async (timeSheetData) => {
          let successFlag = false;
          for (const timeSheet of timeSheetData) {
            try {
              const response = await client.graphql({
                query: createTimeSheet,
                variables: {
                  input: timeSheet,
                },
              });
  
              if (response?.data?.createTimeSheet) {
                console.log(
                  "TimeSheet created successfully:",
                  response.data.createTimeSheet
                );
                const responseData = response.data.createTimeSheet;
                if (!successFlag) {
                  toggleSFAMessage(true, responseData); // Only toggle success message once
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
       const MultipleBLNGfile =
        data &&
        data.map((val) => {
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
            status: "Approved",
          };
        });

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
  
        updateTimeSheetFunction(MultipleBLNGfile);
      
    }
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
              <table className="styled-table">
                <thead className="sticky-header">
                  <tr className="text_size_5">
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
                    {showStatusCol === true ? (
                      ""
                    ) : (
                      <td className="px-4 flex-1 text_size_7">STATUS</td>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {visibleData && visibleData?.length > 0
                    ? visibleData.map((value, index) => {
                        const renderRows = (m, ind) => {
                          const isStatusPending = m.status === "Pending";
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
                                {m.NAME}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.DEPTDIV}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.BADGE}
                              </td>
                              {/* <td className="text-center px-4 flex-1">{m.DEPT}</td> */}
                              <td className="text-center px-4 flex-1">
                                {m.DATE}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.IN}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.OUT}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.TOTALINOUT}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.ALLDAYMINHRS}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.NETMINUTES}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.TOTALHOURS}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.NORMALWORKINGHRSPERDAY}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.WORKINGHOURS}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.OT}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.REMARKS}
                              </td>
                              {isStatusPending && (
                                <td
                                  className={`text-center px-4 flex-1 ${
                                    m.status === "Approved"
                                      ? "text-[#0CB100]"
                                      : "text_size_8"
                                  }`}
                                >
                                  {m.status}
                                </td>
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
                            No Table Data Available Here.
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
                            No Table Data Available Here.
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
                  
                    // const fetchData = async () => {
                    //   try {
                    //     console.log("I am calling You");
                    
                    //     // Fetch the BLNG data using GraphQL
                    //     const response = await client.graphql({ query: listTimeSheets });
                    //     const SBWdata = response?.data?.listTimeSheets?.items || [];
                    
                    //     console.log("Fetched SBW Data:", SBWdata);
                    
                    //     // Filter data for type === "SBW"
                    //     const result = SBWdata.filter((item) => item.type==="SBW");
                    //     console.log("Filtered BLNG Data:", result);
                    
                    //     // Delete each item in the filtered result
                    //     if (result.length > 0) {
                    //       await Promise.all(
                    //         result.map(async (item) => {
                    //           const dailySheet = { id: item.id };
                    
                    //           try {
                    //             const deleteResponse = await client.graphql({
                    //               query: deleteTimeSheet,
                    //               variables: { input: dailySheet },
                    //             });
                    //             console.log("Deleted Item Response:", deleteResponse);
                    //           } catch (err) {
                    //             console.error("Error deleting item:", err);
                    //           }
                    //         })
                    //       );
                    //     } else {
                    //       console.log("No SBW items to delete.");
                    //     }
                    //   } catch (err) {
                    //     console.error("Error in fetchData:", err);
                    //   }
                    // };
                    
                    // // Call the function
                    // fetchData();
                    
                  }
                }}
              >
                {userIdentification === "Manager"
                  ? "Approve"
                  : "Assign Manager"}
              </button>
            </div>
          </div>
        ) : currentStatus === false ? (
          <PopupForMissMatchExcelSheet />
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

      {response && getEmail && successMess && (
        <Notification getEmail={getEmail} Position={Position} />
      )}
    </div>
  );
};
