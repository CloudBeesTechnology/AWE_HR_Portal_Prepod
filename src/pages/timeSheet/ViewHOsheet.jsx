import { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
// import {
//   createHeadOffice,
//   deleteBlng,
//   deleteHeadOffice,
//   updateHeadOffice,
// } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { EditTimeSheet } from "./EditTimeSheet";
import { PopupForSFApproves } from "./ModelForSuccessMess/PopupForSFApproves";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";
// import {
//   listEmpPersonalInfos,
//   listEmpWorkInfos,
//   listHeadOffices,
// } from "../../graphql/queries";
import { useTableMerged } from "./customTimeSheet/UserTableMerged";
import "../../../src/index.css";

import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
import {
  createTimeSheet,
  deleteTimeSheet,
  updateTimeSheet,
} from "../../graphql/mutations";
import { UseScrollableView } from "./customTimeSheet/UseScrollableView";
import { listTimeSheets } from "../../graphql/queries";
import { Notification } from "./customTimeSheet/Notification";
import { useMergeTableForNotification } from "./customTimeSheet/useMergeTableForNotification";
const client = generateClient();

export const ViewHOsheet = ({
  setExcelData,
  excelData,
  returnedTHeader,
  Position,
  convertedStringToArrayObj,
  titleName,
  fileName,
}) => {
  const uploaderID = localStorage.getItem("userID")?.toUpperCase();

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
  // useEffect(()=>{
  //   const fetchWorkInfo = async () => {
  //     // Fetch the BLNG data using GraphQL
  //     const [empWorkInfos] = await Promise.all([
  //       client.graphql({
  //         query: listTimeSheets,
  //       }),
  //     ]);
  //     const workInfo = empWorkInfos?.data?.listTimeSheets?.items;
  //     console.log(workInfo)
  //   }
  //     fetchWorkInfo();
  // },[])
  useEffect(() => {
    const getPosition = localStorage.getItem("userType");
    if (getPosition === "Manager") {
      setUserIdentification("Manager");
    } else if (getPosition === "TimeKeeper") {
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
            console.error("Error parsing empWorkInfo for ID:", val.id, error);
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

      console.log(result);
      setData(result);
      setSecondaryData(result);
    }
  };
  // const searchResult = (result) => {
  //   setData(result);
  // };
  const searchResult = async (searchedData) => {
    try {
      const result = await searchedData;
      setData(result);
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

      setShowStatusCol(result);
      setCurrentStatus(result); // Assuming setCurrentStatus is defined
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
          //       managerData: value[2],
          //     };
          //   })
          //   .filter((item) => item.data && item.data.length > 0);

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
    } else {
      setCurrentStatus(false);
      // setLoading(false);
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
        if (val.BADGE === getObject.BADGE && val.DATE === getObject.DATE) {
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

    setData(result);
  };

  const AllfieldData = useTableFieldData(titleName);

  const renameKeysFunctionAndSubmit = async (managerData) => {
    if (userIdentification !== "Manager") {
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
            status: "Pending",
            remarks: val.REMARKS || "",
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
      //   CREATE
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

      console.log(finalResult);

      sendTimeSheets(finalResult);
    } else if (userIdentification === "Manager") {
      const MultipleBLNGfile =
        data &&
        data.map((val) => {
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
            status: "Approved",
            remarks: val.REMARKS || "",
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
                    <td className="px-4 flex-1 text_size_7">S No.</td>
                    {AllfieldData?.tableHeader.map((header, index) => (
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
                      <td className="px-5 flex-1 text_size_7">STATUS</td>
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
                                {m.REC}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.CTR}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.DEPT}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.EMPLOYEEID}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.BADGE}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.NAME}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.DATE}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.ONAM}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.OFFAM}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.ONPM}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.OFFPM}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.IN}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.OUT}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.TOTALINOUT || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.ALLDAYMINUTES || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.NETMINUTES || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.TOTALHOURS || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.NORMALWORKINGHRSPERDAY || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.TOTALACTUALHOURS || 0}
                              </td>
                              <td className="text-center px-4 flex-1">
                                {m.OT || 0}
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
                            className="px-6 py-6 text-center text-dark_ash text_size_5 bg-white  "
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
                    // const fetchData = async () => {
                    // console.log("I am calling You");
                    // // Fetch the BLNG data using GraphQL
                    //   const [fetchBLNGdata] = await Promise.all([
                    //     client.graphql({
                    //       query: listTimeSheets,
                    //     }),
                    //   ]);
                    //   const BLNGdata =
                    //     fetchBLNGdata?.data?.listTimeSheets?.items;
                    //     // console.log(BLNGdata)
                    //     // console.log("BLNGdata : ", BLNGdata);
                    //     const deleteFunction =
                    //       BLNGdata &&
                    //       BLNGdata.map(async (m) => {
                    //         const dailySheet = {
                    //           id: m.id,
                    //         };
                    //         await client
                    //           .graphql({
                    //             query: deleteTimeSheet,
                    //             variables: {
                    //               input: dailySheet,
                    //             },
                    //           })
                    //           .then((res) => {
                    //             console.log(res);
                    //           })
                    //           .catch((err) => {
                    //             console.log(err);
                    //           });
                    //       });
                    // };
                    // fetchData();
                    // FOR DELETE
                    // const deleteFunction = async () => {
                    //   const weaklysheet = {
                    //     id: "3deaccb4-7b1e-43b3-aa94-fd7d4cf46f56",
                    //   };

                    //   await client
                    //     .graphql({
                    //       query: deleteHeadOffice,
                    //       variables: {
                    //         input: weaklysheet,
                    //       },
                    //     })
                    //     .then((res) => {
                    //       console.log(res);
                    //     })
                    //     .catch((err) => {
                    //       console.log(err);
                    //     });
                    // };
                    // deleteFunction();
                  } else if (userIdentification === "Manager") {
                    renameKeysFunctionAndSubmit();
                  }
                }}
              >
                {userIdentification === "Manager"
                  ? "Approve"
                  : "Assign Manager"}
                {/* Send for Approval */}
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
          fieldObj={AllfieldData?.fieldObj || {}}
          fields={AllfieldData?.fields || []}
          tableHeader={AllfieldData?.tableHeader || []}
          editFunction={editHOFunction}
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

      {response && getEmail  && successMess && Position && (
        <Notification getEmail={getEmail} Position={Position} />
      )}
      
    </div>
  );
};
