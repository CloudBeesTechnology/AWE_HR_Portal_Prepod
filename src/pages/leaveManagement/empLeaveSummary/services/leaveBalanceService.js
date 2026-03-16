// src/pages/leaveManagement/empLeaveSummary/services/leaveBalanceService.js

function removePHMatchedData({ leaveData, formattedPHList }) {
  // Step 1: Extract all PH dates into an array in 'YYYY-MM-DD' format

  const phDates = formattedPHList?.flatMap((ph) => {
    return ph.dates.map((dateObj) => {
      return dateObj.date; // Assuming already in 'YYYY-MM-DD'
    });
  });

  const afterRomovedPH = leaveData?.seperatedLeaves?.filter((item) => {
    const fromDate = new Date(item.empLeaveSelectedFrom);
    const fromDateStr = fromDate?.toISOString()?.split("T")[0];

    // console.log("phDates : ",phDates);
    // console.log("fromDateStr : ",fromDateStr)
    // && dayName !== "Sunday";
    // Keep only if NOT a PH

    //          if(item.empID === "7916"){
    // console.log("fromDateStr : ",fromDateStr)
    //          }

    if (!phDates?.includes(fromDateStr)) {
      return item;
    }
    // return !phDates.includes(fromDateStr);
  });

  const afterRomovedPHandSunday = afterRomovedPH.filter((item) => {
    const fromDate = new Date(item.empLeaveSelectedFrom);
    const dayName = fromDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    return String(dayName) !== "Sunday";
  });

  // Step 2: Remove matching PH dates from seperatedLeaves
  const cleanedLeaveData = {
    ...leaveData,
    removedPHandSunday: afterRomovedPHandSunday?.length,
    seperatedLeaves: afterRomovedPHandSunday,
  };

  // updatedLeaveData: cleanedLeaveData
  return {
    cleanedLeaveData,
  };
}

async function handleSeperateLeaves({ mergedData }) {
  const hasOnlySlashOrDash = /[\/-]/;
  const result = [];

  const formattedDate = (selectedDate) => {
    if (!selectedDate) return null;

    const dateStr =
      typeof selectedDate === "string" ? selectedDate : selectedDate.toString();

    let dateObj = null;

    // Check if it is in DD/MM/YYYY or DD-MM-YYYY format
    if (dateStr.includes("/") || dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const delimiter = dateStr.includes("/") ? "/" : "-";
      const [day, month, year] = dateStr.split(delimiter).map(Number);
      dateObj = new Date(year, month - 1, day);
    } else {
      // Assume it's in ISO format (e.g., YYYY-MM-DD or ISO string)
      dateObj = new Date(dateStr);
    }

    if (isNaN(dateObj)) return null; // Handle invalid date parsing

    dateObj.setHours(0, 0, 0, 0);
    return dateObj;
  };

  const formatLocalDate = (dateObj) => {
    if (!dateObj) return;
    const year = dateObj?.getFullYear();
    const month = String(dateObj.getMonth() + 1)?.padStart(2, "0");
    const day = String(dateObj.getDate())?.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatLocalDateTime = (dateObj) => {
    if (!dateObj) return;
    return `${formatLocalDate(dateObj)}`;
  };

  const checkStartEndDate = (item) => {
    let leaveDates = {
      fromDate: "",
      toDate: "",
      startDate: "",
      endDate: "",
    };
    const convertToDate = (itemsDate) => {
      let getDate = new Date(itemsDate);
      getDate.setHours(0, 0, 0, 0);
      return getDate;
    };
    if (
      String(item?.empLeaveSelectedFrom) &&
      String(item?.empLeaveSelectedTo) &&
      hasOnlySlashOrDash.test(item?.empLeaveSelectedFrom) &&
      hasOnlySlashOrDash.test(item?.empLeaveSelectedTo)
    ) {
      const fDate = formattedDate?.(item?.empLeaveSelectedFrom);
      const tDate = formattedDate?.(item?.empLeaveSelectedTo);
      leaveDates = {
        ...leaveDates,
        fromDate: convertToDate(fDate),
        toDate: convertToDate(tDate),
      };
    }
    if (
      String(item?.empLeaveStartDate) &&
      String(item?.empLeaveEndDate) &&
      hasOnlySlashOrDash.test(item?.empLeaveStartDate) &&
      hasOnlySlashOrDash.test(item?.empLeaveEndDate)
    ) {
      const sDate = formattedDate(item?.empLeaveStartDate);
      const eDate = formattedDate(item?.empLeaveEndDate);
      leaveDates = {
        ...leaveDates,
        startDate: convertToDate(sDate),
        endDate: convertToDate(eDate),
      };
    }
    return leaveDates;
  };
  if (Array.isArray(mergedData) && mergedData.length > 0) {
    mergedData.forEach((item) => {
      const fromDate = formattedDate(item.empLeaveSelectedFrom);
      const toDate = formattedDate(item.empLeaveSelectedTo);

      const startDate = formattedDate(item.empLeaveStartDate);
      const endDate = formattedDate(item.empLeaveEndDate);

      let finalFrom = fromDate || startDate;
      let finalTo = toDate || endDate;

      const formattedFrom = formatLocalDate(finalFrom);
      const formattedTo = formatLocalDate(finalTo);
      const formattedStartDateTime = formatLocalDateTime(finalFrom);
      const formattedEndDateTime = formatLocalDateTime(finalTo);

      let formattedFromDate = null;
      let formattedEndDate = null;

      if (!fromDate || !toDate) {
        formattedFromDate = formattedStartDateTime;
        formattedEndDate = formattedEndDateTime;
      } else {
        formattedFromDate = formattedFrom;
        formattedEndDate = formattedTo;
      }

      const seperatedLeaves = [];
      let totalLeaveCount = 0;
      const dayCount =
        Math.floor(
          (new Date(formattedEndDate) - new Date(formattedFromDate)) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      let currentDate = new Date(formattedFromDate);
      currentDate.setHours(0, 0, 0, 0);

      for (let i = 0; i < dayCount; i++) {
        //   const formattedDateStr = formatLocalDate(currentDate);
        //   const isoDateStr = formatLocalDateTime(currentDate);

        const formattedDateStr = formatLocalDate(currentDate);

        let assignedDays = 1;
        if (dayCount === 1 && parseFloat(item?.days) === 0.5) {
          assignedDays = 0.5;
        }

        totalLeaveCount += assignedDays;
        seperatedLeaves.push({
          ...item,
          empLeaveSelectedFrom: formattedDateStr,
          empLeaveSelectedTo: formattedDateStr,
          empLeaveStartDate: formattedDateStr,
          empLeaveEndDate: formattedDateStr,
          leaveTakenCount: assignedDays,
          leaveType: item?.leaveType,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      const itemsDate = checkStartEndDate(item);

      result.push({
        empName: item?.empName,
        empID: item?.empID,
        leaveType: item?.leaveType,
        days: item?.days,
        totalLeaveCount: totalLeaveCount,
        workWeek: item?.workWeek,
        supervisorStatus: item?.supervisorStatus,
        managerStatus: item?.managerStatus,
        empStatus: item?.empStatus,
        fromDate: formatLocalDate(itemsDate?.fromDate),
        toDate: formatLocalDate(itemsDate?.toDate),
        startDate: formatLocalDateTime(itemsDate?.startDate),
        endDate: formatLocalDateTime(itemsDate?.endDate),
        seperatedLeaves,
      });
    });
    return result;
  }
}

async function convertToFormattedHolidays({ publicHoliday }) {
  const monthMap = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const parseDateString = (str) => {
    const [dayOfWeek, dateStr] = str.split(", ");
    const [day, monthName, year] = dateStr
      .replace(/(\d+)(st|nd|rd|th)/, "$1")
      .split(" ");
    const month = monthMap[monthName];
    const paddedDay = day.padStart(2, "0");
    return {
      day: dayOfWeek,
      date: `${year}-${month}-${paddedDay}`,
    };
  };

  const formattedPHList = publicHoliday?.CompanyHolidays2025?.map((item) => {
    let dateList = [];

    if (item.date) {
      dateList.push(parseDateString(item.date));
    } else if (item.dates && Array.isArray(item.dates)) {
      dateList = item.dates.map(parseDateString);
    }

    return {
      PHName: item.name,
      dates: dateList,
    };
  });

  return { formattedPHList };
}

const handleSeperatedLeaves = (leaveData, getNWHPW) => {
  let allNWHPW = ["5", "5.0", "5.5", "6", "6.0"];

  if (allNWHPW?.includes(String(getNWHPW))) {
    const getResult = leaveData?.map((val) => {
      const fromDate = new Date(val?.empLeaveSelectedFrom);
      const dayName = fromDate?.toLocaleDateString("en-US", {
        weekday: "long",
      });

      if (String(dayName) === "Saturday") {
        return {
          ...val,
          leaveTakenCount:
            String(getNWHPW) === "5"
              ? 0
              : String(getNWHPW) === "5.0"
              ? 0
              : String(getNWHPW) === "5.5"
              ? 0.5
              : String(getNWHPW) === "6"
              ? 1
              : String(getNWHPW) === "6.0"
              ? 1
              : 1,
        };
      } else {
        return val;
      }
    });
    return getResult;
  } else {
    return leaveData;
  }
};

const checkLeaveCountWithDays = (filteredData) => {
  let leaveCount = 0;
  for (var leaveData of filteredData) {
    leaveCount += leaveData?.leaveTakenCount;
  }
  return leaveCount;
};

const removeSaturdayLeave = (getSeperatedData, days, workWeek) => {
  const getNWHPW =
    Array.isArray(workWeek) && workWeek?.length === 1
      ? workWeek[workWeek.length - 1]
      : null;

  const getSaturdayCount = getSeperatedData?.filter((val) => {
    const fromDate = new Date(val?.empLeaveSelectedFrom);

    const dayName = fromDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (dayName === "Saturday") {
      return val;
    }
  }).length;

  let filteredData = [];
  if (getNWHPW) {
    const filterByNWHPD = handleSeperatedLeaves(getSeperatedData, getNWHPW);

    const leaveCount = checkLeaveCountWithDays(filterByNWHPD);

    const leaveDiff = leaveCount - days;

    if (parseFloat(leaveDiff) === 0) {
      filteredData = filterByNWHPD;
    } else if (parseFloat(leaveDiff) === 0.5) {
      const lastIndex = filterByNWHPD.length - 1;
      // Set leaveTakenCount of last object to 0.5

      if (filterByNWHPD[lastIndex].leaveTakenCount === 0.5) {
        filterByNWHPD[lastIndex - 1].leaveTakenCount = 0.5;
      } else {
        filterByNWHPD[lastIndex].leaveTakenCount = 0.5;
      }
      filteredData = filterByNWHPD;
    }
  } else {
    if (getSaturdayCount > 0) {
      const handleNWHPW1 = handleSeperatedLeaves(getSeperatedData, 6);
      const leaveCount1 = checkLeaveCountWithDays(handleNWHPW1);

      const handleNWHPW05 = handleSeperatedLeaves(getSeperatedData, 5.5);
      const leaveCount05 = checkLeaveCountWithDays(handleNWHPW05);

      const handleNWHPW0 = handleSeperatedLeaves(getSeperatedData, 5);
      const leaveCount0 = checkLeaveCountWithDays(handleNWHPW0);

      const leaveDiff05 = leaveCount05 - days;
      const leaveDiff1 = leaveCount1 - days;
      const leaveDiff0 = leaveCount0 - days;

      // NWHPW 6
      if (parseFloat(leaveDiff1) === 0) {
        filteredData = handleNWHPW1;
      } else if (parseFloat(leaveDiff1) === 0.5) {
        const lastIndex = handleNWHPW1.length - 1;
        // Set leaveTakenCount of last object to 0.5

        if (
          handleNWHPW1.length >= 2 &&
          handleNWHPW1[lastIndex].leaveTakenCount === 0.5
        ) {
          handleNWHPW1[lastIndex - 1].leaveTakenCount = 0.5;
        } else if (handleNWHPW1.length >= 1) {
          handleNWHPW1[lastIndex].leaveTakenCount = 0.5;
        }
        filteredData = handleNWHPW1;
      }

      // NWHPW 5.5
      else if (parseFloat(leaveDiff05) === 0) {
        filteredData = handleNWHPW05;
      } else if (parseFloat(leaveDiff05) === 0.5) {
        const lastIndex = handleNWHPW05.length - 1;
        // Set leaveTakenCount of last object to 0.5

        if (
          handleNWHPW05.length >= 2 &&
          handleNWHPW05[lastIndex].leaveTakenCount === 0.5
        ) {
          handleNWHPW05[lastIndex - 1].leaveTakenCount = 0.5;
        } else if (handleNWHPW05.length >= 1) {
          handleNWHPW05[lastIndex].leaveTakenCount = 0.5;
        }
        filteredData = handleNWHPW05;
      }

      // NWHPW 5
      else if (parseFloat(leaveDiff0) === 0) {
        filteredData = handleNWHPW0;
      } else if (parseFloat(leaveDiff0) === 0.5) {
        const lastIndex = handleNWHPW0.length - 1;
        // Set leaveTakenCount of last object to 0.5

        if (
          handleNWHPW0.length >= 2 &&
          handleNWHPW0[lastIndex].leaveTakenCount === 0.5
        ) {
          handleNWHPW0[lastIndex - 1].leaveTakenCount = 0.5;
        } else if (handleNWHPW0.length >= 1) {
          handleNWHPW0[lastIndex].leaveTakenCount = 0.5;
        }
        filteredData = handleNWHPW0;
      }
    } else {
      filteredData = getSeperatedData;
    }
  }

  if (Array.isArray(filteredData) && filteredData?.length > 0) {
    const leaveCount = checkLeaveCountWithDays(filteredData);

    if (parseFloat(leaveCount) < parseFloat(days)) {
      return getSeperatedData;
    } else if (parseFloat(leaveCount) === parseFloat(days)) {
      return filteredData;
    } else {
      return getSeperatedData;
    }
  } else {
    return getSeperatedData;
  }
};

function adjustOnshoreLeaveData({ leaveData, formattedPHList }) {
  const { days, workWeek, totalLeaveCount, seperatedLeaves } = leaveData;

  const getNWHPW =
    Array.isArray(workWeek) && workWeek?.length === 1
      ? workWeek[workWeek.length - 1]
      : null;
  if (totalLeaveCount > days) {
    const reducedTotal = totalLeaveCount - 0.5;

    if (String(getNWHPW) === "7") {
      const dayDifference = parseFloat(totalLeaveCount) - parseFloat(days);

      if (dayDifference === 0) {
        return {
          ...leaveData,
          seperatedLeaves: seperatedLeaves,
        };
      } else if (dayDifference === 0.5) {
        const updatedLeaves = [...seperatedLeaves];
        updatedLeaves[updatedLeaves.length - 1].leaveTakenCount = 0.5;

        return {
          ...leaveData,
          seperatedLeaves: updatedLeaves,
        };
      }
    } else if (
      parseFloat(reducedTotal) === parseFloat(days) &&
      Array.isArray(seperatedLeaves) &&
      seperatedLeaves.length > 0
    ) {
      const updatedLeaves = [...seperatedLeaves];
      updatedLeaves[updatedLeaves.length - 1].leaveTakenCount = 0.5;

      return {
        ...leaveData,
        seperatedLeaves: updatedLeaves,
      };
    } else {
      const { cleanedLeaveData } = removePHMatchedData({
        leaveData,
        formattedPHList,
      });

      const getSeperatedData = cleanedLeaveData?.seperatedLeaves || [];
      const getleaveTakenDiff = cleanedLeaveData?.removedPHandSunday - days;

      if (parseFloat(getleaveTakenDiff) !== 0) {
        const updated = removeSaturdayLeave(getSeperatedData, days, workWeek);
        return {
          ...leaveData,
          seperatedLeaves: updated,
        };
      } else {
        return {
          ...leaveData,
          seperatedLeaves: getSeperatedData,
        };
      }
    }
  }
  // No adjustment needed
  return leaveData;
}
// Adjust Days count (taken leave) based on onshore and offshore emp type
const handleAdjustDaycount = async ({
  isOffshoreOrOnshoreEmp,
  formattedPHList,
}) => {
  if (
    Array.isArray(isOffshoreOrOnshoreEmp) &&
    isOffshoreOrOnshoreEmp.length > 0 &&
    formattedPHList
  ) {
    return isOffshoreOrOnshoreEmp?.map((leaveData) => {
      if (leaveData?.leaveType !== "Maternity Leave") {
        return adjustOnshoreLeaveData({ leaveData, formattedPHList });
      } else {
        return leaveData;
      }
    });
  }
  return []; // safeguard in case the input is not valid
};

const filterOnshoreOffshorePHbasis = async ({
  formattedPHList,
  seperatedLeaves,
}) => {
  const filteredLeaves = await handleAdjustDaycount({
    isOffshoreOrOnshoreEmp: seperatedLeaves,
    formattedPHList,
  });

  const updatedLeaves =
    Array.isArray(filteredLeaves) && filteredLeaves?.length > 0
      ? filteredLeaves?.map((leave) => {
          let finalLeaveCount = 0;

          if (
            Array.isArray(leave?.seperatedLeaves) &&
            leave.seperatedLeaves.length > 0
          ) {
            leave.seperatedLeaves.forEach((val) => {
              finalLeaveCount += val?.leaveTakenCount;
            });
          }

          return {
            ...leave,
            finalLeaveCount,
          };
        })
      : [];

  return { isOffshoreOrOnshoreEmp: updatedLeaves };
};
export const handleEmpLeaveBalanace = async ({ mergedData, publicHoliday }) => {
  // if (!mergedData?.length) return;

  const seperatedLeaves = await handleSeperateLeaves({ mergedData });

  console.log("seperatedLeaves : ", seperatedLeaves);

  const { formattedPHList } = await convertToFormattedHolidays({
    publicHoliday,
  });
  const { isOffshoreOrOnshoreEmp } = await filterOnshoreOffshorePHbasis({
    formattedPHList,
    seperatedLeaves,
  });

  const finalLeaveData =
    Array.isArray(isOffshoreOrOnshoreEmp) && isOffshoreOrOnshoreEmp?.length > 0
      ? isOffshoreOrOnshoreEmp?.flatMap((val) => val?.seperatedLeaves)
      : [];

  return finalLeaveData;
  // setMergedLeaveData(finalLeaveData);
};
