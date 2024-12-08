import { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import {
  createHeadOffice,
  deleteBlng,
  deleteHeadOffice,
  updateHeadOffice,
} from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { EditTimeSheet } from "./EditTimeSheet";
import { PopupForSFApproves } from "./ModelForSuccessMess/PopupForSFApproves";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";
import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listHeadOffices,
} from "../../graphql/queries";
import { useTableMerged } from "./customTimeSheet/UserTableMerged";
import "../../../src/index.css";
import { useScrollableView } from "./customTimeSheet/UseScrollableView";
import { SendDataToManager } from "./customTimeSheet/SendDataToManager";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
const client = generateClient();

export const ViewHOsheet = ({
  setExcelData,
  excelData,
  returnedTHeader,
  Position,
  convertedStringToArrayObj,
  titleName,
}) => {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [editObject, setEditObject] = useState();
  const [toggleHandler, setToggleHandler] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [toggleAssignManager, setToggleAssignManager] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userIdentification, setUserIdentification] = useState("");
  const [showStatusCol, setShowStatusCol] = useState(null);
  const [successMess, setSuccessMess] = useState(null);
  // const fetchAllData = async () => {
  //   let allItems = [];
  //   let nextToken = null;

  //   do {
  //     const response = await client.graphql({
  //       query: listHeadOffices,
  //       variables: { limit: 40000, nextToken }, // Increase limit as needed
  //     });

  //     const fetchedItems = response?.data?.listHeadOffices?.items || [];
  //     allItems = [...allItems, ...fetchedItems];
  //     nextToken = response?.data?.listHeadOffices?.nextToken;
  //   } while (nextToken); // Fetch until there are no more pages

  //   return allItems;
  // };

  // useEffect(async () => {
  //   const result = await fetchAllData();
  //   console.log(result);
  // }, []);
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // const ITEMS_PER_PAGE = 50; // Initial number of items to display
  // const [visibleData, setVisibleData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // %%%%%%%%%%%%%%%
  // useEffect(() => {
  //   // Load initial data
  //   if (data && data.length > 0) {
  //     console.log("WORKING");
  //     setVisibleData(data.slice(0, ITEMS_PER_PAGE));
  //   }
  // }, [data]);
  // console.log(titleName);
  // const loadMoreData = useCallback(() => {
  //   // Calculate new visible data when user scrolls down
  //   const nextPage = currentPage + 1;
  //   const start = currentPage * ITEMS_PER_PAGE;
  //   const end = start + ITEMS_PER_PAGE;
  //   const newItems = data.slice(start, end);

  //   setVisibleData((prevData) => [...prevData, ...newItems]);
  //   setCurrentPage(nextPage);
  // }, [currentPage, data]);

  // const handleScroll = (e) => {
  //   const threshold = 5;
  //   const bottomReached =
  //     e.target.scrollHeight - e.target.scrollTop <=
  //     e.target.clientHeight + threshold;

  //   if (bottomReached) {
  //     if (data && data.length > 0) {
  //       loadMoreData();
  //     }
  //   }
  // };
  // &&&&&&&&&&&&&&&&

  // useEffect(() => {
  //   if (excelData) {
  //     const fetchData = async () => {
  //       // setLoading(true);

  //       const dataPromise = new Promise((resolve, reject) => {
  //         if (excelData) {
  //           resolve(excelData);
  //         } else {
  //           setTimeout(() => {
  //             reject("No data found after waiting.");
  //           }, 5000);
  //         }
  //       });

  //       const fetchedData = await dataPromise;

  //       try {
  //         const [empPersonalInfos, empPersonalDocs] = await Promise.all([
  //           client.graphql({ query: listEmpPersonalInfos }),
  //           client.graphql({ query: listEmpWorkInfos }),
  //         ]);

  //         const candidates =
  //           empPersonalInfos?.data?.listEmpPersonalInfos?.items;
  //         const interviews = empPersonalDocs?.data?.listEmpWorkInfos?.items;

  //         const mergedData = candidates
  //           .map((candidate) => {
  //             const interviewDetails = interviews.find(
  //               (item) => item.empID === candidate.empID
  //             );

  //             // Return null if all details are undefined
  //             if (!interviewDetails) {
  //               return null;
  //             }

  //             return {
  //               ...candidate,
  //               ...interviewDetails,
  //             };
  //           })
  //           .filter((item) => item !== null);
  //         console.log(mergedData);

  //         const fetchWorkInfo = async () => {
  //           const finalData = fetchedData?.map((item) => {
  //             const workInfoItem = mergedData?.find(
  //               (info) => info.empBadgeNo === item.BADGE
  //             );
  //             return {
  //               ...item,
  //               NORMALWORKINGHRSPERDAY: workInfoItem
  //                 ? workInfoItem.workHrs[0]
  //                 : null,
  //             };
  //           });
  //           console.log("finalData : ", finalData);
  //           setData(finalData);
  //         };
  //         fetchWorkInfo();
  //       } catch (err) {
  //         console.error("Error fetching data:", err.message);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [excelData]);
  const { handleScroll, visibleData, setVisibleData } = useScrollableView(
    data,
    Position
  );
  const processedData = useTableMerged(excelData);

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
    } else if (getPosition === "TimeKeeper") {
      setUserIdentification("TimeKeeper");
    }
  }, [convertedStringToArrayObj]);
  const pendingData = (data) => {
    if (data && data?.length > 0) {
      setCurrentStatus(true);

      const result =
        data &&
        data.map((vals) => {
          return {
            id: vals?.id || null,
            data: vals?.data?.map((val, index) => {
              return {
                REC: val.rec || 0,
                CTR: val.ctr || "",
                DEPT: val.dept || "",
                EMPLOYEEID: val.empId || "",
                BADGE: val.badge || "",
                NAME: val.name || 0,
                DATE: val.date || "",
                ONAM: val.onAm || "",
                OFFAM: val.offAm || "",
                ONPM: val.onPm || 0,
                OFFPM: val.offPm || 0,
                IN: val?.in || 0,
                OUT: val.out || 0,
                TOTALINOUT: val.totalInOut || "",
                ALLDAYMINUTES: val.allDayMin || "",
                NETMINUTES: val.netMin || "",
                TOTALHOURS: val.totalHrs || "",
                NORMALWORKINGHRSPERDAY: val?.normalWhrsPerDay || 0,
                WORKINGHOURS: val?.workhrs || 0,
                OT: val?.OT || 0,
                TOTALACTUALHOURS: val.totalActHrs || "",
                jobLocaWhrs: val?.jobLocaWhrs || [],
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
        if (
          val.EMPLOYEEID === getObject.EMPLOYEEID &&
          val.DATE === getObject.DATE
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
            rec: val.REC || "",
            ctr: val.CTR || "",
            dept: val.DEPT || "",
            empId: val.EMPLOYEEID || "",
            badge: val.BADGE || "",
            name: val.NAME || "",
            date: val.DATE || "",
            onAm: val.ONAM || "",
            offAm: val.OFFAM || "",
            onPm: val.ONPM || "",
            offPm: val.OFFPM || "",
            in: val.IN || "",
            out: val.OUT || "",
            totalInOut: val.TOTALINOUT || "",
            allDayMin: val.ALLDAYMINUTES || "",
            netMin: val.NETMINUTES || "",
            totalHrs: val.TOTALHOURS || "",
            normalWhrsPerDay: val?.NORMALWORKINGHRSPERDAY || 0,
            workhrs: val?.WORKINGHOURS || 0,
            OT: val?.OT || 0,
            totalActHrs: val.TOTALACTUALHOURS || "",
            jobLocaWhrs: val?.jobLocaWhrs || [],
            remarks: val.REMARKS || "",
          };
        });

      const mergeData = [...result]; // Clone result to avoid mutation (optional)
      mergeData.unshift(managerData);

      const finalResult = result.map((val) => {
        return { ...val, managerData };
      });
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
            query: createHeadOffice,
            variables: {
              input: DailySheet,
            },
          })
          .then((res) => {
            if (res.data.createHeadOffice) {
              // console.log(
              //   "res.data.createHeadOffice : ",
              //   res.data.createHeadOffice
              // );
              toggleSFAMessage(true);
            }
          })
          .catch((err) => {
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
            dailySheet: value?.data?.map((val) => {
              return {
                rec: val.REC || "",
                ctr: val.CTR || "",
                dept: val.DEPT || "",
                empId: val.EMPLOYEEID || "",
                badge: val.BADGE || "",
                name: val.NAME || "",
                date: val.DATE || "",
                onAm: val.ONAM || "",
                offAm: val.OFFAM || "",
                onPm: val.ONPM || "",
                offPm: val.OFFPM || "",
                in: val.IN || "",
                out: val.OUT || "",
                totalInOut: val.TOTALINOUT || 0,
                allDayMin: val.ALLDAYMINUTES || 0,
                netMin: val.NETMINUTES || 0,
                totalHrs: val.TOTALHOURS || 0,
                normalWhrsPerDay: val?.NORMALWORKINGHRSPERDAY || 0,
                workhrs: val?.WORKINGHOURS || 0,
                OT: val?.OT || 0,
                totalActHrs: val.TOTALACTUALHOURS || 0,
                jobLocaWhrs: val?.jobLocaWhrs || [],
                remarks: val.REMARKS || "",
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
          // console.log("Work");
          await client
            .graphql({
              query: updateHeadOffice,
              variables: {
                input: finalData,
              },
            })
            .then((res) => {
              if (res.data.updateHeadOffice) {
                // console.log(
                //   "res.data.updateHeadOffice : ",
                //   res.data.updateHeadOffice
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
                placeholder="Badge or Employee Id"
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
                            colSpan="15"
                            className="px-6 py-6 text-center text-dark_ash text_size_5"
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
                            className="px-6 py-6 text-center text-dark_ash text_size_5"
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
      {/* {successMess === true && (
        <PopupForSFApproves
          toggleSFAMessage={toggleSFAMessage}
          setExcelData={setExcelData}
          icons={<IoCheckmarkCircleSharp />}
          iconColor="text-[#2BEE48]"
          textColor="text-[#05b01f]"
          title={"Success!"}
          message={`Data has been successfully ${
            userIdentification === "Manager" ? "Approved" : "Saved"
          }`}
          btnText={"OK"}
        />
      )}
      {successMess === false && (
        <PopupForSFApproves
          toggleSFAMessage={toggleSFAMessage}
          icons={<MdCancel />}
          iconColor="text-[#dc2626]"
          textColor="text-[#dc2626]"
          title={"Sorry :("}
          message={"Something went wrong please try again!!"}
          btnText={"TRY AGAIN"}
        />
      )} */}
    </div>
  );
};

// import { useEffect, useState } from "react";
// import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";

// export const ViewHOsheet = ({ excelData, returnedTHeader }) => {
//   const [data, setData] = useState(excelData);
//   const [currentStatus, setCurrentStatus] = useState(null);
//   const [highlight, sethighlight] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const searchResult = (result) => {
//     setData(result);
//   };

//   const cleanValue = (value) => {
//     if (typeof value !== "string") {
//       return value; // Return value if not a string (e.g., number, object)
//     }
//     return value.replace(/[^a-zA-Z0-9]/g, ""); // Removes all non-alphanumeric characters
//   };

//   useEffect(() => {
//     const checkKeys = async () => {
//       const cleanData = returnedTHeader.map((item) => {
//         const cleanedItem = {};
//         for (const key in item) {
//           cleanedItem[key] = cleanValue(item[key]); // Clean the value, not the key
//         }
//         return cleanedItem;
//       });

//       const requiredKeys = [
//         "REC",
//         "CTR",
//         "DEPT",
//         "EMPLOYEEID",
//         "BADGE",
//         "NAME",
//         "DATE",
//         "ONAM",
//         "OFFAM",
//         "ONPM",
//         "OFFPM",
//         "IN",
//         "OUT",
//         "TOTALINOUT",
//         "ALLDAYMINUTES",
//         "NETMINUTES",
//         "TOTALHOURS",
//         "TOTALACTUALHOURS",
//         "REMARKS",
//       ];

//       const result = await new Promise((resolve) => {
//         // Check if all required keys are in the object
//         const keyCheckResult =
//           cleanData &&
//           cleanData.every((m) => {
//             return requiredKeys.every(
//               (key) =>
//                 Object.values(m)
//                   .map((value) =>
//                     typeof value === "string" ? value.toUpperCase() : value
//                   ) // Convert string values to uppercase
//                   .includes(key.toUpperCase()) // Compare with key in uppercase
//             );
//           });
//         resolve(keyCheckResult);
//       });

//
//       setCurrentStatus(result); // Assuming setCurrentStatus is defined
//       setLoading(false);
//     };

//     if (returnedTHeader && returnedTHeader.length > 0) {
//       checkKeys();
//     } else {
//       setCurrentStatus(false);
//       setLoading(false);
//     }
//   }, [returnedTHeader]);

//   return (
//     <div>
//       <div>
//         {currentStatus === true ? (
//           <div>
//             <div className="flex justify-end mr-7">
//               <SearchBoxForTimeSheet
//                 excelData={excelData}
//                 searchResult={searchResult}
//               />
//             </div>
//             <div className="mt-9 overflow-x-auto overflow-y-scroll max-h-[500px]">
//               <table className="table-auto text-center w-full">
//                 <thead>
//                   <tr className="bg-lite_grey text-dark_grey text_size_5">
//                     <td className="px-4 flex-1">S No.</td>
//                     <td className="px-4 flex-1 text-start">REC#</td>
//                     <td className="px-4 flex-1">CTR</td>
//                     <td className="px-4 flex-1 text-start">DEPT</td>
//                     <td className="px-4 flex-1">EMPLOYEE ID</td>
//                     <td className="px-4 flex-1">BADGE#</td>
//                     <td className="px-4 flex-1">NAME</td>
//                     <td className="px-4 flex-1">DATE</td>
//                     <td className="px-4 flex-1">ON AM</td>
//                     <td className="px-4 flex-1">OFF AM</td>
//                     <td className="px-4 flex-1">ON PM</td>
//                     <td className="px-4 flex-1">OFF PM</td>
//                     <td className="px-4 flex-1">IN</td>
//                     <td className="px-4 flex-1">OUT</td>
//                     <td className="px-4 flex-1">TOTAL IN/OUT</td>
//                     <td className="px-4 flex-1">ALL DAY MINUTES</td>
//                     <td className="px-4 flex-1">NET MINUTES</td>
//                     <td className="px-4 flex-1">TOTAL HOURS</td>
//                     <td className="px-4 flex-1">TOTAL ACTUAL HOURS</td>
//                     <td className="px-4 flex-1">REMARKS</td>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {excelData &&
//                     excelData.map((m, index) => {
//                       return (
//                         <tr
//                           key={index}
//                           className={`text-dark_grey h-[40px] text-sm rounded-sm shadow-md border-b-2 border-[#CECECE] ${
//                             m.data ? "bg-grey text-white" : "bg-white"
//                           }`}
//                         >
//                           <td className="text-center px-4 flex-1">
//                             {index + 1}
//                           </td>
//                           <td className="text-start px-4 flex-1">{m.REC}</td>
//                           <td className="text-center px-4 flex-1">{m.CTR}</td>
//                           <td className="text-center px-4 flex-1">{m.DEPT}</td>
//                           <td className="text-center px-4 flex-1">
//                             {m.EMPLOYEEID}
//                           </td>
//                           <td className="text-center px-4 flex-1">{m.BADGE}</td>
//                           <td className="text-center px-4 flex-1">{m.NAME}</td>
//                           <td className="text-center px-4 flex-1">{m.DATE}</td>
//                           <td className="text-center px-4 flex-1">{m.ONAM}</td>
//                           <td className="text-center px-4 flex-1">{m.OFFAM}</td>
//                           <td className="text-center px-4 flex-1">{m.ONPM}</td>
//                           <td className="text-center px-4 flex-1">{m.OFFPM}</td>
//                           <td className="text-center px-4 flex-1">{m.IN}</td>
//                           <td className="text-center px-4 flex-1">{m.OUT}</td>
//                           <td className="text-center px-4 flex-1">
//                             {m.TOTALINOUT || 0}
//                           </td>
//                           <td className="text-center px-4 flex-1">
//                             {m.ALLDAYMINUTES || 0}
//                           </td>
//                           <td className="text-center px-4 flex-1">
//                             {m.NETMINUTES || 0}
//                           </td>
//                           <td className="text-center px-4 flex-1">
//                             {m.TOTALHOURS || 0}
//                           </td>
//                           <td className="text-center px-4 flex-1">
//                             {m.TOTALACTUALHOURS || 0}
//                           </td>
//                           <td className="text-center px-4 flex-1">
//                             {m.REMARKS}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//             <div className="flex justify-center my-5">
//               <button
//                 className="rounded px-3 py-2 bg-[#FEF116] text_size_5 text-dark_grey"
//                 onClick={() => {
//                   //   renameKeysFunctionAndSubmit();
//                 }}
//               >
//                 Send for Approval
//               </button>
//             </div>
//           </div>
//         ) : currentStatus === false ? (
//           // {data ? ("True case") : data == false ? ("False case") : ("Default case")}
//           <div className="flex justify-center">
//             <div className=" flex flex-col items-center gap-5 p-5 px-16  rounded shadow-lg">
//               <p className="text-dark_grey text_size_5">Message :</p>
//               <p className={`text-dark_grey text_size_5 `}>
//                 Your excel sheet is not expected format
//               </p>
//               <p className={`text-[#00DF0F] text_size_5`}>ERROR</p>
//             </div>
//           </div>
//         ) : (
//           ""
//         )}
//       </div>
//     </div>
//   );
// };
