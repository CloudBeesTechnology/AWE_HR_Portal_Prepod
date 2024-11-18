import { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { EditTimeSheet } from "./EditTimeSheet";
import { generateClient } from "@aws-amplify/api";
import {
  createBlng,
  deleteBlng,
  deleteHeadOffice,
  updateBlng,
} from "../../graphql/mutations";

import { listEmpWorkInfos } from "../../graphql/queries";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";

const client = generateClient();

export const ViewBLNGsheet = ({
  excelData,
  returnedTHeader,
  convertedStringToArrayObj,
  titleName,
  setExcelData,
  Position,
}) => {
  const [data, setData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  const [editObject, setEditObject] = useState();
  const [toggleHandler, setToggleHandler] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userIdentification, setUserIdentification] = useState("");
  const [successMess, setSuccessMess] = useState(null);

  const [showStatusCol, setShowStatusCol] = useState(null);
  const ITEMS_PER_PAGE = 50; // Initial number of items to display
  const [visibleData, setVisibleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Load initial data
    if (data && data.length > 0) {
      setVisibleData(data.slice(0, ITEMS_PER_PAGE));
    }
  }, [data]);

  const loadMoreData = useCallback(() => {
    // Calculate new visible data when user scrolls down
    const nextPage = currentPage + 1;
    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const newItems = data.slice(start, end);

    setVisibleData((prevData) => [...prevData, ...newItems]);
    setCurrentPage(nextPage);
  }, [currentPage, data]);

  const handleScroll = (e) => {
    const threshold = 5;
    const bottomReached =
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + threshold;

    if (bottomReached) {
      if (data && data.length > 0) {
        loadMoreData();
      }
    }
  };
  useEffect(() => {
    if (excelData) {
      const fetchData = async () => {
        // setLoading(true);
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
              // console.log(workInfoItem);
              return {
                ...item,
                NORMALWORKINGHRSPERDAY: workInfoItem
                  ? workInfoItem.workHrs[0]
                  : null,
              };
            });
            console.log("MergedData : ", mergedData);
            setData(mergedData); // Set merged data
          };

          fetchWorkInfo();
        } catch (err) {
        } finally {
          // setLoading(false);
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
              };
            }),
          };
        });
      setData(result);
    }
  };
  const searchResult = (result) => {
    setData(result);
  };

  const cleanValue = (value) => {
    if (typeof value !== "string") {
      return value;
    }
    return value.replace(/[^a-zA-Z0-9]/g, "");
  };

  useEffect(() => {
    const checkKeys = async () => {
      // setLoading(true);
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
      console.log(result);
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
          console.log(filterPending);
          if (userIdentification === "Manager") {
            pendingData(filterPending);
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
    // console.log(result);
    setData(result);
  };
  // const fieldObj = {
  //   FID: null,
  //   NAMEFLAST: null,
  //   ENTRANCEDATEUSED: null,
  //   ENTRANCEDATETIME: null,
  //   EXITDATETIME: null,
  //   DAYDIFFERENCE: null,
  //   AVGDAILYTOTALBYDAY: null,
  //   AHIGHLIGHTDAILYTOTALBYGROUP: null,
  //   ADININWORKSENGINEERINGSDNBHD: null,
  //   NORMALWORKINGHRSPERDAY: null,
  //   WORKINGHOURS: null,
  //   OT: null,
  //   REMARKS: null,
  // };

  // const fields = [
  //   "FID",
  //   "NAMEFLAST",
  //   "ENTRANCEDATEUSED",
  //   "ENTRANCEDATETIME",
  //   "EXITDATETIME",
  //   "DAYDIFFERENCE",
  //   "AVGDAILYTOTALBYDAY",
  //   "AHIGHLIGHTDAILYTOTALBYGROUP",
  //   "ADININWORKSENGINEERINGSDNBHD",
  //   "NORMALWORKINGHRSPERDAY",
  //   "WORKINGHOURS",
  //   "OT",
  //   "REMARKS",
  // ];

  // const tableHeader = [
  //   "FID",
  //   "NAME (FLAST)",
  //   "ENTRANCE DATE USED",
  //   "ENTRANCE DATETIME",
  //   "EXIT DATETIME",
  //   "DAY DIFFERENCE",
  //   "AVG. DAILY TOTAL BY DAY",
  //   "A HIGHLIGHT DAILY TOTAL BY GROUP",
  //   "ADININ WORK & ENGINEERING SDN BHD",
  //   "NORMAL WORKING HRS PERDAY",
  //   "ACTUAL WORKING HOURS",
  //   "OT",
  //   // "JOB CODE",
  //   // "LOCATION",
  //   "REMARKS",
  // ];
  // useTableFieldData
  const AllFieldData = useTableFieldData(titleName);
  console.log(AllFieldData);
  const renameKeysFunctionAndSubmit = async () => {
    if (userIdentification === "TimeKeeper") {
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
            // jobCode: val?.JOBCODE || [],
            // location: val?.LOCATION || [],
            jobLocaWhrs: val?.jobLocaWhrs || "",
            remarks: val?.REMARKS || "",
          };
        });
      console.log(result);
      //   CREATE
      const currentDate = new Date().toLocaleDateString();
      const weaklysheet = {
        weeklySheet: JSON.stringify(result),
        status: "Pending",
        date: currentDate,
      };
      console.log(weaklysheet);
      if (weaklysheet.weeklySheet) {
        console.log(weaklysheet);
        await client
          .graphql({
            query: createBlng,
            variables: {
              input: weaklysheet,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.createBlng) {
              toggleSFAMessage(true);
            }
          })
          .catch((err) => {
            console.log(err);
            toggleSFAMessage(false);
          });
      }
    }
    // if (userIdentification === "TimeKeeper") {
    //   const result =
    //     data &&
    //     data.map((val) => {
    //       return {
    //         fid: val?.FID || 0,
    //         name: val?.NAMEFLAST || "",
    //         entDate: val?.ENTRANCEDATEUSED || "",
    //         entDT: val?.ENTRANCEDATETIME || "",
    //         exitDT: val?.EXITDATETIME || "",
    //         day: val?.DAYDIFFERENCE || 0,
    //         avgTotalDay: val?.AVGDAILYTOTALBYDAY || "",
    //         totalhrs: val?.AHIGHLIGHTDAILYTOTALBYGROUP || "",
    //         workDN: val?.ADININWORKSENGINEERINGSDNBHD || "",
    //         normalWhrsPerDay: val?.NORMALWORKINGHRSPERDAY || 0,
    //         workhrs: val?.WORKINGHOURS || 0,
    //         OT: val?.OT || 0,
    //         jobLocaWhrs: val?.jobLocaWhrs || "",
    //         remarks: val?.REMARKS || "",
    //       };
    //     });

    //   const currentDate = new Date().toLocaleDateString();

    //   // Function to submit a batch
    //   const submitBatch = async (batch, batchNumber) => {
    //     const weeklySheet = {
    //       weeklySheet: JSON.stringify(batch),
    //       status: "Pending",
    //       date: currentDate,
    //     };

    //     try {
    //       console.log(`Submitting batch ${batchNumber}`);
    //       console.log(weeklySheet);
    //       const res = await client.graphql({
    //         query: createBlng,
    //         variables: { input: weeklySheet },
    //       });

    //       if (res.data.createBlng) {
    //         console.log(`Batch ${batchNumber} submitted successfully`);
    //         toggleSFAMessage(true);
    //         console.log(res);
    //       }
    //     } catch (err) {
    //       console.log(`Error in batch ${batchNumber}:`, err);
    //       toggleSFAMessage(false);
    //     }
    //   };

    //   // Batch size
    //   const batchSize = 1000;

    //   // Loop to send data in batches
    //   // for (let i = 0; i < result.length; i += batchSize) {
    //   //   const batch = result.slice(i, i + batchSize);
    //   //   await submitBatch(batch, i / batchSize + 1); // Track batch number
    //   // }
    //   for (let i = 0; i < result.length; i += batchSize) {
    //     const batch = result.slice(i, i + batchSize);
    //     await submitBatch(batch);
    //   }
    // }
    else if (userIdentification === "Manager") {
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
          weeklySheet: JSON.stringify(obj.weaklySheet),
          status: "Approved",
        };
        console.log(finalData);
        if (finalData.weeklySheet) {
          // console.log("Work");
          await client
            .graphql({
              query: updateBlng,
              variables: {
                input: finalData,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data.updateBlng) {
                toggleSFAMessage(true);
                setVisibleData([]);
                // setData(null);
              }
            })
            .catch((err) => {
              console.log(err);
              toggleSFAMessage(false);
            });
        }
      });
    }
  };

  return (
    <div>
      {/* {loading === true && (
        <div className="flex justify-center items-center">
          <p className="text_sixe_1 text-dark_grey">
            Please wait few seconds...
          </p>
        </div>
      )} */}
      <div>
        {currentStatus === true ? (
          <div>
            <div className="flex justify-end mr-7">
              <SearchBoxForTimeSheet
                excelData={excelData}
                searchResult={searchResult}
              />
            </div>
            <div
              className="mt-9 overflow-x-auto overflow-y-scroll max-h-[500px]"
              onScroll={handleScroll}
            >
              <table className="table-auto text-center w-full">
                <thead>
                  <tr className="bg-lite_grey  text-dark_grey text_size_5">
                    <td className="px-5 flex-">S No.</td>
                    {console.log(AllFieldData)}
                    {AllFieldData?.tableHeader.map((header, index) => (
                      <td key={index} className="px-4 flex-1">
                        {header}
                      </td>
                    ))}
                    {showStatusCol === true ? (
                      ""
                    ) : (
                      <td className="px-5 flex-">STATUS</td>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {visibleData && visibleData.length > 0 ? (
                    visibleData.map((value, index) => {
                      const renderRows = (rowData, ind) => {
                        const isStatusPending = rowData.status === "Pending";

                        return (
                          <tr
                            key={
                              userIdentification === "Manager"
                                ? (ind += 1)
                                : index + 1
                            }
                            className="text-dark_grey h-[40px] text-sm rounded-sm shadow-md border-b-2 border-[#CECECE] bg-white"
                            onClick={() => {
                              toggleFunction();
                              editBLNG(rowData);
                            }}
                          >
                            <td className="text-center px-4 flex-1">
                              {userIdentification === "Manager"
                                ? ind + 1
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
                              <td className="text-center px-4 flex-1">
                                {rowData.status}
                              </td>
                            )}
                          </tr>
                        );
                      };

                      return userIdentification === "Manager"
                        ? value.data.map(renderRows)
                        : userIdentification !== "Manager" && renderRows(value);
                      // : setData(null);
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="15"
                        className="px-6 py-6 text-center text-dark_ash text_size_5"
                      >
                        <p>No Table Data Available Here</p>
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
                className="rounded px-3 py-2 bg-[#FEF116] text_size_5 text-dark_grey"
                onClick={() => {
                  renameKeysFunctionAndSubmit();

                  // const fetchData = async () => {
                  //   console.log("I am calling You");
                  //   // Fetch the BLNG data using GraphQL
                  //   const [fetchBLNGdata] = await Promise.all([
                  //     client.graphql({
                  //       query: listHeadOffices,
                  //     }),
                  //   ]);
                  //   const BLNGdata =
                  //     fetchBLNGdata?.data?.listHeadOffices?.items;
                  //   console.log("BLNGdata : ", BLNGdata);

                  //   const deleteFunction =
                  //     BLNGdata &&
                  //     BLNGdata.map(async (m) => {
                  //       const dailySheet = {
                  //         id: m.id,
                  //       };

                  //       await client
                  //         .graphql({
                  //           query: deleteHeadOffice,
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
                  // FOR DELETE
                  // const deleteFunction = async () => {
                  //   const weaklysheet = {
                  //     id: "388e8f75-fadb-4398-9430-9c250331ac41",
                  //   };

                  //   await client
                  //     .graphql({
                  //       query: deleteBlng,
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
                }}
              >
                {userIdentification === "Manager"
                  ? "Approve"
                  : "Send For Approval"}
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
    </div>
  );
};
