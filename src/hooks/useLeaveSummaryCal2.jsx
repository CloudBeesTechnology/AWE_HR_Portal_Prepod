const useLeaveSummaryCal2 = () => {
  function removePHMatchedData({ leaveData, formattedPHList }) {
    // Step 1: Extract all PH dates into an array in 'YYYY-MM-DD' format
    const phDates = [];
    formattedPHList?.forEach((ph) => {
      ph.dates.forEach((dateObj) => {
        phDates.push(dateObj.date); // Assuming already in 'YYYY-MM-DD'
      });
    });

    const afterRomovedPHandSunday = leaveData?.seperatedLeaves?.filter(
      (item) => {
        const fromDate = new Date(item.empLeaveSelectedFrom);
        const fromDateStr = fromDate?.toISOString()?.split("T")[0];

        const dayName = fromDate.toLocaleDateString("en-US", {
          weekday: "long",
        });
        // Keep only if NOT a PH
        return !phDates.includes(fromDateStr) && dayName !== "Sunday";
      }
    );
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

  const removeSaturdayLeave = (getSeperatedData) => {
    let result = getSeperatedData?.filter((val) => {
      const fromDate = new Date(val?.empLeaveSelectedFrom);

      const dayName = fromDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      return dayName !== "Saturday";
    });

    return result;
  };

  function adjustOnshoreLeaveData({ leaveData, formattedPHList }) {
    const { days, totalLeaveCount, seperatedLeaves } = leaveData;

    if (totalLeaveCount > days) {
      const reducedTotal = totalLeaveCount - 0.5;

      //   const getleaveTakenDiff = totalLeaveCount - days;

      if (
        parseFloat(reducedTotal) === parseFloat(days) &&
        Array.isArray(seperatedLeaves) &&
        seperatedLeaves.length > 0
      ) {
        const lastIndex = seperatedLeaves.length - 1;
        // Set leaveTakenCount of last object to 0.5
        seperatedLeaves[lastIndex].leaveTakenCount = 0.5;
      } else {
        // console.log("Days and reducedTotal is not equal");

        const { cleanedLeaveData } = removePHMatchedData({
          leaveData,
          formattedPHList,
        });

        let getSeperatedData = cleanedLeaveData?.seperatedLeaves;
        let getleaveTakenDiff = cleanedLeaveData?.removedPHandSunday - days;

        if (getleaveTakenDiff === 0.5) {
          const lastIndex = getSeperatedData?.length - 1;
          // Set leaveTakenCount of last object to 0.5

          getSeperatedData[lastIndex].leaveTakenCount = 0.5;
          leaveData.seperatedLeaves = getSeperatedData;
        } else if (getleaveTakenDiff === 1) {
          //   let result = getSeperatedData?.filter((val) => {
          //     const fromDate = new Date(val?.empLeaveSelectedFrom);

          //     const dayName = fromDate.toLocaleDateString("en-US", {
          //       weekday: "long",
          //     });

          //     return dayName !== "Saturday";
          //   });

          const result = removeSaturdayLeave(getSeperatedData);
          leaveData.seperatedLeaves = result;
        } else if (getleaveTakenDiff === 1.5) {
          const filterBySaturday = removeSaturdayLeave(getSeperatedData);
          const lastIndex = filterBySaturday?.length - 1;

          // Set leaveTakenCount of last object to 0.5
          filterBySaturday[lastIndex].leaveTakenCount = 0.5;
          leaveData.seperatedLeaves = filterBySaturday;
        }
      }
    }
  }

  //   let k = [];
  function adjustOffshoreLeaveData({ leaveData }) {
    const { days, totalLeaveCount, seperatedLeaves } = leaveData;

    if (totalLeaveCount > days) {
      const reducedTotal = totalLeaveCount - 0.5;

      if (
        parseFloat(reducedTotal) === parseFloat(days) &&
        Array.isArray(seperatedLeaves) &&
        seperatedLeaves.length > 0
      ) {
        const lastIndex = seperatedLeaves.length - 1;
        // Set leaveTakenCount of last object to 0.5
        seperatedLeaves[lastIndex].leaveTakenCount = 0.5;
      } else {
        // console.log("Days and reducedTotal is not equal...");

        // k.push(leaveData);
      }
      //   console.log("Offshore unmatched : ", k);
    }
  }

  // Adjust Days count (taken leave) based on onshore and offshore emp type
  const handleAdjustDaycount = ({
    isOffshoreOrOnshoreEmp,
    formattedPHList,
  }) => {
    if (
      Array.isArray(isOffshoreOrOnshoreEmp) &&
      isOffshoreOrOnshoreEmp.length > 0
    ) {
      isOffshoreOrOnshoreEmp.forEach((leaveData) => {
        // if (leaveData?.empType === "OFFSHORE") {
        //   adjustOffshoreLeaveData({ leaveData });
        // } else if (leaveData?.empType === "ONSHORE") {
        if (leaveData?.leaveType !== "Maternity Leave") {
          adjustOnshoreLeaveData({ leaveData, formattedPHList });
        }
        // }
      });
    }
  };

  const filterOnshoreOffshorePHbasis = ({
    formattedPHList,
    seperatedLeaves,
  }) => {
    const isOffshoreOrOnshoreEmp = seperatedLeaves;
    //   Array.isArray(seperatedLeaves) && seperatedLeaves?.length > 0
    //     ? seperatedLeaves?.map((val) => {
    //         const getLastNWHPW = Array.isArray(val?.workWeek)
    //           ? val.workWeek[val.workWeek.length - 1]
    //           : 0;
    //         if (parseFloat(getLastNWHPW) === 7) {
    //           return {
    //             ...val,
    //             empType: "OFFSHORE",
    //           };
    //         } else {
    //           return {
    //             ...val,
    //             empType: "ONSHORE",
    //           };
    //         }
    //       })
    //     : [];

    handleAdjustDaycount({ isOffshoreOrOnshoreEmp, formattedPHList });

    isOffshoreOrOnshoreEmp?.forEach((leave) => {
      let finalLeaveCount = 0;
      if (
        Array.isArray(leave?.seperatedLeaves) &&
        leave?.seperatedLeaves?.length > 0
      ) {
        leave.seperatedLeaves?.forEach((val) => {
          finalLeaveCount += val?.leaveTakenCount;
        });
      }
      leave.finalLeaveCount = finalLeaveCount;
    });

    return { isOffshoreOrOnshoreEmp };
  };
  return { filterOnshoreOffshorePHbasis };
};

export default useLeaveSummaryCal2;
