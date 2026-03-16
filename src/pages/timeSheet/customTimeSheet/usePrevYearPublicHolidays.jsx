import { useEffect, useState } from "react";

export const usePreYearPublicHolidays = () => {
  const [prevYearHolidays, setPrevYearHolidays] = useState([]);

  useEffect(() => {
    fetch(
      "https://commonfiles.s3.ap-southeast-1.amazonaws.com/Leave+Details/PreviousYearCompanyHolidays.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPrevYearHolidays(data);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }, []);

  return { prevYearHolidays };
};
