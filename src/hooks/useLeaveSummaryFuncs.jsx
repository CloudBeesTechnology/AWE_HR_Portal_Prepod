export const useLeaveSummaryFuncs = () => {
  function convertToFormattedHolidays({ publicHoliday }) {
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

    const formattedPHList = publicHoliday?.CompanyHolidays?.map((item) => {
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

  function getSelectedMonthName(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const endMonth = endDate.toLocaleString('default', { month: 'short' });

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const getStartMonth = startDate.getMonth();
  const getEndMonth = endDate.getMonth();

  if (startYear === endYear && getStartMonth === getEndMonth) {
    return `${startMonth} ${startYear}`;
  } else if (startYear === endYear) {
    return `${startMonth} - ${endMonth} ${startYear}`;
  } else {
    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  }
}

  return { convertToFormattedHolidays, getSelectedMonthName };
};
