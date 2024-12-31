import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import logo from "../../assets/logo/logo-with-name.svg";
import { useReactToPrint } from "react-to-print";


export const LeaveSummaryPopUp = ({
  handleClosePopup,
  mergedData,
  empDetails,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveSummary, setLeaveSummary] = useState({});

  const LeaveDoc = useRef();

  const handleDate = (event, type) => {
    const selectedDate = event.target.value;

    if (type === "startDate") {
      setStartDate(selectedDate);
    } else if (type === "endDate") {
      setEndDate(selectedDate);
    }
  };

  const formattingDate = (date) => {
    const [year, month, day] = date?.split("-");
    const dats = `${day}/${month}/${year}`;
    // console.log(dats);

    return `${day}/${month}/${year}`;
  };
  const initializeLeaveType = (total = 0, isSpecialLeave = false) => ({
    total: isSpecialLeave ? null : total,
    taken: 0,
    waitingLeave: 0,
    remaining: isSpecialLeave ? null : total,
  });

  const isCurrentYear = (dateStr) => {
    const currentYear = new Date().getFullYear();
    const dateYear = new Date(dateStr).getFullYear();
    return currentYear === dateYear;
  };

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  };
// console.log(mergedData);
const formatToTwoDecimals = (num) => parseFloat(num.toFixed(1));

useEffect(() => {
  const fetchedData = async () => {
    const result = mergedData.reduce((acc, val) => {
      if (!acc[val.empID]) {
        acc[val.empID] = {
          empId: val.empID,
          employeeName: val.empName,
          empBadgeNo: val.empBadgeNo,
          position: val.position,
          department: val.department,
          doj: val.doj,
          annualLeaveBal: val.empPervAnnualLeaveBal,
          compassionateLeave: initializeLeaveType(0, true),
          unPaidAuthorisedLeave: initializeLeaveType(0, true),
          annualLeave: initializeLeaveType(
            formatToTwoDecimals(
              Number(
                Array.isArray(val.annualLeave) && val.annualLeave.length > 0
                  ? val.annualLeave[val.annualLeave.length - 1]
                  : 0
              ) + Number(val.empPervAnnualLeaveBal || 0)
            )
          ),
          marriageLeave: initializeLeaveType(Number(val.marriageLeave) || 0),
          hospitalisationLeave: initializeLeaveType(Number(val.hospitalLeave)),
          maternityLeave: initializeLeaveType(Number(val.maternityLeave)),
          sickLeave: initializeLeaveType(Number(val.sickLeave)),
          paternityLeave: initializeLeaveType(Number(val.paternityLeave) || 0),
          compensateLeave: initializeLeaveType(0, true),
        };
      }

      const leaveTypeKeyMap = {
        "Compassionate Leave": "compassionateLeave",
        "Annual Leave": "annualLeave",
        "Marriage Leave": "marriageLeave",
        "Hospitalisation Leave": "hospitalisationLeave",
        "Maternity Leave": "maternityLeave",
        "Sick Leave": "sickLeave",
        "Paternity Leave": "paternityLeave",
        "Unpaid Authorize Leave": "unPaidAuthorisedLeave",
        "Compensate Leave": "compensateLeave",
      };

      const leaveKey = leaveTypeKeyMap[val.empLeaveType];

      const applicationStartDate = formattingDate(val.empLeaveStartDate);
      const applicationEndDate = formattingDate(val.empLeaveEndDate);

      let shouldProcessLeave = false;

      if (startDate && endDate) {
        // Date filter applied
        const filterStartDate = parseDate(formattingDate(startDate));
        const filterEndDate = parseDate(formattingDate(endDate));

        const appStartDate = parseDate(applicationStartDate);
        const appEndDate = parseDate(applicationEndDate);

        shouldProcessLeave =
          appStartDate >= filterStartDate && appEndDate <= filterEndDate;
      } else {
        // Default to current year
        shouldProcessLeave = isCurrentYear(val.empLeaveStartDate);
      }

      if (shouldProcessLeave && leaveKey) {
        if (
          val.managerStatus === "Approved" &&
          val.empStatus !== "Cancelled"
        ) {
          acc[val.empID][leaveKey].taken += Number(val.leaveDays) || 0;
        } else if (
          val.managerStatus === "Pending" &&
          val.supervisorStatus !== "Rejected" &&
          val.empStatus !== "Cancelled"
        ) {
          acc[val.empID][leaveKey].waitingLeave += Number(val.leaveDays) || 0;
        }

        if (
          ![
            "compassionateLeave",
            "unPaidAuthorisedLeave",
            "compensateLeave",
          ].includes(leaveKey)
        ) {
          const total = acc[val.empID][leaveKey].total || 0;
          const taken = acc[val.empID][leaveKey].taken || 0;
          const waiting = acc[val.empID][leaveKey].waitingLeave || 0;

          acc[val.empID][leaveKey].remaining = Math.floor(
            total - (taken + waiting)
          );
        }
      }

      return acc;
    }, {});

    const summary = result[empDetails.empID]; // Find the leave summary for the employee
    setLeaveSummary(summary); // Set the leave summary for the employee
  };

  fetchedData();
}, [mergedData, startDate, endDate, empDetails]);

  // Define leave types to display in the specified order
  const leaveTypes = [
    "annualLeave",
    "sickLeave",
    "hospitalisationLeave",
    "maternityLeave",
    "paternityLeave",
    "compensateLeave",
    "compassionateLeave",
    "marriageLeave",
    "unPaidAuthorisedLeave",
  ];

  // Format leave type name
  const formatLeaveType = (type) => {
    return type
      .replace(/Leave/g, "")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const handlePrint = useReactToPrint({
    content: () => LeaveDoc.current,
    onBeforePrint: () => console.log("Preparing print..."),
    onAfterPrint: () => console.log("Print complete"),
    pageStyle: "print", // This ensures the print view uses a different CSS style
  });

  const getDisplayDateRange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      const end = new Date(endDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      return `${start} - ${end}`;
    }
    const now = new Date();
    const month = now.toLocaleDateString("en-US", { month: "long" });
    const year = now.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <section className="fixed top-0 left-0 bg-grey z-50 w-full h-full flex flex-col items-center justify-center">
      <div className="bg-white w-[70%] flex flex-col overflow-y-auto">
        {/* Header Section */}
        <div className="py-10 px-10 flex justify-between items-center  gap-5 w-full">
          <section className="flex items-center gap-5 w-full ">
            <div>
              <label
                htmlFor="start-date"
                className="block text-[16px] font-medium"
              >
                Start Date
              </label>
              <div className="text_size_5 bg-white border py-2 rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => handleDate(e, "startDate")}
                  className="outline-none text-grey"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="end-date"
                className="block text-[16px] font-medium"
              >
                End Date
              </label>
              <div className="text_size_5 bg-white border py-2 rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => handleDate(e, "endDate")}
                  className="outline-none text-grey"
                />
              </div>
            </div>
          </section>
          <div>
            <button
              className="text-4xl cursor-pointer text-grey"
              onClick={handleClosePopup}
              aria-label="Close Popup"
            >
              <IoIosCloseCircleOutline />
            </button>
          </div>
        </div>

        {/* Leave Summary Content */}
        <div
          ref={LeaveDoc}
          id="leaveSummary"
          className="bg-white px-10 rounded-lg"
        >
          {/* Header Section */}
          <div className="flex flex-col justify-between items-center mb-2">
            <article className="flex items-center justify-between w-full">
              {/* Logo */}
              <div className="flex-1 center">
                <img
                  className="max-w-[240px] w-full"
                  src={logo}
                  alt="Company logo"
                />
              </div>
            </article>
            <p className="text-center text-dark_grey text-lg font-semibold pt-3">
              {getDisplayDateRange()}
            </p>

            {/* Employee Name */}
            <h2 className="uppercase text-xl text-center w-full font-medium mt-2">
              Leave Summary for{" "}
              <span className="font-semibold italic">
                {leaveSummary?.employeeName || "N/A"}
              </span>
            </h2>
          </div>

          {/* Employee Details */}
          <div className="mb-5">
            <article className="mb-3">
              <h3>
                <span className="font-medium">Employee ID:</span>{" "}
                {leaveSummary?.empId || "N/A"}
              </h3>
              <h3>
                <span className="font-medium">Badge No:</span>{" "}
                {leaveSummary?.empBadgeNo || "N/A"}
              </h3>
              <h4>
                <span className="font-medium">Date of Join:</span>{" "}
                {leaveSummary?.doj ? formattingDate(leaveSummary.doj) : "N/A"}
              </h4>
              <h4>
                <span className="font-medium">Position:</span>{" "}
                {leaveSummary?.position || "N/A"}
              </h4>
              <h4>
                <span className="font-medium">Department:</span>{" "}
                {leaveSummary?.department || "N/A"}
              </h4>
            </article>

            {/* Leave Summary Table */}
            <table className="min-w-full bg-white text-sm font-semibold border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-sm">Leave Type</th>
                  <th className="border px-4 py-2 text-sm">Total Leave</th>
                  <th className="border px-4 py-2 text-sm">Days Taken</th>
                  <th className="border px-4 py-2 text-sm">Waiting Approval</th>
                  <th className="border px-4 py-2 text-sm">Remaining Leave</th>
                </tr>
              </thead>
              <tbody>
                {leaveTypes.map((leaveType) => {
                  const details = leaveSummary?.[leaveType] || {};
                  const isSpecialLeave = [
                    "compassionateLeave",
                    "unPaidAuthorisedLeave",
                    "compensateLeave",
                  ].includes(leaveType);
                  return (
                    <tr key={leaveType}>
                      <td className="border px-4 py-2">
                        {formatLeaveType(leaveType)}
                      </td>
                      <td className="border px-4 text-center py-2">
                        {isSpecialLeave ? "-" : details.total || 0}
                      </td>
                      <td className="border px-4 text-center py-2">
                        {details.taken || 0}
                      </td>
                      <td className="border px-4 text-center py-2">
                        {details.waitingLeave || 0}
                      </td>
                      <td className="border px-4 text-center py-2">
                        {isSpecialLeave
                          ? "-"
                          : details.remaining !== undefined &&
                            details.remaining >= 0
                          ? details.remaining
                          : 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <p className="font-normal py-5">
              Previous Year Annual Leave Balance: {leaveSummary?.annualLeaveBal}
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-center gap-40 py-5">
          <button
            className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
    </section>
  );
};
