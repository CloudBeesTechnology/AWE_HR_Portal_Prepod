import { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import {
  createOffshoreSheet,
  deleteOffshoreSheet,
  updateOffshoreSheet,
} from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { EditTimeSheet } from "./EditTimeSheet";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import "../../../src/index.css";
import { useScrollableView } from "./customTimeSheet/UseScrollableView";
import { listEmpWorkInfos, listOffshoreSheets } from "../../graphql/queries";
import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
const client = generateClient();

export const ViewTSTBeforeSave = ({
  excelData,
  returnedTHeader,
  Position,
  convertedStringToArrayObj,
  titleName,
  setExcelData,
}) => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [editObject, setEditObject] = useState();
  const [toggleHandler, setToggleHandler] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userIdentification, setUserIdentification] = useState("");
  const [successMess, setSuccessMess] = useState(null);
  const [toggleAssignManager, setToggleAssignManager] = useState(false);

  const [showStatusCol, setShowStatusCol] = useState(null);
  const { handleScroll, visibleData, setVisibleData } = useScrollableView(
    data,
    Position
  );
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
                (info) => info.sapNo == item.NO
              );

              return {
                ...item,
                NORMALWORKINGHRSPERDAY: workInfoItem
                  ? workInfoItem.workHrs[0]
                  : null,
              };
            });
            // console.log(mergedData);

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
  }, []);

  const pendingData = (data) => {
    if (data && data.length > 0) {
      setCurrentStatus(true);

      const result =
        data &&
        data.map((vals) => {
          // name: val.NAME || "",
          // no: val.NO || "",
          // location: val.LOCATION || "",
          // date: val.DATE || "",
          // ntTotalHrs: val.TOTALHOURS || "",
          // otTotalHrs: val.TOTALHOURS2 || "",
          // totalHrs: val.TOTALHOURS3 || "",
          return {
            id: vals?.id || null,
            data: vals?.data?.map((val, index) => {
              return {
                NAME: val.name || "",
                NO: val.no || "",
                LOCATION: val.location || "",
                DATE: val.date || "",
                TOTALHOURS: val.ntTotalHrs || 0,
                TOTALHOURS2: val.otTotalHrs || 0,
                TOTALHOURS3: val.totalHrs || 0,
                WORKINGHOURS: val.workHrs || 0,
                OT: val?.OT || 0,
                NORMALWORKINGHRSPERDAY: val?.normalWhrsPerDay || 0,
                jobLocaWhrs: val.jobLocaWhrs || [],
                REMARKS: val.remarks || "",
                status: val.status || "",
                managerData: val?.managerData,
                // ALLDAYMINHRS: val.allDayMin || "",
                // NETMINUTES: val.netMin || "",
                // TOTALHOURS: val.totalHrs || 0,
                // WORKINGHOURS: val.workHrs || 0,
                // OT: val?.OT || 0,
                // jobLocaWhrs: val.jobLocaWhrs || [],
                // REMARKS: val.remarks || "",
                // status: val.status || "",
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

      setShowStatusCol(result);
      setCurrentStatus(result); // Assuming setCurrentStatus is defined
      setLoading(false);
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
        if (val.DATE === getObject.DATE) {
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
            name: val.NAME || "",
            no: val.NO || "",
            location: val.LOCATION || "",
            date: val.DATE || "",
            ntTotalHrs: val.TOTALHOURS || "",
            otTotalHrs: val.TOTALHOURS2 || "",
            totalHrs: val.TOTALHOURS3 || "",
            normalWhrsPerDay: val?.NORMALWORKINGHRSPERDAY || 0,
            workHrs: val.WORKINGHOURS || "",
            OT: val.OT || "",
            remarks: val.REMARKS || "",
            jobLocaWhrs: val?.jobLocaWhrs || [],
            // onAm: val.ONAM || "",
            // offAm: val.OFFAM || "",
            // onPm: val.ONPM || "",
            // offPm: val.OFFPM || "",
            // in: val.IN || "",
            // out: val.OUT || "",
            // totalInOut: val.TOTALINOUT || "",
            // allDayMin: val.ALLDAYMINUTES || "",
            // netMin: val.NETMINUTES || "",
            // totalHrs: val.TOTALHOURS || "",
            // totalActHrs: val.TOTALACTUALHOURS || "",
            // jobLocaWhrs: val?.jobLocaWhrs || [],
            // remarks: val.REMARKS || "",
          };
        });

      const finalResult = result.map((val) => {
        return { ...val, managerData };
      });
      // console.log(finalResult);
      //   CREATE
      const currentDate = new Date().toLocaleDateString();
      const DailySheet = {
        dailySheet: JSON.stringify(finalResult),
        status: "Pending",
        date: currentDate,
      };

      if (DailySheet.dailySheet) {
        await client
          .graphql({
            query: createOffshoreSheet,
            variables: {
              input: DailySheet,
            },
          })
          .then((res) => {
            if (res.data.createOffshoreSheet) {
              // console.log(
              //   "res.data.createOffshoreSheet : ",
              //   res.data.createOffshoreSheet
              // );
              toggleSFAMessage(true);
            }
          })
          .catch((err) => {
            toggleSFAMessage(false);
          });
      }
    } else if (userIdentification === "Manager") {
      const MultipleBLNGfile =
        data &&
        data.map((value) => {
          return {
            id: value?.id || null,
            dailySheet: value?.data?.map((val) => {
              return {
                name: val.NAME || "",
                no: val.NO || "",
                location: val.LOCATION || "",
                date: val.DATE || "",
                ntTotalHrs: val.TOTALHOURS || "",
                otTotalHrs: val.TOTALHOURS2 || "",
                totalHrs: val.TOTALHOURS3 || "",
                normalWhrsPerDay: val?.NORMALWORKINGHRSPERDAY || 0,
                workHrs: val.WORKINGHOURS || "",
                OT: val.OT || "",
                remarks: val.REMARKS || "",
                jobLocaWhrs: val?.jobLocaWhrs || [],
                managerData: val?.managerData,
              };
            }),
          };
        });
      // UPDATE
      //   const weaklysheet = {
      //     id: "6b22df70-9ab7-4873-9d24-9ab719347b62",
      //     weeklySheet: JSON.stringify(result),
      //     status: "Pending",
      //   };

      const result = MultipleBLNGfile.map(async (obj) => {
        const finalData = {
          id: obj.id,
          dailySheet: JSON.stringify(obj.dailySheet),
          status: "Approved",
        };

        if (finalData.dailySheet) {
          await client
            .graphql({
              query: updateOffshoreSheet,
              variables: {
                input: finalData,
              },
            })
            .then((res) => {
              if (res.data.updateOffshoreSheet) {
                // console.log(
                //   "res.data.updateOffshoreSheet : ",
                //   res.data.updateOffshoreSheet
                // );
                toggleSFAMessage(true);
                setVisibleData([]);
                // setData(null);
              }
            })
            .catch((err) => {
              toggleSFAMessage(false);
            });
        }
      });
    }
  };
  return (
    <div className="border border-white">
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
          <div className="table-container" onScroll={handleScroll}>
            {/* w-[1190px] */}
            <table className="styled-table">
              <thead className="sticky-header">
                <tr className="text_size_5">
                  <td className="px-4 flex-1 text_size_7">S No.</td>
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
                  {/* <td className="px-4 flex-1 text-start">EMPLOYEE NAME</td>
                  <td className="px-4 flex-1">SUB ID</td>
                  <td className="px-4 flex-1 text-start">LOCATION</td>
                  <td className="px-4 flex-1">DATE</td>
                  <td className="px-4 flex-1">TOTAL NT</td>
                  <td className="px-4 flex-1">TOTAL OT</td>
                  <td className="px-4 flex-1">TOTAL NT/OT</td> */}
                  {showStatusCol === true ? (
                    ""
                  ) : (
                    <td className="px-5 flex-1 text_size_7">STATUS</td>
                  )}
                </tr>
              </thead>
              <tbody>
                {visibleData && visibleData.length > 0
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
                            <td className="text-start px-4 flex-1">{m.NAME}</td>
                            <td className="text-center px-4 flex-1">{m.NO}</td>
                            <td className="text-start px-4 flex-1">
                              {m.LOCATION}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m.DATE}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m.TOTALHOURS || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m.TOTALHOURS2 || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m.TOTALHOURS3 || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m.NORMALWORKINGHRSPERDAY || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m.WORKINGHOURS || 0}
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
                        : userIdentification !== "Manager" && renderRows(value);
                      // : setData(null);
                    })
                  : (
                      <tr>
                        <td
                          colSpan="15"
                          className="px-6 py-6 text-center text-dark_ash text_size_5 bg-white"
                        >
                          <p className="px-6 py-6">
                            No Table Data Available Here
                          </p>
                        </td>
                      </tr>
                    ) ?? (
                      <tr>
                        <td
                          colSpan="15"
                          className="px-6 py-6 text-center text-dark_ash text_size_5 bg-white"
                        >
                          <p className="px-6 py-6">
                            No Table Data Available Here
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
                  //   console.log("I am calling You");
                  //   // Fetch the BLNG data using GraphQL
                  //   const [fetchBLNGdata] = await Promise.all([
                  //     client.graphql({
                  //       query: listOffshoreSheets,
                  //     }),
                  //   ]);
                  //   const BLNGdata =
                  //     fetchBLNGdata?.data?.listOffshoreSheets?.items;
                  //   console.log("BLNGdata : ", BLNGdata);
                  //   const deleteFunction =
                  //     BLNGdata &&
                  //     BLNGdata.map(async (m) => {
                  //       const dailySheet = {
                  //         id: m.id,
                  //       };
                  //       await client
                  //         .graphql({
                  //           query: deleteOffshoreSheet,
                  //           variables: {
                  //             input: dailySheet,
                  //           },
                  //         })
                  //         .then((res) => {
                  //           console.log(res);
                  //         })
                  //         .catch((err) => {
                  //           console.log(err);
                  //         });
                  //     });
                  // };
                  // fetchData();
                } else if (userIdentification === "Manager") {
                  renameKeysFunctionAndSubmit();
                }
              }}
            >
              {userIdentification === "Manager" ? "Approve" : "Assign Manager"}
            </button>
          </div>
        </div>
      ) : currentStatus === false ? (
        <PopupForMissMatchExcelSheet />
      ) : (
        ""
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
