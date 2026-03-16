// src/pages/leaveManagement/empLeaveSummary/services/proDataCalculationService.js
export const getDaysFromTwoDates = (fromDate, toDate) => {
  const start = new Date(fromDate);
  const end = new Date(toDate);

  // Calculate difference in milliseconds
  const diffTime = end - start;

  // Convert milliseconds to days
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return parseFloat(diffDays).toFixed(0);
};

export const handleProDataLeaveCal = async (updateStatusSection) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  let getCurrentYear = currentDate.getFullYear();

  const getSLEffectiveDate = new Date(
    updateStatusSection?.empSickLeaveEffDate
  );
  getSLEffectiveDate.setHours(0, 0, 0, 0);

  const getALEffectiveDate = new Date(
    updateStatusSection?.empAnnualLeaveEffDate
  );
  getALEffectiveDate.setHours(0, 0, 0, 0);

  const getALEffectiveDateYear = getALEffectiveDate?.getFullYear();

  let getFirstDateOfYear = `${getCurrentYear}-01-01`;
  let dojOrSpeDate = "";

  const isEmpFirstEffectiveDate =
    getALEffectiveDateYear === getCurrentYear &&
    currentDate >= getALEffectiveDate;

  if (isEmpFirstEffectiveDate) {
    dojOrSpeDate = updateStatusSection?.empAnnualLeaveEffDate;
  } else if (
    getALEffectiveDateYear !== getCurrentYear &&
    currentDate >= getALEffectiveDate
  ) {
    dojOrSpeDate = getFirstDateOfYear;
  } else {
    dojOrSpeDate = "";
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

  const totalALLeaveCount =
    currentDate >= getALEffectiveDate ? totalLeaveForAL.toFixed(1) : 0;

  const remainingALLeaveCount =
    currentDate >= getALEffectiveDate ? sumOfDTandWP.toFixed(1) : 0;

  const currYearALEntitle =
    currentDate >= getALEffectiveDate ? currentYearALEntitleBal : "0";

  const isEligibleForSL = currentDate >= getSLEffectiveDate;

  const SLTaken = updateStatusSection?.sickLeave?.totalLeave;
  const SLRemaining = updateStatusSection?.sickLeave?.remainingLeave;

  const finalData = {
    ...updateStatusSection,

    annualLeave: {
      ...updateStatusSection.annualLeave,
      totalLeave: totalALLeaveCount,
      remainingLeave: remainingALLeaveCount,
    },

    sickLeave: {
      ...updateStatusSection.sickLeave,
      totalLeave: isEligibleForSL ? SLTaken : 0,
      remainingLeave: isEligibleForSL ? SLRemaining : 0,
    },

    dojOrSpecifiedDate: dojOrSpeDate,

    leaveEntitleToday: currentDate.toLocaleDateString("en-CA"),

    noOfDaysWorked: parseFloat(totalDays).toFixed(1),

    totalWorkedDays: getDaysFromTwoDates(
      updateStatusSection?.doj,
      currentDate.toLocaleDateString("en-CA")
    ),

    annualLeaveEntitleBal: currYearALEntitle,

    noOfDaysWorkedUAL: noOfDaysWorkedMinusUAL.toFixed(1) ?? "0",

    leaveEligibleForThisYear:
      parseFloat(updateStatusSection?.annualLeave?.totalLeave) -
      parseFloat(updateStatusSection?.annualLeaveBal),

    isEligibleForAnnualLeave:
      sumOfDTandWP.toFixed(1) > 0 && currentDate > getALEffectiveDate
        ? "Yes"
        : "No",
  };

  return finalData;
};