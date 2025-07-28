import { useEffect, useState } from "react";

import { IoMdDownload } from "react-icons/io";
import { LeaveSummaryDownload } from "../../../utils/LeaveSummaryDownload";

export const EmpProDataLeaveCal = ({
  selectedDate,
  leaveTypes,
  leaveSummary,
}) => {
  const [leaveSummaryDetails, setLeaveSummaryDetails] = useState({});

  const { DownloadExcelPDF } = LeaveSummaryDownload();

  const formaatedDate = (date) => {
    let firstDate = new Date(date);
    firstDate.setHours(0, 0, 0, 0);

    let year = firstDate.getFullYear();
    let month = String(firstDate.getMonth() + 1).padStart(2, "0"); // months are 0-based
    let day = String(firstDate.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  const currentDate = new Date();
  const getCurrentYear = currentDate.getFullYear();
  const prevYear = currentDate.getFullYear() - 1;

  const rowSpanHeaders = [
    "Badge NO",
    // "Name",
    "Status",
    // "DOJ",
    `Leave Calculated \nFrom (DOJ or 01-01-${getCurrentYear})`,
    "Leave Entitled \nas of today",
    `No of Days \nWorked in ${getCurrentYear}`,
    `No of Days Worked \nin ${getCurrentYear} (- UAL)`,
    `Previous Year Annual \nLeave Balance ${prevYear}`,
    `Leave Entitled \nfor ${getCurrentYear}`,

    // "Leave Type",
    // "Leave Eligible \nfor this Year",
    "Monthly Leave Usage",
    // "Leave eligible \nfor this year",

    // "Total Days from DOJ",
    "Eligible for \nannual leave",
    // "Remarks",
  ];

  const getDaysFromTwoDates = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);

    // Calculate difference in milliseconds
    const diffTime = end - start;

    // Convert milliseconds to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return parseFloat(diffDays).toFixed(0);
  };

  useEffect(() => {
    const UpdateLeaveSummary = (leaveSummary) => {
      if (!leaveSummary) return;
      let UpdatedStatus = {};
      const ALandSL = {
        AL: leaveSummary?.annualLeaveEntitlement ?? "0",
        SL: leaveSummary?.sickLeaveEntitlement ?? "0",
      };
      if (leaveSummary?.workWeek === "5.5") {
        UpdatedStatus = {
          ...leaveSummary,
          status: {
            SAT: "0.5" ?? "0",
            ...ALandSL,
          },
        };
      } else if (leaveSummary?.workWeek === "6") {
        UpdatedStatus = {
          ...leaveSummary,
          status: {
            SAT: "1" ?? "0",
            ...ALandSL,
          },
        };
      } else {
        UpdatedStatus = {
          ...leaveSummary,
          status: {
            ...ALandSL,
          },
        };
      }

      return UpdatedStatus;
    };

    const updateStatusSection = UpdateLeaveSummary(leaveSummary);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let getCurrentYear = currentDate.getFullYear();

    const getALEffectiveDate = new Date(
      updateStatusSection?.empAnnualLeaveEffDate
    );
    const getALEffectiveDateYear = getALEffectiveDate?.getFullYear();

    let getFirstDateOfYear = `${getCurrentYear}-01-01`;
    let dojOrSpeDate = "";

    const isEmpFirstEffectiveDate =
      getALEffectiveDateYear === getCurrentYear &&
      currentDate >= getALEffectiveDate;

    if (isEmpFirstEffectiveDate) {
      dojOrSpeDate = updateStatusSection?.empAnnualLeaveEffDate;
    } else {
      dojOrSpeDate = getFirstDateOfYear;
    }

    let totalDays = getDaysFromTwoDates(
      dojOrSpeDate,

      currentDate.toLocaleDateString("en-CA")
    );
    let noOfDaysWorkedMinusUAL =
      parseFloat(totalDays) -
      parseFloat(updateStatusSection?.unPaidAuthorizeAnnual?.daysTaken);
    // parseFloat(updateStatusSection?.unPaidAuthorizeSick?.daysTaken);

    // const currentYearALBalance =
    //   parseFloat(updateStatusSection?.annualLeave?.totalLeave) -
    //   parseFloat(updateStatusSection?.annualLeaveBal);

    const currentYearALEntitle =
      parseFloat(updateStatusSection?.annualLeaveEntitlement) ?? 0;

    const calCurrentYearALEntitle = parseFloat(
      (currentYearALEntitle / 365) * noOfDaysWorkedMinusUAL
    ).toFixed(2);

    const currentYearALEntitleBal =
      calCurrentYearALEntitle > 0 ? calCurrentYearALEntitle : "0";

    let totalLeaveForAL = 0;

    if (isEmpFirstEffectiveDate) {
      totalLeaveForAL =
        parseFloat(updateStatusSection?.annualLeaveBal) +
        parseFloat(currentYearALEntitleBal) +
        parseFloat(updateStatusSection?.annualLeaveEntitlement);
    } else {
      totalLeaveForAL =
        parseFloat(updateStatusSection?.annualLeaveBal) +
        parseFloat(currentYearALEntitleBal);
    }

    let sumOfDTandWP =
      parseFloat(totalLeaveForAL) -
      (parseFloat(updateStatusSection?.annualLeave?.daysTaken) +
        parseFloat(updateStatusSection?.annualLeave?.waitingApproval));

    const finalData = {
      ...updateStatusSection,

      annualLeave: {
        ...updateStatusSection.annualLeave,
        totalLeave: totalLeaveForAL.toFixed(1),
        remainingLeave: sumOfDTandWP.toFixed(1),
      },

      dojOrSpecifiedDate: dojOrSpeDate,

      leaveEntitleToday: currentDate.toLocaleDateString("en-CA"),

      noOfDaysWorked: parseFloat(totalDays).toFixed(1),

      totalWorkedDays: getDaysFromTwoDates(
        updateStatusSection?.doj,
        currentDate.toLocaleDateString("en-CA")
      ),

      annualLeaveEntitleBal: currentYearALEntitleBal,

      noOfDaysWorkedUAL: noOfDaysWorkedMinusUAL.toFixed(1),

      leaveEligibleForThisYear:
        parseFloat(updateStatusSection?.annualLeave?.totalLeave) -
        parseFloat(updateStatusSection?.annualLeaveBal),

      isEligibleForAnnualLeave: sumOfDTandWP.toFixed(1) > 0 ? "Yes" : "No",
    };

    setLeaveSummaryDetails(finalData);
  }, [leaveSummary]);

  return (
    <main className="w-full">
      <div className="overflow-x-auto">
        <table
          className="table-auto border border-collapse w-[2000px] text-sm text-center"
          // className="table-fixed w-full border-collapse"
          id="downloadTable"
        >
          <thead className="bg-[#fde28bb6]">
            <tr className="">
              {rowSpanHeaders.map((text, idx) => {
                if (text === "Monthly Leave Usage") {
                  return (
                    <th key={`col-${idx}`} colSpan="5" className="border p-2">
                      {`Monthly Leave Usage (${selectedDate})`}
                    </th>
                  );
                } else {
                  return (
                    <th
                      key={idx}
                      rowSpan={2}
                      className="border p-2 whitespace-pre-wrap"
                    >
                      {text}
                    </th>
                  );
                }
              })}
            </tr>
            <tr>
              {[
                "Leave Type",
                "Total Leave",
                "Days Taken",
                "Waiting Approval",
                "Remaining Leave",
                //   "Remaining Leave",
              ].map((label, idx) => (
                <th key={idx} className="border p-2">
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text_size_8">
            {/* Employee Static Info - only rowSpan cells */}
            <tr className="bg-[#c7c4c413] ">
              <td className="border  align-top text-center py-2" rowSpan="14">
                {leaveSummaryDetails?.empBadgeNo || "N/A"}
              </td>
              {/* <td className="border  align-top text-center py-2" rowSpan="14">
                {leaveSummaryDetails?.employeeName || "N/A"}
              </td> */}
              <td className="border align-top text-center py-2" rowSpan="14">
                <div className="flex flex-col gap-5 pl-3 items-start text-[#5033f8]">
                  <span>MON - SAT</span>
                  {leaveSummaryDetails?.status?.SAT && (
                    <span className="text-start">
                      SAT :{`${leaveSummaryDetails?.status?.SAT} DAYS`}
                    </span>
                  )}

                  <span>
                    AL :{" "}
                    {`${
                      leaveSummaryDetails?.status?.AL === "N/A"
                        ? "0"
                        : leaveSummaryDetails?.status?.AL
                    } DAYS`}
                  </span>
                  <span>
                    SL :{" "}
                    {`${
                      leaveSummaryDetails?.status?.SL === "N/A"
                        ? "0"
                        : leaveSummaryDetails?.status?.SL
                    } DAYS`}
                  </span>
                </div>
              </td>
              {/* <td className="border  align-top text-center" rowSpan="14">
                {formaatedDate(leaveSummaryDetails?.doj) || "N/A"}
              </td> */}
              <td className="border  align-top text-center py-2" rowSpan="14">
                {formaatedDate(leaveSummaryDetails?.dojOrSpecifiedDate) ||
                  "N/A"}
              </td>
              <td className="border  align-top text-center py-2" rowSpan="14">
                {formaatedDate(leaveSummaryDetails?.leaveEntitleToday) || "N/A"}
              </td>
              <td className="border  align-top text-center py-2" rowSpan="14">
                {isNaN(leaveSummaryDetails.noOfDaysWorked)
                  ? "N/A"
                  : leaveSummaryDetails?.noOfDaysWorked}
              </td>
              <td className="border  align-top text-center py-2" rowSpan="14">
                {leaveSummaryDetails?.noOfDaysWorkedUAL || "N/A"}
              </td>
              <td className="border  align-top text-center py-2" rowSpan="14">
                {leaveSummaryDetails?.annualLeaveBal === 0
                  ? "0"
                  : leaveSummaryDetails?.annualLeaveBal || "N/A"}
              </td>
              <td className="border  align-top text-center py-2" rowSpan="14">
                {leaveSummaryDetails?.annualLeaveEntitleBal || "N/A"}
              </td>

              {/* Leave Type Placeholder */}

              <td className="p-0" id="leaveDetailSec" colSpan="5"></td>

              {/* <td className="border  align-top text-center py-2" rowSpan="14">
                {leaveSummaryDetails?.leaveEligibleForThisYear || "N/A"}
              </td> */}

              {/* <td className="border  align-top text-center" rowSpan="14">
                {leaveSummaryDetails?.totalWorkedDays || "N/A"}
              </td> */}
              <td className="border  align-top text-center py-2" rowSpan="14">
                {leaveSummaryDetails?.isEligibleForAnnualLeave || "N/A"}
              </td>
              {/* <td className="border p-2 align-top text-center" rowSpan="14">
                N/A
              </td> */}
            </tr>

            {/* Now: All leave types including "Annual Leave" start here */}

            {Object.keys(leaveTypes).map((key) => {
              // Skip Maternity Leave for MALE
              if (
                leaveSummaryDetails.gender === "MALE" &&
                key === "maternityLeave"
              ) {
                return null;
              }

              // Skip Paternity Leave for FEMALE
              if (
                leaveSummaryDetails.gender === "FEMALE" &&
                key === "paternityLeave"
              ) {
                return null;
              }
              // const label = leaveTypes?.[key].split(" ")[0];
              const label = leaveTypes?.[key];

              const data = leaveSummaryDetails?.[key] || {
                totalLeave: "0",
                daysTaken: "0",
                waitingApproval: "0",
                remainingLeave: "0",
              };
              let tableBorderCondition =
                label === "Annual Leave" ? "border-r" : "border";
              return (
                <tr key={key} className="bg-[#c7c4c413]">
                  <td
                    className={`${tableBorderCondition} px-4 text-start`}
                    id="LeaveNames"
                  >
                    {label}
                  </td>
                  {/* <td className={`${tableBorderCondition} p-2`}>{"20"}</td> */}
                  <td className={`${tableBorderCondition} p-2`}>
                    {data?.totalLeave || "0"}
                  </td>
                  <td className={`${tableBorderCondition} p-2`}>
                    {data?.daysTaken || "0"}
                  </td>
                  <td className={`${tableBorderCondition} p-2`}>
                    {data?.waitingApproval || "0"}
                  </td>
                  <td className={`${tableBorderCondition} p-2`}>
                    {data?.remainingLeave || "0"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="py-8 center">
        <button
          className="px-3 py-2 flex center gap-3 bg-primary text_size_5 text-dark_grey rounded"
          onClick={() => {
            DownloadExcelPDF("downloadTable", selectedDate, leaveSummary);
          }}
        >
          <i>
            <IoMdDownload />
          </i>
          <span>Download</span>
        </button>
      </div>
    </main>
  );
};
