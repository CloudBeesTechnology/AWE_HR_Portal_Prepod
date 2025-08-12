const useLeaveSummaryCal2 = () => {
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
  const handleAdjustDaycount = ({
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

  const filterOnshoreOffshorePHbasis = ({
    formattedPHList,
    seperatedLeaves,
  }) => {
    const filteredLeaves = handleAdjustDaycount({
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

    // console.log("updatedLeaves : ", updatedLeaves);

    // const finalData = isOffshoreOrOnshoreEmp?.map((leave) => {
    //   const getNWHPW =
    //     Array.isArray(leave?.workWeek) && leave?.workWeek?.length === 1
    //       ? leave?.workWeek[leave?.workWeek.length - 1]
    //       : null;

    //   const getDiff = leave.finalLeaveCount - leave.days;
    //   let finalLeaveCount = 0;

    //   if (getNWHPW) {
    //     const getResult = handleSeperatedLeaves(
    //       leave?.seperatedLeaves,
    //       getNWHPW,
    //       getDiff
    //     );

    //     for (var leaveData of getResult) {
    //       finalLeaveCount += leaveData?.leaveTakenCount;
    //     }

    //     return {
    //       ...leave,
    //       seperatedLeaves: getResult,
    //       finalLeaveCount: finalLeaveCount,
    //     };
    //   } else if (parseFloat(getDiff) !== parseFloat(leave.days)) {
    //   } else {
    //     return leave;
    //   }
    // });

    // console.log(
    //   "finalData : ",
    //   updatedLeaves?.filter(
    //     (val) => val.empID === "7524" && val?.leaveType === "Annual Leave"
    //   )
    // );

    // 4513 - correct

    // const unMatchedData = updatedLeaves?.filter((val) => {
    //   let startDateYear = new Date(val?.fromDate).getFullYear();

    //   if (
    //     // String(startDateYear) === "2025" &&
    //     // parseFloat(val.days) !== parseFloat(val.finalLeaveCount) &&
    //     val.leaveType === "Annual Leave"
    //   ) {
    //     return val.empID;
    //   }
    // });

    // const groupedByEmpID = unMatchedData?.reduce((acc, item) => {
    //   if (!acc[item?.empID]) {
    //     acc[item?.empID] = [];
    //   }
    //   acc[item?.empID].push(item);
    //   return acc;
    // }, {});
    // console.log("groupedByEmpID : ", groupedByEmpID);

    return { isOffshoreOrOnshoreEmp: updatedLeaves };
  };
  return { filterOnshoreOffshorePHbasis };
};

export default useLeaveSummaryCal2;
