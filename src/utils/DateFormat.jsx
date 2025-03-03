export const DateFormat = (dateToString) => {

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

  // const utcDate = new Date(Date.UTC(year, month - 1, day));
  // utcDate.setUTCDate(utcDate.getUTCDate() + 1);
  // const localDate = new Date(utcDate.toLocaleString());

  // const formattedDay = String(localDate.getDate()).padStart(2, "0");
  // const formattedMonth = String(localDate.getMonth() + 1).padStart(2, "0");
  // const formattedYear = localDate.getFullYear();

  // return `${formattedDay}/${formattedMonth}/${formattedYear}`;

  const localDate = new Date(year, month - 1, day);

  const formattedDay = String(localDate.getDate()).padStart(2, "0");
  const formattedMonth = String(localDate.getMonth() + 1).padStart(2, "0");
  const formattedYear = localDate.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

export const capitalizedLetter = (value) => {
  if (!value || typeof value !== 'string') {
    return "";
  }
  const changedValue = value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return changedValue;
};


