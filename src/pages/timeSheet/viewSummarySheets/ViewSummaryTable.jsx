import React from "react";

import { FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useTempID } from "../../../utils/TempIDContext";
import { ViewSummaryFilterData } from "./ViewSummaryFilterData";
import { downloadPDF } from "../../../utils/DownloadPDF";

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
  const { selectedLocation, getStartDate, startDate, endDate } = useTempID();

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
      console.log(err, " : ERROR");
    }
  }

  const handlePrint = () => {
    // Get the table by its ID
    const table = document.getElementById("downloadTable");

    if (!table) {
      console.error("Table with the given ID not found");
      return;
    }

    // Open a new window for printing
    const printWindow = window.open("", "", "height=600,width=800");

    // Write the HTML and CSS styles for the table and page
    printWindow.document.write("<html><head><title>Print Table</title>");
    printWindow.document.write("<style>");

    // Add custom styles for table borders and other formatting
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; margin: 20px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 8px; text-align: left; border: 1px solid black; }
      th { background-color: #f2f2f2; }
    `);

    printWindow.document.write("</style>");
    printWindow.document.write("</head><body>");

    // Append the table content into the new window's body
    printWindow.document.body.appendChild(table.cloneNode(true)); // Clone the table to avoid affecting the original

    printWindow.document.write("</body></html>");
    printWindow.document.close(); // Close the document to finish writing content

    // Trigger the print dialog
    printWindow.print();
  };

  return (
    <div className="bg-[#fafaf6] h-screen">
      <div className="screen-size p-4">
        <header className="my-5 flex justify-between">
          <div className="flex items-center ">
            <Link to="/timeSheet" className="text-xl flex-1 text-grey">
              <FaArrowLeft />
            </Link>
          </div>
          <header className="flex justify-center text_size_2 py-5 text-dark_grey ">
            <p>View Summary</p>
          </header>
          <div className="flex items-center">
            <button
              className="rounded text_size_5 text-dark_grey bg-primary  py-2  px-7"
              onClick={() => {
                handlePrint();
              }}
            >
              Print
            </button>
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
                  Project
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
                  // const normalWorkHours = Object.values(
                  //   employee.NORMALWORKHRSPERDAY || {}
                  // );
                  // const totalHours = normalWorkHours.reduce(
                  //   (acc, hour) => acc + parseInt(hour || 0, 10),
                  //   0
                  // );
                  // const NormalDays = normalWorkHours.length;

                  const totalOT = Object.values(
                    employee?.OVERTIMEHRS || {}
                  ).reduce((acc, ot) => acc + parseInt(ot || 0), 0);

                  const getTotalHours =
                    calculateTotalWorkingHours(employee?.workingHrs) || 0;
                  const roundedNumberOfTotalHours = Number(
                    getTotalHours.toFixed(2)
                  );
                  const totalHours = roundedNumberOfTotalHours;

                  const getNormalDays =
                    totalHours / parseFloat(employee?.workHrs) || 0;
                  const roundedNumber = Number(getNormalDays.toFixed(2));
                  const NormalDays = roundedNumber;

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
                            employee.workHrs && employee.workHrs.length > 0
                              ? employee.workHrs
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
                                  empName: employee?.name,
                                  sapNo: employee.sapNo,
                                  empBadgeNo: employee?.empBadgeNo,
                                  location: employee?.location,
                                  jobcode: employee.jobcode,
                                  workingHrs:
                                    employee?.workingHrs?.[currentDayKey],
                                  ot: employee?.OVERTIMEHRS?.[currentDayKey],
                                  workHrs:
                                    employee.workHrs &&
                                    employee.workHrs.length > 0
                                      ? employee.workHrs
                                      : "",
                                  workMonth:
                                    employee.workMonth &&
                                    employee.workMonth.length > 0
                                      ? employee.workMonth
                                      : "",

                                  workingHrsKey: currentDayKey,
                                };
                                console.log(empDetails);
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
                          {employee?.hollydayCounts?.A || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {employee?.empLeaveCount?.UAL || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          {totalOT || 0}
                        </td>
                        <td className="border px-2 py-1" rowSpan="2">
                          yes
                        </td>
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

                        {Array.from({ length: dayCounts + 1 }, (_, i) => {
                          const currentDayIndex = i + 1;

                          return (
                            <td
                              className={`${
                                i === 0 ? "border" : "border-b"
                              } text-center py-1`}
                              key={currentDayIndex} // Unique key for each column
                            >
                              <input
                                className={`${i === 0 && "hidden"} py-10`}
                                type="checkbox"
                                onChange={() => {}}
                              />
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
                          {`${employee.empLeaveCount.AL || 0} /
                               ${employee.empLeaveCount.CL || 0}`}
                        </td>
                        <td className="border px-2 py-1">
                          {employee.empLeaveCount?.SL || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee?.hollydayCounts?.OFF || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee?.hollydayCounts?.A || 0}
                        </td>
                        <td className="border px-2 py-1">
                          {employee?.empLeaveCount?.UAL || 0}
                        </td>
                        <td className="border px-2 py-1">{totalOT}</td>
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
          <button
            className=" rounded text_size_5 text-dark_grey bg-primary px-3 py-2 w-[180px]"
            onClick={() => {
              downloadPDF("downloadTable", "Theader");
            }}
          >
            Download
          </button>
        </footer>
      </div>
    </div>
  );
};
