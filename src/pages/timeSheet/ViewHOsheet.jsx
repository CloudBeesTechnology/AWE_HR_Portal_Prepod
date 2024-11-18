import { useCallback, useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";
import { createHeadOffice, updateHeadOffice } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { EditTimeSheet } from "./EditTimeSheet";
import { PopupForSFApproves } from "./ModelForSuccessMess/PopupForSFApproves";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { SuccessMessage } from "./ModelForSuccessMess/SuccessMessage";
import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { PopupForMissMatchExcelSheet } from "./ModelForSuccessMess/PopupForMissMatchExcelSheet";
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
  const [editObject, setEditObject] = useState();
  const [toggleHandler, setToggleHandler] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);

  const [loading, setLoading] = useState(true);
  const [userIdentification, setUserIdentification] = useState("");
  const [showStatusCol, setShowStatusCol] = useState(null);
  const [successMess, setSuccessMess] = useState(null);
  const ITEMS_PER_PAGE = 50; // Initial number of items to display
  const [visibleData, setVisibleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    // Load initial data
    if (data && data.length > 0) {
      console.log("WORKING");
      setVisibleData(data.slice(0, ITEMS_PER_PAGE));
    }
  }, [data, currentPage]);

  const loadMoreData = useCallback(() => {
    // Calculate new visible data when user scrolls down
    const nextPage = currentPage + 1;
    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const newItems = data.slice(start, end);

    setVisibleData((prevData) => [...prevData, ...newItems]);
    setCurrentPage(nextPage);
  }, [data]);

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
          setData(fetchedData);
        } catch (err) {}
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

    // console.log(getPosition);
  }, []);
  const pendingData = (data) => {
    // data &&
    //   data.map((m) => {
    //     console.log(m);
    //   });
    // console.log(data);

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
                TOTALACTUALHOURS: val.totalActHrs || "",
                jobLocaWhrs: val?.jobLocaWhrs || [],
                REMARKS: val.remarks || "",
                status: val.status || "",
              };
            }),
          };
        });

      // console.log(result);
      console.log(result);
      setData(result);
    }
  };

  const searchResult = (result) => {
    setData(result);
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
        // console.log(cleanedItem);
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

      // console.log(" requiredKeys : ", requiredKeys);
      // console.log("returnedTHeader : ", cleanData);
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

      console.log("Result: ", result);
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
    // console.log(result);
    setData(result);
  };

  const AllfieldData = useTableFieldData(titleName);

  const renameKeysFunctionAndSubmit = async () => {
    if (userIdentification === "TimeKeeper") {
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
            totalActHrs: val.TOTALACTUALHOURS || "",
            jobLocaWhrs: val?.jobLocaWhrs || [],
            remarks: val.REMARKS || "",
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
            query: createHeadOffice,
            variables: {
              input: DailySheet,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.createHeadOffice) {
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
                totalActHrs: val.TOTALACTUALHOURS || 0,
                jobLocaWhrs: val?.jobLocaWhrs || [],
                remarks: val.REMARKS || "",
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
              query: updateHeadOffice,
              variables: {
                input: finalData,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data.updateHeadOffice) {
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
                  <tr className="bg-lite_grey text-dark_grey text_size_5">
                    <td className="px-4 flex-1">S No.</td>
                    {AllfieldData?.tableHeader.map((header, index) => (
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
                  {visibleData && visibleData?.length > 0 ? (
                    visibleData.map((value, index) => {
                      const renderRows = (m, ind) => {
                        const isStatusPending = m.status === "Pending";
                        return (
                          <tr
                            key={
                              userIdentification === "Manager"
                                ? ind + 1
                                : index + 1
                            }
                            className="text-dark_grey h-[40px] text-sm rounded-sm shadow-md border-b-2 border-[#CECECE] bg-white"
                            onClick={() => {
                              toggleFunction();
                              editBLNG(m);
                            }}
                          >
                            <td className="text-center px-4 flex-1">
                              {userIdentification === "Manager"
                                ? ind + 1
                                : index + 1}
                            </td>
                            <td className="text-start px-4 flex-1">{m.REC}</td>
                            <td className="text-center px-4 flex-1">{m.CTR}</td>
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
                            <td className="text-center px-4 flex-1">{m.IN}</td>
                            <td className="text-center px-4 flex-1">{m.OUT}</td>
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
                              {m.TOTALACTUALHOURS || 0}
                            </td>
                            <td className="text-center px-4 flex-1">
                              {m.REMARKS}
                            </td>
                            {isStatusPending && (
                              <td className="text-center px-4 flex-1">
                                {m.status}
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
                }}
              >
                {userIdentification === "Manager"
                  ? "Approve"
                  : "Send For Approval"}
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

//       console.log("Result: ", result);
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
