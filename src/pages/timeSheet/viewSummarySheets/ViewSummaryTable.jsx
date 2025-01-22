import React from "react";

import { FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useTempID } from "../../../utils/TempIDContext";
import { ViewSummaryFilterData } from "./ViewSummaryFilterData";
import { IoMdDownload } from "react-icons/io";
// import tableLogo from "../../../assets/logo/aweLogo.png";
import { BiSolidPrinter } from "react-icons/bi";
import { DownloadExcelPDF } from "../timeSheetSearch/DownloadExcelPDF";
import { PrintExcelSheet } from "../timeSheetSearch/PrintExcelSheet";

export const ViewSummaryTable = ({
  dayCounts,
  data,
  LocationData,
  secondaryData,
  searchResult,
  loading,
  emptyTableMess,
  resetTableFunc,
  toggleEditViewSummaryFunc,
  editViewSummaryObject,

  // setEmptyTableMess
}) => {
  const { selectedLocation, getStartDate, getEndDate, startDate, endDate } =
    useTempID();

  function calculateTotalWorkingHours(data) {
    let totalHours = 0;
    try {
      for (const key in data) {
        const value = data[key];

        // Match patterns like x(0.5)9.5
        const xPattern = /^x\((\d+(\.\d+)?)\)(\d+(\.\d+)?)$/;
        const xMatch = value?.match(xPattern);
        if (xMatch) {
          totalHours += parseFloat(xMatch[3]);
          continue;
        }

        // Match patterns like "10"
        const numberPattern = /^\d+(\.\d+)?$/;
        if (value?.match(numberPattern)) {
          totalHours += parseFloat(value);
          continue;
        }

        // Match patterns like HAL5, HCL5, etc.
        const halPattern = /^H[A-Z]*\d+$/;
        if (value?.match(halPattern)) {
          const hours = parseFloat(value?.replace(/[^0-9]/g, ""));

          totalHours += hours;
          continue;
        }
      }

      return totalHours;
    } catch (err) {
      // console.log(err, " : ERROR");
    }
  }

  // Calculate Total Absence
  function calculateTotalAbsence(inputData, getLastIndexOfNWhrs) {
    try {
      let totalAbsence = 0;

      for (let date in inputData) {
        const value = inputData[date];

        if (value?.startsWith("x(")) {
          // Extract the number inside x()
          const absenceMatch = value?.match(/x\(([\d.]+)\)/);
          if (absenceMatch) {
            totalAbsence += parseFloat(absenceMatch[1]);
          }
        } else if (value === "A") {
          totalAbsence += parseFloat(getLastIndexOfNWhrs); // Add 8 for each "A"
        }
      }

      return totalAbsence;
    } catch (err) {
      // console.log(err);
    }
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    // Return the formatted date
    return `${day}-${month}-${year}`;
  };
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  const location = selectedLocation?.toUpperCase();

  return (
    <div className="bg-[#fafaf6] h-screen">
      <div className="screen-size p-4">
        <header className="my-5 flex justify-between">
          <div className="flex items-center ">
            <Link
              to="/timeSheet"
              className="text-xl flex-1 text-grey"
              onClick={() => {
                getStartDate(null);
                getEndDate(null);
              }}
            >
              <FaArrowLeft />
            </Link>
          </div>
          <header className="flex justify-center text_size_2 py-5 text-dark_grey ">
            <p>View Summary</p>
          </header>
          <div
            className="flex space-x-3  items-center rounded px-3  h-10 bg-[#FEF116]"
            onClick={() => {
              PrintExcelSheet(
                "downloadTable",
                location,
                formattedStartDate,
                formattedEndDate
              );
            }}
          >
            <button className="text_size_5 text-dark_grey">Print</button>
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
                <th className="border  px-2 py-2 border-dark_grey">
                  MEAL ALLOW
                </th>
                <th className="border  px-2 py-2 border-dark_grey">Verified</th>
                <th className="border  px-2 py-2 border-dark_grey">Updater</th>
              </tr>
            </thead>

            <tbody>
              {loading && data && data?.length > 0 ? (
                data.map((employee, index) => {
                  // const normalWorkHours = Object.values(
                  //   employee.NORMALWORKHRSPERDAY || {}
                  // );
                  // const totalHours = normalWorkHours.reduce(
                  //   (acc, hour) => acc + parseInt(hour || 0, 10),
                  //   0
                  // );
                  // const NormalDays = normalWorkHours.length;

                  //Calculate Total OT
                  const totalOT = Object.values(
                    employee?.OVERTIMEHRS || {}
                  ).reduce((acc, ot) => acc + parseInt(ot || 0), 0);

                  // Calculate Total NH(Normal working Hrs)
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
                  // Calculate Total ND(Normal Day)
                  const getNormalDays =
                    totalHours / parseFloat(getLastIndexOfNWhrs) || 0;
                  const roundedNumber = Number(getNormalDays.toFixed(2));
                  const NormalDays = roundedNumber;

                  // Calculate Total Absence
                  const totalAbsence = calculateTotalAbsence(
                    employee?.workingHrs,
                    getLastIndexOfNWhrs
                  );
                  const totalAbsentiesHrs =
                    totalAbsence / parseFloat(getLastIndexOfNWhrs) || 0;
                  const roundedTotalAbsentiesHrs = Number(
                    totalAbsentiesHrs.toFixed(2)
                  );
                  // Check all hours verified
                  const checkVerifiedAll = Array.from(
                    { length: dayCounts },
                    (_, i) => {
                      const currentDay = new Date(getStartDate);
                      currentDay.setDate(getStartDate.getDate() + i); // Increment the date

                      // Format the date as "day-month-year"
                      const formattedDate = `${currentDay.getDate()}-${
                        currentDay.getMonth() + 1
                      }-${currentDay.getFullYear()}`;

                      // Get the verification status for the current date
                      const isVerified =
                        employee?.getVerify?.[formattedDate] || "";

                      // Check if the day is a special day
                      const isSpecialDay = ["PH", "PHD", "OFF"].includes(
                        employee?.workingHrs?.[formattedDate]
                      );

                      // Determine the final value based on conditions
                      const finalValue = isSpecialDay
                        ? "Yes"
                        : isVerified || null;

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
                            employee.workMonth && employee.workMonth.length > 0
                              ? employee.workMonth
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
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee.jobcode}
                        </td>

                        {Array.from({ length: dayCounts }, (_, i) => {
                          const currentDay = new Date(getStartDate); // Assume getStartDate is a valid Date object
                          currentDay.setDate(getStartDate.getDate() + i); // Increment the date

                          // Format the key as "day-month-year"
                          const currentDayKey = `${currentDay.getDate()}-${
                            currentDay.getMonth() + 1
                          }-${currentDay.getFullYear()}`;

                          return (
                            <td
                              className="border px-2 py-1 border-dark_grey cursor-pointer"
                              key={currentDayKey} // Unique key for each column
                              onClick={() => {
                                toggleEditViewSummaryFunc();
                                const empDetails = {
                                  id: employee?.id,
                                  empName: employee?.name,
                                  sapNo: employee.sapNo,
                                  empBadgeNo: employee?.empBadgeNo,
                                  location: employee?.location,
                                  jobcode: employee.jobcode,
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
                                  mealAllow: employee?.mealAllow,
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
                          {`${employee?.empLeaveCount?.AL || 0} /
                               ${employee?.empLeaveCount?.CL || 0} `}
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
                          {employee?.mealAllow || ""}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {allFieldsYes ? "Yes" : ""}
                        </td>
                        {/* {employee} */}
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.timeKeeper}
                        </td>
                      </tr>
                      <tr>
                        {Array.from({ length: dayCounts }, (_, i) => {
                          const currentDay = new Date(getStartDate); // Assume getStartDate is a valid Date object
                          currentDay.setDate(getStartDate.getDate() + i); // Increment the date

                          // Format the key as "day-month-year"
                          const currentDayKey = `${currentDay.getDate()}-${
                            currentDay.getMonth() + 1
                          }-${currentDay.getFullYear()}`;

                          return (
                            <td
                              className="border px-2 py-1 border-dark_grey"
                              key={currentDayKey} // Unique key for each column
                            >
                              {employee?.OVERTIMEHRS?.[currentDayKey] || "0"}{" "}
                              {/* Use '0' if no value is found */}
                            </td>
                          );
                        })}
                        {/* ))} */}
                      </tr>
                      <tr>
                        <td className="border px-2 py-1" colSpan={1}>
                          {" "}
                        </td>
                        <td></td>

                        {Array.from({ length: dayCounts }, (_, i) => {
                          const currentDay = new Date(getStartDate);
                          currentDay.setDate(getStartDate.getDate() + i); // Increment the date

                          // Format the date as "day-month-year"
                          const formattedDate = `${currentDay.getDate()}-${
                            currentDay.getMonth() + 1
                          }-${currentDay.getFullYear()}`;

                          // Get verification status for the current date
                          const isVerified =
                            employee?.getVerify?.[formattedDate];

                          // Check if the day is a special day
                          const isSpecialDay = ["PH", "PHD", "OFF"].includes(
                            employee?.workingHrs?.[formattedDate]
                          );

                          // Determine checkbox checked status
                          const isChecked = Boolean(isVerified || isSpecialDay);
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

                          let bruneiTime;
                          if (updatedDateTime) {
                            bruneiTime = new Intl.DateTimeFormat(
                              "en-BN",
                              options
                            ).format(new Date(updatedDateTime));
                          }
                          // weekday: "long",

                          // Return the table cell
                          return (
                            <td
                              className="border px-2 py-2 border-dark_grey"
                              key={currentDay.toDateString()} // Unique key for each column
                            >
                              {isChecked && (
                                <>
                                  <input
                                    className="py-10"
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                      // Add logic for handling checkbox change
                                    }}
                                  />
                                  <br />
                                  <span>{bruneiTime || ""}</span>
                                </>
                              )}
                            </td>
                          );
                        })}
                        {/* ))} */}
                        <td className="border px-2 py-1">{""}</td>
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
                        <td className="border px-2 py-1"></td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1" colSpan={1}>
                          Total
                        </td>

                        {Array.from({ length: dayCounts + 1 }, (_, i) => {
                          const currentDayIndex = i + 1;

                          return (
                            <td
                              className={`${i === 0 ? "border" : "border-b"}`}
                              key={currentDayIndex} // Unique key for each column
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
                          {`${employee?.empLeaveCount?.AL || 0} /
                               ${employee?.empLeaveCount?.CL || 0}`}
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
                        <td className="border px-2 py-1"></td>
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
        <footer className="flex justify-center py-10 space-x-10">
          <div className="flex space-x-3  items-center rounded px-3 py-2 bg-[#FEF116]">
            <button
              className=" text_size_5 text-dark_grey"
              onClick={() => {
                DownloadExcelPDF(
                  "downloadTable",
                  // "Theader",
                  location,
                  formattedStartDate,
                  formattedEndDate
                );
              }}
            >
              Download
            </button>
            <IoMdDownload className="text-black cursor-pointer" />
          </div>
        </footer>
      </div>
    </div>
  );
};
