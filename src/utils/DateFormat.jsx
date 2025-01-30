export const DateFormat = (dateToString) => {

  if (!dateToString || isNaN(new Date(dateToString).getTime())) {
    return "";
  }

  let dateStr = dateToString.toString();


  let day, month, year;

  // Check if the date string contains "T" (ISO 8601 format)
  if (dateToString?.includes("T")) {
    // If the date is in ISO format (e.g., "2025-01-12T12:16:28.816Z")
    const dateParts = dateToString?.split("T")[0]; // Get the date part before 'T'
    [year, month, day] = dateParts?.split("-"); // Split the date part into year, month, day
  } else if (dateToString?.includes("/")) {
    // If the format is DD/MM/YYYY (e.g., "03/03/2025")
    [day, month, year] = dateToString?.split("/");
  } else if (dateToString?.includes("-")) {
    // If the format is YYYY-MM-DD (e.g., "2025-01-12")
    [year, month, day] = dateToString?.split("-");
  } else {
    return ""; // Invalid format
  }

  // Ensure day and month are two digits
  const formattedDay = day?.padStart(2, "0");
  const formattedMonth = month?.padStart(2, "0");

  return `${formattedDay}-${formattedMonth}-${year}`; // Format as DD-MM-YYYY
};

// export const DateFormat = (dateToString) => {
//   if (!dateToString || isNaN(new Date(dateToString).getTime())) {
//     return "";
//   }

//   const date = new Date(dateToString);

//   const day = date.getDate().toString().padStart(2, "0"); // Local day
//   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Local month
//   const year = date.getFullYear(); // Local year

//   return `${day}-${month}-${year}`; // Format as DD/MM/YYYY
// };

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


