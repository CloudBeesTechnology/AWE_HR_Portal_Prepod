import React, { useEffect, useState } from "react";

import { FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useTempID } from "../../../utils/TempIDContext";
import { ViewSummaryFilterData } from "./ViewSummaryFilterData";
import { IoMdDownload } from "react-icons/io";

import { BiSolidPrinter } from "react-icons/bi";
import { PrintExcelSheet } from "../timeSheetSearch/PrintExcelSheet";
import { Pagination } from "../timeSheetSearch/Pagination";
import { HoursMinuAbsentCal } from "../customTimeSheet/HoursMinuAbsentCal";
import { DownloadVSpdf } from "../timeSheetSearch/DownloadVSpdf";
import { DownloadExcelPDF } from "../timeSheetSearch/DownloadExcelPDF";

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
  empPIData,
  setRefreshTrigger,

  // resultOfWHrsAbsCal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [adjustTheaderDownload, setAdjustTheaderDownload] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    selectedLocation,
    setSelectedLocation,
    getStartDate,
    getEndDate,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setOffshoreType,
    selectSapNoOrBadgeNo,
    setSelectSapNoOrBadgeNo,
  } = useTempID();

  const toggleSticky = () => {
    setAdjustTheaderDownload(true);
    document.querySelector(".table-container-scroll").scrollTop = 0;
  };

  const {
    calculateTotalWorkingHours,
    calculateNormalDays,
    calculateTotalAbsence,
    convertNumToHours,
    // convertNumToHours,
  } = HoursMinuAbsentCal();

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

  useEffect(() => {
    setCurrentPage(1);
  }, [allExcelSheetData]);

  const preparePrintRows = (rows = []) => {
    return (rows || []).map((employee, idx) => {
      // 1) Total OT (same logic as in your render)
      const addAllOT = Object.values(employee?.OVERTIMEHRS || {}).reduce(
        (acc, ot) => acc + parseFloat(ot || 0),
        0
      );
      const totalOT = addAllOT.toFixed(2);

      // 2) Total working hours (use your helper)
      const getTotalHours = calculateTotalWorkingHours(employee) || 0;
      const totalHours = Number(getTotalHours) || 0;

      // 3) Normal days (same as render, guard divide by zero)
      const getLastIndexOfNWhrs =
        Array.isArray(employee?.workHrs) && employee?.workHrs.length > 0
          ? employee?.workHrs[employee?.workHrs.length - 1]
          : employee?.workHrs || "0";

      const NWHPD = parseFloat(getLastIndexOfNWhrs) || 0;
      const NormalDays = NWHPD ? Number(totalHours) / NWHPD : 0;

      // 4) PH-D logic (same as in render)
      const getLastWorkHr = parseFloat(employee?.workHrs?.at(-1) || "0");
      const getLastWorkMonth = parseFloat(employee?.workMonth?.at(-1) || "0");
      const calculatedPHD =
        getLastWorkHr === 8 && getLastWorkMonth === 24
          ? parseFloat(employee.hollydayCounts?.PHD || 0) / 2
          : employee.hollydayCounts?.PHD || 0;

      // 5) Total Absence (use your helper)
      const totalAbsence = calculateTotalAbsence(employee, getLastIndexOfNWhrs);
      const roundedTotalAbsentiesHrs = Number(
        parseFloat(totalAbsence || 0).toFixed(2)
      );

      // 6) Verified check (build same checkVerifiedAll map)
      const checkVerifiedAll = Array.from({ length: dayCounts }, (_, i) => {
        const currentDay = new Date(getStartDate);
        currentDay.setDate(getStartDate.getDate() + i);
        const formattedDate = `${currentDay.getDate()}-${
          currentDay.getMonth() + 1
        }-${currentDay.getFullYear()}`;
        const isVerified = employee?.getVerify?.[formattedDate] || "";
        return { date: formattedDate, value: isVerified };
      }).reduce((acc, { date, value }) => {
        acc[date] = value;
        return acc;
      }, {});

      const allFieldsYes = Object.values(checkVerifiedAll).every(
        (v) => v === "Yes"
      );

      // 7) AL + CL
      const totalOfALCL =
        parseFloat(employee?.empLeaveCount?.AL || 0) +
          parseFloat(employee?.empLeaveCount?.CL || 0) || 0;

      // 8) Timekeeper unique name
      const timeKeeperName = [...new Set(employee?.timeKeeper || [])].filter(
        (n) => n !== null
      );
      const uniqueTimeKeeperName = timeKeeperName.join(", ");

      // return augmented employee
      return {
        ...employee,
        __totalOT: totalOT,
        __totalHours: totalHours,
        __NormalDays: NormalDays,
        __calculatedPHD: calculatedPHD,
        __roundedTotalAbsentiesHrs: roundedTotalAbsentiesHrs,
        __allFieldsYes: allFieldsYes,
        __totalOfALCL: totalOfALCL,
        __uniqueTimeKeeperName: uniqueTimeKeeperName,
        __uiIndex: idx,
      };
    });
  };

  const handlePrint = (
    allExcelSheetData,
    dayCounts,
    getStartDate,
    formattedStartDate,
    formattedEndDate,
    location,
    mode
  ) => {
    // "data" here is the same one you render (so it represents exactly what user sees)

    const rowsForPrint = preparePrintRows(allExcelSheetData);

    // Pass an object so PrintExcelSheet gets everything it needs to render identical UI
    if (mode === "print") {
      PrintExcelSheet({
        rows: rowsForPrint,
        dayCounts,
        startDate: getStartDate,
        formattedStartDate,
        formattedEndDate,
        location,
      });
    } else if (mode === "download") {
      DownloadVSpdf({
        rows: rowsForPrint,
        dayCounts,
        startDate: getStartDate,
        formattedStartDate,
        formattedEndDate,
        location,
        mode,
      });
    }
  };

  function sortByNameAscending(arr) {
    return arr?.sort((a, b) => a?.name?.localeCompare(b?.name));
  }

  // Pagination
  const itemsPerPage = 3;
  const safeData = sortByNameAscending(allExcelSheetData) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // var data = currentData;
  var data = isDownloading ? safeData : currentData;

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
                setSelectedLocation("");
                setSelectSapNoOrBadgeNo("");
                setOffshoreType("");
                setRefreshTrigger(0);
              }}
            >
              <FaArrowLeft />
            </Link>
          </div>
          <header className="flex justify-center text_size_2 py-5 text-dark_grey">
            <p>View Summary</p>
          </header>
          <div
            className="flex space-x-3 shadow-md items-center rounded px-3  h-10 bg-[#FEF116]"
            onClick={() => {
              const mode = "print";
              handlePrint(
                allExcelSheetData,
                dayCounts,
                getStartDate,
                formattedStartDate,
                formattedEndDate,
                location,
                mode
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
          empPIData={empPIData}
          setRefreshTrigger={setRefreshTrigger}
          // setEmptyTableMess={setEmptyTableMess}
        />
        <div className="overflow-auto max-h-[60vh] table-container-scroll">
          <table
            className="min-w-full text-sm table-fixed border-collapse bg-white"
            id="downloadTable"
          >
            <thead className="bg-[#949393] border">
              <tr
                className={`border bg-[#949393] text-white ${
                  adjustTheaderDownload === true ? "" : "sticky -top-0.5"
                }`}
              >
                <th
                  className="border px-2 py-2 border-dark_grey min-w-[200px] max-w-[400px] bg-[#949393]"
                  // rowSpan="2"
                >
                  Employee Name
                </th>
                <th
                  className="border px-2 py-2 border-dark_grey bg-[#949393]"
                  // rowSpan="2"
                >
                  PROJECT
                </th>

                {Array.from({ length: dayCounts }, (_, i) => {
                  const currentDay = new Date(getStartDate);
                  currentDay.setDate(getStartDate.getDate() + i); // Increment the date
                  return (
                    <th
                      className="border px-2 py-2 border-dark_grey "
                      key={currentDay.toDateString()} // Unique key for each column
                    >
                      {currentDay.getDate()}
                    </th>
                  );
                })}

                <th className="border  px-2 py-2 border-dark_grey ">NH</th>
                <th className="border  px-2 py-2 border-dark_grey ">ND</th>
                <th className="border  px-2 py-2 border-dark_grey ">PH</th>
                <th className="border  px-2 py-2 border-dark_grey ">PH-D</th>
                <th className="border  px-2 py-2 border-dark_grey ">AL/CL</th>
                <th className="border  px-2 py-2 border-dark_grey ">SL</th>
                <th className="border  px-2 py-2 border-dark_grey ">OFF</th>
                <th className="border  px-2 py-2 border-dark_grey ">A</th>
                <th className="border  px-2 py-2 border-dark_grey ">UAL</th>
                <th className="border  px-2 py-2 border-dark_grey ">OT</th>

                <th className="border  px-2 py-2 border-dark_grey bg-[#949393]">
                  Verified
                </th>
                <th className="border  px-2 py-2 border-dark_grey bg-[#949393]">
                  Updater
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && data && data?.length > 0 ? (
                data.map((employee, index) => {
                  // const floatTotalOT = Object.values(
                  //   employee?.OVERTIMEHRS || {}
                  // ).reduce((acc, ot) => acc + parseFloat(ot || 0), 0);

                  // stage 1

                  const addAllOT = Object.values(
                    employee?.OVERTIMEHRS || {}
                  ).reduce((acc, ot) => {
                    return acc + parseFloat(ot || 0);
                  }, 0);
                  const totalOT = addAllOT.toFixed(2);
                  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

                  // stage 2
                  const getTotalHours =
                    calculateTotalWorkingHours(employee) || 0;

                  const roundedNumberOfTotalHours = Number(getTotalHours);
                  const totalHours = roundedNumberOfTotalHours;

                  const getLastIndexOfNWhrs =
                    Array.isArray(employee?.workHrs) &&
                    employee?.workHrs?.length > 0
                      ? employee?.workHrs[employee?.workHrs?.length - 1]
                      : employee?.workHrs || "0";

                  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

                  // stage 3
                  let NWHPD = parseFloat(getLastIndexOfNWhrs);
                  let roundedNumber = Number(parseFloat(totalHours)) / NWHPD;
                  const NormalDays = roundedNumber;

                  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

                  // stage 4
                  const calculatePHDforStaffLeveEmp = (emp) => {
                    const getLastWorkHr = parseFloat(
                      emp?.workHrs?.at(-1) || "0"
                    );
                    const getLastWorkMonth = parseFloat(
                      emp?.workMonth?.at(-1) || "0"
                    );

                    // Condition: 8 hrs and last workMonth = 24
                    if (getLastWorkHr === 8 && getLastWorkMonth === 24) {
                      return (parseFloat(emp.hollydayCounts?.PHD) || 0) / 2;
                    }

                    // Return original if condition not met
                    return emp.hollydayCounts?.PHD || 0;
                  };

                  const calculatedPHD = calculatePHDforStaffLeveEmp(employee);
                  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

                  // stage 4
                  const totalAbsence = calculateTotalAbsence(
                    employee,
                    getLastIndexOfNWhrs
                  );

                  // const totalAbsentiesHrs = convertNumToHours(
                  //   totalAbsence,
                  //   getLastIndexOfNWhrs
                  // );
                  const roundedTotalAbsentiesHrs = Number(
                    parseFloat(totalAbsence).toFixed(2)
                  );

                  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

                  // stage 5
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

                  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

                  // stage 6
                  const totalOfALCL =
                    parseFloat(employee?.empLeaveCount?.AL) +
                      parseFloat(employee?.empLeaveCount?.CL) || 0;

                  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

                  // stage 7
                  const getTimeKeeperName = employee?.timeKeeper;

                  const timeKeeperName = [...new Set(getTimeKeeperName)];
                  // const uniqueTimeKeeperName =
                  //   timeKeeperName.length > 1
                  //     ? timeKeeperName.join(", ")
                  //     : timeKeeperName;
                  const uniqueTimeKeeperName = timeKeeperName
                    .filter((name) => name !== null) // Remove null values
                    .join(", ");

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
                              className={`border px-2 py-1 border-dark_grey text-center cursor-pointer max-w-[70px] min-w-[70px] break-words whitespace-normal
                               ${
                                 isChecked
                                   ? "bg-[#f59a51] bg-opacity-50 z-0"
                                   : dayOfWeek === "Sunday"
                                   ? "bg-yellow bg-opacity-50 z-0"
                                   : ""
                               }`}
                              key={currentDayKey}
                              onClick={() => {
                                toggleEditViewSummaryFunc?.();
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
                                    Array.isArray(employee?.workHrs) &&
                                    employee?.workHrs.length > 0
                                      ? employee?.workHrs[
                                          employee?.workHrs?.length - 1
                                        ]
                                      : employee?.workHrs || "0",
                                  workMonth:
                                    Array.isArray(employee?.workMonth) &&
                                    employee?.workMonth?.length > 0
                                      ? employee?.workMonth[
                                          employee?.workMonth?.length - 1
                                        ]
                                      : employee?.workMonth || "0",

                                  workingHrsKey: currentDayKey,
                                  verify: employee?.getVerify?.[currentDayKey],
                                  firstFileType: employee.firstFileType || "",
                                  index: index,
                                };

                                editViewSummaryObject(empDetails);
                              }}
                            >
                              {employee?.workingHrs?.[currentDayKey] || ""}{" "}
                            </td>
                          );
                        })}
                        <td className="border px-2 py-1" rowSpan="2">
                          {parseFloat(totalHours).toFixed(2)}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {parseFloat(NormalDays).toFixed(2)}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.hollydayCounts?.PH || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {/* {employee?.hollydayCounts?.PHD || 0} */}
                          {calculatedPHD || 0}
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
                        <td className="border px-2 py-1 " rowSpan="2">
                          {parseFloat(roundedTotalAbsentiesHrs).toFixed(2) || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.empLeaveCount?.UAL || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {parseFloat(totalOT).toFixed(2) || 0}
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
                              className={`border px-2 py-1 border-dark_grey text-center ${
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
                              className={`border px-2 py-2 border-dark_grey text-center
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
                                  {/* <span>{formattedBruneiDateTime || ""}</span> */}
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
                              className={`${i === 0 ? "border" : "border"}`}
                              key={currentDayIndex}
                            ></td>
                          );
                        })}
                        {/* ))} */}
                        <td className="border px-2 py-1">
                          {parseFloat(totalHours).toFixed(2)}
                        </td>
                        <td className="border px-2 py-1">
                          {parseFloat(NormalDays).toFixed(2)}
                        </td>

                        <td className="border px-2 py-1">
                          {employee?.hollydayCounts?.PH || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {/* {employee?.hollydayCounts?.PHD || 0}*/}
                          {calculatedPHD || 0}
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
                          {parseFloat(roundedTotalAbsentiesHrs).toFixed(2) || 0}
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
                          loading === false &&
                          !selectSapNoOrBadgeNo
                        ? "Search SAP No or Badge No to to display records."
                        : startDate &&
                          endDate &&
                          selectedLocation &&
                          selectSapNoOrBadgeNo &&
                          loading === true
                        ? "Processing your request... This may take a moment."
                        : emptyTableMess === true
                        ? "No records available. Try selecting different dates or locations."
                        : "Unable to process your request. Kindly refresh and select valid dates and location."}
                    </p>
                  </td>
                </tr>
                // <p className="px-6 py-6">
                //   {emptyTableMess
                //     ? "No records available. Try selecting different dates or locations."
                //     : !startDate || !endDate
                //     ? "Your table is currently empty. Set a date range to view employee records."
                //     : !selectedLocation
                //     ? "Please choose a location to filter records within the selected date range."
                //     : loading
                //     ? "Processing your request... This may take a moment."
                //     : ""}
                // </p>
              )}
            </tbody>
          </table>
        </div>

        <footer className="flex items-center justify-between py-6 ">
          <div className="flex-1"></div>

          {/* Download Button Section */}
          <div className="flex-1 flex justify-center">
            <button
              className="flex items-center space-x-2 rounded px-4 py-2  bg-[#FEF116] shadow-md"
              onClick={() => {
                // toggleSticky();
                // DownloadExcelPDF(
                //   "downloadTable",
                //   location,
                //   formattedStartDate,
                //   formattedEndDate
                // );
                // setAdjustTheaderDownload(false);

                // const mode = "download";
                // handlePrint(
                //   allExcelSheetData,
                //   dayCounts,
                //   getStartDate,
                //   formattedStartDate,
                //   formattedEndDate,
                //   location,
                //   mode
                // );

                setIsDownloading(true);

                setTimeout(() => {
                  DownloadExcelPDF(
                    "downloadTable",
                    location,
                    formattedStartDate,
                    formattedEndDate
                  );

                  // Reset states after download
                  // setAdjustTheaderDownload(false);
                  setIsDownloading(false);
                }, 2000);
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

// ############################################################################################################
// ############################################################################################################
