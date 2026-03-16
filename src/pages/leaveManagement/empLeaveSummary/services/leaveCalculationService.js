// src/pages/leaveManagement/empLeaveSummary/services/leaveCalculationService.js
const startDate = "";
const endDate = "";
export const filterLeaveSummaryByHeader = (item, leaveSummaryHeader) => {
  let takenLeaves =
    item?.managerStatus === "Approved" && item?.empStatus !== "Cancelled";

  // let takenLeaves = condition1 || condition2;

  let waitingForApproval =
    item?.managerStatus === "Pending" &&
    item?.supervisorStatus !== "Rejected" &&
    item?.empStatus !== "Cancelled";

  let selectedCondition =
    leaveSummaryHeader === "daysTaken"
      ? takenLeaves
      : leaveSummaryHeader === "waitingApproval"
      ? waitingForApproval
      : null;

  return selectedCondition;
};

export const formattedDate = (selectedDate) => {
  if (!selectedDate) return;

  const dateStr =
    typeof selectedDate === "string" ? selectedDate : selectedDate.toString();

  let leaveDateObj = null;

  if (dateStr?.includes("/")) {
    // Format: DD/MM/YYYY
    const [day, month, year] = dateStr?.split("/").map(Number);
    leaveDateObj = new Date(year, month - 1, day);
  } else if (dateStr?.includes("-")) {
    // Format: YYYY-MM-DD (safe to pass directly to Date)
    leaveDateObj = new Date(dateStr);
  }
  leaveDateObj?.setHours(0, 0, 0, 0);
  return leaveDateObj;
};

export const handleAnnualLeaveConditions = (
  item,
  currentYear,
  effectiveDate,
  leaveTypeName,
  leaveSummaryHeader,
  startDate,
  endDate,
  empDetails
) => {
  try {
    const effectiveYear = new Date(effectiveDate).getFullYear();
    let rangeStart, rangeEnd;
    if (currentYear === effectiveYear) {
      // Filter between effectiveDate and 31/12/currentYear
      rangeStart = new Date(effectiveDate);
      rangeEnd = new Date(`${currentYear}-12-31`);
    } else if (currentYear > effectiveYear) {
      // Filter between 01/01/currentYear and 31/12/currentYear
      rangeStart = new Date(`${currentYear}-01-01`);
      rangeEnd = new Date(`${currentYear}-12-31`);
    }

    const selectedCondition = filterLeaveSummaryByHeader(
      item,
      leaveSummaryHeader
    );

    let leaveDateObj = null;
    if (item?.empLeaveSelectedFrom) {
      leaveDateObj = formattedDate(item?.empLeaveSelectedFrom);
    } else if (item?.empLeaveStartDate) {
      leaveDateObj = new Date(item?.empLeaveStartDate);
    }

    if (
      startDate &&
      endDate &&
      item?.empLeaveType === leaveTypeName &&
      item?.empBadgeNo === empDetails?.empBadgeNo &&
      selectedCondition
    ) {
      return item;
    } else if (
      leaveDateObj >= rangeStart &&
      leaveDateObj <= rangeEnd &&
      item?.empLeaveType === leaveTypeName &&
      item?.empBadgeNo === empDetails?.empBadgeNo &&
      selectedCondition
    ) {
      return item;
    }
  } catch (err) {
    console.log("ERROR : ", err);
  }
};

const handleAllCLLeaveConditions = (
  item,
  currentDate,
  leaveTypeName,
  leaveSummaryHeader,
  startDate,
  endDate,
  leaveData
) => {
  let currentYear = currentDate.getFullYear();
  let rangeStart = new Date(`${currentYear}-01-01`);
  let rangeEnd = new Date(`${currentYear}-12-31`);

  const selectedCondition = filterLeaveSummaryByHeader(
    item,
    leaveSummaryHeader
  );

  let leaveDateObj = null;
  if (item.empLeaveSelectedFrom) {
    leaveDateObj = formattedDate(item.empLeaveSelectedFrom);
  } else if (item?.empLeaveStartDate) {
    leaveDateObj = new Date(item.empLeaveStartDate);
  }
  let correctedLeaveType =
    leaveTypeName === "Unpaid Authorize Annual"
      ? "Unpaid Authorize - Annual"
      : leaveTypeName === "Unpaid Authorize Sick"
      ? "Unpaid Authorize - Sick"
      : leaveTypeName;

  if (
    startDate &&
    endDate &&
    item?.empLeaveType === correctedLeaveType &&
    item?.empBadgeNo === leaveData?.empBadgeNo &&
    selectedCondition
  ) {
    return item;
  } else if (
    leaveDateObj >= rangeStart &&
    leaveDateObj <= rangeEnd &&
    item?.empLeaveType === correctedLeaveType &&
    item?.empBadgeNo === leaveData?.empBadgeNo &&
    selectedCondition
  ) {
    return item;
  }
};

export const UpdateLeaveSummary = async (
  baseLeave,
  getDaysTakenList,
  getWaitingForApprovalList
) => {
  const baseTaken = Number(baseLeave?.daysTaken || 0);
  const baseWaiting = Number(baseLeave?.waitingApproval || 0);
  const totalLeave = Number(baseLeave?.totalLeave || 0);

  const leaveTaken = baseTaken + Number(getDaysTakenList?.leaveTakenCount || 0);

  const waitingForApproval =
    baseWaiting + Number(getWaitingForApprovalList?.leaveTakenCount || 0);

  const remainingLeave = Math.max(
    totalLeave - (leaveTaken + waitingForApproval),
    0
  );

  return { leaveTaken, waitingForApproval, remainingLeave };
};

export const getCurrentYearLeaves = async (
  getUpdatedLeaveData,
  getMatchedEmpLeaves,
  startDate,
  endDate
) => {
  const currentYear = new Date().getFullYear();

  const results = await Promise.all(
    Object.values(getMatchedEmpLeaves).map(async (empLeaveObj) => {
      /** ------------------ ANNUAL LEAVE ------------------ **/
      if (empLeaveObj?.annualLeave) {
        let totalDaysTaken = 0;
        let totalWaitingApproval = 0;

        getUpdatedLeaveData?.forEach((leaveData) => {
          // filter by employee
          if (leaveData?.empBadgeNo !== empLeaveObj?.empBadgeNo) return;

          const latestAnnualLeaveEffDate = Array.isArray(
            leaveData?.empAnnualLeaveDate
          )
            ? leaveData.empAnnualLeaveDate.at(-1)
            : null;

          if (!latestAnnualLeaveEffDate) return;

          const daysTakenRes = handleAnnualLeaveConditions(
            leaveData,
            currentYear,
            latestAnnualLeaveEffDate,
            "Annual Leave",
            "daysTaken",
            startDate,
            endDate,
            leaveData
          );

          const waitingRes = handleAnnualLeaveConditions(
            leaveData,
            currentYear,
            latestAnnualLeaveEffDate,
            "Annual Leave",
            "waitingApproval",
            startDate,
            endDate,
            leaveData
          );

          totalDaysTaken += Number(daysTakenRes?.leaveTakenCount || 0);
          totalWaitingApproval += Number(waitingRes?.leaveTakenCount || 0);
        });

        const { leaveTaken, waitingForApproval, remainingLeave } =
          await UpdateLeaveSummary(
            {
              ...empLeaveObj.annualLeave,
              totalLeave: Number(empLeaveObj.annualLeave?.totalLeave || 0),
            },
            { leaveTakenCount: totalDaysTaken },
            { leaveTakenCount: totalWaitingApproval }
          );

        empLeaveObj.annualLeave = {
          ...empLeaveObj.annualLeave,
          daysTaken: leaveTaken,
          waitingApproval: waitingForApproval,
          remainingLeave,
        };
      }

      /** ------------------ UNPAID AUTHORIZE ANNUAL ------------------ **/
      if (empLeaveObj?.unPaidAuthorizeAnnual) {
        let leaveTaken = Number(
          empLeaveObj.unPaidAuthorizeAnnual?.daysTaken || 0
        );
        let waitingForApproval = Number(
          empLeaveObj.unPaidAuthorizeAnnual?.waitingApproval || 0
        );

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        getUpdatedLeaveData?.forEach((leaveData) => {
          if (leaveData?.empBadgeNo !== empLeaveObj?.empBadgeNo) return;

          const daysTakenRes = handleAllCLLeaveConditions(
            leaveData,
            currentDate,
            "Unpaid Authorize Annual",
            "daysTaken",
            startDate,
            endDate,
            leaveData
          );

          const waitingRes = handleAllCLLeaveConditions(
            leaveData,
            currentDate,
            "Unpaid Authorize Annual",
            "waitingApproval",
            startDate,
            endDate,
            leaveData
          );

          leaveTaken += Number(daysTakenRes?.leaveTakenCount || 0);
          waitingForApproval += Number(waitingRes?.leaveTakenCount || 0);
        });

        empLeaveObj.unPaidAuthorizeAnnual = {
          ...empLeaveObj.unPaidAuthorizeAnnual,
          totalLeave: "-",
          daysTaken: leaveTaken,
          waitingApproval: waitingForApproval,
          remainingLeave: "-",
        };
      }

      return empLeaveObj;
    })
  );

  return results;
};

export const handleInitialLeaveDetails = async (
  finalLeaveData,
  primaryData,
  formatToTwoDecimals,
  initializeLeaveType
) => {
  try {
    const initialLeaveDetails =
      Array.isArray(primaryData) && primaryData.length > 0
        ? primaryData?.reduce((acc, val) => {
            if (val && val?.empID && !acc[val?.empID]) {
              let addTotalAnnualLeaveBalance =
                Number(
                  Array.isArray(val?.annualLeave) &&
                    val?.annualLeave?.length > 0
                    ? val.annualLeave[val.annualLeave.length - 1]
                    : typeof val.annualLeave === "string"
                    ? parseFloat(val.annualLeave)
                    : 0
                ) + Number(val.empPervAnnualLeaveBal || 0);
              let totalAnnualLeaveBalance = formatToTwoDecimals(
                addTotalAnnualLeaveBalance
              );

              acc[val.empID] = {
                gender: val.gender,
                empId: val.empID,
                employeeName: val.empName,
                empBadgeNo: val.empBadgeNo,
                position: val.position,
                department: val.department,
                doj: val.doj,
                annualLeaveEntitlement: Array.isArray(val.annualLeave)
                  ? val.annualLeave[val.annualLeave.length - 1]
                  : "0",
                sickLeaveEntitlement: val.sickLeave || 0,
                empAnnualLeaveEffDate: Array.isArray(val.empAnnualLeaveDate)
                  ? val.empAnnualLeaveDate[val.empAnnualLeaveDate.length - 1]
                  : null,
                empSickLeaveEffDate: val.empSickLeaveDate,
                annualLeaveBal: val.empPervAnnualLeaveBal,
                // empsickLeaveTaken: val.empsickLeaveTaken,
                // effectiveDate: val.empSickLeaveDate,
                compassionateLeave: initializeLeaveType(0, true),
                //   unPaidAuthorisedLeave: initializeLeaveType(0, true),
                unPaidAuthorizeSick: initializeLeaveType(0, true),
                unPaidAuthorizeAnnual: initializeLeaveType(0, true),
                annualLeave: initializeLeaveType(totalAnnualLeaveBalance),

                marriageLeave: initializeLeaveType(
                  Number(val.marriageLeave) || 0
                ),
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
                compensateLeave: initializeLeaveType(0, true) || 0,
                workHrs: Array.isArray(val.workHrs)
                  ? val.workHrs[val.workHrs.length - 1]
                  : "0",

                workMonth: Array.isArray(val.workMonth)
                  ? val.workMonth[val.workMonth.length - 1]
                  : "0",

                workWeek: Array.isArray(val.workWeek)
                  ? val.workWeek[val.workWeek.length - 1]
                  : "0",
                status: {
                  SAT: 0,
                  AL: "",
                  SL: "",
                },
                dojOrSpecifiedDate: "",
                leaveEntitleToday: "",
                noOfDaysWorked: "",
                annualLeaveEntitleBal: "",
                noOfDaysWorkedUAL: "",
                totalWorkedDays: "",
                leaveEligibleForThisYear: "",
                isEligibleForAnnualLeave: "",
              };
            }
            return acc;
          }, {})
        : {};

    //   const getMatchedEmpLeaves = initialLeaveDetails?.[empDetails?.empID];

    const getMatchedEmpLeaves = initialLeaveDetails;
    //   const getMatchedEmpLeaves = initialLeaveDetails;

    const allCurrentYearLeaves = await getCurrentYearLeaves(
      primaryData,
      getMatchedEmpLeaves,
      startDate,
      endDate,
      finalLeaveData
    );

    return allCurrentYearLeaves;
    //   setLeaveSummary(allCurrentYearLeaves);
  } catch (err) {
    console.log("Error : ", err);
    //   setLeaveSummary((prev) => {
    //     const leaveTypesToReset = [
    //       "compassionateLeave",
    //       "unPaidAuthorizeSick",
    //       "unPaidAuthorizeAnnual",
    //       "annualLeave",
    //       "marriageLeave",
    //       "hospitalisationLeave",
    //       "maternityLeave",
    //       "sickLeave",
    //       "paternityLeave",
    //       "compensateLeave",
    //     ];
    //     const updated = { ...prev };
    //     leaveTypesToReset.forEach((key) => {
    //       if (updated[key]) {
    //         updated[key] = {
    //           ...updated[key],
    //           daysTaken: 0,
    //           waitingApproval: 0,
    //         };
    //       }
    //     });
    //     return updated;
    //   });
    // nav("/leaveManagement/leaveBalance");
  }
};
