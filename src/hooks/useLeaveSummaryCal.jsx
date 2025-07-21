export const useLeaveSummaryCal = () => {
  function removePHMatchesData({ getSpecificEmpLeaves, formattedPHList }) {
    // Step 1: Flatten all PH dates into an array
    const phDates = [];
    formattedPHList?.forEach((ph) => {
      ph.dates.forEach((dateObj) => {
        phDates.push(dateObj.date); // already in 'YYYY-MM-DD' format
      });
    });

    // Step 2: Process leaveData
    const updatedLeaveData = getSpecificEmpLeaves?.map((emp) => {
      const filteredGroupedData = emp.groupedData?.filter((item) => {
        if (item?.empLeaveType !== "Maternity Leave") {
          const fromDate = new Date(
            item.empLeaveSelectedFrom || item.empLeaveStartDate
          );
          const toDate = new Date(
            item.empLeaveSelectedTo || item.empLeaveEndDate
          );

          // Format to 'YYYY-MM-DD'
          const fromDateStr = fromDate.toISOString().split("T")[0];
          const toDateStr = toDate.toISOString().split("T")[0];

          // Step 3: Check if both match any PH date
          const isFromPH = phDates.includes(fromDateStr);
          const isToPH = phDates.includes(toDateStr);

          // Return true if not both match (i.e., keep this item)
          return !(isFromPH && isToPH);
        }
      });

      return {
        ...emp,
        groupedData: filteredGroupedData,
      };
    });

    return { updatedLeaveData };
  }

  const removeSaturdayBasedOnNWHPW = (leaveData) => {
    const updatedLeaveData = leaveData?.map((emp) => {
      const updatedGroupedData = emp.groupedData
        ?.filter((leave) => {
          const dateStr = leave.empLeaveSelectedFrom || leave.empLeaveStartDate;
          const date = new Date(dateStr);
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
          return dayName !== "Sunday";
        })
        ?.map((leave) => {
          if (leave?.empLeaveType !== "Maternity Leave") {
            const dateStr =
              leave.empLeaveSelectedFrom || leave.empLeaveStartDate;
            const date = new Date(dateStr);
            const dayName = date.toLocaleDateString("en-US", {
              weekday: "long",
            });

            let adjustedLeaveTakenCount = leave.leaveTakenCount;

            if (dayName === "Saturday") {
              const workWeekFloat = parseFloat(emp.workWeek);

              if (workWeekFloat === 5) {
                adjustedLeaveTakenCount = 0;
              } else if (workWeekFloat === 5.5) {
                adjustedLeaveTakenCount = 0.5;
              } else if (workWeekFloat === 6) {
                adjustedLeaveTakenCount = 1;
              }
            }

            return {
              ...leave,
              leaveTakenCount: adjustedLeaveTakenCount,
            };
          }
        });

      return {
        ...emp,
        groupedData: updatedGroupedData,
      };
    });

    return updatedLeaveData;
  };

  const filterOnshoreOffshorePHbasis = ({
    formattedPHList,
    primaryData,
    getMatchedEmpLeaves,
  }) => {
 
    // Group primaryData based on empID and empBadgeNo
    const groupedLeaveData = Object.values(
      primaryData.reduce((acc, curr) => {
        const key = `${curr.empBadgeNo}`;
        if (!acc[key]) {
          let NWHPD = Array.isArray(curr.workHrs)
            ? curr.workHrs[curr.workHrs.length - 1]
            : "0";

          let NWHPM = Array.isArray(curr.workMonth)
            ? curr.workMonth[curr.workMonth.length - 1]
            : "0";

          let NWHPW = Array.isArray(curr.workWeek)
            ? curr.workWeek[curr.workWeek.length - 1]
            : "0";

          acc[key] = {
            empID: curr.empID,
            empBadgeNo: curr.empBadgeNo,
            workHrs: NWHPD,
            workMonth: NWHPM,
            workWeek: NWHPW,

            groupedData: [],
          };
        }
        acc[key].groupedData.push(curr);
        return acc;
      }, {})
    );

    const getSpecificEmpLeaves = groupedLeaveData?.filter(
      (fil) =>
        fil.empID === getMatchedEmpLeaves.empId &&
        fil.empBadgeNo === getMatchedEmpLeaves.empBadgeNo
    );

   

    const identifyIsOffshoreOrOnshoreEmp = getSpecificEmpLeaves?.map((val) => {
      if (val.empBadgeNo.startsWith("AW") && parseFloat(val?.workWeek) === 7) {
        return "Offshore Employee";
      } else if (
        !val.empBadgeNo.startsWith("AW") &&
        parseFloat(val?.workWeek) < 7
      ) {
        return "Onshore Employee";
      } else {
        return "Unknown";
      }
    })[0];

    let finalData = [];
    if (identifyIsOffshoreOrOnshoreEmp === "Offshore Employee") {
      finalData = getSpecificEmpLeaves;
    } else if (identifyIsOffshoreOrOnshoreEmp === "Onshore Employee") {
      const { updatedLeaveData } = removePHMatchesData({
        getSpecificEmpLeaves,
        formattedPHList,
      });
      finalData = removeSaturdayBasedOnNWHPW(updatedLeaveData);
    }

    const getUpdatedLeaveData = finalData?.flatMap((val) => val?.groupedData);

    return { getUpdatedLeaveData };
  };

  return { filterOnshoreOffshorePHbasis };
};