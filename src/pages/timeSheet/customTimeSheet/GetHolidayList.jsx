import { useEffect, useState } from "react";

export const GetHolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the provided URL
    fetch(
      "https://commonfiles.s3.ap-southeast-1.amazonaws.com/Leave+Details/CompanyHolidays2025.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setHolidays(data);
      
        setLoading(false);
      })
      .catch((error) => { 
        setError(error);
        setLoading(false);
      });
  }, []);

  return holidays;
};
