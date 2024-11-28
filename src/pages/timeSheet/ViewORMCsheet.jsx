import { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";
import { createORMCSheet, updateORMCSheet } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { EditTimeSheet } from "./EditTimeSheet";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import "../../../src/index.css";
import { useScrollableView } from "./customTimeSheet/UseScrollableView";
import { userTableMerged } from "./customTimeSheet/UserTableMerged";
import { PopupForAssignManager } from "./ModelForSuccessMess/PopupForAssignManager";
const client = generateClient();
export const ViewORMCsheet = ({
  excelData,
  returnedTHeader,
  titleName,
  setExcelData,
  convertedStringToArrayObj,
  Position,
}) => {
  const [data, setData] = useState(null);

  const [secondaryData, setSecondaryData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [editObject, setEditObject] = useState();
  const [toggleHandler, setToggleHandler] = useState(false);
  const [toggleAssignManager, setToggleAssignManager] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userIdentification, setUserIdentification] = useState("");
  const [showStatusCol, setShowStatusCol] = useState(null);
  const [successMess, setSuccessMess] = useState(null);
  // const []
  const { handleScroll, visibleData, setVisibleData } = useScrollableView(
    data,
    Position
  );
  const processedData = userTableMerged(excelData);

  useEffect(() => {
    if (processedData && processedData.length > 0) {
      setData(processedData);
      setSecondaryData(processedData);
    }
  }, [processedData]);

  const searchResult = async (searchedData) => {
    console.log(searchedData);
    try {
      const result = await searchedData;
      setData(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
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
          setData(fetchedData);
          setSecondaryData(result);
        } catch (err) {}
      };
      fetchData();
    }
  }, [excelData]);
  // const cleanValue = (value) => {
  //   if (typeof value !== "string") {
  //     return value; // Return value if not a string (e.g., number, object)
  //   }
  //   return value.replace(/[^a-zA-Z0-9]/g, ""); // Removes all non-alphanumeric characters
  // };
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
        data.map((vals) => {
          return {
            id: vals?.id || null,
            data: vals?.data?.map((val, index) => {
              return {
                NAME: val.name || 0,
                DEPTDIV: val.deptDiv || "",
                BADGE: val.badge || "",
                DATE: val.date || "",
                IN: val.in || "",
                OUT: val.out || 0,
                TOTALINOUT: val.totalInOut || "",
                ALLDAYMINHRS: val.allDayMin || "",
                NETMINUTES: val.netMin || "",
                TOTALHOURS: val.totalHrs || 0,
                NORMALWORKINGHRSPERDAY: val?.normalWhrsPerDay || 0,
                WORKINGHOURS: val.workHrs || 0,
                OT: val?.OT || 0,
                jobLocaWhrs: val.jobLocaWhrs || [],
                REMARKS: val.remarks || "",
                status: val.status || "",
              };
            }),
          };
        });
      setData(result);
      setSecondaryData(result);
    }
  };

  useEffect(() => {
    const checkKeys = async () => {
      // const cleanData = returnedTHeader.map((item) => {
      //   const cleanedItem = {};
      //   for (const key in item) {
      //     cleanedItem[key] = cleanValue(item[key]); // Clean the value, not the key
      //   }
      //   return cleanedItem;
      // });

      const convertKeys = (obj) => {
        return Object.keys(obj).reduce((acc, key) => {
          // Remove spaces and special characters, and convert to lowercase
          const newKey = key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
          acc[newKey] = obj[key];
          return acc;
        }, {});
      };

      console.log("returnedTHeader : ", returnedTHeader);

      const convertedData = returnedTHeader.map(convertKeys);
      console.log("convertedData : ", convertedData);
      const requiredKeys = [
        // "deptdiv",
        "name",
        // "badge",
        // "date",
        // "in",
        // "out",
        // "totalinout",
        // "alldayminhrs",
        // "netminutes",
        // "totalhours",
        // "workinghours",
        // "ot",
        // "remarks",
      ];
      // const requiredKeys = [
      //   "DEPTDIV",
      //   "BADGE",
      //   "DATE",
      //   "IN",
      //   "OUT",
      //   "TOTALINOUT",
      //   "ALLDAYMINHRS",
      //   "NETMINUTES",
      //   "TOTALHOURS",
      //   "REMARKS",
      // ];
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
      // const result = await new Promise((resolve) => {
      //   // Check if all required keys are in the object
      //   const keyCheckResult =
      //     cleanData &&
      //     cleanData.every((m) => {
      //       return requiredKeys.every(
      //         (key) =>
      //           Object.values(m)
      //             .map((value) =>
      //               typeof value === "string" ? value.toUpperCase() : value
      //             ) // Convert string values to uppercase
      //             .includes(key.toUpperCase()) // Compare with key in uppercase
      //       );
      //     });
      //   resolve(keyCheckResult);
      // });
      const result = await checkedKeys();
      console.log("Result: ", result);
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
  const toggleFunctionForAssiMana = () => {
    setToggleAssignManager(!toggleAssignManager);
  };
  const editNestedData = (data, getObject) => {
    return data.map((m) => ({
      id: m.id,
      data: m.data.map((val) => {
        if (val.IN === getObject.IN && val.OUT === getObject.OUT) {
          return getObject;
        } else {
          return val;
        }
      }),
    }));
  };
  const editFlatData = (data, getObject) => {
    return data.map((val) => {
      if (val.IN === getObject.IN && val.OUT === getObject.OUT) {
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
    // console.log(result);
    setData(result);
  };
  const AllFieldData = useTableFieldData(titleName);
  const renameKeysFunctionAndSubmit = async () => {
    if (userIdentification !== "Manager") {
      const result =
        data &&
        data.map((val) => {
          return {
            name: val.NAME || "",
            deptDiv: val.DEPTDIV || "",
            badge: val.BADGE || "",
            date: val.DATE || "",
            in: val.IN || "",
            out: val.OUT || "",
            totalInOut: val.TOTALINOUT || "",
            allDayMin: val.ALLDAYMINHRS || "",
            netMin: val.NETMINUTES || "",
            totalHrs: val.TOTALHOURS || "",
            normalWhrsPerDay: val?.NORMALWORKINGHRSPERDAY || 0,
            workHrs: val.WORKINGHOURS || "",
            OT: val.OT || "",
            remarks: val.REMARKS || "",
            jobLocaWhrs: val?.jobLocaWhrs || [],
          };
        });
      console.log(result);
      //   CREATE
      const currentDate = new Date().toLocaleDateString();
      const DailySheet = {
        dailySheet: JSON.stringify(result),
        status: "Pending",
        date: currentDate,
      };

      if (DailySheet.dailySheet) {
        await client
          .graphql({
            query: createORMCSheet,
            variables: {
              input: DailySheet,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.createORMCSheet) {
              toggleSFAMessage(true);
            }
          })
          .catch((err) => {
            console.log(err);
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
                deptDiv: val.DEPTDIV || "",
                badge: val.BADGE || "",
                date: val.DATE || "",
                in: val.IN || "",
                out: val.OUT || "",
                totalInOut: val.TOTALINOUT || "",
                allDayMin: val.ALLDAYMINHRS || "",
                netMin: val.NETMINUTES || "",
                totalHrs: val.TOTALHOURS || "",
                normalWhrsPerDay: val?.NORMALWORKINGHRSPERDAY || 0,
                workHrs: val.WORKINGHOURS || "",
                OT: val.OT || "",
                remarks: val.REMARKS || "",
                jobLocaWhrs: val?.jobLocaWhrs || [],
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
        console.log(finalData);
        if (finalData.dailySheet) {
          // console.log("Work");
          await client
            .graphql({
              query: updateORMCSheet,
              variables: {
                input: finalData,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data.updateORMCSheet) {
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
      <div>
        {currentStatus === true ? (
          <div>
            <div className="flex justify-end mr-7">
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
                    <td className="px-5 text-center">S No.</td>
                    {/* <td className="px-4 flex-1 text-start">Name</td>
                    <td className="px-4 flex-1">DEPT/DIV</td>
                    <td className="px-4 flex-1 text-start">BADGE#</td>
                    <td className="px-4 flex-1">DATE</td>
                    <td className="px-4 flex-1">IN</td>
                    <td className="px-4 flex-1">OUT</td>
                    <td className="px-4 flex-1">TOTAL IN/OUT</td>
                    <td className="px-4 flex-1">{"ALL DAY MIN (HRS)"}</td>
                    <td className="px-4 flex-1">NET MINUTES</td>
                    <td className="px-4 flex-1">TOTAL HOURS</td>

                    <td className="px-4 flex-1">REMARKS</td> */}
                    {AllFieldData?.tableHeader.map((header, index) => (
                      <td key={index} className="px-5 flex-1">
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
                      <td className="px-5 flex-">STATUS</td>
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
                                {m.NORMALWORKINGHRSPERDAY || 0}
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
              className={`flex justify-center my-5 gap-5 ${
                visibleData && visibleData.length > 0 ? "" : "hidden"
              }`}
            >
              <button
                className="rounded px-7 py-2 bg-[#FEF116] text_size_5 text-dark_grey mb-10"
                onClick={() => {
                  toggleFunctionForAssiMana();
                }}
              >
                Assign Manager
              </button>

              <button
                className={`rounded px-3 py-2 ${
                  userIdentification === "Manager" ? "w-40" : "w-52"
                } bg-[#FEF116] text_size_5 text-dark_grey mb-10`}
                onClick={() => {
                  renameKeysFunctionAndSubmit();
                }}
              >
                {userIdentification === "Manager"
                  ? "Approve"
                  : "Send For Approval"}
              </button>
            </div>
          </div>
        ) : currentStatus === false ? (
          // {data ? ("True case") : data == false ? ("False case") : ("Default case")}
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
        />
      )}
    </div>
  );
};
