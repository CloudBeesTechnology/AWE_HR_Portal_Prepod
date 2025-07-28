const useSeperateLeaves = () => {
  // const formattedDate = (selectedDate) => {
  //   let leaveDateObj = null;

  //   if (selectedDate?.includes("/")) {
  //     // Format: DD/MM/YYYY
  //     const [day, month, year] = selectedDate.split("/").map(Number);
  //     leaveDateObj = new Date(year, month - 1, day);
  //   } else if (selectedDate?.includes("-")) {
  //     // Format: YYYY-MM-DD
  //     leaveDateObj = new Date(selectedDate);
  //   }
  //   leaveDateObj.setHours(0, 0, 0, 0);
  //   return leaveDateObj;
  // };

  // function handleSeperateLeaves({ mergedData }) {
  //   const hasOnlySlashOrDash = /[\/-]/;
  //   const seperatedLeaves = [];

  //   mergedData.forEach((item) => {
  //     let fromDate = null;
  //     let toDate = null;

  //     if (
  //       String(item?.empLeaveSelectedFrom) &&
  //       String(item?.empLeaveSelectedTo) &&
  //       hasOnlySlashOrDash.test(item?.empLeaveSelectedFrom) &&
  //       hasOnlySlashOrDash.test(item?.empLeaveSelectedTo)
  //     ) {
  //       fromDate = formattedDate(item.empLeaveSelectedFrom);
  //       toDate = formattedDate(item.empLeaveSelectedTo);
  //     } else if (
  //       String(item?.empLeaveStartDate) &&
  //       String(item?.empLeaveEndDate) &&
  //       hasOnlySlashOrDash.test(item?.empLeaveStartDate) &&
  //       hasOnlySlashOrDash.test(item?.empLeaveEndDate)
  //     ) {
  //       fromDate = formattedDate(item.empLeaveStartDate);
  //       toDate = formattedDate(item.empLeaveEndDate);
  //     }

  //     if (!fromDate || !toDate) {
  //       console.log("⛔ Invalid item (missing valid dates):", item);
  //       return;
  //     }

  //     let currentDate = new Date(fromDate);
  //     currentDate.setHours(0, 0, 0, 0);
  //     const formatLocalDate = (dateObj) => {
  //       const year = dateObj.getFullYear();
  //       const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //       const day = String(dateObj.getDate()).padStart(2, "0");
  //       return `${year}-${month}-${day}`;
  //     };

  //     const formatLocalDateTime = (dateObj) => {
  //       const yyyy_mm_dd = formatLocalDate(dateObj);
  //       return `${yyyy_mm_dd}T00:00:00.000`;
  //     };

  //     // Count total leave days between two dates (inclusive)
  //     const dayCount =
  //       Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;

  //     for (let i = 0; i < dayCount; i++) {
  //       const leaveDate = new Date(currentDate);
  //       const formattedDate = formatLocalDate(leaveDate);
  //       const isoDateStr = formatLocalDateTime(leaveDate);

  //       let assignedDays = 1;

  //       // 🔁 If only 1 day and it's half-day
  //       if (dayCount === 1 && parseFloat(item?.days) === 0.5) {
  //         assignedDays = 0.5;
  //       }

  //       seperatedLeaves.push({
  //         ...item,
  //         empLeaveSelectedFrom: formattedDate,
  //         empLeaveSelectedTo: formattedDate,
  //         empLeaveStartDate: isoDateStr,
  //         empLeaveEndDate: isoDateStr,
  //         leaveTakenCount: assignedDays,
  //       });

  //       currentDate.setDate(currentDate.getDate() + 1);
  //     }
  //   });

  //   return seperatedLeaves;
  // }

  function handleSeperateLeaves({ mergedData }) {
    const hasOnlySlashOrDash = /[\/-]/;
    const result = [];

    const formattedDate = (selectedDate) => {
      if (!selectedDate) return;

      const dateStr =
        typeof selectedDate === "string"
          ? selectedDate
          : selectedDate.toString();

      let leaveDateObj = null;

      if (dateStr?.includes("/")) {
        const [day, month, year] = dateStr?.split("/")?.map(Number);
        leaveDateObj = new Date(year, month - 1, day);
      } else if (dateStr?.includes("-")) {
        leaveDateObj = new Date(dateStr);
      }
      leaveDateObj?.setHours(0, 0, 0, 0);
      return leaveDateObj;
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
      return `${formatLocalDate(dateObj)}T00:00:00.000`;
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
        let fromDate = null;
        let toDate = null;

        if (
          String(item?.empLeaveSelectedFrom) &&
          String(item?.empLeaveSelectedTo) &&
          hasOnlySlashOrDash.test(item?.empLeaveSelectedFrom) &&
          hasOnlySlashOrDash.test(item?.empLeaveSelectedTo)
        ) {
          fromDate = formattedDate(item.empLeaveSelectedFrom);
          toDate = formattedDate(item.empLeaveSelectedTo);
        } else if (
          String(item?.empLeaveStartDate) &&
          String(item?.empLeaveEndDate) &&
          hasOnlySlashOrDash.test(item?.empLeaveStartDate) &&
          hasOnlySlashOrDash.test(item?.empLeaveEndDate)
        ) {
          fromDate = formattedDate(item.empLeaveStartDate);
          toDate = formattedDate(item.empLeaveEndDate);
        }

        if (!fromDate || !toDate) {
          console.log("⛔ Invalid item (missing valid dates):", item);
          return;
        }

        const seperatedLeaves = [];
        let totalLeaveCount = 0;
        const dayCount =
          Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;

        let currentDate = new Date(fromDate);
        currentDate.setHours(0, 0, 0, 0);

        for (let i = 0; i < dayCount; i++) {
          const formattedDateStr = formatLocalDate(currentDate);
          const isoDateStr = formatLocalDateTime(currentDate);

          let assignedDays = 1;
          if (dayCount === 1 && parseFloat(item?.days) === 0.5) {
            assignedDays = 0.5;
          }
          console.log("formattedDateStr : ", formattedDateStr);
          console.log("isoDateStr : ", isoDateStr);
          totalLeaveCount += assignedDays;
          seperatedLeaves.push({
            ...item,
            empLeaveSelectedFrom: formattedDateStr,
            empLeaveSelectedTo: formattedDateStr,
            empLeaveStartDate: isoDateStr,
            empLeaveEndDate: isoDateStr,
            leaveTakenCount: assignedDays,
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

  return { handleSeperateLeaves };
};

export default useSeperateLeaves;
