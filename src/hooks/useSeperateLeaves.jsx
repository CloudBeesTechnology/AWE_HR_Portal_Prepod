// const useSeperateLeaves = () => {

//   function handleSeperateLeaves({ mergedData }) {
//     const hasOnlySlashOrDash = /[\/-]/;
//     const result = [];

//     const formattedDate = (selectedDate) => {
//       if (!selectedDate) return;

//       const dateStr =
//         typeof selectedDate === "string"
//           ? selectedDate
//           : selectedDate.toString();

//       let leaveDateObj = null;

//       if (dateStr?.includes("/")) {
//         const [day, month, year] = dateStr?.split("/")?.map(Number);
//         leaveDateObj = new Date(year, month - 1, day);
//       } else if (dateStr?.includes("-")) {
//         leaveDateObj = new Date(dateStr);
//       }
//       leaveDateObj?.setHours(0, 0, 0, 0);
//       return leaveDateObj;
//     };

//     const formatLocalDate = (dateObj) => {
//       if (!dateObj) return;
//       const year = dateObj?.getFullYear();
//       const month = String(dateObj.getMonth() + 1)?.padStart(2, "0");
//       const day = String(dateObj.getDate())?.padStart(2, "0");
//       return `${year}-${month}-${day}`;
//     };

//     const formatLocalDateTime = (dateObj) => {
//       if (!dateObj) return;
//       return `${formatLocalDate(dateObj)}T00:00:00.000`;
//     };

//     const checkStartEndDate = (item) => {
//       let leaveDates = {
//         fromDate: "",
//         toDate: "",
//         startDate: "",
//         endDate: "",
//       };
//       const convertToDate = (itemsDate) => {
//         let getDate = new Date(itemsDate);
//         getDate.setHours(0, 0, 0, 0);
//         return getDate;
//       };
//       if (
//         String(item?.empLeaveSelectedFrom) &&
//         String(item?.empLeaveSelectedTo) &&
//         hasOnlySlashOrDash.test(item?.empLeaveSelectedFrom) &&
//         hasOnlySlashOrDash.test(item?.empLeaveSelectedTo)
//       ) {
//         const fDate = formattedDate?.(item?.empLeaveSelectedFrom);
//         const tDate = formattedDate?.(item?.empLeaveSelectedTo);
//         leaveDates = {
//           ...leaveDates,
//           fromDate: convertToDate(fDate),
//           toDate: convertToDate(tDate),
//         };
//       }
//       if (
//         String(item?.empLeaveStartDate) &&
//         String(item?.empLeaveEndDate) &&
//         hasOnlySlashOrDash.test(item?.empLeaveStartDate) &&
//         hasOnlySlashOrDash.test(item?.empLeaveEndDate)
//       ) {
//         const sDate = formattedDate(item?.empLeaveStartDate);
//         const eDate = formattedDate(item?.empLeaveEndDate);
//         leaveDates = {
//           ...leaveDates,
//           startDate: convertToDate(sDate),
//           endDate: convertToDate(eDate),
//         };
//       }
//       return leaveDates;
//     };
//     if (Array.isArray(mergedData) && mergedData.length > 0) {
//       mergedData.forEach((item) => {
//         let fromDate = null;
//         let toDate = null;

//         if (
//           String(item?.empLeaveSelectedFrom) &&
//           String(item?.empLeaveSelectedTo) &&
//           hasOnlySlashOrDash.test(item?.empLeaveSelectedFrom) &&
//           hasOnlySlashOrDash.test(item?.empLeaveSelectedTo)
//         ) {
//           fromDate = formattedDate(item.empLeaveSelectedFrom);
//           toDate = formattedDate(item.empLeaveSelectedTo);
//         } else if (
//           String(item?.empLeaveStartDate) &&
//           String(item?.empLeaveEndDate) &&
//           hasOnlySlashOrDash.test(item?.empLeaveStartDate) &&
//           hasOnlySlashOrDash.test(item?.empLeaveEndDate)
//         ) {
//           fromDate = formattedDate(item.empLeaveStartDate);
//           toDate = formattedDate(item.empLeaveEndDate);
//         }

//         if (!fromDate || !toDate) {
//           console.log("⛔ Invalid item (missing valid dates):", item);
//           return;
//         }

//         const seperatedLeaves = [];
//         let totalLeaveCount = 0;
//         const dayCount =
//           Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;

//         let currentDate = new Date(fromDate);
//         currentDate.setHours(0, 0, 0, 0);

//         for (let i = 0; i < dayCount; i++) {
//           const formattedDateStr = formatLocalDate(currentDate);
//           const isoDateStr = formatLocalDateTime(currentDate);

//           let assignedDays = 1;
//           if (dayCount === 1 && parseFloat(item?.days) === 0.5) {
//             assignedDays = 0.5;
//           }

//           totalLeaveCount += assignedDays;
//           seperatedLeaves.push({
//             ...item,
//             empLeaveSelectedFrom: formattedDateStr,
//             empLeaveSelectedTo: formattedDateStr,
//             empLeaveStartDate: isoDateStr,
//             empLeaveEndDate: isoDateStr,
//             leaveTakenCount: assignedDays,
//           });

//           currentDate.setDate(currentDate.getDate() + 1);
//         }

//         const itemsDate = checkStartEndDate(item);

//         result.push({
//           empName: item?.empName,
//           empID: item?.empID,
//           leaveType: item?.leaveType,
//           days: item?.days,
//           totalLeaveCount: totalLeaveCount,
//           workWeek: item?.workWeek,
//           fromDate: formatLocalDate(itemsDate?.fromDate),
//           toDate: formatLocalDate(itemsDate?.toDate),
//           startDate: formatLocalDateTime(itemsDate?.startDate),
//           endDate: formatLocalDateTime(itemsDate?.endDate),
//           seperatedLeaves,
//         });
//       });

//       return result;
//     }
//   }

//   return { handleSeperateLeaves };
// };

// export default useSeperateLeaves;

const useSeperateLeaves = () => {
  function handleSeperateLeaves({ mergedData }) {
    const hasOnlySlashOrDash = /[\/-]/;
    const result = [];

    const formattedDate = (selectedDate) => {
      if (!selectedDate) return null;

      const dateStr =
        typeof selectedDate === "string"
          ? selectedDate
          : selectedDate.toString();

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

      // const getSeperatedData = result?.flatMap((val) => val.seperatedLeaves);

      // let dayCount = 0;
      // const fResult = result.filter((fil) => {
      //   let getYear = new Date(fil?.fromDate).getFullYear();

      // let filterLeaves =
      //   (fil?.managerStatus === "Approved" &&
      //     fil?.supervisorStatus !== "Rejected") ||
      //   (fil?.supervisorStatus === "Approved" &&
      //     fil?.managerStatus !== "Rejected");

      // if (
      //   fil.empID === "7916" &&
      //   fil.leaveType === "Annual Leave" &&
      //   getYear === 2025 &&
      //   filterLeaves &&
      //   fil?.empStatus !== "Cancelled"
      // ) {
      //   dayCount += fil?.days;
      //   return fil;
      // }

      // if (
      //   fil.managerStatus === "Approved" ||
      //   fil.supervisorStatus === "Approved"
      // ) {
      //   if (
      //     fil.empStatus !== "Cancelled" &&
      //     fil.empID === "7916" &&
      //     fil.leaveType === "Annual Leave" &&
      //     getYear === 2025
      //   ) {
      //     return (dayCount += fil?.days);
      //   }
      // }
      //   if (
      //     fil.empID === "7916" &&
      //     fil.leaveType === "Annual Leave" &&
      //     getYear === 2025 &&
      //     fil.fromDate === "2025-02-20"
      //   ) {
      //     dayCount += fil?.days;
      //     return fil;
      //   }
      // });

      // console.log("dayCount : ", dayCount);
      // console.log("fResult : ", fResult);
      return result;
    }
  }

  return { handleSeperateLeaves };
};

export default useSeperateLeaves;
