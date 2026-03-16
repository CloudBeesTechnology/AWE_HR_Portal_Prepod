import { useCallback } from "react";

export const useHandleDateFormat = ({ leaveStatuses }) => {
  const handleDateFormat = useCallback(() => {
    const hasOnlySlashOrDash = /[\/-]/;

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

    const checkStartEndDate = (item) => {
      let leaveDates = {
        selectedFromKey: "",
        selectedToKey: "",
        fromDateKey: "",
        toDateKey: "",
      };
      const convertToDate = (itemsDate) => {
        let getDate = new Date(itemsDate);
        getDate.setHours(0, 0, 0, 0);
        return getDate;
      };
      if (
        String(item?.selectedFrom) &&
        String(item?.selectedTo) &&
        hasOnlySlashOrDash.test(item?.selectedFrom) &&
        hasOnlySlashOrDash.test(item?.selectedTo)
      ) {
        const fDate = formattedDate?.(item?.selectedFrom);
        const tDate = formattedDate?.(item?.selectedTo);
        leaveDates = {
          ...leaveDates,
          selectedFromKey: convertToDate(fDate),
          selectedToKey: convertToDate(tDate),
        };
      }
      if (
        String(item?.fromDate) &&
        String(item?.toDate) &&
        hasOnlySlashOrDash.test(item?.fromDate) &&
        hasOnlySlashOrDash.test(item?.toDate)
      ) {
        const sDate = formattedDate(item?.fromDate);
        const eDate = formattedDate(item?.toDate);
        leaveDates = {
          ...leaveDates,
          fromDateKey: convertToDate(sDate),
          toDateKey: convertToDate(eDate),
        };
      }
      return leaveDates;
    };

    const allleaveList = leaveStatuses?.map((val) => {
      const itemsDate = checkStartEndDate(val);
      const slFrom = new Date(itemsDate?.selectedFromKey);
      const slTo = new Date(itemsDate?.selectedToKey);

      const fDate = new Date(itemsDate?.fromDateKey);
      const tDate = new Date(itemsDate?.toDateKey);

      if (
        slFrom instanceof Date &&
        !isNaN(slFrom) &&
        slTo instanceof Date &&
        !isNaN(slTo)
      ) {
        return {
          ...val,
          fromDate: formatLocalDate(itemsDate?.selectedFromKey),
          toDate: formatLocalDate(itemsDate?.selectedToKey),
        };
      } else if (
        fDate instanceof Date &&
        !isNaN(fDate) &&
        tDate instanceof Date &&
        !isNaN(tDate)
      ) {
        return {
          ...val,
          fromDate: formatLocalDate(itemsDate?.fromDateKey),
          toDate: formatLocalDate(itemsDate?.toDateKey),
        };
      } else {
        return val;
      }
    });
    return allleaveList;
  }, [leaveStatuses]);

  return { handleDateFormat };
};
