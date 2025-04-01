export const DateFormat = (dateToString) => {
  if (!dateToString || isNaN(new Date(dateToString).getTime())) {
    return "";
  }

  let dateStr = dateToString.toString();

  let day, month, year;

  
  if (dateStr?.includes("T")) {
    const localDate = new Date(dateStr);
    year = localDate.getFullYear();
    month = (localDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    day = localDate.getDate().toString().padStart(2, "0");
  } else if (dateStr?.includes("/")) {
    [day, month, year] = dateStr?.split("/");
  } else if (dateStr?.includes("-")) {
    [year, month, day] = dateStr?.split("-");
  } else {
    return ""; 
  }

  const formattedDay = day?.padStart(2, "0");
  const formattedMonth = month?.padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
};

export const FTDateFormat = (dateToString) => {
  if (!dateToString || isNaN(new Date(dateToString).getTime())) {
    return "";
  }

  let dateStr = dateToString.toString();
  let day, month, year;

  if (dateStr?.includes("T")) {
    const dateParts = dateStr?.split("T")[0];
    [year, month, day] = dateParts?.split("-");
  } else if (dateStr?.includes("/")) {
    [day, month, year] = dateStr?.split("/");
  } else if (dateStr?.includes("-")) {
    [year, month, day] = dateStr?.split("-");
  } else {
    return "";
  }

  const utcDate = new Date(Date.UTC(year, month - 1, day));
  utcDate.setUTCDate(utcDate.getUTCDate() + 1);
  const localDate = new Date(utcDate.toLocaleString());

  const formattedDay = String(localDate.getDate()).padStart(2, "0");
  const formattedMonth = String(localDate.getMonth() + 1).padStart(2, "0");
  const formattedYear = localDate.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;

  // const localDate = new Date(year, month - 1, day);

  // const formattedDay = String(localDate.getDate()).padStart(2, "0");
  // const formattedMonth = String(localDate.getMonth() + 1).padStart(2, "0");
  // const formattedYear = localDate.getFullYear();

  // return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

// export const DateNewFormat = (dateToString) => {
//   if (!dateToString) {
//     return "Invalid Date";
//   }

//   // Convert UTC to Local Time
//   const dateObj = new Date(dateToString);
//   if (isNaN(dateObj.getTime())) {
//     return "Invalid Date";
//   }

//   // Convert to Local Time by adding the timezone offset
//   const localDate = new Date(dateObj.getTime() + 5.5 * 60 * 60 * 1000); // Adjust to IST (UTC+5:30)

//   // Extract Date Parts
//   const day = localDate.getDate().toString().padStart(2, "0");
//   const month = (localDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
//   const year = localDate.getFullYear();

//   return `${day}/${month}/${year}`;
// };

export const capitalizedLetter = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }
  const changedValue = value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return changedValue;
};
