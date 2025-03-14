import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import logo from "../../assets/logo/logo-with-name.svg";
import { useReactToPrint } from "react-to-print";
import {
  capitalizedLetter,
  DateFormat,
  DateNewFormat,
  FTDateFormat,
} from "../../utils/DateFormat";

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

  const initializeLeaveType = (total = 0, isSpecialLeave = false) => ({
    total: isSpecialLeave ? null : total,
    taken: 0,
    waitingLeave: 0,
    remaining: isSpecialLeave ? null : total,
  });

  const isCurrentYear = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") {
      return false;
    }
    const [datePart] = dateStr.split(" ");

    // Convert datePart to ISO format if needed
    const formattedDateStr = datePart
      .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
      .replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");
    const currentYear = new Date().getFullYear();
    const parsedDate = new Date(formattedDateStr);
    if (isNaN(parsedDate)) {
      return false;
    }
    const dateYear = parsedDate.getFullYear();
    return currentYear === dateYear;
  };

  // console.log(mergedData);
  const formatToTwoDecimals = (num) => parseFloat(num.toFixed(2));
 const dateNewFormate = (date) => {
    if (!date) return "";

    let dateStr = date.toString().trim();
    let day, month, year;

    if (dateStr.includes("T")) {
      // Convert to local time instead of UTC
      const localDate = new Date(dateStr);
      year = localDate.getFullYear();
      month = (localDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
      day = localDate.getDate().toString().padStart(2, "0");
    } else if (dateStr.includes("/")) {
      // Handle DD/MM/YYYY format
      [day, month, year] = dateStr.split("/");
    } else if (dateStr.includes("-")) {
      // Handle YYYY-MM-DD format
      [year, month, day] = dateStr.split("-");
    } else {
      return "";
    }

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchedData = async () => {
      const result = mergedData.reduce((acc, val) => {
        if (!acc[val.empID]) {
          // console.log(val.empSickLeaveDate,val.empID,"jii");
          acc[val.empID] = {
            gender: val.gender,
            empId: val.empID,
            employeeName: val.empName,
            empBadgeNo: val.empBadgeNo,
            position: val.position,
            department: val.department,
            doj: val.doj,
            annualLeaveBal: val.empPervAnnualLeaveBal,
            empsickLeaveTaken: val.empsickLeaveTaken,
            effectiveDate: val.empSickLeaveDate,
            compassionateLeave: initializeLeaveType(0, true),
            unPaidAuthorisedLeave: initializeLeaveType(0, true),
            unPaidAuthorizeSick: initializeLeaveType(0, true),
            unPaidAuthorizeAnnual: initializeLeaveType(0, true),
            annualLeave: initializeLeaveType(
              formatToTwoDecimals(
                Number(
                  Array.isArray(val.annualLeave) && val.annualLeave.length > 0
                    ? val.annualLeave[val.annualLeave.length - 1]
                    : typeof val.annualLeave === "string"
                    ? parseFloat(val.annualLeave)
                    : 0
                ) + Number(val.empPervAnnualLeaveBal || 0)
              )
            ),

            marriageLeave: initializeLeaveType(Number(val.marriageLeave) || 0),
            hospitalisationLeave: initializeLeaveType(
              Number(val.hospitalLeave) || 0
            ),
            maternityLeave: initializeLeaveType(
              Number(val.maternityLeave) || 0
            ),
            sickLeave: initializeLeaveType(Number(val.sickLeave) || 0),
            paternityLeave: initializeLeaveType(
              Number(val.paternityLeave) || 0
            ),
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
          "Unpaid Authorize - Sick": "unPaidAuthorizeSick",
          "Unpaid Authorize - Annual": "unPaidAuthorizeAnnual",
        };
        const leaveKey = leaveTypeKeyMap[val.empLeaveType];
        const applicationStartDate = val.empLeaveSelectedFrom
          ? new Date(dateNewFormate(val.empLeaveSelectedFrom))
          : new Date(dateNewFormate(val.empLeaveStartDate));

        const applicationEndDate = val.empLeaveSelectedTo
          ? new Date(dateNewFormate(val.empLeaveSelectedTo))
          : new Date(dateNewFormate(val.empLeaveEndDate));

        const filterStartDate = new Date(startDate);
        const filterEndDate = new Date(endDate);

        let shouldProcessOtherLeave = false;
        if (startDate && endDate) {
   

          if (
            applicationStartDate >= filterStartDate &&
            applicationStartDate <= filterEndDate
          ) {
            shouldProcessOtherLeave = true;
            // console.log("First Condition");
          }

          if (
            applicationEndDate >= filterStartDate &&
            applicationEndDate <= filterEndDate
          ) {
            shouldProcessOtherLeave = true;
            // console.log("second Condition");
          }

          if (
            applicationStartDate <= filterStartDate &&
            applicationEndDate >= filterEndDate
          ) {
            shouldProcessOtherLeave = true;
            // console.log("Third Condition");
          }
          if (leaveKey !== "sickLeave") {
            shouldProcessOtherLeave =
              shouldProcessOtherLeave &&
              isCurrentYear(dateNewFormate(val.empLeaveSelectedFrom));
          }
        } else {
          if (leaveKey !== "sickLeave") {
        
            shouldProcessOtherLeave = isCurrentYear(
              dateNewFormate(val.empLeaveSelectedFrom)
            );
 
          }
        }

        let shouldProcessLeave = false;

        if (leaveKey === "sickLeave") {
          let currentDate = new Date();
          let startEffectiveDate = new Date(
            dateNewFormate(val.empSickLeaveDate)
          );
          let endEffectiveDate = new Date(startEffectiveDate);
          endEffectiveDate.setFullYear(endEffectiveDate.getFullYear() + 1);
          endEffectiveDate.setDate(endEffectiveDate.getDate() - 1);

          const leaveStartDate = val.empLeaveSelectedFrom
            ? new Date(dateNewFormate(val.empLeaveSelectedFrom))
            : new Date(dateNewFormate(val.empLeaveStartDate));

          const leaveEndDate = val.empLeaveSelectedTo
            ? new Date(dateNewFormate(val.empLeaveSelectedTo))
            : new Date(dateNewFormate(val.empLeaveEndDate));

          // Initialize sick leave record if not exists
          if (!acc[val.empID][leaveKey]) {
            acc[val.empID][leaveKey] = {
              total: Number(val.sickLeave) || 0,
              taken: 0,
              waitingLeave: 0,
              remaining: Number(val.sickLeave) || 0,
            };
          }

          if (startDate && endDate) {

            const filterStartDate = new Date(startDate);
            const filterEndDate = new Date(endDate);

            // Find the relevant period based on filter dates
            let relevantStartDate = new Date(startEffectiveDate);
            let relevantEndDate = new Date(endEffectiveDate);

            if (filterStartDate < startEffectiveDate) {
              relevantStartDate.setFullYear(
                relevantStartDate.getFullYear() - 1
              );
              relevantEndDate.setFullYear(relevantEndDate.getFullYear() - 1);
            }
            if (filterStartDate > endEffectiveDate) {
              relevantStartDate.setFullYear(
                relevantStartDate.getFullYear() + 1
              );
              relevantEndDate.setFullYear(relevantEndDate.getFullYear() + 1);
            }
 
            if (
              ((leaveStartDate >= filterStartDate &&
                leaveStartDate <= filterEndDate) ||
                (leaveEndDate >= filterStartDate &&
                  leaveEndDate <= filterEndDate) ||
                (leaveStartDate <= filterStartDate &&
                  leaveEndDate >= filterEndDate)) &&
              ((leaveStartDate >= relevantStartDate &&
                leaveStartDate <= relevantEndDate) ||
                (leaveEndDate >= relevantStartDate &&
                  leaveEndDate <= relevantEndDate))
           
            ) {
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
                acc[val.empID][leaveKey].waitingLeave +=
                  Number(val.leaveDays) || 0;
              }

              // Calculate remaining leave
              const total = acc[val.empID][leaveKey].total || 0;
              const taken = acc[val.empID][leaveKey].taken || 0;
              const waiting = acc[val.empID][leaveKey].waitingLeave || 0;
              const remaining = formatToTwoDecimals(total - (taken + waiting));
              acc[val.empID][leaveKey].remaining =
                remaining < 5 ? remaining : remaining;
            }
          } else {
            // Default behavior: show current effective period data
            let startED = new Date(dateNewFormate(val.empSickLeaveDate));
            let endED = new Date(startED);
            endED.setFullYear(endED.getFullYear() + 1);
            endED.setDate(endED.getDate() - 1);
            while (endED < currentDate) {
              startED.setFullYear(startED.getFullYear() + 1);
              endED.setFullYear(endED.getFullYear() + 1);
            }
         
            if (
              currentDate >= startED &&
              leaveStartDate >= startED &&
              leaveEndDate <= endED &&
              currentDate <= endED
            ) {


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
                acc[val.empID][leaveKey].waitingLeave +=
                  Number(val.leaveDays) || 0;
              }

              // Calculate remaining leave
              const total = acc[val.empID][leaveKey].total || 0;
              const taken = acc[val.empID][leaveKey].taken || 0;
              const waiting = acc[val.empID][leaveKey].waitingLeave || 0;
              const remaining = formatToTwoDecimals(total - (taken + waiting));
              acc[val.empID][leaveKey].remaining =
                remaining < 5 ? remaining : remaining;
            }
          }
        } else {
          // For non-sick leave types, use the original shouldProcessOtherLeave logic
          shouldProcessLeave = shouldProcessOtherLeave;
        }
      

        if (leaveKey && shouldProcessLeave) {
          if (!acc[val.empID][leaveKey]) {
            acc[val.empID][leaveKey] = {
              total: 0,
              taken: 0,
              waitingLeave: 0,
              remaining: 0,
            };
          }
          if (
            val.managerStatus === "Approved" &&
            val.empStatus !== "Cancelled"
          ) {
            acc[val.empID][leaveKey].taken += Number(val.leaveDays) || 0;
            // console.log(acc[val.empID][leaveKey].taken);
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
              "unPaidAuthorizeSick",
              "unPaidAuthorizeAnnual",
            ].includes(leaveKey)
          ) {
            const total = acc[val.empID][leaveKey].total || 0;
            const taken = acc[val.empID][leaveKey].taken || 0;
            const waiting = acc[val.empID][leaveKey].waitingLeave || 0;

            const remaining = formatToTwoDecimals(total - (taken + waiting));
            acc[val.empID][leaveKey].remaining =
              remaining < 5 ? remaining : remaining;
          }
        }

        return acc;
      }, {});

      const summary = result[empDetails.empID];
      // console.log("summary : ", summary);
      setLeaveSummary(summary);
    };

    fetchedData();
  }, [mergedData, startDate, endDate, empDetails]);

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
    "unPaidAuthorizeSick",
    "unPaidAuthorizeAnnual",
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
    pageStyle: "print",
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
                {leaveSummary?.doj ? DateFormat(leaveSummary.doj) : "N/A"}
              </h4>
              <h4>
                <span className="font-medium">Position:</span>{" "}
                {leaveSummary?.position && leaveSummary.position.length > 0
                  ? capitalizedLetter(
                      leaveSummary?.position[leaveSummary?.position.length - 1]
                    )
                  : "N/A"}
              </h4>
              <h4>
                <span className="font-medium">Department:</span>{" "}
                {leaveSummary?.department && leaveSummary.department.length > 0
                  ? capitalizedLetter(
                      leaveSummary.department[
                        leaveSummary.department.length - 1
                      ]
                    )
                  : "N/A"}
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
                    "unPaidAuthorizeSick",
                    "unPaidAuthorizeAnnual",
                  ].includes(leaveType);

                  if (
                    (leaveType === "maternityLeave" &&
                      leaveSummary?.gender !== "Female") ||
                    (leaveType === "paternityLeave" &&
                      leaveSummary?.gender !== "Male")
                  ) {
                    return null;
                  }

                  // console.log(`Rendering row for ${leaveType} for ${leaveSummary?.gender}`);
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
              Previous Year Annual Leave Balance {new Date().getFullYear() - 1}{" "}
              : {leaveSummary?.annualLeaveBal}
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
