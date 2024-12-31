import React from 'react'

export const DateFormat = (dateToString) => {
    if (!dateToString || isNaN(new Date(dateToString).getTime())) {
      return "";
    }

    const date = new Date(dateToString);

    const day = date.getDate().toString().padStart(2, "0"); // Local day
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Local month
    const year = date.getFullYear(); // Local year

    return `${day}-${month}-${year}`; // Format as DD/MM/YYYY
  };
