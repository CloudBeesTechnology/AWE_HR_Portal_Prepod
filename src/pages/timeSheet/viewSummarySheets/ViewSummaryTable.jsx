import React, { useState } from "react";

import { FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useTempID } from "../../../utils/TempIDContext";
import { ViewSummaryFilterData } from "./ViewSummaryFilterData";
import { IoMdDownload } from "react-icons/io";

import { BiSolidPrinter } from "react-icons/bi";
import { DownloadExcelPDF } from "../timeSheetSearch/DownloadExcelPDF";
import { PrintExcelSheet } from "../timeSheetSearch/PrintExcelSheet";
import { Pagination } from "../timeSheetSearch/Pagination";

export const ViewSummaryTable = ({
  dayCounts,
  data: allExcelSheetData,
  LocationData,
  secondaryData,
  searchResult,
  loading,
  emptyTableMess,
  resetTableFunc,
  toggleEditViewSummaryFunc,
  editViewSummaryObject,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    selectedLocation,
    getStartDate,
    getEndDate,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useTempID();

  function calculateTotalWorkingHours(data) {
    let totalHours = 0;
    try {
      for (const key in data) {
        const value = data[key];

        const xPattern = /^x\((\d+(\.\d+)?)\)(\d+(\.\d+)?)$/;
        const xMatch = value?.match(xPattern);
        if (xMatch) {
          totalHours += parseFloat(xMatch[3]);
          continue;
        }

        const numberPattern = /^\d+(\.\d+)?$/;
        if (value?.match(numberPattern)) {
          totalHours += parseFloat(value);
          continue;
        }

        const halPattern = /^H[A-Z]*\d+$/;
        if (value?.match(halPattern)) {
          const hours = parseFloat(value?.replace(/[^0-9]/g, ""));

          totalHours += hours;
          continue;
        }
      }

      return totalHours;
    } catch (err) {}
  }

  function calculateTotalAbsence(inputData, getLastIndexOfNWhrs) {
    try {
      let totalAbsence = 0;

      for (let date in inputData) {
        const value = inputData[date];

        if (value?.startsWith("x(")) {
          const absenceMatch = value?.match(/x\(([\d.]+)\)/);
          if (absenceMatch) {
            totalAbsence += parseFloat(absenceMatch[1]);
          }
        } else if (value === "A") {
          totalAbsence += parseFloat(getLastIndexOfNWhrs);
        }
      }

      return totalAbsence;
    } catch (err) {}
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  const location = selectedLocation?.toUpperCase();

  // Pagination
  const itemsPerPage = 10;
  const safeData = allExcelSheetData || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  var data = currentData;

  return (
    <div className="bg-[#fafaf6] h-screen">
      <div className="screen-size p-4">
        <header className="my-5 flex justify-between">
          <div className="flex items-center ">
            <Link
              to="/timeSheet"
              className="text-xl flex-1 text-grey"
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
            >
              <FaArrowLeft />
            </Link>
          </div>
          <header className="flex justify-center text_size_2 py-5 text-dark_grey ">
            <p>View Summary</p>
          </header>
          <div
            className="flex space-x-3 shadow-md items-center rounded px-3  h-10 bg-[#FEF116]"
            onClick={() => {
              PrintExcelSheet(
                "downloadTable",
                location,
                formattedStartDate,
                formattedEndDate
              );
            }}
          >
            <button className="text_size_5 text-dark_grey ">Print</button>
            <BiSolidPrinter className="text-black cursor-pointer" />
          </div>
        </header>
        <ViewSummaryFilterData
          LocationData={LocationData}
          secondaryData={secondaryData}
          searchResult={searchResult}
          resetTableFunc={resetTableFunc}
          // setEmptyTableMess={setEmptyTableMess}
        />
        <div className="overflow-auto max-h-[60vh]">
          <table className="min-w-full text-sm bg-white " id="downloadTable">
            <thead className="bg-[#949393]">
              <tr className=" text-white">
                <th
                  className="border px-2 py-2 border-dark_grey min-w-[200px] max-w-[400px]"
                  rowSpan="2"
                >
                  Employee Name
                </th>
                <th className="border px-2 py-2 border-dark_grey" rowSpan="2">
                  PROJECT
                </th>

                {Array.from({ length: dayCounts }, (_, i) => {
                  const currentDay = new Date(getStartDate);
                  currentDay.setDate(getStartDate.getDate() + i); // Increment the date
                  return (
                    <th
                      className="border px-2 py-2 border-dark_grey"
                      key={currentDay.toDateString()} // Unique key for each column
                    >
                      {currentDay.getDate()}
                    </th>
                  );
                })}

                <th className="border  px-2 py-2 border-dark_grey">NH</th>
                <th className="border  px-2 py-2 border-dark_grey">ND</th>
                <th className="border  px-2 py-2 border-dark_grey">PH</th>
                <th className="border  px-2 py-2 border-dark_grey">PH-D</th>
                <th className="border  px-2 py-2 border-dark_grey">AL/CL</th>
                <th className="border  px-2 py-2 border-dark_grey">SL</th>
                <th className="border  px-2 py-2 border-dark_grey">OFF</th>
                <th className="border  px-2 py-2 border-dark_grey">A</th>
                <th className="border  px-2 py-2 border-dark_grey">UAL</th>
                <th className="border  px-2 py-2 border-dark_grey">OT</th>

                <th className="border  px-2 py-2 border-dark_grey">Verified</th>
                <th className="border  px-2 py-2 border-dark_grey">Updater</th>
              </tr>
            </thead>

            <tbody>
              {loading && data && data?.length > 0 ? (
                data.map((employee, index) => {
                  const floatTotalOT = Object.values(
                    employee?.OVERTIMEHRS || {}
                  ).reduce((acc, ot) => acc + parseFloat(ot || 0), 0);
                  const totalOT = Number(floatTotalOT.toFixed(2));
                  const getTotalHours =
                    calculateTotalWorkingHours(employee?.workingHrs) || 0;
                  const roundedNumberOfTotalHours = Number(
                    getTotalHours.toFixed(2)
                  );
                  const totalHours = roundedNumberOfTotalHours;

                  const getLastIndexOfNWhrs =
                    employee?.workHrs && employee?.workHrs?.length > 0
                      ? employee?.workHrs[employee?.workHrs?.length - 1]
                      : "";

                  const getNormalDays =
                    totalHours / parseFloat(getLastIndexOfNWhrs) || 0;
                  const roundedNumber = Number(getNormalDays.toFixed(2));
                  const NormalDays = roundedNumber;

                  const totalAbsence = calculateTotalAbsence(
                    employee?.workingHrs,
                    getLastIndexOfNWhrs
                  );
                  const totalAbsentiesHrs =
                    totalAbsence / parseFloat(getLastIndexOfNWhrs) || 0;
                  const roundedTotalAbsentiesHrs = Number(
                    totalAbsentiesHrs.toFixed(2)
                  );

                  const checkVerifiedAll = Array.from(
                    { length: dayCounts },
                    (_, i) => {
                      const currentDay = new Date(getStartDate);
                      currentDay.setDate(getStartDate.getDate() + i);

                      const formattedDate = `${currentDay.getDate()}-${
                        currentDay.getMonth() + 1
                      }-${currentDay.getFullYear()}`;

                      const isVerified =
                        employee?.getVerify?.[formattedDate] || "";

                      const finalValue = isVerified;

                      return {
                        date: formattedDate,
                        value: finalValue,
                      };
                    }
                  ).reduce((acc, { date, value }) => {
                    acc[date] = value;
                    return acc;
                  }, {});

                  const allFieldsYes = Object.values(checkVerifiedAll).every(
                    (value) => value === "Yes"
                  );

                  const totalOfALCL =
                    parseFloat(employee?.empLeaveCount?.AL) +
                      parseFloat(employee?.empLeaveCount?.CL) || 0;

                  const getTimeKeeperName = employee?.timeKeeper;
                
                  const timeKeeperName = [...new Set(getTimeKeeperName)];
                  const uniqueTimeKeeperName =
                    timeKeeperName.length > 1
                      ? timeKeeperName.join("  ")
                      : timeKeeperName;
                 
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td
                          className="border px-2 py-3 text-center"
                          rowSpan="2"
                        >
                          <span>{employee.name || ""}</span>
                          <br />
                          <span>
                            {`Badge# : ${employee.empBadgeNo || ""} | SapID : ${
                              employee.sapNo || ""
                            }`}
                          </span>
                          <br />

                          <span>{`Hours/Day : ${
                            employee?.workHrs && employee?.workHrs.length > 0
                              ? employee?.workHrs[employee?.workHrs?.length - 1]
                              : ""
                          }  `}</span>
                          <span>{`Days/Month : ${
                            employee?.workMonth &&
                            employee?.workMonth?.length > 0
                              ? employee?.workMonth[
                                  employee?.workMonth.length - 1
                                ]
                              : ""
                          }`}</span>
                          <br />
                          <span>
                            {`SalaryType : ${
                              employee?.salaryType &&
                              employee?.salaryType.length > 0
                                ? employee?.salaryType[
                                    employee?.salaryType?.length - 1
                                  ]
                                : ""
                            }`}
                          </span>
                        </td>
                        <td className="border px-2 py-1 " rowSpan="2">
                          {employee.jobcode}
                        </td>

                        {Array.from({ length: dayCounts }, (_, i) => {
                          const currentDay = new Date(getStartDate);
                          currentDay.setDate(getStartDate.getDate() + i);

                          const currentDayKey = `${currentDay.getDate()}-${
                            currentDay.getMonth() + 1
                          }-${currentDay.getFullYear()}`;

                          const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
                            weekday: "long",
                          }).format(currentDay);

                          const isVerified =
                            employee?.getVerify?.[currentDayKey];
                          const isChecked = Boolean(isVerified);
                          return (
                            <td
                              className={`border px-2 py-1 border-dark_grey cursor-pointer                      
                               ${
                                 isChecked
                                   ? "bg-[#f59a51] bg-opacity-50 z-0"
                                   : dayOfWeek === "Sunday"
                                   ? "bg-yellow bg-opacity-50 z-0"
                                   : ""
                               }`}
                              key={currentDayKey}
                              onClick={() => {
                                toggleEditViewSummaryFunc();
                                const empDetails = {
                                  id: employee?.id,
                                  data: employee?.data,
                                  grouped: employee.grouped,
                                  empName: employee?.name,
                                  sapNo: employee.sapNo,
                                  empBadgeNo: employee?.empBadgeNo,
                                  location: employee?.location,
                                  jobcode: employee?.jobcode,
                                  workingHrs:
                                    employee?.workingHrs?.[currentDayKey],
                                  ot: employee?.OVERTIMEHRS?.[currentDayKey],
                                  workHrs:
                                    employee?.workHrs &&
                                    employee?.workHrs.length > 0
                                      ? employee?.workHrs
                                      : "",
                                  workMonth:
                                    employee?.workMonth &&
                                    employee?.workMonth?.length > 0
                                      ? employee?.workMonth
                                      : "",

                                  workingHrsKey: currentDayKey,
                                  verify: employee?.getVerify?.[currentDayKey],
                                  firstFileType: employee.firstFileType || "",
                                };

                                editViewSummaryObject(empDetails);
                              }}
                            >
                              {employee?.workingHrs?.[currentDayKey] || ""}{" "}
                            </td>
                          );
                        })}
                        <td className="border px-2 py-1" rowSpan="2">
                          {totalHours}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {NormalDays}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.hollydayCounts?.PH || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.hollydayCounts?.PHD || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {`${employee?.empLeaveCount?.AL || 0} /
                               ${employee?.empLeaveCount?.CL || 0} `} */}
                          {/* {parseInt(employee?.empLeaveCount?.AL) +
                            parseInt(employee?.empLeaveCount?.CL) || 0} */}
                          {totalOfALCL}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee.empLeaveCount?.SL || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.hollydayCounts?.OFF || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {roundedTotalAbsentiesHrs || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.empLeaveCount?.UAL || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {totalOT || 0}
                        </td>

                        <td className="border px-2 py-1" rowSpan="2">
                          {allFieldsYes ? "Yes" : ""}
                        </td>
                        {/* {employee} */}
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee?.timeKeeper} */}
                          {uniqueTimeKeeperName}
                        </td>
                      </tr>
                      <tr>
                        {Array.from({ length: dayCounts }, (_, i) => {
                          const currentDay = new Date(getStartDate);
                          currentDay.setDate(getStartDate.getDate() + i);

                          const currentDayKey = `${currentDay.getDate()}-${
                            currentDay.getMonth() + 1
                          }-${currentDay.getFullYear()}`;

                          const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
                            weekday: "long",
                          }).format(currentDay);

                          const isVerified =
                            employee?.getVerify?.[currentDayKey];

                          const isChecked = Boolean(isVerified);
                          return (
                            <td
                              className={`border px-2 py-1 border-dark_grey  ${
                                isChecked
                                  ? "bg-[#f59a51] bg-opacity-50 z-0"
                                  : dayOfWeek === "Sunday"
                                  ? "bg-yellow bg-opacity-50 z-0"
                                  : ""
                              }`}
                              key={currentDayKey}
                            >
                              {employee?.OVERTIMEHRS?.[currentDayKey] || "0"}{" "}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border px-2 py-1 bg-white bg-opacity-50 z-0">
                        <td
                          className="border px-2 py-1 bg-white bg-opacity-50 z-0"
                          colSpan={1}
                        >
                          {" "}
                        </td>
                        <td className="bg-white bg-opacity-50 z-0"></td>

                        {Array.from({ length: dayCounts }, (_, i) => {
                          const currentDay = new Date(getStartDate);
                          currentDay.setDate(getStartDate.getDate() + i);

                          const formattedDate = `${currentDay.getDate()}-${
                            currentDay.getMonth() + 1
                          }-${currentDay.getFullYear()}`;

                          const isVerified =
                            employee?.getVerify?.[formattedDate];

                          const isChecked = Boolean(isVerified);

                          const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
                            weekday: "long",
                          }).format(currentDay);

                          const updatedDateTime =
                            employee?.assignUpdaterDateTime?.[formattedDate];

                          const options = {
                            timeZone: "Asia/Brunei",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          };

                          if (updatedDateTime) {
                            var bruneiTime = new Intl.DateTimeFormat(
                              "en-BN",
                              options
                            ).format(new Date(updatedDateTime));
                          }

                          const dateObj = new Date(bruneiTime);

                          const day = String(dateObj.getDate()).padStart(
                            2,
                            "0"
                          );
                          const month = String(dateObj.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const year = dateObj.getFullYear();

                          const time = String(bruneiTime).split(", ")[1];

                          const formattedBruneiDateTime = `${day}/${month}/${year} ${time}`;
                          return (
                            <td
                              className={`border px-2 py-2 border-dark_grey
                              ${
                                isChecked
                                  ? "bg-[#f59a51] bg-opacity-50  z-0"
                                  : dayOfWeek === "Sunday"
                                  ? "bg-yellow bg-opacity-50 z-0"
                                  : "bg-white bg-opacity-50 z-0"
                              }
                            `}
                              key={currentDay.toDateString()}
                            >
                              {isChecked && (
                                <>
                                  <input
                                    className="py-10"
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {}}
                                  />
                                  <br />
                                  <span>{formattedBruneiDateTime || ""}</span>
                                </>
                              )}
                            </td>
                          );
                        })}
                        {/* ))} */}
                        <td className="border px-2 py-1 ">{""}</td>
                        <td className="border px-2 py-1">{""}</td>

                        <td className="border px-2 py-1">{""}</td>
                        <td className="border px-2 py-1">{""}</td>
                        <td className="border px-2 py-1">{""}</td>
                        <td className="border px-2 py-1">{""}</td>
                        <td className="border px-2 py-1">{""}</td>
                        <td className="border px-2 py-1">{""}</td>
                        <td className="border px-2 py-1">{""}</td>
                        <td className="border px-2 py-1">{""}</td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        {/* <td className="border px-2 py-1"></td> */}
                      </tr>
                      <tr className="bg-[#d8d3d3] bg-opacity-50">
                        <td className="border px-2 py-1" colSpan={1}>
                          Total
                        </td>

                        {Array.from({ length: dayCounts + 1 }, (_, i) => {
                          const currentDayIndex = i + 1;

                          return (
                            <td
                              className={`${i === 0 ? "border" : "border-b"}`}
                              key={currentDayIndex}
                            ></td>
                          );
                        })}
                        {/* ))} */}
                        <td className="border px-2 py-1">{totalHours}</td>
                        <td className="border px-2 py-1">{NormalDays}</td>

                        <td className="border px-2 py-1">
                          {employee?.hollydayCounts?.PH || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee?.hollydayCounts?.PHD || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {/* {`${employee?.empLeaveCount?.AL || 0} /
                               ${employee?.empLeaveCount?.CL || 0}`} */}
                          {/* {parseFloat(employee?.empLeaveCount?.AL) +
                            parseFloat(employee?.empLeaveCount?.CL) || 0} */}
                          {totalOfALCL}
                        </td>
                        <td className="border px-2 py-1">
                          {employee.empLeaveCount?.SL || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee?.hollydayCounts?.OFF || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {roundedTotalAbsentiesHrs || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee?.empLeaveCount?.UAL || 0}
                        </td>
                        <td className="border px-2 py-1">{totalOT}</td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        {/* <td className="border px-2 py-1"></td> */}
                      </tr>
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="50"
                    className="px-6 py-3 text-center text-dark_ash text_size_5"
                  >
                    <p className="px-6 py-6">
                      {!startDate || (!endDate && loading === false)
                        ? "Your table is currently empty. Set a date range to view employee records."
                        : startDate &&
                          endDate &&
                          !selectedLocation &&
                          loading === false
                        ? "Please choose a location to filter records within the selected date range."
                        : startDate &&
                          endDate &&
                          selectedLocation &&
                          loading === true
                        ? "Processing your request... This may take a moment."
                        : emptyTableMess === true
                        ? "No records available. Try selecting different dates or locations."
                        : "Processing your request... This may take a moment."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="flex items-center justify-between py-6 ">
          <div className="flex-1"></div>

          {/* Download Button Section */}
          <div className="flex-1 flex justify-center ">
            <button
              className="flex items-center space-x-2 rounded px-4 py-2  bg-[#FEF116] shadow-md"
              onClick={() => {
                DownloadExcelPDF(
                  "downloadTable",
                  location,
                  formattedStartDate,
                  formattedEndDate
                );
              }}
            >
              <span className="cursor-pointer text-dark_grey text_size_5">
                Download
              </span>
              <IoMdDownload className="text-lg text-black" />
            </button>
          </div>

          {/* Pagination Section */}
          <div className="flex-1 flex justify-end">
            {data && data.length > 0 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                paginate={paginate}
              />
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};
