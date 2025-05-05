export const HoursMinuAbsentCal = () => {
  function calculateTotalWorkingHours(data) {
    let totalMinutes = 0;

    try {
      for (const key in data) {
        const value = data[key];

        const xPattern = /^x\((\d+(\.\d+)?)\)(\d+(\.\d+)?)$/;
        const xMatch = value?.match(xPattern);
        if (xMatch) {
          const hours = parseFloat(xMatch[3]);
          totalMinutes +=
            Math.floor(hours) * 60 + Math.round((hours % 1) * 100);
          continue;
        }

        const numberPattern = /^\d+(\.\d+)?$/;
        if (value?.match(numberPattern)) {
          const hours = parseFloat(value);
          totalMinutes +=
            Math.floor(hours) * 60 + Math.round((hours % 1) * 100);
          continue;
        }

        const halPattern = /^H[A-Z]*\d+$/;
        if (value?.match(halPattern)) {
          const hours = parseFloat(value.replace(/[^0-9]/g, ""));
          totalMinutes += Math.floor(hours) * 60;
          continue;
        }
      }

      // Convert total minutes back to HH:MM
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formatted = `${String(hours).padStart(2, "0")}.${String(
        minutes
      ).padStart(2, "0")}`;

      return formatted;
    } catch (err) {
      console.error("Error calculating total working hours:", err);
      return "00.00";
    }
  }

  function calculateTotalAbsence(inputData, getLastIndexOfNWhrs) {
    try {
      let totalMinutes = 0;

      for (let date in inputData) {
        const value = inputData[date];

        if (value?.startsWith("x(")) {
          const absenceMatch = value?.match(/x\(([\d.]+)\)/);
          if (absenceMatch) {
            const num = parseFloat(absenceMatch[1]);
            const hours = Math.floor(num);
            const minutes = Math.round((num % 1) * 100);
            totalMinutes += hours * 60 + minutes;
          }
        } else if (value === "A") {
          const num = parseFloat(getLastIndexOfNWhrs);
          const hours = Math.floor(num);
          const minutes = Math.round((num % 1) * 100);
          totalMinutes += hours * 60 + minutes;
        }
      }

      const totalHours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;
      const formatted = `${String(totalHours).padStart(2, "0")}.${String(
        remainingMinutes
      ).padStart(2, "0")}`;
      return formatted;
    } catch (err) {
      console.error("Error in calculateTotalAbsence:", err);
      return "00.00";
    }
  }
  const convertNumToHours = (totalWorkHrs, getLastIndexOfNWhrs) => {
    const [hrsStr, minsStr] = String(totalWorkHrs)?.split(".");
    const hours = parseInt(hrsStr);
    const minutes = parseInt(minsStr) || 0;

    const totalMinutes = hours * 60 + minutes;

    const divisor = parseFloat(getLastIndexOfNWhrs);
    const eachMinutes = totalMinutes / divisor;

    const resultHours = Math.floor(eachMinutes / 60);
    const resultMinutes = Math.round(eachMinutes % 60);

    return `${String(resultHours).padStart(2, "0")}.${String(
      resultMinutes
    ).padStart(2, "0")}`;
  };

  //   const convertNumToHours = (totalWorkHrs, getLastIndexOfNWhrs) => {
  //     const hoursFloat =
  //       parseFloat(totalWorkHrs) / parseFloat(getLastIndexOfNWhrs); // 3.75
  //     const hours = Math.floor(hoursFloat); // 3 hours
  //     const minutes = Math.round((hoursFloat - hours) * 60); // 0.75 * 60 = 45 minutes

  //     return `${String(hours).padStart(2, "0")}.${String(minutes).padStart(
  //       2,
  //       "0"
  //     )}`;
  //   };
  return {
    calculateTotalWorkingHours,
    calculateTotalAbsence,
    convertNumToHours,
    // convertNumToHours,
  };
};
