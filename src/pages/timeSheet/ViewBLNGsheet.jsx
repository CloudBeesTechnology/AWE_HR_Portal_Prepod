import React, { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { EditTimeSheet } from "./EditTimeSheet";
import { generateClient } from "@aws-amplify/api";
// import {
//   createBlng,
//   deleteBlng,
//   deleteHeadOffice,
//   updateBlng,
// } from "../../graphql/mutations";

import { listBlngs, listEmpWorkInfos } from "../../graphql/queries";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";

import "../../../src/index.css";
import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
import { createTimeSheet, updateTimeSheet } from "../../graphql/mutations";
import { UseScrollableView } from "./customTimeSheet/UseScrollableView";
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
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  const [editObject, setEditObject] = useState();
  const [toggleHandler, setToggleHandler] = useState(false);
  const [toggleAssignManager, setToggleAssignManager] = useState(false);
  const [userIdentification, setUserIdentification] = useState("");
  const [successMess, setSuccessMess] = useState(null);

  const [showStatusCol, setShowStatusCol] = useState(null);

  const { handleScroll, visibleData, setVisibleData } = UseScrollableView(
    data,
    Position
  );

  useEffect(() => {
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

          // setForUpdateBlng(fetchedData);
          // setData(fetchedData);
          const fetchWorkInfo = async () => {
            // Fetch the BLNG data using GraphQL
            const [empWorkInfos] = await Promise.all([
              client.graphql({
                query: listEmpWorkInfos,
              }),
            ]);
            const workInfo = empWorkInfos?.data?.listEmpWorkInfos?.items;

            // Merge fetchedData with workInfo based on FID
            const mergedData = fetchedData.map((item) => {
              const workInfoItem = workInfo.find(
                (info) => info.sapNo == item.FID
              );

              return {
                ...item,
                NORMALWORKINGHRSPERDAY: workInfoItem
                  ? workInfoItem.workHrs[0]
                  : null,
              };
            });

            setData(mergedData); // Set merged data
            setSecondaryData(mergedData);
          };

          fetchWorkInfo();
        } catch (err) {
        } finally {
          // setLoading is removed ;
        }
      };
      fetchData();
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
        data.map((vals) => {
          return {
            id: vals?.id || null,
            data: vals?.data?.map((val, index) => {
              return {
                FID: val.fid || 0,
                NAMEFLAST: val.name || "",
                ENTRANCEDATEUSED: val.entDate || "",
                ENTRANCEDATETIME: val.entDT || "",
                EXITDATETIME: val.exitDT || "",
                DAYDIFFERENCE: val.day || 0,
                AVGDAILYTOTALBYDAY: val.avgTotalDay || "",
                AHIGHLIGHTDAILYTOTALBYGROUP: val.totalhrs || "",
                ADININWORKSENGINEERINGSDNBHD: val.workDN || "",
                WORKINGHOURS: val.workhrs || 0,
                OT: val.OT || 0,
                NORMALWORKINGHRSPERDAY: val?.normalWhrsPerDay || 0,
                jobLocaWhrs: val.jobLocaWhrs || [],
                REMARKS: val.remarks || "",
                status: val.status || "",
                managerData: val?.managerData,
              };
            }),
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
          // const filterPending = fetchedData.filter(
          //   (val) => val.status !== "Approved"
          // );

          const filterPending = fetchedData
            .map((value) => {
              return {
                id: value[0]?.id,
                data: value[1]?.filter((val) => {
                  if (val.status !== "Approved") {
                    return val;
                  }
                }),
              };
            })
            .filter((item) => item.data && item.data.length > 0);
          //   const filterPending =
          // console.log(filterPending);
          //   console.log(fetchedData);

          if (userIdentification === "Manager") {
            const finalData = await SendDataToManager(filterPending);
            console.log(finalData)
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
  const toggleSFAMessage = (value) => {
    setSuccessMess(value);
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

    setData(result);
  };

  const AllFieldData = useTableFieldData(titleName);

  const renameKeysFunctionAndSubmit = async (managerData) => {
  
    if (userIdentification !== "Manager") {
      const result =
        data &&
        data.map((val) => {
          return {
            fid: val?.FID || 0,
            name: val?.NAMEFLAST || "",
            entDate: val?.ENTRANCEDATEUSED || "",
            entDT: val?.ENTRANCEDATETIME || "",
            exitDT: val?.EXITDATETIME || "",
            day: val?.DAYDIFFERENCE || 0,
            avgTotalDay: val?.AVGDAILYTOTALBYDAY || "",
            totalhrs: val?.AHIGHLIGHTDAILYTOTALBYGROUP || "",
            workDN: val?.ADININWORKSENGINEERINGSDNBHD || "",
            normalWhrsPerDay: val?.NORMALWORKINGHRSPERDAY || 0,
            workhrs: val?.WORKINGHOURS || 0,
            OT: val?.OT || 0,
            jobLocaWhrs: val?.jobLocaWhrs || "",
            remarks: val?.REMARKS || "",
          };
        });

      const currentDate = new Date().toLocaleDateString();
      const mergeData = [...result]; // Clone result to avoid mutation (optional)
      mergeData.unshift(managerData);

      const finalResult = result.map((val) => {
        return { ...val, managerData };
      });
      // Function to submit a batch
      const submitBatch = async (batch, batchNumber) => {
        const DailySheet = {
          dailySheet: JSON.stringify(batch),
          status: "Pending",
          date: currentDate,
          managerDetails:JSON.stringify(managerData),
          type:"BLNG",
          fileName:fileName,
          uploaderID:uploaderID,
        };

        try {
          const res = await client.graphql({
            query: createTimeSheet,
            variables: { input: DailySheet },
          });

          if (res.data.createTimeSheet) {
            // console.log("res.data.createBlng : ", res.data.createBlng);
            toggleSFAMessage(true);
            setData(null);
          }
        } catch (err) {
          toggleSFAMessage(false);
        }
      };

      // Batch size
      const batchSize = 1000;

      // Loop to send data in batches
      // for (let i = 0; i < result.length; i += batchSize) {
      //   const batch = result.slice(i, i + batchSize);
      //   await submitBatch(batch, i / batchSize + 1); // Track batch number
      // }
      for (let i = 0; i < finalResult.length; i += batchSize) {
        const batch = finalResult.slice(i, i + batchSize);
        await submitBatch(batch, "6785A");
      }
    } else if (userIdentification === "Manager") {
      const MultipleBLNGfile =
        data &&
        data.map((value) => {
          return {
            id: value?.id || null,
            weaklySheet: value?.data?.map((val) => {
              return {
                fid: val?.FID || 0,
                name: val?.NAMEFLAST || "",
                entDate: val?.ENTRANCEDATEUSED || "",
                entDT: val?.ENTRANCEDATETIME || "",
                exitDT: val?.EXITDATETIME || "",
                day: val?.DAYDIFFERENCE || 0,
                avgTotalDay: val?.AVGDAILYTOTALBYDAY || "",
                totalhrs: val?.AHIGHLIGHTDAILYTOTALBYGROUP || "",
                workDN: val?.ADININWORKSENGINEERINGSDNBHD || "",
                workhrs: val?.WORKINGHOURS || 0,
                OT: val?.OT || 0,
                normalWhrsPerDay: val?.NORMALWORKINGHRSPERDAY || 0,
                // jobCode: val?.JOBCODE || [],
                // location: val?.LOCATION || [],
                jobLocaWhrs: val.jobLocaWhrs || [],
                remarks: val?.REMARKS || "",
                managerData: val?.managerData,
              };
            }),
          };
        });
     

      const result = MultipleBLNGfile.map(async (obj) => {
        const finalData = {
          id: obj.id,
          dailySheet: JSON.stringify(obj.weaklySheet),
          status: "Approved",
        };

        if (finalData.dailySheet) {
          // console.log("Work");
          await client
            .graphql({
              query: updateTimeSheet,
              variables: {
                input: finalData,
              },
            })
            .then((res) => {
              if (res.data.updateTimeSheet) {
                toggleSFAMessage(true);
                setVisibleData([]);
                // setData("res.data.updateBlng : ", res.data.updateBlng);
                setData(null);
              }
            })
            .catch((err) => {
              console.log(err)
              toggleSFAMessage(false);
            });
        }
      });
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
                className="styled-table"
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

                <tbody>
                  {visibleData && visibleData?.length > 0 ? (
                    visibleData.map((value, index) => {
                      const renderRows = (rowData, ind) => {
                        const isStatusPending = rowData.status === "Pending";

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
                              {rowData.FID}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.NAMEFLAST}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.ENTRANCEDATEUSED}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.ENTRANCEDATETIME}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.EXITDATETIME}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.DAYDIFFERENCE || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.AVGDAILYTOTALBYDAY || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.AHIGHLIGHTDAILYTOTALBYGROUP || ""}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.ADININWORKSENGINEERINGSDNBHD}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.NORMALWORKINGHRSPERDAY || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.WORKINGHOURS || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.OT || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {rowData.REMARKS}
                            </td>
                            {isStatusPending && (
                              <td
                                className={`text-center px-4 flex-1 ${
                                  rowData.status === "Approved"
                                    ? "text-[#0CB100]"
                                    : "text_size_8"
                                }`}
                              >
                                {rowData.status}
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
