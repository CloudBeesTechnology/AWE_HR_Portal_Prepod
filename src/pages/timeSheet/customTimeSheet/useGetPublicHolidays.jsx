import { useCallback, useState } from "react";
export const useGetPublicHolidays = () => {
  const [companyHolidayList, setCompanyHolidayList] = useState([]);

  const isValidYear = (year) =>
    Number.isInteger(year) && year >= 1000 && year <= 9999;

  const handlePublicHoliday = useCallback(async ({ startDate, endDate }) => {
    const nowYear = new Date().getFullYear();
    
    const startYear = startDate ? new Date(startDate).getFullYear() : nowYear;

    const endYear = endDate ? new Date(endDate).getFullYear() : nowYear;

    // remove duplicate years
    const years = [...new Set([startYear, endYear])];

    // ✅ validate year length (4 digits)
    if (!isValidYear(startYear) || !isValidYear(endYear)) {
      return;
    }
    try {
      const responses = await Promise.all(
        years.map((year) =>
          fetch(
            `https://commonfiles.s3.ap-southeast-1.amazonaws.com/Leave+Details/CompanyHolidays_${year}.json`
          ).then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch holidays for ${year}`);
            }
            return res.json();
          })
        )
      );

      const mergedHolidays = responses.flatMap(
        (data) => data?.CompanyHolidays || []
      );
   
      setCompanyHolidayList(mergedHolidays);
    } catch (error) {
      console.error("Error fetching public holidays:", error);
    }
  }, []);

  return { companyHolidayList, handlePublicHoliday };
};