export const HoursMinuAbsentCal = () => {
  function calculateNormalDays(employee) {
    try {
      const workingHrsObj = employee?.workingHrs;

      const getLastIndexOfNWhrs =
        employee?.workHrs && employee?.workHrs?.length > 0
          ? employee?.workHrs[employee?.workHrs?.length - 1]
          : "";

      const lastIndexOfNWHPD = parseFloat(getLastIndexOfNWhrs);

      const getLastIndexOfNWHPM =
        employee?.workMonth && employee?.workMonth?.length > 0
          ? employee?.workMonth[employee?.workMonth?.length - 1]
          : "";
      const lastIndexOfNWHPM = parseFloat(getLastIndexOfNWHPM);

      let totalHours = 0;
      let totalStaffLevelEmpWorkHrs = 0;
      let totalNoramlWorkingHrs = 0;

      for (const date in workingHrsObj) {
        const value = workingHrsObj[date];
        let formattedDate = convertToYYYYMMDD(date);

        const currentDay = new Date(formattedDate);
        const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
          weekday: "long",
        }).format(currentDay);

        let findStaffLevelEmp =
          dayOfWeek === "Saturday" &&
          lastIndexOfNWHPD === 8 &&
          lastIndexOfNWHPM === 24;

        const xPattern = /^x\((\d+(\.\d+)?)\)(\d+(\.\d+)?)$/;
        const xMatch = value?.match(xPattern);
        if (xMatch && findStaffLevelEmp) {
          const hours = parseFloat(xMatch[3]);
          totalStaffLevelEmpWorkHrs += hours;
          // continue;
        } else if (xMatch) {
          const hours = parseFloat(xMatch[3]);
          totalNoramlWorkingHrs += hours;
          // continue;
        }

        const numberPattern = /^\d+(\.\d+)?$/;
        if (value?.match(numberPattern) && findStaffLevelEmp) {
          totalStaffLevelEmpWorkHrs += parseFloat(value);
          // continue;
        } else if (value?.match(numberPattern)) {
          totalNoramlWorkingHrs += parseFloat(value);
          // continue;
        }

        const halPattern = /^H[A-Z]*\d+$/;
        if (value?.match(halPattern) && findStaffLevelEmp) {
          const hours = parseFloat(value.replace(/[^0-9]/g, ""));
          totalStaffLevelEmpWorkHrs += 0;

          // continue;
        } else if (value?.match(halPattern)) {
          const hours = parseFloat(value.replace(/[^0-9]/g, ""));
          totalNoramlWorkingHrs += hours;
          // continue;
        }
      }

      let staffLevelempNWHPD = lastIndexOfNWHPD / 2;
      let getAvgOfStaffLevelWorkHrs =
        totalStaffLevelEmpWorkHrs / staffLevelempNWHPD;
      let getAvgOfNormalTotalHrs = totalNoramlWorkingHrs / lastIndexOfNWHPD;

      console.log("getAvgOfStaffLevelWorkHrs : ", getAvgOfStaffLevelWorkHrs);
      console.log("getAvgOfNormalTotalHrs : ", getAvgOfNormalTotalHrs);
      let totalAvgOfND = getAvgOfStaffLevelWorkHrs + getAvgOfNormalTotalHrs;
      Math.floor(totalAvgOfND);
      return totalAvgOfND.toFixed(2); // HH.100 format
    } catch (err) {
      console.error("Error calculating total working hours:", err);
      return "0.00";
    }
  }

  function calculateTotalWorkingHours(employee) {
    let totalHours = 0;

    try {
      const workingHrsObj = employee?.workingHrs;

      const getLastIndexOfNWhrs =
        employee?.workHrs && employee?.workHrs?.length > 0
          ? employee?.workHrs[employee?.workHrs?.length - 1]
          : "";

      const lastIndexOfNWHPD = parseFloat(getLastIndexOfNWhrs);

      const getLastIndexOfNWHPM =
        employee?.workMonth && employee?.workMonth?.length > 0
          ? employee?.workMonth[employee?.workMonth?.length - 1]
          : "";
      const lastIndexOfNWHPM = parseFloat(getLastIndexOfNWHPM);

      for (const date in workingHrsObj) {
        const value = workingHrsObj[date];

        let formattedDate = convertToYYYYMMDD(date);

        const currentDay = new Date(formattedDate);
        const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
          weekday: "long",
        }).format(currentDay);

        let findStaffLevelEmp =
          dayOfWeek === "Saturday" &&
          lastIndexOfNWHPD === 8 &&
          lastIndexOfNWHPM === 24;

        const xPattern = /^x\((\d+(\.\d+)?)\)(\d+(\.\d+)?)$/;
        const xMatch = value?.match(xPattern);
        if (xMatch) {
          const hours = parseFloat(xMatch[3]);
          totalHours += hours;
          continue;
        }

        const numberPattern = /^\d+(\.\d+)?$/;
        if (value?.match(numberPattern)) {
          totalHours += parseFloat(value);
          continue;
        }

        const halPattern = /^H[A-Z]*\d+$/;
        if (value?.match(halPattern) && findStaffLevelEmp) {
          const hours = parseFloat(value.replace(/[^0-9]/g, ""));
          totalHours += 0;
          continue;
        } else if (value?.match(halPattern)) {
          const hours = parseFloat(value.replace(/[^0-9]/g, ""));
          totalHours += hours;
        }
      }

      return totalHours.toFixed(2); // HH.100 format
    } catch (err) {
      console.error("Error calculating total working hours:", err);
      return "0.00";
    }
  }

  // function calculateTotalWorkingHours(data) {
  //   let totalHours = 0;

  //   try {
  //     for (const key in data) {
  //       const value = data[key];

  //       const xPattern = /^x\((\d+(\.\d+)?)\)(\d+(\.\d+)?)$/;
  //       const xMatch = value?.match(xPattern);
  //       if (xMatch) {
  //         const hours = parseFloat(xMatch[3]);
  //         totalHours += hours;
  //         continue;
  //       }

  //       const numberPattern = /^\d+(\.\d+)?$/;
  //       if (value?.match(numberPattern)) {
  //         totalHours += parseFloat(value);
  //         continue;
  //       }

  //       const halPattern = /^H[A-Z]*\d+$/;
  //       if (value?.match(halPattern)) {
  //         const hours = parseFloat(value.replace(/[^0-9]/g, ""));
  //         totalHours += hours;
  //         continue;
  //       }
  //     }

  //     return totalHours.toFixed(2); // HH.100 format
  //   } catch (err) {
  //     console.error("Error calculating total working hours:", err);
  //     return "0.00";
  //   }
  // }
  function convertToYYYYMMDD(dateStr) {
    const [day, month, year] = dateStr?.split(/[-\/]/);

    // Pad day and month to 2 digits if needed
    const paddedDay = day.padStart(2, "0");
    const paddedMonth = month.padStart(2, "0");

    return `${year}-${paddedMonth}-${paddedDay}`;
  }

  // function calculateTotalAbsence(employee, getLastIndexOfNWhrs) {
  //   console.log("employee : ", employee);
  //   const workingHrsObj = employee?.workingHrs;
  //   const lastIndex = parseFloat(getLastIndexOfNWhrs);
  //   const getLastIndexOfNWHPM =
  //     employee?.workMonth && employee?.workMonth?.length > 0
  //       ? employee?.workMonth[employee?.workMonth?.length - 1]
  //       : "";

  //   try {
  //     let totalHours = 0;

  //     for (let date in workingHrsObj) {
  //       const value = workingHrsObj[date];

  //       if (value?.startsWith("x(")) {
  //         const match = value.match(/x\(([\d.]+)\)/);
  //         if (match) {
  //           totalHours += parseFloat(match[1]); // Directly add hours in decimal format
  //         }
  //       } else if (value === "A") {
  //         // totalHours += lastIndex; // Absence counts as full day hours

  //         let formattedDate = convertToYYYYMMDD(date);

  //         const currentDay = new Date(formattedDate);
  //         const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
  //           weekday: "long",
  //         }).format(currentDay);
  //         if (
  //           dayOfWeek === "Saturday" &&
  //           getLastIndexOfNWhrs == 8 &&
  //           getLastIndexOfNWHPM == 24
  //         ) {
  //           totalHours += lastIndex / 2;
  //         } else {
  //           totalHours += lastIndex;
  //         }
  //       }
  //     }

  //     return totalHours.toFixed(2); // Return in HH.100 format
  //   } catch (err) {
  //     console.error("Error in calculateTotalAbsence:", err);
  //     return "0.00";
  //   }
  // }

  // const convertNumToHours = (totalWorkHrs, getLastIndexOfNWhrs) => {
  //   const [hrsStr, minsStr] = String(totalWorkHrs)?.split(".");
  //   const hours = parseInt(hrsStr);
  //   const minutes = parseInt(minsStr) || 0;

  //   const totalMinutes = hours * 60 + minutes;

  //   const divisor = parseFloat(getLastIndexOfNWhrs);
  //   const eachMinutes = totalMinutes / divisor;

  //   const resultHours = Math.floor(eachMinutes / 60);
  //   const resultMinutes = Math.round(eachMinutes % 60);

  //   return `${String(resultHours).padStart(2, "0")}.${String(
  //     resultMinutes
  //   ).padStart(2, "0")}`;
  // };

  function calculateTotalAbsence(employee, getLastIndexOfNWhrs) {
    console.log("employee : ", employee);
    const workingHrsObj = employee?.workingHrs;
    const lastIndex = parseFloat(getLastIndexOfNWhrs);
    const getLastIndexOfNWHPM =
      employee?.workMonth && employee?.workMonth?.length > 0
        ? employee?.workMonth[employee?.workMonth?.length - 1]
        : "";

    console.log("workingHrsObj : ", workingHrsObj);
    try {
      let totalHours = 0;
      let totalStaffLevelEmpAbsence = 0;
      let totalNormalAbsence = 0;

      for (let date in workingHrsObj) {
        const value = workingHrsObj[date];
        let formattedDate = convertToYYYYMMDD(date);

        const currentDay = new Date(formattedDate);
        const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
          weekday: "long",
        }).format(currentDay);

        let findStaffLevelEmp =
          dayOfWeek === "Saturday" &&
          getLastIndexOfNWhrs == 8 &&
          getLastIndexOfNWHPM == 24;

        if (value?.startsWith("x(")) {
          const match = value.match(/x\(([\d.]+)\)/);
          if (match && findStaffLevelEmp) {
            totalStaffLevelEmpAbsence += parseFloat(match[1]);
          } else if (match) {
            totalNormalAbsence += parseFloat(match[1]); // Directly add hours in decimal format
          }
        } else if (value === "A") {
          // totalHours += lastIndex; // Absence counts as full day hours

          if (findStaffLevelEmp) {
            totalStaffLevelEmpAbsence += lastIndex / 2;
          } else {
            totalNormalAbsence += lastIndex;
          }
        }
      }
      let staffLevelempNWHPD = lastIndex / 2;
      let getAvgOfStaffLevel = totalStaffLevelEmpAbsence / staffLevelempNWHPD;
      let getAvgOfNormalAbsence = totalNormalAbsence / lastIndex;
      let totalAvgOfAbsence = getAvgOfStaffLevel + getAvgOfNormalAbsence;

      return totalAvgOfAbsence.toFixed(2); // Return in HH.100 format
    } catch (err) {
      console.error("Error in calculateTotalAbsence:", err);
      return "0.00";
    }
  }

  function convertNumToHours(totalWorkHrs, getLastIndexOfNWhrs) {
    const total = parseFloat(totalWorkHrs);
    const divisor = parseFloat(getLastIndexOfNWhrs);

    if (isNaN(total) || isNaN(divisor) || divisor === 0) return "0.00";

    const result = total / divisor;
    return result.toFixed(2); // Return HH.100 format
  }

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
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // Auto Calculate x(HH.100)HH.100 locally in the ViewSummary
  function normalizeHH100(value) {
    let hours = Math.floor(value);
    let hundredMinutes = Math.round((value - hours) * 100);

    if (hundredMinutes >= 100) {
      hours += Math.floor(hundredMinutes / 100);
      hundredMinutes = hundredMinutes % 100;
    }

    return parseFloat(`${hours}.${hundredMinutes.toString().padStart(2, "0")}`);
  }

  function formatToHHColonMM(input) {
    const str = input?.toString();

    // Case 1: "4" → "4:00"
    if (/^\d+$/.test(str)) {
      return `${str}:00`;
    }

    // Case 2: "5.3" or "5.30" → "5:30" or "5:03" logic based on minute length
    if (/^\d+\.\d+$/.test(str)) {
      const [hours, minutes] = str?.split(".");
      const min = minutes.length === 1 ? `${minutes}0` : minutes;
      return `${parseInt(hours)}:${min}`;
    }

    // Case 3: "3:2" or "6:40"
    if (/^\d{1,2}:\d{1,2}$/.test(str)) {
      const [hours, minutes] = str?.split(":");
      const min = minutes.length === 1 ? `${minutes}0` : minutes;
      return `${parseInt(hours)}:${min}`;
    }

    // Invalid format
    return null;
  }

  function convertHHMMtoHH100(hhmmStr) {
    const [hoursStr, minutesStr] = hhmmStr?.split(":");
    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    const hh100 = parseFloat(`${hours}.${minutes.toString().padStart(2, "0")}`);
    return normalizeHH100(hh100);
  }

  async function workHrsAbsentCal(receivedData) {
    const { NWHPD, NWHPM, workingHrsKey, workingHrs } = receivedData;
    let formattedDate = convertToYYYYMMDD(workingHrsKey);
    const currentDay = new Date(formattedDate);
    const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
      weekday: "long",
    }).format(currentDay);

    let formattedNWHPD = NWHPD;
    if (dayOfWeek === "Saturday" && NWHPD == 8 && NWHPM == 24) {
      formattedNWHPD = NWHPD / 2; // make 4
    }

    const formattedWorkHrs = formatToHHColonMM(workingHrs);
    if (formattedWorkHrs === null) return workingHrs;

    const normalizedWorkHrs = convertHHMMtoHH100(formattedWorkHrs);
    const normalizedNormalHrs = normalizeHH100(formattedNWHPD);

    if (normalizedWorkHrs > normalizedNormalHrs) {
      // Working hours cannot exceed normal daily hours (4) for a staff-level employee.
      if (dayOfWeek === "Saturday" && NWHPD == 8 && NWHPM == 24) {
        alert(
          `On Saturdays, working hours cannot exceed the normal daily limit (${formattedNWHPD} hours) for staff-level employees.`
        );

        return "0.00";
      } else {
        alert(
          `Working hours cannot be greater than normal daily hours (${formattedNWHPD}).`
        );
        return "0.00";
      }
    }

    const diff = normalizedNormalHrs - normalizedWorkHrs;
    const absent = normalizeHH100(diff);
    const absence = parseFloat(absent).toFixed(2);
    const presentHrs = parseFloat(normalizedWorkHrs).toFixed(2);
    const workingHrsAbsence =
      absence === "0.00" ? presentHrs : `x(${absence})${presentHrs}`;
    return workingHrsAbsence;
  }
  return {
    calculateTotalWorkingHours,
    calculateNormalDays,
    calculateTotalAbsence,
    convertNumToHours,
    workHrsAbsentCal,
    // convertNumToHours,
  };
};
